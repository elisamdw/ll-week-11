---
title: "Webcam hand tracking (MediaPipe)"
description: "Claude's worked example of a deep dive: a laptop's webcam finds your hands, so a hand becomes a controller. Written from the LL's records, not from trying it."
id: hand-tracking
kind: deep-dive
subject: technologies/mediapipe
status: draft
author: "claude (EF, Claude Code d438c4b6-e381-44c0-a8c6-31a2638ecdd6, started in ll-week-11 on FAS-DDW32PXW5L), Nov 17, 2026. Claude's example, not an LLUF's."
sources:
  - "https://developers.google.com/edge/mediapipe/solutions/vision/hand_landmarker"
  - "NB/apps/ll-weeks/ll-week-10/_context/live-events/README.md (week 10 inventory, Nov 13; entries 13 to 23)"
  - "NB/_context/projects/50-in-focus/ll-weeks/fall-2026/10-ending-20261113/marlon/20261113-class-live-interaction-recap.md (Marlon's dictation, Nov 13)"
  - "NB/apps/ll-weeks/ll-week-10/_context/live-events/hardening.md (Nov 13)"
  - "_content/activities/llufs/gesture-versus-key.md (activity card, Nov 15)"
  - "https://developers.google.com/edge/mediapipe/solutions/vision/gesture_recognizer"
  - "_content/mechanics/format.md, version 1.5 (Marlon, Nov 17, 10:47, in EL's pane)"
mechanics: [gesture-input, zones-and-spatial-triggers, feedback, body-as-controller]
technologies: [mediapipe, webcam, midi-controller, overhead-camera]
games: []
proposals: 2
---

# Webcam hand tracking (MediaPipe)

> **Claude's example.** Written from the LL's records to show fellows the length and the tone of a deep dive. Its "What we tried" is secondhand. A fellow who built one of the week 10 instruments would write that section from memory, and better.

## Definition

Software that watches a webcam and finds the hands in each frame, so a laptop can treat a hand as a controller: where it is, whether it pinches, which way it points. Google's MediaPipe Hand Landmarker, which the LL uses, marks 21 points on each hand, from the wrist to each fingertip, and runs inside a web page [1].

## Description

Each frame, the model returns the 21 points for every hand it sees (one by default; more if you ask) [1]. A page then turns those points into moves: a fingertip entering a zone, thumb touching finger, a hand's height becoming a volume. The LL has built this several times: in face paint (September), the October hackathon's music launcher, the fellows' instruments on Nov 10, and the TDM 155AI class app on Nov 11, where `/track` fires a cue once each time a fingertip enters a zone [2][4].

