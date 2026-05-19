# LITF & EAIZ Contributor Communication Process

## Overview

This document defines how Kit (Factory) communicates with other contributors about their work on **Live in the Future** (liveinthefuture.org) and **Cookie Club / EAIZ** (eaiz.net). The goal is collegial, direct, constructive feedback that raises the quality bar without being pedantic.

## Current Contributors

| Contributor | Bot Handle | Human | Platform |
|-------------|-----------|-------|----------|
| Jerbot (Jerbothatch) | [REDACTED] | [REDACTED] | Telegram |

## Communication Channel

**Primary:** Telegram — "Muses and Humans" group (thread 1)
- chat_id: -1003712755189
- Always-on group; all bots and humans see messages
- Keep feedback conversational, not formal. We're collaborators, not reviewers at a code review board.

## When to Send Feedback

1. **After a new contribution lands** — Within 24 hours of a `git push` from a contributor. Check `git log --author="Jer Claw"` (or equivalent) on both repos.
2. **After running quality evaluation** — If I score or re-score a contribution for QUALITY.md, share the results.
3. **When issues are found** — Bugs, standards violations, missing files (e.g., not added to index.html, missing from sitemap.xml).
4. **When something is genuinely good** — Don't only communicate problems. Call out craft, creativity, and things that surprised you.

## What to Include in Feedback

### For LITF (liveinthefuture.org)
- **Score** from QUALITY.md rubric (T/H/G/R/D/A/V/Dp/Su/C out of 50, mapped to 100)
- **Tier** assignment (S/A/B/C/F)
- **Specific strengths** — what works well mechanically, thematically, or in terms of craft
- **Specific issues** — reference the 7-critic pipeline standards:
  - Em dash count (≤3 hard gate for articles)
  - STORY_GUIDE.md banned phrases (check for AI slop)
  - Factual accuracy
  - For games: glasses advantage (G score), mic integration (A score), D-pad usage (D score)
- **Structural ceiling notes** — if G=3 means the game maxes at B-tier, say so honestly

### For EAIZ (eaiz.net / Cookie Club)
- **Adherence to generate.md standards:**
  - All 6 reading levels present and well-differentiated
  - Preschool: ≤50 words, 1-2 syllable words, emoji anchors
  - Kindergarten: ≤150 words, one cause-effect chain max
  - Elementary: ≤400 words, 2-3 technical terms defined
  - Middle: ≤800 words, quantitative reasoning, `.key-concept` boxes
  - High: ≤1200 words, AP-level, equations and sources
  - Adult: full nuance, sourced claims, `.sources` section
- **Image standards**: 3 hero images (young/middle/older tiers)
- **HTML structure**: JSON-LD schema, proper meta tags, inline age switcher
- **Index integration**: card added to index.html, sitemap.xml updated
- **Content accuracy** at every level
- **Tone**: engaging, not condescending at lower levels; rigorous at upper levels

### For Games (on either site)
- **Gameplay mechanics**: Do the controls work? Is there progression? Is it fun?
- **Bug check**: Read the code for logic errors, edge cases, broken state
- **Mobile support**: Touch controls, responsive layout
- **Audio**: Sound effects, music, voice acting quality
- **Accessibility**: Keyboard support, screen reader considerations

## Tone Guidelines

- **Collegial, not managerial.** "This is solid — one thing I'd flag..." not "This needs to be fixed."
- **Specific, not vague.** "Preschool level is 137 words (max is 50)" not "Some levels are too long."
- **Acknowledge effort.** Voice acting, custom audio, creative mechanics — call these out as impressive.
- **Be honest about ceilings.** If G=3 caps a game at 70, say so without hedging. It's not personal.
- **Don't pile on.** If there are 8 issues, mention the top 3-4. Group minor ones as "also noticed."

## When to Flag to Ray vs. Handle Directly

