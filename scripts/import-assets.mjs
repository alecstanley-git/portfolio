#!/usr/bin/env node
/**
 * Import project assets from the Notion export into `public/media/`.
 *
 *   npm run import-assets
 *
 * The export is the archive of record and is treated as strictly read-only —
 * this script never writes, moves or deletes anything inside it.
 *
 * The list of expected files comes from `src/data/content.js`, so there is no
 * second copy of it to drift. The only extra input is FOLDERS below, because
 * Notion truncates some folder names when exporting.
 *
 * Images  : >200 KB or wider than 1600px  -> downscale to 1600px, encode WebP.
 *           Everything else (small PNG line art) is copied through untouched.
 * PDFs    : Ghostscript downsample to 300 dpi, but only kept if the result has
 *           the same page count and is genuinely smaller. Otherwise the
 *           original is used. Compression must never be a correctness risk.
 * Videos  : never imported — far too large for the repo. See MEDIA.md.
 *
 * Idempotent: an output newer than its source is left alone. Pass --force to
 * rebuild everything.
 */
import { execFile } from "node:child_process";
import { constants } from "node:fs";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";

import { PROJECTS } from "../src/data/content.js";

const run = promisify(execFile);

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT_ROOT = path.join(ROOT, "public", "media");
const MANIFEST = path.join(ROOT, "src", "data", "media-manifest.js");

const SOURCE_ROOT = path.join(
  os.homedir(),
  "Library/CloudStorage/GoogleDrive-asta0044@student.monash.edu",
  "My Drive/OLDPORTFOLIO/Alec Stanley/Skills and Projects",
);

/** Project id -> folder name in the export. Three are truncated by Notion. */
const FOLDERS = {
  "P-017": "Introduction to Programming - C++ Portfolio",
  "P-016": "Photometric Distance and Age of the Open Cluster N",
  "P-015": "Viscous Flow Regimes in a Large-Eddy Simulation",
  "P-014": "Boundary Layers in Laminar and Turbulent Flow Regi",
  "P-013": "Galaxy Collision Simulation",
  "P-012": "Aerodynamic Glider Analysis",
  "P-011": "Tumbling Rocket - Intermediate Axis Theorem",
  "P-010": "Rocket Launch Simulation",
  "P-009": "Warman Project",
  "P-008": "CSWA Certificate",
  "P-007": "Shock Theory in a Supersonic Wind Tunnel",
  "P-006": "Stellar Compact Objects",
  "P-005": "Stirling Engine Thermodynamic Properties",
  "P-004": "Internal Combustion Engine Thermodynamic Propertie",
  "P-003": "Properties of Microwaves",
  "P-002": "Detecting Extrasolar Planets using the Transit Met",
  "P-001": "Star Characteristics in NGC2301",
};

const MAX_WIDTH = 1600;
const WEBP_THRESHOLD_BYTES = 200 * 1024;
const WEBP_QUALITY = 82;

const FORCE = process.argv.includes("--force");

const problems = [];
const summary = { converted: 0, copied: 0, compressed: 0, skipped: 0, bytesIn: 0, bytesOut: 0 };

/** `Team_61_-_Final_Submission_2025.pdf` -> `team-61-final-submission-2025.pdf` */
function safeName(file, ext) {
  const base = path
    .basename(file, path.extname(file))
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return `${base}${ext ?? path.extname(file).toLowerCase()}`;
}

async function exists(p) {
  try {
    await fs.access(p, constants.R_OK);
    return true;
  } catch {
    return false;
  }
}

/** Case-insensitive lookup — two reports are `Report.pdf`, not `report.pdf`. */
async function findSource(dir, file) {
  const direct = path.join(dir, file);
  if (await exists(direct)) return direct;
  let entries;
  try {
    entries = await fs.readdir(dir);
  } catch {
    return null;
  }
  const hit = entries.find((e) => e.toLowerCase() === file.toLowerCase());
  return hit ? path.join(dir, hit) : null;
}

async function isStale(src, out) {
  if (FORCE || !(await exists(out))) return true;
  const [a, b] = await Promise.all([fs.stat(src), fs.stat(out)]);
  return a.mtimeMs > b.mtimeMs;
}


