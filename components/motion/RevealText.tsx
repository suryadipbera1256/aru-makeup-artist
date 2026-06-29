"use client";

import { motion } from "framer-motion";
import { springs } from "@/lib/motion/springs";

type RevealTextProps = {
  text: string;
  className?: string;
  /** Seconds between each word rising into place. */
  stagger?: number;
  /** Render element — defaults to an h1-sized display line. */
  as?: "h1" | "h2" | "p";
};

const word = {
  hidden: { y: "110%", opacity: 0 },
  visible: { y: "0%", opacity: 1, transition: springs.cinematic },
};

/**
 * RevealText
 * ----------
 * Splits a headline into words, each masked behind `overflow-hidden` and sprung
 * up from below on a stagger. The mask + per-word spring produces the classic
 * "type rises out of the page" editorial reveal without a typography library.
 */
export function RevealText({
  text,
  className,
  stagger = 0.06,
  as = "h1",
}: RevealTextProps) {
  const MotionTag = motion[as];
  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ staggerChildren: stagger }}
      aria-label={text}
    >
      {text.split(" ").map((w, i) => (
        <span
          key={`${w}-${i}`}
          className="inline-block overflow-hidden align-bottom"
          aria-hidden
        >
          <motion.span variants={word} className="inline-block pr-[0.25em]">
            {w}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
}
