import { useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const CROSSING_SESSION_URL = "https://sahawat.gumroad.com/l/crossing-session";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7, delay },
});

const icp = [
  "You've been in healthcare for years — long enough to be good at it, long enough to be exhausted by it",
  'You\'ve Googled "should I leave nursing" at 2am and closed the tab before anyone could see',
  "You don't hate your patients. You've lost yourself somewhere between the shifts",
  "The thought of leaving feels like betrayal. Staying feels like disappearing",
  "You're not looking for a pep talk. You need someone who actually did it, and a plan that doesn't require blowing up your life",
];

type Product = {
  step: string;
  label: string;
  price: string;
  name: string;
  tagline: string;
  forYouIf: string;
  bullets: string[];
  cta: string;
  href: string;
  external: boolean;
  highlight: boolean;
  badge?: string;
};

const products: Product[] = [
  {
    step: "01",
    label: "Start here",
    price: "Free",
    name: "The Fear Audit",
    tagline: "Name the fear. That's the first act of courage.",
    forYouIf:
      "You know something is wrong but can't quite name what's actually holding you back.",
    bullets: [
      "Identifies your dominant fear: Financial Insecurity, Fear of Judgment, or Identity Loss",
      "2-minute quiz — no email required to see your results",
      "Most people say it's money. It almost never is.",
    ],
    cta: "Take the Fear Audit",
    href: "https://fear-audit.vercel.app",
    external: true,
    highlight: false,
  },
  {
    step: "02",
    label: "Next step",
    price: "$27",
    name: "The Courage to Choose",
    tagline: "The practical playbook for your next chapter.",
    forYouIf:
      "You've named the fear. Now you need a real plan — not more awareness.",
    bullets: [
      "38-page PDF walking you from fear to a concrete next step",
      "AI Prompt Pack — 12 prompts that help Claude do what 6 months of overthinking can't",
      "Built for the person at 2am who needs an answer, not another affirmation",
    ],
    cta: "Get the guide",
    href: "https://sahawat.gumroad.com/l/courage-to-choose",
    external: true,
    highlight: false,
  },
  {
    step: "03",
    label: "Work with me 1:1",
    price: "$97",
    name: "The Crossing Session",
    tagline: "One hour, one-on-one, on your actual situation.",
    forYouIf:
      "You've named the fear and you're done reading about it. You want a plan built around your numbers, your license, your life — not more theory.",
    bullets: [
      "One hour, one-on-one — we separate the real risks from the inherited ones and put a price on staying",
      "A one-page Crossing Plan in writing within 48 hours: your constraint and your next three moves",
      "Founding rate, 10 spots. Full refund if you leave with no more clarity than you walked in with",
    ],
    cta: "Book a session",
    href: CROSSING_SESSION_URL,
    external: true,
    highlight: true,
    badge: "Founding rate — 10 spots",
  },
  {
    step: "04",
    label: "The program",
    price: "$297",
    name: "The Crosswalk Method",
    tagline: "4 weeks. A complete career transition framework.",
    forYouIf:
      "You're ready to commit to a structured path and want to do it at your own pace.",
    bullets: [
      "16 video modules across 4 stages: STOP → START → ELDER → HUMAN",
      "Fear Audit workbook + full AI Prompt Pack included",
      "Private community access + live Q&A for founding members",
    ],
    cta: "See the course",
    href: "/course",
    external: false,
    highlight: false,
  },
  {
    step: "05",
    label: "All-in",
    price: "$1,500–3,000",
    name: "The Crosswalk Program",
    tagline: "6–12 weeks of 1:1 coaching.",
    forYouIf:
      "You're done waiting and want a thought partner who has crossed this himself.",
    bullets: [
      "Weekly sessions directly with Sahawat — no junior coaches, no templates",
      "Fear Audit + full transition map + income bridge built together",
      "Limited spots. Every application reviewed personally within 48 hours.",
    ],
    cta: "Apply for coaching",
    href: "/apply",
    external: false,
    highlight: false,
  },
];

