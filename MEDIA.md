# Media

Images and reports are **imported and live**. Videos are the only thing left.

| | |
| --- | --- |
| Images | 24 / 24 imported |
| Reports and files | 18 / 18 imported (17 PDFs + 1 zip) |
| Videos | 0 / 8 — awaiting YouTube links |

Source of record is the Notion export in Google Drive:
`My Drive/OLDPORTFOLIO/Alec Stanley/Skills and Projects/`. It is never modified.

## Re-importing

```sh
npm run import-assets    # copy + optimise from the Drive export into public/media/
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
- **Videos are never imported** — 271 MB, two of them over 115 MB.

## The 8 videos to upload

Upload each to YouTube (unlisted is fine), then paste the link into
`src/data/content.js` by adding a `youtube` key to the matching entry:

```js
{ caption: "X–Y projection (top-down)", source: "orbit_xy.mp4",
  youtube: "https://youtu.be/XXXXXXXXXXX" },
```

The placeholder slot becomes a real embed as soon as that key exists. Match on
`source` — it is unique.

### P-017 — Introduction to Programming, C++ Portfolio

| File | Size | Caption already written |
| --- | --- | --- |
| `H2_Video.mp4` | 116.4 MB | Walkthrough — how to use the simulator |
| `H1_Video.mp4` | 123.8 MB | Source-code deep dive and the challenges I faced |

### P-013 — Galaxy Collision Simulation

| File | Size | Caption already written |
| --- | --- | --- |
| `orbit_3d.mp4` | 2.4 MB | Full 3D numerical integration — two massive bodies and 240 massless stars |
| `orbit_xy.mp4` | 3.6 MB | X–Y projection (top-down) |
| `orbit_xz.mp4` | 2.1 MB | X–Z projection (side-on) |
| `orbit.mp4` | 0.4 MB | Early draft — two stellar masses in an eccentric binary orbit |

### P-011 — Tumbling Rocket, Intermediate Axis Theorem

| File | Size | Caption already written |
| --- | --- | --- |
| `spacecraft_animation_20fps_100s.mp4` | 15.8 MB | Rocket undergoing torque-free motion in three dimensions — chaotic, unstable rotation |
| `malaysian_airlines_10fps_40s.mp4` | 6.2 MB | The same principles applied to an aeroplane |

All eight are in the Drive export, in the folder named after their project.

`orbit_3d.mp4` and `spacecraft_animation_20fps_100s.mp4` are the lead videos on
their pages — they appear above the write-up, so they're the two worth doing
first.
