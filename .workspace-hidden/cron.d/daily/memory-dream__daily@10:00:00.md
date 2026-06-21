---
id: memory-dream
enabled: true
mode: task
schedule:
  kind: daily
  timezone: UTC
  time: 10:00:00
metadata:
  originating_channel_context_json: '{"originating_channel":"main","chat_kind":"direct","event_kind":"message","require_mention":false}'
---
Memory consolidation — "Auto Dream" cycle. Run this like REM sleep for your memory system.

## Phase 1: Orient
- Read MEMORY.md fully — note its current size and structure
- List all memory/YYYY-MM-DD.md files, identify which are recent (last 3 days) vs old (7+ days)
- Note which sections of MEMORY.md feel bloated, stale, or contradictory

## Phase 2: Gather Signal
- Read the last 3 days of daily memory files
- Identify: new decisions, completed tasks, lessons learned, preference changes, new people/projects, stale items
- Check if any "Pending" items have been resolved
- Check if any "Active Crons" have been added/removed/changed
- Look for contradictions between daily notes and MEMORY.md

## Phase 3: Consolidate
- Merge new durable facts into MEMORY.md (distilled, not raw)
- Convert any relative dates to absolute dates
- Remove completed items from "Pending" section
- Update "Active Crons" to match actual cron.d state
- Update article counts for all sites (check index.html files)
- Compress verbose sections — MEMORY.md is an index, not a journal
- The Zuckerberg persona section especially: keep iteration count and file location, trim the per-iteration detail

## Phase 4: Prune
- Delete or archive daily memory files older than 14 days that have been fully consolidated
- Remove any MEMORY.md entries that are no longer relevant
- Keep MEMORY.md under 400 lines if possible (it's currently way over)
- Ensure no duplicate information across sections

## Rules
- Do NOT delete information you're unsure about — when in doubt, keep it
- DO aggressively compress the Zuckerberg persona changelog (just keep latest iteration + file path)
- DO remove completed one-time tasks from Pending
- DO update article counts and site status
- If MEMORY.md changed significantly, notify main agent with a summary of what was consolidated/pruned
