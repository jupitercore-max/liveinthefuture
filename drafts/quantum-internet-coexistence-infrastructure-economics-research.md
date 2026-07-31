# Research Notes: Quantum Internet Over Live Telecom Fiber — Infrastructure Economics

## Story Summary
Northwestern University demonstrated the first real-world entanglement distribution between remote nodes over deployed fiber carrying live commercial internet traffic. The breakthrough isn't distance — it's coexistence. Every previous quantum network demonstration used either dark fiber (no other traffic) or lab-based setups. This one shared the cable with 36 Tbit/s of classical data capacity and preserved 94%+ entanglement fidelity over 24.4 km.

The original analysis: nobody has run the infrastructure cost comparison between building a dedicated quantum fiber network vs. sharing existing telecom fiber. That number determines whether quantum networks reach 100 cities or 3.

## Primary Sources

### 1. The Optica Quantum Paper
- **Title:** Entanglement distribution over deployed fiber coexisting with high-capacity telecommunications traffic
- **Journal:** Optica Quantum, Vol. 4, Issue 4, pp. 342+ (July 22, 2026)
- **DOI:** 10.1364/opticaq.592786
- **Authors:** Gina Talcott et al. (senior author: Prem Kumar, Northwestern)
- **Funding:** U.S. Department of Energy via Fermilab

### 2. Key Experimental Parameters
- **Distance:** 24.4 km of DEPLOYED fiber (Evanston campus → StarLight facility, downtown Chicago)
- **Fiber sharing:** Two 800 Gbit/s classical channels + additional optical power = ~36 Tbit/s capacity
- **Entanglement fidelity:** >94% (Bell state fidelity)
- **Band separation:** Quantum signals in O-band (~1310 nm); classical traffic in C-band (~1550 nm)
- **Synchronization:** White Rabbit optical timing system (picosecond precision)
- **Photon source:** Entangled photon pairs generated at Evanston; one photon kept locally, partner sent to Chicago

### 3. Historical Context — Every Previous Demonstration
| Year | Team | Distance | Fiber Type | Live Traffic? |
|------|------|----------|------------|---------------|
| 2015 | Delft (Hensen et al.) | 1.3 km | Dedicated dark fiber | No |
| 2019 | Innsbruck (Lanyon) | 50 km | Dedicated dark fiber | No |
| 2020 | USTC (Pan Jian-Wei) | ~50 km | Lab-coiled fiber | No |
| 2024 | Northwestern (Kumar) | 30 km | Lab-spooled with commercial-level traffic | Lab only |
| 2024-2025 | Multiple (Nature papers) | Several km | Urban fiber | Varied |
| 2025 | Chinese team (Du et al.) | 155 km | Metropolitan deployed fiber | Not with live commercial traffic |
| **2026** | **Northwestern (Kumar/Talcott)** | **24.4 km** | **Deployed metro fiber** | **YES — first** |

The 155 km Chinese experiment used deployed fiber but distributed entanglement without sharing the fiber with live commercial traffic. Kumar's breakthrough is the coexistence.

### 4. Infrastructure Cost Data (2025-2026)
Sources: Fiber Broadband Association 2025 Report, DGTL Infra, CTC Technology & Energy

**New fiber construction:**
- Underground (median): $18/ft = $95,040/mile (Fiber Broadband Association 2025)
- Aerial: $8/ft = $42,240/mile
- Metro underground range: $60,000-$80,000/mile (DGTL Infra)
- Labor: >60% of total construction costs
- Permitting/construction timeline: 2-5 years for metro routes
- 2026 costs rising: 88% of operators expect further increases (telecoms.com)

**Dark fiber leasing (alternative to building):**
- Large urban routes (Palo Alto example): $177-$295/month per strand-pair
- Annual cost: $2,124-$3,540/year per strand-pair (CTC Technology)
- Equipment per site: $50K-$70K for optical termination

### 5. Original Calculation: Infrastructure Cost Avoidance

**Scenario: 10-city U.S. metropolitan quantum network**
Assume: 50 km average metro quantum route per city, 10 nodes per city

