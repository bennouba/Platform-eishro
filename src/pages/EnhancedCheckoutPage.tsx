import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  AlertCircle,
  ArrowLeft,
  Check,
  CheckCircle,
  Clock,
  CreditCard,
  Gift,
  Mail,
  MapPin,
  PartyPopper,
  Phone,
  Sparkles,
  Truck,
  User
} from 'lucide-react';
import CityAreaSelector from '@/components/CityAreaSelector';
import { getAreaById, getCityById, libyanCities } from '@/data/libya/cities/cities';
import { availableCoupons, generateOrderId, shippingData } from '@/data/ecommerceData';
import CouponMessageModal from '@/components/CouponMessageModal';
import CouponSuccessModal from '@/components/CouponSuccessModal';
import MultiPaymentGateway from '@/components/MultiPaymentGateway';

interface Product {
  id: number;
  name: string;
  price: number;
  image?: string;
  category?: string;
  brand?: string;
}

interface CartItem {
  id: number;
  product: Product;
  size: string;
  color: string;
  quantity: number;
}

interface CustomerData {
  firstName: string;
  lastName: string;
  phone: string;
  alternativePhone: string;
  email: string;
  city: string;
  area: string;
  address: string;
  currentLocation?: {
    latitude: number;
    longitude: number;
    accuracy: number;
    address?: string;
  };
}

interface Coupon {
  code: string;
  discount: number;
  minAmount?: number;
  description?: string;
  createdAt?: string;
  expiresAt?: string;
}

interface OrderData {
  id: string;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  items: CartItem[];
  subtotal: number;
  shippingCost: number;
  discountAmount: number;
  discountPercentage: number;
  finalTotal: number;
  customer: {
    name: string;
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    address: string;
    city: string;
    area: string;
  };
  payment: {
    method: 'onDelivery' | 'immediate';
    type: string;
  };
  shipping: {
    type: 'normal' | 'express';
    cost: number;
    estimatedTime: string;
  };
  notes?: string;
  location?: {
    latitude: number;
    longitude: number;
    accuracy: number;
    address?: string;
  } | undefined;
  paymentDetails?: any;
}

interface EnhancedCheckoutPageProps {
  cartItems: CartItem[];
  onBack: () => void;
  onOrderComplete: (orderData: OrderData) => void;
  appliedCoupon?: Coupon | null;
  setAppliedCoupon?: (coupon: Coupon | null) => void;
}

