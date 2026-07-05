# Research: America's Nuclear Reactor Sprint

## Story Angle
Three nuclear startups achieved criticality by Trump's July 4, 2026 deadline — hitting in ~10 months what used to take 10-16 years. Original analysis: timeline compression ratio, the data center demand gap these microreactors are supposed to fill, and whether the production rate can scale.

## Primary Sources

### DOE Official Announcements
- **DOE Press Release (Jun 4, 2026):** "Department of Energy Celebrates First Advanced Reactor Criticality" — Antares Nuclear's Mark-0 at Idaho National Laboratory. "First time in more than four decades a new privately developed non-light-water reactor has reached criticality in the United States." Energy Secretary Chris Wright. 53rd reactor built at INL since 1951. Source: energy.gov
- **DOE RPP Selection (Aug 12, 2025):** 11 advanced reactor projects from 10 companies selected. Goal: construct, operate, achieve criticality of at least 3 test reactors by July 4, 2026. Companies fund their own equipment. Source: energy.gov
- **Executive Order 14301 (May 2025):** "Reforming Nuclear Reactor Testing at the Department of Energy" — set the July 4, 2026 deadline.

### Army.mil (Jun 4, 2026)
- Antares Mark-0 = zero-power criticality test at INL's Reactor and Critical Experiment (RACE) facility
- RPP serves as foundation for Army's Janus Program (deploy nuclear microreactors for military installations)
- Presidential EO 14299: "Deploying Advanced Nuclear Reactor Technologies for National Security"

### The Three Companies That Hit Criticality
1. **Antares Nuclear** (Torrance, CA) — Mark-0 microreactor. Sodium heat-pipe-cooled, HALEU TRISO fuel compacts. Founded 2023, $140M+ raised ($96M Series B, Dec 2025). Zero-power criticality Jun 4, 2026 at INL. Commercial product: R1 microreactor, 100 kWe to 1 MWe. Military deployment target: 2028. Electricity production: 2027.
2. **Valar Atomics** — Ward 250, high-temperature gas reactor. First military airlift of a microreactor ("Operation Windlord") Feb 15, 2026 via C-17 from March ARB to Hill AFB → San Rafael Energy Lab, Utah. 100 kWt initial (scalable to 5 MWe). Commercial target: 2028.
3. **Deployable Energy** (Houston) — Unity demonstration microreactor. High-temperature gas reactor. Zero-power fueled criticality Jul 1, 2026 at INL NRIC. First reactor under Nuclear Energy Launch Pad initiative. Built in 150 days.

### Near-Misses
4. **Aalo Atomics** (Austin) — Critical Test Reactor ("Project First Light") at INL. Sodium-cooled, UO2-fueled, thermal-spectrum, <20 MWth, 10 MWe fuel load. Founded 2023 with 2 employees, now ~200. Built reactor in 5 months. DSA approval Apr 30, 2026. On verge of criticality. Commercial target: 2029. NRC application later 2026.

### Other RPP Participants (11 total)
Atomic Alchemy, Deep Fission, Last Energy, Oklo, Natura Resources, Radiant Energy (Radiant Industries), Terrestrial Energy, + 11th project.

### NRC Regulatory Context
- **Part 53** (effective Apr 29, 2026): New licensing pathway for SMRs. Risk-informed, technology-inclusive.
- **Part 57** (approved April 2026): Microreactor licenses in 6-12 months.
- Previous path: Part 50, designed for light-water reactors. Advanced reactor developers needed exemptions.

### NuScale Timeline (Comparison)
- Founded: 2007
- DCA submitted to NRC: March 2017 (12,000 pages + 2M additional pages)
- NRC review: 42 months
- Final Safety Evaluation Report: Aug 2020
- Design certification published: Jan 2023
- Total: 16 years from founding to certification
- DOE funding: $600M+
- Project cost estimate: rose from $58/MWh to $89/MWh (+53%)
- UAMPS Idaho project: CANCELLED
- NuScale never built a commercial plant

