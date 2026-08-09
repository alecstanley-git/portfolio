import React from "react";

/** Sticky top navigation: wordmark, section links, one primary action. */
export function NavBar({ brand = "ALEC STANLEY", items = [], activeId, onNavigate, action, style, ...rest }) {
  return (
    <nav
      style={{
        position: "sticky",
        top: 0,
        zIndex: 40,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "var(--space-8)",
        height: 64,
        padding: "0 var(--gutter-lg)",
        background: "rgba(8, 11, 16, 0.72)",
        backdropFilter: "var(--blur-panel)",
        WebkitBackdropFilter: "var(--blur-panel)",
        borderBottom: "1px solid var(--border-hairline)",
        ...style,
      }}
      {...rest}
    >
      <span style={{ font: "var(--weight-bold) var(--text-sm) / 1 var(--font-display)", letterSpacing: "var(--tracking-caps)", color: "var(--text-primary)", textTransform: "uppercase" }}>
        {brand}
      </span>
      <ul style={{ display: "flex", alignItems: "center", gap: "var(--space-6)", listStyle: "none", margin: 0, padding: 0 }}>
        {items.map((it) => {
          const active = it.id === activeId;
          return (
            <li key={it.id}>
              <button
                onClick={() => onNavigate && onNavigate(it.id)}
                style={{
                  background: "none",
                  border: 0,
                  padding: "6px 0",
                  cursor: "pointer",
                  font: `var(--weight-medium) var(--text-xs) / 1 var(--font-mono)`,
                  letterSpacing: "var(--tracking-wide)",
                  textTransform: "uppercase",
                  color: active ? "var(--ignition-500)" : "var(--text-muted)",
                  borderBottom: `1px solid ${active ? "var(--ignition-500)" : "transparent"}`,
                  transition: "var(--transition-control)",
                }}
              >
                {it.label}
              </button>
            </li>
          );
        })}
      </ul>
      <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)" }}>{action}</div>
    </nav>
  );
}
