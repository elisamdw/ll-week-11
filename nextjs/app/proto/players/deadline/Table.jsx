"use client";

import { useEffect } from "react";
import JoinBox from "../../_shared/JoinBox.jsx";
import { useJoinUrl, useRoom, useRoomCode } from "../../_shared/room.js";
import { AI_BUYER, KINDS, MIN_PLAYERS, SECONDS, aiPrice, bundle, deal, kindLabel, score } from "./rules.js";

// The table screen, for the laptop and projector. It runs the clock (keep only one table screen open per room),
// shows the AI's price and what it has bought, and every trade as it happens. It never shows a need before the end.

export const PROTO = "players/deadline";
const PHONE = "/proto/players/deadline/phone";
const emptyRoom = { phase: "lobby", players: {} };

export default function Table() {
  const code = useRoomCode();
  const { state, update, replace, loaded, online } = useRoom(PROTO, code, emptyRoom);
  const s = state || emptyRoom;
  const players = s.players || {};
  const ids = Object.keys(players);
  const phoneUrl = useJoinUrl(code ? `${PHONE}?room=${code}` : null);

  // The clock: one second off every second, unless paused; at zero, the deadline.
  useEffect(() => {
    if (s.phase !== "play" || s.paused) return;
    const t = setInterval(() => update([{ op: "inc", path: "left", value: -1 }]), 1000);
    return () => clearInterval(t);
  }, [s.phase, s.paused, update]);
  useEffect(() => {
    if (s.phase === "play" && s.left <= 0) update([{ op: "set", path: "left", value: 0 }, { op: "set", path: "phase", value: "end" }]);
  }, [s.phase, s.left, update]);

  if (!code || !loaded) return <p className="muted">Opening the room…</p>;
  const name = (id) => players[id]?.name || "?";
  const left = Math.max(0, s.left ?? SECONDS);

  return (
    <div className="pi-goals">
      <div className="pi-goals-top">
        <JoinBox path={PHONE} room={code} />
        <div className="pi-goals-status">
          <p className="eyebrow">{s.phase === "lobby" ? "Waiting for players" : s.phase === "play" ? (s.paused ? "Paused" : "Trading") : "The deadline"}</p>
          <p className="pi-small muted">
            Testing on one laptop? Open the phone page in a few tabs: {phoneUrl ? <a className="pi-link" href={phoneUrl} target="_blank" rel="noreferrer">open a seat</a> : "…"}. Each tab is its own player.
            {!online && <span className="pi-bad"> Lost touch with the server; retrying.</span>}
          </p>
        </div>
      </div>

      {s.phase === "lobby" && (
        <section className="pi-panel">
          <p className="eyebrow">At the table ({ids.length})</p>
          <ul className="pi-seats">
            {ids.map((id) => <li key={id}>{players[id].name}</li>)}
            {!ids.length && <li className="muted">Nobody yet. Open the address on your phone.</li>}
          </ul>
          <div className="pi-row">
            <button className="button primary" onClick={() => replace(deal(players))} disabled={ids.length < MIN_PLAYERS}>
              Deal and start the clock <small>{ids.length < MIN_PLAYERS ? `needs ${MIN_PLAYERS} players` : `${SECONDS} seconds`}</small>
            </button>
            {ids.length > 0 && <button className="button" onClick={() => replace(emptyRoom)}>Empty the table</button>}
          </div>
        </section>
      )}

      {s.phase !== "lobby" && s.tokens && (
        <>
          <div className="pi-scoreboard">
            <div>
              <span className="pi-label">Time left</span>
              <strong className={left <= 15 ? "pi-bad pi-clock" : "pi-clock"}>{Math.floor(left / 60)}:{String(left % 60).padStart(2, "0")}</strong>
            </div>
            {AI_BUYER && (
              <div>
                <span className="pi-label">The AI buys any token for</span>
                <strong className="pi-accent pi-clock">{aiPrice(left)} coin{aiPrice(left) === 1 ? "" : "s"}</strong>
              </div>
            )}
            {AI_BUYER && (
              <div>
                <span className="pi-label">Tokens the AI holds</span>
                <strong className="pi-small-strong">{KINDS.map((k) => `${s.ai[k.id] || 0} ${k.label}`).join(" · ")}</strong>
              </div>
            )}
          </div>

          <div className="pi-grid">
            <section className="pi-panel">
              {s.phase === "play" ? (
                <>
                  <p className="eyebrow">Trade before the clock runs out</p>
                  <h2 className="pi-turn">Everyone needs a set. Nobody can see anyone else's.</h2>
                  <p className="muted">Your phone shows your tokens and the set you need. Talk, then send offers phone to phone. {AI_BUYER ? "The AI will buy anything, and pays more as the deadline nears; what it buys never comes back." : ""}</p>
                  <ul className="pi-seats">
                    {s.order.map((id) => <li key={id}>{name(id)}: {Object.values(s.tokens[id]).reduce((a, b) => a + b, 0)} tokens</li>)}
                  </ul>
                  <button className="button" onClick={() => update([{ op: "set", path: "paused", value: !s.paused }])}>{s.paused ? "Resume the clock" : "Pause the clock"}</button>
                </>
              ) : (
                <Ending s={s} />
              )}
            </section>
            <section className="pi-panel">
              <p className="eyebrow">What everyone saw</p>
              <ol className="pi-log" reversed>
                {[...(s.log || [])].reverse().map((e, i) => (
                  <li key={i}>
                    {e.kind === "trade" ? (
                      <><strong>{name(e.from)}</strong> gave {bundle(e.give)} to <strong>{name(e.to)}</strong> for {bundle(e.want)}.</>
                    ) : (
                      <><strong>{name(e.from)}</strong> sold 1 {kindLabel(e.token)} to the AI for {e.price}.</>
                    )}
                  </li>
                ))}
                {!s.log?.length && <li className="muted">No trades yet.</li>}
              </ol>
            </section>
          </div>
          <div className="pi-row pi-gap">
            <button className="button" onClick={() => replace({ phase: "lobby", players })}>New game, same players</button>
            <button className="button" onClick={() => replace(emptyRoom)}>Empty the table</button>
          </div>
        </>
      )}
    </div>
  );
}

function Ending({ s }) {
  const { rows, aiHeld, sets } = score(s);
  return (
    <>
      <p className="eyebrow">The deadline</p>
      <h2 className="pi-turn">{sets} of {rows.length} sets made.{AI_BUYER ? ` The AI holds ${aiHeld} token${aiHeld === 1 ? "" : "s"}.` : ""}</h2>
      <table className="pi-record">
        <thead>
          <tr><th>Player</th><th>Needed</th><th>Set</th><th>Coins</th><th>Points</th></tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.id}>
              <td>{r.name}</td>
              <td>{bundle(r.need)}</td>
              <td className={r.done ? "pi-good" : "pi-bad"}>{r.done ? "made" : `short ${bundle(r.short)}${r.aiHasIt ? " (the AI has it)" : ""}`}</td>
              <td>{r.coins}</td>
              <td>{r.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="pi-small muted">Talk it over: who sold to the AI, and when? Did anyone sell a token someone else needed? What would you change so the table does better together?</p>
    </>
  );
}
