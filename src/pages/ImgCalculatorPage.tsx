import { useState } from "react";
import type { FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, Loader2, Calculator, CheckCircle2, AlertTriangle, TrendingDown } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

/* ─── types ─── */
type ImmigrationStatus = "permanent_resident" | "work_permit" | "refugee" | "citizen" | "other";
type FearLevel = 1 | 2 | 3 | 4 | 5;

interface FormData {
  yearsOnPath: number;
  totalSpent: number;
  currentIncome: number;
  immigrationStatus: ImmigrationStatus | "";
  financialFear: FearLevel;
  identityFear: FearLevel;
  immigrationFear: FearLevel;
  firstName: string;
  email: string;
}

const INITIAL: FormData = {
  yearsOnPath: 0,
  totalSpent: 0,
  currentIncome: 0,
  immigrationStatus: "",
  financialFear: 3,
  identityFear: 3,
  immigrationFear: 3,
  firstName: "",
  email: "",
};

/* ─── helpers ─── */
function matchProbability(years: number): number {
  // CaRMS data: IMGs 10-22%. Each retry doesn't improve odds substantially.
  if (years <= 2) return 22;
  if (years <= 4) return 16;
  if (years <= 6) return 12;
  return 10;
}

function projectedCostToContinue(spent: number, years: number): number {
  // ~$8-12K/year additional on pathway
  const yearlyCost = 10000;
  const remainingYears = Math.max(2, 5 - Math.min(years, 4));
  return Math.round(spent + yearlyCost * remainingYears);
}

function opportunityCost(currentIncome: number, years: number): number {
  // Doctors in non-clinical roles earn $40-60K; could earn $85-120K pivoting
  const potentialIncome = 95000;
  const gap = Math.max(0, potentialIncome - currentIncome);
  const projYears = Math.max(2, 5 - Math.min(years, 4));
  return Math.round(gap * projYears);
}

function riskScore(data: FormData): "high" | "medium" | "low" {
  const score =
    data.financialFear +
    data.identityFear +
    (data.immigrationStatus === "work_permit" || data.immigrationStatus === "refugee"
      ? data.immigrationFear + 1
      : data.immigrationFear) +
    Math.min(data.yearsOnPath, 5);

  if (score >= 14) return "high";
  if (score >= 9) return "medium";
  return "low";
}

function recommendation(data: FormData): {
  headline: string;
  body: string;
  urgency: "high" | "medium" | "low";
} {
  const matchP = matchProbability(data.yearsOnPath);
  const risk = riskScore(data);

  if (data.yearsOnPath >= 5 && matchP <= 12) {
    return {
      headline: "The math is telling you something.",
      body: `After ${data.yearsOnPath} years, your statistical match probability is ${matchP}%. That number doesn't go up meaningfully with more attempts. The sunk cost is real — but only the next dollar is a choice.`,
      urgency: "high",
    };
  }
  if (risk === "high") {
    return {
      headline: "You're carrying more than the exam.",
      body: "Your fears — financial, identity, immigration — are all active. That's not weakness. That's four psychological anchors keeping you on a treadmill. Naming them is step one.",
      urgency: "high",
    };
  }
  if (data.yearsOnPath >= 3) {
    return {
      headline: "You're at the decision window.",
      body: `${data.yearsOnPath} years in. The pathway still has a path — but so does the alternative. This is the moment to run the full numbers, not wait another year.`,
      urgency: "medium",
    };
  }
  return {
    headline: "You're early enough to choose deliberately.",
    body: "The trap hasn't fully closed. You have more options now than you will in 2 years. This is a good time to map what both paths actually look like.",
    urgency: "low",
  };
}

/* ─── subcomponents ─── */
const fadeSlide = {
  initial: { opacity: 0, x: 24 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -24 },
  transition: { duration: 0.35 },
};

function ProgressBar({ step, total }: { step: number; total: number }) {
  return (
    <div className="flex items-center gap-2 mb-10">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={`h-1 flex-1 rounded-full transition-all duration-500 ${
            i < step ? "bg-forest" : i === step ? "bg-amber" : "bg-border"
          }`}
        />
      ))}
      <span className="font-body text-xs text-muted ml-2 shrink-0">
        {step + 1} / {total}
      </span>
    </div>
  );
}

function FearSlider({
  label,
  sublabel,
  value,
  onChange,
}: {
  label: string;
  sublabel: string;
  value: FearLevel;
  onChange: (v: FearLevel) => void;
}) {
  const labels = ["Not worried", "Slightly", "Moderately", "Very", "Paralyzing"];
  return (
    <div className="space-y-3">
      <div>
        <p className="font-body text-base font-semibold text-ink">{label}</p>
        <p className="font-body text-sm text-muted">{sublabel}</p>
      </div>
      <div className="flex gap-2">
        {([1, 2, 3, 4, 5] as FearLevel[]).map((v) => (
          <button
            key={v}
            type="button"
            onClick={() => onChange(v)}
            className={`flex-1 py-3 rounded-sm font-body text-sm font-medium border transition-all ${
              value === v
                ? "bg-forest text-parchment border-forest"
                : "bg-white border-border text-muted hover:border-forest/40"
            }`}
          >
            {v}
          </button>
        ))}
      </div>
      <p className="font-body text-xs text-muted text-center">{labels[value - 1]}</p>
    </div>
  );
}

function StatBox({
  label,
  value,
  sub,
  accent,
}: {
  label: string;
  value: string;
  sub?: string;
  accent?: "amber" | "forest" | "red";
}) {
  const colors = {
    amber: "text-amber border-amber/30 bg-amber/5",
    forest: "text-forest border-forest/30 bg-forest/5",
    red: "text-red-600 border-red-200 bg-red-50",
  };
  return (
    <div className={`border rounded-sm p-5 ${accent ? colors[accent] : "border-border bg-card"}`}>
      <p className="font-body text-xs font-semibold tracking-widest uppercase text-muted mb-2">{label}</p>
      <p className={`font-display text-3xl font-bold mb-1 ${accent ? "" : "text-ink"}`}>{value}</p>
      {sub && <p className="font-body text-xs text-muted leading-snug">{sub}</p>}
    </div>
  );
}

