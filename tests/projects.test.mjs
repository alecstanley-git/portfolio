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

test("formatDate gives the long form", () => {
  assert.equal(formatDate("2026-06-07"), "June 7, 2026");
});

test("formatDate does not shift by timezone", () => {
  assert.equal(formatDate("2025-10-30"), "October 30, 2025");
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
