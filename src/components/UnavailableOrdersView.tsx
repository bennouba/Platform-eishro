import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Package,
  Search,
  Filter,
  Download,
  Edit,
  Trash2,
  Eye,
  RefreshCw,
  Save,
  X,
  AlertCircle,
  CheckCircle,
  Clock,
  User,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Image,
  ShoppingBag,
  Bell,
  TrendingUp,
  Archive,
  ArchiveRestore,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { Textarea } from './ui/textarea';

interface UnavailableOrder {
  id: string;
  productCode: string;
  productName: string;
  productImage: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  requestedQuantity: number;
  requestedAt: string;
  requestedTime: string;
  status: 'pending' | 'available' | 'cancelled' | 'substitute_offered';
  merchantStatus: 'pending' | 'available' | 'cancelled' | 'substitute_offered';
  notes?: string;
  responseDate?: string;
  substituteProduct?: string;
}

interface UnavailableOrdersViewProps {
  storeData: any;
  setStoreData: (data: any) => void;
  onSave: () => void;
}

const UnavailableOrdersView: React.FC<UnavailableOrdersViewProps> = ({ storeData, setStoreData, onSave }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<UnavailableOrder | null>(null);
  const [newStatus, setNewStatus] = useState('');
  const [statusNotes, setStatusNotes] = useState('');

  // Sample data - in real app this would come from API
  const unavailableOrders: UnavailableOrder[] = [
    {
      id: '1',
      productCode: 'ESHRO-5556T-1005',
      productName: 'فستان ماكسي أحمر, Mango',
      productImage: '',
      customerName: 'أحمد محمد الليبي',
      customerEmail: 'ahmed.libya@email.com',
      customerPhone: '+218912345678',
      requestedQuantity: 2,
      requestedAt: '2024-09-20',
      requestedTime: '12:30:27 مساءً',
      status: 'pending',
      merchantStatus: 'pending',
    },
    {
      id: '2',
      productCode: 'ESHRO-7721B-2003',
      productName: 'حذاء رياضي أسود, Nike',
      productImage: '',
      customerName: 'فاطمة سالم بن علي',
      customerEmail: 'fatima.salem@email.com',
      customerPhone: '+218923456789',
      requestedQuantity: 1,
      requestedAt: '2024-09-19',
      requestedTime: '15:45:12 مساءً',
      status: 'pending',
      merchantStatus: 'pending',
    },
  ];

  const filteredOrders = unavailableOrders.filter(order => {
    const matchesSearch =
      order.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.productCode.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleStatusUpdate = (order: UnavailableOrder) => {
    setSelectedOrder(order);
    setNewStatus(order.status);
    setStatusNotes('');
    setShowStatusModal(true);
  };

  const handleSaveStatus = () => {
    if (!selectedOrder || !storeData) return;

    const updatedOrders = unavailableOrders.map(order => {
      if (order.id === selectedOrder.id) {
        return {
          ...order,
          status: newStatus as any,
          merchantStatus: newStatus as any,
          responseDate: new Date().toISOString(),
          notes: statusNotes,
        };
      }
      return order;
    });

    // In real app, this would update the backend
    console.log('Updating order status:', {
      orderId: selectedOrder.id,
      newStatus,
      notes: statusNotes,
    });

    setShowStatusModal(false);
    setSelectedOrder(null);
    onSave();
  };

  const handleDeleteOrder = (orderId: string) => {
    // In real app, this would delete from backend
    console.log('Deleting order:', orderId);
    onSave();
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { label: 'قيد الانتظار', color: 'bg-yellow-100 text-yellow-800' },
      available: { label: 'المنتج متوفر', color: 'bg-green-100 text-green-800' },
      cancelled: { label: 'ملغي', color: 'bg-red-100 text-red-800' },
      substitute_offered: { label: 'توفير بديل', color: 'bg-blue-100 text-blue-800' },
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
    return <Badge className={config.color}>{config.label}</Badge>;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'available':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'cancelled':
        return <X className="h-4 w-4 text-red-600" />;
      case 'substitute_offered':
        return <RefreshCw className="h-4 w-4 text-blue-600" />;
      default:
        return <Clock className="h-4 w-4 text-yellow-600" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">الطلبات الغير متوفرة</h2>
          <p className="text-gray-600 mt-1">إدارة طلبات المنتجات الغير متوفرة في متجرك</p>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="البحث في الطلبات..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="تصفية حسب الحالة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع الطلبات</SelectItem>
                <SelectItem value="pending">قيد الانتظار</SelectItem>
                <SelectItem value="available">متوفر</SelectItem>
                <SelectItem value="cancelled">ملغي</SelectItem>
                <SelectItem value="substitute_offered">بديل متوفر</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 ml-2" />
              فرز
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 ml-2" />
              تصدير
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Orders Table */}
      <Card>
        <CardHeader>
          <CardTitle>الطلبات الغير متوفرة بالمتجر</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-right p-3 font-semibold">كود المنتج</th>
                  <th className="text-right p-3 font-semibold">اسم المنتج</th>
                  <th className="text-right p-3 font-semibold">الكمية</th>
                  <th className="text-right p-3 font-semibold">تاريخ تقديم الطلب</th>
                  <th className="text-right p-3 font-semibold">وقت تقديم الطلب</th>
                  <th className="text-right p-3 font-semibold">حالة الطلب</th>
                  <th className="text-right p-3 font-semibold">الإجراءات</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="border-b hover:bg-gray-50">
                    <td className="p-3">
                      <div className="font-semibold text-blue-600">{order.productCode}</div>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                          <Image className="h-6 w-6 text-gray-400" />
                        </div>
                        <div>
                          <p className="font-semibold">{order.productName}</p>
                          <p className="text-sm text-gray-600">طلب من العميل</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="text-center">
                        <p className="font-semibold">{order.requestedQuantity}</p>
                        <p className="text-sm text-gray-600">الكمية المطلوبة</p>
                      </div>
                    </td>
                    <td className="p-3">
                      <p className="font-semibold">{order.requestedAt}</p>
                    </td>
                    <td className="p-3">
                      <p className="font-semibold">{order.requestedTime}</p>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(order.status)}
                        {getStatusBadge(order.status)}
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleStatusUpdate(order)}
                        >
                          <RefreshCw className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteOrder(order.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
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
              <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">لا توجد طلبات غير متوفرة</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Status Update Modal */}
      <AnimatePresence>
        {showStatusModal && selectedOrder && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={() => setShowStatusModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-6 w-full max-w-md mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">تحديث حالة الطلب</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowStatusModal(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold mb-2">تفاصيل الطلب</h4>
                  <p className="text-sm text-gray-600">{selectedOrder.productName}</p>
                  <p className="text-sm text-gray-600">العميل: {selectedOrder.customerName}</p>
                  <p className="text-sm text-gray-600">الكمية: {selectedOrder.requestedQuantity}</p>
                </div>

                <div>
                  <Label>حالة الطلب الجديدة</Label>
                  <Select value={newStatus} onValueChange={setNewStatus}>
                    <SelectTrigger>
                      <SelectValue placeholder="اختر الحالة الجديدة" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">قيد الانتظار</SelectItem>
                      <SelectItem value="available">المنتج متوفر</SelectItem>
                      <SelectItem value="cancelled">ملغي</SelectItem>
                      <SelectItem value="substitute_offered">توفير بديل</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>ملاحظات (اختياري)</Label>
                  <Textarea
                    value={statusNotes}
                    onChange={(e) => setStatusNotes(e.target.value)}
                    placeholder="أضف ملاحظات حول حالة الطلب..."
                    rows={3}
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <Button
                  onClick={handleSaveStatus}
                  className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                >
                  <Save className="h-4 w-4 ml-2" />
                  حفظ التغييرات
                </Button>
                <Button variant="outline" onClick={() => setShowStatusModal(false)}>
                  إلغاء
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Important Notes */}
      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-900">
            <AlertCircle className="h-5 w-5" />
            آلية عمل الطلبات الغير متوفرة
          </CardTitle>
        </CardHeader>
        <CardContent className="text-blue-800">
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-semibold">1</div>
              <div>
                <p className="font-semibold">قيد الانتظار</p>
                <p className="text-sm">المنتج غير متوفر حالياً في المخزن</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-semibold">2</div>
              <div>
                <p className="font-semibold">المنتج متوفر</p>
                <p className="text-sm">تم توفير المنتج وإشعار العميل</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-semibold">3</div>
              <div>
                <p className="font-semibold">ملغي</p>
                <p className="text-sm">تم إلغاء طلب التوفير</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-semibold">4</div>
              <div>
                <p className="font-semibold">توفير بديل</p>
                <p className="text-sm">اقتراح منتج بديل للعميل</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export { UnavailableOrdersView };