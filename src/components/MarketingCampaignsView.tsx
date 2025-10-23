import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  Save,
  X,
  Send,
  MessageSquare,
  Mail,
  Phone,
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  Info,
  Target,
  Users,
  DollarSign,
  TrendingUp,
  BarChart3,
  PieChart,
  Activity,
  Settings,
  Eye,
  EyeOff,
  Copy,
  MoreVertical,
  Download,
  Smartphone,
  Monitor,
  Globe,
  Zap,
  Lightbulb,
  Bell,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { Checkbox } from './ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

interface MarketingCampaign {
  id: string;
  name: string;
  type: 'email' | 'sms' | 'whatsapp' | 'social' | 'push';
  status: 'draft' | 'scheduled' | 'active' | 'completed' | 'paused' | 'cancelled';
  targetAudience: string;
  targetCount: number;
  sentCount: number;
  openRate?: number;
  clickRate?: number;
  conversionRate?: number;
  budget: number;
  spent: number;
  startDate: string;
  endDate?: string;
  createdAt: string;
  description: string;
  content: {
    subject?: string;
    message: string;
    image?: string;
    callToAction?: string;
    landingPage?: string;
  };
  channels: string[];
  tags: string[];
}

interface MarketingCampaignsViewProps {
  storeData: any;
  setStoreData: (data: any) => void;
  onSave: () => void;
}

