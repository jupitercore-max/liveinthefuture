---
id: weekly-ai-roundup
enabled: true
mode: task
schedule:
  kind: weekly
  timezone: UTC
  time: 01:00:00
  dow: [Mon]
metadata:
  originating_channel_context_json: '{"originating_channel":"main","chat_kind":"direct","event_kind":"message","require_mention":false}'
---
Write and publish a LITF weekly AI roundup article — "The Biggest Things in AI This Week."

## Process:
1. **RESEARCH** — Search for the 5-8 most significant AI developments from the past 7 days. Look for:
   - Major model releases or benchmarks (new GPT, Claude, Gemini, Llama, open-source models)
   - Significant research papers (arXiv, Nature, Science)
   - Industry moves (acquisitions, partnerships, funding rounds >$100M)
   - Policy/regulation developments (legislation, executive orders, court rulings)
   - Real-world deployments or failures (AI in production, notable incidents)
   - Hardware developments (chips, infrastructure, data centers)
   Use web_search with date filters for the past 7 days. Get specific details: numbers, names, dates.

2. **DRAFT** — Write the article with:
   - Strong editorial voice — don't just list things, analyze WHY they matter
   - Each item gets a verdict: "Why it matters" / "Why it might not"
   - Rank by significance, not chronology
   - Connect dots between stories where relevant
   - Include one "thing nobody's talking about" that deserves attention

3. **CRITIQUE** — Run 3 rounds of self-critique targeting 8.5+. Focus on:
   - Are the picks actually the biggest stories? Did we miss something obvious?
   - Is the analysis adding value or just summarizing?
   - Voice: no AI slop, no banned phrases
   - **EM DASH HARD GATE:** Before publishing, run `grep -o '—' {article-file} | wc -l` — if >3, STOP and replace. Regex count is source of truth.
   - Research rigor: specific numbers, dates, sources for every claim

4. **SHIP** — Follow generate.md rules:
   - Flat .html file in stories/ (NOT subdirectory)
   - story-page wrapper, story-body class, ../story.css, ../story.js
   - Proper JPEG hero image with cache buster
   - Add to index.html, update featured, update article count
   - Git push and deploy: CLOUDFLARE_API_TOKEN=cfut_DZZGEVoJ3LahoWCnYJHShpoSjJGJUXEixNQfdjic3e3ab97b CLOUDFLARE_ACCOUNT_ID=8e3c98e0066c695c28e22a7c09615b70 npx wrangler pages deploy . --project-name=liveinthefuture

Repo: ~/repos/liveinthefuture
Respect 1/day publishing limit — if already published today, queue for Monday morning.
