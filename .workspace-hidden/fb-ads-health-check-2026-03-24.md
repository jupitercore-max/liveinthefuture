# Facebook Ads Health Check — March 24, 2026

**Data Period:** March 17–24, 2026 (7-day) + Feb 22–Mar 24 (30-day trend)
**Accounts:** 5 ad accounts under RL Hardware / Wearables
**Previous Check:** March 17, 2026

---

## Executive Summary

1. **Blended ROAS improved from 1.62x → 1.91x** — but mostly because the worst accounts stopped spending, not because performance improved
2. **Vayner account effectively shut down** — went from $94K/wk to $0/wk. The 30-day shows $1.94M spent at 0.31x ROAS. That's **$1.34M burned** in a month.
3. **TestSandbox is STILL the best campaign at 3.48x ROAS** — but only getting $42K/wk (3.6% of total spend). Last week it was 3.67x. Slight regression but still dominant.
4. **UAE Test account cratered from 3.67x → 0.20x** — the Test account flipped from best to worst. $12.7K spent, $2.5K returned. The UAE campaign is burning cash.
5. **Funnel is now 100% BOF** — zero TOF, zero MOF spend. Worse than last week's 6.4%/21.4%/72.1% split. You're running entirely on bottom-of-funnel conversion. This is unsustainable — you're depleting your retargeting pools without refilling them.

---

## Account Overview (7-Day)

| Account | Spend | Purchases | Revenue | ROAS | CPP | Status |
|---------|-------|-----------|---------|------|-----|--------|
| **RBM Global** (main) | $1,170,550 | 5,221 | $2,254,439 | **1.93x** | $224 | ✅ Profitable |
| **DGEN RBM US** | $0 | 0 | $0 | — | — | ⚫ Inactive |
| **DGEN RBM UK** | $0 | 0 | $0 | — | — | ⚫ Inactive |
| **Vayner US** | $0 | 1* | $284* | — | — | ⚫ Shut down |
| **RBM Global Test** | $12,744 | 10 | $2,487 | **0.20x** | $1,274 | 🔴 Bleeding |
| **BLENDED** | **$1,183,294** | **5,232** | **$2,257,211** | **1.91x** | **$226** | |

*Vayner: 1 residual attribution from prior spend, no new spend this week

---

## Week-over-Week Comparison

| Metric | March 17 | March 24 | Change | Verdict |
|--------|----------|----------|--------|---------|
| Blended ROAS | 1.62x | 1.91x | **+18%** | ⬆️ But driven by shutting off losers, not improving winners |
| RBM Global ROAS | ~1.84x | 1.93x | **+5%** | ⬆️ Genuine improvement |
| Weekly Spend (all) | ~$1.56M* | $1.18M | **-24%** | ⬇️ Spend contraction |
| Vayner Spend | $94K/wk | $0 | **-100%** | ✅ Stopped the bleeding |
| Test Account ROAS | 3.67x | 0.20x | **-95%** | 🔴 Catastrophic reversal |
| TOF % of spend | 6.4% | 0% | **-100%** | 🔴 Critical — no funnel filling |
| MOF % of spend | 21.4% | 0% | **-100%** | 🔴 No consideration spend |
| BOF % of spend | 72.1% | 100% | +39% | 🔴 Entirely bottom-heavy |

*Estimated from prior week's multi-account totals

### What Actually Changed
- **Good:** Vayner stopped burning $94K/wk at 0.17% CTR. DGEN US/UK also quiet. RBM Global core improved modestly.
- **Bad:** Test account went from star performer to dumpster fire (UAE campaign). Funnel went from imbalanced to non-existent at TOF/MOF.
- **Structural risk:** Running 100% BOF means you're retargeting people who already know the product. When you exhaust that pool, performance cliff-edges. This is a 4-8 week ticking clock.

---

## Funnel Analysis

