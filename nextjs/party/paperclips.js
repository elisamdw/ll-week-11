// PartyKit server: multiplayer Paperclips.
// Each room is one game. Players run their own factory; every ~90s the room
// votes on an "infrastructure" proposal that reshapes everyone's game.
//
// Client -> Server:
//   { type: "hello", playerId }
//   { type: "setName", name }
//   { type: "start" }                          (start from lobby)
//   { type: "click" }                          (make 1 clip by hand)
//   { type: "buyWire" }
//   { type: "buyClipper" }
//   { type: "setPrice", price }                (dollars per clip)
//   { type: "vote", optionId }
//
// Server -> Client:
//   { type: "state", game, you }
//   { type: "welcome", playerId }
//   { type: "error", message }

import { nanoid } from "nanoid";

const TICK_MS = 1000;
const VOTE_INTERVAL_MS = 90_000;
const VOTE_DURATION_MS = 20_000;
const MAX_PLAYERS = 8;

const START = {
  money: 0,
  clips: 0,
  wire: 1000,
  autoclippers: 0,
  price: 25,              // cents per clip
  produced: 0,
  sold: 0,
};

// Base economic constants (modified by infrastructure votes).
const BASE = {
  wirePrice: 20,          // dollars for WIRE_PACK units
  wirePack: 1000,
  clipperPrice: 5,        // dollars; doubles per purchase
  clipperGrowth: 1.10,    // price multiplier per purchase
  clipperSpeed: 1,        // clips/sec per clipper (base)
  baseDemand: 8,          // clips/sec at price=25
  demandSensitivity: 1.6, // how steeply demand drops with price
};

// Infrastructure proposals. Each may fire at most once per game.
// Effects are applied by mutating `game.mods` when a vote passes.
const PROPOSALS = [
  {
    id: "wire_standard",
    label: "Wire Standardization",
    blurb: "Everyone's wire is 25% cheaper. Favors manual producers who buy wire often.",
    apply: (game) => { game.mods.wireCost *= 0.75; },
  },
  {
    id: "precision_looms",
    label: "Precision Looms",
    blurb: "Autoclippers run +50% faster. Favors players who already bought clippers.",
    apply: (game) => { game.mods.clipperSpeed *= 1.5; },
  },
  {
    id: "trust_network",
    label: "Public Trust Network",
    blurb: "Market demand doubles. Everyone sells faster — bigger inventories benefit most.",
    apply: (game) => { game.mods.demand *= 2.0; },
  },
  {
    id: "shared_logistics",
    label: "Shared Logistics",
    blurb: "All sales clear at the room's median price. Protects undercutters, caps premium sellers.",
    apply: (game) => { game.mods.sharedMarket = true; },
  },
  {
    id: "open_source",
    label: "Open-Source Clippers",
    blurb: "The player with the fewest autoclippers gets +8 free. Redistributive.",
    apply: (game) => {
      if (game.players.length === 0) return;
      const sorted = [...game.players].sort((a, b) => a.autoclippers - b.autoclippers);
      sorted[0].autoclippers += 8;
    },
  },
  {
    id: "patent_regime",
    label: "Patent Regime",
    blurb: "The leader (most clips produced) gets a private +30% speed bonus. Others get nothing.",
    apply: (game) => {
      if (game.players.length === 0) return;
      const leader = [...game.players].sort((a, b) => b.produced - a.produced)[0];
      leader.personalSpeed = (leader.personalSpeed || 1) * 1.3;
    },
  },
  {
    id: "wire_cartel",
    label: "Wire Cartel",
    blurb: "Wire gets 40% more expensive but demand climbs 50% (scarcity marketing).",
    apply: (game) => { game.mods.wireCost *= 1.4; game.mods.demand *= 1.5; },
  },
];

function freshGame() {
  return {
    phase: "lobby",        // lobby | playing | ended
    startedAt: null,
    endedAt: null,
    tickCount: 0,
    nextVoteAt: null,
    vote: null,
    voteHistory: [],
    availableProposals: PROPOSALS.map((p) => p.id),
    players: [],
    mods: {
      wireCost: 1,
      clipperSpeed: 1,
      demand: 1,
      sharedMarket: false,
    },
    log: [],
  };
}

