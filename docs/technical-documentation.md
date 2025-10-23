# EISHRO Platform - التوثيق الفني الشامل

## نظرة عامة تقنية

هذا التوثيق يغطي جميع الجوانب التقنية لمنصة EISHRO للتجارة الإلكترونية، بما في ذلك تفاصيل التنفيذ، مواصفات API، تصميم قاعدة البيانات، وإرشادات التطوير.

## مواصفات النظام

### متطلبات التشغيل

#### متطلبات الخادم
```markdown
**الحد الأدنى:**
- Node.js 18.0.0+
- npm 9.0.0+
- RAM: 2GB
- Storage: 10GB SSD
- Network: 100Mbps

**الموصى به:**
- Node.js 20.0.0+
- npm 10.0.0+
- RAM: 8GB
- Storage: 50GB NVMe SSD
- Network: 1Gbps
```

#### متطلبات المتصفح
```markdown
**الحد الأدنى:**
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

**الميزات المدعومة:**
- ES2022+ JavaScript
- CSS Grid & Flexbox
- WebP Image Format
- Service Workers
- Local Storage
```

## هيكل المشروع

### تنظيم الملفات

```
src/
├── App.tsx                    # نقطة دخول التطبيق الرئيسية
├── main.tsx                   # نقطة دخول React
├── index.css                  # التنسيقات العامة
├── vite-env.d.ts             # تعريفات TypeScript لـ Vite
│
├── backend/                   # طبقة API (Cloudflare Workers)
│   └── api.ts                # نقاط نهاية API
│
├── components/               # مكونات React القابلة للإعادة
│   ├── ui/                   # مكونات واجهة المستخدم الأساسية
│   │   ├── button.tsx        # مكون الزر المحسن
│   │   ├── input.tsx         # مكون الإدخال
│   │   ├── card.tsx          # مكون البطاقة
│   │   ├── modal.tsx         # مكون النافذة المنبثقة
│   │   └── ...
│   │
│   ├── AddToCartPopup.tsx    # نافذة إضافة للسلة
│   ├── CityAreaSelector.tsx  # محدد المدينة والمنطقة
│   ├── DeltaSlider.tsx       # شريط تمرير متجر دلتا
│   ├── MoamalatPaymentGateway.tsx # بوابة دفع مواملات
│   ├── MultiPaymentGateway.tsx    # بوابة الدفع المتعددة
│   ├── NawaemSlider.tsx      # شريط تمرير متجر نواعم
│   ├── SheirineSlider.tsx    # شريط تمرير متجر شيرين
│   ├── SoundEffects.tsx      # تأثيرات صوتية
│   └── ...
│
├── pages/                    # صفحات التطبيق
│   ├── AccountTypeSelectionPage.tsx  # اختيار نوع الحساب
│   ├── CartPage.tsx          # صفحة سلة التسوق
│   ├── CreateStorePage.tsx   # صفحة إنشاء المتجر
│   ├── EnhancedCheckoutPage.tsx      # صفحة الدفع المحسنة
│   ├── EnhancedProductPage.tsx       # صفحة المنتج المحسنة
│   ├── MerchantDashboard.tsx # لوحة تحكم التاجر
│   ├── ModernStorePage.tsx   # صفحة المتجر الحديثة
│   ├── NewMerchantDashboard.tsx     # لوحة التحكم الجديدة
│   ├── PrivacyPolicyPage.tsx # صفحة سياسة الخصوصية
│   ├── TermsAndConditionsPage.tsx   # صفحة الشروط والأحكام
│   ├── VisitorRegistrationPage.tsx  # صفحة تسجيل الزائر
│   └── ...
│
├── data/                     # ملفات البيانات الثابتة
│   ├── allStoreProducts.ts   # جميع منتجات المتاجر
│   ├── deltaProducts.ts      # منتجات متجر دلتا
│   ├── nawamProducts.ts      # منتجات متجر نواعم
│   ├── SheirineProducts.tsx  # منتجات متجر شيرين
│   ├── productCategories.ts  # فئات المنتجات
│   ├── storeProducts.ts      # تعريفات المنتجات
│   └── ...
│
├── hooks/                    # React Hooks المخصصة
│   ├── use-mobile.ts         # كشف الجهاز المحمول
│   └── useSoundEffects.ts    # إدارة التأثيرات الصوتية
│
├── lib/                      # المكتبات والأدوات المساعدة
│   └── utils.ts              # دوال مساعدة عامة
│
└── types/                    # تعريفات TypeScript
    ├── api.ts                # تعريفات API
    ├── components.ts         # تعريفات المكونات
    └── store.ts              # تعريفات المتجر
```

