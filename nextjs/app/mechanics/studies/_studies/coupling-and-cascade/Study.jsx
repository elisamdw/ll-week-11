"use client";

import { useState } from "react";
import { HARDEN_MAX, LINKS, LOOSEN_MAX, PLACES, linkId, placeName, replay } from "./grid.mjs";

// Study 05: coupling and cascade. Places depend on each other through links. When a place fails, the failure crosses
// a tight link in the same tick, before anyone can act, and a loose link one tick later, which gives time to harden
// the place on the other side. A small cut of PE's /proto/economy/cascade, after SW's "Coupling is a mechanic".

const byId = Object.fromEntries(PLACES.map((p) => [p.id, p]));

function Diagram({ state }) {
  const ticks = Math.max(state.tick, 0) + 1;
  const colW = 64;
  const rowH = 40;
  const gx = 96;
  const gy = 250;
  return (
    <svg className="ms-diagram" viewBox={`0 0 640 ${gy + Math.min(ticks, 7) * rowH + 76}`} role="img" aria-label="Diagram: the rule for each kind of link, then a timeline with one column per place and one row per tick, filled where a place is down.">
      <text x="20" y="28" className="ms-label">1 · THE MOVE: A PLACE FAILS, THEN TIME PASSES</text>
      <text x="20" y="74" className="ms-label">2 · THE RULE</text>
      <path d="M30 104H110" className="ms-link-tight" />
      <text x="124" y="110" className="ms-small"><tspan className="ms-strong">tight link:</tspan> the failure crosses in the same tick, before anyone acts</text>
      <path d="M30 140H110" className="ms-link-loose" />
      <text x="124" y="146" className="ms-small"><tspan className="ms-strong">loose link:</tspan> it crosses one tick later, so there is time to act</text>
      <rect x="54" y="166" width="32" height="24" rx="6" className="ms-cell-hard" />
      <text x="124" y="184" className="ms-small"><tspan className="ms-strong">hardened:</tspan> never falls (you have {HARDEN_MAX})</text>

      <text x="20" y="226" className="ms-label">3 · THE STATE, TICK BY TICK</text>
      {PLACES.map((p, i) => (
        <text key={p.id} x={gx + i * colW + colW / 2} y={gy - 6} textAnchor="middle" className="ms-tick">{p.short}</text>
      ))}
      {Array.from({ length: Math.min(ticks, 7) }, (_, t) => (
        <g key={t}>
          <text x={gx - 12} y={gy + t * rowH + 26} textAnchor="end" className="ms-small">{state.tick < 0 ? "before" : `tick ${t}`}</text>
          {PLACES.map((p, i) => {
            const fell = state.down[p.id];
            const isDown = fell !== undefined && fell <= t;
            const isNew = fell === t;
            const hard = state.hardened.has(p.id);
            return (
              <rect key={p.id} x={gx + i * colW + 4} y={gy + t * rowH + 4} width={colW - 8} height={rowH - 8} rx="6"
                className={isNew ? "ms-cell-new" : isDown ? "ms-cell-down" : hard ? "ms-cell-hard" : "ms-cell-up"} />
            );
          })}
        </g>
      ))}
      <text x="20" y={gy + Math.min(ticks, 7) * rowH + 34} className="ms-small ms-strong">
        {state.tick < 0 ? "Nothing has failed yet." : `${Object.keys(state.down).length} of ${PLACES.length} places down${state.settled ? ", and it has stopped." : `; next tick: ${state.coming.map(placeName).join(", ")}.`}`}
      </text>
      <rect x="20" y={gy + Math.min(ticks, 7) * rowH + 50} width="18" height="14" rx="3" className="ms-cell-new" />
      <text x="44" y={gy + Math.min(ticks, 7) * rowH + 62} className="ms-tick">fell this tick</text>
      <rect x="150" y={gy + Math.min(ticks, 7) * rowH + 50} width="18" height="14" rx="3" className="ms-cell-down" />
      <text x="174" y={gy + Math.min(ticks, 7) * rowH + 62} className="ms-tick">down</text>
      <rect x="230" y={gy + Math.min(ticks, 7) * rowH + 50} width="18" height="14" rx="3" className="ms-cell-hard" />
      <text x="254" y={gy + Math.min(ticks, 7) * rowH + 62} className="ms-tick">hardened</text>
    </svg>
  );
}

