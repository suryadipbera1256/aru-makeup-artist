"use client";

import { useEffect, useState } from "react";
import { motion, type Transition } from "framer-motion";
import { useTheme } from "@/components/providers/ThemeProvider";

/**
 * AmbientBackground
 * -----------------
 * Native port of the Framer "Ambient Background" module — a SwiftUI-style
 * gradient of three soft blobs that drift back and forth and cross-fade colour
 * on infinite mirrored loops, viewed through a heavy blur overlay for that
 * frosted ambient glow. Shown only in light ("white") mode; sits behind page
 * content. Honours prefers-reduced-motion by rendering the blobs static.
 */

const BASE = "#ffffff";
const C1 = "rgba(0, 122, 255, 0.40)";
const C2 = "rgba(175, 82, 222, 0.30)";
const C3 = "rgba(50, 173, 230, 0.30)";
const BLUR = 70;
const SPEED = 1;
const OVERLAY_OPACITY = 0.1;
const COLOR_DURATION = 10;

const blob = "absolute rounded-full opacity-60";

export function AmbientBackground() {
  const { theme } = useTheme();
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  if (theme !== "light") return null;

  const t = (dur: number): Transition => ({
    default: { duration: dur * SPEED, ease: "easeInOut", repeat: Infinity, repeatType: "mirror" },
    backgroundColor: { duration: COLOR_DURATION, ease: "easeInOut", repeat: Infinity, repeatType: "mirror" },
  });

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      style={{ backgroundColor: BASE, isolation: "isolate" }}
    >
      <motion.div
        className={blob}
        style={{ backgroundColor: C1, width: "80%", height: "80%", top: "10%", left: "10%" }}
        animate={reduced ? undefined : { x: [-30, 30], y: [-30, 30], scale: [1, 1.1], backgroundColor: [C1, C2, C3] }}
        transition={t(7)}
      />
      <motion.div
        className={blob}
        style={{ backgroundColor: C2, width: "70%", height: "70%", top: "15%", right: "15%" }}
        animate={reduced ? undefined : { x: [50, -50], y: [100, -20], backgroundColor: [C2, C3, C1] }}
        transition={t(5)}
      />
      <motion.div
        className={blob}
        style={{ backgroundColor: C3, width: "60%", height: "60%", bottom: "10%", left: "20%" }}
        animate={reduced ? undefined : { x: [-20, 80], y: [100, 50], backgroundColor: [C3, C1, C2] }}
        transition={t(6)}
      />
      {/* frosted blur over the blobs */}
      <div
        className="absolute inset-0"
        style={{ backdropFilter: `blur(${BLUR}px)`, WebkitBackdropFilter: `blur(${BLUR}px)` }}
      />
      {/* subtle white wash */}
      <div className="absolute inset-0" style={{ backgroundColor: "rgba(255,255,255,0.5)", opacity: OVERLAY_OPACITY }} />
    </div>
  );
}
