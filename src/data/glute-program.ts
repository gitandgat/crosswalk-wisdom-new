/**
 * Glute Longevity — 6-week posture-corrective program data.
 *
 * Two parts:
 *  1. exerciseLibrary — the single source of truth for each movement, incl. its
 *     YouTube demo video ID. CURATE HERE: paste a YouTube video id into `video`
 *     to embed a real demo inline. `null` → the UI shows a graceful
 *     "find demo on YouTube" search link instead (never a broken player).
 *     We EMBED (YouTube's sanctioned player); we never download/re-host.
 *  2. program — the 6 weeks × 3 days, referencing exercises by key with the
 *     prescription (sets/reps/tempo/rest) for that day.
 *
 * Design logic for the exercises lives in GLUTE-POSTURE-AI-PROMPTS.md
 * (lower-crossed = glutes + anti-lordosis core; upper-crossed = thoracic/scap/neck).
 */

export type Exercise = {
  name: string;
  /** YouTube video ID, or null for an un-curated slot (shows a search link). */
  video: string | null;
  cue: string;
  /** What it corrects — surfaced as a small chip in the UI. */
  target: string;
};

export type DayItem = { key: string; rx: string };
export type Day = { label: string; focus: string; items: DayItem[] };
export type Week = { week: number; title: string; subtitle: string; days: Day[] };

/** Seeded demo videos are real, embeddable IDs found for the marquee lifts.
 *  Everything at `null` is a curation slot — paste your preferred demo's id. */
