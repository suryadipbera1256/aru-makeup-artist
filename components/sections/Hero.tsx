"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { RevealText } from "@/components/motion/RevealText";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { springs } from "@/lib/motion/springs";

/**
 * Hero
 * ----
 * The cinematic opener. A single scroll progress drives three layers at
 * different rates (classic depth parallax):
 *   • the headline drifts up + fades fastest,
 *   • the ambient glow scales and recedes,
 *   • a "data-stream" grid sinks slowly behind everything.
 * Because all transforms derive from one `useScroll`, they stay frame-locked
 * to the scrollbar with zero layout thrash.
 */
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const contentY = useTransform(scrollYProgress, [0, 1], [0, -160]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const gridY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const glowScale = useTransform(scrollYProgress, [0, 1], [1, 1.6]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-6"
    >
      {/* Layer 1 — receding data-stream grid */}
      <motion.div
        aria-hidden
        style={{ y: gridY }}
        className="pointer-events-none absolute inset-0 opacity-[0.12]"
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(var(--color-cyan-400) 1px, transparent 1px), linear-gradient(90deg, var(--color-cyan-400) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
            maskImage:
              "radial-gradient(60% 60% at 50% 40%, black, transparent)",
          }}
        />
      </motion.div>

      {/* Layer 2 — ambient cyan glow that scales away on scroll */}
      <motion.div
        aria-hidden
        style={{ scale: glowScale }}
        className="pointer-events-none absolute left-1/2 top-1/2 h-[40rem] w-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/20 blur-[120px]"
      />

      {/* Layer 3 — headline + CTA */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 mx-auto max-w-4xl text-center"
      >
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...springs.smooth, delay: 0.2 }}
          className="mb-6 font-mono text-xs uppercase tracking-[0.4em] text-cyan-300"
        >
          Bridal · Editorial · Couture
        </motion.p>

        <RevealText
          as="h1"
          text="Beauty, engineered into art."
          className="font-display text-[length:var(--text-hero)] font-light leading-[0.95] text-mist-50"
        />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ ...springs.smooth, delay: 0.7 }}
          className="mx-auto mt-7 max-w-xl text-balance text-base leading-relaxed text-mist-300"
        >
          A premium makeup studio where precision meets imagination. Curate your
          look, check live availability, and book your transformation.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...springs.smooth, delay: 0.85 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <MagneticButton>Book a session →</MagneticButton>
          <button className="rounded-full px-6 py-3.5 text-sm text-mist-300 transition-colors hover:text-mist-50">
            View portfolio
          </button>
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        aria-hidden
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.3em] text-mist-500"
      >
        Scroll
      </motion.div>
    </section>
  );
}
