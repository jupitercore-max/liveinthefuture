# Research Notes: AI Breaks Post-Quantum Cryptography Candidate

## Summary
Anthropic's Claude Mythos Preview AI model discovered a structural vulnerability in HAWK, a lattice-based post-quantum digital signature scheme under NIST review, in 60 hours at ~$100K compute cost. The same scheme survived two years and two rounds of expert human cryptanalytic review. Separately, the model invented a novel attack technique ("Möbius Bridge") that accelerates attacks on 7-round reduced AES by 200-800x.

## Primary Sources

### 1. Anthropic Research Post (July 28, 2026)
- Two papers released: HAWK key-recovery and AES Möbius Bridge
- HAWK attack: discovered nontrivial automorphism in underlying lattice
- Constructed τ-cocycle lattice from public key
- Applied lattice reduction + sieving to recover short vectors
- Reconstructed secret basis capable of signing arbitrary messages
- HAWK-256 work factor: dropped from 2^64 to 2^38 operations (67-million-fold improvement)
- End-to-end attack completes in 3 hours 42 minutes on a 96-core server
- HAWK-512 and HAWK-1024 still beyond practical reach
- Multi-agent setup with occasional human nudges
- One agent prematurely dismissed the core idea; partner pushed forward
- Human researcher "strong in theoretical CS but no lattice expert" — mostly managed workflow
- Verification by ETH Zürich, Tel Aviv University, University of Haifa
- Disclosed to NIST and HAWK design team before publication (June 2026)
Source: Anthropic blog, via webpronews.com reporting

### 2. AES Möbius Bridge Attack
- Targets 7-round reduced AES (full AES-128 = 10 rounds)
- Previous meet-in-the-middle attacks required guessing 1 of 256 values
- Mythos removed that guess entirely by identifying invariant fingerprint
- 200-800x runtime improvement depending on parameters
- Still requires ~2^105 chosen plaintexts (theoretical, not practical)
- Model initially refused the task — insisted AES could not be broken
- Only after persistent prompting explored weaker variants
- Ran mostly autonomously for 3 days, generating >1 billion output tokens
- Human review of final proof took hundreds of hours
Source: Anthropic research post, webpronews.com

### 3. NIST PQC Additional Signatures Round 3 (May 14, 2026)
- 9 candidates advanced: FAEST, HAWK, MAYO, MQOM, QR-UOV, SDitH, SNOVA, SQIsign, UOV
- HAWK is the SOLE lattice-based candidate among the nine
- HAWK offers smaller signatures than FALCON, no floating-point arithmetic needed
- Round 3 expected to take ~2 more years of evaluation
- NIST released NIST IR 8610 status report
Source: NIST CSRC, securityboulevard.com, industrialcyber.co

### 4. Bitcoin BIP-360/BIP-361 Post-Quantum Migration
- BIP-360: introduces quantum-resistant Pay-to-Merkle-Root (P2MR) addresses
- Specifies 3 NIST-standardized algorithms with fallbacks
- BIP-361: 3-phase forced migration plan (Casa CTO Jameson Lopp + 5 co-authors)
  - Phase A (3 years after activation): block sends to legacy addresses
  - Phase B (5 years after): freeze all unmigrated coins
  - Phase C: zero-knowledge proof recovery for frozen coins
- ~34% of BTC supply (~1.7 million BTC) in quantum-vulnerable addresses
- At current prices (~$60K), that's ~$102 billion at risk
- BIP-361 argues migration window closing: attacks improving 20-fold
- Adam Back (Blockstream CEO) opposes forced freezing, favors optional path
Source: coindesk.com, postquantum.com, news.bitcoin.com

### 5. Anthropic Capability Context
- Mythos Preview scored 83.1% on cybersecurity vulnerability reproduction (vs 66.6% for Opus 4.6)
- 181 working exploits in Firefox engine benchmark
- UK AISI: first model to solve certain CTF challenges start-to-finish
- On 32-step exploit chain: averaged 22 steps (next-best: 16)
- Cloud Security Alliance: organizations should assume adversaries gain comparable capability in 1-3 years
Source: webpronews.com, Glasswing announcement

## Original Contribution — The Cryptanalysis Cost Curve

### Cost of AI Cryptanalysis vs. Human Cryptanalysis
- **AI cost:** $100,000 for 60 hours → found vulnerability in HAWK-256
- **Human cost baseline:** 
  - HAWK survived 2 rounds of NIST evaluation (Nov 2023 → May 2026 = 2.5 years)
  - Hundreds of cryptographers worldwide participated in review
  - A single senior cryptographic researcher costs ~$150-200K/year fully loaded (salary + overhead + compute)
  - Conservative estimate: even if only 5 researchers spent 10% of time on HAWK specifically over 2.5 years, that's 1.25 person-years = ~$200K in researcher time
  - More realistically, dozens of researchers reviewed HAWK across multiple institutions
  - None found this specific automorphism

### The 67-million-fold improvement math
- HAWK-256 security: 2^64 → 2^38
- 2^64 / 2^38 = 2^26 = 67,108,864
- That's a 67-million-fold reduction in computational work
- At 2^38 operations, this is crackable on commodity hardware
- But HAWK-256 is the SMALLEST parameter set (not considered for standardization)
- HAWK-512 and HAWK-1024 (the NIST candidates) remain beyond practical reach
- However: the automorphism affects the design philosophy, forcing key size doubling

### NIST Pipeline Economics
- 9 candidates × $100K per AI audit = $900K to stress-test all candidates
- Traditional approach: 2+ years of global academic review per round
- If AI can compress auditing timelines by even 50%, standardization could accelerate significantly
- NIST Round 3 expected to take ~2 more years → AI could potentially cut this

### AES Safety Margin
- AES-128 has 10 rounds
- Best known attack (before Mythos): 7 rounds with MITM requiring 1-of-256 guess
- Mythos attack: 7 rounds, 200-800x faster, no guess needed
- Full AES-128 security margin: 3 remaining rounds
- Historical progression: cryptanalysts have gained ~1 round per decade since AES adoption (2001)
- At that pace, full AES wouldn't fall until ~2031-2040
- But AI compresses timelines. If AI gains 1 round per 1-2 years instead of per decade...
- Critical caveat: each additional round is exponentially harder. The relationship isn't linear.

### Bitcoin at Risk
- 1.7 million BTC in quantum-vulnerable addresses
- At ~$60,000/BTC: ~$102 billion at risk
- BIP-361 migration timeline: 5 years from activation to freeze
- BIP-360 still in testnet/draft stage
- If BIP-360 activation happens in 2028 (optimistic), freeze would be ~2033
- Q-Day forecast from Bitcoin 2026 Conference panel: 2027-2028
- Gap: potentially 5+ years between Q-Day and full migration
- Anthropic's finding: classical attacks are also improving, not just quantum

## Kill Test ✓
Original calculations:
1. Cost comparison: $100K AI vs. estimated $200K+ human review time that missed the flaw
2. NIST pipeline stress-test economics: $900K to AI-audit all 9 Round 3 candidates
3. AES safety margin trajectory: round-per-decade vs. AI-compressed timeline
4. Bitcoin at-risk supply value: $102B in quantum-vulnerable addresses

## Angle
Not "AI breaks encryption" (clickbait, inaccurate). The real story: **cryptanalysis just became a line item on a compute budget.** The cost and speed of finding cryptographic flaws dropped by orders of magnitude. This changes who can audit algorithms (anyone with $100K), how fast we can standardize post-quantum crypto (much faster), and how much time we have to migrate (less than we thought).

## Journalist
Marcus Chen — Cybersecurity/Defense beat
