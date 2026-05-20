import { useState } from "react";
import type { FormEvent } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Loader2, Calculator, BookOpen, Brain, Map, Shield, Sparkles } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7, delay },
});

const PRODUCTS = [
  {
    label: "FREE",
    price: "$0",
    icon: Calculator,
    title: "The MCCQE Reality Calculator",
    tagline: "The math nobody showed you at the start.",
    description:
      "A pre-built spreadsheet that calculates your true cost to continue — time, money, probability, and immigration impact — versus the cost of pivoting now. 5 minutes. No fluff.",
    color: "border-forest bg-forest/5",
    labelColor: "bg-forest text-parchment",
    cta: "Get the free calculator",
    href: "/img/calculator",
    anchor: false,
  },
  {
    label: "$17",
    price: "$17",
    icon: BookOpen,
    title: "Should You Keep Going?",
    tagline: "Permission to stop — backed by data.",
    description:
      "The honest guide for IMGs who are tired of not knowing. Covers the real math, the sunk cost trap, and a structured decision framework so you can answer the question you've been afraid to ask.",
    color: "border-amber-300 bg-amber-50/60",
    labelColor: "bg-amber-500 text-white",
    cta: "Get the guide — $17",
    href: "/img/pivot",
    anchor: false,
  },
  {
    label: "$27",
    price: "$27",
    icon: Brain,
    title: "The IMG Identity Reset",
    tagline: "5 AI prompts for physicians done letting one exam define them.",
    description:
      "Copy-paste prompts for Claude or ChatGPT that strip the credential from your identity and show you who you are underneath. The work that took Sahawat 2 years — in 30 minutes.",
    color: "border-sky-300 bg-sky-50/60",
    labelColor: "bg-sky-500 text-white",
    cta: "Get the prompts — $27",
    href: "/img/identity",
    anchor: false,
  },
  {
    label: "$37",
    price: "$37",
    icon: Map,
    title: "The IMG Career Map",
    tagline: "12 paths where your MD is an asset, not a liability.",
    description:
      "12 non-clinical careers with realistic income ranges, time-to-first-paycheck, and a specific first step for each. Not a list — a map. Built for Canadian IMGs.",
    color: "border-teal-300 bg-teal-50/60",
    labelColor: "bg-teal-600 text-white",
    cta: "Get the map — $37",
    href: "/img/map",
    anchor: false,
  },
  {
    label: "FREE",
    price: "$0",
    icon: Sparkles,
    title: "The IMG AI Advisor",
    tagline: "Your personalized assessment — powered by Claude.",
    description:
      "Tell it your years on the pathway, specialty, immigration status, and fears. Get a personalized sunk cost analysis, your 3 best-fit career paths, and a 30-day action plan. Not generic advice — built on your specific situation.",
    color: "border-amber-300 bg-amber-50/60",
    labelColor: "bg-amber-500 text-white",
    cta: "Get my free assessment",
    href: "/img/advisor",
    anchor: false,
  },
  {
    label: "$47",
    price: "$47",
    icon: Shield,
    title: "The IMG Survival Playbook",
    tagline: "Income in 30 days without hiding your medical degree.",
    description:
      "A step-by-step 30-day playbook for landing non-clinical income fast — including resume reframe, target roles, outreach scripts, and interview prep for the question they always ask.",
    color: "border-violet-300 bg-violet-50/60",
    labelColor: "bg-violet-600 text-white",
    cta: "Get the playbook — $47",
    href: "/img/playbook",
    anchor: false,
  },
];

const SUNK_COSTS = [
  {
    label: "Financial",
    stat: "$10,000–$25,000+",
    description: "Spent on exam fees, prep courses, credential verification, and applications — before most IMGs stop.",
    color: "border-l-amber-400",
  },
  {
    label: "Time",
    stat: "3–7 years",
    description: "The average IMG spends 3 to 7 years on the licensing pathway. Years that cannot be reclaimed.",
    color: "border-l-sky-400",
  },
  {
    label: "Identity",
    stat: "\"I AM a doctor\"",
    description: "Medical training fuses identity with profession. Leaving feels like losing yourself — not just your career.",
    color: "border-l-teal-400",
  },
  {
    label: "Immigration",
    stat: "Status at risk",
    description: "For many IMGs, the licensing path is also an immigration strategy. Stopping feels like it means leaving Canada.",
    color: "border-l-violet-400",
  },
];

