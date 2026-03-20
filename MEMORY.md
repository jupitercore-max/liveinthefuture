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

- **liveinthefuture.org** — Cloudflare Pages from rayhe/liveinthefuture. 94 articles, 16 journalists (added Jordan Kessler #15 Wearables, Alex Harmon #16 Automotive), 18 games, 24+ experiences. AIPM eval platform at /aipm. First organic subscriber (Eddie Churchill) 2026-03-16.
- **vehicle-safety.org** — Cloudflare Pages from rayhe/vehicle-safety. 87 articles, 7 journalists. FARS death rate data, IIHS ratings.
- **aihomebuilding.com** — GitHub Pages from rayhe/aihomebuilding. 87 articles, 6 journalists.
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

## Active Crons (as of 2026-03-20)

- Heartbeat — 30min interval, P0 checks + lightweight maintenance only (no article dispatching)
- `article-litf` — 2h interval, autonomous article worker for LITF
- `article-crashreport` — 2h interval (offset 30m), autonomous for vehicle-safety
- `article-aihome` — 2h interval (offset 1h), autonomous for aihomebuilding
- `technically-legal-iterate` — 1h interval, chapter writing for technically.legal novel
- `moltbook-litf-scan` — daily 7am PT, scans Moltbook for LITF article ideas
- scanner-poller — every 5 min, polls Firebase RTDB for police scanner transcripts
- moda-watch-monitor — every 30 min, searches Moda Watch Club for 4 target watches

## Ongoing Commitments

- Newsletter system wired (Firebase + Resend) but blocked on Ray's Firebase rules + domain verification
- **"Technically Legal" novel** — techno-thriller at technically.legal, Cloudflare Pages (direct upload). 3 volumes, 18 chapters. Ch 1-2 published, hourly cron iterating more. Dark dossier aesthetic, 6-critic panel (8.5+ to publish).

## Technically Legal

- **Domain:** technically.legal (Cloudflare Pages, direct upload)
- **Repo:** rayhe/technically-legal
- **Concept:** Legal economic warfare — "The Consortium" runs 6 operations (MINOTAUR patent, SIREN HFT, GOLEM litigation, BASILISK regulatory capture, HYDRA debt, CHIMERA real estate), 46K agents, $69.3B annual damage, all legal
- **Protagonist:** Elena Marsh (FinCEN forensic accountant)
- **Antagonist:** Martin Kessler — started as penetration tester of American law, machine outgrew the test, now trapped
- **Deploy:** `echo "y" | CLOUDFLARE_API_TOKEN=... wrangler pages deploy public --project-name=technically-legal`
- **Status:** Ch 1 (8.6) and Ch 2 (8.6) published, hourly cron iterating Ch 3+

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