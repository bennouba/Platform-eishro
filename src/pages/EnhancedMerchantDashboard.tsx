// واجهة تحكم التاجر المطورة - منصة إشرو
// Enhanced Merchant Dashboard - EISHRO Platform
// إعادة بناء شاملة من الصفر

import React, { useCallback, useState } from 'react';

// Google Maps API types declaration
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { libyanCities } from '@/data/libya/cities/cities';
import { libyanAreas } from '@/data/libya/areas/areas';
import { libyanBanks } from '@/data/libya/banks/banks';
import { libyanCities as libyanCitiesOnly } from '@/data/libya/cities/cities';
import { LoyaltyProgramView } from '@/components/LoyaltyProgramView';
import { SubscriptionManagementView } from '@/components/SubscriptionManagementView';
import { DigitalWalletView } from '@/components/DigitalWalletView';
import { StoreSettingsView } from '@/components/StoreSettingsView';
import {
    Activity,
    AlertTriangle,
    Archive,
    ArrowLeftRight,
    BarChart3,
    Bell,
    Bot,
    Building,
    Check,
    CheckCircle,
    ChevronDown,
    ChevronLeft,
    ChevronRight,
    Clock,
    Copy,
    CreditCard,
    DollarSign,
    Download,
    Edit,
    ExternalLink,
    Eye,
    FileText,
    Filter,
    Globe,
    HelpCircle,
    Home,
    Image,
    Layers,
    LogOut,
    Mail,
    MapPin,
    Megaphone,
    Menu,
    MessageSquare,
    Minus,
    Package,
    Percent,
    Phone,
    PieChart,
    Plus,
    RefreshCw,
    Save,
    Search,
    Send,
    Settings,
    ShoppingBag,
    ShoppingCart,
    Smartphone,
    Star,
    Store,
    Tag,
    Target,
    Trash2,
    TrendingUp,
    Truck,
    Upload,
    User,
    Users,
    Wifi,
    WifiOff,
    X,
    Zap
  } from 'lucide-react';

type DashboardSection =
  | 'overview'
  | 'orders-manual'
  | 'orders-abandoned'
  | 'orders-unavailable'
  | 'catalog-products'
  | 'catalog-categories'
  | 'catalog-inventory'
  | 'catalog-stock-management'
  | 'catalog-custom-fields'
  | 'customers-groups'
  | 'customers-reviews'
  | 'customers-questions'
  | 'customers-stock-notifications'
  | 'marketing-campaigns'
  | 'marketing-coupons'
  | 'marketing-loyalty'
  | 'analytics-live'
  | 'analytics-sales'
  | 'analytics-inventory'
  | 'analytics-customers'
  | 'analytics-financial'
  | 'finance-subscription'
  | 'finance-wallet'
  | 'settings-store'
  | 'settings-interface'
  | 'settings-pages'
  | 'settings-menu'
  | 'settings-sliders'
  | 'settings-ads'
  | 'pos'
  | 'services'
  | 'customer-service'
  | 'technical-support';

