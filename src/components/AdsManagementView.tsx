import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface AdsManagementViewProps {
  storeData: any;
  setStoreData: (data: any) => void;
  onSave: () => void;
}

export const AdsManagementView: React.FC<AdsManagementViewProps> = ({
  storeData,
  setStoreData,
  onSave
}) => {
  const [showAddAd, setShowAddAd] = useState(false);
  const [filterValue, setFilterValue] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  // Sample ads data
  const ads = [
    {
      id: 1,
      name: 'دعاية السمعات',
      image: '/assets/ads/headphones-ad.jpg',
      clicks: 46,
      expiryDate: '2027-04-07',
      status: 'مفعل',
      position: 'الشريط العلوي'
    },
    {
      id: 2,
      name: 'الدعاية الفردية',
      image: '/assets/ads/single-ad.jpg',
      clicks: 52,
      expiryDate: '2027-01-04',
      status: 'مفعل',
      position: 'الشريط السفلي'
    },
    {
      id: 3,
      name: 'الدعاية الثنائية -2-',
      image: '/assets/ads/double-ad-2.jpg',
      clicks: 35,
      expiryDate: '2027-01-04',
      status: 'مفعل',
      position: 'الصفحة الرئيسية'
    },
    {
      id: 4,
      name: 'الدعاية الثنائية -1-',
      image: '/assets/ads/double-ad-1.jpg',
      clicks: 60,
      expiryDate: '2027-01-04',
      status: 'مفعل',
      position: 'صفحة المنتج'
    },
    {
      id: 5,
      name: 'الدعاية الثلاثية 3',
      image: '/assets/ads/triple-ad-3.jpg',
      clicks: 43,
      expiryDate: '2027-01-04',
      status: 'مفعل',
      position: 'الشريط الجانبي'
    },
    {
      id: 6,
      name: 'أثاث منزللي',
      image: '/assets/ads/furniture-ad.jpg',
      clicks: 0,
      expiryDate: '2027-06-04',
      status: 'مفعل',
      position: 'الصفحة الرئيسية'
    }
  ];

  // New ad form state
  const [newAd, setNewAd] = useState({
    name: '',
    image: '',
    link: '',
    position: 'غير محدد',
    expiryDate: '',
    status: 'مفعل'
  });

  const handleAddAd = () => {
    // Here you would typically save the new ad
    console.log('Adding new ad:', newAd);
    setShowAddAd(false);
    setNewAd({
      name: '',
      image: '',
      link: '',
      position: 'غير محدد',
      expiryDate: '',
      status: 'مفعل'
    });
  };

  const filteredAds = ads.filter(ad => {
    const matchesValue = !filterValue || ad.name.includes(filterValue);
    const matchesStatus = !filterStatus || ad.status === filterStatus;
    return matchesValue && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">إدارة الإعلانات</h2>
          <p className="text-gray-600">إنشاء وتعديل الإعلانات لمتجرك الإلكتروني</p>
        </div>
      </div>

      {/* Filters and Actions */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex gap-4 items-center">
              <Button
                onClick={() => setShowAddAd(true)}
                className="bg-blue-600 hover:bg-blue-700"
              >
                إضافة إعلان جديد
              </Button>

              <Select value={filterValue} onValueChange={setFilterValue}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="الكل" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">الكل</SelectItem>
                  <SelectItem value="دعاية السمعات">دعاية السمعات</SelectItem>
                  <SelectItem value="دعاية فردية">الدعاية الفردية</SelectItem>
                  <SelectItem value="دعاية ثنائية">الدعاية الثنائية</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="الحالة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">الكل</SelectItem>
                  <SelectItem value="مفعل">مفعل</SelectItem>
                  <SelectItem value="غير مفعل">غير مفعل</SelectItem>
                  <SelectItem value="ملغية">ملغية</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                تحديث
              </Button>
              <Button variant="outline" size="sm">
                <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                فرز
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Add New Ad Modal */}
      {showAddAd && (
        <Card>
          <CardHeader>
            <CardTitle>إضافة إعلان جديد</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="adName">الإسم</Label>
                <Input
                  id="adName"
                  value={newAd.name}
                  onChange={(e) => setNewAd({...newAd, name: e.target.value})}
                  placeholder="أدخل اسم الإعلان"
                  className="text-right"
                />
              </div>

              <div>
                <Label htmlFor="adPosition">الموقع</Label>
                <Select value={newAd.position} onValueChange={(value) => setNewAd({...newAd, position: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="غير محدد">غير محدد</SelectItem>
                    <SelectItem value="الشريط العلوي">الشريط العلوي</SelectItem>
                    <SelectItem value="الشريط السفلي">الشريط السفلي</SelectItem>
                    <SelectItem value="الصفحة الرئيسية">الصفحة الرئيسية</SelectItem>
                    <SelectItem value="صفحة المنتج">صفحة المنتج</SelectItem>
                    <SelectItem value="الشريط الجانبي">الشريط الجانبي</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="adLink">الرابط</Label>
                <Input
                  id="adLink"
                  value={newAd.link}
                  onChange={(e) => setNewAd({...newAd, link: e.target.value})}
                  placeholder="للروابط الخاصة بالمتجر /products أو https://eshro.ly"
                  className="text-right"
                />
              </div>

              <div>
                <Label htmlFor="adExpiry">إنتهاء الصلاحية</Label>
                <Input
                  id="adExpiry"
                  type="date"
                  value={newAd.expiryDate}
                  onChange={(e) => setNewAd({...newAd, expiryDate: e.target.value})}
                  className="text-right"
                />
              </div>
            </div>

            <div>
              <Label className="block text-sm font-medium text-gray-700 mb-2">صورة الإعلان</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <div className="w-full h-48 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-gray-500">معاينة الصورة</span>
                </div>
                <Button variant="outline">
                  إختيار صورة
                </Button>
              </div>
            </div>

            <div>
              <Label htmlFor="adStatus">الحالة</Label>
              <Select value={newAd.status} onValueChange={(value) => setNewAd({...newAd, status: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="مفعل">مفعل</SelectItem>
                  <SelectItem value="غير مفعل">غير مفعل</SelectItem>
                  <SelectItem value="ملغية">ملغية</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-4 pt-4">
              <Button onClick={handleAddAd}>حفظ</Button>
              <Button variant="outline" onClick={() => setShowAddAd(false)}>إلغاء</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Ads Grid */}
      <Card>
        <CardHeader>
          <CardTitle>قائمة الإعلانات</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAds.map((ad) => (
              <Card key={ad.id} className="overflow-hidden">
                <div className="aspect-video bg-gray-100 relative">
                  <div className="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                    <span className="text-gray-600 text-sm">صورة الإعلان</span>
                  </div>
                  <div className="absolute top-2 right-2">
                    <Badge className={
                      ad.status === 'مفعل' ? 'bg-green-100 text-green-800' :
                      'bg-gray-100 text-gray-800'
                    }>
                      {ad.status}
                    </Badge>
                  </div>
                </div>

                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div>
                      <h3 className="font-medium text-gray-900">{ad.name}</h3>
                      <p className="text-sm text-gray-600">{ad.position}</p>
                    </div>

                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-600">الزيارات: {ad.clicks}</span>
                      <span className="text-gray-600">ينتهي: {ad.expiryDate}</span>
                    </div>

                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="flex-1">
                        <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        تعديل
                      </Button>
                      <Button size="sm" variant="outline">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center gap-2 mt-6">
            <span className="text-sm text-gray-600">عرض من خلال 1 الى {filteredAds.length} في {filteredAds.length} سجلات</span>
          </div>
        </CardContent>
      </Card>

      {/* Ad Positions Overview */}
      <Card>
        <CardHeader>
          <CardTitle>مواقع الإعلانات</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { name: 'الشريط العلوي', count: 1, color: 'bg-blue-100 text-blue-800' },
              { name: 'الشريط السفلي', count: 1, color: 'bg-green-100 text-green-800' },
              { name: 'الصفحة الرئيسية', count: 2, color: 'bg-purple-100 text-purple-800' },
              { name: 'الشريط الجانبي', count: 1, color: 'bg-yellow-100 text-yellow-800' }
            ].map((position, index) => (
              <div key={index} className="text-center p-4 border rounded-lg">
                <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${position.color}`}>
                  {position.count} إعلان
                </div>
                <p className="mt-2 text-sm text-gray-600">{position.name}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};