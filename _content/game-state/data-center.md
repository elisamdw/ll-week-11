---
title: "Data Center as data"
description: "Our own game: the ruleset file is the template, the saved game is the instance, and the browser holds it under one key."
order: 6
kind: worked-example
year: "2026"
creators: ["GL (Claude Code) for the Learning Lab"]
sources:
  - ../game/_rulesets/data-center.json
  - ../../nextjs/lib/game-engine.mjs
status: researched
author: "HI (Claude Code edf29cc8-f1a0-4b6a-a0a5-7a9ca74f4450, started in ll-week-11 on FAS-DDW32PXW5L), Nov 14, 2026, read from the repo as it stood that afternoon"
---

# *Data Center* as data

[Game state index](README.md) · [the game's design](../game/design.md) · play it at http://localhost:3111/game

This is the one example where we can read every line, because GL wrote it this week. It is built the way the other pages describe: a **template** (the ruleset) and an **instance** (a game in progress), kept apart.

## The template: the ruleset file

`_content/game/_rulesets/data-center.json` defines the game and never changes during play. It holds:

| Part | In *Data Center* | Like… |
| --- | --- | --- |
| `nodes` | 14 places on the map, each with an id, a label, a kind, links to its neighbors, and what it yields each round: Data center, Gas plant, Wind farm, Substation, River, Reservoir, Town, University, Hospital, School, Fiber exchange, Port, Farmland, Old mill site | Monopoly's spaces, Risk's territories |
| `resources` | Energy, Water, Money, each with a starting amount (6) | Monopoly's bank notes |
| `tracks` | Public trust (start 5, lose below 0) and Present harms (start 0, lose at 10) | A score track |
| `factions` | The utility, the council, the company, the neighbors: each with a goal, what it scores on, and its actions | Player roles |
| `actions` | 13 actions (upgrade the grid, cut power, zoning, hearing, moratorium, sell to the AI, protest, harden…), each with a cost and effects | What a turn lets you do |
| `ai` | Where the AI starts, what it consumes per node each round, how fast its goal grows, and its deck of 10 cards (one hidden: the turn) | An automated player, or Pandemic's infection deck |
| `rounds`, `actionsPerTurn`, `end` | 10 rounds; 2 actions per faction; the AI wins at half the map | The rules for ending |

## The instance: what a game in progress stores

When you start a game, the engine (`nextjs/lib/game-engine.mjs`, `newGame`) builds a state object from the ruleset. As of November 14 it holds:

```json
{
  "seed": 1731600000,
  "round": 3,
  "phase": "humans",
  "factionIndex": 1,
  "actionsLeft": 2,
  "compute": 42,
  "growth": 1.4,
  "turned": false,
  "card": "permits",
  "pools":  { "energy": 4, "water": 5, "money": 7 },
  "tracks": { "trust": 4, "harm": 2 },
  "nodes": {
    "dc1":   { "owner": "ai",  "status": "ok",   "protected": false },
    "mill":  { "owner": "ai",  "status": "ok",   "protected": false },
    "river": { "owner": null,  "status": "down", "protected": false },
    "town":  { "owner": null,  "status": "ok",   "protected": true }
  },
  "deck": ["cooling", "turn", "land", "..."],
  "log": [{ "round": 3, "kind": "vote", "text": "Approved." }],
  "over": null
}
```

The values are made up for illustration; the field names are the engine's. Only four of the 14 nodes are shown.

The play page saves this object in the browser's localStorage under `w11-game:<version>` (for example `w11-game:data-center`) after every move, together with a fingerprint of the ruleset, so a changed ruleset doesn't load an old game. That's the same place *Paperclips* keeps its save.

## What to notice

- **The instance refers to the template by id.** A node's state says `"dc1": { "owner": "ai" }`; its name, links and yield are looked up in the ruleset. That's normalization: nothing is stored twice.
- **The seed makes the instance replayable.** The deck is shuffled from `seed`, so the same seed gives the same draws. Two tables with the same seed meet the same AI.
- **Hidden information is in the state, not on the screen.** `deck` holds the order of the AI's coming cards, including where the turn card sits. The players never see it; a photo of the screen wouldn't show it either.
- **The log is the only history.** Like *Paperclips*, the game stores where you are; unlike *Paperclips*, it keeps the last 200 events, which is what a debrief needs.
- **A tabletop version** would print the template (a map, faction cards, the AI's deck) and keep the instance on the table (tokens on nodes, numbers on tracks). Marlon's hybrid idea, the phone holding values the board would print, moves a few template values (GPU and land prices) into the app so they can change.

## Not checked

Field names were read from the engine on November 14; GL is still building, so later versions may add fields.
