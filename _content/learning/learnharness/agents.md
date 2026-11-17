---
title: "LearnHarness: agents, prompts and providers"
author: claude (HL, Claude Code fa1567c6-380d-4fdb-bcdc-1abe8f0066f1, started in ll-week-11 on FAS-DDW32PXW5L)
date: 2026-11-15
status: "findings from the repository at cb25c8e, paraphrased, with paths"
---

# Agents, prompts and providers

## Three agents over one transcript

`src/agent/teacher-agent.ts` builds three kinds of agent, each rebuilt for every turn from the saved conversation, so the transcript, not a running process, holds the state (`docs/architecture.md`, "Conversations and turns"):

| agent | asks with | other tools |
| --- | --- | --- |
| prober | `probe` or `recall`, `ask_user_question`, `probe_done` | read-only file tools, research and PDF jobs, graph readers (when switched on) |
| teacher | `quiz` or `explain`, `ask_user_question`, `plan_init` | read-only file tools, research, PDF, demo and visual jobs, `show_image` |
| practitioner | `problem`, `conclude` | read-only file tools, research and PDF jobs, graph readers |

A question that passes validation ends the agent's turn; the learner's answer becomes the tool's result on the next turn. Invalid tool calls go back to the model with the error so it can fix them, after a pass that repairs arguments sent as JSON strings (`src/agent/tools/heal.ts`).

## Prompts in layers

Prompts are numbered Markdown fragments joined in order (`src/agent/prompt-segments.ts`, `src/agent/prompts/README.md`): a base system prompt (`src/agent/system-prompt.md`), then each agent's own folder (`prober/`, `teacher/`, `practice/`), then shared fragments. The shared ones, in brief: a dry voice with no praise or agreement bias (`shared/10-voice.md`); check doubtful facts and flag uncertainty (`15-accuracy.md`); read the learner's thinking in full to model how they reason (`16-mental-model.md`); how to write questions, with distractors drawn from real misconceptions and one question per turn (`20-question-tools.md`); how to read confidence (`25-confidence.md`); find and read the learner's files yourself, read-only (`30-learner-files.md`); how to treat side conversations (`35-side-conversations.md`); formatting (`40-formatting.md`). The teacher's own: two placement principles (foundations first, each step discoverable; `05-method.md`), planning, teaching, predictions, question principles, background jobs, demos, images.

Every segment can be overridden by the learner in settings; a switch per segment picks the override file (`src/store/prompt-overrides.ts`). The README calls this "inspectable behavior": "System prompts are visible and editable."

## Background workers

Jobs return at once and deliver their result later by waking the teacher (`src/core/contracts/jobs.ts`, `src/agent/subagents/runner.ts`, `src/server/jobs.ts`):

- `researcher.ts`: a web search and fetch loop that returns a cited brief (Tavily, Brave, Exa, Firecrawl or hosted Ollama search).
- `pdf-reader.ts`: triages and reads a PDF, returns a brief with page citations.
- `demo-builder.ts`: writes a single-file HTML demonstration and tests it in a headless browser until it runs.
- `visual-maker.ts`: writes an SVG, renders it, looks at it and revises; can annotate the learner's own image.
- `extraction.ts`: the graph pipeline (see [the graph](graph.md)).

Background model requests share a pool of eight by default (`docs/architecture.md`, "Shared worker-request admission").

## Providers, and Claude Code as one

The learner brings their own models: API keys, some subscription sign-ins, an installed Claude Code CLI, or a custom OpenAI-compatible endpoint, including a local one; they pick a strong, a cheap and a vision model (`docs/getting-started.md`, `src/agent/models.ts`).

With Claude Code (`docs/claude-code.md`), the app runs the CLI as a model only: off by default, minimum version 2.1.259, models chosen by alias (opus, sonnet, haiku). Each call runs in an empty temporary folder with the CLI's own tools, hooks, slash commands, session saving and `CLAUDE.md` loading switched off; LearnHarness exposes its own tools to the CLI through a token-protected local MCP bridge. The CLI keeps its own login and billing, and the app shows its cost as unpriced rather than zero. The doc is candid that the instruction isolation at the minimum version "has not been runtime verified".

The point for us: LearnHarness uses Claude Code as an engine and keeps the harness (agents, tools, records) in the app. Marlon's idea runs the other way, with Claude Code (in Claude Desktop) as the harness and the folder's files as the record. See [what a folder can do](reproduce.md).

## How the project is built (for faculty curious about the process)

`AGENTS.md` at the root tells coding agents working on LearnHarness never to guess a design decision: ask the human, one question at a time, plan, get approval, then implement. Many contracts and docs carry dated decisions attributed to "owner" (e.g. `src/core/contracts/graph.ts`). The repository has about 1,250 files, more than 400 of them tests (counted in the clone).
