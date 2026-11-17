import Phone from "../Phone.jsx";
import "../../players.css";

export const metadata = { title: "Place to commit" };

// /proto/players/place-to-commit/phone?room=<code>: one player's phone.
export default function PlaceToCommitPhonePage() {
  return (
    <main id="main" className="pi-phone-shell">
      <Phone />
    </main>
  );
}
