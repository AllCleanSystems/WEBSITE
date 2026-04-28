param(
  [string]$ProjectId = "a-c-s-control-center-6m0kfm",
  [string]$BaseUrl = "https://api.flutterflow.io/v2"
)

$ErrorActionPreference = "Continue"

if (-not $env:FLUTTERFLOW_API_TOKEN -or $env:FLUTTERFLOW_API_TOKEN.Trim().Length -lt 20) {
  Write-Host "Missing FLUTTERFLOW_API_TOKEN in current shell." -ForegroundColor Red
  Write-Host 'Set it first: $env:FLUTTERFLOW_API_TOKEN = "<token>"' -ForegroundColor Yellow
  exit 1
}

$token = $env:FLUTTERFLOW_API_TOKEN.Trim()
$headers = @{
  Authorization = "Bearer $token"
  Accept = "application/json"
}

Write-Host ""
Write-Host "FlutterFlow YAML Diagnostic" -ForegroundColor Cyan
Write-Host "BaseUrl:  $BaseUrl"
Write-Host "Project:  $ProjectId"
Write-Host ""

function Test-Call {
  param(
    [string]$Name,
    [string]$Method,
    [string]$Url,
    [hashtable]$Body = $null
  )

  Write-Host "=== $Name ===" -ForegroundColor Yellow
  try {
    if ($Body -ne $null) {
      $json = ($Body | ConvertTo-Json -Depth 10)
      $resp = Invoke-RestMethod -Method $Method -Uri $Url -Headers $headers -Body $json -ContentType "application/json"
    } else {
      $resp = Invoke-RestMethod -Method $Method -Uri $Url -Headers $headers
    }
    Write-Host "OK" -ForegroundColor Green
    if ($resp -and $resp.success -ne $null) {
      Write-Host "success=$($resp.success)"
      Write-Host "reason=$($resp.reason)"
    }
    return $true
  } catch {
    Write-Host "FAIL" -ForegroundColor Red
    if ($_.Exception.Response -ne $null) {
      try {
        $status = [int]$_.Exception.Response.StatusCode
        Write-Host "status=$status"
      } catch {}
      try {
        $body = (New-Object IO.StreamReader($_.Exception.Response.GetResponseStream())).ReadToEnd()
        if ($body) { Write-Host "body=$body" }
      } catch {}
    } else {
      Write-Host $_.Exception.Message
    }
    return $false
  }
}

$null = Test-Call -Name "listProjects" -Method "POST" -Url "$BaseUrl/listProjects" -Body @{ project_type = "ALL"; deserialize_response = $true }
$null = Test-Call -Name "listPartitionedFileNames" -Method "GET" -Url "$BaseUrl/listPartitionedFileNames?projectId=$ProjectId"
$null = Test-Call -Name "projectYamls (all)" -Method "GET" -Url "$BaseUrl/projectYamls?projectId=$ProjectId"
$null = Test-Call -Name "projectYamls (app-state)" -Method "GET" -Url "$BaseUrl/projectYamls?projectId=$ProjectId&fileName=app-state"

Write-Host ""
Write-Host "Diagnostic complete." -ForegroundColor Cyan
