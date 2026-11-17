---
title: "Remix a mechanic with Claude Code"
description: "Pairs open the game's repo in Claude Code, pick one remix (prices that move, a new faction, a reskin, a subtraction, an NFC tap), ask Claude to make it, play it, and show the change."
kind: activity
audience: tdm155ai
week: 11
date: 2026-11-15
status: proposal
author: claude (TD, Claude Code 61b3561e-f12d-4cc0-a067-7256dd605f11)
duration: 45
group: pairs
play: laptop
materials: ["a local copy of the class repo with a playable game and its AGENTS.md (not there yet: see plan-changes)", "Claude Code on each pair's laptop", "the mechanics deck", "the projector for show and tell"]
mechanics: ["unplay-reskin-rewrite", "design-by-subtraction", "faction-card", "rules-and-fiction", "house-rules", "token-test", "any-map-test"]
readings: ["flanagan-2009-critical-play", "sicart-2014-play-matters", "bogost-2007-persuasive-games", "anthropy-2012-rise-of-the-videogame-zinesters", "suber-1982-nomic"]
ideas: ["design-a-game-on-the-classs-own-database", "a-game-generation-tool", "game-ideas/prices-that-move"]
prototypes: ["economy/paperclip-loop"]
activities: ["tdm155ai/play-two-theories-of-ai", "tdm155ai/a-game-is-data", "tdm155ai/agency-or-argument"]
sources:
  - "ll-week-11: _context/orchestration/20261114/voice-handoff-back.md, section 2"
  - "ll-week-11: _content/game/design.md, 'GL's proposal for the game' (items 2–4)"
  - "tdm155ai-week-10 pattern: students changed small named files (lib/launch/buttons.js and the like) in their local class app on Nov 11 (course plan, week 10 run of show)"
---

Marlon, Nov 14: students "are going to be vibe coding it. So structurally it has to make sense. And we have to have examples." "I don't need to build a UI for that designing or remixing. The UI is Claude code itself." "We're definitely showing them under the hood." The repo needs an `agents.md` so "Claude really knows where to look for things" and "where to put things if the students are changing them."

**What students do**

1. **Open the repo (5 min).** Pairs open their local copy in Claude Code and ask it: "What is in this game, and where does each part live?" Claude answers from the `AGENTS.md`. Students write down three places: where the templates are, where the state is kept, where the screen is.
2. **Choose one remix (5 min).** From a short menu of worked examples (each in the `AGENTS.md`), or their own:
   - **Prices that move:** GPU, power or land prices rise as the AI buys.
   - **Write a faction:** a goal, two actions, one forbidden act (`faction-card`).
   - **Reskin:** rename every place and card for a world you know, numbers untouched (`rules-and-fiction`); does the argument change?
   - **Subtract:** remove one resource or action and see if the game gets better (`design-by-subtraction`).
   - **A mechanic from the deck:** draw a card and ask Claude to add it.
3. **Make it (20 min).** Ask Claude for the change; tell it to put the remix in its own folder so the starting versions stay intact. Play it. Ask Claude to fix what feels wrong. Commit.
4. **Show (15 min).** Pairs show on the projector: the one-line remix, the diff Claude made (what files changed, in plain words), and one round of play. The class asks: did it add a decision (`token-test`)? Did it change what the game argues?

**What it teaches:** the skill of the Final Project month, applied to a game: telling an AI coding agent where a change goes, then judging what it built by playing it. And the Nguyen–Bogost question from the day: a remix changes the player's choices, the game's argument, or both.

**Prepare (this is the work before Wednesday; see [plan-changes](plan-changes.md)):** a playable game in the class repo (or a copy of PL's prototypes), an `AGENTS.md` written for Claude working with students who don't read code, and three worked remixes as examples, each tested by running Claude Code against it the way a student would. Students need the repo cloned and Claude Code signed in before class; week 10 showed they can run a local app.

**Try it:** one pair, the *Blank* version (three places, one card, one faction, one action), and the prompt "add a second faction whose goal conflicts with the first."

**What could go wrong:** Claude edits the shared starting versions instead of a remix folder (the `AGENTS.md` has to say where remixes go); a pair spends twenty minutes on install problems (pair them with a working laptop and move on); a remix breaks the game (the show-and-tell can be the broken version and what Claude said about it).

**Prototype:** PE's *Paperclip loop* (`/proto/economy/paperclip-loop`, built Nov 15, offline) keeps its tuning values at the top of one file, which makes it the smallest thing a pair could change in fifteen minutes. A fallback starting point if the game isn't ready in the class repo.

*TD's proposal, Nov 15, from Marlon's Nov 14 direction and GL's proposal for the game (not yet agreed).*
