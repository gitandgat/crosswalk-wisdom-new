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

export default function WaitlistPage() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("")
  const [challenge, setChallenge] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: firstName.trim(),
          email: email.trim(),
          challenge: challenge.trim(),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error || "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }

      navigate("/waitlist/thanks");
    } catch {
      setErrorMsg("Network error — please check your connection and try again.");
      setStatus("error");
    }
  }

  const isValid = firstName.trim() && email.trim() && challenge.trim();

  return (
    <div className="min-h-screen bg-parchment flex flex-col">
      <div className="h-1 crosswalk-stripes opacity-60" />

      <header className="px-6 md:px-12 py-6 flex items-center justify-between border-b border-border">
        <a href="/" className="font-display text-lg text-ink hover:text-forest transition-colors">
          Crosswalk Wisdom
        </a>
        <a href="/apply" className="font-body text-sm text-muted hover:text-forest transition-colors">
          Apply for coaching →
        </a>
      </header>

      <main className="flex-1 flex items-center justify-center px-6 py-16 md:py-24">
        <div className="w-full max-w-2xl">

          <motion.p {...fadeUp(0.05)} className="eyebrow mb-6">
            The Crosswalk Method · Founding waitlist
          </motion.p>

          <motion.h1
            {...fadeUp(0.15)}
            className="font-display text-4xl md:text-5xl lg:text-6xl text-ink leading-tight mb-6"
          >
            From the Ward
            <br />
            <span className="text-forest">to the World.</span>
          </motion.h1>

          <motion.p
            {...fadeUp(0.25)}
            className="font-body text-base md:text-lg text-charcoal leading-relaxed mb-4"
          >
            A 4-week program for burned-out healthcare professionals who are done
            surviving their own career. Walk away with a complete identity-first
            transition plan — and the courage to actually use it.
          </motion.p>

          <motion.p
            {...fadeUp(0.3)}
            className="font-body text-base text-muted leading-relaxed mb-10"
          >
            Founding member price:{" "}
            <span className="font-medium text-forest">$297</span>{" "}
            <span className="line-through">$497</span>. First 50 spots only.
            Join the waitlist and you'll be notified the moment enrollment opens —
            with 48 hours to claim your founding rate.
          </motion.p>

          <motion.form
            {...fadeUp(0.4)}
            onSubmit={handleSubmit}
            className="space-y-5"
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

            <div className="flex flex-col gap-1.5">
              <label htmlFor="challenge" className="font-body text-xs font-medium tracking-wide text-muted uppercase">
                What's your biggest challenge right now?
              </label>
              <textarea
                id="challenge"
                required
                rows={4}
                placeholder="E.g. I know I need to make a change but I don't know where to start, and I'm terrified of leaving a stable income..."
                value={challenge}
                onChange={(e) => setChallenge(e.target.value)}
                disabled={status === "loading"}
                className="w-full px-4 py-3 bg-white border border-border rounded-sm font-body text-base text-ink placeholder-muted/50 focus:outline-none focus:border-forest transition-colors resize-none disabled:opacity-50"
              />
            </div>

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
                  Joining waitlist…
                </>
              ) : (
                <>
                  Join the waitlist
                  <ArrowRight size={16} />
                </>
              )}
            </button>

            <p className="font-body text-xs text-muted">
              No spam. You'll only hear from us when enrollment opens.
            </p>
          </motion.form>

        </div>
      </main>

      <div className="h-1 crosswalk-stripes opacity-40" />
    </div>
  );
}
