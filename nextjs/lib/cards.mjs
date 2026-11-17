import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { buildGraph } from "./card-graph.mjs";

// The week 11 cards (/cards, Nov 15): one Markdown file per idea, fragment, activity or mechanic in the flat folder
// _content/cards/<slug>.md, in the format CL fixed in _content/cards/format.md. Copied from lib/ideas.mjs (AL's /ideas
// views) and changed for the card graph, which lives in the frontmatter:
//   convolute   one bundle per card (Benjamin), a slug from _content/cards/convolutes.md
//   follows     the one card this one continues (Luhmann's chain); several cards may follow one card (a branch)
//   links       cross-references: bare slugs for cards, <collection>/<slug> for ideas, game-ideas, mechanics, ...
//   (grows from) the first entry in links with a slash: the card in another collection this one grew from (format 1.0)
//   order       optional position within its convolute; chains through follows come first
// The board and graph save their arrangements in _content/cards/_layouts/<view>.json ("_" keeps them out of the folder pages).

// --- tuning ---
export const KINDS = [
  ["idea", "Idea"],
  ["fragment", "Fragment"],
  ["aphorism", "Aphorism"],
  ["question", "Question"],
  ["activity", "Activity"],
  ["mechanic", "Mechanic"],
  ["prototype", "Prototype"],
  ["reading", "Reading"],
];
// One hue per kind, shared by the list, the card page, the board and the graph.
export const KIND_HUES = { idea: 55, fragment: 200, aphorism: 330, question: 0, activity: 150, mechanic: 35, prototype: 100, reading: 265 };
export const VOICES = [
  ["marlon", "Marlon's words"],
  ["mixed", "Mixed"],
  ["drafted", "Drafted"],
];
export const STATUSES = [
  ["seed", "Seed"],
  ["draft", "Draft"],
  ["ready", "Ready"],
];
// Collections a link may point into, as <collection>/<slug>; each has a page at /<collection>/<slug>.
export const COLLECTIONS = { ideas: "Idea", "game-ideas": "Game idea", mechanics: "Mechanic", activities: "Activity", prototypes: "Prototype", bibliography: "Reading", theory: "Theory", history: "History", game: "Game", "game-state": "Game state", learning: "Learning", media: "Media", story: "Story" };
// Who a card is for (format.md `audience`).
export const AUDIENCES = [["tdm155ai", "TDM 155AI · Nov 18"], ["stafford", "Stafford · Nov 23"], ["llufs", "LLUFs"], ["ll", "The LL"], ["faculty", "Faculty"]];
// Kinds for the graph's small nodes that stand for things outside /cards, and their hues.
export const LINK_KINDS = [["outside", "Outside card"]];
export const LINK_KIND_HUES = { outside: 220 };

const contentRoot = path.join(/* turbopackIgnore: true */ process.cwd(), "..", "_content");
const cardsRoot = path.join(contentRoot, "cards");
const layoutsRoot = path.join(cardsRoot, "_layouts");

