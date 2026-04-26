# دليل الاستعادة - Restore Guide

## نظرة عامة

تم إعداد نظام Git لحفظ جميع التغييرات تلقائياً. يمكنك استعادة أي ملف أو صفحة تم حذفها أو تعديلها.

## السكريبتات المتاحة

### 1. استعادة ملف محذوف
```powershell
.\restore-deleted-file.ps1 -FilePath "pages/index/index.html"
```

### 2. استعادة صفحة كاملة محذوفة
```powershell
.\restore-deleted-page.ps1 -PageName "index"
```

### 3. حفظ تلقائي للتغييرات
```powershell
.\auto-save.ps1
```

### 4. عرض تاريخ التغييرات
```powershell
.\view-history.ps1
.\view-history.ps1 -FilePath "pages/index/index.html"
.\view-history.ps1 -Limit 50
```

## طرق الاستعادة اليدوية

### استعادة ملف من آخر commit
```powershell
git checkout HEAD -- "pages/index/index.html"
```

### استعادة ملف من commit محدد
```powershell
# أولاً، عرض التاريخ
git log --oneline -- "pages/index/index.html"

# ثم استعادة من commit معين
git checkout [commit-hash] -- "pages/index/index.html"
```

### استعادة جميع الملفات المحذوفة
```powershell
git checkout HEAD -- .
```

### استعادة صفحة كاملة
```powershell
git checkout HEAD -- "pages/index/"
```

## عرض التغييرات

### عرض آخر التغييرات
```powershell
git log --oneline -10
```

### عرض تاريخ ملف معين
```powershell
git log --follow -- "pages/index/index.html"
```

### عرض محتوى ملف من commit سابق
```powershell
git show [commit-hash]:pages/index/index.html
```

## نصائح مهمة

1. **احفظ التغييرات بانتظام**: استخدم `.\auto-save.ps1` بعد كل تعديل مهم
2. **تحقق من التاريخ قبل الاستعادة**: استخدم `.\view-history.ps1` لرؤية جميع الإصدارات
3. **استعادة انتقائية**: يمكنك استعادة ملف واحد فقط بدلاً من كل شيء
4. **النسخ الاحتياطية**: النسخ في `templates/` تبقى كنسخة احتياطية إضافية

## أمثلة عملية

### مثال 1: حذفت محتوى صفحة index.html بالخطأ
```powershell
# استعادة الملف
.\restore-deleted-file.ps1 -FilePath "pages/index/index.html"
```

### مثال 2: حذفت مجلد صفحة كاملة
```powershell
# استعادة الصفحة كاملة
.\restore-deleted-page.ps1 -PageName "about"
```

### مثال 3: تريد العودة لإصدار سابق من ملف
```powershell
# عرض التاريخ
.\view-history.ps1 -FilePath "pages/index/index.html"

# استعادة من commit محدد (استبدل [hash] بالرقم الفعلي)
git checkout abc123def -- "pages/index/index.html"
```

### مثال 4: حفظ التغييرات قبل إغلاق المحرر
```powershell
.\auto-save.ps1
```

## حالة Git الحالية

للتحقق من حالة Git:
```powershell
git status
```

لعرض جميع الملفات المحذوفة:
```powershell
git status | Select-String "deleted"
```



