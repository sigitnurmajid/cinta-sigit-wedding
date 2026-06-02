import type { Metadata } from "next";
import { Pinyon_Script, Italiana, Cormorant_Garamond, Inter } from "next/font/google";
import Nav from "@/components/Nav";
import "./globals.css";

const pinyon = Pinyon_Script({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-pinyon",
});

const italiana = Italiana({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-italiana",
});

const cormorant = Cormorant_Garamond({
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-cormorant",
});

const inter = Inter({
  weight: ["300", "400", "500"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

// The public URL of the site — needed so share images resolve to absolute
// URLs (WhatsApp/Facebook/Twitter can't fetch relative paths). Override with
// NEXT_PUBLIC_SITE_URL in the environment if the domain changes.
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://cintasigit.family";
const title = "The Wedding of Sigit & Cinta";
const description = "21 June 2026 · Gedung Heroes, Bandung Barat — with joy, we invite you to celebrate with us.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: title,
    title,
    description,
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: "Sigit & Cinta",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og.jpg"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${pinyon.variable} ${italiana.variable} ${cormorant.variable} ${inter.variable}`}>
      <body>
        <Nav />
        {children}
      </body>
    </html>
  );
}
