import { motion } from "framer-motion";

const beliefs = [
  {
    number: "01",
    title: "The match rate is not a referendum on your worth.",
    body: "10–22% is a structural outcome, not a personal one. Canadian graduates match at 97% — not because they're better doctors, but because the system was built for them.",
  },
  {
    number: "02",
    title: "The identity cage is the real prison — not the exam.",
    body: "\"I am a doctor\" isn't a description — it's a load-bearing wall. The licensing pathway exploits that. Dismantling it feels like dying. It's also where your real life begins.",
  },
  {
    number: "03",
    title: "Sunk costs are not a reason to stay. They're a reason to grieve and move.",
    body: "Every year and dollar spent on the pathway is real. And it has already been spent. The only question is whether the next year and dollar follow them into a system that wasn't designed for you.",
  },
  {
    number: "04",
    title: "Your MD is worth more outside the pathway than inside it.",
    body: "Clinical research. Medical writing. Pharma. Health tech. Insurance. Twelve roles exist where your training is an active hiring advantage — not an obstacle.",
  },
  {
    number: "05",
    title: "The immigration door doesn't close when the exam door does.",
    body: "Non-clinical roles under the right NOC codes preserve Express Entry eligibility. Stopping the exam path is not the same as stopping Canada.",
  },
  {
    number: "06",
    title: "AI is not the future of medicine. It's the bridge to your next chapter.",
    body: "30 minutes with the right prompts can decode two years of identity confusion. You already have the wisdom. AI gives you the mirror.",
  },
  {
    number: "07",
    title: "The sidewalk is smarter than the prep course.",
    body: "The most important decision you'll make doesn't require another $1,500 course. It requires stopping long enough to look at the math — and believe it.",
  },
];

export default function BeliefsSection() {
  return (
    <section id="beliefs" className="section-pad bg-parchment">
      <div className="max-w-site mx-auto">

        {/* Header */}
        <div className="max-w-2xl mb-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="eyebrow mb-5"
          >
            What we believe
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-4xl md:text-5xl text-ink leading-tight"
          >
            7 things no one told you
            <br />
            when you started the pathway.
          </motion.h2>
        </div>

        {/* Beliefs grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
          {beliefs.map((belief, i) => (
            <motion.div
              key={belief.number}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="bg-parchment p-8 group hover:bg-forest-light transition-colors duration-300"
            >
              <span className="font-body text-xs font-medium text-forest/40 tracking-widest2 block mb-4 group-hover:text-forest transition-colors duration-300">
                {belief.number}
              </span>
              <h3 className="font-display text-xl md:text-2xl text-ink leading-snug mb-4 group-hover:text-forest transition-colors duration-300">
                {belief.title}
              </h3>
              <p className="font-body text-sm md:text-base text-muted leading-relaxed">
                {belief.body}
              </p>
            </motion.div>
          ))}

          {/* Last cell: CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.56 }}
            className="bg-forest p-8 flex flex-col justify-between"
          >
            <div>
              <span className="font-body text-xs font-medium text-forest-light/60 tracking-widest2 block mb-4">
                Ready?
              </span>
              <p className="font-display text-xl md:text-2xl text-parchment leading-snug mb-4">
                What is the real cost of continuing?
              </p>
              <p className="font-body text-sm text-parchment/70 leading-relaxed">
                The MCCQE Reality Calculator runs the numbers in 5 minutes — time, money, match probability, and immigration. Free.
              </p>
            </div>
            <a
              href="/img"
              className="mt-8 inline-flex items-center gap-2 font-body text-sm font-medium bg-parchment text-forest px-5 py-3 rounded-sm hover:bg-forest-light transition-colors duration-200 self-start"
            >
              Get the free calculator →
            </a>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