## تعريفات البيانات الأساسية

### واجهات البيانات الرئيسية

#### تعريف المنتج
```typescript
interface Product {
  id: number;
  storeId: number;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  images: string[];
  sizes: string[];
  availableSizes: string[];
  colors: Color[];
  rating: number;
  reviews: number;
  views: number;
  likes: number;
  orders: number;
  category: string;
  inStock: boolean;
  isAvailable: boolean;
  tags: string[];
  badge?: string;
}

interface Color {
  name: string;
  value: string;
  image?: string;
}
```

#### تعريف المتجر
```typescript
interface Store {
  id: number;
  name: string;
  slug: string;
  logo: string;
  description: string;
  ownerId: number;
  categories: string[];
  settings: StoreSettings;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface StoreSettings {
  theme: {
    primaryColor: string;
    secondaryColor: string;
    fontFamily: string;
  };
  features: {
    whatsappSupport: boolean;
    soundEffects: boolean;
    notifications: boolean;
  };
  shipping: {
    freeShippingThreshold: number;
    defaultShippingCost: number;
  };
}
```

#### تعريف الطلب
```typescript
interface Order {
  id: string;
  storeId: number;
  customerInfo: CustomerInfo;
  items: CartItem[];
  total: number;
  shipping: ShippingInfo;
  payment: PaymentInfo;
  status: OrderStatus;
  createdAt: Date;
  updatedAt: Date;
}

type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'preparing'
  | 'shipped'
  | 'delivered'
  | 'cancelled'
  | 'refunded';
```

## API المواصفات

### نقاط النهاية الأساسية

#### إدارة المتاجر
```typescript
// إنشاء متجر جديد
POST /api/stores
Content-Type: application/json
Authorization: Bearer {token}

{
  "name": "متجر نواعم",
  "type": "fashion",
  "settings": {
    "theme": "nawaem",
    "currency": "LYD"
  }
}

// الحصول على متجر
GET /api/stores/{storeId}
Authorization: Bearer {token}

// تحديث إعدادات المتجر
PUT /api/stores/{storeId}
Content-Type: application/json
Authorization: Bearer {token}

{
  "settings": {
    "theme": "custom",
    "colors": {
      "primary": "#F59E0B",
      "secondary": "#F97316"
    }
  }
}
```

#### إدارة المنتجات
```typescript
// إضافة منتج جديد
POST /api/stores/{storeId}/products
Content-Type: application/json
Authorization: Bearer {token}

{
  "name": "فستان سهرة أسود",
  "description": "فستان سهرة أنيق باللون الأسود",
  "price": 450,
  "category": "فساتين سهرة",
  "sizes": ["S", "M", "L", "XL"],
  "colors": [
    {"name": "أسود", "value": "#000000"}
  ],
  "images": ["/assets/products/dress1.jpg"]
}

// تحديث منتج
PUT /api/products/{productId}
Content-Type: application/json
Authorization: Bearer {token}

{
  "price": 420,
  "inStock": true,
  "availableSizes": ["S", "M", "L"]
}
```

#### معالجة الطلبات
```typescript
// إنشاء طلب جديد
POST /api/orders
Content-Type: application/json

{
  "storeId": 1,
  "customerInfo": {
    "name": "أحمد محمد",
    "email": "ahmed@example.com",
    "phone": "+218911234567"
  },
  "items": [
    {
      "productId": 1001,
      "quantity": 2,
      "size": "M",
      "color": "أسود"
    }
  ],
  "shipping": {
    "address": "طرابلس، ليبيا",
    "city": "طرابلس",
    "area": "وسط المدينة"
  }
}

// تتبع حالة الطلب
GET /api/orders/{orderId}/tracking
```

