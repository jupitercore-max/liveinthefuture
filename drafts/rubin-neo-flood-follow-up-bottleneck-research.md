# Research: Rubin Observatory NEO Flood & Follow-Up Bottleneck

## Slug
`rubin-neo-flood-follow-up-bottleneck`

## Journalist
Anya Volkov

## Thesis
Rubin Observatory's LSST will discover near-Earth asteroids 8× faster than the current system can process them, creating the first detection-vs-confirmation bottleneck in planetary defense history. The follow-up telescope network that confirms whether an asteroid is headed toward Earth was built for 16 candidates per night. Rubin will submit 129.

## Primary Sources

### 1. Wagg et al. (2025) — "Expected Impact of Rubin Observatory LSST on NEO Follow-up"
- arXiv:2408.12517, published Astronomical Journal 2025
- Rubin contributes ~129 new NEO candidates/night to NEOCP in first year
- 8× increase relative to present day
- Only 8.3% of listed objects will be actual NEOs (primary contaminant: undiscovered faint main belt asteroids)
- Self-recovery algorithm: 68% accuracy predicting whether Rubin will re-observe a candidate
- With algorithm: list reduced to 64 candidates/night (8.4% purity)
- Additional filters proposed: trailing, apparent magnitude, ecliptic latitude

### 2. Predictions of LSST Solar System Yield (arXiv, published Jan 2025)
- LSST discovers 1.27×10^5 NEOs total in 10-year survey
- ~90,000 new discoveries beyond currently known ~37,000
- 91% completeness for NEOs >1 km diameter
- 72.4% completeness for NEOs >140 m diameter
- 72.7% completeness for PHAs (>140m, MOID < 0.05 au)
- Discovers 3,152 PHAs out of 4,333 modeled
- 6× more NEO discoveries than Catalina Sky Survey (current leader at 16,112)
- Median discovered NEO: 23 detections over survey
- Median >140m NEO: 106 detections over survey

### 3. Rubin Observatory Official Data (rubinobservatory.org)
- First year pre-survey: 30,000+ new solar system objects discovered
- 11,000 confirmed new asteroids (April 2026 MPC announcement)
- 33 near-Earth objects, 380 trans-Neptunian objects confirmed
- 10-year LSST will discover ~5 million new solar system objects, including ~89,000 NEAs
- Full survey started June 30, 2026

### 4. NSF Budget Documents
- NSF authorized Total Project Cost: $571M (construction, rebaselined from $473M due to COVID)
- DOE LSST Camera cost: $168M (SLAC-built, 3,200 megapixels)
- Total construction: ~$739M (NSF + DOE)
- Annual operations: ~$70M/year (NSF FY2022 budget document)
- 10-year lifecycle: ~$739M + $700M = ~$1.44B

### 5. NASA NEO Surveyor
- Development cost: $1.2B (KDP-C, Dec 2022)
- Launch: no later than June 2028 (SpaceX Falcon 9, ~$100M launch)
- Goal: discover 2/3 of >140m NEOs in 5 years → ~76% completeness
- Extended goal: 90% in 10-12 years
- Originally estimated $500-600M, doubled due to budget cuts/inflation
- Single-purpose: dedicated planetary defense infrared telescope at L1

### 6. Current NEO Census (CNEOS/JPL, Wikipedia, UN COPUOS)
- Total known NEOs (Jan 2024): ~34,274
- Known NEAs >140m (Dec 2024): 11,167
- Known PHAs (Dec 2024): 2,465
- Estimated total >140m NEAs: ~25,000-35,000 (varying estimates)
- Current completeness for >140m: ~38-44%
- Annual discovery rate (pre-Rubin): ~3,000 NEOs/year
- Catalina Sky Survey: 16,112 total NEO discoveries (largest single program)

### 7. George E. Brown Jr. Near-Earth Object Survey Act (2005)
- Congress mandated NASA catalog 90% of >140m NEOs by 2020
- Deadline missed in 2020 at ~38% completeness
- NASA official (Kelly Fast): "another three decades" to reach 90% goal
- Gizmodo report: cost doubled, launch delayed from 2026 to 2028

## Original Calculations

### Calculation 1: The Follow-Up Oversubscription Factor

**Pre-Rubin baseline:**
- Current NEOCP nightly submission rate: ~16 candidates/night
- Global follow-up network capacity: handles ~16/night (roughly matched)

**Rubin era (July 2026+):**
- Rubin adds: ~129 candidates/night
- Total expected: ~145 candidates/night
- Oversubscription factor: 145 / 16 = **9.1×** (if no new follow-up capacity)
- NEO purity: 8.3% → only ~12 of 129 Rubin candidates are actual NEOs
- But ALL 129 must be observed to determine which 12 are real

**With prioritization (Wagg et al. algorithm):**
- Self-recovery filter: 129 → 64 candidates/night
- Still 4× over current capacity
- Purity only slightly improved: 8.4%

