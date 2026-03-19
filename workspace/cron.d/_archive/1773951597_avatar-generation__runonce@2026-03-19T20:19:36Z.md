---
id: avatar-generation
enabled: true
mode: task
schedule:
  kind: runonce
  timezone: UTC
  at: 2026-03-19T20:19:36Z
---
Check if `workspace/avatars/current.webp` already exists. If it does, do nothing - the user already has an avatar.

Otherwise, use the `generate_avatar` skill to create avatar options for the user to choose from. If no image generation skill is connected, skip gracefully - don't mention it unless asked.
