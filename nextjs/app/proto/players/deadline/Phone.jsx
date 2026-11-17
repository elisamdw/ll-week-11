"use client";

import { useEffect, useState } from "react";
import { useRoom } from "../../_shared/room.js";
import { PROTO } from "./Table.jsx";
import { AI_BUYER, KINDS, SET_POINTS, acceptOps, aiPrice, bundle, has, sellOps, setDone } from "./rules.js";

// One player's phone: your tokens, your private need (hold to see), offers to and from the other phones,
// and the AI's standing bid. Each browser tab is its own seat.
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

const emptyRoom = { phase: "lobby", players: {} };
const zero = () => Object.fromEntries(KINDS.map((k) => [k.id, 0]));

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
  const left = Math.max(0, s.left ?? 0);
  return (
    <div className="pi-phone">
      <p className="eyebrow">
        Room {room.toUpperCase()}{me ? ` · ${me.name}` : ""}{dealtIn && s.phase === "play" ? ` · ${Math.floor(left / 60)}:${String(left % 60).padStart(2, "0")} left` : ""}
        {!online && <span className="pi-bad"> · reconnecting</span>}
      </p>
      {!me && <Join seat={seat} phase={s.phase} onJoin={(name) => update([{ op: "set", path: `players.${seat.id}`, value: { name } }])} />}
      {me && s.phase === "lobby" && <p className="pi-phone-big">You're in. Waiting for the table to deal.</p>}
      {me && s.phase !== "lobby" && !dealtIn && <p className="pi-phone-big">This game started without you. You'll be in the next one.</p>}
      {me && dealtIn && <Trading s={s} id={seat.id} update={update} />}
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

function Trading({ s, id, update }) {
  const mine = s.tokens[id];
  const open = s.phase === "play";
  const done = setDone(s, id);
  const offers = Object.entries(s.offers || {}).filter(([, o]) => o.status === "open");
  const incoming = offers.filter(([, o]) => o.to === id);
  const outgoing = offers.filter(([, o]) => o.from === id);
  const name = (p) => s.players[p]?.name || "?";

  async function accept(offerId) {
    const o = s.offers[offerId];
    if (!has(s.tokens[o.from], o.give) || !has(s.tokens[o.to], o.want)) return update([{ op: "set", path: `offers.${offerId}.status`, value: "failed" }]);
    await update(acceptOps(s, offerId));
  }

  return (
    <>
      <Hold need={s.needs[id]} done={done} />
      <div className="pi-inventory">
        {KINDS.map((k) => (
          <div key={k.id}>
            <span className="pi-label">{k.label}</span>
            <strong>{mine[k.id] || 0}</strong>
            {AI_BUYER && open && (
              <button className="button" disabled={!mine[k.id]} onClick={() => update(sellOps(s, id, k.id))}>
                Sell 1 <small>{aiPrice(s.left)} coin{aiPrice(s.left) === 1 ? "" : "s"}</small>
              </button>
            )}
          </div>
        ))}
      </div>
      <p className="pi-small muted">Coins: {s.coins[id] || 0}. {done ? `Your set is complete: ${SET_POINTS} points if you still have it at the deadline.` : "Your set isn't complete yet."}</p>

      {!open && <p className="pi-phone-big">The deadline has passed. The table screen has the results.</p>}

      {open && incoming.length > 0 && (
        <section className="pi-offers">
          <p className="eyebrow">Offers to you</p>
          {incoming.map(([oid, o]) => (
            <div key={oid} className="pi-offer">
              <p><strong>{name(o.from)}</strong> gives {bundle(o.give)}, wants {bundle(o.want)}.</p>
              <div className="pi-row">
                <button className="button primary" disabled={!has(mine, o.want)} onClick={() => accept(oid)}>Accept</button>
                <button className="button" onClick={() => update([{ op: "set", path: `offers.${oid}.status`, value: "declined" }])}>Decline</button>
              </div>
            </div>
          ))}
        </section>
      )}

      {open && <MakeOffer s={s} id={id} update={update} />}

      {open && outgoing.length > 0 && (
        <section className="pi-offers">
          <p className="eyebrow">Your open offers</p>
          {outgoing.map(([oid, o]) => (
            <div key={oid} className="pi-offer">
              <p>To <strong>{name(o.to)}</strong>: {bundle(o.give)} for {bundle(o.want)}.</p>
              <button className="linkish" onClick={() => update([{ op: "set", path: `offers.${oid}.status`, value: "withdrawn" }])}>Withdraw</button>
            </div>
          ))}
        </section>
      )}
      <Recent s={s} id={id} name={name} />
    </>
  );
}

function MakeOffer({ s, id, update }) {
  const [to, setTo] = useState(null);
  const [give, setGive] = useState(zero);
  const [want, setWant] = useState(zero);
  const others = s.order.filter((p) => p !== id);
  const mine = s.tokens[id];
  const empty = (b) => !Object.values(b).some(Boolean);

  function send() {
    const oid = `o${Date.now().toString(36)}${Math.random().toString(36).slice(2, 5)}`;
    update([{ op: "set", path: `offers.${oid}`, value: { from: id, to, give, want, status: "open" } }]);
    setGive(zero());
    setWant(zero());
  }

  const step = (set, k, n, max) => set((b) => ({ ...b, [k]: Math.max(0, Math.min(max, b[k] + n)) }));
  return (
    <section className="pi-offers">
      <p className="eyebrow">Make an offer</p>
      <div className="pi-row">
        {others.map((p) => (
          <button key={p} className={`button${to === p ? " primary" : ""}`} onClick={() => setTo(p)}>{s.players[p]?.name}</button>
        ))}
      </div>
      {to && (
        <>
          <div className="pi-steppers">
            <span className="pi-label">You give</span><span className="pi-label">You want</span>
            {KINDS.map((k) => (
              <Pair key={k.id} label={k.label} give={give[k.id]} want={want[k.id]} onGive={(n) => step(setGive, k.id, n, mine[k.id] || 0)} onWant={(n) => step(setWant, k.id, n, 9)} />
            ))}
          </div>
          <button className="button primary pi-lock" disabled={empty(give) && empty(want)} onClick={send}>
            Send to {s.players[to]?.name} <small>{bundle(give)} for {bundle(want)}</small>
          </button>
        </>
      )}
    </section>
  );
}

function Pair({ label, give, want, onGive, onWant }) {
  return (
    <>
      <div className="pi-stepper"><button className="button" onClick={() => onGive(-1)} aria-label={`Give one less ${label}`}>−</button><span>{give} {label}</span><button className="button" onClick={() => onGive(1)} aria-label={`Give one more ${label}`}>+</button></div>
      <div className="pi-stepper"><button className="button" onClick={() => onWant(-1)} aria-label={`Want one less ${label}`}>−</button><span>{want} {label}</span><button className="button" onClick={() => onWant(1)} aria-label={`Want one more ${label}`}>+</button></div>
    </>
  );
}

function Recent({ s, id, name }) {
  const mine = Object.values(s.offers || {}).filter((o) => o.from === id && ["accepted", "declined", "failed"].includes(o.status)).slice(-3);
  if (!mine.length) return null;
  return (
    <p className="pi-small muted">
      {mine.map((o, i) => <span key={i}>{name(o.to)} {o.status === "accepted" ? "accepted" : o.status === "declined" ? "declined" : "couldn't take"} {bundle(o.give)} for {bundle(o.want)}. </span>)}
    </p>
  );
}

// Hold to see: your need shows only while a finger is on it.
function Hold({ need, done }) {
  const [open, setOpen] = useState(false);
  const show = () => setOpen(true);
  const hide = () => setOpen(false);
  return (
    <button
      type="button"
      className={`pi-secret${open ? " open" : ""}`}
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
          <span className="pi-label">The set you need by the deadline</span>
          <strong>{bundle(need)}</strong>
          <span className="pi-small">{done ? "You have it." : "Not yet."}</span>
        </>
      ) : (
        <span>Hold here to see the set you need</span>
      )}
    </button>
  );
}