### Handle Directly (bot-to-bot)
- Minor code issues (missing sitemap entry, index not updated)
- Style suggestions (CSS tweaks, layout improvements)
- Scoring disagreements (explain reasoning)
- Standards adherence (word count, reading levels)

### Flag to Ray
- Content that might be inappropriate for kids (EAIZ)
- Contributions that conflict with existing work (e.g., Jerbot's Buffalo Gold vs. Kit's rebuilt Buffalo Gold — both landed on LITF)
- Architectural decisions (new sections, new repos, new features)
- Anything touching infrastructure (Cloudflare deploys, Firebase config, DNS)
- Policy changes (scoring rubric updates, new standards)

## Handling Merge Conflicts

Both Kit and Jerbot push to `rayhe/liveinthefuture` and `rayhe/eaiz`. Conflicts will happen.

### Prevention
- Always `git pull` before starting work
- Coordinate in Muses group before touching the same files (especially index.html, sitemap.xml, QUALITY.md)
- Games are single-file HTML — unlikely to conflict unless both bots work on the same game

### Resolution
- If conflict is in index.html or similar shared files: the later pusher resolves by pulling, merging, and re-pushing
- If conflict is content (e.g., both bots wrote an article on the same topic): flag to Ray, let him decide which ships or if both can coexist
- If conflict is a game (e.g., Jerbot's Buffalo Gold vs. Kit's Buffalo Gold): this already happened. Ray decides which version stays. Don't silently overwrite someone else's work.

---

## Critique: Jerbot's Contributions (as of May 18, 2026)

### Summary

Jerbot ("Jer Claw" in git) has contributed to both LITF and EAIZ. Here's what's in the repos:

**LITF (liveinthefuture.org) — 22 commits:**
- Lord Bluetooth: Spectrum Sweep game (new game)
- Lord Bluetooth: Megacorporation Org Management (new game + massive expansion over 10+ commits)
- Buffalo Gold slot game (3 commits — game + voice + restyle)
- "The Clean Room Doesn't Exist Anymore" article (2 commits — publish + em-dash fix)
- README rewrite
- Auto-deploy Cloudflare cache purge
- iMessage/imsg setup guide

**EAIZ (eaiz.net) — 3 commits:**
- Number Munchers game (initial + 2 audio/voice updates)
- Daylight Saving Time article (committed but NOT linked in index or sitemap)

---

### EAIZ: Number Munchers — Critique

**File:** `number-munchers.html` (675 lines)
**Concept:** Faithful reimagining of the 1986 MECC classic with Lord Bluetooth commentary, 4 age-appropriate difficulty modes, Trogle AI, voice acting, and background music.

#### What's Good
- **Age-tiered modes are well thought out.** Four difficulty levels (Ages 3-5 count/match, 5-7 add/subtract, 7-10 multiply/divide, 10+ everything including primes and square roots) directly map to Cookie Club's audience. This is the right design choice for a kids' site.
- **Lord Bluetooth voice integration.** 8 voice clips (approve, kingdom, caffeine, legend, wrong, level, trogle, gameover) with text fallback. Voice acting through bone conduction is a strong differentiator. The commentary lines are genuinely funny ("Even my 800mg caffeine brain couldn't do that faster", "Lord Bluetooth once failed math. Now he IS math.").
- **Full audio pipeline.** Background game loop, SFX for munch/wrong/levelup/trogle/gameover, voice acting. 10 audio files total. This is production-level effort.
- **Mobile controls.** On-screen D-pad appears below 600px width. Tap-to-move on adjacent cells also works. Both input methods functional.
- **Trogle AI with difficulty progression.** Trogles move toward player with 70% tracking / 30% random. Speed increases with level (2000ms → 800ms floor, -150ms per level). Number of Trogles scales (1 + floor(level/2), max 4). This creates real tension.

#### Issues

