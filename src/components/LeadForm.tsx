import { useState, useEffect, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  User, Phone, MapPin, Inbox, Send, CheckCircle2, 
  Sparkles, Database, AlertCircle, RefreshCw, Layers, Calendar
} from "lucide-react";
import { PACKAGES } from "../data";

interface LeadFormProps {
  selectedPackage: string;
  onSelectPackage: (pkgName: string) => void;
}

interface Lead {
  id: string;
  name: string;
  phone: string;
  address: string;
  packageInterest: string;
  createdAt: string;
  status: "new" | "contacted" | "completed";
}

export default function LeadForm({ selectedPackage, onSelectPackage }: LeadFormProps) {
  // Client submission form states
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [interest, setInterest] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successInfo, setSuccessInfo] = useState<any>(null);
  const [formError, setFormError] = useState("");

  // Administrators Leads View states
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loadingLeads, setLoadingLeads] = useState(false);
  const [leadsError, setLeadsError] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [isAdminVerified, setIsAdminVerified] = useState(() => !!localStorage.getItem("vnpt_admin_token"));
  const [verifyingPassword, setVerifyingPassword] = useState(false);
  const [verifyError, setVerifyError] = useState("");

  // Google Sheets configuration status
  const [sheetsStatus, setSheetsStatus] = useState<{
    configured: boolean;
    method: "service_account" | "apps_script" | "none";
    sheetId: string;
    sheetUrl: string;
  } | null>(null);

  // Sync selectedPackage from prop to input
  useEffect(() => {
    if (selectedPackage) {
      setInterest(selectedPackage);
    }
  }, [selectedPackage]);

  // Handle subscriber registration
  const handleSubmitBooking = async (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setFormError("Vui lòng điền họ tên quý khách.");
      return;
    }
    const phoneRegex = /^(0[3|5|7|8|9])[0-9]{8}$/;
    if (!phoneRegex.test(phone.trim())) {
      setFormError("Vui lòng nhập đúng định dạng số điện thoại Việt Nam (10 chữ số).");
      return;
    }
    setFormError("");
    setSubmitting(true);

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
          address: address.trim(),
          packageInterest: interest || "Chưa chọn gói cụ thể, cần tư vấn thêm"
        })
      });

      const data = await response.json();
      if (response.ok) {
        setSuccessInfo(data.lead);
        setShowSuccessModal(true);
        // Reset states
        setName("");
        setPhone("");
        setAddress("");
        onSelectPackage("");
        // Reload administrative leads list if panel was active
        if (isAdminVerified) {
          fetchLeads();
        }
      } else {
        setFormError(data.error || "Gặp lỗi hệ thống. Vui lòng liên hệ hotline.");
      }
    } catch (err) {
      setFormError("Không thể kết nối dịch vụ đăng ký. Vui lòng kiểm tra lại dây quang.");
    } finally {
      setSubmitting(false);
    }
  };

  // Verify Admin authentication password
  const handleVerifyPassword = async (e: FormEvent) => {
    e.preventDefault();
    if (!adminPassword.trim()) {
      setVerifyError("Vui lòng nhập mật khẩu quản trị.");
      return;
    }
    setVerifyingPassword(true);
    setVerifyError("");
    try {
      const response = await fetch("/api/verify-admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: adminPassword.trim() })
      });
      const data = await response.json();
      if (response.ok && data.success) {
        localStorage.setItem("vnpt_admin_token", adminPassword.trim());
        setIsAdminVerified(true);
        setVerifyError("");
        setAdminPassword("");
        // Load secure data immediately
        setTimeout(() => {
          fetchLeads();
          fetchSheetsStatus();
        }, 50);
      } else {
        setVerifyError(data.error || "Mật khẩu Admin không chính xác.");
      }
    } catch (err) {
      setVerifyError("Không thể kết nối đến máy chủ xác minh.");
    } finally {
      setVerifyingPassword(false);
    }
  };

  // Fetch Sheets config status
  const fetchSheetsStatus = async () => {
    const adminToken = localStorage.getItem("vnpt_admin_token") || "";
    if (!adminToken) return;
    try {
      const response = await fetch("/api/sheets-status", {
        headers: {
          "Authorization": `Bearer ${adminToken}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setSheetsStatus(data);
      }
    } catch (err) {
      console.error("Failed to fetch Google Sheets status:", err);
    }
  };

  // Fetch registered leads for administrative panel
  const fetchLeads = async () => {
    const adminToken = localStorage.getItem("vnpt_admin_token") || "";
    if (!adminToken) return;
    setLoadingLeads(true);
    setLeadsError("");
    try {
      const response = await fetch("/api/leads", {
        headers: {
          "Authorization": `Bearer ${adminToken}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setLeads(data);
      } else {
        setLeadsError("Không thể nạp dữ liệu leads. Hãy đăng xuất và đăng nhập lại.");
      }
    } catch (err) {
      setLeadsError("Không thể tải danh sách leads khách hàng.");
    } finally {
      setLoadingLeads(false);
    }
  };

  // Toggles the administrator lead management drawer
  useEffect(() => {
    if (showAdminPanel && isAdminVerified) {
      fetchLeads();
      fetchSheetsStatus();
    }
  }, [showAdminPanel, isAdminVerified]);

  // Update lead status
  const updateLeadStatus = async (id: string, newStatus: string) => {
    const adminToken = localStorage.getItem("vnpt_admin_token") || "";
    try {
      const response = await fetch(`/api/leads/${id}`, {
        method: "PATCH",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${adminToken}`
        },
        body: JSON.stringify({ status: newStatus })
      });
      if (response.ok) {
        setLeads(leads.map(l => l.id === id ? { ...l, status: newStatus as any } : l));
      }
    } catch (err) {
      console.error("Failed to update status");
    }
  };

  return (
    <section id="register-section" className="py-16 sm:py-24 bg-gradient-to-b from-slate-50 to-slate-200/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Left Column: Form Info guidelines */}
          <div className="lg:col-span-5 space-y-8 text-left flex flex-col justify-center">
            <div className="space-y-3">
              <span className="text-brand-blue text-xs font-bold bg-blue-100 px-3 py-1 rounded-full uppercase tracking-wider">
                YÊU CẦU LẮP ĐẶT 24H
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight leading-tight">
                Hoàn Tất Đăng Ký <br /> Nhận Tư Vấn Sau 15 Phút
              </h2>
              <p className="text-slate-600 text-xs sm:text-sm font-semibold max-w-md leading-relaxed">
                Đội ngũ tư vấn viên của VNPT túc trực liên tục từ 7h00 đến 21h00 mỗi ngày để liên hệ lại hỗ trợ khảo sát đường dây lắp mạng và thiết lập hợp đồng hoả tốc cho bạn.
              </p>
            </div>

            {/* Checklist items of trust */}
            <div className="space-y-4">
              {[
                { title: "Bảo mật thông tin khách hàng tuyệt đối", desc: "Thông tin điện thoại, hợp đồng cam kết không mua bán chia sẻ bên thứ ba." },
                { title: "Ký hợp đồng điện tử tiện ích", desc: "Không cần mất thời gian ra bưu điện, ký nhận chữ ký số qua SMS nhanh chóng." },
                { title: "Lắp đặt, nghiệm thu dịch vụ hài lòng mới kích hoạt", desc: "Mạng thông suốt, kiểm tra đạt tốc độ cam kết mới chính thức đóng sòng đóng cước." }
              ].map((item, id) => (
                <div key={id} className="flex gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-white text-emerald-500 shadow-md border border-slate-100 shrink-0 flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-slate-900 text-sm sm:text-base leading-tight">{item.title}</h4>
                    <p className="text-slate-500 text-[11px] sm:text-xs font-semibold mt-1 leading-normal">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Lead Registration Capture Form card */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200/60 shadow-2xl relative overflow-hidden text-left"
            >
              {/* Promo floating notification badge */}
              <div className="absolute top-0 right-0 bg-brand-orange text-white text-[10px] sm:text-[11px] font-black uppercase tracking-wider px-5 py-2.5 rounded-bl-3xl shadow flex items-center gap-1.5 animate-pulse">
                <Sparkles className="w-3.5 h-3.5 fill-white" />
                ĐĂNG KÝ HÔM NAY ĐỂ ĐƯỢC ƯU ĐÃI THÁNG 5
              </div>

              <h3 className="text-xl font-black text-slate-900 mb-6 border-b border-gray-100 pb-4">
                Phiếu Đăng Ký Lắp Đặt Mạng & Dịch Vụ VNPT
              </h3>

              <form onSubmit={handleSubmitBooking} className="space-y-5">
                
                {/* Field: Full Name */}
                <div className="space-y-1 text-left">
                  <label className="text-xs text-slate-500 font-bold uppercase tracking-wider">Họ và Tên Quý Khách (*)</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                      <User className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      required
                      placeholder="Ví dụ: Nguyễn Văn A..."
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-slate-50/50 hover:bg-slate-50 border border-slate-200 focus:border-brand-blue focus:bg-white rounded-xl py-3 pl-11 pr-4 text-xs sm:text-sm text-slate-800 outline-none transition-all font-semibold"
                    />
                  </div>
                </div>

                {/* Field: Phone Number */}
                <div className="space-y-1 text-left">
                  <label className="text-xs text-slate-500 font-bold uppercase tracking-wider">Số Điện Thoại Liên Hệ (*)</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                      <Phone className="w-4 h-4" />
                    </div>
                    <input
                      type="tel"
                      required
                      placeholder="Ví dụ: 0912345678..."
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-slate-50/50 hover:bg-slate-50 border border-slate-200 focus:border-brand-blue focus:bg-white rounded-xl py-3 pl-11 pr-4 text-xs sm:text-sm text-slate-800 outline-none transition-all font-semibold font-mono"
                    />
                  </div>
                </div>

                {/* Field: Installation Address */}
                <div className="space-y-1 text-left">
                  <label className="text-xs text-slate-500 font-bold uppercase tracking-wider">Địa Chỉ Lắp Đặt Dự Kiến (Tỉnh/Thành, Quận/Huyện, Số nhà)</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      placeholder="Ví dụ: 125 Đường Nguyễn Huệ, Quận 1, TPHCM"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full bg-slate-50/50 hover:bg-slate-50 border border-slate-200 focus:border-brand-blue focus:bg-white rounded-xl py-3 pl-11 pr-4 text-xs sm:text-sm text-slate-800 outline-none transition-all font-semibold"
                    />
                  </div>
                </div>

                {/* Field: Package Interest Selector */}
                <div className="space-y-1 text-left">
                  <label className="text-xs text-slate-500 font-bold uppercase tracking-wider font-mono">Gói Cước Quý Khách Quan Tâm</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                      <Inbox className="w-4 h-4" />
                    </div>
                    <select
                      value={interest}
                      onChange={(e) => setInterest(e.target.value)}
                      className="w-full bg-slate-50/50 hover:bg-slate-50 border border-slate-200 focus:border-brand-blue focus:bg-white rounded-xl py-3 pl-11 pr-4 text-xs sm:text-sm text-slate-800 outline-none transition-all font-semibold appearance-none cursor-pointer"
                    >
                      <option value="">-- Quý khách tự điền hoặc chọn gói bất kỳ ở đây --</option>
                      {PACKAGES.map((pkg) => (
                        <option key={pkg.id} value={pkg.name}>
                          {pkg.name} ({pkg.speed} {pkg.speedUnit}) - {(pkg.promoPrice || pkg.price).toLocaleString("vi-VN")}đ/tháng
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {formError && (
                  <div className="bg-red-50 text-red-600 p-3 rounded-xl text-xs font-bold leading-none flex items-center gap-2 border border-red-100">
                    <AlertCircle className="w-4 h-4 text-red-500 inline shrink-0" />
                    <span>{formError}</span>
                  </div>
                )}

                {/* Submission CTA area button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-brand-blue hover:bg-brand-blue-hover disabled:bg-slate-300 text-white font-black py-4 px-6 rounded-2xl text-xs sm:text-sm transition-all duration-200 flex items-center justify-center gap-2 shadow-xl shadow-blue-100 hover:scale-[1.01] cursor-pointer"
                  >
                    {submitting ? (
                      <>
                        <RefreshCw className="w-5 h-5 animate-spin" />
                        Đang Xử Lý Hồ Sơ Lắp Đặt...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 fill-white text-white" />
                        GỬI MẪU ĐĂNG KÝ LẮP ĐẶT HOẢ TỐC 24H
                      </>
                    )}
                  </button>
                </div>
              </form>

              {/* Toggles raw registered leads for proofing/reviewing purposes */}
              <div className="mt-8 pt-6 border-t border-slate-100 flex justify-between items-center text-xs text-slate-400 font-semibold">
                <span>Hệ thống mạng lưới VNPT Telecom Hồ Chí Minh</span>
                <button
                  type="button"
                  onClick={() => setShowAdminPanel(!showAdminPanel)}
                  className="text-brand-blue hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <Database className="w-3.5 h-3.5" />
                  CTV Quản Lý Leads ({showAdminPanel ? "Đóng Bảng Điều Khiển" : "Mở Kiểm Tra Leads"})
                </button>
              </div>
            </motion.div>
          </div>

        </div>

        {/* Administrative Dashboard Panel */}
        <AnimatePresence>
          {showAdminPanel && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-12 bg-slate-900 border border-slate-800 text-white p-6 sm:p-8 rounded-3xl text-left shadow-2xl overflow-hidden"
            >
              {!isAdminVerified ? (
                <div className="max-w-md mx-auto py-8 text-center space-y-6">
                  <div className="w-12 h-12 rounded-full bg-brand-orange/10 text-brand-orange mx-auto flex items-center justify-center">
                    <Database className="w-6 h-6 border-none" />
                  </div>
                  <div className="space-y-1.5">
                    <h4 className="text-base font-black text-white">Xác Thực Quyền Cộng Tác Viên / Admin</h4>
                    <p className="text-xs text-slate-400 font-semibold leading-relaxed">
                      Thông tin dữ liệu khách hàng đăng ký được bảo mật tự động trên môi trường Internet công cộng. Vui lòng nhập mã PIN/mật khẩu quản trị dưới đây (ADMIN_PASSWORD) để truy cập dữ liệu:
                    </p>
                  </div>
                  <form onSubmit={handleVerifyPassword} className="space-y-3 text-left">
                    <input
                      type="password"
                      placeholder="Nhập mật khẩu quản trị bảo mật..."
                      value={adminPassword}
                      onChange={(e) => setAdminPassword(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 focus:border-brand-blue rounded-xl py-3 px-4 text-xs sm:text-sm text-white outline-none transition font-semibold font-mono"
                    />
                    {verifyError && (
                      <p className="text-red-400 text-xs font-bold font-sans">{verifyError}</p>
                    )}
                    <button
                      type="submit"
                      disabled={verifyingPassword}
                      className="w-full bg-brand-blue hover:bg-brand-blue-hover text-white font-black py-3 px-4 rounded-xl text-xs sm:text-sm transition flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      {verifyingPassword ? (
                        <RefreshCw className="w-4 h-4 animate-spin" />
                      ) : (
                        "XÁC MINH DANH TÍN CỘNG TÁC VIÊN"
                      )}
                    </button>
                  </form>
                </div>
              ) : (
                <>
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-800 pb-5 mb-6">
                    <div>
                      <h3 className="text-lg font-black tracking-tight text-white flex items-center gap-2">
                        <Layers className="w-5 h-5 text-brand-orange" />
                        Hệ Thống Phân Phối Lead Đăng Ký Mới (Trong Ngày)
                      </h3>
                      <p className="text-xs text-slate-400 font-semibold mt-1">
                        Bảng điều khiển của Cộng Tác Viên VNPT. Tại đây, bạn có thể kiểm tra danh sách khách hàng mới điền thông tin và cập nhật trạng thái tuyển dụng.
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => {
                          localStorage.removeItem("vnpt_admin_token");
                          setIsAdminVerified(false);
                        }}
                        className="bg-red-950/40 hover:bg-red-900/65 text-red-400 border border-red-500/10 text-xs font-bold py-2 px-3.5 rounded-lg flex items-center gap-1.5 cursor-pointer transition active:scale-95"
                      >
                        Đăng xuất Admin
                      </button>
                      <button
                        onClick={fetchLeads}
                        disabled={loadingLeads}
                        className="bg-slate-800 hover:bg-slate-700 text-xs font-bold py-2 px-3.5 rounded-lg border border-slate-700 flex items-center gap-1.5 cursor-pointer text-blue-200"
                      >
                        <RefreshCw className={`w-3.5 h-3.5 ${loadingLeads ? "animate-spin" : ""}`} />
                        Làm mới danh sách
                      </button>
                    </div>
                  </div>

                  {/* Google Sheets Synchronization Dashboard Card */}
                  <div className="bg-slate-950 p-5 rounded-3xl border border-slate-800 mb-8 overflow-hidden relative">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                      <div className="space-y-1.5 text-left">
                        <div className="flex items-center gap-2">
                          <div className={`w-2.5 h-2.5 rounded-full ${sheetsStatus?.configured ? "bg-emerald-500 animate-pulse" : "bg-amber-500"}`} />
                          <h4 className="text-sm font-black text-white flex items-center gap-1.5">
                            Đồng Bộ Google Sheets 
                            <span className={`text-[10px] px-2 py-0.5 rounded-full select-none ${
                              sheetsStatus?.configured 
                                ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" 
                                : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                            }`}>
                              {sheetsStatus?.configured ? "Đang hoạt động" : "Chưa cấu hình"}
                            </span>
                          </h4>
                        </div>
                        <p className="text-xs text-slate-400 font-semibold max-w-2xl leading-relaxed">
                          Trang tính lưu trữ: <span className="font-mono text-blue-300 select-all underline">{sheetsStatus?.sheetId || "1joXjJK8c7-F6T2RymNq2nSwM4XobSfh3w8CQHQNjLKI"}</span>
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        <a 
                          href={sheetsStatus?.sheetUrl || "https://docs.google.com/spreadsheets/d/1joXjJK8c7-F6T2RymNq2nSwM4XobSfh3w8CQHQNjLKI/edit?usp=sharing"} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold py-2 px-4 rounded-xl flex items-center gap-1.5 transition active:scale-95 text-[11px]"
                        >
                          <span className="shrink-0 font-bold px-1 rounded bg-white text-emerald-700 text-[10px]">Go</span>
                          Mở Google Sheet Bản Đăng Ký
                        </a>

                        <button
                          onClick={() => {
                            const el = document.getElementById("sheets-instructions-modal");
                            if (el) el.classList.toggle("hidden");
                          }}
                          className="bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold py-2 px-4 rounded-xl flex items-center gap-1.5 transition text-[11px] border border-slate-700"
                        >
                          Hướng dẫn Setup Google Sheets
                        </button>
                      </div>
                    </div>

                    {/* Apps Script Instruction Dropdown / Container */}
                    <div id="sheets-instructions-modal" className="mt-5 pt-5 border-t border-slate-900 text-left space-y-4 text-xs font-semibold text-slate-300 hidden">
                      <div className="bg-slate-900 border border-slate-850 p-4 rounded-2xl relative space-y-3">
                        <h5 className="text-white text-sm font-extrabold flex items-center gap-1.5">
                          <Sparkles className="w-4 h-4 text-brand-orange" />
                          Hướng dẫn tích hợp Google Sheets cho Form Đăng Ký trong 30 giây:
                        </h5>
                        <p className="text-slate-400 leading-relaxed text-[11px]">
                          Để chuyển các đăng ký lắp đặt hỏa tốc 24h trơn tru về Google Sheets, cấu hình bằng <strong>Google Apps Script Web App</strong> là giải pháp ổn định và nhanh chóng nhất (Không cần tạo Google Cloud App / Service Account):
                        </p>
                        <ol className="list-decimal pl-4 space-y-2 text-slate-400 leading-normal text-[11px]">
                          <li>Mở Google Sheet của bạn: <a href="https://docs.google.com/spreadsheets/d/1joXjJK8c7-F6T2RymNq2nSwM4XobSfh3w8CQHQNjLKI/edit?usp=sharing" target="_blank" className="underline text-blue-400 font-bold">Mở Trang Tính</a></li>
                          <li>Bấm thanh trình đơn: <strong>Extensions</strong> (Tiện ích mở rộng) &gt; <strong>Apps Script</strong>.</li>
                          <li>Xoá bộ mã mặc định và dán đoạn mã bên dưới vào:</li>
                        </ol>

                        {/* Code Block */}
                        <div className="relative group">
                          <pre className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-[10px] font-mono overflow-x-auto text-emerald-400 leading-normal select-all">
{`function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Thêm dòng mới: Thời gian, Họ Tên, Điện Thoại, Địa Chỉ, Gói Cước Đăng Ký, Trạng Thải
    sheet.appendRow([
      data.createdAt || new Date().toLocaleString("vi-VN"),
      data.name,
      "'" + data.phone, // Dấu nháy đơn giữ định dạng số 0 đầu số điện thoại
      data.address,
      data.packageInterest,
      "Chờ tư vấn (Lắp Hỏa Tốc)"
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({ status: "success" }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch(err) {
    return ContentService.createTextOutput(JSON.stringify({ status: "error", message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}`}
                          </pre>
                        </div>

                        <ol start={4} className="list-decimal pl-4 space-y-2 text-slate-400 leading-normal text-[11px]">
                          <li>Bấm <strong>Deploy</strong> (Triển khai) &gt; <strong>New deployment</strong> (Triển khai mới). Chỉnh loại thành <strong>Web app</strong> (Ứng dụng web).</li>
                          <li>Cấu hình:
                            <ul className="list-disc pl-4 mt-1 space-y-1">
                              <li>Execute as: <strong>Me</strong> (Tôi)</li>
                              <li>Who has access: <strong>Anyone</strong> (Bất kỳ ai)</li>
                            </ul>
                          </li>
                          <li>Bấm Triển khai, cấp quyền tài khoản Google, sau đó copy dòng <strong>Web app URL</strong>.</li>
                          <li>Mở phần <strong>Secrets</strong> của AI Studio (hoặc tệp .env), tạo biến tên là <code className="text-white hover:text-emerald-400 bg-slate-950 px-1 py-0.5 rounded">GOOGLE_APPS_SCRIPT_URL</code> và dán link Apps Script vào đó. Xong!</li>
                        </ol>
                      </div>
                    </div>
                  </div>

                  {leadsError && <p className="text-red-400 text-xs font-semibold mb-4">{leadsError}</p>}

                  {/* CRM Lead Cards grid */}
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {leads.map((lead) => (
                      <div key={lead.id} className="bg-slate-950 p-5 rounded-2xl border border-slate-800 flex flex-col justify-between space-y-4">
                        <div className="space-y-2">
                          <div className="flex justify-between items-center text-xs text-slate-400 font-bold">
                            <span className="bg-slate-800 px-2.5 py-0.5 rounded-full text-[10px] font-mono capitalize">
                              {lead.id}
                            </span>
                            <div className="flex items-center gap-1 text-[10px] text-gray-500 font-semibold leading-none">
                              <Calendar className="w-3.5 h-3.5" />
                              <span>{new Date(lead.createdAt).toLocaleTimeString("vi-VN")}</span>
                            </div>
                          </div>

                          <h4 className="text-sm font-black text-white">{lead.name}</h4>
                          <p className="text-xs font-semibold text-brand-orange font-mono">{lead.phone}</p>
                          
                          <div className="text-[11px] text-slate-400 font-semibold leading-relaxed">
                            <span className="text-slate-500 block">Địa chỉ:</span>
                            <span>{lead.address}</span>
                          </div>

                          <div className="text-[11px] text-slate-400 font-semibold leading-relaxed">
                            <span className="text-slate-500 block">Gói đăng ký:</span>
                            <span className="text-blue-300 font-bold">{lead.packageInterest}</span>
                          </div>
                        </div>

                        <div className="pt-3 border-t border-slate-800 flex justify-between items-center gap-1.5 text-xs text-slate-400 font-semibold">
                          <span>Trạng thái:</span>
                          <select
                            value={lead.status}
                            onChange={(e) => updateLeadStatus(lead.id, e.target.value)}
                            className={`bg-slate-900 border text-[11px] font-extrabold rounded px-2.5 py-1 outline-none cursor-pointer ${
                              lead.status === "new"
                                ? "border-amber-500 text-amber-400"
                                : lead.status === "contacted"
                                ? "border-blue-500 text-blue-400"
                                : "border-emerald-500 text-emerald-400"
                            }`}
                          >
                            <option value="new">🆕 Mới (Lắp 24h)</option>
                            <option value="contacted">📞 Đã Gọi</option>
                            <option value="completed">✔️ Đã Lắp Mạng</option>
                          </select>
                        </div>
                      </div>
                    ))}
                  </div>

                  {leads.length === 0 && (
                    <p className="text-xs text-slate-500 font-semibold text-center py-8">Chưa có khách hàng đăng ký mới nào trong cơ sở dữ liệu.</p>
                  )}
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>

      </div>

      {/* Booking Celebratory Modal Alert */}
      <AnimatePresence>
        {showSuccessModal && successInfo && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white p-8 rounded-3xl max-w-md w-full text-center relative shadow-2xl border border-slate-100 space-y-6"
            >
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-500 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-2">
                <span className="text-xs text-brand-orange font-bold uppercase tracking-widest block">ĐĂNG KÝ HOÀN TẤT!</span>
                <h3 className="text-xl font-black text-slate-950">Hệ Thống Đã Tiếp Nhận Thành Công</h3>
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl text-left border border-slate-100 text-xs sm:text-sm text-slate-700 font-semibold font-serif leading-relaxed">
                <p className="mb-1"><span className="text-slate-400 font-sans">Quý khách:</span> {successInfo.name}</p>
                <p className="mb-1"><span className="text-slate-400 font-sans">Hồ sơ sđt:</span> <span className="font-mono">{successInfo.phone}</span></p>
                <p className="mb-1"><span className="text-slate-400 font-sans">Gói đề xuất:</span> <span className="text-brand-blue font-sans font-bold">{successInfo.packageInterest}</span></p>
                <p><span className="text-slate-400 font-sans">Địa chỉ bàn giao:</span> {successInfo.address}</p>
              </div>

              <p className="text-xs text-slate-500 font-medium">
                ⚡ <strong>VNPT Cam kết:</strong> Chuyên viên lắp mạng VNPT sẽ liên hệ trực tiếp cho bạn từ số điện thoại tổng đài viễn thông trong vòng <strong>10 - 15 phút</strong> để lên lịch khảo sát đường điện kéo quang. Hãy chú ý điện thoại nhé!
              </p>

              <button
                onClick={() => setShowSuccessModal(false)}
                className="w-full bg-brand-blue text-white font-bold py-3 px-6 rounded-xl text-sm hover:bg-brand-blue-hover transition"
              >
                Đồng ý & Đóng Cửa Sổ
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
