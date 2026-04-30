$ErrorActionPreference = "Stop"

param(
  [string]$SiteUrl = "https://acsbismarckcom.netlify.app"
)

Write-Host "== ACS Fast Release Runner ==" -ForegroundColor Cyan
Write-Host ""

Write-Host "[1/3] Environment check..."
& powershell -ExecutionPolicy Bypass -File "$PSScriptRoot\env-check.ps1"
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }

Write-Host ""
Write-Host "[2/3] Local build check..."
Push-Location (Resolve-Path "$PSScriptRoot\..")
try {
  npm run build
  if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
} finally {
  Pop-Location
}

Write-Host ""
Write-Host "[3/3] Remote smoke check..."
& powershell -ExecutionPolicy Bypass -File "$PSScriptRoot\qa-smoke.ps1" -SiteUrl $SiteUrl
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }

Write-Host ""
Write-Host "Fast release checks completed." -ForegroundColor Green
Write-Host "If all checks passed, trigger Netlify deploy now." -ForegroundColor Green
exit 0

