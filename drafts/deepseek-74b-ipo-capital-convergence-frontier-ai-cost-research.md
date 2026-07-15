# Research Notes: DeepSeek Capital Convergence

## Core Thesis
DeepSeek — the company that proved frontier AI could be trained cheaply — is now raising capital at a pace that matches Western labs. The efficiency advantage was real but temporary. At the frontier, capital demands converge regardless of algorithmic cleverness.

## Primary Sources

### 1. Reuters (Jul 15, 2026): DeepSeek raises at $74B ahead of IPO
- Fresh round at 500B yuan ($74B) valuation
- Raising up to 50B yuan (~$7.4B)
- IPO filing target: end of 2026 on STAR Market
- Just weeks after $7.4B June round at $50B post-money
- Liang personally committed 20B yuan ($3B) in June round
- Tencent: 10B yuan (~$1.5B), CATL: 5B yuan (~$740M)
- Other investors: national AI fund, NetEase, JD.com, IDG Capital
- Key quote from Reuters: "back-to-back fundraising plans underscore strong investor appetite... but also point to the rising costs of competing in AI"
Source: https://www.reuters.com/legal/transactional/chinas-deepseek-raise-fresh-capital-74-billion-valuation-ahead-onshore-ipo-2026-07-15/

### 2. WSJ (Jul 15, 2026): DeepSeek prepares Shanghai listing
- IPO as early as Q2 2027
- Liang has been selective in choosing backers to prevent commercial interference with research
- Key quote: "Pitching investors in May, DeepSeek's Liang said the startup could lose momentum if it lacks the funds to retain top talent and expand its computing infrastructure."
- Anthropic's Mythos system caused "anxiety" in China's AI circles
- Joe Tsai (Alibaba chairman): "In the China context, we're very underinvested in infrastructure and in the AI supply chain"
Source: WSJ, Jul 15

### 3. DeepSeek V3 Training Cost (Dec 2024)
- 2,048 H800 GPUs, ~2 months training
- 2.79 million GPU hours at $2/hr estimated = $5.58M
- 671 billion parameters, 14.8 trillion tokens
- SemiAnalysis debunked: true server CapEx ~$1.3B (50,000 Hopper GPUs)
- $5.58M was GPU compute only, excluded R&D, data acquisition, infrastructure
Source: The Register, SemiAnalysis report

### 4. Crunchbase Q1 2026 Sector Snapshot
- OpenAI: $122B mega-round (March 2026), ~$852B valuation
- Anthropic: $30B Series G (Feb 2026) at $380B, then $65B Series H reaching ~$965B-$1.08T
- xAI: $42.7B total (debt+equity), $20B Series E (Jan 2026) at $230B, merged with SpaceX at $1.25T combined
- Total Q1 2026 foundational AI funding: double all of 2025
Source: Crunchbase

### 5. Revenue Data
- OpenAI: ~$24B ARR, $2B/month, enterprise 40% of revenue
- Anthropic: ~$30B ARR (tripled from $9B end-2025), 500+ enterprise customers >$1M/yr
- DeepSeek: $0 revenue (explicitly prioritizing AGI research over commercialization)
Source: Zacks (Apr 2026), Fast Company (May 2026), Stocktwits (Jul 2026)

### 6. Bloomberg Billionaires: Liang Wenfeng
- Net worth doubled to $36B after June round
- World's richest AI model founder
- ~78% stake after dilution
- Born 1985, Zhanjiang, Guangdong
- Zhejiang University (EE bachelor's, ICE master's)
- Created DeepSeek in 2023 as offshoot of High-Flyer hedge fund AI division
Source: Bloomberg Billionaires Index via Communications Today

### 7. DeepSeek Inference Chip (Jul 8, 2026)
- Developing own AI inference chip
- Hiring chip-design engineers discreetly
- Uses Huawei Ascend processors alongside existing hardware
- US bans prevent access to TSMC advanced nodes
- Inference is fastest-growing segment of AI compute
Source: Reuters

## Original Calculations

### Calculation 1: The $5.58M-to-$15B Multiplier
- Claimed V3 training cost: $5.58M
- Capital raised/planned in 60 days (Jun-Jul 2026): $14.8B
- Ratio: 2,652x
- The amount being raised could train V3 1,326 times at claimed cost
- At SemiAnalysis true capex ($1.3B): enough for 11.4x the entire original infrastructure

### Calculation 2: The Efficiency Half-Life
- Dec 2024: V3 released ("trained for $5.58M")
- Jan 2025: R1 released, DeepSeek becomes global phenomenon
- Jan 2025: $600B wiped from NVIDIA market cap in one day
- Jun 2025: Still self-funded
- Jun 2026: First external round ($7.4B at $50B)
- Jul 2026: Second round ($7.4B at $74B)
- Late 2026: IPO filing
Time from efficiency narrative to capital arms race: ~18 months

### Calculation 3: Capital per Frontier Model
- OpenAI: ~$122B / ~5 frontier models = ~$24.4B per model
- Anthropic: ~$64B / ~6 models = ~$10.7B per model
- xAI: ~$42.7B / ~4 models = ~$10.7B per model
- DeepSeek: ~$14.8B / ~4 models (V2/V3/R1/V4) = ~$3.7B per model
Even DeepSeek is at $3.7B per frontier model and climbing fast.

### Calculation 4: Valuation per Revenue Dollar
- OpenAI: $852B / $24B ARR = 35.5x
- Anthropic: $1.08T / $30B ARR = 36x
- DeepSeek: $74B / $0 revenue = ∞ (pure research bet, no revenue)
Market valuing research capability, not commercial traction.

### Calculation 5: Capital Raised in 2026 Alone (All Labs)
- OpenAI: $122B (March)
- Anthropic: $30B (Feb) + $65B (May) = $95B
- xAI: $20B (Jan) + SpaceX merger
- DeepSeek: $14.8B (Jun-Jul)
- Total: >$250B in capital raised by 4 companies in 7 months
For context: this exceeds the GDP of Finland ($300B) and approaches Portugal ($267B).

## Counterargument
DeepSeek IS still more capital-efficient. $14.8B for a $74B valuation vs. $122B for $852B (OpenAI) means DeepSeek generates $5 of valuation per $1 raised vs. $7 for OpenAI. The efficiency advantage persists in the ratio, just not in absolute terms. The question is whether efficiency advantages compound (good for DeepSeek) or decay (bad for DeepSeek) as compute demands scale with model size.

## Limitations
- DeepSeek's actual compute infrastructure is opaque — SemiAnalysis's $1.3B estimate based on inference, not disclosure
- Revenue figures for xAI and DeepSeek are unknown/zero; comparisons rely on public disclosures from OpenAI and Anthropic
- "Capital raised" conflates equity, debt, and committed-but-not-deployed capital differently across companies
- DeepSeek's V4 training cost not publicly disclosed; the $5.58M figure is for V3 only
- Chinese valuation context may differ from US (STAR Market multiples, state fund participation)
