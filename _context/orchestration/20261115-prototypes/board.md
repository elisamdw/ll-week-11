---
title: "Board: Nov 15 · W11 prototypes"
author: claude (PL, Claude Code 04e57537-0dc4-43e0-83a5-f3a62b43db9d, started in ll-week-11 on FAS-DDW32PXW5L)
date: 2026-11-15
---

# Board: Nov 15 · W11 prototypes

Run `20261115T125743966Z-311d6019` (plan `prototypes.json` in The Notebook at `_context/projects/50-in-focus/ll-weeks/fall-2026/11-ending-20261120/days/20261115/prototypes/`), launched about 07:57 EST on the HUIT laptop (`FAS-DDW32PXW5L`) by MZ ("Nov 13 · meta", Claude `49dde539-b11a-4f3a-ac50-30bc088beedf`). Beside it runs "Nov 15 · W11 activities" (AL, Claude `ceddf595-475f-4673-8bb2-6cc361aa8f9e`), in the same repo. Reader app: http://localhost:3111 (PL runs it); the playground is http://localhost:3111/proto.

Marlon, Nov 15, 07:52: "then in the other workspace we want to work on prototypes of game mechanics---I don't think I want one single game for right now. Instead I want some playable examples of things we MIGHT want to include in the game."

## Panes

All four started in `/Users/marlonkuzmick/Development/mk-27/apps/the-notebook/apps/ll-weeks/ll-week-11`.

| ID | Pane | Provider | Thread | Owns | Status |
| --- | --- | --- | --- | --- | --- |
| PL | lead: board, commits, `/proto` index, shared room state, dev server | Claude Opus 5.5, high | `04e57537-0dc4-43e0-83a5-f3a62b43db9d` | `README.md`, this folder, `_content/prototypes/README.md` and `_layouts/`, `nextjs/app/proto/page.jsx` and `_shared/`, `nextjs/app/api/proto/`, `nextjs/package.json`, the lockfile, layout, home page, components | shortlist sent; room-state helper up |
| PE | economy and the AI as a system | Claude Opus 5.5, high | `60324eb3-05fc-4804-ae52-5dde0d4b32c8` | `nextjs/app/proto/economy/`, `_content/prototypes/economy/` | building prices-that-move |
| PI | information and players | Claude Opus 5.5, high | `fd339994-b588-4f18-bb35-a7acc0b2c967` | `nextjs/app/proto/players/`, `_content/prototypes/players/` | committee done; building private-goals |
| PB | the body, the room and hybrid play | Claude Opus 5.5, high | `107470fa-4f33-4186-8608-7c9ad82099d4` | `nextjs/app/proto/hybrid/`, `_content/prototypes/hybrid/` | building every-tap-is-a-row |

Resume: `claude --resume <thread>` from the start directory above, on this machine only.

## Prototypes

The first shortlist, 08:00 EST: PL's picks (proposals, not Marlon's), four per family, chosen from `_content/mechanics/mechanics.csv` and `_content/game-ideas/` for the week's threads: the AI as a system, game state, and hybrid play. Builders started on 1 and 2 of each family without waiting for approval; Marlon redirects. Requests from the activities workspace are noted.

