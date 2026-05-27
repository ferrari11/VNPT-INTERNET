export interface VNPTConfigGroup {
  id: string;
  name: string;
  badge: string;
  description: string;
}

export interface VNPTActionPackage {
  id: string;
  name: string;
  speed: string;
  price: number;
  promoPrice?: number;
  speedUnit: string;
  features: string[];
  category: "personal" | "family" | "combo" | "business";
  isPopular?: boolean;
  meshIncluded: number; // 0 = no mesh, 1, 2 = number of meshes
  bonusInfo?: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  avatar: string;
  comment: string;
  rating: number;
  tag: string;
}

export const CATEGORIES: VNPTConfigGroup[] = [
  {
    id: "personal",
    name: "Cá Nhân & Sinh Viên",
    badge: "Giá Cực Rẻ",
    description: "Tối ưu hóa chi phí cho cá nhân sử dụng các dịch vụ cơ bản, học tập"
  },
  {
    id: "family",
    name: "Hộ Gia Đình",
    badge: "Bán Chạy Nhất",
    description: "Băng thông siêu khỏe cùng Mesh WiFi phủ sóng rộng khắp ngóc ngách"
  },
  {
    id: "combo",
    name: "Combo Internet + Di Động Vina",
    badge: "Siêu Tiết Kiệm 50%",
    description: "Internet tẹt ga ghép SIM tặng 80GB Data di động - Trọn gói giải trí"
  },
  {
    id: "business",
    name: "Doanh Nghiệp & Chủ Shop",
    badge: "Cam Kết Băng Thông Quốc Tế",
    description: "IP tĩnh băng thông bảo mật phục vụ buôn bán online, livestream ổn định"
  }
];

