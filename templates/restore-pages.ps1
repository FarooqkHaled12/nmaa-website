# سكريبت استعادة الصفحات من النسخ الاحتياطية
# Restore Pages Script

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "استعادة الصفحات من النسخ الاحتياطية" -ForegroundColor Cyan
Write-Host "Restoring Pages from Templates" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# التحقق من وجود مجلد templates
if (-not (Test-Path "templates\pages")) {
    Write-Host "خطأ: مجلد templates غير موجود!" -ForegroundColor Red
    Write-Host "Error: Templates folder not found!" -ForegroundColor Red
    exit 1
}

# قائمة الصفحات
$pages = @('index', 'about', 'services', 'contact-us', 'home', '404', 'shared')

Write-Host "الصفحات المتاحة للاستعادة:" -ForegroundColor Yellow
Write-Host "Available pages to restore:" -ForegroundColor Yellow
Write-Host ""

foreach ($page in $pages) {
    Write-Host "  - $page" -ForegroundColor White
}

Write-Host ""
$confirm = Read-Host "هل تريد استعادة جميع الصفحات؟ (y/n) | Restore all pages? (y/n)"

if ($confirm -eq 'y' -or $confirm -eq 'Y') {
    Write-Host ""
    Write-Host "جارٍ استعادة الصفحات..." -ForegroundColor Green
    Write-Host "Restoring pages..." -ForegroundColor Green
    Write-Host ""
    
    foreach ($page in $pages) {
        $sourcePath = "templates\pages\$page"
        $destPath = "pages\$page"
        
        if (Test-Path $sourcePath) {
            # التأكد من وجود مجلد الوجهة
            if (-not (Test-Path $destPath)) {
                New-Item -ItemType Directory -Path $destPath -Force | Out-Null
            }
            
            # نسخ الملفات
            Copy-Item -Path "$sourcePath\*" -Destination $destPath -Recurse -Force
            Write-Host "✓ تم استعادة صفحة: $page" -ForegroundColor Green
        } else {
            Write-Host "✗ لم يتم العثور على: $page" -ForegroundColor Red
        }
    }
    
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Cyan
    Write-Host "تمت الاستعادة بنجاح!" -ForegroundColor Green
    Write-Host "Restoration completed successfully!" -ForegroundColor Green
    Write-Host "========================================" -ForegroundColor Cyan
} else {
    Write-Host ""
    Write-Host "تم إلغاء العملية" -ForegroundColor Yellow
    Write-Host "Operation cancelled" -ForegroundColor Yellow
}

