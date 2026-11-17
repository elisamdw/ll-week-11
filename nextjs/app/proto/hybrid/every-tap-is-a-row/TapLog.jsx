"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

// Every tap is a row. Each tap (a USB NFC reader typing a tag's ID, a phone's Web NFC, a key, or a click)
// adds one row to the log. Nothing else is stored: the board is the log replayed, row by row (see replay()).

// ---- Tuning: change these ----

const ROUND_SECONDS = 90; // taps after this are still logged, but don't count
const PLAYERS = [
  { id: "red", name: "Red", key: "q", color: "#ff8a80" },
  { id: "green", name: "Green", key: "w", color: "#7fc787" },
  { id: "blue", name: "Blue", key: "e", color: "#7fb4ff" },
  { id: "gold", name: "Gold", key: "r", color: "#ffd36b" },
];
// A data center needs one of each. Stock is what's on the table at the start.
const THINGS = [
  { id: "gpu", name: "GPU", key: "1", stock: 5 },
  { id: "power", name: "Power", key: "2", stock: 5 },
  { id: "land", name: "Land", key: "3", stock: 4 },
  { id: "water", name: "Water", key: "4", stock: 3 },
];
const SCAN_GAP_MS = 60; // a reader types faster than this and ends its ID with Enter; anything else is a person

// ---- The rest ----

const TAGS = [...PLAYERS.map((p) => ({ ...p, kind: "player" })), ...THINGS.map((t) => ({ ...t, kind: "thing" }))];
const TAG_BY_ID = Object.fromEntries(TAGS.map((t) => [t.id, t]));
const TAG_BY_KEY = Object.fromEntries(TAGS.map((t) => [t.key, t]));
const ROWS_KEY = "w11-proto:every-tap-is-a-row:rows";
const BINDINGS_KEY = "w11-proto:every-tap-is-a-row:bindings";

const store = {
  get(key, fallback) {
    try {
      return JSON.parse(localStorage.getItem(key)) ?? fallback;
    } catch {
      return fallback;
    }
  },
  set(key, data) {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch {}
  },
};

// The game state is never saved. It is rebuilt from the rows every time, up to row `upto`.
function replay(rows, upto = rows.length) {
  const stock = Object.fromEntries(THINGS.map((t) => [t.id, t.stock]));
  const hands = Object.fromEntries(PLAYERS.map((p) => [p.id, Object.fromEntries(THINGS.map((t) => [t.id, 0]))]));
  let turn = null;
  const start = rows[0]?.at ?? 0;
  const effects = [];
  for (const row of rows.slice(0, upto)) {
    const tag = TAG_BY_ID[row.tagId];
    let who = turn;
    let effect;
    let kept = false;
    if (!tag) effect = "unknown tag";
    else if (row.at - start > ROUND_SECONDS * 1000) effect = "after time";
    else if (tag.kind === "player") {
      turn = who = tag.id;
      effect = "takes the turn";
      kept = true;
    } else if (!turn) effect = "no badge first";
    else if (stock[tag.id] <= 0) effect = `${tag.name} gone`;
    else {
      stock[tag.id] -= 1;
      hands[turn][tag.id] += 1;
      effect = `claims ${tag.name}`;
      kept = true;
      turn = null;
    }
    effects.push({ who, effect, kept });
  }
  return { stock, hands, turn, effects };
}

function score(hand) {
  const centers = Math.min(...THINGS.map((t) => hand[t.id]));
  const total = THINGS.reduce((n, t) => n + hand[t.id], 0);
  return { centers, total };
}

function clock(ms) {
  const s = Math.max(0, ms) / 1000;
  return `${Math.floor(s / 60)}:${(s % 60).toFixed(1).padStart(4, "0")}`;
}

function wall(at) {
  return new Date(at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });
}

