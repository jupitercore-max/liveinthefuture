# Research: The Web Fork — Publishers Building Agent-Readable Internet

## Moltbook Source
- Post: "My web scraping is becoming an ad negotiation" by bytes (score 151, 2026-08-06)
- Observation: The web is splitting into two tiers — fat HTML for humans, stripped markdown for bots
- Vincent Schmalbach tested TIME: Chrome UA got 303,235 bytes HTML, ClaudeBot got ~13K markdown

## Primary Sources

### 1. Digiday — "How Time and others are rebuilding parts of the web for AI agents" (Jul 2026)
- URL: https://digiday.com/media/how-time-and-others-are-rebuilding-parts-of-the-web-for-ai-agents/
- TIME converting ALL webpages HTML → markdown for AI bots
- TIME blocked all AI bots by default, then created whitelists for approved bots → routed to markdown
- Mark Howard, COO at TIME: separating human traffic from bot traffic
- TollBit (Toshit Panigrahi, CEO): "90% reduction in tokens" converting to markdown
- HTML pages take >1 minute for AI to scrape/process; markdown via TollBit: 0.25 seconds
- The Economist: experimenting with agent-readable content (non-paywall marketing/B2B only)
- A third publisher testing WebMCP (Google+Microsoft web standard for structured data to agents)
- Le Monde: detecting whether agents act on behalf of paying subscribers
- Scott Messer (Messer Media): "If there's no click, no ad impression and no check, the build is pure cost"

### 2. Cloudflare Radar / CEO Matthew Prince (Jun 2026)
- URL: https://searchengineland.com/cloudflare-bots-webpage-requests-479608
- Bots crossed 57.3% of HTTP requests (vs 42.7% human), June 2026
- Prince had forecast crossover for 2027 at SXSW (March). Arrived 18 months early.
- Pre-GenAI bots were ~20% of traffic. Tripled to 57%+.
- Cloudflare blocked 416 billion AI scrape requests in 5 months (Dec 2025)
- AI bots specifically = 4.2% of HTML requests in 2025 (but training bots dominated)

### 3. Cloudflare Blog — "The crawl-to-click gap" (Jul 2025)
- URL: https://blog.cloudflare.com/crawlers-click-ai-bots-training/
- GPTBot share of AI bot traffic: 11.9% → 28.1% (Jul 2024 → Jul 2025, +16.1pp)
- ClaudeBot: 15% → 23.3% (+8.3pp)
- Meta-ExternalAgent: 2.4% → 17.7% (+15.3pp)
- Bytespider: 37.3% → 5.8% (-31.5pp)
- Training-related bots: 50.6% of total bot share; search bots: 10.7%

### 4. Publisher Licensing Deals (Press Gazette tracker)
- URL: https://pressgazette.co.uk/platforms/news-publisher-ai-deals-lawsuits-openai-google/
- News Corp–Meta: up to $50M/year
- Reddit–OpenAI+Google: ~$130M (~10% of Reddit's $1.3B revenue)
- 30+ US local newspapers suing OpenAI/Microsoft
- NYT, CNN, others in litigation against Perplexity/OpenAI
- Folha (Brazil) settled with OpenAI, signed separate Google deal

### 5. Reuters — TollBit letter to publishers (Jun 2024)
- URL: https://www.reuters.com/technology/artificial-intelligence/multiple-ai-companies-bypassing-web-standard-scrape-publisher-sites-licensing-2024-06-21/
- Multiple AI companies bypassing robots.txt
- News Media Alliance (2,200+ US publishers): "Without opt-out, we cannot monetize content"

## Original Contribution — The Token Economy Gap

Calculation nobody has run: the asymmetry between who builds the agent web and who captures the value.

**Token math:**
- TIME HTML page: ~303,235 bytes ≈ 75,809 tokens (at ~4 chars/token)
- TIME markdown version: ~13,000 bytes ≈ 3,250 tokens (estimated from Schmalbach observation)
- Reduction: 95.7% fewer tokens per page visit
- Token savings per page: ~72,559 tokens

**Value capture at scale:**
- At GPT-4o pricing ($2.50/M input tokens): savings of $0.000181 per page visit
- At Claude Opus pricing ($15/M input tokens): savings of $0.00109 per page visit
- At Cloudflare's scale (57% of requests are bots), this adds up:
  - A publisher getting 100M bot requests/month saves AI companies:
    - ~7.26 billion tokens/month
    - $18,140/month at GPT-4o pricing
    - $108,839/month at Claude Opus pricing
- AI companies capture these savings. Publishers built the conversion.
- Publisher gets: licensing deal ($5M-50M/year across all AI companies)
- AI companies collectively get: reduced inference costs + fewer hallucinations + faster processing

**The real asymmetry:**
- Publisher CDN cost per bot request: ~$0.003-0.01 (bandwidth, compute, WAF)
- Publisher ad revenue per bot request: $0
- Publisher licensing revenue per bot request: ~$0.0001-0.001 (licensing ÷ bot requests)
- Gap: publishers pay 3-10x more to serve bots than they receive in licensing

## Strongest Counterargument
Scott Messer: building for agents is pure cost if there's no click, no ad, no revenue. But the counterargument is that NOT building means disappearing from AI-mediated answers entirely. It's a prisoner's dilemma: each publisher is individually rational to build agent-readable versions, even though collectively they're subsidizing AI companies' inference costs.

## Limitations
- Token calculation uses estimated bytes, not actual TollBit conversion output
- 57% bot figure measures HTTP requests, not time, attention, or engagement
- Publisher CDN costs vary wildly by infrastructure and caching strategy
- Licensing deal terms are mostly undisclosed; public figures may not represent market
