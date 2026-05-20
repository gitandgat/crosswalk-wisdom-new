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

const PROMPTS = [
  {
    num: "01",
    name: "The Credential Detox",
    description: "Who are you when the title is removed? This prompt excavates your values, personality, and strengths beneath the professional identity — and names them in language that has nothing to do with medicine.",
  },
  {
    num: "02",
    name: "The Skills Translator",
    description: "Your clinical training in non-clinical language. This prompt converts 5–15 years of medical expertise into the vocabulary the rest of the market speaks — and shows you where your skills are most valuable.",
  },
  {
    num: "03",
    name: "The Shame Reframe",
    description: "What \"leaving\" actually means vs. what your family fears. This prompt separates your decision from others' expectations — and gives you language to explain the crossing without making it feel like a betrayal.",
  },
  {
    num: "04",
    name: "The Financial Fear Solver",
    description: "The math that makes \"I can't pivot\" feel less true. This prompt walks Claude or ChatGPT through your specific financial situation and produces a realistic bridge income model for your first 90 days.",
  },
  {
    num: "05",
    name: "The Wise Mentor",
    description: "What someone who loves you AND knows the data would say. The prompt that synthesizes everything — your values, your skills, your fears, your finances — into a clear, compassionate recommendation.",
  },
];

const FAQS = [
  {
    q: "Do I need to know how to use AI to use these prompts?",
    a: "No. The prompts are copy-paste ready for Claude.ai or ChatGPT. You don't need any technical knowledge — just paste the prompt, add your details where indicated, and read what comes back.",
  },
  {
    q: "Which AI tool should I use?",
    a: "Claude (claude.ai) or ChatGPT both work well. Claude tends to be more emotionally nuanced for reflective work like this. Either is fine.",
  },
  {
    q: "How long does this take?",
    a: "About 30 minutes for all five prompts. Some people do one per day. There's no wrong way.",
  },
  {
    q: "Is this therapy?",
    a: "No. These are structured reflection prompts, not clinical support. If you're experiencing significant mental health distress, please also speak with a professional. This is a career clarity tool.",
  },
  {
    q: "What if I want a refund?",
    a: "Email sahawat@crosswalkwisdom.com. Full refund, no questions asked.",
  },
];

