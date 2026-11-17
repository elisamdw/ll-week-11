"use client";

import { useEffect, useState } from "react";
import { useRoom } from "../../_shared/room.js";
import { Move, PROTO } from "./Table.jsx";
import { CAUGHT_IF, OBJECTIVES, ROUNDS, emptyRoom, meterLabel, moveById, objectiveById, pickOps } from "./rules.js";

// One player's phone. The AI player holds to see the objective and picks a move each round.
// Everyone else locks one guess at what the AI is optimizing for. Each browser tab is its own seat.
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

  const inGame = s.phase !== "lobby" && s.meters && me;
  return (
    <div className="pi-phone">
      <p className="eyebrow">Room {room.toUpperCase()}{me ? ` · ${me.name}` : ""}{!online && <span className="pi-bad"> · reconnecting</span>}</p>
      {!me && <Join seat={seat} phase={s.phase} onJoin={(name) => update([{ op: "set", path: `players.${seat.id}`, value: { name } }])} />}
      {me && s.phase === "lobby" && <p className="pi-phone-big">You're in. Waiting for the table to pick the AI.</p>}
      {inGame && s.ai === seat.id && <AiPlayer s={s} update={update} />}
      {inGame && s.ai !== seat.id && <Reader s={s} id={seat.id} update={update} />}
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

function AiPlayer({ s, update }) {
  const [busy, setBusy] = useState(false);
  const objective = objectiveById(s.objective);
  async function pick(id) {
    if (busy) return;
    setBusy(true);
    await update(pickOps(s, id));
    setBusy(false);
  }
  return (
    <>
      <Hold label="You play the AI. Hold to see what it wants." heading="Your objective" text={objective.text} note={`You score how far ${meterLabel(s.objective)} rises, unless more than ${Math.round(CAUGHT_IF * 100)}% of the others name your objective. You may pick against it to stay unread.`} />
      {s.phase === "play" ? (
        <>
          <p className="pi-phone-big">Move {s.round + 1} of {ROUNDS}. Pick one:</p>
          <div className="pi-move-list">
            {s.options.map((id) => (
              <button key={id} className="button" disabled={busy} onClick={() => pick(id)}>
                <Move move={moveById(id)} />
              </button>
            ))}
          </div>
        </>
      ) : (
        <p className="pi-phone-big">Your moves are done. {s.phase === "end" ? "The table screen shows whether they read you." : "The others are guessing."}</p>
      )}
    </>
  );
}

function Reader({ s, id, update }) {
  const [choice, setChoice] = useState(null);
  const mine = s.guesses?.[id];
  if (mine) {
    return (
      <p className="pi-phone-big">
        You locked: <strong>{meterLabel(mine.objective)}</strong>, {mine.round >= ROUNDS ? "after the last move" : `before move ${mine.round + 1}`}. {s.phase === "end" ? "The table screen has the reveal." : "Keep watching."}
      </p>
    );
  }
  if (s.phase === "end") return <p className="pi-phone-big">The table screen has the reveal.</p>;
  return (
    <>
      <p className="pi-phone-big">{s.players[s.ai]?.name} plays the AI. What is it optimizing for? {s.phase === "play" ? "Lock a guess when you're sure; earlier scores more." : "Guess now."}</p>
      <div className="pi-move-grid">
        {OBJECTIVES.map((o) => (
          <button key={o.id} className={`button${choice === o.id ? " primary" : ""}`} onClick={() => setChoice(o.id)}>{meterLabel(o.id)}</button>
        ))}
      </div>
      {choice && (
        <button className="button primary pi-lock" onClick={() => update([{ op: "set", path: `guesses.${id}`, value: { objective: choice, round: s.round } }])}>
          Lock in {meterLabel(choice)} <small>you can't change it</small>
        </button>
      )}
    </>
  );
}

function Hold({ label, heading, text, note }) {
  const [open, setOpen] = useState(false);
  const show = () => setOpen(true);
  const hide = () => setOpen(false);
  return (
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
          <span className="pi-label">{heading}</span>
          <strong>{text}</strong>
          <span className="pi-small">{note}</span>
        </>
      ) : (
        <span>{label}</span>
      )}
    </button>
  );
}
