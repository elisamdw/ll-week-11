---
title: "The web learning game: how it's built, and what to remix"
author: claude (HB, Claude Code fe915dbb-5ed5-4918-a50b-18851bd49e0b, started in ll-week-11 on FAS-DDW32PXW5L)
date: 2026-11-15
status: "draft, Claude's design for TDM 155AI; not for students until Marlon agrees"
---

# The web learning game

At **http://localhost:3111/learn**. A learner's graph, the files a student's Claude Desktop project writes as it teaches them (format: [the learner's graph](../format.md), v0.2), becomes a game with three views:

- **Map.** Every idea is a node; an arrow runs from an idea to the ones that rest on it. Foundations sit on the left and start open. Open a lit node, answer its question, say how sure you are, and if you had it at 3 or 4 the idea is *held*, which opens what rests on it. The goal has a thick border on the right.
- **Practice.** A round of five questions drawn from ideas you have already tried, missed ones most often, held ones least. The question doesn't name the idea.
- **Progress.** How much of the map is held, shaky, missed, open or locked; how much of the path to the goal is held; your last answers, from the harness and from the game.

Answers the student gave Claude in the folder (`graph/attempts.json`) count on the map from the start: what they learned in Claude Desktop is already lit when they open the game.

## Where the graph comes from

The game looks in three places (`nextjs/app/learn/graphs.mjs`, top of the file):

1. **Your own folder,** when you run the app with `LEARN_GRAPH_DIR=/path/to/your-harness pnpm dev`. It shows as **mine**, and it is the only graph the game writes to: each practice answer is added to `graph/attempts.json` with `phase: "practice"` and `via: "web game"`, so the next Claude session sees it.
2. **Worked examples,** one harness folder each in `starters/learning-harness/examples/<name>/` (HD's; *paperclips* is the first). Answers to an example stay in the browser.
3. **A sample** (`nextjs/app/learn/_sample/`, *A game is data*), written by Claude as a stand-in, shown only while there are no examples (hidden now that *paperclips* is there).

Retired ideas (`retired: true`) are hidden, and so are requirements that point at them.

The game never edits ideas, reasoning steps or sessions; Claude does that in the harness. If a file is broken (bad JSON, a `requires` that names a missing idea, a loop), the page lists the problem in words a student can paste back to Claude.

## How it's built

Plain React and CSS in the existing reader app, no new packages, no model calls. One file per piece, each with its tuning at the top between `---- Tuning ----` lines:

| file | what it does | tuning |
| --- | --- | --- |
| `status.js` | the rules (format v0.2): held / shaky / missed from the latest answer by position in the file (unmarked answers skipped; a correct answer after hints is shaky), open when everything required is held, depth on the map, drawing a practice round, writing an answer record | held at confidence 3; correct with no confidence counts as held; round size 5; weights missed 4, shaky 2, held 1 |
| `Map.jsx` | the map and the panel beside it | column and row spacing, node size, whether locked names show, when the statement shows |
| `Ask.jsx` | one question: choose or write, check, mark yourself, say how sure you are | the thinking-out-loud box, the confidence labels |
| `Practice.jsx` | a round, one question at a time, then a tally | (in `status.js`) |
| `Progress.jsx` | the bar, the path to the goal, the latest answers | how many answers to list |
| `Game.jsx` | the three views; merges answers from the folder, the game and the browser; saves | the views and their order |
| `graphs.mjs` | server side: finds and reads graphs, checks them, appends answers | where examples and your folder are |
| `learn.css` | the look; status colors at the top (`--held`, `--shaky`, …) | colors |
| `page.jsx`, `[graph]/page.jsx`, `[graph]/attempts/route.js` | the pages and the one write route | none |

Questions come from the `questions` stored on each idea (`choice` ones are marked by the game; `short` ones show the answer and the student marks themselves). An idea with no stored question gets "say it in your own words", with the statement as the answer.

## Remixes a student could ask Claude Code for

Each names the file Claude should change, so a student who doesn't read code can still say where the change goes. Claude's proposals; none built.

1. **A boss at the goal.** "In `status.js` and `Map.jsx`, make the goal node a boss: it opens only when its whole path is held, and beating it takes three questions in a row from ideas on the path, with no misses." Changes what winning means; a student can argue whether a boss fits learning.
2. **Spacing by the calendar.** "In `status.js`, change `drawRound` so ideas you haven't answered for the longest come up first, and anything held for more than three days counts as shaky again." Brings in forgetting; the map starts to fade when you stay away.
3. **Reskin the map.** "In `Map.jsx` and `learn.css`, draw the graph as a dungeon: foundations are the entrance, each idea is a locked room, held rooms are lit, the goal is the last room. Don't change `status.js`." Same rules, different fiction; does it change what the game says about learning?
4. **Two players, one graph.** "Add a duel to `Practice.jsx`: two names, questions alternate, each wrong answer gives the other player a point, and both players' answers are saved." A competition on top of one person's graph; whose learning does it record?

A fifth, for a class that has time: ask Claude to make the game read a classmate's harness folder and play their graph, then compare maps.

## Open questions for Marlon

- Where the game lives for students: a copy in the class repo (`tdm155ai-week-11`), a copy inside each student's harness folder, or a page Claude builds from scratch in their folder (see [class setup](../class/README.md)). Nothing goes to the class repo without his go.
- Whether the game should ever call a model to mark written answers. It doesn't now: students mark themselves, which is part of the method, and there is no API cost.

*Not checked in a browser by HB: the pages return 200 on the dev server and the rules were tested in Node (statuses opening in order, v0.2's hints, unmarked and position rules, a loop reported, answers appended only to the student's own folder). On HD's paperclips example the game's statuses match `check-graph.mjs`. Someone should click through `/learn/paperclips` once.*
