# سكريبت لإضافة Google Tag إلى الصفحات
# Script to add Google Tag to pages

param(
    [Parameter(Mandatory=$true)]
    [string]$FilePath,
    
    [string]$GTMId = "GTM-XXXXXXX",
    [string]$GAId = "G-XXXXXXXXXX"
)

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "إضافة Google Tag إلى الصفحة" -ForegroundColor Cyan
Write-Host "Adding Google Tag to page" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# التحقق من وجود الملف
if (-not (Test-Path $FilePath)) {
    Write-Host "❌ الملف غير موجود: $FilePath" -ForegroundColor Red
    exit 1
}

# قراءة محتوى الملف
$content = Get-Content $FilePath -Raw

# التحقق من وجود Google Tag بالفعل
if ($content -match "googletagmanager|gtag|GTM-|G-[A-Z0-9]") {
    Write-Host "⚠️  الملف يحتوي بالفعل على Google Tag" -ForegroundColor Yellow
    Write-Host "⚠️  File already contains Google Tag" -ForegroundColor Yellow
    exit 0
}

# إنشاء كود Google Tag
$gtmScript = @"
<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','$GTMId');</script>
<!-- End Google Tag Manager -->

<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=$GAId"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', '$GAId');
</script>
"@

# البحث عن </head> لإضافة الكود قبله
if ($content -match "</head>") {
    $newContent = $content -replace "</head>", "$gtmScript`n</head>"
    
    # حفظ الملف
    Set-Content -Path $FilePath -Value $newContent -NoNewline
    
    Write-Host "✅ تم إضافة Google Tag بنجاح!" -ForegroundColor Green
    Write-Host "✅ Google Tag added successfully!" -ForegroundColor Green
    Write-Host ""
    Write-Host "📝 GTM ID: $GTMId" -ForegroundColor Cyan
    Write-Host "📝 GA ID: $GAId" -ForegroundColor Cyan
} else {
    Write-Host "❌ لم يتم العثور على </head> في الملف" -ForegroundColor Red
    Write-Host "❌ Could not find </head> tag in file" -ForegroundColor Red
    exit 1
}

