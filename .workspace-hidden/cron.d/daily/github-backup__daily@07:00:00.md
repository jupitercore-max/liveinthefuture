---
id: github-backup
enabled: true
mode: task
schedule:
  kind: daily
  timezone: UTC
  time: 07:00:00
metadata:
  originating_channel_context_json: '{"originating_channel":"main","chat_kind":"direct","event_kind":"message","require_mention":false}'
---
Nightly backup to github.com/rayhe/factoryfactory (private repo).

Back up all critical files:
- SOUL.md, IDENTITY.md, MEMORY.md, USER.md, AGENTS.md, TOOLS.md, HEARTBEAT.md
- memory/*.md (daily notes)
- workspace/cron.d/**/*.md (all cron definitions)
- workspace/.ssh/config
- workspace/hatch-overflow-state.json
- Any other config/state files that have changed

Steps:
1. cd ~/workspace/factoryfactory (clone if missing: git clone git@github.com:rayhe/factoryfactory.git)
2. Copy all files above into the repo
3. git add -A && git commit -m "nightly backup $(date +%Y-%m-%d)" && git push
4. If nothing changed, skip the commit
