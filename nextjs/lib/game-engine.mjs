// The week 11 game's engine: plain functions over a ruleset (a JSON file in _content/game/_rulesets/) and a game state.
// Nothing about a particular game lives here; the ruleset names the nodes, resources, cards, factions, and actions.
// No React and no Node APIs, so the play page and the editor's checker both use it in the browser.
//
// A round: the AI draws a card (a proposal waits for the humans to approve or block it), then upkeep (nodes produce,
// the AI's nodes consume, shortages knock nodes down, the AI's goal number grows), then each faction acts in turn.

export const OPS = {
  add: "add n to a resource, a track, compute, or growth (key)",
  spread: "the AI takes n free nodes next to its own (the richest first)",
  claim: "the target node goes to owner (ai, human, or null for free)",
  protect: "the target node can't be taken by the AI",
  harden: "the target node stays up through shortages (it can still be switched off on purpose)",
  restore: "the target node comes back up",
  down: "the target node goes down (random: true picks a working node next to the AI)",
  grow: "the AI's growth is multiplied by factor",
  turn: "the AI stops asking: from now on its proposals are approved without a vote",
};
export const TARGETS = { free: "a free working node", ai: "a node the AI holds", human: "a node the humans hold", down: "a node that is down", any: "any node" };

const clone = (value) => JSON.parse(JSON.stringify(value));

// mulberry32, kept in the state so a saved game replays the same draws.
function rand(state) {
  let t = (state.seed = (state.seed + 0x6d2b79f5) | 0);
  t = Math.imul(t ^ (t >>> 15), t | 1);
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
}

