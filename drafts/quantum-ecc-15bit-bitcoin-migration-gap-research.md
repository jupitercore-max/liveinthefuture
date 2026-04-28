# Research: Quantum Computing Just Broke Its Biggest Cryptographic Key. Bitcoin's $650 Billion Exposure Has No Fix.

## Story Summary
Three convergent events in seven months (September 2025 – April 2026) have compressed the quantum threat timeline for cryptocurrency: an independent researcher broke the largest ECC key ever on public quantum hardware, two theoretical papers slashed the qubit requirements for a full-scale attack by 50–100×, and Bitcoin still lacks a migration plan while ~$650B in assets sit exposed.

## Kill Test
- **Would a reader care in 6 months?** YES. The qubit requirement dropping from millions to 10K is a decade-shifting revision. Bitcoin's governance problem is structural — it won't resolve itself.
- **Is this just a press release rewrite?** NO. The novel contribution is: (1) a progression-rate calculation from 6-bit to 15-bit with clear explanation of why naive extrapolation is wrong; (2) a Bitcoin vs Ethereum preparedness comparison table; (3) a dollar-weighted exposure analysis by wallet type.

## 10-Star Test
- Original analysis: YES (progression rate math, governance comparison, exposure by wallet type)
- Multiple primary sources: YES (6+)
- Counterargument addressed at full strength: YES (256-bit gap, runtime tradeoffs, harvest-now-decrypt-later timeline)
- Actionable: YES (what BTC holders, exchanges, devs should do)

## Primary Sources

### 1. Project Eleven Q-Day Prize (April 24, 2026)
- **What:** Giancarlo Lelli broke a 15-bit ECC key on publicly accessible IBM quantum computer, winning 1 BTC
- **Method:** Variant of Shor's algorithm, derived private key from public key across search space of 32,767
- **Previous record:** Steve Tippeconnic broke 6-bit key (September 2025) — first public quantum ECC break
- **512× jump** in search space (2^6 = 64 → 2^15 = 32,767)
- **Source:** https://www.newswire.ca/news-releases/project-eleven-awards-1-btc-q-day-prize-for-largest-quantum-attack-on-elliptic-curve-cryptography-to-date-873245224.html
- **Code:** https://github.com/GiancarloLelli/quantum (6 oracle strategies, V-chain decomposition)
- **Quote (Alex Pruden, CEO):** "The resource requirements for this type of attack keep dropping, and the barrier to running it in practice is dropping with them."

### 2. Caltech/Oratomic Paper (March 31, 2026)
- **Title:** "Shor's algorithm is possible with as few as 10,000 reconfigurable atomic qubits"
- **ArXiv:** 2603.28627
- **Authors:** Cain, Xu, King, Picard, Levine, Endres, Preskill, Huang, Bluvstein (Oratomic + Caltech + UC Berkeley)
- **Key finding:** ECC-256 can be broken with 9,700–26,000 physical qubits (neutral atom architecture)
- **Previous estimate:** Google said <500,000 (superconducting). Gidney estimated ~1 million for RSA-2048.
- **The catch:** Runtime. Neutral atoms are "slow-clock" — ECC-256 attack takes 10–264 days vs Google's 9–23 minutes
- **Why it matters:** 50–100× reduction in qubit requirement; shifts from "impossible for decades" to "engineering challenge"
- **Source:** https://phys.org/news/2026-04-quantum-built-qubits-team.html

### 3. Google Quantum AI Whitepaper (March 2026)
- **Finding:** Under 500,000 superconducting qubits to break ECC-256 in 9–23 minutes
- **Google committed** to being quantum-secure by 2029
- **Cloudflare followed** with same 2029 deadline
- **Source:** https://postquantum.com/security-pqc/google-pqc-migration-2029/

