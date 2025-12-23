# سكريبت سريع للاستعادة
# Quick Restore Script

Write-Host ""
Write-Host "╔══════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║   استعادة الملفات المحذوفة          ║" -ForegroundColor Cyan
Write-Host "║   Restore Deleted Files              ║" -ForegroundColor Cyan
Write-Host "╚══════════════════════════════════════╝" -ForegroundColor Cyan
Write-Host ""

# التحقق من وجود Git
if (-not (Test-Path ".git")) {
    Write-Host "❌ Git repository غير موجود!" -ForegroundColor Red
    exit 1
}

# عرض الملفات المحذوفة
Write-Host "📋 الملفات المحذوفة:" -ForegroundColor Yellow
Write-Host "📋 Deleted files:" -ForegroundColor Yellow
Write-Host ""

$deletedFiles = git status --porcelain | Where-Object { $_ -like "D *" -or $_ -like " D*" }

if ([string]::IsNullOrWhiteSpace($deletedFiles)) {
    Write-Host "✅ لا توجد ملفات محذوفة" -ForegroundColor Green
    Write-Host "✅ No deleted files" -ForegroundColor Green
    Write-Host ""
    Write-Host "💡 لاستعادة ملف محدد، استخدم:" -ForegroundColor Cyan
    Write-Host "💡 To restore a specific file, use:" -ForegroundColor Cyan
    Write-Host "   .\restore-deleted-file.ps1 -FilePath 'path/to/file'" -ForegroundColor White
    exit 0
}

# عرض الملفات المحذوفة
$fileList = @()
$deletedFiles | ForEach-Object {
    $file = ($_ -replace '^\s*D\s+', '').Trim()
    if (-not [string]::IsNullOrWhiteSpace($file)) {
        $fileList += $file
        Write-Host "  ❌ $file" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "═══════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""

# خيارات الاستعادة
Write-Host "اختر خيار:" -ForegroundColor Yellow
Write-Host "Choose option:" -ForegroundColor Yellow
Write-Host ""
Write-Host "  1) استعادة جميع الملفات المحذوفة" -ForegroundColor White
Write-Host "  1) Restore all deleted files" -ForegroundColor White
Write-Host ""
Write-Host "  2) استعادة ملف محدد" -ForegroundColor White
Write-Host "  2) Restore specific file" -ForegroundColor White
Write-Host ""
Write-Host "  3) إلغاء" -ForegroundColor White
Write-Host "  3) Cancel" -ForegroundColor White
Write-Host ""

$choice = Read-Host "اختيارك | Your choice"

switch ($choice) {
    "1" {
        Write-Host ""
        Write-Host "🔄 جارٍ استعادة جميع الملفات..." -ForegroundColor Yellow
        Write-Host "🔄 Restoring all files..." -ForegroundColor Yellow
        Write-Host ""
        
        foreach ($file in $fileList) {
            git checkout HEAD -- "$file"
            if ($LASTEXITCODE -eq 0) {
                Write-Host "  ✅ $file" -ForegroundColor Green
            } else {
                Write-Host "  ❌ $file" -ForegroundColor Red
            }
        }
        
        Write-Host ""
        Write-Host "✅ تمت الاستعادة!" -ForegroundColor Green
    }
    "2" {
        Write-Host ""
        Write-Host "الملفات المتاحة:" -ForegroundColor Yellow
        for ($i = 0; $i -lt $fileList.Count; $i++) {
            Write-Host "  $($i+1)) $($fileList[$i])" -ForegroundColor White
        }
        Write-Host ""
        $fileChoice = Read-Host "اختر رقم الملف | Choose file number"
        
        $fileIndex = [int]$fileChoice - 1
        if ($fileIndex -ge 0 -and $fileIndex -lt $fileList.Count) {
            $selectedFile = $fileList[$fileIndex]
            Write-Host ""
            Write-Host "🔄 جارٍ استعادة: $selectedFile" -ForegroundColor Yellow
            git checkout HEAD -- "$selectedFile"
            
            if ($LASTEXITCODE -eq 0) {
                Write-Host "✅ تمت الاستعادة!" -ForegroundColor Green
            } else {
                Write-Host "❌ فشلت الاستعادة" -ForegroundColor Red
            }
        } else {
            Write-Host "❌ اختيار غير صحيح" -ForegroundColor Red
        }
    }
    default {
        Write-Host "تم الإلغاء" -ForegroundColor Yellow
    }
}

Write-Host ""

