import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Check, Flame, HelpCircle, ShieldCheck, Tag, Wifi } from "lucide-react";
import { CATEGORIES, PACKAGES, VNPTActionPackage } from "../data";

interface TariffGridProps {
  onSelectPackage: (packageName: string) => void;
  selectedPackage: string;
}

export default function TariffGrid({ onSelectPackage, selectedPackage }: TariffGridProps) {
  const [activeTab, setActiveTab] = useState<"personal" | "family" | "combo" | "business">("family");

  const filteredPackages = PACKAGES.filter((p) => p.category === activeTab);

  const handleSelect = (pkgName: string) => {
    onSelectPackage(pkgName);
    const element = document.getElementById("register-section");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section id="pricing" className="py-16 sm:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section title */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-brand-blue text-xs font-bold tracking-widest uppercase bg-blue-100 px-3 py-1 rounded-full">
            BẢNG GIÁ ƯU ĐÃI NĂM 2026
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight leading-tight">
            Chọn Gói Cước Hoàn Hảo Cho Nhu Cầu Của Bạn
          </h2>
          <p className="text-slate-600 text-sm sm:text-base font-medium">
            Mức giá minh bạch công khai, cam kết không phát sinh phụ thu. Miễn phí nâng cấp hoàn toàn Modem WiFi Dual-Band thế hệ mới nhất cho tất cả gói cước ngày hôm nay.
          </p>
        </div>

        {/* Tab switcher buttons under category layout */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12 p-1.5 bg-slate-50 border border-slate-100/80 rounded-2xl max-w-lg sm:max-w-3xl mx-auto">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id as any)}
              className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer ${
                activeTab === cat.id
                  ? "bg-brand-blue text-white shadow-md shadow-blue-200"
                  : "text-slate-600 hover:text-brand-blue hover:bg-slate-100"
              }`}
            >
              <span>{cat.name}</span>
            </button>
          ))}
        </div>

        {/* Active category explanation banner */}
        <div className="max-w-2xl mx-auto text-center mb-10">
          <p className="text-slate-500 text-xs sm:text-sm font-semibold">
            🎯 <span className="text-slate-800 font-bold">{CATEGORIES.find(c => c.id === activeTab)?.name}:</span> {CATEGORIES.find(c => c.id === activeTab)?.description}
          </p>
        </div>

        {/* Tariff Comparison Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          <AnimatePresence mode="popLayout">
            {filteredPackages.map((pkg) => {
              const hasPromo = !!pkg.promoPrice;
              const formattedPrice = pkg.price.toLocaleString("vi-VN");
              const formattedPromo = pkg.promoPrice?.toLocaleString("vi-VN");
              const isSelected = selectedPackage === pkg.name;

              return (
                <motion.div
                  key={pkg.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.25 }}
                  className={`bg-white rounded-3xl p-8 text-left flex flex-col justify-between relative transition-all duration-300 ${
                    pkg.isPopular 
                      ? "border-2 border-brand-blue shadow-xl shadow-blue-50 bg-gradient-to-b from-blue-50/20 to-white" 
                      : "border border-slate-200/60 shadow-md hover:shadow-xl hover:border-slate-300"
                  } ${isSelected ? "ring-4 ring-orange-100 border-brand-orange" : ""}`}
                >
                  {/* Popular pulsating label badge */}
                  {pkg.isPopular && (
                    <div className="absolute top-0 right-8 transform -translate-y-1/2 bg-brand-orange text-white text-[10px] font-black tracking-widest uppercase px-3.5 py-1 rounded-full shadow flex items-center gap-1">
                      <Flame className="w-3.5 h-3.5 stroke-[2] fill-white animate-pulse" />
                      Khuyên Dùng
                    </div>
                  )}

                  <div className="space-y-6">
                    {/* Header Group info */}
                    <div className="space-y-2">
                      <div className="text-slate-500 font-bold text-xs uppercase tracking-wider block">GÓI TRUYỀN THÔNG</div>
                      <h3 className="text-xl font-black text-slate-900 tracking-tight leading-none">{pkg.name}</h3>
                      <span className="inline-block bg-slate-50 text-slate-500 font-mono font-bold text-[10px] px-2.5 py-0.5 rounded-full border border-slate-100">
                        {pkg.bonusInfo}
                      </span>
                    </div>

                    {/* Speed indicator block */}
                    <div className="flex items-center gap-3.5 bg-slate-50 p-4 rounded-2xl border border-slate-100/60 font-medium">
                      <div className="w-10 h-10 rounded-xl bg-orange-100 text-brand-orange flex items-center justify-center">
                        <Wifi className="w-5 h-5 stroke-[2.5]" />
                      </div>
                      <div className="text-left font-serif">
                        <div className="text-[10px] text-gray-500 font-bold leading-none">BĂNG THÔNG</div>
                        <div className="text-base sm:text-lg font-black text-slate-800 font-mono leading-none mt-1">
                          {pkg.speed} {pkg.speedUnit}
                        </div>
                      </div>
                    </div>

                    {/* Price display blocks */}
                    <div className="py-2">
                      {hasPromo ? (
                        <div className="space-y-1">
                          <div className="flex items-baseline gap-1.5">
                            <span className="text-3xl sm:text-4xl font-extrabold text-brand-blue font-mono">
                              {formattedPromo}đ
                            </span>
                            <span className="text-xs text-slate-400 font-medium select-none">/tháng</span>
                          </div>
                          <div className="text-xs text-slate-500 font-bold">
                            Giá gốc gác: <span className="line-through">{formattedPrice}đ</span> (Tiết kiệm {Math.round(((pkg.price - (pkg.promoPrice || 0)) / pkg.price) * 100)}%)
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-3xl sm:text-4xl font-extrabold text-brand-blue font-mono">
                            {formattedPrice}đ
                          </span>
                          <span className="text-xs text-slate-400 font-medium select-none">/tháng</span>
                        </div>
                      )}
                    </div>

                    {/* Features checklist list */}
                    <div className="space-y-3.5 border-t border-gray-100 pt-6">
                      <span className="text-xs text-slate-400 font-bold tracking-wider block">ƯU ĐÃI TÍCH HỢP:</span>
                      <ul className="grid gap-2.5 text-xs sm:text-sm text-slate-700 font-semibold leading-relaxed">
                        {pkg.features.map((feat, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <Check className="w-4 h-4 text-emerald-500 stroke-[3.5] shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Submission triggers buttons */}
                  <div className="mt-8 pt-4">
                    <button
                      onClick={() => handleSelect(pkg.name)}
                      className={`w-full py-4 px-6 rounded-2xl font-black text-sm text-center transition-all cursor-pointer ${
                        pkg.isPopular 
                          ? "bg-brand-orange text-white hover:bg-brand-orange-hover shadow-lg shadow-orange-100 hover:scale-[1.01]" 
                          : "bg-slate-50 text-brand-blue border border-blue-100 hover:bg-blue-50"
                      }`}
                    >
                      {isSelected ? "✓ Đã Chọn Đăng Ký Gói Này" : "Đăng Ký Tư Vấn Gói Này"}
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Global promotional guidelines for billing cycles */}
        <div className="mt-16 bg-blue-50/50 rounded-3xl p-6 sm:p-8 border border-blue-100 max-w-4xl mx-auto grid sm:grid-cols-3 gap-6 text-left relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-200/20 rounded-full blur-2xl" />
          
          <div className="space-y-1">
            <h4 className="text-brand-blue font-extrabold text-sm sm:text-base">🎁 CHƯƠNG TRÌNH TRẢ TRƯỚC 6 THÁNG</h4>
            <p className="text-xs text-slate-600 font-bold leading-relaxed">Miễn phí lắp đặt 100%. Tặng thêm 01 tháng cước thứ 7 (Tổng cộng xài 7 tháng).</p>
          </div>

          <div className="space-y-1 sm:border-l sm:border-slate-200 sm:pl-6">
            <h4 className="text-brand-blue font-extrabold text-sm sm:text-base">🎁 CHƯƠNG TRÌNH TRẢ TRƯỚC 12 THÁNG</h4>
            <p className="text-xs text-slate-600 font-bold leading-relaxed">Miễn phí lắp đặt 100%. Tặng thêm 02 tháng cước thứ 13, 14 (Tổng cộng xài 14 tháng).</p>
          </div>

          <div className="space-y-1 sm:border-l sm:border-slate-200 sm:pl-6">
            <h4 className="text-brand-orange font-extrabold text-sm sm:text-base">⚡ TẬM ĐẮP Modem 5G DUO</h4>
            <p className="text-xs text-slate-600 font-bold leading-relaxed">Bộ modem 2 băng tần kép chuyên dụng tăng 80% độ phủ phát sóng so với chuẩn cũ trước đây.</p>
          </div>
        </div>

      </div>
    </section>
  );
}
