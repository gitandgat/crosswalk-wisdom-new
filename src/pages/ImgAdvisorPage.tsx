import { useState, useRef, useEffect } from "react";
import type { FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Loader2, ChevronRight } from "lucide-react";
import ReactMarkdown from "react-markdown";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay },
});

// ── Step definitions ─────────────────────────────────────────────

type FormData = {
  yearsOnPath: string;
  specialty: string;
  applicationCycles: string;
  interviewsReceived: string;
  immigrationStatus: string;
  currentIncome: string;
  amountSpent: string;
  primaryFear: string;
  identityAttachment: string;
  situation: string;
  firstName: string;
  email: string;
};

const EMPTY: FormData = {
  yearsOnPath: "", specialty: "", applicationCycles: "", interviewsReceived: "",
  immigrationStatus: "", currentIncome: "", amountSpent: "",
  primaryFear: "", identityAttachment: "7", situation: "",
  firstName: "", email: "",
};

// ── Thinking messages ────────────────────────────────────────────

const THINKING = [
  "Reading your situation…",
  "Running the math on your pathway…",
  "Identifying your sunk cost layers…",
  "Matching your background to career paths…",
  "Building your 30-day action plan…",
  "Finalising your assessment…",
];

// ── Main component ───────────────────────────────────────────────

