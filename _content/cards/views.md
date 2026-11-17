---
title: "The card views"
description: "Every way to look at the week 11 cards in the reader app, the options each one takes in its URL, and how to print a set on 11 x 17."
author: "CV (Claude Code 4338f53c-7185-48bc-a018-7d392706430e, started in ll-week-11 on FAS-DDW32PXW5L)"
date: 2026-11-15
status: "draft: CV's notes on the views as built on Nov 15. Not Marlon's words."
---

# The card views

The views read the cards in this folder (`_content/cards/*.md`) in the [card format](format.md), and the bundles in [convolutes.md](convolutes.md). They run in the week's reader app on the laptop, at http://localhost:3111/cards (start it with `pnpm dev` in `ll-week-11/nextjs/`). Nothing is deployed: the board and the graph save their arrangements into this folder's `_layouts/`.

The views were copied on Nov 15 from AL's views for `/ideas` (list, card, board, graph, print) and changed for the cards. The code is in `nextjs/app/cards/` and `nextjs/lib/cards.mjs`.

## The list: /cards

Every card, one section per convolute in the order of `convolutes.md`, and within each convolute in reading order: a chain of `follows` from its first card, then cards by `order`, then by date and title. Filter by convolute, kind, tag, status, audience and voice, or search. **Print these** opens the print view with the same filters.

The filters can also be set in the URL: http://localhost:3111/cards?convolute=stafford-game, `?kind=aphorism`, `?tag=phones`, `?status=draft`, `?audience=tdm155ai`, `?voice=marlon` (`marlon`, `mixed`, `drafted`).

## One card: /cards/&lt;slug&gt;

The card's frontmatter shown plainly (kind, convolute, tags, audience, status, voice, author, date, order, slug), then the body, then its links in both directions:

- **follows / followed by**: the card it continues and the cards that continue it.
- **Links to cards**: the cards it names in `links`.
- **Linked from**: every card that names this one.
- **Links to other collections**: first, marked *grows from*, the card in another collection this one grew from (by the format, the first link with a slash); then `ideas/…`, `mechanics/…`, `activities/…`, `prototypes/…` and the rest, each going to its own page. A mechanic goes to its page in `mechanics/new/` when it has one; otherwise its name shows as plain text.

A link that points at nothing yet shows as "not found". `[[slug]]` links and relative links like `the-committee.md` in a body go to the card. Buttons at the top: **Read the chain**, **Print this card**, **Print its convolute**.

## The convolutes: /cards/convolutes

One section per convolute, with its letter, title and sentence from `convolutes.md`, and its cards numbered in reading order. An indented card is a branch: a second card that follows the same card. Each section has **Print** and **As cards** links.

## A chain: /cards/chain/&lt;slug&gt;

Start at any card and read its `follows` chain on one page: back to the card that starts it, then every continuation, each card in full. A branch is indented and says which card it also follows. **Print the chain** prints the same cards in the same order.

A chain can cross convolutes (a card in one bundle can continue a card in another); the chain page follows it across, while the convolute pages keep each bundle to its own cards.

## The graph: /cards/graph

The cards as nodes, in boxes by convolute.

- **follows**: a pink arrow from a card to the card that continues it.
- **links**: a plain grey line.
- **grows from**: a dashed green arrow from the card in another collection it grew from (its first link with a slash), when that thing is on the graph.
- **shared tags**: faint dotted lines, each card's three strongest, off at first: tick **suggested links** to see them, and click one to keep it as a drawn link. Since Nov 16 (KG) a shared tag counts by how rare it is, so two cards sharing `nfc` outrank two sharing `play`; hover a line for its tags and score.
- **Linked things**: small nodes for what the cards link to in other collections. At first none show; filter or focus some cards and the things those cards link to appear (**for filtered or focused cards**). Switch to **shared by 2+ cards**, **all** or **none**.

Filter by convolute, kind, tag, status, audience or search: the cards that don't match dim, and **Zoom to them** frames the rest. Double-click a card to read it in the side panel, which shows the description, the card's short text (**In short**, the same text as the short print form) and, folded below it, **The whole card**; drag from a card's edge dot to draw a link of your own; shift-drag to select and **Group** to box them. **Re-layout** re-clusters by convolute, kind or first tag.

