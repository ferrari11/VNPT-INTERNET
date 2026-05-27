import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Phone, Globe, Sparkles, MapPin, Layers, Award, ShieldCheck, CreditCard, 
  Tv, Heart, MessageSquare, BellRing, ChevronRight 
} from "lucide-react";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Advantages from "./components/Advantages";
import WizardQuiz from "./components/WizardQuiz";
import TariffGrid from "./components/TariffGrid";
import VinaphoneCombo from "./components/VinaphoneCombo";
import Reviews from "./components/Reviews";
import FAQ from "./components/FAQ";
import LeadForm from "./components/LeadForm";
import AIConsultant from "./components/AIConsultant";

// Live simulated registered customers database for organic social proof trust ticker
const TICKERS = [
  { name: "Anh Nguyễn Tuấn Minh", location: "Quận Bình Thạnh, HCM", pack: "Combo Home Sành 250Mbps", time: "2 phút trước" },
  { name: "Chị Lê Mỹ Linh", location: "Quận 3, Hồ Chí Minh", pack: "Home Mesh 2+ (Phủ Sóng Rộng)", time: "5 phút trước" },
  { name: "Anh Vũ Hoàng Nam", location: "Quận 7, HCM", pack: "Home Net 5 (Tốc Độ Siêu Tốc)", time: "8 phút trước" },
  { name: "Chú Trần Khắc Hùng", location: "Quận Tân Bình, HCM", pack: "Home Net 2 (Gia Đình)", time: "12 phút trước" },
  { name: "Chị Phạm Thu Trang", location: "Quận Thủ Đức, HCM", pack: "Home Net 1 Sinh Viên", time: "18 phút trước" },
  { name: "Anh Đặng Trung Nghĩa", location: "Quận Bình Tân, HCM", pack: "Combo Home Chất (Thêm TV)", time: "22 phút trước" }
];

