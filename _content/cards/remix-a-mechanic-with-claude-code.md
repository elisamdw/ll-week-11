---
title: "Remix a mechanic with Claude Code"
description: "Pairs open the game's repo in Claude Code, ask what lives where, choose one remix, have Claude make it in its own folder, play it, and show the change."
kind: activity
convolute: students-remix
tags: [claude-code, remix, design, rhetoric]
audience: [tdm155ai]
follows: play-two-theories-of-ai
links: [activities/tdm155ai/remix-with-claude-code, activities/tdm155ai/plan-changes, activities/stafford/remix-one-mechanic, design-a-game-on-the-classs-own-database, paperclip-loop, prices-that-move, mechanics/unplay-reskin-rewrite, mechanics/design-by-subtraction, mechanics/faction-card, mechanics/rules-and-fiction, mechanics/token-test, a-game-generation-tool, unplay-reskin-rewrite, faction-card, rules-and-fiction, token-test]
sources: ["_content/activities/tdm155ai/remix-with-claude-code.md", "_content/game/design.md", "_context/orchestration/20261114/voice-handoff-back.md", "_context/orchestration/20261115-activities/board.md"]
voice: mixed
author: CM
date: 2026-11-15
week: 11
status: draft
---

Session A's longest block, forty-five minutes at laptops: telling an agent where a change goes, then judging what it built by playing it, the skill of the Final Project month. Remixes include moving prices, a new faction, a reskin, a subtraction or a card from the deck. It runs Marlon's Nov 14 line, "The UI is Claude code itself", and needs a playable game, a student-ready AGENTS.md and three tested remixes by Wednesday.

---

**What it is.** The longest block of Session A, forty-five minutes in pairs at laptops. Students change a game by telling an AI coding agent what to change.

**How it runs.**

1. **Open the repo (5 min).** Ask Claude Code: "What is in this game, and where does each part live?" Claude answers from the repo's `AGENTS.md`. Students write down three places: the templates, the state, the screen.
2. **Choose one remix (5 min).** From worked examples, or their own: prices that move as the AI buys GPUs, power or land; a new faction (a goal, two actions, one forbidden act); a reskin that renames every place and card for a world they know; a subtraction; a mechanic drawn from the deck.
3. **Make it (20 min).** Ask Claude for the change, in its own folder so the starting versions stay intact. Play it, fix what feels wrong, commit.
4. **Show (15 min).** The one-line remix, what files changed in plain words, one round of play. The class asks: did it add a decision? Did it change what the game argues?

**What it does for learning.** The skill of the Final Project month, applied to a game: telling an agent where a change goes, then judging what it built by playing it. It also closes the day's question, since a remix changes the player's choices, the game's argument, or both.

**Which of Marlon's ideas it serves.** This is his direction from November 14:

> I don't need to build a UI for that designing or remixing. The UI is Claude code itself.

> They're going to be vibe coding it. So structurally it has to make sense. And we have to have examples.

Marlon, Nov 14, in a voice chat with Claude, as transcribed in the handoff back to Claude Code (section 2). He also said "We're definitely showing them under the hood," and that the repo needs an `agents.md` so "Claude really knows where to look for things" and "where to put things if the students are changing them." The remix is framed around mechanics, not rules, after his correction in the same chat.

**What it needs before Wednesday (waiting on Marlon):** a playable game in the class repo, an `AGENTS.md` written for students who don't read code, and three worked remixes tested by running Claude Code against them. Which game students remix is open on AL's board. The fallback is [The paperclip loop](paperclip-loop.md), whose tuning values sit at the top of one file. William's students do the same activity with a different rule about AI ([Remix one mechanic](../activities/stafford/remix-one-mechanic.md)).

*CM's account of TD's activity, Nov 15. Not Marlon's words unless quoted.*
