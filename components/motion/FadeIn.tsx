"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { revealUp } from "@/lib/motion/springs";

type FadeInProps = HTMLMotionProps<"div"> & {
  /** Re-trigger every time it scrolls into view instead of once. */
  repeat?: boolean;
};

/**
 * FadeIn
 * ------
 * Reveals its children on scroll using the shared `revealUp` spring variant.
 * `whileInView` + `viewport.once` means the work happens only when visible and
 * (by default) only once, so off-screen sections cost nothing.
 */
export function FadeIn({ children, repeat = false, ...rest }: FadeInProps) {
  return (
    <motion.div
      variants={revealUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: !repeat, margin: "-12% 0px" }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
