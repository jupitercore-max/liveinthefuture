# Research Notes: Meta's 14-Gigawatt Compute Empire

## Article #563 | Slug: meta-iris-chip-14gw-compute-sovereignty-economics
## Journalist: Tomás Reyes | Category: 💻 Computing
## Date: July 9, 2026

## Core Angle
An internal Meta memo leaked via Reuters reveals the company plans to deploy 14 gigawatts of computing infrastructure in 2027 — double its 2026 deployment of 7 GW. Its in-house chip "Iris" (MTIA gen 4) enters production in September 2026 after 6 weeks of bug testing found no major issues. The story is NOT about whether custom silicon makes economic sense (covered in article: custom-ai-chip-nvidia-tax-breakeven). It IS about: what does it mean to build 14 GW of compute, what does it cost to POWER it, and why the internal memo reveals Meta had no choice — GPU adoption "has been a heavy lift, and it has cost us time."

## Distinction from Existing Coverage
- `custom-ai-chip-nvidia-tax-breakeven.html` — Covers breakeven math for custom chips. Our angle is SCALE + POWER + SUPPLY CHAIN SOVEREIGNTY
- `openai-jalapeno-custom-silicon-arms-race.html` — Covers design-house dependency. Our angle is META-SPECIFIC infrastructure story
- `ai-shadow-grid-73gw-health-cost.html` — Covers off-grid gas plants for AI. Our angle is single-company compute at sovereign scale

## Primary Sources
1. **Reuters memo leak (July 9, 2026):** Internal Meta memo showing Iris production September 2026, 7 GW deployed 2026, 14 GW target 2027, $145B capex, supply chain lockups
2. **Broadcom deal (April 2026):** Extended through 2029, 1 GW initial MTIA capacity, Hock Tan moving from Meta board to advisory. First AI chip on 2nm process
3. **TrendForce/Commercial Times:** Meta's 2nm accelerator targeting 1H27, CoWoS-L packaging, HBM4 memory
4. **Morgan Stanley analyst note:** "Chipflation" as macroeconomic concern — memory component prices risen enough to be a macro headwind

## Key Data Points
- Iris: September 2026 production. Broadcom co-design, TSMC manufacturing
- Bug testing: 6 weeks, no major issues (previously unreported timing)
- MTIA roadmap: 100 (7nm, 2023) → 200 (5nm) → 300 (3/4nm, now shipping) → Iris (2nm target 1H27)
- Release cadence: Every 6 months through 2027 (vs industry standard 12-18 months)
- MTIA 300: Already powers Meta's ranking and recommendation systems
- Compute: 7 GW in 2026, 14 GW in 2027
- Capex: Up to $145B in 2026
- Big Tech collective: $700B+ in AI infrastructure
- Memo quote: Adopting latest GPUs "has been a heavy lift, and it has cost us time"
- Supply chain: Long-term agreements with Samsung (memory), SanDisk (flash), Sumitomo Electric (fiber optics)
- Broadcom: Deal through 2029, Hock Tan leaving board for advisory role

## Original Calculations

### 1. Power Cost of 14 GW (THE LEAD NUMBER)
- 14 GW × 8,760 hours/year = 122,640 GWh = 122.6 TWh/year
- At data center PUE of ~1.2: total facility power = 16.8 GW → ~147 TWh/year
- At average US industrial electricity rate ($0.072/kWh per EIA): $10.6B/year JUST in electricity
- Context: Romania consumed ~55 TWh in 2023. Meta's 2027 compute would use ~2.7× Romania's entire national electricity consumption
- Context: The entire US consumed ~4,000 TWh. Meta would be ~3.7% of total US electricity consumption

### 2. Supply Chain Lockup Economics
- Samsung memory deal value: ~10 trillion won (~$6.5B) per custom-ai-chip article
- If Meta is spending $145B/year total, and ~$10-15B goes to Nvidia, ~$6.5B to Samsung memory, unknown to SanDisk and Sumitomo, the supply chain commitment represents a significant fraction of capex
- These are multi-year agreements customers can't back out of

### 3. Compute Doubling Rate vs Industry
- Meta: 7 GW → 14 GW in 1 year (100% growth)
- For comparison: Total US data center power was ~35 GW in 2023 (Goldman Sachs estimate)
- Meta alone will represent ~40% of US data center power by 2027 if the industry doesn't grow proportionally
- The industry IS growing: Goldman projects 67 GW by 2030, but Meta's 14 GW still represents 21% of projected total

## Strongest Counterargument
The 14 GW number may include total contracted power capacity, not deployed compute. Data center operators routinely announce capacity targets years before buildout completes, and planned capacity ≠ online capacity. Nvidia's Rubin platform (announced GTC 2026) promises 10× run-cost improvements. If Rubin delivers, Meta could achieve the same computational throughput with far less power, making the 14 GW target either unnecessary or achievable with conventional GPUs alone.

## Limitations
- The memo was reviewed by Reuters, not released publicly. We rely on Reuters' characterization
- "14 gigawatts" could refer to total contracted capacity, total site capacity, or IT load — the distinction matters enormously
- Electricity cost calculations use average US industrial rates; Meta's actual rates vary by region and likely include renewable PPAs at different rates
- MTIA's share of total compute remains undisclosed — "hundreds of thousands" of chips could be a small fraction of total deployed inference silicon

## Related Articles for Links
1. `custom-ai-chip-nvidia-tax-breakeven.html` — Nvidia margin math, MTIA breakeven
2. `ai-shadow-grid-73gw-health-cost.html` — AI data center power/environmental impact
3. `openai-jalapeno-custom-silicon-arms-race.html` — Custom silicon design house dependency
