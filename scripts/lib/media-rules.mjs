/**
 * Pure rules for `scripts/media.mjs`: what a file is, what it becomes, and
 * whether a set of files can be published together. No filesystem access, so
 * every decision is checked before anything is written.
 */
import path from "node:path";

const KINDS = {
  image: [".png", ".jpg", ".jpeg", ".heic", ".webp", ".svg"],
  pdf: [".pdf"],
  video: [".mp4", ".mov", ".m4v", ".webm"],
  text: [".md", ".txt"],
  archive: [".zip"],
};

/** `Team_61_-_Final_Submission_2025.pdf` -> `team-61-final-submission-2025.pdf`.
 *  Lowercase and hyphenated: GitHub Pages is case-sensitive, macOS is not. */
export function safeName(file, ext) {
  const base = path
    .basename(file, path.extname(file))
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return `${base}${ext ?? path.extname(file).toLowerCase()}`;
}

export function classify(file) {
  const ext = path.extname(file).toLowerCase();
  return Object.keys(KINDS).find((k) => KINDS[k].includes(ext)) ?? "other";
}

/**
 * Decide the output for every file, or explain why the set can't be published.
 * Images become WebP — lossless for PNG and SVG (plots and line art keep
 * one-pixel lines sharp), lossy for photos. The thumbnail always becomes `cover.webp`.
 */
export function planOutputs(files, { thumbnail, hasCover = false, existing = {} } = {}) {
  const outputs = [];
  const errors = [];
  const all = thumbnail && !files.includes(thumbnail) ? [...files, thumbnail] : files;

  if (!thumbnail && !hasCover) errors.push("No thumbnail given. Every project needs one (--thumbnail <file>).");

  for (const src of all) {
    if (src === thumbnail) {
      if (classify(src) !== "image") errors.push(`Thumbnail ${src} is not an image.`);
      outputs.push({ src, out: "cover.webp", kind: "thumbnail" });
      continue;
    }
    const kind = classify(src);
    if (kind === "image" && safeName(src, ".webp") === "cover.webp") {
      errors.push(`${src} would become cover.webp, which is reserved for the thumbnail. Rename it.`);
    } else if (kind === "image") {
      outputs.push({ src, out: safeName(src, ".webp"), kind, lossless: [".png", ".svg"].includes(path.extname(src).toLowerCase()) });
    } else if (kind === "pdf" || kind === "archive") {
      outputs.push({ src, out: safeName(src), kind });
    } else if (kind === "video") {
      errors.push(`${src} is a video. Videos are never served from the site — upload it to YouTube and use the link.`);
    } else if (kind === "text") {
      errors.push(`${src} is text. Text goes into content.js, not public/media.`);
    } else {
      errors.push(`${src}: unrecognised file type. Bundle code with \`media zip\`, or ask Alec how to show it.`);
    }
  }

  const bySrc = new Map();
  for (const o of outputs) bySrc.set(o.out, [...(bySrc.get(o.out) ?? []), o.src]);
  for (const [out, srcs] of bySrc) {
    if (srcs.length > 1) errors.push(`${srcs.join(" and ")} would all become ${out}. Rename one.`);
  }

  // Files the project already has: a different source must not overwrite one.
  // Re-adding the same source name is a deliberate replace and is allowed.
  for (const o of outputs) {
    if (o.kind === "thumbnail") continue;
    const owner = Object.keys(existing).find((key) => path.basename(existing[key]) === o.out && key !== path.basename(o.src));
    if (owner) errors.push(`${o.src} would overwrite ${o.out}, which already belongs to ${owner}. Rename it, or remove ${owner} first.`);
  }

  return { outputs, errors };
}

/**
 * Which files `media add` should process: only the ones Alec named. The source
 * folder is his real working directory, so nothing is ever picked up from it
 * by default. `--thumbnail` alone (on a project that has one) replaces just
 * the card image.
 */
export function selectFiles({ listed, thumbnail, hasCover }) {
  if (listed.length) return { files: listed };
  if (hasCover && thumbnail) return { files: [] };
  return { error: "List the files to add — only files Alec named go on the site." };
}

/** The text of a generated manifest module. */
export function serialiseManifest(headerLines, data) {
  return `${headerLines.join("\n")}\nexport default ${JSON.stringify(data, null, 2)};\n`;
}
