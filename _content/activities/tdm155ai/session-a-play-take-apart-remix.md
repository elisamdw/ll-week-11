---
title: "Session A: play, take apart, remix"
description: "Nov 18, 12:00–14:45, the games-as-systems arc: a board game played and taken apart, its state photographed, the AI game played in two versions, remixed with Claude Code, and brought back to the Final Projects, with a taste of the learning harness as the take-home."
kind: session
audience: tdm155ai
week: 11
date: 2026-11-15
status: agreed
agreed: "Marlon chose Session A with one swap from Session B, 08:10 Nov 15, relayed by AL: if the LL's Monopoly, Risk and Life or the overhead camera aren't in the room by Wednesday, Claude takes a seat replaces the board-game segment."
author: claude (TD, Claude Code 61b3561e-f12d-4cc0-a067-7256dd605f11)
duration: 165
group: whole room
play: hybrid
sequence:
  - "12:00 tdm155ai/change-one-card"
  - "12:10 tdm155ai/take-apart-a-board-game"
  - "12:35 tdm155ai/photo-to-game-state"
  - "13:15 tdm155ai/play-two-theories-of-ai"
  - "13:40 tdm155ai/remix-with-claude-code"
  - "14:20 tdm155ai/a-mechanic-for-your-final-project"
swap: ["tdm155ai/claude-takes-a-seat"]
activities: ["tdm155ai/mechanics-are-the-verbs", "tdm155ai/a-game-is-data", "tdm155ai/agency-or-argument", "tdm155ai/claude-takes-a-seat"]
prototypes: ["hybrid/every-tap-is-a-row", "players/private-goals", "economy/paperclip-loop"]
---