function Network({ state, onHarden, onLoosen, interactive }) {
  const before = state.tick < 0;
  return (
    <svg className="ms-network" viewBox="0 0 530 390" role="group" aria-label="The grid: click a place to harden it; before the strike, click a link to loosen it.">
      {LINKS.map((link) => {
        const [a, b] = link.map((id) => byId[id]);
        const id = linkId(link);
        const loose = state.loose.has(id);
        const carrying = state.down[link[0]] !== undefined && state.down[link[1]] === undefined && !state.hardened.has(link[1]);
        return (
          <g key={id}>
            <line x1={a.x} y1={a.y} x2={b.x} y2={b.y} className={`${loose ? "ms-link-loose" : "ms-link-tight"}${carrying ? " is-carrying" : ""}`} />
            {interactive && before && (
              <line x1={a.x} y1={a.y} x2={b.x} y2={b.y} className="ms-link-hit" role="button" tabIndex={0} aria-label={`${loose ? "Tighten" : "Loosen"} the link from ${a.name} to ${b.name}`}
                onClick={() => onLoosen(id)} onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onLoosen(id)} />
            )}
          </g>
        );
      })}
      {PLACES.map((p) => {
        const down = state.down[p.id] !== undefined;
        const hard = state.hardened.has(p.id);
        const coming = state.coming.includes(p.id);
        return (
          <g key={p.id} className={`ms-place${down ? " is-down" : ""}${hard ? " is-hard" : ""}${coming ? " is-coming" : ""}`}
            {...(interactive ? { role: "button", tabIndex: 0, "aria-label": `${p.name}: ${down ? "down" : hard ? "hardened" : "up"}. Harden it.`, onClick: () => onHarden(p.id), onKeyDown: (e) => (e.key === "Enter" || e.key === " ") && onHarden(p.id) } : {})}>
            <rect x={p.x - 58} y={p.y - 22} width="116" height="44" rx="10" />
            <text x={p.x} y={p.y + 6} textAnchor="middle">{p.name}</text>
          </g>
        );
      })}
    </svg>
  );
}

export default function Study({ rows: startRows = [], print = false }) {
  const [rows, setRows] = useState(startRows);
  const [target, setTarget] = useState("subB");
  const state = replay(rows);
  const add = (row) => setRows([...rows, row]);
  const before = state.tick < 0;

  return (
    <div className={`ms-study${print ? " is-print" : ""}`}>
      <figure className="ms-figure">
        <Diagram state={state} />
        <figcaption>Each row is one tick; each column, one place. A tight link fills cells in the same row; a loose link fills them in the next.</figcaption>
      </figure>

      <section className="ms-play" aria-label="Play">
        <p className="ms-status">
          {before
            ? `Before the strike: loosen up to ${LOOSEN_MAX} links (${state.loose.size} so far) and harden up to ${HARDEN_MAX} places (${state.hardened.size}).`
            : state.settled
              ? `It stopped at tick ${state.tick}: ${Object.keys(state.down).length} of ${PLACES.length} places down.`
              : `Tick ${state.tick}. Coming over loose links next tick: ${state.coming.map(placeName).join(", ")}.${state.hardened.size < HARDEN_MAX ? " Harden one now?" : ""}`}
        </p>
        <Network state={state} interactive={!print} onHarden={(id) => add({ kind: "harden", id })} onLoosen={(link) => add({ kind: "loosen", link })} />
        {!print && (
          <div className="ms-controls">
            <div className="ms-buttons">
              {before ? (
                <>
                  <label className="ms-select">
                    <span>The heat wave hits</span>
                    <select value={target} onChange={(e) => setTarget(e.target.value)}>
                      {PLACES.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
                    </select>
                  </label>
                  <button type="button" className="ms-primary" onClick={() => add({ kind: "strike", id: target })}>Strike: {placeName(target)} fails</button>
                </>
              ) : (
                <button type="button" className="ms-primary" disabled={state.settled} onClick={() => add({ kind: "tick" })}>Next tick</button>
              )}
              <button type="button" onClick={() => setRows([])}>Start again</button>
            </div>
          </div>
        )}
        {print && <p className="ms-print-note">An example: three links loosened (B to water, B to homes, water to hospital), Substation B struck, the water plant hardened in the tick the delay gave. Three places fall. With every link tight, the same strike takes six.</p>}
      </section>
    </div>
  );
}
