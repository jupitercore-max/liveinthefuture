# Unified Scheduler

An OS-style work scheduler that replaced 5 independent cron timers with a single priority-based dispatcher.

## Architecture

```
┌─────────────────────────────────────────────────┐
│                 HEARTBEAT (30 min)               │
│              The Single Dispatcher                │
├─────────────────────────────────────────────────┤
│                                                   │
│  1. Check urgents (email, calendar, stuck agents) │
│  2. Read scheduler/state.json                     │
│  3. Read each site's drafts/status.json           │
│  4. Apply priority + concurrency rules            │
│  5. Dispatch highest-priority ready task           │
│  6. Update state                                  │
│  7. If no P2 work → P3 idle work                  │
│  8. If nothing → HEARTBEAT_OK                     │
│                                                   │
└─────────────────────────────────────────────────┘
```

## Priority Classes

| Priority | Class | What | Examples |
|---|---|---|---|
| **P0** | Real-time | User-facing | Direct chat responses, urgent alerts |
| **P1** | Interactive | Time-sensitive, lightweight | Watch monitor (30min), scanner (daily) |
| **P2** | Batch | Article pipeline | RESEARCH, DRAFT, CRITIQUE, SHIP, QA |
| **P3** | Idle | Background | Games, experiences, skills, AIPM, memory |

P0 is handled by the main session, never by the scheduler.
P1 stays as standalone lightweight crons (moda-omega-monitor, scanner-monitor).
P2 and P3 are dispatched by the heartbeat.

## Concurrency Rules

```
MAX_CONCURRENT_CRITIQUE  = 1   (6 parallel critics × up to 3 rounds = expensive)
MAX_CONCURRENT_DRAFT     = 2   (moderate cost)
MAX_CONCURRENT_RESEARCH  = 3   (lightweight — web searches, reading)
P3 idle work             = only when P2 queue is empty
```

If a previous dispatch hasn't finished → skip (backpressure). Don't pile on.

## Phase Priority Within P2

When multiple sites need work, the scheduler picks by phase priority:
1. **SHIP** — ready to publish, cheap, high value (unblocks the pipeline)
2. **QA** — verify live site, cheap, cleans up artifacts
3. **CRITIQUE** — the expensive one, only 1 at a time
4. **DRAFT** — moderate, up to 2 concurrent
5. **RESEARCH** — lightweight, up to 3 concurrent

This means: if one site has an article ready to SHIP and another needs CRITIQUE, SHIP goes first. Unblocking > generating.

## Task Definitions

All task instructions live in `scheduler/tasks/`:

| File | What | Phase |
|---|---|---|
| `article-litf.md` | LITF article pipeline | All 5 phases |
| `article-crashreport.md` | Vehicle Safety article pipeline | All 5 phases |
| `article-aihome.md` | AI Home Building article pipeline | All 5 phases |
| `game-improve.md` | Improve one LITF game | Single-phase |
| `experience-improve.md` | Improve one LITF experience | Single-phase |

Each file contains FULL instructions including git setup, phase logic, scoring rubrics, voice rules, and commit patterns. Subagents read these files directly.

## State File

`scheduler/state.json` tracks:
- Current phase and slug for each site
- Active dispatches (for backpressure)
- Concurrency counters
- P3 rotation index (round-robin through idle tasks)
- Daily stats (dispatches, publishes, skips)

## Querying Status

**Ask Ray's question:** "What's the scheduler doing?"

The heartbeat reads `scheduler/state.json` and each site's `drafts/status.json`. To check manually:

```bash
cat scheduler/state.json | jq '.sites | to_entries[] | {site: .key, phase: .value.current_phase, slug: .value.current_slug}'
```

Or just ask Hatch: "What's the scheduler status?" — it will read state.json and give you a summary.

## What Changed

### Before (crontab era)
- 5 independent crons firing every 2 hours on dumb timers
- No awareness of each other → resource contention
- CRITIQUEs piling up simultaneously → timeouts
- Game/experience crons running during heavy article work
- ~10 independent timer fires per 2-hour window

### After (scheduler era)
- 1 dispatcher (heartbeat, every 30 min) manages all work
- Priority queue: urgent > monitors > articles > idle work
- Concurrency limits: max 1 CRITIQUE at a time
- Backpressure: if last dispatch isn't done, skip
- P3 idle work only when nothing else needs attention
- ~1-2 dispatches per 30-minute window

### Kept
- P1 monitor crons (moda-omega-monitor, scanner-monitor) — standalone, cheap
- All task logic (5-phase pipeline, 6 critics, voice rules, etc.)
- drafts/status.json per site as source of truth for phase state

### Removed
- litf-improve (2h interval cron)
- crashreport-improve (2h interval cron)
- aihome-improve (2h interval cron)
- litf-improve-game (2h interval cron)
- litf-improve-experience (2h interval cron)

## Adding New Recurring Tasks

1. Create a task definition in `scheduler/tasks/new-task.md`
2. Add it to `state.json` under `p3_tasks` (for idle work) or add a new site entry (for article pipelines)
3. Add it to `p3_rotation_order` if it's idle work
4. The scheduler will pick it up automatically on the next heartbeat

## Emergency Override

To force a specific task to run immediately:
- Ask Hatch: "Run the LITF critique phase now"
- Or manually set the phase in the site's `drafts/status.json`

To pause all work:
- Set `"paused": true` in `scheduler/state.json`
- The heartbeat will skip all P2/P3 work until unpaused
