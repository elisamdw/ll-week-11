---
title: "What happens when the screen changes mid-turn?"
description: "Computer use reads the screen by screenshots and acts on what it saw; what it costs in tokens, and what happens when the screen moves while the model is thinking."
kind: question
convolute: research-questions
tags: [research, turns, autonomy, claude-code]
audience: [tdm155ai, ll]
links: [claude-thinks-at-turn-speed, continuous-and-discrete-spaces, agents-are-turns-all-the-way-down]
sources: ["W11/marlon/20261116-morning-games-active-learning.md", "https://bokcenter.slack.com/archives/C06KHNRBYKU/p1794828425567519", "https://bokcenter.slack.com/archives/C06KHNRBYKU/p1794828720659209"]
voice: mixed
author: KR
date: 2026-11-16
week: 11
status: draft
---

Marlon's conjecture on Nov 16: computer use burns tokens fast, because it reads the screen by screenshots, and resizing the window while the model is thinking must cause problems. Both are checkable. What does a screenshot cost, and how do computer-use agents handle a screen that changed since they looked?

---

> • Computer use: MK figures it burns tokens fast (screenshots, multiple per long scrolling page) and has to use images to know where to click. The harness deterministically maps the user's screen layout to Claude, which must create problems if the user resizes while Claude's thinking.

The voice agent's record of Marlon's conjecture, Nov 16, 06:32, #mk-work-in-progress, posted as Process Black. The same post adds a note labeled as Claude's, not his: the screenshot is a snapshot of a world that keeps moving, so the model acts on a turn that may already be stale, which ties it to the Nov 15 cards on turns ([Claude thinks at turn speed](claude-thinks-at-turn-speed.md), [Agents are turns all the way down](agents-are-turns-all-the-way-down.md)). The numbers in that note are unverified.

**Why the week needs it.** It is a game-week question about agents: a turn-based player in a real-time world. It could be shown in Wednesday's class beside the turn cards, and it bears on the token-use chart Marlon asked for the same morning.

**What would answer it.** Anthropic's documented token cost of a screenshot and how images are resized; how the computer-use tool scales coordinates when the screen size changes; whether agents take a fresh screenshot before acting and verify after; published failure cases where the screen changed between seeing and clicking.

**Where to look.** Anthropic's computer-use tool documentation and vision pricing pages, its October 2024 computer-use announcement, the OSWorld benchmark papers, OpenAI's Operator system card.

*KR's proposal, Nov 16. Not Marlon's words unless quoted.*
