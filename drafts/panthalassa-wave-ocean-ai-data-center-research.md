# Research: Panthalassa Wave-Powered Ocean AI Data Centers

## Core Story
Oregon-based Panthalassa raised $140M Series B led by Peter Thiel to build 85-meter steel floating AI data centers powered by ocean waves. The company has nearly $1B valuation, 120 employees, and plans Ocean-3 pilot deployment in 2026, commercial operations 2027.

## Primary Sources

### Panthalassa ($140M Series B)
- Source: BusinessWire press release (May 4, 2026), GeekWire (Lisa Stiffler, May 4)
- $140M Series B, Peter Thiel led
- $210M total raised
- Nearly $1B valuation
- 120 employees, Portland/Oregon
- Founded 2016 as public benefit corporation
- CEO: Garth Sheldon-Coulson (ex-Bridgewater Associates)
- CIO: Brian Moffat (ex-Spindrift Energy, novel wave energy system)
- Team: SpaceX veterans (caught rockets on drone ships), Disney Imagineers, NASA alumni
- Tech: 85-meter solid steel structures, bob vertically in remote ocean waters
  - Hull shape forces seawater through turbines as waves rock them
  - No engines, no gears, no connection to land-based power grids
  - Hermetically sealed AI servers cooled by surrounding ocean
  - Connected via SpaceX Starlink LEO satellites
  - Deploy vertically after being towed horizontally to location
- Prototypes: Ocean-1, Ocean-2, Wavehopper (sea trials 2021, 2024)
- Ocean-3 pilot series deploying 2026 in northern Pacific
- Commercial systems planned 2027
- CEO quote: "twice-concentrated sunlight" — waves concentrate solar energy transferred to ocean motion, operate 24/7
- Thiel quote: "Extra-terrestrial solutions are no longer science fiction. Panthalassa has opened the ocean frontier."
- Other investors: John Doerr, Marc Benioff (TIME Ventures), Max Levchin (SciFi Ventures), Susquehanna, Hanwha Group, Anthony Pratt, Fortescue Ventures, Super Micro Computer, Dylan Field, Founders Fund, Gigascale Capital, Lowercarbon Capital, Portland Seed Fund

### Starcloud (Space-based competitor)
- Source: GeekWire (March 2026)
- $170M funding, $1.1B valuation
- Redmond, WA
- Space-based data centers using solar energy
- Announced March 2026

### Microsoft Project Natick (precedent)
- Source: DataCenterDynamics, Microsoft Research
- Underwater data center deployed Scotland 2018
- 117 feet deep, 25-month operation
- 8x more reliable than land-based facilities
- But Microsoft abandoned the project
- SpaceX considering orbital data centers faces similar hurdles

### IEA Data Center Energy (context)
- Source: IEA 2026 report, various
- Data center electricity: 1,000 TWh by 2026
- AI data center electricity surged 50% in 2025
- Projected to double by 2030
- 1-3% of global electricity consumption
- By 2030: AI data centers could consume 12% of US electricity

### Wave Energy Economics
- Source: MDPI, PNNL, IRENA
- Wave energy LCOE: $200-735/MWh (highly variable by tech)
- Best case projections: below $0.30/kWh ($300/MWh) with improvements
- Compare: solar+storage $54/MWh (IRENA 2025), grid $50-80/MWh
- Wave energy projected to rival offshore wind by 2030s at ~70 €/MWh ($77/MWh)
- Pacific Northwest wave energy integration study: more reliable than wind, minimal backup needed

### Other Wave Energy Players
- CorPower Ocean (Sweden) — exceeded $100M investment
- Marine Power Systems (UK) — exceeded $100M investment
- Oscilla Power (Seattle)
- C-Power (Oregon State University spinout)

## Kill Test
✅ PASS — AI energy crisis is the #1 bottleneck for the industry. Moving data centers to the ocean is a genuinely novel approach that challenges assumptions about where computing happens.

## 10-Star Test
✅ PASS — "Peter Thiel is building floating AI factories in the Pacific Ocean powered by waves" is a sentence you'd text a friend.

## Novel Contribution
1. **The bandwidth bottleneck calculation**: Starlink delivers ~100-300 Mbps per terminal. A single H100 GPU generates inference results at ~100-500 tokens/sec (~1-5 KB/sec). But a cluster of thousands of GPUs running inference simultaneously needs much more bandwidth. Calculate: how many simultaneous AI inference requests can one Starlink terminal support? (Answer: quite a lot for inference, very few for training data transfer)
2. **The LCOE gap calculation**: Wave power at ~$300/MWh vs solar+storage at $54/MWh = 5.5x premium. But Panthalassa avoids: grid interconnection (5+ year queue average), transmission infrastructure ($1-5M/mile undersea), real estate (GW-scale data centers cost $5-15B on land), cooling (40% of data center energy bill). What's the all-in cost comparison?
3. **The "move compute to energy" inversion**: Every other player builds energy to reach the compute. Panthalassa moves compute to where energy already exists. Same logic as SpaceX building satellite internet vs laying submarine cables.

## Strongest Counterargument
Wave energy has been "5 years away" for 30 years. The LCOE remains 4-10x higher than solar. Starlink bandwidth creates a hard ceiling on workload types. Steel structures in harsh ocean conditions face catastrophic failure modes that silicon doesn't. Microsoft tried underwater data centers and quit. The $1B valuation on $0 revenue is peak vibes investing.

## Limitations
- Panthalassa hasn't disclosed power output per node
- No audited financial data
- Ocean-3 hasn't deployed yet (pilot, not proven)
- Satellite bandwidth caps unknown in practice for this use case
- Seawater corrosion on 85-meter steel structures over decades is unquantified
- No independent verification of "twice-concentrated sunlight" energy claim

## Journalist
Viktor Holm — energy/climate beat (#285, 6 articles back)

## Category
⚡ Energy

## Slug
panthalassa-wave-ocean-ai-data-center
