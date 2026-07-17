# Research Notes: Kimi K3 Intelligence Tax

## Topic
Kimi K3 delivers 95% of Fable 5's intelligence at 30% of the price. The "intelligence tax" — what the last 5% of frontier capability costs — is 44× more expensive per point than the base rate, and for most businesses, not worth paying.

## Primary Sources
1. **Artificial Analysis Intelligence Index** (artificialanalysis.ai/leaderboards/models) — scraped July 17, 2026
   - Full leaderboard with scores, prices, speeds for 250+ models
2. **Arena.ai frontend development benchmark** — via Anastasios Angelopoulos (Arena CEO) X post, July 16, 2026
   - K3 ranked #1, beating Fable 5 in frontend coding
   - Quote: "This may be the single biggest release of the year, and marks the moment that OSS Chinese models have surpassed US models."
3. **Moonshot AI Wikipedia / Kimi chatbot Wikipedia** — technical specs, release timeline, pricing
4. **Gizmodo** — "China Just Dropped Another Bomb on America's Frontier AI Companies" (July 17, 2026)
5. **Barron's** — "How OpenAI's New GPT 5.6 Stacks Up" — Sol costs $1.04/task vs Fable's ~$3/task
6. **Polyprediction.app** — market implications, competitor share crashes
7. **Medium / DigitalOcean** — K2.6 pricing context, MoE inference economics

## Key Data Points

### Artificial Analysis Intelligence Index (Top 10)
| Rank | Model | Score | Blended $/M | Speed (tok/s) |
|------|-------|-------|-------------|---------------|
| 1 | Claude Fable 5 (with fallback) | 60 | $7.70 | 66 |
| 2 | GPT-5.6 Sol (max) | 59 | $4.35 | 54 |
| 3 | GPT-5.6 Sol (xhigh) | 58 | $4.35 | 53 |
| 4 | **Kimi K3** | **57** | **$2.31** | **62** |
| 5 | GPT-5.6 Sol (high) | 56 | $4.35 | 47 |
| 6 | Claude Opus 4.8 (max) | 56 | $3.85 | 56 |
| 7 | GPT-5.6 Terra (max) | 55 | $2.17 | 138 |
| 8 | GPT-5.5 (xhigh) | 55 | $4.35 | 67 |
| 9 | Grok 4.5 (high) | 54 | $1.35 | 97 |
| 10 | Claude Sonnet 5 (max) | 53 | $1.54 | 78 |

### K3 Technical Specs
- 2.8 trillion total parameters (MoE)
- ~60-80B active parameters per token
- 1M+ token context window (1.05M per AA)
- Kimi Linear attention for long-context serving
- 62 tokens/sec output speed
- 1.99s time to first token
- Long-horizon knowledge Elo: 1547 (+732 from K2.6)
- Weights release: July 27, 2026
- Modified MIT license

### Pricing Context
- K3 API: $2.31/M blended (7:2:1 cache hit/input/output)
- K2.6 API: $0.60 input / $2.50 output ($0.70 blended)
- Fable 5: $10 input / $50 output ($7.70 blended via AA), $20 blended at 3:1
- GPT-5.6 Sol: $5 input / $30 output ($4.35 blended via AA)
- Fable 5 batched: $5/$25 ($10 blended at 3:1)

### K2 Thinking Training Cost
- ~$4.6 million (1T params, 32B active, trained Nov 2025)
- K3 training cost not disclosed

## Original Calculation: The Intelligence Tax

### Average cost per intelligence point ($/M tokens per point)
- K3: $2.31 / 57 = $0.0405/point
- Fable 5: $7.70 / 60 = $0.1283/point
- GPT-5.6 Sol: $4.35 / 59 = $0.0737/point
- Opus 4.8: $3.85 / 56 = $0.0688/point

Fable 5 costs 3.17× more per intelligence point than K3.

### Marginal cost: what the last 3 points cost
- Moving from K3 (57, $2.31) to Fable 5 (60, $7.70):
  - Extra cost: $5.39/M tokens
  - Extra intelligence: 3 points
  - Marginal cost: $5.39 / 3 = $1.797 per incremental point
- K3's average rate: $0.0405/point
- **The marginal cost of the last 3 points is 44.4× the average rate for the first 57 points.**

### Annual "Intelligence Tax" for a 100M tokens/day workload
- K3: 100M × $2.31/M = $231/day × 365 = $84,315/year
- Fable 5: 100M × $7.70/M = $770/day × 365 = $281,050/year
- **Annual intelligence tax: $196,735 for a 5% improvement**

### What K3 buys per dollar vs Fable 5
- Intelligence per dollar per M tokens:
  - K3: 57 / $2.31 = 24.7 points/$
  - Fable 5: 60 / $7.70 = 7.8 points/$
  - K3 delivers 3.2× more intelligence per dollar

## Strongest Counterargument
- Fable 5's overall lead is real: for tasks where accuracy matters (medical, legal, safety-critical), 5% may be the difference between correct and harmful
- Closed models offer SLAs, enterprise support, compliance certifications that open-weight models don't
- K3's advantage is on AVERAGE benchmarks — on specific reasoning-heavy tasks, the gap may be wider
- Self-hosting 2.8T params is expensive (even at 60-80B active, needs multi-GPU setup)
- Moonshot AI is Alibaba-backed — geopolitical risk for Western enterprises

## Limitations
- Intelligence Index is one benchmark; real-world performance varies by task
- K3 trails Fable 5 and Sol overall; it only leads on Arena.ai frontend coding
- Blended pricing assumes 7:2:1 ratio; actual costs depend on use pattern
- Open-weight release hasn't happened yet (July 27) — self-hosting economics are projected
- Training cost unknown — unclear if K3's efficiency advantage extends to training
