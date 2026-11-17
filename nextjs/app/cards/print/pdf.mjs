#!/usr/bin/env node
// Prints a set of cards to a PDF on disk, without the print dialog: headless Chrome renders /cards/print from the
// dev server (http://localhost:3111, started with `pnpm dev` in nextjs/), and PDFKit then measures the PDF it wrote
// (pdf-check.swift: page size, and the text's distance from the paper's edges and from the cut line).
//
//   node nextjs/app/cards/print/pdf.mjs --set stafford                  a print set marked in /cards (_layouts/print-<name>.json)
//   node nextjs/app/cards/print/pdf.mjs --convolute stafford-game       one convolute
//   node nextjs/app/cards/print/pdf.mjs --chain session-a-play-take-apart-remix   a follows chain, from any card in it
//   node nextjs/app/cards/print/pdf.mjs --cards a,b,c --name desk       chosen cards, in that order
//   node nextjs/app/cards/print/pdf.mjs --card the-committee            one card
//   node nextjs/app/cards/print/pdf.mjs --audience llufs                any filter: --kind --tag --status --audience --voice
//   node nextjs/app/cards/print/pdf.mjs --all                           every card
// With: --paper letter (default 11x17), --form short|index (default full), --name <label> for the file name,
// --open (opens the PDF in Preview), --base <url> (default http://localhost:3111).
// Run from the repo root. Writes _media/print/<YYYYMMDD>-<name>-<paper>-<form>.pdf (gitignored).
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const repo = path.resolve(here, "../../../..");
const argv = process.argv.slice(2);
const opt = (k) => { const i = argv.indexOf(`--${k}`); return i >= 0 && argv[i + 1] && !argv[i + 1].startsWith("--") ? argv[i + 1] : null; };
const flag = (k) => argv.includes(`--${k}`);
const fail = (m) => { console.error(m); process.exit(1); };

const base = (opt("base") || "http://localhost:3111").replace(/\/$/, "");
const paper = opt("paper") === "letter" ? "letter" : "11x17";
const form = ["short", "index"].includes(opt("form")) ? opt("form") : "full";
const FILTERS = ["convolute", "kind", "tag", "status", "audience", "voice"];

// What to print, as the print view's URL, and a name for the file.
let route = "/cards/print";
const q = new URLSearchParams();
let name = opt("name");
if (opt("set")) { q.set("set", opt("set")); name ||= opt("set"); }
else if (opt("cards")) { q.set("cards", opt("cards")); name ||= "chosen"; }
else if (opt("card")) { route = `/cards/print/${opt("card")}`; name ||= opt("card"); }
else if (opt("chain")) {
  // The chain page knows the chain; take the cards from its "Print the chain" link.
  const res = await fetch(`${base}/cards/chain/${opt("chain")}`).catch(() => fail(`No dev server at ${base}. Start it: cd nextjs && pnpm dev`));
  if (!res.ok) fail(`No chain for "${opt("chain")}" (${res.status}).`);
  const m = (await res.text()).match(/href="\/cards\/print\?cards=([^"&]+)/);
  if (!m) fail(`Couldn't find the chain's cards on /cards/chain/${opt("chain")}.`);
  q.set("cards", decodeURIComponent(m[1]));
  name ||= `chain-${opt("chain")}`;
} else {
  for (const k of FILTERS) if (opt(k)) q.set(k, opt(k));
  if (![...q.keys()].length && !flag("all")) fail("Say what to print: --set, --convolute, --chain, --cards, --card, a filter, or --all. See the top of this file.");
  name ||= [...q.values()].join("-") || "all";
}
if (paper === "letter") q.set("paper", "letter");
if (form !== "full") q.set("form", form);
const url = `${base}${route}${q.size ? `?${q}` : ""}`;

