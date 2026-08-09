import React from "react";
import { Tag } from "../core/Tag.jsx";

/** One row on an experience or education timeline. */
export function TimelineEntry({ period, title, org, description, tags = [], current = false, style, ...rest }) {
  return (
    <article
      style={{
        display: "grid",
        gridTemplateColumns: "148px 1fr",
        gap: "var(--space-6)",
        padding: "var(--space-6) 0",
        borderTop: "1px solid var(--border-hairline)",
        ...style,
      }}
      {...rest}
    >
      <div style={{ display: "flex", alignItems: "flex-start", gap: "var(--space-2)", paddingTop: 3 }}>
        <span style={{ width: 7, height: 7, marginTop: 4, borderRadius: "50%", flex: "0 0 auto", background: current ? "var(--ignition-500)" : "var(--hull-500)", boxShadow: current ? "0 0 10px var(--ignition-500)" : "none" }} />
        <span style={{ font: "var(--type-mono)", letterSpacing: "var(--tracking-wide)", color: current ? "var(--ignition-400)" : "var(--text-faint)" }}>{period}</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-2)" }}>
        <h3 style={{ font: "var(--type-h3)", color: "var(--text-primary)", margin: 0 }}>{title}</h3>
        {org ? <span style={{ font: "var(--type-body-sm)", color: "var(--text-accent)" }}>{org}</span> : null}
        {description ? <p style={{ font: "var(--type-body-sm)", color: "var(--text-muted)", margin: 0, maxWidth: "var(--measure)" }}>{description}</p> : null}
        {tags.length ? (
          <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-2)", marginTop: "var(--space-1)" }}>
            {tags.map((t) => <Tag key={t} size="sm">{t}</Tag>)}
          </div>
        ) : null}
      </div>
    </article>
  );
}