| Stage | Spend | % of Total | Target | Gap |
|-------|-------|------------|--------|-----|
| **TOF** (Awareness) | $0 | 0% | 15-25% | 🔴 -$178K to -$296K understaffed |
| **MOF** (Consideration) | $0 | 0% | 20-30% | 🔴 -$237K to -$355K understaffed |
| **BOF** (Conversion) | $1,183,294 | 100% | 40-55% | 🔴 +$532K to -$651K overstaffed |

**Note:** All campaigns are classified as OUTCOME_SALES objective. Some may function as pseudo-TOF (broad prospecting ASC campaigns) vs true BOF (retargeting custom audiences). The US Evergreen ASC ($280K) and INTL Prospecting ($158K) are functionally prospecting, not retargeting — but they're still optimized for purchase, not awareness.

**Corrected functional funnel estimate:**
- Broad Prospecting (pseudo-TOF): ~$500K (42%) — ASC campaigns with broad targeting
- Retargeting (BOF): ~$220K (19%) — RTG custom audience campaigns
- Tests: ~$463K (39%) — various A/B test campaigns
- True TOF/MOF (awareness/traffic): $0 (0%)

Even with this correction, there is **zero dedicated awareness or consideration spend.** Every dollar optimizes for purchase. This works until it doesn't — and the cliff comes fast.

---

## Geographic Performance (7-Day, RBM Global)

### Profitable Markets (ROAS > 1.5x)

| Country | Spend | Purchases | Revenue | ROAS | CPP | Verdict |
|---------|-------|-----------|---------|------|-----|---------|
| 🇮🇪 Ireland | $3,947 | 27 | $10,444 | **2.65x** | $146 | 🟢 Hidden gem |
| 🇦🇹 Austria | $5,104 | 24 | $12,764 | **2.50x** | $213 | 🟢 Scale candidate |
| 🇺🇸 US | $789,807 | 4,053 | $1,709,251 | **2.16x** | $195 | 🟢 Core market |
| 🇬🇧 UK | $71,925 | 313 | $153,523 | **2.13x** | $230 | 🟢 Strong |
| 🇫🇷 France | $20,179 | 69 | $33,346 | **1.65x** | $292 | 🟢 Solid |
| 🇧🇷 Brazil | $4,232 | 19 | $6,993 | **1.65x** | $223 | 🟢 Small but efficient |
| 🇫🇮 Finland | $3,177 | 14 | $5,205 | **1.64x** | $227 | 🟢 Solid |
| 🇳🇴 Norway | $4,301 | 15 | $6,973 | **1.62x** | $287 | 🟢 OK |
| 🇮🇹 Italy | $33,330 | 99 | $51,488 | **1.54x** | $337 | 🟡 Marginal at this CPP |

### Marginal Markets (ROAS 1.0x-1.5x)

| Country | Spend | Purchases | Revenue | ROAS | CPP | Verdict |
|---------|-------|-----------|---------|------|-----|---------|
| 🇩🇪 Germany | $38,539 | 108 | $55,367 | **1.44x** | $357 | 🟡 Barely profitable |
| 🇦🇺 Australia | $16,261 | 53 | $22,290 | **1.37x** | $307 | 🟡 On the edge |
| 🇲🇽 Mexico | $54,021 | 139 | $64,338 | **1.19x** | $389 | 🟡 Losing after COGS |
| 🇨🇦 Canada | $34,561 | 109 | $38,202 | **1.11x** | $318 | 🟡 Barely breaking even |
| 🇪🇸 Spain | $34,705 | 75 | $37,892 | **1.09x** | $463 | 🟡 Unprofitable after COGS |
| 🇳🇱 Netherlands | $20,445 | 48 | $22,200 | **1.09x** | $426 | 🟡 Unprofitable after COGS |

### Unprofitable Markets (ROAS < 1.0x)

