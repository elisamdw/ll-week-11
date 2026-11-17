---
title: "Print: from a set of cards to a PDF on disk"
author: "KP (Claude Code 5c6862b5-a047-40e9-a6ad-dbc70642a254, started in ll-week-11 on FAS-DDW32PXW5L)"
date: 2026-11-16
status: "KP's working record for the print pane. Not Marlon's words unless quoted."
---

# Print

Marlon, Nov 16, 07:3x, to MZ: "help me print it out". He prints on 11 x 17 and Letter, cuts the cards, and uses them on tables and walls. On Nov 15 he chose abbreviated print cards that match fuller digital text, and asked for no QR codes. The full how-to is in the Print section of [views.md](../../../_content/cards/views.md); this page is the short version and the record.

## The command

With KL's dev server up on 3111:

```
cd /Users/marlonkuzmick/Development/mk-27/apps/the-notebook/apps/ll-weeks/ll-week-11
node nextjs/app/cards/print/pdf.mjs --convolute stafford-game --form short --open
```

- What: `--set <name>`, `--convolute <slug>`, `--chain <slug>`, `--cards a,b,c`, `--card <slug>`, `--audience`/`--kind`/`--tag`/`--status`/`--voice <value>`, or `--all`.
- How: `--paper letter` (default 11 x 17), `--form short|index` (default full), `--name <label>`, `--open` (Preview).
- Out: `_media/print/<YYYYMMDD>-<name>-<paper>-<form>.pdf`, gitignored by `_media/print/.gitignore`.

## What it checks, in the PDF itself

`pdf-check.swift` (PDFKit, no dependencies) reads every page's media box and every character's box:

- page size: 11 x 17 in (792 x 1224 pt), or 8.5 x 11 for Letter;
- text from the paper's left and top edges, and from the cut line on the right column's side: 0.45 in (Letter 0.35), measured 0.44 to 0.45 on every run so far;
- nothing on the middle cut line;
- the PDF's page count equals the sheets the screen packed.

It exits 2 and names the problem when one fails. Ragged line ends measure 0.38 to 0.49 in from the right edge and the cut: those are PDFKit's glyph advance boxes, not text over the margin (looked at in the rendered pages).

## What changed in the print view (Nov 16)

Chrome's multi-column flow, printed, balanced the columns of each sheet and left white at the foot of many: the class-session convolute's four cards took two sheets with a card's worth of room left on the first. `Sheets.jsx` now measures each card in the browser and packs the sheets in reading order (left column, right column, next sheet), so the screen shows the true sheets and their count. Same deck, 08:16: 60 sheets full and 21 short in Chrome's flow, 56 and 20 packed. A Letter card taller than a column gets a sheet of its own and runs from the left column into the right; one taller than two columns is flagged.

## Counts, Nov 16 08:20 (197 to 201 cards)

| form | 11 x 17 | Letter |
| --- | --- | --- |
| full | 61 | 129 to 133 |
| short | 21 | 40 |
| index | 7 | 12 |

## Sets for the week (KP's proposal, for Marlon through KL)

Four print sets, saved as marks in `_content/cards/_layouts/print-<name>.json`, so each opens in the list at `/cards?set=<name>` where Marlon can add or take out cards with the box at each card's corner. None is his choice yet. Every card in them has an abstract (KP wrote 52 on Nov 16, 33 of them for the three convolutes and 19 more for these sets; KL reviews). Sheets counted from the PDFs at 08:25, with no problems in any check.

| set | for | cards | 11 x 17 full / short / index | Letter full / short / index | KP suggests |
| --- | --- | --- | --- | --- | --- |
| `class-nov18` | Wednesday's class: the Session A chain in order (8), the swap *Claude takes a seat*, *AI as a player*, *Language models at the table*, *The committee*, *The week 11 AI game*, *How do you debrief a game?* | 14 | 7 / 2 / 1 | 14 / 4 / 2 | full on 11 x 17 for the teaching table, plus its index |
| `stafford-nov23` | William's workshop: the workshop chain in order (8), then the game's Nov 15 direction (the 4X genre, anti-colonial, firms as players), William's readings as mechanics, the three changes SW proposes, *Treacherous turn*, *How are AI-futures role-plays run?* | 19 | 9 / 3 / 1 | 17 / 5 / 2 | full on 11 x 17 for planning with William; short to hand him |
| `llufs-wall` | The LLUFs' wall: today's activities (five most-played games, list against the clock, guess the category), the studio block chain, signs and where-to-play, cameras for Monday, NFC for Tuesday | 21 | 9 / 3 / 1 | 19 / 5 / 2 | short on 11 x 17, cut and pinned up |
| `marlon-desk` | Marlon's desk: KB's top builds and KR's research questions for Nov 18 and Nov 23 | 18 | 7 / 2 / 1 | 13 / 4 / 2 | short on Letter, plus the whole deck's index (7 sheets of 11 x 17) |

To print one: `node nextjs/app/cards/print/pdf.mjs --set llufs-wall --form short --open`. The PDFs for all four sets in every paper and form are already in `_media/print/` from 08:25 (regenerate before printing if cards change).

**Finding a set again.** A set's index sheet (`--form index`) now opens with the set's name, its card count, the date printed, and the address to print or edit it again; under it, the cards grouped by convolute, each with its letter, title and sentence. **Divider cards** (one per convolute: letter, title, sentence, as a card in the column) are not built: a question for Marlon through KL, since the index sheet may be enough.

## Log

- 08:11 headless Chrome honours the page's `@page` size; margins measure 0.45 in.
- 08:12 found the blank feet; 08:13 tried `column-fill: balance` in print (no change); 08:15 the sheets packed in the page.
- 08:17 `pdf.mjs` and `pdf-check.swift` working on a convolute, a chain (Letter, short) and an index. Committed by KL at `2dbb0b3`.
- 08:21–08:23 abstracts on the 33 cards of `class-session`, `ll-week` and `stafford-game` (KL committed `5e0290d`).
- 08:25 four proposed sets, 19 more abstracts for the cards in them, every set printed in six ways; a set's index names the set.
- 14:00 Marlon, relayed by MZ and KL: "for talking to the llufs this afternoon i'd love some cards for the "big ideas" of the week … I'd need to print these". New convolute S `primer`; KP's part is the glossary and the print.
- 14:04 twelve glossary cards, `term-mechanics` (order 200) to `term-template-and-instance` (310), each with an abstract, cited sources and a link to the card it lives in; check-cards and check-quotes clean on them.
- 14:05 interim print: `node nextjs/app/cards/print/pdf.mjs --convolute primer`, full form on 11 x 17 (KL's lean; the cards are short), 16 cards on 4 sheets, opened in Preview. Reprinted at the same path when the theorist, project and opening cards land.
- 14:06 KG's links added to ten of the twelve term cards; the twelve descriptions rewritten so they don't repeat the abstracts.
- 14:12 the primer complete at KL's `9976a26` (opening 1, projects 10 to 40, theorists 100 to 170, terms 200 to 310): reprinted full on 11 x 17, 25 cards on 7 sheets, margins 0.43 to 0.44 in, nothing on the cut, opened in Preview. Not sent to a printer.

*KP's record, Nov 16. Not Marlon's words unless quoted.*
