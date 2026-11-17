import Link from "next/link";
import { notFound } from "next/navigation";
import { getCards, getGraphData, GROUP_LABELS, PROTO_HUES } from "../../activities/cards.mjs";
import { SiteFooter, SiteHeader } from "../../components/Chrome.jsx";
import Markdown from "../../components/Markdown.jsx";
import "../../ideas/ideas.css";

// /prototypes/<family>/<slug>: one prototype card, a link to play it, its mechanics and readings, and the activity
// cards that use it.

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const slug = (await params).slug.join("/");
  const card = (await getCards("prototypes")).find((c) => c.slug === slug);
  return { title: card ? card.title : "Prototype" };
}

export default async function PrototypePage({ params }) {
  const slug = (await params).slug.map(decodeURIComponent).join("/");
  const protos = await getCards("prototypes");
  const card = protos.find((c) => c.slug === slug);
  if (!card) notFound();
  const { linkNodes, links } = await getGraphData([card]);
  const byId = new Map(linkNodes.map((n) => [n.slug, n]));
  const activities = await getCards("activities");
  const leaf = slug.split("/").pop();
  const usedIn = activities.filter((a) => a.prototypes.some((p) => p === slug || p === leaf));
  const sections = [
    ["Mechanics", links.filter((l) => l.kind === "mechanic")],
    ["Readings", links.filter((l) => l.kind === "reading")],
    ["Idea cards", links.filter((l) => l.kind === "idea")],
  ].filter(([, list]) => list.length);

  return (
    <>
      <SiteHeader />
      <main id="main" className="article-shell">
        <nav className="breadcrumbs" aria-label="Breadcrumbs">
          <Link href="/prototypes">Prototypes</Link>
          <span aria-hidden="true">/</span>
          {card.group && <><span>{GROUP_LABELS[card.group] || card.group}</span><span aria-hidden="true">/</span></>}
          <span>{card.title}</span>
        </nav>
        <article className="idea-page" style={{ "--hue": PROTO_HUES[card.kind] ?? 0 }}>
          <p className="idea-meta">
            <span className="idea-kind">{card.kind || "prototype"}</span>
            {card.date && <span>{card.date}</span>}
            {card.status && <span>{card.status}</span>}
          </p>
          <h1>{card.title}</h1>
          {card.description && <p className="idea-lede">{card.description}</p>}
          {card.route && <p className="ideas-views"><Link href={card.route}>Play it: {card.route}</Link></p>}
          <div className="prose"><Markdown doc={{ ...card, content: card.body, slug: `prototypes/${card.slug}`, dir: `prototypes/${card.group}` }} /></div>
          {sections.map(([title, list]) => (
            <section className="idea-sources" key={title}>
              <p className="eyebrow">{title}</p>
              <ul>
                {list.map((l) => {
                  const n = byId.get(l.target);
                  return <li key={l.target}><Link href={n.href}>{n.title}</Link>{n.missing && <em> (not found in the repo)</em>}</li>;
                })}
              </ul>
            </section>
          ))}
          {usedIn.length > 0 && (
            <section className="idea-sources">
              <p className="eyebrow">Activities that use it</p>
              <ul>{usedIn.map((a) => <li key={a.slug}><Link href={`/activities/${a.slug}`}>{a.title}</Link> <span className="idea-note">· {a.audience.join(", ")}</span></li>)}</ul>
            </section>
          )}
          {card.sources.length > 0 && (
            <footer className="idea-sources">
              <p className="eyebrow">Sources</p>
              <ul>{card.sources.map((s) => <li key={s}><code>{s}</code></li>)}</ul>
            </footer>
          )}
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
