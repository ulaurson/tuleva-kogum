param([int]$Port = 8787)
$ErrorActionPreference = 'Stop'
$taskDataDirectory = Join-Path $env:LOCALAPPDATA 'TulevaKogum\twilio-katse'
$taskCredentialPath = Join-Path $taskDataDirectory 'credentials.json'
$taskOriginalSid = $env:TWILIO_API_KEY_SID
$taskOriginalSecret = $env:TWILIO_API_KEY_SECRET
$taskOriginalStateDirectory = $env:TULEVA_TRIAL_STATE_DIR
$taskOriginalPort = $env:PORT

function Convert-TaskProtectedValueToPlainText([string]$ProtectedValue) {
    $taskSecureValue = ConvertTo-SecureString $ProtectedValue
    $taskBuffer = [Runtime.InteropServices.Marshal]::SecureStringToBSTR($taskSecureValue)
    try { [Runtime.InteropServices.Marshal]::PtrToStringBSTR($taskBuffer) }
    finally { [Runtime.InteropServices.Marshal]::ZeroFreeBSTR($taskBuffer); $taskSecureValue.Dispose() }
}

try {
    if ($Port -lt 1024 -or $Port -gt 65535) { throw 'Vali port vahemikus 1024 kuni 65535.' }
    $taskNodeCommand = Get-Command node -ErrorAction SilentlyContinue
    if (-not $taskNodeCommand) { throw 'Vaja on Node.js 22 voi uuemat.' }
    if (Test-Path -LiteralPath $taskCredentialPath) {
        $taskProtectedConfig = [System.IO.File]::ReadAllText($taskCredentialPath) | ConvertFrom-Json
        if ($taskProtectedConfig.protected_by -ne 'Windows-DPAPI-CurrentUser') { throw 'Tundmatu votmevorming.' }
        $env:TWILIO_API_KEY_SID = Convert-TaskProtectedValueToPlainText $taskProtectedConfig.api_key_sid
        $env:TWILIO_API_KEY_SECRET = Convert-TaskProtectedValueToPlainText $taskProtectedConfig.api_key_secret
    }
    $env:TULEVA_TRIAL_STATE_DIR = $taskDataDirectory
    $env:PORT = [string]$Port
    & $taskNodeCommand.Source (Join-Path $PSScriptRoot 'server.mjs')
    if ($LASTEXITCODE -ne 0) { throw 'Katse server peatus veaga.' }
} catch {
    Write-Error 'Twilio katse kaivitamine ebaonnestus. Kontrolli Node.js versiooni, porti ja kohalikku votmeseadistust; saladusi ei valjastata.'
    exit 1
} finally {
    $env:TWILIO_API_KEY_SID = $taskOriginalSid
    $env:TWILIO_API_KEY_SECRET = $taskOriginalSecret
    $env:TULEVA_TRIAL_STATE_DIR = $taskOriginalStateDirectory
    $env:PORT = $taskOriginalPort
}
