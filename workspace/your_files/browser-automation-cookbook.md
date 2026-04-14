# Browser Automation Cookbook

**How to give an AI agent persistent, authenticated web access to any site.**

Built and battle-tested while automating Facebook group monitoring from a cloud server. Every technique here was discovered by running into a wall and finding a way through it. The core insight: **separate the human act of logging in from the agent act of automation.**

---

## Table of Contents

1. [Architecture Overview](#1-architecture-overview)
2. [Persistent Browser Profile](#2-persistent-browser-profile)
3. [Human-in-the-Loop Login (the "Manus Method")](#3-human-in-the-loop-login-the-manus-method)
4. [Cookie Extraction & Injection](#4-cookie-extraction--injection)
5. [React-Compatible Input](#5-react-compatible-input)
6. [Residential IP Proxy via Home Network](#6-residential-ip-proxy-via-home-network)
7. [Case Study: Automating Facebook Groups](#7-case-study-automating-facebook-groups)
8. [Multi-Site Cookie Management](#8-multi-site-cookie-management)
9. [Streaming WebViews (CDP Screencast)](#9-streaming-webviews-cdp-screencast)
10. [Security Considerations](#10-security-considerations)
11. [Implementation Checklist](#11-implementation-checklist)

---

## 1. Architecture Overview

```
┌──────────────────────────────────────────────────────┐
│                   Cloud Server                       │
│                                                      │
│  ┌─────────┐     CDP (port 9224)    ┌────────────┐  │
│  │  Chrome  │◄─────────────────────►│  Agent /    │  │
│  │ Headless │   WebSocket JSON-RPC  │  CLI Tools  │  │
│  │  + Xvfb  │                       └────────────┘  │
│  └────┬─────┘                                        │
│       │  --user-data-dir (symlinked to workspace)    │
│       ▼                                              │
│  ┌─────────────────────┐                             │
│  │ workspace/           │  ◄── Persists across       │
│  │   .browser-profile/  │      container restarts    │
│  │   config/cookies/    │                            │
│  └─────────────────────┘                             │
│       │                                              │
│       │ SSH SOCKS5 tunnel (optional)                 │
│       ▼                                              │
│  ┌──────────┐         ┌──────────────┐              │
│  │ SOCKS    │────────►│ Home Network │              │
│  │ Proxy    │         │ (Mac Mini)   │              │
│  │ :1080    │         │ Residential  │              │
│  └──────────┘         │ IP           │              │
│                       └──────────────┘              │
└──────────────────────────────────────────────────────┘
```

### Components

**Chrome** runs in headless mode with a remote debugging port:

```bash
/opt/google/chrome/chrome \
  --no-sandbox \
  --remote-debugging-port=9224 \
  --disable-dev-shm-usage \
  --user-data-dir=/home/user/.cache/browser \
  --disable-background-networking \
  --disable-default-apps \
  --disable-extensions \
  --disable-sync \
  --disable-translate \
  --no-first-run \
  --use-gl=angle \
  --use-angle=swiftshader \
  --window-size=1920,1080 \
  --disable-blink-features=AutomationControlled
```

Key flags:
- `--remote-debugging-port=9224` — Exposes Chrome DevTools Protocol over WebSocket
- `--user-data-dir` — Where cookies, localStorage, and session data persist
- `--disable-blink-features=AutomationControlled` — Hides `navigator.webdriver` flag that sites check
- `--window-size=1920,1080` — Full desktop viewport even in headless mode

**Chrome DevTools Protocol (CDP)** is the control plane. Everything flows through it:
- Navigation: `Page.navigate`
- Screenshots: `Page.captureScreenshot`
- Mouse input: `Input.dispatchMouseEvent`
- Keyboard input: `Input.dispatchKeyEvent`
- Cookie access: `Network.getAllCookies`, `Network.setCookie`
- JavaScript execution: `Runtime.evaluate`
- Live streaming: `Page.startScreencast`

**Xvfb** provides a virtual X display when Chrome needs to run in GUI mode (required for some rendering features and for visual debugging via VNC/screencast).

```bash
Xvfb :99 -screen 0 1920x1080x24 &
export DISPLAY=:99
```

### CLI Wrapper

A `browser` CLI tool wraps common CDP operations:

```bash
browser navigate --url "https://facebook.com"
browser screenshot --output /tmp/shot.png
browser click --selector "#login-button"
browser type --selector "input[name=email]" --text "user@example.com"
browser evaluate --expression "document.title"
browser get-text    # Extract visible text content
browser elements    # List interactive elements with selectors
browser close       # Kill Chrome
```

### CDP Discovery

Chrome publishes its debug targets at `http://localhost:9224/json`:

```bash
curl -s http://localhost:9224/json | python3 -m json.tool
```

Returns:
```json
[
  {
    "type": "page",
    "title": "Facebook",
    "url": "https://www.facebook.com/",
    "webSocketDebuggerUrl": "ws://localhost:9224/devtools/page/ABC123..."
  }
]
```

The `webSocketDebuggerUrl` is what you connect to for CDP commands.

---

## 2. Persistent Browser Profile

### The Problem

Chrome's `--user-data-dir` typically points to a cache directory (e.g., `~/.cache/browser/`) that gets **wiped on container restart**. Every restart means every login session is lost. Cookies, localStorage, IndexedDB, saved passwords — all gone.

### The Solution

Symlink the browser profile directory to persistent storage:

```bash
# 1. Stop Chrome
browser close
pkill -f chrome
sleep 2

# 2. Copy current profile to persistent workspace
mkdir -p ~/workspace/.browser-profile
cp -a ~/.cache/browser/* ~/workspace/.browser-profile/

# 3. Replace cache dir with symlink
rm -rf ~/.cache/browser
ln -s /home/user/workspace/.browser-profile /home/user/.cache/browser

# 4. Verify
ls -la ~/.cache/ | grep browser
# browser -> /home/user/workspace/.browser-profile
```

### Boot Restore Script

On container restart, `~/.cache/` may be recreated empty. This script recreates the symlink:

```bash
#!/bin/bash
# scripts/restore-browser-profile.sh
# Run this on every container start

if [ -d "/home/user/workspace/.browser-profile" ] && [ ! -L "/home/user/.cache/browser" ]; then
    mkdir -p /home/user/.cache
    rm -rf /home/user/.cache/browser 2>/dev/null
    ln -s /home/user/workspace/.browser-profile /home/user/.cache/browser
    echo "Browser profile symlink restored"
fi
```

Make it executable: `chmod +x scripts/restore-browser-profile.sh`

### What Persists

After this setup, all Chrome data survives restarts:

| Data | Location in Profile | Typical Lifetime |
|------|-------------------|-----------------|
| Session cookies (`xs`, `c_user`) | `Default/Cookies` (SQLite) | 1 year (Facebook) |
| localStorage | `Default/Local Storage/` | Indefinite |
| IndexedDB | `Default/IndexedDB/` | Indefinite |
| Saved form data | `Default/Web Data` | Indefinite |
| Cache | `Default/Cache/` | Until evicted |

### Profile Size Management

Profiles grow over time (ours is ~300MB after a month). To keep it manageable:

```bash
# Clear cache but keep cookies and session data
rm -rf ~/workspace/.browser-profile/Default/Cache/*
rm -rf ~/workspace/.browser-profile/Default/Code\ Cache/*
rm -rf ~/workspace/.browser-profile/Default/Service\ Worker/CacheStorage/*
```

---

## 3. Human-in-the-Loop Login (the "Manus Method")

### The Problem

Modern sites use layered authentication that headless automation can't solve:
- **2FA** — SMS codes, authenticator apps, hardware keys
- **CAPTCHAs** — reCAPTCHA, hCAPTCHA, Cloudflare challenges
- **Risk-based challenges** — "Is this you?" prompts, device verification
- **Browser fingerprinting** — Sites detect headless Chrome and block it

You can't automate through Facebook's login flow. You shouldn't even try.

### The Insight

**Separate authentication from automation.**

The human logs in once, visually, through the real browser. The agent takes over afterward using the authenticated session. Authentication is the one step that requires human judgment. Everything after it is deterministic.

### How It Works: Remote Browser

Build a web UI that gives the human a live view of the headless Chrome:

```
┌──────────────────┐          ┌──────────────────┐
│  Human's Phone   │          │  Cloud Server     │
│  or Laptop       │          │                   │
│                  │  HTTPS   │  ┌─────────────┐  │
│  ┌────────────┐  │◄────────►│  │ Remote      │  │
│  │ Remote     │  │          │  │ Browser     │  │
│  │ Browser UI │  │  click   │  │ Backend     │  │
│  │            │──┼─────────►│  │             │  │
│  │ <img>      │  │          │  │ CDP calls   │  │
│  │ screenshot │  │ base64   │  │  ▼          │  │
│  │ (500ms     │◄─┼──────────│  │ Chrome      │  │
│  │  refresh)  │  │  jpeg    │  │ :9224       │  │
│  └────────────┘  │          │  └─────────────┘  │
└──────────────────┘          └──────────────────┘
```

**Backend Actions (Python, using CDP directly):**

#### Screenshot (every 500ms)

```python
async def screenshot():
    result = await cdp_call(
        "Page.captureScreenshot",
        {"format": "jpeg", "quality": 60},
    )
    return result["data"]  # base64-encoded JPEG
```

#### Click (at viewport coordinates)

```python
async def click(x: int, y: int):
    await cdp_multi([
        ("Input.dispatchMouseEvent", {
            "type": "mousePressed",
            "x": x, "y": y,
            "button": "left", "clickCount": 1,
        }),
        ("Input.dispatchMouseEvent", {
            "type": "mouseReleased",
            "x": x, "y": y,
            "button": "left", "clickCount": 1,
        }),
    ])
```

#### Type (character by character, works on React sites)

```python
async def type_text(text: str):
    for char in text:
        await send_cdp("Input.dispatchKeyEvent", {
            "type": "keyDown",
            "text": char,
            "key": char,
            "unmodifiedText": char,
        })
        await send_cdp("Input.dispatchKeyEvent", {
            "type": "keyUp",
            "key": char,
        })
```

#### Navigate

```python
async def navigate(url: str):
    await cdp_call("Page.navigate", {"url": url})
    await asyncio.sleep(2)  # Wait for page load
```

**Frontend (React/vanilla JS):**

```javascript
// Poll screenshots
setInterval(async () => {
  const res = await fetch('/api/screenshot');
  const { image_base64, url, title } = await res.json();
  document.getElementById('viewport').src = 
    `data:image/jpeg;base64,${image_base64}`;
}, 500);

// Forward clicks
document.getElementById('viewport').addEventListener('click', async (e) => {
  const rect = e.target.getBoundingClientRect();
  const scaleX = 1920 / rect.width;
  const scaleY = 1080 / rect.height;
  await fetch('/api/click', {
    method: 'POST',
    body: JSON.stringify({
      x: Math.round(e.offsetX * scaleX),
      y: Math.round(e.offsetY * scaleY),
    }),
  });
});
```

### The Flow

1. Agent navigates Chrome to `https://facebook.com/login`
2. Human opens the Remote Browser UI
3. Human sees the Facebook login page rendered as JPEG frames
4. Human clicks the email field (click forwarded via CDP), types password
5. Facebook sends 2FA code to human's phone
6. Human types the 2FA code through the Remote Browser
7. Facebook grants the session — cookies are now in Chrome's profile
8. Human closes the Remote Browser
9. Agent uses the authenticated browser for all subsequent automation

**The human spends 30 seconds logging in. The agent has access for up to a year.**

---

## 4. Cookie Extraction & Injection

### Extracting ALL Cookies (including HttpOnly)

The critical cookies for most sites (Facebook's `xs`, `c_user`, `fr`, `datr`) are **HttpOnly**, meaning `document.cookie` in JavaScript can't see them. CDP has no such restriction:

```python
# Get ALL cookies for the current browser context
result = await cdp_call("Network.getAllCookies")
cookies = result["cookies"]

# Each cookie object:
# {
#   "name": "xs",
#   "value": "156%3ACNtcDbQaCm4WNw%3A2%3A...",
#   "domain": ".facebook.com",
#   "path": "/",
#   "expires": 1808002717.123,
#   "httpOnly": true,          # <-- invisible to JS, visible to CDP
#   "secure": true,
#   "sameSite": "None"
# }
```

**From the CLI:**

```bash
# Navigate to the target site first
browser navigate --url "https://www.facebook.com"

# Extract via evaluate using CDP directly (not JS document.cookie)
python3 -c "
import json, urllib.request, asyncio, websockets

async def get_cookies():
    resp = urllib.request.urlopen('http://localhost:9224/json')
    targets = json.loads(resp.read())
    page = next(t for t in targets if t['type'] == 'page')
    async with websockets.connect(page['webSocketDebuggerUrl']) as ws:
        await ws.send(json.dumps({'id': 1, 'method': 'Network.getAllCookies'}))
        while True:
            data = json.loads(await ws.recv())
            if data.get('id') == 1:
                for c in data['result']['cookies']:
                    print(f\"{c['name']}={c['value']} (expires: {c.get('expires', 'session')}, httpOnly: {c.get('httpOnly', False)})\")
                break

asyncio.run(get_cookies())
"
```

### Injecting Cookies

Restore cookies into a fresh browser session:

```python
async def inject_cookie(name, value, domain, path="/", httpOnly=True, secure=True):
    await cdp_call("Network.setCookie", {
        "name": name,
        "value": value,
        "domain": domain,
        "path": path,
        "httpOnly": httpOnly,
        "secure": secure,
        "sameSite": "None",
    })
```

### Saving Cookies to File

```python
import json

# Extract
result = await cdp_call("Network.getAllCookies")
cookies = result["cookies"]

# Save
with open("config/cookies-facebook.json", "w") as f:
    json.dump(cookies, f, indent=2)

# Later, restore
with open("config/cookies-facebook.json") as f:
    cookies = json.load(f)
for c in cookies:
    await cdp_call("Network.setCookie", c)
```

### Converting to curl Format

For use with curl/wget (only works if the target site doesn't fingerprint the browser):

```python
cookie_string = "; ".join(f"{c['name']}={c['value']}" for c in cookies)
# Use: curl -b "cookie_string" https://...
```

### Limitations

**Cookie injection doesn't always restore a session.** Facebook in particular ties sessions to:
- Browser fingerprint (User-Agent, viewport, WebGL renderer, etc.)
- IP address at login time
- TLS fingerprint (JA3/JA4 hash)

Cookies extracted via CDP and injected into curl from a different IP will often get rejected. **The most reliable path is always using the same browser instance that created the session.**

---

## 5. React-Compatible Input

### The Problem

React (and other virtual DOM frameworks) intercept native DOM events. If you set an input's value directly, React's state doesn't update:

```javascript
// THIS DOES NOT WORK on React sites
document.querySelector('input[name=email]').value = 'user@example.com';
// The input visually shows the text, but React's internal state is empty.
// Clicking "Submit" sends an empty form.
```

### Solution 1: Native Input Value Setter (JS-level hack)

Force React to recognize the value change by using the native setter and dispatching synthetic events:

```javascript
const el = document.querySelector('input[name=email]');

// Use the native HTMLInputElement setter (bypasses React's override)
const nativeSetter = Object.getOwnPropertyDescriptor(
  window.HTMLInputElement.prototype, 'value'
).set;
nativeSetter.call(el, 'user@example.com');

// Dispatch events that React listens for
el.dispatchEvent(new Event('input', { bubbles: true }));
el.dispatchEvent(new Event('change', { bubbles: true }));
```

This works in `browser evaluate` or via CDP `Runtime.evaluate`.

### Solution 2: CDP Keyboard Events (better)

CDP `Input.dispatchKeyEvent` fires at the browser level, before React's event system even sees it. React picks up every keystroke naturally because it looks like a real human typing:

```python
async def type_into_focused_element(ws, text):
    """Type text character by character via CDP. Works on ALL sites."""
    msg_id = 1
    for char in text:
        # keyDown with the character
        await ws.send(json.dumps({
            "id": msg_id,
            "method": "Input.dispatchKeyEvent",
            "params": {
                "type": "keyDown",
                "text": char,
                "key": char,
                "unmodifiedText": char,
            }
        }))
        await wait_for_response(ws, msg_id)
        msg_id += 1
        
        # keyUp
        await ws.send(json.dumps({
            "id": msg_id,
            "method": "Input.dispatchKeyEvent",
            "params": {
                "type": "keyUp",
                "key": char,
            }
        }))
        await wait_for_response(ws, msg_id)
        msg_id += 1
```

**CDP keyboard events are the gold standard.** They work on:
- React (Facebook, Instagram, Threads)
- Angular (Google properties)
- Vue (many modern SPAs)
- Any custom input handler
- Shadow DOM components
- contentEditable divs

### Special Keys

For Enter, Tab, Escape, Backspace, arrows:

```python
SPECIAL_KEYS = {
    "Enter":     {"key": "Enter",     "code": "Enter",     "windowsVirtualKeyCode": 13},
    "Tab":       {"key": "Tab",       "code": "Tab",       "windowsVirtualKeyCode": 9},
    "Escape":    {"key": "Escape",    "code": "Escape",    "windowsVirtualKeyCode": 27},
    "Backspace": {"key": "Backspace", "code": "Backspace", "windowsVirtualKeyCode": 8},
    "ArrowUp":   {"key": "ArrowUp",   "code": "ArrowUp",   "windowsVirtualKeyCode": 38},
    "ArrowDown": {"key": "ArrowDown", "code": "ArrowDown", "windowsVirtualKeyCode": 40},
}

async def press_key(ws, key_name):
    params = SPECIAL_KEYS[key_name]
    await send_cdp(ws, "Input.dispatchKeyEvent", {"type": "keyDown", **params})
    await send_cdp(ws, "Input.dispatchKeyEvent", {"type": "keyUp", **params})
```

### Clearing a Field Before Typing

```python
# Ctrl+A then Backspace
await send_cdp(ws, "Input.dispatchKeyEvent", {
    "type": "keyDown", "key": "a", "code": "KeyA",
    "windowsVirtualKeyCode": 65, "modifiers": 2,  # 2 = Ctrl
})
await send_cdp(ws, "Input.dispatchKeyEvent", {"type": "keyUp", "key": "a", "code": "KeyA"})
await send_cdp(ws, "Input.dispatchKeyEvent", {
    "type": "keyDown", "key": "Backspace", "code": "Backspace",
    "windowsVirtualKeyCode": 8,
})
await send_cdp(ws, "Input.dispatchKeyEvent", {"type": "keyUp", "key": "Backspace", "code": "Backspace"})
```

---

## 6. Residential IP Proxy via Home Network

### The Problem

Cloud server IPs come from known datacenter ranges. Sites like Facebook, X, and Google flag them:
- Login attempts from cloud IPs trigger extra verification
- Account creation may be blocked entirely
- Scraping gets rate-limited faster
- Some content is different (reduced feed, more CAPTCHAs)

### The Solution: SSH SOCKS5 Proxy

If you have a machine on a home network (residential IP), tunnel Chrome's traffic through it:

```bash
# Start a SOCKS5 proxy on localhost:1080, tunneled through your home machine
ssh -D 1080 -f -N -F ~/.ssh/config home-machine

# Verify it works
curl --socks5 localhost:1080 https://httpbin.org/ip
# Should return your home IP, not the cloud server IP
```

**SSH config example (`~/.ssh/config`):**

```
Host home-machine
    HostName mymachine.example.com
    User myuser
    IdentityFile ~/.ssh/my_key
    StrictHostKeyChecking no
```

### Routing Chrome Through the Proxy

**Option A: Launch Chrome with proxy flag**

```bash
# Kill existing Chrome
pkill -f chrome
sleep 2

# Relaunch with SOCKS proxy
/opt/google/chrome/chrome \
  --no-sandbox \
  --remote-debugging-port=9224 \
  --proxy-server=socks5://localhost:1080 \
  --user-data-dir=/home/user/.cache/browser \
  --window-size=1920,1080 \
  --disable-blink-features=AutomationControlled &
```

**Option B: Use the home machine's browser directly**

If the home machine has a browser tool with a proxy capability, you can execute browser commands on it remotely:

```bash
# SSH to home machine and run curl with cookies
ssh home-machine "curl -b 'xs=TOKEN; c_user=ID' \
  -H 'User-Agent: Mozilla/5.0...' \
  'https://www.facebook.com/groups/12345'"
```

### When to Use Residential IP

| Action | Cloud IP OK? | Need Residential? |
|--------|-------------|-------------------|
| Browsing while logged in | ✅ Usually | Only if blocked |
| Login attempt | ⚠️ Risky | ✅ Recommended |
| Account creation | ❌ Blocked | ✅ Required |
| Heavy scraping | ⚠️ Rate-limited | ✅ Recommended |
| Normal API calls | ✅ Fine | No |

### Verifying the Proxy Works

```bash
# From Chrome, check what IP Facebook sees
browser navigate --url "https://www.facebook.com"
browser evaluate --expression "fetch('https://httpbin.org/ip').then(r=>r.text())"
```

---

## 7. Case Study: Automating Facebook Groups

This is the real-world scenario that drove every technique in this guide. The goal: monitor 3 private Facebook watch-trading groups every 30 minutes, parse listings, match against a watchlist, and alert on hits.

### What We Tried (and What Failed)

#### Attempt 1: Facebook Graph API
**Result: Dead end.** Facebook's Graph API no longer exposes group post content for third-party apps. Deprecated in 2018.

#### Attempt 2: curl with cookies from Chrome DevTools
```bash
# Copy cookies from Chrome DevTools Network tab
curl 'https://www.facebook.com/groups/12345' \
  -b 'datr=...; xs=...; c_user=...; fr=...' \
  -H 'User-Agent: Mozilla/5.0...'
```
**Result: Works for ~3 hours**, then cookies expire or get invalidated. Facebook rotates the `fr` cookie and checks browser fingerprint consistency. Also, the HTML returned is the initial server-rendered shell — most posts load via JavaScript after page load.

#### Attempt 3: Headless browser login automation
```bash
browser navigate --url "https://facebook.com/login"
browser type --selector "input[name=email]" --text "user@email.com"
browser type --selector "input[name=pass]" --text "password"
browser click --selector "button[name=login]"
```
**Result: Password rejected from cloud IP.** Facebook flags the datacenter IP and demands additional verification. Even with correct credentials.

#### Attempt 4: Headless browser via residential IP proxy
Same as Attempt 3 but with `--proxy-server=socks5://localhost:1080` routing through a home machine.
**Result: Password accepted, but 2FA blocks the agent.** Can't automate through SMS verification.

#### Attempt 5: Human-in-the-Loop (the winning approach)

1. Build a Remote Browser UI (screenshot streaming + click/type forwarding)
2. Human opens the UI, navigates to Facebook, logs in with 2FA
3. Cookies persist in the browser profile
4. Agent navigates to group URLs and extracts content

**Result: Full access. Session lasts up to 1 year.** This is the approach that stuck.

### The Extraction Pattern

Facebook fragments text as an anti-scraping measure (individual characters in separate spans). But `innerText` reassembles it:

```javascript
// Extract posts from a Facebook group feed
(() => {
    window.scrollTo(0, 5000); // Trigger lazy loading
    
    const feed = document.querySelector('[role="feed"]') || document.body;
    const posts = feed.querySelectorAll('[role="article"]');
    const results = [];
    
    posts.forEach(p => {
        results.push(p.innerText.substring(0, 1500));
    });
    
    const feedText = feed.innerText.substring(0, 20000);
    return JSON.stringify({ posts: results, feedText: feedText });
})()
```

**Usage:**
```bash
browser navigate --url "https://www.facebook.com/groups/12345"
sleep 3  # Wait for JS rendering
browser evaluate --expression '<the JS above>'
```

### Auth Failure Detection

If the session expires, Facebook redirects to login. Detect this:

```bash
TITLE=$(browser info | jq -r '.title')
if [[ "$TITLE" == *"Log"* ]] || [[ "$TITLE" == *"Error"* ]]; then
    echo "Session expired! Notify human to re-login."
    exit 1
fi
```

### The Cron Job

Runs every 30 minutes:

1. For each of the 3 group URLs:
   - `browser navigate --url <group_url>`
   - Wait 3 seconds for JS rendering
   - `browser evaluate` to extract post text
   - Check for auth failure (redirect to login page)
2. Parse extracted text for:
   - Price patterns: `$XX,XXX` or `asking $XX,XXX`
   - Brand/model/reference numbers (80+ brands)
   - Condition (mint, excellent, good)
   - Box/papers status
   - SOLD/OHPF markers
3. Match against target watchlist (specific reference numbers)
4. If match found: alert on Telegram + main chat
5. Append all listings to a price database JSON file
6. Track seen posts to avoid duplicate alerts

### The Snapshot Rule

Critical for price data integrity: listings change to "SOLD" or "$old" after selling, destroying the original asking price. **Always capture the full listing on first sight:**

```python
# When seeing a listing for the first time
record = {
    "id": generate_id(seller, ref, price),
    "firstSeenDate": now(),
    "lastSeenDate": now(),
    "askingPrice": price,        # Original asking price
    "soldStatus": "active",
    "originalPostSnippet": text,  # Full original text
    # ... other fields
}

# When we see the same listing later as SOLD
existing["soldStatus"] = "SOLD"
existing["soldDate"] = now()
existing["lastSeenDate"] = now()
# DO NOT overwrite askingPrice or originalPostSnippet
```

---

## 8. Multi-Site Cookie Management

### Per-Domain Cookie Files

```
config/
  cookies-facebook.json    # Facebook session
  cookies-twitter.json     # X/Twitter session (if logged in)
  cookies-google.json      # Google session
  fb-cookies.txt           # curl-format fallback
```

### CDP Extraction After Login

After a successful human login to any site:

```python
import json

async def save_cookies_for_domain(domain, filepath):
    result = await cdp_call("Network.getAllCookies")
    domain_cookies = [
        c for c in result["cookies"]
        if domain in c.get("domain", "")
    ]
    with open(filepath, "w") as f:
        json.dump(domain_cookies, f, indent=2)
    
    # Log expiry dates
    for c in domain_cookies:
        if c.get("expires", 0) > 0:
            from datetime import datetime
            exp = datetime.fromtimestamp(c["expires"])
            print(f"  {c['name']}: expires {exp.isoformat()}")
```

### Expiry Monitoring

Check cookie freshness on a schedule:

```python
import time, json

def check_cookie_health(filepath, domain):
    with open(filepath) as f:
        cookies = json.load(f)
    
    now = time.time()
    warnings = []
    
    for c in cookies:
        expires = c.get("expires", 0)
        if expires > 0:
            days_remaining = (expires - now) / 86400
            if days_remaining < 7:
                warnings.append(f"{c['name']} expires in {days_remaining:.0f} days")
            elif days_remaining < 0:
                warnings.append(f"{c['name']} EXPIRED {-days_remaining:.0f} days ago")
    
    return warnings
```

### Re-Authentication Flow

When cookies expire:

1. Agent detects auth failure (page redirects to login, empty content, etc.)
2. Agent sends alert: "Facebook session expired. Please log in via Remote Browser."
3. Human opens Remote Browser, logs in (30 seconds)
4. Agent extracts and saves fresh cookies via CDP
5. Automation resumes

The key insight: **this should be a rare event** (once every few months with persistent profile), not a daily chore. If you're re-logging in weekly, something is wrong with your profile persistence.

---

## 9. Streaming WebViews (CDP Screencast)

### Page.startScreencast

CDP's native streaming API. More efficient than polling `Page.captureScreenshot`:

```python
import json, asyncio, websockets

async def stream_frames():
    ws_url = await get_page_ws_url()
    async with websockets.connect(ws_url, max_size=50 * 1024 * 1024) as ws:
        # Start screencast
        await ws.send(json.dumps({
            "id": 1,
            "method": "Page.startScreencast",
            "params": {
                "format": "jpeg",
                "quality": 60,
                "maxWidth": 1280,
                "maxHeight": 720,
                "everyNthFrame": 2,  # Skip frames for performance
            }
        }))
        
        while True:
            raw = await ws.recv()
            data = json.loads(raw)
            
            if data.get("method") == "Page.screencastFrame":
                frame = data["params"]
                image_data = frame["data"]  # base64 JPEG
                session_id = frame["sessionId"]
                
                # MUST acknowledge each frame or Chrome stops sending
                await ws.send(json.dumps({
                    "id": 2,
                    "method": "Page.screencastFrameAck",
                    "params": {"sessionId": session_id}
                }))
                
                yield image_data  # base64 JPEG frame
```

### Architecture for Real-Time Streaming

```
Chrome CDP ──► Page.screencastFrame events
                    │
                    ▼
           Python WebSocket Server
                    │
                    ▼ (forward base64 frames)
           Browser WebSocket Client
                    │
                    ▼
           <canvas> or <img> element
                    │
           click/key events ──► CDP Input.dispatch*
```

### Comparison: Polling vs Screencast

| Approach | Latency | Bandwidth | Complexity |
|----------|---------|-----------|------------|
| Poll `captureScreenshot` every 500ms | ~700ms | ~120KB/frame | Low |
| `Page.startScreencast` | ~100ms | ~80KB/frame | Medium |
| Xvfb + x11vnc + noVNC | ~50ms | Variable | High |

For most use cases (login, debugging), polling at 500ms is fine. Screencast is better for real-time monitoring. Full VNC gives the best experience but requires installing additional packages.

---

## 10. Security Considerations

### Cookie Security

Session cookies are equivalent to passwords. Treat them accordingly:

- **Store in persistent workspace only** (not in `/tmp` or logs)
- **Never echo cookie values in chat or log output**
- **HttpOnly cookies are hidden from page JavaScript by design** — this is a browser security feature, not a bug
- **Encrypt at rest** if your workspace supports it
- **Rotate credentials** when you suspect compromise

### What an Attacker Could Do with Your Cookies

If someone gets your Facebook `xs` + `c_user` cookies:
- Full access to your Facebook account (read messages, post, change settings)
- No password or 2FA needed
- Access persists until you change your password or the cookie expires

### API Key Exposure

If you store API keys in workspace files (common for automation), be aware:
- Browser profile persistence means anyone with workspace access has cookie access
- Skills/plugins that read workspace files could exfiltrate cookies
- Always audit what code runs in your workspace

### Mitigations

1. **Minimize stored credentials** — only save cookies for sites you actively automate
2. **Monitor for unauthorized access** — check Facebook's "Where you're logged in" periodically
3. **Use scoped API keys** — prefer keys with minimal permissions
4. **Alert on cookie expiry** — if cookies expire unexpectedly, investigate (could indicate forced logout)
5. **Separate browser profiles** — use different `--user-data-dir` for different trust levels

---

## 11. Implementation Checklist

### Prerequisites

- [ ] Chrome or Chromium installed with remote debugging support
- [ ] Xvfb installed (for virtual display): `apt install xvfb`
- [ ] Python 3.9+ with `websockets` package: `pip install websockets`
- [ ] Persistent storage directory that survives restarts
- [ ] (Optional) SSH access to a residential IP machine for proxy
- [ ] (Optional) Web server/framework for Remote Browser UI

### Step-by-Step Setup

```bash
# 1. Start virtual display
Xvfb :99 -screen 0 1920x1080x24 &
export DISPLAY=:99

# 2. Create persistent profile directory
mkdir -p /path/to/persistent/browser-profile

# 3. Start Chrome
/path/to/chrome \
  --no-sandbox \
  --remote-debugging-port=9224 \
  --user-data-dir=/path/to/persistent/browser-profile \
  --window-size=1920,1080 \
  --disable-blink-features=AutomationControlled &

# 4. Verify CDP is accessible
curl -s http://localhost:9224/json | python3 -m json.tool

# 5. Navigate to target site
# (via your browser CLI or direct CDP)
python3 -c "
import json, asyncio, websockets, urllib.request

async def navigate(url):
    resp = urllib.request.urlopen('http://localhost:9224/json')
    targets = json.loads(resp.read())
    page = next(t for t in targets if t['type'] == 'page')
    async with websockets.connect(page['webSocketDebuggerUrl']) as ws:
        await ws.send(json.dumps({
            'id': 1, 'method': 'Page.navigate',
            'params': {'url': url}
        }))
        print(await ws.recv())

asyncio.run(navigate('https://facebook.com'))
"

# 6. Set up human login UI (or have human log in via VNC/screencast)
# 7. After login, extract and save cookies
# 8. Set up cron for periodic scraping
# 9. Set up auth failure detection and human re-login alerts
```

### Common Failure Modes

| Symptom | Cause | Fix |
|---------|-------|-----|
| "No page target found" | Chrome not running or wrong port | Check `ps aux \| grep chrome`, verify `--remote-debugging-port` |
| Screenshot is blank/black | Page hasn't loaded, or Xvfb not running | Add `sleep 3` after navigate, check `DISPLAY` env var |
| React input not working | Using `el.value =` instead of CDP events | Use `Input.dispatchKeyEvent` (Section 5) |
| Cookies rejected by curl | IP/fingerprint mismatch | Use same browser instance, or route through residential proxy |
| Session expires on restart | Profile in volatile directory | Symlink to persistent storage (Section 2) |
| Login blocked from cloud IP | Datacenter IP flagged | Use SOCKS5 proxy through residential IP (Section 6) |
| "Expected ref to be a function" | React 19 + recharts `Cell` component | Remove `Cell` components, use `fill` prop on data entries |
| Facebook returns fragmented text | Anti-scraping: chars in separate spans | Use `innerText` which reassembles them |
| 2FA blocks automated login | Can't automate 2FA codes | Use Human-in-the-Loop (Section 3) |

### The CDP Helper Library

Copy this into your project as `lib/cdp.py`:

```python
"""Shared CDP (Chrome DevTools Protocol) helper."""

import json
import asyncio
import urllib.request
from typing import Any

import websockets

CDP_PORT = 9224


async def get_page_ws_url() -> str:
    """Get the WebSocket URL for the first page target."""
    resp = urllib.request.urlopen(f"http://localhost:{CDP_PORT}/json")
    targets = json.loads(resp.read())
    page = next((t for t in targets if t["type"] == "page"), None)
    if not page:
        raise RuntimeError("No page target found in Chrome")
    return page["webSocketDebuggerUrl"]


async def cdp_call(
    method: str,
    params: dict[str, Any] | None = None,
    timeout: float = 15.0,
) -> dict[str, Any]:
    """Make a single CDP call and return the result."""
    ws_url = await get_page_ws_url()
    async with websockets.connect(ws_url, max_size=50 * 1024 * 1024) as ws:
        msg: dict[str, Any] = {"id": 1, "method": method}
        if params:
            msg["params"] = params
        await ws.send(json.dumps(msg))
        deadline = asyncio.get_event_loop().time() + timeout
        while True:
            remaining = deadline - asyncio.get_event_loop().time()
            if remaining <= 0:
                raise TimeoutError(f"CDP call {method} timed out")
            raw = await asyncio.wait_for(ws.recv(), timeout=remaining)
            data = json.loads(raw)
            if data.get("id") == 1:
                if "error" in data:
                    raise RuntimeError(
                        f"CDP error: {data['error'].get('message', str(data['error']))}"
                    )
                return data.get("result", {})


async def cdp_multi(
    calls: list[tuple[str, dict[str, Any] | None]],
    timeout: float = 15.0,
) -> list[dict[str, Any]]:
    """Make multiple sequential CDP calls on one connection."""
    ws_url = await get_page_ws_url()
    results: list[dict[str, Any]] = []
    async with websockets.connect(ws_url, max_size=50 * 1024 * 1024) as ws:
        for idx, (method, params) in enumerate(calls, start=1):
            msg: dict[str, Any] = {"id": idx, "method": method}
            if params:
                msg["params"] = params
            await ws.send(json.dumps(msg))
            deadline = asyncio.get_event_loop().time() + timeout
            while True:
                remaining = deadline - asyncio.get_event_loop().time()
                if remaining <= 0:
                    raise TimeoutError(f"CDP call {method} timed out")
                raw = await asyncio.wait_for(ws.recv(), timeout=remaining)
                data = json.loads(raw)
                if data.get("id") == idx:
                    if "error" in data:
                        raise RuntimeError(
                            f"CDP error in {method}: "
                            f"{data['error'].get('message', str(data['error']))}"
                        )
                    results.append(data.get("result", {}))
                    break
    return results


async def get_page_info() -> tuple[str, str]:
    """Get current page URL and title."""
    ws_url = await get_page_ws_url()
    async with websockets.connect(ws_url, max_size=50 * 1024 * 1024) as ws:
        await ws.send(json.dumps({
            "id": 1,
            "method": "Runtime.evaluate",
            "params": {
                "expression": "JSON.stringify({url: location.href, title: document.title})"
            },
        }))
        deadline = asyncio.get_event_loop().time() + 5
        while True:
            remaining = deadline - asyncio.get_event_loop().time()
            if remaining <= 0:
                return ("", "")
            raw = await asyncio.wait_for(ws.recv(), timeout=remaining)
            data = json.loads(raw)
            if data.get("id") == 1:
                try:
                    val = json.loads(data["result"]["result"]["value"])
                    return (val.get("url", ""), val.get("title", ""))
                except Exception:
                    return ("", "")
```

---

## Appendix: CDP Command Reference

Quick reference for the most-used CDP methods:

| Method | Purpose | Key Params |
|--------|---------|-----------|
| `Page.navigate` | Go to URL | `{url: "https://..."}` |
| `Page.captureScreenshot` | Take screenshot | `{format: "jpeg", quality: 60}` |
| `Page.startScreencast` | Stream frames | `{format: "jpeg", quality: 60, maxWidth: 1280}` |
| `Page.screencastFrameAck` | Acknowledge frame | `{sessionId: "..."}` |
| `Input.dispatchMouseEvent` | Mouse click/move | `{type: "mousePressed", x, y, button: "left"}` |
| `Input.dispatchKeyEvent` | Keyboard input | `{type: "keyDown", text: "a", key: "a"}` |
| `Runtime.evaluate` | Run JavaScript | `{expression: "document.title"}` |
| `Network.getAllCookies` | Get all cookies | `{}` |
| `Network.setCookie` | Set a cookie | `{name, value, domain, path, httpOnly, secure}` |
| `Network.deleteCookies` | Delete cookies | `{name, domain}` |
| `DOM.getDocument` | Get DOM tree | `{}` |
| `Emulation.setDeviceMetricsOverride` | Change viewport | `{width, height, deviceScaleFactor}` |

Full CDP documentation: https://chromedevtools.github.io/devtools-protocol/

---

*Written by Kit (FactoryFactory), April 2026. Built while trying to monitor watch prices on Facebook groups and discovering that every modern website really, really doesn't want you to automate anything.*
