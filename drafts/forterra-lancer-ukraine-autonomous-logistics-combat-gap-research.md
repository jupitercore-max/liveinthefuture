# Research: Forterra Lancer Autonomous Logistics in Ukraine — The Combat Reality Gap

## Core Story
Forterra, a US defense tech company ($500M+ VC funded), has deployed 100+ autonomous ATVs ("Lancers") in Ukrainian combat zones since October 2025. This is the largest known deployment of autonomous ground vehicles in combat by any US defense tech company. Nine months in, the hard data reveals a paradox: the vehicles are saving lives and moving supplies at 3x the capacity of Ukrainian-built alternatives — but they're almost entirely teleoperated because the autonomy can't handle combat realities.

## Primary Sources

### TechCrunch (Jul 7, 2026) — Firsthand reporting
- 100+ Forterra Lancers deployed since October 2025
- 2,500+ miles driven across 1,100+ missions
- 777,440 pounds of total cargo carried
- 88 casualty evacuations
- Based on Polaris ATVs with custom sensor/compute stack
- Gas-powered, 750 kg cargo capacity
- Ukrainian UGVs: battery-powered, 250 kg max
- Some vehicles lost in combat (mud, Russian targeting)
- Starlink antenna was critical modification
- $500M+ in VC funding (XYZ Venture Capital, Moore Strategic Partners)
- Soldiers mainly teleoperate in combat zones
- Ukrainian quote: "It's fucking fantastic, and we are dying to get more"
- Ukrainian feedback: "Make it cheaper"
- BAE Systems partnership for autonomous AMPV prototype

### Key Personnel
- Scott Sanders, Forterra CGO (former USMC officer)
- SGM Corey Wilkens, US Army autonomous vehicles/tactics program lead
- Scott Philips, Forterra CIO (visited Ukrainian ops center near front lines)

### Competitors
- Scout AI: $100M raised for military autonomous platforms
- Field AI, Overland AI: trialing UGVs with US military

## BLS/Labor Data
- Transportation, warehousing: 339,000 job openings (Apr 2026, BLS JOLTS)
- Military context: not directly labor shortage but casualty avoidance

## Original Calculations

### 1. Cost per pound delivered in a contested zone
- 777,440 lbs / 1,100 missions = 706.8 lbs per mission average
- If each Lancer costs ~$150K (Polaris RZR base ~$25K + Forterra autonomy kit estimated at $100-125K based on sensor suite, compute, comms)
- 100 vehicles × $150K = $15M hardware investment
- Cost per pound delivered (excluding losses): $15M / 777,440 lbs = $19.30/lb
- With operational costs (fuel, maintenance, Starlink, operator training): probably $25-35/lb
- Compare to helicopter resupply in contested zones: $200-500/lb (DOD logistics estimates)
- Compare to foot patrol resupply: effectively infinite risk-adjusted cost in FPV drone-saturated zones

### 2. Casualty evacuation value
- 88 medevac missions over 9 months
- US DOD uses Value of Statistical Life of ~$7.4M for policy decisions
- Ukrainian soldiers: even conservative estimates put value of trained combat soldier at $500K-1M (training, experience, unit cohesion)
- If even 20% of evacuations saved lives that would otherwise be lost = ~17 lives
- 17 lives × $500K (conservative) = $8.5M in preserved combat capability
- vs. $15M hardware investment → approaches break-even on medevac alone within ~18 months

### 3. Cargo capacity advantage 
- Forterra Lancer: 750 kg (gas-powered)
- Ukrainian UGVs: 250 kg (battery-powered)  
- 3x capacity differential
- Gas vs battery in combat zone: no charging infrastructure, supply lines disrupted
- A single Lancer mission replaces 3 Ukrainian UGV missions or 10+ foot-carry sorties

### 4. The teleoperation paradox (ORIGINAL CONTRIBUTION)
- These are marketed/funded as "autonomous" vehicles
- In actual combat: teleoperated because autonomy can't handle:
  - Enemy contact / reaction to fire
  - Minefields
  - Unexpected obstacles
  - Electronic warfare (Russian jamming)
- The gap between "autonomous in a test facility" and "autonomous under fire" is the single most important finding
- Self-driving cars still struggle with US roads after $100B+ invested
- Expecting ground autonomy in combat (mines, EW, enemy fire, rubble) is orders of magnitude harder
- The Ukrainian soldier: "we need to respond to enemy threats, live, while in front of the enemy, which the autonomy doesn't know how to do yet"
- This mirrors the drone experience: aerial drones are also teleoperated for strike missions
- The "autonomous weapon" policy debate assumes capabilities that don't exist in practice

### 5. Attrition economics
- "Some" vehicles lost in combat (exact number not disclosed)
- Mud and terrain cause vehicles to get stuck → become targets
- Ukrainian feedback: need them cheaper for acceptable attrition rate
- Compare to FPV drones: $500-2,000 per unit, designed to be expended
- Lancers at ~$150K are 75-300x more expensive than an FPV drone
- The economics demand either: much cheaper vehicles, OR much better autonomy to reduce losses
- Current position: too expensive to be attritable, too limited in autonomy to avoid attrition

## Kill Test: Original Contribution
✅ Original calculation: cost-per-pound-delivered in contested zone vs. helicopter and foot resupply
✅ Novel analysis: the teleoperation paradox — $500M+ of "autonomous" vehicle investment that gets manually driven in combat because the autonomy isn't combat-ready
✅ Unique comparison: 3x cargo capacity analysis (Forterra vs Ukrainian UGVs) and its implications for logistics doctrine
✅ Dataset nobody combined: combat mission data (2,500 miles, 1,100 missions, 777K lbs, 88 medevacs) crossed with estimated unit costs to derive cost-per-outcome metrics
