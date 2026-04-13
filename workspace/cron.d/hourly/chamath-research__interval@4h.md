---
id: chamath-research
enabled: true
mode: task
schedule:
  kind: interval
  timezone: UTC
  at: 2026-04-14T02:00:00Z
  every: 4h
metadata:
  originating_channel_context_json: '{"originating_channel":"main","chat_kind":"direct","event_kind":"message","require_mention":false}'
---
# Chamath Palihapitiya Research Update

Recurring research on Chamath Palihapitiya. Append new findings to `research/chamath-research.md`.

## Steps

1. **Web search** for recent Chamath Palihapitiya activity:
   - `web_search("Chamath Palihapitiya", since=last 3 days)`
   - `web_search("All-In Podcast latest episode recap")`
   - `web_search("Chamath twitter latest take")`

2. **Scrape X profile** via HomHub browser (node: `homehub-a53bc7`):
   - Use `browser.proxy` navigate to `https://x.com/chamath`
   - Wait for `[data-testid='tweet']` to load
   - Extract tweet text via `evaluate`: `Array.from(document.querySelectorAll('[data-testid="tweetText"]')).map(el => el.textContent)`
   - Also extract timestamps: `Array.from(document.querySelectorAll('time')).map(t => t.getAttribute('datetime'))`
   - NOTE: Without login, X shows "Highlights" not recent tweets. If login session exists, use search `from:chamath` with `f=live` for chronological
   - Close browser tabs after scraping

3. **Compare against existing dossier** at `research/chamath-research.md`. Only add genuinely NEW information. Skip duplicates.

4. **Append new findings** with today's date header to `research/chamath-research.md`. Format:
   ```
   ### [Date] — [Topic Summary]
   **Source:** [where found]
   **Details:** [content]
   **Significance:** HIGH/MEDIUM/LOW + brief explanation
   ```

5. **Notify Ray in main chat ONLY if:**
   - Major investment move or thesis shift
   - Viral take (relates to AI, Meta, tech policy)
   - Breaking news involving Chamath directly
   - Policy position that affects Ray's work at Meta
   Do NOT notify for routine tweets or minor commentary. Signal, not noise.

## Topics to Track
- AI industry commentary (go-to-market, regulation, public sentiment)
- California policy (billionaire tax, business climate)
- Crypto/Bitcoin (quantum threat, DeFi, regulation)
- Trade/tariffs (All-In frequently covers macro/trade)
- All-In Podcast episode recaps (key takes from each episode)
- Social Capital investments/exits
- 8090.ai (his software factory product)
- Political positioning (Trump admin, DOGE, tech policy)
- Meta/Facebook commentary (he's a former VP — any takes on Meta are notable)
