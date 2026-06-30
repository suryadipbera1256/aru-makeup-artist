"use client";

import { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useInView,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { HiWave } from "@/components/ui/HiWave";

/**
 * MorphShowcase — exact flip/scroll animation contract.
 * 300vh wrapper (Hero -> Service -> About, each 100vh); the 340x476 card is
 * pinned in a sticky 100vh container. Transform layering avoids scale conflicts:
 *   L0 mount flip-in (scale 0->1, rotateX -180->0, spring 1s, bounce 0)
 *   L1 scroll position (x 0->340, scale 1->0.9, rotateZ 0->10->5)
 *   L2 scroll flip (rotateY 0->150->340). Spring: stiffness 500 / damping 60.
 * The Hi badge lives INSIDE L2, strictly fixed to the image; it fades + scales
 * out across Hero->Service->About and reverses on scroll up.
 */

type Service = { title: string; bullets: string[] };

const SERVICES: Service[] = [
  {
    title: "Bridal Makeup",
    bullets: [
      "Skin prep and long-wear base",
      "HD and airbrush bridal looks",
      "Dupatta setting and touch-up kit",
      "Trial session before the big day",
    ],
  },
  {
    title: "Party & Event Makeup",
    bullets: [
      "Glam evening and cocktail looks",
      "Sangeet and reception makeup",
      "Bold eyes and statement lips",
      "Quick on-location touch-ups",
    ],
  },
  {
    title: "Hair Styling",
    bullets: [
      "Bridal updos, braids and buns",
      "Curls, waves and blowouts",
      "Extensions and volume styling",
      "Sealing for all-day hold",
    ],
  },
  {
    title: "Editorial & Photoshoot",
    bullets: [
      "Camera-ready HD finishing",
      "Concept and avant-garde looks",
      "Full-body, even-tone makeup",
      "On-set touch-up support",
    ],
  },
];

const STATS = [
  { n: "8", l: "Years of Experience" },
  { n: "300+", l: "Completed Projects" },
  { n: "1.2k", l: "Total Clients" },
];

const CONTACT = [
  { label: "Call Today", value: "+91 90000 00000" },
  { label: "Email", value: "hello@aura.studio" },
  { label: "Based in", value: "Kolkata, IN" },
];

const SOCIALS = ["IG", "FB", "X", "SC"];

const HERO_TEXT = { type: "spring", duration: 1, bounce: 0, delay: 0.3 } as const;
const ACCORDION_SPRING = { type: "spring", stiffness: 500, damping: 60, mass: 1 } as const;
const H1 = "font-display font-bold uppercase leading-[1.1em] tracking-[-0.03em] text-fg text-[length:var(--text-hero)]";
const HEADING = "font-display text-[42px] font-bold uppercase leading-[1.3em] text-fg md:text-[48px] lg:text-[60px]";
const PARA = "max-w-[500px] font-sans text-[16px] font-light leading-[1.5em] text-fg lg:text-[18px]";

/** Iconoir-style down arrow. */
function ArrowDown() {
  return (
    <svg viewBox="0 0 24 24" className="h-[30px] w-[30px]" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Iconoir-style check-circle (accent). */
function CheckCircle() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0 text-accent" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <circle cx="12" cy="12" r="9" />
      <path d="M8.5 12.4l2.4 2.4 4.6-5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function MorphShowcase() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const heroInView = useInView(heroRef, { amount: 0.4 });

  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ["start start", "end end"],
  });
  const sp = useSpring(scrollYProgress, { stiffness: 500, damping: 60, mass: 1 });

  const [openRow, setOpenRow] = useState<number | null>(null);

  const x = useTransform(sp, [0, 0.5, 1], [0, 340, 340]);
  const scale = useTransform(sp, [0, 0.5, 1], [1, 0.9, 0.9]);
  const rotateZ = useTransform(sp, [0, 0.5, 1], [0, 10, 5]);
  const rotateY = useTransform(sp, [0, 0.5, 1], [0, 150, 340]);
  const hiOpacity = useTransform(sp, [0, 0.5, 0.8], [1, 0.4, 0]);
  const hiScale = useTransform(sp, [0, 0.5, 0.8], [1, 0.22, 0]);

  return (
    <section id="top" ref={wrapRef} className="relative">
      {/* Sticky 100vh card container (lg+) */}
      <div className="pointer-events-none sticky top-0 hidden h-screen items-center justify-center [perspective:1200px] lg:flex">
        <motion.div
          initial={{ scale: 0, rotateX: -180 }}
          animate={{ scale: 1, rotateX: 0 }}
          transition={{ type: "spring", duration: 1, bounce: 0 }}
          style={{ transformStyle: "preserve-3d" }}
        >
          <motion.div
            style={{ x, scale, rotateZ, transformStyle: "preserve-3d" }}
            className="relative h-[476px] w-[340px]"
          >
            <motion.div style={{ rotateY, transformStyle: "preserve-3d" }} className="absolute inset-0">
              <div className="absolute inset-0 overflow-hidden rounded-[20px] bg-gradient-to-br from-[#2c3324] to-ink ring-1 ring-line [backface-visibility:hidden]">
                <div className="grain absolute inset-0 opacity-[0.15] mix-blend-overlay" />
              </div>
              <div className="absolute inset-0 overflow-hidden rounded-[20px] bg-gradient-to-br from-[#3a2433] to-ink ring-1 ring-line [transform:rotateY(180deg)] [backface-visibility:hidden]">
                <div className="grain absolute inset-0 opacity-[0.15] mix-blend-overlay" />
              </div>
              <motion.div
                style={{ opacity: hiOpacity, scale: hiScale }}
                className="absolute -bottom-6 -left-14 z-10 origin-center [backface-visibility:hidden]"
              >
                <HiWave active={heroInView} />
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      <div className="lg:-mt-[100vh]">
        {/* Scene 1 — Hero (100vh) */}
        <div
          ref={heroRef}
          className="relative mx-auto grid min-h-screen max-w-6xl grid-cols-1 items-center gap-x-6 px-6 lg:grid-cols-[1fr_340px_1fr]"
        >
          <motion.div
            initial={{ opacity: 0, x: 150 }}
            animate={{ opacity: 1, x: 0 }}
            transition={HERO_TEXT}
            className="flex flex-col items-start lg:items-end"
          >
            <div className="flex flex-col items-start">
              <p className="ml-[5px] font-display text-[24px] font-normal uppercase leading-[1.3em] text-fg md:text-[32px]">
                Arunima Mondal
              </p>
              <h1 className={H1}>Makeup</h1>
            </div>
          </motion.div>
          <div aria-hidden className="hidden lg:block" />
          <motion.div
            initial={{ opacity: 0, x: -150 }}
            animate={{ opacity: 1, x: 0 }}
            transition={HERO_TEXT}
            className="flex flex-col items-start"
          >
            <div className="flex flex-col items-start">
              <h1 className={H1}>Artist</h1>
              <p
                style={{ marginLeft: "calc(var(--text-hero) * 0.5)" }}
                className="mt-[11px] max-w-[230px] text-left font-sans text-[18px] font-light leading-[1.5em] text-fg"
              >
                I&apos;m a Kolkata-based makeup artist and hair stylist.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Scene 2 — Service (100vh): 1200/40 container, 600px column, gaps 20/40 */}
        <div id="service" className="relative flex min-h-screen w-full items-center overflow-hidden">
          <div className="mx-auto flex w-full max-w-[1200px] items-center px-10">
            <div className="flex w-full max-w-[600px] flex-col items-start gap-10">
              <div className="flex w-full flex-col items-start gap-5">
                <h2 className={HEADING}>What I can do for you</h2>
                <p className={PARA}>
                  As a makeup artist, I am a visual storyteller, crafting looks
                  that connect deeply and spark confidence.
                </p>
              </div>

              {/* Service Accordion Wrap — click to open one at a time */}
              <ul className="w-full">
                {SERVICES.map((s, i) => {
                  const open = openRow === i;
                  return (
                    <li
                      key={s.title}
                      className={`border-b transition-colors ${open ? "border-accent" : "border-line"}`}
                    >
                      <button
                        type="button"
                        data-category={s.title}
                        aria-expanded={open}
                        onClick={() => setOpenRow(open ? null : i)}
                        className="group flex min-h-[82px] w-full items-center justify-between gap-4 py-5 text-left"
                      >
                        <span
                          className={`font-display text-[24px] font-normal uppercase leading-[1.3em] transition-colors md:text-[32px] ${
                            open ? "text-accent" : "text-fg group-hover:text-accent"
                          }`}
                        >
                          {s.title}
                        </span>
                        <motion.span
                          animate={{ rotate: open ? 0 : 180 }}
                          transition={ACCORDION_SPRING}
                          className={open ? "text-accent" : "text-fg"}
                        >
                          <ArrowDown />
                        </motion.span>
                      </button>
                      <AnimatePresence initial={false}>
                        {open && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={ACCORDION_SPRING}
                            className="overflow-hidden"
                          >
                            <ul className="flex flex-col gap-5 pb-5">
                              {s.bullets.map((b) => (
                                <li key={b} className="flex items-start gap-[10px]">
                                  <CheckCircle />
                                  <span className="font-sans text-[16px] font-light leading-[1.5em] text-fg lg:text-[18px]">
                                    {b}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>

        {/* Scene 3 — About (100vh): 600 column, 40px group gaps, 10px head/para */}
        <div id="about" className="relative flex min-h-screen w-full items-center overflow-hidden">
          <div className="mx-auto flex w-full max-w-[1200px] items-center px-10">
            <div className="flex w-full max-w-[600px] flex-col items-start gap-10">
              <div className="flex w-full flex-col items-start gap-[10px]">
                <h2 className={HEADING}>About me</h2>
                <p className={PARA}>
                  Hi, I&apos;m Arunima — a Kolkata-based makeup artist and hair
                  stylist crafting looks that feel like you, only more radiant.
                </p>
              </div>

              <div className="grid w-full grid-cols-3">
                {STATS.map((s) => (
                  <div key={s.l}>
                    <p className="display text-4xl text-green-deep">{s.n}</p>
                    <p className="mt-1 text-xs text-muted">{s.l}</p>
                  </div>
                ))}
              </div>

              <div className="grid w-full grid-cols-3 text-sm">
                {CONTACT.map((c) => (
                  <div key={c.label}>
                    <p className="font-semibold text-fg">{c.label}</p>
                    <p className="text-muted">{c.value}</p>
                  </div>
                ))}
              </div>

              <div className="flex gap-5">
                {SOCIALS.map((s) => (
                  <a
                    key={s}
                    href="#contact"
                    aria-label={s}
                    data-cursor="hover"
                    className="flex h-[30px] w-[30px] items-center justify-center rounded-full border border-line text-[10px] font-semibold text-fg transition-colors hover:border-accent hover:text-green-deep"
                  >
                    {s}
                  </a>
                ))}
              </div>

              <a
                href="/about"
                data-cursor="hover"
                className="inline-flex w-fit items-center gap-2 rounded-full border border-accent px-6 py-3 text-sm font-semibold text-green-deep transition-colors hover:bg-accent hover:text-accent-fg"
              >
                My Story →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
