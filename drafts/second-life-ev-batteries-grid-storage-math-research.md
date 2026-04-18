# Research: Second-Life EV Batteries — The Grid Storage Math Nobody Ran

## Thesis
Redwood Materials has gone from zero to GWh-scale pipeline in 9 months by turning used EV batteries into grid storage for AI data centers and factories. The math on available second-life packs vs. projected grid storage needs suggests a parallel battery market is forming that could satisfy a significant chunk of US storage demand — without manufacturing a single new cell.

## Kill Test: PASS
- Everyone who owns an EV asks "what happens to the battery?"
- Data center power crisis is top-of-mind
- Concrete dollar figures and company names
- Directly relevant to energy policy and investment decisions

## 10-Star Test: PASS
- The calculation (retired EV packs available vs grid storage needed) is genuinely surprising
- Named companies with real deployments, not vaporware
- Tesla co-founder building a competing storage market to Tesla Megapack — narrative tension

## Novel Contribution
Running the actual math on US EV battery retirement volumes vs. projected grid storage needs. How many GWh of second-life capacity are coming online by 2028-2030? At what cost discount to new cells? Nobody has published this specific supply-demand calculation.

## Primary Sources

### Source 1: Electrek (April 14, 2026)
- Rivian + Redwood Materials partnership announced
- 100+ used Rivian battery packs → 10 MWh system at Normal, IL factory
- First repurposed battery storage at a US automaker's factory
- Redwood Pack Manager software: handles mixed chemistries and states of health as single dispatchable asset
- RJ Scaringe quote: "EVs represent a massive, distributed and highly competitive energy resource"
- URL: https://electrek.co/2026/04/14/rivian-redwood-materials-energy-storage-partnership-illinois/

### Source 2: TechCrunch (Feb 19, 2026)
- Redwood Energy launched June 2025, now fastest-growing unit
- SF R&D lab: 55,000 sq ft, ~100 people, expanded 4x
- Total workforce: 1,200
- $425M Series E (Jan 2026), investors include Google and Nvidia
- Crusoe deployment: 12 MW / 63 MWh from 792 second-life EV packs, powering AI data center in Nevada
- Pipeline includes "hundreds of MWh" and "multiple GWh" projects
- Hyperscaler customers in pipeline
- Data center grid connection wait times: 5+ years
- JB Straubel's argument: grid can't wait for new cells; hundreds of GWh already sitting in cars
- URL: https://techcrunch.com/2026/02/19/an-ai-data-center-boom-is-fueling-redwoods-energy-storage-business/

### Source 3: POWER Magazine (Jan 2026)
- EV batteries retain up to 80% capacity at end of vehicle life
- Can last 10+ years in stationary storage (less demanding than EV use)
- 100+ million EV batteries will be retired in the next decade globally
- US energy storage market: $21.9B in 2024, projected $70.7B within decade (DMR)
- Global market: $58.9B (2024) → $204.8B by 2033
- Grid storage: 36% of market share
- Europe: 135 GWh installed capacity target by ~2029
- URL: https://www.powermag.com/second-life-ev-batteries-the-future-of-grid-scale-energy-storage-systems/

### Source 4: Gartner (Dec 4, 2025)
- 116 million EVs will be on the road globally in 2026
- URL: https://www.gartner.com/en/newsroom/press-releases/2025-12-04-gartner-forecasts-116-million-electric-vehicles-will-be-on-the-road-in-2026

### Source 5: Data Center Knowledge (April 2026)
- BSI Group / Waterwise report: 1 MW data center = 25 million liters water/year
- Global data center market: $527B, projected to nearly double by 2030
- Data centers among world's top 10 most water-intensive industries
- URL: https://www.datacenterknowledge.com/infrastructure/data-center-growth-draining-global-water-supplies

### Source 6: Electrek — Redwood/GM MOU (July 2025)
- GM signed MOU with Redwood for second-life battery repurposing
- URL: https://electrek.co/2025/07/16/redwood-gm-ev-batteries-energy-storage/

### Source 7: Redwood $350M raise (Oct 2025)
- URL: https://electrek.co/2025/10/23/jb-straubel-redwood-350m-us-made-battery-storage/

### Source 8: ACEEE Policy Brief (July 2025)
- Key finding: battery repurposers need better access to battery data from OEMs
- URL: https://www.aceee.org/policy-brief/2025/07/repurposing-ev-batteries-second-life-stationary-storage-market-landscape-and

## Novel Calculations (to run in article)

### Calculation 1: Available second-life GWh
- US cumulative EV sales through 2025: ~5.5M (estimated from Edmunds/EIA data)
- Average pack size: ~75 kWh
- EV lifespan before battery retirement: ~8-12 years (warranty period)
- First big wave of retirements: 2027-2032 (from 2015-2022 sales)
- Early retirements (warranty returns, engineering mules, totaled EVs): ~2-5% of fleet/year
- Conservative estimate by 2030: 2-3M packs available for second life in US
- At 75 kWh × 80% retained × 2.5M packs = 150 GWh available
- Generous estimate: up to 300+ GWh

### Calculation 2: Grid storage demand vs supply
- US grid storage needs by 2030: 200-600+ GWh (various estimates)
- If 150 GWh of second-life capacity is available, that's 25-75% of projected need
- At $50-80/kWh for second-life vs $100-150/kWh for new LFP cells (system level) = 30-50% cost savings

### Calculation 3: Redwood's scaling trajectory
- June 2025: 0 MWh deployed
- June 2025: 63 MWh (Crusoe)
- April 2026: 73 MWh (Crusoe + Rivian)
- Pipeline: "multiple GWh"
- If they deploy 1 GWh by end of 2026, that's 14x growth in 6 months
- At current $425M in funding, that's ~$425/kWh at GWh scale — needs to come down dramatically

## Strongest Counterargument
New LFP cell prices have crashed to $50-60/kWh at cell level. Second-life packs require testing, grading, integration with pack management software, and carry warranty risk (degradation curves are uncertain). The cost advantage may be slim or negative once integration costs are factored in. Tesla Megapack, BYD MC Cube, and CATL EnerOne all offer turnkey new-cell solutions at falling prices. Why would a utility or data center operator take the risk on batteries with unknown remaining life when new ones are nearly as cheap?

## Limitations
- Redwood doesn't disclose per-kWh pricing for second-life systems
- No public data on failure rates or degradation curves for repurposed packs at scale
- "Multiple GWh" pipeline is self-reported with no independent verification
- US EV retirement volume estimates are projections; actual timing depends on market conditions
- Grid storage "need" varies wildly by estimate (200 GWh to 1,000+ GWh)

## Journalist: Alex Harmon
- Energy beat, 7 articles total (least used energy writer)
- Last used: article #133 (7 articles ago)

## Category: ⚡ Energy
