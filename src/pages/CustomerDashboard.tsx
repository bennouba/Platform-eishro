import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// أنماط احترافية مذهلة للوحة التحكم
const professionalStyles = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes slideIn {
    from { opacity: 0; transform: translateX(-30px); }
    to { opacity: 1; transform: translateX(0); }
  }

  @keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
  }

  @keyframes rotate {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  @keyframes shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }

  @keyframes bounce {
    0%, 20%, 53%, 80%, 100% { transform: translate3d(0,0,0); }
    40%, 43% { transform: translate3d(0, -30px, 0); }
    70% { transform: translate3d(0, -15px, 0); }
    90% { transform: translate3d(0, -4px, 0); }
  }

  .animate-fade-in { animation: fadeIn 0.6s ease-out; }
  .animate-slide-in { animation: slideIn 0.8s ease-out; }
  .animate-pulse-slow { animation: pulse 3s ease-in-out infinite; }
  .animate-rotate { animation: rotate 2s linear infinite; }
  .animate-shimmer { background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent); background-size: 200% 100%; animation: shimmer 2s infinite; }
  .animate-bounce-custom { animation: bounce 2s ease-in-out infinite; }

  .glass-effect { background: rgba(255, 255, 255, 0.25); backdrop-filter: blur(10px); border: 1px solid rgba(255, 255, 255, 0.18); }
  .neon-glow { box-shadow: 0 0 20px rgba(59, 130, 246, 0.5), 0 0 40px rgba(59, 130, 246, 0.3), 0 0 60px rgba(59, 130, 246, 0.1); }
  .gradient-border { position: relative; background: linear-gradient(45deg, #3B82F6, #8B5CF6, #EC4899); padding: 2px; border-radius: 8px; }
  .gradient-border::before { content: ''; position: absolute; inset: 0; background: white; border-radius: 6px; z-index: -1; }
`;
import {
  ArrowLeft,
  User,
  Package,
  CreditCard,
  Gift,
  Download,
  Settings,
  MessageCircle,
  Bell,
  TrendingUp,
  ShoppingBag,
  Star,
  Clock,
  CheckCircle,
  AlertCircle,
  Phone,
  Mail,
  MapPin,
  Calendar,
  DollarSign,
  Activity,
  Users,
  Award,
  Target
} from 'lucide-react';

interface CustomerDashboardProps {
  customerData?: any;
  favorites?: any[];
  onBack: () => void;
  onLogout: () => void;
}

const CustomerDashboard: React.FC<CustomerDashboardProps> = ({
  customerData,
  favorites = [],
  onBack,
  onLogout
}) => {
  console.log('🎯 CustomerDashboard Context Analysis:');
  console.log('customerData:', customerData);
  console.log('customerData.context:', customerData?.context);
  console.log('customerData.isFromLogin:', customerData?.isFromLogin);
  console.log('customerData.timestamp:', customerData?.timestamp);

  // إضافة مؤشر مرئي لتحديد السياق
  const contextIndicator = customerData?.context || 'unknown';
  const isFromLogin = customerData?.isFromLogin || false;

  const [activeSection, setActiveSection] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);

  // بيانات تجريبية للمستخدم
  const customerInfo = customerData || {
    name: 'نزار بن نوبة',
    email: 'customer@eshro.ly',
    phone: '0021894062927',
    joinDate: '2024-01-15',
    membershipType: 'عميل مميز',
    avatar: '/api/placeholder/150/150'
  };

  // بيانات ديناميكية محسنة للطلبات مع منتجات حقيقية وصور
  const [orders, setOrders] = useState([
    {
      id: 'ORD-001',
      date: '2024-01-10',
      status: 'مكتملة',
      total: 2899.00,
      items: 3,
      store: 'نواعم',
      storeId: 1,
      products: [
        {
          id: 1001,
          name: 'عباية أنيقة',
          image: '/assets/stores/1.webp',
          price: 1200,
          quantity: 1,
          size: 'L',
          color: 'أسود'
        },
        {
          id: 1002,
          name: 'حجاب ناعم',
          image: '/assets/stores/1.webp',
          price: 899,
          quantity: 2,
          size: 'واحد',
          color: 'بني'
        },
        {
          id: 1003,
          name: 'إكسسوار ذهبي',
          image: '/assets/stores/1.webp',
          price: 800,
          quantity: 1,
          size: 'واحد',
          color: 'ذهبي'
        }
      ],
      trackingNumber: 'TN2024001',
      estimatedDelivery: '2024-01-12',
      orderTime: '2024-01-10T14:30:00Z'
    },
    {
      id: 'ORD-002',
      date: '2024-01-08',
      status: 'قيد المراجعة',
      total: 650.00,
      items: 1,
      store: 'شيرين',
      storeId: 2,
      products: [
        {
          id: 2011,
          name: 'خاتم فضة عيار 925',
          image: '/assets/stores/1.webp',
          price: 650,
          quantity: 1,
          size: '7',
          color: 'فضي'
        }
      ],
      trackingNumber: 'TN2024002',
      estimatedDelivery: '2024-01-11',
      orderTime: '2024-01-08T09:15:00Z'
    },
    {
      id: 'ORD-003',
      date: '2024-01-05',
      status: 'جديدة',
      total: 1890.00,
      items: 2,
      store: 'دلتا ستور',
      storeId: 3,
      products: [
        {
          id: 3001,
          name: 'ساعة ذكية',
          image: '/assets/stores/3.webp',
          price: 1299,
          quantity: 1,
          size: '42mm',
          color: 'أسود'
        },
        {
          id: 3002,
          name: 'كابل شحن',
          image: '/assets/stores/3.webp',
          price: 591,
          quantity: 1,
          size: 'واحد',
          color: 'أبيض'
        }
      ],
      trackingNumber: 'TN2024003',
      estimatedDelivery: '2024-01-10',
      orderTime: '2024-01-05T16:45:00Z'
    }
  ]);

  // بيانات تجريبية للإشعارات
  const notifications = [
    {
      id: 1,
      type: 'order',
      title: 'طلب جديد في انتظار المراجعة',
      message: 'تم استلام طلبك رقم ORD-003 وهو الآن قيد المراجعة',
      time: 'منذ ساعتين',
      read: false,
      urgent: false
    },
    {
      id: 2,
      type: 'delivery',
      title: 'تحديث حالة الشحن',
      message: 'طلبك رقم ORD-001 في طريقه للتسليم اليوم',
      time: 'منذ 4 ساعات',
      read: false,
      urgent: true
    },
    {
      id: 3,
      type: 'promotion',
      title: 'عرض خاص لك',
      message: 'خصم 20% على جميع منتجات نواعم لهذا الأسبوع',
      time: 'أمس',
      read: true,
      urgent: false
    },
    {
      id: 4,
      type: 'system',
      title: 'تحديث النظام',
      message: 'تم تحديث سياسة الخصوصية، يرجى مراجعتها',
      time: 'منذ يومين',
      read: true,
      urgent: false
    }
  ];

  // إحصائيات شاملة وديناميكية
  const [stats, setStats] = useState({
    totalOrders: orders.length,
    pendingOrders: orders.filter(order => order.status === 'قيد المراجعة').length,
    completedOrders: orders.filter(order => order.status === 'مكتملة').length,
    totalSpent: orders.filter(order => order.status === 'مكتملة').reduce((sum, order) => sum + order.total, 0),
    totalProducts: orders.reduce((sum, order) => sum + order.items, 0),
    favoriteProducts: Math.floor(Math.random() * 20) + 5, // عشوائي للعرض
    totalReviews: Math.floor(Math.random() * 10) + 1,
    activityRate: Math.floor(Math.random() * 20) + 80,
    satisfactionRate: Math.floor(Math.random() * 10) + 90,
    notificationsCount: Math.floor(Math.random() * 5) + 1,
    wishlistItems: Math.floor(Math.random() * 15) + 3,
    avgOrderValue: orders.length > 0 ? orders.filter(order => order.status === 'مكتملة').reduce((sum, order) => sum + order.total, 0) / orders.filter(order => order.status === 'مكتملة').length : 0,
    monthlySpending: orders.filter(order => new Date(order.date) >= new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)).reduce((sum, order) => sum + order.total, 0)
  });

  // تحديث الإحصائيات كل 30 ثانية للمحاكاة الديناميكية
  React.useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        ...prev,
        activityRate: Math.max(70, Math.min(100, prev.activityRate + Math.floor(Math.random() * 10) - 5)),
        notificationsCount: Math.max(0, prev.notificationsCount + Math.floor(Math.random() * 3) - 1)
      }));
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  // التنقل الجانبي المحسن
  const sidebarItems = [
    { id: 'dashboard', label: 'لوحة المعلومات', icon: <Activity className="h-5 w-5" />, badge: null },
    { id: 'orders', label: 'الطلبات', icon: <Package className="h-5 w-5" />, badge: stats.totalOrders },
    { id: 'favorites', label: 'المفضلة', icon: <Star className="h-5 w-5" />, badge: stats.favoriteProducts },
    { id: 'notifications', label: 'الإشعارات', icon: <Bell className="h-5 w-5" />, badge: stats.notificationsCount },
    { id: 'subscriptions', label: 'الاشتراكات', icon: <CreditCard className="h-5 w-5" />, badge: null },
    { id: 'referrals', label: 'الإحالات', icon: <Users className="h-5 w-5" />, badge: null },
    { id: 'downloads', label: 'التحميلات', icon: <Download className="h-5 w-5" />, badge: null },
    { id: 'profile', label: 'الملف الشخصي', icon: <User className="h-5 w-5" />, badge: null },
    { id: 'support', label: 'المساعدة والدعم الفني', icon: <Phone className="h-5 w-5" />, badge: null },
  ];

  // القائمة المختصرة العلوية
  const topSidebarItems = [
    {
      id: 'status',
      label: 'الحالة العامة',
      icon: <Activity className="h-4 w-4" />,
      value: 'نشط',
      color: 'text-green-600'
    },
    {
      id: 'new-orders',
      label: 'طلبات جديدة',
      icon: <Package className="h-4 w-4" />,
      value: stats.pendingOrders,
      color: 'text-blue-600'
    },
    {
      id: 'under-review',
      label: 'قيد المراجعة',
      icon: <Clock className="h-4 w-4" />,
      value: '2',
      color: 'text-orange-600'
    },
    {
      id: 'completed',
      label: 'مكتملة',
      icon: <CheckCircle className="h-4 w-4" />,
      value: stats.completedOrders,
      color: 'text-green-600'
    }
  ];

  // القائمة المختصرة الجانبية اليمنى
  const rightSidebarItems = [
    {
      id: 'notifications',
      icon: <Bell className="h-5 w-5" />,
      badge: stats.notificationsCount > 0 ? stats.notificationsCount : undefined,
      onClick: () => setNotificationsOpen(!notificationsOpen)
    },
    {
      id: 'favorites',
      icon: <Star className="h-5 w-5" />,
      badge: stats.favoriteProducts,
      onClick: () => setActiveSection('favorites')
    },
    {
      id: 'settings',
      icon: <Settings className="h-5 w-5" />,
      onClick: () => setActiveSection('profile')
    },
    {
      id: 'chat',
      icon: <MessageCircle className="h-5 w-5" />,
      onClick: () => setChatOpen(!chatOpen)
    }
  ];

  const renderMainContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <DashboardContent stats={stats} orders={orders} customerInfo={customerInfo} />;
      case 'orders':
        return <OrdersContent orders={orders} />;
      case 'favorites':
        return <FavoritesContent stats={stats} favorites={favorites} />;
      case 'notifications':
        return <NotificationsContent notifications={notifications} stats={stats} />;
      case 'subscriptions':
        return <div data-section="subscriptions"><SubscriptionsContent /></div>;
      case 'referrals':
        return <ReferralsContent />;
      case 'downloads':
        return <DownloadsContent />;
      case 'profile':
        return <div data-section="profile"><ProfileContent customerInfo={customerInfo} /></div>;
      case 'support':
        return <SupportContent />;
      default:
        return <DashboardContent stats={stats} orders={orders} customerInfo={customerInfo} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 flex relative overflow-hidden">
      <style>{professionalStyles}</style>
      {/* خلفية متحركة أنيقة */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-1/4 right-20 w-24 h-24 bg-gradient-to-r from-green-400/20 to-blue-400/20 rounded-full blur-lg animate-bounce" style={{animationDuration: '3s'}}></div>
        <div className="absolute bottom-1/4 left-1/4 w-40 h-40 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-10 right-10 w-28 h-28 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 rounded-full blur-lg animate-bounce" style={{animationDuration: '4s'}}></div>
      </div>
      {/* الشريط الجانبي الرئيسي */}
      <div className={`${sidebarCollapsed ? 'w-16' : 'w-64'} bg-white shadow-lg transition-all duration-300 relative z-10`}>
        {/* الهيدر مع الشعار المكبر */}
        <div className="p-4 border-b bg-gradient-to-r from-primary/5 to-primary/10">
          <div className="flex items-center justify-start ml-4">
            <div className="relative group cursor-pointer">
              <img
                src="/eshro-new-logo.png"
                alt="شعار إشرو"
                className="w-24 h-24 object-contain transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 drop-shadow-lg"
                onClick={() => window.location.href = '/'}
                style={{filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))'}}
              />
              <div className="absolute inset-0 bg-primary/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          </div>
        </div>

        {/* معلومات المستخدم المحسنة */}
        <div className="p-4 border-b bg-gradient-to-r from-green-50 to-blue-50">
          <div className="flex items-center gap-3">
            <div className="relative">
              {(() => {
                const savedImage = localStorage.getItem('userProfileImage');
                return savedImage ? (
                  <img
                    src={savedImage}
                    alt="صورة المستخدم"
                    className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-lg"
                  />
                ) : (
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center shadow-lg border-2 border-white">
                    <span className="text-white font-bold text-lg animate-pulse">
                      {customerInfo.name.charAt(0)}
                    </span>
                  </div>
                );
              })()}
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
            </div>
            {!sidebarCollapsed && (
              <div className="flex-1 animate-fade-in">
                <p className="font-bold text-lg text-gray-800 hover:text-primary transition-colors cursor-pointer">
                  {customerInfo.name}
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">
                    عضو نشط
                  </span>
                  <span className="text-xs text-gray-500">★ ★ ★ ★ ★</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* قائمة التنقل المحسنة مع العدادات */}
        <nav className="p-4">
          <div className="space-y-2">
            {sidebarItems.map((item) => (
              <Button
                key={item.id}
                variant={activeSection === item.id ? "default" : "ghost"}
                className={`w-full justify-between relative ${
                  sidebarCollapsed ? 'px-2' : ''
                }`}
                onClick={() => setActiveSection(item.id)}
              >
                <div className="flex items-center gap-3">
                  {item.icon}
                  {!sidebarCollapsed && <span>{item.label}</span>}
                </div>
                {!sidebarCollapsed && item.badge !== null && item.badge > 0 && (
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    activeSection === item.id
                      ? 'bg-white/20 text-white'
                      : 'bg-primary/10 text-primary'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </Button>
            ))}
          </div>
        </nav>

        {/* زر العودة للمنصة */}
        <div className="p-4 mt-auto">
          <Button
            variant="outline"
            className="w-full"
            onClick={onBack}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            {!sidebarCollapsed && 'العودة للمنصة'}
          </Button>
        </div>
      </div>

      {/* المحتوى الرئيسي */}
      <div className="flex-1 flex flex-col">
        {/* الهيدر العلوي */}
        <header className="bg-white shadow-sm border-b p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-xl font-bold text-gray-800">
                {sidebarItems.find(item => item.id === activeSection)?.label}
              </h1>
            </div>

            <div className="flex items-center gap-3">
              {/* القائمة المختصرة العلوية */}
              <div className="hidden md:flex items-center gap-4">
                {topSidebarItems.map((item) => (
                  <div key={item.id} className="text-center">
                    <div className={`p-2 rounded-lg ${item.color}`}>
                      {item.icon}
                    </div>
                    <p className="text-xs text-gray-600 mt-1">{item.label}</p>
                    <p className={`text-sm font-bold ${item.color}`}>{item.value}</p>
                  </div>
                ))}
              </div>

              {/* القائمة الجانبية اليمنى المحسنة */}
              <div className="flex items-center gap-2">
                {rightSidebarItems.map((item) => (
                  <Button
                    key={item.id}
                    variant="ghost"
                    size="sm"
                    onClick={item.onClick}
                    className="relative"
                  >
                    {item.icon}
                    {item.badge !== undefined && item.badge > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 text-xs flex items-center justify-center">
                        {item.badge}
                      </span>
                    )}
                  </Button>
                ))}
                <Button variant="outline" size="sm" onClick={onLogout}>
                  تسجيل الخروج
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* المحتوى */}
        <main className="flex-1 p-6">
          {renderMainContent()}
        </main>
      </div>

      {/* لوحة الإشعارات المحسنة */}
      {notificationsOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md max-h-[80vh] overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-green-50 border-b">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <div className="relative">
                    <Bell className="h-5 w-5 text-primary" />
                    {notifications.filter(n => !n.read).length > 0 && (
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
                    )}
                  </div>
                  الإشعارات
                  <span className="text-sm font-normal text-gray-500">
                    ({notifications.filter(n => !n.read).length} جديدة)
                  </span>
                </CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setNotificationsOpen(false)}
                >
                  ✕
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0 max-h-96 overflow-auto">
              <div className="divide-y">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 hover:bg-gray-50 cursor-pointer transition-colors ${
                      !notification.read ? 'bg-blue-50/50 border-r-4 border-r-primary' : ''
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        notification.type === 'order' ? 'bg-blue-100 text-blue-600' :
                        notification.type === 'delivery' ? 'bg-green-100 text-green-600' :
                        notification.type === 'promotion' ? 'bg-purple-100 text-purple-600' :
                        'bg-gray-100 text-gray-600'
                      }`}>
                        {notification.type === 'order' ? '📦' :
                         notification.type === 'delivery' ? '🚚' :
                         notification.type === 'promotion' ? '🎁' : 'ℹ️'}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <h4 className="font-semibold text-sm text-gray-900">
                            {notification.title}
                          </h4>
                          {notification.urgent && (
                            <span className="w-2 h-2 bg-red-500 rounded-full flex-shrink-0 mt-1"></span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                          {notification.message}
                        </p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs text-gray-500">
                            {notification.time}
                          </span>
                          {!notification.read && (
                            <span className="text-xs text-primary font-medium">
                              جديدة
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {notifications.length === 0 && (
                <div className="p-8 text-center">
                  <Bell className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500">لا توجد إشعارات حالياً</p>
                </div>
              )}
            </CardContent>

            {notifications.length > 0 && (
              <div className="p-4 border-t bg-gray-50">
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    // هنا يمكن إضافة منطق لتحديد جميع الإشعارات كمقروءة
                    setNotificationsOpen(false);
                  }}
                >
                  تحديد الكل كمقروء
                </Button>
              </div>
            )}
          </Card>
        </div>
      )}

      {/* الشات بوت المتطور */}
      {chatOpen && (
        <div className="fixed bottom-4 right-4 w-80 h-96 bg-white shadow-2xl rounded-2xl flex flex-col z-50 border border-gray-200">
          {/* هيدر الشات بوت */}
          <div className="p-4 bg-gradient-to-r from-primary to-primary/90 text-white rounded-t-2xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <MessageCircle className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-bold">مساعد إشرو الذكي</h3>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <p className="text-xs opacity-90">متوفر الآن للمساعدة</p>
                </div>
              </div>
            </div>
          </div>

          {/* منطقة الرسائل */}
          <div className="flex-1 p-4 overflow-auto bg-gray-50">
            <div className="space-y-4">
              {/* رسالة ترحيب من البوت */}
              <div className="flex gap-3">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-sm">🤖</span>
                </div>
                <div className="bg-white rounded-2xl rounded-tl-md p-3 shadow-sm max-w-xs">
                  <p className="text-sm text-gray-800">
                    مرحباً! أنا مساعد إشرو الذكي 🤖
                    <br />
                    كيف يمكنني مساعدتك اليوم؟
                  </p>
                  <p className="text-xs text-gray-500 mt-2">الآن</p>
                </div>
              </div>

              {/* رسائل مقترحة */}
              <div className="space-y-2">
                <p className="text-xs text-gray-600 font-medium">رسائل مقترحة:</p>
                <div className="grid grid-cols-1 gap-2">
                  {[
                    'كيفية تتبع طلبي؟',
                    'سياسة الإرجاع',
                    'طرق الدفع المتاحة',
                    'تواصل مع الدعم الفني'
                  ].map((suggestion, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      className="justify-start text-right h-auto py-2 px-3 text-xs"
                      onClick={() => {
                        // هنا يمكن إضافة منطق للتعامل مع الرسائل المقترحة
                      }}
                    >
                      {suggestion}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* منطقة إدخال الرسائل */}
          <div className="p-4 border-t bg-white rounded-b-2xl">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="اكتب رسالتك هنا..."
                className="flex-1 text-sm border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <Button size="sm" className="rounded-full w-10 h-10 p-0">
                <MessageCircle className="h-4 w-4" />
              </Button>
            </div>

            {/* خيارات سريعة */}
            <div className="flex justify-center gap-2 mt-3">
              <Button variant="ghost" size="sm" className="text-xs">
                📞 اتصال هاتفي
              </Button>
              <Button variant="ghost" size="sm" className="text-xs">
                📧 إرسال بريد إلكتروني
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// مكون لوحة المعلومات الرئيسية
const DashboardContent: React.FC<any> = ({ stats, orders, customerInfo }) => {
  return (
    <div className="space-y-6">
      {/* بطاقة الترحيب الديناصورية */}
      <Card className="bg-gradient-to-r from-primary via-purple-600 to-blue-600 text-white relative overflow-hidden animate-pulse-slow neon-glow">
        <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-transparent to-white/10 animate-shimmer"></div>
        <CardContent className="p-8 relative z-10">
          <div className="flex items-center justify-between">
            <div className="animate-slide-in">
              <h2 className="text-3xl font-bold mb-3 bg-gradient-to-r from-white to-yellow-200 bg-clip-text text-transparent">
                أهلاً وسهلاً بك عزيزي المشترك 🌟✨
              </h2>
              <p className="text-white/90 text-lg">
                نتمنى لك تجربة استثنائية معنا بمنصة إشرو الرائدة ✨
              </p>
              <div className="flex items-center gap-2 mt-3">
                <div className="w-2 h-2 bg-yellow-300 rounded-full animate-bounce-custom"></div>
                <span className="text-yellow-200 text-sm font-medium">متصل الآن</span>
              </div>
            </div>
            <div className="relative">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center animate-rotate border-2 border-white/30">
                <User className="h-10 w-10 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* الإحصائيات الشاملة والديناميكية مع تأثيرات ديناصورية */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="group hover:shadow-2xl transition-all duration-500 hover:scale-105 animate-fade-in glass-effect border-0 overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <CardContent className="p-6 relative z-10">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl group-hover:animate-bounce-custom shadow-lg">
                <Package className="h-7 w-7 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-600 group-hover:text-blue-600 transition-colors">إجمالي الطلبات</p>
                <p className="text-3xl font-bold text-blue-600 group-hover:text-blue-700 transition-colors animate-pulse-slow">{stats.totalOrders}</p>
                <p className="text-xs text-gray-500">طلب خلال الشهر الحالي</p>
              </div>
            </div>
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-blue-200/30 to-transparent rounded-full -translate-y-10 translate-x-10"></div>
          </CardContent>
        </Card>

        <Card className="group hover:shadow-2xl transition-all duration-500 hover:scale-105 animate-fade-in glass-effect border-0 overflow-hidden relative" style={{animationDelay: '0.1s'}}>
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <CardContent className="p-6 relative z-10">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-green-400 to-green-600 rounded-xl group-hover:animate-bounce-custom shadow-lg">
                <DollarSign className="h-7 w-7 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-600 group-hover:text-green-600 transition-colors">إجمالي المشتريات</p>
                <p className="text-3xl font-bold text-green-600 group-hover:text-green-700 transition-colors animate-pulse-slow">{stats.totalSpent.toLocaleString()} د.ل</p>
                <p className="text-xs text-gray-500">متوسط: {stats.avgOrderValue.toLocaleString()} د.ل</p>
              </div>
            </div>
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-green-200/30 to-transparent rounded-full -translate-y-10 translate-x-10"></div>
          </CardContent>
        </Card>

        <Card className="group hover:shadow-2xl transition-all duration-500 hover:scale-105 animate-fade-in glass-effect border-0 overflow-hidden relative" style={{animationDelay: '0.2s'}}>
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <CardContent className="p-6 relative z-10">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl group-hover:animate-bounce-custom shadow-lg">
                <Star className="h-7 w-7 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-600 group-hover:text-purple-600 transition-colors">المنتجات المفضلة</p>
                <p className="text-3xl font-bold text-purple-600 group-hover:text-purple-700 transition-colors animate-pulse-slow">{stats.favoriteProducts}</p>
                <p className="text-xs text-gray-500">تم إعجابك بها مؤخراً</p>
              </div>
            </div>
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-purple-200/30 to-transparent rounded-full -translate-y-10 translate-x-10"></div>
          </CardContent>
        </Card>

        <Card className="group hover:shadow-2xl transition-all duration-500 hover:scale-105 animate-fade-in glass-effect border-0 overflow-hidden relative" style={{animationDelay: '0.3s'}}>
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-red-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <CardContent className="p-6 relative z-10">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl group-hover:animate-bounce-custom shadow-lg">
                <Bell className="h-7 w-7 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-600 group-hover:text-orange-600 transition-colors">الإشعارات</p>
                <p className="text-3xl font-bold text-orange-600 group-hover:text-orange-700 transition-colors animate-pulse-slow">{stats.notificationsCount}</p>
                <p className="text-xs text-gray-500">في انتظار المراجعة</p>
              </div>
            </div>
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-orange-200/30 to-transparent rounded-full -translate-y-10 translate-x-10"></div>
          </CardContent>
        </Card>
      </div>

      {/* إحصائيات إضافية مفصلة */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-600 font-medium">معدل النشاط</p>
                <p className="text-2xl font-bold text-blue-800">{stats.activityRate}%</p>
              </div>
              <Activity className="h-8 w-8 text-blue-600" />
            </div>
            <div className="mt-2">
              <div className="w-full bg-blue-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${stats.activityRate}%` }}
                ></div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-50 to-green-100 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-600 font-medium">معدل الرضا</p>
                <p className="text-2xl font-bold text-green-800">{stats.satisfactionRate}%</p>
              </div>
              <Award className="h-8 w-8 text-green-600" />
            </div>
            <div className="mt-2">
              <div className="w-full bg-green-200 rounded-full h-2">
                <div
                  className="bg-green-600 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${stats.satisfactionRate}%` }}
                ></div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-600 font-medium">المشتريات الشهرية</p>
                <p className="text-2xl font-bold text-purple-800">{stats.monthlySpending.toLocaleString()} د.ل</p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-600" />
            </div>
            <p className="text-xs text-purple-500 mt-2">هذا الشهر</p>
          </CardContent>
        </Card>
      </div>

      {/* الطلبات الأخيرة مع تفاصيل محسنة وصور المنتجات الحقيقية */}
      <Card className="overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 border-b">
          <CardTitle className="flex items-center gap-2">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Package className="h-5 w-5 text-blue-600" />
            </div>
            الطلبات الأخيرة والتتبع
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="space-y-0">
            {orders.slice(0, 3).map((order: any) => (
              <div key={order.id} className="border-b last:border-b-0 hover:bg-gray-50 transition-colors">
                <div className="p-4">
                  {/* هيدر الطلب */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-sm">{order.store.charAt(0)}</span>
                      </div>
                      <div>
                        <p className="font-bold text-lg">{order.id}</p>
                        <p className="text-sm text-gray-600">من متجر {order.store}</p>
                        <p className="text-xs text-gray-500">
                          {new Date(order.orderTime).toLocaleDateString('ar')} - {new Date(order.orderTime).toLocaleTimeString('ar')}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-lg text-primary">{order.total.toLocaleString()} د.ل</p>
                      <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                        order.status === 'مكتملة' ? 'bg-green-100 text-green-800' :
                        order.status === 'قيد المراجعة' ? 'bg-orange-100 text-orange-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {order.status}
                      </span>
                    </div>
                  </div>

                  {/* معلومات التتبع */}
                  <div className="flex items-center justify-between mb-4 p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-4 text-sm">
                      <span className="flex items-center gap-1">
                        📦 {order.items} منتج
                      </span>
                      <span className="flex items-center gap-1">
                        🚚 {order.trackingNumber}
                      </span>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500">متوقع التسليم: {order.estimatedDelivery}</p>
                    </div>
                  </div>

                  {/* منتجات الطلب مع الصور والتفاصيل */}
                  <div className="space-y-3">
                    <p className="text-sm font-medium text-gray-700 mb-3">منتجات الطلب:</p>
                    <div className="grid gap-3">
                      {order.products.slice(0, 2).map((product: any, index: number) => (
                        <div key={index} className="flex items-center gap-3 p-3 bg-white border rounded-lg hover:shadow-md transition-shadow">
                          <div className="relative">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-16 h-16 object-cover rounded-lg border-2 border-gray-100"
                              onError={(e) => {
                                e.currentTarget.src = '/assets/stores/1.webp';
                              }}
                            />
                            <div className="absolute -top-2 -right-2 w-6 h-6 bg-primary text-white text-xs rounded-full flex items-center justify-center font-bold">
                              {product.quantity}
                            </div>
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-sm text-gray-900">{product.name}</h4>
                            <p className="text-xs text-gray-600">ID: {product.id}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-xs bg-gray-100 px-2 py-1 rounded">المقاس: {product.size}</span>
                              <span className="text-xs bg-gray-100 px-2 py-1 rounded">اللون: {product.color}</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-primary">{product.price.toLocaleString()} د.ل</p>
                          </div>
                        </div>
                      ))}
                      {order.products.length > 2 && (
                        <div className="text-center py-2">
                          <span className="text-sm text-primary font-medium hover:underline cursor-pointer">
                            عرض {order.products.length - 2} منتجات أخرى
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* أزرار التحكم */}
                  <div className="flex gap-2 mt-4 pt-3 border-t">
                    <Button variant="outline" size="sm" className="flex-1">
                      تتبع الطلب
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      إعادة الطلب
                    </Button>
                    {order.status === 'مكتملة' && (
                      <Button variant="outline" size="sm" className="flex-1">
                        تقييم المنتجات
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {orders.length === 0 && (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Package className="h-10 w-10 text-gray-400" />
              </div>
              <p className="text-gray-500 font-medium">لا توجد طلبات حالياً</p>
              <p className="text-sm text-gray-400 mt-1">ابدأ التسوق لتظهر طلباتك هنا</p>
              <Button className="mt-4">استكشف المنتجات</Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* قسم الأنشطة الحديثة */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            الأنشطة الحديثة
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="h-4 w-4 text-green-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">تم تأكيد طلبك رقم ORD-001</p>
                <p className="text-xs text-gray-500">منذ ساعتين</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <Star className="h-4 w-4 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">أضفت منتج جديد للمفضلة</p>
                <p className="text-xs text-gray-500">منذ 4 ساعات</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg">
              <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                <Bell className="h-4 w-4 text-orange-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">لديك إشعار جديد من متجر نواعم</p>
                <p className="text-xs text-gray-500">منذ يوم واحد</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// مكون الطلبات
const OrdersContent: React.FC<any> = ({ orders }) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>جميع الطلبات</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {orders.map((order: any) => (
              <div key={order.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="font-bold">{order.id}</h3>
                    <p className="text-sm text-gray-600">{order.date}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    order.status === 'مكتملة' ? 'bg-green-100 text-green-800' :
                    order.status === 'قيد المراجعة' ? 'bg-orange-100 text-orange-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {order.status}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600">{order.items} منتج من {order.store}</p>
                  <p className="font-bold">{order.total.toLocaleString()} د.ل</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// مكون الاشتراكات الشامل مع وسائل التواصل الاجتماعي والبريد الإلكتروني
const SubscriptionsContent: React.FC = () => {
  const [subscriptions, setSubscriptions] = useState({
    email: true,
    sms: false,
    whatsapp: true,
    socialMedia: {
      facebook: false,
      instagram: false,
      stores: [
        { id: 1, name: 'نواعم', facebook: 'https://www.facebook.com/aljumanforhejab/?locale=ar_AR', subscribed: false },
        { id: 2, name: 'شيرين', facebook: 'https://www.facebook.com/sheirine.ly', subscribed: true },
        { id: 3, name: 'دلتا ستور', facebook: 'https://www.facebook.com/detailssstore', subscribed: false },
        { id: 4, name: 'بريتي', instagram: 'https://www.instagram.com/prettyshop_ly/', subscribed: true },
        { id: 5, name: 'ماجنا', facebook: 'https://www.facebook.com/MagnaBeautyA', instagram: 'https://www.instagram.com/magna_beauty_a/', subscribed: false }
      ]
    }
  });

  const toggleSubscription = (type: string, value?: any) => {
    setSubscriptions(prev => ({
      ...prev,
      [type]: value !== undefined ? value : !prev[type as keyof typeof prev]
    }));
  };

  const toggleStoreSubscription = (storeId: number) => {
    setSubscriptions(prev => ({
      ...prev,
      socialMedia: {
        ...prev.socialMedia,
        stores: prev.socialMedia.stores.map(store =>
          store.id === storeId ? { ...store, subscribed: !store.subscribed } : store
        )
      }
    }));
  };

  return (
    <div className="space-y-6">
      {/* إشعارات المنصة */}
      <Card className="overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 border-b">
          <CardTitle className="flex items-center gap-2">
            <div className="p-2 bg-green-100 rounded-lg">
              <Bell className="h-5 w-5 text-green-600" />
            </div>
            إشعارات منصة إشرو
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <Mail className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold">البريد الإلكتروني</h3>
                  <p className="text-sm text-gray-600">احصل على آخر المنتجات والعروض عبر البريد الإلكتروني</p>
                </div>
              </div>
              <Button
                variant={subscriptions.email ? "default" : "outline"}
                onClick={() => toggleSubscription('email')}
                className={subscriptions.email ? 'bg-green-600 hover:bg-green-700' : ''}
              >
                {subscriptions.email ? 'مشترك' : 'اشتراك'}
              </Button>
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <MessageCircle className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold">رسائل SMS</h3>
                  <p className="text-sm text-gray-600">تلقي التحديثات المهمة عبر الرسائل النصية</p>
                </div>
              </div>
              <Button
                variant={subscriptions.sms ? "default" : "outline"}
                onClick={() => toggleSubscription('sms')}
                className={subscriptions.sms ? 'bg-green-600 hover:bg-green-700' : ''}
              >
                {subscriptions.sms ? 'مشترك' : 'اشتراك'}
              </Button>
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <Phone className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold">واتساب</h3>
                  <p className="text-sm text-gray-600">احصل على أحدث العروض والمنتجات عبر واتساب</p>
                </div>
              </div>
              <Button
                variant={subscriptions.whatsapp ? "default" : "outline"}
                onClick={() => toggleSubscription('whatsapp')}
                className={subscriptions.whatsapp ? 'bg-green-600 hover:bg-green-700' : ''}
              >
                {subscriptions.whatsapp ? 'مشترك' : 'اشتراك'}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* اشتراكات وسائل التواصل الاجتماعي للمتاجر */}
      <Card className="overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 border-b">
          <CardTitle className="flex items-center gap-2">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Users className="h-5 w-5 text-purple-600" />
            </div>
            اشتراكات متاجر وسائل التواصل الاجتماعي
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            {subscriptions.socialMedia.stores.map((store) => (
              <div key={store.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">{store.name.charAt(0)}</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">{store.name}</h3>
                      <p className="text-sm text-gray-600">متجر متخصص في المنتجات الراقية</p>
                    </div>
                  </div>
                  <Button
                    variant={store.subscribed ? "default" : "outline"}
                    onClick={() => toggleStoreSubscription(store.id)}
                    className={store.subscribed ? 'bg-green-600 hover:bg-green-700' : ''}
                  >
                    {store.subscribed ? 'مشترك' : 'اشتراك'}
                  </Button>
                </div>

                <div className="flex gap-3">
                  {store.facebook && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => window.open(store.facebook, '_blank')}
                    >
                      <span className="ml-2">📘</span>
                      فيسبوك
                    </Button>
                  )}
                  {store.instagram && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => window.open(store.instagram, '_blank')}
                    >
                      <span className="ml-2">📷</span>
                      إنستغرام
                    </Button>
                  )}
                </div>

                {store.subscribed && (
                  <div className="mt-3 p-3 bg-green-50 rounded-lg">
                    <p className="text-sm text-green-700">
                      ✅ مشترك في متجر {store.name} - ستتلقى آخر التحديثات من منتجاتهم الجديدة
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* إحصائيات الاشتراكات */}
      <Card className="overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-green-50 border-b">
          <CardTitle className="flex items-center gap-2">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Activity className="h-5 w-5 text-blue-600" />
            </div>
            إحصائيات اشتراكاتك
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <p className="text-2xl font-bold text-blue-600">
                {subscriptions.socialMedia.stores.filter(s => s.subscribed).length}
              </p>
              <p className="text-sm text-gray-600">متاجر مشترك بها</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <p className="text-2xl font-bold text-green-600">
                {Object.values(subscriptions).filter(v => typeof v === 'boolean' && v).length}
              </p>
              <p className="text-sm text-gray-600">خدمات نشطة</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <p className="text-2xl font-bold text-purple-600">
                {subscriptions.socialMedia.stores.filter(s => s.facebook || s.instagram).length}
              </p>
              <p className="text-sm text-gray-600">حسابات متاحة</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// مكون الإحالات الشامل مع الإحصائيات والمكافآت
const ReferralsContent: React.FC = () => {
  const [referralData, setReferralData] = useState({
    referralLink: 'https://eshro.ly/invite/1',
    invitedFriends: 8,
    joinedFriends: 5,
    totalPoints: 750,
    availableRewards: 1250,
    recentReferrals: [
      { id: 1, name: 'أحمد محمد', status: 'انضم', date: '2024-01-10', points: 150 },
      { id: 2, name: 'فاطمة علي', status: 'انضم', date: '2024-01-08', points: 150 },
      { id: 3, name: 'محمد سالم', status: 'دعوة مرسلة', date: '2024-01-07', points: 0 },
      { id: 4, name: 'نور حسن', status: 'انضم', date: '2024-01-05', points: 150 },
      { id: 5, name: 'علي محمود', status: 'دعوة مرسلة', date: '2024-01-03', points: 0 }
    ]
  });

  const copyReferralLink = () => {
    navigator.clipboard.writeText(referralData.referralLink);
    // يمكن إضافة notification هنا
  };

  const shareViaWhatsApp = () => {
    const message = `انضم لمنصة إشرو واحصل على أفضل المنتجات! استخدم رابط الإحالة الخاص بي: ${referralData.referralLink}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="space-y-6">
      {/* بطاقة برنامج الإحالات الرئيسية */}
      <Card className="overflow-hidden bg-gradient-to-br from-green-50 to-blue-50">
        <CardContent className="p-8">
          <div className="text-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Users className="h-10 w-10 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">برنامج الإحالات</h2>
            <p className="text-gray-600">ادعُ أصدقاءك واكسب مكافآت رائعة</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="text-center p-4 bg-white/70 rounded-lg backdrop-blur-sm">
              <p className="text-3xl font-bold text-green-600">{referralData.totalPoints}</p>
              <p className="text-sm text-gray-600">نقاط مكافآت</p>
            </div>
            <div className="text-center p-4 bg-white/70 rounded-lg backdrop-blur-sm">
              <p className="text-3xl font-bold text-blue-600">{referralData.joinedFriends}</p>
              <p className="text-sm text-gray-600">انضموا بالفعل</p>
            </div>
            <div className="text-center p-4 bg-white/70 rounded-lg backdrop-blur-sm">
              <p className="text-3xl font-bold text-purple-600">{referralData.invitedFriends}</p>
              <p className="text-sm text-gray-600">أصدقاء مدعوين</p>
            </div>
          </div>

          <div className="bg-white/80 rounded-lg p-4 backdrop-blur-sm">
            <p className="font-semibold text-gray-800 mb-2">رابط الإحالة الخاص بك:</p>
            <div className="flex gap-2">
              <div className="flex-1 p-3 bg-gray-50 rounded-lg border">
                <p className="text-sm font-mono text-gray-700 break-all">{referralData.referralLink}</p>
              </div>
              <Button onClick={copyReferralLink} className="px-6">
                نسخ الرابط
              </Button>
            </div>
            <div className="flex gap-2 mt-3">
              <Button variant="outline" onClick={shareViaWhatsApp} className="flex-1">
                <span className="ml-2">📱</span>
                مشاركة عبر واتساب
              </Button>
              <Button variant="outline" className="flex-1">
                <span className="ml-2">🔗</span>
                مشاركة عامة
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* كيفية عمل البرنامج */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-blue-600" />
            كيفية عمل برنامج الإحالات
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 border rounded-lg">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-blue-600 font-bold">1</span>
              </div>
              <h3 className="font-semibold mb-2">ادعُ أصدقاءك</h3>
              <p className="text-sm text-gray-600">شارك رابط الإحالة الخاص بك مع أصدقائك</p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-green-600 font-bold">2</span>
              </div>
              <h3 className="font-semibold mb-2">يحصلون على خصم</h3>
              <p className="text-sm text-gray-600">يحصل أصدقاؤك على خصم 10% على أول طلب</p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-purple-600 font-bold">3</span>
              </div>
              <h3 className="font-semibold mb-2">اكسب نقاط</h3>
              <p className="text-sm text-gray-600">احصل على 150 نقطة لكل صديق ينضم ويشتري</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* الإحالات الأخيرة */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-green-600" />
            الإحالات الأخيرة
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {referralData.recentReferrals.map((referral) => (
              <div key={referral.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">
                      {referral.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{referral.name}</p>
                    <p className="text-xs text-gray-500">{referral.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                    referral.status === 'انضم' ? 'bg-green-100 text-green-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {referral.status}
                  </span>
                  {referral.points > 0 && (
                    <p className="text-sm font-bold text-green-600 mt-1">
                      +{referral.points} نقطة
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* المكافآت المتاحة */}
      <Card className="overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 border-b">
          <CardTitle className="flex items-center gap-2">
            <Gift className="h-5 w-5 text-purple-600" />
            المكافآت المتاحة
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <Gift className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-bold">خصم 50 دينار</h3>
                  <p className="text-sm text-gray-600">متاح للاستبدال</p>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-3">احصل على خصم 50 دينار على طلبك القادم</p>
              <Button
                className="w-full"
                disabled={referralData.totalPoints < 500}
                variant={referralData.totalPoints >= 500 ? "default" : "outline"}
              >
                {referralData.totalPoints >= 500 ? 'استبدال الآن' : 'تحتاج 500 نقطة'}
              </Button>
            </div>

            <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Gift className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-bold">شحن مجاني</h3>
                  <p className="text-sm text-gray-600">شهر كامل</p>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-3">شحن مجاني على جميع الطلبات لمدة شهر</p>
              <Button
                className="w-full"
                disabled={referralData.totalPoints < 300}
                variant={referralData.totalPoints >= 300 ? "default" : "outline"}
              >
                {referralData.totalPoints >= 300 ? 'استبدال الآن' : 'تحتاج 300 نقطة'}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// مكون التحميلات
const DownloadsContent: React.FC = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>ملفاتك المحملة</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Download className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">لا توجد ملفات محملة حالياً</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// مكون الملف الشخصي المحسن مع جميع الوظائف المطلوبة
const ProfileContent: React.FC<any> = ({ customerInfo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [imageUploadSuccess, setImageUploadSuccess] = useState(false);
  const [profileData, setProfileData] = useState({
    name: customerInfo.name,
    email: customerInfo.email,
    phone: customerInfo.phone,
    joinDate: customerInfo.joinDate,
    accountStatus: 'نشط',
    avatar: customerInfo.avatar,
    birthDate: '',
    city: '',
    address: '',
    bank: '',
    accountNumber: '',
    accountHolderName: ''
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const accountStatuses = [
    { value: 'نشط', label: 'نشط', color: 'bg-green-100 text-green-800' },
    { value: 'غير نشط', label: 'غير نشط', color: 'bg-gray-100 text-gray-800' },
    { value: 'متوقف', label: 'متوقف', color: 'bg-orange-100 text-orange-800' },
    { value: 'ملغي', label: 'ملغي', color: 'bg-red-100 text-red-800' }
  ];

  const libyanCities = [
    'طرابلس', 'بنغازي', 'مصراتة', 'البيضاء', 'زليتن', 'صبراتة', 'زوارة',
    'الخمس', 'ترهونة', 'سرت', 'اجدابيا', 'المرج', 'طبرق', 'درنة', 'توكرة'
  ];

  const libyanBanks = [
    'مصرف الجمهورية', 'مصرف الوحدة', 'مصرف الصحاري', 'مصرف التجارة والتنمية',
    'مصرف شمال أفريقيا', 'المصرف الليبي الإسلامي', 'مصرف المتوسط',
    'مصرف الأمان', 'مصرف الإجماع العربي', 'مصرف اليقين'
  ];

  const handleSaveProfile = () => {
    // هنا يتم حفظ البيانات
    if (uploadedImage) {
      // حفظ الصورة في localStorage أو أي نظام تخزين آخر
      localStorage.setItem('userProfileImage', uploadedImage);
    }
    setIsEditing(false);
    // تحديث الصفحة لإظهار الصورة الجديدة في الشريط الجانبي
    window.location.reload();
  };

  // دالة للحصول على الصورة المحفوظة
  React.useEffect(() => {
    const savedImage = localStorage.getItem('userProfileImage');
    if (savedImage) {
      setUploadedImage(savedImage);
    }
  }, []);

  const handleChangePassword = () => {
    // هنا يتم تغيير كلمة المرور
    setShowChangePassword(false);
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  return (
    <div className="space-y-6">
      {/* معلومات الحساب الرئيسية */}
      <Card className="overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 border-b">
          <CardTitle className="flex items-center gap-2">
            <div className="p-2 bg-blue-100 rounded-lg">
              <User className="h-5 w-5 text-blue-600" />
            </div>
            معلومات الحساب
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex items-center gap-6 mb-6">
            <div className="relative">
              {(() => {
                const savedImage = localStorage.getItem('userProfileImage');
                return savedImage ? (
                  <img
                    src={savedImage}
                    alt="صورة الملف الشخصي"
                    className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg"
                  />
                ) : (
                  <div className="w-20 h-20 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-2xl">
                      {profileData.name.charAt(0)}
                    </span>
                  </div>
                );
              })()}
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-xl text-gray-800">{profileData.name}</h3>
              <div className="flex items-center gap-2 mt-1">
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${accountStatuses.find(s => s.value === profileData.accountStatus)?.color}`}>
                  {profileData.accountStatus}
                </span>
                <span className="text-sm text-gray-600">★ ★ ★ ★ ★</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-medium text-gray-700">البريد الإلكتروني</label>
              <p className="text-gray-600 mt-1">{profileData.email}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">رقم الهاتف</label>
              <p className="text-gray-600 mt-1">{profileData.phone}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">تاريخ الانضمام</label>
              <p className="text-gray-600 mt-1">{profileData.joinDate}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">حالة الحساب</label>
              <p className="text-gray-600 mt-1">{profileData.accountStatus}</p>
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <Button onClick={() => setIsEditing(true)} className="flex-1">
              تعديل المعلومات الشخصية
            </Button>
            <Button
              variant="outline"
              onClick={() => setShowChangePassword(true)}
              className="flex-1"
              data-action="change-password"
            >
              تغيير كلمة المرور
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* نافذة تعديل المعلومات الشخصية */}
      {isEditing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-auto">
            <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 border-b">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5 text-green-600" />
                  تعديل المعلومات الشخصية
                </CardTitle>
                <Button variant="ghost" size="sm" onClick={() => setIsEditing(false)}>
                  ✕
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              {/* صورة المستخدم */}
              <div className="space-y-3">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <img
                      src={uploadedImage || "/api/placeholder/80/80"}
                      alt="صورة الملف الشخصي"
                      className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
                    />
                    <label className="absolute -bottom-2 -right-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center cursor-pointer hover:bg-primary/80 transition-colors">
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onload = (event) => {
                              const base64String = event.target?.result as string;
                              setUploadedImage(base64String);
                              setImageUploadSuccess(true);
                              // إخفاء رسالة النجاح بعد 3 ثواني
                              setTimeout(() => setImageUploadSuccess(false), 3000);
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                      />
                      <span className="text-white text-sm">📷</span>
                    </label>
                  </div>
                  <div>
                    <p className="font-medium">صورة الملف الشخصي</p>
                    <p className="text-sm text-gray-600">انقر على الكاميرا لرفع صورة جديدة</p>
                  </div>
                </div>

                {/* رسالة نجاح رفع الصورة */}
                {imageUploadSuccess && (
                  <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                    <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    <p className="text-sm text-green-700 font-medium">تم رفع الصورة بنجاح!</p>
                  </div>
                )}
              </div>

              {/* البيانات الأساسية */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">الاسم الكامل</label>
                  <input
                    type="text"
                    value={profileData.name}
                    onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">رقم الموبايل</label>
                  <input
                    type="tel"
                    value={profileData.phone}
                    onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">البريد الإلكتروني</label>
                  <input
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">تاريخ الميلاد</label>
                  <input
                    type="date"
                    value={profileData.birthDate}
                    onChange={(e) => setProfileData({...profileData, birthDate: e.target.value})}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
              </div>

              {/* الموقع */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">المدينة</label>
                  <select
                    value={profileData.city}
                    onChange={(e) => setProfileData({...profileData, city: e.target.value})}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="">اختر المدينة</option>
                    {libyanCities.map(city => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">العنوان التفصيلي</label>
                  <input
                    type="text"
                    value={profileData.address}
                    onChange={(e) => setProfileData({...profileData, address: e.target.value})}
                    placeholder="أدخل عنوانك التفصيلي"
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
              </div>

              {/* المعلومات المصرفية */}
              <div className="space-y-4">
                <h3 className="font-bold text-lg text-gray-800">المعلومات المصرفية</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">المصرف</label>
                    <select
                      value={profileData.bank}
                      onChange={(e) => setProfileData({...profileData, bank: e.target.value})}
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      <option value="">اختر المصرف</option>
                      {libyanBanks.map(bank => (
                        <option key={bank} value={bank}>{bank}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">رقم الحساب الجاري</label>
                    <input
                      type="text"
                      value={profileData.accountNumber}
                      onChange={(e) => setProfileData({...profileData, accountNumber: e.target.value})}
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-2">اسم صاحب الحساب</label>
                    <input
                      type="text"
                      value={profileData.accountHolderName}
                      onChange={(e) => setProfileData({...profileData, accountHolderName: e.target.value})}
                      placeholder="أدخل اسم صاحب الحساب كما يظهر في المصرف"
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* أزرار الحفظ والإلغاء */}
              <div className="flex gap-3 pt-4">
                <Button onClick={handleSaveProfile} className="flex-1">
                  حفظ التغييرات
                </Button>
                <Button variant="outline" onClick={() => setIsEditing(false)} className="flex-1">
                  إلغاء
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* نافذة تغيير كلمة المرور */}
      {showChangePassword && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 border-b">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5 text-purple-600" />
                  تغيير كلمة المرور
                </CardTitle>
                <Button variant="ghost" size="sm" onClick={() => setShowChangePassword(false)}>
                  ✕
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">كلمة المرور الحالية</label>
                <input
                  type="password"
                  value={passwordData.currentPassword}
                  onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">كلمة المرور الجديدة</label>
                <input
                  type="password"
                  value={passwordData.newPassword}
                  onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                <p className="text-xs text-gray-500 mt-1">يجب أن تكون 6 أحرف على الأقل</p>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">أعد إدخال كلمة المرور الجديدة</label>
                <input
                  type="password"
                  value={passwordData.confirmPassword}
                  onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <Button onClick={handleChangePassword} className="flex-1">
                  تغيير كلمة المرور
                </Button>
                <Button variant="outline" onClick={() => setShowChangePassword(false)} className="flex-1">
                  إلغاء
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

// مكون المفضلة مع منتجات حقيقية وصور مصغرة
const FavoritesContent: React.FC<any> = ({ stats, favorites = [] }) => {
  // استرجاع المنتجات المفضلة من localStorage إذا لم تكن موجودة في props
  const [favoriteProducts, setFavoriteProducts] = useState(() => {
    if (favorites.length > 0) {
      return favorites;
    }

    // محاولة استرجاع المنتجات المفضلة من localStorage
    try {
      const savedFavorites = localStorage.getItem('eshro_favorites');
      if (savedFavorites) {
        return JSON.parse(savedFavorites);
      }
    } catch (error) {
      console.error('Error loading favorites from localStorage:', error);
    }

    return [];
  });

  const removeFromFavorites = (productId: number) => {
    setFavoriteProducts(prev => prev.filter(p => p.id !== productId));

    // حذف المنتج من localStorage أيضاً
    try {
      const savedFavorites = JSON.parse(localStorage.getItem('eshro_favorites') || '[]');
      const updatedFavorites = savedFavorites.filter((p: any) => p.id !== productId);
      localStorage.setItem('eshro_favorites', JSON.stringify(updatedFavorites));
    } catch (error) {
      console.error('Error removing from favorites in localStorage:', error);
    }
  };

  const addToFavorites = (product: any) => {
    if (!favoriteProducts.find(p => p.id === product.id)) {
      const newFavoriteProduct = {
        ...product,
        dateAdded: new Date().toISOString()
      };

      setFavoriteProducts(prev => [...prev, newFavoriteProduct]);

      // إضافة المنتج للـ localStorage أيضاً
      try {
        const savedFavorites = JSON.parse(localStorage.getItem('eshro_favorites') || '[]');
        savedFavorites.push(newFavoriteProduct);
        localStorage.setItem('eshro_favorites', JSON.stringify(savedFavorites));
      } catch (error) {
        console.error('Error adding to favorites in localStorage:', error);
      }
    }
  };

  return (
    <div className="space-y-6">
      <Card className="overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 border-b">
          <CardTitle className="flex items-center gap-2">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Star className="h-5 w-5 text-purple-600" />
            </div>
            منتجاتك المفضلة ({favoriteProducts.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {/* زر إضافة منتج جديد للمفضلة */}
          <div className="p-4 border-b bg-gradient-to-r from-purple-50 to-pink-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 text-purple-600" />
                <span className="font-medium text-purple-800">إدارة المنتجات المفضلة</span>
              </div>
              <Button
                size="sm"
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                onClick={() => {
                  // يمكن إضافة نافذة منبثقة هنا لإضافة منتج جديد للمفضلة
                  alert('سيتم إضافة نافذة اختيار المنتجات قريباً! 🎯');
                }}
              >
                <Star className="h-4 w-4 mr-2" />
                إضافة منتج جديد
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0">
            {favoriteProducts.map((product) => (
              <div key={product.id} className="border-b border-r last:border-r-0 md:border-r-0 md:last:border-b-0 hover:bg-gray-50 transition-colors group">
                <div className="p-4">
                  <div className="relative mb-3">
                    <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg overflow-hidden relative">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          e.currentTarget.src = '/assets/stores/1.webp';
                        }}
                      />
                      <div className="absolute top-2 right-2">
                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                          product.badge === 'أكثر مبيعاً' ? 'bg-green-100 text-green-700' :
                          product.badge === 'جديد' ? 'bg-blue-100 text-blue-700' :
                          product.badge === 'مميزة' ? 'bg-purple-100 text-purple-700' :
                          'bg-orange-100 text-orange-700'
                        }`}>
                          {product.badge}
                        </span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute top-2 left-2 w-8 h-8 p-0 bg-white/80 hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => removeFromFavorites(product.id)}
                      >
                        <span className="text-red-500 text-sm">×</span>
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-bold text-sm text-gray-900 line-clamp-2 group-hover:text-primary transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-xs text-gray-600">من متجر {product.store}</p>
                    <p className="text-xs text-gray-500">أضيف في {new Date(product.dateAdded).toLocaleDateString('ar')}</p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <p className="font-bold text-primary">{product.price.toLocaleString()} د.ل</p>
                        {product.originalPrice > product.price && (
                          <span className="text-xs text-gray-500 line-through">
                            {product.originalPrice.toLocaleString()}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs text-gray-600">{product.rating}</span>
                      </div>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <Button size="sm" className="flex-1">
                        إضافة للسلة
                      </Button>
                      <Button variant="outline" size="sm">
                        عرض المنتج
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {favoriteProducts.length === 0 && (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-10 w-10 text-purple-400" />
              </div>
              <p className="text-gray-500 font-medium">لا توجد منتجات مفضلة حالياً</p>
              <p className="text-sm text-gray-400 mt-1">ابدأ في إضافة المنتجات التي تعجبك</p>
              <Button className="mt-4">استكشف المنتجات</Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

// مكون الإشعارات
const NotificationsContent: React.FC<any> = ({ notifications, stats }) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-blue-500" />
            إشعاراتك ({stats.notificationsCount})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {notifications.map((notification: any) => (
              <div
                key={notification.id}
                className={`p-4 border rounded-lg hover:bg-gray-50 transition-colors ${
                  !notification.read ? 'border-primary bg-primary/5' : 'border-gray-200'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                    notification.type === 'order' ? 'bg-blue-100 text-blue-600' :
                    notification.type === 'delivery' ? 'bg-green-100 text-green-600' :
                    notification.type === 'promotion' ? 'bg-purple-100 text-purple-600' :
                    'bg-gray-100 text-gray-600'
                  }`}>
                    {notification.type === 'order' ? '📦' :
                     notification.type === 'delivery' ? '🚚' :
                     notification.type === 'promotion' ? '🎁' : 'ℹ️'}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <h4 className="font-semibold text-sm text-gray-900">
                        {notification.title}
                      </h4>
                      {notification.urgent && (
                        <span className="w-2 h-2 bg-red-500 rounded-full flex-shrink-0 mt-1"></span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      {notification.message}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-gray-500">
                        {notification.time}
                      </span>
                      {!notification.read && (
                        <span className="text-xs text-primary font-medium">
                          جديدة
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// مكون الدعم الفني الشامل مع جميع الخدمات المطلوبة
const SupportContent: React.FC = () => {
  const [activeFAQ, setActiveFAQ] = useState<number | null>(null);
  const [chatbotOpen, setChatbotOpen] = useState(false);

  const faqData = [
    {
      id: 1,
      question: 'كيف يمكنني المشاركة معكم؟',
      answer: 'عبر التسجيل المباشر على منصة إشرو كعميل أو تاجر، واتباع خطوات التسجيل البسيطة.'
    },
    {
      id: 2,
      question: 'ما هي طرق الدفع المتاحة؟',
      answer: 'نوفر جميع طرق الدفع المحلية والإلكترونية مثل: البطاقات المصرفية، المحافظ الإلكترونية، والدفع عند الاستلام.'
    },
    {
      id: 3,
      question: 'كم تستغرق عملية التوصيل؟',
      answer: 'التوصيل العادي: 24-96 ساعة، التوصيل السريع: 5-12 ساعة. يختلف حسب المنطقة.'
    },
    {
      id: 4,
      question: 'هل يمكنني إرجاع المنتجات؟',
      answer: 'نعم، يمكن إرجاع المنتجات خلال 7 أيام من تاريخ الاستلام بشرط عدم الاستخدام.'
    },
    {
      id: 5,
      question: 'كيف أتتبع طلبي؟',
      answer: 'يمكنك تتبع طلبك من لوحة التحكم > الطلبات، أو عبر الرسائل النصية التي نرسلها لك.'
    }
  ];

  const toggleFAQ = (id: number) => {
    setActiveFAQ(activeFAQ === id ? null : id);
  };

  return (
    <div className="space-y-6">
      {/* الشات بوت والمساعدة السريعة */}
      <Card className="overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-green-50 border-b">
          <CardTitle className="flex items-center gap-2">
            <div className="p-2 bg-blue-100 rounded-lg">
              <MessageCircle className="h-5 w-5 text-blue-600" />
            </div>
            المساعدة والدعم
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* الشات بوت */}
            <div className="space-y-4">
              <h3 className="font-bold text-lg">الشات بوت - الرد الآلي</h3>
              <p className="text-gray-600">احصل على إجابات فورية على استفساراتك</p>
              <div className="bg-gradient-to-r from-blue-500 to-green-500 p-6 rounded-lg text-white text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <MessageCircle className="h-8 w-8" />
                </div>
                <p className="font-bold mb-2">مساعد إشرو الذكي</p>
                <p className="text-sm opacity-90 mb-4">متوفر 24/7 للمساعدة</p>
                <Button
                  className="bg-white text-blue-600 hover:bg-gray-100"
                  onClick={() => setChatbotOpen(true)}
                >
                  بدء محادثة فورية
                </Button>
              </div>
            </div>

            {/* واتساب الدعم الفني */}
            <div className="space-y-4">
              <h3 className="font-bold text-lg">واتساب الدعم الفني</h3>
              <p className="text-gray-600">تحدث مع فريق الدعم مباشرة عبر واتساب</p>
              <div className="bg-green-50 p-6 rounded-lg text-center border-2 border-green-200">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Phone className="h-8 w-8 text-green-600" />
                </div>
                <p className="font-bold text-green-800 mb-2">فريق الدعم متاح الآن</p>
                <p className="text-sm text-gray-600 mb-4">الرد خلال دقائق معدودة</p>
                <Button
                  className="bg-green-600 hover:bg-green-700"
                  onClick={() => window.open('https://wa.me/218944062927', '_blank')}
                >
                  <span className="ml-2">📱</span>
                  فتح واتساب
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* الأسئلة الشائعة */}
      <Card className="overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 border-b">
          <CardTitle className="flex items-center gap-2">
            <div className="p-2 bg-purple-100 rounded-lg">
              <MessageCircle className="h-5 w-5 text-purple-600" />
            </div>
            الأسئلة الشائعة
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <p className="text-gray-600 mb-6">إجابات على أشهر الأسئلة في منصات التجارة الإلكترونية</p>

          <div className="space-y-3">
            {faqData.map((faq) => (
              <div key={faq.id} className="border rounded-lg overflow-hidden">
                <Button
                  variant="ghost"
                  className="w-full justify-between p-4 text-right hover:bg-gray-50"
                  onClick={() => toggleFAQ(faq.id)}
                >
                  <span className="font-medium">{faq.question}</span>
                  <span className={`transition-transform ${activeFAQ === faq.id ? 'rotate-180' : ''}`}>
                    ▼
                  </span>
                </Button>
                {activeFAQ === faq.id && (
                  <div className="p-4 bg-blue-50 border-t">
                    <p className="text-gray-700">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* معلومات التواصل */}
      <Card className="overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-gray-50 to-blue-50 border-b">
          <CardTitle className="flex items-center gap-2">
            <div className="p-2 bg-gray-100 rounded-lg">
              <Phone className="h-5 w-5 text-gray-600" />
            </div>
            معلومات التواصل
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 border rounded-lg hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Mail className="h-6 w-6 text-blue-600" />
              </div>
              <p className="font-semibold mb-1">البريد الإلكتروني</p>
              <a href="mailto:support@eshro.ly" className="text-blue-600 hover:underline">
                support@eshro.ly
              </a>
            </div>

            <div className="text-center p-4 border rounded-lg hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Phone className="h-6 w-6 text-green-600" />
              </div>
              <p className="font-semibold mb-1">رقم الهاتف</p>
              <a href="tel:+218944062927" className="text-green-600 hover:underline font-mono" dir="ltr">
                (218) 94 406 2927
              </a>
            </div>

            <div className="text-center p-4 border rounded-lg hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Clock className="h-6 w-6 text-purple-600" />
              </div>
              <p className="font-semibold mb-1">ساعات العمل</p>
              <p className="text-sm text-gray-600">
                الأحد - الخميس<br />
                9:00 ص - 4:00 م
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* خيارات التواصل السريع */}
      <Card className="overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 border-b">
          <CardTitle className="flex items-center gap-2">
            <div className="p-2 bg-green-100 rounded-lg">
              <Phone className="h-5 w-5 text-green-600" />
            </div>
            تواصل معنا مباشرة
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button
              variant="outline"
              className="h-20 flex-col gap-2 hover:bg-blue-50 hover:border-blue-300"
              onClick={() => window.open('tel:+218944062927', '_blank')}
            >
              <Phone className="h-6 w-6 text-blue-600" />
              <span>اتصال هاتفي</span>
            </Button>
            <Button
              variant="outline"
              className="h-20 flex-col gap-2 hover:bg-green-50 hover:border-green-300"
              onClick={() => window.open('mailto:support@eshro.ly', '_blank')}
            >
              <Mail className="h-6 w-6 text-green-600" />
              <span>إرسال بريد إلكتروني</span>
            </Button>
            <Button
              variant="outline"
              className="h-20 flex-col gap-2 hover:bg-purple-50 hover:border-purple-300"
              onClick={() => setChatbotOpen(true)}
            >
              <MessageCircle className="h-6 w-6 text-purple-600" />
              <span>الشات السريع</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* الشات بوت المنبثق */}
      {chatbotOpen && (
        <div className="fixed bottom-4 left-4 w-80 h-96 bg-white shadow-2xl rounded-2xl flex flex-col z-50 border border-gray-200">
          {/* هيدر الشات بوت */}
          <div className="p-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-t-2xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <MessageCircle className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-bold">مساعد إشرو الذكي</h3>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <p className="text-xs opacity-90">متوفر الآن للمساعدة</p>
                  </div>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setChatbotOpen(false)}
                className="text-white hover:bg-white/20 w-8 h-8 p-0"
              >
                ✕
              </Button>
            </div>
          </div>

          {/* منطقة الرسائل */}
          <div className="flex-1 p-4 overflow-auto bg-gray-50">
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-sm">🤖</span>
                </div>
                <div className="bg-white rounded-2xl rounded-tl-md p-3 shadow-sm max-w-xs">
                  <p className="text-sm text-gray-800">
                    مرحباً! أنا مساعد إشرو الذكي 🤖
                    <br />
                    كيف يمكنني مساعدتك اليوم؟
                  </p>
                  <p className="text-xs text-gray-500 mt-2">الآن</p>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-xs text-gray-600 font-medium">أسئلة شائعة:</p>
                <div className="grid grid-cols-1 gap-2">
                  {faqData.slice(0, 3).map((faq) => (
                    <Button
                      key={faq.id}
                      variant="outline"
                      size="sm"
                      className="justify-start text-right h-auto py-2 px-3 text-xs"
                      onClick={() => {
                        setActiveFAQ(faq.id);
                        setChatbotOpen(false);
                      }}
                    >
                      {faq.question}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* منطقة إدخال الرسائل */}
          <div className="p-4 border-t bg-white rounded-b-2xl">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="اكتب سؤالك هنا..."
                className="flex-1 text-sm border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <Button size="sm" className="rounded-full w-10 h-10 p-0">
                <MessageCircle className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex justify-center gap-2 mt-3">
              <Button variant="ghost" size="sm" className="text-xs" onClick={() => window.open('tel:+218944062927')}>
                📞 اتصال هاتفي
              </Button>
              <Button variant="ghost" size="sm" className="text-xs" onClick={() => window.open('mailto:support@eshro.ly')}>
                📧 إرسال بريد إلكتروني
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerDashboard;
