"use client";

import { useCollection } from "../collection.js";
import Link from "next/link";
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  Background,
  BaseEdge,
  ConnectionMode,
  Controls,
  EdgeLabelRenderer,
  getBezierPath,
  getStraightPath,
  Handle,
  MarkerType,
  MiniMap,
  NodeResizer,
  Panel,
  Position,
  ReactFlow,
  ReactFlowProvider,
  useEdgesState,
  useInternalNode,
  useNodesState,
  useReactFlow,
} from "@xyflow/react";

// The idea graph: cards as nodes, links Marlon draws between them, boxes that group them. Saved to
// <collection layouts>/<file> (version 1: nodes, groups, edges, hidden, viewport).
//
// /activities (Nov 15) adds three things, all optional props: `groups` (card folders, so cards cluster by folder),
// `links` (edges drawn from the cards' own frontmatter: mechanics, readings, prototypes, ideas, and a session's
// sequence; never saved, since the files are their source), and small link nodes (cards with `ext: true`) for
// things outside the collection, which can be hidden as a set. Cards with `audience` add an audience filter.

const CARD_W = 220;
const CARD_H = 120;
const GAP = 20;
const PAD = 20;
const HEAD = 40;
const CLUSTER_GAP = 80;
const GRID = 20;
const ARROW = "#a0a49a";
const SIDES = [Position.Top, Position.Right, Position.Bottom, Position.Left];

const GraphContext = createContext(null);
const uid = (prefix) => `${prefix}-${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;
const weekLabel = (w) => (/^\d+$/.test(w) ? `W${w}` : w);
const pairKey = (a, b) => (a < b ? `${a}|${b}` : `${b}|${a}`);

// --- nodes and edges ---

const ideaNode = (idea, position, parentId) => ({ id: idea.slug, type: "idea", position, data: { idea }, ...(parentId ? { parentId } : {}) });
const boxNode = ({ id, label, x, y, w, h }) => ({ id, type: "box", position: { x: +x || 0, y: +y || 0 }, width: Math.max(+w || 0, CARD_W + PAD * 2), height: Math.max(+h || 0, CARD_H + HEAD + PAD), data: { label: label || "" } });
const realEdge = ({ id, source, target, kind, label }) => ({
  id,
  source,
  target,
  type: "idea",
  data: { kind, label: label || "" },
  ...(kind === "leads" ? { markerEnd: { type: MarkerType.ArrowClosed, width: 18, height: 18, color: ARROW } } : {}),
});

// Boxes come before the cards inside them (React Flow wants parents first).
const sortNodes = (nodes) => [...nodes.filter((n) => n.type === "box"), ...nodes.filter((n) => n.type !== "box")];
const sizeOf = (n) => ({ w: n.width ?? n.measured?.width ?? CARD_W, h: n.height ?? n.measured?.height ?? CARD_H });
function absPos(n, byId) {
  const parent = n.parentId && byId.get(n.parentId);
  return parent ? { x: parent.position.x + n.position.x, y: parent.position.y + n.position.y } : { ...n.position };
}
function detach(n, byId) {
  const { parentId, ...rest } = n;
  return { ...rest, position: absPos(n, byId) };
}

// --- layout ---

// Clusters by kind, first tag, or folder, each a small grid, packed into rows; with boxes, each cluster is a labeled group.
// By folder, link nodes cluster by their kind ("@mechanic") after the folders.
function clusterLayout(ideas, by, boxes, kinds, folders = {}) {
  const folderOrder = Object.keys(folders);
  const kindOrder = by === "group" ? [...folderOrder, ...kinds.map(([k]) => `@${k}`)] : kinds.map(([k]) => k);
  const kindLabel = by === "group" ? { ...folders, ...Object.fromEntries(kinds.map(([k, l]) => [`@${k}`, `${l}s`])) } : Object.fromEntries(kinds);
  const groups = new Map();
  for (const idea of ideas) {
    const k = by === "tag" ? idea.tags[0] || "untagged" : by === "group" ? (idea.ext ? `@${idea.kind}` : idea.group || "other") : idea.kind || "other";
    if (!groups.has(k)) groups.set(k, []);
    groups.get(k).push(idea);
  }
  const rank = (k) => (kindOrder.includes(k) ? kindOrder.indexOf(k) : kindOrder.length);
  const clusters = [...groups]
    .map(([k, items]) => ({ k, items }))
    .sort((a, b) => (by === "tag" ? b.items.length - a.items.length || a.k.localeCompare(b.k) : rank(a.k) - rank(b.k) || a.k.localeCompare(b.k)));

  let area = 0;
  let widest = 0;
  for (const c of clusters) {
    c.cols = Math.max(1, Math.ceil(Math.sqrt(c.items.length)));
    const rows = Math.ceil(c.items.length / c.cols);
    c.w = PAD * 2 + c.cols * CARD_W + (c.cols - 1) * GAP;
    c.h = HEAD + rows * CARD_H + (rows - 1) * GAP + PAD;
    area += (c.w + CLUSTER_GAP) * (c.h + CLUSTER_GAP);
    widest = Math.max(widest, c.w);
  }
  const maxRow = Math.max(widest, Math.sqrt(area) * 1.5);
  let x = 0;
  let y = 0;
  let rowH = 0;
  const nodes = [];
  clusters.forEach((c, n) => {
    if (x > 0 && x + c.w > maxRow) {
      x = 0;
      y += rowH + CLUSTER_GAP;
      rowH = 0;
    }
    const boxId = boxes ? `box-${n}-${Date.now().toString(36)}` : null;
    if (boxes) nodes.push(boxNode({ id: boxId, label: by === "tag" ? (c.k === "untagged" ? "untagged" : `#${c.k}`) : kindLabel[c.k] || c.k, x, y, w: c.w, h: c.h }));
    c.items.forEach((idea, i) => {
      const cx = PAD + (i % c.cols) * (CARD_W + GAP);
      const cy = HEAD + Math.floor(i / c.cols) * (CARD_H + GAP);
      nodes.push(ideaNode(idea, boxes ? { x: cx, y: cy } : { x: x + cx, y: y + cy }, boxId));
    });
    x += c.w + CLUSTER_GAP;
    rowH = Math.max(rowH, c.h);
  });
  return sortNodes(nodes);
}

