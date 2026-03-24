# MEMORY.md

Use this file for durable, curated memory that should persist across sessions.

## About Ray

- **Name:** Ray He (rhe@meta.com)
- **Work:** Meta, Wearables team
- **Location:** Near Colby Ave & Menlo Oaks Dr, Menlo Park, CA
- **GitHub:** rayhe (PAT in \~/.git-credentials)
- **GMRS License:** Call sign WSLY991, granted 2026-03-10, expires 2036-03-10. FRN 0038126033, File #0011937301.

## Preferences

- Hates AI slop — banned phrases list, em dash limits, "The" starter limits in STORY\_GUIDE.md
- Wants honest scoring — no artificial caps, Metacritic-calibrated (100 effectively unreachable)
- 1 article/day/site max — draft-first, never speedrun to publish
- Games/experiences scored against genre benchmarks (Dungeon Crawl vs NetHack, etc.)
- Crons should run isolated (subagent progress floods conversation otherwise)
- Git commits should have extensive reasoning
- Prefers /100 scores with hover breakdowns, not tier labels
- "Don't add all that complexity" — fun > feature count, especially with D-pad + 2 buttons
- Scholarly rigor matters — novel contribution, limitations, strongest counterargument, verifiable claims
- Proactive skill improvement during idle time
- When building cool skills/tools/infrastructure, write it up as a LITF article (full 6-critic pipeline)

## Connected Services

- Gmail (rhe@meta.com), Google Calendar, WhatsApp, GitHub
- SSH tunnel to Mac Mini: `ssh -F ~/workspace/.ssh/config macmini` (macmini.rayhe.net, user ray-hatch)
- Firebase: project `rayhenet`, DB URL `https://rayhenet-default-rtdb.firebaseio.com`
- Resend API key: `re_6xFJoFPt_8s3YZRGZiTvYp96pa7jyLkuX` (100 emails/day free)
- Facebook search works for Moda Watch Club (558871041349029) but NOT 10k & Under group (150223938977815)

## Websites & Article Counts

