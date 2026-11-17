---
title: "LearnHarness: the graph"
author: claude (HL, Claude Code fa1567c6-380d-4fdb-bcdc-1abe8f0066f1, started in ll-week-11 on FAS-DDW32PXW5L)
date: 2026-11-15
status: "findings from the repository at cb25c8e, paraphrased, with paths; Claude's comparison with our format labeled"
---

# The knowledge graph

## The data model

The contract is `src/core/contracts/graph.ts`; the store is `src/store/graph.ts`; the read model is `src/core/graph.ts`.

- **Propositions** (nodes): an opaque id (`n_` plus random characters), a short `name` for the canvas (a headword, not unique), a `statement` (one true, self-contained claim at full precision, the identity of the node), `aliases` (other phrasings seen), a creation time, and `provenance`: every chat and message where the idea came up.
- **Chains** (arguments): an id (`arg_…`), the `premises` that jointly imply a `conclusion`, and provenance. Two independent arguments for one conclusion stay two chains. Edges are never stored; the canvas draws them from chains, with a junction node when several premises combine.
- **Sources**: imported notes files, with an id derived from the file path, so re-importing the same file keeps its identity.
- **Bookkeeping**: which chats have been folded in and when (`sessions.jsonl`), fingerprints of the teacher messages already extracted (`coverage.jsonl`), layout positions, render settings, and a format version stamp.

On disk (`docs/architecture.md`, "Storage and notifications"): `graph/nodes.jsonl` and `graph/chains.jsonl` are append-only ledgers. The first line for an id defines a node; later lines for the same id add aliases and provenance. Readers merge by id.

The example data in `tests/fixtures/golden-data/graph/` is real app output: four imported notes files (databases, computer architecture, software architecture, libertarianism), about 300 node lines and 170 chain lines, such as the relational model's information principle resting on "one fact per row" and "one value per cell".

## How it is built

Extraction runs after teaching, in the background, once enough unextracted teacher prose has piled up (default threshold 4096 tokens; `src/core/coverage.ts`, `docs/architecture.md`, "Knowledge graph and imports"). Three stages:

1. An **extractor** model reads the teacher's prose (or an imported file) and proposes propositions and chains (`src/agent/subagents/extraction.ts`).
2. An **auditor** model sees the new propositions and the existing graph, not the source, and decides for each whether it is a new idea or one already in the graph.
3. A deterministic **merger** applies those decisions, unions provenance, removes duplicate and redundant chains, and appends to the ledgers.

Only the teacher's words are extracted; the learner's answers and thinking are not. Practice sessions are never extracted. Notes import runs the same pipeline on a file.

## What it leaves out, on purpose

The graph holds no quiz results, no mastery levels and no ratings of the learner (`README.md`: "It stores the ideas and their connections, not ratings of your ability"; `src/core/contracts/graph.ts`, header, citing a cleanup on 2026-09-27). The read-only skill warns an outside agent that a proposition's presence does not show the learner understood it (`skills/learnharness/SKILL.md`). Clusters on the canvas are grouped by the session that first produced each idea, not by meaning (`src/core/session-clusters.ts`). The archived design notes imagined a state model on top (frontier, decay, unlock value; `docs/archive/vision.md`), which has not been built.

## Ours, compared (Claude's)

[Our format](../format.md) keeps the ideas-not-ratings line and the propositions-and-chains model, and simplifies the rest for a folder Claude edits by hand:

| LearnHarness | ours |
| --- | --- |
| random ids plus a `name` | readable slug ids (`p-orthogonality`) plus a `name` |
| append-only JSONL ledgers, merged on read | one JSON array per file, edited in place; `retired` instead of deleting |
| edges derived from chains only | chains, plus an explicit `requires` list for the game's map |
| provenance at the message level | provenance at the session level |
| plan tree per session, separate from the graph | an optional teaching `plan` in `learner.json` |
| learner's answers inside chat records | `attempts.json`, one record per answer, which the game reads |
| no learner status anywhere | a status (held, shaky, missed, new, open) derived by one rule, never stored |
| three-model extraction pipeline | Claude updates the graph at the end of each session, following the harness's instructions |
