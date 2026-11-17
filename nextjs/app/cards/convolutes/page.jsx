import Link from "next/link";
import { convoluteOrder, getCardGraph, KIND_HUES } from "../../../lib/cards.mjs";
import { SiteFooter, SiteHeader } from "../../components/Chrome.jsx";
import CardBody from "../CardBody.jsx";
import "../../ideas/ideas.css";
import "../cards.css";

export const dynamic = "force-dynamic";
export const metadata = { title: "Convolutes" };

// /cards/convolutes: one section per convolute, in the order of _content/cards/convolutes.md, its cards in reading
// order (chains through follows, then order, then date). An indented card starts a branch of a chain.
export default async function ConvolutesPage() {
  const { cards, convolutes } = await getCardGraph();
  const known = new Set(convolutes.map((c) => c.slug));
  const extra = [...new Set(cards.map((c) => c.convolute).filter((s) => !known.has(s)))].map((s) => ({ slug: s, title: s || "No convolute", description: s ? "Not in convolutes.md yet." : "" }));
  const sections = [...convolutes, ...extra].map((v) => ({ ...v, items: convoluteOrder(cards.filter((c) => c.convolute === v.slug)) }));
  return (
    <>
      <SiteHeader />
      <main id="main" className="ideas-shell">
        <nav className="breadcrumbs" aria-label="Breadcrumbs"><Link href="/cards">Cards</Link><span aria-hidden="true">/</span><span>Convolutes</span></nav>
        <header className="ideas-heading">
          <p className="eyebrow">Week 11 · {sections.length} convolutes · {cards.length} cards</p>
          <h1>Convolutes</h1>
          <p className="ideas-deck">Benjamin's bundles: every card belongs to one. Each is listed with its cards in reading order; an indented card starts a branch. The list is <code>_content/cards/convolutes.md</code>.</p>
        </header>
        <nav className="ideas-views" aria-label="Convolutes">
          {sections.map((v) => <Link key={v.slug || "none"} href={`#${v.slug}`}>{v.letter ? `${v.letter} · ` : ""}{v.title} · {v.items.length}</Link>)}
        </nav>
        <div style={{ marginTop: 40 }}>
          {sections.map((v) => (
            <section key={v.slug || "none"} id={v.slug} className="cards-convolute">
              <div className="cards-convolute-head">
                <h2>{v.letter && <span className="cards-letter">{v.letter}</span>}{v.title}</h2>
                {v.items.length > 0 && <Link href={`/cards/print?convolute=${v.slug}`}>Print</Link>}
                {v.items.length > 0 && <Link href={`/cards?convolute=${v.slug}`}>As cards</Link>}
              </div>
              {v.description && <CardBody body={v.description} className="cards-convolute-desc" />}
              {v.items.length ? (
                <ol className="cards-seq">
                  {v.items.map(({ card, depth }, i) => {
                    const branch = depth > (v.items[i - 1]?.depth ?? 0);
                    return (
                      <li key={card.slug} style={{ "--depth": depth, "--hue": KIND_HUES[card.kind] ?? 0 }}>
                        <span className="idea-meta"><span className="idea-kind">{card.kind}</span>{card.status && <span>{card.status}</span>}{card.follows && <span>after {card.followsCard?.title || card.follows}</span>}</span>
                        <Link href={`/cards/${card.slug}`} className={branch ? "is-branch" : undefined}>{card.title}</Link>
                        {card.description && <p>{card.description}</p>}
                      </li>
                    );
                  })}
                </ol>
              ) : (
                <p className="empty-state">No cards yet.</p>
              )}
            </section>
          ))}
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
