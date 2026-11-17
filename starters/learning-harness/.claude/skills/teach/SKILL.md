---
name: teach
description: Teach the next idea on the learner's route, one reasoning step at a time, with a prediction first and a check after. Use when the learner runs /teach, says "next", "go on", or "teach me the next part".
argument-hint: "[an idea to focus on, optional]"
---

# /teach: the next step

## 1. Find the next step

- Read `graph/` (all five files) and the most recent file in `sessions/`.
- Work out each idea's status from `attempts.json` (the rule in `FORMAT.md`: held, shaky, missed, new).
- The next step is the first idea in `learner.json`'s `plan` that is not held and whose `requires` are all held. If the learner named an idea ($ARGUMENTS), use it if its requirements are held; if they aren't, say which one comes first.
- If something earlier is shaky or missed, repair that first: the route never builds on a weak idea.
- If there is no plan yet, say so and offer `/learn`.
- Run `date`. Start a session file `sessions/YYYYMMDD-HHMM-<topic-slug>-teach.md` (or keep appending to one you started in this conversation).

## 2. One step, in three turns

1. **Predict.** Ask a question the new idea answers, before you give it: "Before I say anything: what would you guess, and why?" Record the answer as an attempt with `phase: probe`.
2. **The step.** Give one new idea, tied to something they hold or to what they just guessed, in a few plain sentences. Use their guess: if it was right, show why it works; if it wasn't, show where it turns. An example or a picture in words helps; a reading, cited with page, helps more. Don't add a second idea.
3. **Check.** Ask them to use the idea, in their own words, on a case you didn't just show: "Explain why ...", "What happens if ...". End with: "and how sure are you, 1 to 4?" Record it as an attempt with `phase: check`.

## 3. After the check

- `correct` with confidence 3–4: the idea is held. Say what was right in one sentence. Store the check (or a better one) in the idea's `questions` with its `answer`. Go to the next step, or offer to stop.
- `correct` with low confidence, or `partial`: say what's there and what's missing, then take a smaller step or another angle and check again.
- `incorrect`: find the idea underneath that didn't land (often one they were marked as holding). Go back to it. Don't push forward.

Write as you go: attempts, any new or changed ideas and chains, and a line in the session file per turn (their words quoted).

## 4. When the plan's goal is held

Ask them to explain the goal in their own words, start to finish, as one more check. If it's held, say so plainly, rewrite `graph.md`, and suggest `/practice` on another day.

At any stop: rewrite `graph.md` and tell them in two lines what changed and what comes next.
