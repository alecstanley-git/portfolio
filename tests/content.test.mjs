import { test } from "node:test";
import assert from "node:assert/strict";
import { PROJECTS, RETIRED_IDS, STARRED, findProject, isRetired } from "../src/data/content.js";
import { idNumber, validateProjects } from "../src/lib/projects.js";

test("projects are listed newest first, same-date ties to the higher ID", () => {
  for (let i = 1; i < PROJECTS.length; i++) {
    const [a, b] = [PROJECTS[i - 1], PROJECTS[i]];
    const ok = a.date > b.date || (a.date === b.date && idNumber(a.id) > idNumber(b.id));
    assert.ok(ok, `${a.id} (${a.date}) should not come before ${b.id} (${b.date})`);
  }
});

test("starred lists exactly the starred projects, in list order", () => {
  assert.deepEqual(
    STARRED.map((p) => p.id),
    PROJECTS.filter((p) => p.starred).map((p) => p.id),
  );
});

test("display date and year are derived from the ISO date", () => {
  for (const p of PROJECTS) {
    assert.equal(p.year, p.date.slice(0, 4), p.id);
    assert.match(p.displayDate, /^[A-Z][a-z]+ \d{1,2}, \d{4}$/, p.id);
  }
});

test("project data passes validation", () => {
  assert.deepEqual(validateProjects(PROJECTS, RETIRED_IDS), []);
});

test("isRetired matches retired IDs by slug", () => {
  assert.equal(isRetired("p-017"), false);
});

test("page copy lives in content.js", async () => {
  const { HOME, WORK, ABOUT, CONTACT, SITE_META } = await import("../src/data/content.js");
  assert.deepEqual(
    HOME.stats.map((s) => s.label),
    ["Graduation", "Projects", "WAM"],
  );
  assert.equal(HOME.stats[1].value, PROJECTS.length);
  assert.ok(WORK.title && ABOUT.intro.paragraphs.length === 2 && ABOUT.timeline.title);
  assert.match(CONTACT.note, /\{codes\}/);
  assert.deepEqual(Object.keys(SITE_META).sort(), ["about", "contact", "home", "work"]);
});
