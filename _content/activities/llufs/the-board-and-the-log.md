---
title: "The board and the log"
description: "Replay token actions from a tap log and compare what the ledger records with what a photo can show."
kind: "activity"
audience: "llufs"
week: 11
date: "2026-11-15"
status: "proposal"
author: "LU (Codex 01a1df49-0635-7202-89ec-2b5f4bb5ca6d; FAS-DDW32PXW5L; started in ll-week-11)"
duration: 30
group: "pairs"
play: "hybrid"
materials: ["LL laptop", "paper tokens and color badges", "phone camera or available overhead camera", "printed five-row ledger", "optional verified NFC reader and tags"]
mechanics: ["rewind-and-do-over", "hidden-information", "resource-management"]
readings: ["manovich-1999-database-as-symbolic-form", "sicart-2008-defining-game-mechanics"]
prototypes: ["hybrid/every-tap-is-a-row", "hybrid/photo-to-game-state"]
ideas: ["game-ideas/every-tap-is-a-row", "game-ideas/photo-to-game-state"]
sources: ["_content/prototypes/hybrid/every-tap-is-a-row.md", "_content/prototypes/hybrid/photo-to-game-state.md", "_content/game-ideas/every-tap-is-a-row.md", "_content/game-ideas/photo-to-game-state.md", "_content/game-state/README.md", "_content/bibliography/manovich-1999-database-as-symbolic-form.md", "_content/bibliography/sicart-2008-defining-game-mechanics.md"]
---

# The board and the log

1. **Read the input path (4 min).** Open PB’s Every tap is a row card and page. Begin with its documented keys or clicks. Treat NFC as optional until someone verifies the exact reader and tags on this laptop; phone tapping is not a requirement.
2. **Play and mirror (6 min).** One fellow plays a short round while another mirrors successful resource claims using paper tokens. Record failed actions separately. Use the page’s stated game mechanics rather than inventing assumptions about what a tap should do.
3. **Freeze the board (5 min).** Photograph only the board and tokens. Write the state visible in the picture as a small table: token, location, quantity, owner/color if visible. Mark unknown values rather than guessing.
4. **Read and replay (8 min).** Use the prototype’s log, CSV and replay control if present and working. Reconstruct a previous point with tokens. If a control fails, copy five rows by hand and report the failure. Ask which attempted actions appear in the log but leave the board unchanged.
5. **Write the station label (7 min).** Put the photo, the state table and five event rows side by side. Explain which records answer “where are things?” and which answer “what happened?” Check the explanation with another pair.

**What it teaches and why:** Manovich’s data-and-algorithm discussion, as summarized in the repo, supplies the bridge between a collection of records and a path through play. The current board is a state; an event history can reconstruct states only if its starting conditions and transition behavior are known. A photograph may miss hidden cards, turn order and actions between frames.

**Optional annotation tool:** PB’s Photo to game state card now exists at `/proto/hybrid/photo-to-game-state`. A person pins pieces and supplies labels; it does not call a vision model. PL’s readiness reply, recorded Nov 15 at 08:21:56 EST, reports a headless check using example pins only, with no real photo or webcam test. Keep the handwritten table unless the available capture path is checked. Two states show a difference; multiple sequences of events can lead to the same difference, so do not infer a complete move history from two photos.

**Prepare:** PB’s card documents the candidate controls; verify them on the current build. Use fabricated token data and no identifiable people in the photograph. Keep hardware compatibility as a separate test, never as a condition for playing.

**Try it:** one LL laptop, paper badges and resource tokens, plus a phone camera. Five manually written event rows are enough for the replay exercise.

**What could go wrong:** treating all scans as successful moves; assuming a generic NFC reader works with the page; expecting a photo to recover an event history. Compare attempted and accepted actions, and preserve unknowns.

*LU’s proposal, Nov 15; no activity or hardware test is reported as completed.*
