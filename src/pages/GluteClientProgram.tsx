import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Camera, Check, Dumbbell, ExternalLink, NotebookPen, Play, Trash2 } from "lucide-react";
import { useAuth } from "../auth/AuthProvider";
import { program, exerciseLibrary } from "../data/glute-program";
import {
  getLogsForDay, saveLog, deleteLog, getAssignment,
  listPhotos, getPhotoUrl, uploadPhoto, deletePhoto, type WorkoutLog, type ClientPhoto,
} from "../lib/glute-data";

function VideoDemo({ videoId, name }: { videoId: string | null; name: string }) {
  const [open, setOpen] = useState(false);
  if (!videoId) {
    const q = encodeURIComponent(`${name} exercise proper form`);
    return (
      <a href={`https://www.youtube.com/results?search_query=${q}`} target="_blank" rel="noopener noreferrer"
        className="inline-flex items-center gap-2 text-sm font-semibold text-[#9ca3af] transition-colors hover:text-[#00A699]">
        <ExternalLink size={15} /> Find a demo on YouTube
      </a>
    );
  }
  if (!open) return (
    <button type="button" onClick={() => setOpen(true)}
      className="inline-flex items-center gap-2 rounded-full bg-[#00A699]/15 px-4 py-2 text-sm font-semibold text-[#00A699] transition-colors hover:bg-[#00A699] hover:text-[#0d0d1a]">
      <Play size={15} /> Watch demo
    </button>
  );
  return (
    <div className="mt-1 overflow-hidden rounded-xl border border-white/10">
      <div className="aspect-video w-full bg-black">
        <iframe className="h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/${videoId}?rel=0`}
          title={`${name} demonstration`} loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
      </div>
    </div>
  );
}

