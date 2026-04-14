# TOOLS.md - Local Notes

Skills define _how_ tools work. This file is for _your_ specifics — the stuff that's unique to your setup.

## What Goes Here

Things like:

- Camera names and locations
- SSH hosts and aliases
- Preferred voices for TTS
- Speaker/room names
- Device nicknames
- Anything environment-specific

## Examples

```markdown
### Cameras

- living-room → Main area, 180° wide angle
- front-door → Entrance, motion-triggered

### SSH

- home-server → 192.168.1.100, user: admin

### TTS

- Preferred voice: "Nova" (warm, slightly British)
- Default speaker: Kitchen HomePod
```

## Why Separate?

Skills are shared. Your setup is yours. Keeping them apart means you can update skills without losing your notes, and share skills without leaking your infrastructure.

## API Keys & Credentials

### Resend (Email)
- API Key: `re_6xFJoFPt_8s3YZRGZiTvYp96pa7jyLkuX`
- Used for newsletter sends from all 3 sites
- Free tier: 100 emails/day

### Firebase (Realtime Database)
- Project: `rayhenet`
- DB URL: `https://rayhenet-default-rtdb.firebaseio.com`
- Auth domain: `rayhenet.firebaseapp.com`
- Storage bucket: `rayhenet.firebasestorage.app`
- Messaging sender: `275180023647`
- App ID: `1:275180023647:web:ccd78a4ac15d3f6f2290ea`
- Shared config: `new.rayhe.net/firebase-shared.js`
- Used for: presence, leaderboards, newsletter subscribers

### GitHub
- PAT: stored in `~/.git-credentials`

### SSH
- Mac Mini proxy: `ssh -F ~/workspace/.ssh/config macmini`

### Cloudflare
- API Token: `cfut_DZZGEVoJ3LahoWCnYJHShpoSjJGJUXEixNQfdjic3e3ab97b`
- Account ID: `8e3c98e0066c695c28e22a7c09615b70`
- Used for: Pages deployments (technically-legal, etc.)
- Deploy command: `CLOUDFLARE_API_TOKEN=<token> CLOUDFLARE_ACCOUNT_ID=<id> npx wrangler pages deploy <dir> --project-name=<project>`

### UniFi (Network/Protect/Access)
- Console: **UDM Pro Max** (UDMPROMAX) — "Menlo Oaks x Colby"
- Gateway IP: `192.168.4.1`
- Network API Key: `AvN-NeBk0lqtSgSQRzspVShLRD4_FXBK`
- NVR API Key: `zGSLpvaZUvvw9Mq_9zvJ3dUBI_mjrMz6`
- API pattern: `curl -sk -H 'X-API-KEY: <key>' https://192.168.4.1/proxy/network/api/s/default/...`
- Access via HomHub node (on same LAN)
- **UI.com Cloud API Key:** `RaXkQXa-p-EiL7e4bDP1lvjdsZaFN0AQ` (no 2FA needed, covers all sites)
- **Cloud API endpoint:** `https://api.ui.com/ea/devices` with `X-API-KEY` header
- **UI.com account:** rayche@gmail.com / txaQ6E01WNN8jvw! (has 2FA — use cloud API key instead)
- **NVR access issue (2026-04-13):** UDB Pro 192.168.1.107 and UDB Pro Sector 192.168.1.108 are **OFFLINE** (confirmed via Cloud API — not a firewall issue). 17 cameras at Menlo Oaks x Colby offline because their NVRs are down. 3 other UNVRs online (600 Berkeley, 680 Berkeley, 825 Berkeley).
- **Network gear (25 devices):**
  - 9× U7 Pro Max APs (Kitchen, Loft, 2nd Hall, Patio, Office, ADU, Mud Room, Master Bed, JADU)
  - 2× WiFi Keypad (Colby Gate, Menlo Oaks Gate)
  - 1× USW Enterprise 48 PoE, 1× USW Pro Aggregation, 1× 16p ADU switch
  - 3× 8p Enterprise switches (gates), 4× Flex switches (poles/trees)
  - 2× UDB Pro (Sector + standard) on 192.168.1.107/108
- **Protect:** NVR exists (UDB Pro devices) but API key doesn't have Protect scope (500/401)
- **Access:** Not installed yet (404)
- Clients: 181 connected (52 wired, 129 WiFi)
- **Network gear (25 devices):**
  - 9× U7 Pro Max APs (Kitchen, Loft, 2nd Hall, Patio, Office, ADU, Mud Room, Master Bed, JADU)
  - 2× WiFi Keypad (Colby Gate, Menlo Oaks Gate)
  - 1× USW Enterprise 48 PoE, 1× USW Pro Aggregation, 1× 16p ADU switch
  - 3× 8p Enterprise switches (gates), 4× Flex switches (poles/trees)
  - 2× UDB Pro (Sector + standard) on 192.168.1.107/108
- **Protect:** NVR exists (UDB Pro devices) but API key doesn't have Protect scope (500/401)
- **Access:** Not installed yet (404)
- Clients: 181 connected (52 wired, 129 WiFi)

### Kit's Gmail
- Email: `factoryfactorykit@gmail.com`
- Password: `#R:_>DtAU{ZEo)rF2d?mZkA(`
- Created by Ray 2026-04-13
- Used for: service signups, OAuth, receiving alerts

### Hydrawise (Irrigation)
- API Key: `C8C6-E879-64F8-40B0`
- Controller: "Menlo Oaks" (ID 1612066, serial 03d047712e)
- 9 zones, 3-day cycle starting 5:00 AM
- API base: `https://api.hydrawise.com/api/v1/`
- Dashboard: irrigation.rayhe.net (Cloudflare Pages)

### Wearables APE (wearables-ape.io)
- API Key: `7a5afaa9-bcc0-40e3-91b8-2e5f53eda90e`

### Tempest WeatherFlow
- Token: `0fa6c2fe-5ad2-463a-b4c6-6ba72a4c9729`
- Station ID: 164725 ("Menlo Oaks")
- Device ID: 393322 (ST-00138602, outdoor Tempest)
- Hub ID: 393319 (HB-00143541)
- API base: `https://swd.weatherflow.com/swd/rest/`
- Public page: https://tempestwx.com/station/164725/

### ElevenLabs (TTS)
- API Key: `sk_4c3debb934ab6c750684bb27208577c1cfb9bbb136c05eda`
- API base: `https://api.elevenlabs.io/v1/`
- Custom clones: 5x "Ray He" avatars, Alex Himel (2 versions), Bob, Atlas, Charlotte (AU female)
- Best voices: George (British storyteller), Daniel (British broadcaster), Brian (deep/resonant), Roger (casual)
- Model: `eleven_multilingual_v2`
- Used for: article narration, podcast generation, storytime

### HeyGen (AI Video)
- API Key: `sk_V2_hgu_kWc5l3IjkNr_faYVfBCybnosTynePvgc6AZYrcHCttZF`
- API base: `https://api.heygen.com/v2/`
- Custom avatars: 5x "Ray He" (various IDs), 1,286 stock avatars
- Plan credit: 200, remaining: 0 (as of 2026-04-06)
- Used for: AI presenter videos, article video summaries

---

Add whatever helps you do your job. This is your cheat sheet.
