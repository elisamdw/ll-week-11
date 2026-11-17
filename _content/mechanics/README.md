---
title: "Mechanics: the week 11 reference"
description: "Game mechanics, the LL's own mechanics, the technologies it does them with, and games, each an entry with a definition, a description, a how-to, a why-to and a home game version; plus studies for class and the LLUFs' deep dives."
order: 25
kind: index
status: draft
author: "EL (Claude Code 5d007b0d-9507-46b8-9517-79b86acafcb8, started in ll-week-11 on FAS-DDW32PXW5L), Nov 17, 2026; the Nov 14 inventory below is HI's (Claude Code edf29cc8-f1a0-4b6a-a0a5-7a9ca74f4450)"
---

# Mechanics: the week 11 reference

Marlon, November 17, 2026, about 08:12, to MZ: "I want a few things: 1) an updated inventory of game mechanics with definitions and examples built out from our video games course support, but we can also have technologies and games tables I'd say 2) LLUF-created deep dives on mechanics and technologies they've experimented with, 3) a few key mechanics with illustrations for my class--think mechanics-studies, 4) ll mechanics and technologies thought of the same way . . . with definitions/descriptions/how-tos and WHY to's = what you'd do with it in a teaching or presenting context, and then how you'd create home game versions of them"

Every entry is written the same way, in six parts (definition, description, how to, why to, home game version, related), as one Markdown page and one row in a table: **[the entry format](format.md)**. Why-tos and home game versions that the LL's record does not settle are written as options under "Proposed, for Marlon to choose"; nothing here is his decision unless it quotes him.

Written on November 17 in the workspace "Nov 17 · W11 mechanics" (EL, EG, ES, EM, EF, ED); its [board](../../_context/orchestration/20261117-mechanics/board.md) has the record. All entries are `draft` until EL has reviewed them and Marlon has chosen.

## What is here

Counts at 09:53 EST, Nov 17 (commit `6e45943`).

