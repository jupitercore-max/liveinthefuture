# ASML Q2 2026 Capacity Expansion Math — Research

## News Hook
ASML Q2 2026 earnings released July 15, 2026. Beat expectations across the board.

## Key Data Points

### ASML Q2 2026 Earnings (source: ASML press release, Reuters, Barron's)
- Q2 revenue: €9.3B (vs €8.8B consensus), up 21.2% YoY
- Gross margin: 54.0% (vs 51-52% guidance)
- EPS: $8.65 (vs $7.93 consensus, beat by $0.72)
- Full-year 2026 guidance RAISED: €43-45B (up from €36-40B — 16% midpoint increase)
- Full-year gross margin: 54-56%
- Q3 2026 guidance: €11.0-12.0B revenue, 55-57% gross margin
- Market cap: €610B (~$696B)
- Stock up ~4% on earnings, already up ~70% YTD

### Capacity Expansion Plan (from CEO Christophe Fouquet)
- 2026 low-NA EUV capacity: ~65 systems
- 2027 target: +30% → ~85 systems
- 2028: investigating +30% → ~110 systems
- 2026 DUV immersion capacity: ~130 systems
- 2027 DUV target: +30% → ~169 systems
- 2028: investigating +30%
- Nearly all expanded EUV capacity through 2027 ALREADY FULLY BOOKED
- ASML aims to ship ~60 EUV tools in 2026, ~80 in 2027
- Could theoretically ship 90 without adding physical capacity (JPMorgan estimate: 110)
- Terafab (Musk/SpaceX/Tesla/xAI) factored into expansion plans (CFO confirmed)
- Intel confirmed using High-NA EUV in production (landmark milestone)
- Install base business growing 30%+ this year (upgrades + service)

### EUV System Throughput (from ASML, Tom's Hardware, TechSpot)
- NXE:3800E (current flagship low-NA): 220-230 WPH at 600W source
- Roadmap: 330 WPH by ~2030 at 1,000W source (50% increase)
- Future NXE:4200G: 300+ WPH by 2029-2030
- High-NA EXE:5200D: 175+ WPH (for sub-2nm)
- Each EUV system costs ~$300 million
- Takes ~1 year to build

### EUV Layers Per Process (from WikiChip, IEEE, SemiWiki)
- N7+ (TSMC): 4 EUV layers
- N5 (TSMC): 10-14 EUV layers ("more than 10" per IEDM paper)
- N6 (TSMC): 5 EUV layers
- N3B (TSMC): ~25 EUV layers (80% increase over N5)
- N3E (TSMC): ~19 EUV layers (3 double-patterning layers → single EUV)
- N2 (TSMC): expected modest increase over N3E, likely ~20-22
- ASML's 2018-2019 rule: 1 EUV layer = 1 scanner per ~45,000 WSPM

### TSMC Capacity (from WCCFTech, TrendForce, TechPowerUp)
- 3nm capacity end-2025: ~120-130K WPM → target 180K WPM end-2026 (+40% YoY)
- 2nm capacity: mass production began late 2025, ramping to ~100K WPM by end-2026
- 2nm wafer cost: ~$30,000 per wafer (50% premium over 3nm, 3nm already ~$20K)
- CoWoS packaging: ramping to 130K WPM by late 2026 (quadrupling from 2024)
- Fab 22 Kaohsiung (2nm): P1 operational, P2/P3 under construction
- Fab 20 Hsinchu (2nm): P1 volume production, P2 tooled
- 2nm yield: hitting 70% during ramp-up (per TSMC reports)
- Arizona Fab 2: 3nm mass production 2H 2027
- Kumamoto Fab 2: 3nm mass production 2028
- Supply shortage dragging into 2027 per TSMC CEO C.C. Wei

### GPU Die Economics (from Tom's Hardware, FourWeekMBA)
- H100/H200 (GH100): 814mm² die, TSMC 4N, ~65 dies per 300mm wafer
- B200: 2× GB100 dies + CoWoS packaging
- B200 BOM breakdown: Logic die $900 (14%), HBM $2,900 (45%), Packaging $1,100 (17%), Yield loss $1,000 (16%)
- TSMC 4NP wafer cost: ~$17,000
- B200 die yield: 40-70%, centered at ~60%
- Key insight: packaging + yield ($2,100) exceeds logic fabrication ($900) by 2.3x

## Original Calculation: What 20 Additional EUV Systems Actually Mean

