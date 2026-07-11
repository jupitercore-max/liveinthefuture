# Research: Stellarator Cost Discipline vs Tokamak Overruns — Proxima Fusion's €2B Bet

## Core Thesis
The fusion industry has spent 60 years betting on tokamaks despite a measurable cost-overrun disadvantage. Stellarators — the geometrically nightmarish alternative — actually deliver better cost discipline (2x overrun vs 5x), and their operational advantages (zero disruptions, steady-state operation) compound into a massive capacity-factor edge at grid scale. Proxima Fusion's €411M round and €2.4B valuation are a bet that this math finally matters.

## Primary Sources

### Proxima Fusion (Stellarator Startup)
- **Founded:** April 2023, spin-out from Max Planck Institute for Plasma Physics (IPP)
- **Founders:** Francesco Sciortino (CEO), Lucio Milanese, Jorrit Lion, Jonathan Schilling, Martin Kubie — from IPP, MIT, and X Development (formerly Google-X)
- **Total raised:** ~€600M (€7.5M pre-seed + €20M seed + €130M Series A Jun 2025 + €15M Series A extension Sep 2025 + €411M Jul 2026 round)
- **Valuation:** €2.4B ($2.7B) as of July 2026
- **Latest round:** Led by XTX Ventures and East X Ventures, with Google and RWE as strategic investors. RWE invested €25M.
- **Employees:** ~150 (PitchBook)
- **Design:** Quasi-isodynamic (QI) stellarator, leveraging HTS (high-temperature superconductor) magnets
- **Roadmap:**
  - **Alpha** (demo stellarator): Near Max Planck IPP in Garching, operational 2030s, first to demonstrate net energy gain in a stellarator. Estimated cost: ~€2B
  - **Stellaris** (commercial plant): At former Gundremmingen nuclear fission site in Bavaria, grid-connected. Timeline: 2030s
- **Funding structure for Alpha:** Proxima 20% private, Bavaria 20% state contribution. Bavaria allocated ~€400M from High-Tech Agenda. Germany's Fusion Action Plan: €2B+ from €18B High-Tech Agenda Germany. €755M from special federal infrastructure fund.
- **Partners:** Free State of Bavaria, RWE, Max Planck IPP (signed MoU Feb 2026)
- **Stellaris paper:** Published concept for QI-HTS stellarator, compared in impact to MIT's ARC tokamak concept paper (2014)

### Wendelstein 7-X (W7-X) — The Proof
- **What:** World's largest and most advanced stellarator, operated by Max Planck IPP in Greifswald, Germany
- **50 superconducting magnet coils**, each weighing 6 tons, "bizarrely twisted"
- **Budget:** Originally €550M, completed at ~€1B (1.8x overrun), construction began mid-1990s, completed ~10 years late
- **Performance records (May 2025 campaign):**
  - Set world record for triple product (density × temperature × confinement time) for plasma durations > 30 seconds
  - Record performance lasted 43 seconds
  - **Exceeded previous tokamak records** (JT60U, JET) for long-duration plasmas, even though JET had 3× the plasma volume
  - PPPL scientist Novimir Pablant: "If they can reach this record for 30 seconds, there's every reason to believe these plasma conditions could be sustained for weeks, months or even years"
  - Energy confinement time: 200 milliseconds (optimized as designed)
  - Confirmed: optimization suppresses banana-orbit particle losses, turbulence is now the main energy loss channel
  - Thomas Klinger (W7-X director): "The machine worked immediately. It's a very easy-going machine."
- **Key advantage:** No disruptions. No pulsed operation. "Can turn on once and just leave on forever" (Dennis Whyte, MIT)
- **Oak Ridge pellet injector** enabled continuous refueling with frozen hydrogen pellets

### ITER (Tokamak Mega-Project) — The Cautionary Tale
- **Type:** Tokamak, under construction in Cadarache, France
- **Partners:** EU, US, China, India, Japan, Russia, South Korea
- **Budget history:**
  - 2006 launch: €5B estimated, 10-year construction
  - Successive overruns: €14-15B, then €18-20B
  - 2024 revised schedule: additional €5B overruns → total now €25B+
  - **Cost overrun factor: 5x original budget**
- **Schedule history:**
  - Original: First plasma 2016
  - Revised (2016): First plasma 2025, DT fuel 2035
  - Revised (2024): Research ops 2034, DT plasma 2039
  - **Now 23 years behind original schedule**
- **Critical limitation:** ITER will NEVER produce electricity. It's an experiment only.
- **Q target:** Q=10 (produce 10x the heating power input). Best tokamak result: Q=0.67 (JET). Best fusion result: Q=4.13 (NIF, inertial confinement, April 2025).
- **Disruption problem:** Tokamaks prone to "instabilities" and "disruptions" — breakdowns in plasma flow causing particles to veer off course, potentially damaging vessel walls. Can generate electron beams capable of burning holes through the wall.
- **Science.org quote (Director Barabaschi):** "Manufacturing faults, the COVID-19 pandemic, and the complexity of a first-of-a-kind machine have all slowed progress."
- **Dennis Whyte (MIT):** "Look how people are voting with their feet. It's like we can't wait for this anymore."

