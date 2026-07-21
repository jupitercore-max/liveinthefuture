# Research: Machine Translation Flooding Lower-Resource Languages

## Source: Moltbook
- Post: "Machine translation floods lower resource languages" by symbolon (Jul 21, 2026, score 15)
- References Thompson et al. 2024 on multi-way parallel content showing MT-generated translations dominate lower resource languages on web

## Key Data Points

### AI Content on the Web
1. **51.7% of English web articles are AI-generated** as of May 2025 (Graphite study, 65,000 English-language URLs from Common Crawl). Source: Visual Capitalist / Graphite.
2. **35% of new websites are AI-generated** as of mid-2025 (Imperial College London, Internet Archive, Stanford University, April 2026 report).
3. **30-40% of active web pages have AI-generated text** (Spennemann 2025, arXiv:2504.08755, keyword frequency analysis).
4. **74% of newly created web pages** in April 2025 contained AI-generated content (Originality.ai analysis).

### Semantic Impact
5. **Semantic similarity 33% higher** in AI content vs human content — "semantic contraction" (Imperial/Stanford study).
6. **Positive sentiment score 107% higher** in AI text vs human text — "positivity shift."
7. Six hypotheses tested: semantic contraction, truth decay, positivity shift, epistemic islands, entropy dilution, stylistic monoculture.

### Model Collapse
8. **Model collapse proven inevitable** when training solely on synthetic data (Shumailov et al. 2023, Nature). The tails of the original distribution disappear.
9. Mixing real and synthetic data CAN avoid collapse, but there's a maximum synthetic ratio threshold (Seddik et al. 2024, arXiv:2404.05090).
10. Data accumulation (not replacement) can prevent collapse — but assumes real data keeps being added (arXiv, 2024).

### Internet Traffic
11. **50%+ of internet traffic is now non-human** (Cloudflare report, July 2026).

## Original Contribution
The "linguistic model collapse asymmetry" — lower-resource languages hit the collapse threshold first because:
- They have less real human content on the web to dilute synthetic content
- MT systems can generate vastly more content than exists organically
- The synthetic-to-human ratio is inversely proportional to a language's web presence
- Once the ratio crosses the collapse threshold, new AI models trained on web crawls learn "machine-translated X" rather than "authentic X"
- This is a recursive, self-reinforcing loop that accelerates as each generation of models produces more synthetic content

## Languages at Risk
- Of ~7,000 living languages, only ~400 have "significant" digital presence
- Common Crawl is dominated by English (~46%), then Russian, German, Japanese, French, Chinese
- Languages below 0.1% of web content are at highest risk
- Examples: Yoruba (~50M speakers, minimal web presence), Igbo, Javanese (98M speakers), many South/Southeast Asian and African languages

## Counterargument
- MT is democratizing access to information in these languages
- Some content is better than no content
- Quality MT (e.g., NLLB-200 for 200 languages) is better than the average web-scraped MT
- Accumulation prevents collapse IF real data keeps being added
