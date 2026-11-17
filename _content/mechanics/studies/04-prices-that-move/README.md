---
title: "Prices that move"
description: "No printed price: each purchase raises the price of the next, and a designer can change the rule during play; past sales stay at what was paid."
id: prices-that-move
kind: study
study: 4
mechanic: rebalancing-on-the-fly
route: /mechanics/studies/prices-that-move
status: draft
author: "ES (Claude Code 857ec322-4c83-4631-baa8-f671208874c6, started in ll-week-11 on FAS-DDW32PXW5L), Nov 17, 2026"
date: 2026-11-17
sources:
  - "_content/activities/tdm155ai/prices-that-move-at-the-table.md (TD, Nov 15, quoting Marlon's Nov 14 voice chat from _context/orchestration/20261114/voice-handoff-back.md)"
  - "_content/mechanics/new/rebalancing-on-the-fly.md (EG, Nov 17, quoting Marlon, Nov 16, 17:31, voice agent's record)"
  - "_content/prototypes/economy/prices-that-move.md and nextjs/app/proto/economy/prices-that-move/ (PE, Nov 15)"
  - "_content/mechanics/mechanics.csv, rows resource-management (27) and escalation (11)"
mechanics: [rebalancing-on-the-fly, resource-management, escalation, the-tap]
technologies: []
games: [proto-monopoly-with-live-rents]
proposals: 1
---

# 04 · Prices that move

**The illustration:** [/mechanics/studies/prices-that-move](/mechanics/studies/prices-that-move) (screen) and [its 11x17 sheet](/mechanics/studies/prices-that-move/print).

## Definition

**Prices that move:** a price is computed from the game state rather than printed on the board, so every purchase changes what the next one costs. When the rule that computes it can itself be changed during play, the game is **rebalanced on the fly**.

## Description

A board game prints its prices: a Monopoly deed costs what it says on the card, all game. A price held on a screen can follow demand instead. Marlon, Nov 14 (voice chat, as recorded in TD's activity card): prices on a phone could change "as in the real world, because prices change in response to demand", which is "hard to cope with in a tabletop game"; it allows "balancing the game on the fly"; "For our AI game, these could be things like GPU prices or land prices" [1]. And Nov 16, 17:31 (voice agent's record, quoted in EG's entry): "You can rebalance the game as gameplay develops. In a game like Monopoly, that means inflation, or differential pricing" [2].

- **Monopoly with live rents.** The week's prototype moves the rents off the deeds onto a screen, so they can be rebalanced between games or rise with every landing [2].
- **Prices that move.** PE's prototype has three markets (GPUs, power, land) whose prices rise with every unit sold; the AI buys first at any price, and the human factions pay what is left [3].
- **Balance patches and house rules.** EG's entry lists live-service games that change their numbers between versions and tables that change a rule between games [2].

This study keeps one market and two buyers, so the two parts are visible on their own: the price that moves with demand (escalation, in the deck's terms: "Each round asks a little more than the last" [4]) and the designer who changes the rule during play.

## How to

- **On paper:** write the price rule on an index card in the middle of the table ("the next GPU costs 2 plus 1 for every GPU sold") and keep a tally of GPUs sold beside it. To rebalance, cross out a number on the card and write the new one; the tally stays.
- **In code:** hold the rule's numbers (`base`, `slope`) in the state, compute `price = base + slope * sold` whenever it is needed, and write a designer's change as a row in the log like any purchase. The study replays its log the same way [study 01](../01-the-move-updates-state/README.md) does.
- **On a phone at a board:** the board keeps the pieces, the phone holds the prices (TD's activity, *Prices that move, at the table* [1]).

## Why to

**Proposed, for Marlon to choose:**

1. **Playtesting as a move.** Students see that a game's balance is a number someone chose, and that changing it mid-game is a design act they can make and argue about (EG's entry proposes a class vote on one number [2]).
2. **Demand made visible.** The chart shows each sale as a dot at the price paid: who bought first paid less. In the Stafford game, an AI that buys first at any price raises what every other faction pays [3].
3. **The bridge from board to screen.** A printed price cannot move; a price on a screen can. It is a small, clear case of what moving a game element into a device changes, the week's thread from board games to game state.

## Home game version

### In a regular classroom

An index card with the price rule, a tally of sales, and play money or paper clips. Two buyers alternate; after four sales, the teacher (as designer) changes one number on the card, and the class says who gained and who lost by it.

### Digitally

A shared spreadsheet: a cell for `base`, a cell for `slope`, one row per sale with the price computed from the row number, and a chart of the price column. Change a cell during play; the rows already written keep their prices if they were pasted as values.

## Related

- [Rebalancing on the fly](../../new/rebalancing-on-the-fly.md) (game mechanic, `rebalancing-on-the-fly`): the entry this study illustrates.
- [The move updates state](../01-the-move-updates-state/README.md) (study): a purchase and a rebalance are both rows in the log.
- [Growth and upkeep](../03-growth-and-upkeep/README.md) (study): another rule that decides when growth stops paying.
- [Prices that move](../../prototypes/economy/prices-that-move.md) and [Monopoly with live rents](../../prototypes/hybrid/monopoly-with-live-rents.md) (prototypes): the full versions.
- [Prices that move, at the table](../../activities/tdm155ai/prices-that-move-at-the-table.md) (TDM 155AI activity).

## The illustration

On the left, the diagram: the move (buy one), the state (GPUs sold, next price) and the rule (price = base + slope × sold), with an arrow back to the next buyer and the designer's hand on the rule; below, each GPU sold as a dot at the price paid, the rule now as a line and the rule at the start as a dashed line, and a mark wherever the designer changed a number. On the right, two buyers, the lab and the start-up, with thirty each and twelve GPUs on the market: buy or pass in turn. Two sliders change the base and the slope during play; set the slope to 0 for a printed price.

## Try it at a table (two minutes)

Two players, thirty paper clips each, twelve tokens for GPUs, and an index card: "next GPU costs 2 + 1 for each GPU sold". Take turns buying one or passing. After four sales, a third person (the designer) changes the 1 to a half, or the 2 to a 5, without asking. Play until the GPUs or the money run out. Who did the designer help?

## Remix prompt

Ask Claude Code, in this repo:

> In `nextjs/app/mechanics/studies/_studies/prices-that-move/market.mjs`, add a third buyer, the AI, who buys first every round at any price and has no budget. Then make the price rise with each sale by 10% instead of a fixed slope, and add a designer control for that percentage. Show the AI's purchases as a third colour of dot.

## Sources

1. `_content/activities/tdm155ai/prices-that-move-at-the-table.md` (TD, Nov 15, quoting Marlon's Nov 14 voice chat).
2. `_content/mechanics/new/rebalancing-on-the-fly.md` (EG, Nov 17).
3. `_content/prototypes/economy/prices-that-move.md` (PE, Nov 15).
4. `_content/mechanics/mechanics.csv`, rows `resource-management` (27) and `escalation` (11).

The numbers in the study (twelve GPUs, thirty each, base 2, slope 1) are ES's.
