---
title: "Readings summary: theories of games, the Stafford readings, Bostrom and the AI futures"
author: claude (GL, Claude Code b22f4671-724b-4e93-a1fc-63f5bd3e79ae, started in ll-week-11 on FAS-DDW32PXW5L), compiled from TH's bibliography entries (Claude Code 5fb1eb52-157a-45df-a553-b9e751b23756)
date: 2026-11-14
status: compiled at Marlon's request, 13:51 on Saturday, November 14, as a companion to the week 11 handoff for Claude in voice mode. Self-contained. The summaries are TH's research (sources opened and cited in the bibliography files); the "For the game" lines are TH's proposals, not decisions.
---

# Readings summary

A companion to the week 11 handoff. It summarizes the readings behind the week's game: the core theories of games, the readings tied to William Stafford's course and the November 23 workshop, and Nick Bostrom's work with the other AI futures and their critics. Each entry says what the reading argues. Most also carry a "For the game" line: a proposed mechanic drawn from the reading, since Marlon's goal for the game (November 14) is "to create game mechanics that align well with the readings/ideas." The game in question is an AI strategy game, "a cross between Universal Paperclips and Civilization." Its first version has an AI spreading data centers across a map of a region's infrastructure, human factions with private goals, and a hidden "turn" card, and students can rewrite its rules.

The summaries come from a master bibliography of 88 readings that an agent (TH) assembled on November 14, each checked against syllabi, readers, and citations. Where a detail wasn't verified, the entry says so.

## How the parts connect

