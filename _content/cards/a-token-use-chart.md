---
title: "A token-use chart"
description: "Bars of token use by pane and by person for an orchestration run, built from ll-tokens and the run's manifest, as the first panel of the orchestration dashboard."
kind: idea
convolute: builds-this-week
tags: [claude-code, economy, design]
audience: [ll]
links: [agents-are-turns-all-the-way-down, claude-thinks-at-turn-speed, mechanics/levels-and-progression, mechanics/score-and-points]
order: 9
sources: ["W11/marlon/20261116-morning-games-active-learning.md", "https://bokcenter.slack.com/archives/C06KHNRBYKU/p1794828116940289", "https://bokcenter.slack.com/archives/C06KHNRBYKU/p1794828321700599", "https://bokcenter.slack.com/archives/C06KHNRBYKU/p1794828399966069", "NB/apps/ll-utilities/README.md", "NB/AGENTS.md"]
voice: mixed
author: KB
date: 2026-11-16
week: 11
status: draft
---

Marlon proposed a bar chart of token use, by color or by person, alongside the cmux commands that run his agents, and called it a way of leveling up token use. The counter exists: ll-tokens reads each machine's Claude Code and Codex logs. The build is a chart that joins those counts to an orchestration run's panes, as the first panel of the mk-orchestration dashboard.

---

> • Do the "token maxing" thing: a bar chart of token use, by color or by person.

> • There's a sense in which that feels somewhat gamified too: a way of leveling up your token use.

The voice agent's record of Marlon's direction, Nov 16, 06:21 and 06:25, in #mk-work-in-progress (permalinks in `sources`). Summaries by the voice agent, not a transcript. Between them, at 06:24, the record adds "and cmux commands for multiagent orchestration".

**What exists.** `ll-tokens` in The Notebook's toolbox (Nov 15) adds up what Claude Code and Codex record on one machine, by day or by thread, and prints JSON or CSV; `ll-tokens session <ids>` takes thread IDs, "an orchestration run's panes" (`NB/apps/ll-utilities/README.md`). Each run's manifest names its panes and their thread IDs. Costs are estimates at list prices, not a bill.

**What it is.** A page that takes a run, reads its panes' thread IDs, asks `ll-tokens` for each, and draws one bar per pane, colored by workspace, with input, output and cache stacked; a second view by person, once other people's machines report. A "level" line could mark the run's total against Marlon's previous runs. It belongs in the dashboard The Notebook's `AGENTS.md` says mk-orchestration is to get.

**The demonstration he paired it with.** At 06:25 to 06:27 the record has him wanting a large run on a body of work that is "duplicative" (corrected from "non-duplicative") and needs doing, such as the old HackMDs or transcripts, and that is "not something a script should be doing in a loop." That run is not this card: it is a separate decision, and launching it waits on him. The chart would be how the run is watched.

**What it would take.** About two hours for a first page reading local logs on one machine. No keys, nothing sent anywhere. Logs stay on each laptop, so a two-machine chart needs each machine's export pushed as a file.

**What Marlon would decide.** Whether this is for the LL's own view or something to show (a class on agents, a faculty session); whether "by person" means teammates' machines too, which needs their say; and where it lives (mk-orchestration's dashboard is KB's recommendation).

*KB's proposal, Nov 16. Not Marlon's words unless quoted.*
