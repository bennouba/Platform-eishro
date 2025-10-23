# تصميم قاعدة البيانات المرنة - EISHRO Platform

## نظرة عامة على تصميم قاعدة البيانات

بناءً على تحليل شامل لمتطلبات منصة EISHRO للتجارة الإلكترونية، تم تصميم قاعدة بيانات مرنة وقابلة للتوسع تدعم نمو المنصة وتطورها. التصميم يركز على الأداء، القابلية للتوسع، والمرونة في استيعاب متطلبات الأعمال المستقبلية.

## فلسفة التصميم

### مبادئ التصميم الأساسية

#### 1. المرونة والتوسع (Scalability)
```markdown
**الاعتبارات:**
- دعم آلاف المتاجر والملايين من المنتجات
- إمكانية إضافة كيانات جديدة دون تغيير الهيكل الأساسي
- دعم النمو السريع في عدد المستخدمين والطلبات

**الحلول:**
- استخدام جداول مرنة مع JSON fields
- تقسيم البيانات الأفقي (Horizontal Partitioning)
- فهرسة ذكية ومحسنة
```

#### 2. الأداء الأمثل (Performance)
```markdown
**الاعتبارات:**
- سرعة الاستعلامات العالية
- تقليل زمن الاستجابة
- تحسين استخدام الموارد

**الحلول:**
- فهرسة شاملة ومحسنة
- تخزين مؤقت ذكي (Caching)
- استعلامات محسنة ومجمعة
```

#### 3. سلامة البيانات (Data Integrity)
```markdown
**الاعتبارات:**
- ضمان دقة البيانات
- منع فقدان البيانات
- حماية من التلف والأخطاء

**الحلول:**
- قيود التحقق من الصحة (Constraints)
- معاملات قاعدة البيانات (Transactions)
- نسخ احتياطي تلقائي
```

## هيكل قاعدة البيانات الرئيسية

### 1. جدول المستخدمين (Users)

```sql
CREATE TABLE users (
  -- البيانات الأساسية
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  phone VARCHAR(20) UNIQUE,
  password_hash VARCHAR(255) NOT NULL,

  -- المعلومات الشخصية
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  avatar_url TEXT,
  date_of_birth DATE,
  gender VARCHAR(10),

  -- إعدادات الحساب
  account_type VARCHAR(20) DEFAULT 'customer' CHECK (account_type IN ('customer', 'merchant', 'admin')),
  email_verified BOOLEAN DEFAULT FALSE,
  phone_verified BOOLEAN DEFAULT FALSE,
  two_factor_enabled BOOLEAN DEFAULT FALSE,
  preferred_language VARCHAR(5) DEFAULT 'ar',

  -- الحالة والتتبع
  is_active BOOLEAN DEFAULT TRUE,
  last_login_at TIMESTAMP,
  login_attempts INTEGER DEFAULT 0,
  locked_until TIMESTAMP,

  -- البيانات التقنية
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_by UUID REFERENCES users(id),
  updated_by UUID REFERENCES users(id),

  -- فهارس محسنة
  CONSTRAINT chk_email_format CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
  CONSTRAINT chk_phone_format CHECK (phone IS NULL OR phone ~* '^\+?[1-9]\d{1,14}$')
);

-- فهارس الأداء
CREATE INDEX idx_users_email ON users(email) WHERE is_active = TRUE;
CREATE INDEX idx_users_phone ON users(phone) WHERE phone_verified = TRUE;
CREATE INDEX idx_users_account_type ON users(account_type, is_active);
CREATE INDEX idx_users_last_login ON users(last_login_at DESC) WHERE is_active = TRUE;
```

### 2. جدول المتاجر (Stores)

