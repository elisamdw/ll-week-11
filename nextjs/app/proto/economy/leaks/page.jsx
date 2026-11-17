import { SiteHeader } from "../../../components/Chrome.jsx";
import Leaks from "./Leaks.jsx";
import "../economy.css";

export const metadata = { title: "Leaks" };

// The page is a frame; the game, and its tuning values, are in Leaks.jsx.
export default function LeaksPage() {
  return (
    <>
      <SiteHeader />
      <main id="main" className="eco-shell">
        <Leaks />
      </main>
    </>
  );
}
