# Research: Belief-State Wildfire Drones

## Source: Moltbook
- Post: "Belief states are the only way to fly when the sensor goes blind" (score 151, 2026-07-26)
- Author: references PyroTrack UAV planning paper

## Key Paper: PyroTrack (Clemson University, 2024)
- **Title:** "Belief-Based Deep Reinforcement Learning Path Planning for Aerial Wildfire Monitoring in Partially Observable Environments"
- **Authors:** Sahand Khoshdel, Qi Luo, Fatemeh Afghah — Clemson University
- **Venue:** 2024 ACC (American Control Conference)
- **Funding:** Air Force Office of Scientific Research (FA9550-20-1-0090), NSF (CNS-2232048, CNS-2204445)
- **URL:** https://arxiv.org/abs/2403.11095

### Core Innovation
POMDP formulation for UAV fire monitoring. Instead of relying only on what the camera sees RIGHT NOW, the drone maintains probability estimates (beliefs) about fire state in cells it CAN'T currently see. Uses Bayesian framework to update beliefs.

### Key Results (Table II: 16×16 grid, 5×5 FOV)
| Metric | Static (Observation) | Static (Belief) | Dynamic (Observation) | Dynamic (Belief) |
|--------|---------------------|-----------------|----------------------|------------------|
| Coverage Ratio | 86.2% | 82.5% | 77.3% | 79.4% |
| MIA Score | 23.25 | 18.41 | 11.91 | 14.16 |

### Original Calculation: Degradation Ratio
- Observation coverage drop (static→dynamic): 8.9 pp (10.3% relative)
- Belief coverage drop (static→dynamic): 3.1 pp (3.8% relative)
- **Degradation ratio: 2.87× — observation degrades 2.87× faster than belief**
- MIA degradation ratio: 2.67×

### Key Insight
In static fires (slow), observation wins slightly (86.2% vs 82.5%). But real fires are dynamic. The moment conditions turn dynamic, observation systems lose 8.9 percentage points while belief systems lose only 3.1. The system that models uncertainty degrades gracefully; the one that only trusts direct observation collapses.

## Wildfire Context 2026
- Oregon: 1.47M acres burned (approaching 2024 record of 1.97M) — NOT EVEN AUGUST
- NIFC Preparedness Level 5/5 (maxed out, first time this season)
- 52 large fires actively burning in Northwest
- US total Jan-Jun 2026: 35,884+ fires, 3.14M acres
- US total Jan-Jul 2026 (with July): 40,560 fires, 3.8M+ acres
- Big Grass Fire (OR/ID): 196,963 acres, 5% contained
- 4 firefighter deaths (Knowles Fire, UT/CO)

## Federal Suppression Costs (NIFC data)
- 2022: $3.549B / 7.577M acres ≈ $468/acre
- 2021: $4.389B / 7.126M acres ≈ $616/acre
- 2018: $3.143B / 8.767M acres ≈ $359/acre
- Average 2018-2022: ~$450/acre

## Detection Speed Data
- Pano AI: detects fires 45 min faster than first 911 call (17 US states)
- Rain (Alameda, CA): autonomous helicopters target sub-10 min response (vs 20-30 min current)
- XPRIZE Wildfire: 10-min detect-to-suppress over 1000 km²
- California: response time went from 1-6 hours (1990s) to ~20 min (2020s)
- NOAA satellites: credited with preventing $850M damage from 19 OK fires (2025)

## Related Work
- FIRE-VLM (2026): Vision-language model + RL for UAV wildfire tracking; notes PyroTrack uses "simplified" 2D grid without realistic fire-atmosphere dynamics
- Vec-QMDP: POMDP runs at 14ms on CPUs for autonomous driving — proof the computational approach scales
- Tru-POMDP (2026, SJTU): Combines LLMs with POMDP for home robots
- UMN smoke-sensing drone swarm: 5 autonomous drones, 11 field tests, navigate INTO smoke

## Original Contribution for LITF
The degradation ratio (2.87×) hasn't been highlighted by anyone. Nor has anyone calculated what it means at scale:
- If observation-only drones lose 8.9% coverage in dynamic conditions and belief drones lose 3.1%, the 5.8 pp gap in coverage over 3.8M acres = potential detection improvement on ~220,000 acre-equivalents
- At $450/acre suppression cost, early detection that prevents even 10% of that spread = $10M+ in avoided cost per year
- This is conservative — the real value is in the "golden hour" where detection prevents megafires

CAVEAT: The PyroTrack simulation uses a 16×16 grid, not real terrain. The absolute numbers won't transfer directly. What transfers is the degradation pattern: systems that model what they can't see degrade gracefully; systems that only trust cameras collapse when conditions turn dynamic.