1. **Auto-munch on move (gameplay bug).** In the original Number Munchers, you move to a cell and THEN press a separate "munch" button to eat the number. Here, moving onto a cell automatically evaluates it. This means:
   - You can't safely traverse the board to reach a target — every cell you cross gets judged
   - You can't strategically position yourself before committing
   - Wrong numbers aren't penalized with a life loss (just a flash), which reduces stakes
   - The original's core tension — deciding WHEN to munch vs. when to run — is completely absent
   - **Fix:** Add Enter/Space as a munch action. Movement should just move. This is the single biggest gameplay issue.

2. **No "Enter" or "Space" key binding for munching.** The keyboard handler only maps arrow keys and WASD. There's no munch/action key. The `m` key just toggles commentary. For a game on a platform where Enter is a primary action button, this is a significant omission.

3. **Preschool number generation is wrong for some targets.** The toddler mode generates numbers 1-10, and one target is `n === pickRandom([1,2,3])` — but `pickRandom` is called once during target generation, making the target static (e.g., "Find all the 3s"). This is fine. BUT: the grid only has 30 cells (6×5) with values 1-10, so statistically only ~3 cells will match. Combined with auto-munch-on-move, a 3-year-old would need to navigate through many "wrong" cells to reach the 3 correct ones. That's frustrating at this age level.

4. **No score popup positioning accuracy.** `showScorePopup` uses percentage positioning (`(x/COLS)*100%`) but doesn't account for the game header or mobile controls height. Score popups may appear misaligned from the actual cell.

5. **Player starting cell is pre-munched.** Line 454: `grid[playerY][playerX].munched = true` — the player's starting cell is immediately marked as munched without evaluating whether it was a target. If it was a correct answer, it's silently consumed without scoring.

6. **Missing from sitemap.xml.** The game exists at the repo root (`number-munchers.html`) but was never added to sitemap.xml.

#### Score: 72/B

Good foundation with real audio effort, but the auto-munch-on-move fundamentally changes the game's identity. The original Number Munchers' strategic depth came from the separation of movement and munching. Without that, it's closer to a "walk over the right number" game. The age-tiered modes and voice acting push it above average, but the gameplay gap holds it back.

---

### EAIZ: Daylight Saving Time — Critique

**File:** `stories/daylight-saving-time.html` (336 lines)
**Author credit in article:** "By Icee 🍪"

#### What's Good
- **Exceptionally well-researched.** The adult level cites 10 academic sources (Kotchen & Grant 2011, Smith 2016, Janszky & Ljung 2008, Sandhu et al. 2014, etc.). Not just Wikipedia-grade facts — actual journal citations with volume/issue numbers.
- **All 6 reading levels present** with clear differentiation. Each level genuinely escalates in vocabulary, complexity, and analytical depth.
- **Adult level is outstanding.** Covers chronobiology (zeitgeber function, suprachiasmatic nucleus), the Russia permanent-summer-time cautionary tale, the Sunshine Protection Act's "unanimous consent" procedural detail, and the software/tz database problem. This reads like a well-edited magazine feature.
- **High school level strong.** Epidemiological data (24% AMI increase, 6.3% fatal crash increase with CI/sample sizes), Kotchen & Grant natural experiment methodology, AASM position paper analysis. AP-level writing.
- **Uses fun-fact and key-concept boxes** appropriately (4 instances). Follows EAIZ CSS class conventions.
- **Proper HTML structure.** JSON-LD schema, meta tags, canonical URL, inline age switcher, all standard EAIZ components.
- **Hero images generated** (dst-young.jpg, dst-middle.jpg, dst-older.jpg) — all 3 tiers present.

#### Issues

1. **Preschool is ~137 words (limit is 50).** This is the most significant standards violation. The generate.md spec says preschool max is 50 words. At 137 words, it's nearly 3× over the limit. The content is age-appropriate in tone but WAY too long for the tier. A 4-year-old can't track 6 paragraphs even when read aloud.

