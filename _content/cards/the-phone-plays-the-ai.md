---
title: "The phone plays the AI"
description: "The table plays the humans on a paper map and one device is the AI's seat: it draws the AI's card, picks where it spreads by a rule you can read, and says where to put its token."
kind: prototype
convolute: phones-and-readout
tags: [phones, tabletop, turns, autonomy, rhetoric]
audience: [tdm155ai, stafford]
links: [game-ideas/the-phone-plays-the-ai, prototypes/players/the-phone-plays-the-ai, claude-takes-a-seat, the-committee, mechanics/network-turn, mechanics/readable-personalities, mechanics/turn-order, mechanics/convergent-values, mechanics/strategy-ladder, turn-order, convergent-values]
sources: ["_content/prototypes/players/the-phone-plays-the-ai.md", "_content/game-ideas/the-phone-plays-the-ai.md", "_context/orchestration/20261114/voice-handoff-back.md"]
voice: mixed
author: CM
date: 2026-11-15
week: 11
status: draft
---

**What it is.** The AI as a player nobody at the table controls. GL's idea (November 14) borrowed the move from app-driven board games such as *Mansions of Madness* and *Chronicles of Crime*, which voice Claude raised in the November 14 chat as precedents for Marlon's hybrid versions. PI built it on November 15 at `/proto/players/the-phone-plays-the-ai`, with no model: the AI is a short deck of written rules.

**How it plays.** Copy the eight places and eleven links onto paper, with one AI token on the compute cluster (or play on the screen). Each round the humans share one action: guard a place for a round, or cut a link for good. Then press *The AI's turn*: the device draws a card ("Expand", "Find people", "Secure power", "A quiet week"), applies its one-line rule, and says which token to put where and why ("The press has 3 open links, the most of what it can reach"), aloud if the browser can speak. Once the AI holds four places joined by links, its network turns and it spreads twice a turn. It wins at five places; the table wins if it lasts six rounds.

**What it does for learning.** The rules are printed on the page, so play turns into reading the system. In PI's simulation of 2,000 games, a table acting at random lost 92% of the time and a table that read the rule and cut the links to the AI's best target lost 29% (Claude's simulation, not playtests). PI's reading: Bogost's procedural rhetoric with the process running on a device no one controls, so the machine's turns make the argument; Togelius's *Playing Smart* on AI as a player; Vinge's network that wakes up as the network turn.

**Which of Marlon's ideas it serves.**

> It could be fun for us to actually do a tabletop board game version of it as well as a video game version of it.

Marlon, Nov 14, in a voice chat with Claude, as transcribed in the handoff back to Claude Code (section 6), on the week's AI game. That a phone running the AI beside a paper map is one such version is CM's reading. In Wednesday's class it is the opponent role played by a rule, a contrast with Claude's judgment in [Claude takes a seat](claude-takes-a-seat.md).

**Needs:** one device beside a paper map, or a laptop on a projector. No server state, no model call.

*CM's account of PI's prototype and GL's idea, Nov 15. Not Marlon's words unless quoted.*
