# توثيق واجهات الخادم الخلفي - EISHRO Platform

## نظرة عامة على APIs

يوفر هذا التوثيق مواصفات شاملة لواجهات برمجة التطبيقات (APIs) لمنصة EISHRO، بما في ذلك نقاط النهاية، تنسيقات الطلبات والاستجابات، وطرق التكامل مع الخدمات الخارجية.

## مواصفات API العامة

### معلومات أساسية

#### **البيئات المتاحة:**
- **التطوير:** `https://dev-api.eshro.ly`
- **الاختبار:** `https://staging-api.eshro.ly`
- **الإنتاج:** `https://api.eshro.ly`

#### **تنسيقات البيانات:**
- **الطلب:** `application/json`
- **الاستجابة:** `application/json`
- **التشفير:** `UTF-8`

#### **المصادقة:**
- **نوع:** Bearer Token (JWT)
- **Header:** `Authorization: Bearer {token}`

### تنسيق الاستجابة الموحد

#### نجاح الطلب
```json
{
  "success": true,
  "data": {
    // بيانات الاستجابة
  },
  "message": "تم بنجاح",
  "timestamp": "2024-01-01T00:00:00Z",
  "requestId": "req_123456789"
}
```

#### فشل الطلب
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "بيانات الإدخال غير صالحة",
    "details": {
      "field": "email",
      "message": "البريد الإلكتروني مطلوب"
    }
  },
  "timestamp": "2024-01-01T00:00:00Z",
  "requestId": "req_123456789"
}
```

## مصادقة المستخدمين (Authentication)

### 1. تسجيل حساب جديد

#### **POST** `/api/auth/register`

**وصف:** إنشاء حساب مستخدم جديد

**الطلب:**
```json
{
  "email": "user@example.com",
  "password": "securePassword123",
  "firstName": "أحمد",
  "lastName": "محمد",
  "phone": "+218911234567",
  "accountType": "customer",
  "storeInfo": {
    "name": "متجري الجديد",
    "type": "custom",
    "category": "general"
  }
}
```

**الاستجابة:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user_123",
      "email": "user@example.com",
      "firstName": "أحمد",
      "lastName": "محمد",
      "accountType": "customer",
      "emailVerified": false
    },
    "store": {
      "id": "store_456",
      "name": "متجري الجديد",
      "slug": "mtjry-aljdyd",
      "status": "pending"
    },
    "accessToken": "eyJhbGciOiJIUzI1NiIs...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIs...",
    "expiresIn": 3600
  },
  "message": "تم إنشاء الحساب بنجاح"
}
```

### 2. تسجيل الدخول

#### **POST** `/api/auth/login`

**وصف:** مصادقة المستخدم وإصدار رموز الوصول

**الطلب:**
```json
{
  "email": "user@example.com",
  "password": "securePassword123",
  "rememberMe": true
}
```

