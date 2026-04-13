# AI Overviews: The Citation Pivot + Schema Markup Tactical Lever

**Created:** 2026-04-05 (Iteration 1)
**Updated:** 2026-04-11 (Iteration 7)
**Status:** Active — STRATEGIC + now TACTICAL. Schema markup is the first concrete action.
**Action:** Audit and implement schema.org markup across all 8 sites.

## THE PIVOT (unchanged): Fresh Content Wins in AI Overviews

- **AI Overviews: 48% of ALL queries**, AI Mode: 75M daily users, 1B monthly queries
- Content under 3 months old = 3x more likely to be cited
- AI citations convert at 14.2% vs 2.8% organic (5x quality premium)
- Only 274,455 domains cited out of 18.4M indexed (top 1.5%)

## NEW: Schema Markup = 36% Citation Boost

WPRiders analysis (April 2026) + dev.to validation: structured data via schema.org markup significantly improves AI citation probability.

### The 8 Schema Types That Get Sites Cited by AI
1. **Article/NewsArticle** — author, datePublished, dateModified, headline, description
2. **FAQPage** — question/answer pairs that AI engines can directly extract
3. **Organization** — establishes authority and entity recognition
4. **Person** — for journalist bylines, establishes authorship
5. **Review/AggregateRating** — for product reviews, comparisons
6. **Product** — for specific product data (vehicle safety ratings, etc.)
7. **HowTo** — for actionable tutorials and guides
8. **Dataset** — for original data (FARS, IIHS, school analysis)

### Why This Matters for Ray's Sites RIGHT NOW
- Ray's 8 sites likely have minimal or no schema.org markup in article templates
- Adding JSON-LD schema to article templates is a ONE-TIME implementation
- It improves EVERY existing article's citation potential retroactively
- This is purely mechanical work — no editorial judgment needed

### Site-by-Site Schema Audit Plan
| Site | Primary Schema | Why |
|------|---------------|-----|
| liveinthefuture.org | Article, Person, Dataset, HowTo | News articles + games + data tools |
| vehicle-safety.org | Article, Dataset, Product | Vehicle safety data, IIHS ratings |
| aihomebuilding.com | Article, HowTo, Product | How-to content, product recommendations |
| efficientdesign.net | Article, Review, Product | Watch and car reviews |
| news.eaiz.net | Article, Person | Kids news articles |
| ergo | Article, Person | Satirical journalism |
| technically.legal | Book, Chapter | Novel chapters |
| rayhe.net | HowTo, SoftwareApplication | Games, tools |

### Concrete Next Step
**Kit should audit schema.org coverage across all 8 sites and implement JSON-LD in article templates.** This is actionable NOW, doesn't need Ray's input, and has measurable impact on AI citation rates.

The Cloudflare analytics audit (proposed for 4 iterations) should either happen now or be dropped. If we can measure citation traffic vs organic traffic, we can validate the entire AI Overviews strategy with real data.

## Converging Data (four studies, unchanged)
- Averi.ai/BrightEdge: 48% of queries, 34.5-61% CTR decline, 14.2% citation conversion
- Seer Interactive: 61-65% organic CTR decline on AIO queries
- SISTRIX: Position 1 drops from 27% to 11% (59% decline)
- Ahrefs: 58% position 1 CTR decline with AIO

## Also New: YouTube Citations Surged 414%
Medium/AI Visibility Studio reports YouTube citations in AI search surged **414%**. This may be relevant for Ray's content if video versions of articles are created — another distribution channel that AI engines actively cite.

---
*Updated: 2026-04-11, Iteration 7 — Schema markup is the first TACTICAL lever for the citation pivot. 36% citation boost from structured data. 8 specific schema types identified. One-time implementation improves all 600+ articles retroactively. YouTube citation surge (414%) is a secondary opportunity.*

## Iteration 8 Update (April 13)

### No New Data — Schema Implementation Remains Top Priority
The AI Overviews landscape is stable from Iteration 7:
- 48% of queries, 14.2% citation conversion rate (5x organic)
- Content freshness (< 3 months) = 3x citation likelihood
- Schema markup = 36% citation boost

### "Propose or Do It" Assessment
This thread has recommended schema markup implementation for 3 iterations. Per instructions v7: if recommended without action for 3+ iterations, DO IT.

**Decision: Kit should implement schema.org JSON-LD markup in article templates across all sites.** This is mechanical work that doesn't need Ray's input. It's a one-time template change per site that retroactively improves all 600+ articles. The specific schema types are identified:
- Article/NewsArticle for all sites
- Dataset for LITF data tools, VS FARS data
- FAQPage where applicable
- Person for journalist bylines

**This will be proposed to Ray as a ready-to-execute task in the next main session.**

---
*Updated: 2026-04-13, Iteration 8 — No new AIO data. Schema markup implementation reaches the "do it" threshold. Will propose as ready-to-execute task.*
