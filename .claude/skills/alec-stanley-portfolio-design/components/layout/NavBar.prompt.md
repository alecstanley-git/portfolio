Sticky, blurred top nav used on every screen of the portfolio.

```jsx
<NavBar items={[{id:"work",label:"Work"},{id:"about",label:"About"}]}
  activeId="work" onNavigate={setView}
  action={<Button size="sm" variant="secondary" iconLeft="download">CV</Button>} />
```

The brand is set in type — the system has no logo mark. Nav labels are uppercase mono.
