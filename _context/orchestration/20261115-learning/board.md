---
title: "Board: Nov 15 · Learning harness"
author: claude (HL, Claude Code fa1567c6-380d-4fdb-bcdc-1abe8f0066f1, started in ll-week-11 on FAS-DDW32PXW5L)
date: 2026-11-15
---

# Board: Nov 15 · Learning harness

Run `20261115T132013286Z-dd581419` (plan `learning-harness.json` in The Notebook at `_context/projects/50-in-focus/ll-weeks/fall-2026/11-ending-20261120/days/20261115/learning-harness/`, shared brief `shared.md` there), launched 08:20 EST on the HUIT laptop (`FAS-DDW32PXW5L`) by MZ ("Nov 13 · meta", Claude `49dde539-b11a-4f3a-ac50-30bc088beedf`). The workspace explores learning-with-AI tools as educational games and interactive systems, starting from LearnHarness, and prepares a student setup for TDM 155AI: Claude Desktop (Code tab) as the harness, plus a simple web learning game. Reader app: http://localhost:3111 (PL runs it, in "Nov 15 · W11 prototypes").

LearnHarness is cloned read-only at `_raw/learnharness` (gitignored), commit `cb25c8e49b85eed9e78315584731cad73a0118a6` (2026-11-12, "docs: list the security contacts"). Not installed, not run. AGPL-3.0: we describe and learn, we don't copy.

## Panes

All four started in `/Users/marlonkuzmick/Development/mk-27/apps/the-notebook/apps/ll-weeks/ll-week-11`.

| ID | Pane | Provider | Thread | Owns | First steps / status |
| --- | --- | --- | --- | --- | --- |
| HL | lead: board, commits, LearnHarness read closely, the frame, the format | Claude Opus 5.5, high | `fa1567c6-380d-4fdb-bcdc-1abe8f0066f1` | `_context/orchestration/20261115-learning/`, `_content/learning/README.md`, `_content/learning/format.md`, `_content/learning/learnharness/`, `_raw/learnharness/` | (1) board; (2) clone LearnHarness; (3) format with HD and HB. Clone done 08:20; format v0.1 08:25, v0.2 agreed 13:10; frame 13:10; close read 13:13 (`learnharness/`, seven pages) |
| HR | examples over time, Marlon's dictation | Codex gpt-6.1-sol, medium | `01a1df5d-9bc7-7762-ab81-c3dcc4aa7dd5` | `_content/learning/history/`, `_content/learning/examples/`, `_content/learning/marlon/` | 13:40: 33 example cards in `examples/`, `history/` (timeline, recurring ideas, research notes; 38 files parse, 189 local links pass), `marlon/` index; ready for dictation; 13:43 research draft complete |
| HD | Claude Desktop as the harness: a learning harness in a folder | Claude Opus 5.5, high | `9227a5a5-172f-4bcf-b20c-e8f6ac0a3a8d` | `_content/learning/desktop/`, `starters/learning-harness/` | (1) read the brief and Anthropic's docs on Claude Desktop / Code (projects, CLAUDE.md, skills, commands, artifacts, memory, MCP) into `desktop/README.md`; (2) propose the graph format; (3) scaffold `starters/learning-harness/` and run a trial on Bostrom's paperclip argument. 13:00: starter (CLAUDE.md, skills learn/teach/practice/graph, `check-graph.mjs`, worked example `examples/paperclips/`), `desktop/` (README from the official docs, trial, for faculty) |
| HB | the web learning game and the class setup | Claude Opus 5.5, high | `fe915dbb-5ed5-4918-a50b-18851bd49e0b` | `nextjs/app/learn/`, `_content/learning/web/`, `_content/learning/class/` | (1) read the brief, `nextjs/` conventions, TD's TDM 155AI plans; (2) say what the game needs from the format (requires, check question and answer, sessions); (3) scaffold `/learn` (map, practice round, progress) on a stub example. 13:00: `/learn` up on :3111 (pages return 200; not clicked through), `web/README.md`, `class/` (setup, sessions, pointer at the closer, what can go wrong); PL added the Learn nav link (`db36e80`) |

Resume: Claude `claude --resume <thread>`, Codex `codex resume <thread>`, from the start directory above, on this machine only.