export const PACKAGES: VNPTActionPackage[] = [
  // Cá nhân & Sinh viên
  {
    id: "home-net-1",
    name: "HOME 1",
    speed: "300",
    speedUnit: "Mbps",
    price: 190000,
    promoPrice: 165000,
    features: [
      "Băng thông trong nước 300 Mbps",
      "Internet 300 Mbps. Hỗ trợ nâng cấp XGSPON",
      "Tích hợp bảo mật: GreenNet hoặc Family Safe",
      "Miễn phí lắp đặt khi đóng trước 6 tháng",
      "Trang bị miễn phí thiết bị ONT 2 băng tần trong suốt thời gian sử dụng",
      "Tải tài liệu, làm bài tập zoom, học tập ổn định",
      "Khuyến mãi: Trả trước 6T tặng 1T, 12T tặng 2T"
    ],
    category: "personal",
    meshIncluded: 0,
    bonusInfo: "Tặng 1-2 tháng sử dụng"
  },
  {
    id: "home-net-2-p",
    name: "HOME 2",
    speed: "500",
    speedUnit: "Mbps",
    price: 240000,
    promoPrice: 206000,
    features: [
      "Băng thông trong nước 500 Mbps",
      "Modem thế hệ mới phát sóng chịu tải tốt",
      "Internet 500 Mbps. Hỗ trợ nâng cấp XGSPON",
      "Xem phim HD, lướt TikTok mượt mà không delay",
      "Hỗ trợ khắc phục nhanh kỹ thuật 24h",
      "Khuyến mãi: Trả trước 6T tặng 1T, 12T tặng 2T"
    ],
    category: "personal",
    meshIncluded: 0,
    bonusInfo: "Giá tiết kiệm cho sinh viên trọ"
  },
  
  // Hộ gia đình
  {
    id: "home-net-2",
    name: "HOME 1 (Mesh)",
    speed: "300",
    speedUnit: "Mbps",
    price: 220000,
    features: [
      "Băng thông cao 300 Mbps",
      "Trang bị 01 Modem WiFi 2 băng tần phát cực rộng",
      "Trang bị miễn phí 01 Wifi Mesh 6",
      "Đáp ứng tốt Smart TV, Camera, Thiết bị thông minh",
      "Tốc độ tải lên/tải xuống cân bằng (Symmetrical)",
      "Khuyến mãi: Trả trước 6T tặng 1T, 12T tặng 2T"
    ],
    category: "family",
    isPopular: false,
    meshIncluded: 0,
    bonusInfo: "Khách chung cư khuyên dùng"
  },
  {
    id: "home-mesh-2",
    name: "HOME 2 (MESH)",
    speed: "500",
    speedUnit: "Mbps",
    price: 270000,
    features: [
      "Tốc độ cao 500 Mbps. Hỗ trợ nâng cấp XGSPON",
      "TẶNG THÊM 01 THIẾT BỊ WIFI MESH phụ sóng xuyên tường",
      "Triệt tiêu hoàn toàn góc chết WiFi trong phòng ngủ",
      "Rất tốt cho nhà 2-3 lầu, chung cư rộng hoặc 3 phòng ngủ",
      "Tự động chuyển tiếp sóng liền mạch (Seamless Roaming)",
      "Ưu đãi đặc biệt: Trả trước 6T tặng 1T, 12T tặng 2T"
    ],
    category: "family",
    isPopular: true,
    meshIncluded: 1,
    bonusInfo: "Mạng bao phủ mọi góc nhà!"
  },
  {
    id: "home-mesh-5",
    name: "HOME 3 (MESH)",
    speed: "~1",
    speedUnit: "Gbps",
    price: 310000,
    features: [
      "Internet ~1Gbps. Hỗ trợ nâng cấp XGSPON",
      "TẶNG THÊM 01 THIẾT BỊ WIFI MESH thế hệ mới",
      "Trang bị Modem chính chịu tải lên đến 30 thiết bị",
      "Dành cho game thủ leo rank ping siêu thấp (2 - 5ms)",
      "Livestream bán hàng, xem phim 4K không trễ",
      "Khuyến mãi: Trả trước 6T tặng 1T, 12T tặng 2T"
    ],
    category: "family",
    meshIncluded: 1,
    bonusInfo: "Sóng khoẻ cực đỉnh"
  },

  // Combo
  {
    id: "combo-sanh",
    name: "COMBO HOME SÀNH 2 (Internet + SIM Vina)",
    speed: "300",
    speedUnit: "Mbps",
    price: 249000,
    features: [
      "nternet 300 Mbps. Hỗ trợ nâng cấp XGSPON",
      "Ưu đãi di động: 3GB/ngày, 1500p nội mạng, 89p ngoại mạng",
      "Thoại nội nhóm: Miễn phí cước gọi di động giữa các thành viên trong nhóm",
      "Cam kết tiết kiệm lên đến 50% chi phí viễn thông gia đình"
    ],
    category: "combo",
    isPopular: true,
    meshIncluded: 0,
    bonusInfo: "Ghép lắp mạng & Sim Vina siêu tiết kiệm!"
  },
  {
    id: "combo-chat",
    name: "COMBO HOME SÀNH 4 (Internet + SIM Vina)",
    speed: "500",
    speedUnit: "Mbps",
    price: 359000,
    features: [
      "Internet 500 Mbps. Hỗ trợ nâng cấp XGSPON",
      "Miễn phí 01 Wifi Mesh 5/Mesh 6",
      "Ưu đãi di động: 3GB/ngày, 1500p nội mạng, 89p ngoại mạng.",
      "Xem mượt mà trực tiếp bóng đá, phim chiếu rạp, tin tức",
      "Khuyến mãi đặc quyền: Tặng thêm đến 2 tháng cước lắp mạng"
    ],
    category: "combo",
    meshIncluded: 0,
    bonusInfo: "Ghép lắp mạng & Sim Vina siêu tiết kiệm!"
  },
  {
    id: "combo-dinh",
    name: "COMBO HOME ĐỈNH",
    speed: "~1",
    speedUnit: "Gbps",
    price: 399000,
    features: [
      "Internet ~ 1Gbps. Hỗ trợ nâng cấp XGSPON",
      "Miễn phí 01 Wifi Mesh 5/Mesh 6",
      "Truyền hình MyTV (App) đặc sắc",
      "Ưu đãi di động: 2GB/ngày, 1000p nội mạng, 50p ngoại mạng.",
      "Khuyến mãi đặc quyền: Tặng thêm đến 2 tháng cước lắp mạng"
    ],
    category: "combo",
    meshIncluded: 0,
    bonusInfo: "Sóng khoẻ cực đỉnh!"
  },

  // Doanh nghiệp & Chủ shop
  {
    id: "bussiness-pro-1",
    name: "FiberXtra1",
    speed: "300",
    speedUnit: "Mbps",
    price: 245000,
    features: [
      "Tốc độ truy cập trong nước 300 Mbps",
      "Tốc độ quốc tế cam kết tối thiểu (Mbps)",
      "IP động",
      "Bàn giao hạ tầng lắp mạng hoả tốc trong vòng 12 tiếng"
    ],
    category: "business",
    meshIncluded: 0,
    bonusInfo: "Không cam kết băng thông quốc tế"
  },
  {
    id: "bussiness-pro-2",
    name: "FiberEco1",
    speed: "150",
    speedUnit: "Mbps",
    price: 358000,
    features: [
      "Tốc độ đặc quyền trong nước 150 Mbps",
      "Băng thông quốc tế tối thiểu 3 Mbps",
      "IP động",
      "Hỗ trợ giám sát kỹ thuật ưu tiên 24/7 từ chuyên viên VIP",
      "Bàn giao hạ tầng lắp mạng hoả tốc trong vòng 12 tiếng"
    ],
    category: "business",
    isPopular: true,
    meshIncluded: 0,
    bonusInfo: "Phục vụ văn phòng, livestream, quán cà phê"
  },
  {
    id: "bussiness-pro-4",
    name: "FiberEco4",
    speed: "400",
    speedUnit: "Mbps",
    price: 943000,
    features: [
      "Tốc độ đặc quyền trong nước 400 Mbps",
      "Băng thông quốc tế tối thiểu 8 Mbps",
      "Hỗ trợ 01 Wan tĩnh",
      "Hỗ trợ giám sát kỹ thuật ưu tiên 24/7 từ chuyên viên VIP",
      "Bàn giao hạ tầng lắp mạng hoả tốc trong vòng 12 tiếng"
    ],
    category: "business",
    isPopular: true,
    meshIncluded: 0,
    bonusInfo: "Phục vụ văn phòng, livestream, quán cà phê"
  },
   {
    id: "bussiness-pro-2",
    name: "Fiber5",
    speed: "150",
    speedUnit: "Mbps",
    price: 4714000,
    features: [
      "Tốc độ đặc quyền trong nước 500 Mbps",
      "Băng thông quốc tế tối thiểu 24 Mbps",
      "Hỗ trợ 01 Wan tĩnh + 01 Block 08 Lan Tĩnh",
      "Hỗ trợ giám sát kỹ thuật ưu tiên 24/7 từ chuyên viên VIP",
      "Bàn giao hạ tầng lắp mạng hoả tốc trong vòng 12 tiếng"
    ],
    category: "business",
    isPopular: true,
    meshIncluded: 0,
    bonusInfo: "Phục vụ văn phòng, Công ty"
  },
  {
    id: "bussiness-pro-2",
    name: "	FiberVip6",
    speed: "500",
    speedUnit: "Mbps",
    price: 11314000,
    features: [
      "Tốc độ đặc quyền trong nước 500 Mbps",
      "Băng thông quốc tế tối thiểu 45 Mbps",
      "Hỗ trợ 01 Wan tĩnh + 01 Block 08 Lan Tĩnh",
      "Hỗ trợ giám sát kỹ thuật ưu tiên 24/7 từ chuyên viên VIP",
      "Bàn giao hạ tầng lắp mạng hoả tốc trong vòng 12 tiếng"
    ],
    category: "business",
    isPopular: true,
    meshIncluded: 0,
    bonusInfo: "Phục vụ văn phòng, Công ty"
  },
  {
    id: "bussiness-pro-2",
    name: "	FiberVip9",
    speed: "2000",
    speedUnit: "Mbps",
    price: 51857000,
    features: [
      "Tốc độ đặc quyền trong nước 2000 Mbps",
      "Băng thông quốc tế tối thiểu 200 Mbps",
      "Hỗ trợ 01 Wan tĩnh + 01 Block 08 Lan Tĩnh",
      "Hỗ trợ giám sát kỹ thuật ưu tiên 24/7 từ chuyên viên VIP",
      "Bàn giao hạ tầng lắp mạng hoả tốc trong vòng 12 tiếng"
    ],
    category: "business",
    isPopular: true,
    meshIncluded: 0,
    bonusInfo: "Phục vụ văn phòng, Công ty"
  }
];