export default function App() {
  const [selectedPackage, setSelectedPackage] = useState("");
  const [isConsultantOpen, setIsConsultantOpen] = useState(false);
  
  // Urgent notification ticker states
  const [tickerIndex, setTickerIndex] = useState(0);
  const [showTicker, setShowTicker] = useState(false);

  // Rotating ticker triggers
  useEffect(() => {
    const startTimeout = setTimeout(() => {
      setShowTicker(true);
    }, 4000);

    const interval = setInterval(() => {
      setShowTicker(false);
      setTimeout(() => {
        setTickerIndex((prev) => (prev + 1) % TICKERS.length);
        setShowTicker(true);
      }, 1000); // fade out then fade back in with new item
    }, 18000); // show ticker every 18 seconds

    return () => {
      clearTimeout(startTimeout);
      clearInterval(interval);
    };
  }, []);

  const handleSelectPackage = (pkgName: string) => {
    setSelectedPackage(pkgName);
  };

  const handleOpenConsultant = () => {
    setIsConsultantOpen(true);
  };

  const handleCloseConsultant = () => {
    setIsConsultantOpen(false);
  };

  const handleScrollToForm = () => {
    const element = document.getElementById("register-section");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="font-sans bg-slate-50 min-h-screen text-slate-800 antialiased selection:bg-brand-blue selection:text-white">
      
      {/* Sticky Glass Navbar */}
      <Navbar 
        onOpenConsultant={handleOpenConsultant} 
        onScrollToForm={handleScrollToForm} 
      />

      {/* Hero Section Container */}
      <Hero 
        onQuickRegister={(name, phone) => {
          // Prefill name & phone directly inside LeadForm on submission, trigger success inside LeadForm.
          // This is handled by feeding register API back.
          setSelectedPackage("Cần tư vấn gói cước gia đình/sinh viên phù hợp");
          // Focus to form layout
          handleScrollToForm();
        }}
        onScrollToForm={handleScrollToForm}
      />

      {/* Core Advantages section */}
      <Advantages />

      {/* Interactive Questionnaire selection wizard */}
      <WizardQuiz onSelectPackage={handleSelectPackage} />

      {/* Tariff plans comparison layout comparison chart */}
      <TariffGrid 
        onSelectPackage={handleSelectPackage}
        selectedPackage={selectedPackage}
      />

      {/* Exclusive Saving Combo Internet + Mobile SIM di dong Vinaphone */}
      <VinaphoneCombo onSelectPackage={handleSelectPackage} />

      {/* Customer testimonial review slider section */}
      <Reviews />

      {/* Comprehensive registration Lead registration form & CRM desktop */}
      <LeadForm 
        selectedPackage={selectedPackage}
        onSelectPackage={handleSelectPackage}
      />

      {/* Dynamic collapsing FAQs */}
      <FAQ />

      {/* Main informative footer section */}
      <footer className="bg-slate-900 text-slate-300 py-16 border-t border-slate-800 text-left relative overflow-hidden">
        {/* Abstract grids overlays */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#334155_1px,transparent_1px),linear-gradient(to_bottom,#334155_1px,transparent_1px)] bg-[size:5rem_5rem] opacity-5 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid gap-12 md:grid-cols-2">
          
          {/* Column 1: Corporate Branding */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-brand-blue flex items-center justify-center text-white font-black text-lg shadow-md">
                VN
              </div>
              <div>
                <span className="text-lg font-bold text-white tracking-tight block">
                  VNPT VinaPhone<span className="text-brand-orange">HCM</span>
                </span>
                <span className="text-[10px] text-slate-500 font-mono block">
                  NHÀ MẠNG KHÁCH HÀNG TIN CẬY
                </span>
              </div>
            </div>
            <p className="text-xs text-slate-400 font-medium leading-relaxed">
              Tổng công ty dịch vụ Viễn thông VNPT-VinaPhone. Đơn vị cung cấp cáp quang tốc độ cao hàng đầu Việt Nam. Kết nối đến tương lai.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-2">
            <h4 className="text-white font-extrabold text-sm sm:text-base border-b border-slate-800 pb-2">CHÍNH SÁCH DỊCH VỤ</h4>
            <ul className="space-y-2.5 text-xs sm:text-sm font-semibold">
              <li><a href="#advantages" className="hover:text-white hover:underline transition">Ưu Điểm Băng Thông</a></li>
              <li><a href="#pricing" className="hover:text-white hover:underline transition">Bảng Giá Gói Home Net</a></li>
              <li><a href="#combo" className="hover:text-white hover:underline transition">Combo Sim Vinaphone 4G</a></li>
              <li><a href="#faq" className="hover:text-white hover:underline transition">Kỹ Thuật Bảo Trì Nhanh</a></li>
            
            </ul>
          </div>
 
        </div>

        {/* Outer credit line */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-slate-800 text-center text-xs text-slate-500 font-mono flex flex-col sm:flex-row justify-between items-center gap-4">
          <span>© 2026 Bản quyền thuộc TECH FLOW.</span>
          <div className="flex gap-4">
            <span className="hover:text-slate-300 cursor-pointer">Chính sách bảo mật</span>
            <span className="hover:text-slate-300 cursor-pointer">Điều khoản sử dụng</span>
          </div>
        </div>
      </footer>

      {/* Dynamic server-side Gemini powered Consultant chatbot drawer */}
      <AIConsultant 
        onSelectPackage={handleSelectPackage}
        isOpen={isConsultantOpen}
        onClose={handleCloseConsultant}
      />

      {/* Floating Subscriber Urgent Social Trust Ticker Alerts */}
      <div className="fixed bottom-6 left-6 z-40 max-w-[90%] sm:max-w-[400px]">
        <AnimatePresence>
          {showTicker && (
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -100, opacity: 0 }}
              transition={{ type: "spring", stiffness: 100, damping: 15 }}
              className="bg-white/95 backdrop-blur shadow-2xl rounded-2xl p-4.5 border border-slate-100 flex items-center gap-3.5 shadow-slate-300/60 text-left"
            >
              <div className="w-10 h-10 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-brand-blue animate-pulse shrink-0">
                <BellRing className="w-5 h-5" />
              </div>
              <div className="leading-tight shrink pr-2">
                <div className="text-[10px] text-slate-400 font-serif font-black flex justify-between gap-2">
                  <span>THÀNH CÔNG</span>
                  <span>{TICKERS[tickerIndex].time}</span>
                </div>
                <p className="text-xs font-black text-slate-900 mt-0.5 leading-snug">
                  {TICKERS[tickerIndex].name} ({TICKERS[tickerIndex].location})
                </p>
                <p className="text-xs text-slate-500 font-semibold mt-0.5">
                  Vừa đăng ký gói: <span className="text-brand-blue font-bold">{TICKERS[tickerIndex].pack}</span>
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </div>
  );
}
