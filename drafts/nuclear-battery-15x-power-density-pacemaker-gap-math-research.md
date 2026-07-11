# Research: China's Nuclear Battery 15x Power Density Jump — The Pacemaker Gap Math

## Topic
China's Northwest Normal University + Gansu Zhulong Technology's new-generation carbon-14 betavoltaic nuclear battery "Qianjiyuan Tianshu" achieves a 15-fold increase in volumetric power density over its predecessor Zhulong-1. Original analysis: what does 1.13 microwatts actually mean for real devices, and how far does the entire nuclear battery field have to go?

## Primary Sources

### Source 1: Interesting Engineering (Jul 8, 2026)
- "China builds a new-generation nuclear battery with carbon-14"
- URL: https://interestingengineering.com/innovation/chinese-scientists-build-nuclear-battery-thousands-years
- Qianjiyuan Tianshu specs:
  - Volume: 16.8 cc (just over a cubic inch)
  - C-14 activity: 129 millicuries
  - Current: 0.713 µA
  - Voltage: 2.06V
  - Max output: 1.13 µW
  - Volumetric power density: 15x improvement over predecessor
  - Volume reduction: 17% smaller than predecessor
  - Power improvement: 2.6x from predecessor
  - Radioactive material use: "limited to 22 percent"
  - SiC transducer (domestically produced)
  - 5 major upgrades: better-matched source, 3D stacked design, micro-power management, built-in sensors, self-powered operation
  - Lead: Su Maogen, Northwest Normal University

### Source 2: Zhulong-1 predecessor data (ESS News / People's Daily, Mar 2025)
- Zhulong-1 (Candle Dragon-I):
  - Short-circuit current: 282 nA
  - Open-circuit voltage: 2.1V
  - Max output: 433 nW
  - Energy conversion efficiency: 8% (per Hefei Institutes of Physical Science, CAS)
  - Energy density: 2.2 Wh/g (~10x lithium-ion)
  - Lead: Zhang Guanghui, Northwest Normal University
  - Built with Wuxi Beita Pharmatech
  - Powered LED for 4+ months (35,000+ pulses), Bluetooth RF chip
  - C-14 half-life: 5,730 years

### Source 3: Betavolt BV100 (Beijing, Jan 2024)
- Nickel-63 betavoltaic
- Specs: 100 µW, 3V, 15×15×5 mm (1.125 cc)
- 50-year lifespan (Ni-63 half-life: 100 years)
- Plans for 1W version announced for 2025 (not delivered as of mid-2026)
- Claims: 3,300 mWh/g energy density, 10x lithium-ion

### Source 4: Russian diamond battery (Technological Institute for Superhard and Novel Carbon Materials, 2018)
- Ni-63 with Schottky barrier diamond diodes
- 200 stacked cells, 5×5×3.5 mm
- Output: 0.93 µW
- Power density: 10 µW/cm³
- Energy density: 3,300 mWh/g
- Published in Diamond and Related Materials

### Source 5: DARPA Rads to Watts program (Apr 2026)
- Avalanche Energy awarded $5.2M contract
- Goal: develop method for turning "high-power nuclear radiation into kilowatts of electrical energy"
- Focus: space applications, autonomous military systems
- Target: kilowatt-class nuclear batteries — orders of magnitude beyond current tech
- Also received $1.25M from AFWERX for computational materials discovery

### Source 6: Ohio State gamma battery
- Scintillator crystal + solar cell architecture
- Co-60 source: 1.5 µW, Cs-137: 288 nW
- ~4 cc prototype
- Uses spent nuclear fuel fission products

### Source 7: Chinese Sr-90 RPVC (Tongxin Jiang et al.)
- Strontium-90 radio-photovoltaic cells
- Single unit: 48.9 µW, 2.96% efficiency
- Multi-module: 3.17 mW
- Waveguide light concentration structure
- GAGG:Ce scintillation waveguides

### Source 8: IEEE Spectrum (Sep 2025)
- Nuclear battery survey article
- Notes: "vast majority of research has focused on power levels of less than 1 microwatt"
- Infinity Power: claims >60% conversion efficiency using novel electrochemical process
- Betavolt's 1W target needs ~20 curies (740 GBq) of Ni-63 — far exceeds typical market supply
- Most efforts "shrouded in secrecy"

### Source 9: Pacemaker power requirements (ScienceDirect, PMC)
- Peak power demands: 100-200 µW (lithium/iodine battery era)
- Steady-state: ~50 µW (MIT Media Lab)
- Energy per stimulus: 15-25 µJ
- Control circuit drain: 10 µA
- Li/I2 batteries dominant since 1972, still used

### Source 10: CAS.org nuclear battery overview
- Betavoltaics: microwatt range, very high energy density (J/kg over lifetime)
- Have been used in pacemakers (1970s promethium-147 era)
- Emitters must be artificially synthesized — cost-prohibitive at scale
- Modern applications: wearables, IoT sensors, smart home

## Original Calculations

