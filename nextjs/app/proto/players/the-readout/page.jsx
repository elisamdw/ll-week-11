import { SiteHeader } from "../../../components/Chrome.jsx";
import Table from "./Table.jsx";
import "../../_shared/proto.css";
import "../players.css";

export const metadata = { title: "The readout" };

// /proto/players/the-readout: the table screen (laptop and projector). Phones join at ./phone?room=<code>.
export default function ReadoutPage() {
  return (
    <>
      <SiteHeader />
      <main id="main" className="pi-shell">
        <header className="pi-top">
          <p className="eyebrow">Prototype · information and players</p>
          <h1>The readout</h1>
          <p className="pi-deck">The turn only the phone knows. Each round, one player's phone shows where the AI will move next, and nobody else sees it. They tell the table whatever they like. The table fortifies one place; then the AI moves. Everyone owns a place, and everyone loses if the AI takes two.</p>
        </header>
        <Table />
        <p className="pi-foot muted">Card: <code>_content/prototypes/players/the-readout.md</code>. The AI's rule and tuning: <code>nextjs/app/proto/players/the-readout/rules.js</code>. The AI is a written rule, not a model call. The room's state sits on this laptop's dev server; the readout is hidden by the pages, not encrypted.</p>
      </main>
    </>
  );
}
