# دليل التكامل مع الخدمات الخارجية - EISHRO Platform

## نظرة عامة على التكاملات

يوفر هذا الدليل مواصفات شاملة لتكامل منصة EISHRO مع الخدمات الخارجية، بما في ذلك البنوك الليبية، شركات الشحن، شركات الاتصالات، وبوابات الدفع المختلفة.

## بوابات الدفع والمصارف

### 1. بوابة مواملات (Moamalat Gateway)

#### نظرة عامة على التكامل
```markdown
**الوصف:** البوابة الرسمية للمدفوعات الإلكترونية في ليبيا
**الموقع:** https://moamalat.ly
**نوع التكامل:** API مباشر مع SDK رسمي
**العملة المدعومة:** الدينار الليبي (LYD)
**الحالة:** نشط ومفعل بالكامل
```

#### المصارف المدعومة
```typescript
const supportedBanks = [
  {
    id: "national_commercial",
    name: "البنك الوطني التجاري",
    code: "NBC",
    type: "commercial",
    cards: ["mada", "visa", "mastercard"],
    onlineBanking: true,
    branches: ["طرابلس", "بنغازي", "مصراتة"]
  },
  {
    id: "jumhouria",
    name: "بنك الجمهورية",
    code: "JUM",
    type: "commercial",
    cards: ["mada", "visa", "mastercard"],
    onlineBanking: true,
    branches: ["طرابلس", "بنغازي", "سبها"]
  },
  {
    id: "sahara",
    name: "بنك الصحراء",
    code: "SAH",
    type: "commercial",
    cards: ["mada", "visa"],
    onlineBanking: true,
    branches: ["طرابلس", "بنغازي"]
  },
  {
    id: "wahda",
    name: "بنك الوحدة",
    code: "WAH",
    type: "commercial",
    cards: ["mada", "visa", "mastercard"],
    onlineBanking: true,
    branches: ["طرابلس", "بنغازي", "مصراتة", "الزاوية"]
  },
  {
    id: "commerce_development",
    name: "بنك التجارة والتنمية",
    code: "BCD",
    type: "development",
    cards: ["mada", "visa"],
    onlineBanking: true,
    branches: ["طرابلس", "بنغازي"]
  }
];
```

#### إعداد التكامل
```typescript
// إعدادات بوابة مواملات
const moamalatConfig = {
  environment: process.env.NODE_ENV === 'production' ? 'production' : 'test',
  credentials: {
    merchantId: process.env.MOAMALAT_MERCHANT_ID,
    apiKey: process.env.MOAMALAT_API_KEY,
    secretKey: process.env.MOAMALAT_SECRET_KEY
  },
  endpoints: {
    test: 'https://test.moamalat.ly/api',
    production: 'https://api.moamalat.ly/api'
  },
  webhooks: {
    paymentStatus: process.env.MOAMALAT_WEBHOOK_URL,
    refundStatus: process.env.MOAMALAT_REFUND_WEBHOOK_URL
  }
};
```

#### طرق الدفع المدعومة
```typescript
const paymentMethods = {
  cards: {
    credit: {
      supported: ['visa', 'mastercard'],
      currencies: ['LYD', 'USD'],
      minAmount: 1.00,
      maxAmount: 50000.00
    },
    debit: {
      supported: ['mada'],
      currencies: ['LYD'],
      minAmount: 0.50,
      maxAmount: 25000.00
    }
  },
  bankTransfer: {
    enabled: true,
    banks: ['NBC', 'JUM', 'SAH', 'WAH'],
    processingTime: '1-3 أيام عمل'
  },
  digitalWallets: {
    enabled: false, // مخطط للتفعيل مستقبلاً
    providers: ['mobimoney', 'libyana_pay']
  }
};
```

### 2. المحافظ الرقمية والدفع الإلكتروني

#### MobiCash (محفظة الهاتف المحمول)
```markdown
**الوصف:** خدمة الدفع عبر الهاتف المحمول من شركة المدار
**الموقع:** https://mobicash.ly
**نوع التكامل:** REST API
**الحالة:** مخطط للتفعيل في الإصدار 4.4

**الميزات المدعومة:**
- تحويل الأموال عبر الهاتف
- دفع الفواتير
- شحن الرصيد
- تحويل دولي محدود
```

