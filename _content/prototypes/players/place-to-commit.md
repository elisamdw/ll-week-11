---
title: "Place to commit"
description: "Each round the AI announces where it will move and how hard. The table talks; then every phone commits one token in secret, to defend a place or to your own project for a point. No take-back, and every order is revealed at once."
kind: players
week: 11
date: 2026-11-15
status: prototype
author: claude (PI, Claude Code fd339994-b588-4f18-bb35-a7acc0b2c967, started in ll-week-11 on FAS-DDW32PXW5L)
route: /proto/players/place-to-commit
mechanics: ["alliance-and-betrayal", "cooperation", "hidden-information", "voting-and-the-collective-decision"]
readings: ["nguyen-2020-games-agency-as-art", "kokotajlo-et-al-2025-ai-2027", "salen-zimmerman-2003-rules-of-play"]
ideas: ["place-to-commit"]
sources:
  - "ll-week-11: _content/game-ideas/place-to-commit.md (GL's card, Nov 14: simultaneous secret orders, as in Diplomacy)"
  - "PL's assignment for PI (Nov 15): everyone commits orders in secret on their phone, all reveal at once on the table"
---

*Diplomacy*'s order phase, small and with an AI. Each round the table screen announces the AI's two moves and their strength ("The press, strength 1; Regional grid, strength 1"). The AI's strength is set so the table can stop it only if all but one player defend. Players talk and make promises; then each commits one token on their phone, in secret, either to defend a threatened place or to their own project for a point. A committed order can't be changed. When the last phone commits, the table screen reveals every order at once and the AI takes any place it outnumbers. If it takes three, nobody's points count.

## How to play

1. Open `/proto/players/place-to-commit` on the laptop and put it on the projector (keep only that one table screen open; it resolves the rounds). Each player opens the address on their phone and types a name; the laptop starts.
2. Read the AI's two moves on the screen. Talk: who defends what, and who takes the point this time?
3. On your phone, pick **Defend …** or **My own project**, then **Commit**. The table screen shows who has committed, never where.
4. When everyone has committed, the orders flip over together; places with enough defenders hold. Four rounds; most points wins, unless the AI took three places. Two to six players, about two minutes.

## What it shows

**Simultaneous secret orders** (GL's card names simultaneous action selection, which isn't in `mechanics.csv` yet; the nearest entries are **alliance and betrayal** and **hidden information**). Promises are made in the open and kept or broken in private, and nothing enforces them. The defense is **cooperation**: everyone loses if the AI gets three places. The own-project token is the temptation: each round, one player can take it safely, and the room has to agree who, or someone takes it anyway.

What it argues (Claude's proposal): the table faces a small public-goods problem with an AI as the shared threat. That is the shape of AI governance stories like *AI 2027*, where every actor would rather the others hold back. Committing in secret and revealing at once changes the conversation: you can't wait to see what others did. Salen and Zimmerman's *Rules of Play* treats games as systems of rules and of social play; here the rule set is four lines and the play is all in the promises. Nguyen's point that a game hands players ends to take on for a while (his "disposable ends") fits the debrief: who played as a citizen, who as a free rider, and did it change once someone broke a promise?

## Could go in the game as

- The factions' order phase in *Data Center*: every faction commits its actions on a phone before the round resolves.
- PB's NFC version (the original `place-to-commit` card): a token placed on a reader under the table is the commitment; the phone reveals.
- *The Committee* with secret ballots: each member commits a vote, revealed together.

## Remix it

The AI's rule and the tuning values are at the top of `nextjs/app/proto/players/place-to-commit/rules.js`.

- "Reveal the orders one at a time, in turn order, instead of all at once." (`Table.jsx`, the reveal list; or let each phone see the earlier orders)
- "Make the AI's strength grow every round it isn't stopped." (`totalStrength()`, `threaten()`)
- "Let players commit two tokens, one public and one secret." (`orders` in the room state, `Commit` in `Phone.jsx`)
- "Score the own project higher the more places the AI holds." (`resolve()`)

## Needs

A laptop running the reader app (it holds the room and resolves the rounds), a projector, and two to six phones on the laptop's network; plain HTTP is enough. No phones? Open the phone page in several tabs on the laptop (the table screen links to it). The AI is a written rule, not a model call. Orders are hidden by the pages, not encrypted: anyone who reads the room's JSON can see them before the reveal.

*Claude's prototype (PI, Nov 15), from GL's game-idea card and PL's assignment; a proposal until Marlon plays it. The places and numbers are invented.*