**Lenses** (KG, Nov 16): the **Lens** menu in the filter row dims every card a lens leaves out, and **Zoom to them** frames the rest.

- **nothing points here**: the cards no other card links to or continues.
- **a chain**: pick a chain (longest first); each of its cards shows its step (1, 2, 3; a branch 3b, 4b) and the view frames it. **Lay out as a path** moves only the chain's cards into a row above the rest, a branch on its own row; **Re-layout** puts them back. Use `?name=` to keep a path without changing the main arrangement.
- **the convolutes**: a side panel draws the convolutes on a circle by letter, a line for each pair that links, as thick as its links and follows. Click a convolute to filter to it, a line or a row of **Most linked pairs** to light the cards that cross between the two.

**The graph as data**: http://localhost:3111/cards/graph.json is the whole graph (cards, the things they link to, every edge with the file it is written in, the chains), built from the cards on each request; `?counts=1` adds the counts. Without the app, `node scripts/graph-stats.mjs --graph` prints the same. What it holds, the counts, and the options for the graph's next steps are in [graph.md](graph.md).

Your arrangement and the links you draw save to `_content/cards/_layouts/graph.json`. `?name=stafford` keeps a separate one (`graph-stafford.json`). Links you draw on the graph live only in that file, not in the cards; to make one permanent, add it to the card's `links`.

## The board: /cards/board

A whiteboard: cards as paper you drag from the tray onto the board, with marker labels (**Text**) and group frames (**Frame**). **Tidy** lays the placed cards out in columns by kind, convolute or first tag, each column in reading order. The tray filters by convolute, kind and tag. Double-click a card for its details: the description, **In short** (the short text) and **The whole card**, folded.

The board saves to `_content/cards/_layouts/board.json`; `?name=class` keeps another (`board-class.json`), for a session or for choosing a set to print.

## Print: /cards/print

The view to print on paper. Each card is a column **5.5 inches wide**, two columns side by side on an **11 x 17 portrait** sheet, to cut down the middle. A card is as tall as its text, cards follow each other down the left column and then the right, and a card never splits across columns or sheets. Title Inter 16 pt at weight 900, description weight 500 (11 pt), body 10 pt, black on white; at the foot, small, the kind, the convolute's letter and title, the card it follows, the tags and the card's path, `/cards/<slug>`, so the printed card reads as the address of its full text.

**The sheets on screen are the sheets on paper** (KP, Nov 16). The page measures each card at its printed width once the fonts are in, then fills the left column, the right column and a new sheet, in reading order, and shows the count above the first sheet ("21 sheets of 11 x 17"). Chrome's own two-column flow, printed, balanced the columns of each sheet and left white at the foot of many of them: on Nov 16 at 08:16 the same 187 files took 60 sheets in full that now take 56, and 21 in short that now take 20. The dashed line down the middle is drawn on every sheet, even one with only a left column, so every card can be cut to 5.5 inches. Without JavaScript the page falls back to Chrome's flow. The code: `Sheets.jsx` beside `PrintSheet.jsx`.

**No QR codes** (Marlon, Nov 15, for aesthetic reasons: "I also just don't want QR codes for aesthetic reasons. If the relative path is simple enough I can find these"). The foot prints the path instead, in every form and on both papers. Dashed lines between cards and down the middle are the cut lines.

What to print:

