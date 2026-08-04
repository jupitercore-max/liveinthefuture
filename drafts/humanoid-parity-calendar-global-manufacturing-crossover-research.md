# Research: The Parity Calendar — When Humanoid Robots Undercut Human Workers by Country

## Angle
Nobody has built a systematic country-by-country crossover calendar showing when humanoid robot TCO drops below manufacturing labor costs. We build one using verified cost curves and official wage data.

## Novel Contribution
A "Parity Calendar" — original calculation cross-referencing humanoid robot cost trajectories with BLS/Eurostat/ILO manufacturing wage data to determine the year each major manufacturing country hits the wage-parity crossover.

## Primary Sources

### Robot Unit Costs (2026)
- **Western unit cost:** $90,000–$100,000 per unit (Bank of America 2026 analysis)
  - Source: iiot-world.com, citing BofA 2026 report
- **Chinese BOM cost:** ~$35,000 per unit
  - Source: Goldman Sachs data, cited in Deloitte 2026 Tech Trends
- **Cost decline rate:** 40% between 2023 and 2024 (Goldman Sachs/Deloitte)
  - Source: iiot-world.com Physical AI Deployment ROI article
- **BofA projection:** Unit costs below $17,000 by 2030
  - Source: Bank of America 2026 analysis via iiot-world.com
- **Figure AI RaaS pricing:** $25/hr at BMW Leipzig (wage parity with line workers)
  - Source: YouTube analysis + TechFastForward article
- **Humanoid-specific funding:** $4.3B in 2025, up from $700M in 2018 (6× in 7 years)
  - Source: Bank of America via iiot-world.com

### Production Scale Data
- **Global 2025 shipments:** ~13,000 units total
  - China: ~90% (Unitree 5,500 + AGIBOT 5,168 + others)
  - US: ~450 total (Figure, Agility, Tesla ~150 each)
  - Source: YouTube analysis "China Shipped 90%..."
- **AGIBOT:** 15,000 cumulative robots shipped (Jun 2026), 39% global market share (Omdia)
  - Production ramp: 2 years to 1K → 1 year to 5K → 3 months to 10K → 3 months to 15K
  - Source: AGIBOT PR Newswire, Robotics Intl, Interesting Engineering
- **Figure AI BotQ:** 1 robot/day → 1 robot/hour in 120 days (24× improvement)
  - 350+ Figure 03 units delivered, targeting 12,000/year → 100,000 over 4 years
  - Source: TechFastForward
- **Unitree:** Forecasting 20,000 units in 2026; G1 listed on Amazon at ~$16,000
  - Source: YouTube analysis
- **State Grid China (SGCC):** ¥5.8B (~$800M) procurement for 8,500 embodied intelligence devices
  - 500 humanoids at ¥2.5B ($345M) = $690K per unit (high-spec live-line work)
  - 5,000 quadruped robot dogs at ¥1.5B
  - 3,000 dual-arm inspection robots at ¥1.8B
  - Source: LinkedIn/OFweek report

### Real Deployment Data
- **Figure 02 at BMW Spartanburg:** 11-month pilot, 30,000+ X3 vehicles, 90,000+ sheet-metal components, ~1,250 operating hours
  - Source: TechTimes, WebProNews
- **Figure 03:** Deployed at BMW for logistics sequencing; Leipzig pilot summer 2026
  - 40 robots, 3 plants (Spartanburg, Munich, Regensburg)
  - Source: Interesting Engineering
- **Agility Digit at GXO Logistics:** 100,000+ totes moved, first commercial RaaS humanoid deployment
  - Source: TechTimes Robotics Summit article
- **Boston Dynamics Atlas:** Entire 2026 production committed to Hyundai + Google DeepMind
  - Source: TechTimes
- **Figure 03 endurance:** 200 consecutive hours sorting packages, zero failures, zero human intervention
  - Self-managed battery swaps (messaged colleague, walked to dock)
  - Source: LinkedIn/Innovation Network

### Manufacturing Wages by Country (2025-2026, total compensation per hour)
- **United States:**
  - All manufacturing employees: $36.71/hr (BLS Jun 2026)
  - Production/nonsupervisory workers: $30.27/hr (BLS Jun 2026)
  - Team assemblers: $22.19/hr median (BLS 2025)
  - Helpers/production workers: $18.92/hr median (BLS 2025)
  - Source: BLS FRED, Current Employment Statistics
- **Germany:**
  - Manufacturing compensation: €49.50/hr (~$54/hr) (Destatis Q4 2025)
  - Manufacturing gross wages: €45.20/hr (~$49/hr)
  - Source: Destatis via CEIC
- **France:** €47.10/hr manufacturing (~$51/hr) (Destatis)
- **Denmark:** €55.00/hr manufacturing (~$60/hr) (Destatis) — highest in EU
- **EU-20 average:** €40.80/hr manufacturing (~$44/hr) (Destatis)
- **Italy:** €32.80/hr manufacturing (~$36/hr) (Destatis)
- **Japan:** ~$26-28/hr (estimated from OECD/ILO data)
- **South Korea:** ~$24-27/hr (estimated from OECD/ILO data)
- **China:** ~$7-8/hr manufacturing (estimated from multiple sources)
- **Mexico:** ~$4.50-5.50/hr (estimated)
- **Vietnam:** ~$2.50-3.50/hr (estimated)
- **India:** ~$2-3/hr (estimated)

