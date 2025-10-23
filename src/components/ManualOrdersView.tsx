import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Plus,
  Search,
  Filter,
  Download,
  Edit,
  Trash2,
  Eye,
  ShoppingBag,
  User,
  Phone,
  Mail,
  MapPin,
  CreditCard,
  Truck,
  Save,
  X,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  Package,
  DollarSign,
  FileText,
  Users,
  Building,
  Globe,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { libyanCities } from '@/data/libyanCities';

interface ManualOrder {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  status: 'new' | 'paid' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  paymentMethod: string;
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  shippingMethod: string;
  shippingAddress: string;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  notes: string;
  internalNotes: string;
  createdAt: string;
  updatedAt: string;
}

interface OrderItem {
  id: string;
  productName: string;
  sku: string;
  quantity: number;
  price: number;
  total: number;
}

interface ManualOrdersViewProps {
  storeData: any;
  setStoreData: (data: any) => void;
  onSave: () => void;
}

const ManualOrdersView: React.FC<ManualOrdersViewProps> = ({ storeData, setStoreData, onSave }) => {
  const [activeTab, setActiveTab] = useState('orders');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  // Form states
  const [orderForm, setOrderForm] = useState({
    orderNumber: `ORD-${Date.now()}`,
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    customerCity: '',
    customerArea: '',
    shippingAddress: '',
    paymentMethod: '',
    bankName: '',
    accountHolder: '',
    transactionStatus: 'pending',
    shippingMethod: '',
    expectedDelivery: '',
    customerNotes: '',
    internalNotes: '',
    items: [] as OrderItem[],
  });

  const orders = storeData?.manualOrders || [];
  const filteredOrders = orders.filter((order: ManualOrder) =>
    order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateOrder = () => {
    setOrderForm({
      orderNumber: `ORD-${Date.now()}`,
      customerName: '',
      customerEmail: '',
      customerPhone: '',
      customerCity: '',
      customerArea: '',
      shippingAddress: '',
      paymentMethod: '',
      bankName: '',
      accountHolder: '',
      transactionStatus: 'pending',
      shippingMethod: '',
      expectedDelivery: '',
      customerNotes: '',
      internalNotes: '',
      items: [],
    });
    setCurrentStep(1);
    setShowCreateModal(true);
  };

  const handleNextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSaveOrder = () => {
    if (!storeData) return;

    const newOrder: ManualOrder = {
      id: Date.now().toString(),
      orderNumber: orderForm.orderNumber,
      customerName: orderForm.customerName,
      customerEmail: orderForm.customerEmail,
      customerPhone: orderForm.customerPhone,
      status: 'new',
      paymentMethod: orderForm.paymentMethod,
      paymentStatus: orderForm.transactionStatus as any,
      shippingMethod: orderForm.shippingMethod,
      shippingAddress: `${orderForm.shippingAddress}, ${orderForm.customerArea}, ${orderForm.customerCity}`,
      items: orderForm.items,
      subtotal: orderForm.items.reduce((sum, item) => sum + item.total, 0),
      shipping: 0,
      tax: 0,
      total: orderForm.items.reduce((sum, item) => sum + item.total, 0),
      notes: orderForm.customerNotes,
      internalNotes: orderForm.internalNotes,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const updatedOrders = [...orders, newOrder];
    setStoreData({
      ...storeData,
      manualOrders: updatedOrders,
    });

    setShowCreateModal(false);
    onSave();
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      new: { variant: 'default' as const, label: 'جديد', color: 'bg-blue-100 text-blue-800' },
      paid: { variant: 'default' as const, label: 'مدفوع', color: 'bg-green-100 text-green-800' },
      processing: { variant: 'secondary' as const, label: 'قيد المعالجة', color: 'bg-yellow-100 text-yellow-800' },
      shipped: { variant: 'secondary' as const, label: 'مشحون', color: 'bg-purple-100 text-purple-800' },
      delivered: { variant: 'default' as const, label: 'تم التوصيل', color: 'bg-green-100 text-green-800' },
      cancelled: { variant: 'destructive' as const, label: 'ملغي', color: 'bg-red-100 text-red-800' },
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.new;

    return (
      <Badge className={config.color}>
        {config.label}
      </Badge>
    );
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">إنشاء طلب جديد</h3>
        <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
          <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center">1</div>
          <span>معلومات الطلب الأساسية</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="orderNumber">رقم الطلب</Label>
          <Input
            id="orderNumber"
            value={orderForm.orderNumber}
            onChange={(e) => setOrderForm({ ...orderForm, orderNumber: e.target.value })}
          />
        </div>
        <div>
          <Label htmlFor="customerName">اسم العميل الكامل *</Label>
          <Input
            id="customerName"
            value={orderForm.customerName}
            onChange={(e) => setOrderForm({ ...orderForm, customerName: e.target.value })}
            placeholder="أدخل اسم العميل الكامل"
          />
        </div>
        <div>
          <Label htmlFor="customerEmail">البريد الإلكتروني</Label>
          <Input
            id="customerEmail"
            type="email"
            value={orderForm.customerEmail}
            onChange={(e) => setOrderForm({ ...orderForm, customerEmail: e.target.value })}
            placeholder="customer@example.com"
          />
        </div>
        <div>
          <Label htmlFor="customerPhone">رقم الهاتف</Label>
          <Input
            id="customerPhone"
            value={orderForm.customerPhone}
            onChange={(e) => setOrderForm({ ...orderForm, customerPhone: e.target.value })}
            placeholder="+218912345678"
          />
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">إضافة المنتجات</h3>
        <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
          <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center">2</div>
          <span>اختيار المنتجات من متجرك</span>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex gap-2">
          <Select>
            <SelectTrigger className="flex-1">
              <SelectValue placeholder="اختر منتج لإضافته" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="product1">عطر Hugo Intense 100ml</SelectItem>
              <SelectItem value="product2">فستان سهرة أنيق</SelectItem>
              <SelectItem value="product3">حقيبة يد جلدية</SelectItem>
            </SelectContent>
          </Select>
          <Button>إضافة</Button>
        </div>

        <div className="border rounded-lg p-4">
          <h4 className="font-semibold mb-3">المنتجات المضافة</h4>
          {orderForm.items.length === 0 ? (
            <p className="text-gray-500 text-center py-4">لم يتم إضافة أي منتجات بعد</p>
          ) : (
            <div className="space-y-2">
              {orderForm.items.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <div>
                    <p className="font-medium">{item.productName}</p>
                    <p className="text-sm text-gray-600">SKU: {item.sku}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">{item.total} د.ل</span>
                    <Button variant="outline" size="sm">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">معلومات العميل</h3>
        <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
          <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center">3</div>
          <span>بيانات التوصيل والتواصل</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="customerCity">المدينة</Label>
          <Select value={orderForm.customerCity} onValueChange={(value) => setOrderForm({ ...orderForm, customerCity: value })}>
            <SelectTrigger>
              <SelectValue placeholder="اختر المدينة" />
            </SelectTrigger>
            <SelectContent>
              {libyanCities.map((city) => (
                <SelectItem key={city.id} value={city.name}>
                  {city.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="customerArea">المنطقة</Label>
          <Input
            id="customerArea"
            value={orderForm.customerArea}
            onChange={(e) => setOrderForm({ ...orderForm, customerArea: e.target.value })}
            placeholder="مثال: الفرناج"
          />
        </div>
        <div className="md:col-span-2">
          <Label htmlFor="shippingAddress">عنوان التوصيل</Label>
          <Textarea
            id="shippingAddress"
            value={orderForm.shippingAddress}
            onChange={(e) => setOrderForm({ ...orderForm, shippingAddress: e.target.value })}
            placeholder="أدخل عنوان التوصيل التفصيلي"
            rows={3}
          />
        </div>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">طريقة الدفع والشحن</h3>
        <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
          <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center">4</div>
          <span>إتمام الطلب وملاحظات</span>
        </div>
      </div>

      <Tabs defaultValue="payment" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="payment">طريقة الدفع</TabsTrigger>
          <TabsTrigger value="shipping">الشحن</TabsTrigger>
          <TabsTrigger value="summary">ملخص الطلب</TabsTrigger>
        </TabsList>

        <TabsContent value="payment" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label>طريقة الدفع</Label>
              <Select value={orderForm.paymentMethod} onValueChange={(value) => setOrderForm({ ...orderForm, paymentMethod: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="اختر طريقة الدفع" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bank_transfer">تحويل مصرفي</SelectItem>
                  <SelectItem value="cash_on_delivery">عند الاستلام</SelectItem>
                  <SelectItem value="installments">أقساط</SelectItem>
                  <SelectItem value="wallet">محفظة</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {orderForm.paymentMethod === 'bank_transfer' && (
              <>
                <div>
                  <Label>المصرف</Label>
                  <Select value={orderForm.bankName} onValueChange={(value) => setOrderForm({ ...orderForm, bankName: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="اختر المصرف" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bank_of_republic">مصرف الجمهورية</SelectItem>
                      <SelectItem value="united_bank">مصرف المتحد</SelectItem>
                      <SelectItem value="islamic_bank">مصرف الليبي الإسلامي</SelectItem>
                      <SelectItem value="foreign_bank">مصرف الخارجي</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>اسم صاحب الحساب</Label>
                  <Input
                    value={orderForm.accountHolder}
                    onChange={(e) => setOrderForm({ ...orderForm, accountHolder: e.target.value })}
                    placeholder="أحمد محمد"
                  />
                </div>
                <div>
                  <Label>حالة العملية</Label>
                  <Select value={orderForm.transactionStatus} onValueChange={(value) => setOrderForm({ ...orderForm, transactionStatus: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">قيد المعالجة</SelectItem>
                      <SelectItem value="completed">نفذت مباشرة</SelectItem>
                      <SelectItem value="waiting">تحت الانتظار</SelectItem>
                      <SelectItem value="paid">مكتملة</SelectItem>
                      <SelectItem value="cancelled">ملغية</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}
          </div>
        </TabsContent>

        <TabsContent value="shipping" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label>طريقة الشحن</Label>
              <Select value={orderForm.shippingMethod} onValueChange={(value) => setOrderForm({ ...orderForm, shippingMethod: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="اختر طريقة الشحن" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="no_shipping">لا يتطلب شحن</SelectItem>
                  <SelectItem value="standard">شحن توصيل عادي</SelectItem>
                  <SelectItem value="express">شحن وتوصيل سريع</SelectItem>
                  <SelectItem value="pickup">الاستلام من الموقع</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>الوقت المتوقع للاستلام</Label>
              <Input
                type="datetime-local"
                value={orderForm.expectedDelivery}
                onChange={(e) => setOrderForm({ ...orderForm, expectedDelivery: e.target.value })}
              />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="summary" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>ملخص الطلب</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>قيمة المنتجات</span>
                  <span>{orderForm.items.reduce((sum, item) => sum + item.total, 0)} د.ل</span>
                </div>
                <div className="flex justify-between">
                  <span>رسوم الشحن</span>
                  <span>0.00 د.ل</span>
                </div>
                <div className="flex justify-between">
                  <span>الضرائب</span>
                  <span>0.00 د.ل</span>
                </div>
                <div className="flex justify-between font-bold text-lg border-t pt-2">
                  <span>المجموع الكلي</span>
                  <span>{orderForm.items.reduce((sum, item) => sum + item.total, 0)} د.ل</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label>ملاحظات العميل</Label>
              <Textarea
                value={orderForm.customerNotes}
                onChange={(e) => setOrderForm({ ...orderForm, customerNotes: e.target.value })}
                placeholder="ملاحظات العميل"
                rows={3}
              />
            </div>
            <div>
              <Label>ملاحظات داخلية</Label>
              <Textarea
                value={orderForm.internalNotes}
                onChange={(e) => setOrderForm({ ...orderForm, internalNotes: e.target.value })}
                placeholder="ملاحظات داخلية"
                rows={3}
              />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">الطلبات اليدوية</h2>
          <p className="text-gray-600 mt-1">إدارة وإنشاء الطلبات يدوياً مع العملاء</p>
        </div>
        <Button
          onClick={handleCreateOrder}
          className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
        >
          <Plus className="h-4 w-4 ml-2" />
          إنشاء طلب جديد
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">إجمالي الطلبات</p>
                <p className="text-3xl font-bold text-gray-900">{orders.length}</p>
                <p className="text-sm text-green-600">+12% من الشهر الماضي</p>
              </div>
              <ShoppingBag className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">الطلبات المكتملة</p>
                <p className="text-3xl font-bold text-gray-900">{orders.filter(o => o.status === 'delivered').length}</p>
                <p className="text-sm text-gray-600">معدل الإنجاز: 80%</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">قيد المعالجة</p>
                <p className="text-3xl font-bold text-gray-900">{orders.filter(o => o.status === 'processing').length}</p>
                <p className="text-sm text-gray-600">يحتاج للمتابعة</p>
              </div>
              <AlertCircle className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">إجمالي الإيرادات</p>
                <p className="text-3xl font-bold text-gray-900">{orders.reduce((sum, o) => sum + o.total, 0).toFixed(2)} د.ل</p>
                <p className="text-sm text-gray-600">متوسط الطلب: {orders.length > 0 ? (orders.reduce((sum, o) => sum + o.total, 0) / orders.length).toFixed(2) : '0.00'} د.ل</p>
              </div>
              <DollarSign className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Orders Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>الطلبات الحديثة</CardTitle>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="البحث في الطلبات..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 ml-2" />
                تصفية
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 ml-2" />
                تصدير
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-right p-3 font-semibold">رقم الطلب</th>
                  <th className="text-right p-3 font-semibold">العميل</th>
                  <th className="text-right p-3 font-semibold">الحالة</th>
                  <th className="text-right p-3 font-semibold">المبلغ</th>
                  <th className="text-right p-3 font-semibold">طريقة الدفع</th>
                  <th className="text-right p-3 font-semibold">التاريخ</th>
                  <th className="text-right p-3 font-semibold">الإجراءات</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order: ManualOrder) => (
                  <tr key={order.id} className="border-b hover:bg-gray-50">
                    <td className="p-3">
                      <div>
                        <p className="font-semibold">{order.orderNumber}</p>
                        <p className="text-sm text-gray-600">{order.items.length} عنصر</p>
                      </div>
                    </td>
                    <td className="p-3">
                      <div>
                        <p className="font-semibold">{order.customerName}</p>
                        <p className="text-sm text-gray-600">{order.customerPhone}</p>
                      </div>
                    </td>
                    <td className="p-3">
                      {getStatusBadge(order.status)}
                    </td>
                    <td className="p-3">
                      <p className="font-semibold">{order.total} د.ل</p>
                    </td>
                    <td className="p-3">
                      <Badge variant="outline">{order.paymentMethod}</Badge>
                    </td>
                    <td className="p-3">
                      <p className="text-sm">{new Date(order.createdAt).toLocaleDateString('ar')}</p>
                      <p className="text-xs text-gray-600">{new Date(order.createdAt).toLocaleTimeString('ar')}</p>
                    </td>
                    <td className="p-3">
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredOrders.length === 0 && (
            <div className="text-center py-8">
              <ShoppingBag className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">لا توجد طلبات يدوية بعد</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Create Order Modal */}
      <AnimatePresence>
        {showCreateModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={() => setShowCreateModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-6 w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">إنشاء طلب جديد</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowCreateModal(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              {/* Step Indicators */}
              <div className="flex items-center justify-center gap-4 mb-8">
                {[1, 2, 3, 4].map((step) => (
                  <div key={step} className="flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                      step === currentStep ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'
                    }`}>
                      {step}
                    </div>
                    {step < 4 && <div className="w-12 h-1 bg-gray-200"></div>}
                  </div>
                ))}
              </div>

              {/* Step Content */}
              <div className="min-h-[400px]">
                {currentStep === 1 && renderStep1()}
                {currentStep === 2 && renderStep2()}
                {currentStep === 3 && renderStep3()}
                {currentStep === 4 && renderStep4()}
              </div>

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8">
                <Button
                  variant="outline"
                  onClick={handlePrevStep}
                  disabled={currentStep === 1}
                >
                  <ChevronRight className="h-4 w-4 ml-2" />
                  السابق
                </Button>

                <div className="flex gap-3">
                  <Button variant="outline" onClick={() => setShowCreateModal(false)}>
                    إلغاء
                  </Button>
                  {currentStep < 4 ? (
                    <Button
                      onClick={handleNextStep}
                      className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                    >
                      التالي
                      <ChevronLeft className="h-4 w-4 mr-2" />
                    </Button>
                  ) : (
                    <Button
                      onClick={handleSaveOrder}
                      className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
                    >
                      <Save className="h-4 w-4 ml-2" />
                      حفظ الطلب
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export { ManualOrdersView };