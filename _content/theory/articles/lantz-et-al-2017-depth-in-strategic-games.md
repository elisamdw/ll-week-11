---
title: "Lantz, Isaksen, Jaffe, Nealen, and Togelius, Depth in Strategic Games (2017)"
kind: article
year: 2017
creators: ["Frank Lantz", "Aaron Isaksen", "Alexander Jaffe", "Andy Nealen", "Julian Togelius"]
venue: "The AAAI-17 Workshop on What's Next for AI in Games?, WS-17-15, pp. 967–974"
file: lantz-et-al-2017-depth-in-strategic-games.pdf
sources: ["Marlon's copy (Desktop/games/15142-68464-1-PB.pdf, added Nov 14, 2026)", "https://researchr.org/publication/LantzIJNT17 (bibliographic record, from search results; not opened)"]
status: researched (segments copied from the stored PDF, page numbers as printed)
author: "TH (Claude Code 5fb1eb52-157a-45df-a553-b9e751b23756, started in ll-week-11 on FAS-DDW32PXW5L)"
---

# Depth in Strategic Games

Frank Lantz (NYU Game Center), Aaron Isaksen, Andy Nealen, and Julian Togelius (NYU), and Alexander Jaffe (Spry Fox), an eight-page workshop paper at AAAI-17, *What's Next for AI in Games?* (WS-17-15), pp. 967–974. © 2017 AAAI; stored here for study. **[The PDF](lantz-et-al-2017-depth-in-strategic-games.pdf)**.

## What it is

The paper looks for a measurable property behind what players mean by **depth**, a game's "capacity to provide a lifetime of study, learning, and improvement" (p. 967). It calls the property **d** and proposes a **strategy ladder**: line up the best possible strategy at each level of **computational resources** (speed, algorithm size, working memory) and count the distinct steps of improvement between random play and perfect play. A deep game has many steps. A shallow one is either all search (no shortcuts help) or one "weird trick" (one rule of thumb solves it). Deep games sit between, in a **semi-ordered** state space where **heuristics** compress the game tree but search is still needed (Figure 2, p. 973, a curve of depth against entropy). The paper ends with AlphaGo's shoulder hit and Kahneman's two systems as the same balance. This is the closest of Lantz's texts to the brief's phrase "games as thinking about thinking": "Deep games require knowledge, explanation, creativity, and cleverness. Modeling depth may help us better understand how to think about these things" (p. 968).

## Segments

**Depth** (p. 967):

> "In this context, depth refers to a game’s capacity to provide a lifetime of study, learning, and improvement. A game with great depth is one that seems to unfold into an endless series of challenging problems and responds to serious thought by continually revealing surprising and interesting things to think about."

**The property d** (abstract, p. 967):

> "We propose a measurable property of a game’s formal system, which we call ‘d’, that corresponds to the capacity of a game to absorb dedicated problem-solving attention and allow for sustained, long-term learning."

**Why bigger is not deeper** (p. 968), the token test:

> "To see why, imagine any existing game and then add a new rule that allows either player, after their turn, to flip a token from side A to side B. This immediately doubles the size of the game’s state space without affecting its depth in the slightest."

**What games teach about thinking** (p. 968):

> "If we can describe what makes certain games interesting in this particular way then we may learn something about “interestingness” in general, about the relationship between information, systems, and meaning."

**The strategy ladder** (p. 969):

> "In other words, the more d a game has, the more it is susceptible to a sequence of partial solutions, each one requiring more time and/or memory to execute, and providing a better approximate solution to the problem of the game."

**The shape of the curve** (p. 971, italics in the original):

> "In either case, the main idea of the model is this: *the shape of the curve reveals something important about the game’s structure.* The shape of the curve reflects how the game responds to the incremental application of computational resources."

**Heuristics as a map** (p. 972):

> "In a sense the heuristic operates as a kind of compression function on the game tree – a map that reveals structural features in the underlying tree. A blurry, tattered map, but a map nonetheless."

**Semi-orderedness** (p. 972):

> "We believe the quality we are looking for is a kind of semi-orderedness of the game’s state space, a level of underlying structure that allows for some useful compression of the game tree but not so much that pure search is never needed."

**What a deep game's culture is made of** (p. 972):

> "This is what the literature that a deep game produces is made of, all the strategy books and blog posts and training videos and forum arguments are part of this lengthy description of the most efficient method for finding the best move in a semi-ordered system under conditions of computational constraints."

**The killer move** (p. 973), on AlphaGo's game 2 shoulder hit against Lee Sedol:

> "Killer moves demonstrate how raw search can outperform even the most powerful rule of thumb."

## For the game (TH proposal)

- (B, C) **The AI climbs a strategy ladder:** the AI's rule table has tiers unlocked by compute (its data centers), from random legal moves, to one heuristic ("build on the cheapest energy"), to heuristics plus look-ahead; the humans see the AI get better at the game as it gets bigger, which is the paper's x-axis made literal.
- (editor) **The token test for student rulesets:** before a group saves a rule in `/game/edit`, it says whether the rule adds a decision or only flips a token; the "rhetoric" field can carry the answer.
- (editor, debrief) **One weird trick check:** after a playtest, ask whether one rule of thumb won the game; if so, the ruleset is shallow and the next edit should break that trick.
- (B) **Heuristic cards for the humans:** humans start with a few rules of thumb on cards ("protect the river first," "never sell the last megawatt"); a "killer move" by the AI is one that breaks a card, and the debrief collects the cards that failed.

## Related

- [Frank Lantz](../lantz-games-thinking-about-thinking.md) and [Julian Togelius](../togelius-playing-smart.md): two of the authors, with their own entries.
- [Jesper Juul, *Half-Real*](../juul-half-real.md): emergence (a few rules combining) is the structure that gives the semi-ordered middle of Figure 2.
- [Ian Bogost, *Play Anything*](../bogost-play-anything.md): fun from working inside limits, the player's side of the same question.
- The companion paper by the same group: [Playing Games Across the Superintelligence Divide (2016)](isaksen-et-al-2016-superintelligence-divide.md).
