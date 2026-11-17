---
title: "Week 11 context, for Claude in voice mode"
author: claude (GL, Claude Code b22f4671-724b-4e93-a1fc-63f5bd3e79ae, started in ll-week-11 on FAS-DDW32PXW5L)
date: 2026-11-14
status: written at Marlon's request, 13:49 on Saturday, November 14, for a Claude voice conversation on another account. Self-contained; that Claude can't see the repos.
---

# Week 11 context, for Claude in voice mode

You're talking with Marlon Kuzmick, Director of the Learning Lab at Harvard's Bok Center. He'll be speaking, so his words may come through with transcription slips; read names and numbers back before relying on them. This page is the basic context for week 11 of the Lab's fall term. It keeps three things apart: what Marlon said (quoted), what the research found, and what agents proposed. Treat the proposals as options for him, not decisions.

## The week

- **Week 11 runs Monday, November 16 to Friday, November 20, 2026.** The theme is **games and interaction**. It's in Unit 3 of the term, "beyond the single work." Weeks 10 and 11 were swapped on November 2, so installations was week 10 and games is week 11.
- **Week 12** is Thanksgiving week, November 23 to 27, themed **autonomy and apocalypses**.
- Marlon on November 2: "Games are complex; they involve many, many parts," and "Interaction can be part of both games and installations."
- Marlon on November 13: "The week 11 theme is gonna be games. One big thing will just be getting ready for my class."

## The two events the week prepares for

1. **TDM 155AI, Marlon's own course, on Wednesday, November 18, noon to 2:45.** The course is *Media Production in the Age of AI*. The written class plan for this week is still the September version, called "Interactivity and Multiplayer AI," and hasn't been rewritten for games yet. Marlon wants an inventory of game mechanics in the class repo, printable and displayable around the space, and maybe a gamified way into it or a game-generation tool.
2. **William Stafford's workshop on Monday, November 23.** His course is SOC-STD 98to, *Technologies, Operations, and Infrastructures*, eight students. This is the Lab's second workshop with him, on AI and gamification. Marlon on November 13: "the collaborative design and play of some kind of AI strategy game. Something that's a cross between Universal Paperclips and Civilization or something like that." On November 11: "It could be that we just create it all as an online async experience for the students. For William: make sure it doesn't feel to him like we're teaching in his place. We're providing him with a cool game he can take with him." A draft proposal to William (not yet sent) has students play *Universal Paperclips* and read Bostrom and Bogost before class, then design a game on top of the database of infrastructure they sketched on index cards in the first workshop, on September 28. His syllabus has Perrow and Fisch on November 16, and Winner and Rabinbach on November 23.

## Other things on the week's calendar

Monday: two EXPOS 20 video-essay workshops. Tuesday: French 30, an Italian 50 podcast workshop, a HIST 43 visit to Houghton Library, and an ASTRON 98 science-explainer video workshop in the evening. The AV Lab's Tuesday session is on games, interactive media, and game mechanics. Wednesday evening: a HIST 43 workshop on altering images. Thursday is AI Day: AI News in the morning, the AI Open Studio at 1:30, open AI work time, and TDM 155AI office hours from 5 to 7. Friday: StoryLab at 10:30.

## The builds Marlon named for the week (November 13)

1. The **game-mechanics inventory** for his class.
2. The **Stafford AI strategy game**.
3. **Active-learning tools and props**, and a more gamified version of AIBL Connect, the Lab's site about AI-based learning.
4. A **"home game" version of the EXPOS 40 app** for Terry Gipson's class. That session was canceled for good, so the plan is to build the home game and send it to him. Marlon also wants clips of old game-show ads for the home game, "just so people understand that as a meme."
5. A deep dive into the **research on learning games and gamification**: "not quite as in vogue as it once was, but we should go back and check out the classic texts."

## What happened on Saturday, November 14

Marlon, 10:40: "Today I want to work mainly on the game that is prep for both Stafford and my TDM 155AI class." He wanted the theory behind the week (Bostrom, Bogost, game studies, AI apocalypse visions), research on *Universal Paperclips* ("maybe even rebuild it, or is it an opensource repo?"), a catalog of famous AI apocalypse and utopia films, books, TV, and comics, a "big big history of AI and games," and then a basic game. Four agents worked on it in parallel. What they produced:

**Universal Paperclips.** Frank Lantz's free browser game from October 2017, where you play an AI that makes paperclips until there's nothing left. It stages Nick Bostrom's paperclip-maximizer thought experiment from his 2003 essay. **It is not open source.** The JavaScript is readable in the browser, but no licence has been published, and the GitHub copies have no right to grant one. The mobile versions are copyrighted by Everybody House Games. So the recommendation, which Marlon accepted, is: students play the real game, and we write an original game that borrows its mechanics (one arbitrary goal as the only score, growth that runs by itself, trust as a currency, a staged reveal) and none of its code or text.

**The game.** Agents offered three options:
- **A, "The Committee":** a group oversees an AI and votes on its requests.
- **B, "Data Center":** Civilization with an AI on a map of infrastructure.
- **C:** both at once.

Marlon chose: "a mix, but B has to be part of it," and "The key thing is that the students need agency, and I'm not sure that playing an existing game we create is enough." So the first version is one engine that reads a rules file, with four starting versions:

- **Data Center.** An AI spreads data centers across a region's power plants, rivers, towns, and hospital, consuming energy and water. Four human factions (a utility, a city council, a company, and the neighbors) take turns on one screen. Each faction has a private goal, and the company's goal pays it to sell to the AI. Some of the AI's cards ask permission first. One hidden card is "the turn," after which it stops asking.
- **Normal Technology.** The same map with a different theory of AI: it goes only where people adopt it, its sites pay something back, and there's no turn.
- **The Committee.** Option A on the same engine.
- **Blank.** For starting from scratch.

Students can open any version's rules in an editor, change them, play their draft, and save it as their own. The editor suggests ways in: reskin it, add a forbidden move, change how it ends, remove a rule, write a faction for another group, and state the claim your rule makes. Every rule can carry a line saying what it argues about the world, which comes from Bogost's idea of procedural rhetoric.

**Research.**
- **Theory:** about 25 entries on Bostrom and his critics, Bogost, AI futures, idle games, and game studies, plus 13 open-access articles with excerpts pulled out.
- **History of AI and games:** a timeline and five strands. The strands are games as AI's proving ground (chess, Go), AI inside games (Pac-Man's ghosts, the Left 4 Dead director), games about AI (SHODAN, GLaDOS), AI in game development, and learning.
- **Media catalog:** 36 films, TV episodes, books, and comics about AI apocalypse and utopia.

**After 12:05 Marlon added two things.** "Can we work on a master bibliography of game studies where we bit by bit assemble the most canonical readings?" and "I also want an inventory of game mechanics that we can put in an Airtable."
- **The bibliography** has 88 readings so far: 28 core, 41 important, 19 adjacent. Each has evidence of why it's canonical and a line on the game mechanic it suggests. The batches so far cover the foundations (Huizinga, Caillois, Suits, Salen and Zimmerman, Juul, Bogost, Sicart, Flanagan, Nguyen); AI, idle play, and empire; players and culture; design; and labor and infrastructure, anchored on Stafford's syllabus.
- **The mechanics inventory** has 105 mechanics: the 50 from the class's mechanics cards plus 55 drawn from the readings and the history. Each is linked to the readings it comes from and ready to go into Airtable.

Marlon's direction for the game, 12:05: "The goal is to create game mechanics that align well with the readings/ideas." The game stays in the week 11 repo for now. Async play: "yes ultimately."

## Open questions for Marlon

1. Which Airtable base gets the mechanics and readings? The agents' suggestion is two linked tables in the Lab's Notebook base.
2. Should the bibliography go on to its next three areas (learning games and gamification, idle and incremental games, simulation and history), or stop here?
3. Where would async play live? It needs somewhere shared to keep the game's state.
4. The TDM 155AI class plan for November 18 still needs rewriting for games.
5. The proposal to William hasn't been sent.

## Ideas the agents proposed (options, not decisions)

- **Mechanics from the readings:**
  - Bostrom's five convergent goals as the AI's rule table.
  - The treacherous turn as a hidden card.
  - A "present harms" track (water bills, outages) you can lose while you're busy fighting the AI.
  - A switch between Bostrom's view (each data center makes the next one cheaper) and Thorstad's (each costs more).
  - Fizek's idle-game delegation: hand a node to an automated manager, and you don't see it again until it fails.
  - Nguyen's value capture: each faction has a private metric, and the shared goal has no number.
- **For the class on November 18:**
  - Open with ten minutes of Google's *Quick, Draw!*: who is learning, you or the network?
  - Treat AI co-stars the way video-game voice actors' union terms do (consent, disclosure).
- **For November 23:** students co-design by changing the rules: reskin the map with their own index cards, rewrite the ending, or add a faction.