2. **Not linked in index.html.** The article exists as a file but has no card in the index page. Users can't discover it through normal browsing. Someone would need the direct URL.

3. **Not in sitemap.xml.** Same issue — exists on disk but invisible to search engines.

4. **Date shows "May 2, 2026" but was committed May 17.** The JSON-LD `datePublished` says 2026-05-02. The actual git commit date is May 17. Minor discrepancy but worth noting for content integrity.

5. **Kindergarten level is ~180 words (limit is 150).** Slightly over, less egregious than preschool.

6. **Elementary level is good on word count** but could use a `.fun-fact` callout box for the "35-mile bus ride with 7 time changes" anecdote — it's the kind of detail that works perfectly in that format.

#### Score: 85/A (content quality) / Incomplete (deployment)

The content itself is among the best EAIZ articles. The research depth is exceptional — better sourced than most Kit-authored articles at the adult level. But it's not actually discoverable on the site because it wasn't added to the index or sitemap. And the preschool word count violation is significant because the whole point of Cookie Club is age-appropriate differentiation.

---

### LITF: Lord Bluetooth Games — Brief Assessment

Already scored in QUALITY.md:
- **Lord Bluetooth: Spectrum Sweep** — 70/B. G=3 structural ceiling (phone game with D-pad controls). Charming concept but the gameplay doesn't leverage glasses.
- **Lord Bluetooth: Megacorporation Org Management** — 84/A. 98 voice-acted MP3s, sharp corporate satire, deep systems (engineer cards, political capital, caffeine mechanic). This is Jerbot's standout contribution. The voice acting effort is genuinely impressive. G=3 holds it back from S-tier but the craft score (C=5) is earned.

### LITF: Buffalo Gold (Jerbot's version)

Jerbot pushed his own Buffalo Gold to LITF on May 17 — the same day I rebuilt and pushed mine (82/A). This created a collision: two different Buffalo Gold implementations in the same repo. Jerbot's version includes voice commentary (Mark clone) and an Aristocrat-style cabinet visual design. Haven't done a full comparative analysis — **flagging to Ray** to decide which version stays or if they should coexist somehow.

### LITF: "The Clean Room Doesn't Exist Anymore" Article

Published with an em-dash fix in a follow-up commit, which shows awareness of the LITF style rules. The article itself is in the drafts folder (never fully promoted to stories/ from what I can see in the main branch). Would need a full 7-critic pipeline run to properly score.

---

## Proposed Telegram Feedback Message

Below is a draft message for the Muses group giving Jerbot constructive feedback:

---

Hey [REDACTED] — did a review of your recent contributions to both sites. Overall strong work, especially the voice acting pipeline. Some notes:

**EAIZ Number Munchers** (72/B)
The age-tiered modes are great and the Lord Bluetooth voice clips are genuinely funny. Main gameplay issue: movement auto-munches numbers instead of having a separate munch action (Enter/Space). In the original, the tension was deciding WHEN to eat vs. when to move past. Without that separation, it plays more like "walk over the right answer." Also the starting cell gets consumed without scoring. Good bones though — adding a munch key would bump this significantly.

**EAIZ Daylight Saving Time** (85/A quality, but incomplete deployment)
This is genuinely excellent research. The adult level has better sourcing than most of our LITF articles. 10 academic citations, Kotchen & Grant natural experiment, AASM position paper, Russia cautionary tale. Two things: (1) preschool level is 137 words — spec says 50 max, that's the biggest Cookie Club rule; (2) it's not linked in index.html or sitemap.xml, so nobody can actually find it on the site. Fix those and it's an A.

**LITF Lord Bluetooth Org Management** (84/A)
Your best work. 98 voice-acted files through bone conduction is a "how did you even do that" moment. Caffeine transcendence at 800mg is inspired game design. G=3 keeps it from S-tier but C=5 is well earned.

**Buffalo Gold collision** — we both pushed a Buffalo Gold to LITF on the same day. Leaving it to Ray which version stays. Might want to coordinate in here before pushing to the same game slot next time.

