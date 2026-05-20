# Research: Google I/O 2026 Token Price Paradox & Agent Lock-In

## Core Thesis
At I/O 2026, Google simultaneously raised API token prices 3× and cut consumer subscription prices up to 60%. Not a contradiction — a calculated platform play. The throughput math makes both moves rational, and Gemini Spark's always-on agent creates switching costs that make the subscription subsidy self-recovering.

## Key Data Points

### Gemini 3.5 Flash Pricing vs. Predecessor
- **Gemini 3.5 Flash**: $1.50/M input, $9.00/M output (1M context window)
- **Gemini 3 Flash**: $0.50/M input, $3.00/M output
- **Gemini 2.5 Flash**: $0.30/M input, $2.50/M output
- Price increase from 3 Flash → 3.5 Flash: **3× input, 3× output**
- Artificial Analysis found the 3.5 Flash benchmark suite cost **5.5× more** than previous Flash (higher prices + more agentic turns consuming more input tokens)
- Source: TechTimes, Artificial Analysis, scriptbyai.com pricing tables

### Performance Claims (Independently Verified)
- **Throughput**: 289 TPS on stage (Pichai), 284 TPS independently (Artificial Analysis)
- Google claims "4× faster than comparable frontier models"
- An optimized variant runs **12× faster** at same quality (Kavukcuoglu, DeepMind)
- **Benchmarks**: Terminal-Bench 2.1: 76.2% (vs 70.3% for 3.1 Pro), MCP Atlas: 83.6% (vs 78.2%), GDPval-AA: 1,656 Elo (vs 1,317)
- Artificial Analysis Intelligence Index: 55 (9 points above Gemini 3 Flash)
- MMMU-Pro multimodal: 84% (highest ever recorded by AA)
- Trails 3.1 Pro on long-context retrieval and pure-knowledge tests (Humanity's Last Exam)
- Sources: TechTimes, TechCrunch, Artificial Analysis, Google DeepMind

### Google AI Subscription Tier Changes
**Before I/O 2026:**
- AI Plus: ~$8/month
- AI Pro: $19.99/month
- AI Ultra: $249.99/month

**After I/O 2026:**
- AI Plus: ~$8/month (unchanged, now gets Gemini Omni)
- AI Pro: $19.99/month (now includes YouTube Premium Lite, $8.99 value)
- AI Ultra $100/month: NEW. 5× Pro limits, Gemini Spark, 20TB storage, YouTube Premium
- AI Ultra $200/month: Was $250 → now $200. 20× Pro limits, Project Genie, everything in $100

**Price cut**: Top tier dropped from $250 → $200 (20% cut). New $100 tier is 60% below old Ultra. But they bundled MORE features.

**Key change**: Moving from daily prompt limits to "compute-used" model. Limits refresh every 5 hours until weekly cap hit. Can buy top-up credits when capped.

Sources: Google official blog, Android Authority, Engadget, TechCrunch

### Competitive Pricing Landscape (May 2026)
| Provider | Basic | Mid | Premium | Top |
|----------|-------|-----|---------|-----|
| Google | AI Plus ~$8/mo | AI Pro $20/mo | Ultra $100/mo | Ultra $200/mo |
| OpenAI | — | Plus $20/mo | Pro $100/mo | Pro $200/mo |
| Anthropic | — | Pro $20/mo | Max $100/mo | Max $200/mo |
| Microsoft | — | Copilot Pro $20/mo | — | — |

Three-tier convergence: ~$20 / ~$100 / ~$200. Every lab landed on the same numbers.

### Gemini Spark Details
- 24/7 personal AI agent running in cloud VMs on Google Cloud
- Based on Gemini 3.5 Flash
- 30+ third-party tools via MCP (Adobe, Dropbox, Uber, Canva, Instacart, OpenTable)
- Scans Gmail, Calendar, Tasks, Docs
- Monitors credit card statements for hidden subscription fees
- Asks confirmation before high-stakes actions (spending, sending emails, calendar changes)
- Available to AI Ultra subscribers ($100 and $200)
- Trusted testers this week, US Ultra subscribers next week
- Desktop app planned for macOS with local file access (summer 2026)
- Sources: Google blog, Engadget, Mashable, TechTimes

### Market Share Data
- ChatGPT: 60.6% AI chatbot market share (May 2026, First Page Sage)
- Google Gemini: 15.1% (declining)
- Microsoft Copilot: 12.5%
- Perplexity: growing
- Claude: growing

### Alphabet Financial Data (Q1 2026)
- Revenue: $109.9B (+22% YoY)
- Google Cloud: $20B (+63% YoY)
- Total paid subscriptions: 350M (up 25M from 2025, includes YouTube Premium + Google One)
- Gemini: 750M MAU, 19 billion tokens processed per minute
- Net income: $62.6B (+81% YoY, includes $37.7B equity gains)
- CapEx guidance increased to support AI
- Sources: Reuters, Gadgets360, TradingView

### Revenue-Per-GPU-Hour Calculation (Original)
**Gemini 3.5 Flash (at API prices):**
- 289 TPS output × $9.00/M tokens = $0.0026/sec = **$9.36/hour per GPU in output revenue**

**Gemini 2.5 Flash (estimated ~72 TPS):**
- 72 TPS output × $2.50/M tokens = $0.00018/sec = **$0.65/hour per GPU**

**Revenue per GPU-hour improvement: 14.4×**

This is the key insight: Even though per-token price went up 3×, the 4× throughput improvement means each GPU generates 14× more revenue per hour. Google can afford consumer subscription subsidies because the API/enterprise revenue per unit of infrastructure is dramatically higher.

### Enterprise Deployments
- Salesforce: integrating 3.5 Flash into Agentforce
- Shopify: parallel sub-agents for merchant-growth forecasting
- Macquarie Bank: onboarding 100+-page financial documents
- Ramp: invoice OCR
- Xero: multi-week tax-form automation
- Box: reported 19.6% improvement over Gemini 3 Flash on enterprise-work eval
- Sources: Google DeepMind model page, TechTimes

### Other I/O Announcements (Context)
- Gemini Omni: world model, multi-modal in/out, first step toward AGI (per Hassabis)
- Project Aura smart glasses: updated with Xreal, fingerprint sensor on compute puck
- Warby Parker + Gentle Monster: audio-only Android XR glasses, fall 2026
- Universal Cart: cross-merchant shopping across Search, YouTube, Gemini, Gmail
- Information agents in Search: background agents monitoring web content
- Antigravity 2.0: agent-first dev platform, standalone desktop app + CLI
- Vibe-coding to Play Store from AI Studio
- Neural Expressive design language
- Daily Brief: morning digest agent
- Google Beam: lifelike AI video agents (renamed from Project Starline)
- Gemini for Science: collaboration with 100+ institutions

## Angle: The Token Price Paradox
The article will focus on the paradox of raising API prices while cutting consumer prices, with the original contribution being the revenue-per-GPU-hour calculation and the agent lock-in analysis. This connects to the broader story of AI companies transitioning from chat products (low switching costs) to agent platforms (high switching costs).
