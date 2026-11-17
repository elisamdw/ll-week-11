// Review check for _content/cards (CL, Nov 15). Run from the repo root:
//   node _context/orchestration/20261115-cards/check-cards.mjs          problems, then counts
//   node _context/orchestration/20261115-cards/check-cards.mjs --counts  counts only (for the board)
// Reads only. Checks each card against _content/cards/format.md v1.0: required fields, allowed values, a convolute
// from convolutes.md, links and follows that point at something real, 50 to 1,000 body words, a sourced blockquote
// where voice says there are Marlon's words. Cards need not quote Marlon (his word, Nov 15); the old anchor rule is
// now only a count.
import { readdirSync, readFileSync, existsSync } from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";

const root = process.cwd();
const matter = createRequire(path.join(root, "nextjs/package.json"))("gray-matter");
const content = path.join(root, "_content");
const dir = path.join(content, "cards");
const NOT_CARDS = new Set(["README.md", "format.md", "convolutes.md", "views.md", "graph.md"]);
const KINDS = ["idea", "fragment", "aphorism", "question", "mechanic", "activity", "prototype", "reading"];
const VOICES = ["marlon", "mixed", "drafted"];
const STATUSES = ["seed", "draft", "ready"];
const AUDIENCES = ["tdm155ai", "stafford", "llufs", "ll", "faculty"];
const AUTHORS = ["CL", "CI", "CM", "CD", "KL", "KB", "KR", "KP", "KG", "KD", "marlon"];
const REQUIRED = ["title", "description", "kind", "convolute", "tags", "sources", "voice", "author", "date", "week", "status"];