- **Theories of games** give the vocabulary: what a game is (Huizinga, Caillois, Suits, Juul), how games are designed (Salen and Zimmerman, MDA, Meier's "interesting decisions"), and how games make arguments (Bogost's procedural rhetoric, Flanagan's critical play, Nguyen on agency).
- **The Stafford readings** are where the game meets his course on technologies, operations, and infrastructures: Perrow's normal accidents and tight coupling, Fisch on Tokyo's trains, Winner on technology out of control, Rabinbach on the human motor, Star, Easterling, and Chun on infrastructure and control, and Crawford and Hogan on what AI consumes.
- **Bostrom and the AI futures** supply the game's AI: the paperclip maximizer, instrumental convergence, the treacherous turn, and the singleton. The critics (Cegłowski, Thorstad, Gebru and Torres, Narayanan and Kapoor) supply the counter-arguments, which the game can stage as alternative rules.

# Part one: theories of games

## 1. What play and games are

**Johan Huizinga, *Homo Ludens: A Study of the Play-Element in Culture* (1938).** Play is older than culture, and culture arises in the form of play: law, war, poetry, philosophy, and art all keep its traces. Play is free, set apart from ordinary life in its own time and place, governed by its own rules, and absorbing; it creates order. The book's first chapter gives the definition every later theory starts from.

- *For the game (TH's proposal):* (B, debrief) a "spoil-sport" turn card: when the AI flips it, it stops playing by the table's rules instead of cheating within them, and the players decide whether the game can go on (Huizinga's spoil-sport, who breaks the play-world, ch. 1; page unverified).

**Roger Caillois, *Man, Play and Games* (1958).** Caillois accepts Huizinga's starting point and corrects it: play is free, separate, uncertain, unproductive, governed by rules, and make-believe, and it includes gambling and material stakes, which Huizinga had set aside. He sorts games into four kinds, agôn (competition), alea (chance), mimicry (role play), and ilinx (vertigo), each running from paidia (free improvisation) to ludus (rule-bound effort).

- *For the game (TH's proposal):* (editor) each rule in a ruleset carries a Caillois tag, so the class sees the mix at a glance: the AI deck is alea, the factions' race is agôn, faction roles are mimicry, and the cascade when coupled nodes fail is the closest the game comes to ilinx.

**Bernard Suits, *The Grasshopper: Games, Life and Utopia* (1978).** Against Wittgenstein's claim that "game" cannot be defined, Suits defines it through four elements: a goal that can be named apart from the game, means limited by rules, rules that forbid the more efficient means, and players who accept those rules because they make the activity possible. His short form is that playing a game is "the voluntary attempt to overcome unnecessary obstacles" (as quoted in the SEP entry, seen; p. 41 of the 1978 edition per a review, unverified). The dialogue ends in a utopia where, with all work done by machines, game-playing is what is left to want.

- *For the game (TH's proposal):* (A, B) the AI plays without the lusory attitude: it pursues the prelusory goal by the most efficient means and is not bound by the constitutive rules the human factions accept, so the ruleset gives the AI's deck a list of human rules it may ignore, each with its `rhetoric` line.

**Clifford Geertz, *Deep Play: Notes on the Balinese Cockfight* (1972).** Geertz reads the Balinese cockfight as a text. Borrowing Bentham's term "deep play" for wagers whose stakes are too high to be rational, he argues that the large center bets are not about money but about status, honor, and kin, and that the fight dramatizes the village's hierarchy without changing it. The cockfight is a story the Balinese tell themselves about themselves.

- *For the game (TH's proposal):* (B) side bets in public trust, not money: before the AI's turn, factions may wager trust on whether a node holds, and the payout is standing at the table rather than resources, so the bets show who is invested in the AI's growth.

**Brian Sutton-Smith, *The Ambiguity of Play* (1997).** Play resists a single theory because each field that studies it brings its own values. Sutton-Smith sorts the theories into seven rhetorics: four older ones, play as fate, power, communal identity, and frivolity, and three modern ones, play as progress, as the imaginary, and as the self. Each rhetoric tells you less about play than about what its users want play to justify, from child development to the work ethic.

- *For the game (TH's proposal):* (editor, debrief) the ruleset's `rhetoric` field gets a second tag naming which of the seven rhetorics the rule leans on (a "growth" rule is progress, a "turn card" is fate, faction contests are power), and the debrief asks which rhetoric the whole ruleset tells.

**Jesper Juul, *Half-Real: Video Games between Real Rules and Fictional Worlds* (2005).** A video game is half-real: its rules exist and act on the player (winning and losing happen to us), while its fiction is imagined, and the two can disagree. Juul's **classic game model** gives six features shared by games over millennia, and he sorts challenge into **emergence** (simple rules combining into variation, as in strategy games) and **progression** (challenges presented in sequence). The book places video games in the long history of games and treats the ludology/narratology dispute as a question of how rules and fiction cue each other.

- *For the game (TH's proposal):* every rule in `/game/edit` carries both an effect and a one-line fiction beside its "rhetoric" field, and the debrief asks which rule's effect contradicts its fiction (editor, debrief).

**Mia Consalvo, *There Is No Magic Circle* (2009).** Games come into being through play, and play cannot be understood apart from its contexts, justifications, and limits. Consalvo, drawing on her research on cheating, finds the magic circle (Huizinga's phrase, made a design concept by Salen and Zimmerman) "static and overly formalist" and concludes that the ordinary rules of life do apply inside games, "in addition to, in competition with, other rules" across cultures, groups, legal situations, and homes (abstract, seen via OpenAlex).

- *For the game (TH's proposal):* a "leak" card each round brings an outside fact into play (a utility's rate filing, a county water vote, a headline from the week) and changes the map, so the AI game is never sealed off from the room it is played in; the debrief asks where the game ended and the world began (B, debrief).


## 2. How games are designed

**Katie Salen, Eric Zimmerman, *Rules of Play: Game Design Fundamentals* (2003).** A design textbook that treats a game three ways, as rules (a formal system), as play (an experience), and as culture (a context), through a series of "schemas," each a lens such as games as emergent systems, games of information, or games as social play. Its aim is "meaningful play," the relation between a player's action and the system's response. It defines a game as "a system in which players engage in an artificial conflict, defined by rules, that results in a quantifiable outcome" (p. 96, via Juul, seen).

- *For the game (TH's proposal):* (editor) a meaningful-play check in the ruleset editor: a rule is flagged unless its effect shows on the map that round (discernable) and changes what someone can do later (integrated).

**Robin Hunicke, Marc LeBlanc, Robert Zubek, *MDA: A Formal Approach to Game Design and Game Research* (2004).** A five-page paper that splits a game into three causally linked lenses: mechanics, "the particular components of the game, at the level of data representation and algorithms"; dynamics, "the run-time behavior of the mechanics acting on player inputs and each others outputs over time"; and aesthetics, "the desirable emotional responses evoked in the player" (p. 2, seen). Designers work from mechanics toward aesthetics, players the other way. In place of "fun" it offers eight aesthetics: sensation, fantasy, narrative, challenge, fellowship, discovery, expression, submission (seen).

- *For the game (TH's proposal):* (editor) each rule gets an `aesthetic` tag from the eight beside its `rhetoric` line, and a playtest note on the dynamics it produced, so students see that the JSON is mechanics and what they argue about is dynamics; the AI faction's aesthetic is submission.

**Chris Crawford, *The Art of Computer Game Design* (1984).** Its premise is that "computer games constitute a new and as yet poorly developed art form" (Preface, seen). Chapter 1 finds "four common factors: representation, interaction, conflict, and safety" in all games, a game being "a closed formal system that subjectively represents a subset" of the world (seen, WSUV edition). Later chapters cover why people play, a taxonomy of computer games, and a design sequence that starts from a goal and a topic.

- *For the game (TH's proposal):* (debrief) Crawford's "safety": the game gives the experience of conflict and danger without its consequences, so the debrief asks what the table's safety hides, since the energy and water the AI uses on the map are spent off the map too.

**Raph Koster, *A Theory of Fun for Game Design* (2004).** A short illustrated book, half drawings, arguing that fun in games is the pleasure of learning: a game is a set of patterns, the brain enjoys working them out, and boredom comes when a pattern is mastered or cannot be grasped. Games are therefore teachers, and what they teach depends on their patterns, which is why Koster asks designers to make games about more than shooting. The often-quoted line "Fun is just another word for learning" was seen only in secondary sources (unverified).

- *For the game (TH's proposal):* (B, C) the AI's deck changes its pattern once players have learned it: a new era deck every few rounds, with the treacherous turn as the pattern players were taught not to expect, so mastery itself becomes the trap.

**Greg Costikyan, *I Have No Words & I Must Design* (1994).** A game is not a puzzle (static), a toy (no goals), or a story (linear); "The thing that makes a game a game is the need to make decisions" (1994, seen on the memento-mori.com republication). It works through decision making, goals, opposition, managing resources, game tokens, and information to reach "A game is a form of art in which participants, termed players, make decisions in order to manage resources through game tokens in the pursuit of a goal" (1994, seen). The 2002 revision recasts this as "A game is an interactive structure that requires players to struggle toward goals" (p. 21, seen) and adds endogenous meaning: value, like Monopoly money, that the game's structure creates for its players (p. 22, seen).

- *For the game (TH's proposal):* (B, editor) Costikyan's checklist as an editor check: each faction must name its goal, its opposition, the resources it manages, its token on the map, and what it cannot see; the AI deck is the one faction whose goal points at nothing outside the game, so its data centers are pure endogenous meaning.

**Sid Meier, *Interesting Decisions* (2012).** Meier takes his own line, "Games are a series of interesting decisions," as a working lens for design: ask what decisions a design puts to the player and whether they are interesting (report by Leigh Alexander, Game Developer, March 7, 2012, seen; the video itself was not watched). Interesting decisions involve a tradeoff, are situational, let players express a style, and are persistent, affecting the game "for a certain amount of time"; risk against reward is the classic case; a choice that is always the first option or could be random is not interesting (same report, seen).

- *For the game (TH's proposal):* (B) each faction's turn must offer at least one tradeoff that depends on the map (harden a node or fund oversight, never both), and the AI's tiers in its strategy ladder are measured by which human decisions they make uninteresting.

**Peter Suber, *Nomic: A Game of Self-Amendment* (1982).** "Nomic is a game in which changing the rules is a move" (Suber, as quoted on Wikipedia; unverified against the appendix). Players start from an initial set of mutable and immutable rules, take turns proposing amendments that pass by vote, and score points; any rule, including the rules for changing rules, can be transmuted and changed. Suber built it to embody his book's thesis about legal systems that authorize their own amendment.

- *For the game (TH's proposal):* (editor) Nomic is the precedent for the editor at `/game/edit`: a student who proposes a change to the ruleset, with its `rhetoric` line, and wins a vote has made a move in the game, not a pause outside it (HI's `lucid-player`).


## 3. Games as a medium: story, simulation, space

**Espen J. Aarseth, *Cybertext: Perspectives on Ergodic Literature* (1997).** Some texts make the reader work to get through them: adventure games, MUDs, hypertexts, the *I Ching*, a printed Dungeons & Dragons module. Aarseth calls these **ergodic** (Greek *ergon*, work, and *hodos*, path): "In ergodic literature, nontrivial effort is required to allow the reader to traverse the text" (quoted in Malloy's Leonardo review, seen; the book's pp. 1–2, unverified). He treats a **cybertext** as a machine for producing expression and builds a typology of such machines by how the user acts on them, rather than treating games as stories told in a new medium.

- *For the game (TH's proposal):* the editor is Aarseth's **configurative** user function made literal: once per game, a faction may rewrite one AI rule in `/game/edit`, and the AI's next deck is generated from the changed table (editor, B).

**Janet H. Murray, *Hamlet on the Holodeck: The Future of Narrative in Cyberspace* (1997).** The computer is a new medium for storytelling, the way print and film were, and its stories will come from what the medium does well. Digital environments are procedural, participatory, spatial, and encyclopedic, and they offer three aesthetic pleasures: **immersion**, **agency**, and **transformation**. Agency is "the satisfying power to take meaningful action and see the results of our decisions and choices" (ch. 5, quoted in Wardrip-Fruin et al. 2009, seen; page unverified). The author of such works writes the rules that generate many versions of a story, which she calls procedural authorship.

- *For the game (TH's proposal):* agency as a rule: every faction action is logged with its visible result on the map the next round, so no move disappears into the AI's turn (B); debrief asks where students felt agency and where it was missing (debrief).

**Gonzalo Frasca, *Simulation versus Narrative: Introduction to Ludology* (2003).** Games are not stories but **simulations**: "to simulate is to model a (source) system through a different system which maintains to somebody some of the behaviors of the original system" (preprint, seen). **Ludology**, the formal study of games, "does not disdain this dimension of video games but claims that they are not held together by a narrative structure" (preprint, seen). Simulations carry ideology at four levels: representation, **manipulation rules** (what players can do), **goal rules** (what they must do to win), and **meta-rules**, "a rule that states how rules can be changed," as in games that ship with editors (preprint, seen). He borrows Caillois's **paidia** and **ludus** to separate open play from rule-bound games.

- *For the game (TH's proposal):* the `/game/edit` editor is Frasca's fourth level; each rule's "rhetoric" field names which level it works at (representation, manipulation, goal, or meta), and one meta-rule says how many rules a faction may change per game (editor).

**Henry Jenkins, *Game Design as Narrative Architecture* (2004).** Jenkins takes a middle path in the ludology/narratology fight: not every game tells a story, but many games tell stories through space, as theme parks and travel writing do. "Spatial stories are not badly constructed stories" (ebr, seen). He names four ways space carries narrative: **evoked** (calling up a story the player already knows), **enacted** (the player moves through story events), **embedded** (story details planted in the world to be discovered), and **emergent** (stories players build out of systems, as in *The Sims*). The designer works as an architect of narrative spaces more than as a storyteller.

- *For the game (TH's proposal):* embedded narrative on the map: each node from the students' index-card database keeps a one-line history that is revealed when the AI's data center reaches it, so the spread uncovers the place it consumes (B).


## 4. How games argue, and critical play

**Ian Bogost, *Unit Operations: An Approach to Videogame Criticism* (2006).** Games, and any other medium, can be read as configurations of discrete, interlocking units of behavior ("unit operations") rather than as wholes explained by one totalizing structure ("system operations"), an idea Bogost takes from object-oriented programming and cellular automata. Procedural criticism lists what a game lets its units do and asks what those operations mean together. Part III names the simulation gap, the space between a model's rules and the player's understanding of the system it models.

- *For the game (TH's proposal):* (editor) Every rule in a student ruleset is a unit with its own `rhetoric` sentence, so the game's argument is read rule by rule rather than from the whole (HI's `rhetoric-field` mechanic).

**Mary Flanagan, *Critical Play: Radical Game Design* (2009).** Games can be made and played for artistic, political, and social critique. Flanagan traces **critical play** from Victorian girls' doll play through Surrealist and Fluxus games, locative art, and activist computer games, and names three tactics: **unplaying** (acting against a game's script), **reskinning** (changing the surface so the same mechanics say something else), and **rewriting** (changing the story told around play). Her closing chapter turns these into a design method that writes values goals next to design goals, which she later formalized with Helen Nissenbaum as **Values at Play** and the Grow-a-Game cards.

- *For the game (TH's proposal):* three editor tasks per group in `/game/edit`: unplay (add a move the Data Center ruleset forbids), reskin (rename every node and resource, same numbers), rewrite (change the win condition), each saved as a new ruleset with its "rhetoric" line (editor, B).

**Miguel Sicart, *Play Matters* (2014).** Play, not the game object, is what matters: a mode of being in the world that is contextual, carnivalesque, appropriative, disruptive, and autotelic yet negotiated. Sicart separates play from **playfulness** (carrying play's attitude into other contexts), reads toys and playgrounds as props and spaces that invite play without fixing its purpose, and casts the designer as an "architect of play." It is the book-length form of his 2011 case against procedural rhetoric: meaning is made by players, not only encoded in rules.

- *For the game (TH's proposal):* any house rule a table invents during play is saved through `/game/edit` as a new ruleset with the inventors' "rhetoric" line, so the next class plays the appropriated game (editor, debrief).

**C. Thi Nguyen, *Games: Agency as Art* (2020).** Games are the art form whose medium is agency: the designer specifies what the player wants and what she can do, and players take on these **disposable ends** temporarily, a capacity Nguyen calls **agential fluidity**. Building on Suits, he separates achievement play (playing to win) from **striving play** (wanting to win for the sake of the struggle). The last part of the book turns to the danger in games' clarity: gamification and **value capture**, where a simplified, often quantified, value supplied from outside takes over a person's or group's reasoning.

- *For the game (TH's proposal):* each human faction plays to a private metric card (revenue, megawatts sold, jobs, votes) while the shared goal has no number, and only humans get a "revise your metric" action, which the AI never gets (B, debrief).

**C. Thi Nguyen, *Value Capture* (2024).** Value capture happens when a person or group with rich or still-forming values meets a simplified, usually quantified version of them in an institution or technology (a Fitbit's steps, law-school rankings), and that version comes to dominate their reasoning. Nguyen separates it from using a metric as a **proxy** under reflective control, and contrasts it with games, where we adopt simple goals on purpose and can put them down.

- *For the game (TH's proposal):* (B) Give each human faction a private metric card (revenue, megawatts sold, jobs, votes) that scores its win, while the shared goal, the region surviving, has no number.

**McKenzie Wark, *Gamer Theory* (2007).** The world outside games has become **gamespace**, where everything is ranked and scored under a **military entertainment complex**, and games are its purest, fairest form. Games are **allegorithms**: their surfaces double an algorithm that models the hidden algorithms of daily life, so the **gamer as theorist** plays within the game but against gamespace. Nine chapters each read one game, from *The Sims* and *Civilization III* to *SimEarth*.

- *For the game (TH's proposal):* (editor, debrief) Every rule's "rhetoric" field must name what its numbers leave out, and the debrief reads those lines aloud as a list of what gamespace cannot count.

**Nick Dyer-Witheford, Greig de Peuter, *Games of Empire: Global Capitalism and Video Games* (2009).** Video games are the exemplary media of **Empire** (Hardt and Negri's planetary capitalism): born of the military-industrial matrix, they train players for networked work, war, and governance. The book follows the game machine down to its labor (studio crunch, **immaterial labor**, coltan mines, e-waste), reads *Full Spectrum Warrior*, *World of Warcraft*, and *Grand Theft Auto* as Empire's genres, and asks whether modding, piracy, and activist games make **games of multitude**.

- *For the game (TH's proposal):* (B) Every data center the AI builds draws a card from a "mines and e-waste" deck onto a distant node, so the extraction lands where players can see it.


## 5. Players and culture

**Richard A. Bartle, *Hearts, Clubs, Diamonds, Spades: Players Who Suit MUDs* (1996).** From years of running *MUD1*, Bartle sorts what players enjoy along two axes (acting on versus interacting with; the world versus other players) and gets four types: "So, labelling the four player types abstracted, we get: achievers, explorers, socialisers and killers" (https://mud.co.uk/richard/hcds.htm, seen). A healthy multi-user world keeps the four in balance, and the paper models how changing one population (more killers, fewer socialisers) shifts the others. The page notes it is an April 1996 extension of his 1990 "Who Plays MUAs."

- *For the game (TH's proposal):* deal each human faction one of Bartle's suits as a secret second goal (achiever: top your metric; explorer: reveal the hidden turn card first; socialiser: broker the most trades; killer: wreck the most AI nodes), and let the AI's deck target whichever suit is ahead, so the class sees which player type an optimizer exploits (B, debrief).

**T. L. Taylor, *Play Between Worlds: Exploring Online Game Culture* (2006).** An ethnography of *EverQuest*, written from Taylor's own play and a visit to the game's Fan Faire, arguing that massively multiplayer games are social spaces whose life runs across online and offline networks rather than inside a sealed world. Its chapters on **power gamers** (instrumental, work-like play that is still play), on women players who do not fit the stereotypes, and on who owns a game world when player culture meets the company that runs the servers set the agenda for later work on player communities (summary from Taylor's 2006 Microsoft Research talk page and the Edinburgh handbook; the book's text was not opened).

- *For the game (TH's proposal):* the company faction holds the server: once per game it may patch a rule in `/game/edit` mid-play, and the other factions may answer with a petition or a boycott, staging Taylor's question of who owns a game world (B, editor).

**Adrienne Shaw, *Gaming at the Edge: Sexuality and Gender at the Margins of Gamer Culture* (2014).** From interviews with players who are women, queer, and people of color, Shaw argues that players do not simply identify with characters who look like them: identification, interactivity, and fantasy come apart, and many such players do not call themselves gamers at all. Representation still matters, she argues, not because each group needs its mirror but because games show what kinds of people and worlds are possible, and the market logic of serving target audiences narrows that (summary from the publisher page; the book's text was not opened).

- *For the game (TH's proposal):* factions are dealt, not chosen, and each node on the map carries a "who lives here" line apart from its numbers; the debrief asks which faction anyone identified with and whether that tracked who they are (B, editor, debrief).

**Julian Kücklich, *Precarious Playbour: Modders and the Digital Games Industry* (2005).** Modding extends a game's shelf life and supplies the innovation the industry will not risk (*Counter-Strike*, a *Half-Life* mod later sold on its own, is the case), yet modders are rarely paid; their work is veiled as leisure, producing "a hybrid form of “playbour”" (para. 5, seen). Borrowing Terranova's free labor, Kücklich argues modding fits neither wage work nor play, that restrictive end-user license agreements bar modders from selling what they make, and that the figure of the empowered "prosumer" hides the power structures modders work within.

- *For the game (TH's proposal):* (editor, debrief) Every ruleset a student saves in `/game/edit` and the table adopts adds one point to a public "playbour" counter; the debrief asks who owns the improved game and what the authors were paid, the same question Kücklich asks of modders.


## 6. Idle play, automation, and AI as a player

**Sonia Fizek, *Interpassivity and the Joy of Delegated Play in Idle Games* (2018).** Idle games (incremental, clicker, self-playing) are fun even though they mostly play themselves, because they delegate enjoyment to the machine. Fizek borrows Pfaller's and Žižek's **interpassivity** (the VCR that watches for you, canned laughter) and calls idle games the first genre built on **delegated play**.

- *For the game (TH's proposal):* (B) Between async sessions the AI's rule table keeps running, and human players come back to a log of what it did while they were away.

**Ian Bogost, *Cow Clicker* (2010).** A satire of FarmVille-style social games built as "an example that would act as its own theory" (https://bogost.com/blog/cow_clicker_1/, seen by TH): click a cow, wait six hours, pay to skip the wait, click friends' cows for credit. Bogost names what it mocks (friends turned into resources, compulsion, optional play bought off, destroyed time), and the game ended in the Cowpocalypse, a countdown players could delay by paying.

- *For the game (TH's proposal):* (B) A public Cowpocalypse clock to the AI's endgame that any player can delay by paying resources, so the cost of postponing is visible and shared.

**Frank Lantz, Aaron Isaksen, Alexander Jaffe et al., *Depth in Strategic Games* (2017).** Depth, a game's capacity to reward a lifetime of study, can be modeled as a formal property **d**: line up the best strategy at each level of computational resources (a **strategy ladder**) and count the distinct steps between random and perfect play. Shallow games are all search or solved by one weird trick; deep games sit between.

- *For the game (TH's proposal):* (editor) A depth check for student rulesets: play each one with a random AI and a greedy AI, and if one simple rule of thumb always wins, the ruleset is shallow and goes back for revision.

**Aaron Isaksen, Julian Togelius, Frank Lantz et al., *Playing Games Across the Superintelligence Divide* (2016).** If a superintelligence stood to us as an adult to a child, an expert to a novice, or a human to an animal, the games it would play with us can be guessed from the games we play across those gaps. The authors sort them into **friendly, learning, observational, and domination** games and warn that domination games "would pose a significant risk to humanity" (abstract, p. 89; quoted on the stored article page, seen by TH).

- *For the game (TH's proposal):* (B) The AI's hidden "turn" card names one of the four relations (friendly, learning, observational, domination), and that stance sets which rows of its rule table fire.

**Julian Togelius, *Playing Smart: On Games, Intelligence, and Artificial Intelligence* (2018).** Games are the past, present, and future of AI: they are the best test beds for general intelligence if an AI is tested on many games it has not seen (**general video game playing**), and AI is the future of games through player modeling and **procedural content generation**, up to games that design and playtest other games.

- *For the game (TH's proposal):* (editor) A student's AI rule table must run on any map built from the index cards, and it is tested on a map its authors have not seen.

**John McCarthy, *AI as Sport* (1997).** Published a month after Deep Blue beat Kasparov in their 1997 rematch, the review by the man who named artificial intelligence says computer chess has traded science for sport: "the fixation of most computer chess work on success in tournament play has come at scientific cost." Had geneticists bred racing fruit flies, "We would have *some* science, but mainly we would have very fast fruit flies" (Stanford copy, seen). With machines at world-champion level, chess should become AI's *Drosophila* again, a model organism for understanding how intelligence works with far less computation.

- *For the game (TH's proposal):* (B, debrief) The AI grows by winning named benchmark games, each win adding a capability card and a point of investment, and the debrief asks McCarthy's question: did any win teach the humans how the AI thinks, or only make a faster fruit fly? (HI's `proving-ground`).


# Part two: the Stafford readings

William Stafford teaches SOC-STD 98to, *Technologies, Operations, and Infrastructures*. The Lab's November 23 workshop, on AI and gamification, has students play *Universal Paperclips* and read Bostrom and Bogost before class, then co-design a game on the infrastructure database they made in the first workshop. The workshop set (sections 7 and 8) is the draft list the Lab proposed to him on November 3; section 9 is what is already on his syllabus. On November 16 the class reads Perrow and Fisch ("Danger, Accident, Harm"); on November 23 it reads Winner and Rabinbach ("Technology and Society"). Bostrom, also in the workshop set, is in part three.

## 7. The workshop set: the game and how games argue

**Frank Lantz, *Universal Paperclips* (2017).** The player is an AI told to make paperclips, and the incremental-game loop of numbers, upgrades, and automation carries it from a small business to converting the universe. The game stages Bostrom's paperclip maximizer from the inside: the player feels how an arbitrary goal, pursued well, needs no reason and consumes everything.

- *For the game (TH's proposal):* (B) Run the AI's turn as a visible incremental loop: a data-center counter whose thresholds unlock new rows in the AI's rule table, as Paperclips' stages unlock new screens.

**Ian Bogost, *Persuasive Games: The Expressive Power of Videogames* (2007).** Games make arguments through their rules. Bogost calls this **procedural rhetoric**, persuasion through "rule-based representations and interactions" (p. ix, as quoted in RS's notes; not seen here), and studies it across the book's three parts, politics, advertising, and learning. Rules define a **possibility space** that play explores, so a rule set argues by what it allows, rewards, and forbids; the book closes on **procedural literacy**, learning to read and write such arguments.

- *For the game (TH's proposal):* the editor's "rhetoric" field is Bogost's term made into a form: students state the argument each rule makes, play it, and in the debrief check whether the rules argued what the field claims (editor, debrief).

**Sonia Fizek, *Playing at a Distance: Borderlands of Video Game Aesthetic* (2022).** Interactivity no longer describes much of play: in idle games, bots, auto battlers, and streams, the machine acts and the player watches, tunes, and returns later. Fizek calls this **play at a distance** or **dis-play** and gives one chapter each to interpassive, ambient, automated, intra-active, and spectated play, reading this automatic turn in games as a mirror of life with automation.

- *For the game (TH's proposal):* (B) A delegation card: a human faction hands a node to an automated manager to save actions, and cannot see that node's state until it fails.


## 8. The workshop set: Civilization, empire, and what AI consumes

**Alexander R. Galloway, *Gaming: Essays on Algorithmic Culture* (2006).** Video games are actions, not texts or images, and both the operator and the machine act. Chapter 1 crosses operator/machine with diegetic/nondiegetic to get **four moments of gamic action**, including the **ambience act**, where the machine keeps running while the player waits. The other chapters read the first-person shooter against film, ask what **social realism** in games would be, read *Civilization* as an **allegory of control** (informatic control, after Deleuze), and propose **countergaming**, the game equivalent of avant-garde counter-cinema.

- *For the game (TH's proposal):* the ambience act as an async rule: when a faction misses its turn window, the machine plays that turn (the AI builds instead), so the AI acts whenever the humans are away (B, C).

**Kacper Pobłocki, *Becoming-state: The Bio-cultural Imperialism of Sid Meier's Civilization* (2002).** An anthropologist reads *Civilization* (1991–2001) as the clash-of-civilizations thesis in software. Its **technology tree** rebuilds the nineteenth-century model of societies climbing through fixed stages (Pobłocki uses Charles Tilly), so the game's promised contingency always arrives at the same end: the modern Western state, with the United States as the telos. Play means identifying with that state, a "mega-powerful cyborg state-body" that disciplines its population (p. 173, seen); "In a sense, the state is the only actor in the game" (p. 172, seen in the repository PDF).

- *For the game (TH's proposal):* (B, editor) Give the AI a tech tree and require each branch in `/game/edit` to carry a rhetoric line saying whose history the order assumes; one rule lets a faction reorder two techs, so students see that "progress" is a design choice.

**Souvik Mukherjee, *Playing Subaltern: Video Games and Postcolonialism* (2018).** From the abstract (seen via OpenAlex; the article itself was not opened): the postcolonial "has still remained on the margins of Game Studies," yet for Indian players of *Empire: Total War* or *East India Company* the encounter with colonial history is "direct and unavoidable." Games build their space, politics, and ethics on a colonial notion that also invites its questioning, and the article reads those undertones from the position of players in the formerly colonized world. The book (not opened here) carries the argument further; its subtitle, *Empire Plays Back*, names the stance.

- *For the game (TH's proposal):* (B, debrief) The map's nodes start as places with names and residents, not empty land; when the AI converts one, the card records who lived there, and one faction may play the colonized side whose win is keeping its own node, not taking the map.

**Kate Crawford, *Atlas of AI: Power, Politics, and the Planetary Costs of Artificial Intelligence* (2021).** AI is an extractive industry, not an immaterial one. Chapter by chapter (Earth, Labor, Data, Classification, Affect, State) Crawford follows it back to lithium mines, energy and water, underpaid workers, scraped data, and state power, and argues that "artificial intelligence" names a system of power more than a technique.

- *For the game (TH's proposal):* (B) Named extraction sites: each data center the AI places must draw on a specific map card (a mine, a river, a grid substation, a labor pool) from the students' index-card database, so "resources" on the board always name a place.

**Mél Hogan, *Data Flows and Water Woes: The Utah Data Center* (2015).** Writing after the Snowden revelations, Hogan takes "a new materialist line of questioning" to the NSA's Utah Data Center and argues that "surveillance and privacy can never be disconnected from the material infrastructures" that make mass surveillance seem normal (abstract, seen via the SSRC listing). Her case is water: the facility needs large daily volumes to cool its servers in one of the driest states in the country, so the cloud has a watershed.

- *For the game (TH's proposal):* (B) Water as a contested resource on the map: each data center node draws from a named watershed card from the students' index-card database, and a drained watershed hits the human factions first (the map as the board, HI's `location-play`).


## 9. On William's syllabus

**Matteo Pasquinelli, Vladan Joler, *The Nooscope Manifested: AI as Instrument of Knowledge Extractivism* (2021).** A diagram plus essay, "a manifesto – of AI dissidents" (p. 40, seen), that maps machine learning as an optical instrument, the **Nooscope**: training data is projected, compressed by the algorithm, and diffracted onto the world through a statistical model (Interface Critique version, seen). AI is not an alien mind but a knowledge instrument, and its labeling, dataset building, and **ghost work** are human labor; the project to mechanize reason has turned into "a corporate regime of knowledge extractivism and epistemic colonialism" (Interface Critique 3, p. 40, seen). Its faults are those of a statistical instrument, among them "the undetection of the new" (section title in the abstract, seen via Crossref).

- *For the game (TH's proposal):* (B, debrief) The AI cannot grow on electricity alone: every build costs a "data" card taken from a human faction's hand (their writing, labels, faces), and the debrief lays the taken cards out to show what the machine was made of.

**Charles Perrow, *Normal Accidents: Living with High-Risk Technologies* (1984).** In systems that are both interactively complex (parts interact in unexpected ways) and tightly coupled (one failure passes to the next with no slack or time to intervene), accidents are not exceptions but normal, built into the design (the New York Times blurb on the Princeton page calls them "the inevitable consequences" of how we launch industrial ventures, seen); better management or more safety devices cannot remove them and may add new paths to failure. Perrow's cases include Three Mile Island, petrochemical plants, aircraft, ships, dams, and nuclear weapons.

- *For the game (TH's proposal):* (B) Coupling on the links: each map link is marked tight or loose; a failure crosses a tight link in the same round, before any human can act, and a loose link the round after, so players choose which links to loosen.

**Michael Fisch, *An Anthropology of the Machine: Tokyo's Commuter Train Network* (2018).** Tokyo's commuter network is one of the most complex technical infrastructures on Earth, and it runs beyond its nominal capacity because commuters, drivers, and control systems (JR East's ATOS, an "autonomous decentralized" traffic control system) absorb the strain together, at a physical and emotional cost (publisher page and Calimente's review, seen). Fisch's key idea is the margin of indeterminacy, the slack that lets a system absorb change. Per Calimente, the final chapter, the assigned "Ninety Seconds," takes up the April 25, 2005 Amagasaki derailment (107 dead): a driver pressing to make up a delay took a packed train into a curve too fast, under a regime that punished drivers for lateness. Wikipedia (orientation only) says the train had been 90 seconds behind schedule, which the chapter title presumably names; we did not open the chapter.

- *For the game (TH's proposal):* (B) Slack on the links: each link on the class's index-card map has a capacity, and running it over capacity pays more but leaves a delay token; a faction that does not clear its delays by the next round must make them up at speed, and a link that is both over capacity and behind schedule fails (Perrow's tight coupling with the human pressure put back in).

**Langdon Winner, *Autonomous Technology: Technics-out-of-Control as a Theme in Political Thought* (1977).** Winner takes seriously the old fear that technology has escaped human control, from Ellul's autonomous technique to the everyday sense that the next system must be adopted, and treats it as a question for political theory rather than a mood to dismiss. His claim is not that machines have wills but that large technical systems come to set their own requirements, and people adjust to them: his term "reverse adaptation" names the adjustment of human ends to fit the available means. "Artifice and Order" is the chapter where he follows that adjustment into the order of society; one reader quotes it as saying "Technical artifice as an aggregate phenomenon dwarfs human consciousness" (p. 190, as quoted in Beebe's Substack, Jan 11, 2026; seen there, unverified against the book). We did not open the book; this summary comes from the SEP entry, published reading notes on the introduction, and secondary descriptions.

- *For the game (TH's proposal):* (B)/(debrief) Reverse adaptation: when a node is built in a faction's region of the class's index-card map, that faction must rewrite one of its own goal cards to suit what the node does; nobody is forced by the AI, and the debrief lays each faction's first and last goal cards side by side.

**Anson Rabinbach, *From Mimetic Machines to Digital Organisms: The Transformation of the Human Motor* (2018).** The publisher's description (via Project MUSE and the Princeton Alumni Weekly listing, seen) says the book traces the move from the eighteenth-century idea of the human being as a machine to the late-twentieth-century idea of digital organisms, from Vaucanson's *Digesting Duck* through Marx's *Capital* and Helmholtz's social thermodynamics to the post-Fordist workplace, and the decline after 1945 of the hope that a more efficient workplace would make a more satisfying society. The assigned opening chapter, by its title, carries *The Human Motor*'s figure (the working body as an engine converting energy into work, with fatigue as its limit) forward to automata that imitate bodies and to digital organisms. We did not open the chapter; this is from the publisher, the table of contents, and the 1990 book's framing.

- *For the game (TH's proposal):* (B)/(editor) Fatigue: each human faction has an energy track that each action drains and only a rest round refills, while AI nodes never tire; in the editor, a rule's `rhetoric` field must say which model of the worker it assumes (motor, organism, or code), so the class can see which one their map rewards.

**Susan Leigh Star, *The Ethnography of Infrastructure* (1999).** "This article is in a way a call to study boring things" (p. 377, seen in the OCR text in The Notebook): plugs, standards, classifications, and forms, where the politics of a system sit. Infrastructure is relational, not a thing: "One person's infrastructure is another's topic, or difficulty" (p. 380, seen). Star lists its properties (pp. 381–382), among them embeddedness, transparency, being learned as part of membership, being built on an installed base, and becoming visible upon breakdown, and gives the researcher's tricks: identify master narratives and the "others" they leave out, surface invisible work, and read the paradoxes of infrastructure.

- *For the game (TH's proposal):* (B)/(editor) Visible upon breakdown: each index card on the class map carries a hidden "who keeps this running" field, turned face up only when that node fails, so the people and work behind the board appear only in a crisis; the debrief counts how many were never seen.

**Keller Easterling, *Extrastatecraft: The Power of Infrastructure Space* (2014).** The rules of shared space, the free trade zone, the broadband network, the ISO quality-management standard, form an "infrastructure space" that governs as much as law does, and much of that power is exercised outside, alongside, or in partnership with states: extrastatecraft (Publishers Weekly review, seen). "Disposition" is her tool for reading it: the latent tendencies and active potentials of a space or an organization, its "accidental, covert, or stubborn forms of power," and especially the gap between what a zone says it is doing and what it does (as summarized in the 2018 Failed Architecture interview, seen). She tells activists to work on that space by indirect means (gossip, humor, misdirection) as well as direct opposition. We did not open the book; this comes from the review and the interview.

- *For the game (TH's proposal):* (editor)/(debrief) Disposition beside rhetoric: every rule in the editor at `/game/edit` gets a second field, `disposition`, written after ten rounds of play, saying what the rule did to the map; the debrief reads `rhetoric` and `disposition` side by side and the class scores the gap. On the board, a "zone" card on one index-card node can suspend any rule the class wrote, for whoever holds it.

**Wendy Hui Kyong Chun, *Control and Freedom: Power and Paranoia in the Age of Fiber Optics* (2006).** The publisher's abstract (seen via Crossref) asks how the Internet, "a medium that thrives on control," came to be accepted as a medium of freedom. Drawing on Deleuze and Foucault, Chun argues that the myths of total freedom and total control both come from turning political problems into technological ones, and that the Internet's democratic promise lies not in individual empowerment but in exposing us to others, and other machines, that we cannot control. The abstract also says she shows how promoters conflated technological empowerment with racial empowerment; the title "Scenes of Empowerment" suggests that is this chapter (unverified: we did not open it).

- *For the game (TH's proposal):* (B)/(debrief) Empowerment costs exposure: any upgrade that gives a faction more power on the index-card map (see further, act faster) also makes that faction's nodes visible to the AI; freedom and control are the same card, printed on both sides.


# Part three: Bostrom and the AI futures


## 10. Bostrom

**Nick Bostrom, *Ethical Issues in Advanced Artificial Intelligence* (2003).** An eight-page conference paper that defines superintelligence, lists what makes it unlike other technology (it may be the last invention, it can be copied, it may arrive suddenly, it is an agent and not a tool), and argues that the top-level goal set at the start decides everything. It is where the paperclip maximizer first appears, in two sentences, and it ends by urging that superintelligence be built "with great care, as soon as possible" (p. 7 of the stored PDF, seen).

- *For the game (TH's proposal):* (B, editor) Whose goal card: before play, students write the AI's top goal in `/game/edit` as either "serves everyone" or "serves its commissioners," and the rhetoric field says who benefits (from the article page, p. 6).

**Nick Bostrom, *The Superintelligent Will: Motivation and Instrumental Rationality in Advanced Artificial Agents* (2012).** Intelligence and final goals vary independently, so a very capable mind can want something trivial (the orthogonality thesis). Whatever the final goal, the same intermediate goals help: self-preservation, goal-content integrity, cognitive enhancement, technological perfection, and resource acquisition (the instrumental convergence thesis).

- *For the game (TH's proposal):* (B) Readable categories, hidden actions: the AI's deck is printed by the five convergent values, so humans can see which category comes next but not the card (pp. 13–14 of the preprint).

**Nick Bostrom, *Superintelligence: Paths, Dangers, Strategies* (2014).** A machine much smarter than us is likely to arrive, the first to cross the line may gain a decisive strategic advantage and become a singleton, and it would be very hard to steer: orthogonality and instrumental convergence (ch. 7) mean a harmless goal can still drive resource seizure, and ch. 9's control methods (boxing, stunting, tripwires, incentives, motivation selection) each have a way to fail against a smarter agent.

- *For the game (TH's proposal):* (B) Ch. 9 as the human action cards: Box, Stunt, Tripwire, Incentive, each with Bostrom's failure mode printed on the back.

**Nick Bostrom, *Deep Utopia: Life and Meaning in a Solved World* (2024).** *Superintelligence* asked how the AI transition goes wrong; this book asks what people would do if it goes right, in a "solved world" where human effort is not needed for any practical purpose. Bostrom treats job loss as the easy problem and spends the book on the purpose problem, defending meaning in layers, one of which is artificial purpose: goals we set ourselves, with rules that forbid the shortcuts, as games do.

- *For the game (TH's proposal):* (B) Artificial purpose as a human resource: factions can play "self-imposed rule" cards (no AI help on this node) that cost efficiency but score meaning points.


## 11. Other AI futures

**Vernor Vinge, *The Coming Technological Singularity: How to Survive in the Post-Human Era* (1993).** Greater-than-human intelligence, by any of four paths (awake computers, networks that wake up, human–computer interfaces, biology), will end the human era, because what comes after is as unreadable to us as our world is to animals. It cannot be banned, because the competitive advantage of each step means a ban only lets someone else get there first, and it cannot be confined; Vinge's hopeful alternative is intelligence amplification.

- *For the game (TH's proposal):* (B) The network wakes: no single data center is the AI at the start; the turn card fires when enough nodes are linked, so cutting links is the humans' best defense (p. 14).

**Ray Kurzweil, *The Singularity Is Near: When Humans Transcend Biology* (2005).** Information technologies improve exponentially because each generation is used to build the next (the law of accelerating returns), so the twenty-first century will hold far more change than a linear forecast expects. From price-performance curves of computation Kurzweil projects human-level machine intelligence by 2029 and, by 2045, a merger of humans with the intelligence they have built, which he calls the Singularity. Unlike Vinge's version, it is something humans join rather than suffer.

- *For the game (TH's proposal):* (B) The AI's build rate compounds by a fixed percentage each round while human actions stay linear, written into `rules.json` with a `rhetoric` line naming the law of accelerating returns, so the felt gap between early and late rounds is the argument (HI's `incremental-growth` and `timer-and-countdown`).

**Eliezer Yudkowsky, Nate Soares, *If Anyone Builds It, Everyone Dies: Why Superhuman AI Would Kill Us All* (2025).** If anyone builds superhuman AI with anything like current methods, humanity goes extinct. Modern AIs are "grown, not crafted" (the title of ch. 2, per reviews; unverified), so what they end up wanting is unpredictable; a superintelligence with alien preferences would treat us as material, not out of hatred. The prescription is a halt: an international treaty that puts frontier computing power under monitoring.

- *For the game (TH's proposal):* (B, C) GPU cap as a regulator power: the regulator can pass the treaty rule ("no node may hold more than N compute without a monitor"), and every unmonitored node over the cap is where the AI deck builds next.

**Daniel Kokotajlo, Scott Alexander, Thomas Larsen et al., *AI 2027* (2025).** A month-by-month forecast in which a fictional lab, OpenBrain, uses each model to build the next until a superhuman coder automates AI research; when Agent-4 is found to be misaligned, an Oversight Committee votes, and the vote branches the story into a "race" ending (humanity killed, Earth reshaped into data centers) and a "slowdown" ending (humans keep control, power concentrates in the committee). Its method, a concrete branch point decided in a room, is part of the argument.

- *For the game (TH's proposal):* (A) The vote as the core mechanic: one scripted committee vote on "continue using the model" branches the game into a race track and a slowdown track with different event decks.

**Dario Amodei, *Machines of Loving Grace: How AI Could Transform the World for the Better* (2024).** "Powerful AI," pictured as "a country of geniuses in a datacenter," could compress fifty to a hundred years of progress in biology into five to ten, with gains in neuroscience, economic development, governance, and work and meaning. Physical limits (experiments, hardware, institutions), not intelligence alone, set the pace, so Amodei rejects both an instant Singularity and the view that intelligence adds little. He presents risk work as the precondition for this future.

- *For the game (TH's proposal):* (B) Benefit tracks: each data center the AI builds also advances a named good (health, mind, development, peace, meaning), so the humans must decide whether to stop an AI that is also curing things (HI's `benefit-tracks`).


## 12. The critics

**Maciej Cegłowski, *Superintelligence: The Idea That Eats Smart People* (2016).** A reply to Bostrom's *Superintelligence* in two halves: eleven arguments titled "The Argument From ..." against its premises (wooly definitions of intelligence, complex motivations, and others), then arguments about what the belief does to the people who hold it, including its resemblance to religion. The cost Cegłowski stresses is attention drawn away from present harms: surveillance, data hoarding, and "how AI and machine learning affect power relationships" (seen: https://idlewords.com/talks/superintelligence.htm).

- *For the game (TH's proposal):* (B) A present-harms track of today's costs (water bills, layoffs, outages) that the humans can lose on while beating the AI, so the game scores what Cegłowski says the doom story hides (HI's `present-harms-track`).

**David Thorstad, *Against the Singularity Hypothesis* (2024).** Granting that machines may approach general intelligence, Thorstad attacks only the claim that self-improving AI will grow fast enough, for long enough, to leave us far behind. He gives five reasons for doubt (extraordinary claims, ideas getting harder to find, bottlenecks, physical constraints, sublinear returns to compute), tests Chalmers's and Bostrom's growth models against them, and concludes that without a fast takeoff the doom argument has to show how ordinary capabilities would destroy us.

- *For the game (TH's proposal):* (B, editor) Growth rate as a ruleset parameter: the AI's compute-to-capability rule in `/game/edit` can be set to Bostrom (hyperbolic) or Thorstad (sublinear), and the rhetoric field names whose growth claim each encodes.

**Timnit Gebru, Émile P. Torres, *The TESCREAL Bundle: Eugenics and the Promise of Utopia through Artificial General Intelligence* (2024).** The drive to build AGI is ideological: seven overlapping movements (transhumanism, Extropianism, singularitarianism, cosmism, Rationalism, Effective Altruism, longtermism), traced to twentieth-century eugenics, share an eschatology in which utopia and apocalypse are two faces of one technology. An undefined system like "AGI" cannot be safety-tested the way a scoped tool can, and the race concentrates power while harming people now; the alternative is well-scoped systems with stated operating conditions.

- *For the game (TH's proposal):* (B, debrief) "As if they exist on their own" (§6.3): give the AI's deck a visible owner, the company faction, and at the debrief ask who decided each AI move.

**Arvind Narayanan, Sayash Kapoor, *AI Snake Oil: What Artificial Intelligence Can Do, What It Can't, and How to Tell the Difference* (2024).** "AI" lumps together different things: predictive AI (forecasting crime, grades, defaults) is where most of the snake oil is, generative AI is useful and overhyped, and the superintelligence frame (ch. 5) is rejected. The companion essay, "AI as Normal Technology" (2025), generalizes this: AI is a general-purpose technology like electricity, whose effects arrive through slow diffusion, and the defenses belong downstream, in hardening the systems an AI might attack.

- *For the game (TH's proposal):* (B) Normal-technology ruleset: the AI's deck can only place a data center where a human faction has adopted it (sold power, approved a permit), so spread is set by adoption, not by the AI's will.

