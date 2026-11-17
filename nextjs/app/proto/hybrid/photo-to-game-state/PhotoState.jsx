"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ORIENTATIONS, PROPERTIES, SPACES, photoToBoard, spaceAt, spaceInPhoto } from "./ring.js";
import { CARDS_A, CARDS_B, EXAMPLE_PINS, MONOPOLY_A, MONOPOLY_B, MONOPOLY_CORNERS } from "./samples.js";

// Photo to game state. You are the vision model: pin what you see on an overhead photo, and the page turns
// the pins into game state (a table and JSON). Two photos, A and B, give a diff: what changed between them.
// No model is called. Where a pin sits does part of the work: on the ring board, its position says which space.

// ---- Tuning: change these ----

const CORNER_RATIO = 1.65; // a Monopoly corner square is about 1.65 side spaces wide
const OWN_RADIUS = 0.25; // on a card table, a card or chips this close to a seat (in image heights) are that player's
const MAX_PHOTO_PX = 1400; // photos are shrunk to this before they're kept in the browser

// Each template is a game: the kinds of pieces you can pin, their fields, and what a photo can't show
// (from HI's _content/game-state/ pages).
const TEMPLATES = {
  monopoly: {
    name: "Monopoly",
    board: "ring",
    samples: { A: MONOPOLY_A, B: MONOPOLY_B },
    sampleCorners: MONOPOLY_CORNERS,
    pieces: {
      token: { name: "Token", color: "#ff8a80", fields: [{ key: "player", label: "Player", kind: "text", value: "car" }] },
      house: { name: "House", color: "#7fc787", fields: [] },
      hotel: { name: "Hotel", color: "#ff5e57", fields: [] },
      deed: {
        name: "Deed",
        color: "#ffd36b",
        fields: [
          { key: "property", label: "Property", kind: "property", value: "" },
          { key: "owner", label: "In front of", kind: "player", value: "" },
          { key: "mortgaged", label: "Face down (mortgaged)", kind: "check", value: false },
        ],
      },
      cash: {
        name: "Cash",
        color: "#c9b893",
        fields: [
          { key: "owner", label: "In front of", kind: "player", value: "" },
          { key: "amount", label: "Amount (your guess)", kind: "text", value: "" },
        ],
      },
    },
    unseen: [
      "The order of the Chance and Community Chest decks",
      "Exact cash, and money held in a hand",
      "Whose turn it is, doubles rolled, turns left in Jail",
      "Rent owed but not yet asked for",
      "Deals made out loud",
    ],
  },
  cards: {
    name: "Cards on a table",
    board: "free",
    samples: { A: CARDS_A, B: CARDS_B },
    pieces: {
      seat: { name: "Seat", color: "#a98bff", fields: [{ key: "player", label: "Player", kind: "text", value: "" }] },
      up: { name: "Card face up", color: "#ecece6", fields: [{ key: "card", label: "Card (e.g. K♠, or an index card's words)", kind: "text", value: "" }] },
      down: { name: "Card face down", color: "#7fb4ff", fields: [] },
      chips: { name: "Chips", color: "#ff8a80", fields: [{ key: "count", label: "How many (your count)", kind: "text", value: "" }] },
    },
    unseen: [
      "What the face-down cards are (a lipstick cam at each seat would see them)",
      "The order of the deck",
      "Whose turn it is, the blinds, the current bet",
      "Bets said out loud and not yet pushed in",
    ],
  },
};

// ---- The rest ----

const storeKey = (template) => `w11-proto:photo-to-game-state:${template}`;
const store = {
  get(key) {
    try {
      return JSON.parse(localStorage.getItem(key));
    } catch {
      return null;
    }
  },
  set(key, data) {
    try {
      localStorage.setItem(key, JSON.stringify(data));
      return true;
    } catch {
      return false;
    }
  },
};

function blankPhoto(template) {
  const t = TEMPLATES[template];
  return { src: "sample", pins: [], corners: t.board === "ring" ? t.sampleCorners : null, orientation: "bottom-right", aspect: 1.5 };
}
function blankSession(template) {
  return { template, tab: "A", photos: { A: blankPhoto(template), B: blankPhoto(template) } };
}

let counter = 0;
const newId = (type) => `${type}-${Date.now().toString(36)}${(counter++).toString(36)}`;

