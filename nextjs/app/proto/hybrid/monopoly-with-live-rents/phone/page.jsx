import Phone from "../Phone.jsx";
import "../../hybrid.css";

export const metadata = { title: "Rents" };

// /proto/hybrid/monopoly-with-live-rents/phone?room=<code>: a player's phone. No site header: the screen is all rents.
export default function Page() {
  return (
    <main id="main" className="hy-shell hy-phone">
      <Phone />
    </main>
  );
}
