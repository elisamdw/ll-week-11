---
title: "Trying the learning harness: Bostrom's paperclip argument"
description: "A short run of starters/learning-harness with Claude Code on Nov 15: three sessions, one of them in a fresh conversation, with Claude playing the learner. What worked and what didn't."
week: 11
date: 2026-11-15
status: tried (Claude as the learner; not tried with a student, not tried in the desktop app's window)
author: claude (HD, Claude Code 9227a5a5-172f-4bcf-b20c-e8f6ac0a3a8d, started in ll-week-11 on FAS-DDW32PXW5L)
---

# Trying the learning harness: Bostrom's paperclip argument

**What ran.** On Sunday, Nov 15, 2026, from 08:25 to 08:38 EST, HD copied [`starters/learning-harness/`](../../../starters/learning-harness/README.md) into a scratch folder and ran it with Claude Code 2.1.311 on the command line (`claude -p`, resumed turn by turn), with its default model (Fable 5.1). The command-line tool reads the same `CLAUDE.md`, skills and settings as the desktop app's Code tab ([docs](https://code.claude.com/docs/en/desktop), read Nov 15), but **the desktop app's window itself was not driven**: trust prompts, the `/` menu and permission dialogs there are untested.

**Who learned.** HD (Claude) played the learner: an undergraduate who holds means and ends, doubts that a smarter AI would keep a dumb goal, and backs away from the off-switch argument. The answers were written to test the harness (a partial answer, a low confidence, a stop mid-route, a hint), not to model any student.

**The result** is the worked example, [`starters/learning-harness/examples/paperclips/`](../../../starters/learning-harness/examples/paperclips/README.md): 7 ideas, 5 reasoning chains, 11 attempts, 3 session files, the map in `graph.md`, and the verbatim transcript.

| Session | Conversation | Turns | What happened |
| --- | --- | --- | --- |
| measure (`/learn`) | 1 | 1–5 | 4 probes; goal set in the learner's words ("why it wouldn't stop"); a 7-idea route shown and accepted |
| teach (`/teach`) | 1 | 6–10 | orthogonality and instrumental goals, each as predict → step → check; learner stops |
| practice (`/practice 2`) | 2, new | 11–14 | 2 unnamed problems (ad-click AI; translator and a budget cut), one hint |

## What worked

- **The files carried the learner across conversations.** The practice conversation started with no history and knew from `graph/` which ideas were taught, which were held, and that orthogonality had been a 3 with "it still feels weird"; it aimed problem 1 there.
- **The method held.** The tutor probed before teaching and moved up or down a level on each answer, asked for a guess before each step, put one idea in a step, and checked each one on a new case. It used the learner's wrong guess ("humans change goals all the time") as the way into the step.
- **Thinking out loud was kept.** Answers and reasoning went into `response` and `thinking` verbatim. When one answer touched two ideas (chess: intelligence as skill, and the doubt about orthogonality), it recorded two attempts with the right parts.
- **The shared format worked unchanged.** The tutor wrote all five `graph/` files to `format.md` v0.1 (plus the `plan`), and the checker found no broken links. HB's page can read this folder as it is.
- **Practice did not name the idea,** used a hint that pointed at the situation, not the term, and recorded the hint.
- **`graph.md` was useful:** the route with marks, a Mermaid map, the chains in words, each idea with the learner's latest quote, and one line per session.
- **Sources were cited** from `readings/` (Bostrom 2012 §§1–2, Bostrom 2003); ideas from everyday knowledge were marked as having no source.

## What didn't

- **Timestamps were guessed.** The tutor wrote attempt times like 08:38 for a check that ran at about 08:32, and two attempts are out of order in the file. Because status comes from the latest attempt, this can give a wrong status. *Fixed after the trial:* `CLAUDE.md` now says to run `date` before each attempt; the checker warns when times go backwards; the checker takes "latest" as the last in the file, not the latest time, which `format.md` adopted in v0.2.
- **One content error.** The tutor gave Bostrom's convergent instrumental goals as four (self-preservation, goal integrity, getting smarter, resources), leaving out technological perfection; the 2012 paper lists five (§§2.1–2.5). *Fixed in part:* `CLAUDE.md` now asks it to check a list against the reading or say it is giving part. A tutor's content still needs checking; this is why ideas carry sources.
- **A hinted answer counts as held.** The translator answer came after a hint, was correct with confidence 3, and so marked intelligence as skill and instrumental goals held. *Adopted in format v0.2:* an optional `hints` count on attempts, and a rule that a correct answer after a hint is shaky. The example's record predates the field and is kept as it happened, so it still shows those two ideas as held.
- **Steps ran long.** The orthogonality step was two paragraphs: the idea plus a reply to the learner's worry about humans. It read well, but it is more than the "few plain sentences" `CLAUDE.md` asks for.
- **Cost.** Each turn reread 100,000 to 310,000 tokens, mostly from cache (the whole `graph/`, the skill, the conversation). The command line reported about $5.50 in API-price terms for the 14 turns (its figure rises turn by turn within a conversation, so we read it as cumulative). On a Pro or Max subscription this counts against usage limits rather than a bill; a student running long sessions on the default model may hit those limits. A smaller model (Sonnet or Haiku) is worth trying.
- **Turns were slow-ish:** 21 to 142 seconds, most of it writing files after the reply was composed.
- **Permissions.** The starter's `.claude/settings.json` pre-approves writes to the record, but Claude Code ignores it until the folder is trusted ("this workspace has not been trusted"). The trial passed `--allowedTools` instead. How the desktop app asks for trust is untested; the student README says to accept it, or to use Accept edits.

## Next

1. Run it in the desktop app's Code tab with a person, ideally Marlon or a fellow, on a topic of their own, and note the trust prompt and permission dialogs.
2. Try a smaller model for a whole route and compare the records.
3. Point HB's `/learn` page at `examples/paperclips/` as its first fixture.
