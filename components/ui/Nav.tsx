"use client";

import { useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";

const LINKS = [
  { label: "Home", href: "#top" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#work" },
  { label: "Blogs", href: "#insights" },
];

/**
 * Nav
 * ---
 * Scroll-aware morphing navbar. Scrolling DOWN past a threshold collapses it to
 * a compact "Available for work" pill (logo + pulsing green dot); scrolling UP
 * (or near the top) restores the full menu. Theme control now lives in the
 * floating bottom-center toggle, so it is not duplicated here.
 */
export function Nav() {
  const { scrollY } = useScroll();
  const [compact, setCompact] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    if (y > 140 && y > prev) setCompact(true);
    else if (y < prev || y < 80) setCompact(false);
  });

  return (
    <header className="fixed inset-x-0 top-5 z-40 flex justify-center px-4">
      <motion.nav
        layout
        transition={{ type: "spring", stiffness: 320, damping: 30 }}
        className="flex items-center gap-1 rounded-full border border-line bg-card/80 p-1.5 pl-2 backdrop-blur-md"
      >
        <span
          aria-hidden
          className="h-8 w-8 shrink-0 rounded-full bg-gradient-to-br from-accent to-green-deep"
        />
        <AnimatePresence mode="popLayout" initial={false}>
          {compact ? (
            <motion.div
              key="compact"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2 px-2 text-sm font-medium text-fg"
            >
              Available for work
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-70" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent" />
              </span>
            </motion.div>
          ) : (
            <motion.div
              key="full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-1"
            >
              <ul className="hidden items-center sm:flex">
                {LINKS.map((l) => (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      className="rounded-full px-3 py-1.5 text-sm font-medium text-muted transition-colors hover:bg-bg hover:text-fg"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
              <a
                href="#contact"
                className="rounded-full bg-fg px-4 py-1.5 text-sm font-medium text-bg transition-opacity hover:opacity-90"
              >
                Contact
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </header>
  );
}
