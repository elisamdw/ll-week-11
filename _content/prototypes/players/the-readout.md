---
title: "The readout"
description: "Each round one player's phone shows where the AI will move next. Only they see it, and the phone is right four times in five. They tell the table what they like; the table fortifies one place; then the AI moves."
kind: players
week: 11
date: 2026-11-15
status: prototype
author: claude (PI, Claude Code fd339994-b588-4f18-bb35-a7acc0b2c967, started in ll-week-11 on FAS-DDW32PXW5L)
route: /proto/players/the-readout
mechanics: ["hidden-information", "asymmetric-information", "cooperation", "alliance-and-betrayal", "disclosure-rule"]
readings: ["bostrom-2014-superintelligence", "kokotajlo-et-al-2025-ai-2027", "costikyan-2013-uncertainty-in-games"]
ideas: ["the-turn-only-the-phone-knows"]
sources:
  - "ll-week-11: _content/game-ideas/the-turn-only-the-phone-knows.md (GL's card, Nov 14)"
  - "PL's assignment for PI (Nov 15): the AI's move is computed and shown to one player, who decides what to tell the rest"
---

The AI's next move is computed on a phone and shown to one player. That player is the table's only window into the AI, and they own a place on the board like everyone else. They can tell the truth, shade it, or send the table to fortify their own place. The phone is right about four times in five, so a wrong call can always be blamed on the readout. After the game, the table screen shows what every phone said.

## How to play

1. Open `/proto/players/the-readout` on the laptop and put it on the projector. Each player opens the address on their phone and types a name; the laptop starts the game.
2. Each player owns one place (a hospital, a newsroom, a library), and two commons belong to nobody. The AI wants two places; if it gets them, everyone loses.
3. Each round, one phone says "You hold the readout." That player holds the box to read where the AI is going, then tells the table whatever they like.
4. The table argues, then taps one place on the laptop to fortify (it stays safe for the rest of the game) and presses **The AI moves**. If the AI's target is fortified, it's blocked; if not, the AI takes it.
5. Four rounds, the reader changes each round. At the end, the table screen shows each round's readout beside what the AI did: compare it with what each reader said out loud. Two to six players, about two minutes.

## What it shows

**Asymmetric information** through a single human channel: one player sees what the machine will do, and everyone else gets it secondhand. The table is cooperating against the AI (**cooperation**: everyone loses if it wins), but each reader also has a place of their own, so the channel has a motive (**alliance and betrayal**: a deal with nothing to enforce it). The readout's 20% error rate is what lets a lie pass. Costikyan's *Uncertainty in Games* sorts the uncertainty that holds players by its source, hidden information and randomness among them; here the two are stacked, since the readout is hidden and sometimes wrong, and the table can't tell which one misled it.

What it argues (Claude's proposal): watching an AI's plans only helps if the people who read the plans report them faithfully. *AI 2027* turns on a small committee that sees what the public doesn't; Bostrom's treacherous turn is about a system whose behaviour under observation misleads. Here the AI is plain and the weak point is the person between the readout and the room. The **disclosure rule** mechanic is the obvious remix: vote before play on whether the reader must show the phone.

## Could go in the game as

- The hidden turn card in *Data Center* or *The Committee*, held on one phone (GL's `the-turn-only-the-phone-knows` card; PB's NFC tag version would put the readout on a tap).
- A lab-insider role: one faction sees the AI's deck order and is scored on its own nodes.
- The oversight committee's briefing in *The Committee*: one member reads the AI's plan to the rest.

## Remix it

The AI's rule and the tuning values are at the top of `nextjs/app/proto/players/the-readout/rules.js`.

- "Make the AI go for the place nobody fortified last round, instead of at random." (`aiTarget()`)
- "Add the treacherous turn: after round 2, the readout always shows a decoy." (`readout()`; `history` already records what was shown)
- "Before the game, the table votes whether the reader must show their phone." (a lobby vote in `Table.jsx`; the `disclosure-rule` mechanic)
- "Make the readout perfect, and see whether anyone still lies." (`READOUT_ACCURACY = 1`)

## Needs

A laptop running the reader app (it holds the room), a projector, and two to six phones on the laptop's network; plain HTTP is enough. No phones? Open the phone page in several tabs on the laptop (the table screen links to it). The AI is the written rule in `aiTarget()`, not a model call. The readout is hidden by the pages, not encrypted: anyone who reads the room's JSON can see it.

*Claude's prototype (PI, Nov 15), from PL's assignment and GL's game-idea card; a proposal until Marlon plays it. The places are invented.*
