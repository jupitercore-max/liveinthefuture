# Personalized Actions

## 2026-04-11

### Action: Watches & Wonders 2026 Live Alert Setup
**What Kit will do:** Set up a cron that scrapes watch news sources and social feeds for Watches & Wonders 2026 announcements April 14–18, filtering for Patek Philippe (especially titanium or Nautilus 50th), Rolex, and your specified additional brands — push alerts to Telegram and main chat the moment anything drops.
**Why now:** W&W 2026 is in 3 days. Ray is already on HIGH ALERT for Patek titanium and Nautilus 50th. Missing an announcement in the first hour could mean missing allocation windows.
**Blocking question 1:** Which additional brands to monitor beyond Patek and Rolex?
  - Option A: Audemars Piguet + Hublot
  - Option B: Tudor + Grand Seiko

### Action: Property Manager Inquiry Emails for 1205 N Lemon
**What Kit will do:** Send inquiry emails to top property managers who specialize in Menlo Park $5M+ properties — covering rates, availability, and experience with similar homes — using the 5 managers Ray researched (Intempus, Linwood, PMI Redwood, Midtown, Wilbur). Replies go to Ray's email.
**Why now:** 1205 N Lemon has been empty since December 2024, bleeding ~$98K/year. Ray just spent time on this decision. Contacting PMs now gets quotes back while the analysis is fresh.
**Blocking question 1:** Which managers should Kit contact first?
  - Option A: Top 2 — Intempus (largest in Silicon Valley) + Linwood
  - Option B: All 5 at once to maximize response speed

### Action: Firebase RTDB Newsletter Rules Fix
**What Kit will do:** Update the Firebase Realtime Database security rules for the `rayhenet` project to enable newsletter subscriber writes to the `/newsletters` path — unblocking new subscriber sign-ups across all 3 sites (LITF, VS, AIHome).
**Why now:** This is a named pending item. Every day it's broken is a subscriber who bounced.
**Blocking question 1:** What authentication level should newsletter writes require?
  - Option A: Any authenticated user (secure — only logged-in visitors can subscribe)
  - Option B: Open to any source (public forms don't require login to subscribe)
