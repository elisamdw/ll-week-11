---
title: "The move updates state"
description: "A move is a small record of what a player did; the game state is what you get by applying every move so far, in order, to the starting position."
id: the-move-updates-state
kind: study
study: 1
mechanic: the-move-updates-state
route: /mechanics/studies/the-move-updates-state
status: draft
author: "ES (Claude Code 857ec322-4c83-4631-baa8-f671208874c6, started in ll-week-11 on FAS-DDW32PXW5L), Nov 17, 2026"
date: 2026-11-17
sources:
  - "_content/glossary/README.md, Game state (TH: Costikyan, Sicart and Juul, quoted from opened texts)"
  - "_content/activities/tdm155ai/change-one-card.md (card 01 turns tic-tac-toe inside out) and session-a-play-take-apart-remix.md (the run of show)"
  - "NB/_context/projects/50-in-focus/ll-weeks/fall-2026/11-ending-20261120/marlon/20261117-morning-mechanics-entries-nfc-and-the-color-agents.md, the 07:42 concept inventory (Claude's compilation of Marlon's ideas, items 13, 17 and 18)"
  - "nextjs/app/proto/hybrid/every-tap-is-a-row/TapLog.jsx (PB, Nov 15), whose replay() this study copies in miniature"
  - "nextjs/lib/game-engine.mjs and nextjs/app/game/play/[id]/Play.jsx (the week's game saves its state and a log for reading)"
mechanics: [the-move-updates-state, the-tap, nested-loops, turn-order, irreversible-choice, hidden-information]
technologies: []
games: []
proposals: 1
---

# 01 · The move updates state

**The illustration:** [/mechanics/studies/the-move-updates-state](/mechanics/studies/the-move-updates-state) (screen) and [its 11x17 sheet](/mechanics/studies/the-move-updates-state/print).

## Definition

A **move** is a small record of what one player did at one moment. The **game state** is everything true about the game right now, and it is what you get when you apply every move so far, in order, to the starting position.

## Description

Costikyan puts it in one sentence about Monopoly: "You choose whether or not to buy a property you land on; the game state changes in response to your decision" (2002, p. 11, as quoted in this week's [glossary](../../glossary/README.md)) [1]. The move is the input and the state is the result. Two things follow. If you keep the moves, you can always rebuild the state; if you keep only the state, the moves are gone. And the same list of moves read under different rules gives a different game.

- **Chess.** A game is written down as its moves (1. e4 e5 2. Nf3 ...). Anyone can set up the board, play the list, and arrive at the same position, which is how games are published, analyzed and played by correspondence.
- **Tic-tac-toe.** Nine squares, two marks, at most nine moves. The board is a picture of the moves; the moves are the game. Card 01 of the class deck turns it inside out ("whoever makes three in a row loses") without changing a single move, only the rule that reads them [2].
- **Software.** Many programs keep a log of events and compute the current state from it: a bank balance from its transactions, a document from its edits (undo is the log read one step shorter). Programmers call this event sourcing.
- **This week.** PB's [*Every tap is a row*](../../prototypes/hybrid/every-tap-is-a-row.md) keeps nothing but the taps and rebuilds the board from them, with a slider to unbuild it [4]. The week's game at `/game` does the opposite: it saves a snapshot of the state in the browser and keeps a log only for people to read [5].

## How to

- **On paper:** one person keeps a numbered list of moves on an index card while the others play. Nobody needs the board to know the game; the board is a convenience.
- **In code:** store an array of moves, each a small object (`{ n: 3, player: "X", cell: 4 }`). Write one function, `replay(moves)`, that starts from the empty board and applies each move in turn. Draw the board from what `replay` returns. Undo is `moves.slice(0, -1)`; a rewind slider is `replay(moves.slice(0, k))`.
- **With a sensor:** an NFC tap, a key press or a photo each becomes one row; the rest is the same `replay`.

## Why to

**Proposed, for Marlon to choose:**

1. **The bridge from board to data.** In Session A the class goes from a board game on the table to its state as data. Showing that the state is the moves replayed makes "a game is data plus a loop" (item 18 of the 07:42 inventory [3]) something students can see and scrub.
2. **A record to read.** A log answers questions the board can't: who hesitated, which move turned the game, what was tried and refused. That is the debrief of a game, and of a class activity run as a game.
3. **The move as the unit of design.** Changing what counts as a move, or what a move does, is a remix students can make in one prompt; it is where the Stafford game's choices (approve or block a proposal) live too.

## Home game version

### In a regular classroom

Play any short game while one student keeps the move list on the board or an index card; afterward, cover the board, read the list aloud and have another table rebuild the position. Then stop the list three moves early and ask what the board looked like.
### Digitally

A shared spreadsheet with one row per move (time, who, what) and a second tab that computes the state with formulas; or the study's page, which runs in any browser.

## Related

- [The move updates state](../../new/the-move-updates-state.md) (game mechanic, `the-move-updates-state`): the entry this study illustrates.
- [The tap as the move](../../new/the-tap.md) (game mechanic, `the-tap`): the NFC case; a tap is one way a move becomes a row.
- [Nested loops](../../new/nested-loops.md) (game mechanic): the replay is the innermost loop.

Also in the [inventory](../README.md) (`mechanics.csv`): turn order (`turn-order`), irreversible choice (`irreversible-choice`), hidden information (`hidden-information`: a log can record a move without showing it). Glossary: game state; template and instance. Prototype: [*Every tap is a row*](../../prototypes/hybrid/every-tap-is-a-row.md).

## The illustration

On the left, a diagram of the mechanic: the move (a click), the log (the rows), `replay`, and the state (the board and its data), with an arrow back from the board to the next player's choice. On the right, tic-tac-toe in which every click writes a row and the board is drawn only from the rows. A slider replays the log to any earlier move. A switch flips the rule from "three in a row wins" to "three in a row loses" (card 01): the log stays the same and the result changes.

## Try it at a table (two minutes)

Three people and an index card. Two play tic-tac-toe on paper; the third writes each move as a line, "1 X centre", "2 O top-left", and so on. After five moves, turn the paper over. The scribe reads the card aloud and a fourth person, who did not watch, draws the board from it. Then cover the last two lines: what did the board look like then? Last, read the same card under card 01's rule (three in a row loses): who is winning now?

## Remix prompt

Ask Claude Code, in this repo:

> In `nextjs/app/mechanics/studies/_studies/the-move-updates-state/Study.jsx`, add an Undo button that removes the last row of the log, and a Replay button that plays the log back one move per second. Then make a click on a filled square write a row anyway, shown in grey as "refused", without changing the board. Explain what the log now knows that the board does not.

## Sources

1. `_content/glossary/README.md`, Game state (TH: Costikyan, Sicart and Juul, quoted from opened texts).
2. `_content/activities/tdm155ai/change-one-card.md` and `session-a-play-take-apart-remix.md`.
3. `NB/_context/projects/50-in-focus/ll-weeks/fall-2026/11-ending-20261120/marlon/20261117-morning-mechanics-entries-nfc-and-the-color-agents.md`, the 07:42 concept inventory (Claude's compilation of Marlon's ideas).
4. `nextjs/app/proto/hybrid/every-tap-is-a-row/TapLog.jsx` (PB, Nov 15).
5. `nextjs/lib/game-engine.mjs` and `nextjs/app/game/play/[id]/Play.jsx`.

The chess and software examples in the Description are general knowledge, not from a source opened here.
