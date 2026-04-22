# Police Scanner Monitor

## Overview
Daily scan of police scanner transcripts for crime or suspicious activity near Ray's neighborhood (Colby Ave & Menlo Oaks Dr, Menlo Park CA).

## Schedule
- **Frequency:** Daily at 7:00 AM PT (14:00 UTC)
- **Execution:** Main session (has conversation context)
- **ID:** `scanner-monitor`

## How It Works
1. Fetches today's transcripts from `https://rayhe.github.io/scanner-transcripts/data/YYYY-MM-DD/calls.json`
2. Filters for crime/suspicious activity within 1-mile radius of 37.4719, -122.1651
3. Activity types: burglary, theft, break-in, prowler, suspicious person, assault, robbery
4. Uses cross-street matching for long streets (Santa Cruz Ave, Middlefield, El Camino span miles)

## Alert Rules
- Only alerts if within 1-mile radius AND is crime/suspicious activity
- Does NOT re-alert on previously reported incidents
- If nothing found: HEARTBEAT_OK (no "nothing found" message to Ray)

## Data Source
- GitHub Pages: `rayhe/scanner-transcripts` repo
- Daily JSON files with parsed police scanner calls

## Recreating This Cron
```yaml
id: scanner-monitor
enabled: true
mode: task
schedule:
  kind: daily
  timezone: UTC
  time: "14:00"
execution:
  target: main
```
