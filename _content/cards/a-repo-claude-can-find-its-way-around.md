---
title: "A repo Claude can find its way around"
description: "Students won't read the code, so the game's repo must make sense structurally, to Claude, with an AGENTS.md and worked examples, and show what's under the hood."
kind: idea
convolute: students-remix
tags: [claude-code, remix, design]
audience: [tdm155ai, stafford]
follows: claude-code-is-the-ui
links: [remix-a-mechanic-with-claude-code, several-ways-to-involve-the-students, a-game-william-can-take-with-him]
sources: ["_context/orchestration/20261114/voice-handoff-back.md"]
voice: mixed
author: CI
date: 2026-11-14
week: 11
status: draft
---

> We're definitely showing them under the hood.

> They're going to be vibe coding it. So structurally it has to make sense. And we have to have examples.

Marlon, Nov 14, in the voice chat, as transcribed by voice Claude (handoff back, section 2). Voice Claude's summary around these lines: the students are not developers and will not read the code; the repo must make sense to Claude, with an `agents.md` so that "Claude really knows where to look for things," and "where to put things if the students are changing them" (his words in the inner quotes).

Two readers, one repo. The students look under the hood without reading code: they see that the game is files, that the map is data, that a faction is a few lines somewhere. Claude reads the code on their behalf, and finds its way by the `AGENTS.md` and by a layout that matches how people talk about games (places, factions, cards, prices) rather than how a programmer would split it.

"Where to put things if the students are changing them" is a design requirement, as CI reads it: a remix should land in its own folder, so the starting versions stay intact and two pairs' remixes don't collide. "We have to have examples" means remixes already made and described in a sentence each, so a student sees the size of a change before asking for one.

Marlon did not want the repo worked out in voice mode ("there's no point going into repo detail from voice mode," per the Slack summary); that was left to the Claude Code panes.

*CI's reading, Nov 15. Not Marlon's words unless quoted.*
