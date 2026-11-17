import Link from "next/link";
import { AUDIENCES, convoluteOrder, getCardGraph, KIND_HUES, KINDS, STATUSES, VOICES } from "../../lib/cards.mjs";
import { SiteFooter, SiteHeader } from "../components/Chrome.jsx";
import CardsBrowser from "./CardsBrowser.jsx";
import "../ideas/ideas.css";
import "./cards.css";

export const dynamic = "force-dynamic";
export const metadata = { title: "Cards" };

// /cards: every card in _content/cards/, one section per convolute, in reading order. ?convolute= ?kind= ?tag=
// ?status= ?audience= ?voice= open it filtered.
export default async function CardsPage({ searchParams }) {
  const sp = await searchParams;
  const { cards, convolutes } = await getCardGraph();
  const ordered = [...new Set(cards.map((c) => c.convolute))].flatMap((v) => convoluteOrder(cards.filter((c) => c.convolute === v)).map((x) => x.card));
  // Only plain fields go to the browser (the graph's back-references would loop).
  const plain = ordered.map(({ linksTo, linkedFrom, followedBy, followsCard, grows, ...c }) => c);
  const one = (k) => (Array.isArray(sp[k]) ? sp[k][0] : sp[k]) || "";
  return (
    <>
      <SiteHeader />
      <main id="main" className="ideas-shell">
        <header className="ideas-heading">
          <p className="eyebrow">Week 11 · cards · {cards.length} cards in {convolutes.length} convolutes</p>
          <h1>Cards</h1>
          <p className="ideas-deck">One card for every idea, fragment, activity and mechanic for the week, linked through their frontmatter: a <em>convolute</em> to bundle them (Benjamin), <em>follows</em> to chain them and <em>links</em> to cross-reference them (Luhmann), and aphorisms (Nietzsche). The files are in <code>_content/cards/</code>; the format is in <Link href="/cards/format">format.md</Link>; the views are explained in <Link href="/cards/views">views.md</Link>.</p>
          <nav className="ideas-views" aria-label="Views">
            <Link href="/cards/print">Print</Link>
            <Link href="/cards/convolutes">Convolutes</Link>
            <Link href="/cards/graph">Graph</Link>
            <Link href="/cards/board">Board</Link>
          </nav>
        </header>
        <CardsBrowser
          cards={plain}
          convolutes={convolutes.map((c) => ({ ...c, description: c.description.replace(/[*_`]/g, "") }))}
          kinds={KINDS}
          hues={KIND_HUES}
          statuses={STATUSES}
          audiences={AUDIENCES}
          voices={VOICES}
          initial={{ convolute: one("convolute"), kind: one("kind"), tag: one("tag"), status: one("status"), audience: one("audience"), voice: one("voice"), set: one("set") }}
        />
      </main>
      <SiteFooter />
    </>
  );
}
