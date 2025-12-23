# سكريبت حفظ تلقائي للتغييرات
# Auto-save Script

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "حفظ تلقائي للتغييرات" -ForegroundColor Cyan
Write-Host "Auto-saving changes" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# التحقق من وجود Git repository
if (-not (Test-Path ".git")) {
    Write-Host "خطأ: هذا المجلد ليس Git repository!" -ForegroundColor Red
    Write-Host "Error: This is not a Git repository!" -ForegroundColor Red
    exit 1
}

# إضافة جميع التغييرات
Write-Host "جارٍ إضافة التغييرات..." -ForegroundColor Yellow
Write-Host "Adding changes..." -ForegroundColor Yellow
git add .

# التحقق من وجود تغييرات
$status = git status --porcelain
if ([string]::IsNullOrWhiteSpace($status)) {
    Write-Host ""
    Write-Host "لا توجد تغييرات للحفظ" -ForegroundColor Yellow
    Write-Host "No changes to save" -ForegroundColor Yellow
    exit 0
}

# عرض التغييرات
Write-Host ""
Write-Host "التغييرات التي سيتم حفظها:" -ForegroundColor Cyan
Write-Host "Changes to be saved:" -ForegroundColor Cyan
git status --short

Write-Host ""
$timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
$commitMessage = "Auto-save: $timestamp"

# حفظ التغييرات
Write-Host ""
Write-Host "جارٍ حفظ التغييرات..." -ForegroundColor Yellow
Write-Host "Saving changes..." -ForegroundColor Yellow
git commit -m "$commitMessage"

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "✓ تم حفظ التغييرات بنجاح!" -ForegroundColor Green
    Write-Host "✓ Changes saved successfully!" -ForegroundColor Green
    Write-Host ""
    Write-Host "الوقت: $timestamp" -ForegroundColor Cyan
    Write-Host "Time: $timestamp" -ForegroundColor Cyan
} else {
    Write-Host ""
    Write-Host "✗ فشل حفظ التغييرات" -ForegroundColor Red
    Write-Host "✗ Failed to save changes" -ForegroundColor Red
}

