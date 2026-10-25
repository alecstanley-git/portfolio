// A UTC-negative zone: a `new Date("2025-10-30")` implementation would show the 29th.
process.env.TZ = "America/Los_Angeles";

import { test } from "node:test";
import assert from "node:assert/strict";
import {
  exampleCodes,
  formatDate,
  handleFromUrl,
  idNumber,
  nextProjectId,
  sortProjects,
  validateProjects,
} from "../src/lib/projects.js";

test("formatDate gives the Australian long form", () => {
  assert.equal(formatDate("2026-06-07"), "7 June 2026");
});

test("formatDate does not shift by timezone", () => {
  assert.equal(formatDate("2025-10-30"), "30 October 2025");
});

test("sortProjects: newest first, same-date ties to the higher ID", () => {
  const sorted = sortProjects([
    { id: "P-015", date: "2026-05-31" },
    { id: "P-016", date: "2026-05-31" },
    { id: "P-017", date: "2026-06-07" },
    { id: "P-018", date: "2024-01-01" },
  ]);
  assert.deepEqual(
    sorted.map((p) => p.id),
    ["P-017", "P-016", "P-015", "P-018"],
  );
});

test("idNumber", () => {
  assert.equal(idNumber("P-018"), 18);
});

test("nextProjectId never reuses a retired ID", () => {
  assert.equal(nextProjectId([{ id: "P-017" }], []), "P-018");
  assert.equal(nextProjectId([{ id: "P-017" }], ["P-018"]), "P-019");
  assert.equal(nextProjectId([], []), "P-001");
});

test("handleFromUrl takes the last path segment", () => {
  assert.equal(handleFromUrl("https://www.linkedin.com/in/alecstanley/"), "alecstanley");
  assert.equal(handleFromUrl("https://github.com/alecstanley-git/"), "alecstanley-git");
});

test("exampleCodes tops up from all projects", () => {
  assert.equal(exampleCodes([{ id: "P-014" }], [{ id: "P-017" }, { id: "P-014" }]), "P-014, P-017");
});

const ok = { id: "P-001", date: "2024-03-22", tags: ["x"] };

test("validateProjects accepts a valid project", () => {
  assert.deepEqual(validateProjects([ok], []), []);
});

test("validateProjects flags each problem with the ID", () => {
  const cases = [
    [[ok, { ...ok }], [], "P-001"],
    [[{ ...ok, id: "P-1" }], [], "P-1"],
    [[{ ...ok, date: "March 22, 2024" }], [], "P-001"],
    [[{ ...ok, tags: [] }], [], "P-001"],
    [[ok], ["P-001"], "P-001"],
  ];
  for (const [projects, retired, id] of cases) {
    const problems = validateProjects(projects, retired);
    assert.equal(problems.length, 1, JSON.stringify({ projects, retired, problems }));
    assert.match(problems[0], new RegExp(id));
  }
});

test("inlineAttachmentFiles lists files placed in the body", async () => {
  const { inlineAttachmentFiles } = await import("../src/lib/projects.js");
  const body = ["para", { heading: "H" }, { attachment: "appendix.pdf" }, { list: ["a"] }];
  assert.deepEqual([...inlineAttachmentFiles(body)], ["appendix.pdf"]);
  assert.deepEqual([...inlineAttachmentFiles(undefined)], []);
});

test("isRetiredIn matches IDs by slug, case-insensitively", async () => {
  const { isRetiredIn } = await import("../src/lib/projects.js");
  assert.equal(isRetiredIn("p-005", ["P-005"]), true);
  assert.equal(isRetiredIn("P-005", ["P-005"]), true);
  assert.equal(isRetiredIn("p-006", ["P-005"]), false);
  assert.equal(isRetiredIn(undefined, ["P-005"]), false);
});

test("cardBadge: grade first, status only when not complete, else nothing", async () => {
  const { cardBadge } = await import("../src/lib/projects.js");
  const done = { label: "Complete", tone: "ok" };
  assert.deepEqual(cardBadge({ grade: "HD", status: done }), { label: "HD", tone: "accent", dot: false });
  assert.equal(cardBadge({ status: done }), null);
  assert.deepEqual(cardBadge({ status: { label: "In progress", tone: "warn" } }), { label: "In progress", tone: "warn", dot: true });
  assert.deepEqual(cardBadge({ grade: "D", status: { label: "In progress", tone: "warn" } }), { label: "D", tone: "accent", dot: false });
});

const sample = [
  { id: "P-003", discipline: "Aerospace", tags: ["python", "CFD"] },
  { id: "P-002", discipline: "Software", tags: ["Python", "C++"] },
  { id: "P-001", discipline: "Aerospace", tags: ["MATLAB"] },
];

test("allTags: one entry per tag ignoring case, first spelling wins, sorted", async () => {
  const { allTags } = await import("../src/lib/projects.js");
  assert.deepEqual(allTags(sample), ["C++", "CFD", "MATLAB", "python"]);
});

test("filterProjects by discipline, tag (any case), both, or neither", async () => {
  const { filterProjects } = await import("../src/lib/projects.js");
  const ids = (o) => filterProjects(sample, o).map((p) => p.id);
  assert.deepEqual(ids({}), ["P-003", "P-002", "P-001"]);
  assert.deepEqual(ids({ tag: "PYTHON" }), ["P-003", "P-002"]);
  assert.deepEqual(ids({ discipline: "Aerospace", tag: "python" }), ["P-003"]);
  assert.deepEqual(ids({ discipline: "Aerospace" }), ["P-003", "P-001"]);
  assert.deepEqual(ids({ tag: "fortran" }), []);
});
