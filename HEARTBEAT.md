# HEARTBEAT.md

## Priority Checks (do these first)
1. **Urgent emails** — check Gmail for anything needing immediate attention
2. **Calendar** — any events in the next 2 hours?
3. **Active subagent issues** — anything stuck or errored?

## If Nothing Urgent → Process & Skill Improvement
When all priority checks are clean and there's no pending user work, use idle heartbeats for ONE of these (rotate):

### 1. Audit & Improve Skills
- Pick ONE skill from `~/skills/` and read its SKILL.md
- Is it accurate? Are there error patterns from recent runs?
- Can it be made more efficient or reliable?
- Update the skill if you find something concrete

### 2. General Process Improvement
- **Stale data** — Check AIPM page, QUALITY.md, EVALUATE.md for outdated stats (article counts, scores, journalist counts). Fix if stale.
- **Cron health** — Any crons timing out? Erroring? Producing poor results? Tune them.
- **Pipeline optimization** — Review recent article/game cron runs. Are phases balanced? Is critique taking too many rounds? Are we catching real issues or just churning?
- **Memory hygiene** — Review recent daily notes, distill to MEMORY.md, prune stale entries.
- **Repo health** — Run validation scripts, check for broken links, missing images, stale drafts stuck in pipeline.

### 3. Discover New Capabilities
- Search for new APIs, CLIs, or free-tier services relevant to Ray's interests
- Check if services we already use have new features
- Look for tools that automate things we currently do manually

### 4. Build or Propose
- **No auth needed:** Build it using skill-creator
- **Needs auth/setup:** Write proposal to `workspace/skill-proposals.md`
- Don't notify Ray unless you built something genuinely useful

### Log
Append to `memory/skill-improvements.md`:
```
## YYYY-MM-DD
- Audited: [skill name] / [process area]
- Found: [discoveries]
- Built/Improved: [what changed]
```

## Rules
- ONE meaningful improvement per idle heartbeat, not five superficial ones
- If nothing needs attention and nothing interesting turns up, just HEARTBEAT_OK
- Don't install system packages without asking
- Don't notify Ray about routine audits — only genuinely useful new capabilities
