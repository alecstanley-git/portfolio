#!/usr/bin/env node
/**
 * Assert every referenced asset actually exists and is reachable.
 *
 *   npm run check-media                          # files on disk only
 *   npm run check-media -- http://localhost:4173/ # also HEAD every URL
 *
 * Runs in CI before the build, so a rename that breaks a path cannot ship.
 * Reads `src/data/content.js` directly — the same source the site uses — so
 * this cannot drift from what the pages actually ask for.
 */
import { constants } from "node:fs";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { PROJECTS } from "../src/data/content.js";
import MEDIA from "../src/data/media-manifest.js";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const PUBLIC = path.join(ROOT, "public");
const BASE = process.argv[2];

const CONTENT_TYPE = {
  ".webp": "image/webp",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".pdf": "application/pdf",
  ".zip": "application/zip",
};

const fail = [];
let images = 0;
let attachments = 0;
let videoSlots = 0;

for (const p of PROJECTS) {
  for (const i of p.images) {
    images++;
    if (!i.src) fail.push(`${p.id} image "${i.file}" resolved to no URL`);
    else if (!/\.(webp|png|jpe?g)$/.test(i.src)) fail.push(`${p.id} image "${i.file}" -> ${i.src} is not an image`);
  }
  for (const a of p.attachments) {
    attachments++;
    if (!a.href) fail.push(`${p.id} attachment "${a.file}" resolved to no URL`);
  }
  videoSlots += p.videos.filter((v) => !v.youtube).length;
}

// Every manifest path must exist on disk, be non-empty, and be lowercase —
// macOS is case-insensitive but GitHub Pages is not, so a stray capital is a
// "works locally, 404 in production" bug waiting to happen.
const paths = Object.values(MEDIA).flatMap((files) => Object.values(files).map((m) => m.path));
for (const rel of paths) {
  if (rel !== rel.toLowerCase()) fail.push(`not lowercase: ${rel}`);
  if (/\s/.test(rel)) fail.push(`contains whitespace: ${rel}`);
  const abs = path.join(PUBLIC, rel);
  try {
    await fs.access(abs, constants.R_OK);
    if ((await fs.stat(abs)).size === 0) fail.push(`empty file: ${rel}`);
  } catch {
    fail.push(`missing on disk: ${rel}`);
  }
}

// Anything under public/media that nothing references is dead weight. Reported,
// never deleted — public/ is also hand-curated.
const referenced = new Set(paths);
async function walk(dir) {
  for (const e of await fs.readdir(dir, { withFileTypes: true })) {
    const abs = path.join(dir, e.name);
    if (e.isDirectory()) await walk(abs);
    else if (!referenced.has(path.relative(PUBLIC, abs))) {
      fail.push(`orphan (nothing references it): ${path.relative(PUBLIC, abs)}`);
    }
  }
}
await walk(path.join(PUBLIC, "media")).catch(() => fail.push("public/media is missing — run npm run import-assets"));

if (BASE) {
  for (const rel of paths) {
    const url = new URL(rel, BASE).href;
    try {
      const r = await fetch(url, { method: "HEAD" });
      const type = (r.headers.get("content-type") || "").split(";")[0];
      const length = Number(r.headers.get("content-length") || 0);
      const want = CONTENT_TYPE[path.extname(rel)];
      if (r.status !== 200) fail.push(`HTTP ${r.status}: ${url}`);
      else if (want && type !== want) fail.push(`content-type ${type}, expected ${want}: ${url}`);
      else if (!length) fail.push(`zero length: ${url}`);
    } catch (err) {
      fail.push(`${err.message}: ${url}`);
    }
  }
}

console.log(
  `${images} images, ${attachments} attachments, ${paths.length} files on disk` +
    (BASE ? `, all fetched from ${BASE}` : "") +
    `\n${videoSlots} video slot(s) still awaiting a YouTube link`,
);

if (fail.length) {
  console.error(`\n${fail.length} problem(s):\n  ${fail.join("\n  ")}`);
  process.exit(1);
}
console.log("\nAll media resolves.");
