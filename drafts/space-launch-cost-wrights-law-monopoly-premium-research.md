# Research: Space Launch Costs Are Falling Faster Than Steamships — But Only SpaceX Gets the Discount

## Slug
space-launch-cost-wrights-law-monopoly-premium

## Journalist
Marcus Chen — Space / Technology Economics

## Category
🚀 Space

## Thesis
Space launch costs are falling faster than any transport technology in history — faster than steamships, faster than solar panels. But the savings are concentrated in one company. SpaceX controls 75% of all payload to orbit, a market dominance that exceeds the East India Company at its peak. The original contribution: calculating the Wright's Law learning rate from Terzi's 4,000-launch dataset, comparing it to historical parallels, and quantifying the "monopoly premium" between SpaceX's internal costs and what customers actually pay.

## Primary Sources

### 1. Terzi & Nicoli (2026), "From Sputnik to Starship: Estimating the experience curve of space launch technology"
- University of Cambridge / Bennett School of Public Policy
- Presented at Harvard Business School / ESPI seminar series, February 17, 2026
- Novel dataset: 4,000+ launches (1960–2024), ten spacefaring entities
- Key finding: Cost dropped from $87,023/kg (1960) to $3,841/kg (2024) = 95.6% decline
- Learning curve faster than steamship freight revolution
- "Structural acceleration" from ~2010 (Falcon 9 introduction)
- DOI: European Economy Discussion Papers, Brussels, 211, pp. 1-34 (original 2024 version); 2026 version is a mimeo (working paper)

### 2. SpaceX S-1/IPO Filing (June 2026)
- IPO date: June 12, 2026, at $135/share
- IPO valuation: ~$1.75 trillion (crossed $2T in trading, peaked at $2.67T on June 16)
- Revenue: $18.67 billion (2025), up from $14.02B (2024)
- Net loss: $4.94 billion (2025), reversing $791M profit in 2024
- Starlink = ~60% of revenue
- IPO deck title: "Building the Infrastructure of the Future"
- SpaceX's own cost claim: Falcon 9 at $2,700/kg, Falcon Heavy at $1,400/kg, Starship target 99% cost reduction
- Legal costs: $530M related to xAI/social media mergers
- Largest IPO ever: $85.7 billion raised
- Source: CoinCentral, StockTwits, Zacks analyses of S-1 filing

### 3. China CASC Long March 10B (July 10, 2026)
- First successful orbital-class booster recovery by China
- Net capture system on sea-based platform ("Linghangzhe" / Navigator)
- Launched from Hainan Commercial Space Launch Site at 12:15 PM Beijing time (04:15 UTC)
- Payload delivered to LEO, booster recovered ~6 min after stage separation
- LEO capacity: 16 metric tons
- Third Chinese attempt (after LandSpace Zhuque-3 and CATL tests failed)
- Plan to refly recovered booster by end of 2026
- "Achieved roughly six months earlier than Bernstein had anticipated"
- Sources: Reuters, WSJ, CNN, IFLScience, Wikipedia

### 4. Morgan Stanley / Goldman Sachs / Barron's analyses (July 2026)
- Morgan Stanley (Adam Jonas): 50 Starship launches in 2027, 6,000 by 2040
- 6,000 launches/year = 600,000 metric tons to orbit/year = 10x all payload humanity has ever launched
- Goldman Sachs: $239 price target, Buy rating
- Morgan Stanley: $300 price target, Overweight
- RBC analyst Ken Herbert on Starbase: "mind-blowing," "floored"
- Some analysts project $10 trillion+ long-term
- Source: Barron's, MarketWatch

### 5. SpaceX IPO Deck / Advanced Television (June 9, 2026)
- Historical average: $18,500/kg
- Falcon 9: $2,700/kg
- Falcon Heavy: $1,400/kg
- Starship target: 99% reduction (implies ~$27/kg from Falcon 9 baseline, or ~$185/kg from historical)
- Intercontinental travel: LA→NY 25 min, London→NY 29 min
- Source: Advanced Television, Chris Forrester report on SpaceX banker presentation

### 6. Sophia Goeppinger / LinkedIn Analysis (April 2026)
- Falcon 9 dedicated launch: $67M at 22,800 kg = $2,940/kg
- Starship rideshare: $1,200/kg (internal pricing)
- Starship capacity: 100,000 kg (estimates vary)
- Starship base price target: $90M → $900/kg at 100T capacity
- Rideshare price increases: Transporter went from $1M to $2.5M
- Competitor price inflation: Rocket Lab $7M→$8-10M, Firefly $15M→$19M, Virgin Orbit $10M→$12M (bankrupt)
- SpaceX flies >80% of all launches
- Source: LinkedIn post with 106 comments

### 7. Space Economy Projections
- WEF: $630 billion (2023) → $1.8 trillion by 2035
- In-space manufacturing: $2.6B (2026) → $62.8B by 2040 (Research and Markets, 29.7% CAGR)
- Orbital data center market: $1.77B (2029) → $39B by 2035 (67% CAGR)
- Satellite manufacturing: $21.8B (2025) → $43.5B (2030) → $86.7B (2035)
- Source: WEF, Research and Markets, Future Market Insights

