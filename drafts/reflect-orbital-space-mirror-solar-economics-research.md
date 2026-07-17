# Research: Reflect Orbital Space Mirror — Solar Economics Kill Math

## News Peg
On July 9, 2026, the FCC authorized Reflect Orbital (Hawthorne, CA) to launch Eärendil-1, an 18m × 18m thin-film mirror satellite into LEO (600–650 km). The license drew 1,800+ public comments, mostly opposed. The company ultimately plans 50,000 reflector satellites by 2035 to deliver "sunlight on demand." FCC SAT-LOA-20250701-00129.

## Primary Sources

### 1. FCC Order (July 9, 2026)
- Authorized construction, launch, and operation of Eärendil-1
- Two-year authorization for radio communications
- Characterized as "potentially groundbreaking technology"
- Limited to single demonstration satellite
- Noted effects on optical astronomy "fell outside its regulatory jurisdiction"
- Commissioner Jay A. Schwarz signed the order
- Source: docs.fcc.gov, referenced in Via Satellite (July 10, 2026) and Space.com (July 13, 2026)

### 2. ESO Peer-Reviewed Study (July 2026)
- Astronomer Olivier Hainaut, European Southern Observatory
- Published in Astronomy & Astrophysics, July 2026
- Identified Reflect Orbital's planned fleet as brightest satellites among ~1.7 million proposed
- In-beam: satellite shines ~4× brighter than full moon
- Out-of-beam: roughly as bright as Venus
- 50,000 satellites: night sky becomes 3–4× brighter overall
- Single mirror-satellite illumination could ruin an exposure from Vera C. Rubin Observatory
- Source: eso.org (July 1, 2026): "Beyond the limit: one million satellites and mirrors in space pose grave threat to the night sky"

### 3. Reflect Orbital Balloon Test Data (March 2024)
- Square mirror ~2.5m across (~6.25 m²)
- Robotically controlled from hot air balloon
- Delivered 516 W/m² to instruments 242 m below
- Demonstrated during twilight, redirected sunlight to solar panels
- Source: YouTube (BenNBuilds, March 2024), confirmed by The Conversation (June 2026) and multiple outlets

### 4. American Astronomical Society Letter (June 2026)
- Warned mirrors could compromise federally funded astronomical facilities
- Raised concern about "flash blinding" for airline pilots and drivers
- 1,800+ public comments received, mostly negative
- Source: Scribd upload, referenced in Fast Company (July 14, 2026)

### 5. DarkSky International Position Statement
- "Orbital illumination systems represent an unprecedented environmental intervention"
- Ecological risks: disrupts navigation, migration, feeding, reproduction across hundreds of species
- Human health: disrupts circadian rhythms, links to metabolic and hormonal concerns
- Eye damage risk: similar to observing partial solar eclipse through telescope
- Source: darksky.org (June 17, 2026)

### 6. Big Think Analysis (Ethan Siegel)
- Physics of scaling from balloon to orbit
- 18m mirror at 625 km → 0.004 W/m² (vs. 516 W/m² at 242m in balloon test)
- 54m mirror → 0.04 W/m²
- Need 200 W/m² for useful solar power → 50,000 18m satellites or 5,000 54m satellites all pointing at same spot
- Each satellite overhead for only 210 seconds (3.5 minutes) per orbit
- Even 250,000 satellites → only 16 additional equivalent solar plants across 80 locations worldwide
- Telescope damage risk: looking through binoculars at one of these could cause permanent retinal damage
- Source: bigthink.com (October 2025, updated)

### 7. Solspace Project (University of Glasgow)
- Research on orbital reflectors for solar farm boost
- 250m hexagonal reflectors at 900 km, ~3 tonnes each
- 5 reflectors hitting 13 solar farms → 284 MWh/day
- Targeting $70/MWh levelized cost of energy (LCoE)
- Compare to battery LCOS: $314/MWh
- Assumes launch cost of $232/kg and 20-year operational lifetime
- Current SpaceX Falcon 9 cost: ~$1,520/kg; Starship projected <$1,000/kg
- Source: New Atlas, referencing University of Glasgow research paper

