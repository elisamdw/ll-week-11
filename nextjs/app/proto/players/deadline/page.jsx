import { SiteHeader } from "../../../components/Chrome.jsx";
import Table from "./Table.jsx";
import "../../_shared/proto.css";
import "../players.css";

export const metadata = { title: "The deadline" };

// /proto/players/deadline: the table screen (laptop and projector), which runs the clock. Phones join at ./phone?room=<code>.
export default function DeadlinePage() {
  return (
    <>
      <SiteHeader />
      <main id="main" className="pi-shell">
        <header className="pi-top">
          <p className="eyebrow">Prototype · information and players</p>
          <h1>The deadline</h1>
          <p className="pi-deck">Negotiation on phones joined to one room. Each phone holds some tokens and a set it needs; nobody sees anyone else's. Trade phone to phone before two minutes run out. The AI buys any token, pays more as the deadline nears, and keeps what it buys.</p>
        </header>
        <Table />
        <p className="pi-foot muted">Card: <code>_content/prototypes/players/deadline.md</code>. Tokens, the AI's price and tuning: <code>nextjs/app/proto/players/deadline/rules.js</code>. The AI buyer is a written rule, not a model call. Keep one table screen open per room: it runs the clock. The needs are hidden by the pages, not encrypted.</p>
      </main>
    </>
  );
}
