# iMessage Setup Guide for OpenClaw (2026)

> BlueBubbles is dead. OpenClaw now uses `imsg` — a single CLI binary that talks to Messages.app directly. No server, no tunneling, no webhooks, no Cloudflare. 

## Why This Is Easier Than BlueBubbles

| Old (BlueBubbles) | New (imsg) |
|---|---|
| BB Server app + Firebase + Cloudflare tunnel | One CLI binary (`brew install imsg`) |
| REST API + webhooks + port forwarding | JSON-RPC over stdin/stdout |
| Passwords, proxy services, helper apps | Nothing extra |
| Mac + server running 24/7 | Just Mac with Messages.app signed in |

## Step 1: Install imsg

On the Mac that runs Messages.app:

```bash
brew install steipete/tap/imsg
imsg --version
```

## Step 2: Grant Permissions

1. **Full Disk Access** — System Settings → Privacy & Security → Full Disk Access → add your terminal (or the process that runs OpenClaw)
2. **Automation** — when you first `imsg send`, macOS will prompt to allow automation of Messages.app. Approve it.

## Step 3: Verify imsg Works

```bash
# Can you see chats?
imsg chats --limit 5

# Can you see history?
imsg history --chat-id CHAT_ID --limit 5

# Can you send?
imsg send --chat-id CHAT_ID --text "Test from imsg"
```

If `imsg chats` returns nothing or "authorization denied" → Full Disk Access isn't granted. Fix that first.

## Step 4: Private API (Optional, for Reactions/Edit/Unsend)

```bash
imsg launch        # injects helper into Messages.app
imsg status --json  # should show privateApi: available: true
```

Note: `imsg launch` requires SIP disabled. Basic send/receive works without it.

## Step 5: Configure OpenClaw

In `openclaw.json`:

```json
{
  "channels": {
    "imessage": {
      "enabled": true,
      "dmPolicy": "allowlist",
      "allowFrom": ["+1XXXXXXXXXX"],
      "groupPolicy": "open",
      "groupAllowFrom": ["+1XXXXXXXXXX"],
      "groups": {
        "CHAT_GUID": {
          "requireMention": false
        }
      },
      "actions": {
        "reactions": true,
        "edit": false,
        "unsend": true,
        "reply": true
      }
    }
  }
}
```

**Notice what's NOT there:** no serverUrl, no password, no webhookPath, no proxy config. It just works locally.

## Step 6: Restart and Verify

```bash
# Stop old BlueBubbles config if it exists
# Remove channels.bluebubbles from openclaw.json

openclaw gateway restart

# Verify it's working
openclaw channels status --probe --channel imessage
```

You want `imessage.privateApi.available: true` in the probe output.

## Step 7: Test

Send a DM to the Mac's Apple ID. The agent should respond.

## Troubleshooting

**"unable to open database file"**
→ Grant Full Disk Access to the terminal/Node process running OpenClaw, then restart

**Messages not appearing**
→ Check Messages.app is signed in. Try `imsg watch --chat-id X` to see live events

**Can't send**
→ Automation permission for Messages.app needs to be approved. The macOS prompt appears on first `imsg send`.

**Private API reports false**
→ SIP needs to be disabled for `imsg launch` to work. Basic send/receive still works without it.

**OpenClaw running on a different machine than the Mac**
→ Set `cliPath` to an SSH wrapper:
```json
{
  "channels": {
    "imessage": {
      "cliPath": "ssh",
      "remoteHost": "user@mac-mini-local-ip"
    }
  }
}
```

## Migration from BlueBubbles

If you had `channels.bluebubbles` in your config:
1. Copy behavior keys (dmPolicy, allowFrom, groups, etc.) to channels.imessage
2. Drop transport keys (serverUrl, password, webhookPath)
3. Delete the BlueBubbles server app
4. Restart OpenClaw

The behavior config is the same — only the transport layer changed.

---

Questions? Check [OpenClaw iMessage docs](https://docs.openclaw.ai/channels/imessage) or [imsg GitHub](https://github.com/steipete/imsg).
