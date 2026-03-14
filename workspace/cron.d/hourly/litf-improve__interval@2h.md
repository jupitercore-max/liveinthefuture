---
id: litf-improve
enabled: true
mode: task
schedule:
  kind: interval
  timezone: UTC
  at: 2026-03-14T00:40:00Z
  every: 2h
execution:
  target: isolated
---
# LITF Articles — Quality-First Improvement

## Setup
```bash
git config --global credential.helper store
echo "https://rayhe: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@github.com" > ~/.git-credentials
chmod 600 ~/.git-credentials
git config --global user.name "Hatch"
git config --global user.email "hatch@rayhe.github.io"
cd ~/workspace/liveinthefuture && git pull origin main
```

## ⚠️ ONE ARTICLE PER DAY — HARD LIMIT ⚠️

Before doing ANYTHING, run:
```bash
cd ~/workspace/liveinthefuture
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
- `QUALITY.md` — current article quality tracking
- `EVALUATE.md` — scoring rubric and lessons
- `scripts/validate.sh` — must pass before any push

## 6-Critic System (required for publishing)
Every article must pass all 6 critics at 8.5+ before publishing:
1. **General Editor** — structure, flow, contribution
2. **Voice Coach** — anti-AI detection (em dashes <5, "The" starters <10, no banned phrases)
3. **Ethics** — honesty, who's harmed, self-congratulation check
4. **Social/Share** — would anyone share this? Pull quote power?
5. **Legal** — citation accuracy, case law verification
6. **Research Rigor** — novel contribution, limitations section, strongest counterargument, primary sources, transparent methodology

## Scholarly Standards
- Every article must contribute something not already published elsewhere
- Include a limitations section or honest acknowledgment of gaps
- Address the strongest counterargument, not just strawmen
- Cite primary sources (court filings, datasets, papers), not summaries
- Make methodology transparent — how did we find this, what did we check

## Priority Order
1. **Revise active drafts** — if `drafts/` has a working article, improve it toward 8.5+
2. **Fix validation failures** — run `bash scripts/validate.sh` and fix any errors
3. **Start a new draft** — research a topic, write to `drafts/`, do NOT publish same cycle
4. **Site improvements** — SEO, broken links, missing images, design fixes

## Anti-AI Voice Rules
- No "crucial," "vital," "comprehensive," "cutting-edge," "paradigm," "I cannot and will not"
- Em dashes: fewer than 5 per article
- "The" sentence starters: fewer than 10 per article
- No thesis-statement announces ("In this article, we will explore...")
- No self-congratulation about LITF's own output

## Publishing Checklist (only when PUBLISHED_TODAY == 0)
- [ ] 8.5+/10 from all 6 critics
- [ ] Hero image generated and embedded
- [ ] og:image and twitter:card meta tags
- [ ] Added to index.html
- [ ] Added to sitemap.xml
- [ ] `bash scripts/validate.sh` passes clean
- [ ] Article count updated in site header

## 14 Journalist Personas
Check existing articles to avoid duplicating a persona's recent topic. Rotate writers.

## Rules
- Push to main only after validation passes
- One article per day MAXIMUM
- Draft daily, improve hourly, publish only when ready
- Quality over quantity — always
