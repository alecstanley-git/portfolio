import { test } from "node:test";
import assert from "node:assert/strict";
import { PROJECTS, RETIRED_IDS, STARRED, findProject, isRetired } from "../src/data/content.js";
import { validateProjects } from "../src/lib/projects.js";

test("projects are listed newest first, in today's order", () => {
  assert.deepEqual(
    PROJECTS.map((p) => p.id),
    [
      "P-017", "P-016", "P-015", "P-014", "P-013", "P-012", "P-011", "P-010", "P-009",
      "P-008", "P-007", "P-006", "P-005", "P-004", "P-003", "P-002", "P-001",
    ],
  );
});

test("starred projects are the four featured today", () => {
  assert.deepEqual(
    STARRED.map((p) => p.id),
    ["P-014", "P-013", "P-011", "P-009"],
  );
});

test("display date and year are derived from the ISO date", () => {
  const p = findProject("p-017");
  assert.equal(p.displayDate, "June 7, 2026");
  assert.equal(p.year, "2026");
});

test("project data passes validation", () => {
  assert.deepEqual(validateProjects(PROJECTS, RETIRED_IDS), []);
});

test("isRetired matches retired IDs by slug", () => {
  assert.equal(isRetired("p-017"), false);
});
