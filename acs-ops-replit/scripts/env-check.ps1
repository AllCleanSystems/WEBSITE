$ErrorActionPreference = "Stop"

$required = @(
  "OPENAI_API_KEY",
  "OPENAI_MODEL",
  "OPENPHONE_API_KEY",
  "ZOHO_REFRESH_TOKEN",
  "ZOHO_CLIENT_ID",
  "ZOHO_CLIENT_SECRET",
  "ZOHO_CREATOR_OWNER",
  "ZOHO_CREATOR_APP_LINK"
)

$optional = @(
  "ZOHO_FORM_LINK_NAME",
  "ZOHO_ACCOUNT_OWNER_NAME",
  "ZOHO_APP_LINK_NAME",
  "WEBSITE_AGENT_INSTRUCTIONS"
)

Write-Host "== ACS Environment Check =="
Write-Host ""

$missingRequired = @()
foreach ($k in $required) {
  $v = [Environment]::GetEnvironmentVariable($k)
  if ([string]::IsNullOrWhiteSpace($v)) {
    $missingRequired += $k
    Write-Host ("[MISSING] " + $k) -ForegroundColor Red
  } else {
    Write-Host ("[OK]      " + $k) -ForegroundColor Green
  }
}

Write-Host ""
Write-Host "Optional keys:"
foreach ($k in $optional) {
  $v = [Environment]::GetEnvironmentVariable($k)
  if ([string]::IsNullOrWhiteSpace($v)) {
    Write-Host ("[OPTIONAL-MISSING] " + $k) -ForegroundColor Yellow
  } else {
    Write-Host ("[OPTIONAL-OK]      " + $k) -ForegroundColor DarkGreen
  }
}

Write-Host ""
if ($missingRequired.Count -gt 0) {
  Write-Host "Result: FAIL (missing required keys)" -ForegroundColor Red
  exit 1
}

Write-Host "Result: PASS" -ForegroundColor Green
exit 0

