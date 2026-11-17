import Link from "next/link";
import { SiteHeader } from "../../../components/Chrome.jsx";
import TapLog from "./TapLog.jsx";
import "../hybrid.css";

export const metadata = { title: "Every tap is a row" };

export default function Page() {
  return (
    <>
      <SiteHeader />
      <main id="main" className="hy-shell">
        <p className="eyebrow">
          <Link href="/proto">Prototypes</Link> · hybrid · <Link href="/prototypes/hybrid/every-tap-is-a-row">card</Link>
        </p>
        <h1>Every tap is a row</h1>
        <p className="hy-deck">
          Ninety seconds. Tap your badge, then one thing from the table; a data center takes one GPU, one Power, one Land and one Water. Every tap writes a row, and the board is nothing but those rows replayed. When time is up, read the table.
        </p>
        <TapLog />
      </main>
    </>
  );
}
