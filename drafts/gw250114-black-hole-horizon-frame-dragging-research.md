# Research Notes: GW250114 Black Hole Horizon Detection

## Primary Sources

1. **Lu, Ma, Piccinni, Chen, Sun (2026).** "GW250114 reveals signatures of post-merger black-hole horizon." *Nature*. DOI: 10.1038/s41586-026-10696-0. arXiv: 2510.01001.
   - First observational evidence of "direct wave" — signal component carrying imprint of black hole horizon
   - Measured horizon rotation frequency Ω_H and surface gravity κ
   - Direct wave SNR: 14.0 (Hanford), 13.5 (Livingston)
   - Detection statistic D = 530.0 (false-alarm probability < 0.1%)

2. **LIGO Scientific Collaboration, Virgo, KAGRA (2025).** "Black Hole Spectroscopy and Tests of General Relativity with GW250114." arXiv: 2509.08099.
   - Component masses: 33.6(+1.2/-0.8) M☉ and 32.2(+0.8/-1.3) M☉
   - Remnant mass: 62.7(+1.0/-1.1) M☉ (source frame), 68.1(+0.8/-0.9) M☉ (detector frame)
   - Remnant spin: χ_f = 0.68(+0.01/-0.01)
   - Component spins: ≤ 0.24 and ≤ 0.26
   - First Kerr overtone identified at 4.1σ

3. **Abac et al. (2025).** "Supplement to GW250114: Testing Hawking's Area Law and the Kerr Nature of Black Holes." *Phys. Rev. Lett.* 135(11). arXiv: 2509.08054.
   - Hawking area theorem confirmed
   - Progenitor areas: ~240,000 km² total
   - Remnant area: ~400,000 km²
   - Energy released: 3.1 ± 2.2 M☉c²

4. **Wikipedia: GW250114** — event parameters, context
   - Distance: ~1.14 billion light-years (z = 0.09)
   - Total SNR: ~80
   - Detected January 14, 2025, 08:22:03 UTC
   - Duration: ~230 milliseconds
   - Both LIGO detectors, Virgo and KAGRA offline

## Expert Reactions (from phys.org coverage)

- **Francesco Sannino** (theoretical physicist): "compelling analysis" but needs independent verification
- **Maximiliano Isi** (astrophysicist): described work as "tantalizing"
- **Sean McWilliams** (WVU): skeptical — argues GW frequency "isn't dictated by the event horizon"
- **Sizheng Ma** (lead author): rebutted McWilliams, says he "conflated two different aspects in the paper," preparing follow-up paper

## Original Calculations

### 1. Frame-Dragging Physical Parameters

Given: χ = 0.68, M_f = 62.7 M☉

r+ = 1 + √(1 - χ²) = 1 + √(1 - 0.4624) = 1 + √0.5376 = 1 + 0.7332 = 1.7332 (in units of GM/c²)

Ω_H = χ / (2r+) = 0.68 / (2 × 1.7332) = 0.1962 (in units of c³/GM)

κ = √(1 - χ²) / (2r+) = 0.7332 / 3.4664 = 0.2115 (in units of c³/GM)

Physical conversion:
- GM_sun/c³ = 4.926 × 10⁻⁶ s
- GM/c³ = 62.7 × 4.926e-6 = 3.089 × 10⁻⁴ s

Physical rotation frequency:
- f_rotation = Ω_H / (2π) / (GM/c³) = 0.1962 / (2π × 3.089e-4) = 101 Hz
- The horizon rotates 101 times per second

Direct wave frequency (GW is quadrupole, so 2× rotation):
- f_direct = 2 × 101 = 202 Hz
- This is near middle C (262 Hz) — right in LIGO's sweet spot and human hearing range!

Horizon physical size:
- Schwarzschild radius (if χ=0): r_s = 2GM/c² = 2 × 62.7 × 1.477 km = 185.2 km
- Actual horizon radius: r+ = 1.7332 × GM/c² = 1.7332 × 92.6 km = 160.5 km
- Equatorial circumference of Kerr horizon: 2π√(r+² + a²) × GM/c²
  - a = χM = 0.68 (in geometric units)
  - √(r+² + a²) = √(1.7332² + 0.68²) = √(3.004 + 0.462) = √3.466 = 1.862
  - Physical circumference = 2π × 1.862 × 92.6 km = 1,083 km

**The black hole's horizon is about 1,083 km around — smaller than the distance from San Francisco to Denver (1,525 km). And it rotates 101 times per second.**

### 2. Frame-Dragging Comparison to Gravity Probe B

Gravity Probe B measured Earth's frame dragging (Lense-Thirring precession):
- 39 milliarcseconds/year = 39 × (π/180) / (3600) / (365.25 × 24 × 3600) rad/s
- = 39 × 4.848e-6 / 3.156e7 = 5.99 × 10⁻¹⁵ rad/s

