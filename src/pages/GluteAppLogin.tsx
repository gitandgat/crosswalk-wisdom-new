import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useAuth } from "../auth/AuthProvider";

/** Combined sign-in / sign-up for the Glute Longevity training app. */
export default function GluteAppLogin() {
  const { signIn, signUp, configured } = useAuth();
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [form, setForm] = useState({ fullName: "", email: "", password: "" });
  const [status, setStatus] = useState<"idle" | "loading">("idle");
  const [error, setError] = useState("");

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setError("");
    const res =
      mode === "signup"
        ? await signUp(form.email, form.password, form.fullName)
        : await signIn(form.email, form.password);
    setStatus("idle");
    if (res.error) {
      setError(res.error);
      return;
    }
    if (mode === "signup") {
      setError("");
      setMode("signin");
      setError("Account created. Check your email to confirm, then sign in.");
      return;
    }
    navigate("/glute/app");
  }

  const input =
    "w-full rounded-lg border border-white/15 bg-white/[0.04] px-4 py-3 text-white placeholder-white/30 transition-colors focus:border-[#00A699] focus:outline-none disabled:opacity-50";

  return (
    <div className="flex min-h-screen flex-col bg-[#0d0d1a] font-body text-white">
      <div className="h-1 w-full bg-[#00A699]" />
      <header className="mx-auto w-full max-w-md px-6 py-5">
        <Link to="/glute" className="font-body text-lg font-extrabold tracking-[0.18em]">
          GLUTE <span className="text-[#00A699]">LONGEVITY</span>
        </Link>
      </header>

      <main className="flex flex-1 items-center justify-center px-6 pb-16">
        <div className="w-full max-w-md">
          <h1 className="font-body text-2xl font-bold">
            {mode === "signin" ? "Sign in" : "Create your account"}
          </h1>
          <p className="mt-1 text-sm text-[#9ca3af]">Your training program and progress.</p>

          {!configured && (
            <p className="mt-4 rounded-lg border border-amber-500/40 bg-amber-500/10 p-3 text-sm text-amber-200">
              Backend not configured — add Supabase keys to <code>.env</code> first.
            </p>
          )}

          <form onSubmit={onSubmit} className="mt-6 space-y-4">
            {mode === "signup" && (
              <input
                type="text" required placeholder="Full name" autoComplete="name"
                value={form.fullName} onChange={set("fullName")} className={input}
                disabled={status === "loading"}
              />
            )}
            <input
              type="email" required placeholder="Email" autoComplete="email"
              value={form.email} onChange={set("email")} className={input}
              disabled={status === "loading"}
            />
            <input
              type="password" required placeholder="Password" minLength={6}
              autoComplete={mode === "signup" ? "new-password" : "current-password"}
              value={form.password} onChange={set("password")} className={input}
              disabled={status === "loading"}
            />

            {error && <p className="text-sm text-[#00A699]">{error}</p>}

            <button
              type="submit" disabled={status === "loading" || !configured}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#00A699] px-6 py-3.5 font-bold text-[#0d0d1a] transition-transform hover:scale-[1.01] disabled:opacity-50"
            >
              {status === "loading" ? "…" : mode === "signin" ? "Sign in" : "Create account"}
              <ArrowRight size={18} />
            </button>
          </form>

          <button
            type="button"
            onClick={() => { setMode(mode === "signin" ? "signup" : "signin"); setError(""); }}
            className="mt-5 text-sm text-[#9ca3af] underline-offset-4 hover:text-white hover:underline"
          >
            {mode === "signin" ? "New here? Create an account" : "Have an account? Sign in"}
          </button>
        </div>
      </main>
    </div>
  );
}
