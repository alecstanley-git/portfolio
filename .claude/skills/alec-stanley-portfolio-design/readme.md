# Alec Stanley — Technical Portfolio Design System

A design system for the personal technical portfolio of **Alec Stanley**, a fourth-year Bachelor of Engineering (Honours) / Bachelor of Science student at **Monash University**, majoring in aerospace engineering and astrophysics. Alec grew up in Perth, Western Australia and moved to Melbourne at 18.

The portfolio's audience is **prospective employers** — graduate-role recruiters and engineering hiring managers. So the system optimises for one thing: *everything essential legible at a glance*, with consistent UI and no decoration that isn't carrying information.

**Design brief, in the user's words:** "engineering/coding, high tech, but not too busy."

## Sources provided
| Source | What it gave us |
| --- | --- |
| `uploads/IMG-20250128-WA0023.jpg.png` → `assets/portrait-alec.png` | Circular portrait photograph (Alec in snow, Japan). |
| `uploads/Resume - Alec Stanley.pdf` → `assets/alec-stanley-cv.pdf` | CV — source of truth for bio, education, employment, skills and contact details. Every "CV" link in the kit points at this file. |
| `https://alecstanley.notion.site/alecstanleyportfolio` → Drive `My Drive/OLDPORTFOLIO` | Old Notion portfolio, exported as Markdown & CSV. Source of all 17 project entries, skill groups and contact details. The site itself is client-side rendered and unreadable directly; the export was read from Drive. |

**No codebase, Figma file, logo, brand guide or font binaries were provided.** Colour, type, spacing and components were authored from scratch against the brief; written content follows the CV.

## Products / surfaces
One product: **the portfolio website** (`ui_kits/portfolio/`). Five views — home, work index, project detail, about, contact. No app, docs site or deck template exists; none were invented.

---

## Content fundamentals

**Voice: first person, plain, evidence-first.** Alec talks about his own work as "I", the reader as "you". Sentences are short and declarative. Every claim is anchored in something measured.

- ✅ "Predicted chamber pressure within 4% of measured across six static fires."
- ❌ "Leveraged cutting-edge simulation to deliver world-class results."

**Rules**

1. **Numbers over adjectives.** If a project is impressive, a figure says so. `StatBlock` exists for exactly this.
2. **State the limitation.** Every project write-up carries a `Callout tone="warn"` naming what the work does *not* cover. Engineers trust people who know their model's edges.
3. **Sentence case for prose; UPPERCASE mono for metadata.** Headings are sentence case ("Selected technical work"). Metadata — section indices, dates, units, statuses — is uppercase mono with wide tracking (`01 / PROJECTS`, `P-004 · AEROSPACE · 2025`).
4. **Tech names are written as their owners write them.** `MATLAB`, `ANSYS Fluent`, `python`, `c++`. Never title-cased into "Python".
5. **Australian English.** "specialising", "optimisation", "metre". Dates ISO-style in mono (`2026-08`), long-form in prose.
6. **No emoji. Anywhere.** Not in UI, not in copy. Status is carried by `Badge` colour + word.
7. **No exclamation marks, no marketing verbs** (leverage, passionate, journey, unlock). No "Welcome to my portfolio."
8. **Section indices are sequential** — `00 /`, `01 /`, `02 / …` — running down each page. This numbering is the system's signature rhythm device.
9. **Project codes** are `P-###`, newest highest, shown in ignition orange.
10. **Length discipline.** Card summary ≤ 2 lines. Lede ≤ 1 sentence. Body paragraphs ≤ 4 lines.

**Vibe:** a well-kept lab notebook. Confident, unhurried, quietly precise. Never salesy, never self-deprecating.

---

## Visual foundations

### Concept
**"Flight deck."** A dark instrument panel: cool graphite surfaces, a faint blueprint grid, hairline rules, monospace telemetry, and exactly one signal colour that means *action* or *now*.

