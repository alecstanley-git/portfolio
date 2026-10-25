---
name: manage-portfolio
description: Use when Alec wants anything on alecstanley.com added, changed or removed — a new project (often given as a folder path), editing a project, starring/unstarring/featuring one, deleting or retiring a project, or changing site text such as the bio, timeline, WAM, graduation year, availability, stats, tags, links or page descriptions. Not for replacing the CV PDF (use update-cv).
---

# Manage alecstanley.com

## Overview

Every piece of content on the site lives in `src/data/content.js`. Media lives
in `public/media/<slug>/` and is put there by `npm run media`. Pushing to
`main` deploys via GitHub Actions to GitHub Pages, behind Cloudflare.

- `content-map.md` — where every visible string lives, plus the project schema.
- `markdown-to-body.md` — how Alec's markdown becomes a project `body`.

**Core rule: never invent content.** A value goes on the site only if Alec wrote
it, said it, or a file makes it unambiguous (a PDF's page count, an image's
pixels). Everything else is a question for Alec.

## Shared rules (every workflow)

1. **Ask, don't guess.** Batch questions into one round per task. Use
   AskUserQuestion (≤ 4 questions per call; the inferred value is the first
   option, marked "(Recommended)"). Free-text items — summary, captions, body —
   go in one numbered list in chat for Alec to answer or approve.
2. **Voice** (design system): first person, Australian English, no emoji, no
   exclamation marks, sentence-case headings, tech names as their owners write
   them (`MATLAB`, `python`, `SolidWorks`). Card summary ≤ 2 lines. Alec's own
   wording beats a rewrite. Never reword his text without saying so.
3. **Verify** before showing anything: `npm test`, `npm run check-media`,
   `npm run build`. All must pass.
4. **Preview, then stop.** Visual changes: run `npm run dev` and screenshot the
   affected pages (desktop width; also check phone width if layout changed).
   Text-only edits: show the before/after text. Then wait for Alec's go.
   Figures load lazily and PDF rows only open on a real click, so scroll and
   click rather than judging from a script.
5. **Publish only on Alec's go.** Must be on `main`. Stage only the files this
   task touched, commit (with the session's attribution trailer), then
   `git push origin main`. Never force-push. If not on `main` or the push fails,
   stop and report.
6. **Confirm it's live:** `gh run watch "$(gh run list --branch main --limit 1 --json databaseId -q '.[0].databaseId')" --exit-status`,
   then `npm run check-media -- https://alecstanley.com/`. Tell Alec Cloudflare
   may show the old page for up to ~10 minutes.

## Add a project

1. **Folder.** Ask for the path if Alec didn't give one. Run
   `npm run media -- inventory "<dir>"`.
2. **Read every text/markdown file first.** For each, decide: verbatim page
   content, or instructions to you? Ask if unclear. Collect web links.
3. **Thumbnail.** Use the file Alec names, or an obvious one (`thumbnail.*`,
   `cover.*`). If unclear, ask. If there is none, **stop** — no thumbnail, no
   project.
4. **Fields.** New ID: `npm run media -- next-id`. Fill each field in the
   schema (`content-map.md`) from Alec's files, and ask for the rest in one
   round:
   - title, date (`YYYY-MM-DD`), discipline (one of Aerospace, Astrophysics,
     Engineering, Physics, Software — ask before adding another), tags,
     grade (optional), status (default Complete), starred?
   - summary — if not given, draft one from Alec's text and get his approval;
   - result (optional); limitation — always ask, he may skip it;
   - a caption for every figure;
   - a label for every PDF, and where it goes (default: full write-up last in
     "Reports and files"; mid-body if his notes say so);
   - each video file: ask Alec to upload it to YouTube and send the link.
     Never put an mp4 on the site;
   - code or other files: confirm zipping them into one download, and its label.

   **Body is required.** If the folder has none, ask Alec for it.
5. **Media.** `npm run media -- add p-0NN "<dir>" --thumbnail <file> [files…]`
   (default: every image and PDF). For code: `npm run media -- zip p-0NN "<dir>" --name "<label>" <paths…>`.
   It refuses videos, unknown types and name collisions. Fix the cause, never
   bypass it.
6. **Entry.** Add a `project({...})` to `ENTRIES` in `content.js`, placed by
   date (newest first). Use the manifest keys `add` printed for `file:`.
   Convert the body per `markdown-to-body.md`. Videos with 4:3 aspect (see
   inventory) get `aspect: "4 / 3"`.
7. **Handover checklist.** Every file in the folder, one row each. No file may
   be missing from it:

   | File | Kind | Went to | Notes |
   | --- | --- | --- | --- |
   | `thumb.jpg` | image | card thumbnail (`cover.webp`) | 900px, q80 |
   | `notes.md` | text | body + summary | verbatim |
   | `clip.mp4` | video | YouTube embed | link from Alec |

8. **Verify, preview, publish, confirm** (rules 3–6), including the home page
   if starred. Then tell Alec the folder is safe to delete.

## Star / unstar

Set or remove `starred: true`. Report the new starred count; above 6, warn
that the home page is getting long (never block). Odd counts centre the last
card automatically. Preview the home page, then publish.

## Delete (retire) a project

1. Confirm with Alec, naming the ID and title.
2. Delete its `project({...})` entry (this unstars it). Add the ID to
   `RETIRED_IDS`. Run `npm run media -- remove p-0NN`.
3. `grep -rn -i "p-0NN" src index.html README.md` and fix any mention other
   than the new `RETIRED_IDS` entry.
4. **Never renumber other projects.** IDs are permanent; the gap stays.
5. Verify (`check-media` must report no orphans), preview home and `/work`, and
   open `/work/p-0NN` to see the retired notice. Then publish.

## Edit anything else

Find the field in `content-map.md`, change it, show before/after, publish on
go. Media changes use `media add` (add or replace one file) or
`media remove p-0NN "<manifest key>"`. When the degree year, title or
availability changes, also check `SITE_META`, `PROFILE.intro`, `HOME.stats` and
the static description in `index.html` for stale wording (e.g. "fourth-year").

## Common mistakes

| Mistake | Fix |
| --- | --- |
| Writing a caption, date, grade or tag Alec didn't give | Ask. A plausible guess is still an invention. |
| Reusing a retired ID, or renumbering after a delete | `next-id` only; never touch other IDs. |
| Serving an mp4 or GIF from `public/` | YouTube link only. |
| Proceeding without a thumbnail | Stop and ask. |
| Skipping the handover checklist | Alec deletes the folder after; anything unlisted is lost. |
| Pushing before Alec says go | Preview is a gate, not a courtesy. |
| Hand-editing `media-manifest.js` / `cover-manifest.js` | Use `npm run media`. |
| Editing route files for copy that lives in `content.js` | Check `content-map.md` first. |
| Replacing the CV here | Use update-cv. |
