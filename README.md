# موقع Nmaa - Nmaa Website

## 🚀 البدء السريع

### استعادة ملف محذوف:
```powershell
.\quick-restore.ps1
```

أو لملف محدد:
```powershell
.\restore-deleted-file.ps1 -FilePath "pages/index/index.html"
```

### حفظ التغييرات:
```powershell
.\auto-save.ps1
```

### عرض التاريخ:
```powershell
.\view-history.ps1
```

## 📚 دليل الاستخدام الكامل

راجع ملف `RESTORE-GUIDE.md` للتعليمات التفصيلية.

## 📁 البنية

راجع ملف `STRUCTURE.md` لمعرفة هيكل المشروع الكامل.

## 🔄 نظام النسخ الاحتياطي

المشروع يستخدم Git لحفظ جميع التغييرات تلقائياً. يمكنك استعادة أي ملف أو صفحة تم حذفها أو تعديلها.

### السكريبتات المتاحة:

1. **`quick-restore.ps1`** - استعادة سريعة للملفات المحذوفة
2. **`restore-deleted-file.ps1`** - استعادة ملف محدد
3. **`restore-deleted-page.ps1`** - استعادة صفحة كاملة
4. **`auto-save.ps1`** - حفظ تلقائي للتغييرات
5. **`view-history.ps1`** - عرض تاريخ التغييرات

## 💡 نصائح

- استخدم `.\auto-save.ps1` بعد كل تعديل مهم
- إذا حذفت أي شيء بالخطأ، استخدم `.\quick-restore.ps1`
- النسخ الاحتياطية موجودة في `templates/` أيضاً



