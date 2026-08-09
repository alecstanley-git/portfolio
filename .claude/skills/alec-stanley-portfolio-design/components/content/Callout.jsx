import React from "react";
import { Icon } from "../core/Icon.jsx";

const TONES = {
  note: { fg: "var(--plasma-500)", bg: "var(--plasma-tint)", icon: "info" },
  accent: { fg: "var(--ignition-500)", bg: "var(--ignition-tint)", icon: "zap" },
  warn: { fg: "var(--state-warn)", bg: "var(--state-warn-tint)", icon: "triangle-alert" },
};

/** Inline aside for a caveat, result or key finding. */
export function Callout({ children, title, tone = "note", icon, style, ...rest }) {
  const t = TONES[tone] || TONES.note;
  return (
    <aside
      style={{
        display: "flex",
        gap: "var(--space-3)",
        padding: "var(--space-4) var(--space-5)",
        background: t.bg,
        borderInlineStart: `2px solid ${t.fg}`,
        borderRadius: "0 var(--radius-md) var(--radius-md) 0",
        ...style,
      }}
      {...rest}
    >
      <Icon name={icon || t.icon} size="md" color={t.fg} style={{ marginTop: 2 }} />
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-1)" }}>
        {title ? <strong style={{ font: "var(--weight-semibold) var(--text-sm) / 1.3 var(--font-display)", color: t.fg }}>{title}</strong> : null}
        <div style={{ font: "var(--type-body-sm)", color: "var(--text-body)" }}>{children}</div>
      </div>
    </aside>
  );
}
