---
title: "Prices that move, at the table"
description: "A board game with its printed prices replaced by a shared phone screen: two rounds with fixed prices, two with prices that rise with demand, then the table says what changed."
kind: activity
audience: tdm155ai
week: 11
date: 2026-11-15
status: proposal
author: claude (TD, Claude Code 61b3561e-f12d-4cc0-a067-7256dd605f11)
duration: 30
group: tables
play: hybrid
materials: ["Monopoly (the deeds' prices covered or ignored), or a printed Data Center board", "a phone or laptop per table showing the prices", "PL's prototypes: /proto/hybrid/monopoly-with-live-rents or /proto/economy/prices-that-move (a shared spreadsheet as fallback)"]
mechanics: ["resource-management", "bottleneck", "escalation", "profitable-harm", "externality-card", "feedback"]
readings: ["bogost-2007-persuasive-games", "crawford-2021-atlas-of-ai", "hogan-2015-data-flows-and-water-woes", "sellers-2018-advanced-game-design"]
ideas: ["game-ideas/prices-that-move", "game-ideas/monopoly-with-live-rents", "game-ideas/rebalance-between-games", "game-ideas/gpu-chips"]
prototypes: ["economy/prices-that-move", "hybrid/monopoly-with-live-rents"]
activities: ["tdm155ai/take-apart-a-board-game", "tdm155ai/remix-with-claude-code"]
sources:
  - "ll-week-11: _context/orchestration/20261114/voice-handoff-back.md, section 6"
  - "ll-week-11: _content/game-ideas/prices-that-move.md, monopoly-with-live-rents.md, rebalance-between-games.md (GL)"
---

Marlon, Nov 14: "It could be fun for us to actually do a tabletop board game version of it as well as a video game version of it," and "definitely for my class." On the phone holding the values a board game prints: it allows "balancing the game on the fly," either as a one-time rebalance ("try playing it with a new set of constraints") or dynamically, "as in the real world, because prices change in response to demand." "For our AI game, these could be things like GPU prices or land prices."

**What students do**

1. **Fixed prices (8 min).** Play two rounds with the prices on the shared screen held still.
2. **Rebalance (4 min).** The table changes three prices once, as designers, to fix what felt broken. That is playtesting.
3. **Moving prices (10 min).** Two rounds where each purchase raises the price of what was bought (and, in the AI game, the AI's buying raises what everyone else pays).
4. **Debrief (8 min).** What did players do differently once prices moved? Who got squeezed? What does the price chart argue, without a word of theme?

**What it teaches:** the difference between the designer's move (rebalancing between games) and the game's own behaviour (a small economy), which the voice Claude noted on Nov 14. It is also the hybrid idea Marlon wants for his class: the board stays physical and simple, and the phone holds what a board can't.

**Prepare:** a board with its prices taken off it (cover the deeds' prices, or print a Data Center board), and the price screen (the prototypes below). If the laptop fails, a shared spreadsheet with one formula (price = base × (1 + 0.1 × units sold)) does the job; TD's number, to tune.

**Try it:** Monopoly's four railroads only, with the price on a phone rising $25 each time one is bought.

**What could go wrong:** the table spends its time on bookkeeping. Keep the moving prices to one category (railroads, or GPUs), and have one player run the screen.

**Prototypes (built Nov 15):** [*Monopoly with live rents*](../../prototypes/hybrid/monopoly-with-live-rents.md) (`/proto/hybrid/monopoly-with-live-rents`) is this activity's three steps on the LL's Monopoly: rents off the deeds and onto a screen and phones, printed, rebalanced between games, or rising with every landing. [*Prices that move*](../../prototypes/economy/prices-that-move.md) (`/proto/economy/prices-that-move`) is the AI-game version: the AI buys GPU, power and land first every round, and three human factions pay what's left. Both run offline on one laptop. The spreadsheet is only a fallback now.

*TD's proposal, Nov 15, from Marlon's Nov 14 words and GL's game-idea cards.*