| URL | Prints |
| --- | --- |
| http://localhost:3111/cards/print | every card, by convolute, each in reading order |
| `/cards/print?convolute=stafford-game` | one convolute |
| `/cards/print?kind=aphorism` | one kind (`idea`, `fragment`, `aphorism`, `question`, `mechanic`, `activity`, `prototype`, `reading`) |
| `/cards/print?tag=phones` | one tag |
| `/cards/print?status=ready` | one status (`seed`, `draft`, `ready`) |
| `/cards/print?audience=stafford` | the cards for one occasion (`tdm155ai`, `stafford`, `llufs`, `ll`, `faculty`) |
| `/cards/print?voice=marlon` | by whose words they are (`marlon`, `mixed`, `drafted`) |
| `/cards/print?convolute=game-state&status=draft` | filters together |
| `/cards/print?cards=the-room-is-the-board,paperclip-loop` | a chosen set, in that order (other filters are ignored) |
| `/cards/print/the-room-is-the-board` | one card, in the left column |
| `/cards/print?form=short` | the **short form** of every card (see below); combines with every filter, `?set=` and `?paper=` |
| `/cards/print?form=index` | the **index**: the printed overview (see below) |
| `/cards/print?set=stafford` | a **print set** you marked in the list, in the order you marked it |
| `/cards/print?paper=letter` | the same on **Letter**, 8.5 x 11 portrait, with two 4.25-inch columns (works with every filter, and on one card: `/cards/print/<slug>?paper=letter`) |

On screen the sheet shows at its real width under a bar of filters that doesn't print; the **Paper** menu switches between 11 x 17 (the default) and Letter and keeps the other filters, and the **or slugs** box takes a chosen set.

**Three forms** (Marlon, Nov 15: "There may be too many to print ... I think I may need to do an innitial overview of cards in digital form before printing the highest-leverage ones . . . or printing clusters? or sometimes maybe having abbreviated things to print that match up with more complete digital texts (the last option is probably best)"). The **Form** menu in the bar switches between them and keeps the other filters.

