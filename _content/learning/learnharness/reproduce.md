---
title: "What a folder can do: LearnHarness in Claude Desktop"
author: claude (HL, Claude Code fa1567c6-380d-4fdb-bcdc-1abe8f0066f1, started in ll-week-11 on FAS-DDW32PXW5L)
date: 2026-11-15
status: "Claude's assessment, built on the findings in the other pages (LearnHarness at cb25c8e) and HD's reading of Anthropic's Claude Desktop docs (desktop/README.md, Nov 15). Not tested with students."
---

# What a folder can do

Marlon's idea (Nov 15): "having persistent graphs and data in your claude desktop project can reproduce elements of this sort of thing." Here is what of LearnHarness a student or faculty member could rebuild in a Claude Desktop Code-tab folder with files alone, what needs an app, and what is out of reach. HD's [starter folder](../../../starters/learning-harness/README.md) is the working version of the first column; HB's [game](../web/README.md) is a small app for part of the second.

One condition first: the Code tab needs a paid Claude plan (HD, from Anthropic's docs, Nov 15; [desktop/README.md](../desktop/README.md)).

## With files alone (instructions, skills, a graph)

- **The method, written down.** The theory and the moves (measure, plan, teach in single steps with a check each, practice in separate sessions) as `CLAUDE.md` and skills, in the student's own words. LearnHarness's prompts are AGPL and should not be copied; its `docs/teaching-methodology.md` is a model of how to state a theory first.
- **Persistent memory.** The graph (propositions, chains, sources), the attempts and one Markdown file per session, read at the start of each session and updated at the end. This is the part LearnHarness does with a three-model pipeline; in a folder, Claude does it by instruction, less reliably and more visibly.
- **Thinking out loud and confidence.** The learner types (or dictates) their reasoning and a 1 to 4 rating; Claude records both verbatim in `attempts.json`.
- **Committing the answer first.** Claude writes its answer or solution to a file before asking (for example in the session file, under a heading the learner agrees not to read). It works only as far as the learner doesn't look.
- **Practice modes and hints.** Recall, discrimination and composition problems, interleaved, with hints one at a time and a recorded outcome.
- **Research, PDFs, demos and diagrams.** Claude Code can search, read the student's PDFs, write an HTML demo or an SVG and open it.
- **A view of the graph.** A generated `graph.md` with a Mermaid diagram, or an HTML file Claude writes and opens.
- **Reading LearnHarness's own data.** A learner who uses the app could point Claude at its data folder with its read-only skill (`skills/learnharness/`).

## Needs an app (a page, even a small one)

- **Answer widgets:** shuffled options, an "I don't know" button, a confidence slider, a hidden answer key, a check behind a reveal. In chat these are conventions; on a page they are enforced. HB's `/learn` does the practice part.
- **Grading in code** for choice questions, and a gate of one open problem at a time.
- **A live map** with each idea's status, which unlocks as you answer: the game.
- **Spaced repetition** with a schedule (LearnHarness's flashcards plugin uses FSRS); a folder can record due dates, but something has to bring the learner back on the day.
- **Side questions** that can't see the answer key.

## Out of reach for a class project (Claude's judgement)

- Background jobs that wake the tutor later, with recovery after a crash; automatic extraction triggered by token counts; context compaction tuned per model.
- Prompt overrides per segment, multiple providers and cost metering.
- Plugins with their own agents and workers.
- The scale of testing behind it (more than 400 test files).

## Where the difference matters (Claude's)

LearnHarness enforces its pedagogy in code; a folder asks Claude to follow it. For a student, the folder's weakness is also the lesson: they can open every file, see where the tutor's memory lives, change the instructions and watch the behavior change. That is the "show your work" version of a learning tool, and it is what makes it a class project rather than a product.