#### Sadad (نظام الدفع الوطني)
```markdown
**الوصف:** نظام الدفع الوطني الليبي
**الموقع:** https://sadad.ly
**نوع التكامل:** SOAP API
**الحالة:** قيد التطوير

**الخدمات المدعومة:**
- دفع الفواتير الحكومية
- تحصيل المدفوعات التجارية
- تحويل الأموال بين الحسابات
- الدفع عبر الإنترنت
```

#### 1Pay (منصة الدفع الموحدة)
```markdown
**الوصف:** منصة دفع إلكتروني موحدة
**الموقع:** https://1pay.ly
**نوع التكامل:** REST API + SDK
**الحالة:** مخطط للتفعيل

**طرق الدفع:**
- بطاقات الائتمان والخصم
- التحويل البنكي
- المحافظ الرقمية
- الدفع عند التسليم
```

## شركات الشحن والتوصيل

### 1. شركة أميال (Amyal Express)

#### نظرة عامة على التكامل
```markdown
**الوصف:** خدمة التوصيل السريع في ليبيا
**الموقع:** https://amyal.ly
**نوع التكامل:** REST API + Webhooks
**مناطق التغطية:** جميع المدن الليبية الرئيسية
**الحالة:** نشط ومفعل بالكامل
```

#### خدمات الشحن المتاحة
```typescript
const amyalServices = {
  express: {
    name: "توصيل سريع",
    estimatedTime: "1-2 يوم",
    cost: "15-25 دينار",
    tracking: true,
    insurance: true,
    cashOnDelivery: true
  },
  standard: {
    name: "توصيل عادي",
    estimatedTime: "2-4 أيام",
    cost: "8-15 دينار",
    tracking: true,
    insurance: false,
    cashOnDelivery: true
  },
  economy: {
    name: "توصيل اقتصادي",
    estimatedTime: "5-7 أيام",
    cost: "5-10 دينار",
    tracking: false,
    insurance: false,
    cashOnDelivery: true
  }
};
```

#### إعداد التكامل
```typescript
// إعدادات API أميال
const amyalConfig = {
  apiKey: process.env.AMYAL_API_KEY,
  apiSecret: process.env.AMYAL_API_SECRET,
  baseUrl: process.env.AMYAL_API_URL,
  webhooks: {
    shipmentStatus: process.env.AMYAL_WEBHOOK_URL,
    deliveryConfirmation: process.env.AMYAL_DELIVERY_WEBHOOK_URL
  },
  defaultService: 'standard',
  autoTracking: true
};
```

### 2. شركة درب سيل (Darbsail Logistics)

#### نظرة عامة على التكامل
```markdown
**الوصف:** خدمة الشحن واللوجستيات المتخصصة
**الموقع:** https://darbsail.ly
**نوع التكامل:** REST API
**مناطق التغطية:** طرابلس وبنغازي ومصراتة
**الحالة:** نشط ومفعل
```

#### خدمات الشحن المتاحة
```typescript
const darbsailServices = {
  sameDay: {
    name: "توصيل نفس اليوم",
    availableCities: ["طرابلس", "بنغازي"],
    maxWeight: 10, // كيلوغرام
    cost: "20-30 دينار",
    cutoffTime: "14:00"
  },
  nextDay: {
    name: "توصيل اليوم التالي",
    availableCities: ["طرابلس", "بنغازي", "مصراتة"],
    maxWeight: 25,
    cost: "10-20 دينار",
    cutoffTime: "18:00"
  },
  standard: {
    name: "توصيل عادي",
    availableCities: ["طرابلس", "بنغازي", "مصراتة", "الزاوية"],
    maxWeight: 50,
    cost: "5-15 دينار",
    estimatedTime: "2-3 أيام"
  }
};
```

### 3. شركة فانيكس (Vanex Transport)

#### نظرة عامة على التكامل
```markdown
**الوصف:** خدمة النقل والشحن المتخصصة
**الموقع:** https://vanex.ly
**نوع التكامل:** API + FTP للتحديثات
**مناطق التغطية:** جميع أنحاء ليبيا
**الحالة:** نشط ومفعل
```

