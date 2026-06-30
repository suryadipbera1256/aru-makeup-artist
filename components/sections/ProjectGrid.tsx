"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

/**
 * Featured Projects — sticky, stacking project showcase.
 * Four cards each pin at top:80px; as the next card scrolls up over it, the
 * current card scales down to 0.8 (spring 500/60/1), creating the layered
 * stack. The last card does not scale. Covers link to /projects/:slug.
 */

type Project = { type: string; title: string; desc: string; tone: string; slug: string };

const PROJECTS: Project[] = [
  { type: "Bridal", title: "Aanya — Royal Bridal", desc: "A regal, long-wear bridal look built to last from the pheras to the reception.", tone: "from-[#d8b487] to-[#4a3520]", slug: "aanya-royal-bridal" },
  { type: "Editorial", title: "Vogue Noir", desc: "A high-contrast editorial story shot for print — bold liner, luminous skin.", tone: "from-[#c84f6e] to-[#2a1420]", slug: "vogue-noir" },
  { type: "Party", title: "Sangeet Glam", desc: "Shimmer, colour and movement for a night of dancing and celebration.", tone: "from-[#7a5cc4] to-[#241844]", slug: "sangeet-glam" },
  { type: "Photoshoot", title: "Studio Beauty Film", desc: "Clean, camera-ready beauty looks crafted for a studio campaign.", tone: "from-[#3aa6a0] to-[#0f2a28]", slug: "studio-beauty-film" },
];

const SPRING = { stiffness: 500, damping: 60, mass: 1 };

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
          {/* cover (CMS image goes here; gradient placeholder for now) */}
          <div className={`absolute inset-0 bg-gradient-to-br ${project.tone}`} />
          {/* overlay gradient — rgba(12,12,13,.45) -> .8 at 0.6 opacity */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-60"
            style={{ background: "linear-gradient(to bottom, rgba(12,12,13,0.45), rgba(12,12,13,0.8))" }}
          />
          {/* centered info */}
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

function BrowseAllButton() {
  return (
    <a
      href="/projects"
      data-cursor="hover"
      className="group relative inline-flex items-center overflow-hidden rounded-full border border-accent px-10 py-2"
    >
      {/* liquid accent fill on hover */}
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
        {/* Text wrap */}
        <div className="flex flex-col gap-5">
          <h2 className="font-display text-[42px] font-bold uppercase leading-[1.3em] text-fg md:text-[48px] lg:text-[60px]">
            Featured Projects
          </h2>
          <p className="max-w-[500px] font-sans text-[16px] font-light leading-[1.5em] text-fg lg:text-[18px]">
            These selected projects reflect my passion for blending artistry
            with feeling — creating looks that tell a story and last all day.
          </p>
        </div>

        {/* Featured project wrap — sticky stack, 120px apart */}
        <div className="flex flex-col gap-[120px]">
          {PROJECTS.map((p, i) => (
            <FeaturedCard key={p.slug} project={p} isLast={i === PROJECTS.length - 1} />
          ))}
        </div>

        {/* Button wrap */}
        <div className="flex w-full justify-center">
          <BrowseAllButton />
        </div>
      </div>
    </section>
  );
}
