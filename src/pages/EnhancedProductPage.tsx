import React, { useState, useEffect } from 'react';
import type { JSX } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  ArrowLeft,
  Star,
  Heart,
  Share2,
  ShoppingCart,
  Zap,
  Plus,
  Minus,
  Eye,
  ThumbsUp,
  Package,
  Bell,
  Check,
  Copy,
  AlertTriangle
} from 'lucide-react';
import ShareMenu from '@/components/ShareMenu';
import { allStoreProducts } from '@/data/allStoreProducts';
import type { Product } from '@/data/storeProducts';
import NotifyWhenAvailable, { NotificationRequest } from '@/components/NotifyWhenAvailable';

interface Color {
  name: string;
  value: string;
  image?: string;
}

interface EnhancedProductPageProps {
  product: Product;
  onBack: () => void;
  onAddToCart: (product: Product, size: string, color: string, quantity: number) => void;
  onBuyNow: (product: Product, size: string, color: string, quantity: number) => void;
  onToggleFavorite: (productId: number) => void;
  onNotifyWhenAvailable: (productId: number) => void;
  onProductSelect?: (product: Product) => void;
  isFavorite: boolean;
}

const EnhancedProductPage: React.FC<EnhancedProductPageProps> = ({
  product,
  onBack,
  onAddToCart,
  onBuyNow,
  onToggleFavorite,
  onNotifyWhenAvailable,
  onProductSelect,
  isFavorite = false
}) => {
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [linkCopied, setLinkCopied] = useState(false);
  const [validationError, setValidationError] = useState('');
  const [showNotifyModal, setShowNotifyModal] = useState(false);

  
  // عدادات live (محاكاة) - تعيين القيم المحددة للمنتجات غير المتوفرة
  const [liveViews, setLiveViews] = useState(3);
  const [liveLikes, setLiveLikes] = useState(0);
  const [liveOrders, setLiveOrders] = useState(1);

  // محاكاة العدادات المباشرة
  useEffect(() => {
    const interval = setInterval(() => {
      // زيادة عشوائية للمشاهدات
      if (Math.random() > 0.7) {
        setLiveViews(prev => prev + Math.floor(Math.random() * 3) + 1);
      }
      
      // زيادة عشوائية للإعجابات
      if (Math.random() > 0.85) {
        setLiveLikes(prev => prev + 1);
      }
      
      // زيادة عشوائية للطلبات
      if (Math.random() > 0.95) {
        setLiveOrders(prev => prev + 1);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // تحديث الصورة عند تغيير اللون
  useEffect(() => {
    if (selectedColor) {
      const colorData = product.colors.find(c => c.name === selectedColor);
      // يمكن إضافة منطق تغيير الصورة حسب اللون هنا إذا لزم الأمر
    }
  }, [selectedColor, product.colors]);

  const handleSizeSelect = (sizeName: string) => {
    if (!product.availableSizes.includes(sizeName)) {
      alert('للأسف هذا المقاس غير متاح.');
      return;
    }
    setSelectedSize(sizeName);
  };

  const handleColorSelect = (colorName: string) => {
    setSelectedColor(colorName);
  };

  const handleAddToCart = () => {
    if (!product.inStock || !product.isAvailable) {
      // إظهار رسالة "نبهني عند التوفر"
      onNotifyWhenAvailable(product.id);
      return;
    }

    if (product.sizes.length > 1 && !selectedSize) {
      setValidationError('يرجى اختيار المقاس أولاً');
      setTimeout(() => setValidationError(''), 3000);
      return;
    }

    if (product.colors.length > 1 && !selectedColor) {
      setValidationError('يرجى اختيار اللون أولاً');
      setTimeout(() => setValidationError(''), 3000);
      return;
    }

    if (quantity < 1) {
      setValidationError('يرجى تحديد الكمية');
      setTimeout(() => setValidationError(''), 3000);
      return;
    }

    const size = selectedSize || product.sizes[0] || 'واحد';
    const color = selectedColor || product.colors[0]?.name || 'افتراضي';

    onAddToCart(product, size, color, quantity);
  };

  const handleBuyNow = () => {
    if (!product.inStock || !product.isAvailable) {
      // إظهار رسالة "نبهني عند التوفر"
      onNotifyWhenAvailable(product.id);
      return;
    }

    if (product.sizes.length > 1 && !selectedSize) {
      setValidationError('يرجى اختيار المقاس أولاً');
      setTimeout(() => setValidationError(''), 3000);
      return;
    }

    if (product.colors.length > 1 && !selectedColor) {
      setValidationError('يرجى اختيار اللون أولاً');
      setTimeout(() => setValidationError(''), 3000);
      return;
    }

    if (quantity < 1) {
      setValidationError('يرجى تحديد الكمية');
      setTimeout(() => setValidationError(''), 3000);
      return;
    }

    const size = selectedSize || product.sizes[0] || 'واحد';
    const color = selectedColor || product.colors[0]?.name || 'افتراضي';

    onBuyNow(product, size, color, quantity);
  };

  const handleShare = async () => {
    const productUrl = `${window.location.origin}/product/${product.id}`;
    try {
      await navigator.clipboard.writeText(productUrl);
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
    } catch (err) {
      console.error('فشل في نسخ الرابط:', err);
    }
  };

  const handleNotifyWhenAvailable = () => {
    // فتح NotifyWhenAvailable modal محلياً بدلاً من الاعتماد على App.tsx
    setShowNotifyModal(true);
  };

  const handleCloseNotifyModal = () => {
    setShowNotifyModal(false);
  };

  const handleSubmitNotification = (notificationData: NotificationRequest) => {
    console.log('تم إرسال طلب الإشعار:', notificationData);
    // حفظ بيانات التنبيه في قائمة العناصر غير المتوفرة
    const newUnavailableItem = {
      ...product,
      notificationData: notificationData,
      requestedAt: new Date().toISOString()
    };

    // حفظ في localStorage
    const savedUnavailable = JSON.parse(localStorage.getItem('eshro_unavailable') || '[]');
    savedUnavailable.push(newUnavailableItem);
    localStorage.setItem('eshro_unavailable', JSON.stringify(savedUnavailable));

    setShowNotifyModal(false);
  };

  // دالة للحصول على منتجات مشابهة
  const getSimilarProducts = (currentProduct: Product) => {
    return allStoreProducts
      .filter(p => p.id !== currentProduct.id && p.category === currentProduct.category)
      .slice(0, 8);
  };

  const renderStarRating = (rating: number): JSX.Element[] => {
    const stars: JSX.Element[] = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <Star key="half" className="h-4 w-4 fill-yellow-200 text-yellow-400" />
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Star key={`empty-${i}`} className="h-4 w-4 text-gray-300" />
      );
    }

    return stars;
  };

  // دالة للحصول على لون العلامة
  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case 'جديدة':
      case 'جديد': return 'bg-purple-600'; // البنفسجي
      case 'أكثر مبيعاً': return 'bg-red-600'; // الأحمر
      case 'أكثر مشاهدة': return 'bg-blue-800'; // الأزرق الداكن
      case 'أكثر إعجاباً': return 'bg-yellow-500'; // الأصفر
      case 'مميزة': return 'bg-green-600'; // الأخضر
      case 'غير متوفرة':
      case 'غير متوفر': return 'bg-orange-700'; // البرتقالي الداكن
      case 'تخفيضات': return 'bg-pink-600'; // وردي داكن للتخفيضات
      case 'أكثر طلباً': return 'bg-blue-500'; // أزرق عادي (للمتوافق مع المنتجات القديمة)
      default: return 'bg-gray-500';
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* شريط التنقل العلوي */}
      <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button 
              variant="ghost" 
              onClick={onBack}
              className="flex items-center gap-2 hover:bg-primary/10"
            >
              <ArrowLeft className="h-4 w-4" />
              العودة
            </Button>
            <div className="flex items-center gap-2">
              <img 
                src="/eshro-new-logo.png" 
                alt="إشرو" 
                className="h-8 w-auto"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                  const parent = (e.target as HTMLElement).parentElement;
                  if (parent) {
                    parent.innerHTML += '<span class="text-xl font-bold text-primary">إشرو</span>';
                  }
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          
          {/* قسم الصور */}
          <div className="space-y-4">
            {/* الصورة الرئيسية */}
            <div className="relative aspect-square bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-200">
              {(() => {
                const badge = getBadgeFromTags(product.tags);
                return badge ? (
                  <Badge
                    className={`absolute top-4 right-4 z-10 text-white font-bold px-3 py-1 ${getBadgeColor(badge)}`}
                  >
                    {badge}
                  </Badge>
                ) : null;
              })()}
              
              <img
                src={product.images[selectedImageIndex] || product.images[0]}
                alt={product.name}
                className="w-full h-full object-contain bg-white hover:scale-105 transition-transform duration-500"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/assets/products/placeholder.png';
                }}
              />
              
              {/* أيقونة المفضلة */}
              <button
                onClick={() => onToggleFavorite(product.id)}
                className="absolute top-4 left-4 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-lg"
              >
                <Heart 
                  className={`h-5 w-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600 hover:text-red-500'}`} 
                />
              </button>
            </div>

            {/* صور مصغرة */}
            {product.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                      selectedImageIndex === index 
                        ? 'border-primary shadow-lg' 
                        : 'border-gray-200 hover:border-primary/50'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-contain bg-white"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* معلومات المنتج */}
          <div className="space-y-6">
            
            {/* اسم المنتج والوصف */}
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold text-gray-900">
                  {product.name}
                </h1>
                <button
                  onClick={handleShare}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  title="نسخ الرابط"
                >
                  <Copy className="h-5 w-5 text-gray-600" />
                </button>
                <button
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({
                        title: product.name,
                        text: product.description,
                        url: `${window.location.origin}/product/${product.id}`
                      });
                    } else {
                      handleShare();
                    }
                  }}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  title="مشاركة"
                >
                  <Share2 className="h-5 w-5 text-gray-600" />
                </button>
              </div>
              <p className="text-gray-600 text-lg leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* التقييم والمشاركة */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  {renderStarRating(product.rating)}
                </div>
                <span className="text-sm text-gray-600">
                  (0) | Write a review
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">مشاركة</span>
                <ShareMenu
                  url={`${window.location.origin}/product/${product.id}`}
                  title={`شاهد هذا المنتج الرائع: ${product.name}`}
                  showLabel={false}
                  variant="outline"
                  size="sm"
                />
              </div>
            </div>

            {/* الأسعار */}
            <div className="flex items-center gap-3">
              {product.inStock && product.isAvailable ? (
                <>
                  {product.originalPrice > product.price && (
                    <span className="text-lg text-gray-500 line-through">
                      {product.originalPrice} د.ل
                    </span>
                  )}
                  <span className="text-3xl font-bold text-primary">
                    {product.price} د.ل
                  </span>
                </>
              ) : (
                <span className="text-2xl font-bold text-red-600">
                  غير متوفرة الآن
                </span>
              )}
            </div>

            {/* اختيار الكمية */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">الكمية *</label>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="text-xl font-semibold min-w-[40px] text-center">
                  {quantity}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* اختيار المقاسات */}
            {product.sizes.length > 1 && (
              <div className="space-y-3">
                <label className="text-sm font-medium text-gray-700">المقاس *</label>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => {
                    const isAvailable = product.availableSizes.includes(size);
                    const isSelected = selectedSize === size;
                    
                    return (
                      <button
                        key={size}
                        onClick={() => handleSizeSelect(size)}
                        disabled={!isAvailable}
                        className={`px-4 py-2 rounded-lg border-2 font-medium transition-all duration-200 ${
                          isSelected
                            ? 'border-primary bg-primary text-white'
                            : isAvailable
                            ? 'border-gray-300 hover:border-primary hover:bg-primary/10'
                            : 'border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed'
                        }`}
                      >
                        {size}
                        {!isAvailable && (
                          <span className="ml-1 text-xs">غير متوفر</span>
                        )}
                      </button>
                    );
                  })}
                </div>
                {!selectedSize && (
                  <p className="text-xs text-red-500">يرجى اختيار المقاس قبل الإضافة للسلة</p>
                )}
              </div>
            )}

            {/* اختيار الألوان */}
            {product.colors.length > 1 && (
              <div className="space-y-3">
                <label className="text-sm font-medium text-gray-700">اللون المتاح *</label>
                <div className="flex flex-wrap gap-3">
                  {product.colors.map((color) => {
                    const isSelected = selectedColor === color.name;
                    
                    return (
                      <button
                        key={color.name}
                        onClick={() => handleColorSelect(color.name)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 font-medium transition-all duration-200 ${
                          isSelected
                            ? 'border-primary bg-primary text-white'
                            : 'border-gray-300 hover:border-primary hover:bg-primary/10'
                        }`}
                      >
                        <div 
                          className="w-4 h-4 rounded-full border border-gray-300"
                          style={{ backgroundColor: color.value }}
                        ></div>
                        <span>{color.name}</span>
                      </button>
                    );
                  })}
                </div>
                {!selectedColor && (
                  <p className="text-xs text-red-500">يرجى اختيار اللون قبل الإضافة للسلة</p>
                )}
              </div>
            )}

            {/* أزرار الإضافة للسلة والشراء */}
            <div className="space-y-3">
              {product.inStock && product.isAvailable ? (
                <>
                  <Button
                    onClick={handleAddToCart}
                    className="w-full bg-primary hover:bg-primary/90 text-white py-3 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <ShoppingCart className="h-5 w-5 mr-2" />
                    أضف للسلة
                  </Button>
                  
                  <Button
                    onClick={handleBuyNow}
                    variant="outline"
                    className="w-full border-2 border-primary text-primary hover:bg-primary hover:text-white py-3 text-lg font-semibold rounded-xl transition-all duration-300"
                  >
                    <Zap className="h-5 w-5 mr-2" />
                    اشتري الآن
                  </Button>
                </>
              ) : (
                <Button
                  onClick={() => {
                    console.log('Notification button clicked for product:', product.id);
                    handleNotifyWhenAvailable();
                  }}
                  variant="outline"
                  className="w-full border-2 border-orange-500 text-orange-600 hover:bg-orange-50 py-3 text-lg font-semibold rounded-xl"
                >
                  <Bell className="h-5 w-5 mr-2" />
                  نبهني عند التوفر
                </Button>
              )}
            </div>

            {/* العدادات المباشرة */}
            <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200">
              <CardContent className="p-4">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="space-y-1">
                    <div className="flex items-center justify-center gap-1">
                      <Eye className="h-4 w-4 text-blue-600" />
                      <span className="text-sm text-gray-600">المشاهدات</span>
                    </div>
                    <div className="text-2xl font-bold text-blue-600">
                      {liveViews.toLocaleString()}
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex items-center justify-center gap-1">
                      <ThumbsUp className="h-4 w-4 text-green-600" />
                      <span className="text-sm text-gray-600">الإعجابات</span>
                    </div>
                    <div className="text-2xl font-bold text-green-600">
                      {liveLikes.toLocaleString()}
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex items-center justify-center gap-1">
                      <Package className="h-4 w-4 text-purple-600" />
                      <span className="text-sm text-gray-600">الطلبات</span>
                    </div>
                    <div className="text-2xl font-bold text-purple-600">
                      {liveOrders.toLocaleString()}
                    </div>
                  </div>
                </div>
                
                <div className="mt-3 flex items-center justify-center gap-1 text-xs text-gray-500">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span>العدادات محدثة مباشرة</span>
                </div>
              </CardContent>
            </Card>

            {/* معلومات إضافية */}
            <Card>
              <CardContent className="p-4 space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">التصنيف:</span>
                  <Badge variant="outline">فساتين فاخرة</Badge>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">رمز المنتج:</span>
                  <span className="font-mono text-gray-800">#{product.id}</span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">الحالة:</span>
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${product.inStock && product.isAvailable ? 'bg-green-500' : 'bg-red-500'}`}></div>
                    <span className={product.inStock && product.isAvailable ? 'text-green-600' : 'text-red-600'}>
                      {product.inStock && product.isAvailable ? 'متوفر' : 'غير متوفر'}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* قسم التنبيه للمنتجات غير المتوفرة - يظهر فقط للمنتجات غير المتوفرة */}
            {!product.inStock || !product.isAvailable ? (
              <Card className="bg-orange-50 border border-orange-200">
                <CardContent className="p-4 text-center">
                  <AlertTriangle className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                  <p className="text-orange-800 font-medium mb-3">
                    هذا المنتج غير متوفر حالياً
                  </p>
                  <Button
                    onClick={() => {
                      console.log('Second notification button clicked for product:', product.id);
                      handleNotifyWhenAvailable();
                    }}
                    className="bg-orange-600 hover:bg-orange-700 text-white"
                  >
                    <Bell className="h-4 w-4 mr-2" />
                    نبهني عند التوفر
                  </Button>
                </CardContent>
              </Card>
            ) : null}
          </div>

          {/* رسالة التحقق من الصحة */}
          {validationError && (
            <div className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                {validationError}
              </div>
            </div>
          )}

          {/* منتجات شبيهة */}
          <div className="mt-12 bg-white rounded-2xl shadow-sm border p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">منتجات شبيهة</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {getSimilarProducts(product).slice(0, 4).map((similarProduct) => (
                <div key={similarProduct.id} className="group cursor-pointer" onClick={() => onProductSelect?.(similarProduct)}>
                  <div className="relative overflow-hidden rounded-xl mb-3 bg-gray-100 aspect-square">
                    <img
                      src={similarProduct.images[0]}
                      alt={similarProduct.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {(() => {
                      const badge = getBadgeFromTags(similarProduct.tags);
                      return badge ? (
                        <Badge className={`absolute top-2 right-2 text-white text-xs px-2 py-1 ${getBadgeColor(badge)}`}>
                          {badge}
                        </Badge>
                      ) : null;
                    })()}
                  </div>
                  <h3 className="font-medium text-gray-900 text-sm mb-2 line-clamp-2">{similarProduct.name}</h3>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-primary">{similarProduct.price} د.ل</span>
                    {similarProduct.originalPrice > similarProduct.price && (
                      <span className="text-sm text-gray-500 line-through">{similarProduct.originalPrice} د.ل</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* قسم التعليقات */}
          <div className="mt-12 bg-white rounded-2xl shadow-sm border p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">تعليقات الزوار</h2>

            {/* نموذج إضافة تعليق جديد */}
            <div className="mb-8 p-4 bg-gray-50 rounded-xl">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">أضف تعليقك</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="اسمك"
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                  <input
                    type="email"
                    placeholder="بريدك الإلكتروني"
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                <textarea
                  placeholder="اكتب تعليقك هنا..."
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                ></textarea>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">تقييمك:</span>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        className="text-gray-300 hover:text-yellow-400 transition-colors"
                      >
                        <Star className="h-5 w-5" />
                      </button>
                    ))}
                  </div>
                </div>
                <Button className="bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-lg">
                  إرسال التعليق
                </Button>
              </div>
            </div>

            {/* قائمة التعليقات */}
            <div className="space-y-6">
              {/* تعليق تجريبي 1 */}
              <div className="border-b border-gray-200 pb-6 last:border-b-0">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-primary font-semibold">أ</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-semibold text-gray-900">أحمد محمد</span>
                      <div className="flex gap-1">
                        {renderStarRating(5)}
                      </div>
                      <span className="text-sm text-gray-500">منذ يومين</span>
                    </div>
                    <p className="text-gray-700 leading-relaxed">
                      منتج رائع وجودة عالية جداً. التصميم أنيق والخامة ممتازة.
                      توصي بشرائه بشدة لمن يبحث عن الجودة والأناقة.
                    </p>
                  </div>
                </div>
              </div>

              {/* تعليق تجريبي 2 */}
              <div className="border-b border-gray-200 pb-6 last:border-b-0">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600 font-semibold">ف</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-semibold text-gray-900">فاطمة علي</span>
                      <div className="flex gap-1">
                        {renderStarRating(4)}
                      </div>
                      <span className="text-sm text-gray-500">منذ 3 أيام</span>
                    </div>
                    <p className="text-gray-700 leading-relaxed">
                      سعر مناسب وجودة جيدة. استلمت المنتج بسرعة والتغليف كان ممتاز.
                      سأشتري مرة أخرى من نفس المتجر.
                    </p>
                  </div>
                </div>
              </div>

              {/* تعليق تجريبي 3 */}
              <div className="border-b border-gray-200 pb-6 last:border-b-0">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-semibold">م</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-semibold text-gray-900">مريم حسن</span>
                      <div className="flex gap-1">
                        {renderStarRating(5)}
                      </div>
                      <span className="text-sm text-gray-500">منذ أسبوع</span>
                    </div>
                    <p className="text-gray-700 leading-relaxed">
                      خدمة عملاء ممتازة ومنتج مطابق للصور تماماً.
                      شكراً لمتجر بريتي على هذه الجودة والأناقة.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* زر عرض المزيد من التعليقات */}
            <div className="text-center mt-6">
              <Button variant="outline" className="px-6 py-2">
                عرض المزيد من التعليقات
              </Button>
            </div>
          </div>

        </div>
      </div>

      {/* نافذة نبهني عند التوفر المحلية */}
      {showNotifyModal && (
        <NotifyWhenAvailable
          isOpen={showNotifyModal}
          product={product}
          onClose={handleCloseNotifyModal}
          onSubmit={handleSubmitNotification}
        />
      )}
    </div>
  );
};

// دالة مساعدة لعرض التقييم بالنجوم
const renderStarRating = (rating: number): JSX.Element[] => {
  const stars: JSX.Element[] = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  for (let i = 0; i < fullStars; i++) {
    stars.push(
      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
    );
  }

  if (hasHalfStar) {
    stars.push(
      <Star key="half" className="h-4 w-4 fill-yellow-200 text-yellow-400" />
    );
  }

  const emptyStars = 5 - Math.ceil(rating);
  for (let i = 0; i < emptyStars; i++) {
    stars.push(
      <Star key={`empty-${i}`} className="h-4 w-4 text-gray-300" />
    );
  }

  return stars;
};

export default EnhancedProductPage;