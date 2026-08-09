# Portfolio site — UI kit

The single product in this design system: Alec Stanley's technical portfolio, a dark, instrument-panel-styled site aimed at graduate-role recruiters and engineering hiring managers.

`index.html` is an interactive click-through of the whole site. Nav switches views; project cards open a detail page; the contact form submits to a fake success state.

## Screens
| File | Screens |
| --- | --- |
| `Home.jsx` | `Hero`, `Home` — hero with portrait and stat rail, three featured projects, approach panel |
| `Work.jsx` | `Work` — filterable project index; `ProjectDetail` — single project write-up with stats, result and limitation |
| `About.jsx` | `About` — bio, timeline, three skill groups; `Contact` — contact facts + enquiry form |
| `data.js` | `PROJECTS`, `TIMELINE`, `SKILLS` — all sample content |

Screens compose the design system's components (`ProjectCard`, `SectionHeading`, `Card`, `Button`, …) from `_ds_bundle.js`; nothing is re-implemented locally.

## Content note
Project entries are plausible-but-invented placeholders written in the right voice and shape. **Replace them with Alec's real projects before this is shown to anyone** — `data.js` is the only file to edit.
