"use client";

import { motion, type Variants } from "framer-motion";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { springs } from "@/lib/motion/springs";

/**
 * A headline token is either a word or an inline "media chip". Interleaving
 * chips inside the H1 is Agero's signature move — it turns a plain headline
 * into a composed, designed object.
 */
type HeroToken =
  | { kind: "word"; value: string }
  | { kind: "chip"; variant: "portrait-a" | "portrait-b" | "spark" };

const HEADLINE: HeroToken[] = [
  { kind: "word", value: "Timeless" },
  { kind: "chip", variant: "portrait-a" },
  { kind: "word", value: "Bridal" },
  { kind: "word", value: "&" },
  { kind: "word", value: "Editorial" },
  { kind: "word", value: "Makeup" },
  { kind: "chip", variant: "spark" },
  { kind: "word", value: "for" },
  { kind: "word", value: "life's" },
  { kind: "word", value: "biggest" },
  { kind: "chip", variant: "portrait-b" },
  { kind: "word", value: "Moments" },
];

/** Stagger the headline tokens; let them cascade after a tiny lead-in. */
const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05, delayChildren: 0.15 } },
};

/** Each token is masked behind overflow-hidden and sprung up from below. */
const rise: Variants = {
  hidden: { y: "115%" },
  visible: { y: "0%", transition: springs.cinematic },
};

/** Placeholder media chip. Swap the gradient for a Next/Image once portfolio
 *  shots exist (Supabase Storage URLs). Sizes scale with the fluid headline. */
function Chip({ variant }: { variant: "portrait-a" | "portrait-b" | "spark" }) {
  if (variant === "spark") {
    return (
      <span className="mx-[0.15em] inline-flex h-[0.7em] w-[0.7em] translate-y-[0.08em] items-center justify-center rounded-full bg-clay-500 align-middle text-paper-50">
        <svg viewBox="0 0 24 24" className="h-[55%] w-[55%]" fill="currentColor">
          <path d="M12 0l2.4 9.6L24 12l-9.6 2.4L12 24l-2.4-9.6L0 12l9.6-2.4z" />
        </svg>
      </span>
    );
  }
  const tone =
    variant === "portrait-a"
      ? "from-clay-300 to-clay-500"
      : "from-paper-300 to-ink-400";
  return (
    <span
      aria-hidden
      className={`mx-[0.12em] inline-block h-[0.78em] w-[1.5em] translate-y-[0.12em] rounded-[0.3em] bg-gradient-to-br align-middle ${tone} ring-1 ring-ink-950/10`}
    />
  );
}

/**
 * AgeroHero
 * ---------
 * The minimal-editorial opener: status pill, social-proof avatar stack, a
 * mixed media+text headline that reveals on a stagger, one primary CTA, and a
 * full-bleed banner. All motion derives from the shared spring vocabulary.
 */
export function AgeroHero() {
  return (
    <section className="relative mx-auto max-w-6xl px-6 pt-32 pb-16 text-center">
      {/* Status pill */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={springs.smooth}
        className="chip mx-auto inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium text-ink-600"
      >
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-clay-500 opacity-70" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-clay-500" />
        </span>
        Available for 2026 dates
      </motion.div>

      {/* Social proof */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ ...springs.smooth, delay: 0.1 }}
        className="mt-8 flex items-center justify-center gap-3"
      >
        <div className="flex -space-x-3">
          {["from-clay-300 to-clay-500", "from-paper-300 to-ink-400", "from-clay-500 to-ink-800"].map(
            (g, i) => (
              <span
                key={i}
                className={`h-9 w-9 rounded-full bg-gradient-to-br ${g} ring-2 ring-paper-100`}
                aria-hidden
              />
            ),
          )}
        </div>
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-ink-500">
          Trusted by 200+ brides
        </p>
      </motion.div>

      {/* Mixed media + text headline */}
      <motion.h1
        variants={container}
        initial="hidden"
        animate="visible"
        aria-label="Timeless bridal and editorial makeup for life's biggest moments"
        className="font-display mx-auto mt-10 max-w-5xl text-[length:var(--text-hero)] font-medium leading-[0.98] text-ink-950"
      >
        {HEADLINE.map((token, i) =>
          token.kind === "word" ? (
            <span
              key={i}
              className="inline-flex overflow-hidden align-bottom"
              aria-hidden
            >
              <motion.span variants={rise} className="inline-block pr-[0.22em]">
                {token.value}
              </motion.span>
            </span>
          ) : (
            <span
              key={i}
              className="inline-flex overflow-hidden align-middle"
              aria-hidden
            >
              <motion.span variants={rise} className="inline-block pr-[0.18em]">
                <Chip variant={token.variant} />
              </motion.span>
            </span>
          ),
        )}
      </motion.h1>

      {/* Sub-copy */}
      <motion.p
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...springs.smooth, delay: 0.7 }}
        className="mx-auto mt-8 max-w-xl text-balance text-base leading-relaxed text-ink-500"
      >
        A premium makeup studio for weddings, editorial and the camera. Curate
        your look, check live availability, and book your date — no back and
        forth.
      </motion.p>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...springs.smooth, delay: 0.8 }}
        className="mt-10 flex flex-wrap items-center justify-center gap-4"
      >
        <MagneticButton>Book your date →</MagneticButton>
        <a
          href="#works"
          className="rounded-full px-6 py-3.5 text-sm font-medium text-ink-600 underline-offset-4 transition-colors hover:text-ink-950 hover:underline"
        >
          View portfolio
        </a>
      </motion.div>

      {/* Full-bleed banner */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ ...springs.cinematic, delay: 0.5 }}
        className="card-soft relative mt-16 aspect-[16/8] w-full overflow-hidden rounded-[1.75rem]"
      >
        {/* Replace with a hero portrait <Image>. Gradient = tasteful placeholder. */}
        <div className="absolute inset-0 bg-gradient-to-br from-paper-300 via-clay-300 to-ink-400" />
        <div className="grain pointer-events-none absolute inset-0 opacity-[0.18] mix-blend-overlay" />
        <span className="absolute bottom-5 left-6 font-mono text-xs uppercase tracking-[0.2em] text-paper-50/90">
          Studio · Bridal · Editorial
        </span>
      </motion.div>
    </section>
  );
}
