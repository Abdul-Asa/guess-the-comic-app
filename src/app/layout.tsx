import './globals.css'
import { Inter } from 'next/font/google'
import favicon from "./favicon.ico";
import { ThemeProvider } from "./theme-provider";
const inter = Inter({ subsets: ["latin"] });

const meta = {
  title: "Guess the comic",
  description: "Big webcomic fan? Come and test out your skills",
  cardImage: "/download.jpeg",
  robots: "follow, index",
  favicon: "/favicon.ico",
  url: "https://my-app-sand-ten.vercel.app/",
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
  openGraph: {
    url: meta.url,
    title: meta.title,
    description: meta.description,
    cardImage: meta.cardImage,
    type: meta.type,
    site_name: meta.title,
  },
  twitter: {
    card: "summary_large_image",
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
      <body
        className={`${inter.className} bg-slate-50 dark:bg-[#0d1117] duration-500`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <main>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
