# Research Notes: SandboxAQ CHIPS Act Materials Discovery

## Story Thesis
The US is spending ~$400B building new semiconductor fabs, but the chemicals, magnets, catalysts, and batteries those fabs need are overwhelmingly sourced from or controlled by China. A $500M CHIPS R&D award to SandboxAQ attempts to use physics-based AI to close this materials gap. The question: Is $500M enough to derisk $400B in exposed investment?

## Original Calculation: The Materials Dependency Ratio
- Total US semiconductor investment pledged since 2022: ~$400B (private + CHIPS subsidies)
- 19 companies, 40 projects funded under CHIPS Act ($30.9B direct + $5.5B loans) as of July 2025
- Revenue capacity of planned leading-edge fabs when operational: $200-300B/year
- Each fab costs $4-20B and takes 3-5 years to build
- US fab capacity: planned 208% increase from 2022-2032

### PFAS Exposure Per Fab
- Semiconductor effluent PFAS concentration: avg 840 ng/L — 8-9x higher than municipal wastewater (wwdmag.com study)
- One unnamed fab: 78,000 ppt in wastewater vs EPA limit of 4 ppt (19,500x over)
- Average PFAS discharge: ~4g/day per facility, ~3.2 lbs/year
- Electronics/semiconductors: 3rd largest consumer of fluoropolymers (11% of EU total, 2020)
- Only 0.8% of PFAS used remains on chip — rest goes to wastewater or incineration
- PFAS-containing layers increase with smaller nodes (more lithography steps): 3nm uses 2x+ the masks of 7nm
- PFAS in semiconductor manufacturing: photoresists, anti-reflective coatings, surfactants, heat-transfer fluids, lubricants, insulating coatings, surface treatments, O-rings/gaskets
- EPA national PFAS compliance cost: $1.5B/year (EPA estimate) to $3.8B/year (AWWA estimate)
- National capital improvement: $37-48B (AWWA)
- WSC phased out PFOA intentional use by 2023, but many other PFAS classes remain
- Industry position (PFAS Consortium 2023): "extremely difficult, if not impossible in some instances, to find viable alternatives"

### Rare Earth Exposure Per Fab
- China: 90%+ of NdFeB magnet production, 90% of refining capacity (USGS)
- Global NdFeB production: 220,000-240,000 tonnes/year, 85-90% China
- US imports: ~7,000 tonnes NdFeB magnets/year
- Largest Chinese producer (JL MAG): 25,000 tonnes/year — comparable to ALL non-China producers combined
- NIST press release: "China controls more than 90% of global production of neodymium-based permanent magnets, which are critical inputs to semiconductor manufacturing equipment"
- Semiconductor equipment uses NdFeB magnets in: precision motors, turbo-molecular vacuum pumps, wafer handling robots, positioning stages, actuators
- MP Materials (Mountain Pass, CA): only NA mine/processor, but total US projects make small dent
- China export controls: April 2025 (Round III), October 2025 (Round IV) — suspended until Nov 2026 but regime preserved
- IEA: China is leading refiner for 19 of 20 strategic minerals, avg market share ~70%

### Battery/Backup Power Exposure
- Fabs require massive UPS (uninterruptible power) — lithography wafer batches worth millions destroyed by power fluctuations
- Lithium, cobalt: primarily China-processed
- NIST: "Most backup power systems rely on critical minerals (e.g. lithium, cobalt) sourced primarily from China"

### Catalyst Exposure
- Upstream precursor generation for fab gases
- Exhaust gas abatement catalysts
- Foreign supplier control over catalyst formulations and process IP

### The Insurance Math (ORIGINAL CALCULATION)
- $500M / $400B exposed investment = 0.125% — an insurance premium of $1.25 per $1,000
- Leading-edge fab revenue: ~$2B/month (50K wafers/month × ~$15K-$20K revenue/wafer)
- ONE DAY of fab downtime from materials disruption: ~$65M lost production
- ONE WEEK industry-wide disruption across 40 projects: potentially $4-5B
- SandboxAQ award = ~10% of one week's disruption cost
- Compare: average industrial property insurance rate = $2-5 per $1,000