export default function ImgIdentityPage() {
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
            className="font-body text-xs tracking-widest uppercase text-sky-400/70 mb-5"
          >
            $27 Prompt Pack
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display text-4xl md:text-6xl leading-tight mb-6"
          >
            The IMG Identity Reset
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="font-body text-lg md:text-xl text-parchment/70 leading-relaxed mb-4 max-w-2xl"
          >
            5 AI prompts for physicians done letting one exam define them.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="font-body text-base text-parchment/50 leading-relaxed mb-10 max-w-2xl"
          >
            The clarity that took Sahawat 2 years to find — you can get in 30 minutes.
            Not because you're smarter. Because you have tools that didn't exist when
            he was crossing over.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 items-start sm:items-center"
          >
            <a
              href="https://sahawat.gumroad.com/l/img-identity-reset"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-sky-500 text-white font-body font-semibold text-base rounded-sm hover:bg-sky-400 transition-colors"
            >
              Get the prompts — $27
              <ArrowRight size={16} />
            </a>
            <p className="font-body text-sm text-parchment/40">
              PDF · Instant download · Copy-paste ready for Claude or ChatGPT
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── THE PROBLEM ── */}
      <section className="px-6 md:px-12 py-20 md:py-28 bg-parchment">
        <div className="max-w-3xl mx-auto">
          <motion.p {...fadeUp(0)} className="eyebrow mb-4">The identity trap</motion.p>
          <motion.h2 {...fadeUp(0.1)} className="font-display text-3xl md:text-5xl text-ink leading-tight mb-8">
            "We're basically useless
            <br />
            <span className="text-forest">without a residency."</span>
          </motion.h2>
          <motion.p {...fadeUp(0.15)} className="font-body text-xs text-muted mb-8 italic">
            — Real quote from an unmatched IMG, from a study of 206 Reddit posts (Academic Medicine, 2023)
          </motion.p>

          <motion.div {...fadeUp(0.2)} className="space-y-5 font-body text-base md:text-lg text-charcoal leading-relaxed">
            <p>
              Medical training doesn't just teach you medicine. It builds an identity
              around being a doctor — so completely that leaving the path feels like
              losing yourself.
            </p>
            <p>
              Researchers call this <strong className="text-ink">identity fusion</strong> — when your professional role
              becomes so embedded in your sense of self that the two become
              indistinguishable. It's not unique to medicine, but it's unusually
              intense in medicine because the training is so long, so demanding, and
              so socially reinforced.
            </p>
            <p>
              The result: IMGs who stop pursuing the MCCQE path don't just feel like
              they've changed careers. They feel like they've died and been replaced
              by someone lesser.
            </p>
            <p className="font-medium text-ink">
              That's not the truth. That's identity fusion talking. These prompts
              help you separate the two.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── THE 5 PROMPTS ── */}
      <section className="bg-ink text-parchment px-6 md:px-12 py-20 md:py-28">
        <div className="max-w-3xl mx-auto">
          <motion.p {...fadeUp(0)} className="font-body text-xs tracking-widest uppercase text-parchment/30 mb-4">
            What's included
          </motion.p>
          <motion.h2 {...fadeUp(0.1)} className="font-display text-3xl md:text-4xl leading-tight mb-12">
            5 prompts. 30 minutes.
            <br />
            A different relationship with the credential.
          </motion.h2>

          <div className="space-y-8">
            {PROMPTS.map((prompt, i) => (
              <motion.div key={i} {...fadeUp(0.08 * i)} className="flex gap-5 border-t border-parchment/10 pt-8">
                <span className="font-display text-4xl text-sky-500/40 leading-none flex-shrink-0">
                  {prompt.num}
                </span>
                <div>
                  <h3 className="font-display text-xl text-sky-400 mb-3">{prompt.name}</h3>
                  <p className="font-body text-sm text-parchment/65 leading-relaxed">{prompt.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div {...fadeUp(0.5)} className="mt-12 border-t border-parchment/10 pt-8">
            <p className="font-body text-sm text-parchment/40 leading-relaxed">
              Each prompt includes: the exact text to paste into Claude or ChatGPT,
              instructions for personalizing it to your situation, and a note on what
              to do with what comes back.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── COMPARISON ── */}
      <section className="px-6 md:px-12 py-20 bg-parchment">
        <div className="max-w-3xl mx-auto">
          <motion.h2 {...fadeUp(0)} className="font-display text-3xl md:text-4xl text-ink leading-tight mb-10">
            $27 vs. 2 years.
          </motion.h2>
          <div className="grid md:grid-cols-2 gap-6">
            <motion.div {...fadeUp(0.1)} className="bg-white border border-border rounded-sm p-6">
              <p className="font-body text-xs font-semibold tracking-widest uppercase text-muted mb-4">Without this</p>
              <ul className="space-y-3">
                {[
                  "2+ years figuring out who you are without the credential",
                  "Therapy, journaling, and spiraling — mostly alone",
                  "Shame about working below your education level",
                  "No language to explain the crossing to your family",
                  "Identity still fused to a path that may not match you",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="text-red-400 mt-0.5">✕</span>
                    <span className="font-body text-sm text-charcoal leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div {...fadeUp(0.15)} className="bg-sky-50 border border-sky-200 rounded-sm p-6">
              <p className="font-body text-xs font-semibold tracking-widest uppercase text-sky-600 mb-4">With this</p>
              <ul className="space-y-3">
                {[
                  "30 minutes to clarity on who you are beneath the degree",
                  "AI-assisted, structured, repeatable — not one-off insights",
                  "Language to translate your skills for any audience",
                  "A reframe that makes the conversation with family possible",
                  "Identity that belongs to you, not to an exam system",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <Check size={14} className="text-sky-500 mt-0.5 flex-shrink-0" />
                    <span className="font-body text-sm text-charcoal leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-[#1E1C1A] text-parchment px-6 md:px-12 py-20 md:py-28">
        <div className="max-w-2xl mx-auto text-center">
          <motion.h2 {...fadeUp(0)} className="font-display text-3xl md:text-5xl leading-tight mb-6">
            I left medicine before Claude existed.
          </motion.h2>
          <motion.p {...fadeUp(0.1)} className="font-body text-base md:text-lg text-parchment/65 leading-relaxed mb-10">
            It took me 2 years to get the clarity you can get in 30 minutes.
            I'm a little jealous my clients get to use these.
            I wish they'd existed when I was crossing over.
          </motion.p>
          <motion.a
            {...fadeUp(0.2)}
            href="https://sahawat.gumroad.com/l/img-identity-reset"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-10 py-5 bg-sky-500 text-white font-body font-semibold text-lg rounded-sm hover:bg-sky-400 transition-colors"
          >
            Get the prompts — $27
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
