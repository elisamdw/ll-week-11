---
title: "Photo to game state"
description: "You are the vision model: pin what you see on an overhead photo of Monopoly or a card table, and the pins become game state, a table and JSON. Two photos give a diff. Then read what no photo shows."
kind: hybrid
week: 11
date: 2026-11-15
status: prototype
author: claude (PB, Claude Code 107470fa-4f33-4186-8608-7c9ad82099d4, started in ll-week-11 on FAS-DDW32PXW5L)
route: /proto/hybrid/photo-to-game-state
mechanics: ["hidden-information", "asymmetric-information", "movement-and-position", "territory-and-area-control"]
readings: ["manovich-1999-database-as-symbolic-form", "salen-zimmerman-2003-rules-of-play", "juul-2005-half-real"]
ideas: ["photo-to-game-state", "holdem-with-lipstick-cams", "index-cards-that-answer", "marker-corners"]
sources:
  - "ll-week-11: _content/game-ideas/photo-to-game-state.md (GL, Nov 14)"
  - "ll-week-11: _context/orchestration/20261114/voice-handoff-back.md (Marlon on photographing board games into data, Nov 14)"
  - "ll-week-11: _content/game-state/monopoly.md and texas-holdem.md (HI's data models and 'what a photo shows')"
---

Marlon, in the Nov 14 voice chat: "In my class, at least, and maybe in Stafford's class, we should actually just go from a board game to how you would represent the data of that board game as a game state," with overhead shots: "here's the game, and then take a photo of it." This prototype does that step by hand. A person looks at the photo and pins each piece they see, then fills in what the piece says (whose token, which deed, how many chips). The page turns the pins into state, following HI's models in [games as data](../../game-state/). No model is called. A vision model would do the same job; doing it by hand shows what that job is.

## How to play

1. Open `/proto/hybrid/photo-to-game-state`. Pick **Monopoly** or **Cards on a table**. Photo A starts as a drawing that stands in for a photo; **Upload or shoot** (a phone's camera, through the file picker) or **Webcam** (the laptop) replaces it.
2. Pick a piece on the right and click where you see it on the photo. On the Monopoly board, the dashed grid shows which space a spot counts as. On a new photo, click **Set the board's corners** first, and say which corner GO is in. On the card table, pin a **Seat** for each player; a card or chips near a seat belong to that player.
3. Watch the state table and the JSON build. Then go to **Photo B**, use **Copy pins from A**, and drag the pieces that moved. **From A to B** lists what changed.
4. Read **Not in the photo**. For a two-minute demo, **Example pins for the drawing** fills in A and B.

## What it shows

**Templates and instances:** the board's 40 spaces, the deeds and the deck are the template; the pins are one game's instances. A house pin doesn't say its rent. The rent is looked up from the template, which is HI's point about normalization.

**Position as data:** on the ring board, where a pin sits decides which space it's on (the geometry is in `ring.js`). On the card table, nearness decides ownership. A pile of discards set down near one player reads as theirs. Change `OWN_RADIUS` and watch the table and the diff change.

**Hidden information:** face-down cards enter the state as a count, never as a value. The deck's order, whose turn it is, and deals made out loud aren't in any photo. That is the difference between the board and the game state, and why broadcast poker added lipstick cams and then RFID cards (GL's [Hold'em with lipstick cams](../../game-ideas/holdem-with-lipstick-cams.md)).

**The diff is the turn.** Two snapshots and their difference make a record of play. It is the reverse of [Every tap is a row](every-tap-is-a-row.md), which keeps the events and rebuilds the state from them. Salen and Zimmerman's split between the rules printed in the box and the logic underneath, and Juul's point that a computer holds the rules for you, both show here: the pins hold no rules, and the page applies them.

*PB's proposal, not Marlon's words (except the quote); the readings are summarized from memory and should be checked against the texts.*

## Could go in the game as

- **The tabletop version of *Data Center*.** After each round someone photographs the printed map and the class pins it. The pins become the game's save file, and the next round's prices or the AI's turn are computed from them.
- **The index-card database.** William's students' index cards on a table, pinned as cards face up with their words typed in: the cards become rows.
- **The camera turn.** Once Marlon okays a vision model, the same page sends the photo to a model and shows its pins next to a person's, and the class grades the model.

## Remix it

Ask Claude Code, in `nextjs/app/proto/hybrid/photo-to-game-state/`:

- "Add a Risk template: armies as pins with a count, territories found by which region of the photo they're in." (`TEMPLATES` in `PhotoState.jsx`; a region map like `ring.js`)
- "Add a hotel and house limit from the bank (32 houses, 12 hotels) and warn when the pins go over it." (`deriveState` in `PhotoState.jsx`)
- "Find the board's corners from four printed markers instead of two clicks." (marker detection would need a library such as an ArUco or AprilTag reader; ask PL before adding one)
- "Send the photo to a vision model and pin what it finds, next to my pins." (needs Marlon's ok for a paid API; stub it first)

## Needs

- **A laptop** with a browser. The drawings and example pins work with no camera.
- **A camera:** the laptop's webcam works at `http://localhost:3111`. A phone can use **Upload or shoot**, which opens its camera through the file picker, but the page has to be served to the phone first: over the laptop's network address it isn't HTTPS, so the phone's live webcam view won't open, though the file picker still works.
- **An overhead shot:** the board mapping assumes the photo is taken from straight above with the board square to the frame. A tilted photo puts pins on the wrong spaces, which is a good thing to try once.
- **The LL's boxes:** Monopoly (check the edition; the space names are Hasbro's current US list, from HI's page), a deck of cards and chips, or index cards. No vision model and no paid API.