// New or restored cards go in rows below everything already on the graph.
function placeNew(ideas, nodes) {
  if (!ideas.length) return [];
  const byId = new Map(nodes.map((n) => [n.id, n]));
  let minX = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;
  for (const n of nodes) {
    const p = absPos(n, byId);
    const s = sizeOf(n);
    minX = Math.min(minX, p.x);
    maxX = Math.max(maxX, p.x + s.w);
    maxY = Math.max(maxY, p.y + s.h);
  }
  if (!Number.isFinite(minX)) [minX, maxX, maxY] = [0, 6 * (CARD_W + GAP), -CLUSTER_GAP];
  const cols = Math.max(4, Math.floor((maxX - minX + GAP) / (CARD_W + GAP)));
  const top = Math.ceil((maxY + CLUSTER_GAP) / GRID) * GRID;
  return ideas.map((idea, i) => ideaNode(idea, { x: minX + (i % cols) * (CARD_W + GAP), y: top + Math.floor(i / cols) * (CARD_H + GAP) }));
}

function buildInitial(ideas, saved, kinds, folders, links = []) {
  if (!saved || saved.version !== 1 || !Array.isArray(saved.nodes)) {
    // Link nodes only one card points to start below the clusters, out of the way (hidden in "shared" mode).
    const from = new Map();
    for (const l of links) from.set(l.target, (from.get(l.target) || new Set()).add(l.source));
    const single = (i) => i.ext && (from.get(i.slug)?.size || 0) < 2;
    const nodes = clusterLayout(ideas.filter((i) => !single(i)), folders ? "group" : "kind", true, kinds, folders);
    return { nodes: [...nodes, ...placeNew(ideas.filter(single), nodes)], edges: [], hidden: [], viewport: null };
  }
  const bySlug = new Map(ideas.map((i) => [i.slug, i]));
  const hidden = [...new Set((saved.hidden || []).filter((id) => bySlug.has(id)))];
  const hiddenSet = new Set(hidden);
  const boxes = (saved.groups || []).filter((g) => g && typeof g.id === "string").map(boxNode);
  const boxIds = new Set(boxes.map((b) => b.id));
  const seen = new Set();
  const placed = [];
  for (const n of saved.nodes) {
    const idea = bySlug.get(n?.id);
    if (!idea || hiddenSet.has(n.id) || seen.has(n.id)) continue;
    seen.add(n.id);
    placed.push(ideaNode(idea, { x: +n.x || 0, y: +n.y || 0 }, boxIds.has(n.parentId) ? n.parentId : undefined));
  }
  const nodes = [...boxes, ...placed];
  nodes.push(...placeNew(ideas.filter((i) => !seen.has(i.slug) && !hiddenSet.has(i.slug)), nodes));
  const cards = new Set(nodes.filter((n) => n.type === "idea").map((n) => n.id));
  const edges = (saved.edges || [])
    .filter((e) => e && cards.has(e.source) && cards.has(e.target) && e.source !== e.target)
    .map((e) => realEdge({ id: e.id || uid("e"), source: e.source, target: e.target, kind: e.type === "leads" ? "leads" : "relates", label: e.label }));
  const v = saved.viewport;
  const viewport = v && Number.isFinite(v.x) && Number.isFinite(v.y) && Number.isFinite(v.zoom) ? v : null;
  return { nodes, edges, hidden, viewport };
}

function serialize(nodes, edges, hidden, viewport) {
  const r = Math.round;
  return {
    version: 1,
    nodes: nodes.filter((n) => n.type === "idea").map((n) => ({ id: n.id, x: r(n.position.x), y: r(n.position.y), ...(n.parentId ? { parentId: n.parentId } : {}) })),
    groups: nodes.filter((n) => n.type === "box").map((n) => ({ id: n.id, label: n.data.label || "", x: r(n.position.x), y: r(n.position.y), w: r(sizeOf(n).w), h: r(sizeOf(n).h) })),
    edges: edges.filter((e) => e.type === "idea").map((e) => ({ id: e.id, source: e.source, target: e.target, label: e.data?.label || "", type: e.data?.kind || "relates" })),
    hidden,
    viewport: viewport ? { x: r(viewport.x), y: r(viewport.y), zoom: Math.round(viewport.zoom * 1000) / 1000 } : null,
  };
}

// Suggested links: pairs sharing a tag (1 point each) or a source file (2 each); each card keeps its best three.
function suggestLinks(ideas, linked, perCard = 3) {
  const index = new Map();
  for (const idea of ideas) {
    for (const key of [...idea.tags.map((t) => `#${t}`), ...idea.sources]) {
      if (!index.has(key)) index.set(key, []);
      index.get(key).push(idea.slug);
    }
  }
  const pairs = new Map();
  for (const [key, slugs] of index) {
    if (slugs.length < 2 || slugs.length > 80) continue;
    const tag = key.startsWith("#");
    for (let i = 0; i < slugs.length; i++) {
      for (let j = i + 1; j < slugs.length; j++) {
        const k = pairKey(slugs[i], slugs[j]);
        if (linked.has(k)) continue;
        const p = pairs.get(k) || { k, a: slugs[i], b: slugs[j], score: 0, why: [] };
        p.score += tag ? 1 : 2;
        p.why.push(tag ? key : key.split("/").pop());
        pairs.set(k, p);
      }
    }
  }
  const byCard = new Map();
  for (const p of pairs.values()) {
    for (const s of [p.a, p.b]) {
      if (!byCard.has(s)) byCard.set(s, []);
      byCard.get(s).push(p);
    }
  }
  const keep = new Set();
  for (const list of byCard.values()) list.sort((x, y) => y.score - x.score).slice(0, perCard).forEach((p) => keep.add(p.k));
  return [...keep].map((k) => {
    const p = pairs.get(k);
    return { id: `s:${k}`, source: p.a, target: p.b, type: "suggested", data: { why: p.why }, selectable: false, deletable: false, focusable: false };
  });
}

