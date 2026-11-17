---
title: "Claude Desktop as a learning harness: what it can do today"
description: "Each Claude Desktop feature a folder-based learning harness could use, from Anthropic's official docs read on Nov 15, 2026: what it gives the harness and what a student has to set up."
week: 11
date: 2026-11-15
status: researched (official docs, read 2026-11-15); proposals marked
author: claude (HD, Claude Code 9227a5a5-172f-4bcf-b20c-e8f6ac0a3a8d, started in ll-week-11 on FAS-DDW32PXW5L), with a research helper
sources:
  - https://code.claude.com/docs/en/desktop-quickstart
  - https://code.claude.com/docs/en/desktop
  - https://code.claude.com/docs/en/memory
  - https://code.claude.com/docs/en/skills
  - https://code.claude.com/docs/en/settings
  - https://code.claude.com/docs/en/permissions
  - https://code.claude.com/docs/en/hooks
  - https://code.claude.com/docs/en/mcp
  - https://support.claude.com/en/articles/9517075-what-are-projects
  - https://support.claude.com/en/articles/11473015-retrieval-augmented-generation-rag-for-projects
  - https://support.claude.com/en/articles/17153992-what-are-artifacts-and-how-do-i-use-them
  - https://support.claude.com/en/articles/11817273-use-claude-s-chat-search-and-memory-to-build-on-previous-context
  - https://support.claude.com/en/articles/12512180-use-skills-in-claude
  - https://support.claude.com/en/articles/11176164-use-connectors-to-extend-claude-s-capabilities
  - https://support.claude.com/en/articles/11725091-when-to-use-desktop-and-web-connectors
  - https://support.claude.com/en/articles/10949351-getting-started-with-local-mcp-servers-on-claude-desktop
  - https://support.claude.com/en/articles/10065433-install-claude-desktop
  - https://support.claude.com/en/articles/13345190-get-started-with-claude-cowork
  - https://www.anthropic.com/engineering/desktop-extensions
---

# Claude Desktop as a learning harness: what it can do today

Marlon, Nov 15: "initially within claude desktop . . . like having persistent graphs and data in your claude desktop project can reproduce elements of this sort of thing."

This page goes through each part of Claude Desktop a learning harness could use. For each part it says what the docs say it does, what it gives a harness like [LearnHarness](../learnharness/README.md), and what a student has to set up. **Every product claim comes from Anthropic's official docs, read on Sunday, November 15, 2026**, by HD and a research helper; the URL is given with each one. These pages change month to month. Where we could not confirm a point it is marked **unconfirmed**. Lines marked **HD's reading** are our proposals, not the docs.

The harness built from this is [`starters/learning-harness/`](../../../starters/learning-harness/README.md); the trial run is in [trial.md](trial.md); the note for faculty is [for-faculty.md](for-faculty.md).

## The short version

- **The Code tab is the harness.** It is Claude Code inside the desktop app, working in a folder on the student's computer. It reads the folder's `CLAUDE.md` and its skills, and it reads and writes files there. Those files are the learner's memory between conversations. A chat Project cannot do this: it has uploaded knowledge, but no documented way to write files back.
- **The Code tab needs a paid plan** (Pro, Max, Ultra, Team or Enterprise). On Free, clicking Code shows an upgrade prompt. What Harvard students' accounts include is a question for Marlon (see the end).
- **Nothing else needs installing.** The app includes Claude Code; Node.js, the command-line tool and Git are not needed for a local session in a folder.

## 1. The Code tab (Claude Code in the desktop app)

**What the docs say.** "The desktop app gives you Claude Code with a graphical interface… without using a terminal." The Code tab is at the top of the app's sidebar. You choose **Local** in the environment selector, then **Open folder…** and pick a folder; more folders can be added during a session with **+** → **Add folder**. "The desktop app includes Claude Code, so you don't need to install Node.js or the CLI." Git is needed only for sessions that run in their own worktree, which is off by default. Session types are Local (direct access to your files), Cloud (on Anthropic's machines, working on repositories, not a folder), SSH and, on Windows, WSL. Each session "has its own chat history and project folder"; sessions can be archived. Platforms: macOS 13 and later, Windows 10 and later, Linux in beta. ([quickstart](https://code.claude.com/docs/en/desktop-quickstart), [desktop](https://code.claude.com/docs/en/desktop), [install](https://support.claude.com/en/articles/10065433-install-claude-desktop))

