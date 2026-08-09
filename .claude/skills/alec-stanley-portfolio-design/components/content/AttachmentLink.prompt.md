Links a report, certificate or code bundle from a project page. Stack them with `gap: var(--space-2)`.

```jsx
<AttachmentLink label="Full report (10/10)" file="report.pdf" href="../../assets/projects/tumbling/report.pdf" />
<AttachmentLink label="Team 61 final submission" file="Team_61.pdf" />
```

Without `href` the row goes dashed and stamps FILE PENDING — honest about a missing asset rather than a dead link.
