# Research: Counter-Drone Cost Inversion — HPM Weapons Are About to Break the Math

## Core Thesis
The U.S. Navy spent $500M+ in missiles shooting down cheap drones over the Red Sea. Three systems now in testing or unveiled in July 2026 can reduce cost-per-kill from $3 million to under $1. The crossover point where defense costs less than the drone has arrived.

## Primary Sources

### 1. Red Sea Expenditure (Military.com / Vice Adm. McLane, Jan 2025)
- 220 missiles fired over 380 engagements
- 120 SM-2 (~$2M each): $240M
- 80 SM-6 (~$4M each): $320M  
- 20 ESSM/SM-3 (~$2M-$28M): $40M-$280M
- 160 five-inch shells
- NSA Sullivan: using interceptors against drones is "just a terrible equation for us, obviously"
- Source: https://military.com/daily-news/2025/01/15/navys-fight-red-sea-used-220-missiles-officials-say-thats-changing.html

### 2. Lockheed MORFIUS X-Rotor (PR Newswire, Jul 20, 2026)
- Airborne HPM counter-drone system
- 50+ drone kills per single flight
- Field reusable — recovery and redeploy
- Weighs <30 lbs, fits 6-inch launch tube
- ~1 GW microwave burst (million times standard microwave oven)
- Ground-launched, fixed-wing drone that flies into swarm
- Has been flying since 2017 (earlier variants)
- "Only ground-launched, field reusable airborne HPM system"
- No dependence on fire control radars, sensor/C2 agnostic
- Tested in Arizona, California, Oklahoma
- Source: https://www.prnewswire.com/news-releases/lockheed-martin-unveils-morfius-x-rotor-the-new-dronekiller-set-to-power-americas-fight-against-swarms-302829200.html

### 3. Lockheed PAC-3 ACE (Reuters, Jul 20, 2026)
- New cheaper Patriot interceptor
- Less than half the cost of PAC-3 MSE (~$4M), so <$2M
- Targets aircraft, cruise missiles, short-range ballistic missiles
- NOT designed for drones (explicitly stated)
- Initial production 2028
- Throttled back rocket motors and seekers
- Source: https://www.reuters.com/business/aerospace-defense/lockheed-make-cheaper-patriot-interceptors-air-defense-demand-soars-2026-07-20/

### 4. Epirus Leonidas HPM (Multiple sources 2024-2026)
- Ground-based solid-state HPM system
- Claims <$0.01 per kill (cost of electricity)
- $66M Army contract
- 4 IFPC-HPM prototypes delivered May 2024
- Bound for CENTCOM operational deployment
- ExDECS version for Marines (delivered late 2024)
- Autonomous Ground Vehicle (March 2026): Ford F-600 + Kodiak AI self-driving
- Jan 2026: defeated fiber-optic FPV drones (unjammable by traditional EW)
- LRAM modular architecture — scalable
- Limitation: ground-based, limited range, can't fly into swarm
- Source: Epirus Inc., Army Recognition, Globe Newswire

### 5. Pentagon Drone Dominance Program
- $1.1B initiative
- 25 companies selected (Phase I)
- Delivering 340,000 drones through Jan 2028
- Phase 1 Gauntlet won by Skyfall (Ukrainian) + Skycutter (British) joint
- Ukraine agreed Jul 22 to export ~600 drones (6 companies × 100) for program
- Phase II qualifier estimated June 2026
- Source: Reuters Jul 22, Globe Newswire Feb/May 2026

### 6. Ukraine Interceptor Drone Data
- P1-SUN: 5,500 Shaheds killed since Nov 2025, ~$2K/unit, 50K/month capacity
- Bullet interceptor: 1,000+ kills since Nov, ~$2K/unit
- New jet-powered versions for 400-500 kph Shaheds
- Source: Reuters Jul 21

### 7. BAE Brontanax / CCA Programs
- BAE Brontanax: £25M, 80% of Typhoon capability at ~20% unit cost
- 5 per manned fighter jet
- Flight by 2027
- Anduril + GA: CCA production contracts, 150+ by end of decade
- Source: The Times Jul 23, Reuters Jul 22

