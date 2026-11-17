import Link from "next/link";
import { GROUP_LABELS, getCards, PROTO_HUES, PROTO_KINDS } from "../activities/cards.mjs";
import { SiteFooter, SiteHeader } from "../components/Chrome.jsx";
import IdeasBrowser from "../ideas/IdeasBrowser.jsx";
import "../ideas/ideas.css";

// /prototypes: PL's prototype cards (_content/prototypes/<family>/, Nov 15) in the /ideas card views, one section per
// family; the playable pages are at /proto/<family>/<slug> (the card's route). Cards and print only.

export const dynamic = "force-dynamic";
export const metadata = { title: "Prototypes" };

const FAMILIES = { economy: GROUP_LABELS.economy, players: GROUP_LABELS.players, hybrid: GROUP_LABELS.hybrid };

export default async function PrototypesPage() {
  const cards = await getCards("prototypes");
  return (
    <>
      <SiteHeader />
      <main id="main" className="ideas-shell">
        <header className="ideas-heading">
          <p className="eyebrow">Week 11 · prototypes · {cards.length} cards</p>
          <h1>Prototypes</h1>
          <p className="ideas-deck">Small playable examples of mechanics we might put in a game, one per card. Each card opens to how to play and what it shows, with a link to play it. Built in the Nov 15 prototypes workspace; the index of playable pages is at <Link href="/proto">/proto</Link>. The files are in <code>_content/prototypes/</code>.</p>
          <nav className="ideas-views" aria-label="Views">
            <Link href="/prototypes/print">Print the cards</Link>
            <Link href="/activities">Activities that use them</Link>
          </nav>
        </header>
        <IdeasBrowser ideas={cards} startHere={[]} kinds={PROTO_KINDS} hues={PROTO_HUES} groups={FAMILIES} />
      </main>
      <SiteFooter />
    </>
  );
}
