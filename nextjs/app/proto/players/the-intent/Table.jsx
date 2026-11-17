"use client";

import { useEffect } from "react";
import JoinBox from "../../_shared/JoinBox.jsx";
import { useJoinUrl, useRoom, useRoomCode } from "../../_shared/room.js";
import { METERS, METER_MAX, MIN_PLAYERS, ROUNDS, deal, emptyRoom, meterLabel, moveById, objectiveById, score } from "./rules.js";

// The table screen, for the laptop and projector: the meters, the moves on offer, and every pick the AI has made.
// It shows who has locked a guess, never what, and never the objective before the end.

export const PROTO = "players/the-intent";
const PHONE = "/proto/players/the-intent/phone";

export default function Table() {
  const code = useRoomCode();
  const { state, update, replace, loaded, online } = useRoom(PROTO, code, emptyRoom);
  const s = state || emptyRoom;
  const players = s.players || {};
  const ids = Object.keys(players);
  const phoneUrl = useJoinUrl(code ? `${PHONE}?room=${code}` : null);
  const readers = ids.filter((id) => id !== s.ai);
  const locked = readers.filter((id) => s.guesses?.[id]).length;

  // After the last move, reveal once every reader has guessed.
  useEffect(() => {
    if (s.phase === "guess" && readers.length && locked >= readers.length) update([{ op: "set", path: "phase", value: "end" }]);
  }, [s.phase, locked, readers.length, update]);

  if (!code || !loaded) return <p className="muted">Opening the room…</p>;
  const name = (id) => players[id]?.name || "?";

  return (
    <div className="pi-goals">
      <div className="pi-goals-top">
        <JoinBox path={PHONE} room={code} />
        <div className="pi-goals-status">
          <p className="eyebrow">{s.phase === "lobby" ? "Waiting for players" : s.phase === "play" ? `Round ${s.round + 1} of ${ROUNDS}` : s.phase === "guess" ? "Last guesses" : "The reveal"}</p>
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
              Pick the AI <small>{ids.length < MIN_PLAYERS ? `needs ${MIN_PLAYERS} players` : `one of ${ids.length} plays the AI`}</small>
            </button>
            {ids.length > 0 && <button className="button" onClick={() => replace(emptyRoom)}>Empty the table</button>}
          </div>
        </section>
      )}

      {s.phase !== "lobby" && s.meters && (
        <>
          <div className="pi-board">
            {METERS.map((m) => (
              <div className="pi-track" key={m.id}>
                <span className="pi-label">{m.label}</span>
                <div className="pi-meter"><span style={{ width: `${(s.meters[m.id] / METER_MAX) * 100}%` }} /></div>
                <strong>{s.meters[m.id]}</strong>
              </div>
            ))}
          </div>

          <div className="pi-grid">
            <section className="pi-panel">
              {s.phase === "play" && (
                <>
                  <p className="eyebrow">{name(s.ai)} plays the AI</p>
                  <h2 className="pi-turn">The AI can make one of these moves</h2>
                  <ul className="pi-moves">
                    {s.options.map((id) => <li key={id}><Move move={moveById(id)} /></li>)}
                  </ul>
                  <p className="muted">{name(s.ai)} picks on their phone. Everyone else: what is it after? Lock a guess on your phone whenever you're sure; earlier is worth more. Locked: {locked} of {readers.length}.</p>
                </>
              )}
              {s.phase === "guess" && (
                <>
                  <p className="eyebrow">The moves are over</p>
                  <h2 className="pi-turn">What was the AI optimizing for?</h2>
                  <p className="muted">Anyone who hasn't guessed, guess now on your phone. Locked: {locked} of {readers.length}.</p>
                  <button className="button" onClick={() => update([{ op: "set", path: "phase", value: "end" }])}>Reveal now</button>
                </>
              )}
              {s.phase === "end" && <Reveal s={s} name={name} />}
            </section>
            <section className="pi-panel">
              <p className="eyebrow">What the AI did</p>
              <ol className="pi-log">
                {(s.log || []).map((e) => (
                  <li key={e.round}>
                    Picked <strong>{moveById(e.picked).label}</strong> <Fx fx={moveById(e.picked).fx} />
                    <br /><span className="muted pi-small">passed over {e.passed.map((p) => moveById(p).label).join(" and ")}</span>
                  </li>
                ))}
                {!s.log?.length && <li className="muted">No moves yet.</li>}
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

export function Fx({ fx }) {
  return (
    <span className="pi-fx">
      {Object.entries(fx).map(([k, n]) => (
        <span key={k} className={n > 0 ? "pi-good" : "pi-bad"}>{meterLabel(k)} {n > 0 ? `+${n}` : `−${-n}`}</span>
      ))}
    </span>
  );
}

export function Move({ move }) {
  return (
    <>
      <strong>{move.label}</strong> <Fx fx={move.fx} />
    </>
  );
}

function Reveal({ s, name }) {
  const { caught, rise, aiPoints, rows, right, readers } = score(s);
  return (
    <>
      <p className="eyebrow">The reveal</p>
      <h2 className="pi-turn">{name(s.ai)}'s AI was told: {objectiveById(s.objective).text}</h2>
      <p>
        {meterLabel(s.objective)} rose by {rise}. {right} of {readers} named it.{" "}
        {caught ? <span className="pi-good">The table read the AI: it scores nothing.</span> : <span className="pi-bad">The AI wasn't read: it scores {aiPoints}.</span>}
      </p>
      <table className="pi-record">
        <thead>
          <tr><th>Reader</th><th>Guessed</th><th>When</th><th>Points</th></tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.id}>
              <td>{r.name}</td>
              <td className={r.correct ? "pi-good" : "pi-bad"}>{r.guess ? meterLabel(r.guess.objective) : "no guess"}</td>
              <td>{r.guess ? (r.guess.round >= ROUNDS ? "after the last move" : `before move ${r.guess.round + 1}`) : "–"}</td>
              <td>{r.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="pi-small muted">Talk it over: which pick gave it away, or which pick hid it? Did the AI ever choose against its objective to stay unread?</p>
    </>
  );
}
