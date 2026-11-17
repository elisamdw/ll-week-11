import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

// Two more card collections for the /ideas views (Nov 15): activity cards (/activities, _content/activities/) and
// PL's prototype cards (/prototypes, _content/prototypes/). Unlike ideas, these live in subfolders (tdm155ai/,
// stafford/, llufs/, shared/; economy/, players/, hybrid/), so a card's slug is its path without .md
// ("tdm155ai/rules-vs-mechanics") and its folder is its group. Cards carry the fields the ideas views read (title,
// description, kind, week, tags, date, sources, status, body) plus audience and the links the graph draws:
// mechanics, readings, prototypes, ideas, activities, and a session's sequence ("12:00 tdm155ai/<slug>").
// Arrangements save in _content/activities/_layouts/ through /activities/api/layout/<name>.
const contentRoot = path.join(/* turbopackIgnore: true */ process.cwd(), "..", "_content");
export const collectionKey = (c) => (c === "prototypes" ? "prototypes" : "activities");
const rootOf = (c) => path.join(contentRoot, collectionKey(c));

export const ACTIVITY_KINDS = [
  ["session", "Session"],
  ["activity", "Activity"],
  ["idea", "Idea"],
  ["research", "Research"],
];
export const ACTIVITY_KIND_HUES = { session: 330, activity: 150, idea: 55, research: 200 };

// Things a card links to outside the collection: small nodes of their own on the graph.
export const LINK_KINDS = [
  ["mechanic", "Mechanic"],
  ["reading", "Reading"],
  ["prototype", "Prototype"],
  ["card", "Idea card"],
];
export const LINK_KIND_HUES = { mechanic: 35, reading: 265, prototype: 0, card: 100 };

// PL's prototype cards (/prototypes): kind is the family.
export const PROTO_KINDS = [["economy", "Economy and the AI"], ["players", "Information and players"], ["hybrid", "The body, the room, hybrid"]];
export const PROTO_HUES = { economy: 35, players: 200, hybrid: 330 };

export const GROUP_LABELS = {
  tdm155ai: "TDM 155AI · Wed Nov 18",
  stafford: "Stafford workshop · Mon Nov 23",
  llufs: "LLUFs",
  shared: "Shared",
  economy: "Economy and the AI as a system",
  players: "Information and players",
  hybrid: "The body, the room and hybrid play",
};
export const AUDIENCE_LABELS = { tdm155ai: "TDM 155AI", stafford: "Stafford", llufs: "LLUFs" };

const str = (v) => (typeof v === "string" ? v.trim() : v instanceof Date ? v.toISOString().slice(0, 10) : typeof v === "number" ? String(v) : "");
const list = (v) => (Array.isArray(v) ? v.map(str).filter(Boolean) : str(v) ? str(v).split(/\s*[,;]\s*/).filter(Boolean) : []);
const cardFile = (n) => /^[a-z0-9][a-z0-9-]*\.md$/i.test(n) && !/^(readme|index)\.md$/i.test(n);

async function walk(dir, rel = "") {
  let entries = [];
  try {
    entries = await readdir(/* turbopackIgnore: true */ dir, { withFileTypes: true });
  } catch {
    return [];
  }
  const out = [];
  for (const e of entries) {
    if (e.name.startsWith("_") || e.name.startsWith(".")) continue;
    if (e.isDirectory()) out.push(...(await walk(path.join(dir, e.name), rel ? `${rel}/${e.name}` : e.name)));
    else if (cardFile(e.name)) out.push(rel ? `${rel}/${e.name}` : e.name);
  }
  return out;
}

// A sequence step: "12:00 tdm155ai/slug", "Nov 16–17 stafford/slug", "tdm155ai/slug" (the last word is the card,
// anything before it is its time), or { time|at, activity|card|slug, minutes }.
function step(v) {
  if (v && typeof v === "object") return { time: str(v.time ?? v.at), ref: str(v.activity ?? v.card ?? v.slug).replace(/\.md$/, ""), minutes: str(v.minutes ?? v.duration) };
  const m = str(v).match(/^(.*?)\s*([a-z0-9][a-z0-9/-]*?)(?:\.md)?$/i);
  return m ? { time: m[1].trim(), ref: m[2], minutes: "" } : null;
}

