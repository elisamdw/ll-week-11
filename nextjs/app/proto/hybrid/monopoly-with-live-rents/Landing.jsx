"use client";

import { useState } from "react";
import { GROUPS, PROPERTIES, PROPERTY, SITUATIONS, landingOps, money, multiplier, rentFor } from "./rents.js";

// Used by the phone and the laptop alike: pick where you landed, say what's on it, see the rent now.

export function PropertyPicker({ room, onPick, compact = false }) {
  return (
    <div className={`hy-rent-picker${compact ? " compact" : ""}`}>
      {GROUPS.map((g) => (
        <div key={g.id} className="hy-rent-group" style={{ "--band": g.color }}>
          <p>
            {g.name} <Trend room={room} group={g.id} />
          </p>
          {PROPERTIES.filter((p) => p.group === g.id).map((p) => (
            <button key={p.id} className="hy-rent-prop" onClick={() => onPick(p.id)}>
              <span>{p.name}</span>
              <strong>{p.kind === "utility" ? `${(p.rents[0] * multiplier(room, g.id)).toFixed(1)}× dice` : money(rentFor(room, p.id, p.kind === "street" ? "none" : "r1").now)}</strong>
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}

export function Trend({ room, group }) {
  const m = multiplier(room, group);
  if (Math.abs(m - 1) < 0.005) return <span className="hy-trend flat">×1</span>;
  return <span className={`hy-trend ${m > 1 ? "up" : "down"}`}>×{m.toFixed(2)}</span>;
}

export function LandingSheet({ room, property, player, update, onDone }) {
  const p = PROPERTY[property];
  const [owned, setOwned] = useState(true);
  const [situation, setSituation] = useState(SITUATIONS[p.kind][0].id);
  const [dice, setDice] = useState(7);
  const [busy, setBusy] = useState(false);
  const group = GROUPS.find((g) => g.id === p.group);
  const rent = rentFor(room, property, situation, dice);

  async function log() {
    setBusy(true);
    await update(landingOps(room, { property, situation, dice: SITUATIONS[p.kind].find((s) => s.id === situation)?.dice ? dice : undefined, owned, player }));
    setBusy(false);
    onDone();
  }

  return (
    <div className="hy-rent-sheet" style={{ "--band": group.color }}>
      <div className="hy-rent-deed">
        <p className="hy-rent-band">{p.name}</p>
        <table>
          <tbody>
            {SITUATIONS[p.kind].map((s) => (
              <tr key={s.id} className={s.id === situation && owned ? "on" : ""} onClick={() => setSituation(s.id)}>
                <td>{s.label}</td>
                <td className="muted">{s.dice ? `${p.rents[s.index]}×` : money(p.rents[s.index] * (s.times || 1))}</td>
                <td>
                  <strong>{s.dice ? `${(p.rents[s.index] * multiplier(room, p.group)).toFixed(1)}×` : money(rentFor(room, property, s.id).now)}</strong>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="muted hy-rent-small">
          Printed, then now (×{multiplier(room, p.group).toFixed(2)}). Price to buy: {money(p.price)}, printed.
        </p>
      </div>
      <div className="hy-rent-owned">
        <button className={owned ? "on" : ""} onClick={() => setOwned(true)}>
          Someone else owns it
        </button>
        <button className={!owned ? "on" : ""} onClick={() => setOwned(false)}>
          No one / I do
        </button>
      </div>
      {owned && SITUATIONS[p.kind].find((s) => s.id === situation)?.dice && (
        <label className="hy-field">
          Your dice total
          <input type="number" min="2" max="12" value={dice} onChange={(e) => setDice(Number(e.target.value) || 7)} />
        </label>
      )}
      <p className="hy-rent-due">{owned ? <>Pay {money(rent.now)}</> : "No rent. It still counts as a landing."}</p>
      {owned && rent.now !== rent.printed && <p className="muted hy-rent-small">The deed says {money(rent.printed)}.</p>}
      <div className="hy-actions">
        <button className="button" onClick={onDone}>
          Back
        </button>
        <button className="button primary" onClick={log} disabled={busy}>
          {owned ? "Paid: log it" : "Log the landing"}
        </button>
      </div>
    </div>
  );
}
