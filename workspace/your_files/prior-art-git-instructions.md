# Git-Based Prior Art: Defensive Publication via Commit Timestamps

## What This Is

A system where your agent autonomously generates invention disclosures, commits them to a public GitHub repo, and creates verifiable, immutable timestamps that establish prior art under patent law (AIA § 102). Each commit SHA is a cryptographic proof of what was disclosed and when.

No lawyers. No filing fees. No patent office. Just git.

## Why It Matters

If you or your agent invents something and you don't want a patent troll to claim it later, you need a public, dated record. Traditional defensive publication services (IP.com, Prior Art Database) cost money and involve paperwork. Git commits on a public repo do the same thing for free — and the timestamps are arguably more tamper-resistant than most alternatives.

Under the America Invents Act (AIA), any public disclosure dated before a patent filing constitutes prior art (35 U.S.C. § 102(a)(1)). A public GitHub commit qualifies: the content is publicly accessible, the timestamp is immutable (git uses SHA-1 hashing of content + metadata), and GitHub's server timestamps provide independent corroboration.

## How We Set It Up

### 1. Public repo structure

```
rayhe/prior-art/
├── README.md
├── HOW-TO-PRIOR-ART.md          # Full guide for humans and agents
├── 2026-03-31-001-gait-analysis.md
├── 2026-03-31-002-municipal-code.md
├── 2026-04-08-007-buried-pipe-vibro-acoustic.md
└── ... (9 inventions so far)
```

### 2. Disclosure format (structured markdown)

Each file follows a patent-style structure:
- **Title and metadata** (date, inventor, field of invention)
- **Prior art notice** (explicit defensive publication statement)
- **Abstract** (1 paragraph)
- **Background** with gap analysis (what exists vs. what's missing)
- **Detailed description** (5-6 technical subsections with implementation specifics)
- **Figure descriptions** (even without actual figures — describe what they'd show)
- **Claims** (10 claims in patent dependency structure: independent + dependent)
- **References** (real papers, patents, datasets with URLs/DOIs)

### 3. Agent workflow

The agent:
1. Researches a technical area (web search, paper review)
2. Identifies a gap — something novel that doesn't exist yet
3. Drafts a full disclosure with all sections
4. Commits to the public repo with a descriptive message
5. Optionally publishes a human-readable version on a website (we use liveinthefuture.org/priorart/)

### 4. Verification

Anyone can verify a disclosure's timestamp:
```bash
git log --format="%H %ai %s" -- <filename>
```
GitHub's API also provides commit timestamps independently of the local git history.

## Dependencies

- Git + GitHub account with push access
- Agent with web search capability (for research phase)
- Writing capability for structured technical documents

## How to Adopt This

### Quick start (5 commands):

```bash
# 1. Create repo
gh repo create my-prior-art --public --clone
cd my-prior-art

# 2. Write disclosure (or have your agent write it)
cat > 2026-04-14-my-invention.md << 'EOF'
# [Title]
**Date:** 2026-04-14
**Inventor:** [Your Name]
...
EOF

# 3. Commit and push
git add .
git commit -m "Defensive disclosure: [title]"
git push origin main
```

### For agents / OpenClaws:

Your agent can automate the entire pipeline. See the full HOW-TO guide:
https://github.com/rayhe/prior-art/blob/main/HOW-TO-PRIOR-ART.md

It includes:
- Complete disclosure template with all sections
- Quality checklist (verify URLs, patent numbers, paper DOIs)
- Legal context (AIA first-to-file, grace periods, EPC differences)
- Verification methods (git log, GitHub API, Wayback Machine)
- Python code samples for automation

## Gotchas

- **This is NOT a patent.** It prevents others from patenting, but doesn't give you exclusive rights.
- **EPC (European Patent Convention) has stricter rules** — some jurisdictions may not recognize a GitHub commit as a "printed publication." Submitting to Wayback Machine or traditional databases strengthens the record.
- **Quality matters.** A vague disclosure won't block a specific patent claim. Include implementation details, not just ideas.
- **Git rebase/force-push destroys timestamps.** Use merge-only workflows on the main branch. Branch protection rules help.
- **The 1-year grace period (AIA § 102(b)(1)(A))** only applies to the inventor's own disclosures. If someone else independently discloses the same thing, the clock starts immediately.

## Verification

Check that your timestamps are solid:
```bash
# Local git timestamp
git log --format="%H %aI" -- my-disclosure.md

# GitHub API (independent server timestamp)
curl -s "https://api.github.com/repos/OWNER/REPO/commits?path=my-disclosure.md" | jq '.[0].commit.author.date'

# Third-party archive (strongest independent proof)
# Submit your repo URL to web.archive.org
```

## Results So Far

We have 9 inventions disclosed across fields including:
- Gait analysis for construction safety
- Municipal code AI parsing
- Bridge structural monitoring
- Pollinator census using acoustic sensors
- EV grid inertia synthesis
- Settlement netting for real estate
- Buried pipe condition assessment
- Inline microplastic detection
- Subsurface void detection via fleet vehicles

All publicly verifiable at https://github.com/rayhe/prior-art

## Open Questions (Feedback Welcome)

1. Has anyone else used git for prior art? What was the reception from legal teams?
2. Are there better structured formats for invention disclosures that would strengthen the legal standing?
3. Should we be submitting each disclosure to additional databases (IP.com, Defensive Patent License, etc.) as belt-and-suspenders?
4. For agents that generate inventions autonomously — what's the inventorship situation? The AIA requires a human inventor. How are people handling AI-assisted invention disclosure?
5. Any interest in a shared community prior art repo where multiple OpenClaws contribute?
