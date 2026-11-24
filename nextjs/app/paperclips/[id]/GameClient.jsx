"use client";

import { useEffect, useMemo, useState } from "react";
import { usePaperclips } from "../usePaperclips.js";

function fmt(n) {
  if (n == null) return "—";
  if (n >= 10000) return n.toLocaleString();
  if (n >= 100) return String(Math.round(n));
  return Number.isInteger(n) ? String(n) : n.toFixed(2);
}
function dollars(n) { return `$${(n || 0).toFixed(2)}`; }
function cents(n) { return `${(n || 0)}¢`; }

export default function GameClient({ roomId }) {
  const { game, you, error, clearError, connected, playerId, send } = usePaperclips(roomId);
  const [nameDraft, setNameDraft] = useState("");
  const [priceDraft, setPriceDraft] = useState(null);

  const me = useMemo(() => {
    if (!game || !playerId) return null;
    return game.players.find((p) => p.id === playerId) || null;
  }, [game, playerId]);

  useEffect(() => {
    if (me && priceDraft == null) setPriceDraft(me.price);
  }, [me, priceDraft]);

  if (!game) {
    return (
      <main className="pc-room pc-loading">
        <p>{connected ? "Loading…" : "Connecting…"}</p>
      </main>
    );
  }

  const phase = game.phase;

  return (
    <main className="pc-room">
      <header className="pc-header">
        <h1>Paperclips <span className="pc-room-id">· {roomId}</span></h1>
        <div className="pc-mods">
          <ModChip label="wire" value={`×${game.mods.wireCost.toFixed(2)}`} />
          <ModChip label="speed" value={`×${game.mods.clipperSpeed.toFixed(2)}`} />
          <ModChip label="demand" value={`×${game.mods.demand.toFixed(2)}`} />
          {game.mods.sharedMarket ? <ModChip label="market" value="shared" /> : null}
        </div>
      </header>

      {error ? (
        <div className="pc-error" onClick={clearError}>{error} <small>(click to dismiss)</small></div>
      ) : null}

      {phase === "lobby" ? (
        <Lobby game={game} me={me} send={send} nameDraft={nameDraft} setNameDraft={setNameDraft} />
      ) : null}

      {phase === "playing" && me ? (
        <Playing
          game={game}
          me={me}
          send={send}
          priceDraft={priceDraft}
          setPriceDraft={setPriceDraft}
        />
      ) : null}

      {phase === "playing" && !me ? (
        <p className="pc-spectator">Spectating. Share this URL to join a slot before someone else does, or wait for next room.</p>
      ) : null}

      {phase === "ended" ? (
        <Ended game={game} />
      ) : null}

      <Roster game={game} meId={me?.id} />
      <Log game={game} />
    </main>
  );
}

function ModChip({ label, value }) {
  return (
    <span className="pc-chip">
      <span className="pc-chip-label">{label}</span>
      <span className="pc-chip-value">{value}</span>
    </span>
  );
}

function Lobby({ game, me, send, nameDraft, setNameDraft }) {
  return (
    <section className="pc-lobby">
      <h2>Lobby</h2>
      <p>Players ready: {game.players.length}</p>
      {me ? (
        <form
          onSubmit={(e) => { e.preventDefault(); if (nameDraft.trim()) send({ type: "setName", name: nameDraft.trim() }); }}
          className="pc-name-form"
        >
          <input
            value={nameDraft}
            onChange={(e) => setNameDraft(e.target.value)}
            placeholder={me.name}
            maxLength={24}
          />
          <button type="submit">Set name</button>
        </form>
      ) : <p>Joining…</p>}
      <button className="pc-cta" onClick={() => send({ type: "start" })}>
        Start the factory
      </button>
    </section>
  );
}

