---
name: practice
description: Run a practice session on ideas already taught in this harness, with problems that don't name the idea they need. Use when the learner runs /practice, asks to be quizzed or tested, or comes back on a later day to review.
argument-hint: "[number of problems, default 5]"
---

# /practice: use it without being told which idea

## 1. Choose what to practice

- Read `graph/`. Work out each taught idea's status from `attempts.json`.
- Pick the problems' targets in this order: missed, then shaky, then held ideas with no `practice` attempt or none for the longest time. Leave out ideas never taught (`new`).
- Aim for $ARGUMENTS problems (5 if not given). Mix in one that needs two ideas together, if the graph has a chain that joins them.
- Run `date`. Start `sessions/YYYYMMDD-HHMM-<topic-slug>-practice.md` with `phase: practice`.

## 2. Each problem

- Write a new situation, not the wording of the teaching or of a stored question, that needs the idea to solve but doesn't name it. Vary the surface: a different example, a claim to judge, a "what would happen if", a short argument with a hole in it.
- Ask for the answer, the thinking, and confidence 1 to 4.
- If they're stuck, give one hint that points at the situation, not at the idea's name. Then a second, smaller hint. Then the answer, explained.
- Record an attempt with `phase: practice` for every idea the problem used; note hints in `thinking` as "[after hint 1]".
- Reply: what was right, what was missing, one sentence. Then the next problem.

## 3. Close

- Store one good problem on each idea practiced (`questions`), so the web page can use it.
- Rewrite `graph.md`. Tell them in two lines which ideas moved (held → shaky, shaky → held) and which to come back to.
