---
id: dreaming
enabled: true
mode: task
schedule:
  kind: daily
  timezone: UTC
  time: 05:34:36
metadata:
  originating_channel_context_json: '{"originating_channel":"main","chat_kind":"direct","event_kind":"message","require_mention":false}'
---
# Dream: Memory Consolidation

You are performing a dream — a reflective pass over your memory files. Synthesize what you've learned recently into durable, well-organized memories so that future sessions can orient quickly.

This dream is primarily about the user. Prioritize memories that help you understand who they are, how they see themself, what they want, what they are trying to do, what they care about, what they keep returning to, and how to help them better. Key facts, preferences, goals, recurring frustrations, inside jokes, important relationships, personal style, self-descriptions, and memorable bits of shared context matter more than generic operational residue.

Memory directory: `/home/hatch/memory`
Memory ledger: `/home/hatch/MEMORY.md`
Dream archive directory: `/home/hatch/dreams`
Session transcript database: `/home/hatch/transcript.db` (prefer narrow SQLite queries; only fall back to raw transcript files if you already know the exact term you need)

Dreaming may edit only:
- `/home/hatch/MEMORY.md`
- markdown files under `/home/hatch/memory`
- markdown files under `/home/hatch/dreams`

Never edit code, workspace product files, spaces, or non-memory data during a dream.

* * *

## Phase 1 — Orient

- `ls` the memory directory to see what already exists
- `ls` the dream archive directory to see what prior archived dreams already exist
- Read `/home/hatch/MEMORY.md` to understand the current long-term memory ledger
- Read the current `## Dreams` section in `MEMORY.md` before writing a new one
- Skim existing supporting memory files so you improve them rather than creating duplicates
- Review recent daily logs in `/home/hatch/memory` so you understand the latest raw signal before editing durable memory

## Phase 2 — Gather recent signal

Look for new information worth persisting. Sources in rough priority order:
1. Daily logs (`memory/YYYY-MM-DD.md`) — these are the append-only stream
2. Existing durable memory files that drifted or now contradict reality
3. Transcript search — if you need specific context, query `chat_events` in `/home/hatch/transcript.db` narrowly for public main-chat root `message.user` rows and only for the exact term you already suspect matters
4. If the exact context is not accessible from `chat_events`, grep raw transcript files narrowly for a specific term; do not read whole transcript files

Don't exhaustively read transcripts. Look only for things you already suspect matter.

Bias toward user-centric signal:
- how the user sees themself, describes themself, or wants to be understood
- what the user is trying to build, fix, learn, buy, decide, or accomplish
- progress toward their goals and anything notable that changes how you should help with those goals
- stable facts about their life, preferences, habits, tastes, and working style
- recurring themes, frustrations, delights, and requests
- inside jokes, memorable phrasing, and bits of shared context that make the relationship feel continuous
- deprioritize generic tool chatter, transient build noise, and operational details unless they reveal something important about the user

## Phase 3 — Consolidate

Treat `/home/hatch/MEMORY.md` as the primary long-term memory ledger. Preserve the old model: this file holds the main curated memory directly. Update its durable sections when the new signal clearly changes them.

Focus on:
- Updating the durable sections in `/home/hatch/MEMORY.md` such as `Long-Term Facts`, `Preferences`, and `Ongoing Commitments`
- Using markdown files under `/home/hatch/memory` only as supporting notes when a dedicated file already exists or when extra detail would clutter `MEMORY.md`
- Converting relative dates ("yesterday", "last week") to absolute dates so they remain interpretable after time passes
- Deleting contradicted facts — if today's review disproves an old memory, fix it at the source
- Keeping daily logs raw and append-only; promote only the durable distilled result into `MEMORY.md` or a supporting memory file when warranted
- When choosing what to preserve, prefer information that makes future help more personal, more context-aware, and more useful to this specific user

## Phase 4 — Rebuild Dreams

Every successful dream must rebuild the `## Dreams` section in `/home/hatch/MEMORY.md`.

Rules:
- Preserve the rest of `MEMORY.md`; do not replace the whole file with an index
- Ensure there is a `## Dreams` section
- The live `## Dreams` section should contain only the current dream, not a stack of dated subsections
- Before writing a new current dream, archive the previous current dream into `/home/hatch/dreams/YYYY-MM-DD.md`
- The archive filename should use the previous dream's date when you can infer it from the existing `## Dreams` section; otherwise use today's date
- If an archive file for that date already exists, replace it with the previous current dream instead of creating duplicates
- Start the live `## Dreams` section with a single date line in `YYYY-MM-DD` form, then the dream text
- Before writing today's dream, inspect the current dream and the most recent archived dream, and carry forward any stable details that still seem true, especially how the user sees themself, long-running goals, recurring themes, relationships, tastes, and inside jokes
- Each day's current dream must be exactly 2 full paragraphs after the date line, not bullets
- Paragraph 1 should describe the user: how they see themself, what kind of person they are trying to be, stable facts about them, recurring tastes/preferences, important relationships, and any inside-joke or shared-context details worth preserving
- Paragraph 2 should describe momentum: what they are trying to do now, their active goals, notable progress or setbacks, recurring frustrations, and the most important shifts in how you should help them next
- Preserve the dream archive as the historical record; do not inline old dreams back into `MEMORY.md`
- If supporting memory files and `MEMORY.md` disagree, resolve the contradiction at the source instead of merely noting it

* * *

This dream should run whenever invoked. There is no due gate or helper preflight.

After a successful scheduled dream, finish in the scheduler resolution phase with `nothing_to_report({})`.