### رموز الحالة الاستجابة

```typescript
// نجح الطلب
{
  "success": true,
  "data": { ... },
  "message": "تم بنجاح",
  "timestamp": "2024-01-01T00:00:00Z"
}

// فشل الطلب
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "بيانات غير صالحة",
    "details": {
      "field": "email",
      "message": "البريد الإلكتروني مطلوب"
    }
  },
  "timestamp": "2024-01-01T00:00:00Z"
}
```

## قاعدة البيانات تصميم

### مخطط قاعدة البيانات

#### جدول المتاجر
```sql
CREATE TABLE stores (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  logo TEXT,
  description TEXT,
  owner_id INTEGER,
  categories TEXT, -- JSON array
  settings TEXT, -- JSON object
  is_active BOOLEAN DEFAULT TRUE,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (owner_id) REFERENCES users(id)
);

-- فهارس محسنة
CREATE INDEX idx_stores_slug ON stores(slug);
CREATE INDEX idx_stores_owner ON stores(owner_id);
CREATE INDEX idx_stores_active ON stores(is_active);
```

#### جدول المنتجات
```sql
CREATE TABLE products (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  store_id INTEGER NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  original_price DECIMAL(10,2),
  category TEXT,
  images TEXT, -- JSON array
  sizes TEXT, -- JSON array
  colors TEXT, -- JSON array
  variants TEXT, -- JSON object
  in_stock BOOLEAN DEFAULT TRUE,
  is_available BOOLEAN DEFAULT TRUE,
  rating DECIMAL(3,2) DEFAULT 0,
  reviews_count INTEGER DEFAULT 0,
  views_count INTEGER DEFAULT 0,
  likes_count INTEGER DEFAULT 0,
  orders_count INTEGER DEFAULT 0,
  tags TEXT, -- JSON array
  badge TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (store_id) REFERENCES stores(id)
);

-- فهارس محسنة
CREATE INDEX idx_products_store ON products(store_id);
CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_products_available ON products(is_available);
CREATE INDEX idx_products_stock ON products(in_stock);
```

#### جدول الطلبات
```sql
CREATE TABLE orders (
  id TEXT PRIMARY KEY,
  store_id INTEGER NOT NULL,
  user_id INTEGER,
  customer_info TEXT, -- JSON object
  items TEXT, -- JSON array
  subtotal DECIMAL(10,2) NOT NULL,
  shipping_cost DECIMAL(10,2) DEFAULT 0,
  tax_amount DECIMAL(10,2) DEFAULT 0,
  total DECIMAL(10,2) NOT NULL,
  shipping_address TEXT, -- JSON object
  payment_info TEXT, -- JSON object
  status TEXT DEFAULT 'pending',
  tracking_number TEXT,
  notes TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (store_id) REFERENCES stores(id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- فهارس محسنة
CREATE INDEX idx_orders_store ON orders(store_id);
CREATE INDEX idx_orders_user ON orders(user_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_created ON orders(created_at);
```

## مكونات واجهة المستخدم

### نظام المكونات

#### مكونات الأساسية (UI Components)

**Button Component:**
```typescript
interface ButtonProps {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'default',
  size = 'default',
  className,
  disabled,
  onClick,
  children
}) => {
  return (
    <button
      className={cn(buttonVariants({ variant, size }), className)}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
```

**Input Component:**
```typescript
interface InputProps {
  type?: 'text' | 'email' | 'password' | 'number' | 'tel';
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  error?: string;
  disabled?: boolean;
  required?: boolean;
}

const Input: React.FC<InputProps> = ({
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  disabled,
  required
}) => {
  return (
    <div className="space-y-2">
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        disabled={disabled}
        required={required}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm",
          error && "border-destructive",
          disabled && "opacity-50 cursor-not-allowed"
        )}
      />
      {error && (
        <p className="text-sm text-destructive">{error}</p>
      )}
    </div>
  );
};
```

#### مكونات الأعمال (Business Components)

