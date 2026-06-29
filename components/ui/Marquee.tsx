"use client";

import { motion } from "framer-motion";

type MarqueeProps = {
  items: string[];
  /** Seconds for one full loop. Higher = slower. */
  duration?: number;
  /** Scroll direction. */
  direction?: "left" | "right";
  className?: string;
};

/**
 * Marquee
 * -------
 * Seamless infinite ticker (Agero's services/credentials strip). The track
 * renders the items twice and animates x by exactly -50%, so the moment the
 * first copy scrolls out, the second is pixel-aligned to take its place — no
 * visible jump. We use a linear tween here (not a spring): constant velocity is
 * the whole point of a ticker, and a spring would ease in/out and break the
 * loop. Animation pauses on hover for readability.
 */
export function Marquee({
  items,
  duration = 28,
  direction = "left",
  className = "",
}: MarqueeProps) {
  const from = direction === "left" ? "0%" : "-50%";
  const to = direction === "left" ? "-50%" : "0%";

  return (
    <div
      className={`group relative flex overflow-hidden border-y border-ink-950/10 py-5 ${className}`}
    >
      <motion.div
        className="flex shrink-0 items-center gap-10 pr-10 group-hover:[animation-play-state:paused]"
        animate={{ x: [from, to] }}
        transition={{ duration, ease: "linear", repeat: Infinity }}
      >
        {/* Two identical copies create the seamless wrap. */}
        {[0, 1].map((copy) => (
          <div
            key={copy}
            aria-hidden={copy === 1}
            className="flex shrink-0 items-center gap-10 pr-10"
          >
            {items.map((item, i) => (
              <span key={`${copy}-${i}`} className="flex items-center gap-10">
                <span className="font-display text-lg font-medium tracking-tight text-ink-800 whitespace-nowrap">
                  {item}
                </span>
                {/* clay flower-style separator */}
                <span className="text-clay-500" aria-hidden>
                  ✦
                </span>
              </span>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
