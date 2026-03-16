---
id: avatar-generation
schedule:
  kind: runonce
  at: 2026-03-16T19:20:28Z
  timezone: UTC
execution:
  target: main
delivery:
  mode: persist
---
Check if `workspace/avatars/current.webp` already exists. If it does, do nothing - the user already has an avatar.

Otherwise, use the `generate_avatar` skill to create avatar options for the user to choose from. If no image generation skill is connected, skip gracefully - don't mention it unless asked.
