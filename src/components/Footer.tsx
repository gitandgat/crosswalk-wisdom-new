export default function Footer() {
  return (
    <footer className="bg-ink text-parchment/40 py-10 px-6 md:px-12">
      <div className="max-w-site mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center md:text-left">
          <p className="font-display text-base text-parchment/70">Crosswalk Wisdom</p>
          <p className="font-body text-xs mt-1">by Sahawat Nilwatcharamanee</p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6 font-body text-xs">
          <a
            href="https://fear-audit.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-parchment/80 transition-colors"
          >
            Fear Audit
          </a>
          <a
            href="https://sahawat.gumroad.com/l/courage-to-choose"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-parchment/80 transition-colors"
          >
            The Courage to Choose
          </a>
          <a
            href="mailto:sahawat@crosswalkwisdom.com"
            className="hover:text-parchment/80 transition-colors"
          >
            Contact
          </a>
        </div>

        <div className="text-center md:text-right">
          <p className="font-body text-xs">
            © {new Date().getFullYear()} Crosswalk Wisdom. All rights reserved.
          </p>
          <p className="font-body text-xs mt-1 italic opacity-60">
            The sidewalk is the classroom.
          </p>
        </div>
      </div>
    </footer>
  );
}
