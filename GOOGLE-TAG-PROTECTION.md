# حماية Google Tag - Google Tag Protection

## ⚠️ تحذير مهم

**ممنوع نهائياً حذف أي روابط Google Tag الموجودة في الهيدر!**

**It is strictly forbidden to delete any Google Tag links in the header!**

## النظام الموجود

تم إعداد نظام حماية تلقائي يمنع حذف Google Tag من أي صفحة.

## الملفات المحمية

جميع ملفات HTML في مجلد `pages/` محمية من حذف Google Tag.

## كيفية الاستخدام

### 1. التحقق من وجود Google Tag في جميع الصفحات:
```powershell
.\check-google-tag.ps1
```

### 2. إضافة Google Tag إلى صفحة:
```powershell
.\add-google-tag.ps1 -FilePath "pages/index/index.html" -GTMId "GTM-XXXXXXX" -GAId "G-XXXXXXXXXX"
```

### 3. تفعيل الحماية:
```powershell
.\protect-google-tag.ps1
```

## كيف يعمل النظام

1. **Git Hook**: عند محاولة عمل commit، يتم التحقق تلقائياً من وجود Google Tag
2. **منع الحذف**: إذا تم حذف Google Tag، سيتم رفض الـ commit
3. **رسالة تحذير**: ستظهر رسالة واضحة تمنع الحذف

## الأنماط المحمية

النظام يبحث عن الأنماط التالية:
- `googletagmanager`
- `gtag`
- `google.*tag`
- `GTM-` (Google Tag Manager ID)
- `G-` (Google Analytics ID)
- `dataLayer`

## استعادة Google Tag المحذوف

إذا تم حذف Google Tag بالخطأ:

```powershell
# استعادة من آخر commit
git checkout HEAD -- "pages/index/index.html"

# أو استخدام سكريبت الاستعادة
.\restore-deleted-file.ps1 -FilePath "pages/index/index.html"
```

## إضافة Google Tag يدوياً

يمكنك نسخ الكود من `protected/google-tag-template.html` وإضافته قبل `</head>` في أي صفحة.

## ملاحظات

- النظام يعمل تلقائياً مع Git
- لا يمكن تجاوز الحماية إلا بإزالة Git hook (غير مستحسن)
- جميع التغييرات محفوظة في Git history

