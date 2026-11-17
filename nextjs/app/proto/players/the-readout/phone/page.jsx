import Phone from "../Phone.jsx";
import "../../players.css";

export const metadata = { title: "The readout" };

// /proto/players/the-readout/phone?room=<code>: one player's phone.
export default function ReadoutPhonePage() {
  return (
    <main id="main" className="pi-phone-shell">
      <Phone />
    </main>
  );
}