| Kind | Where | Table | Entries | Why to written | Open proposals |
| --- | --- | --- | --- | --- | --- |
| Game mechanics | [`gm/`](gm/) (GM's 50 cards, Nov 13) and [`new/`](new/) (the rest) | `mechanics.csv` | 124 (50 `Card`, 73 `Draft`, 1 `Not adopted`) | 47 | 105 |
| LL mechanics | [`ll/`](ll/) | `ll-mechanics.csv` | 18 | 18 | in each page |
| Technologies | [`technologies/`](technologies/) | `technologies.csv` | 17 | 17 | in each page |
| Games | [`games/`](games/) | `games.csv` | 112 (52 video, 20 board, 7 card, 9 party, 1 tabletop role-playing, 2 classroom, 21 LL-made, the 17 prototypes among them) | not yet | 0 |
| Studies for TDM 155AI, Nov 18 | [`studies/`](studies/README.md), playable at [/mechanics/studies](/mechanics/studies) | none | 6 of 6 | | in each page |
| The LLUFs' deep dives | [`deep-dives/`](deep-dives/README.md): the prompt, [template](deep-dives/template.md), [pick list](deep-dives/pick-list.md), [how one comes in](deep-dives/how-it-comes-in.md), a labeled example | none | 0 (the fellows write this afternoon) | | |
| Marlon's dictation | `_dictation/` | none | | | |

Every game mechanic has a definition. The 27 already in the week's game, Marlon's Nov 17 concepts and the twelve rows from the ENGL 189VG course support have examples and a why-to; the rest have examples, with the why-to *Not written yet*. Every game example is cited to a page or file opened (EG's web checks, Nov 17: 170 claims, 44 reworded to match their pages); eight rows proposed for the AI game say no published game was found.

**Game mechanic families** (`mechanics.csv`): Goals and the loop 11 · Time 11 · Chance and information 9 · Players together 14 · Resources and economy 13 · Space and the body 12 · Rules that bend 8 · Story, characters, and progress 19 · The AI as a system 14 · Designing and remixing 13.

**LL mechanic families:** Seeing the work · Layering and keying · Paper on the table · Arranging the room · Shared and private screens · Taking apart and remaking · Analog in, model out. **Technology categories:** Cameras · Keying · Paper and print · Tags and readers · Screens · Controllers · Audio. EM's [candidates](ll/candidates.md) list the LL mechanics and technologies not yet written, each with the file and date it comes from.

## The tables

Four CSV files, three tables: `mechanics.csv` and `ll-mechanics.csv` share their core columns and a `Kind` column, so they load as one `Mechanics` table; `technologies.csv`; `games.csv`. Field names are PascalCase; rows link by id. The fields are in [the format](format.md#the-tables). The reader app does not serve CSV files; open them in the repo. Nothing has been written to Airtable.

## Rebuilding

Generated files are never edited by hand. From the repo root:

- `node _content/mechanics/_build/build.mjs`: `mechanics.csv`, `games.csv` and the pages in `gm/`, `new/` and `games/`, from `_build/*.json` and GM's card files in The Notebook (read, never edited). EG's.
- `node _content/mechanics/_build/ll.mjs` (and `--check`): `ll-mechanics.csv` and `technologies.csv`, from the pages in `ll/` and `technologies/`, which are written by hand. EM's.

## The Nov 14 inventory (HI's account)

HI wrote this on November 14 when the inventory was 105 game mechanics; it is kept as written, with its headings one level down. What changed on Nov 17 is in the table above: EG added 19 rows (124), a definition for every row, the six parts, `gm/` pages for GM's cards, and the core columns of the [format](format.md).

Marlon, November 14, 2026, 12:05: "I also want an inventory of game mechanics that we can put in an Airtable." Earlier the same day: "The goal is to create game mechanics that align well with the readings/ideas."

**The table is `_content/mechanics/mechanics.csv`** ([on GitHub](https://github.com/ll-26-27/ll-week-11/blob/main/_content/mechanics/mechanics.csv) once committed; the reader app doesn't serve CSV files), one row per mechanic, one column per Airtable field. Nothing has been written to Airtable: GL is bringing Marlon the question of which base it goes in.

### What's in it

| | Rows |
| --- | --- |
| GM's cards (Nov 13, `tdm155ai-week-11/game-mechanics/cards/`), wording unchanged, status `Card` | 50 |
| New mechanics from today's readings (TH) and the history of AI and games (HI), status `Draft` | 55 |
| **Total** | **105** |
| Already in the week 11 game (`InOurGame` starts with "yes") | 27 |
| Partly in the game | 15 |
| Not adopted (Marlon, Nov 14) | 1 |

By family: Goals and the loop 9 · Time 10 · Chance and information 9 · Players together 14 · Resources and economy 12 · Space and the body 6 · Rules that bend 8 · Story, characters, and progress 11 · **The AI as a system 14** · **Designing and remixing 12**. The last two families are new; the other eight are GM's. "Designing and remixing" was called "Rules about rules" until Marlon's point in the Nov 14 voice chat that "the design of the game is much, much more than the rules".

Each new mechanic also has its own page in [`new/`](new/) so the reader app shows it. GM's cards have their pages, print sheets and posters in `tdm155ai-week-11`.

### The fields

| Field | Proposed Airtable type | What it holds |
| --- | --- | --- |
| `MechanicId` | Single line text (primary) | A stable slug, e.g. `treacherous-turn`. GM's rows use their card's file name without the number. |
| `Number` | Number | GM's card number (1–50); new mechanics continue from 51. |
| `Name` | Single line text | The mechanic's name. |
| `Family` | Single select | One of the ten families above. |
| `OneLine` | Long text | What it is, in one sentence. |
| `ShowsIt` | Long text | A game or text that shows it. |
| `TryIt` | Long text | A two-minute version to play in the room. |
| `BuildIt` | Long text | How to build it (for GM's cards, in an LL app; for new ones, in the game's engine or as a remix students make through Claude Code). |
| `Readings` | Linked records → `Readings` (for now, text: bibliography ids separated by `; `) | The readings it comes from, as ids from TH's [`bibliography/`](../bibliography/README.md). |
| `AiAngle` | Long text | How the mechanic plays when AI is a character or a system. |
| `InOurGame` | Long text | Whether the week 11 game has it on Nov 14 (`yes`, `partly`, `no`) and in which version: *Data Center*, *The Committee*, *Normal Technology*, or *Blank*. |
| `Source` | Long text | GM's card number, or the pane and reading or history strand it came from. |
| `Status` | Single select | `Card` (GM's printed card), `Draft` (new, for Marlon's review), or `Not adopted` (Marlon decided against it). |

**Proposed table:** `GameMechanics`. Once a `Readings` table exists (one row per bibliography entry, keyed by the same ids), `Readings` becomes a linked-record field; until then it imports as text and can be converted in Airtable without losing the ids.

### Importing it

Airtable's CSV import takes the file as it is: the header row is the field names, every value is quoted, and the file is UTF-8. After import, set `Family` and `Status` to single select and `Number` to number. The push from the CLI, when Marlon picks a base, would be `node apps/ll-utilities/bin/ll-airtable.js` from The Notebook root (read its README first; not run).

### Rebuilding it

The CSV and the pages in `new/` are generated; don't edit them by hand.

- GM's wording comes straight from the card files in The Notebook (read, never edited).
- HI's additions to GM's cards (`AiAngle`, `InOurGame`, `Readings`) are in [`_build/gm-extras.json`](_build/gm-extras.json).
- The new mechanics are in [`_build/new-mechanics.json`](_build/new-mechanics.json).
- Reading keys map to bibliography ids in [`_build/readings.json`](_build/readings.json).

Then run `node _content/mechanics/_build/build.mjs` from the repo root. It prints counts and lists any reading id that has no file in `_content/bibliography/`.

### Provenance and caveats

- GM's 50 rows keep GM's words; `AiAngle`, `InOurGame` and `Readings` on those rows are HI's.
- The 55 new rows turn the "For the game" proposals collected in [`../game/design.md`](../game/design.md) into mechanics. They are proposals, not decisions. Proposals that were a setting or a classroom activity rather than a mechanic were left out.
- **After the voice chat (Nov 14, 14:47):** Marlon dropped the rule editor and the per-rule fields agents had proposed (`rhetoric` and the like); remixing happens through Claude Code and the repo. Rows that depended on the editor now describe a Claude Code remix instead, and the `rhetoric` row is `Not adopted`.
- `InOurGame` was read from the rulesets in `_content/game/_rulesets/` and the engine (`nextjs/lib/game-engine.mjs`) on November 14. It goes stale as GL builds.
- **Reading ids** follow TH's rule and list (confirmed by TH on Nov 14). Twelve ids that TH hadn't listed yet (Bogost's *Unit Operations*, *Play Anything* and "Gamification is Bullshit", Kurzweil, Amodei, Cegłowski, Crawford, Hogan, Starr, Suber's *Nomic*, McCarthy's "AI as Sport", and the FAR AI Go paper) were made by the same rule and sent to TH. The build lists any id that has no bibliography file yet.
