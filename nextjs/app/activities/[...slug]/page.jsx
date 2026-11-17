import Link from "next/link";
import { notFound } from "next/navigation";
import { ACTIVITY_KIND_HUES as KIND_HUES, AUDIENCE_LABELS, GROUP_LABELS, getCard, getCards, getGraphData } from "../cards.mjs";
import { SiteFooter, SiteHeader } from "../../components/Chrome.jsx";
import Markdown from "../../components/Markdown.jsx";
import "../../ideas/ideas.css";

// /activities/<folder>/<slug>: one card, its details, and what it links to (the same links the graph draws).

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const card = await getCard((await params).slug.join("/"));
  return { title: card ? card.title : "Activity" };
}

export default async function ActivityPage({ params }) {
  const slug = (await params).slug.map(decodeURIComponent).join("/");
  const cards = await getCards();
  const card = cards.find((c) => c.slug === slug);
  if (!card) notFound();
  const { linkNodes, links } = await getGraphData(cards);
  const byId = new Map([...cards, ...linkNodes].map((n) => [n.slug, n]));
  const out = links.filter((l) => l.source === slug).map((l) => ({ ...l, node: byId.get(l.target) }));
  const into = links.filter((l) => l.target === slug && l.kind !== "sequence").map((l) => ({ ...l, node: byId.get(l.source) }));
  const hrefOf = (n) => n.href || `/activities/${n.slug}`;
  const facts = [
    ["Audience", card.audience.map((a) => AUDIENCE_LABELS[a] || a).join(", ")],
    ["Time", card.duration && `${card.duration} min`],
    ["Group", card.size],
    ["Play", card.play],
    ["Materials", card.materials.join("; ")],
    ["Status", card.status],
    ["Author", card.author],
  ].filter(([, v]) => v);
  const sections = [
    ["Sequence", out.filter((l) => l.kind === "sequence")],
    ["Mechanics", out.filter((l) => l.kind === "mechanic")],
    ["Readings", out.filter((l) => l.kind === "reading")],
    ["Prototypes", out.filter((l) => l.kind === "prototype")],
    ["Idea cards", out.filter((l) => l.kind === "idea")],
    ["Related activities", out.filter((l) => l.kind === "relates")],
    ["Used in", into],
  ].filter(([, list]) => list.length);

  return (
    <>
      <SiteHeader />
      <main id="main" className="article-shell">
        <nav className="breadcrumbs" aria-label="Breadcrumbs">
          <Link href="/activities">Activities</Link>
          <span aria-hidden="true">/</span>
          {card.group && <><span>{GROUP_LABELS[card.group] || card.group}</span><span aria-hidden="true">/</span></>}
          <span>{card.title}</span>
        </nav>
        <article className="idea-page" style={{ "--hue": KIND_HUES[card.kind] ?? 0 }}>
          <p className="idea-meta">
            <span className="idea-kind">{card.kind || "card"}</span>
            {card.week && <span>Week {card.week}</span>}
            {card.date && <span>{card.date}</span>}
            {card.tags.map((t) => <span key={t}>#{t}</span>)}
          </p>
          <h1>{card.title}</h1>
          {card.description && <p className="idea-lede">{card.description}</p>}
          {facts.length > 0 && (
            <dl className="activity-facts">
              {facts.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}
            </dl>
          )}
          <div className="prose"><Markdown doc={{ ...card, content: card.body, slug: `activities/${card.slug}`, dir: `activities/${card.group}` }} /></div>
          {sections.map(([title, list]) => (
            <section className="idea-sources" key={title}>
              <p className="eyebrow">{title}</p>
              <ul>
                {list.map((l, i) => (
                  <li key={`${l.target}-${i}`}>
                    {l.kind === "sequence" && l.label && <strong>{l.label} </strong>}
                    <Link href={hrefOf(l.node)}>{l.node.title}</Link>
                    {l.node.missing && <em> (not found in the repo)</em>}
                    {l.node.description && !l.node.missing && <span className="idea-note"> · {l.node.description}</span>}
                  </li>
                ))}
              </ul>
            </section>
          ))}
          {card.sources.length > 0 && (
            <footer className="idea-sources">
              <p className="eyebrow">Sources</p>
              <ul>{card.sources.map((s) => <li key={s}><code>{s}</code></li>)}</ul>
              <p className="idea-note">Paths are from the <code>ll-week-11</code> repo unless they say otherwise.</p>
            </footer>
          )}
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
