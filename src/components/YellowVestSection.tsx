import { motion } from "framer-motion";

const fadeUp = {
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.8 },
};

export default function YellowVestSection() {
  return (
    <section className="section-pad bg-charcoal text-parchment">
      <div className="max-w-site mx-auto">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-start">

          {/* Left: eyebrow + headline */}
          <div className="md:sticky md:top-32">
            <motion.p {...fadeUp} className="font-body text-xs font-medium tracking-widest2 uppercase text-forest-mid mb-6">
              The story
            </motion.p>
            <motion.h2
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: 0.1 }}
              className="font-display text-4xl md:text-5xl lg:text-6xl text-parchment leading-tight mb-8"
            >
              I was an IMG. I ran the treadmill. I stepped off.
            </motion.h2>
            <motion.p
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: 0.2 }}
              className="font-display text-xl md:text-2xl text-forest-mid italic leading-snug"
            >
              &ldquo;A first-grader taught me more than the pathway ever did.&rdquo;
            </motion.p>

            {/* Vest icon */}
            <motion.div
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: 0.3 }}
              className="mt-12 inline-flex items-center gap-3 px-5 py-3 border border-white/10 rounded-sm"
            >
              <span className="text-2xl">🦺</span>
              <span className="font-body text-sm text-parchment/50 tracking-wide">The Yellow Vest</span>
            </motion.div>
          </div>

          {/* Right: story paragraphs */}
          <div className="space-y-7 font-body text-parchment/80 leading-relaxed text-base md:text-lg">
            <motion.p {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.15 }}>
              I moved to Canada as an IMG with a plan that made sense on paper. I ran the exams. I waited for match results. I worked jobs that had nothing to do with my degree, while still telling myself I was a doctor in between.
            </motion.p>

            <motion.p {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.17 }}>
              The morning I showed up to my first shift as a crossing guard, I parked around the corner. Not because I was ashamed. I told myself that.
            </motion.p>

            <motion.p {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.2 }}>
              I put on the yellow vest in my car. I checked my mirrors. I walked to the corner. And for the next two hours, I held a stop sign and waved kindergartners across the street.
            </motion.p>

            <motion.p {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.25 }}>
              Two former colleagues drove past. I saw them slow down. I smiled. I waved.
            </motion.p>

            <motion.p {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.3 }}>
              And then a first-grader — maybe six years old, missing a front tooth — grabbed my hand before crossing and looked up at me and said, <em>"You're the helper."</em>
            </motion.p>

            <motion.div
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: 0.35 }}
              className="py-6 px-8 bg-white/5 border-l-2 border-forest-mid rounded-r-sm"
            >
              <p className="font-display text-xl md:text-2xl text-parchment italic leading-snug">
                I had been a doctor for twelve years. Nobody had ever called me the helper.
              </p>
            </motion.div>

            <motion.p {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.4 }}>
              I'm not saying you need to become a crossing guard. I'm saying the sidewalk taught me what the hospital never could: that healing is about slowing down, watching, and letting people cross safely — including yourself.
            </motion.p>

            <motion.p {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.45 }}>
              The classroom is everywhere. You don't need a $3,000 retreat. You need to stop moving long enough to see what's already there.
            </motion.p>

            <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.5 }}>
              <p className="font-body text-xs tracking-widest uppercase text-forest-mid mb-1">The sidewalk is the classroom.</p>
              <p className="font-body text-xs tracking-widest uppercase text-forest-mid mb-1">You are the student.</p>
              <p className="font-body text-xs tracking-widest uppercase text-parchment/30">Healing is the lesson.</p>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
