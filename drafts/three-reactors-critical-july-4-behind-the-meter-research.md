# Research: Three Nuclear Reactors Critical by July 4 — Behind-the-Meter Economics

## Core Story
Three nuclear startups achieved criticality within 26 days (June 4-30, 2026), meeting Trump's July 4 deadline set by Executive Order 14301 (May 2025). This is the first non-light-water reactor criticality in the US in 40+ years. But the real story isn't the physics — it's the economics. These reactors aren't competing for grid electricity like NuScale tried (and failed). They're targeting behind-the-meter data center power, where the price comparison is entirely different.

## The Three Reactors

### 1. Antares Nuclear — Mark-0
- **Criticality:** June 4, 2026 at Idaho National Laboratory
- **Type:** Non-light-water advanced microreactor (TRISO fuel)
- **Significance:** First privately developed non-light-water reactor to go critical in the US in 40+ years
- **Company:** Founded 2023, Torrance CA. Raised $140M+ ($96M Series B, Dec 2025)
- **Timeline:** Machining graphite core Jan 12, 2026 → criticality June 4 = ~5 months
- **Partners:** BWX Technologies (fuel fab since Oct 2025, HALEU from DOE allocation), US Army observation
- **Customers:** US Air Force, Space Force, NASA, Defense Innovation Unit
- **Commercial target:** Deployments for defense/space in 2028
- **CEO Jordan Bramble:** "The goal of a reactor is to sell electricity to customers."
- **Source:** DOE press release (energy.gov), Morningstar, POWER Magazine, New Atlas

### 2. Valar Atomics — Ward 250
- **Criticality:** June 18, 2026 at Utah San Rafael Energy Lab (USREL), Emery County
- **Type:** Gen IV HTGR — TRISO fuel, helium coolant, graphite moderator
- **Significance:** First DOE-authorized reactor built and operated OUTSIDE the national laboratory system
- **Electricity demo:** July 1 — powered Nvidia Blackwell chip, temporarily hosted a website
- **Nvidia partnership:** Joint design for 30MW water-free data center
- **Reactor delivery:** 8 modules airlifted on three C-17 Globemaster aircraft to Hill AFB, then trucked to USREL
- **Nuclear history:** NOVA Core achieved zero-power criticality at LANL Dec 2025
- **Operating temp:** >750°C
- **Source:** POWER Magazine, Reuters, Bloomberg, Interesting Engineering, NEI Magazine

### 3. Deployable Energy — Unity
- **Criticality:** June 30, 2026 at Idaho National Laboratory (National Reactor Innovation Center)
- **Type:** Nuclear battery, ~1 MW
- **Significance:** Third reactor, meeting the EO deadline. First under Nuclear Energy Launch Pad initiative.
- **Timeline:** ~150 days from start to criticality (per INL director John Wagner)
- **CEO Bobby Gallagher:** Co-founder
- **Application:** Transportable nuclear battery technology
- **Source:** DOE press release (energy.gov), Washington Examiner, Interesting Engineering

## The Failed Predecessor: NuScale
- **NuScale UAMPS Carbon Free Power Project:** Terminated November 2023
- **Investment:** DOE approved $1.35B over 10 years; ~$600M spent since 2014
- **Failure reason:** Cost rose from $58/MWh to $89/MWh; utilities couldn't afford it
- **Comparison:** NuScale tried to sell grid electricity at $89/MWh vs. solar at $30-45/MWh
- **Stock:** Fell 37% on cancellation day; currently ~$9.76, down 75% in 12 months
- **Lesson:** Grid electricity competition is lethal. These new reactors avoid it entirely.

## The Behind-the-Meter Data Center Thesis (Original Analysis)

### Grid prices during stress events
- PJM day-ahead: topped $2,000/MWh in parts (July 2026 heat wave)
- PJM Western Hub: settled at $1,222.75/MWh (July 2026)
- PJM capacity market: $333.44/MW-day, up 11× from $28.92 three auctions ago
- 63% of capacity price increase attributed to data centers = $9.3B on ratepayers (Monitoring Analytics)

