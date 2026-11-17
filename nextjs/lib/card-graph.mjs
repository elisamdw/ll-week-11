// The card graph as data (KG, Nov 16): one shape, built from the cards' frontmatter, for /cards/graph.json, the graph
// view's lenses, and scripts/graph-stats.mjs. No dependencies and no file access, so the script can import it without
// the app: callers read the files (lib/cards.mjs with gray-matter, the script with its own small reader) and pass in
//   cards       [{ slug, title, description, kind, convolute, tags, audience, follows, links, voice, status, author,
//                  date, week, order, abstract }]
//   convolutes  [{ slug, letter, title, description }], from _content/cards/convolutes.md
//   outside     Map(target → { collection, title, description, found, href, file }) for every link with a slash
//   drawn       links drawn by hand on the graph, from _content/cards/_layouts/graph*.json
// The files stay the truth; this is derived and never saved by hand. Every edge says the file it is written in (`in`).
// The design and the reasons are in _content/cards/graph.md, option 1.

export const GRAPH_FORMAT = "ll-cards-graph/0.1";

const cardPath = (slug) => `_content/cards/${slug}.md`;
const byOrder = (a, b) => (a.order ?? Infinity) - (b.order ?? Infinity) || String(a.date).localeCompare(String(b.date)) || String(a.title).localeCompare(String(b.title));
const pairKey = (a, b) => (a < b ? `${a}|${b}` : `${b}|${a}`);

// What a link means, read from the card's kind and where the link points. Derived, never typed by a writer.
//   answers         a reading card whose first link is a question card (KL's convention, Nov 16, research-questions)
//   same-as         a mechanic card's link to its own row of the mechanics table
//   plays-mechanic  a prototype or activity card's link to a mechanic
//   cites           a link to bibliography/, theory/ or history/
//   index           a link to a collection's README (the collection as a whole)
function implied(card, target, i, bySlug) {
  if (bySlug.has(target)) return card.kind === "reading" && i === 0 && bySlug.get(target).kind === "question" ? "answers" : null;
  const [collection] = target.split("/");
  if (/\/README$/i.test(target)) return "index";
  if (collection === "mechanics") return card.kind === "mechanic" && target === `mechanics/${card.slug}` ? "same-as" : ["prototype", "activity"].includes(card.kind) ? "plays-mechanic" : null;
  if (["bibliography", "theory", "history"].includes(collection)) return "cites";
  return null;
}

export function buildGraph({ cards, convolutes = [], outside = new Map(), drawn = [], generatedAt = new Date().toISOString() }) {
  const bySlug = new Map(cards.map((c) => [c.slug, c]));
  const nodes = cards.map((c) => ({
    id: c.slug,
    type: "card",
    file: cardPath(c.slug),
    href: `/cards/${c.slug}`,
    title: c.title,
    description: c.description,
    kind: c.kind,
    convolute: c.convolute,
    tags: c.tags,
    audience: c.audience,
    voice: c.voice,
    status: c.status,
    author: c.author,
    date: c.date,
    week: c.week,
    ...(c.order != null ? { order: c.order } : {}),
    hasAbstract: Boolean(c.abstract),
  }));
  const edges = [];
  const linkedBy = new Map();
  for (const c of cards) {
    const file = cardPath(c.slug);
    if (c.follows) edges.push({ source: c.slug, target: c.follows, type: "follows", found: bySlug.has(c.follows) && c.follows !== c.slug, in: file });
    const growsFrom = c.links.find((t) => t.includes("/"));
    c.links.forEach((t, i) => {
      if (t === c.slug) return;
      const card = bySlug.has(t);
      const found = card || Boolean(outside.get(t)?.found);
      const meaning = implied(c, t, i, bySlug);
      edges.push({ source: c.slug, target: t, type: t === growsFrom ? "grows-from" : "links", ...(meaning ? { implied: meaning } : {}), found, in: file });
      if (!card && found) linkedBy.set(t, new Set([...(linkedBy.get(t) || []), c.slug]));
    });
  }
  for (const [t, info] of outside) {
    if (!info.found) continue;
    nodes.push({ id: t, type: "outside", collection: info.collection, file: info.file || null, href: info.href || null, title: info.title, description: info.description || "", linkedBy: linkedBy.get(t)?.size || 0 });
  }
  return {
    format: GRAPH_FORMAT,
    generatedAt,
    source: "_content/cards/*.md (frontmatter); this file is derived: rebuild it, don't edit it",
    convolutes,
    nodes,
    edges,
    drawn: drawn.map(({ source, target, label, type, file }) => ({ source, target, label: label || "", type: type || "relates", in: file })),
    chains: chainsOf(cards, bySlug),
  };
}

