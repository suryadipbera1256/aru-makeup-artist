"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

/**
 * HiWave
 * ------
 * Viewport-aware loop (runs only while `active`):
 *   hand waves -> hand fades out -> big "HI" fades in -> "HI" fades out -> repeat.
 * The wave is a rotation about the wrist; hand/HI swap via AnimatePresence. The
 * hand graphic is the uploaded SVG asset (public/wave-hand.svg).
 */
export function HiWave({
  active = true,
  className = "",
}: {
  active?: boolean;
  className?: string;
}) {
  const [mode, setMode] = useState<"hand" | "hi">("hand");

  useEffect(() => {
    if (!active) return;
    let cancelled = false;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const cycle = () => {
      if (cancelled) return;
      setMode("hand");
      timers.push(setTimeout(() => !cancelled && setMode("hi"), 3200));
      timers.push(setTimeout(cycle, 4800));
    };
    cycle();
    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, [active]);

  return (
    <span
      className={`relative inline-flex h-[120px] w-[120px] items-center justify-center overflow-hidden rounded-full bg-accent text-accent-fg ${className}`}
    >
      <AnimatePresence mode="wait">
        {mode === "hand" ? (
          <motion.span
            key="hand"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.3 }}
          >
            <motion.img
              src="/wave-hand.svg"
              alt=""
              aria-hidden
              className="h-16 w-16"
              style={{ originX: 0.7, originY: 0.9 }}
              animate={{ rotate: [0, 18, -8, 18, 0] }}
              transition={{ duration: 1.1, repeat: Infinity, repeatDelay: 0.5 }}
            />
          </motion.span>
        ) : (
          <motion.span
            key="hi"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.3 }}
            className="display text-4xl"
          >
            Hi
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
}
