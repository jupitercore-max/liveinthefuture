# Research: STRATOS DAC Scaling Math

## Story Thesis
The world's largest direct air capture plant (STRATOS) opens in Texas Q2 2026, 14× larger than the previous record. But even at full capacity, it captures 0.00125% of global annual CO2 emissions. The IEA says DAC needs to reach 980 Mt/year by 2050. That requires 1,960 STRATOS-scale plants, a learning rate matching solar's best decade, and ~7% of global electricity. This article runs the math nobody else has calculated: the exact learning curve DAC needs to follow, compared to solar's actual trajectory.

## Key Data Points

### Plant Comparison Timeline
| Plant | Location | Year | Capacity (tons CO2/yr) | Scale-up Factor |
|-------|----------|------|----------------------|-----------------|
| Orca | Iceland | 2021 | 4,000 | — |
| Mammoth | Iceland | 2024 | 36,000 | 9× Orca |
| STRATOS | Texas | Q2 2026 | 500,000 | 14× Mammoth, 125× Orca |

### IEA Net Zero Scenario Targets (from IEA DAC 2022 report)
- Current global DAC capacity: ~0.01 Mt CO2/year (10,000 tons)
- 2030 target: 85 Mt CO2/year
- 2050 target: 980 Mt CO2/year

### The Doubling Math (ORIGINAL CONTRIBUTION)
Starting from ~0.55 Mt/year (after STRATOS online):
- To 85 Mt by 2030: log2(85/0.55) = 7.3 doublings in ~4 years = 1 doubling every 6.6 months (IMPOSSIBLE)
- To 980 Mt by 2050: log2(980/0.55) = 10.8 doublings in ~24 years = 1 doubling every 2.2 years (AMBITIOUS but matches solar's growth pace)

Solar comparison: Global solar went from ~40 GW (2010) to ~1,600 GW (2024) = ~5.3 doublings in 14 years = 1 doubling every 2.6 years.

### Cost Economics
- Current DAC cost: >$1,000/ton for plants <50,000 tons/year (Wikipedia/academic sources)
- Projected at 1 Mtpa scale: $94-232/ton (academic modeling)
- STRATOS estimated cost: ~$250-400/ton (industry estimates; offset by 45Q)
- 45Q tax credit: $180/ton for DAC with permanent geological storage
- EU ETS carbon price: ~$55-75/ton
- Voluntary carbon market: ~$5-50/ton

### Learning Rate Calculation (ORIGINAL CONTRIBUTION)
Solar's learning rate: ~20% cost decline per doubling of cumulative capacity
If DAC achieves same 20% rate, starting at ~$400/ton:
- After 10.8 doublings: $400 × (0.80)^10.8 = $400 × 0.097 = ~$39/ton
- Breakeven with 45Q credit: somewhere around doubling 3-4 (~$200/ton)

### Energy Footprint (ORIGINAL CONTRIBUTION)
DAC energy requirement: ~1,500-2,000 kWh thermal + 300-500 kWh electrical per ton CO2
Combined: ~2,000-2,500 kWh per ton CO2

At IEA 2050 scale (980 Mt/year):
980,000,000 tons × 2,000 kWh = 1,960 TWh/year
Global electricity generation 2024: ~29,000 TWh/year
DAC energy share: 1,960 / 29,000 = 6.8% of global electricity

### Infrastructure Needed
980 Mt / 0.5 Mt per plant = 1,960 STRATOS-scale plants by 2050
At ~$1B per plant (rough): ~$2 trillion total capex over 24 years
Annual investment: ~$80B/year (compare: global solar investment ~$350-400B/year in 2024)

### The Oil Paradox
STRATOS is funded by Occidental Petroleum, an oil company. Captured CO2 is planned for both:
- Permanent geological sequestration (carbon removal)
- Enhanced oil recovery (EOR) — using CO2 to extract more oil

The counterargument writes itself: carbon removal funded by carbon extraction.

### Global Emissions Context
Global CO2 emissions: ~40 Gt/year (40,000 Mt/year)
IEA DAC 2050 target (980 Mt): 2.45% of current annual emissions
DAC is for residual/hard-to-abate emissions, not a substitute for emissions reduction

## Sources
1. IEA, "Direct Air Capture 2022" report — 85 Mt by 2030, 980 Mt by 2050
2. IEA, "Net Zero by 2050" roadmap
3. OGJ: "Occidental, 1PointFive expects STRATOS online Q2 2026" (April 2026)
4. Interesting Engineering: "Building the world's largest DAC facility" (Oct 2025)
5. Climeworks: Mammoth press release (36,000 tons/year, 2024)
6. Wikipedia: Direct air capture — cost >$1,000/ton for <50,000 tpa; $94-232/ton at 1 Mtpa
7. Our World in Data: Solar learning rate ~20% per doubling
8. Securities.io: "STRATOS: A New Era for Carbon Capture Stocks" (Feb 2026)
9. WRI: "Direct Air Capture: 6 Things To Know"
10. RMI: "This Decade Is Make-or-Break for Direct Air Capture"

## Kill Test
- ✅ Novel contribution: Learning rate calculation, energy footprint math, doubling timeline comparison
- ✅ 3+ primary sources: IEA report, OGJ, Climeworks, academic cost data
- ✅ 10-star test: Someone would share "I didn't know DAC needs 7% of global electricity"
- ✅ Not covered by LITF recently (last climate was Zara Osman #244 on microplastics)

## Journalist Selection
Anya Volkov — last wrote #250 (Room-Temperature Fusion). Energy/climate beat. Good rotation diversity.

## Category
🌍 Climate — Carbon capture, geoengineering
