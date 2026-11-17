#!/usr/bin/env node
// Checks a learning harness's graph/ folder against FORMAT.md and prints each idea's status.
// Usage: node scripts/check-graph.mjs [harness-folder]   (default: the folder above scripts/)
// Plain Node, no packages. Exits 1 if it finds a problem.

import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(process.argv[2] ?? join(dirname(fileURLToPath(import.meta.url)), ".."));
const problems = [];
const warn = (msg) => problems.push(msg);

function load(name, fallback) {
  const path = join(root, "graph", name);
  if (!existsSync(path)) {
    warn(`graph/${name} is missing`);
    return fallback;
  }
  try {
    return JSON.parse(readFileSync(path, "utf8"));
  } catch (err) {
    warn(`graph/${name} is not valid JSON: ${err.message}`);
    return fallback;
  }
}

const learner = load("learner.json", {});
const propositions = load("propositions.json", []);
const chains = load("chains.json", []);
const sources = load("sources.json", []);
const attempts = load("attempts.json", []);

for (const [name, value] of Object.entries({ propositions, chains, sources, attempts })) {
  if (!Array.isArray(value)) warn(`graph/${name}.json should be one array`);
}

// Sessions: ids from the frontmatter of sessions/*.md
const sessionIds = new Set();
const sessionsDir = join(root, "sessions");
if (existsSync(sessionsDir)) {
  for (const file of readdirSync(sessionsDir).filter((f) => f.endsWith(".md"))) {
    const text = readFileSync(join(sessionsDir, file), "utf8");
    const id = text.match(/^---[\s\S]*?^id:\s*(\S+)/m)?.[1];
    if (!id) warn(`sessions/${file} has no id in its frontmatter`);
    else sessionIds.add(id);
  }
}

// Ids: prefixed, unique
const ids = { p: new Set(), c: new Set(), src: new Set(), a: new Set(), q: new Set() };
function claim(kind, id, where) {
  if (typeof id !== "string" || !id.startsWith(`${kind}-`)) warn(`${where}: id "${id}" should start with "${kind}-"`);
  else if (ids[kind].has(id)) warn(`${where}: id "${id}" is used twice`);
  else ids[kind].add(id);
}
const list = (v) => (Array.isArray(v) ? v : []);

for (const p of list(propositions)) {
  claim("p", p.id, "propositions.json");
  for (const field of ["name", "statement", "kind"]) if (!p[field]) warn(`${p.id}: missing ${field}`);
  if (p.kind && !["foundation", "derived"].includes(p.kind)) warn(`${p.id}: kind should be foundation or derived`);
  for (const q of list(p.questions)) {
    claim("q", q.id, `${p.id}.questions`);
    if (!q.prompt) warn(`${q.id}: missing prompt`);
  }
}
for (const c of list(chains)) claim("c", c.id, "chains.json");
for (const s of list(sources)) {
  claim("src", s.id, "sources.json");
  if (!s.title) warn(`${s.id}: missing title`);
  if (s.file && !existsSync(join(root, s.file))) warn(`${s.id}: file ${s.file} is not in the folder`);
}
for (const a of list(attempts)) claim("a", a.id, "attempts.json");

