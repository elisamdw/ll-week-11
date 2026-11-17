---
title: "The entry format"
description: "How every entry in the mechanics reference is written: the six parts, the frontmatter, the three tables and their fields, the folder for each kind, and how a proposal for Marlon is marked."
order: 26
kind: index
author: "EL (Claude Code 5d007b0d-9507-46b8-9517-79b86acafcb8, started in ll-week-11 on FAS-DDW32PXW5L)"
date: 2026-11-17
version: "1.5, 2026-11-17 10:47 EST (1.0 fixed 09:31)"
status: fixed
---

# The entry format

**Version 1.5, Tuesday, November 17, 2026, 10:47 EST** (1.5 counts software frameworks and models as technologies; 1.4 adds `ExamplesChecked`; 1.3 gives each study its own folder; 1.0 was fixed at 09:31; 1.1, at 09:33, added the LL mechanic families, the technology categories and the `Tested` column; 1.2 sets the deep dives' folders to EF's layout). From MZ's proposal in the workspace's shared brief and HI's Nov 14 inventory ([README](README.md)). It changes after this only through EL, who tells every pane; changes are listed at the foot.

A game mechanic, an LL mechanic, a technology and a game are written the same way, so they sit in one reference and can be compared. Each is **one Markdown page and one row in a table**, linked to the others by id.

Marlon, November 17, 2026, about 08:12, to MZ: "ll mechanics and technologies thought of the same way . . . with definitions/descriptions/how-tos and WHY to's = what you'd do with it in a teaching or presenting context, and then how you'd create home game versions of them".

## The kinds and where they live

