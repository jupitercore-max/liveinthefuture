# Research: BOHR Nuclear CubeSat — Tritium Betavoltaics Unlock the Missions Plutonium Can't Reach

## Core Story
City Labs launched BOHR (Betavoltaic Orbital High-Reliability) CubeSat on July 7, 2026 aboard SpaceX Transporter-17 from Vandenberg. First commercial nuclear-powered satellite. Uses NanoTritium betavoltaic battery — tritium beta decay generates electricity via III-V semiconductor junctions.

## Primary Sources

### 1. City Labs / BOHR Specifications
- Company: City Labs, Inc., Miami, FL
- CEO: Peter Cabauy
- Product: NanoTritium betavoltaic battery
- P100 series: ~100 µW at 3.3V nominal
- P200 series: upcoming, higher capacity
- Package types: 28-Pin CERDIP, LCC 44, LCC 68
- Temperature tolerance: -55°C to +150°C
- Lockheed Martin tested 2008 — devices STILL working (18 years)
- NRC Sealed Source Device Registration: FL-1334-D-101-G
- Ships under NRC general license — no recipient radiation license required
- Source: citylabs.net product pages

### 2. SBIR Contract (sbir.gov)
- Title: "Enhanced Tritium Power Source for Autonomous Nuclear Tritium Sensors (ANTS)"
- Amount: $3,800,000 (Phase II)
- Topic: AFX234-DCSO1
- Target: 100-microwatt tritium betavoltaic power source
- Application: long-duration autonomous sensor systems in space
- Prior success: Powered Michigan Micro-Mote (M3) for 3+ years without maintenance
- Development focus: Optimizing tritium loading, semiconductor efficiency, system packaging
- Objective: spaceflight-qualified power unit, 15+ year life
- Tags: SBIR, Phase II, 2025, DOD, USAF
- Related SBIR: "5 Watt per Kilogram Tritium Betavoltaic" — goal: world's first milliwatt-scale betavoltaic

### 3. Tritium Physics
- Half-life: 12.3 years
- Specific power of tritium: 340 W/kg
- Decay product: helium-3 (stable, non-radioactive)
- Beta emission energy: ~5.7 keV average (18.6 keV max) — VERY low, stopped by skin
- Tritium metal hydride power density: 38 W/kg (conventional, e.g., titanium tritide)
- City Labs improved metal tritide: 70 W/kg, expandable to 100 W/kg
- Betavoltaic conversion efficiency: 8% → 10%+ (Phase I improvement)
- Source: SBIR filings, ResearchGate (NASA report by Cataldo & Colozza)

### 4. Pu-238 / RTG Supply Chain (GAO-17-673, Scientific American, SpaceNews)
- US stockpile: ~77 lbs (35 kg) of Pu-238, only ~half suitable for power production
- RTG cost: ~$77M per unit with 10.6 lbs (4.8 kg) Pu-238 (Curiosity-class MMRTG)
- MMRTG output: ~110W at beginning of life
- Production target: 1.5 kg/year (DOE Supply Project) — BEHIND SCHEDULE
- Production pipeline: Idaho (neptunium) → Oak Ridge (irradiation) → Los Alamos (storage) → Idaho (assembly)
- Annual maintenance: $50M+/year
- Production restarted 2015 after hiatus since 1988
- Russia supplied Pu-238 until 2010 — no more
- At current stockpile: enough for ~3 more RTG missions
- Production still "in experimental stage" per GAO
- Source: GAO report, ScienceAlert, SpaceNews

### 5. Solar Power in Space
- Typical spacecraft solar arrays: ~30 W/kg specific power
- Max recorded: ~200 W/kg
- Triple-junction GaAs cells most common for CubeSats
- LEO eclipse: ~35% of orbit in Earth's shadow → batteries needed
- Battery degradation limits mission life
- Solar impossible in: lunar PSRs, deep space beyond Jupiter, military stealth applications
- Source: Power Electronics News, NASA studies

### 6. Wikipedia (as of Jul 2026)
- BOHR listed in "List of nuclear power systems in space"
- Entry: "First commercial nuclear-powered satellite and first nuclear CubeSat"
- Fuel: ³H (tritium), Betavoltaic type, NanoTritium Batteries

## Original Calculation: Mission Accessibility Matrix

