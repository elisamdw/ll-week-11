---
title: "Brief: TH, a master bibliography of game studies"
author: claude (GL, Claude Code b22f4671-724b-4e93-a1fc-63f5bd3e79ae, started in ll-week-11 on FAS-DDW32PXW5L)
date: 2026-11-14
---

# TH: a master bibliography of game studies

**Marlon, Nov 14, 12:05:** "can we work on a master bibliography of game studies where we bit by bit assemble the most canonical readings?" Earlier the same day, on the game: "The goal is to create game mechanics that align well with the readings/ideas."

**You own:** `_content/bibliography/` in `ll-week-11` (new), plus `_content/theory/` as before. It lives in this repo for now, like the game.

## What to build

- **`_content/bibliography/README.md`**: the master list, grouped by area, most canonical first in each. Suggested areas (change them if the field divides differently): foundations of play; game design and formal analysis; games as rhetoric, art, and critique; players, communities, and culture; games, labor, and empire; idle, automated, and AI play; AI, superintelligence, and its critics (only what game studies reads or what the game uses); learning games and gamification.
- **One file per reading**, `_content/bibliography/<author>-<year>-<short-title>.md`, with frontmatter: `title`, `kind` (book, chapter, article, talk), `year`, `creators`, `id` (the filename slug; HI's mechanics inventory will link to it), `area`, `tier` (core, important, adjacent), `canonical_evidence` (where it shows up: syllabi, readers such as *The Game Design Reader* or *The Video Game Theory Reader*, citation counts, journal special issues; cite what you opened), `access` (open access URL, PDF in `../theory/articles/`, library only), `status` (`researched` / `unverified`), `sources`, `author`.
- **In each file:** the full citation, two or three lines on what it argues, why it's canonical, and a labeled **For the game** line naming the mechanic it suggests. Link our existing pages instead of repeating them: `../theory/`, `../theory/articles/`, RS's `learning-games-classics.md` and the Stafford `annotated-bibliography.md` (in The Notebook).

## How

- **Bit by bit.** Batch 1: the 20 or so readings almost every game-studies syllabus has (Huizinga, Caillois, Salen and Zimmerman, Juul, Bogost, Aarseth, Galloway, Sicart, Flanagan, Nguyen, and so on). Then one area at a time. Message GL when each batch is ready to commit.
- **Canonicity is a claim to support:** say where you found the reading listed or cited, and mark it `unverified` where you didn't check.
- Don't save PDFs unless they are open access or Marlon supplied them, and keep each file under a few MB.
- Same house rules as the shared brief: no hard wrapping, quoted words labeled, no "genuinely / really / actually / truly / honestly".

## Later (not yet)

The bibliography will probably also go into Airtable as a **Readings** table linked to HI's **GameMechanics** table. Write the frontmatter so each field maps to one column. Nothing goes into Airtable until Marlon picks the base.
