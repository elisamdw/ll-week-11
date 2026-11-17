---
title: "The room is the board"
description: "A webcam watches the room, cut into five places. Each turn the AI spreads into the places where no one is standing; stand to hold a place, two to take one back. Bodies are the only pieces."
kind: hybrid
week: 11
date: 2026-11-15
status: prototype
author: claude (PB, Claude Code 107470fa-4f33-4186-8608-7c9ad82099d4, started in ll-week-11 on FAS-DDW32PXW5L)
route: /proto/hybrid/the-room-is-the-board
mechanics: ["zones-and-spatial-triggers", "movement-and-position", "territory-and-area-control", "escalation", "real-time-pressure", "cooperation"]
readings: ["jenkins-2004-game-design-as-narrative-architecture", "bostrom-2014-superintelligence"]
ideas: ["the-room-is-the-board", "see-the-data-centers"]
sources:
  - "ll-week-11: _content/game-ideas/the-room-is-the-board.md (GL, Nov 14)"
  - "ll-week-11: _content/mechanics/mechanics.csv (Space and the body)"
  - "ll-week-10: _context/research/04-between-digital-and-physical.md (MediaPipe in the browser, RS, Nov 9)"
  - "bok-to-the-future: the-apps/mk-audio-editing/interface/nextjs/app/theremin/ (the LL's MediaPipe setup, copied)"
---

The camera sees the room from the front, and the page cuts the view into five places, left to right: Power plant, Reservoir, Farmland, Town, School. A turn lasts twelve seconds. When it ends, the page counts the people standing in each place. The AI takes places where no one is standing, and it wants more each turn. Two people standing in a place the AI holds take it back. From turn four on, one person alone no longer stops the AI. Eight turns.

## How to play

1. Open `/proto/hybrid/the-room-is-the-board` on the laptop at `http://localhost:3111`, put it on the projector, and point the laptop's camera at the open floor, wide enough to see people's feet. Choose **Camera (bodies)**.
2. Everyone stands in the room. **Start**. Watch the counts move as you move.
3. At the end of each turn the AI takes empty places (they turn purple). Spread out to block it, or pair up to take a place back. Each turn you have to choose between the two.
4. After eight turns, or when the AI holds the whole room, read the table: every turn is a row of where bodies were.

No camera, or no network for the model? **Stand-ins (drag)** puts numbered tokens on the floor plan. Drag them between places; add or remove people.

## What it shows

**Zones and spatial triggers** and **movement and position** from the mechanics inventory's "Space and the body" family: where your body is changes what the game can do. Two simple rules produce the tension: a place needs one body to hold it and two to take back, so the room has to decide how to spread itself, without anyone saying it. Jenkins's game space as narrative architecture is here the room itself. The map isn't drawn; it is the floor, and the story is told by where people stand.

**The AI as a system:** it grows by a schedule the players can't change (`AI_TAKES`) and only ever moves into what is unwatched, a small version of the AI-as-expansion argument in Bostrom. **The camera** turns bodies into state at the end of each turn, and the log is that state over time, as in [Every tap is a row](every-tap-is-a-row.md). The room doesn't see the camera's mistakes. A person half out of frame or behind someone else doesn't count, which is worth saying aloud.

*PB's proposal, not Marlon's words; the readings are summarized from memory and should be checked against the texts.*

## Could go in the game as

- **The AI's turn in a room-scale *Data Center*:** the map is taped on the studio floor, the regions are places in the LL, and the humans' only moves are where they stand.
- **A committee that votes with its feet:** stand under a policy to back it; the count is the vote (pairs with PI's committee).
- **The audience layer:** people watching a tabletop game stand in zones to nudge prices or the AI, and the room becomes a market.

## Remix it

Ask Claude Code, in `nextjs/app/proto/hybrid/the-room-is-the-board/RoomBoard.jsx` (tuning at the top):

- "Use a 2 by 3 grid of places instead of five strips, using how far people are from the camera for the rows." (`ZONES`, `zoneOf`; depth from the camera is rough, so try it)
- "Make the AI faster but let a raised hand count as two people." (`AI_TAKES`; hand height is in the pose landmarks in `tracking.js`)
- "Name the places after things in our room and print signs to tape on the floor." (`ZONES`)
- "Freeze: when the AI is watching, anyone who moves is out." (compare positions between frames in the camera loop)

## Needs

- **A laptop with a webcam,** served at `localhost` (the camera needs localhost or HTTPS) and **the network:** the pose model (MediaPipe's pose landmarker, lite) and its library load at runtime from Google's model storage and jsdelivr, pinned to `@mediapipe/tasks-vision` 1.1.1, the version the LL's theremin pages use. No package was added to `ll-week-11`.
- **A projector** and **open floor**, with the camera at chest height or higher so it sees feet; up to six people are tracked.
- **Tested:** the game, the stand-ins, and the camera path with Chrome's fake camera (camera opens, model loads, tracking runs). **Not yet tested with people in front of a real camera.** Try it before class.
- No phones, no NFC, no paid API.
