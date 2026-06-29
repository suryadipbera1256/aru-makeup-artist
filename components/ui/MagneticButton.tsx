"use client";

import { type ReactNode, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { springs } from "@/lib/motion/springs";

type MagneticButtonProps = {
  children: ReactNode;
  onClick?: () => void;
  /** How strongly the button is pulled toward the cursor (0–1). */
  strength?: number;
  className?: string;
};

/**
 * MagneticButton
 * --------------
 * The button tracks the cursor while hovered: we measure the pointer offset
 * from the button's centre and feed it through a snappy spring, so the element
 * "leans" toward the cursor and springs back on exit. Raw motion values are
 * used (not React state) to keep this off the render path — pointer movement
 * never triggers a re-render.
 */
export function MagneticButton({
  children,
  onClick,
  strength = 0.4,
  className = "",
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, springs.snappy);
  const sy = useSpring(y, springs.snappy);

  const handleMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    x.set(relX * strength);
    y.set(relY * strength);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      type="button"
      onClick={onClick}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ x: sx, y: sy }}
      whileTap={{ scale: 0.96 }}
      className={`group relative inline-flex items-center justify-center gap-2 rounded-full px-8 py-3.5 font-sans text-sm font-medium tracking-wide text-paper-50 ${className}`}
    >
      <span className="absolute inset-0 rounded-full bg-ink-950 transition-colors duration-300 group-hover:bg-clay-600" />
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </motion.button>
  );
}
