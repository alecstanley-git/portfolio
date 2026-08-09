One technical project at a glance — the primary unit of the portfolio.

```jsx
<ProjectCard id="P-004" title="Hybrid rocket motor test stand" discipline="Aerospace" year="2025"
  status={{label:"Complete", tone:"ok"}} tags={["MATLAB","ANSYS","LabVIEW"]}
  summary="Thrust-measurement rig with real-time telemetry capture."
  onOpen={() => open("P-004")} />
```

Lay them out in a `grid` with `minmax(320px, 1fr)` and `gap: var(--space-6)`. Without an `image` the header band falls back to the blueprint grid.
