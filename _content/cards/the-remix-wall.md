---
title: "The remix wall"
description: "A page at /game that shows every saved remix beside the version it came from: what changed, in plain words, and the claim each changed rule now makes."
kind: idea
convolute: builds-this-week
tags: [remix, claude-code, rhetoric]
audience: [tdm155ai, stafford]
links: [remix-a-mechanic-with-claude-code, remix-one-mechanic, claude-code-is-the-ui, what-the-mechanic-argues, token-test, the-week-11-ai-game, activities/tdm155ai/remix-with-claude-code, game/design]
order: 6
sources: ["_content/activities/tdm155ai/remix-with-claude-code.md", "_content/game/README.md", "nextjs/app/game/edit/[id]/Editor.jsx", "_context/orchestration/20261114/voice-handoff-back.md"]
voice: mixed
author: KB
date: 2026-11-16
week: 11
status: draft
---

When pairs remix the AI game with Claude Code on Wednesday, the show-and-tell needs a screen that says what each remix changed. The game's rulesets already record which version a remix came from and a rhetoric line on each rule. A remix wall would lay the remixes side by side, show each one's differences in words, and put the changed claims first, so the class can ask what the change argues.

---

> We're definitely showing them under the hood.

Marlon, Nov 14, in the voice chat, as transcribed in the handoff back to Claude Code (`_context/orchestration/20261114/voice-handoff-back.md`).

**The gap.** The remix activity ends with fifteen minutes of show and tell: "the one-line remix, the diff Claude made (what files changed, in plain words), and one round of play," then two questions, whether it added a decision (`token-test`) and whether it changed what the game argues (`activities/tdm155ai/remix-with-claude-code`). A git diff on the projector answers neither for students who don't read code.

**What it is.** A page, `/game/remixes`, that reads every ruleset in `_content/game/_rulesets/`. Each saved remix carries `remixOf`, the version it came from (`Editor.jsx` writes it), and any rule may carry a `rhetoric` line, the claim it makes (`_content/game/README.md`). The wall groups remixes under their parent and for each shows: the pair's one-line description, the rules added, removed or changed, described with the engine's own `describe()`; and every `rhetoric` line that changed, old beside new. One click plays it. The `AGENTS.md` that tells Claude where remixes go would also tell it to set `remixOf` and to write a rhetoric line for each rule it changes.

**Who it is for.** Wednesday's remix block, and the same at Stafford's workshop, where *What the mechanic argues* asks the room to name what each version claims. Afterward the wall is the class's record of what it made, without student names: a remix is named by its change.

**What it reuses.** The rulesets, `remixOf`, the rhetoric lines, `describe()` in `nextjs/lib/game-engine.mjs`, and the list at `/game`.

**What it would take.** About three hours in `nextjs/app/game/`, plus one paragraph in the class repo's `AGENTS.md`. On the laptop; remixes made on students' own laptops would need to reach it (a shared folder, or committed to the class repo), which is part of the open question of what goes to the class repo and when (Nov 15 handoff, item 4).

**What Marlon would decide.** Whether students' remixes come back to one machine on Wednesday, and how: pushed to the class repo, or shown from each laptop.

*KB's proposal, Nov 16. Not Marlon's words unless quoted.*
