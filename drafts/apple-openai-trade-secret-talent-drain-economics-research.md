# Apple v. OpenAI Trade Secret Lawsuit — Research Notes

## Primary Sources

1. **Apple Inc. v. OpenAI Foundation et al.** — Civil complaint filed July 10, 2026, U.S. District Court, Northern District of California. 41-page complaint. Case alleges misappropriation of trade secrets under DTSA and California UTSA.

2. **Reuters reporting** (July 10-11, 2026) — Confirms filing date, defendants, key allegations. Quotes OpenAI denial: "We have no interest in other companies' trade secrets."

3. **Barron's / Wall Street Journal reporting** (July 10-11, 2026) — Additional detail: Liu conspired with Alyssa Peng (who subsequently left for OpenAI in April). Apple notified OpenAI in February, received no response.

4. **Waymo LLC v. Uber Technologies Inc.** — Settled February 2018. 0.34% equity ($245M at $72B valuation). Originally sought ~$3B. Involved 14,000 files downloaded by Anthony Levandowski. Otto (Levandowski's startup) acquired by Uber for $680M.

5. **Reuters, May 21, 2025** — OpenAI acquires io Products (Jony Ive's startup) for $6.5B all-stock deal at $300B valuation (2.17% equity). OpenAI held prior 23% stake.

6. **Apple 10-K (FY2025)** — 166,000 employees as of Sept 27, 2025. Revenue $416B. Engineering is ~41% of workforce (~68,000). Revenue per employee: ~$2.5M.

7. **TechRepublic / Bloomberg (March 2026)** — Apple offering $200K-$400K retention bonuses to iPhone Product Design team. Competitors offering up to $1M/year.

8. **MacRumors / The Information (Sept 2025)** — OpenAI recruited 2 dozen Apple hardware employees in 2025 alone, 10 in 2024. Employees cited frustration with incremental changes and Apple's stock performance.

## Key Defendants

- **OpenAI Foundation** — Nonprofit parent
- **OpenAI Group PBC** — Commercial arm  
- **io Products** — Hardware startup acquired by OpenAI ($6.5B)
- **Chang Liu** — Former Apple sr. system electrical engineer (8 years at Apple, joined OpenAI Jan 2026)
- **Tang Yew Tan** — Former Apple VP of product design for iPhone/Apple Watch (24 years at Apple), now OpenAI Chief Hardware Officer. Co-founded io Products with Jony Ive.

## Key Allegations

1. **Liu**: Failed to return Apple laptop; used "rare, previously unknown" auth bug to access Apple shared network folders while at OpenAI; downloaded "dozens" of confidential hardware files; conspired with Alyssa Peng; celebrated access ("LOL... so funny")
2. **Tan**: Emailed himself supplier info and industry summaries before departure; used confidential Apple codenames during interviews to question candidates about unreleased products; directed candidates to bring "actual parts" (batteries, systems-in-package, multi-layer logic boards, shields) for "show and tell" sessions; coached departing employees on avoiding scrutiny
3. **OpenAI (institutional)**: Allegedly part of OpenAI's strategy to extract Apple's confidential information; instructed new hires how to avoid scrutiny when leaving Apple; supplier approached with secret metal finishing technique believing OpenAI had Apple's permission
4. **Scope**: "This is the tip of the iceberg." 400+ former Apple employees now at OpenAI.

## Original Analysis — Talent Drain Economics

### Calculation 1: Replacement Cost of 400 Engineers
- Apple total employees: 166,000
- Engineering workforce: ~68,000 (41%)
- Hardware engineering subset: ~25,000-30,000 (estimated)
- iPhone Product Design team (Tan's former group): ~500-1,000 (estimated)
- 400 departures from hardware engineering ≈ 1.3-1.6% of hardware engineering
- Average total compensation for senior hardware engineer at Apple in Bay Area: ~$350,000/year (base + RSU + bonus)
- SHRM replacement cost for specialized technical roles: 1.5-2x annual compensation
- Replacement cost: 400 × $350,000 × 2.0 = **$280 million**
- But this undercounts: institutional knowledge of supply chains, supplier relationships, unreleased product roadmaps — these cannot be replaced by hiring

### Calculation 2: Waymo-Uber Precedent Scaling
- Waymo v. Uber: 14,000 files → settled for $245M (0.34% of $72B valuation)
- Waymo originally sought ~$3B damages
- Settlement-to-claim ratio: 8.2%
- Per-file value at settlement: $245M / 14,000 = $17,500/file
- Apple alleges "dozens" of files from Liu alone, but institutional theft scope much broader
- If we scale by company valuation: 0.34% of OpenAI's $300B = **$1.02B**
- If we scale by the proportion of hardware business at stake: OpenAI's hardware business is nascent (no revenue yet), Apple's iPhone generates ~$200B/year

### Calculation 3: io Acquisition as IP Arbitrage
- OpenAI paid $6.5B for io Products
- io was ~1 year old with no shipped products
- io's value: Jony Ive's design vision + former Apple hardware leaders + institutional Apple knowledge
- Waymo-Uber ratio: settlement ($245M) / Otto acquisition ($680M) = 36% of acquisition price
- Applying to io: 36% × $6.5B = **$2.34B** potential exposure
- This doesn't mean io was only Apple IP — Ive's design skill and brand are independently valuable
- But the lawsuit implies the hardware operational knowledge (supply chains, manufacturing, components) came from Apple

### Calculation 4: Revenue-at-Risk per Employee
- Apple revenue per employee: $2.5M/year
- 400 employees × $2.5M = $1.0B annual revenue productivity
- Not all 400 are in revenue-generating hardware roles, and revenue per employee is blended across retail/corporate
- Hardware engineers likely generate 2-3x the average given product margins
- Adjusted: ~$1.5-2.0B in annual productivity represented by these 400 engineers

### The $200K-$400K Retention Bonuses Tell the Story
- Apple started emergency retention bonuses in March 2026
- $200K-$400K RSUs vesting over 4 years to iPhone PD team
- This is unprecedented — Apple rarely does out-of-cycle retention grants
- Implies Apple values these employees at a premium of $50K-$100K/year above normal comp
- For a company that controls costs as tightly as Apple, this is an alarm signal
- Competitors (read: OpenAI) offering up to $1M/year means Apple's retention bonuses may not be enough

## Strongest Counterargument

California law (Business and Professions Code §16600) prohibits non-compete agreements. Employees have an absolute right to leave and work for competitors. Hiring 400 people from a competitor is legal and common in Silicon Valley — it's how the Valley grew. Stanford Law professor Mark Lemley noted this in his analysis. The key legal question is not whether OpenAI hired Apple people — it's whether those people brought documents and whether OpenAI directed or encouraged that.

## Journalist

**Nadia Kovac** — Labor & AI — Covers talent displacement, corporate restructuring, labor economics in tech

## Slug

apple-openai-trade-secret-talent-drain-economics
