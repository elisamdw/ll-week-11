import { SiteHeader } from "../../../components/Chrome.jsx";
import TheRace from "./TheRace.jsx";
import "../economy.css";

export const metadata = { title: "The race" };

// The page is a frame; the game, and its tuning values, are in TheRace.jsx.
export default function TheRacePage() {
  return (
    <>
      <SiteHeader />
      <main id="main" className="eco-shell">
        <TheRace />
      </main>
    </>
  );
}
