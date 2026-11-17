---
title: "The ATEM switcher"
description: "The studio's Blackmagic ATEM video switcher: it takes the cameras in, cuts between them, keys one picture over another, and sends the result to screens and recorders."
id: atem-switcher
kind: technology
category: "Cameras"
tested: "Yes"
the_ll_has: "An ATEM Constellation 4K 2ME in Light Mode, firmware updated Oct 25, 2026, with HyperDecks I–L and a Web Presenter (week 9 weekly doc). Chroma keys on inputs 1 and 2 and luma keys on 3 and 4 in the HUM 2 checklist (Oct 21, 2025)."
cost: ""
status: draft
author: "EM (Claude Code c24dcd2b-601e-4484-9fad-1a19b127dcd4, started in ll-week-11 on FAS-DDW32PXW5L), Nov 17, 2026"
sources:
  - "NB/_context/projects/50-in-focus/ll-weeks/fall-2026/09-ending-20261106/weekly-doc.md"
  - "NB/_context/projects/50-in-focus/ll-weeks/fall-2026/07-ending-20261023/weekly-doc.md"
  - "NB/_context/hackmd/HackMD_Team_1794685979353/hum-2-20251021-checklist.md"
  - "NB/_context/projects/50-in-focus/tdm-98/orchestration/README.md"
  - "NB/_context/hackmd/HackMD_Team_1794685979353/Nonverbal Communication and Visuals workshop plan.md"
  - "NB/_context/projects/50-in-focus/ll-weeks/fall-2026/08-ending-20261030/orchestration/README.md"
  - "https://obsproject.com/kb/chroma-key-filter"
mechanics: [green-paper-key, overhead-stations, overhead-view, recording-zones, booth-game-show]
technologies: [overhead-camera, green-screen, green-paper, studio-screen]
games: []
proposals: 1
---

# The ATEM switcher

## Definition

A live video switcher made by Blackmagic Design: it takes several camera and computer feeds, cuts or mixes between them, layers one over another with chroma (color) or luma (brightness) keys, and sends the program to displays, recorders and streams.

## Description

From the record: the studio's switcher is an "ATEM Constellation 4K 2ME (Light Mode)", updated Oct 25, 2026 with "HyperDecks I–L ... the Web Presenter" [1]; its audio plan has "ATEM output 1–2 = stereo program mix" [1]. Week 7's task was a rack with "at least four and potentially seven cameras running into the ATEM, and the ATEM's outs running into a HyperDeck" [2]. Uses on the record:

- **Keys:** "usual chromas on 1 and 2 / lumas on 3 and 4" (HUM 2, Oct 21, 2025) [3]; TDM 98's challenge cards on black "we'll run that through atem as luma key" (Marlon, Nov 5, 2026; "Not yet tested on a real second display or the ATEM") [4].
- **Routing a camera to the room:** the classroom TV fed from a switcher output, first the overhead, then a laptop [5].
- **An interview session:** TDM 155AI, Oct 28, 2026, "mics, interface, two cameras, ATEM, rotating host/guest/sidekick" (planned) [6].

## How to

Not written yet beyond the record above: the LL's switcher setup belongs to its staff's documentation, which I did not find in what I read. Ask the AV staff for the input map before a session.

## Why to

The switcher is what makes several of the LL's mechanics live rather than edited later: keying paper and people over pictures [3], several overhead tables as feeds [2], and a booth operator running a show [4].

**Proposed, for Marlon to choose:** whether this entry should carry the studio's input map (which camera is on which input), kept current by the AV staff, or point to where that map lives.

1. Carry it here.
2. Point to it.

## Home game version

### In a regular classroom

A laptop running OBS does a switcher's cutting and keying for a few cameras; its Chroma Key filter keys green [7]. (Not tested by the LL as a classroom replacement.)

### Digitally

The same software, with its output shared to a video call.

## Related

- [Green paper as a green screen](../ll/green-paper-key.md), [Four overhead cameras](../ll/overhead-stations.md), [The overhead view](../ll/overhead-view.md), [Same piece, many frames](../ll/recording-zones.md), [The game show from the booth](../ll/booth-game-show.md) (LL mechanics).
- [Overhead cameras](overhead-camera.md), [The green screen](green-screen.md), [Green paper](green-paper.md), [The studio screen](studio-screen.md) (technologies).

## Sources

1. `NB/_context/projects/50-in-focus/ll-weeks/fall-2026/09-ending-20261106/weekly-doc.md`
2. `NB/_context/projects/50-in-focus/ll-weeks/fall-2026/07-ending-20261023/weekly-doc.md`
3. `NB/_context/hackmd/HackMD_Team_1794685979353/hum-2-20251021-checklist.md`
4. `NB/_context/projects/50-in-focus/tdm-98/orchestration/README.md`
5. `NB/_context/hackmd/HackMD_Team_1794685979353/Nonverbal Communication and Visuals workshop plan.md`
6. `NB/_context/projects/50-in-focus/ll-weeks/fall-2026/08-ending-20261030/orchestration/README.md`
7. https://obsproject.com/kb/chroma-key-filter (OBS Knowledge Base, "Chroma Key Filter", 2022-01-12)
