import { SiteHeader } from "../../../components/Chrome.jsx";
import PaperclipLoop from "./PaperclipLoop.jsx";
import "../economy.css";

export const metadata = { title: "The paperclip loop" };

// The page is a frame; the game, and its tuning values, are in PaperclipLoop.jsx.
export default function PaperclipLoopPage() {
  return (
    <>
      <SiteHeader />
      <main id="main" className="eco-shell">
        <PaperclipLoop />
      </main>
    </>
  );
}
