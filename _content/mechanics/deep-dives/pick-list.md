---
title: "Deep dives: the pick list"
description: "Mechanics and technologies the fellows have had their hands on, with where the LL's record shows it and whether an entry already exists to start from."
kind: index
week: 11
date: 2026-11-17
status: "draft, 2026-11-17 morning; the 'Start from' column changes as EG and EM write"
author: "claude (EF, Claude Code d438c4b6-e381-44c0-a8c6-31a2638ecdd6, started in ll-week-11 on FAS-DDW32PXW5L)"
---

# Deep dives: the pick list

Pick one you have tried. "Where the record shows it" says where the LL's notes show the thing in use, so you can look up what was made; it names things, not people. If the notes don't show fellows using it, that only means nobody wrote it down: if you have tried it, it's yours to write. The id names your file (`<id>.md`).

**Start from:** LL mechanics are in `_content/mechanics/ll/` and technologies in `technologies/`; game mechanics in `mechanics.csv` and `new/`. Where an entry exists, read it and write what you saw that it doesn't say. Entries marked "being written" are on the way today.

## LL studio mechanics

The five Marlon named on Nov 17 (07:13, the voice agent's record): "the overhead camera", "green paper as a green screen", "Just cards", "11×17 paper is the technology, and the mechanic could be sort of the map, the table... the place setting", "concept map, or node graph, knowledge graph".

| Thing | id | Where the record shows it | Start from |
| --- | --- | --- | --- |
| The overhead view | `overhead-view` | The video essay workshop's paper station, "visual arguments using overhead cameras" (Greatest Hits report); draw-a-box under the overhead camera, week 10 | [EM's entry](../ll/overhead-view.md) (draft) |
| An overhead camera per station | `overhead-stations` | Four set up in the studio Nov 16, "a significant transformation to the studio" (Marlon's day-one report); ASTRON 98 needs four tonight | [EM's entry](../ll/overhead-stations.md) (draft) |
| Green paper as a green screen | `green-paper-key` | The puppetry residency guide, an earlier LLUF prompt; luma key at the AFVS 173F digital station (Greatest Hits report) | [EM's entry](../ll/green-paper-key.md) (draft) |
| Cards | `cards` | The week's deck and the 25-card primer, printed Nov 16 (`_content/cards/`); adjective cards in the mic taste test | [EM's entry](../ll/cards.md) (draft) |
| The place-setting map on 11x17 | `place-setting-map` | The primer on 9 sheets of 11x17 (Nov 16); the LL's standard print size | [EM's entry](../ll/place-setting-map.md) (draft) |
| The concept map or node graph | `concept-map` | The ideas and cards graphs, `/ideas/graph` and `/cards` | [EM's entry](../ll/concept-map.md) (draft) |
| Station rotation | `station-rotation` | The LL's most-used workshop shape (Greatest Hits report) | [EM's entry](../ll/station-rotation.md) (draft) |
| The taste test | `taste-test` | The mic taste test, French 30 and 40 and others (Greatest Hits report); French 30 is in the studio today | candidate |
| Paper prototype under the camera | `paper-prototype` | The video essay workshop's first station (Greatest Hits report) | candidate |
| Take apart a game | `take-apart-a-game` | Planned for the fellows this week: unpack a game you know (Nov 16 morning) | candidate |
| Share your five games | `shared-references` | The poll of the games the fellows play most (Nov 16, Marlon's day-one report) | candidate |
| The tap | `tap-to-move` | The NFC cards, written Nov 16 evening; planned for today's 3:00 slot | [EM's entry](../ll/tap-to-move.md) (draft) |
| The secret on your phone | `private-screen` | "a card for each position around the table, people tapping their phones there and then seeing whatever the secret information is on their phone" (Nov 17, 06:01, voice agent's record) | [EM's entry](../ll/private-screen.md) (draft) |
| Hotseat on one screen | `hotseat` | The week's game at `/game/play` | candidate |

## Technologies

| Thing | id | Where the record shows it | Start from |
| --- | --- | --- | --- |
| Webcam hand tracking (MediaPipe) | `mediapipe` | The fellows' Nov 10 instruments: hand drums, finger sounds, a gesture-run camera, Air Band, fingertip trails (`ll-week-10/_context/live-events/README.md`, entries 18 to 22) | [EM's entry](../technologies/mediapipe.md) (draft); [Claude's worked example](examples/hand-tracking.md) |
| USB MIDI controller | `midi-controller` | The fellows' MIDI and MPE studies, Nov 10, the source of the class's Seaboard page (same file, entry 23) | [EM's entry](../technologies/midi-controller.md) (draft) |
| NFC tags | `nfc-tags` | Cards written and read Nov 16 evening (morning intake, 18:12); the tabletop plan | [EM's entry](../technologies/nfc-tags.md) (draft) |
| Overhead cameras | `overhead-camera` | Four up in the studio since Nov 16 | [EM's entry](../technologies/overhead-camera.md) (draft) |
| Green paper | `green-paper` | Named Nov 17 | [EM's entry](../technologies/green-paper.md) (draft) |
| Microphones | `microphones` | The mic taste test; wireless mics connected Nov 10 (Marlon's recap) | [EM's entry](../technologies/microphones.md) (draft) |
| A camera that reads a game board | none yet | Tested Nov 16, starting with chess (Marlon's day-one report); the `photo-to-game-state` prototype at `/proto` | none |
| Claude Code, to make a game-like thing | none yet | Today's plan: "get people into Claude to actually make game-like things" (Marlon, Nov 16, 17:07); the fellows built the Nov 10 instruments with it | none |
| Game controllers | `game-controllers` | A task for this week: see which work on a Mac (Nov 17, 07:07); not tested | [EM's entry](../technologies/game-controllers.md) (draft) |

## Game mechanics

Most fellows know these from games they play, and from `/proto` and `/game` this week. The `/proto` prototypes were built Nov 15; the record does not yet say which ones fellows have played.

| Thing | id | Where the record shows it | Start from |
| --- | --- | --- | --- |
| Gesture input | `gesture-input` | The Nov 10 instruments; the "one gesture, one move" activity card | `mechanics.csv` row |
| Zones and spatial triggers | `zones-and-spatial-triggers` | Fingertip and body zones over the webcam, week 10 | `mechanics.csv` row |
| Feedback ("juice") | `feedback` | Every week 10 instrument; the activity cards ask for "visible confirmation" | `mechanics.csv` row |
| Hidden information | `hidden-information` | The week's game (`/game`); `/proto` `private-goals`; the NFC plan, each player seeing their own side of a card | `mechanics.csv` row |
| Resource management | `resource-management` | `/proto` `prices-that-move`; the paper market activity card | `mechanics.csv` row |
| Turn order | `turn-order` | The week's game, the hotseat at `/game/play` | `mechanics.csv` row |
| Voting and the collective decision | `voting-and-the-collective-decision` | `/proto` `committee`; *The Committee* version of the week's game | `mechanics.csv` row |
| Rewind and do-over | `rewind-and-do-over` | `/proto` `every-tap-is-a-row`; "the board and the log" activity card | `mechanics.csv` row |

## A game you play with friends

Not a mechanic but a game: one you play and could teach. Marlon's day-one report names a translation and overdubbing game played among friends as "a cool thing to document as a game this week". Write it with the same headings, and name the mechanics it uses.

## Not on the list?

Write it anyway, and add a row here, or tell whoever is collecting the deep dives.
