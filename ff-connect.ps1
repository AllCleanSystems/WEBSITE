param(
  [string]$ProjectId = "a-c-s-control-center-6m0kfm",
  [string]$ScriptPath = "C:\Users\Owner\Music\Acs System\plugins\flutterflow\scripts\flutterflow_api.py"
)

$ErrorActionPreference = "Stop"

if (-not (Test-Path -LiteralPath $ScriptPath)) {
  Write-Host "FAIL: flutterflow_api.py not found at: $ScriptPath" -ForegroundColor Red
  exit 1
}

Write-Host ""
Write-Host "FlutterFlow quick connect" -ForegroundColor Cyan
Write-Host "Project: $ProjectId"
Write-Host ""

if (-not $env:FLUTTERFLOW_API_TOKEN -or $env:FLUTTERFLOW_API_TOKEN.Trim().Length -lt 20) {
  $secure = Read-Host "Paste FlutterFlow API token" -AsSecureString
  $bstr = [Runtime.InteropServices.Marshal]::SecureStringToBSTR($secure)
  try {
    $plain = [Runtime.InteropServices.Marshal]::PtrToStringBSTR($bstr)
  } finally {
    [Runtime.InteropServices.Marshal]::ZeroFreeBSTR($bstr)
  }

  if (-not $plain -or $plain.Trim().Length -lt 20) {
    Write-Host "FAIL: token looks empty/too short." -ForegroundColor Red
    exit 1
  }

  $env:FLUTTERFLOW_API_TOKEN = $plain.Trim()
}

Write-Host ""
Write-Host "1) Testing list-projects..." -ForegroundColor Yellow
$projectsJson = python $ScriptPath list-projects 2>&1
if ($LASTEXITCODE -ne 0) {
  Write-Host "FAIL list-projects" -ForegroundColor Red
  $projectsJson | Out-Host
  exit 1
}
Write-Host "OK list-projects" -ForegroundColor Green

Write-Host ""
Write-Host "2) Testing list-files..." -ForegroundColor Yellow
$filesJson = python $ScriptPath list-files --project-id $ProjectId 2>&1
if ($LASTEXITCODE -ne 0) {
  Write-Host "FAIL list-files" -ForegroundColor Red
  $filesJson | Out-Host
  exit 1
}
Write-Host "OK list-files" -ForegroundColor Green

Write-Host ""
Write-Host "Connected. You can now run commands with me." -ForegroundColor Green
Write-Host "Example:"
Write-Host "python `"$ScriptPath`" list-files --project-id `"$ProjectId`""

