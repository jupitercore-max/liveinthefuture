# Research: China Controls 70% of a Metal Most AI Investors Have Never Heard Of

## Journalist: Marcus Chen (Tech Finance)
## Category: ⚡ Energy / 🛡️ Defense (Supply Chain)
## Date: 2026-06-20

## Core Thesis
$700 billion in AI capital expenditure from the top four hyperscalers runs through an optical interconnect supply chain that ultimately depends on indium — a metal 70% sourced from Chinese zinc smelters. China has already restricted the processed form (indium phosphide) and is now tightening scrutiny on the raw metal itself. The G7's new Critical Minerals Alliance doesn't even pilot-track indium. Nobody is running the math on this dependency.

## Novel Analysis (Kill Test: ✅ Original Calculation)
Calculate the "indium dependency chain" for AI infrastructure:
- What fraction of the $26B AI optical transceiver market depends on InP-based components?
- What fraction of InP raw material originates from China?
- What's the implied supply chain exposure of the $700B hyperscaler capex buildout?
- Compare to the gallium/germanium precedent: when China restricted those, exports dropped 74% and prices rose 75-115%.

## Primary Sources (3+ required)

### 1. USGS Mineral Commodity Summaries 2026 (pubs.usgs.gov)
- Global indium refinery production 2024: ~1,090,000 kg (1,090 metric tons)
- China: 760,000 kg (69.7%)
- South Korea: 180,000 kg (16.5%)
- Canada: 40,000 kg (3.7%)
- Belgium, France, Japan, Russia, Uzbekistan: small stable producers
- Supply inelastic — indium is a byproduct of zinc refining, not primary-mined

### 2. Reuters: "China tightens indium export checks as AI demand increases" (June 19, 2026)
- China customs demanding end-user information for first time
- European buyer asked where end users are based
- North American buyer: approvals went from same-day to several days
- Not uniform — some buyers haven't seen changes yet
- Indium phosphide already on China export control list since February 2025
- Raw indium metal NOT yet on control list, but scrutiny increasing
- Coherent CEO traveled to Beijing with Trump in May to raise InP issue

### 3. TrendForce: "Global AI Optical Transceiver Market" (April 2026)
- AI optical transceiver market: $16.5B (2025) → $26B (2026), 57% YoY growth
- 800G+ transceiver shipments: 24M (2025) → 63M (2026), 2.6x growth
- Bottlenecks: EML and CW laser supply (both InP-based)
- Nvidia pre-allocated large portion of EML capacity, reducing availability

### 4. Reuters: "Indium hits highest prices in a decade" (February 2026)
- Rotterdam prices: $500-600/kg, up 55%+ since September 2025
- Highest since early 2015
- Chinese speculative buying on Zhonglianjin exchange
- Supply inelastic: "In the coming years, a steady increase in prices is expected"
- China's unwrought indium exports down 23% month-over-month in December 2024

### 5. USGS: "Quantifying Potential Effects of China's Gallium and Germanium Export Restrictions"
- Gallium total ban modeled: $3.1B GDP impact ($1.7-8.2B range)
- Germanium total ban: $0.4B GDP impact
- Combined: $3.4B GDP impact ($1.7-9.0B range)
- Semiconductor device manufacturing: >40% of net loss

### 6. Tom's Hardware / Financial Times: Gallium/Germanium price impact data
- China controls 94% gallium, 83% germanium
- After Aug 2023 export licensing:
  - Gallium: $300 → $595/kg (highest in 13 years, ~98% increase)
  - Germanium: $1,200 → $2,600/kg (115% increase)
  - Q1 2024 gallium exports down 74.1% YoY
  - Q1 2024 germanium exports down 62.8% YoY

### 7. J.P. Morgan report (June 2026, via Barron's/Investors.com)
- Top 4 hyperscalers guided $700-725B capex for 2026 (up ~75% from $410B in 2025)
- Top 5 (with Oracle): $660-690B
- 2027 expected to exceed $1.1T
- AI capex through 2030: $5.5T (up from $5.1T prior estimate)
- $170B in bonds issued this year by hyperscalers
- Alphabet: $85B in equity

### 8. G7 Critical Minerals Alliance (June 17, 2026)
- Non-binding G7 Critical Minerals Resilience and Production Alliance
- Target: <60% single-supplier dependency by 2030 for rare earths and permanent magnets
- Pilot minerals: lithium and nickel (NOT indium)
- 5 new minerals added per year
- 195 projects, €64B ($74B) investment since early 2026
- U.S. Project Vault: $12B critical minerals reserve
- IEA platform for early warnings

