# خادم بسيط لتشغيل الموقع
param(
    [int]$port = 8000
)
$root = $PSScriptRoot

Write-Host "Starting server on port $port..." -ForegroundColor Green
Write-Host "Root directory: $root" -ForegroundColor Cyan

# إنشاء HttpListener
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$port/")

try {
    $listener.Start()
    Write-Host "✅ Server is running on http://localhost:$port" -ForegroundColor Green
    Write-Host "Press Ctrl+C to stop" -ForegroundColor Yellow
    Write-Host ""
} catch {
    Write-Host "❌ Error starting server: $_" -ForegroundColor Red
    Write-Host "You may need to run PowerShell as Administrator" -ForegroundColor Yellow
    exit
}

# معالجة الطلبات
while ($listener.IsListening) {
    try {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response
        
        $localPath = $request.Url.LocalPath
        
        # Redirect root to the real page path so relative assets resolve correctly
        if ($localPath -eq "/" -or $localPath -eq "/index.html") {
            $response.StatusCode = 302
            $response.RedirectLocation = "/pages/index/index.html"
            $response.Close()
            continue
        }
        
        # إزالة الشرطة المائلة الأولى
        $filePath = Join-Path $root $localPath.TrimStart('/')
        
        Write-Host "[$($request.HttpMethod)] $localPath" -ForegroundColor Gray
        
        if (Test-Path $filePath -PathType Leaf) {
            $content = [System.IO.File]::ReadAllBytes($filePath)
            $response.ContentLength64 = $content.Length
            
            # تحديد نوع المحتوى
            $ext = [System.IO.Path]::GetExtension($filePath).ToLower()
            switch ($ext) {
                ".html" { $response.ContentType = "text/html; charset=utf-8" }
                ".css" { $response.ContentType = "text/css; charset=utf-8" }
                ".js" { $response.ContentType = "application/javascript; charset=utf-8" }
                ".json" { $response.ContentType = "application/json; charset=utf-8" }
                ".png" { $response.ContentType = "image/png" }
                ".jpg" { $response.ContentType = "image/jpeg" }
                ".jpeg" { $response.ContentType = "image/jpeg" }
                ".svg" { $response.ContentType = "image/svg+xml" }
                ".webp" { $response.ContentType = "image/webp" }
                ".mp4" { $response.ContentType = "video/mp4" }
                ".woff" { $response.ContentType = "font/woff" }
                ".woff2" { $response.ContentType = "font/woff2" }
                ".ttf" { $response.ContentType = "font/ttf" }
                default { $response.ContentType = "application/octet-stream" }
            }
            
            $response.StatusCode = 200
            $response.OutputStream.Write($content, 0, $content.Length)
        } else {
            $response.StatusCode = 404
            $notFound = [System.Text.Encoding]::UTF8.GetBytes("404 - File Not Found: $localPath")
            $response.ContentLength64 = $notFound.Length
            $response.ContentType = "text/plain; charset=utf-8"
            $response.OutputStream.Write($notFound, 0, $notFound.Length)
            Write-Host "  ❌ 404: $localPath" -ForegroundColor Red
        }
        
        $response.Close()
    } catch {
        Write-Host "Error processing request: $_" -ForegroundColor Red
    }
}

$listener.Stop()
