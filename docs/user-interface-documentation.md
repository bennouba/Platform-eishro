# دليل واجهة المستخدم - EISHRO Platform

## نظرة عامة على التصميم

توفر منصة EISHRO تجربة مستخدم متطورة ومتجاوبة مع التركيز على سهولة الاستخدام والوصولية، مع دعم كامل للغة العربية ولغة RTL.

## الجدول الزمني

- **📅 آخر تحديث:** أكتوبر 2025
- **🔄 الإصدار:** 4.3
- **🎨 نظام التصميم:** Tailwind CSS + Shadcn/ui
- **📱 التصميم المتجاوب:** Mobile-first approach

---

## القسم الأول: تصميم النظام العام

### 1.1 نظام الألوان والعلامة التجارية

#### لوحة الألوان الأساسية
```css
/* الألوان الأساسية */
--primary: #3B82F6 (أزرق رئيسي)
--primary-foreground: #F8FAFC (أبيض رمادي)

/* ألوان الحالات */
--success: #10B981 (أخضر للنجاح)
--warning: #F59E0B (برتقالي للتحذير)
--error: #EF4444 (أحمر للخطأ)
--info: #3B82F6 (أزرق للمعلومات)

/* ألوان الخلفية */
--background: #FFFFFF (أبيض)
--muted: #F8FAFC (رمادي فاتح)
--card: #FFFFFF (أبيض للبطاقات)
```

#### تدرجات الألوان المستخدمة
- **Primary Gradient**: `from-primary to-primary/80`
- **Success Gradient**: `from-green-500 to-emerald-600`
- **Warning Gradient**: `from-orange-500 to-red-500`
- **Purple Gradient**: `from-purple-500 to-pink-500`

### 1.2 نظام الطباعة والخطوط

#### الخطوط المستخدمة
- **العربية الرئيسية**: Cairo (جميع الأوزان)
- **الإنجليزية الاحتياطية**: Inter
- **الخط الاحتياطي**: System fonts

#### مقاييس الخطوط
```css
/* عناوين الصفحات */
text-4xl md:text-5xl lg:text-6xl (عناوين رئيسية)
text-3xl md:text-4xl (عناوين فرعية)
text-xl md:text-2xl (عناوين الأقسام)

/* نصوص عامة */
text-base (نص عادي)
text-sm (نص صغير)
text-xs (نص مصغر جداً)
```

### 1.3 المساحات والتخطيط

#### نظام المساحات
- **صغيرة**: `gap-2`, `p-2`, `m-2` (8px)
- **متوسطة**: `gap-4`, `p-4`, `m-4` (16px)
- **كبيرة**: `gap-6`, `p-6`, `m-6` (24px)
- **كبيرة جداً**: `gap-8`, `p-8`, `m-8` (32px)

#### شبكة التخطيط
```css
/* الشبكة الرئيسية */
grid-cols-1 md:grid-cols-2 lg:grid-cols-3
grid-cols-1 md:grid-cols-3 lg:grid-cols-4
grid-cols-1 md:grid-cols-2 lg:grid-cols-5
```

---

## القسم الثاني: مكونات واجهة المستخدم

### 2.1 نظام البطاقات (Cards)

#### أنواع البطاقات المستخدمة

**البطاقة الأساسية**
```jsx
<Card className="hover:shadow-lg transition-all duration-300">
  <CardContent className="p-6">
    {/* محتوى البطاقة */}
  </CardContent>
</Card>
```

**البطاقة مع التدرج**
```jsx
<Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
  <CardContent className="p-6">
    {/* محتوى متدرج */}
  </CardContent>
</Card>
```

**البطاقة التفاعلية**
```jsx
<Card className="group hover:shadow-2xl transition-all duration-500 hover:scale-105 cursor-pointer">
  <CardContent className="p-6">
    {/* محتوى تفاعلي */}
  </CardContent>
</Card>
```

### 2.2 نظام الأزرار (Buttons)

#### أنواع الأزرار

**الزر الأساسي**
```jsx
<Button className="bg-primary hover:bg-primary/90">
  نص الزر
</Button>
```

**الزر الثانوي**
```jsx
<Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
  نص الزر
</Button>
```

**زر مع الأيقونة**
```jsx
<Button className="bg-gradient-to-r from-green-500 to-primary">
  <Icon className="h-4 w-4 mr-2" />
  نص الزر
</Button>
```

**زر الحجم الكبير**
```jsx
<Button size="lg" className="px-8 py-3 text-lg">
  زر كبير
</Button>
```

### 2.3 نظام التنقل (Navigation)