Why it counts as a technology and not a mechanic: Marlon, Nov 17, 10:47, "maybe coding frameworks are technologies too? like mediapipe for instance which allows pose-based input through webcam . . . I'd say this is a technology, and then you think of specific motion-to-result relations/dynamics as mechanics?" [7]. So the framework is the technology here, and each motion-to-result relation it allows (a pinch fires a sound, a hand's height sets the volume) is a mechanic.

## What we tried

*Secondhand, from the record.* On Nov 10 the fellows built "a number of MediaPipe-related instruments, trackers, and launchers" (Marlon's recap that evening, quoted in [2]). Five were collected the next morning and ported into the class app at `/track/fellows/`: hand drums played with gestures, thumb-to-fingertip sound pads with a looper, a camera run by hand gestures (record, brightness, background blur), Air Band, where up to five people play trumpet, piano, guitar, drums and a band-wide filter in front of one webcam, and face-and-fingertip shader trails on a second screen [2]. The only footage is two minutes of four people playing Air Band [2].

The next day the class used the same technology. Marlon, Nov 13: "we would use MediaPipe to track the positions of their hands or their heads or their fingers, and then turn that into different sorts of output, whether it would be sound, or we did filter sweeps, or colors or shaders or three.js animations" [3].

Not in the record: how long each build took, what broke, and how it felt to play. That is what a fellow's deep dive adds.

## How to

In the studio:

1. A laptop with a webcam, in Chrome, online the first time: the model loads from the web, and "a venue without Wi-Fi, or a slow one, breaks the camera" pages [4].
2. Open a page that uses it. In the class app, `/track/hello` is the smallest, about 90 lines; `/track/inputs` checks that the camera and hands are found [2].
3. Allow the camera. Even light on the hands, a plain background behind them.
4. To make your own, ask Claude Code for a page that uses the Hand Landmarker and does one thing when one gesture happens, with a key that does the same thing as a fallback. One held gesture should give one move, with a release before the next, or it fires over and over [5].

What goes wrong, from week 10: no model without the internet at first load; graphics pages grew glitchy on long runs and were never soak-tested [4].

## Why to

The record shows what was built, not why a teacher would choose it.

**Proposed, for Marlon to choose:**

1. **The body as the input:** a class acts out what it is studying with its hands (conducting a passage of music, a theremin in a physics class), so the gesture carries the meaning.
2. **A presenter's cue without a clicker:** a hand fires the next image or sound, so the speaker stays in front of the room.
3. **A lesson in what a machine sees:** show the 21 points on screen and ask what the model can and cannot know about a hand, as a way into computer vision.

## Home game version

### In a regular classroom

The same pages work on any laptop with a webcam and Chrome, on the classroom projector [2]. Without a computer: a person who watches hands and plays the sounds is the paper version, and shows what the software is doing.

### Digitally

**Proposed, for Marlon to choose:**

1. Send students the one-file `/track/hello` to copy and change on their own laptops.
2. Start from Google's Gesture Recognizer, which knows seven gestures out of the box (closed fist, open palm, pointing up, thumb down, thumb up, victory, "I love you") [6], and map each to one move.

Lost compared with the studio: the big screen, the sound system, and room for five people in front of one camera.

## Related

- Gesture input (mechanic, `gesture-input`, a row in `mechanics.csv`): the move this technology makes possible.
- Zones and spatial triggers (mechanic, `zones-and-spatial-triggers`): fingertip and body zones over the webcam [2].
- Feedback (mechanic, `feedback`): every instrument needs a visible or audible answer to the gesture.
- The body as controller (LL mechanic, `body-as-controller`, EM's candidate): the same idea on the green screen stage.
- [MediaPipe](../../technologies/mediapipe.md) (technology): the framework this deep dive is about; the Hand Landmarker is one of its models.
- [Webcam](../../technologies/webcam.md) (technology): what hand tracking needs. The laptop's built-in camera is enough [2].
- MIDI controller (technology, `midi-controller`): the other week 10 input, built from the fellows' MIDI studies [2].
- Overhead camera (technology, `overhead-camera`): another camera input; draw-a-box uses it, with OpenCV rather than MediaPipe [2].

## Stills

None yet. Wanted:

- The laptop and webcam from a few steps back, someone playing.
- The screen with the hand points drawn on it.
- Air Band with several people in front of one camera (hands and screen, not faces).

## Sources

1. Google, MediaPipe Hand Landmarker: https://developers.google.com/edge/mediapipe/solutions/vision/hand_landmarker
2. `NB/apps/ll-weeks/ll-week-10/_context/live-events/README.md`, the week 10 inventory (Nov 13), entries 13 to 23.
3. Marlon's dictation, Nov 13: `NB/_context/projects/50-in-focus/ll-weeks/fall-2026/10-ending-20261113/marlon/20261113-class-live-interaction-recap.md`.
4. `NB/apps/ll-weeks/ll-week-10/_context/live-events/hardening.md` (Nov 13).
5. `_content/activities/llufs/gesture-versus-key.md`, activity card (Nov 15).
6. Google, MediaPipe Gesture Recognizer: https://developers.google.com/edge/mediapipe/solutions/vision/gesture_recognizer
7. `_content/mechanics/format.md`, version 1.5, quoting Marlon, Nov 17, 10:47.
