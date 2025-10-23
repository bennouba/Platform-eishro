import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { 
  ArrowLeft, 
  ShoppingCart, 
  Plus, 
  Minus, 
  Trash2,
  MapPin,
  CreditCard,
  Truck,
  Clock,
  Tag,
  Check,
  X
} from "lucide-react";
import MoamalatOfficialLightbox from "@/components/MoamalatOfficialLightbox";
import { citiesData, shippingData, paymentMethods, availableCoupons, generateOrderId } from "@/data/ecommerceData";
import CouponMessageModal from "@/components/CouponMessageModal";

interface CartItem {
  id: number;
  product: any;
  size: string;
  color: string;
  quantity: number;
}

interface CartPageProps {
  cartItems: CartItem[];
  onBack: () => void;
  onUpdateQuantity: (itemId: number, quantity: number) => void;
  onRemoveItem: (itemId: number) => void;
  onOrderComplete: (orderData: any) => void;
}

const CartPage: React.FC<CartPageProps> = ({
  cartItems,
  onBack,
  onUpdateQuantity,
  onRemoveItem,
  onOrderComplete
}) => {
  const [currentStep, setCurrentStep] = useState<'cart' | 'checkout' | 'payment'>('cart');
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<any>(null);

  const [showCouponModal, setShowCouponModal] = useState(false);
  const [couponModalType, setCouponModalType] = useState<'success' | 'error'>('success');
  const [couponModalMessage, setCouponModalMessage] = useState('');
  
  // بيانات العميل
  const [customerData, setCustomerData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    alternativePhone: '',
    city: '',
    area: '',
    address: '',
    currentLocation: false
  });
  
  // خيارات الطلب
  const [paymentMethod, setPaymentMethod] = useState<'onDelivery' | 'immediate'>('onDelivery');
  const [paymentType, setPaymentType] = useState('');
  const [shippingType, setShippingType] = useState('normal-tripoli');
  const [notes, setNotes] = useState('');

  // حساب تكلفة الشحن
  function getShippingCost(city: string, type: string): number {
    if (!type) return 0;
    
    // استخدام أنواع الشحن الجديدة
    switch(type) {
      case 'normal-tripoli':
        return Math.floor(Math.random() * 16) + 30; // 30-45
      case 'normal-outside':
        return Math.floor(Math.random() * 36) + 50; // 50-85
      case 'express-tripoli':
        return Math.floor(Math.random() * 36) + 85; // 85-120
      case 'express-outside':
        return Math.floor(Math.random() * 66) + 120; // 120-185
      default:
        return 30;
    }
  }

  // حساب الإجماليات
  const subtotal = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const discountAmount = appliedCoupon ? Math.round(subtotal * (appliedCoupon.discount / 100)) : 0;
  const shippingCost = getShippingCost(customerData.city, shippingType);
  const total = subtotal - discountAmount + shippingCost;

  // تطبيق كوبون التخفيض - بدون حد أدنى
  const applyCoupon = () => {
    if (couponCode.trim() === '') {
      setCouponModalType('error');
      setCouponModalMessage('يرجى إدخال كوبون التخفيض');
      setShowCouponModal(true);
      return;
    }

    // البحث عن الكوبون المحفوظ من واجهة الترحيب
    const welcomeCouponData = localStorage.getItem('eshro_user_coupon');
    let welcomeCoupon: any = null;
    if (welcomeCouponData) {
      try {
        welcomeCoupon = JSON.parse(welcomeCouponData);
      } catch (e) {
        console.error('خطأ في قراءة كوبون الترحيب:', e);
      }
    }
    
    // البحث في الكوبونات المتاحة
    const availableCoupon = availableCoupons.find(c => c.code === couponCode);
    
    let coupon: any = null;
    
    // التحقق من كوبون الترحيب أولاً
    if (welcomeCoupon && welcomeCoupon.code === couponCode) {
      // التحقق من انتهاء صلاحية الكوبون (24 ساعة)
      const createdAt = new Date(welcomeCoupon.createdAt);
      const now = new Date();
      const hoursElapsed = (now.getTime() - createdAt.getTime()) / (1000 * 60 * 60);
      
      if (hoursElapsed <= 24) {
        coupon = welcomeCoupon;
      } else {
        setCouponModalType('error');
        setCouponModalMessage('انتهت صلاحية كوبون الخصم (صالح لمدة 24 ساعة فقط)');
        setShowCouponModal(true);
        return;
      }
    } else if (availableCoupon) {
      coupon = availableCoupon;
    }
    
    // عدم اشتراط حد أدنى - يعمل مع أي قيمة
    if (coupon) {
      setAppliedCoupon(coupon);
      setCouponModalType('success');
      setCouponModalMessage('مبروك لقد فزت معنا بكوبون خصم!\nفزت معنا كوبون خصم بقيمة 1.5% من إجمالي مشترياتك\nنتمنى لك التوفيق، مع إشرو تخليكم تشروا');
      setShowCouponModal(true);
    } else {
      setCouponModalType('error');
      setCouponModalMessage('كوبون التخفيض غير صالح');
      setShowCouponModal(true);
    }
  };

  if (cartItems.length === 0) {
    return <EmptyCart onBack={onBack} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* الهيدر */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={onBack} className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                العودة
              </Button>
              <h1 className="text-lg font-semibold text-gray-900">
                {currentStep === 'cart' && 'سلة التسوق'}
                {currentStep === 'checkout' && 'إتمام الطلب'}
                {currentStep === 'payment' && 'تأكيد الدفع'}
              </h1>
            </div>
            
            <div className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5 text-primary" />
              <span className="font-semibold">{cartItems.length} قطعة</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {currentStep === 'cart' && (
          <CartView 
            cartItems={cartItems}
            onUpdateQuantity={onUpdateQuantity}
            onRemoveItem={onRemoveItem}
            subtotal={subtotal}
            discountAmount={discountAmount}
            total={total}
            couponCode={couponCode}
            setCouponCode={setCouponCode}
            appliedCoupon={appliedCoupon}

            applyCoupon={applyCoupon}
            onContinueShopping={onBack}
            onCheckout={() => setCurrentStep('checkout')}
          />
        )}
        
        {currentStep === 'checkout' && (
          <CheckoutView
            cartItems={cartItems}
            customerData={customerData}
            setCustomerData={setCustomerData}
            paymentMethod={paymentMethod}
            setPaymentMethod={setPaymentMethod}
            paymentType={paymentType}
            setPaymentType={setPaymentType}
            shippingType={shippingType}
            setShippingType={setShippingType}
            notes={notes}
            setNotes={setNotes}
            subtotal={subtotal}
            discountAmount={discountAmount}
            shippingCost={shippingCost}
            total={total}
            appliedCoupon={appliedCoupon}
            couponCode={couponCode}
            setCouponCode={setCouponCode}
            applyCoupon={applyCoupon}

            onBack={() => setCurrentStep('cart')}
            onConfirmOrder={() => setCurrentStep('payment')}
          />
        )}
        
        {currentStep === 'payment' && (
          <PaymentView
            orderData={{
              items: cartItems,
              customer: customerData,
              payment: { method: paymentMethod, type: paymentType },
              shipping: { type: shippingType, cost: shippingCost },
              notes,
              subtotal,
              discountAmount,
              total,
              coupon: appliedCoupon
            }}
            onBack={() => setCurrentStep('checkout')}
            onPaymentComplete={onOrderComplete}
          />
        )}
      </div>

      {/* البوب أب الجديد لرسائل الكوبون */}
      <CouponMessageModal
        isOpen={showCouponModal}
        onClose={() => setShowCouponModal(false)}
        type={couponModalType}
        message={couponModalMessage}
        couponCode={couponModalType === 'success' && appliedCoupon ? appliedCoupon.code : undefined}
        discountPercentage={couponModalType === 'success' && appliedCoupon ? appliedCoupon.discount : undefined}
      />
    </div>
  );
};

