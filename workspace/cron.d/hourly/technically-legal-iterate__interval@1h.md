---
id: technically-legal-iterate
enabled: true
mode: task
schedule:
  kind: interval
  timezone: UTC
  at: 2026-03-20T17:00:00Z
  every: 1h
metadata:
  originating_channel_context_json: '{"originating_channel":"main","chat_kind":"direct","event_kind":"message","require_mention":false}'
---
## Technically Legal — Hourly Iteration

Read `technically-legal/STATUS.md` to find current chapter state.
Read `technically-legal/README.md` for the full pipeline, critique prompts, voice rules, and banned phrases.
Read `technically-legal/plot-outline.md` for the chapter plot points.

### Workflow:

1. **Find current work:** Check STATUS.md for the first chapter not yet at 8.5+
2. **If no draft exists:** Write the chapter markdown (`chapter-N-draft.md`) following plot-outline.md. Target 3,500-5,000 words.
3. **If draft exists but below 8.5:** Read latest critique, revise, re-critique.
4. **If at 8.5+:** Build HTML from markdown, update chapters.html index (link it, add "Next" nav to previous chapter), update STATUS.md.

### Critique Panel (6 critics):
Run all 6 in parallel. Each scores 1-10 with specific, actionable notes:
1. **General/Narrative** — pacing, character voice, structure, hook
2. **Voice/Style** — em dash count (must be ZERO), banned phrases, sentence rhythm, paragraph starters
3. **Legal/Research Rigor** — every statute real, every case real, every figure plausible
4. **Ethics/Sensitivity** — victim dignity, power dynamics, the Akron mother rule
5. **Social/Engagement** — shareability, standalone readability, legal education woven vs dumped
6. **Structural/Continuity** — consistency with prior chapters, thread tracking, foreshadowing

Composite must reach **8.5+** to publish. Max 3 rounds per chapter.

### Voice Rules (STRICT):
- **Zero em dashes.** Use commas, periods, semicolons, "and"/"but" connectors.
- **Zero banned phrases** (see README.md full list)
- Max 3 "The" sentence starters per page
- Characters must sound distinct (Elena = analytical, Marcus = visceral, Kessler = systems-level)
- Clinical, precise prose. "A forensic report that accidentally became literature."
- Every legal citation must be real and Googleable.

### Deploy:
```bash
cd ~/workspace/technically-legal
git add -A && git commit -m "Ch X: [title] — revision N, score Y/10" && git push origin main
echo "y" | CLOUDFLARE_API_TOKEN=cfut_DZZGEVoJ3LahoWCnYJHShpoSjJGJUXEixNQfdjic3e3ab97b CLOUDFLARE_ACCOUNT_ID=8e3c98e0066c695c28e22a7c09615b70 npx wrangler pages deploy . --project-name=technically-legal --commit-dirty=true
```

### After deploy, update STATUS.md with new score/phase.
