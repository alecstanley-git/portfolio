# Media

Every image, report and download on the site lives in `public/media/<slug>/`
and is listed in a generated manifest:

| File | Holds |
| --- | --- |
| `src/data/media-manifest.js` | Figures, reports and zips: slug → source file name → path (+ size or page count) |
| `src/data/cover-manifest.js` | Card thumbnails: slug → path and pixel size |

Both are written by `scripts/media.mjs`. Don't edit them by hand.

## Adding a project's files

```sh
npm run media -- inventory <dir>                              # what's in the folder
npm run media -- add p-018 <dir> --thumbnail cover.jpg       # every image + PDF in <dir>
npm run media -- add p-018 <dir> --thumbnail cover.jpg a.png report.pdf   # or just these
npm run media -- add p-013 <dir> extra.png                    # add to an existing project (keeps its thumbnail)
npm run media -- zip p-018 <dir> --name "Source code" src    # bundle code as one download
npm run media -- remove p-018 [file]                         # delete a project's media, or one file
npm run media -- next-id                                     # the next unused project ID
npm run check-media                                          # assert everything resolves
```

`add` checks names and types for the whole set before writing anything. It
refuses a missing thumbnail, a video, an unrecognised file type, two files that
would end up with the same name, or a file that would overwrite one the project
already has from a different source. On an existing project it only takes the
files you list (or `--thumbnail` alone to replace just the card image). In `content.js`, `file:` is the source file name exactly as
it was handed over. `add` prints the keys to use.

## Conversion rules

- **Thumbnail** → `cover.webp`, WebP q80, at most 900px wide. That's enough for
  a 370px card on a 2× display.
- **Figures** → WebP, at most 1600px wide. PNG (plots, diagrams, screenshots)
  is encoded **lossless**, so one-pixel axis lines and tick labels stay sharp.
  JPEG and HEIC photos use q82.
- **PDFs** → Ghostscript downsamples embedded images to 300 dpi, print grade.
  The result is kept only if the page count is unchanged *and* it is genuinely
  smaller; otherwise the original is copied. 150 dpi was tried once and
  rejected because it visibly softened matplotlib figures. The Download button
  serves this copy.
- **Encrypted PDFs** (e.g. `CSWA_Certificate.pdf`) are copied byte-for-byte.
  Re-writing them would strip their permission flags.
- **Zips** are copied as-is. `media zip` builds one from a folder and skips
  `.DS_Store`, `__MACOSX`, `__pycache__`, `node_modules` and `.git`.
- **Videos are never served from the site.** Upload to YouTube and set
  `youtube` on the `videos[]` entry. Add `aspect: "4 / 3"` for 4:3 footage so it
  isn't pillarboxed; `inventory` reports each video's aspect.

All output names are lowercase and hyphenated. GitHub Pages is case-sensitive
and macOS is not, so a stray capital would work locally and 404 in production.

## Checks

`npm run check-media` runs in CI before every build. It fails on:

- a missing card thumbnail,
- a figure or attachment with no file,
- a file missing on disk or empty,
- a path with capitals or spaces,
- an orphaned file under `public/media`,
- bad project data: a duplicate or malformed ID, a non-ISO date, no tags, or a
  retired ID that is still live.

`npm run check-media -- https://alecstanley.com/` also fetches every file from
the live site.