### Data Center Power Demand
- **DOE (Jul 2025):** 100 GW new peak capacity needed by 2030, 50 GW from data centers alone
- **BloombergNEF:** 106 GW US data center demand by 2035 (36% higher than previous forecast)
- **Grid Strategies:** 65 GW data center load by 2030 (more conservative)
- **PJM:** Peak demand growing 32 GW by 2030, all but 2 GW from data centers
- **PJM prices (Jul 2026):** Day-ahead power topped $2,000/MWh, capacity market $333.44/MW-day (up 11x from $28.92). 63% of run-up from data centers = $9.3B on ratepayers.
- **Pew Research:** Nuclear supplies ~20% of data center electricity currently
- **NEMA:** 300% jump in data center energy consumption over next 10 years

### AMPERA — 3D-Printed Reactor Module (Jul 2, 2026)
- First full-scale, 3D-printed nuclear reactor module produced
- Subcritical, solid-state, factory-built thorium reactor
- Core: spherical monolithic gyroid, SiC, 3D-printed
- TRISO thorium kernels fuel
- 30 years without refueling
- Up to 30 MWe
- Australian subsidiary for thorium supply

### Fuel Supply Constraints
- HALEU: no US commercial enricher at scale yet
- Centrus Energy: demo cascade in Piketon, OH — 920 kg produced total (enough for demos only)
- Urenco: first multi-year commercial HALEU supply contract with Antares (May 2026). Advanced Fuels Facility at Capenhurst, UK — online 2031, up to 27 MT/year (enough for ~30 reactors)
- TRISO fuel: BWXT manufactures at Lynchburg, VA

## Original Calculations

### Timeline Compression
- NuScale: 2007 founding → 2023 NRC certification = 16 years, never built commercial plant
- Oklo: NRC application 2020, denied 2022 — still working
- Traditional GAO estimate: 10-12 years to plan, license, build
- RPP companies: Selected Aug 2025 → Criticality Jun-Jul 2026 = ~10 months
- Antares: Founded 2023, chalkboard → splitting atoms in 9 months
- **Compression ratio: 16 years / 10 months = 19.2x faster (start to criticality)**
- The trick: DOE authorization bypasses NRC. Companies exempt from NRC permitting during pilot phase.

### Data Center Demand Gap
- Conservative demand: 50 GW new data center capacity by 2030
- Average microreactor output: ~3 MW (weighted across designs: Antares 0.5 MW, Valar 5 MW, Deployable ~5 MW, Aalo 10 MW)
- At 3 MW average: 50,000 MW / 3 MW = 16,667 microreactors needed for data centers alone
- Current production rate: 3 reactors in 10 months = ~3.6/year
- At current rate: 16,667 / 3.6 = 4,630 years
- To meet 2030 demand (4 years away): need 4,167/year
- **Scale gap: current rate needs to increase 1,157x**
- Even at larger SMR scale (300 MW NuScale-class): 50,000/300 = 167 reactors. Still huge.
- But: microreactors aren't replacing grid-scale. They're for distributed/behind-the-meter data center power.

### The Criticality-to-Electricity Gap
- Criticality ≠ electricity ≠ commercial ≠ affordable
- Antares Mark-0: zero-power, no power conversion equipment. Electricity: 2027.
- Valar Ward 250: 100 kW start, commercial 2028.
- Deployable Unity: criticality achieved, power timeline unclear.
- Aalo: full-power demo H2 2026, commercial 2029.
- **Minimum 1-3 years from criticality to first watt sold.**
- Meanwhile: PJM prices already tripling. The grid can't wait.

### Cost Reality Check
- NuScale cost: rose from $58/MWh to $89/MWh (+53%) and still cancelled
- Microreactor electricity cost: not yet established (none have generated commercial power)
- Union of Concerned Scientists (Edwin Lyman): "no business case for microreactors — even if they work as designed — will produce electricity at far higher cost than large nuclear reactors, not to mention renewables"
- Solar LCOE: ~$30-40/MWh. Wind: ~$30-45/MWh.
- These microreactors would need to beat $89/MWh to avoid NuScale's fate
- Counter: 24/7 baseload vs intermittent renewables, no transmission needed for on-site data center power

## Kill Test (Original Contribution)
✅ Original calculation: Timeline compression ratio (19.2x), data center demand scaling gap (1,157x), the criticality-to-commercial timeline disconnect
✅ Novel comparison: 10 months vs. 16 years — nobody has run these numbers head-to-head
✅ Data combination: PJM real-time price spike data + microreactor output specs + demand projections = gap analysis nobody has published