### 8. Cost-Per-Kill Reference Data
- SM-6: ~$4.7M (CRS)
- SM-3 IIA: ~$28M (CRS)
- SM-2: ~$2.1M (CRS)
- Patriot PAC-3: ~$3.7M (Wikipedia/Army budget)
- Aster 15: ~$1.1M (French Navy estimates)
- Stinger: ~$480K ($624M for 1,300)
- APKWS: ~$30K (Hydra + laser kit)
- Coyote: ~$10K-$100K
- Source: Congressional Research Service, Army budget documents

## ORIGINAL CALCULATION: The Red Sea Cost-Per-Kill Table

### What the Navy actually spent per drone kill:
Weighted missile cost: (120 × $2M) + (80 × $4M) + (20 × $5M*) = $660M
(*SM-3 weighted average, conservative)
Across 380 engagements: **$1.74M per engagement average**

But many engagements were against ballistic missiles or cruise missiles where these interceptors make sense. The waste is specific to the ~200+ cheap one-way attack drone engagements.

### The cost-per-kill spectrum (2026):

| System | Cost Per Kill | Reusable? | Kill Rate | Category |
|--------|-------------|-----------|-----------|----------|
| SM-3 IIA | $28M | No | 1:1 | Ship missile |
| SM-6 | $4.7M | No | 1:1 | Ship missile |
| Patriot PAC-3 MSE | $4M | No | 1:1 | Ground missile |
| PAC-3 ACE (2028) | <$2M | No | 1:1 | Ground missile |
| SM-2 | $2.1M | No | 1:1 | Ship missile |
| Aster 15 | $1.1M | No | 1:1 | Ship missile |
| Stinger | $480K | No | 1:1 | Shoulder/MADIS |
| APKWS | ~$30K | No | 1:1 | Rocket |
| Coyote | ~$10-100K | No | 1:1 | Interceptor drone |
| Ukraine P1-SUN | ~$2K | No | 1:1 | Interceptor drone |
| MORFIUS X-Rotor | ~$X/50+ kills | Yes | 1:50+ | Airborne HPM |
| Epirus Leonidas | <$0.01 | Yes | unlimited | Ground HPM |
| Laser (HELIOS) | ~$1-10 | Yes | 1:1 per shot | Directed energy |

### The MORFIUS math (novel):
If a MORFIUS unit costs $200K (estimate based on complexity):
- First flight: $200K / 50 kills = $4,000/kill
- After 10 flights: $200K / 500 kills = $400/kill
- After 100 flights: $200K / 5,000 kills = $40/kill
(Plus negligible electricity/fuel cost per flight)

vs. SM-6: $4,700,000 per kill

That's a cost reduction of **1,175x on first flight** to **117,500x after 100 flights**.

### If MORFIUS existed during Red Sea:
- ~200 drone engagements at minimum
- 200 / 50 kills per flight = 4 MORFIUS flights
- 4 × $200K (generous) = $800K total
- vs. ~$400M+ actually spent on missiles for drone engagements
- **500x cheaper**

But: MORFIUS is airborne with limited range/endurance. Can't replace ship-based systems for all scenarios. That's a real limitation.

## Strongest Counterargument
HPM systems are promising but unproven at operational scale:
1. MORFIUS X-Rotor has never been tested against actual hostile drone swarms in combat
2. HPM effectiveness degrades with drone hardening (Faraday shielding)
3. Operational range/endurance limits aren't publicly known
4. Power generation and cooling in field conditions remain engineering challenges
5. Adversaries can harden electronics against microwave effects
6. The "50+ kills per flight" claim comes from manufacturer testing, not independent evaluation

## Limitations
- Exact MORFIUS unit cost is not public; calculations use estimates
- Red Sea missile expenditure breakdown doesn't specify which engagements targeted drones vs. ballistic missiles
- Epirus "<$0.01 per kill" is the company's own claim, not independently verified
- HPM weapons may not work against all drone types (shielded, hardened, etc.)
- None of these HPM systems have been used in actual combat

## Actionable Insights
- Defense procurement officers: HPM systems should be priority investment for base defense and C-UAS
- Defense industry: the $1.1B Drone Dominance program signals massive shift to mass production
- Allied militaries: Ukraine's interceptor drone model (~$2K/kill at scale) is the most battle-proven cheap option today
- Taxpayers: the Red Sea campaign demonstrated the fiscal unsustainability of missile-only C-UAS
