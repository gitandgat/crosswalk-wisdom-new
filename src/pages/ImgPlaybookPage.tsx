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

const WEEKS = [
  {
    week: "Week 1",
    title: "Reframe the Resume",
    color: "border-l-violet-400",
    steps: [
      "The MD-to-Market translation — rewriting your experience in non-clinical language",
      "Which roles to remove, keep, and reframe",
      "The one-paragraph professional summary that doesn't apologize for your background",
      "LinkedIn profile overhaul — positioning your MD as a differentiator",
    ],
  },
  {
    week: "Week 2",
    title: "Target the Right Roles",
    color: "border-l-violet-400",
    steps: [
      "3 specific role types to apply for immediately — with job board search strings",
      "How to identify which postings are actually IMG-friendly",
      "The hidden job market for medical background candidates",
      "Which companies actively recruit non-practicing physicians",
    ],
  },
  {
    week: "Week 3",
    title: "Reach Out with Precision",
    color: "border-l-violet-400",
    steps: [
      "LinkedIn connection message templates (tested, not generic)",
      "Cold email scripts for reaching hiring managers directly",
      "How to leverage the IMG community for warm introductions",
      "The follow-up sequence that gets replies",
    ],
  },
  {
    week: "Week 4",
    title: "Win the Interview",
    color: "border-l-violet-400",
    steps: [
      "How to answer: \"Why aren't you practicing medicine?\" (without lying or over-explaining)",
      "Framing your transition as strategic, not reactive",
      "The 3 competency stories every non-clinical interviewer wants",
      "Salary negotiation starting points for each of the 12 career paths",
    ],
  },
];

const FAQS = [
  {
    q: "What if I haven't decided to stop yet — is this still useful?",
    a: "Yes. Many people buy this to test the waters — to see if landing non-clinical income is even realistic before fully committing to the pivot. It's a low-risk way to build optionality.",
  },
  {
    q: "How realistic is 30 days?",
    a: "The 30-day timeline assumes consistent, focused effort — not 8 hours a day. Most people doing this alongside other commitments see first interviews by week 3. First offers vary by role and market.",
  },
  {
    q: "Is this Canada-specific?",
    a: "The job board links and salary ranges are Canada-focused. The resume, outreach, and interview frameworks apply anywhere.",
  },
  {
    q: "Does this address the immigration question?",
    a: "Yes — Week 2 includes guidance on which roles fall under NOC codes that preserve Express Entry eligibility, and which paths require you to consult an immigration adviser before committing.",
  },
  {
    q: "What if I want a refund?",
    a: "Email sahawat@crosswalkwisdom.com. Full refund, no questions asked.",
  },
];

