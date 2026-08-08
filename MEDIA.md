# Media

Everything is imported and live. Nothing outstanding.

| | |
| --- | --- |
| Card thumbnails | 17 / 17 imported |
| Figures | 24 / 24 imported |
| Reports and files | 18 / 18 imported (17 PDFs + 1 zip) |
| Videos | 8 / 8 embedded from YouTube |

Source of record is the Notion export in Google Drive:
`My Drive/OLDPORTFOLIO/Alec Stanley/Skills and Projects/`. It is never modified.

## Two sources, two scripts

Figures and reports come from the Drive export. **Card thumbnails do not** —
they are Notion *page covers*, which the Markdown export omits entirely. The CFD
contour on P-014, the glider photo on P-012 and the CSWA results screen on P-008
exist nowhere but the live site, so they are fetched from its public API and the
optimised WebP is committed in case that source goes away.

```sh
npm run import-assets    # figures + reports, from the Drive export
npm run fetch-covers     # card thumbnails, from the old Notion site
npm run check-media      # assert every referenced asset resolves
```

`import-assets` is idempotent and safe to re-run; `--force` rebuilds everything.
It fails loudly if a file named in `content.js` isn't on disk. `check-media`
also runs in CI before the build, so a broken path can't ship.

What it does:

- **Images** — anything over 200 KB or wider than 1600px is downscaled to
  1600px and encoded as WebP q82; smaller PNG line art is copied untouched.
  8.9 MB → 1.4 MB.
- **PDFs** — Ghostscript downsamples embedded images to 150 dpi. The result is
  only kept if the page count is unchanged *and* it is genuinely smaller;
  otherwise the original is copied. 71.8 MB → 19.4 MB.
- **`CSWA_Certificate.pdf` is deliberately not compressed.** It is encrypted
  with `change:no`, and re-writing it through Ghostscript would strip that
  restriction. It is copied byte-for-byte.
- **Card thumbnails** — WebP q80 at 900px wide, enough for a 370px card on a
  2× display. 7.0 MB → 0.7 MB.
- **Videos are never imported** — 271 MB, two of them over 115 MB.

## Videos

The 8 videos are hosted on YouTube rather than committed — 271 MB in total, two
of them over 115 MB. Each `videos[]` entry in `content.js` carries a `youtube`
link; the placeholder slot becomes an embed as soon as that key exists.

Five are 4:3 (the matplotlib animations) and carry `aspect: "4 / 3"` so they
fill their frame instead of sitting pillarboxed in a 16:9 box. The three screen
recordings are 16:9 and use the default.

| Project | Source file | Video |
| --- | --- | --- |
| P-017 | `H2_Video.mp4` | H2 Video |
| P-017 | `H1_Video.mp4` | H+1 Video |
| P-013 | `orbit_3d.mp4` | orbit 3d |
| P-013 | `orbit_xy.mp4` | Orbit XY |
| P-013 | `orbit_xz.mp4` | orbit xz |
| P-013 | `orbit.mp4` | orbit |
| P-011 | `spacecraft_animation_20fps_100s.mp4` | spacecraft animation 20fps 100s |
| P-011 | `malaysian_airlines_10fps_40s.mp4` | airliner 10fps 40s |

To swap a link, edit the `youtube` value on the matching `source` in
`src/data/content.js`. `npm run check-media` reports how many slots are still
empty.
