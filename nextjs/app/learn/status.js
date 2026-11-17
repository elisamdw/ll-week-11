// The rules of /learn, in one place: what a proposition's status is, which ones are open on the map, where each sits,
// and which questions a practice round draws. Plain functions over the graph (format: _content/learning/format.md).

// ---- Tuning ----
export const HELD_CONFIDENCE = 3; // a correct answer counts as held at this confidence or above (1 guess … 4 obviously true)
export const CORRECT_WITHOUT_CONFIDENCE = "held"; // a correct answer with no confidence recorded: "held" or "shaky"
export const ROUND_SIZE = 5; // questions in a practice round
export const ROUND_WEIGHTS = { missed: 4, shaky: 2, held: 1 }; // how often each status is drawn into a round
export const FOUNDATIONS_START_OPEN = true; // foundations are open from the start (they require nothing)
// ----

export const STATUSES = ["held", "shaky", "missed", "open", "locked"];

// Latest attempt for each proposition: the last in the list that names it, by position, not by time (format v0.2).
// An unmarked attempt is skipped, so it leaves the status it had before.
export function latestByProposition(attempts) {
  const latest = {};
  for (const a of attempts) {
    if (a.result === "unmarked") continue;
    for (const id of a.propositions || []) latest[id] = a;
  }
  return latest;
}

// held / shaky / missed / new, from the latest attempt only (the format's rule).
export function attemptStatus(attempt) {
  if (!attempt) return "new";
  if (attempt.result === "incorrect") return "missed";
  if (attempt.result === "partial") return "shaky";
  if (attempt.result === "correct") {
    if (attempt.hints > 0) return "shaky";
    if (attempt.confidence == null) return CORRECT_WITHOUT_CONFIDENCE;
    return attempt.confidence >= HELD_CONFIDENCE ? "held" : "shaky";
  }
  return "new";
}

// Status on the map: a new proposition is open when everything it requires is held, otherwise locked.
export function mapStatuses(propositions, attempts) {
  const latest = latestByProposition(attempts);
  const base = Object.fromEntries(propositions.map((p) => [p.id, attemptStatus(latest[p.id])]));
  const out = {};
  for (const p of propositions) {
    if (base[p.id] !== "new") out[p.id] = base[p.id];
    else {
      const requires = p.requires || [];
      const ready = requires.every((r) => base[r] === "held");
      out[p.id] = requires.length === 0 ? (FOUNDATIONS_START_OPEN ? "open" : "locked") : ready ? "open" : "locked";
    }
  }
  return out;
}

// Depth: foundations (nothing required) at 0, everything else one more than its deepest requirement. Loops are cut.
export function depths(propositions) {
  const byId = Object.fromEntries(propositions.map((p) => [p.id, p]));
  const memo = {};
  const visit = (id, trail) => {
    if (id in memo) return memo[id];
    if (trail.has(id) || !byId[id]) return 0;
    trail.add(id);
    const reqs = (byId[id].requires || []).filter((r) => byId[r]);
    const d = reqs.length ? 1 + Math.max(...reqs.map((r) => visit(r, trail))) : 0;
    trail.delete(id);
    return (memo[id] = d);
  };
  for (const p of propositions) visit(p.id, new Set());
  return memo;
}

// Everything the goal rests on, including the goal itself.
export function pathTo(goalIds, propositions) {
  const byId = Object.fromEntries(propositions.map((p) => [p.id, p]));
  const seen = new Set();
  const walk = (id) => {
    if (seen.has(id) || !byId[id]) return;
    seen.add(id);
    for (const r of byId[id].requires || []) walk(r);
  };
  for (const g of goalIds || []) walk(g);
  return seen;
}

// A question for one proposition: a stored one if there are any (the least recently asked), else "say it in your own words".
export function questionFor(proposition, attempts) {
  const stored = proposition.questions || [];
  if (!stored.length) {
    return { id: null, kind: "own-words", prompt: `In your own words: ${proposition.name}. What is the idea, and why does it hold?`, answer: proposition.statement };
  }
  const lastAsked = (q) => attempts.findLastIndex((a) => a.question === q.id);
  return [...stored].sort((a, b) => lastAsked(a) - lastAsked(b))[0];
}

// A practice round: propositions already answered at least once, drawn by weight, no repeats.
export function drawRound(propositions, statuses, attempts, size = ROUND_SIZE, random = Math.random) {
  const pool = propositions.filter((p) => ROUND_WEIGHTS[statuses[p.id]]).map((p) => ({ p, w: ROUND_WEIGHTS[statuses[p.id]] }));
  const round = [];
  while (round.length < size && pool.length) {
    let pick = random() * pool.reduce((sum, x) => sum + x.w, 0);
    const i = pool.findIndex((x) => (pick -= x.w) < 0);
    const [{ p }] = pool.splice(i < 0 ? pool.length - 1 : i, 1);
    round.push({ proposition: p, question: questionFor(p, attempts) });
  }
  return round;
}

// An attempt record in the format's shape. The game writes phase "practice" only.
export function makeAttempt({ proposition, question, response, thinking, confidence, result, session = null }) {
  const now = new Date();
  const pad = (n) => String(n).padStart(2, "0");
  const stamp = `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}-${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}`;
  const record = {
    id: `a-${stamp}-${proposition.id.replace(/^p-/, "")}-${Math.random().toString(36).slice(2, 5)}`,
    at: localIso(now),
    session,
    phase: "practice",
    propositions: [proposition.id],
    question: question.id,
    prompt: question.prompt,
    response,
    result,
    via: "web game",
  };
  if (thinking) record.thinking = thinking;
  if (confidence != null) record.confidence = confidence;
  return record;
}

function localIso(date) {
  const pad = (n) => String(Math.floor(Math.abs(n))).padStart(2, "0");
  const offset = -date.getTimezoneOffset();
  const sign = offset >= 0 ? "+" : "-";
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}${sign}${pad(offset / 60)}:${pad(offset % 60)}`;
}
