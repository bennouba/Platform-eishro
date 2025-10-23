import React from 'react';
import { Button } from '@/components/ui/button';
import CustomerDashboard from './CustomerDashboard';

const SimpleDashboardTest: React.FC = () => {
  console.log('SimpleDashboardTest component rendering');

  // بيانات تجريبية بسيطة جداً
  const simpleCustomerData = {
    firstName: 'تجريبي',
    lastName: 'مستخدم',
    name: 'تجريبي مستخدم',
    email: 'test@example.com',
    phone: '944062927',
    membershipType: 'مستخدم تجريبي',
    joinDate: '2024-01-15'
  };

  return (
    <div style={{
      padding: '10px',
      background: '#f5f5f5',
      minHeight: '100vh',
      fontFamily: 'Arial, sans-serif',
      direction: 'rtl'
    }}>
      <div style={{
        background: 'white',
        padding: '15px',
        marginBottom: '15px',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <h2 style={{ color: 'blue', margin: '0 0 10px 0' }}>
          اختبار مبسط لـ CustomerDashboard
        </h2>
        <p style={{ color: 'green', margin: '0 0 10px 0', fontSize: '14px' }}>
          إذا رأيت هذا النص، فهذا يعني أن صفحة الاختبار تعمل
        </p>
        <Button
          onClick={() => window.history.back()}
          variant="outline"
          style={{ fontSize: '12px' }}
        >
          العودة للخلف
        </Button>
      </div>

      <div style={{
        background: 'white',
        border: '3px solid red',
        borderRadius: '8px',
        padding: '10px'
      }}>
        <h3 style={{ color: 'red', margin: '0 0 15px 0', fontSize: '16px' }}>
          لوحة تحكم المستخدم - CustomerDashboard:
        </h3>
        <div style={{ border: '2px solid blue', borderRadius: '4px' }}>
          <CustomerDashboard
            customerData={simpleCustomerData}
            onBack={() => console.log('Simple test back clicked')}
            onLogout={() => console.log('Simple test logout clicked')}
          />
        </div>
      </div>
    </div>
  );
};

export default SimpleDashboardTest;