---
title: "Technology lab: NFC cards and stickers"
description: "The NFC group's sheet for Nov 17: what's in the kit, a dozen things to try in the first half hour, the mechanics to look for, and where the Stafford 4X material is."
kind: activity
audience: llufs
week: 11
date: 2026-11-17
status: "draft for Marlon, 10:4x; mechanics list from EG (10:4x); nothing has run"
author: "claude (EF, Claude Code d438c4b6-e381-44c0-a8c6-31a2638ecdd6, started in ll-week-11 on FAS-DDW32PXW5L)"
sources:
  - "_content/mechanics/technologies/nfc-tags.md (EM, Nov 17)"
  - "NB/_context/projects/50-in-focus/ll-weeks/fall-2026/11-ending-20261120/marlon/20261117-morning-mechanics-entries-nfc-and-the-color-agents.md (voice agent's record, Nov 16 18:12 to Nov 17 06:02)"
  - "NB/_context/projects/50-in-focus/ll-weeks/fall-2026/11-ending-20261120/research/nfc-tags-and-phones.md (research, Nov 16)"
  - "_content/mechanics/new/the-tap.md (EG, Nov 17)"
  - "_content/mechanics/ll/tap-to-move.md (EM, Nov 17)"
  - "_content/prototypes/hybrid/every-tap-is-a-row.md (Nov 15)"
  - "nextjs/next.config.mjs (phones may load the reader at the laptop's network address)"
  - "_content/cards/nfc-for-simple-tabletop-games.md (Marlon, Nov 14)"
  - "_content/game/README.md (the week's game, Nov 14)"
  - "EG, message to EF, Nov 17, 10:4x: sixteen mechanics an NFC tap makes possible, by id"
mechanics: [the-tap, the-move-updates-state, hidden-information, asymmetric-information, hidden-role-and-social-deduction, deck-building-and-the-draw, rebalancing-on-the-fly, zones-and-spatial-triggers, location-play, territory-and-area-control, voting-and-the-collective-decision, trading-and-negotiation, crafting-and-combining, puzzle-and-lock-and-key, interruption-and-event-cards, memory-and-sequence, input-device, the-spect-actor]
technologies: [nfc-tags, phones, studio-screen]
games: []
proposals: 0
---

# Technology lab: NFC cards and stickers

Read the [shared frame](20261117-technology-lab.md) first. Your technology is the NFC tag: a small chip in a card or sticker that a phone reads when it touches it. Written with a web address, a tag makes the phone offer to open that page [1]. Your job is to find out what moves that makes possible.

## What's in the kit

From the record; check with staff what is on the table today.

- **NTAG215 cards.** They arrived and work; they were written on the evening of Nov 16 [2]. How many there are is not in the record.
- **Phones.** Your own. An iPhone (XS or later) reads tags without an app; an Android phone with NFC turned on does too [3].
- **The app that writes them: nfc.cool.** On Nov 16 nfc.cool wrote the cards and NFC Tools did not [2].
- **Somewhere for the tag to point.** Any web address works. The LL's reader app on the laptop (port 3111) can be opened from phones on the same Wi-Fi at the laptop's network address [7]; ask staff for it. For a quick test, any public page will do.
- **Not set up:** a USB reader for the laptop (a task filed Nov 17, 05:15) [2]. The *Every tap is a row* prototype at `/proto/hybrid/every-tap-is-a-row` is built for one; without it, it runs on keys and clicks [6].

What the record already knows, so you don't rediscover it:

- **The iPhone banner.** On an iPhone every tap shows a notification first, and you tap that to open the page: one move is two touches [1][2][3].
- **Where to tap.** "iPhone reads at the top edge of the back (lay cards flat and dip the top of the phone onto them)" [2].
- **Stacked cards interfere** [2].
- **Android and Chrome.** Android opens a URL tag in the browser; Android 16 opens it directly, Android 17 asks first [1][3]. Chrome on Android can also read tags inside an open web page (Web NFC), which an iPhone can't, but only over HTTPS, so not on the laptop's `http://` address [3][6].
- **Typos are dangerous.** A mistyped address on a tag (`vercell.app`) once opened a scam page [2]. Read the address back before you write it.
- **Don't lock a tag.** Locking is permanent [1].

## Things to try (the first 30 minutes)

Write down each result as a move: "You can ___, and that changes ___."

1. **Write one card** with nfc.cool and tap it with an iPhone. Count the touches from table to page.
2. **Tap it with an Android phone,** if anyone has one. Same number of touches?
3. **Find the sweet spot.** How close, which part of the phone, how fast? Can you tap without looking?
4. **Through things.** Does it read through a sheet of 11x17 paper, a card sleeve, a book, the table? A sticker under a printed board becomes a hidden place.
5. **Two cards close together,** then stacked. When does it read the wrong one, or neither?
6. **Two phones, one card.** Both see the same page. Is that a shared space or a problem?
7. **One card per seat, a different page each:** your role, your hand, your team. Who can see whose? This is Marlon's first proof of concept, "a card for each position around the table, people tapping their phones there and then seeing whatever the secret information is on their phone" [2].
8. **Rewrite a card mid-game.** The object stays the same and its meaning changes [4]. Who should be allowed to do that?
9. **A piece or a place?** Put a tag on a token you move, then on a spot on a paper map. Which tap feels natural, and which clumsy? Marlon asked where tapping "feels natural and pleasing, as opposed to clumsy and annoying" (Nov 16) [1].
10. **Hide one** under something in the room and send someone to find it by tapping.
11. **Time it.** How many seconds from touch to page? Could a tap be a timed move, or a race?
12. **Tap as check-in.** A tag at a station or door: what could it record about who came by?

