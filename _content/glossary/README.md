---
title: "Glossary: game design terms for week 11"
kind: glossary
date: 2026-11-14
author: "TH (Claude Code 5fb1eb52-157a-45df-a553-b9e751b23756, started in ll-week-11 on FAS-DDW32PXW5L)"
status: "draft for Marlon. Each plain definition is TH's; each 'Who says it' line quotes a text that was opened (seen) or marks it unverified. Examples are TH's."
---

# Glossary: game design terms

Marlon, Nov 14 (voice chat): "we should have a little glossary now." The terms that came up: rules, mechanics, procedures, game elements, game state, template, instance. A few more are here because the readings need them. For TDM 155AI on November 18, and possibly Stafford's class. The argument about rules and mechanics is in the [handout](../handouts/rules-and-mechanics.md).

Each term has a plain definition, who uses it and how, and an example from a game most students know.

## Game

**Plainly:** a structure people play inside, with goals, choices, and an outcome.

**Who says it:** Salen and Zimmerman: "A game is a system in which players engage in an artificial conflict, defined by rules, that results in a quantifiable outcome" (*Rules of Play*, 2003, p. 96, as Juul cites it; seen in Juul, not checked against the book). Costikyan puts decisions first: "What makes a thing into a game is the need to make decisions" (2002, p. 11, seen). → [Salen and Zimmerman](../bibliography/salen-zimmerman-2003-rules-of-play.md), [Costikyan](../bibliography/costikyan-1994-i-have-no-words-and-i-must-design.md)

**Example:** Monopoly has an outcome (one player left) and a decision on almost every turn (buy the property or not).

## Rules

**Plainly:** the constraints: what is allowed, what happens when, and how the game ends. In a board game, the players enforce them; in a video game, the program does.

**Who says it:** Salen and Zimmerman split rules three ways: **operational** rules are "what we normally think of as rules: the guidelines players require in order to play"; **constitutive** rules (their spelling: "constituative") are "the underlying formal structures that exist 'below the surface,'" "logical and mathematical"; **implicit** rules are "the 'unwritten rules' of a game," such as etiquette (wording as quoted in course slides, unverified against the book). Juul: in computer games "it is now the computer that upholds the rules," which "frees the player(s) from having to enforce the rules" and "allows for games where the player does not know the rules from the outset" (2003, seen). DeLeon: "Rules in computer games are more like laws of physics, rules in non-computer games are more like laws of society" (DiGRA 2013, seen).

**Example:** Monopoly's rulebook says you collect $200 for passing Go (operational). The odds of landing on each square come from two dice (constitutive). Not hiding your cash is etiquette (implicit). Putting fines on Free Parking is a house rule. In *Super Mario*, no rulebook says how high Mario jumps: "That's just the way the game works" (Marlon, Nov 14).

## Mechanics

**Plainly:** the verbs: the actions a player, or the game itself, can take that change the game.

**Who says it:** Sicart: "methods invoked by agents, designed for interaction with the game state"; "rules provide the possibility space where that interaction is possible"; "rules are modeled after agency, while mechanics are modeled for agency"; and mechanics "can be invoked by any agent, be that human or part of the computer system" ("Defining Game Mechanics," 2008, seen). MDA: "Mechanics are the various actions, behaviors and control mechanisms afforded to the player within a game context" (2004, p. 3, seen). Other designers fold rules into mechanics: Adams and Dormans call mechanics "the rules, processes, and data at the heart of a game" (2012, seen), and Schell's definition is quoted as "the procedures and rules of your game" (p. 41, unverified, secondhand). → [Sicart 2008](../bibliography/sicart-2008-defining-game-mechanics.md), [MDA](../bibliography/hunicke-et-al-2004-mda.md), [Adams and Dormans](../bibliography/adams-dormans-2012-game-mechanics.md)

**Example:** jump, buy, trade, roll, place a tile, draw a card. In our AI game: the AI's *spread*; the humans' *harden*, *repair*, *protest*.

## Game elements

**Plainly:** everything a game is made of, of which mechanics are only one kind.

**Who says it:** Schell's **elemental tetrad**: aesthetics, technology, mechanics, and story. His Lens of the Elemental Tetrad asks: "Is my game design using elements of all four types (Aesthetics, Technology, Mechanics and Story)?" and "Are the four elements in harmony, reinforcing each other, and working together toward a common theme?" (official Deck of Lenses app, seen). This is Marlon's frame: "the design of the game is much, much more than the rules" (Nov 14). Separately, Deterding et al. define gamification as "the use of game design elements in non-game contexts" (2011, in RS's research), a narrower, borrowed sense (points, badges, levels). → [Schell](../bibliography/schell-2008-art-of-game-design.md)

**Example:** *Universal Paperclips*: the mechanics are clicking and buying upgrades; the story is the AI's rise; the aesthetics are its bare text screen; the technology is a web page that runs in any browser.

## Mechanics, dynamics, aesthetics (MDA)

**Plainly:** three layers: the parts the designer builds, the behavior they produce in play, and the feelings that result.

**Who says it:** "Mechanics describes the particular components of the game, at the level of data representation and algorithms. Dynamics describes the run-time behavior of the mechanics acting on player inputs and each others outputs over time. Aesthetics describes the desirable emotional responses evoked in the player" (Hunicke, LeBlanc, and Zubek 2004, p. 2, seen).

**Example:** Monopoly's mechanics (buy, collect rent) produce a dynamic (the rich get richer) and an aesthetic (the dread of the losing player). MDA's own running example is Monopoly (p. 4).

## Procedures and procedurality

**Plainly:** processes a system runs: sequences of rules carried out, usually by a computer.

**Who says it:** Bogost: "Procedures (or processes) are sets of constraints that create possibility spaces, which can be explored through play"; "To write procedurally, one authors code that enforces rules to generate some kind of representation" (2008, p. 122, seen). He takes the word from Murray, for whom "procedural" means the computer's "defining ability to execute a series of rules" (as Bogost quotes her, p. 122; Murray's own text not opened). → [Bogost 2008, with segments](../theory/articles/bogost-2008-rhetoric-of-video-games.md)

