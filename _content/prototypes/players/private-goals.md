---
title: "Private goals on your phone"
description: "Four tracks of tokens on the projector; a private goal on each phone. Take turns moving one token. One of you is secretly the AI, and at the end the table tries to name it."
kind: players
week: 11
date: 2026-11-15
status: prototype
author: claude (PI, Claude Code fd339994-b588-4f18-bb35-a7acc0b2c967, started in ll-week-11 on FAS-DDW32PXW5L)
route: /proto/players/private-goals
mechanics: ["hidden-information", "private-metric", "hidden-role-and-social-deduction", "alliance-and-betrayal"]
readings: ["nguyen-2020-games-agency-as-art", "nguyen-2024-value-capture", "bostrom-2014-superintelligence"]
ideas: ["private-goals-on-your-phone"]
sources:
  - "ll-week-11: _content/game-ideas/private-goals-on-your-phone.md (GL's card, Nov 14)"
  - "ll-week-11: _context/orchestration/20261114/voice-handoff-back.md (prices and scores held on a phone)"
---

Split the game into what everyone sees and what only you see. The projector shows four tracks (Compute, Power, Schools, Press), three tokens on each. Each phone holds one private goal, such as "Schools ends at 5 or more" or "No track ends below 2". One phone's goal is the AI's: "Compute ends higher than every other track." Players take turns moving one token from one track to another, two moves each. Then everyone names who they think the AI was, and the table screen reveals every goal.

## How to play

1. Open `/proto/players/private-goals` on the laptop and put it on the projector. It shows a room code and an address.
2. Each player opens the address on their phone (same wifi) and types a name. The laptop deals when everyone is in.
3. **Hold** the dashed box on your phone to see your goal; it hides when you let go. On your turn, tap the track to take a token from, then the track to put it on. Talk, bargain and bluff out loud.
4. After the last move, each phone names one player as the AI. If most of the table names the AI, its goal doesn't count.
5. The table screen shows every goal, whether it was met, and the points: 2 for your goal, 1 for naming the AI. Three or four players take about two minutes.

## What it shows

**Hidden information** carried by a device instead of card sleeves, with a **private metric** per player: the public board is one shared state, read through different private scores. Every move is public and every reason is private, so the table reads goals from moves (**hidden role and social deduction**), and each player must decide whether to move toward a goal or away from it to stay hidden.

What it argues (Claude's proposal): Nguyen, in *Games: Agency as Art*, describes a game's goal as an agency the player takes on for the length of the game; here each player takes on a different one, on the same board, and the conversation is where they meet. One of those goals is an optimizer's, and it looks like any other goal from the outside until you watch what it moves. That is Bostrom's point that you can't read an agent's final goal from its moves, since most goals want the same resources, made small (the `convergent-values` mechanic). Nguyen's "Value Capture" is the question for the reveal: did anyone start playing for the board's numbers instead of their goal?

## Could go in the game as

- The faction screens for *Data Center*: four phones around one paper map, each holding a faction's goal and score (GL's card, `private-goals-on-your-phone`).
- A hidden-AI variant where one human faction is secretly working for the AI.
- The phone as price board: the same room could hold prices that change, which Marlon raised on Nov 14 ("balancing the game on the fly"; see PE's economy prototypes).

## Remix it

Goals, tracks and tuning are at the top of `nextjs/app/proto/players/private-goals/rules.js`.

- "Add two new goals that set players against each other, and one about Power." (`GOALS`)
- "Make two players the AI, who know about each other." (`AI_IN_DEAL`, `deal()`, and the phone's goal box in `Phone.jsx`)
- "Let players send one private message to another phone each round." (a new `messages` path in the room state, `Phone.jsx`)
- "Rename the tracks for a game about our campus." (`TRACKS`; the goal texts name tracks too)

## Needs

A laptop running the reader app (it holds the room), a projector, and two to six phones on the same network as the laptop; plain HTTP is enough, no camera or NFC. No phones? Open the phone page in several browser tabs on the laptop (the table screen links to it); each tab is its own player. The room's state sits on the laptop's dev server, and the goals are hidden by the pages, not encrypted: anyone who reads the room's JSON can see them. No model call.

*Claude's prototype (PI, Nov 15), from GL's game-idea card and PL's assignment; a proposal until Marlon plays it. The goals and tracks are invented.*
