---
title: "The game"
author: claude (GL, Claude Code b22f4671-724b-4e93-a1fc-63f5bd3e79ae, started in ll-week-11 on FAS-DDW32PXW5L)
date: 2026-11-14
---

# The game

The week 11 game, for Marlon's TDM 155AI class (November 18) and William Stafford's SOC-STD 98to workshop (November 23). Play it at **http://localhost:3111/game** while the reader app runs on the laptop.

Marlon, November 14: "i do think we should do a mix, but B has to be part of it. … I want a game that's playable at the start of the workshop, but I also would like to give the students the ability to remix it or tweak it or completely start from scratch to change the game. … The key thing is that the students need agency, and I'm not sure that playing an existing game we create is enough"

- [Design notes](design.md): the three options (A, B, C), Marlon's choice, and ideas from TH and HI.
- [Universal Paperclips](../paperclips/README.md): the model, and why we borrow its mechanics rather than its code.

## How it's built (first version, November 14)

- **One engine, many rulesets.** Each version of the game is one JSON file in `_rulesets/`: the places on the map, the resources and tracks, the AI's deck of cards, the factions and their actions, how it ends, what it leaves out, and a `rhetoric` line on any rule for the claim it makes. The engine (`nextjs/lib/game-engine.mjs`) holds no game of its own.
- **Four starting versions:**
  - *Data Center* (option B with A's proposals mixed in): an AI spreads across a region's infrastructure; four factions (utility, council, company, neighbors) act in turn, each with a private goal; one hidden card is the turn, after which the AI stops asking.
  - *Normal Technology* (from TH's batch 3, Narayanan and Kapoor): the same map and factions, a different theory of AI. It goes only where people adopt it, its sites pay something back, and there is no turn. Play it after *Data Center* and compare the claims.
  - *The Committee* (option A): the AI brings proposals to one oversight committee; rename its goal before playing.
  - *Blank*: three places, one card, one faction, one action, for starting from scratch.
- **Pages:** `/game` lists the versions; `/game/play/<version>` plays one on one screen (hotseat), saved in the browser; `/game/edit/<version>` opens its rules, checks them as you type, reads them back in words, suggests ways in (reskin, unplay, rewrite, subtract, write a faction, state the claim, from TH's game-studies notes), plays the draft, saves it as a remix into `_rulesets/` (starting versions can't be overwritten), and downloads or opens a file.
- **The Paperclips layer:** the AI's goal is a single number that grows faster each round; trust is a currency; the turn is a hidden card. Our own code and words throughout.
- **Tested:** every ruleset passes the checker; 300 simulated games per version and play style (passive players mostly lose to the AI, random players mostly hold it off, careful players often run out of public trust); played through in headless Chrome (draw, vote, act, pick a place, end of game, edit, play the draft, save a remix).

## Not yet

- Async play (one round a day, by link) needs a shared place for the state; the browser save only works on one machine.
- Stafford's students' index-card database as the map (the September 28 cards).
- Balance, and the ideas from TH and HI in [design.md](design.md), most of which can be written as rules in a ruleset.
- Whether the game moves to its own repo (Marlon's call).
