"use client";

import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

type TiltCardProps = {
  children: ReactNode;
  className?: string;
  /** Max rotation in degrees on each axis. */
  max?: number;
};

/**
 * TiltCard
 * --------
 * 3D perspective tilt toward the pointer (Portavia's "3D transforms"). Pointer
 * position is normalised to 0–1, smoothed by a spring, then mapped to rotateX/Y.
 * Perspective lives on the wrapper so the child's rotation renders in real depth;
 * the spring makes the tilt feel physical and settle gently on exit.
 */
export function TiltCard({ children, className = "", max = 9 }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const sx = useSpring(px, { stiffness: 200, damping: 18 });
  const sy = useSpring(py, { stiffness: 200, damping: 18 });
  const rotateY = useTransform(sx, [0, 1], [-max, max]);
  const rotateX = useTransform(sy, [0, 1], [max, -max]);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  };
  const reset = () => {
    px.set(0.5);
    py.set(0.5);
  };

  return (
    <div className={`[perspective:1100px] ${className}`}>
      <motion.div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={reset}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="h-full w-full"
      >
        {children}
      </motion.div>
    </div>
  );
}
