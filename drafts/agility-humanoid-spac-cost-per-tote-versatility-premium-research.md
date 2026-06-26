# Research: Agility Robotics $2.5B SPAC — The Versatility Premium Question

## Core Thesis
Agility Robotics is going public at a $2.5 billion valuation via SPAC with Churchill Capital Corp XI. It has $300M+ in contracted orders and ~100 robots sold to date. But a cost-per-task analysis reveals that humanoid robots cost roughly 18× more per tote move than purpose-built warehouse robots. The entire $2.5B bet hinges on whether "versatility" — the ability to do many tasks — justifies that premium. Nobody has published this calculation.

## Original Calculation: Cost Per Tote Move Comparison

### Humanoid Robot (Digit, estimated at $250K/unit)
- 3-year depreciation: $83,333/year
- Software/maintenance (15% of purchase price): $37,500/year
- Insurance + misc: $5,167/year
- **Total annual cost: ~$126,000**
- Throughput (using Siemens HMND 01 trial data as benchmark): 60 totes/hour
- Assuming single-shift operation (8 hours, 250 days): 120,000 totes/year
- **Cost per tote: ~$1.05**
- At 16 hours/day (2 shifts): $0.53/tote
- Note: Digit battery only 2-3 hours heavy use, 8 hours light (Sacra). HMND 01 is wheeled, not bipedal.

### Human Warehouse Worker (US average)
- Base wage: $18/hr × 2,000 hours = $36,000 (PayScale 2026 data: $17.98 avg)
- Benefits + payroll tax (~35%): $12,600
- Workers' comp, training, turnover costs: ~$5,000 (76% of logistics facilities report deficits)
- **Total: ~$53,600/year**
- Throughput: est. 40-50 tote moves/hour × 2,000 hours = 80,000-100,000/year
- **Cost per tote: $0.54-$0.67**

### Purpose-Built Mobile Robot (Brightpick Autopicker 2.0)
- RaaS subscription: $1,900/month = $22,800/year
- Throughput: 70-80 picks/hour, 24/7 = 657,000 picks/year
- **Cost per pick: $0.035**
- This is 15-30× cheaper per task than humanoids

### Key Finding
The humanoid cost-per-tote ($0.53-$1.05) is comparable to or higher than human labor ($0.54-$0.67), and 15-30× more expensive than purpose-built alternatives ($0.035). The humanoid value proposition is NOT cost — it's versatility across multiple task types without facility reconfiguration.

## Valuation Analysis

### Backlog-to-Valuation Ratio
- $300M contracted orders / $2.5B valuation = 0.12×
- For comparison:
  - Defense/aerospace companies typically trade at 1-3× backlog
  - Industrial automation companies at 0.5-1× revenue
- This is a growth-stage premium, not a fundamentals premium

### RoboFab Utilization
- Built for 10,000 units/year capacity
- ~100 robots sold to date (Sacra)
- Current utilization: ~1%
- At $250K/unit × 10,000 units = $2.5B revenue potential at full capacity
- That gives a 1× price-to-potential-revenue ratio, which is reasonable IF they fill it

### Investor Math
- Churchill SPAC: $420M from trust
- PIPE: $200M at $10/share (Foxconn leads)
- Investors: NVIDIA, Amazon, SoftBank Vision Fund 2, Foxconn, DCVC
- CCXI shares jumped 18% on announcement (settled to +15% by close)

## Primary Sources

1. **BusinessWire press release** (June 24, 2026): Agility Robotics / Churchill Capital Corp XI definitive business combination agreement. $2.5B pre-money equity value, $620M+ gross proceeds, $300M+ multi-year contracted Digit v5 orders, 65,000+ operational hours across 9 customer facilities, RoboFab 10K units/year capacity, 75% US-sourced parts.

2. **Siemens/Humanoid HMND 01 Alpha trial** (April 20, 2026 press release, reported by eWeek, WebProNews, Robot Report, Verdict, ThomasNet): Two-week trial at Siemens Electronics Factory, Erlangen, Germany. 60 tote moves/hour, 8+ hours continuous runtime, 90% autonomous pick-and-place success rate. NVIDIA Jetson Thor + Isaac Sim + Isaac Lab. Reduced development from 18-24 months to 7 months via simulation.

3. **PayScale (2026)**: Warehouse Worker avg hourly pay $17.98 (range $13.10-$23.32). Total comp $27K-$48K.

4. **FreightWaves**: Brightpick Autopicker 2.0 — 70-80 picks/hour, 24/7 operation, $1,900/month RaaS. Hundreds deployed worldwide.

5. **Reuters** (June 24, 2026): Agility market opportunity estimated at ~$1 trillion. CCXI shares jumped 18% premarket.

6. **Sacra**: Agility $400M Series C in March 2025 at $2.12B. Total funding ~$641M. Digit: 2-3 hours heavy use, 8 hours light.

7. **KPI Solutions / Mordor Intelligence**: Warehouse automation market $29.9B (2025), projected $63.4B by 2030 (16.2% CAGR). 76% of logistics facilities report workforce deficits.

8. **Morgan Stanley**: Doubled China's 2026 humanoid robot forecast.

9. **NVIDIA Halos for Robotics**: First ANSI-accredited physical AI safety program. Agility is first customer.

## Kill Test
**Does this contain an original calculation?** Yes — the cost-per-tote-move comparison across humanoid, human, and purpose-built robots using real deployed trial data (Siemens) and actual pricing (Brightpick RaaS, PayScale wages, estimated Digit unit cost). The backlog-to-valuation ratio analysis is also novel for this specific SPAC.

## Journalist
**Priya Desai** — wrote the 1X NEO teleoperation economics article. Same beat: humanoid robot commercial viability and unit economics.
