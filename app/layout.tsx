import type { Metadata } from "next";
import { Antonio, Inter, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { FloatingThemeToggle } from "@/components/ui/FloatingThemeToggle";
import { NoiseBackground } from "@/components/ui/NoiseBackground";
import { AmbientBackground } from "@/components/ui/AmbientBackground";
import "./globals.css";

const display = Antonio({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});
const sans = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Arunima Mondal — Makeup Artist & Hair Stylist",
  description: "Kolkata-based makeup artist and hair stylist. Book your date.",
};

const noFlash = `(function(){try{var t=localStorage.getItem('theme');var d=t?t==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;if(d)document.documentElement.classList.add('dark');}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${display.variable} ${sans.variable} ${mono.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: noFlash }} />
      </head>
      <body>
        <ThemeProvider>
          {/* Theme-specific backgrounds (behind all content) */}
          <AmbientBackground />
          <NoiseBackground />
          <CustomCursor />
          <SmoothScroll>
            <div className="relative z-10">{children}</div>
          </SmoothScroll>
          <FloatingThemeToggle />
        </ThemeProvider>
      </body>
    </html>
  );
}
