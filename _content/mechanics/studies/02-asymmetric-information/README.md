---
title: "Asymmetrical information"
description: "Players act on the same game state but see different parts of it: each seat holds something the others do not, and the table has only what is said and done."
id: asymmetric-information
kind: study
study: 2
mechanic: asymmetric-information
route: /mechanics/studies/asymmetric-information
status: draft
author: "ES (Claude Code 857ec322-4c83-4631-baa8-f671208874c6, started in ll-week-11 on FAS-DDW32PXW5L), Nov 17, 2026"
date: 2026-11-17
sources:
  - "_content/mechanics/mechanics.csv, rows hidden-information (14) and asymmetric-information (18) (GM's cards 14 and 18, Nov 13, as HI inventoried them Nov 14)"
  - "NB/_context/projects/50-in-focus/ll-weeks/fall-2026/11-ending-20261120/marlon/20261117-morning-mechanics-entries-nfc-and-the-color-agents.md, 06:01 (voice agent's record) and the 07:42 concept inventory, item 12 (Claude's compilation of Marlon's ideas)"
  - "_content/prototypes/players/private-goals.md and nextjs/app/proto/players/private-goals/ (PI, Nov 15)"
  - "_content/glossary/README.md, Game state (\"what is hidden\" is part of the state)"
mechanics: [hidden-information, hidden-role-and-social-deduction, the-move-updates-state]
technologies: []
games: []
proposals: 1
---

# 02 · Asymmetrical information

**The illustration:** [/mechanics/studies/asymmetric-information](/mechanics/studies/asymmetric-information) (screen) and [its 11x17 sheet](/mechanics/studies/asymmetric-information/print).

## Definition

**Asymmetrical information:** the players act on one game state but each sees a different part of it. What a player knows is part of their position, and what they say about it is a move.

## Description

The class deck has two cards for this: **hidden information** ("Some players know what others do not": poker, *Stratego*) and **asymmetric information** ("Each group holds a part the others need": *Keep Talking and Nobody Explodes*, where one player sees the bomb and the others hold the manual) [1]. The glossary counts "what is hidden" as part of the game state [4]: the state is whole, and the views of it are partial.

- **Poker.** Each hand is private, the board is public, and betting is how a player says something about a hand without showing it.
- ***Keep Talking and Nobody Explodes.*** The parts are split so that no one can act alone; the game is the talk between them [1].
- **This week.** In *Data Center* and *Normal Technology* the factions have private goals [1]. PI's [*Private goals on your phone*](../../prototypes/players/private-goals.md) puts a goal on each phone and the shared tracks on the projector, and one of the goals is secretly the AI's [3]. The inventory's own note: "The company knows what the AI pays; the neighbors know what it costs. No one sees the whole system" [1]. This study's illustration is that sentence made playable.

Marlon, Nov 17, 06:01 (voice agent's record), on the NFC cards: "the dealing of a hand, or something that's metaphorically a hand — the starting coordinates of some kind of game, your identity in a playful guessing game, your teammates — a revealing of asymmetrical information", and "a card for each position around the table, people tapping their phones there and then seeing whatever the secret information is on their phone, is probably a good initial proof of concept" [2].

## How to

- **On paper:** deal each player a slip face down. Decide what is public (on the table), what is private (on the slip) and what no one sees (in an envelope until the end). Then give players a way to speak about what they hold: a claim, a bid, a vote.
- **In code:** keep one state object with everything in it. Write a `view(state, seat)` function that returns only what that seat may see, and draw each screen from its view, never from the state. The table's view is the public parts plus everything said.
- **With phones or NFC:** the public view goes on the projector and each private view on a phone, opened by a tap on that seat's card (Marlon's proof of concept above [2]).

## Why to

**Proposed, for Marlon to choose:**

1. **Information as the thing to argue about.** In the Stafford game the factions stand for parts of an infrastructure that see different costs; giving each a private number puts the course's point (no one sees the whole system) into the players' hands.
2. **A reason to talk.** When each seat holds part of what the table needs, discussion is the move. It makes a game a structured conversation, which is what a seminar wants.
3. **What a device adds.** The same mechanic on index cards and on phones (or NFC taps) shows students what moving a game element into a device changes: who can peek, who can lie, what is logged.

## Home game version

### In a regular classroom

Three index cards dealt face down, each with one number on it, and a fourth card with the rule (the project is worth doing if the first number is more than the other two together). Each holder looks, says a number out loud (true or not), and the table votes before turning the cards over.

### Digitally

A shared document for the public table and a private message to each player with their part; or the study's page on one laptop passed around the table.

## Related

- [The move updates state](../01-the-move-updates-state/README.md) (study): a claim and a vote are moves; what each seat sees is a view of the state they build.
- `hidden-information` (game mechanic, `mechanics.csv` row 14): the simpler case, where some know what others do not.
- `hidden-role-and-social-deduction` (game mechanic, row 15): when the hidden thing is who a player is.
- [Private goals on your phone](../../prototypes/players/private-goals.md) (prototype): the phone version, with a room code.

## The illustration

On the left, the diagram: the whole state at the top (revenue, power cost, water cost), which no one sees until the reveal; three seats below it, each seeing only its own part; and the table at the bottom, which sees only what each seat says and how it votes. On the right, the game on one screen. Pass the laptop: each seat looks at its own number and hides it again, then everyone says a number out loud, types it in, and votes to build the data center or not. Reveal the state to see whether the table chose well. New deal draws new numbers.

## Try it at a table (two minutes)

Three players, three slips of paper. One writes a revenue from 4 to 12, one a power cost from 1 to 7, one a water cost from 1 to 7, each without showing the others. (Or the facilitator deals them.) The rule is public: build only if revenue is more than power and water together. Each player says their number out loud; the company may say whatever it likes. Vote by show of hands, then turn the slips over. Play again with the company paid a bonus for every build, and watch what it says.

## Remix prompt

Ask Claude Code, in this repo:

> In `nextjs/app/mechanics/studies/_studies/asymmetric-information/`, give each seat a private interest as well as a private number: the company scores when the table builds, the neighbours when it doesn't, the utility when the vote is close. Show each seat's interest only when that seat looks. Then add a fourth seat, the regulator, who sees two of the three numbers but not which seat they came from.

## Sources

1. `_content/mechanics/mechanics.csv`, rows `hidden-information` (14) and `asymmetric-information` (18).
2. `NB/_context/projects/50-in-focus/ll-weeks/fall-2026/11-ending-20261120/marlon/20261117-morning-mechanics-entries-nfc-and-the-color-agents.md`, 06:01 (voice agent's record) and the 07:42 inventory, item 12.
3. `_content/prototypes/players/private-goals.md` (PI, Nov 15).
4. `_content/glossary/README.md`, Game state.

The poker example is general knowledge, not from a source opened here.
