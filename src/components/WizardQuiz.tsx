import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Zap, HelpCircle, ChevronRight, CheckCircle2, RefreshCw, Sparkles, Check } from "lucide-react";
import { PACKAGES, VNPTActionPackage } from "../data";

interface WizardQuizProps {
  onSelectPackage: (packageName: string) => void;
}

export default function WizardQuiz({ onSelectPackage }: WizardQuizProps) {
  const [step, setStep] = useState(1);
  const [userCount, setUserCount] = useState<string>("");
  const [primeNeed, setPrimeNeed] = useState<string>("");
  const [houseType, setHouseType] = useState<string>("");
  const [recommended, setRecommended] = useState<VNPTActionPackage | null>(null);

  const calculateRecommendation = () => {
    // Basic logic matching user options to best pack
    let selectedId = "home-net-2"; // default

    if (primeNeed === "vina-sim") {
      selectedId = "combo-sanh";
    } else if (primeNeed === "tv-movie") {
      selectedId = "combo-chat";
    } else if (primeNeed === "game-stream" || userCount === "10plus") {
      selectedId = "home-mesh-5";
    } else if (houseType === "multi-floor" || houseType === "villa") {
      selectedId = "home-mesh-2";
    } else if (userCount === "1-2") {
      selectedId = "home-net-1";
    } else {
      selectedId = "home-net-2";
    }

    const pkg = PACKAGES.find((p) => p.id === selectedId) || PACKAGES[0];
    setRecommended(pkg);
    setStep(4);
  };

  const handleReset = () => {
    setStep(1);
    setUserCount("");
    setPrimeNeed("");
    setHouseType("");
    setRecommended(null);
  };

  const applyRecommendation = () => {
    if (recommended) {
      onSelectPackage(recommended.name);
      const element = document.getElementById("register-section");
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  const currentStepProgress = () => {
    return (step / 3) * 100;
  };

  return (
    <section id="quiz" className="py-16 bg-gradient-to-r from-blue-900 via-[#0a3a75] to-brand-blue text-white relative overflow-hidden">
      {/* Dynamic tech decorative glowing lights */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-blue-500/25 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 right-10 w-80 h-80 bg-orange-400/15 rounded-full blur-3xl -z-10" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section header banner */}
        <div className="text-center mb-12 space-y-3">
          <span className="inline-flex items-center gap-1.5 bg-brand-orange text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full animate-bounce">
            <Sparkles className="w-3 h-3 text-white fill-white" />
            AI CHỦ ĐỘNG GỢI Ý
          </span>
          <h2 className="text-3xl font-extrabold tracking-tight">
            Tự Chọn Gói Mạng VNPT Trong 10 Giây
          </h2>
          <p className="text-blue-100 text-xs sm:text-sm font-semibold max-w-xl mx-auto">
            Không cần băn khoăn! Trả lời 03 câu hỏi nhanh dưới đây để thuật toán tự tính toán và lọc ra gói cước lý tưởng với giá tiết kiệm nhất cho bạn.
          </p>
        </div>

        {/* Quiz Steps Body Container */}
        <div className="bg-white text-slate-950 p-6 sm:p-10 rounded-3xl shadow-2xl relative border border-white/10">
          
          {/* Progress bar */}
          {step <= 3 && (
            <div className="mb-8 relative">
              <div className="flex justify-between text-xs text-gray-500 font-bold mb-2">
                <span>CÂU HỎI {step} TRÊN 3</span>
                <span>{Math.round(currentStepProgress())}% Hoàn thành</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <motion.div 
                  className="bg-brand-orange h-full rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${currentStepProgress()}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>
          )}

          <AnimatePresence mode="wait">
            {/* Step 1: User Count */}
            {step === 1 && (
              <motion.div
                key="step-1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
                className="space-y-6 text-left"
              >
                <h3 className="text-slate-900 font-extrabold text-lg sm:text-xl flex items-center gap-2 leading-tight">
                  <span className="w-7 h-7 rounded-lg bg-blue-100 text-brand-blue font-bold flex items-center justify-center text-sm">1</span>
                  Số lượng người sử dụng mạng Internet đồng thời là bao nhiêu?
                </h3>

                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    { val: "1-2", label: "Cá nhân / Phòng trọ (1 - 2 người)", desc: "Mục đích sử dụng ít thiết bị kết nối" },
                    { val: "3-5", label: "Hộ gia đình nhỏ (3 - 5 người)", desc: "Nhu cầu vừa lướt web, học tập, xem TV" },
                    { val: "6-10", label: "Gia đình lớn / Quán cafe vừa (6 - 10 người)", desc: "Cần tốc độ phát khỏe phục vụ nhiều máy" },
                    { val: "10plus", label: "Hộ kinh doanh / Streamer VIP (Trên 10 người)", desc: "Cần băng thông cực lớn và ping thấp" }
                  ].map((item) => (
                    <button
                      key={item.val}
                      onClick={() => {
                        setUserCount(item.val);
                        setStep(2);
                      }}
                      className={`p-5 rounded-2xl border text-left transition-all duration-200 ${
                        userCount === item.val
                          ? "border-brand-blue bg-blue-50/50 shadow-md ring-2 ring-blue-100"
                          : "border-slate-100 hover:border-slate-300 bg-white"
                      } cursor-pointer`}
                    >
                      <div className="font-bold text-slate-900 text-sm sm:text-base">{item.label}</div>
                      <div className="text-xs text-slate-500 font-medium mt-1">{item.desc}</div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 2: Main Usage */}
            {step === 2 && (
              <motion.div
                key="step-2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
                className="space-y-6 text-left"
              >
                <h3 className="text-slate-900 font-extrabold text-lg sm:text-xl flex items-center gap-2 leading-tight">
                  <span className="w-7 h-7 rounded-lg bg-blue-100 text-brand-blue font-bold flex items-center justify-center text-sm">2</span>
                  Nhu cầu giải trí và công việc chính của gia đình bạn là gì?
                </h3>

                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    { val: "basic", label: "Học tập, đọc báo, lướt web cơ bản", desc: "Không có nhu cầu giải trí nặng ký" },
                    { val: "tv-movie", label: "Xem phim 4K, Youtube mượt, Smart TV", desc: "Ưu tiên chất lượng truyền hình MyTV HD" },
                    { val: "game-stream", label: "Chơi game online (Liên Quân, CS:GO), Livestream", desc: "Ưu tiên ping cực thấp, chống nghẽn nghẽn phát sóng" },
                    { val: "vina-sim", label: "Ghép lắp mạng WiFi + Sim 4G/5G gọi nội mạng", desc: "Ưu tiên tiết kiệm chi phí điện thoại Vinaphone" }
                  ].map((item) => (
                    <button
                      key={item.val}
                      onClick={() => {
                        setPrimeNeed(item.val);
                        setStep(3);
                      }}
                      className={`p-5 rounded-2xl border text-left transition-all duration-200 ${
                        primeNeed === item.val
                          ? "border-brand-blue bg-blue-50/50 shadow-md ring-2 ring-blue-100"
                          : "border-slate-100 hover:border-slate-300 bg-white"
                      } cursor-pointer`}
                    >
                      <div className="font-bold text-slate-900 text-sm sm:text-base">{item.label}</div>
                      <div className="text-xs text-slate-500 font-medium mt-1">{item.desc}</div>
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => setStep(1)}
                  className="text-xs text-brand-blue hover:underline font-bold"
                >
                  ← Trở lại câu trước
                </button>
              </motion.div>
            )}

            {/* Step 3: House Layout */}
            {step === 3 && (
              <motion.div
                key="step-3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
                className="space-y-6 text-left"
              >
                <h3 className="text-slate-900 font-extrabold text-lg sm:text-xl flex items-center gap-2 leading-tight">
                  <span className="w-7 h-7 rounded-lg bg-blue-100 text-brand-blue font-bold flex items-center justify-center text-sm">3</span>
                  Diện tích hoặc kiến trúc ngôi nhà bạn muốn phủ sóng sóng WiFi?
                </h3>

                <div className="grid sm:grid-cols-3 gap-4">
                  {[
                    { val: "apartment", label: "Trọ / Căn hộ nhỏ", desc: "Không lầu, dưới 70m2" },
                    { val: "multi-floor", label: "Nhà phố nhiều lầu", desc: "Cần Mesh sóng xuyên tường" },
                    { val: "villa", label: "Chung cư rộng / Biệt thự", desc: "Rộng hơn 3 phòng ngủ" }
                  ].map((item) => (
                    <button
                      key={item.val}
                      onClick={() => {
                        setHouseType(item.val);
                        // Store the selected option and trigger calculation
                        const updatedHouse = item.val;
                        setHouseType(updatedHouse);
                        setTimeout(() => {
                          calculateRecommendation();
                        }, 100);
                      }}
                      className={`p-5 rounded-2xl border text-left transition-all duration-200 ${
                        houseType === item.val
                          ? "border-brand-blue bg-blue-50/50 shadow-md ring-2 ring-blue-100"
                          : "border-slate-100 hover:border-slate-300 bg-white"
                      } cursor-pointer`}
                    >
                      <div className="font-bold text-slate-900 text-sm sm:text-base">{item.label}</div>
                      <div className="text-xs text-slate-500 font-medium mt-1">{item.desc}</div>
                    </button>
                  ))}
                </div>

                <div className="flex justify-between items-center pt-2">
                  <button
                    onClick={() => setStep(2)}
                    className="text-xs text-brand-blue hover:underline font-bold"
                  >
                    ← Trở lại câu trước
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 4: Final Recommendation Display */}
            {step === 4 && recommended && (
              <motion.div
                key="step-4"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="text-center space-y-6"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mb-2">
                  <Check className="w-8 h-8 stroke-[3]" />
                </div>

                <div className="space-y-2">
                  <span className="text-xs text-brand-orange font-bold uppercase tracking-widest block">
                    ĐÃ TÌM THẤY GÓI CƯỚC LÝ TƯỞNG NHẤT CHO BẠN!
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                    {recommended.name}
                  </h3>
                </div>

                {/* Recommendation highlight card */}
                <div className="bg-slate-50 p-6 rounded-2xl text-left border border-slate-100 max-w-xl mx-auto space-y-4 shadow-inner">
                  <div className="flex justify-between items-baseline border-b border-gray-200/60 pb-3">
                    <span className="text-sm font-semibold text-slate-500">Tốc độ băng thông:</span>
                    <span className="text-xl font-extrabold text-slate-800 font-mono">
                      {recommended.speed} {recommended.speedUnit}
                    </span>
                  </div>

                  <div className="flex justify-between items-baseline border-b border-gray-200/60 pb-3">
                    <span className="text-sm font-semibold text-slate-500">Giá thành ưu đãi:</span>
                    <span className="text-xl font-extrabold text-brand-blue font-mono">
                      {recommended.promoPrice 
                        ? recommended.promoPrice.toLocaleString("vi-VN") 
                        : recommended.price.toLocaleString("vi-VN")}đ<span className="text-xs text-gray-400">/tháng</span>
                    </span>
                  </div>

                  <div className="space-y-2 pt-2">
                    <span className="text-xs text-slate-400 font-bold tracking-wider block">ƯU ĐIỂM CỦA GÓI:</span>
                    <ul className="grid gap-2 text-xs sm:text-sm text-slate-700 font-semibold">
                      {recommended.features.slice(0, 4).map((feat, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {recommended.meshIncluded > 0 && (
                    <div className="bg-blue-100/50 p-3 rounded-xl text-xs font-bold text-brand-blue border border-blue-200/40 text-center">
                      ⚡ Gói cước được tích hợp thiết bị WiFi Mesh miễn phí để mở rộng sóng!
                    </div>
                  )}
                </div>

                {/* Group conversion controls */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-lg mx-auto">
                  <button
                    onClick={applyRecommendation}
                    className="w-full sm:flex-1 bg-gradient-to-r from-brand-orange to-orange-600 hover:from-brand-orange-hover hover:to-orange-700 text-white font-black py-4 px-6 rounded-2xl text-sm transition-all duration-200 shadow-xl shadow-orange-100 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    Áp Dụng & Điền Form Đăng Ký
                  </button>

                  <button
                    onClick={handleReset}
                    className="w-full sm:w-auto bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-4 px-6 rounded-2xl text-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <RefreshCw className="w-4 h-4" />
                    Thử Lại Trắc Nghiệm
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>

      </div>
    </section>
  );
}
