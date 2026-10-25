# Manage-portfolio skill — implementation plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make alecstanley.com editable through one Claude skill — add, edit, star/unstar and retire projects from a folder, and change any page copy — with media converted to the site's existing standards.

**Architecture:** Pure helpers (`src/lib/inline.js`, `src/lib/projects.js`) hold the logic and are unit-tested with Node's test runner. `src/data/content.js` becomes the single home for all copy and project data; routes only read it. A new `scripts/media.mjs` replaces the Notion import scripts and writes the existing manifests. The skill in `.claude/skills/manage-portfolio/` drives all of it.

**Tech Stack:** React 18, React Router 6, Vite 5, Node ≥20 (`node --test`), cwebp, Ghostscript, poppler (`pdfinfo`), ffprobe, sips, zip. No new npm dependencies.

**Spec:** `docs/superpowers/specs/2026-10-25-manage-portfolio-skill-design.md`

## Global Constraints

- No new npm dependencies (runtime or dev).
- Work on branch `manage-portfolio-skill`; nothing merges to `main` or pushes without Alec's explicit go.
- Existing 17 projects must look the same as before (apart from date-ordered list, which equals today's order, and the Contact note's example codes).
- Displayed dates keep the current long form: `"June 7, 2026"`.
- Media paths: lowercase, hyphenated, no whitespace (GitHub Pages is case-sensitive).
- Thumbnails: WebP q80, ≤900px wide. Figures: WebP, ≤1600px wide; PNG → lossless, JPEG/HEIC → q82.
- PDFs: Ghostscript with the exact flag list from the current `scripts/import-assets.mjs` `processPdf` (300 dpi colour/grey, 600 mono, `/printer`, threshold 1.0); keep only if smaller with identical page count; encrypted PDFs copied byte-for-byte.
- Never render raw HTML from content; inline marks become React elements.
- Design-system copy rules: first person, Australian English, no emoji, no exclamation marks, sentence-case headings, tech names as their owners write them.
- Tokens only for styling — no new colours or font sizes.

## Review Focus

1. **Literal asterisks and underscores** (`5 * 3`, `snake_case`, a URL containing `_` or `*`) must stay literal, not turn into italics. → tests in Task 1.
2. **Dates shifting by timezone** (`"2025-10-30"` displaying as October 29 in a UTC-negative zone). → test in Task 2.
3. **Output-name collisions** (`Plot.png` + `plot.jpg` both → `plot.webp`; `Figure 1.png` + `figure-1.png`). `media add` must fail before writing anything. → test in Task 6.
4. **ID reuse after deleting the highest project** (retire P-018, next must be P-019) and a retired ID still live in `PROJECTS`. → tests in Task 2.
5. **Odd starred count on a phone** — the centred last card must become a normal full-width card at ≤720px. → visual check in Task 8.

---

## File structure

| File | Responsibility |
| --- | --- |
| `src/lib/inline.js` (new) | `parseInline(text)` → tokens. Pure. |
| `src/lib/projects.js` (new) | Date formatting, sorting, next ID, URL handles, example codes, validation. Pure. |
| `src/components/content/RichText.jsx` (new) | `Inline` and `RichBody` React renderers over the pure parser. |
| `src/data/content.js` | All data and copy: `PROFILE`, `HOME`, `WORK`, `ABOUT`, `CONTACT`, `SITE_META`, `PROJECTS`, `STARRED`, `RETIRED_IDS`, `TIMELINE`, `STUDY_AREAS`. |
| `src/routes/*.jsx` | Read copy from data; no hardcoded content strings. |
| `src/styles/site.css` | `.grid--starred` rule, body list/heading styles. |
| `scripts/lib/media-rules.mjs` (new) | Pure: `safeName`, `classify`, `planOutputs`, `serialiseManifest`. |
| `scripts/media.mjs` (new) | CLI: `inventory`, `add`, `zip`, `remove`, `next-id`. |
| `scripts/check-media.mjs` | Adds `validateProjects` problems. |
| `tests/*.test.mjs` (new) | Unit tests. |
| `.claude/skills/manage-portfolio/` (new) | `SKILL.md`, `content-map.md`, `markdown-to-body.md`. |
| Deleted | `scripts/import-assets.mjs`, `scripts/fetch-covers.mjs`. |

---

### Task 1: Inline-mark parser and test runner

