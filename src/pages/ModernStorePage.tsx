import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  AlertTriangle,
  ArrowLeft, 
  ArrowRight,
  Bell,
  Crown,
  Eye,
  Facebook,
  Globe,
  Heart,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Share2,
  ShoppingCart,
  Sparkles,
  Star,
  TrendingUp
} from 'lucide-react';
import { storesData } from '@/data/ecommerceData';
import { allStoreProducts } from '@/data/allStoreProducts';
import { nawaemProducts } from '@/data/stores/nawaem/products';
import { sheirineProducts } from '@/data/stores/sheirine/products';
import { prettyProducts } from '@/data/stores/pretty/products';
import { deltaProducts } from '@/data/stores/delta-store/products';
import { magnaBeautyProducts } from '@/data/stores/magna-beauty/products';
import type { Product } from '@/data/storeProducts';
import NawaemSlider from '@/data/stores/nawaem/Slider';
import SheirineSlider from '@/data/stores/sheirine/Slider';
import PrettySlider from '@/data/stores/pretty/Slider';
import DeltaSlider from '@/data/stores/delta-store/Slider';
import MagnaBeautySlider from '@/data/stores/magna-beauty/Slider';
import EnhancedNotifyModal from '@/components/EnhancedNotifyModal';
import ShareMenu from '@/components/ShareMenu';

interface ModernStorePageProps {
  storeSlug: string;
  onBack: () => void;
  onProductClick: (productId: number) => void;
  onAddToCart: (product: Product, size: string, color: string, quantity: number) => void;
  onToggleFavorite: (productId: number) => void;
  onNotifyWhenAvailable: (productId: number) => void;
  onSubmitNotification?: (product: Product, notificationData: any) => void;
  favorites: number[];
}

