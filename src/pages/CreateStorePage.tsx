import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  CreditCard,
  Globe,
  Info,
  ShoppingCart,
  Sparkles,
  Star,
  Store,
  Truck,
  X
} from 'lucide-react';

interface CreateStorePageProps {
  onBack: () => void;
  onNavigateToLogin: () => void;
  onStoreCreated: (storeData: any) => void;
}

interface StoreFormData {
  nameAr: string;
  nameEn: string;
  description: string;
  categories: string[];
  commercialRegister: File | null;
  practiceLicense: File | null;
  subdomain: string;
  email: string;
  phone: string;
  ownerName: string;
  password: string;
  confirmPassword: string;
}

const CreateStorePage: React.FC<CreateStorePageProps> = ({
  onBack,
  onNavigateToLogin,
  onStoreCreated
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<StoreFormData>({
    nameAr: '',
    nameEn: '',
    description: '',
    categories: [],
    commercialRegister: null,
    practiceLicense: null,
    subdomain: '',
    email: '',
    phone: '',
    ownerName: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);
  const [showDuplicateModal, setShowDuplicateModal] = useState(false);
  const [duplicateField, setDuplicateField] = useState<'email' | 'phone' | ''>('');

  const storeCategories = [
    { id: 'fashion', name: 'الأزياء والملابس', icon: '👗' },
    { id: 'electronics', name: 'الإلكترونيات', icon: '📱' },
    { id: 'food', name: 'الأطعمة والمشروبات', icon: '🍔' },
    { id: 'beauty', name: 'الجمال والعناية', icon: '💄' },
    { id: 'home', name: 'المنزل والحديقة', icon: '🏠' },
    { id: 'sports', name: 'الرياضة واللياقة', icon: '⚽' },
    { id: 'books', name: 'الكتب والثقافة', icon: '📚' },
    { id: 'toys', name: 'الألعاب والأطفال', icon: '🧸' },
    { id: 'automotive', name: 'السيارات والمركبات', icon: '🚗' },
    { id: 'health', name: 'الصحة والطب', icon: '⚕️' }
  ];

  const benefits = [
    {
      icon: <Globe className="h-8 w-8" />,
      title: "شبكة بشكل واسعة",
      description: "شبكة بشراء وتوصيل شراء وإيمت مختلف لليبيا",
      color: "text-blue-600"
    },
    {
      icon: <CreditCard className="h-8 w-8" />,
      title: "وسائل دفع متعددة",
      description: "دعم جميع طرق الدفع المحلية",
      color: "text-green-600"
    },
    {
      icon: <Star className="h-8 w-8" />,
      title: "متجر احترافي",
      description: "تصميم عصري وتجسين استخدام",
      color: "text-purple-600"
    }
  ];

  const totalSteps = 4;
  const progressPercentage = (currentStep / totalSteps) * 100;

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    switch (step) {
      case 1:
        if (!formData.nameAr.trim()) newErrors.nameAr = 'اسم المتجر بالعربية مطلوب';
        if (!formData.description.trim()) newErrors.description = 'وصف المتجر مطلوب';
        if (formData.categories.length === 0) newErrors.categories = 'يجب اختيار فئة واحدة على الأقل';
        if (!formData.commercialRegister) newErrors.commercialRegister = 'نسخة من السجل التجاري مطلوبة';
        if (!formData.practiceLicense) newErrors.practiceLicense = 'نسخة من رخصة المزاولة مطلوبة';
        if (!formData.subdomain.trim()) newErrors.subdomain = 'عنوان المتجر مطلوب';
        else if (!/^[a-z0-9-]+$/.test(formData.subdomain)) {
          newErrors.subdomain = 'يجب أن يحتوي عنوان المتجر على أحرف إنجليزية صغيرة وأرقام وعلامة - فقط';
        }
        break;
      
      case 2:
        if (!formData.ownerName.trim()) newErrors.ownerName = 'اسم صاحب المتجر مطلوب';
        if (!formData.email.trim()) newErrors.email = 'البريد الإلكتروني مطلوب';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
          newErrors.email = 'البريد الإلكتروني غير صحيح';
        }
        if (!formData.phone.trim()) newErrors.phone = 'رقم الهاتف مطلوب';
        break;
      
      case 3:
        if (!formData.password) newErrors.password = 'كلمة المرور مطلوبة';
        else if (formData.password.length < 8) {
          newErrors.password = 'كلمة المرور يجب أن تكون 8 أحرف على الأقل';
        }
        if (formData.password !== formData.confirmPassword) {
          newErrors.confirmPassword = 'كلمة المرور غير متطابقة';
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, totalSteps));
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) return;

    setIsLoading(true);
    try {
      // التحقق من التكرارات قبل إنشاء المتجر
      const existingStores = JSON.parse(localStorage.getItem('eshro_stores') || '[]');

      // التحقق من البريد الإلكتروني المكرر
      if (existingStores.some((store: any) => store.email === formData.email)) {
        setDuplicateField('email');
        setShowDuplicateModal(true);
        setIsLoading(false);
        return;
      }

      // التحقق من رقم الهاتف المكرر
      if (existingStores.some((store: any) => store.phone === formData.phone)) {
        setDuplicateField('phone');
        setShowDuplicateModal(true);
        setIsLoading(false);
        return;
      }

      // التحقق من الـ subdomain المكرر
      if (existingStores.some((store: any) => store.subdomain === formData.subdomain)) {
        setErrors({ subdomain: 'عنوان المتجر موجود مسبقاً، يرجى اختيار عنوان آخر' });
        setIsLoading(false);
        return;
      }

      // محاكاة إنشاء المتجر
      await new Promise(resolve => setTimeout(resolve, 2000));

      const storeData = {
        ...formData,
        commercialRegister: formData.commercialRegister?.name || '',
        practiceLicense: formData.practiceLicense?.name || '',
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        status: 'active',
        trialEndsAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString() // 7 أيام
      };

      // حفظ المتجر الجديد في localStorage
      existingStores.push(storeData);
      localStorage.setItem('eshro_stores', JSON.stringify(existingStores));

      onStoreCreated(storeData);

      // إضافة تأخير صغير لضمان حفظ البيانات قبل عرض النافذة المنبثقة
      setTimeout(() => {
        console.log('إنشاء المتجر تم بنجاح، عرض نافذة النجاح...');
        setShowSuccessModal(true);
      }, 500);
    } catch (error) {
      setErrors({ general: 'حدث خطأ في إنشاء المتجر. يرجى المحاولة مرة أخرى.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubdomainChange = (value: string) => {
    // تحويل إلى أحرف صغيرة وإزالة المسافات والأحرف غير المسموحة
    const cleanValue = value.toLowerCase().replace(/[^a-z0-9-]/g, '').slice(0, 30);
    setFormData(prev => ({ ...prev, subdomain: cleanValue }));
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <ShoppingCart className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">معلومات المتجر الأساسية</h3>
                <p className="text-sm text-gray-600">أدخل المعلومات الأساسية لمتجرك</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="nameAr">اسم المتجر بالعربية *</Label>
                <Input
                  id="nameAr"
                  placeholder="مثال: حليب صين البقلة"
                  value={formData.nameAr}
                  onChange={(e) => setFormData(prev => ({ ...prev, nameAr: e.target.value }))}
                  className={errors.nameAr ? 'border-red-500' : ''}
                />
                {errors.nameAr && <p className="text-xs text-red-500">{errors.nameAr}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="nameEn">اسم المتجر بالإنجليزية</Label>
                <Input
                  id="nameEn"
                  placeholder="Example: Elegance Store"
                  value={formData.nameEn}
                  onChange={(e) => setFormData(prev => ({ ...prev, nameEn: e.target.value }))}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">وصف المتجر *</Label>
              <Textarea
                id="description"
                placeholder="أكتب شرح مفصل عن متجرك ومنتجاتك..."
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                rows={4}
                className={errors.description ? 'border-red-500' : ''}
              />
              {errors.description && <p className="text-xs text-red-500">{errors.description}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-4 md:col-span-2">
                <Label>فئة المتجر *</Label>
                <p className="text-sm text-gray-600 mb-4">يمكنك اختيار أكثر من فئة</p>
                <div className="flex flex-wrap gap-3">
                  {storeCategories.map((category) => (
                    <label 
                      key={category.id} 
                      className={`flex items-center gap-2 px-4 py-3 border-2 rounded-xl cursor-pointer transition-all duration-200 hover:shadow-md hover:scale-105 ${
                        formData.categories.includes(category.id) 
                          ? 'border-primary bg-primary/10 shadow-md scale-105' 
                          : 'border-gray-200 hover:border-primary/50'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={formData.categories.includes(category.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setFormData(prev => ({ 
                              ...prev, 
                              categories: [...prev.categories, category.id] 
                            }));
                          } else {
                            setFormData(prev => ({ 
                              ...prev, 
                              categories: prev.categories.filter(c => c !== category.id) 
                            }));
                          }
                        }}
                        className="sr-only"
                      />
                      <span className="text-xl">{category.icon}</span>
                      <span className="text-sm font-medium whitespace-nowrap">{category.name}</span>
                      {formData.categories.includes(category.id) && (
                        <div className="w-2 h-2 bg-primary rounded-full ml-1"></div>
                      )}
                    </label>
                  ))}
                </div>
                {errors.categories && <p className="text-sm text-red-500 mt-2">{errors.categories}</p>}
              </div>

              {/* نسخة من السجل التجاري */}
              <div className="space-y-2">
                <Label htmlFor="commercialRegister">نسخة من السجل التجاري مرفقة *</Label>
                <Input
                  id="commercialRegister"
                  type="file"
                  accept=".png,.jpeg,.jpg,.pdf,.winrar,.zip"
                  onChange={(e) => setFormData(prev => ({ ...prev, commercialRegister: e.target.files?.[0] || null }))}
                  className={errors.commercialRegister ? 'border-red-500' : ''}
                />
                <p className="text-xs text-gray-500">الامتدادات المسموحة: PNG, JPEG, JPG, PDF, WINRAR, ZIP</p>
                {errors.commercialRegister && <p className="text-xs text-red-500">{errors.commercialRegister}</p>}
              </div>

              {/* نسخة من رخصة المزاولة */}
              <div className="space-y-2">
                <Label htmlFor="practiceLicense">نسخة من رخصة المزاولة مرفقة *</Label>
                <Input
                  id="practiceLicense"
                  type="file"
                  accept=".png,.jpeg,.jpg,.pdf,.winrar,.zip"
                  onChange={(e) => setFormData(prev => ({ ...prev, practiceLicense: e.target.files?.[0] || null }))}
                  className={errors.practiceLicense ? 'border-red-500' : ''}
                />
                <p className="text-xs text-gray-500">الامتدادات المسموحة: PNG, JPEG, JPG, PDF, WINRAR, ZIP</p>
                {errors.practiceLicense && <p className="text-xs text-red-500">{errors.practiceLicense}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="subdomain">عنوان المتجر *</Label>
                <div className="space-y-1">
                  <Input
                    id="subdomain"
                    placeholder="my-store"
                    value={formData.subdomain}
                    onChange={(e) => handleSubdomainChange(e.target.value)}
                    className={errors.subdomain ? 'border-red-500' : ''}
                  />
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Info className="h-3 w-3" />
                    <span>سيكون الرابط النهائي: {formData.subdomain || 'my-store'}.eshro.ly</span>
                  </div>
                </div>
                {errors.subdomain && <p className="text-xs text-red-500">{errors.subdomain}</p>}
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Store className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">معلومات صاحب المتجر</h3>
                <p className="text-sm text-gray-600">أدخل معلوماتك الشخصية</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="ownerName">الاسم الكامل *</Label>
                <Input
                  id="ownerName"
                  placeholder="أدخل اسمك الكامل"
                  value={formData.ownerName}
                  onChange={(e) => setFormData(prev => ({ ...prev, ownerName: e.target.value }))}
                  className={errors.ownerName ? 'border-red-500' : ''}
                />
                {errors.ownerName && <p className="text-xs text-red-500">{errors.ownerName}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">البريد الإلكتروني *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="example@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className={errors.email ? 'border-red-500' : ''}
                />
                {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">رقم الهاتف *</Label>
                <Input
                  id="phone"
                  placeholder="0912345678"
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  className={errors.phone ? 'border-red-500' : ''}
                />
                {errors.phone && <p className="text-xs text-red-500">{errors.phone}</p>}
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <CheckCircle className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">إعدادات الحساب</h3>
                <p className="text-sm text-gray-600">أنشئ كلمة مرور قوية لحسابك</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password">كلمة المرور *</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="أدخل كلمة مرور قوية"
                  value={formData.password}
                  onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                  className={errors.password ? 'border-red-500' : ''}
                />
                {errors.password && <p className="text-xs text-red-500">{errors.password}</p>}
                <p className="text-xs text-gray-500">يجب أن تكون كلمة المرور 8 أحرف على الأقل</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">تأكيد كلمة المرور *</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="أعد إدخال كلمة المرور"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                  className={errors.confirmPassword ? 'border-red-500' : ''}
                />
                {errors.confirmPassword && <p className="text-xs text-red-500">{errors.confirmPassword}</p>}
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6 text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-2">مراجعة البيانات</h3>
              <p className="text-gray-600">تأكد من صحة البيانات قبل إنشاء المتجر</p>
            </div>

            <Card className="text-right">
              <CardContent className="p-4 space-y-3">
                <div className="flex justify-between">
                  <span className="font-medium">اسم المتجر:</span>
                  <span>{formData.nameAr}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">الفئة:</span>
                  <span>{formData.categories.map(catId => storeCategories.find(c => c.id === catId)?.name).join(', ')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">رابط المتجر:</span>
                  <span className="text-blue-600">{formData.subdomain}.eshro.ly</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">البريد الإلكتروني:</span>
                  <span>{formData.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">رقم الهاتف:</span>
                  <span>{formData.phone}</span>
                </div>
              </CardContent>
            </Card>

            {errors.general && (
              <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                <AlertCircle className="h-4 w-4 text-red-600 flex-shrink-0" />
                <span className="text-sm text-red-700">{errors.general}</span>
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
      {/* الهيدر */}
      <header className="p-4 border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto flex items-center justify-between">
          <Button 
            variant="ghost" 
            onClick={onBack}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            الرئيسية
          </Button>
          
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Store className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-primary">إشرو</span>
          </div>
          
          <Button 
            variant="outline" 
            size="sm"
            onClick={onNavigateToLogin}
          >
            تسجيل الدخول
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* العنوان وشريط التقدم */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">إنشاء حساب</h1>
          <p className="text-slate-600 mb-6">أكمل الخطوات التالية لإطلاق متجرك الإلكتروني</p>
          
          <div className="max-w-md mx-auto">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-slate-600">الخطوة {currentStep} من {totalSteps}</span>
              <span className="text-sm font-medium text-primary">{Math.round(progressPercentage)}%</span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>
        </div>

        {/* محتوى الخطوة */}
        <div className="max-w-2xl mx-auto">
          <Card className="mb-8">
            <CardContent className="p-8">
              {renderStep()}
            </CardContent>
          </Card>

          {/* أزرار التنقل */}
          <div className="flex justify-between items-center">
            <div className="flex gap-2">
              {currentStep > 1 && (
                <Button 
                  variant="outline" 
                  onClick={handlePrevious}
                  className="flex items-center gap-2"
                >
                  <ArrowLeft className="h-4 w-4" />
                  السابق
                </Button>
              )}
            </div>

            <div className="flex gap-2">
              {currentStep < totalSteps ? (
                <Button 
                  onClick={handleNext}
                  className="flex items-center gap-2"
                >
                  التالي
                  <ArrowRight className="h-4 w-4" />
                </Button>
              ) : (
                <Button 
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="bg-green-500 hover:bg-green-600 flex items-center gap-2"
                >
                  {isLoading ? 'جاري الإنشاء...' : 'إنشاء المتجر'}
                  <CheckCircle className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* المميزات */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-center mb-8 text-slate-800">ما ستحصل عليه مع إشرو</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {benefits.map((benefit, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
                <div className={`mb-4 ${benefit.color} flex justify-center`}>
                  {benefit.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2 text-slate-800">{benefit.title}</h3>
                <p className="text-sm text-slate-600">{benefit.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* نافذة نجاح إنشاء الحساب */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl relative border-2 border-green-200">
            <button
              onClick={() => setShowSuccessModal(false)}
              className="absolute top-4 left-4 w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors z-10"
            >
              <X className="h-4 w-4 text-gray-700" />
            </button>

            <div className="p-8 text-center">
              {/* أيقونة النجاح */}
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="h-10 w-10 text-green-600" />
              </div>

              {/* رسالة النجاح */}
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                ✨✨ تم إنشاء الحساب بنجاح !! ✨✨
              </h2>

              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                نتمنى لك رحلة ممتعة معنا بمنصة إشرو
              </p>

              {/* معلومات المتجر */}
              <div className="bg-gray-50 rounded-xl p-4 mb-6 text-right">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">اسم المتجر:</span>
                    <span className="font-semibold text-gray-900">{formData.nameAr}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">البريد الإلكتروني:</span>
                    <span className="font-semibold text-gray-900">{formData.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">رابط المتجر:</span>
                    <span className="font-semibold text-green-600">{formData.subdomain}.eshro.ly</span>
                  </div>
                </div>
              </div>

              {/* زر البدء */}
              <button
                onClick={() => {
                  setShowSuccessModal(false);
                  setShowWelcomeModal(true);
                }}
                className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 text-lg"
              >
                <Sparkles className="h-5 w-5" />
                ابدأ رحلتك مع إشرو
                <Sparkles className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* نافذة التحذير من التكرار */}
      {showDuplicateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl relative border-2 border-red-200">
            <button
              onClick={() => setShowDuplicateModal(false)}
              className="absolute top-4 left-4 w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors z-10"
            >
              <X className="h-4 w-4 text-gray-700" />
            </button>

            <div className="p-8 text-center">
              {/* أيقونة التحذير */}
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <AlertCircle className="h-10 w-10 text-red-600" />
              </div>

              {/* رسالة التحذير */}
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                اسم المستخدم او رقم الموبايل مسجل لدينا مسبقا !!
              </h2>

              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                {duplicateField === 'email' && 'البريد الإلكتروني الذي أدخلته مسجل لدينا مسبقاً'}
                {duplicateField === 'phone' && 'رقم الهاتف الذي أدخلته مسجل لدينا مسبقاً'}
              </p>

              {/* معلومات التكرار */}
              <div className="bg-red-50 rounded-xl p-4 mb-6 text-right">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-red-600">الحقل المكرر:</span>
                    <span className="font-semibold text-gray-900">
                      {duplicateField === 'email' ? 'البريد الإلكتروني' : 'رقم الهاتف'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-red-600">القيمة:</span>
                    <span className="font-semibold text-gray-900">
                      {duplicateField === 'email' ? formData.email : formData.phone}
                    </span>
                  </div>
                </div>
              </div>

              {/* زر فهم */}
              <button
                onClick={() => setShowDuplicateModal(false)}
                className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                فهمت، سأقوم بتغيير البيانات
              </button>
            </div>
          </div>
        </div>
      )}

      {/* نافذة ترحيب التاجر */}
      {showWelcomeModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-green-50 via-blue-50 to-primary/10 rounded-3xl max-w-md w-full max-h-[90vh] overflow-hidden shadow-2xl relative border-2 border-primary/20">

            {/* زر الإغلاق */}
            <button
              onClick={() => {
                setShowWelcomeModal(false);
                onNavigateToLogin();
              }}
              className="absolute top-4 left-4 w-8 h-8 bg-gray-200/80 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors z-10"
            >
              <X className="h-4 w-4 text-gray-700" />
            </button>

            {/* الواجهة الأولى - الترحيب */}
            <div className="relative p-6">
              {/* العنوان والرموز */}
              <div className="text-center mb-6">
                <div className="mb-4">
                  <span className="text-2xl">🏆</span>
                  <span className="text-sm font-bold text-primary mx-2">أهلاً وسهلاً بك عزيزي التاجر!</span>
                  <span className="text-2xl">🏆</span>
                </div>
                <p className="text-orange-500 font-bold text-lg mb-4">🎉 مرحباً بك في منصة إشرو 🎉</p>
                <p className="text-gray-700 text-sm mb-4">نحن سعداء بانضمامك إلى مجتمعنا المتنامي من التجار الناجحين</p>
              </div>

              {/* مميزات التاجر */}
              <div className="bg-primary/10 border-2 border-primary/30 rounded-xl p-4 mb-6">
                <div className="text-center">
                  <h4 className="text-primary font-bold mb-3">🌟 ما ستحصل عليه كتاجر مع إشرو</h4>

                  <div className="space-y-3 text-right text-sm">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span className="text-gray-700">متجر إلكتروني احترافي مجاناً لمدة 7 أيام</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span className="text-gray-700">لوحة تحكم متطورة لإدارة المتجر والطلبات</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span className="text-gray-700">نظام دفع إلكتروني متكامل وآمن</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span className="text-gray-700">خدمات الشحن والتوصيل المتكاملة</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span className="text-gray-700">دعم فني متخصص 24/7</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span className="text-gray-700">أدوات تسويقية متقدمة لزيادة المبيعات</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* معلومات المتجر */}
              <div className="bg-white/80 rounded-xl p-4 mb-6 text-right">
                <h5 className="font-bold text-gray-800 mb-3">📋 تفاصيل متجرك</h5>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">اسم المتجر:</span>
                    <span className="font-semibold text-gray-900">{formData.nameAr}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">رابط المتجر:</span>
                    <span className="font-semibold text-green-600">{formData.subdomain}.eshro.ly</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">البريد الإلكتروني:</span>
                    <span className="font-semibold text-gray-900">{formData.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">تاريخ الإنشاء:</span>
                    <span className="font-semibold text-gray-900">{new Date().toLocaleDateString('ar-LY')}</span>
                  </div>
                </div>
              </div>

              {/* زر البدء */}
              <button
                onClick={() => {
                  setShowWelcomeModal(false);
                  onNavigateToLogin();
                }}
                className="w-full bg-gradient-to-r from-green-500 to-primary hover:from-green-600 hover:to-primary/90 text-white font-bold py-4 rounded-xl shadow-lg text-base"
              >
                🏪 ابدأ إدارة متجرك الآن 🏪
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateStorePage;
