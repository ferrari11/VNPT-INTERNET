import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Phone, Sparkles, Menu, X, Landmark, ShieldCheck } from "lucide-react";

interface NavbarProps {
  onOpenConsultant: () => void;
  onScrollToForm: () => void;
}

export default function Navbar({ onOpenConsultant, onScrollToForm }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      {/* Top micro-promotion bar */}
      <div className="bg-gradient-to-r from-brand-blue to-blue-700 text-white text-xs sm:text-sm py-2 px-4 text-center font-medium sticky top-0 z-50 shadow-sm flex items-center justify-center gap-2 overflow-hidden">
        <motion.span 
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="bg-brand-orange text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold uppercase tracking-wide"
        >
          KM THÁNG 5/2026
        </motion.span>
        <span>
          Bàn giao mạng hoả tốc trong 24H. Miễn phí lắp đặt, tặng Modem WiFi 5G và đến 02 tháng cước sử dụng!
        </span>
      </div>

      <header className="bg-white/90 backdrop-blur-md border-b border-gray-100 sticky top-[36px] z-40 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo Group */}
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => scrollToSection("hero")}>
              <div className="w-12 h-12 rounded-xl bg-brand-blue flex items-center justify-center text-white font-black text-xl shadow-md shadow-blue-200">
                VN
              </div>
              <div>
                <span className="text-xl font-bold text-brand-blue tracking-tight block">
                  VNPT <span className="text-brand-orange-hover">Hồ Chí Minh</span>
                </span>
                <span className="text-[10px] text-gray-500 font-mono block tracking-wider">
                  HỒ CHÍ MINH & TOÀN QUỐC
                </span>
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-8">
              <button 
                onClick={() => scrollToSection("advantages")}
                className="text-gray-600 hover:text-brand-blue font-medium text-sm transition-colors py-2"
              >
                Ưu Điểm
              </button>
              <button 
                onClick={() => scrollToSection("quiz")}
                className="text-gray-600 hover:text-brand-blue font-medium text-sm transition-colors py-2 flex items-center gap-1.5"
              >
                Đề Xuất Quiz <span className="bg-blue-100 text-brand-blue rounded px-1 py-0.2 text-[9px] font-bold">Smart</span>
              </button>
              <button 
                onClick={() => scrollToSection("pricing")}
                className="text-gray-600 hover:text-brand-blue font-medium text-sm transition-colors py-2"
              >
                Bảng Giá Gói Cước
              </button>
              <button 
                onClick={() => scrollToSection("combo")}
                className="text-gray-600 hover:text-brand-blue font-medium text-sm transition-colors py-2"
              >
                Combo Tiết Kiệm
              </button>
              <button 
                onClick={() => scrollToSection("faq")}
                className="text-gray-600 hover:text-brand-blue font-medium text-sm transition-colors py-2"
              >
                Hỏi Đáp FAQs
              </button>
            </nav>

            {/* Top Right Urgent CTAs */}
            <div className="hidden md:flex items-center gap-4">
              <button
                onClick={onOpenConsultant}
                className="bg-blue-50 text-brand-blue hover:bg-blue-100 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 flex items-center gap-2 border border-blue-200/50"
              >
                <Sparkles className="w-4 h-4 text-brand-orange animate-pulse" />
                Tư Vấn AI 24/7
              </button>

              <a
                href="tel:0944116667"
                className="bg-brand-orange hover:bg-brand-orange-hover text-white px-5 py-2.5 rounded-xl font-bold text-sm transition-all duration-200 flex items-center gap-2 shadow-lg shadow-orange-100 hover:scale-[1.03] active:scale-95"
              >
                <Phone className="w-4 h-4" />
                <span>0944116667</span>
              </a>
            </div>

            {/* Mobile menu trigger button */}
            <div className="lg:hidden flex items-center gap-3">
              <button
                onClick={onOpenConsultant}
                className="md:hidden bg-blue-50 text-brand-blue p-2.5 rounded-xl flex items-center justify-center"
                title="Tư vấn AI"
              >
                <Sparkles className="w-5 h-5 text-brand-orange" />
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-gray-600 hover:text-brand-blue p-2 rounded-lg border border-gray-100 flex items-center justify-center"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Panel */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden border-t border-gray-100 bg-white overflow-hidden shadow-inner"
            >
              <div className="px-4 pt-4 pb-6 space-y-3">
                <button
                  onClick={() => scrollToSection("advantages")}
                  className="w-full text-left px-4 py-2.5 text-gray-700 hover:bg-blue-50 hover:text-brand-blue rounded-xl text-sm font-medium transition-colors"
                >
                  Ưu Điểm Nổi Bật
                </button>
                <button
                  onClick={() => scrollToSection("quiz")}
                  className="w-full text-left px-4 py-2.5 text-gray-700 hover:bg-blue-50 hover:text-brand-blue rounded-xl text-sm font-medium transition-colors flex items-center justify-between"
                >
                  <span>Công Cụ Tự Chọn Gói (AI Quiz)</span>
                  <span className="bg-brand-orange text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full uppercase">Mới</span>
                </button>
                <button
                  onClick={() => scrollToSection("pricing")}
                  className="w-full text-left px-4 py-2.5 text-gray-700 hover:bg-blue-50 hover:text-brand-blue rounded-xl text-sm font-medium transition-colors"
                >
                  Bảng Giá Gói Cước
                </button>
                <button
                  onClick={() => scrollToSection("combo")}
                  className="w-full text-left px-4 py-2.5 text-gray-700 hover:bg-blue-50 hover:text-brand-blue rounded-xl text-sm font-medium transition-colors"
                >
                  Combo Sim Vina & Truyền Hình
                </button>
                <button
                  onClick={() => scrollToSection("faq")}
                  className="w-full text-left px-4 py-2.5 text-gray-700 hover:bg-blue-50 hover:text-brand-blue rounded-xl text-sm font-medium transition-colors"
                >
                  Hỏi Đáp FAQs
                </button>
                <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenConsultant();
                    }}
                    className="flex-1 bg-blue-50 text-brand-blue font-bold px-4 py-3 rounded-xl text-center text-sm border border-blue-100 hover:bg-blue-100 transition-colors flex items-center justify-center gap-2"
                  >
                    <Sparkles className="w-4 h-4 text-brand-orange" />
                    Hỏi Trợ lý ảo AI
                  </button>
                  <a
                    href="tel:18001166"
                    className="flex-1 bg-brand-orange text-white text-center font-bold px-4 py-3 rounded-xl text-sm shadow-md flex items-center justify-center gap-2 hover:bg-brand-orange-hover"
                  >
                    <Phone className="w-4 h-4" />
                    <span>Hotline 1800 1166</span>
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
