---
title: "The green screen"
description: "The studio's green wall and floor, a stage a person stands on, keyed out by the switcher so the person appears over any background."
id: green-screen
kind: technology
category: "Keying"
tested: "Yes"
the_ll_has: "A green screen stage in the main studio (Paper Doll Steps; The Learning Lab overview), keyed on the switcher, whose chroma keys sit on inputs 1 and 2 and luma keys on 3 and 4 in the HUM 2 checklist (Oct 21, 2025). Its size is not in the record I read."
cost: ""
status: draft
author: "EM (Claude Code c24dcd2b-601e-4484-9fad-1a19b127dcd4, started in ll-week-11 on FAS-DDW32PXW5L), Nov 17, 2026"
sources:
  - "NB/_context/hackmd/HackMD_Team_1794685979353/The Learning Lab.md"
  - "NB/_context/hackmd/HackMD_Team_1794685979353/Paper Doll Steps.md"
  - "NB/_context/hackmd/HackMD_Team_1794685979353/hum-2-20251021-checklist.md"
  - "NB/_context/hackmd/HackMD_Team_1794685979353/LLUF Prompt_ Puppetry and Studio Mechanics Documentation.md"
  - "NB/_context/projects/50-in-focus/ll-weeks/fall-2026/11-ending-20261120/marlon/20261117-morning-mechanics-entries-nfc-and-the-color-agents.md (voice agent's record, 07:26)"
  - "https://obsproject.com/kb/chroma-key-filter"
mechanics: [green-paper-key, body-as-controller, recording-zones, paper-dolls, multiplane]
technologies: [green-paper, atem-switcher, studio-screen]
games: []
proposals: 1
---

# The green screen

## Definition

A wall (and often a floor) painted or draped in an even green, lit flat, so that a switcher or software can remove the green (chroma keying) and place the person in front of it over another picture.

## Description

The LL's green screen stage is in the main studio [1][2]. From the record:

- **SLAVIC/TDM 121, spring 2024:** students "posed in ballet movements" on the green screen stage and computer vision fed their poses to Stable Diffusion, so "their own bodies acted as controllers for AI art" [1].
- **AFVS 173F, spring 2025:** some students "embodied plant movements on a green-screen stage" [1].
- **TDM 119B, spring 2025:** a "full-body long shot on our green screen stage", with generative-AI backdrops "that responded to the tone and content of each piece" [1].
- **HUM 2, Oct 21, 2025:** the checklist sets "usual chromas on 1 and 2 / lumas on 3 and 4" and makes paper dolls from green screen footage [3][2].
- **The puppetry residency for TDM 129B** (April 8–10; year not given): "green screen layering" as one of the studio mechanics the LLUFs documented [4].

Marlon, Nov 17, 07:26 (voice agent's record): "the green screen (and green paper) — chroma keying — is literally the way we connect and layer multiple video feeds" [5].

## How to

1. Light the green evenly and keep the subject a few feet in front of it, so no shadow falls on it. (Common practice; the record does not give distances.)
2. Route the camera to a switcher input with a chroma key (HUM 2: inputs 1 and 2) [3], or key it in software: OBS's Chroma Key filter "Removes any instances of a given color from the Source ... Use this filter for green screens" [6].
3. Choose the background: a still, a video, a generated image (TDM 119B) [1] or another camera.
4. For paper dolls: shoot the person, pick a still, cut it out, adjust the color ("pull greens down"), print "on thick" [2].

What goes wrong: green clothing or props key out with the wall; green spill on the subject needs pulling down in color [2].

## Why to

From the record: to put students' own bodies into the image they are studying or making (SLAVIC/TDM 121, AFVS 173F) [1], and to compare how framing and setting change a performance (TDM 119B: "how technical framing influences both perception and presence") [1]. Marlon on green's place in the studio's color scheme: "So green plays a role to connect, overlay, layer things" [5].

**Proposed, for Marlon to choose:** the green screen's lead use in an entry for faculty.

1. Putting the speaker in the source (a scholar in front of the archive, map or artwork they discuss).
2. The body as input (pose and movement driving an image or a game).
3. Many settings for one performance (the TDM 119B comparison).

## Home game version

### In a regular classroom

The table-size version is [green paper](green-paper.md) under a phone. A green sheet or cloth on a wall works for a person, with a laptop running a keyer. (We suggest this; not tested by the LL.)

### Digitally

OBS keys any camera feed for free [6]; most video-call apps blur or replace a background without any green at all, at lower quality at the edges. (Common knowledge; not checked against a vendor page here.)

## Related

- [Green paper as a green screen](../ll/green-paper-key.md) (LL mechanic): the same key on a table.
- [The body as controller](../ll/body-as-controller.md), [Same piece, many frames](../ll/recording-zones.md), [Paper dolls](../ll/paper-dolls.md), [Multiplane layering](../ll/multiplane.md) (LL mechanics): what the stage has been used for.
- [Green paper](green-paper.md) (technology), [The ATEM switcher](atem-switcher.md) (technology), [The studio screen](studio-screen.md) (technology).

## Sources

1. `NB/_context/hackmd/HackMD_Team_1794685979353/The Learning Lab.md`
2. `NB/_context/hackmd/HackMD_Team_1794685979353/Paper Doll Steps.md`
3. `NB/_context/hackmd/HackMD_Team_1794685979353/hum-2-20251021-checklist.md`
4. `NB/_context/hackmd/HackMD_Team_1794685979353/LLUF Prompt_ Puppetry and Studio Mechanics Documentation.md`
5. `NB/_context/projects/50-in-focus/ll-weeks/fall-2026/11-ending-20261120/marlon/20261117-morning-mechanics-entries-nfc-and-the-color-agents.md` (voice agent's record, 07:26)
6. https://obsproject.com/kb/chroma-key-filter (OBS Knowledge Base, "Chroma Key Filter", 2022-01-12)