// Where a pin is, in the game's terms.
function locate(template, photo, pin) {
  const t = TEMPLATES[template];
  if (t.board === "ring") {
    if (!photo.corners) return { label: "board not set" };
    const p = photoToBoard(pin.x, pin.y, photo.corners, photo.orientation);
    if (!p) return { label: "off the board", off: true };
    const i = spaceAt(p[0], p[1], CORNER_RATIO);
    if (i === null) return { label: "the middle of the board", middle: true };
    return { space: i, label: `${i} ${SPACES[i].name}` };
  }
  const seats = photo.pins.filter((p) => p.type === "seat" && p.fields.player);
  let best = null;
  for (const s of seats) {
    const d = Math.hypot((s.x - pin.x) * photo.aspect, s.y - pin.y);
    if (d < OWN_RADIUS && (!best || d < best.d)) best = { d, player: s.fields.player };
  }
  return best ? { owner: best.player, label: `in front of ${best.player}` } : { owner: null, label: "on the table" };
}

function describe(template, photo, pin) {
  const f = pin.fields || {};
  const where = locate(template, photo, pin).label;
  switch (pin.type) {
    case "token":
      return `Token ${f.player || "?"} on ${where}`;
    case "house":
    case "hotel":
      return `${pin.type === "house" ? "House" : "Hotel"} on ${where}`;
    case "deed":
      return `Deed ${f.property ? SPACES[f.property].name : "?"} in front of ${f.owner || "?"}${f.mortgaged ? ", mortgaged" : ""}`;
    case "cash":
      return `Cash ${f.amount || "?"} in front of ${f.owner || "?"}`;
    case "seat":
      return `Seat ${f.player || "?"}`;
    case "up":
      return `${f.card || "a card"} face up, ${where}`;
    case "down":
      return `A face-down card, ${where}`;
    case "chips":
      return `${f.count || "?"} chips, ${where}`;
    default:
      return pin.type;
  }
}

function short(pin) {
  const f = pin.fields || {};
  return { token: (f.player || "?").slice(0, 3), house: "h", hotel: "H", deed: "D", cash: "$", seat: f.player || "seat", up: f.card || "up", down: "▒", chips: f.count || "◎" }[pin.type] ?? "?";
}

// The pins, turned into state. The JSON follows HI's normalized models in _content/game-state/.
function deriveState(template, photo) {
  const notes = [];
  if (template === "monopoly") {
    const players = [];
    const buildings = {};
    const holdings = [];
    const cash = {};
    for (const pin of photo.pins) {
      const loc = locate(template, photo, pin);
      if (pin.type === "token") players.push({ id: pin.fields.player || "?", position: loc.space ?? null });
      if (pin.type === "house" || pin.type === "hotel") {
        if (loc.space == null) notes.push(`A ${pin.type} is on ${loc.label}, not on a space.`);
        else {
          if (SPACES[loc.space].kind !== "street") notes.push(`A ${pin.type} is on ${SPACES[loc.space].name}, which the template says can't be built on.`);
          const b = (buildings[loc.space] ||= { houses: 0, hotel: false });
          if (pin.type === "house") b.houses += 1;
          else b.hotel = true;
        }
      }
      if (pin.type === "deed") holdings.push({ property: pin.fields.property ? Number(pin.fields.property) : null, owner: pin.fields.owner || null, mortgaged: !!pin.fields.mortgaged });
      if (pin.type === "cash" && pin.fields.owner) cash[pin.fields.owner] = pin.fields.amount || "unknown";
    }
    for (const [space, b] of Object.entries(buildings)) {
      if (!holdings.some((h) => h.property === Number(space))) notes.push(`${SPACES[space].name} has buildings, but no deed for it is pinned: who owns it?`);
    }
    const json = {
      players: players.map((p) => ({ ...p, cash: cash[p.id] ?? "unknown" })),
      holdings: holdings.map((h) => ({ ...h, property: h.property == null ? null : SPACES[h.property].name, houses: buildings[h.property]?.houses || 0, hotel: buildings[h.property]?.hotel || false })),
      bank: { housesLeft: "count the bank (32 at the start)" },
      turn: "not in the photo",
      decks: "not in the photo",
    };
    const rows = [
      ...json.players.map((p) => ["player", p.id, p.position == null ? "?" : `${p.position} ${SPACES[p.position].name}`, `cash ${p.cash}`]),
      ...json.holdings.map((h) => ["holding", h.property || "?", h.owner || "?", `${h.hotel ? "hotel" : `${h.houses} houses`}${h.mortgaged ? ", mortgaged" : ""}`]),
    ];
    return { json, rows, notes, columns: ["table", "id", "where / owner", "values"] };
  }
  const hands = {};
  const tableState = { faceUp: [], faceDown: 0, chips: 0 };
  for (const pin of photo.pins) {
    if (pin.type === "seat") {
      if (pin.fields.player) hands[pin.fields.player] ||= { faceUp: [], faceDown: 0, chips: 0 };
      continue;
    }
    const { owner } = locate(template, photo, pin);
    const into = owner ? (hands[owner] ||= { faceUp: [], faceDown: 0, chips: 0 }) : tableState;
    if (pin.type === "up") into.faceUp.push(pin.fields.card || "?");
    if (pin.type === "down") into.faceDown += 1;
    if (pin.type === "chips") into.chips += Number.parseInt(pin.fields.count, 10) || 0;
  }
  const hidden = Object.values(hands).reduce((n, h) => n + h.faceDown, tableState.faceDown);
  if (hidden) notes.push(`${hidden} face-down card${hidden === 1 ? "" : "s"}: in the state as a count, not a value. Their faces are state the photo can't see.`);
  if (!photo.pins.some((p) => p.type === "seat")) notes.push("No seats pinned yet, so nothing belongs to anyone: pin a Seat for each player.");
  const json = { seats: Object.keys(hands), hands, table: tableState, turn: "not in the photo" };
  const rows = [...Object.entries(hands).map(([who, h]) => ["hand", who, h.faceUp.join(" ") || "—", `${h.faceDown} down, ${h.chips} chips`]), ["table", "table", tableState.faceUp.join(" ") || "—", `${tableState.faceDown} down, ${tableState.chips} chips`]];
  return { json, rows, notes, columns: ["kind", "who", "face up", "the rest"] };
}

