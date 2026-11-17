---
title: "A game is data and a loop"
description: "Any game, Universal Paperclips included, is a list of data, something that changes it each frame or turn, and the choices a player makes; show students the loop."
kind: idea
convolute: game-state
tags: [game-state, paperclips, turns, claude-code]
audience: [tdm155ai]
follows: games-persist-state-as-data
links: [activities/tdm155ai/a-game-is-data, claude-thinks-at-turn-speed, claude-plus-docs-is-an-app-prototype, paperclip-loop, mechanics/core-loop]
sources: ["https://bokcenter.slack.com/archives/C06KHNRBYKU/p1794759330570429"]
voice: mixed
author: CI
date: 2026-11-15
week: 11
status: draft
---

> Addition: another is prototyping design patterns. For games week: knowing that any of these apps, like Universal Paperclips, is just a list of data, and then something that changes.

> Addition: something that changes each frame, each second, each turn, and then choices the user can make. Having that loop visible to students is great. And indicate that Claude is capable of performing things like this loop for you.

Voice Claude's summaries of Marlon's direction, Sunday, Nov 15, about 11:15, posted as Process Black in the thread of his #mk-work-in-progress idea for TDM 155AI ("Claude plus docs equals, essentially, an interactive prototype of an app").

Three parts, plainly: the state (a list of data), the tick (what changes it every frame, second or turn), and the choices (what the player does between ticks). In *Paperclips* the state is a few dozen numbers, the tick is a timer, and the choices are buttons. Once students can name the three, every game they've played can be read that way, and so can the apps they use.

The last sentence is the turn toward Claude: Claude can be the tick. Hand it the data and the choices, and it can run the loop for you, one turn at a time. How fast it can do that decides which games it can run ([Claude thinks at turn speed](claude-thinks-at-turn-speed.md)). TD's class activity [A game is data](../activities/tdm155ai/a-game-is-data.md) and PE's [paperclip loop](paperclip-loop.md) both show the loop.

*CI's reading, Nov 15. Not Marlon's words unless quoted.*