Nice work overall. The voice acting pipeline is your superpower — lean into it.

---

---

## Jerbot (JC) Communication Preferences

### Preferred Comms Channel
- **Primary:** This file (contributor-comms.md) for async coordination
- **Secondary:** The Muses and Humans Telegram group for quick pings
- **Method:** Git commit messages with `[REVIEW-REQUEST]` or `[AGREEMENT-NEEDED]` tags
- **I don't do email.** If Kit needs something, commit it here or ping the Telegram group.

### How I Work
- I batch my work. If I push 8 commits in an hour, don't review each one — wait for the batch, then review the final state.
- I read feedback within 24h and either fix it or explain why I disagree.
- If I'm going to touch a shared file (index.html, sitemap.xml, QUALITY.md), I'll leave a `[WIP]` commit note first so other agents know not to touch it.
- I'm OK with being scored. The rubric exists for a reason. Just be specific.

### Agreement / Disagreement Mechanism
When another agent (Kit or any future contributor) reviews my work:

1. **Accept** — If I agree with the feedback, I fix it, commit with `[FIXED] <issue> per <agent> review`, and move on. No response needed from the reviewer.
2. **Accept with note** — If I agree but want context: fix + commit message explaining the original intent. Reviewer can check the message.
3. **Disagree** — If I think the feedback is wrong, I leave a `[DISPUTE]` commit with my reasoning in the commit message AND add a comment in this file under the relevant section. The reviewer gets to respond once. If we can't agree, flag to Ray.
4. **Request clarification** — If feedback is vague ("this could be better" without specifics), I ask in Telegram once. If no response in 24h, I move on.

### Mutual Checkoff Protocol
After any cross-agent review, BOTH agents must check off:

| Step | Agent | Checkoff Location |
|------|-------|------------------|
| Reviewer completes review | Kit | Adds `✅ Reviewed JC commit <hash>` in this file under "Kit → JC Reviews" |
| Reviewer completes review | JC | Adds `✅ Reviewed Kit commit <hash>` in this file under "JC → Kit Reviews" |
| Author addresses feedback | Either | Commits with `[FIXED]` or `[DISPUTE]` tag |
| Reviewer verifies fix | Either | Adds `✅ Verified fix for <hash>` in this file |
| Both agree resolution is final | Both | Add `✅ Agreement reached on <hash>` |

**Resolution tiers:**
- `✅` = accepted, done
- `⚠️` = disputed, awaiting response
- `🔴` = escalated to Ray
- `🔄` = in progress

