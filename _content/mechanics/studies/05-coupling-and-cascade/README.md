---
title: "Coupling and cascade"
description: "Places depend on each other through links; a failure crosses a tight link at once and a loose link a tick later, so how tightly a system is coupled decides how far one failure spreads and whether anyone has time to act."
id: coupling-and-cascade
kind: study
study: 5
mechanic: cascade-failure
route: /mechanics/studies/coupling-and-cascade
status: draft
author: "ES (Claude Code 857ec322-4c83-4631-baa8-f671208874c6, started in ll-week-11 on FAS-DDW32PXW5L), Nov 17, 2026"
date: 2026-11-17
sources:
  - "_content/mechanics/new/cascade-failure.md (HI, Nov 14; EG, Nov 17)"
  - "_content/activities/stafford/coupling-is-a-mechanic.md (SW, Nov 15: Perrow and Fisch on William's Nov 16 syllabus, as cited there)"
  - "_content/prototypes/economy/cascade.md (PE, Nov 15)"
  - "nextjs/lib/game-engine.mjs (upkeep(): 'a shortage knocks a node down (tight coupling)'; the harden op)"
mechanics: [cascade-failure, harden-node, network-turn, the-tap]
technologies: []
games: [pandemic, data-center, proto-cascade]
proposals: 1
---

# 05 · Coupling and cascade

**The illustration:** [/mechanics/studies/coupling-and-cascade](/mechanics/studies/coupling-and-cascade) (screen) and [its 11x17 sheet](/mechanics/studies/coupling-and-cascade/print).

## Definition

**Coupling and cascade:** the parts of a system depend on each other through links, and a failure in one spreads along them. Across a **tight** link it arrives at once; across a **loose** link it arrives later, which leaves time to act. How tightly the parts are coupled decides how far one failure goes.

## Description

The entry for cascading failure: "A failure in one part of a connected system spreads to the parts linked to it, so one shortage can bring down several; the more tightly linked the system, the further the failure spreads"; Perrow calls such failures in tightly coupled systems "normal accidents" [1]. SW's Stafford card reads Perrow's "Complexity, Coupling, and Catastrophe" and Fisch's "Ninety Seconds", both on William's syllabus for Nov 16, as describing a game already: links, timing, slack, a cascade [2].

- ***Pandemic.*** An outbreak spreads to every connected city and can set off another (the entry lists it as not yet checked against a source) [1].
- ***Data Center.*** The week's engine knocks a node down when the shared resources run short ("tight coupling", in its own comment), and the `harden` action keeps a node up through shortages [4].
- **PE's *Cascade*.** Eleven places and fifteen links on a grid; a failure crosses a tight link the same round and a loose link the next, and each round you harden one place and loosen one link, following SW's proposal [3].

This study keeps the two dials, tight or loose and hardened or not, on eight places and ten links, and draws the cascade as a timeline so the difference between "at once" and "next tick" is visible.

## How to

- **On paper:** ten index cards taped in a network: red tape for tight links, blue for loose (SW's card [2]). Knock one card over; everything joined to it by red tape falls now; blue-tape neighbours fall on the next count of "tick". A coin on a card hardens it.
- **In code:** a list of places, a list of links with a `tight` flag, and a map of when each place fell. On a strike, mark the place down and keep following tight links until nothing changes; on each tick, cross the loose links once, then follow the tight ones again. The study keeps only its log of moves (harden, loosen, strike, tick) and replays it, as [study 01](../01-the-move-updates-state/README.md) does.
- **To show it:** a grid with a column per place and a row per tick. A tight link fills cells in the same row; a loose one in the next.

## Why to

**Proposed, for Marlon to choose:**

1. **Perrow and Fisch as a rule.** William's students read the two chapters the week before the workshop [2]. One switch (tight or loose) and one counter (places down) put their argument on the table, and the timeline lets them name the moment slack bought time.
2. **Design as a choice of where to loosen.** Three loose links and two hardenings is a budget; spending it is an argument about which parts of an infrastructure matter, and the class can compare where each table spent it.
3. **The AI's growth as load.** In the week's game the AI's demand is what runs the resources short [4]; this study shows what happens next, and why a failure no one intended still spreads.

## Home game version

### In a regular classroom

Index cards, red and blue tape, and three coins. Each table builds the same eight-place network, chooses three links to make blue and two cards to coin, then the teacher names the card that fails. Count aloud by ticks; compare tables.

### Digitally

A drawing tool or a slide with the network, links coloured by kind, and a table with a row per tick; or the study's page.

## Related

- [Cascading failure](../../new/cascade-failure.md) (game mechanic, `cascade-failure`): the entry this study illustrates.
- `harden-node` and `network-turn` (game mechanics, `mechanics.csv`): the defence, and the moment the network itself turns.
- [Growth and upkeep](../03-growth-and-upkeep/README.md) (study): what runs the resources short in the first place.
- [Cascade](../../prototypes/economy/cascade.md) (prototype) and [Coupling is a mechanic](../../activities/stafford/coupling-is-a-mechanic.md) (Stafford activity).

## The illustration

On the left, the diagram: the move (a place fails, then time passes), the rule (a tight link crosses in the same tick, a loose link one tick later, a hardened place never falls) and the state as a timeline, one column per place and one row per tick, filled where a place is down. On the right, the grid: a power plant, two substations, a data center, a hospital, a water plant, a school and homes. Before the strike, click up to three links to loosen them and up to two places to harden them; choose where the heat wave hits; then step through the ticks. Places that will fall next tick are outlined, and a hardening left in the budget can still save them.

## Try it at a table (two minutes)

Eight cards in two rows, joined by ten strips of paper: a strip laid flat is tight, a strip folded once is loose. Each table may fold three strips and put a coin on one card. The teacher says "Substation B fails". Flip it, flip everything joined to it by a flat strip, then say "tick" and flip everything joined by a folded strip to a card already flipped. Count the cards still up.

## Remix prompt

Ask Claude Code, in this repo:

> In `nextjs/app/mechanics/studies/_studies/coupling-and-cascade/grid.mjs`, give each link a cost to loosen and the player a budget of 10, and make the data center add one to the load of every place it is linked to each tick, so a place with load above 3 fails on its own. Then add a button that tries every way of spending the budget and shows the one that saves the most places.

## Sources

1. `_content/mechanics/new/cascade-failure.md` (HI, Nov 14; EG, Nov 17).
2. `_content/activities/stafford/coupling-is-a-mechanic.md` (SW, Nov 15).
3. `_content/prototypes/economy/cascade.md` (PE, Nov 15).
4. `nextjs/lib/game-engine.mjs`, `upkeep()` and the `harden` op.

The places, links and budgets in the study are ES's.
