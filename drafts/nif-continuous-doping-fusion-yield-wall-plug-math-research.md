# Research: NIF's Continuous Gradient Doping and the Fusion Wall-Plug Math

## Core Thesis
NIF achieved a record 8.6 MJ fusion yield (target gain 4.13) on April 7, 2025, enabled by a specific innovation: continuous gradient doping of diamond capsules. The yield trajectory has been impressive. But the wall-plug efficiency gap—300 MJ of grid electricity to produce 2 MJ of UV light—means a commercially viable ICF power plant needs an additional ~50× improvement across the chain. This article maps the exact math.

## Primary Sources

### 1. LLNL Official NIF Ignition Timeline (lasers.llnl.gov/science/achieving-fusion-ignition)
Complete history of all 11 ignition shots:
- Aug 2021: 1.35 MJ yield (pre-ignition record)
- Dec 5, 2022: 2.05 MJ in → 3.15 MJ out (gain 1.54) — 1st ignition
- Jul 30, 2023: 2.05 MJ → 3.88 MJ (gain 1.89)
- Oct 8, 2023: 1.9 MJ → 2.4 MJ (gain 1.26)
- Oct 30, 2023: 2.2 MJ → 3.4 MJ (gain 1.55)
- Feb 12, 2024: 2.2 MJ → 5.2 MJ (gain 2.36)
- Nov 18, 2024: 2.2 MJ → 4.1 MJ (gain 1.86)
- Feb 23, 2025: 2.05 MJ → 5.0 MJ (gain 2.44) — first continuous doping test
- Apr 7, 2025: 2.08 MJ → 8.6 MJ (gain 4.13) — RECORD, second continuous doping
- Jun 22, 2025: ? → 2.4 MJ (LANL experiment, different purpose)
- Oct 1, 2025: 2.065 MJ → 3.5 MJ (gain 1.74, nuclear survivability test)
- Jun 20, 2026: ? → 7.9 MJ (gain ~3.8) — 11th ignition

### 2. LLNL Target Breakthrough Article (lasers.llnl.gov/news/target-breakthrough-enabled-fusion-record-nif)
Key technical details on continuous gradient doping:
- Tungsten dopant gradually ramped from 0 to 0.44 atomic % over 10 microns, then back down
- "Dimmer switch" vs "on/off switch" analogy (Sal Baxamusa, LLNL)
- Eliminates abrupt density changes that introduce hydrodynamic instabilities
- Reduces "mix" (capsule material contaminating fuel)
- Diamond capsule made via plasma-assisted chemical vapor deposition
- Partner: Diamond Materials GmbH (Freiburg, Germany), General Atomics (San Diego)
- Dan Clark, LLNL physicist: "You get higher compression, you get cleaner fuel, and everything burns hotter and brighter"
- First tested Feb 23, 2025 (5.0 MJ). Second test Apr 7, 2025 (8.6 MJ)

### 3. NIF Cost & Efficiency Data
- Construction: $3.5 billion (LLNL FAQ)
- Annual operating: $290M/year (NYT 2012), $450M/year (Physics Today/Congress budget)
- Per-shot electricity cost: ~$20 (National Geographic)
- Grid power per shot: 300 MJ to power laser system (TechCrunch, Physics Today)
- NIF laser delivers ~2 MJ UV to target
- Wall-plug to UV efficiency: 2/300 = 0.67%
- NIF design maximum yield: 45 MJ (Wikipedia, citing facility specifications)
- Physics Today: "economically viable fusion will require fusion reactions yielding energy gains of at least 100 times the energy deposited on the fuel capsule"

### 4. Commercial Laser Efficiency
- NIF uses flashlamp-pumped Nd:glass lasers (0.67% wall-plug efficiency)
- Diode-pumped solid-state lasers: 10% wall-plug efficiency demonstrated
- Advanced concepts: 16-18% expected (Wikipedia citing 1996 research)
- Novel approach (Sunahara et al., Optics Express 2025): coherent beam-combined fiber lasers with optical enhancement cavities, ~10% wall-plug-to-UV efficiency

### 5. Private Fusion Company Status (2026)
- Commonwealth Fusion Systems: $4B total raised, SPARC operational late 2026/early 2027, ARC commercial plant in Virginia early 2030s, 200 MW Google PPA, 400 MW total
- Helion Energy: $15.5B valuation, $465M Series G, Orion plant construction underway in Malaga WA, 50 MW Microsoft PPA by 2028
- TAE Technologies: $150M from Chevron and Google
- Total private industry: $14.2B raised since 2021 (Reuters)
- DOE Milestone-Based Fusion Program: $134M expanded funding (Sep 2025)
- IFE-specific: Focused Energy (startup), Xcimer Energy, Longview Fusion Energy Systems

### 6. Repetition Rate Problem
- NIF fires once every several hours
- An IFE power plant needs 10-15 shots per second (or at minimum 1-10 Hz per Sunahara et al.)
- Each shot requires: manufacture diamond capsule, fill with DT fuel, cool to cryogenic temps, inject into chamber, align 192 lasers, fire
- No solution exists for mass-producing capsules at this rate

## Original Calculations

### Calculation 1: Best-Yield Growth Rate
- Aug 2021 → Apr 2025: 1.35 MJ → 8.6 MJ in 3.67 years
- CAGR: (8.6/1.35)^(1/3.67) - 1 = 56% per year
- At this rate: 2027 → ~21 MJ, 2028 → ~33 MJ, 2029 → ~51 MJ (hits 45 MJ facility limit)

### Calculation 2: Wall-Plug Efficiency Gap
Current NIF:
- 300 MJ grid → 2 MJ UV → 8.6 MJ fusion
- Wall-plug Q = 8.6/300 = 0.029 (2.9%)

With 10% efficient DPSSL:
- 20 MJ grid → 2 MJ UV → 8.6 MJ fusion  
- Wall-plug Q = 8.6/20 = 0.43

### Calculation 3: What Target Gain Does a Power Plant Need?
Efficiency chain: wall-plug eff × target gain × thermal conversion eff must > 1 (for breakeven)
With 10% laser, 40% thermal: target gain > 1/(0.10 × 0.40) = 25
Including 30% parasitic loads (pumps, cryo, etc.): target gain > 25/0.70 = 36
For economically competitive electricity: target gain > 50-100 (Physics Today says 100)

Current record: 4.13
Gap: 4.13 → 50 minimum = 12× improvement needed
Gap: 4.13 → 100 (Physics Today) = 24× improvement needed

### Calculation 4: The Continuous Doping Effect
Before continuous doping (best): 5.2 MJ (Feb 2024, without doping)
After continuous doping: 8.6 MJ (Apr 2025)
Improvement: 65% yield increase for same ~2 MJ laser input
But: Feb 2024 used 2.2 MJ input, Apr 2025 used 2.08 MJ
Gain comparison: 2.36 → 4.13 = 75% gain improvement

### Calculation 5: Repetition Rate Economics
A 1 GW power plant at 40% thermal efficiency needs 2.5 GW thermal
At target gain 50 with 2 MJ laser UV: 100 MJ per shot
At 10 Hz: 1 GW thermal → need 2.5 GW/100 MJ = 25 shots/second
That's 25 diamond capsules per second, 2.16 million per day
At even $10/capsule: $21.6 million/day in fuel costs alone

## Journalist
Anya Volkov — Energy Systems beat (previously wrote fusion-vs-solar economics)

## Category
⚡ Energy

## Related Articles on LITF
- fusion-vs-solar-economics.html (Anya Volkov, Mar 2026)
- litf-conflict-helion-first-fusion-regulatory-licenses-orion-washington.html (if exists)
