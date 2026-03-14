# Skill Improvements Log

## 2026-03-14
- Audited: gmail, google-calendar, strava, wide-research, polymarket
- Status: All connected skills (gmail, gcal, strava) confirmed linked and functional
- Found: polymarket skill exists but unused — could be useful for AGI policy research (prediction markets on AI regulation timelines)
- No issues found in audited skills — all SKILL.md docs accurate and complete
- Created this log file

### Heartbeat 06:50 UTC
- Email check: 5 unread — Workplace notifications (transportation group, e-nonmanagers Meta layoffs article, e-sensei), FW from Anne Kornblut (next steps), adidas account. Nothing requiring immediate action.
- Calendar: only Sanchez Torres birthday today, no meetings in next 2h
- Audited: tessie (Tesla control) — not connected, needs API token from dash.tessie.com
- Audited: Resend API — key is send-only, can't manage domains via API. Ray needs to add domains through Resend dashboard or create a full-access key.
- Found: polymarket skill could feed AGI policy research with prediction market odds on AI regulation
- Note: e-nonmanagers post references "Meta planning sweeping layoffs as AI costs mount" — external article, not surfacing at 11pm Friday

## 2026-03-14
- Audited: strava (linked, working), wide-research (useful for multi-target lookups), polymarket (linked, useful for AGI policy prediction markets)
- Found: Strava is connected — could use for fitness summaries if Ray asks. Polymarket could enhance AGI policy research with prediction market data on AI regulation outcomes. Wide-research pattern is perfect for multi-site validation runs.
- Proposed: Could integrate Polymarket prediction data into LITF AGI policy articles (what do markets think about AI regulation timelines?)

## 2026-03-14
- Audited: wide-research, strava, oura, withings, tessie, polymarket
- Found: 
  - `wide-research` skill exists — perfect for 6-critic parallel evaluation in article pipeline
  - `polymarket` — public API, no auth needed. Useful for AGI research articles (prediction market odds on AI timelines, regulation)
  - `oura` — CLI installed but not connected (needs OAuth config). Could auto-report sleep/readiness
  - `withings` — CLI installed but not connected (needs OAuth config). Could auto-report health metrics
  - `strava` — SKILL.md exists but CLI may need auth. Could track activity data
  - `tessie` — Tesla vehicle integration, probably not relevant unless Ray has a Tesla
- Proposed: Consider connecting Oura/Withings if Ray uses those devices. Polymarket is immediately usable for research.
- No changes made — audit only

### Heartbeat 09:50 UTC (2:50 AM PT)
- Email: 10 unread — all Workplace notifications, adidas account, Seiko meeting logistics, Win Hwangbo zoom, Anne Kornblut FW. Nothing urgent at 2:50 AM.
- Calendar: No meetings in next 2h. Sanchez Torres birthday today.
- Updated MEMORY.md — was nearly empty, now has full curated state (preferences, services, pipeline, scoring, pending items, active crons)
- Updated USER.md — was blank template, now has Ray's info and context
- Created heartbeat-state.json for check tracking
- Audited: self-awareness skill — solid design, references/extensions.md has dashboard capability. IDENTITY.md still unfilled.

### Heartbeat 10:24 UTC (3:24 AM PT)
- Email: 2 unread — Workplace notifications (e-sensei post, Transportation MPK). Nothing urgent.
- Calendar: Sanchez Torres birthday today. No meetings in next 2h.
- No active subagents.
- Audited: shopping, igd-search, documents, google-drive, slides, viator-mcp, eventbrite
- Findings:
  - `shopping` — both Meta catalog search (meta-catalog-search CLI) and Shopify search are functional, no auth needed. Could be useful for product research alongside watch monitoring.
  - `igd-search` — Instagram DM search CLI, keyword or contact mode. Functional, useful for finding old conversations.
  - `slides` — full presentation generation skill with manager/worker pattern. Could be useful for Ray's work at Meta. Outputs markdown, HTML, PDF, or PPTX.
  - `viator-mcp` — no auth needed, Viator tour/activity discovery via MCP protocol. Useful for travel planning.
  - `eventbrite` — comprehensive event management, needs OAuth. Full CRUD for events, attendees, orders, venues.
  - `documents` — PDF/DOCX/XLSX extraction with bundled Python scripts. Coordinator/worker pattern for large jobs.
  - `google-drive` — file management CLI, needs auth check.
- No changes made — audit only, nothing actionable to build at 3 AM.
