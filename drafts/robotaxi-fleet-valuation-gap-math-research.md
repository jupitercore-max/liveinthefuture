# Robotaxi Valuation-to-Fleet Gap — Research Notes

## Thesis
Tesla has ~30 robotaxis deployed. Waymo has ~3,000. The stock market values Tesla's autonomous driving business at roughly 3x Waymo's $126B valuation. An original per-vehicle cost decomposition and fleet-to-valuation analysis shows what each company actually needs to justify investor expectations.

## Primary Sources

### Waymo Fleet & Operations
- Fleet: ~3,000 vehicles across 11 US cities (Wikipedia, TechCrunch Mar 2026)
- Rides: 500,000/week, targeting 1M/week by end of 2026 (TechCrunch, MarketBeat)
- Rides/vehicle/day: 500K / 7 / 3,000 = 23.8
- Valuation: $126B (Feb 2026 raise, $16B led by Dragoneer, DST, Sequoia)
- Revenue: Sacra estimates ~$355M annualized (April 2026) → $13.65/ride average national
- Obi pricing data (Nov 2025-Jan 2026): Waymo median $17.25/ride in Bay Area; national average lower
- Waymo Premier membership: $29.99/month, 10% cash back on rides (launched June 2026)
- Remote assistance workers: ~70 for entire fleet (TechCrunch)
- Gen 5 vehicle: Jaguar I-PACE, 29 cameras, 5 lidars, est. $150-200K per unit
- Gen 6 Ojai (Zeekr): 13 cameras, 4 lidars, 42% fewer sensors, hardware target <$20K, vehicle target <$100K
- Arizona factory scaling to "tens of thousands" annually

### Waymo Financial (Alphabet Other Bets)
- Q1 2026 Other Bets: $411M revenue, $2.1B operating loss (SEC filing, Alphabet Q1 2026)
- Q3 2025: $344M revenue, $1.43B loss
- Other Bets includes Waymo + Wing + (deconsolidated Verily + GFiber planned Q4)
- Alphabet CEO Sundar Pichai comp now partially tied to Waymo/Wing performance (MarketBeat)
- Total Alphabet net income 2025: ~$132B (Alphabet earnings)
- Waymo's $2.1B Q1 loss is easily absorbed

### Tesla Robotaxi Operations
- Austin fleet: 30-40 vehicles, ~17 unsupervised (IBD Jul 6 2026, Electrek Apr 2026)
- Dallas: ~2 vehicles initially
- Houston: ~2 vehicles initially
- Miami: launched July 3, 2026 (geofenced small area of West Miami)
- San Francisco: safety drivers only (never applied for autonomous license)
- Current pricing (Austin, Mar 2026): $3.00 base + $1.40/mile
  - 5-mile ride: $10.00
  - 10-mile ride: $17.00
- Dallas pricing: $3.00 base + $1.40/mile (same)
- Price evolution: $4.20 flat (Jun 2025) → $6.90 flat → $1 + $1/mi (Jul 2025) → $3.25 + $1/mi (Mar 7) → $3 + $1.40/mi (Mar 11)
- Operating hours: 6 AM - Midnight
- Cybercab: mass production started April 2026 at Giga Texas, <$30K target, no steering wheel
- Model S/X production halted at Fremont, converting to robot manufacturing
- Q2 2026 deliveries: ~480K vehicles (beat estimates)
- Stock: ~$400-420, market cap ~$1.3-1.4T
- Wait times: 10-15 minutes average in Austin

### Tesla Valuation Attribution
- Morgan Stanley (Adam Jonas): mobility/network services ~$100/share of ~$400 total → ~25% → ~$340B
- ARK Invest 2029 model: 68% of Tesla value from robotaxi (bull case)
- Conservative AV premium embedded in stock: $300-400B
- Tesla doesn't expect "needle-moving" robotaxi revenue until 2027 (Barron's)

### Bank of America Breakeven Analysis (Nov 2025)
- "Robotaxi Economics: When Will the Math Work?"
- $75K vehicle, 4-yr depreciation, 54K mi/yr → need $1.95/mi for 10% margin
- $45K vehicle → breakeven at $1.53/mi
- $30K vehicle (Cybercab target) → breakeven falls further

### Pony.ai (China benchmark)
- 7th gen achieved monthly per-vehicle profitability in Shenzhen (Mar 2026, press release)
- BOM cost dropped 70% from prior gen
- Vehicle designed for 600K km lifespan

### Uber Benchmark
- Uber One: 50M members, drives half of gross bookings
- Uber trades at 5-10x revenue (mature phase)
- Waymo at $126B on $355M revenue = 355x revenue multiple

## Original Calculations

