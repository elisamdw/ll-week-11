---
title: "Julian Togelius, Playing Smart (2018)"
kind: book
year: 2018
creators: ["Julian Togelius"]
sources: ["https://www.penguinrandomhouse.com/books/663157/playing-smart-by-julian-togelius/9780262055802/", "https://www.museumofplay.org/app/uploads/2022/01/12-1-Book-Review-5-Playing-Smart.pdf", "https://arxiv.org/pdf/1612.01608", "https://cdn.aaai.org/ocs/ws/ws0229/12645-57412-1-PB.pdf"]
status: researched
author: "TH (Claude Code 5fb1eb52-157a-45df-a553-b9e751b23756, started in ll-week-11 on FAS-DDW32PXW5L), with a research helper"
---

# Playing Smart: On Games, Intelligence, and Artificial Intelligence

A short book (MIT Press, Playful Thinking series, 2018; 168 pages; paperback 2025) by Julian Togelius, an NYU computer scientist and a builder of the General Video Game AI competition, arguing that games and AI need each other; the history of AI and games is covered elsewhere in [the history folder](../history/README.md), and this entry covers Togelius's argument.

## The argument

The publisher's line is "Games are the past, present, and future of artificial intelligence." The *American Journal of Play* review sums up three claims: **games are the future of AI**, **AI is the future of games**, and building AI for games helps us understand human intelligence. On the first, Togelius argues that games are the best environments for building general intelligence: cheaper and faster than robots, varied, and graded by a score. A single game, even Go, invites overfitting, so the test should be **general video game playing**: an AI that plays many games, including ones its designers have never seen (the GVGAI competition). As games in the benchmark grow from arcade games to role-playing and social games, the skills needed grow toward language, stories, and faces. On the second, he complains that commercial games are "designed to not need (nontrivial) AI" and sketches games built with AI: player models, **procedural content generation**, and eventually games that generate and playtest other games, a loop in which game-playing AI and game-making AI depend on each other.

## Read this

- **Togelius, "AI Researchers, Video Games Are Your Friends!"** (arXiv 1612.01608, 2016; free, 16 pages, about 40 minutes): his IJCCI 2015 keynote, the same argument as the book in compressed form. Read section 2 (benchmarks, GVGAI) and the closing vision.
- **The book's opening chapters (chess, Go, the Turing test) and its last chapters on designing games with AI**, about two hours in all. Not open access; MIT Press ebook or library. Chapter titles were not verified (see below).
- **Isaksen, Togelius, Lantz, and Nealen, "Playing Games Across the Superintelligence Divide"** (AAAI 2016 workshop, pp. 89–97, free): Togelius with Lantz on what games a superintelligence might play with us; see [Lantz](lantz-games-thinking-about-thinking.md).

## Passages

> "If you are an artificial intelligence researcher, you should look to video games as ideal testbeds for the work you do. If you are a video game developer, you should look to AI for the technology that makes completely new types of games possible."

Togelius, "AI Researchers, Video Games Are Your Friends!", arXiv 1612.01608v1, abstract, p. 1 (seen).

> "If we want to approximate testing our AI on all possible problems, the best we can do is to test it on a number of unseen problems. That is, the designer of the AI should not know which problems it is being tested on before the test."

Same, p. 6 (seen). On the loop between playing and making games: "It's like a web, where every part is dependent on every other part. Games are essential to furthering AI, but AI also has a lot to give games." (p. 12, seen) From the book: "the games industry is confined by economic realities to be highly risk averse and rather shortsighted," so "games are designed to not need (nontrivial) AI" (*Playing Smart*, p. 52; unverified: quoted in David Kirschner's review, *American Journal of Play* 12.1, 2019).

## Critiques and conversations

- Stored with segments: two papers Togelius co-wrote with Lantz, [Playing Games Across the Superintelligence Divide (2016)](articles/isaksen-et-al-2016-superintelligence-divide.md) and [Depth in Strategic Games (2017)](articles/lantz-et-al-2017-depth-in-strategic-games.md).
- Kirschner's review finds it "an excellent primer" for undergraduates but light for experts in any one of its fields (*AJP* 12.1, pp. 98–99, seen).
- The 2016 superintelligence paper turns Togelius's optimism around: games played between unequal minds include "domination games," which "should be the most alarming to game and AI researchers" (p. 95, seen).
- Togelius treats a game score as a clean measure of intelligence; [Bostrom](bostrom-superintelligence.md) and the paperclip thought experiment are about what happens when an optimizer takes such a score literally. Wark's "Everything here is a relation between quantifiable processes" (card 068, on *Civilization III*) is the critic's version: [Wark](wark-gamer-theory.md).

## For the game (TH proposal)

- (B, C) Play the AI as a general game player: the AI's rule table must work on any map students build from their index cards, and it is tested on a map its authors have not seen (GVGAI's "unseen games").
- (C) Benchmark creep: the AI team's score track starts with simple tasks (route power, cool servers) and adds tasks that need language and persuasion (lobby the council), so its growing ability is visible as a list of solved games.
- (A) A Committee proposal type, "build a game to train on": the AI asks for a simulation of the city; approving it gives the AI a free practice turn before every human turn.
- (A, B, C) Debrief: was our game a good benchmark of intelligence, and for whom, the AI team, the human factions, or us as designers?

## Sources opened

- https://www.penguinrandomhouse.com/books/663157/playing-smart-by-julian-togelius/9780262055802/ — publisher listing: description and dates.
- https://www.museumofplay.org/app/uploads/2022/01/12-1-Book-Review-5-Playing-Smart.pdf — David Kirschner's review, *American Journal of Play* 12.1 (Fall 2019).
- https://arxiv.org/pdf/1612.01608 — Togelius, "AI Researchers, Video Games Are Your Friends!" (2016).
- https://cdn.aaai.org/ocs/ws/ws0229/12645-57412-1-PB.pdf — Isaksen, Togelius, Lantz, Nealen, AAAI 2016 workshop paper.

## Unverified

The book itself was not opened: its table of contents, chapter titles, and the p. 52 quote come from Kirschner's review; the review gives the hardcover ISBN 9780262039031, and the PRH listing gives an ebook date of January 15, 2019 and a paperback of October 28, 2025. Togelius's role in GVGAI is from the arXiv chapter and a GoodAI write-up seen as a search summary. His later book on artificial general intelligence (MIT Press Essential Knowledge, about 2024) was not checked.
