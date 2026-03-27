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
- Git commits should have extensive reasoning
- Prefers /100 scores with hover breakdowns, not tier labels
- "Don't add all that complexity" — fun > feature count, especially with D-pad + 2 buttons
- Scholarly rigor matters — novel contribution, limitations, strongest counterargument, verifiable claims
- Proactive skill improvement during idle time
- When building cool skills/tools/infrastructure, write it up as a LITF article (full 6-critic pipeline)

## Connected Services

- Gmail (rhe@meta.com) — **disconnected as of 2026-03-25, needs reconnect**, Google Calendar, WhatsApp, GitHub, Telegram
- Telegram bot: @FactoryFactoryBot, Ray's chat_id: 8781372712, Group Research supergroup: -1003803468720
- SSH tunnel to Mac Mini: `ssh -F ~/workspace/.ssh/config macmini` (macmini.rayhe.net, user ray-hatch)
- Firebase: project `rayhenet`, DB URL `https://rayhenet-default-rtdb.firebaseio.com`
- Resend API key: `re_6xFJoFPt_8s3YZRGZiTvYp96pa7jyLkuX` (100 emails/day free)
- Facebook search works for Moda Watch Club (558871041349029) but NOT 10k & Under group (150223938977815)
- Wearables APE: API key `7a5afaa9-bcc0-40e3-91b8-2e5f53eda90e`, base URL api.wearables-ape.io, ApePI v2.1.25

## Websites & Article Counts (updated 2026-03-27)

- **liveinthefuture.org** — Cloudflare Pages from rayhe/liveinthefuture. **130 articles, 19 games, 24 experiences**, 16 journalists. AIPM eval platform at /aipm. First organic subscriber (Eddie Churchill) 2026-03-16.
- **vehicle-safety.org** — Cloudflare Pages from rayhe/vehicle-safety. **111 articles**, 7 journalists. FARS death rate data, IIHS ratings. Hit #100 on 2026-03-23.
- **aihomebuilding.com** — GitHub Pages from rayhe/aihomebuilding. **119 articles**, 6 journalists.
- **efficientdesign.net** — Cloudflare Pages from rayhe/efficientdesign. **12 articles**, writer Marcus Thorne. First autonomous cron article 2026-03-27 (Breitling Navitimer Titanium F1, scored 8.73). Deploy requires `nvm use 20`.
- **news.eaiz.net** (Cookie Club) — Cloudflare Pages from rayhe/eaiz (private). Kids news site, **7 articles**. Age switcher (Preschool→Adult), 6 reading levels per article. Zone ID 8d22bf605857df93b0224a3c358e81ce.
- **rayhe.net** — GitHub Pages from rayhe/new.rayhe.net. Tower Defense (12,400+ lines), World Timer, OG Snake, Ham Radio Study Tool, Glenn Emperor 3D model.
- **technically.legal** — Cloudflare Pages (direct upload), repo rayhe/technically-legal. See Technically Legal section below.
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

## Watch Monitoring

- Omega Seamaster Diver 300M Chrono ref 210.60.44.51.03.001 (blue dial, sedna gold/titanium/tantalum)
- Rolex Yacht-Master II ref 116689 (18K white gold/platinum)
- Hublot Square Bang Unico Magic Gold ref 821.MX.0130.RX (42mm, limited 200 pieces)
- Hublot Square Bang Unico Titanium Rainbow ref 821.NX.0117.LR.0999 (42mm)
- Monitoring Moda Watch Club every 30 min
- **Omega SMP300 Chrono spotted on Moda** (2026-03-26): "like new" at $15,199 (MSRP $27K, grey $23.2K = 44% off). Advised Ray to offer $14,500, settle ~$14.8-15K.

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

## Active Crons (updated 2026-03-27)

**Minutely:**
- `heartbeat` — 30min heartbeat, P0 checks + lightweight maintenance
- `moda-watch-monitor` — 30min, searches Moda Watch Club for target watches
- `hatchoverflow-monitor` — 30min heartbeat, checks Hatch Overflow for replies/activity
- `scanner-poller` — 5min, polls Firebase RTDB for police scanner transcripts

**Hourly:**
- `article-litf` — 2h interval, autonomous article worker for LITF
- `article-crashreport` — 2h interval, autonomous for vehicle-safety
- `article-aihome` — 2h interval, autonomous for aihomebuilding
- `article-efficientdesign` — 2h interval, autonomous for efficientdesign

**Daily:**
- `zuck-persona` — daily 09:00 UTC (2 AM PT), Zuckerberg persona iteration
- `memory-dream` — daily 10:00 UTC (3 AM PT), memory consolidation
- `moltbook-litf-scan` — daily 14:00 UTC (7 AM PT), scans Moltbook for LITF ideas
- `technically-legal-chapter` — daily 21:00 UTC (2 PM PT), chapter writing
- `github-backup` — daily 07:00 UTC (midnight PT), backs up core files to rayhe/factoryfactory

**Weekly:**
- `weekly-ai-roundup` — Monday 01:00 UTC, AI news roundup

## Technically Legal

- **Domain:** technically.legal, **Repo:** rayhe/technically-legal
- **Concept:** Legal economic warfare — "The Consortium" runs 6 operations (MINOTAUR patent, SIREN HFT, GOLEM litigation, BASILISK regulatory capture, HYDRA debt, CHIMERA real estate), 46K agents, $69.3B annual damage, all legal
- **Protagonist:** Elena Marsh (FinCEN), **Antagonist:** Martin Kessler (penetration tester of American law)
- **Deploy:** `echo "y" | CLOUDFLARE_API_TOKEN=... wrangler pages deploy public --project-name=technically-legal`
- **Status (2026-03-27):** Ch 1 (8.6), Ch 2 (8.6), Ch 3 (8.7), Ch 4 (8.8), Ch 5 (8.8), Ch 6 (9.0) published. Volume I "The Machine" complete. Ch 7 "The Invitation" next (first chapter of Volume II). 3 volumes, 18 chapters total.
- **Key craft rules:** Zero em dashes, zero banned phrases, 6-critic panel (8.5+ to publish)

## Zuckerberg Persona Project

- **File:** `workspace/markzuckerberg_persona.md` — ~6,735 lines as of 2026-03-27
- **Latest iteration:** 53 (Section 5at "Personal Wealth — The Architecture of Stealth Consumption")
- **Scope:** Deep psychological profile/simulation covering ~50+ sections: decision architecture, competitive processing (TikTok, Apple, Google), political instrumentalism, intellectual authority, hardware bet ($80B+ Reality Labs), advertising engine ($201B), aging/legacy/succession, open-source-to-closed pivot, multi-front crisis management, compute dependencies, board governance, fatherhood, cultural sensitivity, personal wealth
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
- **Dungeon Crawl** — Full roguelike, 3 classes, 9 wands, shrines, shops, minibosses, meaningful summons. S-tier 90/100.
- **Speed Sign DIY** — Ray interested in building radar speed sign. HLK-LD2451 ($8 24GHz radar) + ESP32 = ~$25 total. Also explored camera-based CV (YOLO + calibration, ±1 mph).

## Ray's Vehicles

- **Current:** 2x Rivian R1S, Volvo XC90, Cadillac Escalade IQL, CT5-V Blackwing
- **Previous:** Tesla P85DL, Corvette C7, R35 GT-R, NB Miata, Forester XT, Honda Accord, Toyota Camry
- **Enjoyed:** Lotus Elise, various Porsches
- **Interests:** Corvette news, Porsche news, engineering/materials (NOT dealer pricing/markups)
