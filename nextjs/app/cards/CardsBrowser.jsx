"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

// The /cards list (copied from app/ideas/IdeasBrowser.jsx and changed): filter by convolute, kind, tag, status,
// audience and voice, or search; one section per convolute, its cards in reading order (the server sends them in that order).
// The filters can also open preset from the URL (?convolute= ?kind= ?tag= ?status= ?audience= ?voice=), and "Print these" carries
// them to /cards/print.
//
// A print set (Nov 15, Marlon: print "the highest-leverage ones"): the ☐ on each card adds it to the named set, in the
// order you mark them; the set saves to _content/cards/_layouts/print-<name>.json and prints at /cards/print?set=<name>.
export default function CardsBrowser({ cards, convolutes, kinds, hues, statuses, audiences, voices, initial = {} }) {
  const [convolute, setConvolute] = useState(initial.convolute || "");
  const [kind, setKind] = useState(initial.kind || "");
  const [tag, setTag] = useState(initial.tag || "");
  const [status, setStatus] = useState(initial.status || "");
  const [audience, setAudience] = useState(initial.audience || "");
  const [voice, setVoice] = useState(initial.voice || "");
  const [query, setQuery] = useState("");
  const [setName, setSetName] = useState(initial.set || "set");
  const [marked, setMarked] = useState([]);
  const [saveState, setSaveState] = useState("");
  const loaded = useRef("");
  const validSet = /^[a-z0-9][a-z0-9-]{0,34}$/.test(setName);

  // Load the named set; save it whenever the marks change (after it has loaded).
  useEffect(() => {
    if (!validSet) return;
    let live = true;
    loaded.current = "";
    fetch(`/cards/api/layout/print-${setName}`, { cache: "no-store" })
      .then((r) => r.json())
      .then((d) => {
        if (!live) return;
        setMarked(Array.isArray(d.cards) ? d.cards.filter((s) => typeof s === "string") : []);
        loaded.current = setName;
        setSaveState(Array.isArray(d.cards) ? "saved" : "new");
      })
      .catch(() => live && setSaveState("error"));
    return () => {
      live = false;
    };
  }, [setName, validSet]);
  const saveSet = (next) => {
    setMarked(next);
    if (loaded.current !== setName) return;
    setSaveState("saving");
    fetch(`/cards/api/layout/print-${setName}`, { method: "PUT", headers: { "content-type": "application/json" }, body: JSON.stringify({ version: 1, cards: next }) })
      .then((r) => setSaveState(r.ok ? "saved" : "error"))
      .catch(() => setSaveState("error"));
  };
  const toggle = (slug) => saveSet(marked.includes(slug) ? marked.filter((s) => s !== slug) : [...marked, slug]);

  const tags = useMemo(() => {
    const counts = new Map();
    for (const c of cards) for (const t of c.tags) counts.set(t, (counts.get(t) || 0) + 1);
    return [...counts].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
  }, [cards]);
  const titles = useMemo(() => Object.fromEntries(cards.map((c) => [c.slug, c.title])), [cards]);

  const q = query.trim().toLowerCase();
  const shown = cards.filter(
    (c) =>
      (!convolute || c.convolute === convolute) &&
      (!kind || c.kind === kind) &&
      (!tag || c.tags.includes(tag)) &&
      (!status || c.status === status) &&
      (!audience || c.audience.includes(audience)) &&
      (!voice || c.voice === voice) &&
      (!q || `${c.title} ${c.description} ${c.body} ${c.tags.join(" ")}`.toLowerCase().includes(q)),
  );
  const known = new Set(convolutes.map((c) => c.slug));
  const sections = [
    ...convolutes.map((c) => [c.slug, c.title, c.description]),
    ...[...new Set(shown.map((c) => c.convolute).filter((s) => !known.has(s)))].map((s) => [s, s || "No convolute", s ? "Not in convolutes.md yet." : ""]),
  ]
    .map(([slug, title, description]) => [slug, title, description, shown.filter((c) => c.convolute === slug)])
    .filter(([, , , items]) => items.length);
  const printHref = `/cards/print?${new URLSearchParams(Object.entries({ convolute, kind, tag, status, audience, voice }).filter(([, v]) => v)).toString()}`;

  return (
    <>
      <div className="ideas-filters" role="group" aria-label="Filters">
        <input type="search" placeholder="Search" value={query} onChange={(e) => setQuery(e.target.value)} aria-label="Search cards" />
        <select value={convolute} onChange={(e) => setConvolute(e.target.value)} aria-label="Convolute">
          <option value="">All convolutes</option>
          {convolutes.map((c) => <option key={c.slug} value={c.slug}>{c.title}</option>)}
        </select>
        <select value={kind} onChange={(e) => setKind(e.target.value)} aria-label="Kind">
          <option value="">All kinds</option>
          {kinds.map(([value, label]) => <option key={value} value={value}>{label}</option>)}
        </select>
        <select value={tag} onChange={(e) => setTag(e.target.value)} aria-label="Tag">
          <option value="">All tags</option>
          {tags.map(([t, n]) => <option key={t} value={t}>{t} ({n})</option>)}
        </select>
        <select value={status} onChange={(e) => setStatus(e.target.value)} aria-label="Status">
          <option value="">Any status</option>
          {statuses.map(([value, label]) => <option key={value} value={value}>{label}</option>)}
        </select>
        <select value={audience} onChange={(e) => setAudience(e.target.value)} aria-label="Audience">
          <option value="">All audiences</option>
          {audiences.map(([value, label]) => <option key={value} value={value}>{label}</option>)}
        </select>
        <select value={voice} onChange={(e) => setVoice(e.target.value)} aria-label="Voice">
          <option value="">Any voice</option>
          {voices.map(([value, label]) => <option key={value} value={value}>{label}</option>)}
        </select>
        <Link href={printHref} className="cards-print-these">Print these</Link>
        <span className="ideas-count">{shown.length} of {cards.length}</span>
      </div>

      <div className="cards-set-bar" role="group" aria-label="Print set">
        <label>
          Print set{" "}
          <input value={setName} onChange={(e) => setSetName(e.target.value.toLowerCase().trim())} pattern="[a-z0-9-]*" maxLength={35} aria-label="Print set name" aria-invalid={!validSet} />
        </label>
        <span>{marked.length} card{marked.length === 1 ? "" : "s"} marked</span>
        {marked.length > 0 && validSet && (
          <>
            <Link href={`/cards/print?set=${setName}`}>Print the set</Link>
            <Link href={`/cards/print?set=${setName}&form=short`}>short</Link>
            <button type="button" onClick={() => window.confirm(`Unmark all ${marked.length} cards in "${setName}"?`) && saveSet([])}>Clear</button>
          </>
        )}
        <span className="cards-set-status">{validSet ? { saved: "Saved", saving: "Saving…", error: "Not saved", new: "New set" }[saveState] || "" : "Names: lowercase letters, digits, hyphens"}</span>
      </div>

      {sections.map(([slug, title, description, items]) => (
        <section className="ideas-section" aria-label={title} key={slug || "none"}>
          <h2 className="eyebrow">
            {slug ? <Link href={`/cards/convolutes#${slug}`}>{title}</Link> : title} · {items.length}
          </h2>
          {description && <p className="cards-section-desc">{description}</p>}
          <div className="ideas-grid">{items.map((card) => <CardTile key={card.slug} card={card} hues={hues} titles={titles} mark={marked.indexOf(card.slug) + 1} onMark={validSet ? () => toggle(card.slug) : null} />)}</div>
        </section>
      ))}
      {shown.length === 0 && <p className="empty-state">{cards.length ? "No cards match." : "No cards yet."}</p>}
    </>
  );
}

function CardTile({ card, hues, titles, mark, onMark }) {
  return (
    <div className="cards-tile">
    {onMark && (
      <button type="button" className={`cards-mark${mark ? " is-on" : ""}`} onClick={onMark} aria-pressed={Boolean(mark)} title={mark ? `In the print set (no. ${mark}); click to take it out` : "Add to the print set"}>
        {mark ? mark : "☐"}
      </button>
    )}
    <Link href={`/cards/${card.slug}`} className="idea-card" style={{ "--hue": hues[card.kind] ?? 0 }}>
      <span className="idea-meta">
        <span className="idea-kind">{card.kind || "card"}</span>
        {card.status && <span>{card.status}</span>}
        {card.voice && <span>{card.voice}</span>}
        {card.audience.length > 0 && <span>{card.audience.join(" · ")}</span>}
      </span>
      <strong>{card.title}</strong>
      {card.description && <span className="idea-desc">{card.description}</span>}
      {card.follows && <span className="cards-after">after {titles[card.follows] || card.follows}</span>}
      {card.tags.length > 0 && <span className="idea-tags">{card.tags.map((t) => `#${t}`).join(" ")}</span>}
    </Link>
    </div>
  );
}