**Agreed:** Marlon chose this session at 08:10 on Nov 15, with one swap from Session B (relayed by AL; his exact words are on AL's board). **The run of show below is TD's**, built from that choice. Times, the fallbacks and the opening order are proposals within it. Moving it into the class plan's week folder as `run-of-show.md` waits on Marlon's go (see [plan-changes](plan-changes.md), item 3).

**The arc:** hands, then data, then code. Students play a board game and enforce its rules themselves; take it apart into verbs and state; photograph that state and read a video game's save; play a screen game where the rules disappear into code; change that code with Claude Code; and end on their own projects. It follows Marlon's Nov 14 line from board games to game state, and his direction that students remix with Claude Code and the repo.

## Run of show

| time | min | activity | in the room |
| --- | --- | --- | --- |
| 12:00 | 10 | [Change one card](change-one-card.md) | pairs, paper, the deck |
| 12:10 | 25 | [Take apart a board game](take-apart-a-board-game.md) | tables, Monopoly / Risk / Life, set-up photo |
| 12:35 | 30 | [Photo to game state, then read a save file](photo-to-game-state.md) | tables, overhead camera, Claude, *Paperclips* |
| 13:05 | 10 | break; *Private goals* and *Every tap is a row* open on a side screen for anyone who wants to try them | |
| 13:15 | 25 | [Play two theories of AI](play-two-theories-of-ai.md) | tables, `/game/play/...` |
| 13:40 | 40 | [Remix a mechanic with Claude Code](remix-with-claude-code.md), its show cut to 10 minutes (three or four pairs) | pairs, laptops, the class repo |
| 14:20 | 25 | [A mechanic for your Final Project](a-mechanic-for-your-final-project.md), opening with HB's [taste of the learning harness](../../learning/class/pointer-at-the-closer.md) (8 min) and the take-home | projector, then solo, cards, camera |
| 14:45 | | end: save work, put the boxes back | |

## The swap (agreed): no board games or no overhead camera

If the LL's Monopoly, Risk and Life, or the overhead camera, aren't in the room by Wednesday, [Claude takes a seat](claude-takes-a-seat.md) replaces the board-game segment (12:10–13:05). The swap itself is agreed; how the 55 minutes are filled is TD's proposal:

| time | min | activity |
| --- | --- | --- |
| 12:10 | 35 | [Claude takes a seat](claude-takes-a-seat.md), stretched: tables play liar's dice or the index-card trading game, Claude as opponent, advisor or director; the instruction card becomes the AI's game element |
| 12:45 | 15 | Read a save file: step 5 of [Photo to game state](photo-to-game-state.md) on its own (*Paperclips*' `saveGame` in developer tools), plus PB's [*Every tap is a row*](../../prototypes/hybrid/every-tap-is-a-row.md) on the projector: a log of events rebuilds the state. This keeps Marlon's game-state thread without a board. |
| 13:05 | | break, then the session continues as above |

Decide by Tuesday evening, once the boxes and camera are checked.

## Before class (TD's checklist)

- **By Tuesday:** boxes checked and complete (HI's [Monopoly page](../../game-state/monopoly.md) notes editions differ); overhead camera tested on a board under the room's light; the swap decided.
- **The class repo:** a playable game and its `AGENTS.md`, with three worked remixes tested by running Claude Code against them, and students able to clone it; or, if Marlon prefers, a prototype such as `economy/paperclip-loop` as the remix starting point ([plan-changes](plan-changes.md), items 8–11, still waiting on him).
- **The deck:** posters on the walls; hand cards printed and cut if built.
- **The learning-harness taste:** Marlon's harness folder with a few held ideas, open in Claude Desktop's Code tab; `/learn` drawing its map; the [setup](../../learning/class/setup.md) link ready to hand out (HB's [taste card](../../learning/class/pointer-at-the-closer.md)).
- **11:00 on Wednesday:** reader app running (http://localhost:3111) with `/game/play/data-center` and `/game/play/normal-technology` played through once; *Paperclips* loaded on every table laptop while on Wi-Fi; Risk set up on its table; a set-up photo of each board taken; camera for the sixty-second statements set up as for reflection videos.

## Opening order for Marlon (TD's proposal)

1. The deck on the wall, then card 01 in hand: tic-tac-toe, "whoever makes three in a row loses."
2. The boards on their tables, camera above one of them.
3. `decisionproblem.com/paperclips` → developer tools → Local Storage → `saveGame`.
4. http://localhost:3111/game, then `/game/play/data-center` and `/game/play/normal-technology`.
5. The class repo open in Claude Code, asking "What is in this game, and where does each part live?"
6. The harness folder in Claude Desktop, then `/learn` on the same folder: the taste and the take-home.
7. The deck again, by family, for the Final Project cards.

## If something fails in the room

- **Claude can't read a photo well:** students pin the photo themselves in PB's [*Photo to game state*](../../prototypes/hybrid/photo-to-game-state.md) (`/proto/hybrid/photo-to-game-state`), which turns pins into a state table and JSON; Claude's job becomes normalizing it.
- **The game breaks or the reader app won't run:** *Private goals* (`/proto/players/private-goals`) and *The committee* (`/proto/players/committee`) stand in for the two theories; the question stays the same (what does it argue, through which verb).
- **The class repo isn't ready, or installs stall:** pairs remix their own *Change one card* game on paper with Claude as the rules-writer, then one pair shows a remix of `economy/paperclip-loop` on the projector, done with Marlon at the keyboard.
- **Running long:** shorten the remix show-and-tell to two pairs; never cut the Final Project close or the take-home in it, which are the bridge to Dec 2.
- **The harness folder or `/learn` won't open:** skip the demo and give the take-home in two minutes with the setup link; the closer gets the time back.

**Ideas to say, not lecture:** mechanics are the verbs; a game is data; the argument is made through the play. The three research cards hold them, each linking what TH and HI wrote.

**The learning harness in this session.** Marlon, 13:40 Nov 15 (to HL, relayed by AL): "learning harness stuff will be thought of as 'game' for this week essentially." He chose a taste on Nov 18 and the starter as a take-home over Thanksgiving, shown Dec 2 (about 13:00, on HL's board, as HB records it). Putting the taste at 14:20, and the 5 minutes taken from the remix show, are TD's proposals ([plan-changes](plan-changes.md), item 13).

*Session agreed by Marlon at 08:10 (via AL); the run of show, swap timing, checklist and fallbacks are TD's proposals, Nov 15; the closer's new timing, 13:45 Nov 15.*
