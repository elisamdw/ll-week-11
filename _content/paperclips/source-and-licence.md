---
title: "Universal Paperclips: is it open source?"
kind: licence
year: 2017
creators: ["Frank Lantz", "Everybody House Games, LLC"]
sources:
  - https://www.decisionproblem.com/paperclips/
  - https://www.decisionproblem.com/paperclips/index2.html
  - https://apps.apple.com/us/app/universal-paperclips/id1300634274
  - https://api.github.com/search/repositories?q=universal+paperclips&sort=stars&order=desc
  - https://github.com/jgmize/paperclips
  - https://github.com/Alex313031/universal-paperclips-electron
  - https://github.com/PaulAtkins88/paperclips
  - https://api.github.com/repos/PaulAtkins88/paperclips/license
status: researched
author: claude (GL, Claude Code b22f4671-724b-4e93-a1fc-63f5bd3e79ae, with a research subagent; started in ll-week-11 on FAS-DDW32PXW5L)
date: 2026-11-14
---

# Universal Paperclips: is it open source?

Marlon, Nov 14: "maybe even rebuild it---or is it an opensource repo?"

**Short answer: no.** The game's JavaScript can be read in any browser, but nobody has published a licence that lets others copy or adapt it. Readable code is not open code: without a licence, ordinary copyright applies.

## What we found

**The official site** (https://www.decisionproblem.com/paperclips/ and the game page, `index2.html`):

- No copyright line, licence, or terms on either page. The pages carry Google Analytics, store badges, and a merchandise link.
- The game is four plain scripts: `main.js`, `globals.js`, `projects.js`, `combat.js`. None contains "copyright", "licence", "license", or "all rights"; each starts straight into code. (Checked by keyword search on Nov 14; nothing saved.)

**The mobile apps** carry "© 2017 Everybody House Games, LLC" (App Store page).

**Statements about open-sourcing:** none found from Lantz, Foddy, or Everybody House Games.

**GitHub.** The search API returns 147 repositories for "universal paperclips." The prominent ones:

| Repo | Stars | Licence file | What it is |
| --- | --- | --- | --- |
| https://github.com/jgmize/paperclips | 121 (94 forks) | none | "Universal Paperclips mirror": a scrape of the original, credited to Lantz and Foddy, with analytics removed and cheats uncommented; created Nov 3, 2017; no statement of permission |
| https://github.com/ianfixes/universal_paperclips | 30 | none | "messing with the source"; created Oct 11, 2017 |
| https://github.com/Alex313031/universal-paperclips-electron | 14 | GPL-3.0 | an Electron port of a fan offline build; no statement of permission from Lantz |
| https://github.com/keybounce/paperclips | 12 | none | "Fork of Frank Lantz's Universal Paperclips" |
| https://github.com/zhang-astronaut/paperclips-zh | 6 | none | Chinese translation |
| https://github.com/StevenMilneDev/paperclips | 5 | none | a mirror |
| https://github.com/RandomDude4/UniversalPaperclips | 4 | none | "Unofficial patching and modding" |

A licence file added by someone who copied Lantz's code does not license that code: an uploader can't grant rights they don't hold.

**Re-implementations:**

- https://github.com/PaulAtkins88/paperclips (React/TypeScript, 2026): an "unofficial, non-commercial fan project" whose "core logic/math is derived from the original." Its MIT licence covers its UI code only and says "the Universal Paperclips IP, narrative text, and core logic are proprietary to Frank Lantz."
- No clean, fully licensed re-implementation found.

## Confirmed and not confirmed

- **Confirmed:** no open licence on the official game; no statement about open-sourcing it; the mobile version is © Everybody House Games; the GitHub mirrors have either no licence or one the uploader added.
- **Not confirmed:** whether Lantz has ever said informally that mirrors are fine. We found nothing either way.

## What this means for us

- Playing it is fine: it's free in the browser, and the Nov 3 proposal to William already has students play it for an hour.
- Copying its code, text, or art into our game is not, unless Lantz or Everybody House Games grants permission.
- Borrowing its **mechanics** (incremental growth, trust as a gate, a staged reveal, a prestige reset) is the normal practice of game design; mechanics are ideas, and we write our own code and words. See [recommendation.md](recommendation.md).
