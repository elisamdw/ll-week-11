---
title: "The Are You Serious?! board"
description: "The EXPOS 40 app as it stands: a keyboard sound board and a full-frame stage for one operator in the booth, plus a look book of 1970s game-show pieces, most of which a home game would need."
kind: prototype
convolute: home-games
tags: [play, design, print]
audience: [ll, faculty]
links: [expos-40-home-game-for-terrys-class, home-game-versions-of-other-things, old-game-show-ads-for-the-home-game, mechanics/feedback, mechanics/timer-and-countdown, mechanics/real-time-pressure, feedback]
sources: ["W11/home-game/README.md", "W11/home-game/plan.md", "W11/builds.md"]
voice: mixed
author: CM
date: 2026-11-15
week: 11
status: draft
---

**What it is.** `ll-26-27/expos40`, private, built on November 9 for Terry Gipson's game show "Are You Serious?!" in EXPOS 40 (Public Speaking Practicum), which the LL has hosted each term since at least spring 2024. Terry teaches; the LL provides the room, the mics and an operator. The board was built for the November 10 sessions, which were canceled; it has not been used with students. Not deployed, and not checked out in The Notebook (HG read a clone).

**How it plays.** One operator at a keyboard, one stage window that the switcher takes as a full-frame source, so nothing is an overlay. Key 1 is the countdown; 2 the intro, with the title rising to hover over a green, sunburst, walnut or black ground; 3 a bulb-marquee card; B the smile buzzer (a speaker must stay serious), with an optional red strike X; Y and W the lines "You can't be serious" and "Why so serious?"; M the theme music, a gapless loop; Esc silences everything. The look book (`/lookbook`) takes apart the 1970s game-show vocabulary (*Match Game*, *Family Feud*, *Wheel of Fortune*, *Hollywood Squares*) and draws each piece live in CSS: an eggcrate scoreboard, letter tiles, an answer board, a wheel, doors, a podium nameplate. Several are built but not wired to keys.

**What it does for learning.** It is game-show feedback in service of public speaking: the buzzer and the countdown put pressure on a speaker improvising at the podium. HG notes what is missing: the show's rules are written down nowhere HG found. The cues suggest a contestant speaking seriously without cracking, on a prompt given on the spot, but that is HG's inference.

**Which of Marlon's ideas it serves.**

> we have canceled for good. we will create a 'home game' version as a nextjs app next week and send this.

Marlon, Nov 13, 3:16 PM, relayed in `W11/builds.md`. CI's card [EXPOS 40 home game for Terry's class](expos-40-home-game-for-terrys-class.md) holds the idea; this card is the thing it starts from. HG's observation is the useful one for the build: the look book's unwired pieces are most of what a home game needs, since a home version has no operator in a booth.

**Waiting on Marlon (HG's questions):** a `/home` route in `expos40` or a new repo; a deploy so students can open it; whether to ask Terry for the rules.

*CM's account of HG's findings, Nov 15. Not Marlon's words unless quoted.*