**الاستجابة:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user_123",
      "email": "user@example.com",
      "firstName": "أحمد",
      "lastName": "محمد",
      "accountType": "merchant",
      "avatar": "https://cdn.eshro.ly/avatars/user_123.jpg"
    },
    "store": {
      "id": "store_456",
      "name": "متجر نواعم",
      "slug": "nawaem-store",
      "logo": "https://cdn.eshro.ly/logos/store_456.png"
    },
    "accessToken": "eyJhbGciOiJIUzI1NiIs...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIs...",
    "expiresIn": 7200
  },
  "message": "تم تسجيل الدخول بنجاح"
}
```

### 3. تحديث رمز الوصول

#### **POST** `/api/auth/refresh`

**وصف:** تجديد رمز الوصول باستخدام رمز التحديث

**الطلب:**
```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIs..."
}
```

**الاستجابة:**
```json
{
  "success": true,
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIs...",
    "expiresIn": 7200
  },
  "message": "تم تحديث رمز الوصول"
}
```

## إدارة المتاجر (Store Management)

### 1. إنشاء متجر جديد

#### **POST** `/api/stores`

**وصف:** إنشاء متجر جديد للتاجر

**الطلب:**
```json
{
  "name": "متجر نواعم للأزياء",
  "description": "متجر متخصص في الأزياء النسائية الراقية",
  "storeType": "nawaem",
  "category": "fashion",
  "settings": {
    "theme": {
      "primaryColor": "#F59E0B",
      "secondaryColor": "#F97316",
      "fontFamily": "Cairo"
    },
    "features": {
      "whatsappSupport": true,
      "soundEffects": true,
      "multiLanguage": true
    },
    "shipping": {
      "freeShippingThreshold": 200,
      "defaultShippingCost": 15
    }
  },
  "contactInfo": {
    "phone": "+218911234567",
    "whatsapp": "+218911234567",
    "email": "info@nawaem.ly",
    "address": "طرابلس، ليبيا"
  }
}
```

**الاستجابة:**
```json
{
  "success": true,
  "data": {
    "store": {
      "id": "store_789",
      "name": "متجر نواعم للأزياء",
      "slug": "nawaem-fashion",
      "ownerId": "user_123",
      "storeType": "nawaem",
      "status": "active",
      "settings": { ... },
      "createdAt": "2024-01-01T00:00:00Z"
    }
  },
  "message": "تم إنشاء المتجر بنجاح"
}
```

### 2. الحصول على تفاصيل المتجر

#### **GET** `/api/stores/{storeId}`

**وصف:** استرجاع معلومات المتجر والإعدادات

**الاستجابة:**
```json
{
  "success": true,
  "data": {
    "store": {
      "id": "store_789",
      "name": "متجر نواعم للأزياء",
      "slug": "nawaem-fashion",
      "description": "متجر متخصص في الأزياء النسائية الراقية",
      "logo": "https://cdn.eshro.ly/logos/store_789.png",
      "banner": "https://cdn.eshro.ly/banners/store_789.jpg",
      "ownerId": "user_123",
      "storeType": "nawaem",
      "category": "fashion",
      "status": "active",
      "settings": {
        "theme": {
          "primaryColor": "#F59E0B",
          "secondaryColor": "#F97316"
        },
        "features": {
          "whatsappSupport": true,
          "soundEffects": true
        }
      },
      "statistics": {
        "totalProducts": 150,
        "totalOrders": 45,
        "totalRevenue": 12500.00,
        "averageRating": 4.8
      },
      "createdAt": "2024-01-01T00:00:00Z",
      "updatedAt": "2024-01-15T10:30:00Z"
    }
  }
}
```

### 3. تحديث إعدادات المتجر

#### **PUT** `/api/stores/{storeId}`

**وصف:** تحديث إعدادات وتكوين المتجر

**الطلب:**
```json
{
  "name": "متجر نواعم - الأزياء الراقية",
  "description": "متجر متخصص في الأزياء النسائية والإكسسوارات الراقية",
  "settings": {
    "theme": {
      "primaryColor": "#EAB308",
      "secondaryColor": "#EA580C"
    },
    "shipping": {
      "freeShippingThreshold": 250,
      "defaultShippingCost": 12
    }
  },
  "contactInfo": {
    "phone": "+218911234567",
    "email": "contact@nawaem.ly"
  }
}
```

## إدارة المنتجات (Product Management)

### 1. إضافة منتج جديد

#### **POST** `/api/stores/{storeId}/products`

**وصف:** إضافة منتج جديد للمتجر

**الطلب:**
```json
{
  "name": "فستان سهرة أسود مطرز",
  "description": "فستان سهرة أنيق باللون الأسود مع تطريز يدوي فاخر",
  "shortDescription": "فستان سهرة أسود مطرز - أناقة لا تُضاهى",
  "category": "فساتين سهرة",
  "subcategory": "فساتين مطرزة",
  "price": {
    "basePrice": 450.00,
    "salePrice": 380.00,
    "currency": "LYD"
  },
  "inventory": {
    "quantity": 25,
    "lowStockThreshold": 5,
    "allowBackorders": false
  },
  "variants": [
    {
      "type": "size",
      "name": "الحجم",
      "options": ["XS", "S", "M", "L", "XL"]
    },
    {
      "type": "color",
      "name": "اللون",
      "options": [
        {"name": "أسود", "value": "#000000", "image": "/assets/colors/black.jpg"},
        {"name": "أزرق داكن", "value": "#1E3A8A", "image": "/assets/colors/navy.jpg"}
      ]
    }
  ],
  "images": [
    {
      "url": "https://cdn.eshro.ly/products/dress1-main.jpg",
      "alt": "فستان سهرة أسود - الأمام",
      "isMain": true
    },
    {
      "url": "https://cdn.eshro.ly/products/dress1-back.jpg",
      "alt": "فستان سهرة أسود - الخلف",
      "isMain": false
    }
  ],
  "tags": ["فساتين سهرة", "أسود", "مطرز", "راقي"],
  "specifications": {
    "material": "شيفون",
    "care": "غسيل يدوي",
    "origin": "تركيا"
  },
  "seo": {
    "metaTitle": "فستان سهرة أسود مطرز - متجر نواعم",
    "metaDescription": "فستان سهرة أنيق باللون الأسود مع تطريز يدوي فاخر - متجر نواعم"
  }
}
```

**الاستجابة:**
```json
{
  "success": true,
  "data": {
    "product": {
      "id": "prod_101",
      "storeId": "store_789",
      "sku": "NAW-DRS-001",
      "name": "فستان سهرة أسود مطرز",
      "slug": "fstan-shra-aswd-mtrz",
      "status": "published",
      "category": "فساتين سهرة",
      "price": {
        "basePrice": 450.00,
        "salePrice": 380.00,
        "currency": "LYD"
      },
      "inventory": {
        "quantity": 25,
        "available": true
      },
      "images": [...],
      "variants": [...],
      "statistics": {
        "views": 0,
        "orders": 0,
        "rating": 0
      },
      "createdAt": "2024-01-01T00:00:00Z",
      "publishedAt": "2024-01-01T00:00:00Z"
    }
  },
  "message": "تم إضافة المنتج بنجاح"
}
```

### 2. استرجاع منتجات المتجر

#### **GET** `/api/stores/{storeId}/products`

**وصف:** استرجاع قائمة منتجات المتجر مع خيارات التصفية

**المعلمات:**
```typescript
{
  page?: number;           // رقم الصفحة (افتراضي: 1)
  limit?: number;          // عدد العناصر (افتراضي: 20)
  category?: string;       // تصفية بالفئة
  subcategory?: string;    // تصفية بالفئة الفرعية
  priceMin?: number;       // الحد الأدنى للسعر
  priceMax?: number;       // الحد الأقصى للسعر
  inStock?: boolean;       // متوفر في المخزون فقط
  featured?: boolean;      // المنتجات المميزة فقط
  sortBy?: string;         // ترتيب حسب (name, price, createdAt, popularity)
  sortOrder?: string;      // اتجاه الترتيب (asc, desc)
  search?: string;         // نص البحث
}
```

**الاستجابة:**
```json
{
  "success": true,
  "data": {
    "products": [
      {
        "id": "prod_101",
        "name": "فستان سهرة أسود مطرز",
        "slug": "fstan-shra-aswd-mtrz",
        "mainImage": "https://cdn.eshro.ly/products/dress1-main.jpg",
        "price": {
          "current": 380.00,
          "original": 450.00,
          "discount": 15.5
        },
        "category": "فساتين سهرة",
        "rating": 4.8,
        "reviewsCount": 12,
        "inStock": true,
        "isAvailable": true,
        "tags": ["مميز", "تخفيضات"],
        "createdAt": "2024-01-01T00:00:00Z"
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 8,
      "totalProducts": 150,
      "hasNextPage": true,
      "hasPrevPage": false
    },
    "filters": {
      "categories": [
        {"name": "فساتين سهرة", "count": 45},
        {"name": "عبايات", "count": 32}
      ],
      "priceRange": {
        "min": 50.00,
        "max": 1200.00
      }
    }
  }
}
```

### 3. تحديث منتج

#### **PUT** `/api/products/{productId}`

**وصف:** تحديث بيانات المنتج

**الطلب:**
```json
{
  "name": "فستان سهرة أسود مطرز - إصدار محدود",
  "price": {
    "basePrice": 480.00,
    "salePrice": 400.00
  },
  "inventory": {
    "quantity": 20,
    "lowStockThreshold": 3
  },
  "variants": [
    {
      "type": "size",
      "options": ["XS", "S", "M", "L", "XL", "XXL"]
    }
  ],
  "tags": ["فساتين سهرة", "أسود", "مطرز", "راقي", "إصدار محدود"],
  "specifications": {
    "material": "شيفون وحرير",
    "care": "غسيل جاف فقط"
  }
}
```

## إدارة الطلبات (Order Management)

### 1. إنشاء طلب جديد

#### **POST** `/api/orders`

**وصف:** إنشاء طلب شراء جديد

**الطلب:**
```json
{
  "storeId": "store_789",
  "customerInfo": {
    "firstName": "فاطمة",
    "lastName": "علي",
    "email": "fatima@example.com",
    "phone": "+218921234567",
    "isGuest": false
  },
  "shippingAddress": {
    "country": "Libya",
    "city": "طرابلس",
    "area": "وسط المدينة",
    "street": "شارع عمر المختار",
    "building": "عمارة 15",
    "apartment": "شقة 3",
    "postalCode": "12345",
    "coordinates": {
      "lat": 32.8872,
      "lng": 13.1913
    }
  },
  "items": [
    {
      "productId": "prod_101",
      "variantId": "var_001",
      "quantity": 1,
      "unitPrice": 380.00,
      "totalPrice": 380.00
    }
  ],
  "subtotal": 380.00,
  "shippingCost": 15.00,
  "taxAmount": 0.00,
  "totalAmount": 395.00,
  "paymentMethod": "moamalat",
  "shippingMethod": "standard",
  "notes": "يرجى التأكد من الحجم قبل الشحن"
}
```

**الاستجابة:**
```json
{
  "success": true,
  "data": {
    "order": {
      "id": "ord_202401011234",
      "orderNumber": "ESH-20240101-001",
      "storeId": "store_789",
      "status": "pending",
      "paymentStatus": "pending",
      "items": [...],
      "totals": {
        "subtotal": 380.00,
        "shipping": 15.00,
        "tax": 0.00,
        "total": 395.00
      },
      "shippingAddress": {...},
      "trackingNumber": null,
      "estimatedDelivery": "2024-01-05",
      "createdAt": "2024-01-01T12:34:56Z"
    },
    "paymentSession": {
      "sessionId": "sess_123456",
      "paymentUrl": "https://payment.eshro.ly/session/123456",
      "expiresAt": "2024-01-01T13:04:56Z"
    }
  },
  "message": "تم إنشاء الطلب بنجاح"
}
```

### 2. تتبع حالة الطلب

#### **GET** `/api/orders/{orderId}/tracking`

**وصف:** استرجاع معلومات تتبع الطلب

**الاستجابة:**
```json
{
  "success": true,
  "data": {
    "order": {
      "id": "ord_202401011234",
      "orderNumber": "ESH-20240101-001",
      "status": "shipped",
      "trackingNumber": "TRK123456789",
      "carrier": "Amyal",
      "shippedAt": "2024-01-02T10:00:00Z",
      "estimatedDelivery": "2024-01-05T14:00:00Z"
    },
    "tracking": {
      "carrier": "Amyal Express",
      "trackingNumber": "TRK123456789",
      "trackingUrl": "https://track.amyal.ly/TRK123456789",
      "updates": [
        {
          "status": "تم استلام الطرد",
          "location": "مستودع أميال - طرابلس",
          "timestamp": "2024-01-02T10:00:00Z",
          "details": "تم استلام الطرد من المتجر"
        },
        {
          "status": "في طريق التسليم",
          "location": "طرابلس - في الطريق",
          "timestamp": "2024-01-02T14:30:00Z",
          "details": "الطرد في طريقه للتسليم"
        },
        {
          "status": "خارج للتسليم",
          "location": "وسط المدينة - طرابلس",
          "timestamp": "2024-01-03T09:15:00Z",
          "details": "الطرد مع مندوب التسليم"
        }
      ],
      "currentLocation": {
        "lat": 32.8872,
        "lng": 13.1913,
        "address": "وسط المدينة، طرابلس"
      }
    }
  }
}
```

## بوابات الدفع (Payment Gateways)

### 1. إنشاء جلسة دفع مواملات

#### **POST** `/api/payments/moamalat/session`

**وصف:** إنشاء جلسة دفع جديدة لبوابة مواملات

**الطلب:**
```json
{
  "orderId": "ord_202401011234",
  "amount": 395.00,
  "currency": "LYD",
  "customerInfo": {
    "name": "فاطمة علي",
    "email": "fatima@example.com",
    "phone": "+218921234567"
  },
  "billingAddress": {
    "country": "Libya",
    "city": "طرابلس",
    "street": "شارع عمر المختار"
  },
  "successUrl": "https://eshro.ly/order/success?orderId=ord_202401011234",
  "cancelUrl": "https://eshro.ly/order/cancelled?orderId=ord_202401011234",
  "webhookUrl": "https://api.eshro.ly/webhooks/payments/moamalat"
}
```

**الاستجابة:**
```json
{
  "success": true,
  "data": {
    "sessionId": "sess_moamalat_123456",
    "paymentUrl": "https://payment.moamalat.ly/session/123456",
    "expiresAt": "2024-01-01T13:04:56Z",
    "qrCode": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...",
    "paymentMethods": [
      {
        "type": "card",
        "name": "بطاقة ائتمانية",
        "supportedCards": ["visa", "mastercard", "mada"]
      },
      {
        "type": "bank_transfer",
        "name": "تحويل بنكي",
        "banks": ["البنك الوطني التجاري", "بنك الجمهورية"]
      }
    ]
  },
  "message": "تم إنشاء جلسة الدفع بنجاح"
}
```

### 2. معالجة رد الدفع

#### **POST** `/api/payments/moamalat/webhook`

**وصف:** معالجة ردود الدفع من بوابة مواملات

**الطلب (من مواملات):**
```json
{
  "eventType": "payment.completed",
  "sessionId": "sess_moamalat_123456",
  "transactionId": "txn_789012",
  "orderId": "ord_202401011234",
  "amount": 395.00,
  "currency": "LYD",
  "status": "completed",
  "paymentMethod": "card",
  "cardInfo": {
    "type": "credit",
    "last4": "1234",
    "brand": "visa"
  },
  "timestamp": "2024-01-01T12:45:30Z",
  "signature": "sha256_hash_of_payload"
}
```

**الاستجابة:**
```json
{
  "success": true,
  "message": "تم استلام رد الدفع بنجاح",
  "data": {
    "processed": true,
    "orderUpdated": true,
    "notificationsSent": true
  }
}
```

## الشحن والتسليم (Shipping & Delivery)

### 1. حساب تكلفة الشحن

#### **POST** `/api/shipping/calculate`

**وصف:** حساب تكلفة الشحن بناءً على العنوان والمنتجات

**الطلب:**
```json
{
  "storeId": "store_789",
  "destination": {
    "country": "Libya",
    "city": "طرابلس",
    "area": "وسط المدينة"
  },
  "items": [
    {
      "productId": "prod_101",
      "quantity": 1,
      "weight": 0.5,
      "dimensions": {
        "length": 30,
        "width": 20,
        "height": 10
      }
    }
  ],
  "shippingMethod": "standard"
}
```

**الاستجابة:**
```json
{
  "success": true,
  "data": {
    "shippingOptions": [
      {
        "carrier": "Amyal",
        "service": "Express",
        "cost": 15.00,
        "estimatedDays": 1,
        "tracking": true,
        "insurance": true
      },
      {
        "carrier": "Darbsail",
        "service": "Standard",
        "cost": 10.00,
        "estimatedDays": 2,
        "tracking": true,
        "insurance": false
      }
    ],
    "freeShippingThreshold": 200.00,
    "estimatedDelivery": "2024-01-03T14:00:00Z"
  }
}
```

### 2. إنشاء شحنة جديدة

#### **POST** `/api/shipments`

**وصف:** إنشاء شحنة جديدة للطلب

**الطلب:**
```json
{
  "orderId": "ord_202401011234",
  "carrier": "Amyal",
  "service": "Express",
  "trackingNumber": "TRK123456789",
  "shippingCost": 15.00,
  "estimatedDelivery": "2024-01-03T14:00:00Z",
  "pickupAddress": {
    "name": "متجر نواعم",
    "phone": "+218911234567",
    "address": "طرابلس، ليبيا",
    "coordinates": {
      "lat": 32.8756,
      "lng": 13.1875
    }
  },
  "deliveryAddress": {
    "name": "فاطمة علي",
    "phone": "+218921234567",
    "address": "وسط المدينة، طرابلس",
    "coordinates": {
      "lat": 32.8872,
      "lng": 13.1913
    }
  }
}
```

## نظام CRM وخدمة العملاء

### 1. إنشاء تذكرة دعم

#### **POST** `/api/support/tickets`

**وصف:** إنشاء تذكرة دعم فني جديدة

**الطلب:**
```json
{
  "customerId": "cust_456",
  "storeId": "store_789",
  "subject": "مشكلة في حالة الطلب",
  "description": "طلبي برقم ESH-20240101-001 لم يحدث منذ يومين",
  "priority": "medium",
  "category": "order_tracking",
  "attachments": [
    {
      "filename": "screenshot.jpg",
      "url": "https://cdn.eshro.ly/attachments/ticket_001.jpg",
      "size": 245760
    }
  ]
}
```

**الاستجابة:**
```json
{
  "success": true,
  "data": {
    "ticket": {
      "id": "tkt_20240101001",
      "ticketNumber": "SUP-20240101-001",
      "customerId": "cust_456",
      "storeId": "store_789",
      "subject": "مشكلة في حالة الطلب",
      "status": "open",
      "priority": "medium",
      "category": "order_tracking",
      "assignedTo": null,
      "createdAt": "2024-01-01T12:00:00Z",
      "estimatedResponseTime": "2024-01-01T16:00:00Z"
    }
  },
  "message": "تم إنشاء تذكرة الدعم بنجاح"
}
```

### 2. استرجاع تذاكر الدعم

#### **GET** `/api/support/tickets`

**وصف:** استرجاع قائمة تذاكر الدعم مع التصفية

**المعلمات:**
```typescript
{
  storeId?: string;        // تذاكر متجر محدد
  customerId?: string;     // تذاكر عميل محدد
  status?: string;         // حالة التذكرة
  priority?: string;       // أولوية التذكرة
  category?: string;       // فئة التذكرة
  assignedTo?: string;     // المخصص لها
  page?: number;
  limit?: number;
}
```

## التحليلات والتقارير (Analytics)

### 1. تقرير مبيعات المتجر

#### **GET** `/api/analytics/stores/{storeId}/sales`

**وصف:** استرجاع تقرير مبيعات المتجر

**المعلمات:**
```typescript
{
  period?: string;         // daily, weekly, monthly, yearly
  startDate?: string;      // تاريخ البداية (YYYY-MM-DD)
  endDate?: string;        // تاريخ النهاية (YYYY-MM-DD)
  groupBy?: string;        // day, week, month, category, product
}
```

**الاستجابة:**
```json
{
  "success": true,
  "data": {
    "summary": {
      "totalRevenue": 12500.00,
      "totalOrders": 45,
      "averageOrderValue": 277.78,
      "conversionRate": 3.2,
      "period": "2024-01-01 to 2024-01-31"
    },
    "trends": [
      {
        "date": "2024-01-01",
        "revenue": 450.00,
        "orders": 2,
        "averageOrderValue": 225.00
      },
      {
        "date": "2024-01-02",
        "revenue": 680.00,
        "orders": 3,
        "averageOrderValue": 226.67
      }
    ],
    "topProducts": [
      {
        "productId": "prod_101",
        "name": "فستان سهرة أسود مطرز",
        "revenue": 2280.00,
        "orders": 6,
        "averageRating": 4.8
      }
    ],
    "categories": [
      {
        "category": "فساتين سهرة",
        "revenue": 8500.00,
        "orders": 28,
        "percentage": 68.0
      }
    ]
  }
}
```

### 2. تحليلات العملاء

#### **GET** `/api/analytics/customers/{customerId}`

**وصف:** استرجاع تحليلات سلوك العميل

**الاستجابة:**
```json
{
  "success": true,
  "data": {
    "customer": {
      "id": "cust_456",
      "segment": "gold",
      "lifetimeValue": 1250.00,
      "totalOrders": 8,
      "averageOrderValue": 156.25,
      "lastOrderDate": "2024-01-01",
      "churnRisk": 0.15
    },
    "behavior": {
      "favoriteCategories": ["فساتين سهرة", "عبايات"],
      "preferredPaymentMethod": "moamalat",
      "browsingPatterns": {
        "peakHours": ["14:00", "20:00"],
        "preferredDevice": "mobile",
        "sessionDuration": 8.5
      },
      "purchaseHistory": [
        {
          "orderId": "ord_001",
          "date": "2024-01-01",
          "amount": 380.00,
          "items": 2
        }
      ]
    },
    "recommendations": [
      {
        "productId": "prod_205",
        "name": "عباية سوداء أنيقة",
        "reason": "بناءً على مشترياتك السابقة",
        "confidence": 0.85
      }
    ]
  }
}
```

## نظام الإشعارات (Notifications)

### 1. إرسال إشعار للعميل

#### **POST** `/api/notifications/send`

**وصف:** إرسال إشعار للعميل عبر قنوات متعددة

**الطلب:**
```json
{
  "customerId": "cust_456",
  "type": "order_update",
  "channels": ["email", "sms", "push"],
  "title": "تحديث حالة طلبك",
  "message": "تم شحن طلبك برقم ESH-20240101-001 وهو في طريقه إليك",
  "data": {
    "orderId": "ord_202401011234",
    "trackingNumber": "TRK123456789",
    "estimatedDelivery": "2024-01-03"
  },
  "priority": "normal",
  "scheduledAt": null
}
```

**الاستجابة:**
```json
{
  "success": true,
  "data": {
    "notificationId": "notif_123456",
    "channels": {
      "email": {"sent": true, "delivered": false},
      "sms": {"sent": true, "delivered": true},
      "push": {"sent": true, "opened": false}
    },
    "sentAt": "2024-01-01T12:00:00Z"
  },
  "message": "تم إرسال الإشعار بنجاح"
}
```

### 2. جدولة إشعارات تلقائية

#### **POST** `/api/notifications/schedule`

**وصف:** جدولة إشعارات تلقائية للعملاء

**الطلب:**
```json
{
  "trigger": {
    "event": "order_shipped",
    "delay": 0,
    "conditions": {
      "orderAmount": {">=": 100},
      "customerSegment": ["gold", "platinum"]
    }
  },
  "template": {
    "type": "order_update",
    "title": "طلبك في الطريق! 🚚",
    "message": "مرحباً {customerName}، طلبك برقم {orderNumber} تم شحنه وهو في طريقه إليك. رقم التتبع: {trackingNumber}",
    "channels": ["email", "sms"]
  },
  "schedule": {
    "frequency": "immediate",
    "timezone": "Africa/Tripoli"
  }
}
```

## التكامل مع الخدمات الخارجية

### 1. تكامل مع شركات الشحن

#### **POST** `/api/integrations/shipping/{carrier}/shipment`

**وصف:** إنشاء شحنة مع شركة شحن خارجية

**الطلب (مثال مع أميال):**
```json
{
  "carrier": "amyal",
  "apiKey": "your_amyal_api_key",
  "shipment": {
    "orderId": "ord_202401011234",
    "pickupAddress": {
      "name": "متجر نواعم",
      "phone": "+218911234567",
      "address": "طرابلس، ليبيا"
    },
    "deliveryAddress": {
      "name": "فاطمة علي",
      "phone": "+218921234567",
      "address": "وسط المدينة، طرابلس"
    },
    "package": {
      "weight": 0.5,
      "dimensions": {
        "length": 30,
        "width": 20,
        "height": 10
      },
      "value": 380.00,
      "description": "فستان سهرة أسود مطرز"
    },
    "service": "express",
    "options": {
      "insurance": true,
      "signature": true,
      "cashOnDelivery": false
    }
  }
}
```

### 2. تكامل مع نظام CRM خارجي

#### **POST** `/api/integrations/crm/sync`

**وصف:** مزامنة بيانات العملاء مع نظام CRM خارجي

**الطلب:**
```json
{
  "crmProvider": "hubspot",
  "apiKey": "your_hubspot_api_key",
  "operation": "sync",
  "data": {
    "customers": [
      {
        "id": "cust_456",
        "email": "fatima@example.com",
        "firstName": "فاطمة",
        "lastName": "علي",
        "properties": {
          "lifetime_value": 1250.00,
          "customer_segment": "gold",
          "last_purchase_date": "2024-01-01",
          "preferred_categories": ["فساتين سهرة", "عبايات"]
        }
      }
    ],
    "orders": [
      {
        "id": "ord_202401011234",
        "customerId": "cust_456",
        "amount": 395.00,
        "status": "shipped",
        "items": [...]
      }
    ]
  }
}
```

## إدارة الملفات والوسائط

### 1. رفع الملفات

#### **POST** `/api/files/upload`

**وصف:** رفع الملفات والوسائط للمنتجات أو المتجر

**الطلب (multipart/form-data):**
```typescript
FormData {
  file: File,           // الملف المراد رفعه
  type: 'product',      // نوع الملف (product, store, avatar)
  entityId: 'prod_101', // معرف الكيان المرتبط
  category: 'images'    // فئة الملف
}
```

**الاستجابة:**
```json
{
  "success": true,
  "data": {
    "file": {
      "id": "file_123456",
      "filename": "dress-main-image.jpg",
      "originalName": "IMG_001.jpg",
      "url": "https://cdn.eshro.ly/files/dress-main-image.jpg",
      "thumbnailUrl": "https://cdn.eshro.ly/thumbnails/dress-main-image.jpg",
      "size": 245760,
      "mimeType": "image/jpeg",
      "dimensions": {
        "width": 1200,
        "height": 1200
      },
      "uploadedAt": "2024-01-01T12:00:00Z"
    }
  },
  "message": "تم رفع الملف بنجاح"
}
```

### 2. حذف الملفات

#### **DELETE** `/api/files/{fileId}`

**وصف:** حذف ملف من الخادم

**الاستجابة:**
```json
{
  "success": true,
  "data": {
    "deleted": true,
    "fileId": "file_123456",
    "deletedAt": "2024-01-01T12:00:00Z"
  },
  "message": "تم حذف الملف بنجاح"
}
```

## مراقبة النظام والصحة

### 1. فحص صحة النظام

#### **GET** `/api/health`

**وصف:** فحص حالة النظام والخدمات

**الاستجابة:**
```json
{
  "success": true,
  "data": {
    "status": "healthy",
    "timestamp": "2024-01-01T12:00:00Z",
    "services": {
      "database": {
        "status": "connected",
        "responseTime": 12,
        "connections": 5
      },
      "payment_gateway": {
        "status": "operational",
        "responseTime": 245,
        "successRate": 99.2
      },
      "shipping_apis": {
        "status": "operational",
        "responseTime": 180,
        "activeCarriers": 4
      },
      "file_storage": {
        "status": "operational",
        "storageUsed": 2.4,
        "storageAvailable": 97.6
      }
    },
    "performance": {
      "uptime": 99.9,
      "averageResponseTime": 145,
      "requestsPerMinute": 1250,
      "errorRate": 0.1
    }
  }
}
```

### 2. مقاييس الأداء

#### **GET** `/api/metrics`

**وصف:** استرجاع مقاييس أداء النظام

**المعلمات:**
```typescript
{
  period?: string;    // last_hour, last_day, last_week, last_month
  metrics?: string[]; // array of metric names
}
```

**الاستجابة:**
```json
{
  "success": true,
  "data": {
    "period": "2024-01-01T00:00:00Z to 2024-01-01T23:59:59Z",
    "metrics": {
      "api_requests_total": 45678,
      "api_response_time_avg": 145,
      "payment_success_rate": 98.5,
      "order_conversion_rate": 3.2,
      "active_users": 1234,
      "error_rate": 0.08
    },
    "trends": [
      {
        "timestamp": "2024-01-01T12:00:00Z",
        "api_requests": 2340,
        "response_time": 142,
        "error_rate": 0.05
      }
    ]
  }
}
```

## رموز الأخطاء الشائعة

### رموز خطأ API

```typescript
// أخطاء المصادقة
401: "UNAUTHORIZED" - رمز الوصول غير صالح أو منتهي الصلاحية
403: "FORBIDDEN" - عدم وجود صلاحية للوصول للمورد
419: "TOKEN_EXPIRED" - انتهت صلاحية رمز الوصول

// أخطاء التحقق من البيانات
400: "VALIDATION_ERROR" - بيانات الإدخال غير صالحة
422: "UNPROCESSABLE_ENTITY" - لا يمكن معالجة الطلب

// أخطاء الموارد
404: "NOT_FOUND" - المورد المطلوب غير موجود
409: "CONFLICT" - تعارض في البيانات (مثل بريد إلكتروني مكرر)

// أخطاء الخادم
500: "INTERNAL_SERVER_ERROR" - خطأ داخلي في الخادم
503: "SERVICE_UNAVAILABLE" - الخدمة غير متاحة مؤقتاً
429: "TOO_MANY_REQUESTS" - تجاوز حد معدل الطلبات

// أخطاء الأعمال
402: "PAYMENT_REQUIRED" - يتطلب الطلب دفع رسوم
407: "INSUFFICIENT_STOCK" - المخزون غير كافي
408: "ORDER_NOT_FOUND" - الطلب غير موجود
```

## الخاتمة

توفر واجهات برمجة التطبيقات (APIs) هذه إمكانيات شاملة للتكامل مع منصة EISHRO، مع دعم كامل للغة العربية والمتطلبات المحلية للسوق الليبي. جميع الواجهات محمية بأنظمة أمان متقدمة وتدعم المراقبة والتحليلات الشاملة.

**للحصول على الدعم الفني:**
- 📚 راجع هذا التوثيق أولاً
- 🐛 أبلغ عن المشاكل في نظام التذاكر
- 💬 تواصل مع فريق التطوير
- 📖 اقرأ أدلة التكامل المتقدمة

**نتمنى لك تجربة تطوير ممتازة مع منصة EISHRO!** 🚀

---

*هذا التوثيق محدث بتاريخ أكتوبر 2025 ويغطي الإصدار 4.3 من المنصة.*