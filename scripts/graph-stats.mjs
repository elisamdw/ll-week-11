#!/usr/bin/env node
// The card graph, counted (KG, Nov 16): reads _content/cards/*.md the way nextjs/lib/cards.mjs does, builds the graph
// with nextjs/lib/card-graph.mjs (the same builder as /cards/graph.json), and prints the counts that
// _content/cards/graph.md reports. No dependencies: a card's frontmatter is flat (strings, numbers and inline [a, b]
// lists), so a small reader is enough, and the app doesn't have to be running. Run from anywhere:
//   node scripts/graph-stats.mjs            the counts, as text
//   node scripts/graph-stats.mjs --list     the counts, then the cards nothing points at, the chains and any broken links
//   node scripts/graph-stats.mjs --json     the counts as JSON
//   node scripts/graph-stats.mjs --graph    the whole graph as JSON, the same shape as /cards/graph.json
//   node scripts/graph-stats.mjs --convolute primer   one convolute: is it one connected piece, what does each card
//                                                      reach in the rest of the deck, and its audience, abstract, length
import { existsSync, readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { buildGraph, graphStats } from "../nextjs/lib/card-graph.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const contentRoot = path.join(root, "_content");
const cardsRoot = path.join(contentRoot, "cards");
const argv = process.argv.slice(2);
const args = new Set(argv);
const convoluteArg = argv.includes("--convolute") ? argv[argv.indexOf("--convolute") + 1] : null;

// --- reading: the same rules as lib/cards.mjs (cardFile, ref, splitAbstract, getConvolutes, outsideInfo) ---

const cardFile = (n) => /^[a-z0-9][a-z0-9-]*\.md$/.test(n) && !/^(readme|index|format|convolutes|views|graph)\.md$/i.test(n);
const ref = (v) => String(v || "").trim().replace(/^\.?\/?/, "").replace(/\.md$/, "").replace(/^cards\//, "");
const unquote = (s) => s.trim().replace(/^"(.*)"$/, "$1").replace(/^'(.*)'$/, "$1");
const read = (file) => {
  try {
    return readFileSync(file, "utf8");
  } catch {
    return null;
  }
};

function parse(text) {
  const m = text.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!m) return { data: {}, body: text };
  const data = {};
  for (const line of m[1].split(/\r?\n/)) {
    const kv = line.match(/^([A-Za-z_][\w-]*):\s*(.*)$/);
    if (!kv) continue;
    const v = kv[2].trim();
    data[kv[1]] = v.startsWith("[") ? v.replace(/^\[|\]$/g, "").split(/,(?=(?:[^"]*"[^"]*")*[^"]*$)/).map(unquote).filter(Boolean) : unquote(v);
  }
  return { data, body: text.slice(m[0].length).trim() };
}
const list = (v) => (Array.isArray(v) ? v : v ? String(v).split(/\s*,\s*/) : []).map((s) => s.trim()).filter(Boolean);

// An abstract is the body above the first line that is only "---", outside fenced code (format 1.1).
function hasAbstract(body) {
  let fenced = false;
  const lines = body.split("\n");
  for (let i = 0; i < lines.length; i++) {
    if (/^\s*(```|~~~)/.test(lines[i])) fenced = !fenced;
    if (!fenced && lines[i].trim() === "---") return lines.slice(0, i).join("\n").trim() !== "";
  }
  return false;
}

const cards = readdirSync(cardsRoot)
  .filter(cardFile)
  .map((name) => {
    const { data: d, body } = parse(readFileSync(path.join(cardsRoot, name), "utf8"));
    const order = Number(d.order);
    return { words: body.split(/\s+/).filter((w) => w && w !== "---").length, slug: name.slice(0, -3), title: d.title || name.slice(0, -3), description: d.description || "", kind: d.kind || "", convolute: d.convolute || "", tags: list(d.tags), audience: list(d.audience), follows: ref(d.follows), links: list(d.links).map(ref), voice: d.voice || "", status: d.status || "", author: d.author || "", date: d.date || "", week: d.week || "", order: d.order !== undefined && d.order !== "" && Number.isFinite(order) ? order : null, abstract: hasAbstract(body) };
  });
const slugs = new Set(cards.map((c) => c.slug));

// The convolutes table: | letter | `slug` | Title | What goes in it |
const convolutes = [];
for (const line of (read(path.join(cardsRoot, "convolutes.md")) || "").split("\n")) {
  const cells = line.trim().replace(/^\||\|$/g, "").split("|").map((c) => c.trim());
  const slug = cells[1]?.replace(/`/g, "");
  if (line.trim().startsWith("|") && /^[a-z0-9][a-z0-9-]*$/.test(slug || "") && slug !== "slug") convolutes.push({ slug, letter: cells[0], title: cells[2], description: cells[3] || "" });
}

// What a link names outside /cards: <collection>/<slug>.md, or <collection>/<slug>/README.md; a mechanic is a row of
// mechanics/mechanics.csv, with a page in mechanics/new/ when it has one.
const mechanics = new Map();
{
  const lines = (read(path.join(contentRoot, "mechanics", "mechanics.csv")) || "").replace(/^﻿/, "").split(/\r?\n/).filter(Boolean);
  const cells = (line) => [...line.matchAll(/"((?:[^"]|"")*)"|([^,]+)|(?<=,)(?=,|$)/g)].map((m) => (m[1] ?? m[2] ?? "").replace(/""/g, '"'));
  const head = lines.length ? cells(lines[0]) : [];
  const [id, name, one] = ["MechanicId", "Name", "OneLine"].map((h) => head.indexOf(h));
  for (const line of lines.slice(1)) {
    const r = cells(line);
    if (r[id]) mechanics.set(r[id], { title: r[name] || r[id], description: r[one] || "" });
  }
}
function outsideInfo(target) {
  const [collection, ...rest] = target.split("/");
  const slug = rest.join("/");
  if (collection === "mechanics" && !slug.includes("/")) {
    const page = path.join(contentRoot, "mechanics", "new", `${slug}.md`);
    const d = existsSync(page) ? parse(readFileSync(page, "utf8")).data : null;
    const row = mechanics.get(slug);
    if (d || row) return { collection, title: d?.title || row?.title || slug, description: d?.description || row?.description || "", found: true, href: d ? `/mechanics/new/${slug}` : null, file: d ? `_content/mechanics/new/${slug}.md` : "_content/mechanics/mechanics.csv" };
  }
  for (const rel of [`${collection}/${slug}.md`, `${collection}/${slug}/README.md`]) {
    const text = read(path.join(contentRoot, rel));
    if (text !== null) {
      const d = parse(text).data;
      return { collection, title: d.title || slug, description: d.description || "", found: true, href: `/${target}`, file: `_content/${rel}` };
    }
  }
  return { collection, title: slug, description: "", found: false, href: null, file: null };
}
const outside = new Map();
for (const c of cards) for (const t of c.links) if (!slugs.has(t) && t.includes("/") && !outside.has(t)) outside.set(t, outsideInfo(t));

// Links drawn by hand on /cards/graph (and its named variants), kept apart from the cards' own.
const drawn = [];
const layouts = path.join(cardsRoot, "_layouts");
if (existsSync(layouts)) {
  for (const name of readdirSync(layouts).filter((n) => /^graph(-[a-z0-9-]+)?\.json$/.test(n))) {
    try {
      for (const e of JSON.parse(readFileSync(path.join(layouts, name), "utf8")).edges || []) drawn.push({ ...e, file: `_content/cards/_layouts/${name}` });
    } catch {}
  }
}

const graph = buildGraph({ cards, convolutes, outside, drawn });
const s = graphStats(graph);

if (convoluteArg) {
  // One convolute as a piece of the graph (KG, Nov 16, for the primer): its cards, the edges among them (follows and
  // links, either way), whether they make one piece, and for each card what it reaches outside the convolute.
  const inSet = new Set(cards.filter((c) => c.convolute === convoluteArg).map((c) => c.slug));
  const bySlug = new Map(cards.map((c) => [c.slug, c]));
  const cardEdges = graph.edges.filter((e) => e.found && bySlug.has(e.source) && bySlug.has(e.target));
  const parent = new Map([...inSet].map((s) => [s, s]));
  const find = (s) => (parent.get(s) === s ? s : (parent.set(s, find(parent.get(s))), parent.get(s)));
  for (const e of cardEdges) if (inSet.has(e.source) && inSet.has(e.target)) parent.set(find(e.source), find(e.target));
  const pieces = new Map();
  for (const s of inSet) pieces.set(find(s), [...(pieces.get(find(s)) || []), s]);
  console.log(`Convolute ${convoluteArg}, ${graph.generatedAt}: ${inSet.size} cards in ${pieces.size} piece${pieces.size === 1 ? "" : "s"} (edges among its own cards only)`);
  if (pieces.size > 1) for (const p of [...pieces.values()].sort((a, b) => b.length - a.length)) console.log(`  piece of ${p.length}: ${p.join(", ")}`);
  for (const slug of [...inSet].sort()) {
    const c = bySlug.get(slug);
    const out = cardEdges.filter((e) => e.source === slug && !inSet.has(e.target));
    const into = cardEdges.filter((e) => e.target === slug && !inSet.has(e.source));
    const within = cardEdges.filter((e) => (e.source === slug && inSet.has(e.target)) || (e.target === slug && inSet.has(e.source)));
    const elsewhere = graph.edges.filter((e) => e.found && e.source === slug && !bySlug.has(e.target)).map((e) => e.target);
    const reaches = [...new Set(out.map((e) => bySlug.get(e.target).convolute))];
    const broken = graph.edges.filter((e) => !e.found && e.source === slug).map((e) => e.target);
    const flags = [broken.length && `points at nothing: ${broken.join(", ")}`, !out.length && "NO LINK INTO THE DECK", !within.length && "not linked to the rest of its convolute", !c.audience.includes("llufs") && convoluteArg === "primer" && "audience lacks llufs", !c.abstract && "no abstract", (c.words < 50 || c.words > 250) && `${c.words} words`].filter(Boolean);
    console.log(`\n${slug} (${c.author}, ${c.kind})${flags.length ? `  !! ${flags.join("; ")}` : ""}`);
    console.log(`  reaches ${out.length} deck card${out.length === 1 ? "" : "s"} in ${reaches.join(", ") || "no convolute"}; ${within.length} edge${within.length === 1 ? "" : "s"} in ${convoluteArg}; ${into.length} pointing in from the deck${elsewhere.length ? `; outside the deck: ${elsewhere.join(", ")}` : ""}`);
  }
} else if (args.has("--graph")) {
  console.log(JSON.stringify(graph, null, 2));
} else if (args.has("--json")) {
  console.log(JSON.stringify({ generatedAt: graph.generatedAt, ...s }, null, 2));
} else {
  const pairs = (o) => Object.entries(o).map(([k, v]) => `${k} ${v}`).join(", ");
  const longest = graph.chains.filter((c) => c.longest === s.chains.longest);
  console.log(`Cards graph, ${graph.generatedAt}`);
  console.log(`Nodes: ${s.cards} cards; ${s.outside.nodes} things in other collections (${pairs(s.outside.byCollection)}); ${s.outside.sharedBy2Plus} of them linked by 2+ cards`);
  console.log(`follows: ${s.follows.edges} edges (${s.follows.crossConvolute} cross a convolute)`);
  console.log(`links between cards: ${s.links.toCards} (${s.links.pairs} pairs, ${s.links.bothWays} both ways; ${s.links.crossConvolute} cross a convolute); about ${s.edgesPerCard} card edges per card`);
  console.log(`links to other collections: ${s.links.toOutside}; grows-from: ${s.growsFrom.cards} (${s.growsFrom.fromIndex} from a README); links or follows that point at nothing: ${s.links.missing}`);
  console.log(`implied link types: ${pairs(s.implied)}`);
  console.log(`shared tags: ${s.sharedTags.values} tags, ${s.sharedTags.pairs} of ${s.sharedTags.possiblePairs} card pairs; shared audience: ${s.sharedAudience.values} values, ${s.sharedAudience.pairs} pairs`);
  console.log(`Orphans: ${s.orphans.noCardEdge.length} with no follows or card link either way; ${s.orphans.noEdgeAtAll.length} with no link at all; ${s.orphans.oneCardEdge.length} with one card edge; ${s.orphans.nothingPointsAt.length} that nothing points at`);
  console.log(`Hubs (links and follows pointing in): ${pairs(s.hubs)}`);
  console.log(`Chains: ${s.chains.count} (${s.chains.cards} cards, ${s.chains.branchPoints} branch points, ${s.chains.crossConvolute} cross a convolute); longest ${s.chains.longest} cards, ${longest.length === 1 ? "once" : `${longest.length} times`}: ${longest.map((c) => c.root).join(", ")}`);
  console.log(`Components: ${s.components.count}; largest ${s.components.largest} cards; ${s.components.singletons} single cards`);
  console.log(`Tags: ${pairs(s.tags)}`);
  console.log(`Kinds: ${pairs(s.kinds)}`);
  console.log(`Voice: ${pairs(s.voices)}; status: ${pairs(s.statuses)}`);
  if (args.has("--list")) {
    const conv = new Map(cards.map((c) => [c.slug, c.convolute]));
    const show = (ids) => ids.map((id) => `  ${id} (${conv.get(id)})`).join("\n") || "  none";
    console.log(`\nOrphans:\n${show(s.orphans.noCardEdge)}`);
    console.log(`\nOne card edge:\n${show(s.orphans.oneCardEdge)}`);
    console.log(`\nNothing points at:\n${show(s.orphans.nothingPointsAt)}`);
    console.log(`\nChains:\n${graph.chains.map((c) => `  ${c.root}: ${c.cards.length} cards, longest ${c.longest}, ${c.convolutes.join(", ")}`).join("\n")}`);
    const missing = graph.edges.filter((e) => !e.found);
    if (missing.length) console.log(`\nPointing at nothing:\n${missing.map((e) => `  ${e.source} ${e.type} ${e.target}`).join("\n")}`);
    if (drawn.length) console.log(`\nDrawn on the graph, not in any card:\n${drawn.map((e) => `  ${e.source} — ${e.target} (${e.file})`).join("\n")}`);
  }
}