export async function getCards(c = "activities") {
  const root = rootOf(c);
  const files = await walk(root);
  const cards = await Promise.all(
    files.map(async (file) => {
      const { data, content } = matter(await readFile(path.join(/* turbopackIgnore: true */ root, file), "utf8"));
      const slug = file.slice(0, -3);
      const group = slug.includes("/") ? slug.split("/")[0] : "";
      return {
        slug,
        group,
        title: str(data.title) || slug.split("/").pop(),
        description: str(data.description),
        kind: str(data.kind),
        week: str(data.week),
        tags: list(data.tags),
        audience: list(data.audience),
        date: str(data.date),
        sources: list(data.sources),
        status: str(data.status),
        author: str(data.author),
        duration: str(data.duration),
        size: str(data.group),
        materials: list(data.materials),
        play: str(data.play),
        route: str(data.route ?? data.href ?? data.url),
        mechanics: list(data.mechanics),
        readings: list(data.readings),
        prototypes: list(data.prototypes),
        ideas: list(data.ideas),
        activities: list(data.activities),
        sequence: (Array.isArray(data.sequence) ? data.sequence : []).map(step).filter((s) => s && s.ref),
        body: content.trim(),
      };
    }),
  );
  const order = ACTIVITY_KINDS.map(([k]) => k);
  const rank = (k) => (order.includes(k) ? order.indexOf(k) : order.length);
  return cards.sort((a, b) => a.group.localeCompare(b.group) || rank(a.kind) - rank(b.kind) || a.title.localeCompare(b.title));
}

export async function getCard(slug, c = "activities") {
  return (await getCards(c)).find((card) => card.slug === slug) || null;
}

// --- what the links point at ---

function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = "";
  let quoted = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (quoted) {
      if (ch === '"' && text[i + 1] === '"') (field += '"'), i++;
      else if (ch === '"') quoted = false;
      else field += ch;
    } else if (ch === '"') quoted = true;
    else if (ch === ",") row.push(field), (field = "");
    else if (ch === "\n" || ch === "\r") {
      if (ch === "\r" && text[i + 1] === "\n") i++;
      row.push(field), rows.push(row), (row = []), (field = "");
    } else field += ch;
  }
  if (field || row.length) row.push(field), rows.push(row);
  return rows;
}

async function mechanicsIndex() {
  try {
    const [head, ...rows] = parseCsv((await readFile(/* turbopackIgnore: true */ path.join(contentRoot, "mechanics", "mechanics.csv"), "utf8")).replace(/^﻿/, ""));
    const col = (name) => head.indexOf(name);
    const [id, name, one, family] = [col("MechanicId"), col("Name"), col("OneLine"), col("Family")];
    return new Map(rows.filter((r) => r[id]).map((r) => [r[id], { title: r[name] || r[id], description: r[one] || "", tags: r[family] ? [r[family]] : [] }]));
  } catch {
    return new Map();
  }
}

async function frontmatterIndex(dir, recursive = false) {
  const root = path.join(contentRoot, dir);
  const files = recursive ? await walk(root) : (await readdir(/* turbopackIgnore: true */ root).catch(() => [])).filter(cardFile);
  const out = new Map();
  await Promise.all(
    files.map(async (file) => {
      try {
        const { data } = matter(await readFile(path.join(/* turbopackIgnore: true */ root, file), "utf8"));
        const creators = list(data.creators);
        out.set(file.slice(0, -3), {
          title: str(data.title) || file.slice(0, -3),
          description: str(data.description) || [creators.join(", "), str(data.year)].filter(Boolean).join(", "),
          route: str(data.route ?? data.href ?? data.url),
        });
      } catch {}
    }),
  );
  return out;
}

const linkSlug = (kind, ref) => `@${kind}/${ref}`;

