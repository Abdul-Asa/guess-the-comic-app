import "./globals.css";
import "../styles/font.css";
import { ThemeProvider } from "./theme-provider";
import Client from "./animate-wrapper";
import { Analytics } from "@vercel/analytics/react";

const meta = {
  title: "Guess the comic",
  description: "Big webcomic fan? Come and test out your skills",
  cardImage: "/og.png",
  robots: "follow, index",
  favicon: "/favicon.ico",
  url: "https://guess-the-comic.vercel.app/",
  type: "website",
};
export const metadata = {
  title: meta.title,
  description: meta.description,
  cardImage: meta.cardImage,
  robots: meta.robots,
  favicon: meta.favicon,
  url: meta.url,
  type: meta.type,
  metadataBase: new URL("https://guess-the-comic.vercel.app/"),
  openGraph: {
    url: meta.url,
    title: meta.title,
    description: meta.description,
    cardImage: meta.cardImage,
    type: meta.type,
    site_name: meta.title,
  },
  twitter: {
    card: "summary_logo",
    site: "@AbdullahShehu1",
    title: meta.title,
    description: meta.description,
    cardImage: meta.cardImage,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`duration-300`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Client>
            {children}
            <Analytics />
          </Client>
        </ThemeProvider>
      </body>
    </html>
  );
}
