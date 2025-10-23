@echo off
chcp 65001 >nul
echo 🚀 تشغيل سكريبت حفظ الملفات على GitHub...
echo.

REM التحقق من وجود الملف
if not exist "upload-to-github.bat" (
    echo ❌ ملف upload-to-github.bat غير موجود
    echo ✅ تأكد من أنك في المجلد الصحيح
    pause
    exit /b 1
)

echo 📁 تشغيل السكريبت...
call upload-to-github.bat

echo.
echo ✅ تم تشغيل السكريبت بنجاح!
pause