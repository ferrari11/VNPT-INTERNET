import express, { Request, Response } from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import { google } from "googleapis";
import dotenv from "dotenv";

dotenv.config();

// Define lead interface
interface Lead {
  id: string;
  name: string;
  phone: string;
  address: string;
  packageInterest: string;
  createdAt: string;
  status: "new" | "contacted" | "completed";
}

// In-memory array to store customer leads locally so that registrations are fully operational
const leadsDb: Lead[] = [
  {
    id: "lead-1",
    name: "Nguyễn Văn Hùng",
    phone: "0912345678",
    address: "Chung cư Vinhomes Central Park, Bình Thạnh, HCM",
    packageInterest: "HOME MESH 2+ (250Mbps + Mesh)",
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    status: "new"
  },
  {
    id: "lead-2",
    name: "Trần Thị Ánh Tuyết",
    phone: "0888999888",
    address: "125 Lê Văn Sỹ, Quận 3, Hồ Chí Minh",
    packageInterest: "COMBO HOME SÀNH (Có di động Vina)",
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
    status: "completed"
  }
];

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini SDK with telemetry header if key is available
let ai: GoogleGenAI | null = null;
const apiKey = process.env.GEMINI_API_KEY;

if (apiKey) {
  try {
    ai = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
    console.log("Successfully initialized Gemini GenAI Client");
  } catch (err) {
    console.error("Failed to initialize Gemini Client:", err);
  }
} else {
  console.warn("WARNING: GEMINI_API_KEY is not defined in the environment. AI Assistant services will fallback to mock responses.");
}

// Helper to append Lead registration data to Google Sheets
async function appendLeadToGoogleSheet(lead: {
  id: string;
  name: string;
  phone: string;
  address: string;
  packageInterest: string;
  createdAt: string;
}) {
  const sheetId = process.env.GOOGLE_SHEET_ID || "1joXjJK8c7-F6T2RymNq2nSwM4XobSfh3w8CQHQNjLKI";
  const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  // Replace escaped newlines in private key if configured in secrets
  const privateKey = process.env.GOOGLE_SERVICE_ACCOUNT_KEY?.replace(/\\n/g, "\n");
  const appsScriptUrl = process.env.GOOGLE_APPS_SCRIPT_URL;

  // Method 1: Google Apps Script Web App (Recommended - Simple, Zero OAuth issues)
  if (appsScriptUrl) {
    try {
      console.log(`Forwarding lead to Apps Script: ${appsScriptUrl}`);
      const payload = {
        id: lead.id,
        name: lead.name,
        phone: lead.phone,
        address: lead.address,
        packageInterest: lead.packageInterest,
        createdAt: new Date(lead.createdAt).toLocaleString("vi-VN"),
        sheetId: sheetId
      };

      const response = await fetch(appsScriptUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        console.log("Successfully added lead to Google Sheet via Apps Script Web App!");
        return { success: true, method: "apps_script" };
      } else {
        const textErr = await response.text();
        console.error("Apps Script returned error code: ", response.status, textErr);
        throw new Error(`Apps Script responded with ${response.status}: ${textErr}`);
      }
    } catch (err: any) {
      console.error("Failed to forward via Apps Script:", err.message);
      // Fallback to Service Account if configured, otherwise rethrow
      if (!clientEmail || !privateKey) {
        throw err;
      }
    }
  }

  // Method 2: Google Sheets API v4 using Service Account Jwt auth
  if (clientEmail && privateKey) {
    try {
      console.log(`Appending to Google Sheet directly using Sheets API. Sheet ID: ${sheetId}`);
      const auth = new google.auth.JWT({
        email: clientEmail,
        key: privateKey,
        scopes: ["https://www.googleapis.com/auth/spreadsheets"]
      });

      const sheets = google.sheets({ version: "v4", auth });
      
      const response = await sheets.spreadsheets.values.append({
        spreadsheetId: sheetId,
        range: "A:F",
        valueInputOption: "USER_ENTERED",
        requestBody: {
          values: [
            [
              new Date(lead.createdAt).toLocaleString("vi-VN"),
              lead.name,
              lead.phone,
              lead.address,
              lead.packageInterest,
              "Chờ lắp đặt"
            ]
          ]
        }
      });
      console.log(`Google Sheets API append result status: ${response.status}`);
      return { success: true, method: "sheets_api" };
    } catch (err: any) {
      console.error("Google Sheets API append call failed:", err);
      throw err;
    }
  }

  console.warn("Google Sheets Sync: No synchronization credentials or webhooks configured. Saved locally only.");
  return { success: false, reason: "NOT_CONFIGURED" };
}

// -------------------------------------------------------------
// API ENDPOINTS
// -------------------------------------------------------------

