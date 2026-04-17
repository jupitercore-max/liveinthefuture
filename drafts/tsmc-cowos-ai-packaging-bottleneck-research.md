# Research: TSMC CoWoS Packaging Bottleneck

## Thesis
The binding constraint on global AI chip supply isn't transistor manufacturing — it's advanced packaging. TSMC's CoWoS (Chip on Wafer on Substrate) technology is growing at 80% CAGR, yet demand still outstrips supply. Nvidia has locked up >50% of capacity through 2027, forcing competitors to scramble. Intel's EMIB is emerging as the US-based alternative, with potential billions in revenue. Meanwhile, chips manufactured at TSMC Arizona must still be shipped to Taiwan for packaging — undermining the entire reshoring thesis.

## Kill Test: PASS
- This affects every company building or buying AI hardware
- $630B+ in AI infrastructure capex hinges on packaging throughput
- Determines who can ship GPUs and who can't — not chip design, but packaging allocation
- Geopolitical dimension: US CHIPS Act invested $52B but didn't address packaging gap

## 10-Star Test: 8-9/10
- Readers learn WHY there are GPU shortages despite record TSMC production
- Original calculation of supply gap
- Actionable for investors, enterprise buyers, and policymakers
- Contrarian: packaging, not transistors, is the real bottleneck

## Novel Contribution
1. **Supply gap calculation**: Estimate annual CoWoS module output vs. known customer demand
2. **Allocation breakdown**: Who gets what share of CoWoS capacity
3. **The reshoring paradox**: TSMC Arizona makes wafers but ships them to Taiwan for packaging — defeating the CHIPS Act's supply chain security goal
4. **Rubin Ultra design constraint**: Nvidia's next-gen flagship constrained to dual-die (not quad-die) specifically because of packaging yield limits

## Primary Sources (5)

### Source 1: TSMC (via CNBC interview)
- CoWoS growing at 80% CAGR
- Target: 130K wafers/month by late 2026
- 2025 capacity: ~60K wafers/month (Digitimes, confirmed by TrendForce)
- Nvidia has reserved >50% of projected CoWoS capacity for 2026-2027

### Source 2: TrendForce (April 2026)
- AI claims 36% of TSMC's 3nm capacity in 2026, up from 5% in 2025
- Rubin Ultra sticking to dual-die architecture due to packaging constraints
- A 4-die configuration would expand package to 7.5-8x reticle limit, destroying yield
- Google TPU v7/v8 and AWS Trainium v3 competing for same 3nm + packaging capacity

### Source 3: Intel (CEO Dave Zinsner / earnings call)
- EMIB packaging deals reaching "billions per year" in revenue
- NVIDIA considering Intel EMIB for Feynman chips
- Apple, MediaTek, Qualcomm may adopt for custom chips
- Intel AP capacity currently unconstrained — major selling point
- Key advantage: only US-based advanced packaging facility

### Source 4: Wccftech / DigiTimes (March 2026)
- TSMC Arizona chips must be shipped to Taiwan for packaging
- Intel's EMIB bridges US domestic packaging gap
- Intel working with IC substrate suppliers in Japan/Taiwan to scale capacity
- EMIB-T for cost-efficiency, ASICs, mobile SoCs

### Source 5: ASE Technology (via earnings guidance)
- World's largest OSAT (outsourced semiconductor assembly and test)
- TSMC outsourcing some packaging to ASE
- ASE expects advanced packaging sales to double in 2026

## Capacity Math (Original Analysis)

### CoWoS wafer output 2026:
- Jan-Mar: ~70K wafers/month (gradual ramp from 60K)
- Apr-Jun: ~85K wafers/month
- Jul-Sep: ~105K wafers/month
- Oct-Dec: ~130K wafers/month
- **2026 total: ~1.14M CoWoS wafer starts**

### Modules per wafer (by product):
- CoWoS-S (H200, B300 single-die): ~4-5 modules per 300mm interposer wafer
- CoWoS-L (Blackwell GB200 dual-die): ~2-3 modules per wafer
- Weighted average (assuming 60% CoWoS-L, 40% CoWoS-S): ~3.2 modules/wafer

### 2026 estimated module output:
- 1.14M wafers × 3.2 modules/wafer = **~3.65M AI chip modules**

### Known demand (2026 estimates):
- Nvidia: ~3M+ GPU modules (Blackwell + H200 + data center)
- AMD (MI300X/MI400): ~400K-600K modules
- Google TPU v7/v8: ~300K-500K
- AWS Trainium v3: ~200K-400K  
- Microsoft Maia: ~100K-200K
- Others (startups, inference chips): ~200K
- **Total estimated demand: ~4.5M-5.0M modules**

### Supply Gap:
- **~3.65M supply vs ~4.5-5.0M demand = 20-27% packaging deficit**
- This is AFTER 80% CAGR growth

## Strongest Counterargument
TSMC has consistently outperformed its own capacity guidance. The 130K/month target could be reached earlier than expected. ASE and other OSATs provide overflow capacity. And Intel's EMIB could absorb meaningful volume by H2 2026. The packaging bottleneck may be a 2026 problem that resolves by 2027.

Rebuttal: Even if TSMC hits 130K early, demand is also accelerating. The 36% AI share of 3nm capacity in 2026 (up from 5%) shows demand curves steepening faster than supply curves. And EMIB handles different product segments (ASICs, mobile) — it doesn't directly substitute for CoWoS-L on flagship GPU modules.

## Limitations
- Exact CoWoS allocation by customer is confidential; >50% Nvidia figure comes from industry reports, not TSMC disclosure
- Module-per-wafer estimates vary by package size and generation
- Intel EMIB revenue projections come from CEO guidance, not confirmed orders
- ASE overflow capacity quality/yield data not publicly available

## Category: 💻 Quantum → Actually better as 🤖 Robotics? No.
Best fit: **💻 Quantum** (semiconductor infrastructure) or general tech infra. Actually, no existing category perfectly fits. Use **⚡ Energy** tag? No. I'll use no existing emoji perfectly — the chip/semiconductor category isn't listed. Closest: 🤖 for the manufacturing angle, or just use a custom. Let me check...

Actually, this fits under the broader tech infrastructure umbrella. The categories listed in STORY_GUIDE.md don't have a semiconductor-specific one, but I can use 💻 (which covers "Quantum computing, photonics") — the semiconductor infra story is adjacent enough.

## Journalist: Tomás Reyes
Beat: AI infrastructure economics. Previous: "Big Tech Is Spending $630 Billion on AI Infrastructure," "AI Inference Costs Are Dropping 10x Per Year," "California Spends $325 Billion a Year."
