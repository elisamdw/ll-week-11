// Builds ll-mechanics.csv from the pages in ll/ and technologies.csv from the
// pages in technologies/ (format.md, "The tables"). The pages are the source of
// truth; the CSVs are generated, so never edit them by hand.
//
//   node _content/mechanics/_build/ll.mjs          (from the repo root)
//   node _content/mechanics/_build/ll.mjs --check  (fail if a page breaks the format)
//
// Owner: EM. No dependencies: the frontmatter here is simple enough to read by hand.

import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const check = process.argv.includes("--check");

const SECTIONS = ["Definition", "Description", "How to", "Why to", "Home game version", "Related", "Sources"];
const PROPOSAL = "**Proposed, for Marlon to choose:**";
const STATUS = { draft: "Draft", reviewed: "Reviewed", approved: "Approved", card: "Card", "not-adopted": "Not adopted" };
const FAMILIES = ["Seeing the work", "Layering and keying", "Paper on the table", "Arranging the room", "Shared and private screens", "Taking apart and remaking", "Analog in, model out"];
const CATEGORIES = ["Cameras", "Keying", "Paper and print", "Tags and readers", "Screens", "Controllers", "Audio", "Software and models"];

const unquote = (s) => {
  s = s.trim();
  if ((s.startsWith('"') && s.endsWith('"')) || (s.startsWith("'") && s.endsWith("'"))) return s.slice(1, -1).replace(/\\"/g, '"');
  return s;
};

function frontmatter(text) {
  const m = text.match(/^---\n([\s\S]*?)\n---\n/);
  if (!m) throw new Error("no frontmatter");
  const data = {};
  let listKey = null;
  for (const line of m[1].split("\n")) {
    const item = line.match(/^\s+- (.*)$/);
    if (item && listKey) { data[listKey].push(unquote(item[1])); continue; }
    const kv = line.match(/^([a-z_]+):\s*(.*)$/);
    if (!kv) continue;
    const [, key, raw] = kv;
    listKey = null;
    if (raw === "") { data[key] = []; listKey = key; }
    else if (raw.startsWith("[")) data[key] = raw.slice(1, -1).split(",").map(unquote).filter(Boolean);
    else data[key] = unquote(raw);
  }
  return { data, body: text.slice(m[0].length) };
}

function sections(body) {
  const out = {};
  const parts = body.split(/^## /m).slice(1);
  for (const part of parts) {
    const nl = part.indexOf("\n");
    out[part.slice(0, nl).trim()] = part.slice(nl + 1).trim();
  }
  return out;
}

function homeGame(text = "") {
  const [, classroom = "", digital = ""] = text.split(/^### (?:In a regular classroom|Digitally)\s*$/m);
  return { classroom: classroom.trim(), digital: digital.trim() };
}

const problems = [];

function readPages(dir, kind) {
  return readdirSync(join(root, dir))
    .filter((f) => f.endsWith(".md") && f !== "README.md" && f !== "candidates.md")
    .sort()
    .map((file) => {
      const text = readFileSync(join(root, dir, file), "utf8");
      const { data, body } = frontmatter(text);
      const s = sections(body);
      const id = file.replace(/\.md$/, "");
      const where = `${dir}/${file}`;
      if (data.id !== id) problems.push(`${where}: id "${data.id}" is not the file name`);
      if (data.kind !== kind) problems.push(`${where}: kind "${data.kind}", expected "${kind}"`);
      for (const h of SECTIONS) if (!(h in s)) problems.push(`${where}: missing "## ${h}"`);
      const blocks = body.split(PROPOSAL).length - 1;
      if (Number(data.proposals) !== blocks) problems.push(`${where}: proposals: ${data.proposals}, but the page has ${blocks}`);
      const listed = (s.Sources || "").split("\n").filter((l) => /^\d+\. /.test(l)).length;
      if (listed !== (data.sources || []).length) problems.push(`${where}: ${data.sources?.length} sources in frontmatter, ${listed} listed`);
      if (!STATUS[data.status]) problems.push(`${where}: unknown status "${data.status}"`);
      if (kind === "ll-mechanic" && !FAMILIES.includes(data.family)) problems.push(`${where}: family "${data.family}" is not in format.md`);
      if (kind === "technology" && !CATEGORIES.includes(data.category)) problems.push(`${where}: category "${data.category}" is not in format.md`);
      return { id, data, s, home: homeGame(s["Home game version"]), page: `_content/mechanics/${where}`, blocks };
    });
}

const core = (p) => ({
  Name: p.data.title,
  Definition: p.s.Definition,
  Description: p.s.Description,
  HowTo: p.s["How to"],
  WhyTo: p.s["Why to"],
  HomeGameClassroom: p.home.classroom,
  HomeGameDigital: p.home.digital,
  RelatedMechanics: (p.data.mechanics || []).join("; "),
  RelatedTechnologies: (p.data.technologies || []).join("; "),
  RelatedGames: (p.data.games || []).join("; "),
  Sources: (p.data.sources || []).join("; "),
  Proposals: String(p.blocks),
  Status: STATUS[p.data.status] || p.data.status,
  Author: p.data.author,
  Page: p.page,
});

const cell = (v = "") => `"${String(v).replace(/"/g, '""')}"`;
function writeCsv(file, columns, rows) {
  const lines = [columns.map(cell).join(","), ...rows.map((r) => columns.map((c) => cell(r[c])).join(","))];
  writeFileSync(join(root, file), "﻿" + lines.join("\n") + "\n");
  console.log(`${file}: ${rows.length} rows`);
}

const CORE = ["Name", "Definition", "Description", "HowTo", "WhyTo", "HomeGameClassroom", "HomeGameDigital", "RelatedMechanics", "RelatedTechnologies", "RelatedGames", "Sources", "Proposals", "Status", "Author", "Page"];
const HI = ["Number", "OneLine", "ShowsIt", "TryIt", "BuildIt", "Readings", "AiAngle", "InOurGame", "Source"];

const ll = readPages("ll", "ll-mechanic");
const tech = readPages("technologies", "technology");

// LL mechanic ids share a table with the game mechanics: they must not collide.
const gameIds = new Set(
  readFileSync(join(root, "mechanics.csv"), "utf8").replace(/^﻿/, "").split("\n").slice(1)
    .map((l) => l.match(/^"([^"]*)"/)?.[1]).filter(Boolean),
);
for (const p of ll) if (gameIds.has(p.id)) problems.push(`ll/${p.id}.md: id is also a game mechanic id`);

if (problems.length) {
  console.error(problems.map((p) => `- ${p}`).join("\n"));
  if (check) process.exit(1);
}
if (check) { console.log(`ok: ${ll.length} LL mechanics, ${tech.length} technologies`); process.exit(0); }

writeCsv("ll-mechanics.csv", ["MechanicId", "Kind", "Family", ...CORE, ...HI],
  ll.map((p) => ({ MechanicId: p.id, Kind: "LL", Family: p.data.family, ...core(p) })));
writeCsv("technologies.csv", ["TechnologyId", "Category", "Tested", "TheLLHas", "Cost", ...CORE],
  tech.map((p) => ({ TechnologyId: p.id, Category: p.data.category, Tested: p.data.tested, TheLLHas: p.data.the_ll_has, Cost: p.data.cost, ...core(p) })));
