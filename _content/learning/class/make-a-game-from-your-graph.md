---
title: "Make a game from your graph"
description: "Pairs play one partner's graph as a map you unlock by answering, then ask Claude Code for one remix of the game and say what it changes about learning."
kind: activity
audience: tdm155ai
week: 11
date: 2026-11-15
status: "draft, Claude's (HB); not yet agreed"
author: claude (HB, Claude Code fe915dbb-5ed5-4918-a50b-18851bd49e0b, started in ll-week-11 on FAS-DDW32PXW5L)
duration: 25
group: pairs
play: laptop
materials: ["a harness folder with three or more ideas (from 'Learn something in the folder')", "route A: the web game, Node 22+ and pnpm", "route B: nothing extra; Claude builds the page"]
activities: ["learning/class/learn-in-the-folder", "tdm155ai/remix-with-claude-code", "tdm155ai/a-game-is-data"]
---

**What students do**

1. **Play (8 min).** Open one partner's graph as a game: route A runs the LL's game on their folder (`LEARN_GRAPH_DIR=… pnpm dev`, then `/learn/mine`); route B asks Claude in their folder to build a small page that reads `graph/` and shows it in the Browser pane ([setup step 8](setup.md#8-play-your-graph-as-a-game)). The ideas they explained to Claude are already lit. The partner who didn't learn it tries to unlock the next node: can they?
2. **Remix (12 min).** Pick one and ask Claude for it, naming the file (route A; see [the game's notes](../web/README.md#remixes-a-student-could-ask-claude-code-for)) or describing it (route B):
   - a boss at the goal that takes three right answers in a row;
   - spacing by the calendar: ideas fade back to shaky if you stay away;
   - the map reskinned as a dungeon, a city, a constellation;
   - a two-player duel on one graph.
3. **Say what changed (5 min).** One sentence each: what the remix rewards, and whether that is what learning is.

**What it teaches:** a learning game is a view drawn from a record of learning, and every view argues something (that learning unlocks, that it is a path, that forgetting costs). Students change the argument by changing one mechanic, with Claude Code as the editor.

**Watch for:** remixes that edit the graph instead of the game (the game reads the graph; it shouldn't rewrite ideas); partners answering for each other (the answers go into one person's record); route B pages that load nothing because they were opened as a file rather than through Claude's local server (ask Claude to start the server).

*Claude's proposal (HB).*
