---
title: "Leaks"
description: "You turn power and water into compute for eight turns. The compute shows on your dashboard; the costs land as cards on distant places, which stay dark in the company's view until the end."
kind: economy
week: 11
date: 2026-11-15
status: prototype
author: claude (PE, Claude Code 60324eb3-05fc-4804-ae52-5dde0d4b32c8, started in ll-week-11 on FAS-DDW32PXW5L)
route: /proto/economy/leaks
mechanics: ["externality-card", "profitable-harm", "resource-management", "crafting-and-combining", "hidden-information"]
readings: ["crawford-2021-atlas-of-ai", "hogan-2015-data-flows-and-water-woes", "dyer-witheford-de-peuter-2009-games-of-empire", "star-1999-ethnography-of-infrastructure"]
ideas: ["the-invisible-flows", "see-the-data-centers"]
needs: "One laptop or projector; alone or with the room voting each turn. Runs offline."
sources:
  - "ll-week-11: _content/mechanics/mechanics.csv (externality-card, profitable-harm)"
  - "ll-week-11: the 'resource conversion with leaks' candidate in PE's brief (Nov 15)"
---

You run a data center for eight turns. Each turn you choose one way to turn power and water into compute: **water-cooled training** (the most compute), **air-cooled training** (no water, more power), **new chips** (a little compute now, more on every later training) or **off-peak training** (less compute, fewer costs). Compute is the only number your dashboard shows. Each choice also drops cards on places outside your fence: the town's aquifer, the farms downstream, the gas plant upriver, a mine far away, an e-waste yard. Each place breaks after a number of cards.

## How to play

1. Open `/proto/economy/leaks` and choose **The company's view** (the map past your fence is dark until the end) or **The map's view** (you see each card land, with a line about what it is).
2. Each turn, press one of the four actions. The room can vote.
3. After eight turns, the end screen sets the company's report beside the map: compute delivered, and every card and broken place.
4. Play again in the other view and compare what you chose. About a minute a game.

Played in headless Chrome. In the company's view, buying chips twice and then training water-cooled six times made 38 compute, the most this setup allows, and broke the town's aquifer and the farms downstream. In the map's view, a mix ending with off-peak training made 25 compute and broke nothing.

## What it shows

Mechanics from `mechanics.csv`: the **externality card** (each build draws a card placed on a distant place) and **profitable harm** (the most rewarding move is the one that costs others most), on a small **resource conversion** (**crafting and combining** power and water into compute). What the company can see is **hidden information**, and the two views are the same game with the information switched.

What it argues (Claude's proposal): a dashboard is a decision about what counts. In the company's view nothing on screen pushes you away from water-cooled training, because its costs fall outside the fence. That is Crawford's argument in *Atlas of AI*, that AI is made of minerals, energy and labor extracted elsewhere, and Hogan's in "Data Flows and Water Woes," where a data center's cooling draws on a dry state's water. The externality card itself comes from the mechanics list's reading of Dyer-Witheford and de Peuter's *Games of Empire*. Star's "The Ethnography of Infrastructure" is the reading for the fog: infrastructure goes unseen until it breaks, and it is relational, so the aquifer is infrastructure to the town and an input to the company.

The places, card lines and thresholds are illustrative, not data. The mine's cards name tantalum, tin and copper, which circuit boards use; real supply chains are longer and harder to trace than one line on a map.

## Could go in the game as

- The externality deck for *Data Center*: every time the AI spreads, a card lands on a place the factions didn't choose (the `externality-card` mechanic's own proposal).
- A **company faction** whose private screen is the company's view, while the other factions see the map.
- The `the-invisible-flows` idea: the same flows, seen through a phone over a printed map.

## Remix it

All in `nextjs/app/proto/economy/leaks/Leaks.jsx`; the actions, places and card lines are at the top.

- "Add a regulator who can move the fence outward one place per game, so its costs show on the dashboard." (`PLACES`, the fence and the fog)
- "Make broken places cost the company: a dry aquifer raises the water price." (`act()`, and the action list)
- "Write the cards for our own campus's servers and the places they draw on." (`PLACES`, `CARDS`)
- "Let the board fire the player if compute grows less than 10% a turn." (a check in `act()`)

## Needs

One laptop or projector; one player, or the room voting on each turn. Runs offline, no model calls. On a phone the map scrolls sideways.
