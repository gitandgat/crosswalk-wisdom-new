import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const links = [
  { label: "IMG Pivot Guide", href: "/img" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "#about" },
  { label: "Work With Me", href: "/work-with-me" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-parchment/95 backdrop-blur-sm border-b border-border shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="max-w-site mx-auto px-6 md:px-12 flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <a href="#" className="flex flex-col leading-none group">
          <span className="font-display text-lg md:text-xl text-ink tracking-tight">
            Crosswalk Wisdom
          </span>
          <span className="font-body text-[10px] tracking-widest2 uppercase text-muted mt-0.5">
            by Sahawat
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="font-body text-sm text-muted hover:text-ink transition-colors duration-200"
            >
              {l.label}
            </a>
          ))}
          <a
            href="/img/calculator"
            className="font-body text-sm font-medium px-5 py-2.5 rounded-sm transition-colors duration-200"
            style={{ backgroundColor: "#F59E0B", color: "#1E1C1A" }}
          >
            Free Calculator →
          </a>
        </nav>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 text-ink"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-parchment border-b border-border px-6 pb-6 pt-2 space-y-4"
          >
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                onClick={() => setMenuOpen(false)}
                className="block font-body text-base text-ink py-1"
              >
                {l.label}
              </a>
            ))}
            <a
              href="/img/calculator"
              className="block font-body text-sm font-medium px-5 py-3 rounded-sm text-center"
              style={{ backgroundColor: "#F59E0B", color: "#1E1C1A" }}
            >
              Free Calculator →
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
