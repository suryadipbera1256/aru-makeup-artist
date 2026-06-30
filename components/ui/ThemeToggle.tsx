"use client";

import { motion } from "framer-motion";
import { useTheme } from "@/components/providers/ThemeProvider";

/**
 * ThemeToggle
 * -----------
 * A pill switch whose knob springs across on toggle (snappy spring), swapping
 * sun/moon. Mirrors Portavia's light/dark control.
 */
export function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
      className="relative flex h-8 w-14 items-center rounded-full border border-line bg-card px-1"
    >
      <motion.span
        layout
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className={`flex h-6 w-6 items-center justify-center rounded-full ${
          isDark ? "ml-auto bg-lime text-ink" : "mr-auto bg-accent text-accent-fg"
        }`}
      >
        {isDark ? (
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor">
            <path d="M21 12.8A9 9 0 1111.2 3 7 7 0 0021 12.8z" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor">
            <path d="M12 17a5 5 0 100-10 5 5 0 000 10zm0-13V1m0 22v-3m8-8h3M1 12h3m13.7 6.3l2 2M3.3 3.3l2 2m12.4 0l2-2M3.3 20.7l2-2" />
          </svg>
        )}
      </motion.span>
    </button>
  );
}
