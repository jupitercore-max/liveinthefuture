# Research: Samsung Galaxy Glasses BOM Clone + AI Subsidy War

## Article #562 | Journalist: Marcus Chen | Category: 🤖 Wearables

## Core Thesis
Samsung's Galaxy Glasses and Meta's Ray-Ban Gen 2 are the most hardware-identical competitors in consumer electronics history — same chip, same camera resolution, same battery capacity (within 1 mAh), near-identical weight. The hardware is commoditized. The entire battle is which AI model whispers in your ear, and the real economic war is the per-user AI inference subsidy.

## Original Calculations

### 1. BOM Parity Table
| Component | Samsung Galaxy Glasses | Ray-Ban Meta Gen 2 | Delta |
|-----------|----------------------|---------------------|-------|
| Processor | Snapdragon AR1 | Snapdragon AR1 Gen 1 | Same family |
| Camera | 12MP Sony IMX681 | 12MP (unspecified) | Same resolution |
| Battery | 155 mAh | 154 mAh | 1 mAh |
| Weight | ~50g | 48-51g | <2g |
| Connectivity | BT 5.3, WiFi | BT 5.2, WiFi | Minor |
| Audio | Directional speakers | Open-ear speakers | Functionally identical |
| Platform | Android XR / Gemini | Horizon OS / Meta AI | ONLY real difference |
| iPhone support | Yes (confirmed I/O 2026) | Yes | Both cross-platform |
| Price | $379-499 | $379-460 (Gen 2) | Overlapping |

### 2. EssilorLuxottica Per-Pair Margin Decomposition (ORIGINAL)
Source: EssilorLuxottica 2025 earnings (Feb 2026)
- Total revenue: €28.49B
- Adjusted operating profit: €4.46B → 15.65% margin
- Prior year operating margin: 16.7%
- Smart glasses sold: 7M+ pairs
- Smart glasses stated to have DRAGGED operating margin down

Calculation:
- Estimated smart glasses revenue: 7M × ~€350 ASP = ~€2.45B (8.6% of total)
- Overall margin dropped 0.7pp (16.7% → 16.0%)
- Total margin impact: 0.007 × €28.49B ≈ €200M
- Implied smart glasses operating margin: (€409M normal - €200M drag) / €2.45B = ~8.5%
- Per pair operating profit: €30 ≈ $32
- Compare: regular Ray-Ban at $200 × 16.7% = $33.40 operating profit
- FINDING: A $379 smart pair makes LESS profit than a $200 regular pair

### 3. AI Inference Cost Per User Per Month (ORIGINAL)
Using public API pricing as upper bound, internal cost estimates:
- Gemini 2.5 Flash (Samsung/Google): ~$0.015/image + ~$0.04/1K output tokens
  - Internal cost: ~20-30% of retail → ~$0.005-0.007/query
- Meta AI (Llama, own infra): ~$0.002-0.003/query
- Estimated usage: 10-20 multimodal queries/day per active user
- Monthly cost:
  - Samsung/Google: 15 queries × 30 days × $0.006 = $2.70/month
  - Meta: 15 queries × 30 days × $0.0025 = $1.13/month
  - Power users (25/day): $4.50/month and $1.88/month
- Over 2-year device lifecycle:
  - Samsung/Google: $64.80
  - Meta: $27.00
  - Per-pair AI subsidy delta: ~$37.80 more for Samsung

## Key Data Points

### Market Data (IDC Q1 2026)
- Smart glasses surged 167% YoY in Q1 2026
- Q1 2026: ~2.25M units shipped (one quarter = all of 2024)
- Meta: 69.2% market share (Q1 2026), down from 72.2% (2025)
- IDC forecast: 13.6M display-less units in 2026, $5.1B revenue
- ASP: $376 (2026) → $229 (2030), 40% compression
- SAG: 20M units in 2026, $5.6B revenue; 75M by 2030, $29B

### Samsung Galaxy Glasses Details
- Codename: Jinju (no display), Haean (display, 2027)
- Partners: Gentle Monster, Warby Parker
- Unveil: July 22, 2026 (London Unpacked) — likely teaser
- Ship: Fall 2026
- Android XR + Gemini AI
- Works with Galaxy Watch for photo review
- Prescription lens support confirmed

### Meta Ray-Ban Details
- 7M+ pairs sold in 2025 (full year)
- Production capacity: expanding to 10M/year
- Gen 2 starts at $379 (clear), $409 (polarized), $459 (Transitions)
- Ray-Ban Display: $799 (launched Sept 2025)
- Meta acquired $3.5B stake in EssilorLuxottica
- Gen 2: Llama 4, 3K video, double battery life

### Competitor Landscape
- RayNeo: 23.7% of AR glasses (display), #1 Q1 2026
- Xiaomi: 3.1% share
- XREAL: 2.0% share
- Chinese manufacturers: ~45% of global AI glasses shipments
- Apple smart glasses: 2028-2030 (Bloomberg/Gurman)
- Google Pixel glasses: also coming via Android XR

## Sources
1. IDC Worldwide Wearable/ARVR Tracker Q1 2026
2. EssilorLuxottica 2025 earnings (Feb 11, 2026)
3. Smart Analytics Global AI Smart Glasses Feature Report
4. Counterpoint Research Global XR Market Tracker Q1 2026
5. TechTimes Galaxy Glasses comparison (Jul 3, 2026)
6. SamMobile Galaxy Watch pairing (Google I/O 2026)
7. TechCabal Galaxy Glasses spec summary
8. Gizmodo Samsung/Google I/O reveal
9. Android Authority Ray-Ban Display pricing
10. Reuters EssilorLuxottica Q3 2025 earnings (Oct 2025)