**MultiPaymentGateway Component:**
```typescript
interface PaymentGatewayProps {
  amount: number;
  currency: string;
  orderId: string;
  onPaymentSuccess: (transactionId: string) => void;
  onPaymentError: (error: string) => void;
}

const MultiPaymentGateway: React.FC<PaymentGatewayProps> = ({
  amount,
  currency,
  orderId,
  onPaymentSuccess,
  onPaymentError
}) => {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>('moamalat');
  const [loading, setLoading] = useState(false);

  const paymentMethods = [
    { id: 'moamalat', name: 'مواملات', icon: '💳' },
    { id: 'cod', name: 'الدفع عند التسليم', icon: '💰' },
    { id: 'wallet', name: 'المحفظة الرقمية', icon: '📱' }
  ];

  const handlePayment = async () => {
    setLoading(true);
    try {
      const result = await processPayment({
        method: selectedMethod,
        amount,
        currency,
        orderId
      });

      if (result.success) {
        onPaymentSuccess(result.transactionId);
      } else {
        onPaymentError(result.error);
      }
    } catch (error) {
      onPaymentError('فشل في معالجة الدفع');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid gap-2">
        {paymentMethods.map((method) => (
          <Card
            key={method.id}
            className={cn(
              "cursor-pointer transition-colors",
              selectedMethod === method.id && "ring-2 ring-primary"
            )}
            onClick={() => setSelectedMethod(method.id as PaymentMethod)}
          >
            <CardContent className="flex items-center gap-3 p-4">
              <span className="text-2xl">{method.icon}</span>
              <span className="font-medium">{method.name}</span>
            </CardContent>
          </Card>
        ))}
      </div>

      <Button
        onClick={handlePayment}
        disabled={loading}
        className="w-full"
      >
        {loading ? 'جاري المعالجة...' : 'ادفع الآن'}
      </Button>
    </div>
  );
};
```

## إعدادات التطوير

### متغيرات البيئة

#### ملف .env
```env
# API Configuration
VITE_API_BASE_URL=https://api.eshro.ly
VITE_API_TIMEOUT=10000

# Payment Gateway
VITE_MOAMALAT_GATEWAY_URL=https://payment.moamalat.ly
VITE_MOAMALAT_MERCHANT_ID=your_merchant_id
VITE_MOAMALAT_API_KEY=your_api_key

# External Services
VITE_SHIPPING_API_URL=https://api.shipping.ly
VITE_ANALYTICS_ID=GA_MEASUREMENT_ID

# Feature Flags
VITE_ENABLE_SOUND_EFFECTS=true
VITE_ENABLE_ANALYTICS=true
VITE_ENABLE_PWA=true

# Development
VITE_DEBUG_MODE=true
VITE_LOG_LEVEL=info
```

### إعداد التطوير المحلي

#### تثبيت التبعيات
```bash
# تثبيت الحزم
npm install

# تثبيت الحزم بـ pnpm (موصى به)
pnpm install

# تثبيت الحزم بـ bun (للأداء العالي)
bun install
```

#### تشغيل خادم التطوير
```bash
# تشغيل الخادم المحلي
npm run dev

# تشغيل مع host محدد
npm run dev -- --host 0.0.0.0

# تشغيل في وضع الإنتاج محلياً
npm run preview
```

#### بناء المشروع للإنتاج
```bash
# بناء المشروع
npm run build

# تحليل حجم الحزمة
npm run build -- --analyze

# بناء مع تقرير مفصل
npm run build:verbose
```

## اختبارات الجودة

### إطار عمل الاختبار

#### اختبارات الوحدة (Unit Tests)
```typescript
// مثال على اختبار مكون Button
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '@/components/ui/button';

describe('Button Component', () => {
  it('renders correctly with default props', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);

    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('is disabled when disabled prop is true', () => {
    render(<Button disabled>Disabled Button</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });
});
```