### Colour
- **Hull** (`--hull-1000 → --hull-000`) — a cool, blue-shifted graphite ramp. Every surface, rule and neutral text colour comes from here. Nothing is pure black (`#05070a` is the floor).
- **Ignition** (`--ignition-500 #ff6a2b`) — sodium-flare orange. The **only** accent. Used for: the primary button, active nav, section indices, the current timeline marker, filled skill segments, focus rings. One dominant use per viewport.
- **Plasma** (`--plasma-500 #3ab7ef`) — a secondary *data* colour, for charts, quantities and note callouts. Never for actions.
- **Semantic** — `--state-ok` green (complete), `--state-warn` amber (in progress), `--state-fail` red (blocked), `--state-idle` grey (archived). Reserved for project status; never decoration.
- **Dark-first.** `:root` is the dark theme. `.theme-light` is an opt-in scope for print and documents.
- Always consume the **semantic aliases** (`--surface-card`, `--text-muted`, `--border-hairline`), not raw ramp steps.
- Total accent budget: **~5% of pixels.** If a screen looks orange, it is wrong.

### Typography
- **Display — Space Grotesk** (700/600): headings, buttons, wordmark, stat figures. Tight tracking (`-0.02em`) at large sizes.
- **Body — IBM Plex Sans** (400/500): all running prose. 16px / 1.65, measure capped at 68ch.
- **Mono — JetBrains Mono** (400/500/700): metadata, units, timestamps, labels, project codes, tags. Uppercase + `0.14em` tracking for label roles.
- Scale: 11 · 12 · 14 · 16 · 18 · 22 · 28 · 36 · 46 · 60 · 78px. Never invent an intermediate size.
- No italics except for genuine emphasis in prose. No letter-spaced body copy.

### Spacing & layout
- **4px base grid.** `--space-1` (4) → `--space-32` (128).
- Containers: `--container-max` 1180px, `--container-narrow` 780px (long-form reading), `--measure` 68ch.
- Gutters 24px / 40px. Section rhythm `--section-y` 96px, `--section-y-sm` 64px.
- **Layout is centred and grid-locked.** Page sections, section headings, the hero and the stat rail are centre-aligned on a narrow measure; card *interiors* stay left-aligned so they scan. Nothing is asymmetric for effect.
- Fixed elements: **the nav bar and the page backdrop, nothing else**. The nav is sticky, blurred, with a hairline bottom border; the backdrop is inert and sits behind everything (see Backgrounds). No sticky CTAs, no floating action buttons, no scroll-jacking.
- Sibling groups use flex/grid + `gap` — never margin chains.

### Backgrounds
- **Surfaces are flat.** Every panel, card and section is a solid token colour — no gradients, no textures, no imagery. Separation between them comes from hairline rules and a step in surface value, never from a fill effect.
- **The page itself carries one backdrop: the blueprint grid.** `Backdrop` paints `--bg-grid-image` at `--grid-size` (32px) in `--grid-line` (7%) across a fixed layer behind all content. It is the concept's *"faint blueprint grid"* made literal, and it is the **only** thing permitted behind the page. Its full specification:
  - **Fixed, `z-index: -1`, `pointer-events: none`.** At `z-index: 0` a positioned layer paints *above* non-positioned block content and would sit over the text.
  - **Masked to a horizon.** `linear-gradient(180deg, #000 0%, #000 18%, transparent 78%)`, viewport-fixed — full strength at the top of the screen, gone before the bottom, so the lower half of every screen stays flat and long-form reading is never patterned.
  - **Drifts at 0.15× scroll**, as a `background-position` shift so the pattern tiles indefinitely. Parallax only: the page scrolls normally, nothing is hijacked, nothing loops. Under `prefers-reduced-motion` the layer renders static — and because the drift is written from JS, that has to be handled in the component, not by the global reduced-motion block.
  - **Page surfaces above it must be transparent to show it.** `.hero` deliberately sets no background; an opaque restatement of `--surface-page` would occlude the layer.
