import os, re, glob, html, subprocess, sys
R = sys.argv[1]
M = os.path.join(R, "_content/mechanics")
B = "http://localhost:3111"
def fm(path):
    t = open(path).read()
    m = re.match(r"---\n(.*?)\n---\n", t, re.S)
    d = {}
    for line in (m.group(1).split("\n") if m else []):
        k = re.match(r"^([a-z_]+):\s*(.*)$", line)
        if k: d[k.group(1)] = k.group(2).strip().strip('"')
    return d
e = html.escape
def entries(folder):
    out = []
    for f in sorted(glob.glob(f"{M}/{folder}/*.md")):
        b = os.path.basename(f)[:-3]
        if b in ("candidates", "README"): continue
        d = fm(f); out.append((b, d))
    return out
ll = entries("ll"); tech = entries("technologies"); gm = entries("gm"); new = entries("new"); games = entries("games")
studies = []
for d in sorted(glob.glob(f"{M}/studies/0*")):
    x = fm(d + "/README.md"); studies.append(x)
def group(items, key):
    g = {}
    for b, d in items: g.setdefault(d.get(key, "?"), []).append((b, d))
    return g
props_game = sum(int(d.get("proposals", 0) or 0) for _, d in gm + new)
props_ll = sum(int(d.get("proposals", 0) or 0) for _, d in ll + tech)
props_st = sum(int(d.get("proposals", 0) or 0) for d in studies)
fam_game = group(gm + new, "family")
forms = group(games, "form")
head = subprocess.check_output(["git", "-C", R, "rev-parse", "--short", "HEAD"]).decode().strip()
nb = subprocess.check_output(["git", "-C", os.path.join(R, "../../.."), "rev-parse", "--short", "HEAD"]).decode().strip()
now = subprocess.check_output(["date", "+%H:%M"]).decode().strip()

def pill(d):
    n = d.get("proposals", "0")
    return "" if n in ("0", "") else " <span class=pill>" + n + "</span>"
def entry_list(items, folder):
    return "".join('<li><a href="%s/mechanics/%s/%s">%s</a>%s</li>' % (B, folder, b, e(d.get("title", b)), pill(d)) for b, d in items)
def grouped(items, key, folder):
    g = group(items, key)
    return "".join(f'<div class="grp"><h4>{e(k)} <span class=n>{len(v)}</span></h4><ul>{entry_list(v, folder)}</ul></div>' for k, v in g.items())

fam_rows = "".join(f'<div class=bar><span class=lbl>{e(k)}</span><span class=track><span class=fill style="width:{len(v)/20*100:.0f}%"></span></span><span class=num>{len(v)}</span></div>' for k, v in sorted(fam_game.items(), key=lambda kv: -len(kv[1])))
form_rows = "".join(f'<div class=bar><span class=lbl>{e(k)}</span><span class=track><span class="fill alt" style="width:{len(v)/55*100:.0f}%"></span></span><span class=num>{len(v)}</span></div>' for k, v in sorted(forms.items(), key=lambda kv: -len(kv[1])))
study_cards = "".join('<a class="study" href="%s%s"><span class=sn>%02d</span><h4>%s</h4><p>%s</p><span class=go>Play &rarr;</span> <span class=sub>print: %s/print</span></a>' % (B, d.get("route",""), i+1, e(d.get("title","")), e(d.get("description","")), e(d.get("route",""))) for i, d in enumerate(studies))

