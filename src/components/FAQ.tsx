import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { HelpCircle, ChevronDown, ChevronUp } from "lucide-react";
import { FAQS } from "../data";

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const toggleIndex = (idx: number) => {
    setActiveIndex(activeIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-16 sm:py-24 bg-white relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative">
        
        {/* Section title */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-brand-blue text-xs font-bold tracking-widest uppercase bg-blue-100 px-3 py-1 rounded-full">
            HỎI ĐÁP THỰC TẾ (FAQ)
          </span>
          <h2 className="text-3xl font-extrabold text-slate-950 tracking-tight leading-tight">
            Có Thể Bạn Đang Quan Tâm Hỏi Đáp?
          </h2>
          <p className="text-slate-600 text-sm sm:text-base font-medium">
            Mọi thắc mắc của khách hàng về hồ sơ, thủ tục, chế độ bảo hành thiết bị quang sẽ được nhân viên tư vấn VNPT giải đáp cụ thể bên dưới.
          </p>
        </div>

        {/* Collapsible details body block list */}
        <div className="space-y-4 text-left">
          {FAQS.map((faq, idx) => {
            const isOpen = activeIndex === idx;

            return (
              <div
                key={faq.id}
                className={`border-b border-slate-100 rounded-2xl transition-all duration-300 ${
                  isOpen 
                    ? "bg-blue-50/20 border-blue-100 p-5 shadow-sm" 
                    : "p-4 hover:bg-slate-50/60"
                }`}
              >
                <button
                  onClick={() => toggleIndex(idx)}
                  className="w-full flex justify-between items-center text-left py-2 focus:outline-none group cursor-pointer"
                >
                  <div className="flex items-center gap-3.5 pr-4">
                    <HelpCircle className={`w-5 h-5 shrink-0 ${isOpen ? "text-brand-blue" : "text-slate-400 group-hover:text-brand-blue"}`} />
                    <span className="text-stone-900 font-extrabold text-sm sm:text-base leading-snug">
                      {faq.question}
                    </span>
                  </div>
                  <div className="text-slate-500">
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 text-brand-orange shrink-0 stroke-[2.5]" />
                    ) : (
                      <ChevronDown className="w-5 h-5 shrink-0" />
                    )}
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-semibold pt-3 pl-8">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Action footnote button */}
        <div className="mt-12 text-center bg-orange-50/40 border border-orange-100 rounded-2xl p-5 max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left font-semibold text-xs text-slate-600">
            💡 Bạn có thắc mắc kỹ thuật phức tạp hoặc cần làm hợp đồng đặc thù cho doanh nghiệp?
          </div>
          <a
            href="tel:0944116667"
            className="text-brand-orange hover:text-brand-orange-hover font-extrabold text-sm flex items-center gap-1 shrink-0 hover:underline"
          >
            Liên Hệ 0944116667 →
          </a>
        </div>

      </div>
    </section>
  );
}
