import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const links = [
  { label: "IMG Pivot Guide", href: "/img" },
  { label: "Course", href: "/course" },
  { label: "Philosophy", href: "/philosophy" },
  { label: "Blog", href: "/blog" },
  { label: "Assessment", href: "/assessment" },
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
      <div className="max-w-site mx-auto px-6 lg:px-12 flex items-center justify-between h-16 lg:h-20">
        {/* Logo */}
        <a href="#" className="flex flex-col leading-none group shrink-0">
          <span className="font-display text-lg lg:text-xl text-ink tracking-tight transition-colors duration-200 group-hover:text-forest">
            Crosswalk Wisdom
          </span>
          <span className="font-body text-[10px] tracking-widest2 uppercase text-muted mt-0.5 transition-colors duration-200 group-hover:text-forest-mid">
            by Sahawat
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-4 xl:gap-6">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="relative py-1 rounded-sm font-body text-sm text-muted transition-colors duration-200 hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber focus-visible:outline-offset-4 after:absolute after:left-0 after:-bottom-0.5 after:h-px after:w-0 after:bg-amber after:transition-all after:duration-300 hover:after:w-full"
            >
              {l.label}
            </a>
          ))}
          <a
            href="/img/calculator"
            className="font-body text-sm font-medium px-4 py-2.5 rounded-sm bg-amber text-card-dark transition-colors duration-200 hover:bg-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
          >
            Free Calculator →
          </a>
        </nav>

        {/* Mobile menu button */}
        <button
          className="lg:hidden p-2 text-ink"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
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
            className="lg:hidden bg-parchment border-b border-border px-6 pb-6 pt-2 space-y-4"
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
              className="block font-body text-sm font-medium px-5 py-3 rounded-sm text-center bg-amber text-card-dark"
            >
              Free Calculator →
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
