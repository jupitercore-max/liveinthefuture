# Research Notes: Microsoft Topological Qubit — 20 Years, 5 Questioned Papers

## Topic
Microsoft's 20-year bet on topological quantum computing using Majorana particles, the pattern of paper retractions/challenges, and the disconnect between that track record and their 2029 timeline.

## Key Facts

### Microsoft's Quantum Timeline
- **2005:** Chetan Nayak joins Microsoft (NSF.gov)
- **2006:** Station Q founded at UC Santa Barbara by Fields Medalist Michael Freedman; focus on topological quantum computing
- **2025 Feb:** Majorana 1 chip announced with Nature paper — met with skepticism; Nature editorial note said results "do not represent evidence for the presence of Majorana zero modes" (Physics World, New Scientist, APS Physics)
- **2025 March:** Chetan Nayak presents at APS Global Summit in Anaheim — many physicists express doubts (APS Physics)
- **2026 June 2:** Majorana 2 chip unveiled, AI-designed materials (lead instead of aluminum), claims 1000x reliability improvement, 20-second mean qubit lifetime (HPCwire, Reuters)
- **2026 June:** Microsoft says it will have commercially useful quantum machines by 2029 (Reuters) — previously said 2033

### The Five Questioned Papers
1. **2018 Nature paper** — "Quantized Majorana conductance" by Zhang et al., led by Leo Kouwenhoven (TU Delft/Microsoft). **RETRACTED March 2021** for "insufficient scientific rigour." Frolov & Mourik found raw data was cut, pasted, and selectively omitted. (Nature, Retraction Watch, IEEE Spectrum, The Register)
2. **Second Nature retraction** — Another paper from the Microsoft-funded Delft lab claiming Majorana evidence. **RETRACTED.** (Reuters: "Two previous Microsoft-backed papers were retracted from Nature")
3. **2020 Science paper** — Nanowire paper by Marcus/Copenhagen/Microsoft. Frolov & Mourik flagged problems → Science placed **Expression of Concern**. University investigation found no misconduct but confirmed subjective data selection. Corrected (not retracted) in 2025. Critics still call for retraction. (Science AAAS)
4. **Nature editorial alert** — The Feb 2025 Majorana 1 Nature paper received an extraordinary editorial note: "results in this manuscript do not represent evidence for the presence of Majorana zero modes." One of four peer reviewers still disagreed with publication at final round. One reviewer (Hao Zhang, Tsinghua) was co-author on the retracted 2018 paper. (New Scientist, APS Physics)
5. **2025 Nature paper — Legg critique (June 2026)** — Henry Legg (U of St Andrews) published formal "Matters Arising" critique in Nature arguing the topological gap protocol "yielded inconsistent and misreported outcomes" and broader dataset showed "random noise." Microsoft published rebuttal in same Nature issue. (Reuters, Scientific American, June 24, 2026)

Microsoft says the retracted papers "were done outside its labs and it did not review the data in them before publication." (Reuters)

### Spending
- Science AAAS (2025): Microsoft "has poured more than $1 billion into the field"
- Station Q operating since 2006 — 20 years of funding
- Labs in Santa Barbara (Station Q), partnerships at TU Delft, Niels Bohr Institute Copenhagen, University of Sydney

### Competitor Comparison
- **Google Willow** (Dec 2024): 105 superconducting qubits, first below-threshold error correction, 0.143% error rate per cycle (halved from 72-qubit grid). 0 retractions. Nature paper accepted without controversy. (Nature, Phys.org, IEEE Spectrum)
- **IBM:** 1,000+ qubit chip (Condor, 2023), targeting 2029 for useful quantum, $10B investment announced. 0 retractions.
- **Quantinuum H2:** 56 trapped-ion qubits, 99.9% two-qubit gate fidelity, >1s coherence. 0 retractions.
- **IonQ Aria:** 21 trapped-ion qubits, 99.6% fidelity, ~1s coherence.
- **Microsoft:** 0 verified physical qubits per comparative table (Uplatz, c. 2025). All metrics listed as "Theoretical."

### Expert Quotes
- **Henry Legg (St Andrews):** "They simply cannot sell the 2029 roadmap as credible to the public when the underlying physics is not there." "If you're looking into something which is essentially just random physics, eventually you will find the Jesus in your toast." (Reuters, Scientific American)
- **Sergey Frolov (Pittsburgh):** "The Microsoft Quantum project follows a sustained pattern of unreliable claims, so the new ones are not surprising." "The 'Matters Arising' makes it painfully apparent that the paper in Nature has no scientific value." (Science AAAS, Scientific American)
- **Marcel Franz (UBC):** "The fact that no consensus has yet emerged on the experimental side, despite significant worldwide effort, is a testament to the enormous challenge that these experiments present. I am optimistic however that in time, theory will be fully validated by experiments because... we do understand the underlying mechanisms extremely well." (IEEE Spectrum)
- **Winfried Hensinger:** Topological quantum computing is "probably 20-30 years behind the other platforms." (Physics World)
- **Jason Alicea (Caltech):** "Building topological qubits is a worthwhile goal... [Microsoft's approach] is still the best path we have in the near term." But: "there should be a much higher threshold for claiming the discovery of a topological qubit." (APS Physics)
- **Chetan Nayak (Microsoft):** "It's almost like arguing, is flight possible or not? And then you're standing next to an airplane. Well, why don't you hop in and take a ride?" (Reuters)
- **Jay Sau (Maryland):** "There is definitely a toxic cloud around the word 'Majorana' because of all this." (Science AAAS)

