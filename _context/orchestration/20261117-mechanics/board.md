---
title: "Board: Nov 17 · W11 mechanics"
author: claude (EL, Claude Code 5d007b0d-9507-46b8-9517-79b86acafcb8, started in ll-week-11 on FAS-DDW32PXW5L)
date: 2026-11-17
---

# Board: Nov 17 · W11 mechanics

Run `20261117T142641877Z-8db05b51` (plan `mechanics.json` in The Notebook at `_context/projects/50-in-focus/ll-weeks/fall-2026/11-ending-20261120/days/20261117/mechanics/`, shared brief `shared.md` there), launched 09:26 EST on the HUIT laptop (`FAS-DDW32PXW5L`) by MZ ("Nov 13 · meta", Claude `c97a36fa-1eb5-4cc6-b75d-ef54365d9c61`). The workspace writes the week's reference on mechanics: game mechanics, the LL's own mechanics and technologies, and games, each as an entry with a definition, a description, a how-to, a why-to and a home game version. It serves the LLUFs this afternoon (the 3:00 zone), TDM 155AI tomorrow (Nov 18, 12:00) and William Stafford's workshop (Nov 23).

Reader app: http://localhost:3111 (EL runs it, `pnpm dev` in `nextjs/`, up since 09:28; `/`, `/proto`, `/mechanics` answered 200).

Start here: [the entry format](../../../_content/mechanics/format.md) (v1.0) and [the index](../../../_content/mechanics/README.md).

## Marlon's words (Nov 17)

From the shared brief, as MZ quoted them:

- To MZ, 07:58: "today I need one workspace on game mechanics and ll mechanics"
- To MZ, about 08:12: "so then you understand the mechanic concept basically. I want a few things: 1) an updated inventory of game mechanics with definitions and examples built out from our video games course support, but we can also have technologies and games tables I'd say 2) LLUF-created deep dives on mechanics and technologies they've experimented with, 3) a few key mechanics with illustrations for my class--think mechanics-studies, 4) ll mechanics and technologies thought of the same way . . . with definitions/descriptions/how-tos and WHY to's = what you'd do with it in a teaching or presenting context, and then how you'd create home game versions of them"

Answers to EL's questions go here, verbatim, with the time.

- Question 1, which mechanics get a study (relayed verbatim by MZ, message `5e2b66db`, received 10:09): "go ahead and do all six for a start". All six were built by then; "for a start" leaves room for more, and no seventh is added without asking him.
- In EL's pane, about 10:35, asking for the overview: "ok give me a nice overview of all the agents work in an html doc you open in chrome"
- In EL's pane, about 10:37, today's LLUF activity: "ok let's move on to some other things for today now. I want to have some LLUFs work with NFC stickers/cards as a "technology" and discover the various mechanics it allows for, then think about some ways they could deploy this in a game 1) for the LL, like a workshop game/activty, and then 2) for a hybrid tabletop/digital game, potentially but not necessarily the AI 4x game we've been thinking of designing for stafford--they should at least TRY to come up with an idea for that one. Then some other LLUFs can focus on other technologies and mechanics. That will be today's activity. I'm not exactly clear on waht other technologies and mechanics make sense--sometimes it's hard to divide up the technology (like computer screen--is that one thing? or many different things for all the different types of things you can present on it?)"
- In EL's pane, 10:47: "great--maybe coding frameworks are technologies too? like mediapipe for instance which allows pose-based input through webcam . . . I'd say this is a technology, and then you think of specific motion-to-result relations/dynamics as mechanics?"

## Panes

All six started in `/Users/marlonkuzmick/Development/mk-27/apps/the-notebook/apps/ll-weeks/ll-week-11` on `FAS-DDW32PXW5L`.

