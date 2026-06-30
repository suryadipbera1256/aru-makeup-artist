"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";

/**
 * CustomCursor
 * ------------
 * Precise dot + lagging ring. Two extra behaviours from the spec:
 *  - `hovering` grows the ring over interactive elements.
 *  - `active` mode: clicking a category ([data-category]) switches the cursor
 *    into a filled, labelled "viewing" state; clicking anywhere else resets it.
 * Pointer tracking uses raw motion values (no re-render); only the discrete
 * hover/active states use React state. Disabled for touch / reduced-motion.
 */
export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [active, setActive] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 350, damping: 28, mass: 0.4 });
  const ringY = useSpring(y, { stiffness: 350, damping: 28, mass: 0.4 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;
    setEnabled(true);
    document.documentElement.classList.add("cursor-none");

    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const over = (e: PointerEvent) => {
      const t = e.target as HTMLElement | null;
      setHovering(!!t?.closest("a,button,input,textarea,select,[data-cursor='hover']"));
    };
    const click = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      setActive(!!t?.closest("[data-category]"));
    };
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerover", over, { passive: true });
    window.addEventListener("click", click);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
      window.removeEventListener("click", click);
      document.documentElement.classList.remove("cursor-none");
    };
  }, [x, y]);

  if (!enabled) return null;
  return (
    <>
      {/* exact dot */}
      <motion.div
        aria-hidden
        animate={{ opacity: active ? 0 : 1 }}
        style={{ left: x, top: y }}
        className="pointer-events-none fixed z-[100] h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent"
      />
      {/* lagging ring / active blob */}
      <motion.div
        aria-hidden
        animate={{ scale: active ? 1 : hovering ? 1.9 : 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        style={{ left: ringX, top: ringY }}
        className={`pointer-events-none fixed z-[100] flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full ${
          active
            ? "h-16 w-16 bg-accent text-accent-fg"
            : "h-8 w-8 border border-accent/70"
        }`}
      >
        <AnimatePresence>
          {active && (
            <motion.span
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              className="font-mono text-[10px] font-semibold uppercase tracking-tight"
            >
              View
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
