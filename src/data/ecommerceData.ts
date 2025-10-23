// E-commerce data module for EISHRO platform
// بيانات المناطق والمدن
// citiesData: City and area data for delivery locations
export const citiesData = {
  tripoli: {
    name: "طرابلس",
    areas: [
      "طرابلس المركز",
      "المدينة القديمة",
      "السياحية",
      "حي الاندلس",
      "قرجي",
      "قرقارش",
      "غوط الشعال",
      "تاجوراء",
      "جنزور",
      "شارع النصر",
      "شارع الجمهورية",
      "جامع الصقع",
      "زاوية الدهماني",
      "الظهرة",
      "الفرناج",
      "زناته",
      "زناته القديمة",
      "الجرابة",
      "بن عاشور",
      "طريق الشط",
      "سوق الجمعة",
      "عرادة",
      "17 الطير",
      "الترسانة",
      "11 يونيو",
      "طريق 16",
      "السبعة",
      "المشتل",
      "عين زارة",
      "صلاح الدين",
      "حي دمشق",
      "بوسته",
      "سيدي المصري",
      "شارع المدار",
      "الحشان",
      "راس حسن",
      "المنشية",
      "طريق السكه",
      "جزيرة النبراس",
      "باب بن غشير",
      "الهضبة",
      "بوسليم",
      "طريق المطار",
      "الفلاح",
      "الدريبي",
      "حي الإسلامي",
      "غرغور",
      "حي الانتصار",
      "طريق الشوك",
      "مشروع الهضبة",
      "قصر بن غشير",
      "شارع عمر المختار",
      "شارع أول سبتمبر",
      "شارع هايتي",
      "شارع ميزران",
      "شارع الرشيد"
    ]
  },
  benghazi: {
    name: "بنغازي",
    areas: ["المنطقة الشرقية", "المنطقة الغربية", "وسط المدينة"]
  },
  misrata: {
    name: "مصراتة", 
    areas: ["وسط مصراتة", "المنطقة الصناعية", "الأحياء السكنية"]
  },
  zawiya: {
    name: "الزاوية",
    areas: ["وسط الزاوية", "الأحياء الجديدة", "المنطقة الساحلية"]
  }
};

// shippingData: Shipping costs and times for different regions
// بيانات الشحن والتوصيل
export const shippingData = {
  tripoli: {
    normal: { time: "24-96 ساعة", price: { min: 30, max: 45 } },
    express: { time: "9-12 ساعة", price: { min: 85, max: 120 } }
  },
  outside: {
    normal: { time: "24-96 ساعة", price: { min: 50, max: 85 } },
    express: { time: "9-12 ساعة", price: { min: 120, max: 185 } }
  }
};

// paymentMethods: Available payment methods and options
// طرق الدفع المتاحة
export const paymentMethods = {
  onDelivery: {
    name: "عند الاستلام",
    methods: [
      { name: "نقدي", icon: "/assets/payment/cash-on-delivery.png" },
      { name: "بطاقات ائتمانية", icon: "/assets/payment/debit.png" }
    ]
  },
  immediate: {
    name: "دفع فوري", 
    methods: [
      { name: "معاملات", icon: "/assets/payment/moamalat.png" },
      { name: "بطاقات ائتمانية", icon: "/assets/payment/debit.png" },
      { name: "يوسر", icon: "/assets/payment/youssr.png" },
      { name: "سداد", icon: "/assets/payment/sadad.png" },
      { name: "تداول", icon: "/assets/payment/tadawul.png" },
      { name: "موبي كاش", icon: "/assets/payment/mobicash.png" },
      { name: "1باي", icon: "/assets/payment/1Pay.png" },
      { name: "أنيس", icon: "/assets/payment/anis.png" },
      { name: "بكم", icon: "/assets/payment/Becom.png" },
      { name: "بلو لاين", icon: "/assets/payment/BlueLine.png" },
      { name: "نابفور", icon: "/assets/payment/nab4pay.png" },
      { name: "ادفع لي", icon: "/assets/payment/edfali.png" }
    ]
  }
};

