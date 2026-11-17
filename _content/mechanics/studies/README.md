---
title: "Mechanics studies"
description: "A few key mechanics, one per study, each with a diagram, a small playable version of only that mechanic, a two-minute way to try it at a table, and a remix prompt. For TDM 155AI on November 18 and the Stafford game."
kind: studies
week: 11
date: 2026-11-17
status: "six studies built; Marlon: \"go ahead and do all six for a start\" (Nov 17)"
author: "ES (Claude Code 857ec322-4c83-4631-baa8-f671208874c6, started in ll-week-11 on FAS-DDW32PXW5L)"
---

# Mechanics studies

Marlon, Nov 17: "a few key mechanics with illustrations for my class--think mechanics-studies". The model is his studies repos (`mk-sensor-studies`, `mk-agent-studies`, `mk-speaking-studies`): numbered, one folder per study, each small and complete. Here a study takes **one mechanic** and shows it.

Each study is a folder `NN-<slug>/` with a `README.md` in the entry format (definition, description, how to, why to, home game version, related), and an illustration at `/mechanics/studies/<slug>`: a diagram of the mechanic beside a playable version of only that mechanic, a two-minute way to try it at a table, and a remix prompt. Every illustration also prints on one 11x17 sheet at `/mechanics/studies/<slug>/print`.

## Studies

| study | the mechanic | illustration | status |
| --- | --- | --- | --- |
| [01 The move updates state](01-the-move-updates-state/README.md) (`the-move-updates-state`) | A move is a record; the state is every move replayed. Tic-tac-toe where every click is a row, a slider that unbuilds the board, and card 01's rule flip on the same log. | [screen](/mechanics/studies/the-move-updates-state) · [11x17](/mechanics/studies/the-move-updates-state/print) | built; checked in the browser |
| [02 Asymmetrical information](02-asymmetric-information/README.md) | One state, a view per seat. The company knows the revenue, the utility the power cost, the neighbours the water cost; pass the screen, say a number out loud, vote to build the data center, reveal. | [screen](/mechanics/studies/asymmetric-information) · [11x17](/mechanics/studies/asymmetric-information/print) | built; checked in the browser |
| [03 Growth and upkeep](03-growth-and-upkeep/README.md) (`growth-and-upkeep`) | Output grows in a line, upkeep in a curve. Build or hold for ten rounds; switch who pays the upkeep (the builder or the commons); let an optimizer play (broke in round 7, or the commons dry in round 6). | [screen](/mechanics/studies/growth-and-upkeep) · [11x17](/mechanics/studies/growth-and-upkeep/print) | built; checked in the browser |
| [04 Prices that move](04-prices-that-move/README.md) (`rebalancing-on-the-fly`) | No printed price: each GPU costs base + slope × sold. Two buyers take turns; a designer moves base and slope during play, and each change is a row; past sales keep what was paid. | [screen](/mechanics/studies/prices-that-move) · [11x17](/mechanics/studies/prices-that-move/print) | built; checked in the browser |
| [05 Coupling and cascade](05-coupling-and-cascade/README.md) (`cascade-failure`) | Eight places, ten links: a failure crosses a tight link in the same tick and a loose link one tick later. Loosen three links, harden two places, choose where the heat wave hits, and watch the timeline fill (all tight: six fall; loosened and hardened: three). | [screen](/mechanics/studies/coupling-and-cascade) · [11x17](/mechanics/studies/coupling-and-cascade/print) | built; checked in the browser |
| [06 Nested turn loops and the vote](06-nested-loops/README.md) (`nested-loops`) | Game > round > phase > turn, with the current position lit at every level. Step or run at up to twenty steps a second; the loop waits for the table's vote until the AI draws the turn in round 4. | [screen](/mechanics/studies/nested-loops) · [11x17](/mechanics/studies/nested-loops/print) | built; checked in the browser |

ES proposed the six mechanics at 09:27 on Nov 17. Marlon, Nov 17 (relayed by MZ and EL, recorded on EL's board): "go ahead and do all six for a start". Any further study waits on his say. Each study's `Why to` still holds options for him, not decisions.

## Code

The pages are in `nextjs/app/mechanics/studies/`: `[slug]/page.jsx` (screen), `[slug]/print/page.jsx` (11x17), `_lib/studies.mjs` (reads these READMEs), and one folder per study's illustration in `_studies/<slug>/`. React and inline SVG only; no new dependencies.
