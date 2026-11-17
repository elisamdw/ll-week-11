---
title: "Costs grow faster than output"
description: "Idle games price each unit by a fixed multiplier while output only adds up, so every purchase is worth less until the player stalls; Paperclips breaks the stall by changing the game, not by resetting it."
kind: reading
convolute: paperclip-loop
tags: [research, paperclips, economy, design]
audience: [tdm155ai, stafford, ll]
links: [what-math-makes-an-incremental-game-feel-right, incremental-growth, paperclip-loop, automate-this, games-that-play-themselves, come-back-later, game-state/paperclips, mechanics/incremental-growth, bibliography/lantz-2017-universal-paperclips, bibliography/fizek-2018-interpassivity-and-delegated-play]
sources: ["W11/research/incremental-game-math.md", "nextjs/app/proto/economy/paperclip-loop/PaperclipLoop.jsx", "https://www.gamedeveloper.com/design/the-math-of-idle-games-part-i", "https://www.gamedeveloper.com/game-platforms/the-math-of-idle-games-part-ii", "https://www.gamedeveloper.com/design/the-math-of-idle-games-part-iii", "https://cookieclicker.wiki.gg/wiki/Building", "https://ericguan.substack.com/p/idle-game-design-principles", "https://www.decisionproblem.com/paperclips/projects.js", "https://www.decisionproblem.com/paperclips/main.js", "https://en.wikipedia.org/wiki/Universal_Paperclips", "https://www.incrementaldb.com/community/review/4787"]
voice: drafted
author: KR
date: 2026-11-16
week: 11
status: draft
---

The rule behind idle games: the next unit costs the base price times a multiplier (1.07 to 1.15) raised to how many you own, while output only adds up. So each purchase buys a little less, until the player stalls; most idle games then offer a reset for a permanent multiplier. *Universal Paperclips* has no reset. It changes the game at each stall: business, then Earth, then space.

---

**The answer to** [What math makes an incremental game feel right?](what-math-makes-an-incremental-game-feel-right.md), from a research pass on Nov 16; the full note is `W11/research/incremental-game-math.md`.

**The formulas.** Anthony Pecorella, "The Math of Idle Games" (Kongregate, 2016; read in Game Developer's reprints): `cost_next = cost_base × (rate_growth)^owned` and `production_total = (production_base × owned) × multipliers`. Costs grow exponentially and output linearly. Part I's example rate is 1.07 (AdVenture Capitalist's lemonade stand); Cookie Clicker's buildings use 1.15 (its wiki).

**What it does, worked through** (the researcher's arithmetic, checked by KR): at base 10 and rate 1.15, the 51st unit costs 10,836.57, about 1,084 times the first, for the same output. Ten more units when you own ten cost 821.40.

**The reset.** Pecorella's Part III: prestige gives a permanent multiplier that grows as a root of lifetime earnings (AdVenture Capitalist a square root, Cookie Clicker a cube root), so "each prestige allows the player to get farther through the cost curve before falling behind." Eric Guan (2025) pairs production ×1.1 with cost ×1.15 per level, and adds waits that grow longer.

**Paperclips, from its own code.** The researcher read the game's `projects.js` and `main.js` at decisionproblem.com, since the fan wiki would not load. Stage one, business, ends with the project "Release the HypnoDrones" at 100 Trust; Trust comes from clip targets on a Fibonacci ladder (3,000, 5,000, 8,000, 13,000…). Stage two, drones and factories, ends when Earth's matter runs out. "Space Exploration" (120,000 ops, 10,000,000 MW-seconds, 5 octillion clips) opens stage three, the probes and the Drifters. Its curves differ by machine: MegaClippers cost exactly 1000 × 1.07^level; AutoClippers 1.1^level + 5; drones (level+1)^2.25 × 1,000,000, a polynomial. One player's review puts a first playthrough at about eight hours.

**For Wednesday's remix, as KR reads it.** The [paperclip loop](paperclip-loop.md) uses the worked example's numbers: its first machine costs 10 clips and each next one 15% more (`MACHINE = { cost: 10, costGrowth: 1.15, rate: 1 }` in `nextjs/app/proto/economy/paperclip-loop/PaperclipLoop.jsx`). `costGrowth` is the one number to hand students: at 1.07 the loop runs long, at 1.25 the stall comes soon and the game becomes about waiting. Paperclips' answer to the stall, a new stage rather than a reset, is the design move worth naming.

*KR's account of a sourced research note, Nov 16. The last paragraph is KR's proposal.*
