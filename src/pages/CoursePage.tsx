import { motion } from "framer-motion";
import { ArrowRight, Check, ChevronDown } from "lucide-react";
import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7, delay },
});

const curriculum = [
  {
    week: "Week 1",
    stage: "STOP",
    title: "The Art of Pausing",
    color: "bg-amber-50 border-amber-200",
    tagColor: "bg-amber-100 text-amber-800",
    modules: [
      "Why 'pushing through' is making it worse — the neuroscience of chronic stress",
      "The Grief Framework: naming what you're actually feeling (it's not burnout)",
      "Your Fear Audit results decoded — Financial, Judgment, or Identity?",
      "The Permission Exercise: giving yourself a defined space to stop",
    ],
  },
  {
    week: "Week 2",
    stage: "START",
    title: "Mapping Your Identity",
    color: "bg-sky-50 border-sky-200",
    tagColor: "bg-sky-100 text-sky-800",
    modules: [
      "Who were you before the title? Recovering the self beneath the career",
      "The Identity Inventory: a structured exercise to map what you value, not what you do",
      "Your transferable skills translated — from clinical to the world's most in-demand competencies",
      "The Career Crosswalk Map: visualizing every path available to someone with your background",
    ],
  },
  {
    week: "Week 3",
    stage: "ELDER",
    title: "Drawing on Your Wisdom",
    color: "bg-teal-50 border-teal-200",
    tagColor: "bg-teal-100 text-teal-800",
    modules: [
      "What 10+ years taught you that you don't yet see as valuable — and why the market disagrees",
      "AI as your career strategy partner: using Claude and ChatGPT to stress-test your transition",
      "Building your transition brief: the one-page document that replaces the résumé",
      "Income bridge options: how to earn during the crossing without starting from zero",
    ],
  },
  {
    week: "Week 4",
    stage: "HUMAN",
    title: "Crossing with Courage",
    color: "bg-violet-50 border-violet-200",
    tagColor: "bg-violet-100 text-violet-800",
    modules: [
      "The Courage to Choose framework: making the decision with clarity, not desperation",
      "Your 90-day action plan — a concrete timeline built around your real constraints",
      "Community and accountability: how to stay in motion when fear creeps back",
      "The Crossing Ceremony: a closing ritual to mark the end of the cage and the start of what's next",
    ],
  },
];

const included = [
  {
    title: "4 weeks of video lessons",
    detail: "16 modules delivered through your Systeme.io dashboard — watch at your own pace, return anytime.",
  },
  {
    title: "The Fear Audit workbook (PDF)",
    detail: "A printable companion guide to identify and track the fear pattern running your decisions.",
  },
  {
    title: "AI Prompt Pack for career transitions",
    detail: "35 tested prompts for using Claude and ChatGPT to map your next chapter — no AI experience needed.",
  },
  {
    title: "The Courage to Choose PDF",
    detail: "The $27 guide included free. The practical playbook for your next chapter.",
  },
  {
    title: "Private community access",
    detail: "A space for healthcare professionals in transition — no toxic positivity, just real conversation.",
  },
  {
    title: "Live Q&A calls (founding cohort)",
    detail: "Founding members get weekly live calls for the duration of the course. Ask anything.",
  },
];