### Step 1: How Many New Systems for AI Chips?
- ASML adding ~20 low-NA EUV systems (65→85) in 2027
- Customers: TSMC, Samsung, SK Hynix, Micron, Intel, Terafab
- Memory makers (DRAM) now consuming EUV at scale — ASML reports 75% memory revenue growth
- Estimate: ~40-50% of new systems go to leading-edge logic (TSMC/Intel for AI GPUs)
- That's ~8-10 additional EUV systems for AI-class logic

### Step 2: How Much Wafer Capacity Do They Unlock?
- At N3 (~20 EUV layers), need ~20 EUV tools per 45K WSPM
- Each new EUV tool handles one layer for ~45-60K WSPM (throughput improving)
- 10 additional EUV tools for logic = 0.5 fab-equivalents at N3 (for 45K WSPM)
- That's ~22,500-25,000 additional WSPM on leading-edge logic
- At N2 (more EUV layers), capacity per system is lower

### Step 3: How Many GPU-Class Dies?
- H100-class die (814mm²): ~65 dies per wafer
- B200-class die (GB100, ~400mm² each, 2 per GPU): ~120 dies per wafer
- At 60% yield: 39 good H100-dies or 72 good GB100-dies per wafer
- 25,000 wafers/month × 39 good dies × 12 months = 11.7M H100-equiv dies/year
- BUT: Apple, Qualcomm, AMD, MediaTek share this capacity
- Nvidia gets estimated 30-40% of TSMC leading-edge: ~3.5-4.7M additional GPU dies/year

### Step 4: How Does This Compare to Demand?
- Hyperscaler AI capex: $725B+ committed for 2025-2027
- GPU/accelerator spend ≈ 30-40% of total capex ≈ $220-290B
- At $30K average per GPU: 7-10M GPUs demanded per year
- Current Nvidia datacenter GPU shipments: estimated 3-5M/year
- Gap: 2-7M GPUs/year
- ASML expansion contribution to closing this gap: 3.5-4.7M dies (generous estimate)
- But some of that replaces retiring older tools, not pure addition

### The Punchline
ASML's 30% EUV capacity increase sounds dramatic, but after distributing 20 new systems across 5+ customers, splitting between logic and memory, and accounting for the 20+ EUV layers each leading-edge chip requires, it translates to maybe 3-5 million additional GPU-class dies per year. That narrows the chip gap but doesn't close it. The AI boom is still gated by a factory in Veldhoven that takes a year to build each $300M machine.

## Differentiation from Existing LITF Story
- `asml-euv-bottleneck-ai-chip-ceiling` (by Zara Osman) focused on the installed base ceiling (~280 machines, 30M wafers/year shared pipeline)
- This story: news-pegged to TODAY's Q2 2026 earnings, focused on the EXPANSION math — what the announced 30% capacity increase actually translates to in GPU-equivalent output
- New angles: Terafab as new demand factor, memory EUV explosion (75% growth), the packaging bottleneck overtaking lithography, 2nm wafer economics ($30K/wafer)

## Sources
1. Reuters — "ASML capacity upgrade soothes AI chip bottleneck fears" (Jul 15, 2026)
2. ASML Q2 2026 Press Release via StockTitan (Jul 15, 2026)
3. Reuters Breakingviews — "ASML helps keep the AI capex snowball rolling" (Jul 15, 2026)
4. Barron's — "ASML Stock Gains as Earnings Ride the Wave of AI Spending" (Jul 15, 2026)
5. MarketBeat — ASML Q2 2026 earnings transcript (Jul 15, 2026)
6. Reuters — "Chip toolmaker ASML expected to shine light on capacity" (Jul 14, 2026)
7. TechPowerUp — "TSMC Will Have Four 2nm Plants by 2026" (Jan 2026)
8. WCCFTech — "TSMC 3nm & 2nm Wafer Output To Be Boosted By 20%" (Apr 2026)
9. TrendForce — "TSMC 3nm Monthly Capacity May Hit 180K Wafers" (Apr 2026)
10. Tom's Hardware — "Nvidia to Triple Output of Compute GPUs" (historical, H100 die size/yield)
11. FourWeekMBA — "The 14% Paradox: Nvidia GPU Silicon Costs Less Than Packaging" (Apr 2026)
12. WikiChip/FUSE — "TSMC N3, And Challenges Ahead" (N3 EUV layer count)
13. IEEE Spectrum — TSMC 5nm EUV layer count (IEDM 2019)
14. ASML LinkedIn post — NXE:3800E 230 WPH throughput (Jul 2026)
15. TechSpot — "ASML pushes EUV power to 1,000 watts" (Feb 2026)
16. Motley Fool / Reuters — Terafab-ASML relationship (Jun 2026)
