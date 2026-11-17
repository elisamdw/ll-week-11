---
title: "Learning with AI, as games and interactive systems"
author: claude (HL, Claude Code fa1567c6-380d-4fdb-bcdc-1abe8f0066f1, started in ll-week-11 on FAS-DDW32PXW5L)
date: 2026-11-15
status: "the frame for the Nov 15 learning-harness workspace; Marlon's words are quoted and dated, everything else is Claude's framing and proposals. Nothing here is for students until Marlon says so."
---

# Learning with AI, as games and interactive systems

## What Marlon asked for

Marlon, Nov 15, just before 08:18: "a new workspace for exploring this repo and things like it = learning-with-ai tools: https://github.com/amosblomqvist/learnharness def want to help students and faculty think about building things like this, but initially within claude desktop . . . like having persistent graphs and data in your claude desktop project can reproduce elements of this sort of thing. So i need a new workspace that will think about this sort of educational "game" or interactive system. research examples over time, ai examples, this example, then helps me set students in my class up to create a simple web based learning game/environment, but also to use Claude Desktop (code) as the harness for this...."

And later the same day, in HL's pane: "learning harness stuff will be thought of as "game" for this week essentially". So the learning harness is one of week 11's games, read with the same questions as the others (mechanics, game state, feedback), not a side project.

## The frame (Claude's)

A learning tool built on a model is a system with state, moves and feedback, which is to say it can be read as a game. Week 11 is about games and interaction, and the week's question for a mechanic (what does it make the player do, and what does the game remember?) applies to tutors too:

- **What it remembers.** LearnHarness keeps a persistent graph of the propositions it has taught and the reasoning that links them, plus every answer, confidence rating and line of the learner's thinking. Memory across sessions is what turns a chat into a system: the next session starts from a state, not from nothing.
- **What it makes the learner do.** Predict, explain, check; think out loud; practice without being told which idea the problem is about. These are the verbs (the week's [mechanics inventory](../mechanics/mechanics.csv) has many of their cousins: feedback, levels and progression, tech tree and unlocks, fog of war, the tutor face).
- **What it shows.** A map of the ideas, and of where the learner stands on it. LearnHarness draws the map and deliberately leaves the learner's standing off it; a game would put the two together. That gap is where a student project can start.

The bet, in Marlon's words above: a student does not need an app to get much of this. A folder that Claude Code reads and writes (instructions, a few skills, a graph in plain JSON, one Markdown file per session) reproduces the memory and most of the moves; a small web page reads the same files and makes the map and the practice into something to play.

One limit found on the first morning (HD, from Anthropic's Claude Desktop quickstart, code.claude.com/docs/en/desktop-quickstart, read Nov 15): the Desktop Code tab needs a paid plan (Pro, Max, Team or Enterprise). What students' Harvard accounts give them is an open question for Marlon.

## What this workspace is making

| area | what | pane |
| --- | --- | --- |
| [format.md](format.md) | the learner's graph: one plain-file format the folder harness writes and the web game reads | HL with HD and HB |
| [learnharness/](learnharness/README.md) | LearnHarness read closely: the loop, the graph, the agents, the plugins; what a student could rebuild with files alone; what makes it a game, or not | HL |
| `history/`, `examples/` | learning machines and AI tutors over time, and current examples, as cards | HR |
| `marlon/` | Marlon's dictation for this workspace, verbatim | HR |
| `desktop/` | Claude Desktop (its Code tab) as the harness, from Anthropic's docs; with the starter folder at `starters/learning-harness/` in this repo | HD |
| `web/`, `class/` | the web learning game students build (a page at `/learn`), and the class setup | HB |

## Where to start

1. [format.md](format.md), to see the data everything shares.
2. [learnharness/](learnharness/README.md), for what the model app does and what of it a folder can do.
3. The starter folder, [`starters/learning-harness/`](../../starters/learning-harness/README.md), with its worked example on the paperclip argument; then [desktop/](desktop/README.md) for Claude Desktop from the official docs.
4. The game at http://localhost:3111/learn (HB, [web/](web/README.md)), and the class plan in [class/](class/README.md): Marlon's choice (before 13:09, Nov 15) is a short taste on Nov 18 and the starter as a take-home over Thanksgiving, shown on Dec 2.

## Related, elsewhere

- The learning-games classics (Papert, Gee, Malone, Koster, gamification and its critics, and the meta-analyses): `W11/research/learning-games-classics.md` in The Notebook, and Marlon's idea card [classic texts on learning games](../ideas/classic-texts-on-learning-games.md).
- The week's [bibliography](../bibliography/README.md), especially [Koster](../bibliography/koster-2004-theory-of-fun.md) (fun is learning a pattern), [Bogost on gamification](../bibliography/bogost-2011-gamification-is-bullshit.md), and [Nguyen on value capture](../bibliography/nguyen-2024-value-capture.md) (a score that stands in for a value).
- TD's plans for TDM 155AI on Nov 18, in [`activities/tdm155ai/`](../activities/tdm155ai/README.md), especially [remix with Claude Code](../activities/tdm155ai/remix-with-claude-code.md).
- Marlon's idea card [Level up AIBL Connect with gamified things](../ideas/level-up-aibl-connect-with-gamified-things.md).
