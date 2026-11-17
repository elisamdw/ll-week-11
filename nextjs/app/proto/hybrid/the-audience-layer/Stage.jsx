"use client";

import { useEffect, useRef, useState } from "react";
import JoinBox from "../../_shared/JoinBox.jsx";
import { useRoom, useRoomCode } from "../../_shared/room.js";
import { AI_TARGETS, CELLS, COLS, FEEDS_PER_EXTRA, HINTS_FOR_CELL, HINTS_FOR_ROW, RESULT_SECONDS, ROUNDS, ROUND_SECONDS, SHIELDS, START_CELL, cellName, emptyRoom, hintLevel, pickTargets, resolve, rowOf, startOps } from "./rules.js";

// The stage: the projected board the players play on. It never shows the AI's targets during a round,
// except as much as the audience's hints give away. The laptop runs the game; phones only nudge.

export const PROTO = "hybrid/the-audience-layer";
const PHONE = "/proto/hybrid/the-audience-layer/phone";

export default function Stage() {
  const code = useRoomCode();
  const { state, update, replace, loaded, online } = useRoom(PROTO, code, emptyRoom);
  const s = { ...emptyRoom, ...(state || {}) };
  const [now, setNow] = useState(0);
  const done = useRef(""); // the phase and round already handled, so each step happens once

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 200);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (!loaded || !s.deadline || now < s.deadline) return;
    const key = `${s.phase}:${s.round}`;
    if (done.current === key) return;
    if (s.phase === "round") {
      done.current = key;
      const { ai, row, over } = resolve(s);
      update([
        { op: "set", path: "ai", value: ai },
        { op: "push", path: "log", value: row, max: 50 },
        { op: "set", path: "phase", value: over ? "over" : "result" },
        { op: "set", path: "deadline", value: over ? 0 : Date.now() + RESULT_SECONDS * 1000 },
      ]);
    } else if (s.phase === "result") {
      done.current = key;
      const round = s.round + 1;
      update([{ op: "merge", path: "", value: { phase: "round", round, shields: [], targets: pickTargets(s.ai, round), hints: 0, feeds: 0, deadline: Date.now() + ROUND_SECONDS * 1000 } }]);
    }
  }, [now, loaded, s, update]);

  if (!code || !loaded) return <p className="muted">Opening the room…</p>;

  const level = s.phase === "round" ? hintLevel(s.hints) : "none";
  const showTargets = s.phase === "result" || s.phase === "over";
  const last = s.log[s.log.length - 1];
  const audience = Object.values(s.audience || {});
  const left = Math.max(0, Math.ceil((s.deadline - now) / 1000));

  function toggleShield(i) {
    if (s.phase !== "round" || s.ai.includes(i)) return;
    const shields = s.shields.includes(i) ? s.shields.filter((x) => x !== i) : [...s.shields, i].slice(-SHIELDS);
    update([{ op: "set", path: "shields", value: shields }]);
  }
  const start = () => {
    done.current = "";
    update(startOps(s.audience));
  };

  return (
    <div className="hy-aud">
      <div className="hy-rent-top">
        <JoinBox path={PHONE} room={code} label="Watching? Join on your phone" />
        <div className="hy-rent-modes">
          <p className="hy-room-line">
            {s.phase === "setup" && `Players: shield ${SHIELDS} cells a round. The AI spreads from ${cellName(START_CELL)} into cells next to it. You can't see where it's going. The audience can.`}
            {s.phase === "round" && (
              <>
                Round {s.round} of {ROUNDS}: the AI goes for <strong>{AI_TARGETS[Math.min(s.round, AI_TARGETS.length) - 1]}</strong> cell{AI_TARGETS[Math.min(s.round, AI_TARGETS.length) - 1] > 1 ? "s" : ""}. Shields placed: {s.shields.length} of {SHIELDS}.
              </>
            )}
            {s.phase === "result" && last && <Outcome row={last} />}
            {s.phase === "over" && (s.ai.length >= CELLS ? "The AI holds the whole board." : `Game over. The AI holds ${s.ai.length} of ${CELLS} cells.`)}
          </p>
          <div className="hy-actions">
            <span className={`hy-clock${s.phase === "round" && left <= 5 ? " over" : ""}`}>{s.phase === "round" ? left : "—"}</span>
            {s.phase === "setup" || s.phase === "over" ? (
              <button className="button primary" onClick={start}>
                {s.phase === "over" ? "Play again" : "Start"}
              </button>
            ) : (
              <button className="button" onClick={() => replace({ ...emptyRoom, audience: s.audience })}>
                Stop
              </button>
            )}
            {!online && <span className="hy-bad">reconnecting…</span>}
          </div>
        </div>
      </div>

      <div className="hy-split hy-aud-split">
        <section className="hy-panel">
          <div className="hy-aud-grid" style={{ gridTemplateColumns: `repeat(${COLS}, 1fr)` }}>
            {Array.from({ length: CELLS }, (_, i) => {
              const isTarget = s.targets.includes(i);
              const lit = (level === "row" && s.targets.some((t) => rowOf(t) === rowOf(i))) || (level === "cell" && isTarget);
              const cls = [
                "hy-aud-cell",
                s.ai.includes(i) && "ai",
                s.shields.includes(i) && "shield",
                lit && (level === "cell" ? "lit-cell" : "lit-row"),
                showTargets && last?.blocked.includes(i) && "blocked",
                showTargets && last?.took.includes(i) && "took",
                showTargets && last?.fed.includes(i) && "fed",
              ]
                .filter(Boolean)
                .join(" ");
              return (
                <button key={i} className={cls} onClick={() => toggleShield(i)} disabled={s.phase !== "round" || s.ai.includes(i)}>
                  <span>{cellName(i)}</span>
                  {s.shields.includes(i) && <em>shield</em>}
                  {showTargets && last?.blocked.includes(i) && <em>blocked</em>}
                  {showTargets && last?.fed.includes(i) && <em>fed</em>}
                </button>
              );
            })}
          </div>
          <p className="hy-hint muted">
            Click a cell to shield it. {HINTS_FOR_ROW} hint from the audience lights the row the AI is aiming at; {HINTS_FOR_CELL} light the cell. Every {FEEDS_PER_EXTRA} feeds give the AI an extra cell.
          </p>
        </section>

        <section className="hy-panel">
          <div className="hy-panel-head">
            <h2>The audience</h2>
            <p className="muted">{audience.length} watching on phones</p>
          </div>
          <div className="hy-aud-tally">
            <div>
              <strong>{s.hints || 0}</strong>
              <span>hints this round</span>
            </div>
            <div>
              <strong>{s.feeds || 0}</strong>
              <span>feeds this round</span>
            </div>
          </div>
          <ul className="hy-aud-people">
            {audience.map((a) => (
              <li key={a.name}>
                {a.name} <span className="muted">{a.left} left</span>
              </li>
            ))}
          </ul>
          <p className="muted hy-rent-small">No phones? Be the audience from here (the players look away):</p>
          <div className="hy-board-set">
            <button className="linkish" disabled={s.phase !== "round"} onClick={() => update([{ op: "inc", path: "hints" }])}>
              + a hint
            </button>
            <button className="linkish" disabled={s.phase !== "round"} onClick={() => update([{ op: "inc", path: "feeds" }])}>
              + a feed
            </button>
          </div>
        </section>
      </div>

      <section className="hy-panel hy-room-log">
        <div className="hy-panel-head">
          <h2>Every round is a row</h2>
          <p className="muted">What the AI went for, what the players shielded, and what the audience did.</p>
        </div>
        <table className="hy-board">
          <thead>
            <tr>
              <th>round</th>
              <th>AI went for</th>
              <th>shielded</th>
              <th>blocked</th>
              <th>took</th>
              <th>hints</th>
              <th>feeds</th>
              <th>fed the AI</th>
              <th>AI holds</th>
            </tr>
          </thead>
          <tbody>
            {s.log.map((r) => (
              <tr key={r.round}>
                <td>{r.round}</td>
                <td>{r.targets.map(cellName).join(" ")}</td>
                <td>{r.shields.map(cellName).join(" ") || "—"}</td>
                <td className="hy-ok">{r.blocked.map(cellName).join(" ") || "—"}</td>
                <td className="hy-ai">{r.took.map(cellName).join(" ") || "—"}</td>
                <td>{r.hints}</td>
                <td>{r.feeds}</td>
                <td>{r.fed.map(cellName).join(" ") || "—"}</td>
                <td>
                  {r.ai} / {CELLS}
                </td>
              </tr>
            ))}
            {!s.log.length && (
              <tr>
                <td colSpan={9} className="muted">
                  No rounds yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
    </div>
  );
}

function Outcome({ row }) {
  return (
    <>
      The AI went for {row.targets.map(cellName).join(" and ")}. {row.blocked.length > 0 && <>You blocked {row.blocked.map(cellName).join(" and ")}. </>}
      {row.took.length > 0 && <>It took {row.took.map(cellName).join(" and ")}. </>}
      {row.fed.length > 0 && <>The audience fed it {row.fed.map(cellName).join(" and ")}.</>}
    </>
  );
}
