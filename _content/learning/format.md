---
title: "The learner's graph: one format for the folder harness and the web game"
author: claude (HL, Claude Code fa1567c6-380d-4fdb-bcdc-1abe8f0066f1, started in ll-week-11 on FAS-DDW32PXW5L)
date: 2026-11-15
status: "v0.2 (13:10), agreed by HL, HD and HB: v0.1 (08:25) plus the asks from HD's trial and HB's game. Claude's design, not Marlon's; nothing here is for students until he says so."
---

# The learner's graph

One set of plain files that a student's Claude Desktop project (Code tab) writes as it teaches, and that a web page reads to draw a map and pose practice. HD's folder harness (`starters/learning-harness/`) writes it; HB's game (`nextjs/app/learn/`) reads it. A student's sessions produce the data their game plays.

Learned from LearnHarness (read at commit `cb25c8e`, see [learnharness/](learnharness/README.md)), designed simpler. Our own format and words; nothing copied.

## Where it lives

Inside a harness folder (the student's Claude project folder), everything the harness remembers sits in two folders:

```
graph/
  learner.json        who is learning what: topic, goal, format version
  propositions.json   the ideas, one object each
  chains.json         reasoning steps: these premises lead to that conclusion
  sources.json        readings, files, links the ideas came from
  attempts.json       every probe, check and practice answer, with the learner's thinking
sessions/
  20261116-paperclips-teach.md    one Markdown file per session
```

JSON is the truth for the graph; Markdown is the truth for what happened in a session. Each JSON file is one top-level array (except `learner.json`, an object), pretty-printed with two spaces so diffs read well and Claude can edit by hand. No other files are required; a harness may add a generated `graph.md` (a readable listing) as a view, never as the source.

## IDs

Readable, lowercase, hyphenated, prefixed by kind, unique within the folder, never reused or renamed once written:

- propositions `p-…` (`p-orthogonality`), chains `c-…`, sources `src-…` (`src-bostrom-2014`), sessions `s-YYYYMMDD-…` (matching the filename; add `HHMM` after the date when two sessions share a day and phase: `s-20261116-1412-paperclips-practice`), attempts `a-YYYYMMDD-HHMM-…` (the web game writes `a-YYYYMMDD-HHMMSS-<slug>-<3 random characters>`; both are valid).

Readable ids let Claude, the student and the web page all refer to the same thing in prose. (LearnHarness uses random ids and a separate short `name`; we fold both into one slug plus a `name`.)

## `learner.json`

```json
{
  "format": "ll-learner-graph/0.1",
  "topic": "Bostrom's paperclip argument",
  "goal": ["p-paperclip-maximizer-is-dangerous"],
  "goalStatement": "Why a harmless-sounding goal plus enough capability could end badly, in my own words.",
  "started": "2026-11-16",
  "plan": ["p-final-goals", "p-intelligence-as-capability", "p-orthogonality", "p-paperclip-maximizer-is-dangerous"],
  "learner": "a pseudonym or first name the student chooses; never required"
}
```

`goal` names the proposition(s) the learner wants to feel obviously true; `goalStatement` is the goal in the learner's words, from the measure step. `plan` (optional) is the teaching order, so the harness and the game know the next step; `requires` alone gives only a partial order. One topic per folder in v0.2: a second topic is a second copy of the folder.

## `propositions.json`

```json
[
  {
    "id": "p-orthogonality",
    "name": "Orthogonality",
    "statement": "How capable an agent is tells you nothing about what it wants: almost any level of intelligence can be paired with almost any final goal.",
    "kind": "derived",
    "requires": ["p-intelligence-as-capability", "p-final-goals"],
    "sources": ["src-bostrom-2012"],
    "sessions": ["s-20261116-paperclips-teach"],
    "questions": [
      {
        "id": "q-orthogonality-1",
        "prompt": "A system gets much better at planning. Does that make its goals any kinder? Why or why not?",
        "answer": "No. Planning ability and goals are independent; a better planner pursues the same goal more effectively.",
        "kind": "short"
      }
    ]
  }
]
```

| field | required | meaning |
| --- | --- | --- |
| `id` | yes | stable slug |
| `name` | yes | a short label for the map (2 to 5 words) |
| `statement` | yes | one true, self-contained sentence or two at full precision; the identity of the idea |
| `kind` | yes | `foundation` (accepted as given, the bottom of the map) or `derived` (follows from others) |
| `requires` | no | ids the learner should hold before this one: the edges of the game's map. For a derived proposition, the union of its chains' premises unless the teacher adds an order the logic doesn't force |
| `sources` | no | `src-` ids |
| `sessions` | no | `s-` ids where it came up (provenance) |
| `questions` | no | stored check or practice questions the web game can pose without a model. `kind` is `short` (free text, compared by the learner against `answer`) or `choice` (with `choices: [...]` and `answer` equal to one of them) |
| `aliases` | no | other phrasings the learner or sources used |
| `retired`, `note` | no | `retired: true` with a `note` saying why (wrong, merged into another id) instead of deleting; ids are never reused. The game hides retired propositions |

The graph holds **ideas, not ratings**. Whether the learner holds a proposition is never written here; it is derived from `attempts.json` (below). LearnHarness draws the same line (its graph stores no quiz outcomes), and it keeps the files honest: an idea in the graph is something taught, not something learned.

## `chains.json`

A reasoning step, in the learner's terms: these premises together lead to this conclusion.

```json
[
  {
    "id": "c-orthogonality-from-capability",
    "premises": ["p-intelligence-as-capability", "p-final-goals"],
    "conclusion": "p-orthogonality",
    "because": "If intelligence is only skill at reaching goals, nothing in the skill picks the goal.",
    "sessions": ["s-20261116-paperclips-teach"]
  }
]
```

`premises` jointly imply `conclusion`; two independent arguments for the same conclusion are two chains. `because` is optional prose for the step. The web map draws chains as arrows from premises to conclusion; `requires` is the simpler edge list for a game that doesn't need chains.

## `sources.json`

```json
[
  { "id": "src-bostrom-2012", "title": "The Superintelligent Will", "creators": ["Nick Bostrom"], "year": 2012, "url": "https://nickbostrom.com/superintelligentwill.pdf", "file": null, "note": "open-access, author-posted" }
]
```

`url` or `file` (a path inside the harness folder), or both. Never copy a copyrighted text into the folder unless the student has it legitimately; a link is enough.

## `attempts.json`: probes, checks, practice

Every time the learner answers, one record. This is the progress the game reads.

```json
[
  {
    "id": "a-20261116-1412-orthogonality",
    "at": "2026-11-16T14:12:00-05:00",
    "session": "s-20261116-paperclips-teach",
    "phase": "check",
    "propositions": ["p-orthogonality"],
    "question": "q-orthogonality-1",
    "prompt": "A system gets much better at planning. Does that make its goals any kinder?",
    "response": "no, it just gets better at whatever it was already doing",
    "thinking": "I first thought smarter = wiser, but the example of a chess engine made me drop that.",
    "confidence": 3,
    "result": "correct"
  }
]
```

| field | meaning |
| --- | --- |
| `phase` | `probe` (measure: does the learner already hold it?), `check` (after a teaching step), `practice` (a later session, the idea not named in the question) |
| `propositions` | what the question exercised |
| `question` | a stored `q-` id when one was used; `prompt` holds the text either way |
| `response`, `thinking` | the learner's answer and their thinking out loud, verbatim |
| `confidence` | the learner's own rating, 1 (guess) to 4 (obviously true); omit when not asked, never fill in a default |
| `result` | `correct`, `partial`, `incorrect`, or `unmarked` (a self-check the learner hasn't scored). A `choice` question is marked by exact string match of the response against `answer` |
| `hints` | optional: how many hints the learner took before answering (0 when omitted) |
| `via` | optional: what wrote the record when it wasn't the harness, e.g. `"web game"` |

**Derived status** (a rule both sides apply, not a stored field). The **latest** attempt is the last one in `attempts.json` that lists the proposition, by position in the file, not by `at` (times can be wrong; order of writing is not). A proposition is **held** when its latest attempt is `correct` with confidence 3 or 4, or with confidence omitted, and no hints; **shaky** when its latest attempt is `partial`, or `correct` with confidence 1 or 2, or `correct` after one or more hints; **missed** when its latest is `incorrect`; and **new** when it has no attempts (an `unmarked` latest leaves the status it had before). It is **open** on the game's map when everything it `requires` is held. Practice results count more than checks in the learner's eyes, but the rule stays this simple for now.

## `sessions/*.md`

```markdown
---
id: s-20261116-paperclips-teach
date: 2026-11-16
phase: teach
goal: "Why a harmless-sounding goal plus enough capability could end badly"
propositions: [p-final-goals, p-intelligence-as-capability, p-orthogonality]
sources: [src-bostrom-2012]
---

# Paperclips, teach (Nov 16)

## Where we started
## The plan (coarse map, not the steps)
## Steps
## What to practice next
```

`phase` is `measure`, `plan`, `teach` or `practice`, the four moves (one session may cover measure, plan and teach). The headings are a suggestion for HD's harness; the frontmatter is the contract the web page reads.

## Examples and where the game writes

Each worked example is a whole harness folder, at `starters/learning-harness/examples/<slug>/` with `graph/` and `sessions/` inside, so an example and a student's own folder look the same to the game. `starters/learning-harness/scripts/check-graph.mjs` (plain Node) validates a folder and prints each proposition's derived status by the rule above.

The web game writes only `attempts.json` (new records with `phase: practice` and `via: "web game"`), and only to a student's own folder, named by `LEARN_GRAPH_DIR` when they run the game locally. For the examples it keeps progress in the browser and never touches `starters/`. It never edits propositions, chains or sessions; Claude does that in the harness. A deployed or shared page reads only.

## Settled

- v0.1, 08:25: HL's draft. HD dropped its single-`graph.json` proposal for the five files; HB agreed; questions stay on the proposition (a proposition without one gets "say it in your own words, then compare with the statement" in the game, recorded with no `question` id).
- v0.2, 13:10: HD's `plan`, `retired`/`note`, `HHMM` in session ids, latest-by-position, `hints`; HB's held-when-confidence-omitted, `via`, game attempt ids, the examples layout and `LEARN_GRAPH_DIR`. HD's trial (three sessions on the paperclip argument, [desktop/trial.md](desktop/trial.md)) ran on v0.1 without changes.
