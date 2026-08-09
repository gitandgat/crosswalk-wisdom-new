import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { LogOut, ClipboardList, Users, ScanLine, ExternalLink } from "lucide-react";
import { useAuth } from "../auth/AuthProvider";
import { listScans, type ClientScan } from "../lib/glute-data";

const RESCAN_DUE_DAYS = 42; // 6 weeks — matches the program length

function daysSince(dateStr: string): number {
  const then = new Date(dateStr + "T00:00:00").getTime();
  return Math.floor((Date.now() - then) / (1000 * 60 * 60 * 24));
}

/** Authenticated landing — routes the user by role. Trainer dashboard and
 *  client logging are built in the next phases; this confirms auth + roles work. */
export default function GluteAppHome() {
  const { session, profile, signOut } = useAuth();
  const navigate = useNavigate();
  const isTrainer = profile?.role === "trainer";
  const clientId = session?.user.id ?? "";
  const [latestScan, setLatestScan] = useState<ClientScan | null>(null);

  useEffect(() => {
    if (isTrainer || !clientId) return;
    listScans(clientId).then(scans => setLatestScan(scans[0] ?? null)).catch(() => {});
  }, [isTrainer, clientId]);

  async function handleSignOut() {
    await signOut();
    navigate("/glute/app/login");
  }

  return (
    <div className="min-h-screen bg-[#0d0d1a] font-body text-white">
      <div className="h-1 w-full bg-[#00A699]" />
      <header className="mx-auto flex max-w-3xl items-center justify-between px-6 py-5">
        <span className="font-body text-lg font-extrabold tracking-[0.18em]">
          GLUTE <span className="text-[#00A699]">LONGEVITY</span>
        </span>
        <button
          onClick={handleSignOut}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#9ca3af] transition-colors hover:text-white"
        >
          <LogOut size={16} /> Sign out
        </button>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-10">
        <p className="text-sm text-[#9ca3af]">Signed in as {session?.user.email}</p>
        <h1 className="font-body mt-1 text-3xl font-extrabold">
          {isTrainer ? "Trainer home" : `Welcome${profile?.full_name ? `, ${profile.full_name.split(" ")[0]}` : ""}`}
        </h1>
        <span className="mt-3 inline-block rounded-full border border-[#00A699]/40 bg-[#00A699]/10 px-3 py-1 text-xs font-semibold text-[#00A699]">
          role: {profile?.role ?? "…"}
        </span>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {isTrainer ? (
            <Link to="/glute/app/clients" className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-colors hover:border-[#00A699]/50">
              <Users size={22} className="text-[#00A699]" />
              <h2 className="font-body mt-3 text-lg font-semibold">Clients</h2>
              <p className="mt-1 text-sm text-[#9ca3af]">
                See your clients and assign them the program.
              </p>
            </Link>
          ) : (
            <Link to="/glute/app/program" className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-colors hover:border-[#00A699]/50">
              <ClipboardList size={22} className="text-[#00A699]" />
              <h2 className="font-body mt-3 text-lg font-semibold">My program</h2>
              <p className="mt-1 text-sm text-[#9ca3af]">
                Open the 6-week program, log your sets, and track progress.
              </p>
            </Link>
          )}
        </div>

        {!isTrainer && (
          <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <div className="flex items-center gap-2">
              <ScanLine size={18} className="text-[#00A699]" />
              <h2 className="font-body text-lg font-semibold">Movement assessment</h2>
            </div>
            {latestScan ? (
              <>
                <p className="mt-2 text-sm text-[#c7cad1]">
                  <span className="font-semibold text-white">{latestScan.case_name}</span> ·{" "}
                  {new Date(latestScan.scan_date + "T00:00:00").toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" })}
                </p>
                {daysSince(latestScan.scan_date) >= RESCAN_DUE_DAYS && (
                  <span className="mt-2 inline-block rounded-full border border-amber-400/40 bg-amber-400/10 px-3 py-1 text-xs font-semibold text-amber-300">
                    Re-scan due — ask your trainer to book a follow-up
                  </span>
                )}
                {latestScan.case_url && (
                  <a href={latestScan.case_url} target="_blank" rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-[#00A699] hover:underline">
                    <ExternalLink size={14} /> View my assessment
                  </a>
                )}
              </>
            ) : (
              <p className="mt-2 text-sm text-[#9ca3af]">
                Your trainer hasn't linked an assessment yet — ask about a MoveAssess scan to find your baseline.
              </p>
            )}
          </div>
        )}

        <p className="mt-8 text-xs text-[#6b7280]">
          ✓ Auth + roles working. Next: {isTrainer ? "client list + assign program" : "per-workout logging"}.
        </p>
      </main>
    </div>
  );
}
