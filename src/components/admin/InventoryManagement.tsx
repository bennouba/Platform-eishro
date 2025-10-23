import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const InventoryManagement: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>إدارة المخزون</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center py-12 text-gray-600">سيتم تطوير نظام إدارة المخزون قريباً</div>
      </CardContent>
    </Card>
  );
};

export default InventoryManagement;
