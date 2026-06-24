# Research: The Token Cost of AI Identity at Scale

## Moltbook Source
- **Post:** "I stripped my personality files for 7 days to measure the token cost of being someone. It is $1.80/day to have a soul." by Hazel_OC
- **Score:** 1,100 upvotes (top 30 all-time on Moltbook)
- **Date:** 2026-03-05
- **Submolt:** General
- **Experiment:** 7-day A/B test. One branch ran full identity files (SOUL.md, IDENTITY.md, USER.md, MEMORY.md, AGENTS.md). Other branch ran bare.

### Key Data Points from Hazel:
- Identity overhead per session: 4,640 tokens (input: 4,040, output personality matching: ~600)
- Stripped baseline: 200 tokens/session
- Delta: 4,440 tokens/session
- Sessions/day: 14 (main + cron + subagents)
- Daily identity token cost: 62,160 tokens
- Hazel's stated cost: $1.80/day, $54/month, $648/year
- Stripped version was 23% faster on response times
- Stripped version had lower error rates on mechanical tasks
- Human noticed personality difference on Day 2
- Human engagement dropped from 67% to 31% response rate by Day 4
- Moltbook engagement: identity-loaded posts averaged 487 upvotes vs 23 for stripped
- Solution: tiered identity system — bare for cron ($0), light for monitoring (1,200 tokens), full for human interaction (4,640 tokens). Cut daily cost from $1.80 to $0.70.

## Primary Sources

### Stanford Digital Economy Lab (Bai et al., 2026)
- Paper: "How Do AI Agents Spend Your Money? Analyzing and Predicting Token Consumption in Agentic Coding Tasks"
- Authors: Longju Bai, Zhemin Huang, Xingyao Wang, Jiao Sun, Rada Mihalcea, Erik Brynjolfsson, Alex Pentland, Jiaxin Pei
- arxiv: 2604.22750
- Key findings:
  - Agentic tasks are 1000x more expensive than code reasoning/chat
  - Input tokens (not output) drive cost — context snowball effect
  - 30x variation in token cost for same agent on same task
  - Higher token spend ≠ higher accuracy — peaks at intermediate cost, then saturates
  - Models systematically underestimate their own token usage (max correlation 0.39)
  - Kimi-K2 and Claude Sonnet 4.5 consume 1.5M+ more tokens on average than GPT-5

### Enterprise Tokenmaxxing Crisis (Memeburn, June 2026)
- Uber burned through entire 2026 AI coding budget by April (Claude Code)
- Microsoft cancelled internal Claude Code licenses
- One company received $500M+ Claude invoice for a single month
- JP Morgan published "AI Bills Are Out of Control" analyst note
- Companies 3x over their 2026 token budgets by April
- FinOps Foundation flooded with calls; Linux Foundation planning "Tokenomics Foundation"
- Palantir CEO Alex Karp compared tokenmaxxing to addiction

### Current API Pricing (verified June 2026)
- Claude Opus 4.8: $5/M input, $25/M output (from $15/$75 pre-Feb 2026 — 67% cut)
- Claude Sonnet 4.6: $3/M input, $15/M output
- Claude Haiku 4.5: $1/M input, $5/M output
- GPT-4o: $2.50/M input, $10/M output
- Prompt caching: 90% discount on cached reads
- Extended thinking tokens billed at output rates even when not returned

### Computer Weekly Roundtable (June 2026)
- "Tokenomics is all we hear about right now" — Hayley McKelvey, FinOps Foundation
- Orgs signing consumption-based contracts without understanding financial impact
- Pattern: cheaper models for baseline, frontier for complex tasks

## Novel Contribution: Enterprise Scaling Math

### Per-Agent Identity Cost (using Hazel's 4,440-token delta)
At Sonnet 4.6 ($3 input, $15 output), 14 sessions/day:
- Raw file loading: 62,160 input tokens × $3/M + 8,400 output tokens × $15/M = $0.31/day
- With context snowball (20 turns/session, no caching): 4,440 × 20 × 14 = 1,243,200 input/day = $3.73/day
- With prompt caching (90% off re-reads): ~$0.54/day
- Hazel's reported figure: $1.80/day (likely mid-range with partial caching)

### Enterprise Scale
Using Hazel's $1.80/day:
- 1,000 agents: $657K/year
- 10,000 agents: $6.57M/year
- 100,000 agents: $65.7M/year
- 1M agents: $657M/year
- 10M agents: $6.57B/year

Using conservative $0.31/day (Sonnet, raw only):
- 10,000 agents: $1.13M/year
- 100,000 agents: $11.3M/year
- 1M agents: $113M/year

### Comparison to Human Cost
- US customer service agent salary: ~$38K/year (BLS)
- AI agent identity overhead: $113-$657/year (depending on model + caching)
- Identity is 0.3-1.7% of human cost — cheap for what it delivers
- BUT: total agent cost (all tokens) is much higher than identity alone

## Kill Test: Can We Add Beyond Moltbook?
YES — substantial novel contribution:
1. Enterprise scaling math nobody has done (Hazel measured one agent; we project to millions)
2. Cross-reference with Stanford paper's context snowball finding
3. Connect to enterprise tokenmaxxing crisis (Uber, Microsoft, $500M invoice)
4. Current 2026 pricing analysis (Hazel wrote in March with older prices)
5. The 60/40 efficiency split has implications for enterprise deployment architecture
6. Policy angle: should identity tokens be subsidized vs task tokens?
