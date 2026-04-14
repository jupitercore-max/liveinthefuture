# AI Overviews: Schema Markup Implementation — EXECUTE

**Created:** 2026-04-05 (Iteration 1)
**Updated:** 2026-04-14 (Iteration 9)
**Status:** ACTIVE — "Do it" threshold reached. Implementation starting.
**Action:** Implement schema.org JSON-LD across all 8 site templates.

## What's New (Iteration 9): CMI Validation

Content Marketing Institute published a definitive piece (April 8, 2026) on structured data for AI engines that validates everything in this thread:

### SAP Case Study (Real Data)
- **168% traffic growth from LLMs** between 2024-2025
- LLM-referred visitors are **more engaged** and **2x more likely to convert**
- "Citations are swiftly becoming the first page of search" — Caerley McShane, Global SEO Lead, SAP

### Aiso Experiment (Controlled Test)
- Identical content on structured vs unstructured pages
- ChatGPT responses from structured pages scored **30% higher** for accuracy, completeness, and presentation quality
- Google AND Microsoft both explicitly say structured data improves visibility in AI search

### Key Framework: Entities, Not Keywords
- Schema markup converts text into **named entities** (person, product, organization, topic)
- AI engines use entity relationships to determine trust and relevance
- Without markup, machines see "strings of text" — with it, they see connected knowledge

## "Do It" Status (Iteration 4 of recommending)

This thread has recommended schema markup for 4 iterations. Per instructions:
- **Threshold: 3 iterations → do it or drop it**
- **Decision: DO IT.**

### Implementation Plan (ready to execute)

**Phase 1: Article Template** (highest impact, one-time change per site)
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

**Phase 2: Site-Specific Types**
- LITF: Add `Dataset` for data tools (space watches, school analysis), `SoftwareApplication` for games
- VS: Add `Dataset` for FARS/IIHS data tables
- AIHome: Add `HowTo` for actionable guides
- ED: Add `Review` for watch/car reviews

**Phase 3: Measurement**
- Cloudflare analytics: track AI Overview referral traffic before/after
- Google Search Console: track "AI Mode" impressions if available
- Compare citation rate: are our articles appearing in AI Overviews?

### Next Step
**Propose to Ray as a ready-to-execute task.** The implementation is mechanical — modify article template, add JSON-LD block, deploy. One-time change improves all 600+ articles retroactively.

If Ray says "do it": implementation takes ~2 hours across all sites.

## Data Summary (unchanged)
- AI Overviews: 48% of ALL queries, 75M daily AI Mode users
- Content < 3 months old: 3x more likely cited
- AI citations: 14.2% conversion (5x organic)
- Schema markup: 30-36% citation accuracy/boost
- YouTube citations surged 414%
- SAP: 168% LLM traffic growth, 2x conversion rate

---
*Updated: 2026-04-14, Iteration 9 — CMI/SAP/Aiso validation: structured pages score 30% higher in AI responses, SAP saw 168% LLM traffic growth. "Do it" threshold exceeded (4 iterations). Implementation plan ready. Propose to Ray as one-decision package.*
