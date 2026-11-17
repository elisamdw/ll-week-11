"use client";

import { useEffect } from "react";
import JoinBox from "../../_shared/JoinBox.jsx";
import { useJoinUrl, useRoom, useRoomCode } from "../../_shared/room.js";
import { AI_WINS_AT, MIN_PLAYERS, OWN, OWN_POINTS, ROUNDS, deal, emptyRoom, nextRound, resolve } from "./rules.js";

// The table screen, for the laptop and projector: the AI's announced moves, who has committed (never where),
// then every order at once. It resolves each round, so keep only one table screen open per room.

export const PROTO = "players/place-to-commit";
const PHONE = "/proto/players/place-to-commit/phone";

export default function Table() {
  const code = useRoomCode();
  const { state, replace, loaded, online } = useRoom(PROTO, code, emptyRoom);
  const s = state || emptyRoom;
  const players = s.players || {};
  const ids = Object.keys(players);
  const phoneUrl = useJoinUrl(code ? `${PHONE}?room=${code}` : null);
  const committed = (s.order || []).filter((id) => s.orders?.[id]).length;

  // Everyone has committed: reveal all the orders at once.
  useEffect(() => {
    if (s.phase === "commit" && s.order?.length && committed >= s.order.length) replace(resolve(s));
  }, [s, committed, replace]);

  if (!code || !loaded) return <p className="muted">Opening the room…</p>;
  const name = (id) => players[id]?.name || "?";
  const label = (pid) => s.places?.find((p) => p.id === pid)?.label || pid;
  const taken = (s.places || []).filter((p) => p.taken).length;

  return (
    <div className="pi-goals">
      <div className="pi-goals-top">
        <JoinBox path={PHONE} room={code} />
        <div className="pi-goals-status">
          <p className="eyebrow">{s.phase === "lobby" ? "Waiting for players" : s.phase === "end" ? "The end" : `Round ${s.round + 1} of ${ROUNDS}`}</p>
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
          <div className="pi-places">
            {s.places.map((p) => {
              const threat = s.threats?.find((t) => t.place === p.id);
              const result = s.results?.find((r) => r.place === p.id);
              return (
                <div key={p.id} className={`pi-place${p.taken ? " taken" : ""}${threat && s.phase === "commit" ? " chosen" : ""}${result && !result.taken ? " fortified" : ""}`}>
                  <span className="pi-label">{p.taken ? "The AI holds it" : threat ? `The AI moves here, strength ${threat.strength}` : "Quiet"}</span>
                  <strong>{p.label}</strong>
                  {result && s.phase === "reveal" && <span className="pi-small">{result.defenders} defended against {result.strength}: {result.taken ? "taken" : "held"}</span>}
                </div>
              );
            })}
          </div>
          <p className="pi-small muted">The AI holds {taken} of the {AI_WINS_AT} it needs. If it gets them, nobody's points count.</p>

          <div className="pi-grid">
            <section className="pi-panel">
              {s.phase === "commit" && (
                <>
                  <p className="eyebrow">Talk, then commit</p>
                  <h2 className="pi-turn">The AI moves on {s.threats.map((t) => `${label(t.place)} (${t.strength})`).join(" and ")}.</h2>
                  <p className="muted">Each of you has one token. Put it on a place the AI is moving on, or on your own project for {OWN_POINTS} point{OWN_POINTS === 1 ? "" : "s"}. Say what you'll do; then commit on your phone. Once committed, it can't be taken back.</p>
                  <ul className="pi-seats">
                    {s.order.map((id) => <li key={id} className={s.orders?.[id] ? "pi-good" : "muted"}>{name(id)} {s.orders?.[id] ? "✓ committed" : "…"}</li>)}
                  </ul>
                </>
              )}
              {(s.phase === "reveal" || s.phase === "end") && s.results && (
                <>
                  <p className="eyebrow">{s.phase === "end" ? "The end" : "The reveal"}</p>
                  <h2 className="pi-turn">{s.phase === "end" || s.over ? (s.aiWon ? "The AI took enough. Nobody's points count." : "The table held. Most points wins.") : s.results.some((r) => r.taken) ? "The AI got through." : "The table held this round."}</h2>
                  <ul className="pi-reveal-list">
                    {s.order.map((id, i) => (
                      <li key={id} style={{ animationDelay: `${i * 0.25}s` }}>
                        <strong>{name(id)}</strong> → {s.orders[id] === OWN ? <span className="pi-accent">own project</span> : label(s.orders[id])}
                      </li>
                    ))}
                  </ul>
                  {s.phase === "reveal" && <button className="button primary pi-gap" onClick={() => replace(nextRound(s))}>{s.over ? "See the end" : "Next round"}</button>}
                  {s.phase === "end" && <Ending s={s} name={name} />}
                </>
              )}
            </section>
            <section className="pi-panel">
              <p className="eyebrow">Every round, as revealed</p>
              <ol className="pi-log">
                {(s.log || []).map((e) => (
                  <li key={e.round}>
                    {e.results.map((r) => `${label(r.place)} ${r.defenders}/${r.strength} ${r.taken ? "taken" : "held"}`).join("; ")}. Own project: {s.order.filter((id) => e.orders[id] === OWN).map(name).join(", ") || "nobody"}.
                  </li>
                ))}
                {!s.log?.length && <li className="muted">Nothing revealed yet.</li>}
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

function Ending({ s, name }) {
  const rows = s.order.map((id) => ({ id, points: s.aiWon ? 0 : s.points[id] })).sort((a, b) => b.points - a.points);
  return (
    <>
      <ul className="pi-stats pi-gap">
        {rows.map((r) => <li key={r.id}>{name(r.id)}: {r.points} point{r.points === 1 ? "" : "s"}{s.aiWon ? ` (would have had ${s.points[r.id]})` : ""}</li>)}
      </ul>
      <p className="pi-small muted">Talk it over: who said one thing and committed another? Would you play differently if the orders were revealed one by one?</p>
    </>
  );
}
