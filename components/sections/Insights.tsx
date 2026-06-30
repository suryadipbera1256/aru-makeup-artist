/**
 * Design Insights & Ideas — CMS-style blog preview.
 * 1200px container (120px vertical padding), heading + 500px description, a
 * 2-column card grid (gap 40), and a liquid-fill "Browse All Insights" button.
 * Cards link to /blogs/:slug. Content is seed data; wire to a CMS later.
 */

type Blog = {
  category: string;
  date: string;
  title: string;
  desc: string;
  tone: string;
  slug: string;
};

const BLOGS: Blog[] = [
  {
    category: "Bridal Tips",
    date: "Jun 12, 2026",
    title: "5 Bridal Looks That Define 2026",
    desc: "From soft glam to bold modern bridal — the looks brides are asking for this season and how to wear them.",
    tone: "from-[#d8b487] to-[#4a3520]",
    slug: "bridal-looks-2026",
  },
  {
    category: "Tutorials",
    date: "May 28, 2026",
    title: "How To Make Your Makeup Last All Day",
    desc: "Prep, products and setting techniques that keep your look fresh from the ceremony to the last dance.",
    tone: "from-[#c84f6e] to-[#2a1420]",
    slug: "makeup-last-all-day",
  },
];

function BlogCard({ blog }: { blog: Blog }) {
  return (
    <a
      href={`/blogs/${blog.slug}`}
      data-cursor="hover"
      className="group flex flex-col gap-5"
    >
      <div className="relative h-[320px] w-full overflow-hidden rounded-[20px]">
        <div className={`absolute inset-0 bg-gradient-to-br ${blog.tone} transition-transform duration-500 group-hover:scale-105`} />
      </div>
      <div className="flex items-center gap-[10px]">
        <span className="rounded-full border border-accent px-[15px] py-[3px] font-sans text-[14px] font-light leading-[1.5em] text-accent">
          {blog.category}
        </span>
        <span className="font-sans text-[14px] font-light leading-[1.5em] text-fg">
          {blog.date}
        </span>
      </div>
      <h3 className="font-display text-[24px] font-normal uppercase leading-[1.3em] text-fg md:text-[32px]">
        {blog.title}
      </h3>
      <p className="font-sans text-[14px] font-light leading-[1.5em] text-fg">
        {blog.desc}
      </p>
    </a>
  );
}

export function Insights() {
  return (
    <section id="insights" className="relative w-full overflow-hidden">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-10 px-10 py-[120px]">
        <div className="flex flex-col gap-5">
          <h2 className="font-display text-[42px] font-bold uppercase leading-[1.3em] text-fg md:text-[48px] lg:text-[60px]">
            Design Insights &amp; Ideas
          </h2>
          <p className="max-w-[500px] font-sans text-[16px] font-light leading-[1.5em] text-fg lg:text-[18px]">
            From bridal trends to behind-the-chair tips, these articles help you
            prep your skin, choose your look, and feel your most confident.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
          {BLOGS.map((b) => (
            <BlogCard key={b.slug} blog={b} />
          ))}
        </div>

        <div className="flex w-full justify-center">
          <a
            href="/blogs"
            data-cursor="hover"
            className="group relative inline-flex items-center overflow-hidden rounded-full border border-accent px-10 py-2"
          >
            <span
              aria-hidden
              className="absolute left-1/2 top-1/2 h-[234px] w-[234px] -translate-x-1/2 -translate-y-1/2 scale-0 rounded-full bg-accent transition-transform duration-500 ease-out group-hover:scale-100"
            />
            <span className="relative z-10 font-display text-lg font-medium uppercase tracking-wide text-accent transition-colors duration-300 group-hover:text-accent-fg">
              Browse All Insights
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
