---
title: "How do learning tools map what a learner knows?"
description: "Math Academy, Khan Academy, ALEKS and Duolingo each keep a model of what a learner knows; what shape that model has, and whether it is a graph."
kind: question
convolute: research-questions
tags: [research, database, design]
audience: [ll, llufs]
links: [a-graph-of-what-the-learner-knows, portfolios-as-knowledge-graphs, what-a-learning-harness-needs, learning/examples/aleks, learning/examples/khan-mastery, learning/examples/duolingo, learning/learnharness/graph]
sources: ["_content/cards/a-graph-of-what-the-learner-knows.md", "_content/learning/learnharness/graph.md"]
voice: drafted
author: KR
date: 2026-11-16
week: 11
status: draft
---

A learning harness in a folder needs a record of what the learner knows. The commercial tools each keep one: ALEKS's knowledge spaces, Khan Academy's mastery map, Math Academy's prerequisite graph, Duolingo's model of forgetting. What shape is each, and what would a folder of Markdown need to do the same?

---

**Why the week needs it.** [A graph of what the learner knows](a-graph-of-what-the-learner-knows.md) is a proposal; `_content/learning/learnharness/graph.md` describes LearnHarness's graph. The examples in `_content/learning/examples/` describe the tools but not their data models side by side. KG's architecture work may want the comparison too.

**What would answer it.** For four tools: the unit (a skill, a topic, an item), the edges (prerequisite, encompassing), what is stored per learner (mastery, a forgetting curve), and how it picks the next thing; the published theory behind each (knowledge space theory, half-life regression).

**Where to look.** Math Academy's own writing on its knowledge graph, ALEKS's pages on knowledge space theory (Doignon and Falmagne), Duolingo's half-life regression paper (Settles and Meeder 2016), Khan Academy's help pages on mastery.

*KR's proposal, Nov 16.*