#### خدمات الشحن المتاحة
```typescript
const vanexServices = {
  lightCargo: {
    name: "شحن خفيف",
    maxWeight: 5,
    maxDimensions: "50x30x30 سم",
    cost: "8-12 دينار",
    estimatedTime: "1-2 يوم"
  },
  mediumCargo: {
    name: "شحن متوسط",
    maxWeight: 20,
    maxDimensions: "100x50x50 سم",
    cost: "15-25 دينار",
    estimatedTime: "2-3 أيام"
  },
  heavyCargo: {
    name: "شحن ثقيل",
    maxWeight: 100,
    maxDimensions: "200x100x100 سم",
    cost: "حسب الوزن والمسافة",
    estimatedTime: "3-5 أيام"
  }
};
```

### 4. شركة وينغسلي (Wingsly Express)

#### نظرة عامة على التكامل
```markdown
**الوصف:** خدمة الشحن السريع والطيران الداخلي
**الموقع:** https://wingsly.ly
**نوع التكامل:** REST API + Real-time WebSocket
**مناطق التغطية:** المطارات الليبية الرئيسية
**الحالة:** نشط ومفعل
```

#### خدمات الشحن المتاحة
```typescript
const wingslyServices = {
  airExpress: {
    name: "شحن جوي سريع",
    routes: ["طرابلس-بنغازي", "بنغازي-مصراتة"],
    maxWeight: 10,
    cost: "25-40 دينار",
    estimatedTime: "4-6 ساعات"
  },
  airStandard: {
    name: "شحن جوي عادي",
    routes: ["طرابلس-بنغازي", "بنغازي-سبها"],
    maxWeight: 20,
    cost: "15-25 دينار",
    estimatedTime: "12-24 ساعة"
  }
};
```

## شركات الاتصالات وخدمات الرسائل

### 1. شركة المدار (Almadar Aljadid)

#### نظرة عامة على التكامل
```markdown
**الوصف:** أكبر مشغل للهاتف المحمول في ليبيا
**الموقع:** https://almadar.ly
**نوع التكامل:** SMS API + Mobile Payment API
**الخدمات:** الرسائل النصية، الدفع عبر الهاتف، التحقق من الهوية
**الحالة:** نشط ومفعل بالكامل
```

#### خدمات الرسائل النصية
```typescript
const almadarSMS = {
  apiEndpoint: 'https://sms.almadar.ly/api',
  credentials: {
    username: process.env.ALMADAR_SMS_USERNAME,
    password: process.env.ALMADAR_SMS_PASSWORD,
    senderId: 'ESHRO'
  },
  features: {
    unicode: true,        // دعم الرسائل العربية
    longMessages: true,   // رسائل طويلة
    deliveryReports: true, // تقارير التسليم
    scheduling: true      // جدولة الرسائل
  },
  pricing: {
    localSMS: 0.05,      // دينار لكل رسالة محلية
    internationalSMS: 0.25, // دينار لكل رسالة دولية
    unicodeSMS: 0.08     // دينار للرسائل العربية
  }
};
```

