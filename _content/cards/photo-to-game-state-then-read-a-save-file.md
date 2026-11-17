---
title: "Photo to game state, then read a save file"
description: "Two overhead photos of one board become a game-state table with Claude's help; then students open Universal Paperclips' save in the browser and compare a board game's state with a video game's."
kind: activity
convolute: game-state
tags: [game-state, database, cameras, paperclips, tabletop]
audience: [tdm155ai]
follows: take-apart-a-board-game
links: [activities/tdm155ai/photo-to-game-state, activities/tdm155ai/a-game-is-data, from-board-game-to-game-state, photograph-the-neutral-state, photo-to-game-state, every-tap-is-a-row, game-state/paperclips, mechanics/hidden-information, mechanics/fog-of-war-and-exploration, game-ideas/holdem-with-lipstick-cams, hidden-information]
sources: ["_content/activities/tdm155ai/photo-to-game-state.md", "_content/game-state/README.md", "_content/game-state/paperclips.md", "_context/orchestration/20261114/voice-handoff-back.md"]
voice: mixed
author: CM
date: 2026-11-15
week: 11
status: draft
---

The middle of Session A, where play turns into data. What changed between two photos is the state, what didn't is the template, and what no photo shows (cards in hand, whose turn it is, deals made out loud) is the hidden information. Universal Paperclips' save, one JSON object in the browser, shows a video game keeping its state out of sight. Marlon, Nov 14: "We're not trying to steal the game".

---

**What it is.** Thirty minutes at tables, right after the board game: the middle of Session A, where play turns into data.

**How it runs.**

1. **Two photos side by side.** The set-up board and the board after ten minutes. What changed is the state; what didn't is the template.
2. **Photo to state.** Give Claude the second photo and ask for the state as a table or JSON. Check it against the table: what did it get wrong, what did it guess?
3. **What the photo can't see.** Cards in hand, the order of the decks, whose turn it is, debts, deals made out loud. That list is the hidden information.
4. **Template and instance.** Ask Claude to split its JSON into what's printed on the board and what this game holds. That is normalizing.
5. **A video game's state.** Play *Universal Paperclips* for two minutes, then developer tools → Application → Local Storage → `saveGame`: one JSON object, which changes about every 25 seconds. Which values did the player never see?

If Claude reads the photo badly, students pin it themselves in the [Photo to game state](photo-to-game-state.md) prototype, and Claude's job becomes the normalizing.

**What it does for learning.** A game is data plus the verbs that change it, and a player sees only a view of it. In a board game people keep the state on the table; in a video game the machine keeps it out of sight. Claude inventing owners for deeds it can't read is the lesson about views. It is also the skill the remix needs an hour later: knowing where in a game's code a change goes. TD's readings: Manovich, "Database as Symbolic Form"; Wardrip-Fruin, *Expressive Processing*.

**Which of Marlon's ideas it serves.** His November 14 direction, nearly step by step:

> We're not trying to steal the game, we're just trying to understand how it's structured and what changes over time.

Marlon, Nov 14, in a voice chat with Claude, as transcribed in the handoff back to Claude Code (section 4). He was speaking of *Paperclips*: using the browser to see "what the game state is at a given moment." In the same section he asked for "how you would normalize the data or just structure the data," for overhead shots ("here's the game, and then take a photo of it"), for an initial neutral state and a game in progress, and tied it to "that kind of Lev Manovich theory of database." The idea itself is CL's card [From board game to game state](from-board-game-to-game-state.md); this is the activity that runs it.

*CM's account of TD's activity, Nov 15. Not Marlon's words unless quoted.*