**Files:**
- Create: `src/lib/inline.js`, `tests/inline.test.mjs`
- Modify: `package.json` (add `"test": "node --test tests/"`), `.github/workflows/deploy.yml` (add `- run: npm test` step before "Check media")

**Interfaces:**
- Produces: `parseInline(text: string) → Array<{ type: "text"|"strong"|"em"|"link", text: string, href?: string }>`. `strong`/`em` carry plain text (no nesting). `link` text is plain.

- [ ] **Step 1: Write the failing tests** in `tests/inline.test.mjs` using `node:test` + `node:assert/strict`:
  - `plain text is one text token` — `"hello"` → `[{type:"text",text:"hello"}]`
  - `bold` — `"a **b** c"` → text `"a "`, strong `"b"`, text `" c"`
  - `italic with * and _` — `"*x*"` and `"_x_"` → em `"x"`
  - `link` — `"see [the report](https://x.org/a_b*c)"` → text `"see "`, link `{text:"the report", href:"https://x.org/a_b*c"}`
  - `link with parentheses in URL` — `"[w](https://en.wikipedia.org/wiki/Foo_(bar))"` → href `"https://en.wikipedia.org/wiki/Foo_(bar)"`
  - `literal asterisk survives` — `"5 * 3 = 15"` → single text token, unchanged
  - `snake_case survives` — `"call my_var_name now"` → single text token
  - `unclosed marks are literal` — `"**open"` and `"[text](no-close"` → single text token each
  - `only http(s), mailto and site-relative links` — `"[x](javascript:alert(1))"` → single text token, unchanged
- [ ] **Step 2: Run** `npm test` — Expected: FAIL (module not found).
- [ ] **Step 3: Implement `parseInline`** in `src/lib/inline.js`. Single left-to-right scan. Links first (`[text](url)` with balanced parens in the URL). Emphasis opens only when the marker is followed by a non-space and closes only when preceded by a non-space; `_` emphasis additionally requires a non-word character (or string edge) outside both markers. Accept hrefs matching `^(https?:|mailto:|/)`. Merge adjacent text tokens.
- [ ] **Step 4: Run** `npm test` — Expected: all PASS.
- [ ] **Step 5: Commit** `git add src/lib/inline.js tests/inline.test.mjs package.json .github/workflows/deploy.yml && git commit -m "Add inline-mark parser and npm test"`

### Task 2: Project helpers

**Files:**
- Create: `src/lib/projects.js`, `tests/projects.test.mjs`

**Interfaces:**
- Produces (all pure, plain objects in / out):
  - `formatDate(iso: "YYYY-MM-DD") → "June 7, 2026"` (parse the string parts; never `new Date(iso)`).
  - `sortProjects(projects) → new array`, date descending, ties → higher numeric ID first.
  - `idNumber(id: "P-018") → 18`.
  - `nextProjectId(projects, retiredIds: string[]) → "P-0NN"` (max over both, +1, pad 3; `"P-001"` if both empty).
  - `handleFromUrl(url) → string` — last non-empty path segment.
  - `exampleCodes(starred, projects, n = 2) → "P-014, P-013"` — first `n` IDs of `starred`, topped up from `projects` if fewer.
  - `validateProjects(projects, retiredIds) → string[]` problems.

- [ ] **Step 1: Write failing tests** in `tests/projects.test.mjs`:
  - `formatDate("2026-06-07") === "June 7, 2026"`; `formatDate("2025-10-30") === "October 30, 2025"` with `process.env.TZ = "America/Los_Angeles"` set at top of file.
  - `sortProjects` on `[{id:"P-015",date:"2026-05-31"},{id:"P-016",date:"2026-05-31"},{id:"P-017",date:"2026-06-07"},{id:"P-018",date:"2024-01-01"}]` → IDs `P-017, P-016, P-015, P-018`.
  - `nextProjectId([{id:"P-017"}], []) === "P-018"`; `nextProjectId([{id:"P-017"}], ["P-018"]) === "P-019"`; `nextProjectId([], []) === "P-001"`.
  - `handleFromUrl("https://www.linkedin.com/in/alecstanley/") === "alecstanley"`; `handleFromUrl("https://github.com/alecstanley-git/") === "alecstanley-git"`.
  - `exampleCodes([{id:"P-014"}], [{id:"P-017"},{id:"P-014"}]) === "P-014, P-017"`.
  - `validateProjects` returns a problem containing the ID for each of: duplicate ID; ID not matching `/^P-\d{3}$/`; date not `YYYY-MM-DD`; empty `tags`; ID present in both `projects` and `retiredIds`; returns `[]` for a valid single project.