// partnerCompanies: Partner companies for delivery and services
// الشركات الشريكة
export const partnerCompanies = {
  delivery: [
    "بريستو",
    "مندوب توصيل", 
    "فانيكس",
    "درب السيل",
    "أميال",
    "زام"
  ]
};

// partnersData: Partner data for display on the website (banks, payments, transport)
// شركاء النجاح - للعرض في الموقع
export const partnersData = {
  banks: [
    { name: 'مصرف المعاملات التجارية', logo: '/assets/partners/banks/moamalat.png' },
    { name: 'مصرف الأندلس', logo: '/assets/partners/banks/andalus.png' },
    { name: 'مصرف الوحدة', logo: '/assets/partners/banks/wahda.png' },
    { name: 'مصرف الإتحاد الأفريقي التجاري', logo: '/assets/partners/banks/ATIB.svg' },
    { name: 'مصرف نوران', logo: '/assets/partners/banks/nuran.png' },
    { name: 'مصرف أمان', logo: '/assets/partners/banks/aman-bank.png' },
    { name: 'مصرف شمال أفريقيا', logo: '/assets/partners/banks/north-africa.png' },
    { name: 'مصرف الجمهورية', logo: '/assets/partners/banks/jumhouria.png' },
    { name: 'مصرف يكن', logo: '/assets/partners/banks/yaken.png' },
    { name: 'المصرف التجاري الوطني', logo: '/assets/partners/banks/national-commercial-bank.png' },
    { name: 'مصرف الصحراء', logo: '/assets/partners/banks/sahara-bank.jpg' },
    { name: 'مصرف ليبيا الخليجي', logo: '/assets/partners/banks/libyan-golf.jpg' },
    { name: 'المصرف الليبي الإسلامي', logo: '/assets/partners/banks/Libyan-islamic.png' },
    { name: 'المصرف الوطني العربي', logo: '/assets/partners/banks/nab.png' },
    { name: 'مصرف جسر التجارة', logo: '/assets/partners/banks/jussor.png' },
    { name: 'مصرف يونايتد', logo: '/assets/partners/banks/united.jpg' },
    { name: 'مصرف التجارة', logo: '/assets/partners/banks/commerce-bank.png' }
  ],
  payment: [
    { name: 'معاملات', logo: '/assets/partners/payment/moamalat.png' },
    { name: 'بطاقات ائتمانية', logo: '/assets/partners/payment/debit.png' },
    { name: 'سداد', logo: '/assets/partners/payment/sadad.png' },
    { name: 'تداول', logo: '/assets/partners/payment/tadawul.png' },
    { name: 'موبي كاش', logo: '/assets/partners/payment/mobicash.png' },
    { name: '1باي', logo: '/assets/partners/payment/1Pay.png' },
    { name: 'أنيس', logo: '/assets/partners/payment/anis.png' },
    { name: 'بكم', logo: '/assets/partners/payment/Becom.png' },
    { name: 'بلو لاين', logo: '/assets/partners/payment/BlueLine.png' },
    { name: 'إدفعلي', logo: '/assets/partners/payment/edfali.png' },
    { name: 'إشرو', logo: '/assets/partners/payment/ishro.jpg' }
  ],
  transport: [
    { name: 'أميال', logo: '/assets/partners/transport/amyal.png' },
    { name: 'كاش', logo: '/assets/partners/transport/cash.png' },
    { name: 'درب السيل', logo: '/assets/partners/transport/darbsail.png' },
    { name: 'بريستو', logo: '/assets/partners/transport/presto.jpg' },
    { name: 'فانكس', logo: '/assets/partners/transport/vanex.png' },
    { name: 'زام', logo: '/assets/partners/transport/ZAM.png' }
  ]
};

