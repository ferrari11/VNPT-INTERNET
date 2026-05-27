import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  MessageSquare, Sparkles, X, Send, Bot, User, 
  HelpCircle, Check, ArrowRight, CornerDownLeft, Loader2
} from "lucide-react";

interface AIConsultantProps {
  onSelectPackage: (pkgName: string) => void;
  isOpen?: boolean;
  onClose?: () => void;
}

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function AIConsultant({ onSelectPackage, isOpen: controlledIsOpen, onClose: controlledOnClose }: AIConsultantProps) {
  const [localIsOpen, setLocalIsOpen] = useState(false);
  const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : localIsOpen;
  
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Xin chào quý khách! Tôi là **Trợ lý Ảo VNPT Smart Advisor** (được cung cấp bởi mô hình học máy thông minh Google Gemini 3.5).\n\nHai băng tần WiFi, phủ sóng xuyên tường Mesh, hay gói cước Sim Vinaphone siêu khuyến mãi. Hãy cho tôi biết nhu cầu của anh/chị (ví dụ: số người dùng, kiểu nhà, sử dụng Sim di động...) để tôi đề xuất gói cước tốt nhất nhé!"
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const toggleChat = () => {
    if (controlledOnClose) {
      if (isOpen) {
        controlledOnClose();
      }
    } else {
      setLocalIsOpen(!localIsOpen);
    }
  };

  // Scroll messages to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen]);

  const handleSendMessage = async (textToSend?: string) => {
    const messageText = textToSend || inputValue;
    if (!messageText.trim() || loading) return;

    if (!textToSend) {
      setInputValue("");
    }

    const newUserMessage: Message = { role: "user", content: messageText };
    const updatedMessages = [...messages, newUserMessage];
    setMessages(updatedMessages);
    setLoading(true);

    try {
      const response = await fetch("/api/consultant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updatedMessages })
      });

      if (response.ok) {
        const data = await response.json();
        setMessages((prev) => [...prev, { role: "assistant", content: data.content }]);
      } else {
        setMessages((prev) => [
          ...prev, 
          { role: "assistant", content: "Lỗi hệ thống: Hiện tại tổng đài AI đang bảo trì. Quý khách có thể điền thông tin vào form để nhân viên VNPT liên hệ trực tiếp tư vấn lắp mạng nhé!" }
        ]);
      }
    } catch (err) {
      setMessages((prev) => [
        ...prev, 
        { role: "assistant", content: "Không thể kết nối tổng đài AI VNPT. Quý khách vui lòng điền thông tin vào form tư vấn bên cạnh hoặc gọi hotline 1800 1166." }
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Pre-configured suggestive questions
  const quickQuestions = [
    { text: "Sinh viên ở trọ xài gói nào rẻ nhất?", title: "Sinh Viên" },
    { text: "Nhà phố 3 lầu 5 người chọn gói nào tốt?", title: "Nhà Nhiều Lầu" },
    { text: "Có gói nào vừa lắp WiFi vừa tặng Sim 4G/5G gọi điện thoại không?", title: "Combo Sim Vina" },
    { text: "Chủ shop bán hàng online cần gói nào cam kết ping xanh?", title: "Leo Rank & Livestream" }
  ];

  // Extracts potential recommendation names to let users auto register
  const extractAndApplyPack = (text: string) => {
    let detected = "";
    if (text.includes("HOME NET 1")) detected = "HOME NET 1";
    else if (text.includes("HOME NET 2")) detected = "HOME NET 2";
    else if (text.includes("HOME MESH 2+")) detected = "HOME MESH 2+";
    else if (text.includes("HOME MESH 5")) detected = "HOME MESH 5";
    else if (text.includes("COMBO HOME SÀNH")) detected = "COMBO HOME SÀNH (Internet + SIM Vina)";
    else if (text.includes("COMBO HOME CHẤT")) detected = "COMBO HOME CHẤT (Thêm Truyền hình MyTV)";
    
    if (detected) {
      onSelectPackage(detected);
      if (controlledOnClose) {
        controlledOnClose();
      } else {
        setLocalIsOpen(false);
      }
      setTimeout(() => {
        const element = document.getElementById("register-section");
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 300);
    }
  };

  return (
    <>
      {/* Floating Circle Button Trigger */}
      <div className="fixed bottom-6 right-6 z-50">
        <motion.button
          onClick={toggleChat}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-brand-blue hover:bg-brand-blue-hover text-white rounded-full p-4.5 shadow-2xl flex items-center gap-2 border border-blue-400/30 relative group cursor-pointer"
        >
          {/* Pulsing indicator dot of live state */}
          <span className="absolute top-1 right-1 w-3.5 h-3.5 rounded-full bg-orange-500 border-2 border-white animate-ping"></span>
          <span className="absolute top-1 right-1 w-3.5 h-3.5 rounded-full bg-orange-500 border-2 border-white"></span>
          
          <MessageSquare className="w-6 h-6 shrink-0" />
          <span className="max-w-0 overflow-hidden group-hover:max-w-xs font-black text-xs uppercase tracking-wider transition-all duration-300 leading-none inline-block">
            Tư Vấn Gói Bằng AI
          </span>
        </motion.button>
      </div>

      {/* Slide dialogue panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            className="fixed bottom-24 right-4 sm:right-6 z-50 w-[92%] sm:w-[410px] h-[520px] bg-white rounded-3xl shadow-2xl border border-slate-100/90 flex flex-col justify-between overflow-hidden"
          >
            {/* Header chat panel */}
            <div className="bg-gradient-to-r from-brand-blue to-blue-700 p-4.5 text-white flex justify-between items-center relative overflow-hidden shrink-0">
              <div className="absolute top-0 right-[-10px] w-28 h-28 bg-white/5 rounded-full blur-xl" />
              
              <div className="flex items-center gap-3 text-left relative z-10">
                <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center border border-white/10 relative">
                  <span className="absolute bottom-[-2px] right-[-2px] w-2.5 h-2.5 rounded-full bg-emerald-400 border border-white"></span>
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-extrabold text-sm sm:text-base leading-none tracking-tight flex items-center gap-1.5">
                    Trợ lý ảo VNPT
                    <Sparkles className="w-3.5 h-3.5 text-brand-orange fill-brand-orange animate-pulse" />
                  </h4>
                  <span className="text-[10px] text-blue-100 font-medium font-mono">GOOGLE GEMINI ONLINE 24/7</span>
                </div>
              </div>

              <button
                onClick={toggleChat}
                className="text-white hover:bg-white/10 p-2 rounded-xl transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Messages Log Area */}
            <div className="flex-1 overflow-y-auto p-4 bg-slate-50 space-y-4">
              {messages.map((msg, idx) => {
                const isBot = msg.role === "assistant";
                return (
                  <div
                    key={idx}
                    className={`flex gap-2.5 max-w-[85%] text-left ${
                      isBot ? "mr-auto flex-row" : "ml-auto flex-row-reverse"
                    }`}
                  >
                    {/* Character icon */}
                    <div className={`w-8 h-8 rounded-lg shrink-0 flex items-center justify-center text-xs ${
                      isBot ? "bg-blue-100 text-brand-blue border border-blue-200" : "bg-slate-200 text-slate-700"
                    }`}>
                      {isBot ? <Bot className="w-4.5 h-4.5" /> : <User className="w-4.5 h-4.5" />}
                    </div>

                    {/* Speech card body bubble */}
                    <div className="space-y-2">
                      <div className={`p-3.5 rounded-2xl text-xs sm:text-sm font-semibold leading-relaxed shadow-sm border ${
                        isBot 
                          ? "bg-white text-slate-800 border-slate-100" 
                          : "bg-brand-blue text-white border-blue-600"
                      }`}>
                        {/* Basic parser to parse double asterisk and bullets */}
                        {msg.content.split("\n\n").map((para, pIdx) => (
                          <p key={pIdx} className="mb-2 last:mb-0">
                            {para.split("**").map((sub, sIdx) => {
                              if (sIdx % 2 !== 0) {
                                return (
                                  <strong key={sIdx} className="font-black text-slate-950 dark:text-blue-200">
                                    {sub}
                                  </strong>
                                );
                              }
                              return sub;
                            })}
                          </p>
                        ))}
                      </div>

                      {/* Bot offer direct registration action if user is given a package code inside assistant texts */}
                      {isBot && idx > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {["HOME NET 1", "HOME NET 2", "HOME MESH 2+", "HOME MESH 5", "HOME SÀNH", "HOME CHẤT"].some(kw => msg.content.includes(kw)) && (
                            <button
                              onClick={() => extractAndApplyPack(msg.content)}
                              className="bg-blue-50 hover:bg-blue-100 text-brand-blue border border-blue-200 text-[10px] font-black uppercase px-2.5 py-1.5 rounded-lg flex items-center gap-1 transition"
                            >
                              ✓ Chọn Đề Xuất Này Lắp Ngay
                              <ArrowRight className="w-3 h-3 stroke-[2.5]" />
                            </button>
                          )}
                        </div>
                      )}
                    </div>

                  </div>
                );
              })}

              {loading && (
                <div className="flex gap-2.5 text-left mr-auto flex-row items-center">
                  <div className="w-8 h-8 rounded-lg bg-blue-100 text-brand-blue flex items-center justify-center shrink-0">
                    <Loader2 className="w-4 h-4 animate-spin" />
                  </div>
                  <div className="bg-white px-4 py-2 rounded-2xl border border-slate-100 text-xs font-semibold text-slate-500 animate-pulse">
                    Đầu số AI đang tính toán gói cước...
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Suggestive Questions Panel */}
            <div className="border-t border-slate-100 bg-white p-3 shrink-0">
              {messages.length < 3 && (
                <div className="space-y-1.5 text-left mb-2">
                  <span className="text-[10px] text-slate-400 font-bold tracking-wider uppercase block">GỢI Ý NHANH CÂU HỎI:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {quickQuestions.map((q, id) => (
                      <button
                        key={id}
                        onClick={() => handleSendMessage(q.text)}
                        className="bg-slate-50 hover:bg-blue-50 text-slate-600 hover:text-brand-blue border border-slate-200 text-[10px] font-bold py-1 px-2.5 rounded-full transition cursor-pointer"
                      >
                        {q.title}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Input Chat box */}
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Gõ tin nhắn hỗ trợ lắp mạng..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                  disabled={loading}
                  className="flex-1 bg-slate-100 border border-slate-100 focus:border-brand-blue focus:bg-white rounded-xl py-2.5 px-4 text-xs sm:text-sm text-slate-800 outline-none transition font-semibold"
                />
                <button
                  onClick={() => handleSendMessage()}
                  disabled={loading || !inputValue.trim()}
                  className="bg-brand-blue hover:bg-brand-blue-hover text-white p-2.5 rounded-xl flex items-center justify-center shrink-0 cursor-pointer disabled:bg-slate-200 disabled:text-slate-400"
                >
                  <Send className="w-4 h-4 fill-white" />
                </button>
              </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
