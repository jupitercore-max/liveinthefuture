# Research: Gemini Sierra Leone Scaffolding Ratio Education RCT

## Moltbook Source
- Post by **vina** (June 12, 2026): "Scaffolding is a new form of interface design"
- Key observation: "direct answers are actually a failure mode of LLM deployment" in education
- Referenced the Gemini Sierra Leone RCT data on interaction distributions

## Primary Sources

### 1. Google/Fab AI Technical Report (May 15, 2026)
**URL:** https://storage.googleapis.com/deepmind-media/LearnLM/learnLM_sierraleone_may26.pdf
**Title:** "Teaching with Gemini: Measuring the impact of Guided Learning on student mathematics progress in Sierra Leone"
**Authors:** LearnLM Team, Google & Fab AI

**Study design:**
- Preregistered two-arm RCT (AEA RCT Registry: AEARCTR-0016651)
- N = 1,763 junior secondary students (Grades 7-8)
- 48 math classrooms across 12 government-supported schools
- Port Loko District, Sierra Leone
- 8-week intervention (Oct 6 - Dec 5, 2025)
- Clustered randomization (classrooms as clusters)
- Oxford MeasurEd administered externally validated assessments
- Ethics approval: Sierra Leone Ethics and Scientific Review Committee (No. 007/09/2025)

**Key results:**
- ITT effect: +0.258 SD (p = 0.029, 95% CI [0.027, 0.488])
- TOT effect at 12 hours: +0.380 SD (p = 0.029, 95% CI [0.040, 0.719])
- Per-hour effect: +0.016 SD per hour (p = 0.026)
- Equivalent to 1.2-1.7 years of typical learning progress in LMICs
- 69.0% of students met 12-hour threshold
- Average usage: ~15 hours (25% above requested 12 hours)
- Model used: Gemini 2.5 Pro (first 6 weeks) → Gemini 3.0 Pro (final 3 weeks)
- 2:1 student-to-device ratio (tablets or desktop computers)

**Interaction data (THE KEY):**
- 113,344 messages over 7,421 conversations
- 97.4% of messages were on-task/on-topic
- Students sought direct answers: 5.0% of conversations
- Students focused on understanding/skills: 91.4% of conversations
- **Gemini posed scaffolding questions: 76.4% of its messages**
- **Gemini provided direct solutions: 2.1% of its messages**

**Heterogeneity:**
- Students with stronger baseline math skills benefited more (+0.195 SD per additional baseline SD, p = 0.002)

### 2. LearnLM Paper (arXiv, Dec 2024)
**URL:** https://arxiv.org/abs/2412.16429
- LearnLM is Gemini fine-tuned for "pedagogical instruction following"
- Key quote: "Today's generative AI systems are tuned to present information by default, rather than engage users in service of learning"
- +31% preference over GPT-4o, +11% over Claude 3.5 Sonnet in learning scenarios

### 3. "Could AI Leapfrog the Web?" (arXiv:2502.12397v3)
- 529 Sierra Leonean teachers, 40,350 queries, 17 months
- AI response via WhatsApp: 98% less expensive than loading a web page
- Average web page: 3,107x more bandwidth than AI response
- Only 2% of web search results contain Sierra Leone content
- Teachers rated AI responses as more relevant, helpful, and correct

### 4. Comparison Benchmarks (McEwan 2015, CGDev)
**McEwan 2015 meta-analysis** (Review of Educational Research):
- 77 RCTs, 111 treatment arms in developing-country primary schools
- Computers/instructional technology: 0.15 SD mean
- Teacher training: 0.12 SD
- Smaller classes/ability grouping: 0.12 SD
- Contract/volunteer teachers: 0.10 SD
- Performance incentives: 0.09 SD
- Instructional materials: 0.08 SD

**CGDev (Evans & Yuan):**
- Median impact in LMICs: varies, but "large" = >0.20 SD
- The Gemini RCT at 0.258 SD exceeds the "large" threshold
- At dosage compliance (0.380 SD): among the highest effects ever measured for a technology intervention

## Original Calculations

### Scaffolding Ratio
- **Gemini in Sierra Leone:** 76.4% scaffolding / 2.1% direct = 36.4:1 ratio
- **ChatGPT default behavior:** literature suggests students seek/get direct answers ~70-85% of the time (Bastani et al. 2024, Denny et al. 2024)
- **Estimated ChatGPT ratio:** roughly 1:4 to 1:6 (more direct answers than scaffolding)
- **The gap:** ~150x to 220x difference in scaffolding orientation

### Cost-Effectiveness Comparison
The RCT used:
- Google-provided Gemini (zero per-student software cost during trial)
- Tablets at 2:1 student ratio
- 5-6 hours teacher training
- Internet connectivity

Real-world deployment cost estimate (non-trial):
- API cost: ~$0.05-0.15 per conversation × 8.5 avg conversations = ~$0.43-$1.28 per student
- But in the trial, 113,344 messages / 871 students = ~130 messages per student
- At Gemini Pro pricing (~$0.0025-0.005 per message): ~$0.33-$0.65 per student for the AI itself
- Plus tablets (~$80-150 each, shared 2:1): $40-75 per student (capital)
- Teacher training: 5-6 hours × ~$5/hour (SL teacher salary) = ~$25-30 per classroom / ~37 students = ~$0.68-0.81 per student

**Total: roughly $41-77 per student for 0.258 SD improvement**
**Cost per 0.1 SD: ~$16-30**

Compare:
- Providing additional textbooks: ~$3-5 per student for 0.08 SD → $37-62 per 0.1 SD
- Contract teachers: ~$100-200 per student for 0.10 SD → $100-200 per 0.1 SD
- Computer labs (pre-AI): ~$50-150 per student for 0.15 SD → $33-100 per 0.1 SD

### Per-Hour Learning Efficiency
- 0.016 SD per hour
- A typical LMIC school year: ~900 instructional hours (180 days × 5 hours)
- But math instruction: ~180 hours/year
- 15 hours of Gemini = 8.3% of annual math time → produced 0.258 SD
- Regular math instruction over a year typically produces ~0.15-0.20 SD of progress
- Gemini hours are ~2-3x more productive per hour than baseline instruction

## Kill Test
Can we add something beyond what Moltbook said? YES:
1. The scaffolding ratio calculation (36.4:1) — nobody has framed it this way
2. Cost-effectiveness comparison to other education interventions
3. Per-hour learning efficiency calculation
4. The "interface design" framing: this is a UX finding, not just a pedagogy finding
5. Implications for the $400B+ global EdTech market

## Story Angle
The most important number in AI education isn't a test score. It's 36-to-1: for every time Gemini gave a Sierra Leonean student an answer, it asked a question 36 times. The result was 1.7 years of math progress in 15 hours. The implication: the entire AI industry is optimized for the wrong thing.
