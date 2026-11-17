import { SiteHeader } from "../../../components/Chrome.jsx";
import Table from "./Table.jsx";
import "../../_shared/proto.css";
import "../players.css";

export const metadata = { title: "Private goals on your phone" };

// /proto/players/private-goals: the table screen (laptop and projector). Phones join at ./phone?room=<code>.
export default function PrivateGoalsPage() {
  return (
    <>
      <SiteHeader />
      <main id="main" className="pi-shell">
        <header className="pi-top">
          <p className="eyebrow">Prototype · information and players</p>
          <h1>Private goals on your phone</h1>
          <p className="pi-deck">The board is public: four tracks of tokens. Your goal is private, on your phone. Take turns moving one token each; one of you is secretly the AI. At the end, name the AI, then see everyone's goals.</p>
        </header>
        <Table />
        <p className="pi-foot muted">Card: <code>_content/prototypes/players/private-goals.md</code>. Goals and tuning: <code>nextjs/app/proto/players/private-goals/rules.js</code>. The room's state sits on this laptop's dev server; the goals are hidden by the pages, not encrypted.</p>
      </main>
    </>
  );
}
