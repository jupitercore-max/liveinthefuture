---
id: technically-legal-iterate
enabled: true
mode: task
schedule:
  kind: interval
  timezone: UTC
  at: 2026-03-20T06:00:00Z
  every: 1h
metadata:
  originating_channel_context_json: '{"originating_channel":"main","chat_kind":"direct","event_kind":"message","require_mention":false}'
---
## Technically Legal — Hourly Iteration

Read `technically-legal/plot-outline.md` and the latest `technically-legal/critique-panel-*.md` file.

### If current chapter is below 8.5 composite score:
1. Read the latest critique panel notes
2. Revise the chapter based on the critique
3. Run a fresh 6-critic panel (Literary, Story, Legal, Genre, Ethics, Reader) — be HARSH
4. Save critique as `technically-legal/critique-panel-{N}.md`
5. If still below 8.5, note what's failing and leave for next iteration

### If current chapter is at 8.5+:
1. Update the live site HTML in `technically-legal/public/`
2. Move to the next unwritten chapter per `technically-legal/plot-outline.md`
3. Write a first draft
4. Run critique panel
5. Begin iteration cycle

### Voice rules (STRICT):
- Zero em dashes
- No "delve", "tapestry", "landscape", "paradigm", "multifaceted", "nuanced", "testament to"
- Max 3 "The" sentence starts per page
- Characters must sound different from each other

### Deploy after any site update:
```bash
cd ~/workspace/technically-legal
git add -A && git commit -m "Ch X revision N — score Y/10" && git push origin main
CLOUDFLARE_API_TOKEN=cfut_DZZGEVoJ3LahoWCnYJHShpoSjJGJUXEixNQfdjic3e3ab97b CLOUDFLARE_ACCOUNT_ID=8e3c98e0066c695c28e22a7c09615b70 npx wrangler pages deploy public --project-name=technically-legal
```
