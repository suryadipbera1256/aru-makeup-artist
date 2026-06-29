"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { revealUp, staggerContainer } from "@/lib/motion/springs";

type ContainerProps = HTMLMotionProps<"div"> & {
  /** Seconds between each child's reveal. */
  stagger?: number;
  /** Seconds to wait before the first child reveals. */
  delayChildren?: number;
  repeat?: boolean;
};

/**
 * StaggerContainer
 * ----------------
 * Orchestrates child reveals. It does not animate itself — it only propagates
 * the `visible` state to children on a cascade defined by `staggerChildren`.
 * Pair with <StaggerItem> for grids and lists.
 */
export function StaggerContainer({
  children,
  stagger = 0.08,
  delayChildren = 0.1,
  repeat = false,
  ...rest
}: ContainerProps) {
  return (
    <motion.div
      variants={staggerContainer(stagger, delayChildren)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: !repeat, margin: "-10% 0px" }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

/**
 * StaggerItem
 * -----------
 * A single cascade member. Inherits the parent's orchestration and rides the
 * cinematic spring so each card settles with subtle weight rather than a flat
 * fade.
 */
export function StaggerItem({ children, ...rest }: HTMLMotionProps<"div">) {
  return (
    <motion.div variants={revealUp} {...rest}>
      {children}
    </motion.div>
  );
}
