# HEARTBEAT.md — Lightweight Monitor

You wake up every 30 minutes. You are NOT the article dispatcher anymore — each site has its own independent cron. You handle P0 checks and lightweight maintenance only.

---

## Step 1: Priority Checks (P0)

1. **Calendar** — any events in the next 2 hours? If so, notify.
2. **Active issues** — check if any article crons are stuck (status.json phase unchanged for 6+ hours)

If something needs Ray's attention → notify. Otherwise, move on.

---

## Step 2: Lightweight Maintenance (rotate, 1 per cycle)

Check `memory/heartbeat-state.json` for last rotation index. Pick the next one:

1. **memory_hygiene** — review recent `memory/YYYY-MM-DD.md` files, distill to MEMORY.md
2. **repo_health** — run `scripts/validate.sh` on one site, fix broken links/images
3. **email_check** — check Gmail for anything urgent
4. **weather** — check weather if Ray might be going out

Update rotation index in heartbeat-state.json.

---

## Step 3: Exit

If nothing needs attention → `HEARTBEAT_OK`
If you notified Ray about something → done

---

## Rules
- Do NOT dispatch article work — that's handled by independent crons now
- Do NOT spawn subagents — keep it lightweight
- Do NOT notify Ray about routine stuff — only genuinely important things
- Keep each heartbeat cycle fast (< 30 seconds of work)
