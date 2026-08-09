import React from "react";

/** Monospace metadata chip — technologies, tools, disciplines. */
export function Tag({ children, tone = "neutral", size = "md", style, ...rest }) {
  const tones = {
    neutral: { color: "var(--text-muted)", background: "var(--hull-800)", border: "var(--border-hairline)" },
    accent: { color: "var(--ignition-400)", background: "var(--ignition-tint)", border: "var(--ignition-tint-strong)" },
    data: { color: "var(--plasma-500)", background: "var(--plasma-tint)", border: "var(--plasma-tint)" },
  };
  const t = tones[tone] || tones.neutral;
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        height: size === "sm" ? 20 : 24,
        padding: size === "sm" ? "0 6px" : "0 8px",
        font: `var(--weight-medium) ${size === "sm" ? "var(--text-2xs)" : "var(--text-xs)"} / 1 var(--font-mono)`,
        letterSpacing: "0.02em",
        color: t.color,
        background: t.background,
        border: `1px solid ${t.border}`,
        borderRadius: "var(--radius-xs)",
        whiteSpace: "nowrap",
        ...style,
      }}
      {...rest}
    >
      {children}
    </span>
  );
}
