"use client";

import { useState } from "react";
import Ask from "./Ask.jsx";
import { depths, questionFor } from "./status.js";

// The graph as a map you unlock by answering. Foundations sit on the left, the goal on the right; an arrow runs from
// each proposition to the ones that require it. Open a lit node, answer its question, and what rests on it lights up.

// ---- Tuning ----
const COLUMN = 210; // px between columns (one column per depth)
const ROW = 92; // px between nodes in a column
const NODE_W = 170;
const NODE_H = 58;
const SHOW_LOCKED_NAMES = true; // false: locked nodes show "?" until they open
const SHOW_STATEMENT_WHEN = ["held", "shaky", "missed"]; // the statement is the answer, so it stays hidden until tried
// ----

const LABEL = { held: "Held", shaky: "Shaky", missed: "Missed", open: "Open", locked: "Locked" };

export default function LearnMap({ graph, statuses, attempts, goal, onAnswer }) {
  const [selected, setSelected] = useState(null);
  const [asking, setAsking] = useState(false);
  const { propositions } = graph;
  const depth = depths(propositions);

  // Columns by depth; within a column, the teaching order (learner.json's plan), then the file's order.
  const plan = graph.learner.plan || [];
  const rank = (p) => (plan.includes(p.id) ? plan.indexOf(p.id) : plan.length);
  const columns = [];
  for (const p of propositions) (columns[depth[p.id]] ||= []).push(p);
  for (const col of columns) col?.sort((a, b) => rank(a) - rank(b));
  const place = {};
  columns.forEach((col, x) => (col || []).forEach((p, y) => (place[p.id] = { x: 16 + x * COLUMN, y: 16 + y * ROW })));
  const width = 32 + Math.max(0, columns.length - 1) * COLUMN + NODE_W;
  const height = 32 + Math.max(1, ...columns.map((c) => (c || []).length)) * ROW - (ROW - NODE_H);

  const chosen = propositions.find((p) => p.id === selected);
  const chosenStatus = chosen && statuses[chosen.id];
  const question = chosen && questionFor(chosen, attempts);

  return (
    <div className="lg-map-wrap">
      <div className="lg-map-scroll">
        <div className="lg-map" style={{ width, height }}>
          <svg className="lg-edges" width={width} height={height} aria-hidden="true">
            <defs>
              <marker id="lg-arrow" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto">
                <path d="M0,0 L8,4 L0,8 z" className="lg-arrowhead" />
              </marker>
            </defs>
            {propositions.flatMap((p) =>
              (p.requires || []).filter((r) => place[r]).map((r) => {
                const a = place[r];
                const b = place[p.id];
                const x1 = a.x + NODE_W;
                const y1 = a.y + NODE_H / 2;
                const x2 = b.x;
                const y2 = b.y + NODE_H / 2;
                const mid = (x1 + x2) / 2;
                return <path key={`${r}>${p.id}`} className={`lg-edge${statuses[r] === "held" ? " lit" : ""}`} d={`M${x1},${y1} C${mid},${y1} ${mid},${y2} ${x2 - 2},${y2}`} markerEnd="url(#lg-arrow)" />;
              }),
            )}
          </svg>
          {propositions.map((p) => {
            const s = statuses[p.id];
            const hidden = s === "locked" && !SHOW_LOCKED_NAMES;
            return (
              <button
                key={p.id}
                type="button"
                className={`lg-node ${s}${goal.includes(p.id) ? " goal" : ""}${selected === p.id ? " selected" : ""}`}
                style={{ left: place[p.id].x, top: place[p.id].y, width: NODE_W, height: NODE_H }}
                onClick={() => {
                  setSelected(p.id);
                  setAsking(false);
                }}
              >
                <span className="lg-node-name">{hidden ? "?" : p.name}</span>
                <span className="lg-node-status">{goal.includes(p.id) ? "Goal · " : ""}{LABEL[s]}</span>
              </button>
            );
          })}
        </div>
      </div>

      <aside className="lg-detail" aria-live="polite">
        {!chosen && <p className="muted">Pick a node. Lit ones are open: answer to hold them, and what rests on them opens next.</p>}
        {chosen && !asking && (
          <>
            <p className="eyebrow">{chosen.kind === "foundation" ? "Foundation" : "Derived"} · {LABEL[chosenStatus]}</p>
            <h2>{chosen.name}</h2>
            {SHOW_STATEMENT_WHEN.includes(chosenStatus) && <p>{chosen.statement}</p>}
            {(chosen.requires || []).length > 0 && (
              <p className="muted">Rests on: {chosen.requires.map((r) => propositions.find((p) => p.id === r)?.name || r).join(", ")}</p>
            )}
            {chosenStatus === "locked" ? (
              <p className="muted">Hold everything it rests on to open it.</p>
            ) : (
              <button type="button" className="button primary" onClick={() => setAsking(true)}>{chosenStatus === "open" ? "Answer to hold it" : "Answer again"}</button>
            )}
            <Provenance proposition={chosen} graph={graph} />
          </>
        )}
        {chosen && asking && (
          <Ask
            key={chosen.id}
            proposition={chosen}
            question={question}
            onSkip={() => setAsking(false)}
            onDone={(answer) => {
              onAnswer({ proposition: chosen, question, ...answer });
              setAsking(false);
            }}
          />
        )}
      </aside>
    </div>
  );
}

function Provenance({ proposition, graph }) {
  const sources = (proposition.sources || []).map((id) => graph.sources.find((s) => s.id === id)).filter(Boolean);
  const sessions = (proposition.sessions || []).map((id) => graph.sessions.find((s) => s.id === id)).filter(Boolean);
  if (!sources.length && !sessions.length) return null;
  return (
    <div className="lg-prov">
      {sources.map((s) => (
        <p key={s.id}>Source: {s.url ? <a href={s.url}>{s.title}</a> : s.title}{s.year ? ` (${s.year})` : ""}</p>
      ))}
      {sessions.map((s) => (
        <p key={s.id}>Session: {s.title}{s.date ? `, ${s.date}` : ""}</p>
      ))}
    </div>
  );
}
