# هيكل المشروع - Project Structure

## التنظيم الحالي:

```
Nmaa Web site/
├── pages/                    # جميع صفحات الموقع
│   ├── index/               # الصفحة الرئيسية
│   │   ├── index.html
│   │   └── index.css
│   ├── about/               # صفحة من نحن
│   │   ├── about.html
│   │   └── about.css
│   ├── services/            # صفحة الخدمات
│   │   ├── services.html
│   │   └── services.css
│   ├── contact-us/          # صفحة اتصل بنا
│   │   ├── contact-us.html
│   │   └── contact-us.css
│   ├── home/               # الصفحة الرئيسية البديلة
│   │   ├── home.html
│   │   └── home.css
│   ├── 404/                 # صفحة الخطأ 404
│   │   ├── 404.html
│   │   └── 404.css
│   ├── tutorials/           # صفحات تعليمية
│   │   ├── adding-elements.css
│   │   ├── building-layouts-*.css
│   │   └── ... (ملفات CSS تعليمية أخرى)
│   └── shared/              # ملفات CSS مشتركة
│       └── style.css
│
├── components/              # المكونات القابلة لإعادة الاستخدام
│   ├── html/               # ملفات HTML للمكونات
│   │   ├── component.html
│   │   ├── navigation.html
│   │   └── ... (مكونات أخرى)
│   └── css/                # ملفات CSS للمكونات
│       ├── component.css
│       ├── navigation.css
│       └── ... (ملفات CSS للمكونات)
│
├── templates/               # النسخ الاحتياطية للبنية الأساسية
│   ├── pages/              # نسخ احتياطية لجميع الصفحات
│   │   ├── index/
│   │   ├── about/
│   │   ├── services/
│   │   ├── contact-us/
│   │   ├── home/
│   │   ├── 404/
│   │   └── shared/
│   ├── README.md            # دليل الاستعادة
│   ├── restore-pages.ps1     # سكريبت استعادة جميع الصفحات
│   └── restore-single-page.ps1  # سكريبت استعادة صفحة واحدة
│
└── public/                  # الملفات الثابتة (صور، شعارات، إلخ)
    ├── logo.svg
    ├── intro.png
    └── nama_assets/        # صور المشروع
```

## النسخ الاحتياطية:

تم إنشاء نسخ احتياطية من البنية الأساسية لجميع الصفحات في مجلد `templates/`. يمكنك استعادة أي صفحة في أي وقت باستخدام:

### استعادة صفحة واحدة:
```powershell
.\templates\restore-single-page.ps1 -PageName "index"
```

### استعادة جميع الصفحات:
```powershell
.\templates\restore-pages.ps1
```

### استعادة يدوية:
```powershell
Copy-Item -Path "templates\pages\index\*" -Destination "pages\index\" -Recurse -Force
```

## ملاحظات:
- **كل صفحة لها مجلد منفصل** يحتوي على ملف HTML و CSS الخاص بها
- ملفات CSS المشتركة موجودة في `pages/shared/`
- الملفات التعليمية منظمة في `pages/tutorials/`
- مكونات HTML و CSS منظمة في `components/html/` و `components/css/`
- الملفات الثابتة موجودة في `public/`

## هيكل كل صفحة:
```
pages/[اسم-الصفحة]/
├── [اسم-الصفحة].html    # ملف HTML للصفحة
└── [اسم-الصفحة].css     # ملف CSS الخاص بالصفحة
```

