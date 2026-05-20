import { motion } from "framer-motion";

const lines = [
  "We are IMGs who ran the numbers — and finally believed them.",
  "We took the exams. And again. And again.",
  "We stood on the crosswalk and looked both ways.",
  "We didn't leave because we gave up.",
  "We left because we finally showed up — for ourselves.",
  "Some of us are still on the pathway.",
  "Some of us have crossed.",
  "Some of us are standing at the curb, waiting for the signal.",
  "All of us are choosing.",
];

export default function ManifestoSection() {
  return (
    <section className="section-pad bg-ink text-parchment overflow-hidden relative">
      {/* Crosswalk stripes — decorative */}
      <div className="absolute top-0 left-0 right-0 h-2 crosswalk-stripes opacity-30" />
      <div className="absolute bottom-0 left-0 right-0 h-2 crosswalk-stripes opacity-30" />

      <div className="max-w-site mx-auto">
        <div className="max-w-3xl mx-auto text-center">

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-body text-xs font-medium tracking-widest2 uppercase text-forest-mid mb-12"
          >
            The Crosswalk Manifesto
          </motion.p>

          <div className="space-y-6">
            {lines.map((line, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.07 }}
                className={`font-display leading-snug ${
                  i < 5
                    ? "text-2xl md:text-3xl lg:text-4xl text-parchment"
                    : i < 8
                    ? "text-xl md:text-2xl text-parchment/70"
                    : "text-2xl md:text-3xl lg:text-4xl text-forest-mid"
                }`}
              >
                {line}
              </motion.p>
            ))}
          </div>

          {/* The mission line */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-16 pt-12 border-t border-white/10"
          >
            <p className="font-body text-xs tracking-widest2 uppercase text-forest-mid mb-4">
              The mission
            </p>
            <p className="font-display text-xl md:text-2xl text-parchment/90 italic leading-snug">
              "The sidewalk is the classroom. You are the student. Healing is the lesson."
            </p>
            <p className="font-body text-sm text-parchment/30 mt-3">
              Welcome to The Crosswalk.
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
