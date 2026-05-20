import { motion } from "framer-motion";
import { ArrowRight, Calculator, BookOpen, Brain, Map, Shield } from "lucide-react";

const products = [
  {
    step: "Start here — Free",
    price: "Free",
    name: "The MCCQE Reality Calculator",
    tagline: "The math nobody showed you at the start.",
    description:
      "Run your numbers: real cost to continue, match probability, and immigration impact — versus the cost of pivoting now. 5 minutes. No prep course required.",
    cta: "Get the free calculator",
    href: "/img",
    highlight: false,
    icon: Calculator,
    accent: "text-amber-600",
    border: "border-amber-200",
  },
  {
    step: "Step 1",
    price: "$17",
    name: "Should You Keep Going?",
    tagline: "Permission to stop — backed by data.",
    description:
      "The honest guide for IMGs who are tired of not knowing. The real math, the sunk cost trap decoded, and a structured decision framework for the question you've been afraid to ask.",
    cta: "Get the guide — $17",
    href: "/img/pivot",
    highlight: false,
    icon: BookOpen,
    accent: "text-amber-600",
    border: "border-amber-200",
  },
  {
    step: "Step 2",
    price: "$27",
    name: "The IMG Identity Reset",
    tagline: "5 AI prompts for physicians done letting one exam define them.",
    description:
      "Copy-paste prompts for Claude or ChatGPT that strip the credential from your identity and show you who you are underneath. The work that took Sahawat 2 years — in 30 minutes.",
    cta: "Get the prompts — $27",
    href: "/img/identity",
    highlight: true,
    icon: Brain,
    accent: "text-sky-600",
    border: "border-sky-200",
  },
  {
    step: "Step 3",
    price: "$37",
    name: "The IMG Career Map",
    tagline: "12 paths where your MD is an asset, not a liability.",
    description:
      "12 non-clinical careers with realistic Canadian income ranges, time-to-first-paycheck, and a concrete first step for each. Not a list — a map.",
    cta: "Get the map — $37",
    href: "/img/map",
    highlight: false,
    icon: Map,
    accent: "text-teal-600",
    border: "border-teal-200",
  },
  {
    step: "Step 4",
    price: "$47",
    name: "The IMG Survival Playbook",
    tagline: "Income in 30 days without hiding your medical degree.",
    description:
      "A step-by-step 30-day plan: resume reframe, target roles, outreach scripts, and interview prep for the question every hiring manager asks.",
    cta: "Get the playbook — $47",
    href: "/img/playbook",
    highlight: false,
    icon: Shield,
    accent: "text-violet-600",
    border: "border-violet-200",
  },
];

export default function ProductSection() {
  return (
    <section id="products" className="section-pad world-bg">
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
            The IMG Pivot Guide
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-4xl md:text-5xl text-ink leading-tight"
          >
            Five tools for the decision
            <br />
            nobody helped you make.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="font-body text-base md:text-lg text-charcoal leading-relaxed mt-4"
          >
            Start with the free calculator. Move through the ladder at your own pace.
          </motion.p>
        </div>

        {/* Product cards */}
        <div className="flex flex-col gap-5">
          {products.map((p, i) => {
            const Icon = p.icon;
            return (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: i * 0.08 }}
              className={`relative rounded-sm p-6 flex flex-col sm:flex-row gap-5 items-start sm:items-center border-2 ${
                p.highlight
                  ? "bg-forest border-forest shadow-lg shadow-forest/10"
                  : `bg-parchment ${p.border}`
              }`}
            >
              {p.highlight && (
                <span className="absolute top-4 right-4 font-body text-xs font-medium tracking-widest uppercase bg-parchment text-forest px-3 py-1 rounded-sm">
                  Most popular
                </span>
              )}

              {/* Icon */}
              <div className="flex-shrink-0">
                <div className={`w-12 h-12 rounded-sm flex items-center justify-center ${p.highlight ? "bg-parchment/15" : "bg-white border border-border"}`}>
                  <Icon size={22} className={p.highlight ? "text-parchment" : p.accent} />
                </div>
              </div>

              {/* Text */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-1">
                  <span className={`font-body text-xs tracking-widest uppercase ${p.highlight ? "text-forest-light/70" : "text-muted"}`}>
                    {p.step}
                  </span>
                  <span className={`font-display text-lg font-semibold ${p.highlight ? "text-parchment" : p.accent}`}>
                    {p.price}
                  </span>
                </div>
                <h3 className={`font-display text-xl md:text-2xl leading-snug mb-1 ${p.highlight ? "text-parchment" : "text-ink"}`}>
                  {p.name}
                </h3>
                <p className={`font-body text-sm italic mb-2 ${p.highlight ? "text-forest-light/80" : "text-muted"}`}>
                  {p.tagline}
                </p>
                <p className={`font-body text-sm leading-relaxed ${p.highlight ? "text-parchment/80" : "text-charcoal"}`}>
                  {p.description}
                </p>
              </div>

              {/* CTA */}
              <div className="flex-shrink-0">
                <a
                  href={p.href}
                  className={`inline-flex items-center gap-2 font-body text-sm font-medium px-6 py-3 rounded-sm transition-colors duration-200 whitespace-nowrap ${
                    p.highlight
                      ? "bg-parchment text-forest hover:bg-forest-light"
                      : "border border-forest text-forest hover:bg-forest hover:text-parchment"
                  }`}
                >
                  {p.cta}
                  <ArrowRight size={14} />
                </a>
              </div>
            </motion.div>
            );
          })}
        </div>

        {/* Whisper */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="font-body text-sm text-muted text-center mt-10"
        >
          Also available:{" "}
          <a href="https://fear-audit.vercel.app" target="_blank" rel="noopener noreferrer" className="text-forest underline underline-offset-4 hover:text-forest-mid transition-colors">
            The Fear Audit — free quiz →
          </a>
        </motion.p>

      </div>
    </section>
  );
}
