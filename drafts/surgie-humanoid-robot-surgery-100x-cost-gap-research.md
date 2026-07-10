# Research: A 60-Pound Robot Just Performed Surgery. The Da Vinci Costs 30× More and Weighs 30× as Much.

## Primary Sources

1. **Nature paper (Jul 8, 2026):** Liang, Z., et al. "In vivo feasibility study of humanoid robots in surgery." *Nature*. DOI: 10.1038/s41586-026-10796-x
   - First in vivo preclinical trial of humanoid robots in surgery
   - Two procedures on large nonprimate mammals at UCSD
   - Procedure 1: Cholecystectomy (gallbladder removal) — human-robot team (Surgie + human surgeon assistant)
   - Procedure 2: Second surgery performed by robot-robot team (two Surgie units working together)
   - Lead researchers: Michael Yip (UCSD ECE), Shanglei Liu (UCSD Surgery), Nikita Thareja (surgery resident)
   - "Surgie" robot: based on Unitree G1 platform, 5 feet tall (1.5m), 60 lbs (27 kg)
   - Used standard surgical instruments with custom adapters
   - Precision claimed comparable to specialized robotic surgery systems
   - Multiple recalibrations required, extending procedure time
   - Published in Nature (highest-impact general science journal)

2. **Johns Hopkins/NVIDIA arXiv paper (concurrent):** Cho, Mangulabnan, Zhang et al. "Humanoid Robots as First Assistants in Endoscopic Surgery." arXiv.
   - Unitree G1 provided endoscopic visualization during cadaveric sphenoidectomy
   - Teleoperated by attending otolaryngologist
   - NVIDIA Corporation co-authors (Bethesda)
   - Cadaveric (not in vivo), but validates humanoid form factor for endoscopic assistance

3. **Intuitive Surgical Financials (Q4 2025, 10-K):**
   - 2025 revenue: $10.1B (+21% YoY)
   - 3.15M da Vinci procedures performed in 2025
   - Da Vinci 5 ASP: $1.6M (7% increase from prior gen due to higher price point)
   - System range: $500K–$2.5M depending on model/config
   - Recurring revenue: $8.5B (84% of total) — instruments + service
   - Da Vinci weight: ~1,800 lbs (816 kg)
   - Requires purpose-built ORs, large setup team, proprietary instruments
   - Per-procedure instrument cost: $2,000–$3,500 (proprietary EndoWrist, 10-use limit)
   - ~9,000+ installed systems globally
   - Q1 2026: $2.77B revenue (beat $2.62B estimate)

4. **Unitree Robotics pricing:**
   - G1: ~$16,000 (base price, 1.32m tall, 35 kg, 23 DoF expandable to 43)
   - H1: ~$90,000 (full-size, 5'11", 104 lbs)
   - H2: $29,900 (full-size, 180-182cm, 70 kg, 31 DoF, 360 N·m leg torque)
   - R1: from $4,900 (entry-level)
   - Surgie appears to be a modified G1

5. **WHO/Lancet Commission on Global Surgery:**
   - 5 billion people worldwide lack access to safe surgical care
   - 9 out of 10 people in LMICs without surgical access
   - 320 million additional surgical procedures needed annually
   - 1.27 million new SAO providers (surgeons, anesthesiologists, obstetricians) needed by 2030
   - Only 6.5% of 313M annual surgical cases occur in the poorest third of the world
   - 16.9 million deaths annually from conditions requiring surgical care
   - Target: 20 SAO providers per 100,000 population

6. **AAMC surgeon shortage (US):**
   - Projected shortage of 14,300–23,400 surgical specialists by 2032
   - HHS: shortages in 9/10 surgical specialties by 2025

## Original Calculations

### Cost Ratio
- Da Vinci 5 ASP: $1.6M
- Unitree G1 (Surgie base): $16,000
- **Cost ratio: 100:1**
- For the price of ONE da Vinci 5, you could deploy 100 Surgies
- Even if surgical modifications triple the G1 price to $48K: 33:1 ratio

### Weight Ratio
- Da Vinci: 1,800 lbs (816 kg)
- Surgie: 60 lbs (27 kg)
- **Weight ratio: 30:1**

### Access Math
- Current da Vinci installed base: ~9,000 systems
- Total capital invested (at $1.6M ASP): ~$14.4B
- Same $14.4B invested in Surgies at $16K each: 900,000 units
- Same at $48K (modified for surgery): 300,000 units
- WHO says 1.27M SAO providers needed — even 300K surgical robots wouldn't close the gap, but they'd multiply the reach of existing surgeons via teleoperation

### Per-Procedure Economics
- Da Vinci per-procedure instrument cost: $2,000–$3,500 (proprietary EndoWrist, limited reuse)
- Surgie: uses standard surgical instruments with adapters (commodity pricing)
- ISRG instrument/accessory revenue 2025: ~$6.2B (dominant revenue stream)
- This is the moat: 84% recurring revenue depends on proprietary instruments
- If humanoids commoditize instruments, ISRG's business model is structurally threatened

### OR Time Cost
- Average US OR operating cost: $36–$62 per minute (Dhupar et al., 2021)
- If Surgie adds 2 hours of recalibration time per procedure: $4,320–$7,440 in additional OR costs
- At current stage, this wipes out the hardware cost savings
- BUT: first da Vinci laparoscopic surgery took 6 hours → now 30 minutes
- Learning curve is the strongest historical precedent for improvement

## Strongest Counterargument
The da Vinci has 20+ years of clinical data, millions of procedures, and established FDA clearance pathways. Surgie is a preclinical proof-of-concept on animal models with no regulatory pathway, no human data, and procedures that took significantly longer due to recalibrations. OR time costs $36–$62/minute at major hospitals — if Surgie adds even two extra hours of recalibration time, that's $4,320–$7,440 in additional OR costs per procedure, which could erase the hardware cost advantage entirely. The real barrier isn't the robot; it's the regulatory, training, and safety infrastructure that takes decades to build.

## Limitations
- Preclinical only (large nonprimate mammals, not humans)
- No quantified precision metrics comparing Surgie to da Vinci head-to-head
- Recalibration frequency and procedure duration not published in available summaries
- No FDA regulatory pathway discussed
- Unknown cost of surgical modifications/adapters beyond base G1 price
- Force feedback absent in current humanoid systems
- Latency challenges for remote teleoperation unresolved
- Two procedures is extremely small sample size