export const exerciseLibrary: Record<string, Exercise> = {
  "thoracic-extension-roller": { name: "Thoracic Extension on Foam Roller", video: "qCrYe698zJU", cue: "Roller under the mid-back, support your head, breathe and ease into the extension.", target: "Kyphosis · mobilize" },
  "glute-bridge": { name: "Glute Bridge", video: "wPM8icPu6H8", cue: "Ribs down, squeeze the glutes for 2s at the top, drive through your heels.", target: "Glute activation" },
  "box-squat": { name: "Box Squat", video: "akAhLxnS9aI", cue: "Sit back to the box, knees track over the toes, stand tall.", target: "Glute strength" },
  "band-pull-apart": { name: "Band Pull-Apart", video: "LoBBo1dtY6I", cue: "Pull the band apart, squeeze the shoulder blades, control the return.", target: "Rounded shoulders" },
  "dead-bug": { name: "Dead Bug", video: "bxn9FBrt4-A", cue: "Low back glued to the floor as the opposite arm and leg reach out.", target: "Anti-lordosis core" },
  "prone-cobra": { name: "Prone Cobra", video: "tl5SVd0Tcd8", cue: "Lift the chest, thumbs up, squeeze the upper back.", target: "Thoracic extensors" },
  "kneeling-hip-flexor-stretch": { name: "Kneeling Hip Flexor Stretch", video: "Q4Ko275cluo", cue: "Tuck the pelvis to feel the front of the hip lengthen.", target: "Tight hip flexors" },
  "clamshell": { name: "Clamshell", video: "Cigb7cbcNxs", cue: "Stack the hips, open the top knee without rolling back.", target: "Glute med" },
  "hip-hinge": { name: "Hip Hinge", video: "NLY_m5Jx_tE", cue: "Push the hips back, soft knees, flat back; feel the hamstrings.", target: "Hinge pattern" },
  "face-pull": { name: "Face Pull", video: "3pToT5_DUiY", cue: "Pull to your forehead, elbows high, squeeze the rear delts.", target: "Rounded shoulders" },
  "glute-bridge-march": { name: "Glute Bridge March", video: "M8LAwv4Od2I", cue: "Keep the hips level when one foot lifts.", target: "Glute + core" },
  "bird-dog": { name: "Bird Dog", video: "ZdAHe9_HeEw", cue: "Reach long, no rotation through the hips.", target: "Anti-rotation core" },
  "doorway-pec-stretch": { name: "Doorway Pec Stretch", video: "M850sCj9LHQ", cue: "Forearms on the frame, step through until you feel the chest open.", target: "Tight pecs" },
  "chin-tuck": { name: "Chin Tuck", video: "HUdnNs-NbJg", cue: "Glide the head straight back into a 'double chin'; don't tilt.", target: "Forward head" },
  "lateral-band-walk": { name: "Lateral Band Walk", video: "-n6g5vS8MzA", cue: "Stay low, keep tension on the band the whole time.", target: "Glute med" },
  "step-up": { name: "Step Up", video: "aKj-6hgiViA", cue: "Drive through the top foot, control the way down.", target: "Glute strength" },
  "scapular-wall-slide": { name: "Scapular Wall Slide", video: "UB_n4DxOTCo", cue: "Back flat to the wall, slide the arms up keeping contact.", target: "Scapular control" },
  "glute-bridge-hold": { name: "Glute Bridge Hold", video: "dwBYOdSGA8k", cue: "Full squeeze, breathe normally.", target: "Glute endurance" },
  "banded-good-morning": { name: "Banded Good Morning", video: "fJA39ZOVaEQ", cue: "Band on the upper back, hinge with a flat back, load the hamstrings.", target: "Posterior chain" },
  "prone-y-raise": { name: "Prone Y Raise", video: "juoKsTqy77E", cue: "Arms in a Y, thumbs up, lift from the lower traps.", target: "Lower trap" },
  "goblet-squat": { name: "Goblet Squat", video: "nfX7IFK9UNI", cue: "Elbows inside the knees, chest tall, sit between the hips.", target: "Glute + quad strength" },
  "hip-thrust": { name: "Hip Thrust", video: "pBH7pKHn-dI", cue: "Chin tucked, full lockout, squeeze for 1s at the top.", target: "Glute max" },
  "single-leg-rdl": { name: "Single-Leg RDL", video: "Zfr6wizR8rs", cue: "Hold support, hips square, slow reach; feel the standing-leg glute.", target: "Glute + balance" },
  "plank": { name: "Plank", video: "A2b2EmIg0dA", cue: "Ribs down, glutes tight, a straight line from head to heels.", target: "Anti-extension core" },
  "side-plank": { name: "Side Plank", video: "44ND4bOB-T0", cue: "Straight line hip to shoulder; don't let the hip sag.", target: "Lateral core · glute med" },
  "split-squat": { name: "Split Squat", video: "4bNQITw0VdY", cue: "Down between the legs, back knee toward the floor, torso tall.", target: "Glute strength · stability" },
  "standing-hip-abduction": { name: "Standing Hip Abduction", video: "bGlm-qTnfTI", cue: "Lead with the heel, keep the torso still.", target: "Glute med" },
  "suitcase-carry": { name: "Suitcase Carry", video: "tNHdx7pmrGI", cue: "Stand tall, don't lean; resist the pull to one side.", target: "Anti-tilt core · posture" },
  "bent-over-row": { name: "Bent-Over Row", video: "UL8ZcK64KxA", cue: "Flat back, pull to the ribs, squeeze the shoulder blades.", target: "Mid-back · rounded shoulders" },
  "prone-t-raise": { name: "Prone T Raise", video: "DQOdVlhZQAk", cue: "Arms out in a T, thumbs up, squeeze the mid-back.", target: "Mid trap · rhomboids" },
  "b-stance-hip-thrust": { name: "B-Stance Hip Thrust", video: "om2qjTYPud8", cue: "Most of the load on the working side, full squeeze.", target: "Glute max (unilateral)" },
  "pallof-press": { name: "Pallof Press", video: "_2xWmYNnFS8", cue: "Press straight out and resist the rotation; ribs down.", target: "Anti-rotation core" },
  "hollow-body-hold": { name: "Hollow Body Hold", video: "0yPin8hSc8o", cue: "Low back pressed down, arms and legs long, ribs tucked.", target: "Anti-extension core" },
  "step-down": { name: "Step Down", video: "rvI7OxBQqS4", cue: "Tap the heel softly, control the descent.", target: "Single-leg control" },
  "prone-w-raise": { name: "Prone W Raise", video: "tl9GV1DjwYs", cue: "Bend the elbows into a W, squeeze the shoulder blades down.", target: "Lower trap" },
  "reverse-lunge": { name: "Reverse Lunge", video: "94AXT7D3bKY", cue: "Step back, drop tall, drive through the front heel.", target: "Glute strength" },
};