const EnhancedCheckoutPage: React.FC<EnhancedCheckoutPageProps> = ({
  cartItems,
  onBack,
  onOrderComplete,
  appliedCoupon,
  setAppliedCoupon
}) => {
  const [customerData, setCustomerData] = useState<CustomerData>({
    firstName: '',
    lastName: '',
    phone: '',
    alternativePhone: '',
    email: '',
    city: '',
    area: '',
    address: ''
  });

  const [paymentMethod, setPaymentMethod] = useState<'onDelivery' | 'immediate'>('onDelivery');
  const [paymentType, setPaymentType] = useState<string>('');
  const [shippingType, setShippingType] = useState<'normal' | 'express'>('normal');
  const [additionalNotes, setAdditionalNotes] = useState('');
  const [couponCode, setCouponCode] = useState('');
  const [showCouponSuccess, setShowCouponSuccess] = useState(false);
  const [showCouponModal, setShowCouponModal] = useState(false);
  const [couponMessageModal, setCouponMessageModal] = useState(false);
  const [couponModalType, setCouponModalType] = useState<'success' | 'error'>('success');
  const [couponModalMessage, setCouponModalMessage] = useState('');
  const [isProcessingOrder, setIsProcessingOrder] = useState(false);
  const [showCouponSuccessModal, setShowCouponSuccessModal] = useState(false);
  const [showMoamalatGateway, setShowMoamalatGateway] = useState(false);
  const [orderReadyForPayment, setOrderReadyForPayment] = useState<OrderData | null>(null);
  const [showGuestRegistrationPrompt, setShowGuestRegistrationPrompt] = useState(false);

  // حساب الأسعار بالمعادلة الصحيحة
  const subtotal = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const discountAmount = appliedCoupon ? (subtotal * appliedCoupon.discount / 100) : 0;
  
  const getShippingCost = () => {
    if (!customerData.city) {
      // إذا لم يتم تحديد المدينة، نعتبر أقل قيمة شحن عادي داخل طرابلس
      return shippingType === 'normal' ? 30 : 85;
    }

    const isInTripoli = customerData.city === 'tripoli' || customerData.city === 'طرابلس';

    if (shippingType === 'normal') {
      // عادي: داخل طرابلس 30-45، خارج 50-85
      return isInTripoli ? 35 : 65; // استخدام قيم متوسطة ثابتة بدلاً من العشوائية
    } else {
      // سريع: داخل طرابلس 85-120، خارج 120-185
      return isInTripoli ? 100 : 150; // استخدام قيم متوسطة ثابتة بدلاً من العشوائية
    }
  };

  const getShippingTimeEstimate = () => {
    if (shippingType === 'normal') {
      return '24-96 ساعة';
    } else {
      return '9-12 ساعة';
    }
  };

  const shippingCost = getShippingCost();
  const total = subtotal + shippingCost - discountAmount; // إجمالي المنتجات + الشحن - الخصم

  // تطبيق الكوبون - بدون حد أدنى
  const applyCoupon = () => {
    if (couponCode.trim() === '') {
      setCouponModalType('error');
      setCouponModalMessage('يرجى إدخال كوبون التخفيض');
      setCouponMessageModal(true);
      return;
    }

    // البحث عن الكوبون المحفوظ من واجهة الترحيب
    const welcomeCouponData = localStorage.getItem('eshro_user_coupon');
    let welcomeCoupon: Coupon | null = null;
    if (welcomeCouponData) {
      welcomeCoupon = JSON.parse(welcomeCouponData);
    }
    
    // البحث في الكوبونات المتاحة
    const availableCoupon = availableCoupons.find(c => c.code === couponCode);
    
    let coupon: Coupon | null = null;
    
    // التحقق من كوبون الترحيب أولاً
    if (welcomeCoupon && welcomeCoupon.code === couponCode) {
      // التحقق من انتهاء صلاحية الكوبون (24 ساعة)
      const createdAt = new Date(welcomeCoupon.createdAt!);
      const now = new Date();
      const hoursElapsed = (now.getTime() - createdAt.getTime()) / (1000 * 60 * 60);
      
      if (hoursElapsed <= 24) {
        coupon = welcomeCoupon;
      } else {
        setCouponModalType('error');
        setCouponModalMessage('انتهت صلاحية كوبون الخصم (صالح لمدة 24 ساعة فقط)');
        setCouponMessageModal(true);
        return;
      }
    } else if (availableCoupon) {
      coupon = availableCoupon;
    }
    
    // عدم اشتراط حد أدنى - يعمل مع أي قيمة
    if (coupon) {
      if (setAppliedCoupon) setAppliedCoupon(coupon);
      
      // إذا كان الكوبون من واجهة الترحيب، عرض النافذة الخاصة
      if (welcomeCoupon && welcomeCoupon.code === couponCode) {
        setShowCouponSuccessModal(true);
      } else {
        setCouponModalType('success');
        setCouponModalMessage('مبروك لقد فزت معنا بكوبون خصم!\nفزت معنا كوبون خصم بقيمة 1.5% من إجمالي مشترياتك\nنتمنى لك التوفيق، مع إشرو تخليكم تشروا');
        setCouponMessageModal(true);
      }
    } else {
      setCouponModalType('error');
      setCouponModalMessage('كوبون التخفيض غير صالح');
      setCouponMessageModal(true);
    }
  };

  // معالج معاملات - فتح معاملات مباشرة للدفع الفوري
  const handleConfirmOrder = async () => {

    // التحقق من البيانات المطلوبة
    if (!customerData.firstName.trim()) {
      alert('يرجى إدخال الاسم');
      return;
    }
    if (!customerData.lastName.trim()) {
      alert('يرجى إدخال اللقب');
      return;
    }
    if (!customerData.phone.trim()) {
      alert('يرجى إدخال رقم الموبايل');
      return;
    }
    if (!customerData.city) {
      alert('يرجى اختيار المدينة');
      return;
    }
    if (!customerData.area) {
      alert('يرجى اختيار المنطقة');
      return;
    }
    if (!customerData.address.trim()) {
      alert('يرجى إدخال العنوان التفصيلي');
      return;
    }
    if (!paymentType) {
      alert('يرجى اختيار طريقة الدفع');
      return;
    }

    // التحقق من حالة تسجيل الدخول للضيوف
    const isGuest = !localStorage.getItem('eshro_user_token');
    if (isGuest) {
      setShowGuestRegistrationPrompt(true);
      return;
    }

    setIsProcessingOrder(true);

    try {
      const now = new Date();
      const orderData = {
        id: generateOrderId(),
        date: now.toLocaleDateString('ar-LY'),
        time: now.toLocaleTimeString('ar-LY'),
        status: 'pending' as 'pending' | 'confirmed',
        items: cartItems,
        subtotal,
        shippingCost,
        discountAmount,
        discountPercentage: appliedCoupon?.discount || 0,
        finalTotal: total, // المجموع النهائي الصحيح
        customer: {
          name: `${customerData.firstName} ${customerData.lastName}`,
          firstName: customerData.firstName,
          lastName: customerData.lastName,
          phone: customerData.phone,
          email: customerData.email,
          address: customerData.address,
          city: getCityById(customerData.city)?.name || customerData.city,
          area: getAreaById(customerData.area)?.name || customerData.area
        },
        payment: {
          method: paymentMethod,
          type: paymentType
        },
        shipping: {
          type: shippingType,
          cost: shippingCost,
          estimatedTime: getShippingTimeEstimate()
        },
        notes: additionalNotes,
        location: customerData.currentLocation
      };

      // فتح بوابة معاملات مباشرة لجميع طرق الدفع الفورية - إصلاح شامل
      if (paymentMethod === 'immediate') {
        setOrderReadyForPayment(orderData);
        setShowMoamalatGateway(true);
        setIsProcessingOrder(false);
        return; // فتح معاملات مباشرة
      }
      
      // لجميع طرق الدفع الأخرى، معالجة مباشرة
      await new Promise(resolve => setTimeout(resolve, 1500));
      orderData.status = 'confirmed' as const;
      onOrderComplete(orderData);
      setIsProcessingOrder(false);
      
    } catch (error) {
      alert('حدث خطأ أثناء معالجة الطلب. يرجى المحاولة مرة أخرى.');
      setIsProcessingOrder(false);
    }
  };

  // معالج نجاح الدفع عبر معاملات
  const handleMoamalatSuccess = (transactionData: { id: string; status: string; amount: number; [key: string]: unknown }) => {
    if (orderReadyForPayment) {
      const completedOrder = {
        ...orderReadyForPayment,
        status: 'confirmed' as const,
        paymentDetails: transactionData
      };
      setShowMoamalatGateway(false);
      setOrderReadyForPayment(null);
      onOrderComplete(completedOrder);
    }
  };

  // معالج فشل الدفع عبر معاملات
  const handleMoamalatError = (error: string) => {
    setShowMoamalatGateway(false);
    setOrderReadyForPayment(null);
    alert(`فشل في الدفع: ${error}`);
  };

  // طرق الدفع المتاحة
  const onDeliveryMethods = [
    { id: 'cash', name: 'نقدي', icon: '/assets/payment/cash-on-delivery.png' },
    { id: 'cards', name: 'بطاقات ائتمانية', icon: '/assets/payment/debit.png' }
  ];

  const immediateMethods = [
    { id: 'moamalat', name: 'معاملات', icon: '/assets/payment/moamalat.png' },
    { id: 'cards', name: 'بطاقات ائتمانية', icon: '/assets/payment/debit.png' },
    { id: 'yuser', name: 'يوسر', icon: '/assets/payment/youssr.png' },
    { id: 'sadad', name: 'سداد', icon: '/assets/payment/sadad.png' },
    { id: 'tadawul', name: 'تداول', icon: '/assets/payment/tadawul.png' },
    { id: 'mobicash', name: 'موبي كاش', icon: '/assets/payment/mobicash.png' },
    { id: '1pay', name: '1Pay', icon: '/assets/payment/1Pay.png' },
    { id: 'anis', name: 'أنيس', icon: '/assets/payment/anis.png' },
    { id: 'becom', name: 'بكم', icon: '/assets/payment/Becom.png' },
    { id: 'blueline', name: 'بلو لاين', icon: '/assets/payment/BlueLine.png' },
    { id: 'nab4pay', name: 'نابفور', icon: '/assets/payment/nab4pay.png' },
    { id: 'edfali', name: 'ادفع لي', icon: '/assets/payment/edfali.png' }
  ];

  const deliveryCompanies = [
    { id: 'zam', name: 'زام', icon: '/assets/shipping/ZAM.png' },
    { id: 'amyal', name: 'أميال', icon: '/assets/shipping/amyal.png' },
    { id: 'bebo', name: 'بيبو فاست', icon: '/assets/shipping/bebo_fast.webp' },
    { id: 'darbsail', name: 'درب السيل', icon: '/assets/shipping/darbsail.png' },
    { id: 'dexpress', name: 'دي اكسبريس', icon: '/assets/shipping/dexpress.webp' },
    { id: 'gedex', name: 'جيديكس', icon: '/assets/shipping/gedex.webp' },
    { id: 'godelivery', name: 'جو ديليفري', icon: '/assets/shipping/go-delivery.webp' },
    { id: 'other', name: 'شركات أخرى', icon: '/assets/shipping/other_delivery.png' },
    { id: 'presto', name: 'بريستو', icon: '/assets/shipping/presto.jpg' },
    { id: 'skyex', name: 'سكاي اكسبريس', icon: '/assets/shipping/skyex.webp' },
    { id: 'sonic', name: 'سونيك اكسبريس', icon: '/assets/shipping/sonicexpress.webp' },
    { id: 'stpx', name: 'STPX', icon: '/assets/shipping/stpx.webp' },
    { id: 'turbo', name: 'توربو', icon: '/assets/shipping/turboexlg.webp' },
    { id: 'vanex', name: 'فانيكس', icon: '/assets/shipping/vanex.png' },
    { id: 'wingsly', name: 'وينجزلي', icon: '/assets/shipping/wingsly.webp' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* الهيدر */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" onClick={onBack} className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              العودة للسلة
            </Button>
            <h1 className="text-xl font-semibold">إتمام الطلب</h1>
            <div className="w-20"></div> {/* للتوسيط */}
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* البيانات الشخصية - القسم الأيمن */}
          <div className="space-y-6 lg:order-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  البيانات الشخصية
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* الاسم واللقب */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">الاسم *</Label>
                    <Input
                      id="firstName"
                      value={customerData.firstName}
                      onChange={(e) => setCustomerData(prev => ({ ...prev, firstName: e.target.value }))}
                      placeholder="أدخل الاسم الأول"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">اللقب *</Label>
                    <Input
                      id="lastName"
                      value={customerData.lastName}
                      onChange={(e) => setCustomerData(prev => ({ ...prev, lastName: e.target.value }))}
                      placeholder="أدخل اللقب"
                      required
                    />
                  </div>
                </div>

                {/* أرقام الهواتف */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone">رقم الموبايل *</Label>
                    <div className="relative">
                      <Phone className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="phone"
                        value={customerData.phone}
                        onChange={(e) => setCustomerData(prev => ({ ...prev, phone: e.target.value }))}
                        placeholder="091XXXXXXX"
                        className="pr-10"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="altPhone">رقم الموبايل الاحتياطي</Label>
                    <Input
                      id="altPhone"
                      value={customerData.alternativePhone}
                      onChange={(e) => setCustomerData(prev => ({ ...prev, alternativePhone: e.target.value }))}
                      placeholder="092XXXXXXX"
                    />
                  </div>
                </div>

                {/* البريد الإلكتروني */}
                <div>
                  <Label htmlFor="email">البريد الإلكتروني</Label>
                  <div className="relative">
                    <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      value={customerData.email}
                      onChange={(e) => setCustomerData(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="example@email.com"
                      className="pr-10"
                    />
                  </div>
                </div>

                {/* المدينة والمنطقة */}
                <CityAreaSelector
                  selectedCity={customerData.city}
                  selectedArea={customerData.area}
                  onCityChange={(cityId) => setCustomerData(prev => ({ ...prev, city: cityId }))}
                  onAreaChange={(areaId) => setCustomerData(prev => ({ ...prev, area: areaId }))}
                  onLocationDetected={(location) => setCustomerData(prev => ({ ...prev, currentLocation: location }))}
                  required
                />

                {/* العنوان */}
                <div>
                  <Label htmlFor="address">العنوان التفصيلي *</Label>
                  <Textarea
                    id="address"
                    value={customerData.address}
                    onChange={(e) => setCustomerData(prev => ({ ...prev, address: e.target.value }))}
                    placeholder="أدخل العنوان التفصيلي (اسم الشارع، رقم المبنى، إلخ)"
                    rows={3}
                    required
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* ملخص الطلب وطرق الدفع - القسم الأيسر */}
          <div className="space-y-6 lg:order-2">
            {/* ملخص الطلب */}
            <Card>
              <CardHeader>
                <CardTitle>ملخص الطلب</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span>إجمالي المنتجات:</span>
                  <span>{subtotal.toFixed(2)} د.ل</span>
                </div>
                <div className="flex justify-between">
                  <span>قيمة الشحن والتوصيل:</span>
                  <span>{shippingCost.toFixed(2)} د.ل</span>
                </div>
                <div className="flex justify-between">
                  <span>خصم الكوبون:</span>
                  <span className="text-green-600">-{discountAmount.toFixed(2)} د.ل</span>
                </div>
                <hr />
                <div className="flex justify-between text-lg font-bold">
                  <span>المجموع النهائي:</span>
                  <span className="text-primary">{total.toFixed(2)} د.ل</span>
                </div>

                {/* كوبون التخفيض */}
                <div className="space-y-2">
                  <Label>كوبون التخفيض</Label>
                  <div className="flex gap-2">
                    <Input
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="eshro-TT6H-202509"
                      className="flex-1"
                    />
                    <Button onClick={applyCoupon} variant="outline">
                      تطبيق
                    </Button>
                  </div>
                  {showCouponSuccess && (
                    <div className="flex items-center gap-2 text-green-600 text-sm">
                      <Check className="h-4 w-4" />
                      تم تطبيق الكوبون بنجاح!
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* طرق الدفع */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  طريقة الدفع
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <RadioGroup value={paymentMethod} onValueChange={(value: string) => setPaymentMethod(value as 'onDelivery' | 'immediate')}>
                  {/* عند الاستلام */}
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <RadioGroupItem value="onDelivery" id="onDelivery" />
                      <Label htmlFor="onDelivery" className="text-base font-semibold text-blue-600">
                        عند الاستلام
                      </Label>
                    </div>
                    
                    {paymentMethod === 'onDelivery' && (
                      <div className="mr-6 grid grid-cols-2 gap-4 max-w-lg">
                        {onDeliveryMethods.map((method) => (
                          <label key={method.id} className={`relative flex flex-col items-center justify-center p-4 border-2 rounded-xl cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105 bg-gradient-to-br from-white to-gray-50 min-h-[140px] group ${
                            paymentType === method.id 
                              ? 'border-primary shadow-xl scale-105 ring-4 ring-primary/20 bg-gradient-to-br from-primary/5 to-primary/10' 
                              : 'border-gray-200 hover:border-primary/50 hover:shadow-lg'
                          }`}>
                            <input
                              type="radio"
                              name="onDeliveryType"
                              value={method.id}
                              checked={paymentType === method.id}
                              onChange={(e) => setPaymentType(e.target.value)}
                              className="sr-only"
                            />
                            <div className="relative mb-1">
                            {method.icon.startsWith('/assets') ? (
                              <img
                                src={method.icon}
                                alt={method.name}
                                className={`${
                                  ['nab4pay.png', 'youssr.png', 'debit.png'].some(icon => method.icon.includes(icon))
                                    ? 'w-48 h-48 object-contain filter drop-shadow-sm group-hover:scale-110 group-hover:drop-shadow-md transition-all duration-300' // Even larger for specified payment icons
                                    : 'w-16 h-16 object-contain filter drop-shadow-sm group-hover:scale-110 group-hover:drop-shadow-md transition-all duration-300'
                                }`}
                                onError={(e) => {
                                  (e.target as HTMLImageElement).src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA4MCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjgwIiBoZWlnaHQ9IjY0IiByeD0iMTIiIGZpbGw9IiNmOWZhZmIiLz4KPHBhdGggZD0iTTQwIDQ4YzguODM3IDAgMTYtNy4xNjMgMTYtMTZzLTcuMTYzLTE2LTE2LTE2LTE2IDcuMTYzLTE2IDE2czcuMTYzIDE2IDE2IDE2eiIgZmlsbD0iI2U1ZTdlYiIvPgo8dGV4dCB4PSI1MCUiIHk9IjUwJSIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IiM2YjcyODAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuMWVtIj7wn5KkPC90ZXh0Pgo8L3N2Zz4=';
                                }}
                              />
                            ) : (
                              <span className="text-5xl group-hover:scale-110 transition-transform duration-300">{method.icon}</span>
                            )}
                              
                              {/* Hover effect overlay */}
                              <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
                            </div>
                            
                            <span className="text-sm font-medium text-gray-700 text-center">{method.name}</span>
                            
                            {paymentType === method.id && (
                              <div className="absolute top-2 right-2 bg-primary rounded-full p-1">
                                <CheckCircle className="h-4 w-4 text-white" />
                              </div>
                            )}
                          </label>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* دفع فوري */}
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <RadioGroupItem value="immediate" id="immediate" />
                      <Label htmlFor="immediate" className="text-base font-semibold text-green-600">
                        دفع فوري
                      </Label>
                    </div>
                    
                    {paymentMethod === 'immediate' && (
                      <div className="mr-6 grid grid-cols-4 gap-4 max-w-5xl">
                        {immediateMethods.map((method) => (
                          <label key={method.id} className={`relative flex flex-col items-center justify-center p-4 border-2 rounded-xl cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105 bg-gradient-to-br from-white to-gray-50 min-h-[140px] group ${
                            paymentType === method.id 
                              ? 'border-primary shadow-xl scale-105 ring-4 ring-primary/20 bg-gradient-to-br from-primary/5 to-primary/10' 
                              : 'border-gray-200 hover:border-primary/50 hover:shadow-lg'
                          }`}>
                            <input
                              type="radio"
                              name="immediateType"
                              value={method.id}
                              checked={paymentType === method.id}
                              onChange={(e) => setPaymentType(e.target.value)}
                              className="sr-only"
                            />
                            <div className="relative mb-1">
                              {method.icon.startsWith('/assets') ? (
                                <img 
                                  src={method.icon} 
                                  alt={method.name}
                                  className={`${
                                    ['nab4pay.png', 'youssr.png', 'debit.png'].some(icon => method.icon.includes(icon))
                                      ? 'w-48 h-48 object-contain filter drop-shadow-sm group-hover:scale-110 group-hover:drop-shadow-md transition-all duration-300' // Even larger for specified payment icons
                                      : 'w-32 h-20 object-contain filter drop-shadow-sm group-hover:scale-110 group-hover:drop-shadow-md transition-all duration-300'
                                  }`}
                                  onError={(e) => {
                                    (e.target as HTMLImageElement).src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTI4IiBoZWlnaHQ9IjgwIiB2aWV3Qm94PSIwIDAgMTI4IDgwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cmVjdCB3aWR0aD0iMTI4IiBoZWlnaHQ9IjgwIiByeD0iMTIiIGZpbGw9IiNmOWZhZmIiLz4KPHA9GggZD0iTTY0IDU2YzEzLjI1NSAwIDI0LTEwLjc0NSAyNC0yNHMtMTAuNzQ1LTI0LTI0LTI0LTI0IDEwLjc0NS0yNCAyNHMxMC43NDUgMjQgMjQgMjR6IiBmaWxsPSIjZTVlN2ViIi8+Cjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0ic2Fucy1zZXJpZiIgZm9udC1zaXplPSIyNCIgZmlsbD0iIzZiNzI4MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4xZW0iPvCfkqQ8L3RleHQ+Cjwvc3ZnPg==';
                                  }}
                                />
                              ) : (
                                <span className="text-4xl group-hover:scale-110 transition-transform duration-300">{method.icon}</span>
                              )}
                              
                              {/* Hover effect overlay */}
                              <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
                            </div>
                            
                            {paymentType === method.id && (
                              <div className="absolute top-2 right-2 bg-primary rounded-full p-1">
                                <CheckCircle className="h-4 w-4 text-white" />
                              </div>
                            )}
                          </label>
                        ))}
                      </div>
                    )}
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>

            {/* خيارات الشحن والتوصيل */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Truck className="h-5 w-5" />
                  🚚 نظام الشحن والتوصيل
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* النص المطلوب */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="space-y-2 text-sm text-gray-700 leading-relaxed">
                    <div className="font-semibold text-blue-800">🚚 نظام الشحن والتوصيل:</div>
                    <div className="space-y-1">
                      <div>عادي داخل طرابلس: <span className="font-medium text-primary">30-45 د.ل</span> | 24-96 ساعة</div>
                      <div>عادي خارج طرابلس: <span className="font-medium text-primary">50-85 د.ل</span> | 24-96 ساعة</div>
                      <div>سريع داخل طرابلس: <span className="font-medium text-primary">85-120 د.ل</span> | 9-12 ساعة</div>
                      <div>سريع خارج طرابلس: <span className="font-medium text-primary">120-185 د.ل</span> | 9-12 ساعة</div>
                    </div>
                  </div>
                </div>

                {/* اختيار نوع الشحن - محدث بالخيارات الأربعة الكاملة */}
                <div className="space-y-3">
                  <h4 className="font-medium text-gray-700">اختر نوع الشحن:</h4>
                  
                  {/* عادي داخل طرابلس */}
                  <label className={`flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer hover:border-primary transition-colors ${
                    (shippingType === 'normal' && (customerData.city === 'tripoli' || customerData.city === 'طرابلس')) ? 'border-primary bg-primary/5' : 'border-gray-200'
                  }`}>
                    <input
                      type="radio"
                      name="shippingType"
                      value="normal-tripoli"
                      checked={shippingType === 'normal' && (customerData.city === 'tripoli' || customerData.city === 'طرابلس')}
                      onChange={() => setShippingType('normal')}
                      className="text-primary"
                    />
                    <div className="flex-1">
                      <div className="font-semibold text-lg">🚚 عادي داخل طرابلس</div>
                      <div className="text-sm text-gray-600">
                        30-45 د.ل | 24-96 ساعة
                      </div>
                    </div>
                  </label>

                  {/* عادي خارج طرابلس */}
                  <label className={`flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer hover:border-primary transition-colors ${
                    (shippingType === 'normal' && customerData.city && customerData.city !== 'tripoli' && customerData.city !== 'طرابلس') ? 'border-primary bg-primary/5' : 'border-gray-200'
                  }`}>
                    <input
                      type="radio"
                      name="shippingType"
                      value="normal-outside"
                      checked={!!(shippingType === 'normal' && customerData.city && customerData.city !== 'tripoli' && customerData.city !== 'طرابلس')}
                      onChange={() => setShippingType('normal')}
                      className="text-primary"
                    />
                    <div className="flex-1">
                      <div className="font-semibold text-lg">🚚 عادي خارج طرابلس</div>
                      <div className="text-sm text-gray-600">
                        50-85 د.ل | 24-96 ساعة
                      </div>
                    </div>
                  </label>

                  {/* سريع داخل طرابلس */}
                  <label className={`flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer hover:border-primary transition-colors ${
                    (shippingType === 'express' && (customerData.city === 'tripoli' || customerData.city === 'طرابلس')) ? 'border-primary bg-primary/5' : 'border-gray-200'
                  }`}>
                    <input
                      type="radio"
                      name="shippingType"
                      value="express-tripoli"
                      checked={shippingType === 'express' && (customerData.city === 'tripoli' || customerData.city === 'طرابلس')}
                      onChange={() => setShippingType('express')}
                      className="text-primary"
                    />
                    <div className="flex-1">
                      <div className="font-semibold text-lg">⚡ سريع داخل طرابلس</div>
                      <div className="text-sm text-gray-600">
                        85-120 د.ل | 9-12 ساعة
                      </div>
                    </div>
                  </label>

                  {/* سريع خارج طرابلس */}
                  <label className={`flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer hover:border-primary transition-colors ${
                    shippingType === 'express' && customerData.city !== 'tripoli' && customerData.city !== 'طرابلس' && customerData.city ? 'border-primary bg-primary/5' : 'border-gray-200'
                  }`}>
                    <input
                      type="radio"
                      name="shippingType"
                      value="express-outside"
                      checked={!!(shippingType === 'express' && customerData.city && customerData.city !== 'tripoli' && customerData.city !== 'طرابلس')}
                      onChange={() => setShippingType('express')}
                      className="text-primary"
                    />
                    <div className="flex-1">
                      <div className="font-semibold text-lg">⚡ سريع خارج طرابلس</div>
                      <div className="text-sm text-gray-600">
                        120-185 د.ل | 9-12 ساعة
                      </div>
                    </div>
                  </label>
                </div>

                {/* شركات التوصيل */}
                <div className="mt-4">
                  <h4 className="font-medium text-gray-700 mb-3">شركات التوصيل المتاحة:</h4>
                  <div className="grid grid-cols-4 gap-2">
                    {deliveryCompanies.map((company) => (
                      <div key={company.id} className="flex flex-col items-center gap-1 p-3 border rounded-lg hover:border-primary hover:shadow-sm transition-all duration-200 bg-white">
                        {company.icon.startsWith('/assets') ? (
                          <img
                            src={company.icon}
                            alt={company.name}
                            className={`${
                              ['ZAM.png', 'amyal.png', 'presto.jpg', 'sonicexpress.webp'].some(icon => company.icon.includes(icon))
                                ? 'w-32 h-32 object-contain bg-transparent' // Even larger for specified shipping companies
                                : company.icon.includes('wingsly.webp')
                                ? 'w-6 h-6 object-contain bg-transparent' // Even smaller for Wingz
                                : 'w-10 h-10 object-contain bg-transparent'
                            }`}
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiByeD0iNCIgZmlsbD0iI2Y5ZmFmYiIvPgo8dGV4dCB4PSI1MCUiIHk9IjUwJSIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTYiIGZpbGw9IiM2YjcyODAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuMWVtIj7wn5qaqjwvdGV4dD4KPC9zdmc+';
                            }}
                          />
                        ) : (
                          <span className="text-2xl">{company.icon}</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* ملاحظات إضافية */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5" />
                  ملاحظات إضافية
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={additionalNotes}
                  onChange={(e) => setAdditionalNotes(e.target.value)}
                  placeholder="أي ملاحظات أو توجيهات خاصة بالطلب..."
                  rows={4}
                />
              </CardContent>
            </Card>

            {/* زر معاملات - محسن */}
            <Button
              onClick={() => {
                handleConfirmOrder();
              }}
              disabled={isProcessingOrder || !customerData.firstName || !customerData.lastName || !customerData.phone || !customerData.city || !customerData.area || !customerData.address || !paymentType}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-4 text-lg font-semibold"
              size="lg"
            >
              {isProcessingOrder ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  جاري تجهيز الدفع...
                </div>
              ) : (
                <>
                  <CreditCard className="h-5 w-5 mr-2" />
                  {paymentMethod === 'immediate' ? 'ادفع الآن عبر معاملات' : 'تأكيد الطلب'}
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* نافذة تأكيد الكوبون */}
      {showCouponModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="max-w-md w-full">
            <CardContent className="p-6 text-center">
              {/* خلفية احتفالية */}
              <div className="relative mb-4">
                <div className="absolute inset-0 overflow-hidden">
                  <PartyPopper className="absolute top-2 left-2 h-6 w-6 text-yellow-500" />
                  <Sparkles className="absolute top-4 right-4 h-5 w-5 text-pink-500" />
                  <Gift className="absolute bottom-2 left-4 h-5 w-5 text-green-500" />
                </div>
                
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-primary rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle className="h-8 w-8 text-white" />
                </div>
              </div>

              <h3 className="text-xl font-bold text-gray-800 mb-2">🎉 مبروك رحبت معنا!</h3>
              
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-4 mb-4">
                <p className="text-green-800 font-semibold mb-2">
                  تخفيض بقيمة 1.5% من إجمالي فاتورة الطلب
                </p>
                <p className="text-sm text-green-700">
                  تسوق واربح معنا دائماً مكافآت وهدايا مع متجر إشرو
                </p>
              </div>

              <Button
                onClick={() => {
                  setShowCouponModal(false);
                  setShowCouponSuccess(true);
                }}
                className="w-full bg-green-500 hover:bg-green-600"
              >
                <Gift className="h-4 w-4 mr-2" />
                تأكيد الطلب
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {/* البوب أب الجديد لرسائل الكوبون */}
      <CouponMessageModal
        isOpen={couponMessageModal}
        onClose={() => setCouponMessageModal(false)}
        type={couponModalType}
        message={couponModalMessage}
        couponCode={couponModalType === 'success' && appliedCoupon ? appliedCoupon.code : ''}
        discountPercentage={couponModalType === 'success' && appliedCoupon ? appliedCoupon.discount : 0}
      />

      {/* البوب أب الثاني للكوبون الترحيبي */}
      <CouponSuccessModal
        isOpen={showCouponSuccessModal}
        onClose={() => setShowCouponSuccessModal(false)}
      />

      {/* بوابة الدفع المتعددة - الواجهة الرسمية المحدثة */}
      <MultiPaymentGateway
        isOpen={showMoamalatGateway}
        onClose={() => {
          setShowMoamalatGateway(false);
          setOrderReadyForPayment(null);
        }}
        amount={total}
        orderData={orderReadyForPayment}
        onPaymentSuccess={handleMoamalatSuccess}
        onPaymentError={handleMoamalatError}
      />

      {/* نافذة طلب التسجيل للضيوف */}
      {showGuestRegistrationPrompt && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="max-w-md w-full">
            <CardContent className="p-6 text-center">
              {/* أيقونة جذابة */}
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="h-8 w-8 text-white" />
              </div>

              <h3 className="text-xl font-bold text-gray-800 mb-2">إنشاء حساب مطلوب</h3>

              <p className="text-gray-600 mb-6 leading-relaxed">
                لإتمام عملية الشراء بأمان، يرجى إنشاء حساب جديد معنا للاستفادة من جميع المميزات والحصول على أفضل تجربة تسوق.
              </p>

              <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-4 mb-6 text-right">
                <h4 className="font-semibold text-blue-800 mb-2">مميزات إنشاء الحساب:</h4>
                <div className="space-y-1 text-sm text-blue-700">
                  <div className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    <span>تتبع طلباتك بسهولة</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    <span>حفظ عناوين التوصيل</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    <span>تلقي عروض خاصة</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    <span>إمكانية الإرجاع والاستبدال</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setShowGuestRegistrationPrompt(false)}
                  className="flex-1"
                >
                  متابعة كزائر
                </Button>
                <Button
                  onClick={() => {
                    setShowGuestRegistrationPrompt(false);
                    // هنا سيتم توجيه المستخدم إلى صفحة إنشاء حساب الزائر
                    window.location.href = '/visitor-register';
                  }}
                  className="flex-1 bg-primary hover:bg-primary/90"
                >
                  إنشاء حساب الآن
                </Button>
              </div>

              <p className="text-xs text-gray-500 mt-4">
                سيتم حفظ بيانات طلبك الحالي ومتابعة عملية الشراء بعد إنشاء الحساب
              </p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default EnhancedCheckoutPage;