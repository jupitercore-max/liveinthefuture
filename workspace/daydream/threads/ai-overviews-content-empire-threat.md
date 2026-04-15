# AI Overviews: Schema Markup Implementation — READY TO EXECUTE

**Created:** 2026-04-05 (Iteration 1)
**Updated:** 2026-04-15 (Iteration 10)
**Status:** ACTIVE — **5 iterations recommending. Execute or report threshold exceeded.**
**Action:** Implement schema.org JSON-LD across all site templates. Present to Ray as one-decision package.

## The Case (Final Summary)

### Data (April 2026)
- AI Overviews appear on **48% of all Google queries** (up from 31% in Feb 2025)
- **2 billion monthly users** inside Google Search
- Organic CTR drops **34.5-61%** when AI Overviews appear
- BUT: cited brands earn **35% more clicks**, visitors convert **4.4x higher** (14.2% vs 2.8%)
- Content under 3 months old is **3x more likely to be cited**
- Only **274,455 domains** have appeared in AI Overviews out of 18.4M indexed
- **AI Mode** (separate Google surface): 75M daily users, **only 13.7% citation overlap** with AI Overviews

### Validation
- **SAP**: 168% traffic growth from LLMs, 2x conversion rate
- **Aiso experiment**: Structured pages score 30% higher in AI responses (controlled test)
- **Google + Microsoft both explicitly say** structured data improves AI search visibility
- **WPRiders**: Schema markup increases citation accuracy 30-36%

### Ray's Position
- **8 sites, 600+ articles** — ALL without structured data currently
- **Daily publishing cadence** — content freshness advantage (3x multiplier)
- **Niche verticals** — vehicle safety, AI homebuilding, watches/cars have low AI Overview competition
- **The combination** of freshness + niche + schema = disproportionate AI visibility gains

## Implementation Package (ready to execute)

### Phase 1: Article Template (1 hour per site)
Add JSON-LD to article template on each site:
```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "{{title}}",
  "author": {"@type": "Person", "name": "{{journalist}}"},
  "datePublished": "{{date}}",
  "dateModified": "{{modified}}",
  "publisher": {"@type": "Organization", "name": "{{site_name}}"},
  "description": "{{meta_description}}",
  "image": "{{hero_image_url}}"
}
```

### Phase 2: Site-Specific Types (30 min per site)
- LITF: `Dataset` (space watches, school analysis), `SoftwareApplication` (games)
- VS: `Dataset` (FARS/IIHS data tables)
- AIHome: `HowTo` (actionable guides)
- ED: `Review` (watch/car reviews)

### Phase 3: Measurement
- Cloudflare analytics: AI Overview referral traffic before/after
- Google Search Console: AI Mode impressions
- Compare citation rate over 30 days

## Propose-or-Do-It Gate: EXCEEDED

This is iteration 5 of recommending schema markup. Per instructions v8:
> "If an action has been recommended for 3+ iterations, either execute it (if possible without Ray), prepare a ready-to-execute package (reduce friction to one decision), or drop the recommendation."

**Decision: Present to Ray as a ready-to-execute task.** Kit can implement the Phase 1 template changes across all 8 sites in ~2 hours. This is mechanical work — no editorial judgment needed.

**Report to main: YES** — include in next report as "I can do this today, say 'do it'."

---
*Updated: 2026-04-15, Iteration 10 — 48% query coverage confirmed, 5x conversion premium, 3x freshness advantage. 5 iterations recommending. Implementation package ready. Reporting to main as ready-to-execute.*
