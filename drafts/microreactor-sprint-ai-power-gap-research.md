# Research: The 150-Day Reactor Problem

## Core Story
Three nuclear startups — Antares Nuclear, Valar Atomics, and Deployable Energy — achieved criticality at Idaho National Laboratory before the July 4, 2026 deadline set by Trump's Executive Order 14301 (May 2025). This is genuinely fast: Deployable Energy did it in ~150 days from project kickoff. Valar partnered with Nvidia to demonstrate powering Blackwell AI chips on July 1.

But criticality ≠ commercial power. The original analysis here: calculating how many microreactors these startups would need to build to meaningfully serve AI data center demand, and what the criticality-to-commercial timeline actually looks like.

## Primary Sources

### 1. Nuclear Engineering International — "Criticality for third US reactor" (Jul 3, 2026)
- Deployable Energy's Unity reactor: zero-power fuelled criticality at INL
- Third DOE-authorized reactor to go critical by July 4 deadline
- Unity Nuclear Battery (UNB): 1 MWe gas-cooled microreactor, helium primary loop, standard LEU fuel
- Fits in a 20-foot shipping container; CEO drove core test rig cross-country in a Ford F-150
- 150 days from kickoff to criticality — a record
- NRC licensing still required for commercial; Deployable expects 6-12 month review
- Source: https://www.neimagazine.com/news/criticality-for-third-us-reactor/

### 2. Reuters — "Valar nuclear startup partners with Nvidia" (Jul 2, 2026)
- Valar Atomics + Nvidia partnership for nuclear-powered data center in Utah
- First time a small reactor powered a data center (Blackwell chip demo, Jul 1)
- Ward 250: 100 kWt thermal, HTGR, TRISO fuel, helium coolant, scalable to 5 MWe
- Reuters/Ipsos: only 1 in 3 Americans approve of fast data center construction
- Source: Reuters via multiple outlets

### 3. 1ban.news — "Valar Atomics powers Nvidia AI chip" (Jul 3, 2026)
- Valar founded 2023 by Isaiah Taylor (27 years old)
- Funding: $19M seed (early 2025), $130M (Nov 2025), $450M (2026) → $2B valuation
- Backers: Palmer Luckey (Oculus/Anduril), Shyam Sankar (Palantir CTO)
- Zero-power criticality achieved November 2025

### 4. Reuters — "Nuclear startups bullish on US pilot program" (Feb 2026)
- EO 14301 (May 2025): Reactor Pilot Program, 10 companies selected
- Companies: Aalo Atomics, Antares Nuclear, Atomic Alchemy, Deep Fission, Last Energy, Oklo, Natura Resources, Radiant Energy, Terrestrial Energy, Valar Atomics
- Companies exempt from NRC permits for test phase; DOE authorization only
- Companies fund own equipment; DOE provides land + national lab expertise
- All secured HALEU fuel supplies

### 5. US Army/DOE — "Antares Nuclear Mark-0 criticality" (Jun 4, 2026)
- First RPP reactor to go critical: June 4, 2026 at INL
- Sodium heat-pipe-cooled microreactor, HALEU TRISO fuel
- Connected to Army's Janus Program for military microreactor deployment
- Source: army.mil

### 6. Washington Examiner — "Nuclear developers hit Trump's July 4 deadline" (Jul 2, 2026)
- Aalo Atomics: founded 2023 (2 employees), now ~200 people; built reactor in 5 months at INL
- Aalo plans NRC application later in 2026, commercial target 2029
- Targeting data center power

### 7. Power Magazine — "Valar Atomic's Ward 250 second reactor critical" (Jun 19, 2026)
- Ward 250: 100 kWt initial test, scalable to 5 MWe
- Kiewit Nuclear Solutions: EPC contractor
- DSA approval: preliminary Feb 2026, final Apr 23, 2026
- "Nine months ago, this was an empty site" — Isaiah Taylor
- Valar had aimed for POWER OPERATIONS by July 4, not just criticality
- Three C-17 Globemaster III military transport aircraft to move reactor from CA to UT

