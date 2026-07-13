# Research: Subsea Geothermal Cable Tax — Volcano Power Economics

## Topic
Endurance Energy ($54M Series A, Founders Fund) is building generators to tap heat from undersea volcanoes at mid-ocean ridges. The physics are compelling — 386°C temperatures at the seafloor, 2°C cold-sink seawater — but the economics hinge on one bottleneck: the subsea cable that gets the power to shore. Original analysis calculates the "cable tax" per MWh across three scenarios to show exactly where this technology works (Pacific islands at $350/MWh diesel) and where it doesn't (US grid at $50/MWh).

## Category
⚡ Energy

## Journalist
Viktor Holm

## Key Sources

### Primary Source 1: TechCrunch (Jun 11, 2026)
- Endurance Energy raised $54M Series A led by Founders Fund
- Participation: Ascend, Construct Capital, Felicis, First Round Capital, Point72, Riot Ventures, Voyager Ventures
- Founded by Andrew Redd, SpaceX alum (Dragon, Starship)
- 25 employees, 12 ex-SpaceX
- VP Engineering ex-Helion Energy (fusion)
- Geothermal is 0.4% of US energy
- Redd estimates 6 TW potential around Ring of Fire in 5-10 years
- Global energy consumption: ~20 TW
- Resources "a few dozen miles to a few hundred" from shore
- Optimization algorithm: balance cable cost, resource scale, market size
- Plans to avoid sensitive habitats near hydrothermal vents
- "If we have a blowout... you're leaking hot water into the ocean"

### Primary Source 2: ThinkGeoEnergy (Jun 2026)
- Four prototype deployments completed to deep-sea volcanic systems
- Depths up to 3,300 meters
- Hydrothermal temperatures up to 386°C
- 100 kW generator "Adelie" deploying Fall 2026 at Juan de Fuca ridge
- Tonga government agreement signed for territorial waters exploration
- First funded startup deploying subsea geothermal technology

### Primary Source 3: SiliconAngle
- Adelie = first complete system: drilling + generation + energy transfer
- Aims for grid delivery within 2 years
- GW-scale target
- Grand Coulee Dam comparison: 6.8 GW

### Primary Source 4: Crunchbase/Axios
- Earlier seed round $25-30M also led by Founders Fund
- Targeting island nations (electricity costs ~7x US)
- Industrial sites and eventually hyperscale data centers
- Tonga: 80% of electricity from imported diesel
- PM Lord Fakafānua quote on diesel substitution

### Source 5: HVDC Cable Costs (DataIntelo, IET/NCE)
- Shallow water (<200m): $1.2M-$2.8M/km total installed
- Deep water (>500m): $3.5M-$6.0M/km
- Dynamic cable (floating offshore wind): $8M-$12M/km
- Cable manufacturing: 45-55% of total project cost
- HVDC subsea connecting onshore points: £6,170/MWkm
- Offshore HVDC: £12,900/MWkm
- Modern cables installed at >3,000m depth using ROV systems
- Cable backlogs: 12+ years
- 3 European companies (NKT, Prysmian, Nexans) control 75% of HVDC cable market

### Source 6: Geothermal LCOE Data
- Conventional geothermal LCOE: $0.06-0.11/kWh ($60-110/MWh)
- EGS LCOE range: $35-250/MWh (US median >$70/MWh)
- DOE 2035 target: $45/MWh for EGS
- Pre-scale plants (<150 MW): $100-120/MWh (Sage Geosystems CEO)
- Scale target: $65-75/MWh
- Geothermal capacity factor: 85-95%
- US geothermal: 3.7 GW (2022)
- Global: 13.7 GW (2022)
- 70% of geothermal plants in Ring of Fire

### Source 7: Tonga Electricity
- USD $0.35/kWh ($350/MWh) — 13th most expensive in world
- ~80% from diesel
- 30M liters diesel/year
- Diesel now pushing ~$5/liter in outer islands
- 100,300 population, 176 islands

### Source 8: Offshore O&G Drilling Costs
- Deepwater well: $40M-$100M+ per well
- Average: ~$100M for deepwater
- Months to drill

## Original Calculation: The Cable Tax

### Thermodynamic Advantage
Subsea geothermal at spreading centers:
- Hot source: 386°C (659 K)
- Cold sink: 2°C deep seawater (275 K)
- Carnot efficiency: 1 - 275/659 = 58.3%
- Practical turbine: ~40% (60-70% of Carnot)

