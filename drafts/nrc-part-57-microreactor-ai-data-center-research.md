# Research Notes: NRC Part 57 — Microreactors Get a Regulatory Fast Lane at the Exact Moment AI Needs Them

## Story Thesis
The NRC proposed 10 CFR Part 57 on May 1, 2026 — a brand-new licensing framework designed for "rapid and high-volume deployment" of microreactors. Two days earlier, the University of Utah became the first university to generate electricity from a nuclear reactor to power an AI GPU node. These events converge on a concrete question: can microreactors power data centers this decade?

## Primary Sources

### 1. Federal Register — NRC Proposed Rule (May 1, 2026)
- **Document:** FR Doc No: 2026-08550, Pages 23628-23766 (138 pages!)
- **URL:** https://www.federalregister.gov/documents/2026/05/01/2026-08550/licensing-requirements-for-microreactors-and-other-reactors-with-comparable-risk-profiles
- **Key details:**
  - Creates 10 CFR Part 57 — entirely new regulatory part, not an amendment to Parts 50/52/53
  - Mandated by ADVANCE Act (Pub. L. 118-67, 2024) and E.O. 14300 (May 2025)
  - E.O. 14300 directs NRC to reach final licensing decision within **18 months** (vs 5-10+ years under Parts 50/52)
  - Final rule must be issued by **November 23, 2026**
  - Comments due **June 15, 2026**
  - Net cost savings to industry/NRC: **$3.76B** (7% discount) to **$11.84B** (3% discount)
  - **General license for construction** of nth-of-a-kind reactors before CP issuance
  - Combined licensing pathways — single application for CP + OL + manufacturing license
  - Applicants can define "basic component" and "safety-related" terms themselves
  - Categorical exclusions under NEPA possible
  - "High-volume licensing" language — unprecedented for nuclear

### 2. University of Utah + Elemental Nuclear (April 28, 2026)
- **Sources:** Gizmodo, Interesting Engineering, multiple outlets
- **Details:**
  - TRIGA research reactor generates electricity for first time in 50 years
  - Powers a high-performance GPU node (mini AI data center)
  - 2-3 kW electricity via cold-helium reverse Brayton Cycle
  - Elemental Nuclear Energy Corp partnership
  - 12 universities involved in consortium
  - Proof of concept for compact nuclear → AI compute
  - Commercialization target: 2030-2031

### 3. DOE SMR/Microreactor Funding
- $900 million allocated for SMR development
- $400 million for Tennessee Clinch River project
- SMRs: ≤300 MW; Microreactors: ≤20 MW

### 4. NANO Nuclear Energy (NNE)
- KRONOS MMR platform positioned for Part 57
- Stock up 18% in 30 days on Part 57 news
- Projected $4.6M revenue and $520K earnings by 2029
- Fair value estimate: $46.67/share

### 5. Industry Context
- Data centers consuming ~17% of US electricity
- Grid transformers aging, power outages escalating
- Microsoft, Google, Amazon, Meta all securing nuclear power agreements
- Meta capex guidance: $125-145B (Q1 2026 earnings call)
- NuScale SMR project cancelled 2023 (costs ballooned from $5.3B to $9.3B)

## Novel Contribution — The Calculation Nobody Has Run

### Licensing Timeline Comparison
| Framework | Typical Timeline | Application Complexity | Hearing Process |
|-----------|-----------------|----------------------|-----------------|
| Part 50 (old) | 5-10 years | Separate CP + OL | Mandatory hearings at each stage |
| Part 52 (combined) | 3-7 years | Single combined license, but ITAAC | ITAAC closure hearing |
| Part 57 (NEW) | **~18 months** target | Joint CP/OL + manufacturing | Single hearing, ACRS review only for novel aspects |
| Part 57 nth-of-a-kind | **Potentially <12 months** | General license for construction | Reduced or eliminated |

### How Many Microreactors Per Data Center?
- Hyperscale data center: 100-500 MW
- Typical microreactor: 1-20 MWe
- A 10 MWe microreactor fleet:
  - 300 MW data center → 30 microreactors
  - At 80% capacity factor → 38 microreactors
  - Under old Part 50: 38 separate license applications × 5 years = never
  - Under Part 57 nth-of-a-kind: License the design once, deploy 38 under general license

### Cost Comparison (LCOE per MWh)
- Grid electricity (US average): $70-80/MWh
- Natural gas peaker: $100-150/MWh
- Solar + 4hr battery: $45-65/MWh (intermittent, not 24/7 baseload)
- SMR (projected): $90-120/MWh (NuScale projected before cancellation)
- Microreactor (projected): $100-200/MWh (early units), $60-80/MWh (at scale)
- BUT: data centers need 24/7 baseload with 99.999% uptime — intermittent sources need massive overbuild

## Strongest Counterargument
NuScale's SMR project was the most advanced in the US. It had NRC design certification. It still died because costs ballooned from $5.3B to $9.3B. Part 57 addresses regulatory timelines — but NuScale's problem was construction costs, not regulatory delays. If microreactors follow the same cost trajectory, faster licensing just means you find out faster that you can't afford it.

Counter to the counter: Microreactors are fundamentally different from NuScale's 77 MWe modules. They're factory-built, truck-transportable, use passive safety (no operator intervention needed), and the "high-volume" framing in Part 57 explicitly targets standardized, mass-produced units. The Tesla Model 3 costs less than a Rolls-Royce not because of regulation but because of manufacturing scale. Part 57 enables that scale.

## Limitations
- Part 57 is a PROPOSED rule. Final rule not until November 2026. Could be weakened in comment period.
- No microreactor has been commercially deployed yet. Earliest commercial deployment: ~2027-2029 for military/DOD use.
- Utah demo generated 2-3 kW — orders of magnitude below commercial scale.
- LCOE projections for microreactors vary wildly. No real cost data exists at scale.
- Waste and proliferation concerns not addressed in this analysis.

## Kill Test: PASS
- Nobody has connected Part 57 + Utah demo + data center economics into one story
- The "18 months vs 10 years" licensing comparison hasn't been published
- The "how many microreactors per data center" calculation hasn't been done

## 10-Star Test: PASS
- Reader reaction: "I didn't know the NRC just created a nuclear fast lane"
- "I didn't know someone is already running AI on a nuclear reactor"
- "I didn't know you could mass-produce reactor licenses like solar panel permits"

## Journalist
**Priya Desai** — Energy/Policy beat. Article #280.

## Category
⚡ Energy

## Headline Options
1. "The NRC Just Proposed a New Way to License Nuclear Reactors in 18 Months. The Old Way Took a Decade. Here's What Changed."
2. "A University Reactor Generated Electricity for the First Time in 50 Years. It Powered an AI Data Center."
3. "The NRC Wants to License Microreactors Like Solar Panels. The Math on Powering a Data Center With Them Is Surprisingly Close."