### Data center demand projections
- Current US data center IT power: ~21 GW (2023)
- McKinsey projection: 50+ GW by 2030 (raised from 35 GW)
- LBNL: data centers could use 9.5-15.3% of US electricity by 2030
- BloombergNEF: 106 GW by 2035
- BCG: 50-80 GW capacity shortfall by 2030
- PJM alone: +32 GW data center demand by 2030 (30 GW from data centers)
- PJM supply gap: demand outpaces supply by 6.6 GW starting 2027

### The water dimension
- Nvidia DSX closed-loop cooling: reduces water from ~2.6M gallons/MW/year to near zero
- Valar Ward 250: water-free reactor design
- Combined: nuclear-powered, water-free data center — eliminates two biggest complaints
- Reuters/Ipsos: only 1/3 of Americans approve fast pace of data center construction
- November 3 midterm elections: data center backlash is a voter issue

### Why behind-the-meter changes everything
NuScale failed selling grid power at $89/MWh because it competed with:
- Solar LCOE: ~$30-45/MWh
- Wind LCOE: ~$25-50/MWh
- Natural gas: ~$40-60/MWh

Behind-the-meter nuclear for data centers competes with:
- PJM peak prices: $1,222-2,000/MWh
- PJM capacity charges: $333.44/MW-day = ~$13.89/MWh averaged over 24 hours
- Grid interconnection queue: 5+ year wait for new connections
- Community opposition: data centers face backlash for grid strain + water use

Even at $150-200/MWh LCOE, behind-the-meter nuclear is:
- 6-13× cheaper than PJM peak prices
- Immune to capacity market charges
- Bypasses grid interconnection entirely
- Eliminates water complaints
- Provides 24/7 baseload (no battery storage needed)

## Original Calculation: The Grid Bypass Premium

**Traditional grid data center (PJM, 50MW facility):**
- Average wholesale electricity: ~$50/MWh
- Capacity charges: $333.44/MW-day × 365 × 50MW = $6.1M/year (at new capacity rates)
- Transmission & distribution: ~$15-20/MWh
- Water consumption: 2.6M gallons × 50MW = 130M gallons/year
- Grid interconnection wait: 5+ years
- Total effective cost: ~$80-100/MWh + years of delay

**Behind-the-meter nuclear (30MW Valar/Nvidia facility):**
- Estimated LCOE: $150-200/MWh (SMR range per NREL estimates for near-term)
- Capacity charges: $0 (behind the meter)
- Transmission: $0
- Water: near-zero (closed-loop cooling)
- Grid interconnection wait: 0 (independent)
- Time to deployment: potentially 2-3 years from criticality

**The crossover:** At current PJM capacity rates, the nuclear premium over wholesale electricity is offset by capacity charges, transmission costs, and time-to-deployment value. Factor in the 2026 PJM price spikes, and behind-the-meter nuclear at $200/MWh is already cheaper than what some data centers paid this month.

## Comparative Timeline Analysis

### Historical nuclear timelines (original compilation)
- Vogtle 3&4 (US, 2023-2024): 14 years construction, $35B for 2.2 GW = $15,900/kW
- Flamanville 3 (France, 2024): 17 years construction, €23.7B for 1.65 GW = €14,364/kW
- French 1980s program average: ~6-7 years, €1,335/kW
- NuScale UAMPS: 9+ years development, $600M+ spent, zero watts delivered

### Microreactor timelines
- Antares: Founded 2023 → criticality June 2026 = 3 years from founding
- Deployable Energy Unity: ~150 days from start at INL to criticality
- Valar Ward 250: Ground broken mid-2025 → criticality June 2026 = ~12 months on site

