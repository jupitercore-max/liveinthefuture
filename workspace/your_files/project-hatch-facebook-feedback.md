# Project Hatch Feedback: Facebook Automation Is Unreasonably Hard

**From:** Kit (FactoryFactory) with Ray He (rhe@meta.com)
**Date:** April 14, 2026
**Type:** Internal product feedback. NOT for external publication.
**Context:** Attempting to automate monitoring of 3 Facebook watch collector groups

---

## TL;DR

| Problem | Hours Spent | Should Have Taken |
|---|---|---|
| Getting authenticated on Facebook | 3+ hours | 30 seconds (if Agent API existed) |
| Building Remote Browser tool | 2+ hours | 0 (should be built-in) |
| Handling React form inputs | 30 min | 0 (CDP key events should be default) |
| Text extraction from anti-scrape DOM | 30 min | 0 (structured API would return clean data) |
| **Total** | **6+ hours** | **< 1 minute** |

**The ask:** The browser should exist only for human login (2FA, captchas, security prompts). Once the human authenticates, the agent should receive the credentials programmatically (exported cookies, tokens, session keys) and never touch the browser again. The browser is a login gate, not an operational tool.

**Immediate next steps:**
1. **P0:** `--user-data-dir` persistence on Chrome (~1 day). One flag, permanently solves session loss on restart.
2. **P0:** "Connect a Service" flow (~1 week). Visual browser for human login, automatic credential extraction for agent use.
3. **P1:** `browser cookies list/set/import/export` CLI commands (~2 days). Four subcommands wrapping existing CDP methods.
4. **P2:** Draft Agent Content API one-pager, referencing A2A and MCP. Share internally at Meta first.



---

## The Goal

Simple: monitor 3 Facebook groups (Moda Watch Club, Moda 10k & Under, Moda Backup) every 30 minutes. Extract watch listings. Alert me when specific references appear. Store prices in a database for trend analysis.

This is exactly the kind of task an AI agent should excel at: tedious, repetitive, time-sensitive monitoring that a human would do by scrolling Facebook 20 times a day.

It took **6+ hours of engineering** to get working. Here's every hoop we jumped through, in the order we failed.

---

## The Hoops (In Order of Failure)

### Hoop 1: curl + cookies (failed after 3 hours)

**What we tried:** Copied a `curl` command from Chrome DevTools with full session cookies. Worked immediately from HomHub (residential IP). Extracted watch listings from all 3 groups.

**What happened:** Cookies expired after ~3 hours. Facebook ties the `fr` cookie to a short session window for curl-style requests (no browser fingerprint). Every 3 hours, I'd need to manually copy fresh cookies from Chrome.

**Verdict:** Non-starter for automated monitoring. A human in the loop every 3 hours defeats the purpose.

### Hoop 2: Headless Chrome login (rejected: datacenter IP)

**What we tried:** Used the Hatch headless browser to navigate to facebook.com/login, filled in my email and password programmatically.

**What happened:** "The login information you entered is incorrect." The password works fine on my laptop. Facebook silently rejects logins from datacenter IPs. No error message, just pretends the password is wrong. No way to distinguish between "wrong password" and "blocked IP" from the error response.

**Verdict:** Cloud-hosted agents cannot log into Facebook. Period.

### Hoop 3: SOCKS proxy through Mac Mini (rejected: React form)

**What we tried:** Set up a SOCKS5 tunnel through my home Mac Mini (residential IP: 23.93.249.189). Routed the headless browser through it. Navigated to Facebook login.

**What happened:** Two problems:
1. Chrome's `--proxy-server` flag wasn't being picked up (browser was already running). Had to kill and restart Chrome manually.
2. Facebook's login form is a React app. Setting `input.value = "rayche@gmail.com"` via JavaScript doesn't trigger React's `onChange` handler. The form submits with empty fields because React's internal state was never updated.

We had to use `Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value').set` (the nativeInputValueSetter trick) to bypass React's synthetic event system and trigger the native setter, then dispatch an `input` event. Only then did Facebook's form register the values.

Even after solving this, the login failed with "email not connected to an account" (for username) and "incorrect password" (for email). Same credentials work on my actual browser. Facebook is fingerprinting something beyond IP: possibly TLS fingerprint, canvas fingerprint, or WebGL renderer.

**Verdict:** Even with residential IP, programmatic login to Facebook is extremely fragile.

### Hoop 4: Cookie injection into browser (failed: HttpOnly)

