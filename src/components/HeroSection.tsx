import { motion } from "framer-motion";

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay },
});

export default function HeroSection() {
  return (
    <section id="hero" className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-20 bg-cobalt">

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

      {/* ── Cobalt overlay ── */}
      <div className="absolute inset-0 bg-cobalt" style={{ opacity: 0.76, zIndex: 1 }} />

      {/* ── Blueprint grid texture ── */}
      <div className="absolute inset-0 blueprint-grid" style={{ zIndex: 2, opacity: 0.6 }} />

      {/* ── Crosswalk stripes bottom accent ── */}
      <div
        className="absolute bottom-0 left-0 right-0"
        style={{
          height: 14,
          backgroundImage:
            "repeating-linear-gradient(90deg, #F8F4EE 0px, #F8F4EE 36px, transparent 36px, transparent 52px)",
          opacity: 0.5,
          zIndex: 3,
        }}
      />

      {/* ── Corner blueprint marks ── */}
      <motion.div
        {...fade(1.1)}
        className="hidden md:flex absolute top-24 right-8 lg:right-16 items-center gap-3"
        style={{ zIndex: 3 }}
      >
        <span className="chapter-label text-cobalt-accent">The Ward</span>
        <span className="text-cobalt-accent blueprint-crosshair" />
      </motion.div>
      <div className="hidden md:block absolute bottom-8 right-8 lg:right-16 text-cobalt-accent blueprint-crosshair" style={{ zIndex: 3 }} />

      {/* ── Content ── */}
      <div className="relative max-w-site mx-auto px-6 md:px-12 lg:px-20 xl:px-32 py-24 md:py-32" style={{ zIndex: 4 }}>
        <div className="max-w-4xl">

          {/* Zone label */}
          <motion.div {...fade(0)} className="flex items-center gap-2 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-amber" />
            <span className="font-body text-xs font-medium tracking-widest uppercase text-amber">
              Crosswalk Wisdom · For IMGs in Canada
            </span>
          </motion.div>

          {/* Enemy belief — struck through */}
          <motion.div {...fade(0.15)} className="mb-8">
            <p className="font-body text-base md:text-lg italic text-parchment/40">
              The system says:
            </p>
            <p className="font-display text-xl md:text-2xl mt-1 text-parchment/35">
              <span className="strikethrough-line">
                &ldquo;Just try harder next year. Prep more. You&rsquo;ll match.&rdquo;
              </span>
            </p>
          </motion.div>

          {/* Main headline */}
          <div className="mb-10">
            <motion.div {...fade(0.25)}>
              <span
                className="font-display text-parchment leading-none block"
                style={{ fontSize: "clamp(2.5rem, 1.5rem + 5vw, 6rem)", textShadow: "0 2px 24px rgba(0,0,0,0.8)" }}
              >
                From the
              </span>
            </motion.div>
            <motion.div {...fade(0.35)}>
              <span
                className="font-display text-amber leading-none block"
                style={{
                  fontSize: "clamp(4rem, 2rem + 10vw, 11rem)",
                  textShadow: "0 2px 32px rgba(0,0,0,0.9), 0 0 60px rgba(212,168,67,0.35)",
                }}
              >
                Ward
              </span>
            </motion.div>
            <motion.div {...fade(0.45)}>
              <span
                className="font-display text-parchment leading-none block"
                style={{ fontSize: "clamp(2.5rem, 1.5rem + 5vw, 6rem)", textShadow: "0 2px 24px rgba(0,0,0,0.8)" }}
              >
                to the
              </span>
            </motion.div>
            <motion.div {...fade(0.55)}>
              <span
                className="font-display text-forest-mid leading-none block"
                style={{
                  fontSize: "clamp(4rem, 2rem + 10vw, 11rem)",
                  textShadow: "0 2px 32px rgba(0,0,0,0.9), 0 0 80px rgba(74,138,110,0.3)",
                }}
              >
                World.
              </span>
            </motion.div>
          </div>

          {/* Sub-headline */}
          <motion.p
            {...fade(0.7)}
            className="font-body text-lg md:text-xl leading-relaxed max-w-2xl mb-12 text-parchment"
            style={{ textShadow: "0 1px 12px rgba(0,0,0,0.9)" }}
          >
            The match rate for IMGs in Canada is 10–22%.
            For Canadian graduates it&rsquo;s 97%.
            This is a math problem, not a you problem —
            and there&rsquo;s a way out that doesn&rsquo;t require another exam.
          </motion.p>

          {/* CTAs */}
          <motion.div {...fade(0.85)} className="flex flex-col sm:flex-row gap-4">
            <a
              href="/img"
              className="inline-flex items-center justify-center px-8 py-4 font-body font-medium text-base rounded-full bg-ink text-parchment hover:bg-charcoal transition-colors duration-200"
            >
              Get the free calculator →
            </a>
            <a
              href="/img"
              className="inline-flex items-center justify-center px-8 py-4 font-body font-medium text-base rounded-full border border-parchment/30 text-parchment hover:bg-parchment/10 transition-colors duration-200"
            >
              See the full pivot guide →
            </a>
          </motion.div>

          {/* Social proof whisper */}
          <motion.p
            {...fade(1)}
            className="font-body text-sm mt-8 italic text-parchment/40"
          >
            IMG · Left the licensing treadmill · Now helping physicians find what&rsquo;s next.
          </motion.p>

        </div>
      </div>
    </section>
  );
}