// The chains: every tree of follows with two or more cards, from its first card, depth first, continuations by order
// then date then title (as lib/cards.mjs chainOf). depth is the distance from the first card; branch counts the
// continuations taken after the first at any card, so a card on the main line has branch 0.
export function chainsOf(cards, bySlug = new Map(cards.map((c) => [c.slug, c]))) {
  const children = new Map();
  for (const c of cards) if (c.follows && bySlug.has(c.follows) && c.follows !== c.slug) children.set(c.follows, [...(children.get(c.follows) || []), c]);
  for (const list of children.values()) list.sort(byOrder);
  const roots = cards.filter((c) => children.has(c.slug) && !(c.follows && bySlug.has(c.follows) && c.follows !== c.slug)).sort(byOrder);
  const seen = new Set();
  return roots
    .map((root) => {
      const out = [];
      let branches = 0;
      const walk = (c, depth, branch) => {
        if (seen.has(c.slug)) return;
        seen.add(c.slug);
        out.push({ slug: c.slug, depth, branch });
        (children.get(c.slug) || []).forEach((n, i) => walk(n, depth + 1, i === 0 ? branch : ++branches));
      };
      walk(root, 0, 0);
      const longest = Math.max(...out.map((x) => x.depth)) + 1;
      return { root: root.slug, title: root.title, cards: out, longest, convolutes: [...new Set(out.map((x) => bySlug.get(x.slug).convolute))] };
    })
    .sort((a, b) => b.longest - a.longest || b.cards.length - a.cards.length);
}

