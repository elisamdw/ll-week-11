---
title: "MediaPipe"
description: "Google's free models that find hands, bodies and faces in a webcam's picture, inside a web page, so a body becomes the input."
id: mediapipe
kind: technology
category: "Software and models"
tested: "Yes"
the_ll_has: "Nothing to buy: the library loads from a CDN and the models from Google at first run. The LL's own pages that use it: face paint in mk-realtime-prototypes (Sept 25 to 29), the hackathon launchers in mk-audio-editing (Oct 22), the fellows' instruments (Nov 10), the week 10 class app's /track pages (Nov 11), and the week 11 prototype /proto/hybrid/the-room-is-the-board (Nov 15)."
cost: "Free (Google's MediaPipe Solutions)"
status: draft
author: "EM (Claude Code c24dcd2b-601e-4484-9fad-1a19b127dcd4, started in ll-week-11 on FAS-DDW32PXW5L), Nov 17, 2026"
sources:
  - "https://developers.google.com/edge/mediapipe/solutions/guide"
  - "https://developers.google.com/edge/mediapipe/solutions/vision/hand_landmarker"
  - "https://developers.google.com/edge/mediapipe/solutions/vision/pose_landmarker"
  - "https://developers.google.com/edge/mediapipe/solutions/vision/face_landmarker"
  - "NB/apps/ll-weeks/ll-week-10/_context/live-events/README.md (week 10 inventory, Nov 13; entries 13 to 25)"
  - "NB/_context/projects/50-in-focus/ll-weeks/fall-2026/10-ending-20261113/marlon/20261113-class-live-interaction-recap.md (Marlon's dictation, Nov 13)"
  - "NB/apps/ll-weeks/ll-week-10/_context/live-events/hardening.md (Nov 13)"
  - "the workbook's apps/mk-realtime-prototypes/_context/roadmap.md (Sept 25)"
  - "_content/prototypes/hybrid/the-room-is-the-board.md and nextjs/app/proto/hybrid/the-room-is-the-board/tracking.js (Nov 15)"
  - "_content/mechanics/format.md (version 1.5, Marlon's words in EL's pane, Nov 17, 10:47)"
mechanics: [gesture-input, body-as-cursor, pose-as-the-move, threshold-gesture, held-position-claims, zones-and-spatial-triggers, movement-and-position, mirroring-and-imitation, body-as-controller, cue-to-stage]
technologies: [webcam, overhead-camera, studio-screen, midi-controller]
games: []
proposals: 2
---

# MediaPipe

## Definition

A free Google library of models that run in the browser and find things in a camera's picture: the 21 points of each hand, the 33 points of each body, the 478 points of each face. A web page turns those points into moves, so a hand, a body or a face becomes the input to a game or a performance [1][2][3][4].

## Description

Google's description: "Run vision, text, audio, retrieval, and decision models directly in your app across Web, Android, iOS, Python, and Flutter" [1]. The LL uses its web version, the `@mediapipe/tasks-vision` package, through three of its models:

- **Hand Landmarker:** "21 3D keypoints per hand", with which hand it is; one hand by default, more if asked (`numHands`) [2].
- **Pose Landmarker:** "33 body landmark locations" for "each detected person", up to `numPoses` people [3].
- **Face Landmarker:** "478 3D facial landmarks per face", and, if switched on, "52 facial expression coefficients" such as `jawOpen` [4].

Marlon on why it counts here, Nov 17, 10:47, in EL's pane: "maybe coding frameworks are technologies too? like mediapipe for instance which allows pose-based input through webcam . . . I'd say this is a technology, and then you think of specific motion-to-result relations/dynamics as mechanics?" [10]. So this page is the tool; raising a hand to fire a cue, stepping into a zone to start a sound, and the rest are mechanics (see Related).

What the LL has done with it, from the record:

- **Face paint, Sept 25 to 29** (mk-realtime-prototypes): "a texture painted on the canonical face unwrap, mapped onto the live MediaPipe face mesh with three.js" [8]. Marlon's, with agents [5].
- **The hackathon launchers, Oct 22** (mk-audio-editing): MediaPipe gestures fire clips, a synth and MIDI notes; pose and motion bring loops in and out of an Eno-style live score [5].
- **The fellows' instruments, Nov 10.** Marlon's recap that day: "The LLUFs made a number of MediaPipe-related instruments, trackers, and launchers" [5]. Five were ported into the class app: hand drums, finger sound pads, a gesture-run camera, Air Band (up to five people playing in front of one webcam) and face-and-fingertip shader trails. The only footage is two minutes of four people playing Air Band, Nov 10, 16:29 [5].
- **TDM 155AI, Nov 11.** Marlon, Nov 13: "I led them through a series of live interaction kind of components, things where we would use MediaPipe to track the positions of their hands or their heads or their fingers, and then turn that into different sorts of output, whether it would be sound, or we did filter sweeps, or colors or shaders or three.js animations" [6]. Which of the prepared `/track` pages ran in class is not recorded; the inventory marks them "likely in class (inferred from Marlon's recap, unconfirmed)" [5].
- **The room is the board, Nov 15** (`/proto/hybrid/the-room-is-the-board`): the pose model tracks up to six people standing on the floor in front of a projector. Its page says it was tested with Chrome's fake camera, "Not yet tested with people in front of a real camera" [9].

