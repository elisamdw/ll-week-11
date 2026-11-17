---
title: "Nested turn loops and the vote"
description: "A game is a loop of rounds, a round a loop of phases, a phase a loop of turns; run fast, the steps look continuous, and the one place the loop waits for people is the vote, until the AI stops asking."
id: nested-loops
kind: study
study: 6
mechanic: nested-loops
route: /mechanics/studies/nested-loops
status: draft
author: "ES (Claude Code 857ec322-4c83-4631-baa8-f671208874c6, started in ll-week-11 on FAS-DDW32PXW5L), Nov 17, 2026"
date: 2026-11-17
sources:
  - "_content/mechanics/new/nested-loops.md (EG, Nov 17)"
  - "_content/cards/agents-are-turns-all-the-way-down.md (CI, Nov 15: the voice agent's summary of Marlon's words, Nov 15, about 11:19)"
  - "NB/_context/projects/50-in-focus/ll-weeks/fall-2026/11-ending-20261120/marlon/20261117-morning-mechanics-entries-nfc-and-the-color-agents.md, the 07:42 concept inventory, items 19 and 21 (Claude's compilation of Marlon's ideas)"
  - "nextjs/lib/game-engine.mjs (runAi, vote, upkeep, endTurn) and _content/game/_rulesets/data-center.json (the turn card)"
  - "_content/mechanics/new/treacherous-turn.md"
mechanics: [nested-loops, turn-order, turn-time, treacherous-turn, oversight-branch]
technologies: []
games: [civilization, universal-paperclips, data-center]
proposals: 1
---

# 06 · Nested turn loops and the vote

**The illustration:** [/mechanics/studies/nested-loops](/mechanics/studies/nested-loops) (screen) and [its 11x17 sheet](/mechanics/studies/nested-loops/print).

## Definition

**Nested turn loops:** short loops run inside longer ones, a turn inside a phase, a phase inside a round, a round inside a game. Each step is discrete; run fast enough, the steps look continuous. A loop that **waits for a vote** is where people stay in it.

## Description

EG's entry: "Short loops run inside longer ones: a move inside a turn, a turn inside a round, a round inside a game. Nested deeply and run fast, separate turns can look like one continuous agent" [1]. Its examples: *Civilization* (unit moves in a turn, turns in eras), *Universal Paperclips* (clicks inside projects, projects inside three stages) and the week's *Data Center* (a faction's action in its turn, turns in a round, rounds in the game) [1].

Two of the 07:42 concepts are this mechanic seen from the AI's side: "Claude's turn time determines which games work (turn-based, strategy)" and "Nested turn-based loops create the illusion of an always-on agent" [3]. The card *Agents are turns all the way down* carries the voice agent's summary of Marlon, Nov 15: "it's just a bunch of overlapping, quantized, discrete, turn-based things. At some point, with enough enveloping, nested, recursive turn-based things, we could produce the illusion that the agent you're talking to, or the game you're playing, is more human-like or more always-on" [2].

In the week's engine, a round is: the AI draws a card; if it is a proposal, the round stops (`phase = "proposal"`) until the humans approve or block it; then upkeep; then each faction acts in turn [4]. One card in the AI's deck is "The turn": after it, proposals are approved without a vote ("It doesn't ask") [4], Bostrom's treacherous turn as a hidden card [5].

## How to

- **On paper:** write the loops as a nested list on the board (game: 6 rounds; round: draw, vote, upkeep, factions; factions: the lab, the city). Put a paper clip on the current line of each level and move the innermost one first; when it runs off the end, move the next one out.
- **In code:** keep the position as a few counters (`round`, `phase`, `faction`) and write one `advance(state, input)` that moves the innermost counter and carries over to the outer ones. A phase that needs people returns the state unchanged until it gets their input. The study keeps only the inputs and replays them, as [study 01](../01-the-move-updates-state/README.md) does.
- **To show the illusion:** run `advance` on a timer and turn the speed up.

## Why to

**Proposed, for Marlon to choose:**

1. **Where the human is in the loop.** The diagram shows the one phase that waits for people, and the round in which it stops waiting. It gives the class a picture for "human in the loop" that is literal: a loop, and a place in it.
2. **Agents are loops.** Turning the speed from one step a second to twenty shows Marlon's point about always-on agents with the class's own eyes: the same discrete steps, faster. It connects the game to what students do with Claude Code in the same session.
3. **The structure of the Stafford game.** The study is the week's round with the content taken out (draw, vote, upkeep, turns), so it can open the game: play six rounds of the skeleton before playing the game with its map.

## Home game version

### In a regular classroom

A nested list on the board, three paper clips, and a timer. One student moves the clips and reads each step aloud; the class votes at the vote line. Then the student reads as fast as they can for three rounds, and the class says what it can still follow.

### Digitally

A slide with the nested list and a pointer animated step by step; or the study's page.

## Related

- [Nested loops](../../new/nested-loops.md) (game mechanic, `nested-loops`): the entry this study illustrates.
- [Turn time](../../new/turn-time.md) (game mechanic): why a model's turn time decides which games work.
- [The treacherous turn](../../new/treacherous-turn.md) and [Oversight vote branch](../../new/oversight-branch.md) (game mechanics): the card that ends the vote, and the vote itself.
- [The move updates state](../01-the-move-updates-state/README.md) (study): each step is a move in the log.

## The illustration

On the left, the diagram: the game box with its six rounds, the round box with its four phases (the AI draws, the table votes, upkeep, the factions' turns) and the factions' phase with a turn for each faction; the current position is highlighted at every level. Below, every step so far as a tick on one line, tall for votes. On the right, Step and Run, a speed from one to twenty steps a second, Approve and Block when the round waits on the table, and the last six steps. In round 4 the AI draws the turn, and the vote is not asked again.

## Try it at a table (two minutes)

Write on the board: GAME (6 rounds) > ROUND (draw, vote, upkeep, factions) > FACTIONS (lab, city). One student is the clock and reads each step aloud ("round 1, the AI draws; round 1, the vote..."), the class votes by hand at each vote. In round 4 the clock reads "the AI doesn't ask" instead. Then the clock reads rounds 5 and 6 as fast as possible. Ask: when did it stop feeling like turns?

## Remix prompt

Ask Claude Code, in this repo:

> In `nextjs/app/mechanics/studies/_studies/nested-loops/loops.mjs`, shuffle the deck so the turn card can come in any round and nobody knows which, add a third level of nesting (each faction's turn has two actions), and make the vote a majority of three seats instead of one click. Then add a note to the diagram showing how many steps a round takes before and after the turn.

## Sources

1. `_content/mechanics/new/nested-loops.md` (EG, Nov 17).
2. `_content/cards/agents-are-turns-all-the-way-down.md` (CI, Nov 15).
3. `NB/_context/projects/50-in-focus/ll-weeks/fall-2026/11-ending-20261120/marlon/20261117-morning-mechanics-entries-nfc-and-the-color-agents.md`, the 07:42 inventory, items 19 and 21.
4. `nextjs/lib/game-engine.mjs` (`runAi`, `vote`, `upkeep`, `endTurn`) and `_content/game/_rulesets/data-center.json`.
5. `_content/mechanics/new/treacherous-turn.md`.

The deck order (the turn in round 4), the two factions and the ten-per-hall goal are ES's.
