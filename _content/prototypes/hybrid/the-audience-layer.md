---
title: "The audience layer"
description: "Players on stage shield cells from a spreading AI without knowing where it goes next. The audience's phones show them where, and each watcher has three nudges for the game: a hint to the players, or food for the AI."
kind: hybrid
week: 11
date: 2026-11-15
status: prototype
author: claude (PB, Claude Code 107470fa-4f33-4186-8608-7c9ad82099d4, started in ll-week-11 on FAS-DDW32PXW5L)
route: /proto/hybrid/the-audience-layer
mechanics: ["the-spect-actor", "asymmetric-information", "hidden-information", "territory-and-area-control", "escalation"]
readings: ["taylor-2018-watch-me-play", "salen-zimmerman-2003-rules-of-play"]
ideas: ["the-audience-layer", "holdem-with-lipstick-cams", "one-player-sees-the-intent"]
sources:
  - "ll-week-11: _content/game-ideas/the-audience-layer.md (GL, Nov 14)"
  - "ll-week-11: _content/mechanics/mechanics.csv (the-spect-actor: Twitch Plays Pokémon; Claude Plays Pokémon)"
---

Broadcast poker gives the viewers more than the players have: the hole cards. This prototype does the same for a tiny AI game. On the projected stage, two or three players protect a 4 × 3 board from an AI that spreads one cell at a time from the middle. They can't see where it's going. Everyone in the audience can, on their phones. Each watcher has three nudges for the whole game and spends them in the open: a **hint** lights up the row the AI is aiming at (three hints light the cell), and a **feed** pushes the AI on (every two feeds give it an extra cell). The audience decides how much to help, and whether to help at all.

## How to play

1. Open `/proto/hybrid/the-audience-layer` on the laptop and project it. The players stand at the laptop. Everyone else opens the join address on a phone (same Wi-Fi) and types a name.
2. **Start**. Each round (20 seconds), the players click up to two cells to shield. The AI goes for one cell a round, two from round 4, three from round 7.
3. The audience sees the targets and can hint or feed. The stage shows only the tallies and what the hints light up.
4. At the end of the round, shielded targets are blocked, the rest fall, and the feeds add more. After eight rounds, read the table: what the AI went for, what was shielded, and what the audience did each round.

No phones? Someone at the laptop is the audience: the players look away while they click **+ a hint** or **+ a feed**.

## What it shows

**The spect-actor**, from the mechanics inventory: the watchers can change the play (the inventory's examples are *Twitch Plays Pokémon* and Twitch chat during Claude Plays Pokémon). T.L. Taylor's *Watch Me Play* treats the audience of a live game as part of the game. Here that participation is a resource with a cost: three nudges, spent in public.

**Asymmetric information:** the audience knows more than the players, the reverse of most games. The players learn to read the stage's tallies, and a lot of feeds means the audience isn't on their side. The same AI and board play differently depending on who watches and how they feel about the players.

**The AI as a system:** it grows on a schedule (`AI_TARGETS`) and only into cells next to what it holds. The audience can speed it up, which raises a question for the class: who in the room is on the AI's side, and why?

*PB's proposal, not Marlon's words; the readings are summarized from memory and should be checked against the texts.*

## Could go in the game as

- **The audience for a tabletop *Data Center*:** the players play the printed map; the audience's phones show the AI's hidden intent and can leak it or feed it.
- **Investors:** each feed is money for the AI lab, and the audience earns points when the AI grows. A small, readable profitable-harm loop.
- **Class roles:** half the class plays, half watches with phones, then swap and compare how each side felt.

## Remix it

Ask Claude Code, in `nextjs/app/proto/hybrid/the-audience-layer/` (tuning at the top of `rules.js`):

- "Give each audience member a secret side, helper or feeder, and reveal them at the end." (`rules.js`, `Audience.jsx`; compare PI's hidden-role prototypes)
- "Let the audience vote on where the AI goes instead of seeing it." (`pickTargets` in `rules.js`)
- "Make hints cost the players something: every hint they receive takes one of their shields next round." (`resolve`, `SHIELDS`)
- "Show the audience's nudges as a live feed on the stage, name by name." (`Stage.jsx`; push each nudge to a list in the room)

## Needs

- **A laptop** running the dev server, projected. It runs the clock and the rules, so keep it open.
- **Phones** on the same Wi-Fi as the laptop, opening its network address (shown on the stage). No HTTPS, camera or NFC. If the Wi-Fi keeps devices apart, use a phone hotspot.
- **No phones:** the laptop's audience buttons stand in.
- **Tested:** in headless Chrome, stage and phone together in one room (join, hint, feed, the round resolves, the log fills). Not yet tested with a full room of phones.