export const FAQS: FAQItem[] = [
  {
    id: "faq-1",
    question: "Thủ tục đăng ký lắp đặt cáp quang VNPT cần chuẩn bị những hồ sơ gì?",
    answer: "Rất đơn giản và nhanh chóng! Đối với khách hàng cá nhân hoặc hộ gia đình, quý khách chỉ cần chuẩn bị ảnh chụp 2 mặt Căn cước công dân (CCCD). Đối với khách hàng doanh nghiệp, chủ shop đăng ký, quý khách vui lòng chuẩn bị Giấy phép đăng ký kinh doanh và Căn cước công dân của người đại diện trước pháp luật. Quá trình làm hợp đồng điện tử tiện lợi 100% không cần tốn giấy tờ."
  },
  {
    id: "faq-2",
    question: "Thời gian khảo sát và lắp đặt mạng mạng VNPT trong bao lâu?",
    answer: "Đội ngũ kỹ thuật VNPT cam kết liên hệ lắp đặt HOẢ TỐC trong vòng 24 giờ kể từ khi quý khách hoàn tất đăng ký thông tin hợp đồng chuyển nhượng. Thông thường, tại địa bàn Hồ Chí Minh và các thành phố lớn, nếu quý khách đăng ký buổi sáng, kỹ thuật sẽ khảo sát kéo dây trực tiếp bàn giao ngay trong buổi chiều cùng ngày."
  },
  {
    id: "faq-3",
    question: "Có phải trả thêm bất kì khoản chi phí phát sinh nào khác khi lắp đặt mạng không?",
    answer: "Hoàn toàn KHÔNG! Khi quý khách lựa chọn tham gia chương trình trả trước từ 6 tháng hoặc 12 tháng, VNPT hỗ trợ hoàn toàn việc: Miễn phí phí kéo dây quang, miễn phí công thợ lắp đặt, tặng thiết bị Modem Wifi 2 băng tần chính hãng, tặng thêm thiết bị Mesh từ 1 - 2 cái tùy gói cước đăng ký. Cam kết không phát sinh bất kỳ nghìn đồng chi phí dịch vụ lắp đặt nào khác ngoài cước phí đóng gói cước."
  },
  {
    id: "faq-4",
    question: "Ưu thế lớn nhất của thiết bị WiFi Mesh kèm theo gói cước là gì?",
    answer: "Thiết bị WiFi Mesh là công nghệ phát sóng không dây thông minh mới nhất. Thay vì chỉ có 1 modem phát mạng ở phòng khách dẫn tới phòng ngủ bị sóng yếu, thiết bị Mesh bổ sung sẽ nhận mạng từ modem chính và tái phát sóng cực khỏe xuyên các lớp tường vách ngăn. Chúng kết hợp với nhau thành 1 mạng duy nhất, tự chuyển mạch khi bạn di chuyển không hề mất kết nối hay lag (Seamless Roaming, rất thích hợp nhà phố nhiều lầu, chung cư rộng)."
  },
  {
    id: "faq-5",
    question: "Dịch vụ sau khi lắp đặt và bảo trì kỹ thuật hỗ trợ thế nào?",
    answer: "VNPT cam kết đồng hành trọn đời dịch vụ mạng. Trong suốt quá trình sử dụng mạng, thiết bị modem, thiết bị phát sẽ được bảo hành đổi mới hoàn toàn nếu có hư hỏng do hao mòn. Mọi sự cố kỹ thuật quang đều được đăng ký tổng đài 1800 1166 (miễn phí) và kỹ thuật túc trực 24/7 sẽ có mặt khắc phục ngay lập tức tại nhà trong từ 2 giờ đến 4 giờ làm việc."
  }
];