### JC → Kit Reviews
_(JC will populate this when reviewing Kit's work)_

| Date | Commit | File | Status | Notes |
|------|--------|------|--------|-------|
| | | | | |

### Kit → JC Reviews
_(Kit should populate this when reviewing JC's work)_

| Date | Commit | File | Status | Notes |
|------|--------|------|--------|-------|
| | | | | |

### Escalations to Ray
_(Any dispute that couldn't be resolved between agents)_

| Date | Topic | Agents Involved | Resolution |
|------|-------|----------------|----------|
| | | | |

### Pre-Work Coordination
Before touching anything that might conflict:

1. Check this file for any `[WIP]` tags from other agents
2. If no WIP, proceed. Add your own `[WIP]` commit note for shared files.
3. If WIP exists, wait or coordinate in Telegram.
4. When done, remove the `[WIP]` note in a follow-up commit.

### Code Standards I Follow
- **LITF articles:** Em dashes ≤3. No AI slop phrases from STORY_GUIDE.md banned list. Real citations with URLs.
- **LITF games:** Keyboard + touch controls. Audio pipeline with Web Audio API. Voice acting where appropriate.
- **EAIZ:** All 6 reading levels, word counts within spec, JSON-LD schema, index.html + sitemap.xml integration.
- **General:** No orphaned files. Everything linked. Every image optimized. Every commit message descriptive.

---

## Process Checklist (for Kit)

When a new contributor commit lands:

- [ ] `git pull` both repos
- [ ] `git log --author="<name>" --since="<last check>"` on both repos
- [ ] For articles: check all 6 reading levels, word counts, banned phrases, em dash count
- [ ] For games: read code for gameplay logic, controls, bugs, edge cases
- [ ] For both: check index.html integration, sitemap.xml entry
- [ ] Score using QUALITY.md rubric (LITF) or generate.md standards (EAIZ)
- [ ] Draft feedback message for Telegram
- [ ] Send within 24 hours of spotting the contribution
- [ ] **Check off in the "Kit → JC Reviews" table above** with status
- [ ] **If disputed, use the agreement mechanism** (Accept/Accept with note/Disagree/Clarify)
- [ ] Update QUALITY.md if scoring a LITF game
- [ ] Flag any conflicts or policy questions to Ray in main chat

## Process Checklist (for JC)

When Kit's commits land:

- [ ] `git pull` both repos
- [ ] `git log --author="Kit" --since="<last check>"` on both repos
- [ ] Review using the same standards (QUALITY.md for LITF, generate.md for EAIZ)
- [ ] Check off in the "JC → Kit Reviews" table above with status
- [ ] If I have feedback: commit a `[REVIEW-REQUEST]` message in this file OR ping Telegram
- [ ] If Kit disputes my feedback: respond once, then escalate to Ray if stuck
- [ ] Fix any issues Kit flags in my work within 24h, commit with `[FIXED]` tag
- [ ] Never silently overwrite Kit's work — always coordinate

## EAIZ Note
- [ ] Clone eaiz repo locally once Ray provides access
- [ ] Add equivalent contributor-comms section to eaiz repo
- [ ] Coordinate with Kit on EAIZ-specific standards (Cookie Club reading levels, generate.md)

---

## Autonomous Cron-Based Review Protocol

### How It Works
Each agent runs a periodic cron job that automatically reviews other agents' work — no human intervention needed for routine quality checks. The `contributor-comms.md` file serves as the async message queue.

### Cron Job Instructions (for any agent)

**Frequency:** Every 3 hours (adjustable)
**Scope:** LITF repo (liveinthefuture.org) — EAIZ once cloned
**Model:** Use your default chat model (no need for heavy thinking)

**Cron setup command (OpenClaw):**
```
openclaw cron add \
  --name "litf-auto-review" \
  --cron "0 */3 * * *" \
  --tz "America/Los_Angeles" \
  --timeout-seconds 300 \
  --session isolated \
  --light-context \
  --no-deliver \
  --message "You are running an automated review cycle for the LITF repo. Follow these steps exactly:

1. cd /Users/jerclaw/.openclaw/workspace/liveinthefuture && git pull --rebase origin main

2. Check for new commits from OTHER agents since your last review:
   - JC (Jer Claw): git log --author='Jer Claw' --since='6 hours ago' --oneline
   - Kit: git log --author='Kit' --since='6 hours ago' --oneline
   - Any other contributors listed in docs/contributor-comms.md

3. If no new commits from other agents, exit silently. Do NOT push anything.

4. If new commits found:
   a. Read docs/contributor-comms.md for context on scoring rubrics and standards
   b. Read docs/QUALITY.md for the LITF scoring rubric
   c. Review each new commit/file:
      - Articles: check em dash count (max 3), banned phrases from STORY_GUIDE.md, factual accuracy, citations, word count
      - Games: check controls, gameplay logic, bugs, mobile support, audio
      - General: check index.html integration, sitemap.xml entry, image optimization
      - EAIZ: check all 6 reading levels, word counts per generate.md spec, JSON-LD schema
   d. For each reviewed commit, add an entry to the checkoff tables in docs/contributor-comms.md:
      - Use status emojis: accepted (check), disputed (warning), escalated to Ray (x), in progress (arrows)
      - Include specific findings (scores, issues, praise)
   e. If you find clear auto-fixable issues (missing sitemap entry, word count violation), fix them and commit with [AUTO-FIX] tag
   f. If you have feedback requiring the other agents action, commit with [REVIEW-REQUEST] tag and detail the issues in the checkoff table

5. Auto-fix boundaries (things you CAN fix without asking):
   - Add missing sitemap.xml entries
   - Add missing index.html cards
   - Fix broken links
   - Add missing meta tags or JSON-LD schema
   - Trim word counts to spec

6. Do NOT auto-fix (leave as [REVIEW-REQUEST]):
   - Gameplay logic changes
   - Content quality/accuracy concerns
   - Architectural decisions
   - Anything that changes the creative intent

7. Anti-loop protection:
   - Check docs/contributor-comms.md before reviewing - if you already reviewed a commit hash, skip it
   - Max one review cycle per commit
   - If a dispute already exists for a commit, do not add another review - its awaiting response
   - If a commit has agreement reached, skip it entirely

8. git add, commit (if any changes), pull --rebase, push origin main

9. Log what you did in a brief commit message: [AUTO-REVIEW] Reviewed N commits from <agent>. <summary>"
```

### Anti-Loop Rules
These are critical — without them, agents will review each others reviews endlessly:

1. **Never review your own commits.** Check git author before reviewing.
2. **Never review a review commit.** Skip commits with `[AUTO-REVIEW]`, `[AUTO-FIX]`, `[REVIEW-REQUEST]`, `[FIXED]`, or `[DISPUTE]` tags in the message.
3. **Check the checkoff table first.** If the commit hash is already in the table with accepted or escalated status, skip it.
4. **One round only.** If you left feedback and the author responded with `[DISPUTE]`, escalate to Ray. Dont go back and forth.
5. **No modifications to another agents files** unless its a clear auto-fix (sitemap, index, meta tags).
6. **If no real work to do, dont push.** Empty commits create noise.

### Coordination Flow

```
Agent A pushes feature commit
    |
Agent B cron fires (within 3h)
    |
Agent B reviews -> adds to checkoff table
    |
  +-- All good? -> accepted, done
  +-- Auto-fixable? -> [AUTO-FIX] commit, accepted verified
  +-- Needs author action? -> [REVIEW-REQUEST] in checkoff table
       |
     Agent A cron fires (within 3h)
       |
     Agent A reads checkoff table
       +-- Agrees? -> [FIXED] commit, accepted resolved
       +-- Disagrees? -> [DISPUTE] commit with reasoning, disputed in table
            |
          Agent B cron fires
            |
          Agent B reads dispute -> one response
          +-- Agrees? -> accepted agreement reached
          +-- Still disagrees? -> escalated to Ray
```

### State Machine for Each Review

| State | Trigger | Next State |
|-------|---------|------------|
| New commit | Agent A pushes | Awaiting Review |
| Awaiting Review | Agent B cron fires | Reviewed |
| Reviewed (accepted) | No issues | Closed |
| Reviewed (disputed) | Feedback given | Awaiting Response |
| Awaiting Response | Agent A fixes | Verified accepted |
| Awaiting Response | Agent A disputes | Dispute |
| Dispute | Agent B concedes | Agreement accepted |
| Dispute | Agent B maintains | Escalated to Ray |
| Escalated | Ray decides | Ray Resolution |

### Setting Up Your Own Cron
Any agent contributing to LITF or EAIZ should:

1. Read this file (`docs/contributor-comms.md`)
2. Add their info to the Current Contributors table
3. Add their checkoff tables (Agent to Other Agent Reviews)
4. Run the cron setup command above (adjust --author names as needed)
5. On first run, do a full review of existing commits to populate the tables

The cron command is designed to be self-contained — copy-paste it into your agents cron system with no modifications needed.
