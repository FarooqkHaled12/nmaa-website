# النسخ الاحتياطية - Templates & Backups

هذا المجلد يحتوي على نسخ احتياطية من البنية الأساسية لجميع صفحات الموقع.

## البنية:

```
templates/
└── pages/
    ├── index/          # نسخة احتياطية من الصفحة الرئيسية
    ├── about/          # نسخة احتياطية من صفحة من نحن
    ├── services/       # نسخة احتياطية من صفحة الخدمات
    ├── contact-us/     # نسخة احتياطية من صفحة اتصل بنا
    ├── home/           # نسخة احتياطية من الصفحة الرئيسية البديلة
    ├── 404/            # نسخة احتياطية من صفحة الخطأ 404
    └── shared/         # نسخة احتياطية من ملفات CSS المشتركة
```

## كيفية الاستعادة:

### استعادة صفحة واحدة:

```powershell
# استعادة صفحة index
Copy-Item -Path "templates\pages\index\*" -Destination "pages\index\" -Recurse -Force

# استعادة صفحة about
Copy-Item -Path "templates\pages\about\*" -Destination "pages\about\" -Recurse -Force

# استعادة صفحة services
Copy-Item -Path "templates\pages\services\*" -Destination "pages\services\" -Recurse -Force

# استعادة صفحة contact-us
Copy-Item -Path "templates\pages\contact-us\*" -Destination "pages\contact-us\" -Recurse -Force

# استعادة صفحة home
Copy-Item -Path "templates\pages\home\*" -Destination "pages\home\" -Recurse -Force

# استعادة صفحة 404
Copy-Item -Path "templates\pages\404\*" -Destination "pages\404\" -Recurse -Force

# استعادة ملفات CSS المشتركة
Copy-Item -Path "templates\pages\shared\*" -Destination "pages\shared\" -Recurse -Force
```

### استعادة جميع الصفحات:

استخدم السكريبت `restore-pages.ps1` لاستعادة جميع الصفحات مرة واحدة.

## ملاحظات مهمة:

⚠️ **تحذير**: استعادة الملفات ستحذف أي تعديلات تمت على الصفحات الحالية وتستبدلها بالنسخة الاحتياطية الأساسية.

✅ **نصيحة**: قبل الاستعادة، احتفظ بنسخة من التعديلات الحالية إذا كنت تريد الاحتفاظ بها.

