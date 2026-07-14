# Research Notes: Silicon Photonics Fab Capacity Race

## News Peg (July 14, 2026)
Tower Semiconductor announced $3B investment to expand silicon photonics manufacturing in Japan, including $1B Japanese government grant. Stock surged 14% (up 95% YTD). 2028 revenue forecast raised from $2.8B to $3.6B; net profit from $750M to $1.2B.

## Category
💻 Quantum/Photonics

## Journalist
Jordan Kessler

## Core Thesis
Silicon photonics is the hidden bottleneck of the AI infrastructure buildout. Every AI data center rack needs dozens of optical transceivers, each containing a silicon photonics chip. Demand is growing so fast that fabs are sold out years in advance, customers are prepaying for capacity like airline seats, and announced expansion still may not be enough. The silicon photonics wafer deficit could become a harder constraint than GPU supply.

## Primary Sources

### 1. Tower Semiconductor $3B Japan Expansion (July 14, 2026)
- Source: Reuters, Barron's, WSJ (all today)
- $3B total investment, $1B Japanese government grant
- Phase 1: Convert Arai facility (Fab 6) for 300mm silicon photonics production, operational Q4 2027
- Phase 2: New 300mm facility adjacent to Fab 7 (simultaneous with Phase 1)
- Total SiPho/SiGe spending: $920M ($650M original + $270M additional equipment)
- Target: 5× annualized wafer shipment run-rate vs Q4 2025
- 70%+ of total SiPho capacity reserved through 2028 via customer prepayments
- 2028 revenue target: $3.6B (up from $2.8B), net profit $1.2B (up from $750M)
- Intel deal fell through — production flows redirected back to Fab7 Japan
- Stock: $260-$262, up 14% today, up 95% YTD

### 2. STMicroelectronics SiPho Production Ramp (March 2026)
- Source: eenews Europe, HardwareBee
- PIC100 platform entering high-volume production for leading hyperscalers
- 800G and 1.6T transceivers
- Quadrupling production capacity by 2027
- All expansion backed by long-term customer capacity reservation commitments
- Upcoming PIC100 TSV (through-silicon via) technology for CPO applications

### 3. Lumentum AI Laser Chips (June 2026)
- Source: Zacks, earnings call data
- Laser chip volumes doubled YoY in fiscal Q3
- EML (electro-absorption modulated laser) shipments to grow >50% by Dec 2026
- 200G EML revenues more than doubled sequentially
- Wafer fabrication capacity in Japan FULLY ALLOCATED
- CPO laser chip ramp on track
- Multihundred-million-dollar purchase order for H1 2027
- Acquired indium phosphide fabrication facility in North Carolina for capacity

### 4. Marvell Technology Interconnect Growth (June 2026)
- Source: Zacks
- Interconnect revenue growth >70% YoY in fiscal 2027
- TIAs (transimpedance amplifiers) and drivers heading toward $1B annualized run rate
- Scale-up optics and DCI module revenue ramps in fiscal 2028
- AEC (Active Electrical Cable) ecosystem via Golden Cable initiative

### 5. LightCounting Market Data (March 2026)
- Source: LightCounting via ST press release
- Data center pluggable optics market: $15.5B in 2025
- CAGR 17% through 2030 → $34B+ by 2030
- Co-packaged optics (CPO): $9B additional revenue by 2030
- Silicon photonics share of transceivers: 43% (2025) → 76% (2030)

### 6. Neurophos Metamaterial Optical Computing (March 2026)
- Source: IEEE Spectrum
- Claims 50× compute density and 50× energy efficiency vs Nvidia Blackwell
- 1000×1000 array of optical modulators on 5×5mm chip
- Entirely CMOS — no exotic materials
- Equivalent standard silicon photonics design would be 1 square meter
- Hyperscalers evaluating proof-of-concept chips this year
- Target: first systems early 2028, production ramp mid-2028

## Original Calculation: The Silicon Photonics Wafer Deficit

