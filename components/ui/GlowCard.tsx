"use client";

import { type ReactNode, useRef } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { springs } from "@/lib/motion/springs";

type GlowCardProps = {
  title: string;
  description: string;
  /** e.g. price or a short meta label rendered in mono. */
  meta?: string;
  icon?: ReactNode;
  className?: string;
};

/**
 * GlowCard
 * --------
 * A glass service card with a cursor-following spotlight. Two motion values
 * track the pointer; `useMotionTemplate` composes them live into a radial
 * gradient mask — again driven without React state so the glow follows the
 * cursor at native framerate. Hover lift uses the snappy spring.
 */
export function GlowCard({
  title,
  description,
  meta,
  icon,
  className = "",
}: GlowCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    mx.set(e.clientX - rect.left);
    my.set(e.clientY - rect.top);
  };

  /** Live radial highlight positioned at the cursor. */
  const spotlight = useMotionTemplate`radial-gradient(22rem 22rem at ${mx}px ${my}px, color-mix(in oklab, var(--color-cyan-400) 18%, transparent), transparent 70%)`;

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      whileHover={{ y: -6, transition: springs.snappy }}
      className={`glass group relative overflow-hidden rounded-3xl border border-mist-700/40 p-7 ${className}`}
    >
      {/* Cursor spotlight layer */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: spotlight }}
      />
      <div className="relative z-10">
        {icon && (
          <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-ink-700 text-cyan-400 ring-1 ring-cyan-400/20">
            {icon}
          </div>
        )}
        <h3 className="font-display text-2xl font-medium text-mist-50">
          {title}
        </h3>
        <p className="mt-2 max-w-prose text-sm leading-relaxed text-mist-300">
          {description}
        </p>
        {meta && (
          <p className="mt-5 font-mono text-xs uppercase tracking-[0.2em] text-cyan-300">
            {meta}
          </p>
        )}
      </div>
    </motion.div>
  );
}
