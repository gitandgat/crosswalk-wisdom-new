import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, UserPlus, Check, BarChart2 } from "lucide-react";
import { useAuth } from "../auth/AuthProvider";
import type { Profile } from "../lib/supabase";
import {
  listClients,
  listAssignments,
  assignProgram,
  unassignProgram,
  type Assignment,
} from "../lib/glute-data";

/** Phase 2 — trainer dashboard: see clients, assign/unassign the program. */
export default function GluteTrainerClients() {
  const { session } = useAuth();
  const [clients, setClients] = useState<Profile[]>([]);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [error, setError] = useState("");
  const [busyId, setBusyId] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      setStatus("loading");
      setError("");
      const [c, a] = await Promise.all([listClients(), listAssignments()]);
      setClients(c);
      setAssignments(a);
      setStatus("ready");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load clients");
      setStatus("error");
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const assignmentFor = (clientId: string) =>
    assignments.find((a) => a.client_id === clientId);

  async function toggle(client: Profile) {
    if (!session) return;
    setBusyId(client.id);
    setError("");
    try {
      if (assignmentFor(client.id)) await unassignProgram(client.id);
      else await assignProgram(client.id, session.user.id);
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Action failed");
    } finally {
      setBusyId(null);
    }
  }

  return (
    <div className="min-h-screen bg-[#0d0d1a] font-body text-white">
      <div className="h-1 w-full bg-[#00A699]" />
      <header className="mx-auto flex max-w-3xl items-center justify-between px-6 py-5">
        <span className="font-body text-lg font-extrabold tracking-[0.18em]">
          GLUTE <span className="text-[#00A699]">LONGEVITY</span>
        </span>
        <Link to="/glute/app" className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#9ca3af] hover:text-white">
          <ArrowLeft size={16} /> Home
        </Link>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-8">
        <h1 className="font-body text-3xl font-extrabold">Clients</h1>
        <p className="mt-2 text-sm text-[#9ca3af]">
          Anyone who signs up at <code className="text-[#c7cad1]">/glute/app/login</code> appears here. Assign them the program to start.
        </p>

        {status === "loading" && <p className="mt-8 text-[#9ca3af]">Loading…</p>}
        {status === "error" && (
          <p className="mt-8 rounded-lg border border-red-500/40 bg-red-500/10 p-3 text-sm text-red-300">{error}</p>
        )}

        {status === "ready" && clients.length === 0 && (
          <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-8 text-center">
            <UserPlus size={24} className="mx-auto text-[#00A699]" />
            <p className="mt-3 font-semibold">No clients yet</p>
            <p className="mt-1 text-sm text-[#9ca3af]">
              Share your signup link and they'll show up here automatically.
            </p>
          </div>
        )}

        {status === "ready" && clients.length > 0 && (
          <ul className="mt-6 space-y-3">
            {clients.map((c) => {
              const a = assignmentFor(c.id);
              return (
                <li key={c.id} className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <div className="min-w-0">
                    <p className="truncate font-semibold">{c.full_name || "Unnamed client"}</p>
                    <p className="truncate text-sm text-[#9ca3af]">{c.email || c.id.slice(0, 8)}</p>
                  </div>
                  <div className="flex shrink-0 items-center gap-3">
                    {a ? (
                      <span className="inline-flex items-center gap-1 rounded-full border border-[#00A699]/40 bg-[#00A699]/10 px-3 py-1 text-xs font-semibold text-[#00A699]">
                        <Check size={13} /> Week {a.current_week}
                      </span>
                    ) : (
                      <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-[#9ca3af]">Not assigned</span>
                    )}
                    <Link
                      to={`/glute/app/clients/${c.id}`}
                      className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-3 py-2 text-sm font-semibold text-[#9ca3af] transition-colors hover:text-white"
                    >
                      <BarChart2 size={14} /> Progress
                    </Link>
                    <button
                      type="button"
                      onClick={() => toggle(c)}
                      disabled={busyId === c.id}
                      className={
                        a
                          ? "rounded-full border border-white/15 px-4 py-2 text-sm font-semibold text-[#9ca3af] transition-colors hover:text-white disabled:opacity-50"
                          : "rounded-full bg-[#00A699] px-4 py-2 text-sm font-bold text-[#0d0d1a] transition-transform hover:scale-[1.02] disabled:opacity-50"
                      }
                    >
                      {busyId === c.id ? "…" : a ? "Unassign" : "Assign program"}
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </main>
    </div>
  );
}