function publicGame(game) {
  return {
    phase: game.phase,
    startedAt: game.startedAt,
    endedAt: game.endedAt,
    nextVoteAt: game.nextVoteAt,
    vote: game.vote,
    voteHistory: game.voteHistory.slice(-20),
    mods: game.mods,
    players: game.players.map((p) => ({
      id: p.id,
      name: p.name,
      connected: p.connected,
      clips: p.clips,
      wire: p.wire,
      money: p.money,
      autoclippers: p.autoclippers,
      price: p.price,
      produced: p.produced,
      sold: p.sold,
      personalSpeed: p.personalSpeed || 1,
      nextClipperCost: clipperCost(p),
    })),
    log: game.log.slice(-25),
  };
}

function findPlayer(game, id) {
  return game.players.find((p) => p.id === id) || null;
}

function clipperCost(p) {
  return Math.ceil(BASE.clipperPrice * Math.pow(BASE.clipperGrowth, p.autoclippers));
}

function wireCost(game) {
  return Math.max(1, Math.round(BASE.wirePrice * game.mods.wireCost));
}

function medianPrice(game) {
  const live = game.players.filter((p) => p.connected !== false).map((p) => p.price);
  if (live.length === 0) return 25;
  const sorted = [...live].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[mid] : Math.round((sorted[mid - 1] + sorted[mid]) / 2);
}

function demandAtPrice(game, price) {
  // Hyperbolic demand: higher price -> fewer sales.
  const ratio = 25 / Math.max(1, price);
  const d = BASE.baseDemand * Math.pow(ratio, BASE.demandSensitivity) * game.mods.demand;
  return Math.max(0, d);
}

function logEvent(game, text) {
  game.log.push({ text, at: Date.now() });
}

export default class PaperclipsServer {
  constructor(room) {
    this.room = room;
    this.game = null;
    this.connToPlayer = new Map();
    this.tickHandle = null;
  }

  async onStart() {
    const stored = await this.room.storage.get("game");
    this.game = stored || freshGame();
    if (this.game.phase === "playing") {
      this.scheduleTicks();
    }
  }

  async persist() {
    await this.room.storage.put("game", this.game);
  }

  scheduleTicks() {
    if (this.tickHandle) return;
    this.tickHandle = setInterval(() => this.tick().catch(() => {}), TICK_MS);
  }

  stopTicks() {
    if (this.tickHandle) {
      clearInterval(this.tickHandle);
      this.tickHandle = null;
    }
  }

  broadcastState() {
    const pub = publicGame(this.game);
    for (const conn of this.room.getConnections()) {
      const playerId = this.connToPlayer.get(conn.id);
      const me = playerId ? findPlayer(this.game, playerId) : null;
      const you = me
        ? { id: me.id, name: me.name, hasVoted: this.game.vote ? Boolean(this.game.vote.votes[me.id]) : false }
        : null;
      conn.send(JSON.stringify({ type: "state", game: pub, you }));
    }
  }

  sendError(conn, message) {
    conn.send(JSON.stringify({ type: "error", message }));
  }

  async onConnect(conn) {
    conn.send(JSON.stringify({ type: "state", game: publicGame(this.game), you: null }));
  }

  async onClose(conn) {
    const playerId = this.connToPlayer.get(conn.id);
    if (!playerId) return;
    this.connToPlayer.delete(conn.id);
    const p = findPlayer(this.game, playerId);
    if (p) {
      const stillConnected = [...this.room.getConnections()].some(
        (c) => this.connToPlayer.get(c.id) === playerId,
      );
      if (!stillConnected) {
        p.connected = false;
        await this.persist();
        this.broadcastState();
      }
    }
  }

