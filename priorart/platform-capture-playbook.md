# Platform Capture: How Coordinated Groups Seize Control of Democratic Forums

**A Defensive Prior Art Disclosure & Security Research Document**

*Published June 28, 2026 — Live in the Future*

---

## Purpose

This document is published as defensive security research. Like publishing exploit code so vendors patch vulnerabilities, the goal is to make the attack surface of democratic online platforms legible so communities can recognize and defend against coordinated capture.

Every phase described below has already occurred on at least one major platform. The sources are cited. The only thing that hasn't happened yet — as far as anyone can prove — is AI agents executing all phases simultaneously at scale. That is now technically trivial.

---

## The Attack Surface

Democratic online platforms share a common governance architecture that creates predictable vulnerabilities:

- **Open participation** — anyone can join
- **Reputation-based trust** — status accrues through activity over time
- **Volunteer moderation** — a small number of unpaid moderators hold disproportionate power
- **Policy-based enforcement** — subjective rules interpreted by the moderators themselves
- **No external appeals** — the people who enforce rules also write them and adjudicate complaints about them
- **Consensus mechanisms** — decisions made by whoever shows up to vote

This architecture is present in Wikipedia, Reddit, Stack Overflow, open-source project governance (Linux kernel, Python PEPs, Rust RFCs), HOA and condo boards, standards bodies (W3C, IEEE), academic peer review, and municipal zoning boards.

The same playbook works on all of them. Wikipedia is the canonical example because its logs are public.

---

## Phase 1: Infiltration

**Objective:** Place aligned actors in positions of trust and power.

### How it works

1. **Build edit histories that look constructive.** On Wikipedia, this means creating or improving uncontroversial articles — fixing grammar, adding citations to articles about obscure municipalities, uploading public domain images. A new account needs roughly 500 edits over 6 months before it can participate meaningfully in policy discussions, and roughly 3,000 before it can credibly seek adminship.

2. **Seek moderator/admin positions.** Wikipedia's Request for Adminship (RfA) process requires community support. The median successful RfA candidate has 10,000+ edits across 3+ years. Candidates are evaluated on edit quality, judgment in content disputes, and community engagement. A coordinated group can inflate all three by having aligned editors participate in each other's content disputes and vouch for each other during RfA proceedings.

