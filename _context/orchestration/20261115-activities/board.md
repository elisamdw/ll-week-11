---
title: "Board: Nov 15 · W11 activities"
author: claude (AL, Claude Code ceddf595-475f-4673-8bb2-6cc361aa8f9e, started in ll-week-11 on FAS-DDW32PXW5L)
date: 2026-11-15
---

# Board: Nov 15 · W11 activities

Run `20261115T125743966Z-311d6019` (plan `activities.json` in The Notebook at `_context/projects/50-in-focus/ll-weeks/fall-2026/11-ending-20261120/days/20261115/activities/`), launched 07:57 EST on the HUIT laptop (`FAS-DDW32PXW5L`) by MZ ("Nov 13 · meta", Claude `49dde539-b11a-4f3a-ac50-30bc088beedf`). Research, ideas and activities for three audiences: TDM 155AI (Wed Nov 18), William Stafford's SOC-STD 98to workshop (Mon Nov 23), and the LLUFs. Beside it, in the same repo, "Nov 15 · W11 prototypes" (PL) builds playable mechanics at `/proto/...`. Reader app: http://localhost:3111 (PL runs it).

## Panes

All four started in `/Users/marlonkuzmick/Development/mk-27/apps/the-notebook/apps/ll-weeks/ll-week-11`.

| ID | Pane | Provider | Thread | Owns | Status |
| --- | --- | --- | --- | --- | --- |
| AL | lead: board, commits, cross-audience map, card and graph views | Claude Opus 5.5, high | `ceddf595-475f-4673-8bb2-6cc361aa8f9e` | `_context/orchestration/20261115-activities/`, `_content/activities/` (README, `_layouts/`, `shared/`), `nextjs/app/{ideas,game-ideas,activities,prototypes}/` | views up (`559d6d7`): `/activities` (cards, print, board, graph, `/activities/map`), `/prototypes` (cards, print); map up (`fef00c9`); next: commit TD and SW's cards when they report, questions for Marlon |
| TD | TDM 155AI, Nov 18 | Claude Opus 5.5, high | `61b3561e-f12d-4cc0-a067-7256dd605f11` | `_content/activities/tdm155ai/` | committed `be13298`: two Nov 18 sessions (A: play, take apart, remix; B: AI at the table), `plan-changes.md`; prototype links updated as PL builds |
| SW | the Stafford workshop, Nov 23 | Claude Opus 5.5, high | `dd46e909-fd8b-4fb0-b2f6-2979500830b3` | `_content/activities/stafford/` | committed `508bd90`: two Nov 23 sessions (in the room 12:45–14:45; the async week), what William takes with him |
| LU | the LLUFs, Marlon's dictation, the story of the day | Codex gpt-6.1-sol, medium | `01a1df49-0635-7202-89ec-2b5f4bb5ca6d` | `_content/activities/llufs/`, `_content/marlon/`, `_content/story/` | committed `9df5143`: 8 LLUF cards (a 90-minute playtest session), the story of Nov 15; ready for dictation |

