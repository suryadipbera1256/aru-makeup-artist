"use client";

import { type ReactNode, useEffect } from "react";
import Lenis from "lenis";

/**
 * SmoothScroll
 * ------------
 * Wraps the app in a Lenis-driven inertial scroll. We deliberately use a low
 * `lerp` (linear-interpolation factor) so momentum feels weighty and premium
 * rather than floaty. Lenis also feeds the rAF loop that Framer Motion's
 * `useScroll` reads, keeping scroll-linked animations perfectly in sync.
 *
 * Disabled automatically for users with `prefers-reduced-motion`.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) return;

    const lenis = new Lenis({
      lerp: 0.09, // lower = heavier, more luxurious momentum
      smoothWheel: true,
    });

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