```sql
CREATE TABLE stores (
  -- البيانات الأساسية
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,

  -- الهوية البصرية
  logo_url TEXT,
  banner_url TEXT,
  favicon_url TEXT,
  theme_colors JSONB DEFAULT '{}',

  -- إعدادات المتجر
  store_type VARCHAR(50) CHECK (store_type IN ('nawaem', 'sheirine', 'delta', 'custom')),
  settings JSONB DEFAULT '{}',
  configuration JSONB DEFAULT '{}',

  -- معلومات العمل
  business_hours JSONB DEFAULT '{}',
  contact_info JSONB DEFAULT '{}',
  social_media JSONB DEFAULT '{}',

  -- الحالة والتتبع
  is_active BOOLEAN DEFAULT TRUE,
  is_verified BOOLEAN DEFAULT FALSE,
  verification_date TIMESTAMP,
  subscription_plan VARCHAR(50) DEFAULT 'basic',

  -- الموقع الجغرافي
  country VARCHAR(100) DEFAULT 'Libya',
  city VARCHAR(100),
  address TEXT,
  coordinates POINT,

  -- البيانات التقنية
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_by UUID REFERENCES users(id),
  updated_by UUID REFERENCES users(id),

  -- قيود التحقق
  CONSTRAINT chk_slug_format CHECK (slug ~* '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  CONSTRAINT chk_coordinates CHECK (coordinates IS NULL OR (ST_X(coordinates) BETWEEN -180 AND 180 AND ST_Y(coordinates) BETWEEN -90 AND 90))
);

-- فهارس الأداء
CREATE INDEX idx_stores_owner ON stores(owner_id, is_active);
CREATE INDEX idx_stores_slug ON stores(slug) WHERE is_active = TRUE;
CREATE INDEX idx_stores_type ON stores(store_type, is_active);
CREATE INDEX idx_stores_location ON stores(country, city) WHERE is_active = TRUE;
CREATE INDEX idx_stores_coordinates ON stores USING GIST(coordinates) WHERE coordinates IS NOT NULL;
```

### 3. جدول المنتجات (Products)

```sql
CREATE TABLE products (
  -- البيانات الأساسية
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  store_id UUID NOT NULL REFERENCES stores(id) ON DELETE CASCADE,
  sku VARCHAR(100) UNIQUE NOT NULL,
  name VARCHAR(500) NOT NULL,
  description TEXT,
  short_description VARCHAR(1000),

  -- التسعير والمخزون
  base_price DECIMAL(10,2) NOT NULL CHECK (base_price >= 0),
  sale_price DECIMAL(10,2) CHECK (sale_price >= 0 AND sale_price <= base_price),
  cost_price DECIMAL(10,2) CHECK (cost_price >= 0),
  currency VARCHAR(3) DEFAULT 'LYD',

  -- الفئات والتصنيف
  category_id UUID REFERENCES categories(id),
  subcategory_id UUID REFERENCES categories(id),
  tags TEXT[] DEFAULT '{}',
  attributes JSONB DEFAULT '{}',

  -- الوسائط والمحتوى
  main_image_url TEXT,
  gallery_images TEXT[] DEFAULT '{}',
  videos TEXT[] DEFAULT '{}',

  -- المتغيرات والخيارات
  variants JSONB DEFAULT '[]',
  options JSONB DEFAULT '{}',

  -- إدارة المخزون
  inventory_management BOOLEAN DEFAULT TRUE,
  stock_quantity INTEGER DEFAULT 0,
  low_stock_threshold INTEGER DEFAULT 5,
  stock_status VARCHAR(20) DEFAULT 'in_stock' CHECK (stock_status IN ('in_stock', 'out_of_stock', 'pre_order', 'discontinued')),

  -- الشحن والتسليم
  weight DECIMAL(8,3),
  dimensions JSONB DEFAULT '{}',
  shipping_info JSONB DEFAULT '{}',

  -- الحالة والنشر
  status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived', 'scheduled')),
  published_at TIMESTAMP,
  featured BOOLEAN DEFAULT FALSE,
  allow_backorders BOOLEAN DEFAULT FALSE,

  -- الإحصائيات والتحليلات
  views_count INTEGER DEFAULT 0,
  sales_count INTEGER DEFAULT 0,
  rating_average DECIMAL(3,2) DEFAULT 0,
  reviews_count INTEGER DEFAULT 0,

  -- محركات البحث
  search_keywords TEXT[] DEFAULT '{}',
  search_boost DECIMAL(3,2) DEFAULT 1.0,

  -- البيانات التقنية
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_by UUID REFERENCES users(id),
  updated_by UUID REFERENCES users(id),

  -- قيود التحقق
  CONSTRAINT chk_prices CHECK (sale_price IS NULL OR sale_price <= base_price),
  CONSTRAINT chk_stock CHECK (stock_quantity >= 0),
  CONSTRAINT chk_rating CHECK (rating_average >= 0 AND rating_average <= 5)
);

-- فهارس الأداء
CREATE INDEX idx_products_store ON products(store_id, status) WHERE status = 'published';
CREATE INDEX idx_products_category ON products(category_id, status) WHERE status = 'published';
CREATE INDEX idx_products_sku ON products(sku) WHERE is_active = TRUE;
CREATE INDEX idx_products_price ON products(base_price, sale_price) WHERE status = 'published';
CREATE INDEX idx_products_stock ON products(stock_status, stock_quantity) WHERE inventory_management = TRUE;
CREATE INDEX idx_products_featured ON products(featured, published_at DESC) WHERE status = 'published';
CREATE INDEX idx_products_search ON products USING GIN(search_keywords) WHERE status = 'published';
```

