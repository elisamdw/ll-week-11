import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

// Server side of /learn: finds learner's graphs on disk and reads them. The format is _content/learning/format.md
// (ll-learner-graph/0.1): a harness folder holds graph/{learner,propositions,chains,sources,attempts}.json and sessions/*.md.

// ---- Tuning ----
// Where the worked examples live: one harness folder per example, starters/learning-harness/examples/<slug>/ (HD's).
const EXAMPLES = path.join(/* turbopackIgnore: true */ process.cwd(), "..", "starters", "learning-harness", "examples");
// A student's own harness folder, set when they run the app: LEARN_GRAPH_DIR=/path/to/my-harness pnpm dev
// It shows as "mine", and it is the only graph the game writes to (practice answers, appended to graph/attempts.json).
const MINE = process.env.LEARN_GRAPH_DIR ? path.resolve(process.env.LEARN_GRAPH_DIR) : null;
// Shown when no example has landed yet: a small graph kept beside this file.
const SAMPLE = path.join(/* turbopackIgnore: true */ process.cwd(), "app", "learn", "_sample");
// ----

export const graphSlug = (slug) => (/^[a-z0-9][a-z0-9-]{0,60}$/.test(slug || "") ? slug : null);

async function readJson(file, fallback) {
  try {
    return { value: JSON.parse(await readFile(/* turbopackIgnore: true */ file, "utf8")) };
  } catch (error) {
    if (error.code === "ENOENT") return { value: fallback };
    return { value: fallback, problem: `${path.basename(file)} isn't valid JSON: ${error.message}` };
  }
}

async function isHarness(dir) {
  try {
    return (await readdir(/* turbopackIgnore: true */ path.join(dir, "graph"))).includes("propositions.json");
  } catch {
    return false;
  }
}

// Every graph the game can play: the student's own folder first, then the examples, then the sample if nothing else.
export async function listGraphs() {
  const found = [];
  if (MINE && (await isHarness(MINE))) found.push({ slug: "mine", dir: MINE, writable: true, origin: "your folder" });
  let names = [];
  try {
    names = (await readdir(/* turbopackIgnore: true */ EXAMPLES, { withFileTypes: true })).filter((d) => d.isDirectory()).map((d) => d.name);
  } catch {}
  for (const name of names.sort()) {
    const dir = path.join(EXAMPLES, name);
    if (graphSlug(name) && name !== "mine" && (await isHarness(dir))) found.push({ slug: name, dir, writable: false, origin: "example" });
  }
  if (!found.some((g) => g.origin === "example")) found.push({ slug: "sample", dir: SAMPLE, writable: false, origin: "sample" });
  const withLearner = await Promise.all(found.map(async (g) => ({ ...g, learner: (await readJson(path.join(g.dir, "graph", "learner.json"), {})).value })));
  return withLearner.map(({ dir, ...rest }) => ({ ...rest, folder: displayPath(dir) }));
}

function displayPath(dir) {
  const repo = path.join(process.cwd(), "..");
  return dir.startsWith(repo + path.sep) ? path.relative(repo, dir) : dir;
}

async function readSessions(dir) {
  let files = [];
  try {
    files = (await readdir(/* turbopackIgnore: true */ path.join(dir, "sessions"))).filter((f) => f.endsWith(".md"));
  } catch {
    return [];
  }
  const sessions = await Promise.all(
    files.sort().map(async (file) => {
      try {
        const { data, content } = matter(await readFile(/* turbopackIgnore: true */ path.join(dir, "sessions", file), "utf8"));
        const title = content.match(/^#\s+(.+)$/m)?.[1] || file.replace(/\.md$/, "");
        return { id: data.id || file.replace(/\.md$/, ""), date: data.date ? String(data.date instanceof Date ? data.date.toISOString().slice(0, 10) : data.date) : null, phase: data.phase || null, title, propositions: data.propositions || [] };
      } catch {
        return null;
      }
    }),
  );
  return sessions.filter(Boolean);
}

// The whole graph for one slug, plus a list of problems a student (or Claude) can fix: bad JSON, missing ids, loops.
export async function readGraph(slug) {
  if (!graphSlug(slug)) return null;
  const entry = (await listGraphs()).find((g) => g.slug === slug);
  if (!entry) return null;
  const dir = dirFor(entry);
  const problems = [];
  const read = async (name, fallback) => {
    const { value, problem } = await readJson(path.join(dir, "graph", name), fallback);
    if (problem) problems.push(problem);
    return value;
  };
  const [learner, propositions, chains, sources, attempts, sessions] = await Promise.all([
    read("learner.json", {}),
    read("propositions.json", []),
    read("chains.json", []),
    read("sources.json", []),
    read("attempts.json", []),
    readSessions(dir),
  ]);
  // Retired ideas are hidden, and so are requirements that point at them (format v0.2: retired, with a note).
  const retired = new Set(propositions.filter((p) => p.retired).map((p) => p.id));
  const live = propositions.filter((p) => !p.retired).map((p) => ({ ...p, requires: (p.requires || []).filter((r) => !retired.has(r)) }));
  const ids = new Set(propositions.map((p) => p.id));
  for (const p of live) {
    for (const r of p.requires || []) if (!ids.has(r)) problems.push(`${p.id} requires ${r}, which isn't in propositions.json`);
  }
  for (const g of learner.goal || []) if (!ids.has(g)) problems.push(`learner.json's goal ${g} isn't in propositions.json`);
  const loop = findLoop(live);
  if (loop) problems.push(`requires goes round in a loop: ${loop.join(" → ")}; nothing in it can open`);
  return { ...entry, learner, propositions: live, chains, sources, attempts: Array.isArray(attempts) ? attempts : [], sessions, problems };
}

// The first loop in the requires edges, as a list of ids, or null.
function findLoop(propositions) {
  const byId = Object.fromEntries(propositions.map((p) => [p.id, p]));
  const done = new Set();
  const visit = (id, trail) => {
    if (trail.includes(id)) return [...trail.slice(trail.indexOf(id)), id];
    if (done.has(id) || !byId[id]) return null;
    for (const r of byId[id].requires || []) {
      const loop = visit(r, [...trail, id]);
      if (loop) return loop;
    }
    done.add(id);
    return null;
  };
  for (const p of propositions) {
    const loop = visit(p.id, []);
    if (loop) return loop;
  }
  return null;
}

function dirFor(entry) {
  if (entry.slug === "mine") return MINE;
  if (entry.origin === "sample") return SAMPLE;
  return path.join(EXAMPLES, entry.slug);
}

// Append practice attempts to the student's own attempts.json. Only "mine" is writable; examples keep progress in the browser.
export async function appendAttempts(slug, records) {
  if (slug !== "mine" || !MINE) return { error: "Only your own folder (LEARN_GRAPH_DIR) is saved to disk." };
  const file = path.join(MINE, "graph", "attempts.json");
  const { value: existing, problem } = await readJson(file, []);
  if (problem) return { error: problem };
  const clean = records.filter((r) => r && typeof r.id === "string" && r.phase === "practice");
  const taken = new Set(existing.map((a) => a.id));
  const fresh = clean.filter((r) => !taken.has(r.id));
  await mkdir(/* turbopackIgnore: true */ path.dirname(file), { recursive: true });
  await writeFile(/* turbopackIgnore: true */ file, `${JSON.stringify([...existing, ...fresh], null, 2)}\n`);
  return { ok: true, saved: fresh.length };
}