- **One backdrop, one layer.** `--bg-scanline` and the `--bg-grid` shorthand remain in the token set for occasional bounded technical panels — an empty media slot, a diagram bed — and are never stacked with the page backdrop or used as a second full-page treatment.
- No mesh gradients, no purple-blue washes, no gradient text, no full-bleed photography.

### Borders, radii, shadows
- **Depth is drawn, not blurred.** Rest state = 1px hairline border + `--inner-top` (a 5% white inner top edge). Drop shadows appear only on hover (`--shadow-md`) and overlays (`--shadow-lg`).
- Three border weights: `--border-hairline` (16%), `--border-line` (28%), `--border-strong` (45%).
- Radii are **machined**: 2 / 4 / 6 / 10 / 14px, plus pill for badges only. Cards are 10px, controls 4px. Nothing is soft or blobby.
- **Cards**: `--surface-card` fill, hairline border, 10px radius, 24px padding, no shadow at rest. Featured cards get a 2px ignition rule fading out along the top edge (`accent` prop) — a top rule, never a coloured left border on a rounded card.

### Transparency & blur
Used in exactly two places: the sticky nav (`rgba(8,11,16,.72)` + `--blur-panel`) and modal scrims (`--scrim`). Everything else is opaque.

### Motion
- Durations: 80 / 140 / 220 / 420 / 700ms. Controls use 140ms; card lifts 220ms; page reveals 700ms.
- Easing is **damped, never elastic** — `--ease-standard` `cubic-bezier(.2,0,0,1)` for controls, `--ease-out` for entrances, `--ease-in` for exits. **No bounce, no overshoot, no spring.**
- Motion is limited to: colour/border transitions, a 2px card lift, a 1px press nudge, and fade-up reveals. Nothing loops except a single thin progress sweep.

### Interaction states
| State | Treatment |
| --- | --- |
| Hover | Background one step lighter; border `hairline → strong`; accent text `500 → 400`; interactive cards lift 2px + gain `--shadow-md`; imagery goes `saturate(.85) → 1.05`. |
| Press | `translateY(1px)`. No scale, no ripple. |
| Focus | `--ring-focus` — 2px page-coloured gap then a 2px ignition ring. Always visible; never removed. |
| Disabled | `opacity: .4`, `cursor: not-allowed`. Colour is not changed. |
| Active/selected | Ignition text + 1px ignition underline (nav), or filled ignition segment (meters). |

### Imagery
Cool, slightly desaturated (`saturate(.85)`), lifting to full only on hover. Framed with a hairline border, never a shadow. The portrait is circular; everything else is rectangular with a 10px radius. Diagrams, plots and CAD renders sit on `--surface-inset` over the blueprint grid. **No stock photography, no AI imagery, no illustration.**

---

## Iconography

