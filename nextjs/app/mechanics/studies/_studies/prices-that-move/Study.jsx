"use client";

import { useState } from "react";
import { BUDGET, BUYERS, START_SETTINGS, SUPPLY, priceAt, replay } from "./market.mjs";

// Study 04: prices that move. No printed price: the next GPU costs base + slope × GPUs sold, so every purchase
// raises the price for everyone after it. A designer can change base or slope during play (rebalancing on the fly);
// the change is a row in the log like any purchase, and past sales stay at the prices they were paid.
// A one-market cut of PE's /proto/economy/prices-that-move.

const COLORS = { lab: "ms-dot-a", startup: "ms-dot-b" };
const fmt = (n) => (Number.isInteger(n) ? String(n) : n.toFixed(1));

function Diagram({ state }) {
  const { settings, sales, changes, price } = state;
  const yMax = Math.max(14, Math.ceil(priceAt(settings, SUPPLY - 1)), ...sales.map((s) => Math.ceil(s.price)));
  const cx = (n) => 70 + n * 44; // n = GPUs sold before this one (0..11)
  const cy = (p) => 500 - (p / yMax) * 276;
  const line = (s) => Array.from({ length: SUPPLY }, (_, n) => `${cx(n)},${cy(priceAt(s, n))}`).join(" ");
  return (
    <svg className="ms-diagram" viewBox="0 0 640 530" role="img" aria-label="Diagram: buying one GPU adds to the number sold; the rule turns the number sold into the next price; the designer can change the rule; below, the price of each GPU against how many were sold before it.">
      <defs>
        <marker id="ms-arrow-4" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0 0L10 5L0 10z" className="ms-arrowhead" />
        </marker>
      </defs>

      <rect x="10" y="40" width="170" height="86" rx="12" className="ms-box ms-box-move" />
      <text x="24" y="64" className="ms-label">1 · THE MOVE</text>
      <text x="24" y="100" className="ms-big">buy one</text>

      <rect x="222" y="40" width="170" height="86" rx="12" className="ms-box" />
      <text x="236" y="64" className="ms-label">2 · THE STATE</text>
      <text x="236" y="92" className="ms-small ms-strong">sold {sales.length} of {SUPPLY}</text>
      <text x="236" y="114" className="ms-small">next price {fmt(price)}</text>

      <g>
        <rect x="424" y="40" width="206" height="86" rx="12" className="ms-box ms-box-replay" />
        <text x="438" y="64" className="ms-label">3 · THE RULE: PRICE =</text>
        <text x="438" y="90" className="ms-small">base + slope × sold</text>
        <text x="438" y="114" className="ms-small ms-strong">base {fmt(settings.base)}, slope {fmt(settings.slope)}</text>
      </g>

      <path d="M180 83H218" className="ms-flow" markerEnd="url(#ms-arrow-4)" />
      <path d="M392 83H420" className="ms-flow" markerEnd="url(#ms-arrow-4)" />
      <path d="M532 126V146H95V130" className="ms-flow ms-flow-back" markerEnd="url(#ms-arrow-4)" />
      <text x="110" y="164" className="ms-small">the next buyer sees the new price</text>
      <text x="532" y="26" textAnchor="middle" className="ms-small ms-hot">the designer rebalances here</text>
      <path d="M532 30V36" className="ms-flow ms-flow-hot" />

      <text x="20" y="196" className="ms-label">THE PRICE OF EACH GPU, BY HOW MANY WERE SOLD BEFORE IT</text>
      <path d={`M${cx(0) - 14} ${cy(0)}H${cx(SUPPLY - 1) + 14}M${cx(0) - 14} ${cy(0)}V${cy(yMax)}`} className="ms-grid" />
      {[0, Math.round(yMax / 2), yMax].map((p) => (
        <text key={p} x={cx(0) - 22} y={cy(p) + 5} textAnchor="end" className="ms-tick">{p}</text>
      ))}
      {Array.from({ length: SUPPLY }, (_, n) => (
        <text key={n} x={cx(n)} y={cy(0) + 22} textAnchor="middle" className="ms-tick">{n}</text>
      ))}
      <polyline points={line(START_SETTINGS)} className="ms-line-ghost" />
      <polyline points={line(settings)} className="ms-line-up" />
      {changes.map((c, i) => (
        <g key={i}>
          <path d={`M${cx(c.atSold) - 22} ${cy(0)}V${cy(yMax)}`} className="ms-flow-back ms-marker" />
          <text x={cx(c.atSold) - 18} y={cy(yMax) + 14 + (i % 3) * 18} className="ms-small ms-hot">{c.key} {fmt(c.from)} → {fmt(c.to)}</text>
        </g>
      ))}
      {sales.map((s) => (
        <circle key={s.n} cx={cx(s.n - 1)} cy={cy(s.price)} r="8" className={COLORS[s.who]} />
      ))}
      <text x={cx(SUPPLY - 1) + 10} y={cy(priceAt(settings, SUPPLY - 1)) - 10} textAnchor="end" className="ms-small ms-hot">the rule now</text>
      <text x={cx(SUPPLY - 1) + 10} y={cy(priceAt(START_SETTINGS, SUPPLY - 1)) + 22} textAnchor="end" className="ms-small">the rule at the start</text>
    </svg>
  );
}

