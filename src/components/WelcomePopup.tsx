import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { 
  X, 
  Gift, 
  Copy,
  Check,
  ShoppingBag,
  Bell,
  Trophy,
  Star,
  Mail,
  Phone,
  User
} from 'lucide-react';

interface WelcomePopupProps {
  isOpen: boolean;
  onClose: () => void;
  onRegistrationComplete: (couponData: any) => void;
}

const WelcomePopup: React.FC<WelcomePopupProps> = ({
  isOpen,
  onClose,
  onRegistrationComplete
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: ''
  });
  const [couponCode, setCouponCode] = useState('');
  const [couponGenerated, setCouponGenerated] = useState(false);
  const [copied, setCopied] = useState(false);

  const generateCouponCode = () => {
    // توليد كود ديناميكي يتغير كل مرة
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const prefix = 'ESHRO-';
    const suffix = '-WLC' + Date.now().toString().slice(-4);
    let randomPart = '';
    
    // توليد الجزء الأوسط عشوائياً
    for (let i = 0; i < 8; i++) {
      randomPart += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    
    return prefix + randomPart + suffix;
  };

  const handleRegistration = () => {
    if (!formData.name.trim() || !formData.phone.trim() || !formData.email.trim()) {
      alert('يرجى ملء جميع الحقول');
      return;
    }

    // التحقق من صيغة رقم الهاتف - يقبل مع أو بدون مسافة
    const phoneRegex = /^9[0-9]\s?[0-9]{7}$/;
    if (!phoneRegex.test(formData.phone)) {
      alert('يرجى إدخال رقم الهاتف بالصيغة الصحيحة: 944062927 أو 94 4062927');
      return;
    }

    // توليد الكوبون وحفظه
    const newCoupon = generateCouponCode();
    setCouponCode(newCoupon);
    setCouponGenerated(true);
    
    // حفظ الكوبون في localStorage
    const couponData = {
      code: newCoupon,
      discount: 1.5,
      minAmount: 0,
      user: formData,
      createdAt: new Date().toISOString(),
      expiryHours: 24
    };
    
    localStorage.setItem('eshro_user_coupon', JSON.stringify(couponData));
    onRegistrationComplete(couponData);
    
    // محاكاة إرسال البريد الإلكتروني
    sendWelcomeEmail(formData, newCoupon);
    
    // الانتقال للواجهة الثانية
    setCurrentStep(2);
  };

  const handleCopyCoupon = async () => {
    try {
      await navigator.clipboard.writeText(couponCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('فشل في نسخ الكوبون:', err);
    }
  };

  const handleStartShopping = () => {
    console.log('handleStartShopping called - closing welcome popup');
    onClose();
  };

  // دالة إرسال البريد الإلكتروني (محاكاة)
  const sendWelcomeEmail = async (userData: any, couponCode: string) => {
    try {
      // محاكاة إرسال البريد الإلكتروني
      console.log('إرسال بريد إلكتروني إلى:', userData.email);
      console.log('الكوبون:', couponCode);
      console.log('البيانات:', userData);
      
      // هنا يمكن إضافة تكامل مع خدمة إرسال البريد الإلكتروني
      // مثل EmailJS أو خدمة أخرى
      
      return true;
    } catch (error) {
      console.error('فشل في إرسال البريد الإلكتروني:', error);
      return false;
    }
  };

  // تأثير تطبيق useEffect لتوليد الكوبون في الواجهة الأولى
  React.useEffect(() => {
    if (currentStep === 1 && !couponGenerated) {
      const newCoupon = generateCouponCode();
      setCouponCode(newCoupon);
    }
  }, [currentStep, couponGenerated]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-green-50 via-blue-50 to-primary/10 rounded-3xl max-w-md w-full max-h-[90vh] overflow-hidden shadow-2xl relative border-2 border-primary/20">
        
        {/* زر الإغلاق */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 w-8 h-8 bg-gray-200/80 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors z-10"
        >
          <X className="h-4 w-4 text-gray-700" />
        </button>

        {currentStep === 1 ? (
          /* الواجهة الأولى - الترحيب والتسجيل */
          <div className="relative p-6">
            {/* العنوان والرموز */}
            <div className="text-center mb-6">
              <div className="mb-4">
                <span className="text-2xl">🏆</span>
                <span className="text-sm font-bold text-primary mx-2">مبروك! لقد فزت بعضوية إشرو التحفيزية</span>
                <span className="text-2xl">🏆</span>
              </div>
              <p className="text-orange-500 font-bold text-lg mb-4">🏅 المكافآت الحصرية والمذهلة</p>
            </div>

            {/* نموذج التسجيل */}
            <div className="space-y-4">
              <div className="relative">
                <User className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="الاسم بالكامل"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="text-right pr-10 bg-white border-2 border-primary/20 focus:border-primary rounded-xl py-3"
                />
              </div>

              <div className="relative">
                <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  type="email"
                  placeholder="البريد الالكتروني"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className="text-right pr-10 bg-white border-2 border-primary/20 focus:border-primary rounded-xl py-3"
                />
              </div>

              <div className="relative">
                <Phone className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  type="tel"
                  placeholder="رقم الموبايل (944062927)"
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  className="text-right pr-10 bg-white border-2 border-primary/20 focus:border-primary rounded-xl py-3"
                />
              </div>

              {/* زر اشترك الآن */}
              <Button
                onClick={handleRegistration}
                className="w-full bg-gradient-to-r from-primary to-green-500 hover:from-primary/90 hover:to-green-600 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-lg mt-6"
              >
                اشترك الآن
              </Button>
            </div>
          </div>
        ) : (
          /* الواجهة الثانية - المبروك والكوبون */
          <div className="relative p-6">
            {/* أيقونة التحدي الأخضر في الأعلى */}
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="h-8 w-8 text-white" />
              </div>
              
              <h2 className="text-primary font-bold text-lg mb-2">
                🏆 مبروك! لقد فزت بعضوية إشرو التحفيزية 🏆
              </h2>
              
              <h3 className="text-primary/80 font-bold text-base mb-4">
                المكافآت الحصرية والمذهلة
              </h3>
            </div>

            {/* كوبون الخصم */}
            <div className="bg-primary/10 border-2 border-primary/30 rounded-xl p-4 mb-6">
              <div className="text-center">
                <h4 className="text-primary font-bold mb-2">🔥 كوبون خصم زي في 🔥</h4>
                <p className="text-sm text-gray-700 mb-3">صالح لمدة 24 ساعة على جميع المنتجات + الشحن والتوصيل مجاني</p>
                
                <div className="bg-white border-2 border-dashed border-primary rounded-lg p-4 mb-4 relative">
                  <div className="text-center">
                    <p className="text-sm font-bold text-gray-700 mb-2">الكود:</p>
                    <div className="bg-primary/10 rounded-lg p-3 mb-3">
                      <code className="text-xl font-bold text-primary tracking-wider">{couponCode}</code>
                    </div>
                    <Button
                      onClick={handleCopyCoupon}
                      className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg text-sm"
                    >
                      {copied ? (
                        <>
                          <Check className="h-4 w-4 mr-1" />
                          تم النسخ!
                        </>
                      ) : (
                        <>
                          <Copy className="h-4 w-4 mr-1" />
                          نسخ
                        </>
                      )}
                    </Button>
                  </div>
                  <div className="absolute top-2 right-2">
                    <Gift className="h-6 w-6 text-primary" />
                  </div>
                </div>
              </div>
            </div>

            {/* ما ينتظرك الآن */}
            <div className="mb-6">
              <h4 className="text-center font-bold text-gray-700 mb-4">📍 ما ينتظرك الآن</h4>
              <div className="space-y-3 text-right text-sm">
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-blue-500" />
                  <span className="text-gray-700">تم إرسال رقمك المميز وكوبونك إلى البريد</span>
                </div>
                <div className="flex items-center gap-3">
                  <Bell className="h-4 w-4 text-yellow-500" />
                  <span className="text-gray-700">ستصلك إشعارات فورية بأحدث العروض والمنتجات</span>
                </div>
                <div className="flex items-center gap-3">
                  <Trophy className="h-4 w-4 text-yellow-600" />
                  <span className="text-gray-700">تم تأهيلك للسحب الشهري على جوائز بقيمة 10000 د.ل</span>
                </div>
                <div className="flex items-center gap-3">
                  <Star className="h-4 w-4 text-purple-500" />
                  <span className="text-gray-700">استمتع بنقاط الولاء ومضاعفتها مع كل عملية شراء</span>
                </div>
              </div>
            </div>

            {/* زر البدء بالتسوق */}
            <Button
              onClick={() => {
                console.log('Start shopping button clicked in welcome popup');
                handleStartShopping();
              }}
              className="w-full bg-gradient-to-r from-green-500 to-primary hover:from-green-600 hover:to-primary/90 text-white font-bold py-4 rounded-xl shadow-lg text-base"
            >
              🛍️ ابدأ رحلة التسوق معنا 🛍️
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default WelcomePopup;