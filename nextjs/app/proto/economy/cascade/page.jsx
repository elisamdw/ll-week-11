import { SiteHeader } from "../../../components/Chrome.jsx";
import Cascade from "./Cascade.jsx";
import "../economy.css";

export const metadata = { title: "Cascade" };

// The page is a frame; the game, and its tuning values, are in Cascade.jsx.
export default function CascadePage() {
  return (
    <>
      <SiteHeader />
      <main id="main" className="eco-shell">
        <Cascade />
      </main>
    </>
  );
}