// storesData: Store information and configurations
// بيانات المتاجر
export const storesData = [
  {
    id: 1,
    name: "نواعم",
    slug: "nawaem",
    description: "متجر الأزياء النسائية العصرية والعبايات الراقية",
    logo: "/assets/real-stores/6.webp",
    categories: ["فساتين", "عبايات", "ملابس يومية", "اكسسوارات"],
    url: "https://nawaem.ly/",
    endpoints: {
      products: "https://nawaem.ly/products/latest-products?cat=%D8%A7%D9%84%D9%83%D9%84",
      discounts: "https://nawaem.ly/products/discounts"
    },
    social: {
      facebook: "https://facebook.com/nawaem",
      instagram: "https://instagram.com/nawaem",
      website: "https://nawaem.ly/"
    },
    isActive: true
  },
  {
    id: 2,
    name: "شيرين",
    slug: "sheirine",
    description: "متجر شيرين للمجوهرات والإكسسوارات الفاخرة",
    logo: "/assets/real-stores/1.webp",
    categories: ["All", "Engagement Rings", "Jewelry Sets", "Bracelets", "Necklaces and Chains", "Earrings", "Rings", "Hair Jewelry", "Leggings", "Body Jewelry and Accessories"],
    url: "https://sheirine.ly/",
    endpoints: {
      products: "https://sheirine.ly/products?cat=%D8%A7%D9%84%D9%83%D9%84",
      discounts: "https://sheirine.ly/products/discounts"
    },
    social: {
      website: "https://sheirine.ly/"
    },
    isActive: true
  },
  {
    id: 3,
    name: "Pretty",
    slug: "pretty",
    description: "متجر الأزياء والإكسسوارات الأنيقة",
    logo: "/assets/real-stores/pretty/2.png",
    categories: ["ملابس نسائية", "فساتين", "إكسسوارات", "أحذية"],
    url: "https://pretty.ezone.ly/",
    endpoints: {
      products: "https://pretty.ezone.ly/products?cat=%D8%A7%D9%84%D9%83%D9%84",
      discounts: "https://pretty.ezone.ly/products/discounts"
    },
    social: {},
    isActive: true
  },
  {
    id: 4,
    name: "Delta Store",
    slug: "delta-store",
    description: "متجر الأزياء والملابس العصرية",
    logo: "/assets/brands/4.webp",
    categories: ["أزياء", "ملابس", "إكسسوارات"],
    url: "https://details.ly/",
    endpoints: {
      products: "https://details.ly/products?cat=%D8%A7%D9%84%D9%83%D9%84",
      discounts: "https://details.ly/products/discounts"
    },
    social: {},
    isActive: true
  },
  {
    id: 5,
    name: "Megna",
    slug: "magna-beauty",
    description: "متجر منتجات التجميل والعناية بالجمال",
    logo: "/assets/brands/6.webp", 
    categories: ["مكياج", "عناية بالبشرة", "منتجات تجميل"],
    url: "https://store.magna-beauty.com/",
    endpoints: {
      products: "https://store.magna-beauty.com/products?cat=%D8%A7%D9%84%D9%83%D9%84",
      discounts: "https://store.magna-beauty.com/products/discounts"
    },
    social: {},
    isActive: true
  },
  {
    id: 6,
    name: "SHL ستور",
    slug: "shl-store",
    description: "متجر الأزياء والملابس العصرية",
    logo: "/assets/stores/5.webp",
    categories: ["أزياء", "ملابس", "إكسسوارات"],
    url: "https://shlstore.eshro.ly/",
    endpoints: {
      products: "https://shlstore.eshro.ly/products/latest-products?cat=%D8%A7%D9%84%D9%83%D9%84"
    },
    social: {},
    isActive: true
  },
  {
    id: 6,
    name: "مكانك",
    slug: "mkanek",
    description: "متجر الأثاث وديكور المنزل",
    logo: "/assets/stores/6.webp",
    categories: ["أثاث", "ديكور", "أدوات منزلية"],
    url: "https://mkanek.ly/",
    endpoints: {
      products: "https://mkanek.ly/products?cat=%D8%A7%D9%84%D9%83%D9%84",
      discounts: "https://mkanek.ly/products/discounts"
    },
    social: {},
    isActive: true
  },
  {
    id: 7,
    name: "كومفي",
    slug: "comfy",
    description: "متجر الملابس المريحة والرياضية",
    logo: "/assets/stores/7.webp",
    categories: ["ملابس رياضية", "ملابس مريحة", "أحذية رياضية"],
    url: "https://comfy.ly/",
    endpoints: {
      products: "https://comfy.ly/products/latest-products?cat=%D8%A7%D9%84%D9%83%D9%84"
    },
    social: {},
    isActive: true
  },
  {
    id: 8,
    name: "مكنون",
    slug: "maknoon",
    description: "متجر الإكسسوارات والهدايا المميزة",
    logo: "/assets/stores/8.webp",
    categories: ["إكسسوارات", "هدايا", "مجوهرات"],
    url: "https://maknoon.ly/",
    endpoints: {
      products: "https://maknoon.ly/products?cat=%D8%A7%D9%84%D9%83%D9%84",
      discounts: "https://maknoon.ly/products/discounts"
    },
    social: {},
    isActive: true
  },
  {
    id: 9,
    name: "مايكرو تك",
    slug: "microtech",
    description: "متجر الإلكترونيات والتقنية الحديثة",
    logo: "/assets/stores/10.webp",
    categories: ["إلكترونيات", "حاسوب", "هواتف ذكية"],
    url: "https://microtech.eshro.ly/",
    endpoints: {
      products: "https://microtech.eshro.ly/products/latest-products?cat=%D8%A7%D9%84%D9%83%D9%84"
    },
    social: {},
    isActive: true
  },
  {
    id: 10,
    name: "تحفة",
    slug: "tohfa",
    description: "متجر التحف والهدايا التراثية",
    logo: "/assets/stores/11.webp",
    categories: ["تحف", "هدايا تراثية", "ديكور"],
    url: "https://tohfa.ly/",
    endpoints: {
      products: "https://tohfa.ly/products?cat=%D8%A7%D9%84%D9%83%D9%84",
      discounts: "https://tohfa.ly/products/discounts"
    },
    social: {},
    isActive: true
  },
  {
    id: 11,
    name: "برشت بلو",
    slug: "brushtblue",
    description: "متجر أدوات الرسم والفنون",
    logo: "/assets/stores/12.webp",
    categories: ["أدوات رسم", "فنون", "قرطاسية"],
    url: "https://brushtblue.ly/",
    endpoints: {
      products: "https://brushtblue.ly/products?cat=%D8%A7%D9%84%D9%83%D9%84",
      discounts: "https://brushtblue.ly/products/discounts"
    },
    social: {},
    isActive: true
  },
  {
    id: 12,
    name: "باجسي",
    slug: "bagsy",
    description: "متجر الحقائب والمحافظ",
    logo: "/assets/stores/13.webp",
    categories: ["حقائب", "محافظ", "إكسسوارات"],
    url: "https://bagsy.eshro.ly/",
    endpoints: {
      products: "https://bagsy.eshro.ly/products?cat=%D8%A7%D9%84%D9%83%D9%84"
    },
    social: {},
    isActive: true
  },
  {
    id: 13,
    name: "أونباسو",
    slug: "unpasso",
    description: "متجر الأحذية والصنادل",
    logo: "/assets/stores/14.webp",
    categories: ["أحذية", "صنادل", "أحذية رياضية"],
    url: "https://unpasso.ly/",
    endpoints: {
      products: "https://unpasso.ly/products/latest-products?cat=%D8%A7%D9%84%D9%83%D9%84"
    },
    social: {},
    isActive: true
  },
  {
    id: 14,
    name: "نايز كوزمتكس",
    slug: "nyscosmetics",
    description: "متجر مستحضرات التجميل العالمية",
    logo: "/assets/stores/15.webp",
    categories: ["مكياج", "عناية بالبشرة", "عطور"],
    url: "https://nyscosmetics.eshro.ly/",
    endpoints: {
      products: "https://nyscosmetics.eshro.ly/products?cat=%D8%A7%D9%84%D9%83%D9%84",
      discounts: "https://nyscosmetics.eshro.ly/products/discounts"
    },
    social: {},
    isActive: true
  },
  {
    id: 15,
    name: "لوتس تك",
    slug: "lotus-tec",
    description: "متجر التقنية والأجهزة الذكية",
    logo: "/assets/stores/16.webp",
    categories: ["إلكترونيات", "أجهزة ذكية", "تقنية"],
    url: "https://lotus_tec.eshro.ly/",
    endpoints: {
      products: "https://lotus_tec.eshro.ly/products/latest-products?cat=%D8%A7%D9%84%D9%83%D9%84"
    },
    social: {},
    isActive: true
  },
  {
    id: 16,
    name: "الوردة البيضاء",
    slug: "alwardaalbayda",
    description: "متجر العطور والورود الطبيعية",
    logo: "/assets/stores/17.webp",
    categories: ["عطور", "ورود", "زيوت طبيعية"],
    url: "https://alwardaalbayda.ly/",
    endpoints: {
      products: "https://alwardaalbayda.ly/products?cat=%D8%A7%D9%84%D9%83%D9%84",
      discounts: "https://alwardaalbayda.ly/products/discounts"
    },
    social: {},
    isActive: true
  },
  {
    id: 17,
    name: "الركن الليبي للساعات",
    slug: "tlcwatches",
    description: "متجر الساعات الفاخرة والإكسسوارات الرجالية",
    logo: "/assets/stores/18.webp",
    categories: ["ساعات", "إكسسوارات رجالية", "ساعات ذكية"],
    url: "https://tlcwatches.ly/",
    endpoints: {
      products: "https://tlcwatches.ly/products?cat=%D8%A7%D9%84%D9%83%D9%84",
      discounts: "https://tlcwatches.ly/products/discounts"
    },
    social: {},
    isActive: true
  },
  {
    id: 18,
    name: "إيلول",
    slug: "eylul",
    description: "متجر الأزياء التركية والملابس النسائية العصرية",
    logo: "/assets/stores/19.webp",
    categories: ["أزياء تركية", "ملابس نسائية", "أطقم عصرية"],
    url: "https://eylul.ly/",
    endpoints: {
      products: "https://eylul.ly/products?cat=%D8%A7%D9%84%D9%83%D9%84",
      discounts: "https://eylul.ly/products/discounts"
    },
    social: {},
    isActive: true
  },
  {
    id: 19,
    name: "كوزيت بوتيك",
    slug: "cozetboutique",
    description: "بوتيك الأزياء الراقية والإكسسوارات النسائية الفاخرة",
    logo: "/assets/stores/20.webp",
    categories: ["أزياء راقية", "إكسسوارات فاخرة", "حقائب مميزة"],
    url: "https://cozetboutique.ly/",
    endpoints: {
      products: "https://cozetboutique.ly/products/latest-products?cat=%D8%A7%D9%84%D9%83%D9%84"
    },
    social: {},
    isActive: true
  }
];

