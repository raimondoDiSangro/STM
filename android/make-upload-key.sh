#!/usr/bin/env bash
# Creates your Google Play UPLOAD key (once, ever) and prints what to paste into GitHub secrets.
# Needs Java (keytool). It asks you to type a password: pick a strong one and keep it in a
# password manager. Back up upload-key.jks somewhere safe. Never commit it.
set -euo pipefail
cd "$(dirname "$0")"
if [ -f upload-key.jks ]; then echo "upload-key.jks already exists, not overwriting."; exit 1; fi
keytool -genkeypair -v -keystore upload-key.jks -alias upload -keyalg RSA -keysize 4096 -validity 10000 \
  -dname "CN=SuperTeleMurgia, O=SuperTeleMurgia, C=IT"
echo
echo "Done. Now add these GitHub repository secrets (Settings -> Secrets and variables -> Actions):"
echo "  STM_KEY_ALIAS          upload"
echo "  STM_KEYSTORE_PASSWORD  (the password you just typed)"
echo "  STM_KEY_PASSWORD       (the same password)"
echo "  STM_KEYSTORE_BASE64    the text in upload-key.base64.txt (created now)"
base64 -w0 upload-key.jks > upload-key.base64.txt 2>/dev/null || base64 -i upload-key.jks > upload-key.base64.txt
echo
echo "Then delete upload-key.base64.txt. Keep upload-key.jks backed up."
