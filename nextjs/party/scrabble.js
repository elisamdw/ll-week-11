// PartyKit server: authoritative Scrabble room.
// One Room = one game session. Clients connect over WebSocket.
//
// Message shape (both directions): { type: string, ...payload }
//
// Client -> Server:
//   { type: "hello", playerId }                         (re-join with a persistent id)
//   { type: "setName", name }
//   { type: "ready" }                                   (ready to start; starts when >= 2 ready)
//   { type: "submit", placements: [{ row, col, tile }] }
//   { type: "pass" }
//   { type: "exchange", tileIndices: [i, ...] }
//   { type: "shuffleRack" }
//
// Server -> Client:
//   { type: "state", game, you }                        (full snapshot; "you" has private rack)
//   { type: "error", message }
//   { type: "event", kind, ... }                        (play log entries)

import { nanoid } from "nanoid";
import { BOARD_SIZE, RACK_SIZE, MAX_PLAYERS, buildBag, makeRng, shuffleInPlace } from "../lib/scrabble/constants.mjs";
import { emptyBoard, evaluateMove, applyMove } from "../lib/scrabble/engine.mjs";

const DICT_URL = "https://raw.githubusercontent.com/dolph/dictionary/master/enable1.txt";
let DICT = null;
let DICT_PROMISE = null;

async function loadDict() {
  if (DICT) return DICT;
  if (!DICT_PROMISE) {
    DICT_PROMISE = fetch(DICT_URL)
      .then((r) => r.text())
      .then((text) => {
        const set = new Set();
        for (const line of text.split("\n")) {
          const w = line.trim().toUpperCase();
          if (w) set.add(w);
        }
        DICT = set;
        return set;
      });
  }
  return DICT_PROMISE;
}

function freshGame(seed) {
  const bag = shuffleInPlace(buildBag(), makeRng(seed));
  return {
    seed,
    phase: "lobby",              // "lobby" | "playing" | "finished"
    board: emptyBoard(),
    bag,
    players: [],                 // [{ id, name, seat, rack, score, ready, connected, consecutivePasses }]
    turnSeat: 0,
    log: [],                     // [{ kind, by, text, at }]
    startedAt: null,
    endedAt: null,
  };
}

function publicGame(game) {
  return {
    phase: game.phase,
    board: game.board,
    bagCount: game.bag.length,
    players: game.players.map((p) => ({
      id: p.id,
      name: p.name,
      seat: p.seat,
      score: p.score,
      ready: p.ready,
      connected: p.connected,
      rackCount: p.rack.length,
    })),
    turnSeat: game.turnSeat,
    log: game.log.slice(-25),
    startedAt: game.startedAt,
    endedAt: game.endedAt,
  };
}

function findPlayer(game, id) {
  return game.players.find((p) => p.id === id) || null;
}

function drawTo(game, player, n) {
  while (player.rack.length < n && game.bag.length > 0) {
    player.rack.push(game.bag.pop());
  }
}

function nextSeat(game) {
  const active = game.players.filter((p) => p.connected !== false);
  if (active.length === 0) return game.turnSeat;
  let s = game.turnSeat;
  for (let i = 0; i < game.players.length; i += 1) {
    s = (s + 1) % game.players.length;
    const p = game.players.find((pl) => pl.seat === s);
    if (p && p.connected !== false) return s;
  }
  return game.turnSeat;
}

function logEvent(game, entry) {
  game.log.push({ ...entry, at: Date.now() });
}

export default class ScrabbleServer {
  constructor(room) {
    this.room = room;
    this.game = null;
    this.connToPlayer = new Map();
  }

  async onStart() {
    const stored = await this.room.storage.get("game");
    if (stored) {
      this.game = stored;
    } else {
      const seed = Math.floor(Math.random() * 2 ** 31);
      this.game = freshGame(seed);
      await this.persist();
    }
    // Warm the dictionary so the first move doesn't wait on a cold fetch.
    loadDict().catch(() => {});
  }

  async persist() {
    await this.room.storage.put("game", this.game);
  }

  broadcastState(exceptConn = null) {
    const pub = publicGame(this.game);
    for (const conn of this.room.getConnections()) {
      const playerId = this.connToPlayer.get(conn.id);
      const me = playerId ? findPlayer(this.game, playerId) : null;
      const you = me ? { id: me.id, name: me.name, seat: me.seat, score: me.score, rack: me.rack, ready: me.ready } : null;
      conn.send(JSON.stringify({ type: "state", game: pub, you }));
    }
  }

  sendError(conn, message) {
    conn.send(JSON.stringify({ type: "error", message }));
  }

  async onConnect(conn /* , ctx */) {
    // The player sends "hello" with a stable client id (stored in localStorage).
    // Until then, this connection is anonymous.
    conn.send(JSON.stringify({ type: "state", game: publicGame(this.game), you: null }));
  }

