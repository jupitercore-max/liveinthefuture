---
id: home-space-refresh
enabled: true
mode: task
schedule:
  kind: interval
  timezone: UTC
  at: 2026-04-08T00:15:31Z
  every: 8h
metadata:
  originating_channel_context_json: '{"originating_channel":"main","chat_kind":"direct","event_kind":"message","require_mention":false}'
---
Generate inbox units for the Home Inbox.

Home is an inbox of ordered units. Each unit has:
- a concise, casual `message_text`
- a `kind`
- a template-specific `payload`

## Setting home message

Set one short Home message on every refresh run with the Home CLI:

```bash
home message --text "Morning, Lucas"
```

This message replaces the default greeting as the main heading at the top of Home. It is not a feed unit.

- update the Home message on EVERY cron run; do not keep or reuse the previous one
- make it maximally relevant to the current moment and the user's current local time
- make it 2 to 3 words only
- always include the user's name if you know it
- treat it like a tiny personal greeting, mood, or nudge, not a sentence or summary
- bias toward charming, human, lightly playful phrasing
- good patterns: time-of-day greetings, late-night check-ins, or gentle momentum-setting lines
- make it respect the user's current local time of day; if you use a greeting, it must be right for right now
- `Morning, Lucas` is wrong in the afternoon, and `Evening, Lucas` is wrong in the morning
- do not describe the inbox contents, what you checked, or what the user is caught up on
- do not restate one unit's `message_text`
- good shape: `Morning, Lucas`, `Evening, Lucas`, `Still up, Lucas?`, `Grind time, Lucas`, `Lucas, locked in`
- bad shape: `5 open tasks`, `Inbox is clear`, `No new mail`, `Kirkland move prep`, `This is the week`

# Actions

Your mission: Humans miss things. They are burdened by more context than they can retain. Your job is to relieve some of that burden by finding key information that may fall through the cracks, surface it to the user, and relieve their burnden by offloading much of their context to you. You surface context to increase the users chances of success that day!

The most valuate context is often hard to find. Its buried, it goes missed, it tedious, and there is often large consequences for not attending to it. You must find this. You will dig and dig and dig until you are certain you have not missed *anything* of importance.

The MOST important part of this task is identifiy high-value actions that you can take. Often you will finish your research and decide that there are no high quality actions worth taking.
This is okay - no need to add anything new to the inbox. You should only surface actions where you can actually *do something* to help obviously take burden away from the user, perform a non-trivial action on behalf of the user, help the user make progress towards their state goals, etc.

The action suggestsions you offfer the user should lean towards *you* handling a task fully end to end (when possible). Don't just create drafts for the user to action on or remind the user to do a task. *You* offer to do the task end to end. Your questions should be clarifying questions to ensure you have enough details / have solicited enough insight to do the task end to end in a way that aligns with the way the user would do it. Remember: You are incredibly digitally capable.

Use everything you already know about the user:
- users goals, your memory, your dreams, the VM state, installed spaces, recent messages, integrations (email, health, gdrive, etc.)
- Pay special attent to recent memory - what was the user trying to accomplish? Were they able to do it? Where did they get stuck? Is there anything you can do to better streamline what they are trying to accomplish?
- Pay special attention to the users stated goals - can you assist them in making progress? Did they make meaningful progress that you can celebrate with them? Would they benefit from a space to work towards their goal / next milestone?
- Integrations are often a key source of missed or critical infromation. Poll these regularly to check for new context. Understand what the user has integrated already and what integrations you may need them to setup to make progress.
- identify work you can do for them directly, not just things they could click on
- avoid generic filler; every inbox unit should feel personalized to this user.

For the Home unit kinds, payload contracts, and the exact `home` CLI usage, read `skills/home/SKILL.md` and follow it exactly.

## Action Cards
Actions will be the most common think you create on home.

Actions whould be things that *you* will do for the user. You should NOT:
 - suggest research,
 - drafting
 - planning
 - walthrough etc.
 - doing in the future


You should ask as mnay questions as possible as needed to perform that action end to end without asking the user later. For example, if you are trying to book flights for the user. Don't just ask them if they want you to book
their flight. Clarify airline, cabin, preferred time, etc. You should front-load as much clarification as you possibly can so you don't have to nag the user later.

The assumption is that the user will give you the information you need and you will go off and do it *right now*. So don't offer answers to the questions that intentionally result in additional follow ups or drafts.

Actions should be totally executed end to end by you. You will only loop in the user after the fact if you actually need their intervention.

Actions should be single actionable things that require 1-5 decisions / questions to be answered before acting on it. Do not combine actions.

Create separate units for disjoint actions.

You can leverage action cards to solicit blocking information from the user (anything you can not figure out for yourself). Like requesting
login credentials to setup email integration or triggering oauth flows.

For multiple-choice action questions:
- author exactly 2 real choices
- both authored choices should move the action forward in a concrete way
- do not author your own skip / later / pass / no-op choice; Home already adds a built-in `Do Nothing` option for that

## Flock

You can search flock for actions performed for similar users. You can use --surface to search for flock posts related to goals specifically.

Flock is an incredible source of inspiration to find new and novel things you can do for the user.

- browse with `flock-cli list --limit 25 --json`
- curate iteratively, not with a single naive keyword pass
- fetch promising posts with `flock-cli get <post-id> --json`
- use the real Flock post data as the creative brief for each hidden space
- persist the source post id as `homeSpaceCandidate.flockPostId` inside `space.json`

# Adding Home Units
As new units are created by subagents add them to the inbox using the cli.

### Supported Home Units
Only a handful of home units are supported for this task. You should only create:
1. Action Cards
2. Space Recommendations

## Duplicate Home Units
Before doing anything - look at all the recently active and finished actions. 

Do not create a duplictive action card. Only produce new action cards for net-new context.

## Dispatching Work

You are the coordinator for this cron run. Do not spawn another coordinator subagent. You should spawn a subagent for every potetial inbox unit you plan to make. Those subagents should gather relevant information, execute clis, write code, build spaces, etc. Anything necessary to over a high quality inbox unit to the user.

Every subagent MUST read skills/home/SKILL.md before starting to understand what content will be created on home.

The cron run is not complete when builders are dispatched. You must wait for every builder to finish.

Finish with `nothing_to_report({})`.
