// Builds the game-mechanics inventory and the games table, in the entry format of ../format.md (v1.0, Nov 17):
//   _content/mechanics/mechanics.csv   one row per game mechanic (HI's Nov 14 fields, then the format's core columns)
//   _content/mechanics/gm/<id>.md      one page per GM card (GM's 50)
//   _content/mechanics/new/<id>.md     one page per other mechanic (HI's 55 and EG's additions; paths fixed, others link to them)
//   _content/mechanics/games.csv       one row per game named as an example
//   _content/mechanics/games/<id>.md   one page per game
// GM's 50 cards are read from The Notebook (apps/tdm155ai/tdm155ai-week-11/game-mechanics/cards/), never edited.
// Run from anywhere: node _content/mechanics/_build/build.mjs
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const mechanics = path.resolve(here, "..");
const repo = path.resolve(mechanics, "../..");
const notebook = path.resolve(repo, "../../..");
const cardsDir = path.join(notebook, "apps/tdm155ai/tdm155ai-week-11/game-mechanics/cards");
const bibliography = path.join(repo, "_content/bibliography");
const technologiesDir = path.join(mechanics, "technologies");

const read = (file) => JSON.parse(fs.readFileSync(path.join(here, file), "utf8"));
const extras = read("gm-extras.json");
const added = read("new-mechanics.json").mechanics;
const egAdded = read("eg-mechanics.json").mechanics;
const entries = read("definitions.json").mechanics;
const gamesData = read("games.json").games;
const readingIds = read("readings.json");

const EG = "EG (Claude Code 10549f6d-2ac5-41cc-9ae5-5682cc105485, started in ll-week-11 on FAS-DDW32PXW5L)";
const HI = "HI (Claude Code edf29cc8-f1a0-4b6a-a0a5-7a9ca74f4450)";
const PROPOSED = "**Proposed, for Marlon to choose:**";
const NOT_YET = "*Not written yet.*";

// GM's frontmatter is flat key: value lines; sources is a JSON-style list.
function frontmatter(text) {
  const block = text.split(/^---\s*$/m)[1] || "";
  const data = {};
  for (const line of block.split("\n")) {
    const m = line.match(/^(\w+):\s*(.*)$/);
    if (!m) continue;
    let value = m[2].trim();
    if (value.startsWith("[")) value = JSON.parse(value);
    else if (value.startsWith('"')) value = JSON.parse(value);
    data[m[1]] = value;
  }
  return data;
}

const known = fs.existsSync(bibliography) ? new Set(fs.readdirSync(bibliography).filter((f) => f.endsWith(".md")).map((f) => f.slice(0, -3))) : null;
const missing = new Set();
function readings(keys = []) {
  return keys.map((key) => {
    const id = readingIds[key];
    if (!id) throw new Error(`Unknown reading key ${key}`);
    if (known && !known.has(id)) missing.add(id);
    return id;
  });
}

const rows = [];
for (const file of fs.readdirSync(cardsDir).filter((f) => f.endsWith(".md")).sort()) {
  const card = frontmatter(fs.readFileSync(path.join(cardsDir, file), "utf8"));
  const extra = extras[String(card.number)];
  if (!extra) throw new Error(`No HI extras for GM card ${card.number}`);
  rows.push({
    MechanicId: file.replace(/^\d+-/, "").replace(/\.md$/, ""),
    Number: card.number,
    Name: card.title,
    Family: card.family,
    OneLine: card.one_line,
    ShowsIt: card.shows_it,
    TryIt: card.try_it,
    BuildIt: card.build_it,
    Readings: readings(extra.readings),
    AiAngle: extra.aiAngle,
    InOurGame: extra.inOurGame,
    Source: `GM card ${card.number} (tdm155ai-week-11, Nov 13)${card.sources?.length ? `; ${card.sources.join("; ")}` : ""}`,
    Status: "Card",
    _origin: { file: `NB/apps/tdm155ai/tdm155ai-week-11/game-mechanics/cards/${file}`, who: "GM's card", author: `GM (card, Nov 13, wording unchanged); ${HI} (AiAngle, InOurGame, Readings, Nov 14); ${EG} (definition, description, related, Nov 17)` },
  });
}
const fromJson = (list, start, file, who, author) =>
  list.forEach((m, i) => {
    rows.push({
      MechanicId: m.id,
      Number: start + i,
      Name: m.name,
      Family: m.family,
      OneLine: m.oneLine,
      ShowsIt: m.showsIt,
      TryIt: m.tryIt,
      BuildIt: m.buildIt,
      Readings: readings(m.readings),
      AiAngle: m.aiAngle,
      InOurGame: m.inOurGame,
      Source: m.source,
      Status: m.status || "Draft",
      _origin: { file: `_content/mechanics/_build/${file}`, who, author },
    });
  });