#### الهيدر الرئيسي
```jsx
<header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
  {/* محتوى الهيدر */}
</header>
```

#### الشريط الجانبي
```jsx
<nav className="space-y-2">
  {sidebarItems.map((item) => (
    <Button
      key={item.id}
      variant={activeSection === item.id ? "default" : "ghost"}
      className="w-full justify-between"
    >
      {/* محتوى عنصر التنقل */}
    </Button>
  ))}
</nav>
```

### 2.4 نظام النماذج (Forms)

#### حقول الإدخال
```jsx
<div className="space-y-2">
  <Label htmlFor="field-id">اسم الحقل</Label>
  <Input
    id="field-id"
    type="text"
    placeholder="نص توضيحي"
    className="text-right"
  />
</div>
```

#### قوائم الاختيار
```jsx
<select className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary">
  <option value="">اختر خياراً</option>
  {/* خيارات القائمة */}
</select>
```

---

## القسم الثالث: التفاعلات والحركات

### 3.1 الحركات والانتقالات

#### انتقالات التحويم
```css
.transition-all duration-300 hover:scale-105
.transition-colors hover:text-primary
.transition-shadow hover:shadow-lg
```

#### حركات التحميل
```css
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-fade-in { animation: fadeIn 0.6s ease-out; }
```

#### تأثيرات التحميل
```css
.animate-pulse (نبض بطيء)
.animate-bounce (ارتداد)
.animate-spin (دوران)
```

### 3.2 حالات التفاعل

#### حالات الأزرار
- **عادي**: `default`
- **تحويم**: `hover:bg-primary/90`
- **نشط**: `bg-primary`
- **معطل**: `disabled:opacity-50`

#### حالات حقول الإدخال
- **عادي**: `border-gray-300`
- **تركيز**: `focus:ring-2 focus:ring-primary focus:border-primary`
- **خطأ**: `border-red-500 focus:ring-red-500`

### 3.3 ردود الفعل البصرية

#### رسائل النجاح
```jsx
<div className="p-4 bg-green-50 border border-green-200 rounded-lg">
  <div className="flex items-center gap-2">
    <CheckCircle className="h-5 w-5 text-green-600" />
    <p className="text-green-800">تمت العملية بنجاح</p>
  </div>
</div>
```

#### رسائل الخطأ
```jsx
<div className="p-4 bg-red-50 border border-red-200 rounded-lg">
  <div className="flex items-center gap-2">
    <AlertCircle className="h-5 w-5 text-red-600" />
    <p className="text-red-800">حدث خطأ في العملية</p>
  </div>
</div>
```

#### رسائل التحذير
```jsx
<div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
  <div className="flex items-center gap-2">
    <AlertCircle className="h-5 w-5 text-orange-600" />
    <p className="text-orange-800">تحذير مهم</p>
  </div>
</div>
```

---

## القسم الرابع: صفحات واجهة المستخدم الرئيسية

### 4.1 الصفحة الرئيسية (Home Page)

#### هيكل الصفحة
1. **الهيدر**: التنقل والقائمة
2. **قسم البطل (Hero)**: العنوان الرئيسي والدعوة للعمل
3. **قسم الخدمات**: عرض الخدمات الأساسية
4. **معرض المتاجر**: عرض المتاجر المتاحة
5. **قسم الشركاء**: شركاء النجاح
6. **الفوتر**: معلومات التواصل والروابط

#### مكونات خاصة بالصفحة الرئيسية
- **FloatingCubes**: مكعبات متحركة للزينة
- **HeroSection**: قسم البطل الرئيسي
- **ServicesSection**: عرض الخدمات
- **StoresCarousel**: معرض المتاجر المتحرك
- **PartnersSection**: قسم الشركاء

### 4.2 لوحة تحكم المستخدم (Customer Dashboard)

#### التخطيط العام
```
┌─────────────────────────────────────┐
│            الهيدر العلوي            │
├─────────────────┬───────────────────┤
│                 │                   │
│   الشريط        │    المحتوى       │
│   الجانبي       │    الرئيسي       │
│   (250px)       │   (مرن)          │
│                 │                   │
└─────────────────┴───────────────────┘
```

#### أقسام لوحة التحكم
1. **لوحة المعلومات**: الإحصائيات والطلبات الأخيرة
2. **الطلبات**: قائمة جميع الطلبات وحالاتها
3. **المفضلة**: المنتجات المفضلة للمستخدم
4. **الإشعارات**: التنبيهات والتحديثات
5. **الاشتراكات**: إدارة الاشتراكات في المتاجر
6. **الملف الشخصي**: البيانات الشخصية وإعدادات الحساب