function Log({ rows, state }) {
  if (!rows.length) return <p className="ms-empty">The log is empty. The lab buys first.</p>;
  let turn = 0;
  let sold = 0;
  return (
    <table className="ms-log">
      <thead>
        <tr><th>n</th><th>who</th><th>what</th></tr>
      </thead>
      <tbody>
        {rows.map((row, i) => {
          if (row.kind === "set") return <tr key={i} className="is-designer"><td>{i + 1}</td><td>designer</td><td>{row.key} → {fmt(row.value)}</td></tr>;
          const buyer = BUYERS[turn++ % BUYERS.length];
          const sale = row.kind === "buy" ? state.sales.find((s) => s.n === sold + 1 && s.who === buyer.id) : null;
          if (sale) sold += 1;
          return <tr key={i}><td>{i + 1}</td><td>{buyer.name}</td><td>{row.kind === "pass" ? "passes" : sale ? `buys at ${fmt(sale.price)}` : "can't pay"}</td></tr>;
        })}
      </tbody>
    </table>
  );
}

export default function Study({ rows: startRows = [], print = false }) {
  const [rows, setRows] = useState(startRows);
  const state = replay(rows);
  const add = (row) => setRows([...rows, row]);
  // Dragging a slider writes one row per change of number; consecutive changes to the same number fold into one.
  const set = (key, value) => {
    if (value === state.settings[key]) return;
    const last = rows.at(-1);
    setRows(last?.kind === "set" && last.key === key ? [...rows.slice(0, -1), { kind: "set", key, value }] : [...rows, { kind: "set", key, value }]);
  };

  return (
    <div className={`ms-study${print ? " is-print" : ""}`}>
      <figure className="ms-figure">
        <Diagram state={state} />
        <figcaption>Each dot is a GPU sold, at the price paid. A rebalance bends the line ahead; the dots already sold stay where they were.</figcaption>
      </figure>

      <section className="ms-play" aria-label="Play">
        <p className="ms-status">{state.over ? `Market closed: ${state.over}.` : `${state.next.name} to buy. Next GPU: ${fmt(state.price)}.`}</p>
        <div className="ms-buyers">
          {BUYERS.map((b) => (
            <div key={b.id} className={`ms-buyer${!state.over && state.next.id === b.id ? " is-turn" : ""}`}>
              <span className={`ms-swatch ${COLORS[b.id]}`} aria-hidden="true" />
              <strong>{b.name}</strong>
              <span>{state.owned[b.id]} GPUs · {fmt(state.budget[b.id])} of {BUDGET} left</span>
            </div>
          ))}
        </div>
        {!print && (
          <div className="ms-controls">
            <div className="ms-buttons">
              <button type="button" className="ms-primary" disabled={Boolean(state.over) || state.budget[state.next.id] < state.price} onClick={() => add({ kind: "buy" })}>Buy one at {fmt(state.price)}</button>
              <button type="button" className="ms-primary" disabled={Boolean(state.over)} onClick={() => add({ kind: "pass" })}>Pass</button>
            </div>
            <fieldset className="ms-designer">
              <legend>The designer, during play</legend>
              <label>
                <span>base <strong>{fmt(state.settings.base)}</strong></span>
                <input type="range" min="0" max="8" step="1" value={state.settings.base} onChange={(e) => set("base", Number(e.target.value))} />
              </label>
              <label>
                <span>slope <strong>{fmt(state.settings.slope)}</strong>{state.settings.slope === 0 ? " (a printed price)" : ""}</span>
                <input type="range" min="0" max="2" step="0.5" value={state.settings.slope} onChange={(e) => set("slope", Number(e.target.value))} />
              </label>
            </fieldset>
            <div className="ms-buttons">
              <button type="button" onClick={() => setRows([])}>Start again</button>
            </div>
          </div>
        )}
        <Log rows={rows} state={state} />
        {print && <p className="ms-print-note">An example market: four GPUs at slope 1 (2, 3, 4, 5), then the designer halves the slope and the next four cost 4, 4.5, 5 and 5.5.</p>}
      </section>
    </div>
  );
}
