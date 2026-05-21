# Research: China Space Solar Power Beam — 100m Demo vs. Orbital Reality

## Core Story
China's Xidian University "Zhuri" (Chasing the Sun) project, led by Duan Baoyan of the Chinese Academy of Engineering, demonstrated wireless power transmission of 1,180 watts over 100+ meters using microwave beaming, with 20.8% DC-to-DC efficiency and 88% beam collection efficiency. They also powered a drone at 143 watts while flying at 30 kph from 30 meters away. The system demonstrated "one-to-many" transmission.

## Key Sources
- TechRepublic (May 2026): "China Reports Major Breakthrough in Space Solar Power Technology"
- Xinhua (state news): Reported the drone test details
- Global Times: Described orbital "wireless charging station" concept
- SpaceNews: "China aims for space-based solar power test in LEO in 2028, GEO in 2030" — CAST plans 10 kW LEO test in 2028, 1 MW GEO in 2030
- IEEE Spectrum (skeptic analysis): Former ESA head of power systems says space solar is "almost certainly no" — cited $276B NASA cost, 12-80× cost of ground renewables
- Science.org: NASA's 2050 study — $276B for 2GW station, 71% of cost is launch
- ESA Solaris program: €60M study to determine feasibility
- Xidian University EurekAlert (2022): OMEGA 2.0 achieved 2,081W at 5.8 GHz, 87.3% beam efficiency, 15.05% DC-DC efficiency (on prior 55m test)

## Timeline
- 2014: Zhuri project proposed OMEGA design
- 2022: First full-chain ground verification platform built (55m, 2kW)
- 2026: Latest "Distributed OMEGA" — 1,180W over 100m, 20.8% efficiency, drone test
- 2028 planned: LEO test (10 kW, 400 km distance)
- 2030 planned: GEO megawatt-scale in-orbit demo (35,800 km)
- 2050 planned: Gigawatt-scale space solar power station

## Physics of Beam Spreading (ORIGINAL ANALYSIS)
Using Friis transmission equation for microwave power beaming:
- At 5.8 GHz, wavelength λ = 0.0517 m
- Beam diffraction angle θ ≈ λ/D where D is transmitter aperture
- The 75m tower test: likely using antenna arrays of order ~10m diameter

For GEO (35,800 km = 35,800,000 m):
- Beam footprint scales linearly with distance for a given antenna
- At 100m with 88% collection, the beam is tightly focused
- At 35,800 km, even with a 750m transmitter (Thales Alenia Space estimate), the receiver field would be 6-10 km wide

The core gap:
- Distance ratio: 35,800,000 m / 100 m = 358,000×
- Even LEO at 400 km: 400,000 m / 100 m = 4,000×
- Power density drops as 1/r² — so at 4,000× distance, you need 16,000,000× the power density compensation (larger antennas)

## Cost Reality Check
- NASA 2024 report: $276 billion for first 2GW station, LCOE 12-80× ground renewables
- With rosier assumptions ($500/kg launch, electric tugs): competitive with ground solar
- Current SpaceX launch cost: ~$2,700/kg (Falcon 9). Starship target: $200-$1,000/kg
- ESA Frazer-Nash study: 10 of 13 crucial subsystems rated "high" or "very high" technical difficulty
- Ground solar LCOE: $20-40/MWh in sunny locations (2025)
- Space solar LCOE at optimistic: $87/MWh (UK govt study, by 2040)

## Efficiency Chain (end-to-end)
1. Solar cells → DC: ~30% (space-grade multi-junction)
2. DC → microwave: ~80% (state of the art)
3. Microwave transmission through atmosphere: ~90%
4. Beam collection (rectenna): ~88% (Zhuri claim) — but this is at 100m
5. Rectenna → DC: ~85%
6. DC → grid AC: ~95%

End-to-end: 0.30 × 0.80 × 0.90 × 0.88 × 0.85 × 0.95 ≈ 15.4% (optimistic)
IEEE Spectrum cites ~11% in actual field trials

So to deliver 1 GW to the grid, you need ~9 GW of collection capacity in space.

## Strongest Counterargument
China doesn't need to compete with US/EU ground solar. China's motivation may be:
1. Military: Powering forward bases, satellites, drones without fuel logistics
2. Space infrastructure: Powering lunar bases, deep space missions
3. Arctic/polar regions where ground solar is limited
4. Baseload availability (99% vs 25% capacity factor for ground solar)
The 4× capacity factor advantage means a 2GW space station replaces an 8GW ground solar installation's annual output.

## Comparison to Other Programs
| Program | Country | Stage | Key Achievement |
|---------|---------|-------|-----------------|
| Zhuri/OMEGA | China | Ground demo | 1,180W @ 100m, 20.8% eff |
| CAST | China | Planning | 10kW LEO test 2028 |
| Caltech SSPD | USA | LEO test | Transmitted microwaves from orbit (tiny) |
| NRL | USA | Ground/LEO | 1 kW+ between ground antennas |
| Solaris/ESA | EU | Study phase | €60M feasibility study |
| JAXA | Japan | Planning | Microwave WPT research |
| Space Solar | UK | Planning | CASSIOPeiA design, seeking $800M |

## What This Story Achieves for LITF
- Timely: Fresh breakthrough just reported
- Data-heavy: Lots of numbers to analyze
- Original contribution: Physics gap calculation between 100m demo and orbital reality
- Honest about timelines: 24+ years to gigawatt scale
- Actionable: Implications for energy investors, space startups, defense
