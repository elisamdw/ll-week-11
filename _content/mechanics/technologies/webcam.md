---
title: "Webcam"
description: "The camera in or on a laptop, facing the people in front of it: the input for hand, body and face tracking."
id: webcam
kind: technology
category: "Cameras"
tested: "Yes"
the_ll_has: "Every studio laptop's built-in camera; how many laptops and any separate USB webcams are not in the record I read."
cost: ""
status: draft
author: "EM (Claude Code c24dcd2b-601e-4484-9fad-1a19b127dcd4, started in ll-week-11 on FAS-DDW32PXW5L), Nov 17, 2026"
sources:
  - "NB/apps/ll-weeks/ll-week-10/_context/live-events/README.md (week 10 inventory, Nov 13; entries 13 to 22)"
  - "NB/_context/projects/50-in-focus/ll-weeks/fall-2026/10-ending-20261113/marlon/20261113-class-live-interaction-recap.md (Marlon's dictation, Nov 13)"
  - "_content/prototypes/hybrid/the-room-is-the-board.md and nextjs/app/proto/hybrid/the-room-is-the-board/tracking.js (Nov 15)"
mechanics: [gesture-input, zones-and-spatial-triggers, body-as-controller]
technologies: [mediapipe, overhead-camera, phones]
games: []
proposals: 1
---

# Webcam

## Definition

A small camera built into or clipped onto a laptop, facing the person at it. In the LL it is the input for tracking hands, bodies and faces in the browser, and the camera behind a video call.

## Description

The LL's tracking pages run on a laptop's own webcam: the fellows' instruments on Nov 10, including Air Band, where up to five people play "in front of one webcam" [1], and the TDM 155AI class on Nov 11, where Marlon "would use MediaPipe to track the positions of their hands or their heads or their fingers" [2]. *The room is the board* (Nov 15) uses one to see where up to six people stand [3].

The webcam faces the people; the [overhead camera](overhead-camera.md) faces the table. The same page can use either, but the views give different mechanics: bodies and gestures from the webcam, the state of the work from above.

## How to

1. **Chrome, at `localhost` or over HTTPS:** the browser will not open the camera otherwise [3].
2. **Allow the camera** when the page asks.
3. **Frame and light.** Even light on hands and faces, a plain background; for bodies, the camera at chest height or higher, far enough back to see feet [3].
4. **Mirror the preview,** so a player's left is the screen's left [3].

What goes wrong (our note, not from the record): another app holding the camera, or the wrong camera chosen when a phone or capture card is also connected. `/track/inputs` in the week 10 class app shows whether the page finds camera, hands, head and body [1].

## Why to

The webcam is the camera every laptop has, so a body-input page runs on whatever machine is in the room [1][2].

**Proposed, for Marlon to choose:** whether the LL needs webcams beyond the laptops'.

1. No: the laptops' own cameras are enough.
2. One or two wide-angle USB webcams on stands, for full-body and several-person tracking in front of the studio screen.

## Home game version

### In a regular classroom

The instructor's laptop on the projector; students in front of it.

### Digitally

Each student's own webcam, at home or in a call.

## Related

- [MediaPipe](mediapipe.md) (technology): the software that finds hands, bodies and faces in its picture.
- [Overhead cameras](overhead-camera.md) and [Phones](phones.md) (technologies): the other cameras.
- [Gesture input](../gm/gesture-input.md) and [Zones and spatial triggers](../gm/zones-and-spatial-triggers.md) (game mechanics); [The body as controller](../ll/body-as-controller.md) (LL mechanic, a candidate not yet written).

## Sources

1. `NB/apps/ll-weeks/ll-week-10/_context/live-events/README.md`, the week 10 inventory (Nov 13), entries 13 to 22.
2. `NB/_context/projects/50-in-focus/ll-weeks/fall-2026/10-ending-20261113/marlon/20261113-class-live-interaction-recap.md` (Marlon's dictation, Nov 13)
3. `_content/prototypes/hybrid/the-room-is-the-board.md` and `nextjs/app/proto/hybrid/the-room-is-the-board/tracking.js` (Nov 15)
