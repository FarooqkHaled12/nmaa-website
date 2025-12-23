# سكريبت استعادة صفحة واحدة
# Restore Single Page Script

param(
    [Parameter(Mandatory=$true)]
    [string]$PageName
)

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "استعادة صفحة: $PageName" -ForegroundColor Cyan
Write-Host "Restoring page: $PageName" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

$sourcePath = "templates\pages\$PageName"
$destPath = "pages\$PageName"

# التحقق من وجود النسخة الاحتياطية
if (-not (Test-Path $sourcePath)) {
    Write-Host "خطأ: لم يتم العثور على النسخة الاحتياطية للصفحة '$PageName'" -ForegroundColor Red
    Write-Host "Error: Template not found for page '$PageName'" -ForegroundColor Red
    Write-Host ""
    Write-Host "الصفحات المتاحة:" -ForegroundColor Yellow
    Write-Host "Available pages:" -ForegroundColor Yellow
    Get-ChildItem "templates\pages" -Directory | ForEach-Object { Write-Host "  - $($_.Name)" -ForegroundColor White }
    exit 1
}

# التأكد من وجود مجلد الوجهة
if (-not (Test-Path $destPath)) {
    New-Item -ItemType Directory -Path $destPath -Force | Out-Null
    Write-Host "تم إنشاء مجلد: $destPath" -ForegroundColor Yellow
}

# نسخ الملفات
Copy-Item -Path "$sourcePath\*" -Destination $destPath -Recurse -Force

Write-Host ""
Write-Host "✓ تم استعادة صفحة '$PageName' بنجاح!" -ForegroundColor Green
Write-Host "✓ Page '$PageName' restored successfully!" -ForegroundColor Green
Write-Host ""