### 4. جدول الطلبات (Orders)

```sql
CREATE TABLE orders (
  -- البيانات الأساسية
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number VARCHAR(50) UNIQUE NOT NULL,
  store_id UUID NOT NULL REFERENCES stores(id) ON DELETE CASCADE,
  customer_id UUID REFERENCES users(id) ON DELETE SET NULL,

  -- معلومات العميل
  customer_info JSONB NOT NULL,
  shipping_address JSONB NOT NULL,
  billing_address JSONB,

  -- تفاصيل الطلب
  items JSONB NOT NULL,
  subtotal DECIMAL(10,2) NOT NULL,
  shipping_cost DECIMAL(10,2) DEFAULT 0,
  tax_amount DECIMAL(10,2) DEFAULT 0,
  discount_amount DECIMAL(10,2) DEFAULT 0,
  total_amount DECIMAL(10,2) NOT NULL,

  -- طريقة الدفع والشحن
  payment_method VARCHAR(50) NOT NULL,
  shipping_method VARCHAR(50) NOT NULL,
  shipping_carrier VARCHAR(100),

  -- حالة الطلب
  status VARCHAR(30) DEFAULT 'pending' CHECK (status IN (
    'pending', 'confirmed', 'processing', 'ready_for_shipping',
    'shipped', 'out_for_delivery', 'delivered', 'cancelled',
    'refunded', 'returned', 'failed'
  )),
  payment_status VARCHAR(30) DEFAULT 'pending' CHECK (payment_status IN (
    'pending', 'paid', 'failed', 'cancelled', 'refunded', 'partially_refunded'
  )),

  -- التتبع والتسليم
  tracking_number VARCHAR(100),
  shipped_at TIMESTAMP,
  delivered_at TIMESTAMP,
  estimated_delivery_date DATE,

  -- الملاحظات والتواصل
  customer_notes TEXT,
  internal_notes TEXT,
  tags TEXT[] DEFAULT '{}',

  -- البيانات التقنية
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_by UUID REFERENCES users(id),
  updated_by UUID REFERENCES users(id),

  -- قيود التحقق
  CONSTRAINT chk_amounts CHECK (total_amount >= 0),
  CONSTRAINT chk_subtotal CHECK (subtotal >= 0)
);

-- فهارس الأداء
CREATE INDEX idx_orders_store ON orders(store_id, status, created_at DESC);
CREATE INDEX idx_orders_customer ON orders(customer_id, created_at DESC) WHERE customer_id IS NOT NULL;
CREATE INDEX idx_orders_status ON orders(status, created_at DESC);
CREATE INDEX idx_orders_payment ON orders(payment_status, created_at DESC);
CREATE INDEX idx_orders_tracking ON orders(tracking_number) WHERE tracking_number IS NOT NULL;
CREATE INDEX idx_orders_date_range ON orders(created_at DESC) WHERE created_at >= CURRENT_DATE - INTERVAL '90 days';
```

### 5. جدول الفئات (Categories)

```sql
CREATE TABLE categories (
  -- البيانات الأساسية
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,

  -- التسلسل الهرمي
  parent_id UUID REFERENCES categories(id),
  level INTEGER DEFAULT 0,
  path TEXT, -- مسار الفئة الكامل (مثل: electronics/phones/smartphones)

  -- المحتوى والوسائط
  image_url TEXT,
  icon VARCHAR(100),
  color VARCHAR(7), -- رمز اللون السداسي

  -- الإعدادات
  is_active BOOLEAN DEFAULT TRUE,
  is_featured BOOLEAN DEFAULT FALSE,
  sort_order INTEGER DEFAULT 0,

  -- محركات البحث
  search_keywords TEXT[] DEFAULT '{}',
  meta_title VARCHAR(255),
  meta_description TEXT,

  -- البيانات التقنية
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_by UUID REFERENCES users(id),
  updated_by UUID REFERENCES users(id),

  -- قيود التحقق
  CONSTRAINT chk_slug_format CHECK (slug ~* '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  CONSTRAINT chk_level CHECK (level >= 0),
  CONSTRAINT chk_sort_order CHECK (sort_order >= 0)
);

-- فهارس الأداء
CREATE INDEX idx_categories_parent ON categories(parent_id, sort_order) WHERE is_active = TRUE;
CREATE INDEX idx_categories_level ON categories(level, sort_order) WHERE is_active = TRUE;
CREATE INDEX idx_categories_featured ON categories(is_featured, sort_order DESC) WHERE is_active = TRUE;
CREATE INDEX idx_categories_path ON categories(path) WHERE is_active = TRUE;
```

