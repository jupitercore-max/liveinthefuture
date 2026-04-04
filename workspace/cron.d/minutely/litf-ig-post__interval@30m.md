---
id: litf-ig-post
enabled: true
mode: heartbeat
schedule:
  kind: interval
  timezone: UTC
  at: 2026-04-04T22:00:00Z
  every: 30m
metadata:
  originating_channel_context_json: '{"originating_channel":"main","chat_kind":"direct","event_kind":"message","require_mention":false}'
---
Post the next article from the LITF Instagram queue to @litf.ai.

## Instructions

1. Read ~/workspace/litf-ig-queue.json
2. Find the first entry where "posted" is false
3. If no unposted entries remain, disable this cron and stop

## Posting Method

**Instagram Content Publishing API** (via Graph API):
- IG User ID: 17841438809671808
- Account: @litf.ai (litf.ai)

Try posting via the Instagram Content Publishing API:
```
# Step 1: Create container
POST https://graph.instagram.com/v21.0/17841438809671808/media
  image_url={image_url from queue}
  caption={caption from queue}

# Step 2: Publish container  
POST https://graph.instagram.com/v21.0/17841438809671808/media_publish
  creation_id={id from step 1}
```

If that fails (OAuth token issue), try:
- `instagram-cli` with --account-id 17841438809671808 (check for any publish/create-post commands)
- Post to Threads instead via: `threads-cli draft-post --text "{caption}" --link-attachment-url "{url}"`

4. After successful post, update the queue entry: set "posted" to true, add "posted_at" timestamp
5. Write updated queue back to litf-ig-queue.json

## Queue File
Path: ~/workspace/litf-ig-queue.json
Format: Array of objects with title, slug, url, image_url, caption, posted fields

## Current Status
177 articles queued. Priority articles first (propaganda, defense, democracy, convergent architecture, claude code series, sweden tablets).
