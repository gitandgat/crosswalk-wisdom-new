import { motion } from "framer-motion";

export default function CTASection() {
  return (
    <section id="contact" className="section-pad world-bg relative">
      {/* World chapter label */}
      <div className="absolute top-8 left-6 md:left-12">
        <span className="chapter-label text-amber">
          The World
        </span>
      </div>

      <div className="max-w-site mx-auto">
        <div className="max-w-2xl mx-auto text-center">

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="eyebrow mb-6"
          >
            Your first step
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-4xl md:text-5xl lg:text-6xl text-ink leading-tight mb-6"
          >
            The ward will always be there.
            <br />
            <span className="text-forest">Your world is waiting.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="font-body text-base md:text-lg text-charcoal leading-relaxed mb-10"
          >
            Start by running the numbers. The MCCQE Reality Calculator takes 5 minutes
            and shows you the real cost of staying on the pathway versus pivoting now —
            time, money, match probability, and immigration. It&rsquo;s free.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a
              href="/img"
              className="inline-flex items-center justify-center px-8 py-4 bg-ink text-parchment font-body font-medium text-base rounded-full hover:bg-charcoal transition-colors duration-200"
            >
              Get the free calculator →
            </a>
            <a
              href="/img"
              className="inline-flex items-center justify-center px-8 py-4 border border-ink/20 text-ink font-body font-medium text-base rounded-full hover:bg-ink hover:text-parchment transition-colors duration-200"
            >
              See the full pivot guide →
            </a>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="font-body text-sm text-muted mt-6"
          >
            Or email Sahawat directly:{" "}
            <a
              href="mailto:sahawat@crosswalkwisdom.com"
              className="text-forest underline underline-offset-4 hover:text-forest-mid transition-colors"
            >
              sahawat@crosswalkwisdom.com
            </a>
          </motion.p>

        </div>
      </div>
    </section>
  );
}
