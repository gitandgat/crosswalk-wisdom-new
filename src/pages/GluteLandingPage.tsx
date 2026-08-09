import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Activity,
  ShieldCheck,
  PlayCircle,
  Dumbbell,
  HeartPulse,
  CalendarCheck,
  Stethoscope,
} from "lucide-react";

/**
 * Glute Longevity — standalone branded sales/landing page.
 *
 * Brand is intentionally distinct from Crosswalk Wisdom (dark + teal, Inter),
 * matching crosswalk-remotion/src/compositions/GluteIntro.tsx
 * (DARK #0d0d1a, TEAL #00A699). Headings carry `font-body` so they render in
 * Inter rather than the global DM Serif Display.
 *
 * The page is the "front door"; delivery happens on Everfit (app + payments +
 * licensed exercise demo library). The form captures name + email and tags the
 * lead `glute-longevity-applicant` via the existing Encharge webhook, which
 * fires the 3-email nurture already built in setup-glute-encharge.py.
 */

const INTRO_VIDEO_ID = "pvKWD6O2_mY"; // Glute Longevity intro v2 (unlisted)

// ── Content data ──────────────────────────────────────────────────────────────
const PILLARS = [
  {
    icon: Stethoscope,
    label: "Built by a physician",
    text: "A clinical lens on movement, not generic fitness advice.",
  },
  {
    icon: HeartPulse,
    label: "Longevity-first",
    text: "Train the strength that actually protects you as you age.",
  },
  {
    icon: ShieldCheck,
    label: "Risk-free",
    text: "Full money-back guarantee if your results don't improve.",
  },
];

const WEEKS = [
  { wk: "01", title: "Wake the system", focus: "Re-activate dormant glutes and reset hip position." },
  { wk: "02", title: "Build the base", focus: "Foundational strength patterns, demonstrated step by step." },
  { wk: "03", title: "Load with control", focus: "Progressive loading without aggravating the back or knees." },
  { wk: "04", title: "Posture & carry", focus: "Translate strength into how you stand, walk, and lift daily." },
  { wk: "05", title: "Power & resilience", focus: "Add tempo and range to make gains durable." },
  { wk: "06", title: "Make it last", focus: "A simple maintenance plan you can keep for years." },
];

const INCLUDES = [
  {
    icon: Dumbbell,
    title: "Follow-along video library",
    text: "Every movement professionally demonstrated with correct form — no guesswork. You just press play and follow.",
  },
  {
    icon: CalendarCheck,
    title: "A weekly plan you can keep",
    text: "Short, progressive sessions designed to fit a real schedule, not a gym-rat's.",
  },
  {
    icon: Activity,
    title: "Progress tracking",
    text: "See your strength and consistency build week over week inside the app.",
  },
  {
    icon: Stethoscope,
    title: "Coaching from me",
    text: "Program intros and weekly guidance walking you through the why behind each phase.",
  },
];

const STEPS = [
  { n: "1", title: "Apply", text: "Tell me where you're starting. I review every application personally." },
  { n: "2", title: "Get your plan", text: "You're enrolled in the app with your 6-week protocol mapped out." },
  { n: "3", title: "Train along", text: "Press play, follow the demonstrations, and track your progress." },
];

const TIERS = [
  {
    name: "The Program",
    price: "$147",
    tagline: "Self-guided 6-week protocol",
    features: [
      "6 progressive training modules",
      "Follow-along demonstration library",
      "Corrective protocol library (8 clinical PDFs)",
      "Free movement assessment + day-30 retest loop",
      "Lifetime access + money-back guarantee",
    ],
    highlight: false,
  },
  {
    name: "Program + Coaching",
    price: "$297",
    tagline: "The protocol, coached by me",
    features: [
      "Everything in The Program",
      "Weekly plan + progress tracking",
      "Personal review of your assessment",
      "Weekly guidance through each phase",
      "Money-back guarantee",
    ],
    highlight: false,
  },
  {
    name: "Coaching + App",
    price: "$497",
    tagline: "Protocol + Longevity Lift App",
    features: [
      "Everything in Program + Coaching",
      "Longevity Lift app (installs to your home screen)",
      "In-app coaching & reminders",
      "Priority application review",
      "Lifetime access + future updates",
    ],
    highlight: true,
  },
];

