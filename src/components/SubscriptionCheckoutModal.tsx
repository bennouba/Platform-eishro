
import React, { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Switch } from '@/components/ui/switch';
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Award,
  Calendar,
  CheckCircle,
  ChevronRight,
  CreditCard,
  Crown,
  DollarSign,
  Gift,
  Percent,
  Shield,
  Sparkles,
  Star,
  X,
  Zap,
} from 'lucide-react';

interface SubscriptionCheckoutModalProps {
   isOpen: boolean;
   onClose: () => void;
   selectedPackage: any;
   billingCycle: 'monthly' | 'yearly';
   onBillingCycleChange: (cycle: 'monthly' | 'yearly') => void;
 }

interface PaymentMethod {
  id: string;
  name: string;
  icon: string;
  description: string;
}

const paymentMethods: PaymentMethod[] = [
  { id: 'moamalat', name: 'معاملات', icon: '/data/payment/moamalat.png', description: 'البوابة الوطنية للمدفوعات الإلكترونية' },
  { id: 'sadad', name: 'سداد', icon: '/data/payment/sadad.png', description: 'خدمة الدفع الإلكتروني' },
  { id: 'tadawul', name: 'تداول', icon: '/data/payment/tadawul.png', description: 'منصة التداول الإلكتروني' },
  { id: 'mobicash', name: 'موبي كاش', icon: '/data/payment/mobicash.png', description: 'محفظة إلكترونية' },
  { id: 'anis', name: 'أنيس', icon: '/data/payment/anis.png', description: 'خدمات مالية إلكترونية' },
  { id: 'edfali', name: 'إدفعلي', icon: '/data/payment/edfali.png', description: 'حلول دفع إلكترونية' },
  { id: '1pay', name: '1Pay', icon: '/data/payment/1Pay.png', description: 'منصة دفع متكاملة' },
  { id: 'becom', name: 'Becom', icon: '/data/payment/Becom.png', description: 'خدمات دفع إلكترونية' },
  { id: 'blueline', name: 'BlueLine', icon: '/data/payment/BlueLine.png', description: 'حلول دفع متقدمة' },
  { id: 'debit', name: 'بطاقات الخصم', icon: '/data/payment/debit.png', description: 'بطاقات الخصم المباشر' },
  { id: 'nab4pay', name: 'NAB4Pay', icon: '/data/payment/nab4pay.png', description: 'منصة دفع وطنية' },
  { id: 'youssr', name: 'يوسر', icon: '/data/payment/youssr.png', description: 'خدمات مالية إلكترونية' },
];