### 4.3 صفحة المتجر (Store Page)

#### تخطيط صفحة المتجر
- **هيدر المتجر**: معلومات المتجر والتنقل
- **معرض المنتجات**: شبكة المنتجات مع الفلترة
- **شريط البحث**: البحث والفلترة
- **تفاصيل المنتج**: نافذة منبثقة أو صفحة منفصلة
- **سلة التسوق**: عربة التسوق الجانبية

### 4.4 صفحة المنتج (Product Page)

#### عناصر صفحة المنتج
1. **معرض الصور**: صور المنتج الرئيسية والفرعية
2. **معلومات المنتج**: الاسم والوصف والسعر
3. **خيارات المنتج**: الأحجام والألوان والكمية
4. **أزرار العمل**: إضافة للسلة، الشراء السريع، المفضلة
5. **تقييمات العملاء**: المراجعات والتقييمات
6. **معلومات الشحن**: خيارات الشحن والتكلفة

### 4.5 صفحة سلة التسوق (Cart Page)

#### هيكل سلة التسوق
- **قائمة المنتجات**: جدول بالمنتجات المضافة
- **ملخص الطلب**: إجمالي السعر والخصومات
- **خيارات الشحن**: اختيار طريقة الشحن
- **زر الدفع**: الانتقال لصفحة الدفع

### 4.6 صفحة الدفع (Checkout Page)

#### خطوات عملية الدفع
1. **معلومات الشحن**: عنوان التسليم
2. **طريقة الدفع**: اختيار بوابة الدفع
3. **مراجعة الطلب**: تأكيد التفاصيل
4. **إتمام الدفع**: معالجة الدفع والتأكيد

---

## القسم الخامس: التصميم المتجاوب

### 5.1 نقاط التوقف (Breakpoints)

#### نقاط التوقف المستخدمة
```css
/* الهواتف الصغيرة */
sm: 640px
/* الأجهزة اللوحية */
md: 768px
/* أجهزة الكمبيوتر الصغيرة */
lg: 1024px
/* أجهزة الكمبيوتر الكبيرة */
xl: 1280px
/* شاشات كبيرة جداً */
2xl: 1536px
```

### 5.2 استراتيجية التصميم المتجاوب

#### نهج Mobile-First
```css
/* البداية بالتصميم المحمول */
.grid-cols-1 /* شبكة عمود واحد على الهواتف */

/* إضافة الأعمدة تدريجياً */
md:grid-cols-2 /* عمودان على الأجهزة اللوحية */
lg:grid-cols-3 /* ثلاثة أعمدة على أجهزة الكمبيوتر */
```

#### إخفاء وعرض العناصر
```jsx
{/* مرئي على أجهزة الكمبيوتر فقط */}
<div className="hidden md:block">
  محتوى سطح المكتب
</div>

{/* مرئي على الهواتف فقط */}
<div className="block md:hidden">
  محتوى الهاتف
</div>
```

### 5.3 تحسينات خاصة بالهواتف

#### قائمة الهاتف المحمول
```jsx
{/* قائمة قابلة للطي على الهواتف */}
{isMenuOpen && (
  <div className="md:hidden border-t bg-background/95 backdrop-blur p-4">
    {/* عناصر القائمة */}
  </div>
)}
```

#### أزرار اللمس
```jsx
{/* أزرار محسّنة للمس */}
<Button className="min-h-[44px] px-6 py-3">
  زر محسّن للمس
</Button>
```

---

## القسم السادس: إمكانية الوصول (Accessibility)

### 6.1 معايير الوصولية

#### التنقل بلوحة المفاتيح
- **Tab**: الانتقال بين العناصر التفاعلية
- **Enter/Space**: تفعيل الأزرار والروابط
- **Escape**: إغلاق النافذات المنبثقة
- **Arrow Keys**: التنقل داخل القوائم

#### مؤشرات التركيز
```css
/* مؤشر التركيز للوصولية */
.focus:outline-none:focus-visible:ring-2:focus-visible:ring-primary
```

### 6.2 نصوص التسمية والتوضيح

#### النصوص البديلة للصور
```jsx
<img
  src="/path/to/image.jpg"
  alt="وصف الصورة بالتفصيل"
  className="w-full h-full object-cover"
/>
```

#### تسميات حقول النماذج
```jsx
<Label htmlFor="email-input">البريد الإلكتروني</Label>
<Input
  id="email-input"
  type="email"
  aria-describedby="email-help"
  aria-invalid={errors.email ? "true" : "false"}
/>
```

