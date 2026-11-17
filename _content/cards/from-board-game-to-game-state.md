---
title: "From board game to game state"
description: "Take a board game the LL owns and write down, as data, everything you would need to set the same game up again."
kind: idea
convolute: game-state
tags: [database, game-state, tabletop]
audience: [tdm155ai, stafford]
follows: games-are-complex-with-many-parts
links: [photograph-the-neutral-state, activities/tdm155ai/take-apart-a-board-game, activities/tdm155ai/a-game-is-data, prototypes/hybrid/photo-to-game-state, game-state/monopoly, ideas/turn-the-index-cards-into-a-database]
order: 1
sources: ["_context/orchestration/20261114/voice-handoff-back.md"]
voice: mixed
author: CL
date: 2026-11-14
week: 11
status: draft
---

Start from a board game every student has handled (Monopoly, Risk or Life) and ask what a stranger would need to be told to set this exact game up again on another table. That list is the game state, and sorting it (what never changes, what changes each turn, what only one player knows) is the start of structuring data. Marlon proposed it on Nov 14 for his class and maybe William Stafford's.

---

> In my class, at least, and maybe in Stafford's class, we should actually just go from a board game to how you would represent the data of that board game as a game state

Marlon, Nov 14, in a voice chat with Claude, as transcribed in the handoff back to Claude Code (section 4). He said this includes "how you would normalize the data or just structure the data", and tied it to "that kind of Lev Manovich theory of database."

**What the idea is.** Start from something every student has handled: Monopoly, Risk or Life, which the LL has. Ask what a stranger would need to be told to set this exact game up again on another table: where each piece is, who owns what, how much money each player has, whose turn it is, what order the decks are in. That list is the game state. Sorting the list (things that never change, things that change every turn, things only one player knows) is the start of structuring data.

**What it connects to.** The handoff records his examples: a horse in *Breath of the Wild* has standard properties, and the ones you customize are stored; *Universal Paperclips* and *Civilization* are two ways a game models its data. The same move runs backward for William Stafford's students, whose index cards from Sept 28 were already sketches of a database.

**What it would take.** Three board games in the room, a sheet per table, and a way to look at a state someone else wrote down. HI has worked examples for Monopoly, Risk, Life, Hold'em, *Paperclips* and *Civilization* in `_content/game-state/`; TD drafted the class activities; PB built a prototype where a photo of the board becomes a table.

*CL's reading, Nov 15. Not Marlon's words unless quoted.*
