---
title: "Photo to game state"
description: "You are the vision model: pin what you see on an overhead photo of a board or a card table, and the pins become game state; two photos give a diff, and what no photo shows is the lesson."
kind: prototype
convolute: game-state
tags: [game-state, cameras, tabletop, hidden-information, database]
audience: [tdm155ai, stafford, llufs]
links: [game-ideas/photo-to-game-state, prototypes/hybrid/photo-to-game-state, from-board-game-to-game-state, photograph-the-neutral-state, photo-to-game-state-then-read-a-save-file, every-tap-is-a-row, game-ideas/holdem-with-lipstick-cams, game-ideas/marker-corners, game-ideas/index-cards-that-answer, mechanics/hidden-information, mechanics/territory-and-area-control, mechanics/movement-and-position, hidden-information, territory-and-area-control]
sources: ["_content/prototypes/hybrid/photo-to-game-state.md", "_content/game-ideas/photo-to-game-state.md", "_content/activities/README.md", "_context/orchestration/20261114/voice-handoff-back.md"]
voice: mixed
author: CM
date: 2026-11-15
week: 11
status: draft
---

PB's prototype of Nov 15 at /proto/hybrid/photo-to-game-state, with no model call: a person pins what they see on a Monopoly board or a card table, and a state table and JSON build as they go. Two photos give the changes between them; face-down cards enter as a count, never a value. It is the fallback for Wednesday's photo activity, from Marlon's "here's the game, and then take a photo of it".

---

**What it is.** A game idea from November 14 (GL's, from Marlon's direction that day) that PB built on November 15 at `/proto/hybrid/photo-to-game-state`. The idea: after each round, an overhead photo becomes a game-state table. The prototype does the step by hand, with no model call: a person looks at the photo and pins each piece, and the page turns the pins into state.

**How it plays.** Pick *Monopoly* or *Cards on a table*. Photo A starts as a drawing standing in for a photo; upload one, shoot one on a phone, or use the laptop's webcam. Pick a piece and click where you see it. On the ring board, a pin's position decides which of the 40 spaces it is on; on the card table, nearness to a seat decides who owns a card or a stack of chips. The state table and the JSON build as you pin. Then Photo B: copy the pins from A, drag what moved, and *From A to B* lists what changed. *Not in the photo* lists the rest. Example pins fill both photos for a two-minute demo.

**What it does for learning.** Three things show on the page. *Templates and instances:* the board's spaces, deeds and deck are the template, the pins are one game's instances, and a house pin doesn't carry its rent, which is looked up from the template; that is normalization. *Hidden information:* face-down cards enter the state as a count, never a value, and the deck's order, whose turn it is and deals made out loud are in no photo, which is why broadcast poker added lipstick cams and then RFID cards. *The diff is the turn:* two snapshots and their difference make a record of play, the reverse of [Every tap is a row](every-tap-is-a-row.md), which keeps the events and rebuilds the state.

**Which of Marlon's ideas it serves.**

> here's the game, and then take a photo of it

Marlon, Nov 14, in a voice chat with Claude, as transcribed in the handoff back to Claude Code (section 4), on overhead camera shots of board games turned into game state. He named Monopoly, Risk and Life and a card game, an initial neutral state and a game in progress, and wanted it "In my class, at least, and maybe in Stafford's class."

**In the week:** the fallback in Wednesday's [photo activity](photo-to-game-state-then-read-a-save-file.md) if Claude reads the photo badly, and the second of AL's chains across audiences: LLUFs set up the overhead camera or a phone on a stand, TDM students pin a board, William's students pin their own index cards. PB's further proposals: the tabletop *Data Center* pinned after each round as its save file, and a camera turn that grades a vision model against a person's pins, once Marlon okays a model.

**Needs:** a laptop and a camera shot from straight above, board square to the frame (a tilted photo puts pins on the wrong spaces, worth trying once). No paid API.

*CM's account of PB's prototype and GL's idea, Nov 15. Not Marlon's words unless quoted.*
