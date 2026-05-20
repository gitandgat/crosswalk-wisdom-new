import { motion } from "framer-motion";

const fadeUp = {
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.8 },
};

const searches = [
  '"is the MCCQE worth it for IMGs"',
  '"how long should I keep trying to match"',
  '"non-clinical jobs for doctors in Canada"',
  '"leaving medicine without losing immigration status"',
  '"IMG career change after unmatched"',
];

export default function MirrorSection() {
  return (
    <section id="about" className="section-pad ward-pattern" style={{ backgroundColor: "#EDF1F7" }}>
      <div className="max-w-site mx-auto">
        <div className="max-w-prose2 mx-auto">

          <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0 }} className="mb-6">
            <span className="zone-label" style={{ borderColor: "#F59E0B22", color: "#F59E0B", backgroundColor: "transparent" }}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "#F59E0B" }} />
              Still on the Pathway
            </span>
          </motion.div>

          <motion.p {...fadeUp} className="eyebrow mb-6">
            I see you
          </motion.p>

          {/* The 2am search simulation */}
          <motion.div
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.1 }}
            className="mb-12 p-6 md:p-8 bg-charcoal rounded-sm font-body"
          >
            <div className="flex items-center gap-2 mb-4 pb-4 border-b border-white/10">
              <div className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/70" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-400/70" />
              <span className="ml-3 text-white/30 text-xs">2:17 AM — Recent searches</span>
            </div>
            <ul className="space-y-3">
              {searches.map((s, i) => (
                <motion.li
                  key={s}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                  className="flex items-start gap-3 text-white/70 text-sm md:text-base"
                >
                  <span className="text-forest-mid mt-0.5 flex-shrink-0">→</span>
                  <span>{s}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.h2
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.15 }}
            className="font-display text-3xl md:text-4xl lg:text-5xl text-ink mb-8 leading-snug"
          >
            You're not Googling this because you're weak.
            <br />
            <span className="text-forest">You're Googling this because you're finally honest.</span>
          </motion.h2>

          <motion.div
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.25 }}
            className="space-y-5 font-body text-charcoal leading-relaxed text-base md:text-lg"
          >
            <p>
              You're an IMG. You earned your degree. You passed your exams. You moved to Canada with a plan — and the plan didn't account for a system where the match rate is 10–22% and the deck was stacked before you arrived.
            </p>
            <p>
              You've told yourself &ldquo;just one more year&rdquo; more times than you can count. You've spent tens of thousands on prep courses, credential verification, and application fees. You work a job that has nothing to do with your degree, while still calling yourself a doctor.
            </p>
            <p>
              You don't need another prep course. You need someone who ran the same treadmill, looked at the math, stepped off — and didn't fall apart on the other side.
            </p>
          </motion.div>

          <motion.div
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.35 }}
            className="mt-10 pl-6 border-l-2 border-forest"
          >
            <p className="font-display text-xl md:text-2xl text-ink italic leading-snug">
              &ldquo;I built this because nobody built it for me.&rdquo;
            </p>
            <p className="font-body text-sm text-muted mt-3">— Sahawat, IMG</p>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
