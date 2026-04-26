# سكريبت استعادة ملف محذوف من Git
# Restore Deleted File Script

param(
    [Parameter(Mandatory=$true)]
    [string]$FilePath
)

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "استعادة ملف محذوف من Git" -ForegroundColor Cyan
Write-Host "Restoring deleted file from Git" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# التحقق من وجود Git repository
if (-not (Test-Path ".git")) {
    Write-Host "خطأ: هذا المجلد ليس Git repository!" -ForegroundColor Red
    Write-Host "Error: This is not a Git repository!" -ForegroundColor Red
    exit 1
}

# التحقق من وجود الملف في Git history
$gitCheck = git log --all --full-history --pretty=format: --name-only -- "$FilePath" | Select-Object -First 1

if ([string]::IsNullOrWhiteSpace($gitCheck)) {
    Write-Host "خطأ: لم يتم العثور على الملف '$FilePath' في Git history" -ForegroundColor Red
    Write-Host "Error: File '$FilePath' not found in Git history" -ForegroundColor Red
    Write-Host ""
    Write-Host "ملفات متاحة للاستعادة:" -ForegroundColor Yellow
    Write-Host "Available files to restore:" -ForegroundColor Yellow
    git log --all --full-history --pretty=format: --name-only | Sort-Object -Unique | Select-Object -First 20 | ForEach-Object { Write-Host "  - $_" -ForegroundColor White }
    exit 1
}

# استعادة الملف من آخر commit
Write-Host "جارٍ استعادة الملف: $FilePath" -ForegroundColor Yellow
Write-Host "Restoring file: $FilePath" -ForegroundColor Yellow
Write-Host ""

git checkout HEAD -- "$FilePath"

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "✓ تم استعادة الملف '$FilePath' بنجاح!" -ForegroundColor Green
    Write-Host "✓ File '$FilePath' restored successfully!" -ForegroundColor Green
    Write-Host ""
    Write-Host "ملاحظة: تم استعادة الملف من آخر commit" -ForegroundColor Cyan
    Write-Host "Note: File restored from last commit" -ForegroundColor Cyan
} else {
    Write-Host ""
    Write-Host "✗ فشلت عملية الاستعادة" -ForegroundColor Red
    Write-Host "✗ Restoration failed" -ForegroundColor Red
}