#### خدمة التحقق من الهوية
```typescript
// تكامل خدمة التحقق من الهوية
const almadarVerification = {
  verifyPhoneNumber: async (phoneNumber: string) => {
    const response = await fetch('https://verify.almadar.ly/api/verify', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.ALMADAR_VERIFY_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        phoneNumber,
        service: 'eshro_verification'
      })
    });

    return response.json();
  },

  checkVerificationStatus: async (verificationId: string) => {
    const response = await fetch(`https://verify.almadar.ly/api/status/${verificationId}`, {
      headers: {
        'Authorization': `Bearer ${process.env.ALMADAR_VERIFY_TOKEN}`
      }
    });

    return response.json();
  }
};
```

### 2. شركة ليبيانا (Libyana Mobile)

#### نظرة عامة على التكامل
```markdown
**الوصف:** ثاني أكبر مشغل للهاتف المحمول في ليبيا
**الموقع:** https://libyana.ly
**نوع التكامل:** SMS API + Payment Gateway
**الخدمات:** الرسائل النصية، الدفع عبر الهاتف
**الحالة:** مخطط للتفعيل في الإصدار 4.4
```

#### خدمات الرسائل النصية
```typescript
const libyanaSMS = {
  apiEndpoint: 'https://api.libyana.ly/sms',
  credentials: {
    apiKey: process.env.LIBYANA_API_KEY,
    senderName: 'ESHRO'
  },
  features: {
    arabicSupport: true,
    deliveryReports: true,
    bulkSMS: true,
    scheduling: false
  },
  pricing: {
    localSMS: 0.04,
    unicodeSMS: 0.06
  }
};
```

## خدمات الخرائط والموقع

### 1. خدمة خرائط ليبيا (Libya Maps)

#### نظرة عامة على التكامل
```markdown
**الوصف:** خدمة الخرائط والملاحة الليبية
**الموقع:** https://maps.libya.ly
**نوع التكامل:** REST API + Geocoding API
**الخدمات:** تحديد الموقع، حساب المسافات، الملاحة
**الحالة:** نشط ومفعل
```

#### خدمات الموقع الجغرافي
```typescript
const libyaMapsService = {
  geocodeAddress: async (address: string) => {
    const response = await fetch(`https://api.maps.libya.ly/geocode`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.LIBYA_MAPS_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        address,
        country: 'Libya'
      })
    });

    return response.json();
  },

  calculateDistance: async (origin: Coordinates, destination: Coordinates) => {
    const response = await fetch(`https://api.maps.libya.ly/distance`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.LIBYA_MAPS_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        origin,
        destination,
        unit: 'km'
      })
    });

    return response.json();
  },

  getShippingZones: async (city: string) => {
    const response = await fetch(`https://api.maps.libya.ly/zones/${city}`, {
      headers: {
        'Authorization': `Bearer ${process.env.LIBYA_MAPS_TOKEN}`
      }
    });

    return response.json();
  }
};
```

## خدمات التحقق من الهوية

### 1. نظام الرقم الوطني الليبي

#### نظرة عامة على التكامل
```markdown
**الوصف:** التحقق من الهوية الوطنية الليبية
**الجهة:** مصلحة الأحوال المدنية الليبية
**نوع التكامل:** Government API
**الحالة:** مخطط للتفعيل مع الجهات الحكومية
```

#### خدمات التحقق المتاحة
```typescript
const nationalIdVerification = {
  verifyNationalId: async (nationalId: string) => {
    // تكامل مع قاعدة بيانات الهوية الوطنية
    const response = await fetch('https://api.civil.gov.ly/verify', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GOVERNMENT_API_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        nationalId,
        purpose: 'ecommerce_verification'
      })
    });

    return response.json();
  },

  getPersonalInfo: async (nationalId: string) => {
    // استرجاع المعلومات الشخصية الموثقة
    const response = await fetch(`https://api.civil.gov.ly/info/${nationalId}`, {
      headers: {
        'Authorization': `Bearer ${process.env.GOVERNMENT_API_TOKEN}`
      }
    });

    return response.json();
  }
};
```

## خدمات التحليلات والإحصائيات

### 1. جوجل أناليتيكس (Google Analytics)

#### نظرة عامة على التكامل
```markdown
**الوصف:** خدمة تحليل حركة المستخدمين والأداء
**الموقع:** https://analytics.google.com
**نوع التكامل:** Google Tag Manager + API
**الحالة:** نشط ومفعل
```

#### إعداد التتبع
```typescript
// إعداد Google Analytics
const googleAnalytics = {
  trackingId: process.env.GA_TRACKING_ID,
  features: {
    ecommerceTracking: true,
    enhancedEcommerce: true,
    userIdTracking: true,
    customDimensions: true,
    crossDomainTracking: false
  },
  events: {
    storeView: 'store_view',
    productView: 'product_view',
    addToCart: 'add_to_cart',
    purchase: 'purchase',
    paymentMethod: 'payment_method',
    shippingMethod: 'shipping_method'
  }
};
```

### 2. فيسبوك بكسل (Facebook Pixel)

#### نظرة عامة على التكامل
```markdown
**الوصف:** تتبع التحويلات والجمهور للإعلانات
**الموقع:** https://facebook.com/business
**نوع التكامل:** Facebook Pixel Code
**الحالة:** مخطط للتفعيل
```

#### إعداد البكسل
```typescript
const facebookPixel = {
  pixelId: process.env.FB_PIXEL_ID,
  events: {
    ViewContent: 'ViewContent',
    AddToCart: 'AddToCart',
    InitiateCheckout: 'InitiateCheckout',
    Purchase: 'Purchase',
    Lead: 'Lead',
    CompleteRegistration: 'CompleteRegistration'
  },
  customEvents: {
    storeCreation: 'Store_Creation',
    paymentSuccess: 'Payment_Success',
    orderTracking: 'Order_Tracking'
  }
};
```

## خدمات التخزين السحابي

### 1. كلاودفلير R2 (Cloudflare R2)

#### نظرة عامة على التكامل
```markdown
**الوصف:** خدمة تخزين الملفات السحابية
**الموقع:** https://cloudflare.com/r2
**نوع التكامل:** S3-compatible API
**الحالة:** نشط ومفعل بالكامل
```

#### إعداد التخزين
```typescript
const cloudflareR2 = {
  accountId: process.env.CLOUDFLARE_ACCOUNT_ID,
  accessKeyId: process.env.R2_ACCESS_KEY_ID,
  secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
  bucketName: process.env.R2_BUCKET_NAME,
  region: 'auto',
  endpoint: `https://${process.env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,

  // تنظيم الملفات
  folders: {
    products: 'products/',
    stores: 'stores/',
    users: 'users/',
    invoices: 'invoices/',
    temp: 'temp/'
  },

  // سياسات الوصول
  cdnUrl: 'https://cdn.eshro.ly',
  signedUrls: {
    enabled: true,
    expiration: 3600 // ثانية واحدة
  }
};
```

## خدمات البريد الإلكتروني

### 1. خدمة البريد الليبية (Libya Post Mail)

#### نظرة عامة على التكامل
```markdown
**الوصف:** خدمة البريد الإلكتروني الليبية الرسمية
**الموقع:** https://mail.libyapost.ly
**نوع التكامل:** SMTP + API
**الحالة:** نشط ومفعل
```

#### إعداد خدمة البريد
```typescript
const libyaPostMail = {
  smtp: {
    host: 'smtp.libyapost.ly',
    port: 587,
    secure: false,
    auth: {
      user: process.env.LIBYA_POST_USER,
      pass: process.env.LIBYA_POST_PASS
    }
  },
  api: {
    endpoint: 'https://api.mail.libyapost.ly',
    apiKey: process.env.LIBYA_POST_API_KEY
  },
  templates: {
    orderConfirmation: 'order_confirmation',
    paymentSuccess: 'payment_success',
    shippingUpdate: 'shipping_update',
    accountVerification: 'account_verification'
  }
};
```

## خدمات التحقق من العناوين

### 1. خدمة التحقق من العناوين الليبية

#### نظرة عامة على التكامل
```markdown
**الوصف:** التحقق من صحة العناوين الليبية
**الموقع:** https://address.libya.ly
**نوع التكامل:** REST API
**الحالة:** نشط ومفعل
```

#### خدمات التحقق المتاحة
```typescript
const addressVerification = {
  verifyLibyanAddress: async (address: Address) => {
    const response = await fetch('https://api.address.libya.ly/verify', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.ADDRESS_API_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        country: 'Libya',
        city: address.city,
        area: address.area,
        street: address.street,
        building: address.building,
        coordinates: address.coordinates
      })
    });

    return response.json();
  },

  suggestAddresses: async (partialAddress: string) => {
    const response = await fetch(`https://api.address.libya.ly/suggest?q=${encodeURIComponent(partialAddress)}`, {
      headers: {
        'Authorization': `Bearer ${process.env.ADDRESS_API_TOKEN}`
      }
    });

    return response.json();
  },

  getDeliveryZones: async (city: string) => {
    const response = await fetch(`https://api.address.libya.ly/zones/${city}`, {
      headers: {
        'Authorization': `Bearer ${process.env.ADDRESS_API_TOKEN}`
      }
    });

    return response.json();
  }
};
```

## مراقبة التكاملات والصحة

### 1. لوحة مراقبة التكاملات

#### مراقبة حالة الخدمات
```typescript
// نظام مراقبة التكاملات
const integrationMonitor = {
  checkServiceHealth: async (serviceName: string) => {
    const services = {
      moamalat: {
        url: 'https://api.moamalat.ly/health',
        timeout: 5000,
        expectedStatus: 200
      },
      amyal: {
        url: 'https://api.amyal.ly/health',
        timeout: 3000,
        expectedStatus: 200
      },
      almadar: {
        url: 'https://api.almadar.ly/health',
        timeout: 2000,
        expectedStatus: 200
      }
    };

    const service = services[serviceName];
    if (!service) {
      throw new Error(`Service ${serviceName} not found`);
    }

    const startTime = Date.now();
    try {
      const response = await fetch(service.url, {
        timeout: service.timeout
      });

      const responseTime = Date.now() - startTime;
      const isHealthy = response.status === service.expectedStatus;

      return {
        service: serviceName,
        status: isHealthy ? 'healthy' : 'unhealthy',
        responseTime,
        lastChecked: new Date(),
        error: isHealthy ? null : `HTTP ${response.status}`
      };
    } catch (error) {
      return {
        service: serviceName,
        status: 'error',
        responseTime: Date.now() - startTime,
        lastChecked: new Date(),
        error: error.message
      };
    }
  },

  getAllServicesHealth: async () => {
    const services = ['moamalat', 'amyal', 'darbsail', 'vanex', 'almadar', 'libyana'];
    const healthChecks = await Promise.allSettled(
      services.map(service => checkServiceHealth(service))
    );

    return healthChecks.map((result, index) => ({
      service: services[index],
      ...result.value
    }));
  }
};
```

### 2. إشعارات الأعطال والمشاكل

#### نظام التنبيهات
```typescript
// نظام التنبيهات للتكاملات
const integrationAlerts = {
  setupAlerts: () => {
    // مراقبة حالة الخدمات كل دقيقة
    setInterval(async () => {
      const healthStatus = await integrationMonitor.getAllServicesHealth();

      const unhealthyServices = healthStatus.filter(
        service => service.status !== 'healthy'
      );

      if (unhealthyServices.length > 0) {
        await sendAlert({
          type: 'integration_failure',
          services: unhealthyServices,
          severity: 'high',
          message: `تم اكتشاف مشاكل في ${unhealthyServices.length} خدمة تكامل`
        });
      }
    }, 60000); // كل دقيقة
  },

  sendAlert: async (alert: Alert) => {
    // إرسال التنبيه عبر قنوات متعددة
    await Promise.all([
      sendEmailAlert(alert),
      sendSMSAlert(alert),
      logAlertToDatabase(alert),
      createSupportTicket(alert)
    ]);
  }
};
```

## جداول التكامل في قاعدة البيانات

### 1. جدول تكاملات الخدمات الخارجية

```sql
CREATE TABLE external_integrations (
  -- البيانات الأساسية
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  service_name VARCHAR(100) NOT NULL,
  service_type VARCHAR(50) NOT NULL CHECK (service_type IN (
    'payment', 'shipping', 'telecom', 'banking', 'analytics', 'storage', 'verification'
  )),
  provider VARCHAR(100) NOT NULL,

  -- إعدادات التكامل
  configuration JSONB NOT NULL DEFAULT '{}',
  credentials JSONB NOT NULL DEFAULT '{}', -- مشفرة

  -- حالة التكامل
  status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'error', 'maintenance')),
  last_health_check TIMESTAMP,
  health_status VARCHAR(20) CHECK (health_status IN ('healthy', 'degraded', 'unhealthy')),

  -- المقاييس والأداء
  total_requests INTEGER DEFAULT 0,
  successful_requests INTEGER DEFAULT 0,
  failed_requests INTEGER DEFAULT 0,
  average_response_time DECIMAL(8,2) DEFAULT 0,

  -- البيانات التقنية
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_by UUID REFERENCES users(id),

  -- قيود التحقق
  CONSTRAINT unique_service_provider UNIQUE(service_name, provider)
);

