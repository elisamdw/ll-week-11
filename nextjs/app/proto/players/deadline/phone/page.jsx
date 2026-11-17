import Phone from "../Phone.jsx";
import "../../players.css";

export const metadata = { title: "The deadline" };

// /proto/players/deadline/phone?room=<code>: one player's phone.
export default function DeadlinePhonePage() {
  return (
    <main id="main" className="pi-phone-shell">
      <Phone />
    </main>
  );
}
