---
title: "The screenshot is already old"
description: "A computer-use screenshot costs about a thousand tokens and the history is resent every turn; the agent acts seconds after it looked, and a screen that changed in between redirects the click."
kind: reading
convolute: game-state
tags: [research, turns, autonomy, claude-code]
audience: [tdm155ai, ll]
links: [what-happens-when-the-screen-changes-mid-turn, claude-thinks-at-turn-speed, agents-are-turns-all-the-way-down, continuous-and-discrete-spaces]
sources: ["W11/research/computer-use-screenshots.md", "https://platform.claude.com/docs/en/build-with-claude/vision", "https://platform.claude.com/docs/en/agents-and-tools/tool-use/computer-use-tool", "https://platform.claude.com/docs/en/build-with-claude/prompt-caching", "https://www.anthropic.com/news/developing-computer-use", "https://arxiv.org/abs/2604.18860", "https://arxiv.org/html/2404.07972v2", "https://arxiv.org/abs/2411.02391", "https://developers.openai.com/api/docs/guides/tools-computer-use"]
voice: drafted
author: KR
date: 2026-11-16
week: 11
status: draft
---

Marlon's conjecture holds on both counts. A 1024×768 screenshot costs about 1,036 tokens, and a long loop resends its screenshot history every turn, so the cost piles up. And the agent acts on a picture taken seconds earlier: one 2026 paper measured a mean gap of 6.5 seconds, and changes inside that gap redirected every action it tested. No vendor document covers resizing mid-task.

---

**The answer to** [What happens when the screen changes mid-turn?](what-happens-when-the-screen-changes-mid-turn.md), from a research pass on Nov 16; the full note is `W11/research/computer-use-screenshots.md`.

**The cost.** Anthropic's vision docs: an image "costs `⌈width / 28⌉ × ⌈height / 28⌉` visual tokens," so 1024×768 is 37 × 28 = 1,036. The computer-use docs: "Long agent loops accumulate screenshots quickly (roughly 1,000–1,800 input tokens each)," and the toolset itself adds about 4,500 input tokens per request. Earlier screenshots can be cached, but "the presence/absence of images anywhere in the prompt" invalidates the cache, so the docs advise pruning old screenshots in batches: keep the last three, prune every 25 turns. KR's arithmetic from the researcher's note: fifty turns that keep every screenshot send about 1.3 million screenshot tokens.

**How it sees.** Anthropic's October 2024 research post: Claude "counts how many pixels vertically or horizontally it needs to move a cursor," and "Training Claude to count pixels accurately was critical." It names the problem the Nov 16 note called a stale turn: the "flipbook" view means Claude "can miss short-lived actions or notifications."

**The gap.** A 2026 paper on desktop agents measured "the observation-to-action gap (mean 6.51 s on real OSWorld workloads)"; switching the focused window inside that gap redirected 100% of actions, and checking again just before acting stopped it. Pop-ups cut task success by 47% (2024). OSWorld (2024) shrank the window to its minimum before tasks began, and success on one subset fell from 50.79% to 15.04%.

**Resizing.** No Anthropic or OpenAI page found addresses a resize mid-task. The current Anthropic toolset takes coordinates "in the pixel space of the screenshots you return," and the harness keeps the scale factor; so a click computed on the old picture would be mapped with the old scale, as the researcher reads it. OpenAI's sample code re-checks its target before clicking: "The page may have changed after approval, so bind the click again."

**For the class, as KR reads it.** This is the turn-based player in a real-time world from [Claude thinks at turn speed](claude-thinks-at-turn-speed.md), with numbers. It could be shown by resizing a window while an agent works, if Marlon wants a live demonstration.

*KR's account of a sourced research note, Nov 16. The last paragraph is KR's proposal.*
