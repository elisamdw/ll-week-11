import { SiteHeader } from "../../../components/Chrome.jsx";
import PricesThatMove from "./PricesThatMove.jsx";
import "../economy.css";

export const metadata = { title: "Prices that move" };

// The page is a frame; the game, and its tuning values, are in PricesThatMove.jsx.
export default function PricesThatMovePage() {
  return (
    <>
      <SiteHeader />
      <main id="main" className="eco-shell">
        <PricesThatMove />
      </main>
    </>
  );
}
