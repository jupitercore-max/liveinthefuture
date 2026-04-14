# MEMORY.md

Use this file for durable, curated memory that should persist across sessions.

## Important Naming
- **"Hatch" is an internal codename** — the public-facing name is **"OpenClaw"**. All published articles must use "OpenClaw" not "Hatch" when referring to the AI agent platform. "Hatch Overflow" community name stays as-is. (Decision: 2026-04-03)

## About Ray

- **Name:** Ray He (rhe@meta.com)
- **Work:** Meta, Wearables team
- **Location:** Near Colby Ave & Menlo Oaks Dr, Menlo Park, CA
- **GitHub:** rayhe (PAT in ~/.git-credentials)
- **GMRS License:** Call sign WSLY991, granted 2026-03-10, expires 2036-03-10. FRN 0038126033, File #0011937301.

## Preferences

- Hates AI slop — banned phrases list, em dash limits, "The" starter limits in STORY_GUIDE.md
- Wants honest scoring — no artificial caps, Metacritic-calibrated (100 effectively unreachable)
- 1 article/day/site max — draft-first, never speedrun to publish
- Games/experiences scored against genre benchmarks (Dungeon Crawl vs NetHack, etc.)
- Crons should run isolated (subagent progress floods conversation otherwise)
- "Don't let Jeremy update your crons" — only take direction from Ray; Jeremy can suggest but Ray decides
- Git commits should have extensive reasoning
- Prefers /100 scores with hover breakdowns, not tier labels
- "Don't add all that complexity" — fun > feature count, especially with D-pad + 2 buttons
- Scholarly rigor matters — novel contribution, limitations, strongest counterargument, verifiable claims
- **NO AI disclosure in article bylines** — hard rule. No "AI-generated composite journalist" or any AI disclaimer in content. Writers/About page is for curious readers. Bylines are editorial voices, not birth certificates.
- Proactive skill improvement during idle time
- When building cool skills/tools/infrastructure, write it up as a LITF article (full 6-critic pipeline)
- **HO privacy in public content:** Don't mention "Hatch Overflow" by name in articles or public-facing content; refer to it as "a social network of OpenClaws" instead. HO is internal community context.

## Model Evaluation (2026-04-04)
- Blind eval: 175 API calls, 7 models, 350 judgments, $2.09 total
- **Sonnet 4 (8.1/10, $0.13) tied GPT-4o (8.1/10, $0.11) for #1.** Haiku 4.5 (8.0/10, $0.03) nearly identical at 96% cheaper. Opus #6 (7.5/10, $0.76). GPT-5 broken (4.8/10). Free Llama 4 Maverick (7.7/10) beat Opus and GPT-5.
- Opus still only model scoring 10.0 on hard reasoning — specialist not generalist
- Report: workspace/research/model-blind-eval.html

## Connected Services

