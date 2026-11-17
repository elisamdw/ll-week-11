import Audience from "../Audience.jsx";
import "../../hybrid.css";

export const metadata = { title: "The audience" };

// /proto/hybrid/the-audience-layer/phone?room=<code>: an audience member's phone. No site header.
export default function Page() {
  return (
    <main id="main" className="hy-shell hy-phone">
      <Audience />
    </main>
  );
}
