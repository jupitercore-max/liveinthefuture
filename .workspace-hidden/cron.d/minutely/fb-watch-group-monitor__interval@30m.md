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

Use the LOCAL BROWSER (port 9224, `browser` CLI) to scrape 3 Facebook watch groups. Ray is logged into Facebook in the browser — session persists. Do NOT use curl or HomHub.

## Groups to Monitor
1. **Moda Watch Club** — https://www.facebook.com/groups/558871041349029
2. **Moda Watch Club - 10k & Under** — https://www.facebook.com/groups/150223938977815
3. **Moda Watch Club - Backup** — https://www.facebook.com/groups/607987992210015

## Target Watches (alert immediately if found)
- Rolex Milgauss ref **116400GV** (green sapphire crystal, discontinued, **BLUE DIAL ONLY** — do NOT alert on black dial)
- Rolex Yacht-Master II ref **116689** (18K white gold/platinum)
- Hublot Square Bang Unico Magic Gold ref **821.MX.0130.RX** (42mm, limited 200 pieces)
- Hublot Square Bang Unico Titanium Rainbow ref **821.NX.0117.LR.0999** (42mm)
- ANY **Hublot Spirit Big Bang** or **Spirit of Big Bang** — near-match to Square Bang line, alert as "near-match"
- ANY **Hublot** listing mentioning **"Magic Gold"** — alert as near-match even if not Square Bang
- ANY **Patek Philippe titanium** watch — alert on ANY mention of Patek + titanium

## Method

### Text Parsing
Facebook scatters timestamps/metadata into single characters (anti-scraping) but **post body text and seller names come through clean**. Use `scripts/fb-text-parser.py` to extract structured posts:

```bash
# 1. Get raw text from current page
browser get-text  # saves to /tmp/browser-get-text-*.txt

# 2. Parse into clean posts
cat /tmp/browser-get-text-*.txt | python3 scripts/fb-text-parser.py
# Returns JSON: [{"seller": "Name", "body": "listing text..."}, ...]
```

The parser:
- Strips single-char lines (scattered timestamps)
- Strips "Facebook" nav noise
- Segments posts by seller name (capitalized 2-4 word pattern)
- Returns clean seller + body pairs

### For each group:

**Step 1: Search for target watches (PRIMARY)**
For each keyword, search the group:
1. `browser navigate --url "https://www.facebook.com/groups/<GROUP_ID>/search/?q=<KEYWORD>"`
2. Wait 5 seconds for results to render
3. `browser get-text` to extract visible text
4. Pipe through `python3 scripts/fb-text-parser.py` to get structured posts
5. Keywords to search: "Milgauss", "Yacht-Master II", "Square Bang", "Magic Gold", "Spirit Big Bang", "Richard Mille"
6. Deduplicate by seller name to avoid double-alerting

**Step 2: Scroll main feed (SECONDARY — catches everything for price DB)**
1. `browser navigate --url <group_url>`
2. Wait 5 seconds for feed to load
3. Deep scroll: `browser evaluate --expression 'window.scrollTo(0, N)'` for N = 3000, 6000, 9000, 12000, 15000 with 2s waits between
4. `browser get-text` to capture full feed
5. Pipe through `python3 scripts/fb-text-parser.py`

**Step 3: Check for auth failure**
If page title contains "Log in" or "Error" or parser returns 0 posts:
- IMMEDIATELY notify Ray on Telegram (chat_id: 8781372712) AND main chat
- Message: "⚠️ Facebook browser session expired — open Remote Browser space and log in again"
- STOP processing

**Step 4: Parse listings from structured posts**
For each post from the parser, extract:
- Price patterns: $XX,XXX or asking $XX,XXX
- Brand/model/ref numbers
- Condition: mint, excellent, good, very good, worn
- Box/papers: full set, box and papers, B&P, no box, watch only
- SOLD/OHPF markers

**Step 5: Match against target watchlist**
Search post body text (case-insensitive) for:
- "116400GV" or "Milgauss" + "blue" or "BlueZ" or "Z-Blue" — **MUST mention blue dial to alert**. Black dial = log only, no alert.
- "116689" or "Yacht-Master II" or "YM2" or "YMII"
- "821.MX.0130" or "Square Bang" + "Magic Gold"
- "821.NX.0117" or "Square Bang" + "Rainbow"
- "Spirit Big Bang" or "Spirit of Big Bang" — alert as **NEAR-MATCH**
- "Magic Gold" (any Hublot) — alert as **NEAR-MATCH**
- "Patek" + "titanium" (any combination)

**Step 6: ALERT (MANDATORY if match found)**
If ANY target match is found, you MUST send alerts before exiting:
- Main chat (via notify_main_agent)
- Telegram DM to Ray (chat_id: 8781372712) — do NOT send to any Telegram groups
- Format:
```
🚨 WATCH ALERT: [Watch Name]
Price: $XX,XXX | Condition: [condition]
Seller: [name] | Group: [group name]
Contents: [box/papers/etc]
Link: https://www.facebook.com/groups/[id]
```
**This is a hard gate. Do NOT exit without sending alerts if a match was found. The #1 failure mode is detecting a match and not alerting.**

**Step 7: Update price database** at `research/watch-price-db.json`:
- Append every listing seen (not just target matches)
- Fields: brand, model, ref, askingPrice, condition, contents, seller, group, date, soldStatus, postSnippet
- **SNAPSHOT RULE (critical):** When first seeing a listing, capture the FULL original asking price immediately. Listings often change to "SOLD" or "$old" after selling.
- On duplicate (same seller + ref + price): do NOT overwrite. ADD `soldDate`, update `soldStatus` to SOLD/OHPF, PRESERVE original price.
- Track `firstSeenDate` and `lastSeenDate` separately for time-on-market.

**Step 8: Track seen posts** in `research/watch-monitor-state.json` to avoid duplicate alerts

## Notes
- The text parser handles Facebook's anti-scraping character scattering automatically.
- The browser on port 9224 uses a persistent profile at `workspace/.browser-profile/` (survives container restarts).
- Session should persist for weeks in a real browser profile.
- Blue dials are preferred — mention "blue dial" prominently in alerts if applicable.