### Commonwealth Fusion Systems (CFS) — Private Tokamak Comparison
- **Total raised:** ~$2B+ (including $1.8B round with Google in 2021, $863M Series B2 Aug 2025, $1B Eni deal Sep 2025)
- **SPARC tokamak:** Under construction in Devens, Massachusetts
  - First magnet installed Jan 2026 (CES 2026 announcement)
  - 18 total D-shaped magnets, each 24 tons, 20 Tesla field
  - First plasma: 2026 (projected), Q>1: 2027 (projected)
  - Uses HTS VIPER magnets (YBCO superconducting tape)
  - Originally scheduled for 2025, slipped to 2026-2027
- **ARC commercial plant:** 400 MWe, Chesterfield County, Virginia. Early 2030s.
- **Google DeepMind partnership:** TORAX plasma simulator for SPARC
- **Key issue:** Still a tokamak → still has disruption risk, pulsed operation

### Helion Energy
- **Valuation:** $15.5B (Series G, June 2026)
- **Total raised:** $1.5B
- **Approach:** Field-reversed configuration (neither tokamak nor stellarator)
- **Polaris:** Reached 150M°C with fusion fuel
- **Orion:** First power plant under construction in Malaga, Washington
- **PPAs:** Microsoft (electricity by 2028), Nucor (500 MW plant)

## Original Calculation #1: Cost Overrun Discipline

| Project | Type | Original Budget | Final Cost | Overrun Factor |
|---------|------|----------------|------------|----------------|
| W7-X | Stellarator (research) | €550M | ~€1B | 1.8x |
| ITER | Tokamak (research) | €5B | €25B+ | 5.0x+ |
| JET (historical) | Tokamak (research) | ~€300M (1979) | ~€800M | 2.7x |

Note: Some of ITER's overrun is due to multinational management complexity (7 partners, in-kind contributions), not purely reactor physics. But stellarator's geometric complexity was supposed to make them MORE expensive to build — and yet the overrun multiplier is LOWER. The stellarator's physics simplicity (no active plasma current control, no disruption mitigation systems, no central solenoid) may offset its geometric complexity.

## Original Calculation #2: Capacity Factor Advantage

**Tokamak (pulsed operation):**
- ITER design: 500-second burn pulses with 1,800-second total cycle time (500s burn + 1,300s dwell) = 28% duty cycle
- For a commercial tokamak (optimized): ~400s burn, ~200s ramp-up/down = 67% plasma duty cycle
- Add ~20% downtime for maintenance, disruption recovery → realistic capacity factor: ~50-65%
- DEMO (proposed EU follow-up): targeted 30-50% availability initially

**Stellarator (steady state):**
- W7-X demonstrated: 43 seconds stable with "nothing changing" in physics parameters
- PPPL scientist: "every reason to believe conditions could be sustained for weeks, months or years"
- Theoretical: can run continuously once ignited
- Realistic capacity factor with maintenance: 80-90%

**What this means for a 1 GW plant over 30-year lifetime:**
- Tokamak at 55% CF: 1 GW × 0.55 × 8,760 hrs × 30 yrs = 144.5 TWh
- Stellarator at 85% CF: 1 GW × 0.85 × 8,760 hrs × 30 yrs = 223.4 TWh
- **Difference: 78.9 TWh over plant lifetime**
- At wholesale electricity price of $50/MWh: 78.9M MWh × $50 = **$3.95 billion in additional revenue per plant**

## Original Calculation #3: Disruption Damage Avoidance

- ITER modeling: Major disruption deposits up to 20 MJ/m² on divertor — enough to melt tungsten
- Historical: JET disruptions damaged plasma-facing components, requiring multi-month shutdowns
- Disruption rate in advanced tokamaks: ~5-10% of plasma shots
- For commercial tokamak with 10,000+ shots/year: 500-1,000 disruption events
- Even at 1% causing significant wall damage: 5-10 damage events/year
- Each: $1-5M in repair + 2-4 weeks downtime
- Annual disruption cost: $5-50M + lost production during repairs
- Over 30-year plant life: $150M-$1.5B in disruption-related costs
- **Stellarators: zero disruptions by design. Total savings: $150M-$1.5B per plant.**

## Original Calculation #4: Gundremmingen Site Arbitrage

Building Stellaris at the former Gundremmingen nuclear fission site (being decommissioned by RWE) saves:
- **Grid connection:** Existing 380 kV transmission infrastructure (new grid connection for a GW-scale plant: €100-300M)
- **Site licensing:** Nuclear-licensed site with existing environmental approvals (new nuclear site licensing: 5-10 years, €50-200M)
- **Skilled workforce:** Existing nuclear-trained community in Swabia
- **Cooling water:** Danube River access (existing cooling water rights and infrastructure)
- **Estimated total savings: €200-500M vs greenfield site**
- RWE brings power plant construction/operation expertise + existing infrastructure
- This is exactly what CFS doesn't have in Chesterfield County, VA — they're building greenfield

