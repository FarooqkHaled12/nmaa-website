# سكريبت لبدء خادم محلي لعرض الموقع
# Script to start local server for the website

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "بدء تشغيل الخادم المحلي" -ForegroundColor Cyan
Write-Host "Starting Local Server" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# المنفذ
$port = 8000
$url = "http://localhost:$port/pages/index/index.html"

Write-Host "🌐 جارٍ بدء الخادم على المنفذ $port..." -ForegroundColor Yellow
Write-Host "🌐 Starting server on port $port..." -ForegroundColor Yellow
Write-Host ""

# إنشاء خادم HTTP بسيط باستخدام PowerShell
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$port/")
$listener.Start()

Write-Host "✅ الخادم يعمل الآن!" -ForegroundColor Green
Write-Host "✅ Server is now running!" -ForegroundColor Green
Write-Host ""
Write-Host "🌐 الموقع: http://localhost:$port/pages/index/index.html" -ForegroundColor Cyan
Write-Host "🌐 Website: http://localhost:$port/pages/index/index.html" -ForegroundColor Cyan
Write-Host ""
Write-Host "⏹️  لإيقاف الخادم، اضغط Ctrl+C" -ForegroundColor Yellow
Write-Host "⏹️  To stop server, press Ctrl+C" -ForegroundColor Yellow
Write-Host ""

# فتح المتصفح
Start-Process "http://localhost:$port/pages/index/index.html"

# معالجة الطلبات
while ($listener.IsListening) {
    $context = $listener.GetContext()
    $request = $context.Request
    $response = $context.Response
    
    $localPath = $request.Url.LocalPath
    if ($localPath -eq "/") {
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
}