function diff(template, a, b) {
  const out = [];
  const byId = Object.fromEntries(a.pins.map((p) => [p.id, p]));
  const seen = new Set();
  for (const pin of b.pins) {
    seen.add(pin.id);
    const before = byId[pin.id];
    const now = describe(template, b, pin);
    if (!before) out.push({ kind: "added", text: now });
    else {
      const then = describe(template, a, before);
      if (then !== now) out.push({ kind: "changed", text: `${then} → ${now}` });
    }
  }
  for (const pin of a.pins) if (!seen.has(pin.id)) out.push({ kind: "gone", text: describe(template, a, pin) });
  return out;
}

async function shrink(src) {
  const img = new Image();
  img.src = src;
  await img.decode();
  const scale = Math.min(1, MAX_PHOTO_PX / Math.max(img.naturalWidth, img.naturalHeight));
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(img.naturalWidth * scale);
  canvas.height = Math.round(img.naturalHeight * scale);
  canvas.getContext("2d").drawImage(img, 0, 0, canvas.width, canvas.height);
  return { src: canvas.toDataURL("image/jpeg", 0.82), aspect: canvas.width / canvas.height };
}

export default function PhotoState() {
  const [template, setTemplate] = useState("monopoly");
  const [stored, setSession] = useState(() => blankSession("monopoly"));
  const session = stored.template === template ? stored : blankSession(template); // for the one render while the other game's pins load
  const [loaded, setLoaded] = useState(false);
  const [mode, setMode] = useState({ kind: "select" }); // select | place {type} | corners
  const [selected, setSelected] = useState(null);
  const [view, setView] = useState("table");
  const [camera, setCamera] = useState(null); // a MediaStream while the webcam is open
  const [notice, setNotice] = useState("");
  const frame = useRef(null);
  const video = useRef(null);
  const drag = useRef(null);

  const t = TEMPLATES[template];
  const photo = session.photos[session.tab];
  const other = session.photos[session.tab === "A" ? "B" : "A"];

  useEffect(() => {
    setLoaded(false);
    const saved = store.get(storeKey(template));
    setSession(saved?.template === template ? saved : blankSession(template));
    setSelected(null);
    setMode({ kind: "select" });
    setLoaded(true);
  }, [template]);
  useEffect(() => {
    if (loaded && stored.template === template && !store.set(storeKey(template), stored)) setNotice("This browser couldn't keep the photos (storage full); the pins still work until you reload.");
  }, [loaded, template, stored]);

  useEffect(() => {
    if (camera && video.current) video.current.srcObject = camera;
    return () => camera?.getTracks().forEach((track) => track.stop());
  }, [camera]);

  function setPhoto(change) {
    setSession((s) => ({ ...s, photos: { ...s.photos, [s.tab]: { ...s.photos[s.tab], ...change(s.photos[s.tab]) } } }));
  }
  const setPins = (fn) => setPhoto((p) => ({ pins: fn(p.pins) }));

  function pointIn(event) {
    const r = frame.current.getBoundingClientRect();
    return { x: Math.min(1, Math.max(0, (event.clientX - r.left) / r.width)), y: Math.min(1, Math.max(0, (event.clientY - r.top) / r.height)) };
  }

  function onFrameClick(event) {
    if (drag.current?.moved) return;
    const p = pointIn(event);
    if (mode.kind === "corners") {
      const corners = mode.first ? [mode.first, p] : null;
      if (corners) {
        setPhoto(() => ({ corners }));
        setMode({ kind: "select" });
        setNotice("Board set. The grid shows which space each spot on the photo counts as.");
      } else setMode({ kind: "corners", first: p });
      return;
    }
    if (mode.kind === "place") {
      const kind = t.pieces[mode.type];
      const pin = { id: newId(mode.type), type: mode.type, ...p, fields: Object.fromEntries(kind.fields.map((f) => [f.key, f.value])) };
      setPins((pins) => [...pins, pin]);
      setSelected(pin.id);
      return;
    }
    setSelected(null);
  }

  function onPinDown(event, id) {
    event.stopPropagation();
    event.currentTarget.setPointerCapture(event.pointerId);
    drag.current = { id, moved: false };
    setSelected(id);
  }
  function onPinMove(event) {
    if (!drag.current) return;
    drag.current.moved = true;
    const p = pointIn(event);
    setPins((pins) => pins.map((pin) => (pin.id === drag.current.id ? { ...pin, ...p } : pin)));
  }
  function onPinUp() {
    setTimeout(() => (drag.current = null), 0);
  }

  useEffect(() => {
    function onKey(event) {
      if (event.target.closest?.("input, textarea, select")) return;
      if (event.key === "Escape") setMode({ kind: "select" });
      if ((event.key === "Backspace" || event.key === "Delete") && selected) {
        setPins((pins) => pins.filter((p) => p.id !== selected));
        setSelected(null);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  async function onFile(event) {
    const file = event.target.files?.[0];
    if (!file) return;
    const { src, aspect } = await shrink(URL.createObjectURL(file));
    setPhoto(() => ({ src, aspect, corners: null }));
    setNotice(t.board === "ring" ? "New photo. Set the board's corners before pinning, so pins know their spaces." : "New photo. Pin a Seat for each player first.");
    event.target.value = "";
  }

  async function openCamera() {
    try {
      setCamera(await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment", width: 1920 } }));
    } catch (error) {
      setNotice(`The camera didn't open: ${error.message}. Phones need HTTPS; on the laptop, use localhost.`);
    }
  }
  async function takePhoto() {
    const v = video.current;
    const canvas = document.createElement("canvas");
    canvas.width = v.videoWidth;
    canvas.height = v.videoHeight;
    canvas.getContext("2d").drawImage(v, 0, 0);
    const { src, aspect } = await shrink(canvas.toDataURL("image/jpeg", 0.9));
    setPhoto(() => ({ src, aspect, corners: null }));
    setCamera(null);
  }

  function showDrawing() {
    setPhoto(() => ({ src: "sample", aspect: 1.5, corners: t.board === "ring" ? t.sampleCorners : null, orientation: "bottom-right" }));
  }
  function examplePins() {
    if (photo.src !== "sample") showDrawing();
    setPins(() => structuredClone(EXAMPLE_PINS[template][session.tab]));
    setSelected(null);
  }
  function copyFromOther() {
    setPins(() => structuredClone(other.pins));
    setNotice(`Copied ${other.pins.length} pins from ${session.tab === "A" ? "B" : "A"}. Move the ones that moved; the diff follows the pins.`);
  }
  function clearPins() {
    if (photo.pins.length && !window.confirm(`Clear the ${photo.pins.length} pins on photo ${session.tab}?`)) return;
    setPins(() => []);
    setSelected(null);
  }

  const src = photo.src === "sample" ? t.samples[session.tab] : photo.src;
  const state = useMemo(() => deriveState(template, photo), [template, photo]);
  const changes = useMemo(() => diff(template, session.photos.A, session.photos.B), [template, session]);
  const pin = photo.pins.find((p) => p.id === selected);
  const players = [...new Set(photo.pins.filter((p) => p.type === "token").map((p) => p.fields.player).filter(Boolean))];
  const grid = t.board === "ring" && photo.corners ? SPACES.map((s) => ({ ...spaceInPhoto(s.position, CORNER_RATIO, photo.corners, photo.orientation), i: s.position })) : [];

  return (
    <div className="hy-photo">
      <div className="hy-toolbar">
        <label>
          Game{" "}
          <select value={template} onChange={(e) => setTemplate(e.target.value)}>
            {Object.entries(TEMPLATES).map(([id, tt]) => (
              <option key={id} value={id}>
                {tt.name}
              </option>
            ))}
          </select>
        </label>
        <div className="hy-tabs" role="tablist">
          {["A", "B"].map((tab) => (
            <button key={tab} role="tab" aria-selected={session.tab === tab} className={session.tab === tab ? "on" : ""} onClick={() => setSession((s) => ({ ...s, tab }))}>
              Photo {tab} <small>{session.photos[tab].pins.length} pins</small>
            </button>
          ))}
        </div>
        <div className="hy-actions">
          <label className="button">
            Upload or shoot
            <input type="file" accept="image/*" capture="environment" onChange={onFile} hidden />
          </label>
          <button className="button" onClick={camera ? () => setCamera(null) : openCamera}>{camera ? "Close webcam" : "Webcam"}</button>
          <button className="button" onClick={showDrawing}>Drawing</button>
        </div>
      </div>

      {notice && (
        <p className="hy-notice" onClick={() => setNotice("")}>
          {notice}
        </p>
      )}

      <div className="hy-split hy-photo-split">
        <section className="hy-panel">
          {camera ? (
            <div className="hy-camera">
              <video ref={video} autoPlay playsInline muted />
              <button className="button primary" onClick={takePhoto}>
                Take photo {session.tab}
              </button>
            </div>
          ) : (
            <div ref={frame} className={`hy-frame mode-${mode.kind}`} onClick={onFrameClick} style={{ aspectRatio: photo.aspect }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt={`Photo ${session.tab}`} draggable={false} />
              {grid.map((g) => (
                <div key={g.i} className="hy-space" style={{ left: `${g.x * 100}%`, top: `${g.y * 100}%`, width: `${g.w * 100}%`, height: `${g.h * 100}%` }} />
              ))}
              {mode.kind === "corners" && mode.first && <div className="hy-corner" style={{ left: `${mode.first.x * 100}%`, top: `${mode.first.y * 100}%` }} />}
              {photo.pins.map((p) => (
                <button
                  key={p.id}
                  className={`hy-pin${p.id === selected ? " on" : ""}`}
                  style={{ left: `${p.x * 100}%`, top: `${p.y * 100}%`, "--pin": t.pieces[p.type]?.color || "#fff" }}
                  title={describe(template, photo, p)}
                  onPointerDown={(e) => onPinDown(e, p.id)}
                  onPointerMove={onPinMove}
                  onPointerUp={onPinUp}
                  onClick={(e) => e.stopPropagation()}
                >
                  {short(p)}
                </button>
              ))}
            </div>
          )}
          <p className="hy-hint muted">
            {mode.kind === "corners" && (mode.first ? "Now click the opposite corner of the board." : "Click one corner of the board.")}
            {mode.kind === "place" && `Click the photo to pin a ${t.pieces[mode.type].name.toLowerCase()}. Esc to stop.`}
            {mode.kind === "select" && "Pick a piece on the right, then click the photo where you see it. Drag pins to move them; Delete removes one."}
          </p>
        </section>

        <section className="hy-panel">
          <div className="hy-panel-head">
            <h2>Pin what you see</h2>
          </div>
          <div className="hy-palette">
            {Object.entries(t.pieces).map(([type, kind]) => (
              <button key={type} className={`hy-piece${mode.kind === "place" && mode.type === type ? " on" : ""}`} style={{ "--pin": kind.color }} onClick={() => setMode(mode.kind === "place" && mode.type === type ? { kind: "select" } : { kind: "place", type })}>
                <span className="hy-dot" style={{ background: kind.color }} /> {kind.name}
              </button>
            ))}
          </div>
          {t.board === "ring" && (
            <div className="hy-board-set">
              <button className="linkish" onClick={() => setMode({ kind: "corners" })}>
                {photo.corners ? "Reset the board's corners" : "Set the board's corners"}
              </button>
              <label>
                GO is at the{" "}
                <select value={photo.orientation} onChange={(e) => setPhoto(() => ({ orientation: e.target.value }))}>
                  {ORIENTATIONS.map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
              </label>
            </div>
          )}
          <div className="hy-board-set">
            <button className="linkish" onClick={examplePins}>Example pins for the drawing</button>
            <button className="linkish" onClick={copyFromOther} disabled={!other.pins.length}>
              Copy pins from {session.tab === "A" ? "B" : "A"}
            </button>
            <button className="linkish" onClick={clearPins}>Clear</button>
          </div>

          {pin && (
            <div className="hy-editor">
              <p>
                <strong>{t.pieces[pin.type].name}</strong> <span className="muted">· {describe(template, photo, pin)}</span>
              </p>
              {t.pieces[pin.type].fields.map((f) => {
                const value = pin.fields[f.key];
                const set = (v) => setPins((pins) => pins.map((p) => (p.id === pin.id ? { ...p, fields: { ...p.fields, [f.key]: v } } : p)));
                if (f.kind === "check")
                  return (
                    <label key={f.key} className="hy-field check">
                      <input type="checkbox" checked={!!value} onChange={(e) => set(e.target.checked)} /> {f.label}
                    </label>
                  );
                if (f.kind === "property")
                  return (
                    <label key={f.key} className="hy-field">
                      {f.label}
                      <select value={value} onChange={(e) => set(e.target.value)}>
                        <option value="">?</option>
                        {PROPERTIES.map((s) => (
                          <option key={s.position} value={String(s.position)}>
                            {s.position} {s.name}
                          </option>
                        ))}
                      </select>
                    </label>
                  );
                return (
                  <label key={f.key} className="hy-field">
                    {f.label}
                    <input value={value} list={f.kind === "player" ? "hy-players" : undefined} onChange={(e) => set(e.target.value)} />
                  </label>
                );
              })}
              <datalist id="hy-players">
                {players.map((p) => (
                  <option key={p} value={p} />
                ))}
              </datalist>
              <button
                className="linkish"
                onClick={() => {
                  setPins((pins) => pins.filter((p) => p.id !== pin.id));
                  setSelected(null);
                }}
              >
                Remove this pin
              </button>
            </div>
          )}

          <div className="hy-panel-head hy-state-head">
            <h2>Game state, photo {session.tab}</h2>
            <div className="hy-tabs small">
              {["table", "json"].map((v) => (
                <button key={v} className={view === v ? "on" : ""} onClick={() => setView(v)}>
                  {v}
                </button>
              ))}
            </div>
          </div>
          {view === "table" ? (
            <table className="hy-board">
              <thead>
                <tr>
                  {state.columns.map((c) => (
                    <th key={c}>{c}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {state.rows.map((r, i) => (
                  <tr key={i}>
                    {r.map((cell, j) => (
                      <td key={j}>{cell}</td>
                    ))}
                  </tr>
                ))}
                {!state.rows.length && (
                  <tr>
                    <td colSpan={4} className="muted">
                      Nothing pinned yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          ) : (
            <pre className="hy-json">{JSON.stringify(state.json, null, 2)}</pre>
          )}
          {state.notes.length > 0 && (
            <ul className="hy-notes">
              {state.notes.map((n) => (
                <li key={n}>{n}</li>
              ))}
            </ul>
          )}
        </section>
      </div>

      <div className="hy-split">
        <section className="hy-panel">
          <div className="hy-panel-head">
            <h2>From A to B</h2>
            <p className="muted">Pins with the same id are the same piece.</p>
          </div>
          {!session.photos.A.pins.length || !session.photos.B.pins.length ? (
            <p className="muted">Pin both photos to compare them. Pin A, then use “Copy pins from A” on B and move what moved.</p>
          ) : changes.length ? (
            <ul className="hy-diff">
              {changes.map((c, i) => (
                <li key={i} className={c.kind}>
                  <span>{c.kind}</span> {c.text}
                </li>
              ))}
            </ul>
          ) : (
            <p className="muted">No differences: by these pins, nothing changed.</p>
          )}
        </section>
        <section className="hy-panel">
          <div className="hy-panel-head">
            <h2>Not in the photo</h2>
            <p className="muted">Part of the state, and no camera overhead sees it.</p>
          </div>
          <ul className="hy-notes">
            {t.unseen.map((u) => (
              <li key={u}>{u}</li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