### 9. Coherent Corp: 6-inch InP wafer announcement (March 2024)
- World's first 6-inch InP wafer fabrication capability
- Sherman, Texas and Järfälla, Sweden fabs
- Enables increased production capacity and lower die costs
- Previously industry was on 2-inch and 3-inch wafers
- Coherent CEO was one who traveled to Beijing with Trump to raise InP issue

### 10. Dell'Oro / Communications Today: IP-over-DWDM market
- IPoDWDM market: 27% CAGR, surpass $7B by 2030
- ZR/ZR+ module shipments: 29% 5-year CAGR
- Disaggregated WDM: 50% YoY growth in Q1 2026, approaching $13B by 2030
- Cisco Acacia top in ZR/ZR+ shipments; Marvell second

### 11. China defense of export controls (June 18, 2026)
- China's foreign ministry urged G7 to "respect market economy principles and international trading rules"
- Called G7 alliance a "small clique"

## Original Calculation: The Indium Dependency Chain

### Step 1: What fraction of AI optical transceivers need InP?
- Short-reach transceivers (<100m, intra-rack): use VCSELs (GaAs-based, NO indium needed)
- Medium/long-reach (100m+, rack-to-rack, DCI): use EML or CW lasers on InP substrates
- For AI data centers, the split:
  - VCSELs: ~30% of units but ~15% of market value (cheaper per unit)
  - InP-based: ~70% of units × premium price = ~80% of $26B market value
  - InP-dependent market value: ~$20.8B of $26B

### Step 2: Raw indium dependency
- China produces 70% of global indium
- China has already restricted InP (the processed form) since Feb 2025
- Non-China InP producers (Coherent US/Sweden, AXT/MACOM US) still source some raw indium from the global market, where China dominates
- Conservative estimate: 60-70% of InP raw material chain traces back to Chinese indium

### Step 3: The exposure math
- $20.8B InP-dependent transceiver market × 70% Chinese indium share = $14.6B in direct Chinese supply chain exposure
- But transceivers are just the last mile. The capex they enable is orders of magnitude larger:
  - $700B hyperscaler capex → data centers need optical interconnects to function
  - Without optical transceivers, GPU clusters can't communicate
  - A single GPU server rack needs 32-64 optical transceivers
  - An AI data center with 100,000 GPUs needs ~200,000+ optical transceivers

### Step 4: The gallium analogy — modeling an indium disruption
- When China restricted gallium (94% market share), prices rose ~98% and exports dropped 74%
- China's indium market share (70%) is lower but the leverage pattern is the same
- If China applies gallium-style licensing to raw indium:
  - Conservative: prices rise 50-80% (from $550 to $825-990/kg)
  - Moderate: exports drop 30-50% (matching early gallium pattern)
  - Severe: processing shifts to domestic Chinese use (they keep the InP, sell only finished goods)

### Step 5: G7 gap analysis
- G7 Critical Minerals Alliance pilots: lithium and nickel
- 5 new minerals per year
- Indium isn't mentioned
- At current pace, indium might not be tracked until 2028-2029
- By then, the AI infrastructure buildout is supposed to be done

## Strongest Counterargument
Coherent's 6-inch InP fabs in Texas and Sweden are designed to reduce China dependency. The 6-inch wafer format increases capacity and reduces per-die cost. Additionally, indium can be recovered from recycled ITO (indium tin oxide) from LCD panels, and some zinc smelters outside China (in South Korea, Canada) produce indium as a byproduct. The actual mass of indium consumed in InP photonics is small relative to total global production — the bottleneck is processing capacity and expertise, not raw material volume. However, processing capacity takes years to build, and the raw material supply chain exposure remains.

## Limitations
- InP wafer market production data is proprietary; exact indium consumption by the optical industry is not publicly disclosed
- The 80/20 split between InP-based and VCSEL-based transceivers by value is an estimate based on industry reports and pricing differentials
- Some optical transceivers use silicon photonics with external InP lasers, adding another layer of dependency that's hard to quantify
- China's customs scrutiny may be routine enforcement rather than a prelude to formal controls
- The G7 pilot mineral list is a starting point, and indium may be added sooner through informal coordination

## Key Quote
"We are extremely proud to be granted these licenses from the Washington DOH, making us the first company in the world with the regulatory approvals in place for fusion power plant operations." — David Kirtley, CEO Helion (wait, wrong story)

Better:
"The tight supply of crude indium is a long-standing structural issue, exacerbated by China's increasingly stringent environmental protection policies." — Cristina Belda, Argus senior analyst (via Reuters, Feb 2026)

## Related Articles on LITF
- Apple India supply chain tariff math
- Agent supply chain attack (cybersecurity)
