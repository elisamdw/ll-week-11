---
title: "Is LearnHarness a game?"
author: claude (HL, Claude Code fa1567c6-380d-4fdb-bcdc-1abe8f0066f1, started in ll-week-11 on FAS-DDW32PXW5L)
date: 2026-11-15
status: "Claude's reading, with findings cited to the repository at cb25c8e and the week's readings and mechanics. Proposals labeled."
---

# Is LearnHarness a game?

Not by design. The archived vision lists what its author wanted (a lesson sectioned by the plan, checks that gate progress, a strip showing the current node, sessions opening with retrieval) and then says gamification (XP, streaks, confetti) is "explicitly avoided": the structure is meant to be "epistemic, not Skinnerian" (`docs/archive/vision.md`). Read through the week's mechanics, it still has several game elements, and lacks others on purpose.

## What it has

| element | in LearnHarness | mechanic (`_content/mechanics/mechanics.csv`) |
| --- | --- | --- |
| a goal | the goal understanding, made concrete by the prober | `goal-and-win-condition` |
| a core loop | predict, teach, check; in practice, problem, hint, conclude | `core-loop` |
| feedback | correct or incorrect chips on every check, the committed answer revealed, outcome badges in practice (`components/practice-cards.tsx`) | `feedback` |
| a map | the plan tree with current, visited and upcoming nodes; the knowledge graph across sessions | `tech-tree-and-unlocks`, `fog-of-war-and-exploration` |
| difficulty that adapts | the prober narrows each strand; practice aims at success with effort and climbs a hint ladder | `levels-and-progression` |
| retry | missed problems retested on a fresh surface at the end of practice | `lives-failure-and-retry`, `rewind-and-do-over` |
| a daily rhythm | flashcards: due reviews and a cap of new ideas per day (FSRS) | `come-back-later` |
| an AI character | a dry tutor with no praise | `the-tutor-face`, `readable-personalities` |

## What it leaves out, on purpose

No points, streaks, levels, badges or leaderboards, and no stored mastery (`README.md`; `src/core/contracts/graph.ts`). The checks don't gate anything in the current code: the plan's statuses come from which node the teacher is on, not from grades (`docs/architecture.md`, "Teaching and practice"). The vision's "gated progression" (nodes complete, next ones unlock, the learner picks the branch at a fork) was not built.

## Why that line is defensible (from the week's readings)

- [Bogost, "Gamification is Bullshit" (2011)](../../bibliography/bogost-2011-gamification-is-bullshit.md): points and badges bolted on are the easy, inessential part of games.
- [Nguyen on value capture (2024)](../../bibliography/nguyen-2024-value-capture.md): a simple metric can replace the richer value it stood for; a mastery score could replace understanding.
- The evidence summarized in `W11/research/learning-games-classics.md` (The Notebook): meta-analyses find small, context-dependent effects for gamification, and one study found badges and a leaderboard lowered motivation (flagged there as unverified).

## Why a game could still help (Koster, and the proposal)

- [Koster, *A Theory of Fun* (2004)](../../bibliography/koster-2004-theory-of-fun.md): fun is the feeling of learning a pattern. LearnHarness's "click" (loose facts collapsing into a few that generate the rest; `docs/teaching-methodology.md`, section 3) is the same moment named from the teaching side.
- The graph is already a map. What a game adds is the learner's position on it: which ideas are held, shaky, missed, and which are open because everything they require is held. That is the `tech-tree-and-unlocks` mechanic made from understanding rather than points, and it is what HB's `/learn` draws from [our format](../format.md).

**Proposal (Claude's):** the student project is the gap LearnHarness left open on purpose. Build the gated map, then argue with it: does unlocking help you learn, or does it start to stand in for learning? Students can test that against Koster, Bogost and Nguyen with their own graphs.
