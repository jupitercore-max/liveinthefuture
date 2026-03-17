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
- Gmail (rhe@meta.com), Google Calendar, WhatsApp, GitHub
- SSH tunnel to Mac Mini: `ssh -F ~/workspace/.ssh/config macmini` (macmini.rayhe.net, user ray-hatch)
- Firebase: project `rayhenet`, DB URL `https://rayhenet-default-rtdb.firebaseio.com`
- Resend API key: `re_6xFJoFPt_8s3YZRGZiTvYp96pa7jyLkuX` (100 emails/day free)
- Facebook search works for Moda Watch Club (558871041349029) but NOT 10k & Under group (150223938977815)

## Websites & Article Counts
- **liveinthefuture.org** — Cloudflare Pages from rayhe/liveinthefuture. 63+ articles, 14 journalists, 16 games, 22+ experiences. AIPM eval platform at /aipm.
- **vehicle-safety.org** — Cloudflare Pages from rayhe/vehicle-safety. 75+ articles, 6 journalists. FARS death rate data, IIHS ratings.
- **rayhe.github.io/aihomebuilding** — GitHub Pages from rayhe/aihomebuilding. 80+ articles, 6 journalists.
- **new.rayhe.net** — GitHub Pages from rayhe/new.rayhe.net. Tower Defense (12,400+ lines), World Timer, OG Snake.

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

## Pending (Ray needs to do)
1. Firebase RTDB rules — add `newsletters` path write permissions
2. Resend domain verification — add liveinthefuture.org, vehicle-safety.org, aihomebuilding.com at resend.com/domains
3. Play Tower Defense — 50+ features, 40+ self-critique skips waiting for human feedback

## Active Crons (as of 2026-03-14)
- 3 article crons (LITF, Crash Report, AI Home Building) — 2h intervals, 5-phase pipeline
- 2 game/experience crons — 2h intervals, 10-dimension scoring
- moda-omega-monitor — every 30 min
- scanner-monitor — daily 7am PT
- aipm-update — weekly Sun 11am PT

## Ongoing Commitments
- Newsletter system wired (Firebase + Resend) but blocked on Ray's Firebase rules + domain verification
- Microphone research requested (multi-mic, <$300, outdoor, 6000 sqft) — subagent dispatched
- "Technically Legal" novel concept exists at workspace/technically-legal/concepts.md — never built, Ray has asked multiple times
