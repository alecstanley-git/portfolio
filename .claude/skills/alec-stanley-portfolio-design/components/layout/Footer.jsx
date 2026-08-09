import React from "react";
import { IconButton } from "../core/IconButton.jsx";

/** Page footer: contact line, social row, build stamp. */
export function Footer({ email = "hello@alecstanley.dev", location = "Melbourne, VIC", links = [], note, style, ...rest }) {
  return (
    <footer
      style={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "var(--space-6)",
        padding: "var(--space-10) var(--gutter-lg)",
        borderTop: "1px solid var(--border-hairline)",
        background: "var(--surface-panel)",
        ...style,
      }}
      {...rest}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-2)" }}>
        <a href={`mailto:${email}`} style={{ font: "var(--weight-semibold) var(--text-lg) / 1.2 var(--font-display)", color: "var(--text-primary)", textDecoration: "none", borderBottom: "1px solid var(--ignition-tint-strong)" }}>
          {email}
        </a>
        <span style={{ font: "var(--type-mono)", color: "var(--text-faint)", letterSpacing: "var(--tracking-wide)" }}>{location}</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)" }}>
        {links.map((l) => (
          <IconButton key={l.label} icon={l.icon} label={l.label} variant="ghost" />
        ))}
      </div>
      {note ? <span style={{ font: "var(--type-mono)", color: "var(--text-faint)", width: "100%" }}>{note}</span> : null}
    </footer>
  );
}