// Every card's links, resolved: edges to other cards in the collection, or to small link nodes ("@mechanic/core-loop").
export async function getGraphData(cards) {
  const [mechanics, readings, prototypes, ideas, gameIdeas] = await Promise.all([
    mechanicsIndex(),
    frontmatterIndex("bibliography"),
    frontmatterIndex("prototypes", true),
    frontmatterIndex("ideas"),
    frontmatterIndex("game-ideas"),
  ]);
  const bySlug = new Map(cards.map((c) => [c.slug, c]));
  const byLeaf = new Map();
  for (const c of cards) {
    const leaf = c.slug.split("/").pop();
    byLeaf.set(leaf, byLeaf.has(leaf) ? null : c.slug);
  }
  const findCard = (ref, from) => bySlug.get(ref)?.slug || (from.group && bySlug.get(`${from.group}/${ref}`)?.slug) || byLeaf.get(ref) || null;
  const protoLeaf = new Map([...prototypes.keys()].map((k) => [k.split("/").pop(), k]));

  const nodes = new Map();
  const links = [];
  const addNode = (kind, ref, info, href) => {
    const slug = linkSlug(kind, ref);
    if (!nodes.has(slug)) nodes.set(slug, { slug, ext: true, kind, group: "", title: info?.title || ref, description: info?.description || (info ? "" : "not found in the repo"), tags: info?.tags || [], audience: [], week: "", date: "", sources: [], body: "", href, missing: !info });
    return slug;
  };

  for (const card of cards) {
    const add = (target, kind, label = "") => target && target !== card.slug && links.push({ source: card.slug, target, kind, label });
    for (const m of card.mechanics) add(addNode("mechanic", m, mechanics.get(m), "/mechanics"), "mechanic");
    for (const r of card.readings) add(addNode("reading", r, readings.get(r), `/bibliography/${r}`), "reading");
    for (const p of card.prototypes) {
      const key = prototypes.has(p) ? p : protoLeaf.get(p) || p;
      const info = prototypes.get(key);
      add(addNode("prototype", key, info, `/prototypes/${key}`), "prototype");
    }
    for (const raw of card.ideas) {
      const [col, ref] = raw.startsWith("game-ideas/") ? ["game-ideas", raw.slice(11)] : raw.startsWith("ideas/") ? ["ideas", raw.slice(6)] : [gameIdeas.has(raw) && !ideas.has(raw) ? "game-ideas" : "ideas", raw];
      const info = (col === "game-ideas" ? gameIdeas : ideas).get(ref);
      add(addNode("card", `${col}/${ref}`, info, `/${col}/${ref}`), "idea");
    }
    for (const a of card.activities) add(findCard(a, card) || addNode("card", `activities/${a}`, null, `/activities/${a}`), "relates");
    // A session: the session leads to its first step, and each step to the next, labeled with its time.
    let prev = card.slug;
    for (const s of card.sequence) {
      const target = findCard(s.ref, card) || addNode("card", `activities/${s.ref}`, null, `/activities/${s.ref}`);
      if (target !== prev) links.push({ source: prev, target, kind: "sequence", label: s.time });
      prev = target;
    }
  }
  return { linkNodes: [...nodes.values()], links };
}

// --- saved arrangements ---

export const layoutName = (name) => (/^[a-z0-9][a-z0-9-]{0,40}$/.test(name || "") ? name : null);

export async function readLayout(name, c = "activities") {
  try {
    return JSON.parse(await readFile(/* turbopackIgnore: true */ path.join(rootOf(c), "_layouts", `${name}.json`), "utf8"));
  } catch {
    return null;
  }
}

export async function writeLayout(name, layout, c = "activities") {
  const dir = path.join(rootOf(c), "_layouts");
  await mkdir(/* turbopackIgnore: true */ dir, { recursive: true });
  const saved = { ...layout, savedAt: new Date().toISOString() };
  await writeFile(/* turbopackIgnore: true */ path.join(dir, `${name}.json`), `${JSON.stringify(saved, null, 2)}\n`);
  return saved;
}
