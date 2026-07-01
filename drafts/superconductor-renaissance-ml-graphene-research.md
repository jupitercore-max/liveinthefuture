# Research Notes: Superconductor Renaissance

## Topic
Two independent breakthroughs in superconductor science published within 48 hours: (1) Aalto/SuperC's ML-guided discovery of two new kagome lattice superconductors, and (2) MIT's discovery of multiple magnetic-field-boosted superconducting states in rhombohedral graphene. Together they signal a new era in superconductor research.

## Slug
superconductor-renaissance-ml-graphene

## Journalist
Viktor Holm (Energy/Materials beat)

## Category
💻 Quantum

## Primary Sources

### Source 1: Aalto/SuperC ML Discovery
- **Paper:** Rose Albu Mustaf et al, "Machine-learning-guided discovery of kagome superconductors YRu3B2 and LuRu3B2," Physical Review Research (2026). DOI: 10.1103/lpqj-7hyg
- **Institutional page:** Aalto University press release, June 29, 2026
- **Key facts:**
  - SuperC consortium formed 2023, led by Prof. Päivi Törmä (Aalto)
  - Goal: room-temperature superconductor by 2033
  - First coordinated global collaboration to find new superconductors
  - Two new superconductors: YRu3B2 (Tc = 0.81 K) and LuRu3B2 (Tc = 0.95 K)
  - Kagome lattice (Japanese basket-weaving pattern) with flat bands
  - ML pre-screening → targeted quantum calculations → synthesis at Rice University (Prof. Emilia Morosan) → experimental confirmation
  - "Over the decades, researchers have recognized more than 7,000 superconductors, but mostly serendipitously. Only ~20 theoretically predicted."
  - "With machine learning, we may be able to push the number of materials we can process into the billions"
  - Funded by Kavli Foundation, Klaus Tschira Stiftung, Kevin Wells, Jane and Aatos Erkko Foundation
  - Exhibition: Aalto's "Designs for a Cooler Planet," Sept 1–Oct 30, 2026

