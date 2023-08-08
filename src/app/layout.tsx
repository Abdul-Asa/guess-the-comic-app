import "./globals.css";
import "../styles/font.css";
import { ThemeProvider } from "./theme-provider";
import Client from "./animate-wrapper";
import cardImage from "../../public/download.jpeg";
const meta = {
  title: "Guess the comic",
  description: "Big webcomic fan? Come and test out your skills",
  cardImage: cardImage,
  robots: "follow, index",
  favicon: "/favicon.ico",
  url: "https://my-app-sand-ten.vercel.app/",
  type: "website",
};
export const metadata = {
  title: meta.title,
  description: meta.description,
  cardImage: cardImage,
  robots: meta.robots,
  favicon: meta.favicon,
  url: meta.url,
  type: meta.type,
  openGraph: {
    url: meta.url,
    title: meta.title,
    description: meta.description,
    cardImage: cardImage,
    type: meta.type,
    site_name: meta.title,
  },
  twitter: {
    card: "summary_large_image",
    site: "@AbdullahShehu1",
    title: meta.title,
    description: meta.description,
    cardImage: cardImage,
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
          <Client>{children}</Client>
        </ThemeProvider>
      </body>
    </html>
  );
}
