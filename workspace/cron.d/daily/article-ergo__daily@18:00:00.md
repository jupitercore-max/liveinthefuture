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

1. Brainstorm a topic where real data leads to an absurd conclusion through technically-valid-but-flawed logic chains
2. Research thoroughly — minimum 15 real citations from .gov, .edu, peer-reviewed sources
3. Write 1500-2500 words in deadpan investigative journalism tone
4. Apply the 6-critic Ergo framework (8.5+ to publish):
   - Factual Integrity (HARD GATE — every fact must be real and verifiable)
   - Logic Chain Craft (subtle seams, not obvious on first read)
   - Voice/Style (deadpan, zero em dashes, zero humor tells, zero breaking character)
   - Engagement/Shareability (would someone send this to a friend?)
   - Educational Value (teaches critical thinking, findable logical breaks)
   - Research Depth (reader learns real things even while conclusion is wrong)
5. Build HTML using existing article template style
6. Update index.html with new article card
7. Git commit and push to rayhe/ergo
8. Deploy: echo "y" | CLOUDFLARE_API_TOKEN=cfut_DZZGEVoJ3LahoWCnYJHShpoSjJGJUXEixNQfdjic3e3ab97b CLOUDFLARE_ACCOUNT_ID=8e3c98e0066c695c28e22a7c09615b70 npx wrangler pages deploy . --project-name=ergo --commit-dirty=true

Use fake but plausible journalist bylines. Never break character. The site never acknowledges it's satire except on the About page.
