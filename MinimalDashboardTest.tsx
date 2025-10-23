import React from 'react';
import CustomerDashboard from './CustomerDashboard';

const MinimalDashboardTest: React.FC = () => {
  console.log('MinimalDashboardTest component rendering');

  const minimalCustomerData = {
    firstName: 'مستخدم',
    lastName: 'تجريبي',
    name: 'مستخدم تجريبي',
    email: 'minimal@test.com',
    phone: '944062927',
    membershipType: 'تجريبي',
    joinDate: '2024-01-15'
  };

  return (
    <div>
      <h1 style={{
        position: 'fixed',
        top: '10px',
        left: '10px',
        background: 'blue',
        color: 'white',
        padding: '10px',
        borderRadius: '5px',
        zIndex: 9999
      }}>
        اختبار مبسط - إذا رأيت هذا فالمشكلة ليست في CustomerDashboard
      </h1>
      <CustomerDashboard
        customerData={minimalCustomerData}
        onBack={() => console.log('Minimal back clicked')}
        onLogout={() => console.log('Minimal logout clicked')}
      />
    </div>
  );
};

export default MinimalDashboardTest;