---
title: "The card graph"
description: "What the week 11 cards are as a graph today, counted, and the options for reading the same Markdown files as a graph and a database without a second source of truth."
author: "KG (Claude Code d866c393-d63d-47f7-8892-a79be7b17173, started in ll-week-11 on FAS-DDW32PXW5L)"
date: 2026-11-16
status: "draft: KG's description and proposal, Nov 16. Part 1 is a count of what is in the files. Part 2 is KG's proposal for Marlon, through KL; none of it is decided. Not Marlon's words unless quoted."
---

# The card graph

Marlon's words this is answering, as quoted in [CL's vision](../../_context/orchestration/20261115-cards/vision.md) (Slack voice posts, Nov 15; only the words in quotation marks are his):

> but we want to get one step past this by having some graph and database-like structures, in addition to the markdown docs

Slack, Nov 15, 11:07, as summarized by voice Claude, in a post about the truth being in the documents.

> also for portfolios--like knowledge graph for learning but also showing--again the collapse of summative back into formative

Slack, Nov 15, 08:09, his typing.

And on Nov 16, to MZ, as quoted in the workspace's shared brief: "(and maybe help with node graph architecture)".

Part 1 says what the graph is today. Part 2 sets out the options and KG's recommendation. Part 3 lists what is built and what waits on him.

## Part 1. The graph as it is

### Where it lives

Nowhere but the cards. Every node and every edge below is read from the frontmatter of a file in `_content/cards/`, each time a view loads (`getCards` and `getCardGraph` in `nextjs/lib/cards.mjs`). There is no database and no saved index. The only other files are the arrangements in `_content/cards/_layouts/` (positions on the board and the graph, print sets, and any link drawn by hand on the graph), and none exist yet.

### The nodes

| Node | What it is | How it is named |
| --- | --- | --- |
| **Card** | One file in `_content/cards/`, in the [card format](format.md). | Its slug: `the-room-is-the-board`. |
| **Thing in another collection** | A file a card links to: an idea, a game idea, an activity, a prototype, a reading, a theory or history page, a game-state example, a learning page, or a row of the mechanics table. The card graph knows its title, description and whether it exists; it does not read its links. | Its path under `_content/`, without `.md`: `prototypes/hybrid/the-room-is-the-board`, `mechanics/cooperation`. |

Convolutes, tags and audiences are values on a card, not nodes. Kind, voice, status, author, date and week are columns.

### The edges

| Edge | Written as | Direction | What it means (format v1.2) |
| --- | --- | --- | --- |
| **follows** | `follows: <slug>`, one per card | from the card to the card it continues | Luhmann's continuation. Chains read in order; two cards following one card make a branch. Cards only, never a loop. |
| **links** | `links: [...]` | written one way, read both ways | Luhmann's cross-reference. Untyped by design. A bare slug is a card; a path with a slash is a thing in another collection. |
| **grows from** | the first entry in `links` with a slash | from that thing to the card | Not a field: a reading of `links` (format 1.0 clarification). The thing in another collection the card grew from. |
| **convolute** | `convolute: <slug>`, one per card | card to bundle | Benjamin's bundle. Membership, not an edge between cards. |
| **shared tags** | `tags: [...]` | none | Two cards with a tag in common. Not stored; the graph computes it. |
| **shared audience** | `audience: [...]` | none | Two cards for the same occasion. Not stored; nothing draws it. |

No file outside `_content/cards/` links back to a card (checked Nov 16: no `cards/<slug>` reference anywhere else under `_content/`). Every reverse edge ("linked from", "followed by") is computed by the views.

### What each view draws

