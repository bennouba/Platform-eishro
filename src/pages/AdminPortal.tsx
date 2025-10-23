import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import FinancialDashboard from '@/components/admin/FinancialDashboard';
import MerchantManagement from '@/components/admin/MerchantManagement';
import InventoryManagement from '@/components/admin/InventoryManagement';
import AnalyticsDashboard from '@/components/admin/AnalyticsDashboard';
import {
  Activity,
  Users,
  Package,
  DollarSign,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Clock,
  Settings,
  BarChart3,
  PieChart,
  Database,
  Shield,
  Wallet,
  Building,
  FileText,
  MessageSquare,
  Smartphone,
  Globe,
  Zap,
  Target,
  Award,
  CreditCard,
  Truck,
  Banknote,
  Calculator,
  Headphones,
  Bot,
  Receipt,
  Store,
  UserCheck,
  Lock,
  Unlock,
  Eye,
  Edit,
  Trash2,
  Plus,
  Search,
  Filter,
  Download,
  Upload,
  RefreshCw,
  Bell,
  BellOff,
  Moon,
  Sun,
  LogOut,
  Menu,
  X,
  ChevronRight,
  ChevronLeft,
  Home,
  ShoppingCart,
  User,
  Layers,
  GitBranch,
  Cpu,
  HardDrive,
  Wifi,
  WifiOff,
  AlertCircle,
  Info,
  Check,
  XCircle
} from 'lucide-react';

interface AdminStats {
  totalMerchants: number;
  totalCustomers: number;
  totalOrders: number;
  totalRevenue: number;
  activeStores: number;
  pendingApprovals: number;
  systemHealth: number;
  todayOrders: number;
  todayRevenue: number;
  conversionRate: number;
}

interface SystemAlert {
  id: string;
  type: 'error' | 'warning' | 'info' | 'success';
  title: string;
  message: string;
  timestamp: Date;
  resolved: boolean;
}