const convolutes = [...readFileSync(path.join(dir, "convolutes.md"), "utf8").matchAll(/^\| [A-Z] \| `([a-z0-9-]+)`/gm)].map((m) => m[1]);
const mechanicIds = new Set(
  readFileSync(path.join(content, "mechanics/mechanics.csv"), "utf8").split("\n").slice(1).map((l) => (l.match(/^"([^"]+)"/) || [])[1]).filter(Boolean),
);
const list = (v) => (Array.isArray(v) ? v.map(String) : v == null || v === "" ? [] : [String(v)]);
const words = (s) => (s.trim().match(/\S+/g) || []).length;

const cards = readdirSync(dir)
  .filter((n) => /^[a-z0-9][a-z0-9-]*\.md$/.test(n) && !NOT_CARDS.has(n))
  .map((n) => {
    const { data, content: body } = matter(readFileSync(path.join(dir, n), "utf8"));
    const quoted = body.split("\n").filter((l) => l.startsWith(">")).join(" ").replace(/^>\s?/gm, "");
    return { slug: n.slice(0, -3), data, body, words: words(body), quotedWords: words(quoted.replace(/>/g, " ")) };
  });
const bySlug = new Map(cards.map((c) => [c.slug, c]));
const problems = [];
const unanchored = []; // drafted cards with no link to a card of Marlon's: a count, not a problem (he may base a card on other sources)
const say = (c, msg) => problems.push(`${c.slug} (${c.data.author || "?"}): ${msg}`);

const resolves = (link) => {
  if (!link.includes("/")) return bySlug.has(link);
  if (link.startsWith("mechanics/") && link.split("/").length === 2) return mechanicIds.has(link.slice(10)) || existsSync(path.join(content, "mechanics/new", `${link.slice(10)}.md`)) || existsSync(path.join(content, `${link}.md`));
  return existsSync(path.join(content, `${link}.md`)) || existsSync(path.join(content, link, "README.md"));
};

for (const c of cards) {
  const d = c.data;
  if (c.slug.length > 60) say(c, "slug over 60 characters");
  for (const f of REQUIRED) if (d[f] == null || d[f] === "" || (Array.isArray(d[f]) && !d[f].length)) say(c, `missing ${f}`);
  if (d.kind && !KINDS.includes(d.kind)) say(c, `kind "${d.kind}" is not one of the eight`);
  if (d.convolute && !convolutes.includes(d.convolute)) say(c, `convolute "${d.convolute}" is not in convolutes.md`);
  if (d.voice && !VOICES.includes(d.voice)) say(c, `voice "${d.voice}"`);
  if (d.status && !STATUSES.includes(d.status)) say(c, `status "${d.status}"`);
  if (d.author && !AUTHORS.includes(d.author)) say(c, `author "${d.author}" should be a pane ID`);
  for (const a of list(d.audience)) if (!AUDIENCES.includes(a)) say(c, `audience "${a}"`);
  if (d.audience != null && !Array.isArray(d.audience)) say(c, "audience should be a list");
  if (d.follows != null) {
    if (typeof d.follows !== "string") say(c, "follows takes one slug");
    else if (!bySlug.has(d.follows)) say(c, `follows "${d.follows}" is not a card`);
    else if (d.follows === c.slug) say(c, "follows itself");
  }
  for (const l of list(d.links)) {
    if (/^https?:|\.md$/.test(l)) say(c, `link "${l}" is a URL or has .md; URLs go in sources`);
    else if (!resolves(l)) say(c, `link "${l}" points at nothing`);
  }
  if (c.words < 50) say(c, `${c.words} words (under 50)`);
  if (c.words > 1000) say(c, `${c.words} words (over 1,000)`);
  if (/^#\s/m.test(c.body)) say(c, "has a # heading");
  const rules = c.body.split("\n").filter((l) => /^\s*(---+|\*\*\*+|___+)\s*$/.test(l)).length;
  if (rules > 1) say(c, "more than one horizontal rule (only the abstract's divider is allowed)");
  if (rules === 1) {
    const abstract = words(c.body.split(/^\s*---+\s*$/m)[0]);
    if (abstract < 15 || abstract > 110) say(c, `abstract is ${abstract} words (about 25 to 80)`);
  }
  if ((d.voice === "marlon" || d.voice === "mixed") && !c.quotedWords) say(c, `voice ${d.voice} but no blockquote`);
  if (d.voice === "drafted" && c.quotedWords === 0) {
    const anchored = list(d.links).concat(typeof d.follows === "string" ? [d.follows] : []).some((l) => bySlug.get(l) && ["marlon", "mixed"].includes(bySlug.get(l).data.voice));
    if (!anchored) unanchored.push(c.slug);
  }
  if (/\b(genuinely|really|actually|truly|honestly)\b/i.test(c.body.split("\n").filter((l) => !l.startsWith(">")).join("\n").replace(/"[^"]*"|“[^”]*”/g, ""))) say(c, "an intensifier outside a quotation");
}
// follows loops
for (const c of cards) {
  const seen = new Set([c.slug]);
  let at = c;
  while (typeof at.data.follows === "string" && bySlug.has(at.data.follows)) {
    at = bySlug.get(at.data.follows);
    if (seen.has(at.slug)) { say(c, "follows chain loops"); break; }
    seen.add(at.slug);
  }
}

const tally = (key) => {
  const t = {};
  for (const c of cards) for (const v of list(typeof key === "function" ? key(c) : c.data[key])) t[v] = (t[v] || 0) + 1;
  return Object.entries(t).sort((a, b) => b[1] - a[1]).map(([k, n]) => `${k} ${n}`).join(" · ");
};
if (!process.argv.includes("--counts")) {
  console.log(problems.length ? problems.sort().join("\n") : "No problems.");
  console.log("");
}
const total = cards.reduce((n, c) => n + c.words, 0);
const his = cards.reduce((n, c) => n + c.quotedWords, 0);
console.log(`${cards.length} cards, ${total} words; ${his} of them (${total ? Math.round((100 * his) / total) : 0}%) in blockquotes; ${problems.length} problems in ${new Set(problems.map((p) => p.split(" ")[0])).size} cards`);
console.log(`by convolute: ${tally("convolute")}`);
console.log(`empty convolutes: ${convolutes.filter((s) => !cards.some((c) => c.data.convolute === s)).join(", ") || "none"}`);
console.log(`by kind: ${tally("kind")}`);
console.log(`by voice: ${tally("voice")}`);
console.log(`drafted cards with no link to a card carrying Marlon's words: ${unanchored.length}${unanchored.length ? ` (${unanchored.join(", ")})` : ""}`);
console.log(`by status: ${tally("status")}`);
console.log(`with an abstract: ${cards.filter((c) => /^\s*---+\s*$/m.test(c.body)).length} of ${cards.length}`);
console.log(`by author: ${tally("author")}`);
console.log(`by audience: ${tally("audience")}`);
