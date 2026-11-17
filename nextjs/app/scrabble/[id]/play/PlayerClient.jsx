"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useScrabble } from "../../useScrabble.js";
import { BOARD_SIZE, BONUS_GRID, LETTER_SCORES } from "../../../../lib/scrabble/constants.mjs";

const DRAG_THRESHOLD = 8;

export default function PlayerClient({ roomId }) {
  const { game, you, error, clearError, connected, send } = useScrabble(roomId);
  const [name, setName] = useState("");
  const [selectedRackIdx, setSelectedRackIdx] = useState(null);
  const [pending, setPending] = useState([]); // [{ row, col, rackIndex, tile: { letter, score, blank } }]
  const [drag, setDrag] = useState(null);
  const dragRef = useRef(null);
  dragRef.current = drag;

  useEffect(() => {
    if (you?.name && !name) setName(you.name);
  }, [you?.name]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!game || !you) return;
    if (game.phase !== "playing" || you.seat !== game.turnSeat) {
      if (pending.length > 0) setPending([]);
      if (selectedRackIdx !== null) setSelectedRackIdx(null);
    }
  }, [game?.turnSeat, game?.phase, you?.seat]); // eslint-disable-line react-hooks/exhaustive-deps

  // Global pointer handlers for drag.
  useEffect(() => {
    if (!drag) return;
    function onMove(e) {
      const d = dragRef.current;
      if (!d || e.pointerId !== d.pointerId) return;
      const dx = e.clientX - d.startX;
      const dy = e.clientY - d.startY;
      const isDragging = d.isDragging || Math.hypot(dx, dy) > DRAG_THRESHOLD;
      setDrag({ ...d, cx: e.clientX, cy: e.clientY, isDragging });
      if (isDragging) e.preventDefault();
    }
    function onUp(e) {
      const d = dragRef.current;
      if (!d || e.pointerId !== d.pointerId) return;
      finishDrop(d, e.clientX, e.clientY);
      setDrag(null);
    }
    function onCancel() { setDrag(null); }
    window.addEventListener("pointermove", onMove, { passive: false });
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onCancel);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onCancel);
    };
  }, [drag?.pointerId]); // eslint-disable-line react-hooks/exhaustive-deps

  const pendingByCell = useMemo(() => {
    const m = new Map();
    for (const p of pending) m.set(`${p.row},${p.col}`, p);
    return m;
  }, [pending]);
  const pendingByRackIdx = useMemo(() => {
    const m = new Map();
    for (const p of pending) m.set(p.rackIndex, p);
    return m;
  }, [pending]);

  if (!game) {
    return <main className="scrabble-player-shell"><p className="scrabble-fine">Connecting</p></main>;
  }

  const isMyTurn = you && game.phase === "playing" && you.seat === game.turnSeat;
  const turnPlayer = game.players.find((p) => p.seat === game.turnSeat);

  function placeSelectedOnCell(row, col) {
    if (selectedRackIdx === null) return;
    const rackTile = you.rack[selectedRackIdx];
    if (!rackTile) return;
    if (pendingByRackIdx.has(selectedRackIdx)) return;
    if (game.board[row][col]) return;
    if (pendingByCell.has(`${row},${col}`)) return;
    let letter = rackTile.letter;
    if (rackTile.blank) {
      const picked = (typeof window !== "undefined" ? window.prompt("Blank becomes which letter? (A-Z)", "") : "") || "";
      const L = picked.toUpperCase();
      if (!/^[A-Z]$/.test(L)) return;
      letter = L;
    }
    setPending((ps) => [...ps, { row, col, rackIndex: selectedRackIdx, tile: { ...rackTile, letter } }]);
    setSelectedRackIdx(null);
  }

  function startDragFromRack(e, rackIndex) {
    if (pendingByRackIdx.has(rackIndex)) return;
    const rackTile = you.rack[rackIndex];
    if (!rackTile) return;
    const rect = e.currentTarget.getBoundingClientRect();
    setDrag({
      source: "rack",
      rackIndex,
      tile: { ...rackTile },
      pointerId: e.pointerId,
      startX: e.clientX, startY: e.clientY,
      cx: e.clientX, cy: e.clientY,
      offX: e.clientX - (rect.left + rect.width / 2),
      offY: e.clientY - (rect.top + rect.height / 2),
      isDragging: false,
    });
  }

  function startDragFromBoard(e, pend) {
    const rect = e.currentTarget.getBoundingClientRect();
    setDrag({
      source: "board",
      boardPos: { row: pend.row, col: pend.col },
      rackIndex: pend.rackIndex,
      tile: { ...pend.tile },
      pointerId: e.pointerId,
      startX: e.clientX, startY: e.clientY,
      cx: e.clientX, cy: e.clientY,
      offX: e.clientX - (rect.left + rect.width / 2),
      offY: e.clientY - (rect.top + rect.height / 2),
      isDragging: false,
    });
  }

  function finishDrop(d, x, y) {
    if (!d.isDragging) {
      // Tap, not drag.
      if (d.source === "rack") {
        setSelectedRackIdx((prev) => (prev === d.rackIndex ? null : d.rackIndex));
      } else if (d.source === "board") {
        setPending((ps) => ps.filter((p) => !(p.row === d.boardPos.row && p.col === d.boardPos.col)));
      }
      return;
    }
    const el = document.elementFromPoint(x, y);
    const cellEl = el?.closest?.("[data-cell='1']");
    if (cellEl) {
      const row = Number(cellEl.dataset.row);
      const col = Number(cellEl.dataset.col);
      dropOnCell(d, row, col);
    } else if (d.source === "board") {
      setPending((ps) => ps.filter((p) => !(p.row === d.boardPos.row && p.col === d.boardPos.col)));
    }
  }

  function dropOnCell(d, row, col) {
    if (game.board[row][col]) return;
    const key = `${row},${col}`;
    if (d.source === "rack") {
      if (pendingByCell.has(key)) return;
      let letter = d.tile.letter;
      if (d.tile.blank) {
        const picked = (typeof window !== "undefined" ? window.prompt("Blank becomes which letter? (A-Z)", "") : "") || "";
        const L = picked.toUpperCase();
        if (!/^[A-Z]$/.test(L)) return;
        letter = L;
      }
      setPending((ps) => [...ps, { row, col, rackIndex: d.rackIndex, tile: { ...d.tile, letter } }]);
      setSelectedRackIdx(null);
      return;
    }
    if (d.source === "board") {
      if (pendingByCell.has(key)) return;
      setPending((ps) => ps.map((p) => (
        (p.row === d.boardPos.row && p.col === d.boardPos.col)
          ? { ...p, row, col }
          : p
      )));
    }
  }

  function doSubmit() {
    if (!isMyTurn || pending.length === 0) return;
    send({
      type: "submit",
      placements: pending.map((p) => ({
        row: p.row,
        col: p.col,
        tile: { letter: p.tile.letter, score: p.tile.score, blank: p.tile.blank },
      })),
    });
  }

  function doClear() { setPending([]); setSelectedRackIdx(null); }
  function doPass() { if (!isMyTurn) return; setPending([]); send({ type: "pass" }); }
  function doExchange() {
    if (!isMyTurn || selectedRackIdx === null) return;
    send({ type: "exchange", tileIndices: [selectedRackIdx] });
    setSelectedRackIdx(null);
  }
  function doShuffle() { send({ type: "shuffleRack" }); }
  function doSaveName() { if (!name.trim()) return; send({ type: "setName", name: name.trim() }); }
  function doReady() { send({ type: "ready" }); }
  function doStartNow() { send({ type: "startNow" }); }

  const statusText = connected
    ? game.phase === "lobby"
      ? "waiting in lobby"
      : game.phase === "playing"
        ? (isMyTurn ? "your turn" : `${turnPlayer?.name || ""} is up`)
        : "game over"
    : "offline";

  return (
    <main className="scrabble-player-shell">
      <header className="scrabble-player-head">
        <p className="seat">{you ? `${you.name}, seat ${you.seat + 1}` : "Joining"}</p>
        <p className="status-line">{statusText}</p>
      </header>

      {game.phase === "lobby" && you && (
        <section className="scrabble-lobby">
          <label className="scrabble-field">
            <span>Your name</span>
            <input value={name} onChange={(e) => setName(e.target.value)} onBlur={doSaveName} maxLength={24} />
          </label>
          <p className="scrabble-fine">
            {game.players.length} joined, {game.players.filter((p) => p.ready).length} ready
          </p>
          <p className="scrabble-fine">Solo is fine. Hit ready and the game starts.</p>
          <button className="scrabble-btn" onClick={doReady} disabled={you.ready}>
            {you.ready ? "Ready, waiting on others" : "I'm ready"}
          </button>
          <button className="scrabble-btn ghost" onClick={doStartNow}>
            Start now (solo or group)
          </button>
        </section>
      )}

      {game.phase !== "lobby" && you && (
        <>
          <section className="scrabble-mini-board no-touch-scroll">
            {Array.from({ length: BOARD_SIZE }).map((_, r) =>
              Array.from({ length: BOARD_SIZE }).map((_, c) => {
                const bonus = BONUS_GRID[r][c];
                const committed = game.board[r][c];
                const pend = pendingByCell.get(`${r},${c}`);
                const tile = committed || pend?.tile;
                const isCenter = r === 7 && c === 7;
                return (
                  <div
                    key={`${r}-${c}`}
                    data-cell="1"
                    data-row={r}
                    data-col={c}
                    className={`mini-cell bonus-${bonus || "none"}${tile ? " has-tile" : ""}${pend ? " pending" : ""}${isCenter && !tile ? " center" : ""}`}
                    onPointerDown={pend ? (e) => startDragFromBoard(e, pend) : undefined}
                    onClick={pend ? undefined : () => placeSelectedOnCell(r, c)}
                    style={pend ? { touchAction: "none" } : undefined}
                  >
                    {tile ? (
                      <span className="letter">{tile.letter}</span>
                    ) : (
                      isCenter ? "+" : bonus ? bonus : ""
                    )}
                  </div>
                );
              })
            )}
          </section>

          <p className="scrabble-fine pending-line">
            {pending.length === 0
              ? "Tap a rack tile, then tap a board square. Or drag."
              : `${pending.length} tile${pending.length === 1 ? "" : "s"} placed. Hit Play word.`}
          </p>

          <section className="scrabble-rack no-touch-scroll">
            {you.rack.map((t, i) => {
              const used = pendingByRackIdx.has(i);
              const selected = i === selectedRackIdx;
              const hiddenForDrag = drag?.source === "rack" && drag.rackIndex === i && drag.isDragging;
              return (
                <div
                  key={i}
                  className={`rack-tile${used ? " used" : ""}${selected ? " selected" : ""}${t.blank ? " blank" : ""}${hiddenForDrag ? " ghost" : ""}`}
                  onPointerDown={used ? undefined : (e) => startDragFromRack(e, i)}
                  style={{ touchAction: used ? "manipulation" : "none" }}
                  aria-disabled={used}
                >
                  <span className="letter">{t.blank ? "" : t.letter}</span>
                  {!t.blank && <span className="score">{LETTER_SCORES[t.letter] ?? 0}</span>}
                </div>
              );
            })}
          </section>

          <section className="scrabble-controls">
            <button className="scrabble-btn" onClick={doSubmit} disabled={!isMyTurn || pending.length === 0}>Play word</button>
            <button className="scrabble-btn ghost" onClick={doClear} disabled={pending.length === 0}>Clear</button>
            <button className="scrabble-btn ghost" onClick={doShuffle}>Shuffle rack</button>
            <button className="scrabble-btn ghost" onClick={doExchange} disabled={!isMyTurn || selectedRackIdx === null}>Exchange selected</button>
            <button className="scrabble-btn ghost" onClick={doPass} disabled={!isMyTurn}>Pass</button>
          </section>

          <section className="scrabble-scoreline">
            {game.players.map((p) => (
              <span key={p.id} className={p.seat === game.turnSeat ? "turn" : ""}>
                {p.name}: <strong>{p.score}</strong>
              </span>
            ))}
            <span className="scrabble-fine">Bag: {game.bagCount}</span>
          </section>
        </>
      )}

      {error && (
        <p className="scrabble-error" onClick={clearError} role="button">
          {error} <span className="scrabble-error-close">(tap to dismiss)</span>
        </p>
      )}

      {drag?.isDragging && (
        <div
          className={`drag-ghost${drag.tile.blank ? " blank" : ""}`}
          style={{ left: drag.cx - (drag.offX || 0), top: drag.cy - (drag.offY || 0) }}
          aria-hidden="true"
        >
          <span className="letter">{drag.tile.blank ? (drag.tile.letter || "") : (drag.tile.letter || "")}</span>
          {!drag.tile.blank && <span className="score">{LETTER_SCORES[drag.tile.letter] ?? 0}</span>}
        </div>
      )}
    </main>
  );
}
