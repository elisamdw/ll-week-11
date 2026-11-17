import Link from "next/link";
import { SiteHeader } from "../../../components/Chrome.jsx";
import Host from "./Host.jsx";
import "../../_shared/proto.css";
import "../hybrid.css";

export const metadata = { title: "Monopoly with live rents" };

// /proto/hybrid/monopoly-with-live-rents: the rent board on the laptop or projector. Phones join at ./phone?room=<code>.
export default function Page() {
  return (
    <>
      <SiteHeader />
      <main id="main" className="hy-shell">
        <p className="eyebrow">
          <Link href="/proto">Prototypes</Link> · hybrid · <Link href="/prototypes/hybrid/monopoly-with-live-rents">card</Link>
        </p>
        <h1>Monopoly with live rents</h1>
        <p className="hy-deck">
          Play the LL's Monopoly on the table, but take the rents off the deeds. When you land on someone's property, your phone (or this screen) says what you owe now. Switch between the printed rents, a designer's rebalance, and rents that rise with demand, and feel the same board turn into a different game.
        </p>
        <Host />
      </main>
    </>
  );
}
