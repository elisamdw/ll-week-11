---
title: "The stage window and cue buttons"
description: "Every input in the room (a pad, a key, a spoken word, a gesture) fires a cue or sets a parameter on one full-screen page on the projector."
id: cue-to-stage
kind: ll-mechanic
family: "Shared and private screens"
status: draft
author: "EM (Claude Code c24dcd2b-601e-4484-9fad-1a19b127dcd4, started in ll-week-11 on FAS-DDW32PXW5L), Nov 17, 2026"
sources:
  - "NB/_context/projects/50-in-focus/ll-weeks/fall-2026/10-ending-20261113/wrap-up/story-draft.md"
  - "NB/_context/projects/50-in-focus/tdm155ai-dev/plan/weeks/10-20261109-orchestration/20261111-class-workspace/run-of-show.md"
  - "NB/_context/projects/50-in-focus/ll-weeks/fall-2026/11-ending-20261120/home-game/README.md"
mechanics: [shared-readout, booth-game-show, draw-a-box, station-rotation]
technologies: [studio-screen, midi-controller, game-controllers, atem-switcher]
games: []
proposals: 1
---

# The stage window and cue buttons

## Definition

A live-event set-up in which one full-screen browser window on the projector is the stage, and every input (buttons, MIDI pads, trigger words, camera gestures) is a cue that changes what the stage shows or sounds.

## Description

TDM 155AI, Nov 11, 2026: the class app's "spine is one contract: every mechanic fires a cue or sets a parameter on a full-screen `/stage` window for the projector", with buttons and "a QLab-style cue list, MIDI pads and dials ... trigger words and a script-following reader with surtitles, semantic cues, MediaPipe instruments and body zones"; the record says none of its mechanics is confirmed as used in class [1]. The run of show's plan: individual exercises (MIDI pad to cue, dial to parameter), then groups make "a short performance idea, a performer/reader, and cue operator" [2]. The EXPOS 40 app of Nov 9 has the same shape: a board window and a stage window that "talk over BroadcastChannel", so the switcher takes the stage as a full-frame source and "nothing is an overlay" [3].

## How to

From the record: open the stage window full screen on the projector; run the cue board or launcher on another screen; map each input to a cue; rehearse with a manual backup ("A few cue words and a manual backup") [2].

## Why to

From the record: to let students make "a little performance" from several kinds of input, each learned separately "to isolate the different things students are learning to do" [1].

**Proposed, for Marlon to choose:**

1. Presenting: a speaker runs their own cues (images, sounds, titles) from a pad instead of a slide clicker.
2. Teaching performance: students script a short piece and assign a cue operator, learning timing and coordination.

## Home game version

### In a regular classroom

A laptop on the projector, the stage in one window and the cue board in another; keys replace pads [2].

### Digitally

Screen-share the stage window. (Our suggestion.)

## Related

- [The studio screen as a shared readout](shared-readout.md), [The game show from the booth](booth-game-show.md), [Draw a box](draw-a-box.md), [Station rotation](station-rotation.md) (LL mechanics).
- [The studio screen](../technologies/studio-screen.md), [The MIDI controller](../technologies/midi-controller.md), [Game controllers](../technologies/game-controllers.md), [The ATEM switcher](../technologies/atem-switcher.md) (technologies).

## Sources

1. `NB/_context/projects/50-in-focus/ll-weeks/fall-2026/10-ending-20261113/wrap-up/story-draft.md`
2. `NB/_context/projects/50-in-focus/tdm155ai-dev/plan/weeks/10-20261109-orchestration/20261111-class-workspace/run-of-show.md`
3. `NB/_context/projects/50-in-focus/ll-weeks/fall-2026/11-ending-20261120/home-game/README.md`
