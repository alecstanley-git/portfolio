# Alec Stanley — technical portfolio

The personal technical portfolio of Alec Stanley: fourth-year Bachelor of
Engineering (Honours) / Bachelor of Science at Monash University, specialising in
aerospace engineering and astrophysics.

Dark, instrument-panel styled, aimed squarely at graduate-role recruiters and
engineering hiring managers — everything essential legible at a glance.

## Running it

```sh
npm install
npm run dev            # http://localhost:5173
npm run build          # static site → dist/
npm run preview        # serve the built site
npm test               # unit tests (node --test, no dependencies)
npm run check-media    # assert every image and report resolves, and project data is sound
npm run media -- …     # convert a project's files onto the site — see MEDIA.md
```

Node 20 or newer. `npm run media` additionally needs `ghostscript`, `webp`,
`poppler` and `ffmpeg` (`brew install ghostscript webp poppler ffmpeg`);
nothing else does.

## Routes

| Path | Page |
| --- | --- |
| `/` | Hero, stat rail, four featured projects, approach panel |
| `/work` | Filterable index of every project, newest first (`?discipline=Aerospace` is linkable) |
| `/work/:id` | One project: write-up, result, limitation, figures, video, reports. A retired ID shows a "retired" notice |
| `/about` | Bio, education and work timeline, three skill groups |
| `/contact` | Contact facts, CV download, availability |

Project URLs use the lowercase project code — `/work/p-013` is the galaxy
collision simulation. Codes are permanent: never reused, never renumbered. A
deleted project's code goes into `RETIRED_IDS`, so its old link explains itself.

## Editing content

Day to day, ask Claude: the `manage-portfolio` skill in
`.claude/skills/manage-portfolio/` adds, edits, stars and retires projects and
changes any page copy, previews it, and publishes on your go. The CV has its
own skill, `update-cv`.

Under the hood, **`src/data/content.js` is the only file to touch for
content.** It holds the profile, every page's copy (`HOME`, `WORK`, `ABOUT`,
`CONTACT`, `SITE_META`), all projects, the timeline and the study-area chips.

- A project's `id` (`P-###`) drives its URL. `date` is ISO (`2026-06-07`); the
  list sorts on it, newest first.
- `starred: true` puts a project on the home page and gives its card the
  ignition top rule. An odd number of starred projects centres the last card.
- `body` items are paragraphs (with `**bold**`, `*italic*`, `[links](…)`),
  `{ heading }`, `{ list, ordered? }`, or `{ attachment: "file.pdf" }` to place
  a report mid-write-up.

Asset URLs are **not** written by hand. `npm run media -- add` converts a
project's files into `public/media/<project>/` and records them in
`src/data/media-manifest.js` (thumbnails in `cover-manifest.js`); the
`project()` factory in `content.js` turns that into `src` / `href`. A file
missing from the manifest gets no URL, so the page falls back to its labelled
placeholder instead of a broken image. See **[MEDIA.md](MEDIA.md)**.

Videos are on YouTube rather than committed; each entry carries a `youtube`
link.

**If the site moves domain**, update the absolute URLs in `index.html` —
`og:url`, `og:image`, `twitter:image` and `<link rel="canonical">`. They have to
be absolute because link-preview scrapers do not resolve relative paths, and
static because most do not run JavaScript, so the router cannot set them per
route.

## Design system

The visual language comes from the `alec-stanley-portfolio-design` system
(Claude Design), which is not a package — it was ported into this repo:

- `src/styles/tokens/` — **copied verbatim** from the system's `tokens/`. Don't
  hand-edit these; re-copy them if the system is updated.
- `src/styles/site.css` — the only styling this repo adds on top. Layout,
  responsiveness, reduced motion, print. No new colours, and small screens step
  *down* the existing type scale rather than landing on invented sizes.
- `src/components/` — the system's primitives as real modules. Four deliberate
  changes from the reference implementations, all noted in the source:
  - `Icon` resolves Lucide glyphs from `lucide-react` instead of fetching SVGs
    from a CDN at runtime. Icon names stay kebab-case; swapping icon sets means
    editing the one map in `Icon.jsx`.
  - `Card` takes an `as` prop, so `ProjectCard` is a real link rather than a
    clickable `div` — the whole card is keyboard-reachable.
  - The accent rule sits above positioned children, which would otherwise
    paint over it.
  - `Input` and `Textarea` were not ported. Nothing on the site takes typed
    input; they are in the design system if that changes.

`PdfEmbed` is an addition rather than a port — the design system has no document
component. A report row expands into an inline viewer; the iframe is mounted
only on expand, so an unopened PDF costs nothing. On narrow or touch devices the
row stays a plain link, because iOS Safari reports `pdfViewerEnabled === true`
and then renders a single unscrollable page.

The system's own rules — voice, casing, the ~5% accent budget, sequential
section indices, no emoji — are documented in its `readme.md`. The system lives
at `.claude/skills/alec-stanley-portfolio-design/`.

**Substitutions inherited from the design system:** fonts are Google Fonts
stand-ins (Space Grotesk / IBM Plex Sans / JetBrains Mono) and icons are Lucide.
No logo mark exists and none was invented — the wordmark is the name set in
Space Grotesk, and `public/favicon.svg` is the system's own signal dot.

## Deploying

Set up for **GitHub Pages** via `.github/workflows/deploy.yml`. Push to `main`
and it builds and deploys. In the repo settings, set Pages → Build and
deployment → Source to **GitHub Actions**.

The workflow resolves the base path itself: `/` for a `<user>.github.io` repo,
`/<repo>/` for anything else. It also copies `index.html` to `404.html`, which is
what makes deep links like `/work/p-013` resolve — Pages serves static files and
would otherwise 404 before the router ever loads.

For any other host, `npm run build` and serve `dist/`. Two requirements:

- rewrite unknown paths to `index.html` (SPA fallback), and
- if serving from a sub-path, build with `BASE_PATH=/sub/path/ npm run build`.
  The router reads the same value, so both stay in step.

## Stack

React 18, React Router 6, Vite 5. No CSS framework, no component library, no
analytics, no trackers. The only third-party runtime dependency is `lucide-react`
for icons; fonts come from Google Fonts at load.