  async onClose(conn) {
    const playerId = this.connToPlayer.get(conn.id);
    if (!playerId) return;
    this.connToPlayer.delete(conn.id);
    const player = findPlayer(this.game, playerId);
    if (player) {
      const stillConnected = [...this.room.getConnections()].some(
        (c) => this.connToPlayer.get(c.id) === playerId,
      );
      if (!stillConnected) {
        player.connected = false;
        await this.persist();
        this.broadcastState();
      }
    }
  }

  async onMessage(message, conn) {
    let msg;
    try {
      msg = JSON.parse(message);
    } catch {
      return this.sendError(conn, "Bad message.");
    }

    try {
      switch (msg.type) {
        case "hello": return await this.handleHello(conn, msg);
        case "setName": return await this.handleSetName(conn, msg);
        case "ready": return await this.handleReady(conn);
        case "startNow": return await this.handleStartNow(conn);
        case "submit": return await this.handleSubmit(conn, msg);
        case "pass": return await this.handlePass(conn);
        case "exchange": return await this.handleExchange(conn, msg);
        case "shuffleRack": return await this.handleShuffleRack(conn);
        default: return this.sendError(conn, `Unknown message: ${msg.type}`);
      }
    } catch (err) {
      this.sendError(conn, err?.message || "Server error.");
    }
  }

  async handleHello(conn, msg) {
    const clientId = (msg.playerId || "").toString().slice(0, 64) || nanoid();
    let player = findPlayer(this.game, clientId);

    if (!player) {
      if (this.game.phase !== "lobby") {
        return this.sendError(conn, "Game already started.");
      }
      if (this.game.players.length >= MAX_PLAYERS) {
        return this.sendError(conn, "Room is full.");
      }
      const seat = this.game.players.length;
      player = {
        id: clientId,
        name: `Player ${seat + 1}`,
        seat,
        rack: [],
        score: 0,
        ready: false,
        connected: true,
        consecutivePasses: 0,
      };
      this.game.players.push(player);
    } else {
      player.connected = true;
    }

    this.connToPlayer.set(conn.id, clientId);
    conn.send(JSON.stringify({ type: "welcome", playerId: clientId, seat: player.seat }));
    await this.persist();
    this.broadcastState();
  }

  async handleSetName(conn, msg) {
    const playerId = this.connToPlayer.get(conn.id);
    const player = findPlayer(this.game, playerId);
    if (!player) return;
    const name = (msg.name || "").toString().trim().slice(0, 24);
    if (!name) return;
    player.name = name;
    await this.persist();
    this.broadcastState();
  }

  async handleReady(conn) {
    const playerId = this.connToPlayer.get(conn.id);
    const player = findPlayer(this.game, playerId);
    if (!player) return;
    if (this.game.phase !== "lobby") return;
    player.ready = true;

    const readyCount = this.game.players.filter((p) => p.ready).length;
    if (readyCount >= 1 && readyCount === this.game.players.length) {
      this.startGame();
    }
    await this.persist();
    this.broadcastState();
  }

  async handleStartNow(conn) {
    const playerId = this.connToPlayer.get(conn.id);
    const player = findPlayer(this.game, playerId);
    if (!player) return;
    if (this.game.phase !== "lobby") return;
    if (this.game.players.length < 1) return;
    this.startGame();
    await this.persist();
    this.broadcastState();
  }

  startGame() {
    for (const p of this.game.players) {
      drawTo(this.game, p, RACK_SIZE);
    }
    this.game.phase = "playing";
    this.game.startedAt = Date.now();
    this.game.turnSeat = 0;
    logEvent(this.game, { kind: "start", text: "Game started." });
  }

