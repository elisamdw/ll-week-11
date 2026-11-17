---
title: "Every tap is a row"
description: "Ninety seconds of tapping badges and parts to build data centers; every tap writes a row, the board is only those rows replayed, and at the end you read the table instead of the board."
kind: prototype
convolute: game-state
tags: [nfc, game-state, database, tabletop, hardware]
audience: [tdm155ai, llufs]
links: [game-ideas/every-tap-is-a-row, prototypes/hybrid/every-tap-is-a-row, game-ideas/faction-badges, place-to-commit, photo-to-game-state, photo-to-game-state-then-read-a-save-file, mechanics/resource-management, mechanics/bottleneck, mechanics/rewind-and-do-over, mechanics/timer-and-countdown, resource-management]
sources: ["_content/prototypes/hybrid/every-tap-is-a-row.md", "_content/game-ideas/every-tap-is-a-row.md", "_context/orchestration/20261114/voice-handoff-back.md"]
voice: mixed
author: CM
date: 2026-11-15
week: 11
status: draft
---

**What it is.** GL's game idea of November 14 (each tap writes one row, and after the game the class reads the table instead of the board), built by PB on November 15 at `/proto/hybrid/every-tap-is-a-row`. The prototype is the LL's first NFC game, and it runs on keys and clicks when there is no reader.

**How it plays.** Four players race for the parts of a data center: one GPU, one Power, one Land and one Water each, and there isn't enough Water to go round. To take a part you tap your badge, then the part (keys Q W E R for the badges, 1 to 4 for the parts, or NFC stickers taught to stand for them). Ninety seconds; most complete data centers wins. Then stop looking at the board: read the log, and the page's notes on the taps that didn't count, the longest pause, the moment a pile ran out. Drag *Replay to row* back and watch the board unbuild. *Download CSV* keeps the log.

**What it does for learning.** The game state is never stored, only the events, and the board is rebuilt from them every time, so rewinding costs nothing. That is the opposite route to [Photo to game state](photo-to-game-state.md): a photo guesses the state; a log rebuilds it. The log also keeps what the board drops (a tap with no badge first, a grab at an empty pile), and each of those is someone trying something. PB reads it through Manovich's database against narrative (the same play is a table of rows and a story you can read back out) and Wardrip-Fruin's split between data and process.

**Which of Marlon's ideas it serves.**

> doing some game mechanics with NFC is great, and we should try that this week

Marlon, Nov 14, in the voice chat, as transcribed in the handoff back to Claude Code (section 5). He set the limit in the same breath: NFC for simpler tabletop games, not 52-card decks. It also serves his game-state thread from the same chat. In Wednesday's class it is a five-minute extension to the photo activity, and a break-time station.

**Needs:** a laptop. For NFC, a USB reader that types the tag's ID and presses Enter, and NTAG213 stickers on paper tokens; phone NFC works only in Android Chrome over HTTPS. Whether the kit has arrived was asked on November 15, not yet answered.

*CM's account of PB's prototype and GL's idea, Nov 15. Not Marlon's words unless quoted.*
