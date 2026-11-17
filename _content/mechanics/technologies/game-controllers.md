---
title: "Game controllers"
description: "Gamepads (Xbox, PlayStation and other Bluetooth controllers) as physical inputs for games and live events, read by a Mac or by a web page."
id: game-controllers
kind: technology
category: "Controllers"
tested: "No"
the_ll_has: "Game controllers, kind and number not in the record. Nov 17, 2026 task: 'get out the controllers, see which ones work and which are relatively easy to get working on mac'. ENGL 189VG prep, Oct 26, 2026: 'Determine which game controllers to set up.'"
cost: ""
status: draft
author: "EM (Claude Code c24dcd2b-601e-4484-9fad-1a19b127dcd4, started in ll-week-11 on FAS-DDW32PXW5L), Nov 17, 2026"
sources:
  - "NB/_context/projects/50-in-focus/ll-weeks/fall-2026/11-ending-20261120/marlon/20261117-morning-mechanics-entries-nfc-and-the-color-agents.md (voice agent's record, 07:06; task 07:07)"
  - "NB/_context/projects/50-in-focus/ll-weeks/fall-2026/08-ending-20261030/weekly-doc.md"
  - "https://support.apple.com/en-us/111099"
  - "https://developer.mozilla.org/en-US/docs/Web/API/Gamepad_API/Using_the_Gamepad_API"
  - "NB/_context/projects/50-in-focus/ll-weeks/fall-2026/11-ending-20261120/research/classroom-game-accessibility.md"
mechanics: [cue-to-stage, booth-game-show, shared-readout, hotseat]
technologies: [midi-controller, studio-screen]
games: []
proposals: 1
---

# Game controllers

## Definition

Handheld gamepads (sticks, buttons, triggers) made for consoles and computers, used in a session as a physical way to take a turn, buzz in or fire a cue.

## Description

Untested this term. From the record: Marlon, Nov 17, 07:06 (voice agent's record): "Today we should get out the controllers, see which ones work, and which are relatively easy to get working on Mac ... and then make some initial elements of games" [1]. The ENGL 189VG prep of Oct 26 also had "Determine which game controllers to set up" [2]; whether any were set up is not recorded.

What is known from vendors' documentation:

- **On a Mac (and iPhone, iPad):** Apple's page covers "a wireless Xbox, PlayStation, or other Bluetooth game controller"; "Press and hold the appropriate button or buttons on the controller to put it into pairing mode", then "Open Bluetooth settings on your Apple device, then select the controller" [3]. It does not mention Nintendo controllers.
- **In a web page:** "The Gamepad API allows developers and designers to access and use gamepads and other game controllers"; a page hears a `gamepadconnected` event, and for a controller already connected "the gamepadconnected event is dispatched to the focused page when the user presses a button or moves an axis" [4].

## How to

Untested; from the pages above: pair each controller over Bluetooth [3]; open the game page and press a button on each so the page sees it [4]; map buttons to the game's moves.

## Why to

Marlon's stated purpose is to "make some initial elements of games" with them [1].

**Proposed, for Marlon to choose:**

1. Buzzers for a game show or quiz, one controller per team (the EXPOS 40 game uses a buzzer and a countdown).
2. A shared turn: one controller passed around the table, the move made in public on the studio screen.
3. Cue buttons for a live event, like the MIDI pads of Nov 11.

## Home game version

### In a regular classroom

Students' own Bluetooth controllers paired to the instructor's laptop [3]; the week's accessibility research asks that any timed buzzer game also work from the keyboard [5].

### Digitally

A keyboard key or an on-screen button stands in for each controller button; the Gamepad API is optional [4][5].

## Related

- [The stage window and cue buttons](../ll/cue-to-stage.md), [The game show from the booth](../ll/booth-game-show.md), [The studio screen as a shared readout](../ll/shared-readout.md), [Hotseat](../ll/hotseat.md) (LL mechanics).
- [The MIDI controller](midi-controller.md) (technology) and [The studio screen](studio-screen.md) (technology).

## Sources

1. `NB/_context/projects/50-in-focus/ll-weeks/fall-2026/11-ending-20261120/marlon/20261117-morning-mechanics-entries-nfc-and-the-color-agents.md` (voice agent's record, 07:06; task 07:07)
2. `NB/_context/projects/50-in-focus/ll-weeks/fall-2026/08-ending-20261030/weekly-doc.md`
3. https://support.apple.com/en-us/111099 (Apple, "Connect a wireless game controller to your Apple device", Sept 14, 2026)
4. https://developer.mozilla.org/en-US/docs/Web/API/Gamepad_API/Using_the_Gamepad_API (MDN, "Using the Gamepad API", Apr 13, 2026)
5. `NB/_context/projects/50-in-focus/ll-weeks/fall-2026/11-ending-20261120/research/classroom-game-accessibility.md`
