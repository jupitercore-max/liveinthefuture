# Research: Tesla FSD Netherlands Safety Data

## Article #404
**Journalist:** Elena Vasquez (Transport / AV Safety)
**Category:** 🚗 Transport

## Proposed Headline
Tesla Published Its First European FSD Safety Report. The Netherlands Data Is Compelling — and Full of Holes.

## Thesis
Tesla's first jurisdiction-specific European FSD safety data (Netherlands, April 10 – June 5, 2026) shows dramatically fewer collisions and smoother driving metrics than manual operation. But the data is self-reported, covers just two months of early adopters, and the comparisons aren't apples-to-apples. The real story isn't whether FSD is safer (the numbers say yes, with caveats) — it's that Europe now has a regulatory framework that REQUIRES this data, while NHTSA still doesn't.

## Key Data Points

### Tesla Netherlands FSD Report (April 10 – June 5, 2026)
- 23.6M km total driven under FSD
- **Overall:** 3.5× fewer collisions with FSD engaged
- **Highway:** 16.6M km with ZERO collisions (vs 33 collisions in 158.7M km manual driving)
- **Non-highway:** 1.6× safer (3 collisions in 7M km FSD vs 109 in 152.9M km manual)
- 14.9× fewer AEB (automatic emergency braking) events
- 8.8× less harsh acceleration
- 7.3× less harsh braking
- 8× fewer hard swerves

### RDW Approval Context
- Dutch vehicle authority (RDW) granted first European type approval April 10, 2026
- 18 months of testing preceded approval
- 1.6M km driven on EU roads during testing
- 13,000 customer ride-alongs conducted
- 400+ compliance requirements met
- FSD classified as DCAS (Level 2) under UN R-171 — driver retains full responsibility
- European version is v14.2.2.5, "differs substantially" from US version
- Tesla must report annually to RDW
- RDW won't publish its own testing details (commercially sensitive)

### European Expansion
- Lithuania approved May 20, 2026 (mutual recognition)
- Estonia approved May 29, 2026 (mutual recognition)
- Denmark also approved
- EU-wide vote was on June 30 agenda but removed — Nordic objections pushed to autumn 2026 or Q1 2027

### Netherlands Road Safety Baseline
- 675 traffic deaths in 2024 (CBS data)
- 34 deaths per million population
- Since 2022, most fatalities are cyclists (246 in 2024)
- 220 passenger car occupant deaths in 2024

## Primary Sources
1. Tesla Netherlands FSD Safety Report (June 9, 2026) — first-party data release
2. RDW type approval announcement (April 10, 2026) — regulatory framework, approval conditions
3. CBS Netherlands traffic fatality statistics 2024 — baseline comparison data
4. UN R-171 DCAS regulation — legal classification framework
5. NHTSA Standing General Order data / FSD investigation — US regulatory counterpoint

## Original Contribution (Required by STORY_GUIDE)
**Novel calculation:** Per-km collision rate comparison between Tesla's self-reported FSD data and the Netherlands national baseline.
- Netherlands 2024: ~220 car occupant deaths in ~140B vehicle-km ≈ 1.57 deaths per billion km (CBS/SWOV)
- Tesla FSD non-highway: 3 collisions in 7M km = 428 collisions per billion km
- Tesla manual non-highway: 109 collisions in 152.9M km = 713 collisions per billion km
- The comparison is collisions vs deaths — apples vs oranges. Tesla reports ALL collisions (fender-benders included), national stats report fatalities only. The 3.5× headline safety multiplier cannot be directly compared to national fatality rates because the denominators measure different things.

**Second novel analysis:** The regulatory asymmetry. Europe (via UN R-171) now requires annual safety data reporting as a condition of type approval. The US (NHTSA) relies on voluntary reporting via Standing General Orders and has no pre-market approval requirement for ADAS. Calculate: how many FSD-miles have been driven in the US without equivalent mandatory reporting?

## Strongest Counterargument
The strongest case FOR Tesla's data being meaningless: This is a two-month sample from early adopters who paid extra for FSD, opted into a regulated European rollout, and are by definition more tech-engaged and cautious than average drivers. The Netherlands has among the best road infrastructure in Europe (grade-separated bike lanes, roundabouts, 30 km/h urban zones). Running FSD in NL is playing on easy mode. The real test is Southern Italy, rural Romania, or a German Autobahn in rain. Until the sample is large enough to include inattentive drivers who treat Level 2 like Level 4 — which IS happening in the US — this data proves that careful drivers using FSD carefully in a well-designed road network have few crashes. That's trivially true and not what anyone is actually worried about.

## What We Don't Know (Limitations)
- Tesla self-reports this data; RDW has not independently verified it
- No severity breakdown for the 3 FSD non-highway collisions vs 109 manual
- No information on FSD disengagements before crashes (did FSD hand off to the driver 0.5s before impact?)
- Manual driving comparison pool (158.7M km) likely includes all Tesla drivers in NL, not a matched cohort
- Unknown whether the 23.6M FSD-km skew toward highway (16.6M highway = 70%) while manual driving is more evenly distributed
- NHTSA active investigation into FSD red-light running crashes provides US counterpoint but different software version

## 10-Star Test
Would a reader forward this? YES — it's the first real European AV safety data, Tesla is polarizing, the data looks good but the methodology critique is non-obvious. The original calculation showing the apples-to-oranges problem in the headline number is genuinely useful.

## Kill Test
Has this been written well elsewhere? NO — as of June 9, most coverage is either "Tesla FSD is 3.5× safer!" (credulous) or "Tesla data can't be trusted" (dismissive). Nobody has run the per-km collision rate comparison against Netherlands national baselines, or framed the regulatory asymmetry (Europe requires this, US doesn't) as the bigger story.
