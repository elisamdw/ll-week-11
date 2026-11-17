---
title: "Monopoly with live rents"
description: "The LL's Monopoly on the table, with the rents moved off the deeds onto a screen and phones: printed, rebalanced by a designer between games, or rising with every landing."
kind: hybrid
week: 11
date: 2026-11-15
status: prototype
author: claude (PB, Claude Code 107470fa-4f33-4186-8608-7c9ad82099d4, started in ll-week-11 on FAS-DDW32PXW5L)
route: /proto/hybrid/monopoly-with-live-rents
mechanics: ["resource-management", "territory-and-area-control", "escalation", "feedback", "house-rules"]
readings: ["bogost-2007-persuasive-games", "schell-2008-art-of-game-design", "sicart-2008-defining-game-mechanics"]
ideas: ["monopoly-with-live-rents", "rebalance-between-games", "prices-that-move"]
sources:
  - "ll-week-11: _content/game-ideas/monopoly-with-live-rents.md and rebalance-between-games.md (GL, Nov 14)"
  - "ll-week-11: _context/orchestration/20261114/voice-handoff-back.md (Marlon on phone-held prices, Nov 14)"
  - "ll-week-11: _content/game-state/monopoly.md (HI: deeds as templates)"
---

Marlon, in the Nov 14 voice chat: in Monopoly the prices are printed on the cards, but on a phone you could adjust them "as a one-time rebalance" ("try playing it with a new set of constraints") or dynamically, "as in the real world, because prices change in response to demand," which is "hard to cope with in a tabletop game." This prototype does both with the LL's Monopoly box. Board, tokens, deeds, houses and money stay on the table. Only the rents move to a screen.

## How to play

1. Open `/proto/hybrid/monopoly-with-live-rents` on the laptop or projector. Players open the address in the join box on their phones (same Wi-Fi) and type their name or token. With one device, click properties on the laptop instead.
2. Play Monopoly as usual. When you land on a property, tap it on your phone, say whether someone owns it and what's on it (houses, a hotel, how many railroads), and pay what the phone says. **Paid: log it** records the landing.
3. The table chooses the mode: **Printed** (the deeds), **Rebalanced** (the designer's dials set each color's rents before the game) or **Live** (each landing on a color raises its rents 15%; at **End round** the rise cools off by 30%).
4. Play ten minutes printed, then ten live, and compare. **Every landing** shows what was paid next to what the deed says.

## What it shows

**A printed rule against a mechanic that responds.** On a deed, Illinois Avenue's rent is a fact. On the phone it is a value that play changes. The board is the same and the game is different: in live mode the colors that get landed on most (orange and red, in many accounts of the game's probabilities, though not checked here) become expensive, so where people happen to land turns into an economy. Rent rises as a result of play, which is Bogost's procedural rhetoric at its smallest: the claim that prices follow demand is made by the mechanic, not stated.

**The designer's move and the game's move,** which voice Claude separated on Nov 14: a one-time rebalance is playtesting, a designer changing constants between games. Live rents are the game's own behavior. The same code holds both: the dials are `design`, demand is `demand`, and rent is the printed rent times both (`multiplier()` in `rents.js`).

**Templates hold constants; instances can carry live values.** The deed is HI's template; with live rents, part of the template becomes game state (`demand`, round by round, in the room's history).

*PB's proposal, not Marlon's words (except the quotes); the readings are summarized from memory and should be checked against the texts.*

## Could go in the game as

- **GPU and land prices in *Data Center*,** shown on phones while the map stays printed. The AI's purchases count as landings, so its demand raises the humans' prices (PE's [Prices that move](../economy/prices-that-move.md) runs that economy on one screen).
- **A between-games rebalance ritual:** after each playtest the class moves one dial and says why, and the log of dial changes becomes the design history.
- **A disclosure rule:** in one version the phone shows the price only to the person who landed, so no one knows the market.

## Remix it

Ask Claude Code, in `nextjs/app/proto/hybrid/monopoly-with-live-rents/` (tuning at the top of `rents.js`):

- "Make demand faster and never cool off, and cap rents at five times the deed." (`STEP`, `DECAY`, `MAX_DEMAND`)
- "Make purchase prices live too, rising each time anyone buys in a color." (`rents.js`: a price multiplier next to the rent one; `Landing.jsx` to show it)
- "Add an AI player whose every round counts as two landings on the most expensive color." (`endRoundOps` in `rents.js`)
- "Let landings come from NFC taps: a sticker on each space, tapped with a phone." (join with [Every tap is a row](every-tap-is-a-row.md); Web NFC needs Android Chrome over HTTPS)

## Needs

- **The LL's Monopoly box** (rents are the classic US deeds; check the box's edition, which may differ).
- **A laptop** running the dev server, with the screen on a projector or turned to the table.
- **Phones** on the same Wi-Fi as the laptop, opening its network address (shown in the join box). No HTTPS needed: the phones use no camera or NFC. Harvard's guest Wi-Fi may keep devices from reaching each other; a phone hotspot works.
- Optional: one device only. Every landing can be logged from the laptop.