const EnhancedMerchantDashboard: React.FC<{ onLogout?: () => void }> = ({ onLogout }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<DashboardSection>('overview');
  const [ordersExpanded, setOrdersExpanded] = useState(false);
  const [catalogExpanded, setCatalogExpanded] = useState(false);
  const [customersExpanded, setCustomersExpanded] = useState(false);
  const [marketingExpanded, setMarketingExpanded] = useState(false);
  const [analyticsExpanded, setAnalyticsExpanded] = useState(false);
  const [financeExpanded, setFinanceExpanded] = useState(false);
  const [settingsExpanded, setSettingsExpanded] = useState(false);
  const [orderWizardStep, setOrderWizardStep] = useState(1);
  const [orderWizardOpen, setOrderWizardOpen] = useState(false);
  const [productModalOpen, setProductModalOpen] = useState(false);
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [warehouseModalOpen, setWarehouseModalOpen] = useState(false);

  // Filter states for sliders and ads
   const [slidersFilter, setSlidersFilter] = useState('all');
   const [adsFilter, setAdsFilter] = useState('all');
   const [slidersStatusFilter, setSlidersStatusFilter] = useState('all');
   const [adsStatusFilter, setAdsStatusFilter] = useState('all');

   // Slider and Ad modal states
   const [sliderModalOpen, setSliderModalOpen] = useState(false);
   const [adModalOpen, setAdModalOpen] = useState(false);
   const [currentSlider, setCurrentSlider] = useState<any>(null);
   const [currentAd, setCurrentAd] = useState<any>(null);

   // Slider and Ad form states
   const [sliderForm, setSliderForm] = useState({
     title: '',
     description: '',
     link: '',
     image: '',
     order: 0,
     status: 'active'
   });

   const [adForm, setAdForm] = useState({
     name: '',
     image: '',
     link: '',
     order: 0,
     status: 'active',
     location: 'not-specified',
     expiryDate: ''
   });

   // Slider and Ad data
   const [sliders, setSliders] = useState([
     {
       id: 1,
       name: 'البنرات الرئيسية',
       status: 'مفعل',
       date: '2025-10-20',
       slides: 5,
       store: 'نواعم',
       description: 'سلايدر المنتجات المميزة لمتجر نواعم - التاجر مونير',
       views: 1247,
       clicks: 89,
       owner: 'مونير',
       images: [
         '/PictureMerchantPortal/1.png',
         '/PictureMerchantPortal/2.png',
         '/PictureMerchantPortal/3.png',
         '/PictureMerchantPortal/4.png',
         '/PictureMerchantPortal/5.png'
       ]
     },
     {
       id: 2,
       name: 'سلايدر المنتجات المميزة',
       status: 'مفعل',
       date: '2025-10-19',
       slides: 5,
       store: 'نواعم',
       description: 'عرض المنتجات الأكثر مبيعاً في متجر نواعم',
       views: 892,
       clicks: 67,
       owner: 'مونير',
       images: [
         '/PictureMerchantPortal/6.png',
         '/PictureMerchantPortal/7.png',
         '/PictureMerchantPortal/8.png',
         '/PictureMerchantPortal/9.png',
         '/PictureMerchantPortal/10.png'
       ]
     },
     {
       id: 3,
       name: 'سلايدر العروض الخاصة',
       status: 'مفعل',
       date: '2025-10-18',
       slides: 5,
       store: 'نواعم',
       description: 'العروض والتخفيضات الحالية للتاجر مونير',
       views: 654,
       clicks: 45,
       owner: 'مونير',
       images: [
         '/PictureMerchantPortal/1.png',
         '/PictureMerchantPortal/2.png',
         '/PictureMerchantPortal/3.png',
         '/PictureMerchantPortal/4.png',
         '/PictureMerchantPortal/5.png'
       ]
     }
   ]);

   const [ads, setAds] = useState([
     {
       id: 1,
       name: 'دعاية السمعات',
       clicks: 46,
       expiryDate: '2027-04-07',
       status: 'مفعل',
       location: 'الشريط الجانبي للمنتج',
       addDate: '2025-10-15',
       link: 'https://eshro.ly/products/headphones',
       owner: 'مونير',
       store: 'نواعم',
       views: 234,
       ctr: '19.7%',
       image: '/PictureMerchantPortal/1.png'
     },
     {
       id: 2,
       name: 'الدعاية الفردية',
       clicks: 52,
       expiryDate: '2027-01-04',
       status: 'مفعل',
       location: 'غير محدد',
       addDate: '2025-10-10',
       link: 'https://eshro.ly/store/nawaem',
       owner: 'مونير',
       store: 'نواعم',
       views: 189,
       ctr: '27.5%',
       image: '/PictureMerchantPortal/2.png'
     },
     {
       id: 3,
       name: 'الدعاية الثنائية -2-',
       clicks: 35,
       expiryDate: '2027-01-04',
       status: 'مفعل',
       location: 'محدد',
       addDate: '2025-10-08',
       link: 'https://eshro.ly/category/dresses',
       owner: 'مونير',
       store: 'نواعم',
       views: 156,
       ctr: '22.4%',
       image: '/PictureMerchantPortal/3.png'
     },
     {
       id: 4,
       name: 'الدعاية الثنائية -1-',
       clicks: 60,
       expiryDate: '2027-01-04',
       status: 'مفعل',
       location: 'الشريط الجانبي للمنتج',
       addDate: '2025-10-05',
       link: 'https://eshro.ly/products/dress-123',
       owner: 'مونير',
       store: 'نواعم',
       views: 298,
       ctr: '20.1%',
       image: '/PictureMerchantPortal/4.png'
     },
     {
       id: 5,
       name: 'الدعاية الثلاثية 3',
       clicks: 43,
       expiryDate: '2027-01-04',
       status: 'مفعل',
       location: 'غير محدد',
       addDate: '2025-10-01',
       link: 'https://eshro.ly/special-offers',
       owner: 'مونير',
       store: 'نواعم',
       views: 187,
       ctr: '23.0%',
       image: '/PictureMerchantPortal/5.png'
     },
     {
       id: 6,
       name: 'أثاث منزللي',
       clicks: 0,
       expiryDate: '2027-06-04',
       status: 'مسودة',
       location: 'محدد',
       addDate: '2025-10-20',
       link: 'https://eshro.ly/furniture',
       owner: 'مونير',
       store: 'نواعم',
       views: 0,
       ctr: '0%',
       image: '/PictureMerchantPortal/6.png'
     }
   ]);

  // Filter handlers with enhanced functionality
  const handleSlidersFilterChange = (value: string) => {
    setSlidersFilter(value);
    console.log('Sliders filter changed to:', value);
  };

  const handleAdsFilterChange = (value: string) => {
    setAdsFilter(value);
    console.log('Ads filter changed to:', value);
  };

  // Enhanced filtering logic
  const getFilteredSliders = () => {
    let filtered = sliders;

    if (slidersFilter === 'active') {
      filtered = filtered.filter(slider => slider.status === 'مفعل');
    } else if (slidersFilter === 'inactive') {
      filtered = filtered.filter(slider => slider.status === 'غير مفعل');
    } else if (slidersFilter === 'draft') {
      filtered = filtered.filter(slider => slider.status === 'مسودة');
    }

    if (slidersStatusFilter !== 'all') {
      filtered = filtered.filter(slider => slider.status === slidersStatusFilter);
    }

    return filtered;
  };

  const getFilteredAds = () => {
    let filtered = ads;

    if (adsFilter === 'active') {
      filtered = filtered.filter(ad => ad.status === 'مفعل');
    } else if (adsFilter === 'inactive') {
      filtered = filtered.filter(ad => ad.status === 'غير مفعل');
    } else if (adsFilter === 'draft') {
      filtered = filtered.filter(ad => ad.status === 'مسودة');
    }

    if (adsStatusFilter !== 'all') {
      filtered = filtered.filter(ad => ad.status === adsStatusFilter);
    }

    return filtered;
  };

  // Slider handlers
  const handleCreateSlider = () => {
    setSliderForm({
      title: '',
      description: '',
      link: '',
      image: '',
      order: sliders.length + 1,
      status: 'active'
    });
    setSliderModalOpen(true);
  };

  const handleEditSlider = (slider: any) => {
    setCurrentSlider(slider);
    setSliderForm({
      title: slider.name,
      description: slider.description,
      link: '',
      image: '',
      order: 0,
      status: slider.status === 'مفعل' ? 'active' : 'inactive'
    });
    setSliderModalOpen(true);
  };

  const handleDeleteSlider = (sliderId: number) => {
    if (confirm('هل أنت متأكد من حذف هذا السلايدر؟')) {
      setSliders(prev => prev.filter(s => s.id !== sliderId));
    }
  };

  const handleSaveSlider = () => {
    if (!sliderForm.title.trim()) {
      alert('يرجى إدخال عنوان السلايدر');
      return;
    }

    const newSlider = {
      id: currentSlider ? currentSlider.id : Date.now(),
      name: sliderForm.title,
      status: sliderForm.status === 'active' ? 'مفعل' : 'غير مفعل',
      date: new Date().toLocaleDateString('ar-SA'),
      slides: 5,
      store: 'نواعم',
      description: sliderForm.description,
      views: 0,
      clicks: 0,
      owner: 'مونير',
      images: [
        '/PictureMerchantPortal/1.png',
        '/PictureMerchantPortal/2.png',
        '/PictureMerchantPortal/3.png',
        '/PictureMerchantPortal/4.png',
        '/PictureMerchantPortal/5.png'
      ]
    };

    if (currentSlider) {
      setSliders(prev => prev.map(s => s.id === currentSlider.id ? newSlider : s));
    } else {
      setSliders(prev => [...prev, newSlider]);
    }

    setSliderModalOpen(false);
    setCurrentSlider(null);
  };

  // Slider Management Functions
  const [slideModalOpen, setSlideModalOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState<any>(null);
  const [slideForm, setSlideForm] = useState({
    title: '',
    image: '',
    link: '',
    order: 0
  });

  const handleAddSlide = () => {
    setSlideForm({
      title: '',
      image: '',
      link: '',
      order: 0
    });
    setCurrentSlide(null);
    setSlideModalOpen(true);
  };

  const handleEditSlide = (slideIndex: number) => {
    const slider = sliders[0]; // Current active slider
    if (slider && slider.images[slideIndex]) {
      setSlideForm({
        title: `شريحة ${slideIndex + 1}`,
        image: slider.images[slideIndex],
        link: '',
        order: slideIndex
      });
      setCurrentSlide({ sliderId: slider.id, slideIndex });
      setSlideModalOpen(true);
    }
  };

  const handleDeleteSlide = (slideIndex: number) => {
    if (confirm(`هل أنت متأكد من حذف الشريحة رقم ${slideIndex + 1}؟`)) {
      setSliders(prev => prev.map(slider => {
        if (slider.id === 1) { // Update first slider for now
          const newImages = [...slider.images];
          newImages.splice(slideIndex, 1);
          // Add a default image if needed
          if (newImages.length === 0) {
            newImages.push('/PictureMerchantPortal/1.png');
          }
          return { ...slider, images: newImages, slides: newImages.length };
        }
        return slider;
      }));
    }
  };

  const handleSaveSlide = () => {
    if (!slideForm.title.trim()) {
      alert('يرجى إدخال عنوان الشريحة');
      return;
    }

    setSliders(prev => prev.map(slider => {
      if (slider.id === 1) { // Update first slider for now
        const newImages = [...slider.images];
        if (currentSlide) {
          newImages[currentSlide.slideIndex] = slideForm.image || '/PictureMerchantPortal/1.png';
        } else {
          newImages.push(slideForm.image || '/PictureMerchantPortal/1.png');
        }
        return { ...slider, images: newImages, slides: newImages.length };
      }
      return slider;
    }));

    setSlideModalOpen(false);
    setCurrentSlide(null);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // In a real app, you would upload to server and get back the URL
      const imageUrl = URL.createObjectURL(file);
      setSlideForm({ ...slideForm, image: imageUrl });
    }
  };

  // Ad handlers
  const handleCreateAd = () => {
    setAdForm({
      name: '',
      image: '',
      link: '',
      order: ads.length + 1,
      status: 'active',
      location: 'not-specified',
      expiryDate: ''
    });
    setAdModalOpen(true);
  };

  const handleEditAd = (ad: any) => {
    setCurrentAd(ad);
    setAdForm({
      name: ad.name,
      image: ad.image,
      link: ad.link,
      order: 0,
      status: ad.status === 'مفعل' ? 'active' : ad.status === 'مسودة' ? 'draft' : 'inactive',
      location: ad.location === 'غير محدد' ? 'not-specified' : ad.location === 'محدد' ? 'specified' : ad.location,
      expiryDate: ad.expiryDate
    });
    setAdModalOpen(true);
  };

  const handleDeleteAd = (adId: number) => {
    if (confirm('هل أنت متأكد من حذف هذا الإعلان؟')) {
      setAds(prev => prev.filter(a => a.id !== adId));
    }
  };

  const handleSaveAd = () => {
    if (!adForm.name.trim()) {
      alert('يرجى إدخال اسم الإعلان');
      return;
    }

    const newAd = {
      id: currentAd ? currentAd.id : Date.now(),
      name: adForm.name,
      status: adForm.status === 'active' ? 'مفعل' : adForm.status === 'draft' ? 'مسودة' : 'غير مفعل',
      location: adForm.location === 'not-specified' ? 'غير محدد' : adForm.location === 'specified' ? 'محدد' : adForm.location,
      addDate: new Date().toLocaleDateString('ar-SA'),
      link: adForm.link,
      owner: 'مونير',
      store: 'نواعم',
      views: 0,
      clicks: 0,
      ctr: '0%',
      image: adForm.image || '/slider Eishro/hasamat.jpg',
      expiryDate: adForm.expiryDate
    };

    if (currentAd) {
      setAds(prev => prev.map(a => a.id === currentAd.id ? newAd : a));
    } else {
      setAds(prev => [...prev, newAd]);
    }

    setAdModalOpen(false);
    setCurrentAd(null);
  };

  // Header state
  const [systemStatus, setSystemStatus] = useState('online');
  const [unavailableOrdersCount, setUnavailableOrdersCount] = useState(5);
  const [chatbotOpen, setChatbotOpen] = useState(false);
  const [merchantStoreName] = useState('نواعم'); // This should come from user context
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [merchantName] = useState('مونير'); // This should come from user context

  // Product Modal State
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productQuantity, setProductQuantity] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productCategory, setProductCategory] = useState('');
  const [productSKU, setProductSKU] = useState('');

  // Warehouse Modal State
  const [warehouseName, setWarehouseName] = useState('');
  const [warehouseLocation, setWarehouseLocation] = useState('');
  const [warehouseCity, setWarehouseCity] = useState('');
  const [showMapModal, setShowMapModal] = useState(false);
  const [selectedCoordinates, setSelectedCoordinates] = useState<{lat: number, lng: number} | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [googleMap, setGoogleMap] = useState<any>(null);
  const [mapMarker, setMapMarker] = useState<any>(null);
  const [warehouseForm, setWarehouseForm] = useState({
    name: '',
    location: '',
    city: '',
    phone: '',
    email: '',
    manager: '',
    isActive: true,
    priority: 1,
    coordinates: null as {lat: number, lng: number} | null,
  });
  interface Warehouse {
    id: number;
    name: string;
    location: string;
    city: string;
    country: string;
    status: string;
    coordinates?: { lat: number; lng: number } | undefined;
    phone?: string;
    email?: string;
    manager?: string;
    priority?: number;
    isActive?: boolean;
  }

  const [warehouses, setWarehouses] = useState<Warehouse[]>([
    { id: 1, name: 'مخزن طريق المطار', location: 'طريق المطار', city: 'طرابلس', country: 'ليبيا', status: 'نشط', coordinates: { lat: 32.8872, lng: 13.1913 } },
    { id: 2, name: 'مخزن غوط الشعال', location: 'غوط الشعال', city: 'طرابلس', country: 'ليبيا', status: 'نشط', coordinates: { lat: 32.8756, lng: 13.2001 } },
    { id: 3, name: 'مخزن شهداء الشط', location: 'شهداء الشط', city: 'طرابلس', country: 'ليبيا', status: 'نشط', coordinates: { lat: 32.8523, lng: 13.1745 } },
    { id: 4, name: 'مخزن الكريمية', location: 'الكريمية', city: 'طرابلس', country: 'ليبيا', status: 'نشط', coordinates: { lat: 32.8234, lng: 13.1567 } },
    { id: 5, name: 'مخزن قمينس', location: 'قمينس', city: 'بنغازي', country: 'ليبيا', status: 'معطل', coordinates: { lat: 32.1167, lng: 20.0667 } }
  ]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleSectionChange = (section: DashboardSection) => {
    setActiveSection(section);
    if (window.innerWidth < 768) {
      setSidebarOpen(false);
    }
  };

  const handleOrdersToggle = () => {
    setOrdersExpanded(!ordersExpanded);
  };

  const handleCatalogToggle = () => {
    setCatalogExpanded(!catalogExpanded);
  };

  const handleCustomersToggle = () => {
    setCustomersExpanded(!customersExpanded);
  };

  const handleMarketingToggle = () => {
    setMarketingExpanded(!marketingExpanded);
  };

  const handleAnalyticsToggle = () => {
    setAnalyticsExpanded(!analyticsExpanded);
  };

  const handleFinanceToggle = () => {
    setFinanceExpanded(!financeExpanded);
  };

  const handleSettingsToggle = () => {
    setSettingsExpanded(!settingsExpanded);
  };

  const handleCreateWarehouse = () => {
    setWarehouseForm({
      name: '',
      location: '',
      city: '',
      phone: '',
      email: '',
      manager: '',
      isActive: true,
      priority: warehouses.length + 1,
      coordinates: null,
    });
    setSelectedCoordinates(null);
    setGoogleMap(null);
    setMapMarker(null);
    setMapLoaded(false);
    setWarehouseModalOpen(true);
  };

  const handleSaveWarehouse = () => {
    // Check if required fields are filled
    if (!warehouseForm.name.trim()) {
      alert('يرجى إدخال اسم المخزن');
      return;
    }

    if (!warehouseForm.city) {
      alert('يرجى اختيار المدينة');
      return;
    }

    // Allow saving even without coordinates (user can enter manually)
    if (!warehouseForm.coordinates) {
      const confirmWithoutLocation = confirm('لم يتم تحديد موقع المخزن على الخريطة. هل تريد المتابعة بدون تحديد الموقع؟');
      if (!confirmWithoutLocation) {
        return;
      }
    }

    const newWarehouse: Warehouse = {
      id: Date.now(),
      name: warehouseForm.name,
      location: warehouseForm.location,
      city: warehouseForm.city,
      country: 'ليبيا',
      status: warehouseForm.isActive ? 'نشط' : 'معطل',
      coordinates: warehouseForm.coordinates || undefined,
    };

    // إضافة المخزن الجديد للقائمة ✅
    setWarehouses(prev => [...prev, newWarehouse]);
    setWarehouseModalOpen(false);

    // إعادة تعيين الفورم
    setWarehouseForm({
      name: '',
      location: '',
      city: '',
      phone: '',
      email: '',
      manager: '',
      isActive: true,
      priority: warehouses.length + 1,
      coordinates: null,
    });
    setSelectedCoordinates(null);
    setGoogleMap(null);
    setMapMarker(null);
    setMapLoaded(false);

    // رسالة تأكيد جميلة 🎉
    const coordinatesText = warehouseForm.coordinates
      ? `📍 الإحداثيات: ${warehouseForm.coordinates.lat.toFixed(6)}, ${warehouseForm.coordinates.lng.toFixed(6)}`
      : '📍 الموقع: لم يتم تحديده';

    alert(`✅ تم إنشاء المخزن بنجاح!\n\n🏪 اسم المخزن: ${newWarehouse.name}\n📍 الموقع: ${newWarehouse.location}\n🌍 المدينة: ${newWarehouse.city}\n👨‍💼 المدير: ${warehouseForm.manager || 'غير محدد'}\n📞 الهاتف: ${warehouseForm.phone || 'غير محدد'}\n📧 البريد الإلكتروني: ${warehouseForm.email || 'غير محدد'}\n✅ الحالة: ${newWarehouse.status}\n🔢 الأولوية: ${newWarehouse.priority}\n${coordinatesText}`);
  };

  const handleMapLocationSelect = useCallback((coordinates: {lat: number, lng: number}) => {
    setSelectedCoordinates(coordinates);
    setWarehouseForm(prev => ({...prev, coordinates}));
    setShowMapModal(false);
  }, [setSelectedCoordinates, setWarehouseForm, setShowMapModal]);

  const handleMapSearch = () => {
    const searchInput = document.getElementById('map-search') as HTMLInputElement;
    const searchTerm = searchInput?.value;

    if (searchTerm && googleMap) {
      const googleMaps = (window as any).google?.maps;
      if (googleMaps && googleMaps.places) {
        const service = new googleMaps.places.PlacesService(googleMap);

        const request = {
          query: searchTerm + ', Libya',
          fields: ['name', 'geometry', 'formatted_address'],
          language: 'ar'
        };

        service.findPlaceFromQuery(request, (results: any, status: any) => {
          if (status === googleMaps.places.PlacesServiceStatus.OK && results && results[0]) {
            const place = results[0];
            const coordinates = {
              lat: place.geometry.location.lat(),
              lng: place.geometry.location.lng()
            };

            googleMap.setCenter(coordinates);
            googleMap.setZoom(15);
            setSelectedCoordinates(coordinates);

            if (mapMarker) {
              mapMarker.setPosition(coordinates);
            } else {
              const marker = new googleMaps.Marker({
                position: coordinates,
                map: googleMap,
                title: place.name,
                draggable: true,
                animation: googleMaps.Animation.DROP
              });
              setMapMarker(marker);
            }
          } else {
            alert('لم يتم العثور على الموقع. يرجى التأكد من الاسم والمحاولة مرة أخرى.');
          }
        });
      }
    } else {
      alert('يرجى إدخال اسم المكان للبحث عنه');
    }
  };

  const initializeGoogleMap = useCallback(() => {
    try {
      const googleMaps = (window as any).google?.maps;
      if (googleMaps && !googleMap) {
        setMapLoaded(true);
        const mapElement = document.getElementById('google-map');
        if (mapElement) {
          const map = new googleMaps.Map(mapElement, {
            center: { lat: 32.8872, lng: 13.1913 }, // Center of Libya
            zoom: 7,
            mapTypeControl: true,
            streetViewControl: false,
            fullscreenControl: true,
            zoomControl: true,
            gestureHandling: 'greedy',
            mapTypeId: googleMaps.MapTypeId.ROADMAP,
            styles: [
              {
                featureType: 'poi',
                stylers: [{ visibility: 'simplified' }]
              },
              {
                featureType: 'road',
                stylers: [{ visibility: 'simplified' }]
              }
            ]
          });

          setGoogleMap(map);

          // Add click listener to map for immediate location selection
          map.addListener('click', (event: any) => {
            const coordinates = {
              lat: event.latLng.lat(),
              lng: event.latLng.lng()
            };
            setSelectedCoordinates(coordinates);

            // Update or create marker immediately
            if (mapMarker) {
              mapMarker.setPosition(coordinates);
            } else {
              const marker = new googleMaps.Marker({
                position: coordinates,
                map,
                title: 'موقع المخزن المختار',
                draggable: true,
                animation: googleMaps.Animation.DROP
              });
              setMapMarker(marker);
            }
          });

          // Add Libya cities markers with enhanced styling and faster loading
          const libyaCitiesData = [
            { name: 'طرابلس', lat: 32.8872, lng: 13.1913, color: '#EF4444' },
            { name: 'بنغازي', lat: 32.1167, lng: 20.0667, color: '#3B82F6' },
            { name: 'مصراتة', lat: 32.3753, lng: 15.0925, color: '#10B981' },
            { name: 'سبها', lat: 27.0389, lng: 14.4264, color: '#F59E0B' },
            { name: 'الزاوية', lat: 32.7522, lng: 12.7278, color: '#8B5CF6' },
            { name: 'زليتن', lat: 32.4667, lng: 14.5667, color: '#F97316' }
          ];

          // Load city markers faster - reduced delay
          libyaCitiesData.forEach((city, index) => {
            setTimeout(() => {
              const cityMarker = new googleMaps.Marker({
                position: { lat: city.lat, lng: city.lng },
                map,
                title: city.name,
                icon: {
                  path: googleMaps.SymbolPath.CIRCLE,
                  scale: 16,
                  fillColor: city.color,
                  fillOpacity: 1,
                  strokeColor: 'white',
                  strokeWeight: 4,
                },
                animation: googleMaps.Animation.DROP
              });

              cityMarker.addListener('click', () => {
                map.setCenter({ lat: city.lat, lng: city.lng });
                map.setZoom(12);
                handleMapLocationSelect({ lat: city.lat, lng: city.lng });
              });
            }, index * 100); // Reduced delay for faster loading
          });
        }
      } else {
        console.log('Google Maps not loaded yet, retrying...');
        setTimeout(initializeGoogleMap, 150); // Aggressive retry for faster load
      }
    } catch (error) {
      console.error('Error initializing Google Map:', error);
      setMapLoaded(false);
    }
  }, [googleMap, setGoogleMap, setMapLoaded, setMapMarker, setSelectedCoordinates, handleMapLocationSelect, mapMarker]);

  // Preload Google Maps script on mount for faster modal open
  React.useEffect(() => {
    try {
      const googleLoaded = (window as any).google?.maps;
      if (!googleLoaded && !document.getElementById('google-maps-sdk')) {
        const script = document.createElement('script');
        script.id = 'google-maps-sdk';
        script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyB41DRUbKWJHPxaFjMAwdrzWzbVKartNGg&libraries=places&language=ar&region=LY&callback=initGoogleMaps`;
        script.async = true;
        script.defer = true;
        document.head.appendChild(script);
      }
    } catch (error) {
      console.error('Error loading Google Maps script:', error);
    }
  }, []);

  // Initialize map when modal opens with faster loading
  React.useEffect(() => {
    if (showMapModal) {
      setMapLoaded(false);

      // Load Google Maps script if not already loaded
      if (!(window as any).google?.maps) {
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyB41DRUbKWJHPxaFjMAwdrzWzbVKartNGg&libraries=places&language=ar&region=LY&callback=initGoogleMaps`;
        script.async = true;
        script.defer = true;
        document.head.appendChild(script);

        // Global callback for when Google Maps loads
        (window as any).initGoogleMaps = () => {
          console.log('Google Maps loaded successfully');
          initializeGoogleMap();
        };
      } else {
        // Google Maps already loaded, initialize immediately
        initializeGoogleMap();
      }
    }
  }, [showMapModal, initializeGoogleMap]);

  // Global function for Google Maps callback
  (window as any).initGoogleMaps = () => {
    console.log('Google Maps loaded successfully');
  };

  // Fallback function if Google Maps fails to load
  const handleMapError = () => {
    console.error('Failed to load Google Maps');
    setMapLoaded(false);
    // Show error message to user
    alert('⚠️ تعذر تحميل خريطة جوجل مابس\n\nالأسباب المحتملة:\n• مشكلة في الاتصال بالإنترنت\n• تم حجب الخريطة في منطقتك\n• مشكلة مؤقتة في خدمة جوجل\n\nالحلول:\n• تأكد من الاتصال بالإنترنت\n• جرب فتح الخريطة مرة أخرى\n• يمكنك إدخال الإحداثيات يدوياً');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes fade-in {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          .animate-fade-in {
            animation: fade-in 0.5s ease-in-out;
          }
          .animate-slide-in-left {
            animation: slide-in-left 0.3s ease-out;
          }
          .animate-slide-in-right {
            animation: slide-in-right 0.3s ease-out;
          }
          @keyframes slide-in-left {
            from { transform: translateX(-100%); }
            to { transform: translateX(0); }
          }
          @keyframes slide-in-right {
            from { transform: translateX(100%); }
            to { transform: translateX(0); }
          }
          .hover-lift {
            transition: transform 0.2s ease, box-shadow 0.2s ease;
          }
          .hover-lift:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
          }
          .gradient-border {
            position: relative;
            background: linear-gradient(45deg, #667eea 0%, #764ba2 100%);
            padding: 2px;
            border-radius: 8px;
          }
          .gradient-border::before {
            content: '';
            position: absolute;
            top: 2px;
            left: 2px;
            right: 2px;
            bottom: 2px;
            background: white;
            border-radius: 6px;
          }
          .pulse-animation {
            animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
          }
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: .5; }
          }
          .slide-in-right {
            animation: slide-in-right 0.5s ease-out;
          }
          .fade-in-up {
            animation: fade-in-up 0.6s ease-out;
          }
          @keyframes fade-in-up {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .glass-effect {
            background: rgba(255, 255, 255, 0.25);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.18);
          }
          .gradient-text {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }
          .floating-animation {
            animation: floating 3s ease-in-out infinite;
          }
          @keyframes floating {
            0% { transform: translate(0, 0px); }
            50% { transform: translate(0, -10px); }
          }
          .shimmer {
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
            background-size: 200% 100%;
            animation: shimmer 2s infinite;
          }
          @keyframes shimmer {
            0% { background-position: -200% 0; }
            100% { background-position: 200% 0; }
          }
        `
      }} />

      {/* Warehouse Creation Modal */}
      {warehouseModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
          <div className="bg-white rounded-2xl p-6 w-full max-w-2xl mx-4 shadow-2xl border">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">إنشاء مخزن جديد</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setWarehouseModalOpen(false)}
                className="hover:bg-gray-100"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="warehouse-name">اسم المخزن *</Label>
                <Input
                  id="warehouse-name"
                  value={warehouseForm.name}
                  onChange={(e) => setWarehouseForm({ ...warehouseForm, name: e.target.value })}
                  placeholder="أدخل اسم المخزن"
                />
              </div>

              <div>
                <Label htmlFor="warehouse-city">المدينة *</Label>
                <Select
                  value={warehouseForm.city}
                  onValueChange={(value) => {
                    console.log('City selected:', value);
                    setWarehouseForm({ ...warehouseForm, city: value });
                  }}
                >
                  <SelectTrigger className="w-full" id="warehouse-city">
                    <SelectValue placeholder="اختر المدينة" />
                  </SelectTrigger>
                  <SelectContent className="max-h-60 z-[9999]">
                    {libyanCities.map((city) => (
                      <SelectItem key={city.id} value={city.name}>
                        {city.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="warehouse-location">موقع المخزن *</Label>
                <div className="space-y-3">
                  <div className="space-y-3">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setShowMapModal(true)}
                      className="w-full justify-start text-right h-12 border-2 hover:border-blue-400 transition-colors"
                    >
                      <MapPin className="h-4 w-4 mr-2" />
                      {selectedCoordinates ? (
                        <div className="text-right">
                          <div className="font-bold text-green-600">✅ تم تحديد الموقع بنجاح</div>
                          <div className="text-xs text-gray-600">إحداثيات GPS: {selectedCoordinates.lat.toFixed(6)}, {selectedCoordinates.lng.toFixed(6)}</div>
                        </div>
                      ) : (
                        '🗺️ اختر موقع المخزن من الخريطة (مطلوب)'
                      )}
                    </Button>

                    {/* Manual coordinate input as fallback */}
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-sm font-medium text-gray-700 mb-2">أو أدخل الإحداثيات يدوياً:</p>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <Label className="text-xs text-gray-600">خط العرض (Latitude)</Label>
                          <Input
                            type="number"
                            step="any"
                            placeholder="32.8872"
                            className="text-sm"
                            onChange={(e) => {
                              const lat = parseFloat(e.target.value);
                              if (lat) {
                                const newCoordinates = { lat, lng: selectedCoordinates?.lng || 13.1913 };
                                setSelectedCoordinates(newCoordinates);
                                setWarehouseForm(prev => ({ ...prev, coordinates: newCoordinates }));
                              }
                            }}
                          />
                        </div>
                        <div>
                          <Label className="text-xs text-gray-600">خط الطول (Longitude)</Label>
                          <Input
                            type="number"
                            step="any"
                            placeholder="13.1913"
                            className="text-sm"
                            onChange={(e) => {
                              const lng = parseFloat(e.target.value);
                              if (lng) {
                                const newCoordinates = { lat: selectedCoordinates?.lat || 32.8872, lng };
                                setSelectedCoordinates(newCoordinates);
                                setWarehouseForm(prev => ({ ...prev, coordinates: newCoordinates }));
                              }
                            }}
                          />
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">مثال: طرابلس (32.8872, 13.1913)</p>
                    </div>
                  </div>

                  {selectedCoordinates && (
                    <div className="bg-green-50 border border-green-200 p-3 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm font-bold text-green-800">تم تحديد الموقع</span>
                      </div>
                      <div className="grid grid-cols-2 gap-3 text-xs">
                        <div className="bg-white p-2 rounded border">
                          <span className="text-gray-600 block">خط العرض:</span>
                          <span className="font-mono text-gray-800">{selectedCoordinates.lat.toFixed(6)}</span>
                        </div>
                        <div className="bg-white p-2 rounded border">
                          <span className="text-gray-600 block">خط الطول:</span>
                          <span className="font-mono text-gray-800">{selectedCoordinates.lng.toFixed(6)}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <Label htmlFor="warehouse-manager">مدير المخزن</Label>
                <Input
                  id="warehouse-manager"
                  value={warehouseForm.manager}
                  onChange={(e) => setWarehouseForm({ ...warehouseForm, manager: e.target.value })}
                  placeholder="اسم مدير المخزن"
                />
              </div>

              <div>
                <Label htmlFor="warehouse-phone">رقم الهاتف</Label>
                <Input
                  id="warehouse-phone"
                  value={warehouseForm.phone}
                  onChange={(e) => setWarehouseForm({ ...warehouseForm, phone: e.target.value })}
                  placeholder="+218911234567"
                />
              </div>

              <div>
                <Label htmlFor="warehouse-email">البريد الإلكتروني</Label>
                <Input
                  id="warehouse-email"
                  type="email"
                  value={warehouseForm.email}
                  onChange={(e) => setWarehouseForm({ ...warehouseForm, email: e.target.value })}
                  placeholder="warehouse@eshro.com"
                />
              </div>

              <div>
                <Label htmlFor="warehouse-priority">أولوية السحب</Label>
                <Input
                  id="warehouse-priority"
                  type="number"
                  value={warehouseForm.priority}
                  onChange={(e) => setWarehouseForm({ ...warehouseForm, priority: Number(e.target.value) })}
                  placeholder="1"
                />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="warehouse-active"
                  checked={warehouseForm.isActive}
                  onCheckedChange={(checked) => setWarehouseForm({ ...warehouseForm, isActive: checked as boolean })}
                />
                <Label htmlFor="warehouse-active">مخزن نشط</Label>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <Button
                onClick={handleSaveWarehouse}
                className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                disabled={!warehouseForm.name.trim() || !warehouseForm.city}
              >
                <Plus className="h-4 w-4 mr-2" />
                إنشاء المخزن
              </Button>
              <Button
                variant="outline"
                onClick={() => setWarehouseModalOpen(false)}
                className="transition-all duration-200 hover:bg-gray-50"
              >
                إلغاء
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Google Maps Location Selection Modal */}
      {showMapModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
          <div className="bg-white rounded-2xl p-6 w-full max-w-4xl mx-4 shadow-2xl border max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">اختر موقع المخزن من الخريطة</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowMapModal(false)}
                className="hover:bg-gray-100"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-4">
              {/* Search Box */}
              <div className="relative">
                <Input
                  id="map-search"
                  placeholder="ابحث عن الموقع في ليبيا..."
                  className="pr-10"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleMapSearch();
                    }
                  }}
                />
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 cursor-pointer" onClick={handleMapSearch} />
              </div>

              {/* Map Container */}
              <div className="relative bg-gray-100 rounded-lg overflow-hidden" style={{ height: '450px' }}>
                {!mapLoaded ? (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-green-50">
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
                      <h4 className="text-xl font-bold text-gray-800 mb-2">جاري تحميل خريطة Google Maps</h4>
                      <p className="text-gray-600 mb-2">يرجى الانتظار قليلاً...</p>
                      <div className="flex justify-center items-center gap-1 text-sm text-gray-500">
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div
                    id="google-map"
                    className="w-full h-full"
                    style={{ minHeight: '450px' }}
                  ></div>
                )}
              </div>

              {/* Selected Location Info */}
              {selectedCoordinates && (
                <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <h4 className="font-bold text-green-900">✅ تم تحديد الموقع بنجاح!</h4>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                    <div className="bg-white p-2 rounded border">
                      <span className="text-gray-600 block">خط العرض (Latitude):</span>
                      <span className="font-mono font-bold text-gray-800">{selectedCoordinates.lat.toFixed(6)}</span>
                    </div>
                    <div className="bg-white p-2 rounded border">
                      <span className="text-gray-600 block">خط الطول (Longitude):</span>
                      <span className="font-mono font-bold text-gray-800">{selectedCoordinates.lng.toFixed(6)}</span>
                    </div>
                  </div>
                  <div className="mt-3 text-xs text-green-700">
                    📍 سيتم حفظ إحداثيات GPS هذه مع بيانات المخزن
                  </div>
                </div>
              )}

              {/* Map Actions */}
              <div className="flex gap-3">
                <Button
                  onClick={() => setShowMapModal(false)}
                  className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                >
                  <MapPin className="h-4 w-4 mr-2" />
                  تأكيد الموقع المختار
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowMapModal(false)}
                  className="transition-all duration-200 hover:bg-gray-50"
                >
                  إلغاء
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="w-full px-2 sm:px-4 lg:px-6">
          <div className="flex justify-between items-center h-16">
            {/* Logo on the far left edge */}
            <div className="flex items-center flex-shrink-0">
              <img
                src="/eshro-new-logo.png"
                alt="إشرو"
                className="h-12 w-32 object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                  const fallback = document.createElement('div');
                  fallback.className = 'w-32 h-12 bg-primary rounded-xl flex items-center justify-center shadow-lg';
                  fallback.innerHTML = '<svg class="h-7 w-7 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="m2 17 10 5 10-5M2 12l10 5 10-5"/></svg>';
                  (e.target as HTMLImageElement).parentNode?.appendChild(fallback);
                }}
              />
            </div>

            {/* Enhanced Header Icons */}
            <div className="flex items-center space-x-1 sm:space-x-2 flex-shrink-0">
              {/* System Status */}
              <div className="relative">
                <button className={`p-2 rounded-full ${systemStatus === 'online' ? 'text-green-600 hover:bg-green-50' : 'text-red-600 hover:bg-red-50'}`} title="حالة النظام">
                  {systemStatus === 'online' ? <Wifi className="h-5 w-5" /> : <WifiOff className="h-5 w-5" />}
                </button>
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
              </div>

              {/* Unavailable Orders */}
              <div className="relative">
                <button
                  className="p-2 text-orange-600 hover:text-orange-700 hover:bg-orange-50 rounded-full"
                  onClick={() => handleSectionChange('orders-unavailable')}
                  title="طلبات غير متوفرة"
                >
                  <AlertTriangle className="h-5 w-5" />
                  {unavailableOrdersCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-orange-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                      {unavailableOrdersCount}
                    </span>
                  )}
                </button>
              </div>

              {/* Notifications */}
              <div className="relative">
                <button
                  className="p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100 rounded-full"
                  onClick={() => setNotificationsOpen(!notificationsOpen)}
                  title="الإشعارات"
                >
                  <Bell className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                    3
                  </span>
                </button>

                {/* Enhanced Notifications Panel */}
                {notificationsOpen && (
                  <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50 max-h-96 overflow-y-auto">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <h3 className="font-bold text-gray-800">الإشعارات</h3>
                    </div>

                    <div className="space-y-1">
                      <div className="p-3 hover:bg-gray-50 border-r-4 border-r-green-500 cursor-pointer">
                        <p className="text-sm font-medium text-gray-800">طلب جديد</p>
                        <p className="text-xs text-gray-600">أحمد محمد طلب فستان صيفي</p>
                        <p className="text-xs text-gray-500">منذ دقيقة واحدة</p>
                      </div>

                      <div className="p-3 hover:bg-gray-50 border-r-4 border-r-blue-500 cursor-pointer">
                        <p className="text-sm font-medium text-gray-800">تحديث المخزون</p>
                        <p className="text-xs text-gray-600">تم تحديث كمية منتج في المخزن</p>
                        <p className="text-xs text-gray-500">منذ 5 دقائق</p>
                      </div>

                      <div className="p-3 hover:bg-gray-50 border-r-4 border-r-purple-500 cursor-pointer">
                        <p className="text-sm font-medium text-gray-800">تقييم جديد</p>
                        <p className="text-xs text-gray-600">عميل جديد قيم المنتج بـ 5 نجوم</p>
                        <p className="text-xs text-gray-500">منذ 10 دقائق</p>
                      </div>
                    </div>

                    <div className="px-4 py-2 border-t border-gray-100">
                      <button className="w-full text-center text-sm text-blue-600 hover:text-blue-800">
                        عرض جميع الإشعارات
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Shipping Tracking */}
              <button
                className="p-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-full"
                title="تتبع الشحن والتوصيل"
              >
                <Truck className="h-5 w-5" />
              </button>

              {/* Settings Shortcut */}
              <button
                className="p-2 text-purple-600 hover:text-purple-700 hover:bg-purple-50 rounded-full"
                onClick={() => handleSectionChange('settings-store')}
                title="الإعدادات المختصرة"
              >
                <Settings className="h-5 w-5" />
              </button>

              {/* Enhanced Chatbot */}
              <div className="relative">
                <button
                  className="p-2 text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 rounded-full"
                  onClick={() => setChatbotOpen(!chatbotOpen)}
                  title="شات بوت الرد الآلي"
                >
                  <Bot className="h-5 w-5" />
                </button>
                {chatbotOpen && (
                  <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                    <div className="p-4 border-b border-gray-100">
                      <h3 className="font-bold text-gray-800">المساعد الآلي</h3>
                      <p className="text-xs text-gray-600">كيف يمكنني مساعدتك اليوم؟</p>
                    </div>
                    <div className="p-4 max-h-64 overflow-y-auto">
                      <div className="space-y-3">
                        <div className="p-3 bg-indigo-50 rounded-lg">
                          <p className="text-sm text-gray-800">مرحباً! أنا مساعدك الآلي في منصة إشرو</p>
                        </div>
                        <div className="text-center">
                          <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700">
                            ابدأ المحادثة
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Return to Store */}
              <a
                href={`/store/${merchantStoreName}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-green-600 hover:text-green-700 hover:bg-green-50 rounded-full"
                title="العودة للمتجر"
              >
                <Store className="h-5 w-5" />
              </a>

              {/* User Profile & Logout */}
              <div className="flex items-center space-x-1 sm:space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
                  <User className="h-4 w-4 text-white" />
                </div>
                <span className="text-sm font-medium text-gray-700 hidden sm:block">محمد التاجر</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onLogout}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  title="تسجيل خروج"
                >
                  <LogOut className="h-4 w-4 mr-1" />
                  خروج
                </Button>
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={toggleSidebar}
                className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 md:hidden"
              >
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:inset-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`} style={{ top: '64px', height: 'calc(100vh - 64px)' }}>
          <div className="flex flex-col h-full pt-5 pb-4 overflow-y-auto">
            <nav className="flex-1 px-4 space-y-1">
              {/* Overview Section */}
              <div>
                <button
                  onClick={() => handleSectionChange('overview')}
                  className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200 ${
                    activeSection === 'overview'
                      ? 'bg-blue-50 text-blue-700 border-r-4 border-blue-700'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <Home className="ml-3 h-5 w-5" />
                  نظرة عامة
                </button>
              </div>

              {/* Orders Section with Submenu */}
              <div>
                <button
                  onClick={handleOrdersToggle}
                  className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200 ${
                    activeSection.startsWith('orders')
                      ? 'bg-blue-50 text-blue-700 border-r-4 border-blue-700'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <Package className="ml-3 h-5 w-5" />
                  الطلبات
                  <ChevronDown className={`mr-auto h-4 w-4 transition-transform duration-200 ${
                    ordersExpanded ? 'rotate-180' : ''
                  }`} />
                </button>

                {ordersExpanded && (
                  <div className="mt-2 space-y-1 mr-4">
                    <button
                      onClick={() => handleSectionChange('orders-manual')}
                      className={`w-full flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                        activeSection === 'orders-manual'
                          ? 'bg-blue-100 text-blue-800'
                          : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
                      }`}
                    >
                      <Plus className="ml-2 h-4 w-4" />
                      الطلبات اليدوية
                    </button>
                    <button
                      onClick={() => handleSectionChange('orders-abandoned')}
                      className={`w-full flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                        activeSection === 'orders-abandoned'
                          ? 'bg-blue-100 text-blue-800'
                          : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
                      }`}
                    >
                      <ShoppingCart className="ml-2 h-4 w-4" />
                      الطلبات المتروكة
                    </button>
                    <button
                      onClick={() => handleSectionChange('orders-unavailable')}
                      className={`w-full flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                        activeSection === 'orders-unavailable'
                          ? 'bg-blue-100 text-blue-800'
                          : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
                      }`}
                    >
                      <AlertTriangle className="ml-2 h-4 w-4" />
                      الطلبات الغير متوفرة
                    </button>
                  </div>
                )}
              </div>

              {/* Catalog Section with Submenu */}
              <div>
                <button
                  onClick={handleCatalogToggle}
                  className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200 ${
                    activeSection.startsWith('catalog')
                      ? 'bg-blue-50 text-blue-700 border-r-4 border-blue-700'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <Package className="ml-3 h-5 w-5" />
                  الكتالوج
                  <ChevronDown className={`mr-auto h-4 w-4 transition-transform duration-200 ${catalogExpanded ? 'rotate-180' : ''}`} />
                </button>

                {catalogExpanded && (
                  <div className="mt-2 space-y-1 mr-4">
                    <button
                      onClick={() => handleSectionChange('catalog-products')}
                      className={`w-full flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                        activeSection === 'catalog-products'
                          ? 'bg-blue-100 text-blue-800'
                          : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
                      }`}
                    >
                      <ShoppingBag className="ml-2 h-4 w-4" />
                      المنتجات
                    </button>
                    <button
                      onClick={() => handleSectionChange('catalog-categories')}
                      className={`w-full flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                        activeSection === 'catalog-categories'
                          ? 'bg-blue-100 text-blue-800'
                          : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
                      }`}
                    >
                      <Tag className="ml-2 h-4 w-4" />
                      التصنيفات
                    </button>
                    <button
                      onClick={() => handleSectionChange('catalog-inventory')}
                      className={`w-full flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                        activeSection === 'catalog-inventory'
                          ? 'bg-blue-100 text-blue-800'
                          : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
                      }`}
                    >
                      <Archive className="ml-2 h-4 w-4" />
                      المخزون
                    </button>
                    <button
                      onClick={() => handleSectionChange('catalog-stock-management')}
                      className={`w-full flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                        activeSection === 'catalog-stock-management'
                          ? 'bg-blue-100 text-blue-800'
                          : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
                      }`}
                    >
                      <Settings className="ml-2 h-4 w-4" />
                      إدارة تغيير المخزون
                    </button>
                    <button
                      onClick={() => handleSectionChange('catalog-custom-fields')}
                      className={`w-full flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                        activeSection === 'catalog-custom-fields'
                          ? 'bg-blue-100 text-blue-800'
                          : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
                      }`}
                    >
                      <Layers className="ml-2 h-4 w-4" />
                      الحقول المخصصة
                    </button>
                  </div>
                )}
              </div>

              {/* Customers Section with Submenu */}
              <div>
                <button
                  onClick={handleCustomersToggle}
                  className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200 ${
                    activeSection.startsWith('customers')
                      ? 'bg-blue-50 text-blue-700 border-r-4 border-blue-700'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <Users className="ml-3 h-5 w-5" />
                  العملاء
                  <ChevronDown className={`mr-auto h-4 w-4 transition-transform duration-200 ${customersExpanded ? 'rotate-180' : ''}`} />
                </button>

                {customersExpanded && (
                  <div className="mt-2 space-y-1 mr-4">
                    <button
                      onClick={() => handleSectionChange('customers-groups')}
                      className={`w-full flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                        activeSection === 'customers-groups'
                          ? 'bg-blue-100 text-blue-800'
                          : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
                      }`}
                    >
                      <Users className="ml-2 h-4 w-4" />
                      مجموعة العملاء
                    </button>
                    <button
                      onClick={() => handleSectionChange('customers-reviews')}
                      className={`w-full flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                        activeSection === 'customers-reviews'
                          ? 'bg-blue-100 text-blue-800'
                          : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
                      }`}
                    >
                      <Star className="ml-2 h-4 w-4" />
                      التقييمات
                    </button>
                    <button
                      onClick={() => handleSectionChange('customers-questions')}
                      className={`w-full flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                        activeSection === 'customers-questions'
                          ? 'bg-blue-100 text-blue-800'
                          : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
                      }`}
                    >
                      <MessageSquare className="ml-2 h-4 w-4" />
                      الأسئلة
                    </button>
                    <button
                      onClick={() => handleSectionChange('customers-stock-notifications')}
                      className={`w-full flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                        activeSection === 'customers-stock-notifications'
                          ? 'bg-blue-100 text-blue-800'
                          : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
                      }`}
                    >
                      <Bell className="ml-2 h-4 w-4" />
                      إشعارات بالمخزون
                    </button>
                  </div>
                )}
              </div>

              {/* Marketing Section with Submenu */}
              <div>
                <button
                  onClick={handleMarketingToggle}
                  className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200 ${
                    activeSection.startsWith('marketing')
                      ? 'bg-blue-50 text-blue-700 border-r-4 border-blue-700'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <Megaphone className="ml-3 h-5 w-5" />
                  التسويق
                  <ChevronDown className={`mr-auto h-4 w-4 transition-transform duration-200 ${
                    marketingExpanded ? 'rotate-180' : ''
                  }`} />
                </button>

                {marketingExpanded && (
                  <div className="mt-2 space-y-1 mr-4">
                    <button
                      onClick={() => handleSectionChange('marketing-campaigns')}
                      className={`w-full flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                        activeSection === 'marketing-campaigns'
                          ? 'bg-blue-100 text-blue-800'
                          : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
                      }`}
                    >
                      <Megaphone className="ml-2 h-4 w-4" />
                      الحملات التسويقية
                    </button>
                    <button
                      onClick={() => handleSectionChange('marketing-coupons')}
                      className={`w-full flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                        activeSection === 'marketing-coupons'
                          ? 'bg-blue-100 text-blue-800'
                          : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
                      }`}
                    >
                      <Percent className="ml-2 h-4 w-4" />
                      كوبونات الخصم
                    </button>
                    <button
                      onClick={() => handleSectionChange('marketing-loyalty')}
                      className={`w-full flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                        activeSection === 'marketing-loyalty'
                          ? 'bg-blue-100 text-blue-800'
                          : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
                      }`}
                    >
                      <Star className="ml-2 h-4 w-4" />
                      برنامج الولاء
                    </button>
                  </div>
                )}
              </div>

              {/* Analytics Section with Submenu */}
              <div>
                <button
                  onClick={handleAnalyticsToggle}
                  className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200 ${
                    activeSection.startsWith('analytics')
                      ? 'bg-blue-50 text-blue-700 border-r-4 border-blue-700'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <BarChart3 className="ml-3 h-5 w-5" />
                  التحليلات
                  <ChevronDown className={`mr-auto h-4 w-4 transition-transform duration-200 ${
                    analyticsExpanded ? 'rotate-180' : ''
                  }`} />
                </button>

                {analyticsExpanded && (
                  <div className="mt-2 space-y-1 mr-4">
                    <button
                      onClick={() => handleSectionChange('analytics-live')}
                      className={`w-full flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                        activeSection === 'analytics-live'
                          ? 'bg-blue-100 text-blue-800'
                          : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
                      }`}
                    >
                      <Activity className="ml-2 h-4 w-4" />
                      التحليلات المباشرة
                    </button>
                    <button
                      onClick={() => handleSectionChange('analytics-sales')}
                      className={`w-full flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                        activeSection === 'analytics-sales'
                          ? 'bg-blue-100 text-blue-800'
                          : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
                      }`}
                    >
                      <BarChart3 className="ml-2 h-4 w-4" />
                      تقارير المبيعات
                    </button>
                    <button
                      onClick={() => handleSectionChange('analytics-inventory')}
                      className={`w-full flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                        activeSection === 'analytics-inventory'
                          ? 'bg-blue-100 text-blue-800'
                          : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
                      }`}
                    >
                      <Package className="ml-2 h-4 w-4" />
                      تقارير المخزون
                    </button>
                    <button
                      onClick={() => handleSectionChange('analytics-customers')}
                      className={`w-full flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                        activeSection === 'analytics-customers'
                          ? 'bg-blue-100 text-blue-800'
                          : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
                      }`}
                    >
                      <Users className="ml-2 h-4 w-4" />
                      تقارير العملاء
                    </button>
                    <button
                      onClick={() => handleSectionChange('analytics-financial')}
                      className={`w-full flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                        activeSection === 'analytics-financial'
                          ? 'bg-blue-100 text-blue-800'
                          : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
                      }`}
                    >
                      <DollarSign className="ml-2 h-4 w-4" />
                      المالية
                    </button>
                  </div>
                )}
              </div>

              {/* Finance Section with Submenu */}
              <div>
                <button
                  onClick={handleFinanceToggle}
                  className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200 ${
                    activeSection.startsWith('finance')
                      ? 'bg-green-50 text-green-700 border-r-4 border-green-700'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <DollarSign className="ml-3 h-5 w-5" />
                  المالية
                  <ChevronDown className={`mr-auto h-4 w-4 transition-transform duration-200 ${
                    financeExpanded ? 'rotate-180' : ''
                  }`} />
                </button>

                {financeExpanded && (
                  <div className="mt-2 space-y-1 mr-4">
                    <button
                      onClick={() => handleSectionChange('finance-subscription')}
                      className={`w-full flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                        activeSection === 'finance-subscription'
                          ? 'bg-green-100 text-green-800'
                          : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
                      }`}
                    >
                      <CreditCard className="ml-2 h-4 w-4" />
                      إدارة الاشتراك
                    </button>
                    <button
                      onClick={() => handleSectionChange('finance-wallet')}
                      className={`w-full flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                        activeSection === 'finance-wallet'
                          ? 'bg-green-100 text-green-800'
                          : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
                      }`}
                    >
                      <CreditCard className="ml-2 h-4 w-4" />
                      المحفظة
                    </button>
                  </div>
                )}
              </div>

              {/* Settings Section with Submenu */}
              <div>
                <button
                  onClick={handleSettingsToggle}
                  className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200 ${
                    activeSection.startsWith('settings')
                      ? 'bg-purple-50 text-purple-700 border-r-4 border-purple-700'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <Settings className="ml-3 h-5 w-5" />
                  الإعدادات
                  <ChevronDown className={`mr-auto h-4 w-4 transition-transform duration-200 ${
                    settingsExpanded ? 'rotate-180' : ''
                  }`} />
                </button>

                {settingsExpanded && (
                  <div className="mt-2 space-y-1 mr-4">
                    <button
                      onClick={() => handleSectionChange('settings-store')}
                      className={`w-full flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                        activeSection === 'settings-store'
                          ? 'bg-purple-100 text-purple-800'
                          : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
                      }`}
                    >
                      <Home className="ml-2 h-4 w-4" />
                      بيانات المتجر
                    </button>
                    <button
                      onClick={() => handleSectionChange('settings-pages')}
                      className={`w-full flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                        activeSection === 'settings-pages'
                          ? 'bg-purple-100 text-purple-800'
                          : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
                      }`}
                    >
                      <FileText className="ml-2 h-4 w-4" />
                      الصفحات
                    </button>
                    <button
                      onClick={() => handleSectionChange('settings-menu')}
                      className={`w-full flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                        activeSection === 'settings-menu'
                          ? 'bg-purple-100 text-purple-800'
                          : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
                      }`}
                    >
                      <Menu className="ml-2 h-4 w-4" />
                      القائمة
                    </button>
                    <button
                      onClick={() => handleSectionChange('settings-sliders')}
                      className={`w-full flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                        activeSection === 'settings-sliders'
                          ? 'bg-purple-100 text-purple-800'
                          : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
                      }`}
                    >
                      <Image className="ml-2 h-4 w-4" />
                      السلايدرز
                    </button>
                    <button
                      onClick={() => handleSectionChange('settings-ads')}
                      className={`w-full flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                        activeSection === 'settings-ads'
                          ? 'bg-purple-100 text-purple-800'
                          : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
                      }`}
                    >
                      <Megaphone className="ml-2 h-4 w-4" />
                      الإعلانات
                    </button>
                  </div>
                )}
              </div>

              {/* POS */}
              <div>
                <button
                  onClick={() => handleSectionChange('pos')}
                  className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200 ${
                    activeSection === 'pos'
                      ? 'bg-blue-50 text-blue-700 border-r-4 border-blue-700'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <CreditCard className="ml-3 h-5 w-5" />
                  نقاط البيع
                </button>
              </div>

              {/* Services */}
              <div>
                <button
                  onClick={() => handleSectionChange('services')}
                  className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200 ${
                    activeSection === 'services'
                      ? 'bg-blue-50 text-blue-700 border-r-4 border-blue-700'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <Truck className="ml-3 h-5 w-5" />
                  الخدمات
                </button>
              </div>

              {/* Customer Service */}
              <div>
                <button
                  onClick={() => handleSectionChange('customer-service')}
                  className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200 ${
                    activeSection === 'customer-service'
                      ? 'bg-blue-50 text-blue-700 border-r-4 border-blue-700'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <Phone className="ml-3 h-5 w-5" />
                  خدمة العملاء
                </button>
              </div>

              {/* Technical Support */}
              <div>
                <button
                  onClick={() => handleSectionChange('technical-support')}
                  className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200 ${
                    activeSection === 'technical-support'
                      ? 'bg-blue-50 text-blue-700 border-r-4 border-blue-700'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <HelpCircle className="ml-3 h-5 w-5" />
                  الدعم الفني
                </button>
              </div>

              {/* تسجيل الخروج */}
              <div className="mt-auto">
                <button
                  onClick={onLogout}
                  className="w-full flex items-center px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 hover:text-red-700 rounded-lg transition-colors duration-200"
                >
                  <LogOut className="ml-3 h-5 w-5" />
                  تسجيل الخروج
                </button>
              </div>
            </nav>
          </div>
        </aside>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-30 bg-gray-600 bg-opacity-75 md:hidden"
            onClick={toggleSidebar}
          />
        )}

        {/* Main Content */}
        <main className="flex-1">
          <div className="py-6">
            <div className="w-full px-4 sm:px-6 lg:px-8">
              {/* Content based on active section */}
              {activeSection === 'overview' && (
                <div className="space-y-6">
                  {/* Top Welcome + KPIs */}
                  <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-2xl p-8 text-white shadow-2xl">
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="text-3xl font-bold mb-2">مرحباً بك عزيزي، نتمنى لك وقتاً ممتعاً معنا بمنصة إشرو ✨</h2>
                        <p className="text-blue-100 text-lg">لوحة تحكم متطورة لإدارة متجرك الإلكتروني</p>
                      </div>
                      <div className="hidden md:block">
                        <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
                          <ShoppingBag className="h-10 w-10 text-white" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* KPIs strip at top */}
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                    <Card className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 text-white shadow-2xl">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-white/70">معدل الرضا</p>
                            <p className="text-4xl font-extrabold mt-1">98%</p>
                            <div className="mt-2 text-emerald-400 text-xs flex items-center gap-1">
                              <TrendingUp className="h-4 w-4" /> +1.2% هذا الأسبوع
                            </div>
                          </div>
                          <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur flex items-center justify-center">
                            <Star className="h-7 w-7 text-amber-300" />
                          </div>
                        </div>
                      </CardContent>
                      <div className="absolute -bottom-10 -left-10 w-44 h-44 bg-white/5 rounded-full" />
                    </Card>

                    <Card className="relative overflow-hidden bg-gradient-to-br from-emerald-600 to-teal-700 text-white shadow-2xl">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-white/70">الطلبات المكتملة</p>
                            <p className="text-4xl font-extrabold mt-1">45</p>
                            <div className="mt-2 text-white text-xs flex items-center gap-1">
                              <CheckCircle className="h-4 w-4" /> 92% نجاح اليوم
                            </div>
                          </div>
                          <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur flex items-center justify-center">
                            <Package className="h-7 w-7 text-white" />
                          </div>
                        </div>
                      </CardContent>
                      <div className="absolute -bottom-10 -left-10 w-44 h-44 bg-white/10 rounded-full" />
                    </Card>

                    <Card className="relative overflow-hidden bg-gradient-to-br from-fuchsia-600 to-pink-600 text-white shadow-2xl">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-white/70">إجمالي المبيعات</p>
                            <p className="text-4xl font-extrabold mt-1">3,288 د.ل</p>
                            <div className="mt-2 text-white text-xs flex items-center gap-1">
                              <TrendingUp className="h-4 w-4" /> +18% عن الشهر الماضي
                            </div>
                          </div>
                          <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur flex items-center justify-center">
                            <DollarSign className="h-7 w-7 text-white" />
                          </div>
                        </div>
                      </CardContent>
                      <div className="absolute -bottom-10 -left-10 w-44 h-44 bg-white/10 rounded-full" />
                    </Card>

                    <Card className="relative overflow-hidden bg-gradient-to-br from-sky-600 to-blue-700 text-white shadow-2xl">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-white/70">مؤشر الأداء</p>
                            <p className="text-4xl font-extrabold mt-1">94%</p>
                            <div className="mt-2 text-white text-xs flex items-center gap-1">
                              <Zap className="h-4 w-4" /> ثابت خلال 24 ساعة
                            </div>
                          </div>
                          <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur flex items-center justify-center">
                            <Activity className="h-7 w-7 text-white" />
                          </div>
                        </div>
                      </CardContent>
                      <div className="absolute -bottom-10 -left-10 w-44 h-44 bg-white/10 rounded-full" />
                    </Card>
                  </div>

                  {/* Modern Overview (Great UI) */}
                  <section className="space-y-6">
                    <div className="grid grid-cols-1 2xl:grid-cols-3 gap-6">
                      {/* Sales Performance */}
                      <Card className="2xl:col-span-2 overflow-hidden shadow-2xl">
                        <CardHeader>
                          <CardTitle className="flex items-center justify-between">
                            <span className="flex items-center gap-2">
                              <BarChart3 className="h-5 w-5 text-blue-600" />
                              أداء المبيعات الشامل
                            </span>
                            <span className="text-sm text-gray-500">آخر 30 يوم</span>
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                            <div className="p-4 rounded-xl bg-blue-50 border border-blue-100">
                              <p className="text-sm text-blue-700">الإيرادات</p>
                              <p className="text-2xl font-extrabold text-blue-900">12,450 د.ل</p>
                              <p className="text-xs text-blue-600 flex items-center gap-1 mt-1"><TrendingUp className="h-4 w-4" /> +18%</p>
                            </div>
                            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-100">
                              <p className="text-sm text-emerald-700">صافي الربح</p>
                              <p className="text-2xl font-extrabold text-emerald-900">4,250 د.ل</p>
                              <p className="text-xs text-emerald-600 flex items-center gap-1 mt-1"><TrendingUp className="h-4 w-4" /> +9%</p>
                            </div>
                            <div className="p-4 rounded-xl bg-orange-50 border border-orange-100">
                              <p className="text-sm text-orange-700">متوسط قيمة الطلب</p>
                              <p className="text-2xl font-extrabold text-orange-900">145 د.ل</p>
                              <p className="text-xs text-orange-600 mt-1">للعميل</p>
                            </div>
                          </div>
                          {/* Faux area chart */}
                          <div className="relative h-56 rounded-2xl bg-gradient-to-b from-slate-50 to-white border">
                            <div className="absolute inset-0 p-4">
                              <div className="h-full w-full rounded-xl bg-gradient-to-tr from-blue-200/40 via-indigo-200/40 to-purple-200/40"></div>
                            </div>
                            {/* grid lines */}
                            <div className="absolute inset-0 p-4">
                              <div className="h-full w-full grid grid-rows-4 grid-cols-12">
                                {Array.from({length:4}).map((_,i)=> (
                                  <div key={i} className="border-b border-dashed border-slate-200/60" />
                                ))}
                              </div>
                            </div>
                            {/* bars/spark */}
                            <div className="absolute inset-0 p-6 flex items-end gap-2">
                              {Array.from({length:24}).map((_,i)=> (
                                <div key={i} className="flex-1 rounded-md bg-gradient-to-t from-indigo-500 to-blue-400" style={{height: `${30 + Math.round(Math.abs(Math.sin(i/2))*60)}%`, opacity: 0.85}} />
                              ))}
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Orders status + KPI ring */}
                      <Card className="overflow-hidden shadow-2xl">
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <Package className="h-5 w-5 text-purple-600" /> حالة الطلبات
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center gap-6">
                            {/* Donut via conic-gradient */}
                            <div className="relative w-32 h-32">
                              <div className="w-32 h-32 rounded-full" style={{
                                background: 'conic-gradient(#22c55e 0% 60%, #f59e0b 60% 82%, #ef4444 82% 94%, #6b7280 94% 100%)'
                              }} />
                              <div className="absolute inset-0 m-4 rounded-full bg-white" />
                              <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-lg font-extrabold">60%</span>
                              </div>
                            </div>
                            <div className="flex-1 space-y-3">
                              {[
                                {label:'مكتملة', value:45, color:'bg-emerald-500'},
                                {label:'قيد المعالجة', value:12, color:'bg-amber-500'},
                                {label:'ملغية', value:3, color:'bg-red-500'},
                                {label:'في الانتظار', value:8, color:'bg-slate-500'},
                              ].map((s,idx)=> (
                                <div key={idx} className="flex items-center justify-between">
                                  <div className="flex items-center gap-2">
                                    <span className={`w-2.5 h-2.5 rounded-full ${s.color}`}></span>
                                    <span className="text-sm text-gray-700">{s.label}</span>
                                  </div>
                                  <div className="flex items-center gap-3">
                                    <div className="w-28 h-2 bg-slate-200 rounded-full">
                                      <div className={`h-2 rounded-full ${s.color}`} style={{width: `${Math.min(100, s.value)}%`}} />
                                    </div>
                                    <span className="text-sm font-bold">{s.value}</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Orders types – Big Pie charts */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {/* Manual orders */}
                      <Card className="overflow-hidden shadow-2xl">
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <Package className="h-5 w-5 text-blue-600" /> الطلبات اليدوية
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center gap-6">
                            <div className="relative w-48 h-48">
                              <div className="w-48 h-48 rounded-full" style={{background: 'conic-gradient(#22c55e 0% 68%, #f59e0b 68% 88%, #ef4444 88% 100%)'}} />
                              <div className="absolute inset-0 m-6 rounded-full bg-white" />
                              <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-2xl font-extrabold">68%</span>
                              </div>
                            </div>
                            <div className="flex-1 space-y-3">
                              {[{label:'مكتملة', value:32, color:'bg-emerald-500'},{label:'قيد المعالجة', value:12, color:'bg-amber-500'},{label:'ملغية', value:3, color:'bg-red-500'}].map((s,idx)=> (
                                <div key={idx} className="flex items-center justify-between">
                                  <div className="flex items-center gap-2">
                                    <span className={`w-2.5 h-2.5 rounded-full ${s.color}`}></span>
                                    <span className="text-sm text-gray-700">{s.label}</span>
                                  </div>
                                  <span className="font-bold">{s.value}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Abandoned carts */}
                      <Card className="overflow-hidden shadow-2xl">
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <ShoppingCart className="h-5 w-5 text-orange-600" /> الطلبات المتروكة
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center gap-6">
                            <div className="relative w-48 h-48">
                              <div className="w-48 h-48 rounded-full" style={{background: 'conic-gradient(#f59e0b 0% 55%, #ef4444 55% 85%, #6b7280 85% 100%)'}} />
                              <div className="absolute inset-0 m-6 rounded-full bg-white" />
                              <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-2xl font-extrabold">55%</span>
                              </div>
                            </div>
                            <div className="flex-1 space-y-3">
                              {[{label:'استعادت', value:14, color:'bg-amber-500'},{label:'ملغية', value:9, color:'bg-red-500'},{label:'معلقة', value:4, color:'bg-slate-500'}].map((s,idx)=> (
                                <div key={idx} className="flex items-center justify-between">
                                  <div className="flex items-center gap-2">
                                    <span className={`w-2.5 h-2.5 rounded-full ${s.color}`}></span>
                                    <span className="text-sm text-gray-700">{s.label}</span>
                                  </div>
                                  <span className="font-bold">{s.value}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Unavailable orders */}
                      <Card className="overflow-hidden shadow-2xl">
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <AlertTriangle className="h-5 w-5 text-red-600" /> الطلبات غير المتوفرة
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center gap-6">
                            <div className="relative w-48 h-48">
                              <div className="w-48 h-48 rounded-full" style={{background: 'conic-gradient(#ef4444 0% 40%, #f59e0b 40% 70%, #6b7280 70% 100%)'}} />
                              <div className="absolute inset-0 m-6 rounded-full bg-white" />
                              <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-2xl font-extrabold">40%</span>
                              </div>
                            </div>
                            <div className="flex-1 space-y-3">
                              {[{label:'غير متوفرة', value:8, color:'bg-red-500'},{label:'قيد التعويض', value:5, color:'bg-amber-500'},{label:'معلقة', value:2, color:'bg-slate-500'}].map((s,idx)=> (
                                <div key={idx} className="flex items-center justify-between">
                                  <div className="flex items-center gap-2">
                                    <span className={`w-2.5 h-2.5 rounded-full ${s.color}`}></span>
                                    <span className="text-sm text-gray-700">{s.label}</span>
                                  </div>
                                  <span className="font-bold">{s.value}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Secondary insights */}
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                      <Card className="shadow-lg">
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2"><Users className="h-5 w-5 text-blue-600" /> الزوار النشطون</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-end gap-1 h-16 mb-3">
                            {Array.from({length:40}).map((_,i)=> (
                              <div key={i} className="w-1.5 bg-blue-500/80 rounded" style={{height: `${20 + Math.round(Math.abs(Math.cos(i/3))*60)}%`}} />
                            ))}
                          </div>
                          <div className="flex items-center justify-between text-sm text-gray-600">
                            <span>الآن</span>
                            <span>+24.5% نمو أسبوعي</span>
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="shadow-lg">
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2"><Megaphone className="h-5 w-5 text-orange-600" /> الحملات التسويقية</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-2 gap-3">
                            <div className="p-4 rounded-xl bg-orange-50 border border-orange-100 text-center">
                              <p className="text-xs text-orange-700">CTR</p>
                              <p className="text-2xl font-extrabold text-orange-900">3.7%</p>
                            </div>
                            <div className="p-4 rounded-xl bg-sky-50 border border-sky-100 text-center">
                              <p className="text-xs text-sky-700">CPC</p>
                              <p className="text-2xl font-extrabold text-sky-900">0.42</p>
                            </div>
                            <div className="p-4 rounded-xl bg-fuchsia-50 border border-fuchsia-100 text-center">
                              <p className="text-xs text-fuchsia-700">تحويلات</p>
                              <p className="text-2xl font-extrabold text-fuchsia-900">+126</p>
                            </div>
                            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-100 text-center">
                              <p className="text-xs text-emerald-700">العائد</p>
                              <p className="text-2xl font-extrabold text-emerald-900">4,600</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="shadow-lg">
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2"><Target className="h-5 w-5 text-emerald-600" /> نسبة التحويل</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <span className="text-sm">زيارات → سلة</span>
                              <span className="text-sm font-bold">7.2%</span>
                            </div>
                            <div className="w-full h-2 bg-slate-200 rounded-full">
                              <div className="h-2 bg-emerald-500 rounded-full" style={{width:'72%'}} />
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm">سلة → دفع</span>
                              <span className="text-sm font-bold">3.1%</span>
                            </div>
                            <div className="w-full h-2 bg-slate-200 rounded-full">
                              <div className="h-2 bg-emerald-500 rounded-full" style={{width:'31%'}} />
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm">دفع → اكتمال</span>
                              <span className="text-sm font-bold">2.4%</span>
                            </div>
                            <div className="w-full h-2 bg-slate-200 rounded-full">
                              <div className="h-2 bg-emerald-500 rounded-full" style={{width:'24%'}} />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Quick actions */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Button className="h-12 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"><Plus className="h-4 w-4 ml-2" /> إنشاء حملة تسويقية</Button>
                      <Button className="h-12 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700"><Upload className="h-4 w-4 ml-2" /> إضافة منتج جديد</Button>
                      <Button className="h-12" variant="outline"><Download className="h-4 w-4 ml-2" /> تصدير تقرير شهري</Button>
                    </div>
                  </section>

                  {/* Welcome Header (moved to top) */}
                  <div className="hidden bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-2xl p-8 text-white shadow-2xl">
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="text-3xl font-bold mb-2">مرحباً بك عزيزي، نتمنى لك وقتاً ممتعاً معنا بمنصة إشرو ✨</h2>
                        <p className="text-blue-100 text-lg">لوحة تحكم متطورة لإدارة متجرك الإلكتروني</p>
                      </div>
                      <div className="hidden md:block">
                        <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
                          <ShoppingBag className="h-10 w-10 text-white" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Advanced KPIs Strip (moved to top) */}
                  <div className="hidden grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                    <Card className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 text-white shadow-2xl">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-white/70">معدل الرضا</p>
                            <p className="text-4xl font-extrabold mt-1">98%</p>
                            <div className="mt-2 text-emerald-400 text-xs flex items-center gap-1">
                              <TrendingUp className="h-4 w-4" /> +1.2% هذا الأسبوع
                            </div>
                          </div>
                          <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur flex items-center justify-center">
                            <Star className="h-7 w-7 text-amber-300" />
                          </div>
                        </div>
                      </CardContent>
                      <div className="absolute -bottom-10 -left-10 w-44 h-44 bg-white/5 rounded-full" />
                    </Card>

                    <Card className="relative overflow-hidden bg-gradient-to-br from-emerald-600 to-teal-700 text-white shadow-2xl">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-white/70">الطلبات المكتملة</p>
                            <p className="text-4xl font-extrabold mt-1">45</p>
                            <div className="mt-2 text-white text-xs flex items-center gap-1">
                              <CheckCircle className="h-4 w-4" /> 92% نجاح اليوم
                            </div>
                          </div>
                          <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur flex items-center justify-center">
                            <Package className="h-7 w-7 text-white" />
                          </div>
                        </div>
                      </CardContent>
                      <div className="absolute -bottom-10 -left-10 w-44 h-44 bg-white/10 rounded-full" />
                    </Card>

                    <Card className="relative overflow-hidden bg-gradient-to-br from-fuchsia-600 to-pink-600 text-white shadow-2xl">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-white/70">إجمالي المبيعات</p>
                            <p className="text-4xl font-extrabold mt-1">3,288 د.ل</p>
                            <div className="mt-2 text-white text-xs flex items-center gap-1">
                              <TrendingUp className="h-4 w-4" /> +18% عن الشهر الماضي
                            </div>
                          </div>
                          <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur flex items-center justify-center">
                            <DollarSign className="h-7 w-7 text-white" />
                          </div>
                        </div>
                      </CardContent>
                      <div className="absolute -bottom-10 -left-10 w-44 h-44 bg-white/10 rounded-full" />
                    </Card>

                    <Card className="relative overflow-hidden bg-gradient-to-br from-sky-600 to-blue-700 text-white shadow-2xl">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-white/70">مؤشر الأداء</p>
                            <p className="text-4xl font-extrabold mt-1">94%</p>
                            <div className="mt-2 text-white text-xs flex items-center gap-1">
                              <Zap className="h-4 w-4" /> ثابت خلال 24 ساعة
                            </div>
                          </div>
                          <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur flex items-center justify-center">
                            <Activity className="h-7 w-7 text-white" />
                          </div>
                        </div>
                      </CardContent>
                      <div className="absolute -bottom-10 -left-10 w-44 h-44 bg-white/10 rounded-full" />
                    </Card>
                  </div>

                  <div className="hidden">
                  {/* Legacy overview (hidden) */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <Card className="hover-lift border-l-4 border-l-blue-500 shadow-lg">
                      <CardContent className="p-6">
                        <div className="flex items-center">
                          <div className="p-3 bg-blue-100 rounded-xl">
                            <Eye className="h-7 w-7 text-blue-600" />
                          </div>
                          <div className="mr-4 flex-1">
                            <p className="text-sm font-medium text-gray-600 mb-1">الزيارات</p>
                            <p className="text-3xl font-bold text-gray-900 mb-1">800</p>
                            <div className="flex items-center text-sm text-green-600">
                              <TrendingUp className="h-4 w-4 ml-1" />
                              <span>+12% من الشهر الماضي</span>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">هذا الشهر</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="hover-lift border-l-4 border-l-green-500 shadow-lg">
                      <CardContent className="p-6">
                        <div className="flex items-center">
                          <div className="p-3 bg-green-100 rounded-xl">
                            <ShoppingCart className="h-7 w-7 text-green-600" />
                          </div>
                          <div className="mr-4 flex-1">
                            <p className="text-sm font-medium text-gray-600 mb-1">الطلبات</p>
                            <p className="text-3xl font-bold text-gray-900 mb-1">11</p>
                            <div className="flex items-center text-sm text-green-600">
                              <TrendingUp className="h-4 w-4 ml-1" />
                              <span>+3 طلبات جديدة</span>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">طلبات جديدة</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="hover-lift border-l-4 border-l-purple-500 shadow-lg">
                      <CardContent className="p-6">
                        <div className="flex items-center">
                          <div className="p-3 bg-purple-100 rounded-xl">
                            <DollarSign className="h-7 w-7 text-purple-600" />
                          </div>
                          <div className="mr-4 flex-1">
                            <p className="text-sm font-medium text-gray-600 mb-1">المبيعات</p>
                            <p className="text-3xl font-bold text-gray-900 mb-1">3,288.27 د.ل</p>
                            <div className="flex items-center text-sm text-green-600">
                              <TrendingUp className="h-4 w-4 ml-1" />
                              <span>+18% من الشهر الماضي</span>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">إجمالي المبيعات</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="hover-lift border-l-4 border-l-orange-500 shadow-lg">
                      <CardContent className="p-6">
                        <div className="flex items-center">
                          <div className="p-3 bg-orange-100 rounded-xl">
                            <Target className="h-7 w-7 text-orange-600" />
                          </div>
                          <div className="mr-4 flex-1">
                            <p className="text-sm font-medium text-gray-600 mb-1">نسبة التحويل</p>
                            <p className="text-3xl font-bold text-gray-900 mb-1">1.40%</p>
                            <div className="flex items-center text-sm text-green-600">
                              <TrendingUp className="h-4 w-4 ml-1" />
                              <span>+0.2% تحسن في الأداء</span>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">معدل التحويل</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Current Visitors & Geographic Distribution */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Current Visitors */}
                    <Card className="shadow-lg">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Users className="h-5 w-5 text-blue-600" />
                          الزوار الحاليون
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-center mb-4">
                          <p className="text-3xl font-bold text-gray-900 mb-1">1</p>
                          <p className="text-sm text-gray-600">زائر نشط الآن</p>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                              <span className="text-sm">زائر متجرك الحاليون</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Geographic Distribution */}
                    <Card className="shadow-lg">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <MapPin className="h-5 w-5 text-green-600" />
                          التوزيع الجغرافي
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-sm">ليبيا - طرابلس</span>
                            <div className="flex items-center gap-2">
                              <div className="w-20 bg-gray-200 rounded-full h-2">
                                <div className="bg-green-500 h-2 rounded-full" style={{ width: '100%' }}></div>
                              </div>
                              <span className="text-sm font-medium">100%</span>
                            </div>
                          </div>
                          <Button variant="outline" size="sm" className="w-full">
                            عرض التفاصيل
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Store Preview & Marketing Section */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Store Preview */}
                    <Card className="shadow-lg">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Eye className="h-5 w-5 text-purple-600" />
                          معاينة المتجر
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-600 mb-4">كيف يبدو متجرك للعملاء</p>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center bg-gray-50">
                          <Smartphone className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                          <p className="text-gray-500 mb-4">معاينة المتجر</p>
                          <div className="flex gap-2 justify-center">
                            <Button size="sm" variant="outline">
                              <Eye className="h-4 w-4 mr-2" />
                              معاينة المتجر
                            </Button>
                            <Button size="sm">
                              <Globe className="h-4 w-4 mr-2" />
                              فتح مباشر
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Marketing Section */}
                    <Card className="shadow-lg">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Megaphone className="h-5 w-5 text-orange-600" />
                          لا تنتقل بين المنصات الإعلانية
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-600 mb-4">اربط بكل سهولة، وبناءً على كل حملاتك في مكان واحد</p>
                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div className="text-center p-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg">
                            <p className="text-2xl font-bold">7,571</p>
                            <p className="text-xs">د.ل إجمالي</p>
                          </div>
                          <div className="text-center p-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg">
                            <p className="text-2xl font-bold">4,600</p>
                            <p className="text-xs">د.ل صافي</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Weekly Sales & Peak Hours */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Weekly Sales */}
                    <Card className="shadow-lg">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <BarChart3 className="h-5 w-5 text-blue-600" />
                          المبيعات الأسبوعية
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-600 mb-4">تتبع مبيعاتك اليومية</p>
                        <div className="space-y-3">
                          {['السبت', 'الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة'].map((day, index) => (
                            <div key={day} className="flex items-center justify-between">
                              <span className="text-sm">{day}</span>
                              <div className="flex items-center gap-2">
                                <div className="w-24 bg-gray-200 rounded-full h-2">
                                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${Math.random() * 100}%` }}></div>
                                </div>
                                <span className="text-sm font-medium w-12 text-right">{Math.floor(Math.random() * 1000)} د.ل</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    {/* Peak Hours */}
                    <Card className="shadow-lg">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Clock className="h-5 w-5 text-green-600" />
                          الزيارات اليومية
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-600 mb-4">توقيتات الذروة</p>
                        <div className="space-y-3">
                          {Array.from({ length: 12 }, (_, i) => i + 8).map((hour) => (
                            <div key={hour} className="flex items-center justify-between">
                              <span className="text-sm">{hour}:00</span>
                              <div className="flex items-center gap-2">
                                <div className="w-24 bg-gray-200 rounded-full h-2">
                                  <div className="bg-green-500 h-2 rounded-full" style={{ width: `${Math.random() * 100}%` }}></div>
                                </div>
                                <span className="text-sm font-medium w-8 text-right">{Math.floor(Math.random() * 50)}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Top Products & Monthly Profits */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Top Products */}
                    <Card className="shadow-lg">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Star className="h-5 w-5 text-yellow-600" />
                          أفضل المنتجات
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-600 mb-4">حسب التصنيف</p>
                        <div className="space-y-3">
                          {[
                            { name: 'فستان صيفي أنيق', category: 'ملابس نسائية', sales: 45 },
                            { name: 'حقيبة جلد طبيعي', category: 'إكسسوارات', sales: 32 },
                            { name: 'عطر فرنسي أصلي', category: 'عطور', sales: 28 },
                            { name: 'ساعة ذكية', category: 'إلكترونيات', sales: 19 }
                          ].map((product, index) => (
                            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                              <div>
                                <p className="font-medium text-sm">{product.name}</p>
                                <p className="text-xs text-gray-600">{product.category}</p>
                              </div>
                              <div className="text-right">
                                <p className="font-bold text-sm">{product.sales}</p>
                                <p className="text-xs text-gray-600">مبيع</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    {/* Monthly Profits */}
                    <Card className="shadow-lg">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <TrendingUp className="h-5 w-5 text-green-600" />
                          الأرباح الشهرية
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-600 mb-4">الإيرادات مقابل التكاليف</p>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <span className="text-sm">الإيرادات</span>
                            <span className="font-bold text-green-600">12,450 د.ل</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm">التكاليف</span>
                            <span className="font-bold text-red-600">8,200 د.ل</span>
                          </div>
                          <div className="border-t pt-3">
                            <div className="flex items-center justify-between">
                              <span className="font-medium">صافي الربح</span>
                              <span className="font-bold text-2xl text-green-600">4,250 د.ل</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Order Status & Performance */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Order Status */}
                    <Card className="shadow-lg">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Package className="h-5 w-5 text-blue-600" />
                          حالة الطلبات
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-600 mb-4">التوزيع الحالي</p>
                        <div className="space-y-3">
                          {[
                            { status: 'مكتملة', count: 45, color: 'bg-green-500' },
                            { status: 'قيد المعالجة', count: 12, color: 'bg-yellow-500' },
                            { status: 'ملغية', count: 3, color: 'bg-red-500' },
                            { status: 'في الانتظار', count: 8, color: 'bg-gray-500' }
                          ].map((item, index) => (
                            <div key={index} className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                                <span className="text-sm">{item.status}</span>
                              </div>
                              <span className="font-bold">{item.count}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    {/* Performance */}
                    <Card className="shadow-lg">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Activity className="h-5 w-5 text-purple-600" />
                          الأداء المباشر
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-center mb-4">
                          <p className="text-4xl font-bold text-purple-600 mb-1">94%</p>
                          <p className="text-sm text-gray-600">مؤشر الأداء الحالي</p>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm">الأداء</span>
                            <div className="flex items-center gap-2">
                              <div className="w-20 bg-gray-200 rounded-full h-2">
                                <div className="bg-purple-500 h-2 rounded-full" style={{ width: '94%' }}></div>
                              </div>
                              <span className="text-sm font-medium">94%</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Libya Interactive Map */}
                  <Card className="shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <MapPin className="h-5 w-5 text-green-600" />
                        خريطة ليبيا التفاعلية
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 mb-4">توزيع الطلبات والعملاء حسب المناطق</p>
                      <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-lg p-8 text-center border-2 border-dashed border-green-300">
                        <Globe className="h-16 w-16 text-green-400 mx-auto mb-4" />
                        <h3 className="text-lg font-bold text-gray-800 mb-2">خريطة ليبيا التفاعلية</h3>
                        <p className="text-gray-600 mb-4">عرض تفاعلي لتوزيع العملاء والطلبات حسب المدن والمناطق الليبية</p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                          <div className="bg-white p-3 rounded-lg shadow-sm">
                            <p className="font-bold text-green-600">127</p>
                            <p className="text-gray-600">عميل نشيط</p>
                          </div>
                          <div className="bg-white p-3 rounded-lg shadow-sm">
                            <p className="font-bold text-blue-600">89</p>
                            <p className="text-gray-600">طلب جديد</p>
                          </div>
                          <div className="bg-white p-3 rounded-lg shadow-sm">
                            <p className="font-bold text-purple-600">456</p>
                            <p className="text-gray-600">إجمالي الطلبات</p>
                          </div>
                          <div className="bg-white p-3 rounded-lg shadow-sm">
                            <p className="font-bold text-orange-600">94%</p>
                            <p className="text-gray-600">معدل النجاح</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Live Activity & Company Info */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Live Visitors */}
                    <Card className="shadow-lg">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Eye className="h-5 w-5 text-blue-600" />
                          الزوار الحاليين
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-center mb-4">
                          <p className="text-3xl font-bold text-blue-600 mb-1">47</p>
                          <p className="text-sm text-gray-600">زائر نشيط الآن</p>
                        </div>
                        <div className="space-y-2 max-h-48 overflow-y-auto">
                          {[
                            { name: 'أحمد محمد', location: 'طرابلس', page: 'الصفحة الرئيسية', time: '26 د' },
                            { name: 'فاطمة علي', location: 'بنغازي', page: 'المنتجات', time: '23 د' },
                            { name: 'عمر حسن', location: 'مصراتة', page: 'فئة الإلكترونيات', time: '9 د' },
                            { name: 'مريم أحمد', location: 'سبها', page: 'العروض', time: '9 د' },
                            { name: 'يوسف محمود', location: 'الزاوية', page: 'سلة التسوق', time: '28 د' }
                          ].map((visitor, index) => (
                            <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                              <div>
                                <p className="font-medium text-sm">{visitor.name}</p>
                                <p className="text-xs text-gray-600">{visitor.location} • {visitor.page}</p>
                              </div>
                              <span className="text-xs text-gray-500">{visitor.time}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    {/* Live Activity */}
                    <Card className="shadow-lg">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Activity className="h-5 w-5 text-green-600" />
                          نشاط مباشر
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                            <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                            <div>
                              <p className="text-sm">عمر من طرابلس أضاف منتج للسلة</p>
                              <p className="text-xs text-gray-600">منذ دقيقة واحدة</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                            <div>
                              <p className="text-sm">فاطمة من بنغازي تتصفح المنتجات</p>
                              <p className="text-xs text-gray-600">منذ 3 دقائق</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg">
                            <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                            <div>
                              <p className="text-sm">محمد من مصراتة أتم عملية شراء</p>
                              <p className="text-xs text-gray-600">منذ 5 دقائق</p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Company Information */}
                  <Card className="shadow-lg bg-gradient-to-r from-gray-900 to-gray-800 text-white">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-white">
                        <Building className="h-5 w-5" />
                        موقع منصة إشرو - الرئيس العالمي
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h3 className="font-bold text-lg mb-3">منصة التجارة الإلكترونية الرائدة في ليبيا وشمال أفريقيا</h3>
                          <p className="text-gray-300 mb-4">
                            شركة إشرو للتجارة الإلكترونية نقدم حلول تقنية متقدمة للتجار والعملاء مع خدمة عملاء استثنائية على مدار الساعة.
                          </p>
                          <div className="space-y-2 text-sm">
                            <div className="flex items-center gap-2">
                              <MapPin className="h-4 w-4 text-gray-400" />
                              <span>طرابلس، ليبيا - منطقة الدائرة السابعة</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Phone className="h-4 w-4 text-gray-400" />
                              <span>+218 91 234 5678</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Mail className="h-4 w-4 text-gray-400" />
                              <span>info@eshro.com</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4 text-gray-400" />
                              <span>السبت - الخميس: 9:00 - 15:00</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="bg-white/10 rounded-lg p-6">
                            <Globe className="h-12 w-12 mx-auto mb-3 text-white" />
                            <h4 className="font-bold mb-2">الموقع التفاعلي</h4>
                            <p className="text-sm text-gray-300 mb-4">شركة إشرو - طرابلس، ليبيا</p>
                            <p className="text-xs text-gray-400 mb-3">📍 الموقع الدقيق: طرابلس، ليبيا</p>
                            <p className="text-xs text-gray-400">🌍 إحداثيات: 32.8872° N, 13.1913° E</p>
                          </div>
                        </div>
                      </div>
                      <div className="mt-6 pt-6 border-t border-gray-700 text-center">
                        <div className="flex items-center justify-center gap-4">
                          <div className="text-center">
                            <p className="text-2xl font-bold text-green-400">24/7</p>
                            <p className="text-xs text-gray-400">خدمة العملاء</p>
                          </div>
                          <div className="text-center">
                            <p className="text-2xl font-bold text-blue-400">10k+</p>
                            <p className="text-xs text-gray-400">عميل نشط</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                </div>
              )}

              {/* Orders Manual Section */}
              {activeSection === 'orders-manual' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-gray-900">الطلبات اليدوية</h2>
                    <Button
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                      onClick={() => setOrderWizardOpen(true)}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      إنشاء طلب جديد
                    </Button>
                  </div>

                  {/* Order Wizard */}
                  {orderWizardOpen && (
                    <Card className="shadow-lg">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Package className="h-5 w-5 text-blue-600" />
                          إنشاء طلب جديد
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        {/* Progress Steps */}
                        <div className="flex items-center justify-center mb-8">
                          {[1, 2, 3, 4].map((step) => (
                            <div key={step} className="flex items-center">
                              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${
                                step === orderWizardStep
                                  ? 'bg-blue-600 text-white'
                                  : step < orderWizardStep
                                  ? 'bg-green-600 text-white'
                                  : 'bg-gray-200 text-gray-600'
                              }`}>
                                {step < orderWizardStep ? <Check className="h-5 w-5" /> : step}
                              </div>
                              {step < 4 && (
                                <div className={`w-16 h-1 mx-2 ${
                                  step < orderWizardStep ? 'bg-green-600' : 'bg-gray-200'
                                }`}></div>
                              )}
                            </div>
                          ))}
                        </div>

                        {/* Step 1: Order Info */}
                        {orderWizardStep === 1 && (
                          <div className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div>
                                <Label htmlFor="order-id">رقم الطلب</Label>
                                <Input id="order-id" value="ORD-1760405058067" readOnly className="bg-gray-50" />
                              </div>
                              <div>
                                <Label htmlFor="order-date">التاريخ</Label>
                                <Input id="order-date" value="10/14/2025" readOnly className="bg-gray-50" />
                              </div>
                              <div>
                                <Label htmlFor="order-time">الوقت</Label>
                                <Input id="order-time" value="03:24 AM" readOnly className="bg-gray-50" />
                              </div>
                              <div>
                                <Label htmlFor="order-status">الحالة</Label>
                                <Select>
                                  <SelectTrigger>
                                    <SelectValue placeholder="جديد" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="new">جديد</SelectItem>
                                    <SelectItem value="processing">قيد المعالجة</SelectItem>
                                    <SelectItem value="completed">مكتمل</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                            <div className="space-y-6">
                              <div className="flex items-center justify-between">
                                <h3 className="text-lg font-bold">إضافة المنتجات</h3>
                                <Button variant="outline" size="sm">
                                  <Plus className="h-4 w-4 mr-2" />
                                  اختر منتج لإضافته
                                </Button>
                              </div>
                              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                                <Package className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                                <p className="text-gray-600">اختر المنتجات من متجرك في منصة إشرو</p>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Step 3: Customer Info */}
                        {orderWizardStep === 3 && (
                          <div className="space-y-6">
                            <h3 className="text-lg font-bold">معلومات العميل</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div>
                                <Label htmlFor="customer-name">اسم العميل الكامل</Label>
                                <Input id="customer-name" placeholder="أدخل اسم العميل" />
                              </div>
                              <div>
                                <Label htmlFor="customer-email">البريد الإلكتروني</Label>
                                <Input id="customer-email" type="email" placeholder="customer@example.com" />
                              </div>
                              <div>
                                <Label htmlFor="customer-phone">رقم الهاتف</Label>
                                <Input id="customer-phone" placeholder="+218912345678" />
                              </div>
                              <div>
                                <Label htmlFor="customer-city">المدينة</Label>
                                <Select>
                                  <SelectTrigger>
                                    <SelectValue placeholder="اختر المدينة" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {libyanCities.slice(0, 10).map((city) => (
                                      <SelectItem key={city.id} value={city.id}>
                                        {city.name}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                              <div className="md:col-span-2">
                                <Label htmlFor="customer-address">عنوان التوصيل</Label>
                                <Input id="customer-address" placeholder="شارع الجمهورية" />
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Step 4: Payment & Shipping */}
                        {orderWizardStep === 4 && (
                          <div className="space-y-6">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                              {/* Payment Method */}
                              <div className="space-y-4">
                                <h3 className="text-lg font-bold">طريقة الدفع</h3>
                                <Select>
                                  <SelectTrigger>
                                    <SelectValue placeholder="اختر طريقة الدفع" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="bank-transfer">تحويل مصرفي</SelectItem>
                                    <SelectItem value="cash-on-delivery">عند الاستلام</SelectItem>
                                    <SelectItem value="installments">أقساط</SelectItem>
                                    <SelectItem value="wallet">محفظة</SelectItem>
                                  </SelectContent>
                                </Select>

                                <div>
                                  <Label htmlFor="bank-select">المصرف</Label>
                                  <Select>
                                    <SelectTrigger>
                                      <SelectValue placeholder="اختر المصرف" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {libyanBanks.slice(0, 5).map((bank, index) => (
                                        <SelectItem key={index} value={String(bank)}>
                                          {String(bank)}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                </div>

                                <div>
                                  <Label htmlFor="account-holder">اسم صاحب الحساب</Label>
                                  <Input id="account-holder" placeholder="أحمد محمد" />
                                </div>

                                <div>
                                  <Label htmlFor="transaction-status">حالة العملية</Label>
                                  <Select>
                                    <SelectTrigger>
                                      <SelectValue placeholder="اختر الحالة" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="pending">قيد المعالجة</SelectItem>
                                      <SelectItem value="completed">نفذت مباشرة</SelectItem>
                                      <SelectItem value="waiting">تحت الانتظار</SelectItem>
                                      <SelectItem value="done">مكتملة</SelectItem>
                                      <SelectItem value="cancelled">ملغية</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                              </div>

                              {/* Shipping Method */}
                              <div className="space-y-4">
                                <h3 className="text-lg font-bold">طريقة الشحن</h3>
                                <Select>
                                  <SelectTrigger>
                                    <SelectValue placeholder="اختر طريقة الشحن" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="no-shipping">لا يتطلب شحن</SelectItem>
                                    <SelectItem value="standard">شحن توصيل عادي</SelectItem>
                                    <SelectItem value="express">شحن وتوصيل سريع</SelectItem>
                                    <SelectItem value="pickup">الاستلام من الموقع</SelectItem>
                                  </SelectContent>
                                </Select>

                                <div>
                                  <Label htmlFor="delivery-time">الوقت المتوقع للاستلام</Label>
                                  <Input id="delivery-time" placeholder="أدخل الوقت المتوقع" />
                                </div>

                                <div>
                                  <Label htmlFor="customer-notes">ملاحظات العميل</Label>
                                  <Textarea id="customer-notes" placeholder="ملاحظات العميل" rows={3} />
                                </div>

                                <div>
                                  <Label htmlFor="internal-notes">ملاحظات داخلية</Label>
                                  <Textarea id="internal-notes" placeholder="ملاحظات داخلية" rows={3} />
                                </div>
                              </div>
                            </div>

                            {/* Order Summary */}
                            <Card className="bg-gray-50">
                              <CardHeader>
                                <CardTitle className="text-lg">ملخص الطلب</CardTitle>
                              </CardHeader>
                              <CardContent>
                                <div className="space-y-3">
                                  <div className="flex justify-between">
                                    <span>قيمة المنتجات</span>
                                    <span className="font-bold">850 د.ل</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span>رسوم الشحن</span>
                                    <span className="font-bold">0.00 د.ل</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span>الضرائب</span>
                                    <span className="font-bold">0.00 د.ل</span>
                                  </div>
                                  <div className="border-t pt-3">
                                    <div className="flex justify-between text-lg font-bold">
                                      <span>المجموع الكلي</span>
                                      <span className="text-blue-600">850 د.ل</span>
                                    </div>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          </div>
                        )}

                        {/* Navigation Buttons */}
                        <div className="flex justify-between mt-8">
                          <Button
                            variant="outline"
                            onClick={() => setOrderWizardStep(Math.max(1, orderWizardStep - 1))}
                            disabled={orderWizardStep === 1}
                          >
                            السابق
                          </Button>

                          <div className="flex gap-2">
                            <Button variant="outline" onClick={() => setOrderWizardOpen(false)}>
                              إلغاء
                            </Button>

                            {orderWizardStep < 4 ? (
                              <Button
                                className="bg-blue-600 hover:bg-blue-700"
                                onClick={() => setOrderWizardStep(orderWizardStep + 1)}
                              >
                                التالي
                              </Button>
                            ) : (
                              <Button className="bg-green-600 hover:bg-green-700">
                                <Save className="h-4 w-4 mr-2" />
                                حفظ الطلب
                              </Button>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Orders Statistics */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className="shadow-lg">
                      <CardContent className="p-6">
                        <div className="text-center">
                          <p className="text-3xl font-bold text-blue-600 mb-1">1,234</p>
                          <p className="text-sm text-gray-600">إجمالي الطلبات</p>
                          <div className="flex items-center justify-center text-sm text-green-600 mt-2">
                            <TrendingUp className="h-4 w-4 mr-1" />
                            <span>+12% من الشهر الماضي</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="shadow-lg">
                      <CardContent className="p-6">
                        <div className="text-center">
                          <p className="text-3xl font-bold text-green-600 mb-1">987</p>
                          <p className="text-sm text-gray-600">الطلبات المكتملة</p>
                          <p className="text-sm text-gray-600 mt-1">معدل الإنجاز: 80%</p>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="shadow-lg">
                      <CardContent className="p-6">
                        <div className="text-center">
                          <p className="text-3xl font-bold text-orange-600 mb-1">156</p>
                          <p className="text-sm text-gray-600">طلبات قيد المعالجة</p>
                          <p className="text-sm text-gray-600 mt-1">يحتاج للمتابعة</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Recent Orders Table */}
                  <Card className="shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Package className="h-5 w-5 text-blue-600" />
                        الطلبات الحديثة
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-4 mb-6">
                        <Button variant="outline" size="sm">
                          <Filter className="h-4 w-4 mr-2" />
                          تصفية
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-2" />
                          تصدير
                        </Button>
                      </div>

                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b">
                              <th className="text-right p-3 font-medium">رقم الطلب</th>
                              <th className="text-right p-3 font-medium">العميل</th>
                              <th className="text-right p-3 font-medium">الحالة</th>
                              <th className="text-right p-3 font-medium">المبلغ</th>
                              <th className="text-right p-3 font-medium">طريقة الدفع</th>
                              <th className="text-right p-3 font-medium">التاريخ</th>
                              <th className="text-right p-3 font-medium">الإجراءات</th>
                            </tr>
                          </thead>
                          <tbody>
                            {[
                              {
                                id: '#1234',
                                code: 'ES2024001234',
                                customer: 'أحمد محمد الليبي',
                                phone: '+218912345678',
                                status: 'مكتمل',
                                amount: '1,200 د.ل',
                                items: '2 عنصر',
                                payment: 'تحويل بنكي',
                                date: '15‏/12‏/2024',
                                time: '12:30 م'
                              },
                              {
                                id: '#1233',
                                code: 'ES2024001233',
                                customer: 'فاطمة سالم بن علي',
                                phone: '+218923456789',
                                status: 'قيد المعالجة',
                                amount: '1,800 د.ل',
                                items: '1 عنصر',
                                payment: 'تقسيط',
                                date: '15‏/12‏/2024',
                                time: '11:15 ص'
                              },
                              {
                                id: '#1232',
                                code: 'ES2024001232',
                                customer: 'محمد عمر الزاوي',
                                phone: '+218934567890',
                                status: 'ملغي',
                                amount: '750 د.ل',
                                items: '1 عنصر',
                                payment: 'دفع عند الاستلام',
                                date: '14‏/12‏/2024',
                                time: '05:45 م'
                              }
                            ].map((order, index) => (
                              <tr key={index} className="border-b hover:bg-gray-50">
                                <td className="p-3">
                                  <div>
                                    <p className="font-medium">{order.id}</p>
                                    <p className="text-xs text-gray-600">{order.code}</p>
                                  </div>
                                </td>
                                <td className="p-3">
                                  <div>
                                    <p className="font-medium">{order.customer}</p>
                                    <p className="text-xs text-gray-600">{order.phone}</p>
                                  </div>
                                </td>
                                <td className="p-3">
                                  <Badge className={
                                    order.status === 'مكتمل' ? 'bg-green-100 text-green-800' :
                                    order.status === 'قيد المعالجة' ? 'bg-yellow-100 text-yellow-800' :
                                    'bg-red-100 text-red-800'
                                  }>
                                    {order.status}
                                  </Badge>
                                </td>
                                <td className="p-3">
                                  <div>
                                    <p className="font-medium">{order.amount}</p>
                                    <p className="text-xs text-gray-600">{order.items}</p>
                                  </div>
                                </td>
                                <td className="p-3">{order.payment}</td>
                                <td className="p-3">
                                  <div>
                                    <p>{order.date}</p>
                                    <p className="text-xs text-gray-600">{order.time}</p>
                                  </div>
                                </td>
                                <td className="p-3">
                                  <div className="flex gap-1">
                                    <Button size="sm" variant="outline">
                                      <Eye className="h-4 w-4" />
                                    </Button>
                                    <Button size="sm" variant="outline">
                                      <Edit className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      <div className="flex items-center justify-center mt-6">
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">1</Button>
                          <Button variant="outline" size="sm">2</Button>
                          <Button variant="outline" size="sm">3</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {activeSection === 'catalog-products' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-gray-900">المنتجات</h2>
                    <Button
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                      onClick={() => setProductModalOpen(true)}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      ✨ إضافة منتج جديد ✨
                    </Button>
                  </div>

                  {/* Product Modal */}
                  {productModalOpen && (
                    <Card className="shadow-lg">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <ShoppingBag className="h-5 w-5 text-blue-600" />
                          إنشاء منتج فردي
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {/* Product Information */}
                          <div className="space-y-4">
                            <h3 className="text-lg font-bold text-gray-800">معلومات المنتج</h3>

                            <div>
                              <Label htmlFor="product-name-ar">إسم المنتج باللغة العربية *</Label>
                              <Input
                                id="product-name-ar"
                                placeholder="أدخل اسم المنتج بالعربي"
                                value={productName}
                                onChange={(e) => setProductName(e.target.value)}
                              />
                            </div>

                            <div>
                              <Label htmlFor="product-name-en">اسم المنتج باللغة الانجليزية</Label>
                              <Input
                                id="product-name-en"
                                placeholder="Product name in English"
                                value={productName}
                                onChange={(e) => setProductName(e.target.value)}
                              />
                            </div>

                            <div className="grid grid-cols-2 gap-2">
                              <div>
                                <Label htmlFor="product-price">سعر المنتج *</Label>
                                <Input
                                  id="product-price"
                                  type="number"
                                  placeholder="0.00"
                                  value={productPrice}
                                  onChange={(e) => setProductPrice(e.target.value)}
                                />
                              </div>
                              <div className="flex items-end">
                                <span className="text-sm text-gray-600 mr-2">د.ل</span>
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-2">
                              <div>
                                <Label htmlFor="product-sku">رمز المنتج SKU</Label>
                                <Input
                                  id="product-sku"
                                  placeholder="SKU-001"
                                  value={productSKU}
                                  onChange={(e) => setProductSKU(e.target.value)}
                                />
                              </div>

                              <div className="relative">
                                <Label htmlFor="product-barcode">الباركود</Label>
                                <Input
                                  id="product-barcode"
                                  placeholder="123456789012"
                                  value={productSKU}
                                  onChange={(e) => setProductSKU(e.target.value)}
                                />
                                <div className="absolute left-2 top-8">
                                  <div className="w-6 h-6 bg-black border-2 border-white">
                                    <div className="w-full h-full bg-white relative">
                                      <div className="absolute inset-0 bg-black" style={{
                                        backgroundImage: `repeating-linear-gradient(90deg, black 0px, black 2px, white 2px, white 4px)`
                                      }}></div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div>
                              <Label htmlFor="product-discount">قيمة التخفيض (%)</Label>
                              <Input
                                id="product-discount"
                                type="number"
                                placeholder="0"
                                value={productSKU}
                                onChange={(e) => setProductSKU(e.target.value)}
                              />
                            </div>

                            <div className="space-y-3">
                              <div className="flex items-center space-x-2">
                                <Checkbox id="product-visible" defaultChecked />
                                <Label htmlFor="product-visible" className="text-sm">عرض المنتج على المنصة</Label>
                              </div>

                              <div className="flex items-center space-x-2">
                                <Checkbox id="product-similar" />
                                <Label htmlFor="product-similar" className="text-sm">تفعيل المنتجات المشابهة</Label>
                              </div>
                            </div>
                          </div>

                          {/* Inventory */}
                          <div className="space-y-4">
                            <h3 className="text-lg font-bold text-gray-800">الكميات بالمخزون</h3>

                            <div className="space-y-3">
                              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                <span className="text-sm">مخزن الكريمية</span>
                                <Input
                                  type="number"
                                  className="w-20 text-center"
                                  placeholder="0"
                                  value={productQuantity}
                                  onChange={(e) => setProductQuantity(e.target.value)}
                                />
                              </div>

                              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                <span className="text-sm">مخزن غوط الشعال</span>
                                <Input
                                  type="number"
                                  className="w-20 text-center"
                                  placeholder="0"
                                  value={productQuantity}
                                  onChange={(e) => setProductQuantity(e.target.value)}
                                />
                              </div>

                              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                <span className="text-sm">مخزن بن عاشور</span>
                                <Input
                                  type="number"
                                  className="w-20 text-center"
                                  placeholder="0"
                                  value={productQuantity}
                                  onChange={(e) => setProductQuantity(e.target.value)}
                                />
                              </div>
                            </div>

                            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                              <span className="font-bold">الكمية الإجمالية</span>
                              <span className="font-bold text-blue-600">0</span>
                            </div>

                            <div className="flex items-center space-x-2">
                              <Checkbox id="unlimited-stock" />
                              <Label htmlFor="unlimited-stock" className="text-sm">غير محدود</Label>
                            </div>

                            <div>
                              <Label htmlFor="product-category">التصنيف</Label>
                              <Select value={productCategory} onValueChange={setProductCategory}>
                                <SelectTrigger>
                                  <SelectValue placeholder="اختر التصنيف" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="electronics">إلكترونيات</SelectItem>
                                  <SelectItem value="fashion">أزياء</SelectItem>
                                  <SelectItem value="home">منزل وحديقة</SelectItem>
                                  <SelectItem value="sports">رياضة</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        </div>

                        {/* Product Labels */}
                        <div className="mt-6">
                          <h3 className="text-lg font-bold text-gray-800 mb-4">ملص المنتج</h3>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                            {[
                              'بدون ملصق',
                              'شحن مجاني',
                              'مخفض',
                              'خصم بقيمة %',
                              'منتج مميز',
                              'كمية محدودة',
                              'يباع سريعاً',
                              'شحن مدفوع'
                            ].map((label) => (
                              <div key={label} className="flex items-center space-x-2 p-2 border rounded-lg hover:bg-gray-50">
                                <Checkbox id={`label-${label}`} />
                                <Label htmlFor={`label-${label}`} className="text-sm">{label}</Label>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="flex justify-end gap-2 mt-6">
                          <Button variant="outline" onClick={() => setProductModalOpen(false)}>
                            إلغاء
                          </Button>
                          <Button className="bg-green-600 hover:bg-green-700">
                            <ShoppingBag className="h-4 w-4 mr-2" />
                            إنشاء المنتج
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Product Statistics */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <Card className="shadow-lg">
                      <CardContent className="p-6">
                        <div className="text-center">
                          <p className="text-3xl font-bold text-blue-600 mb-1">1</p>
                          <p className="text-sm text-gray-600">الطلبات الرقمية</p>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="shadow-lg">
                      <CardContent className="p-6">
                        <div className="text-center">
                          <p className="text-3xl font-bold text-green-600 mb-1">1</p>
                          <p className="text-sm text-gray-600">المنتجات المجمعة</p>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="shadow-lg">
                      <CardContent className="p-6">
                        <div className="text-center">
                          <p className="text-3xl font-bold text-purple-600 mb-1">1</p>
                          <p className="text-sm text-gray-600">شحيطة</p>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="shadow-lg">
                      <CardContent className="p-6">
                        <div className="text-center">
                          <p className="text-3xl font-bold text-orange-600 mb-1">4</p>
                          <p className="text-sm text-gray-600">الكل</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Products Table */}
                  <Card className="shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <ShoppingBag className="h-5 w-5 text-blue-600" />
                        قائمة المنتجات
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-4 mb-6">
                        <Button variant="outline" size="sm">
                          <Filter className="h-4 w-4 mr-2" />
                          فرز
                        </Button>
                        <div className="relative flex-1">
                          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                          <Input placeholder="البحث في المنتجات..." className="pr-10" />
                        </div>
                      </div>

                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b">
                              <th className="text-right p-3 font-medium">الاسم / SKU</th>
                              <th className="text-right p-3 font-medium">الكمية</th>
                              <th className="text-right p-3 font-medium">السعر</th>
                              <th className="text-right p-3 font-medium">الحالة</th>
                              <th className="text-right p-3 font-medium">تاريخ الإنشاء</th>
                              <th className="text-right p-3 font-medium">الإجراءات</th>
                            </tr>
                          </thead>
                          <tbody>
                            {[
                              {
                                name: 'منتج ممدوج تجريبي',
                                sku: 'Z.775634.IM7504878',
                                quantity: 'غير محدود',
                                price: '100 د.ل',
                                status: 'نشط',
                                date: '2025-08-18'
                              },
                              {
                                name: 'منتج فردي تجريبي',
                                sku: 'Z.775504.OM45024941',
                                quantity: '20000',
                                price: '100 د.ل',
                                status: 'نشط',
                                date: '2025-08-18'
                              },
                              {
                                name: 'منتج قسام تجريبي',
                                sku: 'Z.127604.1754047704698405',
                                quantity: '0',
                                price: '12 د.ل',
                                status: 'منتج',
                                date: '2025-08-01'
                              },
                              {
                                name: 'منتج طلبات رقمية تجريبي',
                                sku: 'Z.127604.175404770263084',
                                quantity: 'غير محدود',
                                price: '100 د.ل',
                                status: 'منتج',
                                date: '2025-08-01'
                              }
                            ].map((product, index) => (
                              <tr key={index} className="border-b hover:bg-gray-50">
                                <td className="p-3">
                                  <div>
                                    <p className="font-medium">{product.name}</p>
                                    <p className="text-xs text-gray-600">{product.sku}</p>
                                  </div>
                                </td>
                                <td className="p-3">
                                  <span className={`px-2 py-1 rounded-full text-xs ${
                                    product.quantity === 'غير محدود'
                                      ? 'bg-green-100 text-green-800'
                                      : 'bg-blue-100 text-blue-800'
                                  }`}>
                                    {product.quantity}
                                  </span>
                                </td>
                                <td className="p-3">{product.price}</td>
                                <td className="p-3">
                                  <Badge className={
                                    product.status === 'نشط' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                                  }>
                                    {product.status}
                                  </Badge>
                                </td>
                                <td className="p-3">{product.date}</td>
                                <td className="p-3">
                                  <div className="flex gap-1">
                                    <Button size="sm" variant="outline">
                                      <Edit className="h-4 w-4" />
                                    </Button>
                                    <Button size="sm" variant="outline">
                                      <Eye className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {activeSection === 'catalog-categories' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-gray-900">التصنيفات ✨</h2>
                    <Button
                      className="bg-green-600 hover:bg-green-700 text-white"
                      onClick={() => setCategoryModalOpen(true)}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      ✨ إنشاء تصنيف جديد ✨
                    </Button>
                  </div>

                  {/* Category Creation Modal */}
                  {categoryModalOpen && (
                    <Card className="shadow-lg">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Tag className="h-5 w-5 text-green-600" />
                          إنشاء تصنيف جديد ✨
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-4">
                            <div>
                              <Label htmlFor="category-name-ar">اسم التصنيف باللغة العربية</Label>
                              <Input id="category-name-ar" placeholder="أدخل اسم التصنيف بالعربية" />
                            </div>

                            <div>
                              <Label htmlFor="category-name-en">اسم التصنيف باللغة الإنجليزية</Label>
                              <Input id="category-name-en" placeholder="Enter category name in English" />
                            </div>

                            <div>
                              <Label htmlFor="category-description-ar">وصف صورة التصنيف بالعربية</Label>
                              <Input id="category-description-ar" placeholder="وصف مختصر للتصنيف باللغة العربية" />
                            </div>

                            <div>
                              <Label htmlFor="category-description-en">وصف صورة التصنيف بالإنجليزية</Label>
                              <Input id="category-description-en" placeholder="Brief category description in English" />
                            </div>

                            <div>
                              <Label htmlFor="category-image">صورة التصنيف</Label>
                              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                                <Image className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                                <p className="text-sm text-gray-600 mb-2">رفع استعراض أو سحب الملف أو الصور</p>
                                <input
                                  type="file"
                                  id="category-image"
                                  accept="image/*"
                                  className="hidden"
                                  onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                      console.log('Category image selected:', file.name);
                                      // هنا يمكن إضافة منطق رفع الصورة
                                    }
                                  }}
                                />
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => document.getElementById('category-image')?.click()}
                                >
                                  <Upload className="h-4 w-4 mr-2" />
                                  اختر صورة
                                </Button>
                                <p className="text-xs text-gray-500 mt-2">PNG, JPEG, JPG</p>
                              </div>
                            </div>

                            <div>
                              <Label htmlFor="category-bg-image">الصورة الخلفية للتصنيف</Label>
                              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                                <Image className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                                <p className="text-sm text-gray-600 mb-2">رفع استعراض أو سحب الملف أو الصور</p>
                                <input
                                  type="file"
                                  id="category-bg-image"
                                  accept="image/*"
                                  className="hidden"
                                  onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                      console.log('Background image selected:', file.name);
                                      // هنا يمكن إضافة منطق رفع الصورة الخلفية
                                    }
                                  }}
                                />
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => document.getElementById('category-bg-image')?.click()}
                                >
                                  <Upload className="h-4 w-4 mr-2" />
                                  اختر صورة
                                </Button>
                                <p className="text-xs text-gray-500 mt-2">PNG, JPEG, JPG</p>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-4">
                            <div>
                              <Label htmlFor="parent-category">التصنيف الرئيسي</Label>
                              <Select>
                                <SelectTrigger>
                                  <SelectValue placeholder="البحث عن التصنيف الرئيسي" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="none">لا يوجد تصنيف رئيسي</SelectItem>
                                  <SelectItem value="electronics">إلكترونيات</SelectItem>
                                  <SelectItem value="fashion">أزياء</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>

                            <div>
                              <Label htmlFor="category-desc-ar">وصف التصنيف بالعربية</Label>
                              <Textarea id="category-desc-ar" placeholder="وصف تفصيلي للتصنيف باللغة العربية" rows={4} />
                            </div>

                            <div>
                              <Label htmlFor="category-desc-en">وصف التصنيف بالإنجليزية</Label>
                              <Textarea id="category-desc-en" placeholder="Detailed category description in English" rows={4} />
                            </div>

                            {/* SEO Section */}
                            <div className="space-y-4">
                              <h4 className="font-bold text-gray-800">تحسين الظهور في نتائج البحث</h4>

                              <div>
                                <Label htmlFor="category-title-ar">عنوان صفحة التصنيف بالعربية</Label>
                                <Input id="category-title-ar" placeholder="عنوان محسن لمحركات البحث" />
                                <p className="text-xs text-gray-500 mt-1">عدد الأحرف: 0/70</p>
                              </div>

                              <div>
                                <Label htmlFor="category-title-en">عنوان صفحة التصنيف بالإنجليزية</Label>
                                <Input id="category-title-en" placeholder="SEO optimized title" />
                                <p className="text-xs text-gray-500 mt-1">عدد الأحرف: 0/70</p>
                              </div>

                              <div>
                                <Label htmlFor="category-meta-ar">وصف صفحة التصنيف بالعربية</Label>
                                <Textarea id="category-meta-ar" placeholder="وصف محسن لمحركات البحث باللغة العربية" rows={3} />
                                <p className="text-xs text-gray-500 mt-1">عدد الأحرف: 0/320</p>
                              </div>

                              <div>
                                <Label htmlFor="category-meta-en">وصف صفحة التصنيف بالإنجليزية</Label>
                                <Textarea id="category-meta-en" placeholder="SEO optimized description in English" rows={3} />
                                <p className="text-xs text-gray-500 mt-1">عدد الأحرف: 0/320</p>
                              </div>
                            </div>

                            {/* URL Section */}
                            <div className="space-y-2">
                              <Label>إنشاء رابط للتصنيف</Label>
                              <div className="flex items-center gap-2">
                                <span className="text-sm text-gray-600">eshro.com/categories/</span>
                                <Input placeholder="category-name" />
                              </div>
                              <p className="text-xs text-gray-500">الرابط النهائي: eshro.com/categories/category-name</p>
                            </div>
                          </div>
                        </div>

                        <div className="flex justify-end gap-2 mt-6">
                          <Button variant="outline" onClick={() => setCategoryModalOpen(false)}>
                            إلغاء
                          </Button>
                          <Button className="bg-green-600 hover:bg-green-700">
                            <Tag className="h-4 w-4 mr-2" />
                            ✨ إنشاء التصنيف
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Categories Introduction */}
                  <Card className="shadow-lg bg-gradient-to-r from-green-50 to-blue-50">
                    <CardContent className="p-8 text-center">
                      <div className="max-w-2xl mx-auto">
                        <Tag className="h-16 w-16 text-green-400 mx-auto mb-4" />
                        <h3 className="text-2xl font-bold text-gray-800 mb-4">ابدأ رحلتك مع التصنيفات! 🚀</h3>
                        <p className="text-gray-600 mb-6">
                          قم بإنشاء تصنيفات احترافية لمنتجاتك مع صور جذابة ووصف تفصيلي لتنظيم متجرك بشكل مثالي
                        </p>
                        <Button className="bg-green-600 hover:bg-green-700">
                          🎨 ابدأ الإنشاء الآن
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {activeSection === 'customers-groups' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-gray-900">مجموعات العملاء</h2>
                    <Button className="bg-green-600 hover:bg-green-700 text-white">
                      <Plus className="h-4 w-4 mr-2" />
                      إنشاء مجموعة
                    </Button>
                  </div>

                  {/* Customer Groups Statistics */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className="shadow-lg">
                      <CardContent className="p-6">
                        <div className="text-center">
                          <p className="text-3xl font-bold text-blue-600 mb-1">210</p>
                          <p className="text-sm text-gray-600">عملاء طرابلس النشطين</p>
                          <div className="flex items-center justify-center text-sm text-green-600 mt-2">
                            <Users className="h-4 w-4 mr-1" />
                            <span>النسبة المئوية: 56%</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="shadow-lg">
                      <CardContent className="p-6">
                        <div className="text-center">
                          <p className="text-3xl font-bold text-green-600 mb-1">145</p>
                          <p className="text-sm text-gray-600">عملاء طرابلس النشطين</p>
                          <p className="text-sm text-gray-600 mt-1">النسبة المئوية: 34%</p>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="shadow-lg">
                      <CardContent className="p-6">
                        <div className="text-center">
                          <p className="text-3xl font-bold text-purple-600 mb-1">89</p>
                          <p className="text-sm text-gray-600">عملاء الطلبات الكبيرة</p>
                          <p className="text-sm text-gray-600 mt-1">النسبة المئوية: 28%</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Create Group Modal */}
                  <Card className="shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Users className="h-5 w-5 text-green-600" />
                        إنشاء مجموعة جديدة
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <Label htmlFor="group-name">اسم المجموعة</Label>
                            <Input id="group-name" placeholder="أدخل اسم المجموعة" />
                          </div>

                          <div>
                            <Label htmlFor="min-orders">عدد الطلبات أكثر من</Label>
                            <Input id="min-orders" type="number" placeholder="عدد" />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <Label htmlFor="group-city">المدينة</Label>
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="اختر المدينة" />
                              </SelectTrigger>
                              <SelectContent>
                                {libyanCities.slice(0, 10).map((city) => (
                                  <SelectItem key={city.id} value={city.id}>
                                    {city.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>

                          <div>
                            <Label htmlFor="account-status">حالة الحساب</Label>
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="اختر الحالة" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="active">نشط</SelectItem>
                                <SelectItem value="inactive">غير نشط</SelectItem>
                                <SelectItem value="suspended">معلق</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <Label htmlFor="customer-gender">الجنس</Label>
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="اختر الجنس" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="male">ذكر</SelectItem>
                                <SelectItem value="female">أنثى</SelectItem>
                                <SelectItem value="other">أخرى</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div>
                            <Label htmlFor="birth-date">تاريخ الميلاد</Label>
                            <Input id="birth-date" type="date" placeholder="mm/dd/yyyy" />
                          </div>
                        </div>

                        <div className="space-y-3">
                          <div className="flex items-center space-x-2">
                            <Checkbox id="newsletter-subscribers" />
                            <Label htmlFor="newsletter-subscribers" className="text-sm">مشتركي النشرة البريدية</Label>
                          </div>

                          <div className="flex items-center space-x-2">
                            <Checkbox id="customer-type" />
                            <Label htmlFor="customer-type" className="text-sm">نوع العميل</Label>
                          </div>

                          <div className="flex items-center space-x-2">
                            <Checkbox id="customer-channel" />
                            <Label htmlFor="customer-channel" className="text-sm">قناة العميل</Label>
                          </div>
                        </div>

                        <div className="flex justify-end gap-2">
                          <Button variant="outline">إلغاء</Button>
                          <Button className="bg-green-600 hover:bg-green-700">حفظ المجموعة</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Customer Groups Table */}
                  <Card className="shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Users className="h-5 w-5 text-blue-600" />
                        مجموعات العملاء
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-4 mb-6">
                        <div className="relative flex-1">
                          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                          <Input placeholder="البحث في المجموعات..." className="pr-10" />
                        </div>
                      </div>

                      <div className="space-y-4">
                        {[
                          {
                            name: 'عملاء طرابلس النشطين',
                            gender: 'مختلط',
                            status: 'مفعل',
                            percentage: '56%',
                            count: '210'
                          },
                          {
                            name: 'عملاء طرابلس النشطين',
                            gender: 'مختلط',
                            status: 'مفعل',
                            percentage: '34%',
                            count: '145'
                          },
                          {
                            name: 'عملاء الطلبات الكبيرة',
                            gender: 'مختلط',
                            status: 'مفعل',
                            percentage: '28%',
                            count: '89'
                          }
                        ].map((group, index) => (
                          <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                <Users className="h-6 w-6 text-blue-600" />
                              </div>
                              <div>
                                <h3 className="font-bold text-gray-800">{group.name}</h3>
                                <div className="flex items-center gap-4 text-sm text-gray-600">
                                  <span>{group.gender}</span>
                                  <Badge className={group.status === 'مفعل' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                                    {group.status}
                                  </Badge>
                                </div>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="font-bold text-blue-600">{group.percentage}</p>
                              <p className="text-sm text-gray-600">عدد العملاء: {group.count}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {activeSection === 'marketing-campaigns' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-gray-900">رسائل الحملات التسويقية</h2>
                    <Button className="bg-green-600 hover:bg-green-700 text-white">
                      <Plus className="h-4 w-4 mr-2" />
                      إنشاء حملة جديدة
                    </Button>
                  </div>

                  <Card className="shadow-lg bg-gradient-to-r from-green-50 to-blue-50">
                    <CardContent className="p-6">
                      <div className="text-center mb-6">
                        <MessageSquare className="h-12 w-12 text-green-400 mx-auto mb-3" />
                        <h3 className="text-lg font-bold text-gray-800 mb-2">قم بتفعيل ميزة الواتساب لإطلاق حملات مستهدفة</h3>
                        <p className="text-gray-600 mb-4">وإعادة التواصل مع العملاء، وتحقيق المزيد من التحويلات</p>
                        <Button className="bg-green-600 hover:bg-green-700">تفعيل ميزة الواتساب</Button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="text-center p-4 bg-white rounded-lg">
                          <h4 className="font-bold text-gray-800 mb-2">نظرة عامة</h4>
                          <p className="text-sm text-gray-600">قم بتفعيل الواتساب لإرسال الحملات التسويقية</p>
                        </div>
                        <div className="text-center p-4 bg-white rounded-lg">
                          <h4 className="font-bold text-gray-800 mb-2">الرصيد الحالي لرسائل SMS</h4>
                          <p className="text-2xl font-bold text-blue-600 mb-1">لا يوجد رسائل</p>
                          <Button variant="outline" size="sm">شحن الرصيد</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Campaigns Table */}
                  <Card className="shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Megaphone className="h-5 w-5 text-green-600" />
                        قائمة الحملات التسويقية
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-4 mb-6">
                        <Select>
                          <SelectTrigger className="w-48">
                            <SelectValue placeholder="الكل" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">الكل</SelectItem>
                            <SelectItem value="sms">رسالة نصية SMS</SelectItem>
                            <SelectItem value="whatsapp">واتساب</SelectItem>
                          </SelectContent>
                        </Select>
                        <div className="relative flex-1">
                          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                          <Input placeholder="ابحث في الحملات..." className="pr-10" />
                        </div>
                      </div>

                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b">
                              <th className="text-right p-3 font-medium">عنوان الحملة</th>
                              <th className="text-right p-3 font-medium">الهدف</th>
                              <th className="text-right p-3 font-medium">عدد المستلمين</th>
                              <th className="text-right p-3 font-medium">القناة</th>
                              <th className="text-right p-3 font-medium">الحالة</th>
                              <th className="text-right p-3 font-medium">تاريخ الإنشاء</th>
                            </tr>
                          </thead>
                          <tbody>
                            {[
                              {
                                title: 'تخفيضات موسمية',
                                goal: 'ترويج للمنتج',
                                recipients: 300,
                                channel: 'واتساب',
                                status: 'انتظار',
                                date: '20/09/2025',
                                time: '12:30:01 مساءً'
                              },
                              {
                                title: 'تخفيضات رمضانية',
                                goal: 'ترويج منتج Zelan',
                                recipients: 500,
                                channel: 'SMS',
                                status: 'منفذة',
                                date: '20/03/2025',
                                time: '06:20:01 مساءً'
                              },
                              {
                                title: 'مع أسعارنا كمل نص دينك',
                                goal: 'فئة المتزوجين',
                                recipients: 700,
                                channel: 'واتساب / SMS',
                                status: 'تحت الإجراء',
                                date: '10/08/2025',
                                time: '10:15:01 صباحًا'
                              }
                            ].map((campaign, index) => (
                              <tr key={index} className="border-b hover:bg-gray-50">
                                <td className="p-3">
                                  <p className="font-medium">{campaign.title}</p>
                                </td>
                                <td className="p-3">{campaign.goal}</td>
                                <td className="p-3">{campaign.recipients}</td>
                                <td className="p-3">
                                  <Badge className={
                                    campaign.channel.includes('واتساب') ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                                  }>
                                    {campaign.channel}
                                  </Badge>
                                </td>
                                <td className="p-3">
                                  <Badge className={
                                    campaign.status === 'منفذة' ? 'bg-green-100 text-green-800' :
                                    campaign.status === 'انتظار' ? 'bg-yellow-100 text-yellow-800' :
                                    'bg-blue-100 text-blue-800'
                                  }>
                                    {campaign.status}
                                  </Badge>
                                </td>
                                <td className="p-3">
                                  <div>
                                    <p>{campaign.date}</p>
                                    <p className="text-xs text-gray-600">{campaign.time}</p>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {activeSection === 'analytics-live' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900">التحليلات المباشرة</h2>

                  <Card className="shadow-lg bg-gradient-to-r from-blue-50 to-purple-50">
                    <CardContent className="p-6">
                      <h3 className="text-lg font-bold text-gray-800 mb-4">تحليلات حقيقية ومتحدثة للحظة الحالية</h3>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="text-center p-4 bg-white rounded-lg">
                          <p className="text-sm text-gray-600 mb-2">2025 سبتمبر 22 - يوم 24</p>
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <span className="text-sm">العملاء</span>
                              <span className="font-bold text-blue-600">6 عملاء نشطون</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm">عدد الزيارات</span>
                              <span className="font-bold text-green-600">800 زيارة</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm">عدد الطلبات</span>
                              <span className="font-bold text-purple-600">11 طلب</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm">إجمالي المبيعات</span>
                              <span className="font-bold text-orange-600">3,288.27 د.ل</span>
                            </div>
                          </div>
                        </div>

                        <div className="text-center p-4 bg-white rounded-lg">
                          <h4 className="font-bold text-gray-800 mb-3">رحلة العميل</h4>
                          <p className="text-sm text-gray-600 mb-4">تصور لمراحل رحلة العملاء في متجرك</p>
                          <div className="space-y-2 text-sm">
                            <div className="flex items-center justify-between">
                              <span>زائر</span>
                              <span className="font-bold">909 زائر</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span>منتشر</span>
                              <span className="font-bold">34 متجر</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span>اشتريت</span>
                              <span className="font-bold">10 شراء</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span>مكمل</span>
                              <span className="font-bold">6 طلب</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Default content for other sections */}
              {activeSection !== 'overview' && !activeSection.startsWith('orders') && !activeSection.startsWith('catalog') && !activeSection.startsWith('customers') && !activeSection.startsWith('marketing') && !activeSection.startsWith('analytics') && !activeSection.startsWith('finance') && !activeSection.startsWith('settings') && activeSection !== 'pos' && activeSection !== 'services' && activeSection !== 'customer-service' && activeSection !== 'technical-support' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900">قسم {activeSection}</h2>
                  <Card>
                    <CardContent className="p-6">
                      <p className="text-gray-600">محتوى هذا القسم سيتم إضافته قريباً</p>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Default content for other sections */}
              {activeSection !== 'overview' && !activeSection.startsWith('orders') && !activeSection.startsWith('catalog') && !activeSection.startsWith('customers') && !activeSection.startsWith('marketing') && !activeSection.startsWith('analytics') && !activeSection.startsWith('finance') && !activeSection.startsWith('settings') && activeSection !== 'pos' && activeSection !== 'services' && activeSection !== 'customer-service' && activeSection !== 'technical-support' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900">قسم {activeSection}</h2>
                  <Card>
                    <CardContent className="p-6">
                      <p className="text-gray-600">محتوى هذا القسم سيتم إضافته قريباً</p>
                    </CardContent>
                  </Card>
                </div>
              )}

              {activeSection === 'finance-subscription' && (
                <SubscriptionManagementView
                  storeData={null}
                  setStoreData={() => {}}
                  onSave={() => {}}
                />
              )}

              {activeSection === 'orders-abandoned' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-gray-900">السلات المتروكة</h2>
                    <div className="flex items-center gap-2">
                      <Checkbox id="mass-reminder" defaultChecked />
                      <Label htmlFor="mass-reminder" className="text-sm">إرسال تذكير جماعي</Label>
                    </div>
                  </div>

                  {/* Abandoned Carts Statistics */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <Card className="shadow-lg">
                      <CardContent className="p-6">
                        <div className="text-center">
                          <p className="text-3xl font-bold text-orange-600 mb-1">2</p>
                          <p className="text-sm text-gray-600">إجمالي السلات المتروكة</p>
                          <p className="text-xs text-gray-500 mt-1">يحتاج للمتابعة</p>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="shadow-lg">
                      <CardContent className="p-6">
                        <div className="text-center">
                          <p className="text-3xl font-bold text-blue-600 mb-1">1,930 د.ل</p>
                          <p className="text-sm text-gray-600">قيمة السلات المتروكة</p>
                          <p className="text-xs text-gray-500 mt-1">فرصة ضائعة</p>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="shadow-lg">
                      <CardContent className="p-6">
                        <div className="text-center">
                          <p className="text-3xl font-bold text-green-600 mb-1">3</p>
                          <p className="text-sm text-gray-600">التذكيرات المرسلة</p>
                          <p className="text-sm text-gray-600 mt-1">معدل الاستجابة: 23%</p>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="shadow-lg">
                      <CardContent className="p-6">
                        <div className="text-center">
                          <p className="text-3xl font-bold text-purple-600 mb-1">8%</p>
                          <p className="text-sm text-gray-600">متوسط الخصم</p>
                          <p className="text-xs text-gray-500 mt-1">للاسترداد</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Recovery Strategy */}
                  <Card className="shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Target className="h-5 w-5 text-blue-600" />
                        تحليل السلات المتروكة
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                        <div className="text-center p-4 bg-red-50 rounded-lg">
                          <p className="text-2xl font-bold text-red-600 mb-1">0</p>
                          <p className="text-sm text-gray-600">سلات جديدة (لم يتم تذكيرها)</p>
                        </div>
                        <div className="text-center p-4 bg-yellow-50 rounded-lg">
                          <p className="text-2xl font-bold text-yellow-600 mb-1">1</p>
                          <p className="text-sm text-gray-600">سلات تم تذكيرها مرة واحدة</p>
                        </div>
                        <div className="text-center p-4 bg-blue-50 rounded-lg">
                          <p className="text-2xl font-bold text-blue-600 mb-1">1</p>
                          <p className="text-sm text-gray-600">سلات تم تذكيرها عدة مرات</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Card className="border-l-4 border-l-green-500">
                          <CardContent className="p-4">
                            <h4 className="font-bold text-sm mb-2">العملاء الجدد</h4>
                          <p className="text-xs text-gray-600 mb-2">خصم 15%</p>
                          </CardContent>
                        </Card>
                        <Card className="border-l-4 border-l-blue-500">
                          <CardContent className="p-4">
                            <h4 className="font-bold text-sm mb-2">العملاء المنتظمين</h4>
                          <p className="text-xs text-gray-600 mb-2">خصم 10%</p>
                          </CardContent>
                        </Card>
                        <Card className="border-l-4 border-l-purple-500">
                          <CardContent className="p-4">
                            <h4 className="font-bold text-sm mb-2">عملاء VIP</h4>
                          <p className="text-xs text-gray-600 mb-2">شحن مجاني</p>
                          </CardContent>
                        </Card>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Abandoned Carts Table */}
                  <Card className="shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <ShoppingCart className="h-5 w-5 text-orange-600" />
                        السلات المتروكة - التفاصيل
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-4 mb-6">
                        <Button variant="outline" size="sm">
                          <Filter className="h-4 w-4 mr-2" />
                          تصفية
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-2" />
                          تصدير
                        </Button>
                      </div>

                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b">
                              <th className="text-right p-3 font-medium">العميل</th>
                              <th className="text-right p-3 font-medium">العناصر</th>
                              <th className="text-right p-3 font-medium">القيمة</th>
                              <th className="text-right p-3 font-medium">تاريخ الإنشاء</th>
                              <th className="text-right p-3 font-medium">التذكيرات</th>
                              <th className="text-right p-3 font-medium">الخصم المقترح</th>
                              <th className="text-right p-3 font-medium">الإجراءات</th>
                            </tr>
                          </thead>
                          <tbody>
                            {[
                              {
                                customer: 'سارة علي',
                                email: 'sarah.tripoli@gmail.com',
                                phone: '+218945678901',
                                items: [
                                  { name: 'حقيبة بحر راقية', quantity: 1, price: '260 د.ل' },
                                  { name: 'شبشب صيفي جلد', quantity: 1, price: '210 د.ل' }
                                ],
                                total: '470 د.ل',
                                date: '15‏/12‏/2024',
                                time: '02:30 م',
                                reminders: 1,
                                discount: '10%'
                              },
                              {
                                customer: 'عمر محمد',
                                email: 'omar.misrata@yahoo.com',
                                phone: '+218956789012',
                                items: [
                                  { name: 'فستان صيفي بحرزام جلد', quantity: 1, price: '680 د.ل' }
                                ],
                                total: '680 د.ل',
                                date: '14‏/12‏/2024',
                                time: '10:15 م',
                                reminders: 2,
                                discount: '5%'
                              }
                            ].map((cart, index) => (
                              <tr key={index} className="border-b hover:bg-gray-50">
                                <td className="p-3">
                                  <div>
                                    <p className="font-medium">{cart.customer}</p>
                                    <p className="text-xs text-gray-600">{cart.email}</p>
                                    <p className="text-xs text-gray-600">{cart.phone}</p>
                                  </div>
                                </td>
                                <td className="p-3">
                                  <div className="space-y-1">
                                    {cart.items.map((item, itemIndex) => (
                                      <div key={itemIndex} className="text-xs">
                                        <p className="font-medium">{item.name}</p>
                                        <p className="text-gray-600">الكمية: {item.quantity} - السعر: {item.price}</p>
                                      </div>
                                    ))}
                                  </div>
                                </td>
                                <td className="p-3">
                                  <div>
                                    <p className="font-medium">{cart.total}</p>
                                    <p className="text-xs text-gray-600">{cart.items.length} عنصر</p>
                                  </div>
                                </td>
                                <td className="p-3">
                                  <div>
                                    <p>{cart.date}</p>
                                    <p className="text-xs text-gray-600">{cart.time}</p>
                                  </div>
                                </td>
                                <td className="p-3">
                                  <Badge variant="outline">{cart.reminders} تذكير</Badge>
                                </td>
                                <td className="p-3">
                                  <Badge className="bg-green-100 text-green-800">{cart.discount}</Badge>
                                </td>
                                <td className="p-3">
                                  <div className="flex gap-1">
                                    <Button size="sm" className="bg-green-600 hover:bg-green-700">
                                      <Send className="h-4 w-4 mr-1" />
                                      تذكير
                                    </Button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Quick Recovery Actions */}
                  <Card className="shadow-lg bg-gradient-to-r from-green-50 to-blue-50">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-green-800">
                        <Target className="h-5 w-5" />
                        إجراءات الاسترداد السريع
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Button className="bg-green-600 hover:bg-green-700 text-white h-16 flex flex-col items-center justify-center">
                          <MessageSquare className="h-6 w-6 mb-2" />
                          <span className="text-sm">إرسال تذكير عبر واتساب</span>
                        </Button>
                        <Button className="bg-blue-600 hover:bg-blue-700 text-white h-16 flex flex-col items-center justify-center">
                          <Mail className="h-6 w-6 mb-2" />
                          <span className="text-sm">إرسال تذكير بالإيميل</span>
                        </Button>
                        <Button className="bg-purple-600 hover:bg-purple-700 text-white h-16 flex flex-col items-center justify-center">
                          <Percent className="h-6 w-6 mb-2" />
                          <span className="text-sm">تطبيق خصم تلقائي</span>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {activeSection === 'settings-store' && (
                <StoreSettingsView
                  storeData={{
                    name: 'متجر نواعم',
                    phone: '0942161516',
                    address: 'طرابلس - سوق الجمعة',
                    email: 'contact@ishro.ly'
                  }}
                  setStoreData={() => {}}
                  onSave={() => {}}
                />
              )}

              {activeSection === 'orders-unavailable' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-gray-900">الطلبات الغير متوفرة</h2>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <Filter className="h-4 w-4 mr-2" />
                        فرز
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        تصدير
                      </Button>
                    </div>
                  </div>

                  {/* Unavailable Orders Statistics */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <Card className="shadow-lg">
                      <CardContent className="p-6">
                        <div className="text-center">
                          <p className="text-3xl font-bold text-red-600 mb-1">5</p>
                          <p className="text-sm text-gray-600">طلبات غير متوفرة</p>
                          <p className="text-xs text-gray-500 mt-1">بالمتجر</p>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="shadow-lg">
                      <CardContent className="p-6">
                        <div className="text-center">
                          <p className="text-3xl font-bold text-blue-600 mb-1">12</p>
                          <p className="text-sm text-gray-600">إجمالي الكمية المطلوبة</p>
                          <p className="text-xs text-gray-500 mt-1">منتجات مطلوبة</p>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="shadow-lg">
                      <CardContent className="p-6">
                        <div className="text-center">
                          <p className="text-3xl font-bold text-green-600 mb-1">3</p>
                          <p className="text-sm text-gray-600">منتجات تم توفيرها</p>
                          <p className="text-sm text-gray-600 mt-1">هذا الشهر</p>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="shadow-lg">
                      <CardContent className="p-6">
                        <div className="text-center">
                          <p className="text-3xl font-bold text-purple-600 mb-1">2</p>
                          <p className="text-sm text-gray-600">طلبات ملغية</p>
                          <p className="text-xs text-gray-500 mt-1">من العملاء</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Unavailable Orders Table */}
                  <Card className="shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <AlertTriangle className="h-5 w-5 text-red-600" />
                        جدول الطلبات الغير متوفرة بالمتجر
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b">
                              <th className="text-right p-3 font-medium">كود المنتج</th>
                              <th className="text-right p-3 font-medium">اسم المنتج</th>
                              <th className="text-right p-3 font-medium">الكمية</th>
                              <th className="text-right p-3 font-medium">تاريخ تقديم الطلب</th>
                              <th className="text-right p-3 font-medium">وقت تقديم الطلب</th>
                              <th className="text-right p-3 font-medium">حالة الطلب</th>
                              <th className="text-right p-3 font-medium">الإجراءات</th>
                            </tr>
                          </thead>
                          <tbody>
                            {[
                              {
                                productCode: 'ESHRO-5556T-1005',
                                productName: 'فستان ماكسي أحمر, Mango',
                                quantity: 2,
                                date: '20/09/2025',
                                time: '12:30:27 مساءً',
                                status: 'قيد الانتظار',
                                customer: 'أحمد محمد',
                                customerEmail: 'ahmed.salem@gmail.com',
                                customerPhone: '0922682101'
                              },
                              {
                                productCode: 'ESHRO-7721B-2008',
                                productName: 'حذاء نسائي أنيق, ZARA',
                                quantity: 1,
                                date: '18/09/2025',
                                time: '14:15:45 مساءً',
                                status: 'المنتج متوفر',
                                customer: 'فاطمة محمد',
                                customerEmail: 'fatima.mohammed@hotmail.com',
                                customerPhone: '0915234567'
                              },
                              {
                                productCode: 'ESHRO-3399H-5003',
                                productName: 'فستان سهرة طويل Hermes',
                                quantity: 1,
                                date: '15/09/2025',
                                time: '09:20:12 صباحًا',
                                status: 'ملغي',
                                customer: 'عمر علي',
                                customerEmail: 'omar.ali@gmail.com',
                                customerPhone: '0918765432'
                              }
                            ].map((order, index) => (
                              <tr key={index} className="border-b hover:bg-gray-50">
                                <td className="p-3">
                                  <p className="font-medium">{order.productCode}</p>
                                </td>
                                <td className="p-3">
                                  <div>
                                    <p className="font-medium">{order.productName}</p>
                                  </div>
                                </td>
                                <td className="p-3">
                                  <p className="font-bold">{order.quantity}</p>
                                </td>
                                <td className="p-3">{order.date}</td>
                                <td className="p-3">{order.time}</td>
                                <td className="p-3">
                                  <Select>
                                    <SelectTrigger className="w-full">
                                      <SelectValue placeholder={order.status} />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="pending">قيد الانتظار</SelectItem>
                                      <SelectItem value="available">المنتج متوفر</SelectItem>
                                      <SelectItem value="cancelled">ملغي</SelectItem>
                                      <SelectItem value="alternative">توفير بديل</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </td>
                                <td className="p-3">
                                  <div className="flex gap-1">
                                    <Button size="sm" variant="outline">
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                    <Button size="sm" variant="outline">
                                      <Edit className="h-4 w-4" />
                                    </Button>
                                    <Button size="sm" className="bg-green-600 hover:bg-green-700">
                                      <Save className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      <div className="flex items-center justify-center mt-6">
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">1</Button>
                          <Button variant="outline" size="sm">2</Button>
                          <Button variant="outline" size="sm">3</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Customer Details Modal/Card */}
                  <Card className="shadow-lg bg-gradient-to-r from-blue-50 to-purple-50">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-blue-800">
                        <User className="h-5 w-5" />
                        تفاصيل العملاء والطلبات
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <h4 className="font-bold text-gray-800">معلومات العميل</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-600">الاسم:</span>
                              <span className="font-medium">أحمد محمد الليبي</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">البريد الإلكتروني:</span>
                              <span className="font-medium">ahmed.salem@gmail.com</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">رقم الهاتف:</span>
                              <span className="font-medium">+218 92 268 2101</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">المدينة:</span>
                              <span className="font-medium">طرابلس</span>
                            </div>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <h4 className="font-bold text-gray-800">تفاصيل الطلب</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-600">كود المنتج:</span>
                              <span className="font-medium">ESHRO-5556T-1005</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">اسم المنتج:</span>
                              <span className="font-medium">فستان ماكسي أحمر, Mango</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">الكمية المطلوبة:</span>
                              <span className="font-medium">2 قطعة</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">تاريخ الطلب:</span>
                              <span className="font-medium">20/09/2025 - 12:30 مساءً</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="mt-6 pt-6 border-t">
                        <div className="flex gap-2 justify-center">
                          <Button className="bg-green-600 hover:bg-green-700">
                            <Bell className="h-4 w-4 mr-2" />
                            إشعار العميل بتوفر المنتج
                          </Button>
                          <Button variant="outline">
                            <Mail className="h-4 w-4 mr-2" />
                            إرسال رسالة للعميل
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Status Management Guide */}
                  <Card className="shadow-lg bg-gradient-to-r from-yellow-50 to-orange-50">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-orange-800">
                        <HelpCircle className="h-5 w-5" />
                        دليل إدارة حالات الطلبات
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div className="p-4 bg-white rounded-lg border-l-4 border-l-gray-500">
                            <h5 className="font-bold text-gray-800 mb-2">قيد الانتظار</h5>
                            <p className="text-sm text-gray-600">المنتج غير متوفر حالياً في المخزن. يبقى الطلب في هذه الحالة حتى يتم توفير المنتج.</p>
                          </div>
                          <div className="p-4 bg-white rounded-lg border-l-4 border-l-green-500">
                            <h5 className="font-bold text-green-800 mb-2">المنتج متوفر</h5>
                            <p className="text-sm text-gray-600">تم توفير المنتج في المخزن. سيتم إرسال إشعار فوري للعميل لإتمام عملية الشراء.</p>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div className="p-4 bg-white rounded-lg border-l-4 border-l-red-500">
                            <h5 className="font-bold text-red-800 mb-2">ملغي</h5>
                            <p className="text-sm text-gray-600">تم إلغاء طلب العميل نهائياً. لن يتم إرسال أي إشعارات إضافية.</p>
                          </div>
                          <div className="p-4 bg-white rounded-lg border-l-4 border-l-blue-500">
                            <h5 className="font-bold text-blue-800 mb-2">توفير بديل</h5>
                            <p className="text-sm text-gray-600">سيتم اقتراح منتج بديل مشابه للعميل مع نفس المواصفات والجودة.</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {activeSection === 'catalog-inventory' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">المخزون</h2>
                      <p className="text-gray-600">إدارة مخازنك في ليبيا وأولوية السحب</p>
                    </div>
                    <Button
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                      onClick={handleCreateWarehouse}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      إنشاء مخزن جديد
                    </Button>
                  </div>

                  {/* Warehouse Overview Statistics */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <Card className="shadow-lg">
                      <CardContent className="p-6">
                        <div className="text-center">
                          <p className="text-3xl font-bold text-blue-600 mb-1">{warehouses.length}</p>
                          <p className="text-sm text-gray-600">إجمالي المخازن</p>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="shadow-lg">
                      <CardContent className="p-6">
                        <div className="text-center">
                          <p className="text-3xl font-bold text-green-600 mb-1">{warehouses.filter(w => w.status === 'نشط').length}</p>
                          <p className="text-sm text-gray-600">المخازن النشطة</p>
                          <p className="text-sm text-gray-600 mt-1">من أصل {warehouses.length} مخازن</p>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="shadow-lg">
                      <CardContent className="p-6">
                        <div className="text-center">
                          <p className="text-3xl font-bold text-red-600 mb-1">{warehouses.filter(w => w.status === 'معطل').length}</p>
                          <p className="text-sm text-gray-600">المخازن المعطلة</p>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="shadow-lg">
                      <CardContent className="p-6">
                        <div className="text-center">
                          <p className="text-3xl font-bold text-purple-600 mb-1">127</p>
                          <p className="text-sm text-gray-600">الطلبات المرسلة</p>
                          <p className="text-sm text-gray-600 mt-1">هذا الشهر</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Priority Management */}
                  <Card className="shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Target className="h-5 w-5 text-blue-600" />
                        أولوية السحب من المخازن
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 mb-4">
                        اسحب المواقع لإعادة ترتيبها حسب الأولوية
                      </p>
                      <p className="text-xs text-gray-500 mb-6">
                        ملاحظة: تُوجَّه الطلبات أولاً للموقع الأعلى، وإذا لم يُنفَّذ الطلب بالكامل، يُقسَّم بين عدة مستودعات
                      </p>

                      <div className="space-y-3">
                        {warehouses
                          .sort((a, b) => a.id - b.id)
                          .map((warehouse, index) => (
                          <div key={warehouse.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 cursor-move hover:border-blue-400 transition-colors">
                            <div className="flex items-center gap-4">
                              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center font-bold text-blue-600">
                                {index + 1}
                              </div>
                              <div>
                                <p className="font-medium text-gray-900">{warehouse.name}</p>
                                <p className="text-sm text-gray-600">{warehouse.city}, {warehouse.country}</p>
                                {warehouse.coordinates && (
                                  <p className="text-xs text-gray-500">
                                    📍 {warehouse.coordinates.lat.toFixed(4)}, {warehouse.coordinates.lng.toFixed(4)}
                                  </p>
                                )}
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge className={warehouse.status === 'نشط' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                                {warehouse.status}
                              </Badge>
                              <div className="flex gap-1">
                                <Button size="sm" variant="outline">
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button size="sm" variant="outline">
                                  <MapPin className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Warehouses List */}
                  <Card className="shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Building className="h-5 w-5 text-green-600" />
                        قائمة المخازن
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b">
                              <th className="text-right p-3 font-medium">الاسم</th>
                              <th className="text-right p-3 font-medium">المدينة</th>
                              <th className="text-right p-3 font-medium">البلد</th>
                              <th className="text-right p-3 font-medium">الحالة</th>
                              <th className="text-right p-3 font-medium">الإجراءات</th>
                            </tr>
                          </thead>
                          <tbody>
                            {warehouses.map((warehouse, index) => (
                              <tr key={index} className="border-b hover:bg-gray-50">
                                <td className="p-3">
                                  <div>
                                    <p className="font-medium">{warehouse.name}</p>
                                    {warehouse.coordinates && (
                                      <p className="text-xs text-gray-500">
                                        📍 {warehouse.coordinates.lat.toFixed(4)}, {warehouse.coordinates.lng.toFixed(4)}
                                      </p>
                                    )}
                                  </div>
                                </td>
                                <td className="p-3">{warehouse.city}</td>
                                <td className="p-3">{warehouse.country}</td>
                                <td className="p-3">
                                  <Badge className={warehouse.status === 'مُفعّل' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                                    {warehouse.status}
                                  </Badge>
                                </td>
                                <td className="p-3">
                                  <div className="flex gap-1">
                                    <Button size="sm" variant="outline">
                                      <Edit className="h-4 w-4" />
                                    </Button>
                                    <Button size="sm" variant="outline">
                                      <MapPin className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {activeSection === 'catalog-stock-management' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900">إدارة تغييرات المخزون</h2>

                  <Card className="shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Archive className="h-5 w-5 text-blue-600" />
                        سجل تغييرات المخزون
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b">
                              <th className="text-right p-3 font-medium">الاسم</th>
                              <th className="text-right p-3 font-medium">كود SKU</th>
                              <th className="text-right p-3 font-medium">سبب التعديل</th>
                              <th className="text-right p-3 font-medium">قناة البيع</th>
                              <th className="text-right p-3 font-medium">المخزن</th>
                              <th className="text-right p-3 font-medium">الكمية</th>
                              <th className="text-right p-3 font-medium">الكمية بعد التعديل</th>
                              <th className="text-right p-3 font-medium">التاريخ/الوقت</th>
                            </tr>
                          </thead>
                          <tbody>
                            {[
                              {
                                name: 'فرن كهربائي بعينين',
                                sku: 'Eshro-87287187',
                                reason: 'حذف المنتج',
                                channel: 'منصة إشرو',
                                warehouse: 'مخزن غوط الشعال',
                                quantity: 13,
                                newQuantity: 9,
                                date: '20/09/2025',
                                time: '12:30:12 مساءً'
                              },
                              {
                                name: 'ثلاجة عصرية كبيرة',
                                sku: 'Eshro-83370002',
                                reason: 'حذف المنتج',
                                channel: 'منصة إشرو',
                                warehouse: 'مخزن طريق المطار',
                                quantity: 100,
                                newQuantity: 80,
                                date: '10/09/2025',
                                time: '18:30:12 مساءً'
                              },
                              {
                                name: 'طباخ راسل هوبز الكهربائي',
                                sku: 'Eshro-80000342',
                                reason: 'حذف المنتج',
                                channel: 'منصة إشرو',
                                warehouse: 'مخزن الكريمية',
                                quantity: 400,
                                newQuantity: 180,
                                date: '10/08/2025',
                                time: '15:30:12 ظهرًا'
                              }
                            ].map((change, index) => (
                              <tr key={index} className="border-b hover:bg-gray-50">
                                <td className="p-3">
                                  <p className="font-medium">{change.name}</p>
                                </td>
                                <td className="p-3">{change.sku}</td>
                                <td className="p-3">
                                  <Badge className="bg-red-100 text-red-800">{change.reason}</Badge>
                                </td>
                                <td className="p-3">{change.channel}</td>
                                <td className="p-3">{change.warehouse}</td>
                                <td className="p-3">
                                  <span className="text-red-600 font-medium">-{change.quantity}</span>
                                </td>
                                <td className="p-3">
                                  <span className="font-bold">{change.newQuantity}</span>
                                </td>
                                <td className="p-3">
                                  <div>
                                    <p>{change.date}</p>
                                    <p className="text-xs text-gray-600">{change.time}</p>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      <div className="flex items-center justify-center mt-6">
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">1</Button>
                          <Button variant="outline" size="sm">2</Button>
                          <Button variant="outline" size="sm">3</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {activeSection === 'catalog-custom-fields' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-gray-900">الحقول المخصصة</h2>
                    <Button className="bg-green-600 hover:bg-green-700 text-white">
                      <Plus className="h-4 w-4 mr-2" />
                      إنشاء حقل جديد
                    </Button>
                  </div>

                  {/* Custom Fields Interface */}
                  <Card className="shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Layers className="h-5 w-5 text-blue-600" />
                        إضافة بيانات مخصصة لمنتجاتك وتصنيفاتك
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <div className="flex items-center space-x-2">
                          <Checkbox id="disable-service" />
                          <Label htmlFor="disable-service" className="text-sm">تعطيل الخدمة</Label>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <Label htmlFor="field-name-ar">اسم الحقل بالعربية</Label>
                            <Input id="field-name-ar" placeholder="الاسم" />
                          </div>
                          <div>
                            <Label htmlFor="field-name-en">اسم الحقل بالإنجليزية</Label>
                            <Input id="field-name-en" placeholder="Name" />
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="field-address">عنوان الحقل</Label>
                          <Input id="field-address" placeholder="الدريبي، طرابلس" />
                        </div>

                        <div>
                          <Label htmlFor="field-type">نوع الحقل</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="نص" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="text">نص</SelectItem>
                              <SelectItem value="textarea">نص منسق</SelectItem>
                              <SelectItem value="date">تاريخ</SelectItem>
                              <SelectItem value="number">رقم</SelectItem>
                              <SelectItem value="image">صورة</SelectItem>
                              <SelectItem value="table">جدول</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-3">
                          <Label>العرض في:</Label>
                          <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                              <Checkbox id="merchant-dashboard" defaultChecked />
                              <Label htmlFor="merchant-dashboard" className="text-sm">لوحة تحكم التاجر</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox id="storefront" />
                              <Label htmlFor="storefront" className="text-sm">واجهة المنصة</Label>
                            </div>
                          </div>
                        </div>

                        <div className="flex justify-end gap-2">
                          <Button variant="outline">إلغاء</Button>
                          <Button className="bg-green-600 hover:bg-green-700">حفظ الحقل</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Field Types Preview */}
                  <Card className="shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Eye className="h-5 w-5 text-purple-600" />
                        عرض أنواع الحقول
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {[
                          { type: 'نص', description: 'نص عادي قصير', preview: 'تجربة' },
                          { type: 'نص منسق', description: 'نص مع تنسيق متقدم', preview: 'تجربة' },
                          { type: 'تاريخ', description: '2025/09/25', preview: 'تجربة' },
                          { type: 'رقم', description: '12345', preview: 'تجربة' },
                          { type: 'صورة', description: 'رفع صورة', preview: 'تجربة' },
                          { type: 'جدول', description: 'بيانات منظمة', preview: 'تجربة' }
                        ].map((field, index) => (
                          <div key={index} className="border rounded-lg p-4 text-center">
                            <h4 className="font-bold text-sm mb-2">{field.type}</h4>
                            <p className="text-xs text-gray-600 mb-3">{field.description}</p>
                            <div className="bg-gray-100 rounded p-2">
                              <p className="text-xs text-gray-800">{field.preview}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {activeSection === 'customers-reviews' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900">التقييمات</h2>

                  {/* Reviews Settings */}
                  <Card className="shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Star className="h-5 w-5 text-yellow-600" />
                        إعدادات التقييمات
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <p className="text-sm text-gray-600">
                          تتيح هذه الميزة لعملائك تقييم تجربتهم مع منتجاتك ومشاركتها
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <Label htmlFor="publish-all" className="text-sm">نشر الكل</Label>
                              <Checkbox id="publish-all" defaultChecked />
                            </div>

                            <div className="space-y-3">
                              <h4 className="font-bold text-gray-800">إعدادات الإشعارات</h4>
                              <p className="text-xs text-gray-600">
                                يمكنك إرسال إشعارات بالبريد الإلكتروني لتشجيع عملائك على تقييم المنتجات
                              </p>
                            </div>

                            <div className="space-y-3">
                              <div className="flex items-center space-x-2">
                                <Checkbox id="email-notifications" defaultChecked />
                                <Label htmlFor="email-notifications" className="text-sm">تفعيل إشعارات البريد الإلكتروني</Label>
                              </div>

                              <div className="flex items-center space-x-2">
                                <Checkbox id="sms-notifications" />
                                <Label htmlFor="sms-notifications" className="text-sm">تفعيل إشعارات الرسائل النصية (SMS)</Label>
                              </div>

                              <div className="flex items-center space-x-2">
                                <Checkbox id="review-notifications" defaultChecked />
                                <Label htmlFor="review-notifications" className="text-sm">إرسال إشعار على بريدي عند وجود تقييم جديد</Label>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-4">
                            <div>
                              <Label htmlFor="email-title-ar">عنوان رسالة البريد الإلكتروني بالعربية</Label>
                              <Input id="email-title-ar" placeholder="كتابة عنوان لتشجيع التقييم" />
                              <p className="text-xs text-gray-500 mt-1">عدد الأحرف 26 / 40</p>
                            </div>

                            <div>
                              <Label htmlFor="email-title-en">عنوان رسالة البريد الإلكتروني بالإنجليزية</Label>
                              <Input id="email-title-en" placeholder="Write title to encourage review" />
                              <p className="text-xs text-gray-500 mt-1">0 / 40 characters</p>
                            </div>

                            <div>
                              <Label htmlFor="email-content-ar">نص رسالة البريد الإلكتروني بالعربية</Label>
                              <Textarea id="email-content-ar" placeholder="نص الرسالة..." rows={3} />
                              <p className="text-xs text-gray-500 mt-1">0 / 320 characters</p>
                            </div>

                            <div>
                              <Label htmlFor="email-content-en">نص رسالة البريد الإلكتروني بالإنجليزية</Label>
                              <Textarea id="email-content-en" placeholder="Email message text..." rows={3} />
                              <p className="text-xs text-gray-500 mt-1">0 / 320 characters</p>
                            </div>

                            <div>
                              <Label htmlFor="email-timing">وقت إرسال البريد الإلكتروني:</Label>
                              <div className="flex items-center gap-2">
                                <Input id="email-timing" type="number" value="24" className="w-20" />
                                <span className="text-sm text-gray-600">ساعة</span>
                              </div>
                              <p className="text-xs text-gray-600 mt-1">
                                يتم إرسال طلب التقييم عبر البريد الإلكتروني بعد ساعات من إكمال العميل الطلب
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div className="flex items-center space-x-2">
                            <Checkbox id="auto-approve" defaultChecked />
                            <Label htmlFor="auto-approve" className="text-sm">تفعيل الموافقة والنشر التلقائي</Label>
                          </div>

                          <div className="flex items-center space-x-2">
                            <Checkbox id="allow-edit" />
                            <Label htmlFor="allow-edit" className="text-sm">تفعيل إمكانية تعديل التقييم بواسطة العميل</Label>
                          </div>
                        </div>

                        <div className="flex justify-end gap-2">
                          <Button variant="outline">إلغاء</Button>
                          <Button className="bg-green-600 hover:bg-green-700">حفظ الإعدادات</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Reviews List */}
                  <Card className="shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Star className="h-5 w-5 text-yellow-600" />
                        قائمة التقييمات
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-4 mb-6">
                        <Select>
                          <SelectTrigger className="w-48">
                            <SelectValue placeholder="الكل" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">الكل</SelectItem>
                            <SelectItem value="published">منشور</SelectItem>
                            <SelectItem value="hidden">مخفي</SelectItem>
                            <SelectItem value="pending">معدّل</SelectItem>
                          </SelectContent>
                        </Select>
                        <div className="relative flex-1">
                          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                          <Input placeholder="بحث في التقييمات..." className="pr-10" />
                        </div>
                      </div>

                      <div className="space-y-4">
                        {[
                          {
                            comment: 'معاملة طيبة، مع منتجات في قمة الروعة',
                            customer: 'عبدالله التاجوري',
                            date: '13/07/2025',
                            status: 'مفعل',
                            product: 'حقيبة بحر Vibes'
                          },
                          {
                            comment: 'جودة عالية وسعر مناسب جداً',
                            customer: 'فاطمة محمد الزهراني',
                            date: '25/08/2025',
                            status: 'مفعل',
                            product: 'فستان بحزام أكمام فانوس حافة مكشكشة'
                          },
                          {
                            comment: 'تجربة رائعة وخدمة ممتازة',
                            customer: 'أحمد علي الشريف',
                            date: '02/09/2025',
                            status: 'مفعل',
                            product: 'فستان ماكسي أحمر مكشوف الكتف بصدر دانتيل'
                          }
                        ].map((review, index) => (
                          <div key={index} className="border rounded-lg p-4">
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                  <User className="h-5 w-5 text-blue-600" />
                                </div>
                                <div>
                                  <p className="font-medium">{review.customer}</p>
                                  <p className="text-sm text-gray-600">اسم العميل: {review.customer}</p>
                                </div>
                              </div>
                              <Badge className="bg-green-100 text-green-800">{review.status}</Badge>
                            </div>

                            <div className="mb-3">
                              <p className="text-sm font-medium text-gray-800 mb-1">تعليق</p>
                              <p className="text-sm text-gray-700">{review.comment}</p>
                            </div>

                            <div className="flex items-center justify-between">
                              <div className="text-sm text-gray-600">
                                تاريخ الإنشاء: {review.date}
                              </div>
                              <div className="text-sm text-gray-600">
                                المنتج: {review.product}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {activeSection === 'customers-stock-notifications' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">إشعارات المخزون</h2>
                      <p className="text-gray-600">إشعار العملاء عند توفر المنتجات مرة أخرى</p>
                    </div>
                  </div>

                  {/* Stock Notifications Overview */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className="shadow-lg">
                      <CardContent className="p-6">
                        <div className="text-center">
                          <p className="text-3xl font-bold text-blue-600 mb-1">120</p>
                          <p className="text-sm text-gray-600">عدد الإشعارات المسجلة</p>
                          <p className="text-sm text-gray-600 mt-1">خلال الشهر الجاري</p>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="shadow-lg">
                      <CardContent className="p-6">
                        <div className="text-center">
                          <p className="text-3xl font-bold text-green-600 mb-1">30</p>
                          <p className="text-sm text-gray-600">إجمالي الإشعارات المرسلة</p>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="shadow-lg">
                      <CardContent className="p-6">
                        <div className="text-center">
                          <p className="text-3xl font-bold text-purple-600 mb-1">0 د.ل</p>
                          <p className="text-sm text-gray-600">المبيعات</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Notification Tabs */}
                  <Tabs defaultValue="الكل" className="space-y-6">
                    <TabsList className="grid w-full grid-cols-6">
                      <TabsTrigger value="الكل">الكل</TabsTrigger>
                      <TabsTrigger value="اليوم">اليوم</TabsTrigger>
                      <TabsTrigger value="الأمس">الأمس</TabsTrigger>
                      <TabsTrigger value="الشهر الماضي">الشهر الماضي</TabsTrigger>
                      <TabsTrigger value="الشهر الجاري">الشهر الجاري</TabsTrigger>
                      <TabsTrigger value="السنة الحالية">السنة الحالية</TabsTrigger>
                    </TabsList>

                    <TabsContent value="الكل" className="space-y-6">
                      {/* Notifications List */}
                      <Card className="shadow-lg">
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <Bell className="h-5 w-5 text-blue-600" />
                            قائمة التنبيهات
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="mb-6">
                            <div className="relative">
                              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                              <Input placeholder="بحث عن تنبيه معين..." className="pr-10" />
                            </div>
                          </div>

                          <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                              <thead>
                                <tr className="border-b">
                                  <th className="text-right p-3 font-medium">المنتج</th>
                                  <th className="text-right p-3 font-medium">الماركة</th>
                                  <th className="text-right p-3 font-medium">تاريخ الإشعار بتوفير المنتج</th>
                                  <th className="text-right p-3 font-medium">البريد الإلكتروني</th>
                                  <th className="text-right p-3 font-medium">رقم الموبايل</th>
                                  <th className="text-right p-3 font-medium">الكمية المطلوبة</th>
                                  <th className="text-right p-3 font-medium">تاريخ الاشتراك</th>
                                  <th className="text-right p-3 font-medium">حالة الإشعار</th>
                                  <th className="text-right p-3 font-medium">التواصل</th>
                                </tr>
                              </thead>
                              <tbody>
                                {[
                                  {
                                    product: 'فستان أحمر بالدانتيل',
                                    brand: 'SAMARA',
                                    notificationDate: '20/04/2025 10:30:23 صباحا',
                                    email: 'ahmed.salem@gmail.com',
                                    phone: '0922682101',
                                    quantity: 2,
                                    subscriptionDate: '10/01/2025',
                                    status: 'مفعل'
                                  },
                                  {
                                    product: 'حذاء نسائي أنيق',
                                    brand: 'ZARA',
                                    notificationDate: '18/04/2025 14:15:45 ظهرا',
                                    email: 'fatima.mohammed@hotmail.com',
                                    phone: '0915234567',
                                    quantity: 1,
                                    subscriptionDate: '05/02/2025',
                                    status: 'مفعل'
                                  },
                                  {
                                    product: 'فستان سهرين طويل Hermes',
                                    brand: 'Hermes',
                                    notificationDate: '15/04/2025 09:20:12 صباحا',
                                    email: 'omar.ali@gmail.com',
                                    phone: '0918765432',
                                    quantity: 1,
                                    subscriptionDate: '20/01/2025',
                                    status: 'مفعل'
                                  }
                                ].map((notification, index) => (
                                  <tr key={index} className="border-b hover:bg-gray-50">
                                    <td className="p-3">
                                      <p className="font-medium">{notification.product}</p>
                                    </td>
                                    <td className="p-3">{notification.brand}</td>
                                    <td className="p-3">{notification.notificationDate}</td>
                                    <td className="p-3">{notification.email}</td>
                                    <td className="p-3">{notification.phone}</td>
                                    <td className="p-3">{notification.quantity}</td>
                                    <td className="p-3">{notification.subscriptionDate}</td>
                                    <td className="p-3">
                                      <Badge className="bg-green-100 text-green-800">{notification.status}</Badge>
                                    </td>
                                    <td className="p-3">
                                      <div className="flex gap-1">
                                        <Button size="sm" variant="outline">
                                          <Mail className="h-4 w-4" />
                                        </Button>
                                        <Button size="sm" variant="outline">
                                          <MessageSquare className="h-4 w-4" />
                                        </Button>
                                      </div>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Notification Settings */}
                      <Card className="shadow-lg">
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <Settings className="h-5 w-5 text-purple-600" />
                            إعدادات التنبيهات التلقائية
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <Label>بعد:</Label>
                              <div className="flex items-center gap-2 mt-2">
                                <Input type="number" value="60" className="w-20" />
                                <span className="text-sm text-gray-600">دقيقة</span>
                              </div>
                              <p className="text-xs text-gray-600 mt-1">منذ إعادة توفير المنتج</p>
                            </div>

                            <div>
                              <Label>إضافة عرض</Label>
                              <Select>
                                <SelectTrigger className="mt-2">
                                  <SelectValue placeholder="بدون عرض" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="no-offer">بدون عرض</SelectItem>
                                  <SelectItem value="discount-code">كود الخصم</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>

                          <div className="space-y-4">
                            <div>
                              <Label>اختيار كود الخصم</Label>
                              <Select>
                                <SelectTrigger className="mt-2">
                                  <SelectValue placeholder="اختر كود الخصم" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="save10">خصم 10%</SelectItem>
                                  <SelectItem value="save20">خصم 20%</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div>
                                <Label>المنتج بالعربية</Label>
                                <Textarea
                                  value="عزيزنا {customer_name}، تم توفر {product_name} في منصة إشرو، بإمكانك طلبه الآن {product_url}"
                                  className="mt-2"
                                  rows={3}
                                />
                                <div className="flex flex-wrap gap-1 mt-2">
                                  <Badge variant="outline" className="text-xs">customer_name</Badge>
                                  <Badge variant="outline" className="text-xs">product_name</Badge>
                                  <Badge variant="outline" className="text-xs">product_url</Badge>
                                </div>
                              </div>

                              <div>
                                <Label>المنتج بالإنجليزية</Label>
                                <Textarea
                                  value="Dear {customer_name}, {product_name} is now back in stock, you can order it now {product_url}"
                                  className="mt-2"
                                  rows={3}
                                />
                                <div className="flex flex-wrap gap-1 mt-2">
                                  <Badge variant="outline" className="text-xs">customer_name</Badge>
                                  <Badge variant="outline" className="text-xs">product_name</Badge>
                                  <Badge variant="outline" className="text-xs">product_url</Badge>
                                </div>
                              </div>
                            </div>

                            <div className="bg-blue-50 p-4 rounded-lg">
                              <h4 className="font-bold text-blue-900 mb-2">القيم المقترحة:</h4>
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm">
                                <div>
                                  <Badge variant="outline" className="mr-1">customer_name</Badge>
                                  <span className="text-blue-700">- اسم العميل</span>
                                </div>
                                <div>
                                  <Badge variant="outline" className="mr-1">product_name</Badge>
                                  <span className="text-blue-700">- اسم المنتج</span>
                                </div>
                                <div>
                                  <Badge variant="outline" className="mr-1">product_url</Badge>
                                  <span className="text-blue-700">- رابط المنتج</span>
                                </div>
                              </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div>
                                <Label>قيمة الخصم</Label>
                                <Input placeholder="أدخل قيمة الخصم" className="mt-2" />
                              </div>

                              <div>
                                <Label>كود الخصم</Label>
                                <Input placeholder="أدخل كود الخصم" className="mt-2" />
                              </div>
                            </div>

                            <div className="flex justify-end">
                              <Button className="bg-green-600 hover:bg-green-700">
                                <Save className="h-4 w-4 mr-2" />
                                حفظ الإعدادات
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>
                  </Tabs>
                </div>
              )}

              {activeSection === 'customers-questions' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900">الأسئلة</h2>

                  <Card className="shadow-lg bg-gradient-to-r from-blue-50 to-purple-50">
                    <CardContent className="p-8 text-center">
                      <MessageSquare className="h-16 w-16 text-blue-400 mx-auto mb-4" />
                      <h3 className="text-xl font-bold text-gray-800 mb-4">جهز قسماً للأسئلة والأجوبة لكل منتج تعرضه</h3>
                      <p className="text-gray-600 mb-6">
                        دع عملاءك يطرحون أسئلة متعلقة بالمنتج
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <div className="text-center p-4 bg-white rounded-lg">
                          <p className="text-sm text-gray-600">فعّل الميزة لإظهار قسم الأسئلة والأجوبة في صفحات المنتجات</p>
                        </div>
                        <div className="text-center p-4 bg-white rounded-lg">
                          <p className="text-sm text-gray-600">ستصلك إشعارات بالأسئلة الجديدة</p>
                        </div>
                        <div className="text-center p-4 bg-white rounded-lg">
                          <p className="text-sm text-gray-600">يمكنك الرد عليها من لوحة تحكم التاجر</p>
                        </div>
                      </div>

                      <div className="text-center">
                        <p className="text-sm text-gray-600 mb-4">تحسين تجربة العميل وزيادة الثقة في المنتجات</p>
                        <Button className="bg-blue-600 hover:bg-blue-700">تفعيل الآن</Button>
                      </div>

                      <p className="text-xs text-gray-500 mt-4">
                        ملاحظة: بعد تفعيل هاذه الميزة، سيظهر قسم "الأسئلة والأجوبة" في جميع صفحات المنتجات بمتجرك
                      </p>
                    </CardContent>
                  </Card>
                </div>
              )}

              {activeSection === 'marketing-loyalty' && (
                <LoyaltyProgramView storeData={null} setStoreData={() => {}} onSave={() => {}} />
              )}

              {activeSection === 'marketing-coupons' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-gray-900">أكواد الخصم</h2>
                    <Button className="bg-green-600 hover:bg-green-700 text-white">
                      <Plus className="h-4 w-4 mr-2" />
                      إضافة كوبون جديد
                    </Button>
                  </div>

                  <Card className="shadow-lg">
                    <CardContent className="p-6">
                      <p className="text-sm text-gray-600 mb-4">إدارة أكواد كوبون الخصم وعروض المتجر</p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="coupon-code">مثال: SAVE20</Label>
                            <Input id="coupon-code" placeholder="أدخل كود الكوبون" />
                          </div>

                          <div>
                            <Label htmlFor="discount-type">نسبة مئوية (%)</Label>
                            <Input id="discount-type" type="number" placeholder="20" />
                          </div>

                          <div>
                            <Label htmlFor="discount-value">قيمة ثابتة</Label>
                            <Input id="discount-value" type="number" placeholder="0.00" />
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <Label htmlFor="start-date">تاريخ البداية</Label>
                              <Input id="start-date" type="date" />
                            </div>
                            <div>
                              <Label htmlFor="end-date">تاريخ النهاية</Label>
                              <Input id="end-date" type="date" />
                            </div>
                          </div>

                          <div className="flex justify-end gap-2">
                            <Button variant="outline">إلغاء</Button>
                            <Button className="bg-green-600 hover:bg-green-700">حفظ الكوبون</Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Coupons List */}
                  <Card className="shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Percent className="h-5 w-5 text-green-600" />
                        قائمة أكواد الخصم النشطة
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {[
                          {
                            name: 'ثلاجة عصرية كبيرة',
                            code: 'eshro-4897986',
                            discount: '25%',
                            maxAmount: '10,000.00 د.ل',
                            minAmount: '3,500.00 د.ل',
                            expiry: '2025-09-10',
                            link: 'https://eshro.ly/coupon/dress-modern-collection'
                          }
                        ].map((coupon, index) => (
                          <div key={index} className="border rounded-lg p-4">
                            <div className="flex items-center justify-between mb-3">
                              <div>
                                <h3 className="font-bold text-gray-800">{coupon.name}</h3>
                                <p className="text-sm text-gray-600">{coupon.code}</p>
                              </div>
                              <Badge className="bg-green-100 text-green-800">جديد</Badge>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                              <div>
                                <p className="text-gray-600">نوع الخصم:</p>
                                <p className="font-medium">نسبة مئوية {coupon.discount}</p>
                              </div>
                              <div>
                                <p className="text-gray-600">الحد الأعلى:</p>
                                <p className="font-medium">{coupon.maxAmount}</p>
                              </div>
                              <div>
                                <p className="text-gray-600">الحد الأدنى:</p>
                                <p className="font-medium">{coupon.minAmount}</p>
                              </div>
                              <div>
                                <p className="text-gray-600">تاريخ الانتهاء:</p>
                                <p className="font-medium">{coupon.expiry}</p>
                              </div>
                            </div>

                            <div className="mt-3 pt-3 border-t">
                              <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-600">رابط كود الخصم:</span>
                                <div className="flex items-center gap-2">
                                  <Input value={coupon.link} readOnly className="text-xs" />
                                  <Button variant="outline" size="sm">نسخ</Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {activeSection === 'analytics-inventory' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">تقارير المخزون</h2>
                      <p className="text-gray-600">تحليل شامل لحالة المخزون والمنتجات</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline">
                        <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l4-4m-4 4l-4-4m8 2h3m-3 4h3m-6-8h3m-3 4h3" />
                        </svg>
                        تصدير التقرير
                      </Button>
                      <Button>
                        <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        تحديث البيانات
                      </Button>
                    </div>
                  </div>

                  <Tabs defaultValue="نظرة عامة" className="space-y-6">
                    <TabsList className="grid w-full grid-cols-4">
                      <TabsTrigger value="نظرة عامة">نظرة عامة</TabsTrigger>
                      <TabsTrigger value="بالتصنيفات">بالتصنيفات</TabsTrigger>
                      <TabsTrigger value="اتجاهات">الاتجاهات</TabsTrigger>
                      <TabsTrigger value="تنبيهات">التنبيهات</TabsTrigger>
                    </TabsList>

                    <TabsContent value="نظرة عامة" className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <Card>
                          <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-sm font-medium text-gray-600">إجمالي المنتجات</p>
                                <p className="text-3xl font-bold text-gray-900">1,250</p>
                                <p className="text-sm text-blue-600">منتج في المخزون</p>
                              </div>
                              <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                </svg>
                              </div>
                            </div>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-sm font-medium text-gray-600">متوفر في المخزون</p>
                                <p className="text-3xl font-bold text-green-600">1,100</p>
                                <p className="text-sm text-green-600">88% من الإجمالي</p>
                              </div>
                              <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                                <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                              </div>
                            </div>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-sm font-medium text-gray-600">نقص في المخزون</p>
                                <p className="text-3xl font-bold text-yellow-600">85</p>
                                <p className="text-sm text-yellow-600">يحتاج إعادة تعبئة</p>
                              </div>
                              <div className="h-12 w-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                                <svg className="h-6 w-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                                </svg>
                              </div>
                            </div>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-sm font-medium text-gray-600">غير متوفر</p>
                                <p className="text-3xl font-bold text-red-600">65</p>
                                <p className="text-sm text-red-600">نفذ من المخزون</p>
                              </div>
                              <div className="h-12 w-12 bg-red-100 rounded-lg flex items-center justify-center">
                                <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>

                      <Card>
                        <CardHeader>
                          <CardTitle>القيمة الإجمالية للمخزون</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-center py-8">
                            <div className="text-4xl font-bold text-gray-900 mb-2">245,000 د.ل</div>
                            <p className="text-gray-600">القيمة الإجمالية للمنتجات في المخزون</p>
                            <div className="mt-4 flex justify-center">
                              <div className="w-32 h-32 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                                <span className="text-white font-bold text-lg">82%</span>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>

                    <TabsContent value="بالتصنيفات" className="space-y-6">
                      <Card>
                        <CardHeader>
                          <CardTitle>توزيع المنتجات حسب التصنيف</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            {[
                              { name: 'ملابس', count: 450, value: 125000, percentage: 51 },
                              { name: 'أحذية', count: 320, value: 85000, percentage: 35 },
                              { name: 'إكسسوارات', count: 280, value: 35000, percentage: 14 }
                            ].map((category, index) => (
                              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                <div className="flex items-center gap-4">
                                  <div className={`w-4 h-4 rounded-full bg-gradient-to-r ${
                                    index === 0 ? 'from-blue-500 to-blue-600' :
                                    index === 1 ? 'from-green-500 to-green-600' :
                                    'from-yellow-500 to-yellow-600'
                                  }`}></div>
                                  <div>
                                    <p className="font-medium text-gray-900">{category.name}</p>
                                    <p className="text-sm text-gray-600">{category.count} منتج</p>
                                  </div>
                                </div>
                                <div className="text-right">
                                  <p className="font-bold text-gray-900">{category.value.toLocaleString()} د.ل</p>
                                  <p className="text-sm text-gray-600">{category.percentage}%</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>

                    <TabsContent value="اتجاهات" className="space-y-6">
                      <Card>
                        <CardHeader>
                          <CardTitle>اتجاهات المخزون الشهرية</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            {[
                              { month: 'يناير', inStock: 1200, outOfStock: 50 },
                              { month: 'فبراير', inStock: 1150, outOfStock: 75 },
                              { month: 'مارس', inStock: 1180, outOfStock: 45 },
                              { month: 'أبريل', inStock: 1100, outOfStock: 65 },
                              { month: 'مايو', inStock: 1120, outOfStock: 55 },
                              { month: 'يونيو', inStock: 1080, outOfStock: 85 }
                            ].map((month, index) => (
                              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                                <div>
                                  <p className="font-medium text-gray-900">{month.month}</p>
                                  <p className="text-sm text-gray-600">
                                    متوفر: {month.inStock} | غير متوفر: {month.outOfStock}
                                  </p>
                                </div>
                                <div className="flex items-center gap-4">
                                  <div className="w-32 bg-gray-200 rounded-full h-3">
                                    <div
                                      className="bg-green-500 h-3 rounded-full"
                                      style={{ width: `${(month.inStock / 1200) * 100}%` }}
                                    ></div>
                                  </div>
                                  <span className="text-sm text-gray-600 w-16 text-center">
                                    {((month.inStock / (month.inStock + month.outOfStock)) * 100).toFixed(0)}%
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>

                    <TabsContent value="تنبيهات" className="space-y-6">
                      <Card>
                        <CardHeader>
                          <CardTitle>تنبيهات المخزون</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                                  <svg className="w-4 h-4 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                                  </svg>
                                </div>
                                <div>
                                  <p className="font-medium text-red-800">نقص في المخزون</p>
                                  <p className="text-sm text-red-600">65 منتج نفذ من المخزون ويحتاج إعادة تعبئة فورية</p>
                                </div>
                              </div>
                            </div>

                            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                                  <svg className="w-4 h-4 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                  </svg>
                                </div>
                                <div>
                                  <p className="font-medium text-yellow-800">مخزون منخفض</p>
                                  <p className="text-sm text-yellow-600">85 منتج وصل إلى الحد الأدنى ويحتاج إعادة طلب</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>
                  </Tabs>
                </div>
              )}

              {activeSection === 'analytics-customers' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">تقارير العملاء</h2>
                      <p className="text-gray-600">تحليل شامل لبيانات العملاء وسلوكياتهم</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline">
                        <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l4-4m-4 4l-4-4m8 2h3m-3 4h3m-6-8h3m-3 4h3" />
                        </svg>
                        تصدير التقرير
                      </Button>
                      <Button>
                        <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        تحديث البيانات
                      </Button>
                    </div>
                  </div>

                  <Tabs defaultValue="نظرة عامة" className="space-y-6">
                    <TabsList className="grid w-full grid-cols-4">
                      <TabsTrigger value="نظرة عامة">نظرة عامة</TabsTrigger>
                      <TabsTrigger value="العملاء الأعلى">العملاء الأعلى</TabsTrigger>
                      <TabsTrigger value="الشرائح">شرائح العملاء</TabsTrigger>
                      <TabsTrigger value="النمو">نمو العملاء</TabsTrigger>
                    </TabsList>

                    <TabsContent value="نظرة عامة" className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <Card>
                          <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-sm font-medium text-gray-600">إجمالي العملاء</p>
                                <p className="text-3xl font-bold text-gray-900">2,847</p>
                                <p className="text-sm text-blue-600">عميل مسجل</p>
                              </div>
                              <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                                </svg>
                              </div>
                            </div>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-sm font-medium text-gray-600">العملاء النشطون</p>
                                <p className="text-3xl font-bold text-green-600">2,156</p>
                                <p className="text-sm text-green-600">76% من الإجمالي</p>
                              </div>
                              <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                                <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                              </div>
                            </div>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-sm font-medium text-gray-600">عملاء جدد</p>
                                <p className="text-3xl font-bold text-purple-600">234</p>
                                <p className="text-sm text-purple-600">هذا الشهر</p>
                              </div>
                              <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
                                <svg className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                                </svg>
                              </div>
                            </div>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-sm font-medium text-gray-600">متوسط قيمة الطلب</p>
                                <p className="text-3xl font-bold text-yellow-600">145 د.ل</p>
                                <p className="text-sm text-yellow-600">لكل عميل</p>
                              </div>
                              <div className="h-12 w-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                                <svg className="h-6 w-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                                </svg>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>

                      <Card>
                        <CardHeader>
                          <CardTitle>شرائح العملاء</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            {[
                              { segment: 'عملاء جدد', count: 234, percentage: 8.2, color: 'bg-green-500' },
                              { segment: 'عملاء منتظمون', count: 1892, percentage: 66.5, color: 'bg-blue-500' },
                              { segment: 'عملاء VIP', count: 456, percentage: 16.0, color: 'bg-purple-500' },
                              { segment: 'عملاء غير نشطين', count: 265, percentage: 9.3, color: 'bg-gray-500' }
                            ].map((segment, index) => (
                              <div key={index} className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                  <div className={`w-4 h-4 rounded-full ${segment.color}`}></div>
                                  <span className="font-medium text-gray-900">{segment.segment}</span>
                                </div>
                                <div className="flex items-center gap-4">
                                  <div className="w-48 bg-gray-200 rounded-full h-3">
                                    <div
                                      className={`${segment.color} h-3 rounded-full`}
                                      style={{ width: `${segment.percentage}%` }}
                                    ></div>
                                  </div>
                                  <span className="text-sm text-gray-600 w-16 text-center">
                                    {segment.count} ({segment.percentage}%)
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>

                    <TabsContent value="العملاء الأعلى" className="space-y-6">
                      <Card>
                        <CardHeader>
                          <CardTitle>أفضل العملاء</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="overflow-x-auto">
                            <table className="w-full text-sm text-right">
                              <thead className="bg-gray-50">
                                <tr>
                                  <th className="p-3 text-right">العميل</th>
                                  <th className="p-3 text-right">عدد الطلبات</th>
                                  <th className="p-3 text-right">إجمالي المشتريات</th>
                                  <th className="p-3 text-right">آخر طلب</th>
                                  <th className="p-3 text-right">الحالة</th>
                                </tr>
                              </thead>
                              <tbody>
                                {[
                                  { name: 'أحمد محمد', orders: 12, totalSpent: 2450, lastOrder: '2024-01-15' },
                                  { name: 'فاطمة علي', orders: 8, totalSpent: 1890, lastOrder: '2024-01-14' },
                                  { name: 'محمد حسن', orders: 15, totalSpent: 3200, lastOrder: '2024-01-13' },
                                  { name: 'سارة أحمد', orders: 6, totalSpent: 1250, lastOrder: '2024-01-12' },
                                  { name: 'علي محمود', orders: 9, totalSpent: 1680, lastOrder: '2024-01-11' }
                                ].map((customer, index) => (
                                  <tr key={index} className="border-b">
                                    <td className="p-3 font-medium">{customer.name}</td>
                                    <td className="p-3">{customer.orders}</td>
                                    <td className="p-3 font-bold">{customer.totalSpent.toLocaleString()} د.ل</td>
                                    <td className="p-3">{customer.lastOrder}</td>
                                    <td className="p-3">
                                      <Badge className="bg-green-100 text-green-800">نشط</Badge>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>

                    <TabsContent value="الشرائح" className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[
                          { segment: 'عملاء جدد', count: 234, percentage: 8.2, color: 'bg-green-500' },
                          { segment: 'عملاء منتظمون', count: 1892, percentage: 66.5, color: 'bg-blue-500' },
                          { segment: 'عملاء VIP', count: 456, percentage: 16.0, color: 'bg-purple-500' },
                          { segment: 'عملاء غير نشطين', count: 265, percentage: 9.3, color: 'bg-gray-500' }
                        ].map((segment, index) => (
                          <Card key={index}>
                            <CardContent className="p-6">
                              <div className="flex items-center justify-between mb-4">
                                <div className={`w-12 h-12 rounded-full ${segment.color} flex items-center justify-center`}>
                                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                                  </svg>
                                </div>
                                <Badge variant="outline">{segment.percentage}%</Badge>
                              </div>
                              <h3 className="text-lg font-bold text-gray-900 mb-2">{segment.segment}</h3>
                              <p className="text-2xl font-bold text-gray-700">{segment.count.toLocaleString()}</p>
                              <p className="text-sm text-gray-600">عميل</p>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </TabsContent>

                    <TabsContent value="النمو" className="space-y-6">
                      <Card>
                        <CardHeader>
                          <CardTitle>نمو قاعدة العملاء</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            {[
                              { month: 'يناير', newCustomers: 180, totalCustomers: 2450 },
                              { month: 'فبراير', newCustomers: 195, totalCustomers: 2645 },
                              { month: 'مارس', newCustomers: 210, totalCustomers: 2855 },
                              { month: 'أبريل', newCustomers: 225, totalCustomers: 3080 },
                              { month: 'مايو', newCustomers: 240, totalCustomers: 3320 },
                              { month: 'يونيو', newCustomers: 234, totalCustomers: 3554 }
                            ].map((month, index) => (
                              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                                <div>
                                  <p className="font-medium text-gray-900">{month.month}</p>
                                  <p className="text-sm text-gray-600">
                                    عملاء جدد: {month.newCustomers} | إجمالي: {month.totalCustomers}
                                  </p>
                                </div>
                                <div className="flex items-center gap-4">
                                  <div className="text-sm text-gray-600">
                                    +{month.newCustomers} جديد
                                  </div>
                                  <div className="w-32 bg-gray-200 rounded-full h-3">
                                    <div
                                      className="bg-blue-500 h-3 rounded-full"
                                      style={{ width: `${(month.totalCustomers / 3600) * 100}%` }}
                                    ></div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>
                  </Tabs>
                </div>
              )}

              {activeSection === 'finance-wallet' && (
                <DigitalWalletView
                  storeData={null}
                  setStoreData={() => {}}
                  onSave={() => {}}
                />
              )}

              {activeSection === 'settings-interface' && (
                <StoreSettingsView
                  storeData={{
                    name: 'متجر نواعم',
                    phone: '0942161516',
                    address: 'طرابلس - سوق الجمعة',
                    email: 'contact@ishro.ly'
                  }}
                  setStoreData={() => {}}
                  onSave={() => {}}
                />
              )}

              {activeSection === 'settings-pages' && (
                <div className="space-y-6">
                  {/* Header with Modern Design */}
                  <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-2xl p-8 text-white shadow-2xl">
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="text-3xl font-bold mb-2">📄 إدارة الصفحات</h2>
                        <p className="text-blue-100 text-lg">أنشئ صفحات لتعريف العملاء بخدماتك أو لإضافة معلومات ضرورية، واختر مكان ظهورها في واجهة المتجر بحسب رغبتك.</p>
                      </div>
                      <div className="hidden md:block">
                        <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
                          <FileText className="h-10 w-10 text-white" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Statistics Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <Card className="hover-lift border-l-4 border-l-blue-500 shadow-lg">
                      <CardContent className="p-6">
                        <div className="text-center">
                          <p className="text-3xl font-bold text-blue-600 mb-1">6</p>
                          <p className="text-sm text-gray-600">إجمالي الصفحات</p>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="hover-lift border-l-4 border-l-green-500 shadow-lg">
                      <CardContent className="p-6">
                        <div className="text-center">
                          <p className="text-3xl font-bold text-green-600 mb-1">5</p>
                          <p className="text-sm text-gray-600">الصفحات المفعلة</p>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="hover-lift border-l-4 border-l-purple-500 shadow-lg">
                      <CardContent className="p-6">
                        <div className="text-center">
                          <p className="text-3xl font-bold text-purple-600 mb-1">1</p>
                          <p className="text-sm text-gray-600">مسودة</p>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="hover-lift border-l-4 border-l-orange-500 shadow-lg">
                      <CardContent className="p-6">
                        <div className="text-center">
                          <p className="text-3xl font-bold text-orange-600 mb-1">1,247</p>
                          <p className="text-sm text-gray-600">المشاهدات</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Enhanced Filter and Search Bar */}
                  <Card className="shadow-lg">
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                        <div className="flex gap-4 items-center flex-1">
                          <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white">
                            <Plus className="h-4 w-4 mr-2" />
                            إنشاء صفحة جديدة
                          </Button>

                          {/* Filter Dropdown */}
                          <Select>
                            <SelectTrigger className="w-48">
                              <SelectValue placeholder="الكل" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">الكل</SelectItem>
                              <SelectItem value="published">مفعل</SelectItem>
                              <SelectItem value="draft">غير مفعل</SelectItem>
                              <SelectItem value="cancelled">ملغية</SelectItem>
                            </SelectContent>
                          </Select>

                          <Select>
                            <SelectTrigger className="w-48">
                              <SelectValue placeholder="الحالة" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">الكل</SelectItem>
                              <SelectItem value="active">مفعل</SelectItem>
                              <SelectItem value="inactive">غير مفعل</SelectItem>
                              <SelectItem value="cancelled">ملغية</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="flex gap-2">
                          <div className="relative">
                            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <Input placeholder="البحث في الصفحات..." className="pr-10 w-64" />
                          </div>
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4 mr-2" />
                            تصدير
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Create New Page Modal */}
                  {productModalOpen && (
                    <Card className="shadow-lg">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Plus className="h-5 w-5 text-blue-600" />
                          إنشاء صفحة مخصصة
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-6">
                          {/* Multi-language Settings */}
                          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                            <h3 className="font-bold text-blue-900 mb-2">إعداد لغات متعددة</h3>
                            <p className="text-sm text-blue-800">
                              يستخدم متجرك اللغة العربية بشكل افتراضي، ولكن يمكنك إضافة وتعديل لغات متعددة في أي وقت.
                            </p>
                          </div>

                          {/* Page Information */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <Label htmlFor="page-title-ar">أدخل عنوان الصفحة بالعربية</Label>
                              <Input
                                id="page-title-ar"
                                placeholder="عنوان الصفحة باللغة العربية"
                                className="mt-1"
                              />
                            </div>

                            <div>
                              <Label htmlFor="page-title-en">Enter page title in English</Label>
                              <Input
                                id="page-title-en"
                                placeholder="Page title in English"
                                className="mt-1"
                              />
                            </div>

                            <div>
                              <Label htmlFor="page-desc-ar">أدخل وصف الصفحة بالعربية</Label>
                              <Textarea
                                id="page-desc-ar"
                                placeholder="وصف الصفحة باللغة العربية"
                                className="mt-1"
                                rows={3}
                              />
                              <p className="text-xs text-gray-500 mt-1">عدد الكلمات: 0/320</p>
                            </div>

                            <div>
                              <Label htmlFor="page-desc-en">Enter page description in English</Label>
                              <Textarea
                                id="page-desc-en"
                                placeholder="Page description in English"
                                className="mt-1"
                                rows={3}
                              />
                              <p className="text-xs text-gray-500 mt-1">عدد الكلمات: 0/320</p>
                            </div>
                          </div>

                          {/* Display Options */}
                          <div className="space-y-3">
                            <Label>عرض عنوان الصفحة أسفل المتجر</Label>
                            <div className="flex items-center space-x-2">
                              <Checkbox id="show-in-footer" />
                              <Label htmlFor="show-in-footer" className="text-sm">تفعيل العرض في الفوتر</Label>
                            </div>
                          </div>

                          {/* SEO Section */}
                          <div className="space-y-4">
                            <h3 className="font-bold text-gray-800">تحسين محركات البحث</h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div>
                                <Label htmlFor="seo-title-ar">عنوان محسن لمحركات البحث</Label>
                                <Input
                                  id="seo-title-ar"
                                  placeholder="عنوان محسن للسيو"
                                  className="mt-1"
                                />
                                <p className="text-xs text-gray-500 mt-1">عدد الأحرف: 0/72</p>
                              </div>

                              <div>
                                <Label htmlFor="seo-title-en">SEO optimized title</Label>
                                <Input
                                  id="seo-title-en"
                                  placeholder="SEO optimized title"
                                  className="mt-1"
                                />
                                <p className="text-xs text-gray-500 mt-1">عدد الأحرف: 0/72</p>
                              </div>

                              <div>
                                <Label htmlFor="seo-desc-ar">وصف محسن لمحركات البحث</Label>
                                <Textarea
                                  id="seo-desc-ar"
                                  placeholder="وصف محسن للسيو بالعربية"
                                  className="mt-1"
                                  rows={3}
                                />
                              </div>

                              <div>
                                <Label htmlFor="seo-desc-en">SEO optimized description</Label>
                                <Textarea
                                  id="seo-desc-en"
                                  placeholder="SEO optimized description in English"
                                  className="mt-1"
                                  rows={3}
                                />
                              </div>
                            </div>
                          </div>

                          {/* URL Section */}
                          <div>
                            <Label htmlFor="page-url">أدخل الرابط</Label>
                            <Input
                              id="page-url"
                              placeholder="page-url"
                              className="mt-1"
                            />
                            <p className="text-xs text-gray-500 mt-1">الرابط الكامل: https://eshro.ly/pages/page-url</p>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex justify-end gap-2">
                            <Button variant="outline">إلغاء</Button>
                            <Button className="bg-green-600 hover:bg-green-700">حفظ</Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Pages Table with Enhanced Design */}
                  <Card className="shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <FileText className="h-5 w-5 text-blue-600" />
                        قائمة الصفحات
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b">
                              <th className="text-right p-3 font-medium">الإسم</th>
                              <th className="text-right p-3 font-medium">الحالة</th>
                              <th className="text-right p-3 font-medium">التاريخ</th>
                              <th className="text-right p-3 font-medium">المشاهدات</th>
                              <th className="text-right p-3 font-medium">الخيارات</th>
                            </tr>
                          </thead>
                          <tbody>
                            {[
                              { name: 'عن المتجر', status: 'مفعل', date: '2022-01-03', views: '1,247', color: 'green' },
                              { name: 'التواصل معنا', status: 'مفعل', date: '2022-01-03', views: '892', color: 'green' },
                              { name: 'شروط الإستخدام', status: 'مفعل', date: '2022-01-03', views: '654', color: 'green' },
                              { name: 'سياسة الاسترجاع والاستبدال والإلغاء', status: 'مفعل', date: '2022-01-03', views: '423', color: 'green' },
                              { name: 'صفحة تجريبية', status: 'مفعل', date: '2024-02-27', views: '156', color: 'green' },
                              { name: 'صفحة تجريبية', status: 'مفعل', date: '2024-02-27', views: '89', color: 'green' }
                            ].map((page, index) => (
                              <tr key={index} className="border-b hover:bg-gray-50">
                                <td className="p-3">
                                  <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                      <FileText className="h-5 w-5 text-blue-600" />
                                    </div>
                                    <div>
                                      <p className="font-medium">{page.name}</p>
                                      <p className="text-xs text-gray-600">صفحة ثابتة</p>
                                    </div>
                                  </div>
                                </td>
                                <td className="p-3">
                                  <Badge className={page.color === 'green' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                                    {page.status}
                                  </Badge>
                                </td>
                                <td className="p-3">{page.date}</td>
                                <td className="p-3">
                                  <div className="flex items-center gap-2">
                                    <Eye className="h-4 w-4 text-gray-400" />
                                    <span className="font-medium">{page.views}</span>
                                  </div>
                                </td>
                                <td className="p-3">
                                  <div className="flex gap-1">
                                    <Button size="sm" variant="outline" className="hover:bg-blue-50" title="تعديل">
                                      <Edit className="h-4 w-4" />
                                    </Button>
                                    <Button size="sm" variant="outline" className="hover:bg-red-50" title="حذف">
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                    <Button size="sm" variant="outline" className="hover:bg-green-50" title="مشاهدة">
                                      <Eye className="h-4 w-4" />
                                    </Button>
                                    <Button size="sm" variant="outline" className="hover:bg-purple-50" title="حفظ">
                                      <Save className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      <div className="flex items-center justify-center mt-6">
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" className="bg-blue-50">1</Button>
                          <Button variant="outline" size="sm">2</Button>
                          <Button variant="outline" size="sm">3</Button>
                          <Button variant="outline" size="sm">4</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {activeSection === 'settings-menu' && (
                <div className="space-y-6">
                  {/* Header with Modern Design */}
                  <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 rounded-2xl p-8 text-white shadow-2xl">
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="text-3xl font-bold mb-2">🗂️ تعديل القائمة الرئيسية للمتجر</h2>
                        <p className="text-purple-100 text-lg">إدارة وتنظيم عناصر القائمة الرئيسية لمتجرك الإلكتروني</p>
                      </div>
                      <div className="hidden md:block">
                        <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
                          <Menu className="h-10 w-10 text-white" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Statistics Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <Card className="hover-lift border-l-4 border-l-purple-500 shadow-lg">
                      <CardContent className="p-6">
                        <div className="text-center">
                          <p className="text-3xl font-bold text-purple-600 mb-1">8</p>
                          <p className="text-sm text-gray-600">إجمالي عناصر القائمة</p>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="hover-lift border-l-4 border-l-green-500 shadow-lg">
                      <CardContent className="p-6">
                        <div className="text-center">
                          <p className="text-3xl font-bold text-green-600 mb-1">7</p>
                          <p className="text-sm text-gray-600">العناصر المرئية</p>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="hover-lift border-l-4 border-l-blue-500 shadow-lg">
                      <CardContent className="p-6">
                        <div className="text-center">
                          <p className="text-3xl font-bold text-blue-600 mb-1">1</p>
                          <p className="text-sm text-gray-600">عنصر مخفي</p>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="hover-lift border-l-4 border-l-orange-500 shadow-lg">
                      <CardContent className="p-6">
                        <div className="text-center">
                          <p className="text-3xl font-bold text-orange-600 mb-1">3</p>
                          <p className="text-sm text-gray-600">الصفحات المرتبطة</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Add New Link Section */}
                  <Card className="shadow-lg bg-gradient-to-r from-blue-50 to-purple-50">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Plus className="h-5 w-5 text-blue-600" />
                        إضافة رابط
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div>
                            <Label className="text-right rtl-text">العنوان</Label>
                            <Input placeholder="أدخل عنوان الرابط" className="text-right rtl-text" />
                          </div>
                          <div>
                            <Label className="text-right rtl-text">URL الرابط</Label>
                            <div className="flex">
                              <span className="inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                                http://
                              </span>
                              <Input placeholder="example.com" className="rounded-l-none text-right rtl-text" />
                            </div>
                          </div>
                          <div>
                            <Label className="text-right rtl-text">مكان العرض</Label>
                            <Select>
                              <SelectTrigger className="text-right rtl-text">
                                <SelectValue placeholder="اختر مكان العرض" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="header">الهيدر (القائمة الرئيسية)</SelectItem>
                                <SelectItem value="footer">الفوتر</SelectItem>
                                <SelectItem value="sidebar">الشريط الجانبي</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div className="flex items-center space-x-2">
                            <Checkbox id="open-same-page" />
                            <Label htmlFor="open-same-page" className="text-sm rtl-text">فتح الرابط في نفس الصفحة</Label>
                          </div>

                          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                            <h4 className="font-bold text-blue-900 mb-2 rtl-text">📝 نصائح للروابط:</h4>
                            <ul className="text-sm text-blue-800 space-y-1">
                              <li>• استخدم عناوين واضحة ومفهومة</li>
                              <li>• تأكد من صحة الروابط</li>
                              <li>• اختر المكان المناسب للعرض</li>
                            </ul>
                          </div>

                          <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
                            <Plus className="h-4 w-4 mr-2" />
                            إضافة الرابط
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Available Pages Section */}
                  <Card className="shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <FileText className="h-5 w-5 text-green-600" />
                        الصفحات
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[
                          { name: 'التواصل معنا', type: 'صفحة', icon: '📞' },
                          { name: 'سياسة الاسترجاع والاستبدال والإلغاء', type: 'صفحة', icon: '📋' },
                          { name: 'شروط الإستخدام', type: 'صفحة', icon: '📄' },
                          { name: 'صفحة تجريبية', type: 'صفحة', icon: '📝' },
                          { name: 'صفحة تجريبية', type: 'صفحة', icon: '📝' },
                          { name: 'عن المتجر', type: 'صفحة', icon: '🏪' }
                        ].map((page, index) => (
                          <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border hover:bg-blue-50 transition-colors">
                            <div className="flex items-center gap-3">
                              <div className="text-2xl">{page.icon}</div>
                              <div>
                                <p className="font-medium text-gray-900">{page.name}</p>
                                <p className="text-xs text-gray-600">{page.type}</p>
                              </div>
                            </div>
                            <Button size="sm" variant="outline" className="hover:bg-green-50">
                              <Plus className="h-4 w-4 mr-2" />
                              إضافة
                            </Button>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Categories Section */}
                  <Card className="shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Tag className="h-5 w-5 text-blue-600" />
                        التصنيفات
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[
                          { name: 'الإلكترونيات', count: '45 منتج', icon: '📱' },
                          { name: 'الملابس النسائية', count: '123 منتج', icon: '👗' },
                          { name: 'الأحذية', count: '67 منتج', icon: '👟' },
                          { name: 'الإكسسوارات', count: '89 منتج', icon: '💍' },
                          { name: 'العطور', count: '34 منتج', icon: '🌸' },
                          { name: 'المنتجات الرقمية', count: '12 منتج', icon: '💻' }
                        ].map((category, index) => (
                          <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border hover:bg-green-50 transition-colors">
                            <div className="flex items-center gap-3">
                              <div className="text-2xl">{category.icon}</div>
                              <div>
                                <p className="font-medium text-gray-900">{category.name}</p>
                                <p className="text-xs text-gray-600">{category.count}</p>
                              </div>
                            </div>
                            <Button size="sm" variant="outline" className="hover:bg-blue-50">
                              <Plus className="h-4 w-4 mr-2" />
                              إضافة
                            </Button>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Brands Section */}
                  <Card className="shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Star className="h-5 w-5 text-yellow-600" />
                        العلامات التجارية
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[
                          { name: 'Samsung', count: '25 منتج', icon: '📱' },
                          { name: 'Nike', count: '18 منتج', icon: '👟' },
                          { name: 'Adidas', count: '15 منتج', icon: '⚽' },
                          { name: 'Apple', count: '12 منتج', icon: '🍎' },
                          { name: 'Dell', count: '8 منتج', icon: '💻' },
                          { name: 'Sony', count: '6 منتج', icon: '🎮' }
                        ].map((brand, index) => (
                          <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border hover:bg-purple-50 transition-colors">
                            <div className="flex items-center gap-3">
                              <div className="text-2xl">{brand.icon}</div>
                              <div>
                                <p className="font-medium text-gray-900">{brand.name}</p>
                                <p className="text-xs text-gray-600">{brand.count}</p>
                              </div>
                            </div>
                            <Button size="sm" variant="outline" className="hover:bg-yellow-50">
                              <Plus className="h-4 w-4 mr-2" />
                              إضافة
                            </Button>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Menu Structure */}
                  <Card className="shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Menu className="h-5 w-5 text-purple-600" />
                        هيكل القائمة
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {[
                          { name: 'الرئيسية', type: 'رابط مخصص', url: '/', status: 'مرئي', color: 'green' },
                          { name: 'جميع المنتجات', type: 'رابط مخصص', url: '/products', status: 'مرئي', color: 'green' },
                          { name: 'الصفحات', type: 'رابط مخصص', url: '/pages', status: 'مرئي', color: 'green' },
                          { name: 'عن المتجر', type: 'الصفحات', url: '/about', status: 'مرئي', color: 'green' },
                          { name: 'شروط الإستخدام', type: 'الصفحات', url: '/terms', status: 'مرئي', color: 'green' },
                          { name: 'سياسة الإسترجاع', type: 'الصفحات', url: '/returns', status: 'مرئي', color: 'green' },
                          { name: 'التواصل معنا', type: 'الصفحات', url: '/contact', status: 'مخفي', color: 'gray' }
                        ].map((item, index) => (
                          <div key={index} className="border rounded-lg p-4 bg-white hover:shadow-md transition-shadow">
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                                  <span className="text-purple-600 font-bold text-sm">{index + 1}</span>
                                </div>
                                <div>
                                  <span className="font-medium text-gray-900">{item.name}</span>
                                  <Badge className={`mr-2 ${item.color === 'green' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                                    {item.status}
                                  </Badge>
                                </div>
                              </div>
                              <div className="flex gap-2">
                                <Button size="sm" variant="outline" className="hover:bg-blue-50">
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button size="sm" variant="outline" className="hover:bg-red-50">
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                            <div className="text-xs text-gray-600">
                              <span className="font-medium">النوع:</span> {item.type} |
                              <span className="font-medium mr-2">الرابط:</span> {item.url}
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Menu Preview */}
                  <Card className="shadow-lg bg-gradient-to-r from-gray-50 to-gray-100">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Eye className="h-5 w-5 text-green-600" />
                        معاينة القائمة
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="bg-white rounded-lg p-4 border">
                        <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                          <span className="text-sm font-medium text-gray-700">القائمة الحالية:</span>
                          <div className="flex gap-3 flex-wrap">
                            {['الرئيسية', 'جميع المنتجات', 'الصفحات', 'عن المتجر', 'شروط الإستخدام', 'سياسة الإسترجاع'].map((item, index) => (
                              <div key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                                {item}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className="shadow-lg bg-gradient-to-r from-yellow-50 to-orange-50">
                      <CardContent className="p-6 text-center">
                        <h4 className="font-bold text-gray-800 mb-2">استعادة القائمة الإفتراضية</h4>
                        <p className="text-sm text-gray-600 mb-4">استعادة القائمة إلى إعداداتها الافتراضية</p>
                        <Button variant="outline" className="w-full">
                          <RefreshCw className="h-4 w-4 mr-2" />
                          استعادة القائمة الإفتراضية
                        </Button>
                      </CardContent>
                    </Card>

                    <Card className="shadow-lg bg-gradient-to-r from-green-50 to-blue-50">
                      <CardContent className="p-6 text-center">
                        <h4 className="font-bold text-gray-800 mb-2">النشر والحفظ</h4>
                        <p className="text-sm text-gray-600 mb-4">سيتم حفظ جميع التغييرات وحفظ القائمة الجديدة</p>
                        <div className="flex gap-2">
                          <Button variant="outline" className="flex-1">إلغاء</Button>
                          <Button className="flex-1 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600">
                            <Save className="h-4 w-4 mr-2" />
                            حفظ
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              )}

              {activeSection === 'settings-sliders' && (
                <div className="space-y-6">
                  {/* Header with Modern Design */}
                  <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-2xl p-8 text-white shadow-2xl">
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="text-3xl font-bold mb-2">🎠 إدارة السلايدرز</h2>
                        <p className="text-blue-100 text-lg">إنشاء وتعديل السلايدرز التفاعلية لمتجرك الإلكتروني</p>
                      </div>
                      <div className="hidden md:block">
                        <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
                          <Image className="h-10 w-10 text-white" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Statistics Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <Card className="hover-lift border-l-4 border-l-blue-500 shadow-lg">
                      <CardContent className="p-6">
                        <div className="text-center">
                          <p className="text-3xl font-bold text-blue-600 mb-1">3</p>
                          <p className="text-sm text-gray-600">إجمالي السلايدرز</p>
                          <p className="text-xs text-gray-500 mt-1">البنرات الرئيسية • المنتجات المميزة • العروض الخاصة</p>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="hover-lift border-l-4 border-l-green-500 shadow-lg">
                      <CardContent className="p-6">
                        <div className="text-center">
                          <p className="text-3xl font-bold text-green-600 mb-1">3</p>
                          <p className="text-sm text-gray-600">السلايدرز المفعلة</p>
                          <p className="text-xs text-green-600 mt-1">✅ مفعلة بالكامل للتاجر مونير</p>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="hover-lift border-l-4 border-l-purple-500 shadow-lg">
                      <CardContent className="p-6">
                        <div className="text-center">
                          <p className="text-3xl font-bold text-purple-600 mb-1">0</p>
                          <p className="text-sm text-gray-600">مسودة</p>
                          <p className="text-xs text-gray-500 mt-1">لا توجد مسودات حالياً</p>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="hover-lift border-l-4 border-l-orange-500 shadow-lg">
                      <CardContent className="p-6">
                        <div className="text-center">
                          <p className="text-3xl font-bold text-orange-600 mb-1">15</p>
                          <p className="text-sm text-gray-600">إجمالي الشرائح</p>
                          <p className="text-xs text-orange-600 mt-1">🖼️ صور حقيقية من منتجات متجر نواعم</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Enhanced Filter and Search Bar */}
                  <Card className="shadow-lg">
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                        <div className="flex gap-4 items-center flex-1">
                          {/* Filter Box - الكل */}
                          <div className="flex items-center gap-2">
                            <Label className="text-sm font-medium text-gray-700">مربع الكل للفلترة:</Label>
                            <Select value={slidersFilter} onValueChange={handleSlidersFilterChange}>
                              <SelectTrigger className="w-40">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="all">الكل</SelectItem>
                                <SelectItem value="active">المفعل فقط</SelectItem>
                                <SelectItem value="inactive">غير المفعل فقط</SelectItem>
                                <SelectItem value="draft">المسودات فقط</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          {/* Filter Dropdown - القيمة/الحالة */}
                          <div className="flex items-center gap-2">
                            <Select value={slidersStatusFilter} onValueChange={setSlidersStatusFilter}>
                              <SelectTrigger className="w-48">
                                <SelectValue placeholder="فلترة بالحالة" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="all">جميع الحالات</SelectItem>
                                <SelectItem value="مفعل">مفعل</SelectItem>
                                <SelectItem value="غير مفعل">غير مفعل</SelectItem>
                                <SelectItem value="مسودة">مسودة</SelectItem>
                              </SelectContent>
                            </Select>

                            {/* Status Filter Input */}
                            <div className="flex items-center gap-2">
                              <Input placeholder="البحث في السلايدرز..." className="w-48" />
                            </div>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <div className="relative">
                            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <Input placeholder="البحث في السلايدرز..." className="pr-10 w-64" />
                          </div>
                          <Button variant="outline" size="sm" className="hover:bg-blue-50">
                            <RefreshCw className="h-4 w-4 mr-2" />
                            تحديث
                          </Button>
                          <Button variant="outline" size="sm" className="hover:bg-green-50">
                            <ArrowLeftRight className="h-4 w-4 mr-2" />
                            فرز
                          </Button>
                          <Button
                            className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white"
                            onClick={handleCreateSlider}
                          >
                            <Plus className="h-4 w-4 mr-2" />
                            إضافة سلايدر جديد
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Slider Modal */}
                  {sliderModalOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
                      <div className="bg-white rounded-2xl p-6 w-full max-w-2xl mx-4 shadow-2xl border">
                        <div className="flex items-center justify-between mb-6">
                          <h3 className="text-xl font-bold text-gray-900">
                            {currentSlider ? 'تعديل السلايدر' : 'إضافة سلايدر جديد'}
                          </h3>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setSliderModalOpen(false);
                              setCurrentSlider(null);
                            }}
                            className="hover:bg-gray-100"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>

                        <div className="space-y-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <Label htmlFor="slider-title">العنوان *</Label>
                              <Input
                                id="slider-title"
                                placeholder="أدخل عنوان السلايدر"
                                value={sliderForm.title}
                                onChange={(e) => setSliderForm({...sliderForm, title: e.target.value})}
                                className="mt-1"
                              />
                            </div>

                            <div>
                              <Label htmlFor="slider-link">الرابط</Label>
                              <Input
                                id="slider-link"
                                placeholder="أدخل الرابط"
                                value={sliderForm.link}
                                onChange={(e) => setSliderForm({...sliderForm, link: e.target.value})}
                                className="mt-1"
                              />
                            </div>
                          </div>

                          <div>
                            <Label htmlFor="slider-description">الوصف</Label>
                            <Textarea
                              id="slider-description"
                              placeholder="وصف مفصل للسلايدر"
                              value={sliderForm.description}
                              onChange={(e) => setSliderForm({...sliderForm, description: e.target.value})}
                              className="mt-1"
                              rows={3}
                            />
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <Label htmlFor="slider-order">الترتيب</Label>
                              <Input
                                id="slider-order"
                                type="number"
                                placeholder="0"
                                value={sliderForm.order}
                                onChange={(e) => setSliderForm({...sliderForm, order: Number(e.target.value)})}
                                className="mt-1"
                              />
                            </div>

                            <div>
                              <Label>الحالة</Label>
                              <Select value={sliderForm.status} onValueChange={(value) => setSliderForm({...sliderForm, status: value})}>
                                <SelectTrigger className="mt-1">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="active">مفعل</SelectItem>
                                  <SelectItem value="inactive">غير مفعل</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>

                          <div>
                            <Label>معاينة الصور (5 شرائح)</Label>
                            <div className="grid grid-cols-5 gap-2 mt-2">
                              {sliderForm.image ? (
                                Array.from({length: 5}, (_, i) => (
                                  <div key={i} className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                                    <img
                                      src={sliderForm.image}
                                      alt={`شريحة ${i + 1}`}
                                      className="w-full h-full object-cover rounded-lg"
                                    />
                                  </div>
                                ))
                              ) : (
                                Array.from({length: 5}, (_, i) => (
                                  <div key={i} className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
                                    <span className="text-gray-400 text-sm">{i + 1}</span>
                                  </div>
                                ))
                              )}
                            </div>
                            <p className="text-xs text-gray-500 mt-1">سيتم استخدام صور منتجات متجر نواعم الحقيقية</p>
                          </div>

                          <div className="flex gap-3 pt-4">
                            <Button
                              onClick={handleSaveSlider}
                              className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                            >
                              <Save className="h-4 w-4 mr-2" />
                              {currentSlider ? 'تحديث السلايدر' : 'إنشاء السلايدر'}
                            </Button>
                            <Button
                              variant="outline"
                              onClick={() => {
                                setSliderModalOpen(false);
                                setCurrentSlider(null);
                              }}
                              className="transition-all duration-200 hover:bg-gray-50"
                            >
                              إلغاء
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Create New Slider Modal */}
                  {categoryModalOpen && (
                    <Card className="shadow-lg">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Plus className="h-5 w-5 text-blue-600" />
                          إضافة سلايدر جديد
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <Label htmlFor="slider-title">العنوان</Label>
                            <Input
                              id="slider-title"
                              placeholder="أدخل عنوان السلايدر"
                              className="mt-1 text-right"
                            />
                          </div>

                          <div>
                            <Label htmlFor="slider-link">الرابط</Label>
                            <Input
                              id="slider-link"
                              placeholder="أدخل الرابط للمتجر"
                              className="mt-1 text-right"
                            />
                          </div>

                          <div className="md:col-span-2">
                            <Label htmlFor="slider-desc">الوصف</Label>
                            <Textarea
                              id="slider-desc"
                              placeholder="وصف مفصل للسلايدر"
                              className="mt-1 text-right"
                              rows={3}
                            />
                          </div>

                          <div>
                            <Label htmlFor="slider-order">الترتيب</Label>
                            <Input
                              id="slider-order"
                              type="number"
                              placeholder="0"
                              className="mt-1 text-right"
                            />
                            <p className="text-xs text-gray-500 mt-1">يتم تحديد قيمة لتغيير التسلسل الافتراضي</p>
                          </div>

                          <div className="md:col-span-2">
                            <Label htmlFor="slider-image">صورة السلايدر</Label>
                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                              <Image className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                              <p className="text-sm text-gray-600 mb-2">إختيار صور</p>
                              <p className="text-xs text-gray-500 mb-4">رفع صورة من المرفقات</p>
                              <p className="text-xs text-gray-500 mb-4">JPG, JPEG, PNG, WEBP, PDF</p>
                              <input
                                type="file"
                                id="slider-image"
                                accept="image/*,.pdf"
                                className="hidden"
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) {
                                    console.log('Slider image selected:', file.name);
                                  }
                                }}
                              />
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => document.getElementById('slider-image')?.click()}
                              >
                                <Upload className="h-4 w-4 mr-2" />
                                إختيار صورة
                              </Button>
                            </div>
                          </div>
                        </div>

                        <div className="flex gap-4 pt-4">
                          <Button className="bg-green-600 hover:bg-green-700 flex-1">حفظ</Button>
                          <Button variant="outline" className="flex-1">إلغاء</Button>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Sliders Table */}
                  <Card className="shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Image className="h-5 w-5 text-blue-600" />
                        قائمة السلايدرز
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm text-right">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="p-3 text-right font-medium">الإسم</th>
                              <th className="p-3 text-right font-medium">الحالة</th>
                              <th className="p-3 text-right font-medium">التاريخ</th>
                              <th className="p-3 text-right font-medium">المشاهدات</th>
                              <th className="p-3 text-right font-medium">النقرات</th>
                              <th className="p-3 text-right font-medium">الخيارات</th>
                            </tr>
                          </thead>
                          <tbody>
                            {getFilteredSliders().map((slider, index) => (
                              <tr key={index} className="border-b hover:bg-gray-50">
                                <td className="p-3">
                                  <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-gradient-to-br from-pink-100 to-purple-100 rounded-lg flex items-center justify-center">
                                      <Image className="h-5 w-5 text-pink-600" />
                                    </div>
                                    <div>
                                      <p className="font-medium text-gray-900">{slider.name}</p>
                                      <p className="text-xs text-gray-600">{slider.slides} شرائح • متجر {slider.store}</p>
                                      <p className="text-xs text-blue-600">{slider.description}</p>
                                    </div>
                                  </div>
                                </td>
                                <td className="p-3">
                                  <Badge className="bg-green-100 text-green-800 hover:bg-green-200 cursor-pointer">
                                    ✅ {slider.status}
                                  </Badge>
                                </td>
                                <td className="p-3 text-gray-900">
                                  <div className="flex items-center gap-2">
                                    <Eye className="h-4 w-4 text-gray-400" />
                                    <span className="font-medium">{slider.views?.toLocaleString()}</span>
                                  </div>
                                </td>
                                <td className="p-3 text-gray-900">
                                  <div className="flex items-center gap-2">
                                    <span className="font-medium">{slider.clicks}</span>
                                  </div>
                                </td>
                                <td className="p-3">
                                  <div className="flex gap-1">
                                    <Button
                                      size="sm"
                                      className="bg-blue-600 hover:bg-blue-700 text-white"
                                      title="تعديل"
                                      onClick={() => handleEditSlider(slider)}
                                    >
                                      <Edit className="h-4 w-4" />
                                    </Button>
                                    <Button
                                      size="sm"
                                      className="bg-red-600 hover:bg-red-700 text-white"
                                      title="حذف"
                                      onClick={() => handleDeleteSlider(slider.id)}
                                    >
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                    <Button
                                      size="sm"
                                      className="bg-green-600 hover:bg-green-700 text-white"
                                      title="مشاهدة"
                                    >
                                      <Eye className="h-4 w-4" />
                                    </Button>
                                    <Button
                                      size="sm"
                                      className="bg-purple-600 hover:bg-purple-700 text-white"
                                      title="حفظ"
                                      onClick={handleSaveSlider}
                                    >
                                      <Save className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      <div className="flex justify-center items-center gap-2 mt-6">
                        <span className="text-sm text-gray-600">عرض من خلال 1 الى 3 في 3 سجلات</span>
                        {slidersFilter !== 'all' && (
                          <div className="flex items-center gap-2 bg-pink-50 px-3 py-1 rounded-full">
                            <span className="text-xs text-pink-700">الفلتر النشط:</span>
                            <Badge className="bg-pink-100 text-pink-800 text-xs">
                              {slidersFilter === 'active' ? 'المفعل فقط' :
                               slidersFilter === 'inactive' ? 'غير المفعل فقط' :
                               slidersFilter === 'draft' ? 'المسودات فقط' : slidersFilter}
                            </Badge>
                          </div>
                        )}
                        {slidersStatusFilter !== 'all' && (
                          <div className="flex items-center gap-2 bg-green-50 px-3 py-1 rounded-full">
                            <span className="text-xs text-green-700">حالة:</span>
                            <Badge className="bg-green-100 text-green-800 text-xs">
                              {slidersStatusFilter}
                            </Badge>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Enhanced Slider Preview */}
                  <Card className="shadow-2xl bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 border-2 border-pink-200">
                    <CardHeader className="bg-gradient-to-r from-pink-500 to-purple-600 text-white">
                      <CardTitle className="flex items-center gap-2 text-white">
                        <Eye className="h-5 w-5" />
                        معاينة السلايدرز - متجر نواعم 👗✨
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="bg-white rounded-lg p-8 border-2 border-pink-200">
                        {/* Main Slider Display */}
                        <div className="relative overflow-hidden rounded-lg mb-4" style={{ height: '400px' }}>
                          <div
                            className="flex transition-transform duration-500 ease-in-out h-full"
                            id="slider-container"
                            style={{
                              transform: 'translateX(0%)',
                              width: '500%' // 5 slides * 100% each
                            }}
                          >
                            {/* Slide 1 - البنرات الرئيسية */}
                            <div className="w-1/5 flex-shrink-0 bg-gradient-to-br from-pink-100 to-rose-100 flex items-center justify-center relative">
                              <div className="text-center p-4">
                                <div className="w-full h-40 bg-gradient-to-br from-pink-200 to-rose-200 rounded-2xl mx-auto mb-3 flex items-center justify-center shadow-lg overflow-hidden">
                                  <img
                                    src="/PictureMerchantPortal/1.png"
                                    alt="البنرات الرئيسية - متجر نواعم"
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                      (e.target as HTMLImageElement).style.display = 'none';
                                      (e.target as HTMLImageElement).parentElement!.innerHTML = '<span class="text-4xl">👗</span>';
                                    }}
                                  />
                                </div>
                                <h4 className="text-lg font-bold text-gray-800 mb-2">البنرات الرئيسية</h4>
                                <p className="text-gray-700 text-sm mb-2">منتجات مميزة من متجر نواعم</p>
                                <div className="bg-white/80 rounded-lg p-2 inline-block">
                                  <p className="text-xs text-gray-600">✨ تشكيلة 2025 الجديدة</p>
                                  <p className="text-xs text-pink-600 font-bold">خصم 20% على جميع المنتجات</p>
                                </div>
                              </div>
                              <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                                مفعل
                              </div>
                            </div>

                            {/* Slide 2 - سلايدر المنتجات المميزة */}
                            <div className="w-1/5 flex-shrink-0 bg-gradient-to-br from-blue-100 to-cyan-100 flex items-center justify-center relative">
                              <div className="text-center p-4">
                                <div className="w-full h-40 bg-gradient-to-br from-blue-200 to-cyan-200 rounded-2xl mx-auto mb-3 flex items-center justify-center shadow-lg overflow-hidden">
                                  <img
                                    src="/PictureMerchantPortal/2.png"
                                    alt="سلايدر المنتجات المميزة - متجر نواعم"
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                      (e.target as HTMLImageElement).style.display = 'none';
                                      (e.target as HTMLImageElement).parentElement!.innerHTML = '<span class="text-4xl">🛍️</span>';
                                    }}
                                  />
                                </div>
                                <h4 className="text-lg font-bold text-gray-800 mb-2">سلايدر المنتجات المميزة</h4>
                                <p className="text-gray-700 text-sm mb-2">أحدث المنتجات في متجر نواعم</p>
                                <div className="bg-white/80 rounded-lg p-2 inline-block">
                                  <p className="text-xs text-gray-600">⭐ المنتجات الأكثر مبيعاً</p>
                                  <p className="text-xs text-blue-600 font-bold">جودة عالية وأسعار مميزة</p>
                                </div>
                              </div>
                              <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                                مفعل
                              </div>
                            </div>

                            {/* Slide 3 - سلايدر العروض الخاصة */}
                            <div className="w-1/5 flex-shrink-0 bg-gradient-to-br from-green-100 to-emerald-100 flex items-center justify-center relative">
                              <div className="text-center p-4">
                                <div className="w-full h-40 bg-gradient-to-br from-green-200 to-emerald-200 rounded-2xl mx-auto mb-3 flex items-center justify-center shadow-lg overflow-hidden">
                                  <img
                                    src="/PictureMerchantPortal/3.png"
                                    alt="سلايدر العروض الخاصة - متجر نواعم"
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                      (e.target as HTMLImageElement).style.display = 'none';
                                      (e.target as HTMLImageElement).parentElement!.innerHTML = '<span class="text-4xl">🎀</span>';
                                    }}
                                  />
                                </div>
                                <h4 className="text-lg font-bold text-gray-800 mb-2">سلايدر العروض الخاصة</h4>
                                <p className="text-gray-700 text-sm mb-2">عروض وتخفيضات حصرية</p>
                                <div className="bg-white/80 rounded-lg p-2 inline-block">
                                  <p className="text-xs text-gray-600">💫 خصومات تصل إلى 50%</p>
                                  <p className="text-xs text-green-600 font-bold">لفترة محدودة فقط</p>
                                </div>
                              </div>
                              <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                                مفعل
                              </div>
                            </div>

                            {/* Slide 4 - إكسسوارات */}
                            <div className="w-1/5 flex-shrink-0 bg-gradient-to-br from-yellow-100 to-orange-100 flex items-center justify-center relative">
                              <div className="text-center p-4">
                                <div className="w-full h-40 bg-gradient-to-br from-yellow-200 to-orange-200 rounded-2xl mx-auto mb-3 flex items-center justify-center shadow-lg overflow-hidden">
                                  <img
                                    src="/PictureMerchantPortal/4.png"
                                    alt="إكسسوارات مميزة - متجر نواعم"
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                      (e.target as HTMLImageElement).style.display = 'none';
                                      (e.target as HTMLImageElement).parentElement!.innerHTML = '<span class="text-4xl">💍</span>';
                                    }}
                                  />
                                </div>
                                <h4 className="text-lg font-bold text-gray-800 mb-2">إكسسوارات مميزة</h4>
                                <p className="text-gray-700 text-sm mb-2">تشكيلة واسعة من الإكسسوارات</p>
                                <div className="bg-white/80 rounded-lg p-2 inline-block">
                                  <p className="text-xs text-gray-600">✨ تصاميم فريدة وعصرية</p>
                                  <p className="text-xs text-orange-600 font-bold">أسعار تبدأ من 50 دينار</p>
                                </div>
                              </div>
                              <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                                مفعل
                              </div>
                            </div>

                            {/* Slide 5 - مجوهرات */}
                            <div className="w-1/5 flex-shrink-0 bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center relative">
                              <div className="text-center p-4">
                                <div className="w-full h-40 bg-gradient-to-br from-indigo-200 to-purple-200 rounded-2xl mx-auto mb-3 flex items-center justify-center shadow-lg overflow-hidden">
                                  <img
                                    src="/PictureMerchantPortal/5.png"
                                    alt="مجوهرات فاخرة - متجر نواعم"
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                      (e.target as HTMLImageElement).style.display = 'none';
                                      (e.target as HTMLImageElement).parentElement!.innerHTML = '<span class="text-4xl">💎</span>';
                                    }}
                                  />
                                </div>
                                <h4 className="text-lg font-bold text-gray-800 mb-2">مجوهرات فاخرة</h4>
                                <p className="text-gray-700 text-sm mb-2">تشكيلة راقية من المجوهرات</p>
                                <div className="bg-white/80 rounded-lg p-2 inline-block">
                                  <p className="text-xs text-gray-600">👑 تصاميم فريدة وحصرية</p>
                                  <p className="text-xs text-purple-600 font-bold">ضمان جودة وأصالة</p>
                                </div>
                              </div>
                              <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                                مفعل
                              </div>
                            </div>
                          </div>

                          {/* Navigation Dots */}
                          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                            {[0, 1, 2, 3, 4].map((dot) => (
                              <button
                                key={dot}
                                className={`w-3 h-3 rounded-full transition-colors ${dot === 0 ? 'bg-pink-500' : 'bg-gray-300 hover:bg-gray-400'}`}
                                onClick={() => {
                                  const container = document.getElementById('slider-container');
                                  if (container) {
                                    container.style.transform = `translateX(-${dot * 20}%)`;
                                  }
                                }}
                              />
                            ))}
                          </div>

                          {/* Navigation Arrows */}
                          <button
                            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-all shadow-lg hover:shadow-xl"
                            onClick={() => {
                              const container = document.getElementById('slider-container');
                              if (container) {
                                const currentTransform = container.style.transform || 'translateX(0%)';
                                const currentValue = parseInt(currentTransform.replace('translateX(-', '').replace('%)', ''));
                                const newValue = Math.max(0, currentValue - 20);
                                container.style.transform = `translateX(-${newValue}%)`;
                              }
                            }}
                          >
                            <svg className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                          </button>
                          <button
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-all shadow-lg hover:shadow-xl"
                            onClick={() => {
                              const container = document.getElementById('slider-container');
                              if (container) {
                                const currentTransform = container.style.transform || 'translateX(0%)';
                                const currentValue = parseInt(currentTransform.replace('translateX(-', '').replace('%)', ''));
                                const newValue = Math.min(80, currentValue + 20); // Max 80% (4 slides * 20%)
                                container.style.transform = `translateX(-${newValue}%)`;
                              }
                            }}
                          >
                            <svg className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </button>
                        </div>

                        <div className="text-center mb-6">
                           <div className="flex items-center justify-center gap-4 mb-4 flex-wrap">
                             <Badge className="bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 shadow-lg">
                               ✅ جميع السلايدرز مفعلة بالكامل
                             </Badge>
                             <Badge className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 shadow-lg">
                               🏪 متجر نواعم - 5 شرائح
                             </Badge>
                             <Badge className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-4 py-2 shadow-lg">
                               👨‍💼 التاجر مونير
                             </Badge>
                           </div>
                           <p className="text-sm text-gray-600">يمكنك تعديل أي شريحة أو إضافة شرائح جديدة من خلال الأزرار أدناه</p>
                           <div className="mt-4 flex items-center justify-center gap-2">
                             <div className="w-2 h-2 bg-pink-500 rounded-full animate-pulse"></div>
                             <span className="text-xs text-gray-500">جميع الصور من منتجات حقيقية في متجر نواعم</span>
                           </div>

                           {/* Slider Statistics */}
                           <div className="mt-6 grid grid-cols-3 gap-4 max-w-md mx-auto">
                             <div className="bg-white/50 rounded-lg p-3 text-center">
                               <p className="text-lg font-bold text-gray-800">{getFilteredSliders().reduce((sum, slider) => sum + (slider.views || 0), 0).toLocaleString()}</p>
                               <p className="text-xs text-gray-600">إجمالي المشاهدات</p>
                             </div>
                             <div className="bg-white/50 rounded-lg p-3 text-center">
                               <p className="text-lg font-bold text-gray-800">{getFilteredSliders().reduce((sum, slider) => sum + (slider.clicks || 0), 0)}</p>
                               <p className="text-xs text-gray-600">إجمالي النقرات</p>
                             </div>
                             <div className="bg-white/50 rounded-lg p-3 text-center">
                               <p className="text-lg font-bold text-gray-800">{getFilteredSliders().length}</p>
                               <p className="text-xs text-gray-600">السلايدرز النشطة</p>
                             </div>
                           </div>
                         </div>
                         </div>

                        <div>{/* Slider Management Options */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          <Button className="bg-pink-600 hover:bg-pink-700 text-white flex flex-col items-center gap-2 h-auto py-3">
                            <Plus className="h-5 w-5" />
                            <span className="font-bold">إضافة شريحة جديدة</span>
                          </Button>
                          <Button className="bg-blue-600 hover:bg-blue-700 text-white flex flex-col items-center gap-2 h-auto py-3">
                            <Edit className="h-5 w-5" />
                            <span className="font-bold">تعديل الشرائح الحالية</span>
                          </Button>
                          <Button className="bg-red-600 hover:bg-red-700 text-white flex flex-col items-center gap-2 h-auto py-3">
                            <Trash2 className="h-5 w-5" />
                            <span className="font-bold">حذف شريحة</span>
                          </Button>
                          <Button className="bg-green-600 hover:bg-green-700 text-white flex flex-col items-center gap-2 h-auto py-3">
                            <Upload className="h-5 w-5" />
                            <span className="font-bold">رفع صور جديدة</span>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {activeSection === 'settings-ads' && (
                <div className="space-y-6">
                  {/* Header with Modern Design */}
                  <div className="bg-gradient-to-br from-green-600 via-blue-600 to-purple-600 rounded-2xl p-8 text-white shadow-2xl relative overflow-hidden">
                    <div className="absolute inset-0 bg-black/10"></div>
                    <div className="relative z-10 flex items-center justify-between">
                      <div>
                        <h2 className="text-3xl font-bold mb-2">📢 إدارة الإعلانات</h2>
                        <p className="text-green-100 text-lg">إنشاء وتعديل الإعلانات التفاعلية لمتجرك الإلكتروني</p>
                        <div className="flex items-center gap-4 mt-4">
                          <Badge className="bg-white/20 text-white px-3 py-1">🏪 التاجر مونير</Badge>
                          <Badge className="bg-white/20 text-white px-3 py-1">📊 236 زيارة</Badge>
                          <Badge className="bg-white/20 text-white px-3 py-1">✅ 5 إعلانات مفعلة</Badge>
                        </div>
                      </div>
                      <div className="hidden md:block">
                        <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                          <Megaphone className="h-10 w-10 text-white" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Statistics Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <Card className="hover-lift border-l-4 border-l-green-500 shadow-lg">
                      <CardContent className="p-6">
                        <div className="text-center">
                          <p className="text-3xl font-bold text-green-600 mb-1">6</p>
                          <p className="text-sm text-gray-600">إجمالي الإعلانات</p>
                          <p className="text-xs text-green-600 mt-1">🏪 للتاجر مونير - متجر نواعم</p>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="hover-lift border-l-4 border-l-blue-500 shadow-lg">
                      <CardContent className="p-6">
                        <div className="text-center">
                          <p className="text-3xl font-bold text-blue-600 mb-1">5</p>
                          <p className="text-sm text-gray-600">الإعلانات المفعلة</p>
                          <p className="text-xs text-blue-600 mt-1">✅ مفعلة بالكامل</p>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="hover-lift border-l-4 border-l-purple-500 shadow-lg">
                      <CardContent className="p-6">
                        <div className="text-center">
                          <p className="text-3xl font-bold text-purple-600 mb-1">1</p>
                          <p className="text-sm text-gray-600">مسودة</p>
                          <p className="text-xs text-purple-600 mt-1">قيد المراجعة</p>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="hover-lift border-l-4 border-l-orange-500 shadow-lg">
                      <CardContent className="p-6">
                        <div className="text-center">
                          <p className="text-3xl font-bold text-orange-600 mb-1">236</p>
                          <p className="text-sm text-gray-600">إجمالي الزيارات</p>
                          <p className="text-xs text-orange-600 mt-1">👀 معدل تفاعل عالي</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Enhanced Filter and Search Bar */}
                  <Card className="shadow-lg">
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                        <div className="flex gap-4 items-center flex-1">
                          {/* Filter Box - الكل */}
                          <div className="flex items-center gap-2">
                            <Label className="text-sm font-medium text-gray-700">مربع الكل للفلترة:</Label>
                            <Select value={adsFilter} onValueChange={handleAdsFilterChange}>
                              <SelectTrigger className="w-40">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="all">الكل</SelectItem>
                                <SelectItem value="active">المفعل فقط</SelectItem>
                                <SelectItem value="inactive">غير المفعل فقط</SelectItem>
                                <SelectItem value="draft">المسودات فقط</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          {/* Filter Dropdown - القيمة/الحالة */}
                          <div className="flex items-center gap-2">
                            <Select value={adsStatusFilter} onValueChange={setAdsStatusFilter}>
                              <SelectTrigger className="w-48">
                                <SelectValue placeholder="فلترة بالحالة" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="all">جميع الحالات</SelectItem>
                                <SelectItem value="مفعل">مفعل</SelectItem>
                                <SelectItem value="غير مفعل">غير مفعل</SelectItem>
                                <SelectItem value="مسودة">مسودة</SelectItem>
                              </SelectContent>
                            </Select>

                            {/* Status Filter Input */}
                            <div className="flex items-center gap-2">
                              <Input placeholder="البحث في الإعلانات..." className="w-48" />
                            </div>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <div className="relative">
                            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <Input placeholder="البحث في الإعلانات..." className="pr-10 w-64" />
                          </div>
                          <Button variant="outline" size="sm" className="hover:bg-blue-50">
                            <RefreshCw className="h-4 w-4 mr-2" />
                            تحديث
                          </Button>
                          <Button variant="outline" size="sm" className="hover:bg-green-50">
                            <ArrowLeftRight className="h-4 w-4 mr-2" />
                            فرز
                          </Button>
                          <Button
                            className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white"
                            onClick={handleCreateAd}
                          >
                            <Plus className="h-4 w-4 mr-2" />
                            إضافة إعلان جديد
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Ad Modal */}
                  {adModalOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
                      <div className="bg-white rounded-2xl p-6 w-full max-w-2xl mx-4 shadow-2xl border">
                        <div className="flex items-center justify-between mb-6">
                          <h3 className="text-xl font-bold text-gray-900">
                            {currentAd ? 'تعديل الإعلان' : 'إضافة إعلان جديد'}
                          </h3>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setAdModalOpen(false);
                              setCurrentAd(null);
                            }}
                            className="hover:bg-gray-100"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>

                        <div className="space-y-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <Label htmlFor="ad-name">اسم الإعلان *</Label>
                              <Input
                                id="ad-name"
                                placeholder="أدخل اسم الإعلان"
                                value={adForm.name}
                                onChange={(e) => setAdForm({...adForm, name: e.target.value})}
                                className="mt-1"
                              />
                            </div>

                            <div>
                              <Label htmlFor="ad-link">الرابط</Label>
                              <Input
                                id="ad-link"
                                placeholder="الرابط الخاص بالمتجر"
                                value={adForm.link}
                                onChange={(e) => setAdForm({...adForm, link: e.target.value})}
                                className="mt-1"
                              />
                            </div>
                          </div>

                          <div>
                            <Label htmlFor="ad-image">صورة الإعلان</Label>
                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-green-400 transition-colors">
                              <Image className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                              <p className="text-sm text-gray-600 mb-2">رفع أو سحب الملف أو الصور</p>
                              <p className="text-xs text-gray-500 mb-4">JPG, JPEG, PNG, WEBP, PDF</p>
                              <input
                                type="file"
                                id="ad-image"
                                accept="image/*,.pdf"
                                className="hidden"
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) {
                                    console.log('Ad image selected:', file.name);
                                    setAdForm({...adForm, image: URL.createObjectURL(file)});
                                  }
                                }}
                              />
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => document.getElementById('ad-image')?.click()}
                              >
                                <Upload className="h-4 w-4 mr-2" />
                                إختيار صورة
                              </Button>
                            </div>
                            {adForm.image && (
                              <div className="mt-2">
                                <img
                                  src={adForm.image}
                                  alt="معاينة الإعلان"
                                  className="w-full h-32 object-cover rounded-lg"
                                />
                              </div>
                            )}
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <Label htmlFor="ad-order">الترتيب</Label>
                              <Input
                                id="ad-order"
                                type="number"
                                placeholder="0"
                                value={adForm.order}
                                onChange={(e) => setAdForm({...adForm, order: Number(e.target.value)})}
                                className="mt-1"
                              />
                              <p className="text-xs text-gray-500 mt-1">يتم تحديد الترتيب التسلسلي للتغيير الافتراضي</p>
                            </div>

                            <div>
                              <Label>الحالة</Label>
                              <Select value={adForm.status} onValueChange={(value) => setAdForm({...adForm, status: value})}>
                                <SelectTrigger className="mt-1">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="active">مفعل</SelectItem>
                                  <SelectItem value="inactive">غير مفعل</SelectItem>
                                  <SelectItem value="draft">مسودة</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <Label htmlFor="ad-location">الموقع</Label>
                              <Select value={adForm.location} onValueChange={(value) => setAdForm({...adForm, location: value})}>
                                <SelectTrigger className="mt-1">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="not-specified">غير محدد</SelectItem>
                                  <SelectItem value="specified">محدد</SelectItem>
                                  <SelectItem value="product-sidebar">الشريط الجانبي للمنتج</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>

                            <div>
                              <Label htmlFor="ad-expiry-date">تاريخ انتهاء الإعلان</Label>
                              <Input
                                id="ad-expiry-date"
                                type="date"
                                value={adForm.expiryDate}
                                onChange={(e) => setAdForm({...adForm, expiryDate: e.target.value})}
                                className="mt-1"
                              />
                            </div>
                          </div>

                          <div className="flex gap-3 pt-4">
                            <Button
                              onClick={handleSaveAd}
                              className="flex-1 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
                            >
                              <Save className="h-4 w-4 mr-2" />
                              {currentAd ? 'تحديث الإعلان' : 'إنشاء الإعلان'}
                            </Button>
                            <Button
                              variant="outline"
                              onClick={() => {
                                setAdModalOpen(false);
                                setCurrentAd(null);
                              }}
                              className="transition-all duration-200 hover:bg-gray-50"
                            >
                              إلغاء
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Advertisements Table */}
                  <Card className="shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Image className="h-5 w-5 text-green-600" />
                        قائمة الإعلانات
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm text-right">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="p-3 text-right font-medium">الصورة</th>
                              <th className="p-3 text-right font-medium">الإسم</th>
                              <th className="p-3 text-right font-medium">الزيارات</th>
                              <th className="p-3 text-right font-medium">النقرات</th>
                              <th className="p-3 text-right font-medium">معدل النقر</th>
                              <th className="p-3 text-right font-medium">إنتهاء الصلاحية</th>
                              <th className="p-3 text-right font-medium">الحالة</th>
                              <th className="p-3 text-right font-medium">الخيارات</th>
                            </tr>
                          </thead>
                          <tbody>
                            {getFilteredAds().map((ad, index) => (
                              <tr key={index} className="border-b hover:bg-gray-50">
                                <td className="p-3">
                                  <div className="w-16 h-12 bg-gradient-to-br from-green-100 to-blue-100 rounded-lg flex items-center justify-center">
                                    <Image className="h-6 w-6 text-green-600" />
                                  </div>
                                </td>
                                <td className="p-3">
                                  <div>
                                    <p className="font-medium text-gray-900">{ad.name}</p>
                                    <p className="text-xs text-gray-600">🏪 متجر نواعم • التاجر مونير</p>
                                    <p className="text-xs text-blue-600">{ad.location}</p>
                                  </div>
                                </td>
                                <td className="p-3">
                                  <div className="flex items-center gap-2">
                                    <Eye className="h-4 w-4 text-gray-400" />
                                    <span className="font-medium text-gray-900">{ad.views?.toLocaleString()}</span>
                                  </div>
                                </td>
                                <td className="p-3 text-gray-900">
                                  <span className="font-medium">{ad.clicks}</span>
                                </td>
                                <td className="p-3">
                                  <Badge className="bg-blue-100 text-blue-800 text-xs">
                                    {ad.ctr}
                                  </Badge>
                                </td>
                                <td className="p-3 text-gray-900">{ad.expiryDate}</td>
                                <td className="p-3">
                                  <Badge className={
                                    ad.status === 'مفعل' ? 'bg-green-100 text-green-800 hover:bg-green-200 cursor-pointer' :
                                    ad.status === 'مسودة' ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200 cursor-pointer' :
                                    'bg-gray-100 text-gray-800'
                                  }>
                                    {ad.status === 'مفعل' ? '✅ مفعل' : ad.status === 'مسودة' ? '📝 مسودة' : ad.status}
                                  </Badge>
                                </td>
                                <td className="p-3">
                                  <div className="flex gap-1">
                                    <Button
                                      size="sm"
                                      className="bg-blue-600 hover:bg-blue-700 text-white"
                                      onClick={() => handleEditAd(ad)}
                                    >
                                      <Edit className="h-4 w-4" />
                                    </Button>
                                    <Button
                                      size="sm"
                                      className="bg-green-600 hover:bg-green-700 text-white"
                                    >
                                      <Eye className="h-4 w-4" />
                                    </Button>
                                    <Button
                                      size="sm"
                                      className="bg-purple-600 hover:bg-purple-700 text-white"
                                    >
                                      <Copy className="h-4 w-4" />
                                    </Button>
                                    <Button
                                      size="sm"
                                      className="bg-red-600 hover:bg-red-700 text-white"
                                      onClick={() => handleDeleteAd(ad.id)}
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

                      <div className="flex justify-center items-center gap-2 mt-6">
                        <span className="text-sm text-gray-600">عرض من خلال 1 الى 6 في 6 سجلات</span>
                        {adsFilter !== 'all' && (
                          <div className="flex items-center gap-2 bg-green-50 px-3 py-1 rounded-full">
                            <span className="text-xs text-green-700">الفلتر النشط:</span>
                            <Badge className="bg-green-100 text-green-800 text-xs">
                              {adsFilter === 'active' ? 'المفعل فقط' :
                               adsFilter === 'inactive' ? 'غير المفعل فقط' :
                               adsFilter === 'draft' ? 'المسودات فقط' : adsFilter}
                            </Badge>
                          </div>
                        )}
                        {adsStatusFilter !== 'all' && (
                          <div className="flex items-center gap-2 bg-blue-50 px-3 py-1 rounded-full">
                            <span className="text-xs text-blue-700">حالة:</span>
                            <Badge className="bg-blue-100 text-blue-800 text-xs">
                              {adsStatusFilter}
                            </Badge>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Enhanced Advertisement Performance */}
                  <Card className="shadow-lg bg-gradient-to-r from-green-50 to-blue-50">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <BarChart3 className="h-5 w-5 text-green-600" />
                        أداء الإعلانات
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="text-center p-4 bg-white rounded-lg">
                          <p className="text-2xl font-bold text-green-600 mb-1">342</p>
                          <p className="text-sm text-gray-600">إجمالي الزيارات</p>
                        </div>
                        <div className="text-center p-4 bg-white rounded-lg">
                          <p className="text-2xl font-bold text-blue-600 mb-1">5.2%</p>
                          <p className="text-sm text-gray-600">معدل النقر</p>
                        </div>
                        <div className="text-center p-4 bg-white rounded-lg">
                          <p className="text-2xl font-bold text-purple-600 mb-1">1,847 د.ل</p>
                          <p className="text-sm text-gray-600">الإيرادات المحققة</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {activeSection === 'analytics-sales' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900">تقارير المبيعات</h2>
                  <Card className="shadow-lg">
                    <CardContent className="p-6">
                      <p className="text-sm text-gray-600 mb-4">تقارير تفصيلية للمبيعات</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="text-center p-4 bg-blue-50 rounded-lg">
                          <h4 className="font-bold text-gray-800 mb-2">المبيعات اليومية</h4>
                          <p className="text-2xl font-bold text-blue-600">1,250 د.ل</p>
                        </div>
                        <div className="text-center p-4 bg-green-50 rounded-lg">
                          <h4 className="font-bold text-gray-800 mb-2">المبيعات الشهرية</h4>
                          <p className="text-2xl font-bold text-green-600">15,750 د.ل</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {activeSection === 'settings-interface' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900">واجهة المتجر</h2>
                  <Card className="shadow-lg">
                    <CardContent className="p-6">
                      <p className="text-sm text-gray-600 mb-4">تخصيص واجهة متجرك</p>
                      <div className="text-center p-8 bg-gray-50 rounded-lg">
                        <Layers className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                        <p className="text-gray-600">محتوى واجهة المتجر سيتم إضافته قريباً</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {activeSection === 'settings-pages' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900">الصفحات</h2>
                  <Card className="shadow-lg">
                    <CardContent className="p-6">
                      <p className="text-sm text-gray-600 mb-4">إدارة صفحات متجرك</p>
                      <div className="text-center p-8 bg-gray-50 rounded-lg">
                        <FileText className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                        <p className="text-gray-600">محتوى إدارة الصفحات سيتم إضافته قريباً</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {activeSection === 'settings-menu' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900">القائمة</h2>
                  <Card className="shadow-lg">
                    <CardContent className="p-6">
                      <p className="text-sm text-gray-600 mb-4">تعديل القائمة الرئيسية للمتجر</p>
                      <div className="text-center p-8 bg-gray-50 rounded-lg">
                        <Menu className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                        <p className="text-gray-600">محتوى إدارة القائمة سيتم إضافته قريباً</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}



              {activeSection === 'pos' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900">نقاط البيع</h2>
                  <Card className="shadow-lg">
                    <CardContent className="p-6">
                      <p className="text-sm text-gray-600 mb-4">نظام نقاط البيع المتكامل</p>
                      <div className="text-center p-8 bg-gray-50 rounded-lg">
                        <CreditCard className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                        <p className="text-gray-600">محتوى نظام نقاط البيع سيتم إضافته قريباً</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {activeSection === 'services' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900">الخدمات</h2>
                  <Card className="shadow-lg">
                    <CardContent className="p-6">
                      <p className="text-sm text-gray-600 mb-4">إدارة الخدمات المقدمة</p>
                      <div className="text-center p-8 bg-gray-50 rounded-lg">
                        <Truck className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                        <p className="text-gray-600">محتوى إدارة الخدمات سيتم إضافته قريباً</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {activeSection === 'customer-service' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900">خدمة العملاء</h2>
                  <Card className="shadow-lg">
                    <CardContent className="p-6">
                      <p className="text-sm text-gray-600 mb-4">مركز خدمة العملاء</p>
                      <div className="text-center p-8 bg-gray-50 rounded-lg">
                        <Phone className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                        <p className="text-gray-600">محتوى خدمة العملاء سيتم إضافته قريباً</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {activeSection === 'technical-support' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900">الدعم الفني</h2>
                  <Card className="shadow-lg">
                    <CardContent className="p-6">
                      <p className="text-sm text-gray-600 mb-4">مركز الدعم الفني</p>
                      <div className="text-center p-8 bg-gray-50 rounded-lg">
                        <HelpCircle className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                        <p className="text-gray-600">محتوى الدعم الفني سيتم إضافته قريباً</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Default content for other sections */}
              {activeSection !== 'overview' && !activeSection.startsWith('orders') && !activeSection.startsWith('catalog') && !activeSection.startsWith('customers') && !activeSection.startsWith('marketing') && !activeSection.startsWith('analytics') && !activeSection.startsWith('finance') && !activeSection.startsWith('settings') && activeSection !== 'pos' && activeSection !== 'services' && activeSection !== 'customer-service' && activeSection !== 'technical-support' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900">قسم {activeSection}</h2>
                  <Card>
                    <CardContent className="p-6">
                      <p className="text-gray-600">محتوى هذا القسم سيتم إضافته قريباً</p>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default EnhancedMerchantDashboard;