import { useState } from "react";
import { Link } from "react-router-dom";
import { Play, ExternalLink, ArrowLeft, Dumbbell } from "lucide-react";
import { program, exerciseLibrary } from "../data/glute-program";

/**
 * Glute Longevity — the 6-week posture-corrective program, viewable on-site.
 * Demos are real YouTube embeds (click-to-load). Exercises without a curated
 * video id fall back to a YouTube search link, so nothing ever renders broken.
 * Brand matches the /glute landing (dark #0d0d1a + teal #00A699, Inter).
 */

function Wordmark() {
  return (
    <span className="font-body text-lg font-extrabold tracking-[0.18em] text-white">
      GLUTE <span className="text-[#00A699]">LONGEVITY</span>
    </span>
  );
}

function VideoDemo({ videoId, name }: { videoId: string | null; name: string }) {
  const [open, setOpen] = useState(false);

  if (!videoId) {
    const q = encodeURIComponent(`${name} exercise proper form`);
    return (
      <a
        href={`https://www.youtube.com/results?search_query=${q}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 text-sm font-semibold text-[#9ca3af] transition-colors hover:text-[#00A699] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00A699]"
      >
        <ExternalLink size={15} aria-hidden="true" />
        Find a demo on YouTube
      </a>
    );
  }

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 rounded-full bg-[#00A699]/15 px-4 py-2 text-sm font-semibold text-[#00A699] transition-colors hover:bg-[#00A699] hover:text-[#0d0d1a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00A699]"
      >
        <Play size={15} aria-hidden="true" />
        Watch demo
      </button>
    );
  }

  return (
    <div className="mt-1 overflow-hidden rounded-xl border border-white/10">
      <div className="aspect-video w-full bg-black">
        <iframe
          className="h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/${videoId}?rel=0`}
          title={`${name} demonstration`}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  );
}

export default function GluteProgramPage() {
  const [weekIdx, setWeekIdx] = useState(0);
  const [dayIdx, setDayIdx] = useState(0);

  const week = program[weekIdx];
  const day = week.days[dayIdx];

  return (
    <div className="min-h-screen bg-[#0d0d1a] font-body text-white antialiased">
      <div className="h-1 w-full bg-[#00A699]" />

      <header className="mx-auto flex max-w-4xl items-center justify-between px-6 py-5 md:px-8">
        <Wordmark />
        <Link
          to="/glute"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#9ca3af] transition-colors hover:text-white"
        >
          <ArrowLeft size={16} aria-hidden="true" /> Overview
        </Link>
      </header>

      <main className="mx-auto max-w-4xl px-6 pb-24 md:px-8">
        {/* Title */}
        <div className="mb-8">
          <span className="block h-[2px] w-12 bg-[#00A699]" aria-hidden="true" />
          <h1 className="font-body mt-5 text-3xl font-extrabold tracking-tight md:text-4xl">
            The 6-Week Program
          </h1>
          <p className="mt-3 max-w-2xl text-[#9ca3af]">
            Posture-corrective glute training — rebuild the hips and core that fix anterior
            pelvic tilt, and the upper-back and neck work that undoes rounded shoulders and
            forward head. Three short sessions a week. Every move has a demo.
          </p>
        </div>

        {/* Week selector */}
        <div className="mb-4">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#6b7280]">Week</p>
          <div className="flex flex-wrap gap-2">
            {program.map((w, i) => {
              const active = i === weekIdx;
              return (
                <button
                  key={w.week}
                  type="button"
                  onClick={() => { setWeekIdx(i); setDayIdx(0); }}
                  aria-pressed={active}
                  className={
                    active
                      ? "rounded-full bg-[#00A699] px-4 py-2 text-sm font-bold text-[#0d0d1a]"
                      : "rounded-full border border-white/15 px-4 py-2 text-sm font-semibold text-[#c7cad1] transition-colors hover:border-[#00A699]/60 hover:text-white"
                  }
                >
                  {w.week}
                </button>
              );
            })}
          </div>
        </div>

        {/* Week heading */}
        <div className="mb-5 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
          <h2 className="font-body text-xl font-bold text-[#00A699]">
            Week {week.week} — {week.title}
          </h2>
          <p className="mt-1 text-sm text-[#9ca3af]">{week.subtitle}</p>
        </div>

        {/* Day selector */}
        <div className="mb-6">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#6b7280]">Day</p>
          <div className="flex flex-wrap gap-2">
            {week.days.map((d, i) => {
              const active = i === dayIdx;
              return (
                <button
                  key={d.label}
                  type="button"
                  onClick={() => setDayIdx(i)}
                  aria-pressed={active}
                  className={
                    active
                      ? "rounded-lg bg-white/10 px-4 py-2 text-sm font-bold text-white"
                      : "rounded-lg border border-white/10 px-4 py-2 text-sm font-semibold text-[#9ca3af] transition-colors hover:text-white"
                  }
                >
                  {d.label} · <span className="font-normal">{d.focus}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Exercises */}
        <ol className="space-y-3">
          {day.items.map((item, i) => {
            const ex = exerciseLibrary[item.key];
            if (!ex) return null;
            return (
              <li key={`${item.key}-${i}`} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-body text-base font-bold text-white/30">{i + 1}</span>
                      <h3 className="font-body text-lg font-semibold">{ex.name}</h3>
                    </div>
                    <p className="mt-1 text-sm font-medium text-[#00A699]">{item.rx}</p>
                  </div>
                  <span className="shrink-0 rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[11px] font-medium text-[#9ca3af]">
                    {ex.target}
                  </span>
                </div>
                <p className="mt-3 flex items-start gap-2 text-sm leading-relaxed text-[#c7cad1]">
                  <Dumbbell size={15} className="mt-0.5 shrink-0 text-[#00A699]" aria-hidden="true" />
                  {ex.cue}
                </p>
                <div className="mt-4">
                  <VideoDemo videoId={ex.video} name={ex.name} />
                </div>
              </li>
            );
          })}
        </ol>

        <p className="mt-8 text-center text-xs text-[#6b7280]">
          Demos are real YouTube videos, embedded (not re-hosted). Some are curation slots —
          a tap opens a YouTube search so you can pick the demo whose form you trust.
        </p>
      </main>
    </div>
  );
}