page = f'''<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>W11 mechanics overview</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;900&display=swap" rel="stylesheet">
<style>
:root{{--bg:#f6f4ef;--card:#fff;--ink:#1d1d1b;--muted:#6b6a65;--line:#e3e0d8;--acc:#c8461f;--acc2:#2f6f8f;--pill:#fde8df;--pillink:#9a3412}}
@media (prefers-color-scheme:dark){{:root:not([data-theme="light"]){{--bg:#141414;--card:#1d1d1d;--ink:#ecebe6;--muted:#9c9a93;--line:#2e2e2c;--acc:#f07a4f;--acc2:#6fb3d2;--pill:#3a2218;--pillink:#fdba9a}}}}
*{{box-sizing:border-box}}body{{margin:0;background:var(--bg);color:var(--ink);font:15px/1.5 Inter,system-ui,sans-serif}}
.wrap{{max-width:1180px;margin:0 auto;padding:32px 16px 64px}}
h1{{font-weight:900;font-size:clamp(28px,4vw,44px);margin:0 0 4px;letter-spacing:-.02em}}h2{{font-weight:900;font-size:22px;margin:40px 0 12px}}h3{{margin:0 0 6px;font-size:17px}}h4{{margin:0 0 6px;font-size:14px}}
.lede{{color:var(--muted);max-width:820px}} a{{color:var(--acc2)}}
.stats{{display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:10px;margin:22px 0}}
.stat{{background:var(--card);border:1px solid var(--line);border-radius:12px;padding:14px}}.stat b{{display:block;font-size:30px;font-weight:900;line-height:1}}.stat span{{color:var(--muted);font-size:13px}}
.waits{{background:var(--card);border:2px solid var(--acc);border-radius:14px;padding:18px 20px}}.waits ol{{margin:6px 0 0;padding-left:20px}}.waits li{{margin:6px 0}}.done{{color:var(--muted);text-decoration:line-through}}
.panes{{display:grid;grid-template-columns:repeat(auto-fit,minmax(330px,1fr));gap:14px}}
.pane{{background:var(--card);border:1px solid var(--line);border-radius:14px;padding:16px 18px}}.pane .id{{display:inline-block;background:var(--ink);color:var(--bg);font-weight:900;border-radius:6px;padding:1px 8px;margin-right:8px}}
.pane ul{{margin:8px 0 0;padding-left:18px}}.pane li{{margin:3px 0}}.thread{{font:12px ui-monospace,monospace;color:var(--muted);word-break:break-all}}
.studies{{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:12px}}
.study{{display:block;text-decoration:none;color:inherit;background:var(--card);border:1px solid var(--line);border-radius:14px;padding:16px;position:relative}}.study:hover{{border-color:var(--acc)}}
.sn{{font-weight:900;color:var(--acc);font-size:22px}}.study p{{color:var(--muted);font-size:13.5px;margin:4px 0 8px}}.go{{font-weight:700;color:var(--acc2)}}.sub{{font-size:11px;color:var(--muted)}}
.cols{{display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:12px}}.grp{{background:var(--card);border:1px solid var(--line);border-radius:12px;padding:12px 14px}}
.grp ul{{margin:0;padding-left:16px}}.grp li{{margin:2px 0;font-size:14px}}.n{{color:var(--muted);font-weight:500}}
.pill{{display:inline-block;background:var(--pill);color:var(--pillink);border-radius:999px;font-size:11px;font-weight:700;padding:0 7px;margin-left:4px}}
.bars{{background:var(--card);border:1px solid var(--line);border-radius:12px;padding:14px}}.bar{{display:grid;grid-template-columns:minmax(120px,240px) 1fr 34px;gap:10px;align-items:center;margin:5px 0;font-size:13.5px}}
.track{{background:var(--line);border-radius:4px;height:10px;overflow:hidden}}.fill{{display:block;height:100%;background:var(--acc)}}.fill.alt{{background:var(--acc2)}}.num{{text-align:right;font-weight:700}}
.two{{display:grid;grid-template-columns:repeat(auto-fit,minmax(320px,1fr));gap:14px}}
.quote{{border-left:3px solid var(--acc);padding:4px 0 4px 14px;margin:14px 0;color:var(--ink)}}.foot{{margin-top:40px;color:var(--muted);font-size:13px}}
code{{font:12.5px ui-monospace,monospace;background:var(--line);padding:1px 5px;border-radius:4px}}
</style></head><body><div class="wrap">
<h1>W11 mechanics: what the agents did</h1>
<p class="lede">Workspace “Nov 17 · W11 mechanics”, HUIT laptop, from 09:26 to {now} EST, Tuesday, November 17, 2026. Six panes wrote the week's reference on mechanics in <code>ll-week-11/_content/mechanics/</code>, in one format: definition, description, how to, why to, home game version, related. Everything is a draft; every “why to” the record doesn't settle is written as options for you to choose. Links open the reader on <a href="{B}/mechanics">localhost:3111</a>.</p>
<p class="quote">Your brief, about 08:12, to MZ: “1) an updated inventory of game mechanics with definitions and examples … also have technologies and games tables 2) LLUF-created deep dives … 3) a few key mechanics with illustrations for my class--think mechanics-studies, 4) ll mechanics and technologies thought of the same way … with definitions/descriptions/how-tos and WHY to's … and then how you'd create home game versions of them”</p>
<div class="stats">
<div class="stat"><b>124</b><span>game mechanics, all defined; every example cited</span></div>
<div class="stat"><b>{len(ll)}</b><span>LL mechanics</span></div>
<div class="stat"><b>{len(tech)}</b><span>technologies</span></div>
<div class="stat"><b>{len(games)}</b><span>games</span></div>
<div class="stat"><b>{len(studies)}</b><span>playable studies for tomorrow</span></div>
<div class="stat"><b>1</b><span>LLUF deep-dive kit (prompt, template, pick list)</span></div>
<div class="stat"><b>{props_game+props_ll+props_st}</b><span>proposals waiting for your choice</span></div>
</div>

<h2>Waiting on you</h2>
<div class="waits"><ol>
<li class="done">Which mechanics get a study. You: “go ahead and do all six for a start”. All six built.</li>
<li><b>How the LLUFs' deep dives are credited</b>: A by name, B by initials or a handle, C unsigned. <i>EL recommends B, with an opt-out to unsigned.</i></li>
<li><b>How their deep dives come in</b>: A a HackMD note per fellow (EF's recommendation), B a Slack thread, C a file or dictation through ED.</li>
<li><b>Which LL mechanics EM writes next</b>: 22 candidates left (chalk, multiplane, paper dolls, body as controller, hotseat, taste test, live spectrogram …); whether green paper and the green screen stay one mechanic on two technologies. <a href="{B}/mechanics/ll/candidates">The list</a>.</li>
<li><b>Whether the studies get their own repo</b> (ES suggests <code>mk-mechanics-studies</code>). <i>EL recommends staying in ll-week-11 this week.</i></li>
<li><b>The proposals</b>: {props_game} in game mechanics, {props_ll} in LL mechanics and technologies, {props_st} in the studies, each “Proposed, for Marlon to choose” with two or three options.</li>
</ol></div>

<h2>For tomorrow's class: six studies</h2>
<p class="lede">ES built each as a playable page and a one-page 11x17 sheet. Study 1 opens on tic-tac-toe; 3 and 5 are the Stafford station's power, water and network.</p>
<div class="studies">{study_cards}</div>

<h2>The panes</h2>
<div class="panes">
<div class="pane"><h3><span class="id">EL</span>lead</h3><div class="thread">Claude Opus 5.5 · 5d007b0d-9507-46b8-9517-79b86acafcb8</div><ul>
<li>Ran the reader on :3111; started the <a href="https://github.com/ll-26-27/ll-week-11/blob/main/_context/orchestration/20261117-mechanics/board.md">board</a>.</li>
<li>Fixed the <a href="{B}/mechanics/format">entry format</a> at 09:31 (v1.4 by 09:39: families, categories, study and deep-dive folders, <code>ExamplesChecked</code>).</li>
<li>Checked every page against it (all pass), spot-checked quotations against their sources, rewrote the <a href="{B}/mechanics">index</a>.</li>
<li>Committed and pushed about 50 times; checkpoints to MZ.</li></ul></div>
<div class="pane"><h3><span class="id">EG</span>game mechanics and games</h3><div class="thread">Claude Opus 5.5 · 10549f6d-2ac5-41cc-9ae5-5682cc105485</div><ul>
<li>Audited the ENGL 189VG course support: 12 new mechanics, 8 games.</li>
<li>Grew the inventory from 105 to 124; a definition on every row; pages for GM's 50 cards in <code>gm/</code>.</li>
<li>Your Nov 15–17 concepts as rows with your words as the why-to: the tap, rebalancing on the fly, turn time, discrete and continuous space, nested loops.</li>
<li>Games table: {len(games)} rows, the 17 prototypes among them.</li>
<li>Web checks: 170 example claims, 0 wrong, 44 reworded to what the pages say.</li></ul></div>
<div class="pane"><h3><span class="id">ES</span>studies for class</h3><div class="thread">Claude Opus 5.5 · 857ec322-4c83-4631-baa8-f671208874c6</div><ul>
<li>Proposed six; built all six as interactive pages with print sheets (<a href="{B}/mechanics/studies">/mechanics/studies</a>).</li>
<li>Each checked in headless Chrome: no console errors, phone width, one 11x17 page.</li>
<li>Each names its game mechanic entry.</li></ul></div>
<div class="pane"><h3><span class="id">EM</span>LL mechanics and technologies</h3><div class="thread">Claude Opus 5.5 · c24dcd2b-601e-4484-9fad-1a19b127dcd4</div><ul>
<li>A candidate list of 40 LL mechanics and 17 technologies, each with its file and date.</li>
<li>Wrote your six first (overhead view, four overhead cameras, green paper, cards, the place-setting map, the concept map), then what tomorrow and Stafford use.</li>
<li>Found your Aug 8 dictation: green paper is “a misuse of the tool” that “creates all these opportunities for creativity and collaboration”.</li>
<li>Paused for your order of the remaining 22.</li></ul></div>
<div class="pane"><h3><span class="id">EF</span>the LLUFs' deep dives</h3><div class="thread">Claude Opus 5.5 · d438c4b6-e381-44c0-a8c6-31a2638ecdd6</div><ul>
<li><a href="{B}/mechanics/deep-dives">The prompt</a>, <a href="{B}/mechanics/deep-dives/template">template</a> (the format's headings plus “What we tried”), <a href="{B}/mechanics/deep-dives/pick-list">pick list</a> linked to every written entry, <a href="{B}/mechanics/deep-dives/how-it-comes-in">how a deep dive comes in</a>.</li>
<li>A worked example on webcam hand tracking, labeled as Claude's.</li>
<li>A 4-page 11x17 PDF in <code>~/Downloads/lluf-deep-dives-11x17.pdf</code>, not opened.</li></ul></div>
<div class="pane"><h3><span class="id">ED</span>dictation</h3><div class="thread">Codex · 01a1e9e7-3566-78d0-a8f8-831b991853f7</div><ul>
<li>Held at a permission prompt until you approved it; ready since about 10:10.</li>
<li>No dictation yet. It saves what you say to <code>_dictation/</code> and tells the owner pane.</li></ul></div>
</div>

<h2>LL mechanics, by family</h2>
<p class="lede">The number beside an entry is its open proposals.</p>
<div class="cols">{grouped(ll, "family", "ll")}</div>

<h2>Technologies, by category</h2>
<div class="cols">{grouped(tech, "category", "technologies")}</div>

<h2>Game mechanics and games</h2>
<div class="two"><div class="bars"><h4>Game mechanics by family</h4>{fam_rows}</div><div class="bars"><h4>Games by form</h4>{form_rows}</div></div>

<p class="foot">Generated {now} EST by EL from the files on disk. ll-week-11 <code>{head}</code>, The Notebook <code>{nb}</code>, both pushed. Board: <code>ll-week-11/_context/orchestration/20261117-mechanics/board.md</code>. Format: <code>_content/mechanics/format.md</code>. The reader must be running on :3111 for the links.</p>
</div></body></html>'''
out = os.path.join(R, "_context/orchestration/20261117-mechanics/overview.html")
open(out, "w").write(page)
print(out)
