import { motion } from "framer-motion";

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay },
});

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-20 bg-charcoal">

      {/* ── Video background ── */}
      <video
        autoPlay
        muted
        loop
        playsInline
        poster="/hero-still.png"
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="/hero-loop.mp4" type="video/mp4" />
      </video>

      {/* ── Dark overlay ── */}
      <div className="absolute inset-0 z-[1] bg-charcoal/[0.72]" />

      {/* ── Crosswalk stripes bottom accent ── */}
      <div
        className="absolute bottom-0 left-0 right-0 z-[2]"
        style={{
          height: 14,
          backgroundImage:
            "repeating-linear-gradient(90deg, rgb(var(--color-parchment)) 0px, rgb(var(--color-parchment)) 36px, transparent 36px, transparent 52px)",
          opacity: 0.5,
        }}
      />

      {/* ── Content ── */}
      <div className="relative z-[3] max-w-site mx-auto px-6 md:px-12 lg:px-20 xl:px-32 py-24 md:py-32">
        <div className="max-w-4xl">

          {/* Zone label */}
          <motion.div {...fade(0)} className="flex items-center gap-2 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-amber" />
            <span className="font-body text-xs font-medium tracking-widest uppercase text-amber">
              Crosswalk Wisdom · For IMGs in Canada
            </span>
          </motion.div>

          {/* Enemy belief — struck through */}
          <motion.div {...fade(0.2)} className="mb-8">
            <p className="font-body text-base md:text-lg italic text-parchment/[0.4]">
              The system says:
            </p>
            <p className="font-display text-xl md:text-2xl mt-1 text-parchment/[0.33]">
              <span className="strikethrough-line">
                &ldquo;Just try harder next year. Prep more. You&rsquo;ll match.&rdquo;
              </span>
            </p>
          </motion.div>

          {/* Main headline */}
          <div className="mb-10">
            <motion.div {...fade(0.3)}>
              <span
                className="font-display text-5xl md:text-7xl lg:text-8xl leading-none text-parchment"
                style={{ textShadow: "0 2px 24px rgba(0,0,0,0.8)" }}
              >
                From the
              </span>
            </motion.div>
            <motion.div {...fade(0.4)}>
              <span
                className="font-display text-6xl md:text-8xl lg:text-9xl leading-none block text-amber"
                style={{ textShadow: "0 2px 32px rgba(0,0,0,0.9), 0 0 60px rgb(var(--color-amber) / 0.33)" }}
              >
                Ward
              </span>
            </motion.div>
            <motion.div {...fade(0.5)}>
              <span
                className="font-display text-5xl md:text-7xl lg:text-8xl leading-none text-parchment"
                style={{ textShadow: "0 2px 24px rgba(0,0,0,0.8)" }}
              >
                to the
              </span>
            </motion.div>
            <motion.div {...fade(0.6)}>
              <span
                className="font-display text-6xl md:text-8xl lg:text-9xl leading-none block text-forest-mid"
                style={{ textShadow: "0 2px 32px rgba(0,0,0,0.9), 0 0 80px rgb(var(--color-forest-mid) / 0.27)" }}
              >
                World.
              </span>
            </motion.div>
          </div>

          {/* Sub-headline */}
          <motion.p
            {...fade(0.75)}
            className="font-body text-lg md:text-xl leading-relaxed max-w-2xl mb-12 text-parchment"
            style={{ textShadow: "0 1px 12px rgba(0,0,0,0.9)" }}
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
              className="inline-flex items-center justify-center px-8 py-4 font-body font-medium text-base rounded-sm bg-amber text-card-dark transition-colors duration-200 hover:bg-gold"
            >
              Get the free calculator →
            </a>
            <a
              href="/img"
              className="inline-flex items-center justify-center px-8 py-4 font-body font-medium text-base rounded-sm text-amber transition-colors duration-200 hover:bg-amber/10"
              style={{ border: "1.5px solid rgb(var(--color-amber) / 0.33)" }}
            >
              See the full pivot guide →
            </a>
          </motion.div>

          {/* Social proof whisper */}
          <motion.p {...fade(1.05)} className="font-body text-sm mt-8 italic text-parchment/[0.33]">
            IMG · Left the licensing treadmill · Now helping physicians find what&rsquo;s next.
          </motion.p>

        </div>
      </div>

      {/* ── Amber left accent bar ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute left-0 top-0 bottom-0 w-1 bg-amber z-[3]"
      />
    </section>
  );
}
