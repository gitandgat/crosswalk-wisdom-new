import { motion } from "framer-motion";

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay },
});

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-20" style={{ backgroundColor: "#2E2B28" }}>

      {/* ── Video background ── */}
      <video
        autoPlay
        muted
        loop
        playsInline
        poster="/hero-still.png"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: 0,
        }}
      >
        <source src="/hero-loop.mp4" type="video/mp4" />
      </video>

      {/* ── Dark overlay ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "#2E2B28",
          opacity: 0.72,
          zIndex: 1,
        }}
      />

      {/* ── Crosswalk stripes bottom accent ── */}
      <div
        className="absolute bottom-0 left-0 right-0"
        style={{
          height: 14,
          backgroundImage:
            "repeating-linear-gradient(90deg, #F8F4EE 0px, #F8F4EE 36px, transparent 36px, transparent 52px)",
          opacity: 0.5,
          zIndex: 2,
        }}
      />

      {/* ── Content ── */}
      <div className="relative max-w-site mx-auto px-6 md:px-12 lg:px-20 xl:px-32 py-24 md:py-32" style={{ zIndex: 3 }}>
        <div className="max-w-4xl">

          {/* Zone label */}
          <motion.div {...fade(0)} className="flex items-center gap-2 mb-8">
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "#F59E0B" }} />
            <span
              className="font-body text-xs font-medium tracking-widest uppercase"
              style={{ color: "#F59E0B" }}
            >
              Crosswalk Wisdom · For IMGs in Canada
            </span>
          </motion.div>

          {/* Enemy belief — struck through */}
          <motion.div {...fade(0.2)} className="mb-8">
            <p className="font-body text-base md:text-lg italic" style={{ color: "#F8F4EE66" }}>
              The system says:
            </p>
            <p className="font-display text-xl md:text-2xl mt-1" style={{ color: "#F8F4EE55" }}>
              <span className="strikethrough-line">
                &ldquo;Just try harder next year. Prep more. You&rsquo;ll match.&rdquo;
              </span>
            </p>
          </motion.div>

          {/* Main headline */}
          <div className="mb-10">
            <motion.div {...fade(0.3)}>
              <span
                className="font-display text-5xl md:text-7xl lg:text-8xl leading-none"
                style={{ color: "#F8F4EE", textShadow: "0 2px 24px rgba(0,0,0,0.8)" }}
              >
                From the
              </span>
            </motion.div>
            <motion.div {...fade(0.4)}>
              <span
                className="font-display text-6xl md:text-8xl lg:text-9xl leading-none block"
                style={{ color: "#FBBF24", textShadow: "0 2px 32px rgba(0,0,0,0.9), 0 0 60px #F59E0B55" }}
              >
                Ward
              </span>
            </motion.div>
            <motion.div {...fade(0.5)}>
              <span
                className="font-display text-5xl md:text-7xl lg:text-8xl leading-none"
                style={{ color: "#F8F4EE", textShadow: "0 2px 24px rgba(0,0,0,0.8)" }}
              >
                to the
              </span>
            </motion.div>
            <motion.div {...fade(0.6)}>
              <span
                className="font-display text-6xl md:text-8xl lg:text-9xl leading-none block"
                style={{ color: "#4ADE80", textShadow: "0 2px 32px rgba(0,0,0,0.9), 0 0 80px #22c55e44" }}
              >
                World.
              </span>
            </motion.div>
          </div>

          {/* Sub-headline */}
          <motion.p
            {...fade(0.75)}
            className="font-body text-lg md:text-xl leading-relaxed max-w-2xl mb-12"
            style={{ color: "#F8F4EE", textShadow: "0 1px 12px rgba(0,0,0,0.9)" }}
          >
            The match rate for IMGs in Canada is 10–22%.
            For Canadian graduates it&rsquo;s 97%.
            This is not a you problem. This is a math problem —
            and there&rsquo;s a way out that doesn&rsquo;t require another exam.
          </motion.p>

          {/* CTAs */}
          <motion.div {...fade(0.9)} className="flex flex-col sm:flex-row gap-4">
            <a
              href="/img"
              className="inline-flex items-center justify-center px-8 py-4 font-body font-medium text-base rounded-sm transition-colors duration-200"
              style={{ backgroundColor: "#F59E0B", color: "#1E1C1A" }}
            >
              Get the free calculator →
            </a>
            <a
              href="/img"
              className="inline-flex items-center justify-center px-8 py-4 font-body font-medium text-base rounded-sm transition-colors duration-200"
              style={{ border: "1.5px solid #F59E0B55", color: "#FBBF24" }}
            >
              See the full pivot guide →
            </a>
          </motion.div>

          {/* Social proof whisper */}
          <motion.p
            {...fade(1.05)}
            className="font-body text-sm mt-8 italic"
            style={{ color: "#F8F4EE55" }}
          >
            IMG · Left the licensing treadmill · Now helping physicians find what&rsquo;s next.
          </motion.p>

        </div>
      </div>

      {/* ── Amber left accent bar ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: 4,
          backgroundColor: "#D4A843",
          zIndex: 3,
        }}
      />
    </section>
  );
}