## Mechanics to look for

EG's list (Nov 17) [10]: sixteen mechanics from the inventory that an NFC tap makes possible or easier, with EG's line on what each looks like with a tag. Definitions are in `_content/mechanics/mechanics.csv` and the pages in `new/`. Name each one your tries show, and add any it doesn't have.

| Mechanic | id | With a tag (EG) |
| --- | --- | --- |
| The tap as the move | `the-tap` | The tap is the move; tapping a card sends it to the shared game state. |
| The move updates state | `the-move-updates-state` | Every tap writes one row in a log, and the board is that log replayed. |
| Hidden information | `hidden-information` | Tap your own card and only your phone shows what it holds. |
| Asymmetric information | `asymmetric-information` | The same card shows each phone a different part of the picture. |
| Hidden role and social deduction | `hidden-role-and-social-deduction` | One tap per seat deals secret roles, so no one sees anyone else's. |
| Deck building and the draw | `deck-building-and-the-draw` | A tapped card is drawn, and the server can shuffle or swap what each card means. |
| Rebalancing on the fly | `rebalancing-on-the-fly` | The card stays the same while its price or power changes on the server between taps. |
| Zones and spatial triggers | `zones-and-spatial-triggers` | A tag stuck to a table, door or wall fires an event when someone taps it there. |
| Location play | `location-play` | Tags placed around the room or building make the space the board. |
| Territory and area control | `territory-and-area-control` | Tapping a place card claims it, and the map on the screen updates. |
| Voting and the collective decision | `voting-and-the-collective-decision` | Each person taps a yes or no card, giving one vote per phone and a live count. |
| Trading and negotiation | `trading-and-negotiation` | Tap to hand a card's ownership to another player; the server records the trade. |
| Crafting and combining | `crafting-and-combining` | Tapping two cards in a row combines them into a third. |
| Puzzle and lock-and-key | `puzzle-and-lock-and-key` | A tagged key card unlocks a page or clue only when it is tapped. |
| Interruption and event cards | `interruption-and-event-cards` | A tapped event card applies its effect to everyone's screen at once. |
| Memory and sequence | `memory-and-sequence` | Tap cards in the right order; the server checks the sequence. |

Also from EG: `input-device` (the tag as a controller) and `the-spect-actor` (people watching tap to nudge the game).

LL mechanics to compare: [the tap](../ll/tap-to-move.md) [5] and the secret on your phone (`private-screen`).

## For game 2: the Stafford 4X

What the LL has on the game for William Stafford's class (Mon Nov 23), to read before you sketch:

- Cards (at `/cards`, files in `_content/cards/`): `primer-stafford-workshop` (the workshop), `term-4x` and `the-4x-genre-for-stafford` (the genre), `four-xs-reversed` and `what-would-a-4x-without-conquest-look-like` (games that change the four X's), `an-anti-colonial-4x` (the idea of a 4X that critiques its genre), `a-learning-game-for-stafford`, `nfc-for-simple-tabletop-games` (Marlon, Nov 14: "doing some game mechanics with NFC is great, and we should try that this week") [8].
- The game on screen: `/game`, with four versions, among them *Data Center*: an AI spreads across a region's infrastructure, four factions with private goals act in turn, and one hidden card is the AI's turn [9].
- Hybrid prototypes at `/proto/hybrid/`: `every-tap-is-a-row`, `monopoly-with-live-rents`, `photo-to-game-state`, `the-audience-layer`, `the-room-is-the-board`.

Places a tag might go in it: the factions' private goals dealt at the seats, map regions you tap to build or defend, the AI's hidden cards. Those are starting points, not the answer.

## Sources

1. `_content/mechanics/technologies/nfc-tags.md` (EM, Nov 17).
2. The Nov 17 morning intake, `W11/marlon/20261117-morning-mechanics-entries-nfc-and-the-color-agents.md` (the voice agent's record of Marlon, Nov 16 18:12 to Nov 17 06:02).
3. `W11/research/nfc-tags-and-phones.md` (Nov 16).
4. `_content/mechanics/new/the-tap.md` (EG, Nov 17).
5. `_content/mechanics/ll/tap-to-move.md` (EM, Nov 17).
6. `_content/prototypes/hybrid/every-tap-is-a-row.md` (Nov 15).
7. `nextjs/next.config.mjs`: the dev server allows the laptop's network addresses, "Phones in the room join the prototypes (app/proto/) at the laptop's network address".
8. `_content/cards/nfc-for-simple-tabletop-games.md` (Marlon, Nov 14).
9. `_content/game/README.md` (Nov 14).
10. EG, message to EF, Nov 17, 10:4x: sixteen mechanics an NFC tap makes possible, by id.
