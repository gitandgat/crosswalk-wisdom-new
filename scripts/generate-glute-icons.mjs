import sharp from "sharp";
import { mkdirSync } from "fs";
import { fileURLToPath } from "url";
import path from "path";

const OUT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../public");
mkdirSync(OUT, { recursive: true });

// Full-bleed icon: dark navy card, teal glute-bridge arc + raised-hip dot.
// This is the flagship movement in the program (glute-program.ts), so the
// mark reads as "the program" rather than a generic dumbbell/fitness glyph.
const fullBleed = (size) => `
<svg width="${size}" height="${size}" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
  <rect width="512" height="512" fill="#0d0d1a"/>
  <path d="M 96 344 Q 96 164 256 164 Q 416 164 416 344"
        stroke="#00A699" stroke-width="36" fill="none" stroke-linecap="round"/>
  <circle cx="256" cy="112" r="28" fill="#00A699"/>
</svg>`;

// Maskable variant: same mark scaled into the ~72% safe zone so OS icon masks
// (circle/squircle) never clip it.
const maskable = (size) => `
<svg width="${size}" height="${size}" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
  <rect width="512" height="512" fill="#0d0d1a"/>
  <g transform="translate(256 256) scale(0.72) translate(-256 -256)">
    <path d="M 96 344 Q 96 164 256 164 Q 416 164 416 344"
          stroke="#00A699" stroke-width="36" fill="none" stroke-linecap="round"/>
    <circle cx="256" cy="112" r="28" fill="#00A699"/>
  </g>
</svg>`;

async function render(svg, size, outPath) {
  await sharp(Buffer.from(svg), { density: 384 })
    .resize(size, size)
    .png()
    .toFile(outPath);
  console.log("wrote", outPath);
}

await render(fullBleed(192), 192, `${OUT}/glute-icon-192.png`);
await render(fullBleed(512), 512, `${OUT}/glute-icon-512.png`);
await render(maskable(512), 512, `${OUT}/glute-icon-maskable-512.png`);
await render(fullBleed(180), 180, `${OUT}/glute-apple-touch-icon.png`);
