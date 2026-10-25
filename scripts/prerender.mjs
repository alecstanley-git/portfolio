#!/usr/bin/env node
/**
 * Runs after `vite build`. Writes one HTML file per page into dist/ — each a
 * copy of the built index.html with that page's own title, description and
 * link-preview image — plus sitemap.xml and robots.txt.
 *
 * The app itself is unchanged: every file loads the same bundle and the router
 * takes over. What changes is what crawlers and link previews see before any
 * JavaScript runs, and that GitHub Pages now answers /work/p-013/ with 200
 * rather than the 404 fallback.
 */
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { PROJECTS, SITE_META } from "../src/data/content.js";
import COVERS from "../src/data/cover-manifest.js";
import { renderHead, robots, routes, sitemap } from "./lib/prerender-rules.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DIST = path.join(ROOT, "dist");
const domain = (await fs.readFile(path.join(ROOT, "public", "CNAME"), "utf8")).trim();
const origin = `https://${domain}`;

const template = await fs.readFile(path.join(DIST, "index.html"), "utf8");
const pages = routes({ projects: PROJECTS, covers: COVERS, siteMeta: SITE_META, origin });

for (const { path: route, meta } of pages) {
  const file = path.join(DIST, route, "index.html");
  await fs.mkdir(path.dirname(file), { recursive: true });
  await fs.writeFile(file, renderHead(template, meta));
}
await fs.writeFile(path.join(DIST, "sitemap.xml"), sitemap(pages.map((p) => p.meta.url)));
await fs.writeFile(path.join(DIST, "robots.txt"), robots(origin));

console.log(`prerender: ${pages.length} pages, sitemap.xml, robots.txt`);