export default function WorkWithMePage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-parchment">
      <Navbar />

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="section-pad pt-36 md:pt-44 world-bg">
        <div className="max-w-site mx-auto">
          <div className="max-w-3xl">
            <motion.p {...fadeUp(0)} className="eyebrow mb-6">
              Work With Me
            </motion.p>

            <motion.h1
              {...fadeUp(0.1)}
              className="font-display text-5xl md:text-6xl lg:text-7xl text-ink leading-[1.05] mb-8"
            >
              You already know
              <br />
              something needs
              <br />
              <span className="text-forest">to change.</span>
            </motion.h1>

            <motion.p
              {...fadeUp(0.2)}
              className="font-body text-base md:text-lg text-charcoal leading-relaxed max-w-prose2"
            >
              I left medicine after 12 years. I stood on a street corner in a
              yellow vest and learned more about burnout than I ever did in a
              hospital. Now I help healthcare professionals do what I did —
              without doing it alone.
            </motion.p>

            <motion.div
              {...fadeUp(0.3)}
              className="mt-10 flex flex-col sm:flex-row sm:items-center gap-4"
            >
              <a
                href={CROSSING_SESSION_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-body text-sm font-medium px-7 py-3.5 rounded-sm bg-forest text-parchment hover:bg-forest-light transition-colors duration-200 whitespace-nowrap self-start"
              >
                Book a Crossing Session — $97
                <ArrowRight size={14} />
              </a>
              <span className="font-body text-sm text-muted">
                One hour, one plan in writing. Founding rate — 10 spots.
              </span>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="section-crosswalk" />

      {/* ── Is this you? ──────────────────────────────────────── */}
      <section className="section-pad bg-charcoal">
        <div className="max-w-site mx-auto">
          <div className="max-w-2xl">
            <motion.p
              {...fadeUp(0)}
              className="font-body text-xs font-medium tracking-widest2 uppercase text-forest-light/60 mb-6"
            >
              Is this you?
            </motion.p>

            <motion.h2
              {...fadeUp(0.1)}
              className="font-display text-3xl md:text-4xl text-parchment leading-snug mb-10"
            >
              The cage isn't the hospital.
              <br />
              It's the story you've been
              <br />
              telling yourself.
            </motion.h2>

            <ul className="space-y-5">
              {icp.map((point, i) => (
                <motion.li
                  key={i}
                  {...fadeUp(0.1 + i * 0.08)}
                  className="flex items-start gap-4"
                >
                  <span className="mt-1 flex-shrink-0 w-5 h-5 rounded-sm bg-forest/30 flex items-center justify-center">
                    <Check size={11} className="text-forest-light" />
                  </span>
                  <p className="font-body text-base text-parchment/80 leading-relaxed">
                    {point}
                  </p>
                </motion.li>
              ))}
            </ul>

            <motion.p
              {...fadeUp(0.6)}
              className="font-display text-xl text-parchment/60 italic mt-10"
            >
              If you're nodding at more than two of those — you're in the right place.
            </motion.p>
          </div>
        </div>
      </section>

      <div className="section-crosswalk" />

      {/* ── Product journey ───────────────────────────────────── */}
      <section className="section-pad world-bg">
        <div className="max-w-site mx-auto">

          <div className="max-w-2xl mb-16">
            <motion.p {...fadeUp(0)} className="eyebrow mb-5">
              The path
            </motion.p>
            <motion.h2
              {...fadeUp(0.1)}
              className="font-display text-4xl md:text-5xl text-ink leading-tight"
            >
              Start wherever you are.
              <br />
              Every step is the right one.
            </motion.h2>
            <motion.p
              {...fadeUp(0.2)}
              className="font-body text-base md:text-lg text-charcoal leading-relaxed mt-5"
            >
              Some people start with the quiz. Some have been stuck for five
              years and are ready to go all-in. There's no wrong entry point —
              only the one you can actually take today.
            </motion.p>
          </div>

          {/* Product cards */}
          <div className="space-y-6">
            {products.map((p, i) => (
              <motion.div
                key={p.name}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: i * 0.08 }}
                className={`rounded-sm border ${
                  p.highlight
                    ? "bg-forest border-forest shadow-xl shadow-forest/15"
                    : "bg-parchment border-border"
                }`}
              >
                <div className="p-8 md:p-10">
                  {/* Top row: step + label + price */}
                  <div className="flex items-start justify-between mb-6 gap-4">
                    <div className="flex items-center gap-4">
                      <span
                        className={`font-body text-xs font-medium tracking-widest2 ${
                          p.highlight ? "text-parchment/40" : "text-muted/50"
                        }`}
                      >
                        {p.step}
                      </span>
                      <span
                        className={`font-body text-xs font-medium tracking-widest uppercase ${
                          p.highlight ? "text-forest-light/60" : "text-muted"
                        }`}
                      >
                        {p.label}
                      </span>
                    </div>
                    <span
                      className={`font-display text-2xl font-semibold flex-shrink-0 ${
                        p.highlight ? "text-parchment" : "text-forest"
                      }`}
                    >
                      {p.price}
                    </span>
                  </div>

                  {/* Name + tagline */}
                  <h3
                    className={`font-display text-3xl md:text-4xl leading-tight mb-2 ${
                      p.highlight ? "text-parchment" : "text-ink"
                    }`}
                  >
                    {p.name}
                  </h3>
                  <p
                    className={`font-body text-sm italic mb-6 ${
                      p.highlight ? "text-parchment/60" : "text-muted"
                    }`}
                  >
                    {p.tagline}
                  </p>

                  {/* For you if */}
                  <p
                    className={`font-body text-sm font-medium mb-5 ${
                      p.highlight ? "text-forest-light/80" : "text-forest"
                    }`}
                  >
                    This is for you if: {p.forYouIf}
                  </p>

                  {/* Bullets + CTA row */}
                  <div className="md:flex md:items-end md:justify-between md:gap-10">
                    <ul className="space-y-3 mb-8 md:mb-0 flex-1">
                      {p.bullets.map((b, bi) => (
                        <li key={bi} className="flex items-start gap-3">
                          <span
                            className={`mt-1 flex-shrink-0 w-4 h-4 rounded-sm flex items-center justify-center ${
                              p.highlight ? "bg-parchment/20" : "bg-forest/10"
                            }`}
                          >
                            <Check
                              size={10}
                              className={
                                p.highlight ? "text-parchment" : "text-forest"
                              }
                            />
                          </span>
                          <p
                            className={`font-body text-sm leading-relaxed ${
                              p.highlight ? "text-parchment/75" : "text-charcoal"
                            }`}
                          >
                            {b}
                          </p>
                        </li>
                      ))}
                    </ul>

                    <div className="flex-shrink-0">
                      <a
                        href={p.href}
                        target={p.external ? "_blank" : undefined}
                        rel={p.external ? "noopener noreferrer" : undefined}
                        className={`inline-flex items-center gap-2 font-body text-sm font-medium px-7 py-3.5 rounded-sm transition-colors duration-200 whitespace-nowrap ${
                          p.highlight
                            ? "bg-parchment text-forest hover:bg-forest-light"
                            : "border border-forest text-forest hover:bg-forest hover:text-parchment"
                        }`}
                      >
                        {p.cta}
                        <ArrowRight size={14} />
                      </a>
                    </div>
                  </div>
                </div>

                {p.highlight && (
                  <div className="px-10 pb-6">
                    <span className="font-body text-xs font-medium tracking-widest uppercase bg-parchment/10 text-parchment/50 px-3 py-1 rounded-sm">
                      {p.badge || "Most popular"}
                    </span>
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          {/* B2B section */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-10 p-8 md:p-10 rounded-sm border border-border bg-card"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <p className="eyebrow mb-3">For organizations</p>
                <h3 className="font-display text-2xl md:text-3xl text-ink mb-2">
                  Team workshops &amp; speaking
                </h3>
                <p className="font-body text-sm text-charcoal leading-relaxed max-w-prose">
                  Burnout costs hospital systems millions in turnover every year.
                  I run half-day and full-day workshops for nursing teams,
                  physician groups, and health system leadership — built on the
                  same Fear Audit framework, designed for groups of 10–200.
                </p>
              </div>
              <div className="flex-shrink-0">
                <a
                  href="mailto:sahawat@crosswalkwisdom.com"
                  className="inline-flex items-center gap-2 font-body text-sm font-medium px-7 py-3.5 border border-forest text-forest rounded-sm hover:bg-forest hover:text-parchment transition-colors duration-200 whitespace-nowrap"
                >
                  Get in touch
                  <ArrowRight size={14} />
                </a>
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* ── Closing quote ─────────────────────────────────────── */}
      <section className="px-6 py-16 md:px-12 lg:px-20 xl:px-32 bg-parchment border-t border-border">
        <div className="max-w-site mx-auto">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-display text-2xl md:text-3xl text-muted italic text-center max-w-2xl mx-auto"
          >
            "The sidewalk is the classroom.
            <br />
            You are the student.
            <br />
            Healing is the lesson."
          </motion.p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