/* ─── main component ─── */
export default function ImgCalculatorPage() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<FormData>(INITIAL);
  const [emailStatus, setEmailStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [emailError, setEmailError] = useState("");
  const [showResults, setShowResults] = useState(false);

  function update<K extends keyof FormData>(key: K, value: FormData[K]) {
    setData((prev) => ({ ...prev, [key]: value }));
  }

  async function submitEmail(e: FormEvent) {
    e.preventDefault();
    setEmailStatus("loading");
    setEmailError("");
    try {
      const res = await fetch("/api/img-calculator", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: data.firstName.trim(),
          email: data.email.trim(),
          yearsOnPath: data.yearsOnPath,
          totalSpent: data.totalSpent,
          currentIncome: data.currentIncome,
          immigrationStatus: data.immigrationStatus,
          identityFear: data.identityFear,
          financialFear: data.financialFear,
          immigrationFear: data.immigrationFear,
        }),
      });
      if (!res.ok) {
        const d = await res.json();
        setEmailError(d.error || "Something went wrong. Please try again.");
        setEmailStatus("error");
        return;
      }
      setEmailStatus("done");
      setShowResults(true);
    } catch {
      setEmailError("Network error — please check your connection.");
      setEmailStatus("error");
    }
  }

  const matchP = matchProbability(data.yearsOnPath);
  const projCost = projectedCostToContinue(data.totalSpent, data.yearsOnPath);
  const oppCost = opportunityCost(data.currentIncome, data.yearsOnPath);
  const rec = recommendation(data);

  const urgencyColors = {
    high: "border-red-200 bg-red-50 text-red-700",
    medium: "border-amber/30 bg-amber/5 text-amber",
    low: "border-forest/30 bg-forest/5 text-forest",
  };

  const urgencyIcons = {
    high: <AlertTriangle size={18} />,
    medium: <TrendingDown size={18} />,
    low: <CheckCircle2 size={18} />,
  };

  return (
    <div className="min-h-screen bg-parchment">
      <Navbar />

      {/* ── HERO ── */}
      <section className="bg-[#1E1C1A] text-parchment px-6 py-16 md:py-24">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="inline-flex items-center gap-2 font-body text-xs tracking-widest uppercase text-parchment/40 mb-6"
          >
            <Calculator size={13} />
            Free tool · MCCQE Reality Calculator
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display text-4xl md:text-5xl leading-tight mb-4"
          >
            The math nobody showed you
            <br />
            <span className="text-amber-400">at the start.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-body text-base text-parchment/60 leading-relaxed"
          >
            Answer 3 sets of questions. See your true cost to continue — time,
            money, probability, immigration. No opinions. Just the numbers.
          </motion.p>
        </div>
      </section>

      <div className="h-2 crosswalk-stripes opacity-40" />

      {/* ── CALCULATOR ── */}
      <section className="px-6 py-16 md:py-24">
        <div className="max-w-xl mx-auto">
          {!showResults ? (
            <>
              <ProgressBar step={step} total={4} />

              <AnimatePresence mode="wait">
                {/* ── STEP 0: Pathway stats ── */}
                {step === 0 && (
                  <motion.div key="step0" {...fadeSlide} className="space-y-8">
                    <div>
                      <h2 className="font-display text-2xl md:text-3xl text-ink mb-2">
                        Your pathway so far
                      </h2>
                      <p className="font-body text-sm text-muted">
                        Be honest. These numbers are for you, not for anyone else.
                      </p>
                    </div>

                    <div className="space-y-6">
                      <div className="space-y-2">
                        <label className="font-body text-sm font-semibold text-ink">
                          How many years have you been on the IMG licensing pathway?
                        </label>
                        <input
                          type="number"
                          min={0}
                          max={20}
                          placeholder="e.g. 4"
                          value={data.yearsOnPath || ""}
                          onChange={(e) => update("yearsOnPath", Number(e.target.value))}
                          className="w-full px-4 py-3 border border-border rounded-sm font-body text-base text-ink bg-white focus:outline-none focus:border-forest transition-colors"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="font-body text-sm font-semibold text-ink">
                          Total spent on the pathway so far (CAD)
                        </label>
                        <p className="font-body text-xs text-muted">
                          Include: exam fees, prep courses, credential verification, application fees, living costs attributable to the pathway.
                        </p>
                        <div className="relative">
                          <span className="absolute left-4 top-1/2 -translate-y-1/2 font-body text-muted">$</span>
                          <input
                            type="number"
                            min={0}
                            placeholder="e.g. 18000"
                            value={data.totalSpent || ""}
                            onChange={(e) => update("totalSpent", Number(e.target.value))}
                            className="w-full pl-8 pr-4 py-3 border border-border rounded-sm font-body text-base text-ink bg-white focus:outline-none focus:border-forest transition-colors"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="font-body text-sm font-semibold text-ink">
                          Your current annual income (CAD)
                        </label>
                        <p className="font-body text-xs text-muted">
                          Include your current role — lab assistant, medical scribe, research coordinator, etc.
                        </p>
                        <div className="relative">
                          <span className="absolute left-4 top-1/2 -translate-y-1/2 font-body text-muted">$</span>
                          <input
                            type="number"
                            min={0}
                            placeholder="e.g. 48000"
                            value={data.currentIncome || ""}
                            onChange={(e) => update("currentIncome", Number(e.target.value))}
                            className="w-full pl-8 pr-4 py-3 border border-border rounded-sm font-body text-base text-ink bg-white focus:outline-none focus:border-forest transition-colors"
                          />
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => setStep(1)}
                      disabled={!data.yearsOnPath || !data.totalSpent}
                      className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 bg-forest text-parchment font-body font-semibold text-base rounded-sm hover:bg-forest/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      Next <ArrowRight size={16} />
                    </button>
                  </motion.div>
                )}

                {/* ── STEP 1: Immigration ── */}
                {step === 1 && (
                  <motion.div key="step1" {...fadeSlide} className="space-y-8">
                    <div>
                      <h2 className="font-display text-2xl md:text-3xl text-ink mb-2">
                        Your immigration situation
                      </h2>
                      <p className="font-body text-sm text-muted">
                        For many IMGs, this is the layer that feels most dangerous to touch. Name it.
                      </p>
                    </div>

                    <div className="space-y-3">
                      {[
                        {
                          value: "permanent_resident",
                          label: "Permanent Resident",
                          sub: "PR card — not tied to employer or program",
                        },
                        {
                          value: "citizen",
                          label: "Canadian Citizen",
                          sub: "No immigration concerns with pivoting",
                        },
                        {
                          value: "work_permit",
                          label: "Work Permit",
                          sub: "Tied to employer or specific role",
                        },
                        {
                          value: "refugee",
                          label: "Refugee / Protected Person",
                          sub: "Additional considerations apply",
                        },
                        {
                          value: "other",
                          label: "Other / Prefer not to say",
                          sub: "Still in Express Entry pool or other status",
                        },
                      ].map((opt) => (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => update("immigrationStatus", opt.value as ImmigrationStatus)}
                          className={`w-full text-left px-5 py-4 border rounded-sm transition-all ${
                            data.immigrationStatus === opt.value
                              ? "border-forest bg-forest/5"
                              : "border-border bg-white hover:border-forest/40"
                          }`}
                        >
                          <p className="font-body text-base font-semibold text-ink">{opt.label}</p>
                          <p className="font-body text-sm text-muted">{opt.sub}</p>
                        </button>
                      ))}
                    </div>

                    <div className="flex gap-3">
                      <button
                        onClick={() => setStep(0)}
                        className="inline-flex items-center gap-2 px-5 py-4 border border-border text-muted font-body text-sm rounded-sm hover:border-ink/30 transition-colors"
                      >
                        <ArrowLeft size={15} /> Back
                      </button>
                      <button
                        onClick={() => setStep(2)}
                        disabled={!data.immigrationStatus}
                        className="flex-1 inline-flex items-center justify-center gap-2 px-8 py-4 bg-forest text-parchment font-body font-semibold text-base rounded-sm hover:bg-forest/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        Next <ArrowRight size={16} />
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* ── STEP 2: Fears ── */}
                {step === 2 && (
                  <motion.div key="step2" {...fadeSlide} className="space-y-8">
                    <div>
                      <h2 className="font-display text-2xl md:text-3xl text-ink mb-2">
                        What's keeping you on the treadmill?
                      </h2>
                      <p className="font-body text-sm text-muted">
                        Rate each fear honestly. 1 = not worried, 5 = it's the reason you haven't stopped.
                      </p>
                    </div>

                    <div className="space-y-8">
                      <FearSlider
                        label="Financial fear"
                        sublabel="'I've spent too much to stop. Stopping means it was all wasted.'"
                        value={data.financialFear}
                        onChange={(v) => update("financialFear", v)}
                      />
                      <FearSlider
                        label="Identity fear"
                        sublabel="'I don't know who I am if I'm not a doctor working toward practice.'"
                        value={data.identityFear}
                        onChange={(v) => update("identityFear", v)}
                      />
                      <FearSlider
                        label="Immigration fear"
                        sublabel="'If I step off the pathway, I might lose my status or Express Entry points.'"
                        value={data.immigrationFear}
                        onChange={(v) => update("immigrationFear", v)}
                      />
                    </div>

                    <div className="flex gap-3">
                      <button
                        onClick={() => setStep(1)}
                        className="inline-flex items-center gap-2 px-5 py-4 border border-border text-muted font-body text-sm rounded-sm hover:border-ink/30 transition-colors"
                      >
                        <ArrowLeft size={15} /> Back
                      </button>
                      <button
                        onClick={() => setStep(3)}
                        className="flex-1 inline-flex items-center justify-center gap-2 px-8 py-4 bg-forest text-parchment font-body font-semibold text-base rounded-sm hover:bg-forest/90 transition-colors"
                      >
                        See my results <ArrowRight size={16} />
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* ── STEP 3: Email gate ── */}
                {step === 3 && (
                  <motion.div key="step3" {...fadeSlide} className="space-y-8">
                    <div>
                      <h2 className="font-display text-2xl md:text-3xl text-ink mb-2">
                        Your results are ready.
                      </h2>
                      <p className="font-body text-sm text-muted leading-relaxed">
                        Enter your name and email to unlock your full breakdown — and we'll send you a copy so you can come back to it.
                      </p>
                    </div>

                    {/* Preview teaser */}
                    <div className="bg-card border border-border rounded-sm p-5 space-y-3 relative overflow-hidden">
                      <div className="absolute inset-0 backdrop-blur-[2px] bg-parchment/60 flex flex-col items-center justify-center z-10">
                        <p className="font-body text-sm font-semibold text-ink mb-1">Enter your email to unlock</p>
                        <p className="font-body text-xs text-muted">Your personalized breakdown is waiting</p>
                      </div>
                      <div className="blur-sm select-none">
                        <p className="font-body text-xs text-muted uppercase tracking-widest mb-1">Match probability</p>
                        <p className="font-display text-3xl text-ink">{matchP}%</p>
                        <p className="font-body text-xs text-muted uppercase tracking-widest mt-3 mb-1">Projected total cost</p>
                        <p className="font-display text-3xl text-ink">${projCost.toLocaleString()}</p>
                      </div>
                    </div>

                    <form onSubmit={submitEmail} className="space-y-4">
                      <div className="space-y-2">
                        <label className="font-body text-sm font-semibold text-ink">First name</label>
                        <input
                          type="text"
                          required
                          placeholder="Reza"
                          value={data.firstName}
                          onChange={(e) => update("firstName", e.target.value as any)}
                          disabled={emailStatus === "loading"}
                          className="w-full px-4 py-3 border border-border rounded-sm font-body text-base text-ink bg-white focus:outline-none focus:border-forest transition-colors disabled:opacity-50"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="font-body text-sm font-semibold text-ink">Email address</label>
                        <input
                          type="email"
                          required
                          placeholder="reza@example.com"
                          value={data.email}
                          onChange={(e) => update("email", e.target.value as any)}
                          disabled={emailStatus === "loading"}
                          className="w-full px-4 py-3 border border-border rounded-sm font-body text-base text-ink bg-white focus:outline-none focus:border-forest transition-colors disabled:opacity-50"
                        />
                      </div>
                      {emailError && (
                        <p className="font-body text-sm text-red-600">{emailError}</p>
                      )}
                      <button
                        type="submit"
                        disabled={emailStatus === "loading" || !data.firstName || !data.email}
                        className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 bg-amber text-ink font-body font-semibold text-base rounded-sm hover:bg-gold transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        {emailStatus === "loading" ? (
                          <><Loader2 size={16} className="animate-spin" /> Calculating…</>
                        ) : (
                          <>Unlock my results <ArrowRight size={16} /></>
                        )}
                      </button>
                      <p className="font-body text-xs text-muted text-center">
                        Free. No spam. Unsubscribe anytime.
                      </p>
                    </form>

                    <button
                      onClick={() => setStep(2)}
                      className="inline-flex items-center gap-2 text-muted font-body text-sm hover:text-ink transition-colors"
                    >
                      <ArrowLeft size={14} /> Back
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </>
          ) : (
            /* ── RESULTS ── */
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-10"
            >
              <div>
                <p className="font-body text-xs tracking-widest uppercase text-forest mb-3 flex items-center gap-2">
                  <CheckCircle2 size={13} /> Results unlocked
                </p>
                <h2 className="font-display text-3xl md:text-4xl text-ink leading-tight">
                  {data.firstName}, here's what the numbers show.
                </h2>
              </div>

              {/* Recommendation banner */}
              <div className={`border rounded-sm p-5 flex items-start gap-3 ${urgencyColors[rec.urgency]}`}>
                <span className="mt-0.5 shrink-0">{urgencyIcons[rec.urgency]}</span>
                <div>
                  <p className="font-body text-sm font-bold mb-1">{rec.headline}</p>
                  <p className="font-body text-sm leading-relaxed opacity-90">{rec.body}</p>
                </div>
              </div>

              {/* Stats grid */}
              <div className="grid grid-cols-2 gap-4">
                <StatBox
                  label="IMG match probability"
                  value={`${matchP}%`}
                  sub="Based on CaRMS data for your years on pathway"
                  accent="amber"
                />
                <StatBox
                  label="Canadian grad rate"
                  value="97%"
                  sub="The structural gap you're competing against"
                />
                <StatBox
                  label="Already invested"
                  value={`$${data.totalSpent.toLocaleString()}`}
                  sub="Spent — cannot be recovered regardless of decision"
                  accent="red"
                />
                <StatBox
                  label="Projected cost to continue"
                  value={`$${projCost.toLocaleString()}`}
                  sub="Est. total if you continue 2–4 more years"
                  accent="red"
                />
                <StatBox
                  label="Opportunity cost"
                  value={`$${oppCost.toLocaleString()}`}
                  sub="Income gap vs. pivoting to a non-clinical role (est.)"
                />
                <StatBox
                  label="Years invested"
                  value={`${data.yearsOnPath} yr${data.yearsOnPath !== 1 ? "s" : ""}`}
                  sub="Those years are spent. Only the next year is a choice."
                />
              </div>

              {/* Immigration note */}
              {(data.immigrationStatus === "work_permit" || data.immigrationStatus === "refugee") && (
                <div className="border border-amber/30 bg-amber/5 rounded-sm p-5">
                  <p className="font-body text-sm font-bold text-amber mb-2">Immigration flag</p>
                  <p className="font-body text-sm text-charcoal leading-relaxed">
                    Your status requires extra consideration before any pivot. The good news: there are NOC codes that preserve Express Entry eligibility for physicians in non-clinical roles. The Career Map breaks this down specifically.
                  </p>
                </div>
              )}

              {/* Fear summary */}
              <div className="border border-border rounded-sm p-5 space-y-3">
                <p className="font-body text-xs font-semibold tracking-widest uppercase text-muted mb-4">Your fear profile</p>
                {[
                  { label: "Financial", value: data.financialFear },
                  { label: "Identity", value: data.identityFear },
                  { label: "Immigration", value: data.immigrationFear },
                ].map((f) => (
                  <div key={f.label} className="flex items-center gap-3">
                    <span className="font-body text-sm text-muted w-24 shrink-0">{f.label}</span>
                    <div className="flex gap-1 flex-1">
                      {[1, 2, 3, 4, 5].map((v) => (
                        <div
                          key={v}
                          className={`h-2 flex-1 rounded-full ${
                            v <= f.value ? "bg-forest" : "bg-border"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="font-body text-sm font-medium text-ink w-4 text-right">{f.value}</span>
                  </div>
                ))}
              </div>

              {/* Check your inbox */}
              <div className="bg-forest/5 border border-forest/20 rounded-sm p-5">
                <p className="font-body text-sm font-semibold text-forest mb-1">Check your inbox</p>
                <p className="font-body text-sm text-charcoal leading-relaxed">
                  We've sent a copy of your results to <strong>{data.email}</strong> — along with 3 suggested next steps based on your numbers.
                </p>
              </div>

              {/* CTA ladder */}
              <div className="space-y-4">
                <p className="font-body text-sm font-semibold text-ink">What to do next:</p>
                {[
                  {
                    label: "Free",
                    title: "IMG AI Advisor",
                    sub: "Get a personalized career path assessment powered by Claude — based on your specialty, fears, and timeline.",
                    href: "/img/advisor",
                    style: "bg-forest text-parchment hover:bg-forest/90",
                  },
                  {
                    label: "$17",
                    title: "Should You Keep Going?",
                    sub: "The structured decision framework — for when you need more than numbers.",
                    href: "/img/pivot",
                    style: "bg-white border border-border text-ink hover:bg-card",
                  },
                  {
                    label: "$37",
                    title: "The IMG Career Map",
                    sub: "12 non-clinical paths with Canadian income data and Express Entry notes.",
                    href: "/img/map",
                    style: "bg-white border border-border text-ink hover:bg-card",
                  },
                ].map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-4 px-5 py-4 rounded-sm transition-colors ${item.style}`}
                  >
                    <span className={`font-body text-xs font-bold px-2 py-0.5 rounded-sm shrink-0 ${
                      item.label === "Free" ? "bg-parchment/20 text-parchment" : "bg-border text-muted"
                    }`}>
                      {item.label}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="font-body text-sm font-semibold leading-snug">{item.title}</p>
                      <p className={`font-body text-xs leading-snug mt-0.5 ${
                        item.label === "Free" ? "opacity-70" : "text-muted"
                      }`}>{item.sub}</p>
                    </div>
                    <ArrowRight size={15} className="shrink-0 opacity-60" />
                  </a>
                ))}
              </div>

              <p className="font-body text-xs text-muted text-center pb-4">
                Results are estimates based on CaRMS aggregate data and typical IMG pathway costs. Individual situations vary.
              </p>
            </motion.div>
          )}
        </div>
      </section>

      <div className="h-2 crosswalk-stripes opacity-30" />
      <Footer />
    </div>
  );
}