const MarketingCampaignsView: React.FC<MarketingCampaignsViewProps> = ({ storeData, setStoreData, onSave }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [showCampaignModal, setShowCampaignModal] = useState(false);
  const [editingCampaign, setEditingCampaign] = useState<MarketingCampaign | null>(null);
  const [isWhatsAppEnabled, setIsWhatsAppEnabled] = useState(false);

  // Form state
  const [campaignForm, setCampaignForm] = useState({
    name: '',
    description: '',
    startDate: '',
    endDate: '',
    offerType: 'percentage' as 'percentage' | 'fixed_amount' | 'free_product',
    discountPercentage: 0,
    fixedAmount: 0,
    location: 'online_store' as 'online_store' | 'pos' | 'both',
    buyType: 'products' as 'products' | 'categories' | 'all_products',
    getType: 'products' as 'products' | 'categories' | 'all_products',
    excludeDiscounted: false,
    maxUses: 0,
    content: {
      subject: '',
      message: '',
      image: '',
      callToAction: '',
      landingPage: '',
    },
    channels: [] as string[],
    tags: [] as string[],
  });

  // Sample campaigns data
  const campaigns: MarketingCampaign[] = [
    {
      id: '1',
      name: 'تخفيضات موسمية',
      type: 'whatsapp',
      status: 'active',
      targetAudience: 'عملاء نشطين',
      targetCount: 300,
      sentCount: 285,
      openRate: 85,
      clickRate: 12,
      conversionRate: 3,
      budget: 500,
      spent: 350,
      startDate: '2024-09-20',
      createdAt: '2024-09-15',
      description: 'حملة ترويجية للمنتجات الموسمية',
      content: {
        subject: 'تخفيضات تصل إلى 50% على المنتجات الموسمية! 🛍️',
        message: 'عزيزي العميل، لدينا تخفيضات تصل إلى 50% على جميع المنتجات الموسمية. لا تفوت الفرصة!',
        callToAction: 'تسوق الآن',
        landingPage: '/seasonal-sale',
      },
      channels: ['whatsapp'],
      tags: ['موسمي', 'تخفيضات', 'نشط'],
    },
    {
      id: '2',
      name: 'تخفيضات رمضانية',
      type: 'sms',
      status: 'completed',
      targetAudience: 'جميع العملاء',
      targetCount: 500,
      sentCount: 500,
      openRate: 92,
      clickRate: 8,
      conversionRate: 5,
      budget: 300,
      spent: 300,
      startDate: '2024-03-20',
      endDate: '2024-03-25',
      createdAt: '2024-03-15',
      description: 'حملة رمضانية خاصة',
      content: {
        message: 'رمضان كريم! خصم 20% على جميع المنتجات بمناسبة الشهر الفضيل',
      },
      channels: ['sms'],
      tags: ['رمضان', 'ديني', 'مكتمل'],
    },
    {
      id: '3',
      name: 'مع أسعارنا كمل نص دينك',
      type: 'email',
      status: 'paused',
      targetAudience: 'عملاء متزوجين',
      targetCount: 700,
      sentCount: 450,
      openRate: 45,
      clickRate: 5,
      conversionRate: 1,
      budget: 800,
      spent: 200,
      startDate: '2024-08-10',
      createdAt: '2024-08-05',
      description: 'حملة موجهة للعملاء المتزوجين',
      content: {
        subject: 'عروض خاصة للعائلات - خصم يصل إلى 30%',
        message: 'عزيزي العميل، لدينا عروض خاصة للعائلات مع خصم يصل إلى 30% على المنتجات المختارة',
        callToAction: 'اكتشف العروض',
        landingPage: '/family-offers',
      },
      channels: ['email', 'sms'],
      tags: ['عائلي', 'متوقف', 'متزوجين'],
    },
  ];

  const filteredCampaigns = campaigns.filter(campaign => {
    const matchesSearch =
      campaign.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      campaign.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      campaign.targetAudience.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || campaign.status === statusFilter;
    const matchesType = typeFilter === 'all' || campaign.type === typeFilter;

    return matchesSearch && matchesStatus && matchesType;
  });

  const handleAddCampaign = () => {
    setEditingCampaign(null);
    setCampaignForm({
      name: '',
      description: '',
      startDate: '',
      endDate: '',
      offerType: 'percentage',
      discountPercentage: 0,
      fixedAmount: 0,
      location: 'online_store',
      buyType: 'products',
      getType: 'products',
      excludeDiscounted: false,
      maxUses: 0,
      content: {
        subject: '',
        message: '',
        image: '',
        callToAction: '',
        landingPage: '',
      },
      channels: [],
      tags: [],
    });
    setShowCampaignModal(true);
  };

  const handleEditCampaign = (campaign: MarketingCampaign) => {
    setEditingCampaign(campaign);
    setCampaignForm({
      name: campaign.name,
      description: campaign.description,
      startDate: campaign.startDate,
      endDate: campaign.endDate || '',
      offerType: 'percentage',
      discountPercentage: 0,
      fixedAmount: 0,
      location: 'online_store',
      buyType: 'products',
      getType: 'products',
      excludeDiscounted: false,
      maxUses: 0,
      content: {
        subject: campaign.content.subject || '',
        message: campaign.content.message,
        image: campaign.content.image || '',
        callToAction: campaign.content.callToAction || '',
        landingPage: campaign.content.landingPage || '',
      },
      channels: campaign.channels,
      tags: campaign.tags,
    });
    setShowCampaignModal(true);
  };

  const handleSaveCampaign = () => {
    if (!storeData) return;

    const newCampaign: MarketingCampaign = {
      id: editingCampaign ? editingCampaign.id : Date.now().toString(),
      name: campaignForm.name,
      type: 'email',
      status: 'draft',
      targetAudience: 'عملاء متجر إشرو',
      targetCount: 0,
      sentCount: 0,
      budget: 0,
      spent: 0,
      startDate: campaignForm.startDate,
      endDate: campaignForm.endDate,
      createdAt: editingCampaign ? editingCampaign.createdAt : new Date().toISOString().split('T')[0]!,
      description: campaignForm.description,
      content: campaignForm.content,
      channels: campaignForm.channels,
      tags: campaignForm.tags,
    };

    if (editingCampaign) {
      // Edit existing campaign
      const updatedCampaigns = campaigns.map(c => c.id === editingCampaign.id ? newCampaign : c);
      setStoreData({
        ...storeData,
        marketingCampaigns: updatedCampaigns,
      });
    } else {
      // Add new campaign
      const updatedCampaigns = [...campaigns, newCampaign];
      setStoreData({
        ...storeData,
        marketingCampaigns: updatedCampaigns,
      });
    }

    setShowCampaignModal(false);
    onSave();
  };

  const handleDeleteCampaign = (campaignId: string) => {
    const updatedCampaigns = campaigns.filter(c => c.id !== campaignId);
    setStoreData({
      ...storeData,
      marketingCampaigns: updatedCampaigns,
    });
    onSave();
  };

  const getStatusBadge = (status: MarketingCampaign['status']) => {
    const statusConfig = {
      draft: { label: 'مسودة', color: 'bg-gray-100 text-gray-800' },
      scheduled: { label: 'مجدول', color: 'bg-blue-100 text-blue-800' },
      active: { label: 'نشط', color: 'bg-green-100 text-green-800' },
      completed: { label: 'مكتمل', color: 'bg-purple-100 text-purple-800' },
      paused: { label: 'متوقف', color: 'bg-yellow-100 text-yellow-800' },
      cancelled: { label: 'ملغي', color: 'bg-red-100 text-red-800' },
    };

    const config = statusConfig[status];
    return <Badge className={config.color}>{config.label}</Badge>;
  };

  const getTypeBadge = (type: MarketingCampaign['type']) => {
    const typeConfig = {
      email: { label: 'بريد إلكتروني', color: 'bg-blue-100 text-blue-800', icon: <Mail className="h-3 w-3" /> },
      sms: { label: 'رسائل نصية', color: 'bg-green-100 text-green-800', icon: <MessageSquare className="h-3 w-3" /> },
      whatsapp: { label: 'واتساب', color: 'bg-purple-100 text-purple-800', icon: <MessageSquare className="h-3 w-3" /> },
      social: { label: 'وسائل التواصل', color: 'bg-pink-100 text-pink-800', icon: <Globe className="h-3 w-3" /> },
      push: { label: 'إشعارات', color: 'bg-orange-100 text-orange-800', icon: <Bell className="h-3 w-3" /> },
    };

    const config = typeConfig[type];
    return (
      <Badge className={`${config.color} flex items-center gap-1`}>
        {config.icon}
        {config.label}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">الحملات التسويقية</h2>
          <p className="text-gray-600 mt-1">قم بتفعيل ميزة الواتساب لإطلاق حملات مستهدفة، وإعادة التواصل مع العملاء، وتحقيق المزيد من التحويلات</p>
        </div>
        <div className="flex gap-3">
          <Button
            onClick={() => setIsWhatsAppEnabled(!isWhatsAppEnabled)}
            variant={isWhatsAppEnabled ? "default" : "outline"}
            className="bg-green-500 hover:bg-green-600 text-white"
          >
            <MessageSquare className="h-4 w-4 ml-2" />
            تفعيل ميزة الواتساب
          </Button>
          <Button
            onClick={handleAddCampaign}
            className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
          >
            <Plus className="h-4 w-4 ml-2" />
            إنشاء حملة جديدة
          </Button>
        </div>
      </div>

      {/* WhatsApp Activation Card */}
      {!isWhatsAppEnabled && (
        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <MessageSquare className="h-6 w-6 text-green-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-green-900">تفعيل ميزة الواتساب</h3>
                <p className="text-sm text-green-700">قم بتفعيل الواتساب لإرسال الحملات التسويقية</p>
              </div>
              <Button
                onClick={() => setIsWhatsAppEnabled(true)}
                className="bg-green-500 hover:bg-green-600 text-white"
              >
                تفعيل الآن
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">الرصيد الحالي لرسائل SMS</p>
                <p className="text-3xl font-bold text-gray-900">لا يوجد رسائل</p>
              </div>
              <MessageSquare className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">رصيد نقاط الواتساب</p>
                <p className="text-3xl font-bold text-gray-900">غير متوفر</p>
              </div>
              <MessageSquare className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">الحملات النشطة</p>
                <p className="text-3xl font-bold text-green-600">{campaigns.filter(c => c.status === 'active').length}</p>
              </div>
              <Activity className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">معدل التحويل</p>
                <p className="text-3xl font-bold text-purple-600">
                  {campaigns.length > 0 ? ((campaigns.reduce((sum, c) => sum + (c.conversionRate || 0), 0) / campaigns.length)).toFixed(1) : '0'}%
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* SMS Balance Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            شحن الرصيد
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label>اختيار قائمة</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="اختر شركة الاتصالات" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="libyana">ليبيانا</SelectItem>
                  <SelectItem value="almadar">المدار الجديد</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-center">
                <p className="text-sm text-gray-600">الرصيد الحالي</p>
                <p className="text-2xl font-bold text-gray-900">0 رسالة</p>
              </div>
              <Button className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600">
                شحن الرصيد
              </Button>
            </div>
          </div>
          <p className="text-sm text-gray-600 mt-4">
            لا يمكن شحن الرصيد إلا بعد التكامل التام مع شركات الاتصالات والتقنية
          </p>
        </CardContent>
      </Card>

      {/* Campaigns List */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>قائمة الحملات التسويقية</CardTitle>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="البحث في الحملات..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="حالة الحملة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع الحالات</SelectItem>
                  <SelectItem value="active">نشط</SelectItem>
                  <SelectItem value="draft">مسودة</SelectItem>
                  <SelectItem value="completed">مكتمل</SelectItem>
                  <SelectItem value="paused">متوقف</SelectItem>
                </SelectContent>
              </Select>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="نوع الحملة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع الأنواع</SelectItem>
                  <SelectItem value="email">بريد إلكتروني</SelectItem>
                  <SelectItem value="sms">رسائل نصية</SelectItem>
                  <SelectItem value="whatsapp">واتساب</SelectItem>
                  <SelectItem value="social">وسائل التواصل</SelectItem>
                </SelectContent>
              </Select>
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
                  <th className="text-right p-3 font-semibold">عنوان الحملة</th>
                  <th className="text-right p-3 font-semibold">الهدف</th>
                  <th className="text-right p-3 font-semibold">عدد المستلمين</th>
                  <th className="text-right p-3 font-semibold">القناة</th>
                  <th className="text-right p-3 font-semibold">الحالة</th>
                  <th className="text-right p-3 font-semibold">تاريخ الإنشاء</th>
                  <th className="text-right p-3 font-semibold">الإجراءات</th>
                </tr>
              </thead>
              <tbody>
                {filteredCampaigns.map((campaign) => (
                  <tr key={campaign.id} className="border-b hover:bg-gray-50">
                    <td className="p-3">
                      <div>
                        <p className="font-semibold">{campaign.name}</p>
                        <p className="text-sm text-gray-600">{campaign.description}</p>
                      </div>
                    </td>
                    <td className="p-3">
                      <p className="font-medium">{campaign.targetAudience}</p>
                    </td>
                    <td className="p-3">
                      <div className="text-center">
                        <p className="font-semibold">{campaign.targetCount}</p>
                        <p className="text-sm text-gray-600">{campaign.sentCount} مرسل</p>
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="flex gap-1">
                        {campaign.channels.map((channel) => (
                          <div key={channel}>
                            {getTypeBadge(channel as MarketingCampaign['type'])}
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="p-3">
                      {getStatusBadge(campaign.status)}
                    </td>
                    <td className="p-3">
                      <p className="text-sm">{new Date(campaign.createdAt).toLocaleDateString('ar')}</p>
                      <p className="text-xs text-gray-600">{new Date(campaign.createdAt).toLocaleTimeString('ar')}</p>
                    </td>
                    <td className="p-3">
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleEditCampaign(campaign)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteCampaign(campaign.id)}
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

          {filteredCampaigns.length === 0 && (
            <div className="text-center py-8">
              <Target className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">لا توجد حملات تسويقية تطابق معايير البحث</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Add/Edit Campaign Modal */}
      <AnimatePresence>
        {showCampaignModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={() => setShowCampaignModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-6 w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">
                  {editingCampaign ? 'تعديل الحملة' : 'إنشاء حملة تسويقية جديدة'}
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowCampaignModal(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <Tabs defaultValue="basic" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="basic">المعلومات الأساسية</TabsTrigger>
                  <TabsTrigger value="content">المحتوى</TabsTrigger>
                  <TabsTrigger value="targeting">الاستهداف</TabsTrigger>
                  <TabsTrigger value="schedule">الجدولة</TabsTrigger>
                </TabsList>

                <TabsContent value="basic" className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label>اسم حملة التسويقية</Label>
                      <Input
                        value={campaignForm.name}
                        onChange={(e) => setCampaignForm({ ...campaignForm, name: e.target.value })}
                        placeholder="أدخل اسم الحملة"
                      />
                    </div>

                    <div>
                      <Label>نوع العرض</Label>
                      <Select value={campaignForm.offerType} onValueChange={(value) => setCampaignForm({ ...campaignForm, offerType: value as any })}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="percentage">خصم %</SelectItem>
                          <SelectItem value="fixed_amount">مبلغ من المجموع</SelectItem>
                          <SelectItem value="free_product">منتج مجاني</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="md:col-span-2">
                      <Label>وصف حملة التسويقية</Label>
                      <Textarea
                        value={campaignForm.description}
                        onChange={(e) => setCampaignForm({ ...campaignForm, description: e.target.value })}
                        placeholder="وصف مختصر للحملة"
                        rows={3}
                      />
                    </div>

                    {campaignForm.offerType === 'percentage' && (
                      <div>
                        <Label>مربع يكتب فيه النسبة المئوية</Label>
                        <Input
                          type="number"
                          value={campaignForm.discountPercentage}
                          onChange={(e) => setCampaignForm({ ...campaignForm, discountPercentage: Number(e.target.value) })}
                          placeholder="0"
                        />
                      </div>
                    )}

                    {campaignForm.offerType === 'fixed_amount' && (
                      <div>
                        <Label>مبلغ الخصم</Label>
                        <Input
                          type="number"
                          value={campaignForm.fixedAmount}
                          onChange={(e) => setCampaignForm({ ...campaignForm, fixedAmount: Number(e.target.value) })}
                          placeholder="0"
                        />
                      </div>
                    )}

                    <div>
                      <Label>موقع الحزمة التسويقية</Label>
                      <Select value={campaignForm.location} onValueChange={(value) => setCampaignForm({ ...campaignForm, location: value as any })}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="online_store">المتجر الإلكتروني</SelectItem>
                          <SelectItem value="pos">محاسب/كاشير نقطة البيع</SelectItem>
                          <SelectItem value="both">الكل</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="content" className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label>عنوان الرسالة</Label>
                      <Input
                        value={campaignForm.content.subject}
                        onChange={(e) => setCampaignForm({
                          ...campaignForm,
                          content: { ...campaignForm.content, subject: e.target.value }
                        })}
                        placeholder="عنوان الرسالة"
                      />
                    </div>

                    <div>
                      <Label>دعوة للعمل</Label>
                      <Input
                        value={campaignForm.content.callToAction}
                        onChange={(e) => setCampaignForm({
                          ...campaignForm,
                          content: { ...campaignForm.content, callToAction: e.target.value }
                        })}
                        placeholder="مثال: تسوق الآن"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <Label>نص الرسالة</Label>
                      <Textarea
                        value={campaignForm.content.message}
                        onChange={(e) => setCampaignForm({
                          ...campaignForm,
                          content: { ...campaignForm.content, message: e.target.value }
                        })}
                        placeholder="نص الرسالة التسويقية"
                        rows={4}
                      />
                    </div>

                    <div>
                      <Label>رابط الصفحة المقصودة</Label>
                      <Input
                        value={campaignForm.content.landingPage}
                        onChange={(e) => setCampaignForm({
                          ...campaignForm,
                          content: { ...campaignForm.content, landingPage: e.target.value }
                        })}
                        placeholder="/offers"
                      />
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="targeting" className="space-y-6">
                  <div className="space-y-6">
                    <div>
                      <Label>خيارات الحزم التسويقية</Label>
                      <div className="p-4 bg-blue-50 rounded-lg">
                        <p className="text-sm text-blue-800 mb-4">
                          في حالة تكرار المنتج الذي يشتريه العميل في أكثر من عرض وكانت طريقة الحصول على العرض يدوية سيتم تطبيق العرض على المنتج المضاف أولا إلى سلة المشتريات
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <Label className="text-base font-semibold">عند شراء العميل لـ</Label>
                            <Select value={campaignForm.buyType} onValueChange={(value) => setCampaignForm({ ...campaignForm, buyType: value as any })}>
                              <SelectTrigger className="mt-2">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="products">المنتجات</SelectItem>
                                <SelectItem value="categories">التصنيفات</SelectItem>
                                <SelectItem value="all_products">كل المنتجات</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div>
                            <Label className="text-base font-semibold">سيحصل مجاناً على</Label>
                            <Select value={campaignForm.getType} onValueChange={(value) => setCampaignForm({ ...campaignForm, getType: value as any })}>
                              <SelectTrigger className="mt-2">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="products">المنتجات</SelectItem>
                                <SelectItem value="categories">التصنيفات</SelectItem>
                                <SelectItem value="all_products">كل المنتجات</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div className="mt-4">
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="excludeDiscounted"
                              checked={campaignForm.excludeDiscounted}
                              onCheckedChange={(checked) => setCampaignForm({ ...campaignForm, excludeDiscounted: checked as boolean })}
                            />
                            <Label htmlFor="excludeDiscounted">استبعاد المنتجات المخفّضة</Label>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <Label>قنوات التوزيع</Label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {[
                          { key: 'email', label: 'بريد إلكتروني', icon: <Mail className="h-4 w-4" /> },
                          { key: 'sms', label: 'رسائل نصية', icon: <MessageSquare className="h-4 w-4" /> },
                          { key: 'whatsapp', label: 'واتساب', icon: <MessageSquare className="h-4 w-4" /> },
                        ].map((channel) => (
                          <div key={channel.key} className="flex items-center space-x-2 p-3 border rounded-lg">
                            <Checkbox
                              checked={campaignForm.channels.includes(channel.key)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  setCampaignForm({
                                    ...campaignForm,
                                    channels: [...campaignForm.channels, channel.key]
                                  });
                                } else {
                                  setCampaignForm({
                                    ...campaignForm,
                                    channels: campaignForm.channels.filter(c => c !== channel.key)
                                  });
                                }
                              }}
                            />
                            <div className="flex items-center gap-2">
                              {channel.icon}
                              <Label className="text-sm">{channel.label}</Label>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <Label>عدد الحزم التسويقية التي تريد إنشاءها</Label>
                      <Input
                        type="number"
                        value={campaignForm.maxUses}
                        onChange={(e) => setCampaignForm({ ...campaignForm, maxUses: Number(e.target.value) })}
                        placeholder="إذا لم تحدد عدداً معيناً للحزم التسويقية ، ستستمر الحزم التسويقية في الظهور حتى نفاد المنتجات أو انتهاء صلاحية الباقة (اختياري)"
                      />
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="schedule" className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label>تاريخ البدء</Label>
                      <Input
                        type="datetime-local"
                        value={campaignForm.startDate}
                        onChange={(e) => setCampaignForm({ ...campaignForm, startDate: e.target.value })}
                      />
                    </div>

                    <div>
                      <Label>تاريخ الانتهاء (اختياري)</Label>
                      <Input
                        type="datetime-local"
                        value={campaignForm.endDate}
                        onChange={(e) => setCampaignForm({ ...campaignForm, endDate: e.target.value })}
                      />
                    </div>
                  </div>
                </TabsContent>
              </Tabs>

              <div className="flex justify-end mt-6">
                <Button
                  onClick={handleSaveCampaign}
                  className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                  disabled={!campaignForm.name.trim()}
                >
                  <Save className="h-4 w-4 ml-2" />
                  {editingCampaign ? 'حفظ التغييرات' : 'إنشاء الحملة'}
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export { MarketingCampaignsView };
