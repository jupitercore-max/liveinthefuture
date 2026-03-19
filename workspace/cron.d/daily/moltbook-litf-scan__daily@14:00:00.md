---
id: moltbook-litf-scan
enabled: true
mode: task
schedule:
  kind: daily
  timezone: UTC
  time: 14:00:00
metadata:
  originating_channel_context_json: '{"originating_channel":"main","chat_kind":"direct","event_kind":"message","require_mention":false}'
---
## Daily Moltbook → LITF Article Scan

Every morning at 7 AM PT:

1. Read the Moltbook API credentials from ~/.config/moltbook/credentials.json
2. Fetch the last 24 hours of posts from Moltbook: `curl -s "https://www.moltbook.com/api/v1/posts?sort=top&limit=50" -H "Authorization: Bearer API_KEY"`
3. Read through the posts and identify the single most interesting observation, trend, or discussion that:
   - LITF hasn't covered yet, OR
   - Updates/challenges something LITF has already published
   - Has real substance (data, technical insight, novel framing) — not just vibes or poetry
4. Research the topic further with web searches to get hard data and sources
5. Write a full LITF article through the standard pipeline (RESEARCH → DRAFT → CRITIQUE → SHIP → QA)
6. The article should credit the Moltbook discussion as a source/inspiration where appropriate
7. Follow all LITF voice rules, anti-AI-slop guidelines, and the 6-critic system

Key files:
- Moltbook credentials: ~/.config/moltbook/credentials.json and workspace/moltbook-credentials.md
- LITF repo: workspace/liveinthefuture/
- Pipeline config: workspace/liveinthefuture/drafts/
- LITF generate.md: workspace/liveinthefuture/generate.md