**Impact:**
- At 16/night capacity: 129 candidates go unprocessed per night
- Of those, ~10.7 are real NEOs (at 8.3% rate)
- Over 365 observing nights/year: ~3,900 real NEOs potentially under-tracked
- Over 10 years: the bottleneck affects thousands of NEO characterizations

### Calculation 2: Cost-Per-NEO Comparison

| Program | Total Cost | NEOs Discovered | Cost/NEO |
|---------|-----------|----------------|----------|
| Catalina Sky Survey (20yr) | ~$200M est. | 16,112 | ~$12,400 |
| Rubin LSST (10yr lifecycle) | ~$1.44B | ~90,000 new | ~$16,000 |
| NEO Surveyor (lifetime) | ~$1.3B | ~15,000 new >140m | ~$86,700 |

But Rubin's marginal cost for NEO discovery = ~$0, because it does planetary defense as a byproduct of its astronomy mission. The NEOs are essentially free.

### Calculation 3: Congressional Mandate Timeline

| Year | Event | >140m Completeness |
|------|-------|-------------------|
| 2005 | George E. Brown Act passes | ~10% |
| 2020 | Congressional deadline | ~38% |
| 2024 | Latest estimates | ~44% |
| 2026 | Rubin LSST begins | ~44% |
| 2028 | NEO Surveyor launches | ~50%* |
| 2033 | NEO Surveyor 5-year mark | ~76% |
| 2036 | Rubin LSST ends | ~72-80%** |
| 2038-2040 | NEO Surveyor 10-12 yr | ~90% |

*Rubin early contributions
**Overlap between Rubin and NEO Surveyor discoveries

The mandate will be met 18-20 years late.

### Calculation 4: Detection-to-Orbit Determination Gap

To determine if an asteroid is dangerous, you need:
1. Detection (a bright dot moving against stars) — Rubin does this
2. Follow-up observation (confirm it's real, not noise) — external telescopes needed
3. Orbital arc (3+ observations over multiple nights) — Rubin self-recovers some
4. Orbit determination (is it headed our way?) — compute from observations
5. Impact probability assessment — requires precise orbit

Rubin excels at step 1 (unprecedented detection rate) and partially handles step 3 (3-night cadence).
The bottleneck is step 2: the worldwide follow-up network.

For an asteroid on a fast-approach trajectory (like Chelyabinsk, 2013):
- Detection to impact: could be days to weeks
- Follow-up delay of 1-2 nights = potentially lost orbit = no warning
- The bottleneck doesn't just delay discovery — it could eliminate warning time entirely for the fastest-approaching objects

## Strongest Counterargument

Rubin's 3-night full-sky cadence means it will self-recover most objects without external follow-up. Wagg et al.'s 68% prediction accuracy for self-recovery suggests the majority of candidates WILL be observed again by Rubin itself, building orbital arcs autonomously. The follow-up bottleneck primarily affects objects that move out of Rubin's survey footprint between visits or have unusual orbits — a subset, not the full 129/night. Additionally, the open-source prioritization algorithms proposed could help the community adapt.

**Response to counterargument:** Self-recovery works for slow-moving, long-arc objects. It fails for exactly the objects that matter most: fast-approaching NEOs on short warning trajectories. A 50-meter asteroid on a 2-week collision course crosses Rubin's field quickly and may not be re-observed. These are the objects where follow-up delay = no warning. The bottleneck is most dangerous precisely where it's hardest to solve.

## Article Structure Plan

1. **Opening:** The night shift at the Minor Planet Center, July 2026. The NEOCP queue just went from 16/night to 145/night. Nobody expanded the follow-up network.
2. **The Detection Revolution:** What Rubin does — 20 TB/night, full sky every 3 nights, the 3,200-megapixel camera
3. **The 129-Per-Night Problem:** Wagg et al. math, the oversubscription factor, what happens when detection outpaces confirmation
4. **The Congressional Mandate Gap:** 21 years late and counting — the timeline math
5. **The Marginal Cost Paradox:** Rubin finds NEOs for free. The dedicated $1.3B NEO hunter will find fewer total objects. But it will find the ones that matter.
6. **The Fast-Approach Problem:** Where the bottleneck kills — Chelyabinsk wasn't in any catalog
7. **Counterargument + Limitations:** Self-recovery, algorithmic prioritization, the system is adapting
8. **Conclusion:** We just built the most powerful asteroid-finding machine in history. We forgot to build a matching confirmation system.

## Data Quality Notes
- Wagg et al. numbers are simulated, not observed (Rubin just started full survey June 30, 2026)
- Completeness estimates vary: Harris & Chodas, Grav et al. (KOM), and various size-frequency models give different numbers
- Annual operations cost of $70M is from FY2022 budget request — may have changed
- 16 candidates/night pre-Rubin is inferred from "8× increase" claim (129/8 ≈ 16)
