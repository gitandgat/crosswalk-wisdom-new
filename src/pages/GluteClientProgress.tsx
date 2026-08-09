import { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Camera, Check, X, NotebookPen, ScanLine, ExternalLink, Trash2 } from "lucide-react";
import { program, exerciseLibrary } from "../data/glute-program";
import {
  getLogsForClient, listClients, getAssignment, updateTrainerNotes,
  listScans, addScan, deleteScan,
  listPhotos, getPhotoUrl, deletePhoto,
  type WorkoutLog, type ClientScan, type ClientPhoto,
} from "../lib/glute-data";
import type { Profile } from "../lib/supabase";

const MOVEASSESS_URL = "https://physical-assessment-app.vercel.app";
const RESCAN_DUE_DAYS = 42; // 6 weeks — matches the program length

/** Trainer view: full workout history for one client. */
export default function GluteClientProgress() {
  const { clientId } = useParams<{ clientId: string }>();
  const [client, setClient] = useState<Profile | null>(null);
  const [logs, setLogs] = useState<WorkoutLog[]>([]);
  const [weekIdx, setWeekIdx] = useState(0);
  const [dayIdx, setDayIdx] = useState(0);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [notes, setNotes] = useState("");
  const [notesSaved, setNotesSaved] = useState(true);
  const [savingNotes, setSavingNotes] = useState(false);

  const [scans, setScans] = useState<ClientScan[]>([]);
  const [scanCaseName, setScanCaseName] = useState("");
  const [scanCaseUrl, setScanCaseUrl] = useState("");
  const [scanDate, setScanDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [scanNote, setScanNote] = useState("");
  const [addingScan, setAddingScan] = useState(false);

  const [photos, setPhotos] = useState<ClientPhoto[]>([]);
  const [photoUrls, setPhotoUrls] = useState<Record<string, string>>({});

  const load = useCallback(async () => {
    if (!clientId) return;
    try {
      setStatus("loading");
      const [clients, clientLogs, assignment, clientScans, clientPhotos] = await Promise.all([
        listClients(),
        getLogsForClient(clientId),
        getAssignment(clientId),
        listScans(clientId),
        listPhotos(clientId),
      ]);
      setClient(clients.find(c => c.id === clientId) ?? null);
      setLogs(clientLogs);
      setNotes(assignment?.trainer_notes ?? "");
      setScans(clientScans);
      setPhotos(clientPhotos);
      setStatus("ready");
    } catch {
      setStatus("error");
    }
  }, [clientId]);

  useEffect(() => { load(); }, [load]);

  useEffect(() => {
    const toFetch = photos.filter(p => !(p.id in photoUrls));
    if (toFetch.length === 0) return;
    let cancelled = false;
    (async () => {
      const entries = await Promise.all(toFetch.map(async p => [p.id, await getPhotoUrl(p.storage_path)] as const));
      if (!cancelled) setPhotoUrls(prev => ({ ...prev, ...Object.fromEntries(entries) }));
    })();
    return () => { cancelled = true; };
  }, [photos, photoUrls]);

  async function handleDeletePhoto(photo: ClientPhoto) {
    await deletePhoto(photo.id, photo.storage_path);
    setPhotos(prev => prev.filter(p => p.id !== photo.id));
  }

  async function saveNotes() {
    if (!clientId) return;
    setSavingNotes(true);
    try {
      await updateTrainerNotes(clientId, notes);
      setNotesSaved(true);
    } finally {
      setSavingNotes(false);
    }
  }

  async function handleAddScan() {
    if (!clientId || !scanCaseName.trim() || !scanDate) return;
    setAddingScan(true);
    try {
      await addScan(clientId, {
        case_name: scanCaseName.trim(),
        case_url: scanCaseUrl.trim(),
        scan_date: scanDate,
        note: scanNote.trim(),
      });
      setScanCaseName("");
      setScanCaseUrl("");
      setScanNote("");
      setScans(await listScans(clientId));
    } finally {
      setAddingScan(false);
    }
  }

  async function handleDeleteScan(id: string) {
    await deleteScan(id);
    setScans(scans.filter(s => s.id !== id));
  }

  const week = program[weekIdx];
  const day = week.days[dayIdx];

  function logFor(exKey: string) {
    return logs.find(l => l.week === week.week && l.day_label === day.label && l.exercise_key === exKey);
  }

  function dayDoneCount(weekNum: number, dayLabel: string) {
    const dayDef = program[weekNum - 1]?.days.find(d => d.label === dayLabel);
    if (!dayDef) return { done: 0, total: 0 };
    const done = dayDef.items.filter(item =>
      logs.find(l => l.week === weekNum && l.day_label === dayLabel && l.exercise_key === item.key && l.completed)
    ).length;
    return { done, total: dayDef.items.length };
  }

  const totalLogged = logs.filter(l => l.completed).length;
  const totalExercises = program.reduce((sum, w) => sum + w.days.reduce((ds, d) => ds + d.items.length, 0), 0);

  return (
    <div className="min-h-screen bg-[#0d0d1a] font-body text-white antialiased">
      <div className="h-1 w-full bg-[#00A699]" />
      <header className="mx-auto flex max-w-4xl items-center justify-between px-6 py-5 md:px-8">
        <span className="font-body text-lg font-extrabold tracking-[0.18em]">
          GLUTE <span className="text-[#00A699]">LONGEVITY</span>
        </span>
        <Link to="/glute/app/clients" className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#9ca3af] hover:text-white">
          <ArrowLeft size={16} /> Clients
        </Link>
      </header>

      <main className="mx-auto max-w-4xl px-6 pb-24 md:px-8">
        {status === "loading" && <p className="mt-12 text-[#9ca3af]">Loading…</p>}
        {status === "error" && <p className="mt-12 text-red-400">Failed to load progress.</p>}

        {status === "ready" && (
          <>
            {/* Client header */}
            <div className="mb-8">
              <span className="block h-[2px] w-12 bg-[#00A699]" />
              <h1 className="font-body mt-5 text-3xl font-extrabold tracking-tight">
                {client?.full_name || "Client"}
              </h1>
              <p className="mt-1 text-sm text-[#9ca3af]">{client?.email}</p>
            </div>

            {/* Trainer notes — e.g. assessment findings, what to prioritize this week */}
            <div className="mb-8 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <p className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#6b7280]">
                <NotebookPen size={13} className="text-[#00A699]" /> Notes for this client
              </p>
              <textarea
                value={notes}
                onChange={(e) => { setNotes(e.target.value); setNotesSaved(false); }}
                placeholder="e.g. Right glute med inhibited on assessment — slow the eccentric on band walks, add 2x/week."
                rows={3}
                className="w-full resize-none rounded-lg border border-white/10 bg-[#0d0d1a] p-3 text-sm text-white placeholder:text-[#4b5563] focus:border-[#00A699]/60 focus:outline-none"
              />
              <div className="mt-2 flex items-center gap-3">
                <button
                  type="button"
                  onClick={saveNotes}
                  disabled={savingNotes || notesSaved}
                  className="rounded-full bg-[#00A699] px-4 py-1.5 text-xs font-bold text-[#0d0d1a] transition-transform hover:scale-[1.02] disabled:opacity-40"
                >
                  {savingNotes ? "Saving…" : "Save notes"}
                </button>
                {notesSaved && notes && <span className="text-xs text-[#6b7280]">Visible to this client on their program page</span>}
              </div>
            </div>

            {/* MoveAssess scan links */}
            <div className="mb-8 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <p className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#6b7280]">
                <ScanLine size={13} className="text-[#00A699]" /> Movement assessments
              </p>

              {scans.length > 0 && (
                <ul className="mb-4 space-y-2">
                  {scans.map((scan, i) => {
                    const daysSinceScan = Math.floor(
                      (Date.now() - new Date(scan.scan_date + "T00:00:00").getTime()) / (1000 * 60 * 60 * 24)
                    );
                    const isDue = i === 0 && daysSinceScan >= RESCAN_DUE_DAYS;
                    return (
                    <li key={scan.id} className="flex items-start justify-between gap-3 rounded-lg border border-white/10 bg-[#0d0d1a] p-3">
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-white">{scan.case_name}</p>
                        <p className="text-xs text-[#9ca3af]">
                          {new Date(scan.scan_date + "T00:00:00").toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" })}
                        </p>
                        {isDue && (
                          <span className="mt-1 inline-block rounded-full border border-amber-400/40 bg-amber-400/10 px-2 py-0.5 text-[10px] font-semibold text-amber-300">
                            Re-scan due
                          </span>
                        )}
                        {scan.note && <p className="mt-1 text-xs text-[#c7cad1]">{scan.note}</p>}
                        {scan.case_url && (
                          <a href={scan.case_url} target="_blank" rel="noopener noreferrer"
                            className="mt-1 inline-flex items-center gap-1 text-xs font-semibold text-[#00A699] hover:underline">
                            <ExternalLink size={12} /> Open in MoveAssess
                          </a>
                        )}
                      </div>
                      <button type="button" onClick={() => handleDeleteScan(scan.id)} title="Remove"
                        className="shrink-0 text-[#6b7280] transition-colors hover:text-red-400">
                        <Trash2 size={15} />
                      </button>
                    </li>
                    );
                  })}
                </ul>
              )}

              <div className="grid gap-2 sm:grid-cols-2">
                <input type="text" placeholder="Case name (e.g. Anterior Pelvic Tilt)" value={scanCaseName}
                  onChange={e => setScanCaseName(e.target.value)}
                  className="rounded-lg border border-white/10 bg-[#0d0d1a] px-3 py-2 text-sm text-white placeholder:text-[#4b5563] focus:border-[#00A699]/60 focus:outline-none sm:col-span-2" />
                <input type="url" placeholder={`MoveAssess link (optional, e.g. ${MOVEASSESS_URL}/?case=...)`} value={scanCaseUrl}
                  onChange={e => setScanCaseUrl(e.target.value)}
                  className="rounded-lg border border-white/10 bg-[#0d0d1a] px-3 py-2 text-sm text-white placeholder:text-[#4b5563] focus:border-[#00A699]/60 focus:outline-none sm:col-span-2" />
                <input type="date" value={scanDate} onChange={e => setScanDate(e.target.value)}
                  className="rounded-lg border border-white/10 bg-[#0d0d1a] px-3 py-2 text-sm text-white focus:border-[#00A699]/60 focus:outline-none" />
                <input type="text" placeholder="Note (optional)" value={scanNote}
                  onChange={e => setScanNote(e.target.value)}
                  className="rounded-lg border border-white/10 bg-[#0d0d1a] px-3 py-2 text-sm text-white placeholder:text-[#4b5563] focus:border-[#00A699]/60 focus:outline-none" />
              </div>
              <div className="mt-3 flex items-center gap-3">
                <button type="button" onClick={handleAddScan} disabled={addingScan || !scanCaseName.trim()}
                  className="rounded-full bg-[#00A699] px-4 py-1.5 text-xs font-bold text-[#0d0d1a] transition-transform hover:scale-[1.02] disabled:opacity-40">
                  {addingScan ? "Adding…" : "Add scan"}
                </button>
                <a href={MOVEASSESS_URL} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[#9ca3af] hover:text-white">
                  <ExternalLink size={12} /> Open MoveAssess to find the case
                </a>
              </div>
            </div>

            {/* Progress photos */}
            <div className="mb-8 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <p className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#6b7280]">
                <Camera size={13} className="text-[#00A699]" /> Progress photos
              </p>
              {photos.length > 0 ? (
                <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
                  {photos.map(p => (
                    <div key={p.id} className="group relative aspect-square overflow-hidden rounded-lg border border-white/10 bg-black">
                      {photoUrls[p.id] ? (
                        <a href={photoUrls[p.id]} target="_blank" rel="noopener noreferrer">
                          <img src={photoUrls[p.id]} alt={p.week ? `Week ${p.week} progress` : "Progress photo"} className="h-full w-full object-cover" />
                        </a>
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-[10px] text-[#6b7280]">Loading…</div>
                      )}
                      {p.week != null && (
                        <span className="absolute bottom-1 left-1 rounded-full bg-black/60 px-1.5 py-0.5 text-[9px] font-bold text-white">
                          Wk {p.week}
                        </span>
                      )}
                      <button type="button" onClick={() => handleDeletePhoto(p)} title="Remove"
                        className="absolute right-1 top-1 rounded-full bg-black/60 p-1 text-white opacity-0 transition-opacity group-hover:opacity-100">
                        <Trash2 size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-[#9ca3af]">No progress photos uploaded yet.</p>
              )}
            </div>

            {/* Summary stat */}
            <div className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <p className="text-2xl font-extrabold text-[#00A699]">{totalLogged}</p>
                <p className="mt-1 text-xs text-[#9ca3af]">exercises logged</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <p className="text-2xl font-extrabold text-white">
                  {Math.round((totalLogged / totalExercises) * 100)}%
                </p>
                <p className="mt-1 text-xs text-[#9ca3af]">program complete</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 col-span-2 sm:col-span-1">
                <p className="text-2xl font-extrabold text-white">
                  {program.reduce((sum, w) =>
                    sum + w.days.filter(d => {
                      const { done, total } = dayDoneCount(w.week, d.label);
                      return done === total && total > 0;
                    }).length, 0)}
                </p>
                <p className="mt-1 text-xs text-[#9ca3af]">sessions completed</p>
              </div>
            </div>

            {/* Week heatmap */}
            <div className="mb-8 overflow-x-auto">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#6b7280]">Session overview</p>
              <div className="flex gap-2">
                {program.map(w => (
                  <div key={w.week} className="flex flex-col gap-1.5">
                    <p className="text-center text-[10px] font-semibold text-[#6b7280]">W{w.week}</p>
                    {w.days.map(d => {
                      const { done, total } = dayDoneCount(w.week, d.label);
                      const full = done === total && total > 0;
                      const partial = done > 0 && !full;
                      return (
                        <button key={d.label} type="button"
                          onClick={() => { setWeekIdx(w.week - 1); setDayIdx(w.days.indexOf(d)); }}
                          title={`W${w.week} ${d.label}: ${done}/${total}`}
                          className={`h-8 w-8 rounded-md text-[10px] font-bold transition-colors ${
                            full ? "bg-[#00A699] text-[#0d0d1a]"
                            : partial ? "bg-[#00A699]/30 text-[#00A699]"
                            : "border border-white/10 bg-white/[0.03] text-[#6b7280]"
                          }`}>
                          {d.label.replace("Day ", "")}
                        </button>
                      );
                    })}
                  </div>
                ))}
              </div>
              <p className="mt-2 text-[11px] text-[#6b7280]">Teal = fully done · partial = some done · click to inspect</p>
            </div>

            {/* Week / day drill-down */}
            <div className="mb-4">
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#6b7280]">Week</p>
              <div className="flex flex-wrap gap-2">
                {program.map((w, i) => (
                  <button key={w.week} type="button"
                    onClick={() => { setWeekIdx(i); setDayIdx(0); }}
                    className={i === weekIdx
                      ? "rounded-full bg-[#00A699] px-4 py-2 text-sm font-bold text-[#0d0d1a]"
                      : "rounded-full border border-white/15 px-4 py-2 text-sm font-semibold text-[#c7cad1] transition-colors hover:border-[#00A699]/60 hover:text-white"}>
                    {w.week}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#6b7280]">Day</p>
              <div className="flex flex-wrap gap-2">
                {week.days.map((d, i) => {
                  const { done, total } = dayDoneCount(week.week, d.label);
                  return (
                    <button key={d.label} type="button" onClick={() => setDayIdx(i)}
                      className={i === dayIdx
                        ? "rounded-lg bg-white/10 px-4 py-2 text-sm font-bold text-white"
                        : "rounded-lg border border-white/10 px-4 py-2 text-sm font-semibold text-[#9ca3af] transition-colors hover:text-white"}>
                      {d.label}
                      {done > 0 && <span className="ml-1.5 text-[#00A699]">{done}/{total}</span>}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Exercise log table */}
            <div className="rounded-2xl border border-white/10 overflow-hidden">
              <div className="bg-white/[0.03] px-5 py-3 border-b border-white/10">
                <p className="text-sm font-semibold text-white">
                  Week {week.week} · {day.label} · {day.focus}
                </p>
              </div>
              <ul className="divide-y divide-white/[0.06]">
                {day.items.map((item, i) => {
                  const ex = exerciseLibrary[item.key];
                  const log = logFor(item.key);
                  if (!ex) return null;
                  return (
                    <li key={item.key} className="flex items-start gap-4 px-5 py-4">
                      <div className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${
                        log?.completed ? "bg-[#00A699] text-[#0d0d1a]" : "border border-white/20 text-[#6b7280]"
                      }`}>
                        {log?.completed ? <Check size={13} /> : <X size={13} />}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-semibold text-sm text-white">{ex.name}</p>
                        <p className="text-xs text-[#9ca3af]">{item.rx}</p>
                        {log && (log.weight || log.reps || log.notes) && (
                          <div className="mt-1.5 flex flex-wrap gap-x-4 gap-y-0.5 text-xs text-[#c7cad1]">
                            {log.weight && <span><span className="text-[#6b7280]">weight</span> {log.weight}</span>}
                            {log.reps && <span><span className="text-[#6b7280]">reps</span> {log.reps}</span>}
                            {log.notes && <span><span className="text-[#6b7280]">notes</span> {log.notes}</span>}
                          </div>
                        )}
                      </div>
                      <span className="shrink-0 text-[11px] text-[#6b7280]">{i + 1}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