// API 1: Register Lead
app.post("/api/register", async (req: Request, res: Response) => {
  const { name, phone, address, packageInterest } = req.body;

  if (!name || !phone) {
    res.status(400).json({ error: "Vui lòng nhập đầy đủ tên và số điện thoại." });
    return;
  }

  const newLead: Lead = {
    id: `lead-${Date.now()}`,
    name,
    phone,
    address: address || "Tư vấn qua điện thoại",
    packageInterest: packageInterest || "Chưa chọn gói",
    createdAt: new Date().toISOString(),
    status: "new"
  };

  leadsDb.unshift(newLead);

  // Attempt Google Sheets Sync
  let syncStatus = { success: false, method: "none", reason: "NOT_CONFIGURED" };
  try {
    const result = await appendLeadToGoogleSheet(newLead);
    syncStatus = { ...syncStatus, ...result };
  } catch (err: any) {
    syncStatus = { success: false, method: "error", reason: err.message || "Failed during sheet update" };
  }

  res.status(201).json({
    success: true,
    message: "Đăng ký thông tin thành công! Nhân viên VNPT sẽ liên hệ trong ít phút nữa.",
    lead: newLead,
    sync: syncStatus
  });
});

// Helper to verify request admin headers
function verifyAdminAuth(req: Request): boolean {
  const configuredPassword = process.env.ADMIN_PASSWORD || "vnpt@hcm2026";
  const authHeader = req.headers["authorization"] || req.headers["x-admin-password"];
  if (!authHeader) return false;

  const password = typeof authHeader === "string" && authHeader.startsWith("Bearer ")
    ? authHeader.substring(7)
    : String(authHeader);

  return password === configuredPassword;
}

// POST endpoint to verify admin password from user client
app.post("/api/verify-admin", (req: Request, res: Response) => {
  const { password } = req.body;
  const configuredPassword = process.env.ADMIN_PASSWORD || "vnpt@hcm2026";

  if (password === configuredPassword) {
    res.json({ success: true });
  } else {
    res.status(401).json({ error: "Mật khẩu Admin không chính xác. Vui lòng thử lại!" });
  }
});

// GET status of Google Sheet Integration for the Admin panel
app.get("/api/sheets-status", (req: Request, res: Response) => {
  if (!verifyAdminAuth(req)) {
    res.status(401).json({ error: "Chưa được uỷ quyền truy cập dữ liệu quản trị." });
    return;
  }
  const sheetId = process.env.GOOGLE_SHEET_ID || "1joXjJK8c7-F6T2RymNq2nSwM4XobSfh3w8CQHQNjLKI";
  const hasServiceAccount = !!(process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL && process.env.GOOGLE_SERVICE_ACCOUNT_KEY);
  const hasAppsScript = !!process.env.GOOGLE_APPS_SCRIPT_URL;

  res.json({
    configured: hasServiceAccount || hasAppsScript,
    method: hasServiceAccount ? "service_account" : hasAppsScript ? "apps_script" : "none",
    sheetId,
    sheetUrl: `https://docs.google.com/spreadsheets/d/${sheetId}/edit?usp=sharing`
  });
});

// API 2: Get all leads (for administrator panel on the landing page)
app.get("/api/leads", (req: Request, res: Response) => {
  if (!verifyAdminAuth(req)) {
    res.status(401).json({ error: "Chưa được uỷ quyền truy cập dữ liệu quản trị." });
    return;
  }
  res.json(leadsDb);
});

// API 3: Update lead status
app.patch("/api/leads/:id", (req: Request, res: Response) => {
  if (!verifyAdminAuth(req)) {
    res.status(401).json({ error: "Chưa được uỷ quyền truy cập dữ liệu quản trị." });
    return;
  }
  const { id } = req.params;
  const { status } = req.body;

  const lead = leadsDb.find((l) => l.id === id);
  if (!lead) {
    res.status(404).json({ error: "Không tìm thấy khách hàng này" });
    return;
  }

  if (status) {
    lead.status = status;
  }

  res.json({ success: true, lead });
});