## جداول إضافية للميزات المتقدمة

### 6. جدول تقييمات المنتجات (Product Reviews)

```sql
CREATE TABLE product_reviews (
  -- البيانات الأساسية
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  customer_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,

  -- محتوى التقييم
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  title VARCHAR(255),
  comment TEXT,
  pros TEXT[] DEFAULT '{}',
  cons TEXT[] DEFAULT '{}',

  -- الوسائط المرفقة
  images TEXT[] DEFAULT '{}',
  videos TEXT[] DEFAULT '{}',

  -- الحالة والنشر
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'hidden')),
  is_verified_purchase BOOLEAN DEFAULT TRUE,
  is_featured BOOLEAN DEFAULT FALSE,

  -- المساعدة والتفاعل
  helpful_count INTEGER DEFAULT 0,
  response TEXT, -- رد التاجر على التقييم
  responded_at TIMESTAMP,
  responded_by UUID REFERENCES users(id),

  -- البيانات التقنية
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  -- قيود التحقق
  CONSTRAINT chk_rating_range CHECK (rating >= 1 AND rating <= 5),
  CONSTRAINT unique_review_per_order UNIQUE(product_id, order_id)
);

-- فهارس الأداء
CREATE INDEX idx_reviews_product ON product_reviews(product_id, status, created_at DESC);
CREATE INDEX idx_reviews_customer ON product_reviews(customer_id, created_at DESC);
CREATE INDEX idx_reviews_rating ON product_reviews(rating, status) WHERE status = 'approved';
CREATE INDEX idx_reviews_featured ON product_reviews(is_featured, helpful_count DESC) WHERE status = 'approved';
```

### 7. جدول المدفوعات (Payments)

```sql
CREATE TABLE payments (
  -- البيانات الأساسية
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  transaction_id VARCHAR(255) UNIQUE NOT NULL,

  -- تفاصيل الدفع
  amount DECIMAL(10,2) NOT NULL,
  currency VARCHAR(3) DEFAULT 'LYD',
  payment_method VARCHAR(50) NOT NULL,
  payment_gateway VARCHAR(50) NOT NULL,

  -- معلومات البطاقة/الحساب (مشفرة)
  card_info JSONB, -- مشفرة ومحمية
  billing_info JSONB,

  -- حالة الدفع
  status VARCHAR(30) NOT NULL CHECK (status IN (
    'pending', 'processing', 'completed', 'failed',
    'cancelled', 'refunded', 'partially_refunded'
  )),
  failure_reason TEXT,
  failure_code VARCHAR(50),

  -- التواريخ والتوقيت
  processed_at TIMESTAMP,
  completed_at TIMESTAMP,
  failed_at TIMESTAMP,

  -- البيانات التقنية
  gateway_response JSONB,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  -- قيود التحقق
  CONSTRAINT chk_amount_positive CHECK (amount > 0)
);

-- فهارس الأداء
CREATE INDEX idx_payments_order ON payments(order_id, status);
CREATE INDEX idx_payments_transaction ON payments(transaction_id) WHERE status IN ('completed', 'refunded');
CREATE INDEX idx_payments_status ON payments(status, created_at DESC);
CREATE INDEX idx_payments_gateway ON payments(payment_gateway, status, created_at DESC);
```

### 8. جدول الشحنات (Shipments)

