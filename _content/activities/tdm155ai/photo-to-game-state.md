---
title: "Photo to game state, then read a save file"
description: "Two overhead photos of the same board become a game-state table with Claude's help; then students read Universal Paperclips' save in the browser and compare a board game's state with a video game's."
kind: activity
audience: tdm155ai
week: 11
date: 2026-11-15
status: proposal
author: claude (TD, Claude Code 61b3561e-f12d-4cc0-a067-7256dd605f11)
duration: 30
group: tables
play: hybrid
materials: ["the photos from 'Take apart a board game' (set-up and after ten minutes)", "overhead camera, or a phone on a stand", "a laptop per table with Claude (claude.ai or Claude Code)", "Chrome, for Paperclips at decisionproblem.com/paperclips"]
mechanics: ["hidden-information", "fog-of-war-and-exploration", "incremental-growth", "rules-and-fiction"]
readings: ["manovich-1999-database-as-symbolic-form", "wardrip-fruin-2009-expressive-processing", "lantz-2017-universal-paperclips", "fizek-2022-playing-at-a-distance"]
ideas: ["game-ideas/photo-to-game-state", "game-ideas/holdem-with-lipstick-cams", "game-ideas/every-tap-is-a-row"]
prototypes: ["hybrid/every-tap-is-a-row", "hybrid/photo-to-game-state"]
activities: ["tdm155ai/a-game-is-data", "tdm155ai/games-that-play-themselves", "tdm155ai/take-apart-a-board-game"]
sources:
  - "ll-week-11: _content/game-state/README.md, 'For the class on November 18' (HI's proposal, steps 1–4)"
  - "ll-week-11: _content/game-state/paperclips.md (how to read saveGame in developer tools)"
  - "ll-week-11: _context/orchestration/20261114/voice-handoff-back.md, section 4"
---

Marlon, Nov 14: "go from a board game to how you would represent the data of that board game as a game state," with "overhead camera shots of board games, turned into that structure."

**What students do**

1. **Two photos, side by side (3 min).** The set-up board and the board after ten minutes of play. What changed is the state; what didn't is the template.
2. **Photo to state (10 min).** Give Claude the second photo and ask for the game state as a table or JSON. Then check it against the table in front of you: what did it get wrong, and what did it have to guess?
3. **What the photo can't see (4 min).** List it: cards in hand, the order of the decks, whose turn it is, debts, deals made out loud. That list is the hidden information (and why poker television needed lipstick cams, then RFID cards: HI's [Hold'em page](../../game-state/texas-holdem.md)).
4. **Template and instance (5 min).** Ask Claude to split its JSON into what's printed on the board (the template) and what this game holds (the instance). That's normalizing.
5. **A video game's state (8 min).** Open *Universal Paperclips*, play two minutes, then developer tools → Application → Local Storage → `saveGame`. One JSON object; wait 25 seconds and it changes (HI's [steps](../../game-state/paperclips.md)). Which values are the template, which the state? Which ones did the player never see on screen?

**What it teaches:** a game is data plus the verbs that change it, and a player sees only a view of it. In a board game, people keep the state on the table; in a video game, the machine keeps it out of sight. This is Manovich's database under the algorithm, met with the hands. It is also the skill students need to tell Claude where a change goes in a game's code.

**Prepare:** the overhead camera tested on a board under the room's light; one photo per board taken at set-up; Paperclips loaded on each laptop while on Wi-Fi. Decide whether students upload photos to claude.ai or use Claude Code on a laptop; the photos show only the board.

**Try it:** Monopoly at the start and after ten minutes: two photos, two state tables, one list of what neither photo shows.

**What could go wrong:** counting paper money from overhead is hard; tell students to ask Claude for "roughly" and fix by hand. Claude may invent owners for deeds it can't read; that error is the lesson about views. Paperclips' save appears only after the game autosaves (about 25 seconds in).

**Prototypes:** PB's [*Every tap is a row*](../../prototypes/hybrid/every-tap-is-a-row.md) (`/proto/hybrid/every-tap-is-a-row`) is the opposite route to the state, and a good 5-minute extension: ninety seconds of taps, then read the log instead of the board, and drag the replay back. A photo guesses the state; a log of events rebuilds it. PB's [*Photo to game state*](../../prototypes/hybrid/photo-to-game-state.md) (`/proto/hybrid/photo-to-game-state`, built Nov 15) makes the student the vision model: pin what you see on an overhead photo, and the pins become a state table and JSON; two photos give a diff. Use it for step 2 before (or instead of) asking Claude, then compare the class's pins with Claude's reading. Sending the photo to a model from the page waits on Marlon's ok.

*TD's proposal, Nov 15, built on HI's steps 1–4 and Marlon's Nov 14 direction; HI's model of each game is HI's, not the publisher's.*