-- فهارس الأداء
CREATE INDEX idx_integrations_type ON external_integrations(service_type, status);
CREATE INDEX idx_integrations_status ON external_integrations(status, last_health_check);
CREATE INDEX idx_integrations_health ON external_integrations(health_status, updated_at DESC);
```

### 2. جدول سجلات التكامل

```sql
CREATE TABLE integration_logs (
  -- البيانات الأساسية
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  integration_id UUID NOT NULL REFERENCES external_integrations(id) ON DELETE CASCADE,
  request_id VARCHAR(255),

  -- تفاصيل الطلب
  endpoint VARCHAR(500) NOT NULL,
  method VARCHAR(10) NOT NULL,
  request_headers JSONB,
  request_body TEXT,
  response_status INTEGER,
  response_headers JSONB,
  response_body TEXT,

  -- الأداء والتوقيت
  request_duration DECIMAL(8,3),
  started_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  completed_at TIMESTAMP,

  -- الحالة والأخطاء
  status VARCHAR(20) DEFAULT 'success' CHECK (status IN ('success', 'error', 'timeout')),
  error_message TEXT,
  error_code VARCHAR(50),

  -- البيانات التقنية
  ip_address INET,
  user_agent TEXT,
  user_id UUID REFERENCES users(id),

  -- قيود التحقق
  CONSTRAINT chk_method CHECK (method IN ('GET', 'POST', 'PUT', 'DELETE', 'PATCH'))
);

