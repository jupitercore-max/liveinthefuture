# Design Iteration Task

## What
Iteratively improve LITF visual design assets (logo, favicon, page layout, typography, data visualizations) using the evaluation framework at `liveinthefuture/design_evaluation.md`.

## Process
1. Read `liveinthefuture/design_evaluation.md` — check current scores and iteration log
2. Identify the **lowest-scoring dimension** from the current evaluation
3. Research best practices and benchmarks for that specific dimension (web search for reference designs, typography resources, SVG optimization techniques, etc.)
4. Propose and implement a specific, measurable improvement
5. Re-score the design against all 10 dimensions
6. If score improves: commit, push, update the iteration log
7. If score doesn't improve: revert, document why, move to next-lowest dimension
8. Update `design_evaluation.md` with the new scores and iteration notes

## Constraints
- ONE improvement per iteration (don't try to fix everything at once)
- Changes must be backward-compatible (don't break existing pages)
- Test both light and dark mode
- Generate PNG renders for visual comparison
- Keep the iteration log in `design_evaluation.md` as an append-only history

## Current Priority
Technical Execution (score: 6/10) — convert SVG text to paths for guaranteed cross-browser rendering.