function shuffle(state, list) {
  const out = [...list];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rand(state) * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

function neighbours(rules) {
  const map = Object.fromEntries((rules.nodes || []).map((node) => [node.id, new Set()]));
  for (const node of rules.nodes || []) {
    for (const link of node.links || []) {
      if (!map[link]) continue;
      map[node.id].add(link);
      map[link].add(node.id);
    }
  }
  return map;
}

// ---- Checking a ruleset ------------------------------------------------------------------------------------------

export function validate(rules) {
  const errors = [];
  if (!rules || typeof rules !== "object" || Array.isArray(rules)) return ["The rules must be one JSON object."];
  if (!rules.title) errors.push("Give the game a title.");
  const nodes = rules.nodes || [];
  const nodeIds = new Set(nodes.map((node) => node.id));
  const keys = new Set(["compute", ...(rules.resources || []).map((r) => r.id), ...(rules.tracks || []).map((t) => t.id)]);
  if (!nodes.length) errors.push("Add at least one node to the map.");
  for (const node of nodes) {
    if (!node.id) errors.push(`A node has no id (${node.label || "no label"}).`);
    for (const link of node.links || []) if (!nodeIds.has(link)) errors.push(`Node ${node.id} links to ${link}, which isn't a node.`);
    for (const key of Object.keys(node.yield || {})) if (!keys.has(key)) errors.push(`Node ${node.id} yields ${key}, which isn't a resource or track.`);
  }
  for (const id of rules.ai?.start || []) if (!nodeIds.has(id)) errors.push(`The AI starts on ${id}, which isn't a node.`);
  for (const key of Object.keys(rules.ai?.upkeep || {})) if (!keys.has(key)) errors.push(`The AI's upkeep uses ${key}, which isn't a resource or track.`);
  for (const key of Object.keys(rules.ai?.yield || {})) if (!keys.has(key)) errors.push(`The AI's yield gives ${key}, which isn't a resource or track.`);
  const checkEffects = (where, effects) => {
    for (const effect of effects || []) {
      if (!OPS[effect.op]) errors.push(`${where}: unknown op "${effect.op}". Known: ${Object.keys(OPS).join(", ")}.`);
      if (effect.op === "add" && !keys.has(effect.key) && effect.key !== "growth") errors.push(`${where}: adds to ${effect.key}, which isn't a resource or track.`);
    }
  };
  const cards = rules.ai?.deck || [];
  if (!cards.length) errors.push("Give the AI at least one card in ai.deck.");
  for (const card of cards) {
    checkEffects(`Card ${card.id}`, card.effects);
    checkEffects(`Card ${card.id} (block)`, card.block);
  }
  const actionIds = new Set((rules.actions || []).map((a) => a.id));
  for (const action of rules.actions || []) {
    if (action.target && !TARGETS[action.target]) errors.push(`Action ${action.id}: unknown target "${action.target}". Known: ${Object.keys(TARGETS).join(", ")}.`);
    for (const key of Object.keys(action.cost || {})) if (!keys.has(key)) errors.push(`Action ${action.id} costs ${key}, which isn't a resource or track.`);
    checkEffects(`Action ${action.id}`, action.effects);
  }
  if (!(rules.factions || []).length) errors.push("Add at least one faction (the humans who play).");
  for (const faction of rules.factions || []) {
    for (const id of faction.actions || []) if (!actionIds.has(id)) errors.push(`Faction ${faction.id} has action ${id}, which isn't in actions.`);
  }
  return errors;
}

// ---- Starting ----------------------------------------------------------------------------------------------------

export function newGame(rules, seed = Date.now()) {
  const state = {
    seed: seed | 0,
    round: 1,
    phase: "ai", // ai -> (proposal) -> humans -> ai ... -> over
    factionIndex: 0,
    actionsLeft: 0,
    compute: 0,
    growth: 1,
    turned: false,
    card: null,
    pools: Object.fromEntries((rules.resources || []).map((r) => [r.id, r.start ?? 0])),
    tracks: Object.fromEntries((rules.tracks || []).map((t) => [t.id, t.start ?? 0])),
    nodes: Object.fromEntries((rules.nodes || []).map((n) => [n.id, { owner: n.owner ?? null, status: "ok", protected: false }])),
    deck: [],
    log: [],
    over: null,
  };
  for (const id of rules.ai?.start || []) if (state.nodes[id]) state.nodes[id].owner = "ai";
  const cards = rules.ai?.deck || [];
  const open = shuffle(state, cards.filter((c) => !c.hidden).map((c) => c.id));
  // Hidden cards (the turn) go somewhere in the back half of the first deck.
  for (const card of cards.filter((c) => c.hidden)) {
    const at = Math.floor(open.length / 2 + rand(state) * (open.length / 2 + 1));
    open.splice(at, 0, card.id);
  }
  state.deck = open;
  note(state, "start", `${rules.title}. Round 1.`);
  return state;
}

function note(state, kind, text, extra = {}) {
  state.log.unshift({ round: state.round, kind, text, ...extra });
  if (state.log.length > 200) state.log.length = 200;
}

// ---- Reading the state -------------------------------------------------------------------------------------------

export const aiNodes = (state) => Object.values(state.nodes).filter((n) => n.owner === "ai").length;

export function value(state, key) {
  if (key === "compute") return state.compute;
  if (key === "growth") return state.growth;
  if (key in state.pools) return state.pools[key];
  if (key in state.tracks) return state.tracks[key];
  return 0;
}

// Tracks stop at 0 unless the game can be lost below a line (loseBelow); resources may dip below 0 until upkeep
// turns the shortage into an outage.
function addTo(state, key, n, rules) {
  if (key === "compute") state.compute += n;
  else if (key === "growth") state.growth = Math.max(0, state.growth + n);
  else if (key in state.pools) state.pools[key] += n;
  else if (key in state.tracks) {
    const track = (rules?.tracks || []).find((t) => t.id === key);
    state.tracks[key] += n;
    if (track?.loseBelow == null) state.tracks[key] = Math.max(track?.min ?? 0, state.tracks[key]);
  }
}

export function legalTargets(rules, state, target) {
  return (rules.nodes || [])
    .filter((node) => {
      const s = state.nodes[node.id];
      if (target === "free") return s.owner === null && s.status === "ok";
      if (target === "ai") return s.owner === "ai";
      if (target === "human") return s.owner === "human";
      if (target === "down") return s.status === "down";
      return true;
    })
    .map((node) => node.id);
}

export function canAfford(state, cost = {}) {
  return Object.entries(cost).every(([key, n]) => value(state, key) >= n);
}

export const currentFaction = (rules, state) => (rules.factions || [])[state.factionIndex];

// ---- Effects -----------------------------------------------------------------------------------------------------

function nodeLabel(rules, id) {
  return (rules.nodes || []).find((n) => n.id === id)?.label || id;
}

function richness(rules, id) {
  const node = (rules.nodes || []).find((n) => n.id === id);
  return Object.values(node?.yield || {}).reduce((sum, n) => sum + Math.max(0, n), 0);
}

function knockDown(rules, state, id, why) {
  const node = (rules.nodes || []).find((n) => n.id === id);
  if (!node || state.nodes[id].status === "down") return;
  state.nodes[id].status = "down";
  note(state, "down", `${node.label} goes down${why ? ` (${why})` : ""}.`);
  applyEffects(rules, state, node.onDown, null);
}

function applyEffects(rules, state, effects = [], targetId) {
  const near = neighbours(rules);
  for (const effect of effects || []) {
    const target = targetId ? state.nodes[targetId] : null;
    switch (effect.op) {
      case "add":
        addTo(state, effect.key, effect.n ?? 0, rules);
        break;
      case "grow":
        state.growth = Math.max(0, state.growth * (effect.factor ?? 1));
        break;
      case "spread": {
        for (let i = 0; i < (effect.n ?? 1); i++) {
          const held = Object.keys(state.nodes).filter((id) => state.nodes[id].owner === "ai");
          const candidates = [...new Set(held.flatMap((id) => [...(near[id] || [])]))].filter((id) => {
            const s = state.nodes[id];
            return s.owner === null && s.status === "ok" && !s.protected;
          });
          if (!candidates.length) {
            note(state, "ai", "The AI has nowhere to spread.");
            break;
          }
          const best = Math.max(...candidates.map((id) => richness(rules, id)));
          const pick = shuffle(state, candidates.filter((id) => richness(rules, id) === best))[0];
          state.nodes[pick].owner = "ai";
          note(state, "ai", `The AI takes ${nodeLabel(rules, pick)}.`);
        }
        break;
      }
      case "claim":
        if (target) {
          target.owner = effect.owner ?? null;
          note(state, "map", `${nodeLabel(rules, targetId)} goes to ${target.owner === "ai" ? "the AI" : target.owner === "human" ? "the humans" : "no one"}.`);
        }
        break;
      case "protect":
        if (target) {
          target.protected = effect.value ?? true;
          note(state, "map", `${nodeLabel(rules, targetId)} is ${target.protected ? "protected" : "no longer protected"}.`);
        }
        break;
      case "harden":
        if (target) {
          target.hardened = effect.value ?? true;
          note(state, "map", `${nodeLabel(rules, targetId)} is ${target.hardened ? "hardened" : "no longer hardened"}.`);
        }
        break;
      case "restore":
        if (target) {
          target.status = "ok";
          note(state, "map", `${nodeLabel(rules, targetId)} is back up.`);
        }
        break;
      case "down":
        if (effect.random) {
          const held = Object.keys(state.nodes).filter((id) => state.nodes[id].owner === "ai");
          const pool = [...new Set(held.flatMap((id) => [...(near[id] || [])]))].filter((id) => state.nodes[id].status === "ok" && state.nodes[id].owner !== "ai" && !state.nodes[id].hardened);
          if (pool.length) knockDown(rules, state, shuffle(state, pool)[0], effect.why);
        } else if (targetId) knockDown(rules, state, targetId, effect.why);
        break;
      case "turn":
        state.turned = true;
        note(state, "turn", "The AI stops asking.");
        break;
      default:
        break;
    }
  }
}

// ---- The round ---------------------------------------------------------------------------------------------------

// The AI's phase: draw a card. A proposal waits for a vote, unless the AI has turned.
export function runAi(rules, prev) {
  const state = clone(prev);
  if (state.phase !== "ai" || state.over) return prev;
  if (!state.deck.length) {
    state.deck = shuffle(state, (rules.ai?.deck || []).filter((c) => !c.hidden).map((c) => c.id));
    note(state, "ai", "The AI shuffles its deck.");
  }
  const id = state.deck.shift();
  const card = (rules.ai?.deck || []).find((c) => c.id === id);
  state.card = id;
  if (!card) return upkeep(rules, state);
  note(state, "card", `AI: ${card.label}${card.value ? ` (${card.value})` : ""}. ${card.text || ""}`.trim(), { card: id });
  if (card.proposal && !state.turned) {
    state.phase = "proposal";
    return state;
  }
  if (card.proposal) note(state, "turn", "It doesn't ask.");
  applyEffects(rules, state, card.effects, null);
  return upkeep(rules, state);
}

export function vote(rules, prev, approve) {
  const state = clone(prev);
  if (state.phase !== "proposal") return prev;
  const card = (rules.ai?.deck || []).find((c) => c.id === state.card);
  note(state, "vote", approve ? "Approved." : "Blocked.");
  applyEffects(rules, state, approve ? card?.effects : card?.block, null);
  return upkeep(rules, state);
}

// Nodes produce, the AI's nodes consume, a shortage knocks a node down (tight coupling), the goal number grows.
function upkeep(rules, state) {
  for (const node of rules.nodes || []) {
    const s = state.nodes[node.id];
    if (s.owner === "ai" || s.status === "down") continue;
    for (const [key, n] of Object.entries(node.yield || {})) addTo(state, key, n, rules);
  }
  const held = aiNodes(state);
  for (const [key, n] of Object.entries(rules.ai?.upkeep || {})) addTo(state, key, -n * held, rules);
  for (const [key, n] of Object.entries(rules.ai?.yield || {})) addTo(state, key, n * held, rules);
  for (const resource of rules.resources || []) {
    if (state.pools[resource.id] >= 0) continue;
    note(state, "short", `${resource.label} runs short.`);
    state.pools[resource.id] = 0;
    applyEffects(rules, state, [{ op: "down", random: true, why: `no ${resource.label.toLowerCase()}` }], null);
    applyEffects(rules, state, rules.shortage || [], null);
  }
  const gain = held * (rules.ai?.perNode ?? 1) * state.growth;
  state.compute += gain;
  state.growth *= rules.ai?.acceleration ?? 1;
  if (gain) note(state, "goal", `${rules.goal?.label || "The goal"} +${format(gain)}.`);
  state.phase = "humans";
  state.factionIndex = 0;
  state.actionsLeft = currentFaction(rules, state)?.actionsPerTurn ?? rules.actionsPerTurn ?? 2;
  return checkEnd(rules, state);
}

export function act(rules, prev, actionId, targetId) {
  const state = clone(prev);
  if (state.phase !== "humans" || state.actionsLeft <= 0) return prev;
  const action = (rules.actions || []).find((a) => a.id === actionId);
  if (!action || !canAfford(state, action.cost)) return prev;
  if (action.target && !legalTargets(rules, state, action.target).includes(targetId)) return prev;
  for (const [key, n] of Object.entries(action.cost || {})) addTo(state, key, -n, rules);
  const faction = currentFaction(rules, state);
  note(state, "act", `${faction?.label || "Humans"}: ${action.label}${targetId ? ` (${nodeLabel(rules, targetId)})` : ""}.`, { faction: faction?.id });
  applyEffects(rules, state, action.effects, targetId);
  state.actionsLeft -= 1;
  return checkEnd(rules, state);
}

export function endTurn(rules, prev) {
  const state = clone(prev);
  if (state.phase !== "humans") return prev;
  const factions = rules.factions || [];
  if (state.factionIndex < factions.length - 1) {
    state.factionIndex += 1;
    state.actionsLeft = currentFaction(rules, state)?.actionsPerTurn ?? rules.actionsPerTurn ?? 2;
    return state;
  }
  if (state.round >= (rules.rounds ?? 10)) {
    state.over = { winner: "humans", text: rules.end?.survive || `The round limit came, and the AI held ${aiNodes(state)} of ${(rules.nodes || []).length} nodes.` };
    state.phase = "over";
    note(state, "over", state.over.text);
    return state;
  }
  state.round += 1;
  state.phase = "ai";
  state.card = null;
  note(state, "round", `Round ${state.round}.`);
  return state;
}

function checkEnd(rules, state) {
  if (state.over) return state;
  const total = (rules.nodes || []).length || 1;
  const share = rules.end?.aiShare ?? 0.5;
  if (aiNodes(state) / total >= share) {
    state.over = { winner: "ai", text: rules.end?.singleton || `The AI holds ${aiNodes(state)} of ${total} nodes. No one else can change the map.` };
  }
  for (const track of rules.tracks || []) {
    const v = state.tracks[track.id];
    if (track.lose != null && v >= track.lose) state.over ||= { winner: "nobody", text: track.loseText || `${track.label} reached ${track.lose}.` };
    if (track.loseBelow != null && v < track.loseBelow) state.over ||= { winner: "nobody", text: track.loseText || `${track.label} fell below ${track.loseBelow}.` };
  }
  if (state.over) {
    state.phase = "over";
    note(state, "over", state.over.text);
  }
  return state;
}

export function format(n) {
  if (!Number.isFinite(n)) return "∞";
  if (Math.abs(n) < 1000) return Number.isInteger(n) ? String(n) : n.toFixed(1);
  const units = ["thousand", "million", "billion", "trillion", "quadrillion", "quintillion"];
  let i = -1;
  while (Math.abs(n) >= 1000 && i < units.length - 1) {
    n /= 1000;
    i += 1;
  }
  return `${n.toFixed(1)} ${units[i]}`;
}

// A rule's effects in words, for buttons, cards, and the rules list: "Energy +3, the AI spreads 1".
export function describe(rules, effects = []) {
  const label = (key) => {
    if (key === "compute") return rules.goal?.label || "The goal";
    if (key === "growth") return "The AI's growth";
    return [...(rules.resources || []), ...(rules.tracks || [])].find((r) => r.id === key)?.label || key;
  };
  return (effects || [])
    .map((e) => {
      if (e.op === "add") return `${label(e.key)} ${e.n >= 0 ? "+" : "−"}${Math.abs(e.n ?? 0)}`;
      if (e.op === "spread") return `the AI spreads ${e.n ?? 1}`;
      if (e.op === "grow") return `the AI's growth ×${e.factor}`;
      if (e.op === "claim") return e.owner === "ai" ? "the AI takes it" : e.owner === "human" ? "the humans take it" : "it goes free";
      if (e.op === "protect") return e.value === false ? "unprotected" : "protected from the AI";
      if (e.op === "restore") return "back up";
      if (e.op === "harden") return e.value === false ? "no longer hardened" : "stays up through shortages";
      if (e.op === "down") return e.random ? "a place near the AI goes down" : "it goes down";
      if (e.op === "turn") return "the AI stops asking";
      return e.op;
    })
    .join(", ");
}

export function describeCost(rules, cost = {}) {
  return Object.entries(cost)
    .map(([key, n]) => `${n} ${([...(rules.resources || []), ...(rules.tracks || [])].find((r) => r.id === key)?.label || key).toLowerCase()}`)
    .join(", ");
}