**Option A — Dedicated fiber (historical approach):**
- Fiber construction: 500 km ÷ 1.6 = 312 miles × $80,000/mile = $25 million
- Optical equipment: 100 nodes × $60K = $6 million
- Permitting/ROW: ~15% of construction = $3.75 million
- Timeline: 2-5 years
- **Total: ~$35 million + multi-year delay**

**Option B — Shared fiber (Northwestern approach):**
- Fiber construction: $0 (use existing telecom fiber)
- Quantum-specific equipment per node: entangled photon source + O-band filters + SNSPD detectors + White Rabbit timing ≈ $150K per node (SNSPD alone ~$50K-$100K)
- 100 nodes × $150K = $15 million
- ISP fiber lease (dark fiber pairs): 312 miles × ~$3,000/mile/year ≈ $1 million/year
- Timeline: months (equipment procurement only)
- **Total: ~$16 million + $1M/year, deployable in 12-18 months**

**Cost avoidance: ~$19 million (54%) per 10-city network, plus 2-4 years faster deployment**

The shared-fiber approach makes quantum networking economically viable for mid-sized metro areas (not just research corridors with DOE-funded fiber).

### 6. Fidelity Analysis
- Achieved: 94%+ Bell state fidelity
- BB84 QKD threshold: requires quantum bit error rate (QBER) < 11%, which corresponds to fidelity > ~89%
- Bell inequality violation: requires fidelity > 70.7% (1/√2)
- **94% is comfortably above all operational thresholds for both QKD and entanglement-based protocols**
- Compare: The 155 km Chinese silicon chip demo achieved 97.9% fidelity but on dedicated fiber. Getting 94% while sharing with 36 Tbit/s of classical traffic is the harder problem.

### 7. Technical Innovation — O-Band Separation
- Classical telecom: C-band (~1530-1565 nm) — dense wavelength division multiplexing lives here
- Quantum signals: O-band (~1260-1360 nm) — naturally lower Raman scattering noise
- Key insight: Raman scattering from high-power C-band classical signals generates noise photons. By placing quantum signals in the O-band (shorter wavelength), the noise floor drops dramatically because spontaneous Raman scattering predominantly generates longer-wavelength photons.
- Additional: Spectral filtering to suppress residual noise leaking from C-band to O-band

### 8. What's Next
- Kumar's next goal: full quantum teleportation over metro fiber with live traffic
- Entanglement distribution (demonstrated here) is step 1; teleportation requires a second step of information transfer
- Potential applications: quantum key distribution, distributed quantum computing, quantum sensor networks

### 9. Limitations (for article's limitations section)
- 24.4 km is metro-scale, not intercity. Longer distances need quantum repeaters, which don't exist commercially yet.
- SNSPD detectors require cryogenic cooling (~2 Kelvin), adding cost and complexity
- 94% fidelity is above threshold but leaves less margin for additional impairments at longer distances
- O-band has higher fiber attenuation than C-band (~0.35 dB/km vs. ~0.2 dB/km), limiting scalable distance
- Entanglement rates not specified in press release — may be low for practical QKD throughput
- Not yet demonstrated with quantum teleportation (the full protocol), only entanglement distribution

### 10. Strongest Counterargument
The strongest case against this being transformative: dedicated dark fiber is already ubiquitous in major metros, and quantum network providers (like Toshiba, ID Quantique, QuintessenceLabs) already sell QKD over dark fiber today. The companies that will build quantum networks are telcos who already own the fiber. For them, the marginal cost of adding a quantum channel to existing lit fiber isn't $80K/mile (new construction) — it's the opportunity cost of one wavelength on an existing cable, which could be close to zero on under-utilized routes or significant on congested ones.

The counter to the counter: dark fiber availability is extremely uneven. Mid-size cities, university towns, and developing-world metros have limited dark fiber. The shared-fiber approach democratizes access.

## Kill Test
**Does this contain an original calculation or novel analysis?**
YES — the per-city cost avoidance calculation ($35M dedicated vs. $16M shared for a 10-city metro quantum network) is original. No previous coverage of this paper has quantified the infrastructure economics. Previous coverage (Northwestern press release, phys.org) simply says "no need for new infrastructure" without numbers.

## Category
💻 Quantum

## Journalist
Dr. Kenji Watanabe — Physics & Quantum Computing

## Slug
quantum-internet-shared-fiber-infrastructure-economics
