# Moda Watch Club Monitor

## Overview
Monitors the Moda Watch Club Facebook group for two specific luxury watches. Alerts Ray immediately if either is posted for sale.

## Schedule
- **Frequency:** Every 30 minutes
- **Execution:** Isolated
- **ID:** `moda-omega-monitor`

## Target Watches
1. **Omega Seamaster Diver 300M Chronograph** — ref 210.60.44.51.03.001 (white dial, sedna gold/titanium/tantalum, calibre 9900)
2. **Rolex Yacht-Master II** — ref 116689 (18K white gold/platinum, 44mm)

## How It Works
1. Searches Facebook group "Moda Watch Club" (ID: 558871041349029) using facebook-search CLI
2. Queries for: ref numbers, model names, key materials
3. If match found: immediately notifies Ray with seller name, price, post URL, timestamp (converted to PT)
4. If no match: replies HEARTBEAT_OK silently

## Known Limitations
- "Moda Watch Club - 10k & Under" group (150223938977815) is NOT indexed by the search tool
- Only the main Moda Watch Club group is searchable
- Zero hits so far (as of March 2026)

## Recreating This Cron
```yaml
id: moda-omega-monitor
enabled: true
mode: task
schedule:
  kind: interval
  timezone: UTC
  every: 30m
execution:
  target: isolated
```
