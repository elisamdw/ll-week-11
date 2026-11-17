"use client";

import { useEffect, useState } from "react";
import { BUILD_COST, ROUNDS, START, outputFor, play, upkeepFor } from "./loop.mjs";

// Study 03: a growth loop whose costs outrun its output. Each server adds the same output and more upkeep than the
// one before, so there is a best size and an optimizer that always builds goes past it. A switch moves the upkeep
// off the builder and onto the commons (the neighbours' power and water): then the builder never feels it.
// Like study 01, nothing is stored but the moves; the state is play(actions, payer).

const MAX_N = 10;

function endText(state, payer) {
  if (state.over === "bankrupt") return `Broke in round ${state.round}: upkeep ${state.history.at(-1).upkeep} against output ${state.history.at(-1).output}.`;
  if (state.over === "dry") return `The commons ran dry in round ${state.round}, with the builder holding ${state.cash}.`;
  if (state.over === "time") return `Ten rounds: the builder ends with ${state.cash}${payer === "neighbours" ? `, the commons with ${state.commons}` : ""}.`;
  return `Round ${state.round + 1} of ${ROUNDS}: build or hold?`;
}

function Diagram({ state, payer }) {
  const n = state.servers;
  const out = outputFor(n);
  const up = upkeepFor(n);
  // the chart: servers 0..10 across, 0..56 up
  const cx = (s) => 60 + s * 54;
  const cy = (v) => 480 - v * 2.6;
  const outLine = Array.from({ length: MAX_N + 1 }, (_, s) => `${cx(s)},${cy(outputFor(s))}`).join(" ");
  const upLine = Array.from({ length: MAX_N + 1 }, (_, s) => `${cx(s)},${cy(Math.min(upkeepFor(s), 60))}`).join(" ");
  const toNeighbours = payer === "neighbours";
  return (
    <svg className="ms-diagram" viewBox="0 0 640 510" role="img" aria-label="Diagram: servers produce output into the builder's cash and draw upkeep from the builder or the commons; below, output grows in a straight line and upkeep in a curve that crosses it.">
      <defs>
        <marker id="ms-arrow-3" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0 0L10 5L0 10z" className="ms-arrowhead" />
        </marker>
      </defs>

      <rect x="230" y="10" width="180" height="86" rx="12" className="ms-box ms-box-move" />
      <text x="246" y="36" className="ms-label">THE SERVERS</text>
      <text x="246" y="76" className="ms-big">{n}</text>

      <rect x="20" y="150" width="200" height="86" rx="12" className={`ms-box${toNeighbours ? "" : " ms-box-move"}`} />
      <text x="36" y="176" className="ms-label">THE BUILDER'S CASH</text>
      <text x="36" y="216" className="ms-big">{state.cash}</text>

      <rect x="420" y="150" width="200" height="86" rx="12" className={`ms-box${toNeighbours ? " ms-box-move" : ""}`} />
      <text x="436" y="176" className="ms-label">THE COMMONS</text>
      <text x="436" y="216" className="ms-big">{state.commons}</text>

      <path d="M60 150V60H226" className="ms-flow ms-flow-back" markerEnd="url(#ms-arrow-3)" />
      <text x="72" y="50" className="ms-small">build: −{BUILD_COST}</text>
      <path d="M262 96L196 146" className="ms-flow" markerEnd="url(#ms-arrow-3)" />
      <text x="196" y="124" textAnchor="end" className="ms-small ms-strong">output +{out}</text>
      <path d={toNeighbours ? "M378 96L444 146" : "M300 96L210 236"} className="ms-flow ms-flow-hot" markerEnd="url(#ms-arrow-3)" />
      <text x={toNeighbours ? 426 : 262} y={toNeighbours ? 132 : 200} className="ms-small ms-hot">upkeep −{up}</text>

      <text x="20" y="276" className="ms-label">EACH ROUND, BY NUMBER OF SERVERS</text>
      <path d={`M${cx(0)} ${cy(0)}H${cx(MAX_N)}M${cx(0)} ${cy(0)}V${cy(60)}`} className="ms-grid" />
      <polyline points={outLine} className="ms-line-out" />
      <polyline points={upLine} className="ms-line-up" />
      <path d={`M${cx(n)} ${cy(0)}V${cy(60)}`} className="ms-flow-back ms-marker" />
      <path d={`M${cx(0) + 16} ${cy(56)}h28`} className="ms-line-out" />
      <text x={cx(0) + 52} y={cy(56) + 5} className="ms-small ms-strong">output, 4 per server</text>
      <path d={`M${cx(0) + 16} ${cy(48)}h28`} className="ms-line-up" />
      <text x={cx(0) + 52} y={cy(48) + 5} className="ms-small ms-hot">upkeep, 1+2+…+n</text>
      <text x={cx(n) + 6} y={cy(30)} className="ms-small">now: {n}</text>
      <text x={cx(3.5)} y={cy(0) + 22} textAnchor="middle" className="ms-small">best: 3 or 4</text>
      {Array.from({ length: MAX_N + 1 }, (_, s) => (
        <text key={s} x={cx(s)} y={cy(0) + 22} textAnchor="middle" className="ms-tick">{s === 3 || s === 4 ? "" : s}</text>
      ))}
    </svg>
  );
}

