import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const SITE_URL = "https://www.crosswalkwisdom.com";

// src/data/posts.ts is TypeScript, so it can't be imported directly by this
// plain .mjs script without adding a transpiler — regex-extracting the slugs
// is simpler and this is a small, controlled internal data format.
const postsSource = readFileSync(path.join(root, "src/data/posts.ts"), "utf-8");
const blogSlugs = [...postsSource.matchAll(/slug:\s*"([^"]+)"/g)].map((m) => m[1]);

// Static indexable routes. Deliberately excludes conversion-gate/thank-you
// pages (/start/welcome, /waitlist/thanks, /apply/thanks) and authenticated
// Glute app routes (/glute/app*) — none of those should be indexed.
const staticRoutes = [
  { path: "/", priority: "1.0" },
  { path: "/start", priority: "0.8" },
  { path: "/waitlist", priority: "0.6" },
  { path: "/apply", priority: "0.6" },
  { path: "/course", priority: "0.8" },
  { path: "/blog", priority: "0.9" },
  { path: "/philosophy", priority: "0.7" },
  { path: "/work-with-me", priority: "0.8" },
  { path: "/assessment", priority: "0.8" },
  { path: "/img", priority: "0.8" },
  { path: "/img/pivot", priority: "0.6" },
  { path: "/img/identity", priority: "0.6" },
  { path: "/img/map", priority: "0.6" },
  { path: "/img/playbook", priority: "0.6" },
  { path: "/img/advisor", priority: "0.6" },
  { path: "/img/calculator", priority: "0.7" },
  { path: "/imgpivot", priority: "0.7" },
  { path: "/glute", priority: "0.8" },
  { path: "/glute/program", priority: "0.6" },
  { path: "/pivot-map", priority: "0.5" },
  { path: "/inner-voices", priority: "0.5" },
  { path: "/train-like-a-clinician", priority: "0.5" },
  { path: "/marginal-decade", priority: "0.5" },
  { path: "/clinic-to-coaching", priority: "0.5" },
  { path: "/crosswalk-assessment", priority: "0.5" },
];

const urls = [
  ...staticRoutes.map(({ path: p, priority }) => ({ loc: `${SITE_URL}${p}`, priority })),
  ...blogSlugs.map((slug) => ({ loc: `${SITE_URL}/blog/${slug}`, priority: "0.7" })),
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url>\n    <loc>${u.loc}</loc>\n    <priority>${u.priority}</priority>\n  </url>`).join("\n")}
</urlset>
`;

writeFileSync(path.join(root, "public/sitemap.xml"), xml);
console.log(`Generated sitemap.xml with ${urls.length} URLs (${blogSlugs.length} blog posts).`);
