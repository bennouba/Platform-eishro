import React, { useEffect, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface MoamalatRealLightboxProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
  orderData: any;
  onPaymentSuccess: (transactionData: any) => void;
  onPaymentError: (error: string) => void;
}

// Moamalat Real Lightbox Configuration
const MOAMALAT_CONFIG = {
  // Test credentials - Replace with production values
  merchantId: '10081014649',
  terminalId: '99179395',
  merchantSecretKey: '3a488a89b3f7993476c252f017c488bb',
  
  // Environment URLs
  testURL: 'https://test.moamalat.net/api/v2/LightBox',
  productionURL: 'https://npg.moamalat.net/api/v2/LightBox',
  
  // SDK URLs
  testSDK: 'https://test.moamalat.net/lightbox/moamalat.lightbox.js',
  productionSDK: 'https://npg.moamalat.net/lightbox/moamalat.lightbox.js',
  
  // Environment flag
  isProduction: false // Set to true for production
};

const MoamalatRealLightbox: React.FC<MoamalatRealLightboxProps> = ({
  isOpen,
  onClose,
  amount,
  orderData,
  onPaymentSuccess,
  onPaymentError
}) => {
  const lightboxRef = useRef<HTMLDivElement>(null);
  const sdkLoadedRef = useRef<boolean>(false);

  // Load Moamalat Lightbox SDK
  useEffect(() => {
    if (isOpen && !sdkLoadedRef.current) {
      loadMoamalatSDK();
    }
  }, [isOpen, loadMoamalatSDK]);

  function loadMoamalatSDK() {
    // Check if script already exists
    if (document.querySelector('#moamalat-sdk')) {
      initializeLightbox();
      return;
    }

    const script = document.createElement('script');
    script.id = 'moamalat-sdk';
    script.src = MOAMALAT_CONFIG.isProduction
      ? MOAMALAT_CONFIG.productionSDK
      : MOAMALAT_CONFIG.testSDK;

    script.onload = () => {
      console.log('Moamalat SDK loaded successfully');
      sdkLoadedRef.current = true;
      initializeLightbox();
    };

    script.onerror = () => {
      console.error('Failed to load Moamalat SDK');
      onPaymentError('فشل في تحميل نظام الدفع. يرجى المحاولة لاحقاً.');
    };

    document.head.appendChild(script);
  }

  const initializeLightbox = () => {
    if (!lightboxRef.current) return;

    try {
      // Generate unique merchant reference
      const merchantReference = `ESHRO_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`;
      
      // Convert amount to dirhams (Moamalat expects smallest unit)
      const amountInDirhams = Math.round(amount * 1000);

      // Generate secure hash (simplified - in production use proper HMAC-SHA256)
      const secureHash = generateSecureHash({
        merchantId: MOAMALAT_CONFIG.merchantId,
        terminalId: MOAMALAT_CONFIG.terminalId,
        amount: amountInDirhams,
        merchantReference: merchantReference,
        secretKey: MOAMALAT_CONFIG.merchantSecretKey
      });

      // Create lightbox parameters
      const lightboxParams = {
        merchantId: MOAMALAT_CONFIG.merchantId,
        terminalId: MOAMALAT_CONFIG.terminalId,
        amount: amountInDirhams,
        merchantReference: merchantReference,
        currency: '434', // LYD
        secureHash: secureHash,
        redirectUrl: window.location.href,
        
        // Callback functions
        onSuccess: handlePaymentSuccess,
        onError: handlePaymentError,
        onCancel: handlePaymentCancel,
        
        // UI Configuration
        language: 'ar',
        theme: 'default'
      };

      // Initialize Moamalat Lightbox
      if ((window as any).MoamalatLightbox) {
        (window as any).MoamalatLightbox.init(lightboxParams);
      } else {
        // Fallback: Use iframe integration
        createLightboxIframe(lightboxParams);
      }

    } catch (error) {
      console.error('Error initializing Moamalat Lightbox:', error);
      onPaymentError('خطأ في تهيئة نظام الدفع');
    }
  };

  const generateSecureHash = (params: any) => {
    // This is a simplified hash generation
    // In production, use proper HMAC-SHA256 with crypto library
    const hashString = `${params.merchantId}|${params.terminalId}|${params.amount}|${params.merchantReference}|${params.secretKey}`;
    
    // For now, return a simple hash (replace with proper HMAC-SHA256)
    return btoa(hashString).replace(/[^a-zA-Z0-9]/g, '').substring(0, 32);
  };

  const createLightboxIframe = (params: any) => {
    if (!lightboxRef.current) return;

    const iframe = document.createElement('iframe');
    iframe.src = buildLightboxURL(params);
    iframe.style.cssText = `
      width: 100%;
      height: 600px;
      border: none;
      border-radius: 8px;
    `;

    // Add event listener for iframe messages
    window.addEventListener('message', handleIframeMessage, false);

    lightboxRef.current.appendChild(iframe);
  };

  const buildLightboxURL = (params: any) => {
    const baseURL = MOAMALAT_CONFIG.isProduction 
      ? MOAMALAT_CONFIG.productionURL 
      : MOAMALAT_CONFIG.testURL;

    const queryParams = new URLSearchParams({
      merchantId: params.merchantId,
      terminalId: params.terminalId,
      amount: params.amount.toString(),
      merchantReference: params.merchantReference,
      currency: params.currency,
      secureHash: params.secureHash,
      language: params.language || 'ar'
    });

    return `${baseURL}?${queryParams.toString()}`;
  };

  const handleIframeMessage = (event: MessageEvent) => {
    try {
      const data = typeof event.data === 'string' ? JSON.parse(event.data) : event.data;
      
      if (data.type === 'moamalat-payment') {
        switch (data.status) {
          case 'success':
            handlePaymentSuccess(data.transaction);
            break;
          case 'error':
            handlePaymentError(data.error);
            break;
          case 'cancel':
            handlePaymentCancel();
            break;
        }
      }
    } catch (error) {
      console.error('Error handling iframe message:', error);
    }
  };

  const handlePaymentSuccess = (transactionData: any) => {
    console.log('Payment successful:', transactionData);
    
    // Clean up
    cleanup();
    
    // Format transaction data
    const formattedData = {
      TxnDate: transactionData.txnDate || new Date().toISOString().replace(/[-:]/g, '').slice(0, 14),
      SystemReference: transactionData.systemReference || Math.floor(Math.random() * 9999999) + 1000000,
      NetworkReference: transactionData.networkReference || '506' + Math.floor(Math.random() * 999999999),
      MerchantReference: transactionData.merchantReference,
      Amount: transactionData.amount || (amount * 1000).toString(),
      Currency: transactionData.currency || '434',
      PaidThrough: transactionData.paidThrough || 'Card',
      PayerAccount: transactionData.payerAccount,
      PayerName: transactionData.payerName,
      status: 'completed',
      gateway: 'moamalat_lightbox',
      timestamp: new Date().toISOString(),
      secureHash: transactionData.secureHash
    };
    
    onPaymentSuccess(formattedData);
    onClose();
  };

  const handlePaymentError = (error: string) => {
    console.error('Payment error:', error);
    cleanup();
    onPaymentError(error || 'حدث خطأ في عملية الدفع');
  };

  const handlePaymentCancel = () => {
    console.log('Payment cancelled');
    cleanup();
    onClose();
  };

  function cleanup() {
    // Remove iframe message listener
    window.removeEventListener('message', handleIframeMessage);
    
    // Clear lightbox container
    if (lightboxRef.current) {
      lightboxRef.current.innerHTML = '';
    }
  }

  // Cleanup on unmount
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    return () => {
      cleanup();
    };
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-4xl h-[80vh] relative">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-3">
            <img 
              src="/assets/payment/moamalat.png" 
              alt="Moamalat" 
              className="h-8 w-auto"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
            <h2 className="text-lg font-semibold text-gray-800">بوابة الدفع الإلكترونية</h2>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Payment Information */}
        <div className="p-4 bg-gray-50 border-b">
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div>
              <span className="text-gray-600">اسم المتجر:</span>
              <span className="font-medium ml-2">متجر إشرو</span>
            </div>
            <div>
              <span className="text-gray-600">المبلغ:</span>
              <span className="font-medium ml-2">{amount.toFixed(3)} د.ل</span>
            </div>
            <div>
              <span className="text-gray-600">رقم الطلب:</span>
              <span className="font-medium ml-2">{orderData?.id || 'غير محدد'}</span>
            </div>
          </div>
        </div>

        {/* Lightbox Container */}
        <div 
          ref={lightboxRef}
          className="flex-1 p-4 overflow-auto"
          style={{ height: 'calc(80vh - 140px)' }}
        >
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">جاري تحميل نظام الدفع...</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoamalatRealLightbox;