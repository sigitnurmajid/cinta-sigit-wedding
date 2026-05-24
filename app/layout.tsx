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
  weight: ["300", "400", "500"],
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

export const metadata: Metadata = {
  title: "Sigit & Cinta — The Wedding",
  description: "21 June 2026 · Gedung Heroes, Bandung Barat",
  openGraph: {
    title: "Sigit & Cinta — The Wedding",
    description: "21 June 2026 · Gedung Heroes, Bandung Barat",
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
