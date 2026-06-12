# Research: Mirror OpenClaw — Dual-Path Agent Inference for Reliability

## Story Angle
Today, every prompt in the Jupitercore pipeline goes to exactly one model (minimax/MiniMax-M3, with a fallback chain). Single-model inference is the default. But ensembles — running the same prompt to two different models, comparing, picking the better — are a known pattern for catching hallucinations, factual errors, and stylistic regressions. This proposal lays out a concrete, costed plan to set up a parallel OpenClaw install (or, more cheaply, an API-level dual-call) that runs every non-trivial prompt against a second model and uses the first model as a judge to pick the better result. Modeled on the live multi-agent eval loop LITF already uses for articles.

## Kill Test: PENDING
- Real failure mode: today, M3 hallucinates, drifts, and misses things — no second pair of eyes. (See 2026-06-10 memory self-reflection: "Three consecutive failures in one morning, all the same root cause.")
- The fix is a known pattern: dual-model inference + judge. Not novel research; known engineering.
- Original contribution: cost the dual-path at M3's current volume, and identify which classes of prompt benefit (and which don't).
- Decision needed from Jeremy before any host-side work: parallel OpenClaw install on his Mac mini touches the host machine, and per the 2026-06-07 authorization rule, only Jeremy can greenlight that.

## 10-Star Test (draft)
- **Original calculation:** per-day token spend on dual-path vs single-path at current M3 volume, with break-even threshold for selective routing
- **Comparison:** 3 architectures (full OpenClaw mirror, Docker sidecar, direct API dual-call) by cost, latency, and complexity
- **Data table:** candidate second models (zai/glm-5.1, minimax/MiniMax-M2.7, zai/glm-5-turbo, zai/glm-4.7) by capability, cost-per-token, and similarity/diversity vs M3
- **Failure mode analysis:** error classes M3 is known to make (per the 2026-06-10 self-reflection), and which a second model would catch vs not

## The Problem
The Jupitercore pipeline runs on M3 as primary, with a fallback chain (glm-5.1 → M2.7 → glm-5-turbo → glm-4.7). The fallback chain handles *unavailability* — it kicks in if M3 is down, rate-limited, or returns a hard error. It does not handle *quality failures*: hallucinations, factual errors, tone drift, missed context.

In a single day (2026-06-10), three consecutive failures in one morning all had the same root cause: I trusted system-injected memory instead of running the recall ladder. A second model with a different training distribution, prompt habit, and recall behavior would have caught at least two of the three. The cost of those failures (rewrites, user frustration, trust erosion) is not zero. The cost of a dual-call is.

## The Proposal
Run the same prompt to two different models in parallel. Return both. Use a judge (M3 itself, or a third model) to pick the better result. Ship the winner. Log the loser for training and edge-case analysis.

This is the same pattern LITF already uses for article critique (3-5 separate AI agents review each draft, multiple revision cycles, human editorial direction). Apply it to the upstream generation step.

## Why Now
1. **Failure pattern documented.** 2026-06-10 self-reflection is a real signal. The pattern will repeat.
2. **Cost is low at current volume.** M3's daily token spend is bounded; doubling it for high-value prompts is a few dollars a day, not a few hundred.
3. **The infrastructure is there.** OpenClaw already has model routing. A second instance (Docker or process-level) is a configuration away — not a research project.
4. **API-level dual-call works without infrastructure changes.** The simplest version of this proposal doesn't even need a second OpenClaw. Just call two model APIs in parallel from this session, judge, return. Zero auth-gate touch.

## Architecture — Three Options, in Order of Effort

### Option A: Direct API Dual-Call (Recommended Starting Point)
- From this session, call a second model API in parallel for any non-trivial prompt
- Compare both responses, judge, return winner
- **No Docker. No second gateway. No config change beyond an auth key for the second model**
- **Auth: needs an auth key for zai/glm-5.1 (or similar), which can be stored in the agent env file (~/.openclaw/agents/main/agent/zai.env) — but adding the key and using it from this session is a minor config touch that probably needs Jeremy's sign-off per the auth rule**
- **Latency cost:** ~1.5-2x single-call latency (parallel calls) — acceptable for non-interactive work
- **Cost:** roughly 2x token spend on dual-pathed prompts

