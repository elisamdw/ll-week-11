---
title: "Draw a box"
description: "Draw a rectangle in thick dark marker on paper under the overhead camera; the computer finds it and plays a video inside it."
id: draw-a-box
kind: ll-mechanic
family: "Seeing the work"
status: draft
author: "EM (Claude Code c24dcd2b-601e-4484-9fad-1a19b127dcd4, started in ll-week-11 on FAS-DDW32PXW5L), Nov 17, 2026"
sources:
  - "NB/_context/projects/50-in-focus/tdm155ai-dev/plan/weeks/10-20261109-orchestration/20261111-class-workspace/board.md"
  - "NB/_context/projects/50-in-focus/tdm155ai-dev/plan/weeks/10-20261109-orchestration/20261111-class-workspace/run-of-show.md"
  - "NB/_context/projects/50-in-focus/ll-weeks/fall-2026/10-ending-20261113/wrap-up/story-draft.md"
mechanics: [overhead-view, photograph-the-state, cue-to-stage]
technologies: [overhead-camera, fiducial-markers, studio-screen]
games: []
proposals: 1
---

# Draw a box

## Definition

A computer-vision trick for the overhead camera: a person draws a rectangle on paper in thick dark marker, software finds the largest four-sided shape and warps a video clip into it, so the drawing becomes a screen.

## Description

Built for TDM 155AI, Nov 11, 2026 (Installations and Live Events): "pick the overhead camera (Mirror off), draw a rectangle in thick dark marker; OpenCV.js finds the biggest four-sided shape and the clip is warped into it", with voice or buttons to choose the clip [1]. The run of show made it optional: "Try draw-a-box only if the overhead station passed the morning test" [2]. The week's wrap-up lists "draw-a-box video under the overhead camera" among what the class app had, and says none of its mechanics is confirmed as used in class [3].

## How to

From the record: the overhead camera, mirroring off; paper and dark markers under the room's light; test "overhead camera, dark rectangle, clip selection, stability under the room's light" in the morning [1][2]. Fallback if drawn boxes are unreliable: printed ArUco markers [1].

## Why to

**Proposed, for Marlon to choose:**

1. A first lesson in computer vision: what the camera "sees" in a drawing and when it fails.
2. Paper as a projection surface: students lay out a storyboard of boxes and fill each with a clip.

## Home game version

### In a regular classroom

A laptop's webcam pointed down at paper runs the same page, if the page is shared or deployed. (Our suggestion; untested.)

### Digitally

Not applicable: the mechanic is the paper.

## Related

- [The overhead view](overhead-view.md), [Photograph the state](photograph-the-state.md), [The stage window and cue buttons](cue-to-stage.md) (LL mechanics).
- [Overhead cameras](../technologies/overhead-camera.md), [Printed markers](../technologies/fiducial-markers.md), [The studio screen](../technologies/studio-screen.md) (technologies).

## Sources

1. `NB/_context/projects/50-in-focus/tdm155ai-dev/plan/weeks/10-20261109-orchestration/20261111-class-workspace/board.md`
2. `NB/_context/projects/50-in-focus/tdm155ai-dev/plan/weeks/10-20261109-orchestration/20261111-class-workspace/run-of-show.md`
3. `NB/_context/projects/50-in-focus/ll-weeks/fall-2026/10-ending-20261113/wrap-up/story-draft.md`