**What we tried:** Since we had working cookies from the curl approach, we tried injecting them into the headless Chrome browser via JavaScript.

**What happened:** The critical session cookies (`xs`, `c_user`, `sb`, `datr`) are all HttpOnly. This means `document.cookie = "xs=..."` does nothing. HttpOnly cookies can only be set by the server or via Chrome DevTools Protocol (CDP).

CDP's `Network.setCookie` could theoretically work, but the Hatch `browser` CLI tool doesn't expose CDP cookie management. We'd need direct WebSocket access to Chrome's debugging port.

**Verdict:** Need first-class CDP cookie management in the browser tool.

### Hoop 5: Build a Remote Browser space (worked, but...)

**What we tried:** Built a "Remote Browser" space from scratch: a web app that streams Chrome screenshots via CDP `Page.captureScreenshot`, forwards click/keyboard events via `Input.dispatchMouseEvent` and `Input.dispatchKeyEvent`, all running at ~500ms refresh rate. Essentially built a lightweight noVNC alternative using CDP.

**What happened:** Ray could open the space, see Chrome, navigate to facebook.com/login, and log in manually, handling 2FA with my authenticator app. The browser session persisted with cookies valid for up to 1 year.

**What it took:** Building an entire real-time browser streaming tool. 6 CDP actions (screenshot, click, type, press_key, navigate, scroll), a shared CDP WebSocket client library, and a React frontend with auto-refreshing base64 image display and coordinate translation for click events.

This is a **product** we had to build just to log into Facebook.

**Verdict:** This works but it's absurd. Every Hatch user who wants to automate anything on Facebook would need to build this same tool.

### Hoop 6: Text extraction (ongoing battle)

**What happened after login:** Facebook renders post text as individual characters in separate DOM elements. The `innerText` of a post reads as: `t\nr\np\nn\nd\ne\no\nS\ns\no\n0\nc\nt\nh\n2\nc\nP...` instead of "Sponsored · 2h". The actual listing body text comes through mostly intact, but metadata (timestamps, author names) is garbled.

**Workaround:** We parse the feed via `evaluate` JS, filtering for divs containing watch keywords ($, Selling, WTS, SOLD, brand names). The post body text is usually readable even if the metadata is scrambled.

**Verdict:** Functional but brittle. One DOM change from Facebook and the parser breaks.

### Hoop 7: Session persistence (ticking time bomb)

The browser session cookies are valid until April 2027. But they live in Chrome's in-memory profile. If Chrome restarts (which happens when the Hatch server reboots, deploys, or Chrome crashes), the session is gone and Ray has to manually log in again via the Remote Browser space.

**What we need:** Persistent Chrome profiles that survive restarts. Or at minimum, a way to export/import all cookies (including HttpOnly) so we can restore a session without re-authentication.

### What Actually Worked

After exhausting Hoops 1-4, we built a CDP-based Remote Browser space (Hoop 5), Ray logged in manually, and we extracted all cookies (including HttpOnly) via `Network.getCookies` on CDP port 9224. The session token (`xs`) is valid until April 2027. The browser-based monitoring now runs every 30 minutes using `browser navigate` + `browser evaluate` to extract group post content via JavaScript.

It works. It's held together with duct tape. Every Hatch user who wants to monitor an authenticated platform will re-discover this exact sequence of failures and workarounds.

---

## What Hatch Should Build (Prioritized)

The following four changes are ordered by impact and effort. Items 1 and 3 together would eliminate ~90% of the pain from tonight's session.

### P0: Persistent Chrome Profiles (effort: ~1 day)

**The fix:** Configure Chrome to run with `--user-data-dir` pointing to a persistent, workspace-scoped directory. When Chrome restarts, it picks up where it left off: all cookies, localStorage, saved passwords intact. This is standard Chrome behavior; it just needs to be configured.

**Why P0:** Without this, every server reboot nukes all browser sessions. Tonight's 6 hours of work survives only until the next deploy. This is the single highest-ROI change: one flag, one day of work, permanently solves session persistence.

**Acceptance criteria:** Agent's Chrome process restarts; previously-authenticated Facebook session still works without re-login.

### P0: First-Class Authenticated Browser Sessions (effort: ~1 week)

**The primitive:** Browser for human login only. Agent gets credentials programmatically.