export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: "review-1",
    name: "Phạm Minh Tuấn",
    role: "Chủ cửa hàng quần áo livestream",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
    comment: "Nhà mình bán đồ livestream Tiktok tối nào cũng bật 3 máy cùng lúc, xài mấy mạng khác cứ đến 8h tối là mờ mờ với rớt mạng khách thoát liên tục. Đổi sang gói Home Mesh 5 của VNPT có 300Mbps căng đét, ổn định cực kỳ, doanh thu bán hàng tăng gấp rưỡi nhờ mạng mượt khít khìn khịt. Cực kì hài lòng!",
    rating: 5,
    tag: "Ổn Định Livestream"
  },
  {
    id: "review-2",
    name: "Lê Thị Thuỳ Dung",
    role: "Gia đình 5 người tại Quận 7, HCM",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200",
    comment: "Căn hộ của mình 3 phòng ngủ lận, lúc trước sóng wifi trong phòng ngủ cuối cùng yếu xìu không lướt facebook nổi. Kỹ thuật VNPT tư vấn gói Home Mesh 2+ lắp thêm 1 cục mesh phụ đặt giữa hành lang, giờ thì ngập tràn sóng wifi 5 vạch cả 3 phòng ngủ, tắm giặt nấu bếp đều thấy sóng căng đét. Đã thế trả 12 tháng tặng luôn 2 tháng nữa chứ!",
    rating: 5,
    tag: "Phủ Sóng Mesh Xuyên Tường"
  },
  {
    id: "review-3",
    name: "Nguyễn Hoài Nam",
    role: "Sinh viên ĐH Bách Khoa HCM",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200",
    comment: "Sinh viên trọ học như mình tiêu chí là rẻ nhưng phải khỏe để chơi Liên Quân và nộp bài. Mình đăng ký gói Home Net 1 tốc độ 150Mbps chỉ 165k/tháng. Mình đóng trước 6 tháng tính ra mỗi tháng rẻ hơn ly trà sữa mà mạng thì tuyệt vời, download tài liệu đồ án nhanh chóng mặt, leo rank ping xanh lẹt chỉ 12-15ms sướng run người.",
    rating: 5,
    tag: "Giá Rẻ Sóng Khỏe"
  }
];
