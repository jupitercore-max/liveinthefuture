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

---

Add whatever helps you do your job. This is your cheat sheet.