// The server answers, and how many cards the view holds.
const res = await fetch(url).catch(() => fail(`No dev server at ${base}. Start it: cd nextjs && pnpm dev`));
if (!res.ok) fail(`${url} answered ${res.status}.`);
const count = Number(((await res.text()).match(/cards-print-count">(\d+)/) || [])[1] || 0);
if (!count) fail(`No cards match ${url}.`);

const day = new Date().toLocaleDateString("en-CA", { timeZone: "America/New_York" }).replaceAll("-", "");
const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 60);
const out = path.join(repo, "_media/print", `${day}-${slug(name)}-${paper}-${form}.pdf`);
fs.mkdirSync(path.dirname(out), { recursive: true });

// Headless Chrome, in a profile of its own so it doesn't touch the Chrome you have open. The page packs its cards into
// sheets once its fonts are in (Sheets.jsx); the virtual time budget lets that finish before printing.
const chrome = process.env.CHROME || "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
if (!fs.existsSync(chrome)) fail(`Chrome not found at ${chrome}; set CHROME to its path.`);
const profile = fs.mkdtempSync(path.join(os.tmpdir(), "cards-print-"));
const run = (extra) => execFileSync(chrome, ["--headless=new", "--disable-gpu", "--no-pdf-header-footer", `--user-data-dir=${profile}`, "--virtual-time-budget=20000", ...extra, url], { stdio: ["ignore", "pipe", "ignore"], maxBuffer: 64 << 20 }).toString();
const dom = form === "index" ? "" : run(["--dump-dom"]);
const sheets = form === "index" ? null : Number((dom.match(/data-sheets="(\d+)"/) || [])[1] || 0);
const clipped = Number((dom.match(/data-clipped="(\d+)"/) || [])[1] || 0);
fs.rmSync(out, { force: true });
run([`--print-to-pdf=${out}`]);
fs.rmSync(profile, { recursive: true, force: true });
if (!fs.existsSync(out)) fail("Chrome wrote no PDF.");

// Measure the PDF itself.
const check = JSON.parse(execFileSync("swift", [path.join(here, "pdf-check.swift"), out]).toString());
const want = paper === "letter" ? { w: 8.5, h: 11, pad: 0.35 } : { w: 11, h: 17, pad: 0.45 };
const pages = check.perPage;
const min = (k) => Math.min(...pages.map((p) => p[k]).filter((v) => v != null));
const problems = [];
if (pages.some((p) => p.width !== want.w || p.height !== want.h)) problems.push(`a page is not ${want.w} x ${want.h} in`);
if (sheets && sheets !== check.pages) problems.push(`the screen packed ${sheets} sheets but the PDF has ${check.pages} pages`);
if (sheets === 0) problems.push("the page didn't pack its sheets before printing (Chrome's own flow was printed)");
if (min("textLeft") < want.pad - 0.03) problems.push(`text ${min("textLeft")} in from the left edge (want ${want.pad})`);
if (min("textTop") < want.pad - 0.05) problems.push(`text ${min("textTop")} in from the top edge (want ${want.pad})`);
if (form !== "index" && min("cutToRightColumn") < want.pad - 0.05) problems.push(`right column's text ${min("cutToRightColumn")} in from the cut (want ${want.pad})`);
if (clipped) problems.push(`${clipped} card${clipped === 1 ? " is" : "s are"} longer than two columns and cut off at the foot of ${clipped === 1 ? "its" : "their"} sheet: print on 11 x 17`);
if (pages.some((p) => p.charsOnCut)) problems.push("text crosses the middle cut line");

console.log(out);
console.log(`${count} card${count === 1 ? "" : "s"}, ${check.pages} sheet${check.pages === 1 ? "" : "s"} of ${paper === "letter" ? "Letter" : "11 x 17"}, ${form} form. From ${url}`);
console.log(`Checked in the PDF: every page ${want.w} x ${want.h} in; text from the left edge ${min("textLeft")} in, from the top ${min("textTop")} in, from the cut on the right column ${min("cutToRightColumn")} in (designed ${want.pad}); line ends at least ${Math.min(min("textRight"), min("leftColumnToCut") ?? Infinity)} in from the right edge and the cut (glyph boxes, ragged lines); nothing on the cut line.`);
if (problems.length) { console.error(`Problems: ${problems.join("; ")}.`); process.exitCode = 2; }
if (flag("open")) execFileSync("open", ["-a", "Preview", out]);
