"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

/* ============================================================================
   FEATURED PROJECTS — METADATA  (estimates; gradient placeholders = ~0 MB now)
   {
     section: "Featured Projects",
     container: "max 1200px · padding 120/40/120/40 · vstack · group gap 40px",
     totalHeight: "~3893px (4 sticky cards ~747px + 120px gaps + 240px padding)",
     groups: "TextWrap 1120x179 (gap 20) | FeaturedWrap 1120x3347 (gap 120) | ButtonWrap 1120x47",
     functionality: "4 sticky cards -> link /projects/:slug ; Browse All -> /projects",
     animation: "sticky top:80px ; cards 1-3 scale 1->0.8 on scroll (spring 500/60/1) ; button liquid-fill 15px->234px",
     codeWeightMB: "~0 MB (CSS transforms; framer-motion shared across bundle)",
     mediaWeightMB_estimate: "4 covers @ ~0.35 MB WebP = ~1.4 MB total (or ~2.4 MB as JPEG @1200x400)",
     animationWeightMB: "0 MB (transform-only; no GIF/video/Lottie payload)"
   }
   ========================================================================== */

type Project = { type: string; title: string; desc: string; tone: string; slug: string };

const PROJECTS: Project[] = [
  /* { item: "Project 1 — Bridal", cardSize: "1120x747px · cover 400px · radius 20",
       work: "cover image + accent badge + Antonio 60px title + Inter 14px desc",
       scrollAnim: "scale 1->0.8 when Project 2 focuses (spring 500/60/1)",
       animationSizeMB: "0 MB (CSS transform)", coverImageMB_estimate: "~0.35 MB WebP / ~0.6 MB JPEG" } */
  { type: "Bridal", title: "Aanya — Royal Bridal", desc: "A regal, long-wear bridal look built to last from the pheras to the reception.", tone: "from-[#d8b487] to-[#4a3520]", slug: "aanya-royal-bridal" },
  /* { item: "Project 2 — Editorial", cardSize: "1120x746px · cover 400px · radius 20",
       work: "cover image + accent badge + title + desc",
       scrollAnim: "scale 1->0.8 when Project 3 focuses (spring 500/60/1)",
       animationSizeMB: "0 MB (CSS transform)", coverImageMB_estimate: "~0.35 MB WebP / ~0.6 MB JPEG" } */
  { type: "Editorial", title: "Vogue Noir", desc: "A high-contrast editorial story shot for print — bold liner, luminous skin.", tone: "from-[#c84f6e] to-[#2a1420]", slug: "vogue-noir" },
  /* { item: "Project 3 — Party", cardSize: "1120x747px · cover 400px · radius 20",
       work: "cover image + accent badge + title + desc",
       scrollAnim: "scale 1->0.8 when Project 4 focuses (spring 500/60/1)",
       animationSizeMB: "0 MB (CSS transform)", coverImageMB_estimate: "~0.35 MB WebP / ~0.6 MB JPEG" } */
  { type: "Party", title: "Sangeet Glam", desc: "Shimmer, colour and movement for a night of dancing and celebration.", tone: "from-[#7a5cc4] to-[#241844]", slug: "sangeet-glam" },
  /* { item: "Project 4 — Photoshoot", cardSize: "1120x747px · cover 400px · radius 20",
       work: "cover image + accent badge + title + desc",
       scrollAnim: "none (last card has no outgoing scale-down)",
       animationSizeMB: "0 MB", coverImageMB_estimate: "~0.35 MB WebP / ~0.6 MB JPEG" } */
  { type: "Photoshoot", title: "Studio Beauty Film", desc: "Clean, camera-ready beauty looks crafted for a studio campaign.", tone: "from-[#3aa6a0] to-[#0f2a28]", slug: "studio-beauty-film" },
];

const SPRING = { stiffness: 500, damping: 60, mass: 1 };