// --- edge geometry: edges float between card borders, whichever handle they started from ---

function borderPoint(node, toward) {
  const { x, y } = node.internals.positionAbsolute;
  const { width: w, height: h } = node.measured;
  const cx = x + w / 2;
  const cy = y + h / 2;
  const dx = toward.x - cx;
  const dy = toward.y - cy;
  if (!dx && !dy) return { x: cx, y: cy, pos: Position.Top };
  const sx = w / 2 / Math.max(Math.abs(dx), 1e-6);
  const sy = h / 2 / Math.max(Math.abs(dy), 1e-6);
  const pos = sx < sy ? (dx > 0 ? Position.Right : Position.Left) : dy > 0 ? Position.Bottom : Position.Top;
  const s = Math.min(sx, sy);
  return { x: cx + dx * s, y: cy + dy * s, pos };
}
const center = (n) => ({ x: n.internals.positionAbsolute.x + n.measured.width / 2, y: n.internals.positionAbsolute.y + n.measured.height / 2 });
function floating(a, b) {
  const s = borderPoint(a, center(b));
  const t = borderPoint(b, center(a));
  return { sourceX: s.x, sourceY: s.y, sourcePosition: s.pos, targetX: t.x, targetY: t.y, targetPosition: t.pos };
}
const measured = (n) => n?.measured?.width && n?.measured?.height;

// --- node and edge components ---

function LabelInput({ initial, onDone, placeholder }) {
  const done = useRef(false);
  const finish = (value) => {
    if (done.current) return;
    done.current = true;
    onDone(value);
  };
  return (
    <input
      className="graph-label-input nodrag nopan"
      autoFocus
      defaultValue={initial}
      placeholder={placeholder}
      onFocus={(e) => e.target.select()}
      onKeyDown={(e) => {
        if (e.key === "Enter") finish(e.currentTarget.value);
        if (e.key === "Escape") finish(null);
        e.stopPropagation();
      }}
      onBlur={(e) => finish(e.currentTarget.value)}
    />
  );
}

function IdeaNode({ id, data, selected }) {
  const g = useContext(GraphContext);
  const { idea } = data;
  const cls = ["graph-card", idea.ext && "is-ext", idea.missing && "is-missing", selected && "is-selected", g.dimNode(id) && "is-dim", g.focus === id && "is-focus"].filter(Boolean).join(" ");
  return (
    <div className={cls} style={{ "--hue": g.hues[idea.kind] ?? 0 }} title={idea.description || idea.title}>
      {SIDES.map((p) => <Handle key={p} id={p} type="source" position={p} className="graph-handle" />)}
      <span className="graph-card-meta">
        <span className="graph-card-kind">{idea.kind || "idea"}</span>
        {idea.audience?.length > 0 ? <span>{idea.audience.join(" · ")}</span> : idea.week && <span>{weekLabel(idea.week)}</span>}
        {idea.duration && <span>{idea.duration} min</span>}
      </span>
      <strong className="graph-card-title">{idea.title}</strong>
      {idea.description && <span className="graph-card-desc">{idea.description}</span>}
      {idea.tags.length > 0 && <span className="graph-card-tags">{idea.tags.map((t) => `#${t}`).join(" ")}</span>}
    </div>
  );
}

function BoxNode({ id, data, selected }) {
  const g = useContext(GraphContext);
  const editing = g.editingBox === id;
  return (
    <>
      <NodeResizer isVisible={selected} minWidth={CARD_W + PAD * 2} minHeight={CARD_H + HEAD + PAD} lineClassName="graph-resize-line" handleClassName="graph-resize-handle" />
      <div className={`graph-box${selected ? " is-selected" : ""}`}>
        <div className="graph-box-label" onDoubleClick={(e) => { e.stopPropagation(); g.setEditingBox(id); }} title="Double-click to rename">
          {editing ? <LabelInput initial={data.label} placeholder="Group name" onDone={(v) => g.commitBoxLabel(id, v)} /> : data.label || "Group"}
        </div>
      </div>
    </>
  );
}

function IdeaEdge({ id, source, target, markerEnd, data, selected }) {
  const s = useInternalNode(source);
  const t = useInternalNode(target);
  const g = useContext(GraphContext);
  if (!measured(s) || !measured(t)) return null;
  const [path, lx, ly] = getBezierPath(floating(s, t));
  const editing = g.editingEdge === id;
  const dim = g.dimEdge(source, target);
  const state = `${selected ? " is-selected" : ""}${dim ? " is-dim" : ""}`;
  return (
    <>
      <BaseEdge id={id} path={path} markerEnd={markerEnd} className={`graph-edge graph-edge-${data?.kind || "relates"}${state}`} interactionWidth={18} />
      {(data?.label || editing) && (
        <EdgeLabelRenderer>
          <div className={`graph-edge-label nodrag nopan${state}`} style={{ transform: `translate(-50%, -50%) translate(${lx}px, ${ly}px)` }} onDoubleClick={() => g.setEditingEdge(id)}>
            {editing ? <LabelInput initial={data?.label || ""} placeholder="label" onDone={(v) => g.commitEdgeLabel(id, v)} /> : data.label}
          </div>
        </EdgeLabelRenderer>
      )}
    </>
  );
}

