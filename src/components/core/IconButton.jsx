import React from "react";
import { Icon } from "./Icon.jsx";

const SIZE = { sm: 30, md: 38, lg: 46 };

/** Square, label-less control for toolbars and social links. */
export function IconButton({
  icon,
  label,
  variant = "secondary",
  size = "md",
  disabled = false,
  as: Tag = "button",
  style,
  ...rest
}) {
  const [hovered, setHovered] = React.useState(false);
  const px = SIZE[size] || SIZE.md;
  const ghost = variant === "ghost";
  const isButton = Tag === "button";
  return (
    <Tag
      type={isButton ? "button" : undefined}
      aria-label={label}
      title={label}
      disabled={isButton ? disabled : undefined}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: px,
        height: px,
        borderRadius: "var(--radius-control)",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.4 : 1,
        background: ghost
          ? hovered
            ? "var(--ignition-tint)"
            : "transparent"
          : hovered
            ? "var(--hull-700)"
            : "var(--hull-800)",
        border: ghost
          ? "1px solid transparent"
          : `1px solid ${hovered ? "var(--border-strong)" : "var(--border-line)"}`,
        color: hovered ? "var(--ignition-400)" : "var(--text-body)",
        transition: "var(--transition-control)",
        ...style,
      }}
      {...rest}
    >
      <Icon name={icon} size={size === "lg" ? "lg" : "md"} />
    </Tag>
  );
}