- **Full** (the default): the whole card.
- **Short** (`?form=short`): the title, the description, the card's **abstract** and the foot. The abstract is what a card's body holds above its divider, the first line that is only `---` (format 1.1; Marlon, Nov 15: "the divider option is a little like an academic paper with abstract essentially"). A card without an abstract yet falls back to the blockquotes from the body (Marlon's words), each followed by the first sentence of the paragraph after it, which says who, when and where. Several quotes in a row share one attribution. The foot keeps the path, `/cards/<slug>`, so a printed card finds its full text. A card with no blockquote prints its title, description and foot. Nothing in the cards is rewritten: the short form is cut from the file each time. It is one function, `shortText` in `nextjs/lib/cards.mjs`, used by the short print form, the graph's side panel and the board's detail panel: the abstract when the card has one, otherwise the quotations. A card that doesn't quote Marlon, because it rests on other sources, prints the same way; nothing marks it as lesser.

**The abstract in the full forms.** On the card page, the chain page and the full print, the abstract comes first, a little heavier than the rest, closed by a short solid rule; the divider itself is never drawn, so nothing on the printed card looks like a cut line except the cut lines. In the graph and board panels, **In short** is the abstract and **The whole card** below it is the rest. On Nov 16 at 08:20 the deck of 197 cards took 21 sheets of 11 x 17 in short form against 61 in full, and 40 sheets of Letter short against 129 full.
- **Index** (`?form=index`): the printed overview. One block per convolute (its letter, title and sentence, and how many cards it holds), then each card's title, description, kind and path. All 197 cards fit on 7 sheets of 11 x 17 or 12 of Letter (Nov 16). The index type sizes are at the top of `print.css` (`--index-…`).

**Print sets**: in the list at `/cards`, each card has a small box at its top right. Clicking it adds the card to the print set named in the **Print set** box (`set` until you rename it), numbered in the order you mark them; clicking again takes it out. The set saves at once to `_content/cards/_layouts/print-<name>.json`, and **Print the set** (or **short**) opens `/cards/print?set=<name>`. Make as many sets as you like by changing the name; `/cards?set=<name>` opens the list on that set. A set's index (`?set=<name>&form=index`) opens with the set's name, its card count, the date printed and the addresses to print or edit it again, so a cut set can be found again (KP, Nov 16). KP's proposed sets for the week (`class-nov18`, `stafford-nov23`, `llufs-wall`, `marlon-desk`) are in `_layouts/`, with sheet counts in `_context/orchestration/20261116-cards-ideas/print.md`. The board has no marks yet.

**Letter** (Marlon, Nov 15: "actually I also want to try one version on 8.5x11 with columns 4.25"): the same type sizes to start, a 0.35-inch margin on all four sides of each cut card (`--pad` in the `.is-letter` block at the top of `print.css`). An 11-inch column holds fewer cards than a 17-inch one, so most Letter columns carry one card and some white below it. A card of more than about 350 words is taller than a whole Letter column; it can't stay in one piece, so it starts a sheet of its own and runs on from the left column into the right, with its own margin there. A card longer than two Letter columns would be cut off at the foot: the sheet count says so, and the PDF script stops with a warning. On 11 x 17 every card fits in one piece.

**To print a set to a PDF, without the print dialog** (KP, Nov 16): from the repo root, with the dev server up on 3111,

```
cd /Users/marlonkuzmick/Development/mk-27/apps/the-notebook/apps/ll-weeks/ll-week-11
node nextjs/app/cards/print/pdf.mjs --convolute stafford-game
```

It writes `_media/print/<YYYYMMDD>-<name>-<paper>-<form>.pdf` (gitignored; here `20261116-stafford-game-11x17-full.pdf`) and prints the path, the number of cards and sheets, and what it checked. Say what to print with one of `--set <name>` (a print set marked in the list), `--convolute <slug>`, `--chain <slug>` (the `follows` chain through any card in it), `--cards a,b,c`, `--card <slug>`, a filter (`--kind`, `--tag`, `--status`, `--audience`, `--voice`), or `--all`; then `--paper letter`, `--form short` or `--form index`, `--name <label>` for the file name, and `--open` to open it in Preview, from where it goes to the printer as it is. The script renders the print view in headless Chrome (a profile of its own, so the Chrome you have open isn't touched) and then measures the PDF with PDFKit (`pdf-check.swift`): every page the right size (11 x 17 in, or 8.5 x 11), the text 0.45 in (Letter 0.35) from the paper's left and top edges and from the cut on the right column's side, nothing on the middle cut line, and as many pages as the screen packed sheets. It warns and exits 2 when one fails. `swift nextjs/app/cards/print/pdf-check.swift <file.pdf> --png <dir>` gives the measurements for any PDF and renders its pages to look at. Ragged line ends read 0.38 to 0.49 in from the right edge and the cut by PDFKit's glyph boxes; the left edges, which align, read 0.44 to 0.45.

**To print a set from Chrome:** open the URL, press ⌘P in Chrome, and choose paper size **11 x 17** (Chrome may call it Tabloid or Ledger), or **Letter** for `?paper=letter`, portrait, margins **Default** or **None** (they come out the same: the page sets no margin of its own), scale 100%. Avoid **Minimum** and **Custom**: they shrink the sheet and the two 5.5-inch columns no longer fit. Every cut card has the same 0.45-inch margin on all four sides (Marlon, Nov 15: "margin to cut lines needs to match margin to sides of page"): each card carries the full margin on its own side of a cut line, so the white between two cards' text is 0.9 inch and the cut falls in the middle of it, and the sheet adds nothing at its edges. A printer that can't print to the paper's edge only loses the ends of the cut lines there; the text is 0.45 inch in. Background graphics can stay off. To choose cards by hand, arrange them on a named board first, or collect their slugs from the list into `?cards=`.

**To tune the type:** the sizes are at the top of `nextjs/app/cards/print/print.css` (the sheets repack to whatever they come to) (`--title-size`, `--title-weight`, `--desc-size`, `--desc-weight`, `--body-size`, `--body-leading`, `--meta-size`, `--pad`, the margin on every side of a cut card, and the cut line). The sheet's own top and bottom margin is 0, set twice, in `--sheet-top` and in the `@page` rule, because `@page` can't read the variables; leave both at 0 so the margins stay even.

## Names that collide

`print`, `board`, `graph`, `convolutes`, `chain` and `api` are views, so a card can't use one of them as its slug (`graph.md` is the graph's own document, read in the repo; `/cards/graph` is the view). `format`, `views` and `readme` open this folder's documents at `/cards/format`, `/cards/views` and `/cards/readme`.

*CV's notes, Nov 15; the print section brought up to date by KP, Nov 16. Not Marlon's words.*
