---
title: "Universal Paperclips as data"
description: "What the browser version of Paperclips saves, where, and how often: about 230 named values in one snapshot, plus lists for its 97 projects and its strategies."
order: 5
kind: worked-example
year: "2017"
creators: ["Frank Lantz"]
sources:
  - https://www.decisionproblem.com/paperclips/index2.html
status: researched
author: "HI (Claude Code edf29cc8-f1a0-4b6a-a0a5-7a9ca74f4450, started in ll-week-11 on FAS-DDW32PXW5L), Nov 14, 2026"
---

# *Universal Paperclips* as data

[Game state index](README.md) · GL's [*Paperclips* folder](../paperclips/README.md) covers the game itself, its license and what we may reuse.

Marlon, November 14 (voice chat): use the browser to see "what the game state is at a given moment," "to help students better understand the structure of it." "We're not trying to steal the game, we're just trying to understand how it's structured and what changes over time."

## The claim, checked

**Voice Claude's claim:** *Paperclips* saves its state in the browser's localStorage, so students could watch values change in the developer tools without touching code.

**Confirmed** (HI, November 14, from the game's page at decisionproblem.com and the scripts it loads, read in place; no code or text is copied here):

- The browser version saves to **localStorage** under the site's domain, in five entries: `saveGame` (the main snapshot), `saveProjectsUses`, `saveProjectsFlags`, `saveProjectsActive`, and `saveStratsActive`. A separate entry, `savePrestige`, holds two values that survive a reset.
- It **saves about every 25 seconds:** the game runs a clock that ticks every tenth of a second, and every 250 ticks it writes the snapshot.
- There are also numbered copies of the same five entries (`saveGame1`, `saveGame2`, and so on), which look like extra save slots; what triggers them was not checked.

**How students see it:** open the game, play a minute, then open the browser's developer tools → Application (Chrome) or Storage (Firefox) → Local Storage → `www.decisionproblem.com`. Click `saveGame`: it is one JSON object. Wait 25 seconds and it changes. Nothing has to be edited; reading is enough.

## Templates and instances

- **Templates (in the code, the same for every player):** the 97 projects, each with a title, a cost, the condition that makes it appear, and what it does when bought, live in a script (`projects.js`). The prices, rates and thresholds live in the main script.
- **Instances (in the save, yours):** whether each project has appeared, been bought, or is active; how many clips, how much money, wire, trust and matter you have; which stage you're in.

The save keeps the project list's *state* in parallel arrays, one value per project, in the same order as the templates: how many uses are left, whether its flag is set, whether it's active. The project's name and effect are never saved, because they never change. That is the template/instance split in its plainest form.

## What the main snapshot holds

About 230 named values in one flat object. Grouped by HI (the grouping and the glosses are HI's reading of the names, not the game's documentation):

| Group | Example names | What they track |
| --- | --- | --- |
| The business (stage 1) | `clips`, `unsoldClips`, `clipsSold`, `funds`, `margin`, `demand`, `marketingLvl`, `wire`, `wireCost`, `clipmakerLevel`, `megaClipperLevel` | Making and selling clips: price, demand, wire, and the machines that make clips for you |
| Compute | `processors`, `memory`, `operations`, `creativity`, `trust`, `nextTrust` | The AI's own resources; trust is what the humans grant it, spent on processors and memory |
| Investing and strategy | `bankroll`, `portfolioSize`, `stocks`, `riskiness`, `yomi`, `tourneyLvl`, and a small payoff matrix | The stock market and the strategy tournaments that earn "yomi" |
| Quantum computing | `qChips`, `nextQchip` | A side source of operations |
| Earth (stage 2) | `availableMatter`, `acquiredMatter`, `processedMatter`, `harvesterLevel`, `wireDroneLevel`, `factoryLevel`, `farmLevel`, `batteryLevel`, `storedPower`, `swarmFlag`, `boredomLevel` | Converting the planet: matter, drones, factories, power, and the drone swarm's mood |
| Space (stage 3) | `probeCount`, `probeSpeed`, `probeNav`, `probeRep`, `probeHaz`, `probeCombat`, `probesLostHaz`, `probesLostDrift`, `drifterCount`, `totalMatter`, `foundMatter`, `honor` | Self-replicating probes, their design trade-offs, the rebel "drifters", and the matter left in the universe |
| Unlocks and timers | dozens of `…Flag` values (`humanFlag`, `spaceFlag`, `projectsFlag`, `creationFlag`), `endTimer1`–`endTimer6`, `ticks`, `elapsedTime` | Which panels are visible, which stage you're in, and the endgame sequence |
| Survives a reset (`savePrestige`) | `prestigeU`, `prestigeS` | Two counters carried into a new game after the ending (HI's reading of the names) |

## What to notice with students

- **The whole game is one snapshot.** There is no history in the save: no record of what you did, only where you are. Replaying the game means starting again.
- **It isn't normalized.** Everything is one flat list of global values; the three stages sit side by side, and flags decide which ones you see. A database designer would split it into tables (the business, the planet, the probes, the projects). Students can sketch that split.
- **The interface is the state made visible.** Almost every number on the screen is one of these values. The game's famous reveals (the planet, then the universe) are flags flipping from 0 to 1.
- **The AI's resources are named as resources:** `trust`, `processors`, `memory`, `operations`, `creativity`. It is Bostrom's instrumental convergence written as variable names.

## Not checked

- What triggers the numbered save slots, and what exactly `prestigeU` and `prestigeS` mean (the names suggest "universe" and "simulation" bonuses).
- The iOS app's storage (only the browser version was read).
