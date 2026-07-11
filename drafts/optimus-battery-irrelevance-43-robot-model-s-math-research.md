# Research: The Battery Irrelevance Math — Tesla Optimus vs Model S

## Core Thesis
When Tesla retooled the Model S/X production line at Fremont for Optimus robots, it didn't just change what it builds — it inverted the role of the battery in its business model. The battery went from the product's defining cost center (13.75% of vehicle price) to a rounding error (0.5% of robot BOM). This inversion is the most underreported story in the battery industry.

## Primary Sources

### 1. Morgan Stanley Teardown — Optimus Gen 2 BOM ($55K total)
- Source: Morgan Stanley research note, covered by multiple outlets (CryptoBriefing, FourWeekMBA, TechDigest)
- Locomotion (legs): $21,300 (38.6%)
- Core stability (waist/pelvis/shoulders): $15,600 (28.4%)
- Hands: $9,500 (17.2%) — 12 actuators, coreless motors, force sensors
- Head/AI compute: $2,100 (3.8%) — FSD chips + camera array
- Battery: $300 (0.5%) — 2.3 kWh, 52V pack
- With Chinese supply chain: $46,000
- Without Chinese supply chain (US-only): $131,000 (nearly 3×)

### 2. Tesla Q4 2025 Earnings / Investor Calls
- Source: Hemmings, Barron's, HotCars, multiple financial outlets
- Model S/X "honorable discharge" announced at Q4 2025 earnings call (Jan 2026)
- Model S/X = 3% of Tesla deliveries in 2025
- Model S/X sales fell 40% in 2025
- Fremont factory retooled for Optimus Gen 3 production
- Target: 1 million Optimus units/year at Fremont
- Musk (July 2026): "Optimus production will be extremely slow at first, as everything is new."
- Initial production: late July/August 2026
- Optimus has 10,000 unique parts
- External sales target: 2027
- Musk target price: $20-30K at scale

### 3. LG Energy Solution Robot Battery Contracts
- Source: KED Global, Korea JoongAng Daily
- LG Energy secured supply contracts with top 3 US humanoid robot makers: Tesla, Boston Dynamics, + 1 more (likely Figure or Agility)
- LG supplying cylindrical batteries to 6 major robotics companies ("most of the leading players one could readily name")
- Also supplies LG Electronics CLOiD, Naver Labs, Bear Robotics
- Quote: "Battery demand from humanoid robots could eventually reach roughly 20 to 40% of today's EV battery market" — Ju (Korea JoongAng)

### 4. TrendForce Solid-State Battery / Humanoid Forecast
- Source: TrendForce research report (Jan 2026), covered by Electrek
- Global humanoid robot shipments: 50,000+ by 2026 (700% YoY growth)
- Solid-state battery demand from humanoid robots: 74 GWh by 2035 (1,000× from 2026)
- Most robots today: 2-4 hours runtime, battery capacity under 2 kWh
- For 8-hour shift: robots need 6-8 kWh

### 5. Robot Battery Specs (Multiple Sources)
- Tesla Optimus Gen 2: 2.3 kWh, ~2 hours dynamic runtime
- Boston Dynamics Atlas: 3.7 kWh
- Figure F.03: 2.3 kWh, 5 hours peak, 78% cost reduction vs F.02, targeting UN38.3 and UL2271 safety certs
- Unitree H1: 0.864 kWh, <4 hours static (dual-battery system, 432 Wh each)
- Unitree G1: 9,000 mAh quick-release, ~2 hours, $16K total robot price

### 6. Battery Industry Context
- EV battery cost: ~$110/kWh (BloombergNEF, 90%+ decline since 2010)
- Robot solid-state target: $600-800/kWh
- Current high-nickel NCM: ~$130/kWh at cell level
- Humanoid robot market: $2.43B (2025) → $66B by 2032 (Fortune Business Insights)
- Chinese competitors already leveraging domestic supply chain: Unitree G1 at $16K total

## Original Calculations

### Calculation 1: Battery Cost as % of Total Product
- Model S: 100 kWh × $110/kWh = $11,000 battery / $80,000 vehicle = 13.75%
- Optimus: 2.3 kWh × $130/kWh = $299 battery / $55,000 BOM = 0.54%
- Ratio: Battery matters 25.5× more to an EV than to a robot

### Calculation 2: Robots per Model S Battery Equivalent
- Model S battery: 100 kWh
- Optimus battery: 2.3 kWh
- Equivalent: 100 / 2.3 = 43.5 robots per Model S
- 1 million Optimus = 2.3 GWh total battery demand
- Tesla 2023: ~1.79M vehicles, ~110+ GWh batteries
- 1M robots = 2.1% of Tesla's current vehicle battery demand

### Calculation 3: Value per kWh Deployed
- Model S: $80,000 / 100 kWh = $800 per kWh deployed
- Optimus (at BOM): $55,000 / 2.3 kWh = $23,913 per kWh deployed
- Optimus (at target price): $25,000 / 2.3 kWh = $10,870 per kWh deployed
- Robot generates 13.6-29.9× more value per kWh than an EV

### Calculation 4: Electricity Cost of a Robot Workforce
- Average power draw: ~500W (walking + manipulation)
- 8-hour shift: 4 kWh electricity
- At $0.12/kWh: $0.48/day, $175/year per robot
- 1 million robots: 1.46 TWh/year = 0.036% of US electricity (4,050 TWh)
- Equivalent to powering ~134,000 US homes
- Compare: US minimum wage worker = $15/hr × 2,000 hrs = $30,000/year
- Robot electricity: $175/year = 0.58% of one human worker's salary

### Calculation 5: When Does Robot Battery Demand Matter?
- 2026: 50,000 robots × 2.3 kWh avg = 0.115 GWh (trivial)
- 2030 (if 5M robots at 4 kWh avg): 20 GWh (≈ 250,000 EVs)
- 2035 (TrendForce 74 GWh): equivalent to ~925,000 EVs
- "20-40% of today's EV battery market" = industry-shaping

## Limitations
- Morgan Stanley BOM is for Gen 2; Gen 3 costs unknown
- Tesla's 1M/year target is aspirational, not committed
- Battery chemistry for robots may shift (solid-state, lithium metal)
- TrendForce 74 GWh by 2035 assumes aggressive deployment curves
- Chinese competitors (Unitree at $16K) may commoditize the market faster
- Robot runtime is currently 2-4 hours; 8-hour shift battery not yet solved

## Strongest Counterargument
The strongest case against battery irrelevance: robots won't stay at 2.3 kWh. For an 8-hour factory shift, each robot needs 6-8 kWh — nearly 3× current capacity. At 6 kWh, 1M robots consume 6 GWh, and the kWh gap with EVs narrows. If solid-state batteries at $600-800/kWh become the standard, battery cost rises from $300 to $3,600-4,800 per robot — still only 6.5-8.7% of BOM, but no longer a rounding error. The battery industry might end up mattering to robots after all — just not in the way it matters to cars.