### 8. Market Data
- Oklo (OKLO): $52.36, market cap $9.1B, 52-week range $44.88-$193.84
- NuScale (SMR): $9.76, market cap $3.6B, 52-week range $8.85-$57.42
- NuScale: peaked $53.43 (Oct 2025), now $9.76 — down 82%
- NuScale revenue: ~$31M (2025), projected $311M by 2028, no commercial reactor
- NuScale first commercial deployment: early 2030s

### 9. Data Center Power Demand
- IEA: data center electricity 415 TWh (2024), projected 945 TWh by 2030
- Gartner (Jun 2026): 565 TWh globally in 2026, 132 GW demand
- Goldman Sachs: US data center demand 31 GW (2025) → 66 GW (2027)
- LBNL: US data centers 325-580 TWh by 2028 (6.7-12% of national electricity)
- $500B+ data center investment in 2026 alone
- Meta + Oklo: 1.2 GW campus in Ohio
- Amazon + X-energy: 5 GW SMR by 2039
- Google + Kairos: first SMR by 2030

### 10. Historical Nuclear Timeline (DOE.gov, Wikipedia)
- Shippingport: criticality Dec 2, 1957 → grid power Dec 18, 1957 (16 days, but years of prior construction, 60-72 MWe)
- NuScale: NRC design cert application 2017 → certification 2023 (6 years). No operating reactor.
- Typical NRC licensing: 4-10 years for new designs
- Proposed NRC microreactor rule could streamline to 6-12 months

## ORIGINAL ANALYSIS: The Microreactor Math Problem

### Calculation 1: Reactors needed for data center demand
- US data center demand growth: 35 GW of incremental demand by 2027 (Goldman Sachs: 31 GW → 66 GW)
- Deployable Energy UNB: 1 MWe each → 35,000 reactors for the incremental demand alone
- Valar Ward 250 at scale: 5 MWe → 7,000 reactors
- Even Oklo's Aurora (target 15 MWe): 2,333 reactors
- NuScale (77 MWe per module): 455 modules — but none operating

A single Meta-scale data center campus: ~500 MW. At 5 MWe per Valar reactor, that's 100 microreactors for ONE campus. Valar has built exactly one.

### Calculation 2: The market cap-to-megawatt ratio
- Oklo: $9.1B market cap / 0 MWe operating = undefined (infinite dollars per operating megawatt)
- NuScale: $3.6B / 0 MWe = same
- For comparison: NextEra Energy (world's largest renewable energy company): ~$170B market cap / ~34 GW operating capacity = ~$5M per MWe
- These companies are priced on the future. But the gap between zero and 7,000 reactors is enormous.

### Calculation 3: Speed vs. the licensing wall
- Deployable: 150 days from kickoff to criticality (record speed)
- But: NRC licensing for commercial = 6-12 months (optimistic, new microreactor rule)
- NRC historically: NuScale took 6 years just for design certification
- Even at 6-month NRC review + 150-day build = ~11 months per reactor type
- But that's per DESIGN, not per unit. Mass production of approved designs could be faster.
- The bottleneck shifts from construction speed to NRC throughput.

### Calculation 4: The Nvidia demo put in context
- Ward 250 at 37% capacity during demo = ~37 kWt thermal (not electrical)
- Electrical conversion efficiency for HTGR: ~30-40%
- So roughly ~11-15 kWe during demo
- An Nvidia B200 GPU draws ~1 kW; a rack of 8 draws ~10.2 kW
- The entire reactor demo could barely power one and a half GPU racks
- A single Nvidia DGX SuperPOD: ~40 MW
- Ward 250 at full 5 MWe: could power about 1/8 of one SuperPOD

## Kill Test
Original calculation: The reactors-per-data-center math, market-cap-per-megawatt ratio, and the demo-output-to-actual-demand conversion. Nobody has run these numbers. The standard coverage is "first microreactor powers AI chip!" without asking how many thousands more are needed.

## Journalist
Tomás Reyes — Tech Infrastructure beat. Previously wrote "Only 7 Companies Can Afford Custom AI Chips" (#546).
