---
title: "The room is the board"
description: "A webcam cuts the room into five places; each turn the AI spreads into the places where no one is standing, and bodies are the only pieces."
kind: prototype
convolute: room-as-board
tags: [space, cameras, play, autonomy]
audience: [tdm155ai, llufs]
links: [game-ideas/the-room-is-the-board, prototypes/hybrid/the-room-is-the-board, game-ideas/see-the-data-centers, every-tap-is-a-row, the-audience-layer, mechanics/zones-and-spatial-triggers, mechanics/movement-and-position, mechanics/territory-and-area-control, mechanics/cooperation, territory-and-area-control, cooperation]
sources: ["_content/prototypes/hybrid/the-room-is-the-board.md", "_content/game-ideas/the-room-is-the-board.md", "_content/game-ideas/README.md"]
voice: mixed
author: CM
date: 2026-11-15
week: 11
status: draft
---

PB's camera version of GL's Nov 14 idea: the pose model splits the room into a power plant, a reservoir, farmland, a town and a school. A place needs one body to hold it and two to take it back, and from turn four one person alone can't stop the AI, so the room has to decide how to spread itself without anyone saying so. The game state is what the camera can see.

---

**What it is.** GL's idea of November 14 was to tag things in the LL (the projector, the network rack, the water fountain) so that acting on a place means walking to it. PB built a camera version on November 15 at `/proto/hybrid/the-room-is-the-board`, using the MediaPipe pose model the LL's theremin pages already load. The camera sees the room from the front and cuts it into five places, left to right: Power plant, Reservoir, Farmland, Town, School.

**How it plays.** Everyone stands in the room; the counts on the projector move as people move. A turn lasts twelve seconds. When it ends, the AI takes the places where no one is standing, and it wants more each turn. Two people standing in a place the AI holds take it back. From turn four, one person alone no longer stops it. Eight turns; then read the table, one row per turn of where bodies were. Without a camera, *Stand-ins* puts draggable tokens on a floor plan.

**What it does for learning.** Two rules make the tension: a place needs one body to hold it and two to take back, so the room has to decide how to spread itself, without anyone saying so. It is the "Space and the body" family of the mechanics inventory played at full size, and Jenkins's game space as narrative architecture with the floor as the map. The AI grows on a schedule no one can change and moves only into what is unwatched. The camera's mistakes (someone half out of frame doesn't count) are worth saying aloud: the game state is what the camera can see.

**Which of Marlon's ideas it serves.**

> I'd like a zone of game idea cards to think about (like the card brainstorming we've done before). one bunch involving NFC, another involve interssection of table-top and phone, another AR/XR with phone.

Marlon, Nov 14, quoted at the top of GL's game-ideas README. *The room is the board* came out of that request. Marlon has said nothing about the prototype itself yet; that it serves the week's theme of games and interaction is CM's reading.

**In the week:** a break-time station for Wednesday, and a room-scale *Data Center* to try with the LLUFs (the map taped on the studio floor). Not yet tested with people in front of a real camera; it needs the network to load the pose model, a projector, open floor and a camera that sees feet.

*CM's account of PB's prototype and GL's idea, Nov 15. Not Marlon's words unless quoted.*
