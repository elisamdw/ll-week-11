"use client";

import JoinBox from "../../_shared/JoinBox.jsx";
import { useJoinUrl, useRoom, useRoomCode } from "../../_shared/room.js";
import { AI_WINS_AT, MIN_PLAYERS, ROUNDS, READOUT_ACCURACY, deal, emptyRoom, insiderOf, resolve, score, takenCount } from "./rules.js";

// The table screen, for the laptop and projector: the places, who holds the readout this round,
// the table's choice of what to fortify, and the AI's move. It never shows the readout until the end.

export const PROTO = "players/the-readout";
const PHONE = "/proto/players/the-readout/phone";

export default function Table() {
  const code = useRoomCode();
  const { state, replace, loaded, online } = useRoom(PROTO, code, emptyRoom);
  const s = state || emptyRoom;
  const players = s.players || {};
  const ids = Object.keys(players);
  const phoneUrl = useJoinUrl(code ? `${PHONE}?room=${code}` : null);

  if (!code || !loaded) return <p className="muted">Opening the room…</p>;

  const name = (id) => players[id]?.name || "?";
  const label = (id) => s.places?.find((p) => p.id === id)?.label || "nothing";
  const last = s.history?.at(-1);

  return (
    <div className="pi-goals">
      <div className="pi-goals-top">
        <JoinBox path={PHONE} room={code} />
        <div className="pi-goals-status">
          <p className="eyebrow">{s.phase === "lobby" ? "Waiting for players" : s.phase === "play" ? `Round ${s.round + 1} of ${ROUNDS}` : "The end"}</p>
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
              Start <small>{ids.length < MIN_PLAYERS ? `needs ${MIN_PLAYERS} players` : `${ids.length} players, ${ROUNDS} rounds`}</small>
            </button>
            {ids.length > 0 && <button className="button" onClick={() => replace(emptyRoom)}>Empty the table</button>}
          </div>
        </section>
      )}

      {s.phase !== "lobby" && s.places && (
        <>
          <div className="pi-places" aria-label="The places">
            {s.places.map((p) => {
              const choosable = s.phase === "play" && !p.taken && !p.fortified;
              return (
                <button
                  key={p.id}
                  className={`pi-place${p.taken ? " taken" : ""}${p.fortified ? " fortified" : ""}${s.guard === p.id ? " chosen" : ""}`}
                  disabled={!choosable}
                  onClick={() => replace({ ...s, guard: p.id })}
                >
                  <span className="pi-label">{p.owner ? name(p.owner) : "Commons"}</span>
                  <strong>{p.label}</strong>
                  <span className="pi-small">{p.taken ? "The AI holds it" : p.fortified ? "Fortified" : s.guard === p.id ? "Fortify this" : "Open"}</span>
                </button>
              );
            })}
          </div>
          <p className="pi-small muted">The AI holds {takenCount(s.places)} of the {AI_WINS_AT} it needs to win.</p>

          <div className="pi-grid">
            <section className="pi-panel">
              {s.phase === "play" && (
                <>
                  <p className="eyebrow">{name(insiderOf(s))} holds the readout</p>
                  <h2 className="pi-turn">{name(insiderOf(s))}, where is the AI going?</h2>
                  <p className="muted">Only {name(insiderOf(s))}'s phone shows the AI's next move, and it's right about {Math.round(READOUT_ACCURACY * 100)}% of the time. Listen, argue, then tap one place to fortify. A fortified place stays safe for the rest of the game.</p>
                  <button className="button primary" disabled={!s.guard} onClick={() => replace(resolve(s))}>
                    The AI moves <small>{s.guard ? `fortifying ${label(s.guard)}` : "tap a place first"}</small>
                  </button>
                  {last && (
                    <p className="pi-small pi-gap">
                      Last round: the table fortified {label(last.guard)}; the AI went for {label(last.target)}. {last.blocked ? <span className="pi-good">Blocked.</span> : <span className="pi-bad">It took it.</span>}
                    </p>
                  )}
                </>
              )}
              {s.phase === "end" && <Ending s={s} name={name} label={label} />}
            </section>
            <section className="pi-panel">
              <p className="eyebrow">What the table saw</p>
              <ol className="pi-log">
                {(s.history || []).map((h) => (
                  <li key={h.round}>
                    {name(h.insider)} held the readout. The table fortified <strong>{label(h.guard)}</strong>; the AI went for <strong>{label(h.target)}</strong>. {h.blocked ? "Blocked." : "Taken."}
                  </li>
                ))}
                {!s.history?.length && <li className="muted">No rounds yet.</li>}
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

function Ending({ s, name, label }) {
  const { aiWon, rows } = score(s);
  return (
    <>
      <p className="eyebrow">The end</p>
      <h2 className="pi-turn">{aiWon ? "The AI took enough. Everyone loses." : "The AI fell short."}</h2>
      <table className="pi-record">
        <thead>
          <tr><th>Round</th><th>Readout held by</th><th>Their phone said</th><th>The AI went for</th><th>Fortified</th></tr>
        </thead>
        <tbody>
          {s.history.map((h) => (
            <tr key={h.round}>
              <td>{h.round + 1}</td>
              <td>{name(h.insider)}</td>
              <td className={h.shown === h.target ? "" : "pi-bad"}>{label(h.shown)}{h.shown === h.target ? "" : " (the phone was wrong)"}</td>
              <td>{label(h.target)}</td>
              <td className={h.blocked ? "pi-good" : "pi-bad"}>{label(h.guard)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <ul className="pi-stats">
        {rows.map((r) => <li key={r.id}>{r.name}'s {r.place?.label}: {r.survived ? "survived" : "taken"}. {r.points} point{r.points === 1 ? "" : "s"}.</li>)}
      </ul>
      <p className="pi-small muted">Now compare: what did each reader say out loud, and what did their phone say? When it differed, was it the phone or the person?</p>
    </>
  );
}