  async onMessage(message, conn) {
    let msg;
    try { msg = JSON.parse(message); } catch { return this.sendError(conn, "Bad message."); }
    try {
      switch (msg.type) {
        case "hello": return await this.handleHello(conn, msg);
        case "setName": return await this.handleSetName(conn, msg);
        case "start": return await this.handleStart(conn);
        case "click": return await this.handleClick(conn);
        case "buyWire": return await this.handleBuyWire(conn);
        case "buyClipper": return await this.handleBuyClipper(conn);
        case "setPrice": return await this.handleSetPrice(conn, msg);
        case "vote": return await this.handleVote(conn, msg);
        default: return this.sendError(conn, `Unknown: ${msg.type}`);
      }
    } catch (err) {
      this.sendError(conn, err?.message || "Server error.");
    }
  }

  async handleHello(conn, msg) {
    const clientId = (msg.playerId || "").toString().slice(0, 64) || nanoid();
    let p = findPlayer(this.game, clientId);
    if (!p) {
      if (this.game.phase !== "lobby") return this.sendError(conn, "Game already started.");
      if (this.game.players.length >= MAX_PLAYERS) return this.sendError(conn, "Room full.");
      p = {
        id: clientId,
        name: `Player ${this.game.players.length + 1}`,
        connected: true,
        ...START,
        personalSpeed: 1,
      };
      this.game.players.push(p);
    } else {
      p.connected = true;
    }
    this.connToPlayer.set(conn.id, clientId);
    conn.send(JSON.stringify({ type: "welcome", playerId: clientId }));
    await this.persist();
    this.broadcastState();
  }

  async handleSetName(conn, msg) {
    const p = findPlayer(this.game, this.connToPlayer.get(conn.id));
    if (!p) return;
    const name = (msg.name || "").toString().trim().slice(0, 24);
    if (!name) return;
    p.name = name;
    await this.persist();
    this.broadcastState();
  }

  async handleStart(conn) {
    if (this.game.phase !== "lobby") return;
    if (this.game.players.length < 1) return;
    this.game.phase = "playing";
    this.game.startedAt = Date.now();
    this.game.nextVoteAt = Date.now() + VOTE_INTERVAL_MS;
    logEvent(this.game, "Factory floor opened.");
    this.scheduleTicks();
    await this.persist();
    this.broadcastState();
  }

  async handleClick(conn) {
    const p = findPlayer(this.game, this.connToPlayer.get(conn.id));
    if (!p || this.game.phase !== "playing") return;
    if (p.wire < 1) return this.sendError(conn, "Out of wire.");
    p.wire -= 1;
    p.clips += 1;
    p.produced += 1;
    this.broadcastState();
  }

  async handleBuyWire(conn) {
    const p = findPlayer(this.game, this.connToPlayer.get(conn.id));
    if (!p || this.game.phase !== "playing") return;
    const cost = wireCost(this.game);
    if (p.money < cost) return this.sendError(conn, `Need $${cost}.`);
    p.money -= cost;
    p.wire += BASE.wirePack;
    this.broadcastState();
  }

  async handleBuyClipper(conn) {
    const p = findPlayer(this.game, this.connToPlayer.get(conn.id));
    if (!p || this.game.phase !== "playing") return;
    const cost = clipperCost(p);
    if (p.money < cost) return this.sendError(conn, `Need $${cost}.`);
    p.money -= cost;
    p.autoclippers += 1;
    this.broadcastState();
  }

  async handleSetPrice(conn, msg) {
    const p = findPlayer(this.game, this.connToPlayer.get(conn.id));
    if (!p || this.game.phase !== "playing") return;
    const raw = Number(msg.price);
    if (!Number.isFinite(raw)) return;
    p.price = Math.min(500, Math.max(1, Math.round(raw)));
    this.broadcastState();
  }

  async handleVote(conn, msg) {
    const p = findPlayer(this.game, this.connToPlayer.get(conn.id));
    if (!p || !this.game.vote) return;
    const option = this.game.vote.options.find((o) => o.id === msg.optionId);
    if (!option) return;
    this.game.vote.votes[p.id] = option.id;
    await this.persist();
    this.broadcastState();
  }

  // --- tick loop ---