| Country | Spend | Purchases | Revenue | ROAS | CPP | $ Lost | Verdict |
|---------|-------|-----------|---------|------|-----|--------|---------|
| 🇮🇳 India | $10,159 | 20 | $8,768 | **0.86x** | $508 | -$1,391 | 🔴 Kill |
| 🇨🇭 Switzerland | $9,343 | 14 | $7,468 | **0.80x** | $667 | -$1,875 | 🔴 Kill |
| 🇩🇰 Denmark | $6,546 | 11 | $3,193 | **0.49x** | $595 | -$3,353 | 🔴 Kill immediately |
| 🇸🇪 Sweden | $9,969 | 7 | $3,285 | **0.33x** | $1,424 | -$6,684 | 🔴 Kill immediately |

**Total weekly loss from unprofitable markets: -$13,303**

---

## Top 10 Campaigns by Efficiency (ROAS, minimum $5K spend)

| Rank | Campaign | Spend | ROAS | CPP | Purchases |
|------|----------|-------|------|-----|-----------|
| 1 | **US TestSandbox** | $42,397 | **3.48x** | $117 | 361 |
| 2 | **US StandardInfluencer** | $9,482 | **3.36x** | $146 | 65 |
| 3 | **US Evergreen ASC** (main) | $279,869 | **2.43x** | $171 | 1,640 |
| 4 | **US Retargeting** | $160,988 | **2.35x** | $182 | 886 |
| 5 | **US MaxDelivery Test** | $69,947 | **2.31x** | $198 | 354 |
| 6 | **US tCPA Test** | $62,953 | **2.17x** | $208 | 302 |
| 7 | **US PersonalizationLP Test** | $10,330 | **1.82x** | $265 | 39 |
| 8 | **INTL Retargeting** | $58,947 | **1.75x** | $268 | 220 |
| 9 | **FR Influencer** | $20,189 | **1.65x** | $293 | 69 |
| 10 | **INTL Influencer** | $5,376 | **1.60x** | $207 | 26 |

**Pattern:** TestSandbox and Influencer campaigns consistently outperform. US core is solid. Retargeting works but is ceiling-limited by pool size.

---

## Bottom 10 Campaigns (Worst Performers, minimum $2K spend)

| Rank | Campaign | Spend | ROAS | CPP | $ Lost | Action |
|------|----------|-------|------|-----|--------|--------|
| 1 | **AU Purchase Test** | $3,068 | **0.17x** | $3,068 | -$2,560 | 🔴 KILL |
| 2 | **UAE Test** (Test acct) | $12,744 | **0.20x** | $1,274 | -$10,257 | 🔴 KILL |
| 3 | **SE (Sweden via INTL)** | $9,969 | **0.33x** | $1,424 | -$6,684 | 🔴 KILL |
| 4 | **CA Purchase Test** | $2,935 | **0.38x** | $587 | -$1,820 | 🔴 KILL |
| 5 | **DK (Denmark via INTL)** | $6,546 | **0.49x** | $595 | -$3,353 | 🔴 KILL |
| 6 | **IN Supernova** | $5,114 | **0.55x** | $731 | -$2,286 | 🔴 KILL |
| 7 | **US AltCapture SloMo** | $13,858 | **0.60x** | $693 | -$5,506 | 🔴 KILL |
| 8 | **US MMAI Creative** | $13,972 | **0.62x** | $582 | -$5,326 | 🔴 KILL |
| 9 | **US LiveTranslation Creative** | $14,024 | **0.65x** | $668 | -$4,874 | 🔴 KILL |
| 10 | **US AltCapture 3kCapture** | $13,793 | **0.76x** | $600 | -$3,384 | 🟡 PAUSE |

**Total weekly waste from bottom 10: ~$45,850**

---

## Creative Analysis: AltCapture Test Breakdown

The AltCapture test is running 5 creative variants head-to-head. Clear winner and losers:

| Creative Variant | Spend | Purchases | ROAS | CPP | Verdict |
|------------------|-------|-----------|------|-----|---------|
| **Hyperlapse** | $13,868 | 78 | **1.36x** | $178 | ✅ WINNER — scale this |
| **LiveTranslation** | $13,846 | 38 | **1.38x** | $364 | 🟡 Good ROAS but high CPP |
| **3kCapture** | $13,793 | 23 | **0.76x** | $600 | 🔴 Below breakeven |
| **Stabilization** | $13,889 | 33 | **0.89x** | $421 | 🔴 Below breakeven |
| **SloMo** | $13,858 | 20 | **0.60x** | $693 | 🔴 Worst performer |