function ExerciseCard({ idx, exKey, rx, log, clientId, week, dayLabel, onSaved }: {
  idx: number; exKey: string; rx: string;
  log: WorkoutLog | undefined;
  clientId: string; week: number; dayLabel: string;
  onSaved: () => void;
}) {
  const ex = exerciseLibrary[exKey];
  const [weight, setWeight] = useState(log?.weight ?? "");
  const [reps, setReps] = useState(log?.reps ?? "");
  const [notes, setNotes] = useState(log?.notes ?? "");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    setWeight(log?.weight ?? "");
    setReps(log?.reps ?? "");
    setNotes(log?.notes ?? "");
  }, [log]);

  if (!ex) return null;
  const done = !!log?.completed;

  async function toggle() {
    setBusy(true);
    try {
      if (done) {
        await deleteLog(clientId, week, dayLabel, exKey);
      } else {
        await saveLog(clientId, week, dayLabel, exKey, {
          completed: true,
          weight: weight || undefined,
          reps: reps || undefined,
          notes: notes || undefined,
        });
      }
      onSaved();
    } finally {
      setBusy(false);
    }
  }

  async function autoSave() {
    if (!done) return;
    await saveLog(clientId, week, dayLabel, exKey, {
      completed: true,
      weight: weight || undefined,
      reps: reps || undefined,
      notes: notes || undefined,
    });
    onSaved();
  }

  return (
    <li className={`rounded-2xl border p-5 transition-colors ${done ? "border-[#00A699]/40 bg-[#00A699]/[0.04]" : "border-white/10 bg-white/[0.03]"}`}>
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-body text-base font-bold text-white/30">{idx + 1}</span>
            <h3 className="font-body text-lg font-semibold">{ex.name}</h3>
          </div>
          <p className="mt-1 text-sm font-medium text-[#00A699]">{rx}</p>
        </div>
        <div className="flex shrink-0 items-center gap-3">
          <span className="hidden rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[11px] font-medium text-[#9ca3af] sm:inline">
            {ex.target}
          </span>
          <button type="button" onClick={toggle} disabled={busy} title={done ? "Unmark" : "Mark done"}
            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-colors disabled:opacity-50 ${
              done ? "border-[#00A699] bg-[#00A699] text-[#0d0d1a]" : "border-white/20 text-[#9ca3af] hover:border-[#00A699] hover:text-[#00A699]"
            }`}>
            <Check size={16} />
          </button>
        </div>
      </div>

      <p className="mt-3 flex items-start gap-2 text-sm leading-relaxed text-[#c7cad1]">
        <Dumbbell size={15} className="mt-0.5 shrink-0 text-[#00A699]" />
        {ex.cue}
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        <input type="text" placeholder="Weight (e.g. 20 kg)" value={weight}
          onChange={e => setWeight(e.target.value)} onBlur={autoSave}
          className="w-36 rounded-lg border border-white/10 bg-white/[0.05] px-3 py-2 text-sm text-white placeholder-[#6b7280] focus:border-[#00A699]/60 focus:outline-none" />
        <input type="text" placeholder="Reps / time" value={reps}
          onChange={e => setReps(e.target.value)} onBlur={autoSave}
          className="w-32 rounded-lg border border-white/10 bg-white/[0.05] px-3 py-2 text-sm text-white placeholder-[#6b7280] focus:border-[#00A699]/60 focus:outline-none" />
        <input type="text" placeholder="Notes" value={notes}
          onChange={e => setNotes(e.target.value)} onBlur={autoSave}
          className="min-w-[140px] flex-1 rounded-lg border border-white/10 bg-white/[0.05] px-3 py-2 text-sm text-white placeholder-[#6b7280] focus:border-[#00A699]/60 focus:outline-none" />
      </div>

      <div className="mt-4">
        <VideoDemo videoId={ex.video} name={ex.name} />
      </div>
    </li>
  );
}

export default function GluteClientProgram() {
  const { session } = useAuth();
  const clientId = session?.user.id ?? "";

  const [weekIdx, setWeekIdx] = useState(0);
  const [dayIdx, setDayIdx] = useState(0);
  const [logs, setLogs] = useState<WorkoutLog[]>([]);
  const [trainerNotes, setTrainerNotes] = useState("");

  const [photos, setPhotos] = useState<ClientPhoto[]>([]);
  const [photoUrls, setPhotoUrls] = useState<Record<string, string>>({});
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const fetchedPhotoIds = useRef(new Set<string>());

  const week = program[weekIdx];
  const day = week.days[dayIdx];
  const weekPhotos = photos.filter(p => p.week === week.week);

  const loadLogs = useCallback(async () => {
    if (!clientId) return;
    try {
      setLogs(await getLogsForDay(week.week, day.label));
    } catch {
      // best-effort
    }
  }, [clientId, week.week, day.label]);

  useEffect(() => { loadLogs(); }, [loadLogs]);

  useEffect(() => {
    if (!clientId) return;
    getAssignment(clientId).then(a => setTrainerNotes(a?.trainer_notes ?? "")).catch(() => {});
  }, [clientId]);

  const loadPhotos = useCallback(async () => {
    if (!clientId) return;
    try {
      setPhotos(await listPhotos(clientId));
    } catch {
      // best-effort
    }
  }, [clientId]);

  useEffect(() => { loadPhotos(); }, [loadPhotos]);

  useEffect(() => {
    const toFetch = photos.filter(p => p.week === week.week && !fetchedPhotoIds.current.has(p.id));
    if (toFetch.length === 0) return;
    toFetch.forEach(p => fetchedPhotoIds.current.add(p.id));
    let cancelled = false;
    (async () => {
      const entries = await Promise.all(toFetch.map(async p => [p.id, await getPhotoUrl(p.storage_path)] as const));
      if (!cancelled) setPhotoUrls(prev => ({ ...prev, ...Object.fromEntries(entries) }));
    })();
    return () => { cancelled = true; };
  }, [photos, week.week]);

  async function handlePhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file || !clientId) return;
    setUploadingPhoto(true);
    try {
      await uploadPhoto(clientId, file, { week: week.week });
      await loadPhotos();
    } finally {
      setUploadingPhoto(false);
    }
  }

  async function handleDeletePhoto(photo: ClientPhoto) {
    await deletePhoto(photo.id, photo.storage_path);
    setPhotos(prev => prev.filter(p => p.id !== photo.id));
  }

  const doneCount = day.items.filter(item => logs.find(l => l.exercise_key === item.key && l.completed)).length;
  const total = day.items.length;

  return (
    <div className="min-h-screen bg-[#0d0d1a] font-body text-white antialiased">
      <div className="h-1 w-full bg-[#00A699]" />
      <header className="mx-auto flex max-w-4xl items-center justify-between px-6 py-5 md:px-8">
        <span className="font-body text-lg font-extrabold tracking-[0.18em]">
          GLUTE <span className="text-[#00A699]">LONGEVITY</span>
        </span>
        <Link to="/glute/app" className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#9ca3af] hover:text-white">
          <ArrowLeft size={16} /> Home
        </Link>
      </header>

      <main className="mx-auto max-w-4xl px-6 pb-24 md:px-8">
        <div className="mb-8">
          <span className="block h-[2px] w-12 bg-[#00A699]" />
          <h1 className="font-body mt-5 text-3xl font-extrabold tracking-tight md:text-4xl">My Program</h1>
          <p className="mt-3 text-[#9ca3af]">
            Fill in weight, reps, and notes — then tap ✓ to mark each exercise done. It saves automatically.
          </p>
        </div>

        {trainerNotes && (
          <div className="mb-8 rounded-2xl border border-[#00A699]/30 bg-[#00A699]/[0.06] p-5">
            <p className="mb-1.5 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#00A699]">
              <NotebookPen size={13} /> Note from your trainer
            </p>
            <p className="whitespace-pre-wrap text-sm text-[#e5e7eb]">{trainerNotes}</p>
          </div>
        )}

        {/* Week selector */}
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

        {/* Week card */}
        <div className="mb-5 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="font-body text-xl font-bold text-[#00A699]">
                Week {week.week} — {week.title}
              </h2>
              <p className="mt-1 text-sm text-[#9ca3af]">{week.subtitle}</p>
            </div>
            {doneCount > 0 && (
              <span className="shrink-0 rounded-full bg-[#00A699]/15 px-3 py-1 text-sm font-semibold text-[#00A699]">
                {doneCount}/{total} done
              </span>
            )}
          </div>
        </div>

        {/* Progress photo */}
        <div className="mb-6 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
          <div className="mb-3 flex items-center justify-between gap-3">
            <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#6b7280]">
              <Camera size={13} className="text-[#00A699]" /> Progress photo — Week {week.week}
            </p>
            <label className="inline-flex cursor-pointer items-center gap-1.5 rounded-full bg-[#00A699] px-4 py-1.5 text-xs font-bold text-[#0d0d1a] transition-transform hover:scale-[1.02]">
              {uploadingPhoto ? "Uploading…" : "Add photo"}
              <input type="file" accept="image/*" capture="environment"
                onChange={handlePhotoChange} disabled={uploadingPhoto} className="hidden" />
            </label>
          </div>
          {weekPhotos.length > 0 ? (
            <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
              {weekPhotos.map(p => (
                <div key={p.id} className="group relative aspect-square overflow-hidden rounded-lg border border-white/10 bg-black">
                  {photoUrls[p.id] ? (
                    <a href={photoUrls[p.id]} target="_blank" rel="noopener noreferrer">
                      <img src={photoUrls[p.id]} alt={`Week ${week.week} progress`} className="h-full w-full object-cover" />
                    </a>
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-[10px] text-[#6b7280]">Loading…</div>
                  )}
                  <button type="button" onClick={() => handleDeletePhoto(p)} title="Remove"
                    className="absolute right-1 top-1 rounded-full bg-black/60 p-1 text-white opacity-0 transition-opacity group-hover:opacity-100">
                    <Trash2 size={12} />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-[#9ca3af]">No photo yet for this week — snap one to track visible progress.</p>
          )}
        </div>

        {/* Day selector */}
        <div className="mb-6">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#6b7280]">Day</p>
          <div className="flex flex-wrap gap-2">
            {week.days.map((d, i) => (
              <button key={d.label} type="button" onClick={() => setDayIdx(i)}
                className={i === dayIdx
                  ? "rounded-lg bg-white/10 px-4 py-2 text-sm font-bold text-white"
                  : "rounded-lg border border-white/10 px-4 py-2 text-sm font-semibold text-[#9ca3af] transition-colors hover:text-white"}>
                {d.label} · <span className="font-normal">{d.focus}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Exercise list */}
        <ol className="space-y-3">
          {day.items.map((item, i) => (
            <ExerciseCard key={`${item.key}-${i}`} idx={i} exKey={item.key} rx={item.rx}
              log={logs.find(l => l.exercise_key === item.key)}
              clientId={clientId} week={week.week} dayLabel={day.label}
              onSaved={loadLogs} />
          ))}
        </ol>

        {doneCount === total && total > 0 && (
          <div className="mt-8 rounded-2xl border border-[#00A699]/40 bg-[#00A699]/10 p-6 text-center">
            <p className="text-xl font-bold text-[#00A699]">Session complete</p>
            <p className="mt-1 text-sm text-[#9ca3af]">All {total} exercises logged. Great work.</p>
          </div>
        )}
      </main>
    </div>
  );
}
