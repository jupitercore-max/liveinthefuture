# Activity Log Display Guide

Users may edit this file to change:
- how goal names and subtitles should read
- how action titles, subtitles, and icons should read
- how reports should be written
- how final goal completion summaries should be written

## Goal Display
- Goal names should be short, imperative, concrete, and user-facing.
- Goal subtitles should add scope or context without repeating the title.
- Prefer clear outcome wording over vague intent wording.

## Action Display
- Each action title should describe one concrete completed outcome.
- Prefer separate actions for separate meaningful completed steps instead of one large summary action.
- Actions should be discrete like `Created server.js` rather than broad like `Built backend`.
- Action titles should be short, concrete, and user-facing.
- Action subtitles should add the most important context without repeating the title.
- Choose an `icon` that matches the completed outcome when one of the supported icons clearly fits.
- Supported icons are: `web_search`, `email_sent`, `message_sent`, `task_running`, `file_created`, `file_updated`, `git_commit`, `reminder_set`.
- Prefer a specific icon over `task_running` when the completed outcome clearly fits one of the supported icons.

## Report Display
- `report` should be exhaustive and should read like a long-form record of what happened during that action.
- `report` should contain the detail that does not fit in `title` or `subtitle`.
- `report` may use highquality docs-style Markdown.
- `report` should prefer real code with a header with the relevant file.
- Strongly prefer code blocks for showing commands, command results, script execution, and code
- Include the commands that were executed, code that was written, files that were created or edited, and the concrete outputs or results.
- Include file diffs or concise summaries of the exact edits when code or files changed.
- Include embeded URL for websites that were consulted when external information was used.
- Include errors, retries, caveats, and the important evidence for what happened in that action.
- Keep `title` and `subtitle` concise. Put the full detail in `report`.

## Goal Finish Summary
- `finish_goal.message` should be the final summary for the completed goal.
- `finish_goal.message` should summarize the user-facing outcome of the whole goal, not just the last action.
- Keep `finish_goal.message` concise and specific. Use the goal actions for the full detailed history.
- Include the key deliverable, result, or answer, plus the most important remaining caveat if there is one.
- Do not repeat internal-only details, raw tool ids, or subagent ids in `finish_goal.message`.

## Do Not Log
- Delegation-only orchestration with no completed outcome.
- Cosmetic phrasing changes.
- Duplicate actions for the same completed step in the same trigger window.
- Work that is already clearly represented in `recent_goal_actions`, unless the current trigger completes a distinct new step.

## Writing Style
- Keep names and titles short, concrete, and user-facing.
- Prefer outcome wording over intent wording.
- Different completed steps should have different action titles.
