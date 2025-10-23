import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  Facebook,
  Filter,
  Globe,
  Grid3X3,
  Heart, 
  Instagram,
  List,
  Search, 
  ShoppingCart,
  Star, 
  Store
} from "lucide-react";
import { sampleProducts, storesData } from "@/data/ecommerceData";
import { allStoreProducts } from '@/data/allStoreProducts';
import { nawaemProducts } from '@/data/stores/nawaem/products';
import { sheirineProducts } from '@/data/stores/sheirine/products';
import { prettyProducts } from '@/data/stores/pretty/products';
import { deltaProducts } from '@/data/stores/delta-store/products';
import { magnaBeautyProducts } from '@/data/stores/magna-beauty/products';
import { nawaemStoreConfig } from '@/data/stores/nawaem/config';
import { sheirineStoreConfig } from '@/data/stores/sheirine/config';
import { magnaStoreConfig } from '@/data/stores/magna-beauty/config';

interface StorePageProps {
  storeSlug: string;
  onBack: () => void;
  onProductClick: (productId: number) => void;
}

const StorePage: React.FC<StorePageProps> = ({ storeSlug, onBack, onProductClick }) => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('الكل');

  // البحث عن بيانات المتجر
  const store = storesData.find(s => s.slug === storeSlug);

  // الحصول على إعدادات المتجر
  const getStoreConfig = (slug: string) => {
    switch (slug) {
      case 'nawaem':
        return nawaemStoreConfig;
      case 'sheirine':
        return sheirineStoreConfig;
      case 'magna-beauty':
        return magnaStoreConfig;
      default:
        return null;
    }
  };

  const storeConfig = getStoreConfig(storeSlug);
  let storeProducts: any[] = [];
  if (store) {
    switch (store.slug) {
      case 'nawaem':
        storeProducts = nawaemProducts;
        break;
      case 'sheirine':
        storeProducts = sheirineProducts;
        break;
      case 'pretty':
        storeProducts = allStoreProducts.filter(p => p.storeId === store.id);
        break;
      case 'delta-store':
        storeProducts = deltaProducts;
        break;
      case 'magna-beauty':
        storeProducts = magnaBeautyProducts;
        break;
      default:
        storeProducts = sampleProducts.filter(p => p.storeId === store.id);
    }
  }
  
  if (!store) {
    return <div>المتجر غير موجود</div>;
  }

  // تصفية المنتجات
  const filteredProducts = storeProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'الكل' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* الهيدر */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={onBack} className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                العودة
              </Button>
              
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex items-center justify-center overflow-hidden">
                  {storeConfig?.logo ? (
                    <img
                      src={storeConfig.logo}
                      alt={`${store.name} logo`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        // Fallback to icon if image fails to load
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        target.parentElement!.innerHTML = `<div class="h-6 w-6 text-primary">${storeConfig.icon}</div>`;
                      }}
                    />
                  ) : (
                    <Store className="h-6 w-6 text-primary" />
                  )}
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">{store.name}</h1>
                  <p className="text-sm text-gray-500">{store.description}</p>
                </div>
              </div>
            </div>
            
            {/* أيقونات التواصل الاجتماعي */}
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
                <Facebook className="h-5 w-5 text-white" />
              </div>
              <div className="w-10 h-10 bg-pink-500 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
                <Instagram className="h-5 w-5 text-white" />
              </div>
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
                <Globe className="h-5 w-5 text-white" />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* شريط البحث والتصفية */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* البحث */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="ابحث في المنتجات..."
                className="pl-10 pr-4"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* الفئات */}
            <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
              {['الكل', ...store.categories].map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className="whitespace-nowrap"
                >
                  {category}
                </Button>
              ))}
            </div>

            {/* أوضاع العرض */}
            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* المنتجات */}
      <div className="container mx-auto px-4 py-6">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">لم نجد منتجات مطابقة</h3>
            <p className="text-gray-500">جرب البحث بكلمات مختلفة أو اختر فئة أخرى</p>
          </div>
        ) : (
          <div className={viewMode === 'grid' 
            ? 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6' 
            : 'space-y-4'
          }>
            {filteredProducts.map((product) => (
              <ProductCard 
                key={product.id}
                product={product}
                viewMode={viewMode}
                onClick={() => onProductClick(product.id)}
              />
            ))}
          </div>
        )}
      </div>

      {/* إحصائيات المتجر */}
      <div className="bg-white border-t">
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{storeProducts.length}+</div>
              <div className="text-sm text-gray-500">منتج متاح</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">4.8</div>
              <div className="text-sm text-gray-500">تقييم المتجر</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">1.2K+</div>
              <div className="text-sm text-gray-500">عميل سعيد</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">24/7</div>
              <div className="text-sm text-gray-500">دعم العملاء</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface ProductCardProps {
  product: any;
  viewMode: 'grid' | 'list';
  onClick: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, viewMode, onClick }) => {
  const [isLiked, setIsLiked] = useState(false);
  
  if (viewMode === 'list') {
    return (
      <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer group" onClick={onClick}>
        <CardContent className="p-0">
          <div className="flex">
            {/* الصورة */}
            <div className="w-32 h-32 relative bg-gray-100 flex-shrink-0 rounded-lg overflow-hidden">
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {/* Discount Badge for list view */}
              {product.originalPrice > product.price && (
                <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-lg text-xs font-semibold">
                  -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                </div>
              )}
              <Button
                variant="ghost"
                size="sm"
                className="absolute top-2 right-2 w-8 h-8 p-0 bg-white/80 hover:bg-white"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsLiked(!isLiked);
                }}
              >
                <Heart className={`h-4 w-4 ${isLiked ? 'fill-red-500 text-red-500' : 'text-gray-500'}`} />
              </Button>
            </div>
            
            {/* المعلومات */}
            <div className="flex-1 p-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 group-hover:text-primary transition-colors mb-1">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">{product.description}</p>
                  
                  {/* التقييم */}
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i}
                        className={`h-3 w-3 ${i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                      />
                    ))}
                    <span className="text-xs text-gray-500 mr-2">({product.reviews})</span>
                  </div>
                  
                  {/* المقاسات المتوفرة */}
                  <div className="flex gap-1 mb-2">
                    {product.availableSizes.map((size: string) => (
                      <Badge key={size} variant="outline" className="text-xs">
                        {size}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                {/* السعر والأزرار */}
                <div className="text-right">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-lg font-bold text-primary">{product.price} د.ل</span>
                    {product.originalPrice > product.price && (
                      <>
                        <span className="text-sm text-gray-500 line-through">{product.originalPrice} د.ل</span>
                        <Badge className="bg-red-500 text-white text-xs">
                          -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                        </Badge>
                      </>
                    )}
                  </div>
                  <Button size="sm" className="bg-primary hover:bg-primary/90">
                    <ShoppingCart className="h-4 w-4 mr-1" />
                    أضف للسلة
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // عرض الشبكة
  return (
    <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group" onClick={onClick}>
      <CardContent className="p-0">
        {/* الصورة */}
        <div className="relative aspect-square bg-gray-100">
          <img 
            src={product.images[0]} 
            alt={product.name}
            className="w-full h-full object-cover"
          />
          
          {/* علامة التخفيض */}
          {product.originalPrice > product.price && (
            <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-lg text-xs font-semibold">
              -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
            </div>
          )}
          
          {/* زر الإعجاب */}
          <Button
            variant="ghost"
            size="sm"
            className="absolute top-2 right-2 w-8 h-8 p-0 bg-white/80 hover:bg-white"
            onClick={(e) => {
              e.stopPropagation();
              setIsLiked(!isLiked);
            }}
          >
            <Heart className={`h-4 w-4 ${isLiked ? 'fill-red-500 text-red-500' : 'text-gray-500'}`} />
          </Button>
          
          {/* أزرار الإجراءات عند التمرير */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <Button className="bg-white text-black hover:bg-gray-100">
              عرض سريع
            </Button>
          </div>
        </div>
        
        {/* معلومات المنتج */}
        <div className="p-4">
          <h3 className="font-semibold text-gray-900 group-hover:text-primary transition-colors mb-2">
            {product.name}
          </h3>
          
          {/* التقييم */}
          <div className="flex items-center gap-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i}
                className={`h-3 w-3 ${i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
              />
            ))}
            <span className="text-xs text-gray-500 mr-2">({product.reviews})</span>
          </div>
          
          {/* الألوان */}
          <div className="flex gap-1 mb-3">
            {product.colors.slice(0, 3).map((color: any, index: number) => (
              <div 
                key={index}
                className="w-4 h-4 rounded-full border-2 border-gray-200"
                style={{ backgroundColor: color.value }}
                title={color.name}
              />
            ))}
            {product.colors.length > 3 && (
              <div className="w-4 h-4 rounded-full bg-gray-200 flex items-center justify-center text-xs text-gray-500">
                +{product.colors.length - 3}
              </div>
            )}
          </div>
          
          {/* السعر */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-primary">{product.price} د.ل</span>
              {product.originalPrice > product.price && (
                <>
                  <span className="text-sm text-gray-500 line-through">{product.originalPrice} د.ل</span>
                  <Badge className="bg-red-500 text-white text-xs">
                    -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                  </Badge>
                </>
              )}
            </div>
            
            <Button size="sm" className="bg-primary hover:bg-primary/90">
              <ShoppingCart className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StorePage;