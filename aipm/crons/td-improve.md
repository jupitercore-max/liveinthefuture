# Tower Defense Game Improvement Cron

## Overview
Incremental improvement to the tower defense game at new.rayhe.net/td.html. A single-file HTML game (~12,400 lines) with 50+ features.

## Schedule
- **Frequency:** Every 2 hours
- **Offset:** :40 past the even hour (UTC)
- **Execution:** Isolated
- **ID:** `td-improve`

## What It Does
Each cycle picks ONE improvement:
1. Read `td.claude.md` for current state and known issues
2. Self-Critique Gate: Is this actually fun? Could it break things? Would removing something be better?
3. Implement one focused change
4. Run mandatory syntax validation
5. Update td.claude.md
6. Commit and push

## Critical Code Structure
The game is a single IIFE organized into **7 strict phases**:
1. **Phase 1:** `$` helper (DOM utility)
2. **Phase 2:** Constants & Config (TICK_RATE, ENEMY_TYPES, WAVE_MUTATORS)
3. **Phase 3:** State Variables (ALL `let` declarations)
4. **Phase 4:** DOM Bindings (ALL `const el = $('id')` calls)
5. **Phase 5:** Function Definitions (ALL functions)
6. **Phase 6:** Event Listeners (ALL `.addEventListener` calls)
7. **Phase 7:** Initialization (ALL init calls)

**Rules:** Never place function calls outside Phase 7. Never place DOM bindings outside Phase 4. Never add state vars outside Phase 3. This prevents TDZ (Temporal Dead Zone) errors.

## Syntax Validation (Mandatory)
```bash
LAST_SCRIPT=$(grep -n '</script>' td.html | tail -1 | cut -d: -f1)
FIRST_SCRIPT=$(($(grep -n '<script>' td.html | tail -1 | cut -d: -f1) + 1))
sed -n "${FIRST_SCRIPT},$((LAST_SCRIPT - 1))p" td.html > /tmp/td_check.js
node --check /tmp/td_check.js
```
If this fails, DO NOT push.

## Quality Gates
1. Self-Critique Gate: Propose → Challenge → Verdict
2. Syntax validation before every push
3. Also considers porting improvements to `td_mrbd.html` (600×600, D-pad version)

## Current State (as of March 2026)
- ~12,400 lines, 50+ features
- 39+ consecutive self-critique skips (correctly waiting for human playtesting)
- MRBD version at ~1,250 lines

## Recreating This Cron
```yaml
id: td-improve
enabled: true
mode: task
schedule:
  kind: interval
  timezone: UTC
  every: 2h
execution:
  target: isolated
```
