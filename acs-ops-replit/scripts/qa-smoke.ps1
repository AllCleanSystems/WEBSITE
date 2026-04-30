$ErrorActionPreference = "Stop"

param(
  [string]$SiteUrl = "https://acsbismarckcom.netlify.app",
  [string]$FunctionPath = "/.netlify/functions/website-chat-handoff",
  [int]$TimeoutSec = 20
)

function Test-Url {
  param(
    [string]$Url,
    [string]$Method = "GET",
    [string]$Body = ""
  )

  try {
    if ($Method -eq "POST") {
      $resp = Invoke-WebRequest -Uri $Url -Method Post -Body $Body -ContentType "application/json" -TimeoutSec $TimeoutSec
    } else {
      $resp = Invoke-WebRequest -Uri $Url -Method Get -TimeoutSec $TimeoutSec
    }
    return @{ Ok = $true; Status = [int]$resp.StatusCode; Body = $resp.Content }
  } catch {
    $status = 0
    $body = ""
    if ($_.Exception.Response) {
      $status = [int]$_.Exception.Response.StatusCode
      try {
        $reader = New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream())
        $body = $reader.ReadToEnd()
        $reader.Dispose()
      } catch {}
    }
    return @{ Ok = $false; Status = $status; Body = $body; Error = $_.Exception.Message }
  }
}

Write-Host "== ACS QA Smoke Test =="
Write-Host ("Site: " + $SiteUrl)
Write-Host ""

$home = Test-Url -Url $SiteUrl
if ($home.Ok -and $home.Status -ge 200 -and $home.Status -lt 400) {
  Write-Host ("[PASS] Home page status " + $home.Status) -ForegroundColor Green
} else {
  Write-Host ("[FAIL] Home page check failed. Status=" + $home.Status) -ForegroundColor Red
  if ($home.Error) { Write-Host $home.Error -ForegroundColor DarkRed }
  exit 1
}

$fnUrl = $SiteUrl.TrimEnd("/") + $FunctionPath
$payload = '{"message":"What areas do you serve?","chatSessionId":"smoke-test","knownIntake":{},"intakeAlreadySubmitted":false,"chatTranscript":""}'
$fn = Test-Url -Url $fnUrl -Method "POST" -Body $payload
if ($fn.Ok -and $fn.Status -ge 200 -and $fn.Status -lt 400) {
  Write-Host ("[PASS] Function status " + $fn.Status) -ForegroundColor Green
} else {
  Write-Host ("[FAIL] Function check failed. Status=" + $fn.Status) -ForegroundColor Red
  if ($fn.Error) { Write-Host $fn.Error -ForegroundColor DarkRed }
  if ($fn.Body) { Write-Host $fn.Body -ForegroundColor DarkYellow }
  exit 1
}

try {
  $json = $fn.Body | ConvertFrom-Json
  if ($json.ok -eq $true -and -not [string]::IsNullOrWhiteSpace([string]$json.reply)) {
    Write-Host "[PASS] Agent returned ok=true with a reply" -ForegroundColor Green
  } else {
    Write-Host "[FAIL] Agent response shape invalid" -ForegroundColor Red
    exit 1
  }
} catch {
  Write-Host "[FAIL] Could not parse agent response JSON" -ForegroundColor Red
  exit 1
}

Write-Host ""
Write-Host "Result: PASS" -ForegroundColor Green
exit 0

