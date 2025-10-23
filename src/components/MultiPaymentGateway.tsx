import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import MoamalatOfficialLightbox from './MoamalatOfficialLightbox';

interface MultiPaymentGatewayProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
  orderData: any;
  onPaymentSuccess: (transactionData: any) => void;
  onPaymentError: (error: string) => void;
}

const MultiPaymentGateway: React.FC<MultiPaymentGatewayProps> = ({
  isOpen,
  onClose,
  amount,
  orderData,
  onPaymentSuccess,
  onPaymentError
}) => {
  const [selectedGateway, setSelectedGateway] = useState<string>('moamalat');
  const [showMoamalat, setShowMoamalat] = useState(false);

  // Payment gateways configuration
  const paymentGateways = [
    {
      id: 'moamalat',
      name: 'معاملات',
      nameAr: 'معاملات',
      logo: '/assets/payment/moamalat.png',
      description: 'البوابة الوطنية للدفع الإلكتروني في ليبيا',
      supportedCards: ['Visa', 'Mastercard', 'Meeza'],
      processingTime: 'فوري',
      fees: '2.5%',
      status: 'active',
      isNational: true
    },
    {
      id: 'fawry',
      name: 'فوري',
      nameAr: 'فوري',
      logo: '/assets/payment/fawry.png',
      description: 'نظام الدفع الإلكتروني المصري',
      supportedCards: ['Visa', 'Mastercard'],
      processingTime: '1-2 دقيقة',
      fees: '2.75%',
      status: 'coming_soon',
      isNational: false
    },
    {
      id: 'paypal',
      name: 'PayPal',
      nameAr: 'باي بال',
      logo: '/assets/payment/paypal.png',
      description: 'منصة الدفع العالمية',
      supportedCards: ['Visa', 'Mastercard', 'Amex'],
      processingTime: 'فوري',
      fees: '3.5%',
      status: 'coming_soon',
      isNational: false
    }
  ];

  const handleGatewaySelection = (gatewayId: string) => {
    setSelectedGateway(gatewayId);

    if (gatewayId === 'moamalat') {
      setShowMoamalat(true);
    } else {
      alert('هذه البوابة قيد التطوير وستكون متاحة قريباً');
    }
  };

  const handleMoamalatSuccess = (transactionData: any) => {
    setShowMoamalat(false);
    onPaymentSuccess(transactionData);
    onClose();
  };

  const handleMoamalatError = (error: string) => {
    setShowMoamalat(false);
    onPaymentError(error);
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl bg-white rounded-lg shadow-2xl">
          <CardHeader className="border-b">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-bold text-gray-900">
                اختر بوابة الدفع
              </CardTitle>
              <Button variant="ghost" onClick={onClose} className="p-2">
                <span className="text-2xl">×</span>
              </Button>
            </div>
            <p className="text-gray-600 mt-2">
              اختر بوابة الدفع المناسبة لإتمام عملية الشراء بأمان
            </p>
          </CardHeader>

          <CardContent className="p-6">
            <Tabs value={selectedGateway} onValueChange={setSelectedGateway}>
              <TabsList className="grid w-full grid-cols-3 mb-6">
                {paymentGateways.map((gateway) => (
                  <TabsTrigger
                    key={gateway.id}
                    value={gateway.id}
                    className="flex flex-col items-center gap-2 p-4"
                    disabled={gateway.status !== 'active'}
                  >
                    <img
                      src={gateway.logo}
                      alt={gateway.nameAr}
                      className="w-8 h-8 object-contain"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                        const parent = (e.target as HTMLElement).parentElement;
                        if (parent) {
                          parent.innerHTML += `<span class="text-lg">${gateway.nameAr.charAt(0)}</span>`;
                        }
                      }}
                    />
                    <span className="text-sm">{gateway.nameAr}</span>
                    {gateway.isNational && (
                      <Badge variant="secondary" className="text-xs">وطني</Badge>
                    )}
                  </TabsTrigger>
                ))}
              </TabsList>

              {paymentGateways.map((gateway) => (
                <TabsContent key={gateway.id} value={gateway.id} className="space-y-4">
                  <div className="border rounded-lg p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <img
                        src={gateway.logo}
                        alt={gateway.nameAr}
                        className="w-12 h-12 object-contain"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none';
                          const parent = (e.target as HTMLElement).parentElement;
                          if (parent) {
                            parent.innerHTML += `<div class="w-12 h-12 bg-primary rounded-lg flex items-center justify-center text-white font-bold">${gateway.nameAr.charAt(0)}</div>`;
                          }
                        }}
                      />
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">{gateway.nameAr}</h3>
                        <p className="text-gray-600">{gateway.description}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <div className="text-sm text-gray-600">الوقت</div>
                        <div className="font-semibold text-gray-900">{gateway.processingTime}</div>
                      </div>
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <div className="text-sm text-gray-600">العمولة</div>
                        <div className="font-semibold text-gray-900">{gateway.fees}</div>
                      </div>
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <div className="text-sm text-gray-600">البطاقات</div>
                        <div className="font-semibold text-gray-900">{gateway.supportedCards.join(', ')}</div>
                      </div>
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <div className="text-sm text-gray-600">الحالة</div>
                        <div className="font-semibold text-green-600">
                          {gateway.status === 'active' ? 'متاح' : 'قريباً'}
                        </div>
                      </div>
                    </div>

                    {gateway.status === 'active' ? (
                      <Button
                        onClick={() => handleGatewaySelection(gateway.id)}
                        className="w-full bg-primary hover:bg-primary/90 text-white py-3"
                      >
                        متابعة الدفع بـ {gateway.nameAr}
                      </Button>
                    ) : (
                      <Button disabled className="w-full bg-gray-300 text-gray-500 py-3">
                        قريباً - {gateway.nameAr}
                      </Button>
                    )}
                  </div>
                </TabsContent>
              ))}
            </Tabs>

            {/* Security Notice */}
            <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center gap-2 text-green-800">
                <span className="text-lg">🔒</span>
                <span className="font-semibold">جميع المعاملات آمنة ومشفرة</span>
              </div>
              <p className="text-sm text-green-700 mt-1">
                نحن نستخدم أحدث تقنيات التشفير لحماية بياناتك وبيانات بطاقتك الائتمانية
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Moamalat Lightbox */}
      <MoamalatOfficialLightbox
        isOpen={showMoamalat}
        onClose={() => setShowMoamalat(false)}
        amount={amount}
        orderData={orderData}
        onPaymentSuccess={handleMoamalatSuccess}
        onPaymentError={handleMoamalatError}
      />
    </>
  );
};

export default MultiPaymentGateway;