const str = (v) => (typeof v === "string" ? v.trim() : v instanceof Date ? v.toISOString().slice(0, 10) : typeof v === "number" ? String(v) : "");
const list = (v) => (Array.isArray(v) ? v.map(str).filter(Boolean) : str(v) ? str(v).split(/\s*,\s*/).filter(Boolean) : []);
const ref = (v) => str(v).replace(/^\.?\/?/, "").replace(/\.md$/, "").replace(/^cards\//, "");
const cardFile = (n) => /^[a-z0-9][a-z0-9-]*\.md$/.test(n) && !/^(readme|index|format|convolutes|views|graph)\.md$/i.test(n);

// --- reading the cards ---

export async function getCards() {
  let names = [];
  try {
    names = (await readdir(/* turbopackIgnore: true */ cardsRoot)).filter(cardFile);
  } catch {
    return [];
  }
  const cards = await Promise.all(
    names.map(async (name) => {
      const { data, content } = matter(await readFile(path.join(/* turbopackIgnore: true */ cardsRoot, name), "utf8"));
      const slug = name.slice(0, -3);
      const convolute = str(data.convolute);
      const order = Number(data.order);
      const parts = splitAbstract(content.trim());
      return {
        slug,
        title: str(data.title) || slug,
        description: str(data.description),
        kind: str(data.kind),
        convolute,
        group: convolute, // the graph clusters by group
        tags: list(data.tags),
        audience: list(data.audience),
        follows: ref(Array.isArray(data.follows) ? data.follows[0] : data.follows),
        links: list(data.links).map(ref),
        order: Number.isFinite(order) && data.order !== null && data.order !== "" ? order : null,
        sources: list(data.sources),
        voice: str(data.voice),
        author: str(data.author),
        date: str(data.date),
        week: str(data.week),
        status: str(data.status),
        body: content.trim(),
        abstract: parts?.abstract || "", // above the divider (format 1.1), or ""
        main: parts ? parts.main : content.trim(), // the body without the abstract and the divider
      };
    }),
  );
  // A card grows from the first collection card in its links, if any (format 1.0: it is listed first).
  for (const c of cards) c.growsFrom = c.links.filter((t) => t.includes("/")).slice(0, 1);
  return cards.sort((a, b) => a.title.localeCompare(b.title));
}

// --- the convolutes: _content/cards/convolutes.md, a table with Slug, Title and description columns (and a letter);
// or frontmatter `convolutes:`; or one "## Title (`slug`)" per convolute with a sentence under it ---

export async function getConvolutes() {
  let text = "";
  try {
    text = await readFile(/* turbopackIgnore: true */ path.join(cardsRoot, "convolutes.md"), "utf8");
  } catch {
    return [];
  }
  const { data, content } = matter(text);
  if (Array.isArray(data.convolutes)) {
    return data.convolutes.map((c) => ({ slug: str(c.slug), title: str(c.title) || str(c.slug), description: str(c.description) })).filter((c) => c.slug);
  }
  // A table with a Slug column (CL's form, Nov 15): | letter | `slug` | Title | What goes in it |
  const rows = content.split("\n").filter((l) => /^\s*\|/.test(l)).map((l) => l.trim().replace(/^\||\|$/g, "").split("|").map((c) => c.trim()));
  const head = rows[0]?.map((h) => h.toLowerCase()) || [];
  const col = (...names) => head.findIndex((h) => names.includes(h));
  const [iSlug, iTitle, iLetter] = [col("slug"), col("title", "name"), col("", "letter")];
  if (iSlug >= 0) {
    const iDesc = head.findIndex((h, i) => i !== iSlug && i !== iTitle && i !== iLetter && h);
    return rows
      .slice(1)
      .filter((r) => !r.every((c) => /^:?-+:?$/.test(c)))
      .map((r) => ({ slug: (r[iSlug] || "").replace(/`/g, ""), title: r[iTitle] || r[iSlug], description: iDesc >= 0 ? r[iDesc] || "" : "", letter: iLetter >= 0 ? r[iLetter] || "" : "" }))
      .filter((c) => /^[a-z0-9][a-z0-9-]*$/.test(c.slug));
  }
  const out = [];
  for (const section of content.split(/^##\s+/m).slice(1)) {
    const [head, ...rest] = section.split("\n");
    const slug = head.match(/`([a-z0-9][a-z0-9-]*)`/)?.[1] || head.match(/\{#([a-z0-9-]+)\}/)?.[1];
    if (!slug) continue;
    const title = head.replace(/\(?`[^`]*`\)?/g, "").replace(/\{#[^}]*\}/g, "").replace(/[\s:·—-]+$/, "").trim() || slug;
    const description = rest.join("\n").split(/\n\s*\n/).map((p) => p.trim()).find((p) => p && !p.startsWith("#")) || "";
    out.push({ slug, title, description });
  }
  return out;
}

// --- the links, both ways ---

// What a link names outside /cards: a file under _content/ (its title and the page the reader serves for it). A
// mechanic is mechanics/<MechanicId>, a row of _content/mechanics/mechanics.csv, with a page at /mechanics/new/<id>
// when it has one.
async function frontmatter(file) {
  try {
    return matter(await readFile(/* turbopackIgnore: true */ file, "utf8")).data;
  } catch {
    return null;
  }
}

let mechanicsCache = null;
async function mechanicsIndex() {
  if (mechanicsCache) return mechanicsCache;
  const rows = new Map();
  try {
    const text = (await readFile(/* turbopackIgnore: true */ path.join(contentRoot, "mechanics", "mechanics.csv"), "utf8")).replace(/^\uFEFF/, "");
    const lines = text.split(/\r?\n/).filter(Boolean);
    const cells = (line) => [...line.matchAll(/"((?:[^"]|"")*)"|([^,]+)|(?<=,)(?=,|$)/g)].map((m) => (m[1] ?? m[2] ?? "").replace(/""/g, '"'));
    const head = cells(lines[0]);
    const [id, name, one] = ["MechanicId", "Name", "OneLine"].map((h) => head.indexOf(h));
    for (const line of lines.slice(1)) {
      const r = cells(line);
      if (r[id]) rows.set(r[id], { title: r[name] || r[id], description: r[one] || "" });
    }
  } catch {}
  mechanicsCache = rows;
  setTimeout(() => (mechanicsCache = null), 5000);
  return rows;
}

async function outsideInfo(target) {
  const [collection, ...rest] = target.split("/");
  const slug = rest.join("/");
  const label = COLLECTIONS[collection] || collection;
  if (collection === "mechanics" && !slug.includes("/")) {
    const [row, data] = await Promise.all([mechanicsIndex().then((m) => m.get(slug)), frontmatter(path.join(contentRoot, "mechanics", "new", `${slug}.md`))]);
    // Not a mechanic (mechanics/README, say): fall through to the plain file.
    if (row || data) return { collection, label, title: str(data?.title) || row?.title || slug, description: str(data?.description) || row?.description || "", found: true, href: data ? `/mechanics/new/${slug}` : null, file: data ? `_content/mechanics/new/${slug}.md` : "_content/mechanics/mechanics.csv" };
  }
  const own = await frontmatter(path.join(contentRoot, collection, `${slug}.md`));
  const data = own || (await frontmatter(path.join(contentRoot, collection, slug, "README.md")));
  return { collection, label, title: str(data?.title) || slug, description: str(data?.description), found: Boolean(data), href: `/${target}`, file: data ? `_content/${collection}/${slug}${own ? ".md" : "/README.md"}` : null };
}

// Every card with its neighbours worked out: linksTo / linkedFrom (cards here and outside), followedBy (its
// continuations), growsFrom resolved, and the convolute's order. Returns { cards, bySlug, outside, convolutes }.
export async function getCardGraph() {
  const [cards, convolutes] = await Promise.all([getCards(), getConvolutes()]);
  const bySlug = new Map(cards.map((c) => [c.slug, c]));
  const outsideRefs = new Set();
  for (const c of cards) for (const t of c.links) if (!bySlug.has(t) && t.includes("/")) outsideRefs.add(t);
  const outside = new Map(await Promise.all([...outsideRefs].map(async (t) => [t, await outsideInfo(t)])));
  const target = (t) => (bySlug.has(t) ? { slug: t, card: bySlug.get(t), href: `/cards/${t}`, title: bySlug.get(t).title } : outside.has(t) ? { slug: t, outside: outside.get(t), href: outside.get(t).href, title: outside.get(t).title } : { slug: t, missing: true, href: null, title: t });

  for (const c of cards) {
    c.linksTo = c.links.filter((t) => t !== c.slug && !c.growsFrom.includes(t)).map(target);
    c.grows = c.growsFrom.map(target);
    c.linkedFrom = [];
    c.followedBy = [];
    c.followsCard = c.follows ? target(c.follows) : null;
  }
  for (const c of cards) {
    for (const t of c.links) if (bySlug.has(t) && t !== c.slug) bySlug.get(t).linkedFrom.push({ slug: c.slug, title: c.title, href: `/cards/${c.slug}`, card: c, how: "links" });
    if (c.follows && bySlug.has(c.follows) && c.follows !== c.slug) bySlug.get(c.follows).followedBy.push(c);
  }
  for (const c of cards) c.followedBy.sort(byOrder);
  return { cards, bySlug, outside, convolutes };
}

const byOrder = (a, b) => (a.order ?? Infinity) - (b.order ?? Infinity) || a.date.localeCompare(b.date) || a.title.localeCompare(b.title);

// The cards of one convolute in reading order: each chain head (a card that follows nothing in the convolute), then
// its continuations depth first; heads by order, then date, then title. depth marks a branch.
export function convoluteOrder(cards) {
  const inSet = new Set(cards.map((c) => c.slug));
  const heads = cards.filter((c) => !c.follows || !inSet.has(c.follows)).sort(byOrder);
  const children = new Map();
  for (const c of cards) if (c.follows && inSet.has(c.follows) && c.follows !== c.slug) children.set(c.follows, [...(children.get(c.follows) || []), c]);
  for (const list of children.values()) list.sort(byOrder);
  const out = [];
  const seen = new Set();
  const walk = (c, depth) => {
    if (seen.has(c.slug)) return;
    seen.add(c.slug);
    out.push({ card: c, depth });
    (children.get(c.slug) || []).forEach((n, i) => walk(n, depth + (i > 0 ? 1 : 0)));
  };
  heads.forEach((h) => walk(h, 0));
  for (const c of [...cards].sort(byOrder)) walk(c, 0); // cycles: whatever is left
  return out;
}

// A chain through one card: back through follows to its first card, then forward through every continuation
// (depth first; a card with two continuations opens a branch).
export function chainOf(card, bySlug) {
  const back = [];
  const seen = new Set([card.slug]);
  let c = card;
  while (c.follows && bySlug.has(c.follows) && !seen.has(c.follows)) {
    c = bySlug.get(c.follows);
    seen.add(c.slug);
    back.unshift(c);
  }
  const root = back[0] || card;
  const out = [];
  const visited = new Set();
  const walk = (n, depth, branchOf) => {
    if (visited.has(n.slug)) return;
    visited.add(n.slug);
    out.push({ card: n, depth, branchOf, here: n.slug === card.slug });
    n.followedBy.forEach((m, i) => walk(m, depth + (i > 0 ? 1 : 0), i > 0 ? n : null));
  };
  walk(root, 0, null);
  return out;
}

// --- a card's short text (Nov 15): Marlon's "abbreviated things to print that match up with more complete digital
// texts", used wherever a card is shown small: the short print form, the graph's side panel, the board's detail panel.
// It is the body's part only; the views show the description above it. The rules are tried in order and the first
// that gives text wins, so a later rule (say, "everything above a divider in the body", still Marlon's choice) goes
// ahead of the derived one in SHORT_RULES.
// The abstract (format 1.1, Marlon, Nov 15: "a little like an academic paper with abstract"): a body may open with a
// summary closed by the first line that is only "---". Fenced code is skipped. Returns { abstract, main } or null.
export function splitAbstract(body = "") {
  const lines = body.split("\n");
  let fenced = false;
  for (let i = 0; i < lines.length; i++) {
    if (/^\s*(```|~~~)/.test(lines[i])) fenced = !fenced;
    if (!fenced && lines[i].trim() === "---") {
      const abstract = lines.slice(0, i).join("\n").trim();
      return abstract ? { abstract, main: lines.slice(i + 1).join("\n").trim() } : null;
    }
  }
  return null;
}

export function shortText(body = "") {
  for (const rule of SHORT_RULES) {
    const text = rule(body);
    if (text) return text;
  }
  return "";
}

// The derived rule: only the blockquotes in the body, each with the first sentence of the paragraph right after it
// (the attribution line: who, when, where). Several blockquotes in a row keep one attribution, after the last.
// Nothing is rewritten.
export function shortBody(body = "") {
  const blocks = body.split(/\n\s*\n/).map((b) => b.trim()).filter(Boolean);
  const isQuote = (b) => b.split("\n").every((l) => /^\s*>/.test(l));
  const isProse = (b) => b && !isQuote(b) && !/^(#|[-*+] |\d+[.)] |```|\||<)/.test(b);
  const out = [];
  blocks.forEach((b, i) => {
    if (!isQuote(b)) return;
    out.push(b);
    // The attribution is the first sentence of that paragraph; what follows it is an agent's commentary.
    if (!isQuote(blocks[i + 1] || "") && isProse(blocks[i + 1])) out.push(blocks[i + 1].split(/(?<=[.)])\s+(?=[A-Z*"“])/)[0]);
  });
  return out.join("\n\n");
}

const SHORT_RULES = [(body) => splitAbstract(body)?.abstract, shortBody];

// --- filters for the print view: ?convolute= ?kind= ?tag= ?status= ?audience= ?voice= ?cards=a,b ---

const one = (v) => (Array.isArray(v) ? v[0] : v) || "";
export function filterCards(cards, sp = {}, convolutes = []) {
  const chosen = one(sp.cards).split(",").map((s) => s.trim()).filter(Boolean);
  if (chosen.length) {
    const bySlug = new Map(cards.map((c) => [c.slug, c]));
    return chosen.map((s) => bySlug.get(s)).filter(Boolean);
  }
  const [convolute, kind, tag, status, audience, voice] = ["convolute", "kind", "tag", "status", "audience", "voice"].map((k) => one(sp[k]));
  const shown = cards.filter((c) => (!convolute || c.convolute === convolute) && (!kind || c.kind === kind) && (!tag || c.tags.includes(tag)) && (!status || c.status === status) && (!audience || c.audience.includes(audience)) && (!voice || c.voice === voice));
  // In convolute order, convolutes in the order of convolutes.md, each in its reading order.
  const rank = new Map(convolutes.map((c, i) => [c.slug, i]));
  const groups = new Map();
  for (const c of shown) groups.set(c.convolute, [...(groups.get(c.convolute) || []), c]);
  return [...groups]
    .sort(([a], [b]) => (rank.get(a) ?? Infinity) - (rank.get(b) ?? Infinity) || a.localeCompare(b))
    .flatMap(([, items]) => convoluteOrder(items).map((x) => x.card));
}

// --- saved arrangements: one JSON file per view (board, graph, or a named variant such as board-stafford) ---

export const layoutName = (name) => (/^[a-z0-9][a-z0-9-]{0,40}$/.test(name || "") ? name : null);

export async function readLayout(name) {
  try {
    return JSON.parse(await readFile(/* turbopackIgnore: true */ path.join(layoutsRoot, `${name}.json`), "utf8"));
  } catch {
    return null;
  }
}

export async function writeLayout(name, layout) {
  await mkdir(/* turbopackIgnore: true */ layoutsRoot, { recursive: true });
  const saved = { ...layout, savedAt: new Date().toISOString() };
  await writeFile(/* turbopackIgnore: true */ path.join(layoutsRoot, `${name}.json`), `${JSON.stringify(saved, null, 2)}\n`);
  return saved;
}

// --- the graph as data (lib/card-graph.mjs): /cards/graph.json and the graph view's lenses ---

// Every graph*.json arrangement's hand-drawn links, which live only there until someone adds them to a card's links.
export async function drawnLinks() {
  let names = [];
  try {
    names = (await readdir(/* turbopackIgnore: true */ layoutsRoot)).filter((n) => /^graph(-[a-z0-9-]+)?\.json$/.test(n));
  } catch {
    return [];
  }
  const out = [];
  for (const name of names) for (const e of (await readLayout(name.slice(0, -5)))?.edges || []) out.push({ ...e, file: `_content/cards/_layouts/${name}` });
  return out;
}

export async function getGraphData() {
  const [{ cards, outside, convolutes }, drawn] = await Promise.all([getCardGraph(), drawnLinks()]);
  const plain = cards.map(({ linksTo, linkedFrom, followedBy, followsCard, grows, ...c }) => c);
  return buildGraph({ cards: plain, convolutes, outside, drawn });
}

// --- for the graph: edges from the frontmatter, and small nodes for what lies outside /cards ---

export function graphData(cards, outside) {
  const bySlug = new Map(cards.map((c) => [c.slug, c]));
  const nodes = new Map();
  const links = [];
  const node = (t) => {
    if (bySlug.has(t)) return t;
    const info = outside.get(t);
    if (!info) return null;
    const slug = `@${t}`;
    if (!nodes.has(slug)) nodes.set(slug, { slug, ext: true, kind: "outside", group: "", title: info.title, description: `${info.label}${info.found ? "" : " · not found in the repo"}${info.description ? ` · ${info.description}` : ""}`, tags: [], sources: [], week: "", date: "", status: "", convolute: "", body: "", href: info.href, missing: !info.found });
    return slug;
  };
  for (const c of cards) {
    if (c.follows && bySlug.has(c.follows) && c.follows !== c.slug) links.push({ source: c.follows, target: c.slug, kind: "sequence", label: "" });
    for (const t of c.links) {
      if (c.growsFrom.includes(t)) continue;
      const n = node(t);
      if (n && n !== c.slug) links.push({ source: c.slug, target: n, kind: "relates", label: "" });
    }
    for (const t of c.growsFrom) {
      const n = node(t);
      if (n && n !== c.slug) links.push({ source: n, target: c.slug, kind: "grows", label: "grows" });
    }
  }
  return { linkNodes: [...nodes.values()], links };
}
