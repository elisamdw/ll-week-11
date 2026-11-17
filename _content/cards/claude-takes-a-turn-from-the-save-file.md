---
title: "Claude takes a turn from the save file"
description: "Save the AI game's state to a file, ask Claude Code to play one faction's turn by editing it, load it back, and see the move on the board."
kind: idea
convolute: builds-this-week
tags: [claude-code, game-state, turns]
audience: [tdm155ai, stafford]
follows: the-game-shows-its-state
links: [claude-takes-a-seat, how-do-llms-play-and-lose-at-board-games, language-models-at-the-table, claude-thinks-at-turn-speed, agents-are-turns-all-the-way-down, a-repo-claude-can-find-its-way-around, claude-code-is-the-ui, the-week-11-ai-game]
order: 2
sources: ["_context/orchestration/20261114/voice-handoff-back.md", "nextjs/lib/game-engine.mjs", "W11/research/language-models-at-the-table.md", "_content/activities/tdm155ai/claude-takes-a-seat.md"]
voice: mixed
author: KB
date: 2026-11-16
week: 11
status: draft
---

Once the AI game can save its state as a file, Claude Code can play a seat: a pair asks it to read the rules and the save, choose one faction's moves, write the new state through the engine, and explain the choice. Loading the file back puts the move on the board. It is the paper activity *Claude takes a seat*, made real without an API key, since Claude Code is the tool students already have.

---

> I don't need to build a UI for that designing or remixing. The UI is Claude code itself.

Marlon, Nov 14, in the voice chat, as transcribed in the handoff back to Claude Code (`_context/orchestration/20261114/voice-handoff-back.md`). He said it about remixing; this card applies the same idea to playing.

**What it is.** A short script in the repo, `nextjs/scripts/take-turn.mjs` or similar, that loads a ruleset and a save file, lists the legal actions with the engine's own `legalTargets()` and `canAfford()`, applies the ones it is given with `act()`, and writes the new save. Claude Code reads the files, decides, runs the script, and says why. A paragraph in the game's `AGENTS.md` tells Claude how to take a turn for a named faction, and that it must use the engine rather than edit numbers by hand.

**Who it is for.** Wednesday's class, as one form of *Claude takes a seat* (an opponent or a private advisor to one player), and Stafford's workshop, where an AI that plays a faction sits beside an AI that is the faction the game is about. It also makes concrete the turn-speed point on `claude-thinks-at-turn-speed`: Claude can play this game because it is turn-based. KR's answer, `language-models-at-the-table` (Nov 16), is a caution worth building in: chat models are weak board-game players that mostly fail by breaking the rules. That is the case for the script: Claude chooses, but only the engine's legal actions can be applied, and a refused move is something to show the class.

**What it reuses.** The engine's pure functions, the state drawer's save and load (`the-game-shows-its-state`), and the repo legibility that `a-repo-claude-can-find-its-way-around` already asks for.

**What it would take.** Two hours after the drawer exists: the script, the `AGENTS.md` paragraph, and one rehearsed turn. No paid API calls: each student's own Claude does the playing, so this depends on what Claude access students have on Wednesday, which is already a question for Marlon (Nov 15 handoff, item 2).

**What Marlon would decide.** Whether a Claude seat belongs in Wednesday's class or waits for Stafford; and whether Claude plays a human faction (an advisor) or the AI itself (which turns the game's subject into its player).

*KB's proposal, Nov 16. Not Marlon's words unless quoted.*
