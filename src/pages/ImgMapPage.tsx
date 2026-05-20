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

const PATHS = [
  { name: "Clinical Research Coordinator", income: "$55K–$80K", timeline: "2–4 weeks" },
  { name: "Medical Writer / Health Communicator", income: "$65K–$110K", timeline: "2–6 weeks" },
  { name: "Pharmaceutical / Medical Device Sales", income: "$75K–$130K+", timeline: "3–6 weeks" },
  { name: "Health Technology Analyst", income: "$70K–$100K", timeline: "4–8 weeks" },
  { name: "Insurance Reviewer / Medico-Legal Consultant", income: "$80K–$140K", timeline: "2–4 weeks" },
  { name: "Patient Navigator / Advocate", income: "$50K–$75K", timeline: "1–3 weeks" },
  { name: "Public Health Analyst", income: "$60K–$90K", timeline: "4–10 weeks" },
  { name: "Medical Educator / Faculty", income: "$55K–$85K", timeline: "4–8 weeks" },
  { name: "Health Coaching (Private Practice)", income: "$40K–$120K+", timeline: "2–6 weeks" },
  { name: "Hospital / Health System Administration", income: "$65K–$95K", timeline: "4–10 weeks" },
  { name: "Telemedicine Platform Reviewer", income: "$60K–$90K", timeline: "1–3 weeks" },
  { name: "Online Coaching / Content (Your Path)", income: "$20K–$200K+", timeline: "Immediately" },
];

const FAQS = [
  {
    q: "Are these Canadian-specific?",
    a: "Yes. Income ranges are in CAD and based on Canadian market data. Each path includes notes on provincial variation where relevant.",
  },
  {
    q: "Do I need additional credentials for these roles?",
    a: "Some do, some don't. The guide is clear about which paths you can enter immediately with your MD, which require a short certification, and which require retraining. No surprises.",
  },
  {
    q: "What does \"time to first paycheck\" mean?",
    a: "A realistic estimate of how long from today to your first income in that role — including job search time, interviews, and notice period. Not the theoretical minimum. The actual average.",
  },
  {
    q: "Is this just a list of jobs I could Google?",
    a: "No. The specific value is in: (1) which roles treat your MD as an advantage rather than an obstacle, (2) the honest income ranges vs. what job boards show, (3) the AI prompt for researching each path in your specific city and situation.",
  },
  {
    q: "What if I want a refund?",
    a: "Email sahawat@crosswalkwisdom.com. Full refund, no questions asked.",
  },
];