```sql
CREATE TABLE shipments (
  -- البيانات الأساسية
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  tracking_number VARCHAR(100) UNIQUE NOT NULL,

  -- معلومات الشحن
  carrier_name VARCHAR(100) NOT NULL,
  carrier_service VARCHAR(100),
  shipping_method VARCHAR(50) NOT NULL,

  -- العناوين والمواقع
  origin_address JSONB,
  destination_address JSONB NOT NULL,
  pickup_location VARCHAR(255),

  -- التكلفة والوزن
  shipping_cost DECIMAL(10,2) DEFAULT 0,
  weight DECIMAL(8,3),
  dimensions JSONB,

  -- حالة الشحنة
  status VARCHAR(30) NOT NULL CHECK (status IN (
    'pending', 'confirmed', 'picked_up', 'in_transit',
    'out_for_delivery', 'delivered', 'failed', 'returned'
  )),

  -- التواريخ والتوقيت
  estimated_delivery_date DATE,
  shipped_at TIMESTAMP,
  delivered_at TIMESTAMP,
  estimated_delivery_at TIMESTAMP,

  -- التتبع والتحديثات
  tracking_updates JSONB[] DEFAULT '{}',
  current_location POINT,
  last_update_at TIMESTAMP,

  -- البيانات التقنية
  carrier_tracking_url TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  -- قيود التحقق
  CONSTRAINT chk_shipping_cost CHECK (shipping_cost >= 0)
);

-- فهارس الأداء
CREATE INDEX idx_shipments_order ON shipments(order_id, status);
CREATE INDEX idx_shipments_tracking ON shipments(tracking_number) WHERE status NOT IN ('delivered', 'failed');
CREATE INDEX idx_shipments_carrier ON shipments(carrier_name, status, created_at DESC);
CREATE INDEX idx_shipments_status ON shipments(status, estimated_delivery_date);
CREATE INDEX idx_shipments_location ON shipments USING GIST(current_location) WHERE current_location IS NOT NULL;
```

## جداول نظام إدارة العلاقات مع العملاء (CRM)

### 9. جدول العملاء (Customers)

```sql
CREATE TABLE customers (
  -- البيانات الأساسية
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20),

  -- المعلومات الشخصية
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  date_of_birth DATE,
  gender VARCHAR(10),

  -- تفضيلات العميل
  preferences JSONB DEFAULT '{}',
  marketing_consent BOOLEAN DEFAULT FALSE,
  newsletter_subscription BOOLEAN DEFAULT FALSE,

  -- إحصائيات العميل
  total_orders INTEGER DEFAULT 0,
  total_spent DECIMAL(10,2) DEFAULT 0,
  average_order_value DECIMAL(10,2) DEFAULT 0,
  last_order_date DATE,
  first_order_date DATE,

  -- تجزئة العملاء
  customer_segment VARCHAR(50) DEFAULT 'new' CHECK (customer_segment IN ('new', 'bronze', 'silver', 'gold', 'platinum')),
  lifetime_value DECIMAL(10,2) DEFAULT 0,
  churn_risk_score DECIMAL(3,2) DEFAULT 0,

  -- البيانات التقنية
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  -- قيود التحقق
  CONSTRAINT chk_email_format CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$')
);

-- فهارس الأداء
CREATE INDEX idx_customers_user ON customers(user_id) WHERE user_id IS NOT NULL;
CREATE INDEX idx_customers_email ON customers(email);
CREATE INDEX idx_customers_segment ON customers(customer_segment, lifetime_value DESC);
CREATE INDEX idx_customers_last_order ON customers(last_order_date DESC) WHERE total_orders > 0;
```

### 10. جدول تذاكر الدعم (Support Tickets)

```sql
CREATE TABLE support_tickets (
  -- البيانات الأساسية
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ticket_number VARCHAR(20) UNIQUE NOT NULL,
  customer_id UUID NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
  store_id UUID REFERENCES stores(id) ON DELETE CASCADE,

  -- محتوى التذكرة
  subject VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  priority VARCHAR(20) DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
  category VARCHAR(50) NOT NULL,
  subcategory VARCHAR(50),

  -- الحالة والتتبع
  status VARCHAR(30) DEFAULT 'open' CHECK (status IN (
    'open', 'in_progress', 'waiting_for_response', 'resolved', 'closed', 'cancelled'
  )),
  assigned_to UUID REFERENCES users(id),
  assigned_at TIMESTAMP,

  -- الوسائط المرفقة
  attachments TEXT[] DEFAULT '{}',

  -- المقاييس والجودة
  satisfaction_rating INTEGER CHECK (satisfaction_rating >= 1 AND satisfaction_rating <= 5),
  first_response_time INTERVAL,
  resolution_time INTERVAL,
  reopened_count INTEGER DEFAULT 0,

  -- البيانات التقنية
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  resolved_at TIMESTAMP,
  closed_at TIMESTAMP,

  -- قيود التحقق
  CONSTRAINT chk_satisfaction CHECK (satisfaction_rating IS NULL OR (satisfaction_rating >= 1 AND satisfaction_rating <= 5))
);

-- فهارس الأداء
CREATE INDEX idx_tickets_customer ON support_tickets(customer_id, status, created_at DESC);
CREATE INDEX idx_tickets_store ON support_tickets(store_id, status, created_at DESC) WHERE store_id IS NOT NULL;
CREATE INDEX idx_tickets_assigned ON support_tickets(assigned_to, status) WHERE assigned_to IS NOT NULL;
CREATE INDEX idx_tickets_priority ON support_tickets(priority, status, created_at DESC);
CREATE INDEX idx_tickets_category ON support_tickets(category, status);
```

