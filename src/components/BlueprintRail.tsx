import { useEffect, useState } from "react";

const sections = [
  { id: "hero", label: "The Ward" },
  { id: "about", label: "The Mirror" },
  { id: "cage", label: "The Cage" },
  { id: "vest", label: "The Vest" },
  { id: "beliefs", label: "The Beliefs" },
  { id: "products", label: "The Tools" },
  { id: "manifesto", label: "The Manifesto" },
  { id: "contact", label: "The World" },
];

export default function BlueprintRail() {
  const [activeLabel, setActiveLabel] = useState(sections[0].label);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const els = sections
      .map((s) => ({ ...s, el: document.getElementById(s.id) }))
      .filter((s): s is typeof s & { el: HTMLElement } => Boolean(s.el));

    const onScroll = () => {
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - doc.clientHeight;
      setProgress(scrollable > 0 ? window.scrollY / scrollable : 0);

      const viewportMid = window.scrollY + window.innerHeight * 0.4;
      let current = els[0]?.label ?? sections[0].label;
      for (const s of els) {
        if (s.el.offsetTop <= viewportMid) current = s.label;
      }
      setActiveLabel(current);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      className="hidden lg:flex fixed left-0 top-0 bottom-0 w-14 flex-col items-center justify-between py-24 z-40 pointer-events-none"
      aria-hidden="true"
    >
      {/* Top crosshair */}
      <div className="text-cobalt-accent blueprint-crosshair" />

      {/* Ruler ticks */}
      <div className="relative flex-1 w-full flex flex-col justify-between py-8">
        {Array.from({ length: 11 }).map((_, i) => (
          <div key={i} className="w-full flex items-center justify-center">
            <div
              className="bg-cobalt-accent/30"
              style={{ width: i % 5 === 0 ? 16 : 8, height: 1 }}
            />
          </div>
        ))}

        {/* Progress indicator */}
        <div
          className="absolute left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-cobalt-accent transition-all duration-150"
          style={{ top: `${progress * 100}%` }}
        />
      </div>

      {/* Current section label, rotated */}
      <div
        className="chapter-label text-cobalt-accent/70 whitespace-nowrap"
        style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
      >
        {activeLabel}
      </div>

      {/* Bottom crosshair */}
      <div className="text-cobalt-accent blueprint-crosshair" />
    </div>
  );
}
