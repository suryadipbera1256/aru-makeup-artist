/**
 * Footer
 * ------
 * Strictly black regardless of theme (uses the dark-palette ink), per spec.
 * Carries id="footer" so the floating theme toggle can detect and hide over it.
 */
export function Footer() {
  return (
    <footer id="footer" className="bg-ink px-6 py-14 text-paper">
      <div className="mx-auto grid max-w-6xl gap-10 sm:grid-cols-3">
        <div>
          <p className="display text-2xl">Arunima Mondal</p>
          <p className="mt-2 max-w-xs text-sm text-paper/60">
            Kolkata-based makeup artist & hair stylist.
          </p>
        </div>
        <nav className="flex flex-col gap-2 text-sm text-paper/60">
          <a href="#work" className="hover:text-paper">Projects</a>
          <a href="#about" className="hover:text-paper">About</a>
          <a href="#insights" className="hover:text-paper">Blogs</a>
          <a href="#contact" className="hover:text-paper">Contact</a>
        </nav>
        <nav className="flex flex-col gap-2 text-sm text-paper/60">
          <a href="https://instagram.com" className="hover:text-paper">Instagram</a>
          <a href="https://facebook.com" className="hover:text-paper">Facebook</a>
          <a href="#top" className="hover:text-paper">Back to top ↑</a>
        </nav>
      </div>
      <p className="mx-auto mt-12 max-w-6xl font-mono text-xs uppercase tracking-[0.2em] text-paper/40">
        © 2026 Arunima Mondal. All rights reserved.
      </p>
    </footer>
  );
}