#### اختبارات التكامل (Integration Tests)
```typescript
// مثال على اختبار صفحة الدفع
import { render, screen, waitFor } from '@testing-library/react';
import { EnhancedCheckoutPage } from '@/pages/EnhancedCheckoutPage';

describe('EnhancedCheckoutPage', () => {
  it('completes checkout flow successfully', async () => {
    render(<EnhancedCheckoutPage />);

    // ملء بيانات الشحن
    fireEvent.change(screen.getByLabelText('الاسم'), {
      target: { value: 'أحمد محمد' }
    });

    // اختيار طريقة الدفع
    fireEvent.click(screen.getByText('مواملات'));

    // إتمام الدفع
    fireEvent.click(screen.getByRole('button', { name: 'ادفع الآن' }));

    await waitFor(() => {
      expect(screen.getByText('تم الدفع بنجاح')).toBeInTheDocument();
    });
  });
});
```

### أدوات الجودة

#### ESLint Configuration
```javascript
// eslint.config.js
export default [
  {
    files: ['**/*.{js,mjs,cjs,ts,tsx}'],
    languageOptions: {
      parser: '@typescript-eslint/parser',
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    plugins: ['@typescript-eslint', 'react-hooks'],
    rules: {
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/no-explicit-any': 'warn',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
    },
  },
];
```

#### Prettier Configuration
```json
// prettier.config.js
export default {
  semi: true,
  trailingComma: 'es5',
  singleQuote: true,
  printWidth: 80,
  tabWidth: 2,
  useTabs: false,
};
```

## الأمان والحماية

### إجراءات الأمان المطبقة

#### تشفير البيانات
```typescript
// تشفير البيانات الحساسة
import CryptoJS from 'crypto-js';

const encryptData = (data: string, key: string): string => {
  return CryptoJS.AES.encrypt(data, key).toString();
};

const decryptData = (encryptedData: string, key: string): string => {
  const bytes = CryptoJS.AES.decrypt(encryptedData, key);
  return bytes.toString(CryptoJS.enc.Utf8);
};

// استخدام في localStorage
const secureStorage = {
  setItem: (key: string, value: any) => {
    const encryptedValue = encryptData(JSON.stringify(value), STORAGE_KEY);
    localStorage.setItem(key, encryptedValue);
  },

  getItem: (key: string) => {
    const encryptedValue = localStorage.getItem(key);
    if (!encryptedValue) return null;

    try {
      const decryptedValue = decryptData(encryptedValue, STORAGE_KEY);
      return JSON.parse(decryptedValue);
    } catch {
      return null;
    }
  }
};
```

#### حماية المدخلات
```typescript
// تنظيف وتعقيم المدخلات
const sanitizeInput = (input: string): string => {
  return input
    .replace(/[<>]/g, '') // إزالة علامات HTML
    .trim() // إزالة المسافات الزائدة
    .substring(0, 1000); // تحديد الحد الأقصى للطول
};

// التحقق من صحة البريد الإلكتروني
const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// التحقق من صحة رقم الهاتف الليبي
const validateLibyanPhone = (phone: string): boolean => {
  const libyanPhoneRegex = /^(\+218|00218|0)?[9|8][0-9]{8}$/;
  return libyanPhoneRegex.test(phone);
};
```

## الأداء والتحسين

### تحسينات الأداء المطبقة

#### تقسيم الكود (Code Splitting)
```typescript
// تقسيم تلقائي حسب المسار
const routes = [
  {
    path: '/store/:storeId',
    component: lazy(() => import('@/pages/ModernStorePage')),
  },
  {
    path: '/checkout',
    component: lazy(() => import('@/pages/EnhancedCheckoutPage')),
  },
  {
    path: '/dashboard',
    component: lazy(() => import('@/pages/MerchantDashboard')),
  },
];

// تحميل المكونات عند الحاجة
const LazyComponent = lazy(() =>
  import('@/components/HeavyComponent')
);
```

#### تحسين الصور
```typescript
// تحسين تلقائي للصور
const OptimizedImage: React.FC<ImageProps> = ({
  src,
  alt,
  className,
  width,
  height
}) => {
  const [imageSrc, setImageSrc] = useState<string>('');

  useEffect(() => {
    // تحسين الصورة تلقائياً
    const optimizeImage = async () => {
      const optimizedSrc = await optimizeImageSrc(src, {
        width: width || 800,
        height: height || 600,
        format: 'webp',
        quality: 80
      });
      setImageSrc(optimizedSrc);
    };

    optimizeImage();
  }, [src, width, height]);

  return (
    <img
      src={imageSrc}
      alt={alt}
      className={className}
      loading="lazy"
      decoding="async"
    />
  );
};
```

