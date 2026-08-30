/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Assessment design tokens (used only by src/components/assessment/*, left untouched)
        'brand-amber':    '#D4A843',
        'brand-charcoal': '#2C2C2C',
        'brand-white':    '#FAF7F2',
        'brand-orange':   '#E8834A',
        'brand-teal':     '#5B9A8B',
        // Main site tokens -- CSS custom properties defined in src/index.css :root
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
        // Pear.no-inspired bold direction: deep cobalt sibling of ward-blue
        cobalt:         "rgb(var(--color-cobalt) / <alpha-value>)",
        "cobalt-accent": "rgb(var(--color-cobalt-accent) / <alpha-value>)",
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