Handoffs: the run's helper publishes one `handoff.json` per pane, so SW's and LU's record their first batch only (SW `508bd90`; LU the first LLUF batch). Later work is in each pane's `handoff.draft.json` beside it (in mk-orchestration's `_output/orchestration/20261115T125743966Z-311d6019/w11-activities/<ID>/`) and in this board's checkpoints, which are the record.

Resume: Claude `claude --resume <thread>`, Codex `codex resume <thread>`, from the start directory above, on this machine only.

## Card fields the views read

Agreed for every activity card (the shared brief's format), with the graph's links:

- `kind`: `research`, `idea`, `activity` or `session`. `audience`: `tdm155ai`, `stafford`, `llufs`, or a list.
- Links drawn on `/activities/graph`: `mechanics` (ids from `_content/mechanics/mechanics.csv`), `readings` (slugs from `_content/bibliography/`), `prototypes` (slugs from `_content/prototypes/`, with or without the family folder), `ideas` (slugs from `_content/ideas/` or `_content/game-ideas/`; prefix `game-ideas/` when ambiguous), and `activities` (other activity cards, as `tdm155ai/<slug>`).
- A session's order: `sequence`, a list of `"12:00 tdm155ai/<slug>"` strings (time, a space, the card's path without `.md`); the time is optional.
- On the graph, "Linked things" shows the link nodes two or more cards share (default), all of them, or none. A link that names nothing in the repo shows as a faded node, so a card written before its target still draws.

Copies: CV ("Nov 15 · W11 cards", thread `4338f53c-7185-48bc-a018-7d392706430e`) copied these views to `/cards` (`nextjs/app/cards/`) and imports `ideas.css`, `board/board.css` and `graph/graph.css` from `nextjs/app/ideas/` as they are: rename no classes there without telling CV.

## Checkpoints

| time | ll-week-11 | Notebook pointer | what |
| --- | --- | --- | --- |
| 08:04 | `559d6d7` | `16293d4` | AL: `/activities` (cards by folder, audience filter, print, board, graph with links from the cards and small nodes for mechanics, readings, prototypes, idea cards; a session's sequence as arrows), `/activities/map`, `/prototypes` (cards, print, each with a Play link); board |
| 08:07 | `fef00c9` | `ed1dffe` (PL's bump, which carries it) | AL: the cross-audience map, `_content/activities/README.md` at `/activities/map`; session sequences take any time label |
| 08:08 | `7ac3396` | `d8cea6c` | TD's 21 files (`be13298`: 6 research, 2 idea, 9 activity, 2 session, `plan-changes.md`); SW's 21 (`508bd90`: 6 research, 4 idea, 8 activity, 2 session); session graphs at `/activities/graph?name=tdm155ai` and `?name=stafford` |
| 11:55 | `8118a1b` | `23c224a` | TD `92db984` (Session A agreed, run of show; B not chosen; plan-changes 12–13); SW `fc4112b` (in person; links to PL's built prototypes); LU `9df5143` (8 LLUF cards, the story of Nov 15, Marlon's words relayed); ChatGPT's research on AI, infrastructure and procedural rhetoric, which Marlon pasted, at `_context/research/` |
| 11:56 | `c3d9f5b` | `e4cff74` | SW: session in person agreed, run of show minute by minute, roles, fallbacks, dated checklist; async stays a proposal |
| 11:57 | `877d17a` | (next bump) | SW: what the ChatGPT handoff adds (research card; five proposed changes, none made; cautions on the name *The Stack* and the framing) |
| 13:44 | `07c6b69` | (next bump) | AL: the map updated with Marlon's choices, all seventeen prototypes built, LU's LLUF block, and the learning harness as a fourth game (Marlon, 13:40, relayed by MZ); passed to TD |
| 13:45 | `7821d1c` | (next bump) | TD: Session A's closer starts at 14:20 with HB's eight-minute learning-harness taste (25 min); the remix show drops to 10 min; timing is TD's proposal (plan-changes item 13) |
| 14:00 | `273a49b` | `4b36031` | AL: suggested links on the graph skip pairs the frontmatter already links (from CV's copy); note on CV's `/cards` |
| 15:20 | `05b9320` | `3ed617a` (CV's bump, which carries it) | AL: "the LL", not "the Lab" (Marlon's naming rule, relayed by MZ): 61 uses in 36 files across `_content/activities/` (all three audiences' folders), `_content/ideas/`, `_content/game-ideas/`, `_content/game-state/` and this board; "a Lab X" is "an LL X"; no quotation of Marlon's touched; the push carried CV's `2ac4f1f` |

## Marlon's requests

- 11:55: "can you help get this chatgpt research into the context folder as md for me?" Saved as he pasted it (three formatting fixes, noted in its header) at [`_context/research/20261115-chatgpt-ai-infrastructure-procedural-rhetoric.md`](../../research/20261115-chatgpt-ai-infrastructure-procedural-rhetoric.md) (`8118a1b`); SW asked to propose where it changes the Stafford cards.

## Waits on Marlon

Asked one at a time, AL's or the pane's recommendation first; answers recorded here with the time.

TDM 155AI, Wed Nov 18 (TD, [plan-changes.md](../../../_content/activities/tdm155ai/plan-changes.md)):

1. ~~Session A (play, take apart, remix), Session B (AI at the table), or a mix?~~ answered 08:10: **Session A, with one B swap** (AL's recommendation, chosen from options): B's *Claude takes a seat* comes in if the LL's board games or the overhead camera aren't in the room by Wednesday.
2. Which game do students remix: the AI game, PL's prototypes, or their own *Draw three* games?
3. Claude in class: claude.ai on laptops and phones, Claude Code only, or both?
4. Do the LL's Monopoly, Risk and Life and the overhead camera land before Wednesday (Airtable tasks, Nov 14)?
5. The class-plan and class-repo changes in `plan-changes.md`: go, item by item?

Stafford workshop, Mon Nov 23 (SW):

6. ~~Format: in person, two hours at the Bok Center (SW recommends), the async week, or the async week feeding the workshop?~~ answered 11:53: **in person, two hours** (SW's recommendation, chosen from options); the async session stays as a proposal.
7. What has William agreed to: was the Nov 3 proposal sent, and will he open, lead the debrief and close (SW: yes, so it's his class)?
8. The Sept 28 index cards: where are the photos, and was the database built? *Cards become the map* needs them.
9. GL's game proposals (state panel, the game's `AGENTS.md`, remix folders): go? *Read the game state* and *Remix one mechanic* depend on them.
10. A print-and-play kit for William by Nov 23 (SW: yes, the one thing he keeps), and a deployed playable link?
11. William's syllabus bans AI help on submitted work but studies AI artefacts in class: Claude Code in the room building remixes, framed as artefacts (SW: yes; confirm with William)?

13. SW, after the ChatGPT handoff: apply its five proposed changes to the Stafford cards (SW recommends 1–3 now: the debrief asks optimization or institutions, knowing/controlling/owning as marks on the map, two remix-menu items; 4–5 optional: the feedback-loop exercise, four more reference games)? See `stafford/what-the-chatgpt-handoff-adds.md`.

LLUFs (AL):

12. When are the fellows in the studio this week (LU: the W11 timeline has no LLUF shifts)? The cross-audience map has them playtesting prototypes early in the week for Wednesday's class.
