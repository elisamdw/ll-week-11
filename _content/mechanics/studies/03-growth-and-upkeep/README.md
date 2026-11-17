---
title: "Growth and upkeep"
description: "A loop in which each new unit adds the same output but more upkeep than the one before, so growth pays up to a point and then costs; and who pays the upkeep decides whether the grower ever feels it."
id: growth-and-upkeep
kind: study
study: 3
mechanic: growth-and-upkeep
route: /mechanics/studies/growth-and-upkeep
status: draft
author: "ES (Claude Code 857ec322-4c83-4631-baa8-f671208874c6, started in ll-week-11 on FAS-DDW32PXW5L), Nov 17, 2026"
date: 2026-11-17
sources:
  - "_content/mechanics/mechanics.csv, rows incremental-growth (10), escalation (11), resource-management (27), profitable-harm (57), externality-card (77), bottleneck (90)"
  - "nextjs/lib/game-engine.mjs (upkeep(): nodes produce, the AI's nodes consume, the goal grows) and _content/game/_rulesets/data-center.json (ai.upkeep, perNode, acceleration)"
  - "_content/activities/stafford/the-cloud-has-a-watershed.md (Crawford 2021 and Hogan 2015, as cited there)"
  - "_content/prototypes/economy/paperclip-loop.md (PE, Nov 15)"
mechanics: [incremental-growth, escalation, resource-management, profitable-harm, externality-card, bottleneck]
technologies: []
games: []
proposals: 1
---

# 03 · Growth and upkeep

**The illustration:** [/mechanics/studies/growth-and-upkeep](/mechanics/studies/growth-and-upkeep) (screen) and [its 11x17 sheet](/mechanics/studies/growth-and-upkeep/print).

## Definition

**Growth and upkeep:** each unit a player builds produces something every round and costs something every round to keep. When the cost of each new unit rises faster than what it produces, growth pays up to a point and loses after it; when someone else pays the upkeep, the grower never reaches that point.

## Description

Most economic games are built from a few loops: something is produced, something is spent, and what is spent buys more production. The deck's cards name the parts: **resource management** ("Spend limited things to get what you want"), **incremental growth** ("Numbers grow by themselves, and the player tunes the rate"), **escalation** ("Each round asks a little more than the last") and **bottleneck inputs** ("the scarcest one sets its pace") [1]. This study puts two of them against each other: output that grows in a straight line, and upkeep that grows faster.

- ***Universal Paperclips* and idle games.** Production feeds more production, and the player tunes the rate [1]; PE's [paperclip loop](../../prototypes/economy/paperclip-loop.md) is the week's small version [4].
- **The week's game.** In *Data Center*, each round the AI's held nodes consume one energy and one water each, its goal grows by ten per node times a growth rate, and the rate is multiplied by 1.25 every round [2]. Its output compounds while its upkeep comes out of resources the human factions share. The AI never meets the point where growth stops paying, because it does not pay. The deck calls the two sides **profitable harm** ("The most profitable move for one faction is the one that hurts everyone") and the **externality card** (each AI build puts a cost on a distant node) [1].
- **Stafford.** The workshop's activity *The cloud has a watershed* cites Crawford (2021) on AI as an extractive industry of mines, energy and water, and Hogan (2015) on a data center's water [3]. In this study the switch "who pays the upkeep" is that argument as a rule.

## How to

- **On paper:** give each player a pile of tokens. Each round, a player may buy a unit for five; each unit pays four a round; upkeep is 1 for one unit, 3 for two, 6 for three, 10 for four (each unit costs one more than the last). Keep a running row per round on an index card: move, units, output, upkeep, cash.
- **In code:** two functions, `outputFor(n)` (a straight line, `4 * n`) and `upkeepFor(n)` (a curve, `n * (n + 1) / 2`), and one `step(state, move)` that applies a round. The study keeps only the list of moves and replays it, as in [study 01](../01-the-move-updates-state/README.md), so changing who pays replays the same moves under the other rule.
- **To show it:** draw both functions against the number of units. The best size is where the gap between them is widest; past the crossing, each unit loses.

## Why to

**Proposed, for Marlon to choose:**

1. **The shape of an argument.** Two lines on one chart (output straight, cost curved) carry the course's question about AI infrastructure: who pays for growth, and when do they notice. Students can read the argument in the rule, which is Bogost's procedural rhetoric in its plainest form.
2. **An optimizer in the room.** "Let the optimizer play" builds every round. With its own upkeep it goes broke in round 7; with the commons paying, it ends rich and the commons run dry in round 6. That is a two-minute demonstration of an objective that is not the table's.
3. **A remix with one number.** Changing the upkeep curve, the output per server or who pays changes what the game argues. It is a first remix for students who have not touched code.

## Home game version

### In a regular classroom

Tokens or paper clips, a printed table of upkeep by number of units, and an index card per player for the running rows. Play ten rounds; then play again with the upkeep paid from a shared pile in the middle of the table, and compare the cards.

### Digitally

A spreadsheet with one row per round (move, units, output, upkeep, cash) and a chart of output and upkeep against units; or the study's page.

## Related

- [Growth and upkeep](../../new/growth-and-upkeep.md) (game mechanic, `growth-and-upkeep`): the entry this study illustrates.
- [The move updates state](../01-the-move-updates-state/README.md) (study): the run is its moves replayed.
- `incremental-growth`, `escalation`, `resource-management`, `bottleneck` (game mechanics, `mechanics.csv` rows 10, 11, 27, 90): the loop's parts.
- [Profitable harm](../../new/profitable-harm.md) and [Externality card](../../new/externality-card.md) (game mechanics): when the upkeep falls on someone else.
- [The paperclip loop](../../prototypes/economy/paperclip-loop.md) (prototype): production feeding production.

## The illustration

On the left, the diagram: the servers, the builder's cash and the commons, with output flowing to the cash and upkeep flowing from whichever pays it; below, output and upkeep plotted against the number of servers, with a line at the current count. On the right, the game: ten rounds, build a server for five or hold, a row per round (losing rounds in colour), a switch for who pays the upkeep, and a button that lets an optimizer play (it always builds).

## Try it at a table (two minutes)

Each player starts with one unit and ten tokens. Each round, say "build" (pay five) or "hold"; then collect four per unit and pay upkeep: 1, 3, 6, 10, 15, 21, 28 for one to seven units. Play five rounds and see who stopped where. Then play five more with the upkeep paid from a shared pile of sixty in the middle: who stops now?

## Remix prompt

Ask Claude Code, in this repo:

> In `nextjs/app/mechanics/studies/_studies/growth-and-upkeep/loop.mjs`, make each server's output grow by 10% a round (the AI's acceleration in the Data Center ruleset), keep the upkeep curve, and add a third payer, "split", where the builder and the commons each pay half. Then add a line to the chart for the commons, and tell me in which round each payer's version breaks.

## Sources

1. `_content/mechanics/mechanics.csv`, rows `incremental-growth` (10), `escalation` (11), `resource-management` (27), `profitable-harm` (57), `externality-card` (77), `bottleneck` (90).
2. `nextjs/lib/game-engine.mjs`, `upkeep()`, and `_content/game/_rulesets/data-center.json` (`ai.upkeep`, `perNode`, `acceleration`).
3. `_content/activities/stafford/the-cloud-has-a-watershed.md`.
4. `_content/prototypes/economy/paperclip-loop.md` (PE, Nov 15).

The numbers in the study (build cost 5, output 4 per server, upkeep 1+2+…+n, a commons of 60) are ES's, chosen so the crossing falls inside ten rounds.
