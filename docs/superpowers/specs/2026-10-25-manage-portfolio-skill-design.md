# Manage-portfolio skill — design

Date: 2026-10-25
Status: awaiting Alec's review

## Goal

One skill, `manage-portfolio`, that lets Alec prompt Claude for any change to
alecstanley.com and get it done the same way every time: add a project from a
folder, edit any project or page text, star or unstar a project, delete a
project, or update the timeline, stats or profile. Changes are previewed
locally, pushed only on Alec's go-ahead, and checked live afterwards.

The CV stays with the existing `update-cv` skill; this skill hands off to it.

## Decisions Alec made

| Topic | Decision |
| --- | --- |
| Scope | All site content, not just projects. Quick edits must be seamless. |
| Project IDs | Next in sequence, never reused, never renumbered. Deleting leaves a gap. |
| Order | Projects sorted by date, newest first. IDs are permanent labels only. |
| Starred | Starred projects go on the home page. Odd count: last card centred on its own row. Warn above 6, never block. |
| Delete | Unstar and remove entirely. Visiting the old URL shows a "retired" notice. |
| Required | Every new project has a thumbnail, body text and tags. No thumbnail → stop. |
| Optional | Limitation note: always asked, may be skipped. |
| Disciplines | Keep the existing five; ask before adding another. |
| Images | WebP only. Shown as captioned figures like existing projects. |
| PDFs | Compressed exactly like the existing ones. Shown as collapsed rows that expand to an inline viewer. Full write-up goes last unless told otherwise; a PDF can also be placed mid-body. |
| Video | YouTube only. Never serve a raw mp4; ask Alec to upload and send the link. |
| Code / other files | Zipped into one download, after Alec confirms. |
| Info | Never invent anything. Infer only what a file makes obvious; ask for the rest. |
| Preview | Show locally before pushing; push only on Alec's go. |
| Originals | Not archived — Alec keeps them. The folder holds only what goes online. |

## Part 1 — site changes

These make the site able to do what the skill needs. No visible change to the
existing 17 projects except the ordering (by date — same order as now in
practice) and the home grid centring rule.

### 1.1 Content data (`src/data/content.js`)

- **`featured` renamed to `starred`.** `STARRED` replaces `FEATURED`. The card
  still gets its accent top rule through `ProjectCard`'s `featured` prop.
- **Dates become ISO** (`date: "2026-06-07"`). `year` is derived from it and the
  field removed from entries. The page still displays the long form exactly as
  now ("June 7, 2026") via one formatter.
- **`PROJECTS` is sorted** by date descending; same-date ties go to the higher
  ID. The array in the file is kept in that order too, for readability. The
  project pager (previous/next) follows this order.
- **`RETIRED_IDS`** — a list of deleted IDs, e.g. `["P-005"]`. Used for the
  retired notice and for picking the next ID.
- **`nextProjectId()`** — one more than the highest number across live projects
  *and* `RETIRED_IDS`, zero-padded to three digits.
- **Rich body.** `body` stays an array. Each item is one of:
  - a string → paragraph, with inline `**bold**`, `*italic*` and
    `[text](https://…)` links (external links open in a new tab);
  - `{ heading: "…" }` → a sub-heading inside the write-up;
  - `{ list: ["…", "…"], ordered?: true }` → bullet or numbered list (items
    support the same inline marks);
  - `{ attachment: "file.pdf" }` → that attachment rendered at this point
    instead of in "Reports and files".

  Rendering builds React elements; no raw HTML is ever injected. Existing
  plain-string bodies render unchanged.
- **Page copy moved in from route files**, so every visible string Claude may
  need to change lives in one file:
  - `HOME` — hero eyebrow, the stat rail (`[{ value, label, tone? }]`, with the
    project count computed), the starred-section heading and lede.
  - `ABOUT` — section headings and bio paragraphs (same inline marks as body).
  - `CONTACT` — lede and the "email is the fastest way" note. The example
    project codes in that note are filled from the first two starred projects
    automatically, so deleting a project can't leave a stale reference.
  - `SITE_META` — each page's meta description (Home, Work, About, Contact).
