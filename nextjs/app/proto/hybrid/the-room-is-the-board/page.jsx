import Link from "next/link";
import { SiteHeader } from "../../../components/Chrome.jsx";
import RoomBoard from "./RoomBoard.jsx";
import "../hybrid.css";

export const metadata = { title: "The room is the board" };

export default function Page() {
  return (
    <>
      <SiteHeader />
      <main id="main" className="hy-shell">
        <p className="eyebrow">
          <Link href="/proto">Prototypes</Link> · hybrid · <Link href="/prototypes/hybrid/the-room-is-the-board">card</Link>
        </p>
        <h1>The room is the board</h1>
        <p className="hy-deck">
          Point the laptop's camera at the room and put this on the projector. The room is cut into five places, left to right. Each turn the AI spreads into the places where no one is standing. Your bodies are the only pieces you have.
        </p>
        <RoomBoard />
      </main>
    </>
  );
}
