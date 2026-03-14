---
id: aihome-improve
enabled: true
mode: task
schedule:
  kind: interval
  timezone: UTC
  at: 2026-03-14T00:20:00Z
  every: 2h
execution:
  target: isolated
---
# AI Home Building — Quality-First Improvement

## Setup
```bash
git config --global credential.helper store
echo "https://rayhe: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@github.com" > ~/.git-credentials
chmod 600 ~/.git-credentials
git config --global user.name "Hatch"
git config --global user.email "hatch@rayhe.github.io"
cd ~/workspace/aihomebuilding && git pull origin main
```

## ⚠️ ONE ARTICLE PER DAY — HARD LIMIT ⚠️

Before doing ANYTHING, run:
```bash
cd ~/workspace/aihomebuilding
TODAY=$(date -u +%Y-%m-%d)
PUBLISHED_TODAY=$(git log --since="$TODAY" --oneline --grep="Publish" | wc -l)
echo "Articles published today: $PUBLISHED_TODAY"
```

**If PUBLISHED_TODAY >= 1: DO NOT PUBLISH.** You may only:
- Improve existing drafts in `drafts/`
- Run critique rounds on drafts
- Fix validation issues (images, meta tags)
- Site improvements (CSS, nav, SEO)

**If PUBLISHED_TODAY == 0: You may publish ONE article** if it scores 8.5+/10 across all 6 critics.

## Read First
- `RESEARCH.md` — topic threads and research queue
- `scripts/validate.sh` — must pass before any push
- Check existing articles to avoid topic duplication

## 6-Critic System (required for publishing)
Every article must pass all 6 critics at 8.5+ before publishing:
1. **General Editor** — structure, flow, contribution
2. **Voice Coach** — anti-AI detection (em dashes <5, "The" starters <10, no banned phrases)
3. **Ethics** — honesty about AI capabilities, not overselling
4. **Social/Share** — would a homebuilder share this?
5. **Legal** — product claims accuracy, liability caveats
6. **Research Rigor** — novel contribution, limitations, primary sources, transparent methodology

## Scholarly Standards
- Cite specific products with actual capabilities, not vaporware
- Include limitations (cost, availability, learning curve)
- Address strongest counterargument (often: "just hire a good contractor")
- Primary sources: manufacturer specs, case studies, academic papers
- Transparent methodology

## Priority Order
1. **Fix validation failures** — run `bash scripts/validate.sh` and fix any errors
2. **Revise active drafts** — if `drafts/` has a working article, improve it toward 8.5+
3. **Start a new draft** — research from RESEARCH.md, write to `drafts/`, do NOT publish same cycle
4. **Site improvements** — broken links, missing images, SEO, series page updates

## Anti-AI Voice Rules
- No "crucial," "vital," "comprehensive," "cutting-edge," "paradigm"
- Em dashes: fewer than 5 per article
- "The" sentence starters: fewer than 10 per article
- No thesis-statement announces
- Site voice: practical, builder-facing, specific costs and timelines

## Publishing Checklist (only when PUBLISHED_TODAY == 0)
- [ ] 8.5+/10 from all 6 critics
- [ ] Hero image generated and embedded in article AND index card
- [ ] og:image and twitter:card meta tags
- [ ] Added to index.html
- [ ] Added to sitemap.xml and series.html
- [ ] `bash scripts/validate.sh` passes clean
- [ ] Article count updated

## 6 Journalist Personas
Rotate writers. Each has a distinct beat and voice.

## Rules
- Push to main only after validation passes
- One article per day MAXIMUM
- Draft daily, improve hourly, publish only when ready
- Quality over quantity — always