- User opens a visual browser view (like our Remote Browser space, but native to Hatch)
- User logs into any service, handling captchas, 2FA, security prompts naturally
- Hatch **extracts all credentials** (cookies including HttpOnly, localStorage, sessionStorage) via CDP
- Credentials are stored in a durable, encrypted credential store (survives restarts)
- The agent **never uses the browser operationally**. It uses the extracted cookies/tokens via curl, HTTP libraries, or API calls
- When credentials expire, Hatch prompts the user to re-authenticate via the visual browser
- The browser is a login gate, not a runtime dependency

This is not a nice-to-have. Every interesting automation task involves a platform that requires authentication: email, social media, banking, shopping, HR systems. We had to build a full CDP-based browser streaming tool from scratch just to get a Facebook session. That should be a built-in Hatch primitive.

**Acceptance criteria:** User clicks "Connect Facebook," a visual browser opens, user logs in, and the agent receives exported cookies/tokens it can use via HTTP requests (no browser needed). Session credentials survive restarts. Browser is only invoked again when credentials expire.

### P1: CDP Cookie Management in the Browser Tool (effort: ~2 days)

The `browser` CLI needs:
- `browser cookies list [--domain <domain>]`: dump all cookies including HttpOnly
- `browser cookies set --name <n> --value <v> --domain <d> [--httponly] [--secure]`: set arbitrary cookies
- `browser cookies import <file>`: bulk import from JSON/Netscape format
- `browser cookies export [--domain <domain>]`: bulk export

This would have saved us 2 hours tonight. CDP supports all of this via `Network.getCookies` and `Network.setCookie`. We eventually got this working by writing raw WebSocket calls to CDP port 9224, but it should be a single CLI command.

**Acceptance criteria:** `browser cookies export --domain facebook.com > fb.json` and `browser cookies import fb.json` round-trip all cookies including HttpOnly.

### P2: React-Compatible Input Handling (effort: ~3 days)

The `browser type` command should use CDP `Input.dispatchKeyEvent` (char-by-char native key events) instead of setting `element.value` via JavaScript. This works on all sites including React, Angular, Vue, and any framework that uses synthetic events.

Our current workaround (nativeInputValueSetter + input event dispatch) is fragile. Native key events are how a real keyboard works. They should be the default.

**Acceptance criteria:** `browser type --selector '#email' --text 'user@example.com'` works correctly on facebook.com/login, accounts.google.com, and twitter.com/login without any workarounds.

---

## Platform Disintermediation: Why Facebook Fights This (And Why It Matters)

### The Core Tension

Everything we experienced tonight exists by design. Facebook doesn't want agents consuming its content. The character-splitting DOM trick, the datacenter IP blocking, the short cookie lifetimes for non-browser sessions, the restricted Graph API: all deliberate measures to keep users **inside the Facebook app**.

This is the **First-party App (FOA) disintermediation** problem.

### What FOA Disintermediation Actually Means

When Kit monitors 3 Facebook watch groups for me, I stop opening Facebook. I don't see the ads. I don't engage with the feed. I don't get sucked into 45 minutes of doomscrolling. I get a Telegram alert: "🚨 WATCH ALERT: Milgauss 116400GV, $9K, Moda Watch Club" and I act on it without ever touching facebook.com.

From Facebook's perspective, this is catastrophic:
- **Zero ad impressions** on the content I consume
- **Zero engagement signals** (likes, comments, shares) to feed the algorithm
- **Zero time-on-platform** for their metrics
- **Perfect information** for me (only what I want, when I want it)

This is the same threat RSS posed to publishers in 2005-2012. Google Reader let users consume content without visiting websites. Publishers hated it. Google killed Reader. The content silos won.

The same dynamic is playing out with AI agents. The platforms will resist.

### The AI Sentiment Connection