/* { component: "FeaturedCard", size: "1120x~747px · cover 400px · radius 20",
     work: "linked cover -> /projects/:slug · dark overlay gradient · centered badge/title/desc",
     animation: "scale 1->0.8 via own scroll progress (spring 500/60/1) unless isLast",
     weightMB: "0 MB code · cover image ~0.35 MB WebP estimate" } */
function FeaturedCard({ project, isLast }: { project: Project; isLast: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80px", "end 80px"],
  });
  const scale = useSpring(useTransform(scrollYProgress, [0, 1], [1, 0.8]), SPRING);

  return (
    <div ref={ref} className="sticky top-20">
      <motion.div style={{ scale: isLast ? 1 : scale }} className="origin-top">
        <a
          href={`/projects/${project.slug}`}
          data-cursor="hover"
          className="group relative block h-[400px] w-full overflow-hidden rounded-[20px] md:h-[460px]"
        >
          <div className={`absolute inset-0 bg-gradient-to-br ${project.tone}`} />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-60"
            style={{ background: "linear-gradient(to bottom, rgba(12,12,13,0.45), rgba(12,12,13,0.8))" }}
          />
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-5 px-6 text-center">
            <span className="rounded-full bg-accent px-[15px] py-[3px] font-sans text-[14px] font-light leading-[1.5em] text-accent-fg">
              {project.type}
            </span>
            <h3 className="max-w-[800px] font-display text-[28px] font-bold uppercase leading-[1.05em] tracking-[-0.02em] text-white sm:text-[48px] lg:text-[60px]">
              {project.title}
            </h3>
            <p className="max-w-[600px] font-sans text-[14px] font-light leading-[1.5em] text-white/85">
              {project.desc}
            </p>
          </div>
        </a>
      </motion.div>
    </div>
  );
}

/* { component: "BrowseAllButton", size: "280x47px · radius 99 · border 1px accent",
     work: "link -> /projects", animation: "liquid fill: accent circle 0->234px on hover, text -> accent-fg",
     weightMB: "0 MB (CSS only)" } */
function BrowseAllButton() {
  return (
    <a
      href="/projects"
      data-cursor="hover"
      className="group relative inline-flex items-center overflow-hidden rounded-full border border-accent px-10 py-2"
    >
      <span
        aria-hidden
        className="absolute left-1/2 top-1/2 h-[234px] w-[234px] -translate-x-1/2 -translate-y-1/2 scale-0 rounded-full bg-accent transition-transform duration-500 ease-out group-hover:scale-100"
      />
      <span className="relative z-10 font-display text-lg font-medium uppercase tracking-wide text-accent transition-colors duration-300 group-hover:text-accent-fg">
        Browse All Projects
      </span>
    </a>
  );
}

export function ProjectGrid() {
  return (
    <section id="work" className="relative w-full overflow-hidden">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-10 px-10 py-[120px]">
        {/* { group: "Text Wrap 1120x179 · gap 20 · heading H2 60/48/42 + Inter desc max 500 } */}
        <div className="flex flex-col gap-5">
          <h2 className="font-display text-[42px] font-bold uppercase leading-[1.3em] text-fg md:text-[48px] lg:text-[60px]">
            Featured Projects
          </h2>
          <p className="max-w-[500px] font-sans text-[16px] font-light leading-[1.5em] text-fg lg:text-[18px]">
            These selected projects reflect my passion for blending artistry
            with feeling — creating looks that tell a story and last all day.
          </p>
        </div>

        {/* { group: "Featured Project Wrap 1120x3347 · 4 sticky cards · gap 120px } */}
        <div className="flex flex-col gap-[120px]">
          {PROJECTS.map((p, i) => (
            <FeaturedCard key={p.slug} project={p} isLast={i === PROJECTS.length - 1} />
          ))}
        </div>

        {/* { group: "Button Wrap 1120x47 · centered · Browse All Projects } */}
        <div className="flex w-full justify-center">
          <BrowseAllButton />
        </div>
      </div>
    </section>
  );
}
