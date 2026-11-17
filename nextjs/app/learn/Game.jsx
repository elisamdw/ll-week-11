"use client";

import { useEffect, useMemo, useState } from "react";
import LearnMap from "./Map.jsx";
import Practice from "./Practice.jsx";
import Progress from "./Progress.jsx";
import { makeAttempt, mapStatuses } from "./status.js";

// The game for one graph: three views over the same answers. Answers from the folder (graph/attempts.json, written by
// the harness in Claude) count alongside the game's own. The game's answers are saved to the folder when it is yours
// (LEARN_GRAPH_DIR), and kept in this browser otherwise.

// ---- Tuning ----
const VIEWS = [
  { id: "map", label: "Map" },
  { id: "practice", label: "Practice" },
  { id: "progress", label: "Progress" },
];
// ----

const storeKey = (slug) => `learn:${slug}:attempts`;

export default function Game({ graph }) {
  const [view, setView] = useState("map");
  const [local, setLocal] = useState([]);
  const [saved, setSaved] = useState([]);
  const [note, setNote] = useState(null);

  useEffect(() => {
    try {
      setLocal(JSON.parse(localStorage.getItem(storeKey(graph.slug)) || "[]"));
    } catch {}
  }, [graph.slug]);

  const attempts = useMemo(() => [...graph.attempts, ...saved, ...local], [graph.attempts, saved, local]);
  const statuses = useMemo(() => mapStatuses(graph.propositions, attempts), [graph.propositions, attempts]);
  const goal = graph.learner.goal || [];

  const keepLocal = (record) =>
    setLocal((list) => {
      const next = [...list, record];
      try {
        localStorage.setItem(storeKey(graph.slug), JSON.stringify(next));
      } catch {}
      return next;
    });

  const onAnswer = async (answer) => {
    const record = makeAttempt(answer);
    if (!graph.writable) return keepLocal(record);
    try {
      const res = await fetch(`/learn/${graph.slug}/attempts`, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify([record]) });
      if (!res.ok) throw new Error((await res.json()).error || res.statusText);
      setSaved((list) => [...list, record]);
      setNote(null);
    } catch (error) {
      keepLocal(record);
      setNote(`Couldn't save to your folder (${error.message}); kept in this browser.`);
    }
  };

  const reset = () => {
    try {
      localStorage.removeItem(storeKey(graph.slug));
    } catch {}
    setLocal([]);
  };

  const props = { graph, statuses, attempts, goal, onAnswer };
  return (
    <div className="lg-game">
      <nav className="lg-tabs" aria-label="Views">
        {VIEWS.map((v) => (
          <button key={v.id} type="button" className={`lg-tab${view === v.id ? " on" : ""}`} aria-current={view === v.id} onClick={() => setView(v.id)}>{v.label}</button>
        ))}
        <span className="lg-saving muted">
          {graph.writable ? "Answers save to your folder" : "Answers stay in this browser"}
          {local.length > 0 && (
            <> · <button type="button" className="linkish" onClick={reset}>forget {local.length} in this browser</button></>
          )}
        </span>
      </nav>
      {note && <p className="lg-bad">{note}</p>}
      {view === "map" && <LearnMap {...props} />}
      {view === "practice" && <Practice {...props} />}
      {view === "progress" && <Progress {...props} />}
    </div>
  );
}