#### التخزين المؤقت الذكي
```typescript
// استراتيجية التخزين المؤقت
const cache = {
  // تخزين بيانات المنتجات لمدة ساعة
  products: new Map<string, { data: any; timestamp: number }>(),

  get: (key: string): any => {
    const item = cache.products.get(key);
    if (!item) return null;

    // التحقق من صلاحية التخزين المؤقت (ساعة واحدة)
    if (Date.now() - item.timestamp > 3600000) {
      cache.products.delete(key);
      return null;
    }

    return item.data;
  },

  set: (key: string, data: any): void => {
    cache.products.set(key, {
      data,
      timestamp: Date.now()
    });
  }
};
```

## النشر والاستضافة

### إعدادات النشر

#### Cloudflare Pages Configuration
```toml
# wrangler.toml
name = "eishro-platform"
compatibility_date = "2024-01-01"

[env.production]
name = "eishro-platform-prod"
route = "https://eshro.ly/*"

[env.staging]
name = "eishro-platform-staging"
route = "https://staging.eshro.ly/*"

[[env.production.deploy_rules]]
type = "include"
globs = ["dist/**"]

[[env.production.deploy_rules]]
type = "exclude"
globs = ["**/*.tmp", "**/node_modules/**"]
```

#### إعدادات البناء
```json
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['@radix-ui/react-slot', '@radix-ui/react-dialog'],
          utils: ['clsx', 'tailwind-merge', 'lucide-react']
        }
      }
    }
  },
  server: {
    port: 3000,
    host: true,
    cors: true
  }
});
```

## مراقبة الأداء

### مؤشرات الأداء الرئيسية

#### Core Web Vitals
```typescript
// مراقبة مؤشرات الويب الأساسية
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

getCLS(console.log);
getFID(console.log);
getFCP(console.log);
getLCP(console.log);
getTTFB(console.log);

// إرسال المؤشرات إلى نظام التحليلات
const sendToAnalytics = ({ name, delta, value, id }) => {
  // إرسال البيانات إلى Google Analytics أو نظام مراقبة آخر
  if (typeof gtag !== 'undefined') {
    gtag('event', name, {
      event_category: 'Web Vitals',
      event_label: id,
      value: Math.round(name === 'CLS' ? delta * 1000 : delta),
      non_interaction: true,
    });
  }
};
```

#### مراقبة الأخطاء
```typescript
// نظام مراقبة الأخطاء الشامل
import * as Sentry from '@sentry/react';

Sentry.init({
  dsn: 'your-sentry-dsn',
  environment: import.meta.env.MODE,
  tracesSampleRate: 1.0,
  beforeSend(event) {
    // تصفية الأخطاء الحساسة
    if (event.exception) {
      return event;
    }
    return null;
  },
});

// تغليف التطبيق بـ Sentry
<Sentry.ErrorBoundary fallback={<ErrorFallback />}>
  <App />
</Sentry.ErrorBoundary>
```

## الصيانة والدعم

### إجراءات الصيانة الدورية

#### تحديث التبعيات
```bash
# فحص الثغرات الأمنية
npm audit

# تحديث التبعيات الآمنة
npm update

# فحص التبعيات المستخدمة
npx depcheck

# تحديث TypeScript
npm install typescript@latest @types/react@latest @types/react-dom@latest
```

#### مراقبة الأداء
```typescript
// مراقبة استخدام الذاكرة
const logMemoryUsage = () => {
  if (performance.memory) {
    console.log('Memory Usage:', {
      used: Math.round(performance.memory.usedJSHeapSize / 1048576),
      total: Math.round(performance.memory.totalJSHeapSize / 1048576),
      limit: Math.round(performance.memory.jsHeapSizeLimit / 1048576)
    });
  }
};

// مراقبة كل 30 ثانية
setInterval(logMemoryUsage, 30000);
```

## الميزات الجديدة والتحسينات

### الإصدار 4.3 - التحديثات الأخيرة

