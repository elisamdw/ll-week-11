"use client";

import { useState } from "react";
import JoinBox from "../../_shared/JoinBox.jsx";
import { useRoom, useRoomCode } from "../../_shared/room.js";
import { LandingSheet, PropertyPicker } from "./Landing.jsx";
import { DESIGN_RANGE, GROUPS, MODES, PROPERTY, emptyRoom, endRoundOps, money, multiplier } from "./rents.js";

// The laptop or projector: the rent board everyone sees, the room code for phones, the mode, and the log.
// The board, deeds, houses and money stay on the table; only the rents live here.

export const PROTO = "hybrid/monopoly-with-live-rents";
const PHONE = "/proto/hybrid/monopoly-with-live-rents/phone";

export default function Host() {
  const code = useRoomCode();
  const { state, update, replace, loaded, online } = useRoom(PROTO, code, emptyRoom);
  const room = { ...emptyRoom, ...(state || {}) };
  const [landing, setLanding] = useState(null);

  if (!code || !loaded) return <p className="muted">Opening the room…</p>;

  const setMode = (mode) => update([{ op: "set", path: "mode", value: mode }]);
  const setDesign = (group, value) => update([{ op: "set", path: `design.${group}`, value }]);
  const restart = () => {
    if (window.confirm("Start over? This clears the log and the demand (the designer's settings stay).")) replace({ ...emptyRoom, mode: room.mode, design: room.design });
  };
  const recent = [...room.landings].reverse().slice(0, 40);
  const total = room.landings.reduce((n, l) => n + (l.rent || 0), 0);
  const printed = room.landings.reduce((n, l) => n + (l.printed || 0), 0);

  return (
    <div className="hy-rent">
      <div className="hy-rent-top">
        <JoinBox path={PHONE} room={code} label="Rents on your phone" />
        <div className="hy-rent-modes">
          <div className="hy-tabs" role="tablist">
            {Object.entries(MODES).map(([id, m]) => (
              <button key={id} role="tab" aria-selected={room.mode === id} className={room.mode === id ? "on" : ""} onClick={() => setMode(id)}>
                {m.name}
              </button>
            ))}
          </div>
          <p className="muted">{MODES[room.mode].line}</p>
          <div className="hy-actions">
            <span className="hy-rent-round">Round {room.round}</span>
            <button className="button primary" onClick={() => update(endRoundOps(room))}>
              End round
            </button>
            <button className="button" onClick={restart}>
              Start over
            </button>
            {!online && <span className="hy-bad">reconnecting…</span>}
          </div>
        </div>
      </div>

      {room.mode !== "printed" && (
        <section className="hy-panel hy-rent-design">
          <div className="hy-panel-head">
            <h2>The designer's dials</h2>
            <p className="muted">Set before a game: each color's rents times this. {room.mode === "live" ? "Demand moves on top of it." : ""}</p>
          </div>
          <div className="hy-rent-dials">
            {GROUPS.map((g) => (
              <label key={g.id} style={{ "--band": g.color }}>
                <span>{g.name}</span>
                <input type="range" min={DESIGN_RANGE[0]} max={DESIGN_RANGE[1]} step="0.05" value={room.design[g.id] ?? 1} onChange={(e) => setDesign(g.id, Number(e.target.value))} />
                <strong>×{(room.design[g.id] ?? 1).toFixed(2)}</strong>
              </label>
            ))}
          </div>
        </section>
      )}

      <div className="hy-split hy-rent-split">
        <section className="hy-panel">
          <div className="hy-panel-head">
            <h2>Rents now</h2>
            <p className="muted">Rent with no houses. Click a property to log a landing from the laptop.</p>
          </div>
          <PropertyPicker room={room} onPick={setLanding} />
        </section>
        <section className="hy-panel">
          <div className="hy-panel-head">
            <h2>Every landing</h2>
            <p className="muted">
              {room.landings.length} landings · rent paid {money(total)} · the deeds would say {money(printed)}
            </p>
          </div>
          <History room={room} />
          <table className="hy-board">
            <thead>
              <tr>
                <th>rd</th>
                <th>who</th>
                <th>where</th>
                <th>paid</th>
                <th>deed</th>
              </tr>
            </thead>
            <tbody>
              {recent.map((l, i) => (
                <tr key={`${l.at}-${i}`}>
                  <td>{l.round}</td>
                  <td>{l.player || "?"}</td>
                  <td>{PROPERTY[l.property]?.name}</td>
                  <td>{l.situation === "unowned" ? "—" : money(l.rent)}</td>
                  <td className="muted">{l.situation === "unowned" ? "" : money(l.printed)}</td>
                </tr>
              ))}
              {!recent.length && (
                <tr>
                  <td colSpan={5} className="muted">
                    No landings yet. On a phone, open the address above; or click a property here.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </section>
      </div>

      {landing && (
        <div className="hy-rent-modal" onClick={() => setLanding(null)}>
          <div onClick={(e) => e.stopPropagation()}>
            <LandingSheet room={room} property={landing} player="table" update={update} onDone={() => setLanding(null)} />
          </div>
        </div>
      )}
    </div>
  );
}

// Each color's multiplier, round by round: a line per color, plus where it is now.
function History({ room }) {
  const points = [...room.history, { round: room.round, mult: Object.fromEntries(GROUPS.map((g) => [g.id, multiplier(room, g.id)])) }];
  if (points.length < 2) return null;
  const max = Math.max(1.5, ...points.flatMap((p) => Object.values(p.mult)));
  const x = (i) => 4 + (i / (points.length - 1)) * 292;
  const y = (m) => 76 - (m / max) * 70;
  return (
    <svg className="hy-rent-history" viewBox="0 0 300 80" role="img" aria-label="Each color's rent multiplier by round">
      <line x1="4" x2="296" y1={y(1)} y2={y(1)} className="base" />
      {GROUPS.map((g) => (
        <polyline key={g.id} fill="none" stroke={g.color} strokeWidth="1.5" points={points.map((p, i) => `${x(i)},${y(p.mult[g.id] ?? 1)}`).join(" ")} />
      ))}
    </svg>
  );
}
