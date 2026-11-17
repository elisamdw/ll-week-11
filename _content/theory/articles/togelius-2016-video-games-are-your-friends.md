---
title: "Julian Togelius, AI Researchers, Video Games Are Your Friends! (2016)"
kind: article
year: 2016
creators: ["Julian Togelius"]
venue: "arXiv:1612.01608v1 [cs.AI], 6 December 2016, 16 pages; a chapter based on Togelius's keynote at IJCCI 2015"
file: togelius-2016-video-games-are-your-friends.pdf
sources: ["https://arxiv.org/pdf/1612.01608v1 (the PDF downloaded and stored, from arXiv)", "https://arxiv.org/abs/1612.01608 (arXiv abstract page, opened; gives the licence)"]
status: researched (segments copied from the stored PDF; page numbers are the PDF's own page count, 1–16)
author: "TH (Claude Code 5fb1eb52-157a-45df-a553-b9e751b23756, started in ll-week-11 on FAS-DDW32PXW5L), with a research helper"
---

# AI Researchers, Video Games Are Your Friends!

Julian Togelius (New York University), a 16-page chapter posted to arXiv on 6 December 2016 (1612.01608v1), written up from his keynote at IJCCI 2015 "in an attempt to be accessible to a broad audience." arXiv distributes it under its non-exclusive distribution licence (arxiv.org/licenses/nonexclusive-distrib/1.0); stored here for study from the arXiv copy. **[The PDF](togelius-2016-video-games-are-your-friends.pdf)**.

## What it is

The short case that Togelius's book *Playing Smart* (2018) expands, and the paper his sibling entry already cites (abstract, p. 6, p. 12). Part one, **what video games can do for AI**: robots are too slow and expensive to learn on; board games test too narrow a range of thinking; single-game competitions reward engineering tricks over intelligence; so test agents on unseen games (the **General Video Game AI Competition**, games written in the **Video Game Description Language**) and, eventually, generate the games too. He borrows Legg and Hutter's definition of intelligence as average performance across all possible problems. Part two, **what AI can do for video games**: a future open-world game that invents cities, sub-games, and its own rules as you play, and an **edit mode** that turns a designer's sketch into a playable game. He calls the whole "equal parts propaganda and science fiction" (p. 2). For the week's theme it is the optimist's text: AI made in games, games made by AI, and the claim that inventing AI is humanity's most important task.

## Segments

**The stakes, as he states them** (p. 2):

> "The most important thing for humanity to do right now is to invent true artificial intelligence (AI): machines or software that can think and act independently in a wide variety of situations. Once we have artificial intelligence, it can help us solve all manner of other problems."

**How to read it** (p. 2):

> "It is instead meant as an accessible, informal and inspirational introduction as well as a long-form argument. It is equal parts propaganda and science fiction."

**Fun is learning** (p. 4):

> "Indeed, to some extent the fun in playing a game consists in learning them and when there is nothing more to learn we largely stop enjoying them. This suggests that better-designed games are also better benchmarks for artificial intelligence."

**Competitions reward the trick, not the mind** (p. 5):

> "But in most cases, the improvements were not because of better AI algorithms, but because of even more ingenious ways of using these algorithms for the particular problems. Sometimes this meant relegating the AI to a more peripheral role."

**An endless supply of games** (p. 7):

> "For the GVG-AI competition to reach its full potential as a test of general AI, we need an endless supply of new games. For this, we need to generate them."

**His test for intelligence** (p. 9):

> "An AI that can play almost any video game and create a wide variety of video games is, by any reasonable standard, intelligent."

**Game AI today** (p. 10):

> "The kind of AI that goes into most video games deals with pathfinding and expressing behaviors that were designed by human designers."

**A game that rewrites itself** (p. 11):

> "Based on this, the game constantly adapts itself to be more to your liking, for example by giving you more story, challenges and experiences that you will like in that new city which you reached by driving five hours in a randomly chosen direction. Or perhaps by changing its own rules."

**Edit mode** (p. 11):

> "So you simply switch the game engine to edit mode and start sketching a game idea. A bit of a storyline here, a character there, some mechanics over here and a set piece on top of it. The game engine immediately fills in the missing parts and provides you with a complete, playable game. Some of it is suggestions: if you have sketched an in-game economy but have no money sink, the game engine will suggest one for you"

**Strong players play like machines** (p. 12):

> "Once you have a strong game-playing AI, you might also need to restrict it or otherwise modify it so that it plays the game in a human-like manner; it is common that strong AI players play in a somewhat machine-like way"

## For the game (TH proposal)

- (editor) **Togelius's edit mode, small:** `/game/edit` checks a student ruleset the way his engine does (p. 11): if the AI has an energy income but no sink, or a node no rule can reach, the editor flags it before play.
- (B, editor) **Unseen rulesets:** test each group's AI deck against a ruleset its authors have not seen (p. 6's rule, p. 7's endless supply): groups swap decks before the playtest, and the debrief asks whose AI held up on a map it was not built for.
- (B, C) **The AI that changes its own rules:** a late-game AI card lets the AI rewrite one row of its own rule table (p. 11, "Or perhaps by changing its own rules"), visible to everyone; this is the hidden turn made legible.
- (debrief, all) **Propaganda or science fiction?** Read p. 2's first sentence aloud after play and ask the room whether the game they just played agreed with it.

## Related

- [Julian Togelius, *Playing Smart*](../togelius-playing-smart.md): the 2018 book; the sibling quotes the abstract, p. 6, and p. 12 of this paper.
- [Isaksen et al., Playing Games Across the Superintelligence Divide (2016)](isaksen-et-al-2016-superintelligence-divide.md) and [Lantz et al., Depth in Strategic Games (2017)](lantz-et-al-2017-depth-in-strategic-games.md): the same NYU group, on games with unequal minds and on depth.
- [Bostrom, *Superintelligence*](../bostrom-superintelligence.md): the p. 2 claim, read from the other side.
- [C. Thi Nguyen, "Value Capture" (2024)](nguyen-2024-value-capture.md): a game score as a clean measure is what Nguyen warns about outside games.
