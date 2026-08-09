Renders a Lucide glyph tinted with `currentColor` — use it for every icon in the system rather than inlining SVG.

```jsx
<Icon name="rocket" size="lg" />
<Icon name="arrow-up-right" size={14} color="var(--ignition-500)" />
```

Names are Lucide kebab-case ids. Sizes: `sm` 14, `md` 16, `lg` 20, `xl` 24, or a number. Icons are decorative by default (`aria-hidden`); give the surrounding control a label.