// sampleProducts: Sample product data for testing and display
// بيانات المنتجات التجريبية
export const sampleProducts = [
  {
    id: 1,
    storeId: 1,
    name: "فستان طويل أسود أنيق",
    description: "فستان طويل أنيق مناسب للمناسبات الرسمية والخروج، مصنوع من قماش عالي الجودة",
    price: 185,
    originalPrice: 200,
    images: [
      "/assets/products/dress-black-main.png",
      "/assets/products/dress-black-main.png",
      "/assets/products/dress-black-main.png"
    ],
    sizes: ["S", "M", "L", "XL"],
    availableSizes: ["S", "M", "L"], // XL غير متوفر
    colors: [
      { name: "أسود", value: "#000000" },
      { name: "أبيض", value: "#FFFFFF" },
      { name: "أخضر داكن", value: "#1F4E3D" }
    ],
    rating: 4.5,
    reviews: 12,
    category: "فساتين",
    inStock: true
  },
  {
    id: 2,
    storeId: 1, 
    name: "فستان طويل أزرق راقي",
    description: "فستان طويل راقي باللون الأزرق، مثالي للإطلالات العصرية والمناسبات",
    price: 195,
    originalPrice: 220,
    images: [
      "/assets/products/dress-blue-main.png",
      "/assets/products/dress-blue-main.png"
    ],
    sizes: ["S", "M", "L", "XL"],
    availableSizes: ["M", "L", "XL"],
    colors: [
      { name: "أزرق", value: "#1E3A8A" },
      { name: "أسود", value: "#000000" }
    ],
    rating: 4.8,
    reviews: 8,
    category: "فساتين",
    inStock: true
  },
  {
    id: 3,
    storeId: 1,
    name: "فستان بنفسجي عصري",
    description: "فستان بنفسجي أنيق بتصميم عصري وقماش فاخر، مناسب لجميع المناسبات",
    price: 210,
    originalPrice: 250,
    images: [
      "/assets/products/dress-purple-main.png",
      "/assets/products/dress-purple-main.png"
    ],
    sizes: ["S", "M", "L", "XL"],
    availableSizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "بنفسجي", value: "#7C3AED" },
      { name: "أسود", value: "#000000" },
      { name: "كحلي", value: "#1E40AF" }
    ],
    rating: 4.9,
    reviews: 15,
    category: "فساتين",
    inStock: true
  },
  {
    id: 4,
    storeId: 1,
    name: "عباءة كلاسيكية",
    description: "عباءة كلاسيكية أنيقة بتصميم تقليدي وجودة عالية",
    price: 165,
    originalPrice: 180,
    images: [
      "/assets/products/dress-black-main.png"
    ],
    sizes: ["S", "M", "L", "XL"],
    availableSizes: ["S", "M", "L"],
    colors: [
      { name: "أسود", value: "#000000" }
    ],
    rating: 4.6,
    reviews: 20,
    category: "عبايات", 
    inStock: true
  },
  {
    id: 5,
    storeId: 1,
    name: "فستان يومي مريح",
    description: "فستان يومي مريح للاستخدام اليومي، مصنوع من قماش قطني ناعم",
    price: 120,
    originalPrice: 140,
    images: [
      "/assets/products/dress-blue-main.png"
    ],
    sizes: ["S", "M", "L", "XL"],
    availableSizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "أزرق فاتح", value: "#3B82F6" },
      { name: "وردي", value: "#EC4899" },
      { name: "بيج", value: "#D4A574" }
    ],
    rating: 4.3,
    reviews: 25,
    category: "ملابس يومية",
    inStock: true
  },
  {
    id: 6,
    storeId: 1,
    name: "إكسسوارات أنيقة",
    description: "مجموعة إكسسوارات أنيقة تكمل إطلالتك اليومية",
    price: 85,
    originalPrice: 100,
    images: [
      "/assets/products/dress-purple-main.png"
    ],
    sizes: ["واحد"],
    availableSizes: ["واحد"],
    colors: [
      { name: "ذهبي", value: "#F59E0B" },
      { name: "فضي", value: "#6B7280" }
    ],
    rating: 4.7,
    reviews: 30,
    category: "اكسسوارات",
    inStock: true
  }
];