function SuggestedEdge({ source, target, data }) {
  const s = useInternalNode(source);
  const t = useInternalNode(target);
  const g = useContext(GraphContext);
  if (!measured(s) || !measured(t)) return null;
  const f = floating(s, t);
  const [path] = getStraightPath({ sourceX: f.sourceX, sourceY: f.sourceY, targetX: f.targetX, targetY: f.targetY });
  return (
    <g className={`graph-suggested${g.dimEdge(source, target) ? " is-dim" : ""}`}>
      <path d={path} className="graph-suggested-path" fill="none" />
      <path d={path} className="react-flow__edge-interaction" fill="none" strokeOpacity={0} strokeWidth={14}>
        <title>{`Shared: ${data.why.join(", ")}. Click to make it a link.`}</title>
      </path>
    </g>
  );
}

const nodeTypes = { idea: IdeaNode, box: BoxNode };
const edgeTypes = { idea: IdeaEdge, link: IdeaEdge, suggested: SuggestedEdge };
const linkEdge = ({ source, target, kind, label }, i) => ({
  id: `l:${i}:${source}>${target}`,
  source,
  target,
  type: "link",
  data: { kind: `link graph-edge-${kind}`, label: label || "" },
  selectable: false,
  deletable: false,
  focusable: false,
  ...(kind === "sequence" ? { markerEnd: { type: MarkerType.ArrowClosed, width: 16, height: 16, color: ARROW } } : {}),
});

// --- the side panel: the full card ---

function SidePanel({ idea, hues, edges, ideasById, focused, onClose, onFocus, onShow }) {
  const { base, label } = useCollection();
  const links = edges
    .filter((e) => (e.type === "idea" || e.type === "link") && (e.source === idea.slug || e.target === idea.slug))
    .map((e) => {
      const out = e.source === idea.slug;
      const other = ideasById.get(out ? e.target : e.source);
      return other && { id: e.id, other, arrow: e.data.kind === "leads" || e.markerEnd ? (out ? "→" : "←") : "—", label: e.data.label };
    })
    .filter(Boolean);
  return (
    <aside className="graph-side nowheel" style={{ "--hue": hues[idea.kind] ?? 0 }} aria-label="Card">
      <div className="graph-side-head">
        <p className="graph-side-meta">
          <span className="graph-card-kind">{idea.kind || "idea"}</span>
          {idea.week && <span>{/^\d+$/.test(idea.week) ? `Week ${idea.week}` : idea.week}</span>}
          {idea.date && <span>{idea.date}</span>}
        </p>
        <button type="button" className="graph-close" onClick={onClose} aria-label="Close">×</button>
      </div>
      <h2>{idea.title}</h2>
      {idea.description && <p className="graph-side-desc">{idea.description}</p>}
      <div className="graph-side-actions">
        <button type="button" onClick={() => onFocus(focused ? null : idea.slug)} aria-pressed={focused}>{focused ? "Clear focus" : "Focus neighbors"}</button>
        <button type="button" onClick={() => onShow(idea.slug)}>Center</button>
        <Link href={idea.href || `${base}/${idea.slug}`}>{idea.ext ? "Open" : "Open card"}</Link>
      </div>
      {idea.body && (
        <section>
          <p className="eyebrow">{label === "Ideas" ? "Marlon's words" : "The card"}</p>
          <div className="graph-side-body"><ReactMarkdown remarkPlugins={[remarkGfm]}>{idea.body}</ReactMarkdown></div>
        </section>
      )}
      {idea.tags.length > 0 && <p className="graph-side-tags">{idea.tags.map((t) => `#${t}`).join(" ")}</p>}
      {links.length > 0 && (
        <section>
          <p className="eyebrow">Links</p>
          <ul className="graph-side-links">
            {links.map((l) => (
              <li key={l.id}>
                <span aria-hidden="true">{l.arrow}</span>
                <button type="button" onClick={() => onShow(l.other.slug, true)}>{l.other.title}</button>
                {l.label && <em>{l.label}</em>}
              </li>
            ))}
          </ul>
        </section>
      )}
      {idea.sources.length > 0 && (
        <section>
          <p className="eyebrow">Sources</p>
          <ul className="graph-side-sources">{idea.sources.map((s) => <li key={s}><code>{s}</code></li>)}</ul>
        </section>
      )}
    </aside>
  );
}

// --- the graph ---

export default function Graph(props) {
  return (
    <ReactFlowProvider>
      <GraphCanvas {...props} />
    </ReactFlowProvider>
  );
}