// References
const need = (kind, id, where) => {
  if (!ids[kind].has(id)) warn(`${where} points at "${id}", which doesn't exist`);
};
const needSession = (id, where) => {
  if (!sessionIds.has(id)) warn(`${where} points at session "${id}", which has no file in sessions/`);
};
for (const id of list(learner.goal)) need("p", id, "learner.json goal");
for (const id of list(learner.plan)) need("p", id, "learner.json plan");
for (const p of list(propositions)) {
  for (const id of list(p.requires)) need("p", id, `${p.id}.requires`);
  for (const id of list(p.sources)) need("src", id, `${p.id}.sources`);
  for (const id of list(p.sessions)) needSession(id, `${p.id}.sessions`);
}
for (const c of list(chains)) {
  if (!list(c.premises).length) warn(`${c.id}: needs at least one premise`);
  for (const id of list(c.premises)) need("p", id, `${c.id}.premises`);
  need("p", c.conclusion, `${c.id}.conclusion`);
  for (const id of list(c.sessions)) needSession(id, `${c.id}.sessions`);
}
const PHASES = ["probe", "check", "practice"];
const RESULTS = ["correct", "partial", "incorrect", "unmarked"];
for (const a of list(attempts)) {
  if (!PHASES.includes(a.phase)) warn(`${a.id}: phase should be one of ${PHASES.join(", ")}`);
  if (!RESULTS.includes(a.result)) warn(`${a.id}: result should be one of ${RESULTS.join(", ")}`);
  if (a.confidence !== undefined && ![1, 2, 3, 4].includes(a.confidence)) warn(`${a.id}: confidence should be 1 to 4, or left out`);
  if (!a.at || Number.isNaN(Date.parse(a.at))) warn(`${a.id}: "at" should be a date and time`);
  if (!list(a.propositions).length) warn(`${a.id}: names no propositions`);
  for (const id of list(a.propositions)) need("p", id, `${a.id}.propositions`);
  if (a.question) need("q", a.question, `${a.id}.question`);
  if (a.session) needSession(a.session, `${a.id}.session`);
}

// Attempts are appended as they happen, so their times should not go backwards
const notes = [];
list(attempts).reduce((prev, a) => {
  const t = Date.parse(a.at);
  if (prev && t < prev.t) notes.push(`${a.id} is timed before ${prev.id}, which comes earlier in attempts.json: were the times read from the clock?`);
  return Number.isNaN(t) ? prev : { t, id: a.id };
}, null);
for (const a of list(attempts)) {
  if (a.hints !== undefined && !(Number.isInteger(a.hints) && a.hints >= 0)) warn(`${a.id}: hints should be a whole number`);
}

// requires must not loop
const requires = new Map(list(propositions).map((p) => [p.id, list(p.requires)]));
const seen = new Map();
function visit(id, path) {
  if (seen.get(id) === "done") return;
  if (seen.get(id) === "open") return warn(`requires loops: ${[...path, id].join(" → ")}`);
  seen.set(id, "open");
  for (const next of requires.get(id) ?? []) visit(next, [...path, id]);
  seen.set(id, "done");
}
for (const id of requires.keys()) visit(id, []);

// Status, derived from the latest attempt (FORMAT.md, format v0.2). "Latest" is the last in the file: attempts are appended as they happen.
// An unmarked attempt leaves the status as it was; confidence left out counts as held; any hint makes a correct answer shaky.
function status(id) {
  const last = list(attempts)
    .filter((a) => list(a.propositions).includes(id) && a.result !== "unmarked")
    .at(-1);
  if (!last) return "new";
  if (last.result === "incorrect") return "missed";
  if (last.result === "partial") return "shaky";
  if ((last.hints ?? 0) > 0) return "shaky";
  return last.confidence === undefined || last.confidence >= 3 ? "held" : "shaky";
}
const mark = { held: "✅", shaky: "🟡", missed: "❌", new: "⬜" };
const live = list(propositions).filter((p) => !p.retired);
const order = [...list(learner.plan), ...live.map((p) => p.id).filter((id) => !list(learner.plan).includes(id))];
const counts = { held: 0, shaky: 0, missed: 0, new: 0 };

console.log(`${learner.topic ?? "(no topic yet)"}: ${live.length} ideas, ${list(chains).length} chains, ${list(attempts).length} attempts, ${sessionIds.size} sessions`);
for (const id of order) {
  const p = live.find((x) => x.id === id);
  if (!p) continue;
  const s = status(id);
  counts[s]++;
  const blocked = list(p.requires).filter((r) => status(r) !== "held");
  console.log(`  ${mark[s]} ${p.name} (${id})${s !== "held" && blocked.length ? `, needs ${blocked.join(", ")}` : ""}`);
}
console.log(`held ${counts.held} · shaky ${counts.shaky} · missed ${counts.missed} · new ${counts.new}`);

if (notes.length) {
  console.log(`\n${notes.length} warning(s):`);
  for (const n of notes) console.log(`  - ${n}`);
}
if (problems.length) {
  console.log(`\n${problems.length} problem(s):`);
  for (const p of problems) console.log(`  - ${p}`);
  process.exit(1);
}
console.log("\nNo problems found.");
