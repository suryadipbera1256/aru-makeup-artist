"use client";

import { motion } from "framer-motion";

/** Lime circular arrow button (Portavia accent control). */
export function ArrowButton({ className = "" }: { className?: string }) {
  return (
    <motion.span
      whileHover={{ scale: 1.1, rotate: 45 }}
      transition={{ type: "spring", stiffness: 300, damping: 18 }}
      className={`inline-flex h-12 w-12 items-center justify-center rounded-full bg-lime text-ink ${className}`}
      aria-hidden
    >
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.2">
        <path d="M7 17L17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </motion.span>
  );
}