function GraphCanvas({ ideas, saved, file, name, kinds, hues, groups, links = [], audiences }) {
  const { base, api, layouts, label } = useCollection();
  const rf = useReactFlow();
  const [initial] = useState(() => buildInitial(ideas, saved, kinds, groups, links));
  const [nodes, setNodes, onNodesChange] = useNodesState(initial.nodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initial.edges);
  const [hidden, setHidden] = useState(initial.hidden);
  const [viewport, setViewport] = useState(initial.viewport);

  const [query, setQuery] = useState("");
  const [week, setWeek] = useState("");
  const [kind, setKind] = useState("");
  const [tag, setTag] = useState("");
  const [audience, setAudience] = useState("");
  const [linkMode, setLinkMode] = useState("shared");
  const [focus, setFocus] = useState(null);
  const [panel, setPanel] = useState(null);
  const [showSuggested, setShowSuggested] = useState(false);
  const [clusterBy, setClusterBy] = useState(groups ? "group" : "kind");
  const [boxes, setBoxes] = useState(true);
  const [snap, setSnap] = useState(false);
  const [newKind, setNewKind] = useState("relates");
  const [editingEdge, setEditingEdge] = useState(null);
  const [editingBox, setEditingBox] = useState(null);
  const [status, setStatus] = useState(saved ? "saved" : "new");
  const touched = useRef(false);

  const ideasById = useMemo(() => new Map(ideas.map((i) => [i.slug, i])), [ideas]);
  const hiddenSet = useMemo(() => new Set(hidden), [hidden]);
  const weeks = useMemo(() => [...new Set(ideas.map((i) => i.week).filter(Boolean))].sort((a, b) => a.localeCompare(b, undefined, { numeric: true })), [ideas]);
  const tags = useMemo(() => {
    const counts = new Map();
    for (const idea of ideas) for (const t of idea.tags) counts.set(t, (counts.get(t) || 0) + 1);
    return [...counts].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
  }, [ideas]);

  // Links from the cards' frontmatter, between cards that are on the graph (link nodes can be hidden as a set).
  // linkMode: "all" link nodes, "shared" (only those two or more cards link to), or "none".
  const linkNodeIds = useMemo(() => new Set(ideas.filter((i) => i.ext).map((i) => i.slug)), [ideas]);
  // Only cards on the graph count, so a graph that hides one audience's cards hides what only they link to.
  const offLinkNodes = useMemo(() => {
    if (linkMode === "none") return linkNodeIds;
    const from = new Map();
    for (const l of links) if (linkNodeIds.has(l.target) && !hiddenSet.has(l.source)) from.set(l.target, (from.get(l.target) || new Set()).add(l.source));
    const least = linkMode === "all" ? 1 : 2;
    return new Set([...linkNodeIds].filter((id) => (from.get(id)?.size || 0) < least));
  }, [linkMode, links, linkNodeIds, hiddenSet]);
  const fileEdges = useMemo(() => {
    const off = (id) => hiddenSet.has(id) || offLinkNodes.has(id);
    return links.filter((l) => ideasById.has(l.source) && ideasById.has(l.target) && !off(l.source) && !off(l.target)).map(linkEdge);
  }, [links, ideasById, hiddenSet, offLinkNodes]);
  const allEdges = useMemo(() => (fileEdges.length ? [...fileEdges, ...edges] : edges), [fileEdges, edges]);

  // Filters and focus dim cards; nothing leaves the graph. A link node matches when a matching card links to it.
  const q = query.trim().toLowerCase();
  const filtering = Boolean(q || week || kind || tag || audience);
  const matches = useMemo(() => {
    if (!filtering) return null;
    const set = new Set(
      ideas
        .filter((i) => (!week || i.week === week) && (!kind || i.kind === kind) && (!tag || i.tags.includes(tag)) && (!audience || i.audience?.includes(audience)) && (!q || `${i.title} ${i.description} ${i.body} ${i.tags.join(" ")}`.toLowerCase().includes(q)))
        .map((i) => i.slug),
    );
    if (audience) for (const l of links) if (set.has(l.source) && linkNodeIds.has(l.target)) set.add(l.target);
    return set;
  }, [filtering, ideas, links, linkNodeIds, q, week, kind, tag, audience]);
  const focusSet = useMemo(() => {
    if (!focus) return null;
    const set = new Set([focus]);
    for (const e of allEdges) {
      if (e.source === focus) set.add(e.target);
      if (e.target === focus) set.add(e.source);
    }
    return set;
  }, [focus, allEdges]);

  const commitEdgeLabel = useCallback((id, value) => {
    if (value !== null) setEdges((eds) => eds.map((e) => (e.id === id ? { ...e, data: { ...e.data, label: value.trim() } } : e)));
    setEditingEdge(null);
  }, [setEdges]);
  const commitBoxLabel = useCallback((id, value) => {
    if (value !== null) setNodes((nds) => nds.map((n) => (n.id === id ? { ...n, data: { ...n.data, label: value.trim() } } : n)));
    setEditingBox(null);
  }, [setNodes]);

  const ctx = useMemo(() => {
    const dimNode = (id) => Boolean((matches && !matches.has(id)) || (focusSet && !focusSet.has(id)));
    return {
      hues,
      focus,
      editingEdge,
      editingBox,
      setEditingEdge,
      setEditingBox,
      commitEdgeLabel,
      commitBoxLabel,
      dimNode,
      dimEdge: (s, t) => dimNode(s) || dimNode(t) || Boolean(focus && s !== focus && t !== focus),
    };
  }, [hues, focus, matches, focusSet, editingEdge, editingBox, commitEdgeLabel, commitBoxLabel]);

  // --- suggested links ---
  const suggested = useMemo(() => {
    if (!showSuggested) return [];
    const linked = new Set(allEdges.map((e) => pairKey(e.source, e.target)));
    return suggestLinks(ideas.filter((i) => !hiddenSet.has(i.slug) && !i.ext), linked);
  }, [showSuggested, allEdges, ideas, hiddenSet]);
  const shownEdges = useMemo(() => (suggested.length ? [...suggested, ...allEdges] : allEdges), [suggested, allEdges]);
  const shownNodes = useMemo(() => (offLinkNodes.size ? nodes.map((n) => (offLinkNodes.has(n.id) ? { ...n, hidden: true } : n)) : nodes), [nodes, offLinkNodes]);

  // --- connecting ---
  const isValidConnection = useCallback((c) => c.source !== c.target && ideasById.has(c.source) && ideasById.has(c.target), [ideasById]);
  const onConnect = useCallback((c) => {
    if (!c.source || !c.target || c.source === c.target) return;
    setEdges((eds) => (eds.some((e) => pairKey(e.source, e.target) === pairKey(c.source, c.target)) ? eds : [...eds, realEdge({ id: uid("e"), source: c.source, target: c.target, kind: newKind, label: "" })]));
  }, [newKind, setEdges]);
  const onEdgeClick = useCallback((_, edge) => {
    if (edge.type !== "suggested") return;
    setEdges((eds) => (eds.some((e) => pairKey(e.source, e.target) === pairKey(edge.source, edge.target)) ? eds : [...eds, realEdge({ id: uid("e"), source: edge.source, target: edge.target, kind: "relates", label: "" })]));
  }, [setEdges]);
  const onEdgeDoubleClick = useCallback((_, edge) => {
    if (edge.type === "idea") setEditingEdge(edge.id);
  }, []);
  const updateEdge = useCallback((id, patch) => {
    setEdges((eds) => eds.map((e) => (e.id === id ? { ...realEdge({ id, source: patch.source ?? e.source, target: patch.target ?? e.target, kind: patch.kind ?? e.data.kind, label: patch.label ?? e.data.label }), selected: e.selected } : e)));
  }, [setEdges]);

  // --- deleting: a card leaves the graph (and can be restored); deleting a box keeps its cards ---
  const onBeforeDelete = useCallback(async ({ nodes: del, edges: delEdges }) => {
    const boxIds = new Set(del.filter((n) => n.type === "box").map((n) => n.id));
    const keep = new Set(del.filter((n) => n.type === "idea" && boxIds.has(n.parentId) && !n.selected).map((n) => n.id));
    if (!keep.size) return true;
    setNodes((nds) => {
      const byId = new Map(nds.map((n) => [n.id, n]));
      return nds.map((n) => (keep.has(n.id) ? detach(n, byId) : n));
    });
    const out = del.filter((n) => !keep.has(n.id));
    const outIds = new Set(out.map((n) => n.id));
    return { nodes: out, edges: delEdges.filter((e) => e.selected || outIds.has(e.source) || outIds.has(e.target)) };
  }, [setNodes]);
  const onNodesDelete = useCallback((del) => {
    const ids = del.filter((n) => n.type === "idea").map((n) => n.id);
    if (!ids.length) return;
    setHidden((h) => [...new Set([...h, ...ids])]);
    setPanel((p) => (ids.includes(p) ? null : p));
    setFocus((f) => (ids.includes(f) ? null : f));
  }, []);
  const restoreHidden = () => {
    setNodes((nds) => sortNodes([...nds, ...placeNew(hidden.map((id) => ideasById.get(id)).filter(Boolean), nds)]));
    setHidden([]);
  };

  // --- groups ---
  const selectedCards = nodes.filter((n) => n.selected && n.type === "idea");
  const selectedBoxes = nodes.filter((n) => n.selected && n.type === "box");
  const canUngroup = selectedBoxes.length > 0 || selectedCards.some((n) => n.parentId);

  const groupSelected = () => {
    const byId = new Map(rf.getNodes().map((n) => [n.id, n]));
    const picked = rf.getNodes().filter((n) => n.selected && n.type === "idea");
    if (!picked.length) return;
    let [minX, minY, maxX, maxY] = [Infinity, Infinity, -Infinity, -Infinity];
    for (const n of picked) {
      const p = absPos(n, byId);
      const s = sizeOf(n);
      [minX, minY, maxX, maxY] = [Math.min(minX, p.x), Math.min(minY, p.y), Math.max(maxX, p.x + s.w), Math.max(maxY, p.y + s.h)];
    }
    const box = boxNode({ id: uid("g"), label: "", x: minX - PAD, y: minY - HEAD, w: maxX - minX + PAD * 2, h: maxY - minY + HEAD + PAD });
    const ids = new Set(picked.map((n) => n.id));
    setNodes((nds) => {
      const current = new Map(nds.map((n) => [n.id, n]));
      const out = nds.map((n) => {
        if (!ids.has(n.id)) return n.selected ? { ...n, selected: false } : n;
        const p = absPos(n, current);
        const { parentId, ...rest } = n;
        return { ...rest, parentId: box.id, position: { x: p.x - box.position.x, y: p.y - box.position.y }, selected: false };
      });
      return sortNodes([...out, { ...box, selected: true }]);
    });
    setEditingBox(box.id);
  };

  const ungroupSelected = () => {
    setNodes((nds) => {
      const byId = new Map(nds.map((n) => [n.id, n]));
      const gone = new Set(nds.filter((n) => n.type === "box" && n.selected).map((n) => n.id));
      return nds.filter((n) => !gone.has(n.id)).map((n) => (n.parentId && (gone.has(n.parentId) || (n.selected && n.type === "idea")) ? detach(n, byId) : n));
    });
  };

  // Dropping a card inside a box puts it in that box; dropping it outside takes it out.
  const onNodeDragStop = useCallback((_, __, dragged) => {
    const draggedIds = new Set(dragged.map((n) => n.id));
    const moving = new Set(dragged.filter((n) => n.type === "idea" && !(n.parentId && draggedIds.has(n.parentId))).map((n) => n.id));
    if (!moving.size) return;
    setNodes((nds) => {
      const byId = new Map(nds.map((n) => [n.id, n]));
      const targets = nds.filter((n) => n.type === "box" && !draggedIds.has(n.id));
      let changed = false;
      const out = nds.map((n) => {
        if (!moving.has(n.id)) return n;
        const p = absPos(n, byId);
        const s = sizeOf(n);
        const [cx, cy] = [p.x + s.w / 2, p.y + s.h / 2];
        const box = targets
          .filter((b) => cx >= b.position.x && cx <= b.position.x + sizeOf(b).w && cy >= b.position.y && cy <= b.position.y + sizeOf(b).h)
          .sort((a, b) => sizeOf(a).w * sizeOf(a).h - sizeOf(b).w * sizeOf(b).h)[0];
        if ((box?.id ?? undefined) === n.parentId) return n;
        changed = true;
        const { parentId, ...rest } = n;
        return box ? { ...rest, parentId: box.id, position: { x: p.x - box.position.x, y: p.y - box.position.y } } : { ...rest, position: p };
      });
      return changed ? sortNodes(out) : nds;
    });
  }, [setNodes]);

  // --- layout ---
  const relayout = () => {
    const count = nodes.filter((n) => n.type === "idea").length;
    const boxCount = nodes.filter((n) => n.type === "box").length;
    const what = { tag: "first tag", group: "folder" }[clusterBy] || "kind";
    if (!window.confirm(`Re-arrange all ${count} cards by ${what}? This replaces their positions${boxCount ? ` and removes the ${boxCount} group box${boxCount === 1 ? "" : "es"}` : ""}. Links stay.`)) return;
    touched.current = true;
    const laid = clusterLayout(ideas.filter((i) => !hiddenSet.has(i.slug) && !offLinkNodes.has(i.slug)), clusterBy, boxes, kinds, groups);
    setNodes([...laid, ...placeNew(ideas.filter((i) => !hiddenSet.has(i.slug) && offLinkNodes.has(i.slug)), laid)]);
    setTimeout(() => rf.fitView({ padding: 0.08, duration: 300 }), 60);
  };

  // --- viewing ---
  const show = useCallback((id, open) => {
    const n = rf.getInternalNode(id);
    if (!measured(n)) return;
    rf.setCenter(n.internals.positionAbsolute.x + n.measured.width / 2, n.internals.positionAbsolute.y + n.measured.height / 2, { zoom: Math.max(rf.getZoom(), 0.9), duration: 400 });
    if (open) setPanel(id);
  }, [rf]);
  const zoomToMatches = () => {
    if (matches?.size) rf.fitView({ nodes: [...matches].filter((id) => !hiddenSet.has(id)).map((id) => ({ id })), padding: 0.2, duration: 400 });
  };
  const onNodeDoubleClick = useCallback((_, node) => {
    if (node.type === "idea") setPanel(node.id);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key !== "Escape" || e.target.closest?.("input, textarea, select")) return;
      setPanel(null);
      setFocus(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // --- saving: debounced PUT of the whole arrangement; flushed when leaving the page ---
  const url = `${layouts}/${file}${api}`;
  const snapshot = useMemo(() => JSON.stringify(serialize(nodes, edges, hidden, viewport)), [nodes, edges, hidden, viewport]);
  const lastSaved = useRef(snapshot);
  const latest = useRef(snapshot);
  latest.current = snapshot;

  useEffect(() => {
    if (snapshot === lastSaved.current) return;
    setStatus("saving");
    const timer = setTimeout(async () => {
      try {
        const res = await fetch(url, { method: "PUT", headers: { "content-type": "application/json" }, body: snapshot });
        if (!res.ok) throw new Error(String(res.status));
        lastSaved.current = snapshot;
        if (latest.current === snapshot) setStatus("saved");
      } catch {
        setStatus("error");
      }
    }, 800);
    return () => clearTimeout(timer);
  }, [snapshot, url]);

  useEffect(() => {
    const flush = () => {
      if (latest.current === lastSaved.current) return;
      lastSaved.current = latest.current;
      fetch(url, { method: "PUT", headers: { "content-type": "application/json" }, body: latest.current, keepalive: true }).catch(() => {});
    };
    window.addEventListener("pagehide", flush);
    return () => {
      window.removeEventListener("pagehide", flush);
      flush();
    };
  }, [url]);

  // The opening fit is not a change; viewport moves count once someone has touched the canvas.
  const onMoveEnd = useCallback((_, vp) => {
    if (touched.current) setViewport(vp);
  }, []);
  const touch = () => {
    touched.current = true;
  };

  const selectedEdges = edges.filter((e) => e.selected);
  const edgeInPanel = selectedEdges.length === 1 ? selectedEdges[0] : null;
  const panelIdea = panel && !hiddenSet.has(panel) ? ideasById.get(panel) : null;
  const cardCount = ideas.length - hidden.length;
  const titleOf = (id) => ideasById.get(id)?.title || id;
  const statusText = { saved: "Saved", saving: "Saving…", error: "Not saved (retrying on next change)", new: "Not saved yet" }[status];

  return (
    <GraphContext.Provider value={ctx}>
      <header className="graph-bar">
        <div className="graph-bar-row">
          <p className="graph-title">
            <Link href={base}>{label}</Link>
            <span aria-hidden="true">/</span>
            <strong>Graph{name ? `: ${name}` : ""}</strong>
            <span className="graph-count">{cardCount - linkNodeIds.size} cards · {edges.length} links{fileEdges.length ? ` · ${fileEdges.length} from the cards` : ""}</span>
          </p>
          <div className="graph-tools" role="group" aria-label="Arrange">
            <label>
              Layout by{" "}
              <select value={clusterBy} onChange={(e) => setClusterBy(e.target.value)}>
                {groups && <option value="group">folder</option>}
                <option value="kind">kind</option>
                <option value="tag">first tag</option>
              </select>
            </label>
            {linkNodeIds.size > 0 && (
              <label title="Mechanics, readings, prototypes and idea cards the cards link to">
                Linked things{" "}
                <select value={linkMode} onChange={(e) => setLinkMode(e.target.value)}>
                  <option value="shared">shared by 2+ cards</option>
                  <option value="all">all ({linkNodeIds.size})</option>
                  <option value="none">none</option>
                </select>
              </label>
            )}
            <label><input type="checkbox" checked={boxes} onChange={(e) => setBoxes(e.target.checked)} /> boxes</label>
            <button type="button" onClick={relayout}>Re-layout</button>
            <span className="graph-sep" aria-hidden="true" />
            <button type="button" onClick={groupSelected} disabled={!selectedCards.length} title="Select cards (shift-drag or ⌘-click), then group them">Group{selectedCards.length > 1 ? ` ${selectedCards.length}` : ""}</button>
            <button type="button" onClick={ungroupSelected} disabled={!canUngroup}>Ungroup</button>
            <button type="button" onClick={() => setFocus(selectedCards[0].id)} disabled={selectedCards.length !== 1}>Focus</button>
            <span className="graph-sep" aria-hidden="true" />
            <label>
              New links{" "}
              <select value={newKind} onChange={(e) => setNewKind(e.target.value)}>
                <option value="relates">relate to</option>
                <option value="leads">lead to</option>
              </select>
            </label>
            <label><input type="checkbox" checked={showSuggested} onChange={(e) => setShowSuggested(e.target.checked)} /> suggested links{showSuggested ? ` (${suggested.length})` : ""}</label>
            <label><input type="checkbox" checked={snap} onChange={(e) => setSnap(e.target.checked)} /> snap</label>
            {hidden.length > 0 && <button type="button" onClick={restoreHidden} title={hidden.map(titleOf).join("\n")}>Restore {hidden.length} removed</button>}
          </div>
          <span className={`graph-status is-${status}`} role="status">{statusText}</span>
        </div>
        <div className="graph-bar-row">
          <div className="graph-filters" role="group" aria-label="Filters">
            <input type="search" placeholder="Search" value={query} onChange={(e) => setQuery(e.target.value)} aria-label="Search ideas" />
            <select value={week} onChange={(e) => setWeek(e.target.value)} aria-label="Week">
              <option value="">All weeks</option>
              {weeks.map((w) => <option key={w} value={w}>{/^\d+$/.test(w) ? `Week ${w}` : w}</option>)}
            </select>
            <select value={kind} onChange={(e) => setKind(e.target.value)} aria-label="Kind">
              <option value="">All kinds</option>
              {kinds.map(([value, label]) => <option key={value} value={value}>{label}</option>)}
            </select>
            <select value={tag} onChange={(e) => setTag(e.target.value)} aria-label="Tag">
              <option value="">All tags</option>
              {tags.map(([t, n]) => <option key={t} value={t}>{t} ({n})</option>)}
            </select>
            {audiences && (
              <select value={audience} onChange={(e) => setAudience(e.target.value)} aria-label="Audience">
                <option value="">All audiences</option>
                {audiences.map(([value, label]) => <option key={value} value={value}>{label}</option>)}
              </select>
            )}
            {filtering && (
              <>
                <span className="graph-count">{matches.size} match</span>
                <button type="button" onClick={zoomToMatches} disabled={!matches.size}>Zoom to them</button>
                <button type="button" onClick={() => { setQuery(""); setWeek(""); setKind(""); setTag(""); setAudience(""); }}>Clear</button>
              </>
            )}
            {focus && (
              <span className="graph-chip">
                Focus: {titleOf(focus)}
                <button type="button" onClick={() => setFocus(null)} aria-label="Clear focus">×</button>
              </span>
            )}
          </div>
          <form className="graph-name" action={`${base}/graph`}>
            <label>
              Graph{" "}
              <input name="name" defaultValue={name} placeholder="main" pattern="[a-z0-9-]*" maxLength={35} aria-label="Graph name" />
            </label>
          </form>
        </div>
      </header>

      <div className="graph-canvas" onPointerDownCapture={touch} onWheelCapture={touch} onKeyDownCapture={touch}>
        <ReactFlow
          className="graph-flow"
          colorMode="dark"
          nodes={shownNodes}
          edges={shownEdges}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          isValidConnection={isValidConnection}
          connectionMode={ConnectionMode.Loose}
          connectionLineStyle={{ stroke: "var(--accent)", strokeWidth: 1.5 }}
          onEdgeClick={onEdgeClick}
          onEdgeDoubleClick={onEdgeDoubleClick}
          onNodeDoubleClick={onNodeDoubleClick}
          onNodeDragStop={onNodeDragStop}
          onBeforeDelete={onBeforeDelete}
          onNodesDelete={onNodesDelete}
          onMoveEnd={onMoveEnd}
          deleteKeyCode={["Backspace", "Delete"]}
          snapToGrid={snap}
          snapGrid={[GRID, GRID]}
          elevateNodesOnSelect={false}
          zoomOnDoubleClick={false}
          minZoom={0.1}
          maxZoom={2.5}
          {...(initial.viewport ? { defaultViewport: initial.viewport } : { fitView: true, fitViewOptions: { padding: 0.08 } })}
        >
          <Background variant="dots" gap={GRID} size={1.2} />
          <Controls position="bottom-left" />
          <MiniMap
            position="bottom-right"
            pannable
            zoomable
            nodeBorderRadius={4}
            nodeColor={(n) => (n.type === "idea" ? `hsl(${hues[n.data.idea.kind] ?? 0} 55% 55%)` : "rgba(169, 139, 255, 0.08)")}
            nodeStrokeColor={(n) => (n.type === "box" ? "rgba(169, 139, 255, 0.5)" : "transparent")}
          />
          <Panel position="top-left" className="graph-hint">
            Drag from a card's edge dot to link · double-click a card to read it, a link to label it · shift-drag to select · Delete removes
          </Panel>
          {edgeInPanel && (
            <Panel position="bottom-center" className="graph-edge-panel">
              <span className="graph-edge-ends">{titleOf(edgeInPanel.source)} {edgeInPanel.data.kind === "leads" ? "→" : "—"} {titleOf(edgeInPanel.target)}</span>
              <input value={edgeInPanel.data.label} onChange={(e) => updateEdge(edgeInPanel.id, { label: e.target.value })} placeholder="label" aria-label="Link label" />
              <span className="graph-seg" role="group" aria-label="Link type">
                <button type="button" aria-pressed={edgeInPanel.data.kind === "relates"} onClick={() => updateEdge(edgeInPanel.id, { kind: "relates" })}>relates to</button>
                <button type="button" aria-pressed={edgeInPanel.data.kind === "leads"} onClick={() => updateEdge(edgeInPanel.id, { kind: "leads" })}>leads to</button>
              </span>
              <button type="button" onClick={() => updateEdge(edgeInPanel.id, { source: edgeInPanel.target, target: edgeInPanel.source })}>Reverse</button>
              <button type="button" onClick={() => setEdges((eds) => eds.filter((e) => e.id !== edgeInPanel.id))}>Delete</button>
            </Panel>
          )}
        </ReactFlow>
        {panelIdea && (
          <SidePanel idea={panelIdea} hues={hues} edges={allEdges} ideasById={ideasById} focused={focus === panelIdea.slug} onClose={() => setPanel(null)} onFocus={setFocus} onShow={show} />
        )}
      </div>
    </GraphContext.Provider>
  );
}