// generateOrderId function: Generates unique order reference numbers
// مولد الرقم المرجعي
export const generateOrderId = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const randomNum = Math.floor(Math.random() * 9999).toString().padStart(4, '0');
  return `eshro-${year}${month}-${randomNum}`;
};

// generateCoupon function: Generates discount coupon codes
// مولد كوبون التخفيض
export const generateCoupon = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  
  let code = '';
  for (let i = 0; i < 4; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  
  return `eshro-${code}-${year}${month}`;
};

// availableCoupons: List of available discount coupons
// كوبونات التخفيض المتاحة
export const availableCoupons = [
  {
    code: "eshro-TT6H-202509",
    discount: 15,
    minAmount: 1500,
    description: "تخفيض 15% من إجمالي فاتورة بقيمة 1500 د.ل"
  },
  {
    code: "eshro-WX2Y-202509", 
    discount: 20,
    minAmount: 3000,
    description: "تخفيضات 20% بقيمة شراء 3000 د.ل"
  }
];

// statsData: Statistics data for the homepage display
// بيانات الإحصائيات للصفحة الرئيسية
export const statsData = [
  { label: 'معدل الرضا', value: '98%' },
  { label: 'عميل راضي', value: '+25K' },
  { label: 'منتج متاح', value: '+50K' },
  { label: 'متجر نشط', value: '+150' }
];