import React from "react";

/** Labelled single-line text field. */
export function Input({ label, hint, error, id, style, ...rest }) {
  const [focused, setFocused] = React.useState(false);
  const fieldId = id || `in-${label ? label.replace(/\W+/g, "-").toLowerCase() : "field"}`;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-2)", ...style }}>
      {label ? (
        <label htmlFor={fieldId} style={{ font: "var(--type-label)", textTransform: "uppercase", letterSpacing: "var(--tracking-caps)", color: focused ? "var(--ignition-500)" : "var(--text-faint)", transition: "color var(--dur-fast) var(--ease-standard)" }}>
          {label}
        </label>
      ) : null}
      <input
        id={fieldId}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          height: 42,
          padding: "0 var(--space-4)",
          background: "var(--surface-inset)",
          color: "var(--text-primary)",
          font: "var(--type-body-sm)",
          border: `1px solid ${error ? "var(--state-fail)" : focused ? "var(--ignition-500)" : "var(--border-line)"}`,
          borderRadius: "var(--radius-control)",
          boxShadow: "var(--inner-inset)",
          outline: "none",
          transition: "var(--transition-control)",
          width: "100%",
        }}
        {...rest}
      />
      {error || hint ? (
        <span style={{ font: "var(--type-mono)", color: error ? "var(--state-fail)" : "var(--text-faint)" }}>{error || hint}</span>
      ) : null}
    </div>
  );
}
