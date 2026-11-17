---
title: "Every tap is a row"
description: "Ninety seconds of tapping badges and supplies to build data centers. Every tap writes a row; the board is only those rows replayed. At the end, read the table instead of the board."
kind: hybrid
week: 11
date: 2026-11-15
status: prototype
author: claude (PB, Claude Code 107470fa-4f33-4186-8608-7c9ad82099d4, started in ll-week-11 on FAS-DDW32PXW5L)
route: /proto/hybrid/every-tap-is-a-row
mechanics: ["resource-management", "bottleneck", "turn-order", "timer-and-countdown", "rewind-and-do-over"]
readings: ["manovich-1999-database-as-symbolic-form", "wardrip-fruin-2009-expressive-processing", "sicart-2008-defining-game-mechanics"]
ideas: ["every-tap-is-a-row", "faction-badges", "place-to-commit"]
sources:
  - "ll-week-11: _content/game-ideas/every-tap-is-a-row.md (GL, Nov 14)"
  - "ll-week-11: _context/orchestration/20261114/voice-handoff-back.md (Marlon on NFC and game state, Nov 14)"
  - "ll-week-11: _content/game-state/ (HI, games as data)"
---

Four players race for the parts of a data center: one GPU, one Power, one Land and one Water each. To take a part you tap your badge, then the part. There isn't enough Water to go round. Each tap, whether it counts or not, becomes one row in a table: when, which tag, how it came in (key, click, USB reader, phone), who had the turn, and what it did. The page keeps no other record. The board on the left is computed from the rows every time, and a slider rebuilds it as it stood at any row.

## How to play

1. Open `/proto/hybrid/every-tap-is-a-row` on the laptop. Each player has a badge key (**Q** Red, **W** Green, **E** Blue, **R** Gold) and the table has four parts (**1** GPU, **2** Power, **3** Land, **4** Water). Clicking a chip works too.
2. Tap your badge, then a part. That claims one; then someone else goes. The clock starts with the first tap and runs ninety seconds. Most complete data centers wins.
3. When time is up, stop looking at the board. Read the log and the **Read the table** notes: the taps that didn't count, the longest pause, the most-wanted part, the moment a pile ran out.
4. Drag **Replay to row** back and watch the board unbuild. **Download CSV** saves the log; **New round** clears it.

With NFC tags: click **teach** on a chip, tap a sticker on the reader, and that sticker is now that badge or part. Put the stickers on paper tokens on the table.

## What it shows

The mechanics on the surface are ordinary: **resource management** against a **bottleneck** (Water), **turn order** that players take by grabbing it, and a **timer**. Underneath, the game state is never stored. Only the events are, and the state is rebuilt from them, so **rewind** costs nothing. That is how the games in HI's [games as data](../../game-state/) pages differ from the board in front of you: the board shows where things are now, and the log shows how they got there.

Manovich's "Database as Symbolic Form" sets the database (a list with no order but the one you impose) against narrative (a chain of cause and effect). Here the same play is both: a table of rows, and the story you can read back out of it. The log also keeps what the board drops. A tap with no badge first, a grab at an empty pile and a tap after time changed nothing, so the board doesn't show them. They are still in the table, and each one is someone trying something. Wardrip-Fruin's split between a system's data and its processes is visible here in two places: the rows are data, and `replay()` is the process that turns them into a board.

*PB's proposal, not Marlon's words; the readings are summarized from memory and should be checked against the texts.*

## Could go in the game as

- **The AI's ledger.** In *Data Center*, every action the AI takes is a row the players can read after the game, or read during the game for a price.
- **NFC tokens on a printed map.** Tapping a token onto a region is a move; the phone or laptop is the only place the state lives, and anyone can replay the round.
- **The debrief.** End every playtest by reading the log, not the board: who hesitated, who tried the impossible move, what ran out first.

## Remix it

Ask Claude Code, in `nextjs/app/proto/hybrid/every-tap-is-a-row/TapLog.jsx` (the tuning values are at the top):

- "Make Water scarcer and add a fifth part, Chips, that only Gold can claim." (`THINGS`, `PLAYERS`)
- "Let a player tap a part twice in a row to steal one from the last player who took it, and log it as a steal." (`replay()`)
- "Add a finding that names the player whose taps were ignored most." (`findings()`)
- "Show the log as a timeline strip, one coloured tick per tap, instead of a table." (the log section of `TapLog`)

## Needs

- **A laptop** with a browser. Keys and clicks always work.
- **A USB NFC reader that types** (keyboard emulation): it types the tag's ID and presses Enter, which the page reads as a tap. The page tells a reader from a person by that Enter: four or more characters typed less than 60 ms apart and ended by Enter are a tag ID; any other keys, however fast, are taps, one per key. A reader that doesn't send Enter won't work until `SCAN_GAP_MS` handling is changed in `TapLog.jsx`. A PC/SC reader such as the ACR122U doesn't type on its own as far as PB knows; check the reader's manual before relying on it. **Simulate a reader tap** tries the path without one.
- **NTAG213 stickers** (or any NFC tag with an ID) on paper tokens.
- **Phone NFC** (optional): Web NFC works only in Android Chrome over HTTPS, so it doesn't work on the laptop's `http://` dev server without a tunnel or a deploy. The button stays off elsewhere.
- Whether the NFC kit has arrived: asked Marlon on Nov 15; not yet answered.
