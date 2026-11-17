---
title: "Building a learning tool without writing an app"
description: "A one-page note for faculty: what a folder of instructions and files in Claude Desktop shows about building tools like LearnHarness."
week: 11
date: 2026-11-15
status: draft (HD's proposal; not reviewed by Marlon)
author: claude (HD, Claude Code 9227a5a5-172f-4bcf-b20c-e8f6ac0a3a8d, started in ll-week-11 on FAS-DDW32PXW5L)
---

# Building a learning tool without writing an app

[LearnHarness](https://github.com/amosblomqvist/learnharness) is an open-source desktop app that teaches "from your current understanding to your goal": it measures what you know, plans a route, teaches one reasoning step at a time, sets practice later, and keeps a graph of what you've been taught across sessions. It is a serious piece of software: an Electron and Next.js app with its own agent loop, plugins and stores.

On Nov 15 we tried to reproduce its core in a **folder**: one instruction file, four short command files, and a handful of JSON files, opened in Claude Desktop's Code tab. No code was written for the teaching itself. The worked example (Bostrom's paperclip argument, with Claude playing the student) is in [`starters/learning-harness/examples/paperclips/`](../../../starters/learning-harness/examples/paperclips/README.md); what worked and what didn't is in [trial.md](trial.md).

## What the folder shows

**A teaching method can be written down rather than programmed.** The tutor's whole method is `CLAUDE.md`, about a page and a half of plain English: find the edge, map the route, one step at a time with a guess before and a check after, practice without naming the idea, ask for thinking out loud. If you can write how you teach, you can change how the tutor teaches. Faculty and students can read it, argue with it and edit it.

**Memory is files you can read.** Between sessions, the tool remembers only what it wrote in the folder: the ideas taught, how they link, and every answer the student gave, in their own words. A new conversation reads those files and carries on. Nothing is hidden in a vendor's memory feature, and the record can be opened, printed, graded by a person, or deleted.

**A shared file format turns one tool into several.** Because the record is plain JSON in a stated format, a web page can read the same folder and draw the student's map or pose practice questions without the model. The students in TDM 155AI can build that page as a game; the Claude sessions produce the data the game plays.

**The tool is remixable by the people using it.** A student can ask Claude, in the folder, to "make practice a game with three lives" or "add a command where you argue against me", and the tool changes. That is the same move Marlon's class makes with games this week: the design surface is a folder Claude can read, and the interface for changing it is Claude Code.

## What it doesn't do (yet)

- **It is as good as the model's knowledge, and no better.** In the trial the tutor shortened one of Bostrom's lists. Ideas carry sources so a student can check them; readings in the folder help. An app can add fact-checking passes; a folder relies on the instructions.
- **It is not a product.** No progress dashboard for an instructor, no accounts, no privacy controls beyond "it's on your computer," and the instructions are followed most of the time, not always (in the trial, the tutor guessed timestamps it was told to record).
- **It needs a paid Claude plan** for the Code tab, and long sessions use a lot of a subscription's allowance: each turn rereads the record.
- **LearnHarness does more:** background research, drawings and interactive demonstrations in the lesson, a visual graph, flashcards, a choice of model providers. The folder reproduces the method and the memory, not the app.

## For a course

- **As a study tool:** students copy the folder, add the course readings to `readings/`, and learn a hard idea over a week. The session files are a record of their thinking that they (and, if they choose, you) can read.
- **As a design exercise:** students change `CLAUDE.md` to teach differently, then compare the records two versions produce. It makes "what is good teaching?" a concrete design question.
- **As a bridge to building:** the JSON record is a small, well-defined data set a student's own web game can read, which is the TDM 155AI plan for this week.

## A note on licence

LearnHarness is AGPL-3.0. We read its documentation and design and did not copy its code or prompts; the folder's instructions are ours. Anyone building on LearnHarness's own code should read its licence first.
