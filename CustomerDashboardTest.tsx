import React from 'react';
import { Button } from '@/components/ui/button';
import CustomerDashboard from './CustomerDashboard';

interface CustomerDashboardTestProps {
  onBack: () => void;
}

const CustomerDashboardTest: React.FC<CustomerDashboardTestProps> = ({ onBack }) => {
  // بيانات تجريبية بسيطة
  const testCustomerData = {
    firstName: 'أحمد',
    lastName: 'محمد',
    name: 'أحمد محمد',
    email: 'test@example.com',
    phone: '944062927',
    membershipType: 'عميل مميز',
    joinDate: '2024-01-15'
  };

  console.log('CustomerDashboardTest rendering with data:', testCustomerData);

  return (
    <div style={{ padding: '20px', background: '#f0f0f0', minHeight: '100vh' }}>
      <div style={{ marginBottom: '20px' }}>
        <Button onClick={onBack} variant="outline">
          العودة للرئيسية
        </Button>
        <h1 style={{ margin: '10px 0', color: 'blue' }}>
          اختبار لوحة تحكم المستخدم - CustomerDashboard Test
        </h1>
        <p style={{ color: 'green', fontSize: '14px' }}>
          إذا رأيت هذا النص، فهذا يعني أن الصفحة تعمل بشكل طبيعي
        </p>
      </div>

      <div style={{ border: '2px solid red', padding: '10px', background: 'white' }}>
        <h3 style={{ color: 'red', marginBottom: '10px' }}>
          مؤشر التشخيص - إذا رأيت هذا فالمشكلة ليست في CustomerDashboard component:
        </h3>
        <CustomerDashboard
          customerData={testCustomerData}
          onBack={() => console.log('Test back clicked')}
          onLogout={() => console.log('Test logout clicked')}
        />
      </div>
    </div>
  );
};

export default CustomerDashboardTest;