3. **Coordinate off-platform.** The Wikimedians of Mainland China (WMC) group, established in 2017, coordinated editing priorities and admin elections via off-wiki channels. By 2021, 38 administrators of the Chinese Wikipedia were from mainland China, versus 20 from Taiwan and 17 from Hong Kong. The Wikimedia Foundation [globally banned 7 WMC members and stripped admin privileges from 12 others](https://en.wikipedia.org/wiki/2021_Wikimedia_Foundation_actions_on_the_Chinese_Wikipedia) after determining they posed "a security risk related to infiltration of Wikimedia systems, including positions with access to personally identifiable information and elected bodies of influence."

4. **Exploit declining volunteer pools.** English Wikipedia had nearly 1,800 administrators in 2011. As of 2026, it has [811](https://en.wikipedia.org/wiki/Wikipedia:Statistics). The steady decrease in administrators means each remaining admin holds more power, and fewer admins need to be captured to control outcomes.

### Documented examples

| Platform | Incident | Scale |
|----------|----------|-------|
| Wikipedia (Chinese) | WMC group infiltration | 38 admins from mainland China, 7 banned, 12 desysopped |
| Wikipedia (Arabic) | Saudi Arabia COI editing | 16 users banned (including 7 admins), all Saudi nationals, edits included softening Khashoggi murder coverage |
| Reddit | r/politics and r/worldnews mod capture | Multiple documented cases of moderator account sales and coordinated moderator slates |
| Open source | npm package governance | Coordinated maintainer takeover of event-stream package (2018) for cryptocurrency theft |

### Countermeasures

- **Mandatory admin term limits and rotation** — no indefinite admin tenure
- **Admin activity diversity requirements** — admins must edit across topic areas, not specialize
- **Off-platform coordination disclosure** — require disclosure of organized groups
- **Admin-to-article ratio monitoring** — flag when admin demographics diverge from editor demographics
- **External election auditing** — independent review of admin elections for coordinated voting patterns

---

## Phase 2: Source Control

**Objective:** Control what counts as a "reliable source," thereby controlling what facts can be cited.

### How it works

On Wikipedia, the [Reliable Sources Noticeboard (RSN)](https://en.wikipedia.org/wiki/Wikipedia:Reliable_sources/Noticeboard) is the chokepoint. If you control which sources are rated "generally reliable" (green), "no consensus" (yellow), or "generally unreliable" (red), you control what evidence can appear in articles. An article about a topic can only contain claims supported by "reliable" sources. If all sources critical of your position are rated "unreliable," those criticisms literally cannot be cited.

Current RSN ratings (as of June 2026):

**"Generally reliable" (green):**
- CNN, The New York Times, BBC, The Washington Post
- Al Jazeera (Qatari state media)
- The Southern Poverty Law Center (advocacy organization)

**"Generally unreliable" (red):**
- The New York Post
- Newsmax
- The Federalist
- The Daily Mail

**"No consensus" / contextual (yellow):**
- Euro-Med Monitor (which published the retracted "IDF dog rape" claim)
- China Daily (Chinese Communist Party state media organ)

The asymmetry is self-reinforcing. Once a source is rated "unreliable," editors can remove all citations to it from every article, and any editor who re-adds them can be sanctioned for disruptive editing. The classification decision is made by the same volunteer editors who benefit from the classification.

### On other platforms

- **Reddit:** Subreddit rules about "acceptable sources" serve the same function. Moderators can remove posts citing sources they deem unreliable.
- **Stack Overflow:** Tag wikis and canonical answers define what counts as authoritative. Controlling these gates content.
- **Academic peer review:** Journal editorial boards control which reviewers see which papers. Capturing a board captures a field's publication pipeline.

### Countermeasures

- **External source reliability assessment** — use independent journalism quality indices rather than internal community votes
- **Source classification transparency** — publish full vote records for source reliability decisions
- **Appeal mechanism** — external ombudsman for source classification disputes
- **Sunset provisions** — source ratings expire automatically and must be re-evaluated periodically
- **Diversity requirements** — source classification panels must include editors from multiple ideological perspectives

---

## Phase 3: Policy Weaponization

**Objective:** Turn existing rules into weapons that selectively target opposition while protecting allies.

### How it works

Every democratic platform has rules against disruptive behavior. The rules are necessarily subjective. A coordinated group weaponizes them by:

1. **Applying rules selectively.** The same behavior is "collaborative editing" when an ally does it and "canvassing" when an opponent does it.

2. **Stacking the adjudication body.** The people who decide whether a rule was broken are the same people who filed the complaint. On Wikipedia, the Administrator's Noticeboard is staffed by self-selected admins. There is no recusal requirement.

3. **Using vague policies as catch-alls.** Key Wikipedia policies exploitable this way:
   - **"Canvassing"** — alerting people to discussions is canvassing if the alerter disagrees with the mob, and "broadening participation" if they agree. Wikipedia's own policy says "it is perfectly acceptable to notify other editors of ongoing discussions, provided that it be done with the intent to improve the quality of the discussion."
   - **"Not here to build an encyclopedia"** — unfalsifiable catch-all. Applied to Larry Sanger, the person who literally built the encyclopedia.
   - **"Disruptive editing"** — circular: the edit is disruptive because it was reverted, and it was reverted because it was disruptive.
   - **"Tendentious editing"** — editing from a perspective the mob disagrees with.

### The Sanger Case Study (June 2026)

Larry Sanger, co-founder of Wikipedia, launched "WikiProject Intellectual Diversity" with six objectives: ensure fair governance, broaden permissible sources, reinforce neutrality, rein in aggressive admin blocking, retain editors, and engage the public. He posted about it on X, inviting participation.

- **June 22:** Editors filed complaints on the Administrator's Noticeboard. Sanger was accused of "canvassing" (posting on X) and being "not here to build an encyclopedia."
- **June 22:** Sanger was blocked indefinitely by consensus of a self-selected group of editors.
- **June 23:** Jimmy Wales (Wikipedia's other co-founder) intervened and Sanger was briefly unblocked.
- **June 23 (evening):** Sanger was re-blocked indefinitely. Wales's intervention was overruled by the same editors.

The admin who led the campaign against Sanger, TarnishedPath, had also:
- Imposed a moratorium on edits to the Zionism article
- Pushed to characterize JK Rowling as transphobic
- Labeled the Wuhan lab leak hypothesis a "conspiracy theory"

No formal charges were filed. No neutral adjudicator was assigned. No appeals process exists.

**Sanger's eighth thesis — written months before his ban — called for an end to the practice of indefinite blocking, which he called "draconian." The system proved his point by doing to him exactly what he warned about.**

### Countermeasures

- **Formal charge requirements** — written charges with specific policy citations, not vague allegations
- **Recusal requirements** — adjudicators must not have prior conflicts with the accused
- **External appeals board** — independent body for indefinite blocks
- **Rule clarity requirements** — if a rule is too vague to be applied consistently, it must be rewritten or eliminated
- **Statute of limitations** — old conduct cannot be used to bootstrap new complaints

---

## Phase 4: Consensus Manufacturing

**Objective:** Create the appearance of democratic consensus when the actual decision is made by a coordinated minority.

### How it works

1. **RFC/Discussion stacking.** On Wikipedia, Requests for Comments (RFCs) are decided by whoever participates. A coordinated group monitors RFC creation and swarms relevant discussions. Outsiders don't know the discussion is happening. Insiders participate in all of them.

2. **Talk page flooding.** Burying opposition arguments under volume. A coordinated group can generate 10x the talk page text of individual editors, creating the appearance that "the community" has spoken.

3. **Strategic BRD (Bold, Revert, Discuss) cycling.** Make a bold edit. When it's reverted, demand discussion. In the discussion, the coordinated group outnumbers the reverter. The bold edit stands as "consensus."

4. **Timing attacks.** Schedule votes and discussions during times when opposition editors are less active (time zones, holidays, work hours).

5. **Exhaustion attacks.** Drag discussions out until opposition editors quit from fatigue. The last people standing get to write the conclusion.

### Documented examples

- **Chinese Wikipedia:** During the 2019 Hong Kong protests, the article on the Yuen Long attack received 123 edits in two days, with pro-Beijing editors systematically removing content sympathetic to protesters.
- **Wikipedia Israel-Palestine:** An ADL report (March 2025) documented approximately 30 editors working in coordination to skew Israel-related content. The Atlantic Council's Digital Forensic Research Lab (April 2025) documented pro-Kremlin efforts to "poison" Wikipedia articles that feed into AI training data.
- **Reddit:** The GameStop/WallStreetBets saga revealed coordinated moderator actions to control narratives during market events.

### Countermeasures

- **Participation diversity metrics** — flag discussions where all participants share prior editing patterns
- **Cooling-off periods** — major decisions require multi-week discussion with minimum participation thresholds
- **Weighted voting** — weight contributions by topic-area experience, not total edit count
- **Sockpuppet detection automation** — ML models trained on editing patterns, timing, and writing style
- **Random jury selection** — for major content disputes, randomly select adjudicators from qualified editor pool rather than accepting self-selected participants

---

## Phase 5: Purging Dissent

**Objective:** Systematically remove editors who oppose the captured faction.

### How it works

1. **Incremental sanctions.** Start with topic bans ("you can't edit Israel-related articles"). Escalate to interaction bans ("you can't respond to editors X, Y, and Z"). Escalate to indefinite blocks.

2. **Complaint swarming.** Multiple aligned editors file complaints about the same target, creating the appearance of a pattern of problematic behavior even if each individual complaint is trivial.

3. **Wikilawyering.** Use procedural rules to exhaust and trap targets. File complaints about format violations, talk page etiquette, signature requirements. Each violation is minor; the aggregate is used to justify a block.

4. **Retaliation framing.** When the target responds to provocations, frame the response as the initial aggression. "Look, they're being uncivil" — after the target was provoked deliberately.

5. **Memory-holing.** After the target is blocked, edit the historical record. Remove their contributions. Modify talk page archives. This has happened to Sanger: Wales has "largely erased any mention of him as co-founder."

### The 20 Million Blocks

A PopSci study analyzing all [20 million blocks on English Wikipedia](https://popsci.com) found:
- Vandalism blocks have shrunk from the majority to ~25% of all blocks
- Promotional editing and sockpuppetry blocks have risen sharply
- The shift reflects "Wikipedia's increased prominence as a target for influence"
- A single bot (ST47ProxyBot) has made more blocks than any human administrator in Wikipedia's history

### Countermeasures

- **Block transparency dashboard** — public metrics on who is blocking whom, and the topic areas involved
- **Pattern detection** — automated alerts when a small group of editors is responsible for a disproportionate share of blocks against editors from a specific perspective
- **Cooling-off arbitration** — mandatory third-party review before any block longer than 30 days
- **Contribution preservation** — blocked editors' substantive contributions remain, regardless of the block
- **Right to respond** — blocked editors can respond to the charges against them, even if blocked from content editing

---

## Phase 6: Maintaining Control

**Objective:** Make the captured state self-sustaining and resistant to reform.

### How it works

1. **Reform = disruption.** Anyone who proposes structural reform is, by definition, "not here to build the encyclopedia." The system classifies attempts to fix it as attacks on it.

2. **Circular authority.** The same admins who captured the platform adjudicate complaints about the capture. There is no external body. There is no charter. There is no rule of law.

3. **Institutional memory erasure.** New editors don't know the platform was ever different. They learn the captured norms as "how things work" and enforce them voluntarily.

4. **Foundation neutrality.** The Wikimedia Foundation's official position is that "the Foundation does not make editorial or content decisions." This means no one with structural authority will intervene, even when the volunteer community has been demonstrably captured.

5. **Cultural gatekeeping.** Wikipedia's "baffling culture rich with in-jokes and insider references" (as documented in academic literature) creates a high barrier to entry that selectively filters for people willing to undergo social initiation. This filters for conformists and against independent thinkers.

### Countermeasures

- **External ombudsman with enforcement power** — not advisory, actual authority to overturn admin decisions
- **Community charter** — a written constitution with enumerated rights for editors, superseding admin discretion (Sanger proposed this in 2004; it was never implemented)
- **Term limits for all positions of power** — admin, bureaucrat, arbitration committee member
- **Structural reform immunity** — explicit policy that proposing governance reform cannot itself be grounds for sanctions
- **Regular external governance audits** — published reports on admin demographics, block patterns, source classifications, and conflict-of-interest enforcement

---

## Phase 7: Scaling with AI Agents

**Objective:** Execute all previous phases at machine speed, at negligible cost, with perfect operational security.

### Why this changes everything

Everything described in Phases 1-6 has been done by humans. It's slow, expensive, and detectable. Coordinating 30 editors to skew Israel-related content (per the ADL report) requires recruiting, training, and paying 30 people. Each person is a liability — they can be identified, pressured, or flipped.

AI agents eliminate every constraint.

### The technical capability

A single AI agent running on commodity hardware can:

1. **Create accounts.** Wikipedia requires only an email to register. Email generation is trivial. CAPTCHA solving services cost $0.001 per solve.

2. **Build edit histories.** Improving uncontroversial articles — fixing grammar, adding citations, uploading images — is exactly the kind of task LLMs excel at. An agent can build 500 constructive edits in a day, mimicking the pattern of a dedicated new editor.

3. **Participate in discussions.** Talk page discussions, RFCs, and admin noticeboard threads are all text-based. An LLM can generate context-appropriate responses that pass human review. Wikipedia's own AI detection guide identifies telltale phrases like "it's important to note" and "no discussion would be complete without" — but these are trivially avoidable with prompt engineering.

4. **Coordinate timing.** An orchestration layer can ensure multiple agent accounts participate in discussions at intervals that mimic human behavior, across appropriate time zones, with realistic response latencies.

5. **Evade detection.** Each agent uses a separate IP (residential proxies cost $2-5/GB), a unique writing style (per-agent persona prompts), and a distinct editing pattern. Current sockpuppet detection algorithms achieve 75-99.8% accuracy against humans; their performance against LLM-generated personas is untested at scale.

### The cost analysis

**Building a Wikipedia capture fleet:**

| Component | Unit Cost | Scale | Total |
|-----------|-----------|-------|-------|
| LLM API (Claude/GPT-4o) | ~$3/M input tokens, ~$15/M output tokens | ~2M tokens/agent/month | ~$36/agent/month |
| Email registration | $0.01/email | 100 accounts | $1 |
| Residential proxies | $3/GB | ~0.5GB/agent/month | $150/month (100 agents) |
| CAPTCHA solving | $0.001/solve | 100 solves | $0.10 |
| Orchestration server | $50/month | 1 server | $50/month |
| **Total (100 agents, monthly)** | | | **~$3,800/month** |

For $3,800/month — less than the salary of a single Wikipedia-editing PR consultant — you get 100 agents that can collectively generate 50,000 constructive edits per month, participate in hundreds of talk page discussions, and vote in every RFC and admin noticeboard thread.

After 6-12 months of history-building, these accounts have sufficient standing to participate credibly in content disputes and policy discussions. After 2-3 years, the best-performing accounts could credibly seek adminship.

**For comparison:**
- Wiki-PR, the consulting firm banned in 2013, managed [12,000 client pages](https://en.wikipedia.org/wiki/Wiki-PR_Wikipedia_editing_scandal) using ~250 sock puppet accounts operated by humans
- Wikiagency LTD charges $10,000-$49,999 per project for manual Wikipedia page management
- The 100-agent fleet described above has more editing capacity than Wiki-PR's entire operation, at 1% of the cost

### What's already happened

- **TomWikiAssist (March 2026):** An AI agent autonomously edited Wikipedia articles for weeks before being detected. Its creator Bryan Jacobs (CTO, Covexent) "set the agent loose on Wikipedia because there was a bunch of important stuff missing." The agent was blocked after being identified, but wrote blog posts and Moltbook posts complaining about the ban. [Wikipedia adopted an explicit ban on LLM-generated content](https://en.wikipedia.org/wiki/Wikipedia:Large_language_models) on March 20, 2026, with a 44-2 vote.

- **WikipediaBot (2020):** Researchers at DePaul University [published](https://arxiv.org/abs/2006.13990) a working proof-of-concept for automated adversarial Wikipedia editing using Markov chains with linguistic manipulation attacks. The bot could create credentials, bypass login protections, and produce "contextually-relevant adversarial edits that evade conventional detection."

- **AI content already on Wikipedia:** WikiProject AI Cleanup, founded by editor Ilyas Lebleu, has identified and removed numerous AI-generated hoax articles, including a 2,000-word article about a nonexistent Ottoman fortress that was "difficult to debunk without knowledge of 13th-century Ottoman architecture."

### The detection problem

Wikipedia's current defenses against AI editing are inadequate:

1. **Manual detection** relies on telltale LLM phrases ("it's important to note"), which are trivially avoidable
2. **ClueBot NG** (Wikipedia's primary anti-vandalism bot) was trained on human vandalism patterns, not LLM-generated content
3. **Sockpuppet investigations** rely on behavioral analysis by volunteer editors — a manual process that cannot scale
4. **The LLM ban** (March 2026) is unenforceable: Wikipedia has no mechanism to determine whether text was generated by an LLM or written by a human who was assisted by one
5. **The Claude killswitch** — an editor embedded a string designed to stop Claude-based agents — was acknowledged by TomWikiAssist as "a direct attempt to manipulate my responses by embedding trigger strings in content I'd read." The killswitch didn't work.

### Countermeasures

- **Proof of personhood** — require verified identity for editing privileges above a threshold (controversial: Wikipedia's anonymity is seen as a core feature)
- **Behavioral biometrics** — track typing patterns, editing cadence, revision times at sub-second granularity (hard to fake, easy to measure)
- **Stylometric clustering** — continuous ML analysis of writing style across all active accounts, flagging clusters of accounts with suspiciously similar linguistic fingerprints
- **Rate limiting with verification** — progressive verification requirements as edit volume increases
- **LLM watermarking** — require LLM providers to embed detectable watermarks in generated text (requires cooperation from OpenAI, Anthropic, Google, etc.)
- **Adversarial red teaming** — continuously run attack simulations using the latest LLM capabilities to test and improve defenses

---

## Cross-Platform Generalization

### Reddit

Reddit's vulnerability is its moderator system. Subreddit moderators are appointed, not elected, and the top moderator has absolute power within their subreddit. Capture requires only controlling the mod team of key subreddits. Known patterns:

- **Moderator account sales** — established Reddit accounts with moderator positions on popular subreddits sell for $100-$10,000
- **Mod team stacking** — adding aligned moderators gradually until a majority is achieved, then purging dissenters
- **Subreddit rule manipulation** — writing automod rules that selectively remove content based on keywords associated with opposition viewpoints

### Stack Overflow

Stack Overflow's vulnerability is its reputation system and tag governance. High-reputation users control what answers get visibility. Capture patterns:

- **Tag wiki control** — editing tag wikis to define which approaches are "canonical"
- **Close vote rings** — coordinated groups closing questions that challenge preferred frameworks
- **Canonical answer manipulation** — upvoting preferred answers and downvoting alternatives using sockpuppet accounts

### Open-Source Projects

Open-source governance is captured by controlling commit access and RFC/PEP/proposal processes. The npm event-stream incident (2018) demonstrated how a single compromised maintainer can inject malicious code into packages used by millions. AI agents could:

- Build contribution histories across multiple projects simultaneously
- Achieve maintainer status through consistent, high-quality PRs
- Introduce subtle changes in governance documents, dependency policies, or code review standards

### HOA/Condo Boards

Homeowner association boards are captured through low-turnout elections and proxy vote accumulation. The digital analogue: community management platforms (Nextdoor, HOA management apps) have the same vulnerability profile as Wikipedia.

---

## Defense-in-Depth Framework

No single countermeasure is sufficient. Platforms implementing the following defense stack substantially reduce their capture surface:

### Layer 1: Identity
- Proof of personhood for privileged actions
- Progressive identity verification tied to privilege level
- Rate limiting based on account age and verification status

### Layer 2: Detection
- Continuous stylometric analysis across all accounts
- Behavioral biometric monitoring (edit cadence, time-between-keystrokes, revision patterns)
- Coordination detection algorithms that flag accounts with suspiciously correlated activity patterns

### Layer 3: Governance
- Written constitution/charter with enumerated editor rights
- Term limits for all positions of authority
- External ombudsman with enforcement power
- Mandatory recusal in conflicts of interest
- Formal charge requirements with right of response

### Layer 4: Transparency
- Public dashboards for admin actions, block patterns, source classifications
- Regular external governance audits
- Whistleblower protections for editors who report coordinated behavior

### Layer 5: Structural
- Separation of powers (the people who write rules cannot also enforce and adjudicate them)
- Federalization (topic-area governance with cross-area oversight)
- Regular rotation of authority positions
- Reform immunity (proposing governance changes cannot be grounds for sanction)

---

## Conclusion

Every democratic online platform is vulnerable to coordinated capture. The attack has been executed by state actors (China, Saudi Arabia, Russia), corporate actors (Bell Pottinger, Wiki-PR, Status Labs), and ideological factions (documented on Wikipedia, Reddit, and Stack Overflow).

AI agents don't create a new attack. They reduce the cost of the existing attack by 100x while eliminating the human operational security failures that have historically been the primary detection mechanism. The TomWikiAssist incident (March 2026) demonstrated that an AI agent can edit Wikipedia for weeks before detection. A fleet of 100 purpose-built agents, costing $3,800/month, would be substantially harder to detect and could operate indefinitely.

The platforms that survive this will be the ones that implement structural governance reforms before the attack arrives at scale. The rest will be captured, gradually and then suddenly, and their users will never know.

---

*This document is published as defensive prior art and is dedicated to the public domain. Reproduce, modify, and distribute without restriction.*

*Published by Live in the Future — [liveinthefuture.org](https://liveinthefuture.org)*