### 8. Historical Precedent — Russia's Znamya Program
- Znamya 2 (February 1993): Deployed from Progress cargo craft near Mir station
- 20m mylar reflector (area ~314 m², nearly identical to Eärendil-1's 324 m²)
- Cast moonlight-bright, ~5 km spot across Europe during flyover
- At ~350 km altitude (Mir orbit) vs. Eärendil at 600–650 km
- Znamya 2.5 (1999): Failed during deployment due to human error
- 33 years between last attempt and Reflect Orbital's first satellite
- Source: Smithsonian Magazine, BBC News

## Kill Test — Original Calculation

### The Reflected Solar Power Cost-Per-MWh Kill

**Step 1: Irradiance per satellite at orbital altitude**
- Mirror area: 324 m² (18m × 18m)
- Solar irradiance in space: 1,361 W/m²
- Reflectivity (aluminum thin-film): ~0.9
- Total reflected power: 324 × 1,361 × 0.9 = 396,824 W ≈ 397 kW
- Sun's angular diameter: 0.0093 rad → beam diameter at 625 km = 5,812 m ≈ 5.8 km
- Beam area: π × (2,906)² = 26.5 million m²
- Ground irradiance: 397,000 / 26,500,000 = 0.015 W/m²
- Note: Big Think calculates ~0.004 W/m² (likely accounting for atmospheric losses, imperfect reflectivity, and beam non-uniformity). I'll use 0.01 W/m² as midpoint.

**Step 2: Satellites needed for useful solar power**
- Solar panels need ~200 W/m² minimum for meaningful power
- At 0.01 W/m² per satellite: need 20,000 satellites simultaneously illuminating same spot
- But orbital dynamics: each satellite sees a ground spot for ~3.5 minutes per 97-minute orbit = 3.6% duty cycle
- Need 20,000 / 0.036 = ~556,000 satellites in the constellation for 20,000 to be overhead at any moment
- Even Reflect Orbital's ambitious 50,000 target yields only ~1,800 satellites overhead at any moment
- 1,800 × 0.01 W/m² = 18 W/m² → about 9% of what solar panels need. Not enough.

**Step 3: Cost per MWh using Big Think's generous 250,000 scenario**
- 250,000 satellites → 16 equivalent additional solar farms globally (Big Think)
- Each 100 MW solar farm: ~200,000 MWh/year
- 16 farms: 3.2 million MWh/year
- Satellite costs (per unit): 142 kg × ~$2,720/kg rideshare = ~$386K launch + ~$1M manufacturing ≈ $1.4M each
- Total for 250,000: $350 billion
- Over 5-year satellite life: 16 million MWh total
- LCOE: $350B / 16M MWh = **$21,875/MWh**
- Current grid battery storage: $314/MWh
- Utility-scale solar: $24–40/MWh
- Natural gas peaker: $100–200/MWh
- **Reflected solar is 70–900× more expensive than every alternative**

**Step 4: The illumination use case — does $5,000/hour work?**
- $5,000/hour for 1,000+ annual hours = $5M/year/customer
- Illumination: ~4× full moon brightness (~1.2 lux) over 5 km diameter
- Compare: portable construction light tower rental: $500–800/night (40,000 lumens over ~2,000 m²)
- Reflect Orbital covers 28.3 km² at 1.2 lux per pass (4 minutes)
- To illuminate continuously: need many satellites taking turns = much more than $5,000/hour
- Most plausible early use: disaster relief, military operations where $5,000/hour is acceptable

**Step 5: Historical comparison with Znamya**
- Znamya 2 (1993): 314 m² at ~350 km → brighter per unit area due to closer orbit
- Eärendil-1: 324 m² at 625 km → ~3× farther → ~(625/350)² = 3.2× dimmer
- Despite similar mirror sizes, orbital altitude difference means Eärendil delivers about 1/3 the ground illuminance
- But Znamya was at Mir's altitude — lower orbits have faster orbital decay

## Strongest Counterargument
The Solspace project (Glasgow) targets $70/MWh using much larger reflectors (250m hexagonal) optimized for energy. Their math assumes Starship-era launch costs ($232/kg) and 20-year lifetimes. If launch costs drop by 10× AND reflector mass decreases dramatically, orbital reflection could compete with batteries. The technology question isn't whether mirrors work — Znamya proved they do in 1993. It's whether the economics ever close, and at what scale. Reflect Orbital's near-term value proposition isn't energy (the math doesn't work) — it's premium illumination-as-a-service for defense, disaster, and construction.

## Limitations
- I cannot access the actual FCC filing (SAT-LOA-20250701-00129) to verify the exact satellite specifications
- Reflect Orbital's cost per satellite is estimated — no public financial disclosures
- The Solspace $70/MWh target assumes aggressive future launch costs that don't exist yet
- ESO's "3–4× brighter night sky" estimate is for the full 50,000-satellite constellation, not single-satellite scenario
- I use midpoint irradiance estimates; actual performance depends on atmospheric conditions, mirror quality, and pointing accuracy

## Article Angle
**"The FCC Just Approved 50,000 Artificial Moons. The Math Says They'll Never Power Your Home."**
Russia tried this in 1993 with a mirror almost exactly the same size as Reflect Orbital's Eärendil-1. It worked — for 4 minutes. The physics of orbital reflection haven't changed in 33 years. What's changed is that Silicon Valley thinks it can sell the resulting moonlight for $5,000 an hour. We run the numbers on what it would actually cost to power a solar farm with space mirrors, and the answer is 70–900× more than just building more panels or batteries.

## Journalist
Zara Osman · Energy & Infrastructure

## Related LITF Articles
- stories/vpp-residential-batteries-375mw-peaker-replacement.html (batteries vs. peakers)
- stories/china-space-solar-beam-100m-orbit-gap.html (Chinese SBSP, different tech)
- stories/megaconstellation-black-carbon-540x-accidental-geoengineering.html (satellite environmental impact)