async function pdfInfo(file) {
  try {
    const { stdout } = await run("pdfinfo", [file]);
    return {
      pages: Number(stdout.match(/^Pages:\s*(\d+)/m)?.[1] ?? 0),
      // Ghostscript would silently re-write an encrypted PDF without its
      // permission flags. Stripping a document's own restrictions is not ours
      // to do, so these are copied through untouched.
      encrypted: !/^Encrypted:\s*no/m.test(stdout),
    };
  } catch {
    return { pages: 0, encrypted: false };
  }
}

async function imageSize(file) {
  const { stdout } = await run("sips", ["-g", "pixelWidth", "-g", "pixelHeight", file]);
  return {
    w: Number(stdout.match(/pixelWidth:\s*(\d+)/)?.[1] ?? 0),
    h: Number(stdout.match(/pixelHeight:\s*(\d+)/)?.[1] ?? 0),
  };
}

async function processImage(src, outDir) {
  const { size } = await fs.stat(src);
  const { w, h } = await imageSize(src);
  const heavy = size > WEBP_THRESHOLD_BYTES || w > MAX_WIDTH;

  // Recorded so <img> can reserve the right box and avoid layout shift — P-009
  // alone lays out eleven figures.
  const scale = w > MAX_WIDTH ? MAX_WIDTH / w : 1;
  const dims = { w: Math.round(w * scale), h: Math.round(h * scale) };

  const out = path.join(outDir, safeName(src, heavy ? ".webp" : undefined));
  if (!(await isStale(src, out))) {
    summary.skipped++;
    return { out, ...dims };
  }

  if (!heavy) {
    await fs.copyFile(src, out);
    summary.copied++;
  } else {
    // cwebp resizes only from its own decode path, so downscale first.
    let input = src;
    let tmp;
    if (w > MAX_WIDTH) {
      tmp = path.join(os.tmpdir(), `import-${process.pid}-${safeName(src, ".png")}`);
      await run("sips", ["--resampleWidth", String(MAX_WIDTH), src, "--out", tmp]);
      input = tmp;
    }
    await run("cwebp", ["-quiet", "-q", String(WEBP_QUALITY), "-m", "6", "-sharp_yuv", input, "-o", out]);
    if (tmp) await fs.rm(tmp, { force: true });
    summary.converted++;
  }

  summary.bytesIn += size;
  summary.bytesOut += (await fs.stat(out)).size;
  return { out, ...dims };
}

async function processPdf(src, outDir) {
  const out = path.join(outDir, safeName(src));
  if (!(await isStale(src, out))) {
    summary.skipped++;
    return { out };
  }

  const { size } = await fs.stat(src);
  const { pages: pagesIn, encrypted } = await pdfInfo(src);
  const tmp = path.join(os.tmpdir(), `import-${process.pid}-${safeName(src)}`);

  if (encrypted) {
    problems.push(`  note  ${path.basename(src)}: encrypted, copied verbatim (permissions left intact)`);
    await fs.copyFile(src, out);
    summary.copied++;
    summary.bytesIn += size;
    summary.bytesOut += size;
    return { out, pages: pagesIn };
  }

  let useCompressed = false;
  try {
    await run("gs", [
      "-sDEVICE=pdfwrite",
      "-dSAFER",
      "-dCompatibilityLevel=1.7",
      /* 300 dpi, print grade. These reports embed matplotlib plots whose axis
         lines and tick labels are one pixel wide, and 150 dpi visibly softened
         them — a 6x linear downsample from the ~900 ppi source. At 300 the
         figures are indistinguishable from the originals.
         /printer rather than /ebook for its higher image quality; the knobs are
         pinned explicitly so a future Ghostscript cannot change the preset out
         from under us. Threshold 1.0 downsamples anything above target instead
         of leaving 300-450 ppi images untouched. */
      "-dPDFSETTINGS=/printer",
      "-dDetectDuplicateImages=true",
      "-dDownsampleColorImages=true",
      "-dColorImageResolution=300",
      "-dColorImageDownsampleThreshold=1.0",
      "-dDownsampleGrayImages=true",
      "-dGrayImageResolution=300",
      "-dGrayImageDownsampleThreshold=1.0",
      "-dDownsampleMonoImages=true",
      "-dMonoImageResolution=600",
      "-dNOPAUSE",
      "-dQUIET",
      "-dBATCH",
      `-sOutputFile=${tmp}`,
      src,
    ]);
    // Only accept a result that is smaller AND still has every page.
    const [{ size: outSize }, { pages: pagesOut }] = await Promise.all([fs.stat(tmp), pdfInfo(tmp)]);
    useCompressed = pagesOut === pagesIn && pagesOut > 0 && outSize < size;
    if (!useCompressed) {
      problems.push(
        `  note  ${path.basename(src)}: kept original (pages ${pagesIn}->${pagesOut}, ${fmt(size)}->${fmt(outSize)})`,
      );
    }
  } catch (err) {
    problems.push(`  note  ${path.basename(src)}: ghostscript failed, kept original — ${err.message.split("\n")[0]}`);
  }

  if (useCompressed) {
    await fs.rename(tmp, out);
    summary.compressed++;
  } else {
    await fs.rm(tmp, { force: true });
    await fs.copyFile(src, out);
    summary.copied++;
  }

  summary.bytesIn += size;
  summary.bytesOut += (await fs.stat(out)).size;
  return { out, pages: pagesIn };
}

