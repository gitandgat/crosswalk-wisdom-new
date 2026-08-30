const links = [
  { label: "IMG Pivot Guide", href: "/img" },
  { label: "Course", href: "/course" },
  { label: "Philosophy", href: "/philosophy" },
  { label: "Assessment", href: "/assessment" },
  { label: "Blog", href: "/blog" },
  { label: "Work With Me", href: "/work-with-me" },
];

export default function Footer() {
  return (
    <footer className="bg-ink text-parchment/70 mt-auto">
      <div className="max-w-site mx-auto px-6 md:px-12 py-14 md:py-16">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-10">
          <div>
            <span className="font-display text-lg text-parchment tracking-tight">
              Crosswalk Wisdom
            </span>
            <p className="font-body text-sm text-parchment/50 mt-2 max-w-xs leading-relaxed">
              From the Ward to the World.
            </p>
          </div>

          <nav className="flex flex-wrap gap-x-8 gap-y-3">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="font-body text-sm text-parchment/60 hover:text-parchment transition-colors duration-200"
              >
                {l.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <p className="font-body text-xs text-parchment/40">
            © Crosswalk Wisdom — Helping people cross into what&rsquo;s next.
          </p>
          <a
            href="mailto:sahawat@crosswalkwisdom.com"
            className="font-body text-xs text-parchment/40 hover:text-parchment/70 transition-colors duration-200"
          >
            sahawat@crosswalkwisdom.com
          </a>
        </div>
      </div>
    </footer>
  );
}
