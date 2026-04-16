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

For each group:

### A. Search-First Strategy (PRIMARY — catches target watches)
For each watchlist keyword, search the group directly:
1. `browser navigate --url "https://www.facebook.com/groups/<GROUP_ID>/search/?q=<KEYWORD>"`
2. Wait 3 seconds for JS rendering
3. Extract all post text from search results
4. Keywords to search: "Milgauss", "116400GV", "Yacht-Master II", "116689", "Square Bang", "Magic Gold", "Spirit Big Bang", "Richard Mille", "Patek titanium", "Rainbow"
5. Deduplicate by seller+model to avoid double-alerting

### B. Feed Scroll (SECONDARY — catches everything else for price DB)
1. `browser navigate --url <group_url>`
2. **Deep scroll**: Execute 5 scroll passes (scroll 3000px, wait 2s, repeat) to load ~50+ posts
3. `browser evaluate --expression '<JS to extract posts>'` — use this JS pattern:
```js
(() => {
    // Deep scroll to load more posts (5 passes)
    const scrollAndWait = (px) => { window.scrollTo(0, px); };
    scrollAndWait(3000);
    scrollAndWait(6000);
    scrollAndWait(9000);
    scrollAndWait(12000);
    scrollAndWait(15000);
    // Get all text from feed area
    const feed = document.querySelector('[role="feed"]') || document.body;
    const posts = feed.querySelectorAll('[role="article"]');
    const results = [];
    posts.forEach(p => {
        results.push(p.innerText.substring(0, 1500));
    });
    // Also get full feed text as backup
    const feedText = feed.innerText.substring(0, 40000);
    return JSON.stringify({posts: results, feedText: feedText});
})()
```
4. **Check for auth failure**: If page title contains "Log in" or "Error" or feed text is empty:
   - IMMEDIATELY notify Ray on Telegram (chat_id: 8781372712) AND main chat
   - Message: "⚠️ Facebook browser session expired — open Remote Browser space and log in again"
   - STOP processing

5. **Parse listings** from extracted text. Look for:
   - Price patterns: $XX,XXX or asking $XX,XXX
   - Brand/model/ref numbers
   - Condition: mint, excellent, good, very good, worn
   - Box/papers: full set, box and papers, B&P, no box, watch only
   - SOLD/OHPF markers
   - Seller name (from post author)

6. **Match against target watchlist**: Search for ref numbers (exact substring, case-insensitive) and brand+model keywords:
   - "116400GV" or "Milgauss" + "green" — **MUST mention "blue" dial to alert**. If listing says "black dial" or does not specify blue, do NOT alert. Still log to price DB but skip the alert.
   - "116689" or "Yacht-Master II" or "YM2" or "YMII"
   - "821.MX.0130" or "Square Bang" + "Magic Gold"
   - "821.NX.0117" or "Square Bang" + "Rainbow"
   - "Spirit Big Bang" or "Spirit of Big Bang" — alert as **NEAR-MATCH** (related to Square Bang line)
   - "Magic Gold" (any Hublot) — alert as **NEAR-MATCH** if not already an exact Square Bang match
   - "Patek" + "titanium" (any combination)

7. **If match found**, alert on main chat + Telegram DM only (NO groups):
   - Main chat
   - Telegram DM to Ray (chat_id: 8781372712) — do NOT send to any Telegram groups
   - Format:
```
🚨 WATCH ALERT: [Watch Name]
Price: $XX,XXX | Condition: [condition]
Seller: [name] | Group: [group name]
Contents: [box/papers/etc]
Link: https://www.facebook.com/groups/[id]
```

8. **Update price database** at `research/watch-price-db.json`:
   - Append every listing seen (not just target matches)
   - Fields: brand, model, ref, askingPrice, condition, contents, seller, group, date, soldStatus, postSnippet
   - **SNAPSHOT RULE (critical):** When first seeing a listing, capture the FULL original asking price and all details immediately. Listings often change to "SOLD" or "$old" after selling, losing the original price data.
   - On duplicate match (same seller + ref + price): do NOT overwrite the original record. Instead, ADD a `soldDate` and update `soldStatus` to SOLD/OHPF while PRESERVING the original `askingPrice`, `condition`, `contents`, and `postSnippet`.
   - If a listing's price text is now "$old", "SOLD", or "OHPF" but we already have it with a real price, keep the original price and just mark it sold.
   - If we see a listing for the first time and it already says SOLD with no price, still record it but mark `askingPrice` as null and `soldStatus` as "SOLD" — we missed the window.
   - Track `firstSeenDate` and `lastSeenDate` separately from `date` (post date) to understand time-on-market.

9. **Track seen posts** in `research/watch-monitor-state.json` to avoid duplicate alerts

## Notes
- Facebook breaks some text into individual characters (anti-scraping). Post body text usually comes through intact.
- The browser on port 9224 is the same one Ray logged into via the Remote Browser space.
- Session should persist for weeks in a real browser profile vs hours with curl cookies.
- Blue dials are preferred — mention "blue dial" prominently in alerts if applicable.
