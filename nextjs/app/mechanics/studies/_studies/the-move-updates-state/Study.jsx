"use client";

import { useState } from "react";
import { DEMO } from "./demo.mjs";

// Study 01: the move updates state. Tic-tac-toe where nothing is stored but the moves. The board, whose turn it is
// and the result are all computed by replay() from the log, up to the slider. Copied in miniature from PB's
// /proto/hybrid/every-tap-is-a-row (TapLog.jsx), whose board is also nothing but its rows replayed.

const CELLS = ["top-left", "top", "top-right", "left", "centre", "right", "bottom-left", "bottom", "bottom-right"];
const LINES = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];

const other = (player) => (player === "X" ? "O" : "X");

// The whole mechanic: start empty, apply each move in order. The rule only changes how the result is read.
function replay(cells, upto, rule) {
  const board = Array(9).fill(null);
  let result = null;
  cells.slice(0, upto).forEach((cell, i) => {
    const player = i % 2 ? "O" : "X";
    board[cell] = player;
    const line = LINES.find((l) => l.every((c) => board[c] === player));
    if (line && !result) result = { line, move: i + 1, winner: rule === "wins" ? player : other(player), maker: player };
  });
  const full = board.every(Boolean);
  return { board, next: upto % 2 ? "O" : "X", result, over: Boolean(result) || full, draw: !result && full };
}

function resultText(state, rule) {
  if (state.result) {
    const { maker, winner, move } = state.result;
    return rule === "wins" ? `${winner} wins on move ${move}` : `${maker} made three in a row on move ${move}, so ${winner} wins`;
  }
  if (state.draw) return "a draw";
  return `${state.next} to move`;
}

function Diagram({ cells, upto, rule, state }) {
  const last = upto > 0 ? { n: upto, player: upto % 2 ? "X" : "O", cell: CELLS[cells[upto - 1]] } : null;
  const rows = cells.slice(0, upto).map((cell, i) => `${i + 1} ${i % 2 ? "O" : "X"} ${CELLS[cell]}`);
  const shown = rows.slice(-4);
  const mini = (i) => state.board[i] || "·";
  return (
    <svg className="ms-diagram" viewBox="0 0 640 470" role="img" aria-label="Diagram: a move is written to the log; replay applies every row under the rule to make the state; the player reads the state and makes the next move.">
      <defs>
        <marker id="ms-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0 0L10 5L0 10z" className="ms-arrowhead" />
        </marker>
      </defs>

      {/* 1. the move */}
      <g>
        <rect x="10" y="20" width="180" height="120" rx="12" className="ms-box ms-box-move" />
        <text x="26" y="48" className="ms-label">1 · THE MOVE</text>
        <text x="26" y="86" className="ms-big">{last ? `${last.player} → ${last.cell}` : "a click"}</text>
        <text x="26" y="118" className="ms-small">{last ? `move ${last.n}, one row` : "nothing yet"}</text>
      </g>

      {/* 2. the log */}
      <g>
        <rect x="240" y="20" width="390" height="140" rx="12" className="ms-box ms-box-log" />
        <text x="256" y="48" className="ms-label">2 · THE LOG ({rows.length} {rows.length === 1 ? "row" : "rows"}): all that is kept</text>
        {shown.length ? shown.map((row, i) => (
          <text key={row} x="256" y={78 + i * 22} className={`ms-mono${i === shown.length - 1 ? " ms-hot" : ""}`}>{row}</text>
        )) : <text x="256" y="80" className="ms-mono ms-dim">empty</text>}
        {rows.length > shown.length && <text x="610" y="80" textAnchor="end" className="ms-small">+{rows.length - shown.length} earlier</text>}
      </g>

      {/* 3. replay, under the rule */}
      <g>
        <rect x="350" y="222" width="280" height="76" rx="38" className="ms-box ms-box-replay" />
        <text x="490" y="254" textAnchor="middle" className="ms-label">3 · REPLAY(LOG)</text>
        <text x="490" y="280" textAnchor="middle" className="ms-small">rule: three in a row {rule}</text>
      </g>

      {/* 4. the state */}
      <g>
        <rect x="10" y="190" width="300" height="270" rx="12" className="ms-box ms-box-state" />
        <text x="26" y="218" className="ms-label">4 · THE STATE: computed</text>
        {state.board.map((_, i) => (
          <text key={i} x={56 + (i % 3) * 44} y={268 + Math.floor(i / 3) * 44} textAnchor="middle" className={`ms-cell${state.result?.line.includes(i) ? " ms-hot" : ""}`}>{mini(i)}</text>
        ))}
        <path d="M78 240v132M122 240v132M34 284h132M34 328h132" className="ms-grid" />
        <text x="186" y="262" className="ms-small">board</text>
        <text x="186" y="290" className="ms-small">next: {state.over ? "none" : state.next}</text>
        <text x="186" y="318" className="ms-small">moves: {upto}</text>
        <text x="26" y="410" className="ms-small ms-strong">{resultText(state, rule)}</text>
        <text x="26" y="438" className="ms-small">never saved: a picture of the log</text>
      </g>

      {/* arrows */}
      <path d="M190 80H234" className="ms-flow" markerEnd="url(#ms-arrow)" />
      <path d="M490 160V216" className="ms-flow" markerEnd="url(#ms-arrow)" />
      <path d="M350 260H316" className="ms-flow" markerEnd="url(#ms-arrow)" />
      <path d="M100 190V146" className="ms-flow ms-flow-back" markerEnd="url(#ms-arrow)" />
      <text x="110" y="176" className="ms-small">the next player reads the board, then moves</text>
    </svg>
  );
}

