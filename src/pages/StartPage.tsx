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

const whatYouGet = [
  "Weekly insights from Sahawat — honest, no-fluff reflections on identity, fear, and what's next",
  "Access to The Crosswalk Community Facebook group — healthcare professionals who actually get it",
  "The Fear Audit tool — 2 minutes, names the exact fear running your life",
  "First access to workshops, resources, and new tools as they launch",
];

export default function StartPage() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/subscribe", {
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

      navigate("/start/welcome");
    } catch {
      setErrorMsg("Network error — please check your connection and try again.");
      setStatus("error");
    }
  }

  return (
    <div className="min-h-screen bg-parchment flex flex-col">

      {/* Minimal nav */}
      <header className="px-6 md:px-12 py-6 flex items-center justify-between border-b border-border">
        <a href="/" className="font-display text-lg text-ink hover:text-forest transition-colors">
          Crosswalk Wisdom
        </a>
        <a
          href="https://fear-audit.vercel.app"
          target="_blank"
          rel="noopener noreferrer"
          className="font-body text-sm text-muted hover:text-forest transition-colors"
        >
          Take the Fear Audit →
        </a>
      </header>

      <main className="flex-1 flex items-center justify-center px-6 py-16 md:py-24">
        <div className="w-full max-w-2xl">

          {/* Eyebrow */}
          <motion.p {...fadeUp(0.05)} className="eyebrow mb-6">
            The Crosswalk Community
          </motion.p>

          {/* Headline */}
          <motion.h1
            {...fadeUp(0.15)}
            className="font-display text-4xl md:text-5xl lg:text-6xl text-ink leading-tight mb-6"
          >
            You've been standing
            <br />
            at the curb long enough.
            <br />
            <span className="text-forest">Walk with us.</span>
          </motion.h1>

          {/* Sub */}
          <motion.p
            {...fadeUp(0.25)}
            className="font-body text-base md:text-lg text-charcoal leading-relaxed mb-10"
          >
            This is a community for healthcare professionals who are done pretending
            they're fine — and are ready to figure out what's next. No fluff.
            No toxic positivity. Just honest people at the same crosswalk.
          </motion.p>

          {/* What you get */}
          <motion.ul
            {...fadeUp(0.35)}
            className="space-y-3 mb-12"
          >
            {whatYouGet.map((item, i) => (
              <li key={i} className="flex items-start gap-3 font-body text-sm md:text-base text-charcoal">
                <span className="text-forest mt-0.5 flex-shrink-0 font-medium">→</span>
                <span>{item}</span>
              </li>
            ))}
          </motion.ul>

          {/* Form */}
          <motion.form
            {...fadeUp(0.45)}
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="firstName" className="font-body text-xs font-medium tracking-wide text-muted uppercase">
                  First name
                </label>
                <input
                  id="firstName"
                  type="text"
                  required
                  autoComplete="given-name"
                  placeholder="Sarah"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  disabled={status === "loading"}
                  className="w-full px-4 py-3 bg-white border border-border rounded-sm font-body text-base text-ink placeholder-muted/50 focus:outline-none focus:border-forest transition-colors disabled:opacity-50"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="email" className="font-body text-xs font-medium tracking-wide text-muted uppercase">
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="sarah@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={status === "loading"}
                  className="w-full px-4 py-3 bg-white border border-border rounded-sm font-body text-base text-ink placeholder-muted/50 focus:outline-none focus:border-forest transition-colors disabled:opacity-50"
                />
              </div>
            </div>

            {errorMsg && (
              <p className="font-body text-sm text-red-600">{errorMsg}</p>
            )}

            <button
              type="submit"
              disabled={status === "loading" || !firstName.trim() || !email.trim()}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-forest text-parchment font-body font-medium text-base rounded-sm hover:bg-forest-mid transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === "loading" ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Joining…
                </>
              ) : (
                <>
                  Join The Crosswalk
                  <ArrowRight size={16} />
                </>
              )}
            </button>

            <p className="font-body text-xs text-muted">
              No spam. Ever. Unsubscribe anytime.
            </p>
          </motion.form>

        </div>
      </main>

      {/* Crosswalk stripe footer */}
      <div className="h-1 crosswalk-stripes opacity-40" />
    </div>
  );
}
