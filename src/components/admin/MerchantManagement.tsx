import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const MerchantManagement: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>إدارة التجار</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center py-12 text-gray-600">سيتم تطوير نظام إدارة التجار قريباً</div>
      </CardContent>
    </Card>
  );
};

export default MerchantManagement;
