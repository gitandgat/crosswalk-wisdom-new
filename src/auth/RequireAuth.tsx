import { useEffect, type ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";
import type { Role } from "../lib/supabase";

/** Registers the Glute app's service worker. The scope itself (/glute/app/)
 *  is set at build time via the plugin's `scope` option in vite.config.ts —
 *  this SPA shell also serves the blog and ImgHub, which must stay untouched
 *  by the install prompt / offline cache. Registration is done here (rather
 *  than the plugin's auto-injected script) since RequireAuth already gates
 *  every /glute/app/* route, making it the one shared place that's Glute-only. */
function useGluteServiceWorker(enabled: boolean) {
  useEffect(() => {
    if (!enabled || import.meta.env.DEV) return;
    let cancelled = false;
    import("virtual:pwa-register")
      .then(({ registerSW }) => {
        if (cancelled) return;
        registerSW({ immediate: true });
      })
      .catch(() => {
        // Non-fatal: the app still works fully without install/offline support.
      });
    return () => {
      cancelled = true;
    };
  }, [enabled]);
}

/** Route guard. Optionally restrict to a role. Shows a clear notice when the
 *  Supabase backend isn't configured yet, instead of failing silently. */
export function RequireAuth({ role, children }: { role?: Role; children: ReactNode }) {
  const { session, profile, loading, configured } = useAuth();
  useGluteServiceWorker(configured && !loading && !!session);

  if (!configured) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#0d0d1a] px-6 text-center font-body text-white">
        <p className="text-lg font-semibold text-[#00A699]">Backend not configured yet</p>
        <p className="mt-2 max-w-md text-sm text-[#9ca3af]">
          Add <code>VITE_SUPABASE_URL</code> and <code>VITE_SUPABASE_ANON_KEY</code> to <code>.env</code>,
          then restart the dev server. See <code>.env.example</code>.
        </p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0d0d1a] font-body text-[#9ca3af]">
        Loading…
      </div>
    );
  }

  if (!session) return <Navigate to="/glute/app/login" replace />;
  if (role && profile?.role !== role) return <Navigate to="/glute/app" replace />;

  return <>{children}</>;
}