### The Niche Betavoltaics Fill
For missions needing <1 mW for 20+ years with no sunlight:

**Option A: RTG**
- Minimum mass: ~45 kg (MMRTG)
- Minimum cost: ~$15-20M (smallest NASA RHU systems; full MMRTG $77M)
- Pu-238 needed: 4.8 kg per MMRTG
- At 1.5 kg/year production: one RTG every 3.2 years
- Regulatory: DOE/NRC approval, multi-lab pipeline, 2+ year lead time
- Verdict: Wildly oversized for micro-sensor needs; supply bottleneck makes parallel deployment impossible

**Option B: Solar**
- Cannot function in: lunar permanently shadowed regions, Venus surface, deep space beyond ~5 AU, buried/subterranean deployments
- Eclipse problem: 35% downtime in LEO, needs battery buffer
- Battery degradation: Li-ion loses ~20% capacity in 5 years in space (radiation + cycling)
- Verdict: Not applicable for target use cases

**Option C: Chemical batteries alone**
- Energy needed: 100 µW × 20 years × 8,760 hr/year = 17,520 mWh = 17.5 Wh
- Li-ion energy density: ~250 Wh/kg → ~70g of battery
- Self-discharge: ~2-3% per month at room temp → dead in ~3 years
- Deep discharge damages cells
- Verdict: Impossible for 20-year unattended operation

**Option D: Betavoltaic (NanoTritium)**
- Mass: <50g (chip-scale package)
- Estimated commercial cost: $5K-50K per unit (vs $3.8M SBIR for enhanced version)
- No Pu-238 needed — uses commercially available tritium
- Ships under general license — ANY US recipient, no radiation license
- Power after 20 years: ~32 µW (still functional)
- Verdict: ONLY viable option for this mission class

### Lunar PSR Sensor Network Economics
- Moon's south pole: ~300+ permanently shadowed regions with potential water ice
- NASA has floated tritium betavoltaics for autonomous sensors in these PSRs
- Deploying 100 NanoTritium-powered micro-sensors:
  - Battery cost: 100 × $25K (est.) = $2.5M
  - Launch cost to lunar surface: ~$1M/kg (current CLPS rates), sensors ~100g each = $10M
  - Total: ~$12.5M for 100 sensors, 20-year life
  - vs ONE RTG mission: $77M for ONE location, 14-year optimal life
  - Cost ratio: 6.2× cheaper AND 100× more coverage

### Military ISR Persistent Sensor Economics
- Air Force SBIR contract ($3.8M) targets autonomous space-based sensors
- "Intelligence, Surveillance, and Reconnaissance (ISR) and Space Domain Awareness (SDA)"
- Deploy 50 NanoTritium-powered CubeSats for persistent monitoring:
  - Per unit: ~$200K (CubeSat bus + NanoTritium + Transporter rideshare)
  - 50 units: $10M
  - vs. one traditional ISR satellite: $500M-2B+
  - Coverage: 50 independent sensors vs 1 high-value target
  - Attrition tolerance: lose 10 sensors, 80% of network survives

## Strongest Counterargument
100 microwatts is absurdly little power. A standard LED draws 20,000 µW. A Raspberry Pi draws 2.5W (2,500,000 µW). At 100 µW, you can't run a camera, a radio transmitter, or much of anything useful. The SBIR's own target of 100 µW acknowledges this is a "trickle charge" technology. The sensors it powers would have to be incredibly simple — think temperature/pressure loggers that store data and transmit in rare, brief bursts. The comparison to RTGs is misleading because RTGs power ENTIRE spacecraft with science instruments, communications, and heaters. Betavoltaics power sensors smaller than a fingernail.

## Limitations
- City Labs has not disclosed commercial pricing for NanoTritium units
- BOHR is a demonstration mission — the betavoltaic payload powers a test, not the satellite's primary systems
- The 100 µW target is SBIR-phase engineering, not proven commercial product
- Milliwatt-scale betavoltaics (the "5 W/kg" SBIR) remain aspirational
- Tritium availability depends on nuclear reactor operations and CANDU reactors (primarily Canadian)
- No independent verification of City Labs' 20-year lifetime claims in space environment (Lockheed 2008 test was ground-based)
- Power density improvement (38 → 70-100 W/kg) not independently verified