## جداول التحليلات والتقارير

### 11. جدول التحليلات (Analytics)

```sql
CREATE TABLE analytics_events (
  -- البيانات الأساسية
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_type VARCHAR(50) NOT NULL,
  entity_type VARCHAR(50) NOT NULL, -- product, store, order, user
  entity_id UUID NOT NULL,

  -- بيانات الحدث
  event_data JSONB DEFAULT '{}',
  user_agent TEXT,
  ip_address INET,
  user_id UUID REFERENCES users(id),
  session_id VARCHAR(255),

  -- الموقع والجغرافيا
  country VARCHAR(100),
  city VARCHAR(100),
  coordinates POINT,

  -- البيانات التقنية
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  -- فهارس الأداء
  CONSTRAINT chk_entity_type CHECK (entity_type IN ('product', 'store', 'order', 'user', 'page', 'search'))
);

-- فهارس الأداء
CREATE INDEX idx_analytics_entity ON analytics_events(entity_type, entity_id, created_at DESC);
CREATE INDEX idx_analytics_event_type ON analytics_events(event_type, created_at DESC);
CREATE INDEX idx_analytics_user ON analytics_events(user_id, created_at DESC) WHERE user_id IS NOT NULL;
CREATE INDEX idx_analytics_location ON analytics_events(country, city, created_at DESC);
CREATE INDEX idx_analytics_date_range ON analytics_events(created_at DESC) WHERE created_at >= CURRENT_DATE - INTERVAL '30 days';

-- جدول مجمع للإحصائيات اليومية
CREATE TABLE daily_analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  date DATE NOT NULL,
  entity_type VARCHAR(50) NOT NULL,
  entity_id UUID NOT NULL,

  -- المقاييس الأساسية
  views_count INTEGER DEFAULT 0,
  clicks_count INTEGER DEFAULT 0,
  conversions_count INTEGER DEFAULT 0,
  revenue DECIMAL(10,2) DEFAULT 0,

  -- بيانات إضافية
  metadata JSONB DEFAULT '{}',

  -- البيانات التقنية
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  -- قيود التحقق
  CONSTRAINT unique_daily_analytics UNIQUE(date, entity_type, entity_id)
);

-- فهارس الأداء
CREATE INDEX idx_daily_analytics_date ON daily_analytics(date DESC);
CREATE INDEX idx_daily_analytics_entity ON daily_analytics(entity_type, entity_id, date DESC);
CREATE INDEX idx_daily_analytics_revenue ON daily_analytics(revenue DESC) WHERE revenue > 0;
```

## استراتيجية الفهرسة والأداء

### فهارس الأداء المحسنة

#### 1. فهارس مركبة للاستعلامات الشائعة
```sql
-- فهرس للبحث في المنتجات
CREATE INDEX CONCURRENTLY idx_products_search_composite ON products (
  store_id, status, category_id, base_price
) WHERE status = 'published' AND is_active = TRUE;

-- فهرس للطلبات حسب المتجر والحالة
CREATE INDEX CONCURRENTLY idx_orders_store_status_date ON orders (
  store_id, status, created_at DESC
) WHERE created_at >= CURRENT_DATE - INTERVAL '90 days';

-- فهرس للعملاء حسب النشاط
CREATE INDEX CONCURRENTLY idx_customers_activity_score ON customers (
  total_orders DESC, last_order_date DESC, lifetime_value DESC
) WHERE is_active = TRUE;
```

#### 2. فهارس جزئية للبيانات النشطة
```sql
-- فهرس للمنتجات المنشورة فقط
CREATE INDEX CONCURRENTLY idx_products_published_only ON products (
  name, category_id, base_price
) WHERE status = 'published' AND in_stock = TRUE;

-- فهرس للمتاجر النشطة فقط
CREATE INDEX CONCURRENTLY idx_stores_active_only ON stores (
  name, store_type, city
) WHERE is_active = TRUE AND is_verified = TRUE;

-- فهرس للطلبات المكتملة فقط
CREATE INDEX CONCURRENTLY idx_orders_completed_only ON orders (
  store_id, total_amount, created_at DESC
) WHERE status = 'delivered' AND payment_status = 'paid';
```

