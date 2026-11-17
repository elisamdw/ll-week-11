---
title: "The deadline"
description: "Negotiation on phones joined to one room code: each phone holds tokens and a private set to complete, and trades run phone to phone for two minutes. The AI buys any token, pays more as the deadline nears, and keeps what it buys."
kind: players
week: 11
date: 2026-11-15
status: prototype
author: claude (PI, Claude Code fd339994-b588-4f18-bb35-a7acc0b2c967, started in ll-week-11 on FAS-DDW32PXW5L)
route: /proto/players/deadline
mechanics: ["trading-and-negotiation", "timer-and-countdown", "real-time-pressure", "hidden-information", "convergent-values"]
readings: ["bostrom-2012-the-superintelligent-will", "costikyan-1994-i-have-no-words-and-i-must-design", "nguyen-2020-games-agency-as-art"]
ideas: ["private-goals-on-your-phone"]
sources:
  - "PL's assignment for PI (Nov 15): negotiation with a deadline, on phones joined to one room code"
  - "ll-week-11: _content/mechanics/mechanics.csv (trading-and-negotiation: Catan; timer-and-countdown)"
---

Every phone holds a handful of tokens (Chips, Power, Water, Land) and a private need: a set of five, such as "2 Chips + 2 Power + 1 Water". The deal guarantees that every set can be made by trading. Players talk across the table and send offers phone to phone ("1 Water for 1 Land") for two minutes. Meanwhile the AI stands ready to buy any token for coins, and its price rises every thirty seconds. Coins are points, so selling a spare token is free money; but every token the AI buys leaves the table for good, and someone may have needed it.

## How to play

1. Open `/proto/players/deadline` on the laptop and put it on the projector (keep only that one table screen open: it runs the clock). Each player opens the address on their phone and types a name; the laptop deals and starts the clock.
2. Hold the dashed box on your phone to see the set you need. Your tokens are below it, each with a **Sell 1** button for the AI's current price.
3. Talk, then make offers: pick a player, set what you give and what you want, send. Offers to you appear with **Accept** and **Decline**. Every trade and every sale shows on the projector as it happens.
4. At the deadline, a complete set is worth 6 points and each coin 1. The table screen shows every need, who made their set, who was short, and whether the AI was holding what they lacked. Three to six players, two minutes plus the reveal.

## What it shows

**Trading and negotiation** under a **timer** (a clock everyone sees) and **real-time pressure** (everyone acts at once), with **hidden information**: you know your need and your tokens, and you learn the others' only from what they ask for. Costikyan's "I Have No Words and I Must Design" puts decisions and the management of resources at the centre of a game; here the decision the clock forces is between your set, the table, and the AI's coins.

What it argues (Claude's proposal): the AI here does one thing, buy resources, and does it by a written rule, yet it changes the game. Resource acquisition is one of the instrumental goals in Bostrom's "The Superintelligent Will" that almost any final goal would call for; the table meets it as a buyer whose offer is individually sensible to take and collectively costly, and which gets more tempting as time runs out. The ending's "the AI has it" column shows where a player's sale cost someone else their set.

## Could go in the game as

- The trading phase of *Data Center*: factions trading power, chips and land on their phones between rounds, with the AI's demand pricing the market (see PE's economy prototypes for prices that move).
- A deadline round for *The Committee*: the committee has two minutes to agree a budget, and the lab buys whatever it doesn't spend.
- The faction phones of GL's `private-goals-on-your-phone` card, with trading added.

## Remix it

Tokens, sets, the AI's price and tuning are at the top of `nextjs/app/proto/players/deadline/rules.js`.

- "Play without the AI, then with it, and compare how many sets got made." (`AI_BUYER`)
- "Make the AI's price jump when anyone sells it the last token of a kind." (`aiPrice()`, `sellOps()`)
- "Let players see each other's tokens, but not their needs." (the player list in `Table.jsx`)
- "Allow a three-way trade, or a promise to pay coins later." (the offer shape in `MakeOffer` in `Phone.jsx`, and `acceptOps()`)

## Needs

A laptop running the reader app (it holds the room and runs the clock), a projector, and three to six phones on the laptop's network; plain HTTP is enough. No phones? Open the phone page in several tabs on the laptop (the table screen links to it). The AI buyer is a written rule, not a model call. The needs are hidden by the pages, not encrypted: anyone who reads the room's JSON can see them.

*Claude's prototype (PI, Nov 15), from PL's assignment; a proposal until Marlon plays it. The tokens and numbers are invented.*
