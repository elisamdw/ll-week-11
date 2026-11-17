import Phone from "../Phone.jsx";
import "../../players.css";

export const metadata = { title: "The intent" };

// /proto/players/the-intent/phone?room=<code>: one player's phone.
export default function IntentPhonePage() {
  return (
    <main id="main" className="pi-phone-shell">
      <Phone />
    </main>
  );
}
