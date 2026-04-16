#!/usr/bin/env bash
# phone-sms.sh — Read/send SMS via ADB on Mac Mini's attached Pixel 9 Pro Fold
# Usage:
#   ./phone-sms.sh read [count]         — Read latest SMS (default 5)
#   ./phone-sms.sh read-code            — Read latest SMS that contains a verification code
#   ./phone-sms.sh send <number> <msg>  — Compose SMS (opens Messages app, needs manual send)
#   ./phone-sms.sh unlock               — Unlock the phone screen
#   ./phone-sms.sh status               — Check phone connection status

SSH_CMD="ssh -F ~/workspace/.ssh/config macmini"
ADB_PATH="~/platform-tools-extracted/platform-tools/adb"
UNLOCK_CODE="314159"

case "${1:-status}" in
  read)
    COUNT="${2:-5}"
    $SSH_CMD "$ADB_PATH shell 'content query --uri content://sms/inbox'" 2>/dev/null | \
      head -n "$COUNT" | \
      while IFS= read -r line; do
        addr=$(echo "$line" | grep -oP 'address=\K[^,]+')
        body=$(echo "$line" | grep -oP 'body=\K[^,]+(?=, service_center)')
        date_ms=$(echo "$line" | grep -oP 'date=\K[0-9]+')
        if [ -n "$date_ms" ]; then
          date_sec=$((date_ms / 1000))
          date_str=$(date -d "@$date_sec" 2>/dev/null || date -r "$date_sec" 2>/dev/null || echo "$date_ms")
        fi
        echo "[$date_str] From: $addr"
        echo "  $body"
        echo ""
      done
    ;;

  read-code)
    # Read latest SMS and extract verification/OTP codes
    $SSH_CMD "$ADB_PATH shell 'content query --uri content://sms/inbox'" 2>/dev/null | \
      head -n 10 | \
      while IFS= read -r line; do
        body=$(echo "$line" | grep -oP 'body=\K[^,]+(?=, service_center)')
        # Look for common verification code patterns
        code=$(echo "$body" | grep -oP '(?:code|Code|CODE|verification|pin|PIN)[:\s]*\K[0-9]{4,8}' | head -1)
        if [ -z "$code" ]; then
          code=$(echo "$body" | grep -oP '(?:is |: )\K[0-9]{4,8}' | head -1)
        fi
        if [ -n "$code" ]; then
          addr=$(echo "$line" | grep -oP 'address=\K[^,]+')
          echo "CODE: $code (from $addr)"
          echo "FULL: $body"
          exit 0
        fi
      done
    ;;

  send)
    NUMBER="$2"
    MESSAGE="$3"
    if [ -z "$NUMBER" ] || [ -z "$MESSAGE" ]; then
      echo "Usage: $0 send <number> <message>"
      exit 1
    fi
    # Wake + unlock first
    $SSH_CMD "$ADB_PATH shell input keyevent 26" 2>/dev/null
    sleep 1
    $SSH_CMD "$ADB_PATH shell input swipe 500 1500 500 500" 2>/dev/null
    sleep 0.5
    $SSH_CMD "$ADB_PATH shell input text $UNLOCK_CODE" 2>/dev/null
    $SSH_CMD "$ADB_PATH shell input keyevent 66" 2>/dev/null
    sleep 1
    # Open Messages with pre-filled SMS
    $SSH_CMD "$ADB_PATH shell 'am start -a android.intent.action.SENDTO -d sms:$NUMBER --es sms_body \"$MESSAGE\"'" 2>/dev/null
    echo "SMS composed to $NUMBER — Messages app opened (requires manual send on screen)"
    ;;

  unlock)
    $SSH_CMD "$ADB_PATH shell input keyevent 26" 2>/dev/null
    sleep 1
    $SSH_CMD "$ADB_PATH shell input swipe 500 1500 500 500" 2>/dev/null
    sleep 0.5
    $SSH_CMD "$ADB_PATH shell input text $UNLOCK_CODE" 2>/dev/null
    $SSH_CMD "$ADB_PATH shell input keyevent 66" 2>/dev/null
    echo "Phone unlocked"
    ;;

  status)
    echo "=== Device ==="
    $SSH_CMD "$ADB_PATH devices -l" 2>/dev/null
    echo ""
    echo "=== Screen State ==="
    $SSH_CMD "$ADB_PATH shell dumpsys power 2>/dev/null | grep mWakefulness" 2>/dev/null
    echo ""
    echo "=== Network ==="
    $SSH_CMD "$ADB_PATH shell getprop gsm.sim.operator.alpha" 2>/dev/null
    ;;

  *)
    echo "Usage: $0 {read|read-code|send|unlock|status} [args]"
    exit 1
    ;;
esac