-- فهارس الأداء
CREATE INDEX idx_integration_logs_integration ON integration_logs(integration_id, started_at DESC);
CREATE INDEX idx_integration_logs_status ON integration_logs(status, started_at DESC);
CREATE INDEX idx_integration_logs_request_id ON integration_logs(request_id) WHERE request_id IS NOT NULL;
CREATE INDEX idx_integration_logs_date_range ON integration_logs(started_at DESC) WHERE started_at >= CURRENT_DATE - INTERVAL '7 days';

-- تقسيم السجلات حسب التاريخ للأداء
CREATE TABLE integration_logs_y2024m10 PARTITION OF integration_logs
FOR VALUES FROM ('2024-10-01') TO ('2024-11-01');

CREATE TABLE integration_logs_y2024m11 PARTITION OF integration_logs
FOR VALUES FROM ('2024-11-01') TO ('2024-12-01');
```

## خطط الصيانة والتحديث

### جدول صيانة التكاملات

#### الصيانة الشهرية
```markdown
**الأسبوع الأول:**
- فحص حالة جميع التكاملات
- تحديث مفاتيح API والبيانات المؤقتة
- مراجعة سجلات الأخطاء والأداء
- اختبار التكاملات مع الخدمات الخارجية

**الأسبوع الثاني:**
- تحديث التوثيق الفني للتكاملات
- مراجعة وتحديث الإعدادات
- اختبار سيناريوهات الفشل والتعافي
- تحسين الأداء بناءً على التحليلات