## How to

1. **A laptop with a webcam, in Chrome,** served at `localhost` or HTTPS (the camera needs one or the other) [9]. See [Webcam](webcam.md).
2. **The network at first load.** The LL's pages load the library from jsdelivr and the model files from Google, pinned to `@mediapipe/tasks-vision` 1.1.1, the version the theremin pages use [9]. "A venue without Wi-Fi, or a slow one, breaks the camera and voice pages" [7].
3. **Start from a page that already works.** In the week 10 class app, `/track/hello` is the smallest (about 90 lines) and `/track/inputs` checks that the camera finds hands, head and body [5].
4. **One move per gesture.** A held gesture should fire once and re-arm after release (hysteresis), as the week 10 zones and the hackathon launcher do [5].
5. **Light and frame.** Even light on the hands; for bodies, the camera at chest height or higher so it sees feet [9].

What goes wrong, from the record: no models without the network [7]; graphics pages driven by it "grew glitchy" on long runs and were reset every 45 seconds for class [5]; and "This is the third or fourth time hand tracking has been rebuilt", which is why the hardening notes propose a `mediapipe-instruments` kit [7].

## Why to

From Marlon: pose-based input through a webcam, with the motion-to-result relation as the mechanic (Nov 17) [10]; and in class, hands, heads and fingers turned into "sound, or ... filter sweeps, or colors or shaders or three.js animations" (Nov 13) [6].

**Proposed, for Marlon to choose:** what MediaPipe is for outside a performance.

1. The class votes or answers with raised hands, counted by the camera and shown on the studio screen.
2. A lesson in what a machine sees: the points drawn over the picture, and what the model can and cannot know about a body.
3. Movement as evidence: a gesture or pose held, timed and logged, as a step in a lab or a rehearsal.

## Home game version

### In a regular classroom

Any laptop with a webcam and Chrome, online, on the room's projector [5][7]. A person who watches and plays the sounds is the paper version, and shows what the software does.

### Digitally

**Proposed, for Marlon to choose:**

1. Students open the one-file `/track/hello` on their own laptops and change one mapping.
2. Each student at home in front of their own webcam, their points sent to one shared screen (not built).

## Related

- [Webcam](webcam.md) (technology): MediaPipe needs a camera; the laptop's own is the usual one.
- [Gesture input](../gm/gesture-input.md), [Zones and spatial triggers](../gm/zones-and-spatial-triggers.md), [Movement and position](../gm/movement-and-position.md), [Mirroring and imitation](../gm/mirroring-and-imitation.md) (game mechanics): the relations it makes possible.
- EG's four kinds of gesture input, each a game mechanic: [Body as cursor](../new/body-as-cursor.md) (a tracked point steers, the hand landmarker's fingertip), [Pose as the move](../new/pose-as-the-move.md) (a held shape, the pose landmarker), [Threshold gesture](../new/threshold-gesture.md) (a swing past a speed or angle) and [Held position claims](../new/held-position-claims.md) (standing in a zone, as in *The room is the board*).
- [The body as controller](../ll/body-as-controller.md) (LL mechanic, a candidate not yet written) and [Cue to the stage](../ll/cue-to-stage.md) (LL mechanic).
- [Overhead cameras](overhead-camera.md) (technology): draw-a-box uses that camera with OpenCV, not MediaPipe [5].
- [The studio screen](studio-screen.md) and [MIDI controller](midi-controller.md) (technologies): where its output goes, and the other week 10 input.
- [Webcam hand tracking](../deep-dives/examples/hand-tracking.md) (Claude's worked example of a deep dive, EF's).

## Sources

1. Google, MediaPipe Solutions guide: https://developers.google.com/edge/mediapipe/solutions/guide
2. Google, Hand Landmarker: https://developers.google.com/edge/mediapipe/solutions/vision/hand_landmarker
3. Google, Pose Landmarker: https://developers.google.com/edge/mediapipe/solutions/vision/pose_landmarker
4. Google, Face Landmarker: https://developers.google.com/edge/mediapipe/solutions/vision/face_landmarker
5. `NB/apps/ll-weeks/ll-week-10/_context/live-events/README.md`, the week 10 inventory (Nov 13), entries 13 to 25.
6. `NB/_context/projects/50-in-focus/ll-weeks/fall-2026/10-ending-20261113/marlon/20261113-class-live-interaction-recap.md` (Marlon's dictation, Nov 13)
7. `NB/apps/ll-weeks/ll-week-10/_context/live-events/hardening.md` (Nov 13)
8. The workbook's `apps/mk-realtime-prototypes/_context/roadmap.md` (Sept 25)
9. `_content/prototypes/hybrid/the-room-is-the-board.md` and `nextjs/app/proto/hybrid/the-room-is-the-board/tracking.js` (Nov 15)
10. `_content/mechanics/format.md`, version 1.5 (Marlon's words in EL's pane, Nov 17, 10:47)
