import { SiteHeader } from "../../../components/Chrome.jsx";
import Table from "./Table.jsx";
import "../../_shared/proto.css";
import "../players.css";

export const metadata = { title: "Place to commit" };

// /proto/players/place-to-commit: the table screen (laptop and projector), which resolves each round. Phones join at ./phone?room=<code>.
export default function PlaceToCommitPage() {
  return (
    <>
      <SiteHeader />
      <main id="main" className="pi-shell">
        <header className="pi-top">
          <p className="eyebrow">Prototype · information and players</p>
          <h1>Place to commit</h1>
          <p className="pi-deck">Each round the AI says where it will move and how hard. Talk it over, then everyone commits one token on their phone, in secret: defend a place, or put it on your own project for a point. No take-back. When everyone has committed, every order is revealed at once.</p>
        </header>
        <Table />
        <p className="pi-foot muted">Card: <code>_content/prototypes/players/place-to-commit.md</code>. The AI's rule and tuning: <code>nextjs/app/proto/players/place-to-commit/rules.js</code>. The AI is a written rule, not a model call. Keep one table screen open per room: it resolves the rounds. Orders are hidden by the pages, not encrypted.</p>
      </main>
    </>
  );
}
