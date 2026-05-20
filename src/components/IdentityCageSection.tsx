import { motion } from "framer-motion";

const fadeUp = {
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.8 },
};

const myths = [
  {
    myth: "You just need to try harder next year.",
    truth: "You've already tried harder. The match rate is 10–22% — and it has nothing to do with how hard you prepared.",
  },
  {
    myth: "Pivoting means you wasted your medical degree.",
    truth: "Your MD is worth more outside the licensing pathway than inside it. 12 non-clinical roles actively hire for it.",
  },
  {
    myth: "If you stop, you'll lose everything — including Canada.",
    truth: "Non-clinical roles under the right NOC codes preserve Express Entry eligibility. The immigration door doesn't close when the exam door does.",
  },
];

export default function IdentityCageSection() {
  return (
    <section className="section-pad bg-parchment relative">
      <div className="absolute top-0 left-0 right-0 section-crosswalk" />
      <div className="max-w-site mx-auto">

        {/* Header */}
        <div className="max-w-2xl mx-auto text-center mb-20">
          <motion.div {...fadeUp} className="mb-4">
            <span className="zone-label border-amber/30 text-amber bg-amber-light">
              <span className="w-1.5 h-1.5 rounded-full bg-amber" />
              The Crosswalk
            </span>
          </motion.div>
          <motion.p {...fadeUp} className="eyebrow mb-6">
            The real diagnosis
          </motion.p>
          <motion.h2
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.1 }}
            className="font-display text-4xl md:text-5xl lg:text-6xl text-ink mb-6 leading-tight"
          >
            The cage isn&rsquo;t the exam pathway.
            <br />
            <span className="text-forest">It&rsquo;s the story you&rsquo;ve been told about it.</span>
          </motion.h2>
          <motion.p
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.2 }}
            className="font-body text-base md:text-lg text-charcoal leading-relaxed"
          >
            &ldquo;I am a doctor&rdquo; isn&rsquo;t a description — it&rsquo;s a load-bearing wall. The system built that wall, and it profits from you staying inside it. Dismantling it feels like dying. It&rsquo;s also the beginning of something better.
          </motion.p>
        </div>

        {/* Myth vs Truth cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-20">
          {myths.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: i * 0.15 }}
              className="rounded-sm overflow-hidden border border-border"
            >
              {/* Myth */}
              <div className="p-6 bg-card/60">
                <p className="font-body text-xs tracking-widest uppercase text-muted mb-3">
                  What they tell you
                </p>
                <p className="font-display text-lg text-muted/80 italic leading-snug line-through decoration-forest/40 decoration-2">
                  "{item.myth}"
                </p>
              </div>
              {/* Truth */}
              <div className="p-6 bg-forest-light border-t border-border">
                <p className="font-body text-xs tracking-widest uppercase text-forest mb-3">
                  What's actually true
                </p>
                <p className="font-body text-sm md:text-base text-charcoal leading-relaxed">
                  {item.truth}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Pull quote */}
        <motion.div
          {...fadeUp}
          className="max-w-3xl mx-auto text-center"
        >
          <div className="w-12 h-1 bg-forest mx-auto mb-8" />
          <p className="font-display text-2xl md:text-3xl lg:text-4xl text-ink italic leading-snug mb-8">
            &ldquo;The prep course industry wants you to keep failing.
            <br className="hidden md:block" />
            <span className="text-forest"> Crosswalk Wisdom wants you free enough to choose.&rdquo;</span>
          </p>
          <a
            href="/img"
            className="inline-flex items-center gap-2 font-body text-sm font-medium text-forest border border-forest px-6 py-3 rounded-sm hover:bg-forest hover:text-parchment transition-colors duration-200"
          >
            Run the numbers. Get the free calculator →
          </a>
        </motion.div>

      </div>
    </section>
  );
}
