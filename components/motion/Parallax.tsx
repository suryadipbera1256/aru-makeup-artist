"use client";

import { type ReactNode, useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

type ParallaxProps = {
  children: ReactNode;
  /**
   * Travel distance in px across the element's scroll lifetime.
   * Positive = moves down slower than scroll (recedes); negative = rises.
   */
  distance?: number;
  className?: string;
};

/**
 * Parallax
 * --------
 * Scroll-linked vertical drift. `useScroll` reports 0→1 progress as the element
 * passes through the viewport; `useTransform` maps that to a Y offset. We pass
 * the mapped value through `useSpring` so the parallax has a touch of inertia
 * and never feels mechanically pinned to the scrollbar.
 */
export function Parallax({
  children,
  distance = 80,
  className,
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const raw = useTransform(scrollYProgress, [0, 1], [-distance, distance]);
  const y = useSpring(raw, { stiffness: 80, damping: 20, mass: 0.5 });

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}
