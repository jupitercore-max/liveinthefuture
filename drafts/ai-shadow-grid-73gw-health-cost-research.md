# Research: AI's Shadow Grid — 73 GW of Off-Grid Power Plants

## Core Story
The AI industry is building a parallel power grid — 57 off-grid natural gas power plants totaling 73 GW of capacity — largely outside normal environmental permitting and public oversight. These plants serve individual data centers, are fast-tracked through regulatory loopholes, and in some cases operate under shell companies or behind secrecy laws that criminalize public disclosure.

## Primary Sources

### 1. Reuters Investigation (June 16, 2026)
- URL: reuters.com/business/energy/fast-tracked-power-plants-fuel-ai-boom-with-little-public-scrutiny-2026-06-16/
- Cleanview data: 57 off-grid US power plants, 73,000 MW total capacity
- 12+ projects approved in under 1 year with little/no notice to residents
- 2 already operating: xAI Memphis + Vantage Data Centers in Ashburn, VA
- Meta's Apollo facility (Wood County, OH): approved in <3 months, construction started before air permit was public, listed under subsidiary "Liames LLC"
- Williams Cos (WMB.N) building Apollo via subsidiary Will Power LLC; developing 4 similar projects in Ohio (18-24 months)
- Ohio: Law allows 45-day approval without public hearings
- Ohio: Criminal penalties for officials who disclose data center project info (inserted into college athletics bill, sponsored by Sen. Brian Chavez, whose top 2 donors: construction union + NiSource utility, $10K each)
- West Virginia: Exempted data center microgrids from local zoning
- xAI Memphis: Operating gas turbines WITHOUT permits, claiming "temporary" and "off-grid" exemption
- Microsoft: Stopped using NDAs with local governments nationwide after Wisconsin criticism
- Quote: Michael Cork, Harvard postdoc: "largest under-examined air-quality risks in the country"

### 2. Cleanview Report (February 2026)
- URL: distilled.earth and publicpower.org
- Original Cleanview data (Feb): 46 data centers, 56 GW behind-the-meter
- Now (June 2026): 57 plants, 73 GW — growth of +11 plants, +17 GW in 4 months (30% growth)
- 30% of all planned US data center capacity is behind-the-meter
- 90% of tracked projects announced in 2025 alone
- Equipment being deployed (NOT standard utility):
  - Mobile gas generators strapped to semitrucks
  - Aeroderivative turbines (originally for aircraft/warships)
  - Reciprocating engines (fast ramp, less efficient)
  - Repurposed cruise ship engines
- "Two-thirds of tracked projects have specific equipment deals with GE Vernova, Caterpillar, Siemens, Doosan"
- Revenue potential: $10-12B per GW for AI data centers
- Quote: Michael Thomas, Cleanview CEO: "Data center developers are in this great race. They are finding workarounds."

### 3. Texas BTM Data (Reuters, May 2026)
- 20+ GW of BTM power projects announced in Texas 2024-2025
- Additional 10 GW announced Jan-Apr 2026
- Fermi America: 17 GW total campus capacity (Project Matador)
- Intersect Power: deployment timelines "as little as 18 months" vs. 5-7 years for grid

### 4. EIA Emissions Data (Table 9.1, 2024)
- 2024 US power sector CO2: 1,537,073 thousand metric tons
- 2024 US power sector NOx: 1,112 thousand metric tons
- 2024 US power sector SO2: 808 thousand metric tons
- US total generation: ~4,200 TWh

### 5. E&E News / Politico (February 2026)
- "anything they can get their hands on" for power
- 75% of BTM capacity is fossil-fueled despite green PR

## Original Calculation: The Externality Math

### Emissions from 73 GW Shadow Grid

