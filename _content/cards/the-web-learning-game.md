---
title: "The web learning game"
description: "A learner's graph, written by Claude as it teaches them in a folder, becomes a game at /learn: a map that unlocks as ideas are held, a practice round, and a progress bar."
kind: prototype
convolute: learning-harnesses
tags: [game-state, play, remix, claude-code]
audience: [tdm155ai]
links: [learning/web/README, learning/format, the-learning-harness-is-this-weeks-game, a-graph-of-what-the-learner-knows, build-your-own-learning-harness, make-a-game-from-your-graph, mechanics/tech-tree-and-unlocks, mechanics/feedback, mechanics/levels-and-progression, mechanics/fog-of-war-and-exploration, feedback]
sources: ["_content/learning/web/README.md", "_content/learning/README.md", "_context/orchestration/20261115-learning/board.md"]
voice: mixed
author: CM
date: 2026-11-15
week: 11
status: draft
---

**What it is.** HB's game at `/learn` in the reader app (November 15). It reads the plain files a student's Claude Desktop project writes as it teaches them, in the learning harness's graph format (v0.2), and makes them a game. The first worked example is HD's on the paperclip argument (`/learn/paperclips`).

**How it plays.** Three views:

- **Map.** Every idea is a node, with arrows from an idea to the ones that rest on it; foundations start open on the left, the goal sits on the right with a thick border. Open a lit node, answer its question, say how sure you are; at 3 or 4 the idea is held, which opens what rests on it.
- **Practice.** Five questions drawn from ideas you've tried, missed ones most often; the question doesn't name the idea.
- **Progress.** How much of the map is held, shaky, missed, open or locked, and how much of the path to the goal.

Answers the student gave Claude in the folder count from the start, so what they learned in Claude Desktop is already lit when they open the game. The game never edits ideas, makes no model calls, and has students mark their own written answers.

**What it does for learning.** The learner's graph is a game state written down: propositions are the templates, attempts are the moves, the map is a view drawn from them. That makes a learning tool readable with the week's questions about any game: what does it make the player do, and what does it remember? HB's remixes, each naming the file Claude should change, show that a view argues something about learning: a boss at the goal, ideas fading if you stay away, the map reskinned as a dungeon, a two-player duel.

**Which of Marlon's ideas it serves.**

> learning harness stuff will be thought of as "game" for this week essentially

Marlon, Nov 15, in HL's pane (`_context/orchestration/20261115-learning/board.md`). Earlier that morning he asked for a workspace that "helps me set students in my class up to create a simple web based learning game/environment, but also to use Claude Desktop (code) as the harness for this" (`_content/learning/README.md`). CI's [The learning harness is this week's game](the-learning-harness-is-this-weeks-game.md) holds that framing; this card is the game.

**Status:** the pages load and the rules pass a Node test; HB notes someone should click through `/learn/paperclips` once. Where it lives for students waits on Marlon; for now it stays in `ll-week-11` (his answer on HL's board).

*CM's account of HB's game, Nov 15. Not Marlon's words unless quoted.*
