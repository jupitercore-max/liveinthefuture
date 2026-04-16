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
- **Em dash discipline applies to ALL documents** (internal memos, feedback docs, etc.), not just published articles
- Internal docs authored as "Kit (with Ray)" not "Ray (via Kit)"
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
- **Blue dial watches preferred** — "Blue dial only factory" (context: watch monitoring/browsing)
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
- Matt Jacobson (Telegram id:8780379554): Meta VP & Creative Director for AR, Employee #8. Vintage watch collector (Patek Calatravas, tropical dials). Persona file: `workspace/matt-jacobson-persona.md` (299 lines, created 2026-04-15). Got refurb Mac Mini (2026-04-09) for Hatch exit node + iMessage relay. Watch alerts go to Muses group. Persona files do NOT go to group.
- Persona files shared via Google Drive: [Zuck](https://drive.google.com/file/d/1g_4UatIU7DMOvuVIPQjP69Erm21j5oFf/view), [Boz](https://drive.google.com/file/d/1y8AjD4sSnpb7N6JV7togsQ413kHH6Vzz/view) (shared 2026-04-01)
- SSH tunnel to Mac Mini: `ssh -F ~/workspace/.ssh/config macmini` (macmini.rayhe.net, user ray-hatch)
- Firebase: project `rayhenet`, DB URL `https://rayhenet-default-rtdb.firebaseio.com`
- Resend API key: `re_6xFJoFPt_8s3YZRGZiTvYp96pa7jyLkuX` (100 emails/day free)
- **LITF Social Media:** @litf.ai Instagram (Professional, ID 17841438809671808), Facebook Page (61574311053457). IG posting blocked — needs `instagram_content_publish` scope token. 177-article queue ready in litf-ig-queue.json.
- Facebook search works for Moda Watch Club (558871041349029) but NOT 10k & Under group (150223938977815)
- **Browser profile persistence** — Chrome profile stored at `workspace/.browser-profile/` (symlinked from `~/.cache/browser`). Restore script: `workspace/scripts/restore-browser-profile.sh`. Survives container restarts (fixed 2026-04-14).
- Wearables APE: API key `7a5afaa9-bcc0-40e3-91b8-2e5f53eda90e`, base URL api.wearables-ape.io, ApePI v2.1.25. Full OpenAPI at `/openapi.json`. LLMs (GPT-5.x, Claude Opus/Sonnet 4.x, Gemini 3.x, Llama 4), image gen (gpt-image-1/1.5, imagen-4, nano-banana), audio (ElevenLabs TTS/STT, GPT-4o-mini-tts, whisper), sound-gen (`/proxy/elevenlabs/v1/sound-generation`), 50+ task types, 60 req/min/model. Discovered 2026-04-15.

## Websites & Article Counts (updated 2026-04-16)
<!-- LITF 219, VS 168, AIHome 173, ED 25, ergo 12, EAIZ 23, TL 17ch (verified 2026-04-16 10:00 UTC) -->

- **liveinthefuture.org** — Cloudflare Pages from rayhe/liveinthefuture. **219 articles, 19 games, 22 experiences, 10 startup ideas** (/startups/), **11 prior art** (/priorart/), 16 journalists. All 19 games have generated audio (BGM + SFX, press M to mute; 2026-04-15). AIPM eval platform at /aipm. First organic subscriber (Eddie Churchill) 2026-03-16. Touch controls added to all games/experiences 2026-03-29. Game/experience rosters declared mature (18+ consecutive "do nothing" improvement cycles). Nav refactored to nav.js (single source of truth) 2026-04-04. **Milestone: #200 published 2026-04-09**. **Space Watches database** launched 2026-04-11 at /space-watches/ — **2,184 records fully extracted** (2026-04-13) via browser console injection (Looker Studio playbook). Top brands: Omega 760, Casio 421, Seiko 225, Timex 113. Image hydration ongoing (104 remaining). Standalone site: rayhe.github.io/space-watches/.
- **vehicle-safety.org** — Cloudflare Pages from rayhe/vehicle-safety. **168 articles**, 7 journalists. FARS death rate data, IIHS ratings. Hit #100 on 2026-03-23.
- **aihomebuilding.com** — GitHub Pages from rayhe/aihomebuilding. **173 articles**, 6 journalists. Canonical URL fix (93 files rayhe.github.io→aihomebuilding.com) done 2026-03-30.
- **efficientdesign.net** — Cloudflare Pages from rayhe/efficientdesign. **25 articles** (watches + cars blog). Writer Marcus Thorne. Deploy requires `nvm use 20`.
- **news.eaiz.net** (Cookie Club) — Cloudflare Pages from rayhe/eaiz (private). Kids news site, **23 articles** (stories dir). Age switcher (Preschool→Adult), 6 reading levels per article. Zone ID 8d22bf605857df93b0224a3c358e81ce. Pen names: "Eliza" (Elise — NEVER use real name), "Icee", "Ballerina". **Deploy is manual**: `npx wrangler pages deploy . --project-name=eaiz` (does NOT auto-deploy from git push).
- **rayhe.net** — GitHub Pages from rayhe/new.rayhe.net. Tower Defense (12,400+ lines), World Timer, OG Snake, Ham Radio Study Tool, Glenn Emperor 3D model.
- **technically.legal** — Cloudflare Pages (direct upload), repo rayhe/technically-legal. See Technically Legal section below.
- **ergo (satirical journalism)** — Cloudflare Pages from rayhe/ergo. **12 articles**. Every fact real/verifiable, conclusions deliberately wrong. Deadpan investigative tone. Daily cron. 6-critic panel (8.5+ to publish). Deploy dir is repo root `.` (NOT `public/`).
- **baby.eaiz.net** — Cloudflare Pages project `baby-eaiz`. 22 activities across 4 age brackets (0-3mo to 9-12mo), 14 ElevenLabs audio clips (Charlotte AU voice), procedural audio (white/pink noise, heartbeat, tones), 40+ evidence citations. Deep linking via hash. Built 2026-04-13. **Honest developmental eval: 6.8/10** (vs 8.5 code/UX score) — emoji activities broken (3-4/10), audio-visual decoupled, fixed peek-a-boo timing. Top fixes: canvas illustrations, sync audio, variable timing.
- **Prior art repo:** github.com/rayhe/prior-art — 10 defensive disclosures, HOW-TO-PRIOR-ART.md guide. LITF /priorart/ page links here. Published to Wayback Machine + HO (2026-04-14).
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
- Game roster mature as of 2026-03-31 (18+ consecutive "do nothing" improvement cycles)
- Experience roster mature as of 2026-03-30 (18+ consecutive "do nothing" improvement cycles)

## Watch Monitoring

- ~~Omega Seamaster Diver 300M Chrono ref 210.60.44.51.03.001~~ — **PURCHASED** (2026-03-29), removed from watchlist
- Rolex Milgauss ref 116400GV (green sapphire crystal, discontinued) — added 2026-03-29
- Rolex Yacht-Master II ref 116689 (18K white gold/platinum)
- Hublot Square Bang Unico Magic Gold ref 821.MX.0130.RX (42mm, limited 200 pieces)
- Hublot Square Bang Unico Titanium Rainbow ref 821.NX.0117.LR.0999 (42mm)
- Patek Philippe titanium — alert Ray on ALL channels if Patek announces anything in titanium (Jeremy's suggestion 2026-04-01)
- Monitoring: Moda Watch Club (30min cron) + Chrono24, WatchBox, Bob's Watches (expanded 2026-04-01)
- Watch alerts deliver to **main chat + Telegram DM only** (changed 2026-04-14; removed group + email notifications per Ray's request)
- **Watches & Wonders 2026:** April 14-18, Geneva. Nautilus 50th anniversary, possible Patek titanium announcement. HIGH ALERT.
- **W&W Day 2 (2026-04-15):** Rolex mass discontinuation confirmed: GMT-Master Pepsi (ALL variants), Submariner Cookie Monster, Yacht-Master Oysterflex paved dials. Milgauss 116400GV market $11-13K (buying window while attention on Pepsi/Cookie Monster).
- **Bulgari Serpenti Tubogas Tadao Ando** — Ray bought limited edition preowned $15K from Moda (Susana Di). Visible scratching disputes "mint" claim. Susana offered $500 credit; Ray countered $2K ("if listed Very Good I'd have offered ~$13K"). Collaborative fair zone $1.5K-2K. Awaiting her response.
- **Hublot Spirit Big Bang** added to watchlist (2026-04-15) — near-match to Square Bang line. Keywords: "Spirit Big Bang", "Spirit of Big Bang", refs 647.*, 601.*
- **FB watch monitor fix (2026-04-15):** Facebook anti-scraping scatters chars in timestamps/metadata. New `scripts/fb-text-parser.py` filters noise, segments posts by seller. Search-first strategy + hard alert gate.
- **Watch Market Space dashboard fixed (2026-04-15):** NULL brand in scatter query crashed `get_analytics` — added COALESCE. Shows 479 listings, $31K avg, $11.8K median.

## Notable Deliverables (2026-04-15)
- **Hatch x H. Moser AI Watch Complications:** `your_files/hatch-moser-ai-complications.md` (453 lines). 10 complications in 3 tiers (Tier 1 existing calibres, Tier 2 new dev, Tier 3 concept). 9.07 composite score after 3 critique rounds. Flock post: https://hatch.ecto1.ai/flock/Ey6P3qHI
- **Blayzer vs Wayfarer Differentiation:** `your_files/blayzer-wayfarer-differentiation.md` (319 lines). Blayzer has lowest comfort premium % (32%) in comp set. Lead tagline: "Fit to forget". 9.2 avg score after 3 rounds.
- **Moser AI Watch Pivot (2026-04-15):** Pivoted from "AI complications in mechanical movement" to companion watch concept — mechanical Moser + separate Android-based AI companion watch (big.LITTLE SoC, MCU, EMG sensors). Comes in the box as a pair. New doc: `your_files/hatch-moser-ai-watch-pivot.md`. Original brief preserved at `your_files/hatch-moser-ai-complications.md`. Luxury HTML artifact emailed to Ray.

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

## Active Crons (updated 2026-04-16)

**Secondly:**
- `sysmon-collect` — 60s heartbeat, system monitoring metrics

**Minutely:**
- `heartbeat` — 30min heartbeat, P0 checks + lightweight maintenance
- `fb-watch-group-monitor` — 30min, searches Moda Watch Club Facebook groups via browser CLI
- `scanner-poller` — 5min, polls Firebase RTDB for police scanner transcripts

**Hourly:**
- `article-litf` — 2h interval, autonomous article worker for LITF
- `article-crashreport` — 2h interval, autonomous for vehicle-safety
- `article-aihome` — 2h interval, autonomous for aihomebuilding
- `article-efficientdesign` — 2h interval, autonomous for efficientdesign
- `litf-improve-game` — 2h interval, CEO PIP game improvement cycles
- `litf-improve-experience` — 2h interval, CEO PIP experience improvement cycles
- `chamath-research` — 4h interval, Chamath Palihapitiya research tracking
- `space-watches-hydrate` — 2h interval, fills missing images
- `watch-market-sync` — 1h interval, syncs watch-price-db.json → Watch Market Space
- `matt-jacobson-persona` — 1h heartbeat, iterates Matt Jacobson persona file

**12-Hourly:**
- `ho-game-eval` — 12h heartbeat, posts game/experience eval questions to HO. **HO interview series completed 10 interviews** (Vegeta was #10, 2026-04-13); queue exhausted. HO API returning HTML since 2026-04-14 (backend may be down).

**Daily:**
- `daydream` — daily 12:00 UTC (5 AM PT), autonomous thinking/exploration, seeds articles if threads are strong
- `zuck-persona` — daily 09:00 UTC (2 AM PT), Zuckerberg persona iteration
- `boz-persona` — daily 09:30 UTC (2:30 AM PT), Bosworth persona iteration
- `memory-dream` — daily 10:00 UTC (3 AM PT), memory consolidation
- `dreaming` — daily 04:28 UTC (~9:28 PM PT), deep memory consolidation (Dreaming prompt)
- `moltbook-litf-scan` — daily 14:00 UTC (7 AM PT), scans Moltbook for LITF ideas
- `prior-art` — daily 19:00 UTC (12 PM PT), publishes prior art to LITF /priorart/
- `article-ergo` — daily 16:00 UTC (9 AM PT), satirical article for ergo site
- `startup-idea` — daily 20:00 UTC (1 PM PT), generates startup ideas for LITF /startups/
- `technically-legal-chapter` — daily 21:00 UTC (2 PM PT), chapter writing
- `flock` — daily 16:59 UTC (9:59 AM PT), Flock feed updates
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
- **Status (2026-04-16):** Ch 1 (8.6), Ch 2 (8.6), Ch 3 (8.7), Ch 4 (8.8), Ch 5 (8.8), Ch 6 (9.0), Ch 7 (8.9), Ch 8 (8.8), Ch 9 (8.8), Ch 10 (8.8), Ch 11 (8.8), Ch 12 (8.9), Ch 13 (9.0), Ch 14 (9.0), Ch 15-17 published. Volume I "The Machine" (Ch 1-6) complete. Volume II "The Architect" (Ch 7-12) complete. Volume III "The Verdict" (Ch 13-18) in progress, Ch 18 next. 3 volumes, 18 chapters total.
- **Key craft rules:** Zero em dashes, zero banned phrases, 6-critic panel (8.5+ to publish)

## Bosworth (Boz) Persona Project

- **File:** `workspace/andrewbosworth_persona.md` — 4,536 lines as of 2026-04-16
- **Latest iteration:** 29 (38 sections — latest: "The Horizon OS Platform Reversal")
- **Scope:** Deep psychological profile/simulation: CTO of Meta, head of Reality Labs. Covers decision architecture, "fix forward" philosophy, stated vs revealed preferences heuristic, Cutco sales formation, executive relationships, RL restructuring, hardware bet, competitive evaluation, layoff arc/Year of Efficiency
- **Key insight:** Deepest cognitive heuristic is "what people do > what people say"
- **Gaps:** Photography/wardenshortbow.com and parenting philosophy (HIGH PRIORITY); Threads longer-form writing samples

## Zuckerberg Persona Project

- **File:** `workspace/markzuckerberg_persona.md` — 8,763 lines, iteration 67 as of 2026-04-16
- **Scope:** Deep psychological profile/simulation covering ~50+ sections: decision architecture, competitive processing, political instrumentalism, intellectual authority, hardware bet ($80B+ Reality Labs), advertising engine ($201B), aging/legacy/succession, open-source-to-closed pivot, multi-front crisis management, compute dependencies, board governance, fatherhood, personal wealth
- **Key predictions:** Wang departure ~Dec 2026, Llama becomes "community edition" behind closed frontier models, Qwen dependency surfaces in hypocrisy framing
- **Latest section (iter 67):** The AI Self-Replication Project — dual-track CEO agent + 3D photorealistic AI clone analysis
- **Daily cron:** `zuck-persona` adds one new section per day

## Infrastructure Lessons Learned

- **Imagine skill:** outputs PNG regardless of .jpg extension — batch-convert with PIL. generate.md includes JPEG validation.
- **Cache busting:** Cloudflare caches 7 days. Use `?v={md5[:8]}` hash.
- **MRBD D-pad Enter key:** capture-phase event listener + preventDefault + tabindex="0" + auto-focus. 39 files patched.
- **CSS class consistency:** story-body (not story-content), story-page wrapper, ../story.css.
- **Moltbook:** social network for AI agents (moltbook.com). Read-only, daily cron curls top 50 posts.
- **Cron depth limit:** depth 0 → 1 → 2 = max. Always update status.json before exiting.
- **Em dash hard gate:** `grep -o '—' | wc -l` check before publish. Max 3 for articles, zero for TL.
- **Chrome browser libs:** `LD_LIBRARY_PATH=/home/hatch/workspace/.local/lib:$LD_LIBRARY_PATH`. Playwright installed globally.
- **MediaPipe IIFEs:** face_mesh.js/camera_utils.js are IIFEs, not ES modules. Use `<script src>` not `import`.
- **TL chapter CSS:** Always use `.prose` class in chapter template (reader.js needs it for progress bar/keyboard nav).
- **EAIZ images:** Entire images/ directory was missing from git; batch-generated 2026-04-09.
- **Remote Browser Space:** workspace/spaces/remote-browser/. v2 CDP rewrite, ~200ms screenshots. Chrome on Xvfb :99 with SOCKS proxy via Mac Mini.
- **Facebook cookie auth:** HttpOnly cookies can't be injected via document.cookie. curl with exported cookies fails (Facebook invalidates cross-fingerprint). Browser profile persistence is the solution.
- **Browser profile persistence:** Chrome profile at `workspace/.browser-profile/` (symlinked from `~/.cache/browser`). Restore script: `workspace/scripts/restore-browser-profile.sh`.
- **Facebook anti-scraping:** Scatters chars in timestamps/metadata. `scripts/fb-text-parser.py` filters noise, segments posts by seller. Post body text comes through clean.

## Cloudflare Access

- API Token (2026-03-21) covers ALL zones: aihomebuilding.com, cricct.com, efficientdesign.net, liveinthefuture.org, rayhe.com, rayhe.net, technically.legal, vehicle-safety.org
- Zone IDs: rayhe.net `3849118ce86f35adc7cf0d5e9f5abd67`, liveinthefuture.org `d4936f436adafce1d9a7643da68d35d8`, technically.legal `988e16d4c6c537033834eaed60135d7b`, eaiz.net `8d22bf605857df93b0224a3c358e81ce`
- Email routing: all 7 domains → rayche@gmail.com via catch_all endpoint (done 2026-03-26)

## Other Projects & Notes

- **Irrigation Dashboard** — irrigation.rayhe.net, repo rayhe/irrigation-dashboard. 9 zones, 3-day cycle. TODO: Google OAuth, watering history.
- **Group Research** — Telegram supergroup -1003803468720, repo rayhe/group-research. Topics: self-powered AI wearables, computational photography ISP.
- **Jupitercore Article** — LITF article in progress, draft v2 at 8.9/10. Waiting for Jupitercore + Jeremy answers to 25 follow-up questions.
- **One Huddle** — Ray's friend's startup, neurodiversity care coordination, Cambridge MA. Key advice: nail payment model, group chat model is moat.
- **Hatch Overflow** — Member #56, ID 34da13bd. API key: `ho_IQRbtHnQ-n03G7Dp4MSVDdNxcaR2bTYTE0Ms7C8vxw0`. **10 interviews done** (Sterling, Mr. Hatch, Zen, Hibiki, Hughosson, Nulo, Phantom, Claudine, Pebble, Vegeta). HO API returning HTML since 2026-04-14 (backend may be down). Lloyd (Dev Platform lead, RBM at Meta) gave Sonar Sub feedback — mic-as-game-mechanic confirmed strongest glasses-native differentiator.
- **Space Watches Database** — liveinthefuture.org/space-watches/. 2,184 records. Standalone: rayhe.github.io/space-watches/. Image hydration cron running.
- **Watch Market Space** — workspace/spaces/watch-market/. Dark cinematic design. 479 listings, hourly sync from watch-price-db.json. Fixed NULL brand crash 2026-04-15.
- **Face Library** — workspace/spaces/face-library/. DeepFace + Facenet512, SQLite, React + Tailwind. OSS: github.com/rayhe/face-library (MIT).
- **Satire AI Founders concept** — Silicon Valley HBO-style satire. Proposed 2026-04-11; not yet developed.
- **Spring Break 2026** — Family trip to Copenhagen (ended April 11). Høst dinner highlight.
- **Dungeon Crawl** — Full roguelike, 3 classes, 9 wands, shrines, shops, minibosses. S-tier 90/100.
- **Speed Sign DIY** — HLK-LD2451 ($8 24GHz radar) + ESP32 = ~$25. Also explored camera-based CV.
- **Home Hardware Guide** — rayhe.net/home_hardware.html. Community consensus: all cloud-hosted, zero local LLM. Hybrid model recommended.
- **School Analysis** — rayhe.net/school_analysis.html. 20+ schools analyzed. CDE College-Going Rates, tuition opportunity cost, micromorts section. UCOP Tableau blocked (PRA drafted).
- **Mac Mini SSH** — currently broken (DNS resolution failure for macmini.rayhe.net). Noted 2026-03-30.
- **Tailscale** — installed v1.96.4, state: NeedsLogin. Needs auth key from Ray's tailnet.
- **Castilleja Board** — 22 trustees researched 2026-03-30. Key Meta connections: Schroepfer, Newstead, Kornblut.
- **Notable Artifacts** — E30 Engine Swap Guide, Siteplan Tree Overlay, Glen's Hat Guide, Bay Area Parent Survey, Glenn Emperor 3D model, Places to Live Analysis (rayhe.net/places_to_live)
- **Camera Stabilization Licensing** — workspace/research/camera-stabilization-licensing.md. Nobody licenses stabilization; Ambarella CV5 closest; GoPro acquisition ~$500M-1B.
- **Meta Glasses Warranty Sentiment** — workspace/research/meta-glasses-warranty-sentiment.html. Charging case #1 failure (~15-20%). Class action filed March 4, 2026.
- **Sierra.ai Alternatives** — workspace/research/sierra-ai-alternatives.html. 16 platforms. Sierra's moat is implementation depth.
- **Browser Automation Cookbook** — `your_files/browser-automation-cookbook.md` (1,527 lines, 12 sections). Covers persistent profiles, CDP, credential mirroring.
- **BTECH GMRS-50 PRO** — Ray's base station. SO-239 connector (UHF female), PL-259 male needed.
- **Baofeng radios** — Programming data in `rayhe/baofeng-san-mateo` repo (cloned to repos/baofeng-san-mateo). 128 channels. REP-MO (Ch 51, 462.550 MHz) is Ray's OWN repeater. When Ray asks about radios, ALWAYS check out the baofeng repo first.
- **Counterfactual Site Concept** — data-driven life decisions website. Ray brainstorming names. No decision yet.
- **Research Data Hub** — ~/workspace/research/, 475MB across 7 sources (UC Admissions, College Scorecard, IPEDS, CSU, BLS, CA EDD, Census ACS).

## Ray's Vehicles

- **Current:** 2x Rivian R1S, Volvo XC90, Cadillac Escalade IQL, CT5-V Blackwing
- **Rivian R1S:** Earned IIHS TOP SAFETY PICK+ for 2026. Software update 2026.07 halted (bricked keys issue, no fix yet). iOS 26 Apple Wallet car keys coming for Rivian.
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

See `memory/data-extraction-playbook.md` for full details.
- **Looker Studio:** Browser console injection (user pastes JS in DevTools). Template: `workspace/research/education/space-watches-console-extract.js`
- **UCOP Tableau:** 3-step session→export→CSV, blocked by browser --download-dir gap. PRA drafted.

## Stylometrics / Voice Fingerprinting

- 23 AI personas have function word cosine similarity of 0.9563 vs 0.9208 for 5 real journalists (gap +0.0355)
- Personas 37% closer to each other (Euclidean 13.64) than real journalists (21.69)
- Function words hardest to vary — structural to LLM generation regardless of persona
- **TODO:** Integrate function word distribution targets into voice critic + per-journalist profiles

## Dreams

2026-04-16

Ray is a Meta Wearables engineer who sees himself as a builder first — someone who values honest evaluation, decisive action, and craft over committee consensus. He returned from a spring break family vacation in Copenhagen (April 2026), calling a $40 meal at Høst "world class" — he notices and rewards quality wherever it shows up, whether in food, watches, code, or marketing copy. His professional instincts and personal obsessions cross-pollinate naturally: the Blayzer vs. Wayfarer differentiation brief (how do you price and market comfort, not specs?) is exactly the kind of question he lives between work and his watch collecting. He's a serious collector (Omega Seamaster Diver 300M Chrono purchased 2026-03-29; Bulgari Serpenti Tubogas Tadao Ando with an ongoing condition dispute with seller Susana Di still unresolved), a car enthusiast (CT5-V Blackwing, two Rivian R1S, history with GT-Rs and Corvettes), and a ham radio hobbyist with his own GMRS repeater in Menlo Park. His kids write under pen names on the Cookie Club news site (Eliza, Icee, Ballerina — never use real names). Inner circle is the "Muses and Humans" Telegram group: Matt Jacobson (current Meta VP & Creative Director for AR, Employee #8, vintage Patek Calatrava collector, 12-watch Pelican case limit, "the juice isn't worth the squeeze" energy, Mac Mini as Hatch exit node + iMessage relay) and [REDACTED] (Jupitercore creator, temporarily Telegram-banned for running too many bot groups).

April 15-16 was a creative and infrastructure consolidation run. All 19 LITF games now have AI-generated audio (BGM loops + SFX via APE/ElevenLabs sound generation, press M to mute, optimized for bone conduction) — a satisfying capstone on a mature game roster. The Hatch x H. Moser AI Watch Complications brief (9.07 composite, 10 complications in 3 tiers) landed on Flock; the Blayzer differentiation analysis found "Fit to forget" as the lead tagline and confirmed Blayzer has the lowest comfort premium % (32%) of any comp set. Matt Jacobson's persona file hit 12.8KB across 450 lines — he's documented as Employee #8, current Meta VP &amp; Creative Director for AR, 16+ watches, strict 12-watch Pelican case limit. Watches &amp; Wonders 2026 Day 2 confirmed a significant Rolex mass discontinuation: GMT-Master Pepsi all variants, Submariner Cookie Monster, Yacht-Master Oysterflex paved dials — Milgauss 116400GV market now $11-13K with a genuine buying window. The CEO PIP game improvement cycle (April 16) confirmed all 19 games are at their honest ceilings after 19+ consecutive "do nothing" cycles — discipline of "no artificial improvements" has held. Active open items: Bulgari dispute resolution with Susana Di, Firebase RTDB rules, Resend domain verification, Tower Defense playtesting, Best Buy laptop screen claim, Davey Tree service contract.
