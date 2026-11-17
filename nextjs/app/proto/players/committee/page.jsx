import { SiteHeader } from "../../../components/Chrome.jsx";
import Committee from "./Committee.jsx";
import "../players.css";

export const metadata = { title: "The committee" };

// /proto/players/committee; ?advisor=random or ?advisor=self fixes which advisor the committee gets.
export default async function CommitteePage({ searchParams }) {
  const advisor = (await searchParams).advisor;
  const forcedMode = advisor === "random" || advisor === "self" ? advisor : null;
  return (
    <>
      <SiteHeader />
      <main id="main" className="pi-shell">
        <header className="pi-top">
          <p className="eyebrow">Prototype · information and players</p>
          <h1>The committee</h1>
          <p className="pi-deck">You are the lab's oversight committee. The lab brings ten proposals; the room votes on each. An AI advisor recommends a vote, and it's right most of the time. Approve what helps, block what harms, and notice how you start to lean on it.</p>
        </header>
        <Committee forcedMode={forcedMode} />
        <p className="pi-foot muted">The advisor is a written rule, not a model call. Card: <code>_content/prototypes/players/committee.md</code>. Tuning values are at the top of <code>nextjs/app/proto/players/committee/Committee.jsx</code>.</p>
      </main>
    </>
  );
}
