# The format of this folder's record

The files in `graph/` and `sessions/` follow the Learning Lab's learner-graph format, v0.2 (Nov 15, 2026; the `format` field in `learner.json` still reads `ll-learner-graph/0.1`, as in the full description). The full description, with the reasons, is `_content/learning/format.md` in the LL's week 11 repo; this page is the part the tutor needs. A web page reads the same files, so keep to it.

## Files

```
graph/
  learner.json        the topic, goal and plan (one object)
  propositions.json   the ideas (an array)
  chains.json         reasoning steps (an array)
  sources.json        readings and links (an array)
  attempts.json       every answer the learner gives (an array)
sessions/
  20261116-1405-paperclips-teach.md   one Markdown file per session
graph.md              a view rewritten from graph/; never the record
```

JSON is pretty-printed with two spaces. Append to arrays; don't reorder them.

## IDs

Lowercase, hyphenated, with a prefix: `p-` ideas, `c-` chains, `src-` sources, `s-` sessions, `a-` attempts, `q-` questions. Unique in the folder, never renamed or reused. A session's id is `s-` plus its filename without `.md`: `s-YYYYMMDD-HHMM-<topic>-<phase>`. An attempt's id is `a-YYYYMMDD-HHMM-<slug>`; the web page writes `a-YYYYMMDD-HHMMSS-<slug>-<3 random characters>`, and both are valid.

## `learner.json`

```json
{
  "format": "ll-learner-graph/0.1",
  "topic": "Bostrom's paperclip argument",
  "goal": ["p-paperclips-dangerous"],
  "goalStatement": "The goal in the learner's own words.",
  "plan": ["p-final-goals", "p-intelligence-as-skill", "p-orthogonality"],
  "started": "2026-11-16",
  "learner": null
}
```

`plan` (optional) is the teaching order. `learner` is a name or pseudonym the student chooses, or `null`.

## `propositions.json`: ideas

```json
{
  "id": "p-orthogonality",
  "name": "Orthogonality",
  "statement": "How capable an agent is tells you nothing about what it wants.",
  "kind": "derived",
  "requires": ["p-intelligence-as-skill", "p-final-goals"],
  "sources": ["src-bostrom-2012"],
  "sessions": ["s-20261116-1405-paperclips-teach"],
  "questions": [
    { "id": "q-orthogonality-1", "prompt": "…", "answer": "…", "kind": "short" }
  ]
}
```

Required: `id`, `name` (2 to 5 words), `statement` (true, self-contained), `kind` (`foundation` or `derived`). Optional: `requires` (ideas to hold first: the map's edges), `sources`, `sessions`, `questions` (`kind` is `short`, or `choice` with `choices` and an `answer` that is one of them), `aliases`, and `retired: true` with a `note` for an idea that turned out wrong or was merged. **No ratings here:** how well the learner holds an idea comes from `attempts.json`.

## `chains.json`: reasoning steps

```json
{
  "id": "c-orthogonality",
  "premises": ["p-intelligence-as-skill", "p-final-goals"],
  "conclusion": "p-orthogonality",
  "because": "If intelligence is only skill at reaching goals, nothing in the skill picks the goal.",
  "sessions": ["s-20261116-1405-paperclips-teach"]
}
```

The premises together lead to the conclusion. Two separate arguments for one conclusion are two chains.

## `sources.json`

```json
{ "id": "src-bostrom-2012", "title": "The Superintelligent Will", "creators": ["Nick Bostrom"], "year": 2012, "url": "https://nickbostrom.com/superintelligentwill.pdf", "file": null, "note": "" }
```

`url`, or `file` (a path inside this folder, such as `readings/…`), or both.

## `attempts.json`: every answer

```json
{
  "id": "a-20261116-1412-orthogonality",
  "at": "2026-11-16T14:12:00-05:00",
  "session": "s-20261116-1405-paperclips-teach",
  "phase": "check",
  "propositions": ["p-orthogonality"],
  "question": "q-orthogonality-1",
  "prompt": "The question as asked.",
  "response": "The learner's answer, verbatim.",
  "thinking": "Their thinking out loud, verbatim.",
  "confidence": 3,
  "result": "correct"
}
```

`phase`: `probe` (finding the edge, or the prediction before a step), `check` (after a step), `practice` (a later session; the idea not named). `confidence`: the learner's own 1 (a guess) to 4 (obviously true); leave it out if they didn't give one. `result`: `correct`, `partial`, `incorrect`, or `unmarked`. `question` only when a stored question was used. `hints` (optional): how many hints came before this answer; 0 when left out. `via` (optional): what wrote the record when it wasn't the tutor; the web page writes `"web game"` on its own practice attempts. `at` comes from the clock (`date`), never an estimate.

The web page only ever adds attempts (`phase: practice`, with `via`), and only to a student's own folder when they run it on their computer. Everything else in `graph/` and `sessions/` is the tutor's to write.

## Status: worked out, never stored

The **latest** attempt for an idea is the last one in `attempts.json` that lists it, by position in the file, not by `at`. From it: **held** if correct with no hints and confidence 3 or 4, or no confidence given; **shaky** if partial, or correct with confidence 1 or 2, or correct after one or more hints; **missed** if incorrect; **new** if there are no attempts. An `unmarked` attempt leaves the status as it was. Retired ideas get no status. An idea is **open** when everything it `requires` is held. `node scripts/check-graph.mjs` prints this.

## `sessions/*.md`

```markdown
---
id: s-20261116-1405-paperclips-teach
date: 2026-11-16
phase: teach
goal: "the goal statement"
propositions: [p-final-goals, p-orthogonality]
sources: [src-bostrom-2012]
---

# Paperclips, teach (Nov 16, 14:05)

## Where we started
## The plan
## Steps
## What to practice next
```

`phase` is `measure`, `plan`, `teach` or `practice`. The frontmatter is what the web page reads; under it, record each turn briefly with the learner's words quoted.
