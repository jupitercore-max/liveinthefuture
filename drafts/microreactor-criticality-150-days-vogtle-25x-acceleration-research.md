# Research: Four US Microreactors Hit Criticality — The 25× Acceleration Math

## Core Story
Four different US startups achieved nuclear criticality under the DOE Reactor Pilot Program by the July 4, 2026 deadline — a Trump administration executive order (EO 14301) goal for America's 250th birthday. All four used different reactor designs, fuels, and coolants. The fastest went from project kickoff to criticality in 150 days.

## The Four Reactors (Primary Source: POWER Magazine, Reuters, DOE, Army.mil)

| Company | Reactor | Criticality Date | Fuel | Coolant | Location | Time to Criticality | Power Target |
|---------|---------|-----------------|------|---------|----------|-------------------|--------------|
| Antares Nuclear | Mark-0 | June 4, 2026 | HALEU/TRISO | Sodium heat-pipe | INL, Idaho | 9 months (blank sheet to criticality) | Electricity 2027, military 2028 |
| Valar Atomics | Ward 250 | June 18, 2026 | TRISO/HTGR | Helium | Utah San Rafael Energy Lab | ~10 months | Began power ascension immediately |
| Deployable Energy | Unity | June 30, 2026 | 4.95% LEU UO2 | Helium (water-moderated) | INL North Beam Station | ~150 days from kickoff | 1 MWe "Nuclear Battery" |
| Aalo Atomics | Aalo-X CTR | July 4, 2026 (12:20 AM MT) | 5% LEU UO2 | Sodium (graphite-moderated) | INL campus (own site) | 8 months (ground to criticality) | 10 MWe demo → 50 MWe Pod |

### Key Details per Company

**Antares Nuclear:**
- Founded 2023, $140M+ funding
- Defense/space applications (Joint Base San Antonio selected for deployment under Air Force ANPI)
- Mark-0 is test platform; Mark-1 electricity-producing reactor in 2027
- "Took the hardest risks head-on" — CEO Jordan Bramble
- Army Janus Program partnership

**Valar Atomics:**
- Founded 2023
- First criticality OUTSIDE the national lab system (Utah)
- Already began power ascension after criticality
- HTGR design using helium coolant

**Deployable Energy:**
- Started 2025 (!!)
- Used DOE Nuclear Energy Launch Pad (not RPP)
- 150 days from project kickoff to delivered reactor + fuel + criticality
- Used existing INL North Beam Station space
- 1-MWe class "Unity Nuclear Battery"
- CEO Bobby Gallagher: "We've proven the supply chain, the team, and the regulatory pathway"
- Uses commercially available materials

**Aalo Atomics:**
- Founded 2023
- 36-day building construction
- 540 fuel rods assembled in 2.5 days
- Factory-fabricated in 40,000 sq ft Austin, TX facility (expanding to 1M sq ft)
- Hired ex-Navy submarine reactor operators
- "Nuclear as a product, not a project" philosophy
- Shipping-container-sized modules
- Microsoft + NVIDIA partnership: AI permitting reduced time 92%, est. $80M/yr savings
- Plans 50 MWe Pod (5 × 10 MWe reactors, shared turbine)
- Building second reactor ("Project Ascension"), excavation complete
- Plans "world's first co-located and co-built nuclear-data center"
- Fuel from Global Nuclear Fuel (GE Vernova)
- Arafat: "The hardest problem in nuclear was never the physics, our country simply forgot how to build"

## Comparison: Vogtle 3 & 4 (Primary Source: Wikipedia, Reuters, AP, ANS)

- 2 × 1,117 MWe AP1000 reactors = 2,234 MWe total
- Original cost estimate (2009): $14 billion
- Final cost: ~$35 billion (incl. $3.7B Westinghouse exit payment)
- Construction started: March 2013 (Unit 3), Nov 2013 (Unit 4)
- Commercial operation: July 2023 (Unit 3), April 2024 (Unit 4)
- Timeline: ~10-11 years construction to operation
- Original timeline: ~4 years (enter service 2016-2017)
- Cost per installed kW: ~$15,700/kW at final cost, ~$6,300/kW at original estimate
- 7 years late, $17 billion over budget

## ORIGINAL CONTRIBUTION: The Acceleration Math