export default function ImgHubPage() {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/img-calculator", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName: firstName.trim(), email: email.trim() }),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data.error || "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }
      setStatus("success");
    } catch {
      setErrorMsg("Network error — please check your connection and try again.");
      setStatus("error");
    }
  }

  const isValid = firstName.trim() && email.trim();

  return (
    <div className="min-h-screen bg-parchment">
      <Navbar />

      {/* ── HERO ── */}
      <section className="bg-[#1E1C1A] text-parchment px-6 md:px-12 py-20 md:py-32">
        <div className="max-w-3xl mx-auto">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="font-body text-xs tracking-[0.15em] uppercase text-parchment/40 mb-6"
          >
            Crosswalk Wisdom · For IMGs in Canada
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display text-4xl md:text-6xl lg:text-7xl leading-tight mb-8"
          >
            You haven't failed{" "}
            <span className="text-amber-400">medicine.</span>
            <br />
            The system failed{" "}
            <span className="text-amber-400">you.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="font-body text-lg md:text-xl text-parchment/70 leading-relaxed mb-6 max-w-2xl"
          >
            Around half of unmatched IMGs in Canada end up in alternative
            careers — permanently. Nobody told them that at the start.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="font-body text-base text-parchment/50 leading-relaxed mb-10 max-w-2xl"
          >
            I'm an IMG. I ran on the treadmill. I stepped off — not because I
            failed, but because I finally looked at the math. This is the guide
            I wish existed when I was deciding.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <a
              href="/img/calculator"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-amber-400 text-ink font-body font-semibold text-base rounded-sm hover:bg-amber-300 transition-colors"
            >
              Get the free calculator
              <ArrowRight size={16} />
            </a>
            <a
              href="#products"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-parchment/20 text-parchment/70 font-body text-base rounded-sm hover:border-parchment/40 hover:text-parchment transition-colors"
            >
              See all products
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── CROSSWALK STRIPE ── */}
      <div className="h-2 crosswalk-stripes opacity-50" />

      {/* ── STATS STRIP ── */}
      <section className="bg-ink text-parchment px-6 md:px-12 py-10">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { stat: "10–22%", label: "IMG match rate into Canadian residency" },
            { stat: "97%", label: "Match rate for Canadian medical graduates" },
            { stat: "53%", label: "Of unmatched IMGs end up in alternative careers" },
            { stat: "40%", label: "Still unemployed years after trying to pivot" },
          ].map((item, i) => (
            <motion.div key={i} {...fadeUp(i * 0.08)} className="text-center">
              <p className="font-display text-3xl md:text-4xl text-amber-400 mb-2">{item.stat}</p>
              <p className="font-body text-xs text-parchment/50 leading-snug">{item.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── THE SUNK COST TRAP ── */}
      <section className="px-6 md:px-12 py-20 md:py-28 bg-parchment">
        <div className="max-w-3xl mx-auto">
          <motion.p {...fadeUp(0)} className="eyebrow mb-4">
            The psychology
          </motion.p>
          <motion.h2 {...fadeUp(0.1)} className="font-display text-3xl md:text-5xl text-ink leading-tight mb-6">
            Why you're still trying.
            <br />
            <span className="text-forest">Even when it's not working.</span>
          </motion.h2>
          <motion.p {...fadeUp(0.2)} className="font-body text-base md:text-lg text-charcoal leading-relaxed mb-12">
            It's not weakness. It's not stubbornness. It's the sunk cost trap —
            a cognitive bias where past investment makes you stay in something
            long after the math stopped making sense. And for IMGs, the trap has
            four layers working against you simultaneously.
          </motion.p>

          <div className="grid md:grid-cols-2 gap-6">
            {SUNK_COSTS.map((item, i) => (
              <motion.div
                key={i}
                {...fadeUp(0.1 * i)}
                className={`border-l-4 ${item.color} pl-5 py-4 bg-white border border-border rounded-sm`}
              >
                <p className="font-body text-xs font-semibold tracking-widest uppercase text-muted mb-2">
                  {item.label} sunk cost
                </p>
                <p className="font-display text-2xl text-ink mb-2">{item.stat}</p>
                <p className="font-body text-sm text-charcoal leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.p {...fadeUp(0.4)} className="font-body text-base text-charcoal leading-relaxed mt-10 max-w-2xl">
            These four layers reinforce each other. The financial cost says "I
            can't afford to stop." The time cost says "I've already given too
            much." The identity cost says "Without this, I don't know who I
            am." And the immigration cost says "If I stop, I might lose
            Canada."
          </motion.p>
          <motion.p {...fadeUp(0.5)} className="font-body text-base font-semibold text-ink leading-relaxed mt-4 max-w-2xl">
            No wonder 40% of IMGs who finally pivot are still unemployed years later.
            Nobody helped them untangle the trap first.
          </motion.p>
        </div>
      </section>

      {/* ── CALCULATOR OPT-IN ── */}
      <section id="calculator" className="bg-forest text-parchment px-6 md:px-12 py-20 md:py-28">
        <div className="max-w-2xl mx-auto">
          <motion.p {...fadeUp(0)} className="font-body text-xs tracking-widest uppercase text-parchment/40 mb-4">
            Free tool
          </motion.p>
          <motion.h2 {...fadeUp(0.1)} className="font-display text-3xl md:text-5xl leading-tight mb-4">
            The MCCQE Reality Calculator
          </motion.h2>
          <motion.p {...fadeUp(0.2)} className="font-body text-base md:text-lg text-parchment/70 leading-relaxed mb-4">
            A pre-built spreadsheet that shows you the real cost of continuing
            the licensing path — versus pivoting now. Time. Money. Match
            probability. Immigration implications.
          </motion.p>
          <motion.p {...fadeUp(0.25)} className="font-body text-sm text-parchment/50 leading-relaxed mb-10">
            5 minutes. No opinions. Just the numbers nobody gave you at the
            start.
          </motion.p>

          {status === "success" ? (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-parchment/10 border border-parchment/20 rounded-sm px-8 py-10 text-center"
            >
              <p className="font-display text-2xl text-parchment mb-3">It's on its way.</p>
              <p className="font-body text-base text-parchment/70">
                Check your inbox — the calculator will arrive within a few minutes.
                <br />
                While you wait, explore the full product guide below.
              </p>
              <a
                href="#products"
                className="inline-flex items-center gap-2 mt-6 font-body text-sm text-amber-300 hover:text-amber-200 transition-colors"
              >
                See the full pivot guide <ArrowRight size={14} />
              </a>
            </motion.div>
          ) : (
            <motion.form {...fadeUp(0.35)} onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="font-body text-xs tracking-wide uppercase text-parchment/40">
                    First name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Reza"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    disabled={status === "loading"}
                    className="w-full px-4 py-3 bg-parchment/10 border border-parchment/20 rounded-sm font-body text-base text-parchment placeholder-parchment/30 focus:outline-none focus:border-parchment/50 transition-colors disabled:opacity-50"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="font-body text-xs tracking-wide uppercase text-parchment/40">
                    Email address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="reza@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={status === "loading"}
                    className="w-full px-4 py-3 bg-parchment/10 border border-parchment/20 rounded-sm font-body text-base text-parchment placeholder-parchment/30 focus:outline-none focus:border-parchment/50 transition-colors disabled:opacity-50"
                  />
                </div>
              </div>

              {errorMsg && (
                <p className="font-body text-sm text-red-300">{errorMsg}</p>
              )}

              <button
                type="submit"
                disabled={status === "loading" || !isValid}
                className="inline-flex items-center gap-2 px-8 py-4 bg-amber-400 text-ink font-body font-semibold text-base rounded-sm hover:bg-amber-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === "loading" ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Sending…
                  </>
                ) : (
                  <>
                    Send me the free calculator
                    <ArrowRight size={16} />
                  </>
                )}
              </button>
              <p className="font-body text-xs text-parchment/30">
                Free. No spam. Unsubscribe any time.
              </p>
            </motion.form>
          )}
        </div>
      </section>

      {/* ── PRODUCT LADDER ── */}
      <section id="products" className="px-6 md:px-12 py-20 md:py-28 bg-parchment">
        <div className="max-w-4xl mx-auto">
          <motion.p {...fadeUp(0)} className="eyebrow mb-4">
            The IMG Pivot Guide
          </motion.p>
          <motion.h2 {...fadeUp(0.1)} className="font-display text-3xl md:text-5xl text-ink leading-tight mb-4">
            Five tools for the decision
            <br />
            <span className="text-forest">nobody helped you make.</span>
          </motion.h2>
          <motion.p {...fadeUp(0.2)} className="font-body text-base md:text-lg text-charcoal leading-relaxed mb-14 max-w-2xl">
            Each product addresses one layer of the trap — from the initial
            math, to identity, to the map of what comes next. Start with the
            free calculator. Move through the ladder at your own pace.
          </motion.p>

          <div className="flex flex-col gap-5">
            {PRODUCTS.map((p, i) => {
              const Icon = p.icon;
              return (
                <motion.div
                  key={i}
                  {...fadeUp(0.08 * i)}
                  className={`border-2 ${p.color} rounded-sm p-6 flex flex-col sm:flex-row gap-5 items-start sm:items-center`}
                >
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-sm bg-white border border-border flex items-center justify-center">
                      <Icon size={22} className="text-ink" />
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                      <span className={`font-body text-xs font-bold px-2 py-0.5 rounded-sm ${p.labelColor}`}>
                        {p.label}
                      </span>
                      <h3 className="font-display text-xl text-ink">{p.title}</h3>
                    </div>
                    <p className="font-body text-sm font-medium text-charcoal mb-1">{p.tagline}</p>
                    <p className="font-body text-sm text-muted leading-relaxed">{p.description}</p>
                  </div>

                  <div className="flex-shrink-0">
                    {p.anchor ? (
                      <a
                        href={p.href}
                        className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-forest text-parchment font-body text-sm font-medium rounded-sm hover:bg-forest/90 transition-colors whitespace-nowrap"
                      >
                        {p.cta} <ArrowRight size={13} />
                      </a>
                    ) : (
                      <a
                        href={p.href}
                        className="inline-flex items-center gap-1.5 px-5 py-2.5 border border-ink/20 text-ink font-body text-sm font-medium rounded-sm hover:bg-ink hover:text-parchment transition-colors whitespace-nowrap"
                      >
                        {p.cta} <ArrowRight size={13} />
                      </a>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── WHO THIS IS FOR ── */}
      <section className="bg-[#1E1C1A] text-parchment px-6 md:px-12 py-20 md:py-28">
        <div className="max-w-3xl mx-auto">
          <motion.p {...fadeUp(0)} className="font-body text-xs tracking-widest uppercase text-parchment/30 mb-4">
            Who this is for
          </motion.p>
          <motion.h2 {...fadeUp(0.1)} className="font-display text-3xl md:text-4xl leading-tight mb-10">
            You might be ready for this if…
          </motion.h2>

          <div className="space-y-5">
            {[
              "You've Googled \"is the MCCQE worth it\" at some point and immediately closed the tab.",
              "You've told yourself \"just one more year\" more than once.",
              "You know the match statistics but keep applying anyway — because stopping feels worse than failing.",
              "You work in a role that has nothing to do with medicine, while still calling yourself a doctor.",
              "You're afraid that if you stop pursuing the license, you'll lose your status in Canada too.",
              "You haven't told your family how you actually feel about this.",
              "You want someone to just tell you the truth — without trying to sell you another prep course.",
            ].map((item, i) => (
              <motion.div
                key={i}
                {...fadeUp(0.06 * i)}
                className="flex items-start gap-4 border-b border-parchment/10 pb-5 last:border-0 last:pb-0"
              >
                <span className="mt-1 text-amber-400 font-display text-lg leading-none">→</span>
                <p className="font-body text-base text-parchment/75 leading-relaxed">{item}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT SAHAWAT ── */}
      <section className="px-6 md:px-12 py-20 md:py-28 bg-parchment">
        <div className="max-w-3xl mx-auto">
          <motion.p {...fadeUp(0)} className="eyebrow mb-4">About the author</motion.p>
          <motion.h2 {...fadeUp(0.1)} className="font-display text-3xl md:text-4xl text-ink leading-tight mb-6">
            I left medicine before Claude existed.
          </motion.h2>
          <motion.div {...fadeUp(0.2)} className="space-y-5 font-body text-base md:text-lg text-charcoal leading-relaxed">
            <p>
              I'm Sahawat. I'm an IMG. I went through the same pathway you're on —
              the exams, the applications, the waiting, the quiet shame of working
              jobs that had nothing to do with the degree I earned.
            </p>
            <p>
              The crossing took me two years. There was no calculator. No guide. No
              one who had walked away and survived to say "it gets better on the
              other side." Just me, a lot of spiraling, and eventually — a crossing
              guard vest I didn't expect to teach me anything.
            </p>
            <p>
              Now I work with burned-out physicians and IMGs who are standing where
              I stood. The clarity that took me two years to find — they're getting
              it in 30 minutes, because they have tools I didn't.
            </p>
            <p className="font-medium text-ink">
              I built this guide because nobody built it for me.
            </p>
          </motion.div>
          <motion.a
            {...fadeUp(0.3)}
            href="#calculator"
            className="inline-flex items-center gap-2 mt-8 px-8 py-4 bg-forest text-parchment font-body font-medium text-base rounded-sm hover:bg-forest/90 transition-colors"
          >
            Start with the free calculator
            <ArrowRight size={16} />
          </motion.a>
        </div>
      </section>

      <div className="h-2 crosswalk-stripes opacity-40" />
      <Footer />
    </div>
  );
}
