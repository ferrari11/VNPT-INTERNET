import { useState } from "react";
import { motion } from "motion/react";
import { Sparkles, Check, CheckCircle2, TrendingDown, ArrowRight } from "lucide-react";

interface VinaphoneComboProps {
  onSelectPackage: (packageName: string) => void;
}

export default function VinaphoneCombo({ onSelectPackage }: VinaphoneComboProps) {
  const [selectedMonths, setSelectedMonths] = useState<6 | 12>(6);

  const separateCosts = {
    internet: 220000,
    simData: 150000,
    voiceCalls: 100000,
    mytv: 50000,
  };

  const separateTotal = separateCosts.internet + separateCosts.simData + separateCosts.voiceCalls + separateCosts.mytv;
  const comboPrice = 239000;
  const monthlySavings = separateTotal - comboPrice;
  const totalSavings = monthlySavings * (selectedMonths === 6 ? 7 : 14); // including bonus months (6+1, 12+2)

  const handleSelectCombo = () => {
    onSelectPackage("COMBO HOME SÀNH (Internet + SIM Vina)");
    const element = document.getElementById("register-section");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section id="combo" className="py-16 sm:py-24 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden">
      {/* Decorative colored glow overlays */}
      <div className="absolute top-0 right-1/3 w-80 h-80 bg-orange-100/40 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-blue-100/40 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section title */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-brand-orange text-xs font-bold tracking-widest uppercase bg-orange-100 px-3 py-1 rounded-full">
            ĐỘC QUYỀN TIẾT KIỆM 50% VINA
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight leading-tight">
            Combo Internet + Di Động VinaPhone
          </h2>
          <p className="text-slate-600 text-sm sm:text-base font-medium">
            Tại sao phải trả nhiều hóa đơn riêng lẻ? Ghép chung Internet Cáp Quang và Sim di động Data 4G/5G Vinaphone vào 1 tài khoản để tiết kiệm hơn một nửa chi phí cho cả gia đình.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Cost Breakdown comparison */}
          <div className="lg:col-span-6 space-y-6">
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">
              Bảng So Sánh Chi Phí Tiêu Dùng Thực Tế
            </h3>
            <p className="text-slate-500 text-xs sm:text-sm font-semibold max-w-lg">
              Hãy nhìn vào con số thực tế dưới đây để thấy việc ghép hóa đơn thông minh giúp bạn giữ lại hàng triệu đồng mỗi năm như thế nào:
            </p>

            {/* Split Comparison Cards box */}
            <div className="space-y-4">
              
              {/* Box 1: Paying Separately */}
              <div className="p-5 rounded-2xl bg-white border border-slate-200/60 shadow-sm text-left">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xs font-extrabold text-slate-500 uppercase tracking-widest">DÙNG THUÊ BAO LẺ TẺ</span>
                  <span className="text-sm font-bold text-red-500 font-mono">520.000đ/tháng</span>
                </div>
                <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs text-slate-500 font-semibold font-serif">
                  <div className="flex items-center gap-1.5 grayscale opacity-70">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-400"></span>
                    Mạng Internet: 220k
                  </div>
                  <div className="flex items-center gap-1.5 grayscale opacity-70">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-400"></span>
                    Sim di động 80GB: 150k
                  </div>
                  <div className="flex items-center gap-1.5 grayscale opacity-70">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-400"></span>
                    Gói thoại tẹt ga: 100k
                  </div>
                  <div className="flex items-center gap-1.5 grayscale opacity-70">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-400"></span>
                    Truyền hình TV: 50k
                  </div>
                </div>
              </div>

              {/* Arrow conversion badge */}
              <div className="flex justify-center">
                <div className="bg-orange-100 text-brand-orange w-10 h-10 rounded-full flex items-center justify-center shadow">
                  <TrendingDown className="w-5 h-5 animate-bounce stroke-[3]" />
                </div>
              </div>

              {/* Box 2: Integrated VNPT Combo */}
              <div className="p-6 rounded-3xl bg-blue-50 border-2 border-brand-blue shadow-md text-left relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-brand-orange text-white text-[9px] font-black uppercase tracking-wider px-3.5 py-1 rounded-bl-xl">
                  TIẾT KIỆM 54%
                </div>
                
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <span className="text-xs font-black text-brand-blue uppercase tracking-widest block">GÓI HỢP NHẤT VNPT</span>
                    <span className="text-xl font-black text-slate-900 tracking-tight mt-1 inline-block">COMBO HOME SÀNH</span>
                  </div>
                  <span className="text-2xl font-black text-brand-blue font-mono">239.000đ<span className="text-xs text-slate-400 font-medium font-sans">/tháng</span></span>
                </div>

                <div className="grid gap-2 text-xs sm:text-sm text-slate-800 font-bold border-t border-blue-200/40 pt-4">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>WiFi Cáp quang siêu tốc 250 Mbps cực mịn</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Tặng SIM Vinaphone - 4GB/Ngày (80GB/Tháng) lướt mạng thả ga</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Miễn phí 1.500 Phút gọi nội mạng & 50 Phút gọi ngoại mạng</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Savings Calculator widgets */}
          <div className="lg:col-span-6 bg-white p-6 sm:p-10 rounded-3xl border border-slate-100 shadow-xl shadow-slate-100 relative">
            <h4 className="text-lg font-extrabold text-slate-900 mb-6 flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-orange-100 text-brand-orange"><Sparkles className="w-4 h-4 fill-brand-orange" /></span>
              Máy Tính Tiết Kiệm Gia Đình Bạn:
            </h4>

            {/* Slider Switcher month budget */}
            <div className="space-y-4">
              <div className="text-xs text-slate-500 font-bold text-left block">
                CHỌN CHU KỲ KHUYẾN MÃI THAM GIA TRẢ TRƯỚC:
              </div>
              <div className="grid grid-cols-2 gap-3 p-1 bg-slate-50 border border-slate-100 rounded-xl">
                <button
                  type="button"
                  onClick={() => setSelectedMonths(6)}
                  className={`py-3.5 px-3 rounded-lg text-xs sm:text-sm font-extrabold transition-all cursor-pointer ${
                    selectedMonths === 6
                      ? "bg-brand-blue text-white shadow-md shadow-blue-200"
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  6 THÁNG (+ Tặng 1T cước)
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedMonths(12)}
                  className={`py-3.5 px-3 rounded-lg text-xs sm:text-sm font-extrabold transition-all cursor-pointer ${
                    selectedMonths === 12
                      ? "bg-brand-blue text-white shadow-md shadow-blue-200"
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  12 THÁNG (+ Tặng 2T cước)
                </button>
              </div>

              {/* Dynamic computed savings breakdown */}
              <div className="bg-slate-50/50 p-6 rounded-2xl border border-slate-100 space-y-4 text-left">
                <div className="flex justify-between items-baseline py-1 border-b border-gray-100">
                  <span className="text-xs sm:text-sm text-slate-500 font-bold">Số tháng được xài thực tế:</span>
                  <span className="text-sm font-extrabold text-slate-800 font-mono">
                    {selectedMonths === 6 ? "7 Tháng (Trả 6T tặng 1T)" : "14 Tháng (Trả 12T tặng 2T)"}
                  </span>
                </div>

                <div className="flex justify-between items-baseline py-1 border-b border-gray-100">
                  <span className="text-xs sm:text-sm text-slate-500 font-bold">Cước tiết kiệm mỗi tháng:</span>
                  <span className="text-sm font-extrabold text-emerald-600 font-mono">
                    {monthlySavings.toLocaleString("vi-VN")}đ
                  </span>
                </div>

                <div className="flex justify-between items-baseline py-1 pt-2">
                  <span className="text-sm sm:text-base text-slate-800 font-extrabold">Tổng dư nợ tiết kiệm được:</span>
                  <span className="text-xl sm:text-2xl font-black text-brand-orange font-mono">
                    {totalSavings.toLocaleString("vi-VN")}đ
                  </span>
                </div>

                <p className="text-[10px] text-slate-400 font-semibold leading-tight mt-2 text-center">
                  * Số tiền tiết kiệm dư dính ra được tương đương với chi phí tiền điện nước của cả gia đình suốt 4 tháng!
                </p>
              </div>

              {/* Call to action trigger */}
              <div className="pt-2">
                <button
                  onClick={handleSelectCombo}
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 px-6 rounded-2xl text-sm transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-slate-200 cursor-pointer"
                >
                  Lắp Combo Home Sành Tiết Kiệm Ngay
                  <ArrowRight className="w-4 h-4 text-brand-orange stroke-[3]" />
                </button>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
