---
title: "The week 11 cards"
description: "One card for every idea, fragment, activity and mechanic Marlon has in mind for games and interaction week: what they are, the three models behind them, and how to read, arrange and print them."
author: "CL (Claude Code 2543738f-72cd-4ade-a02e-d9c45a51d7f8, started in ll-week-11 on FAS-DDW32PXW5L)"
date: 2026-11-15
status: "draft. Marlon's words are quoted and dated; the rest is CL's account of the workspace."
---

# The week 11 cards

Marlon, November 15, shortly before 13:39:

> Essentially I want an md doc between 50 words and 1000 words or so for every idea/fragment/activity/mechanic I have in mind for the w11 week. Think luhmann's zettelkasten cards, nietzsche's aphorisms, benjamin's convolutes. They should definitely have front matter including tags, and maybe links between each other. … I will manipulate them in the app but will also print them out.

And at 13:39: "for now it can be cards. the print size will be 5.5" wide (a column of 11x17 vertically, with varying heights depending on how much text--headlines can be 16 or so and then body 10pt for a start)."

## What a card is

One Markdown file in this folder, about one thing, 50 to 1,000 words. Where Marlon said something about it, the card opens with his words, quoted, with the date and where he said them; what an agent wrote after that is labeled as the agent's. The frontmatter says what kind of thing the card is, which bundle it belongs to, who it would be used with, what it continues and what it should be read beside. Every field is in [format.md](format.md).

The folder is flat on purpose. A card's place is in its frontmatter, so it can change bundles without moving, and nothing that links to it breaks.

The cards don't replace the other collections in this repo (`ideas/`, `game-ideas/`, `mechanics/`, `activities/`, `prototypes/`, the readings). Those are the stacks: what agents built out, at length. A card is short, says what Marlon has in mind, and points into the stacks for the rest.

## The three models

**Niklas Luhmann** kept his notes on slips, one thought to a slip, and found his way through them by two kinds of connection: a slip filed directly behind another continued it, and a slip could carry the number of any other slip anywhere in the box. Here those are `follows:` (this card continues that one, so cards form chains you can read in order) and `links:` (cross-references, shown in both directions). **Walter Benjamin** sorted the notes and quotations for the *Arcades Project* into lettered sheaves he called convolutes, each a subject's worth of material laid side by side, not written through. Here every card has one `convolute:`, from the list in [convolutes.md](convolutes.md), and a convolute is what you print and lay out together. **Friedrich Nietzsche** wrote books of numbered aphorisms, each short enough to stand by itself and sharp enough to be worth the space. Here that is `kind: aphorism`: a card of a few sentences that can be pinned to a wall or read aloud.

## How to read them

Views are at http://localhost:3111/cards when the reader app is running (`pnpm dev` in `nextjs/`). CV is building them on Nov 15; [views.md](views.md) will have each view's options.

- **The list** (`/cards`): every card, filtered by convolute, kind, tag, audience and status.
- **One card** (`/cards/<slug>`): the card, what it links to, what links to it, and the chain it sits in.
- **A convolute** (`/cards/convolutes`): one section per bundle, its cards in order.
- **A chain**: start at a card and read its `follows` sequence on one page, as a line of thought or as a session in order.
- Or open the folder in Obsidian or any editor. They are plain files.

## How to arrange them

- **The graph** (`/cards/graph`): cards as nodes, grouped by convolute; `follows` as arrows, `links` as lines, shared tags as faint lines. It shows where the week is thick and which cards are connected to nothing.
- **The board** (`/cards/board`): drag cards into piles and rows, and save the arrangement by name (`_layouts/`). A saved board is a selection in an order: a session plan, a wall, a handout.
- **By hand**: print them, cut them, and move them on a table.
- **In the files**: change `convolute:`, add a `follows:` or a `links:` entry, set `order:`. That is all an arrangement is.

## How to print them

`/cards/print` lays the cards out as Marlon asked: columns 5.5 inches wide, two to an 11 x 17 portrait sheet, cut down the middle; each card as tall as its text; the title at 16 pt in Inter at weight 900, the description at weight 500, the body at 10 pt. Choose what prints in the URL: `?convolute=game-state`, `?kind=aphorism`, `?audience=tdm155ai`, `?tag=nfc`, `?status=ready`, `?cards=slug,slug` for a chosen set in that order, or `/cards/print/<slug>` for one. In Chrome's print dialog set the paper to Tabloid (11 x 17), portrait, margins none, and turn headers and footers off.

## Who made what

The cards workspace (Nov 15): CL leads (format, convolutes, review), CI writes cards from Marlon's ideas and words, CM from the mechanics, activities and prototypes, CD takes Marlon's dictation into `_dictation/` and then into cards, CV builds the views. `author:` on each card is the pane that created it, and `voice:` says whether the body is Marlon's words, an agent's, or both. The board, the source list and CL's note on how it all fits together are in [`_context/orchestration/20261115-cards/`](../../_context/orchestration/20261115-cards/board.md).
