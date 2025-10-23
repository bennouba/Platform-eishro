import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const FinancialDashboard: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>الإدارة المالية</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center py-12 text-gray-600">سيتم عرض لوحة التحكم المالية هنا قريباً</div>
      </CardContent>
    </Card>
  );
};

export default FinancialDashboard;
