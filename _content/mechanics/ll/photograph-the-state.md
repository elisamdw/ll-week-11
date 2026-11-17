---
title: "Photograph the state"
description: "Shoot a game board from above at the start and again mid-play; what changed between the photos is the game's state, which a model or a student then writes down as data."
id: photograph-the-state
kind: ll-mechanic
family: "Seeing the work"
status: draft
author: "EM (Claude Code c24dcd2b-601e-4484-9fad-1a19b127dcd4, started in ll-week-11 on FAS-DDW32PXW5L), Nov 17, 2026"
sources:
  - "_content/cards/photograph-the-neutral-state.md"
  - "_content/activities/tdm155ai/photo-to-game-state.md"
  - "NB/_context/projects/50-in-focus/ll-weeks/fall-2026/11-ending-20261120/research/photo-to-game-state.md"
  - "NB/_context/projects/50-in-focus/ll-weeks/fall-2026/11-ending-20261120/marlon/20261116-afternoon-rationales-play-and-the-card-as-game-object.md (voice agent's record, 17:03)"
  - "_content/cards/marker-corners.md"
  - "NB/_context/projects/50-in-focus/ll-plan-26-27/ai-open-studio/open-studio-20260924-week-03.md"
mechanics: [overhead-view, overhead-stations, tap-to-move, cards, analog-in-model-out, hidden-information]
technologies: [overhead-camera, phones, fiducial-markers, lipstick-cams]
games: []
proposals: 1
---

# Photograph the state

## Definition

Photographing a game from directly above before play and again after some turns, so the difference between the two pictures shows the game's state; the photo is then turned into a table or JSON, by a person or a vision model, and checked against the table.

## Description

Marlon, Nov 14, in a voice chat (as transcribed in the handoff back to Claude Code): "here's the game, and then take a photo of it"; the plan around it was overhead shots of the LL's board games (Monopoly, Risk, Life), "an initial neutral state" and then a game in progress, and for card tables "let's just go with lipstick cams" [1]. For TDM 155AI on Nov 18 it is a 30-minute activity: two photos of the same board, Claude turns the second into a game-state table, students check it, list "What the photo can't see" (hands, deck order, whose turn, deals made out loud), and split template from instance [2]. On Nov 16 "Madeleine worked a bit on initial tests of computer vision that can read game boards, starting with chess" (voice agent's record) [4].

An earlier relative ran this term: the TF AI-comfort card sort, "12 table photos → CSV → chart" [6].

## How to

From the activity and the week's research:

1. **Shoot from directly above,** the whole board in frame, under even light; the overhead camera or a phone on a stand [2]. Top-down views avoid pieces hiding each other, though similar pieces are harder to tell apart from above [3].
2. **Shoot at set-up and again after ten minutes** [2].
3. **Ask the model for state per region** (property, square, card) as JSON, then check by hand "especially for stacks, money piles, overlapping cards, and anything face-down" [3].
4. **Add anchors if needed:** printed markers at the board's corners give the camera the board's plane [5]; the research lists "visual anchors drawn on the image" and fiducial tags as fixes [3].

What goes wrong, from the research: on real photos from varied angles, a classic chess pipeline found the board in about a third of images; models read sparse grids well and dense boards badly (Claude 3.5 Sonnet at 0.985 cell accuracy on tic-tac-toe, 0.554 on chess, in a 2025 study); counts and positions are approximate; models hallucinate with confidence [3]. A tilted board puts pins "on the wrong spaces" [5].

## Why to

From the record: to show students that "a game is data plus the verbs that change it, and a player sees only a view of it", and that what a photo cannot see is the hidden information (the class activity's account, a proposal written for Marlon) [2]; Marlon's aim, Nov 14: "go from a board game to how you would represent the data of that board game as a game state" [2].

**Proposed, for Marlon to choose:** its use outside games.

1. Any table of hand work (a card sort, a concept map) photographed and turned into data, as the card sort was [6].
2. A test of the model: the class measures how often it reads the table right, a lesson in checking AI output.

## Home game version

### In a regular classroom

A phone photo from above and any chat model that takes images; a hand-drawn grid on the board helps (after the research's anchors [3]).

### Digitally

Screenshots of a digital board do the same; or the game exports its state directly (the activity's *Universal Paperclips* save file [2]).

## Related

- [The overhead view](overhead-view.md) and [Four overhead cameras](overhead-stations.md) (LL mechanics): the camera.
- [The tap](tap-to-move.md) (LL mechanic): the other way the table becomes data.
- [Cards](cards.md) and [Annotate, then the model reads the room](analog-in-model-out.md) (LL mechanics).
- [Hidden information](../gm/hidden-information.md) (game mechanic): what the photo cannot see.
- [Overhead cameras](../technologies/overhead-camera.md), [Phones](../technologies/phones.md), [Printed markers](../technologies/fiducial-markers.md), [Lipstick cams](../technologies/lipstick-cams.md) (technologies).

## Sources

1. `_content/cards/photograph-the-neutral-state.md`
2. `_content/activities/tdm155ai/photo-to-game-state.md`
3. `NB/_context/projects/50-in-focus/ll-weeks/fall-2026/11-ending-20261120/research/photo-to-game-state.md`
4. `NB/_context/projects/50-in-focus/ll-weeks/fall-2026/11-ending-20261120/marlon/20261116-afternoon-rationales-play-and-the-card-as-game-object.md` (voice agent's record, 17:03)
5. `_content/cards/marker-corners.md`
6. `NB/_context/projects/50-in-focus/ll-plan-26-27/ai-open-studio/open-studio-20260924-week-03.md`
