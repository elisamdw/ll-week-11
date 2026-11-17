---
title: "Four ways to model what a learner knows"
description: "Math Academy, ALEKS, Khan Academy and Duolingo each keep a model of the learner: a prerequisite graph with decaying memory, a set of knowledge states, mastery levels per skill, a forgetting curve per word."
kind: reading
convolute: learning-harnesses
tags: [research, database, design]
audience: [ll, llufs]
links: [how-do-learning-tools-map-what-a-learner-knows, a-graph-of-what-the-learner-knows, portfolios-as-knowledge-graphs, what-a-learning-harness-needs, learning/examples/aleks, learning/examples/khan-mastery, learning/examples/duolingo, learning/learnharness/graph]
sources: ["W11/research/learner-models-and-badges.md", "https://www.mathacademy.com/how-our-ai-works", "https://www.justinmath.com/individualized-spaced-repetition-in-hierarchical-knowledge-structures/", "https://www.aleks.com/about_aleks/knowledge_space_theory", "https://en.wikipedia.org/wiki/Knowledge_space", "https://www.socsci.uci.edu/newsevents/news/2013/2013-04-30-learning-on-the-go.php", "https://blog.khanacademy.org/?p=13201", "https://aclanthology.org/P16-1174/", "https://github.com/duolingo/halflife-regression", "https://blog.duolingo.com/learning-how-to-help-you-learn-introducing-birdbrain/"]
voice: drafted
author: KR
date: 2026-11-16
week: 11
status: draft
---

Each tool keeps a different shape of learner. Math Academy: a graph of topics with prerequisite and weighted "encompassing" edges, and a decaying memory per topic. ALEKS: the set of items a learner knows, offering only what they are ready to learn. Khan Academy: a mastery level per skill. Duolingo: a forgetting curve per word. A folder of cards could do the same with typed links and a separate record per learner.

---

**The answer to** [How do learning tools map what a learner knows?](how-do-learning-tools-map-what-a-learner-knows.md), from a research pass on Nov 16; the full note is `W11/research/learner-models-and-badges.md` (part A).

- **Math Academy.** Thousands of topics, two kinds of edge: prerequisites, and weighted "encompassings," where an advanced topic practices part of a simpler one. Per learner and topic it stores repetitions, a memory value that decays, and a learning speed. Its spaced repetition (Justin Skycak's "FIRe") lets a passed review give credit down the encompassings, so the next task is the one that clears the most due reviews at once.
- **ALEKS.** Knowledge space theory (Doignon and Falmagne): a learner's state is the set of items they know; 25 to 30 questions place them; they are offered only items they are "ready to learn," the outer fringe (the term from Wikipedia; a 2013 UC Irvine story gives a success rate above 95% on those items). No forgetting model on the pages opened.
- **Khan Academy.** Per skill: Attempted, Familiar, Proficient, Mastered. Practicing one skill alone stops at Proficient; mixed tests and challenges move skills up or down. No prerequisite graph or time decay on the pages opened (its help center refused access).
- **Duolingo.** Half-life regression (Settles and Meeder, ACL 2016) per word, from times seen, times correct and time since practice: predicted recall p = 2^(-Δ/h). It raised daily engagement 12%. Birdbrain (2020) adds each learner's ability and each exercise's difficulty, to pick exercises "at just the right difficulty."

**What a folder would need**, as the researcher infers: a stable ID per card, typed links (prerequisite; encompasses, with a weight), a separate record per learner per card (level or memory, last seen, counts), and a script that reads both and picks the next card.

**For KG and the harness, as KR reads it.** The deck's `follows` is close to a prerequisite and its `links` are untyped; Math Academy's encompassing edge, with a weight, is the one kind of link the deck has no word for. The per-learner record belongs beside the cards, not in them, which fits [Graphs and databases beside the docs](graphs-and-databases-beside-the-docs.md).

*KR's account of a sourced research note, Nov 16. The last paragraph is KR's proposal.*