**Insight:** Hyperlapse is the clear creative winner — 78 purchases vs 20 for SloMo at same spend. This aligns with the computational photography research: people want *results* (cool time-lapse content), not *features* (stabilization, slow-mo as abstract capabilities). The winning angle is "look what you can create" not "look what specs we have."

### Features Creative Test (Separate Campaign)

| Creative | Spend | ROAS | Verdict |
|----------|-------|------|---------|
| LookAndPlay | $14,079 | 1.03x | Borderline |
| 3kCapture | $14,003 | 1.07x | Borderline |
| LiveTranslation | $14,024 | 0.65x | Kill |
| MMAI | $13,972 | 0.62x | Kill |

**Combined pattern:** "Meta AI" as a creative angle is underperforming (0.62x). Capture/camera features sell better than AI features. Hyperlapse > LiveTranslation > 3kCapture > Stabilization > SloMo > MMAI.

---

## 30-Day Trend

| Account | 30-Day Spend | 30-Day ROAS | 7-Day ROAS | Trend |
|---------|-------------|-------------|------------|-------|
| RBM Global | $5,957,738 | 1.96x | 1.93x | ➡️ Stable |
| Vayner US | $1,944,553 | **0.31x** | — (shut off) | ✅ Finally stopped |
| Test | $72,956 | 0.22x | 0.20x | ⬇️ Getting worse |

**Vayner 30-day reality check:** $1.94M spent, $606K returned. **Net loss: $1.34M in one month.** This account should have been killed 3 weeks ago.

**RBM Global is stable:** 1.96x over 30 days, 1.93x over 7 days. No degradation, but no improvement either. The ~$168K/day run rate is consistent.

---

## Specific Recommendations

### Immediate Actions (This Week)

**1. Kill UAE Test Campaign — Save $12.7K/week**
- Campaign: `Wearables_UAE_Snow_DCAP_SCL_PSPT_Test_Sales_CONVE_ActivationLLV2_Facebook_ASC_1V7C1EV_NODRMR_RayBanMeta`
- Current: 0.20x ROAS, $1,274 CPP
- Action: Pause immediately
- Impact: Saves $12.7K/week, eliminates $10.3K weekly loss

**2. Kill AltCapture SloMo, MMAI Creative, and 3kCapture ad sets — Save $41.6K/week**
- SloMo: 0.60x ROAS → losing $5.5K/week
- MMAI: 0.62x ROAS → losing $5.3K/week  
- 3kCapture: 0.76x ROAS → losing $3.4K/week
- Stabilization: 0.89x ROAS → losing $1.5K/week
- Action: Pause all four. Reallocate budget to Hyperlapse ad set (1.36x ROAS)
- Impact: Saves ~$41.6K/week in underperforming creative spend

**3. Kill or cap unprofitable geos — Save $13.3K/week**
- Sweden: 0.33x → -$6.7K/week. Kill.
- Denmark: 0.49x → -$3.4K/week. Kill.
- Switzerland: 0.80x → -$1.9K/week. Kill.
- India: 0.86x → -$1.4K/week. Kill (unless strategic market entry).
- Action: Add geo exclusions to INTL campaigns for SE, DK, CH, IN
- Impact: Saves $13.3K/week

**4. Scale TestSandbox from $42K → $100K/week**
- Current: 3.48x ROAS at $42K — your most efficient dollar
- Even at 30% efficiency loss from scaling, a 2.4x ROAS at $100K is better than a 0.60x ROAS at $14K
- Action: Increase daily budget by 20% every 3 days (avoid learning phase reset)
- Impact: If ROAS holds at 2.5x+, generates additional $87K+ weekly revenue

**5. Scale StandardInfluencer from $9.5K → $25K/week**
- Current: 3.36x ROAS, highest CTR (2.36%)
- This is your most engaging creative — people are actually clicking
- Action: Duplicate winning ad sets, expand lookalike audiences
- Impact: At 2.5x ROAS, generates additional $38K+ weekly revenue