### 1. Per-Vehicle Revenue
- Waymo: $355M / 3,000 vehicles = $118,333/vehicle/year = $324/vehicle/day
- Tesla (if achieving same utilization at Austin pricing): 24 rides/day × avg $10/ride = $240/day = $87,600/yr
- Tesla at Waymo's $13.65 avg: 24 × $13.65 = $328/day (nearly identical)

### 2. Per-Vehicle Operating Cost Stack (annual)

| Cost Item | Waymo Gen 5 | Waymo Gen 6 | Tesla Model Y | Tesla Cybercab |
|-----------|-------------|-------------|---------------|----------------|
| Vehicle depreciation (4yr) | $43,750 | $25,000 | $11,250 | $7,500 |
| Sensor/compute hardware* | (included) | (included) | (included) | (included) |
| Insurance (commercial AV) | $8,000 | $8,000 | $8,000 | $8,000 |
| Charging (120 mi/day) | $1,825 | $1,825 | $1,825 | $1,825 |
| Maintenance | $5,000 | $4,000 | $3,000 | $2,500 |
| Remote assistance (70/3K) | $1,867 | $1,867 | $0** | $0** |
| Operations/cleaning | $5,000 | $5,000 | $3,000 | $3,000 |
| **Total** | **$65,442** | **$45,692** | **$27,075** | **$22,825** |

*Sensor hardware amortized in vehicle depreciation
**Tesla claims no remote assistance needed (camera-only, AI handles edge cases)

### 3. Per-Vehicle Operating Margin
- Waymo Gen 5: $118,333 - $65,442 = $52,891/yr
- Waymo Gen 6: $118,333 - $45,692 = $72,641/yr
- Tesla Model Y: $87,600 - $27,075 = $60,525/yr (at $10 avg ride)
- Tesla Cybercab: $87,600 - $22,825 = $64,775/yr

### 4. Fleet Size to Justify Valuation (at 15x forward earnings)
- Waymo ($126B valuation): needs $8.4B in earnings → $8.4B / $72,641 per Ojai = 115,635 vehicles
- Tesla AV business ($350B implied): needs $23.3B in earnings → $23.3B / $64,775 per Cybercab = 359,756 vehicles
- Tesla AV business ($350B) with owner-operated fleet (lower margin per vehicle, ~$20K each): 1.17M vehicles on network

### 5. Time-to-Fleet
- Waymo: Arizona factory at 30K/year → 116K fleet in ~3.9 years (plus existing 3K)
- Tesla: Cybercab production target unclear, but Giga Texas converting Model S/X lines
  - If 100K Cybercabs/year: 360K fleet in ~3.6 years
  - If owner-operated (software update to existing Teslas): potentially 1M+ overnight (but conversion rate?)
  - Tesla has 7M+ vehicles on road with FSD hardware

### 6. The Revenue Multiple Gap
- Waymo: $126B / $355M revenue = 355x
- Uber (comparable): 5-10x revenue
- For Waymo to reach Uber-like 10x multiple: needs $12.6B annual revenue
- At $118K/vehicle/year: needs 106,780 vehicles
- At 1M rides/week ($26M rides/year × $14 avg): $364M — still only 2.9x better than today

## Key Insight (Article Thesis)
Despite charging 40% less per ride, Tesla's camera-only approach produces per-vehicle operating margins comparable to Waymo's because the vehicle costs $45K instead of $175K. The sensor cost gap is the entire economics story. But Waymo's Gen 6 Ojai narrows this gap dramatically, bringing per-vehicle costs down by 30%. The real question isn't whose car is cheaper—it's whose fleet can scale to 100,000+ vehicles faster. Waymo has a factory; Tesla has 7 million existing cars.

## Strongest Counterargument
Tesla's owner-operated model (existing Tesla owners add their cars to the robotaxi fleet) could deploy hundreds of thousands of vehicles overnight with zero capital expenditure by Tesla. This would make the per-vehicle valuation math irrelevant because Tesla isn't building the fleet—its customers already did. If even 5% of Tesla's 7M vehicles join the network, that's 350,000 robotaxis tomorrow. Waymo has no comparable lever. The counterargument: FSD supervised ≠ unsupervised, regulatory approval at scale is uncertain, and owner-operated vehicle quality/cleanliness is uncontrollable.

## Limitations
1. Waymo doesn't disclose ride-level revenue; Sacra's $355M estimate is analyst-derived
2. Tesla's Austin fleet is too small for meaningful utilization data
3. Insurance costs for AV fleets are highly uncertain and may not scale linearly
4. Owner-operated Tesla fleet economics are entirely theoretical
5. Chinese comparisons (Pony.ai) face different regulatory and labor cost environments
6. All vehicle cost estimates are based on industry estimates, not company disclosures