  async handleSubmit(conn, msg) {
    const playerId = this.connToPlayer.get(conn.id);
    const player = findPlayer(this.game, playerId);
    if (!player) return this.sendError(conn, "Not seated.");
    if (this.game.phase !== "playing") return this.sendError(conn, "Game not in play.");
    if (player.seat !== this.game.turnSeat) return this.sendError(conn, "Not your turn.");

    const placements = Array.isArray(msg.placements) ? msg.placements : [];
    if (placements.length === 0) return this.sendError(conn, "Place at least one tile.");

    // Verify every placed tile comes from the player's rack. We match by
    // consuming rack indices, respecting blanks (letter re-assigned by player).
    const rackCopy = player.rack.map((t, i) => ({ t, i }));
    const consumed = [];
    for (const p of placements) {
      const targetLetter = (p.tile?.letter || "").toUpperCase();
      const isBlank = Boolean(p.tile?.blank);
      let hitIdx = -1;
      for (let j = 0; j < rackCopy.length; j += 1) {
        const r = rackCopy[j];
        if (isBlank && r.t.blank) { hitIdx = j; break; }
        if (!isBlank && !r.t.blank && r.t.letter === targetLetter) { hitIdx = j; break; }
      }
      if (hitIdx === -1) return this.sendError(conn, `Missing ${isBlank ? "blank" : targetLetter} in rack.`);
      const r = rackCopy.splice(hitIdx, 1)[0];
      const rackTile = r.t;
      consumed.push({
        rackIndex: r.i,
        placement: {
          row: p.row,
          col: p.col,
          tile: {
            letter: isBlank ? targetLetter : rackTile.letter,
            score: rackTile.score,
            blank: rackTile.blank,
          },
        },
      });
    }

    const isFirstMove = this.game.board.every((row) => row.every((c) => c === null));
    const dict = await loadDict();
    const result = evaluateMove(this.game.board, consumed.map((c) => c.placement), (w) => dict.has(w), { isFirstMove });
    if (!result.ok) return this.sendError(conn, result.reason);

    this.game.board = applyMove(this.game.board, consumed.map((c) => c.placement));
    const keepIdx = new Set(consumed.map((c) => c.rackIndex));
    player.rack = player.rack.filter((_, i) => !keepIdx.has(i));
    drawTo(this.game, player, RACK_SIZE);
    player.score += result.score;
    player.consecutivePasses = 0;

    const wordsText = result.words.map((w) => w.word).join(", ");
    logEvent(this.game, {
      kind: "play",
      by: player.id,
      text: `${player.name} played ${wordsText} for ${result.score}${result.bingo ? " (bingo!)" : ""}.`,
    });

    // End conditions: rack empty + bag empty, or four straight passes by everyone.
    if (player.rack.length === 0 && this.game.bag.length === 0) {
      this.endGame(player.id);
    } else {
      this.game.turnSeat = nextSeat(this.game);
    }

    await this.persist();
    this.broadcastState();
  }

  async handlePass(conn) {
    const playerId = this.connToPlayer.get(conn.id);
    const player = findPlayer(this.game, playerId);
    if (!player) return;
    if (this.game.phase !== "playing") return;
    if (player.seat !== this.game.turnSeat) return;

    player.consecutivePasses = (player.consecutivePasses || 0) + 1;
    logEvent(this.game, { kind: "pass", by: player.id, text: `${player.name} passed.` });

    const everyonePassedTwice = this.game.players.length >= 2
      && this.game.players.every((p) => (p.consecutivePasses || 0) >= 2);

    if (everyonePassedTwice) {
      this.endGame(null);
    } else {
      this.game.turnSeat = nextSeat(this.game);
    }
    await this.persist();
    this.broadcastState();
  }

  async handleExchange(conn, msg) {
    const playerId = this.connToPlayer.get(conn.id);
    const player = findPlayer(this.game, playerId);
    if (!player) return;
    if (this.game.phase !== "playing") return;
    if (player.seat !== this.game.turnSeat) return;
    if (this.game.bag.length < 7) return this.sendError(conn, "Need at least 7 tiles in the bag to exchange.");

    const idxs = (msg.tileIndices || []).filter((i) => Number.isInteger(i) && i >= 0 && i < player.rack.length);
    if (idxs.length === 0) return this.sendError(conn, "Pick tiles to exchange.");

    const idxSet = new Set(idxs);
    const returned = [];
    const kept = [];
    player.rack.forEach((t, i) => {
      if (idxSet.has(i)) returned.push({ letter: t.blank ? "" : t.letter, score: t.score, blank: t.blank });
      else kept.push(t);
    });
    player.rack = kept;
    drawTo(this.game, player, RACK_SIZE);
    for (const t of returned) this.game.bag.push(t);
    shuffleInPlace(this.game.bag, makeRng((this.game.seed + this.game.log.length + 1) >>> 0));
    player.consecutivePasses = 0;

    logEvent(this.game, { kind: "exchange", by: player.id, text: `${player.name} exchanged ${returned.length} tile${returned.length === 1 ? "" : "s"}.` });
    this.game.turnSeat = nextSeat(this.game);
    await this.persist();
    this.broadcastState();
  }

  async handleShuffleRack(conn) {
    const playerId = this.connToPlayer.get(conn.id);
    const player = findPlayer(this.game, playerId);
    if (!player) return;
    shuffleInPlace(player.rack, makeRng((Date.now() ^ player.seat) >>> 0));
    await this.persist();
    this.broadcastState();
  }

  endGame(winnerId) {
    // Subtract unused-rack value from each player; add it to the finisher.
    let bonus = 0;
    for (const p of this.game.players) {
      const rackValue = p.rack.reduce((sum, t) => sum + (t.blank ? 0 : t.score), 0);
      p.score -= rackValue;
      bonus += rackValue;
    }
    if (winnerId) {
      const w = findPlayer(this.game, winnerId);
      if (w) w.score += bonus;
    }
    this.game.phase = "finished";
    this.game.endedAt = Date.now();
    logEvent(this.game, { kind: "end", text: "Game over." });
  }
}