### 6.3 التنقل بالشاشة القارئة

#### هيكل العناوين الهرمي
```jsx
<h1 className="text-3xl font-bold">عنوان الصفحة الرئيسي</h1>
<h2 className="text-2xl font-bold">عنوان القسم</h2>
<h3 className="text-xl font-semibold">عنوان القسم الفرعي</h3>
```

#### معالم ARIA
```jsx
<nav role="navigation" aria-label="التنقل الرئيسي">
<main role="main">
<footer role="contentinfo">
```

---

## القسم السابع: الأنماط والتأثيرات المتقدمة

### 7.1 التأثيرات البصرية

#### تأثير الزجاج (Glass Effect)
```css
.glass-effect {
  background: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.18);
}
```

#### تأثير التوهج (Neon Glow)
```css
.neon-glow {
  box-shadow: 0 0 20px rgba(59, 130, 246, 0.5),
              0 0 40px rgba(59, 130, 246, 0.3),
              0 0 60px rgba(59, 130, 246, 0.1);
}
```

#### تأثير الحدود المتدرجة
```css
.gradient-border {
  position: relative;
  background: linear-gradient(45deg, #3B82F6, #8B5CF6, #EC4899);
  padding: 2px;
  border-radius: 8px;
}
```

### 7.2 الحركات المتقدمة

#### حركة التلاشي والانزلاق
```css
@keyframes slideInFromLeft {
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.animate-slide-in-left {
  animation: slideInFromLeft 0.8s ease-out;
}
```

#### حركة النبض البطيء
```css
@keyframes pulseSlow {
  0%, 100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.05);
    opacity: 0.8;
  }
}

.animate-pulse-slow {
  animation: pulseSlow 3s ease-in-out infinite;
}
```

### 7.3 التأثيرات التفاعلية

#### تأثير التحويم المتقدم
```css
.group:hover .group-hover\:scale-110 {
  transform: scale(1.1);
}

.group:hover .group-hover\:rotate-3 {
  transform: rotate(3deg);
}
```

#### تأثير الضغط على الزر
```css
.active\:scale-95:active {
  transform: scale(0.95);
}
```

---

## القسم الثامن: أفضل الممارسات

### 8.1 إرشادات التصميم

#### مبادئ التصميم المستخدمة
1. **البساطة**: تصميم نظيف وبسيط
2. **الاتساق**: استخدام نفس الأنماط عبر المنصة
3. **الوضوح**: رسائل واضحة ومفهومة
4. **الوصولية**: سهولة الاستخدام للجميع
5. **الاستجابة**: تجربة متسقة على جميع الأجهزة

#### قواعد التصميم
- **التباعد**: استخدام نظام المساحات الثابت
- **الألوان**: عدم استخدام أكثر من 3 ألوان رئيسية في الشاشة الواحدة
- **الخطوط**: استخدام خط واحد رئيسي مع خط احتياطي
- **الصور**: ضمان جودة عالية وسرعة تحميل مناسبة

### 8.2 أداء وتحسين

#### تحسين الصور
- استخدام تنسيقات حديثة (WebP, AVIF)
- ضغط الصور بدون فقدان الجودة
- استخدام الصور المحملة كسلاً (Lazy Loading)
- تحديد أبعاد الصور مسبقاً

#### تحسين الخطوط
- تحميل الخطوط محلياً عند الإمكان
- استخدام fallbacks مناسبة
- تحسين وقت تحميل الخطوط

### 8.3 اختبار المستخدم

#### نقاط الاختبار الرئيسية
1. **التنقل**: سهولة الوصول لجميع الأقسام
2. **الأداء**: سرعة التحميل والاستجابة
3. **الوصولية**: إمكانية الاستخدام للجميع
4. **التوافق**: عمل صحيح على جميع المتصفحات والأجهزة

---

## الخاتمة

يوفر هذا الدليل نظرة شاملة على نظام تصميم واجهة المستخدم في منصة EISHRO، مع التركيز على تقديم تجربة مستخدم متميزة ومتسقة عبر جميع نقاط التفاعل.

**للحصول على المساعدة في التطوير:**
- 📚 راجع هذا الدليل أولاً
- 💬 استخدم الدردشة المباشرة للاستفسارات الفنية
- 📧 أرسل استفسارك عبر البريد الإلكتروني لفريق التطوير

**نتمنى لك تجربة تطوير ممتازة مع منصة EISHRO!** 🚀

---

*هذا الدليل محدث بتاريخ أكتوبر 2025 ويغطي الإصدار 4.3 من المنصة.*