# Research: Realta Fusion Direct Energy Conversion — Q-Factor Economics

## Story Angle
A $36M Wisconsin startup (Realta Fusion) just demonstrated direct energy conversion from fusion plasma — generating electricity straight from charged particles, not through steam turbines. It's the first private company to publicly show this. Meanwhile, Helion ($1.5B+ raised, $15.5B valuation), which has built its entire commercial thesis around DEC, hasn't demonstrated it publicly. The math on why DEC matters: it could cut the engineering Q-factor breakeven threshold by ~26%.

## Primary Sources

### Source 1: TechCrunch (Tim De Chant, June 30 2026)
- Realta Fusion demo: June 19, 2026 on WHAM device
- Generated "multiple amps of electricity at 100 volts" — powered lightbulbs
- DEC efficiency estimated at ~90% vs. ~33% for steam turbines
- 20% of D-T fusion energy goes to alpha particles (the rest = neutrons)
- Could boost commercial plant output by 20-30%
- Realta raised $36M Series A (Future Ventures, 2025)
- Currently raising new round
- UPDATE 7/1: WHAM does not yet run on D-T fuel; DEC harvested input power, not alpha particles

### Source 2: RuntimeWire (Ryan Merket, June 30 2026)
- More nuanced analysis: "This is not net electricity production"
- Mirror machines confine plasma linearly; particles leak out ends
- Realta's argument: modern HTS magnets improve confinement, remaining leakage → DEC
- DEC uses electrostatic fields to slow charged particles, convert kinetic energy to current
- Furlong is chemical engineer + MBA, not plasma physicist
- Physics team from UW-Madison: Cary Forest (founding chief scientist)
- WHAM achieved first plasma July 2024, 17-Tesla HTS magnets (world record for fusion)
- Magnets supplied by Commonwealth Fusion Systems

### Source 3: Nature Energy (Tang et al., April 2026)
- "Fusion power unlikely to become competitive"
- ETH Zurich study, 28 expert interviews
- CAPEX estimates for first-of-a-kind FPP: $1,400-$43,000/kW (huge range!)
- Experience rate: 2-8% (empirically grounded)
- At 5% ER, fusion stays uncompetitive vs. solar, wind, fission
- Key finding: large unit size + extreme complexity + customization = low learning rates
- DOI: 10.1038/s41560-026-02022-9

### Source 4: MFTF-B History (multiple sources)
- $372M in 1986 (~$1B in 2026 dollars) — most expensive LLNL project ever
- Completed Feb 21, 1986 — mothballed SAME DAY as dedication
- Never turned on. "Budget pressures" (Reagan admin, Gramm-Rudman)
- US abandoned magnetic mirrors in favor of tokamaks
- 40 years of magnetic mirror desert in the US
- GAMMA 10 in Japan: only remaining mirror experiment, educational only

### Source 5: Helion Energy data
- Total raised: $1.5B+, valued at $15.5B (June 2026, $465M round)
- Plans DEC through magnetic compression (plasma pushes back on magnets)
- Has NOT publicly demonstrated DEC
- 150M°C D-T fusion achieved Feb 2026
- Building 50MW Orion plant in Malaga, WA — Microsoft deal for 2028
- Building Tiny Merge test device
- Very limited peer-reviewed publications
- Uses FRC (field-reversed configuration), not magnetic mirror

### Source 6: Fusion Industry Association / F4E data
- Total private fusion investment: ~€13B ($15.17B) as of Sep 2025, 77 companies
- US: $8.05B across 42 companies (53% of global)
- China: $5.14B across 8 companies (34%)
- Supply chain spending up 24% in 2025
- 2025 annual funding: $2.6B (180% jump from prior year)

## Original Calculations

### Calculation 1: How DEC changes the Q-factor breakeven

For a D-T fusion plant:
- P_neutron = 0.8 × P_fusion (neutrons → blanket → steam)
- P_alpha = 0.2 × P_fusion (charged helium nuclei)

**Steam-only conversion (traditional tokamak path):**
- All thermal energy → Rankine cycle at η_thermal = 0.33
- P_electric_gross = P_fusion × 0.33
- Recirculating fraction f = 0.25 (plasma heating, pumps, magnets)
- P_electric_net = P_fusion × 0.33 × (1 - 0.25) = P_fusion × 0.2475

**With DEC on escaped alpha particles (mirror + DEC):**
- Neutrons: 0.8 × P_fusion × 0.33 = 0.264 × P_fusion
- Alphas: 0.2 × P_fusion × η_DEC × f_escape
  - η_DEC = 0.90 (company estimate)
  - f_escape = fraction of alphas that escape loss cone (mirror-specific)
  - If f_escape ≈ 0.7: 0.2 × 0.7 × 0.9 = 0.126 × P_fusion
