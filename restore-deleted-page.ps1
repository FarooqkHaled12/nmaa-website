# سكريبت استعادة صفحة كاملة محذوفة
# Restore Deleted Page Script

param(
    [Parameter(Mandatory=$true)]
    [string]$PageName
)

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "استعادة صفحة محذوفة: $PageName" -ForegroundColor Cyan
Write-Host "Restoring deleted page: $PageName" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# التحقق من وجود Git repository
if (-not (Test-Path ".git")) {
    Write-Host "خطأ: هذا المجلد ليس Git repository!" -ForegroundColor Red
    Write-Host "Error: This is not a Git repository!" -ForegroundColor Red
    exit 1
}

$pagePath = "pages\$PageName"

# البحث عن الملفات في Git history
$htmlFile = "$pagePath\$PageName.html"
$cssFile = "$pagePath\$PageName.css"

Write-Host "جارٍ البحث عن ملفات الصفحة..." -ForegroundColor Yellow
Write-Host "Searching for page files..." -ForegroundColor Yellow
Write-Host ""

$filesFound = @()

# التحقق من وجود HTML
$htmlCheck = git log --all --full-history --pretty=format: --name-only -- "$htmlFile" | Select-Object -First 1
if (-not [string]::IsNullOrWhiteSpace($htmlCheck)) {
    $filesFound += $htmlFile
    Write-Host "✓ تم العثور على: $htmlFile" -ForegroundColor Green
}

# التحقق من وجود CSS
$cssCheck = git log --all --full-history --pretty=format: --name-only -- "$cssFile" | Select-Object -First 1
if (-not [string]::IsNullOrWhiteSpace($cssCheck)) {
    $filesFound += $cssFile
    Write-Host "✓ تم العثور على: $cssFile" -ForegroundColor Green
}

if ($filesFound.Count -eq 0) {
    Write-Host ""
    Write-Host "خطأ: لم يتم العثور على ملفات الصفحة '$PageName' في Git history" -ForegroundColor Red
    Write-Host "Error: Page files for '$PageName' not found in Git history" -ForegroundColor Red
    Write-Host ""
    Write-Host "الصفحات المتاحة:" -ForegroundColor Yellow
    Write-Host "Available pages:" -ForegroundColor Yellow
    git log --all --full-history --pretty=format: --name-only -- "pages/" | Where-Object { $_ -like "*.html" } | ForEach-Object { 
        $page = ($_ -split '/')[1]
        Write-Host "  - $page" -ForegroundColor White
    } | Sort-Object -Unique
    exit 1
}

Write-Host ""
Write-Host "جارٍ استعادة الملفات..." -ForegroundColor Yellow
Write-Host "Restoring files..." -ForegroundColor Yellow
Write-Host ""

# التأكد من وجود المجلد
if (-not (Test-Path $pagePath)) {
    New-Item -ItemType Directory -Path $pagePath -Force | Out-Null
    Write-Host "تم إنشاء المجلد: $pagePath" -ForegroundColor Cyan
}

# استعادة الملفات
foreach ($file in $filesFound) {
    git checkout HEAD -- "$file"
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✓ تم استعادة: $file" -ForegroundColor Green
    } else {
        Write-Host "✗ فشل استعادة: $file" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "تمت الاستعادة بنجاح!" -ForegroundColor Green
Write-Host "Restoration completed successfully!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan



