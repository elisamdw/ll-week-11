---
title: "Read the game state"
description: "Pairs open the game they just played as data, template beside instance, and find the categories the game decided, in the language of the September 28 database workshop."
kind: activity
convolute: game-state
tags: [game-state, database, play]
audience: [stafford]
follows: play-data-center
links: [activities/stafford/read-the-game-state, game-state/data-center, from-board-game-to-game-state, photo-to-game-state-then-read-a-save-file, design-a-game-on-the-classs-own-database, mechanics/not-modeled, mechanics/hidden-information, mechanics/seeded-map, not-modeled, hidden-information]
sources: ["_content/activities/stafford/read-the-game-state.md", "_content/game-state/data-center.md", "_context/orchestration/20261114/voice-handoff-back.md"]
voice: mixed
author: CM
date: 2026-11-15
week: 12
status: draft
---

Ten minutes in pairs after the game, in the language of the students' own September 28 database workshop. Template beside instance, they find a category the game decided, something in the state no player could see, and something on its notModeled list they would add. It is Marlon's "maybe in Stafford's class", with the AI game standing in for the board game. It is the first segment cut if the workshop runs long.

---

**What it is.** Ten minutes in pairs, right after the game: William's students look at the game they just played as a database, which brings back their own database workshop of September 28.

**How it runs.** Pairs open the ruleset (the template: 14 places, three resources, four factions, the AI's deck) beside the state of their game (the instance: who owns which place, the tracks, the AI's compute, the deck's order). They find three things: a category the game decided (what counts as a "place"?), something in the state no player could see (where the turn card sat), and something on the game's `notModeled` list their table would add. One sentence each, out loud: what does the game's database say infrastructure is?

**What it does for learning.** The game's categories are an argument before anyone plays: Manovich's database as symbolic form, met in a game the students just felt. HI's four words, template, instance, state and view, are the vocabulary, the same ones Marlon's class uses on Wednesday in [Photo to game state, then read a save file](photo-to-game-state-then-read-a-save-file.md). The `notModeled` question opens the debrief: what did the game leave out, and who?

**Which of Marlon's ideas it serves.**

> In my class, at least, and maybe in Stafford's class, we should actually just go from a board game to how you would represent the data of that board game as a game state

Marlon, Nov 14, in a voice chat with Claude, as transcribed in the handoff back to Claude Code (section 4). This is the "maybe in Stafford's class," with the AI game standing in for the board game.

**What it needs (waiting on Marlon):** the state lives in the browser's localStorage, which students won't find on their own, so GL's proposed game-state panel would show it on the play screen; until Marlon gives the go, a printed saved state and HI's one-page `data-center.md` run it on paper. SW's advice: JSON intimidates, so show it as a table first. If the workshop runs long, this is the first segment cut; it becomes a journal follow-up.

*CM's account of SW's activity, Nov 15. Not Marlon's words unless quoted.*