- **Contact handles derived from URLs.** The page currently shows "alec-stanley"
  while the LinkedIn URL is `/in/alecstanley/`; the displayed handle will come
  from the URL so the two can't drift.

Structural labels that belong to the layout ("Figures", "Reports and files",
button text) stay in the components.

### 1.2 Pages and components

- **Home** — the starred grid gets a `grid--starred` class. CSS: when the count
  is odd, the last card spans both columns and is centred at one column's width.
  At ≤720px (single column) it is a normal full-width card. If nothing is
  starred, the section heading and grid are hidden and only "All projects"
  shows.
- **Project page** — renders the rich body; skips attachments placed inline
  when building "Reports and files". Unknown slug: if it is in `RETIRED_IDS`,
  show a retired notice (index `P-005 / Retired`, title "This project has been
  retired", lede "It has been removed from the portfolio.", buttons to all
  projects and home). Otherwise redirect to `/work` as now.
- **About, Contact, Work** — read their copy from the data file.
- **`index.html`** — stays static (link-preview scrapers don't run JS). The
  skill updates its description when the profile title changes.

### 1.3 Media pipeline

- **Removed:** `scripts/import-assets.mjs` and `scripts/fetch-covers.mjs`, their
  npm scripts, and the Notion/Drive references in README and MEDIA.md. Existing
  media and both manifest files stay exactly as they are.
- **New: `scripts/media.mjs`** (`npm run media -- <command>`), no new
  dependencies. Uses the same settings as the old pipeline:

  | Command | Does |
  | --- | --- |
  | `inventory <dir>` | Lists every file in a folder: kind, size, image dimensions, PDF pages and encryption, video duration and aspect. Used for the handover checklist. |
  | `add <slug> <dir> --thumbnail <f> [files…]` | Converts and copies files into `public/media/<slug>/`, writes manifest entries, prints what each source became. |
  | `zip <slug> <dir> <files…> --name <n>` | Bundles code/other files into one zip, then adds it like any attachment. |
  | `remove <slug> [file]` | Deletes a project's media folder (or one file) and its manifest entries. |
  | `next-id` | Prints the next project ID. |

  Conversion rules:
  - **Thumbnail** → WebP q80, 900px wide max, into `cover-manifest.js`.
  - **Figures** → WebP, 1600px wide max. PNG/line art (plots, diagrams,
    screenshots) → lossless WebP so one-pixel axis lines stay sharp; photos
    (JPEG, HEIC) → q82. Dimensions recorded so the page doesn't jump.
  - **PDFs** → Ghostscript at 300 dpi with the exact old settings; kept only if
    smaller with the same page count, otherwise the original is copied.
    Encrypted PDFs are copied untouched.
  - **Videos and anything unrecognised** → refused with a message; the skill
    asks Alec what to do.
  - Output names are lowercase, hyphenated, no spaces (Pages is case-sensitive).
- **`check-media.mjs`** additionally fails if any project has no tags. It
  already fails on missing thumbnails, missing files, bad names and orphans.
- **Tests:** `npm test` (Node's built-in runner, no dependencies) covers the
  inline-mark parser, date sorting and `nextProjectId()`. CI runs `npm test` before `check-media`.

README and MEDIA.md are rewritten around the new flow.

## Part 2 — the skill

Lives at `.claude/skills/manage-portfolio/`:

- `SKILL.md` — triggers, the shared rules and each workflow (below).
- `content-map.md` — where every visible string on the site lives, field by
  field, plus the project schema and body format. So "change my WAM" or "update
  the about paragraph" goes straight to the right line.
- `markdown-to-body.md` — how Alec's markdown maps onto body blocks, with
  examples.

**Triggers:** add/new project, a folder path, star/unstar/feature, delete/remove/
retire a project, edit a project, change text on the site, update the timeline,
stats, WAM, graduation year, availability, bio, tags, links. CV PDFs go to
`update-cv`.

### Shared rules

1. Never invent content. Anything not in Alec's files or words, and not obvious
   from a file (e.g. a PDF's page count), is asked.
2. Questions are batched — one round per task where possible, each with the
   inferred value pre-filled for Alec to confirm.
3. Follow the design system's voice: first person, Australian English, no emoji
   or exclamation marks, sentence-case headings, tech names as their owners
   write them, card summary ≤ 2 lines.
4. Before pushing: `npm test`, `npm run check-media`, `npm run build` all pass.
5. Preview, then wait for Alec's go. Visual changes get a local screenshot of
   the affected page(s); text-only edits get a before/after of the text.
6. On go: commit on `main` (only the files this task touched), push, wait for the
   deploy, then `npm run check-media -- https://alecstanley.com/` to confirm the
   live files. Note that Cloudflare may serve the old page for up to ~10 min.
7. Never force-push. If not on `main` or the push fails, stop and report.

### Workflow: add a project

1. **Get the folder path** from Alec if not given. Run `inventory`.
2. **Read text and markdown first.** Decide per file whether it is verbatim page
   content or instructions to Claude; ask if unclear. Collect web links.
3. **Thumbnail.** Identify it (e.g. `thumbnail.*`, `cover.*`). If not obvious,
   ask. If there is none, stop.
4. **Fill the fields.** Infer what the files make obvious; ask for the rest in
   one round:
   - title, discipline (the five, or confirm a new one), date, tags, grade,
     status (default Complete), starred?;
   - summary — if not given, draft one from Alec's own text and ask him to
     approve or rewrite it;
   - result (optional), limitation (always asked, optional);
   - a caption for every figure;
   - a label and placement for every PDF (default: full write-up last in
     "Reports and files");
   - for each video file: ask Alec to upload to YouTube and send the link;
   - for code/other files: confirm zipping them as one download, and its label.

   Body is required: if the folder has none, ask Alec for it.
5. **Process media** with `media add` (and `media zip` if confirmed). New ID from
   `next-id`.
6. **Write the entry** in `content.js`, converting markdown per
   `markdown-to-body.md`.
7. **Handover checklist.** A table of every file in the folder and where it went
   on the site — or why it was left out. Every file must be accounted for.
8. **Verify and preview** (rules 4–5), including the home page if starred.
9. **On go: publish** (rule 6). Then tell Alec the folder is safe to delete.

### Workflow: star / unstar

Flip `starred`. Report the new count; warn above 6. The odd/even layout is
automatic. Preview the home page, then publish.

### Workflow: delete a project

1. Confirm with Alec, naming the ID and title — it can't be undone from the
   skill.
2. Remove the entry (which also unstars it), add the ID to `RETIRED_IDS`, run
   `media remove`.
3. Search `src/`, `index.html` and the README for the ID (both `P-005` and
   `p-005`) and fix any mention.
4. Never renumber other projects. Verify, preview the home and work pages,
   publish.

### Workflow: edit anything else

Find the field via `content-map.md`, make the change, show before/after, publish
on go. Covers project fields and media (add/replace/remove a figure, PDF or
video), timeline entries (newest first; `current` on the ongoing ones), stats,
profile, study-area chips, page meta. A change to the title, degree year or
availability also prompts a check of `index.html`'s description and the
`SITE_META` descriptions so nothing goes stale (e.g. "fourth-year").

## Out of scope

- Changing the CV (`update-cv` does this).
- Uploading videos to YouTube.
- Restyling the site or adding new page types.
- The design-system kit's sample data in `.claude/skills/alec-stanley-portfolio-design/` (a prototype, not the site).

## Done when

- All 17 existing projects look the same as before, in date order.
- An odd number of starred projects centres the last card; even gives two
  columns; zero hides the section.
- `/work/p-0xx` for a retired ID shows the retired notice.
- `npm test`, `check-media` and `build` pass locally and in CI.
- A dry run of the skill on a sample folder in the scratchpad produces a
  correct entry, converted media and a complete handover checklist (then is
  reverted, not published).