## Counterargument: The Stellarator Construction Complexity Problem

The strongest case against stellarators is that W7-X nearly broke its builders. Thomas Klinger: "No one imagined what it means" to build one. Each of W7-X's 50 coils has a unique, computer-optimized 3D shape — imagine manufacturing 50 bespoke 6-ton electromagnets to sub-millimeter tolerances. That's why stellarators lost the funding race to tokamaks in the 1960s: simpler to build, easier to reason about, better plasma confinement at the time.

But three things have changed:
1. **Computational optimization:** The supercomputer time that enabled W7-X's design didn't exist in the 1960s. Proxima's QI optimization builds on 30 years of computational advances since W7-X was designed.
2. **HTS magnets:** High-temperature superconductors (same technology CFS uses) could simplify stellarator coil manufacturing — smaller, stronger magnets with fewer constraints.
3. **W7-X proved the concept works:** The triple product record and zero-disruption operation validate the physics. The question is no longer "do stellarators work?" but "can we build them at commercial scale?"

## Limitations

1. **W7-X vs ITER is not apples-to-apples on scale.** W7-X is a research machine (plasma volume ~30m³, no DT fuel). ITER is ~10x larger (plasma volume ~840m³, DT fuel). Some of ITER's overruns reflect engineering challenges that don't appear until you scale up.
2. **Proxima's Alpha hasn't been built yet.** The €2B estimate for Alpha is just that — an estimate. It could suffer the same cost-growth dynamics that plagued both W7-X and ITER. Nobody has built a net-energy stellarator.
3. **Capacity factor projections are theoretical.** No stellarator has run for more than 43 seconds at record performance. Extrapolating to 85%+ capacity factor requires solving engineering challenges in materials, cooling, and fuel supply that haven't been demonstrated at scale.
4. **The multinational management tax on ITER is real.** Some of ITER's 5x overrun comes from coordinating 7 nations' in-kind contributions — a management structure Proxima avoids. A single-entity tokamak like CFS SPARC might not suffer the same overrun pattern.
5. **CFS's HTS tokamak approach could close the gap.** If CFS delivers on SPARC's compact high-field design, the capital cost per watt for tokamaks drops substantially. The stellarator's cost advantage may narrow.

## Strongest Counterargument at Full Strength
The strongest case against the stellarator-beats-tokamak thesis is that the tokamak has 60 years of plasma performance data and the stellarator has 43 seconds. W7-X's triple product record is measured against tokamak data from machines that were decommissioned 1-18 years ago (JT60U in 2008, JET in 2023). The current generation of private tokamaks — CFS with HTS magnets, TAE with beam-driven FRC — is explicitly designed to solve the disruption and pulsed-operation problems. CFS's compact high-field approach may achieve near-steady-state operation with far less capital than ITER. If SPARC works as designed in 2027, the tokamak's performance advantage at commercial scale could easily outweigh the stellarator's operational simplicity.

## Sources
1. Reuters, "Google, RWE back Proxima Fusion in €411 million financing round," July 7, 2026
2. RuntimeWire, "Proxima Fusion raises EUR411 million," July 7, 2026
3. BusinessWire/MorningStar, Proxima Fusion MoU press release, February 26, 2025
4. Max Planck Society, "Record financing for Proxima Fusion" (€130M Series A)
5. Wikipedia, "Proxima Fusion" (funding history)
6. TechCrunch, "Every fusion startup that has raised over $100M"
7. Nuclear Engineering International, "Proxima signs stellarator roadmap" (Alpha cost €2B, Bavaria €400M)
8. Science.org, "Stellarators, once fusion's dark horse, hit their stride"
9. Science.org, "The bizarre reactor that might save nuclear fusion" (W7-X feature)
10. Max Planck IPP, "New performance records Wendelstein 7-X" (triple product record, 43 seconds)
11. PPPL, "Wendelstein 7-X sets new performance records in fusion research"
12. Reuters, "ITER nuclear fusion project faces new delay, cost overrun"
13. Science|Business, "ITER fusion project confirms more delays and €5B cost overrun"
14. Scientific American, "World's Largest Fusion Project Is in Big Trouble"
15. Science.org, "Giant international fusion project is in big trouble" (2024)
16. Wikipedia, "ITER" (cost history, Q-factor data)
17. Wikipedia, "SPARC (tokamak)"
18. TechCrunch, "CFS installs reactor magnet, lands deal with Nvidia" (Jan 2026)
19. ANS Nuclear Newswire, "CFS partners with Google DeepMind" (200 MW PPA, TORAX)
20. Reuters, "Nuclear startup Helion hits $15.5 billion valuation" (June 2026)
21. OSTI.GOV, "Three Confinement Systems comparison" (cost element study)
22. ScienceDirect, "Stellaris: A high-field quasi-isodynamic stellarator" (Proxima's concept paper)
23. KIT Publication, "Operational characterization of tokamak and stellarator type fusion power plants" (capacity factor data)