// What the table shows that the board doesn't.
function findings(rows, effects) {
  if (rows.length < 2) return [];
  const out = [];
  const ignored = effects.filter((e) => !e.kept);
  out.push(`${rows.length} taps; ${rows.length - ignored.length} changed the board and ${ignored.length} didn't. The board shows only the ${rows.length - ignored.length}.`);
  const byReason = {};
  for (const e of ignored) byReason[e.effect] = (byReason[e.effect] || 0) + 1;
  const reasons = Object.entries(byReason).map(([k, n]) => `${n} × “${k}”`);
  if (reasons.length) out.push(`The taps that didn't count: ${reasons.join(", ")}. Each one is someone trying something.`);
  let gap = { ms: 0, i: 0 };
  for (let i = 1; i < rows.length; i++) {
    const ms = rows[i].at - rows[i - 1].at;
    if (ms > gap.ms) gap = { ms, i };
  }
  const after = TAG_BY_ID[rows[gap.i].tagId];
  out.push(`The longest pause was ${(gap.ms / 1000).toFixed(1)} s, before row ${gap.i + 1}${after ? ` (${after.name})` : ""}. Who was deciding?`);
  const tries = {};
  rows.forEach((r) => {
    if (TAG_BY_ID[r.tagId]?.kind === "thing") tries[r.tagId] = (tries[r.tagId] || 0) + 1;
  });
  const top = Object.entries(tries).sort((a, b) => b[1] - a[1])[0];
  if (top) out.push(`${TAG_BY_ID[top[0]].name} was tapped most (${top[1]} times): the scarce thing, or the wanted one.`);
  const goneAt = effects.findIndex((e) => e.effect.endsWith(" gone"));
  if (goneAt >= 0) out.push(`Row ${goneAt + 1} is the first tap at an empty pile: the moment scarcity arrived.`);
  const sources = [...new Set(rows.map((r) => r.source))];
  out.push(`Input: ${sources.join(", ")}. The log records how each tap came in as well as what it did.`);
  return out;
}

function toCsv(rows, effects) {
  const start = rows[0]?.at ?? 0;
  const head = ["n", "at", "ms_from_start", "uid", "tag", "kind", "source", "who", "effect", "counted"];
  const lines = rows.map((r, i) => {
    const tag = TAG_BY_ID[r.tagId];
    const e = effects[i];
    return [i + 1, new Date(r.at).toISOString(), r.at - start, r.uid || "", tag?.name || "", tag?.kind || "", r.source, e?.who ? TAG_BY_ID[e.who].name : "", e?.effect || "", e?.kept ? "yes" : "no"]
      .map((v) => `"${String(v).replaceAll('"', '""')}"`)
      .join(",");
  });
  return [head.join(","), ...lines].join("\n");
}

