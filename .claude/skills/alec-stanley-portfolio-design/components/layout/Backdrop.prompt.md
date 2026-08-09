The 32px blueprint grid behind the page — the concept's "faint blueprint grid" made literal, and the only thing permitted behind page content.

```jsx
<div className="page">
  <Backdrop />
  <NavBar … />
  <main className="page__main">…</main>
  <Footer … />
</div>
```

Rules:

- **One per app, in the page shell.** Never per route, never two stacked, never a second full-page treatment beside it.
- **Page surfaces above it must be transparent.** A section that restates `--surface-page` as an opaque fill will hide it — that is a bug, not a background. Cards and panels *should* stay opaque; they are meant to sit on top of the grid.
- **Do not raise it above `z-index: -1`** and do not give it a background colour. It is a pattern layer, not a surface.
- **The mask is not decoration.** It keeps the lower half of every screen flat so long-form reading is never patterned. Do not remove it to "show more grid".
- **Drift stays subtle.** 0.15 by default; past ~0.25 the page visibly separates into two moving planes, which is exactly the busyness the brief rules out.
- Reduced motion is handled inside the component. Do not wrap it in your own animation.
