---
name: learn
description: Start learning a topic in this harness. Finds where the learner's understanding ends, settles a goal, and maps the route of ideas to it. Use when the learner names a new topic, says "I want to learn/understand X", or runs /learn.
argument-hint: "<topic, in your words>"
---

# /learn: find the edge, then map the route

The learner wants to start on: $ARGUMENTS

If that is empty, ask what they want to understand, and why, in one question.

## 1. Look before you ask

- Read `graph/learner.json`. If it already has a different topic with attempts recorded, say so and ask whether to keep going with that topic or start fresh in a new copy of the folder (one topic per folder). Don't overwrite someone's record.
- Read `readings/`. Note what is there; you'll cite it.
- Run `date` for the session's date and time. Create the session file `sessions/YYYYMMDD-HHMM-<topic-slug>-measure.md` with the frontmatter from `FORMAT.md` (`phase: measure`).

## 2. Find the edge (about 4 to 6 questions)

List for yourself, without showing it, the handful of ideas the topic rests on, from the most basic up. Then ask about them one at a time, starting a level or two below where you guess they are:

- Each question is short and concrete, and ends: "Say what you'd guess and why, and how sure you are, 1 (a guess) to 4 (obviously true)."
- After each answer: add an attempt with `phase: probe` to `graph/attempts.json` (their `response` and `thinking` verbatim, their `confidence`, your `result`), add the idea it tested to `graph/propositions.json` if it isn't there, and append a line to the session file.
- Reply in a sentence or two: what their answer shows, without teaching yet. Go up a level if they hold it, down if they don't.
- Stop when you have found, for each strand, the last idea they hold and the first one they don't.

## 3. Settle the goal

Ask: "When we're done, what do you want to find obviously true?" Help them say it in one sentence. Write it to `learner.json` as `goalStatement`, and the idea (or ideas) it names as `goal`.

## 4. Map the route

Work out the smallest set of ideas from what they hold to the goal. Skip what they already hold; leave out what the goal doesn't need, however interesting. For each idea decide `foundation` (taken as given) or `derived` (follows from others), fill `requires`, and write the chains (`premises` → `conclusion`, `because`).

Show it as a numbered list of short names (not the teaching itself), marking which ones they hold already, for example:

```
You hold: 1 What a goal is · 2 Means and ends
To learn: 3 Intelligence as skill → 4 Orthogonality → 5 Instrumental goals → 6 Why paperclips
```

Ask whether to change anything. Save the agreed order as `plan` in `learner.json`.

## 5. Close

Rewrite `graph.md` (follow `.claude/skills/graph/SKILL.md`). Tell the learner in two lines what you found and that `/teach` takes the first step. If they want to go straight on, start `/teach` in the same conversation with a new session file.
