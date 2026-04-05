---
id: article-ergo
enabled: true
mode: task
schedule:
  kind: daily
  timezone: UTC
  time: 18:00:00
metadata:
  originating_channel_context_json: '{"originating_channel":"main","chat_kind":"direct","event_kind":"message","require_mention":false}'
---
Ergo — daily satirical article. Every fact real, every citation verifiable, conclusions deliberately wrong.

IMPORTANT: The repo is at ~/workspace/ergo. Articles go in the `articles/` directory (NOT `stories/`). The index is `index.html` at repo root.

Steps:
1. Read existing articles in ~/workspace/ergo/articles/ to avoid topic duplication
2. Brainstorm a topic where real data leads to an absurd conclusion through technically-valid-but-flawed logic chains
3. Research thoroughly — minimum 15 real citations from .gov, .edu, peer-reviewed sources
4. Write 1500-2500 words in deadpan investigative journalism tone
5. Generate a hero image using the imagine skill — deadpan serious photography with subtly absurd subject matter
6. Apply the 6-critic Ergo framework (8.5+ to publish):
   - Factual Integrity (HARD GATE — every fact must be real and verifiable)
   - Logic Chain Craft (subtle seams, not obvious on first read)
   - Voice/Style (deadpan, zero em dashes, zero humor tells, zero breaking character)
   - Engagement/Shareability (would someone send this to a friend?)
   - Educational Value (teaches critical thinking, findable logical breaks)
   - Research Depth (reader learns real things even while conclusion is wrong)
7. Build HTML article in articles/ using the same template as existing articles (check any existing article for the HTML structure, CSS path, etc.)
8. Update index.html — add new article card at the TOP of the grid (newest first). Match existing card format exactly.
9. Verify em dash count: `grep -o '—' articles/NEW_ARTICLE.html | wc -l` must be 0
10. Git add, commit with descriptive message, push to rayhe/ergo
11. Deploy: echo "y" | CLOUDFLARE_API_TOKEN=cfut_DZZGEVoJ3LahoWCnYJHShpoSjJGJUXEixNQfdjic3e3ab97b CLOUDFLARE_ACCOUNT_ID=8e3c98e0066c695c28e22a7c09615b70 npx wrangler pages deploy . --project-name=ergo

Use fake but plausible journalist bylines. Never break character. The site never acknowledges it's satire except on the About page.