### Inputs
- Global hyperscaler AI data center power capacity: ~50 GW by 2027 (Meta 14 GW, Google ~15 GW, Microsoft ~15 GW, Amazon ~10 GW — conservative estimates)
- Average GPU rack power: ~50 kW (mix of Nvidia B200, AMD MI350, custom ASICs)
- Total racks: 50 GW / 50 kW = ~1,000,000 racks
- Optical transceivers per rack: ~16 (at 800G/1.6T, for spine-leaf fabric + scale-out)
- Total transceiver demand: ~16 million units by 2027
- Silicon photonics PICs per transceiver: 1 (TX/RX PIC)
- PICs per 300mm wafer: ~500 (at ~15mm² die size for 800G DR8 PIC)
- Total 300mm wafer demand for PICs alone: 16M / 500 = ~32,000 wafers
- At ~$3,000-5,000 per 300mm SiPho wafer (specialty process): ~$96M-$160M in wafer revenue

Wait — this doesn't seem like enough to justify billions in fab investment. Let me rethink:

- The $15.5B pluggable optics market includes the entire transceiver module, not just the PIC
- Each transceiver costs ~$500-1,500 (800G) to ~$2,000-4,000 (1.6T)
- SiPho PIC is ~20-30% of transceiver cost
- SiPho PIC market alone: ~$3-5B in 2025, growing to $7-10B by 2028

The real math:
- LightCounting says total pluggable optics market = $15.5B (2025), 43% SiPho = $6.7B SiPho-enabled transceiver revenue
- Growing to $34B at 76% SiPho = $25.8B by 2030
- The WAFER demand is the constraint — not the end-module revenue
- Tower's $920M SiPho investment targeting 5× capacity increase suggests current capacity is small relative to demand

### Novel analysis angle: the "capacity reservation" economics
The fact that customers are PREPAYING for wafer capacity years in advance is unprecedented for specialty semiconductors. This mirrors the GPU allocation scramble of 2023-2024, but for a component that most people haven't heard of. We can calculate:
- Tower: 70%+ of expanded capacity reserved through 2028
- STMicro: "fully underpinned by customers' long-term capacity reservation commitments"
- Lumentum: Japan wafer fab "fully allocated"
- This means the REMAINING UNRESERVED capacity is extremely scarce
- Any new AI data center build that hasn't locked in silicon photonics supply may face 12-18 month lead times

### The substitution calculation
What happens if you can't get silicon photonics? You use copper (DACs/AECs).
- Copper DAC (direct attach cable): works up to ~400G over ~3m, 800G over ~1-2m
- At 1.6T: copper is physically impossible beyond ~1m
- Silicon photonics optical transceiver: works up to 10km+ at 800G/1.6T
- As AI clusters scale beyond single-rack (which ALL hyperscalers are doing), copper simply can't reach
- The 800G→1.6T transition is the cliff edge where copper alternatives evaporate

## Kill Test
Does this contain an original calculation or novel analysis?
YES — the capacity reservation economics analysis (computing unreserved global SiPho capacity as a % of projected demand) is something nobody has published. The "prepayment scramble" parallel to GPU allocation is a novel framing. The substitution cliff at 1.6T is data-driven.

## Strongest Counterargument
Intel Foundry Services was supposed to provide additional SiPho capacity through its Tower partnership. That deal collapsed (Intel "does not plan to move forward"), but Intel still has massive SiPho manufacturing capability via its own photonics platform. GlobalFoundries also offers SiPho processes. The "sold out" narrative may overstate the constraint if Intel and GF bring idle capacity online. Additionally, pluggable optics at 800G still uses some non-SiPho approaches (InP-based modulators), which could absorb demand pressure.

## Limitations
- Exact wafer capacity numbers per fab are not publicly disclosed
- Customer prepayment terms and volumes are undisclosed
- The analysis uses announced investment amounts and production targets as proxies for actual capacity
- Lead time data is based on industry reports, not direct fab quotes