export const SubscriptionCheckoutModal: React.FC<SubscriptionCheckoutModalProps> = ({
   isOpen,
   onClose,
   selectedPackage,
   billingCycle,
   onBillingCycleChange
 }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [scriptsLoaded, setScriptsLoaded] = useState(false);

  // Calculate pricing
  const basePrice = selectedPackage ? (billingCycle === 'yearly'
    ? Math.floor(selectedPackage.yearlyPrice)
    : selectedPackage.monthlyPrice) : 0;

  const discount = selectedPackage && billingCycle === 'yearly'
    ? selectedPackage.id === 'lite' ? basePrice * 0.01
    : selectedPackage.id === 'growth' ? basePrice * 0.03
    : basePrice * 0.05
    : 0;

  const discountedPrice = basePrice - discount;
  const couponDiscount = appliedCoupon ? discountedPrice * 0.1 : 0; // 10% coupon discount
  const finalPrice = discountedPrice - couponDiscount;

  const handleCouponApply = () => {
    if (couponCode.trim()) {
      // Simulate coupon validation
      setAppliedCoupon(couponCode);
    }
  };

  const handlePaymentSelect = (methodId: string) => {
    setSelectedPaymentMethod(methodId);
  };

  const handleProceedToPayment = () => {
    if (selectedPaymentMethod === 'moamalat') {
      setCurrentStep(3);
    }
  };

  const loadPaymentScripts = useCallback(() => {
    return new Promise<void>((resolve) => {
      // Load CryptoJS
      if (!document.querySelector('script[src*="crypto-js"]')) {
        const cryptoScript = document.createElement('script');
        cryptoScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/crypto-js.min.js';
        cryptoScript.onload = () => {
          console.log('CryptoJS loaded successfully');
          loadMoamalatScript(resolve);
        };
        cryptoScript.onerror = () => {
          console.error('Failed to load CryptoJS');
          loadMoamalatScript(resolve);
        };
        document.head.appendChild(cryptoScript);
      } else {
        loadMoamalatScript(resolve);
      }
    });
  }, []);

  // Load scripts when component mounts and moamalat is selected
  useEffect(() => {
    if (isOpen && selectedPaymentMethod === 'moamalat' && !scriptsLoaded) {
      loadPaymentScripts();
    }
  }, [isOpen, selectedPaymentMethod, scriptsLoaded, loadPaymentScripts]);

  const loadMoamalatScript = (resolve: () => void) => {
    if (!document.querySelector('script[src*="lightbox.js"]')) {
      const lightboxScript = document.createElement('script');
      lightboxScript.src = 'https://tnpg.moamalat.net:6006/js/lightbox.js';
      lightboxScript.onload = () => {
        console.log('Moamalat Lightbox loaded successfully');
        setScriptsLoaded(true);
        resolve();
      };
      lightboxScript.onerror = () => {
        console.error('Failed to load Moamalat Lightbox');
        setScriptsLoaded(true);
        resolve();
      };
      document.head.appendChild(lightboxScript);
    } else {
      setScriptsLoaded(true);
      resolve();
    }
  };

  const hexToStr = (hex: string) => {
    let str = '';
    for (let i = 0; i < hex.length; i += 2) {
      str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
    }
    return str;
  };

  const generateSecureHash = (message: string, key: string) => {
    if (typeof (window as any).CryptoJS !== 'undefined') {

      const hash =  (window as any).CryptoJS.HmacSHA256(message, key).toString().toUpperCase();

      console.log({ message, key, hash });
      return hash;
    }

  
    console.warn('CryptoJS not available, using fallback hash');
    // Fallback hash generation (for testing only)
    return 'FALLBACK_HASH_' + Math.random().toString(36).substr(2, 9);
  };
const formatUnixTimestamp = (unixTimestampSeconds: number, useUTC: boolean = false): string => {
  // 1. Convert seconds to milliseconds (required for JavaScript Date object)
  if (typeof unixTimestampSeconds !== 'number' || isNaN(unixTimestampSeconds)) {
    return 'Invalid Timestamp';
  }
  const date = new Date(unixTimestampSeconds * 1000);

  // Helper function to pad single digits with a leading zero
  const pad = (num) => String(num).padStart(2, '0');

  // 2. Extract components based on local or UTC time
  const year = useUTC ? date.getUTCFullYear() : date.getFullYear();
  const month = useUTC ? date.getUTCMonth() : date.getMonth();
  const day = useUTC ? date.getUTCDate() : date.getDate();
  const hours = useUTC ? date.getUTCHours() : date.getHours();
  const minutes = useUTC ? date.getMinutes() : date.getMinutes();

  // getMonth() is 0-indexed, so we add 1, then pad
  const formattedMonth = pad(month + 1);
  
  // 3. Construct the final format
  return `${year}${formattedMonth}${pad(day)}${pad(hours)}${pad(minutes)}`;
};


  const initializeMoamalatPayment = async () => {
    try {
      console.log('Starting Moamalat payment initialization...');

      if (!scriptsLoaded) {
        console.log('Scripts not loaded yet, loading now...');
        await loadPaymentScripts();
      }

      // Wait for Lightbox to be available
      const waitForLightbox = () => {
        return new Promise<void>((resolve, reject) => {
          let attempts = 0;
          const maxAttempts = 50; // 5 seconds max

          const checkLightbox = () => {
            attempts++;
            console.log(`Checking for Lightbox... attempt ${attempts}`);

            if (typeof (window as any).Lightbox !== 'undefined' && (window as any).Lightbox.Checkout) {
              console.log('Lightbox found!');
              resolve();
            } else if (attempts >= maxAttempts) {
              reject(new Error('Lightbox failed to load within timeout'));
            } else {
              setTimeout(checkLightbox, 100);
            }
          };
          checkLightbox();
        });
      };

      console.log('Waiting for Lightbox to be available...');
      await waitForLightbox();

      // Use provided Moamalat test credentials
      const merchantId = '10081014649';
      const terminalId = '99179395';
      const secretKey = '3a488a89b3f7993476c252f017c488bb';
      const Amount = finalPrice; // Use actual final price instead of fixed Amount
      const merchantReference = 'test-demo';
      const DateTimeLocalTrxn = '202510252113';
      const MOAMALATPAY_PRODUCTION = false;

      // Generate current timestamp in required format
      const now = new Date();
      const time = formatUnixTimestamp(Math.floor(now.getTime() / 1000));
      const message = `Amount=${Amount}&TxnDate=${time}&MerchantId=${merchantId}&MerchantReference=${merchantReference}&TerminalId=${terminalId}`;
      const secureHash = generateSecureHash(message, secretKey);

      console.log('Initializing Moamalat payment with:', {
        Amount: "100",
        Currency: "818",
        merchantId,
        terminalId,
        PaidThrough: "Card",
        PayerAccount: "400000XXXXXX0002",
        PayerName: "123",
        ProviderSchemeName: "",
        SystemReference: "78554",
        TxnDate: "200917135922",
        merchantReference,
        DateTimeLocalTrxn,
        secureHash,
        MOAMALATPAY_PRODUCTION,
        message
      });

      // Check what methods are available on Lightbox
      console.log('Available Lightbox methods:', Object.keys((window as any).Lightbox));
      console.log('Available Checkout methods:', Object.keys((window as any).Lightbox.Checkout));

      // Try different configuration approaches
      let configSuccess = false;

      // Method 1: Try configure as a function
      if (typeof (window as any).Lightbox.Checkout.configure === 'function') {
        console.log('Using configure as function');
        (window as any).Lightbox.Checkout.configure({
          MID: merchantId,
          TID: terminalId,
          AmountTrxn: Amount,
          MerchantReference: merchantReference,
          TrxDateTime: time,
          SecureHash: secureHash,
          MOAMALATPAY_PRODUCTION,
          ReturnUrl: window.location.origin + '/payment-success',
          CallbackUrl: window.location.origin + '/payment-callback',
          CurrencyCode: 'LYD',
          completeCallback(data) {
            console.log('Payment completed successfully:', data);
            setIsProcessing(false);
            onClose();
            setTimeout(() => {
              alert('تمت عملية الدفع بنجاح! سيتم تفعيل الاشتراك قريباً.');
            }, 500);
          },
          errorCallback(error) {
            console.log('Payment error occurred:', error);
            setIsProcessing(false);
            alert('حدث خطأ في عملية الدفع: ' + (error?.error || error?.message || 'خطأ غير معروف'));
          },
          cancelCallback() {
            console.log('Payment was cancelled by user');
            setIsProcessing(false);
          }
        });
        configSuccess = true;
      }
      // Method 2: Try configure as property assignment
      else if ((window as any).Lightbox.Checkout.configure) {
        console.log('Using configure as property assignment');
        (window as any).Lightbox.Checkout.configure = {
          MID: merchantId,
          TID: terminalId,
          AmountTrxn: Amount,
          MerchantReference: merchantReference,
          TrxDateTime: time,
          SecureHash: secureHash,
          MOAMALATPAY_PRODUCTION,
          ReturnUrl: window.location.origin + '/payment-success',
          CallbackUrl: window.location.origin + '/payment-callback',
          CurrencyCode: 'LYD',
          completeCallback(data) {
            console.log('Payment completed successfully:', data);
            setIsProcessing(false);
            onClose();
            setTimeout(() => {
              alert('تمت عملية الدفع بنجاح! سيتم تفعيل الاشتراك قريباً.');
            }, 500);
          },
          errorCallback(error) {
            console.log('Payment error occurred:', error);
            setIsProcessing(false);
            alert('حدث خطأ في عملية الدفع: ' + (error?.error || error?.message || 'خطأ غير معروف'));
          },
          cancelCallback() {
            console.log('Payment was cancelled by user');
            setIsProcessing(false);
          }
        };
        configSuccess = true;
      }
      // Method 3: Try direct property assignment on Checkout
      else {
        console.log('Using direct property assignment on Checkout');
        (window as any).Lightbox.Checkout.MID = merchantId;
        (window as any).Lightbox.Checkout.TID = terminalId;
        (window as any).Lightbox.Checkout.AmountTrxn = Amount;
        (window as any).Lightbox.Checkout.MerchantReference = merchantReference;
        (window as any).Lightbox.Checkout.TrxDateTime = time;
        (window as any).Lightbox.Checkout.SecureHash = secureHash;
        (window as any).Lightbox.Checkout.MOAMALATPAY_PRODUCTION = MOAMALATPAY_PRODUCTION;
        (window as any).Lightbox.Checkout.ReturnUrl = window.location.origin + '/payment-success';
        (window as any).Lightbox.Checkout.CallbackUrl = window.location.origin + '/payment-callback';
        (window as any).Lightbox.Checkout.CurrencyCode = 'LYD';

        // Set callbacks
        (window as any).Lightbox.Checkout.completeCallback = function(data) {
          console.log('Payment completed successfully:', data);
          setIsProcessing(false);
          onClose();
          setTimeout(() => {
            alert('تمت عملية الدفع بنجاح! سيتم تفعيل الاشتراك قريباً.');
          }, 500);
        };
        (window as any).Lightbox.Checkout.errorCallback = function(error) {
          console.log('Payment error occurred:', error);
          setIsProcessing(false);
          alert('حدث خطأ في عملية الدفع: ' + (error?.error || error?.message || 'خطأ غير معروف'));
        };
        (window as any).Lightbox.Checkout.cancelCallback = function() {
          console.log('Payment was cancelled by user');
          setIsProcessing(false);
        };

        configSuccess = true;
      }

      if (!configSuccess) {
        throw new Error('Could not configure Lightbox - no suitable configuration method found');
      }

      console.log('Lightbox configured successfully, showing lightbox...');

      // Verify showLightbox method exists
      if (typeof (window as any).Lightbox.Checkout.showLightbox !== 'function') {
        throw new Error('Lightbox.Checkout.showLightbox is not a function');
      }

      // Small delay to ensure everything is ready
      setTimeout(() => {
        try {
          console.log('Calling showLightbox...');
          (window as any).Lightbox.Checkout.showLightbox();
          console.log('showLightbox called successfully');
        } catch (error) {
          console.error('Error showing lightbox:', error);
          setIsProcessing(false);
          alert('حدث خطأ في فتح بوابة الدفع: ' + ((error as Error).message || 'خطأ غير معروف'));
        }
      }, 1000);

    } catch (error) {
      console.error('Payment initialization failed:', error);
      setIsProcessing(false);
      alert('فشل في تهيئة بوابة الدفع: ' + ((error as Error).message || 'خطأ غير معروف'));
    }
  };

  const handlePaymentComplete = async () => {
    if (selectedPaymentMethod === 'moamalat') {
      setIsProcessing(true);
      try {
        await initializeMoamalatPayment();
      } catch (error) {
        console.error('Payment initialization failed:', error);
        setIsProcessing(false);
        alert('فشل في تهيئة بوابة الدفع. يرجى المحاولة مرة أخرى.');
      }
    } else {
      setIsProcessing(true);
      // Simulate payment processing for other methods
      setTimeout(() => {
        setIsProcessing(false);
        onClose();
        setTimeout(() => {
          alert('تمت عملية الدفع بنجاح! سيتم تفعيل الاشتراك قريباً.');
        }, 500);
      }, 3000);
    }
  };

  const resetModal = () => {
    setCurrentStep(1);
    setCouponCode('');
    setAppliedCoupon(null);
    setSelectedPaymentMethod(null);
    setIsProcessing(false);
  };

  useEffect(() => {
    if (!isOpen) {
      resetModal();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative max-w-4xl w-full max-h-[90vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Background Effects */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-700 rounded-3xl"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-white/10 to-transparent rounded-full -translate-y-48 translate-x-48 animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-br from-white/5 to-transparent rounded-full translate-y-32 -translate-x-32 animate-pulse"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full animate-pulse"></div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Progress Indicator */}
          <div className="relative z-10 p-6">
            <div className="flex items-center justify-center mb-6">
              <div className="flex items-center space-x-4 rtl:space-x-reverse">
                {[1, 2, 3].map((step) => (
                  <div key={step} className="flex items-center">
                    <motion.div
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                        step <= currentStep
                          ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg'
                          : 'bg-white/20 text-white/60 backdrop-blur-sm'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {step}
                    </motion.div>
                    {step < 3 && (
                      <div className={`w-12 h-0.5 mx-2 transition-all duration-300 ${
                        step < currentStep ? 'bg-green-500' : 'bg-white/30'
                      }`} />
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-center space-x-8 rtl:space-x-reverse text-sm text-white/80 mb-6">
              <span className={currentStep >= 1 ? 'text-white font-medium' : ''}>ملخص المشتريات</span>
              <span className={currentStep >= 2 ? 'text-white font-medium' : ''}>طرق الدفع</span>
              <span className={currentStep >= 3 ? 'text-white font-medium' : ''}>إتمام الدفع</span>
            </div>
          </div>

          {/* Content */}
          <div className="relative z-10 px-6 pb-6 max-h-[70vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            <Card className="bg-white/95 backdrop-blur-md border-0 shadow-2xl">
              <CardContent className="p-8">

                {/* Step 1: Purchase Summary */}
                {currentStep === 1 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div className="text-center mb-8">
                      <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                        <Crown className="h-8 w-8 text-white" />
                      </div>
                      <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-700 to-purple-700 bg-clip-text text-transparent mb-2">
                        {selectedPackage?.name}
                      </h2>
                      <p className="text-gray-600">مراجعة تفاصيل الاشتراك</p>
                    </div>

                    {/* Billing Cycle Toggle */}
                    <div className="flex items-center justify-center gap-4 mb-6 p-4 bg-gray-50 rounded-xl">
                      <span className={`text-sm font-medium ${billingCycle === 'monthly' ? 'text-indigo-600' : 'text-gray-500'}`}>شهري</span>
                      <Switch
                        checked={billingCycle === 'yearly'}
                        onCheckedChange={(checked) => onBillingCycleChange(checked ? 'yearly' : 'monthly')}
                        className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-indigo-500 data-[state=checked]:to-purple-500"
                      />
                      <span className={`text-sm font-medium ${billingCycle === 'yearly' ? 'text-indigo-600' : 'text-gray-500'}`}>سنوي</span>
                      {billingCycle === 'yearly' && (
                        <Badge className="bg-green-100 text-green-800 text-xs">وفر {selectedPackage?.id === 'lite' ? '1%' : selectedPackage?.id === 'growth' ? '3%' : '5%'}</Badge>
                      )}
                    </div>

                    {/* Pricing Breakdown */}
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-4 bg-gray-50 rounded-xl">
                        <span className="text-gray-700">السعر الأساسي ({billingCycle === 'yearly' ? 'سنوي' : 'شهري'})</span>
                        <span className="font-bold text-lg">{basePrice} د.ل</span>
                      </div>

                      {discount > 0 && (
                        <div className="flex justify-between items-center p-4 bg-green-50 rounded-xl border border-green-200">
                          <span className="text-green-700 flex items-center gap-2">
                            <Percent className="h-4 w-4" />
                            الخصم ({selectedPackage?.id === 'lite' ? '1%' : selectedPackage?.id === 'growth' ? '3%' : '5%'})
                          </span>
                          <span className="font-bold text-green-600">-{discount.toFixed(0)} د.ل</span>
                        </div>
                      )}

                      {/* Coupon Section */}
                      <div className="space-y-3">
                        <Label htmlFor="coupon" className="text-gray-700 font-medium">كوبون تخفيض</Label>
                        <div className="flex gap-2">
                          <Input
                            id="coupon"
                            placeholder="أدخل رمز الكوبون"
                            value={couponCode}
                            onChange={(e) => setCouponCode(e.target.value)}
                            className="flex-1"
                          />
                          <Button
                            onClick={handleCouponApply}
                            variant="outline"
                            className="px-6"
                          >
                            <Gift className="h-4 w-4 mr-2" />
                            تطبيق
                          </Button>
                        </div>
                        {appliedCoupon && (
                          <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg border border-purple-200">
                            <span className="text-purple-700 flex items-center gap-2">
                              <Sparkles className="h-4 w-4" />
                              كوبون: {appliedCoupon}
                            </span>
                            <span className="font-bold text-purple-600">-{couponDiscount.toFixed(0)} د.ل</span>
                          </div>
                        )}
                      </div>

                      <div className="border-t pt-4">
                        <div className="flex justify-between items-center p-4 bg-indigo-50 rounded-xl border-2 border-indigo-200">
                          <span className="text-indigo-800 font-bold text-lg">الإجمالي</span>
                          <span className="text-2xl font-bold text-indigo-900">{finalPrice.toFixed(0)} د.ل</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg mt-2">
                          <span className="text-blue-700">المبلغ المستحق</span>
                          <span className="font-bold text-blue-800">{finalPrice.toFixed(0)} د.ل</span>
                        </div>
                      </div>
                    </div>

                    <div className="text-center text-sm text-gray-600 bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                      <AlertCircle className="h-4 w-4 inline mr-2 text-yellow-600" />
                      📄 سيتم التحقق من الوصل قبل تفعيل الاشتراك.
                    </div>

                    <div className="flex justify-end gap-4 pt-6">
                      <Button variant="outline" onClick={onClose}>
                        إلغاء
                      </Button>
                      <Button
                        onClick={() => setCurrentStep(2)}
                        className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
                      >
                        استمرار
                        <ArrowRight className="h-4 w-4 mr-2" />
                      </Button>
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Payment Methods */}
                {currentStep === 2 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div className="text-center mb-8">
                      <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                        <CreditCard className="h-8 w-8 text-white" />
                      </div>
                      <h2 className="text-3xl font-bold bg-gradient-to-r from-green-700 to-emerald-700 bg-clip-text text-transparent mb-2">
                        اختر طريقة الدفع
                      </h2>
                      <p className="text-gray-600">اختر الطريقة الأنسب لك من الخيارات المتاحة</p>
                    </div>

                    <div className="grid grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-8">
                      {paymentMethods.map((method) => (
                        <motion.div
                          key={method.id}
                          whileHover={{ scale: 1.15 }}
                          whileTap={{ scale: 0.85 }}
                          className={`relative p-8 rounded-3xl cursor-pointer transition-all duration-300 ${
                            selectedPaymentMethod === method.id
                              ? 'border-4 border-green-500 bg-green-50 shadow-2xl'
                              : 'border-2 border-gray-200 hover:border-gray-400 hover:shadow-xl bg-white'
                          }`}
                          onClick={() => handlePaymentSelect(method.id)}
                        >
                          <div className="text-center">
                            <div className="w-20 h-20 mx-auto bg-white rounded-3xl flex items-center justify-center shadow-lg border border-gray-100">
                              <img
                                src={method.icon}
                                alt={method.name}
                                className="w-16 h-16 object-contain"
                              />
                            </div>
                          </div>
                          {selectedPaymentMethod === method.id && (
                            <div className="absolute -top-3 -right-3 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                              <CheckCircle className="h-5 w-5 text-white" />
                            </div>
                          )}
                        </motion.div>
                      ))}
                    </div>

                    <div className="flex justify-between items-center pt-6">
                      <Button variant="outline" onClick={() => setCurrentStep(1)}>
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        رجوع
                      </Button>
                      <Button
                        onClick={handleProceedToPayment}
                        disabled={!selectedPaymentMethod}
                        className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 disabled:opacity-50"
                      >
                        استمرار
                        <ArrowRight className="h-4 w-4 mr-2" />
                      </Button>
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Payment Gateway */}
                {currentStep === 3 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div className="text-center mb-8">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                        <Shield className="h-8 w-8 text-white" />
                      </div>
                      <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-700 to-indigo-700 bg-clip-text text-transparent mb-2">
                        بوابة الدفع الإلكتروني
                      </h2>
                      <p className="text-gray-600">البوابة الوطنية للمدفوعات الإلكترونية في ليبيا</p>
                    </div>

                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-2xl border border-blue-200 shadow-xl">
                      <div className="text-center space-y-6">
                        <div className="w-24 h-24 mx-auto bg-white rounded-2xl flex items-center justify-center shadow-xl border border-blue-100">
                          <img
                            src="/data/payment/moamalat.png"
                            alt="معاملات"
                            className="w-16 h-16 object-contain"
                          />
                        </div>
                        <h3 className="text-2xl font-bold text-blue-900">معاملات</h3>
                        <p className="text-blue-700 text-lg">البوابة الوطنية الليبية للمدفوعات الإلكترونية</p>

                        <div className="bg-white p-6 rounded-xl shadow-lg border border-blue-100">
                          <div className="flex justify-between items-center mb-4">
                            <span className="text-gray-700 font-medium">المبلغ المطلوب:</span>
                            <span className="font-bold text-xl text-blue-900">{finalPrice.toFixed(0)} د.ل</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-700 font-medium">رسوم المعالجة:</span>
                            <span className="text-green-600 font-semibold">مجاناً</span>
                          </div>
                        </div>

                        <div className="text-sm text-gray-600 space-y-3 bg-white/50 p-4 rounded-lg">
                          <p className="flex items-center justify-center gap-2">
                            <span className="text-xl">🔒</span>
                            <span>جميع المعاملات محمية ومشفرة</span>
                          </p>
                          <p className="flex items-center justify-center gap-2">
                            <span className="text-xl">⚡</span>
                            <span>معالجة فورية للمدفوعات</span>
                          </p>
                          <p className="flex items-center justify-center gap-2">
                            <span className="text-xl">📱</span>
                            <span>متوافق مع جميع الأجهزة</span>
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                      <div className="flex items-start gap-3">
                        <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                        <div className="text-sm text-yellow-800">
                          <p className="font-medium mb-1">ملاحظة هامة:</p>
                          <p>في حالة ظهور أي أخطاء في بوابة الدفع، يرجى المحاولة مرة أخرى أو اختيار طريقة دفع أخرى.</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between items-center pt-6">
                      <Button variant="outline" onClick={() => setCurrentStep(2)}>
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        رجوع
                      </Button>
                      <Button
                        onClick={handlePaymentComplete}
                        disabled={isProcessing}
                        className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 disabled:opacity-50"
                      >
                        {isProcessing ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            جاري المعالجة...
                          </>
                        ) : (
                          <>
                            <Zap className="h-4 w-4 mr-2" />
                            إتمام الدفع
                          </>
                        )}
                      </Button>
                    </div>

                    <div className="text-center text-xs text-gray-500">
                      بوابة معاملات - البوابة الوطنية للمدفوعات الإلكترونية في ليبيا
                    </div>
                  </motion.div>
                )}

              </CardContent>
            </Card>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};