import { motion } from "framer-motion";
import { ArrowRight, Check, ChevronDown } from "lucide-react";
import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7, delay },
});

const FAQS = [
  {
    q: "I'm not sure I want to stop pursuing medicine. Is this still for me?",
    a: "Yes — and it's especially for you. This guide doesn't tell you to quit. It gives you a framework to make the decision clearly, without the sunk cost trap distorting your thinking. Some people read it and recommit to the path with better strategy. Most realize they already knew the answer.",
  },
  {
    q: "Is this specific to Canada?",
    a: "The decision framework applies to any IMG anywhere. The statistics and immigration context are Canada-specific, but the sunk cost psychology and identity work are universal.",
  },
  {
    q: "How long does it take to read?",
    a: "About 45–60 minutes cover to cover. Most people say the Decision Framework section alone — about 20 minutes — is where the clarity happens.",
  },
  {
    q: "What format is it?",
    a: "A downloadable PDF, delivered instantly after purchase via Gumroad.",
  },
  {
    q: "What if it doesn't help?",
    a: "Email sahawat@crosswalkwisdom.com and you'll get a full refund. No questions asked.",
  },
];

export default function ImgPivotPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-parchment">
      <Navbar />

      {/* ── HERO ── */}
      <section className="bg-[#1E1C1A] text-parchment px-6 md:px-12 py-20 md:py-32">
        <div className="max-w-3xl mx-auto">
          <motion.a
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            href="/img"
            className="inline-flex items-center gap-1 font-body text-xs text-parchment/30 hover:text-parchment/60 transition-colors mb-8"
          >
            ← Back to the IMG Pivot Guide
          </motion.a>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.05 }}
            className="font-body text-xs tracking-widest uppercase text-amber-400/70 mb-5"
          >
            $17 Guide
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display text-4xl md:text-6xl leading-tight mb-6"
          >
            Should You Keep Going?
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="font-body text-lg md:text-xl text-parchment/70 leading-relaxed mb-8 max-w-2xl"
          >
            The honest guide for IMGs who are tired of not knowing — and done
            letting sunk costs make the decision for them.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 items-start sm:items-center"
          >
            <a
              href="https://sahawat.gumroad.com/l/should-you-keep-going"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-amber-400 text-ink font-body font-semibold text-base rounded-sm hover:bg-amber-300 transition-colors"
            >
              Get the guide — $17
              <ArrowRight size={16} />
            </a>
            <p className="font-body text-sm text-parchment/40">
              PDF · Instant download · Full refund if it doesn't help
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── THE TRAP ── */}
      <section className="px-6 md:px-12 py-20 md:py-28 bg-parchment">
        <div className="max-w-3xl mx-auto">
          <motion.p {...fadeUp(0)} className="eyebrow mb-4">The problem</motion.p>
          <motion.h2 {...fadeUp(0.1)} className="font-display text-3xl md:text-5xl text-ink leading-tight mb-8">
            You already know the answer.
            <br />
            <span className="text-forest">The sunk cost won't let you say it.</span>
          </motion.h2>

          <motion.div {...fadeUp(0.2)} className="space-y-5 font-body text-base md:text-lg text-charcoal leading-relaxed">
            <p>
              There's a moment — usually at 2am, after another rejection or another
              failed exam — when the question becomes impossible to ignore.
            </p>
            <p>
              <em>Is this actually worth it?</em>
            </p>
            <p>
              And then, almost immediately, your brain floods with reasons to keep
              going. The money you've already spent. The years you've already given.
              The expectations of people who sacrificed for you to get here. The
              immigration status you might lose if you stop.
            </p>
            <p>
              This is the sunk cost trap. And it's not a weakness — it's a
              cognitive bias that affects every rational person who has invested
              deeply in something. Physicians are especially vulnerable to it,
              because the investment isn't just financial. It's identity.
            </p>
            <p className="font-medium text-ink">
              The trap keeps you running on the treadmill — not because the
              destination is worth reaching, but because stopping feels like
              losing everything you've already spent.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── WHAT'S INSIDE ── */}
      <section className="bg-ink text-parchment px-6 md:px-12 py-20 md:py-28">
        <div className="max-w-3xl mx-auto">
          <motion.p {...fadeUp(0)} className="font-body text-xs tracking-widest uppercase text-parchment/30 mb-4">
            What's inside
          </motion.p>
          <motion.h2 {...fadeUp(0.1)} className="font-display text-3xl md:text-4xl leading-tight mb-12">
            15 pages. Three sections.
            <br />
            One decision — made clearly.
          </motion.h2>

          <div className="space-y-8">
            {[
              {
                num: "01",
                title: "The Real Math",
                items: [
                  "The verified statistics on IMG match rates nobody showed you upfront",
                  "Your true cost-to-continue vs. cost-to-pivot (the numbers, not opinions)",
                  "The immigration reality: which pivot paths preserve your status",
                  "What the research says about IMGs who stayed vs. IMGs who pivoted",
                ],
              },
              {
                num: "02",
                title: "The Sunk Cost Decoder",
                items: [
                  "The 4 layers of the sunk cost trap specific to IMGs",
                  "How to separate \"I want to keep going\" from \"I'm afraid to stop\"",
                  "The identity fusion mechanism — why leaving feels like dying",
                  "What behavioral economics says about making decisions under sunk cost pressure",
                ],
              },
              {
                num: "03",
                title: "The Decision Framework",
                items: [
                  "A structured exercise: what would a wise mentor who loves you AND knows the data say?",
                  "The 5 questions that bypass sunk cost thinking",
                  "How to make this decision without needing to tell anyone yet",
                  "What to do in the 48 hours after you decide — whichever way you decide",
                ],
              },
            ].map((section, i) => (
              <motion.div key={i} {...fadeUp(0.1 * i)} className="border-t border-parchment/10 pt-8">
                <div className="flex items-start gap-5">
                  <span className="font-display text-4xl text-parchment/20 leading-none flex-shrink-0">
                    {section.num}
                  </span>
                  <div>
                    <h3 className="font-display text-2xl text-amber-400 mb-4">{section.title}</h3>
                    <ul className="space-y-2.5">
                      {section.items.map((item, j) => (
                        <li key={j} className="flex items-start gap-3">
                          <Check size={15} className="text-forest mt-1 flex-shrink-0" />
                          <span className="font-body text-sm text-parchment/70 leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── QUOTE ── */}
      <section className="px-6 md:px-12 py-16 bg-amber-50 border-y border-amber-200">
        <div className="max-w-2xl mx-auto text-center">
          <motion.p {...fadeUp(0)} className="font-display text-2xl md:text-3xl text-ink leading-relaxed mb-6">
            "The feeling of failure is immense."
          </motion.p>
          <motion.p {...fadeUp(0.1)} className="font-body text-sm text-muted">
            — Direct quote from an unmatched residency applicant, cited in{" "}
            <em>Academic Medicine</em> (2023). One of 206 applicants studied.
          </motion.p>
          <motion.p {...fadeUp(0.2)} className="font-body text-base text-charcoal mt-6 leading-relaxed">
            It's not failure. It's a system with a 10–22% acceptance rate that
            never told you the odds. This guide gives you what the system didn't.
          </motion.p>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="px-6 md:px-12 py-20 md:py-28 bg-parchment">
        <div className="max-w-2xl mx-auto text-center">
          <motion.h2 {...fadeUp(0)} className="font-display text-3xl md:text-5xl text-ink leading-tight mb-6">
            $17 is less than one
            <br />
            <span className="text-forest">practice question bank session.</span>
          </motion.h2>
          <motion.p {...fadeUp(0.1)} className="font-body text-base md:text-lg text-charcoal leading-relaxed mb-10">
            And it might save you another year on a path that isn't working.
            Full refund if it doesn't help.
          </motion.p>
          <motion.a
            {...fadeUp(0.2)}
            href="https://sahawat.gumroad.com/l/should-you-keep-going"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-10 py-5 bg-forest text-parchment font-body font-semibold text-lg rounded-sm hover:bg-forest/90 transition-colors"
          >
            Get the guide — $17
            <ArrowRight size={18} />
          </motion.a>
          <motion.p {...fadeUp(0.25)} className="font-body text-xs text-muted mt-4">
            PDF · Instant download via Gumroad · Money-back guarantee
          </motion.p>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="bg-ink text-parchment px-6 md:px-12 py-20">
        <div className="max-w-2xl mx-auto">
          <motion.h2 {...fadeUp(0)} className="font-display text-3xl text-parchment mb-10">
            Questions
          </motion.h2>
          <div className="space-y-0">
            {FAQS.map((faq, i) => (
              <motion.div key={i} {...fadeUp(0.06 * i)} className="border-t border-parchment/10">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 py-5 text-left"
                >
                  <span className="font-body text-base text-parchment/85 leading-snug">{faq.q}</span>
                  <ChevronDown
                    size={16}
                    className={`flex-shrink-0 text-parchment/40 transition-transform ${openFaq === i ? "rotate-180" : ""}`}
                  />
                </button>
                {openFaq === i && (
                  <p className="font-body text-sm text-parchment/60 leading-relaxed pb-5">{faq.a}</p>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <div className="h-2 crosswalk-stripes opacity-40" />
      <Footer />
    </div>
  );
}
