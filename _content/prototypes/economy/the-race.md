---
title: "The race"
description: "Two labs choose in secret how hard to push. Pushing wins the race and moves a shared clock, both get steeper every round, and a treaty with imperfect inspectors is the only brake."
kind: economy
week: 11
date: 2026-11-15
status: prototype
author: claude (PE, Claude Code 60324eb3-05fc-4804-ae52-5dde0d4b32c8, started in ll-week-11 on FAS-DDW32PXW5L)
route: /proto/economy/the-race
mechanics: ["escalation", "rival-lab", "compute-cap", "timer-and-countdown", "hidden-information"]
readings: ["kokotajlo-et-al-2025-ai-2027", "vinge-1993-coming-technological-singularity", "yudkowsky-soares-2025-if-anyone-builds-it", "chun-2006-control-and-freedom"]
ideas: []
needs: "One laptop; two players at one keyboard, or one player against the computer. Runs offline."
sources:
  - "ll-week-11: _content/mechanics/mechanics.csv (escalation, rival-lab, compute-cap)"
  - "ll-week-11: the 'escalation and the clock' candidate in PE's brief (Nov 15)"
---

Two labs race to a capability of 14. Each round, each lab chooses in secret: **Safe** (1 capability, 2 safety work), **Balanced** (2 and 1) or **Sprint** (3 and 0). Capability moves a lab toward the finish and moves a shared clock; safety work moves the clock back. Every round, capability is worth 10% more and carries 15% more risk. If the clock reaches 20, everyone loses. Either lab can propose a treaty that caps both at Safe; inspectors catch anything more 60% of the time.

## How to play

1. Open `/proto/economy/the-race` and choose who plays Ridge Lab: a second player, or the computer.
2. Each round, Harbor Lab presses A, S or D and Ridge Lab presses J, K or L (or the buttons), so neither sees the other's choice. Then press **Reveal and play the round**.
3. Either lab can **Propose a treaty**; when both have signed, it holds for the rest of the race. A lab caught over the cap loses that round's gain, and 2 capability leak to its rival. An uncaught cheat shows on screen as "Safe, it says", but the clock counts it.
4. The race ends when a lab reaches 14, the clock reaches 20, or after 12 rounds. Two to four minutes.

Simulated with the page's own code: Safe against Safe, both labs reach 14 together in round 10 with the clock at 10. Sprint against Safe, the sprinter wins in round 5. Balanced against Balanced, the clock runs out in round 6; Sprint against Sprint, in round 4. Under a treaty, a lab that cheats every round wins 15 races in 200; the rest go to its rival or the clock. Played through in headless Chrome against the computer and with two players.

## What it shows

Mechanics from `mechanics.csv`: **escalation** (each round the reward and the risk both rise, and the question is whether the players notice the slope), a **rival lab** (slowing down here speeds someone up there; a caught lab's gain leaks to its rival), and the **compute cap** (governance as monitoring: the inspectors miss some cheating, and the clock shows what they miss). Choices are **hidden information** until the reveal, and the clock is a **timer** both players wind.

What it argues (Claude's proposal): the payoffs make a race dilemma. Against a careful rival, pushing harder wins; when both push, nobody does. Neither lab has to want the bad ending. The treaty makes the careful outcome possible but only as reliable as its inspection, which is the bet in Yudkowsky and Soares's proposal for a treaty on compute in *If Anyone Builds It, Everyone Dies*. The two labs are *AI 2027*'s race, and the leak is Vinge's argument in "The Coming Technological Singularity" that a ban in one place speeds the work elsewhere. `mechanics.csv` pairs the compute cap with Chun's *Control and Freedom*, which argues that turning political problems into technical ones (here, an inspection rate) produces myths of total control and total freedom.

What it leaves out: there are only two labs, safety work always works, the clock is a single number, and winning the race is good for the winner, which the game does not question.

## Could go in the game as

- A **rival lab** in *Data Center*: a second AI spreading from the far edge of the map, with a treaty action and a defect action (the `rival-lab` mechanic's own proposal).
- The **clock** as a track on the tabletop version, with the escalation multipliers printed for each round, or held on a phone so the designers can change them between games.
- **Inspections** for *The Committee*: each AI proposal carries a hidden size, and the committee can inspect a few.

## Remix it

All in `nextjs/app/proto/economy/the-race/TheRace.jsx`; the tuning values are at the top.

- "Make safety work stop working after round 6." (`ESCALATION.safetyPerUnit`, and `resolve()`)
- "Add a third lab, and make the treaty need all three signatures." (`LABS`, the picks and `propose()`)
- "Make the inspectors perfect but slow: they catch everything, two rounds late." (`TREATY.catchChance`, `resolve()`)
- "Let a lab spend a round to inspect the other's last choice." (a new button, and `shown()`)
- Harder, with PL's shared state: "Put each lab's choice on its own phone so the room can't see the keys." (`useRoom` from `nextjs/app/proto/_shared/room.js`)

## Needs

One laptop, with two players sharing the keyboard or one against the computer. Runs offline, no model calls.
