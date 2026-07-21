# Research Notes: MORFIUS X-Rotor HPM Counter-Drone Economics

## Core Story
Lockheed Martin unveiled MORFIUS X-Rotor on July 20, 2026 — the first ground-launched, field-reusable airborne High Power Microwave (HPM) counter-drone system. Claims 50+ drone kills per single flight. No ammunition consumed. Recoverable and reusable in the field. Sensor and C2 agnostic — no fire control radar needed. Announced at Farnborough Airshow 2026.

## Primary Sources

### 1. Lockheed Martin Press Release (July 20, 2026)
- Source: PRNewswire / Lockheed Martin official
- MORFIUS X-Rotor: "one-to-many" airborne HPM counter-drone system
- Neutralizes 50+ enemy drones per single flight
- Designed for field recovery and reuse
- "Significantly low cost per kill"
- Sensor and C2 agnostic — no unique sensor or fire control radar needed
- Tested in Arizona, California, Oklahoma (flight, intercept, lethality)
- Supports DoD's 2025-2028 Rapid Response Counter-UAS Roadmap
- Randy Crites, VP/GM Lockheed Martin Missiles and Fire Control Advanced Programs: "MORFIUS sets a new benchmark for counter-drone capability — delivering a high kill rate while keeping the cost per kill low"

### 2. MORFIUS Technical Background (Internet Archive / Breaking Defense / DefenseScoop)
- Modified Area-I ALTIUS-600 airframe
- Tube-launched, fixed-wing UAS (~6-inch diameter tube, <30 lbs)
- HPM peak power: claimed "more than one million times the average power of a household microwave oven" (~1 GW estimated)
- Flies close to targets, blasts with HPM at close range (power advantage over ground-based systems — inverse square law)
- 15+ test events since 2018
- 2023 Yuma Proving Ground testing against Group 3 one-way attack drones
- Note: "further development required to consistently defeat Group 3 (Shahed-class) at slant ranges of 4 km+"
- Specific range, endurance, HPM power output remain classified

### 3. MBDA Counter Mass Interceptor (same day, July 20, 2026)
- Source: Reuters
- European missile manufacturer MBDA launching CMI at Farnborough
- Purpose: counter mass drone/munition attacks (saturation)
- First interceptor targeting smaller drones, available ~2028
- Second longer-range interceptor planned for drones + rockets + glide bombs + subsonic missiles
- "Today in Europe, there is no sovereign system capable of addressing saturation"
- Led by MBDA's British teams (future iteration: French)

### 4. US First Combat Sea Drone Use (July 13, 2026)
- Source: WSJ
- US military's first combat use of one-way attack sea drones against Iran/Houthi
- Saronic sea drones involved
- Centcom commander Adm. Brad Cooper's AI/drone task force since 2021

## Key Data Points for Cost Analysis

### Kinetic Counter-Drone Costs (per engagement):
- Stinger missile: ~$120,000-$400,000 per shot (one kill)
- APKWS (Advanced Precision Kill Weapon): ~$30,000 per rocket (one kill)
- Patriot PAC-3: ~$4-6 million per missile (one kill, massive overkill for drones)
- Iron Dome Tamir interceptor: ~$50,000-$100,000 per shot (one kill)
- AHEAD/Gepard ammunition: ~$1,000 per burst (mixed results)
- UK Dragonfire laser: ~$13 per shot (but ground-fixed, line-of-sight limited)

### Enemy Drone Costs:
- Shahed-136/Geran-2: ~$20,000-$50,000
- Commercial FPV drone (modified): ~$500-$2,000
- Group 1 small drones: ~$500-$5,000
- Chinese commercial drones (DJI modified): ~$1,000-$3,000

### The Cost Exchange Ratio Problem:
- A $50K interceptor killing a $2K drone = 25:1 cost exchange AGAINST the defender
- The Shahed problem: $50K drone vs $4M Patriot missile = 80:1 cost exchange
- Magazine depth: kinetic systems run out of ammunition; swarms don't stop

### MORFIUS Economics (Original Calculation):
If MORFIUS costs $X per unit and can be reused Y times with 50 kills per flight:
- Let's estimate MORFIUS unit cost at ~$150K-$250K (modified ALTIUS-600 + HPM payload; ALTIUS-600 alone is ~$50K-$100K)
- Assume 20 reuse cycles before refurbishment (conservative for a reusable drone)
- At 50 kills per flight × 20 flights = 1,000 drone kills per MORFIUS unit
- Cost per kill = $200K / 1,000 = $200/kill
- Even at 10 flights × 50 kills = 500 kills: $200K / 500 = $400/kill
- Compare: APKWS = $30,000/kill, Iron Dome = $50,000-100,000/kill
- MORFIUS cost advantage: 75x-250x cheaper per kill than kinetic interceptors

### The "Zero Ammo" Paradigm:
- MORFIUS doesn't fire projectiles — it emits electromagnetic pulses
- No magazine depth problem — as long as it has battery/power, it keeps killing
- Recoverable — lands, recharges, relaunches
- The only consumable is electrical energy (battery or fuel cell)
- This breaks the economics of kinetic counter-drone warfare

## Original Contribution
1. First cost-per-kill comparison between airborne HPM and every major kinetic counter-drone system in active service
2. Calculate the "magazine depth equivalent" — one MORFIUS flight equals X missiles worth of kills
3. Model the swarm break-even point: at what swarm size does HPM become mandatory vs kinetic?
4. The dual-announcement convergence: MORFIUS (US, HPM) + MBDA CMI (Europe, kinetic) on the same day represents a philosophical split

## Counterarguments
- HPM effectiveness against hardened/shielded drones is unproven at scale
- "50+ kills per flight" claim is marketing; Group 3 Shahed-class engagement was NOT consistently successful at Yuma
- Specific HPM range/endurance classified — real engagement envelope unknown
- Doesn't address all threat types (cruise missiles, glide bombs)
- Electronic warfare could potentially counter HPM drones
- Cost estimates are projections, not production-validated

## Limitations
- Exact MORFIUS unit cost not disclosed (our calculation uses range estimates)
- Reuse cycle count not disclosed (we assume conservatively)
- HPM effectiveness vs different drone types/shielding levels not public
- MBDA CMI is paper-only (2028 first availability)
- Real combat validation is zero — all HPM data from controlled tests

## Journalist
Assign to Yuki Tanaka (#8, Defense/Tech beat) or Marcus Chen (#7, Defense/Energy beat)

## Category
🛡️ Defense