export default function ImgAdvisorPage() {
  const [step, setStep] = useState<"intro" | "form" | "gate" | "loading" | "result">("intro");
  const [form, setForm] = useState<FormData>(EMPTY);
  const [thinkingIdx, setThinkingIdx] = useState(0);
  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const resultRef = useRef<HTMLDivElement>(null);
  const thinkingTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  const set = (k: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }));

  // Cycle thinking messages
  useEffect(() => {
    if (step === "loading") {
      thinkingTimer.current = setInterval(() => {
        setThinkingIdx(i => (i + 1) % THINKING.length);
      }, 2200);
    } else {
      if (thinkingTimer.current) clearInterval(thinkingTimer.current);
      setThinkingIdx(0);
    }
    return () => { if (thinkingTimer.current) clearInterval(thinkingTimer.current); };
  }, [step]);

  // Scroll to result when it starts streaming
  useEffect(() => {
    if (step === "result" && resultRef.current) {
      resultRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [step]);

  async function runAdvisor() {
    setStep("loading");
    setResult("");
    setError("");

    try {
      const res = await fetch("/api/img-advisor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok || !res.body) {
        const data = await res.json().catch(() => ({}));
        setError(data.error || "Something went wrong. Please try again.");
        setStep("gate");
        return;
      }

      setStep("result");
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";
        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          try {
            const payload = JSON.parse(line.slice(6));
            if (payload.text) setResult(r => r + payload.text);
          } catch { /* skip */ }
        }
      }
    } catch {
      setError("Network error — please check your connection and try again.");
      setStep("gate");
    }
  }

  async function handleGate(e: FormEvent) {
    e.preventDefault();
    if (!form.firstName.trim() || !form.email.trim()) return;
    await runAdvisor();
  }

  const inputCls = "w-full px-4 py-3 bg-white border border-border rounded-sm font-body text-sm text-ink placeholder-muted/50 focus:outline-none focus:border-forest transition-colors";
  const selectCls = inputCls;
  const labelCls = "block font-body text-xs font-semibold tracking-widest uppercase text-muted mb-1.5";

  // ── INTRO ────────────────────────────────────────────────────────
  if (step === "intro") return (
    <div className="min-h-screen bg-parchment">
      <Navbar />
      <section className="bg-[#1E1C1A] text-parchment px-6 md:px-12 py-20 md:py-32">
        <div className="max-w-3xl mx-auto">
          <motion.a {...fadeUp(0)} href="/img"
            className="inline-flex items-center gap-1 font-body text-xs text-parchment/30 hover:text-parchment/60 transition-colors mb-8">
            ← Back to the IMG Pivot Guide
          </motion.a>
          <motion.p {...fadeUp(0.05)} className="font-body text-xs tracking-widest uppercase text-amber-400/70 mb-5">
            Free · Powered by Claude AI
          </motion.p>
          <motion.h1 {...fadeUp(0.1)} className="font-display text-4xl md:text-6xl leading-tight mb-6">
            The IMG AI Advisor
          </motion.h1>
          <motion.p {...fadeUp(0.2)} className="font-body text-lg md:text-xl text-parchment/70 leading-relaxed mb-4 max-w-2xl">
            Tell it your situation. Get a personalized assessment — your honest sunk cost analysis,
            your 3 best-fit career paths, and a 30-day action plan.
          </motion.p>
          <motion.p {...fadeUp(0.25)} className="font-body text-base text-parchment/50 leading-relaxed mb-10 max-w-2xl">
            Not generic advice. Built on your specific years, specialty, immigration status, and fears.
            Takes 3 minutes to fill in. The advisor does the rest.
          </motion.p>

          <motion.div {...fadeUp(0.3)} className="grid sm:grid-cols-3 gap-4 mb-12">
            {[
              { label: "Your situation", desc: "Honest reflection of your specific numbers back to you" },
              { label: "Your 3 paths", desc: "Career paths chosen for your specialty and background" },
              { label: "Your action plan", desc: "5–7 concrete steps + one thing to do today" },
            ].map((item, i) => (
              <div key={i} className="border border-parchment/10 rounded-sm px-5 py-4">
                <p className="font-body text-xs font-semibold tracking-widest uppercase text-amber-400 mb-2">{item.label}</p>
                <p className="font-body text-sm text-parchment/60 leading-snug">{item.desc}</p>
              </div>
            ))}
          </motion.div>

          <motion.div {...fadeUp(0.35)} className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <motion.button
              onClick={() => setStep("form")}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-3 px-12 py-5 bg-parchment text-ink font-body font-bold text-xl rounded-sm hover:bg-white transition-colors shadow-lg shadow-black/40"
            >
              Start my assessment
              <ArrowRight size={20} />
            </motion.button>
            <p className="font-body text-xs text-parchment/30 leading-relaxed">
              Free · Private · 3 minutes
            </p>
          </motion.div>
        </div>
      </section>
      <div className="h-2 crosswalk-stripes opacity-40" />
      <Footer />
    </div>
  );

  // ── FORM ─────────────────────────────────────────────────────────
  if (step === "form") return (
    <div className="min-h-screen bg-parchment">
      <Navbar />
      <section className="px-6 md:px-12 py-16 md:py-24">
        <div className="max-w-2xl mx-auto">
          <motion.a {...fadeUp(0)} href="/img"
            className="inline-flex items-center gap-1 font-body text-xs text-muted hover:text-ink transition-colors mb-8">
            ← Back
          </motion.a>
          <motion.p {...fadeUp(0.05)} className="eyebrow mb-3">Your situation</motion.p>
          <motion.h1 {...fadeUp(0.1)} className="font-display text-3xl md:text-4xl text-ink leading-tight mb-2">
            Tell the advisor your situation.
          </motion.h1>
          <motion.p {...fadeUp(0.15)} className="font-body text-base text-charcoal mb-10">
            The more honest you are, the more useful the assessment. The advisor has read the same Reddit threads you have.
          </motion.p>

          <motion.div {...fadeUp(0.2)} className="space-y-7">

            {/* Row 1 */}
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className={labelCls}>Years on the pathway</label>
                <select value={form.yearsOnPath} onChange={set("yearsOnPath")} className={selectCls}>
                  <option value="">Select…</option>
                  {["Less than 1 year","1 year","2 years","3 years","4 years","5 years","6–7 years","8+ years"].map(v => (
                    <option key={v} value={v}>{v}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className={labelCls}>Target specialty</label>
                <input type="text" placeholder="e.g. Family Medicine, Internal Medicine"
                  value={form.specialty} onChange={set("specialty")} className={inputCls} />
              </div>
            </div>

            {/* Row 2 */}
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className={labelCls}>CaRMS application cycles</label>
                <select value={form.applicationCycles} onChange={set("applicationCycles")} className={selectCls}>
                  <option value="">Select…</option>
                  {["Not yet applied","1 cycle","2 cycles","3 cycles","4+ cycles"].map(v => (
                    <option key={v} value={v}>{v}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className={labelCls}>Total interview invitations received</label>
                <select value={form.interviewsReceived} onChange={set("interviewsReceived")} className={selectCls}>
                  <option value="">Select…</option>
                  {["0","1–2","3–5","6–10","More than 10"].map(v => (
                    <option key={v} value={v}>{v}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Row 3 */}
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className={labelCls}>Immigration status</label>
                <select value={form.immigrationStatus} onChange={set("immigrationStatus")} className={selectCls}>
                  <option value="">Select…</option>
                  <option value="Permanent Resident">Permanent Resident (PR)</option>
                  <option value="Open Work Permit">Open Work Permit</option>
                  <option value="Employer-specific Work Permit">Employer-specific Work Permit</option>
                  <option value="Student Visa">Student Visa</option>
                  <option value="Refugee / Protected Person">Refugee / Protected Person</option>
                  <option value="Canadian Citizen">Canadian Citizen</option>
                </select>
              </div>
              <div>
                <label className={labelCls}>Current annual income (CAD)</label>
                <select value={form.currentIncome} onChange={set("currentIncome")} className={selectCls}>
                  <option value="">Select…</option>
                  {["No income currently","Under $30K","$30K–$50K","$50K–$70K","$70K–$100K","Over $100K"].map(v => (
                    <option key={v} value={v}>{v}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Row 4 */}
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className={labelCls}>Total spent on pathway (CAD)</label>
                <select value={form.amountSpent} onChange={set("amountSpent")} className={selectCls}>
                  <option value="">Select…</option>
                  {["Under $5K","$5K–$10K","$10K–$20K","$20K–$35K","$35K–$50K","Over $50K"].map(v => (
                    <option key={v} value={v}>{v}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className={labelCls}>Biggest fear about leaving</label>
                <select value={form.primaryFear} onChange={set("primaryFear")} className={selectCls}>
                  <option value="">Select…</option>
                  <option value="Losing my income / financial insecurity">Financial insecurity</option>
                  <option value="Losing my identity as a doctor">Losing my identity as a doctor</option>
                  <option value="Losing my immigration status or PR pathway">Losing immigration status / PR</option>
                  <option value="What my family will think">What my family will think</option>
                  <option value="That I wasted my medical degree">That I wasted my medical degree</option>
                  <option value="Not knowing what I'd do instead">Not knowing what I'd do instead</option>
                </select>
              </div>
            </div>

            {/* Identity slider */}
            <div>
              <label className={labelCls}>
                How strongly do you identify as "a doctor"? (1 = not at all, 10 = it's who I am)
              </label>
              <div className="flex items-center gap-4 mt-2">
                <span className="font-body text-xs text-muted">1</span>
                <input type="range" min="1" max="10" value={form.identityAttachment}
                  onChange={set("identityAttachment")}
                  className="flex-1 accent-forest h-1.5" />
                <span className="font-body text-xs text-muted">10</span>
                <span className="font-display text-2xl text-forest w-8 text-center">{form.identityAttachment}</span>
              </div>
            </div>

            {/* Open text */}
            <div>
              <label className={labelCls}>In your own words — what's your situation? (optional but valuable)</label>
              <textarea
                rows={4}
                placeholder="e.g. I've been on the pathway for 4 years, applied twice, got 2 interviews. I work as a research assistant. My family expects me to match. I don't know if I want to anymore but I'm terrified of what stopping means for my PR application..."
                value={form.situation} onChange={set("situation")}
                className={`${inputCls} resize-none`}
              />
            </div>

            <button
              onClick={() => setStep("gate")}
              disabled={!form.yearsOnPath || !form.specialty || !form.applicationCycles || !form.immigrationStatus || !form.primaryFear}
              className="inline-flex items-center gap-2 px-10 py-4 bg-forest text-parchment font-body font-semibold text-base rounded-sm hover:bg-forest/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Get my assessment
              <ChevronRight size={17} />
            </button>
          </motion.div>
        </div>
      </section>
      <Footer />
    </div>
  );

  // ── EMAIL GATE ───────────────────────────────────────────────────
  if (step === "gate") return (
    <div className="min-h-screen bg-parchment">
      <Navbar />
      <section className="px-6 md:px-12 py-24 md:py-36">
        <div className="max-w-xl mx-auto text-center">
          <motion.p {...fadeUp(0)} className="eyebrow mb-4">One last step</motion.p>
          <motion.h1 {...fadeUp(0.1)} className="font-display text-3xl md:text-4xl text-ink leading-tight mb-4">
            Where should we send your assessment?
          </motion.h1>
          <motion.p {...fadeUp(0.2)} className="font-body text-base text-charcoal leading-relaxed mb-10">
            Your personalized report will appear on screen immediately — and we&rsquo;ll also email you a copy so you can reference it later.
          </motion.p>

          <motion.form {...fadeUp(0.25)} onSubmit={handleGate} className="space-y-4 text-left">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className={labelCls}>First name</label>
                <input type="text" required placeholder="Reza"
                  value={form.firstName} onChange={set("firstName")} className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>Email address</label>
                <input type="email" required placeholder="reza@example.com"
                  value={form.email} onChange={set("email")} className={inputCls} />
              </div>
            </div>

            {error && <p className="font-body text-sm text-red-600">{error}</p>}

            <button type="submit"
              disabled={!form.firstName.trim() || !form.email.trim()}
              className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 bg-forest text-parchment font-body font-semibold text-base rounded-sm hover:bg-forest/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Show me my assessment
              <ArrowRight size={16} />
            </button>
            <p className="font-body text-xs text-muted text-center">
              Free. No spam. Unsubscribe any time.
            </p>
          </motion.form>
        </div>
      </section>
      <Footer />
    </div>
  );

  // ── LOADING ──────────────────────────────────────────────────────
  if (step === "loading") return (
    <div className="min-h-screen bg-[#1E1C1A] flex flex-col items-center justify-center px-6">
      <div className="text-center max-w-sm">
        <Loader2 size={36} className="text-amber-400 animate-spin mx-auto mb-8" />
        <AnimatePresence mode="wait">
          <motion.p
            key={thinkingIdx}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4 }}
            className="font-display text-xl text-parchment/80"
          >
            {THINKING[thinkingIdx]}
          </motion.p>
        </AnimatePresence>
        <p className="font-body text-xs text-parchment/30 mt-6">
          Reading {form.yearsOnPath} on the pathway…
        </p>
      </div>
    </div>
  );

  // ── RESULT ───────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-parchment">
      <Navbar />

      {/* Hero strip */}
      <section className="bg-[#1E1C1A] text-parchment px-6 md:px-12 py-12">
        <div className="max-w-3xl mx-auto">
          <p className="font-body text-xs tracking-widest uppercase text-amber-400/70 mb-3">
            Your personalized assessment
          </p>
          <h1 className="font-display text-3xl md:text-4xl leading-tight">
            {form.firstName}, here&rsquo;s what the advisor found.
          </h1>
          <p className="font-body text-sm text-parchment/50 mt-3">
            Based on {form.yearsOnPath} on the pathway · {form.specialty} · {form.immigrationStatus}
          </p>
        </div>
      </section>
      <div className="h-2 crosswalk-stripes opacity-40" />

      {/* Result body */}
      <section className="px-6 md:px-12 py-16" ref={resultRef}>
        <div className="max-w-3xl mx-auto">
          {result ? (
            <div className="prose prose-slate max-w-none
              prose-h2:font-display prose-h2:text-ink prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-h2:border-b prose-h2:border-border prose-h2:pb-3
              prose-p:font-body prose-p:text-charcoal prose-p:leading-relaxed prose-p:text-base
              prose-li:font-body prose-li:text-charcoal prose-li:text-base prose-li:leading-relaxed
              prose-strong:text-ink prose-strong:font-semibold
              prose-ul:space-y-2 prose-ol:space-y-2">
              <ReactMarkdown>{result}</ReactMarkdown>
            </div>
          ) : (
            <div className="flex items-center gap-3 text-muted">
              <Loader2 size={18} className="animate-spin" />
              <span className="font-body text-sm">Generating your assessment…</span>
            </div>
          )}

          {/* Product CTA — shown after result loads */}
          {result && result.length > 400 && (
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="mt-16 border-t border-border pt-12"
            >
              <p className="eyebrow mb-4">What to do next</p>
              <h2 className="font-display text-2xl md:text-3xl text-ink mb-8">
                The advisor showed you the map. These tools help you walk it.
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { price: "Free", title: "MCCQE Reality Calculator", desc: "Run the full financial math on your specific numbers.", href: "/img#calculator", color: "border-forest" },
                  { price: "$17", title: "Should You Keep Going?", desc: "Decision framework for IMGs ready to answer the question.", href: "/img/pivot", color: "border-amber-300" },
                  { price: "$37", title: "The IMG Career Map", desc: "Deep dive on the 3 paths the advisor recommended — with income data and first steps.", href: "/img/map", color: "border-teal-300" },
                  { price: "$47", title: "The IMG Survival Playbook", desc: "30-day plan to first non-clinical income with 8 copy-paste templates.", href: "/img/playbook", color: "border-violet-300" },
                ].map((p, i) => (
                  <a key={i} href={p.href}
                    className={`block border-2 ${p.color} rounded-sm p-5 hover:bg-white transition-colors group`}>
                    <span className="font-body text-xs font-bold text-muted uppercase tracking-widest">{p.price}</span>
                    <h3 className="font-display text-lg text-ink mt-1 mb-1 group-hover:text-forest transition-colors">{p.title}</h3>
                    <p className="font-body text-sm text-charcoal leading-snug">{p.desc}</p>
                  </a>
                ))}
              </div>

              <div className="mt-10 text-center">
                <button
                  onClick={() => { setForm(EMPTY); setResult(""); setStep("intro"); }}
                  className="font-body text-sm text-muted hover:text-ink underline underline-offset-4 transition-colors"
                >
                  Run a new assessment
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      <div className="h-2 crosswalk-stripes opacity-40" />
      <Footer />
    </div>
  );
}
