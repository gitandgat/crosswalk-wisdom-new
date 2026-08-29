const exploreLinks = [
  { label: "IMG Pivot Guide", href: "/img" },
  { label: "Course", href: "/course" },
  { label: "Philosophy", href: "/philosophy" },
  { label: "Blog", href: "/blog" },
  { label: "Assessment", href: "/assessment" },
];

const connectLinks = [
  { label: "About", href: "#about" },
  { label: "Work With Me", href: "/work-with-me" },
  { label: "Free Calculator", href: "/img/calculator" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-border bg-charcoal">
      <div className="max-w-site mx-auto px-6 md:px-12 lg:px-20 xl:px-32 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr_1fr] gap-12 md:gap-8">
          {/* Brand */}
          <div>
            <span className="font-display text-xl text-parchment tracking-tight">
              Crosswalk Wisdom
            </span>
            <span className="block font-body text-[10px] tracking-widest2 uppercase text-white/40 mt-1 mb-5">
              by Sahawat
            </span>
            <p className="font-body text-sm text-white/50 leading-relaxed max-w-sm">
              Helping IMGs cross from the ward to the world — a way forward
              that doesn&rsquo;t require another exam.
            </p>
          </div>

          {/* Explore */}
          <div>
            <p className="eyebrow text-white/40 mb-4">Explore</p>
            <ul className="space-y-3">
              {exploreLinks.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="font-body text-sm text-white/60 transition-colors duration-200 hover:text-amber"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <p className="eyebrow text-white/40 mb-4">Connect</p>
            <ul className="space-y-3">
              {connectLinks.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="font-body text-sm text-white/60 transition-colors duration-200 hover:text-amber"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-body text-xs text-white/35">
            © {year} Crosswalk Wisdom. All rights reserved.
          </p>
          <p className="font-body text-xs text-white/35 italic">
            From the Ward to the World.
          </p>
        </div>
      </div>
    </footer>
  );
}
