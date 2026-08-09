import React from "react";

/** Numbered section header: mono index, display title, optional lede and trailing action. */
export function SectionHeading({ index, title, lede, action, align = "center", style, ...rest }) {
  const centered = align === "center";
  return (
    <header
      style={{
        display: "flex",
        flexDirection: centered ? "column" : "row",
        alignItems: centered ? "center" : "flex-end",
        justifyContent: "space-between",
        gap: centered ? "var(--space-5)" : "var(--space-8)",
        textAlign: centered ? "center" : "left",
        ...style,
      }}
      {...rest}
    >
      <div style={{ display: "flex", flexDirection: "column", alignItems: centered ? "center" : "flex-start", gap: "var(--space-3)", maxWidth: "var(--measure)" }}>
        {index ? (
          <span style={{ font: "var(--type-label)", letterSpacing: "var(--tracking-caps)", textTransform: "uppercase", color: "var(--ignition-500)" }}>
            {index}
          </span>
        ) : null}
        <h2 style={{ font: "var(--type-h2)", letterSpacing: "var(--tracking-tight)", color: "var(--text-primary)", margin: 0 }}>{title}</h2>
        {lede ? <p style={{ font: "var(--type-body)", color: "var(--text-muted)", margin: 0 }}>{lede}</p> : null}
      </div>
      {action ? <div style={{ flex: "0 0 auto" }}>{action}</div> : null}
      {centered ? <span style={{ width: 40, height: 1, background: "var(--border-line)", marginTop: "var(--space-1)" }} /> : null}
    </header>
  );
}
