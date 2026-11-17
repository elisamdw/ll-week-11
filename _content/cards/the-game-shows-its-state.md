---
title: "The game shows its state"
description: "A drawer in /game/play that shows the ruleset and the live game state side by side, marks what the last move changed, and saves the state as a file."
kind: idea
convolute: builds-this-week
tags: [game-state, database, claude-code]
audience: [tdm155ai, stafford, llufs]
links: [the-week-11-ai-game, a-game-is-data-and-a-loop, read-the-game-state, activities/tdm155ai/a-game-is-data, activities/stafford/read-the-game-state, photo-to-game-state-then-read-a-save-file, games-persist-state-as-data, mechanics/rewind-and-do-over]
order: 1
sources: ["_context/orchestration/20261114/voice-handoff-back.md", "W11/builds.md", "nextjs/app/game/play/[id]/Play.jsx", "nextjs/lib/game-engine.mjs", "_content/game/README.md"]
voice: mixed
author: KB
date: 2026-11-16
week: 11
status: draft
---

The AI game at /game already keeps its whole state as one object in the browser, but no one can see it. A drawer beside the board would show the ruleset (the template) next to the state (the instance), light up what the last move changed, and save or load the state as a JSON file. It is the screen that Wednesday's and Stafford's game-state activities point at, and it serves Marlon's "what changes over time".

---

> We're not trying to steal the game, we're just trying to understand how it's structured and what changes over time.

Marlon, Nov 14, in the voice chat, on looking at *Universal Paperclips*' state in the browser, as transcribed in the handoff back to Claude Code (`_context/orchestration/20261114/voice-handoff-back.md`). On the builds list this became build 7, with GL's proposal of "a game-state panel in `/game`" (`W11/builds.md`).

**What it is.** A toggle on `/game/play/<version>` that opens a side drawer with three tabs. *Rules*: the ruleset JSON from `_content/game/_rulesets/`, the template. *State*: the live object that `newGame()` makes and `act()` and `endTurn()` replace (`nextjs/lib/game-engine.mjs`), the instance, with the keys that changed on the last move highlighted. *Log*: one row per action, which lets the board be stepped back, as *Every tap is a row* already does with taps. Two buttons: download the state as a file, and load one.

**Who it is for.** Wednesday's class, where `a-game-is-data` and *Read the game state* ask students to open a game they just played as data; Stafford's workshop on Nov 23, the same activity in the vocabulary of his students' September 28 databases; and the LLUFs, who can check a playtest by reading the state instead of describing the board.

**What it reuses.** The engine as it stands: the state is already a plain object (`Play.jsx` saves it to the browser under `w11-game:<ruleset>`), so the drawer reads and does not change the engine. The before/after comparison is the same move as the photo-to-game-state activity, done on data the game itself holds.

**What it would take.** About two to three hours for one agent in `nextjs/app/game/play/[id]/`, in this repo, on the laptop's dev server. No hardware, no new repo, no keys.

**What Marlon would decide.** Whether students see raw JSON or a table (KB would show both, JSON first, since the point is to see what the game stores); whether the drawer is open by default in class; and whether the saved file is the format Claude reads to take a turn (the card that follows this one).

*KB's proposal, Nov 16. Not Marlon's words unless quoted.*
