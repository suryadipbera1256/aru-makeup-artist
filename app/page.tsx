import { AgeroHero } from "@/components/sections/AgeroHero";
import { Marquee } from "@/components/ui/Marquee";

/** Services / credentials ticker — seeded now, Supabase-driven later. */
const MARQUEE = [
  "Bridal Makeup",
  "Editorial",
  "Hair Styling",
  "Full-Body",
  "Photoshoot",
  "10+ Years",
  "Award-Winning",
];

export default function Home() {
  return (
    <main className="relative">
      {/* Page-wide subtle grain for the editorial paper feel */}
      <div className="grain pointer-events-none fixed inset-0 z-50 opacity-[0.035]" />

      <AgeroHero />

      <Marquee items={MARQUEE} duration={30} />

      <footer className="border-t border-ink-950/10 px-6 py-12 text-center font-mono text-xs uppercase tracking-[0.3em] text-ink-400">
        AURA — Agero-style preview
      </footer>
    </main>
  );
}