const AdminPortal: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [stats, setStats] = useState<AdminStats>({
    totalMerchants: 1247,
    totalCustomers: 8934,
    totalOrders: 15678,
    totalRevenue: 2847593.50,
    activeStores: 892,
    pendingApprovals: 23,
    systemHealth: 98.7,
    todayOrders: 156,
    todayRevenue: 45230.75,
    conversionRate: 3.2
  });

  const [alerts, setAlerts] = useState<SystemAlert[]>([
    {
      id: '1',
      type: 'warning',
      title: 'ارتفاع في طلبات الدعم الفني',
      message: 'تم تلقي 45 طلب دعم فني في الساعة الماضية',
      timestamp: new Date(),
      resolved: false
    },
    {
      id: '2',
      type: 'error',
      title: 'خطأ في تكامل بنك الصحراء',
      message: 'فشل في الاتصال بـ API بنك الصحراء منذ 15 دقيقة',
      timestamp: new Date(Date.now() - 15 * 60 * 1000),
      resolved: false
    },
    {
      id: '3',
      type: 'success',
      title: 'تحديث ناجح للنظام',
      message: 'تم تحديث نظام إدارة المخزون بنجاح',
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      resolved: true
    }
  ]);

  const navigationItems = [
    { id: 'overview', label: 'نظرة عامة', icon: Home, badge: null },
    { id: 'merchants', label: 'إدارة التجار', icon: Users, badge: '1247' },
    { id: 'customers', label: 'العملاء', icon: UserCheck, badge: '8934' },
    { id: 'orders', label: 'الطلبات', icon: ShoppingCart, badge: '15678' },
    { id: 'inventory', label: 'إدارة المخزون', icon: Package, badge: '892' },
    { id: 'financial', label: 'الإدارة المالية', icon: DollarSign, badge: null },
    { id: 'analytics', label: 'التحليلات', icon: BarChart3, badge: null },
    { id: 'integrations', label: 'التكاملات', icon: GitBranch, badge: '12' },
    { id: 'security', label: 'الأمان والحماية', icon: Shield, badge: null },
    { id: 'support', label: 'الدعم الفني', icon: Headphones, badge: '45' },
    { id: 'settings', label: 'الإعدادات', icon: Settings, badge: null }
  ];

  const quickActions = [
    { label: 'تاجر جديد', icon: Plus, color: 'bg-blue-500', action: 'new_merchant' },
    { label: 'منتج جديد', icon: Package, color: 'bg-green-500', action: 'new_product' },
    { label: 'تقرير مالي', icon: FileText, color: 'bg-purple-500', action: 'financial_report' },
    { label: 'نسخ احتياطي', icon: Database, color: 'bg-orange-500', action: 'backup' }
  ];

  const StatCard: React.FC<{
    title: string;
    value: string | number;
    change?: number;
    icon: React.ElementType;
    color: string;
  }> = ({ title, value, change, icon: Icon, color }) => (
    <Card className="relative overflow-hidden">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold">{value.toLocaleString()}</p>
            {change !== undefined && (
              <p className={`text-sm flex items-center gap-1 ${
                change >= 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {change >= 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                {Math.abs(change)}% من الشهر الماضي
              </p>
            )}
          </div>
          <div className={`p-3 rounded-full ${color}`}>
            <Icon className="h-6 w-6 text-white" />
          </div>
        </div>
        <div className={`absolute top-0 right-0 w-20 h-20 ${color} opacity-10 rounded-full -translate-y-6 translate-x-6`} />
      </CardContent>
    </Card>
  );

  const AlertCard: React.FC<{ alert: SystemAlert }> = ({ alert }) => (
    <Card className={`border-l-4 ${
      alert.type === 'error' ? 'border-l-red-500' :
      alert.type === 'warning' ? 'border-l-yellow-500' :
      alert.type === 'success' ? 'border-l-green-500' :
      'border-l-blue-500'
    }`}>
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className={`p-2 rounded-full ${
            alert.type === 'error' ? 'bg-red-100 text-red-600' :
            alert.type === 'warning' ? 'bg-yellow-100 text-yellow-600' :
            alert.type === 'success' ? 'bg-green-100 text-green-600' :
            'bg-blue-100 text-blue-600'
          }`}>
            {alert.type === 'error' ? <AlertCircle className="h-4 w-4" /> :
             alert.type === 'warning' ? <AlertTriangle className="h-4 w-4" /> :
             alert.type === 'success' ? <CheckCircle className="h-4 w-4" /> :
             <Info className="h-4 w-4" />}
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-sm">{alert.title}</h4>
            <p className="text-sm text-muted-foreground mt-1">{alert.message}</p>
            <p className="text-xs text-muted-foreground mt-2">
              {alert.timestamp.toLocaleString('ar')}
            </p>
          </div>
          {!alert.resolved && (
            <Button size="sm" variant="outline">
              حل
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className={`min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 ${darkMode ? 'dark' : ''}`}>
      {/* Header */}
      <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg border-b border-slate-200 dark:border-slate-700 sticky top-0 z-50">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden"
            >
              {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  EISHRO Admin Portal
                </h1>
                <p className="text-sm text-muted-foreground">لوحة تحكم الإدارة الشاملة</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setDarkMode(!darkMode)}
            >
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } fixed lg:static inset-y-0 left-0 z-40 w-80 bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg border-r border-slate-200 dark:border-slate-700 transition-transform duration-300 ease-in-out lg:translate-x-0`}>
          <div className="flex flex-col h-full">
            <div className="p-6">
              <nav className="space-y-2">
                {navigationItems.map((item) => (
                  <Button
                    key={item.id}
                    variant={activeTab === item.id ? 'default' : 'ghost'}
                    className={`w-full justify-between h-12 ${
                      activeTab === item.id
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                        : 'hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                    onClick={() => setActiveTab(item.id)}
                  >
                    <div className="flex items-center gap-3">
                      <item.icon className="h-5 w-5" />
                      <span>{item.label}</span>
                    </div>
                    {item.badge && (
                      <Badge variant={activeTab === item.id ? 'secondary' : 'outline'}>
                        {item.badge}
                      </Badge>
                    )}
                  </Button>
                ))}
              </nav>
            </div>

            <div className="mt-auto p-6">
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-slate-800 dark:to-slate-700 rounded-xl p-4">
                <h3 className="font-semibold text-sm mb-2">الإجراءات السريعة</h3>
                <div className="grid grid-cols-2 gap-2">
                  {quickActions.map((action, index) => (
                    <Button
                      key={index}
                      size="sm"
                      className={`${action.color} text-white hover:opacity-90`}
                    >
                      <action.icon className="h-4 w-4 mr-1" />
                      {action.label}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 lg:ml-0">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                  title="إجمالي التجار"
                  value={stats.totalMerchants}
                  change={12.5}
                  icon={Users}
                  color="bg-blue-500"
                />
                <StatCard
                  title="إجمالي العملاء"
                  value={stats.totalCustomers}
                  change={8.3}
                  icon={UserCheck}
                  color="bg-green-500"
                />
                <StatCard
                  title="إجمالي الطلبات"
                  value={stats.totalOrders}
                  change={-2.1}
                  icon={ShoppingCart}
                  color="bg-purple-500"
                />
                <StatCard
                  title="إجمالي الإيرادات"
                  value={`${stats.totalRevenue.toLocaleString()} دينار`}
                  change={15.7}
                  icon={DollarSign}
                  color="bg-orange-500"
                />
              </div>

              {/* Secondary Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
                <Card className="p-4">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">المتاجر النشطة</p>
                    <p className="text-xl font-bold text-green-600">{stats.activeStores}</p>
                  </div>
                </Card>
                <Card className="p-4">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">طلبات اليوم</p>
                    <p className="text-xl font-bold text-blue-600">{stats.todayOrders}</p>
                  </div>
                </Card>
                <Card className="p-4">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">إيرادات اليوم</p>
                    <p className="text-xl font-bold text-green-600">{stats.todayRevenue.toLocaleString()} دينار</p>
                  </div>
                </Card>
                <Card className="p-4">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">معدل التحول</p>
                    <p className="text-xl font-bold text-purple-600">{stats.conversionRate}%</p>
                  </div>
                </Card>
                <Card className="p-4">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">موافقات معلقة</p>
                    <p className="text-xl font-bold text-orange-600">{stats.pendingApprovals}</p>
                  </div>
                </Card>
                <Card className="p-4">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">صحة النظام</p>
                    <p className="text-xl font-bold text-green-600">{stats.systemHealth}%</p>
                  </div>
                </Card>
              </div>

              {/* Alerts and Notifications */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Activity className="h-5 w-5" />
                        نشاط النظام في الوقت الفعلي
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                          <div className="flex items-center gap-3">
                            <CheckCircle className="h-5 w-5 text-green-600" />
                            <span className="text-sm">تم إنجاز 156 طلب بنجاح</span>
                          </div>
                          <span className="text-xs text-muted-foreground">منذ 5 دقائق</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                          <div className="flex items-center gap-3">
                            <Users className="h-5 w-5 text-blue-600" />
                            <span className="text-sm">انضم 12 تاجر جديد للمنصة</span>
                          </div>
                          <span className="text-xs text-muted-foreground">منذ 15 دقيقة</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                          <div className="flex items-center gap-3">
                            <DollarSign className="h-5 w-5 text-purple-600" />
                            <span className="text-sm">تم تحصيل 45,230 دينار اليوم</span>
                          </div>
                          <span className="text-xs text-muted-foreground">منذ 30 دقيقة</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5" />
                      التنبيهات والمشكلات
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {alerts.slice(0, 3).map((alert) => (
                        <AlertCard key={alert.id} alert={alert} />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Charts and Analytics Preview */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>المبيعات الشهرية</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 dark:from-slate-800 dark:to-slate-700 rounded-lg">
                      <div className="text-center">
                        <BarChart3 className="h-12 w-12 text-blue-500 mx-auto mb-2" />
                        <p className="text-sm text-muted-foreground">مخطط المبيعات التفاعلي</p>
                        <p className="text-xs text-muted-foreground mt-1">سيتم عرضه هنا قريباً</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>توزيع المتاجر حسب الفئات</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50 dark:from-slate-800 dark:to-slate-700 rounded-lg">
                      <div className="text-center">
                        <PieChart className="h-12 w-12 text-green-500 mx-auto mb-2" />
                        <p className="text-sm text-muted-foreground">مخطط التوزيع التفاعلي</p>
                        <p className="text-xs text-muted-foreground mt-1">سيتم عرضه هنا قريباً</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {activeTab === 'merchants' && <MerchantManagement />}
          {activeTab === 'customers' && (
            <Card>
              <CardHeader>
                <CardTitle>إدارة العملاء</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <UserCheck className="h-16 w-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">نظام إدارة العملاء</h3>
                  <p className="text-muted-foreground">سيتم تطوير هذا القسم قريباً مع نظام CRM المتقدم</p>
                </div>
              </CardContent>
            </Card>
          )}
          {activeTab === 'orders' && (
            <Card>
              <CardHeader>
                <CardTitle>إدارة الطلبات</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <ShoppingCart className="h-16 w-16 text-purple-500 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">نظام إدارة الطلبات</h3>
                  <p className="text-muted-foreground">سيتم تطوير هذا القسم قريباً مع تتبع الطلبات المتقدم</p>
                </div>
              </CardContent>
            </Card>
          )}
          {activeTab === 'inventory' && <InventoryManagement />}
          {activeTab === 'financial' && <FinancialDashboard />}
          {activeTab === 'analytics' && <AnalyticsDashboard />}
          {activeTab === 'integrations' && (
            <Card>
              <CardHeader>
                <CardTitle>التكامل مع الجهات الحكومية</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Building className="h-16 w-16 text-purple-500 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">نظام التكامل الحكومي</h3>
                  <p className="text-muted-foreground">سيتم تطوير هذا القسم قريباً مع التكامل مع مصرف ليبيا المركزي ووزارة المالية</p>
                </div>
              </CardContent>
            </Card>
          )}
          {activeTab === 'security' && (
            <Card>
              <CardHeader>
                <CardTitle>الأمان والحماية</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Shield className="h-16 w-16 text-red-500 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">نظام الأمان المتقدم</h3>
                  <p className="text-muted-foreground">سيتم تطوير هذا القسم قريباً مع أنظمة الحماية المتقدمة</p>
                </div>
              </CardContent>
            </Card>
          )}
          {activeTab === 'support' && (
            <Card>
              <CardHeader>
                <CardTitle>الدعم الفني</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Headphones className="h-16 w-16 text-blue-500 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">نظام الدعم الفني</h3>
                  <p className="text-muted-foreground">سيتم تطوير هذا القسم قريباً مع نظام التذاكر المتقدم</p>
                </div>
              </CardContent>
            </Card>
          )}
          {activeTab === 'settings' && (
            <Card>
              <CardHeader>
                <CardTitle>إعدادات النظام</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Settings className="h-16 w-16 text-slate-500 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">إعدادات النظام</h3>
                  <p className="text-muted-foreground">سيتم تطوير هذا القسم قريباً مع إعدادات شاملة</p>
                </div>
              </CardContent>
            </Card>
          )}
        </main>
      </div>

      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6">
        <Button
          size="lg"
          className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <Plus className="h-6 w-6" />
        </Button>
      </div>
    </div>
  );
};

export default AdminPortal;