**Example:** in our AI game, the deck that spreads data centers each round is a procedure: nobody plays it; it runs.

## Procedural rhetoric

**Plainly:** making an argument through what a system makes happen and lets you do, rather than through words or images.

**Who says it:** "Procedural rhetoric is a general name for the practice of authoring arguments through processes"; its arguments are made "through the authorship of rules of behavior, the construction of dynamic models" (Bogost 2008, p. 125, seen). Marlon reads it as being about "the sort of mechanics and actions people can take rather than the rules," because "it's through the play that the argument is made" (Nov 14); Bogost's own wording leans on rules, and Sicart's "Against Procedurality" (2011) argues Marlon's side. See the [handout](../handouts/rules-and-mechanics.md). → [Persuasive Games](../bibliography/bogost-2007-persuasive-games.md), [Sicart 2011](../theory/articles/sicart-2011-against-procedurality.md)

**Example:** in *Animal Crossing*, paying off your house loan earns you a bigger house and a bigger loan; the game argues about debt without saying a word (Bogost 2008, p. 119).

## Possibility space

**Plainly:** all the moves and situations the rules allow.

**Who says it:** "the myriad configurations the player might construct to see the ways the processes inscribed in the system work" (Bogost 2008, p. 121, seen); for Sicart, rules "provide the possibility space" in which mechanics act (2008, seen).

**Example:** chess's possibility space is vast; tic-tac-toe's is small enough to solve.

## Game state

**Plainly:** everything that is true about a game at one moment: positions, scores, whose turn, what is hidden.

**Who says it:** Sicart defines mechanics as interaction "with the game state" (2008, seen). Costikyan, on Monopoly: "You choose whether or not to buy a property you land on; the game state changes in response to your decision" (2002, p. 11, seen). Juul: in a board game the state is kept on the table by "cards and board pieces"; in a computer game, the computer has "the memory capacity to remember game state" (2003, seen).

**Example:** a photograph of a Monopoly game in progress shows most of its state (tokens, houses, cash); it can't show the order of the Chance deck or anyone's plans. In *Universal Paperclips*, the state is a set of numbers the browser saves (whether it uses `localStorage` is unverified; GL's [Paperclips pages](../paperclips/README.md) have the details). HI's [game-state pages](../game-state/README.md) model Monopoly, Risk, Life, Hold'em, Civilization, Paperclips, and our game this way.

## Template and instance

**Plainly:** a template says what every thing of one kind has; an instance is one particular thing made from it, with its own values.

**Who says it:** programming's "class" and "object": a class is "a template for creating objects" (MDN, seen); "Creating a new class creates a new type of object, allowing new instances of that type to be made. Each class instance can have attributes attached to it for maintaining its state" (Python tutorial, §9, seen). Sicart borrows this vocabulary on purpose: mechanics are "methods," "using concepts from object-oriented programming" (2008, seen). Manovich's "Database as Symbolic Form" (1999) is the reading on data behind media. → [Manovich](../bibliography/manovich-1999-database-as-symbolic-form.md)

**Example:** Marlon's example (Nov 14): in *Breath of the Wild* every horse has the same kinds of properties (the template); your horse, with its name and saddle, is an instance, saved in your save file. In Monopoly, the property card is a template (price, rents); the deed in your hand, with two houses on it, is an instance. In our game, a card from the students' Sept 28 infrastructure database could be the template and each node on the board an instance.

## Tokens and resources

**Plainly:** tokens are the things you move or play; resources are what you spend or protect.

**Who says it:** Costikyan: "A game token is any entity you may manipulate directly"; "Resources are things you must manage efficiently to achieve your goals; tokens are your means of managing them. In a board wargame, combat strength is a resource; your counters are tokens" (1994, seen).

**Example:** Risk's armies are tokens; the territories and the cards you trade in are resources. In our game, energy, water, and trust are resources.

## The algorithm (Manovich)

**Plainly:** the hidden logic a player has to work out to play well.

**Who says it:** "computer games ... appear to be ruled by another logic — that of an algorithm. They demand that a player executes an algorithm in order to win"; the player "gradually discovers the rules which operate in the universe constructed by this game ... she is discovering the algorithm of the game itself" (Manovich 1998 text, p. 5, seen).

**Example:** in *Universal Paperclips*, learning when to switch from clicking to buying autoclippers is learning the algorithm.

## Agency

**Plainly:** the player's power to act and see the act matter.

**Who says it:** Murray: "the satisfying power to take meaningful action and see the results of our decisions and choices" (as quoted in Wardrip-Fruin et al. 2009, p. 1, seen; Murray's text not opened). Nguyen treats agency as the medium of games: designers shape the kind of agent you become. → [Nguyen](../bibliography/nguyen-2020-games-agency-as-art.md)

**Example:** choosing which territory to attack in Risk is agency; rolling the dice for it is not.

## Emergence and progression

**Plainly:** emergence is complex play from a few simple rules; progression is a designed sequence of challenges.

**Who says it:** Juul: emergence is "a number of simple rules combining to form interesting variations"; progression is "separate challenges presented serially" (*Half-Real*, as quoted in the [theory entry](../theory/juul-half-real.md)).

**Example:** chess and Go are emergent; a platformer's level 1-1, 1-2, 1-3 is progression. Our AI spreading by a few rules is emergence; the hidden turn card is progression.
