# Research: Uber's Robotaxi Partner Crashed 16 Times — Safety Monitor Intervened Once

## Journalist: Elena Vasquez (Transport & Autonomous Vehicles)

## Kill Test
- Is this news? YES — NHTSA investigation opened May 8, 2026
- Does it affect real people? YES — passengers in Uber-booked robotaxis
- Do we have 3+ primary sources? YES (NHTSA ODI filing, TechCrunch, Reuters, ccstartup, SelfDriveNews, ARK Invest/Waymo safety data)
- Has LITF covered this exact angle? NO — we covered AV funding (#288) and CA regulation (#284), not Uber's platform-model safety outsourcing

## 10-Star Test
- Would a reader screenshot this? YES — the 1/16 safety monitor stat and crash rate comparison
- Does it reveal something hidden in plain sight? YES — Uber outsourced safety liability while keeping brand exposure
- Original calculation? YES — crash rate per million miles vs Waymo and human baselines

## Novel Contribution
Original analysis: Calculate Avride's estimated crash rate per million miles and compare to Waymo's published safety data (170.7M miles, 92% fewer serious crashes) and human baseline (1.20 fatalities/100M VMT per NHTSA 2024). Safety monitor intervention failure rate calculation (1/16 = 6.25%) vs industry expectations.

## Primary Sources

### 1. NHTSA ODI Investigation (May 8, 2026)
- 16 crashes identified between Dec 2025 – Mar 2026 (4 months)
- All crashes with safety monitor in driver's seat
- Only 1 of 16 involved monitor attempting to intervene
- NHTSA language: vehicles showed "excessive assertiveness and insufficient capability"
- Behavior: lane changes into path of other vehicles, failure to slow/stop for stopped vehicles, striking stationary objects
- "May also constitute traffic safety violations"
- 1 minor injury (Dec 2025, Dallas — clipped open door of parked pickup truck)

### 2. TechCrunch (Sean O'Kane, May 8, 2026)
- Avride = subsidiary of Nebius (formerly Yandex NV, Amsterdam-based)
- Inherited Yandex self-driving tech (in development since 2017)
- Partnership with Uber announced Oct 2024
- Dallas launch: Dec 3, 2025, 9 sq mi zone
- Uber + Nebius committed up to $375M in investment
- Avride declined to explain why monitors didn't intervene
- Avride statement: "frequency of incidents relative to our mileage has steadily declined"
- Uber did not comment

### 3. SelfDriveNews — Fleet Size
- Fleet: 200 Hyundai Ioniq 5 vehicles across Austin and Dallas
- Dozens of new vehicles added monthly
- Dallas: commercial via Uber. Austin: testing only
- Each vehicle: 13 cameras + lidar + radar + additional sensors
- Pre-assembled electronics workflow enables scaling

### 4. ccstartup.com — Broader Context
- NHTSA used phrase "excessive assertiveness and insufficient capability"
- Uber AV trips grew 10x YoY (Q1 2026 earnings)
- Uber's platform model = inverse of 2015-2020 in-house AV program (which killed Elaine Herzberg, Tempe AZ, March 2018)
- Uber now has partners: Avride, Waymo, Nuro, MOIA/VW, Wayve/Nissan
- Live with autonomous rides in 8 cities, targeting 15 by end of year
- Tesla Austin: 14 crashes since launch, ~4x worse than human drivers (Electrek)

### 5. Waymo Safety Data (March 2026)
- 170.7M rider-only miles driven
- 500,000 rides/week
- 3,000 vehicles
- 4M weekly miles
- 92% fewer serious-injury crashes vs human drivers
- 83% fewer airbag deployments
- ~500,000 miles between police-reported collisions (ARK Invest Q4 2025)
- Published peer-reviewed: 56.7M mile study in Taylor & Francis journal

### 6. NHTSA 2024 National Data
- 39,345 traffic fatalities in 2024
- 1.20 fatalities per 100M VMT (lowest since 2019)
- ~6M police-reported crashes/year on ~3.3T VMT ≈ 1.82 crashes per million VMT (all severity)

## Original Analysis: Crash Rate Estimate

**Avride estimated miles:**
- 200 vehicles total (but fleet ramped from ~50 to 200 over the period)
- Average fleet during Dec–Mar: ~125 vehicles
- Operating area: 9 sq mi commercial zone (Dallas), plus Austin testing
- Estimated daily miles per vehicle: 50-100 (conservative for urban robotaxi)
- ~120 days (Dec 3 to end March)
- Estimated total miles: 125 vehicles × 75 mi/day × 120 days ≈ 1.125M miles
- Conservative range: 750K – 1.5M miles

**Avride crash rate: 16 crashes / ~1.125M miles ≈ 14.2 crashes per million miles**
- Range: 10.7 – 21.3 per million miles

**Comparison:**
- Waymo: ~2 per million miles (500K between police-reported, ARK Invest)
- Human drivers (all severity): ~1.82 per million miles (NHTSA)
- **Avride is ~7-12x worse than human drivers, ~5-11x worse than Waymo**

**Safety monitor failure rate:**
- 1 intervention / 16 crashes = 6.25% intervention rate
- 93.75% failure-to-intervene rate
- Compare: Cruise Oct 2023 — safety culture failures led to CA DMV revoking permit after single incident where monitor info was inadequate

## Strongest Counterargument
Avride's own defense: "frequency of incidents relative to our mileage has steadily declined" — implying the system is learning rapidly. Every AV company's first miles are the worst; Waymo's 2017-era tech was far worse than its 2026 performance. The question is whether the learning should happen with paying passengers in the car.

Also: NHTSA's 16 crashes may include minor incidents that wouldn't all be "police-reported" under standard crash classification, which would make the per-million-mile rate comparison against the human baseline (which uses police-reported crashes only) overly harsh. The analysis should acknowledge this methodological gap.

## Limitations
1. Avride has not disclosed total mileage — our estimate uses fleet size × estimated daily miles
2. NHTSA crash classification may differ from police-reported standard
3. Waymo's 170.7M miles span multiple cities and years; Avride's 4 months in one city isn't directly comparable
4. Some crashes involved other vehicles turning into Avride cars — fault allocation unclear
5. "Crash" definition between NHTSA SGO reporting and police reports differs

## Angle
The Uber "platform model" for autonomous vehicles — outsource the tech, keep the brand — creates a specific failure mode: passengers book through Uber, ride in Avride vehicles, and Uber bears zero development liability. When the safety monitor in an Avride car fails to brake before it hits a dumpster, the passenger booked through Uber. The platform model that made Uber a $200B company by not owning cars now extends to not owning the AI driving them.
