import Phone from "../Phone.jsx";
import "../../players.css";

export const metadata = { title: "Your goal" };

// /proto/players/private-goals/phone?room=<code>: one player's phone. No site header, so the phone screen is all game.
export default function PrivateGoalsPhonePage() {
  return (
    <main id="main" className="pi-phone-shell">
      <Phone />
    </main>
  );
}
