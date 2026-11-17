import Link from "next/link";
import { SiteHeader } from "../../../components/Chrome.jsx";
import PhotoState from "./PhotoState.jsx";
import "../hybrid.css";

export const metadata = { title: "Photo to game state" };

export default function Page() {
  return (
    <>
      <SiteHeader />
      <main id="main" className="hy-shell">
        <p className="eyebrow">
          <Link href="/proto">Prototypes</Link> · hybrid · <Link href="/prototypes/hybrid/photo-to-game-state">card</Link>
        </p>
        <h1>Photo to game state</h1>
        <p className="hy-deck">
          You are the vision model. Pin what you see on an overhead photo of a game, and the pins become its state: a table and JSON. Do it for two photos and read what changed between them. Then look at what no photo shows.
        </p>
        <PhotoState />
      </main>
    </>
  );
}
