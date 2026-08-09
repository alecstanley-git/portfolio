---
name: alec-stanley-portfolio-design
description: Use this skill to generate well-branded interfaces and assets for Alec Stanley's technical portfolio, either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for protoyping.
user-invocable: true
---

Read the `readme.md` file within this skill, and explore the other available files. It carries the content fundamentals (voice, casing, what to never write), visual foundations (colour, type, spacing, motion, states), iconography rules, and an index of every token file, component and UI kit.

Key paths:
- `styles.css` — link this one file to pick up all tokens and fonts.
- `components/<group>/<Name>.jsx` — React primitives; each has a `.d.ts` props contract and a `.prompt.md` usage note.
- `ui_kits/portfolio/` — the full portfolio site; `data.js` holds all real content.
- `guidelines/*.html` — specimen cards you can open in a browser.
- `assets/` — portrait and CV PDF.
If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. If working on production code, you can copy assets and read the rules here to become an expert in designing with this brand.
If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.
