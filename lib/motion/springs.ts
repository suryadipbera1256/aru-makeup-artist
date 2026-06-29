import type { Transition, Variants } from "framer-motion";

/**
 * Central spring vocabulary.
 * ---------------------------
 * Every motion in the app pulls from these presets so timing feels coherent.
 * We favour spring physics over duration easing: springs respond to velocity,
 * so interrupted/redirected gestures resolve naturally instead of snapping.
 */
export const springs = {
  /** Default UI spring — confident settle, almost no overshoot. */
  smooth: { type: "spring", stiffness: 100, damping: 15 } as Transition,
  /** Snappy spring for buttons / cursor-magnet feedback. */
  snappy: { type: "spring", stiffness: 300, damping: 22, mass: 0.6 } as Transition,
  /** Heavy, cinematic spring for large reveals and hero elements. */
  cinematic: { type: "spring", stiffness: 60, damping: 18, mass: 1.1 } as Transition,
  /** Tiny playful bounce for micro-interactions (icons, badges). */
  bouncy: { type: "spring", stiffness: 400, damping: 12 } as Transition,
} as const;

/** Distance (px) elements travel when revealing. Kept subtle for elegance. */
export const REVEAL_OFFSET = 28;

/**
 * Reveal variants for a single element entering from below.
 * `transition` uses the cinematic spring so big content arrives with weight.
 */
export const revealUp: Variants = {
  hidden: { opacity: 0, y: REVEAL_OFFSET },
  visible: {
    opacity: 1,
    y: 0,
    transition: springs.cinematic,
  },
};

/**
 * Stagger container variants.
 * `staggerChildren` cascades children; `delayChildren` lets a parent element
 * (e.g. a heading) land first before the list begins.
 */
export const staggerContainer = (
  stagger = 0.08,
  delayChildren = 0.1,
): Variants => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: stagger, delayChildren },
  },
});