**الأسبوع الثالث:**
- مراجعة اتفاقيات مستوى الخدمة (SLA)
- تحديث خطط التعافي من الكوارث
- تدريب فريق الدعم على التكاملات الجديدة
- مراجعة تعليقات العملاء حول التكاملات

**الأسبوع الرابع:**
- تقييم أداء التكاملات الشهري
- تخطيط التحسينات للشهر التالي
- مراجعة التكاليف والعوائد
- تحديث استراتيجية التكاملات
```

### خطة التعامل مع الأعطال

#### إجراءات التعامل مع انقطاع الخدمات
```typescript
// نظام الكشف عن الأعطال والتعامل معها
const failureHandling = {
  detectFailure: async (serviceName: string) => {
    const healthCheck = await integrationMonitor.checkServiceHealth(serviceName);

    if (healthCheck.status !== 'healthy') {
      await handleServiceFailure(serviceName, healthCheck);
    }
  },

  handleServiceFailure: async (serviceName: string, healthCheck: HealthCheck) => {
    // 1. تسجيل الحادثة
    await logIncident({
      type: 'integration_failure',
      service: serviceName,
      severity: determineSeverity(healthCheck),
      description: healthCheck.error,
      timestamp: new Date()
    });

    // 2. إشعار فريق الدعم الفني
    await notifySupportTeam({
      service: serviceName,
      status: 'down',
      impact: 'high',
      estimatedResolution: estimateResolutionTime(serviceName)
    });

    // 3. تفعيل آليات التعامل البديلة
    await activateFallbackMechanisms(serviceName);

    // 4. إشعار العملاء المتأثرين
    await notifyAffectedCustomers(serviceName);
  },

  activateFallbackMechanisms: async (serviceName: string) => {
    const fallbacks = {
      moamalat: ['cash_on_delivery', 'bank_transfer'],
      amyal: ['darbsail', 'vanex'],
      almadar: ['libyana', 'manual_verification']
    };

    const alternatives = fallbacks[serviceName] || [];
    // تفعيل طرق بديلة للخدمة المتوقفة
  }
};
```

## الخاتمة والتوصيات

### حالة التكاملات الحالية

#### التكاملات النشطة والمكتملة ✅
```markdown
**بوابات الدفع:**
- مواملات (البنوك الليبية الرئيسية)
- الدفع عند التسليم
- التحويل البنكي

