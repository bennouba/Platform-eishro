@echo off
chcp 65001 >nul
echo 🚀 تشغيل سكريبت حفظ الملفات على GitHub...
echo.
echo 📁 تشغيل السكريبت...
call upload-to-github-final.bat
echo.
echo ✅ تم تشغيل السكريبت بنجاح!
echo.
echo 💡 إذا لم يعمل السكريبت، يرجى تشغيل الملف يدوياً:
echo    upload-to-github-final.bat
echo.
pause