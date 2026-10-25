import { test } from "node:test";
import assert from "node:assert/strict";
import { PROJECTS, RETIRED_IDS, STARRED, isRetired } from "../src/data/content.js";
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
    assert.match(p.displayDate, /^\d{1,2} [A-Z][a-z]+ \d{4}$/, p.id);
  }
});

test("project data passes validation", () => {
  assert.deepEqual(validateProjects(PROJECTS, RETIRED_IDS), []);
});

test("no live project is also retired, and every retired ID resolves as retired", () => {
  for (const p of PROJECTS) assert.equal(isRetired(p.slug), false, p.id);
  for (const id of RETIRED_IDS) assert.equal(isRetired(id.toLowerCase()), true, id);
});

test("page copy has the shape the pages render", async () => {
  const { HOME, WORK, ABOUT, CONTACT, SITE_META } = await import("../src/data/content.js");
  assert.ok(HOME.stats.length > 0);
  for (const st of HOME.stats) assert.ok(st.label && st.value !== undefined && st.value !== "", JSON.stringify(st));
  assert.ok(HOME.stats.filter((st) => st.tone === "accent").length <= 1, "at most one accent stat");
  assert.ok(HOME.eyebrow && HOME.starred.title && WORK.title && ABOUT.timeline.title && CONTACT.title);
  assert.ok(ABOUT.intro.paragraphs.length > 0 && ABOUT.intro.paragraphs.every((p) => typeof p === "string" && p));
  for (const key of ["home", "work", "about", "contact"]) assert.ok(SITE_META[key], key);
});

test("skills are labelled groups of non-empty items, with a heading", async () => {
  const { ABOUT, SKILLS } = await import("../src/data/content.js");
  assert.ok(ABOUT.skills.index && ABOUT.skills.title);
  assert.ok(SKILLS.length > 0);
  for (const g of SKILLS) {
    assert.ok(g.group, JSON.stringify(g));
    assert.ok(g.items.length > 0 && g.items.every((i) => typeof i === "string" && i.trim()), g.group);
  }
});