// API 4: Gemini-powered package consultant Chatbot
app.post("/api/consultant", async (req: Request, res: Response) => {
  const { messages } = req.body;

  if (!messages || !Array.isArray(messages)) {
    res.status(400).json({ error: "Yêu cầu danh sách tin nhắn chat hợp lệ." });
    return;
  }

  const packageKnowledge = `
Danh sách các gói cước VNPT Internet & WiFi & di động năm 2026:
1. HOME NET 1 (Cơ bản): Tốc độ 150 Mbps, Giá 165.000đ/tháng (ngoại thành) hoặc 180.000đ/tháng (nội thành HCM). Thích hợp: Sinh viên, cá nhân, gia đình nhỏ ít thiết bị.
2. HOME NET 2 (Phổ biến): Tốc độ 250 Mbps, Giá 190.000đ/tháng (ngoại thành) hoặc 220.000đ/tháng (nội thành HCM). Thích hợp: Hộ gia đình 3-6 người, xem phim 4K, học trực tuyến.
3. HOME MESH 2+ (WiFi phủ rộng): Tốc độ 250 Mbps kèm thêm 1 thiết bị Wifi Mesh phát sóng xuyên tường. Giá 210.000đ/tháng (ngoại thành) hoặc 240.000đ/tháng (nội thành HCM). Thích hợp: Nhà nhiều tầng, chung cư rộng, sóng WiFi phủ toàn bộ góc chết.
4. HOME NET 5 (Siêu tốc): Tốc độ 300 Mbps kèm theo 1 thiết bị Wifi Mesh. Giá 249.000đ/tháng (ngoại thành) hoặc 299.000đ/tháng (nội thành HCM). Thích hợp: Game thủ, Streamer, văn phòng nhỏ, nhà có 10+ thiết bị kết nối.
5. COMBO HOME SÀNH: Internet VNPT 250 Mbps + Di động Vinaphone (80GB Data tốc độ cao/tháng, 1500 phút gọi nội mạng Vina, 50 phút ngoại mạng miễn phí). Giá cực rẻ: 239.000đ/tháng (siêu tiết kiệm, dùng sành điệu). Thích hợp: Cá nhân, gia đình dùng SIM Vinaphone muốn ghép chung hóa đơn để tiết kiệm 50% chi phí.
6. COMBO HOME CHẤT: Internet VNPT 150 Mbps đến 250 Mbps + Truyền hình MyTV (180+ kênh truyền hình HD xem trực tiếp, thể thao, tin tức) + SIM Vinaphone (miễn phí Data/Thoại giống Home Sành). Giá chỉ từ 249.000đ/tháng. Thích hợp: Hộ gia đình có Tivi thông minh, có cả người lớn tuổi xem truyền hình truyền thống và người trẻ lướt internet.

QUY TẮC PHẢN HỒI:
- Bạn là "Trợ lý VNPT Smart Advisor", một tư vấn viên viễn thông kỳ cựu hết sức thân thiện, vui vẻ, tận tình, viết tiếng Việt tự nhiên và cuốn hút.
- Hãy lắng nghe nhu cầu của khách hàng (như số lượng người dùng, mục đích: chơi game, lướt web, chung cư hay nhà phố, có dùng SIM Vinaphone không, có muốn xem TV truyền hình không).
- Đưa ra tư vấn cực kỳ cụ thể, so sánh và chỉ ra gói cước lý tưởng nhất cho họ.
- Luôn trình bày chuyên nghiệp bằng cách sử dụng bullet point, in đậm tên gói cước, tốc độ và giá tiền để họ dễ so sánh.
- Cuối câu trả lời, hãy khích lệ họ bấm vào biểu tượng hoặc nút "Đăng Ký Tư Vấn Nhanh" trên màn hình hoặc điền form để nhân viên tổng đài liên hệ tặng thêm tháng cước (Tặng 1 tháng khi đóng trước 6 tháng, tặng 2 tháng khi đóng trước 12 tháng).
`;

  if (!ai) {
    // Return high quality mock response in Vietnamese if API key is not provided
    const lastUserMessage = messages[messages.length - 1]?.content || "";
    let mockReply = "";

    const cleanInput = lastUserMessage.toLowerCase();
    if (cleanInput.includes("gia đình") || cleanInput.includes("nhà")) {
      mockReply = "Chào anh/chị! Với nhu cầu sử dụng cho hộ gia đình, VNPT khuyên dùng gói **HOME NET 2 (250 Mbps)** giá chỉ **220.000đ/tháng** hoạt động cực kỳ mượt mà cho 3-6 người cùng lúc xem Youtube 4K, lướt TikTok. \n\nNếu nhà mình rộng hoặc nhiều lầu, anh/chị nên chọn gói **HOME MESH 2+ (250 Mbps kèm 1 Mesh tăng sóng)** chỉ **240.000đ/tháng** để WiFi phủ rộng khắp ngõ ngách.\n\nĐặc biệt đóng trước 6 tháng được tặng thêm 1 tháng, đóng trước 12 tháng tặng thêm 2 tháng và miễn phí lắp đặt 100%. Để được tư vấn chi tiết hơn, anh/chị hãy điền mẫu đăng ký hoặc ấn nút 'Đăng Ký Ngay' nhé!";
    } else if (cleanInput.includes("game") || cleanInput.includes("stream") || cleanInput.includes("tốc độ cao")) {
      mockReply = "Chào bạn! Là một chiến thần leo rank hoặc streamer chuyên nghiệp, bạn không thể bỏ qua gói **HOME NET 5 (300 Mbps kèm 1 WiFi Mesh)** với giá chỉ **299.000đ/tháng**.\n\nTốc độ siêu khủng, ping cực thấp chuẩn tối ưu băng thông cho các máy chủ game Liên Quân, CS:GO, FIFA. Trình truyền tải dữ liệu siêu tốc mượt mà.\n\nBạn hãy nhấn nút 'Đăng Ký Ngay' hoặc điền số điện thoại ở form tư vấn để nhận ưu đãi miễn phí modem WiFi 2 băng tần thế hệ mới nhé!";
    } else if (cleanInput.includes("sinh viên") || cleanInput.includes("giá rẻ") || cleanInput.includes("một mình")) {
      mockReply = "Chào bạn! Dành riêng cho sinh viên hoặc cá nhân, VNPT có gói cước siêu hời: **HOME NET 1 (150 Mbps)** chỉ mạng giá cực rẻ **180.000đ/tháng** tại nội thành HCM (ngoại thành chỉ **165.000đ/tháng**).\n\nTốc độ 150 Mbps hoàn toàn thoải mái cho bạn vừa xem phim học bài, mở Zoom, chạy deadline mượt mà. Đóng 6 tháng tặng 1 tháng giúp tiết kiệm tối đa chi phí thuê phòng trọ.\n\nHãy đăng ký ngay hôm nay để nhận thiết bị miễn phí nhé!";
    } else if (cleanInput.includes("vinaphone") || cleanInput.includes("sim") || cleanInput.includes("di động") || cleanInput.includes("combo")) {
      mockReply = "Chào bạn! Đây là gói cước độc quyền siêu tiết kiệm của VNPT: **COMBO HOME SÀNH (250 Mbps + Sim 4G/5G)** chỉ **239.000đ/tháng**.\n\nƯu đãi trọn gói:\n- Internet WiFi cáp quang siêu tốc **250 Mbps**\n- Sim 4G/5G của VinaPhone tặng **80GB Data/tháng**\n- Miễn phí **1500 phút gọi nội mạng Vina** + **50 phút gọi ngoại mạng**.\n\nChia ra chỉ bằng tiền mạng thông thường nhưng bạn được xài điện thoại di động hoàn toàn miễn phí! Đăng ký ngay để nhận tư vấn trọn gói nhé!";
    } else {
      mockReply = "Chào anh/chị! Trợ lý VNPT Smart Advisor có thể hỗ trợ anh/chị lựa chọn gói cước tối ưu nhất.\n\nĐể VNPT gợi ý chính xác, anh/chị có thể cho biết:\n1. Số lượng người sử dụng thực tế?\n2. Anh/chị dùng chủ yếu để học tập, chơi game, xem Tivi hay làm việc văn phòng?\n3. Anh/chị có đang sử dụng sim di động VinaPhone và muốn kết hợp tiết kiệm hóa đơn không?\n\nAnh/chị cũng có thể kéo xuống form đăng ký để nhận liên hệ trực tiếp từ chuyên viên lắp đặt VNPT trong vòng 15 phút!";
    }

    res.json({ content: mockReply });
    return;
  }

  try {
    // Build context history
    const contentsPayload = messages.map((m: any) => ({
      role: m.role === "assistant" ? "model" as const : "user" as const,
      parts: [{ text: m.content }]
    }));

    // Generate output with high quality flash model
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: contentsPayload,
      config: {
        systemInstruction: packageKnowledge,
        temperature: 0.7,
      }
    });

    const replyText = response.text || "Xin lỗi, tổng đài hỗ trợ đang bận, vui lòng thử lại sau giây lát hoặc điền form để nhân viên gọi lại.";
    res.json({ content: replyText });
  } catch (err: any) {
    console.error("Gemini API Error:", err);
    res.status(500).json({ error: "Lỗi kết nối dịch vụ tư vấn AI. Hãy để lại số điện thoại ở form, chúng tôi sẽ gọi lại ngay." });
  }
});

// -------------------------------------------------------------
// VITE AND STATIC ASSETS SERVING MIDDLEWARE
// -------------------------------------------------------------
async function initViteMiddleware() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    console.log("Vite dev middleware attached successfully.");
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
    console.log("Production static file serving initialized.");
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[VNPT Landing Server] Running on http://0.0.0.0:${PORT}`);
  });
}

initViteMiddleware().catch((err) => {
  console.error("Failed to start full-stack server application:", err);
});
