# Windows version of make-upload-key.sh. Run in PowerShell from the android folder:
#   powershell -ExecutionPolicy Bypass -File make-upload-key.ps1
# Needs Java (keytool) on PATH, e.g. from Android Studio or https://adoptium.net
if (Test-Path upload-key.jks) { Write-Host "upload-key.jks already exists, not overwriting."; exit 1 }
keytool -genkeypair -v -keystore upload-key.jks -alias upload -keyalg RSA -keysize 4096 -validity 10000 -dname "CN=SuperTeleMurgia, O=SuperTeleMurgia, C=IT"
[Convert]::ToBase64String([IO.File]::ReadAllBytes("$PWD\upload-key.jks")) | Out-File -Encoding ascii upload-key.base64.txt
Write-Host ""
Write-Host "Add these GitHub secrets (Settings > Secrets and variables > Actions):"
Write-Host "  STM_KEY_ALIAS          upload"
Write-Host "  STM_KEYSTORE_PASSWORD  (the password you typed)"
Write-Host "  STM_KEY_PASSWORD       (the same password)"
Write-Host "  STM_KEYSTORE_BASE64    contents of upload-key.base64.txt"
Write-Host "Then delete upload-key.base64.txt and back up upload-key.jks."
