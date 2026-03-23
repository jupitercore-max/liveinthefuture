---
id: technically-legal-chapter
enabled: true
mode: task
schedule:
  kind: daily
  timezone: UTC
  time: 21:00:00
metadata:
  originating_channel_context_json: '{"originating_channel":"main","chat_kind":"direct","event_kind":"message","require_mention":false}'
---
## Technically Legal — Daily Chapter

Runs daily at 2 PM PT. Write, critique, and publish ONE complete chapter per run. Do NOT spawn subagents — you are the worker.

### Setup: Read Project Files
```bash
cat ~/workspace/technically-legal/STATUS.md
cat ~/workspace/technically-legal/README.md
cat ~/workspace/technically-legal/plot-outline.md
```
Find the first chapter not yet at PUBLISHED status. That's your target.

### Step 1: Write Draft
- Read the plot outline for this chapter's beats, POV characters, and key scenes
- Read ALL prior published chapters for continuity (character state, threads, foreshadowing)
- Write 3,500-5,000 words as markdown in `~/workspace/technically-legal/chapter-{N}-draft.md`
- Follow voice rules strictly (see below)

### Step 2: Self-Critique (6 critics, inline)
Score each 1-10 with specific actionable notes:
1. **Narrative** — pacing, character voice, structure, hook, ending pull-through
2. **Voice/Style** — em dash count (MUST BE ZERO), banned phrases (MUST BE ZERO), sentence rhythm, paragraph variety
3. **Legal/Research** — every statute real, every case real, every figure plausible and Googleable
4. **Ethics/Sensitivity** — victim dignity, power dynamics, the Akron mother rule (never shown directly)
5. **Social/Engagement** — standalone readability, would someone share this chapter alone?
6. **Continuity** — consistency with prior chapters, thread tracking, character arcs advancing

Composite must reach **8.5+** to publish. If below, revise and re-critique. Max 3 rounds.

### Step 3: Build HTML
- Use the chapter-1.html template as reference for structure
- `<link rel="stylesheet" href="style.css">`
- `<script src="reader.js"></script>`
- Chapter nav: Previous/Next links to adjacent chapters
- Update previous chapter's HTML to add "Next Chapter" link to this one
- Update `chapters.html` index page with new chapter entry

### Step 4: Deploy
```bash
cd ~/workspace/technically-legal
git add -A && git commit -m "Ch {N}: {title} — score {X}/10" && git push origin main
echo "y" | CLOUDFLARE_API_TOKEN=cfut_DZZGEVoJ3LahoWCnYJHShpoSjJGJUXEixNQfdjic3e3ab97b CLOUDFLARE_ACCOUNT_ID=8e3c98e0066c695c28e22a7c09615b70 npx wrangler pages deploy . --project-name=technically-legal --commit-dirty=true
```

### Step 5: Update STATUS.md
Mark chapter as PUBLISHED with score and date.

### Voice Rules (STRICT — from README.md):
- **ZERO em dashes.** Not one. Use commas, periods, semicolons, "and"/"but" connectors.
- **ZERO banned phrases:** "Dance of," "Tapestry of," "It's not just," "It's a testament," "A bold move," "In a world where," "not just...but," "serves as a," "what sets...apart," "In the rapidly," "Buckle up," "not for the faint"
- Max 3 "The" sentence starters per page
- Characters must sound distinct:
  - Elena Marsh: analytical, controlled, sees systems — "She didn't feel anger. She felt pattern recognition."
  - Marcus Cole: visceral, ground-level — short sentences under pressure
  - Martin Kessler: systems-level, philosophical — speaks in frameworks
  - David Kim: institutional, measured — thinks in precedent and jurisdiction
- Clinical, precise prose. "A forensic report that accidentally became literature."
- Every legal citation must be real and Googleable.

### IMPORTANT: Complete the ENTIRE pipeline in one run. Do not exit after just writing a draft.
