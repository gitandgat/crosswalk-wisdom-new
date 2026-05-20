import { useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay },
});

export default function WaitlistThanksPage() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen bg-parchment flex flex-col">
      <div className="h-1 crosswalk-stripes opacity-60" />

      <header className="px-6 md:px-12 py-6 border-b border-border">
        <a href="/" className="font-display text-lg text-ink hover:text-forest transition-colors">
          Crosswalk Wisdom
        </a>
      </header>

      <main className="flex-1 flex items-center justify-center px-6 py-16 md:py-24">
        <div className="w-full max-w-xl text-center">

          <motion.div {...fadeUp(0.05)} className="text-5xl mb-8">📋</motion.div>

          <motion.h1
            {...fadeUp(0.15)}
            className="font-display text-4xl md:text-5xl text-ink leading-tight mb-6"
          >
            You're on the list.
          </motion.h1>

          <motion.p
            {...fadeUp(0.25)}
            className="font-body text-base md:text-lg text-charcoal leading-relaxed mb-4"
          >
            When the next workshop opens, you'll be the first to know — and the first
            to get early access pricing.
          </motion.p>

          <motion.p
            {...fadeUp(0.3)}
            className="font-body text-base text-muted leading-relaxed mb-12"
          >
            Check your inbox for a confirmation from Sahawat.
          </motion.p>

          <motion.div {...fadeUp(0.4)} className="space-y-4">
            <p className="font-body text-sm font-medium text-ink">While you wait:</p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="https://fear-audit.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-forest text-parchment font-body text-sm font-medium rounded-sm hover:bg-forest-mid transition-colors"
              >
                Take the Fear Audit
                <ArrowRight size={14} />
              </a>
              <a
                href="https://sahawat.gumroad.com/l/courage-to-choose"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-forest text-forest font-body text-sm font-medium rounded-sm hover:bg-forest hover:text-parchment transition-colors"
              >
                Get the $27 guide
                <ArrowRight size={14} />
              </a>
            </div>
          </motion.div>

          <motion.div {...fadeUp(0.55)} className="mt-14 pt-10 border-t border-border">
            <p className="font-display text-lg text-muted italic">
              "The sidewalk is the classroom. You are the student. Healing is the lesson."
            </p>
            <a href="/" className="inline-block mt-5 font-body text-sm text-muted hover:text-forest transition-colors underline underline-offset-4">
              ← Back to Crosswalk Wisdom
            </a>
          </motion.div>

        </div>
      </main>

      <div className="h-1 crosswalk-stripes opacity-40" />
    </div>
  );
}
