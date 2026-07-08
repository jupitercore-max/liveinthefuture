# Research Notes: Lunar Delivery Cost Per Kilogram

## News Hook
ispace (TSE: 9348) announced July 8, 2026 it will launch a new lower-cost lunar cargo business using SpaceX's Starship. Bought 500 kg of capacity on a Starship moon lander, launching as soon as 2030. Will build a lunar surface vehicle to host payloads from worldwide clients sharing the ride. (Reuters, July 8 2026)

## CLPS Contract Data — Cost Per Kilogram

### Flown Missions

| Mission | Provider | Contract Value | Payload Mass | $/kg (at capacity) | Date | Outcome |
|---------|----------|---------------|-------------|---------------------|------|---------|
| Peregrine M1 | Astrobotic | $79.5M | ~90 kg | $883K/kg | Jan 2024 | FAILED (propellant leak) |
| IM-1 (Odysseus) | Intuitive Machines | $118M | 130 kg capacity, ~92 kg NASA | $908K/kg (capacity) / $1.28M/kg (NASA) | Feb 2024 | Landed sideways, 7 days ops |
| IM-2 (Athena) | Intuitive Machines | Est. ~$70M (PRIME-1 TO) | ~130 kg capacity | ~$538K/kg | Feb 2025 | Tipped over, ~1 hour data |
| Blue Ghost M1 | Firefly Aerospace | $93.3M | 150 kg capacity, 94 kg NASA | $622K/kg (capacity) / $992K/kg (NASA) | Mar 2025 | FULL SUCCESS |

### Upcoming/Awarded Contracts

| Mission | Provider | Contract Value | Payload Mass | $/kg | Target Date |
|---------|----------|---------------|-------------|------|-------------|
| IM-3 | Intuitive Machines | $77.5M | ~92 kg | $843K/kg | 2026 |
| IM-5 (latest) | Intuitive Machines | $180.4M | 75 kg | $2.41M/kg | 2030 |
| Blue Ghost M2 | Firefly Aerospace | $176.7M | ~150 kg (est.) | $1.18M/kg | TBD |
| Mission 3 | ispace | $55M | 95 kg | $579K/kg | Delayed to 2030 |
| Griffin-1 (VIPER) | Astrobotic | Large (VIPER cost ~$433M total program) | ~300 kg rover | TBD | TBD |

### Key Observation: CLPS Costs Are RISING
- 2019-2021 contracts: $622K–$908K/kg
- 2026 contracts: $1.18M–$2.41M/kg
- Latest IM contract ($180.4M for 75 kg) is 3.9x more expensive per kg than the original Firefly contract

## Failure-Adjusted Analysis

Total CLPS money spent on flown missions: ~$360.8M
Payload successfully operated on surface:
- Conservative (Blue Ghost only): 94 kg → $3.84M/kg
- Liberal (BG + IM-1 partial): ~186 kg → $1.94M/kg

## Starship Economics

### SpaceX Starship Launch Cost
- Voyager Technologies SEC 10-K filing: $90M for a dedicated Starship launch
- Capacity to LEO: 100-150 metric tons
- LEO $/kg: $600-900/kg
- SpaceX target (fully reusable): $100-200/kg to LEO

### Starship Lunar Surface Capacity
- NASA HLS contract: Starship can deliver 100 metric tons (100,000 kg) to lunar surface
- Source: Aarti Matthews (SpaceX HLS PM) at ASCENDxTexas — "Starship can land 100 tons on the lunar surface"
- NASA minimum HLS requirement: 865 kg (2 crew + equipment)
- NASA Cargo HLS variant spec: 12-15 metric tons

### Theoretical $/kg to Lunar Surface
- At $90M per Starship launch / 100,000 kg capacity = $900/kg (marginal cost, ignores development amortization)
- At NASA HLS contract ($2.89B) / 100,000 kg = $28,900/kg (development-loaded)
- Even at $28,900/kg, that's 97% cheaper than CLPS average

## ispace Starship Rideshare Model

### What We Know
- 500 kg capacity purchased on Starship
- Will build lunar surface vehicle to host client payloads
- Target: 2030 landing
- Price NOT disclosed

### Break-Even Calculation
If ispace charges CLPS-comparable rates (~$800K/kg) for its 500 kg:
- Revenue potential: $400M
- Would need to cover: Starship capacity cost + surface vehicle development + operations
- Even at 50% discount to CLPS ($400K/kg): $200M revenue potential for 500 kg

If Starship capacity is priced pro-rata ($90M × 500/100,000 = $450K):
- ispace could theoretically buy for $450K and sell 500 kg at $100K/kg = $50M
- Margin of ~$49.55M to cover vehicle dev + ops + profit
- But lunar landing is more expensive than LEO, so Starship lunar price would be higher

### Business Model Shift
CLPS model: NASA pays a company to build a lander, integrate payloads, launch, land, operate.
ispace Starship model: Buy wholesale Starship capacity, build a surface vehicle (NOT a lander), sell retail rideshare slots.
Key difference: ispace is NOT building a rocket or a lander. They're building a cargo platform that rides on someone else's spacecraft. This is lunar FREIGHT BROKERAGE.

## Counterarguments / Limitations
1. ispace is 0-for-2 on lunar landings (both Mission 1 and Mission 2 failed)
2. Starship has never landed on the Moon
3. 2030 timeline is aspirational
4. The 500 kg is a tiny fraction of Starship's 100,000 kg capacity — filling the rest is an open question
5. CLPS contracts include mission ops, data return, surface science support — not just kg delivery
6. ispace's NASA mission (Mission 3) was already delayed from 2026 to 2030
7. Contract price may not reflect the full economic cost (SpaceX may be pricing Starship below cost to build market share)

## Historical Comparison
- Apollo: ~$25.4B total program (1973 dollars) = ~$182B in 2026 dollars. ~382 kg of lunar samples returned. But measuring $/kg for Apollo is misleading — it was a crew mission, not cargo delivery.
- Better comparison: cost to DELIVER cargo to the surface
  - Apollo LM could carry ~300 kg of experiments to surface
  - Per mission cost: ~$30B/6 landings = $5B per landing (2026 dollars)
  - $/kg: ~$16.7M/kg

## Sources
1. Reuters, "With SpaceX Starship, Japan's ispace provides ride-share to the moon," July 8, 2026
2. NASA CLPS Press Kit and individual mission announcements
3. Slashdot/NYT: SpaceX first commercial Starship lunar contract (Astrolab, 2023)
4. NASA.gov: IM-1 $118M contract
5. NASA.gov: Firefly $93.3M contract
6. NASA.gov: IM-3 $77.5M contract
7. NASA.gov: IM-5 $180.4M contract (March 2026)
8. NASA.gov: Firefly latest $176.7M contract
9. Space.com: ispace $55M NASA contract
10. Voyager Technologies 10-K: $90M Starship launch cost
11. SpaceX HLS: Aarti Matthews quote on 100 metric tons to lunar surface
12. NASA: Cargo HLS variants 12-15 metric tons spec
13. Aerospace America: CLPS program analysis (4 missions, 1 full success)
14. ispace delays: Reuters March 2026 (NASA mission delayed to 2030)
