"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useCollection } from "./collection.js";

// The /ideas list: filter by week, kind, and tag, or search; "Start here" first when nothing is filtered.
// With `groups` (folder labels, /activities and /prototypes) the cards show in one section per folder; with
// `audiences` there is an audience filter.
export default function IdeasBrowser({ ideas, startHere, kinds, hues, groups, audiences }) {
  const [week, setWeek] = useState("");
  const [kind, setKind] = useState("");
  const [tag, setTag] = useState("");
  const [audience, setAudience] = useState("");
  const [query, setQuery] = useState("");

  const weeks = useMemo(() => [...new Set(ideas.map((i) => i.week).filter(Boolean))].sort((a, b) => a.localeCompare(b, undefined, { numeric: true })), [ideas]);
  const tags = useMemo(() => {
    const counts = new Map();
    for (const idea of ideas) for (const t of idea.tags) counts.set(t, (counts.get(t) || 0) + 1);
    return [...counts].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
  }, [ideas]);

  const q = query.trim().toLowerCase();
  const shown = ideas.filter(
    (i) =>
      (!week || i.week === week) &&
      (!kind || i.kind === kind) &&
      (!tag || i.tags.includes(tag)) &&
      (!audience || i.audience?.includes(audience)) &&
      (!q || `${i.title} ${i.description} ${i.body} ${i.tags.join(" ")}`.toLowerCase().includes(q)),
  );
  const filtered = Boolean(week || kind || tag || audience || q);
  const sections = groups
    ? [...Object.keys(groups), ...new Set(shown.map((i) => i.group).filter((g) => !(g in groups)))].map((g) => [g, groups[g] || g || "Other", shown.filter((i) => (i.group || "") === g)]).filter(([, , items]) => items.length)
    : [["", "All ideas", shown]];
  const starters = filtered ? [] : startHere.map((s) => ideas.find((i) => i.slug === s)).filter(Boolean);

  return (
    <>
      <div className="ideas-filters" role="group" aria-label="Filters">
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
        <span className="ideas-count">{shown.length} of {ideas.length}</span>
      </div>

      {starters.length > 0 && (
        <section className="ideas-section" aria-labelledby="start-here">
          <h2 id="start-here" className="eyebrow">Start here</h2>
          <div className="ideas-grid">{starters.map((idea) => <IdeaCard key={idea.slug} idea={idea} hues={hues} />)}</div>
        </section>
      )}

      {sections.map(([g, title, items]) => (
        <section className="ideas-section" aria-label={title} key={g || "all"}>
          {(groups || (!filtered && starters.length > 0)) && <h2 className="eyebrow">{title} · {items.length}</h2>}
          <div className="ideas-grid">{items.map((idea) => <IdeaCard key={idea.slug} idea={idea} hues={hues} />)}</div>
        </section>
      ))}
      {shown.length === 0 && <p className="empty-state">{ideas.length ? "No cards match." : "No cards yet."}</p>}
    </>
  );
}

function IdeaCard({ idea, hues }) {
  const { base } = useCollection();
  return (
    <Link href={`${base}/${idea.slug}`} className="idea-card" style={{ "--hue": hues[idea.kind] ?? 0 }}>
      <span className="idea-meta">
        <span className="idea-kind">{idea.kind || "idea"}</span>
        {idea.audience?.length > 0 ? <span>{idea.audience.join(" · ")}</span> : idea.week && <span>{/^\d+$/.test(idea.week) ? `W${idea.week}` : idea.week}</span>}
        {idea.duration && <span>{idea.duration} min</span>}
      </span>
      <strong>{idea.title}</strong>
      {idea.description && <span className="idea-desc">{idea.description}</span>}
      {idea.tags.length > 0 && <span className="idea-tags">{idea.tags.map((t) => `#${t}`).join(" ")}</span>}
    </Link>
  );
}
