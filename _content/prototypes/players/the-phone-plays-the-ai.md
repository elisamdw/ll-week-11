---
title: "The phone plays the AI"
description: "The table plays the humans on a map; one device is the AI's seat. Each round the table guards a place or cuts a link, then the device draws the AI's card, picks where it spreads by a rule you can read, and says where to put its token."
kind: players
week: 11
date: 2026-11-15
status: prototype
author: claude (PI, Claude Code fd339994-b588-4f18-bb35-a7acc0b2c967, started in ll-week-11 on FAS-DDW32PXW5L)
route: /proto/players/the-phone-plays-the-ai
mechanics: ["network-turn", "readable-personalities", "turn-order", "cooperation", "convergent-values"]
readings: ["bogost-2007-persuasive-games", "vinge-1993-coming-technological-singularity", "togelius-2018-playing-smart"]
ideas: ["the-phone-plays-the-ai"]
sources:
  - "ll-week-11: _content/game-ideas/the-phone-plays-the-ai.md (GL's card, Nov 14)"
  - "ll-week-11: _content/game/_rulesets/committee.json (the map's eight places, copied)"
  - "PL's board, Nov 15: TD asked for the AI as a player that takes a turn, on a scripted rule, no model API"
---

The AI is a player at the table that nobody at the table controls. One device (a phone beside a paper map, or the laptop on the projector) is its seat. The humans share one action a round: guard a place for a round, or cut a link for good. They tap it in, and the device takes the AI's turn: it draws a card ("Expand", "Find people", "Secure power", "A quiet week"), applies the card's one-line rule, and says out loud which token to put where and why ("The press has 3 open links, the most of what it can reach"). Once the AI holds four places joined by links, its network turns and it spreads twice every turn. It wins at five places; the table wins if it lasts six rounds.

## How to play

1. Open `/proto/players/the-phone-plays-the-ai` on a phone or the laptop. With a paper map, copy the eight places and their links onto paper, with one AI token on the compute cluster; without one, play on the screen.
2. The table agrees on one action: **Guard a place** (tap a place) or **Cut a link** (tap a line). Do it on the paper map too.
3. Press **The AI's turn**. Read out what the AI says (or tick *Read the AI's turns aloud*) and place its token.
4. Repeat for six rounds. The AI's rules are under *The AI's rules* on the page, so the table can learn to play against them. One to six players, about two minutes.

## What it shows

**Turn order** with a non-human player: the AI's turn comes after the table's every round, and nobody plays it. Its deck is a set of **readable personalities**, one line of rule each, and its target rule ("most open links first") is printed, so play turns into reading it. The **network turn** (Vinge's singularity as a threshold in connection) makes cutting links the defense, and every card reaches for resources (**convergent values**).

What it argues (Claude's proposal): Bogost's procedural rhetoric says games argue through the processes they run; here the process runs on a device no one at the table controls, so the argument is made by the machine's turns, not the players'. In a simulation of 2,000 games each (PI, Nov 15, `rules.js` as committed), a table acting at random lost 92% of the time; a table that read the rule and cut the links to the AI's best target lost 29%. The game rewards reading the system, which is the case for showing students the rules at all. Togelius's *Playing Smart* is the reading on AI as a player of games, and on games as the test beds for AI; this AI is the simplest kind, a few written rules, and the table can still lose to it. The network turn borrows one of Vinge's four paths to superhuman intelligence in "The Coming Technological Singularity": networks that wake up.

## Could go in the game as

- The AI's turn in *Data Center*, with a paper map and a phone (GL's `the-phone-plays-the-ai` card: "Run the existing /game engine as the AI for a paper map").
- A strategy ladder (the `strategy-ladder` mechanic): the AI picks at random until it holds three places, then by most links, then looks a turn ahead.
- A second AI from the other edge of the map (the `rival-lab` mechanic), with its own deck and color.

## Remix it

The deck, the target rule, the map and the tuning are at the top of `nextjs/app/proto/players/the-phone-plays-the-ai/rules.js`.

- "Give the AI a new card: Bribe, which takes back one cut link." (`DECK`, and `aiTurn()`)
- "Make the AI go for the place with the fewest links instead, and see which table wins more." (`choose()`)
- "Draw a map of our campus with eight places, and put the AI in the library." (`PLACES`, `LINKS`, `AI_START`)
- "Hide the AI's rules until the end." (the *The AI's rules* section in `PhoneAi.jsx`)

## Needs

One device: a phone beside a paper map (eight places, eleven links, a handful of tokens), or the laptop on a projector. Runs in the browser with no server state and no model call. The voice uses the browser's own speech synthesis, where the browser has it.

*Claude's prototype (PI, Nov 15), from GL's game-idea card and PL's assignment; a proposal until Marlon plays it. The deck, rules and the simulated win rates are Claude's, from a quick simulation with two scripted table strategies, not from playtests.*