// The counts in _content/cards/graph.md, from a built graph.
export function graphStats(graph) {
  const cards = graph.nodes.filter((n) => n.type === "card");
  const bySlug = new Map(cards.map((c) => [c.id, c]));
  const isCard = (id) => bySlug.has(id);
  const follows = graph.edges.filter((e) => e.type === "follows" && e.found);
  const toCards = graph.edges.filter((e) => e.type !== "follows" && isCard(e.target));
  const toOutside = graph.edges.filter((e) => e.type !== "follows" && !isCard(e.target) && e.found);
  const missing = graph.edges.filter((e) => !e.found);
  const crosses = (es) => es.filter((e) => bySlug.get(e.source).convolute !== bySlug.get(e.target).convolute).length;
  const pairs = new Set(toCards.map((e) => pairKey(e.source, e.target)));
  const directed = new Set(toCards.map((e) => `${e.source}>${e.target}`));
  const both = [...pairs].filter((k) => {
    const [a, b] = k.split("|");
    return directed.has(`${a}>${b}`) && directed.has(`${b}>${a}`);
  }).length;

  const outsideNodes = graph.nodes.filter((n) => n.type === "outside");
  const byCollection = {};
  for (const n of outsideNodes) byCollection[n.collection] = (byCollection[n.collection] || 0) + 1;

  const degree = new Map(cards.map((c) => [c.id, 0]));
  const inbound = new Map(cards.map((c) => [c.id, 0]));
  for (const e of [...follows, ...toCards]) {
    degree.set(e.source, degree.get(e.source) + 1);
    degree.set(e.target, degree.get(e.target) + 1);
    inbound.set(e.target, inbound.get(e.target) + 1);
  }
  const outsideFrom = new Set(toOutside.map((e) => e.source));
  const orphans = cards.filter((c) => degree.get(c.id) === 0).map((c) => c.id);

  // Weakly connected components over card edges.
  const parent = new Map(cards.map((c) => [c.id, c.id]));
  const find = (s) => (parent.get(s) === s ? s : (parent.set(s, find(parent.get(s))), parent.get(s)));
  for (const e of [...follows, ...toCards]) parent.set(find(e.source), find(e.target));
  const comps = new Map();
  for (const c of cards) comps.set(find(c.id), (comps.get(find(c.id)) || 0) + 1);
  const sizes = [...comps.values()].sort((a, b) => b - a);

  const sharing = (field) => {
    const holders = new Map();
    for (const c of cards) for (const v of c[field] || []) holders.set(v, [...(holders.get(v) || []), c.id]);
    const set = new Set();
    for (const ids of holders.values()) for (let i = 0; i < ids.length; i++) for (let j = i + 1; j < ids.length; j++) set.add(pairKey(ids[i], ids[j]));
    return { values: holders.size, pairs: set.size };
  };
  const tally = (list) => Object.fromEntries(Object.entries(list.reduce((m, v) => ((m[v || "(none)"] = (m[v || "(none)"] || 0) + 1), m), {})).sort((a, b) => b[1] - a[1]));
  const chains = graph.chains;

  return {
    cards: cards.length,
    outside: { nodes: outsideNodes.length, byCollection: Object.fromEntries(Object.entries(byCollection).sort((a, b) => b[1] - a[1])), sharedBy2Plus: outsideNodes.filter((n) => n.linkedBy >= 2).length },
    follows: { edges: follows.length, crossConvolute: crosses(follows) },
    links: { toCards: toCards.length, pairs: pairs.size, bothWays: both, crossConvolute: crosses(toCards), toOutside: toOutside.length, missing: missing.length },
    growsFrom: { cards: graph.edges.filter((e) => e.type === "grows-from" && e.found).length, fromIndex: graph.edges.filter((e) => e.type === "grows-from" && e.implied === "index").length },
    implied: tally(graph.edges.filter((e) => e.implied).map((e) => e.implied)),
    orphans: { noCardEdge: orphans, noEdgeAtAll: orphans.filter((id) => !outsideFrom.has(id)), oneCardEdge: cards.filter((c) => degree.get(c.id) === 1).map((c) => c.id), nothingPointsAt: cards.filter((c) => inbound.get(c.id) === 0).map((c) => c.id) },
    hubs: Object.fromEntries([...inbound].sort((a, b) => b[1] - a[1]).slice(0, 10)),
    edgesPerCard: cards.length ? Math.round(((follows.length + pairs.size) * 2 * 10) / cards.length) / 10 : 0,
    components: { count: sizes.length, largest: sizes[0] || 0, singletons: sizes.filter((n) => n === 1).length },
    chains: { count: chains.length, cards: chains.reduce((n, c) => n + c.cards.length, 0), branchPoints: Object.values(tally(follows.map((e) => e.target))).filter((n) => n > 1).length, crossConvolute: chains.filter((c) => c.convolutes.length > 1).length, longest: chains[0]?.longest || 0, longestFrom: chains.filter((c) => c.longest === chains[0]?.longest).map((c) => c.root) },
    sharedTags: { ...sharing("tags"), possiblePairs: (cards.length * (cards.length - 1)) / 2 },
    sharedAudience: sharing("audience"),
    tags: tally(cards.flatMap((c) => c.tags || [])),
    kinds: tally(cards.map((c) => c.kind)),
    voices: tally(cards.map((c) => c.voice)),
    statuses: tally(cards.map((c) => c.status)),
    convolutes: tally(cards.map((c) => c.convolute)),
  };
}

// The convolutes as a graph (the convolute lens): one node per convolute with its card count, and one edge per pair
// of convolutes with the follows and links that cross between them, both ways counted together.
export function convoluteGraph(graph) {
  const cards = new Map(graph.nodes.filter((n) => n.type === "card").map((n) => [n.id, n]));
  const counts = new Map();
  for (const c of cards.values()) counts.set(c.convolute, (counts.get(c.convolute) || 0) + 1);
  const pairs = new Map();
  for (const e of graph.edges) {
    if (!cards.has(e.source) || !cards.has(e.target) || !e.found) continue;
    const [a, b] = [cards.get(e.source).convolute, cards.get(e.target).convolute];
    if (a === b) continue;
    const k = pairKey(a, b);
    const p = pairs.get(k) || { a: a < b ? a : b, b: a < b ? b : a, links: 0, follows: 0, cards: new Set() };
    p[e.type === "follows" ? "follows" : "links"] += 1;
    p.cards.add(e.source).add(e.target);
    pairs.set(k, p);
  }
  const order = new Map(graph.convolutes.map((c, i) => [c.slug, i]));
  return {
    nodes: [...counts].map(([slug, cardCount]) => ({ slug, cards: cardCount, ...(graph.convolutes.find((c) => c.slug === slug) || { title: slug }) })).sort((x, y) => (order.get(x.slug) ?? 99) - (order.get(y.slug) ?? 99)),
    edges: [...pairs.values()].map((p) => ({ ...p, total: p.links + p.follows, cards: [...p.cards] })).sort((x, y) => y.total - x.total),
  };
}