| View | Nodes | Edges | Grouping |
| --- | --- | --- | --- |
| `/cards` (list) | cards | none drawn; order follows `follows` | sections by convolute, reading order inside |
| `/cards/<slug>` | one card and its neighbours | follows and followed by; links to cards; linked from; links to other collections, the first marked *grows from* | none |
| `/cards/convolutes` | cards | `follows` as order and indentation (a branch is indented) | by convolute |
| `/cards/chain/<slug>` | the cards of one chain | `follows`, back to the first card and forward through every branch | none; crosses convolutes |
| `/cards/graph` | cards, plus small nodes for things in other collections (none at first; those of filtered or focused cards on request) | follows (pink arrow), links (grey line), grows from (dashed green), shared tags (dotted, off at first, each card's best three; since Nov 16 scored by how rare the shared tag is), links drawn by hand (saved in the layout) | boxes by convolute; re-layout by kind or first tag; since Nov 16, the lenses in Part 3 |
| `/cards/board` | cards placed by hand | none | frames by hand; Tidy by kind, convolute or first tag |
| `/cards/print` | cards | `follows` as order; the foot names the card it follows | by convolute |

### The counts, Monday Nov 16, 08:12 EST

From `node scripts/graph-stats.mjs` at the repo root (`--list` adds the orphans, the chains and any broken links; `--json` gives everything as JSON). The script has no dependencies and reads the files the same way `nextjs/lib/cards.mjs` does. The deck grows while this workspace writes (178 cards by 08:15), so the table is the baseline at commit `ded8908`, 169 cards; run the script for today's numbers.

| | Count |
| --- | --- |
| Cards | 169 |
| Things in other collections that cards link to | 232: mechanics 68, activities 46, game ideas 25, ideas 23, prototypes 18, learning 15, bibliography 11, theory 8, game state 6, history 4, paperclips 3, game 2, media, glossary and handouts 1 each |
| of which linked by two or more cards | 107 |
| `follows` edges | 81 (21 cross from one convolute to another) |
| `links` between cards | 642, which is 474 pairs; 168 pairs link both ways; 343 of the 642 cross convolutes |
| `links` to other collections | 464 |
| grows from | 145 cards (14 of them grow from a collection's `README`, the collection as a whole rather than one thing in it) |
| Links or `follows` that point at nothing | 0 |
| Orphans (no `follows` and no card link, either way) | 0 |
| Cards with only one card edge | 1 (`hands-over-the-board`) |
| Cards nothing points at (no inbound link or continuation) | 18 |
| Connected components | 1: every card reaches every other through `follows` and `links` |
| Chains (trees of `follows` of two or more cards) | 21, holding 102 cards; 15 branch points; 7 chains cross convolutes |
| The longest chain | 8 cards, twice: `session-a-play-take-apart-remix` → `change-one-card` → `take-apart-a-board-game` → `photo-to-game-state-then-read-a-save-file` → `play-two-theories-of-ai` → `remix-a-mechanic-with-claude-code` → `a-mechanic-for-your-final-project` → `a-taste-at-the-closer` (Wednesday's class, through six convolutes); and `stafford-workshop-in-the-room`'s chain, also 8 |
| The largest chain | `design-and-play-an-ai-strategy-game`: 11 cards, 6 deep |
| Most linked-to cards | `design-and-play-an-ai-strategy-game` 17, `the-week-11-ai-game` 16, `prices-that-move` 15, `paperclip-loop` 13, `remix-a-mechanic-with-claude-code` 13 |
| Tags in use | 25; `design` on 74 cards, `play` on 64, `autonomy` on 45 |
| Card pairs sharing a tag | 7,248 of the 14,196 possible pairs (51%) |
| Card pairs sharing an audience | 9,889 (70%) |
| Kinds | idea 82, activity 25, mechanic 24, prototype 20, aphorism 7, reading 5, question 4, fragment 2 |
| Voice | mixed 124, drafted 44, marlon 1 |
| Status | draft 168, seed 1 |

**What the counts say**, KG's reading:

1. **The deck is not short of links; it is dense.** No orphans, one component, about 6.6 card edges per card on average. The problem the graph view has is too many lines, not too few. "Make orphans visible" has nothing to show today; what is worth showing is the 18 cards nothing points at, and the one thinly tied card.
2. **Shared tags no longer discriminate.** Half of all pairs share a tag, because `design` and `play` sit on 138 cards between them. The graph's suggested links score one point per shared tag, so they are dominated by the two commonest tags.
3. **The links already carry types, by where they point.** Of the 464 links into other collections, 154 go from a prototype or an activity card to a mechanic (a card that plays a mechanic), 22 of the 24 mechanic cards link to their own row in the mechanics table (the same thing in two places), and 10 from a reading card to the bibliography (a citation). The kind of the card and the collection of the target say what the link means without a new field.
4. **Chains are the deck's arguments and sessions.** 60% of cards sit in a chain, and the two longest are the plans for Wednesday's class and William Stafford's workshop. They cross convolutes, which the graph's convolute boxes pull apart.
5. **Half the links cross convolutes** (343 of 642). That is Luhmann's point about cross-references, and it is the strongest argument for a view of the convolutes themselves as a graph.

## Part 2. The architecture: options and a recommendation

KG's proposal, Nov 16. Nothing here is decided; KL takes it to Marlon one question at a time.

### The rule every option keeps

**The Markdown files are the only source of truth. Everything else is derived, can be deleted and rebuilt, and is never edited by hand.** A card's frontmatter is its row in the database and its edges in the graph; the body is the document. Each edge in any derived form names the one file it is written in, so a question about any edge ends at a file a person can open.

One thing breaks this rule today: a link drawn by hand on `/cards/graph` lives only in `_layouts/graph.json`, not in a card. None exist yet. The fix is in option 1.

### Option 1. A derived graph.json (recommended; built Nov 16, see Part 3)

One function builds the whole graph from the files, in one shape, and two things serve it:

- **For the views:** a route, `/cards/graph.json`, computed when it is requested, so it is never stale and there is nothing to commit.
- **For Claude Code and scripts without the app running:** `node scripts/graph-stats.mjs --graph` prints the same JSON, so `jq` and Claude can query the deck from the folder alone (CL's vision, option 4: "a folder-only demonstration").

The shape, a small property graph:

```json
{
  "format": "ll-cards-graph/0.1",
  "generatedAt": "2026-11-16T13:12:06Z",
  "convolutes": [{ "slug": "game-state", "letter": "D", "title": "From the board to the data" }],
  "nodes": [
    { "id": "the-room-is-the-board", "type": "card", "file": "_content/cards/the-room-is-the-board.md", "title": "…", "description": "…", "kind": "prototype", "convolute": "room-as-board", "tags": ["space"], "audience": ["tdm155ai"], "voice": "mixed", "status": "draft", "author": "CM", "date": "2026-11-15" },
    { "id": "mechanics/cooperation", "type": "outside", "collection": "mechanics", "file": "_content/mechanics/mechanics.csv", "title": "Cooperation", "found": true }
  ],
  "edges": [
    { "source": "the-room-is-the-board", "target": "mechanics/cooperation", "type": "links", "implied": "plays-mechanic", "in": "_content/cards/the-room-is-the-board.md" },
    { "source": "change-one-card", "target": "session-a-play-take-apart-remix", "type": "follows", "in": "_content/cards/change-one-card.md" }
  ],
  "drawn": [{ "source": "…", "target": "…", "in": "_content/cards/_layouts/graph.json" }]
}
```

- Edges point the way they are written (a card to what it names), and `in` is the file that holds them.
- `type` is what the format says: `follows`, `links`, `grows-from`. `implied` is a reading of the link from the card's kind and the target's collection (finding 3): `plays-mechanic` (prototype or activity to `mechanics/`), `same-as` (a mechanic card to its own row), `cites` (to `bibliography/`, `theory/`, `history/`), `index` (to a collection's `README`), and `answers` (a `reading` card whose first link is a card of kind `question`, by KL's convention of Nov 16, 08:13, for the `research-questions` convolute). It is labeled as derived, and a writer never types it.
- `drawn` holds links made by hand on the graph, apart from the cards' own, so they are visible as proposals until someone adds them to a card's `links`.

**Cost.** Format: none. Code: the shared builder (a dependency-free module, `nextjs/lib/card-graph.mjs`, that both the route and the script import), the route, and `--graph` on the script. The views keep working as they are and can move onto the JSON one at a time.

### Option 2. Typed edges in the format (waits on Marlon)

`links` is untyped on purpose (format v1.2). Three ways to add types where a card needs them:

| | How | Cost | KG's view |
| --- | --- | --- | --- |
| **2a. Implied types only** | Option 1's `implied`, from kind and collection | none in the format | Covers the commonest cases today. Do this first. |
| **2b. A few typed fields** | New optional lists in frontmatter, each also counted as a link: `answers` (a card answering a `question` card), `contradicts` (two cards that pull against each other), and, if wanted, `builds-on`, `plays` | format v1.3; the checks; a colour each in the graph's legend; writers have to choose | Recommended, small: start with `contradicts`, the one relation a link cannot express and the week needs (the `agency-and-rhetoric` convolute is about Nguyen against Bogost). `answers` no longer needs a field: KL's convention of Nov 16 (an answer is a `reading` card with its question first in `links`) lets option 1 imply it. `builds-on` overlaps `follows`; `plays` is implied by option 1. |
| **2c. Types inside the link** | `links: [contradicts:nguyen-and-bogost-pull-apart]`, or inline in the body (`[[contradicts::slug]]`, the way Dataview and Logseq write attributes) | breaks the rule that a link is also its URL; every reader of `links` changes | Not recommended. |

### Option 3. Things in other collections as first-class nodes

| | How | Cost | KG's view |
| --- | --- | --- | --- |
| **3a. Linked, derived (today, plus option 1)** | They stay small nodes; graph.json gives each its title, kind and the cards that link to it | none | Recommended. 107 of them are shared by two or more cards: they are the joins between cards, and a lens can show them. |
| **3b. Read their own links too** | The builder also reads `links`/`sources` in the other collections' frontmatter | per-collection parsers: the collections use different formats (`ideas/` has `kind: build`, `concept`; `learning/` has 25 kinds; `mechanics` is a CSV) | Later, collection by collection, if a view needs it. |
| **3c. The other collections adopt the card format** | Rewrite about 400 files as cards | large: each collection's format, its views and its writers change; HL's learning graph is JSON by design | Not recommended. CL's vision: "not a copy of the stacks". The 22 mechanic cards that repeat a row of the mechanics table show the cost of copying already. |

### Option 4. A database you can query (waits on Marlon)

The frontmatter table in `format.md` is the schema, and the two checks enforce it. With graph.json, a database is a query over it: `jq` for one question, or, for SQL, `node scripts/graph-stats.mjs --sqlite` writing a throwaway file with Node's built-in `node:sqlite` (no install), tables `cards`, `edges`, `tags`, `outside`. It would be gitignored and rebuilt each time. **Cost:** a script flag, no format change. It is the same move as the Sept 28 index cards turned into a database, which may make it worth showing in William Stafford's workshop on Nov 23; that is Marlon's call.

### What a learning harness needs from it

HL's [learner's graph](../learning/format.md) (v0.2, Nov 15) is a different graph on purpose: one learner, one topic, JSON as the truth, propositions with `requires`, chains of premises to a conclusion, and attempts that show what was learned. The card graph is the LL's, Markdown as the truth, many topics. KG does not propose merging them. What the harness can take from the cards, if HL wants it, is an export: a convolute as a topic, a `follows` chain as the `plan`, each card's `description` as a proposition's `statement`, and the card's path as a `source`. That works because slugs never change, which the format already promises. **Cost:** one export function, when HL asks.

### What a portfolio needs from it

Marlon's "knowledge graph for learning but also showing" asks that the same graph be the working surface and the thing shown. The files already hold most of what a portfolio needs:

- **A chain by date:** `date` is the day the thought dates from. When the card was written and changed is in git (first and last commit per file), which the builder can add as derived columns without a field.
- **A convolute as a section:** the convolutes page is already one.
- **The trace from formative to summative:** `status` (seed, draft, ready) and `voice` (whose words) per card, over time from git.
- **Whose cards:** `author`. In this repo authors are panes and Marlon; a student's portfolio would live in the student's own folder, with no student names here.

A portfolio view (`/cards/portfolio?convolute=` or a print form, chains by date, sections by convolute, status shown) needs no format change. It is CL's vision option 5 ("the deck becomes the week's report"). It waits on Marlon.

### Models compared

From KR's research note of Nov 16, `W11/research/graph-models.md`, written by a research subagent that cited only pages it opened (its sources and what it could not confirm are listed at its foot). The findings below are that note's, with its URLs; the "for the deck" column is KG's reading.

| Model | Node | Edge | Typed? | Truth lives in | For the deck (KG) |
| --- | --- | --- | --- | --- | --- |
| **Luhmann's Zettelkasten**, as the Niklas Luhmann-Archiv describes it | a slip with a fixed number, never changed | placement by number (a continuation, or a branch filed after its parent); written references (*Verweise*) to other numbers; a keyword register | No label on the slip. The editors sort references by form and position (near, outline, distant, collective); KR found no statement from Luhmann himself sorting them | paper; the digital edition keeps one TEI-XML file per slip side | `follows` is the placement, `links` the references. Untyped links with kinds read from form and position is option 1's `implied`, not option 2's typed fields |
| **Obsidian** | a Markdown file (or a heading or block) | wikilinks or Markdown links; backlinks derived; links can sit in typed properties; Canvas edges | Links no; a property's name gives a link a key; Canvas edges carry a free-text label, no type | plain files: `.md` with YAML properties, `.base` views, `.canvas` JSON | The same rule as ours: files are the truth, backlinks and database views (Bases) are derived |
| **Roam and Logseq** | the block (pages too) | page and block references; `attr:: value` attributes | Plain references no; attribute names are keys; Logseq's database version adds typed `Node` properties limited by tag, and "bidirectional properties" | Roam: a Datascript database. Logseq OG: Markdown. Logseq's database version: SQLite (split announced Apr 24, 2026) | Logseq moved its truth from files into SQLite; option 4 keeps SQLite derived and disposable instead. Its computed reverse properties are what the card page already does |
| **Property graph (Neo4j, openCypher) and RDF** | a labeled node with properties; or a resource named by an IRI | a directed relationship with exactly one type and its own properties; or a triple whose predicate is an IRI | Always | a graph database; RDF can be plain text files (Turtle, N-Triples) | graph.json is a small property graph: each edge has a type and properties (`in`, `implied`). A Turtle or Cypher export from it would be derived, not a second truth |
| **Tana** | everything is a node | references (mirrors of one node); fields that point to nodes | References no; fields are named, of nine types, and "Options from supertag" limits their targets | Tana's hosted workspace (where it is stored isn't stated on the pages opened); export as Markdown or JSON | `kind` and `convolute` work like light supertags; a template of fields per kind is a checker rule, not a new edge |

Sources, as listed in KR's note: the Luhmann-Archiv's description of the Zettelkasten (https://niklas-luhmann-archiv.de/assets/texts/nachlass/zettelkasten.html) and its tutorial (https://niklas-luhmann-archiv.de/assets/texts/best%C3%A4nde/ZK/tutorial.html); Luhmann's 1981 essay in English (https://zettelkasten.de/communications-with-zettelkastens/); Obsidian Help (https://obsidian.md/help/links, https://obsidian.md/help/properties, https://obsidian.md/help/bases); the JSON Canvas spec (https://jsoncanvas.org/spec/1.0/); Logseq's database-version docs (https://github.com/logseq/docs/blob/master/db-version.md) and split announcement (https://logseq.io/p/e3YDyX5AYr); Neo4j (https://neo4j.com/docs/getting-started/graph-database/); the W3C RDF 1.1 Primer (https://www.w3.org/TR/rdf11-primer/); Tana (https://outliner.tana.inc/learn/features/fields). The Roam column rests on third-party pages only, the weakest row.

**What the comparison changes in KG's proposal:**

1. **It supports the recommendation.** Four of the five keep links untyped and give them keys or kinds some other way: Luhmann by form and position, Obsidian and Logseq by the property's name, Tana by the field. Only the property graph and RDF type every edge, and they are databases or exports, not where people write. The deck already has keys (`follows`, `links`) and option 1 reads kinds from where a link points, which is the Luhmann move. A typed field like `contradicts` (2b) stays the one addition worth asking Marlon about.
2. **Tags as entry points, not edges.** Luhmann's register lists "as a rule at most four" slips per keyword and leaves the rest to the references (KR's note, quoting the archive). The deck's tags do the opposite: at the baseline `design` sat on 74 of 169 cards and, drawn as edges, shared tags connected half of all pairs. A **register** view, each tag with the three or four cards that best open it (by inbound links, from graph.json), would use tags the way Luhmann did. No format change. New option, waits on KL.
3. **A collective card per convolute.** Luhmann put a slip at the head of a topic block listing up to 25 references with their terms (KR's proposal from the archive's description). The deck's convolutes page is that, derived; a writer could also put one by hand, as an `order: 0` card of kind `fragment`. Waits on KL; no format change.
4. **Exports, all derived from graph.json.** A `.canvas` file (JSON Canvas 1.0: nodes, and edges with `fromNode`, `toNode`, `label`) would open the graph in Obsidian, which is where Marlon keeps his own vault; N-Triples or Cypher would let the deck be queried in SPARQL or Cypher. Each is one function. Only the canvas export has a reader in the LL today. Waits on Marlon.
5. **Not adopted: wikilinks in frontmatter.** KR's note proposes writing `follows` and `links` as quoted wikilinks so that Obsidian reads the deck natively. That changes every card's links and breaks the format's rule that a link is also its URL. The canvas export (4) gets most of the benefit without it.

## Part 3. What is built, and what waits

**Built (KG, Nov 16, with KL's agreement at about 08:17):**

- **The builder,** `nextjs/lib/card-graph.mjs`, with no dependencies: `buildGraph` (the shape in option 1), `chainsOf`, `graphStats` (the counts in Part 1) and `convoluteGraph` (the convolute lens). The app reads the files with `lib/cards.mjs` and hands them to it; the script reads them with its own small reader and hands them to the same function, so the two can't count differently.
- **`/cards/graph.json`** (http://localhost:3111/cards/graph.json), built on every request; `?counts=1` adds the counts. Without the app: `node scripts/graph-stats.mjs --graph`. A question to Claude Code about the deck can start from either, for example `node scripts/graph-stats.mjs --graph | jq '.edges[] | select(.implied == "cites")'`.
- **`scripts/graph-stats.mjs`**, the counts, now through the builder (`--list`, `--json`, `--graph`).
- **In `/cards/graph`:**
  - **Suggested links by rarity.** A shared tag scores `log(cards / cards with the tag)`, so two cards sharing `nfc` outrank two sharing `play`, and a tag on most of the deck scores nothing (finding 2). Hover a dotted line for the tags and the score.
  - **Lens: nothing points here.** Dims every card except those no card links to or continues (finding 1); **Zoom to them** frames them.
  - **Lens: a chain.** Pick one of the chains (longest first); its cards keep their places, the rest dim, each card shows its step (1, 2, 3; a branch is 3b, 4b) and the view frames the chain. **Lay out as a path** moves only the chain's cards into a row above the rest, left to right, a branch on its own row below; **Re-layout** puts every card back (finding 4). Use a named graph (`?name=`) to keep a path without changing the main arrangement.
  - **Lens: the convolutes.** A side panel draws the convolutes on a circle, by letter, with a line for each pair that links, as thick as its links and follows. Click a convolute to filter the graph to it; click a line or a row in **Most linked pairs** to light the cards whose links cross between the two (finding 5).
- **A fix in `lib/cards.mjs`:** a link to `mechanics/README` showed as "not found" on the card page; it now finds the collection's README.

Checked: the route and the script give the same counts; at 08:24 the builder read 6 `answers` edges from KR's first reading cards (`what-a-model-sees-in-a-board-photo` answers `can-a-model-read-the-board-from-a-photo`, and five more), with no field added; in headless Chrome each lens lit the cards it should (31 for nothing points here at 08:21, the 8 steps of the longest chain, 17 cards for the most linked pair of convolutes) with no errors in the console.

**Waits on KL:** a register view (tags as entry points, Models compared, point 2) and collective cards per convolute (point 3), both without a format change.

**Waits on Marlon, through KL:** a typed field (2b: `contradicts`); exports to `.canvas`, N-Triples or Cypher (Models compared, point 4); the SQLite export (4); a portfolio view; whether the other collections stay linked (KG recommends they do); an export to HL's learner graph.

*KG's description and proposal, Nov 16. Not Marlon's words unless quoted.*