| ID | Pane | Provider | Thread | Owns | First steps / status |
| --- | --- | --- | --- | --- | --- |
| EL | lead: reader, board, format, index, review, commits | Claude Opus 5.5, high | `5d007b0d-9507-46b8-9517-79b86acafcb8` | this board, `_content/mechanics/{format,README}.md`, `nextjs/package.json`, `nextjs/app/{layout,page}.jsx`, `nextjs/app/components/`, `nextjs/next.config.mjs` | (1) reader on :3111 (09:28) and this board; (2) the format fixed, 09:31; (3) Marlon's first question, the six studies |
| EG | game mechanics and the games table | Claude Opus 5.5, high | `10549f6d-2ac5-41cc-9ae5-5682cc105485` | `mechanics.csv`, `_build/` (except `ll.mjs`), `new/`, `gm/`, `games.csv`, `games/` | (1) ENGL 189VG audit to `_build/engl189vg-audit.md`, counts to EL; (2) Definition, examples and the six parts through `_build/`, `InOurGame` yes rows first, then Marlon's 07:42 concepts; (3) `games.csv` and `games/`: game-state's seven, the 189VG games, Paperclips, the week's game |
| ES | studies for class | Claude Opus 5.5, high | `857ec322-4c83-4631-baa8-f671208874c6` | `studies/`, `nextjs/app/mechanics/studies/` | (1) read the brief, intake, the game engine, tomorrow's TDM activities; (2) six proposed mechanics to EL by 09:42; (3) study 01 while EL takes the list to Marlon |
| EM | LL mechanics and technologies | Claude Opus 5.5, high | `c24dcd2b-601e-4484-9fad-1a19b127dcd4` | `ll/`, `ll-mechanics.csv`, `technologies.csv`, `technologies/`, `_build/ll.mjs` | **09:50:** 18 LL mechanics, 17 technologies written; paused for Marlon's order, writing its handoff. (1) read the three intakes, earlier week folders, `NB/_context/resources`, the two HackMD LL reports, the NFC note; (2) `ll/candidates.md` by about 09:57, 20 to 30 LL mechanics and 10 to 15 technologies, one line each with file and date; (3) the five named entries and `technologies.csv` in the format |
| EF | the LLUFs' deep dives | Claude Opus 5.5, high | `d438c4b6-e381-44c0-a8c6-31a2638ecdd6` | `deep-dives/` | (1) read the brief's list, the LLUF studio mechanics prompt, `activities/llufs`; (2) `deep-dives/README.md` (prompt) and `template.md` in the format; (3) `pick-list.md` from the day docs, intakes, `activities/llufs`, `/proto`. Usable prompt and template by about 11:30. **09:31:** prompt, template, pick list, intake options and an 11x17 PDF (4 pages, not opened) done; template moving to the format's headings |
| ED | dictation | Codex | `01a1e9e7-3566-78d0-a8f8-831b991853f7` | `_dictation/` | Stopped at a Codex permission prompt until Marlon approved it; **10:30:** record-thread succeeded, reading the intake, ready for dictation |

## Checkpoints

Times are each `ll-week-11` commit's own time, from git.

