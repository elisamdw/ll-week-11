import Link from "next/link";
import { redirect } from "next/navigation";
import { nanoid } from "nanoid";
import "./paperclips.css";

export const metadata = { title: "Paperclips" };

async function createGame() {
  "use server";
  const id = nanoid(8).toLowerCase().replace(/[^a-z0-9]/g, "a");
  redirect(`/paperclips/${id}`);
}

export default function PaperclipsLanding() {
  return (
    <main className="pc-landing">
      <h1>Paperclips</h1>
      <p>
        You run a paperclip factory. Make clips, sell them, buy wire, buy autoclippers.
        Every ninety seconds, the whole room votes on the next piece of{" "}
        <em>shared infrastructure</em> — whatever wins reshapes everyone's game.
      </p>
      <form action={createGame}>
        <button type="submit" className="pc-cta">New room</button>
      </form>
      <p className="pc-fine">
        Up to eight players. One tab per player. Share the URL to invite.
      </p>
      <p className="pc-fine">
        <Link href="/">Back home</Link>
      </p>
    </main>
  );
}