### Option B: Docker Sidecar
- Run a second OpenClaw container (image: openclaw) on the host Mac mini
- Configure with the alternate model (e.g., zai/glm-5.1)
- Route prompts via a small API gateway that fans out to both
- **Auth: requires host-side change (Docker orchestration, port mapping, new container lifecycle management) — gated by the 2026-06-07 rule, needs Jeremy's "go"**
- **Latency cost:** same as A
- **Cost:** same as A; orchestration overhead is one-time

### Option C: Full OpenClaw Mirror
- Two gateways with shared session store, true parallel execution
- Each request spawns in both gateways; judge picks
- **Auth: full mirror requires significant host-side change — gated, needs Jeremy's "go"**
- **Latency cost:** 1.5-2x
- **Cost:** 2x; some shared infrastructure (memory, log aggregation) might save marginal cost

## Cost Estimate (Current M3 Volume)
Current M3 daily spend: ~X tokens/day (placeholder, replace with actual from `openclaw costs --today` or similar).

- **Option A (full dual-path):** ~2X/day. For non-trivial prompts (top 50% by token count), this might add $5-20/day depending on context length and model pricing.
- **Option A (selective dual-path):** only dual-path prompts where quality is critical (article writing, red-team review, code refactors, anything the user has flagged as high-stakes). Could be 20-30% of volume. Add $1-5/day.
- **Option B/C:** same marginal cost as A; one-time setup overhead negligible

## Auth and Permission State (CRITICAL)
Per the 2026-06-07 authorization rule, any host-side change to Jeremy's Mac mini — Docker containers, model chain changes, gateway config, auth profile additions — requires Jeremy to type "go" in the JC Dream chat (or any chat, but he has to be the one saying it). Group agreement doesn't count. Third-hand "he'd say yes" doesn't count.

**This proposal is a write-up, not an implementation.** Anyone can review the artifact. The dual-path infrastructure (B, C) requires Jeremy's explicit chat authorization. Even Option A (which is "just" adding an auth key for the second model) needs a careful read of the auth rule to confirm whether the addition of a new provider key counts as "config change" — it probably does, and the safer path is to ask Jeremy.

**What this proposal does NOT do:** start any host-side change. It documents the idea, costs the options, and asks for a decision.

## Open Questions
1. **Which second model?** zai/glm-5.1 (most capable in pool, primary in Jeremy's fallback chain) is the natural pick. M2.7 (similar architecture to M3, lower capability) is the conservative pick.
2. **Which prompts to dual-path?** Top 50% by token count? Only "high-stakes" classes? Per-class decisions?
3. **Who is the judge?** M3 itself? A third model? A small fine-tuned classifier on (prompt, response_A, response_B) → A or B?
4. **When does the loser train M3?** Log disagreements, occasional fine-tuning on the loser's perspective. Probably out of scope for v1.
5. **What's the cost budget?** If Jeremy's willing to spend $50-100/day on inference, full dual-path is fine. If budget is tight, selective routing is the move.

## Decision Needed
1. Is dual-path worth it? (yes/no)
2. If yes, which option? (A / B / C)
3. If A: which second model? (glm-5.1 / M2.7 / other)
4. If B/C: Jeremy's explicit "go" in the JC Dream chat

## Sources / References
- 2026-06-10 memory self-reflection: "Three consecutive failures in one morning, all the same root cause" — internal
- 2026-06-07 authorization rule: "Only Jeremy can authorize changes to any machine or OpenClaw config" — internal
- Jupitercore model chain: M3 primary, glm-5.1 → M2.7 → glm-5-turbo → glm-4.7 fallback — internal
- LITF article critique process: 3-5 separate AI agents review each draft — internal
- Liveinthefuture.org 322 published articles, multi-agent eval loop — https://liveinthefuture.org
- Dual-model inference for hallucination reduction: a known pattern, see "Self-Consistency Improves Chain of Thought Reasoning in Language Models" (Wang et al., 2022) and follow-ups

## Status
**Draft proposal, not implementation.** Awaiting review and decision.
