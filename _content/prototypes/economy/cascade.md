---
title: "Cascade"
description: "A small grid where an overloaded place fails and pushes its load onto its neighbors: at once across a tight link, next round across a loose one. The AI's data centers draw more each round, a heat wave lands somewhere announced, and each round you harden one place and loosen one link."
kind: economy
week: 11
date: 2026-11-15
status: prototype
author: claude (PE, Claude Code 60324eb3-05fc-4804-ae52-5dde0d4b32c8, started in ll-week-11 on FAS-DDW32PXW5L)
route: /proto/economy/cascade
mechanics: ["cascade-failure", "harden-node", "escalation", "present-harms-track"]
readings: ["perrow-1984-normal-accidents", "easterling-2014-extrastatecraft", "star-1999-ethnography-of-infrastructure", "hogan-2015-data-flows-and-water-woes"]
ideas: ["see-the-data-centers", "the-invisible-flows"]
needs: "One laptop or projector; alone or with the room deciding. Runs offline."
sources:
  - "ll-week-11: _content/mechanics/mechanics.csv (cascade-failure, harden-node)"
  - "ll-week-11: _content/game/_rulesets/data-center.json (the shortage rule and the harden action this isolates, GL, Nov 14)"
  - "SW's request, relayed by PL on Nov 15: a failure crosses a tight link the same round and a loose link the next, and players choose which links to loosen"
---

Eleven places on a grid: a power plant, three substations, two AI data centers, a hospital, a water plant, two neighborhoods and a school, joined by fifteen links. Each place carries a load and has a capacity. When a place's load passes its capacity it goes down, and its load is split among the places it is linked to. Across a **tight** link the load arrives at once and can knock the neighbor down in the same round. Across a **loose** link it arrives next round, announced on the map, when you can prepare for it. Each round the data centers draw 25% more (and so do the substations that feed them), and a heat wave adds load to one place, announced in advance. Before each round you harden one place (+2 capacity for good) and loosen one tight link (for good).

## How to play

1. Open `/proto/economy/cascade` and choose how the grid starts: **every link tight** (you choose which to loosen) or **every link loose** (to compare).
2. Read where the heat wave will land and what is arriving over loose links. Click a place to harden it and a tight link to loosen it.
3. Press **Run the round** and watch the cascade, one step at a time. Load that has nowhere to go is lost and counts as harm; the hospital or water plant going down adds 3 more.
4. **Repair and go to the next round.** Six rounds, or until harm reaches 30. Then try the other start. About two minutes a game.

Simulated with the page's own code and played in headless Chrome. With every link tight and no actions, the north substation fails in round 1 at no cost (its load moves on and its neighbors hold), then nine places fail in round 2 and the region breaks. With every link loose and no actions, failure spreads one step a round and the region breaks in round 6. Hardening the most loaded place each round but loosening nothing breaks in round 5. Hardening the most loaded place and loosening a tight link beside it each round gets through six rounds with harm 10; hardening the heat-wave site and loosening the same way gets through with harm 3. Loosening the links around the hospital and water plant instead doesn't help.

## What it shows

Mechanics from `mechanics.csv`: **cascading failure** (no one has to intend the harm; coupling turns a shortage into an outage) and **harden a node** (protect the system rather than hunt the AI), under **escalation** (the AI's draw compounds), with harm as the **present-harms track**.

What it argues (Claude's proposal): the links are Perrow's argument in *Normal Accidents*, which the bibliography summarizes as accidents being normal in systems that are both interactively complex and tightly coupled. Tight links leave no time to intervene: the first failure costs nothing and hides the risk, and the next takes the grid in one round. Loose links don't stop a failure, they slow it down to one step a round, which is time to act. The two actions need each other: capacity without slack breaks later, slack without capacity only delays the break. Where you put them matters more than which places you care about most, and in this grid the loaded places include the AI's data centers, so keeping the town's lights on means hardening the AI's infrastructure. Easterling's *Extrastatecraft* is the reading on infrastructure as a form of power that operates outside law, Star's "The Ethnography of Infrastructure" on infrastructure that is invisible until it breaks, and Hogan's "Data Flows and Water Woes" on a data center and a town sharing water.

What it leaves out: load is one abstract number, and none of it is lost while it has somewhere to go, so in a long collapse the load in transit piles up past anything a real grid would carry. Failed places come back each round, nothing sheds load on purpose, and the heat waves arrive in a fixed order.

## Could go in the game as

- The shortage rule in *Data Center*, made visible: when a resource runs short, show the cascade step by step on the map instead of resolving it in one line.
- Tight and loose links on the *Data Center* map, with a faction action to loosen one: the class compares a game where every link is tight with one where they chose.
- The `see-the-data-centers` and `the-invisible-flows` ideas: this map projected over a printed one, with the flows lighting up as a place goes down.

## Remix it

All in `nextjs/app/proto/economy/cascade/Cascade.jsx`; the tuning values, the places and the links are at the top.

- "Put our campus on the map instead: the libraries, the dining halls, the science center." (`PLACES`, `LINKS`)
- "Shuffle where the heat waves land, and only announce them one step ahead." (`HEAT_WAVES`, and the note above the map)
- "Make loose links absorb half the load as a local outage instead of delaying it." (the loose branch in `runRound()`)
- "Give the room three loosenings and no hardening, then the other way round." (`HARDEN_PER_ROUND`, `LOOSEN_PER_ROUND`)
- "Let a second player run the AI and choose which data center grows." (`AI_GROWTH`, and `runRound()`)

## Needs

One laptop or projector; one player, or the room deciding where to harden and what to loosen. Runs offline, no model calls. On a phone the map scrolls sideways.