### Calculation 1: Theoretical power ceiling from 129 mCi C-14
- Activity: 129 mCi = 129 × 3.7×10⁷ = 4.773 × 10⁹ decays/s
- C-14 average beta energy: 49.47 keV = 7.93 × 10⁻¹⁵ J
- Total available thermal power: 4.773 × 10⁹ × 7.93 × 10⁻¹⁵ = 37.85 µW
- Current extraction: 1.13 µW
- **Conversion efficiency: 1.13 / 37.85 = 2.99% ≈ 3.0%**
- Theoretical headroom: 33.5×
- **Even at 100% efficiency with same C-14 source: only 37.85 µW — barely enough for one pacemaker**

### Calculation 2: Device power gap table
| Device | Power needed | Qianjiyuan units needed | Total volume |
|--------|-------------|------------------------|--------------|
| Pacemaker (steady-state) | 50 µW | 44 | 739 cc (a wine bottle) |
| Low-power IoT sensor | 100 µW | 88 | 1,478 cc (~1.5 L) |
| Bluetooth LE beacon | 10 mW | 8,850 | 148,680 cc (149 liters) |
| Smartphone (standby) | ~1 W | 885,000 | 14.9 million cc (14,900 liters) |
| Smartphone (active use) | ~5 W | 4,424,779 | 74,336 liters |

### Calculation 3: The iPhone charging time
- iPhone 16 battery: ~16.75 Wh = 60,300 J
- At 1.13 µW = 1.13 × 10⁻⁶ J/s
- Time: 60,300 / 1.13×10⁻⁶ = 5.34 × 10¹⁰ seconds = **1,692 years**
- After 1,692 years, C-14 at ~74.5% of initial activity (1,692/5,730 = 0.295 half-lives)
- So it would barely finish before losing significant power

### Calculation 4: Volumetric power density landscape
| Battery | Isotope | µW/cc | Relative |
|---------|---------|-------|----------|
| Zhulong-1 (2024) | C-14 | ~0.0045* | 1× |
| Qianjiyuan Tianshu (2026) | C-14 | 0.067 | 15× |
| Ohio State gamma (2025) | Co-60 | 0.375 | 83× |
| Russian diamond (2018) | Ni-63 | 10.6 | 2,356× |
| Betavolt BV100 (2024) | Ni-63 | 88.9 | 19,756× |
| Curiosity MMRTG | Pu-238 | ~3,333 | 740,667× |

*Estimated: 433 nW / (16.8 cc × 1.17 for pre-shrink volume) ≈ 0.022 µW/cc → but article says 15x, so predecessor was 0.067/15 = 0.0045

### Calculation 5: Isotope selection trade-offs
| Isotope | Half-life | Max beta energy | Avg beta energy | Safety |
|---------|-----------|-----------------|-----------------|--------|
| C-14 | 5,730 years | 156 keV | 49 keV | Very safe (low energy) |
| Ni-63 | 100 years | 67 keV | 17 keV | Very safe (even lower) |
| Sr-90 | 28.8 years | 546 keV | 196 keV | Moderate (higher energy) |
| Pu-238 | 87.7 years | Alpha (5.5 MeV) | N/A | Dangerous (alpha + heat) |
| Pm-147 | 2.6 years | 225 keV | 62 keV | Moderate |

C-14 trades power for longevity and safety. The beta particles are weak — max 156 keV vs Sr-90's 546 keV — which is why power output is low but the device is inherently safe.

### Calculation 6: Improvement rate extrapolation (with caveat)
- 2024: 433 nW → 2026: 1,130 nW (2.6× in ~2 years)
- At 2.6× per generation (2 years):
  - Pacemaker (50 µW): log(44.2)/log(2.6) = 3.96 generations → ~7.9 years → ~2034
  - IoT sensor (100 µW): 4.7 generations → ~9.4 years → ~2035
  - 1 mW: 7.1 generations → ~14.2 years → ~2040
- **BUT**: limited by theoretical ceiling of ~37.85 µW from 129 mCi C-14. Would need to scale up C-14 load AND efficiency to reach higher targets. Extrapolation breaks around 4-5 generations.

## Strongest Counterargument
Betavolt's BV100 already produces 100 µW — enough for a pacemaker — using nickel-63 in a package smaller than a coin. The 15-fold improvement in C-14 power density is scientifically interesting but commercially irrelevant when competing approaches are already 88× more power-dense per unit volume. C-14's theoretical longevity (5,730-year half-life) is its only advantage, but no implantable device needs to last millennia. Even deep-space probes (Voyager missions) use plutonium-238 RTGs with ~87-year half-lives and vastly more power. The 15x improvement matters only if future generations close the gap to Ni-63's power density while preserving C-14's safety and longevity — and the physics may not cooperate.

## Limitations
- Cannot verify Qianjiyuan Tianshu specs independently (no peer-reviewed paper found, relying on IE/SCMP reporting)
- Betavolt's BV100 claims have not been independently verified either; 1W version delayed past 2025 target
- Efficiency calculations depend on exact C-14 activity and beta spectrum assumptions
- Cost data not available for any of these batteries
- Scaling behavior (parallel/series stacking) not characterized for most batteries

## Kill Test: Original Contribution
1. Theoretical power ceiling calculation (37.85 µW from 129 mCi C-14) — not in any source
2. Device gap table with volume calculations — not in any source  
3. Cross-battery volumetric power density comparison — partially done by CAS but not with these specific devices
4. iPhone charging time absurdity calculation — not in any source
5. Improvement rate extrapolation bounded by theoretical ceiling — not in any source
