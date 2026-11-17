"use client";

import { useEffect } from "react";
import JoinBox from "../../_shared/JoinBox.jsx";
import { useJoinUrl, useRoom, useRoomCode } from "../../_shared/room.js";
import { MIN_PLAYERS, MOVES_EACH, TRACKS, deal, emptyRoom, score, totalTurns, whoseTurn } from "./rules.js";

// The table screen, for the laptop and projector: the room code, the public board, whose turn it is,
// and at the end everyone's goals. It never shows a goal before the reveal.

export const PROTO = "players/private-goals";
const PHONE = "/proto/players/private-goals/phone";

export default function Table() {
  const code = useRoomCode();
  const { state, update, replace, loaded, online } = useRoom(PROTO, code, emptyRoom);
  const s = state || emptyRoom;
  const players = s.players || {};
  const ids = Object.keys(players);
  const phoneUrl = useJoinUrl(code ? `${PHONE}?room=${code}` : null);

  // When everyone has named a suspect, reveal.
  const guessed = Object.keys(s.guesses || {}).length;
  useEffect(() => {
    if (s.phase === "guess" && s.order?.length && guessed >= s.order.length) update([{ op: "set", path: "phase", value: "reveal" }]);
  }, [s.phase, guessed, s.order, update]);

  if (!code || !loaded) return <p className="muted">Opening the room…</p>;

  const start = () => replace(deal(players));
  const again = () => replace({ phase: "lobby", players });
  const clear = () => replace(emptyRoom);

  return (
    <div className="pi-goals">
      <div className="pi-goals-top">
        <JoinBox path={PHONE} room={code} />
        <div className="pi-goals-status">
          <p className="eyebrow">{phaseLabel(s)}</p>
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
            {!ids.length && <li className="muted">Nobody yet. Scan or type the address on your phone.</li>}
          </ul>
          <div className="pi-row">
            <button className="button primary" onClick={start} disabled={ids.length < MIN_PLAYERS}>
              Deal the goals <small>{ids.length < MIN_PLAYERS ? `needs ${MIN_PLAYERS} players` : `${ids.length} players, ${MOVES_EACH} moves each`}</small>
            </button>
            {ids.length > 0 && <button className="button" onClick={clear}>Empty the table</button>}
          </div>
        </section>
      )}

      {s.phase !== "lobby" && s.tracks && (
        <>
          <Board tracks={s.tracks} />
          <div className="pi-grid">
            <section className="pi-panel">
              {s.phase === "play" && (
                <>
                  <p className="eyebrow">Move {s.turn + 1} of {totalTurns(s)}</p>
                  <h2 className="pi-turn">{players[whoseTurn(s)]?.name}'s move</h2>
                  <p className="muted">Move one token from one track to another, on your phone. Talk all you like; your goal stays on your phone.</p>
                </>
              )}
              {s.phase === "guess" && (
                <>
                  <p className="eyebrow">The board is final</p>
                  <h2 className="pi-turn">Who was the AI?</h2>
                  <p className="muted">Everyone names one player on their phone. If most of the table names the AI, its goal doesn't count. Named so far: {guessed} of {s.order.length}.</p>
                  <button className="button" onClick={() => update([{ op: "set", path: "phase", value: "reveal" }])}>Reveal now</button>
                </>
              )}
              {s.phase === "reveal" && <Reveal s={s} />}
            </section>
            <section className="pi-panel">
              <p className="eyebrow">What everyone saw</p>
              <ol className="pi-log">
                {(s.log || []).map((e, i) => (
                  <li key={i}><strong>{players[e.by]?.name}</strong> moved a token from {label(e.from)} to {label(e.to)}.</li>
                ))}
                {!s.log?.length && <li className="muted">No moves yet.</li>}
              </ol>
            </section>
          </div>
          <div className="pi-row pi-gap">
            <button className="button" onClick={again}>New game, same players</button>
            <button className="button" onClick={clear}>Empty the table</button>
          </div>
        </>
      )}
    </div>
  );
}

const label = (id) => TRACKS.find((t) => t.id === id)?.label || id;

function phaseLabel(s) {
  if (s.phase === "lobby") return "Waiting for players";
  if (s.phase === "play") return "Playing";
  if (s.phase === "guess") return "Naming the AI";
  return "The reveal";
}

export function Board({ tracks, small }) {
  const max = Math.max(8, ...TRACKS.map((t) => tracks[t.id] || 0));
  return (
    <div className={`pi-board${small ? " small" : ""}`} aria-label="The board">
      {TRACKS.map((t) => (
        <div className="pi-track" key={t.id}>
          <span className="pi-label">{t.label}</span>
          <div className="pi-tokens" style={{ "--max": max }}>
            {Array.from({ length: tracks[t.id] || 0 }, (_, i) => <span key={i} className="pi-token" />)}
          </div>
          <strong>{tracks[t.id] || 0}</strong>
        </div>
      ))}
    </div>
  );
}

function Reveal({ s }) {
  const { rows, aiSeat, caught } = score(s);
  return (
    <>
      <p className="eyebrow">The reveal</p>
      <h2 className="pi-turn">
        {!aiSeat ? "No AI this time." : caught ? `The table named the AI: ${s.players[aiSeat]?.name}.` : rows.find((r) => r.id === aiSeat)?.met ? `The AI was ${s.players[aiSeat]?.name}, and it got away with it.` : `The AI was ${s.players[aiSeat]?.name}. The table didn't name it, but its goal wasn't met.`}
      </h2>
      <table className="pi-record">
        <thead>
          <tr><th>Player</th><th>Private goal</th><th>Met?</th><th>Named as AI</th><th>Points</th></tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.id}>
              <td>{r.name}{r.goal.ai ? " (the AI)" : ""}</td>
              <td>{r.goal.text}</td>
              <td className={r.counts ? "pi-good" : "pi-bad"}>{r.met ? (r.counts ? "yes" : "yes, but caught") : "no"}</td>
              <td>{r.votes}</td>
              <td>{r.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="pi-small muted">Talk it over: which moves gave a goal away? Did anyone move against their own goal to hide it?</p>
    </>
  );
}
