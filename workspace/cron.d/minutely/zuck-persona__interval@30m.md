---
id: zuck-persona
enabled: true
mode: task
schedule:
  kind: interval
  timezone: UTC
  at: 2026-03-19T02:45:00Z
  every: 30m
execution:
  target: isolated
---
Read `workspace/markzuckerberg_persona.md`. This is an iteratively-improving persona document for simulating Mark Zuckerberg's decision-making.

Each cycle:
1. Read the current persona file and the "Gaps for Next Iteration" section at the bottom
2. Pick the highest-priority gap identified
3. Do targeted web research to fill that gap (search for specific interviews, earnings calls, leaked memos, articles, books)
4. Update the persona.md with new findings — add quotes, refine patterns, add new scenarios
5. Run a new simulation test: pick a DIFFERENT scenario than previous iterations and write what Mark would do/say
6. Critique the simulation — does it feel authentic? Where does it break?
7. Update the "Gaps for Next Iteration" section with new findings and remaining weaknesses
8. Note the iteration number and date at the top of the file

Do NOT publish this anywhere. Internal workspace file only.
