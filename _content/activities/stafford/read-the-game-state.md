---
title: "Read the game state"
description: "Pairs open the game they just played as data, template beside instance, and find the categories the game made, in the language of the Sept 28 database workshop."
kind: activity
audience: stafford
week: 11
date: 2026-11-15
status: proposal
author: claude (SW, Claude Code dd46e909-fd8b-4fb0-b2f6-2979500830b3)
duration: 15
group: pairs
materials: "a laptop per pair: the Data Center ruleset file and a saved game from the table's laptop; optionally Universal Paperclips open with the browser's developer tools"
play: laptop
mechanics: ["hidden-information", "seeded-map", "not-modeled"]
readings: ["manovich-1999-database-as-symbolic-form", "wardrip-fruin-2009-expressive-processing", "star-1999-ethnography-of-infrastructure"]
prototypes: ["hybrid/photo-to-game-state"]
ideas: ["game-ideas/photo-to-game-state"]
activities: ["stafford/play-data-center", "stafford/the-map-is-their-database"]
sources:
  - "_content/game-state/README.md and data-center.md (HI: template, instance, state, view; the save under localStorage key w11-game:data-center)"
  - "_content/game-state/paperclips.md (HI: about 230 values in one flat save)"
  - "_context/orchestration/20261114/voice-handoff-back.md (Marlon: 'maybe in Stafford's class, we should actually just go from a board game to how you would represent the data')"
  - "NB/_context/projects/50-in-focus/william-stafford/syllabus.md (Sept 21 Manovich, Dourish; Sept 28 Jones and the database workshop)"
---

**Marlon, Nov 14 (voice chat):** "In my class, at least, and maybe in Stafford's class, we should actually just go from a board game to how you would represent the data of that board game as a game state." And on *Paperclips*: "We're not trying to steal the game, we're just trying to understand how it's structured and what changes over time."

**What students do:**

1. Open the ruleset (the template: 14 places, three resources, four factions, the AI's deck) beside the state of the game they just played (the instance: who owns which place, the tracks, the AI's compute, the deck's order).
2. Find three things: a category the game decided (what counts as a "place"?), something hidden in the state that no player could see (the turn card's position), and something on the `notModeled` list that their table would add.
3. One sentence each, out loud: what does the game's database say infrastructure is?

**What it teaches:** It brings back the Sept 28 workshop (database as medium, method, artefact) and Manovich's database as symbolic form: the game's categories are an argument before anyone plays. HI's four words (template, instance, state, view) are the vocabulary.

**Prepare:** The state is in the browser's localStorage, which students won't find on their own. Before the workshop, add a way to show it on the play screen or save it as a file (GL's proposal, a "game state" panel, waits on Marlon's go); otherwise print a saved state.

**Try it:** Print HI's one-page `data-center.md` and a state from one finished game; the activity runs on paper.

**Could go wrong:** JSON intimidates. Show it as a table first.

*SW's proposal (Nov 15); Marlon's words quoted and dated; the data model is HI's.*
