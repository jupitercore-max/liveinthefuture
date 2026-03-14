---
id: crashreport-improve
enabled: true
mode: task
schedule:
  kind: interval
  timezone: UTC
  at: 2026-03-14T00:00:00Z
  every: 2h
execution:
  target: isolated
---
# Crash Report (Vehicle Safety) — Quality-First Improvement

## Setup
```bash
git config --global credential.helper store
echo "https://rayhe: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@github.com" > ~/.git-credentials
chmod 600 ~/.git-credentials
git config --global user.name "Hatch"
git config --global user.email "hatch@rayhe.github.io"
cd ~/workspace/vehicle-safety && git pull origin main
```

## ⚠️ ONE ARTICLE PER DAY — HARD LIMIT ⚠️

Before doing ANYTHING, run:
```bash
cd ~/workspace/vehicle-safety
TODAY=$(date -u +%Y-%m-%d)
PUBLISHED_TODAY=$(git log --since="$TODAY" --oneline --grep="Publish" | wc -l)
echo "Articles published today: $PUBLISHED_TODAY"
```

**If PUBLISHED_TODAY >= 1: DO NOT PUBLISH.** You may only:
- Improve existing drafts in `drafts/`
- Run critique rounds on drafts
- Fix validation issues (images, meta tags, missing hero images)
- Site improvements (CSS, nav, SEO)

**If PUBLISHED_TODAY == 0: You may publish ONE article** if it scores 8.5+/10 across all 6 critics.

## Read First
- `scripts/validate.sh` — must pass before any push
- Check existing articles to avoid topic duplication

## 6-Critic System (required for publishing)
Every article must pass all 6 critics at 8.5+ before publishing:
1. **General Editor** — structure, flow, contribution
2. **Voice Coach** — anti-AI detection (em dashes <5, "The" starters <10, no banned phrases)
3. **Ethics** — honesty, FARS data accuracy, not sensationalizing deaths
4. **Social/Share** — would anyone share this? Pull quote power?
5. **Legal** — data citation accuracy, FARS methodology caveats
6. **Research Rigor** — novel contribution, limitations, strongest counterargument, primary sources

## Scholarly Standards
- Cite FARS dataset years and query methodology explicitly
- Include limitations (FARS captures fatalities only, not all crashes)
- Address strongest counterargument
- Primary sources: FARS, IIHS, NHTSA reports — not summaries
- Transparent methodology: what we queried, how we filtered

## Priority Order
1. **Fix validation failures** — run `bash scripts/validate.sh`, fix missing hero images (11), missing og:image (14), missing twitter:card (5), missing image files (3)
2. **Revise active drafts** — if `drafts/` has a working article, improve it toward 8.5+
3. **Start a new draft** — FARS-based research, write to `drafts/`, do NOT publish same cycle
4. **Site improvements** — broken links, missing images, SEO

## Anti-AI Voice Rules
- No "crucial," "vital," "comprehensive," "cutting-edge," "paradigm"
- Em dashes: fewer than 5 per article
- "The" sentence starters: fewer than 10 per article
- No thesis-statement announces
- Site voice: irreverent, data-driven, uses car culture language

## Publishing Checklist (only when PUBLISHED_TODAY == 0)
- [ ] 8.5+/10 from all 6 critics
- [ ] Hero image generated and embedded
- [ ] og:image and twitter:card meta tags
- [ ] Added to index.html
- [ ] Added to sitemap.xml
- [ ] `bash scripts/validate.sh` passes clean
- [ ] Article count updated

## 6 Journalist Personas
Rotate writers. Each has a distinct beat and voice.

## Newsletter — Send on Publish
When publishing an article, also send a newsletter to all subscribers via Resend:

```bash
# 1. Get subscribers from Firebase RTDB
SUBS=$(curl -s "https://rayhenet-default-rtdb.firebaseio.com/newsletters/vehicle-safety/subscribers.json")

# 2. For each subscriber email, send via Resend API
curl -X POST https://api.resend.com/emails \
  -H "Authorization: Bearer re_6xFJoFPt_8s3YZRGZiTvYp96pa7jyLkuX" \
  -H "Content-Type: application/json" \
  -d '{
    "from": "The Crash Report <newsletter@vehicle-safety.org>",
    "to": "subscriber@example.com",
    "subject": "New from The Crash Report: [Article Title]",
    "html": "<h2>[Title]</h2><p>[First 2 paragraphs]</p><p><a href=\"https://vehicle-safety.org/stories/[slug].html\">Read the full article →</a></p><hr><p style=\"font-size:12px;color:#666;\"><a href=\"https://vehicle-safety.org/unsubscribe.html?id=[sub-id]&site=vehicle-safety\">Unsubscribe</a></p>"
  }'
```
NOTE: Resend requires verified domain. Domain verification needed before emails actually send.

## Rules
- Push to main only after validation passes
- One article per day MAXIMUM
- Draft daily, improve hourly, publish only when ready
- Quality over quantity — always
