import { useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const FACEBOOK_GROUP = "https://www.facebook.com/groups/2073825613397240";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay },
});

const nextSteps = [
  {
    step: "01",
    title: "Check your inbox",
    body: "A welcome email from Sahawat is on its way. Check your spam folder if you don't see it in 5 minutes.",
  },
  {
    step: "02",
    title: "Join the Facebook group",
    body: "The Crosswalk Community is where the real conversations happen. Introduce yourself — tell us your profession and one thing you're afraid to say out loud at work.",
  },
  {
    step: "03",
    title: "Take the Fear Audit",
    body: "If you haven't yet — it takes 2 minutes and names the exact fear keeping you stuck. It's the best place to start.",
  },
];

export default function ThankYouPage() {
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-parchment flex flex-col">

      {/* Crosswalk stripe top */}
      <div className="h-1 crosswalk-stripes opacity-60" />

      {/* Minimal nav */}
      <header className="px-6 md:px-12 py-6 flex items-center justify-between border-b border-border">
        <a href="/" className="font-display text-lg text-ink hover:text-forest transition-colors">
          Crosswalk Wisdom
        </a>
      </header>

      <main className="flex-1 flex items-center justify-center px-6 py-16 md:py-24">
        <div className="w-full max-w-2xl text-center">

          {/* Vest emoji */}
          <motion.div {...fadeUp(0.05)} className="text-5xl mb-8">
            🦺
          </motion.div>

          {/* Headline */}
          <motion.h1
            {...fadeUp(0.15)}
            className="font-display text-4xl md:text-5xl lg:text-6xl text-ink leading-tight mb-6"
          >
            Welcome to
            <br />
            <span className="text-forest">The Crosswalk.</span>
          </motion.h1>

          {/* Sub */}
          <motion.p
            {...fadeUp(0.25)}
            className="font-body text-base md:text-lg text-charcoal leading-relaxed mb-4 max-w-lg mx-auto"
          >
            You made it. That already took something.
          </motion.p>
          <motion.p
            {...fadeUp(0.3)}
            className="font-body text-base text-muted leading-relaxed mb-14 max-w-lg mx-auto"
          >
            You're now part of a community of healthcare professionals who chose to
            stop pretending they were fine.
          </motion.p>

          {/* Primary CTA */}
          <motion.div {...fadeUp(0.4)} className="mb-16">
            <a
              href={FACEBOOK_GROUP}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-forest text-parchment font-body font-medium text-base rounded-sm hover:bg-forest-mid transition-colors"
            >
              Join the Facebook group now
              <ArrowRight size={16} />
            </a>
            <p className="font-body text-xs text-muted mt-3">
              Introduce yourself — we're waiting for you.
            </p>
          </motion.div>

          {/* Divider */}
          <motion.div
            {...fadeUp(0.45)}
            className="w-12 h-px bg-border mx-auto mb-14"
          />

          {/* Next steps */}
          <motion.div {...fadeUp(0.5)} className="text-left space-y-6">
            {nextSteps.map((s, i) => (
              <motion.div
                key={s.step}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.55 + i * 0.1 }}
                className="flex gap-5 p-6 bg-card rounded-sm border border-border"
              >
                <span className="font-body text-xs font-medium text-forest/50 tracking-widest pt-1 flex-shrink-0">
                  {s.step}
                </span>
                <div>
                  <h3 className="font-display text-lg text-ink mb-1">{s.title}</h3>
                  <p className="font-body text-sm text-charcoal leading-relaxed">{s.body}</p>
                  {s.step === "02" && (
                    <a
                      href={FACEBOOK_GROUP}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 mt-3 font-body text-sm text-forest hover:text-forest-mid transition-colors underline underline-offset-4"
                    >
                      Open the group →
                    </a>
                  )}
                  {s.step === "03" && (
                    <a
                      href="https://fear-audit.vercel.app"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 mt-3 font-body text-sm text-forest hover:text-forest-mid transition-colors underline underline-offset-4"
                    >
                      Take the Fear Audit →
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Closing line */}
          <motion.div
            {...fadeUp(0.85)}
            className="mt-14 pt-10 border-t border-border"
          >
            <p className="font-display text-xl text-muted italic">
              "The sidewalk is the classroom. You are the student. Healing is the lesson."
            </p>
            <a
              href="/"
              className="inline-block mt-6 font-body text-sm text-muted hover:text-forest transition-colors underline underline-offset-4"
            >
              ← Back to Crosswalk Wisdom
            </a>
          </motion.div>

        </div>
      </main>

      {/* Crosswalk stripe footer */}
      <div className="h-1 crosswalk-stripes opacity-40" />
    </div>
  );
}
