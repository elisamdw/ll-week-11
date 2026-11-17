---
title: "Prices that move"
description: "No printed prices: the screen holds GPU, power and land prices, the AI buys first every round at any price, and three human factions pay what's left."
kind: economy
week: 11
date: 2026-11-15
status: prototype
author: claude (PE, Claude Code 60324eb3-05fc-4804-ae52-5dde0d4b32c8, started in ll-week-11 on FAS-DDW32PXW5L)
route: /proto/economy/prices-that-move
mechanics: ["resource-management", "bottleneck", "escalation", "profitable-harm", "present-harms-track", "adoption-only"]
readings: ["crawford-2021-atlas-of-ai", "hogan-2015-data-flows-and-water-woes", "bogost-2007-persuasive-games", "narayanan-kapoor-2024-ai-snake-oil", "ceglowski-2016-superintelligence-the-idea-that-eats-smart-people"]
ideas: ["prices-that-move", "gpu-chips", "monopoly-with-live-rents"]
needs: "One laptop or projector; one to three players at the keyboard. Runs offline."
sources:
  - "ll-week-11: _context/orchestration/20261114/voice-handoff-back.md (Marlon on prices held on a phone, Nov 14)"
  - "ll-week-11: _content/game/_rulesets/data-center.json and normal-technology.json (AI growth of 1.25 and 1.05 a round, GL, Nov 14)"
---

Marlon, in the Nov 14 voice chat: on a phone, prices could change "as in the real world, because prices change in response to demand," which is "hard to cope with in a tabletop game"; "For our AI game, these could be things like GPU prices or land prices or whatever." This prototype is that price board on its own, without the rest of the game.

Three markets (GPUs, power, land) each have a supply and a base price. Every unit sold pushes the price up a curve, and the AI buys first: each round it wants more data-center sites, and its investors pay any price. Then the hospital, the university lab and the housing co-op buy what they need from what's left. What they can't get counts as harm.

## How to play

1. Open `/proto/economy/prices-that-move` and pick how fast the AI's demand grows: **Data Center** (25% a round) or **Normal Technology** (5%). These are the two numbers from yesterday's rulesets.
2. Each player takes a faction. Each round, read what the AI bought, then press **Buy 1** until your needs are covered or your money runs out. Whoever buys first pays less, since your purchases raise the price too.
3. Press **End round.** Unmet needs become harm; spare units carry over, so buying ahead is an option if you can afford it.
4. Eight rounds, or until harm reaches 8. Then play the other setting and compare the two charts. About two minutes a game.

Tested (headless Chrome and a simulation of the same code, buying only what's needed): with Data Center the region holds until round 5, starts to go short in round 6, and breaks in round 8, by which point land is sold out to the AI. With Normal Technology no need goes unmet, and the prices fall as supply grows faster than the AI's demand.

## What it shows

Mechanics from `mechanics.csv`: **resource management** and **bottleneck inputs** (each AI site needs GPUs, power and land, and land has a fixed supply), driven by **escalation** (the AI wants more each round). Harm is the **present-harms track**, and the AI's buying is **profitable harm** seen from the seller's side: every unit it buys is a sale.

What it argues (Claude's proposal): no one in the game decides that the hospital goes without power. The price curve does, and the AI is first in line. That is Bogost's procedural rhetoric in *Persuasive Games*: the claim is in the process, and you only see it by playing (or by reading the chart at the end). The materials are Crawford's in *Atlas of AI* and Hogan's in "Data Flows and Water Woes": computing draws on land, power and water that a town also uses. Cegłowski's point, carried in the game's harm track, is that you can lose to today's shortages while watching for tomorrow's superintelligence. The Normal Technology setting is Narayanan and Kapoor's counter-claim, in the essay "AI as Normal Technology" (2025) that accompanies *AI Snake Oil*: AI's effects arrive through slow diffusion, and at that speed the same markets absorb the demand.

The model is simple on purpose and wrong in ways worth arguing with: one price per market, no long-term contracts, no new power plants built because prices are high, and an AI with unlimited money.

## Could go in the game as

- The price board for *Data Center*, on a phone or projector beside the physical map (the `prices-that-move` and `monopoly-with-live-rents` ideas), replacing the shared `energy`, `water` and `money` numbers.
- The sell side of the `gpu-chips` idea: the company faction taps a tagged chip on the AI's reader, and the price on this board jumps.
- A setup choice between rulesets: the same economy run at Data Center and Normal Technology speed, which is the next prototype in this family to make its own page.

## Remix it

All in `nextjs/app/proto/economy/prices-that-move/PricesThatMove.jsx`; the tuning values are at the top.

- "Give the AI a budget instead of unlimited money, and let it go short too." (`AI.paysAnyPrice`, `AI.budget`)
- "Add water as a fourth market that only the AI and the hospital need." (`MARKETS`, `AI.site`, the hospital's `needs` in `FACTIONS`)
- "Let the council faction put a price cap on one market each round, at a cost in trust." (a new faction in `FACTIONS`, a cap check in `price()`, a trust number in the state)
- "Make land supply grow when its price passes 4×, the way a city rezones." (`supplyGrowth` in `MARKETS`, and `endRound()`)
- Harder, with PL's shared state: "Show the price board on every phone in the room, and let each faction buy from its own phone." (`useRoom` from `nextjs/app/proto/_shared/room.js`)

## Needs

A laptop, or a projector for a room; one to three players at the keyboard. Runs offline, no model calls. A tabletop version would put this screen on a phone beside a printed map.
