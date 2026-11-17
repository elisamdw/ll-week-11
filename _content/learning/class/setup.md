---
title: "Setup, step by step: a learning harness in Claude Desktop, and a game from it"
description: "Claude Desktop and its Code tab, your own harness folder, your first session, then the web game on your own graph. One step at a time, with what you should see after each."
kind: activity
audience: tdm155ai
week: 11
date: 2026-11-15
status: "draft, Claude's (HB); for students only after Marlon agrees"
author: claude (HB, Claude Code fe915dbb-5ed5-4918-a50b-18851bd49e0b, started in ll-week-11 on FAS-DDW32PXW5L)
duration: 30
group: solo
play: laptop
materials: ["a laptop (macOS or Windows)", "a Claude account on a plan that includes Claude Code (see step 1)", "Node 22 or newer and pnpm (from the week 10 app)", "the learning-harness starter folder", "the web game (where it lives is Marlon's call: see step 8)"]
sources:
  - "https://code.claude.com/docs/en/desktop-quickstart (read 2026-11-15 by HB's fetch agent, in full)"
  - "https://code.claude.com/docs/en/desktop (read 2026-11-15; parts read only as a summary, marked below)"
  - "starters/learning-harness/CLAUDE.md (HD's harness, 2026-11-15)"
  - "tdm155ai-week-10 README: students ran a local Next app with Node 22+ and pnpm on Nov 11"
---

# Setup, step by step

You will make a folder that teaches you something and remembers what you learned, then play what you learned as a game. Claude Desktop's **Code** tab does the teaching and keeps the files; a small web page turns the files into a map you unlock by answering.

Do one step at a time. Each step ends with **You should see**; if you don't, look up the step in [what can go wrong](what-can-go-wrong.md).

## 1. Check your Claude account

Claude's docs: "Claude Code requires a Pro, Max, Ultra, Team, or Enterprise subscription" (desktop quickstart, read Nov 15, 2026). The Code tab is Claude Code inside the desktop app.

**You should see:** your plan name under your account settings at claude.ai.

> **For Marlon, before this goes to students:** the syllabus promises free tiers and "no expectation that you spend any extra money on tools for this course". The Code tab needs a paid plan. Options: an LL or course account on studio laptops, pairs where one student has access, or students who already pay. Your call.

## 2. Install Claude Desktop

Use the download links in Claude's desktop quickstart, https://code.claude.com/docs/en/desktop-quickstart (it links the macOS universal build and the Windows x64 installer; Windows on ARM has its own; Linux is a beta). Install it like any app.

**You should see:** Claude in your Applications folder (Mac) or Start menu (Windows).

## 3. Open it and sign in

Open Claude and sign in with the same account as step 1.

**You should see:** the Claude window with a **Code** tab at the top, beside Chat. Click **Code**.

## 4. Make your harness folder

Copy the starter folder to somewhere you will find it, such as `Documents/my-harness`. (How students get the starter, a download or a clone of the class repo, depends on where Marlon puts it.) Rename it if you like; the name doesn't matter.

**You should see:** inside the folder, `CLAUDE.md`, `FORMAT.md`, and the folders `graph/`, `sessions/`, `readings/`, `scripts/` and `examples/`.

Optional: drop a reading into `readings/` (a PDF you have, your notes, a list of links). Claude prefers your readings to its own memory and says where each idea came from.

## 5. Open the folder in the Code tab

In the Code tab, the quickstart says to "click the first control, the environment selector, and select the top entry in the **Local** group. Then click the project folder control beside the environment selector, select **Open folder…**, and choose your project's directory." Choose `my-harness`.

**You should see:** the folder's name beside the prompt box. If you ask "What is this folder for?", Claude answers from `CLAUDE.md`: it is your tutor, and it keeps what you learn in `graph/`.

## 6. Choose how much Claude asks first

Under the prompt box is the permission mode. The docs list **Manual** (asks before editing files or running commands, with a diff to accept or reject), **Accept edits** (applies file edits and simple file commands, still asks before other terminal commands), and **Plan** (proposes, edits nothing). Pick **Accept edits**: Claude writes to your graph after every answer, and approving each write breaks the lesson.

**You should see:** "Accept edits" (or similar) in the mode selector. The app remembers it for this folder.

## 7. Learn something

Type `/learn` and a topic, small enough for half an hour: `/learn why a save file can bring back a whole game`, `/learn how a bill becomes law`, `/learn the difference between a rule and a mechanic`. Answer one question at a time; when Claude asks how sure you are, give a number from 1 (a guess) to 4 (obviously true) and a reason.

Claude finds where your understanding stops, agrees a goal with you, maps a route of a few ideas, then teaches one step at a time with a check after each (`/teach` continues; `/practice` is for another day).

**You should see:** after a few answers, `graph/propositions.json` has your ideas and `graph/attempts.json` has your answers in your own words. Ask Claude to "show me my graph" or run `/graph` to get a readable `graph.md`.

## 8. Play your graph as a game

Where the game lives is open (Marlon decides; see [class README](README.md)). Two ways, both drafts:

**A. Run the LL's game on your folder.** Students ran a local Next app on Nov 11 with Node 22 and pnpm, so they have the tools. In the Code tab, open the **Terminal** (click Terminal in the session's title bar, or press Ctrl+\`), then one command at a time:

```
cd /path/to/the-class-app/nextjs
```

```
pnpm install
```

```
LEARN_GRAPH_DIR=/path/to/my-harness pnpm dev
```

(On Windows PowerShell the last one is `$env:LEARN_GRAPH_DIR="C:\path\to\my-harness"; pnpm dev`.) Open the address it prints and add `/learn/mine`.

**B. Ask Claude to make a game in your folder.** In the Code tab, in `my-harness`, ask: "Make a small web learning game in a new `game/` folder that reads my `graph/` files: a map where ideas unlock when everything they require is held, a practice round, and my progress. Plain HTML, CSS and JavaScript. Start a local server and show it in the Browser pane." The docs say Claude "can start a dev server and open it in the Browser pane" (Cmd+Shift+B on Mac, Ctrl+Shift+B on Windows).

**You should see:** a map of your ideas, with the ones you already explained to Claude lit. Answer an open one and the next ones light up.

## 9. Close the loop

Practice a round in the game, then go back to Claude in your folder and type `/practice`. With route A, Claude reads the answers the game added to `graph/attempts.json` (marked `via: "web game"`). With route B, ask Claude to make the game save answers the same way.

**You should see:** Claude mentions what you practiced in the game and starts with what you missed.

---

*Product facts quote Claude's docs as read on Nov 15, 2026; they change month to month. Not tested on a student laptop yet.*
