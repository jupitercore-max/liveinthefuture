# Research: Humanoid Robot Factory Race — May 2026

## Thesis
Three companies opened humanoid robot factories in the same 120-day window. Nobody has calculated what it costs per hour to operate each one versus a human worker. The math changes everything about when humanoids become economically inevitable.

## Key Sources (Primary)

### 1X Technologies (NEO)
- **Source:** GlobeNewsWire press release, April 30, 2026
- **URL:** https://www.globenewswire.com/news-release/2026/04/30/3285118/0/en/1X-Opens-NEO-Factory-in-Hayward-CA...
- Factory: Hayward, CA. 58,000 sqft. 200+ employees.
- Production: 10,000 NEOs/year capacity. Scaling to 100,000+ by end of 2027.
- Sold out first-year production (10K units) in 5 days after Oct 28 launch.
- Price: ~$20,000 (consumer, early access)
- Tech: NVIDIA Jetson Thor (onboard inference), NVIDIA Isaac Sim/Lab
- VP Manufacturing Vikram Kothari — 8 years at SpaceX (Dragon, Starship, Raptor)
- Vertically integrated: motors, batteries, structures, transmission, soft goods, sensors in-house
- Key quote: "Not dreaming about abundance; we're manufacturing it"

### Figure AI (Figure 03)
- **Source:** Figure AI + Vogon.today analysis, May 2, 2026
- **URL:** https://www.vogon.today/goofynomics/figure-03-one-humanoid-robot-per-hour...
- BotQ factory, California
- Production: 24x increase in 120 days. Now 1 robot/hour.
- 350+ units delivered/operational
- 12,000 units/year target
- First pass yield: >80% general, 99.3% battery line (500+ packs)
- 9,000+ actuators produced (10 different SKUs)
- 80+ functional tests per unit (including physical stress tests)
- 150+ interconnected workstations with proprietary execution software
- Helix S0: full-body control conditioned by stereo camera perception (zero-shot sim-to-real)

### Tesla (Optimus)
- **Sources:** Electrek (Apr 22, 2026), The Robot Report, CleanTechnica (May 1, 2026)
- Fremont production: late July 2026 (replacing Model S/X line)
- Price target: $20,000-$30,000 at scale (Musk, Davos 2026)
- Fremont capacity: designed for 1M units/year
- Giga Texas second plant: targeting 10M units/year
- $25B+ capex 2025-2026
- Gen 3 hands: 50 actuators, 3,000+ task types
- Consumer availability: expected 2027

### Unitree Robotics (G1)
- **Source:** eWeek, 2026
- $610M IPO filing
- Revenue: $250M in 2025 (335% increase)
- Production: 75,000 humanoid units/year capacity
- Price: G1 starting at $16,000 (basic ~$3,930)
- Profitable

### Market Context
- **UBS (Phyllis Wang):** 30,000 humanoid robot units forecast for 2026
- **ROBO ETF:** $300/month lease economics displacing $15-20/hr US labor
- **China:** 84.7% of 2025 global shipments (AgiBot led at 5,168 units shipped)
- **IFR 2026:** Classified humanoids as "proven" technology
- **Global market:** $3B (2023) → $38B by 2035
- **EY projection:** 10 million humanoid robots by 2035

## Original Contribution: Cost-Per-Hour-of-Labor Analysis

Nobody has published a side-by-side $/hour calculation across manufacturers.

### Calculation methodology:
- Assume 5-year useful life (conservative)
- Assume 16 hours/day operational (2 shifts equivalent)
- 350 operational days/year (downtime for maintenance)
- Total hours: 16 × 350 × 5 = 28,000 hours

**Capital cost per hour:**
| Robot         | Price    | $/hr (capital) |
|---------------|----------|----------------|
| 1X NEO        | $20,000  | $0.71          |
| Unitree G1    | $16,000  | $0.57          |
| Tesla Optimus | $25,000  | $0.89          |
| Figure 03     | ~$50,000*| $1.79          |

*Figure hasn't disclosed consumer pricing; estimate from production costs + margin

**Operating costs (estimated per hour):**
- Electricity: ~150W average × $0.15/kWh = ~$0.02/hr
- Maintenance: ~$3,000/year = ~$0.54/hr  
- Software/updates: ~$1,200/year = ~$0.21/hr
- Total operating: ~$0.77/hr

**All-in cost per productive hour:**
| Robot         | All-in $/hr | vs US warehouse ($19/hr) | vs US manufacturing ($28/hr) |
|---------------|-------------|--------------------------|------------------------------|
| Unitree G1    | $1.34       | 93% cheaper              | 95% cheaper                  |
| 1X NEO        | $1.48       | 92% cheaper              | 95% cheaper                  |
| Tesla Optimus | $1.66       | 91% cheaper              | 94% cheaper                  |
| Figure 03     | $2.56       | 87% cheaper              | 91% cheaper                  |

**Key finding:** Even at current prices with conservative assumptions, humanoid robots cost 87-95% less per productive hour than human workers. The question isn't IF they're cheaper — it's when they're capable enough. And that's what the factory race is about: data. Every unit shipped generates training data that makes the next unit more capable.

**vs Chinese factory workers (~$5.50/hr):**
- Unitree G1: $1.34/hr = 76% cheaper than Chinese labor
- This explains why even China is racing to automate

## Counterargument
The strongest counterargument: capability utilization. A human warehouse worker can do 100% of warehouse tasks. Current humanoids can do maybe 15-30% autonomously. Effective cost is $/hr ÷ capability fraction:
- 1X NEO at 20% capability: $1.48 / 0.20 = $7.40/hr effective
- At 50%: $2.96/hr effective
- Crossover with US labor happens at ~8% capability — meaning even primitive humanoids are already cheaper for the narrow tasks they CAN do

## Limitations
- No manufacturer discloses actual operating costs or failure rates
- Useful life assumption (5 years) is unproven — real failure modes unknown
- Productivity fractions (capability %) are estimates; no standardized benchmark exists
- Chinese pricing may include subsidies not reflected in sticker price
- Lease economics ($300/month cited by ROBO ETF) imply different cost structures

## Kill Test: Would I stop scrolling for this? YES
## 10-Star Test: Original cost analysis that changes how you think about the timeline? YES
## Novel contribution: First published $/hr comparison across all 4 major manufacturers + capability crossover math

## Category: 🤖 Robotics
## Journalist: Alex Harmon (hasn't published in recent rotation, covers tech/industry)
## Headline candidates:
1. "Three Companies Opened Humanoid Robot Factories in 120 Days. At $1.48 Per Hour, the Math Against Human Workers Was Already Done."
2. "A Humanoid Robot Now Costs $1.48 Per Hour to Operate. A Warehouse Worker Costs $19. The Factory Race Isn't About Robots — It's About Data."
3. "Figure Makes One Humanoid Robot Per Hour. 1X Sold 10,000 in Five Days. The Real Number Nobody Published: $1.48."