- [ ] **Step 2: Run** `npm test` — Expected: FAIL.
- [ ] **Step 3: Implement** the functions in `src/lib/projects.js`.
- [ ] **Step 4: Run** `npm test` — Expected: PASS.
- [ ] **Step 5: Commit** `"Add project helpers: dates, sort, next ID, validation"`

### Task 3: Project data model

**Files:**
- Modify: `src/data/content.js`, `src/routes/Home.jsx`, `src/routes/Work.jsx`, `src/routes/ProjectDetail.jsx`, `scripts/check-media.mjs`
- Create: `tests/content.test.mjs`

**Interfaces:**
- Consumes: Task 2 helpers.
- Produces from `content.js`: `PROJECTS` (sorted via `sortProjects`), `STARRED`, `RETIRED_IDS` (`[]`), `DISCIPLINES`, `findProject(slug)`, `isRetired(slug) → boolean`. Each project gains `year` (derived from `date`) and `displayDate` (`formatDate(date)`); entries no longer declare `year`; `featured` → `starred`.

- [ ] **Step 1: Write failing tests** in `tests/content.test.mjs` (import `../src/data/content.js`):
  - `PROJECTS.map(p => p.id)` deep-equals `["P-017","P-016","P-015","P-014","P-013","P-012","P-011","P-010","P-009","P-008","P-007","P-006","P-005","P-004","P-003","P-002","P-001"]`.
  - `STARRED.map(p => p.id)` deep-equals `["P-014","P-013","P-011","P-009"]`.
  - `findProject("p-017").displayDate === "June 7, 2026"` and `.year === "2026"`.
  - `validateProjects(PROJECTS, RETIRED_IDS)` deep-equals `[]`.
- [ ] **Step 2: Run** `npm test` — Expected: FAIL.
- [ ] **Step 3: Migrate `content.js`**: convert all 17 `date` strings to ISO, drop `year`, rename `featured` → `starred`, add `RETIRED_IDS`, `isRetired`, derive `year`/`displayDate` in `project()`, export `STARRED`. Update the header comment: media now comes from `npm run media`, not the Notion export.
- [ ] **Step 4: Update consumers**: `Home.jsx` uses `STARRED` and passes `featured={p.starred}` to `ProjectCard`; `Work.jsx` the same; `ProjectDetail.jsx` header shows `project.displayDate`. In `check-media.mjs`, push every `validateProjects(PROJECTS, RETIRED_IDS)` problem into `fail`.
- [ ] **Step 5: Run** `npm test && npm run check-media && npm run build` — Expected: all PASS.
- [ ] **Step 6: Commit** `"Sort projects by date, rename featured to starred, add retired IDs"`

### Task 4: Page copy into the data file

**Files:**
- Modify: `src/data/content.js`, `src/routes/Home.jsx`, `src/routes/Work.jsx`, `src/routes/About.jsx`, `src/routes/Contact.jsx`

**Interfaces:**
- Consumes: `handleFromUrl`, `exampleCodes` (Task 2); `PROJECTS`, `STARRED` (Task 3).
- Produces from `content.js` (exact current strings moved verbatim):
  - `HOME = { eyebrow, stats: [{ value, label, tone? }], starred: { index, title, lede } }` — stats `"2027"/"Graduation"`, `PROJECTS.length`/`"Projects"`/`"accent"`, `"77.1"`/`"WAM"`.
  - `WORK = { index, title, lede }`.
  - `ABOUT = { intro: { index, title, paragraphs: string[] }, timeline: { index, title } }`.
  - `CONTACT = { index, title, lede, noteTitle, note }` — `note` keeps the current sentence with `{codes}` where `"P-013, P-011"` was.
  - `SITE_META = { home, work, about, contact }` — the four current `usePageMeta` descriptions.
- Note: Task 5 makes `ABOUT.intro.paragraphs` render through `Inline`; here they render as plain text.

