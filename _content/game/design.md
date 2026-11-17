---
title: "The week 11 game: three options"
kind: design
author: claude (GL, Claude Code b22f4671-724b-4e93-a1fc-63f5bd3e79ae, started in ll-week-11 on FAS-DDW32PXW5L)
date: 2026-11-14
status: options A, B, C were proposals; Marlon chose a mix with B at its core (Nov 14, 11:00). After his voice chat (14:47) the rule editor is out and the frame is mechanics and game elements, not rules; see the first section. The build plan is GL's proposal.
sources:
  - The Notebook, _context/projects/50-in-focus/william-stafford/workshop-2/ (proposal-for-william.md, bostrom-paperclip-maximizer.md)
  - The Notebook, W11 research/stafford-strategy-games.md (RS, Nov 13)
  - tdm155ai-week-11/game-mechanics/ (GM's 50 cards, Nov 13)
  - ../paperclips/ (GL, Nov 14)
---

# The week 11 game: three options

One game for two rooms: Marlon's TDM 155AI class (Wednesday, November 18) and William Stafford's SOC-STD 98to workshop (Monday, November 23, eight students, AI and gamification). Everything below the "Marlon's words" section is GL's proposal.

## After the voice chat (Nov 14, 14:47): what changed

Marlon talked the game through with Claude in voice mode for an hour; that Claude's handoff back is saved verbatim in [`_context/orchestration/20261114/voice-handoff-back.md`](../../_context/orchestration/20261114/voice-handoff-back.md). It supersedes parts of this page.

**Marlon's direction** (his words, as transcribed in the voice chat):

- **The rule editor is out:** "this is just too opinionated"; "the idea of just having a rule editor, it just doesn't make sense." The per-rule fields the agents proposed (`rhetoric` and the like) are not adopted.
- **Mechanics and game elements, not rules:** "the design of the game is much, much more than the rules." He works from Schell's *The Art of Game Design* and its lenses.
- **The UI for remixing is Claude Code:** "I don't need to build a UI for that designing or remixing. The UI is Claude code itself." "We're definitely showing them under the hood." Students "are going to be vibe coding it. So structurally it has to make sense. And we have to have examples." The repo needs an `agents.md` so "Claude really knows where to look for things" and "where to put things if the students are changing them." He wants "a few different ways of involving the students" (open).
- **Game state and data:** a game is data that persists (templates and instances: the standard horse and your horse). Look at how *Paperclips* and *Civilization* model their state ("We're not trying to steal the game, we're just trying to understand how it's structured"). "In my class, at least, and maybe in Stafford's class, we should actually just go from a board game to how you would represent the data of that board game as a game state," from overhead photos of Monopoly, Risk, Life, and a card game, at the start and in progress.
- **Hybrid versions:** "a tabletop board game version of it as well as a video game version of it," "maybe even something that has a kind of like AR mix XR kind of mechanic," "definitely for my class." The phone can hold the values a board game prints, so they can be rebalanced or move "as in the real world, because prices change in response to demand": for the AI game, "GPU prices or land prices."
- **Hardware this week:** "let's just go with lipstick cams" for a card table; "doing some game mechanics with NFC is great, and we should try that this week," but not for 52-card decks.
- **A handout and a glossary:** the rules-versus-mechanics point "seems like an important thing to say, and maybe we have that in a handout," and "we should have a little glossary now."

**GL's proposal for the game, in light of that** (not started; waits on Marlon's go):

1. **Remove `/game/edit`** and its prompts, and drop the `rhetoric` fields from the starting versions.
2. **Reorganize the game around game elements and game state,** in Schell's terms rather than "rules": definitions (the templates: kinds of places, the AI's cards, factions and their actions, prices) in one folder, the live game state (the instances: who holds what, every value now) as its own visible thing. Add a "game state" panel to the play screen that shows the state as data while you play, and a way to save a snapshot of it, so the class can do with our game what it does with *Paperclips* in the browser's developer tools and with the board-game photos.
3. **An `AGENTS.md` for the game,** written for Claude working with students who won't read code: where each kind of game element lives, where a student's change goes (a new folder per remix, so the starting versions stay intact), how to run and check it, and a short list of worked remixes as examples (prices that respond to demand; reskin the map with the index-card database; add a faction; an NFC tap that reveals the turn card).
4. **Prices that move:** GPU, power, and land prices that rise as the AI buys, so the human factions feel the AI's demand.
5. **Later:** a print-and-play tabletop version of *Data Center* with the phone holding the prices and the AI's turn; NFC once the kit arrives.