fromJson(added, 51, "new-mechanics.json", "HI's row", `${HI}, Nov 14 (one line, shows it, try it, build it, with AI, in our game); ${EG}, Nov 17 (definition, description, related)`);
fromJson(egAdded, 51 + added.length, "eg-mechanics.json", "EG's row", `${EG}, Nov 17`);

const ids = new Set();
for (const row of rows) {
  if (ids.has(row.MechanicId)) throw new Error(`Duplicate MechanicId ${row.MechanicId}`);
  ids.add(row.MechanicId);
}
for (const id of Object.keys(entries)) if (!ids.has(id)) throw new Error(`definitions.json has ${id}, which is not a mechanic`);

// The week's prototypes (/proto) are games the LL has in hand: one row each, read from their frontmatter (never edited).
const prototypesDir = path.join(repo, "_content/prototypes");
for (const family of fs.readdirSync(prototypesDir, { withFileTypes: true }).filter((d) => d.isDirectory())) {
  for (const file of fs.readdirSync(path.join(prototypesDir, family.name)).filter((f) => f.endsWith(".md")).sort()) {
    const fm = frontmatter(fs.readFileSync(path.join(prototypesDir, family.name, file), "utf8"));
    const slug = file.slice(0, -3);
    const page = `_content/prototypes/${family.name}/${file}`;
    const maker = String(fm.author || "").match(/\((\w+), Claude Code/)?.[1];
    gamesData.push({
      id: `proto-${slug}`,
      name: `${fm.title} (prototype)`,
      year: 2026,
      designer: `The LL${maker ? ` (${maker}, Claude Code)` : ""}, Nov 15`,
      form: "LL-made",
      whereToGet: `http://localhost:3111${fm.route || `/proto/${family.name}/${slug}`}`,
      definition: fm.description,
      definitionSources: [page],
      inTheLL: [{ text: "One of the week 11 prototypes of game mechanics (Nov 15, 2026), for TDM 155AI on Nov 18, William Stafford's workshop on Nov 23 and the LLUFs.", sources: ["_content/prototypes/README.md"] }],
      howTo: `Run the reader app and open \`${fm.route || `/proto/${family.name}/${slug}`}\`; its tuning values are at the top of its main file in \`nextjs/app/proto/${family.name}/${slug}/\`.`,
      related: { mechanics: (Array.isArray(fm.mechanics) ? fm.mechanics : []).filter((m) => rows.some((r) => r.MechanicId === m)) },
      _prototypeMechanics: Array.isArray(fm.mechanics) ? fm.mechanics : [],
    });
  }
}
const games = new Map(gamesData.map((g) => [g.id, g]));
if (games.size !== gamesData.length) throw new Error("Duplicate GameId in games.json");
const technologyIds = fs.existsSync(technologiesDir) ? new Set(fs.readdirSync(technologiesDir).filter((f) => f.endsWith(".md")).map((f) => f.slice(0, -3))) : new Set();
const unknownTechnologies = new Set();
// EM's pages: only the title line is read (their lists are YAML, not JSON).
const technologyName = (t) => {
  if (!technologyIds.has(t)) return t;
  const m = fs.readFileSync(path.join(technologiesDir, `${t}.md`), "utf8").match(/^title:\s*"?(.*?)"?\s*$/m);
  return m ? m[1] : t;
};

const pageOf = (row) => (row.Status === "Card" ? `gm/${row.MechanicId}.md` : `new/${row.MechanicId}.md`);
const byId = new Map(rows.map((r) => [r.MechanicId, r]));

// A page's numbered source list; cite() adds a source once and returns its [n].
function sourceList() {
  const list = [];
  const cite = (source) => {
    if (!source) return "";
    let i = list.indexOf(source);
    if (i < 0) i = list.push(source) - 1;
    return `[${i + 1}]`;
  };
  return { list, cite, cites: (sources = []) => (sources.length ? ` ${sources.map(cite).join("")}` : "") };
}
const sourceLine = (s) => (/^https?:/.test(s) ? `<${s}>` : known?.has(s) ? `\`${s}\` ([bibliography](../../bibliography/${s}.md))` : `\`${s}\``);
const countProposals = (...texts) => texts.join("\n").split(PROPOSED).length - 1;
const proposalBlock = (options) => `${PROPOSED}\n\n${options.map((o, i) => `${i + 1}. ${o}`).join("\n")}`;
// A part is plain text, a list of proposal options ({ proposals: [...] }), or both ({ text, sources, proposals }).
const part = (value, cites = () => "") => {
  if (!value) return NOT_YET;
  if (typeof value === "string") return value;
  return [value.text ? `${value.text}${cites(value.sources)}` : "", value.proposals?.length ? proposalBlock(value.proposals) : ""].filter(Boolean).join("\n\n");
};
const gameLink = (id, from) => `[${games.get(id).name}](${from}games/${id}.md)`;

const examplesByGame = new Map();
for (const row of rows) {
  const entry = entries[row.MechanicId] || {};
  const { list, cite, cites } = sourceList();
  cite(row._origin.file);
  const definition = entry.definition || "";
  const definitionPart = [
    definition ? `${definition}${cites(entry.definitionSources)}` : NOT_YET,
    `${row._origin.who === "GM's card" ? "On GM's card" : `In one line (${row._origin.who})`}: "${row.OneLine}" [1]`,
  ].join("\n\n");

  const exampleGames = [];
  const exampleLines = (entry.examples || []).map((ex) => {
    if (!games.has(ex.game)) throw new Error(`${row.MechanicId}: example game ${ex.game} is not in games.json`);
    exampleGames.push(ex.game);
    if (!examplesByGame.has(ex.game)) examplesByGame.set(ex.game, []);
    examplesByGame.get(ex.game).push({ id: row.MechanicId, does: ex.does, sources: ex.sources || [] });
    const checked = ex.sources?.length ? cites(ex.sources) : " (not yet checked against a source)";
    return `- **${gameLink(ex.game, "../")}**: ${ex.does}${checked}`;
  });
  const checkedCount = (entry.examples || []).filter((ex) => ex.sources?.length).length;
  const examplesChecked = !entry.examples?.length ? "" : checkedCount === entry.examples.length ? "yes" : checkedCount ? `partly (${checkedCount} of ${entry.examples.length})` : "no";

  const description = [
    entry.description ? `${entry.description}${cites(entry.descriptionSources)}` : "",
    exampleLines.length ? `In games:\n\n${exampleLines.join("\n")}` : "",
    `**Shows it** (${row._origin.who}): ${row.ShowsIt} [1]`,
    `**With AI** (${row._origin.who === "GM's card" ? "HI" : row._origin.who}): ${row.AiAngle} [1]`,
    `**In our game** (Nov 14 rulesets): ${row.InOurGame} [1]`,
  ]
    .filter(Boolean)
    .join("\n\n");
  const howTo = [`**Try it in two minutes** (${row._origin.who}): ${row.TryIt} [1]`, `**Build it** (${row._origin.who}): ${row.BuildIt} [1]`, entry.howTo ? part(entry.howTo, cites) : ""].filter(Boolean).join("\n\n");
  const whyTo = part(entry.whyTo, cites);
  const homeClassroom = part(entry.homeClassroom, cites);
  const homeDigital = part(entry.homeDigital, cites);

  const relatedMechanics = [...new Set(entry.related?.mechanics || [])];
  for (const m of relatedMechanics) if (!byId.has(m)) throw new Error(`${row.MechanicId}: related mechanic ${m} not found`);
  const relatedTechnologies = [...new Set(entry.related?.technologies || [])];
  for (const t of relatedTechnologies) if (!technologyIds.has(t)) unknownTechnologies.add(t);
  // Reverse links: games (the prototypes among them) that name this mechanic.
  const namedBy = gamesData.filter((g) => g.related?.mechanics?.includes(row.MechanicId)).map((g) => g.id);
  const relatedGames = [...new Set([...exampleGames, ...(entry.related?.games || []), ...namedBy])];
  for (const r of row.Readings) cite(r);
  for (const s of entry.sources || []) cite(s);

  const relatedLines = [
    ...relatedMechanics.map((m) => `- [${byId.get(m).Name}](../${pageOf(byId.get(m))}) (mechanic): ${entry.relatedNotes?.[m] || byId.get(m).OneLine}`),
    ...relatedTechnologies.map((t) => `- [${technologyName(t)}](../technologies/${t}.md) (technology)${entry.relatedNotes?.[t] ? `: ${entry.relatedNotes[t]}` : ""}`),
    ...relatedGames.map((g) => `- ${gameLink(g, "../")} (game)`),
    ...row.Readings.map((r) => `- [${r}](../../bibliography/${r}.md) (reading)`),
  ];
  const proposals = countProposals(whyTo, homeClassroom, homeDigital, howTo);

  Object.assign(row, {
    Kind: "Game",
    Definition: definition,
    Description: description,
    HowTo: howTo,
    WhyTo: whyTo,
    HomeGameClassroom: homeClassroom,
    HomeGameDigital: homeDigital,
    RelatedMechanics: relatedMechanics.join("; "),
    RelatedTechnologies: relatedTechnologies.join("; "),
    RelatedGames: relatedGames.join("; "),
    Sources: list.join("; "),
    Proposals: proposals,
    Author: row._origin.author,
    Page: `_content/mechanics/${pageOf(row)}`,
    ExamplesChecked: examplesChecked,
    Readings: row.Readings.join("; "),
  });
  row._page = { relatedLines, list, relatedMechanics, relatedTechnologies, relatedGames, definitionPart };
}

// RFC 4180 CSV with a header row of Airtable field names; every field quoted; UTF-8 with a BOM so Excel opens it cleanly.
const quote = (value) => `"${String(value ?? "").replace(/"/g, '""')}"`;
function writeCsv(file, list) {
  const fields = Object.keys(list[0]).filter((f) => !f.startsWith("_"));
  const csv = [fields.map(quote).join(","), ...list.map((row) => fields.map((f) => quote(row[f])).join(","))].join("\r\n") + "\r\n";
  fs.writeFileSync(path.join(mechanics, file), "﻿" + csv);
}
writeCsv("mechanics.csv", rows);

const yaml = (value) => JSON.stringify(value);
const sourcesSection = (list) => list.map((s, i) => `${i + 1}. ${sourceLine(s)}`).join("\n");
for (const dir of ["gm", "new"]) fs.mkdirSync(path.join(mechanics, dir), { recursive: true });
for (const row of rows) {
  const p = row._page;
  const md = `---
title: ${yaml(row.Name)}
description: ${yaml(row.Definition || row.OneLine)}
id: ${row.MechanicId}
order: ${row.Number}
kind: mechanic
family: ${yaml(row.Family)}
status: ${{ Card: "card", Draft: "draft", "Not adopted": "not-adopted" }[row.Status]}
author: ${yaml(`${row.Author}; generated by _build/build.mjs`)}
sources: ${yaml(p.list)}
mechanics: ${yaml(p.relatedMechanics)}
technologies: ${yaml(p.relatedTechnologies)}
games: ${yaml(p.relatedGames)}
proposals: ${row.Proposals}
examples_checked: ${yaml(row.ExamplesChecked)}
number: ${row.Number}
readings: ${yaml(row.Readings ? row.Readings.split("; ") : [])}
in_our_game: ${yaml(row.InOurGame)}
source: ${yaml(row.Source)}
---

# ${row.Name}

## Definition

${p.definitionPart}

## Description

${row.Description}

## How to

${row.HowTo}

## Why to

${row.WhyTo}

## Home game version

### In a regular classroom

${row.HomeGameClassroom}

### Digitally

${row.HomeGameDigital}

## Related

${p.relatedLines.length ? p.relatedLines.join("\n") : "None yet."}

## Sources

${sourcesSection(p.list)}

*${row.Family} · ${row.Number} · ${row.Status === "Card" ? "GM's card" : `from ${row.Source}`}*
`;
  fs.writeFileSync(path.join(mechanics, pageOf(row)), md);
}

// The games table: every game named as an example, plus the games the LL has in hand this week.
const gameRows = gamesData.map((g) => {
  const { list, cite, cites } = sourceList();
  for (const s of g.sources || []) cite(s);
  const shown = (examplesByGame.get(g.id) || []).map((ex) => {
    const row = byId.get(ex.id);
    return `- **[${row.Name}](../${pageOf(row)})**: ${ex.does}${ex.sources.length ? cites(ex.sources) : " (not yet checked against a source)"}`;
  });
  const inTheLL = (g.inTheLL || []).map((x) => `${x.text}${cites(x.sources)}`).join("\n\n");
  const definition = g.definition ? `${g.definition}${cites(g.definitionSources)}` : "";
  const description = [
    g.description ? `${g.description}${cites(g.descriptionSources)}` : "",
    [g.designer && `**Made by:** ${g.designer}`, g.year && `**Year:** ${g.year}`, g.form && `**Form:** ${g.form}`].filter(Boolean).join(" · "),
    shown.length ? `Mechanics it shows in this inventory:\n\n${shown.join("\n")}` : "",
    inTheLL ? `**In the LL:** ${inTheLL}` : "",
  ]
    .filter(Boolean)
    .join("\n\n");
  const relatedMechanics = [...new Set([...(examplesByGame.get(g.id) || []).map((e) => e.id), ...(g.related?.mechanics || [])])];
  const relatedTechnologies = g.related?.technologies || [];
  for (const t of relatedTechnologies) if (!technologyIds.has(t)) unknownTechnologies.add(t);
  const relatedGames = g.related?.games || [];
  for (const r of relatedGames) if (!games.has(r)) throw new Error(`${g.id}: related game ${r} not found`);
  const howTo = part(g.howTo, cites);
  const whyTo = part(g.whyTo, cites);
  const homeClassroom = part(g.homeClassroom, cites);
  const homeDigital = part(g.homeDigital, cites);
  const relatedLines = [
    ...relatedMechanics.map((m) => `- [${byId.get(m).Name}](../${pageOf(byId.get(m))}) (mechanic)`),
    ...relatedTechnologies.map((t) => `- [${technologyName(t)}](../technologies/${t}.md) (technology)`),
    ...relatedGames.map((r) => `- ${gameLink(r, "../")} (game)`),
  ];
  return {
    GameId: g.id,
    Name: g.name,
    Definition: definition,
    Description: description,
    HowTo: howTo,
    WhyTo: whyTo,
    HomeGameClassroom: homeClassroom,
    HomeGameDigital: homeDigital,
    RelatedMechanics: relatedMechanics.join("; "),
    RelatedTechnologies: relatedTechnologies.join("; "),
    RelatedGames: relatedGames.join("; "),
    Sources: list.join("; "),
    Proposals: countProposals(howTo, whyTo, homeClassroom, homeDigital),
    Status: "Draft",
    Author: `${EG}, Nov 17`,
    Page: `_content/mechanics/games/${g.id}.md`,
    Year: g.year ?? "",
    Designer: g.designer || "",
    Form: g.form,
    WhereToGet: g.whereToGet || "",
    InTheLL: inTheLL,
    _page: { list, relatedMechanics, relatedTechnologies, relatedGames, relatedLines, definition },
  };
});
const forms = ["Board", "Card", "Video", "Tabletop role-playing", "Party", "Classroom", "LL-made"];
for (const g of gameRows) if (!forms.includes(g.Form)) throw new Error(`${g.GameId}: Form ${g.Form} is not one of ${forms.join(", ")}`);
writeCsv("games.csv", gameRows);
fs.mkdirSync(path.join(mechanics, "games"), { recursive: true });
for (const g of gameRows) {
  const p = g._page;
  fs.writeFileSync(
    path.join(mechanics, "games", `${g.GameId}.md`),
    `---
title: ${yaml(g.Name)}
description: ${yaml(g.Definition || g.Name)}
id: ${g.GameId}
kind: game
form: ${yaml(g.Form)}
status: draft
author: ${yaml(`${g.Author}; generated by _build/build.mjs from _build/games.json`)}
sources: ${yaml(p.list)}
mechanics: ${yaml(p.relatedMechanics)}
technologies: ${yaml(p.relatedTechnologies)}
games: ${yaml(p.relatedGames)}
proposals: ${g.Proposals}
year: ${yaml(g.Year)}
designer: ${yaml(g.Designer)}
---

# ${g.Name}

## Definition

${p.definition || NOT_YET}

## Description

${g.Description || NOT_YET}

## How to

${g.HowTo}

## Why to

${g.WhyTo}

## Home game version

### In a regular classroom

${g.HomeGameClassroom}

### Digitally

${g.HomeGameDigital}

## Related

${p.relatedLines.length ? p.relatedLines.join("\n") : "None yet."}

## Sources

${p.list.length ? sourcesSection(p.list) : "None yet."}
`,
  );
}
// Remove pages for games no longer in games.json (the folder is generated).
for (const f of fs.readdirSync(path.join(mechanics, "games"))) if (f.endsWith(".md") && !games.has(f.slice(0, -3))) fs.unlinkSync(path.join(mechanics, "games", f));
const unused = [...games.keys()].filter((id) => !examplesByGame.has(id));

const count = (list, key) => list.reduce((acc, row) => ((acc[row[key]] = (acc[row[key]] || 0) + 1), acc), {});
const inGame = rows.filter((r) => /^yes/.test(r.InOurGame)).length;
const partly = rows.filter((r) => /^partly/.test(r.InOurGame)).length;
console.log(
  JSON.stringify(
    {
      rows: rows.length,
      byStatus: count(rows, "Status"),
      byFamily: count(rows, "Family"),
      inGame,
      partly,
      withDefinition: rows.filter((r) => r.Definition).length,
      withExamples: rows.filter((r) => r.ExamplesChecked).length,
      examplesChecked: count(rows.filter((r) => r.ExamplesChecked), "ExamplesChecked"),
      proposals: rows.reduce((n, r) => n + r.Proposals, 0),
      games: gameRows.length,
      gamesByForm: count(gameRows, "Form"),
      gamesNotUsedAsExamples: unused,
      technologiesNotYetInTable: [...unknownTechnologies].sort(),
      bibliographyFolder: Boolean(known),
      readingIdsNotInBibliography: [...missing].sort(),
    },
    null,
    2,
  ),
);
