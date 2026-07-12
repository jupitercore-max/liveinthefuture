# Research: HBM Yield Cliff — Why $800B Can't Fix the Memory Shortage

## Thesis
SK Hynix's CEO declared 2027 will be the worst memory shortage in history, despite $800B+ in investment commitments. The binding constraint isn't capital — it's the yield math of HBM stacking. Every additional layer in a high-bandwidth memory stack compounds yield loss exponentially, and the equipment to grind/bond wafers at scale is monopolized by companies that can't ramp fast enough.

## Key Sources

### SK Hynix CEO Interview — Reuters, July 11, 2026
- CEO Kwak Noh-jung: "Next year will be the worst year in the industry's history from the supply perspective"
- "Customer demand continues to go up, while our capacity has limitations"
- "Customer demand will remain higher than our supply capacity even beyond 2030"
- SK Hynix shares up 13.3% to $168.85 on Nasdaq debut
- Operating profit hit record 47 trillion won ($31B) in 2025, double prior year
- April-June 2026 operating profit projected at 65.5 trillion won
- $4B advanced chip packaging factory in Indiana
- $10B AI solutions company in US
- Shares up 7x in past 12 months despite 18% recent pullback
- US, Japan, Southeast Asia all under consideration for new fabs

### Micron Investment — Reuters, July 9, 2026
- $250B US investment through 2035 (up from $200B, itself up from $170B)
- $3B for US semiconductor supply chain strengthening
- $500M for GlobalWafers 300mm facility in Sherman, Texas
- 10-year supply agreement with GlobalWafers

### South Korea Semiconductor Plan — June 29, 2026
- Samsung + SK Hynix: 400 trillion won ($266B each) = $532B total
- Part of broader 911 trillion won ($591B) national plan
- Goal: double memory chip production capacity in 5 years

### HBM Yield Data — SemiAnalysis
- Per-bond-step yield compounds: x^n for n bond steps
- At 99%/step: 8-Hi = 93%, 12-Hi = 90%, 16-Hi = 86%
- At 97%/step: 8-Hi = 81%, 12-Hi = 72%, 16-Hi = 63%
- "All manufacturers have absolute yields well below what they're accustomed to compared to conventional memory wafers"
- "HBM failures are the number one cause of GPU failures"
- SK Hynix yields better than Samsung; Samsung's low yields paradoxically tighten supply

### TrendForce Data
- Overall HBM yield: ~65% (industry average)
- "If any of the HBM chips are defective, the entire stack is discarded"

### SK Hynix HBM3E Yield
- Hit 80% yield per TweakTown, which cut mass production times 50%
- 12-Hi mass production started September 2024

### HBM4 Yield — Eureka/Patsnap
- Early HBM4 production: below 65% yield
- Mature HBM3: exceeds 85% yield
- 15-20% yield reduction transitioning 8-Hi → 12-Hi
- "Potentially greater reductions for 16-Hi configurations"

### Samsung HBM4 Logic Die — SemiWiki
- Samsung 4nm logic die test yield: exceeds 40%
- "Usually foundry process starts at 10% level and yield increases in mass production"
- Samsung uses TC-NCF packaging (different from SK Hynix)

### Equipment Monopolies — Temple8Capital
- DISCO Corporation (6146.T): ~80% of global precision dicing and grinding
- BE Semiconductor (BESI.AS): global leader in hybrid bonding equipment
- Hanmi Semiconductor: near-monopoly on thermocompression bonders for HBM at SK Hynix
- Hanmi had 100% share at SK Hynix until Hanwha won order at HIGHER price

### HBM4 Technical Specs
- Interface width: 2048-bit (double HBM3E's 1024-bit)
- Bandwidth: up to 2.8 TB/s per stack
- JEDEC relaxed thickness to 775μm for 16-Hi stacks
- Logic base die: manufactured at TSMC advanced logic nodes
- "Triangular alliance" model: memory maker + foundry + equipment company

### Bank of America
- Hyperscaler capex: ~$851B in 2026, ~$1.15T in 2027
- Memory = 35-40% of AI infrastructure spend

### UBS
- Global DRAM undersupplied until at least Q2 2028

### Jensen Huang
- Memory shortages will continue "for several years"
- SK Hynix will remain Nvidia's largest memory supplier

### Nanya Technology — Q2 2026
- Revenue: +684% YoY
- Net income: +1,324% YoY
- Gross margin: from -20.6% to +79.5%
- Capex: $6.2B in 2027 (~4x 2026)

## Original Calculation: The Yield Cliff

### The Compound Yield Tax
If per-bond-step yield is y, and you have n layers (requiring n-1 bond steps):
- Stack yield = y^(n-1)

| Per-step yield | 8-Hi yield | 12-Hi yield | 16-Hi yield | 16-Hi vs 8-Hi loss |
|---------------|-----------|------------|------------|-------------------|
| 99% | 93.2% | 89.5% | 86.0% | -7.7% |
| 98% | 86.8% | 80.1% | 73.9% | -14.9% |
| 97% | 80.8% | 71.5% | 63.3% | -21.6% |
| 96% | 75.1% | 63.7% | 54.0% | -28.1% |
| 95% | 69.8% | 56.9% | 46.3% | -33.7% |

SK Hynix's 80% HBM3E yield for 8-Hi implies ~97% per-bond-step yield.
At that same 97% per step, 16-Hi HBM4 drops to 63.3%.

But it's worse: HBM4 adds a logic base die manufactured by TSMC on advanced nodes (4nm/5nm). If that die has 85% yield (typical for leading-edge logic), the effective stack yield becomes:
- 16-Hi + logic die: 0.85 × 0.97^15 = 0.85 × 0.633 = 53.8%

Nearly half of all 16-Hi HBM4 stacks get thrown away.

### The Wafer Consumption Tax
Standard DDR5: 1 die = 1 output chip
HBM3E 8-Hi: 8 DRAM dies + 1 base = 9 good dies for 1 output chip
HBM4 16-Hi: 16 DRAM dies + 1 logic die = 17 good dies for 1 output chip

But at 54% stack yield, you need ~31.5 input dies per good output chip (17 / 0.54).
For standard DDR5 at ~95% yield: ~1.05 input dies per good output chip.

Ratio: HBM4 consumes 30x more wafer area per good output chip than standard DDR5.

### What $800B Buys (And Doesn't)
- A greenfield fab costs ~$20B and takes 3-5 years to reach volume production
- $800B ÷ $20B = 40 new fabs (theoretical maximum)
- 40 fabs × 100K wafers/month each = 4M additional wafers/month
- But HBM4 consumes 30x more wafer area, so 4M wafers → ~133K equivalent HBM4 stacks/month
- Even this generous math ignores: equipment delivery times (ASML lithography lead times are 2+ years), qualified workforce recruitment, and the fact that the bonding/grinding bottleneck is separate from wafer production
