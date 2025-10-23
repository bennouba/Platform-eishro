import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import CustomerDashboard from './CustomerDashboard';

const ContextComparisonTest: React.FC = () => {
  console.log('⚖️ ContextComparisonTest component rendering');

  const [showComparison, setShowComparison] = useState(false);

  // بيانات الاختبار الناجح (من صفحات الاختبار)
  const testContextData = {
    firstName: 'مستخدم',
    lastName: 'اختبار',
    name: 'مستخدم اختبار',
    email: 'test@eshro.ly',
    phone: '944062927',
    membershipType: 'مستخدم تجريبي',
    joinDate: '2024-01-15',
    context: 'test-context',
    isFromLogin: false,
    timestamp: new Date().toISOString()
  };

  // بيانات تسجيل الدخول (محاكاة البيانات الحقيقية)
  const loginContextData = {
    firstName: 'نزار',
    lastName: 'بن نوبة',
    name: 'نزار بن نوبة',
    email: 'nizar@eshro.ly',
    phone: '944062927',
    membershipType: 'عميل مميز',
    joinDate: '2024-01-15',
    context: 'login-context',
    isFromLogin: true,
    timestamp: new Date().toISOString()
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
        <h1 style={{ color: 'orange', margin: '0 0 15px 0' }}>
          مقارنة سياقات CustomerDashboard
        </h1>
        <p style={{ color: 'purple', margin: '0 0 15px 0', fontSize: '14px' }}>
          هذه الصفحة تقارن بين السياقين المختلفين لتحديد سبب المشكلة
        </p>

        <Button
          onClick={() => setShowComparison(!showComparison)}
          style={{ background: 'purple', color: 'white' }}
        >
          {showComparison ? 'إخفاء المقارنة' : 'عرض المقارنة'}
        </Button>
      </div>

      {showComparison && (
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
          {/* السياق الناجح - من صفحات الاختبار */}
          <div style={{
            flex: 1,
            minWidth: '400px',
            background: 'white',
            border: '3px solid green',
            borderRadius: '8px',
            padding: '15px'
          }}>
            <h3 style={{ color: 'green', margin: '0 0 15px 0', textAlign: 'center' }}>
              ✅ السياق الناجح (صفحات الاختبار)
            </h3>
            <div style={{ border: '2px solid green', borderRadius: '4px' }}>
              <CustomerDashboard
                customerData={testContextData}
                onBack={() => console.log('Test context back clicked')}
                onLogout={() => console.log('Test context logout clicked')}
              />
            </div>
          </div>

          {/* السياق المشكل - من تسجيل دخول المستخدم */}
          <div style={{
            flex: 1,
            minWidth: '400px',
            background: 'white',
            border: '3px solid red',
            borderRadius: '8px',
            padding: '15px'
          }}>
            <h3 style={{ color: 'red', margin: '0 0 15px 0', textAlign: 'center' }}>
              ❌ السياق المشكل (تسجيل دخول المستخدم)
            </h3>
            <div style={{ border: '2px solid red', borderRadius: '4px' }}>
              <CustomerDashboard
                customerData={loginContextData}
                onBack={() => console.log('Login context back clicked')}
                onLogout={() => console.log('Login context logout clicked')}
              />
            </div>
          </div>
        </div>
      )}

      {/* معلومات المقارنة */}
      <div style={{
        background: 'white',
        padding: '20px',
        marginTop: '20px',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <h3 style={{ color: 'blue', margin: '0 0 15px 0' }}>📊 تحليل الفرق بين السياقين:</h3>

        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: '300px' }}>
            <h4 style={{ color: 'green', margin: '0 0 10px 0' }}>✅ السياق الناجح:</h4>
            <pre style={{ background: '#f0f0f0', padding: '10px', borderRadius: '4px', fontSize: '12px' }}>
              {JSON.stringify(testContextData, null, 2)}
            </pre>
          </div>

          <div style={{ flex: 1, minWidth: '300px' }}>
            <h4 style={{ color: 'red', margin: '0 0 10px 0' }}>❌ السياق المشكل:</h4>
            <pre style={{ background: '#f0f0f0', padding: '10px', borderRadius: '4px', fontSize: '12px' }}>
              {JSON.stringify(loginContextData, null, 2)}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContextComparisonTest;