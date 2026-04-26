# سكريبت عرض تاريخ التغييرات
# View History Script

param(
    [string]$FilePath = "",
    [int]$Limit = 20
)

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "تاريخ التغييرات" -ForegroundColor Cyan
Write-Host "Change History" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

if ([string]::IsNullOrWhiteSpace($FilePath)) {
    Write-Host "آخر $Limit commit:" -ForegroundColor Yellow
    Write-Host "Last $Limit commits:" -ForegroundColor Yellow
    Write-Host ""
    git log --oneline -n $Limit
} else {
    Write-Host "تاريخ الملف: $FilePath" -ForegroundColor Yellow
    Write-Host "File history: $FilePath" -ForegroundColor Yellow
    Write-Host ""
    git log --oneline --follow -- "$FilePath" | Select-Object -First $Limit
}

Write-Host ""
Write-Host "للاستعادة من commit معين، استخدم:" -ForegroundColor Cyan
Write-Host "To restore from a specific commit, use:" -ForegroundColor Cyan
Write-Host "  git checkout [commit-hash] -- [file-path]" -ForegroundColor White