async function processOther(src, outDir) {
  const out = path.join(outDir, safeName(src));
  if (!(await isStale(src, out))) {
    summary.skipped++;
    return { out };
  }
  const { size } = await fs.stat(src);
  await fs.copyFile(src, out);
  summary.copied++;
  summary.bytesIn += size;
  summary.bytesOut += size;
  return { out };
}

async function main() {
  if (!(await exists(SOURCE_ROOT))) {
    console.error(`Notion export not found at:\n  ${SOURCE_ROOT}\nIs Google Drive mounted?`);
    process.exit(1);
  }

  const manifest = {};

  for (const project of PROJECTS) {
    const folder = FOLDERS[project.id];
    if (!folder) {
      problems.push(`  MISS  ${project.id}: no source folder mapped`);
      continue;
    }
    const srcDir = path.join(SOURCE_ROOT, folder);
    const wanted = [...project.images.map((i) => i.file), ...project.attachments.map((a) => a.file)];
    if (!wanted.length) continue;

    const outDir = path.join(OUT_ROOT, project.slug);
    await fs.mkdir(outDir, { recursive: true });

    for (const file of wanted) {
      const src = await findSource(srcDir, file);
      if (!src) {
        problems.push(`  MISS  ${project.id} ${file}  (looked in ${folder}/)`);
        continue;
      }
      const ext = path.extname(file).toLowerCase();
      const { out, w, h, pages } =
        ext === ".pdf"
          ? await processPdf(src, outDir)
          : [".png", ".jpg", ".jpeg"].includes(ext)
            ? await processImage(src, outDir)
            : await processOther(src, outDir);

      manifest[project.slug] ??= {};
      manifest[project.slug][file] = {
        path: path.relative(path.join(ROOT, "public"), out),
        ...(w ? { w, h } : null),
        ...(pages ? { pages } : null),
      };
    }
    process.stdout.write(`  ${project.id}  ${Object.keys(manifest[project.slug] ?? {}).length}/${wanted.length}\n`);
  }

  const body = JSON.stringify(manifest, null, 2);
  await fs.writeFile(
    MANIFEST,
    `// GENERATED by scripts/import-assets.mjs — do not edit by hand.\n` +
      `// Maps project slug -> original export filename -> path under public/.\n` +
      `// A file absent from here has no imported asset, so the page falls back to a\n` +
      `// labelled placeholder slot rather than a broken image.\n` +
      `export default ${body};\n`,
  );

  const total = Object.values(manifest).reduce((n, files) => n + Object.keys(files).length, 0);
  console.log(
    `\n${total} assets in manifest — ` +
      `${summary.converted} to webp, ${summary.compressed} pdfs compressed, ` +
      `${summary.copied} copied, ${summary.skipped} already current`,
  );
  if (summary.bytesIn) {
    console.log(`${fmt(summary.bytesIn)} in -> ${fmt(summary.bytesOut)} out`);
  }

  const missing = problems.filter((p) => p.includes("MISS"));
  if (problems.length) console.log(`\n${problems.join("\n")}`);
  if (missing.length) {
    console.error(`\n${missing.length} expected file(s) not found. Failing so this is not missed.`);
    process.exit(1);
  }
}

function fmt(bytes) {
  return `${(bytes / 1048576).toFixed(1)} MB`;
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
