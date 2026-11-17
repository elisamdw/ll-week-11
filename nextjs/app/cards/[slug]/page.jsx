import { readFile } from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import Link from "next/link";
import { notFound } from "next/navigation";
import { chainOf, getCardGraph, KIND_HUES } from "../../../lib/cards.mjs";
import { SiteFooter, SiteHeader } from "../../components/Chrome.jsx";
import CardBody from "../CardBody.jsx";
import "../../ideas/ideas.css";
import "../cards.css";

export const dynamic = "force-dynamic";

// /cards/<slug>: one card. Its frontmatter shown plainly, the body, then its links both ways: what it follows and what
// follows it, what it links to (here and in other collections), and what links to it. The folder's own documents
// (format.md, views.md, README.md) are shown here too, since this route covers /cards/<name>.
const DOCS = { format: "format.md", views: "views.md", readme: "README.md" };

export async function generateMetadata({ params }) {
  const slug = (await params).slug;
  const { bySlug } = await getCardGraph();
  return { title: bySlug.get(slug)?.title || (DOCS[slug] ? `Cards: ${slug}` : "Card") };
}

async function folderDoc(slug) {
  if (!DOCS[slug]) return null;
  try {
    const { data, content } = matter(await readFile(/* turbopackIgnore: true */ path.join(process.cwd(), "..", "_content", "cards", DOCS[slug]), "utf8"));
    return { title: String(data.title || DOCS[slug]), description: String(data.description || ""), body: content.trim() };
  } catch {
    return null;
  }
}

function Target({ t }) {
  if (t.missing) return <span className="cards-missing" title="No card or file by this name yet">{t.slug} (not found)</span>;
  return (
    <>
      {t.href ? <Link href={t.href}>{t.title}</Link> : <span title="No page for this mechanic yet">{t.title}</span>}
      <small>{t.outside ? `${t.outside.label} · ${t.slug}` : t.card?.description}</small>
    </>
  );
}

export default async function CardPage({ params }) {
  const slug = (await params).slug;
  const { bySlug, convolutes } = await getCardGraph();
  const card = bySlug.get(slug);
  const titles = Object.fromEntries([...bySlug.values()].map((c) => [c.slug, c.title]));

  if (!card) {
    const doc = await folderDoc(slug);
    if (!doc) notFound();
    return (
      <>
        <SiteHeader />
        <main id="main" className="article-shell">
          <nav className="breadcrumbs" aria-label="Breadcrumbs"><Link href="/cards">Cards</Link><span aria-hidden="true">/</span><span>{doc.title}</span></nav>
          <article className="idea-page">
            <h1>{doc.title}</h1>
            {doc.description && <p className="idea-lede">{doc.description}</p>}
            <CardBody body={doc.body} titles={titles} className="prose" />
          </article>
        </main>
        <SiteFooter />
      </>
    );
  }

  const conv = convolutes.find((c) => c.slug === card.convolute);
  const chain = chainOf(card, bySlug);
  const at = chain.findIndex((x) => x.here);
  const prev = card.followsCard;
  const linkedHere = card.linksTo.filter((t) => t.card);
  const linkedOut = card.linksTo.filter((t) => !t.card);
  const facts = [
    ["Kind", card.kind],
    ["Convolute", card.convolute && <Link href={`/cards/convolutes#${card.convolute}`}>{conv?.title || card.convolute}</Link>],
    ["Tags", card.tags.length > 0 && card.tags.map((t, i) => <span key={t}>{i > 0 && " "}<Link href={`/cards?tag=${encodeURIComponent(t)}`}>#{t}</Link></span>)],
    ["Audience", card.audience.join(", ")],
    ["Status", card.status],
    ["Voice", card.voice],
    ["Author", card.author],
    ["Date", [card.date, card.week && `week ${card.week}`].filter(Boolean).join(" · ")],
    ["Order", card.order ?? ""],
    ["Slug", <code key="s">{card.slug}</code>],
  ].filter(([, v]) => v !== "" && v !== false && v != null);

  return (
    <>
      <SiteHeader />
      <main id="main" className="article-shell">
        <nav className="breadcrumbs" aria-label="Breadcrumbs">
          <Link href="/cards">Cards</Link>
          <span aria-hidden="true">/</span>
          {conv && <><Link href={`/cards/convolutes#${conv.slug}`}>{conv.title}</Link><span aria-hidden="true">/</span></>}
          <span>{card.title}</span>
        </nav>
        <article className="idea-page" style={{ "--hue": KIND_HUES[card.kind] ?? 0 }}>
          <p className="idea-meta">
            <span className="idea-kind">{card.kind || "card"}</span>
            {card.status && <span>{card.status}</span>}
            {chain.length > 1 && <span>{at + 1} of {chain.length} in its chain</span>}
          </p>
          <h1>{card.title}</h1>
          {card.description && <p className="idea-lede">{card.description}</p>}
          <p className="cards-actions">
            {chain.length > 1 && <Link href={`/cards/chain/${card.slug}#${card.slug}`}>Read the chain</Link>}
            <Link href={`/cards/print/${card.slug}`}>Print this card</Link>
            {card.convolute && <Link href={`/cards/print?convolute=${card.convolute}`}>Print its convolute</Link>}
          </p>
          <dl className="cards-facts">
            {facts.map(([k, v]) => <div key={k} style={{ display: "contents" }}><dt>{k}</dt><dd>{v}</dd></div>)}
          </dl>
          {card.abstract && <CardBody body={card.abstract} titles={titles} className="prose cards-abstract" />}
          <CardBody body={card.main} titles={titles} className="prose" />

          <nav className="cards-chain-nav" aria-label="Chain">
            <span>{prev ? <>← follows <Link href={prev.href || "#"}>{prev.title}</Link></> : "Starts a chain"}</span>
            <span>{card.followedBy.length ? <>followed by {card.followedBy.map((n, i) => <span key={n.slug}>{i > 0 && ", "}<Link href={`/cards/${n.slug}`}>{n.title}</Link></span>)} →</> : "Nothing follows yet"}</span>
          </nav>

          <section className="cards-links" aria-label="Links">
            {linkedHere.length > 0 && (
              <div>
                <h2 className="eyebrow">Links to cards</h2>
                <ul>
                  {linkedHere.map((t) => <li key={t.slug}><Target t={t} /></li>)}
                </ul>
              </div>
            )}
            {card.linkedFrom.length > 0 && (
              <div>
                <h2 className="eyebrow">Linked from</h2>
                <ul>{card.linkedFrom.map((l) => <li key={`${l.how}-${l.slug}`}><Link href={l.href}>{l.title}</Link><small>{l.how === "links" ? l.card.description : l.how}</small></li>)}</ul>
              </div>
            )}
            {(linkedOut.length > 0 || card.grows.length > 0) && (
              <div>
                <h2 className="eyebrow">Links to other collections</h2>
                <ul>
                  {card.grows.map((t) => <li key={`g-${t.slug}`}><Target t={t} /><small>grows from</small></li>)}
                  {linkedOut.map((t) => <li key={t.slug}><Target t={t} /></li>)}
                </ul>
              </div>
            )}
          </section>

          {card.sources.length > 0 && (
            <footer className="idea-sources">
              <p className="eyebrow">Sources</p>
              <ul>{card.sources.map((s) => <li key={s}>{/^https?:/.test(s) ? <a href={s}>{s}</a> : <code>{s}</code>}</li>)}</ul>
              <p className="idea-note">Repo paths are from the root of <code>ll-week-11</code>; <code>NB/</code> is The Notebook, <code>W11/</code> the week's plan folder.</p>
            </footer>
          )}
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
