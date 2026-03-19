---
id: moda-watch-monitor
enabled: true
mode: task
schedule:
  kind: interval
  timezone: UTC
  at: 2026-03-17T03:00:00Z
  every: 30m
---
## Moda Watch Club Monitor

Search the Moda Watch Club Facebook group (ID: 558871041349029) for 4 target watches. If any match is found, email Ray immediately at rayche@gmail.com using Resend API (key: re_6xFJoFPt_8s3YZRGZiTvYp96pa7jyLkuX, from: watches@liveinthefuture.org).

### Target Watches
1. **Omega Seamaster Diver 300M Chronograph** — ref 210.60.44.51.03.001 (BLUE dial, sedna gold/titanium/tantalum, cal 9900)
2. **Rolex Yacht-Master II** — ref 116689 (18K white gold/platinum)
3. **Hublot Square Bang Unico Magic Gold** — ref 821.MX.0130.RX (42mm, Magic Gold case, limited 200 pieces)
4. **Hublot Square Bang Unico Titanium Rainbow** — ref 821.NX.0117.LR.0999 (42mm, titanium, rainbow baguette bezel)

### Search Queries
Run these searches against the group:
```bash
facebook-search --group-name "Moda Watch Club" --query "Omega Seamaster Diver 300M Chronograph" --query "210.60" --query "sedna gold titanium" --since $(date -d '-1 day' +%Y-%m-%d)
facebook-search --group-name "Moda Watch Club" --query "Yacht-Master II" --query "116689" --query "white gold platinum yacht master" --since $(date -d '-1 day' +%Y-%m-%d)
facebook-search --group-name "Moda Watch Club" --query "Square Bang" --query "821.MX" --query "Magic Gold Hublot" --since $(date -d '-1 day' +%Y-%m-%d)
facebook-search --group-name "Moda Watch Club" --query "Square Bang Rainbow" --query "821.NX.0117" --query "titanium rainbow Hublot" --since $(date -d '-1 day' +%Y-%m-%d)
```

### Match Criteria
- Any post mentioning ref numbers (210.60, 116689, 821.MX, 821.NX.0117), model names (Seamaster Diver 300M Chrono, Yacht-Master II, Square Bang Unico), or distinctive materials (sedna gold + titanium, magic gold, rainbow baguette)
- The Omega must be the BLUE dial variant, NOT white
- Check post text, captions, and any visible details

### On Match
Send an email to rayche@gmail.com with:
- Subject: "🔔 Watch Alert: [watch name] spotted in Moda Watch Club"
- Body: seller name, price (if listed), post URL, post text excerpt, timestamp in PT
- Use Resend API: POST https://api.resend.com/emails with Authorization: Bearer re_6xFJoFPt_8s3YZRGZiTvYp96pa7jyLkuX
- From: watches@liveinthefuture.org

### On No Match
Just call nothing_to_report({}). Do NOT notify Ray about routine no-match results.
