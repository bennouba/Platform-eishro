import React from 'react';

// اختبار تخطيط الهيدر - Header Layout Test
const HeaderLayoutTest: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* الهيدر الحالي - Current Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* الشعار في أقصى اليسار - Logo on far left */}
            <div className="flex items-center">
              <div className="w-32 h-12 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
                LOGO
              </div>
            </div>

            {/* أيقونة الجرس + أيقونة التاجر + تسجيل الخروج في أقصى اليمين */}
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100 rounded-full">
                🔔
              </button>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
                  👤
                </div>
                <span className="text-sm font-medium text-gray-700 hidden sm:block">محمد التاجر</span>
                <button className="text-red-600 hover:text-red-700 hover:bg-red-50 px-3 py-1 rounded">
                  تسجيل الخروج
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* محتوى الصفحة - Page Content */}
      <main className="p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">اختبار تخطيط الهيدر</h1>

          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h2 className="text-lg font-semibold mb-4">وصف التخطيط الحالي:</h2>
            <ul className="space-y-2 text-gray-700">
              <li>• الشعار: في أقصى اليسار من الهيدر</li>
              <li>• أيقونة الجرس: في أقصى اليمين</li>
              <li>• أيقونة التاجر: بجانب أيقونة الجرس</li>
              <li>• اسم التاجر: بجانب أيقونة التاجر</li>
              <li>• زر تسجيل الخروج: في أقصى اليمين</li>
            </ul>
          </div>

          <div className="bg-blue-50 rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-4">هل هذا التخطيط صحيح؟</h2>
            <p className="text-gray-700 mb-4">
              إذا كان التخطيط أعلاه يطابق ما تراه في الصورة، فهذا هو التخطيط الصحيح.
              إذا كان مختلفاً، يرجى وصف كيف تريد التعديل.
            </p>
            <div className="flex space-x-4">
              <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                نعم، صحيح
              </button>
              <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
                لا، يحتاج تعديل
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HeaderLayoutTest;