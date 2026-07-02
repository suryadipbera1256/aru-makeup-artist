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
