# Research Notes: LHS 1140 b — First Atmosphere on a Rocky Habitable-Zone World

## Story Angle
The first confirmed atmosphere on a rocky exoplanet sitting in the habitable zone of its star. The LHS 1140 system offers a rare natural experiment: two sibling planets orbiting the same star, one with an atmosphere and one without. Original analysis: run the cosmic shoreline math to show *why* one kept its air and the other didn't, calculate the water inventory, and contextualize what this means for the search for life.

## Primary Sources

### 1. Cherubim et al. (2026) — Science paper
- **Title:** (Helium detection on LHS 1140 b)
- **Published:** July 16, 2026 in *Science*
- **Lead author:** Collin Cherubim, Harvard University (postdoctoral fellow, recently completed PhD in Earth & Planetary Sciences)
- **Key co-authors:** Robin Wordsworth (Harvard, dissertation advisor), David Charbonneau (Harvard, Department of Astronomy head)
- **Instrument:** WINERED Spectrograph on the Magellan Clay Telescope, Las Campanas Observatory, Chile
- **Key finding:** First detection of helium escaping from the upper atmosphere of a rocky exoplanet in the habitable zone
- **Data:** Transit spectroscopy during Sept 2024 observation when both LHS 1140 b and c transited simultaneously
- **Wrinkle:** Follow-up observation in 2025 showed NO helium — time-variable signal, likely due to changing stellar XUV activity

### 2. Cadieux et al. (2024) — ApJL
- **DOI:** 10.3847/2041-8213/ad5afa and 10.3847/2041-8213/ad1691
- **Key data:** Updated mass/radius constraints. JWST ruled out hydrogen-rich atmosphere, supports high mean molecular weight atmosphere (nitrogen, water vapor, CO₂ possible). 10-20% water by mass.
- **"Eyeball" ocean scenario:** If tidally locked with Earth-like atmosphere, substellar ocean ~4,000 km wide, surface temp ~20°C

### 3. Zahnle & Catling (2017) — Cosmic Shoreline framework
- **ApJ 843:122**, arXiv:1702.03386
- **Concept:** Semi-empirical boundary separating airless worlds from worlds with atmospheres, based on cumulative XUV instellation vs. escape velocity
- **Math:** Energy-limited escape gives M_lost ∝ I_XUV / v_esc², so critical retention condition: I_XUV ∝ v_esc⁴

### 4. Ji et al. (2025) — Cosmic Shoreline Revisited
- **ApJ 992:198**, arXiv:2504.19872
- **Key update:** Revised slope to account for non-linear escape physics and initial volatile inventories. Now guiding JWST Rocky Worlds Director's Discretionary Time program target selection.

## Planetary Parameters (from Cadieux et al. 2024)

| Parameter | LHS 1140 b | LHS 1140 c | Earth |
|-----------|-----------|-----------|-------|
| Mass (M⊕) | 5.60 ± 0.19 | 1.91 ± 0.06 | 1.00 |
| Radius (R⊕) | 1.730 ± 0.025 | 1.272 ± 0.026 | 1.00 |
| Density (g/cm³) | 5.9 ± 0.3 | 5.1 ± 0.4 | 5.51 |
| Insolation (S⊕) | 0.43 ± 0.03 | 5.3 ± 0.4 | 1.00 |
| Eq. temp (K) | 226 ± 4 | 422 ± 7 | 255 |
| Orbital period (days) | 24.74 | 3.78 | 365.25 |
| Semi-major axis (AU) | 0.0946 | 0.0270 | 1.00 |
| Atmosphere | YES (helium detected) | NO | YES |

### Host Star LHS 1140
- Type: M4.5 red dwarf
- Mass: ~0.18 M☉
- Radius: ~0.21 R☉
- Temperature: 3,131 K
- Age: ~5 Gyr
- Distance: 48.9 light-years
- "Relatively quiet" for a red dwarf — key for atmospheric retention

## Original Calculations

### 1. Surface Gravity and Escape Velocity
- **LHS 1140 b:** g = M/R² = 5.60/1.730² = 5.60/2.993 = **1.87g**
  - v_esc = 11.2 × √(5.60/1.730) = 11.2 × √3.237 = 11.2 × 1.80 = **20.1 km/s**
- **LHS 1140 c:** g = 1.91/1.272² = 1.91/1.618 = **1.18g**
  - v_esc = 11.2 × √(1.91/1.272) = 11.2 × √1.502 = 11.2 × 1.23 = **13.7 km/s**
- **Earth:** g = 1.00g, v_esc = 11.2 km/s
- **Mars:** g = 0.38g, v_esc = 5.0 km/s

