import React from "react";
import { Icon } from "../core/Icon.jsx";

/** Native select restyled to match the system. `Input` and `Textarea` also exist
 *  in the design system but nothing on the site needs them yet. */
export function Select({ label, hint, options = [], id, style, ...rest }) {
  const [focused, setFocused] = React.useState(false);
  const fieldId = id || `sel-${label ? label.replace(/\W+/g, "-").toLowerCase() : "field"}`;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-2)", ...style }}>
      {label ? (
        <label
          htmlFor={fieldId}
          style={{
            font: "var(--type-label)",
            textTransform: "uppercase",
            letterSpacing: "var(--tracking-caps)",
            color: focused ? "var(--ignition-500)" : "var(--text-faint)",
            transition: "color var(--dur-fast) var(--ease-standard)",
          }}
        >
          {label}
        </label>
      ) : null}
      <div style={{ position: "relative", display: "flex" }}>
        <select
          id={fieldId}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            appearance: "none",
            width: "100%",
            height: 42,
            padding: "0 var(--space-10) 0 var(--space-4)",
            background: "var(--surface-inset)",
            color: "var(--text-primary)",
            font: "var(--type-body-sm)",
            border: `1px solid ${focused ? "var(--ignition-500)" : "var(--border-line)"}`,
            borderRadius: "var(--radius-control)",
            boxShadow: "var(--inner-inset)",
            outline: "none",
            cursor: "pointer",
            transition: "var(--transition-control)",
          }}
          {...rest}
        >
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <Icon
          name="chevron-down"
          size="sm"
          color="var(--text-faint)"
          style={{
            position: "absolute",
            right: "var(--space-4)",
            top: "50%",
            transform: "translateY(-50%)",
            pointerEvents: "none",
          }}
        />
      </div>
      {hint ? <span style={{ font: "var(--type-mono)", color: "var(--text-faint)" }}>{hint}</span> : null}
    </div>
  );
}
