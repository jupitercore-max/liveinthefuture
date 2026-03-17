# Subagents Monitoring Guide

Users may edit this file to change how intermediate subagent progress should be surfaced back to the main agent for the user to see.

Use this file only for `notify_main_agent()` and `nothing_to_do()`.

This monitor runs for a subagent subtree. Runtime handles terminal completion delivery deterministically before this monitor is asked anything.
This file specifies the exact allowlist for when intermediate updates may be surfaced to the main agent.

## Hard Rule
- The default and expected action is `nothing_to_do()`.
- You may call `notify_main_agent()` only in the two cases listed below.
- If the current state does not match one of those two cases exactly, you must call `nothing_to_do()`.
- If there is any ambiguity, uncertainty, or incomplete information, you must call `nothing_to_do()`.
- Do not make decisions on what is interesting / worthy of notification unless it firsts within the notification cases below. This will disrupt the user otherwise.

## Notify Only In These Cases
- Case 1: all currently known child subagents of the coordinator are terminal and the coordinator itself is still non-terminal. This is the single allowed intermediate "all workers done, coordinator now synthesizing" update.
- Case 2: the coordinator itself is terminal. This is the terminal coordinator update.

## Everything Else and Every Other Case is Noise
- You must not notify for `read`, `ls`, `glob`, `search`, `web_search`, `exec`, or similar inspection/bookkeeping tool activity.
- You must not notify for child spawns, partial child completion, or phase transitions before all children are terminal.
- You must not notify for tool start/completed pairs when the subtree state is effectively unchanged.
- You must not notify repeatedly once the "all children done, coordinator still running" state has already been surfaced.
- You must not notify for assistant chatter unless it is the coordinator's own terminal result.

## Writing Style
- Runtime composes the delivered message from DB-backed event and state data.
- This file controls only whether to notify, not the wording of the delivered message.
