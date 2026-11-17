import Link from "next/link";
import { redirect } from "next/navigation";
import { nanoid } from "nanoid";
import "./scrabble.css";

export const metadata = { title: "Scrabble" };

async function createGame() {
  "use server";
  const id = nanoid(8).toLowerCase().replace(/[^a-z0-9]/g, "a");
  redirect(`/scrabble/${id}`);
}

export default function ScrabbleLanding() {
  return (
    <main className="scrabble-landing">
      <h1>Scrabble</h1>
      <p>
        One laptop is the board. Everyone else plays from their phone.
        Open a board, then scan the QR with each player to get a private rack.
      </p>
      <form action={createGame}>
        <button type="submit" className="scrabble-cta">New board</button>
      </form>
      <p className="scrabble-fine">
        Up to four players. Standard English dictionary. First move covers the center.
      </p>
      <p className="scrabble-fine">
        <Link href="/">Back home</Link>
      </p>
    </main>
  );
}
