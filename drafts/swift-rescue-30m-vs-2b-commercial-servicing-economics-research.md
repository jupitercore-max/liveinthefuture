# Research Notes: NASA's $30M Startup Gamble vs. Its Own $2B Failure

## Story Angle
NASA spent $2 billion on OSAM-1 (Restore-L), an in-house satellite servicing demonstration, and canceled it in March 2024. Eight months later, it handed a $30M contract to a startup (Katalyst Space Technologies) to do something arguably harder: rescue a $500M telescope that was never designed to be serviced. LINK launched July 3, 2026. If it works, it proves commercial space can do what government programs couldn't — for 1.5% of the cost.

## Primary Sources

### 1. NASA Award & Mission Details
- Source: NASA press release, Sept 24, 2025 (nasa.gov)
- Contract: $30M SBIR Phase III to Katalyst Space Technologies
- Competitors: Starfish Space, Cambrian Works + Astroscale joint venture
- Quote (Shawn Domagal-Goldman): "Given how quickly Swift's orbit is decaying, we are in a race against the clock"

### 2. Swift Observatory Facts
- Source: SpaceflightNow (May 8, 2026), Wikipedia (multiple NASA refs)
- Total cost: $500 million (build + launch + operations over 22 years)
- Launched 2004, original altitude ~600 km, decayed to ~400 km
- No propulsion system, no docking port, no grappling fixtures
- Detects ~100 gamma-ray bursts/year, no planned replacement
- Science operations suspended Feb 11, 2026 to minimize drag (30% cross-section reduction)
- Critical altitude floor: ~300 km (below which docking impossible)
- Without intervention: uncontrolled reentry by end of 2026

### 3. LINK Spacecraft
- Source: Wikipedia (multiple refs), Katalyst press releases, NASA mission preview (June 17, 2026)
- Manufacturer: Katalyst Space Technologies (founded 2020, Flagstaff AZ)
- Acquired Atomos Space April 2025 (brought flight heritage)
- Launch mass: 425 kg (937 lb), dry mass: 365 kg
- Launched July 3, 2026, 08:36 UTC from Kwajalein Atoll on Pegasus XL
- Development time: ~8 months from contract award to environmental testing (typical: 24 months)
- Propulsion: 3 Hall-effect thrusters (xenon), 16 RCS thrusters
- 3 parallel manipulator robotic arms ("split Stewart platform") with lidar + 3-DOF grippers
- Will attach to ground-handling flanges (not designed for servicing)
- Swift described as "unprepared but cooperative" — can coordinate attitude control
- Boost operation: ~3 months to raise orbit, then undock
- If successful: extends Swift life by 10+ years
- Last planned Pegasus XL launch ever
- Mission patch motto: "Audentes fortuna iuvat" (Fortune favors the bold)

### 4. OSAM-1 (Restore-L) Failure
- Source: NASA OIG report (Oct 2023), AIP.org (Mar 2024), SpaceNews, Reuters
- Original cost estimate: $626-753 million
- Final cost at cancellation: >$2 billion ($1.5B appropriated by Congress)
- Original launch target: 2020, slipped to at least 2026
- Contractor: Maxar — cited for "poor performance" by NASA OIG
- 450 NASA employees and contractors affected
- Canceled March 1, 2024: "continued technical, cost, and schedule challenges"
- OSAM-2 also canceled in 2023 without flight demo

### 5. Solar Maximum & Orbital Decay
- Source: Oliveira et al. (Frontiers, arXiv 2505.13752), NewSpaceEconomy.ca (May 2026)
- Solar Cycle 25 peaked October 2024 (NASA/NOAA announcement)
- Study tracked 523 Starlink reentries 2020-2024: satellites reenter faster with higher geomagnetic activity
- Van Allen Probes: originally expected to remain in orbit until 2034, Probe A reentered March 2026 — years early
- ESA 2025 Space Environment Report: ~40,000 tracked objects, ~11,000 active payloads
- Decay rate threshold: when sunspot numbers exceed ~67-75% of cycle peak, debris undergoes "marked transition to accelerated orbital decay"

### 6. Satellite Servicing Market
- Source: The Business Research Company report, DataIntelo report, Nanalyze
- On-orbit satellite servicing market: $3.75B in 2026, growing to $5.52B by 2035 (10.1% CAGR)
- Orbital repair services: $2.16B in 2026, forecast $4.39B by 2030 (19.4% CAGR)
- Debris removal segment: fastest growing at 22.1% CAGR
- Commercial life extension missions: $30-80M per mission
- Full satellite replacement: $250-500M
- Cost saving ratio: 6-10x
- Life extension potential: 5-15 years per mission
- Northrop Grumman MEV-1 (2020): first commercial servicing mission (Intelsat 901)

## Original Calculations

### Cost-per-science-year
- Swift total cost: $500M over 22 years = $22.7M/year
- LINK rescue: $30M for 10+ additional years = $3M/year
- Cost reduction: 87% cheaper per science-year
- At $3M/year, LINK pays for itself if Swift operates for just 1.3 additional years ($30M ÷ $22.7M/year)

### The 67x Government-to-Commercial Cost Gap
- OSAM-1: $2B+ (canceled, 0 satellites serviced, 10 years development, no launch)
- LINK: $30M (launched, attempting harder mission — unserviceable target with no docking port)
- Ratio: $2,000M ÷ $30M = 66.7x cheaper
- OSAM-1 development time: 10 years (2016-2024), canceled before flight
- LINK development time: 8 months from contract to environmental testing
- OSAM-1 contractor (Maxar): cited for "poor performance" by NASA OIG
- Katalyst: startup founded 2020, first spacecraft ever launched

### Value of Satellites at Risk from Solar Maximum
- Swift: $500M (active, no replacement planned)
- Van Allen Probes: ~$700M (estimated total program cost, already deorbited early)
- 523 Starlink satellites lost during Solar Cycle 25 rising phase at ~$250K each = ~$131M
- ISS reboost costs increase during solar maximum
- ESA reports ~40,000 tracked objects, 11,000 active payloads in LEO
- Many LEO science assets launched 10-20 years ago without propulsion are aging into danger zone

## Beat/Category
🚀 Space — on-orbit servicing, commercial space, NASA policy

## Journalist
Anya Volkov — space/defense beat

## Kill Test
✅ Original calculation: The 67x cost gap between OSAM-1 ($2B, canceled) and LINK ($30M, launched) — nobody has framed this comparison with the per-science-year calculation showing LINK pays for itself in 1.3 years. Also: the solar maximum creating an involuntary market for satellite rescue (quantified via Van Allen Probes, Starlink losses, and Swift timeline).
