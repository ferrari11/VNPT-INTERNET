import { motion } from "motion/react";
import { Star, MessageSquareDot, Quote } from "lucide-react";
import { TESTIMONIALS } from "../data";

export default function Reviews() {
  return (
    <section className="py-16 sm:py-24 bg-slate-50 relative overflow-hidden">
      {/* Light decor gradients */}
      <div className="absolute top-1/2 left-10 w-64 h-64 bg-slate-200/50 rounded-full blur-2xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-brand-blue text-xs font-bold tracking-widest uppercase bg-blue-100 px-3 py-1 rounded-full">
            Ý KIẾN KHÁCH HÀNG THỰC TẾ
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight leading-tight animate-fade-in">
            Nhận Xét Từ Người Dùng Mạng VNPT
          </h2>
          <p className="text-slate-600 text-sm sm:text-base font-medium">
            Sự đánh giá công tâm từ những khách hàng thực tế - hộ gia đình, sinh viên, game thủ và chủ hộ kinh doanh livestream là câu trả lời xác thực nhất về sự uy tín của VNPT.
          </p>
        </div>

        {/* Horizontal Reviews list grid */}
        <div className="grid md:grid-cols-3 gap-8 text-left items-stretch">
          {TESTIMONIALS.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white p-8 rounded-3xl border border-slate-200/60 shadow-md flex flex-col justify-between relative overflow-hidden group"
            >
              {/* Giant abstract watermarked Quote symbol */}
              <Quote className="absolute right-6 top-6 w-16 h-16 text-slate-100 group-hover:text-blue-50/70 transition-colors pointer-events-none -z-10" />

              <div className="space-y-4">
                {/* Micro badge indicator */}
                <span className="inline-block bg-blue-50 text-brand-blue border border-blue-100 text-[10px] font-bold px-3 py-1 rounded-full">
                  🏷️ {item.tag}
                </span>

                {/* Rating Stars */}
                <div className="flex gap-1">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>

                {/* Comment quote */}
                <p className="text-slate-600 text-xs sm:text-sm font-semibold italic leading-relaxed">
                  "{item.comment}"
                </p>
              </div>

              {/* User Avatar details */}
              <div className="flex items-center gap-4 border-t border-slate-100 pt-6 mt-6">
                <img
                  src={item.avatar}
                  alt={item.name}
                  referrerPolicy="no-referrer"
                  className="w-12 h-12 rounded-full border-2 border-slate-100 object-cover"
                />
                <div className="text-left leading-none">
                  <h4 className="font-extrabold text-slate-900 text-sm sm:text-base leading-tight">
                    {item.name}
                  </h4>
                  <span className="text-[11px] text-gray-500 font-medium">
                    {item.role}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Global social rating footer indicator */}
        <div className="mt-12 bg-white rounded-2xl py-5 px-6 border border-slate-100 shadow-sm max-w-xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-brand-blue flex items-center justify-center">
              <MessageSquareDot className="w-6 h-6" />
            </div>
            <div className="text-left">
              <span className="text-sm font-black text-slate-900 block leading-tight">Được đánh giá cực kỳ tốt</span>
              <span className="text-xs text-slate-400 font-medium font-mono">Đạt 4.9 / 5.0 điểm dựa trên 12.500+ bình chọn</span>
            </div>
          </div>

          <div className="flex justify-center -space-x-2 overflow-hidden">
            {[
              "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=80",
              "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=80",
              "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=80",
              "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=80"
            ].map((src, idx) => (
              <img
                key={idx}
                className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover"
                src={src}
                alt="Customer avt"
                referrerPolicy="no-referrer"
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
