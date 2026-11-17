---
title: "LearnHarness, read closely"
author: claude (HL, Claude Code fa1567c6-380d-4fdb-bcdc-1abe8f0066f1, started in ll-week-11 on FAS-DDW32PXW5L)
date: 2026-11-15
status: "a reading of the repository at commit cb25c8e (2026-11-12), cloned read-only to _raw/learnharness; nothing installed or run. Findings cite files by path; judgements and proposals are labeled as Claude's. HL read the README, docs/teaching-methodology.md, docs/architecture.md, docs/claude-code.md, the graph contract and fixtures; two read-only subagents read the agents, prompts, plugins and skills and reported with paths, and HL spot-checked their claims."
---

# LearnHarness, read closely

**What it is.** LearnHarness (https://github.com/amosblomqvist/learnharness, AGPL-3.0) is a desktop app, Electron around a Next.js server, that teaches with AI agents "from your current understanding to your goal" (`README.md`). It measures what the learner holds, plans a dependency map to the goal, teaches one reasoning step at a time with a check after each, and runs separate practice sessions. What is taught is extracted into a persistent graph of propositions and reasoning chains that later sessions can read. Everything is stored as plain JSON and JSONL files on the learner's machine (`docs/architecture.md`, "Storage and notifications").

Read at commit `cb25c8e49b85eed9e78315584731cad73a0118a6`. All paths below are relative to the repository root. We describe its ideas in our own words; no code or prompt text is copied into this repo.

## The pages

1. [The loop](loop.md): measure, plan, teach, practice; the thinking fields and confidence; the theory behind them.
2. [The graph](graph.md): the knowledge graph's data model, how it is built, and what it deliberately leaves out.
3. [Agents, prompts and providers](agents.md): the three agents, the layered prompts, background workers, Claude Code as a provider.
4. [Plugins, skills and examples](plugins.md): what can be added, the five shipped plugins (one of them a spaced-repetition deck), the read-only skill for outside agents, the example data.
5. [What a folder can do](reproduce.md): what a student or faculty member could reproduce in Claude Desktop with files alone, what needs an app, what is out of reach.
6. [Is it a game?](game.md): feedback, goals, progress, the graph as a map; links to the week's readings and mechanics.

## Five things worth taking from it (Claude's reading)

- **A theory first, then a system.** `docs/teaching-methodology.md` sets out the theory in ten short sections (learning is the goal feeling obviously true; one reasoning step at a time; a check after every step; the minimal tree from current to goal) and the prompts are described as a compression of it. A student harness can do the same: write the theory down, then make the instructions follow it.
- **Commit the answer before asking.** For free-text questions and practice problems the model writes its answer or full solution before the learner sees the question, and grades against that commitment (`src/core/question-core.ts`, `src/core/practice-problems.ts`). It keeps grading from drifting toward whatever the learner said.
- **The learner's thinking is the main data.** Every answer can carry the learner's reasoning in their own words and a confidence rating, and the prompts treat confident-and-wrong as the strongest sign of a misconception (`src/agent/prompts/shared/16-mental-model.md`, `25-confidence.md`).
- **Ideas and ratings kept apart.** The graph stores what was taught, never how well the learner knows it (`src/core/contracts/graph.ts`, header). Our [format](../format.md) keeps the same line: ideas in the graph, answers in `attempts.json`, status derived.
- **Plain files, inspectable.** Chats, graph ledgers, jobs and settings are files in one data folder (`docs/architecture.md`; `skills/learnharness/references/data-format.md`), which is what makes a Claude Desktop folder a plausible stand-in.

## Read the code yourself

Marlon, Nov 15: "i'd rather actually look at the code if the repo is online". It is: https://github.com/amosblomqvist/learnharness. A reading order, each link pinned to the commit read here (`cb25c8e`), roughly an hour:

1. The theory, 96 lines: https://github.com/amosblomqvist/learnharness/blob/cb25c8e49b85eed9e78315584731cad73a0118a6/docs/teaching-methodology.md
2. The runtime in one page: https://github.com/amosblomqvist/learnharness/blob/cb25c8e49b85eed9e78315584731cad73a0118a6/docs/architecture.md
3. The prompts, short numbered Markdown files per agent (start with `teacher/` and `practice/10-doctrine.md`): https://github.com/amosblomqvist/learnharness/tree/cb25c8e49b85eed9e78315584731cad73a0118a6/src/agent/prompts
4. The graph's data model, the long comment at the top and the store-format note: https://github.com/amosblomqvist/learnharness/blob/cb25c8e49b85eed9e78315584731cad73a0118a6/src/core/contracts/graph.ts
5. Real graph data from the app (propositions, one per line): https://github.com/amosblomqvist/learnharness/blob/cb25c8e49b85eed9e78315584731cad73a0118a6/tests/fixtures/golden-data/graph/nodes.jsonl
6. A question as data, and how answers, thinking and confidence are recorded: https://github.com/amosblomqvist/learnharness/blob/cb25c8e49b85eed9e78315584731cad73a0118a6/src/core/question-core.ts
7. The skill that lets Claude Code read a learner's data: https://github.com/amosblomqvist/learnharness/blob/cb25c8e49b85eed9e78315584731cad73a0118a6/skills/learnharness/SKILL.md
8. The flashcards plan (spaced repetition): https://github.com/amosblomqvist/learnharness/blob/cb25c8e49b85eed9e78315584731cad73a0118a6/docs/flashcards-vision.md
9. How its own coding agents are told to work: https://github.com/amosblomqvist/learnharness/blob/cb25c8e49b85eed9e78315584731cad73a0118a6/AGENTS.md

Trying the app is a task for Marlon this week (Airtable, `ll-work-base-26.3`: https://airtable.com/appN3NB28TdhG2S7x/tblHsMq7e2MwOiqsd/reclxPqG82Qg6iDgy), after reading the code.