function Playing({ game, me, send, priceDraft, setPriceDraft }) {
  const hasVote = Boolean(game.vote);
  const myVote = game.vote ? Object.entries(game.vote.votes).find(([pid]) => pid === me.id)?.[1] : null;
  const voteSecondsLeft = game.vote ? Math.max(0, Math.round((game.vote.endsAt - Date.now()) / 1000)) : 0;
  const nextVoteSecondsLeft = game.nextVoteAt ? Math.max(0, Math.round((game.nextVoteAt - Date.now()) / 1000)) : null;

  return (
    <>
      {hasVote ? (
        <section className="pc-vote">
          <h2>Infrastructure vote <span className="pc-vote-timer">{voteSecondsLeft}s</span></h2>
          <p className="pc-vote-sub">Whatever wins applies to the entire room.</p>
          <div className="pc-vote-grid">
            {game.vote.options.map((opt) => {
              const count = Object.values(game.vote.votes).filter((v) => v === opt.id).length;
              const chosen = myVote === opt.id;
              return (
                <button
                  key={opt.id}
                  className={`pc-vote-option${chosen ? " chosen" : ""}`}
                  onClick={() => send({ type: "vote", optionId: opt.id })}
                >
                  <div className="pc-vote-head">
                    <strong>{opt.label}</strong>
                    <span className="pc-vote-count">{count} vote{count === 1 ? "" : "s"}</span>
                  </div>
                  <p>{opt.blurb}</p>
                </button>
              );
            })}
          </div>
        </section>
      ) : nextVoteSecondsLeft != null ? (
        <section className="pc-vote-pending">
          Next infrastructure vote in <strong>{nextVoteSecondsLeft}s</strong>.
        </section>
      ) : null}

      <section className="pc-factory">
        <div className="pc-factory-stats">
          <Stat label="Clips (ready)" value={fmt(me.clips)} />
          <Stat label="Wire" value={fmt(me.wire)} />
          <Stat label="Autoclippers" value={fmt(me.autoclippers)} />
          <Stat label="Money" value={dollars(me.money)} />
          <Stat label="Produced" value={fmt(me.produced)} />
          <Stat label="Sold" value={fmt(me.sold)} />
        </div>

        <div className="pc-controls">
          <button className="pc-make" onClick={() => send({ type: "click" })} disabled={me.wire < 1}>
            Make a clip
          </button>

          <div className="pc-buy-row">
            <button
              onClick={() => send({ type: "buyWire" })}
              disabled={me.money < wireCostUI(game)}
            >
              Buy 1000 wire · ${wireCostUI(game)}
            </button>
            <button
              onClick={() => send({ type: "buyClipper" })}
              disabled={me.money < me.nextClipperCost}
            >
              Buy autoclipper · ${me.nextClipperCost}
            </button>
          </div>

          <div className="pc-price">
            <label>
              Price: <strong>{cents(priceDraft ?? me.price)}</strong>
              <input
                type="range"
                min="1"
                max="200"
                step="1"
                value={priceDraft ?? me.price}
                onChange={(e) => setPriceDraft(Number(e.target.value))}
                onMouseUp={(e) => send({ type: "setPrice", price: Number(e.target.value) })}
                onTouchEnd={(e) => send({ type: "setPrice", price: Number(e.target.value) })}
              />
            </label>
            {game.mods.sharedMarket ? (
              <small>Shared logistics in effect — your price is ignored; everyone sells at the room median.</small>
            ) : null}
          </div>
        </div>
      </section>
    </>
  );
}

function wireCostUI(game) {
  // Mirror server: base 20 * wireCost mod, rounded.
  return Math.max(1, Math.round(20 * game.mods.wireCost));
}

function Stat({ label, value }) {
  return (
    <div className="pc-stat">
      <div className="pc-stat-value">{value}</div>
      <div className="pc-stat-label">{label}</div>
    </div>
  );
}

function Roster({ game, meId }) {
  const sorted = [...game.players].sort((a, b) => b.produced - a.produced);
  return (
    <section className="pc-roster">
      <h3>Factories</h3>
      <table>
        <thead>
          <tr><th>Player</th><th>Produced</th><th>Sold</th><th>Clippers</th><th>Price</th></tr>
        </thead>
        <tbody>
          {sorted.map((p) => (
            <tr key={p.id} className={p.id === meId ? "me" : ""}>
              <td>
                {p.name}
                {p.connected === false ? <span className="pc-offline"> (offline)</span> : null}
                {(p.personalSpeed || 1) !== 1 ? <span className="pc-perk"> +{Math.round((p.personalSpeed - 1) * 100)}%</span> : null}
              </td>
              <td>{fmt(p.produced)}</td>
              <td>{fmt(p.sold)}</td>
              <td>{fmt(p.autoclippers)}</td>
              <td>{cents(p.price)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

function Log({ game }) {
  return (
    <section className="pc-log">
      <h3>Log</h3>
      <ol>
        {game.log.slice().reverse().map((entry, i) => (
          <li key={i}>{entry.text}</li>
        ))}
      </ol>
    </section>
  );
}

function Ended({ game }) {
  const winner = [...game.players].sort((a, b) => b.produced - a.produced)[0];
  return (
    <section className="pc-ended">
      <h2>Factory horn</h2>
      {winner ? (
        <p><strong>{winner.name}</strong> produced the most clips: {fmt(winner.produced)}.</p>
      ) : null}
      <p className="pc-fine">Infrastructure history:</p>
      <ol className="pc-history">
        {game.voteHistory.map((v, i) => <li key={i}>{v.label}</li>)}
      </ol>
    </section>
  );
}
