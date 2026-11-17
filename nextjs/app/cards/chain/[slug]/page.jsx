import Link from "next/link";
import { notFound } from "next/navigation";
import { chainOf, getCardGraph, KIND_HUES } from "../../../../lib/cards.mjs";
import { SiteFooter, SiteHeader } from "../../../components/Chrome.jsx";
import CardBody from "../../CardBody.jsx";
import "../../../ideas/ideas.css";
import "../../cards.css";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const { bySlug } = await getCardGraph();
  const card = bySlug.get((await params).slug);
  return { title: card ? `Chain: ${card.title}` : "Chain" };
}

// /cards/chain/<slug>: the follows chain through one card, on one page: back to the card that starts it, then every
// continuation in order (Luhmann's reading). A card two cards follow opens a branch, indented after the main line.
export default async function ChainPage({ params }) {
  const slug = (await params).slug;
  const { bySlug } = await getCardGraph();
  const card = bySlug.get(slug);
  if (!card) notFound();
  const chain = chainOf(card, bySlug);
  const titles = Object.fromEntries([...bySlug.values()].map((c) => [c.slug, c.title]));
  return (
    <>
      <SiteHeader />
      <main id="main" className="article-shell">
        <nav className="breadcrumbs" aria-label="Breadcrumbs">
          <Link href="/cards">Cards</Link><span aria-hidden="true">/</span>
          <Link href={`/cards/${card.slug}`}>{card.title}</Link><span aria-hidden="true">/</span>
          <span>Chain</span>
        </nav>
        <header className="ideas-heading">
          <p className="eyebrow">A chain of {chain.length} card{chain.length === 1 ? "" : "s"}</p>
          <h1 style={{ fontSize: "clamp(36px, 5vw, 60px)" }}>From “{chain[0].card.title}”</h1>
          <p className="cards-actions" style={{ marginTop: 18 }}>
            <Link href={`/cards/print?cards=${chain.map((x) => x.card.slug).join(",")}`}>Print the chain</Link>
          </p>
        </header>
        <div className="cards-chain">
          {chain.map(({ card: c, depth, branchOf, here }, i) => (
            <article key={c.slug} id={c.slug} className={`cards-chain-card${here ? " is-here" : ""}`} style={{ "--depth": depth, "--hue": KIND_HUES[c.kind] ?? 0 }}>
              {branchOf && <p className="cards-chain-branch">A branch: this also follows “{branchOf.title}”.</p>}
              <p className="idea-meta"><span>{i + 1}</span><span className="idea-kind">{c.kind}</span><span>{c.convolute}</span>{c.status && <span>{c.status}</span>}</p>
              <h2><Link href={`/cards/${c.slug}`}>{c.title}</Link></h2>
              {c.description && <p className="idea-lede">{c.description}</p>}
              {c.abstract && <CardBody body={c.abstract} titles={titles} className="prose cards-abstract" />}
              <CardBody body={c.main} titles={titles} className="prose" />
            </article>
          ))}
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