export default function ImgMapPage() {
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
            className="font-body text-xs tracking-widest uppercase text-teal-400/70 mb-5"
          >
            $37 Guide
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display text-4xl md:text-6xl leading-tight mb-6"
          >
            The IMG Career Map
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="font-body text-lg md:text-xl text-parchment/70 leading-relaxed mb-4 max-w-2xl"
          >
            12 paths where your medical degree is an asset, not a liability.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="font-body text-base text-parchment/50 leading-relaxed mb-10 max-w-2xl"
          >
            Not a list. A map. Each path includes realistic income in Canada, time
            to first paycheck, and one concrete first step you can take this week.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 items-start sm:items-center"
          >
            <a
              href="https://sahawat.gumroad.com/l/img-career-map"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-teal-600 text-white font-body font-semibold text-base rounded-sm hover:bg-teal-500 transition-colors"
            >
              Get the map — $37
              <ArrowRight size={16} />
            </a>
            <p className="font-body text-sm text-parchment/40">
              PDF · Instant download · Canadian market data
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── THE GAP ── */}
      <section className="px-6 md:px-12 py-20 md:py-28 bg-parchment">
        <div className="max-w-3xl mx-auto">
          <motion.p {...fadeUp(0)} className="eyebrow mb-4">The problem with existing advice</motion.p>
          <motion.h2 {...fadeUp(0.1)} className="font-display text-3xl md:text-5xl text-ink leading-tight mb-8">
            "Go back to school"
            <br />
            <span className="text-forest">is not a map.</span>
          </motion.h2>

          <motion.div {...fadeUp(0.2)} className="space-y-5 font-body text-base md:text-lg text-charcoal leading-relaxed">
            <p>
              The advice IMGs get when they consider pivoting is almost always
              one of two things: "try again next year" or "go get another degree."
            </p>
            <p>
              Nobody tells them that their medical training is already one of the
              most valuable backgrounds in the non-clinical job market. Clinical
              research coordinators with MD backgrounds get hired over candidates
              with master's degrees. Medical writers who trained as physicians earn
              30% more than those who didn't. Insurance reviewers with clinical
              backgrounds are actively recruited.
            </p>
            <p>
              The problem isn't that the paths don't exist. The problem is that no
              one has mapped them for an IMG in Canada — with realistic numbers,
              realistic timelines, and a realistic first step.
            </p>
            <p className="font-medium text-ink">
              40% of IMGs who pivot are still unemployed years later. Not because
              there are no options. Because nobody gave them a map.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── THE 12 PATHS ── */}
      <section className="bg-ink text-parchment px-6 md:px-12 py-20 md:py-28">
        <div className="max-w-4xl mx-auto">
          <motion.p {...fadeUp(0)} className="font-body text-xs tracking-widest uppercase text-parchment/30 mb-4">
            The 12 paths
          </motion.p>
          <motion.h2 {...fadeUp(0.1)} className="font-display text-3xl md:text-4xl leading-tight mb-4">
            Each one treats your MD
            <br />
            as the advantage it actually is.
          </motion.h2>
          <motion.p {...fadeUp(0.15)} className="font-body text-sm text-parchment/40 mb-12">
            Income in CAD. Timelines are realistic averages, not best-case scenarios.
          </motion.p>

          <div className="grid md:grid-cols-2 gap-3">
            {PATHS.map((path, i) => (
              <motion.div
                key={i}
                {...fadeUp(0.04 * i)}
                className="flex items-center justify-between gap-4 border border-parchment/10 rounded-sm px-5 py-4 bg-parchment/5"
              >
                <div>
                  <p className="font-body text-sm font-medium text-parchment/85 leading-snug">{path.name}</p>
                  <p className="font-body text-xs text-teal-400 mt-1">{path.income} · {path.timeline} to first paycheck</p>
                </div>
                <Check size={14} className="text-teal-500 flex-shrink-0" />
              </motion.div>
            ))}
          </div>

          <motion.p {...fadeUp(0.6)} className="font-body text-xs text-parchment/30 mt-8">
            Each path in the full guide includes: what it is, why your MD is an advantage,
            income range, time to first paycheck, first step this week, and an AI prompt
            to research it for your specific city and background.
          </motion.p>
        </div>
      </section>

      {/* ── WHAT'S INSIDE ── */}
      <section className="px-6 md:px-12 py-20 bg-parchment">
        <div className="max-w-3xl mx-auto">
          <motion.h2 {...fadeUp(0)} className="font-display text-3xl md:text-4xl text-ink leading-tight mb-10">
            What's inside the guide
          </motion.h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              "12 non-clinical career paths where an MD is a hiring advantage",
              "Realistic Canadian income ranges (Year 1 and Year 3)",
              "Time-to-first-paycheck for each path",
              "Why your medical background is an asset in each role",
              "One concrete first step for each path — this week",
              "An AI prompt to research each path for your city",
              "Which paths preserve your immigration status",
              "Which paths can generate income while you're still deciding",
            ].map((item, i) => (
              <motion.div key={i} {...fadeUp(0.06 * i)} className="flex items-start gap-3">
                <Check size={15} className="text-teal-600 mt-0.5 flex-shrink-0" />
                <span className="font-body text-sm text-charcoal leading-relaxed">{item}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-[#1E1C1A] text-parchment px-6 md:px-12 py-20 md:py-28">
        <div className="max-w-2xl mx-auto text-center">
          <motion.h2 {...fadeUp(0)} className="font-display text-3xl md:text-5xl leading-tight mb-6">
            $37 is less than one
            <br />
            <span className="text-teal-400">MCCQE prep book.</span>
          </motion.h2>
          <motion.p {...fadeUp(0.1)} className="font-body text-base md:text-lg text-parchment/65 leading-relaxed mb-10">
            And it opens 12 doors that book never mentioned.
          </motion.p>
          <motion.a
            {...fadeUp(0.2)}
            href="https://sahawat.gumroad.com/l/img-career-map"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-10 py-5 bg-teal-600 text-white font-body font-semibold text-lg rounded-sm hover:bg-teal-500 transition-colors"
          >
            Get the map — $37
            <ArrowRight size={18} />
          </motion.a>
          <motion.p {...fadeUp(0.25)} className="font-body text-xs text-parchment/30 mt-4">
            PDF · Instant download · Money-back guarantee
          </motion.p>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="bg-parchment px-6 md:px-12 py-20">
        <div className="max-w-2xl mx-auto">
          <motion.h2 {...fadeUp(0)} className="font-display text-3xl text-ink mb-10">Questions</motion.h2>
          <div className="space-y-0">
            {FAQS.map((faq, i) => (
              <motion.div key={i} {...fadeUp(0.06 * i)} className="border-t border-border">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 py-5 text-left"
                >
                  <span className="font-body text-base text-ink leading-snug">{faq.q}</span>
                  <ChevronDown
                    size={16}
                    className={`flex-shrink-0 text-muted transition-transform ${openFaq === i ? "rotate-180" : ""}`}
                  />
                </button>
                {openFaq === i && (
                  <p className="font-body text-sm text-charcoal leading-relaxed pb-5">{faq.a}</p>
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