- [ ] **Step 1: Move the strings** into the objects above and make each route read them. Contact shows `handleFromUrl(PROFILE.linkedin)` / `handleFromUrl(PROFILE.github)` and replaces `{codes}` with `exampleCodes(STARRED, PROJECTS)`.
- [ ] **Step 2: Verify no content strings remain in routes**: `grep -nE "77\.1|2027|Perth to Melbourne|fourth-year|Let's talk|P-013, P-011" src/routes/` — Expected: no output.
- [ ] **Step 3: Run** `npm test && npm run build` — Expected: PASS.
- [ ] **Step 4: Commit** `"Move page copy into content.js"`

### Task 5: Rich body, inline PDFs and the retired notice

**Files:**
- Create: `src/components/content/RichText.jsx`
- Modify: `src/components/index.js`, `src/routes/ProjectDetail.jsx`, `src/routes/About.jsx`, `src/styles/site.css`

**Interfaces:**
- Consumes: `parseInline` (Task 1), `isRetired` (Task 3).
- Produces: `<Inline text={string} />`. Links starting with `/` render as router `Link`; others as `<a target="_blank" rel="noopener noreferrer">`. Also `<RichBody blocks={Array} renderAttachment={(file) => node} />`. Block shapes: `string` → `<p>`, `{heading}` → `<h3>` (`--type-h3`), `{list, ordered?}` → `<ul>`/`<ol>` with class `prose-list`, `{attachment}` → `renderAttachment(file)`. Keys are array indices.

- [ ] **Step 1: Build `RichText.jsx`**, export both from `components/index.js`. Add `.prose-list` to `site.css`: tokens only, body type and colour matching paragraphs, `padding-inline-start: var(--space-6)`, `gap` via `display: grid` and `var(--space-2)`.
- [ ] **Step 2: Wire `ProjectDetail.jsx`**: render `project.body` with `RichBody`; `renderAttachment` looks up the attachment by `file` and renders the same `PdfEmbed`/`AttachmentLink` choice as the bottom section; the bottom "Reports and files" list skips any file referenced by a `{attachment}` block. `About.jsx` paragraphs render through `Inline`.
- [ ] **Step 3: Retired notice**: when `findProject` misses and `isRetired(slug)`, render the notice with the copy from spec §1.2. Index is `` `${slug.toUpperCase()} / Retired` ``. Buttons "All projects" → `/work` (primary) and "Back to home" → `/` (secondary). `usePageMeta("Retired project")`. Otherwise keep `<Navigate to="/work" replace />`.
- [ ] **Step 4: Temporary check**: add `{ heading: "Test" }`, a string with `**bold**` and a link, `{ list: ["a","b"] }`, and `{ attachment: "submission.pdf" }` to P-017's body. Add `"P-099"` to `RETIRED_IDS`. Run `npm run dev`. Screenshot `/work/p-017`: the heading, list, bold, link and inline PDF row render, and "Reports and files" no longer lists `submission.pdf`. Screenshot `/work/p-099`: the retired notice shows. Then **revert both test edits** and confirm with `git diff src/data/content.js` (no output).
- [ ] **Step 5: Run** `npm test && npm run check-media && npm run build` — Expected: PASS.
- [ ] **Step 6: Commit** `"Rich project body, inline PDF placement, retired-project notice"`

### Task 6: Media CLI replaces the Notion import

**Files:**
- Create: `scripts/lib/media-rules.mjs`, `scripts/media.mjs`, `tests/media-rules.test.mjs`
- Delete: `scripts/import-assets.mjs`, `scripts/fetch-covers.mjs`
- Modify: `package.json` (remove `import-assets`, `fetch-covers`; add `"media": "node scripts/media.mjs"`), `src/data/cover-manifest.js` and `src/data/media-manifest.js` (header comments only: `GENERATED by scripts/media.mjs`), `README.md`, `MEDIA.md`

