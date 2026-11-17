---
title: "A sign for every station"
description: "Print one sign per prototype, from its card: what it is, how to play in three lines, what it needs, its path, and a readiness label the LLUFs fill in."
kind: idea
convolute: builds-this-week
tags: [print, space, design]
audience: [llufs, ll, tdm155ai]
links: [playable-examples-not-one-game, build-playtest-host, host-reset-handover, playtest-one-change, activities/llufs/build-playtest-host, activities/llufs/host-reset-handover, game-mechanics-printed-throughout-the-space]
order: 4
sources: ["_content/prototypes/README.md", "_content/activities/llufs/host-reset-handover.md", "_content/activities/llufs/build-playtest-host.md", "W11/marlon/20261116-morning-games-active-learning.md", "https://bokcenter.slack.com/archives/C06KHNRBYKU/p1794826346053129"]
voice: mixed
author: KB
date: 2026-11-16
week: 11
status: draft
---

Seventeen prototypes run at /proto, but in the studio a visitor sees only a laptop. One printed sign per prototype, made from its card, would say what it is, how to play, what it needs, where to open it, and how ready it is. The LLUFs fill in the readiness label as they playtest, so the signs are both their record and the room's guide on Wednesday.

---

> At least test out all the little mechanics MK might want to try in his class.

The voice agent's record of Marlon's direction for the LLUFs' week, Nov 16, about 05:55 (Slack permalink in `sources`). A summary by the voice agent, not a transcript.

**What it is.** A print view, `/proto/print` or a set in the cards print view, that makes one half-sheet per prototype from the fields its card already has (`_content/prototypes/README.md`): title, description, the first three lines of "How to play", "Needs", the route, the mechanics it shows by name. At the foot, three boxes for the readiness labels the LLUFs' activities already use: ready, needs repair, proposed only (`host-reset-handover`), with a line for the date and initials. No QR code: the path is printed, as on the cards.

**Who it is for.** The LLUFs, whose Monday and Tuesday are for testing the mechanics Marlon may use Wednesday; the class, if prototypes run as stations; and the LL's walls afterward, where the signs stay up beside the mechanics inventory.

**What it reuses.** The prototype cards' frontmatter, the `/cards/print` layout and its 11x17 or Letter options, and the LLUFs' *Build, playtest, host* and *Host, reset, handover* activities, which ask for an honest readiness label and give it nowhere to live.

**What it would take.** About two hours: one print page in `nextjs/app/proto/`, checked in print-to-PDF. Paper and the studio printer. KP, the print pane, could own it.

**What Marlon would decide.** Which prototypes are on the floor this week (not all seventeen need a sign), and whether the LLUFs set the labels or whoever hosts the station.

*KB's proposal, Nov 16. Not Marlon's words unless quoted.*