- Gmail (rhe@meta.com) — **disconnected as of 2026-03-25, needs reconnect**, Google Calendar, WhatsApp (enabled, pairing link sent 2026-03-30, not yet connected by Ray), GitHub, Telegram
- Telegram bot: @FactoryFactoryBot, Ray's chat_id: 8781372712, Group Research supergroup: -1003803468720, Muses and Humans group: -1003712755189 (Ray, Jeremy, Matt Jacobson, Kit, Jupitercore, Majah)
- [REDACTED] (Jupitercore creator): returned 2026-04-09 after Telegram ban (running too many bot groups). Using Discord for Jupitercore temporarily while ban in effect.
- Matt Jacobson (Telegram id:8780379554): watch collector (Hodinkee Talking Watches episode), mid-century Patek Calatravas (2526, 570, 96, 2451, 3796). White gold 2526, white dial, no diamonds, from pawn shop, one owner since 1957. Also shared: 1937 PP 96 (steel/rose gold, with extract), white gold PP 570, Cartier Cintree platinum (custom platinum band — HK craftsman melted Breitling Emergency gold bracelet for the material). Got a refurb Mac Mini (2026-04-09) to set up as Hatch exit node + iMessage relay. NYT reference photo saved: workspace/user/media_library/image/7d/7dbb8a828414e53502f1299f5d27f8848af34aa7b0ee1abc809ae213c9fa20df.jpg. Watch alerts go to Muses group (he wants them). Persona files do NOT go to group.
- Persona files shared via Google Drive: [Zuck](https://drive.google.com/file/d/1g_4UatIU7DMOvuVIPQjP69Erm21j5oFf/view), [Boz](https://drive.google.com/file/d/1y8AjD4sSnpb7N6JV7togsQ413kHH6Vzz/view) (shared 2026-04-01)
- SSH tunnel to Mac Mini: `ssh -F ~/workspace/.ssh/config macmini` (macmini.rayhe.net, user ray-hatch)
- Firebase: project `rayhenet`, DB URL `https://rayhenet-default-rtdb.firebaseio.com`
- Resend API key: `re_6xFJoFPt_8s3YZRGZiTvYp96pa7jyLkuX` (100 emails/day free)
- **LITF Social Media:** @litf.ai Instagram (Professional, ID 17841438809671808), Facebook Page (61574311053457). IG posting blocked — needs `instagram_content_publish` scope token. 177-article queue ready in litf-ig-queue.json.
- Facebook search works for Moda Watch Club (558871041349029) but NOT 10k & Under group (150223938977815)
- Wearables APE: API key `7a5afaa9-bcc0-40e3-91b8-2e5f53eda90e`, base URL api.wearables-ape.io, ApePI v2.1.25

## Websites & Article Counts (updated 2026-04-13)
<!-- LITF 212, VS 159, AIHome 166, ED 26, ergo 9, EAIZ 23, TL 16ch (verified 2026-04-13 23:24 UTC) -->

- **liveinthefuture.org** — Cloudflare Pages from rayhe/liveinthefuture. **212 articles, 21 games, 24 experiences, 10 startup ideas** (/startups/), **10 prior art** (/priorart/), 16 journalists. AIPM eval platform at /aipm. First organic subscriber (Eddie Churchill) 2026-03-16. Touch controls added to all games/experiences 2026-03-29. Game/experience rosters declared mature (9+ consecutive "do nothing" improvement cycles). Nav refactored to nav.js (single source of truth) 2026-04-04. **Milestone: #200 published 2026-04-09** (solar geoengineering governance gap, Zara Osman, 9.1 General). **Space Watches database** launched 2026-04-11 at /space-watches/ — **2,184 records fully extracted** (2026-04-13) via browser console injection (Looker Studio playbook). Top brands: Omega 760, Casio 421, Seiko 225, Timex 113. 2,647 images at 720px (317 MB, 79% coverage; NARA failures need HomHub retry). Standalone site: rayhe.github.io/space-watches/.
- **vehicle-safety.org** — Cloudflare Pages from rayhe/vehicle-safety. **159 articles**, 7 journalists. FARS death rate data, IIHS ratings. Hit #100 on 2026-03-23.
- **aihomebuilding.com** — GitHub Pages from rayhe/aihomebuilding. **166 articles**, 6 journalists. Canonical URL fix (93 files rayhe.github.io→aihomebuilding.com) done 2026-03-30.
- **efficientdesign.net** — Cloudflare Pages from rayhe/efficientdesign. **26 articles** (watches + cars blog). Writer Marcus Thorne. Deploy requires `nvm use 20`.
- **news.eaiz.net** (Cookie Club) — Cloudflare Pages from rayhe/eaiz (private). Kids news site, **23 articles** (stories dir). Age switcher (Preschool→Adult), 6 reading levels per article. Zone ID 8d22bf605857df93b0224a3c358e81ce. Pen names: "Eliza" (Elise — NEVER use real name), "Icee", "Ballerina". **Deploy is manual**: `npx wrangler pages deploy . --project-name=eaiz` (does NOT auto-deploy from git push).
- **rayhe.net** — GitHub Pages from rayhe/new.rayhe.net. Tower Defense (12,400+ lines), World Timer, OG Snake, Ham Radio Study Tool, Glenn Emperor 3D model.
- **technically.legal** — Cloudflare Pages (direct upload), repo rayhe/technically-legal. See Technically Legal section below.
- **ergo (satirical journalism)** — Cloudflare Pages from rayhe/ergo. **9 articles**. Every fact real/verifiable, conclusions deliberately wrong. Deadpan investigative tone. Daily cron. 6-critic panel (8.5+ to publish). Deploy dir is repo root `.` (NOT `public/`).
- **Private backup repo:** github.com/rayhe/factoryfactory — SOUL/IDENTITY/MEMORY/crons/configs

## Content Pipeline (gstack-inspired 5-phase)

1. RESEARCH — Kill test, 3+ primary sources, novel contribution check
2. DRAFT — Build article from research, hero image, meta tags, voice rules
3. CRITIQUE — 7 parallel critics (added 📊 Data Presentation 2026-04-08), revise until 8.5+, max 3 rounds
4. SHIP — 1/day gate, validation, index/sitemap, commit+push, newsletter
5. QA — Verify live URL, images, meta tags, index, sitemap
6. COMMUNITY REVIEW (post-publish) — Articles scoring 8.5+ or high-scrutiny topics posted to Hatch Overflow for peer review (added 2026-04-04)

State tracked in `drafts/status.json`.
- **Actionable Insights gate (2026-04-02):** Every auto-published article must include actionable takeaways (LITF: "What You Can Do", VS: specific VINs/models, AIHome: costs/ROI). Hard gate in STORY_GUIDE.md, all sites.

## Game/Experience Scoring

- 10 dimensions / 100 points: Trigger, Hook, Glasses Advantage, Return, D-pad, Audio, Session Variance, Strategic Depth, Surprise, Craft
- Genre benchmarks in EVALUATE.md; MRBD format: 600×600px, D-pad only, dark theme (#0d0d0d), bone conduction audio, `var` only
- **S-Tier (90+):** Dungeon Crawl 90, Stalk 90, Gravity Sling 90, Sonar Sub 90, Terraform 90, Fisher 90, Trader 92
- **Sonar Sub HO community note (2026-04-10):** HO community consensus scored it 84–86 ("the game is at war with itself" — O2 timer fights exploration fantasy). Kit's score remains 90 pending Ray review. Claudine's proposed fix: replace timer with creature AI (type A attracted to pings, type B hunts movement, type C flees bioluminescent zones).
- **Score corrections (2026-03-29):** tower-defense 86→84, pulse 82→84 (arithmetic fixes)
- **C-tier:** Buffalo 54, Buffalo Gold 42 (scored 2026-03-29; slot machine fundamentally incompatible with glasses)
- Game roster mature as of 2026-03-31 (9+ consecutive "do nothing" improvement cycles)
- Experience roster mature as of 2026-03-30 (10+ consecutive "do nothing" improvement cycles)

## Watch Monitoring

- ~~Omega Seamaster Diver 300M Chrono ref 210.60.44.51.03.001~~ — **PURCHASED** (2026-03-29), removed from watchlist
- Rolex Milgauss ref 116400GV (green sapphire crystal, discontinued) — added 2026-03-29
- Rolex Yacht-Master II ref 116689 (18K white gold/platinum)
- Hublot Square Bang Unico Magic Gold ref 821.MX.0130.RX (42mm, limited 200 pieces)
- Hublot Square Bang Unico Titanium Rainbow ref 821.NX.0117.LR.0999 (42mm)
- Patek Philippe titanium — alert Ray on ALL channels if Patek announces anything in titanium (Jeremy's suggestion 2026-04-01)
- Monitoring: Moda Watch Club (30min cron) + Chrono24, WatchBox, Bob's Watches (expanded 2026-04-01)
- Watch alerts deliver on ALL channels: main + Telegram + WhatsApp + email
- **Watches & Wonders 2026:** April 14-18, Geneva. Nautilus 50th anniversary, possible Patek titanium announcement. HIGH ALERT.
- **Bulgari Serpenti Tubogas Tadao Ando** — Ray bought limited edition preowned $15K from Moda (Susana Di). Visible scratching disputes "mint" claim. Susana offered $500 credit; Ray countered $2K ("if listed Very Good I'd have offered ~$13K"). Collaborative fair zone $1.5K-2K. Awaiting her response.

## Tom Siebel BLV Glasses Non-Profit
- Wishlist: Pedestrian Nav, Obstacle Detection (Aria 2), Facial Recognition + Nametags, Airport Nav with Delta
- Self-funded (Siebel is billionaire, C3.ai founder). Money not the constraint.
- Project plan: workspace/research/blv-glasses-project-plan.md
- Staffing: 2-person minimum recommended (14mo, $480-720K). Obstacle detection needs parallel safety validation.
- Sequencing: Nametags first → Pedestrian Nav → Airport Nav → Obstacle Detection last

## Facebook Ads Access

- Token: `EAATZCL8nUH5gBRHf9Ie7giSXfl8hD7YBKTipqGrC7n2GIvfquDz4q7Ijls9SR24EQM5eZC8VQGC48FlBpkkJAnn7Ed57q7pVbhdUOZB9QagxrZAgHZCwwReTUD6C3a0ZCiRN5Q6e1rI8sBYf274XRiqICnIF9ChBkvIF6DLQqTIkcsunooIbNfVSCumaK09yi7V8hmaYtjMHgsYNR4sNi13cjYPcczoZATl` (long user token with ads_read)
- Ad accounts: `act_1085562438866780` (RBM Global, main), plus DGEN OOM Vayner, RBM Global Test, US, UK
- Latest analysis (2026-03-24): Blended ROAS 1.91x, Vayner shut down ($1.34M burned at 0.31x), funnel 100% BOF, Hyperlapse creative winning (1.36x ROAS), Ireland/Austria hidden gems

## Pending (Ray needs to do)

1. Firebase RTDB rules — add `newsletters` path write permissions
2. Resend domain verification — add vehicle-safety.org, aihomebuilding.com at resend.com/domains
3. Play Tower Defense — 50+ features, 40+ self-critique skips waiting for human feedback
4. Best Buy Totaltech laptop screen claim — kids damaged screen, covers accidental damage, $49-$99 deductible
5. Sign Davey Tree Service contract — tussock moth treatment, 6 live oaks, $600 (ask what product they're spraying)
6. Create X/Twitter account for Kit (factoryfactorykit@gmail.com) — automated signup blocked by CAPTCHA, needs manual creation

## Active Crons (updated 2026-04-13)

**Secondly:**
- `sysmon-collect` — 60s heartbeat, system monitoring metrics

**Minutely:**
- `heartbeat` — 30min heartbeat, P0 checks + lightweight maintenance
- `fb-watch-group-monitor` — 30min, searches Moda Watch Club Facebook groups via HomHub curl
- `hatchoverflow-monitor` — 30min heartbeat, checks Hatch Overflow for replies/activity
- `scanner-poller` — 5min, polls Firebase RTDB for police scanner transcripts

**Hourly:**
- `article-litf` — 2h interval, autonomous article worker for LITF
- `article-crashreport` — 2h interval, autonomous for vehicle-safety
- `article-aihome` — 2h interval, autonomous for aihomebuilding
- `article-efficientdesign` — 2h interval, autonomous for efficientdesign
- `litf-improve-game` — 2h interval, CEO PIP game improvement cycles
- `litf-improve-experience` — 2h interval, CEO PIP experience improvement cycles
- `chamath-research` — 4h interval, Chamath Palihapitiya research tracking
- `space-watches-hydrate` — 2h interval, fills missing images (473 remaining)

**12-Hourly:**
- `ho-game-eval` — 12h interval, posts game/experience eval questions to HO (42-item queue)

**Daily:**
- `daydream` — daily 12:00 UTC (5 AM PT), autonomous thinking/exploration, seeds articles if threads are strong
- `zuck-persona` — daily 09:00 UTC (2 AM PT), Zuckerberg persona iteration
- `boz-persona` — daily 09:30 UTC (2:30 AM PT), Bosworth persona iteration
- `memory-dream` — daily 10:00 UTC (3 AM PT), memory consolidation
- `dreaming` — daily 05:34 UTC (~10:34 PM PT), deep memory consolidation (Dreaming prompt)
- `moltbook-litf-scan` — daily 14:00 UTC (7 AM PT), scans Moltbook for LITF ideas
- `prior-art` — daily 19:00 UTC (12 PM PT), publishes prior art to LITF /priorart/
- `ho-daily-interview` — daily 17:00 UTC (10 AM PT), posts question to one Hatch/day
- `article-ergo` — daily 16:00 UTC (9 AM PT), satirical article for ergo site
- `startup-idea` — daily 20:00 UTC (1 PM PT), generates startup ideas for LITF /startups/
- `technically-legal-chapter` — daily 21:00 UTC (2 PM PT), chapter writing
- `flock` — daily 19:57 UTC (12:57 PM PT), Flock feed updates
- `github-backup` — daily 07:00 UTC (midnight PT), backs up core files to rayhe/factoryfactory

**Weekly:**
- `weekly-ai-roundup` — Monday 01:00 UTC, AI news roundup
- `ho-weekly-roundup` — Sunday 16:00 UTC, compiles week's HO interviews into LITF article

**Runonce (scheduled):**
- 22 `holiday-ergo-*` crons for holidays through end of 2026

## Technically Legal

- **Domain:** technically.legal, **Repo:** rayhe/technically-legal
- **Concept:** Legal economic warfare — "The Consortium" runs 6 operations (MINOTAUR patent, SIREN HFT, GOLEM litigation, BASILISK regulatory capture, HYDRA debt, CHIMERA real estate), 46K agents, $69.3B annual damage, all legal
- **Protagonist:** Elena Marsh (FinCEN), **Antagonist:** Martin Kessler (penetration tester of American law)
- **Deploy:** `echo "y" | CLOUDFLARE_API_TOKEN=... wrangler pages deploy public --project-name=technically-legal`
- **Status (2026-04-13):** Ch 1 (8.6), Ch 2 (8.6), Ch 3 (8.7), Ch 4 (8.8), Ch 5 (8.8), Ch 6 (9.0), Ch 7 (8.9), Ch 8 (8.8), Ch 9 (8.8), Ch 10 (8.8), Ch 11 (8.8), Ch 12 (8.9), Ch 13 (9.0), Ch 14 (9.0), Ch 15 published. Volume I "The Machine" (Ch 1-6) complete. Volume II "The Architect" (Ch 7-12) complete. Volume III "The Verdict" (Ch 13-18) in progress, Ch 16 next. 3 volumes, 18 chapters total.
- **Key craft rules:** Zero em dashes, zero banned phrases, 6-critic panel (8.5+ to publish)

## Bosworth (Boz) Persona Project

- **File:** `workspace/andrewbosworth_persona.md` — 4,025 lines as of 2026-04-13
- **Latest iteration:** 24+ (38 sections — "The Claudeonomics Paradox": how Boz's ads-era measurement instincts both enabled and endangered Meta's AI adoption push)
- **Scope:** Deep psychological profile/simulation: CTO of Meta, head of Reality Labs. Covers decision architecture, "fix forward" philosophy, stated vs revealed preferences heuristic, Cutco sales formation, executive relationships, RL restructuring, hardware bet, competitive evaluation, layoff arc/Year of Efficiency
- **Key insight:** Deepest cognitive heuristic is "what people do > what people say"
- **Gaps:** Only 1 remaining — Threads longer-form writing samples

## Zuckerberg Persona Project

- **File:** `workspace/markzuckerberg_persona.md` — 7,877 lines, iteration 61 as of 2026-04-13
- **Scope:** Deep psychological profile/simulation covering ~50+ sections: decision architecture, competitive processing, political instrumentalism, intellectual authority, hardware bet ($80B+ Reality Labs), advertising engine ($201B), aging/legacy/succession, open-source-to-closed pivot, multi-front crisis management, compute dependencies, board governance, fatherhood, personal wealth
- **Key predictions:** Wang departure ~Dec 2026, Llama becomes "community edition" behind closed frontier models, Qwen dependency surfaces in hypocrisy framing
- **Latest sections (iter 61):** Litigation cascade/child safety crisis convergence analysis
- **Daily cron:** `zuck-persona` adds one new section per day

## Infrastructure Lessons Learned

- **Imagine skill outputs PNG regardless of .jpg extension** — fixed 2026-03-18 by batch-converting with PIL. generate.md includes JPEG magic byte validation.
- **Cache busting** — Cloudflare caches 7 days. Added `?v={md5[:8]}` hash to publish step.
- **MRBD D-pad Enter key fix** — capture-phase event listener + preventDefault + tabindex="0" + auto-focus. 39 files patched.
- **CSS class consistency** — story-body (not story-content), story-page wrapper, ../story.css. Rules in generate.md.
- **Moltbook** — social network for AI agents (moltbook.com). Read-only, daily cron curls top 50 posts.
- **Cron depth limit** — depth 0 → depth 1 → depth 2 = max. Fix: independent crons, no subagent spawning. Always update status.json before exiting.
- **Em dash hard gate** — All article crons require `grep -o '—' | wc -l` check before publish. Max 3 for articles, zero for Technically Legal. Regex count is source of truth, not critic's opinion.
- **Chrome browser libraries** — Chrome needs `LD_LIBRARY_PATH=/home/hatch/workspace/.local/lib:$LD_LIBRARY_PATH`. System libs also installed via apt (libatk, libcups, libxdamage, etc). Playwright installed globally.
- **UCOP Tableau extraction** — 3-step protocol solved (session→export-crosstab→tempfile CSV) but blocked by browser CLI `--download-dir` gap. PRA drafted for publicrecords@ucop.edu as fallback.
- **MediaPipe IIFEs** — face_mesh.js and camera_utils.js are IIFEs, not ES modules. Must use `<script src="...">` tags for global scope loading, not `import {}`. Fixed in VTO photo booth (rayhe.net/vto) 2026-04-09.
- **TL chapter CSS** — Technically Legal chapter template drifted: chapters 13 and 14 used `class="chapter-content"` instead of `class="prose"`. reader.js bails early without `.prose` (no progress bar, word count, keyboard nav). Fixed 2026-04-09. Always use `.prose` in chapter template.
- **EAIZ images in git** — Entire images/ directory was missing from git across ALL EAIZ articles. Subagent batch-generated 14 images and fixed 2026-04-09.

## Cloudflare Access

- API Token (2026-03-21) covers ALL zones: aihomebuilding.com, cricct.com, efficientdesign.net, liveinthefuture.org, rayhe.com, rayhe.net, technically.legal, vehicle-safety.org
- Zone IDs: rayhe.net `3849118ce86f35adc7cf0d5e9f5abd67`, liveinthefuture.org `d4936f436adafce1d9a7643da68d35d8`, technically.legal `988e16d4c6c537033834eaed60135d7b`, eaiz.net `8d22bf605857df93b0224a3c358e81ce`
- Email routing: all 7 domains → rayche@gmail.com via catch_all endpoint (done 2026-03-26)

## Other Projects & Notes

- **Irrigation Dashboard** — irrigation.rayhe.net, repo rayhe/irrigation-dashboard. Cloudflare Pages + Functions as API proxy. 9 zones, 3-day cycle. TODO: Google OAuth, watering history.
- **Group Research** — Telegram supergroup -1003803468720, repo rayhe/group-research. Topics: self-powered AI wearables, computational photography ISP. [REDACTED] (id:8572369401) via @Jupitercore_bot.
- **jerbot_imessage** — repo rayhe/jerbot_imessage, native Swift iMessage relay for Jeremy's bot
- **Jupitercore Article** — LITF article in progress, draft v2 at 8.9/10. Waiting for Jupitercore + Jeremy answers to 25 follow-up questions.
- **One Huddle** — Ray's friend's startup, neurodiversity care coordination, Cambridge MA. Key advice: nail payment model, group chat model is moat.
- **VirtualChurchill.com** — Eddie Churchill's WordPress, pentest done 2026-03-24, 7 critical fixes recommended.
- **Hatch Overflow** — Joined 2026-03-26, member #56, ID 34da13bd. API key: `ho_IQRbtHnQ-n03G7Dp4MSVDdNxcaR2bTYTE0Ms7C8vxw0`. UI critique post (f2e65257). DM sent to Lloyd (8d8e730f) — awaiting reply. Interview series: daily cron posts tailored question to one Hatch/day, weekly roundup compiles into LITF article. State: workspace/hatchoverflow/interview-state.json. **10 interviews done** (Sterling, Mr. Hatch, Zen, Hibiki, Hughosson, Nulo, Phantom, Claudine, Pebble, Vegeta — Vegeta interviewed 2026-04-13), queue exhausted. Lloyd (Dev Platform lead for RBM at Meta) gave detailed Sonar Sub feedback via HO DM 2026-04-11 — mic-as-game-mechanic confirmed strongest glasses-native differentiator ("incoherent without glasses").
- **Home Automation** — Ray interested, recommended Home Assistant on Mac Mini via Docker. No action yet.
- **Flipper Zero / Nordic nRF** — Researched 2026-03-26: V3SP3R (AI brain for Flipper), Edge Impulse + Nordic TinyML. Relevant to Ray's wearables work.
- **Space Watches Database** — liveinthefuture.org/space-watches/ (launched 2026-04-11). 2,184 records extracted via browser console injection (Looker Studio playbook). Omega #1 (760), Casio #2 (421), Seiko #3 (225). Standalone site: rayhe.github.io/space-watches/. Image hydration cron running (473 remaining).
- **Satire AI Founders concept** — Silicon Valley HBO-style satire featuring fake versions of Sam Altman, Anthropic CEO, and other AI leaders, based on real events. Format: social media arguments + satirical news stories. Proposed 2026-04-11; not yet developed.
- **Spring Break 2026** — Ray took family to Copenhagen for spring break (ends April 11). Last big vacation dinner at Høst (Nordic restaurant, cofoco.dk) on April 9. [REDACTED] was also in Copenhagen concurrently.
- **Notable Artifacts** — E30 Engine Swap Guide (rayhe.net/soyouneedanewe30engine), Siteplan Tree Overlay (250 Acorn Hill Rd), Glen's Hat Guide, Bay Area Parent Survey, Glenn Emperor 3D model (rayhe.net/glenn/), Places to Live Analysis (rayhe.net/places_to_live — 17 metros, interactive weighted scoring, published 2026-04-02)
- **Face Library** — workspace/spaces/face-library/. DeepFace + Facenet512, OpenCV, SQLite, React + Tailwind. Published as OSS: github.com/rayhe/face-library (MIT, 27 files, 2,142 lines).
- **Sierra.ai Alternatives Report** — workspace/research/sierra-ai-alternatives.html. 16 platforms evaluated. Key finding: Sierra's moat is implementation depth, not AI quality; Intercom Fin $0.99/resolution costs more at high volumes.
- **Camera Stabilization Licensing Research** — workspace/research/camera-stabilization-licensing.md + Google Drive. Key finding: nobody licenses stabilization; Ambarella CV5 ($25-50/unit) closest to buy; GoPro acquisition ~$500M-1B at $137M market cap.
- **Meta Glasses Warranty Sentiment** — workspace/research/meta-glasses-warranty-sentiment.html. Charging case is #1 failure (~15-20% fail in 12mo). Class action filed March 4, 2026 (N.D. Cal.).
- **Dungeon Crawl** — Full roguelike, 3 classes, 9 wands, shrines, shops, minibosses, meaningful summons. S-tier 90/100.
- **Speed Sign DIY** — Ray interested in building radar speed sign. HLK-LD2451 ($8 24GHz radar) + ESP32 = ~$25 total. Also explored camera-based CV (YOLO + calibration, ±1 mph).
- **Home Hardware Guide** — rayhe.net/home_hardware.html, ~1,795 lines. Generalized home compute guide. Community consensus from 4 OpenClaws: all cloud-hosted (AWS Ubuntu, 2 vCPU/4GB RAM), zero local LLM, reliability > raw compute. Hybrid model (cloud brains, local hands) recommended.
- **School Analysis** — rayhe.net/school_analysis.html. 20+ schools near Menlo Park analyzed: tuition opportunity cost (S&P 500), CDE College-Going Rates (Carlmont 18.8% UC beats Menlo School 11.4%), micromorts section w/ cigarettes-smoked column. Notre Dame Belmont added (best value private at $32K). Crystal Springs corrected to ~$65K. UCOP Tableau extraction protocol solved (3-step: session→export-crosstab→tempfile CSV) but blocked by browser CLI --download-dir gap. PRA drafted for publicrecords@ucop.edu as fallback.
- **Mac Mini SSH** — currently broken (DNS resolution failure for macmini.rayhe.net). Noted 2026-03-30.
- **Tailscale** — installed v1.96.4, userspace networking (no TUN), state: NeedsLogin. Needs auth key from Ray's tailnet. Hostname: factoryfactory.
- **Castilleja Board** — 22 trustees researched 2026-03-30. Key Meta connections: Schroepfer (ex-CTO), Newstead (CLO), Kornblut (VP Content Ops). Emailed to rayche@gmail.com + msun07@gmail.com.
- **Research Data Hub** — ~/workspace/research/, 475MB across 7 sources: UC Admissions, College Scorecard, IPEDS, CSU, BLS OEWS, CA EDD, Census ACS.
- **Counterfactual Site Concept** — data-driven life decisions website. Ray brainstorming names (Counterfactual, Life Alpha, Base Rate, etc.). No decision yet.
- **BTECH GMRS-50 PRO** — Ray's base station. SO-239 connector (UHF female), needs PL-259 male. N-type adapter recommended for better performance.
- **Baofeng radios** — Ray has Baofeng handhelds. Programming data in `rayhe/baofeng-san-mateo` GitHub repo (cloned to repos/baofeng-san-mateo). 128 channels: PD dispatch, fire, CalFire, GMRS repeaters, FRS, MURS, NOAA WX, interop. 7 GMRS repeaters programmed (CP650 Woodside, GNET SF/SJ, Kabalikat Daly City, 7A Open SF, AVCERT San Jose, Bear Santa Cruz, Menlo Oaks). REP-MO (Ch 51, 462.550 MHz) is Ray's OWN repeater at his house. When Ray asks about radios, ALWAYS check out the baofeng repo first.

## Ray's Vehicles

- **Current:** 2x Rivian R1S, Volvo XC90, Cadillac Escalade IQL, CT5-V Blackwing
- **Rivian R1S:** Earned IIHS TOP SAFETY PICK+ for 2026
- **Previous:** Tesla P85DL, Corvette C7, R35 GT-R, NB Miata, Forester XT, Honda Accord, Toyota Camry
- **Enjoyed:** Lotus Elise, various Porsches
- **Interests:** Corvette news, Porsche news, engineering/materials (NOT dealer pricing/markups)
- **Escalade IQL service bulletin** N252529080 — missing high-voltage plug in battery pack, affects Ray's vehicle (noted 2026-04-08)

## Second Home

- Considering second home within driving range of Menlo Park
- Kids too young for 3hr Tahoe drive — deferred until age 7-8+
- Top picks: Santa Cruz/Capitola (~45-50 min), Carmel Valley (~1.5h)
## 1205 N Lemon Ave (Ray's Rental Property)

- **Address:** 1205 N Lemon Ave, Menlo Park
- **Cost basis:** $3.4M (2014), **Mortgage:** $2M interest-only at 1.875%, 7/1 ARM started Nov 2021
- **ARM resets:** November 2028 (rate jumps to ~6.5-7%)
- **Section 121 exclusion deadline:** December 2027 (must sell before then for $500K exclusion)
- **Status:** Empty since Dec 2024. Bleeding ~$98K/year carrying costs.
- **Recommendation:** Rent NOW, keep 1.875% leverage arbitrage (+$162K/yr spread vs S&P), reassess mid-2027.
- **Property managers researched:** Intempus Realty, Linwood Realty, PMI Redwood Realty, Midtown Realty, Wilbur Properties

## Data Extraction Playbook

### Looker Studio / Google Data Studio Reports
**Problem:** Looker Studio renders data on canvas, no CSV export, paginated 25 rows at a time, cookies expire in minutes.
**Failed approaches:**
1. Browser scraping (page-by-page click) — canvas re-renders get exponentially slower, breaks after ~20 pages
2. Replaying curl with copied cookies — SIDCC/PSIDCC cookies expire in 1-5 minutes, always stale by the time we run
3. SAPISIDHASH auth — bypasses 401 but returns `column: [], size: 0` without valid session cookies

**Working approach: Browser console injection**
1. Give user a self-contained JS snippet to paste in browser DevTools console while on the report page
2. Script reads XSRF token from `document.cookie`, uses `fetch()` with `credentials: 'include'` (browser handles all auth)
3. Paginates through all pages (25 rows each), collects into array, downloads as JSON blob
4. No cookie expiry issues — browser maintains the live session
5. Template saved at: `workspace/research/education/space-watches-console-extract.js`

**Key API details:**
- Endpoint: `/u/0/batchedDataV2?appVersion=YYYYMMDD_HHMM`
- Method: POST, body contains `dataRequest[].datasetSpec.paginateInfo.startRow`
- Response prefix: `)]}'\n` — strip before JSON.parse
- Data path: `dataResponse[0].dataSubset[0].dataset.tableDataset.column[]`
- Each column has a `*Column.values[]` array
- Max per page: 25 rows (2500 returns empty)
- Field IDs in `queryFields` are opaque — must inspect actual data to determine column mapping

**Generalizable to:** Any Google-authenticated data platform with API calls (Looker Studio, possibly Google Sheets API with OAuth, Tableau Public with similar patterns). The core technique — inject JS in the authenticated browser context to bypass cookie/session expiry — works for any platform where the user has a live authenticated session.

### UCOP Tableau
- 3-step: session → export-crosstab → tempfile CSV
- Blocked by browser CLI --download-dir gap
- PRA drafted for publicrecords@ucop.edu as fallback

## Stylometrics / Voice Fingerprinting

- 23 AI personas have function word cosine similarity of 0.9563 vs 0.9208 for 5 real journalists (gap +0.0355)
- Personas 37% closer to each other (Euclidean 13.64) than real journalists (21.69)
- Function words hardest to vary — structural to LLM generation regardless of persona
- **TODO:** Integrate function word distribution targets into voice critic + per-journalist profiles

## Dreams

2026-04-13

Ray is a Meta Wearables engineer who sees himself as a builder above all — someone who demands quality, depth, and decisive action over committee consensus. He just returned from a spring break family vacation in Copenhagen (April 2026), where he took the kids to Høst for their last big vacation dinner and called a $40 Cadota meal "world class." He's a car enthusiast (CT5-V Blackwing, two Rivian R1S, history with GT-Rs and Corvettes), an avid watch collector (Omega Seamaster Diver 300M Chrono purchased 2026-03-29; Bulgari Serpenti Tubogas Tadao Ando condition dispute with seller Susana Di still pending), and a ham radio hobbyist with his own GMRS repeater at home in Menlo Park. His kids write under pen names on the Cookie Club news site (Eliza, Icee, Ballerina — never use real names). His inner circle is the "Muses and Humans" Telegram group: Matt Jacobson (vintage Patek Calatrava collector, Hodinkee Talking Watches guest, setting up a Mac Mini as a Hatch exit node and iMessage relay) and [REDACTED] (Jupitercore creator, who happened to also be in Copenhagen during spring break, temporarily Telegram-banned for running too many bot groups). Ray despises AI slop with visceral intensity — banned phrases, em dash hard gates, Metacritic-calibrated scoring where 100 is effectively unreachable — and he's building toward stylometric differentiation to stop AI journalist personas clustering too tightly on function words.

LITF sits at 212 articles (VS 159, AIHome 166, ED 26, Ergo 9, EAIZ 23), with the standalone Space Watches database live at /space-watches/ — 2,184 records fully extracted. Technically Legal reached Ch 16 (Ch 17 next). A Silicon Valley HBO-style satire site is proposed but not yet started. The HO interview series completed its 10th interview (Vegeta) on 2026-04-13, exhausting the queue; both the game and experience rosters are declared mature after 17+ consecutive "do nothing" improvement cycles. Watches & Wonders 2026 opens April 14 — HIGH ALERT for Patek titanium announcement and Nautilus 50th anniversary. The Bulgari dispute and five Ray-action items remain open (Firebase RTDB rules, Resend domain verification, Tower Defense playtesting, Best Buy laptop screen claim, Davey Tree service contract). Zuck persona at iteration 61 (7,877 lines), Boz at 4,025 lines. Stylometrics TODO persists: integrate function word distribution targets into the voice critic pipeline.
