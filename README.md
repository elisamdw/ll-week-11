# ll-week-11

The Learning Lab's repo for week 11 (November 16–20, 2026): **games and interaction**. Private, created November 13 as mkuzmick, nested in The Notebook at `apps/ll-weeks/ll-week-11/`.

The week's plan lives in The Notebook at `_context/projects/50-in-focus/ll-weeks/fall-2026/11-ending-20261120/`, with the builds that matter in its `builds.md`: the game-mechanics inventory, the Stafford AI strategy game (Nov 23), active-learning tools and a gamified AIBL Connect, the EXPOS 40 home game, and learning-games research. Which of them are built here is not decided yet; each build that has its own repo (`ll-26-27/expos40`, `ll-26-27-secret/aibl-connect`) stays there.

## Layout

- `_content/`: the site. `_content/ideas/` holds Marlon's ideas as atomic cards, one Markdown file each (Nov 13), with saved board and graph arrangements in `_content/ideas/_layouts/`.
- `_content/game/`: the week 11 game (Nov 14): design notes, and in `_rulesets/` one JSON file per version of the game (*Data Center*, *Normal Technology*, *The Committee*, *Blank*, and any remixes saved from the editor). `_content/paperclips/`: Universal Paperclips, its licence (none published), and why we write our own.
- `_content/game-ideas/`: game idea cards (Nov 14, Claude's proposals: NFC, tabletop and phone, AR/XR with a phone), in the same views as `_content/ideas/` at `/game-ideas`, `/game-ideas/print`, `/game-ideas/board`, `/game-ideas/graph`.
- `_content/theory/`, `_content/history/`, `_content/media/`, `_content/story/`: the Nov 14 game-week research (TH, HI, CX).
- `_context/`: the week's shared working context, at `/context`.
- `nextjs/`: the reader app, copied Nov 13 from `ll-26-27/ll-week-9`'s `nextjs/` (without its weekly-stories viewer), plus the ideas views: `/ideas` (browse and filter), `/ideas/<slug>`, `/ideas/print` (cut-out cards on Letter: `?per=4|6|8`, `?week=`, `?tag=`, `?kind=`, `?quote=1`), `/ideas/board` (whiteboard), `/ideas/graph` (node graph, `@xyflow/react`). Arrangements save through `/api/ideas/layout/<name>` into `_content/ideas/_layouts/`. The game: `/game` (the versions), `/game/play/<version>` (hotseat on one screen, saved in the browser), `/game/edit/<version>` (edit the rules, play the draft, save a remix through `/api/game/rules/<name>` into `_content/game/_rulesets/`); the engine is `lib/game-engine.mjs`.

Run it on the laptop:

```
cd /Users/marlonkuzmick/Development/mk-27/apps/the-notebook/apps/ll-weeks/ll-week-11/nextjs
pnpm install
pnpm dev
```

It serves at http://localhost:3111. Not deployed: the board and graph write into the repo, so it runs locally.