export default function ImgPlaybookPage() {
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
            className="font-body text-xs tracking-widest uppercase text-violet-400/70 mb-5"
          >
            $47 Playbook
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display text-4xl md:text-6xl leading-tight mb-6"
          >
            The IMG Survival Playbook
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="font-body text-lg md:text-xl text-parchment/70 leading-relaxed mb-4 max-w-2xl"
          >
            How to land non-clinical income in 30 days —
            without hiding your medical degree.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="font-body text-base text-parchment/50 leading-relaxed mb-10 max-w-2xl"
          >
            Financial fear is the #1 reason IMGs stay on the treadmill. This
            playbook solves the immediate money problem — which unlocks every
            other decision.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 items-start sm:items-center"
          >
            <a
              href="https://sahawat.gumroad.com/l/img-survival-playbook"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-violet-600 text-white font-body font-semibold text-base rounded-sm hover:bg-violet-500 transition-colors"
            >
              Get the playbook — $47
              <ArrowRight size={16} />
            </a>
            <p className="font-body text-sm text-parchment/40">
              PDF + templates · Instant download · 30-day action plan
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── THE PROBLEM ── */}
      <section className="px-6 md:px-12 py-20 md:py-28 bg-parchment">
        <div className="max-w-3xl mx-auto">
          <motion.p {...fadeUp(0)} className="eyebrow mb-4">Why IMGs stay stuck</motion.p>
          <motion.h2 {...fadeUp(0.1)} className="font-display text-3xl md:text-5xl text-ink leading-tight mb-8">
            The treadmill isn't kept running
            <br />
            <span className="text-forest">by hope. It's kept running by fear.</span>
          </motion.h2>

          <motion.div {...fadeUp(0.2)} className="space-y-5 font-body text-base md:text-lg text-charcoal leading-relaxed">
            <p>
              Research on unmatched IMGs in Canada consistently identifies financial
              fear as the primary reason people don't stop — even when they know the
              path isn't working.
            </p>
            <p>
              The logic is circular and paralyzing: <em>"I can't afford to stop
              because I don't have income. I don't have income because I'm still
              on the exam path. I can't leave the exam path because I can't afford
              to stop."</em>
            </p>
            <p>
              This playbook breaks the cycle. Not by telling you to "take the leap"
              — but by showing you how to build the bridge first.
            </p>
            <p className="font-medium text-ink">
              When the financial fear is neutralized, every other decision becomes
              possible.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── 4 WEEKS ── */}
      <section className="bg-ink text-parchment px-6 md:px-12 py-20 md:py-28">
        <div className="max-w-3xl mx-auto">
          <motion.p {...fadeUp(0)} className="font-body text-xs tracking-widest uppercase text-parchment/30 mb-4">
            The 30-day plan
          </motion.p>
          <motion.h2 {...fadeUp(0.1)} className="font-display text-3xl md:text-4xl leading-tight mb-12">
            Week by week.
            <br />
            Step by step.
          </motion.h2>

          <div className="space-y-8">
            {WEEKS.map((week, i) => (
              <motion.div
                key={i}
                {...fadeUp(0.1 * i)}
                className={`border-l-4 ${week.color} pl-6 py-2`}
              >
                <p className="font-body text-xs font-semibold tracking-widest uppercase text-parchment/30 mb-1">
                  {week.week}
                </p>
                <h3 className="font-display text-2xl text-violet-400 mb-4">{week.title}</h3>
                <ul className="space-y-2.5">
                  {week.steps.map((step, j) => (
                    <li key={j} className="flex items-start gap-3">
                      <Check size={14} className="text-violet-400 mt-1 flex-shrink-0" />
                      <span className="font-body text-sm text-parchment/65 leading-relaxed">{step}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TEMPLATES ── */}
      <section className="px-6 md:px-12 py-20 bg-parchment">
        <div className="max-w-3xl mx-auto">
          <motion.h2 {...fadeUp(0)} className="font-display text-3xl md:text-4xl text-ink leading-tight mb-4">
            Included: ready-to-use templates
          </motion.h2>
          <motion.p {...fadeUp(0.1)} className="font-body text-base text-charcoal leading-relaxed mb-8">
            Not frameworks to fill in. Actual templates you edit with your name and role.
          </motion.p>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              "Resume summary — 3 versions for 3 different target roles",
              "LinkedIn headline + About section",
              "Cold outreach email (initial contact)",
              "LinkedIn connection request message",
              "Follow-up sequence (3 messages)",
              "\"Why aren't you practicing?\" interview answer (3 variations)",
              "Salary negotiation opener",
              "AI prompt for customizing all templates to your specific situation",
            ].map((item, i) => (
              <motion.div key={i} {...fadeUp(0.05 * i)} className="flex items-start gap-3 bg-white border border-border rounded-sm px-4 py-3">
                <Check size={14} className="text-violet-600 mt-0.5 flex-shrink-0" />
                <span className="font-body text-sm text-charcoal leading-snug">{item}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICE ANCHOR ── */}
      <section className="bg-[#1E1C1A] text-parchment px-6 md:px-12 py-20 md:py-28">
        <div className="max-w-2xl mx-auto">
          <motion.h2 {...fadeUp(0)} className="font-display text-3xl md:text-5xl leading-tight mb-8">
            The math that makes
            <br />
            <span className="text-violet-400">$47 obvious.</span>
          </motion.h2>
          <div className="space-y-4 mb-10">
            {[
              { label: "One more MCCQE prep course", cost: "$500–$1,500" },
              { label: "One more NAC exam registration", cost: "$3,145" },
              { label: "One year of your life on the treadmill", cost: "Incalculable" },
              { label: "This playbook", cost: "$47" },
            ].map((row, i) => (
              <motion.div
                key={i}
                {...fadeUp(0.08 * i)}
                className={`flex items-center justify-between py-3 border-b border-parchment/10 ${i === 3 ? "border-b-0" : ""}`}
              >
                <span className={`font-body text-sm ${i === 3 ? "text-violet-400 font-semibold" : "text-parchment/60"}`}>
                  {row.label}
                </span>
                <span className={`font-display text-xl ${i === 3 ? "text-violet-400" : "text-parchment/40"}`}>
                  {row.cost}
                </span>
              </motion.div>
            ))}
          </div>
          <motion.a
            {...fadeUp(0.4)}
            href="https://sahawat.gumroad.com/l/img-survival-playbook"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-10 py-5 bg-violet-600 text-white font-body font-semibold text-lg rounded-sm hover:bg-violet-500 transition-colors"
          >
            Get the playbook — $47
            <ArrowRight size={18} />
          </motion.a>
          <p className="font-body text-xs text-parchment/30 mt-4">
            PDF + templates · Instant download · Money-back guarantee
          </p>
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
