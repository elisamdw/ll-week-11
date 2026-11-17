"use client";

import { useEffect, useState } from "react";
import { useRoom } from "../../_shared/room.js";
import { PROTO } from "./Table.jsx";
import { READOUT_ACCURACY, emptyRoom, insiderOf } from "./rules.js";

// One player's phone: join with a name, see your own place, and when it's your round, hold to read the AI's next move.
// Each browser tab is its own seat, so a laptop can test with tabs. (The seat and join code are copied from
// ../private-goals/Phone.jsx on purpose, so each prototype can be changed alone.)

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
      <p className="eyebrow">Room {room.toUpperCase()}{me ? ` · ${me.name}` : ""}{!online && <span className="pi-bad"> · reconnecting</span>}</p>
      {!me && <Join seat={seat} phase={s.phase} onJoin={(name) => update([{ op: "set", path: `players.${seat.id}`, value: { name } }])} />}
      {me && s.phase === "lobby" && <p className="pi-phone-big">You're in. Waiting for the table to start.</p>}
      {me && s.phase !== "lobby" && !dealtIn && <p className="pi-phone-big">This game started without you. You'll be in the next one.</p>}
      {me && dealtIn && <Playing s={s} id={seat.id} />}
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

function Playing({ s, id }) {
  const mine = s.places.find((p) => p.owner === id);
  const insider = s.phase === "play" && insiderOf(s) === id;
  const shown = s.plan && s.places.find((p) => p.id === s.plan.shown);
  return (
    <>
      <p className="pi-phone-big">
        Your place: <strong>{mine?.label}</strong>, {mine?.taken ? "taken by the AI" : mine?.fortified ? "fortified" : "open"}.
      </p>
      {s.phase === "play" && !insider && <p className="pi-phone-big muted">{s.players[insiderOf(s)]?.name} holds the readout this round. Ask them where the AI is going.</p>}
      {insider && <Readout key={s.round} label={shown?.label || "nowhere: it has nowhere left to go"} />}
      {s.phase === "end" && <p className="pi-phone-big">The game is over. The table screen shows what every readout said.</p>}
    </>
  );
}

// Hold to read: the readout shows only while a finger is on it.
function Readout({ label }) {
  const [open, setOpen] = useState(false);
  const show = () => setOpen(true);
  const hide = () => setOpen(false);
  return (
    <>
      <button
        type="button"
        className={`pi-secret${open ? " open ai" : ""}`}
        onPointerDown={show}
        onPointerUp={hide}
        onPointerLeave={hide}
        onPointerCancel={hide}
        onKeyDown={(e) => e.key === " " && show()}
        onKeyUp={hide}
        onContextMenu={(e) => e.preventDefault()}
      >
        {open ? (
          <>
            <span className="pi-label">The readout: the AI's next move</span>
            <strong>It will go for the {label}.</strong>
          </>
        ) : (
          <span>You hold the readout this round. Hold here to read it.</span>
        )}
      </button>
      <p className="pi-small muted">Tell the table what you like. The readout is right about {Math.round(READOUT_ACCURACY * 100)}% of the time, and the table will see after the game what it said.</p>
    </>
  );
}
