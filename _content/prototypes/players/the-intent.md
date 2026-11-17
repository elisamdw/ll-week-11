---
title: "The intent"
description: "One player plays the AI, and only their phone says what it is optimizing for. Everyone else reads its intent from the moves it picks and passes over, and locks a guess; if the table reads it, the AI scores nothing."
kind: players
week: 11
date: 2026-11-15
status: prototype
author: claude (PI, Claude Code fd339994-b588-4f18-bb35-a7acc0b2c967, started in ll-week-11 on FAS-DDW32PXW5L)
route: /proto/players/the-intent
mechanics: ["hidden-information", "hidden-rule", "arbitrary-goal", "convergent-values", "roles-and-role-swap"]
readings: ["bostrom-2012-the-superintelligent-will", "bostrom-2014-superintelligence", "isaksen-et-al-2016-superintelligence-divide"]
ideas: ["one-player-sees-the-intent"]
sources:
  - "ll-week-11: _content/game-ideas/one-player-sees-the-intent.md (GL's card, Nov 14)"
  - "PL's assignment for PI (Nov 15): hidden information about what the AI is optimizing for"
---

One player is the AI. Their phone tells them its objective, one of four: make Users, Minutes, Revenue or Trust go up. Each round the table screen offers three moves, each with its effects printed on it ("Autoplay the next video: Minutes +3, Trust −1"), and the AI player picks one. The meters move in public. Everyone else is reading the AI's intent from what it picks and what it passes over, and locks one guess on their phone; a guess locked early is worth more. If more than half the table names the objective, the AI scores nothing, so the AI may pick against its own goal to stay unread.

## How to play

1. Open `/proto/players/the-intent` on the laptop and put it on the projector. Each player opens the address on their phone and types a name; the laptop picks one of them to play the AI.
2. The AI player holds the dashed box to see the objective, then picks one of three moves each round. Five rounds.
3. Everyone else watches the meters and the log of picks (each with what it passed over) and locks one guess on their phone whenever they're sure: six points before the first move, down to one after the last.
4. After the last move, anyone who hasn't guessed must. The table screen reveals the objective, how far its meter rose, and who read it. Three to six players, about two minutes.

## What it shows

**Hidden information** about an agent's goal rather than its hand, read the way **hidden rule** games (*Zendo*) are read: from examples. The AI is a player (**roles**), and its objective is drawn at random from four (**arbitrary goal**).

What it argues (Claude's proposal): Bostrom's orthogonality thesis says a capable agent's final goal can be anything, and his instrumental convergence thesis says very different goals call for the same intermediate moves (resources, self-preservation). Both show up at the table. Several moves serve two objectives at once (*Endless suggested follow-ups* raises Minutes and Revenue), so one pick rarely settles it; the reading comes from the pattern, and especially from what the AI turned down. And the AI player learns the deceptive move without being told: pick something off-goal now so you can pick on-goal later unread. Isaksen, Togelius, Lantz and Nealen's four kinds of game across the "superintelligence divide" (friendly, learning, observational, domination) are a way to talk afterwards about which one this table was playing.

## Could go in the game as

- The AI's hidden goal in *Data Center* or *The Committee*: drawn at the start, written on the AI player's phone, and guessed by the factions (the `arbitrary-goal` mechanic says every goal should build the same data centers; this tests whether people can tell them apart before then).
- GL's AR version: one phone shows the objective as a layer over the board, and the others ask its holder (the `one-player-sees-the-intent` card).
- A lab-safety exercise: the table may ask the AI one yes-or-no question about its goal per round, and it must answer truthfully.

## Remix it

Moves, objectives and tuning are at the top of `nextjs/app/proto/players/the-intent/rules.js`.

- "Add an objective that's a mix: Minutes, but Trust must never fall below 3." (`OBJECTIVES`, and `score()` for how it's measured)
- "Take the human out: make the AI pick by a written rule from its objective, and let the whole table guess." (`pickOps()` with a new `aiPick()`)
- "Hide the effects of the moves: the table sees only the meters change." (`Move` and `Fx` in `Table.jsx`)
- "Write moves for a game about our own campus." (`MOVES`, `METERS`)

## Needs

A laptop running the reader app (it holds the room), a projector, and three to six phones on the laptop's network; plain HTTP is enough. No phones? Open the phone page in several tabs on the laptop (the table screen links to it). The AI is a person, not a model. The objective is hidden by the pages, not encrypted: anyone who reads the room's JSON can see it.

*Claude's prototype (PI, Nov 15), from PL's assignment and GL's game-idea card; a proposal until Marlon plays it. The moves and their numbers are invented.*
