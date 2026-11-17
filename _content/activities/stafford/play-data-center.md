---
title: "Play Data Center"
description: "Two tables of four play the LL's Data Center game, one faction each (utility, council, company, neighbors), against an AI that wants half the map."
kind: activity
audience: stafford
week: 11
date: 2026-11-15
status: proposal
author: claude (SW, Claude Code dd46e909-fd8b-4fb0-b2f6-2979500830b3)
duration: 35
group: tables
materials: "one laptop per table on the reader app (/game/play/data-center, hotseat), or a printed board, faction cards and the AI's deck if a tabletop version exists by then"
play: hybrid
mechanics: ["cascade-failure", "harden-node", "treacherous-turn", "voting-and-the-collective-decision", "present-harms-track", "faction-card"]
readings: ["bogost-2007-persuasive-games", "perrow-1984-normal-accidents", "bostrom-2014-superintelligence"]
prototypes: ["economy/the-race", "economy/prices-that-move"]
ideas: ["design-and-play-an-ai-strategy-game", "universal-paperclips-meets-civilization"]
activities: ["stafford/read-the-game-state", "stafford/what-the-mechanic-argues"]
sources:
  - "_content/game-state/data-center.md (HI: 14 nodes, three resources, two tracks, four factions, 13 actions, the AI's 10-card deck with one hidden turn card; 10 rounds; the AI wins at half the map)"
  - "_content/game/design.md (Marlon, Nov 14: 'I think I want a game that's playable at the start of the workshop')"
  - "_content/game/_rulesets/data-center.json and normal-technology.json"
---

**Marlon, Nov 14:** "I think I want a game that's playable at the start of the workshop, but I also would like to give the students the ability to remix it or tweak it or completely start from scratch."

**What students do:**

1. Eight students, two tables of four. Each takes one faction card: the utility, the council, the company, the neighbors. Each faction has its own goal and actions.
2. Play on one laptop per table, passing it round (hotseat). Each round every faction takes two actions; then the AI draws a card and grows. One card in its deck is the turn, and nobody sees where it is.
3. Play to the time limit (about five or six of the ten rounds), whether or not anyone has won.
4. Table A plays *Data Center* (fast AI); Table B plays *Normal Technology* (the same map, but the AI accelerates more slowly, 1.05 a round against 1.25, and its cards are pitches the humans can adopt or block). Neither table knows which until the debrief.

**What it teaches:** The game is the argument (Bogost). Two tables on two settings make the students' disagreements about AI into a variable they can see. PE's `economy/the-race` prototype adds the pressure behind the speed: two labs choose in secret how hard to push, and a treaty with imperfect inspectors is the only brake.

**Prepare:** The reader app running on two laptops, or the tabletop kit. Test both rulesets the week before; the game is still being built and its rules may change.

**Try it:** One person can play all four factions in ten minutes on `/game/play/data-center` to learn it before teaching it.

**Could go wrong:** Rules explanation eats the time. Each faction card should say what to do in one sentence, and the first round should be played with an LL facilitator at each table. The current build runs only on the laptop where the reader app is running (not deployed).

*SW's proposal (Nov 15); the game is GL's, and HI's page describes it as of Nov 14.*
