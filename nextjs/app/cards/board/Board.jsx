"use client";

import { useCollection } from "../collection.js";
import Link from "next/link";
import { memo, useEffect, useMemo, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

// The card board (/cards/board, Nov 15): copied from AL's app/ideas/board/Board.jsx and changed for _content/cards/:
// convolutes take the place of weeks (tidy into columns by convolute, filter the tray by convolute), and cards keep
// the reading order the server sends (convolute, then follows chain) when tidied.
// The whiteboard: cards as cut paper on a pannable, zoomable board, with marker labels and group frames.
// World coordinates are board pixels at zoom 1; the viewport maps them to the screen as world * zoom + (x, y).
// The arrangement autosaves to /cards/api/layout/<name> (lib/cards.mjs writes _content/cards/_layouts/<name>.json).

const W = 176;
const H = 120;
const GAP = 16;
const MIN_ZOOM = 0.15;
const MAX_ZOOM = 3;
const HISTORY = 60;
const MARKERS = ["#1d1f1c", "#2257c9", "#c8322b", "#1f8a4c", "#7a3fc2"];
const MARKER_NAMES = ["Black", "Blue", "Red", "Green", "Purple"];
const DEFAULT_VIEW = { x: 40, y: 40, zoom: 1 };

const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));
const num = (v) => typeof v === "number" && Number.isFinite(v);
const newId = (prefix) => `${prefix}-${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;
const isTyping = (el) => Boolean(el && (el.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName)));
const inside = (px, py, r) => px >= r.x && py >= r.y && px <= r.x + r.w && py <= r.y + r.h;
const overlaps = (a, b) => a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;

function zoomed(v, factor, sx, sy) {
  const zoom = clamp(v.zoom * factor, MIN_ZOOM, MAX_ZOOM);
  const k = zoom / v.zoom;
  return { x: sx - (sx - v.x) * k, y: sy - (sy - v.y) * k, zoom };
}

// A saved layout, cleaned: cards whose file is gone are dropped, bad entries skipped.
function normalize(layout, slugs) {
  const cards = {};
  for (const [slug, p] of Object.entries(layout?.cards || {})) if (slugs.has(slug) && p && num(p.x) && num(p.y)) cards[slug] = { x: p.x, y: p.y };
  const labels = (Array.isArray(layout?.labels) ? layout.labels : [])
    .filter((l) => l && num(l.x) && num(l.y) && typeof l.text === "string")
    .map((l, i) => ({
      id: l.id ? String(l.id) : `l-${i}`,
      x: l.x,
      y: l.y,
      text: l.text,
      size: num(l.size) ? clamp(l.size, 10, 160) : 28,
      color: typeof l.color === "string" ? l.color : MARKERS[0],
      ...(l.tidy ? { tidy: true } : {}),
    }));
  const frames = (Array.isArray(layout?.frames) ? layout.frames : [])
    .filter((f) => f && num(f.x) && num(f.y) && num(f.w) && num(f.h))
    .map((f, i) => ({
      id: f.id ? String(f.id) : `f-${i}`,
      x: f.x,
      y: f.y,
      w: Math.max(120, f.w),
      h: Math.max(80, f.h),
      title: typeof f.title === "string" ? f.title : "",
      color: typeof f.color === "string" ? f.color : MARKERS[1],
    }));
  const v = layout?.viewport;
  const viewport = v && num(v.x) && num(v.y) && num(v.zoom) ? { x: v.x, y: v.y, zoom: clamp(v.zoom, MIN_ZOOM, MAX_ZOOM) } : null;
  return { doc: { cards, labels, frames }, viewport };
}

// Selection keys: c:<slug>, l:<label id>, f:<frame id>.
function splitSelection(sel) {
  const out = { cards: new Set(), labels: new Set(), frames: new Set() };
  for (const key of sel) out[{ c: "cards", l: "labels", f: "frames" }[key[0]]]?.add(key.slice(2));
  return out;
}

// What moves with a selection: the selected items, plus whatever sits inside a selected frame.
function collectMoving(sel, d) {
  const m = splitSelection(sel);
  for (const f of d.frames) {
    if (!m.frames.has(f.id)) continue;
    for (const [slug, p] of Object.entries(d.cards)) if (inside(p.x + W / 2, p.y + H / 2, f)) m.cards.add(slug);
    for (const l of d.labels) if (inside(l.x + 4, l.y + 4, f)) m.labels.add(l.id);
    for (const g of d.frames) if (g !== f && g.x >= f.x && g.y >= f.y && g.x + g.w <= f.x + f.w && g.y + g.h <= f.y + f.h) m.frames.add(g.id);
  }
  return m;
}

function shift(d, m, dx, dy, from = d) {
  const cards = { ...d.cards };
  for (const slug of m.cards) if (cards[slug] && from.cards[slug]) cards[slug] = { x: Math.round(from.cards[slug].x + dx), y: Math.round(from.cards[slug].y + dy) };
  const start = (list, id) => list.find((x) => x.id === id);
  return {
    ...d,
    cards,
    labels: d.labels.map((l) => (m.labels.has(l.id) && start(from.labels, l.id) ? { ...l, x: Math.round(start(from.labels, l.id).x + dx), y: Math.round(start(from.labels, l.id).y + dy) } : l)),
    frames: d.frames.map((f) => (m.frames.has(f.id) && start(from.frames, f.id) ? { ...f, x: Math.round(start(from.frames, f.id).x + dx), y: Math.round(start(from.frames, f.id).y + dy) } : f)),
  };
}

export default function Board({ ideas, initialLayout, name, boardLabel, kinds, hues, convolutes = [] }) {
  const convTitle = useMemo(() => Object.fromEntries(convolutes), [convolutes]);
  const readingOrder = useMemo(() => new Map(ideas.map((i, n) => [i.slug, n])), [ideas]);
  const { base, api, layouts, label } = useCollection();
  const byslug = useMemo(() => new Map(ideas.map((i) => [i.slug, i])), [ideas]);
  const [initial] = useState(() => {
    const n = normalize(initialLayout, new Set(ideas.map((i) => i.slug)));
    return { doc: n.doc, viewport: n.viewport || DEFAULT_VIEW, hadViewport: Boolean(n.viewport) };
  });

  const [doc, setDoc] = useState(initial.doc);
  const [viewport, setViewport] = useState(initial.viewport);
  const [selection, setSelection] = useState(() => new Set());
  const [tool, setTool] = useState("pan");
  const [editing, setEditing] = useState(null);
  const [detail, setDetail] = useState(null);
  const [marquee, setMarquee] = useState(null);
  const [draft, setDraft] = useState(null);
  const [ghost, setGhost] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [panning, setPanning] = useState(false);
  const [spaceHeld, setSpaceHeld] = useState(false);
  const [trayOpen, setTrayOpen] = useState(true);
  const [status, setStatus] = useState(initialLayout?.savedAt ? "saved" : "new");
  const [ready, setReady] = useState(false);
  const [, setHistoryTick] = useState(0);
  const [query, setQuery] = useState("");
  const [convolute, setConvolute] = useState("");
  const [kind, setKind] = useState("");
  const [tag, setTag] = useState("");

  const vpRef = useRef(null);
  const worldRef = useRef(null);
  const docRef = useRef(doc);
  const viewportRef = useRef(viewport);
  const selectionRef = useRef(selection);
  const spaceRef = useRef(false);
  const lastPointerRef = useRef(false);
  const undoRef = useRef([]);
  const redoRef = useRef([]);
  const baseRef = useRef(initial);
  const seqRef = useRef(0);
  const pendingRef = useRef(false);
  const cancelEditRef = useRef(false);
  const cascadeRef = useRef(0);
  const keyRef = useRef(null);
  docRef.current = doc;
  viewportRef.current = viewport;
  selectionRef.current = selection;

  const setDocNow = (next) => {
    docRef.current = next;
    setDoc(next);
  };
  const remember = (before) => {
    undoRef.current = [...undoRef.current.slice(-(HISTORY - 1)), before];
    redoRef.current = [];
    setHistoryTick((n) => n + 1);
  };
  // A change that can be undone.
  const change = (fn) => {
    const before = docRef.current;
    const next = fn(before);
    if (next === before) return;
    remember(before);
    setDocNow(next);
  };
  const undo = () => {
    const prev = undoRef.current.pop();
    if (!prev) return;
    redoRef.current.push(docRef.current);
    setDocNow(prev);
    setSelection(new Set());
    setHistoryTick((n) => n + 1);
  };
  const redo = () => {
    const next = redoRef.current.pop();
    if (!next) return;
    undoRef.current.push(docRef.current);
    setDocNow(next);
    setSelection(new Set());
    setHistoryTick((n) => n + 1);
  };

  const toWorld = (cx, cy) => {
    const r = vpRef.current.getBoundingClientRect();
    const v = viewportRef.current;
    return { x: (cx - r.left - v.x) / v.zoom, y: (cy - r.top - v.y) / v.zoom };
  };
  const viewCenter = () => {
    const el = vpRef.current;
    const v = viewportRef.current;
    return { x: (el.clientWidth / 2 - v.x) / v.zoom, y: (el.clientHeight / 2 - v.y) / v.zoom };
  };
  const labelBox = (l) => {
    const el = worldRef.current?.querySelector(`[data-label="${CSS.escape(l.id)}"]`);
    return { x: l.x, y: l.y, w: el ? el.offsetWidth : Math.max(40, l.text.length * l.size * 0.55), h: el ? el.offsetHeight : l.size * 1.3 };
  };
  const allBoxes = (d = docRef.current) => [...Object.values(d.cards).map((p) => ({ x: p.x, y: p.y, w: W, h: H })), ...d.labels.map(labelBox), ...d.frames];

  const fitView = (boxes = allBoxes()) => {
    const el = vpRef.current;
    if (!el) return null;
    if (!boxes.length) return DEFAULT_VIEW;
    const minX = Math.min(...boxes.map((b) => b.x));
    const minY = Math.min(...boxes.map((b) => b.y));
    const maxX = Math.max(...boxes.map((b) => b.x + b.w));
    const maxY = Math.max(...boxes.map((b) => b.y + b.h));
    const pad = 48;
    const zoom = clamp(Math.min((el.clientWidth - pad * 2) / (maxX - minX), (el.clientHeight - pad * 2) / (maxY - minY), 1.25), MIN_ZOOM, MAX_ZOOM);
    return { x: (el.clientWidth - (maxX - minX) * zoom) / 2 - minX * zoom, y: (el.clientHeight - (maxY - minY) * zoom) / 2 - minY * zoom, zoom };
  };
  const fit = (boxes) => {
    const v = fitView(boxes);
    if (v) setViewport(v);
  };
  const zoomBy = (factor) => {
    const el = vpRef.current;
    setViewport((v) => zoomed(v, factor, el.clientWidth / 2, el.clientHeight / 2));
  };

  // --- placing and removing cards ---
  const placeOne = (slug, at) => {
    const n = cascadeRef.current++ % 6;
    const p = at || { x: viewCenter().x - W / 2 + n * 14, y: viewCenter().y - H / 2 + n * 14 };
    change((d) => ({ ...d, cards: { ...d.cards, [slug]: { x: Math.round(p.x), y: Math.round(p.y) } } }));
    setSelection(new Set([`c:${slug}`]));
  };
  const placeAll = (slugs) => {
    if (!slugs.length) return;
    const d = docRef.current;
    const boxes = allBoxes(d);
    let ox, oy;
    if (boxes.length) {
      ox = Math.max(...boxes.map((b) => b.x + b.w)) + 80;
      oy = Math.min(...boxes.map((b) => b.y));
    } else {
      const v = viewportRef.current;
      ox = Math.round((40 - v.x) / v.zoom);
      oy = Math.round((40 - v.y) / v.zoom);
    }
    const cols = Math.ceil(Math.sqrt(slugs.length * 1.5));
    const cards = { ...d.cards };
    slugs.forEach((slug, i) => {
      cards[slug] = { x: ox + (i % cols) * (W + GAP), y: oy + Math.floor(i / cols) * (H + GAP) };
    });
    const next = { ...d, cards };
    change(() => next);
    setSelection(new Set());
    fit(allBoxes(next));
  };
  const toTray = (slugs) => {
    if (!slugs.length) return;
    change((d) => {
      const cards = { ...d.cards };
      for (const s of slugs) delete cards[s];
      return { ...d, cards };
    });
    setSelection((sel) => new Set([...sel].filter((k) => !(k[0] === "c" && slugs.includes(k.slice(2))))));
  };
  const removeSelection = () => {
    const m = splitSelection(selectionRef.current);
    if (!m.cards.size && !m.labels.size && !m.frames.size) return;
    change((d) => {
      const cards = { ...d.cards };
      for (const s of m.cards) delete cards[s];
      return { cards, labels: d.labels.filter((l) => !m.labels.has(l.id)), frames: d.frames.filter((f) => !m.frames.has(f.id)) };
    });
    setSelection(new Set());
  };
  const findOnBoard = (slug) => {
    const p = docRef.current.cards[slug];
    const el = vpRef.current;
    if (!p || !el) return;
    const zoom = Math.max(viewportRef.current.zoom, 1);
    setViewport({ x: el.clientWidth / 2 - (p.x + W / 2) * zoom, y: el.clientHeight / 2 - (p.y + H / 2) * zoom, zoom });
    setSelection(new Set([`c:${slug}`]));
  };

  // --- tidy: columns by kind, convolute, or first tag, each headed by a label ---
  const tidy = (by) => {
    const d = docRef.current;
    const placed = Object.keys(d.cards).map((s) => byslug.get(s)).filter(Boolean);
    if (!placed.length) return;
    const kindOrder = kinds.map(([k]) => k);
    const keyOf = { kind: (i) => i.kind || "other", convolute: (i) => i.convolute || "no convolute", tag: (i) => i.tags[0] || "untagged" }[by];
    const groups = new Map();
    for (const idea of placed) {
      const k = keyOf(idea);
      if (!groups.has(k)) groups.set(k, []);
      groups.get(k).push(idea);
    }
    const order = [...groups.keys()].sort((a, b) => {
      if (by === "kind") return (kindOrder.indexOf(a) + 1 || 99) - (kindOrder.indexOf(b) + 1 || 99) || a.localeCompare(b);
      if (by === "convolute") return (convolutes.findIndex(([v]) => v === a) + 1 || 99) - (convolutes.findIndex(([v]) => v === b) + 1 || 99) || a.localeCompare(b);
      return groups.get(b).length - groups.get(a).length || a.localeCompare(b);
    });
    const heading = (k) => {
      if (by === "kind") return kinds.find(([v]) => v === k)?.[1] || k;
      if (by === "convolute") return convTitle[k] || k;
      return k === "untagged" ? k : `#${k}`;
    };
    const x0 = Math.min(...placed.map((i) => d.cards[i.slug].x));
    const y0 = Math.min(...placed.map((i) => d.cards[i.slug].y));
    const maxRows = 8;
    const cards = { ...d.cards };
    const labels = d.labels.filter((l) => !l.tidy);
    let x = x0;
    for (const k of order) {
      const list = groups.get(k).sort((a, b) => (readingOrder.get(a.slug) ?? 0) - (readingOrder.get(b.slug) ?? 0));
      labels.push({ id: newId("l"), x, y: y0 - 64, text: `${heading(k)} · ${list.length}`, size: 30, color: by === "kind" && hues[k] != null ? `hsl(${hues[k]} 55% 36%)` : MARKERS[0], tidy: true });
      list.forEach((idea, i) => {
        cards[idea.slug] = { x: x + Math.floor(i / maxRows) * (W + GAP), y: y0 + (i % maxRows) * (H + GAP) };
      });
      x += Math.ceil(list.length / maxRows) * (W + GAP) + 48;
    }
    const next = { ...d, cards, labels };
    change(() => next);
    setSelection(new Set());
    requestAnimationFrame(() => fit(allBoxes(next)));
  };

  // --- labels and frames ---
  const addLabel = (x, y) => {
    const id = newId("l");
    const d = docRef.current;
    setDocNow({ ...d, labels: [...d.labels, { id, x: Math.round(x - 6), y: Math.round(y - 18), text: "", size: 28, color: MARKERS[0] }] });
    setSelection(new Set([`l:${id}`]));
    setEditing({ kind: "label", id, isNew: true });
  };
  const commitLabel = (id, value, isNew) => {
    setEditing(null);
    const d = docRef.current;
    const label = d.labels.find((l) => l.id === id);
    if (!label) return;
    const cancelled = cancelEditRef.current;
    cancelEditRef.current = false;
    const text = cancelled ? label.text : value.replace(/\s+$/, "");
    const without = { ...d, labels: d.labels.filter((l) => l.id !== id) };
    const withText = { ...d, labels: d.labels.map((l) => (l.id === id ? { ...l, text } : l)) };
    if (isNew) {
      if (!text.trim()) return setDocNow(without);
      remember(without);
      return setDocNow(withText);
    }
    if (text === label.text) return;
    change(() => (text.trim() ? withText : without));
  };
  const commitFrameTitle = (id, value) => {
    setEditing(null);
    const cancelled = cancelEditRef.current;
    cancelEditRef.current = false;
    const frame = docRef.current.frames.find((f) => f.id === id);
    if (!frame || cancelled || value.trim() === frame.title) return;
    change((d) => ({ ...d, frames: d.frames.map((f) => (f.id === id ? { ...f, title: value.trim() } : f)) }));
  };
  const recolor = (color) => {
    const m = splitSelection(selectionRef.current);
    change((d) => ({ ...d, labels: d.labels.map((l) => (m.labels.has(l.id) ? { ...l, color } : l)), frames: d.frames.map((f) => (m.frames.has(f.id) ? { ...f, color } : f)) }));
  };
  const resizeLabels = (factor) => {
    const m = splitSelection(selectionRef.current);
    change((d) => ({ ...d, labels: d.labels.map((l) => (m.labels.has(l.id) ? { ...l, size: Math.round(clamp(l.size * factor, 10, 160)) } : l)) }));
  };

  // --- pointer drags: one gesture at a time, tracked on window ---
  function beginDrag(e, drag) {
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {}
    const move = (ev) => ev.pointerId === e.pointerId && dragMove(drag, ev);
    const end = (ev) => {
      if (ev.pointerId !== e.pointerId) return;
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", end);
      window.removeEventListener("pointercancel", end);
      dragEnd(drag, ev);
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", end);
    window.addEventListener("pointercancel", end);
  }

  function dragMove(drag, ev) {
    const sdx = ev.clientX - drag.sx;
    const sdy = ev.clientY - drag.sy;
    if (!drag.moved) {
      if (Math.hypot(sdx, sdy) < (drag.mode === "tray" ? 5 : 3)) return;
      drag.moved = true;
      if (drag.mode === "move") setDragging(true);
      if (drag.mode === "pan") setPanning(true);
    }
    const zoom = viewportRef.current.zoom;
    if (drag.mode === "pan") {
      setViewport((v) => ({ ...v, x: drag.vx + sdx, y: drag.vy + sdy }));
    } else if (drag.mode === "move") {
      setDocNow(shift(docRef.current, drag.moving, sdx / zoom, sdy / zoom, drag.from));
    } else if (drag.mode === "resize") {
      const w = Math.round(Math.max(120, drag.w + sdx / zoom));
      const h = Math.round(Math.max(80, drag.h + sdy / zoom));
      const d = docRef.current;
      setDocNow({ ...d, frames: d.frames.map((f) => (f.id === drag.id ? { ...f, w, h } : f)) });
    } else if (drag.mode === "marquee" || drag.mode === "frame") {
      const p = toWorld(ev.clientX, ev.clientY);
      const rect = { x: Math.min(p.x, drag.start.x), y: Math.min(p.y, drag.start.y), w: Math.abs(p.x - drag.start.x), h: Math.abs(p.y - drag.start.y) };
      if (drag.mode === "frame") return setDraft(rect);
      setMarquee(rect);
      const d = docRef.current;
      const hits = new Set(drag.base);
      for (const [slug, c] of Object.entries(d.cards)) if (overlaps(rect, { x: c.x, y: c.y, w: W, h: H })) hits.add(`c:${slug}`);
      for (const [id, box] of drag.labelBoxes) if (overlaps(rect, box)) hits.add(`l:${id}`);
      for (const f of d.frames) if (f.x >= rect.x && f.y >= rect.y && f.x + f.w <= rect.x + rect.w && f.y + f.h <= rect.y + rect.h) hits.add(`f:${f.id}`);
      setSelection(hits);
    } else if (drag.mode === "tray") {
      setGhost({ slug: drag.slug, x: ev.clientX, y: ev.clientY });
    }
  }

  function dragEnd(drag, ev) {
    const cancelled = ev.type === "pointercancel";
    if (drag.mode === "pan") {
      setPanning(false);
      if (!drag.moved && !drag.viaSpace) setSelection(new Set());
    } else if (drag.mode === "move") {
      setDragging(false);
      if (drag.moved) remember(drag.before);
      else if (drag.wasSelected && !drag.shift && drag.count > 1) setSelection(new Set([drag.key]));
    } else if (drag.mode === "resize") {
      if (drag.moved) remember(drag.before);
    } else if (drag.mode === "marquee") {
      setMarquee(null);
      if (!drag.moved && !drag.base.size) setSelection(new Set());
    } else if (drag.mode === "frame") {
      setDraft(null);
      setTool("pan");
      const p = toWorld(ev.clientX, ev.clientY);
      const rect = { x: Math.min(p.x, drag.start.x), y: Math.min(p.y, drag.start.y), w: Math.abs(p.x - drag.start.x), h: Math.abs(p.y - drag.start.y) };
      if (cancelled || rect.w < 24 || rect.h < 24) return;
      const id = newId("f");
      change((d) => ({ ...d, frames: [...d.frames, { id, x: Math.round(rect.x), y: Math.round(rect.y), w: Math.round(Math.max(120, rect.w)), h: Math.round(Math.max(80, rect.h)), title: "", color: MARKERS[1] }] }));
      setSelection(new Set([`f:${id}`]));
      setEditing({ kind: "frame", id });
    } else if (drag.mode === "text") {
      setTool("pan");
      if (!cancelled) addLabel(drag.start.x, drag.start.y);
    } else if (drag.mode === "tray") {
      setGhost(null);
      if (!drag.moved || cancelled) return;
      const r = vpRef.current.getBoundingClientRect();
      if (!inside(ev.clientX, ev.clientY, { x: r.left, y: r.top, w: r.width, h: r.height })) return;
      const p = toWorld(ev.clientX, ev.clientY);
      placeOne(drag.slug, { x: p.x - W / 2, y: p.y - H / 2 });
    }
  }

  function onBoardPointerDown(e) {
    lastPointerRef.current = true;
    if (e.button === 2 || e.target.closest(".board-editing")) return;
    const v = viewportRef.current;
    const base = { sx: e.clientX, sy: e.clientY, moved: false };
    if (e.button === 1 || spaceRef.current) {
      e.preventDefault();
      return beginDrag(e, { ...base, mode: "pan", vx: v.x, vy: v.y, viaSpace: true });
    }
    const resize = e.target.closest("[data-frame-resize]");
    if (resize) {
      const f = docRef.current.frames.find((x) => x.id === resize.dataset.frameResize);
      if (!f) return;
      setSelection(new Set([`f:${f.id}`]));
      return beginDrag(e, { ...base, mode: "resize", id: f.id, w: f.w, h: f.h, before: docRef.current });
    }
    const item = e.target.closest("[data-card], [data-label], [data-frame-handle]");
    if (item) {
      const key = item.dataset.card != null ? `c:${item.dataset.card}` : item.dataset.label != null ? `l:${item.dataset.label}` : `f:${item.dataset.frameHandle}`;
      const wasSelected = selectionRef.current.has(key);
      let sel = selectionRef.current;
      if (e.shiftKey) {
        sel = new Set(sel);
        if (wasSelected) {
          sel.delete(key);
          setSelection(sel);
          return;
        }
        sel.add(key);
      } else if (!wasSelected) sel = new Set([key]);
      setSelection(sel);
      // Bring what moves to the front, then drag it.
      const d = docRef.current;
      const moving = collectMoving(sel, d);
      const cards = {};
      for (const [slug, p] of Object.entries(d.cards)) if (!moving.cards.has(slug)) cards[slug] = p;
      for (const slug of moving.cards) if (d.cards[slug]) cards[slug] = d.cards[slug];
      const frames = [...d.frames.filter((f) => !moving.frames.has(f.id)), ...d.frames.filter((f) => moving.frames.has(f.id))];
      const from = { ...d, cards, frames };
      setDocNow(from);
      return beginDrag(e, { ...base, mode: "move", key, shift: e.shiftKey, wasSelected, count: sel.size, moving, from, before: d });
    }
    const start = toWorld(e.clientX, e.clientY);
    // The label is added on pointerup, after the browser has moved focus, so its editor keeps focus.
    if (tool === "text") return beginDrag(e, { ...base, mode: "text", start });
    if (tool === "frame") return beginDrag(e, { ...base, mode: "frame", start });
    if (tool === "select" || e.shiftKey) {
      const labelBoxes = new Map(docRef.current.labels.map((l) => [l.id, labelBox(l)]));
      return beginDrag(e, { ...base, mode: "marquee", start, base: e.shiftKey ? new Set(selectionRef.current) : new Set(), labelBoxes });
    }
    beginDrag(e, { ...base, mode: "pan", vx: v.x, vy: v.y });
  }

  function onBoardDoubleClick(e) {
    if (e.target.closest(".board-editing, [data-frame-resize]")) return;
    const card = e.target.closest("[data-card]");
    if (card) return setDetail(card.dataset.card);
    const label = e.target.closest("[data-label]");
    if (label) return setEditing({ kind: "label", id: label.dataset.label });
    const frame = e.target.closest("[data-frame-handle]");
    if (frame) return setEditing({ kind: "frame", id: frame.dataset.frameHandle });
    const p = toWorld(e.clientX, e.clientY);
    addLabel(p.x, p.y);
  }

  function onBoardKeyDown(e) {
    if (e.key === "Enter" && e.target.dataset?.card) {
      e.preventDefault();
      setDetail(e.target.dataset.card);
    }
  }

  function onTrayPointerDown(e, slug) {
    lastPointerRef.current = true;
    if (e.button !== 0 || e.target.closest("button")) return;
    beginDrag(e, { mode: "tray", slug, sx: e.clientX, sy: e.clientY, moved: false });
  }

  // --- keyboard ---
  keyRef.current = (e) => {
    if (e.type === "keyup") {
      if (e.code === "Space") {
        spaceRef.current = false;
        setSpaceHeld(false);
      }
      return;
    }
    if (e.key === "Tab") lastPointerRef.current = false;
    if (isTyping(e.target)) return;
    const mod = e.metaKey || e.ctrlKey;
    const key = e.key.toLowerCase();
    if (e.code === "Space") {
      if (e.target.closest?.("button, a, [role=button]") && !lastPointerRef.current) return;
      e.preventDefault();
      if (!spaceRef.current) {
        spaceRef.current = true;
        setSpaceHeld(true);
      }
      return;
    }
    if (mod && key === "z") {
      e.preventDefault();
      return e.shiftKey ? redo() : undo();
    }
    if (mod && key === "y") {
      e.preventDefault();
      return redo();
    }
    if (mod && key === "a") {
      e.preventDefault();
      const d = docRef.current;
      return setSelection(new Set([...Object.keys(d.cards).map((s) => `c:${s}`), ...d.labels.map((l) => `l:${l.id}`), ...d.frames.map((f) => `f:${f.id}`)]));
    }
    if (mod || e.altKey) return;
    if (e.key === "Delete" || e.key === "Backspace") {
      if (selectionRef.current.size) {
        e.preventDefault();
        removeSelection();
      }
      return;
    }
    if (e.key === "Escape") {
      if (detail) setDetail(null);
      else if (tool !== "pan") setTool("pan");
      else setSelection(new Set());
      return;
    }
    const arrows = { ArrowLeft: [-1, 0], ArrowRight: [1, 0], ArrowUp: [0, -1], ArrowDown: [0, 1] }[e.key];
    if (arrows && selectionRef.current.size) {
      e.preventDefault();
      const step = e.shiftKey ? 40 : 8;
      const m = collectMoving(selectionRef.current, docRef.current);
      return change((d) => shift(d, m, arrows[0] * step, arrows[1] * step));
    }
    const tools = { h: "pan", v: "select", f: "frame", t: "text" };
    if (tools[key]) setTool(tools[key]);
  };

  useEffect(() => {
    const onKey = (e) => keyRef.current(e);
    const onBlur = () => {
      spaceRef.current = false;
      setSpaceHeld(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("keyup", onKey);
    window.addEventListener("blur", onBlur);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("keyup", onKey);
      window.removeEventListener("blur", onBlur);
    };
  }, []);

  // Wheel pans; ctrl/⌘ + wheel (and trackpad pinch) zooms; Safari's pinch arrives as gesture events.
  useEffect(() => {
    const el = vpRef.current;
    let gesture = null;
    const onWheel = (e) => {
      e.preventDefault();
      const r = el.getBoundingClientRect();
      const unit = e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? r.height : 1;
      const dx = e.deltaX * unit;
      const dy = e.deltaY * unit;
      if (e.ctrlKey || e.metaKey) {
        if (gesture) return;
        const k = Math.abs(dy) >= 40 ? Math.sign(dy) * 0.12 : dy * 0.01;
        setViewport((v) => zoomed(v, Math.exp(-k), e.clientX - r.left, e.clientY - r.top));
      } else if (e.shiftKey && !dx) setViewport((v) => ({ ...v, x: v.x - dy }));
      else setViewport((v) => ({ ...v, x: v.x - dx, y: v.y - dy }));
    };
    const onGestureStart = (e) => {
      e.preventDefault();
      gesture = viewportRef.current.zoom;
    };
    const onGestureChange = (e) => {
      e.preventDefault();
      if (gesture == null) return;
      const r = el.getBoundingClientRect();
      const target = gesture * e.scale;
      setViewport((v) => zoomed(v, target / v.zoom, e.clientX - r.left, e.clientY - r.top));
    };
    const onGestureEnd = (e) => {
      e.preventDefault();
      gesture = null;
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    el.addEventListener("gesturestart", onGestureStart);
    el.addEventListener("gesturechange", onGestureChange);
    el.addEventListener("gestureend", onGestureEnd);
    return () => {
      el.removeEventListener("wheel", onWheel);
      el.removeEventListener("gesturestart", onGestureStart);
      el.removeEventListener("gesturechange", onGestureChange);
      el.removeEventListener("gestureend", onGestureEnd);
    };
  }, []);

  // On open: fit a board that has no saved view, and take a newer saved copy if the server has one.
  useEffect(() => {
    let live = true;
    if (!initial.hadViewport && Object.keys(initial.doc.cards).length) {
      const v = fitView();
      if (v) {
        baseRef.current = { ...baseRef.current, viewport: v };
        setViewport(v);
      }
    }
    fetch(`${layouts}/${name}${api}`, { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (!live || !data?.savedAt || data.savedAt === initialLayout?.savedAt || docRef.current !== initial.doc) return;
        const n = normalize(data, new Set(ideas.map((i) => i.slug)));
        const v = n.viewport || viewportRef.current;
        baseRef.current = { doc: n.doc, viewport: v };
        setDocNow(n.doc);
        setViewport(v);
        setStatus("saved");
      })
      .catch(() => {})
      .finally(() => live && setReady(true));
    return () => {
      live = false;
    };
  }, []);

  // --- autosave ---
  const payload = () => {
    const d = docRef.current;
    const v = viewportRef.current;
    return { version: 1, cards: d.cards, labels: d.labels, frames: d.frames, viewport: { x: Math.round(v.x), y: Math.round(v.y), zoom: Math.round(v.zoom * 1000) / 1000 } };
  };
  const save = (seq) => {
    baseRef.current = { doc: docRef.current, viewport: viewportRef.current };
    setStatus("saving");
    fetch(`${layouts}/${name}${api}`, { method: "PUT", headers: { "content-type": "application/json" }, body: JSON.stringify(payload()) })
      .then((r) => {
        if (!r.ok) throw new Error(String(r.status));
        if (seq === seqRef.current) {
          pendingRef.current = false;
          setStatus("saved");
        }
      })
      .catch(() => seq === seqRef.current && setStatus("error"));
  };
  useEffect(() => {
    if (!ready || (doc === baseRef.current.doc && viewport === baseRef.current.viewport)) return;
    const seq = ++seqRef.current;
    pendingRef.current = true;
    setStatus("pending");
    const t = setTimeout(() => save(seq), 800);
    return () => clearTimeout(t);
  }, [doc, viewport, ready]);
  // Leaving with unsaved changes: send them anyway.
  useEffect(() => {
    const flush = () => {
      if (!pendingRef.current) return;
      pendingRef.current = false;
      fetch(`${layouts}/${name}${api}`, { method: "PUT", headers: { "content-type": "application/json" }, body: JSON.stringify(payload()), keepalive: true }).catch(() => {});
    };
    window.addEventListener("pagehide", flush);
    return () => {
      window.removeEventListener("pagehide", flush);
      flush();
    };
  }, [name]);

  // --- the tray ---
  const convoluteList = useMemo(() => [...convolutes, ...[...new Set(ideas.map((i) => i.convolute).filter((c) => c && !(c in convTitle)))].map((c) => [c, c])], [ideas, convolutes, convTitle]);
  const tags = useMemo(() => {
    const counts = new Map();
    for (const idea of ideas) for (const t of idea.tags) counts.set(t, (counts.get(t) || 0) + 1);
    return [...counts].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
  }, [ideas]);
  const unplaced = ideas.filter((i) => !doc.cards[i.slug]);
  const q = query.trim().toLowerCase();
  const trayShown = unplaced.filter(
    (i) => (!convolute || i.convolute === convolute) && (!kind || i.kind === kind) && (!tag || i.tags.includes(tag)) && (!q || `${i.title} ${i.description} ${i.body} ${i.tags.join(" ")}`.toLowerCase().includes(q)),
  );

  const sel = splitSelection(selection);
  const placedCount = Object.keys(doc.cards).length;
  const detailIdea = detail ? byslug.get(detail) : null;
  const statusText = { new: "Not saved yet", pending: "Unsaved changes", saving: "Saving…", saved: "Saved", error: "Save failed; will retry on the next change" }[status];
  const ghostIdea = ghost ? byslug.get(ghost.slug) : null;
  const toolButtons = [
    ["pan", "Pan", "H", "Drag the board to move around; shift-drag to select"],
    ["select", "Select", "V", "Drag a box to select cards"],
    ["frame", "Frame", "F", "Drag to draw a group frame"],
    ["text", "Text", "T", "Click to add a label"],
  ];

  return (
    <div className={`board${trayOpen ? "" : " is-tray-closed"}`}>
      <div className="board-toolbar" role="toolbar" aria-label="Whiteboard tools">
        <div className="board-title">
          <Link href={base} className="board-back">← {label}</Link>
          <h1>Whiteboard{boardLabel ? <span> · {boardLabel}</span> : null}</h1>
        </div>
        <div className="board-group">
          <button type="button" className="board-btn" aria-pressed={trayOpen} onClick={() => setTrayOpen((o) => !o)}>Tray</button>
        </div>
        <div className="board-group" role="group" aria-label="Tools">
          {toolButtons.map(([value, label, key, hint]) => (
            <button key={value} type="button" className="board-btn" aria-pressed={tool === value} title={`${hint} (${key})`} onClick={() => setTool(value)}>
              {label}
            </button>
          ))}
        </div>
        <div className="board-group" role="group" aria-label="Tidy the placed cards into columns">
          <span className="board-group-label">Tidy</span>
          <button type="button" className="board-btn" disabled={!placedCount} onClick={() => tidy("kind")}>By kind</button>
          <button type="button" className="board-btn" disabled={!placedCount} onClick={() => tidy("convolute")}>By convolute</button>
          <button type="button" className="board-btn" disabled={!placedCount} onClick={() => tidy("tag")}>By tag</button>
        </div>
        <div className="board-group" role="group" aria-label="History">
          <button type="button" className="board-btn" disabled={!undoRef.current.length} onClick={undo} title="Undo (⌘Z)">Undo</button>
          <button type="button" className="board-btn" disabled={!redoRef.current.length} onClick={redo} title="Redo (⇧⌘Z)">Redo</button>
        </div>
        <span className={`board-status is-${status}`} role="status" aria-live="polite">{statusText}</span>
        <form action={`${base}/board`} className="board-name-form">
          <label htmlFor="board-name">Board</label>
          <input id="board-name" name="name" placeholder="main" defaultValue={boardLabel} pattern="[a-z0-9][a-z0-9\-]*" maxLength={35} title="Lowercase letters, digits, and hyphens" />
          <button type="submit" className="board-btn">Open</button>
        </form>
      </div>

      <div className="board-body">
        {trayOpen && (
          <aside className="board-tray" aria-label="Tray: cards not on the board">
            <div className="board-tray-head">
              <p className="eyebrow">Tray · {unplaced.length} of {ideas.length}</p>
              <input type="search" placeholder="Search" value={query} onChange={(e) => setQuery(e.target.value)} aria-label="Search the tray" />
              <div className="board-tray-filters">
                <select value={convolute} onChange={(e) => setConvolute(e.target.value)} aria-label="Convolute">
                  <option value="">All convolutes</option>
                  {convoluteList.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
                </select>
                <select value={kind} onChange={(e) => setKind(e.target.value)} aria-label="Kind">
                  <option value="">All kinds</option>
                  {kinds.map(([value, label]) => <option key={value} value={value}>{label}</option>)}
                </select>
                <select value={tag} onChange={(e) => setTag(e.target.value)} aria-label="Tag">
                  <option value="">All tags</option>
                  {tags.map(([t, n]) => <option key={t} value={t}>{t} ({n})</option>)}
                </select>
              </div>
              <button type="button" className="board-btn board-btn-primary" disabled={!trayShown.length} onClick={() => placeAll(trayShown.map((i) => i.slug))}>
                Place all{trayShown.length ? ` (${trayShown.length})` : ""}
              </button>
            </div>
            <ul className="board-tray-list">
              {trayShown.map((idea) => (
                <li key={idea.slug}>
                  <div
                    className="board-tray-card"
                    style={{ "--hue": hues[idea.kind] ?? 0 }}
                    role="button"
                    tabIndex={0}
                    aria-label={`${idea.title}: drag onto the board, or press Enter for details`}
                    onPointerDown={(e) => onTrayPointerDown(e, idea.slug)}
                    onDoubleClick={() => setDetail(idea.slug)}
                    onKeyDown={(e) => e.key === "Enter" && setDetail(idea.slug)}
                  >
                    <span className="board-card-meta">
                      <span className="board-card-kind">{idea.kind || "idea"}</span>
                      {idea.convolute && <span>{idea.convolute}</span>}
                    </span>
                    <strong>{idea.title}</strong>
                  </div>
                  <button type="button" className="board-tray-place" aria-label={`Place ${idea.title} on the board`} title="Place on the board" onClick={() => placeOne(idea.slug)}>+</button>
                </li>
              ))}
            </ul>
            {!ideas.length && <p className="board-tray-empty">No cards yet. They are the Markdown files in <code>_content{base}/</code>.</p>}
            {ideas.length > 0 && !unplaced.length && <p className="board-tray-empty">Every card is on the board.</p>}
            {unplaced.length > 0 && !trayShown.length && <p className="board-tray-empty">No cards in the tray match.</p>}
          </aside>
        )}

        <div className="board-stage">
          <div
            ref={vpRef}
            className={`board-viewport tool-${tool}${panning ? " is-panning" : ""}${spaceHeld ? " is-space" : ""}`}
            style={{ backgroundSize: `${24 * viewport.zoom}px ${24 * viewport.zoom}px`, backgroundPosition: `${viewport.x}px ${viewport.y}px` }}
            tabIndex={0}
            aria-label="Whiteboard. Drag to pan, double-click to add a label, Delete removes the selection, arrows nudge it."
            onPointerDown={onBoardPointerDown}
            onDoubleClick={onBoardDoubleClick}
            onKeyDown={onBoardKeyDown}
          >
            <div ref={worldRef} className="board-world" style={{ transform: `translate(${viewport.x}px, ${viewport.y}px) scale(${viewport.zoom})`, "--zoom": viewport.zoom }}>
              {doc.frames.map((f) => (
                <div key={f.id} className={`board-frame${selection.has(`f:${f.id}`) ? " is-selected" : ""}`} style={{ transform: `translate(${f.x}px, ${f.y}px)`, width: f.w, height: f.h, "--marker": f.color }}>
                  {editing?.kind === "frame" && editing.id === f.id ? (
                    <input
                      className="board-frame-title board-editing"
                      defaultValue={f.title}
                      placeholder="Group title"
                      aria-label="Group title"
                      autoFocus
                      onBlur={(e) => commitFrameTitle(f.id, e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") e.currentTarget.blur();
                        if (e.key === "Escape") {
                          cancelEditRef.current = true;
                          e.currentTarget.blur();
                        }
                      }}
                    />
                  ) : (
                    <div className={`board-frame-title${f.title ? "" : " is-empty"}`} data-frame-handle={f.id}>{f.title || "Untitled group"}</div>
                  )}
                  <div className="board-frame-resize" data-frame-resize={f.id} title="Drag to resize" />
                </div>
              ))}
              {Object.entries(doc.cards).map(([slug, p]) => {
                const idea = byslug.get(slug);
                if (!idea) return null;
                const selected = selection.has(`c:${slug}`);
                return <CardView key={slug} idea={idea} x={p.x} y={p.y} hue={hues[idea.kind] ?? 0} selected={selected} lifted={dragging && selected} />;
              })}
              {doc.labels.map((l) =>
                editing?.kind === "label" && editing.id === l.id ? (
                  <LabelEditor key={l.id} label={l} onCommit={(value) => commitLabel(l.id, value, editing.isNew)} onCancel={() => (cancelEditRef.current = true)} />
                ) : (
                  <div key={l.id} className={`board-label${selection.has(`l:${l.id}`) ? " is-selected" : ""}`} data-label={l.id} style={{ transform: `translate(${l.x}px, ${l.y}px)`, fontSize: l.size, color: l.color }}>
                    {l.text}
                  </div>
                ),
              )}
              {marquee && <div className="board-marquee" style={{ transform: `translate(${marquee.x}px, ${marquee.y}px)`, width: marquee.w, height: marquee.h }} />}
              {draft && <div className="board-draft" style={{ transform: `translate(${draft.x}px, ${draft.y}px)`, width: draft.w, height: draft.h }} />}
            </div>
            {!placedCount && !doc.labels.length && !doc.frames.length && (
              <p className="board-hint">{ideas.length ? "Drag cards here from the tray, or Place all." : "The board is empty; idea cards will appear in the tray."}</p>
            )}
          </div>

          {selection.size > 0 && (
            <div className="board-selbar" role="group" aria-label="Selection">
              <span>{selection.size} selected</span>
              {sel.cards.size === 1 && selection.size === 1 && <button type="button" className="board-btn" onClick={() => setDetail([...sel.cards][0])}>Details</button>}
              {sel.cards.size > 0 && <button type="button" className="board-btn" onClick={() => toTray([...sel.cards])}>Back to tray{sel.cards.size > 1 ? ` (${sel.cards.size})` : ""}</button>}
              {(sel.labels.size > 0 || sel.frames.size > 0) && (
                <>
                  <span className="board-swatches" role="group" aria-label="Marker color">
                    {MARKERS.map((c, i) => <button key={c} type="button" className="board-swatch" style={{ background: c }} aria-label={`${MARKER_NAMES[i]} marker`} title={MARKER_NAMES[i]} onClick={() => recolor(c)} />)}
                  </span>
                  {sel.labels.size > 0 && (
                    <>
                      <button type="button" className="board-btn" aria-label="Smaller text" onClick={() => resizeLabels(1 / 1.25)}>A−</button>
                      <button type="button" className="board-btn" aria-label="Bigger text" onClick={() => resizeLabels(1.25)}>A+</button>
                    </>
                  )}
                  <button type="button" className="board-btn" onClick={removeSelection} title="Delete or Backspace (cards go back to the tray)">Delete</button>
                </>
              )}
            </div>
          )}

          <div className="board-zoom" role="group" aria-label="Zoom">
            <button type="button" className="board-btn" aria-label="Zoom out" onClick={() => zoomBy(1 / 1.2)}>−</button>
            <button type="button" className="board-btn board-zoom-level" aria-label="Reset zoom to 100%" title="Reset to 100%" onClick={() => zoomBy(1 / viewport.zoom)}>{Math.round(viewport.zoom * 100)}%</button>
            <button type="button" className="board-btn" aria-label="Zoom in" onClick={() => zoomBy(1.2)}>+</button>
            <button type="button" className="board-btn" onClick={() => fit()}>Fit to cards</button>
          </div>

          {detailIdea && (
            <DetailPanel
              idea={detailIdea}
              hue={hues[detailIdea.kind] ?? 0}
              placed={Boolean(doc.cards[detailIdea.slug])}
              onClose={() => setDetail(null)}
              onTray={() => toTray([detailIdea.slug])}
              onPlace={() => placeOne(detailIdea.slug)}
              onFind={() => findOnBoard(detailIdea.slug)}
            />
          )}
        </div>
      </div>

      {ghostIdea && (
        <div className="board-ghost" style={{ transform: `translate(${ghost.x - (W * viewport.zoom) / 2}px, ${ghost.y - (H * viewport.zoom) / 2}px) scale(${viewport.zoom})`, "--hue": hues[ghostIdea.kind] ?? 0 }} aria-hidden="true">
          <CardFace idea={ghostIdea} />
        </div>
      )}
    </div>
  );
}

function CardFace({ idea }) {
  return (
    <>
      <span className="board-card-meta">
        <span className="board-card-kind">{idea.kind || "idea"}</span>
        {idea.status && <span>{idea.status}</span>}
      </span>
      <strong className="board-card-title">{idea.title}</strong>
      {idea.description && <span className="board-card-desc">{idea.description}</span>}
      {idea.tags.length > 0 && <span className="board-card-tags">{idea.tags.map((t) => `#${t}`).join(" ")}</span>}
    </>
  );
}

const CardView = memo(function CardView({ idea, x, y, hue, selected, lifted }) {
  return (
    <div
      className={`board-card${selected ? " is-selected" : ""}${lifted ? " is-lifted" : ""}`}
      data-card={idea.slug}
      style={{ transform: `translate(${x}px, ${y}px)`, "--hue": hue }}
      role="button"
      tabIndex={0}
      aria-label={`${idea.title}. Press Enter for details.`}
    >
      <CardFace idea={idea} />
    </div>
  );
});

function LabelEditor({ label, onCommit, onCancel }) {
  const [value, setValue] = useState(label.text);
  const lines = value.split("\n");
  return (
    <textarea
      className="board-label board-label-editor board-editing"
      data-label={label.id}
      style={{ transform: `translate(${label.x}px, ${label.y}px)`, fontSize: label.size, color: label.color }}
      value={value}
      rows={lines.length}
      cols={Math.max(6, ...lines.map((l) => l.length + 1))}
      placeholder="Label"
      aria-label="Label text"
      autoFocus
      onChange={(e) => setValue(e.target.value)}
      onBlur={() => onCommit(value)}
      onKeyDown={(e) => {
        if (e.key === "Enter" && !e.shiftKey) {
          e.preventDefault();
          e.currentTarget.blur();
        }
        if (e.key === "Escape") {
          onCancel();
          e.currentTarget.blur();
        }
      }}
    />
  );
}

function DetailPanel({ idea, hue, placed, onClose, onTray, onPlace, onFind }) {
  const { base } = useCollection();
  const closeRef = useRef(null);
  useEffect(() => closeRef.current?.focus(), [idea.slug]);
  return (
    <aside className="board-detail" style={{ "--hue": hue }} aria-label={`Details: ${idea.title}`}>
      <div className="board-detail-top">
        <p className="board-detail-meta">
          <span className="board-detail-kind">{idea.kind || "idea"}</span>
          {idea.convolute && <span>{idea.convolute}</span>}
          {idea.status && <span>{idea.status}</span>}
          {idea.date && <span>{idea.date}</span>}
        </p>
        <button ref={closeRef} type="button" className="board-btn" onClick={onClose} aria-label="Close details">Close</button>
      </div>
      <h2>{idea.title}</h2>
      {idea.description && <p className="board-detail-lede">{idea.description}</p>}
      {idea.tags.length > 0 && <p className="board-detail-tags">{idea.tags.map((t) => `#${t}`).join(" ")}</p>}
      <div className="board-detail-actions">
        {placed ? (
          <>
            <button type="button" className="board-btn" onClick={onFind}>Find on board</button>
            <button type="button" className="board-btn" onClick={onTray}>Back to tray</button>
          </>
        ) : (
          <button type="button" className="board-btn board-btn-primary" onClick={onPlace}>Place on board</button>
        )}
        <Link href={`${base}/${idea.slug}`} className="board-btn">Open the card page</Link>
      </div>
      {idea.short && (
        <section className="board-detail-words" aria-label="In short">
          <p className="eyebrow">In short</p>
          <div className="prose board-detail-prose">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{idea.short}</ReactMarkdown>
          </div>
        </section>
      )}
      {idea.body && (
        <details className="board-detail-words board-detail-whole" open={!idea.short}>
          <summary className="eyebrow">The whole card</summary>
          <div className="prose board-detail-prose">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{idea.abstract ? idea.main : idea.body}</ReactMarkdown>
          </div>
        </details>
      )}
      {idea.sources.length > 0 && (
        <section className="board-detail-sources">
          <p className="eyebrow">Sources</p>
          <ul>{idea.sources.map((s) => <li key={s}><code>{s}</code></li>)}</ul>
        </section>
      )}
    </aside>
  );
}
