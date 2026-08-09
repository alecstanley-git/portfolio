import React from "react";
import { Icon } from "./Icon.jsx";

const SIZE = {
  sm: { padding: "0 10px", height: 30, font: "var(--text-xs)", gap: 6 },
  md: { padding: "0 16px", height: 38, font: "var(--text-sm)", gap: 8 },
  lg: { padding: "0 22px", height: 46, font: "var(--text-md)", gap: 10 },
};

function palette(variant, hovered) {
  switch (variant) {
    case "primary":
      return {
        background: hovered ? "var(--ignition-400)" : "var(--ignition-500)",
        color: "var(--hull-1000)",
        border: "1px solid transparent",
      };
    case "secondary":
      return {
        background: hovered ? "var(--hull-700)" : "var(--hull-800)",
        color: "var(--text-primary)",
        border: `1px solid ${hovered ? "var(--border-strong)" : "var(--border-line)"}`,
      };
    case "ghost":
      return {
        background: hovered ? "var(--ignition-tint)" : "transparent",
        color: hovered ? "var(--ignition-400)" : "var(--text-body)",
        border: "1px solid transparent",
      };
    case "danger":
      return {
        background: hovered ? "var(--state-fail)" : "var(--state-fail-tint)",
        color: hovered ? "var(--hull-1000)" : "var(--state-fail)",
        border: "1px solid var(--state-fail)",
      };
    default:
      return {};
  }
}

/** The system's primary action control. */
export function Button({
  children,
  variant = "primary",
  size = "md",
  iconLeft,
  iconRight,
  disabled = false,
  fullWidth = false,
  as = "button",
  style,
  ...rest
}) {
  const [hovered, setHovered] = React.useState(false);
  const [pressed, setPressed] = React.useState(false);
  const s = SIZE[size] || SIZE.md;
  const Tag = as;
  return (
    <Tag
      disabled={Tag === "button" ? disabled : undefined}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setPressed(false); }}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      style={{
        display: fullWidth ? "flex" : "inline-flex",
        width: fullWidth ? "100%" : undefined,
        alignItems: "center",
        justifyContent: "center",
        gap: s.gap,
        height: s.height,
        padding: s.padding,
        font: `var(--weight-medium) ${s.font} / 1 var(--font-display)`,
        letterSpacing: "0.01em",
        borderRadius: "var(--radius-control)",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.4 : 1,
        transform: pressed && !disabled ? "translateY(1px)" : "none",
        textDecoration: "none",
        whiteSpace: "nowrap",
        transition: "var(--transition-control), transform var(--dur-instant) var(--ease-standard)",
        ...palette(variant, hovered && !disabled),
        ...style,
      }}
      {...rest}
    >
      {iconLeft ? <Icon name={iconLeft} size={size === "lg" ? "lg" : "sm"} /> : null}
      {children}
      {iconRight ? <Icon name={iconRight} size={size === "lg" ? "lg" : "sm"} /> : null}
    </Tag>
  );
}
