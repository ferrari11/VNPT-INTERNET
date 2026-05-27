import { useState, FormEvent } from "react";
import { motion } from "motion/react";
import { Zap, Send, Wifi, Phone, ShieldCheck, Heart } from "lucide-react";
import vnptHeroImg from "../assets/images/vnpt_hero_illustration_1779722179499.png";

interface HeroProps {
  onQuickRegister: (name: string, phone: string) => void;
  onScrollToForm: () => void;
}

export default function Hero({ onQuickRegister, onScrollToForm }: HeroProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      setError("Vui lòng điền họ tên và số điện thoại.");
      return;
    }
    setError("");
    onQuickRegister(name, phone);
    setName("");
    setPhone("");
  };

  return (
    <section id="hero" className="relative overflow-hidden bg-gradient-to-b from-[#f2f8fc] via-white to-white pt-10 pb-16 lg:pt-16 lg:pb-24">
      {/* Background graphic elements */}
      <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
        <div className="relative left-[calc(50%-11rem)] aspect-1155/678 w-[36rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#90cdf4] to-[#4299e1] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72rem]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Copywriting & Quick Lead Form */}
          <div className="lg:col-span-7 space-y-8 text-left">
            
            {/* Social Trust Badge */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-blue-100/80 backdrop-blur-md text-brand-blue px-3.5 py-1.5 rounded-full text-xs font-bold leading-5 shadow-sm border border-blue-200"
            >
              <Zap className="w-3.5 h-3.5 text-brand-orange animate-bounce fill-brand-orange" />
              <span>Cáp quang VNPT Thế Hệ Mới - Băng thông siêu rộng</span>
            </motion.div>

            {/* Captivating Hero Headlines */}
            <div className="space-y-4">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.1]"
              >
                WiFi Siêu Tốc Độ <br />
                <span className="bg-gradient-to-r from-brand-blue to-blue-600 bg-clip-text text-transparent">
                  Băng Thông Vô Hạn
                </span> <br />
                Cho Mọi Nhà
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-base sm:text-lg text-slate-600 max-w-xl font-medium leading-relaxed"
              >
                Tải tẹt ga không lo trễ mạng cáp quang VNPT lên tới <span className="text-brand-blue font-bold">1 Gbps</span>. Phủ sóng ngập lối với công nghệ <span className="text-brand-orange font-bold">WiFi Mesh xuyên tường</span> thế hệ mới. Lắp đặt hoả tốc 24H tại Hồ Chí Minh và cả nước!
              </motion.p>
            </div>

            {/* Quick Consultation Form Widget */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white p-6 rounded-3xl shadow-xl shadow-slate-100 border border-slate-100 max-w-lg relative"
            >
              {/* Highlight promotional tag */}
              <div className="absolute -top-3 right-5 bg-gradient-to-r from-brand-orange to-red-500 text-white text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-md animate-pulse">
                👉 MIỄN PHÍ LẮP ĐẶT 100%
              </div>

              <h3 className="text-gray-900 font-bold text-base mb-4 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-brand-orange inline-block"></span>
                Tư Vấn Miễn Phí & Kiểm Tra Hạ Tầng Băng Thông:
              </h3>

              <form onSubmit={handleSubmit} className="space-y-3.5">
                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Họ tên khách hàng..."
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 focus:border-brand-blue focus:bg-white rounded-xl py-3 px-4 text-sm text-slate-800 outline-none transition-all font-medium"
                    />
                  </div>
                  <div className="relative">
                    <input
                      type="tel"
                      placeholder="Số điện thoại di động..."
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 focus:border-brand-blue focus:bg-white rounded-xl py-3 px-4 text-sm text-slate-800 outline-none transition-all font-medium"
                    />
                  </div>
                </div>

                {error && <p className="text-red-500 text-xs font-semibold text-left">{error}</p>}

                <div className="flex flex-col sm:flex-row gap-3 items-center">
                  <button
                    type="submit"
                    className="w-full sm:w-auto flex-1 bg-gradient-to-r from-brand-orange to-orange-600 hover:from-brand-orange-hover hover:to-orange-700 text-white font-bold py-3 px-6 rounded-xl text-sm transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-orange-100 hover:scale-[1.02] active:scale-95 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    Đăng Ký Tư Vấn Hoả Tốc
                  </button>

                  <button
                    type="button"
                    onClick={onScrollToForm}
                    className="w-full sm:w-auto text-slate-500 hover:text-brand-blue font-semibold text-xs py-2 px-3 hover:underline text-center"
                  >
                    Xem chi tiết gói cước
                  </button>
                </div>
              </form>

              {/* Urgency Counter indicator */}
              <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
                <div className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping inline-block"></span>
                  <span><strong>11.458</strong> Khách lắp mạng thành công tuần này</span>
                </div>
                <span>Ưu đãi áp dụng đến ngày: 31/05/2026</span>
              </div>
            </motion.div>

            {/* Micro Benefits tags list */}
            <div className="flex flex-wrap gap-x-6 gap-y-2 pt-2 text-xs sm:text-sm font-semibold text-slate-600">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-5 h-5 text-emerald-500" />
                Dùng thử mạng, không ưng không tính tiền
              </span>
              <span className="flex items-center gap-1.5">
                <Wifi className="w-5 h-5 text-emerald-500" />
                Tivi MyTV 180+ kênh bản quyền
              </span>
            </div>
          </div>

          {/* Right Column: Premium Framed Artwork Column */}
          <div className="lg:col-span-5 relative">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, type: "spring" }}
              className="relative mx-auto max-w-[420px] lg:max-w-none"
            >
              {/* Abstract decorative floating rings */}
              <div className="absolute -left-12 -top-12 w-32 h-32 rounded-full bg-blue-100/50 -z-10 blur-xl animate-pulse" />
              <div className="absolute -right-8 -bottom-8 w-48 h-48 rounded-full bg-orange-100/50 -z-10 blur-2xl" />

              {/* Interactive badge highlighting speed overlay */}
              <div className="absolute top-10 left-[-30px] bg-white/95 backdrop-blur shadow-xl rounded-2xl p-3.5 border border-slate-100/80 -rotate-3 z-10 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center text-brand-orange">
                  <Zap className="w-5 h-5 fill-brand-orange text-brand-orange" />
                </div>
                <div className="text-left">
                  <div className="text-[10px] text-gray-500 font-bold block leading-none">PING GAME</div>
                  <div className="text-lg font-black text-slate-800 font-mono leading-none">2ms - 5ms</div>
                </div>
              </div>

              {/* Main Artwork Container frame */}
              <div className="p-3 bg-gradient-to-r from-brand-blue/35 to-blue-200/50 rounded-3xl shadow-2xl relative overflow-hidden backdrop-blur-sm border border-white/50">
                <img
                  src={vnptHeroImg}
                  alt="VNPT High Speed Internet Fiber Family Connection Illustration"
                  referrerPolicy="no-referrer"
                  className="w-full h-auto object-cover rounded-2xl bg-white shadow-inner aspect-[16/11]"
                />
              </div>

              {/* Second floating badge info */}
              <div className="absolute bottom-6 right-[-20px] bg-white/95 backdrop-blur shadow-2xl rounded-2xl p-4 border border-slate-100/80 rotate-2 z-10 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 animate-pulse">
                  <Heart className="w-4 h-4 fill-emerald-600" />
                </div>
                <div className="text-left">
                  <div className="text-[10px] text-slate-600 font-bold leading-tight">Yêu Thích 100%</div>
                  <div className="text-xs text-slate-500 font-medium">Bảo trì miễn phí trọn đời</div>
                </div>
              </div>
            </motion.div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
