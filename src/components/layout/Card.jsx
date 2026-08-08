import React from "react";

/**
 * The system's surface primitive: hairline border, machined 10px radius, no soft
 * shadow at rest. `as` lets an interactive card render as a real link or button
 * so it is reachable by keyboard rather than being a clickable div.
 */
export function Card({
  children,
  interactive = false,
  padding = "var(--space-6)",
  accent = false,
  as: Tag = "div",
  style,
  ...rest
}) {
  const [hovered, setHovered] = React.useState(false);
  const [focused, setFocused] = React.useState(false);
  const lift = interactive && (hovered || focused);
  return (
    <Tag
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={interactive ? () => setFocused(true) : undefined}
      onBlur={interactive ? () => setFocused(false) : undefined}
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
        textDecoration: "none",
        ...style,
      }}
      {...rest}
    >
      {accent ? (
        <span
          style={{
            position: "absolute",
            insetInlineStart: 0,
            top: 0,
            /* Above any positioned child (e.g. a ProjectCard's media panel),
               which would otherwise paint over the rule. */
            zIndex: 1,
            height: 2,
            width: "100%",
            background: "linear-gradient(90deg, var(--ignition-500), transparent 70%)",
          }}
        />
      ) : null}
      {children}
    </Tag>
  );
}
