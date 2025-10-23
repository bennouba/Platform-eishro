import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Bell, Phone, Mail, MessageCircle, X, CheckCircle, Clock } from 'lucide-react';
import type { Product } from '@/data/storeProducts';

interface NotifyWhenAvailableProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: NotificationRequest) => void;
}

export interface NotificationRequest {
  productId: number;
  productName: string;
  customerName: string;
  phone: string;
  email: string;
  quantity: number;
  notificationTypes: string[];
  dateRequested: string;
}

const NotifyWhenAvailable: React.FC<NotifyWhenAvailableProps> = ({
  product,
  isOpen,
  onClose,
  onSubmit
}) => {
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [formData, setFormData] = useState({
    customerName: '',
    phone: '',
    email: '',
    quantity: 1,
    notificationTypes: [] as string[]
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const notificationOptions = [
    { id: 'email', label: 'بريد إلكتروني', icon: Mail },
    { id: 'sms', label: 'رسالة نصية', icon: Phone },
    { id: 'whatsapp', label: 'واتساب', icon: MessageCircle }
  ];

  const handleNotificationTypeChange = (typeLabel: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      notificationTypes: checked
        ? [...prev.notificationTypes, typeLabel]
        : prev.notificationTypes.filter(label => label !== typeLabel)
    }));
  };

  const handleSubmit = async () => {
    // التحقق من صحة البيانات
    if (!formData.customerName.trim()) {
      alert('يرجى إدخال الاسم بالكامل');
      return;
    }

    if (!formData.phone.trim()) {
      alert('يرجى إدخال رقم الهاتف');
      return;
    }

    if (!formData.email.trim()) {
      alert('يرجى إدخال البريد الإلكتروني');
      return;
    }

    if (formData.notificationTypes.length === 0) {
      alert('يرجى اختيار طريقة إشعار واحدة على الأقل');
      return;
    }

    if (formData.quantity < 1) {
      alert('يرجى اختيار كمية صحيحة');
      return;
    }

    setIsSubmitting(true);

    try {
      // محاكاة إرسال الطلب
      await new Promise(resolve => setTimeout(resolve, 1500));

      // الانتقال للواجهة الثانية
      console.log('تم الانتقال للواجهة الثانية بنجاح');
      setStep('success');
    } catch (error) {
      alert('حدث خطأ أثناء إرسال الطلب. يرجى المحاولة مرة أخرى.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setStep('form');
    setFormData({
      customerName: '',
      phone: '',
      email: '',
      quantity: 1,
      notificationTypes: []
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[9999] p-4 backdrop-blur-sm">
      <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl border-0">
        {step === 'form' ? (
          // First Interface - Form Collection
          <>
            <div className="p-6 border-b">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">نبهني عند التوفر</h2>
                <Button variant="ghost" size="sm" onClick={handleClose}>
                  <X className="h-4 w-4" />
                </Button>
              </div>

              {/* Product Info */}
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <div className="flex items-center gap-3">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-12 h-12 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{product.name}</h3>
                    <p className="text-sm text-gray-600">{product.price} د.ل</p>
                  </div>
                </div>
              </div>

              {/* Form Fields */}
              <div className="space-y-4">
                <div>
                  <Label htmlFor="customerName">الاسم بالكامل *</Label>
                  <Input
                    id="customerName"
                    value={formData.customerName}
                    onChange={(e) => setFormData(prev => ({ ...prev, customerName: e.target.value }))}
                    placeholder="أدخل اسمك الكامل"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="phone">رقم الهاتف *</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="09xxxxxxxx"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="email">البريد الإلكتروني *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="example@email.com"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label>الكمية</Label>
                  <div className="flex items-center gap-3 mt-1">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setFormData(prev => ({ ...prev, quantity: Math.max(1, prev.quantity - 1) }))}
                    >
                      -
                    </Button>
                    <span className="w-12 text-center">{formData.quantity}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setFormData(prev => ({ ...prev, quantity: prev.quantity + 1 }))}
                    >
                      +
                    </Button>
                  </div>
                </div>

                <div>
                  <Label>نوع الإشعار *</Label>
                  <div className="space-y-3 mt-2">
                    {notificationOptions.map(option => {
                      const Icon = option.icon;
                      return (
                        <div key={option.id} className="flex items-center space-x-2 space-x-reverse">
                          <Checkbox
                            id={option.id}
                            checked={formData.notificationTypes.includes(option.id)}
                            onCheckedChange={(checked) => handleNotificationTypeChange(option.id, checked as boolean)}
                          />
                          <Label htmlFor={option.id} className="flex items-center gap-2 cursor-pointer">
                            <Icon className="h-4 w-4" />
                            {option.label}
                          </Label>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6">
              <Button
                onClick={handleSubmit}
                className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
                disabled={!formData.customerName || !formData.phone || !formData.email || formData.notificationTypes.length === 0 || isSubmitting}
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    جاري الإرسال...
                  </div>
                ) : (
                  <>
                    <Bell className="h-4 w-4 mr-2" />
                    نبهني عند التوفر
                  </>
                )}
              </Button>
              <Button variant="ghost" onClick={handleClose} className="w-full mt-2">
                إلغاء
              </Button>
            </div>
          </>
        ) : (
          // Second Interface - Success Confirmation
          <>
            <div className="p-6 text-center">
              <div className="mb-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">تم التسجيل بنجاح!</h2>
                <p className="text-gray-600">
                  شكراً لك! سنرسل لك إشعاراً فوراً عند توفر هذا المنتج في مدينتك
                </p>
                <p className="text-sm text-green-600 mt-2">
                  ✅ تم حفظ طلبك في قسم الطلبات غير المتوفرة
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  سيتم نقلك تلقائياً لصفحة الطلبات لرؤية طلبك المحفوظ
                </p>
              </div>

              {/* Product Info */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <div className="flex items-center gap-3">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-12 h-12 object-cover rounded-lg"
                  />
                  <div className="flex-1 text-right">
                    <h3 className="font-semibold text-gray-900">{product.name}</h3>
                    <p className="text-sm text-gray-600">{product.price} د.ل</p>
                    <Badge variant="secondary" className="text-xs">
                      <Clock className="h-3 w-3 mr-1" />
                      غير متوفر حالياً
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <Button
                  onClick={() => {
                    try {
                      // حفظ الطلب في قسم الطلبات غير المتوفرة
                      const notificationData = {
                        productId: product.id,
                        productName: product.name,
                        customerName: formData.customerName,
                        phone: formData.phone,
                        email: formData.email,
                        quantity: formData.quantity,
                        notificationTypes: formData.notificationTypes,
                        dateRequested: new Date().toISOString()
                      };

                      // قراءة البيانات المحفوظة حالياً
                      const savedUnavailable = JSON.parse(localStorage.getItem('eshro_unavailable') || '[]');
                      console.log('📋 البيانات الحالية في localStorage:', savedUnavailable.length, 'طلب');

                      // إنشاء كائن الطلب الجديد
                      const newRequest = {
                        id: Date.now(), // إضافة معرف فريد
                        name: product.name,
                        price: product.price,
                        originalPrice: product.originalPrice,
                        images: product.images,
                        description: product.description,
                        category: product.category,
                        inStock: product.inStock,
                        isAvailable: product.isAvailable,
                        tags: product.tags,
                        notificationData: notificationData,
                        requestedAt: new Date().toISOString()
                      };

                      // إضافة الطلب الجديد للقائمة
                      savedUnavailable.push(newRequest);

                      // حفظ البيانات المحدثة في localStorage
                      localStorage.setItem('eshro_unavailable', JSON.stringify(savedUnavailable));

                      console.log('✅ تم حفظ طلب الإشعار بنجاح في قسم الطلبات غير المتوفرة');
                      console.log('📦 بيانات الطلب:', newRequest);
                      console.log('📊 إجمالي الطلبات المحفوظة:', savedUnavailable.length);

                      // إغلاق النافذة
                      handleClose();

                      // الانتقال إلى صفحة الطلبات
                      setTimeout(() => {
                        // البحث عن زر الطلبات في الهيدر
                        const allButtons = document.querySelectorAll('button');
                        let ordersButton: Element | null = null;

                        // البحث في جميع الأزرار
                        for (const button of allButtons) {
                          const text = button.textContent || '';
                          if (text.includes('طلباتي') || text.includes('Orders') || text.includes('Package')) {
                            ordersButton = button;
                            break;
                          }
                        }

                        if (ordersButton) {
                          (ordersButton as HTMLElement).click();
                          console.log('🔄 تم النقر على زر الطلبات بنجاح');

                          // تأكيد حفظ البيانات في وحدة التحكم بعد الانتقال
                          setTimeout(() => {
                            const finalCheck = JSON.parse(localStorage.getItem('eshro_unavailable') || '[]');
                            console.log('🔍 التحقق النهائي - إجمالي الطلبات بعد الحفظ:', finalCheck.length);
                          }, 500);
                        } else {
                          console.log('⚠️ لم يتم العثور على زر الطلبات');
                        }
                      }, 300);
                    } catch (error) {
                      console.error('❌ خطأ في حفظ طلب الإشعار:', error);
                      alert('حدث خطأ أثناء حفظ الطلب. يرجى المحاولة مرة أخرى.');
                    }
                  }}
                  className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
                >
                  <Bell className="h-4 w-4 mr-2" />
                  تابع عند التوفر
                </Button>
                <Button variant="ghost" onClick={handleClose} className="w-full">
                  <X className="h-4 w-4 mr-2" />
                  إغلاق
                </Button>
              </div>

              <p className="text-xs text-gray-500 mt-4">
                يمكنك متابعة جميع طلبات الإشعارات الخاصة بك من حسابك الشخصي
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default NotifyWhenAvailable;