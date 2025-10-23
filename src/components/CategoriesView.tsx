import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  AlertCircle,
  CheckCircle,
  Edit,
  Eye,
  EyeOff,
  Package,
  Plus,
  Save,
  Search,
  Tag,
  Trash2,
  X,
  Image as ImageIcon,
  Upload,
  Camera,
  MapPin,
  Building,
  Settings,
  MoreVertical,
  GripVertical,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Checkbox } from './ui/checkbox';

interface ProductCategory {
  id: string;
  name: string;
  parentId?: string;
  productsCount: number;
  isActive: boolean;
  createdAt: string;
  image?: string;
  backgroundImage?: string;
}

interface StoreData {
  id: string;
  nameAr: string;
  email: string;
  categories?: ProductCategory[];
}

interface CategoriesViewProps {
  storeData: StoreData | null;
  setStoreData: (data: StoreData | null) => void;
  onSave: () => void;
}

const CategoriesView: React.FC<CategoriesViewProps> = ({ storeData, setStoreData, onSave }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState<ProductCategory | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    isActive: true,
    image: '',
    backgroundImage: '',
  });

  const categories = storeData?.categories || [];

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddCategory = () => {
    setEditingCategory(null);
    setFormData({ name: '', isActive: true, image: '', backgroundImage: '' });
    setShowModal(true);
  };

  const handleEditCategory = (category: ProductCategory) => {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      isActive: category.isActive,
      image: category.image || '',
      backgroundImage: category.backgroundImage || '',
    });
    setShowModal(true);
  };

  const handleSaveCategory = () => {
    if (!storeData) return;

    const updatedCategories = [...categories];

    if (editingCategory) {
      // Edit existing category
      const index = updatedCategories.findIndex(cat => cat.id === editingCategory.id);
      if (index !== -1) {
        updatedCategories[index] = {
          ...editingCategory,
          name: formData.name,
          isActive: formData.isActive,
          image: formData.image,
          backgroundImage: formData.backgroundImage,
        };
      }
    } else {
      // Add new category
      const newCategory: ProductCategory = {
        id: Date.now().toString(),
        name: formData.name,
        productsCount: 0,
        isActive: formData.isActive,
        image: formData.image,
        backgroundImage: formData.backgroundImage,
        createdAt: new Date().toISOString().split('T')[0] || '',
      };
      updatedCategories.push(newCategory);
    }

    setStoreData({
      ...storeData,
      categories: updatedCategories,
    });

    setShowModal(false);
    onSave();
  };

  const handleDeleteCategory = (categoryId: string) => {
    if (!storeData) return;

    const updatedCategories = categories.filter(cat => cat.id !== categoryId);
    setStoreData({
      ...storeData,
      categories: updatedCategories,
    });
    onSave();
  };

  const toggleCategoryStatus = (categoryId: string) => {
    if (!storeData) return;

    const updatedCategories = categories.map(cat =>
      cat.id === categoryId ? { ...cat, isActive: !cat.isActive } : cat
    );

    setStoreData({
      ...storeData,
      categories: updatedCategories,
    });
    onSave();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">إدارة التصنيفات</h2>
          <p className="text-gray-600 mt-1">إدارة تصنيفات المنتجات في متجرك</p>
        </div>
        <Button
          onClick={handleAddCategory}
          className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
        >
          <Plus className="h-4 w-4 ml-2" />
          إضافة تصنيف جديد
        </Button>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="البحث في التصنيفات..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCategories.map((category) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative"
          >
            <Card className="hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl flex items-center justify-center relative overflow-hidden">
                      {category.image ? (
                        <img
                          src={`/images/categories/${category.image}`}
                          alt={category.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            target.parentElement!.innerHTML = '<svg class="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" /></svg>';
                          }}
                        />
                      ) : (
                        <Tag className="h-6 w-6 text-blue-600" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{category.name}</h3>
                      <p className="text-sm text-gray-500">{category.productsCount} منتج</p>
                    </div>
                  </div>
                  <Badge variant={category.isActive ? 'default' : 'secondary'}>
                    {category.isActive ? 'نشط' : 'غير نشط'}
                  </Badge>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-500">
                    تم الإنشاء: {category.createdAt}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toggleCategoryStatus(category.id)}
                    >
                      {category.isActive ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEditCategory(category)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteCategory(category.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {filteredCategories.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Tag className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">لا توجد تصنيفات</h3>
            <p className="text-gray-600 mb-6">ابدأ بإضافة تصنيفات لمنتجاتك</p>
            <Button onClick={handleAddCategory}>
              <Plus className="h-4 w-4 ml-2" />
              إضافة التصنيف الأول
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Add/Edit Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-6 w-full max-w-md mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">
                  {editingCategory ? 'تعديل التصنيف' : 'إضافة تصنيف جديد'}
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowModal(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <div className="space-y-6">
                <div>
                  <Label htmlFor="name">اسم التصنيف</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="أدخل اسم التصنيف"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="image">صورة التصنيف</Label>
                    <div className="mt-1">
                      <div className="flex items-center gap-3">
                        <Button
                          type="button"
                          variant="outline"
                          className="flex items-center gap-2"
                          onClick={() => document.getElementById('category-image-input')?.click()}
                        >
                          <Camera className="h-4 w-4" />
                          اختر صورة
                        </Button>
                        {formData.image && (
                          <div className="flex items-center gap-2">
                            <ImageIcon className="h-4 w-4 text-green-600" />
                            <span className="text-sm text-green-600">تم الرفع</span>
                          </div>
                        )}
                      </div>
                      <input
                        id="category-image-input"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            // Here you would typically upload to a server
                            // For now, we'll just store the file name
                            setFormData({ ...formData, image: file.name });
                          }
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="backgroundImage">الصورة الخلفية للتصنيف</Label>
                    <div className="mt-1">
                      <div className="flex items-center gap-3">
                        <Button
                          type="button"
                          variant="outline"
                          className="flex items-center gap-2"
                          onClick={() => document.getElementById('category-bg-input')?.click()}
                        >
                          <ImageIcon className="h-4 w-4" />
                          اختر صورة خلفية
                        </Button>
                        {formData.backgroundImage && (
                          <div className="flex items-center gap-2">
                            <ImageIcon className="h-4 w-4 text-green-600" />
                            <span className="text-sm text-green-600">تم الرفع</span>
                          </div>
                        )}
                      </div>
                      <input
                        id="category-bg-input"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            // Here you would typically upload to a server
                            // For now, we'll just store the file name
                            setFormData({ ...formData, backgroundImage: file.name });
                          }
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="isActive"
                    checked={formData.isActive}
                    onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked as boolean })}
                  />
                  <Label htmlFor="isActive">تصنيف نشط</Label>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <Button
                  onClick={handleSaveCategory}
                  className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                  disabled={!formData.name.trim()}
                >
                  <Save className="h-4 w-4 ml-2" />
                  {editingCategory ? 'حفظ التغييرات' : 'إضافة التصنيف'}
                </Button>
                <Button variant="outline" onClick={() => setShowModal(false)}>
                  إلغاء
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export { CategoriesView };