### Source 2: MIT Graphene Superconductivity
- **Paper:** "Family of magnetic field-boosted superconductors in rhombohedral graphene," Nature (2026)
- **Institutional page:** MIT Physics, June 29-30, 2026
- **Lead researcher:** Long Ju, Lawrence C. and Sarah W. Biedenharn Associate Professor of Physics, MIT
- **Key facts:**
  - Rhombohedral pentalayer graphene (5 layers stacked in staircase offset pattern)
  - Found in natural graphite, isolated via Scotch tape exfoliation
  - FOUR different superconducting states discovered
  - THREE states persist under magnetic field up to ~9 Tesla (180,000× Earth's field)
  - Exceeds Pauli limit by "tens of times"
  - One state gets STRONGER under perpendicular magnetic field: Tc goes from 55 mK to ~90 mK
  - Critical current also increases ~50-60% under field
  - Collaboration with Dominik Zumbuhl's group at University of Basel
  - Proposed mechanism: electrons may pair with aligned spins (vs. opposite spins in BCS theory), so magnetic field preserves alignment
  - Earlier work by same group: chiral superconductivity, fractional electron charge in same material
  - "People might assume that this is a simple, boring carbon material" — Long Ju

### Source 3: Historical context
- 1911: Kamerlingh Onnes discovers superconductivity in mercury
- 1935: ~80 known superconductors
- 1950: 100+ known
- 1957: BCS theory
- 1963: 900+ known
- 1986: High-temperature superconductors (cuprates)
- Today: 7,000+ known, only ~20 theoretically predicted
- Most found serendipitously / trial-and-error
- Record Tc (ambient pressure): ~166 K in cuprates
- Record Tc (high pressure): ~250 K in hydrogen-rich compounds (H3S, LaH10) at >100 GPa

## Original Calculation: Energy Cost of Copper Resistance

### Data center losses
- US data centers consumed 176 TWh in 2023 (LBNL/DOE, CRS report)
- That's ~4.4% of US electricity
- Growth: 13-27% CAGR through 2028 (DOE projection)
- Internal power distribution (PDUs, busbars, cabling) loses ~2-3% to I²R resistive heating in copper
- Conservative estimate: 176 TWh × 2% = 3.5 TWh lost to copper resistance
- Aggressive estimate: 176 TWh × 3% = 5.3 TWh
- Mid-range: 4.4 TWh

### Dollar value
- Commercial/industrial electricity rate: ~$0.08-0.12/kWh
- Using $0.10/kWh: 4.4 TWh = $440 million/year wasted on copper heat in US data centers
- By 2028 (at 20% CAGR): ~430 TWh × 2.5% = 10.75 TWh = $1.075 billion/year
- Plus: cooling costs to remove that heat. Data center PUE averages ~1.55, meaning 55% overhead for cooling/infrastructure. Some fraction of cooling load exists specifically to remove I²R heat from distribution copper.

### Grid-scale losses
- US grid T&D losses: ~5% of ~4,000 TWh = 200 TWh/year
- At $0.10/kWh: $20 billion/year in pure waste
- Room-temperature superconducting cables could theoretically eliminate most of this
- BUT: requires economically manufacturable superconducting wire, not just lab samples

### The calculation nobody ran
If ML screening scales to 1 billion candidate materials (Törmä's claim), and the historical prediction rate has been ~20 materials in 60+ years (0.33/year):
- Pre-ML: 0.33 predicted superconductors/year
- Post-ML: Even at extremely conservative confirmation rates, the pipeline throughput increases by orders of magnitude
- Historical discovery was bottlenecked by human intuition + computational cost of quantum calculations
- ML doesn't change physics but changes search strategy from random walk to guided optimization
- Analogy: protein folding. DeepMind's AlphaFold predicted structures of 200M+ proteins in months; traditional X-ray crystallography had solved ~190,000 in 50 years. That's a 1,000× acceleration.
- If superconductor discovery sees even a 100× acceleration (conservative vs. AlphaFold), we'd go from 0.33 to 33 new predicted superconductors per year. In a decade, that's 330 new predicted superconductors vs. the 20 total in the previous 60 years.

## Strongest Counterargument
Both new superconductors operate below 1 Kelvin. MIT's graphene states are at 55-90 millikelvin. Room-temperature superconductivity remains ~300 K away from these results. Finding more superconductors at cryogenic temperatures doesn't necessarily get you closer to room temperature. The relationship between number-of-known-superconductors and maximum-Tc is not linear. We've known 7,000 superconductors for years and the ambient-pressure Tc record hasn't budged since the 1990s.

## Limitations
- SuperC paper: ML-predicted Tc for YRu3B2 was 2.121 K; actual measured Tc was 0.81 K. Prediction accuracy needs improvement.
- MIT: Tc is 55-90 millikelvin. Exotic physics but far from practical applications.
- "Screening billions" is aspirational, not demonstrated. The proof-of-concept screened an unstated number.
- Neither result addresses the fundamental unknown: what makes some materials superconduct at high temperatures?
- AlphaFold comparison has limits: protein folding had a well-defined target function; superconductor design lacks equivalent clarity.

## Actionable Insights
- For materials scientists: SuperC's methodology (ML pre-screen → targeted calculation → synthesis) is replicable. Kagome lattice family is undertapped.
- For quantum computing researchers: MIT's multiple superconducting states in one material could simplify qubit architectures
- For energy investors: Room-temp superconductor by 2033 is SuperC's explicit goal. Track their progress. The economic prize ($20B/year in US grid losses alone) justifies significant R&D investment.
- For general readers: The AlphaFold precedent shows ML can compress decades of discovery into years. Watch for the number of new superconductors found per year as a leading indicator.

## Related articles on site
- None on superconductors (confirmed search)
- Possible links: quantum computing articles, energy articles, AI/ML in science articles
