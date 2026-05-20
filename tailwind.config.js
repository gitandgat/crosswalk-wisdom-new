/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Assessment design tokens
        'brand-amber':    '#D4A843',
        'brand-charcoal': '#2C2C2C',
        'brand-white':    '#FAF7F2',
        'brand-orange':   '#E8834A',
        'brand-teal':     '#5B9A8B',
        // Main site tokens
        parchment:      "#F8F4EE",
        ink:            "#1A1917",
        forest:         "#2C5F4A",
        "forest-light": "#E4EDE8",
        "forest-mid":   "#4A8A6E",
        muted:          "#7A7570",
        border:         "#E5DDD0",
        card:           "#F2EDE5",
        "card-dark":    "#1E1C1A",
        charcoal:       "#2E2B28",
        ward:           "#EDF1F7",
        "ward-dark":    "#D8E2ED",
        "ward-blue":    "#4A7FAB",
        "ward-text":    "#2C3E50",
        amber:          "#D4A843",
        "amber-light":  "#FFF8E8",
        sky:            "#E8F3FB",
        warm:           "#FDF3E3",
        gold:           "#C9912A",
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

