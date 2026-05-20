import { useEffect } from "react";
import { motion } from "framer-motion";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay },
});

export default function ApplyThanksPage() {
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

          <motion.div {...fadeUp(0.05)} className="text-5xl mb-8">🤝</motion.div>

          <motion.h1
            {...fadeUp(0.15)}
            className="font-display text-4xl md:text-5xl text-ink leading-tight mb-6"
          >
            Application received.
          </motion.h1>

          <motion.p
            {...fadeUp(0.25)}
            className="font-body text-base md:text-lg text-charcoal leading-relaxed mb-4"
          >
            Sahawat reads every application personally. You'll hear back within
            48 hours — by email, from sahawat@crosswalkwisdom.com.
          </motion.p>

          <motion.p
            {...fadeUp(0.3)}
            className="font-body text-base text-muted leading-relaxed mb-14"
          >
            It takes courage to ask for help. That already means something.
          </motion.p>

          {/* What happens next */}
          <motion.div
            {...fadeUp(0.4)}
            className="text-left space-y-4 mb-14"
          >
            {[
              {
                n: "01",
                title: "Sahawat reviews your application",
                body: "He reads every word. No automated filtering.",
              },
              {
                n: "02",
                title: "You get a personal reply within 48 hours",
                body: "Either a discovery call invitation or honest feedback on fit.",
              },
              {
                n: "03",
                title: "Discovery call — no pressure",
                body: "30 minutes to talk through your situation and see if The Crosswalk Program is the right move.",
              },
            ].map((s) => (
              <div key={s.n} className="flex gap-5 p-6 bg-card rounded-sm border border-border">
                <span className="font-body text-xs font-medium text-forest/50 tracking-widest pt-1 flex-shrink-0">
                  {s.n}
                </span>
                <div>
                  <h3 className="font-display text-lg text-ink mb-1">{s.title}</h3>
                  <p className="font-body text-sm text-charcoal leading-relaxed">{s.body}</p>
                </div>
              </div>
            ))}
          </motion.div>

          <motion.div
            {...fadeUp(0.55)}
            className="pt-10 border-t border-border"
          >
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