#### 3. فهارس للبحث والتصفية
```sql
-- فهرس للبحث في النصوص
CREATE INDEX CONCURRENTLY idx_products_search_text ON products USING GIN (
  to_tsvector('arabic', name || ' ' || COALESCE(description, ''))
) WHERE status = 'published';

-- فهرس للتصفية بالنطاق السعري
CREATE INDEX CONCURRENTLY idx_products_price_range ON products (
  base_price, sale_price
) WHERE status = 'published' AND in_stock = TRUE;

-- فهرس للتصفية بالتقييم
CREATE INDEX CONCURRENTLY idx_products_rating_filter ON products (
  rating_average DESC, reviews_count DESC
) WHERE status = 'published' AND reviews_count > 0;
```

## استراتيجية النسخ الاحتياطي والاسترداد

### خطة النسخ الاحتياطي

#### 1. النسخ الاحتياطي التلقائي
```sql
-- جدولة النسخ الاحتياطي اليومي
SELECT cron.schedule(
  'daily-backup',
  '0 2 * * *', -- الساعة 2 صباحاً يومياً
  'SELECT backup_database();'
);

-- جدولة النسخ الاحتياطي الأسبوعي الكامل
SELECT cron.schedule(
  'weekly-full-backup',
  '0 3 * * 0', -- الساعة 3 صباحاً كل أحد
  'SELECT full_backup_with_validation();'
);
```

#### 2. استراتيجية الاسترداد
```markdown
**مستويات الاسترداد:**
- **المستوى 1:** استرداد ملف/جدول واحد (دقائق)
- **المستوى 2:** استرداد قاعدة بيانات كاملة (ساعات)
- **المستوى 3:** استرداد النظام بالكامل (أيام)

**إجراءات الاسترداد:**
1. عزل النظام المتأثر
2. تشخيص سبب المشكلة
3. اختيار نقطة الاسترداد المناسبة
4. تنفيذ عملية الاسترداد
5. التحقق من سلامة البيانات
6. إعادة تشغيل النظام
```

## الأمان والحماية

### تشفير البيانات الحساسة

#### 1. تشفير البيانات في حالة الراحة
```sql
-- جدول للبيانات الحساسة المشفرة
CREATE TABLE sensitive_data (
  id UUID PRIMARY KEY,
  entity_type VARCHAR(50) NOT NULL,
  entity_id UUID NOT NULL,
  data_key VARCHAR(100) NOT NULL,
  encrypted_value TEXT NOT NULL,

  -- البيانات التقنية
  encryption_algorithm VARCHAR(50) DEFAULT 'AES-256-GCM',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  -- قيود التحقق
  CONSTRAINT chk_algorithm CHECK (encryption_algorithm IN ('AES-256-GCM', 'ChaCha20-Poly1305'))
);

-- فهرس للبحث السريع
CREATE INDEX idx_sensitive_data_entity ON sensitive_data(entity_type, entity_id);
```

#### 2. تشفير البيانات أثناء النقل
```sql
-- ضمان تشفير جميع الاتصالات
ALTER DATABASE eishro SET ssl = on;
ALTER DATABASE eishro SET ssl_cert_file = '/path/to/server.crt';
ALTER DATABASE eishro SET ssl_key_file = '/path/to/server.key';
ALTER DATABASE eishro SET ssl_ca_file = '/path/to/ca.crt';
```

## مراقبة الأداء والصحة

### جداول مراقبة النظام

#### 1. جدول مراقبة الأداء (Performance Metrics)
```sql
CREATE TABLE performance_metrics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  metric_name VARCHAR(100) NOT NULL,
  metric_value DECIMAL(15,4) NOT NULL,
  unit VARCHAR(20) NOT NULL,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  -- السياق والتصنيف
  category VARCHAR(50) NOT NULL,
  subcategory VARCHAR(50),
  metadata JSONB DEFAULT '{}',

  -- قيود التحقق
  CONSTRAINT chk_metric_value CHECK (metric_value >= 0)
);

-- فهرس للاستعلامات الزمنية
CREATE INDEX idx_performance_metrics_time ON performance_metrics(timestamp DESC);
CREATE INDEX idx_performance_metrics_category ON performance_metrics(category, timestamp DESC);
```

