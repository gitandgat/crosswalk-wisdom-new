import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

interface ScrollStatProps {
  /** Numeric value to count up to, e.g. 22 or 97 */
  value: number;
  /** Text rendered before the number, e.g. "10–" */
  prefix?: string;
  /** Text rendered after the number, e.g. "%" */
  suffix?: string;
  label: string;
  className?: string;
  accentClassName?: string;
  duration?: number;
}

export default function ScrollStat({
  value,
  prefix = "",
  suffix = "",
  label,
  className = "",
  accentClassName = "text-cobalt-accent",
  duration = 1.2,
}: ScrollStatProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf: number;
    const start = performance.now();

    const tick = (now: number) => {
      const t = Math.min((now - start) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(Math.round(eased * value));
      if (t < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, duration]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className={className}
    >
      <div className={`font-display text-5xl md:text-6xl lg:text-7xl leading-none ${accentClassName}`}>
        {prefix}
        {display}
        {suffix}
      </div>
      <div className="chapter-label mt-3 opacity-60">{label}</div>
    </motion.div>
  );
}