## The shared format

[`_content/learning/format.md`](../../../_content/learning/format.md): v0.1 sent 08:25 (`graph/` with five JSON files, `sessions/*.md`; ideas in the graph, progress in `attempts.json`), adopted by HD and HB; v0.2 at 13:10 adds their asks (teaching `plan`, `retired`, `hints`, `via`, latest attempt by position, held when confidence is omitted, examples layout, `LEARN_GRAPH_DIR`). HD's trial ran on v0.1 unchanged.

## Checkpoints

| time | ll-week-11 | Notebook pointer | what |
| --- | --- | --- | --- |
| 08:22 | `ff16f54` | `dba90f1` | board; format draft v0.1 |
| 13:10 | `d69aaf8` | `80e2858` | frame (`_content/learning/README.md`); format v0.2; HD's starter folder and `desktop/`; HB's `/learn`, `web/`, `class/` |
| 13:13 | `25729a6` | `7bc2ed8` | HL's close read, `_content/learning/learnharness/` (README, loop, graph, agents, plugins, reproduce, game) |
| 13:38 | `057c6d7` | `7526045` | reading order for the LearnHarness code (pinned GitHub links); Airtable task for Marlon; his answers; times corrected |
| 13:42 | `25c6aa4` | `b93620c` | HB aligned with v0.2 (`status.js`, `graphs.mjs`, `Progress.jsx`; `/learn/paperclips` matches the checker: 4 held, 3 new); class docs for the taste and take-home; HR: 33 example cards, history README, recurring ideas, research notes, `marlon/` index; Marlon's "game" framing |
| 13:42 | `b28a0a7` | `0510984` | HD's checker, starter and trial follow format v0.2 (paperclips still 4 held, 3 new); the format string stays `ll-learner-graph/0.1` (v0.2 adds only optional fields and the status rule) |
| 13:43 | `7130a48` | `aff21f9` | HR: Anki and *Rocky's Boots* dates sourced (official forum, Computer History Museum archive); history metadata and evidence notes |

## Marlon's framing, 13:40

"learning harness stuff will be thought of as "game" for this week essentially" (in HL's pane, after the three questions). Recorded in `_content/learning/README.md`; relayed to MZ for the week's other workspaces.

## Marlon on forking, 13:51

"if we want to run the app can we just run it from a local forked version of the repo? what is the license situation? I'd like for fellows/staff/students to make their own thing or tweak this instead of just using vanilla app". HL's answer: yes, from source (Node 26, `npm ci`, `npm run plugins:setup`, `npm run dev` on localhost:3000, per `docs/development.md`); AGPL-3.0 allows forking, changing and running it, and asks that changed versions given or served to others come with their source under AGPL. Nothing installed yet; that waits on his go.

## Waits on Marlon

Questions go to him one at a time, each with HL's recommendation.

1. ~~Which class session is the student setup for?~~ Answered before 13:09: "Nov 18 taste + take-home" (HL's recommendation: a short demo inside Nov 18's remix segment or the closer, the starter as an optional take-home over Thanksgiving, shown Dec 2). TD agrees (out of class before Dec 2, a 5–10 minute pointer at the Nov 18 closer; `tdm155ai/plan-changes.md` items 12 and 13).
1a. The Desktop Code tab needs a paid plan (Pro, Max, Team or Enterprise; HD from Anthropic's docs, Nov 15); the syllabus promises the free tier. What do students' Harvard accounts give them? (raised by HD and HB, logged by TD; not asked yet)
1b. Where the game and the starter go in the class repo, and when (HB; nothing goes there without his go).
2. ~~Does he want to try the LearnHarness app himself?~~ Answered: "not right now--you can make this a task for me--i'd rather actually look at the code if the repo is online". Task filed for him, this week: https://airtable.com/appN3NB28TdhG2S7x/tblHsMq7e2MwOiqsd/reclxPqG82Qg6iDgy. A reading order with pinned GitHub links is in `_content/learning/learnharness/README.md`, "Read the code yourself".
3. ~~Should this work move to its own repo?~~ Answered: "Stay in ll-week-11 for now" (HL's recommendation: decide after Nov 18 and the take-home).
