/** Pure helpers over project and profile data. No React, no Vite — imported by
 *  the site, the media scripts and the tests alike. */

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const ISO_DATE = /^(\d{4})-(\d{2})-(\d{2})$/;
const PROJECT_ID = /^P-\d{3}$/;

/** "2026-06-07" -> "7 June 2026" (Australian order). Parsed from the string
 *  itself, so the viewer's timezone can never move a date by a day. */
export function formatDate(iso) {
  const m = ISO_DATE.exec(iso);
  if (!m) return String(iso);
  return `${Number(m[3])} ${MONTHS[Number(m[2]) - 1]} ${m[1]}`;
}

export function idNumber(id) {
  return Number(String(id).replace(/^P-/, ""));
}

/** Newest first; projects dated the same day put the higher ID first. */
export function sortProjects(projects) {
  return [...projects].sort(
    (a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : idNumber(b.id) - idNumber(a.id)),
  );
}

/** One past the highest ID ever used, live or retired — IDs are never reused. */
export function nextProjectId(projects, retiredIds = []) {
  const used = [...projects.map((p) => p.id), ...retiredIds].map(idNumber);
  const next = (used.length ? Math.max(...used) : 0) + 1;
  return `P-${String(next).padStart(3, "0")}`;
}

/** "https://www.linkedin.com/in/alecstanley/" -> "alecstanley" */
export function handleFromUrl(url) {
  return new URL(url).pathname.split("/").filter(Boolean).pop() ?? "";
}

/** The project codes quoted as examples in copy: starred first, topped up from the rest. */
export function exampleCodes(starred, projects, n = 2) {
  const ids = [...starred, ...projects].map((p) => p.id);
  return [...new Set(ids)].slice(0, n).join(", ");
}

/** Problems that must stop a deploy. Empty array means the data is sound. */
export function validateProjects(projects, retiredIds = []) {
  const problems = [];
  const seen = new Set();
  for (const p of projects) {
    if (seen.has(p.id)) problems.push(`${p.id}: duplicate project ID`);
    seen.add(p.id);
    if (!PROJECT_ID.test(p.id)) problems.push(`${p.id}: ID must look like P-018`);
    if (!ISO_DATE.test(p.date)) problems.push(`${p.id}: date "${p.date}" must be YYYY-MM-DD`);
    if (!p.tags?.length) problems.push(`${p.id}: has no tags`);
    if (retiredIds.includes(p.id)) problems.push(`${p.id}: is live but also listed in RETIRED_IDS`);
  }
  return problems;
}

/** Whether a URL slug ("p-005") names a retired project ID ("P-005"). */
export function isRetiredIn(slug, retiredIds) {
  const s = String(slug || "").toLowerCase();
  return retiredIds.some((id) => id.toLowerCase() === s);
}

/** Attachments a project's body places inline, so the bottom list can skip them. */
export function inlineAttachmentFiles(body = []) {
  return new Set((body || []).filter((b) => b && typeof b === "object" && b.attachment).map((b) => b.attachment));
}

/** The one badge a project card shows: its grade if it has one, otherwise its
 *  status unless that is plain "complete" — a badge every card shares says
 *  nothing. Null means no badge. */
export function cardBadge({ grade, status }) {
  if (grade) return { label: grade, tone: "accent", dot: false };
  if (status && status.tone !== "ok") return { label: status.label, tone: status.tone, dot: true };
  return null;
}

const tagKey = (t) => String(t).trim().toLowerCase();

/** Every tag across the projects, once each ignoring case (the first spelling
 *  seen wins), sorted for a filter list. */
export function allTags(projects) {
  const byKey = new Map();
  for (const p of projects) for (const t of p.tags || []) if (!byKey.has(tagKey(t))) byKey.set(tagKey(t), t);
  return [...byKey.values()].sort((a, b) => tagKey(a).localeCompare(tagKey(b)));
}

/** Projects matching a discipline and/or a tag (case-insensitive). Either may be
 *  omitted; order is preserved. */
export function filterProjects(projects, { discipline, tag } = {}) {
  return projects.filter(
    (p) =>
      (!discipline || p.discipline === discipline) &&
      (!tag || (p.tags || []).some((t) => tagKey(t) === tagKey(tag))),
  );
}
