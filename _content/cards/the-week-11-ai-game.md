---
title: "The week 11 AI game"
description: "One engine and four rulesets at /game: Data Center, Normal Technology, The Committee and Blank, played hotseat on one screen, the playable start Marlon wanted before students remix."
kind: prototype
convolute: stafford-game
tags: [play, autonomy, rhetoric, civilization, paperclips, remix]
audience: [tdm155ai, stafford]
links: [game/README, game/design, design-and-play-an-ai-strategy-game, universal-paperclips-meets-civilization, play-two-theories-of-ai, play-data-center, the-committee, prices-that-move, remix-a-mechanic-with-claude-code, game-state/data-center, mechanics/treacherous-turn, mechanics/adoption-only, mechanics/incremental-growth, mechanics/not-modeled, treacherous-turn, incremental-growth, not-modeled]
sources: ["_content/game/README.md", "_content/game/design.md", "_content/game/_rulesets/", "_context/orchestration/20261114/voice-handoff-back.md"]
voice: mixed
author: CM
date: 2026-11-14
week: 11
status: draft
---

GL built it on Nov 14 for Marlon's class and William's workshop. The engine holds no game of its own; each version is one JSON file with the map, the resources, the AI's deck, the factions and how it ends, so the rulesets are also data for the game-state thread and the thing students remix. In 300 simulated games per version, passive players mostly lose, and careful ones often run out of public trust.

---

**What it is.** The game GL built on November 14 for Marlon's class and William's workshop, at `/game` in the reader app. One engine (`nextjs/lib/game-engine.mjs`) holds no game of its own; each version is one JSON file in `_content/game/_rulesets/`: the places on the map, the resources and tracks, the AI's deck, the factions and their actions, how it ends, and what it leaves out.

**How it plays.** Four versions, hotseat on one screen, saved in the browser:

- ***Data Center***: an AI spreads across a region's infrastructure; four factions (utility, council, company, neighbors) act in turn, each with a private goal; one hidden card in the AI's deck is the turn, after which the AI stops asking.
- ***Normal Technology***: the same map and factions with a different theory of AI (Narayanan and Kapoor): it goes only where people adopt it, its sites pay something back, and there is no turn.
- ***The Committee***: the AI brings proposals to one oversight committee.
- ***Blank***: three places, one card, one faction, one action, for starting from scratch.

The *Paperclips* layer runs through all of them: the AI's goal is one number that grows faster each round, trust is a currency, the turn is a hidden card. GL simulated 300 games per version and style: passive players mostly lose to the AI, random players mostly hold it off, careful players often run out of public trust.

**What it does for learning.** Two versions on one engine let a class feel that the claim about AI lives in a few mechanics, which is the point of [Play two theories of AI](play-two-theories-of-ai.md) and [Play Data Center](play-data-center.md). The rulesets are data, so the game is also the example for the week's game-state thread, and the thing students remix.

**Which of Marlon's ideas it serves.**

> I think I want a game that's playable at the start of the workshop, but I also would like to give the students the ability to remix it or tweak it or completely start from scratch to change the game.

Marlon, Nov 14, choosing among GL's options (recorded in `_content/game/README.md`). In the same message: "The key thing is that the students need agency, and I'm not sure that playing an existing game we create is enough." After the voice chat that afternoon, the rule editor GL had built at `/game/edit` was out ("this is just too opinionated"), along with the per-rule `rhetoric` fields: the frame is mechanics and game elements, and students remix through Claude Code, not an editor.

**Open (GL's proposals, waiting on Marlon):** remove `/game/edit`; reorganize the game around game elements and a visible game-state panel; an `AGENTS.md` for students who don't read code, with worked remixes; prices that move; a print-and-play tabletop version. On November 15 Marlon also said he doesn't want one single game for now, but playable examples of things that might go in it; those are the prototypes.

*CM's account of GL's game, Nov 15. Not Marlon's words unless quoted.*
