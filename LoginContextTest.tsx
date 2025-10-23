import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import CustomerDashboard from './CustomerDashboard';

const LoginContextTest: React.FC = () => {
  console.log('🔐 LoginContextTest component rendering');

  // محاكاة نفس البيانات والـ state الذي يحدث في تسجيل الدخول كمستخدم عادي
  const [currentVisitor, setCurrentVisitor] = useState<any>(null);
  const [isLoggedInAsVisitor, setIsLoggedInAsVisitor] = useState(false);
  const [showWelcomePopup, setShowWelcomePopup] = useState(false);
  const [showWelcomeBackModal, setShowWelcomeBackModal] = useState<any>(null);

  // محاكاة نفس البيانات التي تأتي من الواجهة الترحيبية
  const simulateUserRegistration = () => {
    console.log('📝 Simulating user registration...');

    const visitorData = {
      firstName: 'نزار',
      lastName: 'بن نوبة',
      name: 'نزار بن نوبة',
      email: 'nizar@eshro.ly',
      phone: '944062927',
      membershipType: 'عميل مميز',
      joinDate: '2024-01-15'
    };

    console.log('✅ User registration data:', visitorData);

    // محاكاة نفس الخطوات في handleRegistrationComplete
    setCurrentVisitor(visitorData);
    setIsLoggedInAsVisitor(true);

    // محاكاة نفس التأخير في App.tsx
    setTimeout(() => {
      setShowWelcomeBackModal({
        visitorName: visitorData.firstName,
        isFirstTime: true
      });
    }, 500);
  };

  // محاكاة النقر على متابعة التسوق
  const simulateContinueShopping = () => {
    console.log('🛒 Simulating continue shopping...');
    setShowWelcomeBackModal(null);
  };

  // محاكاة النقر على لوحة التحكم
  const simulateDashboardClick = () => {
    console.log('📊 Simulating dashboard click...');
    console.log('currentVisitor:', currentVisitor);
    console.log('isLoggedInAsVisitor:', isLoggedInAsVisitor);
  };

  return (
    <div style={{
      padding: '20px',
      background: '#f0f0f0',
      minHeight: '100vh',
      fontFamily: 'Arial, sans-serif',
      direction: 'rtl'
    }}>
      <div style={{
        background: 'white',
        padding: '20px',
        marginBottom: '20px',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <h1 style={{ color: 'purple', margin: '0 0 15px 0' }}>
          اختبار سياق تسجيل دخول المستخدم
        </h1>
        <p style={{ color: 'blue', margin: '0 0 15px 0', fontSize: '14px' }}>
          هذا الاختبار يحاكي بالضبط ما يحدث عند تسجيل دخول مستخدم عادي
        </p>

        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <Button
            onClick={simulateUserRegistration}
            style={{ background: 'green', color: 'white' }}
          >
            محاكاة التسجيل في الترحيبية
          </Button>

          <Button
            onClick={simulateContinueShopping}
            style={{ background: 'blue', color: 'white' }}
            disabled={!showWelcomeBackModal}
          >
            محاكاة متابعة التسوق
          </Button>

          <Button
            onClick={simulateDashboardClick}
            style={{ background: 'orange', color: 'white' }}
            disabled={!isLoggedInAsVisitor}
          >
            محاكاة النقر على لوحة التحكم
          </Button>

          <Button
            onClick={() => window.location.reload()}
            variant="outline"
          >
            إعادة تحميل الصفحة
          </Button>
        </div>

        <div style={{ marginTop: '15px', fontSize: '12px', color: 'gray' }}>
          <p>حالة المستخدم الحالي:</p>
          <pre style={{ background: '#f5f5f5', padding: '10px', borderRadius: '4px' }}>
            {JSON.stringify({
              currentVisitor,
              isLoggedInAsVisitor,
              showWelcomeBackModal: !!showWelcomeBackModal
            }, null, 2)}
          </pre>
        </div>
      </div>

      {/* محاكاة السياق الكامل لتسجيل الدخول كمستخدم عادي */}
      {isLoggedInAsVisitor && currentVisitor && !showWelcomeBackModal && (
        <div style={{
          background: 'white',
          border: '3px solid red',
          borderRadius: '8px',
          padding: '15px'
        }}>
          <h3 style={{ color: 'red', margin: '0 0 15px 0' }}>
            🚨 نفس السياق الذي يحدث في تسجيل دخول المستخدم العادي:
          </h3>
          <CustomerDashboard
            customerData={{
              ...currentVisitor,
              context: 'simulated-login-flow',
              isFromLogin: true,
              timestamp: new Date().toISOString()
            }}
            onBack={() => console.log('Login context back clicked')}
            onLogout={() => {
              console.log('Login context logout clicked');
              setCurrentVisitor(null);
              setIsLoggedInAsVisitor(false);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default LoginContextTest;