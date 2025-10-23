@echo off
chcp 65001 >nul
echo 🚀 بدء عملية حفظ الملفات على GitHub...
echo.

REM التحقق من وجود git
git --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Git غير مثبت على النظام
    echo ✅ يرجى تحميل Git من: https://git-scm.com/downloads
    pause
    exit /b 1
)

REM التحقق من وجود المجلد .git
if not exist ".git" (
    echo ❌ هذا المجلد ليس مرتبط بمستودع Git
    echo ✅ يرجى إنشاء مستودع جديد أو استنساخ مستودع موجود
    pause
    exit /b 1
)

echo 📁 المجلد الحالي: %cd%
echo.

REM إضافة جميع الملفات المحدثة
echo 📋 إضافة الملفات المحدثة...
git add .
echo.

REM التحقق من وجود تغييرات
git diff --cached --quiet
if errorlevel 1 (
    echo 💾 عمل commit للتغييرات...
    git commit -m "حل مشاكل الخصوصية وتحسين نظام تسجيل الدخول للزوار

✅ تحسينات الإصدار 4.3.1:
- إصلاح منتقي التاريخ ليستخدم قوائم منسدلة للسنة والشهر
- إضافة عدّاد طلبات غير المتوفرة في الهيدر
- إضافة أزرار إزالة لطلبات المنتجات غير المتوفرة
- تحسين نظام تسجيل دخول الزوار
- إصلاح صفحات الشروط والأحكام وسياسة الخصوصية
- تحديث فوري للواجهة بدون إعادة تحميل"

    echo.
    echo ⬆️ رفع التغييرات لـ GitHub...
    git push origin main

    if errorlevel 1 (
        echo.
        echo ❌ فشل في رفع الملفات لـ GitHub
        echo ✅ تأكد من صحة بيانات الدخول لحساب GitHub
    ) else (
        echo.
        echo ✅ تم حفظ جميع الملفات على GitHub بنجاح!
        echo 🌐 رابط المشروع: https://github.com/bennouba/eishro
        echo.
        echo 📊 ملخص التغيييرات:
        echo • تم إصلاح 6 مشاكل رئيسية في النظام
        echo • تم إضافة تحسينات في تجربة المستخدم
        echo • تم تحديث ملفات السياسات والشروط
        echo • تم تحسين نظام تسجيل الدخول للزوار
        echo.
        echo 🎉 العملية اكتملت بنجاح!
        echo 📞 للمساعدة: hi@eshro.ly ^| 00218928829999
    )
) else (
    echo ℹ️ لا توجد تغيييرات جديدة للحفظ
)

echo.
pause