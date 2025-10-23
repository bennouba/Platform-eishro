import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Settings,
  Store,
  Palette,
  FileText,
  List,
  Sliders,
  Megaphone,
  Download,
  Upload,
  RefreshCw,
  Save,
  Menu,
  X,
  ChevronRight,
  ChevronLeft,
  Bell,
  LogOut,
  Moon,
  Sun,
  Plus,
  Edit,
  Trash2,
  MapPin,
  Phone,
  Mail,
  Globe,
  Camera,
  Image,
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  Copy,
  ExternalLink
} from 'lucide-react';

interface StoreLocation {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  isPrimary: boolean;
}

const MerchantSettings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('store-data');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showAddLocation, setShowAddLocation] = useState(false);

  const navigationItems = [
    { id: 'store-data', label: 'بيانات المتجر', icon: Store },
    { id: 'store-interface', label: 'واجهة المتجر', icon: Palette },
    { id: 'pages', label: 'الصفحات', icon: FileText },
    { id: 'menu', label: 'القائمة', icon: List },
    { id: 'sliders', label: 'السلايدرز', icon: Sliders },
    { id: 'ads', label: 'الإعلانات', icon: Megaphone }
  ];

  const [storeData, setStoreData] = useState({
    name: 'متجر نواعم',
    phone: '0942161516',
    address: 'طرابلس - سوق الجمعة',
    city: 'طرابلس',
    region: 'سوق الجمعة',
    location: { lat: 32.8872, lng: 13.1913 }
  });

  const [storeLocations, setStoreLocations] = useState<StoreLocation[]>([
    {
      id: '1',
      name: 'سوق الجمعة',
      email: '',
      phone: '0942161516',
      address: 'طرابلس - سوق الجمعة, طرابلس, سوق الجمعة, Libya',
      isPrimary: true
    }
  ]);

  const [interfaceSettings, setInterfaceSettings] = useState({
    storeName: 'متجر نمو',
    contactHours: 'اتصل بنا 24/7',
    phone: '0942161516',
    address: 'طرابلس - سوق الجمعة',
    email: 'Contact@noumo.ly',
    about: 'منصة نمو للتجارة الإلكترونية نقدم مجموعة من الخدمات و الأدوات العملية لإفتتاح متجرك الإلكتروني والدخول الى عالم التجارة الإلكترونية بشكل سهل وسريع ، في منصة نمو نعمل على تمكين التجار من تطوير وتنمية تجارتهم و تسهل الوصول والتواصل مع العملاء.',
    copyright: '© 2025 منصة إشرو للتجارة الإلكترونية',
    seoTitle: 'منصة إشرو للتجارة الإلكتونية - تمكين وإنتشار -',
    seoDescription: 'بوابة التجارة الإلكترونية في ليبيا ، تجارة الكترونية',
    popupEnabled: false,
    popupDelay: 10,
    welcomeMessage: 'أهلا بك في متجر نمو التجريبي'
  });

  const StoreDataTab: React.FC = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Store className="h-5 w-5" />
            بيانات المتجر الأساسية
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            يرجى إدخال هذه البيانات لانها ستظهر في فاتورة المتجر، وستستخدم في عملية الشحن والتوصيل.
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">إسم المتجر</label>
              <Input
                value={storeData.name}
                onChange={(e) => setStoreData({...storeData, name: e.target.value})}
                placeholder="إسم المتجر"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">الهاتف</label>
              <Input
                value={storeData.phone}
                onChange={(e) => setStoreData({...storeData, phone: e.target.value})}
                placeholder="رقم الهاتف"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">العنوان</label>
              <Input
                value={storeData.address}
                onChange={(e) => setStoreData({...storeData, address: e.target.value})}
                placeholder="العنوان"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">المدينة</label>
              <select className="w-full p-2 border rounded-md">
                <option value="">إختيار المدينة من القائمة</option>
                <option value="tripoli" selected={storeData.city === 'طرابلس'}>طرابلس</option>
                <option value="benghazi">بنغازي</option>
                <option value="misrata">مصراتة</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">المنطقة</label>
              <select className="w-full p-2 border rounded-md">
                <option value="">إختيار المنطقة من القائمة</option>
                <option value="souk_joumaa" selected={storeData.region === 'سوق الجمعة'}>سوق الجمعة</option>
                <option value="downtown">وسط المدينة</option>
                <option value="hay_andalus">حي الأندلس</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">موقع المتجر</label>
              <Button variant="outline" className="w-full justify-start">
                <MapPin className="h-4 w-4 mr-2" />
                تحديد الموقع يتم بتفعيل GPS Map
              </Button>
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline">إلغاء</Button>
            <Button>حفظ الإعدادات</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>عناوين المتجر</CardTitle>
            <Button onClick={() => setShowAddLocation(true)}>
              <Plus className="h-4 w-4 mr-2" />
              إضافة موقع جديد
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">
            تشمل القوائم بالأسفل عناوين المتجر الرئيسي والفروع وما إلى ذلك. يمكن استخدام هذه المواقع لتتبع حركة المخزون عند بيع المنتجات.
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {storeLocations.map((location) => (
              <div key={location.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium">{location.name}</h4>
                      {location.isPrimary && (
                        <Badge variant="default">أساسي</Badge>
                      )}
                    </div>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <div className="flex items-center gap-2">
                        <Mail className="h-3 w-3" />
                        {location.email || 'غير محدد'}
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-3 w-3" />
                        {location.phone}
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-3 w-3" />
                        {location.address}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const StoreInterfaceTab: React.FC = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="h-5 w-5" />
            قوالب المتجر
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            اختر القالب المناسب :
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border-2 border-green-500 rounded-lg p-4">
              <div className="text-center">
                <h3 className="font-semibold text-green-600">مفعل</h3>
                <p className="text-sm text-muted-foreground">القالب الحالي</p>
              </div>
            </div>
            <div className="border-2 border-gray-200 rounded-lg p-4">
              <div className="text-center">
                <h3 className="font-semibold">محترف</h3>
                <p className="text-sm text-muted-foreground">قالب متقدم</p>
                <Button variant="outline" className="mt-2">تعديل</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>الـعـنـاويـن والـوصـف</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">إسم المتجر</label>
              <Input
                value={interfaceSettings.storeName}
                onChange={(e) => setInterfaceSettings({...interfaceSettings, storeName: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">ساعات التواصل</label>
              <Input
                value={interfaceSettings.contactHours}
                onChange={(e) => setInterfaceSettings({...interfaceSettings, contactHours: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">الهاتف</label>
              <Input
                value={interfaceSettings.phone}
                onChange={(e) => setInterfaceSettings({...interfaceSettings, phone: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">العناوين</label>
              <Input
                value={interfaceSettings.address}
                onChange={(e) => setInterfaceSettings({...interfaceSettings, address: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">البريد الإلكتروني (إختياري)</label>
              <Input
                value={interfaceSettings.email}
                onChange={(e) => setInterfaceSettings({...interfaceSettings, email: e.target.value})}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">من نحن</label>
            <Textarea
              value={interfaceSettings.about}
              onChange={(e) => setInterfaceSettings({...interfaceSettings, about: e.target.value})}
              rows={4}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">حقوق النشر</label>
              <Input
                value={interfaceSettings.copyright}
                onChange={(e) => setInterfaceSettings({...interfaceSettings, copyright: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">عنوان الـ SEO</label>
              <Input
                value={interfaceSettings.seoTitle}
                onChange={(e) => setInterfaceSettings({...interfaceSettings, seoTitle: e.target.value})}
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium">الوصف الخاص بالـ SEO</label>
              <Textarea
                value={interfaceSettings.seoDescription}
                onChange={(e) => setInterfaceSettings({...interfaceSettings, seoDescription: e.target.value})}
                rows={2}
              />
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline">إلغاء</Button>
            <Button>حفظ</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>الـصـور</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">الشعار</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                <Camera className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">معاينة الصورة</p>
                <Button variant="outline" size="sm" className="mt-2">إختيار صورة</Button>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">أيقونة المتصفح</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                <Image className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">معاينة الصورة</p>
                <Button variant="outline" size="sm" className="mt-2">إختيار صورة</Button>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">SEO صورة خاصة بنشر روابط المتجر</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                <Globe className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">معاينة الصورة</p>
                <Button variant="outline" size="sm" className="mt-2">إختيار صورة</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>النافدة الإعلانية المنبثقة</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">تمكين من العرض ؟</label>
              <select className="w-full p-2 border rounded-md">
                <option value="no" selected>لا</option>
                <option value="yes">نعم</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">زمن تأخر عرض النافذة (ثواني)</label>
              <Input
                type="number"
                value={interfaceSettings.popupDelay}
                onChange={(e) => setInterfaceSettings({...interfaceSettings, popupDelay: parseInt(e.target.value)})}
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium">رسالة الترحيب</label>
              <Input
                value={interfaceSettings.welcomeMessage}
                onChange={(e) => setInterfaceSettings({...interfaceSettings, welcomeMessage: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">الصورة الدعائية المستخدمة</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                <Image className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">معاينة الصورة</p>
                <Button variant="outline" size="sm" className="mt-2">إختيار صورة</Button>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline">إلغاء</Button>
            <Button>حفظ</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const PagesTab: React.FC = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              إدارة الصفحات
            </CardTitle>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              إضافة صفحة جديدة
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex gap-4">
              <Button variant="outline" size="sm">الكل</Button>
              <select className="p-2 border rounded-md text-sm">
                <option>القيمة</option>
                <option>الحالة</option>
              </select>
              <div className="flex-1">
                <Input placeholder="البحث في الصفحات..." />
              </div>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                تصدير
              </Button>
            </div>

            <div className="bg-white border rounded-lg">
              <div className="p-4 border-b bg-gray-50">
                <div className="grid grid-cols-4 gap-4 text-sm font-medium">
                  <div>الإسم</div>
                  <div>الحالة</div>
                  <div>التاريخ</div>
                  <div>الخيارات</div>
                </div>
              </div>
              <div className="divide-y">
                {[
                  { name: 'عن المتجر', status: 'مفعل', date: '2022-01-03' },
                  { name: 'التواصل معنا', status: 'مفعل', date: '2022-01-03' },
                  { name: 'شروط الإستخدام', status: 'مفعل', date: '2022-01-03' },
                  { name: 'سياسة الاسترجاع والاستبدال والإلغاء', status: 'مفعل', date: '2022-01-03' },
                  { name: 'صفحة تجريبية', status: 'مفعل', date: '2024-02-27' }
                ].map((page, index) => (
                  <div key={index} className="p-4 grid grid-cols-4 gap-4 items-center">
                    <div className="font-medium">{page.name}</div>
                    <div>
                      <Badge variant="default">{page.status}</Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">{page.date}</div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-center gap-2">
              {[1, 2, 3, 4].map((page) => (
                <Button key={page} variant="outline" size="sm">{page}</Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const MenuTab: React.FC = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <List className="h-5 w-5" />
            تعديل القائمة الرئيسية للمتجر
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">إضافة رابط</label>
              <Input placeholder="العنوان" />
              <Input placeholder="URL الرابط" value="http://" />
              <select className="w-full p-2 border rounded-md">
                <option>مكان العرض</option>
                <option>رأس الصفحة</option>
                <option>تذييل الصفحة</option>
              </select>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">فتح الرابط في نفس الصفحة</Button>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">الصفحات</label>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {[
                  'التواصل معنا',
                  'سياسة الاسترجاع والاستبدال والإلغاء',
                  'شروط الإستخدام',
                  'صفحة تجريبية',
                  'عن المتجر'
                ].map((page, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <input type="checkbox" id={`page-${index}`} />
                    <label htmlFor={`page-${index}`} className="text-sm">{page}</label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-medium">هيكل القائمة</h4>
            <div className="space-y-2">
              {[
                { name: 'الرئيسية', type: 'رابط مخصص' },
                { name: 'جميع المنتجات', type: 'رابط مخصص' },
                { name: 'الصفحات', type: 'رابط مخصص' },
                { name: 'عن المتجر', type: 'الصفحات' },
                { name: 'شروط الإستخدام', type: 'الصفحات' },
                { name: 'سياسة الإسترجاع', type: 'الصفحات' },
                { name: 'التواصل معنا', type: 'الصفحات' }
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <span className="font-medium">{item.name}</span>
                  <Badge variant="outline">{item.type}</Badge>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-between">
            <Button variant="outline">استعادة القائمة الإفتراضية</Button>
            <div className="flex gap-2">
              <Button variant="outline">إلغاء</Button>
              <Button>حفظ</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const SlidersTab: React.FC = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Sliders className="h-5 w-5" />
              إدارة السلايدرز
            </CardTitle>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              إضافة سلايدر جديد
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex gap-4">
              <Button variant="outline" size="sm">الكل</Button>
              <select className="p-2 border rounded-md text-sm">
                <option>القيمة</option>
                <option>الحالة</option>
              </select>
              <div className="flex-1">
                <Input placeholder="البحث في السلايدرز..." />
              </div>
              <Button variant="outline" size="sm">
                <RefreshCw className="h-4 w-4 mr-2" />
                تحديث
              </Button>
            </div>

            <div className="bg-white border rounded-lg">
              <div className="p-4 border-b bg-gray-50">
                <div className="grid grid-cols-4 gap-4 text-sm font-medium">
                  <div>الإسم</div>
                  <div>الحالة</div>
                  <div>التاريخ</div>
                  <div>الخيارات</div>
                </div>
              </div>
              <div className="divide-y">
                <div className="p-4 grid grid-cols-4 gap-4 items-center">
                  <div className="font-medium">البنرات الرئيسية</div>
                  <div>
                    <Badge variant="default">مفعل</Badge>
                  </div>
                  <div className="text-sm text-muted-foreground">2022-01-03</div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-center gap-2">
              <span className="text-sm text-muted-foreground">عرض من خلال 1 الى 1 في 1 سجلات</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const AdsTab: React.FC = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Megaphone className="h-5 w-5" />
              إدارة الإعلانات
            </CardTitle>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              إضافة إعلان جديد
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex gap-4">
              <Button variant="outline" size="sm">الكل</Button>
              <select className="p-2 border rounded-md text-sm">
                <option>القيمة</option>
                <option>الحالة</option>
              </select>
              <div className="flex-1">
                <Input placeholder="البحث في الإعلانات..." />
              </div>
              <Button variant="outline" size="sm">
                <RefreshCw className="h-4 w-4 mr-2" />
                تحديث
              </Button>
            </div>

            <div className="bg-white border rounded-lg">
              <div className="p-4 border-b bg-gray-50">
                <div className="grid grid-cols-6 gap-4 text-sm font-medium">
                  <div>الصورة</div>
                  <div>الإسم</div>
                  <div>الزيارات</div>
                  <div>إنتهاء الصلاحية</div>
                  <div>الحالة</div>
                  <div>الخيارات</div>
                </div>
              </div>
              <div className="divide-y">
                {[
                  { name: 'دعاية السمعات', visits: 46, expiry: '2027-04-07', status: 'مفعل' },
                  { name: 'الدعاية الفردية', visits: 52, expiry: '2027-01-04', status: 'مفعل' },
                  { name: 'الدعاية الثنائية -2-', visits: 35, expiry: '2027-01-04', status: 'مفعل' },
                  { name: 'الدعاية الثنائية -1-', visits: 60, expiry: '2027-01-04', status: 'مفعل' },
                  { name: 'الدعاية الثلاثية 3', visits: 43, expiry: '2027-01-04', status: 'مفعل' },
                  { name: 'أثاث منزللي', visits: 0, expiry: '2027-06-04', status: 'مفعل' }
                ].map((ad, index) => (
                  <div key={index} className="p-4 grid grid-cols-6 gap-4 items-center">
                    <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center">
                      <Image className="h-6 w-6 text-gray-400" />
                    </div>
                    <div className="font-medium">{ad.name}</div>
                    <div className="text-sm">{ad.visits}</div>
                    <div className="text-sm text-muted-foreground">{ad.expiry}</div>
                    <div>
                      <Badge variant="default">{ad.status}</Badge>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-center gap-2">
              <span className="text-sm text-muted-foreground">عرض من خلال 1 الى 6 في 6 سجلات</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-lg border-b border-slate-200 sticky top-0 z-50">
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
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
                <Settings className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  الإعدادات
                </h1>
                <p className="text-sm text-muted-foreground">إدارة إعدادات المتجر والتخصيص</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
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
        } fixed lg:static inset-y-0 left-0 z-40 w-80 bg-white/80 backdrop-blur-lg border-r border-slate-200 transition-transform duration-300 ease-in-out lg:translate-x-0`}>
          <div className="flex flex-col h-full">
            <div className="p-6">
              <nav className="space-y-2">
                {navigationItems.map((item) => (
                  <Button
                    key={item.id}
                    variant={activeTab === item.id ? 'default' : 'ghost'}
                    className={`w-full justify-start h-12 ${
                      activeTab === item.id
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                        : 'hover:bg-slate-100'
                    }`}
                    onClick={() => setActiveTab(item.id)}
                  >
                    <item.icon className="h-5 w-5 mr-3" />
                    <span>{item.label}</span>
                  </Button>
                ))}
              </nav>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 lg:ml-0">
          {activeTab === 'store-data' && <StoreDataTab />}
          {activeTab === 'store-interface' && <StoreInterfaceTab />}
          {activeTab === 'pages' && <PagesTab />}
          {activeTab === 'menu' && <MenuTab />}
          {activeTab === 'sliders' && <SlidersTab />}
          {activeTab === 'ads' && <AdsTab />}
        </main>
      </div>
    </div>
  );
};

export default MerchantSettings;