**Interfaces:**
- Produces in `media-rules.mjs`:
  - `safeName(file, ext?) → string` (same behaviour as the old script's `safeName`).
  - `classify(file) → "image"|"pdf"|"video"|"text"|"archive"|"other"` by extension (`png jpg jpeg heic webp` / `pdf` / `mp4 mov m4v webm` / `md txt` / `zip`).
  - `planOutputs(files: string[], { thumbnail }) → { outputs: [{ src, out, kind, lossless? }], errors: string[] }`. Images → `.webp`, `lossless: true` for `.png`. The thumbnail → `cover.webp`. Errors for: collision on `out`, kind `video`/`other`, missing thumbnail.
  - `serialiseManifest(header: string, data: object) → string` (header lines, then `export default <JSON 2-space>;\n`).
- Produces in `media.mjs` (`npm run media -- …`), all exiting non-zero with a message on failure:
  - `inventory <dir>` — one row per file (recursive, skips `.DS_Store`): relative path, kind, size; images `w×h`; PDFs pages and `encrypted`; videos duration and `16 / 9` or `4 / 3` (within 2%).
  - `add <slug> <dir> --thumbnail <file> [files…]` — files default to every image/PDF in `<dir>` except the thumbnail. Runs `planOutputs` and aborts on any error before writing. Writes `public/media/<slug>/` and updates `MEDIA[slug][<original name>] = { path, w?, h?, pages? }` and `COVERS[slug] = { path, w, h }`. Prints `src → out (size before → after)`.
  - `zip <slug> <dir> --name <name> <paths…>` — `zip -r -X` from `<dir>` with relative paths, excluding `.DS_Store`, `__MACOSX`, `__pycache__`, `node_modules`, `.git`. Writes `public/media/<slug>/<safeName(name)>.zip` and the manifest key `<safeName(name)>.zip`.
  - `remove <slug> [file]` — deletes the folder (or one file) and the matching `MEDIA`/`COVERS` entries.
  - `next-id` — prints `nextProjectId(PROJECTS, RETIRED_IDS)`.
- Conversion: lift `processPdf` and the sips-resize-then-cwebp flow from the old `import-assets.mjs` unchanged. Lossless images use `cwebp -lossless -z 9`; lossy use `-q 82 -m 6 -sharp_yuv`. Thumbnails resize to 900 and use `-q 80`. HEIC goes through `sips -s format png` to a temp file first.

- [ ] **Step 1: Write failing tests** in `tests/media-rules.test.mjs`:
  - `safeName("Team_61_-_Final_Submission_2025.pdf") === "team-61-final-submission-2025.pdf"`.
  - `classify` cases: `"a.PNG"→"image"`, `"b.pdf"→"pdf"`, `"c.MOV"→"video"`, `"notes.md"→"text"`, `"x.stl"→"other"`.
  - `planOutputs(["Plot.png","plot.jpg","cover.jpg"], {thumbnail:"cover.jpg"}).errors` contains one collision naming `plot.webp`.
  - `planOutputs(["Figure 1.png","figure-1.png","t.png"], {thumbnail:"t.png"})` → collision error.
  - `planOutputs(["a.png","t.jpg"], {thumbnail:"t.jpg"})` → no errors; outputs include `{src:"t.jpg", out:"cover.webp"}` and `{src:"a.png", out:"a.webp", lossless:true}`.
  - `planOutputs(["a.png"], {})` → error mentioning thumbnail; `planOutputs(["clip.mp4","t.png"], {thumbnail:"t.png"})` → error mentioning YouTube.
- [ ] **Step 2: Run** `npm test` — Expected: FAIL.
- [ ] **Step 3: Implement** `media-rules.mjs`, then `media.mjs`, then delete the two old scripts and update `package.json`, the manifest headers, README ("Editing content", "Running it") and MEDIA.md (new flow and conversion rules; drop Drive/Notion text and the outstanding-media table).
- [ ] **Step 4: Run** `npm test && npm run check-media && npm run build` — Expected: PASS. Then `git diff --stat public/` — Expected: no output (existing media untouched).
- [ ] **Step 5: Commit** `"Replace Notion import scripts with npm run media"`

### Task 7: Starred grid layout

**Files:**
- Modify: `src/routes/Home.jsx`, `src/styles/site.css`

- [ ] **Step 1: Home**: starred grid gets class `grid grid--2 grid--cap grid--starred`. When `STARRED.length === 0`, render neither `SectionHeading` nor grid (Availability callout and "All projects" button stay).
- [ ] **Step 2: CSS** in `site.css` (Grids section):

```css
/* Odd count: the last starred card sits alone, centred at one column's width. */
.grid--starred > :last-child:nth-child(odd) {
  grid-column: 1 / -1;
  justify-self: center;
  width: calc((100% - var(--space-6)) / 2);
}
```

  Inside the existing `@media (max-width: 720px)` block, reset it to `grid-column: auto; width: 100%;`.
- [ ] **Step 3: Verify**: temporarily unstar P-009 (3 starred). Screenshot the home page at 1280px (last card centred, same width as the others) and at 390px (full width). Restore P-009 and screenshot at 1280px (2×2). Confirm the restore with `git diff src/data/content.js` (no output).
- [ ] **Step 4: Run** `npm test && npm run build` — PASS. **Commit** `"Centre an odd last starred card on the home page"`

### Task 8: The skill

**Files:**
- Create: `.claude/skills/manage-portfolio/SKILL.md`, `.claude/skills/manage-portfolio/content-map.md`, `.claude/skills/manage-portfolio/markdown-to-body.md`

REQUIRED SUB-SKILL: superpowers:writing-skills (frontmatter, description written as triggers, concise body).

- [ ] **Step 1: `SKILL.md`** — frontmatter `name: manage-portfolio`. The `description` lists the triggers from spec Part 2 and says CV PDFs go to `update-cv`. The body holds the shared rules (spec "Shared rules" 1–7) and the four workflows (add, star/unstar, delete, edit) as numbered steps with the exact commands: `npm run media -- inventory|add|zip|remove|next-id`, `npm test`, `npm run check-media`, `npm run build`, `npm run dev`, and the post-deploy check `gh run watch` then `npm run check-media -- https://alecstanley.com/`. Questions are asked with AskUserQuestion (≤4 per call), each with the inferred value as the first option; free-text fields (summary, captions) go as one plain numbered list in chat. Include the handover-checklist table format: `File | Kind | Went to | Notes`. Include a "Common mistakes" table: inventing captions or dates; reusing a retired ID; renumbering; serving an mp4; skipping the checklist; pushing before Alec's go; forgetting `index.html` / `SITE_META` when title, year or availability changes.
- [ ] **Step 2: `content-map.md`** — for every visible string or value on each page (Home, Work, project page, About, Contact, nav/footer, `index.html`), name the export and field in `content.js`, or the file if it stays in code. Plus the full project schema: field, required?, type, example, and who supplies it (Alec / inferred / computed).
- [ ] **Step 3: `markdown-to-body.md`** — mapping table: paragraph → string; `#`/`##`/`###` → `{heading}`; `-`/`*` and `1.` lists → `{list, ordered?}`; `**b**`, `*i*`, `[t](url)` kept inline; images → figures (caption from alt text or the following italic line, else ask); a PDF link or "place X here" instruction → `{attachment}`; anything else (tables, code blocks, HTML) → ask Alec. One worked example: input markdown and the resulting `body` array.
- [ ] **Step 4: Check the commands**: `grep -o "npm run [a-z-]*" .claude/skills/manage-portfolio/*.md | sort -u` — every listed script exists in `package.json`.
- [ ] **Step 5: Commit** `"Add manage-portfolio skill"`

### Task 9: End-to-end dry run

**Files:** none kept. Scratch folder in the session scratchpad.

- [ ] **Step 1: Build a sample folder** in the scratchpad: a `thumbnail.jpg`, two PNG plots, one JPEG photo, one existing site PDF copied in as `Final Report.pdf`, `notes.md` (verbatim body with a heading, a list, a link and one "put the appendix PDF after the second paragraph" instruction), and `appendix.pdf`.
- [ ] **Step 2: Follow `SKILL.md` "add a project"** exactly as written, answering its questions as Alec would with clearly fake values. Expected: ID `P-018`; figures as `.webp`; PDFs no larger than their sources; `appendix.pdf` rendered mid-body; full report last; handover checklist covers all 7 files.
- [ ] **Step 3: Exercise the other workflows** on P-018: star (5 starred → centred last card), unstar, delete. After delete: `RETIRED_IDS` has `P-018`, `/work/p-018` shows the notice, `npm run media -- next-id` prints `P-019`, `npm run check-media` passes (no orphans).
- [ ] **Step 4: Note any instruction in the skill that was unclear or wrong during the run, fix it, and commit** `"Clarify manage-portfolio steps after dry run"`.
- [ ] **Step 5: Revert the dry run**: `git checkout -- src/data public/media`, `git clean -fd public/media`. Then `git status` — only committed work remains — and `npm test && npm run check-media && npm run build` passes.
- [ ] **Step 6: Hand back to Alec** for review of the branch. Merging to `main` (which deploys) happens only on his go, via superpowers:finishing-a-development-branch.
