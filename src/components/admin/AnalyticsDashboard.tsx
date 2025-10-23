import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const AnalyticsDashboard: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>لوحة التحليلات</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center py-12 text-gray-600">سيتم عرض تحليلات النظام قريباً</div>
      </CardContent>
    </Card>
  );
};

export default AnalyticsDashboard;