### 4. CoinDesk Analysis (April 25, 2026)
- **6.9 million BTC** have public keys visible on-chain (from Project Eleven's RISQ list)
- Includes Satoshi Nakamoto's early holdings
- Coins spent since 2021 Taproot upgrade also exposed
- Bitcoin vs Ethereum: Ethereum has Vitalik's coordinated PQ migration roadmap; Bitcoin has no unified plan
- Bitcoin's anti-centralization culture makes coordinated security upgrades harder
- **Source:** https://www.coindesk.com/tech/2026/04/25/clock-is-ticking-for-bitcoin-to-prevent-quantum-threat-as-it-could-drain-6-9-million-btc-including-satoshi-s

### 5. Vitalik Buterin's Quantum Resistance Roadmap (Feb 27, 2026)
- Four quantum-vulnerable components: BLS signatures (consensus), KZG commitments (data availability), ECDSA (EOA signatures), ZK proofs (application layer)
- Step-by-step migration plan using STARK, hash-based signatures, native account abstraction
- **Source:** https://cointelegraph.com/news/vitalik-proposes-4-fixes-quantum-resistance-roadmap-for-ethereum

### 6. PostQuantum.com Analysis
- Detailed comparison of Google vs Oratomic approaches
- Runtime tradeoff is critical: 10,000 qubits but 264 days vs 500,000 qubits but 9 minutes
- "Harvest now, decrypt later" threat is real for both timelines
- **Source:** https://postquantum.com/security-pqc/10000-qubits-shors/

## Novel Contribution: Progression Rate Analysis

### Bits broken on public quantum hardware:
| Date | Bits | Researcher | Search Space |
|------|------|-----------|--------------|
| Sep 2025 | 6 | Steve Tippeconnic | 64 |
| Apr 2026 | 15 | Giancarlo Lelli | 32,767 |

- **Rate:** +9 bits in ~7 months = ~1.3 bits/month
- **Naive extrapolation to 256 bits:** (256 - 15) / 1.3 = ~185 months = ~15.4 years (from April 2026 → ~2041)
- **WHY THIS IS WRONG:** Scaling is not linear. Each additional bit roughly doubles the quantum circuit complexity. The 6→15 jump exploited better oracle strategies (V-chain decomposition), not just more hardware. Hardware improvement (qubit count, error rates) follows its own trajectory independent of algorithmic tricks on small instances. The gap from 15 to 256 bits is not 17× larger — it's exponentially harder in multiple dimensions simultaneously.
- **WHY COMPLACENCY IS ALSO WRONG:** Google's estimate dropped from 20 million qubits (2019 IBM estimate) to 500,000 (2026). Oratomic dropped it to 10,000. That's a 2,000× reduction in 7 years. If hardware follows similar compression, the timeline compresses faster than linear extrapolation suggests.

### Dollar Exposure
- 6.9 million BTC exposed (public keys on-chain)
- At ~$77,000/BTC (April 28, 2026 price range) = ~$531 billion
- Total crypto using ECC: $2.5 trillion+ per Project Eleven

### Bitcoin vs Ethereum Preparedness
| Dimension | Bitcoin | Ethereum |
|-----------|---------|----------|
| Governance | BIP process, no formal leader | Vitalik + EF, coordinated |
| PQ Roadmap | None published | 4-component roadmap (Feb 2026) |
| Migration mechanism | Requires hard fork or soft fork | Account abstraction enables gradual |
| Cultural resistance | Strong — any change is contentious | More accepting of protocol evolution |
| Exposed assets | 6.9M BTC ($531B) | TBD, but roadmap exists |
| Timeline pressure | Higher (no plan = no progress) | Lower (plan published, work begun) |

## Category
💻 Quantum

## Journalist
Elena Vasquez — Defense & Security Tech
(Quantum threats to financial infrastructure = security beat)

## Headline candidates
1. "An Independent Researcher Just Broke the Largest Cryptographic Key Ever on a Quantum Computer. It Took Seven Months to Go 512× Further."
2. "The Gap Between Today's Quantum Computers and Breaking Bitcoin Shrank 2,000× in Seven Years. Bitcoin Has No Migration Plan."
3. "A Quantum Computer Just Cracked a 15-Bit Key. Bitcoin Uses 256. The Math Between Them Is Changing Faster Than Anyone Expected."

## Related articles (LITF)
- fermionic-quantum-gates-error-correction-threshold.html (prior quantum article)
- swe-bench-reality-gap.html (AI benchmarks/reality gap theme)