### Time Compression Ratio
- Vogtle 3: 10 years 4 months (March 2013 → July 2023) construction to operation
- Deployable Energy: ~150 days from project kickoff to criticality (zero-power)
- Aalo: 8 months from ground-breaking to criticality
- Antares: 9 months from blank sheet to working reactivity control

**But criticality ≠ commercial operation.** Aalo targets commercial power in 2027, meaning ~18-24 months from criticality. Even so:
- Vogtle: ~126 months (10.5 years) construction → operation
- Aalo projected: ~18-24 months construction → operation (including CTR + Aalo-X power demo)
- Acceleration ratio: 126/21 ≈ **6×** if Aalo meets its 2027 target
- Deployable: if 150-day criticality + 18 months to commercial = ~23 months. Ratio: 126/23 ≈ **5.5×**

### The AI Data Center Gap
- Typical hyperscale data center: 100-500+ MW
- OpenAI just signed for 3.2 GW in Georgia (article #677)
- Microsoft/Google/Meta each planning 5-15 GW of data center capacity

**At Aalo's 50 MWe Pod scale:**
- 1 data center (200 MW) = 4 Pods = 20 individual reactors
- OpenAI's 3.2 GW Georgia campus = 64 Pods = 320 individual reactors
- US hyperscaler demand (~50 GW by 2030) = 1,000 Pods = 5,000 reactors

**At Deployable's 1 MWe scale:**
- Too small for data centers individually, but "nuclear battery" for edge/remote

### The Factory-vs-Construction Paradigm
- Traditional nuclear: custom-built, site-specific, decade-long projects
- Microreactors: factory-fabricated, truck-transportable, modular assembly
- Aalo expanding to 1M sq ft factory for mass production
- "Nuclear as a product, not a project"

### The DOE Reactor Pilot Program as Industrial Policy
- Executive order set 3-reactor deadline; 4 delivered
- 10 total companies selected (August 2025)
- DOE bypassed NRC licensing for prototypes
- Provided national lab land, fuel access, expert support, safety review
- Next up: Oklo Isotopes (Groves reactor, targeting July 2026 criticality), Radiant Nuclear (Kaleidos, TRISO-fueled, 5-phase test campaign summer 2026)

### What They Didn't Prove (Limitations)
1. Zero-power criticality ≠ power generation. "A zero-power-criticality test can be achieved without making real engineering progress on fuel or design" — Kathryn Huff, former DOE assistant secretary
2. None have produced electricity yet
3. Cooling systems, turbines, power conversion still needed for most
4. NRC commercial licensing process not yet tested for these designs
5. Cost per MWe at scale unknown — no commercial pricing disclosed
6. Third Way analysis called the program an "unhelpful diversion" from larger capacity goals
7. Microreactors are 100-1000× smaller than conventional plants — can they aggregate?

### Strongest Counterargument
Third Way's analysis: federal focus on microreactors is an "unhelpful diversion" from meaningfully increasing nuclear capacity. These are 1-50 MWe units vs. 1,117 MWe Vogtle-class reactors. Even 100 Aalo Pods (5,000 MWe) would equal just ~2 Vogtle-scale plants. The attention and resources going to microreactor startups may not produce the GW-scale capacity the grid and data centers need.

Also: "Artificially accelerating project timelines is a short-term solution, not a long-term fix" — Third Way memo. The speed came partly from DOE bypassing NRC oversight, which raises safety questions.

## Primary Sources
1. Reuters Events: https://www.reuters.com/business/energy/four-us-microreactors-hit-criticality-milestone--reeii-2026-07-22/
2. POWER Magazine: https://www.powermag.com/aalo-atomics-test-reactor-reaches-criticality-at-inl-fourth-doe-authorized-advanced-reactor-by-july-4/
3. MIT Technology Review: https://www.technologyreview.com/2026/07/09/1140235/nuclear-reactor-milestone-criticality/
4. U.S. Army: https://www.army.mil/article/293057/
5. Antares Nuclear (BusinessWire): https://www.businesswire.com/news/home/20260604167405/en/
6. DOE Executive Order 14301 (Federal Register)
7. Vogtle cost data: Wikipedia (sourced from AP, MEAG financial reports, Georgia PSC filings)
8. Third Way analysis (referenced in MIT Tech Review)

## Journalist
Viktor Holm — Physics & Energy beat