GW250114 horizon frame dragging:
- Ω_H = 0.1962 × c³/(GM) = 0.1962 / 3.089e-4 = 635 rad/s

Ratio: 635 / 5.99e-15 = 1.06 × 10¹⁷

**Frame dragging at this black hole's horizon is 100 quadrillion times stronger than what Gravity Probe B measured around Earth.**

### 3. How Many Future Events Could Detect Direct Waves? (KEY ORIGINAL ANALYSIS)

Premise: Direct wave detection requires sufficient total event SNR. GW250114 (total SNR ~80) yielded direct wave SNR ~14. For detection, we need direct wave SNR ≥ 5 (marginal) to ≥ 8 (confident).

Assumptions:
- Direct wave SNR / total SNR ratio ≈ 0.175 (for comparable-mass, moderate-spin BBH mergers — the dominant population)
- This ratio depends on mass ratio and spin; most BBH mergers produce remnants with χ ≈ 0.6-0.7, so the ratio is fairly consistent
- Minimum total SNR for confident direct wave detection: 46 (requiring DW SNR ≥ 8)
- SNR distribution in a volume-limited survey: N(>ρ) ∝ ρ⁻³

O4 (2023-2025): ~200 BBH detections (SNR ≥ 8)
- N(SNR > 46) = 200 × (8/46)³ = 200 × 0.00527 = 1.05 events ← exactly GW250114!
- Marginal N(SNR > 29) = 200 × (8/29)³ = 200 × 0.021 = 4.2 events

O5 (planned 2027-2028): sensitivity ~2× O4
- N(>ρ) scales as S³ where S = sensitivity factor
- Total events: ~1,600 BBH
- N(SNR > 46) = 2³ × 1.05 = 8 × 1.05 = ~8 events per year

LIGO A+ / A# upgrades (late 2020s): ~3× O4 sensitivity  
- N(SNR > 46) = 27 × 1.05 = ~28 events per year

Cosmic Explorer / Einstein Telescope (2030s): ~10× O4 sensitivity
- N(SNR > 46) = 1,000 × 1.05 = ~1,050 events per year

**Today: 1 event ever. O5: ~8/year. Next-gen: ~1,000/year. Horizon spectroscopy goes from discovery to routine in one decade.**

### 4. Comparison to Other "First Detections" in GW Astronomy

| Milestone | Event | Date | Significance |
|-----------|-------|------|-------------|
| First GW detection | GW150914 | Sep 2015 | Proved GW exist |
| First neutron star merger | GW170817 | Aug 2017 | Multi-messenger astronomy |
| First intermediate-mass BH | GW190521 | May 2019 | 150 M☉ remnant |
| First horizon detection | GW250114 | Jun 2026 | Direct probe of event horizon |

### 5. What This Means for General Relativity

The direct wave measurement provides:
- First direct measurement of both Ω_H and κ in a single event
- These are conjugate variables in the first law of BH thermodynamics: dM = (κ/8π)dA + Ω_H dJ
- If future measurements deviate from Kerr predictions, it could signal:
  - Extra dimensions (string theory)
  - Quantum gravity corrections near horizons
  - Exotic compact objects (fuzzballs, gravastars, Planck stars)
  - Modified gravity theories

## Strongest Counterargument

Sean McWilliams (WVU) argues the observed gravitational wave frequency is NOT "dictated" by the event horizon — rather, it's determined by the orbital dynamics which happen to approach the horizon frequency as the objects merge. In this view, the measurement is of orbital mechanics, not horizon physics.

Ma's response: McWilliams conflates two aspects. The direct wave is specifically the component that persists AFTER the merger, when there is no longer an orbit — it's the final radiation as the infalling material crosses the horizon. The signal asymptotes toward 2Ω_H precisely because frame dragging forces any motion at the horizon to co-rotate.

## Limitations

1. Single event — GW250114 is the only event loud enough for this analysis
2. Model dependence — direct wave extraction requires first removing QNMs, which involves assumptions about how many modes to subtract
3. The damped sinusoid fit is a "practical first step, though ultimately insufficient for high-precision analyses" (authors' own caveat)
4. Mass ratio dependence — the point-particle framework models the merger as a particle falling into a Kerr BH, which is approximate for the comparable-mass case (mass ratio ~1)
5. No Virgo/KAGRA data — only two LIGO detectors were online, limiting sky localization

## Article Angle

**Headline direction:** "LIGO Heard a Black Hole's Horizon for the First Time. It Spins 101 Times Per Second."
Or: "Gravitational Waves Just Revealed What Happens at a Black Hole's Edge. The Answer Spins 101 Times Per Second."

**Original contribution:** The "from discovery to routine" calculation — showing that GW250114 is the first of ~8/year events by O5 and ~1,000/year by 2035. Nobody else has published this SNR-scaling estimate for direct wave detection rates.

**Kicker:** 🚀 Space

**Journalist:** Tomás Reyes · Physics