const FAQS = [
  {
    q: "I can't do hard exercises. Is this for me?",
    a: "Yes — that's exactly who it's for. Every movement is demonstrated and has an easier progression. You start where your body is, not where someone else's is.",
  },
  {
    q: "Do I need a gym?",
    a: "No. The protocol is built to run with minimal equipment. If you do have a gym, there are loaded options too.",
  },
  {
    q: "How much time per week?",
    a: "Short, focused sessions a few times a week. The plan is designed to be sustainable, not punishing.",
  },
  {
    q: "What if it doesn't work for me?",
    a: "Complete the six weeks as designed and if your glute strength, posture, or comfort don't improve, I refund you in full. The risk is on me.",
  },
];

// ── Motion helper ─────────────────────────────────────────────────────────────
function useReveal() {
  const reduce = useReducedMotion();
  return (delay = 0) => ({
    initial: { opacity: 0, y: reduce ? 0 : 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
    transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] as const },
  });
}

// ── Small presentational pieces ───────────────────────────────────────────────
function TealRule() {
  return <span className="block h-[2px] w-12 bg-[#00A699]" aria-hidden="true" />;
}

function Wordmark() {
  return (
    <span className="font-body text-lg font-extrabold tracking-[0.18em] text-white">
      GLUTE <span className="text-[#00A699]">LONGEVITY</span>
    </span>
  );
}

