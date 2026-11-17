---
title: "LearnHarness: the loop"
author: claude (HL, Claude Code fa1567c6-380d-4fdb-bcdc-1abe8f0066f1, started in ll-week-11 on FAS-DDW32PXW5L)
date: 2026-11-15
status: "findings from the repository at cb25c8e, paraphrased, with paths; Claude's comments labeled"
---

# The loop: measure, plan, teach, practice

## The theory it rests on

`docs/teaching-methodology.md` (the author's theory, dated 2026-09-24) is the clearest place to start. In our words:

- A session runs between two states: what the learner already holds (what feels obviously true to them) and the goal. Probing pins down both.
- The session ends when the goal feels obviously true, not when it can be recited. A fact that is recited but not self-evident is memorized and will fade.
- The payoff ("the click") is loose facts collapsing into a few that generate the rest: knowing why instead of knowing that.
- Knowledge is a graph of propositions; teaching builds the graph by asserting facts in an order, one reasoning step at a time, each step attached to something already held. Small steps mean errors show at once and can be repaired before anything rests on them.
- Some propositions can't be derived from what the learner holds; they are placed as foundations, kept simple enough to accept as given, and ideally motivated by a question.
- Two optimizations: the learner's effort goes into the material, not logistics (the system finds sources, orders, checks facts); and the lesson takes the smallest tree of propositions from current to goal.
- Every reasoning step ends with a check.

## Measure (the prober)

The prober agent (`src/agent/teacher-agent.ts`, built with the tools in `src/agent/tools.ts`) asks questions until it can say where the learner's understanding ends. It makes the goal concrete with ungraded questions, works out the "strands" the goal depends on, and narrows each strand from both sides, using the answer, the confidence and the learner's thinking to choose the next question (`src/agent/prompts/prober/10-probe-doctrine.md`). A probe question is multiple choice (`probe`) or free recall (`recall`), with options, the correct answer and an explanation written before the answer; the app adds an "I don't know" choice (`src/core/question-core.ts`). The prober ends with `probe_done`, which records an assessment per strand and hands over to the teacher (`src/core/contracts/probe.ts`, `src/agent/tools/probe.ts`).

## Plan

The teacher's first job is a plan: a Mermaid graph of slug-named nodes and prerequisite edges, validated as acyclic (`src/agent/tools/plan.ts`, `src/agent/tools/mermaid-plan.ts`, `src/core/plan-tree.ts`, `src/core/contracts/plan.ts`). The learner sees it and can ask for changes; the teacher may replace it whenever the learner's thinking shows the map was wrong (`src/agent/prompts/teacher/10-planning.md`). The plan is a coarse map, deliberately not one node per teaching step (`docs/teaching-methodology.md`, section 7b). It stores structure only; which node is current or visited is derived from the questions tagged with node ids (`derivePlanStatuses` in `src/core/contracts/plan.ts`).

## Teach (the teacher)

Each teaching question carries a type, `predict` or `check`, and the plan node it belongs to (`src/core/question-core.ts`). The rhythm is predict, teach, check, one question per turn (`src/agent/prompts/teacher/28-predictions.md`, `20-teaching.md`); a check sits behind a "check your understanding" reveal. Multiple-choice answers are graded in code by exact match; free-text `explain` questions have the model commit a full answer before posing, and the learner sees it on submitting (`src/agent/tools.ts`; `src/core/question-core.ts`). A miss leads to repair in prose, not a hint ladder. Checks should apply the idea rather than repeat it, and a wrong answer should reveal which wrong model the learner holds (`src/agent/prompts/teacher/30-question-principles.md`). The teacher can also dispatch background research, read PDFs, build an interactive HTML demo, draw an SVG, or annotate the learner's own photo (`src/agent/prompts/teacher/40-jobs.md`, `50-demos.md`, `55-images.md`).

## Practice (a separate session)

A practice session has its own agent with two tools, `problem` and `conclude` (`src/agent/tools/practice.ts`). The learner chooses propositions from the graph, or names a topic (`src/agent/prompts/practice/00-base.md`; `newGraphContextMessage` in `src/core/native-messages.ts`). Each problem has a statement that never names the idea it tests, a mode, target proposition ids, and a model solution committed before the learner sees anything (`src/core/practice-problems.ts`). The three modes: **recall** (the idea must come to mind from weak cues), **discrimination** (near-twin cases separated by one feature), **composition** (a chain of reasoning run whole). The doctrine (`src/agent/prompts/practice/10-doctrine.md`) picks weak, much-used, long-unvisited targets, interleaves them, aims for success with effort, and retests misses on a fresh surface at the end. Hints climb a ladder one rung per request. `conclude` records an outcome (solved, solved with hints, moved on, surrendered, dismissed), the hint rung, a class of miss (cue, discrimination, execution, careless, structural) and whether to retest. Practice writes nothing to the graph (`docs/architecture.md`, "Teaching and practice").

## Thinking out loud, and confidence

Every quiz answer can carry the learner's thinking about the question and, on checks, what they thought while reading the teaching, kept as two separate channels; plus a confidence rating from 0 to 100 on a slider (`QuestionAnswerData`, `CONFIDENCE_STOPS` in `src/core/question-core.ts`). The model receives only what the learner added (`compactAnswerForModel`). The prompts read confidence against correctness: confident and wrong points to a misconception, unconfident and right to fragile knowledge (`src/agent/prompts/shared/25-confidence.md`). Practice uses free-text thinking only, with no confidence rating. Dictation (Deepgram) feeds the same fields (`docs/getting-started.md`).

## Side questions

Beside the lesson, the learner can open a side conversation on any explanation; it is one tool-less model call that sees the visible lesson with answer keys and model solutions hidden, and its exchanges are fed back to the teacher as context, not as evidence of understanding (`src/core/side-chat.ts`, `src/agent/side-chat.ts`, `src/agent/prompts/shared/35-side-conversations.md`).

## Claude's comment

The loop is a strong, specific pedagogy, and most of its moves are instructions plus a record. What makes it hold in the app is enforcement: the validators reject a malformed question, one problem at a time is a gate in code, answer keys are hidden from the learner and the side helper by construction. In a folder harness those become requests to Claude, which mostly comply. [What a folder can do](reproduce.md) sorts which is which.
