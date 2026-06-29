import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import "./globals.css";

/** Modern grotesque display — bold, tight, editorial (Agero-style headlines). */
const display = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

/** Neutral UI sans for body + controls. */
const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

/** Mono for technical accents / labels. */
const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "AURA — Premium Makeup Artistry",
  description:
    "Bridal, editorial and full-body makeup artistry. Book your date.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${sans.variable} ${mono.variable}`}
    >
      <body>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