#### 2. جدول مراقبة الأخطاء (Error Tracking)
```sql
CREATE TABLE error_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  error_level VARCHAR(20) NOT NULL CHECK (error_level IN ('debug', 'info', 'warning', 'error', 'critical')),
  error_message TEXT NOT NULL,
  error_stack TEXT,
  error_code VARCHAR(50),

  -- السياق والموقع
  user_id UUID REFERENCES users(id),
  session_id VARCHAR(255),
  request_url TEXT,
  user_agent TEXT,
  ip_address INET,

  -- البيانات التقنية
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  -- قيود التحقق
  CONSTRAINT chk_error_level CHECK (error_level IN ('debug', 'info', 'warning', 'error', 'critical'))
);

-- فهارس للتحليل والتشخيص
CREATE INDEX idx_error_logs_level ON error_logs(error_level, created_at DESC);
CREATE INDEX idx_error_logs_user ON error_logs(user_id, created_at DESC) WHERE user_id IS NOT NULL;
CREATE INDEX idx_error_logs_code ON error_logs(error_code, created_at DESC) WHERE error_code IS NOT NULL;
```

## خطة التوسع والنمو

### استراتيجية تقسيم البيانات

#### 1. التقسيم الأفقي (Horizontal Partitioning)
```sql
-- تقسيم جدول الطلبات حسب التاريخ
CREATE TABLE orders_y2024m01 PARTITION OF orders
FOR VALUES FROM ('2024-01-01') TO ('2024-02-01');

CREATE TABLE orders_y2024m02 PARTITION OF orders
FOR VALUES FROM ('2024-02-01') TO ('2024-03-01');

-- تقسيم تلقائي للأشهر الجديدة
CREATE TABLE orders_default PARTITION OF orders DEFAULT;
```

#### 2. التقسيم الرأسي (Vertical Partitioning)
```sql
-- فصل البيانات الساخنة عن الباردة
CREATE TABLE orders_active AS
SELECT * FROM orders
WHERE created_at >= CURRENT_DATE - INTERVAL '90 days';

CREATE TABLE orders_archive AS
SELECT * FROM orders
WHERE created_at < CURRENT_DATE - INTERVAL '90 days';
```

## الخاتمة والتوصيات

### نقاط القوة في التصميم

#### ✅ المرونة والتوسع
- دعم نمو غير محدود في عدد المتاجر والمنتجات
- إمكانية إضافة ميزات جديدة دون تغيير الهيكل الأساسي
- تقسيم ذكي للبيانات حسب الحاجة

#### ✅ الأداء العالي
- فهرسة شاملة ومحسنة لجميع الاستعلامات الشائعة
- تخزين مؤقت ذكي للبيانات المستخدمة بشكل متكرر
- استعلامات محسنة ومجمعة

#### ✅ الأمان المتقدم
- تشفير شامل للبيانات الحساسة
- مراقبة مستمرة للأداء والأمان
- حماية من الثغرات والاختراقات

### التوصيات للتنفيذ

#### 1. مراحل التنفيذ
```markdown
**المرحلة الأولى:** الجداول الأساسية (Users, Stores, Products, Orders)
**المرحلة الثانية:** جداول الدعم (Reviews, Payments, Shipments)
**المرحلة الثالثة:** نظام CRM (Customers, Support Tickets)
**المرحلة الرابعة:** التحليلات والمراقبة (Analytics, Performance)
```

#### 2. أدوات التنفيذ الموصى بها
```markdown
**قاعدة البيانات:** PostgreSQL 15+ مع PostGIS extension
**أدوات الهجرة:** Flyway أو Liquibase
**النسخ الاحتياطي:** Barman أو pgBackRest
**المراقبة:** Grafana + Prometheus
```

#### 3. اعتبارات الأداء
```markdown
**الحد الأدنى للموارد:**
- CPU: 4 cores
- RAM: 16GB
- Storage: 100GB SSD
- Network: 1Gbps

**الموارد الموصى بها:**
- CPU: 8+ cores
- RAM: 32GB+
- Storage: 500GB NVMe SSD
- Network: 10Gbps
```

هذا التصميم يوفر أساساً قوياً ومرناً لمنصة EISHRO، قادر على دعم نمو المنصة وتطورها مع الحفاظ على الأداء العالي والأمان المتقدم.

---

*هذا التصميم محدث بتاريخ أكتوبر 2025 ويعكس متطلبات المشروع الحالية والمستقبلية.*