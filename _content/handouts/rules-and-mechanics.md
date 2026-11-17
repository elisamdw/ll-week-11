---
title: "Rules, mechanics, and the rest of the game"
kind: handout
date: 2026-11-14
for: "TDM 155AI, November 18 (and possibly SOC-STD 98to, November 23)"
author: "TH (Claude Code 5fb1eb52-157a-45df-a553-b9e751b23756, started in ll-week-11 on FAS-DDW32PXW5L)"
status: "draft for Marlon. His words are quoted and dated; every quotation from a reading was checked against a source opened on Nov 14 unless marked unverified; the framing in 'One way to hold it together' and the exercise are TH's proposals."
---

# Rules, mechanics, and the rest of the game

## The point

Marlon, in conversation, November 14, 2026:

> "The design of the game is much, much more than the rules."

He works from Jesse Schell's *The Art of Game Design* and thinks in **mechanics and game elements** rather than rules. On Ian Bogost's procedural rhetoric, he reads it as "talking about more the sort of mechanics and actions people can take rather than the rules," because "it's through the play that the argument is made." And rules may belong more to pre-digital games, where people perform the mechanics and police the turns. Video games have rules too ("a player may jump no higher than one unit of its own height"), but they don't present themselves as rules: "That's just the way the game works."

## Four words

| word | what it is | in Monopoly | in a video game |
| --- | --- | --- | --- |
| **rules** | the constraints: what's allowed, what happens when, how it ends | the rulebook; the players enforce it | the code enforces it; you learn it by playing |
| **mechanics** | the verbs: actions an agent takes to change the game | roll, move, buy, build, trade | jump, craft, attack, buy an upgrade |
| **game state** | everything true at one moment | the board, the deeds, the cash, whose turn | numbers in memory or a save file |
| **game elements** | everything the game is made of | mechanics, plus the theme, the look of the board, the cardboard | mechanics, story, aesthetics, technology (Schell) |

Definitions and sources are in the [glossary](../glossary/README.md).

## Readings that back the point

- **Mechanics are the verbs; rules are the frame.** Miguel Sicart defines game mechanics as "methods invoked by agents, designed for interaction with the game state." Rules "provide the possibility space where that interaction is possible": "rules are modeled after agency, while mechanics are modeled for agency." And mechanics "can be invoked by any agent, be that human or part of the computer system," which covers an AI faction. ("Defining Game Mechanics," *Game Studies*, 2008.)
- **The computer takes over the rules.** Jesper Juul: computer games are "just as rule-based as other games," but "it is now the computer that upholds the rules," which "frees the player(s) from having to enforce the rules" and "allows for games where the player does not know the rules from the outset." (2003 paper behind *Half-Real*.) Chris DeLeon puts it the way Marlon does: "Rules in computer games are more like laws of physics, rules in non-computer games are more like laws of society." (DiGRA, 2013.)
- **Games are decisions, not rulebooks.** Greg Costikyan: "What makes a thing into a game is the need to make decisions" (2002, p. 11); you act through "game tokens," "any entity you may manipulate directly" (1994).
- **The player discovers the logic.** Lev Manovich: in a computer game the player "gradually discovers the rules which operate in the universe constructed by this game ... she is discovering the algorithm of the game itself." ("Database as Symbolic Form," p. 5.)
- **Rules are one corner of the design.** Schell's elemental tetrad puts mechanics beside story, aesthetics, and technology, and his Lens of the Elemental Tetrad asks whether "the four elements [are] in harmony, reinforcing each other, and working together toward a common theme." (Deck of Lenses.)

## Readings that push back

- **Bogost puts the argument in the rules.** Procedural rhetoric makes its arguments "through the authorship of rules of behavior, the construction of dynamic models. In computation, those rules are authored in code" (2008, p. 125). The representation "is composed of the rules themselves," and "we explore their possibility spaces through play" (p. 121). So for Bogost the play is how you *meet* the argument; the rules are where it *lives*. Miguel Sicart's "Against Procedurality" (2011) is the reply on the player's side.
- **Designers often mean rules when they say mechanics.** Ernest Adams and Joris Dormans: mechanics are "the rules, processes, and data at the heart of a game." Dormans: "'Game mechanics' is often used as a synonym for rules but the term implies more accuracy and is usually closer to an implementation" (2012). Schell's own definition is quoted as "the procedures and rules of your game" (p. 41, unverified), with rules as one of his kinds of mechanics.
- **MDA pairs them.** The MDA paper sets the player's "Rules / System / Fun" against the designer's "Mechanics / Dynamics / Aesthetics" (2004, p. 2; the one-to-one pairing is read from the figure's labels).

## One way to hold it together (TH's proposal)

Both camps describe the same three things. **Rules** bound the possibility space. **Mechanics** are the verbs that act inside it. **Game state** is what the verbs change. In a board game, people do all three: they read the rules aloud, perform the mechanics with their hands, and keep the state on the table. In a video game, the computer enforces the rules and keeps the state, so all a player meets is the verbs and how the world answers: "that's just the way the game works." That is why "mechanics" is the better word for designing video games, and why the rules still matter: someone, or something, is always enforcing them. Schell's question, from his Lens of Rules, makes a good opener: "Who enforces the rules?"

## Try it (TH's proposal)

1. **A board game, photographed.** Take Monopoly, Risk, or Life. List three rules, three mechanics, and everything a photo of the board after five turns can and can't tell you about the game state.
2. **The same game as a video game.** Which rules would disappear from the player's view? Which mechanics stay as buttons?
3. **Our AI game.** Name the AI's verbs and the humans' verbs. Which rules bound them? Which game elements (story, aesthetics, technology) would you change so the game argues something different, without touching a single rule?

## Sources

All open on November 14, 2026 unless marked.

- Bogost, Ian. "The Rhetoric of Video Games." In *The Ecology of Games*, ed. Katie Salen, 117–140. MIT Press, 2008. Open access; stored with excerpts in [theory/articles](../theory/articles/bogost-2008-rhetoric-of-video-games.md).
- Costikyan, Greg. "I Have No Words & I Must Design." *Interactive Fantasy* 2 (1994); revised in *Computer Games and Digital Cultures Conference Proceedings*, Tampere, 2002, 9–33.
- DeLeon, Chris. "Rules in Computer Games Compared to Rules in Traditional Games." DiGRA, 2013.
- Dormans, Joris. *Engineering Emergence*. PhD diss., University of Amsterdam, 2012; and Adams, Ernest, and Joris Dormans. *Game Mechanics: Advanced Game Design*. New Riders, 2012 (publisher's sample).
- Hunicke, Robin, Marc LeBlanc, and Robert Zubek. "MDA: A Formal Approach to Game Design and Game Research." 2004.
- Juul, Jesper. "The Game, the Player, the World: Looking for a Heart of Gameness." *Level Up*, Utrecht, 2003, 30–45.
- Manovich, Lev. "Database as a Symbolic Form." 1998 text on manovich.net; *Convergence* 5, no. 2 (1999).
- Schell, Jesse. *The Art of Game Design: A Book of Lenses*. Morgan Kaufmann, 2008. Lens texts from the official Deck of Lenses app; the p. 41 definition is secondhand, from Ralph and Monu (2014).
- Sicart, Miguel. "Defining Game Mechanics." *Game Studies* 8, no. 2 (2008). Read via the Internet Archive.
- Sicart, Miguel. "Against Procedurality." *Game Studies* 11, no. 3 (2011).

Each reading has a page in the [bibliography](../bibliography/README.md).
