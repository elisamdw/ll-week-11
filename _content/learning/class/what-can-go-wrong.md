---
title: "What can go wrong, and how to recover"
description: "Accounts, installs, Node, permissions, the folder, and the game: the likely snags in the harness setup and what to do about each."
kind: research
audience: tdm155ai
week: 11
date: 2026-11-15
status: "draft, Claude's (HB); not tested on a student laptop"
author: claude (HB, Claude Code fe915dbb-5ed5-4918-a50b-18851bd49e0b, started in ll-week-11 on FAS-DDW32PXW5L)
sources:
  - "https://code.claude.com/docs/en/desktop-quickstart (read 2026-11-15)"
  - "https://code.claude.com/docs/en/desktop (read 2026-11-15; items marked [summary] were read only as a summary of the page, not verbatim)"
---

# What can go wrong

The general rule in class: if a fix takes more than five minutes, pair with someone whose setup works and come back to it later. A broken setup is a fine thing to show; say what Claude said about it.

## Accounts

| what you see | what it means | what to do |
| --- | --- | --- |
| A prompt to upgrade when you click **Code** | The quickstart: "you need to subscribe to a paid plan first." | Don't buy anything for class. Pair up, or use a studio laptop if Marlon sets one up (open question for him). |
| A prompt to sign in online | The quickstart: "complete the sign-in and restart the app." | Finish signing in in the browser, then quit Claude fully and reopen. |
| A 403 error | An authentication problem. The docs' first fix [summary]: sign out and back in from the app menu; if that fails, quit the app completely (not just the window) and sign in again. | As stated. The docs [summary] also say to check your internet connection and proxy settings. |
| The Code tab is missing | An old version of the app. | Mac: **Claude > Check for Updates…**; Windows: **Help > Check for Updates…** (from the docs). |

## Installs

- **Windows: "Git is required".** Only for sessions in an isolated copy of the folder (worktrees), which are off by default. If it appears, the docs say [summary] to install Git for Windows and try again. Otherwise, turn Worktree off.
- **"Failed to load session".** The docs [summary]: the folder may have moved or been deleted, or file permissions block it. Reopen the folder with **Open folder…**; keep it somewhere ordinary like Documents, not a cloud-synced folder that is still downloading.
- **Mac asks whether Claude can access Documents (or Desktop, Downloads); this is macOS, not from Claude's docs.** Allow it, or the Code tab can't read your folder. If you said no: System Settings > Privacy & Security > Files and Folders, find Claude, turn the folder on.

## Node and pnpm (only for running the game)

The Code tab itself doesn't need Node: "The desktop app includes Claude Code, so you don't need to install Node.js or the CLI to use the Code tab" (quickstart). The web game does.

- **`node: command not found`, or a version under 22.** Install the LTS from nodejs.org, then open a **new** terminal (on Windows, the docs [summary]: PATH changes reach only new terminal sessions, and Claude Desktop must be quit and reopened to see them).
- **`pnpm: command not found`.** Run `corepack enable` once (it comes with Node), then try again. If that is refused, ask Claude in the Code tab: "pnpm isn't installed; what's the simplest way on this laptop?"
- **Claude can't find `node` or `pnpm` but your own terminal can.** The docs [summary]: check the tools work in your regular terminal, then quit and reopen Claude Desktop so it picks up your PATH.
- **Port already in use.** Another app is running. Stop it (Ctrl+C in its terminal) or run on another port: `pnpm dev -p 3112`.

## Permissions inside a session

- **Claude asks before every single file write.** You are in **Manual**. Switch to **Accept edits** in the mode selector under the prompt box. It still asks before running commands, which is what you want.
- **Claude wants to run a command you don't recognise.** Ask it "what does that do, in one sentence?" before you approve. Never approve deleting files outside your harness folder.
- **Don't use Bypass permissions.** The docs: "Only use this in sandboxed containers or VMs."

## The harness

- **Claude teaches but nothing appears in `graph/`.** Say: "Read CLAUDE.md again and write what we've done so far to the graph files." Check `graph/attempts.json` afterwards.
- **Claude writes several ideas in one turn, or lectures.** Say: "One step at a time, and check me after each." That is the harness's own rule (`CLAUDE.md`), so Claude will hold to it once reminded.
- **A new conversation doesn't remember.** It should: the memory is the files. Ask "read graph/ and tell me where we stopped." If it can't, the files didn't get written; see the first item.
- **Something you said got recorded wrongly.** Say so; Claude fixes the attempt and keeps your words. Your words are the record.

## The game

- **The page lists problems in red.** A file is broken: bad JSON, an idea that `requires` one that doesn't exist, or a loop. Copy the list into Claude in your harness folder and ask it to fix the files.
- **"mine" doesn't appear on /learn.** The app didn't get your folder: stop it and start again with `LEARN_GRAPH_DIR=/full/path/to/my-harness pnpm dev`, the full path, no `~`. The folder must contain `graph/propositions.json`.
- **Answers don't save to the folder.** The page says "Answers stay in this browser" for examples and the sample; only **mine** writes to disk. If **mine** shows an error, the app can't write `graph/attempts.json`: close it in any other editor and try again.
- **Everything is locked.** Nothing is held yet, or your foundations have `requires` they shouldn't. Ask Claude: "Which of my ideas are foundations? They should require nothing."