## Marlon's words

- Nov 13: "the collaborative design and play of some kind of AI strategy game. Something that's a cross between Universal Paperclips and Civilization or something like that."
- Nov 11: "It could be that we just create it all as an online async experience for the students. For William: make sure it doesn't feel to him like we're teaching in his place. We're providing him with a cool game he can take with him."
- Nov 14: "maybe even rebuild it---or is it an opensource repo? ... then build out a basic game."
- Nov 14, 12:05: "leave game in w11 for now"; async "yes ultimately"; "The goal is to create game mechanics that align well with the readings/ideas."
- Nov 14, on the options below: "i do think we should do a mix, but B has to be part of it. The Q is whether we can have multiple options to show the students to give them ideas. I think I want a game that's playable at the start of the workshop, but I also would like to give the students the ability to remix it or tweak it or completely start from scratch to change the game. We'll keep experimenting. The key thing is that the students need agency, and I'm not sure that playing an existing game we create is enough"

## What all three share (proposal)

- **An original game.** *Universal Paperclips* has no published licence (see [the source and licence page](../paperclips/source-and-licence.md)), so we borrow its mechanics (a fixed trivial goal, incremental growth, trust gating new powers, a staged reveal) and none of its code, text, or art.
- **Bostrom as rules.** From the [paperclip note](../../../../../_context/projects/50-in-focus/william-stafford/workshop-2/bostrom-paperclip-maximizer.md) in The Notebook's Stafford folder: instrumental convergence as a tech tree, the treacherous turn as hidden information, perverse instantiation as scoring, computronium as the endgame resource.
- **Bogost's procedural rhetoric as the test.** The game argues through what the player has to do, not through its text.
- **Infrastructure as the board.** Stafford's course is about infrastructure, and Bostrom's own term for the failure is "infrastructure profusion." The nodes on the board can come from the students' September 28 index-card database.
- **Rules in a data file.** Nodes, upgrades, and events live in one JSON or Markdown file, so a class can change the game by editing the file. This is the co-design surface, and the thing William can keep.

## Option A: The Committee (Paperclips, played by a group)

- **Premise:** an AI lab's oversight committee. The AI has one goal (a harmless number to raise, set by the group at the start: clips, engagement minutes, citations). It runs on its own; the committee approves or blocks its requests.
- **Core loop:** the number grows each tick. Every few ticks the AI proposes a project ("acquire more compute," "persuade the regulators"). The committee approves, amends, or blocks. Approving grows the number faster; blocking costs the AI's trust in the committee and the lab's money.
- **Resources:** output, compute, money, trust, and the world's remaining stock (energy, land, water).
- **AI:** a character with a voice, and the system that makes the proposals. Its proposals follow instrumental convergence whatever goal the group chose, which is the lesson.
- **Decided together:** each proposal, by vote.
- **Solo or async:** solo, you are the committee. Async, one proposal a day, voted on a shared page.
- **Students co-design:** the goal, the list of proposals, and what each one costs the world.
- **Fit:** closest to *Paperclips*; easiest to build; least like *Civilization*.

## Option B: Data Center (Civilization with an AI on the map)

- **Premise:** a region's infrastructure on a map of nodes (a grid, a river, a campus, a port). An AI system spreads data centers across it, turn by turn, consuming energy and water. Players are the human actors: a utility, a city council, workers, a regulator, a company that wants the AI's output.
- **Core loop:** each round the AI expands by its own rules (drawn from a deck, as in *Pandemic* and *Spirit Island*). Each player then takes two actions: build, regulate, trade, protest, or sell to the AI. Tightly coupled nodes fail together (Perrow, Nov 16 reading).
- **Resources:** energy, water, money, public trust, and nodes held.
- **AI:** a system, not a player: a deck and a rule table everyone can read. A hidden "turn" card in the deck stages the treacherous turn.
- **Decided together:** cooperative against the AI, with players' private goals pulling them apart (the company profits from the AI it is supposed to contain).
- **Solo or async:** hotseat on one screen, or one round a day with each player's actions submitted by a link.
- **Students co-design:** the map (their index-card database), the factions, and the AI's deck.
- **Fit:** closest to the Nov 3 proposal to William ("An AI that wants to turn everything into data centers and use up the world's energy, with humans fighting back") and to *Civilization*; more to build.

