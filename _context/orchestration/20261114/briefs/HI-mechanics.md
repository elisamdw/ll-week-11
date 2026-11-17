---
title: "Brief: HI, an inventory of game mechanics for Airtable"
author: claude (GL, Claude Code b22f4671-724b-4e93-a1fc-63f5bd3e79ae, started in ll-week-11 on FAS-DDW32PXW5L)
date: 2026-11-14
---

# HI: an inventory of game mechanics, ready for Airtable

**Marlon, Nov 14, 12:05:** "I also want an inventory of game mechanics that we can put in an Airtable." Earlier the same day: "The goal is to create game mechanics that align well with the readings/ideas."

**You own:** `_content/mechanics/` in `ll-week-11` (new), plus `_content/history/` as before.

## Start from what exists

- **GM's 50 cards** (Nov 13) in The Notebook at `apps/tdm155ai/tdm155ai-week-11/game-mechanics/cards/`, one Markdown file each, with frontmatter `title`, `number`, `family`, `one_line`, `shows_it`, `try_it`, `build_it`, `sources`. Read them; don't edit that repo. Every card becomes a row, keeping GM's wording and number.
- **The mechanics from today's readings and history:** TH's and HI's "For the game" lines, collected in `_content/game/design.md` (treacherous turn as a hidden card, instrumental convergence as a tech tree, perverse instantiation as scoring, the present-harms track, value capture, delegation, the token test, and so on). Add the ones that are mechanics in their own right, not just settings.
- **The game's engine** (`nextjs/lib/game-engine.mjs`, its `OPS`): note which mechanics the game already has.

## What to build

- **`_content/mechanics/mechanics.csv`**: one row per mechanic, with one column per Airtable field, in PascalCase as The Notebook's Airtable base uses: `MechanicId` (slug), `Name`, `Family`, `OneLine`, `ShowsIt`, `TryIt`, `BuildIt`, `Readings` (bibliography ids, semicolon-separated; TH is writing `_content/bibliography/<author>-<year>-<short-title>.md`, and the id is that slug), `AiAngle` (how the mechanic plays when AI is a character or a system), `InOurGame` (yes or no, and which version), `Source` (GM card number, or the pane and reading it came from), `Status`.
- **`_content/mechanics/README.md`**: what the inventory is, the field list with one line per field, the proposed Airtable table (name `GameMechanics`, field types: single select for `Family` and `Status`, linked records for `Readings` once a `Readings` table exists), and the counts.
- Optional: one Markdown page per new mechanic (those not in GM's set), so the reader app shows them.

## How

- Message GL when a first version is ready to commit. Coordinate the reading ids with TH directly (`cmux agent message surface:1000340012 "..."`).
- **No Airtable writes.** GL brings Marlon the base question; the push happens only on his go, with `apps/ll-utilities/bin/ll-airtable.js` from The Notebook root (read its README first). The "Nov 14 · LL tooling" workspace's UT pane is changing The Notebook base today, so check with GL before anything touches it.
