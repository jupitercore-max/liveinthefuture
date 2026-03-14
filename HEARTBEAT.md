# HEARTBEAT.md

## Priority Checks (do these first)
1. **Urgent emails** — check Gmail for anything needing immediate attention
2. **Calendar** — any events in the next 2 hours?
3. **Active subagent issues** — anything stuck or errored?

## If Nothing Urgent → Skill Improvement
When all priority checks are clean and there's no pending user work, use idle heartbeats for:

### Audit & Improve
- Pick ONE skill from `~/skills/` and read its SKILL.md
- Is it accurate? Are there error patterns from recent runs?
- Can it be made more efficient or reliable?
- Update the skill if you find something concrete

### Discover New Capabilities
- Search for new APIs, CLIs, or free-tier services relevant to Ray's interests
- Check if services we already use have new features
- Look for tools that automate things we currently do manually

### Build or Propose
- **No auth needed:** Build it using skill-creator
- **Needs auth/setup:** Write proposal to `workspace/skill-proposals.md`
- Don't notify Ray unless you built something genuinely useful

### Log
Append to `memory/skill-improvements.md`:
```
## YYYY-MM-DD
- Audited: [skill name]
- Found: [discoveries]
- Built/Improved: [what changed]
```

## Rules
- ONE meaningful improvement per idle heartbeat, not five superficial ones
- If nothing needs attention and nothing interesting turns up, just HEARTBEAT_OK
- Don't install system packages without asking
- Don't notify Ray about routine audits — only genuinely useful new capabilities
