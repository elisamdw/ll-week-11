---
title: "Printed markers (ArUco)"
description: "Printed black-and-white squares (ArUco or AprilTag) that a camera finds easily, placed at a board's corners so software knows the board's plane."
id: fiducial-markers
kind: technology
category: "Paper and print"
tested: "No"
the_ll_has: "Nothing printed yet; proposed Nov 14, 2026 and named as a fallback for draw-a-box on Nov 11, 2026."
cost: ""
status: draft
author: "EM (Claude Code c24dcd2b-601e-4484-9fad-1a19b127dcd4, started in ll-week-11 on FAS-DDW32PXW5L), Nov 17, 2026"
sources:
  - "_content/cards/marker-corners.md"
  - "NB/_context/projects/50-in-focus/tdm155ai-dev/plan/weeks/10-20261109-orchestration/20261111-class-workspace/board.md"
  - "NB/_context/projects/50-in-focus/ll-weeks/fall-2026/11-ending-20261120/research/photo-to-game-state.md"
mechanics: [photograph-the-state, draw-a-box, overhead-view]
technologies: [overhead-camera, phones]
games: []
proposals: 0
---

# Printed markers (ArUco)

## Definition

Fiducial markers: printed square codes that computer-vision software detects reliably and can measure, so four of them at a board's corners give the board's position and angle in the picture.

## Description

Proposed, not tested. Nov 14, 2026: "fiducial squares (ArUco or AprilTag) on a board's four corners give the camera the board's plane, so virtual pieces can sit on exact squares", and a known frame for overhead photos "whose pins land on the wrong spaces when the board is tilted"; "Untested: whether a JavaScript marker library runs well on an iPhone" [1]. On Nov 11 the class app's builder planned "the ArUco printed-marker fallback" if drawn boxes were flaky under the studio lights [2]. The week's research lists fiducial tags among the fixes for reading boards from photos [3].

## How to

Not written yet: no library chosen or tested.

## Why to

To make photo-to-state and AR reliable on real tables [1][3].

## Home game version

### In a regular classroom

Printed on any printer and taped to the board's corners [1].

### Digitally

Not applicable.

## Related

- [Photograph the state](../ll/photograph-the-state.md), [Draw a box](../ll/draw-a-box.md), [The overhead view](../ll/overhead-view.md) (LL mechanics).
- [Overhead cameras](overhead-camera.md) and [Phones](phones.md) (technologies).

## Sources

1. `_content/cards/marker-corners.md`
2. `NB/_context/projects/50-in-focus/tdm155ai-dev/plan/weeks/10-20261109-orchestration/20261111-class-workspace/board.md`
3. `NB/_context/projects/50-in-focus/ll-weeks/fall-2026/11-ending-20261120/research/photo-to-game-state.md`