### Strategic Actions (Next 2-4 Weeks)

**6. Launch dedicated TOF campaign — Budget $50-75K/week**
- You have ZERO awareness spend. This is a ticking time bomb.
- Your retargeting pool is finite. Without new top-of-funnel traffic, BOF campaigns will degrade over 4-8 weeks as audiences fatigue.
- Recommendation: Launch awareness/reach campaign using Hyperlapse creative (proven performer)
- Target: Broad US audiences, 18-45, interests in tech/photography/outdoor
- KPI: CPM under $8, Video View Rate >25%, audience size growth
- Don't optimize for purchase — optimize for reach and video views
- Impact: Refills retargeting pools, prevents the 4-8 week performance cliff

**7. Test Vayner-style TOF with proper creative**
- Vayner's TOF failed at 0.17% CTR — but the problem was creative, not strategy
- Take your winning Hyperlapse creative and run it as an awareness campaign
- Expected CTR for good awareness creative: 0.8-1.2%
- If Vayner's creative was getting 0.17%, the content was the problem, not the funnel position

**8. Investigate Mexico inefficiency**
- MX is getting $54K/week at 1.19x ROAS with $389 CPP
- That's your 3rd-highest international spend but one of the worst CPPs
- Either optimize creative for MX market or reduce budget to $20K and watch ROAS
- Potential savings: $20-25K/week reallocation

**9. Double down on Ireland and Austria**
- IE: 2.65x ROAS at only $3.9K — barely any spend
- AT: 2.50x ROAS at only $5.1K — barely any spend
- These are your most efficient international markets
- Scale both to $15-20K/week
- Impact: At 2.0x ROAS (conservative), adds $30-40K weekly revenue

**10. A/B test Hyperlapse creative in international markets**
- Hyperlapse is winning in US. Test it in UK, FR, IT, DE, IE, AT
- If it performs internationally like it does domestically, it could lift INTL from 1.47x to 2.0x+
- Impact on INTL $158K spend: additional $80K+ weekly revenue

---

## Summary of Projected Impact

| Action | Weekly Savings/Revenue | Confidence |
|--------|----------------------|------------|
| Kill UAE Test | +$10.3K saved | High |
| Kill underperforming creatives | +$15.7K saved | High |
| Kill unprofitable geos | +$13.3K saved | High |
| Scale TestSandbox | +$87K revenue | Medium |
| Scale Influencer | +$38K revenue | Medium |
| Launch TOF | Prevents future cliff | Critical |
| Scale IE/AT | +$30-40K revenue | Medium |

**Total potential weekly improvement: $194K-204K** (mix of cost savings and new revenue)

**Net effect on ROAS:** If you save $39.3K in waste and generate $125K+ in new efficient revenue, blended ROAS could move from 1.91x → 2.1-2.3x.

---

## Risk Flags

⚠️ **No TOF = Ticking Clock.** You are running 100% conversion campaigns. Retargeting pools deplete. The typical timeline for performance degradation without TOF refill is 4-8 weeks. You are already several weeks into this cycle.

⚠️ **Vayner burned $1.34M in 30 days.** Who approved this spend at 0.31x ROAS? The account should have been paused after week 1 when ROAS was clearly below 0.5x.

⚠️ **Test account flipped.** The TestSandbox was your star at 3.67x. This week the *Test account overall* is 0.20x because the UAE campaign dragged it down. The TestSandbox campaign within RBM Global main account is still 3.48x. Make sure budget doesn't bleed from TestSandbox to UAE.

⚠️ **Canada is a false positive.** 1.11x ROAS looks "almost profitable" but after COGS, shipping, returns, and payment processing, anything below 1.5x is losing money. Same for Spain (1.09x) and Netherlands (1.09x). These should be capped or cut.

---

*Data pulled from Facebook Marketing API v21.0 on March 24, 2026. All figures in USD.*