- **Lucide** (v0.363.0), loaded from CDN — [`lucide-static`](https://unpkg.com/lucide-static@0.363.0/). ⚠️ **Substitution flag:** no icon set was supplied with the brief. Lucide was chosen because its 24px/2px-stroke geometry matches the machined, hairline character of this system. Swap it wholesale via `components/core/Icon.jsx` if Alec prefers another set.
- Always render via the **`Icon` component**, which applies the SVG as a CSS mask so glyphs inherit `currentColor` and can be tinted with tokens. **Never inline hand-drawn SVG paths.**
- Sizes: 14 (`sm`, inline/in-button), 16 (`md`, default), 20 (`lg`), 24 (`xl`). Stroke weight is Lucide's default — do not mix weights.
- House glyph set: `rocket`, `orbit`, `telescope`, `cpu`, `wind`, `ruler`, `gauge`, `git-branch`, `file-text`, `arrow-up-right`, `arrow-right`, `download`, `mail`, `send`, `map-pin`, `github`, `linkedin`, `chevron-down`, `info`, `zap`, `triangle-alert`.
- Icons are decorative (`aria-hidden`); the surrounding control carries the label.
- **Emoji are never used.** Unicode is used for typographic marks only — `·` separators, `—` em dashes, `→ ↓` directional marks in mono metadata, `Δ` `±` `°` in quantities.

### Logo
**No logo mark exists and none was invented.** The brand mark is the name set in Space Grotesk Bold, uppercase, `0.14em` tracking — see `guidelines/brand-wordmark.html`. If Alec has or wants a mark, drop the SVG into `assets/` and update `NavBar`.

---

## Index

### Root
| File | Purpose |
| --- | --- |
| `styles.css` | Global entry point — `@import` list only. Consumers link this. |
| `readme.md` | This file. |
| `SKILL.md` | Agent-Skills front matter for use outside this project. |
| `thumbnail.html` | Homepage tile for the design system. |
| `assets/portrait-alec.png` | Portrait photograph (the only supplied asset). |

### Tokens — `tokens/`
`fonts.css` (webfont imports + families) · `colors.css` · `typography.css` · `spacing.css` · `radius.css` · `elevation.css` (shadows, backdrops, focus ring) · `motion.css` · `base.css` (element defaults).

### Components — `components/`
Each directory holds `<Name>.jsx`, `<Name>.d.ts`, `<Name>.prompt.md` and one `@dsCard` HTML.

- **`core/`** — `Button`, `IconButton`, `Icon`, `Tag`, `Badge`
- **`layout/`** — `Card`, `SectionHeading`, `NavBar`, `Footer`, `Backdrop`
- **`content/`** — `ProjectCard`, `StatBlock`, `TimelineEntry`, `SkillMeter`, `Callout`, `MediaFrame`, `VideoEmbed`, `AttachmentLink`, `Toast`
- **`forms/`** — `Input`, `Textarea`, `Select`

*Intentional additions:* no source defined a component inventory, so this is an authored set sized to a portfolio site. `Icon` is a wrapper over the Lucide CDN set rather than a design element in its own right. `SkillMeter`, `StatBlock`, `TimelineEntry` and `ProjectCard` are portfolio-specific — they exist because this product's content demanded them, not because a generic system "should" have them. `Toast` was added later, when the contact address became a copy-to-clipboard action rather than a `mailto:` link — a change that leaves no trace on the page and so needs a confirmation that does. It is the system's only overlay. Deliberately **not** built: Modal, Tooltip, Tabs, Avatar, Table — nothing on the site needs them.

### Guidelines — `guidelines/`
20 specimen cards feeding the Design System tab, grouped **Colors** (hull, ignition, status, surfaces, text, borders), **Type** (families, display, headings, body, mono), **Spacing** (scale, layout, radii), **Effects** (elevation, motion, states, backdrops), **Brand** (wordmark, imagery).

### UI kit — `ui_kits/portfolio/`
`index.html` (interactive click-through) · `Home.jsx` · `Work.jsx` (index + detail) · `About.jsx` (about + contact) · `data.js` (sample content) · `README.md`.

### Template — `templates/portfolio-page/`
`PortfolioPage.dc.html` — a single-page portfolio (hero, stat rail, project grid, timeline, contact form) that consuming projects can start from. Content is passed in as `stats` / `projects` / `timeline` props.

---

## Caveats
- **Fonts are Google Fonts substitutions** (Space Grotesk / IBM Plex Sans / JetBrains Mono) loaded from the Google CSS API — no binaries were supplied. If Alec licences a different typeface, replace `tokens/fonts.css`.
- **Icons are a Lucide substitution** (see Iconography).
- **Bio, education, employment and skills come from the CV** (`assets/alec-stanley-cv.pdf`). **Project content is the real thing**, recovered from the Notion export in `My Drive/OLDPORTFOLIO` — 17 projects with their original overviews, write-ups, figure captions and report filenames.
- **Binary assets are NOT in the project yet.** Images, report PDFs and the source-code zip live only in the Drive export; moving them across is impractical from here. Every figure renders as a dashed `MediaFrame` slot naming its original file, every report as an `AttachmentLink` stamped FILE PENDING, and every video as an empty `VideoEmbed` YouTube slot naming the original `.mp4`. Upload the assets and set `src` / `href` / `youtube` in `ui_kits/portfolio/data.js`.