## Original Calculation: The Parity Calendar

### Assumptions for Robot TCO Model
- **Operating scenario A (Conservative — 2-shift, 80% uptime):**
  - Hours/year: 2 × 8 × 260 × 0.80 = 3,328 hrs/yr
- **Operating scenario B (Aggressive — 3-shift, 85% uptime):**
  - Hours/year: 3 × 8 × 365 × 0.85 = 7,446 hrs/yr
- **Useful life:** 3 years (industry standard for depreciating industrial equipment)
- **Annual maintenance:** 12% of unit cost
- **Energy:** ~0.5 kW average × local electricity rate × operating hours
- **Integration (Year 1):** 25% of unit cost, amortized over 3 years
- **Supervision:** 1 human per 10 robots at local supervisory wage

### TCO Calculation at $95K Unit Cost (Western, 2026)

**Scenario A (2-shift):**
- Amortization: $95K / 3 = $31,667/yr
- Integration: ($23,750 / 3) = $7,917/yr
- Maintenance: $11,400/yr
- Energy: 0.5kW × $0.12 × 3,328 = $200/yr
- Supervision: ~$6,000/yr (1/10 of $60K supervisor)
- **Total: $57,184/yr ÷ 3,328 hrs = $17.18/hr**

**Scenario B (3-shift):**
- Same annual fixed costs: $57,184
- Energy higher: 0.5kW × $0.12 × 7,446 = $447
- **Total: $57,431/yr ÷ 7,446 hrs = $7.71/hr**

### TCO at $35K Chinese BOM (2026)
**Scenario B (3-shift):**
- Amortization: $35K / 3 = $11,667
- Integration: ($8,750 / 3) = $2,917
- Maintenance: $4,200
- Energy: $447
- Supervision: $2,000
- **Total: $21,231/yr ÷ 7,446 hrs = $2.85/hr**

### Applying 40% Annual Cost Decline to Western Unit:

| Year | Unit Cost | 2-Shift TCO/hr | 3-Shift TCO/hr |
|------|-----------|----------------|----------------|
| 2026 | $95,000   | $17.18         | $7.71          |
| 2027 | $57,000   | $11.14         | $5.00          |
| 2028 | $34,200   | $7.56          | $3.39          |
| 2029 | $20,500   | $5.41          | $2.43          |
| 2030 | $17,000*  | $4.86          | $2.18          |

*BofA floor projection

### THE PARITY CALENDAR (2-Shift Conservative Model)

| Country | Mfg Wage ($/hr) | Parity Year | Notes |
|---------|-----------------|-------------|-------|
| Denmark | ~$60 | **Already passed (2026)** | Robot at $17/hr vs $60/hr |
| Germany | ~$54 | **Already passed (2026)** | Robot at $17/hr vs $54/hr |
| France  | ~$51 | **Already passed (2026)** | |
| US (all employees) | $36.71 | **Already passed (2026)** | |
| EU-20 avg | ~$44 | **Already passed (2026)** | |
| Italy | ~$36 | **Already passed (2026)** | |
| US (production) | $30.27 | **Already passed (2026)** | |
| Japan | ~$27 | **Already passed (2026)** | |
| South Korea | ~$25 | **Already passed (2026)** | |
| US (team assemblers) | $22.19 | **Already passed (2026)** | |
| US (helpers) | $18.92 | **2026** | At the margin |
| China | ~$7.50 | **2028** | Chinese-built robots hit ~$3.39/hr |
| Mexico | ~$5.00 | **2028-2029** | |
| Vietnam | ~$3.00 | **2029-2030** | |
| India | ~$2.50 | **2029-2030** | |

### Key Insight
The stunning finding: **parity has already been reached for every developed-country manufacturing sector.** The $17/hr conservative TCO is below manufacturing wages in every OECD country. The question is no longer IF but HOW FAST deployment scales.

Even more dramatic: at 3-shift utilization ($7.71/hr), humanoid robots are already cheaper than Chinese factory workers ($7-8/hr) RIGHT NOW — if you're using Western-built robots. Chinese-built robots at $35K BOM are at $2.85/hr on 3-shift, which is below Vietnam and approaching India.

The bottleneck isn't cost — it's capability and production volume.

## Limitations
1. Robot capability is NOT equivalent to human versatility — robots can currently handle ~15-20% of manufacturing tasks (structured, repetitive)
2. The 40% annual cost decline may not sustain — we're extrapolating from one year of data
3. Operating hours assumptions are generous — BMW pilot achieved only 1,250 hours in 11 months
4. Integration and training costs are uncertain and may be higher for complex tasks
5. Wage data doesn't capture the full cost of displacement (retraining, social costs)
6. Chinese BOM costs may not reflect true landed costs including IP licensing, software

## Strongest Counterargument
The cost-parity framing overstates readiness because it conflates price with capability. A humanoid robot at $17/hr that can perform exactly 3 tasks (pick, place, inspect) is not substitutable for a $30/hr human who can do 200 tasks, troubleshoot, communicate with colleagues, and adapt to production changes in real time. The real parity metric isn't cost-per-hour — it's cost-per-task-successfully-completed, and on that measure, humans still dominate. Figure 02 handled 90,000 components across 1,250 hours at BMW — impressive, but that's exactly one task in one station. The Parity Calendar tells you when robots become cheaper than humans for the tasks robots can already do. It says nothing about when they can do everything humans do. That second calendar is much further out.
