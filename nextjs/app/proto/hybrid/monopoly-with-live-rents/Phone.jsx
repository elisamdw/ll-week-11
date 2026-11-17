"use client";

import { useEffect, useState } from "react";
import { usePlayer, useRoom } from "../../_shared/room.js";
import { LandingSheet, PropertyPicker } from "./Landing.jsx";
import { MODES, PROPERTY, emptyRoom, money } from "./rents.js";
import { PROTO } from "./Host.jsx";

// A player's phone: where did you land, what's on it, what do you pay now. Rents come from the laptop.

function useRoomFromUrl() {
  const [room, setRoom] = useState(undefined);
  useEffect(() => {
    setRoom((new URL(window.location.href).searchParams.get("room") || "").toLowerCase().replace(/[^a-z0-9-]/g, "") || null);
  }, []);
  return room;
}

export default function Phone() {
  const code = useRoomFromUrl();
  const me = usePlayer();
  const { state, update, loaded, online } = useRoom(PROTO, code, emptyRoom);
  const room = { ...emptyRoom, ...(state || {}) };
  const [landing, setLanding] = useState(null);
  const [name, setName] = useState("");

  if (code === undefined || !me.id) return <p className="muted">…</p>;
  if (!code) return <EnterCode />;
  if (!loaded) return <p className="muted">Finding room {code.toUpperCase()}…</p>;

  if (!me.name)
    return (
      <form
        className="hy-phone-stack"
        onSubmit={(e) => {
          e.preventDefault();
          if (name.trim()) me.setName(name.trim().slice(0, 20));
        }}
      >
        <p className="eyebrow">Room {code.toUpperCase()}</p>
        <label className="hy-field">
          Your name or token
          <input value={name} onChange={(e) => setName(e.target.value)} maxLength={20} autoComplete="off" placeholder="the car" />
        </label>
        <button className="button primary">Join the table</button>
      </form>
    );

  const mine = room.landings.filter((l) => l.player === me.name);
  const last = mine[mine.length - 1];

  return (
    <div className="hy-phone-stack">
      <p className="eyebrow">
        Room {code.toUpperCase()} · {me.name} · round {room.round} · {MODES[room.mode].name} rents
        {!online && <span className="hy-bad"> · reconnecting</span>}
      </p>
      {landing ? (
        <LandingSheet room={room} property={landing} player={me.name} update={update} onDone={() => setLanding(null)} />
      ) : (
        <>
          <h2 className="hy-phone-q">Where did you land?</h2>
          {last && (
            <p className="muted hy-rent-small">
              Last: {PROPERTY[last.property]?.name}, {last.situation === "unowned" ? "no rent" : `paid ${money(last.rent)}`}. You've paid {money(mine.reduce((n, l) => n + (l.rent || 0), 0))} in all.
            </p>
          )}
          <PropertyPicker room={room} onPick={setLanding} compact />
          <button className="linkish hy-rent-small" onClick={() => me.setName("")}>
            Not {me.name}?
          </button>
        </>
      )}
    </div>
  );
}

function EnterCode() {
  const [code, setCode] = useState("");
  return (
    <form
      className="hy-phone-stack"
      onSubmit={(e) => {
        e.preventDefault();
        if (code.trim()) window.location.search = `?room=${code.trim().toLowerCase()}`;
      }}
    >
      <p className="eyebrow">Join a table</p>
      <label className="hy-field">
        Room code
        <input value={code} onChange={(e) => setCode(e.target.value)} autoCapitalize="none" autoComplete="off" placeholder="abcd" />
      </label>
      <button className="button primary">Join</button>
    </form>
  );
}
