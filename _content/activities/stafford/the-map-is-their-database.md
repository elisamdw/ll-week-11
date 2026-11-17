---
title: "The map is their database"
description: "The students' Sept 28 index cards become the template layer of the game: each card a kind of place, each game a set of instances on a map."
kind: idea
audience: stafford
week: 11
date: 2026-11-15
status: proposal
author: claude (SW, Claude Code dd46e909-fd8b-4fb0-b2f6-2979500830b3)
mechanics: ["location-play", "seeded-map", "any-map-test", "territory-and-area-control"]
readings: ["manovich-1999-database-as-symbolic-form", "star-1999-ethnography-of-infrastructure"]
prototypes: ["hybrid/photo-to-game-state"]
ideas: ["turn-the-index-cards-into-a-database", "design-a-game-on-the-classs-own-database", "game-ideas/index-cards-that-answer", "game-ideas/photo-to-game-state"]
sources:
  - "NB/_context/projects/50-in-focus/william-stafford/workshop-2/proposal-for-william.md (Marlon, Nov 3)"
  - "_content/game-state/README.md and data-center.md (HI: template, instance, state, view)"
  - "_context/orchestration/20261114/voice-handoff-back.md (Marlon on the students' cards)"
---

**Marlon, Nov 3 (draft proposal to William):** "On Sept 28 the students sketched databases of the course on index cards, and some groups ended up with a database of infrastructure itself. I photographed the cards. Before Nov 23 I'll build them out into a working database. … Then we'll design a game together on top of the database they made."

**Marlon, Nov 14 (voice chat):** he mentioned involving "all of the cards that they wrote or their database."

**The idea (SW's proposal):** HI's four words for game data are template, instance, state, view. The students' cards are already the template layer: each card names a kind of thing in the world of infrastructure. A game on top of them adds instances (this substation, owned by the utility, running) and state (who holds what in round 4). The *Data Center* ruleset has 14 places in a `nodes` list; swapping in the class's cards is a remix of the template, and the AI's rules either survive it or don't (the `any-map-test` mechanic).

**Why it fits the course:** It closes the loop with the Sept 28 workshop (Manovich on database as symbolic form, Dourish, Jones on categorizing) and gives students a game made of their own categories, which makes the argument their own.

**Try it:** Take one group's photographed cards, type them as a list of nodes (name, kind, what it depends on), and load them into a copy of the *Data Center* ruleset.

**Depends on:** Marlon's photos of the cards and the database he planned to build from them; we haven't found either in the repos (question on AL's board). PB's `photo-to-game-state` prototype (next in PL's queue) may help turn photos into rows.

*SW's proposal (Nov 15); Marlon's words quoted and dated.*
