# سكريبت للتحقق من وجود Google Tag في جميع الصفحات
# Script to check for Google Tag in all pages

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "التحقق من وجود Google Tag" -ForegroundColor Cyan
Write-Host "Checking for Google Tag" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# الأنماط المحمية
$protectedPatterns = @(
    "googletagmanager",
    "gtag",
    "google.*tag",
    "GTM-",
    "G-[A-Z0-9]+",
    "dataLayer"
)

# البحث عن جميع ملفات HTML في pages
$htmlFiles = Get-ChildItem -Path "pages" -Filter "*.html" -Recurse -File

if ($htmlFiles.Count -eq 0) {
    Write-Host "❌ لم يتم العثور على ملفات HTML" -ForegroundColor Red
    exit 1
}

$missingTags = @()
$hasTags = @()

foreach ($file in $htmlFiles) {
    $content = Get-Content $file.FullName -Raw -ErrorAction SilentlyContinue
    
    if ($null -eq $content) {
        continue
    }
    
    $found = $false
    foreach ($pattern in $protectedPatterns) {
        if ($content -match $pattern) {
            $found = $true
            break
        }
    }
    
    if ($found) {
        $hasTags += $file.FullName
        Write-Host "✅ $($file.FullName)" -ForegroundColor Green
    } else {
        $missingTags += $file.FullName
        Write-Host "❌ $($file.FullName) - Google Tag غير موجود!" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "═══════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""

if ($missingTags.Count -eq 0) {
    Write-Host "✅ جميع الصفحات تحتوي على Google Tag" -ForegroundColor Green
    Write-Host "✅ All pages contain Google Tag" -ForegroundColor Green
} else {
    Write-Host "⚠️  الصفحات التي لا تحتوي على Google Tag:" -ForegroundColor Yellow
    Write-Host "⚠️  Pages missing Google Tag:" -ForegroundColor Yellow
    Write-Host ""
    foreach ($file in $missingTags) {
        Write-Host "  - $file" -ForegroundColor Red
    }
    Write-Host ""
    Write-Host "💡 لإضافة Google Tag، استخدم:" -ForegroundColor Cyan
    Write-Host "💡 To add Google Tag, use:" -ForegroundColor Cyan
    if ($missingTags.Count -gt 0) {
        Write-Host "   .\add-google-tag.ps1 -FilePath [file-path]" -ForegroundColor White
    }
}

Write-Host ""

