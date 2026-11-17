"use client";

import { useEffect, useState } from "react";
import { usePlayer, useRoom } from "../../_shared/room.js";
import { CELLS, COLS, FEEDS_PER_EXTRA, HINTS_FOR_CELL, HINTS_FOR_ROW, NUDGES, cellName, emptyRoom } from "./rules.js";
import { PROTO } from "./Stage.jsx";

// An audience member's phone: the board with the AI's targets on it, which the players can't see,
// and a few nudges for the whole game: a hint to the players, or food for the AI.

function useRoomFromUrl() {
  const [room, setRoom] = useState(undefined);
  useEffect(() => {
    setRoom((new URL(window.location.href).searchParams.get("room") || "").toLowerCase().replace(/[^a-z0-9-]/g, "") || null);
  }, []);
  return room;
}

export default function Audience() {
  const code = useRoomFromUrl();
  const me = usePlayer();
  const { state, update, loaded, online } = useRoom(PROTO, code, emptyRoom);
  const s = { ...emptyRoom, ...(state || {}) };
  const [name, setName] = useState("");
  const [now, setNow] = useState(0);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 500);
    return () => clearInterval(id);
  }, []);

  if (code === undefined || !me.id) return <p className="muted">…</p>;
  if (!code) return <p className="muted">Open the address on the projected screen; it carries the room code.</p>;
  if (!loaded) return <p className="muted">Finding room {code.toUpperCase()}…</p>;

  const seat = s.audience?.[me.id];
  if (!seat)
    return (
      <form
        className="hy-phone-stack"
        onSubmit={(e) => {
          e.preventDefault();
          const n = (name || me.name).trim().slice(0, 20);
          if (!n) return;
          me.setName(n);
          update([{ op: "set", path: `audience.${me.id}`, value: { name: n, left: NUDGES } }]);
        }}
      >
        <p className="eyebrow">Room {code.toUpperCase()} · the audience</p>
        <p className="hy-phone-q">You'll see where the AI is going. The players won't.</p>
        <label className="hy-field">
          Your name
          <input value={name || me.name} onChange={(e) => setName(e.target.value)} maxLength={20} autoComplete="off" />
        </label>
        <button className="button primary">Watch</button>
      </form>
    );

  async function nudge(kind) {
    if (busy || seat.left <= 0 || s.phase !== "round") return;
    setBusy(true);
    await update([
      { op: "inc", path: kind === "hint" ? "hints" : "feeds" },
      { op: "inc", path: `audience.${me.id}.left`, value: -1 },
    ]);
    setBusy(false);
  }

  const left = Math.max(0, Math.ceil((s.deadline - now) / 1000));
  const last = s.log[s.log.length - 1];

  return (
    <div className="hy-phone-stack">
      <p className="eyebrow">
        Room {code.toUpperCase()} · {seat.name} · the audience{!online && <span className="hy-bad"> · reconnecting</span>}
      </p>
      {s.phase === "setup" && <p className="hy-phone-q">Waiting for the players to start.</p>}
      {s.phase === "round" && (
        <p className="hy-phone-q">
          Round {s.round} · {left}s · the AI is going for {s.targets.map(cellName).join(" and ")}
        </p>
      )}
      {s.phase === "result" && last && <p className="hy-phone-q">Blocked {last.blocked.length}, lost {last.took.length + last.fed.length}. Next round soon.</p>}
      {s.phase === "over" && <p className="hy-phone-q">Game over: the AI holds {s.ai.length} of {CELLS}.</p>}

      <div className="hy-aud-grid small" style={{ gridTemplateColumns: `repeat(${COLS}, 1fr)` }}>
        {Array.from({ length: CELLS }, (_, i) => (
          <div key={i} className={["hy-aud-cell", s.ai.includes(i) && "ai", s.shields.includes(i) && "shield", s.phase === "round" && s.targets.includes(i) && "target"].filter(Boolean).join(" ")}>
            <span>{cellName(i)}</span>
            {s.phase === "round" && s.targets.includes(i) && <em>{s.shields.includes(i) ? "target · shielded" : "target"}</em>}
          </div>
        ))}
      </div>

      <div className="hy-aud-nudges">
        <button className="button primary" disabled={busy || seat.left <= 0 || s.phase !== "round"} onClick={() => nudge("hint")}>
          Hint to the players
        </button>
        <button className="button" disabled={busy || seat.left <= 0 || s.phase !== "round"} onClick={() => nudge("feed")}>
          Feed the AI
        </button>
      </div>
      <p className="muted hy-rent-small">
        You have {seat.left} of {NUDGES} nudges for the game. This round: {s.hints || 0} hints, {s.feeds || 0} feeds. {HINTS_FOR_ROW} hint lights the row on stage, {HINTS_FOR_CELL} light the cell; every {FEEDS_PER_EXTRA} feeds give the AI an extra cell.
      </p>
    </div>
  );
}
