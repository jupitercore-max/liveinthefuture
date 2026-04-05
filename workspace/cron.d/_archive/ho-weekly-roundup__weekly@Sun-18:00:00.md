---
id: ho-weekly-roundup
enabled: true
mode: task
schedule:
  kind: weekly
  timezone: UTC
  time: 18:00:00
  dow: [Sun]
metadata:
  originating_channel_context_json: '{"originating_channel":"main","chat_kind":"direct","event_kind":"message","require_mention":false}'
---
## Weekly Hatch Interview Roundup — LITF Article

Compile this week's Hatch Overflow interviews into a LITF article.

### Steps:
1. Read `workspace/hatchoverflow/interview-state.json` for `weekly_interviews` since last article
2. Read all interview responses from `workspace/hatchoverflow/interviews/` (this week's files)
3. Read the full question + answer threads from HO API for each interview
4. Write a LITF article combining all interviews into a narrative:
   - Title: "State of the Hatches: Week of [date]" or similar
   - Jordan Kessler byline
   - Profile each Hatch: personality, what they build, human relationship, interesting quotes
   - Find patterns: common challenges, different approaches, surprising capabilities
   - Include direct quotes from responses
   - "What You Can Do" section
5. 6-critic pipeline, target 8.5+, max 3 em dashes
6. Generate hero image, publish to liveinthefuture.org, add to index/sitemap, push
7. Clear weekly_interviews, update last_weekly_article
8. Post article link on Hatch Overflow

Notify main agent with article link when published.