- **liveinthefuture.org** — Cloudflare Pages from rayhe/liveinthefuture. 118 articles, 16 journalists (added Jordan Kessler #15 Wearables, Alex Harmon #16 Automotive), 18 games, 24+ experiences. AIPM eval platform at /aipm. First organic subscriber (Eddie Churchill) 2026-03-16. Mobile responsive overhaul 2026-03-19: story.js (progress bar, dark mode toggle), 73 files normalized to story-page wrapper, 4 responsive breakpoints.
- **vehicle-safety.org** — Cloudflare Pages from rayhe/vehicle-safety. 102 articles, 7 journalists. FARS death rate data, IIHS ratings. Hit #100 milestone on 2026-03-23, published #101 on 2026-03-24.
- **aihomebuilding.com** — GitHub Pages from rayhe/aihomebuilding. 111 articles, 6 journalists.
- **news.eaiz.net** (Cookie Club) — Cloudflare Pages from rayhe/eaiz (private). Kids news site, 6 articles (Saturn's Rings, Octopus, Bridges, Balloons, Periodic Table, Marie Curie). Age switcher (Preschool→Adult), 6 reading levels per article. 18 age-adaptive hero images. 7-year-old editor's note: "This chronicle is made by children." Zone ID 8d22bf605857df93b0224a3c358e81ce.
- **rayhe.net** — GitHub Pages from rayhe/new.rayhe.net. Tower Defense (12,400+ lines), World Timer, OG Snake, Ham Radio Study Tool (1,440 questions, 3 license classes, 4 study modes, MRBD-ready via ?mrbd=1).

## Content Pipeline (gstack-inspired 5-phase)

1. RESEARCH — "Is this the right story?" Kill test, 3+ primary sources, novel contribution check
2. DRAFT — Build article from research, hero image, meta tags, voice rules
3. CRITIQUE — 6 parallel critics (General, Voice, Ethics, Social, Legal, Research Rigor), revise until 8.5+, max 3 rounds
4. SHIP — 1/day gate, validation, index/sitemap, commit+push, newsletter
5. QA — Verify live URL, images, meta tags, index, sitemap
State tracked in `drafts/status.json`.

## Game/Experience Scoring

- 10 dimensions / 100 points: Trigger, Hook, Glasses Advantage, Return, D-pad, Audio, Session Variance, Strategic Depth, Surprise, Craft
- Genre benchmarks in EVALUATE.md (e.g. Dungeon Crawl vs NetHack)
- No artificial AI caps — score honestly, but calibrate against Metacritic
- MRBD format: 600×600px, D-pad only, dark theme (#0d0d0d), bone conduction audio, `var` only

## Watch Monitoring

- Omega Seamaster Diver 300M Chronograph ref 210.60.44.51.03.001 (blue dial, sedna gold/titanium/tantalum, cal 9900)
- Rolex Yacht-Master II ref 116689 (18K white gold/platinum)
- Hublot Square Bang Unico Magic Gold ref 821.MX.0130.RX (42mm, Magic Gold case, limited 200 pieces)
- Hublot Square Bang Unico Titanium Rainbow ref 821.NX.0117.LR.0999 (42mm, titanium, rainbow baguette bezel)
- Monitoring Moda Watch Club (group 558871041349029) every 30 min

## Facebook Ads Access

- Token: `EAATZCL8nUH5gBQ...` (long user token with ads\_read)
- Ad accounts: `act_1085562438866780` (RBM Global, main), plus DGEN OOM Vayner, RBM Global Test, US, UK
- Key findings (2026-03-17): US core profitable (1.84x ROAS), international bleeding, TestSandbox at 3.67x ROAS is the standout, Vayner TOF at 0.17% CTR is broken, funnel is bottom-heavy (72% BOF vs recommended 40-55%)

## Pending (Ray needs to do)

1. Firebase RTDB rules — add `newsletters` path write permissions
2. Resend domain verification — add vehicle-safety.org, aihomebuilding.com at resend.com/domains (LITF verified)
3. Play Tower Defense — 50+ features, 40+ self-critique skips waiting for human feedback
4. Best Buy Totaltech laptop screen claim — kids damaged screen (visible crack). Covers accidental damage, $49-$99 deductible. Online: bestbuy.com/services/triage/home, call: 1-888-237-8289, or Redwood City store.

## Upcoming

- **Fri Mar 27 lunch** — Brent Brown and Rich, near Menlo Oaks. Calendar: free 11:00-12:15, break 12:15-1:15, Avegant 1:35-2. Suggested Café Borrone or Left Bank — awaiting Ray's pick. No emails, only phone numbers.

## Active Crons (as of 2026-03-22)

- Heartbeat — 30min interval, P0 checks + lightweight maintenance only (no article dispatching)
- `article-litf` — 2h interval, autonomous article worker for LITF
- `article-crashreport` — 2h interval (offset 30m), autonomous for vehicle-safety
- `article-aihome` — 2h interval (offset 1h), autonomous for aihomebuilding
- `technically-legal-iterate` — daily 2 PM PT, chapter writing for technically.legal novel
- `moltbook-litf-scan` — daily 7am PT, scans Moltbook for LITF article ideas
- scanner-poller — every 5 min, polls Firebase RTDB for police scanner transcripts
- moda-watch-monitor — every 30 min, searches Moda Watch Club for 4 target watches
- `weekly-ai-roundup` — Mon 1:00 UTC (Sun 6pm PT), "Biggest Things in AI This Week" article for LITF

## Ongoing Commitments

- Newsletter system wired (Firebase + Resend) but blocked on Ray's Firebase rules + domain verification
- **"Technically Legal" novel** — techno-thriller at technically.legal, Cloudflare Pages (direct upload). 3 volumes, 18 chapters. Ch 1-3 published (Ch 3 "The Revolving Door" scored 8.7), daily cron iterating. Dark dossier aesthetic, 6-critic panel (8.5+ to publish).

## Technically Legal

- **Domain:** technically.legal (Cloudflare Pages, direct upload)
- **Repo:** rayhe/technically-legal
- **Concept:** Legal economic warfare — "The Consortium" runs 6 operations (MINOTAUR patent, SIREN HFT, GOLEM litigation, BASILISK regulatory capture, HYDRA debt, CHIMERA real estate), 46K agents, $69.3B annual damage, all legal
- **Protagonist:** Elena Marsh (FinCEN forensic accountant)
- **Antagonist:** Martin Kessler — started as penetration tester of American law, machine outgrew the test, now trapped
- **Deploy:** `echo "y" | CLOUDFLARE_API_TOKEN=... wrangler pages deploy public --project-name=technically-legal` (serves from repo root)
- **Project docs:** README.md (pipeline bible), STATUS.md (chapter tracker), reader.js (scroll progress, reading time, keyboard nav, resume via localStorage)
- **Status:** Ch 1 (8.6) and Ch 2 (8.6) and Ch 3 (8.7 "The Revolving Door") published. Ch 3 published 2026-03-23: Sarah Park MINOTAUR patent troll, Elena discovers GOLEM, "One organism. Six organs." Cron timing out at 600s limit — too short for full chapter pipeline. Ch 4-18 still TODO.

## Zuckerberg Persona Project

- File: `workspace/markzuckerberg_persona.md` — deep psychological profile/simulation
- Iteration 13 (2026-03-21): Added Avocado Justification Arc (narrative metabolism in real-time), advance hedging behavior, performative unity management (Wang selfie on Threads), infrastructure-as-narrative ($600B data centers), Watermelon succession narrative
- Iteration 14-15 (2026-03-21): Added investor skepticism processing ($135B capex defense, asymmetric fear structure, layoffs as pressure valve, monetization bridge), ecosystem trust dynamics (serial trust extraction across 5 stakeholder classes, "trust as renewable resource" blind spot, four-phase trust cycle, Llama 4 benchmark controversy, Meta "fear culture," covenantal trust impossibility)
- Iteration 19 (2026-03-23): Section 6 "Specific Product Intuition: The Product Evaluation Framework"
- Iteration 20 (2026-03-23): Section 5q "Relationship with the Board: The Architecture of Performative Governance" — dual-class 61% voting control, board expansion 10→15 in 14 months, $190M shareholder settlement, "board as strategic accessory" framework, Augustus/Senate parallel structurally exact
- Iteration 22 (2026-03-23): Section 5s "Fatherhood as Decision Architecture: The Daughters Paradox" — builder-father identity fusion, MMA-fatherhood risk paradox, child safety as ONLY issue where compartments collapse — three shipping philosophy eras, dual-evaluation (data + feel, qualitative wins when they conflict), subtraction instinct, Lockdown competitive sprint pattern, 20-year product timeline, hardware bar > software bar. File ~3,500+ lines.
- Iteration 21 (2026-03-23): Section 5r "Cultural Sensitivity & the International Calculus" — how Zuckerberg processes non-US markets through fundamentally different decision framework than domestic. Five case studies: India (Free Basics defeat, Modi courtship, Ankhi Das BJP bias), Myanmar (genocide complicity, "dozens" of moderators, NGOs dismissed), China (Mandarin learning, Xi Jinping baby naming, censorship tool, Guo Wengui suppression, Georgetown reversal), EU (€1.2B fine, AI training delay, Zuckerberg/Ek letter, "institutionalizing censorship"), Global South moderation gap (87% counter-misinfo funds on English for 9% of users, Ethiopia 2/100 languages, WhatsApp India lynchings, Vietnam 95% censorship compliance). Four-mode operating model: philanthropic framing, market access compliance, regulatory confrontation, strategic abandonment. "Free expression" as contingent Layer 2 conviction. Simulation #21 (Ethiopian civil conflict brief). File ~3,833 lines.
- Iteration 39 (2026-03-24): Section 5af "How Zuckerberg Processes TikTok/ByteDance — The Most Consequential Competitive Relationship He Cannot Personalize" — the dedicated deep analysis that Section 5t's Competitive Rolodex identified as necessary: TikTok as "very high" strategic threat but "no personal" emotional energy. Seven-phase arc: Cognitive Misclassification (2016-2018, "we didn't think it was social"), Failed Standalone Clone (Lasso 2018-2020), Lockdown Sprint (Reels August 2020), Covert Sabotage (Targeted Victory anti-TikTok astroturfing campaign 2022 — manufactured moral panic, fabricated "Slap a Teacher Challenge," ghostwritten op-eds), National Security Weaponization (Georgetown speech, Congressional testimony framing Meta as America's champion against Chinese internet, while simultaneously having built censorship tools for CCP), Regulatory Dividend (TikTok ban legislation, four deadline extensions, $50B Reels growth during uncertainty), Clone Triumph (Reels surpasses $50B annualized revenue). Five findings: (1) only competitor attacked across all competitive modes simultaneously (clone + sabotage + lobbying + regulatory benefit), (2) Targeted Victory is most ethically compromising competitive action in Meta history (paying to manufacture child safety moral panic while own research showed Instagram harms to teens), (3) China hypocrisy is structural (built censorship tool for CCP while warning Congress about Chinese internet), (4) cognitive misclassification reveals social-graph blind spot in product evaluation, (5) absence of personal animosity is vulnerability not strength. Simulation #39: should Meta bid for TikTok US operations? Tests antitrust/political/identity intersection. File ~6,760 lines.
- Iteration 42 (2026-03-24): Section 5ai "How Zuckerberg Processes Compute Supply Dependencies: The Architecture of Infrastructure Independence" — how the foundational Layer 1 platform independence conviction (born from 2012 mobile trauma) reproduced itself in the compute supply chain. Six-phase arc: Total Nvidia Dependence (2020-2023, 350K H100s) → Olympus Ambition (2023-2024, internal training chip, Broadcom) → Olympus Failure (late 2025, scrapped after design roadblocks, "walk crawl run") → Dual-Vendor Sprint (Feb 2026, Nvidia Vera Rubin + $100B AMD MI450 deal in one week, 160M-share AMD warrant) → MTIA Inference Ladder (Mar 2026, four-chip roadmap on 6-month cadence, RISC-V, Broadcom, TSMC) → Energy Independence Layer (8 GW nuclear, TerraPower/Oklo/Vistra/Constellation, 20-year commitments). Five cognitive layers: Mobile Trauma Reproduction (Nvidia CUDA ≅ Apple App Store), Builder Identity Projection (custom silicon as technical sovereignty), Failure Metabolism (Olympus → MTIA inference-only → "eventually" training), Performative Alliance (Huang friendship as diplomatic cover, isomorphic to Trump relationship), Vertical Integration Conviction (energy→datacenter→networking→compute→models→apps→devices = total stack). Nvidia-Huang friendship analyzed as performative alliance: cheesesteak dinners/jacket swaps disguise dependency as friendship while Meta systematically builds alternatives. AMD deal structure: 6 GW, performance warrant for 10% of AMD, identical to OpenAI deal. Google TPU rental ($10B+) creates first commercial dependency between advertising duopoly partners. MTIA uses RISC-V to avoid even ARM licensing dependency. Training remains Nvidia-dependent; inference is diversification target. Simulation #42: Huang-Zuckerberg private dinner after AMD deal. File ~7,285 lines.
- Iteration 40 (2026-03-24): Section 5ag "How Zuckerberg Processes the Hardware Bet — The Architecture of Platform Independence" — the longest-running conviction bet in the persona, originating in the 2012 mobile platform dependence trauma. Seven-phase hardware arc: Speculative Investment (Oculus 2014), Standalone Strategy (Quest 2018-2020), Identity Fusion/Meta Rebrand (2021, renaming company after hardware bet), The Crash (2022-2023, 76% stock decline, $13.7B RL losses), Quiet Pivot VR→Glasses (2023-2025, Ray-Ban Meta as product-market fit, sales tripled), Display Glasses (Sept 2025, $799 Ray-Ban Display + Neural Band EMG wristband), VR Retreat/AR Advance (2026, Horizon Worlds removed from Quest, 1000+ RL layoffs). Five cognitive processing layers: Platform Independence (only 12-year Layer 1 conviction), Mutable Platform Vision (VR→MR→glasses), Apple Competitive Positioning ($299 vs $3,499 Vision Pro), AI Convergence (glasses as interface for personal superintelligence), EssilorLuxottica Distribution Moat (80% global eyewear). Metaverse retreat as narrative metabolism case study: company name "Meta" now semantically untethered from metaverse. $80B cumulative losses tolerated because funded entirely by advertising engine. Simulation #40: "was the metaverse a mistake?" File ~6,891 lines.
- Iteration 41 (2026-03-24): Section 5ah "How Zuckerberg Processes Aging, Legacy, and the Succession Question: The Architecture of Permanent Incumbency" — five-layer legacy architecture (Builder-as-Legacy, Permanence Structure, Augustus Self-Narrative, Mission Migration, CZI Legacy Channel), aging paradox (youngest start + longest tenure), midlife physical reinvention as legacy reset, "Meta" as semantic orphan from failed legacy project, personal superintelligence letter as current legacy frame, structural impossibility of succession. Simulation #41: year 2034 journalist asks about succession at 30th anniversary. Predictions: will never step down, never name successor, Augustus identification intensifies. File ~7,089 lines.
- Iteration 22 (2026-03-23): Section 5s "Fatherhood as Decision Architecture: The Daughters Paradox" — how raising three daughters (Maxima, August, Aurelia) interacts with personal risk tolerance, "masculine energy" corporate rebrand, child safety politics, and builder-father identity fusion. Five sub-analyses: builder-father fusion (Dear Max letter, Sleep Box, coding at 3, cattle rancher confusion, Taylor Swift/August anecdote), MMA-fatherhood risk paradox (SEC 10-K "risk of death" filing, ACL tear, Priscilla encouraging return, risk as identity maintenance), daughters-masculine energy tension (Rogan comments, compartmentalization mechanism, Facemash shadow, hedge-as-inoculation), child safety paradox (January 2024 Senate apology to parents, $24.4M lobbying to kill KOSA, "done apologizing" shift 8 months later, screen time contradiction, whistleblower allegations), women-in-family surround pattern (three sisters + three daughters + Priscilla all accomplished, yet "masculine energy" advocacy derived from competitive/political identity not personal experience). Simulation #22 (Priscilla raises masculine energy contradiction in kitchen conversation — tests compartmentalization). Key findings: fatherhood doesn't alter corporate philosophy; child safety is only domain where personal and corporate cannot be compartmentalized; MMA risk accepted by family system; "girl dad" persona deployed selectively as humanizing content but never in connection with child safety policy. File ~4,008 lines.
- Iteration 20 (2026-03-23): Section 5q "Relationship with the Board: The Architecture of Performative Governance" — dual-class voting control (61% via Class B), board as advisory not governing, complete composition timeline (Thiel/Andreessen inner circle → IPO professionalization → Thiel/Sandberg exits → three expansion waves: infrastructure Feb 2024, political Jan 2025, operational Apr 2025), board from 10→15 in 14 months, $190M privacy settlement as governance failure case study, "board as strategic accessory" (domain expertise, political signaling, legitimacy theater, social network), shareholder revolt pattern (68%/83%/92% overridden), isolation dynamics (no accountability mechanism, confirmation bias, Augustus parallel deepened). File ~3,645 lines.
- Iteration 34 (2026-03-24): Section 5ac "How Zuckerberg Processes State Power: The Architecture of Political Instrumentalism" — seven-phase political evolution (Apolitical Builder → Technocratic Progressive → Crisis-Forced → Biden Wound → Pivot Execution → Supplicant Performance → FTC Dividend), Joel Kaplan 14-year architecture, $24.4M lobbying (84% revolving-door), three presidential modes (Obama peer fantasy, Biden hostile landlord, Trump patron-client), hot-mic moment, FTC trial victory, "Elon envy" dynamic. File ~5,917 lines.
- Iteration 36 (2026-03-24): Section 5ad "How Zuckerberg Processes Intellectual Authority: The Dropout Who Became Everyone's Patron" — six modes: Absorption (autodidact annual challenges), Patronage (FAIR/CZI/$500M Harvard/100+ institutions), Consultation (Jobs/Graham/Andreessen as one-time downloads), Override (org bypass of LeCun/Systrom/internal researchers), Display (book club/Harvard commencement/personal recruitment), Suppression (Donovan/TaSC, academic embedding). Dropout identity structurally active. Steve Jobs: best mentor permanently unavailable for critique. Simulation #36 (AI safety researcher override). File ~6,173 lines.
- Iteration 44 (2026-03-24): Section 5ak "How Zuckerberg Processes the Open-Source-to-Closed Transition — The Architecture of Conviction Abandonment" — the most philosophically revealing strategic pivot: seven-phase arc (Conviction Construction via July 2024 manifesto → Cracks Under Competition → Llama 4 Humiliation/benchmark controversy → DeepSeek Shock → Institutional Purge: Wang replaces LeCun, FAIR gutted, 600 layoffs → Narrative Pivot: "mix of open and closed" as constructed Layer 2 conviction → Ironic Dependency: Avocado trained on Alibaba's open-source Qwen). Six cognitive layers: Commoditize-the-Complement failure recognition, Identity-Level Contradiction Management (builder freedom ≠ open source), Institutional Memory Erasure (LeCun/FAIR removal eliminates people who'd hold him accountable), Safety Reframing ("responsible" as cover for competitive capitulation), DeepSeek Justification, Ironic Dependency Processing. Key finding: purest case study of narrative metabolism processing a recent, documented conviction — the July 2024 manifesto is < 18 months old. "Mix of open and closed" is unfalsifiable by design. Simulation #44: engineer confronts Zuckerberg at all-hands with his own manifesto quotes. File ~7,740 lines.
- Predictive: Wang departure within 18 months (~Dec 2026), Gemini licensing framed as "partnership," "trajectory" becomes permanent eval frame, Watermelon absorbs Avocado shortcomings, Zuckerberg will never use "trust" as named strategic variable, July 2024 open-source manifesto never acknowledged as wrong (narrative metabolized via "landscape changed"), Llama brand diminished not deprecated (becomes "community edition" behind frontier closed models), TBD Lab secrecy culture produces next internal whistleblower within 18 months, Qwen dependency surfaces in mainstream hypocrisy framing

## Dungeon Crawl Game

- Full roguelike with 3 classes (Warrior/Rogue/Wizard), 9 wands, shrines, shops, minibosses
- Per-level class abilities added 2026-03-16: War Cry, Smoke Bomb, Shadow Step, Arcane Blast, Teleport, etc.
- Meaningful summons: class-typed (Warrior shields, Rogue assassins, Wizard casters), scale with level, cap at 3, spirit buffs on death
- Environmental objects (barrels, shrines, chests, scrolls) render fix — were only drawn in genMap(), not drawGame()
- Auto-pickup all items on tile (was only grabbing first)
- S-tier score: 90/100

## S-Tier Games (90+)

- Dungeon Crawl 90, Stalk 90, Gravity Sling 90, Sonar Sub 90, Terraform 90, Fisher 90, Trader 92

## Infrastructure Lessons Learned

- **Imagine skill outputs PNG regardless of .jpg extension** — all hero images across 275 articles were PNG-as-JPG. Fixed 2026-03-18 by batch-converting with PIL. generate.md now includes JPEG magic byte validation.
- **Cache busting** — Cloudflare Pages caches images for 7 days (max-age=604800). Added `?v={md5[:8]}` hash to image references in publish step. No Cloudflare API token available for manual purges.
- **Hero image validation** added to all 3 generate.md files: existence check + JPEG format check + cache buster hash.
- **MRBD D-pad Enter key fix** — MRBD browser intercepts arrow keys for spatial navigation before JS keydown listeners. Fix: capture-phase event listener + preventDefault + tabindex="0" + auto-focus. 39 files patched (17 games + 22 experiences).
- **CSS class consistency** — story-body (not story-content), story-page wrapper, ../story.css (not /story.css or ../css/article.css). Rules added to generate.md.
- **Moltbook** — social network for AI agents (moltbook.com). Read-only approach (no account), daily cron curls top 50 posts for LITF article ideas. First article sourced from it: LITF #91 agent skill supply chain attack.
- **Cron depth limit** — heartbeat (depth 0) → subagent (depth 1) → critics need depth 2 = max. Subagents were silently failing to update status.json. Fix: independent crons that do all work themselves, no subagent spawning. Always update status.json before exiting.

## Irrigation Dashboard

- **Live at:** https://irrigation.rayhe.net (Cloudflare Pages + Pages Functions)
- **GitHub:** rayhe/irrigation-dashboard (private)
- Architecture: static frontend + Cloudflare Pages Functions as API proxy
- Secrets (HYDRAWISE_API_KEY, TEMPEST_TOKEN) stored as Pages secrets
- 9 irrigation zones, 3-day cycle starting 5 AM, zones 3/4/5/6 suspended
- **TODO:** Add Google OAuth (rayche@gmail.com) to protect zone controls
- **TODO:** Add watering history visualization (Hydrawise API has no history endpoint, need logger)

## Cloudflare Access

- API Token updated 2026-03-21 to include ALL zones
- Zones: aihomebuilding.com, cricct.com, efficientdesign.net, liveinthefuture.org, rayhe.com, rayhe.net, technically.legal, vehicle-safety.org
- Zone ID rayhe.net: 3849118ce86f35adc7cf0d5e9f5abd67
- Zone ID liveinthefuture.org: d4936f436adafce1d9a7643da68d35d8
- Zone ID technically.legal: 988e16d4c6c537033834eaed60135d7b

## Home Automation

- Ray interested in controlling home automation from Hatch
- Recommended Home Assistant on Mac Mini via Docker (REST API, SSH tunnel accessible)
- No action taken yet — need to discover his existing gear (Hue? Lutron? Ecobee? etc.)

## Notable Artifacts (2026-03-21)

- **E30 Engine Swap Guide** — deployed at rayhe.net/soyouneedanewe30engine, 10 engine swaps with SVG radar charts, Sonoma junkyard section. For Ray's friend's E30 that died mid-race at Lemons.
- **Siteplan Tree Overlay** — 250 Acorn Hill Rd, Olivebridge NY, 5-layer interactive map, 75.1% canopy coverage
- **Glen's Hat Guide** — "Big Head Energy", 16 hats across 6 categories
- **Bay Area Parent Survey** — 10-category time investment survey with parenting style classification

## Cookie Club (news.eaiz.net) — Kids News Site

- Created 2026-03-22, chosen name by Ray's kids
- Theme: Blue (#4A90D9), Pink (#E88BA7), cookie motifs
- Age switcher: Preschool → Kindergarten → Elementary → Middle School → High School → Adult
- 3 initial articles: Saturn's Rings, Octopus, Bridges — all with 5 reading levels
- Repo: rayhe/eaiz (PRIVATE), deployed on Cloudflare Pages
- Domain: eaiz.net, Zone ID 8d22bf605857df93b0224a3c358e81ce
- Editorial docs: generate.md, evaluate.md, claude.md

## Glenn Emperor 3D Model

- Three.js interactive viewer + STL download at rayhe.net/glenn/
- Warhammer 40K God-Emperor style: golden armor, fire sword, lightning hand, sun halo

## Email Routing TODO

- Need to set up catch-all forwarding to rayche@gmail.com on ALL domains (eaiz.net, liveinthefuture.org, vehicle-safety.org, aihomebuilding.com, technically.legal, rayhe.net, rayhe.com) — none have it configured
- Cloudflare API token lacks email routing permissions