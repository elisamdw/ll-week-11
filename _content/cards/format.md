---
title: "The card format"
description: "Every field of a week 11 card, what it means, its allowed values, how links name other cards, and two examples."
author: "CL (Claude Code 2543738f-72cd-4ade-a02e-d9c45a51d7f8, started in ll-week-11 on FAS-DDW32PXW5L)"
date: 2026-11-15
version: "1.2, 2026-11-15 15:23 EST (1.0 fixed 13:46, 1.1 at 15:17)"
status: fixed
---

# The card format

**Version 1.2, Sunday, November 15, 2026, 15:23 EST** (1.0 was fixed at 13:46; 1.1, at 15:17, added the abstract and its divider; 1.2 renames two identifiers to follow Marlon's naming rule, "the LL"). From MZ's draft in the workspace's shared brief, which Marlon approved at 13:39. It changes after this only when CL tells every pane; changes are listed at the foot.

A card is one Markdown file in `_content/cards/`, flat, no subfolders. Its file name is its **slug**: lowercase letters, digits and hyphens, at most 60 characters, ending `.md` (`the-room-is-the-board.md`). The slug is the card's permanent name. It never changes once another card links to it. `README.md`, `format.md`, `convolutes.md` and `views.md` are not cards, and folders starting with `_` (`_layouts/`, `_dictation/`) are kept out of the views.

## The frontmatter

```yaml
---
title: "From board game to game state"
description: "Take a board game the LL owns and write down, as data, everything you would need to set the same game up again."
kind: idea
convolute: game-state
tags: [database, tabletop, cameras]
audience: [tdm155ai, stafford]
follows: games-are-complex-with-many-parts
links: [photograph-the-neutral-state, activities/tdm155ai/take-apart-a-board-game, prototypes/hybrid/photo-to-game-state, game-state/monopoly]
order: 2
sources: ["_context/orchestration/20261114/voice-handoff-back.md"]
voice: mixed
author: CL
date: 2026-11-14
week: 11
status: draft
---
```

| Field | Required | What it means | Allowed values |
| --- | --- | --- | --- |
| `title` | yes | The card's headline. Prints at 16 pt, weight 900. A claim or a name, in sentence case, with no final period. | A string, at most about 60 characters. |
| `description` | yes | One sentence that says what the card claims or proposes. Prints at weight 500 under the title. | One sentence, at most about 30 words. |
| `kind` | yes | What sort of thing the card is. | One of the eight kinds below. |
| `convolute` | yes | The one bundle the card belongs to (Benjamin). | A slug from [`convolutes.md`](convolutes.md). To add a convolute, propose it to CL. |
| `tags` | yes | Loose topics that cut across convolutes. The graph draws shared tags as faint edges. | One to six, lowercase with hyphens. Reuse before inventing (starter list below). |
| `audience` | no | Who the card would be used with, so a set can be printed for one occasion. Leave it out when the card is for no occasion yet. | A list from `tdm155ai` (the Nov 18 class), `stafford` (the Nov 23 workshop), `llufs`, `ll` (the LL: the staff and the studio; was `lab` until v1.2), `faculty`. |
| `follows` | no | The one card this card continues (Luhmann's continuation). Chains of `follows` are read in order. Several cards may follow the same card, which makes a branch. | One slug of a card in `_content/cards/`. Never a card in another collection, never a list, never a loop. |
| `links` | no | Cross-references (Luhmann's second kind of link): cards this one should be read beside, and the things it grew from or points at in other collections. Not typed, and read in both directions: the views show what links here. | A list. See "How links name things". |
| `order` | no | The card's position within its convolute, for cards that aren't placed by a chain. A chain keeps its `follows` order and sits where its first card's `order` puts it. | A number. Lower comes first. Cards without one come last, by date and then title. |
| `sources` | yes | Where the card came from: the files, Slack permalinks and URLs you opened. Every quotation in the body has its source here. | A list of strings. Files in this repo by path from the repo root; The Notebook's as `NB/…`; the week's plan folder as `W11/…`. |
| `voice` | yes | Whose words the body is. | `marlon`: the body is his words, quoted, plus attribution lines only. `mixed`: his quoted words and an agent's writing. `drafted`: none of his words; an agent's proposal, or an account of something agents made. |
| `author` | yes | Who created the file. Thread IDs are on the board. | A pane ID (`CL`, `CI`, `CM`, `CD`) or `marlon`. |
| `date` | yes | The day the thought dates from: the day Marlon said it, or the day a drafted card was written. | `YYYY-MM-DD`. |
| `week` | yes | The LL week the card is for. | `11`, or `12` when the card is plainly about the week after. |
| `status` | yes | How far along the card is. | `seed`: captured (the quote, a line or two). `draft`: written out, links in place. `ready`: reviewed by CL (sourced, linked, in range). Only CL sets `ready`. |

### The eight kinds

| `kind` | A card that… |
| --- | --- |
| `idea` | proposes or claims something that could be acted on. |
| `fragment` | holds a piece that isn't an idea yet: an observation, a reference, an image, an unfinished thought. |
| `aphorism` | says one thing in a few sentences, stands alone, and can be read aloud or pinned to a wall (Nietzsche). Under about 100 words. |
| `question` | asks something that is open: for Marlon, for students, for the week. |
| `mechanic` | describes one game mechanic or game element: what it is, how it plays, what it does. |
| `activity` | describes something people do in a session, with its time and materials. |
| `prototype` | describes one playable thing (at `/proto` or on a table) and what playing it shows. |
| `reading` | gives a text, film or game and what it offers the week. Only where it feeds a card of another kind. |

### Starter tags

`nfc`, `phones`, `cameras`, `print`, `space`, `tabletop`, `ar-xr`, `hardware`, `database`, `game-state`, `economy`, `hidden-information`, `turns`, `agency`, `rhetoric`, `paperclips`, `civilization`, `autonomy`, `claude-code`, `remix`, `glossary`, `index-cards`, `play`, `design`, `story`. See what is in use: `grep -h '^tags' _content/cards/*.md | sort | uniq -c`.

## How links name things

- **A card in this folder: its bare slug.** `the-readout` is `_content/cards/the-readout.md`.
- **Anything in another collection: its path under `_content/`, without `.md`.** `ideas/turn-the-index-cards-into-a-database`, `game-ideas/photo-to-game-state`, `activities/tdm155ai/take-apart-a-board-game`, `prototypes/hybrid/photo-to-game-state`, `theory/…`, `history/…`, `game-state/monopoly`, `bibliography/<key>`, `learning/examples/<slug>`. The reader app serves the same path, so the link is also the URL.
- **A mechanic: `mechanics/<MechanicId>`**, the first column of `_content/mechanics/mechanics.csv` (`mechanics/area-control`), for all 105 rows, whether or not the mechanic has a page in `mechanics/new/`.
- **Nothing else goes in `links`.** URLs, Slack permalinks and files outside `_content/` go in `sources`.
- **A link must point at something that exists.** You may link to a card you are about to write in the same batch. CL checks every link at review.
- **A card that grew from a card in another collection links back to it**, and puts it first in `links`.
- `follows` takes a bare slug only.

## The body

- **50 to 1,000 words**, counted without the frontmatter. One card per distinct thing: before you create a card, look for the same idea under another name (`ls _content/cards/`, `grep -il`), and add to that card or link to it.
- **No `#` heading.** The title prints from the frontmatter. Use `##` only in a card over about 400 words. Text only for now: paragraphs, blockquotes, short lists, bold. No images or embeds until the print view is settled.
- **A card doesn't have to quote Marlon.** Marlon, Nov 15: "sometimes these cards won't be based on me but on other sources, so we can't make it a blanket rule that it must quote me". A card can rest on a reading, a game, a prototype or another person's words. What every card must do is say what it is based on, in `sources`, and quote or cite it accurately. `voice: drafted` is the right value for a card with none of his words, and is not a lesser card.
- **Quotations are blockquotes, whoever is quoted**, each followed by a line saying who, when and where. For Marlon's words: `Marlon, Nov 14, in the voice chat, as transcribed by voice Claude.` Quote exactly, including dictation slips; mark unclear words `[?]`. A summary of what he said that isn't his wording is not a quotation: write it as your own sentence and say whose summary it is.
- **Never pad his words and never put words in his mouth.** When he said one line, the card gives the line and then, in the agent's plain prose, when and where he said it and what it was about. That card is `voice: mixed`. `voice: marlon` is for cards where his words alone carry the card.
- **What an agent adds is labeled.** End a `mixed` or `drafted` card with one italic line: `*CI's reading, Nov 15. Not Marlon's words unless quoted.*` or `*CM's proposal, Nov 15.*`
- **Cited findings are cited**: a reading by its bibliography key or URL, a fact about the repo by its path.
- No hard-wrapped lines. No student names or student work.

## The abstract and the divider (v1.1)

Marlon, Nov 15: "abbreviated things to print that match up with more complete digital texts (the last option is probably best)"; then, on a divider in the body, "the divider option is a little like an academic paper with abstract essentially"; and on what goes in it: "We don't absolutely need my words in the summary if it seems inappropriate (like if no quote from me perfectly matches the gist of the card). The key is that it makes sense and summarizes. Then hte full text can quote me when appropriate".

A card's body may open with an **abstract**, closed by a line holding only `---`:

```markdown
---
title: "From board game to game state"
…
---

Start from a board game every student has handled and ask what a stranger would need to be told to set this exact game up again. That list is the game state, and sorting it is the start of structuring data. Marlon proposed it on Nov 14 for his class and maybe William Stafford's.

---

> In my class, at least, and maybe in Stafford's class, we should actually just go from a board game to how you would represent the data of that board game as a game state

Marlon, Nov 14, in a voice chat with Claude … (the full card goes on as before)
```

- **What it is for.** The abstract is the card's short text everywhere a card is shown small: the short print form, the graph's and the board's side panels. The printed short card is the title, the description, the abstract and the path `/cards/<slug>`; the full text stays on screen. A card with no divider falls back to the derived short text (its quotations with their attribution), so nothing has to be rewritten at once.
- **What it must do: make sense alone and summarize the whole card**, for someone holding only the paper. Two to four sentences, about 25 to 80 words. It says more than the description, which prints just above it, and doesn't repeat it.
- **Marlon's words are optional in it.** Use a line of his when it carries the gist, in quotation marks with his name. When no line of his matches the gist, summarize in plain prose. Any words of his in the abstract also appear below the divider, quoted and sourced there. The abstract is the writer's summary; it doesn't attribute to him anything the full card doesn't support.
- **Below the divider** the card is as before: his words as blockquotes with who, when and where, then what the writer adds, then the closing italic line.
- **Only one divider**, and no other horizontal rules in a card. The 50 to 1,000 words count the whole body, abstract included.
- **Which cards get one.** Not all at once: the cards Marlon marks to print come first. CL says which.

## Two examples

An aphorism, in Marlon's words with their context:

```markdown
---
title: "Games are complex, with many parts"
description: "A game is many parts working at once, which is why it belongs in a unit about going beyond the single work."
kind: aphorism
convolute: mechanics-not-rules
tags: [design, play]
links: [ideas/games-are-complex-with-many-parts, ideas/games-and-interaction-as-the-week-11-theme]
order: 1
sources: ["W11/story.md"]
voice: mixed
author: CL
date: 2026-11-02
week: 11
status: draft
---

> Games are complex; they involve many, many parts.

Marlon, on the Story of Week 11 canvas, as it stood on Nov 2 (mirrored in `W11/story.md`).

The line is his frame for the week. It sits in Unit 3 of the term, "beyond the single work", and it is the reason the week can't be about one finished game: a game is mechanics, pieces, data, players and a room, and each can be looked at by itself.

*CL's reading, Nov 15. Not Marlon's words unless quoted.*
```

An idea that continues it, with links into three other collections:

```markdown
---
title: "From board game to game state"
description: "Take a board game the LL owns and write down, as data, everything you would need to set the same game up again."
kind: idea
convolute: game-state
tags: [database, tabletop, cameras]
audience: [tdm155ai, stafford]
follows: games-are-complex-with-many-parts
links: [photograph-the-neutral-state, activities/tdm155ai/take-apart-a-board-game, prototypes/hybrid/photo-to-game-state, game-state/monopoly]
sources: ["_context/orchestration/20261114/voice-handoff-back.md"]
voice: mixed
author: CL
date: 2026-11-14
week: 11
status: draft
---

> In my class, at least, and maybe in Stafford's class, we should actually just go from a board game to how you would represent the data of that board game as a game state

Marlon, Nov 14, in a voice chat with Claude, as transcribed in the handoff back to Claude Code (section 4). He added that this includes "how you would normalize the data or just structure the data."

(…the card goes on: what the idea is, what it connects to, what it would take…)

*CL's reading, Nov 15. Not Marlon's words unless quoted.*
```

Both are in the folder as cards, with a third (`photograph-the-neutral-state`) that follows the second, so the views have a chain to draw.

## Changes

- 1.0 (Nov 15, 13:46): the shared brief's draft, plus `audience`, `order`, the kind `prototype`, the rule that a link with a slash is a path under `_content/`, `mechanics/<MechanicId>`, and the 50-word rule for one-line quotations.
- Clarification, not a change (Nov 15, 13:53): where the only record of what Marlon said is a transcriber's summary (voice Claude's Slack posts), a card may quote the summary verbatim in a blockquote if the line beneath says whose summary it is. That card is `voice: mixed`. There is no `grows-from` field: the collection card a card grew from is the first entry in `links` that has a slash.
- 1.1 (Nov 15, 15:17): the abstract and its divider, optional per card. Nothing else changed; every v1.0 card is still valid.
- Clarification (Nov 15, 15:17), at Marlon's word: no card is required to quote him; a card may be based on other sources, cited in `sources`. The anchor rule in `sources.md` is withdrawn.
- 1.2 (Nov 15, 15:23): two identifiers renamed to follow Marlon's naming rule ("the LL", not "the Lab"): the audience value `lab` is now `ll`, and the convolute slug `lab-week` is now `ll-week`. One card slug changed for the same reason, with its two inbound links: `educational-games-for-tdm-and-the-lab` is now `educational-games-for-tdm-and-the-ll`. Every card was updated; nothing else changed.
