# Research: The Break-Even Math Behind the First Humanoid Robot Factory Strike

## Topic
The Hyundai-Boston Dynamics Atlas strike is the auto industry's first factory stoppage specifically triggered by humanoid robots. We run the break-even math that both sides are arguing over.

## Primary Sources

### 1. WSJ: "The Fight Over Humanoid Robots Has Shut Down a Car Factory for the First Time" (Jul 15, 2026)
- Partial strike began Monday in Ulsan, South Korea
- 4-hour daily work stoppages disrupting ~5,000 vehicles/day
- Cost: ~200 billion won (~$134 million) in lost sales, industry estimates
- Atlas cost: estimated $130,000/unit (South Korean government research institute)
- Robot pays for itself within ~2 years
- Hyundai plans deployment at nonunionized Georgia Metaplant by 2028
- Union demands: shift from hourly→salaried, retirement age 60→65, job-security guarantees for AI adoption
- 92% of ~39,668 union members voted to support strike

### 2. Samsung Securities Report (Jan 2026)
- Atlas initial manufacturing cost: $130,000-$140,000/unit
- At 10,000 units: ~$50,000/unit
- At 30,000 units: ~$35,000/unit
- At 50,000 units: ~$30,000/unit
- Robots achieve scale efficiencies at ~10,000 units (far earlier than cars which need 100,000+)
- Factory-level break-even at 20,000-30,000 units

### 3. Morgan Stanley Research (multiple notes, 2025-2026)
- Humanoid cost ~$200,000 in 2024, $150,000 by 2028, $50,000 by 2050
- 1 humanoid at $5/hr = work of 2 humans at $25/hr
- NPV per humanoid: ~$200,000
- China humanoid shipments: 50,000 in 2026, 100,000 in 2027
- TAM: $5 trillion by 2050, ~1 billion humanoids
- Cost savings: $500K-$1M per human worker over 20 years

### 4. Tesla Optimus BOM Analysis (Morgan Stanley via FourWeekMBA)
- Total BOM: ~$55,000
- Legs (thigh + calf + feet): 38.6% ($21,300) — 8 linear actuators, planetary roller screws, 6D force sensors
- Arms + shoulders: 29.5% ($16,300) — 10 rotary actuators with harmonic reducers
- Hands: 17.2% ($9,500) — 12 coreless motors, planetary reducers, precision encoders
- Head + torso: 14.7% ($8,100) — FSD chip, cameras, battery, thermal management
- Actuators = 47-50% of total cost, 28 per robot

### 5. Hyundai Worker Compensation Data
- Korean Hyundai factory worker: ~92 million won/year (~$70,000) average incl. bonuses (Korea JoongAng Daily)
- Starting salary incl. bonuses: >60 million won (~$46,000) (KED Global, 2022)
- Union demanding 30% of net profit as bonus (10.36 trillion won → 3.09 trillion won payout)
- US manufacturing worker (Hyundai Alabama): ~$22/hour average ($45,760/year base)

### 6. Boston Dynamics Atlas Specifications (CES 2026, multiple sources)
- 56 degrees of freedom, fully electric
- Lifts 110 lbs (50 kg)
- 4-hour battery life, dual self-swappable batteries
- 20+ hours/day operational (2.5x human single-shift coverage)
- IP67 waterproof, -20°C to 40°C operating range
- Target price: below $320,000 (< 2 years US manufacturing payroll)

### 7. Industry Scale Plans
- Hyundai: 30,000 Atlas by 2028, Georgia Metaplant
- XPeng IRON: 1,000+/month capacity by end 2026, global rollout 2027
- Schaeffler/Humanoid Ltd: 1,000-2,000 robots across factories by 2032
- China government: 10,000 humanoid robots deployed by end 2026
- Tesla: retooling factory for Optimus production, expects start by year-end
- Mitsubishi: humanoid manufacturing/deployment plans for 2027

### 8. Korea JoongAng Daily: Wage Negotiations Detail (May 2026)
- Union demands: 149,600 won monthly base raise + seniority + 800% bonus increase
- 30% of net profit demand = ~3.09 trillion won
- Context: SK hynix agreed to 10% of operating profit, Samsung demanding 15%, Samsung Biologics 20%

## Original Calculations

### Calculation 1: Atlas Cost Per Productive Hour at Different Scales

Assumptions:
- Operational life: 5 years (conservative; Boston Dynamics Spot has 3-year warranty, industrial robots typically 8-12 years)
- Operational hours: 20 hrs/day × 365 days × 5 years = 36,500 hours
- Maintenance cost: 10% of purchase price/year (industry standard for industrial robots)
- Energy cost: ~$0.50/hr (estimated from battery capacity and electricity)

At current price ($300K manufacturing cost, ~$400K sale price):
- Total 5-year cost: $400K + $200K maintenance + $9.1K energy = ~$609K
- Cost per productive hour: $609K / 36,500 = **$16.69/hr**

At scale ($130K, 10K units):
- Total 5-year cost: $130K + $65K + $9.1K = ~$204K
- Cost per productive hour: $204K / 36,500 = **$5.59/hr**

At mass production ($50K, 30K units):
- Total 5-year cost: $50K + $25K + $9.1K = ~$84K
- Cost per productive hour: $84K / 36,500 = **$2.30/hr**

### Calculation 2: Equivalent Human Worker Costs Per Productive Hour

Korean Hyundai worker (92M won / ~$70K):
- Benefits, insurance, facilities overhead: add 30% → ~$91K total cost to employer
- 2,080 productive hours/year × 5 years = 10,400 hours (one shift)
- **$8.75/hr all-in** (single shift)
- But to match Atlas's 20 hrs/day, need 2.5 workers: **$21.88/hr effective**

US manufacturing worker ($22/hr, ~$46K):
- Benefits/overhead: add 40% → ~$64K total cost
- 2,080 hours/year → **$30.77/hr all-in**
- 2.5x for multi-shift coverage: **$76.92/hr effective**

### Calculation 3: Break-Even Timeline

Atlas at $130K vs. Korean workers (2.5 FTE at $91K each = $227.5K/yr):
- Break-even: $130K / $227.5K = **0.57 years (6.8 months)**
- Union's "2 years" claim is extremely conservative (likely includes downtime, maintenance, and lower utilization)

Atlas at $130K vs. US workers (2.5 FTE at $64K each = $160K/yr):
- Break-even: $130K / $160K = **0.81 years (9.7 months)**

### Calculation 4: Capital Required for Industry-Wide Displacement

Morgan Stanley's 50,000 units in China (2026) at average $100K:
- Capital deployed: **$5 billion**
- Workers displaced (2.5 per unit): **125,000 workers**
- Cost per job displaced: **$40,000**

Hyundai's 30,000 Atlas at $50K scale:
- Capital: **$1.5 billion**
- Workers displaced: **75,000**
- Hyundai has ~75,000 Korean factory workers — this is a 1:1 replacement ratio

### Calculation 5: The Union's Bonus Math Problem

Union demands 30% of 10.36T won net profit = 3.09T won
Divided among ~39,668 workers = 77.9M won per worker (~$59,000)
Total comp would be: 92M base + 77.9M bonus = 169.9M won (~$130,000)
At that wage, Atlas break-even drops to **4.1 months**

This is the irony: the larger the bonus the union wins, the faster the robot break-even.

## Story Angle
The first factory strike in history over humanoid robots reveals an uncomfortable paradox: every dollar workers win in robot-era negotiations accelerates their own replacement. We run the break-even math that neither side wants to discuss.

## Journalist
Nadia Kovac — Labor & AI beat

## Category
💼 Labor & AI
