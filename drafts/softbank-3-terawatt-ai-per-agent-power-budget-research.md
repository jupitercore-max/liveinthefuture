# Research: SoftBank 3 TW AI Per-Agent Power Budget
**Date:** 2026-07-14

## Primary Sources

1. **Reuters (Jul 14, 2026):** Son's speech at SoftBank annual corporate conference in Tokyo
   - $5 trillion/year AI investment by 2040
   - 3 TW of AI data center power by 2040
   - "1.8 times total current global power consumption"
   - 100 trillion AI agents by 2040
   - "20% of global GDP" from AI revenue
   - Gas first, then nuclear fusion
   - SoftBank's OpenAI investment: >$60B before end of 2026
   - Quote: "We will go from a human-centric world to an agent-centric world."

2. **IRENA Renewable Capacity Statistics 2026:**
   - Global renewable capacity end 2025: 5,149 GW
   - Total global installed power capacity: ~10,400 GW (~10.4 TW)
   - 692 GW renewables added in 2025, 85.6% of all new capacity

3. **IEA Global Energy Review 2026:**
   - Global annual renewable capacity additions: ~800 GW in 2025
   - Total global electricity generation 2025: ~30,500 TWh

4. **EIA STEO (Jul 8, 2026):**
   - US power demand 2025: 4,195 billion kWh (record)
   - Projected: 4,269B kWh (2026), 4,399B kWh (2027)

5. **Gizmodo (Jul 12, 2026):**
   - US data center power: 31 GW currently, projected 66 GW by 2027

6. **Reuters/Meta (Jul 10, 2026):**
   - Meta deploying 7 GW computing infrastructure in 2026
   - Planning 14 GW total by 2027
   - ~$145B capex 2026

7. **Bernstein (Jul 12, 2026):**
   - 35-40% of announced data center capacity at risk of delay/cancellation
   - Grid interconnection queues: 3-4 years
   - Transformer lead times: 80-100 weeks
   - Construction costs up 20-25% since 2023

## Original Calculations

### Per-Agent Power Budget
- 3 TW / 100 trillion agents = 30 milliwatts per agent
- 30 mW = less than a single LED, less than a Bluetooth chip in standby
- A smartphone SoC at idle: ~200-500 mW (7-17x more)
- A single NVIDIA H100: ~700W at peak

### Utilization math:
| Concurrency | Active Agents | W/Active Agent | Physical Equivalent |
|---|---|---|---|
| 100% | 100 trillion | 0.03 W | Below any useful compute |
| 10% | 10 trillion | 0.3 W | Smartwatch-class |
| 1% | 1 trillion | 3 W | Raspberry Pi |
| 0.1% | 100 billion | 30 W | Laptop CPU |
| 0.01% | 10 billion | 300 W | Single GPU server |
| 0.001% | 1 billion | 3,000 W | GPU cluster |

### Infrastructure Build-Out
- Current global AI data center power: ~80-100 GW (estimated)
- Growth needed: ~2,900 GW over ~14 years
- Required: ~207 GW/year of new AI-dedicated generation
- Global ALL new capacity in 2025: ~800 GW
- AI alone would need 26% of current total global annual additions
- At $1-2/W: $2.9-5.8 trillion one-time capital for generation alone

### $5T/year in Context
- Global GDP 2025: ~$110 trillion
- $5T = 4.5% of current GDP
- Current global IT spending (Gartner 2025): ~$5.3 trillion
- Son's claim: would roughly DOUBLE global IT spending
- If GDP grows 3%/yr to 2040: ~$165T → 20% = $33T AI revenue → $5T/$33T = 15% cost ratio (actually plausible as COGS)

### What 3 TW looks like physically
- US total generation capacity: ~1.3 TW
- EU total: ~1.0 TW
- 3 TW = US + EU + Japan + more
- In nuclear reactors: ~2,700 (at 1.1 GW each)
- In gas turbines: ~2,000 modern CCGT plants
- In solar at 30% CF: 10,000 GW of panels

## Kill Test
- Does this article add something nobody else has? YES — the per-agent power budget math reveals a fundamental constraint on what "100 trillion agents" can actually mean. Nobody has divided 3 TW by 100 trillion and worked out the utilization implications.
- Is the novel calculation verifiable? YES — simple division with cited power numbers.
- Strongest counterargument: By 2040, inference efficiency may improve 100-1000x from current levels. At 1000x more efficient chips, 30 mW buys you what 30W buys today — a full laptop. Jevons' paradox suggests efficiency gains get consumed by demand, but the improvement rate matters.
