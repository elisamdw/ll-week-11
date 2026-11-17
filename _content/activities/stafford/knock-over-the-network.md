---
title: "Knock over the network"
description: "A ten-minute paper version of Perrow's coupling: index cards joined by tight and loose links, one failure, and a count of what falls before anyone can act."
kind: activity
audience: stafford
week: 11
date: 2026-11-15
status: proposal
author: claude (SW, Claude Code dd46e909-fd8b-4fb0-b2f6-2979500830b3)
duration: 15
group: tables
materials: "per table: 12 index cards, red and blue tape or string, 6 tokens, a die; or a laptop with the cascade prototype (/proto/economy/cascade)"
play: paper
mechanics: ["cascade-failure", "harden-node", "network-turn"]
readings: ["perrow-1984-normal-accidents", "fisch-2018-anthropology-of-the-machine"]
prototypes: ["economy/cascade"]
activities: ["stafford/coupling-is-a-mechanic", "stafford/play-data-center"]
sources:
  - "_content/mechanics/mechanics.csv (cascade-failure: 'Lay out cards…'; harden-node)"
  - "_content/bibliography/perrow-1984-normal-accidents.md (TH's proposal: coupling on the links)"
  - "PL, Nov 15 (cmux message): economy/cascade built to this rule, at /proto/economy/cascade"
---

**What students do:**

1. Each table writes 12 parts of an infrastructure on index cards (a substation, a cooling loop, a fiber line, a shift supervisor) and lays them out.
2. They join cards that depend on each other: **red tape** for tight links (a failure passes at once), **blue** for loose (it passes next round, and someone can step in).
3. They have 6 tokens to spend before the failure: each token either turns one red link blue or hardens one card (it won't fall).
4. Roll to pick a card; it fails. Flip every card a red link reaches, then every card those reach. That's this round. Then one card each player chooses can be saved; then blue links pass the failure on.
5. Count what fell. Swap tables and play the other table's network.

**What it teaches:** Perrow's interaction of complexity and coupling, felt in ten minutes: the tight links decide the outcome before anyone acts. Fisch's slack is the blue tape. The tokens make loosening a choice with a cost, which is the argument.

**Prepare:** Cards and two colours of tape. A table can play the same rule on a laptop at `/proto/economy/cascade` (built Nov 15: each link tight or loose; each round harden one place and loosen one link).

**Try it:** LL kit: index cards and painter's tape; a six-card version on one table in five minutes.

**Could go wrong:** Students re-explain Perrow instead of playing. Start the roll within two minutes and talk afterwards. William's Nov 16 discussion will be fresher than ours, so let him draw the connections.

*SW's proposal (Nov 15), from HI's and TH's mechanics; not Marlon's words.*
