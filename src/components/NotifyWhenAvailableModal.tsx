import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  X, 
  Bell, 
  Mail, 
  MessageCircle, 
  Phone,
  Check,
  Plus,
  Minus,
  CheckCircle
} from 'lucide-react';
import { Product } from '@/data/productCategories';

interface NotifyWhenAvailableModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
  onSubmit: (notificationData: NotificationRequest) => void;
}

interface NotificationRequest {
  productId: number;
  productName: string;
  customerName: string;
  phone: string;
  email?: string;
  notificationMethods: string[];
  size?: string;
  color?: string;
  quantity: number;
}

const NotifyWhenAvailableModal: React.FC<NotifyWhenAvailableModalProps> = ({
  isOpen,
  onClose,
  product,
  onSubmit
}) => {
  const [formData, setFormData] = useState({
    customerName: '',
    phone: '',
    email: '',
    notificationMethods: [] as string[],
    size: '',
    color: '',
    quantity: 1
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.customerName || !formData.phone) {
      alert('يرجى ملء الاسم ورقم الهاتف');
      return;
    }

    if (formData.notificationMethods.length === 0) {
      alert('يرجى اختيار طريقة واحدة على الأقل للتنبيه');
      return;
    }

    setIsSubmitting(true);

    try {
      const notificationData: NotificationRequest = {
        productId: product.id,
        productName: product.name,
        customerName: formData.customerName,
        phone: formData.phone,
        email: formData.email,
        notificationMethods: formData.notificationMethods,
        size: formData.size,
        color: formData.color,
        quantity: formData.quantity
      };

      // محاكاة إرسال الطلب
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      onSubmit(notificationData);
      setShowSuccessModal(true);
      
    } catch (error) {
      alert('حدث خطأ أثناء إرسال الطلب. يرجى المحاولة مرة أخرى.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string | number | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleNotificationMethod = (method: string) => {
    setFormData(prev => ({
      ...prev,
      notificationMethods: prev.notificationMethods.includes(method)
        ? prev.notificationMethods.filter(m => m !== method)
        : [...prev.notificationMethods, method]
    }));
  };

  const updateQuantity = (delta: number) => {
    setFormData(prev => ({
      ...prev,
      quantity: Math.max(1, prev.quantity + delta)
    }));
  };

  // النافذة الأولى - نموذج التسجيل
  if (!showSuccessModal) {
    return (
      <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[9999] p-4 backdrop-blur-sm">
        <Card className="max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl border-0 animate-in zoom-in-95 duration-300 bg-white rounded-2xl">
          <CardHeader className="text-center pb-4 pt-6">
            <CardTitle className="text-2xl font-bold text-gray-800 mb-4">
              🔔 نبهني عند التوفر
            </CardTitle>
            
            {/* عرض صورة وبيانات المنتج */}
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
              <img 
                src={product.images[0]} 
                alt={product.name}
                className="w-20 h-20 object-cover rounded-lg"
              />
              <div className="text-right flex-1">
                <h3 className="font-bold text-gray-800 text-lg">{product.name}</h3>
                <p className="text-sm text-gray-600 mt-1">قيمة المنتج: {product.price} د.ل</p>
                {product.originalPrice > product.price && (
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-sm text-red-500 line-through">{product.originalPrice} د.ل</span>
                    <span className="text-sm font-bold text-green-600">{product.price} د.ل</span>
                  </div>
                )}
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* الاسم بالكامل */}
              <div className="space-y-2">
                <Label htmlFor="customerName" className="text-right block font-medium">
                  الاسم بالكامل *
                </Label>
                <Input
                  id="customerName"
                  type="text"
                  value={formData.customerName}
                  onChange={(e) => handleInputChange('customerName', e.target.value)}
                  className="text-right"
                  placeholder="أدخل اسمك الكامل"
                  required
                />
              </div>

              {/* رقم الهاتف */}
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-right block font-medium">
                  رقم الهاتف *
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="text-right"
                  placeholder="09X XXXXXXX"
                  required
                />
              </div>

              {/* البريد الإلكتروني */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-right block font-medium">
                  البريد الإلكتروني
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="text-right"
                  placeholder="example@email.com"
                />
              </div>

              {/* الكمية */}
              <div className="space-y-2">
                <Label className="text-right block font-medium">الكمية</Label>
                <div className="flex items-center justify-center gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => updateQuantity(-1)}
                    className="w-8 h-8 p-0"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-12 text-center font-bold text-lg">{formData.quantity}</span>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => updateQuantity(1)}
                    className="w-8 h-8 p-0"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* نوع الإشعار */}
              <div className="space-y-3">
                <Label className="text-right block font-medium text-gray-700">نوع الإشعار:</Label>

                <div className="space-y-3">
                  <div className="flex items-center space-x-3 space-x-reverse p-3 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors">
                    <Checkbox
                      id="email"
                      checked={formData.notificationMethods.includes('email')}
                      onCheckedChange={() => toggleNotificationMethod('email')}
                      className="rounded-md"
                    />
                    <Label htmlFor="email" className="flex items-center gap-3 cursor-pointer text-lg">
                      <span className="text-2xl">📧</span>
                      Email
                    </Label>
                  </div>

                  <div className="flex items-center space-x-3 space-x-reverse p-3 bg-gray-50 rounded-lg hover:bg-green-50 transition-colors">
                    <Checkbox
                      id="sms"
                      checked={formData.notificationMethods.includes('sms')}
                      onCheckedChange={() => toggleNotificationMethod('sms')}
                      className="rounded-md"
                    />
                    <Label htmlFor="sms" className="flex items-center gap-3 cursor-pointer text-lg">
                      <span className="text-2xl">📱</span>
                      Text Message
                    </Label>
                  </div>

                  <div className="flex items-center space-x-3 space-x-reverse p-3 bg-gray-50 rounded-lg hover:bg-green-50 transition-colors">
                    <Checkbox
                      id="whatsapp"
                      checked={formData.notificationMethods.includes('whatsapp')}
                      onCheckedChange={() => toggleNotificationMethod('whatsapp')}
                      className="rounded-md"
                    />
                    <Label htmlFor="whatsapp" className="flex items-center gap-3 cursor-pointer text-lg">
                      <span className="text-2xl">📲</span>
                      WhatsApp
                    </Label>
                  </div>

                  <div className="flex items-center space-x-3 space-x-reverse p-3 bg-gray-50 rounded-lg hover:bg-yellow-50 transition-colors">
                    <Checkbox
                      id="notifyAvailable"
                      checked={formData.notificationMethods.includes('notifyAvailable')}
                      onCheckedChange={() => toggleNotificationMethod('notifyAvailable')}
                      className="rounded-md"
                    />
                    <Label htmlFor="notifyAvailable" className="flex items-center gap-3 cursor-pointer text-lg">
                      <span className="text-2xl">🔔</span>
                      Notify Me When Available
                    </Label>
                  </div>
                </div>
              </div>

              {/* زر الإرسال والإلغاء */}
              <div className="pt-6 space-y-3">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 font-bold text-lg rounded-xl shadow-lg"
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2 justify-center">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      جاري الإرسال...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 justify-center">
                      <span className="text-xl">🔔</span>
                      نبهني عند التوفر
                    </div>
                  )}
                </Button>

                <Button
                  type="button"
                  onClick={onClose}
                  variant="outline"
                  className="w-full border-2 border-gray-300 text-gray-700 hover:bg-gray-50 py-3 text-lg font-bold rounded-xl"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  // النافذة الثانية - تأكيد النجاح
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[9999] p-4 backdrop-blur-sm">
      <Card className="max-w-lg w-full shadow-2xl border-0 animate-in zoom-in-95 duration-300 bg-white rounded-2xl">
        <CardHeader className="text-center pb-2 pt-6">
          {/* عرض صورة وبيانات المنتج */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <img 
              src={product.images[0]} 
              alt={product.name}
              className="w-20 h-20 object-cover rounded-lg shadow-md"
            />
            <div className="text-center">
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {product.name}
              </h3>
              <p className="text-lg text-red-500 font-bold">غير متوفر حالياً</p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-6">
          {/* رسالة النجاح */}
          <div className="text-center mb-6">
            {/* أيقونة النجاح */}
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
              <Check className="h-10 w-10 text-white stroke-[3]" />
            </div>
            
            <h2 className="text-2xl font-bold text-green-600 mb-4">
              تم التسجيل بنجاح!
            </h2>
            
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              شكراً لك! سنرسل لك إشعاراً فور توفر هذا المنتج في أقرب وقت ممكن
            </h3>
            
            <p className="text-gray-600 leading-relaxed mb-6 text-lg">
              يمكنك متابعة جميع طلبات الإشعارات الخاصة بك من حسابك الشخصي
            </p>
          </div>

          {/* أزرار الإجراءات */}
          <div className="space-y-3">
            <Button
              onClick={() => {
                // انتقال لقسم "طلبات غير متوفرة"
                onClose();
              }}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 text-lg font-bold rounded-xl shadow-lg"
            >
              <span className="mr-2">🔔</span>
              تابع عند التوفر
            </Button>
            
            <Button 
              onClick={onClose}
              variant="outline"
              className="w-full border-2 border-gray-300 text-gray-700 hover:bg-gray-50 py-3 text-lg font-bold rounded-xl"
            >
              <span className="mr-2">❌</span>
              إغلاق
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotifyWhenAvailableModal;