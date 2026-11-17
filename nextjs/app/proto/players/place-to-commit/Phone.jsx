"use client";

import { useEffect, useState } from "react";
import { useRoom } from "../../_shared/room.js";
import { PROTO } from "./Table.jsx";
import { OWN, OWN_POINTS, emptyRoom } from "./rules.js";

// One player's phone: pick where your token goes, then commit. No take-back once committed.
// Each browser tab is its own seat, so a laptop can test with tabs.
// (The seat and join code are copied from ../private-goals/Phone.jsx on purpose, so each prototype can be changed alone.)

function useSeat() {
  const [seat, setSeat] = useState({ id: null, name: "" });
  useEffect(() => {
    const fresh = () => Math.random().toString(36).slice(2, 10);
    let id = fresh();
    let name = "";
    try {
      id = sessionStorage.getItem("pi-seat") || id;
      sessionStorage.setItem("pi-seat", id);
      name = localStorage.getItem("proto-player-name") || "";
    } catch {}
    setSeat({ id, name });
  }, []);
  return seat;
}

function useRoomParam() {
  const [room, setRoom] = useState(undefined);
  useEffect(() => {
    const r = new URL(window.location.href).searchParams.get("room");
    setRoom((r || "").toLowerCase().replace(/[^a-z0-9-]/g, "") || null);
  }, []);
  return room;
}

export default function Phone() {
  const room = useRoomParam();
  const seat = useSeat();
  const { state, update, loaded, online } = useRoom(PROTO, room, emptyRoom);
  const s = state || emptyRoom;
  const me = seat.id && s.players?.[seat.id];

  if (room === undefined || !seat.id) return <p className="muted">…</p>;
  if (!room) return <EnterCode />;
  if (!loaded) return <p className="muted">Finding room {room.toUpperCase()}…</p>;

  const dealtIn = s.order?.includes(seat.id);
  return (
    <div className="pi-phone">
      <p className="eyebrow">Room {room.toUpperCase()}{me ? ` · ${me.name}` : ""}{dealtIn && s.phase !== "lobby" ? ` · ${s.points?.[seat.id] || 0} pts` : ""}{!online && <span className="pi-bad"> · reconnecting</span>}</p>
      {!me && <Join seat={seat} phase={s.phase} onJoin={(name) => update([{ op: "set", path: `players.${seat.id}`, value: { name } }])} />}
      {me && s.phase === "lobby" && <p className="pi-phone-big">You're in. Waiting for the table to start.</p>}
      {me && s.phase !== "lobby" && !dealtIn && <p className="pi-phone-big">This game started without you. You'll be in the next one.</p>}
      {me && dealtIn && s.phase === "commit" && <Commit key={s.round} s={s} id={seat.id} update={update} />}
      {me && dealtIn && s.phase === "reveal" && <p className="pi-phone-big">Look up: the table screen shows every order at once.</p>}
      {me && dealtIn && s.phase === "end" && <p className="pi-phone-big">The game is over. The table screen has the points.</p>}
    </div>
  );
}

function EnterCode() {
  const [code, setCode] = useState("");
  return (
    <form className="pi-phone" onSubmit={(e) => { e.preventDefault(); if (code.trim()) window.location.search = `?room=${code.trim().toLowerCase()}`; }}>
      <p className="eyebrow">Join a table</p>
      <label className="pi-field">Room code<input value={code} onChange={(e) => setCode(e.target.value)} autoCapitalize="none" autoComplete="off" placeholder="abcd" /></label>
      <button className="button primary">Join</button>
    </form>
  );
}

function Join({ seat, phase, onJoin }) {
  const [name, setName] = useState(seat.name);
  if (phase !== "lobby") return <p className="pi-phone-big">A game is under way at this table. Wait for the next one.</p>;
  return (
    <form onSubmit={(e) => { e.preventDefault(); const n = name.trim().slice(0, 20); if (!n) return; try { localStorage.setItem("proto-player-name", n); } catch {} onJoin(n); }}>
      <label className="pi-field">Your name<input value={name} onChange={(e) => setName(e.target.value)} maxLength={20} autoComplete="off" /></label>
      <button className="button primary">Sit down</button>
    </form>
  );
}

function Commit({ s, id, update }) {
  const [pick, setPick] = useState(null);
  const done = s.orders?.[id];
  const label = (pid) => s.places.find((p) => p.id === pid)?.label;
  if (done) {
    return <p className="pi-phone-big">Committed: <strong>{done === OWN ? "your own project" : label(done)}</strong>. Waiting for the others; everything is revealed at once.</p>;
  }
  return (
    <>
      <p className="pi-phone-big">Where does your token go?</p>
      <div className="pi-move-list">
        {s.threats.map((t) => (
          <button key={t.place} className={`button${pick === t.place ? " primary" : ""}`} onClick={() => setPick(t.place)}>
            Defend {label(t.place)} <small>the AI comes with {t.strength}</small>
          </button>
        ))}
        <button className={`button${pick === OWN ? " primary" : ""}`} onClick={() => setPick(OWN)}>
          My own project <small>+{OWN_POINTS} point for you</small>
        </button>
      </div>
      {pick && (
        <button className="button primary pi-lock" onClick={() => update([{ op: "set", path: `orders.${id}`, value: pick }])}>
          Commit <small>no take-back</small>
        </button>
      )}
    </>
  );
}
