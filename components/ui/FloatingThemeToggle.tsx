"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

/**
 * FloatingThemeToggle
 * -------------------
 * The theme switch, lifted out of the nav and mounted as a fixed bottom-center
 * control (per the reference). An IntersectionObserver watches the footer and
 * fades the toggle out once the footer enters view, so it never overlaps the
 * dark footer.
 */
export function FloatingThemeToggle() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const footer = document.getElementById("footer");
    if (!footer) return;
    const io = new IntersectionObserver(
      ([entry]) => setHidden(entry.isIntersecting),
      { threshold: 0.05 },
    );
    io.observe(footer);
    return () => io.disconnect();
  }, []);

  return (
    <motion.div
      animate={{ opacity: hidden ? 0 : 1, y: hidden ? 16 : 0 }}
      transition={{ duration: 0.3 }}
      style={{ pointerEvents: hidden ? "none" : "auto" }}
      className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2"
    >
      <ThemeToggle />
    </motion.div>
  );
}