### DOE / Policy Context
- **Quantum Genesis Initiative** (June 2026): DOE announced $2B program, target 2028 for quantum supercomputer
- Trump executive orders on quantum computing and post-quantum cryptography (June 2026)
- $2B from CHIPS and Science Act to quantum companies + $1.375B to GlobalFoundries/IBM for quantum foundries
- Equity stakes required in recipient companies
- DARPA moved Microsoft to final phase of Quantum Benchmarking Initiative

### Microsoft's Defense
- Nayak: "We stand by our results and our roadmap."
- DARPA independently evaluated Microsoft's results (public + proprietary)
- Majorana 2 claims 1000x improvement, 20s mean qubit lifetime (some instances up to 1 minute)
- New lead-based materials stack designed with AI
- Microsoft contends retracted papers were external lab work

## Original Analyses for Article

### 1. Publication Reliability Index (PRI)
- Microsoft: 5 of 5 major quantum milestone papers have been retracted (2), corrected with expression of concern (1), editorially flagged (1), or formally challenged (1) = PRI of 0%
- Google: 0 of major quantum papers retracted or challenged (Sycamore 2019, Willow 2024) = PRI of 100%
- IBM: 0 retractions
- Quantinuum: 0 retractions

### 2. Qubit Overhead Comparison (c. mid-2026)
| Company | Modality | Physical Qubits Demonstrated | Best 2Q Gate Fidelity | Coherence Time | Papers Retracted |
|---------|----------|-----|-------|------|------|
| Google (Willow) | Superconducting | 105 | ~99.5% | 20-40 µs | 0 |
| IBM (Condor) | Superconducting | 1,121 | ~99.5% | ~100 µs | 0 |
| Quantinuum H2 | Trapped Ion | 56 | ~99.9% | >1 s | 0 |
| IonQ Aria | Trapped Ion | 21 | 99.6% | ~1 s | 0 |
| Microsoft | Topological | 0 verified | Theoretical | Claimed 20s | 5 questioned |

### 3. R&D Spend Estimate
Science AAAS reports >$1B. Station Q from 2006 = 20 years. Labs at Santa Barbara, partnerships at Delft, Copenhagen, Sydney. Reasonable estimate: $1-2B total.

### 4. Catch-up Timeline
- Google: Quantum supremacy 2019, below-threshold error correction 2024
- IBM: 1,000+ qubits 2023, targeting 2029
- Microsoft: 0 verified qubits → targeting 2029 same as IBM
- Hensinger estimate: topological approach is "20-30 years behind other platforms"
- Microsoft must demonstrate: (1) verified topological qubit, (2) multi-qubit operations, (3) error correction, (4) scale to useful computation — all in 3 years

## Primary Sources
1. Reuters — "Microsoft's quantum computing technology called into question, again" (June 24, 2026)
2. Scientific American — "Top quantum computer expert claims Microsoft's 'topological qubit' doesn't hold up" (June 24, 2026)
3. Science AAAS — "Corrected study rekindles debate over Microsoft's quantum computing research" (2025)
4. Science AAAS — "Doubling down on controversial claims, Microsoft accelerates quantum computing plans" (June 2026)
5. APS Physics — "Microsoft's Claim of a Topological Qubit Faces Tough Questions" (March 2025)
6. Nature — Retraction notice for Zhang et al. 2018 (March 2021)
7. IEEE Spectrum — "Major(ana) Backpedaling" (2021)
8. Retraction Watch — "Authors retract Nature Majorana paper" (2021)
9. New Scientist — "Microsoft made a splash with a controversial quantum computer in 2025" (Dec 2025)
10. Physics World — "Experts weigh in on Microsoft's topological qubit claim" (Feb 2025)
11. HPCwire — Microsoft Majorana 2 announcement (June 2, 2026)
12. Reuters — "Microsoft reveals new quantum chip made with AI" (June 2, 2026)
13. The Register — various articles on Microsoft quantum controversies
14. Nature (Dec 2024) — Google Willow below-threshold error correction
15. Wikipedia — Majorana 1 article with compiled controversies