function History({ rows }) {
  if (!rows.length) return <p className="ms-empty">No rounds yet. Build or hold.</p>;
  return (
    <table className="ms-log ms-log-wide">
      <thead>
        <tr><th>round</th><th>move</th><th>servers</th><th>output</th><th>upkeep</th><th>cash</th><th>commons</th></tr>
      </thead>
      <tbody>
        {rows.map((r) => (
          <tr key={r.round} className={r.output < r.upkeep ? "is-loss" : ""}>
            <td>{r.round}</td><td>{r.action}</td><td>{r.servers}</td><td>+{r.output}</td><td>−{r.upkeep}</td><td>{r.cash}</td><td>{r.commons}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default function Study({ actions: startActions = [], payer: startPayer = "builder", print = false }) {
  const [actions, setActions] = useState(startActions);
  const [payer, setPayer] = useState(startPayer);
  const [auto, setAuto] = useState(false);
  const state = play(actions, payer);

  // The optimizer: always build, one round every 700 ms, until the game ends.
  useEffect(() => {
    if (!auto) return;
    if (state.over) {
      setAuto(false);
      return;
    }
    const timer = setTimeout(() => setActions((list) => [...list, "build"]), 700);
    return () => clearTimeout(timer);
  }, [auto, state.over, actions.length]);

  const move = (action) => setActions([...actions, action]);

  return (
    <div className={`ms-study${print ? " is-print" : ""}`}>
      <figure className="ms-figure">
        <Diagram state={state} payer={payer} />
        <figcaption>Output grows in a straight line, upkeep in a curve. Where they cross, every new server loses money for whoever pays its upkeep.</figcaption>
      </figure>

      <section className="ms-play" aria-label="Play">
        <p className="ms-status">{endText(state, payer)}</p>
        {!print && (
          <div className="ms-controls">
            <div className="ms-buttons">
              <button type="button" className="ms-primary" disabled={Boolean(state.over) || auto || state.cash < BUILD_COST} onClick={() => move("build")}>Build a server (−{BUILD_COST})</button>
              <button type="button" className="ms-primary" disabled={Boolean(state.over) || auto} onClick={() => move("hold")}>Hold</button>
            </div>
            <fieldset className="ms-rule">
              <legend>Who pays the upkeep (the same moves, replayed)</legend>
              <label><input type="radio" name="ms-payer" checked={payer === "builder"} onChange={() => setPayer("builder")} /> the builder</label>
              <label><input type="radio" name="ms-payer" checked={payer === "neighbours"} onChange={() => setPayer("neighbours")} /> the commons (the neighbours' power and water)</label>
            </fieldset>
            <div className="ms-buttons">
              <button type="button" onClick={() => { setActions([]); setAuto(true); }} disabled={auto}>Let the optimizer play: it always builds</button>
              <button type="button" onClick={() => { setAuto(false); setActions([]); }}>Start again</button>
            </div>
          </div>
        )}
        <History rows={state.history} />
        {print && <p className="ms-print-note">The optimizer's run: it builds every round and pays its own upkeep. Switch the upkeep to the commons and the same ten moves leave the builder rich and the commons dry in round 6.</p>}
        <p className="ms-print-note">Start: {START.servers} server, {START.cash} cash, {START.commons} in the commons. Tuning is at the top of <code>loop.mjs</code>.</p>
      </section>
    </div>
  );
}