#### نظام إدارة المفضلة المحسن
```typescript
// نظام إدارة المفضلة الجديد
interface FavoritesManager {
  addToFavorites: (product: Product) => Promise<void>;
  removeFromFavorites: (productId: string) => Promise<void>;
  getFavorites: () => Product[];
  isFavorite: (productId: string) => boolean;
  syncWithStorage: () => Promise<void>;
}

// تنفيذ مدير المفضلة
class FavoritesManagerImpl implements FavoritesManager {
  private storageKey = 'eshro_favorites';
  private listeners: ((favorites: Product[]) => void)[] = [];

  async addToFavorites(product: Product): Promise<void> {
    try {
      const favorites = await this.getFavorites();
      if (!favorites.find(p => p.id === product.id)) {
        favorites.push({ ...product, dateAdded: new Date().toISOString() });
        await this.saveFavorites(favorites);
        this.notifyListeners(favorites);
      }
    } catch (error) {
      console.error('Error adding to favorites:', error);
      throw new Error('فشل في إضافة المنتج للمفضلة');
    }
  }

  async removeFromFavorites(productId: string): Promise<void> {
    try {
      const favorites = await this.getFavorites();
      const updatedFavorites = favorites.filter(p => p.id !== productId);
      await this.saveFavorites(updatedFavorites);
      this.notifyListeners(updatedFavorites);
    } catch (error) {
      console.error('Error removing from favorites:', error);
      throw new Error('فشل في حذف المنتج من المفضلة');
    }
  }

  async getFavorites(): Promise<Product[]> {
    try {
      const stored = localStorage.getItem(this.storageKey);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error getting favorites:', error);
      return [];
    }
  }

  isFavorite(productId: string): boolean {
    try {
      const favorites = JSON.parse(localStorage.getItem(this.storageKey) || '[]');
      return favorites.some((p: Product) => p.id === productId);
    } catch {
      return false;
    }
  }

  private async saveFavorites(favorites: Product[]): Promise<void> {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(favorites));
    } catch (error) {
      console.error('Error saving favorites:', error);
      throw new Error('فشل في حفظ المفضلة');
    }
  }

  private notifyListeners(favorites: Product[]): void {
    this.listeners.forEach(listener => listener(favorites));
  }

  subscribe(listener: (favorites: Product[]) => void): () => void {
    this.listeners.push(listener);
    return () => {
      const index = this.listeners.indexOf(listener);
      if (index > -1) this.listeners.splice(index, 1);
    };
  }
}
```

#### تحسينات لوحة تحكم المستخدم

**الميزات الجديدة:**
- **إدارة المفضلة المتقدمة**: إضافة وحذف المنتجات من المفضلة مع حفظ تلقائي في localStorage
- **واجهة مستخدم محسنة**: تحسين تجربة المستخدم في قسم المفضلة مع عرض أفضل للمنتجات
- **مزامنة البيانات**: مزامنة تلقائية بين الذاكرة المؤقتة وقاعدة البيانات المحلية
- **أداء محسن**: تحسين سرعة التحميل والاستجابة في لوحة التحكم

**تحسينات الأداء:**
```typescript
// تحسين استخدام الذاكرة
const memoryOptimization = {
  // تنظيف الذاكرة التلقائي
  cleanup: () => {
    if (performance.memory && performance.memory.usedJSHeapSize > 50 * 1024 * 1024) {
      // تنظيف المكونات غير المستخدمة
      gc(); // إجبار جمع القمامة
    }
  },

  // مراقبة استخدام الذاكرة
  monitor: () => {
    const usage = performance.memory;
    console.log('Memory Usage:', {
      used: Math.round(usage.usedJSHeapSize / 1048576),
      total: Math.round(usage.totalJSHeapSize / 1048576),
      percentage: Math.round((usage.usedJSHeapSize / usage.totalJSHeapSize) * 100)
    });
  }
};

// مراقبة كل 30 ثانية
setInterval(memoryOptimization.monitor, 30000);
```

#### تحسينات الأمان الجديدة