Conventional land geothermal (200°C resource):
- Hot source: 200°C (473 K)
- Cold sink: 25°C ambient air (298 K)
- Carnot efficiency: 1 - 298/473 = 37.0%
- Practical: ~25%

Subsea advantage: 40/25 = 1.6× more electricity per unit of heat. That's a genuine physics advantage from both hotter source AND colder sink.

### Cable Cost LCOE Penalty (3 Scenarios)

**Assumptions:**
- Plant capacity factor: 90% (geothermal baseline)
- Plant life: 25 years
- No discounting (conservative — real LCOE would be higher)

**Scenario 1: Pacific Island (Tonga-like)**
- Distance: 50 km (volcanic arc, close to shore)
- Water depth: moderate (~500-1,500m)
- Cable cost: $2.5M/km × 50 km = $125M
- Plant capacity: 50 MW
- Annual generation: 50 × 8,760 × 0.9 = 394,200 MWh
- 25-year generation: 9.855M MWh
- Cable LCOE penalty: $125M / 9.855M = **$12.7/MWh**
- Generation LCOE (optimistic, using higher Carnot): $60-80/MWh
- Total subsea LCOE: ~$73-93/MWh
- vs. diesel: $350/MWh
- **Savings: 74-79%**

**Scenario 2: Coastal US (Pacific Northwest)**
- Distance: 200 km (Juan de Fuca ridge to Oregon/Washington coast)
- Water depth: deep (2,000-3,000m)
- Cable cost: $5M/km × 200 km = $1B
- Plant capacity: 200 MW
- Annual generation: 200 × 8,760 × 0.9 = 1,576,800 MWh
- 25-year generation: 39.42M MWh
- Cable LCOE penalty: $1B / 39.42M = **$25.4/MWh**
- Generation LCOE: $60-80/MWh
- Total subsea LCOE: ~$85-105/MWh
- vs. US wholesale: ~$50/MWh
- **70-110% premium over grid**
- vs. data center PPA: $80-120/MWh (they pay premium for baseload)
- **Potentially competitive for data center PPAs**

**Scenario 3: Remote Mid-Ocean**
- Distance: 500 km
- Water depth: deep (>3,000m)
- Cable cost: $6M/km × 500 km = $3B
- Plant capacity: 500 MW
- Annual generation: 500 × 8,760 × 0.9 = 3,942,000 MWh
- 25-year generation: 98.55M MWh
- Cable LCOE penalty: $3B / 98.55M = **$30.4/MWh**
- Generation LCOE: $60-80/MWh
- Total: ~$90-110/MWh
- **Uncompetitive against grid, marginal for data centers**

### The Market Segmentation
This calculation reveals a natural three-tier market:

1. **Tier 1 (Obvious): Pacific Islands** — $12-13/MWh cable tax is trivial when diesel costs $350/MWh. The math is irrefutable. This is where Endurance should and is starting (Tonga).

2. **Tier 2 (Plausible): Coastal Data Centers** — $25/MWh cable tax pushes total LCOE to $85-105/MWh. Not grid-competitive, but data centers pay premiums for 24/7 baseload. Google's 3 GW Fervo deal is at an undisclosed but reportedly ~$80-100/MWh PPA. Subsea geothermal could compete here if generation costs hit the optimistic end.

3. **Tier 3 (Fantasy): Open Ocean Terawatts** — Redd's 6 TW Ring of Fire claim is geologically sound but economically hollow at current cable costs. The cable backlog alone (12+ years, controlled by 3 European firms) would throttle any TW-scale buildout.

### The Missing Variable: Drilling Cost Comparison
What Endurance saves vs. land EGS:
- Land EGS well: $10-20M per well pair (3-7 km deep through rock)
- Subsea: thin crust at spreading centers, magma near surface
- But subsea: need corrosion-resistant everything + ROVs + ship time
- Deepwater O&G well: $40-100M
- Endurance's actual drilling costs: unknown (not disclosed)

## Kill Test
Original calculation: Cable tax LCOE penalty across three scenarios showing subsea geothermal's natural market segmentation. Nobody has run this analysis publicly. The Carnot efficiency comparison (58% vs. 37% theoretical) is also original.

## Notes
- Total Endurance funding: ~$79-84M ($25-30M seed + $54M Series A)
- Company less than 2 years old
- Only 100 kW demo planned (Fall 2026) — that's 0.1 MW vs. claims of "gigawatts"
- The gap from 100 kW to 1 GW is 10,000× — this is a decade-plus journey at minimum
- Juan de Fuca is ~200+ miles from shore — that's the hard Scenario 2, not the easy Scenario 1
