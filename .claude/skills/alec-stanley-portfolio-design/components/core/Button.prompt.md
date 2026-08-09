The system's action control — one `primary` per view, everything else `secondary` or `ghost`.

```jsx
<Button variant="primary" iconRight="arrow-up-right">View project</Button>
<Button variant="secondary" size="sm" iconLeft="download">Résumé</Button>
<Button as="a" href="#contact" variant="ghost">Get in touch</Button>
```

Sizes `sm | md | lg`. `danger` exists for destructive actions in tooling UIs. Press state is a 1px downward nudge — never a scale or bounce.
