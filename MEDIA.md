# Outstanding media

Every project write-up is complete, but the binary assets — figures, videos and
report PDFs — were never exported from the old Notion portfolio. Until they are
added, each one renders as a labelled slot naming the file it is waiting for, so
nothing is silently missing.

**24 images · 8 videos · 18 report files**, across 17 projects.

## How to fill a slot

All three live in `src/data/content.js`. Nothing else needs changing.

**Images** — drop the file in `public/figures/` and add `src`:

```js
images: [{ file: "fig5.png", src: "/figures/p-011-fig5.png", caption: "…" }]
```

Use `asset("figures/…")` instead of a bare `/…` path if the site is deployed
under a GitHub Pages sub-path.

**Videos** — upload to YouTube (unlisted is fine) and add `youtube`:

```js
videos: [{ source: "orbit_3d.mp4", youtube: "https://youtu.be/XXXXXXXXXXX", caption: "…" }]
```

**Reports** — drop the PDF in `public/reports/` and add `href`:

```js
attachments: [{ label: "Full report", file: "report.pdf", href: "/reports/p-011-report.pdf" }]
```

Give files project-scoped names when you move them across. Fourteen projects
ship a file literally called `report.pdf`, and two ship an `image.png` — they
would collide in a single folder.

Once every slot for a project is filled, its card also picks up a cover image if
you pass `image` on the project.

## The list

### P-017 — Introduction to Programming — C++ Portfolio

| Kind | Original file | Field to set |
| --- | --- | --- |
| video | `H2_Video.mp4` | `youtube` |
| video | `H1_Video.mp4` | `youtube` |
| file  | `FIT1045-FIT1053-asta0044-portfolio.pdf` | `href` |
| file  | `submission.pdf` | `href` |
| file  | `Source-Code.zip` | `href` |

### P-016 — Photometric Distance and Age of the Open Cluster NGC 2175

| Kind | Original file | Field to set |
| --- | --- | --- |
| file  | `report.pdf` | `href` |

### P-015 — Viscous Flow Regimes in a Large-Eddy Simulation

| Kind | Original file | Field to set |
| --- | --- | --- |
| file  | `report.pdf` | `href` |

### P-014 — Boundary Layers in Laminar and Turbulent Flow Regimes using CFD

| Kind | Original file | Field to set |
| --- | --- | --- |
| file  | `report.pdf` | `href` |

### P-013 — Galaxy Collision Simulation

| Kind | Original file | Field to set |
| --- | --- | --- |
| image | `m51-and-companion_0-jpg.jpg` | `src` |
| image | `orbit_energy.png` | `src` |
| image | `image.png` | `src` |
| video | `orbit_3d.mp4` | `youtube` |
| video | `orbit_xy.mp4` | `youtube` |
| video | `orbit_xz.mp4` | `youtube` |
| video | `orbit.mp4` | `youtube` |

### P-012 — Aerodynamic Glider Analysis

| Kind | Original file | Field to set |
| --- | --- | --- |
| file  | `Report-To-Submit.pdf` | `href` |

### P-011 — Tumbling Rocket — Intermediate Axis Theorem

| Kind | Original file | Field to set |
| --- | --- | --- |
| image | `fig5.png` | `src` |
| image | `fig4.png` | `src` |
| image | `fig3.png` | `src` |
| video | `spacecraft_animation_20fps_100s.mp4` | `youtube` |
| video | `malaysian_airlines_10fps_40s.mp4` | `youtube` |
| file  | `report.pdf` | `href` |

### P-010 — Rocket Launch Simulation

| Kind | Original file | Field to set |
| --- | --- | --- |
| image | `fbd.png` | `src` |
| image | `kinetic.png` | `src` |
| image | `altitude_vs_time.png` | `src` |
| image | `drag_vs_time.png` | `src` |
| image | `speed_vs_time.png` | `src` |
| image | `horizontal_velocity_vs_time.png` | `src` |
| image | `vertical_velocity_vs_time.png` | `src` |
| file  | `report.pdf` | `href` |

### P-009 — Warman Project

| Kind | Original file | Field to set |
| --- | --- | --- |
| image | `image.png` | `src` |
| image | `Picture1.png` | `src` |
| image | `Picture2.png` | `src` |
| image | `Picture3.png` | `src` |
| image | `Picture4.png` | `src` |
| image | `Picture5.png` | `src` |
| image | `Picture6.png` | `src` |
| image | `Picture7.png` | `src` |
| image | `Picture9.png` | `src` |
| image | `Picture10.png` | `src` |
| image | `Picture11.png` | `src` |
| file  | `Team_61_-_Final_Submission_2025.pdf` | `href` |

### P-008 — CSWA Certificate

| Kind | Original file | Field to set |
| --- | --- | --- |
| file  | `CSWA_Certificate.pdf` | `href` |

### P-007 — Shock Theory in a Supersonic Wind Tunnel

| Kind | Original file | Field to set |
| --- | --- | --- |
| file  | `report.pdf` | `href` |

### P-006 — Stellar Compact Objects

| Kind | Original file | Field to set |
| --- | --- | --- |
| file  | `lab10_report.pdf` | `href` |

### P-005 — Stirling Engine Thermodynamic Properties

| Kind | Original file | Field to set |
| --- | --- | --- |
| file  | `report.pdf` | `href` |

### P-004 — Internal Combustion Engine Thermodynamic Properties

| Kind | Original file | Field to set |
| --- | --- | --- |
| file  | `report.pdf` | `href` |

### P-003 — Properties of Microwaves

| Kind | Original file | Field to set |
| --- | --- | --- |
| file  | `report.pdf` | `href` |

### P-002 — Detecting Extrasolar Planets using the Transit Method

| Kind | Original file | Field to set |
| --- | --- | --- |
| file  | `report.pdf` | `href` |

### P-001 — Star Characteristics in NGC 2301

| Kind | Original file | Field to set |
| --- | --- | --- |
| file  | `AperturePhotometryReport.pdf` | `href` |

