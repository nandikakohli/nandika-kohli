$ErrorActionPreference = "Stop"

$RootDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$WebsiteDir = Join-Path $RootDir "personal-website"
$Url = "http://127.0.0.1:5173/"

function Test-LocalPort {
    param([int]$Port)

    $Client = New-Object System.Net.Sockets.TcpClient
    try {
        $Connect = $Client.BeginConnect("127.0.0.1", $Port, $null, $null)
        if (-not $Connect.AsyncWaitHandle.WaitOne(200, $false)) {
            return $false
        }

        $Client.EndConnect($Connect)
        return $true
    }
    catch {
        return $false
    }
    finally {
        $Client.Close()
    }
}

if (Test-LocalPort -Port 5173) {
    Write-Host "Local website is already running at $Url"
    Start-Process $Url
    exit 0
}

if (-not (Test-Path (Join-Path $WebsiteDir "package.json"))) {
    throw "Could not find personal-website/package.json from $RootDir"
}

Write-Host "Starting local website..."
Write-Host "Opening $Url when the dev server is ready."
Write-Host ""

$OpenWhenReady = @"
`$Url = "$Url"
for (`$i = 0; `$i -lt 60; `$i++) {
    try {
        `$Client = New-Object System.Net.Sockets.TcpClient
        `$Connect = `$Client.BeginConnect("127.0.0.1", 5173, `$null, `$null)
        if (`$Connect.AsyncWaitHandle.WaitOne(500, `$false)) {
            `$Client.EndConnect(`$Connect)
            `$Client.Close()
            Start-Process `$Url
            exit 0
        }
        `$Client.Close()
    } catch {}
    Start-Sleep -Seconds 1
}
"@

Start-Process powershell -WindowStyle Hidden -ArgumentList "-NoProfile", "-Command", $OpenWhenReady
Set-Location $WebsiteDir
npm run dev -- --host 127.0.0.1