export default function GluteLandingPage() {
  const reveal = useReveal();
  const [form, setForm] = useState({ firstName: "", email: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setMessage("");
    try {
      const apiUrl = import.meta.env.VITE_API_URL || "https://crosswalk-webhook.up.railway.app";
      const res = await fetch(`${apiUrl}/api/encharge/subscribe`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, source: "glute" }),
      });
      if (!res.ok) throw new Error("Submission failed");
      const data = await res.json();
      setStatus("success");
      setMessage(data.message || "Got it — check your email for the 2-minute intro.");
      setForm({ firstName: "", email: "" });
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    }
  }

  return (
    <div className="min-h-screen bg-[#0d0d1a] font-body text-white antialiased">
      {/* Top accent stripe */}
      <div className="h-1 w-full bg-[#00A699]" />

      {/* Header */}
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5 md:px-10">
        <Wordmark />
        <a
          href="#apply"
          className="rounded-full border border-[#00A699]/60 px-5 py-2 text-sm font-semibold text-[#00A699] transition-colors hover:bg-[#00A699] hover:text-[#0d0d1a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00A699]"
        >
          Apply
        </a>
      </header>

      <main>
        {/* HERO */}
        <section
          aria-labelledby="hero-heading"
          className="relative overflow-hidden px-6 pb-24 pt-16 md:px-10 md:pb-32 md:pt-24"
        >
          {/* radial teal glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(60% 50% at 70% 0%, rgba(0,166,153,0.18) 0%, rgba(13,13,26,0) 70%)",
            }}
          />
          <div className="relative mx-auto max-w-3xl">
            <motion.div {...reveal(0)} className="mb-6 flex items-center gap-3">
              <TealRule />
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#9ca3af]">
                A 6-week protocol from a former physician
              </p>
            </motion.div>

            <motion.h1
              {...reveal(0.08)}
              id="hero-heading"
              className="font-body text-4xl font-extrabold leading-[1.05] tracking-tight md:text-6xl"
            >
              Rebuild the strength
              <br />
              that <span className="text-[#00A699]">keeps you moving</span> for life.
            </motion.h1>

            <motion.p
              {...reveal(0.16)}
              className="mt-6 max-w-xl text-lg leading-relaxed text-[#c7cad1]"
            >
              Most glute training fails because it chases looks, not longevity. This is the
              opposite: a clinically-minded protocol that rebuilds the hips, posture, and
              power you actually need as you age — every movement demonstrated, nothing left
              to guesswork.
            </motion.p>

            <motion.div {...reveal(0.24)} className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
              <a
                href="#apply"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#00A699] px-8 py-4 text-base font-bold text-[#0d0d1a] transition-transform hover:scale-[1.02] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Apply for a founding spot
                <ArrowRight size={18} />
              </a>
              <a
                href="#intro"
                className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-4 text-base font-semibold text-white/80 transition-colors hover:text-white"
              >
                <PlayCircle size={20} className="text-[#00A699]" />
                Watch the 2-min intro
              </a>
            </motion.div>

            {/* Pillars */}
            <motion.ul {...reveal(0.32)} className="mt-16 grid gap-6 sm:grid-cols-3">
              {PILLARS.map(({ icon: Icon, label, text }) => (
                <li
                  key={label}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-sm"
                >
                  <Icon size={22} className="text-[#00A699]" aria-hidden="true" />
                  <p className="mt-3 font-semibold">{label}</p>
                  <p className="mt-1 text-sm text-[#9ca3af]">{text}</p>
                </li>
              ))}
            </motion.ul>
          </div>
        </section>

        {/* AUTHORITY */}
        <section aria-labelledby="authority-heading" className="border-t border-white/5 px-6 py-20 md:px-10 md:py-28">
          <div className="mx-auto grid max-w-5xl gap-12 md:grid-cols-2 md:items-center">
            <motion.div {...reveal(0)}>
              <TealRule />
              <h2 id="authority-heading" className="font-body mt-5 text-3xl font-bold md:text-4xl">
                Why a physician built a glute program
              </h2>
            </motion.div>
            <motion.div {...reveal(0.1)} className="space-y-5 text-[#c7cad1]">
              <p>
                I'm Sahawat — a former physician. I got tired of watching capable people accept
                decline as inevitable, when the real problem was almost always the same:
                weak, dormant glutes quietly stealing their strength, posture, and confidence.
              </p>
              <p>
                The usual "glute work" never fixes it because it's built for the mirror, not for
                the decades ahead. So I built the protocol I'd give a patient — progressive,
                joint-friendly, and demonstrated clearly enough that you never wonder if you're
                doing it right.
              </p>
              <p className="font-semibold text-white">
                — Sahawat, Former Physician · Founder, Glute Longevity
              </p>
            </motion.div>
          </div>
        </section>

        {/* INTRO VIDEO */}
        <section id="intro" aria-labelledby="intro-heading" className="px-6 py-20 md:px-10 md:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <motion.div {...reveal(0)} className="mb-6 flex flex-col items-center gap-3">
              <TealRule />
              <h2 id="intro-heading" className="font-body text-3xl font-bold md:text-4xl">
                See how it works in 2 minutes
              </h2>
            </motion.div>
            <motion.div
              {...reveal(0.1)}
              className="overflow-hidden rounded-2xl border border-white/10 shadow-2xl shadow-black/40"
            >
              <div className="aspect-video w-full bg-black">
                <iframe
                  className="h-full w-full"
                  src={`https://www.youtube-nocookie.com/embed/${INTRO_VIDEO_ID}`}
                  title="Glute Longevity — 2-minute intro"
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* WHAT'S INSIDE */}
        <section aria-labelledby="inside-heading" className="border-t border-white/5 px-6 py-20 md:px-10 md:py-28">
          <div className="mx-auto max-w-5xl">
            <motion.div {...reveal(0)} className="mb-12 flex flex-col items-center gap-3 text-center">
              <TealRule />
              <h2 id="inside-heading" className="font-body text-3xl font-bold md:text-4xl">
                What's inside
              </h2>
              <p className="max-w-xl text-[#9ca3af]">
                Everything is professionally demonstrated and delivered in your own training app —
                so you can follow along anytime, at your level.
              </p>
            </motion.div>
            <div className="grid gap-5 sm:grid-cols-2">
              {INCLUDES.map(({ icon: Icon, title, text }, i) => (
                <motion.div
                  key={title}
                  {...reveal(i * 0.06)}
                  className="group rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-colors hover:border-[#00A699]/50"
                >
                  <Icon size={24} className="text-[#00A699]" aria-hidden="true" />
                  <h3 className="font-body mt-4 text-lg font-semibold">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#9ca3af]">{text}</p>
                </motion.div>
              ))}
            </div>

            {/* 6-week map */}
            <motion.div {...reveal(0.1)} className="mt-12">
              <h3 className="font-body mb-6 text-center text-sm font-semibold uppercase tracking-[0.2em] text-[#9ca3af]">
                The 6-week arc
              </h3>
              <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {WEEKS.map(({ wk, title, focus }) => (
                  <li
                    key={wk}
                    className="flex gap-4 rounded-xl border border-white/10 bg-white/[0.02] p-4"
                  >
                    <span className="font-body text-2xl font-extrabold text-[#00A699]">{wk}</span>
                    <span>
                      <span className="block font-semibold">{title}</span>
                      <span className="mt-0.5 block text-sm text-[#9ca3af]">{focus}</span>
                    </span>
                  </li>
                ))}
              </ol>
            </motion.div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section aria-labelledby="how-heading" className="px-6 py-20 md:px-10 md:py-24">
          <div className="mx-auto max-w-5xl">
            <motion.div {...reveal(0)} className="mb-12 flex flex-col items-center gap-3 text-center">
              <TealRule />
              <h2 id="how-heading" className="font-body text-3xl font-bold md:text-4xl">
                How it works
              </h2>
            </motion.div>
            <div className="grid gap-6 md:grid-cols-3">
              {STEPS.map(({ n, title, text }, i) => (
                <motion.div key={n} {...reveal(i * 0.08)} className="relative rounded-2xl border border-white/10 bg-white/[0.03] p-7">
                  <span className="font-body text-5xl font-extrabold text-white/10">{n}</span>
                  <h3 className="font-body mt-2 text-xl font-semibold">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#9ca3af]">{text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* PRICING */}
        <section aria-labelledby="pricing-heading" className="border-t border-white/5 px-6 py-20 md:px-10 md:py-28">
          <div className="mx-auto max-w-4xl">
            <motion.div {...reveal(0)} className="mb-12 flex flex-col items-center gap-3 text-center">
              <TealRule />
              <h2 id="pricing-heading" className="font-body text-3xl font-bold md:text-4xl">
                Three ways in
              </h2>
              <p className="text-[#9ca3af]">One-time payment. Lifetime access. Prices rise as founding cohorts fill.</p>
            </motion.div>
            <div className="grid gap-6 md:grid-cols-3">
              {TIERS.map((tier, i) => (
                <motion.div
                  key={tier.name}
                  {...reveal(i * 0.08)}
                  className={
                    tier.highlight
                      ? "relative rounded-3xl border-2 border-[#00A699] bg-[#00A699]/[0.06] p-8"
                      : "relative rounded-3xl border border-white/10 bg-white/[0.03] p-8"
                  }
                >
                  {tier.highlight && (
                    <span className="absolute -top-3 left-8 rounded-full bg-[#00A699] px-3 py-1 text-xs font-bold uppercase tracking-wide text-[#0d0d1a]">
                      Most popular
                    </span>
                  )}
                  <h3 className="font-body text-xl font-semibold">{tier.name}</h3>
                  <p className="mt-1 text-sm text-[#9ca3af]">{tier.tagline}</p>
                  <p className="font-body mt-5 text-5xl font-extrabold">{tier.price}</p>
                  <ul className="mt-6 space-y-3">
                    {tier.features.map((f) => (
                      <li key={f} className="flex items-start gap-3 text-sm text-[#c7cad1]">
                        <ShieldCheck size={18} className="mt-0.5 shrink-0 text-[#00A699]" aria-hidden="true" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <a
                    href="#apply"
                    className={
                      tier.highlight
                        ? "mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#00A699] px-6 py-3.5 font-bold text-[#0d0d1a] transition-transform hover:scale-[1.02]"
                        : "mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full border border-[#00A699]/60 px-6 py-3.5 font-semibold text-[#00A699] transition-colors hover:bg-[#00A699] hover:text-[#0d0d1a]"
                    }
                  >
                    Apply <ArrowRight size={16} />
                  </a>
                </motion.div>
              ))}
            </div>
            <motion.p {...reveal(0.1)} className="mt-8 flex items-center justify-center gap-2 text-center text-sm text-[#9ca3af]">
              <ShieldCheck size={16} className="text-[#00A699]" aria-hidden="true" />
              Complete the protocol as designed — if you don't improve, I refund you in full.
            </motion.p>
          </div>
        </section>

        {/* FAQ */}
        <section aria-labelledby="faq-heading" className="px-6 py-20 md:px-10 md:py-24">
          <div className="mx-auto max-w-3xl">
            <motion.div {...reveal(0)} className="mb-10 flex flex-col items-center gap-3 text-center">
              <TealRule />
              <h2 id="faq-heading" className="font-body text-3xl font-bold md:text-4xl">
                Questions
              </h2>
            </motion.div>
            <div className="space-y-3">
              {FAQS.map(({ q, a }, i) => (
                <motion.details
                  key={q}
                  {...reveal(i * 0.05)}
                  className="group rounded-xl border border-white/10 bg-white/[0.03] p-5 [&_summary]:cursor-pointer"
                >
                  <summary className="font-body flex items-center justify-between font-semibold marker:content-none">
                    {q}
                    <span className="text-[#00A699] transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-[#9ca3af]">{a}</p>
                </motion.details>
              ))}
            </div>
          </div>
        </section>

        {/* APPLY */}
        <section id="apply" aria-labelledby="apply-heading" className="border-t border-white/5 px-6 py-20 md:px-10 md:py-28">
          <div className="mx-auto max-w-xl">
            <motion.div {...reveal(0)} className="mb-8 text-center">
              <div className="mb-4 flex flex-col items-center gap-3">
                <TealRule />
                <h2 id="apply-heading" className="font-body text-3xl font-bold md:text-4xl">
                  Apply for a founding spot
                </h2>
              </div>
              <p className="text-[#9ca3af]">
                Spots are limited to keep the group small. I review every application personally and
                reply within 24 hours with your next steps.
              </p>
            </motion.div>

            {status === "success" ? (
              <motion.div
                {...reveal(0)}
                className="rounded-2xl border border-[#00A699]/40 bg-[#00A699]/[0.08] p-8 text-center"
              >
                <h3 className="font-body text-xl font-bold text-[#00A699]">Application received</h3>
                <p className="mt-2 text-[#c7cad1]">{message}</p>
              </motion.div>
            ) : (
              <motion.form {...reveal(0.08)} onSubmit={onSubmit} className="space-y-4">
                <div>
                  <label htmlFor="firstName" className="mb-2 block text-xs font-semibold uppercase tracking-wide text-[#9ca3af]">
                    First name
                  </label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    required
                    autoComplete="given-name"
                    value={form.firstName}
                    onChange={onChange}
                    disabled={status === "loading"}
                    placeholder="Your first name"
                    className="w-full rounded-lg border border-white/15 bg-white/[0.04] px-4 py-3 text-white placeholder-white/30 transition-colors focus:border-[#00A699] focus:outline-none disabled:opacity-50"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="mb-2 block text-xs font-semibold uppercase tracking-wide text-[#9ca3af]">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    value={form.email}
                    onChange={onChange}
                    disabled={status === "loading"}
                    placeholder="you@example.com"
                    className="w-full rounded-lg border border-white/15 bg-white/[0.04] px-4 py-3 text-white placeholder-white/30 transition-colors focus:border-[#00A699] focus:outline-none disabled:opacity-50"
                  />
                </div>
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#00A699] px-8 py-4 text-base font-bold text-[#0d0d1a] transition-transform hover:scale-[1.01] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white disabled:opacity-50"
                >
                  {status === "loading" ? "Submitting…" : (
                    <>
                      Submit my application
                      <ArrowRight size={18} />
                    </>
                  )}
                </button>
                {status === "error" && (
                  <p className="text-center text-sm text-red-400">{message}</p>
                )}
                <p className="text-center text-xs text-[#6b7280]">
                  No payment now. You'll get the intro video and your next steps by email.
                </p>
              </motion.form>
            )}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 px-6 py-10 text-center md:px-10">
        <Wordmark />
        <p className="mx-auto mt-4 max-w-md text-xs leading-relaxed text-[#6b7280]">
          We respect your privacy and never share your email. You can unsubscribe at any time.
        </p>
        <p className="mt-3 text-xs text-[#6b7280]">
          Glute Longevity · A Crosswalk Wisdom brand · Built by Sahawat, former physician
        </p>
      </footer>
    </div>
  );
}