### What criticality IS and ISN'T
**Is:** Self-sustaining nuclear fission chain reaction. Validates reactor physics, core geometry, control rod performance, neutronic behavior.
**Is not:** Electricity generation. Commercial operation. Grid connection. Revenue.
**Analogy (Barron's):** "Equivalent to turning on a car engine without pressing the accelerator"
**Next steps:** Reactor physics experiments → power ascension → thermal testing → NRC commercial licensing (for non-DOE sites) → commercial deployment

## Strongest Counterargument
- These are zero-power criticality demonstrations, not commercial reactors
- DOE authorization ≠ NRC commercial license. Operating outside DOE labs requires full NRC licensing, which takes years.
- No advanced reactor has achieved commercial operation in the US
- NuScale had NRC design certification and still failed commercially
- Valar's electricity demo powered "a few light bulbs" — not a data center
- Military/defense contracts (Antares) may not translate to commercial viability
- Policy officials' claim of "electricity as early as next year" and "commercial deployment before 2028" has no precedent backing it
- The 10 companies in the DOE program: only 3 (possibly 4 with Aalo) hit criticality. What about the other 6-7?

## Limitations
- LCOE estimates for microreactors are projections, not demonstrated costs
- Behind-the-meter economics depend on sustained high grid prices; if grid capacity catches up, the premium shrinks
- PJM peak prices are extreme events, not average costs; using them as the comparison overstates the case
- NRC commercial licensing timeline for these new designs is genuinely unknown
- We don't have public cost data for Valar or Deployable Energy (Antares: $140M raised, but burn rate unknown)
- DOE Reactor Pilot Program used expedited authorization, not NRC licensing — commercial sites require NRC

## Sources
1. DOE press release: "U.S. Department of Energy Meets President Trump's Goal, Delivers Third Advanced Reactor Criticality" (July 1, 2026) — energy.gov
2. DOE press release: "Department of Energy Celebrates First Advanced Reactor Criticality" (June 4, 2026) — energy.gov
3. Morningstar: "Antares Achieves Initial Criticality" (June 4, 2026)
4. POWER Magazine: "Valar Atomic's Ward 250 Becomes Second Reactor to Go Critical" (June 19, 2026)
5. Reuters: "Valar nuclear startup partners with Nvidia on data center" (July 1, 2026)
6. Interesting Engineering: "US first: Nuclear reactor generates electricity to power Nvidia chip" (July 2, 2026)
7. Barron's: "3 Small Nuclear Reactors Hit a Milestone, but There's a Long Road From Here" (July 3, 2026)
8. Reuters: "NuScale ends Utah project, in blow to US nuclear power ambitions" (Nov 8, 2023)
9. IEEE Spectrum: "First U.S. Commercial Small Nuclear Reactor Axed" (Nov 2023)
10. PJM data via OilPrice.com: Power prices and capacity market (July 2026)
11. McKinsey: US data center demand projections (50+ GW by 2030)
12. BloombergNEF: 106 GW US data center demand by 2035
13. NREL ATB 2024: Nuclear construction time estimates (SMR: 43-71 months)
14. Washington Examiner: "Nuclear developers hit Trump's July 4 deadline" (July 1, 2026)
15. Reuters/Ipsos: Data center approval poll (June 2026)
16. MIT Climate Portal: Nuclear construction costs analysis
17. World Nuclear Association: Economics of Nuclear Power
18. Zacks: "Why DOE's July 4 Reactor Deadline Matters to Nuclear Stocks" (June 30, 2026)
19. BCG: "Solving the US Data Center Power Crunch" — 50-80 GW shortfall by 2030
20. WSJ: "AI Data Centers Have Been Great for the Steel Industry. Now, a Power Crisis Looms." — LBNL forecast 9.5-15.3% of US electricity by 2030

## Journalist
Kai Nakamura — Economics/Energy beat (previously: General Fusion SPAC cost-per-keV gap, Token/Jevons paradox)

## Kicker
⚡ Energy
