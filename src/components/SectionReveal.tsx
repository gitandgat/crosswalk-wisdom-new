import { useRef, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

export default function SectionReveal({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  // Entrance: settles quickly as the section arrives in view.
  const { scrollYProgress: enterProgress } = useScroll({
    target: ref,
    offset: ["start end", "start 0.35"],
  });
  // Full pass: tracks the entire time the section is on screen, so motion
  // keeps happening while scrolling through it, not just on arrival.
  const { scrollYProgress: passProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(enterProgress, [0, 1], [0.45, 1]);
  const scale = useTransform(enterProgress, [0, 1], [0.97, 1]);
  const y = useTransform(passProgress, [0, 1], [28, -28]);

  if (prefersReducedMotion) {
    return <div ref={ref}>{children}</div>;
  }

  return (
    <motion.div ref={ref} style={{ opacity, scale, y }}>
      {children}
    </motion.div>
  );
}