function Board({ state, onPlay, disabled }) {
  return (
    <div className="ms-board" role="grid" aria-label="Tic-tac-toe board">
      {state.board.map((mark, i) => (
        <button
          key={CELLS[i]}
          type="button"
          className={`ms-square${state.result?.line.includes(i) ? " is-line" : ""}`}
          aria-label={`${CELLS[i]}: ${mark || "empty"}`}
          disabled={disabled || Boolean(mark) || state.over}
          onClick={() => onPlay(i)}
        >
          {mark}
        </button>
      ))}
    </div>
  );
}

function LogTable({ cells, upto, onPick }) {
  if (!cells.length) return <p className="ms-empty">The log is empty. Click a square.</p>;
  return (
    <table className="ms-log">
      <thead>
        <tr><th>n</th><th>who</th><th>where</th></tr>
      </thead>
      <tbody>
        {cells.map((cell, i) => (
          <tr key={i} className={i < upto ? "" : "is-future"} onClick={onPick ? () => onPick(i + 1) : undefined}>
            <td>{i + 1}</td><td>{i % 2 ? "O" : "X"}</td><td>{CELLS[cell]}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default function Study({ initial = [], print = false }) {
  const [cells, setCells] = useState(initial);
  const [upto, setUpto] = useState(initial.length);
  const [rule, setRule] = useState("wins");
  const state = replay(cells, upto, rule);

  // A move made while rewound cuts the log there: the rows after it never happened.
  const play = (cell) => {
    const next = [...cells.slice(0, upto), cell];
    setCells(next);
    setUpto(next.length);
  };
  const load = (list) => {
    setCells(list);
    setUpto(list.length);
  };

  return (
    <div className={`ms-study${print ? " is-print" : ""}`}>
      <figure className="ms-figure">
        <Diagram cells={cells} upto={upto} rule={rule} state={state} />
        <figcaption>The diagram follows the game: it shows the last move, the newest rows, and the state replay makes from them.</figcaption>
      </figure>

      <section className="ms-play" aria-label="Play">
        <div className="ms-play-top">
          <Board state={state} onPlay={play} disabled={print} />
          <div className="ms-play-side">
            <p className="ms-status">{resultText(state, rule)}</p>
            <LogTable cells={cells} upto={upto} onPick={print ? null : setUpto} />
          </div>
        </div>

        {!print && (
          <div className="ms-controls">
            <label className="ms-slider">
              <span>Replay the log to move <strong>{upto}</strong> of {cells.length}</span>
              <input type="range" min="0" max={cells.length} value={upto} onChange={(e) => setUpto(Number(e.target.value))} />
            </label>
            <fieldset className="ms-rule">
              <legend>The rule that reads the log (card 01)</legend>
              <label><input type="radio" name="ms-rule" checked={rule === "wins"} onChange={() => setRule("wins")} /> three in a row wins</label>
              <label><input type="radio" name="ms-rule" checked={rule === "loses"} onChange={() => setRule("loses")} /> three in a row loses</label>
            </fieldset>
            <div className="ms-buttons">
              <button type="button" onClick={() => load([])}>Clear the log</button>
              <button type="button" onClick={() => load(DEMO)}>Load an example game</button>
            </div>
          </div>
        )}
        {print && (
          <p className="ms-print-note">
            The example game, replayed to move {upto}. Read it under the other rule (three in a row loses) and the same seven rows give: {resultText(replay(cells, upto, rule === "wins" ? "loses" : "wins"), rule === "wins" ? "loses" : "wins")}.
          </p>
        )}
      </section>
    </div>
  );
}