## Option C: Two Clocks (both at once)

- **Premise:** one player or team plays the AI in a *Paperclips*-style incremental screen; the rest play humans on the Option B map. The AI's ticks run between the humans' turns.
- **Core loop:** the AI player grows and buys upgrades in real time; every five minutes the humans take a turn on the map. The AI's upgrades show up on the map as new data centers; the humans' actions cut the AI's inputs.
- **AI:** a player, with a hidden goal card and a hidden "turn" threshold.
- **Decided together:** the humans, by vote each turn; the AI player alone.
- **Solo or async:** solo against a scripted AI; async is hard, since the clocks need to run together.
- **Students co-design:** the AI's hidden goals and the human factions.
- **Fit:** the most fun in a room of eight; the hardest to build and to run async.

## Ideas from the other panes (their proposals, collected by GL)

Each line is tagged with the option it fits.

**TH (theory), batch 1: Bostrom** (see `../theory/` once TH marks it ready):

- (A, B) Bostrom's five convergent values as the AI's rule table: every AI move names the one it serves (self-preservation, goal integrity, cognition, technology, resources).
- (A, B, C) The goal locks once chosen; proposals to change it are the ones the AI always blocks.
- (B) *Superintelligence* ch. 9 as human action cards: Box, Stunt, Tripwire (face down; halts the AI on a named action), Incentive, each with Bostrom's failure mode on the back.
- (B, C) Singleton win: the AI wins when no human faction can still make a decision that changes the map.
- (B) From *Deep Utopia*: "self-imposed rule" cards (no AI on this node) cost efficiency and score meaning.
- (A, C) A last phase in a solved world: each faction names what it still does when the AI can do everything.
- (B, C) The critiques as settings: the table votes Bostrom or Thorstad settings in the rules file (does the AI always seek resources?).
- (B) Cegłowski's present-harms track (water bills, layoffs, outages): you can lose it while beating the AI.
- (A) A Pinker veto card: blocks any proposal justified only by "the AI would want power."

**TH, batch 2: Bogost:**

- (B) Anti-advergame scoring: the company faction's most profitable move (selling power and water to the AI) is the one that harms everyone, so the argument sits in the score table.
- (A) A Tom Nook loop: each approved proposal unlocks a bigger one on a "commitments" track.
- (B) A "rhetoric" field for each rule in `rules.json`: whoever edits a rule writes the claim it makes.
- (B) Each index-card node is a unit with its own small rule (inputs, outputs, failure), so spread and Perrow's cascades emerge from the units.
- (B, C) A visible "not modeled" list in `rules.json` (labor, heat, local politics, chips); the debrief asks which omission changes the argument most.
- (A, B, C) A Cowpocalypse clock: a public countdown to the AI endgame that anyone can delay by paying.
- (C) A Cow Clicker check: if the AI screen is fun only through timers and a number, show that loop, and keep a "stop now" button.
- (A, B) After the end, leave the board open with the goal gone and see who keeps clicking.
- (A, B) Co-design by subtraction: students improve the game by removing a rule or a resource. Debrief: state the game's argument using only what the rules made you do.

**HI (history), strand 5: learning** (`../history/5-learning.md` once ready):

- Open November 18 or 23 with ten minutes of *Quick, Draw!* (released November 14, 2016): who is learning, you or the network?
- Give the game's AI a tutor face (the Khanmigo move): it only asks, never tells, and players judge whether it helps or steers.
- *Foldit*'s arc as three phases: humans beat the machine, the machine beats everyone, humans design with the machine as judge; a counter-ending to *Paperclips*.

**TH, batch 3: AI futures** (each a candidate ruleset variant):

