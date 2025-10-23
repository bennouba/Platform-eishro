import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Save,
  X,
  Type,
  Calendar,
  Hash,
  Image as ImageIcon,
  Grid,
  Settings,
  Eye,
  EyeOff,
  Copy,
  MoreVertical,
  ChevronDown,
  CheckCircle,
  AlertCircle,
  Info,
  FileText,
  Database,
  ToggleLeft,
  ToggleRight,
  Layers,
  User,
  Tag as TagIcon,
  Building,
  Globe,
  Palette,
  Package,
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

interface CustomField {
  id: string;
  nameAr: string;
  nameEn: string;
  type: 'text' | 'textarea' | 'date' | 'number' | 'image' | 'table' | 'select' | 'checkbox' | 'radio';
  isRequired: boolean;
  isActive: boolean;
  showInProductPage: boolean;
  showInAdminPanel: boolean;
  categoryType: 'products' | 'categories' | 'both';
  defaultValue?: string;
  options?: string[];
  validation?: {
    minLength?: number;
    maxLength?: number;
    pattern?: string;
  };
  sortOrder: number;
  createdAt: string;
}

interface CustomFieldsViewProps {
  storeData: any;
  setStoreData: (data: any) => void;
  onSave: () => void;
}

const CustomFieldsView: React.FC<CustomFieldsViewProps> = ({ storeData, setStoreData, onSave }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFieldModal, setShowFieldModal] = useState(false);
  const [editingField, setEditingField] = useState<CustomField | null>(null);
  const [activeTab, setActiveTab] = useState('basic');
  const [serviceEnabled, setServiceEnabled] = useState(true);

  // Form state
  const [fieldForm, setFieldForm] = useState({
    nameAr: '',
    nameEn: '',
    type: 'text' as CustomField['type'],
    isRequired: false,
    isActive: true,
    showInProductPage: true,
    showInAdminPanel: true,
    categoryType: 'products' as CustomField['categoryType'],
    defaultValue: '',
    options: [] as string[],
    validation: {
      minLength: 0,
      maxLength: 0,
      pattern: '',
    },
    sortOrder: 1,
  });

  const [optionForm, setOptionForm] = useState('');

  // Sample custom fields data
  const customFields: CustomField[] = [
    {
      id: '1',
      nameAr: 'المواصفات الفنية',
      nameEn: 'Technical Specifications',
      type: 'textarea',
      isRequired: false,
      isActive: true,
      showInProductPage: true,
      showInAdminPanel: true,
      categoryType: 'products',
      defaultValue: '',
      sortOrder: 1,
      createdAt: '2024-01-15',
    },
    {
      id: '2',
      nameAr: 'تاريخ الإنتاج',
      nameEn: 'Production Date',
      type: 'date',
      isRequired: false,
      isActive: true,
      showInProductPage: false,
      showInAdminPanel: true,
      categoryType: 'products',
      sortOrder: 2,
      createdAt: '2024-01-16',
    },
    {
      id: '3',
      nameAr: 'الوزن الصافي',
      nameEn: 'Net Weight',
      type: 'number',
      isRequired: true,
      isActive: true,
      showInProductPage: true,
      showInAdminPanel: true,
      categoryType: 'products',
      sortOrder: 3,
      createdAt: '2024-01-17',
    },
    {
      id: '4',
      nameAr: 'صور إضافية',
      nameEn: 'Additional Images',
      type: 'image',
      isRequired: false,
      isActive: true,
      showInProductPage: true,
      showInAdminPanel: true,
      categoryType: 'products',
      sortOrder: 4,
      createdAt: '2024-01-18',
    },
  ];

  const filteredFields = customFields.filter(field =>
    field.nameAr.toLowerCase().includes(searchTerm.toLowerCase()) ||
    field.nameEn.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddField = () => {
    setEditingField(null);
    setFieldForm({
      nameAr: '',
      nameEn: '',
      type: 'text',
      isRequired: false,
      isActive: true,
      showInProductPage: true,
      showInAdminPanel: true,
      categoryType: 'products',
      defaultValue: '',
      options: [],
      validation: {
        minLength: 0,
        maxLength: 0,
        pattern: '',
      },
      sortOrder: customFields.length + 1,
    });
    setShowFieldModal(true);
    setActiveTab('basic');
  };

  const handleEditField = (field: CustomField) => {
    setEditingField(field);
    setFieldForm({
      nameAr: field.nameAr,
      nameEn: field.nameEn,
      type: field.type,
      isRequired: field.isRequired,
      isActive: field.isActive,
      showInProductPage: field.showInProductPage,
      showInAdminPanel: field.showInAdminPanel,
      categoryType: field.categoryType,
      defaultValue: field.defaultValue || '',
      options: field.options || [],
      validation: {
        minLength: field.validation?.minLength || 0,
        maxLength: field.validation?.maxLength || 0,
        pattern: field.validation?.pattern || '',
      },
      sortOrder: field.sortOrder,
    });
    setShowFieldModal(true);
    setActiveTab('basic');
  };

  const handleSaveField = () => {
    if (!storeData) return;

    const newField: CustomField = {
      id: editingField ? editingField.id : Date.now().toString(),
      nameAr: fieldForm.nameAr,
      nameEn: fieldForm.nameEn,
      type: fieldForm.type,
      isRequired: fieldForm.isRequired,
      isActive: fieldForm.isActive,
      showInProductPage: fieldForm.showInProductPage,
      showInAdminPanel: fieldForm.showInAdminPanel,
      categoryType: fieldForm.categoryType,
      defaultValue: fieldForm.defaultValue,
      options: fieldForm.options,
      validation: fieldForm.validation,
      sortOrder: fieldForm.sortOrder,
      createdAt: editingField ? editingField.createdAt : new Date().toISOString().split('T')[0] || new Date().toISOString().split('T')[0],
    };

    if (editingField) {
      // Edit existing field
      const updatedFields = customFields.map(f => f.id === editingField.id ? newField : f);
      setStoreData({
        ...storeData,
        customFields: updatedFields,
      });
    } else {
      // Add new field
      const updatedFields = [...customFields, newField];
      setStoreData({
        ...storeData,
        customFields: updatedFields,
      });
    }

    setShowFieldModal(false);
    onSave();
  };

  const handleDeleteField = (fieldId: string) => {
    const updatedFields = customFields.filter(f => f.id !== fieldId);
    setStoreData({
      ...storeData,
      customFields: updatedFields,
    });
    onSave();
  };

  const handleAddOption = () => {
    if (!optionForm.trim()) return;

    setFieldForm({
      ...fieldForm,
      options: [...fieldForm.options, optionForm.trim()],
    });
    setOptionForm('');
  };

  const handleDeleteOption = (optionIndex: number) => {
    setFieldForm({
      ...fieldForm,
      options: fieldForm.options.filter((_, index) => index !== optionIndex),
    });
  };

  const getTypeBadge = (type: CustomField['type']) => {
    const typeConfig = {
      text: { label: 'نص عادي قصير', color: 'bg-blue-100 text-blue-800', icon: <Type className="h-3 w-3" /> },
      textarea: { label: 'نص منسق', color: 'bg-green-100 text-green-800', icon: <FileText className="h-3 w-3" /> },
      date: { label: 'تاريخ', color: 'bg-purple-100 text-purple-800', icon: <Calendar className="h-3 w-3" /> },
      number: { label: 'رقم', color: 'bg-orange-100 text-orange-800', icon: <Hash className="h-3 w-3" /> },
      image: { label: 'صورة', color: 'bg-pink-100 text-pink-800', icon: <ImageIcon className="h-3 w-3" /> },
      table: { label: 'جدول', color: 'bg-indigo-100 text-indigo-800', icon: <Grid className="h-3 w-3" /> },
      select: { label: 'قائمة اختيار', color: 'bg-teal-100 text-teal-800', icon: <Layers className="h-3 w-3" /> },
      checkbox: { label: 'مربع اختيار', color: 'bg-cyan-100 text-cyan-800', icon: <CheckCircle className="h-3 w-3" /> },
      radio: { label: 'اختيار واحد', color: 'bg-yellow-100 text-yellow-800', icon: <Settings className="h-3 w-3" /> },
    };

    const config = typeConfig[type] || { label: type, color: 'bg-gray-100 text-gray-800', icon: <Info className="h-3 w-3" /> };
    return (
      <Badge className={`${config.color} flex items-center gap-1`}>
        {config.icon}
        {config.label}
      </Badge>
    );
  };

  const getCategoryTypeBadge = (categoryType: CustomField['categoryType']) => {
    const categoryConfig = {
      products: { label: 'المنتجات', color: 'bg-green-100 text-green-800' },
      categories: { label: 'التصنيفات', color: 'bg-blue-100 text-blue-800' },
      both: { label: 'الكل', color: 'bg-purple-100 text-purple-800' },
    };

    const config = categoryConfig[categoryType];
    return <Badge className={config.color}>{config.label}</Badge>;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">الحقول المخصصة</h2>
          <p className="text-gray-600 mt-1">إضافة بيانات مخصصة لمنتجاتك وتصنيفاتك</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">تعطيل الخدمة</span>
            <Button
              variant={serviceEnabled ? "default" : "outline"}
              size="sm"
              onClick={() => setServiceEnabled(!serviceEnabled)}
            >
              {serviceEnabled ? <ToggleRight className="h-4 w-4" /> : <ToggleLeft className="h-4 w-4" />}
            </Button>
          </div>
          <Button
            onClick={handleAddField}
            className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
          >
            <Plus className="h-4 w-4 ml-2" />
            إنشاء حقل جديد
          </Button>
        </div>
      </div>

      {/* Language Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            إعداد لغات متعددة
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Badge className="bg-green-100 text-green-800">العربية</Badge>
              <span className="text-sm text-gray-600">اللغة الافتراضية</span>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Plus className="h-4 w-4 ml-2" />
                إضافة لغة
              </Button>
              <Button variant="outline" size="sm">
                إدارة اللغات
              </Button>
            </div>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            يستخدم متجرك اللغة العربية بشكل افتراضي، ولكن يمكنك إضافة وتعديل لغات متعددة في أي وقت
          </p>
        </CardContent>
      </Card>

      {/* Category Type Tabs */}
      <Card>
        <CardHeader>
          <CardTitle>اختيار نوع التصنيف</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="products" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="products" className="flex items-center gap-2">
                <Package className="h-4 w-4" />
                المنتجات
              </TabsTrigger>
              <TabsTrigger value="categories" className="flex items-center gap-2">
                <TagIcon className="h-4 w-4" />
                التصنيفات
              </TabsTrigger>
              <TabsTrigger value="advanced" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                التصنيفات الإضافية
              </TabsTrigger>
            </TabsList>

            <TabsContent value="products" className="mt-6">
              <div className="text-center py-8">
                <Package className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">حقول مخصصة للمنتجات</h3>
                <p className="text-gray-600">إدارة الحقول المخصصة الخاصة بالمنتجات</p>
              </div>
            </TabsContent>

            <TabsContent value="categories" className="mt-6">
              <div className="text-center py-8">
                <TagIcon className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">حقول مخصصة للتصنيفات</h3>
                <p className="text-gray-600">إدارة الحقول المخصصة الخاصة بالتصنيفات</p>
              </div>
            </TabsContent>

            <TabsContent value="advanced" className="mt-6">
              <div className="text-center py-8">
                <Settings className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">حقول إضافية متقدمة</h3>
                <p className="text-gray-600">حقول مخصصة متقدمة للاستخدامات الخاصة</p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Existing Fields */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>الحقول المخصصة الموجودة</CardTitle>
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="البحث في الحقول..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredFields.map((field) => (
              <div key={field.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center">
                      {field.type === 'text' && <Type className="h-5 w-5 text-blue-600" />}
                      {field.type === 'textarea' && <FileText className="h-5 w-5 text-green-600" />}
                      {field.type === 'date' && <Calendar className="h-5 w-5 text-purple-600" />}
                      {field.type === 'number' && <Hash className="h-5 w-5 text-orange-600" />}
                      {field.type === 'image' && <ImageIcon className="h-5 w-5 text-pink-600" />}
                      {field.type === 'table' && <Grid className="h-5 w-5 text-indigo-600" />}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{field.nameAr}</h3>
                      <p className="text-sm text-gray-600">{field.nameEn}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {getTypeBadge(field.type)}
                    {getCategoryTypeBadge(field.categoryType)}
                    <Badge variant={field.isActive ? 'default' : 'secondary'}>
                      {field.isActive ? 'نشط' : 'غير نشط'}
                    </Badge>
                    <Button variant="outline" size="sm" onClick={() => handleEditField(field)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteField(field.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    {field.isRequired ? (
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    ) : (
                      <AlertCircle className="h-4 w-4 text-gray-400" />
                    )}
                    <span>{field.isRequired ? 'حقل مطلوب' : 'حقل اختياري'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {field.showInProductPage ? (
                      <Eye className="h-4 w-4 text-blue-600" />
                    ) : (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    )}
                    <span>صفحة المنتج</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {field.showInAdminPanel ? (
                      <Settings className="h-4 w-4 text-green-600" />
                    ) : (
                      <Settings className="h-4 w-4 text-gray-400" />
                    )}
                    <span>لوحة التحكم</span>
                  </div>
                  <div className="text-gray-600">
                    ترتيب: {field.sortOrder}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredFields.length === 0 && (
            <div className="text-center py-8">
              <Database className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">لا توجد حقول مخصصة تطابق معايير البحث</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Field Types Preview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5" />
            عرض أنواع الحقول
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { type: 'text', label: 'نص عادي قصير', preview: 'تجربة', icon: <Type className="h-4 w-4" /> },
              { type: 'textarea', label: 'نص منسق', preview: 'نص مع تنسيق متقدم', icon: <FileText className="h-4 w-4" /> },
              { type: 'date', label: 'تاريخ', preview: '2025/09/25', icon: <Calendar className="h-4 w-4" /> },
              { type: 'number', label: 'رقم', preview: '12345', icon: <Hash className="h-4 w-4" /> },
              { type: 'image', label: 'صورة', preview: 'رفع صورة', icon: <ImageIcon className="h-4 w-4" /> },
              { type: 'table', label: 'جدول', preview: 'بيانات منظمة', icon: <Grid className="h-4 w-4" /> },
            ].map((fieldType) => (
              <div key={fieldType.type} className="p-4 border rounded-lg text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  {fieldType.icon}
                  <span className="font-medium">{fieldType.label}</span>
                </div>
                <div className="p-2 bg-gray-50 rounded text-sm text-gray-600">
                  {fieldType.preview}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Add/Edit Field Modal */}
      <AnimatePresence>
        {showFieldModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={() => setShowFieldModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl w-full max-w-4xl mx-4 max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex h-full">
                {/* Sidebar */}
                <div className="w-80 bg-gray-50 border-l p-6 overflow-y-auto">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-gray-900">
                      {editingField ? 'تعديل الحقل' : 'إضافة حقل مخصص'}
                    </h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowFieldModal(false)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>

                  <nav className="space-y-2">
                    <button
                      onClick={() => setActiveTab('basic')}
                      className={`w-full text-right p-3 rounded-lg transition-colors ${
                        activeTab === 'basic' ? 'bg-blue-100 text-blue-800' : 'hover:bg-gray-100'
                      }`}
                    >
                      معلومات أساسية
                    </button>
                    <button
                      onClick={() => setActiveTab('validation')}
                      className={`w-full text-right p-3 rounded-lg transition-colors ${
                        activeTab === 'validation' ? 'bg-blue-100 text-blue-800' : 'hover:bg-gray-100'
                      }`}
                    >
                      التحقق والخيارات
                    </button>
                    <button
                      onClick={() => setActiveTab('display')}
                      className={`w-full text-right p-3 rounded-lg transition-colors ${
                        activeTab === 'display' ? 'bg-blue-100 text-blue-800' : 'hover:bg-gray-100'
                      }`}
                    >
                      إعدادات العرض
                    </button>
                  </nav>
                </div>

                {/* Main Content */}
                <div className="flex-1 p-6 overflow-y-auto">
                  {activeTab === 'basic' && (
                    <div className="space-y-6">
                      <h3 className="text-2xl font-bold text-gray-900">معلومات الحقل الأساسية</h3>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <Label htmlFor="nameAr">اسم الحقل بالعربية</Label>
                          <Input
                            id="nameAr"
                            value={fieldForm.nameAr}
                            onChange={(e) => setFieldForm({ ...fieldForm, nameAr: e.target.value })}
                            placeholder="الاسم"
                          />
                        </div>

                        <div>
                          <Label htmlFor="nameEn">اسم الحقل بالإنجليزية</Label>
                          <Input
                            id="nameEn"
                            value={fieldForm.nameEn}
                            onChange={(e) => setFieldForm({ ...fieldForm, nameEn: e.target.value })}
                            placeholder="Name"
                          />
                        </div>

                        <div>
                          <Label htmlFor="type">نوع الحقل</Label>
                          <Select value={fieldForm.type} onValueChange={(value) => setFieldForm({ ...fieldForm, type: value as CustomField['type'] })}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="text">نص عادي قصير</SelectItem>
                              <SelectItem value="textarea">نص منسق</SelectItem>
                              <SelectItem value="date">تاريخ</SelectItem>
                              <SelectItem value="number">رقم</SelectItem>
                              <SelectItem value="image">صورة</SelectItem>
                              <SelectItem value="table">جدول</SelectItem>
                              <SelectItem value="select">قائمة اختيار</SelectItem>
                              <SelectItem value="checkbox">مربع اختيار</SelectItem>
                              <SelectItem value="radio">اختيار واحد</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label htmlFor="categoryType">العرض في</Label>
                          <Select value={fieldForm.categoryType} onValueChange={(value) => setFieldForm({ ...fieldForm, categoryType: value as CustomField['categoryType'] })}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="products">المنتجات</SelectItem>
                              <SelectItem value="categories">التصنيفات</SelectItem>
                              <SelectItem value="both">الكل</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label htmlFor="defaultValue">القيمة الافتراضية</Label>
                          <Input
                            id="defaultValue"
                            value={fieldForm.defaultValue}
                            onChange={(e) => setFieldForm({ ...fieldForm, defaultValue: e.target.value })}
                            placeholder="القيمة الافتراضية"
                          />
                        </div>

                        <div>
                          <Label htmlFor="sortOrder">ترتيب العرض</Label>
                          <Input
                            id="sortOrder"
                            type="number"
                            value={fieldForm.sortOrder}
                            onChange={(e) => setFieldForm({ ...fieldForm, sortOrder: Number(e.target.value) })}
                            placeholder="1"
                          />
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="isRequired"
                          checked={fieldForm.isRequired}
                          onCheckedChange={(checked) => setFieldForm({ ...fieldForm, isRequired: checked as boolean })}
                        />
                        <Label htmlFor="isRequired">حقل مطلوب</Label>
                      </div>
                    </div>
                  )}

                  {activeTab === 'validation' && (
                    <div className="space-y-6">
                      <h3 className="text-2xl font-bold text-gray-900">إعدادات التحقق والخيارات</h3>

                      {(fieldForm.type === 'select' || fieldForm.type === 'radio') && (
                        <div className="space-y-4">
                          <Label>خيارات القائمة</Label>
                          <div className="flex gap-2">
                            <Input
                              value={optionForm}
                              onChange={(e) => setOptionForm(e.target.value)}
                              placeholder="أدخل خيار جديد"
                              onKeyPress={(e) => e.key === 'Enter' && handleAddOption()}
                            />
                            <Button onClick={handleAddOption} disabled={!optionForm.trim()}>
                              إضافة
                            </Button>
                          </div>
                          <div className="space-y-2">
                            {fieldForm.options.map((option, index) => (
                              <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                                <span>{option}</span>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleDeleteOption(index)}
                                  className="text-red-600 hover:text-red-700"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <Label htmlFor="minLength">الحد الأدنى للطول</Label>
                          <Input
                            id="minLength"
                            type="number"
                            value={fieldForm.validation.minLength}
                            onChange={(e) => setFieldForm({
                              ...fieldForm,
                              validation: { ...fieldForm.validation, minLength: Number(e.target.value) }
                            })}
                            placeholder="0"
                          />
                        </div>

                        <div>
                          <Label htmlFor="maxLength">الحد الأقصى للطول</Label>
                          <Input
                            id="maxLength"
                            type="number"
                            value={fieldForm.validation.maxLength}
                            onChange={(e) => setFieldForm({
                              ...fieldForm,
                              validation: { ...fieldForm.validation, maxLength: Number(e.target.value) }
                            })}
                            placeholder="0"
                          />
                        </div>

                        <div>
                          <Label htmlFor="pattern">نمط التحقق (Regex)</Label>
                          <Input
                            id="pattern"
                            value={fieldForm.validation.pattern}
                            onChange={(e) => setFieldForm({
                              ...fieldForm,
                              validation: { ...fieldForm.validation, pattern: e.target.value }
                            })}
                            placeholder="نمط التحقق"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'display' && (
                    <div className="space-y-6">
                      <h3 className="text-2xl font-bold text-gray-900">إعدادات العرض</h3>

                      <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="isActive"
                            checked={fieldForm.isActive}
                            onCheckedChange={(checked) => setFieldForm({ ...fieldForm, isActive: checked as boolean })}
                          />
                          <Label htmlFor="isActive">حقل نشط</Label>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="showInAdminPanel"
                              checked={fieldForm.showInAdminPanel}
                              onCheckedChange={(checked) => setFieldForm({ ...fieldForm, showInAdminPanel: checked as boolean })}
                            />
                            <Label htmlFor="showInAdminPanel">العرض في لوحة تحكم التاجر</Label>
                          </div>

                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="showInProductPage"
                              checked={fieldForm.showInProductPage}
                              onCheckedChange={(checked) => setFieldForm({ ...fieldForm, showInProductPage: checked as boolean })}
                            />
                            <Label htmlFor="showInProductPage">العرض في واجهة المنصة</Label>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Modal Actions */}
                  <div className="flex justify-between mt-8 pt-6 border-t">
                    <Button variant="outline" onClick={() => setShowFieldModal(false)}>
                      إلغاء
                    </Button>
                    <Button
                      onClick={handleSaveField}
                      className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                      disabled={!fieldForm.nameAr.trim()}
                    >
                      <Save className="h-4 w-4 ml-2" />
                      حفظ الحقل
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export { CustomFieldsView };