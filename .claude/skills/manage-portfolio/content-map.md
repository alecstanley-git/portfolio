# Content map

Where each thing on alecstanley.com is set. Everything is in
`src/data/content.js` unless a row says otherwise. "In code" rows are layout
labels. Change them only when Alec asks for that specific label.

## Site-wide

| On the page | Source |
| --- | --- |
| Name in hero | `PROFILE.name` |
| Email (footer, contact, copy buttons) | `PROFILE.email` |
| LinkedIn / GitHub links, and the handles shown on Contact | `PROFILE.linkedin`, `PROFILE.github` (handle = last URL segment) |
| Location (footer, Contact "Based in") | `PROFILE.location` |
| Institution (footer note, Contact "Based in") | `PROFILE.institution` |
| CV links everywhere | `public/alec-stanley-cv.pdf` — use the update-cv skill |
| Portrait | `public/portrait-alec.png` |
| Nav labels | In code: `NAV` in `src/App.jsx` |
| Browser tab title | In code: `src/lib/usePageMeta.js` (`· Alec Stanley` suffix) |
| Link-preview text and image (scrapers) | `index.html` `<title>`, `description`, `og:*`, `twitter:*` — static, update by hand |
| `PROFILE.title`, `PROFILE.fullName` | Not shown on the site at present |

## Home (`/`)

| On the page | Source |
| --- | --- |
| Line above name ("Melbourne, VIC — Monash University") | `HOME.eyebrow` |
| Intro paragraph | `PROFILE.intro` |
| Major/minor chips | `STUDY_AREAS` — `{ label, kind: "major" \| "minor" }`, lowercase labels |
| Stat rail (Graduation, Projects, WAM) | `HOME.stats` — `{ value, label, tone? }`; the project count is computed |
| Availability callout text | `PROFILE.seeking` (title "Availability" in code: `src/routes/Home.jsx`) |
| Featured heading, index, lede | `HOME.starred` |
| Featured cards | Projects with `starred: true`, newest first |
| Button labels ("See the work", "Download CV", "All projects") | In code: `src/routes/Home.jsx` |
| Meta description | `SITE_META.home` |

## Work (`/work`)

| On the page | Source |
| --- | --- |
| Heading, index, lede | `WORK` |
| Cards | `PROJECTS`, sorted by `date`, newest first |
| Discipline filter options | Computed from project `discipline` values |
| Meta description | `SITE_META.work` |

## Project page (`/work/p-0NN`)

Built entirely from the project's entry (schema below). Fixed labels ("Back to
index", "Figures", "Video", "Reports and files", "Want the detail?") are in
code: `src/routes/ProjectDetail.jsx`. A retired ID shows the notice in that
file's `RetiredProject`.

Layout, top to bottom: header (ID · discipline · date · grade, title, summary,
tags) → first video, or else first figure → body → Result callout → Limitation
callout → Figures grid (the remaining figures) → remaining videos → Reports and
files (attachments not placed in the body) → contact card → previous/next.

## About (`/about`)

| On the page | Source |
| --- | --- |
| Section index/title, bio paragraphs | `ABOUT.intro` (`paragraphs` accept `**bold**`, `*italic*`, `[link](url)`) |
| Skills heading | `ABOUT.skills` |
| Skill groups and items | `SKILLS` — `{ group, items: [] }`, word for word from the CV's Skills section |
| Timeline heading | `ABOUT.timeline` |
| Timeline entries | `TIMELINE` (below) |
| Meta description | `SITE_META.about` |

## Contact (`/contact`)

| On the page | Source |
| --- | --- |
| Heading, index, lede | `CONTACT.index`, `.title`, `.lede` |
| Card title and note | `CONTACT.noteTitle`, `CONTACT.note` (`{codes}` = first two starred IDs) |
| Meta description | `SITE_META.contact` |

## Timeline entry

```js
{
  period: "FEB 2024 — JUN 2025",   // uppercase mono; "2023 — NOW" for ongoing
  current: true,                    // optional: ignition marker, ongoing roles only
  title: "Resident Advisor",
  org: "Richardson Hall, Monash University",
  description: "…",                 // one short paragraph
  tags: ["Pastoral care"],
}
```

Kept newest first by hand. `title` must be unique (it is the React key).

## Project schema

```js
project({
  id: "P-018",                 // computed: npm run media -- next-id. Never reused.
  title: "…",                  // Alec. Sentence case unless a proper name.
  discipline: "Aerospace",     // Alec: Aerospace | Astrophysics | Engineering | Physics | Software
  date: "2026-11-02",          // Alec. ISO. Sorts the list; year and display date derive from it.
  starred: true,               // optional. Alec. Home page.
  grade: "HD",                 // optional. Alec.
  status: { label: "In progress", tone: "warn" }, // optional; default Complete/ok. tones: ok warn fail idle.
                               // Cards show the grade if set, else this status unless it is Complete.
  summary: "…",                // Alec, or drafted from his text and approved. ≤ 2 card lines.
  tags: ["python", "CFD"],     // required. Alec or his notes. Tech names as owners write them.
  body: [ … ],                 // required. See markdown-to-body.md.
  result: "…",                 // optional. Alec. Accent callout.
  caveat: "…",                 // optional, always asked. Alec. "Limitation" callout.
  images: [{ file: "Plot 1.png", caption: "…" }],          // file = source name (manifest key); caption from Alec
  videos: [{ caption: "…", source: "run.mp4", youtube: "https://youtu.be/…", aspect: "4 / 3" }], // aspect only for 4:3
  attachments: [{ label: "Full report", file: "Final Report.pdf" }], // PDFs get the inline viewer; zips download
})
```

Dates display in Australian order ("25 October 2026"); tags are matched
case-insensitively by the Work page's tag filter (`/work?tag=python`).

The card thumbnail is not a field. It and the link-preview image (`og.jpg`) are
in `cover-manifest.js`, written by
`media add --thumbnail`.