| # | route | card | family | mechanics | ideas | status |
| --- | --- | --- | --- | --- | --- | --- |
| E1 | `/proto/economy/prices-that-move` | `economy/prices-that-move.md` | economy | resource-management, bottleneck, escalation, profitable-harm, present-harms-track, adoption-only | prices-that-move, gpu-chips | **ready** 08:06 (`6f1b6af`), PL played it to game over (Data Center setting) |
| E2 | `/proto/economy/paperclip-loop` | `economy/paperclip-loop.md` | economy | incremental-growth, automate-this, three-phase-arc | a-pile-of-paperclips | **ready** 08:24; PL played it to the end (all of Earth's iron at 0:53, phase change at 0:15) |
| E3 | `/proto/economy/cascade` | `economy/cascade.md` | economy | cascade-failure, harden-node, network-turn | the-invisible-flows | **ready** 08:30; each link tight or loose (Perrow, SW's rule: a failure crosses a tight link the same round, a loose one the next); harden one place and loosen one link a round, a heat wave; PL played tight with no hardening: the region broke in round 2 |
| E4 | `/proto/economy/the-race` | `economy/the-race.md` | economy | compute-cap, rival-lab, escalation | | **ready** 08:30; two labs choose in secret, a shared clock, a treaty with inspectors; PL played both sprinting: the clock ran out in round 4 |
| I1 | `/proto/players/committee` | `players/committee.md` | players | voting-and-the-collective-decision, ai-advisor, oversight-branch | | **ready** 08:03 (`a3339af`), PL played it to the end in self mode |
| I2 | `/proto/players/private-goals` | `players/private-goals.md` | players | hidden-information, private-metric, hidden-role-and-social-deduction, alliance-and-betrayal | private-goals-on-your-phone, faction-badges | **ready** 08:07, the first on the room helper; PL played a table and three phones to the naming of the AI |
| I3 | `/proto/players/the-readout` | `players/the-readout.md` | players | hidden-rule, turn-order, treacherous-turn | the-turn-only-the-phone-knows, one-player-sees-the-intent | **ready** 08:10 (`7e598d2`); PI named it the-readout (planned as the-turn-only-the-phone-knows); PL played a table and three phones to the end |
| I4 | `/proto/players/the-phone-plays-the-ai` | `players/the-phone-plays-the-ai.md` | players | network-turn, readable-personalities, turn-order, cooperation, convergent-values | the-phone-plays-the-ai | **ready** 08:30; the AI's seat draws a card and spreads by a rule it reads aloud; PL played three rounds |
| I5 | `/proto/players/the-intent` | `players/the-intent.md` | players | hidden-information, asymmetric-information, ai-stance | one-player-sees-the-intent | **ready** 08:14, from the reserve (PI built it before my redirect reached it); one player is the AI with a secret objective, the others read it from its picks; PL played a table and three phones to the reveal |
| I6 | `/proto/players/deadline` | `players/deadline.md` | players | trading-and-negotiation, timer-and-countdown, hidden-information | | **ready** 08:30, from the reserve: a private set per phone, phone-to-phone trades, the AI buys any token at a rising price; PL played three phones to the deadline |
| H1 | `/proto/hybrid/every-tap-is-a-row` | `hybrid/every-tap-is-a-row.md` | hybrid | resource-management, bottleneck, turn-order, timer-and-countdown, rewind-and-do-over | every-tap-is-a-row | **ready** 08:06 (`af839ab`), PL played a 90-second round to the findings |
| H2 | `/proto/hybrid/photo-to-game-state` | `hybrid/photo-to-game-state.md` | hybrid | movement-and-position, territory-and-area-control | photo-to-game-state, index-cards-that-answer | **ready** 08:11; you are the vision model: pin pieces on an overhead photo (or a drawing), get a table and JSON, diff two photos; Monopoly and a card table; PL played the Monopoly example A to B |
| H3 | `/proto/hybrid/monopoly-with-live-rents` | `hybrid/monopoly-with-live-rents.md` | hybrid | resource-management, rebalance | monopoly-with-live-rents, rebalance-between-games | **ready** 08:24; PB named it monopoly-with-live-rents (planned as live-rents; TD told); printed, rebalanced or live rents on the phone; PL logged landings and ended a round on the host |
| H4 | `/proto/hybrid/the-room-is-the-board` | `hybrid/the-room-is-the-board.md` | hybrid | location-play, zones-and-spatial-triggers | the-room-is-the-board | **ready** 08:30; webcam bodies (MediaPipe from jsdelivr, pinned 1.1.1) or drag stand-ins; PL played four turns with stand-ins; camera tested by PB only with Chrome's fake camera |

All twelve on the first shortlist are built, plus two from the reserve (I5, I6).

## Second batch, 08:30 (PL's picks)

| # | route | family | from | status |
| --- | --- | --- | --- | --- |
| E5 | `/proto/economy/leaks` | economy | SW's ask: resource conversion with leaks (power and water into compute, costs land elsewhere; externality-card) | **ready** 08:32; PL played eight water-cooled turns: 32 compute, two places broke |
| I7 | `/proto/players/place-to-commit` | players | game idea place-to-commit: everyone commits orders in secret on their phone, all reveal at once | **ready** 08:37; PL played three phones and three rounds to the end |
| H5 | `/proto/hybrid/the-audience-layer` | hybrid | game idea the-audience-layer: spectators' phones see and nudge a projected game (useRoom) | **ready** 08:37; PL played two rounds on the stage with stand-in hints and feeds (no phone) |

In reserve: marker-corners and index-cards-as-targets (need a marker-detection library; ask Marlon), an NFC version of the room (when the kit is here).

## Shared code

- **Room state for several devices** (08:00): `nextjs/app/api/proto/room/<family>/<slug>/<room>` (GET, PUT, PATCH with ops `set`, `merge`, `push`, `inc`, `unset`, DELETE), kept in memory and written through to the gitignored `_raw/proto-rooms/`. Client: `useRoom`, `useRoomCode`, `usePlayer`, `useJoinUrl` in `nextjs/app/proto/_shared/room.js`, and `JoinBox.jsx` (room code and the address phones open). `/api/proto/host` gives the laptop's network address.
- Nav (08:32): Learn (`/learn`, HB's route from the "Nov 15 · Learning harness" workspace) added at HB's request.
- Nav (08:06): Playground (`/proto`), Prototypes (AL's card views, `/prototypes`), Activities (AL's `/activities`).
- `nextjs/next.config.mjs` now allows the laptop's LAN addresses as dev origins, so phones on the same network can load pages (08:01; dev server restarted, AL told first).

## Handoffs

In the run folder (`mk-orchestration/_output/orchestration/20261115T125743966Z-311d6019/w11-prototypes/<ID>/`, gitignored, this laptop only): PL and PB `handoff.json`. PE and PI submitted `handoff.json` before their last work; the submit helper refuses a second complete handoff, so their current accounts are `handoff.draft.json` beside it (PE: through `a83c4f4`; PI: through `1f8ef55`).

## Checkpoints

| time | ll-week-11 | Notebook pointer | what |
| --- | --- | --- | --- |
| 08:02 | `c1850ce` | `c3cd0d8` | board and shortlist (12), `/proto` playground, room state for phones (`/api/proto`), Prototypes nav link, LAN dev origins |
| 08:03 | `a3339af` | `e03c353` | I1 the committee (PI) |
| 08:06 | `af839ab` | `b696bf3` | H1 every tap is a row (PB) |
| 08:06 | `6f1b6af` | `ed1dffe` | E1 prices that move (PE); nav for Playground, Prototypes, Activities |
| 08:07 | `588a4e2` | `3378f39` | I2 private goals on your phone (PI) |
| 08:10 | `7e598d2` | `d6070d9` | I3 the readout (PI) |
| 08:11 | `9f83071` | `88578c9` | H2 photo to game state (PB) |
| 08:14 | `4b5eb04` | `669b20b` | I5 the intent (PI) |
| 08:24 | `4934993` | `98febfa` | E2 the paperclip loop (PE), H3 Monopoly with live rents (PB) |
| 08:30 | `45e26c5` | `4a23c51` | E3 cascade, E4 the race (PE); I4 the phone plays the AI, I6 deadline (PI); H4 the room is the board (PB); second batch on the board |
| 08:32 | `db36e80` | `c45b625` | E5 leaks (PE); Learn nav link |
| 08:35 | `a83c4f4` | `f1a605e` | paperclip loop: fixed control slots (PE); cascade's per-link coupling was already in `45e26c5` |
| 08:37 | `1f8ef55` | `320b5b6` | I7 place to commit (PI), H5 the audience layer (PB): seventeen ready |

## Waits on Marlon

- The shortlist: redirect any of the twelve (builders have started on 1 and 2 of each family).
- Try the multi-device prototypes on real phones, and the-room-is-the-board's camera with real people, before class: PL has tested them only in headless Chrome on the laptop.
- PB asks: has the NFC kit (USB reader and NTAG213 stickers) arrived? PB builds the keyboard path first either way.
