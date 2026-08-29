/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        parchment:      "rgb(var(--color-parchment) / <alpha-value>)",
        ink:            "rgb(var(--color-ink) / <alpha-value>)",
        forest:         "rgb(var(--color-forest) / <alpha-value>)",
        "forest-light": "rgb(var(--color-forest-light) / <alpha-value>)",
        "forest-mid":   "rgb(var(--color-forest-mid) / <alpha-value>)",
        muted:          "rgb(var(--color-muted) / <alpha-value>)",
        border:         "rgb(var(--color-border) / <alpha-value>)",
        card:           "rgb(var(--color-card) / <alpha-value>)",
        "card-dark":    "rgb(var(--color-card-dark) / <alpha-value>)",
        charcoal:       "rgb(var(--color-charcoal) / <alpha-value>)",
        ward:           "rgb(var(--color-ward) / <alpha-value>)",
        "ward-dark":    "rgb(var(--color-ward-dark) / <alpha-value>)",
        "ward-blue":    "rgb(var(--color-ward-blue) / <alpha-value>)",
        "ward-text":    "rgb(var(--color-ward-text) / <alpha-value>)",
        amber:          "rgb(var(--color-amber) / <alpha-value>)",
        "amber-light":  "rgb(var(--color-amber-light) / <alpha-value>)",
        sky:            "rgb(var(--color-sky) / <alpha-value>)",
        warm:           "rgb(var(--color-warm) / <alpha-value>)",
        gold:           "rgb(var(--color-gold) / <alpha-value>)",
        // Promoted from the old "Assessment" token set (brand-orange/brand-teal);
        // brand-amber/brand-charcoal/brand-white were exact or near-duplicates of
        // amber/charcoal/parchment above and were dropped, not renamed.
        terracotta:     "rgb(var(--color-terracotta) / <alpha-value>)",
        sage:           "rgb(var(--color-sage) / <alpha-value>)",
      },
      fontFamily: {
        display: ['"DM Serif Display"', 'Georgia', 'serif'],
        body:    ['"Inter"', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        prose2: "68ch",
        site:   "1200px",
      },
      letterSpacing: {
        widest2: "0.25em",
      },
    },
  },
  plugins: [],
}