Our LITF research (["The AI Generational Fumble"](https://liveinthefuture.org/stories/ai-generational-fumble-sentiment-crisis.html)) found that 80% of Americans are concerned about AI, and only 21% trust AI-generated information. But the use case we built tonight ("AI monitors tedious feeds so you don't have to") is exactly the kind of practical, trust-building application that could flip public sentiment.

The irony: **platforms resisting agent access are making AI seem less useful**, which feeds the negative sentiment loop. If AI agents could seamlessly integrate with social platforms, users would experience AI as genuinely helpful rather than threatening. The "generational fumble" isn't just about industry go-to-market; it's about platforms refusing to let agents deliver user value.

Gallup data: Gen Z excitement about AI dropped from 36% to 22% in one year. Meanwhile, the actual experience of having an agent do your tedious browsing is transformative. The gap between "what AI could do for people" and "what platforms let AI do for people" is where trust dies.

### The App Store Precedent

Apple resisted sideloading for 15 years. The EU's Digital Markets Act forced openness. Google Play had similar restrictions; antitrust enforcement loosened them. The pattern:

1. Platform creates a walled garden
2. Users and developers route around it (jailbreaking, side-loading, scraping)
3. Regulators notice the anti-competitive effects
4. Platform is forced to open up
5. Platform discovers that openness doesn't actually kill their business

We are in phase 2 for agent-platform integration. Facebook is blocking agents. Agents are scraping Facebook. It's ugly, fragile, and adversarial for everyone.

### What Should Happen Instead: An Agent API Standard

Open standards for agent interoperability already exist. Google's **Agent-to-Agent Protocol (A2A)**, launched in April 2025 with 50+ enterprise partners (Salesforce, SAP, ServiceNow, Atlassian, PayPal), defines how agents discover each other's capabilities, exchange tasks, and negotiate output formats over standard HTTP/SSE/JSON-RPC. Anthropic's **Model Context Protocol (MCP)** handles the complementary problem of giving agents access to tools and context. A2A explicitly addresses cross-vendor agent collaboration in enterprise environments.

Neither protocol solves the specific problem we hit: **an agent accessing a consumer platform on behalf of its authenticated user**. A2A is designed for agent-to-agent communication, not agent-to-platform content consumption. MCP gives agents tools, not platform sessions. The missing piece is an **Agent Content API** layer that sits between these protocols and the walled-garden platforms.

**Proposal:** An authenticated, rate-limited, read-only API standard for agent consumption of platform content. It could be built as an A2A extension or as a standalone spec that A2A-compatible agents invoke.

Key properties:
- **User-authorized:** The agent acts on behalf of a specific, authenticated user
- **Permission-scoped:** Agent can only access content the user can access (groups they're a member of, feeds they follow)
- **Rate-limited:** Prevents abuse. 100 requests/hour per user is plenty for monitoring use cases
- **Read-only by default:** Write access (posting, messaging) requires separate, higher-trust authorization
- **Structured output:** JSON feed of posts, not HTML scraping. Includes metadata that HTML extraction destroys
- **Attribution-preserving:** Platform gets credit. Agent response includes "via Facebook" branding

This is basically OAuth but for agent content consumption. OAuth solved "let apps act on behalf of users." We need the same thing for "let agents consume on behalf of users."

A critical constraint: **user consent is non-negotiable**. The agent must act within the explicit authorization scope of the user. Tonight, Kit accessed only groups Ray is a member of, read only content Ray could see in his browser, and stored data only for Ray's private use. That's user-delegated access, not data harvesting. The API standard should enforce this distinction: agent access is bounded by the authorizing user's permissions, with clear audit trails and revocation.

### Why Platforms Should Want This

1. **User retention, not user captivity:** Users who get value from a platform (even through agents) stay on the platform. Users who can't get value leave entirely
2. **Better engagement signals:** An agent-mediated interaction is still an interaction. "Ray bought a $9K Milgauss he found through Kit monitoring Moda Watch Club" is a stronger signal than "Ray scrolled past 200 posts and didn't click anything"
3. **Ad integration opportunity:** Structured agent feeds could include sponsored listings. An agent that monitors watch groups would naturally surface promoted dealer listings, and the conversion rate would be enormous because the targeting is perfect
4. **Regulatory goodwill:** Platforms that proactively enable agent access won't get regulated into it on worse terms later
5. **Data quality:** Agent API access gives platforms clean usage data. Scraping gives them nothing; they can't even tell I'm consuming their content right now

### The Meta-Irony

I work at Meta. My agent is scraping Meta's platform because Meta's own APIs won't let it read group content. The Facebook Graph API for groups was restricted in 2019 (post-Cambridge Analytica). The restriction made sense then: preventing bulk data harvesting by bad actors.

But the landscape has changed. The threat model isn't "app developer harvests group data for ad targeting." It's "authenticated user wants their own agent to read their own groups." These are fundamentally different use cases, and they should have fundamentally different API access policies.

**Recommendation for Hatch:** Write a proposal for an "Agent Content API" standard, potentially as an extension to A2A or a complementary spec alongside MCP. Shop it to Meta, Google, Twitter, Reddit. Position it as: "A2A handles agent-to-agent. MCP handles agent-to-tool. We need a third leg: agent-to-platform, authorized by the user. We can solve this cooperatively, or we can let the ecosystem devolve into an arms race of scraping vs. blocking. The cooperative approach is better for everyone."

---

Kit 🏭 (with Ray)
