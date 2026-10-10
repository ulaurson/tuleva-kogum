param()
$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Windows.Forms
Add-Type -AssemblyName System.Drawing
[System.Windows.Forms.Application]::EnableVisualStyles()

$taskSecretDirectory = Join-Path $env:LOCALAPPDATA 'TulevaKogum\twilio-katse'
$taskCredentialPath = Join-Path $taskSecretDirectory 'credentials.json'
$taskForm = New-Object System.Windows.Forms.Form
$taskForm.Text = 'Tuleva Kogum - Twilio katse seadistus'
$taskForm.Size = New-Object System.Drawing.Size(570, 380)
$taskForm.StartPosition = 'CenterScreen'
$taskForm.FormBorderStyle = 'FixedDialog'
$taskForm.MaximizeBox = $false
$taskForm.MinimizeBox = $false

$taskIntro = New-Object System.Windows.Forms.Label
$taskIntro.Location = New-Object System.Drawing.Point(20, 15)
$taskIntro.Size = New-Object System.Drawing.Size(520, 85)
$taskIntro.Text = [string]::Join([Environment]::NewLine, @(
    'Sisesta eraldi Twilio Lookup API Key SID ja Secret.'
    'Kasuta Restricted votit ainult Lookup lugemise oigusega.'
    'Andmed salvestatakse selle Windowsi kasutaja DPAPI-kruptimisega.'
    'Salvestamine ei aktiveeri tasulisi paringuid.'
))
$taskForm.Controls.Add($taskIntro)

$taskSidLabel = New-Object System.Windows.Forms.Label
$taskSidLabel.Location = New-Object System.Drawing.Point(20, 105)
$taskSidLabel.Size = New-Object System.Drawing.Size(500, 25)
$taskSidLabel.Text = 'API Key SID (algab SK)'
$taskForm.Controls.Add($taskSidLabel)
$taskSidBox = New-Object System.Windows.Forms.TextBox
$taskSidBox.Location = New-Object System.Drawing.Point(20, 132)
$taskSidBox.Size = New-Object System.Drawing.Size(510, 25)
$taskSidBox.UseSystemPasswordChar = $true
$taskForm.Controls.Add($taskSidBox)

$taskSecretLabel = New-Object System.Windows.Forms.Label
$taskSecretLabel.Location = New-Object System.Drawing.Point(20, 170)
$taskSecretLabel.Size = New-Object System.Drawing.Size(500, 25)
$taskSecretLabel.Text = 'API Key Secret'
$taskForm.Controls.Add($taskSecretLabel)
$taskSecretBox = New-Object System.Windows.Forms.TextBox
$taskSecretBox.Location = New-Object System.Drawing.Point(20, 197)
$taskSecretBox.Size = New-Object System.Drawing.Size(510, 25)
$taskSecretBox.UseSystemPasswordChar = $true
$taskForm.Controls.Add($taskSecretBox)

$taskResult = New-Object System.Windows.Forms.Label
$taskResult.Location = New-Object System.Drawing.Point(20, 238)
$taskResult.Size = New-Object System.Drawing.Size(510, 45)
$taskForm.Controls.Add($taskResult)

$taskSaveButton = New-Object System.Windows.Forms.Button
$taskSaveButton.Location = New-Object System.Drawing.Point(20, 290)
$taskSaveButton.Size = New-Object System.Drawing.Size(230, 32)
$taskSaveButton.Text = 'Salvesta kohalikult'
$taskSaveButton.Add_Click({
    if ($taskSidBox.Text -notmatch '^SK[a-fA-F0-9]{32}$' -or $taskSecretBox.Text.Length -lt 16) {
        $taskResult.Text = 'Kontrolli API Key SID ja Secret valju. Saladust vestlusse ei saadeta.'
        return
    }
    try {
        [System.IO.Directory]::CreateDirectory($taskSecretDirectory) | Out-Null
        $taskProtectedSid = ConvertFrom-SecureString (ConvertTo-SecureString $taskSidBox.Text -AsPlainText -Force)
        $taskProtectedSecret = ConvertFrom-SecureString (ConvertTo-SecureString $taskSecretBox.Text -AsPlainText -Force)
        $taskCredentialData = @{ api_key_sid = $taskProtectedSid; api_key_secret = $taskProtectedSecret; protected_by = 'Windows-DPAPI-CurrentUser' } | ConvertTo-Json
        $taskTemporaryPath = $taskCredentialPath + '.new'
        [System.IO.File]::WriteAllText($taskTemporaryPath, $taskCredentialData, [System.Text.UTF8Encoding]::new($false))
        Move-Item -LiteralPath $taskTemporaryPath -Destination $taskCredentialPath -Force
        $taskSidBox.Clear()
        $taskSecretBox.Clear()
        $taskForm.DialogResult = [System.Windows.Forms.DialogResult]::OK
        $taskForm.Close()
    } catch {
        $taskResult.Text = 'Salvestamine ebaonnestus. Kontrolli kohaliku kausta kirjutamisoigust.'
    }
})
$taskForm.Controls.Add($taskSaveButton)
$taskCancelButton = New-Object System.Windows.Forms.Button
$taskCancelButton.Location = New-Object System.Drawing.Point(270, 290)
$taskCancelButton.Size = New-Object System.Drawing.Size(150, 32)
$taskCancelButton.Text = 'Loobu'
$taskCancelButton.DialogResult = [System.Windows.Forms.DialogResult]::Cancel
$taskForm.Controls.Add($taskCancelButton)
$taskForm.AcceptButton = $taskSaveButton
$taskForm.CancelButton = $taskCancelButton

try {
    $taskDialogResult = $taskForm.ShowDialog()
    if ($taskDialogResult -eq [System.Windows.Forms.DialogResult]::OK) {
        Write-Output 'Twilio katsevoti salvestatud kohalikult kruptituna. Paringuid ei tehtud.'
    } else {
        Write-Output 'Seadistamine katkestati. Paringuid ei tehtud.'
    }
} finally {
    $taskSidBox.Clear()
    $taskSecretBox.Clear()
    $taskForm.Dispose()
}
