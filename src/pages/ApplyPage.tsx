import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Loader2 } from "lucide-react";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay },
});

const Field = ({
  id, label, hint, children,
}: {
  id: string;
  label: string;
  hint?: string;
  children: React.ReactNode;
}) => (
  <div className="flex flex-col gap-1.5">
    <label htmlFor={id} className="font-body text-xs font-medium tracking-wide text-muted uppercase">
      {label}
    </label>
    {hint && <p className="font-body text-xs text-muted/70 -mt-1">{hint}</p>}
    {children}
  </div>
);

const inputClass = "w-full px-4 py-3 bg-white border border-border rounded-sm font-body text-base text-ink placeholder-muted/50 focus:outline-none focus:border-forest transition-colors disabled:opacity-50";
const textareaClass = `${inputClass} resize-none`;

export default function ApplyPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    email: "",
    profession: "",
    stuckReason: "",
    sixMonthVision: "",
    fearAuditResult: "",
    readyToInvest: "",
    story: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const set = (field: string) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const isValid = Object.values(form).every((v) => v.trim().length > 0);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error || "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }

      navigate("/apply/thanks");
    } catch {
      setErrorMsg("Network error — please check your connection and try again.");
      setStatus("error");
    }
  }

  return (
    <div className="min-h-screen bg-parchment flex flex-col">
      <div className="h-1 crosswalk-stripes opacity-60" />

      <header className="px-6 md:px-12 py-6 flex items-center justify-between border-b border-border">
        <a href="/" className="font-display text-lg text-ink hover:text-forest transition-colors">
          Crosswalk Wisdom
        </a>
        <a href="/start" className="font-body text-sm text-muted hover:text-forest transition-colors">
          Join the community →
        </a>
      </header>

      <main className="flex-1 px-6 py-16 md:py-24">
        <div className="w-full max-w-2xl mx-auto">

          <motion.p {...fadeUp(0.05)} className="eyebrow mb-6">
            The Crosswalk Program
          </motion.p>

          <motion.h1
            {...fadeUp(0.15)}
            className="font-display text-4xl md:text-5xl text-ink leading-tight mb-6"
          >
            Apply for
            <br />
            <span className="text-forest">1:1 Coaching.</span>
          </motion.h1>

          <motion.p
            {...fadeUp(0.25)}
            className="font-body text-base md:text-lg text-charcoal leading-relaxed mb-4"
          >
            6–12 weeks working directly with Sahawat. We do the Fear Audit together,
            map your transition, build the income bridge, and cross — at your pace,
            with a clear plan.
          </motion.p>

          <motion.p
            {...fadeUp(0.3)}
            className="font-body text-sm text-muted leading-relaxed mb-12"
          >
            <span className="font-medium text-ink">Investment: $1,500–3,000.</span>{" "}
            Limited spots. Sahawat reviews every application personally and responds
            within 48 hours.
          </motion.p>

          <motion.form
            {...fadeUp(0.4)}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            {/* Name + Email */}
            <div className="grid sm:grid-cols-2 gap-4">
              <Field id="firstName" label="First name">
                <input
                  id="firstName" type="text" required autoComplete="given-name"
                  placeholder="Sarah"
                  value={form.firstName} onChange={set("firstName")}
                  disabled={status === "loading"} className={inputClass}
                />
              </Field>
              <Field id="email" label="Email address">
                <input
                  id="email" type="email" required autoComplete="email"
                  placeholder="sarah@example.com"
                  value={form.email} onChange={set("email")}
                  disabled={status === "loading"} className={inputClass}
                />
              </Field>
            </div>

            {/* Profession */}
            <Field id="profession" label="What's your profession and how long have you been in it?">
              <input
                id="profession" type="text" required
                placeholder="E.g. Nurse Practitioner, 14 years"
                value={form.profession} onChange={set("profession")}
                disabled={status === "loading"} className={inputClass}
              />
            </Field>

            {/* Stuck reason */}
            <Field id="stuckReason" label="What's the main thing keeping you stuck right now?">
              <textarea
                id="stuckReason" required rows={3}
                placeholder="Be honest — this is just between you and Sahawat."
                value={form.stuckReason} onChange={set("stuckReason")}
                disabled={status === "loading"} className={textareaClass}
              />
            </Field>

            {/* 6 month vision */}
            <Field id="sixMonthVision" label="What would your life look like if this was resolved in 6 months?">
              <textarea
                id="sixMonthVision" required rows={3}
                placeholder="Describe what 'resolved' actually means to you..."
                value={form.sixMonthVision} onChange={set("sixMonthVision")}
                disabled={status === "loading"} className={textareaClass}
              />
            </Field>

            {/* Fear Audit */}
            <Field
              id="fearAuditResult"
              label="Have you taken the Fear Audit?"
              hint="fear-audit.vercel.app — takes 2 minutes if not"
            >
              <input
                id="fearAuditResult" type="text" required
                placeholder="E.g. Yes — Identity Loss was my dominant fear"
                value={form.fearAuditResult} onChange={set("fearAuditResult")}
                disabled={status === "loading"} className={inputClass}
              />
            </Field>

            {/* Ready to invest */}
            <Field id="readyToInvest" label="Are you ready to invest in yourself financially and commit to 6–12 weeks of work?">
              <select
                id="readyToInvest" required
                value={form.readyToInvest} onChange={set("readyToInvest")}
                disabled={status === "loading"} className={inputClass}
              >
                <option value="">Select one...</option>
                <option value="Yes, I'm ready">Yes, I'm ready</option>
                <option value="I need to know more about the investment first">I need to know more about the investment first</option>
                <option value="Not yet, but I want to learn more">Not yet, but I want to learn more</option>
              </select>
            </Field>

            {/* Long-form story */}
            <Field
              id="story"
              label="Tell me about your situation in your own words."
              hint="What's been happening, how long you've been feeling this way, and what's made you consider coaching now."
            >
              <textarea
                id="story" required rows={7}
                placeholder="Take your time with this one. The more honest you are, the better I can assess whether we're a good fit..."
                value={form.story} onChange={set("story")}
                disabled={status === "loading"} className={textareaClass}
              />
            </Field>

            {errorMsg && (
              <p className="font-body text-sm text-red-600">{errorMsg}</p>
            )}

            <button
              type="submit"
              disabled={status === "loading" || !isValid}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-forest text-parchment font-body font-medium text-base rounded-sm hover:bg-forest-mid transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === "loading" ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Submitting…
                </>
              ) : (
                <>
                  Submit my application
                  <ArrowRight size={16} />
                </>
              )}
            </button>

            <p className="font-body text-xs text-muted">
              Sahawat reviews every application personally and responds within 48 hours.
            </p>
          </motion.form>

        </div>
      </main>

      <div className="h-1 crosswalk-stripes opacity-40" />
    </div>
  );
}