const ModernStorePage: React.FC<ModernStorePageProps> = ({
  storeSlug,
  onBack,
  onProductClick,
  onAddToCart,
  onToggleFavorite,
  onNotifyWhenAvailable,
  onSubmitNotification,
  favorites = []
}) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [currentView, setCurrentView] = useState<'all' | 'discounts' | 'new'>('all');
  const [showNotifyModal, setShowNotifyModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // العثور على المتجر
  const store = storesData.find(s => s.slug === storeSlug);

  // تصفية المنتجات
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
        storeProducts = allStoreProducts.filter(p => p.storeId === store.id);
    }
  }

  let displayProducts = storeProducts;
  if (currentView === 'discounts') {
    displayProducts = storeProducts.filter(p => p.tags.includes('تخفيضات'));
  } else if (currentView === 'new') {
    displayProducts = storeProducts.filter(p => p.tags.includes('جديد'));
  }

  // صور السلايدر (أول 5 منتجات)
  const sliderImages = storeProducts.slice(0, 5);

  // تلقائي للسلايدر
  useEffect(() => {
    if (sliderImages.length > 1) {
      const interval = setInterval(() => {
        setActiveSlide((prev) => (prev + 1) % sliderImages.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [sliderImages.length]);

  if (!store) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-600 mb-4">متجر غير موجود</h2>
          <Button onClick={onBack}>العودة للرئيسية</Button>
        </div>
      </div>
    );
  }

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % sliderImages.length);
  };

  const prevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + sliderImages.length) % sliderImages.length);
  };

  const handleAddToCart = (product: Product) => {
    const defaultSize = product.availableSizes[0] || product.sizes[0] || 'واحد';
    const defaultColor = product.colors[0]?.name || 'افتراضي';
    onAddToCart(product, defaultSize, defaultColor, 1);
  };

  const handleNotifyWhenAvailable = (product: Product) => {
    // استدعاء دالة التنبيه من المكون الأب بدلاً من عرض الـ modal الخاص
    onNotifyWhenAvailable(product.id);
  };

  const handleCloseNotifyModal = () => {
    setShowNotifyModal(false);
    setSelectedProduct(null);
  };

  const handleSubmitNotification = (notificationData: any) => {
    if (onSubmitNotification && selectedProduct) {
      onSubmitNotification(selectedProduct, notificationData);
    } else {
      console.log('تم إرسال طلب الإشعار:', notificationData);
    }
    setShowNotifyModal(false);
    setSelectedProduct(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* الهيدر */}
      <div className="bg-white shadow-sm sticky top-0 z-30">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={onBack}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                العودة
              </Button>
              <div className="flex items-center gap-3">
                <img 
                  src={store.logo} 
                  alt={store.name}
                  className="h-12 w-12 rounded-xl object-cover"
                />
                <div>
                  <h1 className="text-xl font-bold text-gray-900">{store.name}</h1>
                  <p className="text-sm text-gray-600">{store.description}</p>
                </div>
              </div>
            </div>
            
            {/* تبويبات العرض */}
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setCurrentView('all')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  currentView === 'all' 
                    ? 'bg-white text-primary shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                جميع المنتجات
              </button>
              <button
                onClick={() => setCurrentView('discounts')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  currentView === 'discounts' 
                    ? 'bg-white text-primary shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                التخفيضات
              </button>
              <button
                onClick={() => setCurrentView('new')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  currentView === 'new' 
                    ? 'bg-white text-primary shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                المنتجات الجديدة
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* السلايدر المحسن للمتاجر المميزة */}
      {store.slug === 'nawaem' && sliderImages.length > 0 ? (
        <NawaemSlider
          products={sliderImages}
          storeSlug={store.slug}
          onProductClick={onProductClick}
          onAddToCart={handleAddToCart}
          onToggleFavorite={onToggleFavorite}
          favorites={favorites}
        />
      ) : store.slug === 'sheirine' && sliderImages.length > 0 ? (
        <SheirineSlider
          products={sliderImages}
          storeSlug={store.slug}
          onProductClick={onProductClick}
          onAddToCart={handleAddToCart}
          onToggleFavorite={onToggleFavorite}
          favorites={favorites}
        />
      ) : store.slug === 'pretty' && sliderImages.length > 0 ? (
        <PrettySlider
          products={sliderImages}
          storeSlug={store.slug}
          onProductClick={onProductClick}
          onAddToCart={handleAddToCart}
          onToggleFavorite={onToggleFavorite}
          favorites={favorites}
        />
      ) : store.slug === 'delta-store' && sliderImages.length > 0 ? (
        <DeltaSlider
          products={sliderImages}
          storeSlug={store.slug}
          onProductClick={onProductClick}
          onAddToCart={handleAddToCart}
          onToggleFavorite={onToggleFavorite}
          favorites={favorites}
        />
      ) : store.slug === 'magna-beauty' && sliderImages.length > 0 ? (
        <MagnaBeautySlider
          storeSlug={store.slug}
        />
      ) : (
        /* السلايدر العادي للمتاجر الأخرى */
        sliderImages.length > 0 && (
          <div className="relative h-80 bg-gradient-to-r from-primary/10 to-primary/5 overflow-hidden">
            <div className="absolute inset-0 flex transition-transform duration-500 ease-in-out"
                 style={{ transform: `translateX(-${activeSlide * 100}%)` }}>
              {sliderImages.map((product, index) => (
                <div key={product.id} className="w-full flex-shrink-0 relative">
                  <div className="container mx-auto px-4 h-full flex items-center">
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                      <div className="space-y-4">
                        <Badge className="bg-primary/20 text-primary">
                          {store.categories[0]}
                        </Badge>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                          {product.name}
                        </h2>
                        <p className="text-lg text-gray-600 max-w-md">
                          {product.description}
                        </p>
                        <div className="flex items-center gap-4">
                          <div className="text-2xl font-bold text-primary">
                            {product.price} د.ل
                          </div>
                          {product.originalPrice > product.price && (
                            <div className="text-lg text-gray-500 line-through">
                              {product.originalPrice} د.ل
                            </div>
                          )}
                        </div>
                        <Button 
                          size="lg" 
                          onClick={() => onProductClick(product.id)}
                          className="bg-primary hover:bg-primary/90"
                        >
                          عرض المنتج
                          <ArrowRight className="h-4 w-4 ml-2" />
                        </Button>
                      </div>
                      <div className="relative flex justify-center">
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-64 h-64 object-cover rounded-2xl shadow-2xl"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* أزرار التنقل */}
            {sliderImages.length > 1 && (
              <>
                <button
                  onClick={prevSlide}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-colors"
                >
                  <ArrowLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-colors"
                >
                  <ArrowRight className="h-5 w-5" />
                </button>
              </>
            )}

            {/* نقاط التنقل */}
            {sliderImages.length > 1 && (
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                {sliderImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveSlide(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === activeSlide ? 'bg-white' : 'bg-white/50'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        )
      )}

      {/* قسم المنتجات */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {currentView === 'all' && 'جميع المنتجات'}
              {currentView === 'discounts' && 'العروض والتخفيضات'}
              {currentView === 'new' && 'المنتجات الجديدة'}
            </h2>
            <p className="text-gray-600">
              {displayProducts.length} منتج متوفر
            </p>
          </div>
        </div>

        {displayProducts.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📦</div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">لا توجد منتجات</h3>
            <p className="text-gray-500">لا توجد منتجات في هذا التصنيف حالياً</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {displayProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                isFavorite={favorites.includes(product.id)}
                onProductClick={() => onProductClick(product.id)}
                onAddToCart={() => handleAddToCart(product)}
                onToggleFavorite={() => onToggleFavorite(product.id)}
                onNotifyWhenAvailable={() => handleNotifyWhenAvailable(product)}
              />
            ))}
          </div>
        )}
      </div>

      {/* الفوتر بهوية إشرو */}
      <footer className="bg-gray-900 text-white mt-16">
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            {/* شعار إشرو */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <img 
                  src="/eshro-new-logo.png" 
                  alt="إشرو" 
                  className="h-10 w-auto"
                />
              </div>
              <p className="text-gray-400 text-sm">
                منصة إشرو الإلكترونية - مستقبل التجارة الإلكترونية في ليبيا
              </p>
              <div className="flex gap-3">
                <button className="w-8 h-8 bg-primary rounded-full flex items-center justify-center hover:bg-primary/80 transition-colors">
                  <Instagram className="h-4 w-4" />
                </button>
                <button className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-500 transition-colors">
                  <Facebook className="h-4 w-4" />
                </button>
                <button className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center hover:bg-green-500 transition-colors">
                  <Globe className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* معلومات المتجر */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">{store.name}</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>{store.description}</li>
                <li className="flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  {store.url}
                </li>
                {store.categories.map((category, index) => (
                  <li key={index}>{category}</li>
                ))}
              </ul>
            </div>

            {/* خدمات إشرو */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">خدماتنا</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>دفع آمن</li>
                <li>شحن سريع</li>
                <li>ضمان الجودة</li>
                <li>خدمة العملاء</li>
                <li>إرجاع مجاني</li>
              </ul>
            </div>

            {/* تواصل معنا */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">تواصل معنا</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  218-21-123-4567
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  support@eshro.ly
                </li>
                <li className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  طرابلس، ليبيا
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2024 منصة إشرو الإلكترونية. جميع الحقوق محفوظة.</p>
          </div>
        </div>
      </footer>

      {/* مكون نبهني عند التوفر */}
      {showNotifyModal && selectedProduct && (
        <EnhancedNotifyModal
          isOpen={showNotifyModal}
          onClose={handleCloseNotifyModal}
          product={selectedProduct}
          onSubmit={handleSubmitNotification}
        />
      )}
    </div>
  );
};

// مكون كارد المنتج
const ProductCard: React.FC<{
  product: Product;
  isFavorite: boolean;
  onProductClick: () => void;
  onAddToCart: () => void;
  onToggleFavorite: () => void;
  onNotifyWhenAvailable: () => void;
}> = ({
  product,
  isFavorite,
  onProductClick,
  onAddToCart,
  onToggleFavorite,
  onNotifyWhenAvailable
}) => {

  // دالة للحصول على لون البadge
  const getTagColor = (badge: string) => {
    switch (badge) {
      case 'جديدة':
      case 'جديد': return 'bg-purple-600 text-white'; // البنفسجي
      case 'أكثر مبيعاً': return 'bg-red-600 text-white'; // الأحمر
      case 'أكثر مشاهدة': return 'bg-blue-800 text-white'; // الأزرق الداكن
      case 'أكثر إعجاباً': return 'bg-yellow-500 text-black'; // الأصفر
      case 'مميزة': return 'bg-green-600 text-white'; // الأخضر
      case 'غير متوفرة':
      case 'غير متوفر': return 'bg-orange-700 text-white'; // البرتقالي الداكن
      case 'تخفيضات': return 'bg-pink-600 text-white'; // وردي داكن للتخفيضات
      case 'أكثر طلباً': return 'bg-blue-500 text-white'; // أزرق عادي (للمتوافق مع المنتجات القديمة)
      default: return 'bg-gray-500 text-white';
    }
  };

  // دالة للحصول على البadge من الـ tags
  const getBadgeFromTags = (tags: string[]): string | null => {
    const badgePriority = [
      'غير متوفرة',
      'غير متوفر',
      'جديدة',
      'جديد',
      'أكثر مبيعاً',
      'أكثر مشاهدة',
      'أكثر إعجاباً',
      'مميزة',
      'تخفيضات',
      'أكثر طلباً'
    ];

    for (const badge of badgePriority) {
      if (tags.includes(badge)) {
        return badge;
      }
    }
    return null;
  };

  return (
    <Card 
      className={`overflow-hidden hover:shadow-lg transition-all cursor-pointer group ${!product.inStock ? 'opacity-75' : ''}`}
      onClick={onProductClick}
    >
      <CardContent className="p-0">
        <div className="relative">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          
          {/* العلامات */}
          {(() => {
            const badge = getBadgeFromTags(product.tags);
            return badge ? (
              <Badge className={`absolute top-2 right-2 ${getTagColor(badge)}`}>
                {badge}
              </Badge>
            ) : null;
          })()}

          {/* أزرار الإجراءات */}
          <div className="absolute top-2 left-2 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleFavorite();
              }}
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                isFavorite 
                  ? 'bg-red-500 text-white' 
                  : 'bg-white/80 text-gray-600 hover:bg-red-500 hover:text-white'
              }`}
            >
              <Heart className="h-4 w-4" fill={isFavorite ? 'currentColor' : 'none'} />
            </button>
            
            <div 
              onClick={(e) => e.stopPropagation()} 
              className="relative"
            >
              <ShareMenu 
                url={`${window.location.origin}/product/${product.id}`}
                title={`شاهد هذا المنتج الرائع: ${product.name}`}
                className="w-8 h-8 bg-white/80 text-gray-600 hover:bg-white rounded-full"
                size="sm"
                variant="ghost"
              />
            </div>
          </div>
        </div>

        <div className="p-4">
          <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">
            {product.name}
          </h3>
          
          {/* التقييم */}
          <div className="flex items-center gap-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className={`h-3 w-3 ${i < product.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
              />
            ))}
            <span className="text-xs text-gray-500 mr-1">({product.reviews})</span>
          </div>

          {/* السعر */}
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg font-bold text-primary">{product.price} د.ل</span>
            {product.originalPrice > product.price && (
              <>
                <span className="text-sm text-gray-500 line-through">
                  {product.originalPrice} د.ل
                </span>
                <Badge className="bg-red-500 text-white text-xs">
                  -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                </Badge>
              </>
            )}
          </div>

          {/* الإحصائيات */}
          <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
            <div className="flex items-center gap-1">
              <Eye className="h-3 w-3" />
              {product.views}
            </div>
            <div className="flex items-center gap-1">
              <Heart className="h-3 w-3" />
              {product.likes}
            </div>
            <div className="flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              {product.orders}
            </div>
          </div>

          {/* الأزرار */}
          {product.inStock ? (
            <Button
              onClick={(e) => {
                e.stopPropagation();
                onAddToCart();
              }}
              size="sm"
              className="w-full bg-primary hover:bg-primary/90"
            >
              <ShoppingCart className="h-4 w-4 mr-1" />
              أضف للسلة
            </Button>
          ) : (
            <Button
              onClick={(e) => {
                e.stopPropagation();
                onNotifyWhenAvailable();
              }}
              size="sm"
              variant="outline"
              className="w-full border-orange-300 text-orange-600 hover:bg-orange-50"
            >
              <Bell className="h-4 w-4 mr-1" />
              نبهني عند التوفر
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ModernStorePage;