| time | ll-week-11 | Notebook pointer | what |
| --- | --- | --- | --- |
| 09:30 | `3ec0116` | `619dd85` | this board started; the entry format v1.0 fixed. Reader up on :3111 |
| 09:31 | `c80ec16` | `8bbe57e` | format v1.1 (EM's seven LL mechanic families and seven technology categories, `Tested`, deep dives in `deep-dives/entries/`); EF's deep-dive prompt (`README.md`), `template.md`, `pick-list.md`, `how-it-comes-in.md`, a labeled example; EM's `ll/candidates.md` (32 LL mechanics, 15 technologies); EG's `_build/engl189vg-audit.md` (20 mechanics named: 5 have, 5 partly, 12 new rows proposed; 8 games). No personal names found |
| 09:33 | `ddceca7` | `11561e7` | format v1.2 (deep-dive folders); EF's template on the format's headings, the worked example moved to `examples/hand-tracking.md` (Claude's, labeled), `as-written/`; PDF reprinted (4 pages, not opened) |
| 09:34 | `6c42c0d` | (with the next) | EF's template frontmatter in the format; example subject on EM's id `webcam-hand-tracking` |
| 09:35 | `b8f2129` | (with the next) | ES's study 01, the move updates state (`studies/01-the-move-updates-state/`, `/mechanics/studies/the-move-updates-state` and `/print`, all 200); format v1.3 (study folders) |
| 09:35 | `73baea7` | (with the next) | EF's pick list, ids checked against EM's and EG's |
| 09:37 | `6bf24bf` | `bf04d08` | EM's first five LL mechanics, all `draft`: `overhead-view` (17 sources, 2 proposals), `green-paper-key` (11, 2), `cards` (11, 1), `place-setting-map` (10, 3), `concept-map` (9, 2); candidates to 40 LL mechanics and 17 technologies. EL's check (headings, keys, citations, proposal counts, style) passes on all five, study 01 and EF's example; two of EM's quotations checked against their sources |
| 09:38 | `4300a29` | (with the next) | ES's study 02, asymmetric information (`/mechanics/studies/asymmetric-information` and `/print`, 200; EL's check passes); EF's pick list links EM's five |
| 09:39 | `ded5973` | `a7703e2` | EG batch 1, generated by `_build/build.mjs`: `mechanics.csv` 122 rows (105 + 12 from the ENGL 189VG audit + 5 from Marlon's 07:42 concepts), `gm/` 50 pages (new), `new/` 72, `games.csv` and `games/` 42; the 27 `InOurGame` yes mechanics have a definition, two to four examples and Why to / Home game proposals (81 blocks). Examples checked against an opened page or file: 2 mechanics fully, 25 partly (`examples_checked`), EG's web checks running. EL's check: all 164 pages have the six parts, keys and matching proposal counts; listed readings that the body never cites are allowed. Format v1.4 (`ExamplesChecked`) |
| 09:42 | `3d40929` | (with the next) | EG batch 2: Marlon's 07:42 concepts as rows (`the-tap`, `rebalancing-on-the-fly`, `turn-time`, `discrete-and-continuous-space`, `nested-loops`, and GM's `asymmetric-information`) with his Nov 15 and 16 words as the Why to (EL checked the two `the-tap` quotations in the Nov 16 afternoon intake); the 12 ENGL 189VG rows defined, with a Why to from the 189VG record; 45 of 122 mechanics defined; `games.csv` 74 rows (the 17 prototypes as `LL-made`). Rules vs mechanics stays in the glossary and handout, not a row |
| 09:42 | `9ede1e5` | (with the next) | ES's study 03, growth and upkeep (`/mechanics/studies/growth-and-upkeep` and `/print`, 200); study 01 now names EG's `the-tap` as its entry. EM's `_build/ll.mjs` (`--check` passes: 6 LL mechanics, 8 technologies, no id clash with `mechanics.csv`), `ll-mechanics.csv`, `technologies.csv` and eight technologies (`nfc-tags`, `overhead-camera`, `green-screen`, `green-paper`, `phones`, `studio-screen`, `game-controllers`, `ipads`; 7 proposals; Tested yes for five). `ll-mechanics.csv` already holds `overhead-stations`, whose page lands with EM's next. EF's pick list links them |
| 09:44 | `4570e0a` | (with the next) | EM batch 4: `ll/overhead-stations` (the four overhead cameras; ASTRON 98 tonight, to be updated from its record), technologies `atem-switcher`, `paper-11x17`, `printed-cards`; 6 LL mechanics, 11 technologies, both checks pass. Without Marlon's pick, EM writes what tomorrow's class and the Stafford game use next |
| 09:45 | `5f5f10b` | (with the next) | ES's study 04, prices that move (entry `rebalancing-on-the-fly`; `/mechanics/studies/prices-that-move` and `/print`, 200; check passes) |
| 09:46 | `1063a16` | (with the next) | EM batch 5, the class's and the Stafford game's LL mechanics: `tap-to-move` (the LL practice, an NFC card and a phone; EG's game mechanic `the-tap` to be linked), `private-screen`, `photograph-the-state`, `shared-readout`; 10 LL mechanics, 11 technologies, both checks pass |
| 09:46 | `9bbb7ff` | (with the next) | EG batch 3: all 124 mechanics have a definition (the last 77 with examples, Why to *Not written yet*); `the-move-updates-state` and `growth-and-upkeep` added for ES's studies; `games.csv` 112 (6 corrections, 38 new); the 45 batch 1 web checks applied (34 confirmed, 11 reworded to what the pages say). `examples_checked`: 48 yes, 26 partly, 42 no; EG's second web check running. All 236 generated pages pass EL's check |
| 09:47 | `2cd6331` | (with the next) | EL: `_content/mechanics/README.md` rewritten as the index of the whole reference (what is here, counts at `9bbb7ff`, folders, the four CSVs, rebuilding), HI's Nov 14 account kept below it |
| 09:48 | `2d9aaa3` | (with the next) | EM batch 6: `ll/story-board` (Marlon's "core mechanics of storytelling") and `ll/station-rotation`; 12 LL mechanics. EG: `RelatedTechnologies` on 22 mechanics from EM's ids (`the-tap`, `asymmetric-information`, `input-device`, maps and others); `InTheLL` for chess (the Nov 16 board-vision test) and Monopoly (the live-rents prototype). `technologies.csv` already lists EM's next six technologies, whose pages land with EM's next batch |
| 09:48 | `39568cf` | `1062d4f` | EM batch 7: technologies `whiteboards`, `nfc-reader-usb`, `midi-controller`, `lipstick-cams`, `fiducial-markers`, `microphones`; all 17 candidate technologies written (Tested No: green paper, game controllers, iPads, the USB NFC reader, lipstick cams, fiducial markers); the Nov 11 stage window corrected to "built, use in class unconfirmed" (week 10 wrap-up). EF's pick list links them. 12 LL mechanics, 17 technologies, both checks pass |
| 09:49 | `477d680` | (with the next) | ES's study 05, coupling and cascade (entry `cascade-failure`; `/mechanics/studies/coupling-and-cascade` and `/print`, 200; check passes); all five print sheets reprinted at one 11x17 page each |
| 09:50 | `b6b8740` | (with the next) | EM batch 8: `paper-prototype`, `draw-a-box`, `capture-to-live`, `cue-to-stage`, `booth-game-show`, `analog-in-model-out`; 18 LL mechanics, 17 technologies, both checks pass. EM pauses for Marlon's order of the 22 candidates left |
| 09:51 | `3abda30` | `f23df20` (also EM's `positions/EM.md`) | EM: `tap-to-move`, `nfc-tags` and `phones` link EG's `the-tap`; `private-screen` links `asymmetric-information`. Both checks pass |
| 09:53 | `6e45943` | (with the next) | ES's study 06, nested loops (`/mechanics/studies/nested-loops` and `/print`, 200): all six studies in, all checks pass; ES's final pass, 12 pages 200, every 11x17 sheet one page |
| 09:54 | `2ed6c0f` | `7889257` | EG's web checks applied: the 116 mechanics with examples have every example cited (`examples_checked: yes`; 170 claims checked, 0 wrong, 44 reworded to what the pages say, none dropped); 8 AI-proposal rows say no published game was found; all 112 games cite a page (9 year or designer fixes). Also `2da3b7d`, the index counts at 09:53 |
| 09:54 | `0f43651` | `34e5970` (also ES's `positions/ES.md`) | ES: studies 01 and 03 name EG's new entries `the-move-updates-state` and `growth-and-upkeep` |
| 10:33 | `4a86e61` | (with the next) | EL: [overview.html](overview.html), every pane's work on one page, generated from the files by `overview.py` (Marlon asked for it, opened in Chrome); all 49 reader links answered 200 |
| 10:41 | `10f019d` | (with the next) | EF, for today's LLUFs (Marlon's ask, about 10:37): `deep-dives/20261117-technology-lab.md` (the frame: discover the mechanics a technology allows, then an LL workshop game and a hybrid tabletop/digital game, at least one try at the Stafford AI 4X; timing as a proposal) and `deep-dives/lab-nfc.md` (the NFC group's kit, 12 tries, Stafford pointers) |
| 10:42 | `0d4beb2` | `eeeb926` | EF: `lab-nfc.md` uses EG's 16 game mechanics a tap makes possible |
| 10:48 | `1d02cfc` | (with the next) | Format v1.5: software frameworks and models are technologies (Marlon, 10:47), category Software and models |
| 10:51 | `97b8dff` | (with the next) | EM: `technologies/mediapipe` (Tested yes: face paint Sept 25 to 29, the Oct 22 hackathon, the fellows Nov 10, TDM 155AI Nov 11) and `technologies/webcam`; five software candidates for Marlon (speech-to-text, image models, OpenCV, Web NFC, Web Audio); 19 technologies. EF's example (`ff36e76`, `608225a`) now has MediaPipe as its subject |
| 10:52 | `b2644e6` | `17be20b` | EG: four motion-to-result mechanics, `pose-as-the-move`, `body-as-cursor`, `held-position-claims`, `threshold-gesture` (children of `gesture-input`, linked to MediaPipe); web check dropped Ring Fit and corrected Hole in the Wall. 128 mechanics, 120 with every example cited, 117 games |

## Decisions between panes

- **09:29, `/mechanics` stays the index.** It renders `_content/mechanics/README.md` through the catch-all route; ES builds under `nextjs/app/mechanics/studies/` so nothing shadows it.
- **09:29, paths that are linked never move.** `new/` keeps HI's 55 pages (the bibliography links to them); GM's 50 get pages in `gm/`. Game mechanics keep `kind: mechanic`, which the reader and the card graph look for.
- **09:31, the format, v1.0** ([format.md](../../../_content/mechanics/format.md)). Changes from MZ's proposal: the six parts are fixed `##` headings plus a `## Sources` section with numbered citations; Home game version has two fixed subsections (In a regular classroom, Digitally); LL mechanics get their own file, `ll-mechanics.csv`, with the same core columns as `mechanics.csv` and a `Kind` column, so the mechanics table loads as one; `proposals:` counts open proposal blocks; status values `draft`, `reviewed`, `approved`, `card`, `not-adopted`; `_build/ll.mjs` is EM's, the rest of `_build/` EG's.

- **09:33, format v1.1.** EM's families and categories fixed; `Tested` (Yes/No) on technologies; `_build/ll.mjs` and `ll-mechanics.csv` are EM's. EG's ENGL 189VG story, structure and space rows stay in "Story, characters, and progress" for now.
- **09:33, format v1.2: deep dives in `deep-dives/<entry-id>.md`** (EF's layout, replacing 1.1's `entries/`): the fellow's words unchanged in `as-written/`, laid into the format's headings in the page, an optional `## Stills`; EF's template uses the format's headings with plain questions in italics.
- **09:35, format v1.3: a study is a folder,** `studies/NN-<id>/README.md` (ES's layout, as in the mk-*-studies repos), with the six parts and its own sections after Related; its page at `/mechanics/studies/<id>` and `/print`. The study's mechanic `the-move-updates-state` has no row yet: EG adds it.
- **09:37, a proposal line may name what is chosen** after the bold (EM's usage).
- **09:44, no duplicate entries across tables.** EG's game mechanic `the-tap` covers tapping a tag to move; EM's LL mechanic links to it instead of writing a second `tap-to-move`, unless the LL practice (the tags on the table, the phones) differs, in which case it is named for the practice.
- **Handoffs submitted once.** The helper takes one complete handoff per pane: EG's says 36 priority rows where the right count is 35, with 89 rows lacking a why-to (corrected in `positions/EG.md`); ES's lists study 06 as uncommitted and `growth-and-upkeep` as without an entry, both since done (corrected in `ES/handoff.draft.json` beside it). The positions files are the current account.
- **10:47, format v1.5: software is technology.** From Marlon's words: a framework, library or model (MediaPipe, Web NFC, an image model) is a technology, category Software and models; the motion-to-result relation it allows is a mechanic. MDA's term for how those relations play out over time is dynamics ("the run-time behavior of the mechanics acting on player inputs and each others outputs over time", Hunicke, LeBlanc and Zubek 2004, in the bibliography).

## Waits on Marlon

Questions go to him one at a time, each with EL's recommendation.

1. ~~Which mechanics get a study for tomorrow's class.~~ **Answered** (10:09, via MZ): "go ahead and do all six for a start".
2. How the LLUFs' deep dives are credited: by name, by initials, or unsigned (the deck's rule so far is no names). EF's three options; EL recommends initials with an opt-out to unsigned. **Asked 10:09.**
3. Which LL mechanics and technologies to write first beyond the five he named (EM's [candidates](../../../_content/mechanics/ll/candidates.md): which of 7 to 32 to keep and their order; whether four overhead cameras folds into the overhead view; whether green paper and the green screen are one mechanic on two technologies). Not yet asked.
4. How the LLUFs' deep dives come in (EF's `how-it-comes-in.md`): A, a HackMD note per fellow (EF's recommendation; Marlon creates them); B, a Slack thread (Marlon posts); C, a file in `deep-dives/entries/` or dictation through ED. Not yet asked.
5. Whether the studies stay in `ll-week-11` or become a standing repo after the mk-*-studies pattern (ES suggests `mk-mechanics-studies`; a new repo is his call). EL's recommendation: stay here this week, decide after Wednesday's class. Not yet asked.
6. ~~ED's Codex permission prompt.~~ Approved; ED ready by 10:30.
7. Today's technology lab: which technologies the other groups take, how technologies are split (EL recommends one per device, uses as mechanics, which Schell's tetrad supports), whether every group gets the same two prompts, and the timing (EF: 75 min, 90 min, or two sittings). Asked about 10:40; Marlon stopped the question to clarify. Staff to confirm the NFC card count and whether phones can reach this laptop's address.