## SandboxAQ Details
- Founded: 2022 (Alphabet spinoff, 6-year moonshot project)
- CEO: Jack D. Hidary
- Chairman: Eric Schmidt (former Google CEO)
- Valuation: $5.75B (April 2025)
- Total raised: $1B+ (Series E: $300M at $5.6B from T. Rowe Price, Marc Benioff, Yann LeCun, etc.; $150M add-on from Google, Nvidia, Ray Dalio)
- Employees: 51-200 (LinkedIn)
- HQ: Palo Alto, CA
- Platform: Large Quantitative Models (LQMs) — trained on physics/chemistry data, not text
  - "Physics-grounded" — use equations of physics, chemistry, math to simulate real-world systems
  - Can run quantum chemistry calculations, molecular dynamics, microkinetics
  - NVIDIA partnership: 80x computational chemistry boost
  - Acquired Good Chemistry (computational chemistry company)
  - Joined OpenFold consortium
  - ReAQT platform (for PFAS screening specifically)
  - Integrated with Anthropic's Claude for drug discovery interface
- Head of Semiconductor Materials Innovation: Shalini Sharma, Ph.D.
- NIST says SandboxAQ will "screen millions of candidate materials" computationally

## Government Details
- Award: $500M from DoC CHIPS R&D Office
- Date: June 17, 2026 (definitive agreement signed)
- Secretary Howard Lutnick quoted
- Bill Fraunhofer, Executive Director of Semiconductor Investment and Innovation, quoted
- DoC receives minority, non-controlling EQUITY STAKE in SandboxAQ
- Part of Trump administration CHIPS R&D allocation
- Previous CHIPS R&D: $150M for new chipmaking tools, $2B for quantum computing
- Legal: Wilson Sonsini Goodrich & Rosati advised SandboxAQ

## Counterargument
The strongest counterargument is that computational materials discovery has a long history of promising more than it delivers. No physics-based AI has yet produced a commercially viable PFAS alternative or rare-earth-free permanent magnet at scale. The gap between identifying a promising candidate molecule in silico and qualifying it for use in a semiconductor production line — where contamination at the parts-per-trillion level can destroy batches — typically spans 5-10 years. PFAS alternatives already exist in some applications (WSC phased out PFOA), but broader replacement remains unsolved.

## Limitations
- We don't have per-fab data on magnet counts or PFAS volumes for specific new US fabs
- Revenue-per-wafer estimates are industry averages; actual varies by product
- SandboxAQ's LQM track record in materials discovery is limited (mostly biotech/drug discovery)
- The equity stake terms are undisclosed
- No timeline has been specified for when commercially viable replacements must be delivered

## Sources
1. NIST press release (June 17, 2026) — CHIPS R&D award details
2. Reuters (Stephen Nellis, June 17, 2026) — SandboxAQ award reporting
3. GAO-26-107882 — Semiconductors: Information on Projects Funded (July 2025)
4. wwdmag.com — "PFAS in semiconductor manufacturing: Policy, current data" (January 2026)
5. arxiv.org — "Modeling PFAS in Semiconductor Manufacturing to Quantify Trade-offs" (January 2026)
6. SIA — Global phaseout of PFOA intentional uses (July 2024)
7. IEEE Spectrum — MP Materials neodymium magnets reporting
8. IEEE Spectrum — CHIPS Act funding analysis
9. EE Times — "China weaponizes rare earths" (June 2026)
10. TechRepublic — G7 critical minerals (June 2026)
11. SandboxAQ LinkedIn posts (June 2026) — four programmatic areas, Shalini Sharma quotes
12. Tom's Hardware — PFAS filtration breakthrough, China rare earth controls
13. CFR — CHIPS Act investment tracker
14. SEMI World Fab Forecast — 18 new construction projects 2025