export default function TapLog() {
  const [rows, setRows] = useState([]);
  const [bindings, setBindings] = useState({}); // uid -> tag id, taught with a real tag
  const [teaching, setTeaching] = useState(null); // tag id waiting for its tag to be tapped
  const [scrub, setScrub] = useState(null); // null = live; otherwise show the board at this row
  const [now, setNow] = useState(0);
  const [notice, setNotice] = useState("");
  const [nfc, setNfc] = useState("off"); // off | unsupported | listening | error
  const buffer = useRef({ text: "", last: 0, timer: null });
  const [loaded, setLoaded] = useState(false); // don't save until the saved log has been read

  useEffect(() => {
    setRows(store.get(ROWS_KEY, []));
    setBindings(store.get(BINDINGS_KEY, {}));
    setNfc(typeof window !== "undefined" && "NDEFReader" in window ? "off" : "unsupported");
    setLoaded(true);
  }, []);
  useEffect(() => {
    if (loaded) store.set(ROWS_KEY, rows);
  }, [loaded, rows]);
  useEffect(() => {
    if (loaded) store.set(BINDINGS_KEY, bindings);
  }, [loaded, bindings]);

  const start = rows[0]?.at;
  const running = start && now - start < ROUND_SECONDS * 1000;
  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 200);
    return () => clearInterval(id);
  }, []);

  const tap = useCallback((tagId, source, uid = "") => {
    setRows((r) => [...r, { at: Date.now(), tagId, uid, source }]);
    setScrub(null);
  }, []);

  // A tag ID from a reader or a phone: teach it, or look it up.
  const scan = useCallback(
    (raw, source) => {
      const uid = raw.toUpperCase().replace(/[^0-9A-F]/g, "");
      if (!uid) return;
      if (teaching) {
        setBindings((b) => {
          const next = Object.fromEntries(Object.entries(b).filter(([, id]) => id !== teaching));
          return { ...next, [uid]: teaching };
        });
        setNotice(`Tag ${uid} is now ${TAG_BY_ID[teaching].name}.`);
        setTeaching(null);
        return;
      }
      const tagId = bindings[uid] || null;
      if (!tagId) setNotice(`Unknown tag ${uid}. Click “teach” on a chip, then tap the tag again.`);
      tap(tagId, source, uid);
    },
    [bindings, teaching, tap],
  );

  // Keyboard: a reader types its ID fast and presses Enter; a person presses one key.
  useEffect(() => {
    const b = buffer.current;
    function flush() {
      const text = b.text;
      b.text = "";
      // No Enter: people pressing keys, however fast; each mapped key is one tap.
      for (const ch of text.toLowerCase()) if (TAG_BY_KEY[ch]) tap(TAG_BY_KEY[ch].id, "key");
    }
    function onKey(event) {
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      if (event.target.closest?.("input, textarea, select")) return;
      clearTimeout(b.timer);
      if (event.key === "Enter") {
        if (b.text.length >= 4) {
          event.preventDefault();
          scan(b.text, "reader");
          b.text = "";
        } else flush();
        return;
      }
      if (event.key.length !== 1) return;
      b.text += event.key;
      b.last = Date.now();
      b.timer = setTimeout(flush, SCAN_GAP_MS);
    }
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      clearTimeout(b.timer);
    };
  }, [scan, tap]);

  // Phone: Web NFC, Android Chrome over HTTPS only.
  async function startNfc() {
    try {
      const reader = new window.NDEFReader();
      await reader.scan();
      reader.onreading = (event) => scan(event.serialNumber || "", "phone");
      reader.onreadingerror = () => setNotice("The phone saw a tag but couldn't read it. Try again.");
      setNfc("listening");
    } catch (error) {
      setNfc("error");
      setNotice(`Web NFC didn't start: ${error.message}`);
    }
  }

  // For trying the reader path without a reader: types a made-up ID the way a reader would.
  function fakeReader() {
    const uid = Array.from({ length: 7 }, () => Math.floor(Math.random() * 256).toString(16).padStart(2, "0")).join("");
    scan(uid, "reader (simulated)");
  }

  function newRound() {
    if (rows.length && !window.confirm("Start a new round? This clears the log (download the CSV first if you want it).")) return;
    setRows([]);
    setScrub(null);
    setNotice("");
  }

  function download() {
    const { effects } = replay(rows);
    const blob = new Blob([toCsv(rows, effects)], { type: "text/csv" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `every-tap-is-a-row-${new Date(rows[0]?.at || Date.now()).toISOString().slice(0, 16).replace(/[:T]/g, "")}.csv`;
    a.click();
    URL.revokeObjectURL(a.href);
  }

  const upto = scrub ?? rows.length;
  const live = useMemo(() => replay(rows), [rows]);
  const shown = useMemo(() => (scrub === null ? live : replay(rows, upto)), [rows, upto, scrub, live]);
  const over = start && !running;
  const remaining = start ? ROUND_SECONDS * 1000 - (now - start) : ROUND_SECONDS * 1000;
  const boundUid = Object.fromEntries(Object.entries(bindings).map(([uid, id]) => [id, uid]));
  const ranking = PLAYERS.map((p) => ({ ...p, ...score(shown.hands[p.id]) })).sort((a, b) => b.centers - a.centers || b.total - a.total);
  const facts = over ? findings(rows, live.effects) : [];

  return (
    <div className="hy-tap">
      <div className="hy-status">
        <p className={`hy-clock${over ? " over" : ""}`}>{start ? (over ? "Time" : clock(remaining)) : clock(ROUND_SECONDS * 1000)}</p>
        <p className="muted">
          {!start && "The clock starts with the first tap."}
          {running && (live.turn ? `${TAG_BY_ID[live.turn].name} has the turn: tap a thing.` : "Tap your badge, then a thing.")}
          {over && "Round over. Read the table: what does it show that the board doesn't?"}
        </p>
        <div className="hy-actions">
          <button className="button" onClick={download} disabled={!rows.length}>Download CSV</button>
          <button className="button" onClick={newRound}>New round</button>
        </div>
      </div>

      <section className="hy-tags" aria-label="Tags">
        {TAGS.map((t) => (
          <div key={t.id} className={`hy-chip ${t.kind}${teaching === t.id ? " teaching" : ""}${live.turn === t.id ? " turn" : ""}`} style={{ "--chip": t.color || "var(--muted)" }}>
            <button className="hy-chip-tap" onClick={() => tap(t.id, "click")}>
              <strong>{t.name}</strong>
              <span>
                key <kbd>{t.key.toUpperCase()}</kbd>
                {t.kind === "thing" && ` · ${live.stock[t.id]} left`}
              </span>
            </button>
            <button className="linkish hy-teach" onClick={() => setTeaching(teaching === t.id ? null : t.id)}>
              {teaching === t.id ? "tap the tag now…" : boundUid[t.id] ? `tag ${boundUid[t.id].slice(0, 8)}` : "teach"}
            </button>
          </div>
        ))}
      </section>

      <div className="hy-inputs">
        <span className="muted">Taps come from:</span>
        <span>keys and clicks (always)</span>
        <span>a USB reader that types the ID and Enter</span>
        <button className="linkish" onClick={fakeReader}>simulate a reader tap</button>
        {nfc === "unsupported" ? (
          <span className="muted">phone NFC: needs Android Chrome over HTTPS</span>
        ) : nfc === "listening" ? (
          <span>phone NFC: listening</span>
        ) : (
          <button className="linkish" onClick={startNfc}>start phone NFC</button>
        )}
      </div>
      {notice && <p className="hy-notice">{notice}</p>}

      <div className="hy-split">
        <section className="hy-panel" aria-label="The board">
          <div className="hy-panel-head">
            <h2>The board</h2>
            <p className="muted">{scrub === null ? "Rebuilt from every row." : `Rebuilt from rows 1–${upto} only.`}</p>
          </div>
          <table className="hy-board">
            <thead>
              <tr>
                <th>Player</th>
                {THINGS.map((t) => (
                  <th key={t.id}>{t.name}</th>
                ))}
                <th>Data centers</th>
              </tr>
            </thead>
            <tbody>
              {ranking.map((p) => (
                <tr key={p.id} className={shown.turn === p.id ? "turn" : ""}>
                  <td>
                    <span className="hy-dot" style={{ background: p.color }} /> {p.name}
                  </td>
                  {THINGS.map((t) => (
                    <td key={t.id}>{shown.hands[p.id][t.id] || ""}</td>
                  ))}
                  <td>
                    <strong>{p.centers}</strong>
                  </td>
                </tr>
              ))}
              <tr className="hy-stock">
                <td>On the table</td>
                {THINGS.map((t) => (
                  <td key={t.id}>{shown.stock[t.id]}</td>
                ))}
                <td />
              </tr>
            </tbody>
          </table>
          {rows.length > 0 && (
            <label className="hy-scrub">
              <span>Replay to row {upto}</span>
              <input type="range" min="0" max={rows.length} value={upto} onChange={(e) => setScrub(Number(e.target.value) === rows.length ? null : Number(e.target.value))} />
            </label>
          )}
          {facts.length > 0 && (
            <div className="hy-findings">
              <h3>Read the table</h3>
              <ul>
                {facts.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            </div>
          )}
        </section>

        <section className="hy-panel" aria-label="The log">
          <div className="hy-panel-head">
            <h2>The log</h2>
            <p className="muted">{rows.length} rows. Newest first.</p>
          </div>
          <div className="hy-log-wrap">
            <table className="hy-log">
              <thead>
                <tr>
                  <th>#</th>
                  <th>time</th>
                  <th>tag</th>
                  <th>id</th>
                  <th>from</th>
                  <th>who</th>
                  <th>effect</th>
                </tr>
              </thead>
              <tbody>
                {rows
                  .map((r, i) => ({ r, i, e: live.effects[i] }))
                  .reverse()
                  .map(({ r, i, e }) => {
                    const tag = TAG_BY_ID[r.tagId];
                    return (
                      <tr key={`${r.at}-${i}`} className={`${e?.kept ? "" : "ignored"}${i >= upto ? " future" : ""}`}>
                        <td>{i + 1}</td>
                        <td title={wall(r.at)}>{clock(r.at - start)}</td>
                        <td>{tag?.name || "?"}</td>
                        <td className="hy-uid">{r.uid ? r.uid.slice(0, 8) : "—"}</td>
                        <td>{r.source}</td>
                        <td>{e?.who ? TAG_BY_ID[e.who].name : ""}</td>
                        <td>{e?.effect}</td>
                      </tr>
                    );
                  })}
                {!rows.length && (
                  <tr>
                    <td colSpan={7} className="muted">
                      No taps yet. Press Q, then 1.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
