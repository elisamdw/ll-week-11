"use client";

import { useEffect, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { useScrabble } from "../useScrabble.js";
import { BOARD_SIZE, BONUS_GRID, LETTER_SCORES } from "../../../lib/scrabble/constants.mjs";

function bonusLabel(b) {
  switch (b) {
    case "TW": return "triple word";
    case "DW": return "double word";
    case "TL": return "triple letter";
    case "DL": return "double letter";
    default: return "";
  }
}

export default function BoardClient({ roomId }) {
  const { game, connected } = useScrabble(roomId);
  const [playerUrl, setPlayerUrl] = useState("");

  useEffect(() => {
    if (typeof window === "undefined") return;
    setPlayerUrl(`${window.location.origin}/scrabble/${roomId}/play`);
  }, [roomId]);

  if (!game) {
    return (
      <main className="scrabble-board-shell">
        <p className="scrabble-fine">Connecting to room {roomId}</p>
      </main>
    );
  }

  const turnPlayer = game.players.find((p) => p.seat === game.turnSeat);

  return (
    <main className="scrabble-board-shell">
      <section className="scrabble-board-wrap">
        <div className="scrabble-board">
          {Array.from({ length: BOARD_SIZE }).map((_, r) =>
            Array.from({ length: BOARD_SIZE }).map((_, c) => {
              const bonus = BONUS_GRID[r][c];
              const tile = game.board[r][c];
              const isCenter = r === 7 && c === 7;
              return (
                <div
                  key={`${r}-${c}`}
                  className={`cell bonus-${bonus || "none"}${tile ? " has-tile" : ""}${isCenter && !tile ? " center" : ""}`}
                  aria-label={tile ? `${tile.letter}` : (bonus ? bonusLabel(bonus) : "empty")}
                >
                  {tile ? (
                    <>
                      <span className="letter">{tile.letter}</span>
                      {!tile.blank && (
                        <span className="score">{LETTER_SCORES[tile.letter] ?? 0}</span>
                      )}
                    </>
                  ) : (
                    isCenter ? <span className="center-mark">★</span> :
                    bonus ? <span className="bonus-label">{bonus}</span> : null
                  )}
                </div>
              );
            })
          )}
        </div>
      </section>

      <aside className="scrabble-side">
        <header className="scrabble-side-head">
          <h1>Room {roomId}</h1>
          <p className="status">
            {connected ? (game.phase === "lobby" ? "Waiting for players" : game.phase === "playing" ? `${turnPlayer?.name || "..."} to play` : "Game over") : "Reconnecting..."}
          </p>
        </header>

        {playerUrl ? (
          <div className="scrabble-qr">
            <QRCodeSVG value={playerUrl} size={180} bgColor="#ffffff" fgColor="#000000" level="M" />
            <p className="scrabble-qr-url">{playerUrl.replace(/^https?:\/\//, "")}</p>
          </div>
        ) : null}

        <section className="scrabble-players">
          {game.players.length === 0 ? (
            <p className="scrabble-fine">No players yet. Scan to join.</p>
          ) : (
            game.players.map((p) => (
              <div key={p.id} className={`scrabble-player${p.seat === game.turnSeat && game.phase === "playing" ? " turn" : ""}${!p.connected ? " away" : ""}`}>
                <span className="name">{p.name}{!p.connected ? " (away)" : ""}</span>
                <span className="score">{p.score}</span>
              </div>
            ))
          )}
          <p className="scrabble-fine">Tiles left in bag: {game.bagCount}</p>
        </section>

        <section className="scrabble-log">
          {game.log.slice().reverse().slice(0, 8).map((e, i) => (
            <p key={i}>{e.text}</p>
          ))}
        </section>
      </aside>
    </main>
  );
}
