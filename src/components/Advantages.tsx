import { motion } from "motion/react";
import { Gauge, Radio, Clock, Gift, Headset, ShieldAlert } from "lucide-react";

export default function Advantages() {
  const list = [
    {
      icon: <Gauge className="w-8 h-8 text-blue-600" />,
      title: "Băng thông cực đỉnh 1Gbps",
      desc: "Hạ tầng cáp quang AON/GPON tiên tiến nhất Việt Nam, suy hao cực thấp, chơi game hay livestream bán hàng đạt tốc độ siêu tốc mượt mà không lo giật lag.",
      bg: "from-blue-50 to-blue-100/50"
    },
    {
      icon: <Radio className="w-8 h-8 text-orange-600" />,
      title: "Công nghệ Mesh WiFi xuyên tường",
      desc: "Trang bị thêm các bộ phát phụ tạo mạng lưới phủ sóng liền mạch. Triệt tiêu hoàn toàn góc chết WiFi trong phòng ngủ, nhà cao tầng hay chung cư rộng lớn.",
      bg: "from-orange-50 to-orange-100/50"
    },
    {
      icon: <Clock className="w-8 h-8 text-emerald-600" />,
      title: "Lắp đặt hoả tốc chuẩn 24h",
      desc: "Thời gian đăng ký điện tử siêu tốc chỉ 5 phút. Đội ngũ kỹ thuật tận tâm túc trực khảo sát kéo đường truyền cáp quang và phục vụ bàn giao ngay trong ngày.",
      bg: "from-emerald-50 to-emerald-100/50"
    },
    {
      icon: <Gift className="w-8 h-8 text-purple-600" />,
      title: "Tặng thêm đến 2 tháng cước sử dụng",
      desc: "Khuyến mãi cực hời duy nhất hôm nay: Đóng trước 6 tháng tặng thêm 1 tháng, đóng trước 12 tháng tặng ngay 2 tháng cước di chuyển, miễn phí lắp đặt 100%.",
      bg: "from-purple-50 to-purple-100/50"
    },
    {
      icon: <Headset className="w-8 h-8 text-pink-600" />,
      title: "Tổng đài hỗ trợ sự cố 24/7",
      desc: "Khi gặp bất kỳ thắc mắc kỹ thuật nào, gọi ngay nhân viên kỹ thuật để được hỗ trợ kịp thời. Chuyên viên VNPT cam kết có mặt bảo trì xử lý tại chỗ trong vòng 2 - 4 tiếng.",
      bg: "from-pink-50 to-pink-100/50"
    },
    {
      icon: <ShieldAlert className="w-8 h-8 text-amber-600" />,
      title: "Dùng thử miễn phí, an tâm tuyệt đối",
      desc: "Cam kết chất lượng đường truyền đúng băng thông cam kết. Miễn phí nâng cấp hoàn toàn thiết bị phát modem kép 2 băng tần (2.4GHz & 5GHz) đời mới nhất.",
      bg: "from-amber-50 to-amber-100/50"
    }
  ];

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section id="advantages" className="py-16 sm:py-24 bg-slate-50 relative overflow-hidden">
      {/* Decorative accent grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-brand-blue text-xs font-bold tracking-widest uppercase bg-blue-100 px-3 py-1 rounded-full">
            TẠI SAO CHỌN VNPT TELECOM?
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight leading-tight">
            Đáp Ứng Hoàn Hảo Mọi Tiêu Chuẩn <br className="hidden sm:inline" />
            Nhà Mạng Viễn Thông Hiện Đại
          </h2>
          <p className="text-slate-600 text-sm sm:text-base font-medium">
            Chúng tôi tự hào là đơn vị viễn thông hàng đầu Việt Nam mang cước phí tối ưu và chất lượng đường truyền cáp quang cáp quang chuẩn quốc tế đến gia đình bạn.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {list.map((adv, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              whileHover={{ y: -6, boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.05), 0 8px 10px -6px rgb(0 0 0 / 0.05)" }}
              className={`bg-white p-8 rounded-3xl border border-slate-100 hover:border-slate-200/80 transition-all duration-300 flex flex-col justify-between text-left relative overflow-hidden`}
            >
              {/* Corner decorative light gradients */}
              <div className={`absolute top-0 left-0 w-24 h-24 bg-gradient-to-br ${adv.bg} opacity-50 blur-xl -z-10`} />

              <div className="space-y-4 mb-4">
                <div className="w-14 h-14 rounded-2xl bg-white shadow-md shadow-slate-100 border border-slate-100 flex items-center justify-center">
                  {adv.icon}
                </div>
                <h3 className="text-slate-900 font-extrabold text-lg tracking-tight">
                  {adv.title}
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-semibold">
                  {adv.desc}
                </p>
              </div>

              <div className="w-8 h-1 bg-gradient-to-r from-brand-blue to-blue-300 rounded-full" />
            </motion.div>
          ))}
        </div>

        {/* Action Suggestion Line */}
        <div className="mt-12 text-center">
          <p className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-slate-500 font-semibold bg-white px-5 py-2.5 rounded-full border border-slate-100 shadow-sm leading-none">
            🚀 Hệ thống hạ tầng đã hoàn thiện phủ sóng sóng cáp quang 100% tất cả các phường xã tại Hồ Chí Minh.
          </p>
        </div>

      </div>
    </section>
  );
}
