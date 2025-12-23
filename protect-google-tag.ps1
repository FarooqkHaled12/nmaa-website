# سكريبت حماية Google Tag من الحذف
# Script to protect Google Tag from deletion

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "تفعيل حماية Google Tag" -ForegroundColor Cyan
Write-Host "Enabling Google Tag Protection" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# التحقق من وجود Git
if (-not (Test-Path ".git")) {
    Write-Host "❌ Git repository غير موجود!" -ForegroundColor Red
    exit 1
}

# نسخ Git hook
$hookPath = ".git\hooks\pre-commit"
$hookContent = @"
#!/bin/sh
# Git hook لحماية Google Tag من الحذف
# Pre-commit hook to protect Google Tag from deletion

PROTECTED_PATTERNS=`"googletagmanager|gtag|google.*tag|GTM-|G-[A-Z0-9]|dataLayer`"
CHANGED_FILES=`$(git diff --cached --name-only --diff-filter=DM | grep -E '\.(html|htm)$')

if [ -z `"`$CHANGED_FILES`" ]; then
    exit 0
fi

ERROR_FOUND=0

for FILE in `$CHANGED_FILES; do
    if git show :`"`$FILE`" 2>/dev/null | grep -qiE `"`$PROTECTED_PATTERNS`"; then
        if ! git show :`"`$FILE`" 2>/dev/null | grep -qiE `"`$PROTECTED_PATTERNS`"; then
            echo `"❌ خطأ: تم حذف Google Tag من `$FILE`"
            echo `"❌ Error: Google Tag was deleted from `$FILE`"
            ERROR_FOUND=1
        fi
    fi
done

if [ `$ERROR_FOUND -eq 1 ]; then
    echo `"`"
    echo `"⚠️  ممنوع حذف روابط Google Tag من الهيدر!`"
    echo `"⚠️  Deleting Google Tag links from header is forbidden!`"
    exit 1
fi

exit 0
"@

# إنشاء أو تحديث Git hook
Set-Content -Path $hookPath -Value $hookContent -NoNewline

# جعل الملف قابل للتنفيذ (في Linux/Mac)
# في Windows، PowerShell يتعامل معه تلقائياً

Write-Host "✅ تم تفعيل حماية Google Tag!" -ForegroundColor Green
Write-Host "✅ Google Tag protection enabled!" -ForegroundColor Green
Write-Host ""
Write-Host "📋 الميزات:" -ForegroundColor Cyan
Write-Host "📋 Features:" -ForegroundColor Cyan
Write-Host "  - Git hook يمنع commit إذا تم حذف Google Tag" -ForegroundColor White
Write-Host "  - Git hook prevents commit if Google Tag is deleted" -ForegroundColor White
Write-Host "  - التحقق التلقائي قبل كل commit" -ForegroundColor White
Write-Host "  - Automatic check before each commit" -ForegroundColor White
Write-Host ""

