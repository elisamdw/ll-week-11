import Link from "next/link";
import { SiteHeader } from "../../../components/Chrome.jsx";
import Stage from "./Stage.jsx";
import "../../_shared/proto.css";
import "../hybrid.css";

export const metadata = { title: "The audience layer" };

// /proto/hybrid/the-audience-layer: the projected stage. The audience joins at ./phone?room=<code>.
export default function Page() {
  return (
    <>
      <SiteHeader />
      <main id="main" className="hy-shell">
        <p className="eyebrow">
          <Link href="/proto">Prototypes</Link> · hybrid · <Link href="/prototypes/hybrid/the-audience-layer">card</Link>
        </p>
        <h1>The audience layer</h1>
        <p className="hy-deck">
          Two or three players shield cells from an AI spreading across the board. They can't see where it's going next. Everyone watching can, on their phones, and has three nudges for the game: a hint to the players, or food for the AI.
        </p>
        <Stage />
      </main>
    </>
  );
}
