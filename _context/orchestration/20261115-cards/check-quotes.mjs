// Quotation check for _content/cards (CL, Nov 15). Run from the repo root:
//   node _context/orchestration/20261115-cards/check-quotes.mjs [path to a text dump of the Slack channel]
// Reads only. For every blockquote in a card, looks for its words in the files the card lists under sources, then in
// the wider set of places Marlon's words are kept, then in the Slack dump if one is given (Slack text is not kept in
// the repo). A quotation is split at ellipses and each piece of four words or more is looked for separately.
// "own" = found in the card's own sources; "elsewhere" = found, but the card doesn't list that file; "NOT FOUND".
import { readdirSync, readFileSync, existsSync, statSync } from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";

const root = process.cwd();
const NB = path.resolve(root, "../../..");
const W11 = path.join(NB, "_context/projects/50-in-focus/ll-weeks/fall-2026/11-ending-20261120");
const matter = createRequire(path.join(root, "nextjs/package.json"))("gray-matter");
const dir = path.join(root, "_content/cards");
const NOT_CARDS = new Set(["README.md", "format.md", "convolutes.md", "views.md", "graph.md"]);

const norm = (s) =>
  s.toLowerCase().replace(/[‘’]/g, "'").replace(/[“”]/g, '"').replace(/&amp;/g, "&").replace(/[*_`>#]/g, "").replace(/\[\?\]/g, "")
    .replace(/[^a-z0-9']+/g, " ").trim();
const read = (p) => { try { return statSync(p).isFile() ? readFileSync(p, "utf8") : ""; } catch { return ""; } };
const walk = (d) => { try { return readdirSync(d, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(path.join(d, e.name)) : e.name.endsWith(".md") ? [path.join(d, e.name)] : [])); } catch { return []; } };
const resolve = (s) => {
  s = String(s).replace(/^ll-week-11:\s*/, "").split(/[ ,(]/)[0];
  if (/^https?:/.test(s)) return null;
  if (s.startsWith("NB/")) return path.join(NB, s.slice(3));
  if (s.startsWith("W11/")) return path.join(W11, s.slice(4));
  return path.join(root, s);
};
const wider = [
  ...walk(path.join(W11, "marlon")), ...walk(path.join(W11, "days")), path.join(W11, "story.md"), path.join(W11, "builds.md"), path.join(W11, "weekly-doc.md"), path.join(W11, "README.md"),
  ...walk(path.join(root, "_context/orchestration")), ...walk(path.join(root, "_content/ideas")), ...walk(path.join(root, "_content/marlon")), ...walk(path.join(root, "_content/learning")),
  ...walk(path.join(root, "_content/cards/_dictation")), ...walk(path.join(root, "_content/game")), ...walk(path.join(root, "_content/handouts")), ...walk(path.join(root, "_context/ideas-other-weeks")),
  ...walk(path.join(NB, "_context/projects/50-in-focus/william-stafford")),
].filter((p) => !p.includes("20261115-cards/board.md"));
const widerText = norm(wider.map(read).join("\n"));
const boardText = norm(read(path.join(root, "_context/orchestration/20261115-cards/board.md")));
const slackText = process.argv[2] ? norm(read(process.argv[2])) : "";

let own = 0, elsewhere = 0, slack = 0, missing = 0;
const out = [];
for (const n of readdirSync(dir).filter((n) => /^[a-z0-9][a-z0-9-]*\.md$/.test(n) && !NOT_CARDS.has(n))) {
  const { data, content } = matter(readFileSync(path.join(dir, n), "utf8"));
  const sources = (Array.isArray(data.sources) ? data.sources : [data.sources]).filter(Boolean);
  const ownText = norm(sources.map(resolve).filter(Boolean).map((p) => (existsSync(p) && statSync(p).isDirectory() ? walk(p).map(read).join("\n") : read(p))).join("\n"));
  const hasSlack = sources.some((s) => /slack\.com/.test(String(s)));
  const quotes = content.split(/\n\s*\n/).filter((b) => b.trim().startsWith(">")).map((b) => b.replace(/^\s*>\s?/gm, ""));
  for (const q of quotes) {
    for (const piece of q.split(/…|\.\.\.|\[\s*…\s*\]/).map(norm).filter((p) => p.split(" ").length >= 4)) {
      if (ownText.includes(piece)) own++;
      else if (hasSlack && slackText.includes(piece)) slack++;
      else if (widerText.includes(piece) || boardText.includes(piece)) { elsewhere++; out.push(`elsewhere  ${n.slice(0, -3)} (${data.author}): "${piece.slice(0, 90)}"`); }
      else if (slackText.includes(piece)) { elsewhere++; out.push(`in Slack, not in sources  ${n.slice(0, -3)} (${data.author}): "${piece.slice(0, 90)}"`); }
      else { missing++; out.push(`NOT FOUND  ${n.slice(0, -3)} (${data.author})${hasSlack ? " [cites Slack]" : ""}: "${piece.slice(0, 110)}"`); }
    }
  }
}
console.log(out.sort().join("\n"));
console.log(`\n${own + slack + elsewhere + missing} quoted pieces: ${own} found in the card's own files, ${slack} in the Slack dump the card cites, ${elsewhere} found only in a place the card doesn't list, ${missing} not found`);