// مكون السلة الفارغة
const EmptyCart: React.FC<{ onBack: () => void }> = ({ onBack }) => (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center">
    <div className="text-center p-8">
      <div className="text-8xl mb-4">🛒</div>
      <h2 className="text-2xl font-bold text-gray-800 mb-2">سلة التسوق فارغة</h2>
      <p className="text-gray-600 mb-6">لم تقم بإضافة أي منتجات بعد</p>
      <Button onClick={onBack} className="bg-primary hover:bg-primary/90">
        متابعة التسوق
      </Button>
    </div>
  </div>
);

// مكون عرض السلة
const CartView: React.FC<any> = ({
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  subtotal,
  discountAmount,
  total,
  couponCode,
  setCouponCode,
  appliedCoupon,
  showCouponSuccess,
  applyCoupon,
  onContinueShopping,
  onCheckout
}) => (
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
    {/* المنتجات */}
    <div className="lg:col-span-2 space-y-4">
      <h2 className="text-xl font-bold text-gray-900 mb-4">المنتجات في السلة</h2>
      
      {cartItems.map((item: CartItem) => (
        <Card key={`${item.product.id}-${item.size}-${item.color}`} className="overflow-hidden">
          <CardContent className="p-4">
            <div className="flex gap-4">
              <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                <img
                  src={item.product.images?.[0] || '/assets/products/placeholder.png'}
                  alt={item.product.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/assets/products/placeholder.png';
                  }}
                />
              </div>
              
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">{item.product.name}</h3>
                <p className="text-sm text-gray-600 mb-2">
                  المقاس: {item.size} • اللون: {item.color}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                      disabled={item.quantity <= 1}
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="font-semibold px-3">{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                  
                  <div className="text-left">
                    <div className="font-bold text-primary">{item.product.price * item.quantity} د.ل</div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onRemoveItem(item.id)}
                      className="text-red-500 hover:text-red-700 p-1"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
    
    {/* ملخص الطلب */}
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>ملخص الطلب</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between">
            <span>المجموع الفرعي ({cartItems.reduce((sum, item) => sum + item.quantity, 0)} قطعة)</span>
            <span className="font-semibold">{subtotal} د.ل</span>
          </div>
          
          {discountAmount > 0 && (
            <div className="flex justify-between text-green-600">
              <span>التخفيض</span>
              <span className="font-semibold">-{discountAmount} د.ل</span>
            </div>
          )}
          
          <hr />
          <div className="flex justify-between text-lg font-bold">
            <span>الإجمالي</span>
            <span className="text-primary">{total} د.ل</span>
          </div>
          
          {/* كوبون التخفيض */}
          <div className="space-y-2">
            <Label>كوبون التخفيض</Label>
            <div className="flex gap-2">
              <Input
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                placeholder="أدخل رمز الكوبون"
              />
              <Button variant="outline" onClick={applyCoupon}>
                تطبيق
              </Button>
            </div>

          </div>
          
          <div className="space-y-2">
            <Button variant="outline" className="w-full" onClick={onContinueShopping}>
              متابعة التسوق
            </Button>
            <Button className="w-full bg-primary hover:bg-primary/90" onClick={onCheckout}>
              إتمام الطلب
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
);

// مكون إتمام الطلب
const CheckoutView: React.FC<any> = ({
  cartItems,
  customerData,
  setCustomerData,
  paymentMethod,
  setPaymentMethod,
  paymentType,
  setPaymentType,
  shippingType,
  setShippingType,
  notes,
  setNotes,
  subtotal,
  discountAmount,
  shippingCost,
  total,
  appliedCoupon,
  couponCode,
  setCouponCode,
  applyCoupon,
  showCouponSuccess,
  onBack,
  onConfirmOrder
}) => {
  const [showLocationError, setShowLocationError] = useState(false);
  
  const handleConfirm = () => {
    // التحقق من البيانات المطلوبة
    if (!customerData.firstName || !customerData.lastName || !customerData.phone || 
        !customerData.city || !customerData.area || !paymentType || !shippingType) {
      alert('يرجى ملء جميع البيانات المطلوبة');
      return;
    }
    
    onConfirmOrder();
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCustomerData(prev => ({ 
            ...prev, 
            currentLocation: true,
            address: prev.address + ` (GPS: ${position.coords.latitude}, ${position.coords.longitude})`
          }));
        },
        (error) => {
          setShowLocationError(true);
          setTimeout(() => setShowLocationError(false), 3000);
        }
      );
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* نموذج البيانات الشخصية */}
      <div className="lg:col-span-2 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>البيانات الشخصية</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">الاسم *</Label>
                <Input
                  id="firstName"
                  value={customerData.firstName}
                  onChange={(e) => setCustomerData(prev => ({ ...prev, firstName: e.target.value }))}
                  placeholder="أدخل اسمك الأول"
                />
              </div>
              <div>
                <Label htmlFor="lastName">اللقب *</Label>
                <Input
                  id="lastName"
                  value={customerData.lastName}
                  onChange={(e) => setCustomerData(prev => ({ ...prev, lastName: e.target.value }))}
                  placeholder="أدخل اسم العائلة"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="phone">رقم الموبايل *</Label>
                <Input
                  id="phone"
                  value={customerData.phone}
                  onChange={(e) => setCustomerData(prev => ({ ...prev, phone: e.target.value }))}
                  placeholder="091XXXXXXX"
                />
              </div>
              <div>
                <Label htmlFor="alternativePhone">رقم الموبايل الاحتياطي</Label>
                <Input
                  id="alternativePhone"
                  value={customerData.alternativePhone}
                  onChange={(e) => setCustomerData(prev => ({ ...prev, alternativePhone: e.target.value }))}
                  placeholder="092XXXXXXX"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="city">المدينة *</Label>
                <Select value={customerData.city} onValueChange={(value) => setCustomerData(prev => ({ ...prev, city: value, area: '' }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر المدينة" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(citiesData).map(([key, city]) => (
                      <SelectItem key={key} value={key}>{city.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              {customerData.city && (
                <div>
                  <Label htmlFor="area">المنطقة *</Label>
                  <Select value={customerData.area} onValueChange={(value) => setCustomerData(prev => ({ ...prev, area: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="اختر المنطقة" />
                    </SelectTrigger>
                    <SelectContent className="max-h-48 overflow-y-auto">
                      {citiesData[customerData.city as keyof typeof citiesData]?.areas.map((area) => (
                        <SelectItem key={area} value={area}>{area}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>
            
            <div>
              <Label htmlFor="address">العنوان التفصيلي</Label>
              <Textarea
                id="address"
                value={customerData.address}
                onChange={(e) => setCustomerData(prev => ({ ...prev, address: e.target.value }))}
                placeholder="أدخل العنوان التفصيلي..."
                rows={3}
              />
            </div>
            
            <Button 
              variant="outline" 
              onClick={getCurrentLocation}
              className="w-full"
            >
              <MapPin className="h-4 w-4 mr-2" />
              تحديد موقعي الحالي
            </Button>
            
            {showLocationError && (
              <p className="text-red-500 text-sm">لم نتمكن من تحديد موقعك. يرجى تفعيل خدمة الموقع.</p>
            )}
          </CardContent>
        </Card>

        {/* طريقة الدفع */}
        <Card>
          <CardHeader>
            <CardTitle>طريقة الدفع</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center space-x-2 space-x-reverse">
                <input
                  type="radio"
                  id="onDelivery"
                  name="paymentMethod"
                  checked={paymentMethod === 'onDelivery'}
                  onChange={() => setPaymentMethod('onDelivery')}
                />
                <label htmlFor="onDelivery" className="font-medium">عند الاستلام</label>
              </div>
              
              {paymentMethod === 'onDelivery' && (
                <div className="mr-6 space-y-2">
                  {paymentMethods.onDelivery.methods.map((method) => (
                    <div key={method.name} className="flex items-center space-x-2 space-x-reverse">
                      <input
                        type="radio"
                        id={`onDelivery-${method.name}`}
                        name="paymentType"
                        checked={paymentType === method.name}
                        onChange={() => setPaymentType(method.name)}
                      />
                      <label htmlFor={`onDelivery-${method.name}`} className="flex items-center justify-center cursor-pointer hover:bg-gray-50 p-2 rounded-lg">
                        <img 
                          src={method.icon} 
                          alt={method.name}
                          className="w-12 h-12 object-contain bg-transparent"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA0OCA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQ4IiBoZWlnaHQ9IjQ4IiByeD0iNiIgZmlsbD0iI2Y5ZmFmYiIvPgo8cGF0aCBkPSJNMTggMThoMTJ2NkgxOHYtNlptMCA2aDEydjZIMTh2LTZaIiBmaWxsPSIjNmI3MjgwIi8+CjwvcIZnPgo=';
                          }}
                        />
                      </label>
                    </div>
                  ))}
                </div>
              )}
              
              <div className="flex items-center space-x-2 space-x-reverse">
                <input
                  type="radio"
                  id="immediate"
                  name="paymentMethod"
                  checked={paymentMethod === 'immediate'}
                  onChange={() => setPaymentMethod('immediate')}
                />
                <label htmlFor="immediate" className="font-medium">دفع فوري</label>
              </div>
              
              {paymentMethod === 'immediate' && (
                <div className="mr-6 grid grid-cols-3 gap-3">
                  {paymentMethods.immediate.methods.map((method) => (
                    <div key={method.name} className="flex items-center space-x-2 space-x-reverse">
                      <input
                        type="radio"
                        id={`immediate-${method.name}`}
                        name="paymentType"
                        checked={paymentType === method.name}
                        onChange={() => setPaymentType(method.name)}
                      />
                      <label htmlFor={`immediate-${method.name}`} className="flex items-center justify-center cursor-pointer hover:bg-gray-50 p-3 rounded-lg transition-colors">
                        <img 
                          src={method.icon} 
                          alt={method.name}
                          className="w-20 h-20 object-contain bg-transparent"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjgwIiBoZWlnaHQ9IjgwIiByeD0iMTIiIGZpbGw9IiNmOWZhZmIiLz4KPHA9GggZD0iTTQwIDYwYzEzLjI1NSAwIDI0LTEwLjc0NSAyNC0yNHMtMTAuNzQ1LTI0LTI0LTI0LTI0IDEwLjc0NS0yNCAyNHMxMC43NDUgMjQgMjQgMjR6IiBmaWxsPSIjZTVlN2ViIi8+Cjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0ic2Fucy1zZXJpZiIgZm9udC1zaXplPSIyNCIgZmlsbD0iIzZiNzI4MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4xZW0iPfCfkqQ8L3RleHQ+Cjwvc3ZnPg==';
                          }}
                        />
                      </label>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* خيارات الشحن */}
        <Card>
          <CardHeader>
            <CardTitle>خيارات الشحن والتوصيل</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              
              {/* عادي داخل طرابلس */}
              <div className="flex items-center space-x-2 space-x-reverse">
                <input
                  type="radio"
                  id="normal-tripoli"
                  name="shippingType"
                  checked={shippingType === 'normal-tripoli'}
                  onChange={() => setShippingType('normal-tripoli')}
                />
                <label htmlFor="normal-tripoli" className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">عادي داخل طرابلس</div>
                      <div className="text-sm text-gray-600 flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>24-96 ساعة</span>
                      </div>
                    </div>
                    <div className="text-lg font-bold text-primary">30-45 د.ل</div>
                  </div>
                </label>
              </div>
              
              {/* عادي خارج طرابلس */}
              <div className="flex items-center space-x-2 space-x-reverse">
                <input
                  type="radio"
                  id="normal-outside"
                  name="shippingType"
                  checked={shippingType === 'normal-outside'}
                  onChange={() => setShippingType('normal-outside')}
                />
                <label htmlFor="normal-outside" className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">عادي خارج طرابلس</div>
                      <div className="text-sm text-gray-600 flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>24-96 ساعة</span>
                      </div>
                    </div>
                    <div className="text-lg font-bold text-primary">50-85 د.ل</div>
                  </div>
                </label>
              </div>
                
              {/* سريع داخل طرابلس */}
              <div className="flex items-center space-x-2 space-x-reverse">
                <input
                  type="radio"
                  id="express-tripoli"
                  name="shippingType"
                  checked={shippingType === 'express-tripoli'}
                  onChange={() => setShippingType('express-tripoli')}
                />
                <label htmlFor="express-tripoli" className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium flex items-center gap-2">
                        سريع داخل طرابلس
                        <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">سريع</Badge>
                      </div>
                      <div className="text-sm text-gray-600 flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>9-12 ساعة</span>
                      </div>
                    </div>
                    <div className="text-lg font-bold text-primary">85-120 د.ل</div>
                  </div>
                </label>
              </div>
              
              {/* سريع خارج طرابلس */}
              <div className="flex items-center space-x-2 space-x-reverse">
                <input
                  type="radio"
                  id="express-outside"
                  name="shippingType"
                  checked={shippingType === 'express-outside'}
                  onChange={() => setShippingType('express-outside')}
                />
                <label htmlFor="express-outside" className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium flex items-center gap-2">
                        سريع خارج طرابلس
                        <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">سريع</Badge>
                      </div>
                      <div className="text-sm text-gray-600 flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>9-12 ساعة</span>
                      </div>
                    </div>
                    <div className="text-lg font-bold text-primary">120-185 د.ل</div>
                  </div>
                </label>
              </div>
              
            </div>
          </CardContent>
        </Card>

        {/* الملاحظات */}
        <Card>
          <CardHeader>
            <CardTitle>ملاحظات إضافية</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="أي ملاحظات أو توصيات خاصة بالطلب..."
              rows={3}
            />
          </CardContent>
        </Card>
      </div>

      {/* ملخص الطلب */}
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>ملخص الطلب</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span>المجموع الفرعي ({cartItems.reduce((sum: number, item: CartItem) => sum + item.quantity, 0)} قطعة)</span>
              <span className="font-semibold">{subtotal} د.ل</span>
            </div>
            
            {discountAmount > 0 && (
              <div className="flex justify-between text-green-600">
                <span>التخفيض ({appliedCoupon?.discount}%)</span>
                <span className="font-semibold">-{discountAmount} د.ل</span>
              </div>
            )}
            
            {shippingCost > 0 && (
              <div className="flex justify-between">
                <span>الشحن والتوصيل</span>
                <span className="font-semibold">{shippingCost} د.ل</span>
              </div>
            )}
            
            <hr />
            <div className="flex justify-between text-lg font-bold">
              <span>الإجمالي</span>
              <span className="text-primary">{total} د.ل</span>
            </div>
            
            {/* كوبون التخفيض */}
            <div className="space-y-2">
              <Label>كوبون التخفيض</Label>
              <div className="flex gap-2">
                <Input
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="أدخل رمز الكوبون"
                />
                <Button variant="outline" onClick={applyCoupon}>
                  تطبيق
                </Button>
              </div>
              {showCouponSuccess && (
                <p className="text-green-600 text-sm flex items-center gap-1">
                  <Check className="h-4 w-4" />
                  مبروك ربحت معنا تخفيض بقيمة {appliedCoupon?.discount}% من إجمالي فاتورة الطلب!
                </p>
              )}
            </div>
            
            <div className="space-y-2">
              <Button variant="outline" className="w-full" onClick={onBack}>
                العودة للسلة
              </Button>
              <Button 
                className="w-full bg-primary hover:bg-primary/90" 
                onClick={handleConfirm}
              >
                معاملات
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* عرض المنتجات */}
        <Card>
          <CardHeader>
            <CardTitle>المنتجات</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {cartItems.map((item: CartItem) => (
              <div key={`${item.product.id}-${item.size}-${item.color}`} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-12 h-12 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-lg">👗</span>
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-sm">{item.product.name}</h4>
                  <p className="text-xs text-gray-600">{item.size} • {item.color}</p>
                  <p className="text-xs text-gray-600">الكمية: {item.quantity}</p>
                </div>
                <div className="text-right">
                  <div className="font-bold text-primary">{item.product.price * item.quantity} د.ل</div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>


    </div>
  );
};

// مكون الدفع - محدث ببوابة معاملات الحقيقية
const PaymentView: React.FC<any> = ({
  orderData,
  onBack,
  onPaymentComplete
}) => {
  const [showMoamalatGateway, setShowMoamalatGateway] = useState(false);
  const [isProcessingOrder, setIsProcessingOrder] = useState(false);

  const handlePaymentStart = () => {
    if (orderData.payment.method === 'immediate') {
      // فتح بوابة معاملات للدفع الفوري
      setShowMoamalatGateway(true);
      return;
    } else {
      // للدفع عند الاستلام - تأكيد مباشر
      setIsProcessingOrder(true);
      setTimeout(() => {
        const finalOrderData = {
          ...orderData,
          id: generateOrderId(),
          date: new Date().toISOString(),
          status: 'confirmed'
        };
        setIsProcessingOrder(false);
        onPaymentComplete(finalOrderData);
      }, 1500);
    }
  };

  // معالج نجاح الدفع عبر معاملات
  const handleMoamalatSuccess = (transactionData: any) => {
    const completedOrder = {
      ...orderData,
      id: generateOrderId(),
      date: new Date().toISOString(),
      status: 'confirmed',
      paymentDetails: transactionData
    };
    setShowMoamalatGateway(false);
    onPaymentComplete(completedOrder);
  };

  // معالج فشل الدفع عبر معاملات
  const handleMoamalatError = (error: string) => {
    setShowMoamalatGateway(false);
    alert(`فشل في الدفع: ${error}`);
  };

  return (
    <div className="max-w-md mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-center flex items-center justify-center gap-2">
            <CreditCard className="h-6 w-6" />
            {orderData.payment.method === 'immediate' ? 'بوابة الدفع معاملات' : 'تأكيد الطلب'}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* ملخص الطلب */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-3">ملخص الطلب</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>إجمالي الفاتورة:</span>
                <span>{orderData.total} د.ل</span>
              </div>
              <div className="flex justify-between">
                <span>طريقة الدفع:</span>
                <span>{orderData.payment.method === 'immediate' ? 'دفع فوري عبر ' + orderData.payment.type : 'عند الاستلام'}</span>
              </div>
              <div className="flex justify-between">
                <span>العميل:</span>
                <span>{orderData.customer.name}</span>
              </div>
            </div>
          </div>
          
          <div className="flex gap-4">
            <Button variant="outline" className="flex-1" onClick={onBack} disabled={isProcessingOrder}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              تراجع
            </Button>
            <Button 
              className="flex-1 bg-green-600 hover:bg-green-700 text-white" 
              onClick={handlePaymentStart}
              disabled={isProcessingOrder}
            >
              {isProcessingOrder ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  جاري المعالجة...
                </div>
              ) : (
                <>
                  {orderData.payment.method === 'immediate' ? 'ادفع عبر معاملات' : 'تأكيد الطلب'}
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* بوابة الدفع معاملات - الواجهة الرسمية */}
      <MoamalatOfficialLightbox
        isOpen={showMoamalatGateway}
        onClose={() => setShowMoamalatGateway(false)}
        amount={orderData.total}
        orderData={orderData}
        onPaymentSuccess={handleMoamalatSuccess}
        onPaymentError={handleMoamalatError}
      />
    </div>
  );
};

// مكون نجاح الطلب
const OrderSuccessModal: React.FC<{ orderId: string; onClose: () => void }> = ({ orderId, onClose }) => {
  const [currentDateTime] = useState(new Date());
  
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <Card className="max-w-md mx-4">
        <CardContent className="p-8 text-center">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-2xl font-bold text-green-600 mb-4">تمت عملية الشراء بنجاح</h2>
          
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <div className="text-sm text-gray-600 mb-2">رقم مرجعي للطلب</div>
            <div className="font-mono text-lg font-bold text-primary">{orderId}</div>
            <div className="text-sm text-gray-600 mt-2">
              {currentDateTime.toLocaleDateString('ar-LY')} {currentDateTime.toLocaleTimeString('ar-LY')}
            </div>
          </div>
          
          <Button onClick={onClose} className="w-full bg-primary hover:bg-primary/90">
            موافق
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default CartPage;