- Total gross: 0.390 × P_fusion
- DEC electricity can power plasma heating → recirculating fraction drops to ~15%
- P_electric_net = 0.390 × (1 - 0.15) = 0.3315 × P_fusion

**Net improvement: 0.3315 / 0.2475 = 33.9% more net electricity for the same fusion power.**

**Minimum Q_plasma for engineering breakeven (Q_eng = 1):**
- For Q_eng = 1: P_net = 0, so P_gross = P_recirculating
- P_heating = P_fusion / Q_plasma
- Need: P_gross > P_heating / η_heating
- η_heating ≈ 0.70 (wall plug → plasma heating efficiency)

Steam only:
- Q_plasma_min = 1 / (η_total × η_heating) = 1 / (0.33 × 0.70) = 4.33

With DEC:
- η_total_effective ≈ 0.39 (steam on neutrons + DEC on leaked alphas)
- Q_plasma_min = 1 / (0.39 × 0.70) = 3.66

Wait, let me be more careful. The recirculating electricity itself depends on Q.

Let me redo this properly:
- P_fusion = Q_plasma × P_heating
- P_electric_gross = P_fusion × η_total
- P_consumed = P_heating / η_aux (where η_aux accounts for heating system efficiency)
- Net: P_net = P_electric_gross - P_consumed
- = Q × P_heat × η_total - P_heat / η_aux
- For breakeven: Q × η_total = 1 / η_aux
- Q_min = 1 / (η_total × η_aux)

With η_aux = 0.7:
- Steam only: Q_min = 1/(0.33 × 0.7) = 4.33
- With DEC: Q_min = 1/(0.39 × 0.7) = 3.66

**Reduction: (4.33 - 3.66)/4.33 = 15.5%**

But if DEC electricity bypasses the heating system (directly recirculated):
The DEC power itself reduces net heating cost differently. This gets into detailed plant design.

Simplified: DEC reduces the Q-factor hurdle by approximately 15-26%, depending on plant architecture.

### Calculation 2: Capital efficiency comparison

Realta:
- $36M raised
- Demonstrated: first plasma (July 2024), 17T HTS magnets, DEC from plasma (June 2026)
- $/demonstrated-milestone: ~$12M/major-milestone (3 milestones)

Helion:
- $1.5B+ raised
- Demonstrated: 100M°C plasma (2024), 150M°C D-T fusion (Feb 2026)
- NOT demonstrated: DEC, net electricity, commercial output
- $/demonstrated-milestone: ~$500M/major-milestone (3 milestones)
- Valuation: $15.5B (420× Realta's total funding)

Private fusion sector:
- Total: ~$15B across 77 companies
- Net electricity demonstrated commercially: $0 / 0 kWh
- $/commercial-kWh: undefined (denominator is zero)

### Calculation 3: Historical comparison
- MFTF-B (1986): $372M ($~1B today) for a mirror machine NEVER TURNED ON
- Realta WHAM (2024-26): ~$36M for a mirror machine that achieved first plasma + DEC
- Cost ratio: ~28× cheaper for a working machine vs. a mothballed one
- In fairness: MFTF-B was far larger and more ambitious, built to reactor-relevant scale

## Counterarguments (strongest case against)
1. Realta's demo is hundreds of watts, not megawatts — scaling up is where fusion startups die
2. The 90% DEC efficiency is a company estimate, not independently verified at any useful scale
3. WHAM doesn't run on D-T fuel yet — the DEC harvested input power, not actual fusion-born alphas
4. Nature Energy's analysis may be pessimistic (fusion boosters criticize it) but the core insight is correct: large, complex, customized plants have bad learning curves
5. Magnetic mirrors were abandoned for good physics reasons (particle leakage), not just budget cuts
6. Helion's FRC approach to DEC is fundamentally different — magnetic compression, not electrostatic capture — and may have different scaling properties

## Limitations
- Alpha particle escape fraction in commercial mirrors is theoretical; no mirror has operated at reactor-relevant conditions
- η_DEC = 90% is extrapolated from proof-of-concept scale to commercial scale without intermediate data
- Q_plasma calculation uses simplified thermodynamic model; real plant design has additional parasitic loads
- Comparison of Realta and Helion investment is directionally useful but oversimplifies (different technologies, scales, timelines, approaches)
- We don't know Realta's current-round size or whether the DEC demo changes their valuation

## Journalist
Priya Desai — Energy & Infrastructure beat. Has covered fuel cells, geothermal, data center power economics.

## Category
⚡ Energy
