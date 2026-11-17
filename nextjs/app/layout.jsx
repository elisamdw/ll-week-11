import "@fontsource-variable/inter";
import "./globals.css";

export const metadata = {
  title: { default: "Learning Lab week 11", template: "%s · Learning Lab week 11" },
  description: "Learning Lab week 11 (ending November 20, 2026): games and interaction.",
};

export const viewport = {
  colorScheme: "dark",
  themeColor: "#121412",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main">Skip to content</a>
        {children}
      </body>
    </html>
  );
}
