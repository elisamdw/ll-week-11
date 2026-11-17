import { SiteHeader } from "../../../components/Chrome.jsx";
import Table from "./Table.jsx";
import "../../_shared/proto.css";
import "../players.css";

export const metadata = { title: "The intent" };

// /proto/players/the-intent: the table screen (laptop and projector). Phones join at ./phone?room=<code>.
export default function IntentPage() {
  return (
    <>
      <SiteHeader />
      <main id="main" className="pi-shell">
        <header className="pi-top">
          <p className="eyebrow">Prototype · information and players</p>
          <h1>The intent</h1>
          <p className="pi-deck">One player plays the AI, and only their phone says what it is optimizing for. Each round it picks one of three moves, and four meters move in public. Everyone else reads its intent from its picks and locks a guess; the earlier, the more it's worth. If the table reads it, the AI scores nothing.</p>
        </header>
        <Table />
        <p className="pi-foot muted">Card: <code>_content/prototypes/players/the-intent.md</code>. Moves, objectives and tuning: <code>nextjs/app/proto/players/the-intent/rules.js</code>. The AI is a person, not a model. The room's state sits on this laptop's dev server; the objective is hidden by the pages, not encrypted.</p>
      </main>
    </>
  );
}