→ LHS 1140 b's escape velocity is 1.80× Earth's and 4.02× Mars's. It holds onto gas far more effectively.

### 2. Cosmic Shoreline Escape Parameter
Energy-limited escape: mass loss ∝ insolation / v_esc²
- **LHS 1140 b:** 0.43 / 20.1² = 0.43 / 404.0 = **0.00106**
- **LHS 1140 c:** 5.3 / 13.7² = 5.3 / 187.7 = **0.0282**
- **Ratio:** LHS 1140 c's escape parameter is **26.6× higher** than b's

→ Same star, same age, same formation environment. The sole differences are mass, size, and orbital distance. Planet c is 26.6× more vulnerable to atmospheric stripping. This is the quantitative reason one world has air and its sibling doesn't.

### 3. Water Inventory
If 10-20% water by mass:
- Planet mass: 5.60 × 5.972 × 10²⁴ kg = 3.34 × 10²⁵ kg
- Water mass: 3.34 × 10²⁴ to 6.68 × 10²⁴ kg
- Earth's oceans: 1.335 × 10²¹ kg
- **LHS 1140 b could hold 2,500 to 5,000 Earth oceans' worth of water**

### 4. Helium Escape Budget
- Escape rate: "hundreds of thousands of kg/s" (~300,000 kg/s estimated)
- Annual loss: ~9.5 × 10¹² kg/yr
- Over 3 billion years: ~2.85 × 10²² kg lost
- Earth's entire atmosphere: 5.15 × 10¹⁸ kg
- **LHS 1140 b has shed ~5,500 Earth atmospheres' worth of helium** and still has more
- Implication: It started with an enormous primordial gas envelope, far larger than Earth's

### 5. Eyeball Ocean Scale
- If tidally locked, substellar ocean ~4,000 km across
- Mediterranean Sea: ~2,500 km east-west → 1.6× Mediterranean
- Atlantic Ocean: ~6,500 km → ~60% of the Atlantic
- Australia: ~4,000 km east-west → roughly the width of Australia

## Key Quotes

- Collin Cherubim: "This is the first time anyone has found an atmosphere on a rocky planet in the habitable zone of another star."
- Robin Wordsworth: "Twenty years ago we wondered whether other terrestrial-type planets even existed. Then we learned they're common, and found some in the habitable zone. The next question was whether any of them had managed to keep an atmosphere. Now we know at least one has."
- David Charbonneau: "Collin analyzed the planets we knew about and predicted that this one would have a helium atmosphere. Then he organized telescope time, got the data, and the detection was statistically rock solid."
- Laura Kreidberg (Max Planck, not involved): "I think it is very possible that what we're seeing is a snapshot of this evolution from the smallest gas giant to the biggest rocky planet."
- Cherubim on "helium worlds": "This is a newly predicted class of planets that I have argued may not be so exotic, but instead may be a natural step in the evolution of many small planets."
- Cherubim on stellar energy: "The planet receives 42 percent of the energy from its star that Earth does from the Sun."

## Context / What Makes This Matter
1. First atmosphere on a rocky habitable-zone world — ticks all three boxes (rocky, right temp, has atmosphere)
2. Ground-based discovery (Magellan telescope, not JWST) — shows ground observatories can compete
3. Natural experiment: two planets, same star, one keeps atmosphere, one doesn't → validates cosmic shoreline framework
4. JWST is already scheduled to follow up (Rocky Worlds DDT program)
5. Helium worlds as a new class — evolutionary transition from mini-Neptune to rocky planet
6. The 2025 non-detection adds scientific nuance, not weakness — time-variable atmospheric escape is expected from XUV variability

## Limitations
- Only one epoch of detection (2024); 2025 showed no signal → needs confirmation
- Helium escape ≠ surface habitability (helium is the upper atmosphere, heavier gases trapped below)
- "Atmosphere" here means primordial helium envelope, not necessarily a habitable nitrogen/oxygen mix
- Exact mass-loss rate poorly constrained (hundreds of thousands kg/s is an order-of-magnitude estimate)
- Red dwarf habitability debate ongoing — tidal locking, flare activity, etc.

## Strongest Counterargument
The non-detection in 2025 is genuinely uncomfortable. If you can only see the signal some of the time, it's possible you're seeing instrumental artifacts or stellar variability misattributed to the planet. The paper addresses this by modeling stellar activity cycles and showing the non-detection is consistent with lower XUV flux, but a single positive epoch is thin for a claim this significant. The Rocky Worlds DDT program will provide the definitive test.
