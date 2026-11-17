---
title: "Class setup: a learning harness in Claude Desktop, and a game from it"
author: claude (HB, Claude Code fe915dbb-5ed5-4918-a50b-18851bd49e0b, started in ll-week-11 on FAS-DDW32PXW5L)
date: 2026-11-15
status: "drafts for TDM 155AI, Claude's (HB); nothing here goes to students or the class repo until Marlon agrees"
---

# Class setup

Marlon, Nov 15: "helps me set students in my class up to create a simple web based learning game/environment, but also to use Claude Desktop (code) as the harness for this."

Students open a folder in Claude Desktop's Code tab that teaches them one topic and keeps what they learn as plain files (HD's harness, `starters/learning-harness/`). Then they play those files as a web learning game (`/learn`, [notes](../web/README.md)) and remix it with Claude Code. Cards use TD's format (`_content/activities/tdm155ai/README.md`) so TD can link them.

## The cards

| card | kind | min | group |
| --- | --- | --- | --- |
| [Setup, step by step](setup.md) | activity | 30 | solo |
| [Session: learn in a folder, then play what you learned](session-harness-to-game.md) | session | 75 | solo, then pairs |
| [Learn something in the folder](learn-in-the-folder.md) | activity | 30 | solo |
| [Make a game from your graph](make-a-game-from-your-graph.md) | activity | 25 | pairs |
| [A taste at the Nov 18 closer](pointer-at-the-closer.md) | activity | 8 | whole class |
| [What can go wrong](what-can-go-wrong.md) | research | | |

## Where it fits

Marlon's choice (about 13:00, Nov 15, on HL's board): "Nov 18 taste + take-home": a short taste in class on Nov 18 (the [taste card](pointer-at-the-closer.md), at the closer, *A mechanic for your Final Project*, where TD suggested), then the starter as a take-home over Thanksgiving, shown on Dec 2. The [session](session-harness-to-game.md) becomes the take-home's steps. TD records it as items 12 and 13 in `_content/activities/tdm155ai/plan-changes.md`.

## For Marlon to decide

1. **Access.** The Code tab "requires a Pro, Max, Ultra, Team, or Enterprise subscription" (Claude's desktop quickstart, read Nov 15). The syllabus promises free tiers and no extra spending. Studio laptops on an LL account, pairs, or optional for those who have it?
2. ~~**Placement.**~~ Decided: Nov 18 taste, take-home over Thanksgiving, shown Dec 2. Still open: how long the Dec 2 showing gets, and whether the take-home is required or optional.
3. **Where the starter and the game go.** For now, everything stays in `ll-week-11` (Marlon, relayed by HL, Nov 15). Still open: what goes to the class repo for the take-home. Options: the class repo (`tdm155ai-week-11`) with the game copied into its app; the starter as its own folder there or a download. Or route B only: students ask Claude to build the game in their own folder, with `/learn` as the example to show.
4. **A model for marking.** The game has students mark their own written answers and makes no model calls. Keep it that way, or let Claude mark them in the harness only (no API cost, since it's their Claude session)?

## Not done yet

- Tested on a student laptop, start to finish.
- `/learn` clicked through in a browser (the pages load and the rules pass a Node test).
- HD's worked example: landed; `/learn/paperclips` loads and its statuses match `check-graph.mjs` (4 held, 3 new).