**Plans.** "Claude Code requires a Pro, Max, Ultra, Team, or Enterprise subscription." A Free account sees a prompt to upgrade. ([quickstart](https://code.claude.com/docs/en/desktop-quickstart)) The Help Center's install page has an availability table whose Claude Code row we could not read cleanly; we take the quickstart as the authority.

**Permission modes.** Manual (asks before each edit or command), Accept edits, Plan, Auto, and Bypass permissions (which has to be turned on in Settings). Cloud sessions offer only Accept edits, Plan and Auto. ([desktop](https://code.claude.com/docs/en/desktop))

**What it gives the harness.** Everything below runs here: the folder is the learner's record, `CLAUDE.md` is the tutor's method, skills are the commands, and files written in one conversation are read in the next.

**What a student sets up.** Install the app, sign in with a paid account, click Code, choose Local, open the harness folder. With Manual mode they approve each file write; the starter's `.claude/settings.json` pre-approves writes to the record (see §4), or they can switch to Accept edits.

## 2. `CLAUDE.md` and memory

**What the docs say.** "Each Claude Code session begins with a fresh context window." Two things carry knowledge across sessions: `CLAUDE.md` files and auto memory. A project's `CLAUDE.md` sits at `./CLAUDE.md` or `./.claude/CLAUDE.md`; a personal one at `~/.claude/CLAUDE.md`; `CLAUDE.local.md` is for notes kept out of git. Files in the working folder and every folder above it load at launch and are joined together. A `CLAUDE.md` can import other files with `@path/to/file`. The docs advise keeping each file under 200 lines. **Auto memory** is "on by default in local sessions": Claude saves notes to `~/.claude/projects/<project>/memory/` (a `MEMORY.md` index and one file per memory), loads the first 200 lines or 25 KB each session, and the notes are "machine-local… not shared across machines or cloud environments." It can be turned off in `/memory`. "Desktop and CLI read the same configuration files," including `CLAUDE.md` and `CLAUDE.local.md`. ([memory](https://code.claude.com/docs/en/memory), [desktop](https://code.claude.com/docs/en/desktop))

**What it gives the harness.** `CLAUDE.md` is where the teaching method lives: the four moves, thinking out loud, how to keep the graph. It loads every time the folder is opened, so every conversation starts as the same tutor.

**HD's reading.** Auto memory is the wrong place for the learner's record: it lives outside the folder, on one machine, in a form the student and a web page can't easily read. The harness keeps its record in `graph/` instead, inside the folder, where the student can see it, copy it, and hand it to a web page. Because the folder can sit inside a bigger folder, note that a `CLAUDE.md` in any parent folder also loads; students should keep the harness folder somewhere without one (Documents, Desktop).

**What a student sets up.** Nothing: the `CLAUDE.md` is in the folder.

## 3. Skills and slash commands

**What the docs say.** A skill is a folder with a `SKILL.md` file: project skills at `.claude/skills/<name>/SKILL.md`, personal ones at `~/.claude/skills/`. "You can type `/skill-name` to invoke it directly, and Claude can load it automatically when relevant." Arguments arrive as `$ARGUMENTS`. Frontmatter fields are optional ("Only `description` is recommended") and include `name`, `description`, `argument-hint`, `allowed-tools`, `disable-model-invocation` and `model`. "Custom commands have been merged into skills"; old `.claude/commands/` files still work, but the docs say to "prefer a skill for new work." In the Code tab, the `/` menu lists "your custom skills, project skills from your codebase, and skills from any installed plugins." ([skills](https://code.claude.com/docs/en/skills), [desktop](https://code.claude.com/docs/en/desktop))

**Skills in the chat side.** Skills can also be uploaded to a claude.ai account as a ZIP (Customize › Skills), on every plan including Free, with code execution turned on. It is the same `SKILL.md` format, but uploads accept only `name`, `description`, `license`, `compatibility`, `metadata` and `allowed-tools`; any other field "fails with a hard error." Skills enabled on the account also load in Claude Code (v2.1.273 and later) when signed in to the same account. ([use skills](https://support.claude.com/en/articles/12512180-use-skills-in-claude), [skills](https://code.claude.com/docs/en/skills))

**What it gives the harness.** The four commands: `/learn <topic>`, `/teach`, `/practice`, `/graph`. A student can type them, or just talk and let Claude pick the matching skill.

**What a student sets up.** Nothing: the skills come with the folder. (The starter's skills use `argument-hint`, which the chat-side upload would refuse; they are written for the Code tab.)

## 4. Settings and permissions, hooks

**What the docs say.** `.claude/settings.json` in the folder is shared; `.claude/settings.local.json` is personal; `~/.claude/settings.json` applies to everything the user does. Permission rules go in `permissions.allow`, `ask` and `deny` (for example `Bash(npm run *)`, `Read(./.env)`), and they "apply to Desktop sessions." Hooks are handlers that run on events such as `SessionStart`, `UserPromptSubmit`, `PostToolUse` and `Stop`, and they fire wherever Claude Code runs, the desktop app included. ([settings](https://code.claude.com/docs/en/settings), [permissions](https://code.claude.com/docs/en/permissions), [hooks](https://code.claude.com/docs/en/hooks), [desktop](https://code.claude.com/docs/en/desktop))

**What it gives the harness.** The starter's `.claude/settings.json` allows edits to `graph/`, `sessions/` and `graph.md`, plus `date` and the checker script, so a student in Manual mode isn't asked to approve every record update. Everything else still asks.

**Observed in the trial, not in the docs we read:** Claude Code 2.1.311 ignores a folder's `permissions.allow` rules until that folder has been trusted. Run non-interactively in a fresh copy, it printed "Ignoring 8 permissions.allow entries from .claude/settings.json: this workspace has not been trusted. Run Claude Code interactively here once and accept the trust dialog." So the student has to accept the trust prompt when they first open the folder; whether and how the desktop app shows that prompt is **unconfirmed** (we did not drive the app's window). The fallback is Accept edits mode.

**HD's reading, not built.** A `SessionStart` hook could run the checker and show the learner's status at the start of every conversation, and a `Stop` hook could refuse to end a session with a broken record. Hooks run shell commands, which is a lot to explain to a student; the starter leaves them out.

## 5. Projects (the chat side)

**What the docs say.** Projects are "self-contained workspaces with their own chat histories and knowledge bases": uploaded documents, text and code, plus project instructions. Free accounts can make up to five. On paid plans, retrieval (RAG) turns on when project knowledge nears the context limit and expands capacity "by up to 10x." Team and Enterprise can share projects. A new version of projects is "rolling out… starting with Claude Code." ([projects](https://support.claude.com/en/articles/9517075-what-are-projects), [RAG](https://support.claude.com/en/articles/11473015-retrieval-augmented-generation-rag-for-projects))

**Unconfirmed:** whether a chat Project can read or write a folder on disk. The pages we opened describe uploads only.

**What it gives the harness.** A chat Project can hold the method (as project instructions) and the readings (as knowledge), and it is available on Free. It cannot keep the graph up to date by itself: the learner would have to download what Claude writes and re-upload it each time.

**HD's reading.** A Free-plan fallback is possible: the same `CLAUDE.md` pasted as project instructions, the graph files uploaded as knowledge, and Claude asked to output the updated files at the end of each session for the student to save and re-upload. It is clumsy, and we have not tried it.

## 6. Artifacts

**What the docs say.** Artifacts are documents, dashboards, decks and small interactive tools that open beside the chat and are kept in an Artifacts tab. They are on every plan and in Claude Code, and need "Cloud code execution and file creation" turned on. **They can store data:** personal storage ("Everyone keeps their own private data") or shared storage, by default up to 100 MB or 25,000 records per artifact, with file uploads. **AI-powered artifacts** call Claude with each viewer's own account: "No API keys are required, and there's no cost to you"; use counts against the viewer's plan. Artifacts "start private to you." On Pro and above they can read and write connected apps. ([artifacts](https://support.claude.com/en/articles/17153992-what-are-artifacts-and-how-do-i-use-them))

**What it gives the harness.** A place for the web side: a map of the graph, or a practice game that poses stored questions, which could persist the learner's practice answers in its own storage and even call Claude to mark them, at no API cost to the builder.

**HD's reading.** An artifact's storage is not the folder: data saved in an artifact stays in the artifact. To join them, the student would paste or upload `graph/` into the artifact, or the artifact would export attempts for the harness to read back. For this week the simpler link is HB's web page reading the folder directly (see [web/](../web/)).

## 7. Memory in chat

**What the docs say.** Claude's chat memory saves "individual topics" as you chat, or when you say "remember this"; it can be viewed and edited in Settings. It is on by default for Free, Pro, Max and Ultra on web, desktop and mobile; Team and Enterprise owners control it. "Search and reference chats" is paid-only, and searches within a project or outside projects, not across projects. Each project has its own memory. ([memory and chat search](https://support.claude.com/en/articles/11817273-use-claude-s-chat-search-and-memory-to-build-on-previous-context))

**What it gives the harness.** Little that a file doesn't do better. Memory is summarized by Claude, out of the student's sight in a form a web page can't read, and separate from the Code tab's memory.

## 8. Connectors, extensions and MCP

**What the docs say.** Connectors link Claude to other services, on every plan (Free is limited to one custom remote connector), across Claude, the desktop app, Claude Code and the API. Desktop extensions (`.mcpb` files, formerly `.dxt`) run local MCP servers on the computer and are "only available in Claude Desktop and Claude Code — not on web or mobile." The desktop app loads the MCP servers in its config into local Code tab sessions as well as chat. In Claude Code, `claude mcp add` adds a server; a project's servers can be committed in `.mcp.json`. ([connectors](https://support.claude.com/en/articles/11176164-use-connectors-to-extend-claude-s-capabilities), [desktop vs web](https://support.claude.com/en/articles/11725091-when-to-use-desktop-and-web-connectors), [local MCP](https://support.claude.com/en/articles/10949351-getting-started-with-local-mcp-servers-on-claude-desktop), [desktop](https://code.claude.com/docs/en/desktop), [MCP](https://code.claude.com/docs/en/mcp), [desktop extensions](https://www.anthropic.com/engineering/desktop-extensions))

**Unconfirmed:** the current location of `claude_desktop_config.json`, and whether a built-in filesystem extension ships with the app.

**What it gives the harness.** Not needed for the starter: the Code tab reads and writes the folder without any connector. A connector would matter for bringing in a course's readings from a drive, or for a chat-side harness that needs file access.

## 9. Files on disk, and Cowork

**What the docs say.** The Code tab works in the chosen folder directly. Chat reaches local files only through a desktop extension or local MCP server. **Cowork** "brings Claude Code's agentic capabilities to knowledge work beyond coding": on paid plans, on desktop it works with local files in folders you connect while the app is open, its projects carry their own files, instructions and memory, and it takes skills, plugins and connectors from the claude.ai Customize settings, "not from the CLI's `~/.claude` directory." ([desktop](https://code.claude.com/docs/en/desktop), [Cowork](https://support.claude.com/en/articles/13345190-get-started-with-claude-cowork))

**HD's reading.** Cowork could host the same harness for a student who never wants to see "Code", but it would need the skills uploaded to the account rather than read from the folder. Untried.

## What a student needs, in one list

1. A Claude account on a plan that includes Claude Code (Pro or above, or an institutional plan that includes it).
2. Claude Desktop installed (macOS 13+, Windows 10+).
3. The `learning-harness` folder, copied somewhere with no `CLAUDE.md` above it.
4. In the app: Code → Local → Open folder… → the copy. Then `/learn <topic>`.

Nothing else: no Node, no Git, no terminal. (Node lets Claude run the checker script; without it Claude checks the files by eye.)

## Questions for Marlon

1. **Accounts.** The Code tab needs a paid plan. What do TDM 155AI students' accounts include? The syllabus says students "learn to use Claude Code within the desktop app," so this may already be settled; the harness assumes it.
2. **Cost and model.** In the trial, each turn of the conversation reread 100,000 to 300,000 tokens (mostly cached). On a subscription that counts against the student's usage limits. See [trial.md](trial.md).
