# سكريبت لبدء خادم محلي لعرض الموقع على الشبكة المحلية
# Script to start local server for the website on local network

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "بدء تشغيل الخادم المحلي" -ForegroundColor Cyan
Write-Host "Starting Local Server" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# المنفذ
$port = 8000

# الحصول على عنوان IP المحلي
$ipAddress = (Get-NetIPAddress -AddressFamily IPv4 | Where-Object { $_.IPAddress -like "192.168.*" -or $_.IPAddress -like "10.*" } | Select-Object -First 1).IPAddress

if (-not $ipAddress) {
    $ipAddress = "localhost"
}

$localUrl = "http://localhost:$port/pages/index/index.html"
$networkUrl = "http://$ipAddress:$port/pages/index/index.html"

Write-Host "🌐 جارٍ بدء الخادم على المنفذ $port..." -ForegroundColor Yellow
Write-Host "🌐 Starting server on port $port..." -ForegroundColor Yellow
Write-Host ""
Write-Host "📍 عنوان IP المحلي: $ipAddress" -ForegroundColor Cyan
Write-Host "📍 Local IP Address: $ipAddress" -ForegroundColor Cyan
Write-Host ""

# إنشاء خادم HTTP بسيط باستخدام PowerShell
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://+:$port/")
$listener.Start()

Write-Host "✅ الخادم يعمل الآن!" -ForegroundColor Green
Write-Host "✅ Server is now running!" -ForegroundColor Green
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "🔗 الروابط المتاحة:" -ForegroundColor Yellow
Write-Host "🔗 Available Links:" -ForegroundColor Yellow
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "💻 رابط محلي (على نفس الجهاز):" -ForegroundColor Green
Write-Host "💻 Local Link (same device):" -ForegroundColor Green
Write-Host "   $localUrl" -ForegroundColor White
Write-Host ""
Write-Host "🌐 رابط للشبكة المحلية (للمشاركة):" -ForegroundColor Cyan
Write-Host "🌐 Network Link (for sharing):" -ForegroundColor Cyan
Write-Host "   $networkUrl" -ForegroundColor White
Write-Host ""
Write-Host "📋 انسخ الرابط أعلاه وأرسله للعميل!" -ForegroundColor Yellow
Write-Host "📋 Copy the link above and send it to the client!" -ForegroundColor Yellow
Write-Host ""
Write-Host "⏹️  لإيقاف الخادم، اضغط Ctrl+C" -ForegroundColor Yellow
Write-Host "⏹️  To stop server, press Ctrl+C" -ForegroundColor Yellow
Write-Host ""

# فتح المتصفح
Start-Process $localUrl

# معالجة الطلبات
while ($listener.IsListening) {
    try {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response
        
        $localPath = $request.Url.LocalPath
        if ($localPath -eq "/" -or $localPath -eq "/index.html") {
            $localPath = "/pages/index/index.html"
        }
        
        $filePath = Join-Path $PWD $localPath.TrimStart('/')
        
        if (Test-Path $filePath -PathType Leaf) {
            $content = [System.IO.File]::ReadAllBytes($filePath)
            $response.ContentLength64 = $content.Length
            
            # تحديد نوع المحتوى
            $ext = [System.IO.Path]::GetExtension($filePath)
            switch ($ext) {
                ".html" { $response.ContentType = "text/html; charset=utf-8" }
                ".css" { $response.ContentType = "text/css; charset=utf-8" }
                ".js" { $response.ContentType = "application/javascript; charset=utf-8" }
                ".png" { $response.ContentType = "image/png" }
                ".jpg" { $response.ContentType = "image/jpeg" }
                ".jpeg" { $response.ContentType = "image/jpeg" }
                ".svg" { $response.ContentType = "image/svg+xml" }
                ".webp" { $response.ContentType = "image/webp" }
                default { $response.ContentType = "application/octet-stream" }
            }
            
            $response.StatusCode = 200
            $response.OutputStream.Write($content, 0, $content.Length)
        } else {
            $response.StatusCode = 404
            $notFound = [System.Text.Encoding]::UTF8.GetBytes("404 - File Not Found")
            $response.ContentLength64 = $notFound.Length
            $response.OutputStream.Write($notFound, 0, $notFound.Length)
        }
        
        $response.Close()
    } catch {
        Write-Host "خطأ في معالجة الطلب: $_" -ForegroundColor Red
    }
}