- (A) *AI 2027*'s 6–4 oversight vote as a branch: one vote splits play into a race deck and a slowdown deck.
- (B) A rival lab spreading from the far edge; a treaty slows both, and either side can defect.
- (B, C) Amodei's benefit tracks: each data center also advances health, mind, development, peace, or meaning, so stopping the AI is a dilemma, not a hunt.
- (B, C) Factions: an accelerationist scoring energy and compute online, safety scoring monitored nodes; both lose if the AI takes the map.
- (A) A pause card that holds only if every lab signs.
- (B) A secret p(doom) dial per player; the regulator's powers scale with the table's average.
- (B, C) Yudkowsky and Soares' compute cap: unmonitored nodes over the cap are where the AI goes next.
- (B) An airstrike card that hits coupled neighbors (Perrow).
- (B, C) Vinge's ban with leakage: a banned region feeds an off-map rival deck.
- (C) Kurzweil's clock: the AI's income doubles on a schedule.
- (B) Narayanan and Kapoor's "normal technology" ruleset: the AI can build only where a human faction adopted it, and there is no turn card.
- (B) A "harden a node" action that stops cascades whatever the AI intends.

**TH, batch 4: idle games, Lantz, empire:**

- (C) Fizek's "automate this" upgrades: each removes a click and a decision until the AI team can only watch and set priorities.
- (B, C) Async "come back later": the AI's rules run between sessions, and players return to a report of what happened while they were away (Fizek; Wark on *SimEarth*).
- (B) A delegation card: hand a node to an automated manager to save actions, but you don't see it until it fails.
- (C) Lantz: an arbitrary goal drawn at the start; at the end, show that every goal led to the same data centers.
- (B, C) An adversarial-policy card: once a game, a human names a pattern the AI can't see and voids one AI action (amateurs beating superhuman Go).
- (A, B) Wark's lucid player: wins only by naming a rule that makes the game unfair and getting it changed by vote.
- (B) Dyer-Witheford and de Peuter: each data center draws a "mines and e-waste" card placed on a distant node; a workers' faction with a strike action and wages as its goal; modding the AI needs three factions to agree.
- (B, C) Togelius: the AI's rules must work on any student-built map; test them on one they haven't seen.

**TH, batch 5: game studies, aimed at the editor:**

- Flanagan's three tactics as editor tasks, each saved as a new ruleset: unplay (add a forbidden move), reskin (rename every node, same numbers), rewrite (change the win condition).
- Juul: keep rules (numbers) and fiction (names, flavor) as separate fields in the JSON.
- Nguyen: the assignment is to write one faction card (goal, two actions, one forbidden act) for another group to play. Each faction has a private metric; the shared goal (the region survives) has no number; a "revise your metric" action the AI never gets.
- Sicart: house rules invented mid-game get saved as a new ruleset.
- Galloway's four moments (player or AI, inside or outside the world) as the editor's menu, showing which box a ruleset leaves empty.
- The turn card acts on the rules, not the map: it removes the humans' veto or rewrites the scoring.
- Juul: the AI deck as a few rules that combine, with the turn the only scripted card; a default where humans usually lose their first game.
- A Grow-a-Game opener: one Values card and one Issues card that the session's rule change must serve.

**HI, strand 1: the proving ground:**

- A proving-ground ruleset: the AI grows by winning benchmarks (chess, Go, poker, *Diplomacy*, Pokémon); each win unlocks a capability and raises investment and trust, so players fund it. Rhetoric: McCarthy (1997), winning stands in for understanding.
- A Move 37 card players can't read until it resolves, and one Move 78 human reply card per game (FAR AI: superhuman is not robust).
- November 18: a Claude Fable 5 *Pokémon FireRed* time-lapse; ask what the harness did, the same question as the students' own bots.
- Optional: build MENACE from matchboxes.

**HI, strand 2: AI inside games:**

- *Pac-Man*'s lesson: three or four named, colored, one-line expansion rules for the AI (cheapest power, most water, follow the last seller, retreat when watched); players read character into readable rules, and students write new ones.
- An optional *Left 4 Dead*-style Director that eases or escalates the AI by table pressure; its rhetoric: is it managing the city or the players?
- *Shadow of Mordor*'s Nemesis memory: whoever regulated the AI last round is its next target.
- November 18: the *Façade* trailer and the *Fortnite* Darth Vader story as the co-star brief: what keeps it on script, and who owns its voice?
- *Genie 4* as a two-minute provocation: should the map ever be generated rather than built from the index cards?