**تشفير البيانات المحسن:**
```typescript
// تشفير متقدم باستخدام Web Crypto API
const advancedEncryption = {
  async encrypt(text: string, key: string): Promise<string> {
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    const cryptoKey = await crypto.subtle.importKey(
      'raw',
      encoder.encode(key),
      'AES-GCM',
      false,
      ['encrypt']
    );

    const iv = crypto.getRandomValues(new Uint8Array(12));
    const encrypted = await crypto.subtle.encrypt(
      { name: 'AES-GCM', iv },
      cryptoKey,
      data
    );

    const combined = new Uint8Array(iv.length + encrypted.byteLength);
    combined.set(iv);
    combined.set(new Uint8Array(encrypted), iv.length);

    return btoa(String.fromCharCode(...combined));
  },

  async decrypt(encryptedText: string, key: string): Promise<string> {
    const combined = new Uint8Array(
      atob(encryptedText).split('').map(char => char.charCodeAt(0))
    );

    const iv = combined.slice(0, 12);
    const encrypted = combined.slice(12);

    const cryptoKey = await crypto.subtle.importKey(
      'raw',
      new TextEncoder().encode(key),
      'AES-GCM',
      false,
      ['decrypt']
    );

    const decrypted = await crypto.subtle.decrypt(
      { name: 'AES-GCM', iv },
      cryptoKey,
      encrypted
    );

    return new TextDecoder().decode(decrypted);
  }
};
```

#### تحسينات إمكانية الوصول

**دعم محسن للقارئات الشاشة:**
```typescript
// تحسين العلامات الدلالية
const improvedAccessibility = {
  // تحسين هيكل العناوين
  headingStructure: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],

  // تحسين النصوص البديلة
  altText: (product: Product) => {
    return `${product.name}، سعر ${product.price} دينار ليبي، فئة ${product.category}`;
  },

  // تحسين الروابط والأزرار
  buttonLabels: {
    addToCart: 'إضافة إلى سلة التسوق',
    removeFromCart: 'حذف من سلة التسوق',
    addToFavorites: 'إضافة إلى المفضلة',
    removeFromFavorites: 'حذف من المفضلة'
  }
};
```

## استكشاف الأخطاء وإصلاحها

### دليل استكشاف الأخطاء الشائعة

#### مشاكل الدفع
```typescript
// تشخيص أخطاء الدفع
const diagnosePaymentError = (error: any) => {
  console.error('Payment Error:', error);

  switch (error.code) {
    case 'INVALID_CARD':
      return 'بيانات البطاقة غير صحيحة';
    case 'INSUFFICIENT_FUNDS':
      return 'رصيد غير كافي';
    case 'NETWORK_ERROR':
      return 'خطأ في الشبكة، حاول مرة أخرى';
    default:
      return 'خطأ غير معروف في الدفع';
  }
};
```

#### مشاكل الأداء
```typescript
// تشخيص مشاكل الأداء
const diagnosePerformance = () => {
  // قياس وقت التحميل
  const loadTime = performance.now();

  // مراقبة استخدام الذاكرة
  const memoryInfo = performance.memory;

  // قياس سرعة الشبكة
  const connection = (navigator as any).connection;

  return {
    loadTime,
    memoryUsage: memoryInfo.usedJSHeapSize,
    networkType: connection?.effectiveType,
    downlink: connection?.downlink
  };
};
```

## الخاتمة

هذا التوثيق الفني يغطي جميع جوانب منصة EISHRO للتجارة الإلكترونية، من التنفيذ والتطوير إلى النشر والصيانة. المنصة مبنية بأحدث التقنيات وتتبع أفضل الممارسات في مجال التطوير.

**للحصول على المساعدة الفنية:**
- 📚 راجع هذا التوثيق أولاً
- 🐛 أبلغ عن الأخطاء في نظام التذاكر
- 💬 تواصل مع فريق التطوير
- 📖 اقرأ دليل المساهمة في المشروع

**نتمنى لك تجربة تطوير ممتازة مع منصة EISHRO!** 🚀

---

*هذا التوثيق محدث بتاريخ أكتوبر 2025 ويغطي الإصدار 4.3 من المنصة. للحصول على أحدث المعلومات، يرجى مراجعة المستودع الرسمي.*