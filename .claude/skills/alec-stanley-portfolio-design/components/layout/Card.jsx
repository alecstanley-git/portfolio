import React from "react";

/** The system's surface primitive: hairline border, machined 10px radius, no soft shadow at rest. */
export function Card({ children, interactive = false, padding = "var(--space-6)", accent = false, style, ...rest }) {
  const [hovered, setHovered] = React.useState(false);
  const lift = interactive && hovered;
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        background: "var(--surface-card)",
        border: `1px solid ${lift ? "var(--border-strong)" : "var(--border-hairline)"}`,
        borderRadius: "var(--radius-card)",
        padding,
        boxShadow: lift ? "var(--shadow-md)" : "var(--inner-top)",
        transform: lift ? "translateY(-2px)" : "none",
        transition: "var(--transition-control), transform var(--dur-base) var(--ease-out)",
        overflow: "hidden",
        ...style,
      }}
      {...rest}
    >
      {accent ? (
        <span style={{ position: "absolute", insetInlineStart: 0, top: 0, height: 2, width: "100%", background: "linear-gradient(90deg, var(--ignition-500), transparent 70%)" }} />
      ) : null}
      {children}
    </div>
  );
}