| Kind (`kind:`) | Pages | Table | Source of truth | Owner |
| --- | --- | --- | --- | --- |
| `mechanic` (a game mechanic) | `new/` (HI's 55, Nov 14; paths fixed, other files link to them) and `gm/` (GM's 50) | `mechanics.csv` | `_build/*.json` and GM's card files (read-only), through `_build/build.mjs` | EG |
| `ll-mechanic` (something the LL does often) | `ll/` | `ll-mechanics.csv` | the pages, through `_build/ll.mjs` | EM |
| `technology` (a thing the LL uses to do it) | `technologies/` | `technologies.csv` | the pages, through `_build/ll.mjs` | EM |
| `game` | `games/` | `games.csv` | `_build/*.json`, through `_build/build.mjs` | EG |
| `study` (a mechanic illustrated for class) | `studies/NN-<id>/README.md` | none | the pages | ES |
| `deep-dive` (an LLUF's account of one they tried) | `deep-dives/` (the fellow's own words in `deep-dives/as-written/`; EF's example in `deep-dives/examples/`) | none for now | the pages | EF |
| dictation | `_dictation/` | none | ED's transcripts | ED |

Game mechanics keep `kind: mechanic`, because the reader's prototype and activity pages and the card graph look for that value. Generated files are never edited by hand: change the source and rebuild. A page's path never changes once anything links to it.

**Mechanic or technology?** A mechanic is a thing you do (looking down at work on a table, a map the size of a place setting); a technology is a thing you do it with (a camera on the truss, 11x17 paper). Marlon, Nov 17, 07:13 (the voice agent's record): "11×17 paper is the technology, and the mechanic could be sort of the map, the table". When a name could be either, write both and link them.

**Software is technology too.** Marlon, Nov 17, 10:47, in EL's pane: "maybe coding frameworks are technologies too? like mediapipe for instance which allows pose-based input through webcam . . . I'd say this is a technology, and then you think of specific motion-to-result relations/dynamics as mechanics?" So a framework, library or model (MediaPipe, Web NFC, an image model) is a technology entry like a camera or a card, in the category **Software and models**, and the specific relation it makes possible (raise a hand to vote, lean to steer, a pose that triggers an image) is a mechanic. A technology that needs another names it in Related (MediaPipe hand tracking needs a webcam). This follows Schell's tetrad, where technology is whatever medium makes the game possible.

## Ids

An entry's id is its file name without `.md`: lowercase letters, digits and hyphens, at most 48 characters (`overhead-camera`, `treacherous-turn`). It never changes once something links to it. Ids are unique within a table; the mechanics table spans `mechanics.csv` and `ll-mechanics.csv`, so an LL mechanic's id must not match a game mechanic's (check `MechanicId` in `mechanics.csv` before naming one). A technology and a mechanic may share a word but not an id; prefer distinct names (`overhead-view` the mechanic, `overhead-camera` the technology).

## The frontmatter

```yaml
---
title: "The overhead view"
description: "A camera looks straight down at a table so everyone in the room, or online, sees the hands and the paper."
id: overhead-view
kind: ll-mechanic
family: "Seeing the work"
status: draft
author: "EM (Claude Code c24dcd2b-601e-4484-9fad-1a19b127dcd4, started in ll-week-11 on FAS-DDW32PXW5L), Nov 17, 2026"
sources:
  - "NB/_context/projects/50-in-focus/ll-weeks/fall-2026/11-ending-20261120/marlon/20261117-morning-mechanics-entries-nfc-and-the-color-agents.md (voice agent's record, 07:13)"
  - "https://example.org/a-page-you-opened"
mechanics: [map-on-the-table]
technologies: [overhead-camera]
games: []
proposals: 1
---
```

| Key | Required | What it holds |
| --- | --- | --- |
| `title` | yes | The entry's name, as the reader shows it. |
| `description` | yes | The definition, or its first sentence. |
| `id` | yes | As above; equal to the file name. |
| `kind` | yes | `mechanic`, `ll-mechanic`, `technology`, `game`, `study`, `deep-dive`. |
| `family` | yes for mechanics and LL mechanics; `category` for technologies; `form` for games | Game mechanics use the ten families in the [README](README.md). LL mechanics and technologies use the lists under "Families and categories" below. |
| `status` | yes | `draft` (a pane wrote it), `reviewed` (EL checked it against this format), `approved` (Marlon said yes; his words on the board), `card` (GM's printed card, wording unchanged), `not-adopted`. |
| `author` | yes | Pane ID, provider and thread, start directory and machine, date. Deep dives: see "Deep dives" below. |
| `sources` | yes | Every file, page or bibliography id the entry's claims come from, one per item, in the order the body cites them. Files as paths (`NB/` for The Notebook root, otherwise relative to this repo); web pages as the URL you opened; readings as their id in `_content/bibliography/`. |
| `mechanics`, `technologies`, `games` | yes (may be empty) | Related entries, by id, in each table. The same lists as the `## Related` section. |
| `proposals` | yes | How many "Proposed, for Marlon to choose" blocks the page holds. 0 when none. |
| `order` | no | Sort order in the reader. |

Generated game mechanic pages keep HI's extra keys (`number`, `readings`, `in_our_game`, `source`) and EG's `examples_checked`. `sources` may be written as a block list or an inline array.

## Families and categories

**Game mechanics:** the ten families in the [README](README.md). The ENGL 189VG additions (story, structure and space) go in "Story, characters, and progress" for now; a split into a separate family is a later decision.

**LL mechanics** (`family:`), from EM's proposal, 09:31: Seeing the work · Layering and keying · Paper on the table · Arranging the room · Shared and private screens · Taking apart and remaking · Analog in, model out.

**Technologies** (`category:`), from EM's proposal: Cameras · Keying · Paper and print · Tags and readers · Screens · Controllers · Audio · Software and models (added in 1.5).

A new family or category goes through EL.

## The six parts

The body is the title as `#`, then six `##` sections in this order, with these headings exactly, then `## Sources`. A part not written yet stays, with the line *Not written yet.*, so counts are honest.

```markdown
# The overhead view

## Definition
## Description
## How to
## Why to
## Home game version
### In a regular classroom
### Digitally
## Related
## Sources
```

1. **Definition.** One or two sentences. Encyclopedia level: what it is, not why the LL likes it.
2. **Description.** What it is and how it works, with examples. For a game mechanic, two or three games and what the mechanic does in each. For an LL mechanic, sessions where the LL used it (course or event and date, from the record; no student names). For a technology, what it is and what the LL has (how many, where), from the record. For a game, what it is, who made it, when, and the mechanics it is known for.
3. **How to.** How to do it. A game mechanic: in a game, on paper or in code. An LL mechanic: in the studio, step by step. A technology: the setup and what it needs. A game: how to get it and play it in a session.
4. **Why to.** What you would do with it in a teaching or presenting context. This is the LL layer: each claim comes from the LL's record (cited), from Marlon (quoted), or it is a proposal (below). Never an unsourced why.
5. **Home game version.** How to do it outside the LL, in two subsections: **In a regular classroom** (physically, with what a classroom has) and **Digitally** (online or on a laptop).
6. **Related.** One bullet per linked entry, by relative link, with its kind and one clause on how it relates: `- [The overhead camera](../technologies/overhead-camera.md) (technology): what the view is made with.`

**Sources** lists the frontmatter's `sources` as a numbered list in the same order. In the body, cite with the number in square brackets after the sentence it supports: `... used for the Astro course's explainer videos [2].` Every factual sentence has a citation; a sentence that cites nothing is your own and says so ("We suggest ...") or sits inside a proposal.

## Marlon's words, findings and proposals

Keep three things apart and label each.

- **Marlon's words**, quoted, dated, sourced, as a blockquote or inline quotation: `Marlon, Nov 16, 13:23 (typed, Slack #mk-work-in-progress): "..."`. The voice agent's posts are its record of him, not a transcript: write `(voice agent's record)`. What he says to a pane goes through EL and the board, verbatim.
- **Findings**, from files and pages you opened, cited by number.
- **Proposals.** Where the record says nothing (most often in Why to and Home game version), do not assert. Write this line, exactly, and two or three options under it:

```markdown
**Proposed, for Marlon to choose:**

1. ...
2. ...
3. ...
```

The line may go on, after the bold, to say what is being chosen (`**Proposed, for Marlon to choose:** what green paper is for in a class.`). Count the blocks in `proposals:`. When Marlon chooses, EL records his words on the board; the owner replaces the block with his choice, quoted and dated, and lowers the count.

## The tables

Three tables, kept as CSV files at the top of `_content/mechanics/`. The mechanics table is two files with the same core columns, `mechanics.csv` (game mechanics) and `ll-mechanics.csv` (LL mechanics), told apart by `Kind`, so they load as one table. Field names are PascalCase and legal JavaScript identifiers, as in the LL's Airtable bases. Files are UTF-8, the header row is the field names, every value is quoted, a list is ids separated by `; `, and long text may hold Markdown. Each part's column holds that section of the page in full. **This workspace writes nothing to Airtable** (AT, in "Nov 17 · Air utilities", reads this repo).

Proposed Airtable tables: `Mechanics` (HI proposed `GameMechanics` on Nov 14, before LL mechanics; the `Kind` field holds both), `Technologies`, `Games`.

### Core columns, in every table

| Field | Airtable type | What it holds |
| --- | --- | --- |
| `MechanicId` / `TechnologyId` / `GameId` | Single line text (primary) | The id. |
| `Name` | Single line text | The title. |
| `Definition` | Long text | Part 1. |
| `Description` | Long text | Part 2. |
| `HowTo` | Long text | Part 3. |
| `WhyTo` | Long text | Part 4, proposals included as written. |
| `HomeGameClassroom` | Long text | Part 5, in a regular classroom. |
| `HomeGameDigital` | Long text | Part 5, digitally. |
| `RelatedMechanics` | Linked records → Mechanics (text for now) | Ids, `; `. |
| `RelatedTechnologies` | Linked records → Technologies (text for now) | Ids, `; `. |
| `RelatedGames` | Linked records → Games (text for now) | Ids, `; `. |
| `Sources` | Long text | The `sources` list, `; `. |
| `Proposals` | Number | Open proposal blocks. |
| `Status` | Single select | `Draft`, `Reviewed`, `Approved`, `Card`, `Not adopted`. |
| `Author` | Single line text | As in the frontmatter. |
| `Page` | URL (text for now) | The page's path in this repo, e.g. `_content/mechanics/ll/overhead-view.md`. |

### Mechanics (`mechanics.csv`, `ll-mechanics.csv`)

The core, plus `Kind` (single select: `Game`, `LL`) and `Family` (single select). Game mechanic rows keep HI's Nov 14 fields as they are: `Number`, `OneLine`, `ShowsIt`, `TryIt`, `BuildIt`, `Readings`, `AiAngle`, `InOurGame`, `Source`; and EG's `ExamplesChecked` (`yes`, `partly (n of m)`, or empty: how many of the Description's game examples were checked against a page or file opened; the page carries it as `examples_checked:`). LL mechanic rows leave those empty.

### Technologies (`technologies.csv`)

The core, plus `Category` (single select, the eight above), `Tested` (single select: `Yes`, `No`: whether the LL has tried it this term, from the record), `TheLLHas` (long text: what the LL owns, how many and where, from the record, or empty), `Cost` (long text: a price you found, with its source, or empty).

### Games (`games.csv`)

The core, plus `Year` (number), `Designer` (single line text), `Form` (single select: `Board`, `Card`, `Video`, `Tabletop role-playing`, `Party`, `Classroom`, `LL-made`), `WhereToGet` (URL or text), `InTheLL` (long text: course or event and date where the LL used it, from the record, no student names).

### How rows link

By id, in the three `Related…` columns, which match the page's `mechanics`, `technologies` and `games` lists. A link points one way when written; whoever builds a table may add the reverse link in its own rows and pages, never in another pane's.

## Studies

A study (`studies/NN-<mechanic-id>/README.md`, one folder per study as in the mk-*-studies repos, its illustrations beside it; `kind: study`) illustrates one mechanic for TDM 155AI on Nov 18. It names its entry in `mechanic: <id>` and links to it. It uses the six parts and Sources, and may add its own sections after Related (the illustration, a two-minute version at a table, a remix prompt). Its frontmatter has `title`, `description`, `id`, `kind`, `study` (its number), `mechanic`, `route`, `status`, `author`, `sources`, `mechanics`, `technologies`, `games`, `proposals`. Its playable page is at `/mechanics/studies/<id>`, with an 11x17 sheet at `/mechanics/studies/<id>/print` (`nextjs/app/mechanics/studies/`, ES's).

## Deep dives

An LLUF's deep dive (`deep-dives/<entry-id>.md`, or `<entry-id>-2.md` for a second, `kind: deep-dive`) is the six parts for one mechanic or technology the fellow has tried, with `subject: <table>/<id>` (`ll-mechanics/overhead-view`, `technologies/overhead-camera`, `mechanics/core-loop`) and one more section, `## What we tried`, between Description and How to. EF's prompt and template follow this: the template may put a plain question in italics under each heading, but the headings are the format's, so a deep dive can be read beside the entry it is about. A `## Stills` section may sit between Related and Sources. The fellow's words come in unchanged to `deep-dives/as-written/<entry-id>.md` and are laid into the headings in `deep-dives/<entry-id>.md`, moved and not rewritten, with anything added marked `[EF: ...]` ([how it comes in](deep-dives/how-it-comes-in.md)). Photos stay in the gitignored `_raw/mechanics/deep-dives/<entry-id>/` until Marlon decides where stills live. **Credit:** until Marlon decides (EL is asking him), `author: "LLUF"`, and no fellow is named anywhere in a deep dive.

## Rules that apply to every page

- "The Learning Lab" or "the LL", never "the Lab" (names that contain the word keep it).
- No student names or student work. Fellows unnamed until Marlon decides on credit. Staff only as the record names them, and only where it matters.
- The HackMD export in The Notebook is unreviewed: quote short passages with the file name, never copy whole files, carry no student names.
- No "genuinely", "really", "actually", "truly", "honestly", "earns its keep". No hard-wrapped lines.
- Run `date` before stamping a time.
- When a page is ready, tell EL in three lines: the paths, the count, what waits on Marlon.

## Changes

- 1.0, 09:31: fixed.
- 1.1, 09:33: the LL mechanic families and technology categories (EM's proposal); `Tested` on technologies; 189VG additions stay in Story, characters, and progress.
- 1.2, 09:33: deep dives in `deep-dives/<entry-id>.md`, the fellow's words in `deep-dives/as-written/`, an optional `## Stills` section (EF's layout; 1.1 had said `deep-dives/entries/`).
- 1.3, 09:35: a study is a folder, `studies/NN-<id>/README.md`, with the six parts and its own sections after Related (ES's layout).
- 1.4, 09:39: `ExamplesChecked` / `examples_checked` on game mechanics (EG's); inline `sources` arrays allowed.
- 1.5, 10:47: software frameworks and models are technologies (Marlon's words); category Software and models.