export const program: Week[] = [
  {
    week: 1, title: "Wake & align", subtitle: "Learn the patterns; gentle correctives, light load.",
    days: [
      { label: "Day A", focus: "Glutes + Thoracic", items: [
        { key: "thoracic-extension-roller", rx: "2×8 · rest 30s" },
        { key: "glute-bridge", rx: "3×12 · tempo 2-2-1 · rest 45s" },
        { key: "box-squat", rx: "3×10 · tempo 3-1-1 · rest 60s" },
        { key: "band-pull-apart", rx: "3×15 · rest 30s" },
        { key: "dead-bug", rx: "2×8 / side · rest 30s" },
        { key: "prone-cobra", rx: "2×20s · rest 30s" },
      ]},
      { label: "Day B", focus: "Hinge + Rows + Core", items: [
        { key: "kneeling-hip-flexor-stretch", rx: "2×30s / side" },
        { key: "clamshell", rx: "3×12 / side · rest 30s" },
        { key: "hip-hinge", rx: "3×10 · tempo 3-1-1 · rest 60s" },
        { key: "face-pull", rx: "3×15 · rest 30s" },
        { key: "glute-bridge-march", rx: "2×8 / side · rest 45s" },
        { key: "bird-dog", rx: "2×8 / side · rest 30s" },
      ]},
      { label: "Day C", focus: "Single-leg + Neck + Carry", items: [
        { key: "doorway-pec-stretch", rx: "2×30s" },
        { key: "chin-tuck", rx: "3×10 · tempo 2-2-1 · rest 20s" },
        { key: "lateral-band-walk", rx: "3×10 / side · rest 30s" },
        { key: "step-up", rx: "3×8 / side · rest 60s" },
        { key: "scapular-wall-slide", rx: "3×10 · rest 30s" },
        { key: "glute-bridge-hold", rx: "2×20s · rest 45s" },
      ]},
    ],
  },
  {
    week: 2, title: "Build the base", subtitle: "More volume; light band/load added.",
    days: [
      { label: "Day A", focus: "Glutes + Thoracic", items: [
        { key: "thoracic-extension-roller", rx: "2×10 · rest 30s" },
        { key: "glute-bridge", rx: "3×15 · tempo 2-2-1 · rest 45s" },
        { key: "box-squat", rx: "3×12 · tempo 3-1-1 · rest 60s" },
        { key: "band-pull-apart", rx: "3×20 · rest 30s" },
        { key: "dead-bug", rx: "3×8 / side · rest 30s" },
        { key: "prone-cobra", rx: "2×25s · rest 30s" },
      ]},
      { label: "Day B", focus: "Hinge + Rows + Core", items: [
        { key: "kneeling-hip-flexor-stretch", rx: "2×30s / side" },
        { key: "clamshell", rx: "3×12 / side · banded · rest 30s" },
        { key: "banded-good-morning", rx: "3×10 · tempo 3-1-1 · rest 60s" },
        { key: "face-pull", rx: "3×15 · rest 30s" },
        { key: "glute-bridge-march", rx: "3×8 / side · rest 45s" },
        { key: "bird-dog", rx: "3×8 / side · rest 30s" },
      ]},
      { label: "Day C", focus: "Single-leg + Neck + Carry", items: [
        { key: "doorway-pec-stretch", rx: "2×30s" },
        { key: "chin-tuck", rx: "3×12 · standing · rest 20s" },
        { key: "lateral-band-walk", rx: "3×12 / side · rest 30s" },
        { key: "step-up", rx: "3×10 / side · rest 60s" },
        { key: "prone-y-raise", rx: "3×12 · rest 30s" },
        { key: "glute-bridge-hold", rx: "3×20s · rest 45s" },
      ]},
    ],
  },
  {
    week: 3, title: "Load with control", subtitle: "Progressive load, joint-friendly tempo.",
    days: [
      { label: "Day A", focus: "Squat + Thoracic", items: [
        { key: "thoracic-extension-roller", rx: "2×10 · rest 30s" },
        { key: "goblet-squat", rx: "3×10 · tempo 3-1-1 · rest 75s" },
        { key: "hip-thrust", rx: "3×12 · rest 75s" },
        { key: "band-pull-apart", rx: "3×20 · rest 30s" },
        { key: "dead-bug", rx: "3×10 / side · rest 30s" },
        { key: "prone-cobra", rx: "3×25s · rest 30s" },
      ]},
      { label: "Day B", focus: "Hinge + Rows + Core", items: [
        { key: "kneeling-hip-flexor-stretch", rx: "2×30s / side" },
        { key: "single-leg-rdl", rx: "3×8 / side · rest 75s" },
        { key: "hip-thrust", rx: "3×12 · rest 75s" },
        { key: "face-pull", rx: "3×15 · rest 45s" },
        { key: "clamshell", rx: "3×12 / side · banded · rest 30s" },
        { key: "plank", rx: "3×30s · rest 30s" },
      ]},
      { label: "Day C", focus: "Single-leg + Neck", items: [
        { key: "doorway-pec-stretch", rx: "2×30s" },
        { key: "chin-tuck", rx: "3×12 · standing · rest 20s" },
        { key: "box-squat", rx: "3×10 · goblet · rest 60s" },
        { key: "step-up", rx: "3×10 / side · rest 60s" },
        { key: "prone-y-raise", rx: "3×12 · rest 30s" },
        { key: "side-plank", rx: "2×20s / side · rest 30s" },
      ]},
    ],
  },
  {
    week: 4, title: "Posture & carry", subtitle: "Transfer strength to upright, real-life demand.",
    days: [
      { label: "Day A", focus: "Glutes + Thoracic", items: [
        { key: "thoracic-extension-roller", rx: "2×10 · rest 30s" },
        { key: "split-squat", rx: "3×8 / side · rest 75s" },
        { key: "hip-thrust", rx: "3×12 · rest 75s" },
        { key: "face-pull", rx: "3×15 · rest 45s" },
        { key: "standing-hip-abduction", rx: "3×12 / side · rest 30s" },
        { key: "prone-cobra", rx: "3×30s · rest 30s" },
      ]},
      { label: "Day B", focus: "Hinge + Carry + Rows", items: [
        { key: "kneeling-hip-flexor-stretch", rx: "2×30s / side" },
        { key: "single-leg-rdl", rx: "3×8 / side · rest 75s" },
        { key: "suitcase-carry", rx: "3×20m / side · rest 60s" },
        { key: "bent-over-row", rx: "3×10 · rest 60s" },
        { key: "clamshell", rx: "3×12 / side · banded · rest 30s" },
        { key: "dead-bug", rx: "2×10 / side · rest 30s" },
      ]},
      { label: "Day C", focus: "Carry + Neck + Posture", items: [
        { key: "doorway-pec-stretch", rx: "2×30s" },
        { key: "chin-tuck", rx: "3×12 · standing · rest 20s" },
        { key: "goblet-squat", rx: "3×10 · tempo 3-1-1 · rest 75s" },
        { key: "suitcase-carry", rx: "3×20m / side · rest 60s" },
        { key: "prone-t-raise", rx: "3×12 · rest 30s" },
        { key: "side-plank", rx: "2×25s / side · rest 30s" },
      ]},
    ],
  },
  {
    week: 5, title: "Power & resilience", subtitle: "Tempo + range for durable gains.",
    days: [
      { label: "Day A", focus: "Squat + Core", items: [
        { key: "thoracic-extension-roller", rx: "2×10 · rest 30s" },
        { key: "goblet-squat", rx: "4×8 · tempo 4-1-1 · rest 90s" },
        { key: "b-stance-hip-thrust", rx: "3×10 / side · rest 75s" },
        { key: "face-pull", rx: "3×15 · rest 45s" },
        { key: "pallof-press", rx: "3×10 / side · rest 30s" },
        { key: "prone-cobra", rx: "3×30s · rest 30s" },
      ]},
      { label: "Day B", focus: "Hinge + Rows + Core", items: [
        { key: "kneeling-hip-flexor-stretch", rx: "2×30s / side" },
        { key: "single-leg-rdl", rx: "3×10 / side · rest 90s" },
        { key: "b-stance-hip-thrust", rx: "3×10 / side · rest 75s" },
        { key: "bent-over-row", rx: "3×10 · rest 60s" },
        { key: "clamshell", rx: "3×12 / side · banded · rest 30s" },
        { key: "hollow-body-hold", rx: "3×20s · rest 30s" },
      ]},
      { label: "Day C", focus: "Single-leg + Neck", items: [
        { key: "doorway-pec-stretch", rx: "2×30s" },
        { key: "chin-tuck", rx: "3×12 · +band · rest 20s" },
        { key: "split-squat", rx: "3×8 / side · tempo 4-1-1 · rest 75s" },
        { key: "step-down", rx: "3×8 / side · rest 60s" },
        { key: "prone-w-raise", rx: "3×12 · rest 30s" },
        { key: "side-plank", rx: "2×30s / side · rest 30s" },
      ]},
    ],
  },
  {
    week: 6, title: "Make it last", subtitle: "Consolidate the best lifts at a sustainable dose.",
    days: [
      { label: "Day A", focus: "Glutes + Thoracic", items: [
        { key: "thoracic-extension-roller", rx: "2×10 · rest 30s" },
        { key: "goblet-squat", rx: "3×10 · rest 75s" },
        { key: "hip-thrust", rx: "3×12 · rest 75s" },
        { key: "band-pull-apart", rx: "3×20 · rest 30s" },
        { key: "dead-bug", rx: "3×10 / side · rest 30s" },
        { key: "prone-cobra", rx: "3×30s · rest 30s" },
      ]},
      { label: "Day B", focus: "Hinge + Rows + Core", items: [
        { key: "kneeling-hip-flexor-stretch", rx: "2×30s / side" },
        { key: "single-leg-rdl", rx: "3×8 / side · rest 75s" },
        { key: "reverse-lunge", rx: "3×8 / side · rest 60s" },
        { key: "face-pull", rx: "3×15 · rest 45s" },
        { key: "clamshell", rx: "3×12 / side · banded · rest 30s" },
        { key: "plank", rx: "3×40s · rest 30s" },
      ]},
      { label: "Day C", focus: "Single-leg + Neck", items: [
        { key: "doorway-pec-stretch", rx: "2×30s" },
        { key: "chin-tuck", rx: "3×12 · standing · rest 20s" },
        { key: "reverse-lunge", rx: "3×8 / side · rest 60s" },
        { key: "hip-thrust", rx: "3×12 · rest 75s" },
        { key: "prone-y-raise", rx: "3×12 · rest 30s" },
        { key: "glute-bridge-hold", rx: "2×30s · rest 45s" },
      ]},
    ],
  },
];