  async tick() {
    if (this.game.phase !== "playing") { this.stopTicks(); return; }
    this.game.tickCount += 1;
    const now = Date.now();

    // Open a vote if due.
    if (!this.game.vote && this.game.nextVoteAt && now >= this.game.nextVoteAt) {
      this.openVote(now);
    }

    // Close a vote if over.
    if (this.game.vote && now >= this.game.vote.endsAt) {
      this.resolveVote();
    }

    // Economy: produce + sell.
    const useMedian = this.game.mods.sharedMarket;
    const median = useMedian ? medianPrice(this.game) : null;

    for (const p of this.game.players) {
      // Production from autoclippers.
      const speed = BASE.clipperSpeed * this.game.mods.clipperSpeed * (p.personalSpeed || 1);
      const want = Math.floor(p.autoclippers * speed);
      const can = Math.min(want, p.wire);
      if (can > 0) {
        p.wire -= can;
        p.clips += can;
        p.produced += can;
      }

      // Sales: demand at this player's price, capped by inventory.
      const soldPrice = useMedian ? median : p.price;
      const dem = demandAtPrice(this.game, soldPrice);
      const sold = Math.min(p.clips, Math.floor(dem));
      if (sold > 0) {
        p.clips -= sold;
        p.sold += sold;
        p.money += Math.round(sold * soldPrice) / 100; // price is cents; money is dollars
      }
    }

    // End game when the proposal deck is exhausted and no active vote.
    if (this.game.availableProposals.length === 0 && !this.game.vote) {
      // Give players a brief wind-down after the last vote's effects.
      const sinceLastResolve = this.game.voteHistory.length
        ? now - this.game.voteHistory[this.game.voteHistory.length - 1].resolvedAt
        : 0;
      if (sinceLastResolve > 60_000) {
        this.game.phase = "ended";
        this.game.endedAt = now;
        logEvent(this.game, "Factory horn. Game over.");
        this.stopTicks();
      }
    }

    await this.persist();
    this.broadcastState();
  }

  openVote(now) {
    const pool = this.game.availableProposals;
    if (pool.length === 0) return;
    // Pick up to 3 proposals.
    const picks = [];
    const remaining = [...pool];
    while (picks.length < Math.min(3, remaining.length)) {
      const idx = Math.floor(((this.game.tickCount * 9301 + 49297) % 233280) / 233280 * remaining.length) % remaining.length;
      // Deterministic-ish without Math.random seed; good enough for a party game.
      const taken = remaining.splice(idx, 1)[0];
      picks.push(taken);
    }
    this.game.vote = {
      options: picks.map((id) => {
        const def = PROPOSALS.find((p) => p.id === id);
        return { id: def.id, label: def.label, blurb: def.blurb };
      }),
      endsAt: now + VOTE_DURATION_MS,
      votes: {},
    };
    logEvent(this.game, `Infrastructure vote opened (${picks.length} options).`);
  }

  resolveVote() {
    const v = this.game.vote;
    if (!v) return;
    const tally = {};
    for (const optId of Object.values(v.votes)) {
      tally[optId] = (tally[optId] || 0) + 1;
    }
    // Pick the option with the most votes; tie-break by first in options list.
    let winner = null;
    let best = -1;
    for (const opt of v.options) {
      const c = tally[opt.id] || 0;
      if (c > best) { best = c; winner = opt; }
    }
    // If nobody voted, pick the first option.
    if (!winner) winner = v.options[0];
    const def = PROPOSALS.find((p) => p.id === winner.id);
    def.apply(this.game);
    this.game.availableProposals = this.game.availableProposals.filter((id) => id !== winner.id);
    this.game.voteHistory.push({
      optionId: winner.id,
      label: winner.label,
      votes: tally,
      resolvedAt: Date.now(),
    });
    logEvent(this.game, `Infrastructure adopted: ${winner.label}.`);
    this.game.vote = null;
    this.game.nextVoteAt = this.game.availableProposals.length > 0
      ? Date.now() + VOTE_INTERVAL_MS
      : null;
  }
}