**Assumptions:**
- 73 GW nameplate capacity
- 65% capacity factor (data centers run 24/7, some maintenance/ramp)
- Equipment mix: ~30% simple cycle gas turbines, ~40% reciprocating engines, ~30% aeroderivative turbines
- Heat rate: ~9,500 Btu/kWh average (worse than CCGT's 6,500; these are less efficient equipment)

**Annual generation:**
73 GW × 0.65 × 8,760 hours = 415,668 GWh = 415.7 TWh
Context: US total electricity generation ~4,200 TWh → 415.7 / 4,200 = 9.9%

**CO2 emissions:**
- Average emission rate for this equipment mix: ~490 kg CO2/MWh (worse than CCGT ~400, better than coal ~900)
- Annual CO2: 415,668 GWh × 490 tonnes/GWh = 203.7 million tonnes
- As % of 2024 US power sector: 203.7M / 1,537M = 13.2% increase

**NOx emissions:**
- Equipment without advanced controls (fast-tracked, temporary, minimal permitting):
  - Simple cycle uncontrolled: ~1.5 lb/MWh
  - Reciprocating engines (lean-burn): ~2.5 lb/MWh
  - Aeroderivative with DLN: ~0.5 lb/MWh
  - Weighted average: ~1.5 lb/MWh
- Annual NOx: 415,668,000 MWh × 1.5 lb/MWh = 623,502,000 lbs = 311,751 short tons = 282,800 metric tonnes
- As % of 2024 US power sector NOx: 282,800 / 1,112,000 = 25.4% increase

**This is the kill-test calculation:** If all 57 plants operate at projected capacity, the US power sector's NOx emissions could increase by 25% — reversing a decade of air quality improvements. In 2014, US power NOx was 2,100 thousand metric tons; by 2024, it was down to 1,112 thousand. The AI shadow grid threatens to add back 283,000 metric tonnes, equivalent to rolling NOx back to 2020 levels (1,211K + 283K = 1,394K).

### Health Cost Externalities
- EPA Social Cost of NOx: ~$9,000-$17,000/short ton (varies by region, discount rate)
- Using midpoint $13,000/short ton: 311,751 × $13,000 = $4.05 billion/year in NOx health costs
- Social cost of CO2: ~$56/tonne (2025$, 3% discount): 203.7M × $56 = $11.4 billion/year
- Total externalities: ~$15.5 billion/year

### Revenue vs. Externality Ratio
- AI revenue potential: $10-12B per GW × 73 GW = $730-876 billion/year
- Externality cost: $15.5B/year
- Ratio: externalities = ~1.9% of revenue
- **Cost to fix:** SCR + CEMS on all 57 plants ≈ $5-15M each = $285-855 million one-time capital
- **As % of revenue:** 0.04-0.10% of annual revenue would pay for clean air controls

### The Key Insight
The AI industry is generating $800B/year in revenue from this power while imposing $15.5B/year in unpriced health and climate costs. The equipment to eliminate most of the health damage (SCR, CEMS monitoring) would cost less than 0.1% of the revenue these data centers generate. The secrecy provisions aren't protecting competitive advantage — they're preventing communities from quantifying what they're breathing.

## Strongest Counterargument
If these data centers connected to the grid instead, they would push dirtier marginal generation online (often coal peakers in PJM) and delay interconnection for renewables. Behind-the-meter gas may actually be cleaner than the marginal grid unit in some regions, and getting these data centers operational faster contributes to AI development that could solve other environmental challenges. The economic benefits ($730-876B in annual AI revenue) dwarf the externality costs, and the industry could afford to internalize them — the real question is whether the permitting shortcuts will self-correct once the initial build-out rush passes.

## Limitations
- Cleanview's 73 GW is nameplate capacity; actual built capacity may be significantly less (phantom projects)
- Capacity factor assumption (65%) may be high for some sites
- NOx emission rates estimated from EPA AP-42 factors for equipment categories; actual rates depend on control technology, maintenance, fuel quality
- Social cost values are modeled estimates with wide confidence intervals
- Some states may require controls that reduce actual emissions below our estimates
- "Shadow grid" framing may overstate permanence; some facilities genuinely intend to connect to grid later

## Journalist
Tomás Reyes — Energy beat (previously covered grid defection, battery storage)
