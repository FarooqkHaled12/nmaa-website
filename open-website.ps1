# فتح الموقع في المتصفح
# Open website in browser

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "فتح الموقع" -ForegroundColor Cyan
Write-Host "Opening Website" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

$indexPath = "pages\index\index.html"
$fullPath = Join-Path $PWD $indexPath

if (Test-Path $fullPath) {
    Write-Host "🌐 جارٍ فتح الموقع..." -ForegroundColor Green
    Write-Host "🌐 Opening website..." -ForegroundColor Green
    Write-Host ""
    Write-Host "📄 الصفحة: $fullPath" -ForegroundColor Cyan
    Write-Host "📄 Page: $fullPath" -ForegroundColor Cyan
    Write-Host ""
    
    # فتح الملف في المتصفح الافتراضي
    Start-Process $fullPath
    
    Write-Host "✅ تم فتح الموقع في المتصفح!" -ForegroundColor Green
    Write-Host "✅ Website opened in browser!" -ForegroundColor Green
} else {
    Write-Host "❌ لم يتم العثور على الصفحة الرئيسية" -ForegroundColor Red
    Write-Host "❌ Index page not found" -ForegroundColor Red
}

Write-Host ""

