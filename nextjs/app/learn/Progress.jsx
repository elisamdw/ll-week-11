"use client";

import { STATUSES, pathTo } from "./status.js";

// Progress you can see: how much of the map you hold, how far along the path to the goal you are, and your last answers.

// ---- Tuning ----
const RECENT = 8; // answers listed under "Latest"
// ----

const LABEL = { held: "held", shaky: "shaky", missed: "missed", open: "open", locked: "locked" };

export default function Progress({ graph, statuses, attempts, goal }) {
  const total = graph.propositions.length;
  const counts = Object.fromEntries(STATUSES.map((s) => [s, graph.propositions.filter((p) => statuses[p.id] === s).length]));
  const path = [...pathTo(goal, graph.propositions)];
  const pathHeld = path.filter((id) => statuses[id] === "held").length;
  const recent = [...attempts].reverse().slice(0, RECENT); // newest last in the files, so reversed
  const name = (id) => graph.propositions.find((p) => p.id === id)?.name || id;
  const reached = goal.length > 0 && goal.every((g) => statuses[g] === "held");

  return (
    <div className="lg-panel lg-progress">
      <div className="lg-bar" role="img" aria-label={`${counts.held} of ${total} held`}>
        {STATUSES.map((s) => counts[s] > 0 && <span key={s} className={`lg-bar-part ${s}`} style={{ flexGrow: counts[s] }} title={`${counts[s]} ${LABEL[s]}`} />)}
      </div>
      <p className="lg-legend">
        {STATUSES.map((s) => <span key={s} className={`lg-key ${s}`}>{counts[s]} {LABEL[s]}</span>)}
      </p>

      {goal.length > 0 && (
        <section>
          <h2>{reached ? "Goal held" : "Toward the goal"}</h2>
          <p>{graph.learner.goalStatement || goal.map(name).join(", ")}</p>
          <p className="muted">{pathHeld} of {path.length} ideas on the way to it held.</p>
        </section>
      )}

      <section>
        <h2>Latest</h2>
        {recent.length === 0 ? (
          <p className="muted">No answers yet.</p>
        ) : (
          <ul className="lg-recent">
            {recent.map((a) => (
              <li key={a.id}>
                <span className={`lg-key ${a.result === "correct" ? "held" : a.result === "partial" ? "shaky" : "missed"}`}>{a.result}</span> {(a.propositions || []).map(name).join(", ")}
                <span className="muted"> · {a.phase}{a.confidence ? ` · sure ${a.confidence}/4` : ""}{a.via ? ` · ${a.via}` : ""}</span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