const faqs = [
  {
    q: "Do I have to quit my job to take this course?",
    a: "No. The Crosswalk Method is designed for people who are still working — people who need clarity before they make any move. You'll leave with a plan, not a resignation letter.",
  },
  {
    q: "I've been in healthcare for 20 years. Is this still relevant?",
    a: "Especially for you. The longer you've been in, the deeper the identity cage. The framework was built for long-tenured professionals, not people in their first five years.",
  },
  {
    q: "What if I don't know what I want to do next?",
    a: "That's exactly where we start. The first two weeks are specifically about uncovering what's underneath the uncertainty — before we talk about any specific career path.",
  },
  {
    q: "How much time does this take per week?",
    a: "Each week has approximately 2 hours of video content plus one worksheet. Most students complete it in 3–4 hours per week, including reflection time.",
  },
  {
    q: "What's the difference between this and the 1:1 coaching program?",
    a: "The course gives you the full framework at your own pace. The 1:1 Crosswalk Program ($1,500–3,000) is for people who want personalized support and accountability through the crossing itself. Many people do the course first.",
  },
  {
    q: "Is there a refund policy?",
    a: "Yes. If you complete Week 1 and feel the course isn't right for you, we'll refund you fully. No questions asked.",
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-border last:border-0">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-start justify-between py-5 text-left gap-4"
      >
        <span className="font-body text-base md:text-lg text-ink font-medium">{q}</span>
        <ChevronDown
          size={18}
          className={`flex-shrink-0 mt-0.5 text-muted transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <p className="font-body text-sm md:text-base text-charcoal leading-relaxed pb-5 -mt-1">
          {a}
        </p>
      )}
    </div>
  );
}

export default function CoursePage() {
  return (
    <div className="min-h-screen bg-parchment">
      <Navbar />

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-parchment pt-20">
        <div className="absolute top-0 left-0 right-0 h-1 crosswalk-stripes opacity-60" />

        <div className="max-w-site mx-auto px-6 md:px-12 lg:px-20 xl:px-32 py-24 md:py-32">
          <div className="max-w-4xl">
            <motion.p {...fade(0.1)} className="eyebrow mb-8">
              The Crosswalk Method · 4-Week Course
            </motion.p>

            <motion.div {...fade(0.2)} className="mb-6">
              <p className="font-body text-base md:text-lg text-muted italic">
                What healthcare told you:
              </p>
              <p className="font-display text-2xl md:text-3xl text-muted mt-1">
                <span className="strikethrough-line">
                  "You chose this career. You owe it to your patients."
                </span>
              </p>
            </motion.div>

            <motion.h1
              {...fade(0.35)}
              className="font-display text-5xl md:text-7xl lg:text-8xl text-ink leading-none mb-8"
            >
              From the{" "}
              <em className="not-italic text-forest">Ward</em>
              <br />
              to the World.
            </motion.h1>

            <motion.p
              {...fade(0.5)}
              className="font-body text-lg md:text-xl text-charcoal leading-relaxed max-w-2xl mb-12"
            >
              A 4-week program for burned-out healthcare professionals who are
              done surviving their own career — and ready to cross into the life
              they actually chose.
            </motion.p>

            <motion.div {...fade(0.65)} className="flex flex-col sm:flex-row gap-4">
              <a
                href="/waitlist"
                className="inline-flex items-center justify-center px-8 py-4 bg-forest text-parchment font-body font-medium text-base rounded-sm hover:bg-forest-mid transition-colors duration-200"
              >
                Join the founding waitlist →
              </a>
              <a
                href="#curriculum"
                className="inline-flex items-center justify-center px-8 py-4 border border-ink/20 text-ink font-body font-medium text-base rounded-sm hover:border-forest hover:text-forest transition-colors duration-200"
              >
                See the curriculum
              </a>
            </motion.div>

            <motion.div {...fade(0.8)} className="mt-10 flex flex-col sm:flex-row gap-6">
              <p className="font-body text-sm text-muted italic">
                Founding member price: <span className="text-forest font-medium not-italic">$297</span>{" "}
                <span className="line-through">$497</span>
              </p>
              <p className="font-body text-sm text-muted italic">
                Waitlist closes when 50 spots are filled.
              </p>
            </motion.div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-1 crosswalk-stripes opacity-40" />
      </section>

      {/* ── WHO IT'S FOR ─────────────────────────────────────── */}
      <section className="section-pad bg-card">
        <div className="max-w-site mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <motion.p {...fade(0)} className="eyebrow mb-5">
                Who this is for
              </motion.p>
              <motion.h2 {...fade(0.1)} className="font-display text-4xl md:text-5xl text-ink leading-tight mb-6">
                The ward took everything. It's time to take yourself back.
              </motion.h2>
              <motion.p {...fade(0.2)} className="font-body text-base md:text-lg text-charcoal leading-relaxed">
                You built this career with everything you had. You're good at it. People depend on you. And you still
                lie awake wondering if this is really it — if the dread you feel every Sunday night is just the price
                of a stable life.
              </motion.p>
            </div>

            <div className="space-y-4">
              {[
                "You're a nurse, doctor, therapist, or allied health professional with 5+ years in the field",
                "You've tried self-care, PTO, and 'just getting through it' — and you're still here",
                "You're not sure if you want to leave, but you know something has to change",
                "You're afraid that leaving means throwing away everything you worked for",
                "You want a structured framework, not another affirmation or LinkedIn post",
                "You're willing to do the real work — the identity work, not just the career work",
              ].map((item, i) => (
                <motion.div
                  key={i}
                  {...fade(i * 0.08)}
                  className="flex items-start gap-3"
                >
                  <Check size={18} className="text-forest flex-shrink-0 mt-0.5" />
                  <p className="font-body text-base text-charcoal">{item}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── THE FRAMEWORK ────────────────────────────────────── */}
      <section className="section-pad bg-parchment">
        <div className="max-w-site mx-auto">
          <div className="max-w-2xl mb-16">
            <motion.p {...fade(0)} className="eyebrow mb-5">
              The framework
            </motion.p>
            <motion.h2 {...fade(0.1)} className="font-display text-4xl md:text-5xl text-ink leading-tight">
              Four stages. One crossing.
            </motion.h2>
            <motion.p {...fade(0.2)} className="font-body text-base md:text-lg text-charcoal leading-relaxed mt-4">
              The Crosswalk Method maps the four stages of a healthcare career transition —
              the ones nobody tells you about when you're standing at the edge wondering whether to step.
            </motion.p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { stage: "STOP", label: "01", desc: "Pausing with intention. Grief is not a reason to stay — but it is a reason to slow down before you decide." },
              { stage: "START", label: "02", desc: "Mapping who you are beneath the title. Your identity was there before nursing school. It's still there." },
              { stage: "ELDER", label: "03", desc: "Everything you learned — the clinical instincts, the pressure management — is worth more than you know." },
              { stage: "HUMAN", label: "04", desc: "Crossing with a plan. Not running away. Choosing forward with clarity, courage, and a concrete next step." },
            ].map((s, i) => (
              <motion.div
                key={s.stage}
                {...fade(i * 0.1)}
                className="bg-card border border-border rounded-sm p-6"
              >
                <p className="font-body text-xs tracking-widest uppercase text-muted mb-3">{s.label}</p>
                <h3 className="font-display text-3xl text-forest mb-4">{s.stage}</h3>
                <p className="font-body text-sm text-charcoal leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CURRICULUM ───────────────────────────────────────── */}
      <section id="curriculum" className="section-pad bg-card">
        <div className="max-w-site mx-auto">
          <div className="max-w-2xl mb-16">
            <motion.p {...fade(0)} className="eyebrow mb-5">
              The curriculum
            </motion.p>
            <motion.h2 {...fade(0.1)} className="font-display text-4xl md:text-5xl text-ink leading-tight">
              Everything you'll learn, week by week.
            </motion.h2>
          </div>

          <div className="space-y-6">
            {curriculum.map((week, i) => (
              <motion.div
                key={week.week}
                {...fade(i * 0.1)}
                className={`border rounded-sm p-8 ${week.color}`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-6">
                  <span className={`inline-flex items-center px-3 py-1 rounded-sm font-body text-xs font-medium tracking-widest uppercase self-start ${week.tagColor}`}>
                    {week.week} · {week.stage}
                  </span>
                  <h3 className="font-display text-2xl md:text-3xl text-ink">{week.title}</h3>
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                  {week.modules.map((mod, j) => (
                    <div key={j} className="flex items-start gap-3">
                      <Check size={16} className="text-forest flex-shrink-0 mt-0.5" />
                      <p className="font-body text-sm text-charcoal leading-relaxed">{mod}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHAT'S INCLUDED ──────────────────────────────────── */}
      <section className="section-pad bg-parchment">
        <div className="max-w-site mx-auto">
          <div className="max-w-2xl mb-16">
            <motion.p {...fade(0)} className="eyebrow mb-5">
              What's included
            </motion.p>
            <motion.h2 {...fade(0.1)} className="font-display text-4xl md:text-5xl text-ink leading-tight">
              Everything you need to cross.
            </motion.h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {included.map((item, i) => (
              <motion.div
                key={i}
                {...fade(i * 0.08)}
                className="bg-card border border-border rounded-sm p-6"
              >
                <div className="w-8 h-8 bg-forest/10 rounded-sm flex items-center justify-center mb-4">
                  <Check size={16} className="text-forest" />
                </div>
                <h3 className="font-display text-xl text-ink mb-2">{item.title}</h3>
                <p className="font-body text-sm text-charcoal leading-relaxed">{item.detail}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ──────────────────────────────────────────── */}
      <section className="section-pad bg-forest">
        <div className="max-w-site mx-auto">
          <div className="max-w-2xl mx-auto text-center">
            <motion.p {...fade(0)} className="font-body text-xs tracking-widest uppercase text-forest-light/70 mb-5">
              Founding member pricing
            </motion.p>
            <motion.h2 {...fade(0.1)} className="font-display text-4xl md:text-5xl text-parchment leading-tight mb-6">
              Join now. Pay less. Get more.
            </motion.h2>
            <motion.p {...fade(0.2)} className="font-body text-base md:text-lg text-parchment/80 leading-relaxed mb-10">
              The first 50 members who join the waitlist lock in the founding rate and get weekly
              live Q&A access during the course — something that won't be available after launch.
            </motion.p>

            <motion.div {...fade(0.3)} className="bg-parchment rounded-sm p-8 mb-8">
              <p className="font-body text-sm text-muted uppercase tracking-widest mb-2">Founding member price</p>
              <div className="flex items-baseline justify-center gap-3 mb-2">
                <span className="font-display text-6xl text-forest">$297</span>
                <span className="font-body text-xl text-muted line-through">$497</span>
              </div>
              <p className="font-body text-sm text-muted mb-6">One-time payment · Lifetime access · Full refund if you complete Week 1 and it's not right</p>
              <div className="space-y-2 text-left mb-8">
                {[
                  "4 weeks of video lessons (16 modules)",
                  "Fear Audit workbook PDF",
                  "AI Prompt Pack (35 tested prompts)",
                  "The Courage to Choose PDF ($27 value)",
                  "Private community access",
                  "Weekly live Q&A — founding cohort only",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <Check size={15} className="text-forest flex-shrink-0" />
                    <p className="font-body text-sm text-charcoal">{item}</p>
                  </div>
                ))}
              </div>
              <a
                href="/waitlist"
                className="inline-flex items-center justify-center gap-2 w-full px-8 py-4 bg-forest text-parchment font-body font-medium text-base rounded-sm hover:bg-forest-mid transition-colors duration-200"
              >
                Join the founding waitlist
                <ArrowRight size={16} />
              </a>
            </motion.div>

            <motion.p {...fade(0.4)} className="font-body text-sm text-parchment/60 italic">
              Waitlist is free to join. You'll be notified when enrollment opens and given 48 hours to claim your founding rate.
            </motion.p>
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────── */}
      <section className="section-pad bg-parchment">
        <div className="max-w-site mx-auto">
          <div className="max-w-2xl mb-12">
            <motion.p {...fade(0)} className="eyebrow mb-5">
              Questions
            </motion.p>
            <motion.h2 {...fade(0.1)} className="font-display text-4xl md:text-5xl text-ink leading-tight">
              You probably have a few.
            </motion.h2>
          </div>

          <div className="max-w-3xl divide-y divide-border border-t border-border">
            {faqs.map((faq, i) => (
              <motion.div key={i} {...fade(i * 0.06)}>
                <FAQItem q={faq.q} a={faq.a} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ────────────────────────────────────────── */}
      <section className="section-pad bg-card border-t border-border">
        <div className="max-w-site mx-auto text-center max-w-2xl mx-auto">
          <motion.p {...fade(0)} className="eyebrow mb-5">
            The waitlist is open
          </motion.p>
          <motion.h2 {...fade(0.1)} className="font-display text-4xl md:text-6xl text-ink leading-tight mb-6">
            The ward will always be there. Your world is waiting.
          </motion.h2>
          <motion.p {...fade(0.2)} className="font-body text-base md:text-lg text-charcoal leading-relaxed mb-10">
            You don't have to decide today. But if you've been reading this and something
            has been quietly saying <em>yes</em> — that's worth paying attention to.
          </motion.p>
          <motion.a
            {...fade(0.3)}
            href="/waitlist"
            className="inline-flex items-center justify-center gap-2 px-10 py-5 bg-forest text-parchment font-body font-medium text-base rounded-sm hover:bg-forest-mid transition-colors duration-200"
          >
            Join the founding waitlist — it's free
            <ArrowRight size={16} />
          </motion.a>
          <motion.p {...fade(0.4)} className="font-body text-sm text-muted mt-6 italic">
            50 founding spots. No credit card to join the waitlist.
          </motion.p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
