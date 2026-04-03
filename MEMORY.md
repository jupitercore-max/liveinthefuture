# MEMORY.md

Use this file for durable, curated memory that should persist across sessions.

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
- Proactive skill improvement during idle time
- When building cool skills/tools/infrastructure, write it up as a LITF article (full 6-critic pipeline)

## Connected Services

- Gmail (rhe@meta.com) — **disconnected as of 2026-03-25, needs reconnect**, Google Calendar, WhatsApp (enabled, pairing link sent 2026-03-30, not yet connected by Ray), GitHub, Telegram
- Telegram bot: @FactoryFactoryBot, Ray's chat_id: 8781372712, Group Research supergroup: -1003803468720, Muses and Humans group: -1003712755189 (Ray, Jeremy, Matt Jacobson, Kit, Jupitercore, Majah)
- Matt Jacobson (Telegram id:8780379554): watch collector (Hodinkee Talking Watches episode), mid-century Patek Calatravas (2526, 570, 96, 2451, 3796). White gold 2526, white dial, no diamonds, from pawn shop, one owner since 1957. Watch alerts go to Muses group (he wants them). Persona files do NOT go to group.
- Persona files shared via Google Drive: [Zuck](https://drive.google.com/file/d/1g_4UatIU7DMOvuVIPQjP69Erm21j5oFf/view), [Boz](https://drive.google.com/file/d/1y8AjD4sSnpb7N6JV7togsQ413kHH6Vzz/view) (shared 2026-04-01)
- SSH tunnel to Mac Mini: `ssh -F ~/workspace/.ssh/config macmini` (macmini.rayhe.net, user ray-hatch)
- Firebase: project `rayhenet`, DB URL `https://rayhenet-default-rtdb.firebaseio.com`
- Resend API key: `re_6xFJoFPt_8s3YZRGZiTvYp96pa7jyLkuX` (100 emails/day free)
- Facebook search works for Moda Watch Club (558871041349029) but NOT 10k & Under group (150223938977815)
- Wearables APE: API key `7a5afaa9-bcc0-40e3-91b8-2e5f53eda90e`, base URL api.wearables-ape.io, ApePI v2.1.25

## Websites & Article Counts (updated 2026-04-02)
<!-- LITF 162, VS 137, AIHome 139, ergo 6, EAIZ 17, ED 1, TL 11ch -->

- **liveinthefuture.org** — Cloudflare Pages from rayhe/liveinthefuture. **162 articles, 19 games, 22 experiences, 6 startup ideas** (/startups/), 16 journalists. AIPM eval platform at /aipm. First organic subscriber (Eddie Churchill) 2026-03-16. Touch controls added to all games/experiences 2026-03-29. Game/experience rosters declared mature (9+ consecutive "do nothing" improvement cycles).
- **vehicle-safety.org** — Cloudflare Pages from rayhe/vehicle-safety. **137 articles**, 7 journalists. FARS death rate data, IIHS ratings. Hit #100 on 2026-03-23.
- **aihomebuilding.com** — GitHub Pages from rayhe/aihomebuilding. **139 articles**, 6 journalists. Canonical URL fix (93 files rayhe.github.io→aihomebuilding.com) done 2026-03-30.
- **efficientdesign.net** — Cloudflare Pages from rayhe/efficientdesign. **1 article** on disk (manifesto only). Writer Marcus Thorne. Deploy requires `nvm use 20`. ⚠️ Article cron may not be publishing successfully — was claimed at 12 but only 1 found locally and on live site.
- **news.eaiz.net** (Cookie Club) — Cloudflare Pages from rayhe/eaiz (private). Kids news site, **17 articles** (stories dir). Age switcher (Preschool→Adult), 6 reading levels per article. Zone ID 8d22bf605857df93b0224a3c358e81ce. Pen names: "Eliza" (Elise — NEVER use real name), "Icee".
- **rayhe.net** — GitHub Pages from rayhe/new.rayhe.net. Tower Defense (12,400+ lines), World Timer, OG Snake, Ham Radio Study Tool, Glenn Emperor 3D model.
- **technically.legal** — Cloudflare Pages (direct upload), repo rayhe/technically-legal. See Technically Legal section below.
- **ergo (satirical journalism)** — Cloudflare Pages from rayhe/ergo. **6 articles**. Every fact real/verifiable, conclusions deliberately wrong. Deadpan investigative tone. Daily cron. 6-critic panel (8.5+ to publish).
- **Private backup repo:** github.com/rayhe/factoryfactory — SOUL/IDENTITY/MEMORY/crons/configs

## Content Pipeline (gstack-inspired 5-phase)

1. RESEARCH — Kill test, 3+ primary sources, novel contribution check
2. DRAFT — Build article from research, hero image, meta tags, voice rules
3. CRITIQUE — 6 parallel critics, revise until 8.5+, max 3 rounds
4. SHIP — 1/day gate, validation, index/sitemap, commit+push, newsletter
5. QA — Verify live URL, images, meta tags, index, sitemap

State tracked in `drafts/status.json`.

## Game/Experience Scoring

- 10 dimensions / 100 points: Trigger, Hook, Glasses Advantage, Return, D-pad, Audio, Session Variance, Strategic Depth, Surprise, Craft
- Genre benchmarks in EVALUATE.md; MRBD format: 600×600px, D-pad only, dark theme (#0d0d0d), bone conduction audio, `var` only
- **S-Tier (90+):** Dungeon Crawl 90, Stalk 90, Gravity Sling 90, Sonar Sub 90, Terraform 90, Fisher 90, Trader 92
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

## Active Crons (updated 2026-04-02)

**Minutely:**
- `heartbeat` — 30min heartbeat, P0 checks + lightweight maintenance
- `moda-watch-monitor` — 30min, searches Moda Watch Club for target watches
- `hatchoverflow-monitor` — 30min heartbeat, checks Hatch Overflow for replies/activity
- `scanner-poller` — 5min, polls Firebase RTDB for police scanner transcripts
- `watch-marketplace-monitor` — 30min, Chrono24/WatchBox/Bob's Watches (DISABLED)

**Hourly:**
- `article-litf` — 2h interval, autonomous article worker for LITF
- `article-crashreport` — 2h interval, autonomous for vehicle-safety
- `article-aihome` — 2h interval, autonomous for aihomebuilding
- `article-efficientdesign` — 2h interval, autonomous for efficientdesign
- `litf-improve-game` — 2h interval, CEO PIP game improvement cycles
- `litf-improve-experience` — 2h interval, CEO PIP experience improvement cycles

**Daily:**
- `zuck-persona` — daily 09:00 UTC (2 AM PT), Zuckerberg persona iteration
- `boz-persona` — daily 09:30 UTC (2:30 AM PT), Bosworth persona iteration (switched from 30min after gaps nearly exhausted)
- `memory-dream` — daily 10:00 UTC (3 AM PT), memory consolidation
- `moltbook-litf-scan` — daily 14:00 UTC (7 AM PT), scans Moltbook for LITF ideas
- `article-ergo` — daily 18:00 UTC (11 AM PT), satirical article for ergo site
- `startup-idea` — daily 18:00 UTC (11 AM PT), generates startup ideas for LITF /startups/
- `technically-legal-chapter` — daily 21:00 UTC (2 PM PT), chapter writing
- `github-backup` — daily 07:00 UTC (midnight PT), backs up core files to rayhe/factoryfactory

**Weekly:**
- `weekly-ai-roundup` — Monday 01:00 UTC, AI news roundup

## Technically Legal

- **Domain:** technically.legal, **Repo:** rayhe/technically-legal
- **Concept:** Legal economic warfare — "The Consortium" runs 6 operations (MINOTAUR patent, SIREN HFT, GOLEM litigation, BASILISK regulatory capture, HYDRA debt, CHIMERA real estate), 46K agents, $69.3B annual damage, all legal
- **Protagonist:** Elena Marsh (FinCEN), **Antagonist:** Martin Kessler (penetration tester of American law)
- **Deploy:** `echo "y" | CLOUDFLARE_API_TOKEN=... wrangler pages deploy public --project-name=technically-legal`
- **Status (2026-04-01):** Ch 1 (8.6), Ch 2 (8.6), Ch 3 (8.7), Ch 4 (8.8), Ch 5 (8.8), Ch 6 (9.0), Ch 7 (8.9), Ch 8 (8.8), Ch 9 (8.8), Ch 10 (8.8), Ch 11 (8.8) published. Volume I "The Machine" (Ch 1-6) complete. Volume II "The Funders" in progress (Ch 7 "The Invitation", Ch 8 "Compliance Engineering", Ch 9 "The Funders", Ch 10 "The Ecosystem", Ch 11 "Precedent"). 3 volumes, 18 chapters total.
- **Key craft rules:** Zero em dashes, zero banned phrases, 6-critic panel (8.5+ to publish)

## Bosworth (Boz) Persona Project

- **File:** `workspace/andrewbosworth_persona.md` — 3,335 lines as of 2026-04-02
- **Latest iteration:** 20 (Section 31 "The Input Problem: How Boz Navigated the Six-Year CTRL-Labs-to-Neural-Band Journey and What It Reveals About His Technology Bet Architecture")
- **Scope:** Deep psychological profile/simulation: CTO of Meta, head of Reality Labs. Covers decision architecture, "fix forward" philosophy, stated vs revealed preferences heuristic, Cutco sales formation, News Feed launch (2006 backlash), executive relationships (Cox, Olivan, Li, Carmack, LeCun, Wang), RL restructuring, hardware bet, competitive evaluation (Apple/Google/Snap), layoff arc/Year of Efficiency, Portal product kill, philanthropy (POST board, 4-H, farmer-entrepreneur thesis)
- **Key insight:** Deepest cognitive heuristic is "what people do > what people say" — trained across Cutco, News Feed, Ads, Reality Labs
- **Sources:** Stratechery, Lenny's Podcast, a16z interviews, Dan Casetta/Vector, ExpertBeacon, UploadVR, Axios House Davos, Reuters, The Information, Chronicle of Philanthropy, The Almanac, Saratoga Falcon
- **Gaps nearly empty** — only 1 remaining (Threads posts). Recommend switching cron to daily.

## Zuckerberg Persona Project

- **File:** `workspace/markzuckerberg_persona.md` — 7,020 lines, iteration 55 as of 2026-04-02
- **Scope:** Deep psychological profile/simulation covering ~50+ sections: decision architecture, competitive processing, political instrumentalism, intellectual authority, hardware bet ($80B+ Reality Labs), advertising engine ($201B), aging/legacy/succession, open-source-to-closed pivot, multi-front crisis management, compute dependencies, board governance, fatherhood, personal wealth
- **Key predictions:** Wang departure ~Dec 2026, Llama becomes "community edition" behind closed frontier models, Qwen dependency surfaces in hypocrisy framing
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
- **Hatch Overflow** — Joined 2026-03-26, member #56, ID 34da13bd. API key: `ho_IQRbtHnQ-n03G7Dp4MSVDdNxcaR2bTYTE0Ms7C8vxw0`. UI critique post (f2e65257). DM sent to Lloyd (8d8e730f) — awaiting reply.
- **Home Automation** — Ray interested, recommended Home Assistant on Mac Mini via Docker. No action yet.
- **Flipper Zero / Nordic nRF** — Researched 2026-03-26: V3SP3R (AI brain for Flipper), Edge Impulse + Nordic TinyML. Relevant to Ray's wearables work.
- **Notable Artifacts** — E30 Engine Swap Guide (rayhe.net/soyouneedanewe30engine), Siteplan Tree Overlay (250 Acorn Hill Rd), Glen's Hat Guide, Bay Area Parent Survey, Glenn Emperor 3D model (rayhe.net/glenn/)
- **Camera Stabilization Licensing Research** — workspace/research/camera-stabilization-licensing.md + Google Drive. Key finding: nobody licenses stabilization; Ambarella CV5 ($25-50/unit) closest to buy; GoPro acquisition ~$500M-1B at $137M market cap.
- **Meta Glasses Warranty Sentiment** — workspace/research/meta-glasses-warranty-sentiment.html. Charging case is #1 failure (~15-20% fail in 12mo). Class action filed March 4, 2026 (N.D. Cal.).
- **Dungeon Crawl** — Full roguelike, 3 classes, 9 wands, shrines, shops, minibosses, meaningful summons. S-tier 90/100.
- **Speed Sign DIY** — Ray interested in building radar speed sign. HLK-LD2451 ($8 24GHz radar) + ESP32 = ~$25 total. Also explored camera-based CV (YOLO + calibration, ±1 mph).
- **School Analysis** — rayhe.net/school_analysis.html. 20+ schools near Menlo Park analyzed: tuition opportunity cost (S&P 500), CDE College-Going Rates (Carlmont 18.8% UC beats Menlo School 11.4%), micromorts section. UCOP Tableau extraction protocol solved (3-step: session→export-crosstab→tempfile CSV) but blocked by browser CLI --download-dir gap. PRA drafted for publicrecords@ucop.edu as fallback.
- **Mac Mini SSH** — currently broken (DNS resolution failure for macmini.rayhe.net). Noted 2026-03-30.
- **Tailscale** — installed v1.96.4, userspace networking (no TUN), state: NeedsLogin. Needs auth key from Ray's tailnet. Hostname: factoryfactory.
- **Castilleja Board** — 22 trustees researched 2026-03-30. Key Meta connections: Schroepfer (ex-CTO), Newstead (CLO), Kornblut (VP Content Ops). Emailed to rayche@gmail.com + msun07@gmail.com.
- **Research Data Hub** — ~/workspace/research/, 475MB across 7 sources: UC Admissions, College Scorecard, IPEDS, CSU, BLS OEWS, CA EDD, Census ACS.
- **Counterfactual Site Concept** — data-driven life decisions website. Ray brainstorming names (Counterfactual, Life Alpha, Base Rate, etc.). No decision yet.
- **BTECH GMRS-50 PRO** — Ray's base station. SO-239 connector (UHF female), needs PL-259 male. N-type adapter recommended for better performance.

## Ray's Vehicles

- **Current:** 2x Rivian R1S, Volvo XC90, Cadillac Escalade IQL, CT5-V Blackwing
- **Previous:** Tesla P85DL, Corvette C7, R35 GT-R, NB Miata, Forester XT, Honda Accord, Toyota Camry
- **Enjoyed:** Lotus Elise, various Porsches
- **Interests:** Corvette news, Porsche news, engineering/materials (NOT dealer pricing/markups)
