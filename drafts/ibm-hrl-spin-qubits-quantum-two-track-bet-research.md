# Research Notes: IBM's HRL Acquisition + Silicon Spin Qubit Breakthrough

## Core Story
IBM acquired HRL Laboratories (owned by Boeing and GM) on Jul 23, 2026, adding silicon spin qubits as a second quantum computing track alongside superconducting circuits. Days later (Jul 29), HRL published a landmark Nature paper demonstrating the most advanced silicon spin qubit processor ever: 18 qubits at 0.2% error rate, controlled by cryogenic electronics via a superconducting ribbon cable.

## Key Facts

### HRL Nature Paper (Jul 29, 2026)
- 18 exchange-only spin qubits (trio of electrons per qubit)
- Error rate: ~0.2% (down from 4% three years ago with only 2 qubits)
- Digitally controlled by cryogenic electronics at 4K
- Superconducting ribbon cable interconnects
- Peer reviewer called it "a significant milestone in the technological maturity of semiconductor spin qubits"
- Nature vol 655, pp 1154-1159 (2026)

### QuTech Paper (same Nature issue)
- 5 qubits with reconfigurable long-range connectivity (Undseth et al.)

### Other Spin Qubit Results
- Groove Quantum (Delft): 18-qubit germanium device, ~0.2% error (arXiv, April 2026)
- RIKEN (Japan): 5-qubit system, <0.01% error rate (preprint, July 2026)

### Three Years Ago
- State-of-art: 2 spin qubits, 4% error rate
- That's 9× more qubits and 20× better error rates in 3 years

### IBM Acquisition (Jul 23, 2026)
- Source: Reuters, IBM newsroom
- HRL is the former Hughes Research Lab, founded by Howard Hughes' Hughes Aircraft
- Jointly owned by Boeing and GM; both will continue to partner with IBM
- Price not disclosed
- IBM's second quantum track: superconducting (primary) + spin (new)
- "Blue Jay" superconducting system planned for 2033; spin qubits become key after that
- Gambetta: "They have a very strong spin qubit team, the strongest in the world"
- HRL chips will be made at IBM's cutting-edge facility in New York
- Google also added a second track (neutral atoms) earlier in 2026

### HRL Backstory
- Founded 1948 as Hughes Research and Development Laboratories
- Hughes Aircraft → Raytheon → Boeing/GM ownership
- Invented the laser (1960, Theodore Maiman)
- Earlier in 2026: mass layoffs after loss of US government contracts
- From layoffs to IBM acquisition within months

### IBM Quantum Spending
- $10B over 5 years in quantum (announced Jun 2026)
- $1B CHIPS Act award + $1B IBM cash → Anderon quantum foundry (Albany, NY)
- America's first pure-play quantum foundry; 300mm quantum wafers
- $1B in quantum business booked Q1 2017-Q4 2024
- Starling: first fault-tolerant quantum computer targeted for 2029

### Quantum Technology Landscape
| Company | Primary Track | Second Track | Qubits (current best) |
|---------|-------------|-------------|---------------------|
| IBM | Superconducting | Silicon spin (HRL) | 100+ (superconducting) |
| Google | Superconducting | Neutral atoms | 100+ |
| Microsoft | Topological | — | TBD |
| IonQ | Trapped ions | — | 36 |
| Quantinuum | Trapped ions | — | 56 |
| D-Wave | Quantum annealing | — | 5,000+ (specialized) |
| QuEra | Neutral atoms | — | 256 |

### Manufacturing Cost Angle
- Both superconducting and spin qubits use same fab equipment as classical chips
- But spin qubits are MUCH SMALLER than superconducting circuits
- Spin qubits use standard CMOS-compatible silicon wafers
- Anderon foundry: 300mm wafer capability — standard semiconductor size
- Key question: can spin qubits ride Moore's Law economics?

### BCG Market Projection
- $90B-$170B quantum computing market by 2040
- $850B in economic value by 2040 (IBM/Commerce Dept)

## Original Analysis
1. **The "nobody is sure" hedge calculation:** IBM spent $10B+ and STILL needed a second technology track. Google did the same. This means the world's most sophisticated quantum engineering teams, after spending billions, estimate >0% probability their primary approach won't scale. We can calculate the implied probability from the investment allocation.

2. **Improvement rate extrapolation:** From 2 qubits/4% error (2023) to 18 qubits/0.2% error (2026). If this exponential continues, when do spin qubits catch up to superconducting in count? And is error rate more important than count?

3. **Cost per qubit comparison:** IBM has booked $1B in quantum revenue over 7 years while investing $10B+. What's the current cost per useful qubit, and how does silicon's manufacturing advantage change the economics at scale?

## Sources
- Nature News: https://www.nature.com/articles/d41586-026-02357-z
- Nature Paper (HRL): https://www.nature.com/articles/s41586-026-10754-7
- IBM Newsroom: https://newsroom.ibm.com/2026-07-23-ibm-to-acquire-hrl-laboratories-to-power-the-future-of-quantum
- Reuters: https://www.reuters.com/business/autos-transportation/ibm-buys-hrl-laboratories-shift-two-track-quantum-computing-strategy-2026-07-23/
- IBM Research Blog: https://research.ibm.com/blog/hrl-laboratories-ibm
- WSJ: https://www.wsj.com/tech/ibm-getting-ready-to-scale-quantum-computing-b2418cd5
- DCD (IBM $10B): https://www.datacenterdynamics.com/en/news/ibm-announces-five-year-10bn-quantum-investment/
- IBM/Commerce (Anderon): https://newsroom.ibm.com/ibm-and-u-s-department-of-commerce-announce-americas-first-purpose-built-quantum-foundry
