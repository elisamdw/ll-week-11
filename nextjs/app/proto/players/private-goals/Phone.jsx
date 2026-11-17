"use client";

import { useEffect, useState } from "react";
import { useRoom } from "../../_shared/room.js";
import { Board, PROTO } from "./Table.jsx";
import { TRACKS, emptyRoom, goalById, score, totalTurns, whoseTurn } from "./rules.js";

// One player's phone: join with a name, hold to see your private goal, move a token on your turn,
// then name who you think the AI was. Each browser tab is its own seat, so a laptop can test with tabs.

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

  return (
    <div className="pi-phone">
      <p className="eyebrow">Room {room.toUpperCase()}{me ? ` · ${me.name}` : ""}{!online && <span className="pi-bad"> · reconnecting</span>}</p>
      {!me && <Join seat={seat} phase={s.phase} onJoin={(name) => update([{ op: "set", path: `players.${seat.id}`, value: { name } }])} />}
      {me && s.phase === "lobby" && <p className="pi-phone-big">You're in. Waiting for the table to deal the goals.</p>}
      {me && s.phase !== "lobby" && !s.goals?.[seat.id] && <p className="pi-phone-big">This game started without you. You'll be dealt in next game.</p>}
      {me && s.phase !== "lobby" && s.goals?.[seat.id] && <Playing s={s} id={seat.id} update={update} />}
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

function Playing({ s, id, update }) {
  const goal = goalById(s.goals[id]);
  return (
    <>
      <SecretGoal goal={goal} />
      {s.phase === "play" && <Move s={s} id={id} update={update} />}
      {s.phase === "guess" && <Guess s={s} id={id} update={update} />}
      {s.phase === "reveal" && <Result s={s} id={id} />}
      <Board tracks={s.tracks} small />
    </>
  );
}

// Hold to see: the goal shows only while a finger is on it, so a neighbor can't read it over your shoulder.
function SecretGoal({ goal }) {
  const [open, setOpen] = useState(false);
  const show = () => setOpen(true);
  const hide = () => setOpen(false);
  return (
    <button
      type="button"
      className={`pi-secret${open ? " open" : ""}${goal.ai ? " ai" : ""}`}
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
          <span className="pi-label">{goal.ai ? "You are the AI" : "Your private goal"}</span>
          <strong>{goal.text}</strong>
          {goal.hint && <span className="pi-small">{goal.hint}</span>}
        </>
      ) : (
        <span>Hold here to see your goal</span>
      )}
    </button>
  );
}

function Move({ s, id, update }) {
  const [from, setFrom] = useState(null);
  const [busy, setBusy] = useState(false);
  const mine = whoseTurn(s) === id;
  useEffect(() => setFrom(null), [s.turn]);
  if (!mine) return <p className="pi-phone-big">{s.players[whoseTurn(s)]?.name} is moving. Move {s.turn + 1} of {totalTurns(s)}.</p>;

  async function move(to) {
    if (busy || !from || from === to) return;
    setBusy(true);
    const last = s.turn + 1 >= totalTurns(s);
    await update([
      { op: "inc", path: `tracks.${from}`, value: -1 },
      { op: "inc", path: `tracks.${to}`, value: 1 },
      { op: "push", path: "log", value: { by: id, from, to } },
      { op: "inc", path: "turn", value: 1 },
      ...(last ? [{ op: "set", path: "phase", value: "guess" }] : []),
    ]);
    setBusy(false);
  }

  return (
    <div className="pi-move">
      <p className="pi-phone-big">Your move. {from ? "Move it to…" : "Take a token from…"}</p>
      <div className="pi-move-grid">
        {TRACKS.map((t) => {
          const n = s.tracks[t.id] || 0;
          const disabled = busy || (!from ? n < 1 : t.id === from);
          return (
            <button key={t.id} className={`button${from === t.id ? " primary" : ""}`} disabled={disabled} onClick={() => (from ? move(t.id) : setFrom(t.id))}>
              {t.label} <small>{n}</small>
            </button>
          );
        })}
      </div>
      {from && <button className="linkish pi-small" onClick={() => setFrom(null)}>Pick a different track</button>}
    </div>
  );
}

function Guess({ s, id, update }) {
  const mine = s.guesses?.[id];
  return (
    <div className="pi-move">
      <p className="pi-phone-big">{mine ? `You named ${s.players[mine]?.name}. Waiting for the others.` : "Who was the AI?"}</p>
      <div className="pi-move-grid">
        {s.order.filter((p) => p !== id).map((p) => (
          <button key={p} className={`button${mine === p ? " primary" : ""}`} onClick={() => update([{ op: "set", path: `guesses.${id}`, value: p }])}>
            {s.players[p]?.name}
          </button>
        ))}
      </div>
    </div>
  );
}

function Result({ s, id }) {
  const { rows } = score(s);
  const r = rows.find((x) => x.id === id);
  if (!r) return null;
  return (
    <p className="pi-phone-big">
      {r.goal.ai ? "You were the AI. " : ""}
      {r.met ? (r.counts ? "Your goal was met." : "Your goal was met, but the table named you.") : "Your goal wasn't met."} {r.named ? "You named the AI." : ""} {r.points} point{r.points === 1 ? "" : "s"}. The table screen shows everyone's goals.
    </p>
  );
}