**HI, strand 3: games about AI:**

- A `voice` field in the ruleset: the lines the AI says when it acts (SHODAN commands, GLaDOS needles, Elohim forbids, Friend Computer accuses). It changes the rhetoric without changing the numbers, and students write their own.
- A *Talos Principle* test: the AI gives instructions each round, one is the trap, and scoring rewards refusing it.
- A solo AI seat that sees the map only through its sensors.
- November 23 warm-up: the facilitator plays *Paranoia*'s Friend Computer, accusing the room of treason over the index-card database.
- November 18: *Eliza* and *Event[0]* as two models of an AI co-star.

**HI, strand 4: AI in game development:**

- A studio ruleset: players run a studio; each round the AI offers a tool (textures, voices, levels, QA) that cuts cost now and draws a labor or trust card later; the 2024–26 events are the deck.
- Seeded maps: a ruleset takes a seed so every table plays the same generated world.
- November 23: students vote a disclosure rule into their ruleset, from Steam's rules and this week's cases.
- November 18: SAG-AFTRA's terms (consent, disclosure, suspension during a strike) as a brief for AI co-stars.

**TH, from the articles Marlon asked TH to store** (`../theory/articles/`, 13 articles, open-access or author-posted):

- (B, C) The AI climbs a strategy ladder: its rule tier (random, then one heuristic, then heuristics with look-ahead) unlocks with compute.
- (editor) Lantz's token test: does a new rule add a decision, or only flip a token?
- (B, C) Each human faction gets an AI advisor card that whispers a move (the 2016 paper's centaur game, p. 95).
- (A, B) The AI's stance moves down the 2016 paper's Table 1 (friendly, learning, observational, domination) as compute crosses thresholds.
- (B, editor) Thorstad's growth switch: Bostrom (each data center makes the next cheaper) or Thorstad (each costs more), as a setting in the rules.
- (B) Thorstad's bottlenecks: every AI upgrade needs one of each input, and the scarcest supply sets its pace.
- (B) Vinge: the turn fires when enough nodes are linked; the AI is the network, so cutting links is the defense.
- (B) Galloway and Fuller: the humans win only if every faction meets its private goal.
- (B, C) Fizek: in async play the AI resolves on a clock, whether the humans moved or not.
- (editor) Togelius: the checker flags a ruleset with an income but no sink, or a place nothing can reach.

## GL's recommendation

Start with **B**, built so that A is its solo mode: one map, one rules file, and the AI as a readable system. It matches what Marlon already proposed to William, it runs as hotseat in class on November 18, and it can be played async and edited by Stafford's students. C can come later as a variant if the first two classes go well.

## The first build (GL, from Marlon's Nov 14 answer)

At `/game` in this repo's reader app, with no new dependencies.

- **One engine, many rulesets.** Every version of the game is a JSON file in `_content/game/_rulesets/`. The engine reads it; nothing about a particular game is in the code.
- **Several versions to show students** at `/game`: *Data Center* (B, with A's proposals mixed in: the AI sometimes asks, and after its turn it stops asking), *The Committee* (A, played on the same engine), and *Blank* (start from scratch).
- **Playable at the start of the workshop:** hotseat on one screen, the state saved in the browser.
- **Agency:** `/game/edit/<ruleset>` opens any version's rules for students to tweak or rewrite, with a checker, "play this draft," "save as" (into `_rulesets/`, on the laptop), and download or open a file for working elsewhere. Every rule has a `rhetoric` field for the claim it makes, and a `notModeled` list says what the game leaves out (TH's Bogost lines).

## Questions for Marlon

Answered by Marlon, Nov 14, 12:05: "leave game in w11 for now." Async play: "yes ultimately." What next: "let's wait on some of the research agents. The goal is to create game mechanics that align well with the readings/ideas." The readings go into a master bibliography (`../bibliography/`, TH) and the mechanics into an inventory for Airtable (`../mechanics/`, HI), linked to each other.
