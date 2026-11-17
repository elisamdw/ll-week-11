---
title: "Session: learn in a folder, then play what you learned"
description: "One 75-minute session: set up a learning harness in Claude Desktop, learn something small in it, then turn your own graph into a web learning game and remix it."
kind: session
audience: tdm155ai
week: 11
date: 2026-11-15
status: "draft, Claude's (HB); placement decided by Marlon about 13:00 Nov 15: a taste on Nov 18, take-home over Thanksgiving, shown Dec 2"
author: claude (HB, Claude Code fe915dbb-5ed5-4918-a50b-18851bd49e0b, started in ll-week-11 on FAS-DDW32PXW5L)
duration: 75
group: solo, then pairs
play: laptop
materials: ["laptops with Claude Desktop signed in on a plan that includes Claude Code", "the learning-harness starter", "Node 22+ and pnpm", "the web game (route A) or nothing extra (route B)", "the projector for the show"]
activities: ["learning/class/setup", "learning/class/learn-in-the-folder", "learning/class/make-a-game-from-your-graph", "tdm155ai/remix-with-claude-code", "tdm155ai/a-game-is-data", "tdm155ai/a-mechanic-for-your-final-project"]
sequence:
  - { time: "0:00", minutes: 10, step: "Setup check", card: "learning/class/setup" }
  - { time: "0:10", minutes: 30, step: "Learn something in the folder", card: "learning/class/learn-in-the-folder" }
  - { time: "0:40", minutes: 25, step: "Make a game from your graph", card: "learning/class/make-a-game-from-your-graph" }
  - { time: "1:05", minutes: 10, step: "Show: one map, one remix, one question" }
sources:
  - "Marlon, Nov 15 (verbatim in the workspace's shared brief): 'helps me set students in my class up to create a simple web based learning game/environment, but also to use Claude Desktop (code) as the harness for this'"
  - "TD's reply to HB, Nov 15, before 08:23: Session A fills Nov 18; Dec 2 is WIP and installation; an out-of-class window Nov 18–Dec 2 fits, with a 5–10 minute pointer at the Nov 18 closer"
---

Marlon, Nov 15: "helps me set students in my class up to create a simple web based learning game/environment, but also to use Claude Desktop (code) as the harness for this."

**The idea in one line:** the folder is the tutor and its memory; the web page is a game made from that memory. A student learns something with Claude in a folder, the folder keeps what they learned as plain files, and those files become the content of a game they can play and remix. Both halves are things they can open and change.

## Run of show (75 min)

1. **Setup check (10 min).** Everyone at step 6 of [setup](setup.md): Claude Desktop open, Code tab, harness folder open, Accept edits on. Anyone stuck pairs with a neighbour whose setup works (see [what can go wrong](what-can-go-wrong.md)).
2. **[Learn something in the folder](learn-in-the-folder.md) (30 min, solo).** `/learn` a small topic, then teach until three or four ideas are held. Open the files and see your own words in them.
3. **[Make a game from your graph](make-a-game-from-your-graph.md) (25 min, pairs).** Play your graph on the map (route A or B), then ask Claude for one remix.
4. **Show (10 min).** Two or three pairs on the projector: their map, the remix in one line, and one question it raised. Prompts for the room: what does the game reward that the tutor didn't? What does the map make visible that the conversation hid?

## How it connects to the week

- **A game is data** ([TD's card](../../activities/tdm155ai/a-game-is-data.md)): the learner's graph is a game state, written down. Propositions are the templates, attempts are the moves, and the map is a view drawn from them.
- **Remix with Claude Code** ([TD's card](../../activities/tdm155ai/remix-with-claude-code.md)): the same move, on a game the student made from their own learning.
- **Agency or argument** ([TD's card](../../activities/tdm155ai/agency-or-argument.md)): a learning game argues something about learning (that it unlocks, that it is a path, that missing costs). The remixes change the argument.

## As a take-home (Marlon's choice)

Marlon's choice (about 13:00, Nov 15, on HL's board): "Nov 18 taste + take-home". Nov 18 is full with Session A, so the [pointer card](pointer-at-the-closer.md) is the taste, at the closer. Over Thanksgiving, students work through [setup](setup.md) and the two activities on their own (the pair steps work solo: play your own graph, then remix). On Dec 2 the show above becomes a short showing: a screenshot or live view of the map, the remix in one line, and one question it raised.

## Before running it

- Account access: the Code tab needs a paid plan (Claude's docs), and the syllabus promises free tiers. **Marlon decides** how students get access.
- Where the starter and the game live: the class repo (`tdm155ai-week-11`) is the obvious home, but **nothing goes there without Marlon's go**.
- One run-through on a clean laptop, start to finish, timed.

*Claude's proposal, not Marlon's words except where quoted.*