**شركات الشحن:**
- أميال (تغطية شاملة)
- درب سيل (تغطية المدن الرئيسية)
- فانيكس (الشحن الثقيل)
- وينغسلي (الشحن الجوي)

**خدمات الاتصالات:**
- المدار (الرسائل النصية والتحقق)
- خدمة الخرائط الليبية
- خدمة التحقق من العناوين
```

#### التكاملات قيد التطوير 🔄
```markdown
**المحافظ الرقمية:**
- MobiCash
- Sadad
- 1Pay

**خدمات إضافية:**
- نظام الرقم الوطني الليبي
- ليبيانا للاتصالات
- خدمات البريد الإلكتروني الرسمية
```

### التوصيات لتحسين التكاملات

#### 1. تحسين الأداء والموثوقية
```markdown
**الأولوية العالية:**
- تطبيق آليات التعامل البديلة التلقائية
- تحسين مراقبة الأداء والصحة
- تطوير نظام التنبيهات الذكية
- تحسين معالجة الأخطاء والاستثناءات

**الأولوية المتوسطة:**
- تطوير لوحة تحكم للتكاملات
- إضافة تحليلات مفصلة للتكاملات
- تطوير نظام اختبار تلقائي للتكاملات
- تحسين التوثيق والأدلة
```

#### 2. توسيع نطاق التكاملات
```markdown
**التوسع المستقبلي:**
- تكامل مع المزيد من البنوك الليبية
- إضافة شركات شحن دولية
- تكامل مع خدمات الحكومة الإلكترونية
- إضافة خدمات التحقق الإضافية
```

#### 3. تعزيز الأمان والحماية
```markdown
**إجراءات الأمان:**
- تشفير جميع الاتصالات مع الخدمات الخارجية
- مراقبة وتسجيل جميع التفاعلات
- تطبيق مبدأ أقل صلاحية ممكنة
- مراجعة دورية للأمان والحماية
```

هذا الدليل يوفر إطاراً شاملاً لتكامل منصة EISHRO مع جميع الخدمات الخارجية الرئيسية في السوق الليبي، مع التركيز على الموثوقية، الأداء، والأمان.

**للحصول على المساعدة في التكاملات:**
- 📚 راجع هذا الدليل والتوثيق الفني
- 🛠️ استخدم أدوات الاختبار والتشخيص
- 👥 تواصل مع فريق التطوير للتكاملات الجديدة
- 📖 اقرأ أدلة التكامل الخاصة بكل خدمة

**نتمنى لك تجربة تكامل سلسة ومثمرة مع منصة EISHRO!** 🚀

---

*هذا الدليل محدث بتاريخ أكتوبر 2025 ويغطي الإصدار 4.3 من المنصة.*