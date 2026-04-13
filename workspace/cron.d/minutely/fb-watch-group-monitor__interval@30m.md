---
id: fb-watch-group-monitor
enabled: true
mode: task
schedule:
  kind: interval
  timezone: UTC
  at: 2026-04-14T00:00:00Z
  every: 30m
delivery: []
metadata:
  originating_channel_context_json: '{"originating_channel":"main","chat_kind":"direct","event_kind":"message","require_mention":false}'
---
# Facebook Watch Group Monitor

Scrape 3 Facebook watch groups via HomHub curl and check for target watches + build price database.

## Config Files
- `config/facebook-cookies.txt` — Facebook session cookies (single line)
- `config/watch-groups.json` — Group URLs + target watch definitions (refs, keywords)
- `config/watch_parser.py` — Python parser for extracting structured listings from HTML
- `research/watch-price-db.json` — Accumulated price database

## Steps

1. **Read cookies** from `config/facebook-cookies.txt`
2. **For each group** in `config/watch-groups.json`, use HomHub node (`homehub-a53bc7`) `system.run` to curl the group URL with cookies and full browser headers (user-agent, accept, sec-ch-ua, etc.)
3. **Check for auth failure**: If response is < 5KB OR contains "Sorry, something went wrong" OR contains "You must log in":
   - **IMMEDIATELY notify Ray on Telegram** (chat_id: 8781372712) AND main chat: "⚠️ Facebook cookies expired — watch group monitoring is down. Paste fresh cookies."
   - Stop processing, do not silently continue
4. **Parse listings** from HTML using `config/watch_parser.py` (run via exec). Extract: brand, model, reference, price, condition, contents, location, seller, post URL, sold status
5. **Check against target watchlist** in `config/watch-groups.json`. Match on ref numbers (exact substring) and keywords (case-insensitive). If match found:
   - Alert on ALL channels: main chat + Telegram (8781372712) + email (rayche@gmail.com via Resend)
   - Include: watch name, price, condition, seller, group name, post URL
6. **Update price database** at `research/watch-price-db.json` — append new listings, skip duplicates (match on post URL), update sold status if changed
7. **Track seen posts** to avoid duplicate alerts — store post IDs in `research/watch-monitor-state.json`

## Alert Format (for target watch matches)
```
🚨 WATCH ALERT: [Watch Name]
Price: $XX,XXX | Condition: [condition]
Seller: [name] | Group: [group name]
Contents: [box/papers/etc]
Link: [post URL]
```

## Failure Notification
If ANY group fails to return data, notify Ray immediately on both main chat AND Telegram. Do not wait for next cycle. The message should be:
"⚠️ FB Watch Monitor: [group name] returned no data. Cookies may be expired. Paste fresh cookies in config/facebook-cookies.txt"