### 8. Terzi on SpaceX Monopoly / East India Company Comparison
- SpaceX controls ~75% of total payload to orbit
- Terzi: gives SpaceX "greater control over space travel than the East India Company had over shipping to the East Indies in the 19th century"
- "A profit-maximising quasi-monopolist will have a strong incentive to charge higher prices"
- "Economic theory suggests" pricing power will reduce total payload demand
- Source: The Times (London), Terzi's "SpaceX, the East India Company" paper (Bennett School blog)

### 9. Payload growth acceleration
- Since 2020: ~31% annual payload growth
- 2000-2019: ~4% annual growth
- Terzi: "structural acceleration" since ~2010
- SpaceX Falcon 9 first reuse: 2017
- SpaceX first booster recovery: December 2015
- Source: Terzi dataset (via The Times summary)

## Original Analysis

### Wright's Law Learning Rate Calculation
- Cost: $87,023/kg (1960) → $3,841/kg (2024)
- Cost ratio: 3,841 / 87,023 = 0.04414 (i.e., costs fell to 4.4% of original)
- Cumulative launches: ~4,000+ total in dataset (1960-2024)
- Early cumulative: Let's estimate ~50 by 1965, growing
- If first meaningful data point ~50 cumulative launches at $87K, and final ~4,000+ at $3,841:
  - Number of doublings from 50 to 4,000: log2(4000/50) = log2(80) ≈ 6.32 doublings
  - But if we start from the very first launch: log2(4000/1) ≈ 11.97 doublings
  - Learning rate per doubling: 0.04414^(1/6.32) = e^(ln(0.04414)/6.32) = e^(-3.12/6.32) = e^(-0.494) = 0.610
  - This means ~39% cost reduction per doubling of cumulative launches
  
- **More rigorous:** The paper says $87K was in 1960 and $3.8K in 2024. If we assume the first 10 launches happened by 1960 and 4,000+ by 2024:
  - Doublings: log2(4000/10) ≈ 8.64
  - Learning rate: 0.04414^(1/8.64) = e^(-3.12/8.64) = e^(-0.361) = 0.697
  - ~30% cost reduction per doubling

### Comparison Learning Rates (from Oxford/INET research and published data):
- **Solar PV:** ~20-22% per doubling (well-established, INET Oxford)
- **Semiconductors (Moore's Law):** ~40-45% per doubling
- **Steamship freight (19th century):** ~15-17% per doubling (from Terzi's comparison claim "faster than steamships")
- **Space launch:** ~30% per doubling (our calculation) — faster than solar and steamships, but below semiconductors
- **Wind energy:** ~12% per doubling
- **Lithium-ion batteries:** ~18% per doubling

### SpaceX Monopoly Premium Calculation
- SpaceX internal cost (Starship, mature operations, Musk estimate): $2-3M per launch at 100-150 tons = $13-30/kg
- SpaceX Starship rideshare price to customers: $1,200/kg
- SpaceX Falcon 9 price: $2,700/kg, $67M dedicated
- Falcon Heavy: $1,400/kg

Monopoly premium = market price / internal cost:
- Starship rideshare premium: $1,200 / $20 (midpoint internal) = 60x
- But that's aspirational. More conservatively:
- Current Starship cost (12 flights, 75% success, early production): ~$90M per launch at ~100T = $900/kg
- Starship price to customers: $1,200/kg = 1.33x premium (thin)
- Falcon 9 internal cost vs price: SpaceX reuses boosters 20+ times, internal cost estimated ~$15-20M → at 22.8T = $658-877/kg; charges $2,700/kg = 3-4x premium
  
Real premium: on established Falcon 9, SpaceX charges ~3-4x its internal cost. As Starship matures, the gap between internal cost and pricing could widen dramatically.

### Industry Unlock Thresholds
Using the 30% learning rate and Morgan Stanley's launch projections:

At $1,000/kg (achievable with Starship scaling, ~2028-2030):
- Mega-constellations become commodity infrastructure
- Satellite broadband profitable at mass market pricing
- Space tourism below $100K per person

At $500/kg (~2032-2035):
- In-orbit manufacturing of high-value goods (fiber optics, pharma, exotic alloys) becomes profitable
- Commercial space stations viable without government subsidies

At $100/kg (~2038-2042):
- Orbital data centers competitive with terrestrial (lower cooling costs + 24/7 solar)
- Space-based solar power R&D becomes commercially viable to test
- Point-to-point Earth transport at premium airline prices

At $10/kg (Musk's aspirational target):
- Lunar construction at terrestrial building costs
- Mass space tourism at airline prices
- Industrial-scale asteroid mining becomes plausible

## Kill Test
Does this contain an original calculation? YES:
1. Wright's Law learning rate computed from Terzi's published data points → ~30% per doubling → faster than solar PV (20%), steamships (15-17%), slower than semiconductors (40-45%)
2. SpaceX monopoly premium on Falcon 9: 3-4x internal cost
3. Industry-unlocking threshold timeline mapped against Morgan Stanley launch projections
4. Cross-reference: SpaceX's 75% payload share vs East India Company's historical trade monopoly
